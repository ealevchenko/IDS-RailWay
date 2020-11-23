jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_position': '№ позиции',
            'field_num': '№ вагона',
            'field_rod': 'Род',
            'field_type': 'Тип',
            'field_cargo': 'Груз',
            'field_operator': 'Оператор',
            'field_limit': 'Ограничение',
            'field_date_rem_uz': 'Дата ремонта по УЗ',
            'field_date_rem_vag': 'Дата ремонта на вагоне',
            'field_condition': 'Разметка по прибытию',
            'field_create_wagon': 'Добавил',
            'field_change_wagon': 'Правил',

            'title_button_export': 'Экспорт',
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
        ids_inc = new IDS_RWT(lang), // Создадим класс IDS_RWT

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
            select_doc: $('select#select_doc'),
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
                        table_arrival_wagon.view([]); //Очистим таблицу
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
        //*************************************************************************************
        // ТАБЛИЦА ВАГОНОВ ПРИНЯТОГО СОСТАВА
        //*************************************************************************************
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
                        style: 'single',
                        //toggleable: false
                    },
                    "autoWidth": true,
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
                        {
                            // Позиция
                            data: function (row, type, val, meta) {
                                return row.position_arrival;
                            },
                            title: langView('field_position', langs), width: "50px", orderable: true, searchable: false
                        },
                        {
                            data: "num",
                            title: langView('field_num', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            // Род
                            data: function (row, type, val, meta) {
                                return row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_Wagons && row.Arrival_UZ_Vagon.Directory_Wagons.Directory_GenusWagons ? row.Arrival_UZ_Vagon.Directory_Wagons.Directory_GenusWagons["abbr_" + lang] : null;
                            },
                            title: langView('field_rod', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            // Тип
                            data: function (row, type, val, meta) {
                                return row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_TypeWagons ? row.Arrival_UZ_Vagon.Directory_TypeWagons["type_" + lang] : null;
                            },
                            title: langView('field_type', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            // Груз
                            data: function (row, type, val, meta) {
                                return row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_Cargo && row.Arrival_UZ_Vagon.Directory_Cargo ? row.Arrival_UZ_Vagon.Directory_Cargo["cargo_name_" + lang] : null;
                            },
                            title: langView('field_cargo', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "operator",
                            data: function (row, type, val, meta) {
                                var current_rent = row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_Wagons && row.Arrival_UZ_Vagon.Directory_Wagons ? ids_inc.ids_dir.getCurrentRentOfWagon(row.Arrival_UZ_Vagon.Directory_Wagons) : null;
                                return current_rent && current_rent.Directory_OperatorsWagons ? current_rent.Directory_OperatorsWagons["operators_" + lang] : null;
                            },
                            title: langView('field_operator', langs), width: "100px", orderable: true, searchable: true
                        },
                        {
                            //data: "limit",
                            data: function (row, type, val, meta) {
                                var current_rent = row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_Wagons && row.Arrival_UZ_Vagon.Directory_Wagons ? ids_inc.ids_dir.getCurrentRentOfWagon(row.Arrival_UZ_Vagon.Directory_Wagons) : null;
                                return current_rent && current_rent.Directory_LimitingLoading ? current_rent.Directory_LimitingLoading["limiting_name_" + lang] : null;
                            },
                            title: langView('field_limit', langs), width: "100px", orderable: true, searchable: true
                        },
                        {
                            // Деповской ремонт
                            data: function (row, type, val, meta) {
                                return getSupstrTOfDT(row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_Wagons && row.Arrival_UZ_Vagon.Directory_Wagons.date_rem_uz ? row.Arrival_UZ_Vagon.Directory_Wagons.date_rem_uz : null);
                            },
                            title: langView('field_date_rem_uz', langs), width: "50px", orderable: true, searchable: false
                        },
                        {
                            // Ремонт на вагоне
                            data: function (row, type, val, meta) {
                                return getSupstrTOfDT(row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_Wagons && row.Arrival_UZ_Vagon.Directory_Wagons.date_rem_vag ? row.Arrival_UZ_Vagon.Directory_Wagons.date_rem_vag : null);
                            },
                            title: langView('field_date_rem_vag', langs), width: "50px", orderable: true, searchable: false
                        },
                        {
                            //"condition",
                            data: function (row, type, val, meta) {
                                return row.Arrival_UZ_Vagon && row.Arrival_UZ_Vagon.Directory_ConditionArrival && row.Arrival_UZ_Vagon.Directory_ConditionArrival ? row.Arrival_UZ_Vagon.Directory_ConditionArrival["condition_abbr_" + lang] : null;
                            },
                            title: langView('field_condition', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            //data: "create_wagon",
                            data: function (row, type, val, meta) {
                                return row.create ? row.create_user + '</br> (' + getReplaceTOfDT(row.create) + ')' : null;
                            },
                            title: langView('field_create_wagon', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            //data: "change_wagon",
                            data: function (row, type, val, meta) {
                                return row.change ? row.change_user + '</br>(' + getReplaceTOfDT(row.change) + ')' : null;
                            },
                            title: langView('field_change_wagon', langs), width: "100px", orderable: false, searchable: false
                        }
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            extend: 'collection',
                            text: langView('title_button_export', langs),
                            buttons: [
                                {
                                    text: langView('title_button_buffer', langs),
                                    extend: 'copyHtml5',
                                },
                                {
                                    text: langView('title_button_excel', langs),
                                    extend: 'excelHtml5',
                                    sheetName: 'Вагоны',
                                    messageTop: function () {
                                        return '';
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        //{
                        //    extend: 'selectAll',
                        //    text: langView('title_button_select_all', langs),
                        //},
                        //{
                        //    extend: 'selectNone',
                        //    text: langView('title_button_select_none', langs),
                        //},
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                var items = table_arrival_wagon.obj.rows({ selected: true });
                                var row_wagon = table_arrival_wagon.obj.rows(items[0]).data();
                                pn_edit_condition.Open(row_wagon && row_wagon.length>0 ? row_wagon[0].id : null);
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
                    table_arrival_wagon.obj.button(1).enable(true);
                } else {
                    table_arrival_wagon.obj.button(1).enable(false);
                }
            },
            // Показать таблицу с данными
            view: function (data) {
                //var id_select = table_arrival_wagon.select_string ? table_arrival_wagon.select_string.id : 0;
                table_arrival_wagon.obj.clear();
                // Сбросить выделенный состав
                table_arrival_wagon.deselect();
                table_arrival_wagon.obj.rows.add(data);
                //$.each(data, function (i, el) {
                //    table_arrival_wagon.obj.row.add(table_arrival_wagon.get_string(el));
                //});
                //if (table_arrival_wagon.count_string === 1) {
                //    table_arrival_wagon.obj.row('#' + id_select).select();
                //}
                table_arrival_wagon.obj.order([0, 'asc']);
                table_arrival_wagon.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            //get_string: function (data) {
            //    //var sostav = data.ArrivalSostav ? data.ArrivalSostav : null;
            //    var vag_uz = data.Arrival_UZ_Vagon ? data.Arrival_UZ_Vagon : null;
            //    var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
            //    var dir_wagon = vag_uz && vag_uz.Directory_Wagons ? vag_uz.Directory_Wagons : null;
            //    var current_rent = ids_inc.ids_dir.getCurrentRentOfWagon(dir_wagon);
            //    var limit = current_rent && current_rent.Directory_LimitingLoading ? current_rent.Directory_LimitingLoading : null;
            //    var operator = current_rent && current_rent.Directory_OperatorsWagons ? current_rent.Directory_OperatorsWagons : null;
            //    var condition = vag_uz && vag_uz.Directory_ConditionArrival ? vag_uz.Directory_ConditionArrival : null;
            //    return {
            //        "id": data.id,
            //        "id_arrival_uz_vagon": data.id_arrival_uz_vagon,
            //        "num": data.num,
            //        "position": data.position_arrival,
            //        "cargo": dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : null,
            //        "operator": operator ? ids_inc.ids_dir.getValueObj(operator, 'operators', lang) : null,
            //        "limit": limit ? ids_inc.ids_dir.getValueObj(limit, 'limiting_name', lang) : null,

            //        "renovation_date": dir_wagon && dir_wagon.date_rem_uz ? dir_wagon.date_rem_uz.replace(/T/g, ' ') : null,
            //        "condition": condition ? ids_inc.ids_dir.getValueObj(condition, 'condition_abbr', lang) : null,
            //        "create_wagon": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
            //        "change_wagon": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null,
            //        "vag_uz": vag_uz
            //    };
            //},
            // Deselect
            deselect: function () {
                //table_arrival_wagon.select_string = null;
                table_arrival_wagon.obj.button(1).enable(false);
            }
        },
        //*************************************************************************************
        // ОКНО ИЗМЕНИТЬ ГОДНОСТЬ ПО ПРИБЫТИЮ
        //*************************************************************************************
        pn_edit_condition = {
            obj: null,
            lang: null,
            user_name: null,
            ids_inc: null,
            alert: $('div#edit_condition_alert'),                                             // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_group: null,
            id_arrival_car: null,
            //rows: null,
            // Поля формы
            edit_condition_arrival: $('select#edit_condition_arrival'),
            edit_condition_type: $('select#edit_condition_type'),
            edit_condition_date_rem_vag: $('input#edit_condition_date_rem_vag'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_edit_condition.ids_inc.ids_dir.load(['condition_arrival','type_wagons'], false, function () {
                    count -= 1;
                    if (count === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            },
            // инициализвция Окна
            init: function (lang, user_name, callback_ok) {
                pn_edit_condition.lang = lang;
                pn_edit_condition.user_name = user_name;
                pn_edit_condition.ids_inc = new IDS_RWT(lang), // Создадим класс IDS_RWT
                    pn_edit_condition.loadReference(function () {
                        //pn_edit_condition.list_group = pn_edit_condition.ids_dir.getListLimitingLoading('id', 'limiting_name', pn_edit_condition.lang, null);
                        // Инициализация годности по прибытию
                        pn_edit_condition.edit_condition_arrival = cd_initSelect(
                            pn_edit_condition.edit_condition_arrival,
                            { lang: pn_edit_condition.lang },
                            pn_edit_condition.ids_inc.ids_dir.getList2ConditionArrival('id', 'condition_abbr', 'condition_name', pn_edit_condition.lang, function (i) {
                                return i.delete === null;
                            }),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                //var id = Number($(this).val());
                            },
                            null);
                        // Инициализация типов вагона
                        pn_edit_condition.edit_condition_type = cd_initSelect(
                            pn_edit_condition.edit_condition_type,
                            { lang: pn_edit_condition.lang },
                            pn_edit_condition.ids_inc.ids_dir.getListTypeWagons('id', 'type', pn_edit_condition.lang, null),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                //var id = Number($(this).val());
                            },
                            null);
                        // Дата ремонта на вагоне
                        pn_edit_condition.edit_condition_date_rem_vag = cd_initDateTimeRangePicker(pn_edit_condition.edit_condition_date_rem_vag, { lang: pn_edit_condition.lang, time: false }, function (datetime) {

                        });
                        // Соберем все элементы в массив
                        pn_edit_condition.all_obj = $([])
                            .add(pn_edit_condition.edit_condition_arrival)
                            .add(pn_edit_condition.edit_condition_type)
                            .add(pn_edit_condition.edit_condition_date_rem_vag.obj)
                            ;
                        // создадим классы 
                        pn_edit_condition.val = new VALIDATION(pn_edit_condition.lang, pn_edit_condition.alert, pn_edit_condition.all_obj); // Создадим класс VALIDATION
                        //pn_edit_condition.table_car.init();
                        pn_edit_condition.obj = $("div#edit_condition").dialog({
                            resizable: false,
                            title: 'Править разметку',
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
                                        pn_edit_condition.save(callback_ok);
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
                        pn_edit_condition.obj.find("form").on("submit", function (event) {
                            event.preventDefault();
                        });
                    });

            },
            // открыть окно добавмить вагоны вручную
            Open: function (id) {

                pn_edit_condition.val.clear_all();
                pn_edit_condition.id_arrival_car = id;
                if (pn_edit_condition.id_arrival_car > 0) {
                    // Получим вагон из базы
                    pn_edit_condition.ids_inc.getArrivalCarsOfID(pn_edit_condition.id_arrival_car, function (wagon_arrival) {
                        if (wagon_arrival) {
                            var condition = wagon_arrival.Arrival_UZ_Vagon && wagon_arrival.Arrival_UZ_Vagon.Directory_ConditionArrival ? wagon_arrival.Arrival_UZ_Vagon.Directory_ConditionArrival : null;
                            pn_edit_condition.edit_condition_arrival.val(condition !== null ? condition.id : null); // сбросить выбор
                            var type = wagon_arrival.Arrival_UZ_Vagon && wagon_arrival.Arrival_UZ_Vagon.Directory_TypeWagons ? wagon_arrival.Arrival_UZ_Vagon.Directory_TypeWagons : null;
                            pn_edit_condition.edit_condition_type.val(type!==null ? type.id : -1); // сбросить выбор
                            var dt_rem_uz = wagon_arrival.Arrival_UZ_Vagon && wagon_arrival.Arrival_UZ_Vagon.Directory_Wagons && wagon_arrival.Arrival_UZ_Vagon.Directory_Wagons.date_rem_vag ? wagon_arrival.Arrival_UZ_Vagon.Directory_Wagons.date_rem_vag : null;
                            pn_edit_condition.edit_condition_date_rem_vag.setDateTime(dt_rem_uz); // сбросить выбор
                            pn_edit_condition.obj.dialog("open");
                        }
                    });
                }
            },
            // Валидация данных
            validation: function () {
                pn_edit_condition.val.clear_all();
                var valid = true;
                valid = valid & pn_edit_condition.val.checkSelection(pn_edit_condition.edit_condition_arrival, "Выберите годность");
                pn_edit_condition.val.set_control_ok(pn_edit_condition.edit_condition_type);
                valid = valid & pn_edit_condition.val.checkInputOfDateTime_IsNull(pn_edit_condition.edit_condition_date_rem_vag.obj, pn_edit_condition.lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var list_uz_vagon = [];
                var valid = pn_edit_condition.validation();
                if (valid) {
                    pn_edit_condition.val.clear_all();
                    LockScreen(langView('mess_save', langs));
                    // Получим строку обновлений
                    var operation_update_wagon_marking = {
                        "id_arrival_cars": pn_edit_condition.id_arrival_car,
                        "id_condition": get_select_number_value(pn_edit_condition.edit_condition_arrival), //
                        "id_type": get_select_number_value(pn_edit_condition.edit_condition_type),
                        "date_rem_vag": toISOStringTZ(get_datetime_value(pn_edit_condition.edit_condition_date_rem_vag.val(), pn_edit_condition.lang)),
                        "user": pn_edit_condition.user_name,
                    }
                    // Обновим информацию в документах на прибывший вагон
                    pn_edit_condition.ids_inc.postOperationUpdateWagonMarking(operation_update_wagon_marking, function (result_operation) {
                        if (result_operation && result_operation.result >= 0) {
                            if (typeof callback_ok === 'function') {
                                pn_edit_condition.obj.dialog("close");
                                callback_ok(result_operation);
                            }
                        } else {
                            pn_edit_condition.val.clear_all();
                            pn_edit_condition.val.out_error_message("При обновлении разметки по прибитию произошла ошибка. Код ошибки = " + (result_operation ? result_operation.result : null));
                            if (result_operation && result_operation.listResultWagon && result_operation.listResultWagon.length > 0) {
                                $.each(result_operation.listResultWagon, function (i, el) {
                                    if (el.result < 0) {
                                        pn_edit_condition.val.out_error_message("№ вагона :" + el.num + ". Код ошибки : " + el.result);
                                    }
                                });
                            }
                            LockScreenOff();
                        }
                    });
                }
            },
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === false && i.exit_uz === true ? true : false; });
        pn_select.init(lang, list_station);
        table_arrival_wagon.init();
        // Инициализация окна править группу ограничений
        pn_edit_condition.init(lang, user_name, function (result_operation) {
            if (result_operation) {
                // Показать после изменения
                pn_select.view_arrival_wagon(get_select_number_value(pn_select.select_doc));
                alert.out_info_message('Обновлена информация по вагону № ' + result_operation.listResultWagon[0].num + ', код выполнения :' + result_operation.listResultWagon[0].result + ', обновлено таблиц : ' + result_operation.result);

            }
        });
        //LockScreenOff();
    });

});