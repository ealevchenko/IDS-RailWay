jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_position': '№ позиции',
                'field_num': '№ вагона',
                'field_cargo': 'Груз',
                'field_operator': 'Оператор',
                'field_limit': 'Ограничение',
                'field_renovation_date': 'Дата деповского ремонта',
                'field_condition': 'Разметка по прибытию',
                'field_create_wagon': 'Добавил',
                'field_change_wagon': 'Правил',

                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_select_all': 'Выбрать все',
                'title_button_select_none': 'Убрать все',
                'title_button_edit': 'Править разметку',

            },
            'en':  //default language: English
            {
                'field_num': '',
            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        alert = new ALERT($('div#main-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
        
        //bt_search_wagon = $('button#bt_search_wagon').on('click', function (event) {
        //    event.preventDefault();
        //    search_wagon();
        //}),
        // Загрузка основных справочников приложения
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
        // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА СОСТАВОВ
        //*************************************************************************************
        pn_select = {
            lang: null,
            //cur_dt: moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
            start: moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 })._d,
            stop: moment().set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 })._d,
            //dt_obj: null,
            list_stations: [],
            select_list_sostav: [],
            select_date: $('span#select_date'),
            date_start: $('input#date_start'),
            date_stop: $('input#date_stop'),
            select_station: $('select#select_station'),
            select_doc : $('select#select_doc'),
            sostav_info: $('#sostav_info'),
            //
            init: function (lang, list_station) {
                pn_select.list_stations = list_station;
                pn_select.lang = lang;
                // настроим компонент дата
                pn_select.select_date = pn_select.select_date.dateRangePicker(
                    {
                        language: 'ru',
                        format: 'DD.MM.YYYY HH:mm',
                        separator: '-',
                        autoClose: false,
                        time: {
                            enabled: true
                        },
                        setValue: function (s, s1, s2) {
                            pn_select.date_start.val(s1);
                            pn_select.date_stop.val(s2);
                        }
                    }).
                    bind('datepicker-change', function (evt, obj) {
                        pn_select.start = obj.date1;
                        pn_select.stop = obj.date2;
                    })
                    .bind('datepicker-closed', function () {
                        // Обновим перечень документов
                        pn_select.update_select_doc(pn_select.start, pn_select.stop, get_select_number_value(pn_select.select_station), function (list_sostav) {
                            pn_select.select_list_sostav = list_sostav;
                        });
                        //pn_select.view(false);
                    });
                pn_select.select_date.data('dateRangePicker').setDateRange(moment(pn_select.start).format('DD.MM.YYYY HH:mm:'), moment(pn_select.stop).format('DD.MM.YYYY HH:mm:'), true);
                // настроим селект
                pn_select.select_station = cd_initSelect(
                    pn_select.select_station,
                    { lang: pn_select.lang },
                    pn_select.list_stations,
                    null,
                    list_station[0].value,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор
                        var id = Number($(this).val());
                        //pn_select.view(false);
                        // Обновим перечень документов
                        pn_select.update_select_doc(pn_select.start, pn_select.stop, id, function (list_sostav) {
                            pn_select.select_list_sostav = list_sostav;
                        });
                    },
                    null);
                //
                pn_select.select_doc = cd_initSelect(
                    pn_select.select_doc,
                    { lang: pn_select.lang },
                    [],
                    null,
                    -1,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор 
                        var id = Number($(this).val());
                        if (id > 0) {
                            pn_select.view_arrival_wagon(id);
                        } else {
                            table_arrival_wagon.view([]);
                        }

                    },
                    null);
                // Получить документы
                pn_select.update_select_doc(pn_select.start, pn_select.stop, get_select_number_value(pn_select.select_station), function (list_sostav) {
                    pn_select.select_list_sostav = list_sostav;
                });
            },
            // Инициализация выбора документа
            update_obj_select_doc: function (list_doc) {
                pn_select.select_doc = cd_updateSelect(
                    pn_select.select_doc,
                    { lang: pn_select.lang },
                    list_doc,
                    null,
                    -1,
                    null);
            },
            // Обновим компонент выбора документа
            update_select_doc: function (start, stop, id_station, callback) {
                var list_doc = [];
                if (start && stop && id_station && id_station > 0) {
                    // Делаем запрос
                    LockScreen(langView('mess_load_data', langs));
                    ids_inc.getArrivalSostavOfDatePeriodIDStationOn(start, stop, id_station, function (list_sostav) {
                        list_sostav.forEach(function (item, index, array) {
                            list_doc.push({ value: item.id, text: item.num_doc });
                        });
                        pn_select.update_obj_select_doc(list_doc);
                        if (typeof callback === 'function') {
                            LockScreenOff();
                            callback(list_sostav);
                        }
                    });
                } else {
                    pn_select.update_obj_select_doc(list_doc);
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback(list_doc);
                    }
                }
            },
            // Показать вагоны
            view_arrival_wagon: function (id_sostav) {
                LockScreen(langView('mess_load_data', langs));
                // Получить инфу по составу
                ids_inc.getArrivalSostavOfID(id_sostav, function (sostav) {
                    // Вывести информацию о составе
                    var info = 'Индекс состава : ' + (sostav ? sostav.composition_index : '') + ', прибыл : ' + (sostav ? sostav.date_arrival : '');
                    pn_select.sostav_info.text(info);
                    if (sostav && sostav.ArrivalCars) {
                        var list_wagon_sort = sostav.ArrivalCars.filter(function (i) {
                            return i.position_arrival;
                        }).sort(function (a, b) {
                            return Number(a.position_arrival) - Number(b.position_arrival);
                        });

                        table_arrival_wagon.view(list_wagon_sort);
                    }

                });
            }
        },
        // Таблица вагоны на подходах
        table_arrival_wagon = {
            html_table: $('table#table-wagon'),
            obj: null,
            select_string: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    //"lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": false,
                    "keys": true,
                    select: {
                        style: "multi"
                    },
                    "autoWidth": false,
                    //"filter": true,
                    //"scrollY": "600px",
                    sScrollX: "100%",
                    scrollX: true,
                    //"responsive": true,
                    //"bAutoWidth": false,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                    },
                    columns: [
                        { data: "position", title: langView('field_position', langs), width: "50px", orderable: true, searchable: false },
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: true, searchable: true },
                        { data: "cargo", title: langView('field_cargo', langs), width: "150px", orderable: true, searchable: true },
                        { data: "operator", title: langView('field_operator', langs), width: "100px", orderable: true, searchable: true },
                        { data: "limit", title: langView('field_limit', langs), width: "100px", orderable: true, searchable: true },
                        { data: "renovation_date", title: langView('field_renovation_date', langs), width: "50px", orderable: true, searchable: false },
                        { data: "condition", title: langView('field_condition', langs), width: "50px", orderable: true, searchable: true },
                        { data: "create_wagon", title: langView('field_create_wagon', langs), width: "100px", orderable: false, searchable: false },
                        { data: "change_wagon", title: langView('field_change_wagon', langs), width: "100px", orderable: false, searchable: false }
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
                            sheetName: 'Принятые вагоны',
                            messageTop: function () {
                                return '';
                            }
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
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                var items = table_arrival_wagon.obj.rows({ selected: true });
                                var row_wagon = table_arrival_wagon.obj.rows(items[0]).data();
                                //pn_change_group_limit.Open(row_cargo);
                            },
                            enabled: false
                        },
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    table_arrival_wagon.view_button(indexes);

                }).on('deselect', function (e, dt, type, indexes) {
                    table_arrival_wagon.view_button(indexes);
                });
            },
            // Отобразить кнопки редактирования таблицы
            view_button: function (indexes) {
                var items = table_arrival_wagon.obj.rows({ selected: true });
                if (items && items.count() > 0) {
                    table_arrival_wagon.obj.button(4).enable(true);
                } else {
                    table_arrival_wagon.obj.button(4).enable(false);
                }
            },
            // Показать таблицу с данными
            view: function (data) {
                var id_select = table_arrival_wagon.select_string ? table_arrival_wagon.select_string.id : 0;
                table_arrival_wagon.obj.clear();
                // Сбросить выделенный состав
                table_arrival_wagon.deselect();
                $.each(data, function (i, el) {
                    table_arrival_wagon.obj.row.add(table_arrival_wagon.get_string(el));
                });
                if (table_arrival_wagon.count_string === 1) {
                    table_arrival_wagon.obj.row('#' + id_select).select();
                }
                table_arrival_wagon.obj.order([0, 'asc']);
                table_arrival_wagon.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_string: function (data) {
                //var sostav = data.ArrivalSostav ? data.ArrivalSostav : null;
                var vag_uz = data.Arrival_UZ_Vagon ? data.Arrival_UZ_Vagon : null;
                var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                var dir_wagon = vag_uz && vag_uz.Directory_Wagons ? vag_uz.Directory_Wagons : null;
                var current_rent = ids_inc.ids_dir.getCurrentRentOfWagon(dir_wagon);
                var limit = current_rent && current_rent.Directory_LimitingLoading ? current_rent.Directory_LimitingLoading : null;
                var operator = current_rent && current_rent.Directory_OperatorsWagons ? current_rent.Directory_OperatorsWagons : null;
                var condition = vag_uz && vag_uz.Directory_ConditionArrival ? vag_uz.Directory_ConditionArrival : null;
                return {
                    "id": data.id,
                    "num": data.num,
                    "position": data.position_arrival,
                    "cargo": dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : null,
                    "operator": operator ? ids_inc.ids_dir.getValueObj(operator, 'operators', lang) : null,
                    "limit": limit ? ids_inc.ids_dir.getValueObj(limit, 'limiting_name', lang) : null,
                    "renovation_date": dir_wagon && dir_wagon.date_rem_uz ? dir_wagon.date_rem_uz.replace(/T/g, ' ') : null,
                    "condition": condition ? ids_inc.ids_dir.getValueObj(condition, 'condition_abbr', lang) : null,
                    "create_wagon": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_wagon": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
                };
            },
            // Deselect
            deselect: function () {
                table_arrival_wagon.select_string = null;
            }
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === false && i.exit_uz === true ? true : false; });
        pn_select.init(lang, list_station);
        table_arrival_wagon.init();

        //LockScreenOff();
    });

});