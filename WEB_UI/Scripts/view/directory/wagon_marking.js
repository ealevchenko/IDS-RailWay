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
                                pn_change_group_condition.Open(row_wagon);
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
                //var id_select = table_arrival_wagon.select_string ? table_arrival_wagon.select_string.id : 0;
                table_arrival_wagon.obj.clear();
                // Сбросить выделенный состав
                table_arrival_wagon.deselect();
                $.each(data, function (i, el) {
                    table_arrival_wagon.obj.row.add(table_arrival_wagon.get_string(el));
                });
                //if (table_arrival_wagon.count_string === 1) {
                //    table_arrival_wagon.obj.row('#' + id_select).select();
                //}
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
                    "id_arrival_uz_vagon": data.id_arrival_uz_vagon,
                    "num": data.num,
                    "position": data.position_arrival,
                    "cargo": dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : null,
                    "operator": operator ? ids_inc.ids_dir.getValueObj(operator, 'operators', lang) : null,
                    "limit": limit ? ids_inc.ids_dir.getValueObj(limit, 'limiting_name', lang) : null,
                    "renovation_date": dir_wagon && dir_wagon.date_rem_uz ? dir_wagon.date_rem_uz.replace(/T/g, ' ') : null,
                    "condition": condition ? ids_inc.ids_dir.getValueObj(condition, 'condition_abbr', lang) : null,
                    "create_wagon": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_wagon": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null,
                    "vag_uz": vag_uz
                };
            },
            // Deselect
            deselect: function () {
                //table_arrival_wagon.select_string = null;
                table_arrival_wagon.obj.button(4).enable(false);
            }
        },
        //*************************************************************************************
        // ОКНО ИЗМЕНИТЬ ГОДНОСТЬ ПО ПРИБЫТИЮ
        //*************************************************************************************
        pn_change_group_condition = {
            obj: null,
            lang: null,
            user_name: null,
            ids_inc: null,
            alert: $('div#change_group_condition_alert'),                                             // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_group: null,
            rows: null,
            // Поля формы
            change_group_condition_arrival: $('select#change_group_condition_arrival'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_change_group_condition.ids_inc.ids_dir.load(['condition_arrival'], false, function () {
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
                pn_change_group_condition.lang = lang;
                pn_change_group_condition.user_name = user_name;
                pn_change_group_condition.ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
                    pn_change_group_condition.loadReference(function () {
                        //pn_change_group_condition.list_group = pn_change_group_condition.ids_dir.getListLimitingLoading('id', 'limiting_name', pn_change_group_condition.lang, null);
                        // Инициализация элементов

                        pn_change_group_condition.change_group_condition_arrival = cd_initSelect(
                            pn_change_group_condition.change_group_condition_arrival,
                            { lang: pn_change_group_condition.lang },
                            pn_change_group_condition.ids_inc.ids_dir.getList2ConditionArrival('id', 'condition_abbr', 'condition_name', pn_change_group_condition.lang, null),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            },
                            null);
                        // Соберем все элементы в массив
                        pn_change_group_condition.all_obj = $([])
                            .add(pn_change_group_condition.change_group_condition_arrival)
                        ;
                        // создадим классы 
                        pn_change_group_condition.val = new VALIDATION(pn_change_group_condition.lang, pn_change_group_condition.alert, pn_change_group_condition.all_obj); // Создадим класс VALIDATION
                        //pn_change_group_condition.table_car.init();
                        pn_change_group_condition.obj = $("div#change_group_condition").dialog({
                            resizable: false,
                            title: 'Изменить годность по прибытию',
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
                                        pn_change_group_condition.save(callback_ok);
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
                        pn_change_group_condition.obj.find("form").on("submit", function (event) {
                            event.preventDefault();
                        });
                    });

            },
            // открыть окно добавмить вагоны вручную
            Open: function (rows) {
                pn_change_group_condition.val.clear_all();
                pn_change_group_condition.change_group_condition_arrival.val(-1); // сбросить выбор
                pn_change_group_condition.rows = rows;
                if (rows && rows.length > 0) {
                    pn_change_group_condition.obj.dialog("open");
                }
            },
            // Валидация данных
            validation: function () {
                pn_change_group_condition.val.clear_all();
                var valid = true;
                valid = valid & pn_change_group_condition.val.checkSelection(pn_change_group_condition.change_group_condition_arrival, "Выберите годность");
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var list_uz_vagon = [];
                var valid = pn_change_group_condition.validation();
                if (valid) {
                    pn_change_group_condition.val.clear_all();
                    LockScreen(langView('mess_save', langs));
                    //// Получимсписок номеров вагонов
                    for (inum = 0; inum < pn_change_group_condition.rows.length; inum++) {
                        var vag = pn_change_group_condition.ids_inc.getCloneArrival_UZ_Vagon(pn_change_group_condition.rows[inum].vag_uz);
                        if (vag) {
                            vag.id_condition = get_select_number_value(pn_change_group_condition.change_group_condition_arrival);
                            vag.change = toISOStringTZ(new Date());
                            vag.change_user = pn_change_group_condition.user_name;
                        }
                        list_uz_vagon.push(vag);
                    }
                    // Обновим информацию в документах на прибывший вагон
                    pn_change_group_condition.ids_inc.putListArrival_UZ_Vagon(list_uz_vagon, function (result_upd) {
                        if (result_upd >= 0) {
                            if (typeof callback_ok === 'function') {
                                pn_change_group_condition.obj.dialog("close");
                                callback_ok(result_upd);
                            }
                        } else {
                            pn_change_group_condition.val.out_error_message("При обновлении разметки по прибитию по группе вагонов произошла ошибка!");
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
        pn_change_group_condition.init(lang, user_name, function (result_change_group) {
            if (result_change_group > 0) {
                // Показать после изменения
                pn_select.view_arrival_wagon(get_select_number_value(pn_select.select_doc));
                alert.out_info_message('Обновлены готовности по группе вагонов в количестве - ' + result_change_group + ' записей');
            }
        });
        //LockScreenOff();
    });

});