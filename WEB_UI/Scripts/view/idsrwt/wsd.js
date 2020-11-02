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

            'field_from_station_amkr': 'Отпр. со ст.',
            'field_on_station_amkr': 'Приб. на ст.',
            'field_on_current_operation_note': '№ поезда',
            'field_current_outer_way_amkr_start': 'Вр. отправления',

            'field_way_dissolution': 'Путь росп.',

            'field_way_name': 'Путь',
            'field_way_pb': 'Сост.',
            'field_way_count': 'Стоит',
            'field_count_wagon_dissolution': 'План.',
            'field_way_capacity': 'Вмещ.',

            'field_num_train': '№ Поезда',
            'field_dt_arrival': 'Отпр.',
            'field_count_wagon': 'Кол.',
            'field_locomotives': 'Локом.',

            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_field': 'Поля',
            'title_button_field_all': 'Все поля',
            'title_button_select': 'Выбрать вагоны',
            'title_button_select_all': 'Все вагоны',
            'title_button_select_none': 'Убрать выбор',

            'title_button_add_way_dissolution': 'Добавить на путь роспуска',
            'title_button_clear_wagon': 'Убрать все вагоны',
            'title_button_clear_all': 'Сбросить все',

            'title_button_add_way_sending': 'Добавить в состав',

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
            ids_inc.load([], ['station', 'ways', 'outer_ways', 'locomotive'], [], false, function () {
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
        // Выполнить роспуск
        bt_dissolution = $('button#dissolution').on('click',
            function (event) {
                alert.clear_message();
                event.preventDefault();
                var select_row = table_tree_way.html_table.find('tr.selected');
                if (select_row && select_row.length > 0) {
                    var id_station = Number($(select_row[0]).attr("station"));
                    var id_park = Number($(select_row[0]).attr("park"));
                    var id_way = Number($(select_row[0]).attr("way"));
                    var output_dissolution = JSON.parse($(select_row[0]).attr("output-dissolution"))
                    // Проверка выбранного пути
                    if (output_dissolution) {
                        operation_detali.view_dissolution(id_way);
                    } else {
                        alert.out_warning_message("Выбранный путь не поддерживает операцию роспуска.");
                    }
                } else {
                    alert.out_warning_message("Выберите путь, по которому нужно провести роспуск.");
                }
            }),
        // Выполнить отправка
        bt_sending = $('button#sending').on('click',
            function (event) {
                alert.clear_message();
                event.preventDefault();
                var select_row = table_tree_way.html_table.find('tr.selected');
                if (select_row && select_row.length > 0) {
                    var id_station = Number($(select_row[0]).attr("station"));
                    var id_park = Number($(select_row[0]).attr("park"));
                    var id_way = Number($(select_row[0]).attr("way"));
                    //TODO: !!! Выполнить проверку на право пити выхода на другую станцию
                    operation_detali.view_sending(id_way);
                    //var output_dissolution = JSON.parse($(select_row[0]).attr("output-dissolution"))
                    //// Проверка выбранного пути
                    //if (output_dissolution) {
                    //    operation_detali.view_dissolution(id_way);
                    //} else {
                    //    alert.out_warning_message("Выбранный путь не поддерживает операцию роспуска.");
                    //}
                } else {
                    alert.out_warning_message("Выберите путь, c которого будет произведена отправка.");
                }
            }),
        bt_arrival = $('button#arrival').on('click',
            function (event) {
                alert.clear_message();
                event.preventDefault();
                // Определим выбранный путь
                var select_row = table_tree_way.html_table.find('tr.selected');
                // Определим станцию пути
                var id_station = null;
                var id_way = null;
                if (select_row && select_row.length > 0) {
                    id_station = Number($(select_row[0]).attr("station"));
                    id_way = Number($(select_row[0]).attr("way"));
                }
                // Откроем окно
                operation_detali.view_arrival(id_station, id_way);
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
                    "select": false,
                    "autoWidth": false,
                    //"sScrollX": "100%",
                    //"scrollX": true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id).addClass('station');
                        $('td:eq(1)', row).attr('colspan', 3);
                        $('td:eq(1)', row).prepend($('<img class="icon-station" />')).addClass("station-name");
                        $('td:eq(2)', row).append(data.count_arrive > 0 ? $('<a href="#" class="badge badge-warning">' + data.count_arrive + '</a>') : data.count_arrive).append('-').append(data.count_sent > 0 ? $('<a href="#" class="badge badge-success">' + data.count_sent + '</a>') : data.count_sent);
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
                        { data: "max", title: 'пр.\\от.', width: "50px", orderable: false, searchable: false },
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
                ids_inc.getViewStationStatus(function (station) {
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
                    name: station["station_name_" + lang],
                    operator: null,
                    count_arrive: station.count_arrive,
                    count_sent: station.count_sent,
                    count: station.count_wagon,
                    max: station.count_capacity,
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
                                        $(tr).after("<tr class='park' id='station-" + row.data().id + "'><td><img class='" + (i !== 0 ? "icon-tree-open" : "icon-tree-open-end") + "'/></td><td class='park-control' park='" + el.id + "' station='" + row.data().id + "' end='" + (i === 0 ? 1 : 0) + "'></td><td colspan='2' class='park-name'><img class='icon-park'/>" + el.park_abbr_ru + "</td><td></td><td></td><td></td></tr>");
                                        // Прикрепим событие выбора парка
                                        var el_ev = table_tree_way.html_table.find('tbody td[station="' + row.data().id + '"][park="' + el.id + '"]');
                                        //table_tree_way.html_table.find('tbody').on('click', 'td[park="' + el.id + '"]', function () {
                                        el_ev.on('click', function () {
                                            var id_park = Number($(this).attr("park"));
                                            var id_station = Number($(this).attr("station"));
                                            var end = Number($(this).attr("end"));
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
                                                            // Получим компонент pb
                                                            var pb_way = table_tree_way.get_pb(el.id, el.capacity, el.count_wagon);
                                                            // определим строку путь
                                                            var tr_way = $("<tr id='station-" + id_station + "' station='" + id_station + "' park='" + id_park + "' way='" + el.id + "' output-dissolution='" + (el.output_dissolution ? el.output_dissolution : false) + "'><td><img class='" + (end === 0 ? "icon-tree-open-skeep" : "icon-tree-open-not") + "'/></td><td></td><td><img class='" + (i !== 0 ? "icon-tree-open" : "icon-tree-open-end") + "'/></td><td class='way-name'><img class='icon-way'/>" + el.way_num_ru + " - " + el.way_abbr_ru + "</td><td></td><td>" + el.count_wagon + "</td><td>" + el.capacity + "</td></tr>");
                                                            var td = tr_way.find('td:eq(4)');
                                                            td.append(pb_way);
                                                            // Событие выбора пути
                                                            tr_way.on('click', function () {
                                                                // Проверим наличие запрета выбора пути
                                                                if (!not_event_select_way) {
                                                                    event.preventDefault();
                                                                    alert.clear_message();
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
            // Обновление информации по станции
            update_station: function (id_station, callback) {
                LockScreen(langView('mess_delay', langs));
                ids_inc.getViewStationStatusOfIDStation(id_station, function (station) {
                    if (station) {
                        var tr_station = table_tree_way.html_table.find('tbody tr#' + id_station);
                        var td_status = tr_station.find('td:eq(2)');
                        var td_count = tr_station.find('td:eq(3)');
                        var td_max = tr_station.find('td:eq(4)');
                        td_status.empty().append(station.count_arrive > 0 ? $('<a href="#" class="badge badge-warning">' + station.count_arrive + '</a>') : station.count_arrive).append('-').append(station.count_sent > 0 ? $('<a href="#" class="badge badge-success">' + station.count_sent + '</a>') : station.count_sent);
                        td_count.empty().append(station.count_wagon);
                        td_max.empty().append(station.count_capacity);
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }

                });
            },
            // Обновление информации по пути
            update_way: function (id_station, id_park, id_way, callback) {
                LockScreen(langView('mess_delay', langs));
                ids_inc.ids_dir.getWaysOfWayID(id_way, function (way) {
                    if (way) {
                        var pb_way = table_tree_way.get_pb(way.id, way.capacity, way.count_wagon);
                        var tr_way = table_tree_way.html_table.find('tbody tr[station="' + id_station + '"][park="' + id_park + '"][way="' + id_way + '"]');
                        var td_pb = tr_way.find('td:eq(4)');
                        var td_count = tr_way.find('td:eq(5)');
                        var td_max = tr_way.find('td:eq(6)');
                        td_pb.empty().append(pb_way);
                        td_count.empty().append(way.count_wagon);
                        td_max.empty().append(way.capacity);
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }

                });
            },
            // Получить прогрес бар
            get_pb: function (id, max, count) {
                // Определим компонент прогресс бар
                var max_capacity = max ? Number(max) : 0
                var count_wagon = count ? Number(count) : 0
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
                var pb_way = $("<div class='progress' title='Информация детально' way='" + id + "'><div class='progress-bar " + progress_collor + "' role='progressbar' style='width: " + progress.toFixed(0) + "%;' aria-valuenow='" + count + "' aria-valuemin='0' aria-valuemax='" + max + "'>" + progress.toFixed(1) + "%</div></div>")
                // событие нажатия на прогресс бар
                pb_way.on('click', function () {
                    event.preventDefault();
                    not_event_select_way = true; // запрет выбора пути
                    var id_way = Number($(this).attr("way"));
                    pn_loading_way_detail.Open(id_way);
                });

                return pb_way;
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
                table_wagons.obj.clear();
                table_wagons.count_wagon = wagons ? wagons.length : 0;
                $.each(wagons, function (i, el) {
                    table_wagons.obj.row.add(table_wagons.get_wagon(el));
                });
                //table_wagons.obj.order([0, 'asc']);
                table_wagons.obj.draw();
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
                    "wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
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
            Open: function (id) {
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
                            for (var i = pn_select_wagon.max - (count - 1); i < pn_select_wagon.max + 1; i++) {
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
            rows_wagon: null,
            id_way_from: null,
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
                pn_dislocation_wagon.dislocation_wagon_way_from.val(""); // сбросить выбор
                pn_dislocation_wagon.dislocation_wagon_reverse.prop('checked', false);
                pn_dislocation_wagon.dislocation_wagon_way.val(-1); // сбросить выбор
                pn_dislocation_wagon.dislocation_wagon_side.val(0); // сбросить выбор
                pn_dislocation_wagon.dislocation_wagon_start.setDateTime(null);
                pn_dislocation_wagon.dislocation_wagon_stop.setDateTime(null);

                pn_dislocation_wagon.rows_wagon = rows;
                pn_dislocation_wagon.id_way_from = id_way;
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
                var list_wir_id = [];
                var valid = pn_dislocation_wagon.validation();
                if (valid) {
                    pn_dislocation_wagon.val.clear_all();
                    LockScreen(langView('mess_save', langs));

                    // Получим список номеров вагонов
                    for (i = 0; i < pn_dislocation_wagon.rows_wagon.length; i++) {
                        list_wir_id.push(pn_dislocation_wagon.rows_wagon[i].wir_id);
                    }
                    // Сформируем команду операции
                    var operation_dislocation = {
                        list_wir_id: list_wir_id,
                        id_way_from: pn_dislocation_wagon.id_way_from,
                        reverse: pn_dislocation_wagon.dislocation_wagon_reverse.prop('checked'),
                        id_way_on: get_input_number_value(pn_dislocation_wagon.dislocation_wagon_way),
                        side_on: get_input_number_value(pn_dislocation_wagon.dislocation_wagon_side),
                        date_start: toISOStringTZ(get_datetime_value(pn_dislocation_wagon.dislocation_wagon_start.val(), pn_dislocation_wagon.lang)),
                        date_stop: toISOStringTZ(get_datetime_value(pn_dislocation_wagon.dislocation_wagon_stop.val(), pn_dislocation_wagon.lang)),
                        user: pn_dislocation_wagon.user_name,
                    }
                    // Выполним операцию
                    ids_inc.postDislocationWagonsOfStation(operation_dislocation, function (result_dislocation) {
                        if (result_dislocation >= 0) {
                            // Обновим путь приема
                            table_tree_way.update_way(current_id_station, current_id_park, operation_dislocation.id_way_on, function () {
                                // Обновим путь отправки
                                table_tree_way.update_way(current_id_station, current_id_park, current_id_way, function () {
                                    // Обновим вагоны на пути
                                    if (typeof callback_ok === 'function') {
                                        pn_dislocation_wagon.obj.dialog("close");
                                        callback_ok(result_dislocation);
                                    }
                                })
                            })
                        } else {
                            pn_dislocation_wagon.val.out_error_message("При выполнении операции 'Дислокация' - произошла ошибка!");
                            LockScreenOff();
                        }
                    });
                }
            },
        },
        //*************************************************************************************
        // ОКНО "Операции детально"
        //*************************************************************************************                
        operation_detali = {
            content: $('.cd-operation-detali'),
            lang: null,
            user: null,
            alert: $('div#operation-alert'),
            ids_rwt: null,
            bit_update: false,                                      // Признак необходимости обновления основного экрана
            rows_update: null,                                      // Пути для обновления на общем окне арма
            callback_close: null,                                   // Функция обратного вызова при закрытии проекта
            list_locomotive: null,                                  // Список локомотивов
            list_stations: null,                                    // Список станций
            list_ways: null,                                        // Список путей
            // -------------------------------------------------------------------------------------------------
            // Операция роспуск
            val_dissolution: null,                              // Класс валидации операции роспуска
            operation_dissolution: $('.operation-dissolution').hide(),
            operation_detali_dissolution_start: $('input#operation_detali_dissolution_start'),
            operation_detali_dissolution_stop: $('input#operation_detali_dissolution_stop'),
            // Изменить дислокацию
            bt_operation_dissolution_run: $('button#operation_dissolution_run').on('click',
                function (event) {
                    operation_detali.bt_operation_dissolution_run.prop("disabled", true);
                    operation_detali.val_dissolution.clear_all();
                    event.preventDefault();
                    var valid = operation_detali.validation_dissolution();
                    if (valid) {
                        // Подготовим список вагонов для дислокации
                        var list_dissolution = [];
                        if (operation_detali.wagons_dissolution_from) {
                            var wagons_dissolution = operation_detali.wagons_dissolution_from.filter(function (i) {
                                return i.id_way_dissolution !== null ? true : false;
                            })
                            $.each(wagons_dissolution, function (i, el) {
                                list_dissolution.push({ wir_id: el.wir_id, position: el.position, id_way_dissolution: el.id_way_dissolution })
                            });

                        }

                        var operation_dissolution = {
                            id_way_from: operation_detali.id_way_from_dissolution,
                            list_dissolution: list_dissolution,
                            date_start: toISOStringTZ(get_datetime_value(operation_detali.operation_detali_dissolution_start.val(), operation_detali.lang)),
                            date_stop: toISOStringTZ(get_datetime_value(operation_detali.operation_detali_dissolution_stop.val(), operation_detali.lang)),
                            user: operation_detali.user,
                        }
                        // Выполнить операцию роспуска
                        ids_inc.postDissolutionWagonsOfStation(operation_dissolution, function (result_dissolution) {
                            if (result_dissolution >= 0) {
                                //operation_detali.val_dissolution.out_info_message("Операция 'Роспуска' - Выполнена");
                                operation_detali.bit_update = true;
                                $.each(operation_dissolution.list_dissolution, function (i, el) {
                                    var way_dissolution = getObjects(operation_detali.table_way_dissolution.ways, 'id', el.id_way_dissolution);
                                    if (way_dissolution && way_dissolution.length > 0) {
                                        // Список путей обновления добавляется каждый раз (даже если был выполнен роспуск а затем не закрыв окно выполнили еще, обновлятся все списки)
                                        var find_ru = operation_detali.rows_update.find(
                                            function (element, index, array) {
                                                return element.id_way === el.id_way_dissolution ? true : false;
                                            })
                                        if (!find_ru || find_ru.length === 0) {
                                            operation_detali.rows_update.push({ id_station: way_dissolution[0].id_station, id_park: way_dissolution[0].id_park, id_way: el.id_way_dissolution });
                                        }

                                    }
                                });

                                operation_detali.refresh_dissolution();
                                operation_detali.val_dissolution.out_info_message("Операция 'Роспуска состава' - Выполнена");
                                //operation_detali.bt_operation_dissolution_run.prop("disabled", false);
                            } else {
                                operation_detali.val_dissolution.out_error_message("При выполнении операции 'Роспуска' - произошла ошибка. Код ошибки =" + result_dislocation);
                            }
                            LockScreenOff();
                        });
                    } else {
                        operation_detali.bt_operation_dissolution_run.prop("disabled", false);
                    }
                }),
            ways_dissolution: null,                             // Список путей с которых производится роспуск
            id_way_from_dissolution: null,                      // Путь с которого будет производится роспуск
            wagons_way_from_dissolution: null,                  // Список вагонов которые стоят на пути для роспуска (исходник)
            wagons_dissolution_from: null,                      // Список вагонов дислокации рабочий 
            // Таблица путей роспуска
            table_way_dissolution: {
                html_table: $('table#way-dissolution'),
                obj: null,
                index_select_way: null,                         // Индекс выбраной строки в таблице
                select_way: null,                                // Выбранный путь
                ways: null,
                //index:1,
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: {
                            style: "single",
                            toggleable: false,
                        },
                        "autoWidth": false,
                        //sScrollX: "100%",
                        //scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', index + 1);
                        },
                        columns: [
                            { data: "way_name", title: langView('field_way_name', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "way_pb", title: langView('field_way_pb', langs), width: "50px", orderable: false, searchable: false },
                            { data: "way_count", title: langView('field_way_count', langs), width: "30px", orderable: false, searchable: false },
                            { data: "count_wagon_dissolution", title: langView('field_count_wagon_dissolution', langs), width: "30px", orderable: false, searchable: false },
                            { data: "way_capacity", title: langView('field_way_capacity', langs), width: "30px", orderable: false, searchable: false },
                        ],
                    }).on('select', function (e, dt, type, indexes) {
                        // Событие выбора пути
                        // Сохраним выбраный путь
                        operation_detali.table_way_dissolution.index_select_way = indexes && indexes.length > 0 ? indexes[0] : null;
                        // получим путь
                        var rowData = operation_detali.table_way_dissolution.obj.rows(indexes).data().toArray();
                        operation_detali.table_way_dissolution.select_way = rowData && rowData.length > 0 ? rowData[0] : null;
                        // Отразим  состояние кнопки добавить
                        operation_detali.table_wagons_way_from.active_button_add();
                        // Показать вагоны на пути роспуска
                        operation_detali.table_wagons_way_on.view(operation_detali.table_way_dissolution.select_way ? operation_detali.table_way_dissolution.select_way.id : null);
                        LockScreenOff();
                    });
                    //    .on('user-select', function (e, dt, type, cell, originalEvent) {
                    //    // Событие нажатия на путь (до выбора пути, можно отменить выбор пути
                    //    //var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                    //    //var rowData = operation_detali.table_way_dissolution.obj.rows(indexes).data().toArray();
                    //    //var index = operation_detali.table_wagons_way_from.obj.rows({ selected: true });
                    //})
                },
                // Загрузить информацию
                load: function () {
                    LockScreen(langView('mess_delay', langs));
                    ids_inc.ids_dir.getWaysOfDissolution(function (ways) {
                        operation_detali.ways_dissolution = ways;
                        // Добавим поле количество вагонов для роспуска на пути
                        if (operation_detali.ways_dissolution) {
                            $.each(operation_detali.ways_dissolution, function (i, el) {
                                el['count_wagon_dissolution'] = 0;
                            });
                        }
                        // Покажем пути                        
                        operation_detali.table_way_dissolution.view(operation_detali.ways_dissolution);
                    });
                },
                // Показать таблицу с данными
                view: function (ways) {
                    operation_detali.table_way_dissolution.obj.clear();
                    operation_detali.table_way_dissolution.ways = ways;
                    $.each(ways, function (i, el) {
                        operation_detali.table_way_dissolution.obj.row.add(operation_detali.table_way_dissolution.get_ways(el));
                    });
                    operation_detali.table_way_dissolution.obj.draw();
                    // Сбросить вагоны на пути роспуска
                    operation_detali.table_wagons_way_on.view(null);
                    //LockScreenOff();
                },
                // Определить вагон
                get_ways: function (way) {
                    var name_way = operation_detali.ids_rwt.ids_dir.getValueObj(way, 'way_num', operation_detali.lang) + ' - ' + operation_detali.ids_rwt.ids_dir.getValueObj(way, 'way_name', operation_detali.lang);
                    return {
                        "id": way.id,
                        //"id_park": way.id_park,
                        //"id_station": way.id_station,
                        "way_name": name_way,
                        //"way_pb": "",
                        "way_count": way.count_wagon,
                        "count_wagon_dissolution": way.count_wagon_dissolution,
                        "way_capacity": way.capacity,
                    };

                },
                // Обновить количество вагонов на пути роспуска
                update_count_dissolution: function (count_dissolution) {
                    if (operation_detali.table_way_dissolution.index_select_way >= 0) {

                        var row = operation_detali.table_way_dissolution.obj.rows(operation_detali.table_way_dissolution.index_select_way);
                        $(row).addClass('add-dissolution');
                        operation_detali.table_way_dissolution.obj.cell(operation_detali.table_way_dissolution.index_select_way, 2).data(count_dissolution);
                        operation_detali.table_way_dissolution.obj.draw();
                    }
                }

            },
            // Таблица вагонов для роспуска
            table_wagons_way_from: {
                html_table: $('table#wagons-way-from'),
                obj: null,
                index_select_wagons: null,                                         // Индексы выбраных вагонов
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: {
                            style: "multi"
                        },
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            if (data.id_way_dissolution !== null) {
                                $('td:eq(1)', row).addClass('not-select-wagon');
                            }

                        },
                        columns: [
                            { data: "position", title: langView('field_wagons_position', langs), width: "30px", orderable: false, searchable: false },
                            { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: false, searchable: false },
                            { data: "way_dissolution", title: langView('field_way_dissolution', langs), width: "60px", orderable: false, searchable: false },
                            { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: false, searchable: false },
                            { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                            { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                            { data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                            { data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: false, searchable: false },
                            { data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            //{
                            //    extend: 'selectAll',
                            //    text: langView('title_button_select_all', langs),
                            //},
                            {
                                extend: 'selectNone',
                                text: langView('title_button_select_none', langs),
                            },
                            {
                                text: langView('title_button_add_way_dissolution', langs),
                                action: function (e, dt, node, config) {
                                    //LockScreen(langView('mess_delay', langs));
                                    LockScreen(langView('mess_save', langs));
                                    // Определим путь
                                    //var index_way = operation_detali.table_way_dissolution.obj.rows({ selected: true });
                                    //var way = operation_detali.table_way_dissolution.obj.rows(index_way[0]).data().toArray();

                                    var id_way_on = operation_detali.table_way_dissolution.select_way ? operation_detali.table_way_dissolution.select_way.id : null;

                                    // Выделим выбранные вагоны
                                    var index_wagon = operation_detali.table_wagons_way_from.index_select_wagons;
                                    //operation_detali.table_wagons_way_from.obj.rows({ selected: true });
                                    var row_select_wagon = operation_detali.table_wagons_way_from.obj.rows(index_wagon).data();
                                    // Проставим по ним путь роспуска
                                    if (row_select_wagon && row_select_wagon.length > 0) {
                                        $.each(row_select_wagon, function (i, el) {

                                            var wagon = getObjects(operation_detali.wagons_dissolution_from, 'wir_id', el.wir_id);
                                            if (wagon && wagon.length > 0) {
                                                wagon[0].id_way_dissolution = id_way_on;
                                            }

                                        });
                                        // Отобразим вагоны на пути роспуска
                                        operation_detali.table_wagons_way_on.view(id_way_on);
                                        // Обновим количество
                                        operation_detali.table_way_dissolution.update_count_dissolution(row_select_wagon.length);
                                        // Отобразим вагоны на пути для роспуска (будут указан путь роспуска)
                                        operation_detali.table_wagons_way_from.view(operation_detali.wagons_dissolution_from, function () {
                                            LockScreenOff();
                                        });
                                    } else {
                                        LockScreenOff();
                                    }

                                },
                                enabled: false
                            },
                            {
                                text: langView('title_button_clear_all', langs),
                                action: function (e, dt, node, config) {
                                    var wagons = operation_detali.wagons_dissolution_from.filter(function (i) {
                                        return i.id_way_dissolution !== null ? true : false;
                                    })
                                    if (wagons && wagons.length > 0) {
                                        dc.dialog_confirm('Open', 'Сбросить?', 'Вы уверены что хотите сбросить все настройки роспуска по всем путям?', function (result) {
                                            if (result) {
                                                LockScreen(langView('mess_save', langs));
                                                // Сбросим поле путь роспуска
                                                if (operation_detali.wagons_dissolution_from) {
                                                    $.each(operation_detali.wagons_dissolution_from, function (i, el) {
                                                        el.id_way_dissolution = null;
                                                    });
                                                }
                                                // Сбросим поле количество вагонов для роспуска на пути
                                                if (operation_detali.ways_dissolution) {
                                                    $.each(operation_detali.ways_dissolution, function (i, el) {
                                                        el['count_wagon_dissolution'] = 0;
                                                    });
                                                }

                                                // Отобразим изменения
                                                operation_detali.table_way_dissolution.view(operation_detali.ways_dissolution);
                                                operation_detali.table_wagons_way_from.view(operation_detali.wagons_dissolution_from, function () {
                                                    LockScreenOff();
                                                });

                                            }
                                        });
                                    }
                                },
                                enabled: true
                            }
                        ]
                    }).on('user-select', function (e, dt, type, cell, originalEvent) {
                        var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                        var wagon = operation_detali.table_wagons_way_from.obj.rows(indexes).data().toArray();
                        if (wagon && wagon.length > 0 && wagon[0].way_dissolution !== "") {
                            e.preventDefault();
                        }
                    }).on('select deselect', function (e, dt, type, indexes) {
                        //var rowData = operation_detali.table_wagons_way_from.obj.rows(indexes).data().toArray();
                        var index = operation_detali.table_wagons_way_from.obj.rows({ selected: true });
                        operation_detali.table_wagons_way_from.index_select_wagons = index[0] && index[0].length > 0 ? index[0] : null;
                        operation_detali.table_wagons_way_from.active_button_add();

                    });
                    //    .on('deselect', function (e, dt, type, indexes) {
                    //    //var rowData = operation_detali.table_wagons_way_from.obj.rows(indexes).data().toArray();
                    //    var index = operation_detali.table_wagons_way_from.obj.rows({ selected: true });
                    //    operation_detali.table_wagons_way_from.active_button_add();
                    //});

                },
                // Загрузить информацию
                load: function (id_way, callback) {
                    LockScreen(langView('mess_delay', langs));
                    ids_inc.getViewWagonsOfWay(id_way, function (wagons) {
                        operation_detali.wagons_way_from_dissolution = wagons;
                        operation_detali.wagons_dissolution_from = wagons;
                        // Добавим поле путь роспуска
                        if (operation_detali.wagons_dissolution_from) {
                            $.each(operation_detali.wagons_dissolution_from, function (i, el) {
                                el['id_way_dissolution'] = null;
                            });
                        }
                        operation_detali.table_wagons_way_from.view(operation_detali.wagons_dissolution_from, callback);
                    });
                },
                // Показать таблицу с данными
                view: function (wagons, callback) {
                    operation_detali.table_wagons_way_from.obj.clear();
                    $.each(wagons, function (i, el) {
                        operation_detali.table_wagons_way_from.obj.row.add(operation_detali.table_wagons_way_from.get_wagon(el));
                    });
                    operation_detali.table_wagons_way_from.obj.draw();
                    operation_detali.table_wagons_way_from.obj.button(1).enable(false);
                    // Кнопка выполнить операцию роспуска
                    operation_detali.active_button_dissolution_run();
                    if (typeof callback === 'function') {
                        callback();
                    }
                },
                // Определить вагон
                get_wagon: function (wagon) {
                    var way_dissolution = getObjects(operation_detali.table_way_dissolution.ways, 'id', wagon.id_way_dissolution);
                    return {
                        "wir_id": wagon.wir_id,
                        "wim_id": wagon.wim_id,
                        "wio_id": wagon.wio_id,
                        "position": wagon.position,
                        "num": wagon.num,
                        "id_way_dissolution": wagon.id_way_dissolution,
                        "way_dissolution": way_dissolution && way_dissolution.length > 0 ? way_dissolution[0]["way_num_" + lang] : "",
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
                        //"arrival_duration": wagon.arrival_duration,
                        //"current_station_amkr_duration": wagon.current_station_amkr_duration,
                        //"current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                        "sap_is_num": wagon.sap_is_num,
                        //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                        "sap_is_create_date": wagon.sap_is_create_date,
                        "sap_is_create_time": wagon.sap_is_create_time,
                        //"instructional_letters_num": wagon.instructional_letters_num,
                        //"instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                        //"instructional_letters_station_name": wagon.instructional_letters_station_name,
                        //"wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
                    };

                },
                // Активировать кнопку добавить
                active_button_add: function () {
                    // Получим выбраный путь, количество вагонов на выбраном пути, кол вагонов для переноса
                    var index_way = operation_detali.table_way_dissolution.index_select_way;
                    var row_way = operation_detali.table_way_dissolution.select_way;
                    var index_wagon = operation_detali.table_wagons_way_from.index_select_wagons;
                    // Отобразим кнопку
                    if (index_way >= 0 && row_way && row_way.count_wagon_dissolution === 0 && index_wagon) {
                        operation_detali.table_wagons_way_from.obj.button(1).enable(true);
                    } else {
                        operation_detali.table_wagons_way_from.obj.button(1).enable(false);
                    }

                }
            },
            // Таблица вагонов выбранные для роспуска
            table_wagons_way_on: {
                html_table: $('table#wagons-way-on'),
                obj: null,
                id_way: null,
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: false,
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                        },
                        columns: [
                            { data: "position", title: langView('field_wagons_position', langs), width: "30px", orderable: false, searchable: false },
                            { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: false, searchable: false },
                            //{ data: "way_dissolution", title: langView('field_way_dissolution', langs), width: "60px", orderable: false, searchable: false },
                            { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: false, searchable: false },
                            { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                            { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: false, searchable: false },
                            ////{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                text: langView('title_button_clear_wagon', langs),
                                action: function (e, dt, node, config) {
                                    if (operation_detali.table_wagons_way_on.id_way) {
                                        LockScreen(langView('mess_save', langs));
                                        wagons = getObjects(operation_detali.wagons_dissolution_from, 'id_way_dissolution', operation_detali.table_wagons_way_on.id_way);
                                        $.each(wagons, function (i, el) {
                                            el.id_way_dissolution = null;
                                        });
                                        operation_detali.table_wagons_way_on.view(operation_detali.table_wagons_way_on.id_way)
                                        // Обновим количество
                                        operation_detali.table_way_dissolution.update_count_dissolution(0);
                                        // Отобразим вагоны на пути для роспуска (будут указан путь роспуска)
                                        operation_detali.table_wagons_way_from.view(operation_detali.wagons_dissolution_from, function () {
                                            LockScreenOff();
                                        });
                                    }
                                },
                                enabled: false,
                            }
                        ]
                    });

                },
                // Показать таблицу с данными
                view: function (id_way) {
                    operation_detali.table_wagons_way_on.id_way = id_way;
                    LockScreen(langView('mess_delay', langs));
                    if (operation_detali.wagons_dissolution_from && id_way) {
                        wagons = getObjects(operation_detali.wagons_dissolution_from, 'id_way_dissolution', id_way);
                        if (wagons && wagons.length > 0) {
                            operation_detali.table_wagons_way_on.obj.button(0).enable(true);
                        } else {
                            operation_detali.table_wagons_way_on.obj.button(0).enable(false);
                        }
                        operation_detali.table_wagons_way_on.obj.clear();
                        $.each(wagons, function (i, el) {
                            operation_detali.table_wagons_way_on.obj.row.add(operation_detali.table_wagons_way_on.get_wagon(el));
                        });
                    } else {
                        operation_detali.table_wagons_way_on.obj.clear();
                        operation_detali.table_wagons_way_on.obj.button(0).enable(false);
                    }
                    operation_detali.table_wagons_way_on.obj.draw();
                    //LockScreenOff();
                },
                // Определить вагон
                get_wagon: function (wagon) {
                    //var name_way = operation_detali.ids_rwt.ids_dir.getValueObj(way, 'way_num', operation_detali.lang) + ' - ' + operation_detali.ids_rwt.ids_dir.getValueObj(way, 'way_name', operation_detali.lang);
                    return {
                        "wir_id": wagon.wir_id,
                        "wim_id": wagon.wim_id,
                        "wio_id": wagon.wio_id,
                        "position": wagon.position,
                        "num": wagon.num,
                        "id_way_dissolution": wagon.id_way_dissolution,
                        "way_dissolution": wagon.id_way_dissolution ? wagon.id_way_dissolution : "",
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
                        //"arrival_duration": wagon.arrival_duration,
                        //"current_station_amkr_duration": wagon.current_station_amkr_duration,
                        //"current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                        "sap_is_num": wagon.sap_is_num,
                        //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                        "sap_is_create_date": wagon.sap_is_create_date,
                        "sap_is_create_time": wagon.sap_is_create_time,
                        //"instructional_letters_num": wagon.instructional_letters_num,
                        //"instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                        //"instructional_letters_station_name": wagon.instructional_letters_station_name,
                        //"wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
                    };

                },
            },
            // Показать роспуск
            view_dissolution: function (id_way) {
                operation_detali.id_way_from_dissolution = id_way;
                // Сбросим бит обновления и список путей обновления
                operation_detali.bit_update = false;
                operation_detali.rows_update = [];
                operation_detali.refresh_dissolution();
                // Показать операцию детально
                operation_detali.content.addClass('is-visible');
            },
            // Показать роспуск
            refresh_dissolution: function () {
                operation_detali.val_dissolution.clear_all();
                operation_detali.operation_detali_dissolution_start.setDateTime(null);
                operation_detali.operation_detali_dissolution_stop.setDateTime(null);
                operation_detali.table_way_dissolution.load();
                operation_detali.table_wagons_way_from.load(operation_detali.id_way_from_dissolution, function () {
                    LockScreenOff();
                });
                operation_detali.operation_dissolution.show();
                //LockScreenOff();
            },
            // Отобразить кнопку выполнить роспуск
            active_button_dissolution_run: function () {
                var wagons = operation_detali.wagons_dissolution_from.filter(function (i) {
                    return i.id_way_dissolution !== null ? true : false;
                })
                if (wagons && wagons.length > 0) {
                    operation_detali.bt_operation_dissolution_run.prop("disabled", false);
                } else {
                    operation_detali.bt_operation_dissolution_run.prop("disabled", true);
                }
            },
            // Валидация данных
            validation_dissolution: function () {
                operation_detali.val_dissolution.clear_all();
                var valid = true;
                valid = valid & operation_detali.val_dissolution.checkInputOfNull(operation_detali.operation_detali_dissolution_start.obj, "Укажите время начала роспуска.");
                valid = valid & operation_detali.val_dissolution.checkInputOfNull(operation_detali.operation_detali_dissolution_stop.obj, "Укажите время конца роспуска.");
                if (valid) {
                    var start = moment(operation_detali.operation_detali_dissolution_start.getDateTime());
                    var stop = moment(operation_detali.operation_detali_dissolution_stop.getDateTime());
                    if (start.isBefore(stop)) {  //|| !start.isSame(stop)
                        valid = valid & true;
                    } else {
                        operation_detali.val_dissolution.set_object_error(operation_detali.operation_detali_dissolution_start.obj, "Время начала должно быть меньше времени конца.");
                        operation_detali.val_dissolution.set_object_error(operation_detali.operation_detali_dissolution_stop.obj, "Время начала должно быть меньше времени конца.");
                        valid = valid & false;
                    }
                }
                return valid;
            },
            // -------------------------------------------------------------------------------------------------
            // Операция отправить
            val_sending: null,                              // Класс валидации операции роспуска
            operation_sending: $('.operation-sending').hide(),
            operation_detali_sending_way_from: $('input#operation_detali_sending_way_from'),
            operation_detali_sending_station: $('select#operation_detali_sending_station'),
            operation_detali_sending_outer_ways: $('select#operation_detali_sending_outer_ways'),
            operation_detali_sending_num_train: $('input#operation_detali_sending_num_train'),
            operation_detali_sending_locomotive1: $('select#operation_detali_sending_locomotive1'),
            operation_detali_sending_locomotive2: $('select#operation_detali_sending_locomotive2'),
            operation_detali_sending_lead_time: $('input#operation_detali_sending_lead_time'),
            //operation_detali_sending_start: $('input#operation_detali_sending_start'),
            //operation_detali_sending_stop: $('input#operation_detali_sending_stop'),
            // Выполнить отправку состава
            bt_operation_sending_run: $('button#operation_sending_run').on('click',
                function (event) {
                    operation_detali.bt_operation_sending_run.prop("disabled", true);
                    operation_detali.val_sending.clear_all();
                    event.preventDefault();
                    var valid = operation_detali.validation_sending();
                    if (valid) {
                        // Подготовим список вагонов для отправки
                        var list_sending = [];
                        if (operation_detali.wagons_sending_from) {
                            var wagons_sending = operation_detali.wagons_sending_from.filter(function (i) {
                                return i.position_sending !== null ? true : false;
                            }).sort(function (a, b) {
                                return Number(a.position_sending) - Number(b.position_sending)
                            });
                            $.each(wagons_sending, function (i, el) {
                                list_sending.push({ wir_id: el.wir_id, position: el.position_sending })
                            });

                        }
                        // Определим пакет данных отправки на другую станцию
                        var operation_sending = {
                            id_way_from: operation_detali.id_way_from_sending,
                            list_sending: list_sending,
                            id_outer_ways: get_select_number_value(operation_detali.operation_detali_sending_outer_ways),
                            num_sostav: get_input_number_value(operation_detali.operation_detali_sending_num_train),
                            lead_time: toISOStringTZ(get_datetime_value(operation_detali.operation_detali_sending_lead_time.val(), operation_detali.lang)),
                            //date_start: toISOStringTZ(get_datetime_value(operation_detali.operation_detali_sending_start.val(), operation_detali.lang)),
                            //date_stop: toISOStringTZ(get_datetime_value(operation_detali.operation_detali_sending_stop.val(), operation_detali.lang)),
                            locomotive1: get_select_string_value(operation_detali.operation_detali_sending_locomotive1),
                            locomotive2: get_select_string_value(operation_detali.operation_detali_sending_locomotive2),
                            user: operation_detali.user,
                        }
                        // Выполнить операцию отправки postSendingWagonsOfStation
                        ids_inc.postSendingWagonsOfStation(operation_sending, function (result_sending) {
                            if (result_sending >= 0) {
                                // Обновить путь отправки и станцию отправки
                                if (operation_detali.way_from_sending) {

                                    operation_detali.rows_update.push({ id_station: operation_detali.way_from_sending.id_station, id_park: operation_detali.way_from_sending.id_park, id_way: operation_detali.way_from_sending.id });
                                    operation_detali.rows_update.push({ id_station: operation_detali.way_from_sending.id_station, id_park: null, id_way: null });
                                }
                                // Получим внешний путь
                                var outer_way = getObjects(ids_inc.ids_dir.list_outer_ways, 'id', operation_sending.id_outer_ways)
                                // Пути определены?
                                if (outer_way && outer_way.length > 0) {
                                    // Обновить станцию отправки
                                    operation_detali.rows_update.push({ id_station: outer_way[0].id_station_on, id_park: null, id_way: null });
                                }
                                operation_detali.bit_update = true;
                                operation_detali.refresh_sending();
                                operation_detali.val_sending.out_info_message("Операция 'Отправление состава на станцию АМКР' - Выполнена");
                            } else {
                                operation_detali.val_sending.out_error_message("При выполнении операции 'Отправление состава на станцию АМКР' - произошла ошибка. Код ошибки =" + result_sending);
                            }
                            LockScreenOff();
                        });
                    } else {
                        operation_detali.bt_operation_sending_run.prop("disabled", false);
                    }
                }),
            id_way_from_sending: null,                      // Путь с которого будет производится отправка
            way_from_sending: null,                         // Путь с которого будет производится отправка
            outer_ways_sending: null,                       // Внешние пути доступные по станции отправки
            list_stations_sending: null,                    // список станции доступные для отправки
            wagons_way_from_sending: null,                  // Список вагонов которые стоят на пути для отправки (исходник)
            wagons_sending_from: null,                      // Список вагонов отправки рабочий 
            // Таблица вагонов для отправки
            table_wagons_sending_way_from: {
                html_table: $('table#wagons-sending-way-from'),
                obj: null,
                index_select_wagons: null,                                         // Индексы выбраных вагонов
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: {
                            style: "multi"
                        },
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            if (data.position_sending !== null) {
                                $('td:eq(1)', row).addClass('not-select-wagon');
                                $(row).addClass('select-sending')
                            }
                        },
                        columns: [
                            { data: "position", title: langView('field_wagons_position', langs), width: "30px", orderable: false, searchable: false },
                            { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: false, searchable: false },
                            { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: false, searchable: false },
                            { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                            { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                            { data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                            { data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: false, searchable: false },
                            { data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                //extend: 'selectAll',
                                text: langView('title_button_select_all', langs),
                                action: function () {
                                    operation_detali.table_wagons_sending_way_from.obj.rows(':not(.select-sending)').select();
                                }
                            },
                            {
                                extend: 'selectNone',
                                text: langView('title_button_select_none', langs),
                            },
                            {
                                text: langView('title_button_add_way_sending', langs),
                                action: function (e, dt, node, config) {
                                    //this.processing(true);
                                    LockScreen(langView('mess_save', langs));
                                    operation_detali.table_wagons_sending_way_from.add_way_sending(function () {
                                        LockScreenOff();
                                    });
                                    //this.processing(false);
                                },
                                enabled: false
                            }
                        ]
                    }).on('user-select', function (e, dt, type, cell, originalEvent) {
                        var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                        var wagon = operation_detali.table_wagons_sending_way_from.obj.rows(indexes).data().toArray();
                        if (wagon && wagon.length > 0 && wagon[0].position_sending !== null) {
                            e.preventDefault();
                        }
                    }).on('select deselect', function (e, dt, type, indexes) {
                        var index = operation_detali.table_wagons_sending_way_from.obj.rows({ selected: true });
                        operation_detali.table_wagons_sending_way_from.index_select_wagons = index[0] && index[0].length > 0 ? index[0] : null;
                        operation_detali.table_wagons_sending_way_from.active_button_add();

                    });
                    //    .on('buttons-processing', function (e, indicator) {
                    //    if (indicator) {
                    //        //overlay.appendTo('body');
                    //        LockScreen(langView('mess_save', langs));
                    //    }
                    //    else {
                    //        LockScreenOff();
                    //        //overlay.remove();
                    //    }
                    //});
                },
                // Загрузить информацию
                load: function (id_way, callback) {
                    LockScreen(langView('mess_delay', langs));
                    ids_inc.getViewWagonsOfWay(id_way, function (wagons) {
                        operation_detali.wagons_way_from_sending = wagons;
                        operation_detali.wagons_sending_from = wagons;
                        // Добавим поле путь роспуска
                        if (operation_detali.wagons_sending_from) {
                            $.each(operation_detali.wagons_sending_from, function (i, el) {
                                el['position_sending'] = null;
                            });
                        }
                        operation_detali.table_wagons_sending_way_from.view(operation_detali.wagons_sending_from, callback);
                    });
                },
                // Показать таблицу с данными
                view: function (wagons, callback) {
                    operation_detali.table_wagons_sending_way_from.obj.clear();
                    $.each(wagons, function (i, el) {
                        operation_detali.table_wagons_sending_way_from.obj.row.add(operation_detali.table_wagons_sending_way_from.get_wagon(el));
                    });
                    operation_detali.table_wagons_sending_way_from.obj.draw();
                    operation_detali.table_wagons_sending_way_from.obj.button(2).enable(false);
                    // Кнопка выполнить операцию роспуска
                    //operation_detali.active_button_sending_run();
                    if (typeof callback === 'function') {
                        callback();
                    }
                },
                // Определить вагон
                get_wagon: function (wagon) {
                    //var way_dissolution = getObjects(operation_detali.table_way_dissolution.ways, 'id', wagon.id_way_dissolution);
                    return {
                        "wir_id": wagon.wir_id,
                        "wim_id": wagon.wim_id,
                        "wio_id": wagon.wio_id,
                        "position": wagon.position,
                        "num": wagon.num,
                        "position_sending": wagon.position_sending,
                        //"id_way_dissolution": wagon.id_way_dissolution,
                        //"way_dissolution": way_dissolution && way_dissolution.length > 0 ? way_dissolution[0]["way_num_" + lang] : "",
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
                        //"arrival_duration": wagon.arrival_duration,
                        //"current_station_amkr_duration": wagon.current_station_amkr_duration,
                        //"current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                        "sap_is_num": wagon.sap_is_num,
                        //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                        "sap_is_create_date": wagon.sap_is_create_date,
                        "sap_is_create_time": wagon.sap_is_create_time,
                        //"instructional_letters_num": wagon.instructional_letters_num,
                        //"instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                        //"instructional_letters_station_name": wagon.instructional_letters_station_name,
                        //"wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
                    };

                },
                // Активировать кнопку добавить
                active_button_add: function () {
                    // Получим выбраный путь, количество вагонов на выбраном пути, кол вагонов для переноса
                    var index_wagon = operation_detali.table_wagons_sending_way_from.index_select_wagons;
                    // Отобразим кнопку
                    if (index_wagon && index_wagon.length > 0) {
                        operation_detali.table_wagons_sending_way_from.obj.button(2).enable(true);
                    } else {
                        operation_detali.table_wagons_sending_way_from.obj.button(2).enable(false);
                    }

                },
                // Добавить вагоны в состав для отправки
                add_way_sending: function (callback) {
                    // Выделим выбранные вагоны
                    var index_wagon = operation_detali.table_wagons_sending_way_from.index_select_wagons;
                    var row_select_wagon = operation_detali.table_wagons_sending_way_from.obj.rows(index_wagon).data();
                    // Получим последнюю позицию вагонов состава для отправки
                    var wagon_max_poz = operation_detali.wagons_sending_from.reduce(function (prev, current, index, array) { return prev.position_sending > current.position_sending ? prev : current });
                    var position_sending = wagon_max_poz && wagon_max_poz.position_sending !== null ? wagon_max_poz.position_sending + 1 : 1;
                    // Проставим сформируем состав для отправки
                    //var row_select_wagon = null;
                    if (row_select_wagon && row_select_wagon.length > 0) {
                        $.each(row_select_wagon, function (i, el) {

                            var wagon = getObjects(operation_detali.wagons_sending_from, 'wir_id', el.wir_id);
                            if (wagon && wagon.length > 0) {
                                wagon[0].position_sending = position_sending;
                                position_sending++;
                            }

                        });
                        // Отобразим вагоны состава для отправки
                        operation_detali.table_wagons_sending.view();
                        // Отобразим вагоны на пути для роспуска (будут указан путь роспуска)
                        operation_detali.table_wagons_sending_way_from.view(operation_detali.wagons_sending_from, function () {
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    } else {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                },

                //screen: function (indicator, callback) {
                //    if (indicator) {
                //        //overlay.appendTo('body');
                //        LockScreen(langView('mess_save', langs));
                //    }
                //    else {
                //        LockScreenOff();
                //        //overlay.remove();
                //    }
                //    if (typeof callback === 'function') {
                //        callback();
                //    }
                //}
            },
            // Таблица вагонов состав сформирован для отправки
            table_wagons_sending: {
                html_table: $('table#wagons-sending'),
                obj: null,
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: false,
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                        },
                        columns: [
                            { data: "position_sending", title: langView('field_wagons_position', langs), width: "30px", orderable: false, searchable: false },
                            { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: false, searchable: false },
                            //{ data: "way_dissolution", title: langView('field_way_dissolution', langs), width: "60px", orderable: false, searchable: false },
                            { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: false, searchable: false },
                            { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                            { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                            //{ data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: false, searchable: false },
                            ////{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                text: langView('title_button_clear_wagon', langs),
                                action: function (e, dt, node, config) {
                                    //if (operation_detali.table_wagons_sending.id_way) {
                                    LockScreen(langView('mess_save', langs));
                                    wagons = operation_detali.wagons_sending_from.filter(function (i) {
                                        return i.position_sending !== null ? true : false;
                                    });
                                    $.each(wagons, function (i, el) {
                                        el.position_sending = null;
                                    });
                                    // Отобразим вагоны состава для отправки
                                    operation_detali.table_wagons_sending.view();
                                    // Отобразим вагоны на пути для отправки ()
                                    operation_detali.table_wagons_sending_way_from.view(operation_detali.wagons_sending_from, function () {
                                        LockScreenOff();
                                    });
                                    //}
                                },
                                enabled: false,
                            }
                        ]
                    });

                },
                // Показать таблицу с данными
                view: function () {
                    LockScreen(langView('mess_delay', langs));
                    if (operation_detali.wagons_sending_from) {
                        // Отфильтруем вагоны по которым выставлена новая позиция и отсортируем по position_sending
                        var wagons = operation_detali.wagons_sending_from.filter(function (i) {
                            return i.position_sending !== null ? true : false;
                        }).sort(function (a, b) {
                            return Number(a.position_sending) - Number(b.position_sending)
                        });
                        if (wagons && wagons.length > 0) {
                            operation_detali.table_wagons_sending.obj.button(0).enable(true);
                            operation_detali.bt_operation_sending_run.prop("disabled", false);
                        } else {
                            operation_detali.table_wagons_sending.obj.button(0).enable(false);
                            operation_detali.bt_operation_sending_run.prop("disabled", true);
                        }
                        operation_detali.table_wagons_sending.obj.clear();
                        $.each(wagons, function (i, el) {
                            operation_detali.table_wagons_sending.obj.row.add(operation_detali.table_wagons_sending.get_wagon(el));
                        });
                    } else {
                        operation_detali.table_wagons_sending.obj.clear();
                        operation_detali.table_wagons_sending.obj.button(0).enable(false);
                    }
                    operation_detali.table_wagons_sending.obj.draw();
                    LockScreenOff();
                },
                // Определить вагон
                get_wagon: function (wagon) {
                    //var name_way = operation_detali.ids_rwt.ids_dir.getValueObj(way, 'way_num', operation_detali.lang) + ' - ' + operation_detali.ids_rwt.ids_dir.getValueObj(way, 'way_name', operation_detali.lang);
                    return {
                        "wir_id": wagon.wir_id,
                        "wim_id": wagon.wim_id,
                        "wio_id": wagon.wio_id,
                        "position_sending": wagon.position_sending,
                        "num": wagon.num,
                        "id_way_dissolution": wagon.id_way_dissolution,
                        "way_dissolution": wagon.id_way_dissolution ? wagon.id_way_dissolution : "",
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
                        //"arrival_duration": wagon.arrival_duration,
                        //"current_station_amkr_duration": wagon.current_station_amkr_duration,
                        //"current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                        "sap_is_num": wagon.sap_is_num,
                        //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                        "sap_is_create_date": wagon.sap_is_create_date,
                        "sap_is_create_time": wagon.sap_is_create_time,
                        //"instructional_letters_num": wagon.instructional_letters_num,
                        //"instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                        //"instructional_letters_station_name": wagon.instructional_letters_station_name,
                        //"wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
                    };

                },
            },
            // Показать окно отправки
            view_sending: function (id_way) {
                operation_detali.id_way_from_sending = id_way;
                // Путь отправки
                var way_from = getObjects(ids_inc.ids_dir.list_ways, 'id', id_way)
                // Проверим путь найден
                if (way_from && way_from.length > 0) {
                    operation_detali.way_from_sending = way_from && way_from.length > 0 ? way_from[0] : null;
                    operation_detali.operation_detali_sending_way_from.val(operation_detali.way_from_sending ? (operation_detali.way_from_sending["way_num_" + operation_detali.lang] + ' - ' + operation_detali.way_from_sending["way_name_" + operation_detali.lang]) : "");
                    // Получить доступные пути отправки для станции на которой стоят вагоны
                    operation_detali.outer_ways_sending = getObjects(ids_inc.ids_dir.list_outer_ways, 'id_station_from', operation_detali.way_from_sending.id_station)
                    // Получим список станций, доступных для отправки
                    operation_detali.list_stations_sending = [];
                    // Обновим путь приема
                    $.each(operation_detali.outer_ways_sending, function (i, el) {
                        // Исключим попадание дублей
                        var find_st = operation_detali.list_stations_sending.find(
                            function (element, index, array) {
                                return element.value === el.Directory_Station.id ? true : false;
                            })
                        if (!find_st || find_st.length === 0) {
                            operation_detali.list_stations_sending.push({ value: el.Directory_Station.id, text: el.Directory_Station["station_name_" + operation_detali.lang] })
                        }
                    });
                    // Настроим компонент станций приема
                    operation_detali.operation_detali_sending_station = cd_initSelect(
                        operation_detali.operation_detali_sending_station,
                        { lang: operation_detali.lang },
                        operation_detali.list_stations_sending,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id_station_on = Number($(this).val());
                            if (id_station_on > 0) {
                                operation_detali.operation_detali_sending_outer_ways.prop("disabled", false);

                            } else {
                                operation_detali.operation_detali_sending_outer_ways.prop("disabled", true);
                            }
                            // Обновим компонент
                            operation_detali.update_outer_ways(id_station_on);
                        }, null);
                    // Деактивируем компонент выбора внешнего пути
                    operation_detali.operation_detali_sending_outer_ways.prop("disabled", true);

                    // Настроим компонент локомотивы 
                    operation_detali.operation_detali_sending_locomotive1 = cd_initSelect(
                        operation_detali.operation_detali_sending_locomotive1,
                        { lang: operation_detali.lang },
                        operation_detali.list_locomotive,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var locomotive = $(this).val();

                        }, null);
                    operation_detali.operation_detali_sending_locomotive2 = cd_initSelect(
                        operation_detali.operation_detali_sending_locomotive2,
                        { lang: operation_detali.lang },
                        operation_detali.list_locomotive,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var locomotive = $(this).val();

                        }, null);
                    // Сбросим бит обновления и список путей обновления
                    operation_detali.bit_update = false;
                    operation_detali.rows_update = [];
                    operation_detali.refresh_sending();
                    // Показать операцию детально
                    operation_detali.content.addClass('is-visible');
                }
            },
            // Показать отправку
            refresh_sending: function () {
                operation_detali.val_sending.clear_all();
                operation_detali.operation_detali_sending_station.val(-1);
                operation_detali.operation_detali_sending_outer_ways.val(-1);
                operation_detali.operation_detali_sending_num_train.val('');
                operation_detali.operation_detali_sending_locomotive1.val(-1);
                operation_detali.operation_detali_sending_locomotive2.val(-1);
                operation_detali.operation_detali_sending_lead_time.setDateTime(null);
                //operation_detali.operation_detali_sending_start.setDateTime(null);
                //operation_detali.operation_detali_sending_stop.setDateTime(null);
                operation_detali.table_wagons_sending_way_from.load(operation_detali.id_way_from_sending, function () {
                    operation_detali.table_wagons_sending.view();
                    LockScreenOff();
                });
                operation_detali.operation_sending.show();
                //LockScreenOff();
            },
            // Обновим компонент внешних путей
            update_outer_ways: function (id_statstion_on) {
                // уточним список путей отправки
                var outer_ways_sending = getObjects(operation_detali.outer_ways_sending, 'id_station_on', id_statstion_on)
                var list_outer_ways = [];
                // Пути определены?
                if (outer_ways_sending && outer_ways_sending.length > 0) {
                    $.each(outer_ways_sending, function (i, el) {
                        list_outer_ways.push({ value: el.id, text: el["name_outer_way_" + operation_detali.lang] })
                    });
                }
                // Отобразим компанент внешних путей
                operation_detali.operation_detali_sending_outer_ways = cd_initSelect(
                    operation_detali.operation_detali_sending_outer_ways,
                    { lang: operation_detali.lang },
                    list_outer_ways,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var outer_way = Number($(this).val());

                    }, null);
                // Отобразим вагоны состава для отправки
                operation_detali.table_wagons_sending.view();
            },
            // Валидация данных
            validation_sending: function () {
                operation_detali.val_sending.clear_all();
                var valid = true;
                valid = valid & operation_detali.val_sending.checkSelection(operation_detali.operation_detali_sending_station, "Укажите станцию отправки");
                valid = valid & operation_detali.val_sending.checkSelection(operation_detali.operation_detali_sending_outer_ways, "Укажите внешний путь отправки");
                valid = valid & operation_detali.val_sending.checkInputOfNull(operation_detali.operation_detali_sending_num_train, "Укажите номер поезда.");
                valid = valid & operation_detali.val_sending.checkSelection(operation_detali.operation_detali_sending_locomotive1, "Укажите минимум один локомотив");
                valid = valid & operation_detali.val_sending.checkInputOfNull(operation_detali.operation_detali_sending_lead_time.obj, "Укажите время выполнения отправки.");

                //valid = valid & operation_detali.val_sending.checkInputOfNull(operation_detali.operation_detali_sending_start.obj, "Укажите время начала отправки.");
                //valid = valid & operation_detali.val_sending.checkInputOfNull(operation_detali.operation_detali_sending_stop.obj, "Укажите время конца отправки.");
                //if (valid) {
                //    var start = moment(operation_detali.operation_detali_sending_start.getDateTime());
                //    var stop = moment(operation_detali.operation_detali_sending_stop.getDateTime());
                //    if (start.isBefore(stop)) {  //|| !start.isSame(stop)
                //        valid = valid & true;
                //    } else {
                //        operation_detali.val_sending.set_object_error(operation_detali.operation_detali_sending_start.obj, "Время начала должно быть меньше времени конца.");
                //        operation_detali.val_sending.set_object_error(operation_detali.operation_detali_sending_stop.obj, "Время начала должно быть меньше времени конца.");
                //        valid = valid & false;
                //    }
                //}
                return valid;
            },
            // -------------------------------------------------------------------------------------------------
            // Операция принять поезд
            val_arrival: null,                              // Класс валидации операции принять состав
            operation_arrival: $('.operation-arrival').hide(),
            operation_detali_arrival_station: $('select#operation_detali_arrival_station'),
            operation_detali_arrival_outer_ways: $('select#operation_detali_arrival_outer_ways'),
            operation_detali_arrival_way: $('select#operation_detali_arrival_way'),
            operation_detali_arrival_reverse: $('input#operation_detali_arrival_reverse'),
            operation_detali_arrival_side: $('select#operation_detali_arrival_side'),
            operation_detali_arrival_lead_time: $('input#operation_detali_arrival_lead_time'),
            operation_detali_arrival_locomotive1: $('select#operation_detali_arrival_locomotive1'),
            operation_detali_arrival_locomotive2: $('select#operation_detali_arrival_locomotive2'),

            // Выполнить отправку состава
            bt_operation_arrival_run: $('button#operation_arrival_run').on('click',
                function (event) {
                    operation_detali.bt_operation_arrival_run.prop("disabled", true);
                    operation_detali.val_arrival.clear_all();
                    event.preventDefault();
                    var valid = operation_detali.validation_arrival();
                    if (valid) {
                        // Подготовим список вагонов для отправки
                        var list_arrival = [];
                        if (operation_detali.wagons_arrival) {
                            var list_arrival_wagon = operation_detali.wagons_arrival.filter(function (i) {
                                return i.position_arrival !== null ? true : false;
                            }).sort(function (a, b) {
                                return Number(a.position_arrival) - Number(b.position_arrival)
                            });
                            $.each(list_arrival_wagon, function (i, el) {
                                list_arrival.push({ wir_id: el.wir_id, position: el.position_arrival })
                            });

                        }
                        // Определим пакет данных отправки на другую станцию
                        var operation_arrival = {
                            id_outer_way: get_select_number_value(operation_detali.operation_detali_arrival_outer_ways),
                            reverse: operation_detali.operation_detali_arrival_reverse.prop('checked'),
                            list_arrival: list_arrival,
                            id_way_on: get_select_number_value(operation_detali.operation_detali_arrival_way),
                            side_on: get_input_number_value(operation_detali.operation_detali_arrival_side),
                            lead_time: toISOStringTZ(get_datetime_value(operation_detali.operation_detali_arrival_lead_time.val(), operation_detali.lang)),
                            locomotive1: get_select_string_value(operation_detali.operation_detali_arrival_locomotive1),
                            locomotive2: get_select_string_value(operation_detali.operation_detali_arrival_locomotive2),
                            user: operation_detali.user,
                        }
                        // Выполнить операцию приема postArrivalWagonsOfStation
                        ids_inc.postArrivalWagonsOfStation(operation_arrival, function (result_arrival) {
                            if (result_arrival >= 0) {
                                // Получим внешний путь
                                var outer_way = getObjects(ids_inc.ids_dir.list_outer_ways, 'id', operation_detali.table_arrival_sostav.id_outer_ways)
                                // Пути определены?
                                if (outer_way && outer_way.length > 0) {
                                    // Обновить станцию отправки
                                    operation_detali.rows_update.push({ id_station: outer_way[0].id_station_from, id_park: null, id_way: null });
                                }
                                // Обновить станцию приема
                                operation_detali.rows_update.push({ id_station: operation_detali.id_station_on_arrival, id_park: null, id_way: null });
                                // Обновим путь приема
                                var way = getObjects(ids_inc.ids_dir.list_ways, 'id', operation_detali.id_way_on_arrival)
                                // Пути определены?
                                if (way && way.length > 0) {
                                    // Обновить станцию отправки
                                    operation_detali.rows_update.push({ id_station: way[0].id_station, id_park: way[0].id_park, id_way: way[0].id });
                                }
                                operation_detali.bit_update = true;
                                operation_detali.refresh_arrival();
                                operation_detali.val_arrival.out_info_message("Операция 'Прибытия состава на станцию АМКР' - Выполнена");
                            } else {
                                operation_detali.val_arrival.out_error_message("При выполнении операции 'Прибытия состава на станцию АМКР' - произошла ошибка. Код ошибки =" + result_arrival);
                            }
                            LockScreenOff();
                        });
                    } else {
                        operation_detali.bt_operation_arrival_run.prop("disabled", false);
                    }
                }),
            id_station_on_arrival: null,                    // Станция на которую будем принимать состав
            id_way_on_arrival: null,                        // путь на который будем принимать состав
            wagons_arrival_from: null,                      // Список вагонов которые стоят на внешнем пути для приема (исходник)
            wagons_arrival: null,                           // Список вагонов на внешнем пути для приема (рабочий) 
            // Таблица составов на подходе
            table_arrival_sostav: {
                html_table: $('table#arrival_sostav'),
                obj: null,
                id_outer_ways: null,
                index_select_sostav: null,                       // Индекс выбраной строки в таблице
                select_sostav: null,                             // Выбранный путь
                arrival_sostavs: null,                           // Список составов
                arrival_select_wagons: null,                     // Список вагонов выбранного состава
                //index:1,
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: {
                            style: "single",
                            toggleable: false,
                        },
                        "autoWidth": false,
                        //sScrollX: "100%",
                        //scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', index + 1);
                        },
                        columns: [
                            { data: "num_train", title: langView('field_num_train', langs), width: "50px", orderable: false, searchable: false },
                            { data: "outer_way_start", title: langView('field_dt_arrival', langs), width: "100px", orderable: false, searchable: false },
                            { data: "count_wagon", title: langView('field_count_wagon', langs), width: "30px", orderable: false, searchable: false },
                            { data: "locomotives", title: langView('field_locomotives', langs), width: "100px", orderable: false, searchable: false },
                        ],
                    }).on('select', function (e, dt, type, indexes) {
                        // Событие выбора пути
                        // Сохраним выбраный состав
                        operation_detali.table_arrival_sostav.index_select_sostav = indexes && indexes.length > 0 ? indexes[0] : null;
                        // получим состав
                        var rowData = operation_detali.table_arrival_sostav.obj.rows(indexes).data().toArray();
                        operation_detali.table_arrival_sostav.select_sostav = rowData && rowData.length > 0 ? rowData[0] : null;
                        // Отразим  состояние кнопки добавить
                        //operation_detali.table_wagons_way_from.active_button_add();
                        // Подготовим рабочий масив (Сбросим поле позиции для приема)
                        if (operation_detali.wagons_arrival) {
                            $.each(operation_detali.wagons_arrival, function (i, el) {
                                el.position_arrival = null;
                            });
                        }

                        // Показать вагоны выбранного состава
                        operation_detali.table_arrival_sostav.arrival_select_wagons = [];

                        // Проверим есть вагоны в прибытии
                        if (operation_detali.wagons_arrival && operation_detali.wagons_arrival.length > 0) {
                            // Найдем вагоны выбранного состава
                            operation_detali.table_arrival_sostav.arrival_select_wagons = getObjects(operation_detali.wagons_arrival, 'current_operation_note', operation_detali.table_arrival_sostav.select_sostav ? operation_detali.table_arrival_sostav.select_sostav.num_train : null);
                        }
                        // Покажем состав
                        operation_detali.table_wagons_arrival_from.view(operation_detali.table_arrival_sostav.arrival_select_wagons, function () {
                            LockScreenOff();
                        });
                        // Сбросим таблицу выбранных вагонов
                        operation_detali.table_wagons_arrival_on.view();

                    });
                },
                // Загрузить информацию
                load: function (id_outer_ways) {
                    operation_detali.table_arrival_sostav.id_outer_ways = id_outer_ways;

                    if (id_outer_ways) {
                        LockScreen(langView('mess_delay', langs));
                        // Сбросим рабочий список вагонов
                        operation_detali.wagons_arrival_from = [];
                        operation_detali.wagons_arrival = [];
                        ids_inc.getViewWagonsOfOuterWay(id_outer_ways, function (arrival_wagons) {
                            operation_detali.wagons_arrival_from = arrival_wagons;
                            operation_detali.wagons_arrival = arrival_wagons;
                            if (arrival_wagons && arrival_wagons.length > 0) {
                                // Подготовим рабочий масив (Добавим поле позиции для приема)
                                if (operation_detali.wagons_arrival) {
                                    $.each(operation_detali.wagons_arrival, function (i, el) {
                                        el['position_arrival'] = null;
                                    });
                                }
                                // Если есть вагоны, тогда определим и покажем составы в прибытии
                                ids_inc.getViewArrivalSostavOfIDOuterWay(id_outer_ways, function (arrival_sostavs) {
                                    // Покажем пути                        
                                    operation_detali.table_arrival_sostav.view(arrival_sostavs);
                                });
                            } else {
                                // Если вагонов нет сбросим таблицу
                                operation_detali.table_arrival_sostav.view([]);
                            }
                        });
                        // Сбросим таблицу вагонов в составах на подходах
                        operation_detali.table_wagons_arrival_from.view([]);
                        operation_detali.table_wagons_arrival_on.view();
                    }
                },
                // Показать таблицу с данными
                view: function (arrival_sostavs) {
                    operation_detali.table_arrival_sostav.obj.clear();
                    operation_detali.table_arrival_sostav.arrival_sostavs = arrival_sostavs;
                    $.each(arrival_sostavs, function (i, el) {
                        operation_detali.table_arrival_sostav.obj.row.add(operation_detali.table_arrival_sostav.get_arrival_sostav(el));
                    });
                    operation_detali.table_arrival_sostav.obj.draw();
                    // Сбросить вагоны на пути роспуска
                    operation_detali.table_wagons_way_on.view(null);
                    LockScreenOff();
                },
                // Определить состав
                get_arrival_sostav: function (arrival_sostav) {
                    return {
                        "num_train": arrival_sostav.num_train,
                        "outer_way_start": arrival_sostav.outer_way_start !== null ? arrival_sostav.outer_way_start.replace(/T/g, ' ') : null,
                        "count_wagon": arrival_sostav.count_wagon,
                        "locomotives": arrival_sostav.locomotives
                    };

                },
            },
            // Таблица вагонов в составах на подходах
            table_wagons_arrival_from: {
                html_table: $('table#wagons-arrival-from'),
                obj: null,
                index_select_wagons: null,                                         // Индексы выбраных вагонов
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: {
                            style: "multi"
                        },
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            if (data.position_arrival !== null) {
                                $('td:eq(1)', row).addClass('not-select-wagon');
                                //$(row).addClass('select-sending')
                            }
                        },
                        columns: [
                            { data: "position", title: langView('field_wagons_position', langs), width: "30px", orderable: false, searchable: false },
                            { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: false, searchable: false },
                            { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: false, searchable: false },
                            { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                            { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: false, searchable: false },

                            { data: "from_station_amkr_name", title: langView('field_from_station_amkr', langs), width: "150px", orderable: true, searchable: false },
                            { data: "on_station_amkr_name", title: langView('field_on_station_amkr', langs), width: "150px", orderable: true, searchable: false },
                            { data: "current_operation_note", title: langView('field_on_current_operation_note', langs), width: "100px", orderable: true, searchable: false },
                            { data: "current_outer_way_amkr_start", title: langView('field_current_outer_way_amkr_start', langs), width: "150px", orderable: true, searchable: false },

                            //{ data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                            { data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                            { data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: false, searchable: false },
                            { data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                //extend: 'selectAll',
                                text: langView('title_button_select_all', langs),
                                action: function () {
                                    operation_detali.table_wagons_arrival_from.obj.rows(':not(.select-sending)').select();
                                }
                            },
                            {
                                extend: 'selectNone',
                                text: langView('title_button_select_none', langs),
                            },
                            {
                                text: langView('title_button_add_way_sending', langs),
                                action: function (e, dt, node, config) {
                                    LockScreen(langView('mess_save', langs));
                                    // Выделим выбранные вагоны
                                    var index_wagon = operation_detali.table_wagons_arrival_from.index_select_wagons;
                                    var row_select_wagon = operation_detali.table_wagons_arrival_from.obj.rows(index_wagon).data();
                                    // Получим последнюю позицию вагонов состава для отправки
                                    var wagon_max_poz = operation_detali.wagons_arrival.reduce(function (prev, current, index, array) { return prev.position_arrival > current.position_arrival ? prev : current });
                                    var position_arrival = wagon_max_poz && wagon_max_poz.position_arrival !== null ? wagon_max_poz.position_arrival + 1 : 1;
                                    // Проставим сформируем состав для отправки
                                    if (row_select_wagon && row_select_wagon.length > 0) {
                                        $.each(row_select_wagon, function (i, el) {

                                            var wagon = getObjects(operation_detali.wagons_arrival, 'wir_id', el.wir_id);
                                            if (wagon && wagon.length > 0) {
                                                wagon[0].position_arrival = position_arrival;
                                                position_arrival++;
                                            }

                                        });
                                        // Отобразим вагоны состава для приема
                                        operation_detali.table_wagons_arrival_on.view();
                                        // Отобразим вагоны прибывающего состава (будут отмечены выбранные вагоны)
                                        operation_detali.table_wagons_arrival_from.view(operation_detali.table_arrival_sostav.arrival_select_wagons, function () {
                                            LockScreenOff();
                                        });
                                    } else {
                                        LockScreenOff();
                                    }



                                },
                                enabled: false
                            }
                        ]
                    }).on('user-select', function (e, dt, type, cell, originalEvent) {
                        var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                        var wagon = operation_detali.table_wagons_arrival_from.obj.rows(indexes).data().toArray();
                        if (wagon && wagon.length > 0 && wagon[0].position_arrival !== null) {
                            e.preventDefault();
                        }
                    }).on('select deselect', function (e, dt, type, indexes) {
                        var index = operation_detali.table_wagons_arrival_from.obj.rows({ selected: true });
                        operation_detali.table_wagons_arrival_from.index_select_wagons = index[0] && index[0].length > 0 ? index[0] : null;
                        operation_detali.table_wagons_arrival_from.active_button_add();
                    });
                },
                // Показать таблицу с данными
                view: function (wagons, callback) {
                    operation_detali.table_wagons_arrival_from.obj.clear();
                    $.each(wagons, function (i, el) {
                        operation_detali.table_wagons_arrival_from.obj.row.add(operation_detali.table_wagons_arrival_from.get_wagon(el));
                    });
                    operation_detali.table_wagons_arrival_from.obj.draw();
                    operation_detali.table_wagons_arrival_from.obj.button(2).enable(false);
                    // Кнопка выполнить операцию роспуска
                    //operation_detali.active_button_sending_run();
                    if (typeof callback === 'function') {
                        callback();
                    }
                },
                // Определить вагон
                get_wagon: function (wagon) {
                    //var way_dissolution = getObjects(operation_detali.table_way_dissolution.ways, 'id', wagon.id_way_dissolution);
                    return {
                        "wir_id": wagon.wir_id,
                        "wim_id": wagon.wim_id,
                        "wio_id": wagon.wio_id,
                        "position": wagon.position,
                        "num": wagon.num,
                        "position_arrival": wagon.position_arrival,
                        //"id_way_dissolution": wagon.id_way_dissolution,
                        //"way_dissolution": way_dissolution && way_dissolution.length > 0 ? way_dissolution[0]["way_num_" + lang] : "",
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

                        "from_station_amkr_name": wagon["from_station_amkr_name_" + lang],
                        "current_outer_way_amkr_start": wagon.current_outer_way_amkr_start !== null ? wagon.current_outer_way_amkr_start.replace(/T/g, ' ') : null,
                        "current_operation_note": wagon.current_operation_note,
                        "on_station_amkr_name": wagon["on_station_amkr_name_" + lang],

                        //"arrival_duration": wagon.arrival_duration,
                        //"current_station_amkr_duration": wagon.current_station_amkr_duration,
                        //"current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                        "sap_is_num": wagon.sap_is_num,
                        //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                        "sap_is_create_date": wagon.sap_is_create_date,
                        "sap_is_create_time": wagon.sap_is_create_time,
                        //"instructional_letters_num": wagon.instructional_letters_num,
                        //"instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                        //"instructional_letters_station_name": wagon.instructional_letters_station_name,
                        //"wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
                    };

                },
                // Активировать кнопку добавить
                active_button_add: function () {
                    // Получим выбраный путь, количество вагонов на выбраном пути, кол вагонов для переноса
                    var index_wagon = operation_detali.table_wagons_arrival_from.index_select_wagons;
                    // Отобразим кнопку
                    if (index_wagon && index_wagon.length > 0) {
                        operation_detali.table_wagons_arrival_from.obj.button(2).enable(true);
                    } else {
                        operation_detali.table_wagons_arrival_from.obj.button(2).enable(false);
                    }

                }
            },
            // Таблица вагонов в составе для принятия
            table_wagons_arrival_on: {
                html_table: $('table#wagons-arrival-on'),
                obj: null,
                index_select_wagons: null,                                         // Индексы выбраных вагонов
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": true,
                        select: false,
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //if (data.position_arrival !== null) {
                            //    $('td:eq(1)', row).addClass('not-select-wagon');
                            //    //$(row).addClass('select-sending')
                            //}
                        },
                        columns: [
                            { data: "position", title: langView('field_wagons_position', langs), width: "30px", orderable: false, searchable: false },
                            { data: "num", title: langView('field_wagons_num', langs), width: "60px", orderable: false, searchable: false },
                            { data: "operator", title: langView('field_wagons_operator', langs), width: "50px", orderable: false, searchable: false },
                            { data: "limiting_abbr", title: langView('field_wagon_limiting_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "operators_paid", title: langView('field_wagons_operators_paid', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_busy", title: langView('field_current_operation_wagon_busy', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_rod", title: langView('field_wagon_rod', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_type", title: langView('field_wagon_type', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_gruzp_doc", title: langView('field_wagon_gruzp_doc', langs), width: "50px", orderable: false, searchable: false },
                            { data: "wagon_adm", title: langView('field_wagon_adm', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_condition_abbr", title: langView('field_current_condition_abbr', langs), width: "50px", orderable: false, searchable: false },
                            { data: "current_loading_status", title: langView('field_current_loading_status', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_cargo_name", title: langView('field_arrival_cargo_name', langs), width: "200px", orderable: false, searchable: false },
                            { data: "arrival_certification_data", title: langView('field_arrival_certification_data', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_from_name", title: langView('field_arrival_station_from_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_station_amkr_name", title: langView('field_arrival_station_amkr_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_name", title: langView('field_current_operation_wagon_name', langs), width: "150px", orderable: false, searchable: false },
                            { data: "current_operation_wagon_end", title: langView('field_current_operation_wagon_end', langs), width: "150px", orderable: false, searchable: false },
                            { data: "arrival_division_amkr_abbr", title: langView('field_arrival_division_amkr_abbr', langs), width: "100px", orderable: false, searchable: false },

                            { data: "from_station_amkr_name", title: langView('field_from_station_amkr', langs), width: "150px", orderable: true, searchable: false },
                            { data: "on_station_amkr_name", title: langView('field_on_station_amkr', langs), width: "150px", orderable: true, searchable: false },
                            { data: "current_operation_note", title: langView('field_on_current_operation_note', langs), width: "100px", orderable: true, searchable: false },
                            { data: "current_outer_way_amkr_start", title: langView('field_current_outer_way_amkr_start', langs), width: "150px", orderable: true, searchable: false },

                            //{ data: "arrival_duration", title: langView('field_arrival_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: null, defaultContent: '', title: langView('field_pb_station_duration', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "current_station_amkr_duration", title: langView('field_current_station_amkr_duration', langs), width: "100px", orderable: true, searchable: false },
                            //{ data: "current_station_amkr_idle_time", title: langView('field_current_station_amkr_idle_time', langs), width: "100px", orderable: false, searchable: false },
                            { data: "sap_is_num", title: langView('field_sap_is_num', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "sap_is_create_num", title: langView('field_sap_is_create_num', langs), width: "50px", orderable: true, searchable: true },
                            { data: "sap_is_create_date", title: langView('field_sap_is_create_date', langs), width: "50px", orderable: false, searchable: false },
                            { data: "sap_is_create_time", title: langView('field_sap_is_create_time', langs), width: "50px", orderable: false, searchable: false },
                            //{ data: "instructional_letters_num", title: langView('field_instructional_letters_num', langs), width: "50px", orderable: true, searchable: true },
                            //{ data: "instructional_letters_datetime", title: langView('field_instructional_letters_datetime', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "instructional_letters_station_name", title: langView('field_instructional_letters_station_name', langs), width: "150px", orderable: true, searchable: false },
                            //{ data: "wagon_date_rem_uz", title: langView('field_wagon_date_rem_uz', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                text: langView('title_button_clear_wagon', langs),
                                action: function (e, dt, node, config) {
                                    LockScreen(langView('mess_save', langs));
                                    wagons = operation_detali.wagons_arrival.filter(function (i) {
                                        return i.position_arrival !== null ? true : false;
                                    });
                                    $.each(wagons, function (i, el) {
                                        el.position_arrival = null;
                                    });
                                    // Отобразим вагоны состава для приема
                                    operation_detali.table_wagons_arrival_on.view();
                                    // Отобразим вагоны прибывающего состава (будут убраны выбранные вагоны)
                                    operation_detali.table_wagons_arrival_from.view(operation_detali.table_arrival_sostav.arrival_select_wagons, function () {
                                        LockScreenOff();
                                    });
                                },
                                enabled: false,
                            }
                        ]
                    }).on('user-select', function (e, dt, type, cell, originalEvent) {
                        var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                        var wagon = operation_detali.table_wagons_arrival_on.obj.rows(indexes).data().toArray();
                        if (wagon && wagon.length > 0 && wagon[0].position_arrival !== null) {
                            e.preventDefault();
                        }
                    }).on('select deselect', function (e, dt, type, indexes) {
                        var index = operation_detali.table_wagons_arrival_on.obj.rows({ selected: true });
                        operation_detali.table_wagons_arrival_on.index_select_wagons = index[0] && index[0].length > 0 ? index[0] : null;
                        operation_detali.table_wagons_arrival_on.active_button_add();
                    });
                },
                // Показать таблицу с данными
                view: function () {
                    LockScreen(langView('mess_delay', langs));
                    if (operation_detali.wagons_arrival) {
                        // Отфильтруем вагоны по которым выставлена новая позиция и отсортируем по position_sending
                        var wagons = operation_detali.wagons_arrival.filter(function (i) {
                            return i.position_arrival !== null ? true : false;
                        }).sort(function (a, b) {
                            return Number(a.position_arrival) - Number(b.position_arrival)
                        });
                        if (wagons && wagons.length > 0) {
                            operation_detali.table_wagons_arrival_on.obj.button(0).enable(true);
                            operation_detali.bt_operation_arrival_run.prop("disabled", false);
                        } else {
                            operation_detali.table_wagons_arrival_on.obj.button(0).enable(false);
                            operation_detali.bt_operation_arrival_run.prop("disabled", true);
                        }
                        operation_detali.table_wagons_arrival_on.obj.clear();
                        $.each(wagons, function (i, el) {
                            operation_detali.table_wagons_arrival_on.obj.row.add(operation_detali.table_wagons_arrival_on.get_wagon(el));
                        });
                    } else {
                        operation_detali.table_wagons_arrival_on.obj.clear();
                        operation_detali.table_wagons_arrival_on.obj.button(0).enable(false);
                    }
                    operation_detali.table_wagons_arrival_on.obj.draw();
                    LockScreenOff();
                },
                // Определить вагон
                get_wagon: function (wagon) {
                    //var way_dissolution = getObjects(operation_detali.table_way_dissolution.ways, 'id', wagon.id_way_dissolution);
                    return {
                        "wir_id": wagon.wir_id,
                        "wim_id": wagon.wim_id,
                        "wio_id": wagon.wio_id,
                        "position": wagon.position_arrival,
                        "num": wagon.num,
                        "position_arrival": wagon.position_arrival,
                        //"id_way_dissolution": wagon.id_way_dissolution,
                        //"way_dissolution": way_dissolution && way_dissolution.length > 0 ? way_dissolution[0]["way_num_" + lang] : "",
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

                        "from_station_amkr_name": wagon["from_station_amkr_name_" + lang],
                        "current_outer_way_amkr_start": wagon.current_outer_way_amkr_start !== null ? wagon.current_outer_way_amkr_start.replace(/T/g, ' ') : null,
                        "current_operation_note": wagon.current_operation_note,
                        "on_station_amkr_name": wagon["on_station_amkr_name_" + lang],

                        //"arrival_duration": wagon.arrival_duration,
                        //"current_station_amkr_duration": wagon.current_station_amkr_duration,
                        //"current_station_amkr_idle_time": wagon.current_station_amkr_idle_time,
                        "sap_is_num": wagon.sap_is_num,
                        //"sap_is_create_num": wagon.sap_is_create_date && wagon.sap_is_create_time ? 
                        "sap_is_create_date": wagon.sap_is_create_date,
                        "sap_is_create_time": wagon.sap_is_create_time,
                        //"instructional_letters_num": wagon.instructional_letters_num,
                        //"instructional_letters_datetime": wagon.instructional_letters_datetime !== null ? wagon.instructional_letters_datetime.replace(/T/g, ' ') : null,
                        //"instructional_letters_station_name": wagon.instructional_letters_station_name,
                        //"wagon_date_rem_uz": wagon.wagon_date_rem_uz != null ? wagon.wagon_date_rem_uz.substr(0, 10) : null,
                    };

                },
                // Активировать кнопку добавить
                active_button_add: function () {
                    // Получим выбраный путь, количество вагонов на выбраном пути, кол вагонов для переноса
                    var index_wagon = operation_detali.table_wagons_arrival_on.index_select_wagons;
                    // Отобразим кнопку
                    if (index_wagon && index_wagon.length > 0) {
                        operation_detali.table_wagons_arrival_on.obj.button(2).enable(true);
                    } else {
                        operation_detali.table_wagons_arrival_on.obj.button(2).enable(false);
                    }

                }
            },
            // Показать окно прибытия
            view_arrival: function (id_station_on, id_way_on) {

                operation_detali.id_station_on_arrival = id_station_on;
                operation_detali.id_way_on_arrival = id_way_on;
                operation_detali.operation_detali_arrival_station.val(operation_detali.id_station_on_arrival === null ? -1 : Number(operation_detali.id_station_on_arrival));
                // Отразим внешние пути
                operation_detali.update_arrival_outer_ways(operation_detali.id_station_on_arrival);
                //
                // Настроим компонент локомотивы 
                operation_detali.operation_detali_arrival_locomotive1 = cd_initSelect(
                    operation_detali.operation_detali_arrival_locomotive1,
                    { lang: operation_detali.lang },
                    operation_detali.list_locomotive,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var locomotive = $(this).val();

                    }, null);
                operation_detali.operation_detali_arrival_locomotive2 = cd_initSelect(
                    operation_detali.operation_detali_arrival_locomotive2,
                    { lang: operation_detali.lang },
                    operation_detali.list_locomotive,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var locomotive = $(this).val();

                    }, null);
                // Сбросим бит обновления и список путей обновления
                operation_detali.bit_update = false;
                operation_detali.rows_update = [];
                operation_detali.refresh_arrival();
                // Показать операцию детально
                operation_detali.content.addClass('is-visible');
            },
            // Обновить прибытие
            refresh_arrival: function () {
                operation_detali.val_arrival.clear_all();
                operation_detali.operation_detali_arrival_reverse.prop('checked', false);
                operation_detali.operation_detali_arrival_side.val(0);
                operation_detali.operation_detali_arrival_locomotive1.val(-1);
                operation_detali.operation_detali_arrival_locomotive2.val(-1);
                operation_detali.operation_detali_arrival_lead_time.setDateTime(null);
                operation_detali.table_arrival_sostav.load(operation_detali.table_arrival_sostav.id_outer_ways);
                operation_detali.operation_arrival.show();
                //LockScreenOff();
            },
            // Обновим компонент внешних путей
            update_arrival_outer_ways: function (id_statstion_on) {
                // Сбросим рабочий список вагонов
                operation_detali.wagons_arrival_from = [];
                operation_detali.wagons_arrival = [];
                var list_outer_ways = [];
                if (id_statstion_on !== null && id_statstion_on !== -1) {
                    operation_detali.operation_detali_arrival_outer_ways.prop("disabled", false);
                    // уточним список путей отправки
                    var outer_ways_arrival = getObjects(ids_inc.ids_dir.list_outer_ways, 'id_station_on', id_statstion_on)

                    // Пути определены?
                    if (outer_ways_arrival && outer_ways_arrival.length > 0) {
                        $.each(outer_ways_arrival, function (i, el) {
                            list_outer_ways.push({ value: el.id, text: el["name_outer_way_" + operation_detali.lang] })
                        });
                    }

                } else {
                    operation_detali.operation_detali_arrival_outer_ways.prop("disabled", true);
                }
                // Отобразим компанент внешних путей
                operation_detali.operation_detali_arrival_outer_ways = cd_initSelect(
                    operation_detali.operation_detali_arrival_outer_ways,
                    { lang: operation_detali.lang },
                    list_outer_ways,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id_outer_way = Number($(this).val());
                        operation_detali.table_arrival_sostav.load(id_outer_way);
                    }, null);
                //
                operation_detali.update_arrival_ways(id_statstion_on);
                // Сбросим таблицу составов
                operation_detali.table_arrival_sostav.view([]);
                // Сбросим таблицу вагонов в составах на подходах
                operation_detali.table_wagons_arrival_from.view([]);
                operation_detali.table_wagons_arrival_on.view();
            },
            // Обновить компонент путей приема
            update_arrival_ways: function (id_statstion_on) {
                // Определим пути по выбранной станции
                operation_detali.list_ways = [];
                if (id_statstion_on !== null && id_statstion_on > 0) {
                    operation_detali.list_ways = ids_inc.ids_dir.getListWays2TextOfAray(ids_inc.ids_dir.list_ways.filter(function (i) { return i.id_station === id_statstion_on }), 'id', 'way_num', 'way_name', operation_detali.lang, null);
                    operation_detali.operation_detali_arrival_way.prop("disabled", false);
                } else {
                    operation_detali.operation_detali_arrival_way.prop("disabled", true);
                }
                // Отобразим компанент путей приема
                operation_detali.operation_detali_arrival_way = cd_initSelect(
                    operation_detali.operation_detali_arrival_way,
                    { lang: operation_detali.lang },
                    operation_detali.list_ways,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        operation_detali.id_way_on_arrival = Number($(this).val());
                    }, null);
                // Выбор пути по умолчанию
                operation_detali.operation_detali_arrival_way.val(operation_detali.id_way_on_arrival !== null ? operation_detali.id_way_on_arrival : -1)
            },
            // Валидация данных
            validation_arrival: function () {
                operation_detali.val_arrival.clear_all();
                var valid = true;
                valid = valid & operation_detali.val_arrival.checkSelection(operation_detali.operation_detali_arrival_way, "Укажите путь према состава");
                valid = valid & operation_detali.val_arrival.checkInputOfNull(operation_detali.operation_detali_arrival_lead_time.obj, "Укажите время выполнения операции.");
                valid = valid & operation_detali.val_sending.checkSelection(operation_detali.operation_detali_arrival_locomotive1, "Укажите минимум один локомотив");
                return valid;
            },
            // -------------------------------------------------------------------------------------------------
            // Инициализация
            init: function (lang, user_name, callback_close) {
                operation_detali.lang = lang;
                operation_detali.user = user_name;
                operation_detali.callback_close = callback_close;
                operation_detali.list_locomotive = ids_inc.ids_dir.getListLocomotive('locomotive', 'locomotive', null, function (i) {
                    return i.id_locomotive_status === 1 ? true : false;
                });
                operation_detali.list_stations = ids_inc.ids_dir.getListStation('id', 'station_name', operation_detali.lang, function (i) {
                    return !i.station_uz;
                });
                //operation_detali.list_ways = ids_inc.ids_dir.getListWays2TextOfAray(ids_inc.ids_dir.list_ways, 'id', 'way_num', 'way_name', operation_detali.lang, null);

                // создадим классы
                operation_detali.ids_rwt = new IDS_RWT(operation_detali.lang); // Создадим класс IDS_RWT

                //------------- Операция "РОСПУСК" ---------------------------------------------------------------------------
                // настроим компонент выбора времени начала
                operation_detali.operation_detali_dissolution_start = cd_initDateTimeRangePicker(operation_detali.operation_detali_dissolution_start, { lang: operation_detali.lang, time: true }, function (datetime) {

                });
                operation_detali.operation_detali_dissolution_stop = cd_initDateTimeRangePicker(operation_detali.operation_detali_dissolution_stop, { lang: operation_detali.lang, time: true }, function (datetime) {

                });
                // Инициализация элементов операции "Роспуска"
                operation_detali.table_way_dissolution.init();
                operation_detali.table_wagons_way_on.init();
                operation_detali.table_wagons_way_from.init();

                // Соберем все элементы в массив операции "Роспуска"
                operation_detali.all_obj_dissolution = $([])
                    .add(operation_detali.operation_detali_dissolution_start.obj)
                    .add(operation_detali.operation_detali_dissolution_stop.obj);
                // Проверка валидации операции роспуска
                operation_detali.val_dissolution = new VALIDATION(operation_detali.lang, operation_detali.alert, operation_detali.all_obj_dissolution); // Создадим класс VALIDATION

                //------------- Операция "ОТПРАВКА" ---------------------------------------------------------------------------
                // настроим компонент выбора времени начала
                operation_detali.operation_detali_sending_lead_time = cd_initDateTimeRangePicker(operation_detali.operation_detali_sending_lead_time, { lang: operation_detali.lang, time: true }, function (datetime) {

                });
                //operation_detali.operation_detali_sending_start = cd_initDateTimeRangePicker(operation_detali.operation_detali_sending_start, { lang: operation_detali.lang, time: true }, function (datetime) {

                //});
                //operation_detali.operation_detali_sending_stop = cd_initDateTimeRangePicker(operation_detali.operation_detali_sending_stop, { lang: operation_detali.lang, time: true }, function (datetime) {

                //});
                // Инициализация таблиц
                operation_detali.table_wagons_sending_way_from.init();
                operation_detali.table_wagons_sending.init();
                // Соберем все элементы в массив операции "Отправки"
                operation_detali.all_obj_sending = $([])
                    .add(operation_detali.operation_detali_sending_way_from)
                    .add(operation_detali.operation_detali_sending_station)
                    .add(operation_detali.operation_detali_sending_outer_ways)
                    .add(operation_detali.operation_detali_sending_num_train)
                    .add(operation_detali.operation_detali_sending_locomotive1)
                    .add(operation_detali.operation_detali_sending_locomotive2)
                    .add(operation_detali.operation_detali_sending_lead_time.obj)
                    //.add(operation_detali.operation_detali_sending_start.obj)
                    //.add(operation_detali.operation_detali_sending_stop.obj)
                    ;
                operation_detali.val_sending = new VALIDATION(operation_detali.lang, operation_detali.alert, operation_detali.all_obj_sending); // Создадим класс VALIDATION
                //------------- Операция "ПРИБЫТИЯ" ---------------------------------------------------------------------------
                // Настроим компоненты
                operation_detali.operation_detali_arrival_lead_time = cd_initDateTimeRangePicker(operation_detali.operation_detali_arrival_lead_time, { lang: operation_detali.lang, time: true }, function (datetime) {

                });
                // Настроим компонент станций приема
                operation_detali.operation_detali_arrival_station = cd_initSelect(
                    operation_detali.operation_detali_arrival_station,
                    { lang: operation_detali.lang },
                    operation_detali.list_stations,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        // Укажем выбор новой станции
                        operation_detali.id_station_on_arrival = Number($(this).val());
                        // Сбростим выбор пути
                        operation_detali.id_way_on_arrival = null;
                        // Обновим компонент
                        operation_detali.update_arrival_outer_ways(operation_detali.id_station_on_arrival);
                    }, null);
                // Настроим компонент сторона приема
                operation_detali.operation_detali_arrival_side = cd_initSelect(
                    operation_detali.operation_detali_arrival_side,
                    { lang: operation_detali.lang },
                    [{ value: 0, text: "Голова" }, { value: 1, text: "Хвост" }],
                    null,
                    0,
                    function (event) {
                        event.preventDefault();
                        //var id = Number($(this).val());
                    }, null);
                // Инициализация таблиц
                operation_detali.table_arrival_sostav.init();
                operation_detali.table_wagons_arrival_from.init();
                operation_detali.table_wagons_arrival_on.init();
                // Соберем все элементы в массив операции "Отправки"
                operation_detali.all_obj_arrival = $([])
                    .add(operation_detali.operation_detali_arrival_way)
                    .add(operation_detali.operation_detali_arrival_reverse)
                    .add(operation_detali.operation_detali_arrival_side)
                    .add(operation_detali.operation_detali_arrival_lead_time.obj)
                    .add(operation_detali.operation_detali_arrival_locomotive1)
                    .add(operation_detali.operation_detali_arrival_locomotive2)
                    ;
                operation_detali.val_arrival = new VALIDATION(operation_detali.lang, operation_detali.alert, operation_detali.all_obj_arrival); // Создадим класс VALIDATION

                // Sumbit form
                operation_detali.content.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
                // Настройка закрыть операции детально
                operation_detali.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    operation_detali.operation_dissolution.hide();
                    operation_detali.operation_sending.hide();
                    operation_detali.operation_arrival.hide();
                    if (typeof operation_detali.callback_close === 'function') {
                        operation_detali.callback_close(operation_detali.bit_update, operation_detali.rows_update);
                    }
                    operation_detali.content.removeClass('is-visible');
                });
            },
        };


    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        table_tree_way.init();
        table_wagons.init();
        // Инициализация окон
        operation_detali.init(lang, user_name, function (bit_update, rows_update) {
            // Проверим требуется обновление путей
            if (bit_update) {
                // Отработать обновление
                if (rows_update && rows_update.length > 0) {
                    // Обновим путь приема
                    $.each(rows_update, function (i, el) {
                        // Обновим станции
                        if (el.id_station !== null && el.id_park === null && el.id_way === null) {
                            table_tree_way.update_station(el.id_station, function () { });
                        }
                        // Обновим пути
                        if (el.id_station !== null && el.id_park !== null && el.id_way !== null) {
                            table_tree_way.update_way(el.id_station, el.id_park, el.id_way, function () { });
                        }
                    });
                }
                // Обновим путь отправки
                table_tree_way.update_way(current_id_station, current_id_park, current_id_way, function () {
                    // Обновим информацию по пути
                    table_wagons.load(current_id_way);
                })
            }
        });
        pn_loading_way_detail.init(lang);
        pn_select_wagon.init(lang);
        // Инициализация панели дислокация
        pn_dislocation_wagon.init(lang, user_name, function (result_dislocation) {
            if (result_dislocation > 0) {
                alert.out_info_message('Операция "Дислокация" - выполнена. Обновленно  - ' + result_dislocation + ' записей');
                // Обновим информацию по пути
                table_wagons.load(current_id_way);
            }
        });
        table_tree_way.load_station();
        LockScreenOff();
    });
});