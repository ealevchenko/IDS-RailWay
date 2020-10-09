jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_wagons_position': '№п.п',
                'field_wagons_num': '№ вагона',
                'field_wagons_operator': 'Опер.',
                'field_wagon_limiting_abbr': 'Огран.',
                'field_wagons_operators_paid': 'Приз. плат.',
                'field_current_operation_wagon_busy': 'Занят?',
                'field_wagon_rod': 'Род',
                'field_wagon_type': 'Тип',
                'field_wagon_gruzp_doc': 'Г\п т.',
                'field_wagon_adm': 'Адм.',
                'field_current_condition_abbr': 'Размет.',
                'field_current_loading_status': 'Статус',
                'field_arrival_cargo_name': 'Груз по прибытию',
                'field_arrival_certification_data': 'Сертиф. данные',
                'field_arrival_station_from_name': 'Станция отправления',
                'field_arrival_station_amkr_name': 'Станция назначения',
                'field_current_operation_wagon_name': 'Последняя операция',
                'field_current_operation_wagon_end': 'Дата вып. опер.',
                'field_arrival_division_amkr_abbr': 'Цех получатель',
                'field_arrival_duration': 'Простой УЗ ч.',
                'field_pb_station_duration': 'Инд. пр. ст',
                'field_current_station_amkr_duration': 'Прост. ст',
                'field_current_station_amkr_idle_time': 'Прост. норм.',
                'field_sap_is_num': '№ Вх поставки',
                'field_sap_is_create_num': 'Дата созд. вх. пост.',
                'field_sap_is_create_date': 'Дата созд. вх. пост.',
                'field_sap_is_create_time': 'Время созд. вх. пост.',
                'field_instructional_letters_num': '№ Инст. письма',
                'field_instructional_letters_datetime': 'Дата Инст. письма',
                'field_instructional_letters_station_name': 'Станция Инст. письма',
                'field_wagon_date_rem_uz': 'ДПО-ой ремонт',

                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',
                'title_button_select': 'Выбрать вагоны',
                'title_button_select_all': 'Все вагоны',
                'title_button_select_none': 'Убрать выбор',
            },
            'en':  //default language: English
            {
                'field_': '',
            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        dc = $('div#dialog-confirm').dialog_confirm({}),
        alert = new ALERT($('div#main-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT(lang), // Создадим класс IDS_RWT
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_inc.load([], ['station', 'ways'], [], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        not_event_select_way = false,
        current_id_station = null,
        current_id_park = null,
        current_id_way = null,
        // Основные кнопки управления
        // Изменить дислокацию
        bt_dislocation = $('button#dislocation').on('click',
            function (event) {
                alert.clear_message();
                event.preventDefault();
                var items = table_wagons.obj.rows({ selected: true });
                if (items && items.count() > 0) {
                    // ести выбранные вагоны для новой дислокации
                    var rows_wagons = table_wagons.obj.rows(items[0]).data();
                    pn_dislocation_wagon.Open(rows_wagons, current_id_station, current_id_way)
                } else {
                    alert.out_warning_message("Операция новой дислокации не доступна, нет выбранных вагонов для дислокации!");
                }
            }),
        //*************************************************************************************
        // ОСНОВНАЯ ТАБЛИЦА СОСТАВОВ
        //*************************************************************************************
        table_tree_way = {
            html_table: $('table#tree-way'),
            obj: null,
            select_string: null,
            count_string: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "paging": false,
                    "searching": false,
                    "ordering": false,
                    "info": false,
                    "keys": true,
                    //select: {
                    //    style: "single"
                    //},
                    select: false,
                    "autoWidth": false,
                    //sScrollX: "100%",
                    //scrollX: true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                        $('td:eq(1)', row).attr('colspan', 3);
                        $('td:eq(1)', row).prepend($('<img class="icon-station" />')).addClass("station-name");
                    },
                    columns: [
                        {
                            className: 'station-control',
                            orderable: false,
                            data: null,
                            defaultContent: '',
                            width: "20px",
                            searchable: false
                        },
                        //{
                        //    orderable: false,
                        //    data: null,
                        //    //defaultContent: '',
                        //    //width: "20px",
                        //    //searchable: false
                        //},
                        //{
                        //    orderable: false,
                        //    data: null,
                        //    //defaultContent: '',
                        //    //width: "20px",
                        //    //searchable: false
                        //},
                        { data: "name", title: 'дерево путей', width: "50px", orderable: false, searchable: false },
                        { data: "operator", title: 'оператор', width: "50px", orderable: false, searchable: false },
                        { data: "count", title: 'кол.', width: "50px", orderable: false, searchable: false },
                        { data: "max", title: 'макс.', width: "50px", orderable: false, searchable: false },
                    ],
                    //dom: 'Bfrtip',
                    stateSave: false,
                }).on('select', function (e, dt, type, indexes) {
                    //table_tree_way.view_button(indexes);
                }).on('deselect', function (e, dt, type, indexes) {
                    //table_tree_way.view_button(indexes);
                });
                // Инициализация раскрытия станции
                table_tree_way.initEventOpenStation();
            },
            // Загрузить станции
            load_station: function () {
                LockScreen(langView('mess_delay', langs));
                ids_inc.ids_dir.getStation(function (station) {
                    table_tree_way.view_station(station.filter(function (i) { return !i.station_uz; }));
                });
            },
            //
            view_station: function (stations) {
                table_tree_way.obj.clear();
                $.each(stations, function (i, el) {
                    table_tree_way.obj.row.add(table_tree_way.get_station(el));
                });
                table_tree_way.obj.draw();
                LockScreenOff();
            },
            //
            get_station: function (station) {
                return {
                    id: station.id,
                    name: station.station_name_ru,
                    operator: null,
                    count: null,
                    max: null,
                }
            },
            // Инициализация события выборки детально
            initEventOpenStation: function () {
                table_tree_way.html_table.find('tbody')
                    .on('click', 'td.station-control', function () {
                        // Обработка выбора станции, показать - спрятать парки
                        var tr = $(this).closest('tr');
                        var row = table_tree_way.obj.row(tr);
                        var el = table_tree_way.html_table.find('tr#station-' + row.data().id);
                        if (el && el.length > 0) {
                            //el.unbind(); // удалим все обработчики установленные на элементе
                            $(tr).removeClass('shown');
                            el.remove();
                        } else {
                            // Выбрать парки
                            table_tree_way.load_park(row, function (park) {
                                if (park && park.length > 0) {
                                    // Отрисовать парки
                                    $(tr).addClass('shown');
                                    $.each(park.sort(function (a, b) { return b.id - a.id; }), function (i, el) {


                                        $(tr).after("<tr id='station-" + row.data().id + "'><td></td><td class='park-control' park='" + el.id + "' station='" + row.data().id + "'></td><td colspan='2' class='park-name'><img class='icon-park'/>" + el.park_abbr_ru + "</td><td></td><td></td><td></td></tr>");
                                        // Прикрепим событие выбора парка

                                        var el_ev = table_tree_way.html_table.find('tbody td[station="' + row.data().id + '"][park="' + el.id + '"]');
                                        //table_tree_way.html_table.find('tbody').on('click', 'td[park="' + el.id + '"]', function () {

                                        el_ev.on('click', function () {
                                            var id_park = Number($(this).attr("park"));
                                            var id_station = Number($(this).attr("station"));
                                            var tr_park = $(this).closest('tr');
                                            // Обработка выбора парка, показать - спрятать пути
                                            var el_park = table_tree_way.html_table.find('tr[station=' + id_station + '][park=' + id_park + ']');
                                            if (el_park && el_park.length > 0) {
                                                // Убрать tr c путями
                                                //$(tr_park).unbind(); // удалим все обработчики установленные на элементе
                                                $(tr_park).removeClass('shown');
                                                el_park.remove();
                                            } else {
                                                // Показать tr c путями
                                                // Получим  данные по путям
                                                table_tree_way.load_way(id_station, id_park, function (ways) {
                                                    if (ways && ways.length > 0) {
                                                        $(tr_park).addClass('shown');
                                                        $.each(ways.sort(function (a, b) { return b.position_way - a.position_way; }), function (i, el) {
                                                            // Определим компонент прогресс бар
                                                            var max_capacity = el.capacity ? Number(el.capacity) : 0
                                                            var count_wagon = el.count_wagon ? Number(el.count_wagon) : 0
                                                            var progress = Number(count_wagon > max_capacity ? 100.0 : max_capacity === 0 ? 0.0 : (count_wagon * 100.0) / max_capacity);
                                                            var progress_collor = "";
                                                            if (progress <= 25) {
                                                                progress_collor = 'bg-success';
                                                            } else {
                                                                if (progress <= 50) {
                                                                    progress_collor = 'bg-info';
                                                                } else {
                                                                    if (progress <= 75) {
                                                                        progress_collor = 'bg-warning';
                                                                    } else {
                                                                        progress_collor = 'bg-danger';
                                                                    }
                                                                }
                                                            }
                                                            var pb_way = $("<div class='progress' title='Информация детально' way='" + el.id + "'><div class='progress-bar " + progress_collor + "' role='progressbar' style='width: " + progress.toFixed(0) + "%;' aria-valuenow='" + el.count_wagon + "' aria-valuemin='0' aria-valuemax='" + el.capacity + "'>" + progress.toFixed(1) + "%</div></div>")
                                                            // событие нажатия на прогресс бар
                                                            pb_way.on('click', function () {
                                                                event.preventDefault();
                                                                not_event_select_way = true; // запрет выбора пути
                                                                var id_way = Number($(this).attr("way"));
                                                                pn_loading_way_detail.Open(id_way);
                                                            });
                                                            // определим строку путь
                                                            var tr_way = $("<tr id='station-" + id_station + "' station='" + id_station + "' park='" + id_park + "' way='" + el.id + "'><td></td><td></td><td></td><td class='way-name'><img class='icon-way'/>" + el.way_num_ru + " - " + el.way_abbr_ru + "</td><td></td><td>" + el.count_wagon + "</td><td>" + el.capacity + "</td></tr>");
                                                            var td = tr_way.find('td:eq(4)');
                                                            td.append(pb_way);
                                                            // Событие выбора пути
                                                            tr_way.on('click', function () {
                                                                // Проверим наличие запрета выбора пути
                                                                if (!not_event_select_way) {
                                                                    event.preventDefault();

                                                                    $('tr[way]').removeClass('selected'); // Убрать выбор
                                                                    $(this).addClass('selected'); // Применитьт выбор

                                                                    //var id = Number($(this).attr("id"));
                                                                    current_id_station = Number($(this).attr("station"));
                                                                    current_id_park = Number($(this).attr("park"));
                                                                    current_id_way = Number($(this).attr("way"));
                                                                    table_wagons.load(current_id_way);
                                                                }
                                                                not_event_select_way = false;
                                                            });
                                                            $(tr_park).after(tr_way);
                                                        });
                                                    }
                                                    LockScreenOff();
                                                });

                                            }
                                        });

                                    });
                                }
                                LockScreenOff();
                            });
                        }
                    });
            },
            // Загрузить парки
            load_park: function (row, callback) {
                LockScreen(langView('mess_delay', langs));
                ids_inc.ids_dir.getParkWaysOfStationID(row.data().id, function (park) {
                    if (typeof callback === 'function') {
                        callback(park);
                    }
                });
            },
            // Загрузить пути
            load_way: function (station, park, callback) {
                LockScreen(langView('mess_delay', langs));
                ids_inc.ids_dir.getWaysOfStationIDParkID(station, park, function (ways) {
                    if (typeof callback === 'function') {
                        callback(ways);
                    }
                });
            },
            // Событие
            event_click_way: function () {
                alert('Rkbr');
            }
        },
        //*************************************************************************************
        // ТАБЛИЦА ВАГОНЫ ДЕТАЛЬНО
        //*************************************************************************************
        table_wagons = {
            html_table: $('table#wagons-way'),
            count_wagon: 0,
            obj: null,
            //index:1,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[-1, 20, 50, 100], ["All", 20, 50, 100]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    //select: {
                    //    style: "single"
                    //},
                    select: false,
                    "autoWidth": false,
                    sScrollX: "100%",
                    scrollX: true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', index + 1);
                        // Определим компонент прогресс бар
                        var max = data.current_station_amkr_idle_time ? Number(data.current_station_amkr_idle_time) : 0
                        var duration = data.current_station_amkr_duration ? Number(data.current_station_amkr_duration) : 0
                        var progress = Number(duration > max ? 100.0 : max === 0 ? 0.0 : (duration * 100.0) / max);
                        var progress_collor = "";
                        if (progress <= 25) {
                            progress_collor = 'bg-success';
                        } else {
                            if (progress <= 50) {
                                progress_collor = 'bg-info';
                            } else {
                                if (progress <= 75) {
                                    progress_collor = 'bg-warning';
                                } else {
                                    progress_collor = 'bg-danger';
                                }
                            }
                        }
                        var pb_duration = $("<div class='progress'><div class='progress-bar " + progress_collor + "' role='progressbar' style='width: " + progress.toFixed(0) + "%;' aria-valuenow='" + data.current_station_amkr_duration + "' aria-valuemin='0' aria-valuemax='" + data.current_station_amkr_idle_time + "'>" + progress.toFixed(1) + "%</div></div>")
                        $('td:eq(20)', row).append(pb_duration)
                        //$('td:eq(1)', row).prepend($('<img class="icon-station" />')).addClass("station-name")
                    },
                    columns: [
                        { data: "position", title: langView('field_wagons_position', langs), width: "30px", orderable: true, searchable: false },
                        { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: true, searchable: true },
                        { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: true, searchable: true },
                        { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: true, searchable: true },
                        { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: true, searchable: true },
                        { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                        { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: true, searchable: true },
                        { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: true, searchable: true },
                        { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                        { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: true, searchable: true },
                        { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: true, searchable: true },
                        { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: true, searchable: true },
                        { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                        { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                        { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: true, searchable: true },
                        { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: true, searchable: true },
                        { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: true, searchable: true },
                        { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: true, searchable: false },
                        { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: true, searchable: true },
                        { data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                        { data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                        { data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                        { data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                        { data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                        { data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: true, searchable: false },
                        { data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: true, searchable: false },
                        { data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                        { data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                        { data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                        { data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            text: langView('title_button_buffer', langs),
                            extend: 'copyHtml5',
                        },
                        {
                            text: langView('title_button_excel', langs),
                            extend: 'excelHtml5',
                            sheetName: 'Список вагонов',
                            messageTop: function () {
                                return '';
                            }
                        },
                        {
                            extend: 'colvis',
                            text: langView('title_button_field', langs),
                            collectionLayout: 'fixed two-column',
                        },
                        {
                            extend: 'colvisGroup',
                            text: langView('title_button_field_all', langs),
                            show: ':hidden'
                        },
                        {
                            text: langView('title_button_select', langs),
                            action: function (e, dt, node, config) {
                                if (table_wagons.count_wagon > 0) {
                                    pn_select_wagon.Open(table_wagons.count_wagon)
                                }
                            },
                            enabled: true
                        },
                        {
                            extend: 'selectAll',
                            text: langView('title_button_select_all', langs),
                        },
                        {
                            extend: 'selectNone',
                            text: langView('title_button_select_none', langs),
                        },
                        {
                            extend: 'pageLength',
                        }
                    ]
                });

            },
            // Загрузить информацию
            load: function (id_way) {
                LockScreen(langView('mess_delay', langs));
                ids_inc.getViewWagonsOfWay(id_way, function (wagons) {
                    table_wagons.view(wagons);
                });
            },
            // Показать таблицу с данными
            view: function (wagons) {
                //table_wagons.index = 1;
                table_wagons.obj.clear();
                table_wagons.count_wagon = wagons ? wagons.length : 0;
                //var wagons_s = wagons.sort(function (a, b) {
                //    Number(a.position) - Number(b.position)
                //});

                $.each(wagons, function (i, el) {
                    table_wagons.obj.row.add(table_wagons.get_wagon(el));
                });
                //table_wagons.obj.order([0, 'asc']);
                table_wagons.obj.draw();
                //var b = $('body');
                //alert($('body').css("height"));
                //alert('Текущая прокрутка сверху: ' + window.pageYOffset);
                //alert('Текущая прокрутка слева: ' + window.pageXOffset);
                var s = window;
                var scrollHeight = Math.max(
                  document.body.scrollHeight, document.documentElement.scrollHeight,
                  document.body.offsetHeight, document.documentElement.offsetHeight,
                  document.body.clientHeight, document.documentElement.clientHeight
                );
                LockScreenOff();
            },
            // Определить вагон
            get_wagon: function (wagon) {
                return {
                    "wir_id": wagon.wir_id,
                    "wim_id": wagon.wim_id,
                    "wio_id": wagon.wio_id,
                    "position": wagon.position,
                    "num": wagon.num,
                    "operator": wagon["wagon_operators_abbr_" + lang],
                    "limiting_abbr": wagon["wagon_limiting_abbr_" + lang],
                    "operators_paid": wagon.wagon_operators_paid ? "Платный" : "-",
                    "current_operation_wagon_busy": wagon.current_operation_wagon_busy ? "Да" : "Нет",
                    "wagon_rod": wagon["wagon_rod_abbr_" + lang],
                    "wagon_type": wagon["wagon_type_" + lang],
                    "wagon_gruzp_doc": wagon.wagon_gruzp_doc,
                    "wagon_adm": wagon.wagon_adm,
                    "current_condition_abbr": wagon["current_condition_abbr_" + lang],
                    "current_loading_status": wagon["current_loading_status_" + lang],
                    "arrival_cargo_name": wagon["arrival_cargo_name_" + lang],
                    "arrival_certification_data": wagon["arrival_certification_data_" + lang],
                    "arrival_station_from_name": wagon["arrival_station_from_name_" + lang],
                    "arrival_station_amkr_name": wagon["arrival_station_amkr_name_" + lang],
                    "current_operation_wagon_name": wagon["current_operation_wagon_name_" + lang],
                    "current_operation_wagon_end": wagon.current_operation_wagon_end !== null ? wagon.current_operation_wagon_end.replace(/T/g, ' ') : null,
                    "arrival_division_amkr_abbr": wagon["arrival_division_amkr_abbr_" + lang],
                    "arrival_duration": wagon.arrival_duration,
                    "current_station_amkr_duration": wagon.current_station_amkr_duration,
                    "current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                    "sap_is_num": wagon.sap_is_num,
                    //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                    "sap_is_create_date": wagon.sap_is_create_date,
                    "sap_is_create_time": wagon.sap_is_create_time,
                    "instructional_letters_num": wagon.instructional_letters_num,
                    "instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                    "instructional_letters_station_name": wagon.instructional_letters_station_name,
                    "wagon_date_rem_uz": wagon.wagon_date_rem_uz,
                };

            }
        },
        //*************************************************************************************
        // ОКНО ЗАГРУЗКА ДЕТАЛЬНО
        //*************************************************************************************
        pn_loading_way_detail = {
            obj: null,
            lang: null,
            user_name: null,
            //ids_dir: null,
            // Поля формы
            // инициализвция Окна
            init: function (lang) {
                pn_loading_way_detail.lang = lang;
                //pn_loading_way_detail.ids_dir = new IDS_DIRECTORY(pn_loading_way_detail.lang), // Создадим класс IDS_DIRECTORY
                //pn_loading_way_detail.loadReference(function () {
                pn_loading_way_detail.obj = $("div#loading_way_detail").dialog({
                    resizable: false,
                    //title: 'Информация по пути',
                    modal: false,
                    autoOpen: false,
                    height: "auto",
                    width: 600,

                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {
                            text: "Закрыть",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                // Sumbit form
                pn_loading_way_detail.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
                //});

            },
            // открыть окно добавмить вагоны вручную
            Open: function (max) {
                pn_loading_way_detail.obj.dialog("option", "title", "Загрузка пути №" + id + " - детально:");
                pn_loading_way_detail.obj.dialog("open");
            }
        },
        //*************************************************************************************
        // ОКНО ВЫБРАТЬ ВАГОНЫ
        //*************************************************************************************
        pn_select_wagon = {
            obj: null,
            lang: null,
            max: 0,
            // Поля формы
            select_wagon_side: $('select#select_wagon_side'),
            select_wagon_count: $('input#select_wagon_count'),
            bt_ok: $('button#select_ok').on('click',
                function (event) {
                    event.preventDefault();
                    var count = Number(pn_select_wagon.select_wagon_count.val());
                    if (count <= pn_select_wagon.max) {
                        // закроем
                        // Сбросим выделения
                        table_wagons.obj.rows({ selected: true }).deselect();
                        var side = Number(pn_select_wagon.select_wagon_side.val())
                        var idrows = [];
                        if (side === 0) {
                            for (var i = 1; i < count + 1; i++) {
                                idrows.push('#' + i);
                            }
                        } else {
                            for (var i = pn_select_wagon.max - (count - 1) ; i < pn_select_wagon.max + 1; i++) {
                                idrows.push('#' + i);
                            }
                        }
                        //var rows = table_wagons.obj.rows(['#1', '#3']);
                        var rows = table_wagons.obj.rows(idrows);
                        rows.select();
                        pn_select_wagon.obj.dialog("close");
                    }

                }),
            // инициализвция Окна
            init: function (lang) {
                pn_select_wagon.lang = lang;
                //
                pn_select_wagon.obj = $("div#select_wagon").dialog({
                    resizable: false,
                    title: 'Выберите кол. вагонов',
                    modal: false,
                    autoOpen: false,
                    height: "auto",
                    width: 400,
                    minHeight: 0,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        //"ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                });
                // Выбор голова хвост
                pn_select_wagon.select_wagon_side = cd_initSelect(
                            pn_select_wagon.select_wagon_side,
                            { lang: pn_select_wagon.lang },
                            [{ value: 0, text: "Голова" }, { value: 1, text: "Хвост" }],
                            null,
                            0,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                                if (id > 0) {

                                } else {
                                    //arrival_sostav_way_on.
                                }
                            },
                            null);
                // Sumbit form
                pn_select_wagon.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
                //});

            },
            // открыть окно добавмить вагоны вручную
            Open: function (max) {
                pn_select_wagon.max = max;
                pn_select_wagon.select_wagon_count.val(0);
                //pn_select_wagon.obj.dialog("option", "title", "Загрузка пути №" + id + " - детально:");
                pn_select_wagon.obj.dialog("open");
            }
        },
        //*************************************************************************************
        // ОКНО ДИСЛОКАЦИЯ
        //*************************************************************************************
        pn_dislocation_wagon = {
            obj: null,
            lang: null,
            user_name: null,
            //ids_dir: null,
            alert: $('div#dislocation_wagon_alert'),                                             // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_ways: null,
            //rows: null,
            // Поля формы
            dislocation_wagon_way_from: $('input#dislocation_wagon_way_from'),
            dislocation_wagon_reverse: $('input#dislocation_wagon_reverse'),
            dislocation_wagon_way: $('select#dislocation_wagon_way'),
            dislocation_wagon_side: $('select#dislocation_wagon_side'),
            dislocation_wagon_start: $('input#dislocation_wagon_start'),
            dislocation_wagon_stop: $('input#dislocation_wagon_stop'),
            // инициализвция Окна
            init: function (lang, user_name, callback_ok) {
                pn_dislocation_wagon.lang = lang;
                pn_dislocation_wagon.user_name = user_name;

                //pn_dislocation_wagon.list_ways = ids_inc.ids_dir.getListWays2TextOfAray(ids_inc.ids_dir.list_ways.filter(function (i) { i.id_station ===}), 'id', 'way_num', 'way_name', pn_arrival_sostav.lang, null);
                // Инициализация элементов

                pn_dislocation_wagon.dislocation_wagon_side = cd_initSelect(
                    pn_dislocation_wagon.dislocation_wagon_side,
                    { lang: pn_dislocation_wagon.lang },
                    [{ value: 0, text: "Голова" }, { value: 1, text: "Хвост" }],
                    null,
                    0,
                    function (event) {
                        event.preventDefault();
                        //var id = Number($(this).val());
                    }, null);
                // настроим компонент выбора времени начала
                pn_dislocation_wagon.dislocation_wagon_start = cd_initDateTimeRangePicker(pn_dislocation_wagon.dislocation_wagon_start, { lang: pn_dislocation_wagon.lang, time: true }, function (datetime) {

                });
                // настроим компонент выбора времени начала
                pn_dislocation_wagon.dislocation_wagon_stop = cd_initDateTimeRangePicker(pn_dislocation_wagon.dislocation_wagon_stop, { lang: pn_dislocation_wagon.lang, time: true }, function (datetime) {

                });
                // Соберем все элементы в массив
                pn_dislocation_wagon.all_obj = $([])
                    .add(pn_dislocation_wagon.dislocation_wagon_reverse)
                    .add(pn_dislocation_wagon.dislocation_wagon_way)
                    .add(pn_dislocation_wagon.dislocation_wagon_side)
                    .add(pn_dislocation_wagon.dislocation_wagon_start)
                    .add(pn_dislocation_wagon.dislocation_wagon_stop)
                ;
                // создадим классы 

                //pn_dislocation_wagon.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                pn_dislocation_wagon.val = new VALIDATION(pn_dislocation_wagon.lang, pn_dislocation_wagon.alert, pn_dislocation_wagon.all_obj); // Создадим класс VALIDATION
                //pn_dislocation_wagon.table_car.init();
                pn_dislocation_wagon.obj = $("div#dislocation_wagon").dialog({
                    resizable: false,
                    title: 'Операция "Новая дислокация"',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 600,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {

                            disabled: false,
                            text: "Ок",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                pn_dislocation_wagon.save(callback_ok);
                            }
                        },
                        {
                            text: "Отмена",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                // Sumbit form
                pn_dislocation_wagon.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });


            },
            // открыть окно 
            Open: function (rows, id_station, id_way) {
                pn_dislocation_wagon.val.clear_all();

                pn_dislocation_wagon.dislocation_wagon_way.val(-1); // сбросить выбор
                pn_dislocation_wagon.rows = rows;
                if (rows && rows.length > 0) {

                    pn_dislocation_wagon.list_ways = ids_inc.ids_dir.getListWays2TextOfAray(ids_inc.ids_dir.list_ways.filter(function (i) { return i.id_station === id_station }), 'id', 'way_num', 'way_name', pn_dislocation_wagon.lang, null);

                    var way_from = getObjects(pn_dislocation_wagon.list_ways, 'value', id_way)
                    pn_dislocation_wagon.dislocation_wagon_way_from.val(way_from && way_from.length > 0 ? way_from[0].text : '?')

                    //var exceptions_value = [];
                    //exceptions_value.push(id_way);
                    pn_dislocation_wagon.dislocation_wagon_way = cd_initSelect(
                        pn_dislocation_wagon.dislocation_wagon_way,
                        { lang: pn_dislocation_wagon.lang },
                        pn_dislocation_wagon.list_ways,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            //var id = Number($(this).val());
                        }, null);
                    pn_dislocation_wagon.obj.dialog("open");
                }
            },
            // Валидация данных
            validation: function () {
                pn_dislocation_wagon.val.clear_all();
                var valid = true;
                valid = valid & pn_dislocation_wagon.val.checkSelection(pn_dislocation_wagon.dislocation_wagon_way, "Выберите путь дислокации.");
                valid = valid & pn_dislocation_wagon.val.checkInputOfNull(pn_dislocation_wagon.dislocation_wagon_start.obj, "Укажите время начала дислокации.");
                valid = valid & pn_dislocation_wagon.val.checkInputOfNull(pn_dislocation_wagon.dislocation_wagon_stop.obj, "Укажите время конца дислокации.");
                if (valid) {
                    var start = moment(pn_dislocation_wagon.dislocation_wagon_stop.getDateTime());
                    var stop = moment(pn_dislocation_wagon.dislocation_wagon_start.getDateTime());
                    if (stop.isBefore(start)) {  //|| !start.isSame(stop)
                        valid = valid & true;
                    } else {
                        pn_dislocation_wagon.val.set_object_error(pn_dislocation_wagon.dislocation_wagon_start.obj, "Время начала должно быть меньше времени конца.");
                        pn_dislocation_wagon.val.set_object_error(pn_dislocation_wagon.dislocation_wagon_stop.obj, "Время начала должно быть меньше времени конца.");
                        valid = valid & false;
                    }
                }

                return valid;
            },
            // Сохранить 
            save: function (callback_ok) {
                var list_cars = [];
                var list_nums = [];
                var list_rent = [];
                var valid = pn_dislocation_wagon.validation();
                if (valid) {
                    //pn_dislocation_wagon.val.clear_all();
                    //LockScreen(langView('mess_save', langs));
                    //// Получимсписок номеров вагонов
                    //for (inum = 0; inum < pn_dislocation_wagon.rows.length; inum++) {
                    //    list_nums.push(pn_dislocation_wagon.rows[inum].num);
                    //}
                    //// Получим строки справочника по списку номеров вагона
                    //pn_dislocation_wagon.ids_dir.getWagonOfNums(list_nums, function (result_wagon) {
                    //    //list_cars = result_wagon;
                    //    for (ir = 0; ir < result_wagon.length; ir++) {
                    //        // Получим текущую аренду
                    //        var car = pn_dislocation_wagon.ids_dir.getCloneWagons(result_wagon[ir]);
                    //        var current_rent = pn_dislocation_wagon.ids_dir.getCurrentRentOfWagon(result_wagon[ir]);
                    //        if (car.id_genus === 0 || car.id_countrys === 0 || current_rent === null || (current_rent.id_operator === null || current_rent.id_operator == 0)) {
                    //            car.bit_warning = true;
                    //        } else {
                    //            car.bit_warning = false;
                    //        }
                    //        car.change = toISOStringTZ(new Date());
                    //        car.change_user = pn_dislocation_wagon.user_name;
                    //        var new_rent = pn_dislocation_wagon.ids_dir.getCloneWagonsRent(current_rent);
                    //        new_rent.id_limiting = get_select_number_value(pn_dislocation_wagon.change_group_limiting);
                    //        new_rent.change = toISOStringTZ(new Date()),
                    //            new_rent.change_user = pn_dislocation_wagon.user_name,
                    //            list_rent.push(new_rent);
                    //        list_cars.push(car);
                    //    }
                    //    // обновим аренду
                    //    pn_dislocation_wagon.ids_dir.putListWagonsRent(list_rent, function (result_upd) {
                    //        if (result_upd >= 0) {
                    //            pn_dislocation_wagon.ids_dir.putListWagon(list_cars, function (result_upd_car) {
                    //                if (result_upd_car >= 0) {
                    //                    if (typeof callback_ok === 'function') {
                    //                        pn_dislocation_wagon.obj.dialog("close");
                    //                        callback_ok(result_upd_car);
                    //                    }
                    //                } else {
                    //                    //pn_dislocation_wagon.val.clear_all();
                    //                    pn_dislocation_wagon.val.out_error_message("При обновлении основной информации по группе вагонов произошла ошибка!");
                    //                    LockScreenOff();
                    //                }
                    //            });
                    //        } else {
                    //            //pn_dislocation_wagon.val.clear_all();
                    //            pn_dislocation_wagon.val.out_error_message("При обновлении ограничения на группу вагонов произошла ошибка!");
                    //            LockScreenOff();
                    //        }
                    //    });
                    //});
                }
            },
        };


    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        table_tree_way.init();
        table_wagons.init();


        pn_loading_way_detail.init(lang);
        pn_select_wagon.init(lang);
        // Инициализация панели дислокация
        pn_dislocation_wagon.init(lang, user_name, function (result_dislocation) {
            if (result_dislocation > 0) {
                // Показать после изменения
                //pn_search.view_cars();
                //alert.out_info_message('Обновлены огранечения по группе вагонов в количестве - ' + result_change_group + ' записей');
            }
        });
        table_tree_way.load_station();
        LockScreenOff();
    });
});