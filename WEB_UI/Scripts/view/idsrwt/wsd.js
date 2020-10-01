jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_': '',

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
                        $('td:eq(1)', row).prepend($('<img class="icon-station" />')).addClass("station-name")
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
                table_tree_way.initEventOpenStation()
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
                                                                var id_way = Number($(this).attr("way"));
                                                                pn_loading_way_detail.Open(id_way);
                                                            });
                                                            // определим строку путь
                                                            var tr_way = $("<tr id='station-" + id_station + "' station='" + id_station + "' park='" + id_park + "' way='" + el.id + "'><td></td><td></td><td></td><td class='way-name'><img class='icon-way'/>" + el.way_num_ru + " - " + el.way_abbr_ru + "</td><td></td><td>" + el.count_wagon + "</td><td>" + el.capacity + "</td></tr>");
                                                            var td = tr_way.find('td:eq(4)');
                                                            td.append(pb_way);
                                                            tr_way.on('click', function () {
                                                                $('tr[way]').removeClass('selected'); // Убрать выбор
                                                                $(this).addClass('selected');; // Применитьт выбор
                                                                var id = Number($(this).attr("id"));
                                                                var id_park = Number($(this).attr("park"));
                                                                var id_way = Number($(this).attr("way"));
                                                            });
                                                            $(tr_park).after(tr_way);
                                                        })
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
        // ОКНО ИЗМЕНИТЬ ОГРАНИЧЕНИЕ ПО ГРУППЕ
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
                pn_loading_way_detail.obj.dialog("option", "title", "Загрузка пути №"+id+" - детально:");
                pn_loading_way_detail.obj.dialog("open");
            },
        };


    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        table_tree_way.init()
        pn_loading_way_detail.init(lang)
        table_tree_way.load_station()
        LockScreenOff();
    });
});