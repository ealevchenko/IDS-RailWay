jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_way_park': 'Парк',
            'field_way_name': 'Путь',
            'field_way_count': 'Стоит',
            'field_way_capacity': 'Вмещ.',
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
            alert: $('div#main-alert'),
            all_obj_add_park_status: null,
            val_add_park_status: null,                                                  // Класс валидации
            list_stations: [],                                                          // Список станций
            list_park_state: [],                                                        // Список состояний парка
            list_way_state: [],                                                         // Список состояний парка
            id_station_select: null,                                                    // Выбранная станция
            id_park_status_select: null,                                                // Выбранный статус
            select_station: $('select#select_station'),
            select_park_status: $('select#select_park_status'),
            input_park_status_on_dt: $('input#input_park_status_on_dt'),
            park_state_info: $('div#park_state_info'),
            accordion_ways: $('div#accordion_ways'),
            // Добавить
            bt_create_park_status: $('button#create_park_status').on('click',
                function (event) {
                    pn_select.bt_create_park_status.prop("disabled", true);
                    //pn_select.val_add_park_status.clear_all();
                    event.preventDefault();
                    var valid = pn_select.validation();
                    if (valid) {
                        // Валидация пройдена, погнали дальше
                        // Определим станцию
                        var station = pn_select.get_station_of_id(pn_select.id_station_select);
                        // Подтверждение выполнения операции.
                        dc.dialog_confirm('Open', 'Создать?', 'Будет создано новое положение парка на станции :' + (station ? station.text : '?') + ' по состоянию на :' + toISOStringTZ(get_datetime_value(pn_select.input_park_status_on_dt.val(), pn_select.lang)) + '.', function (result) {
                            if (result) {
                                LockScreen(langView('mess_save', langs));
                                // Подготовим список вагонов для отправки
                                // Определим пакет данных отправки на другую станцию
                                var operation_create_park_state = {
                                    id_station: pn_select.id_station_select,
                                    date_status_on: toISOStringTZ(get_datetime_value(pn_select.input_park_status_on_dt.val(), pn_select.lang)),
                                    user: user_name,
                                }
                                // Выполнить операцию создать парк
                                ids_inc.postOperationCreateParkStateOfStation(operation_create_park_state, function (result_create) {
                                    if (result_create && result_create.result >= 0) {
                                        // Обновим
                                        pn_select.update_select_park_status(pn_select.id_station_select, 0, function () {
                                            pn_select.val_add_park_status.out_info_message("Операция 'Создать новое положение парка' - Выполнена");
                                            LockScreenOff();
                                        });


                                    } else {
                                        pn_select.val_add_park_status.out_warning_message("При выполнении операции 'Создать новое положение парка' - произошла ошибка. Код ошибки =" + result_create.result);
                                        if (result_create && result_create.listResult && result_create.listResult.length > 0) {
                                            $.each(result_create.listResult, function (i, el) {
                                                if (el.result < 0) {
                                                    pn_select.val_add_park_status.out_error_message("Станция id :" + el.id + ". Код ошибки : " + el.result);
                                                }
                                            });
                                        }
                                        pn_select.bt_create_park_status.prop("disabled", false);
                                        LockScreenOff();
                                    }
                                });
                            } else {
                                pn_select.bt_create_park_status.prop("disabled", false);
                                pn_select.val_add_park_status.out_warning_message("Выполнение операции «Создания нового положения парка» - отменено!");
                            }
                        });
                    } else {
                        pn_select.bt_create_park_status.prop("disabled", false);
                    }
                }),
            // Удалить
            bt_delete_park_status: $('button#delete_park_status').on('click',
                function (event) {
                    pn_select.bt_delete_park_status.prop("disabled", true);
                    pn_select.val_add_park_status.clear_all();
                    event.preventDefault();
                    // Определим станцию
                    var station = pn_select.get_station_of_id(pn_select.id_station_select);
                    var park_state = pn_select.get_park_state_of_id(pn_select.id_park_status_select);
                    // Проверим парк применили, если да тогда удалить нельзя
                    if (park_state && park_state.applied === null) {
                        // Парк не применяли, подтвердить удаление 
                        dc.dialog_confirm('Open', 'Удалить?', 'Будет удалено положение парка по сотоянию на: ' + (park_state ? park_state.state_on : '?') + ', созданое : ' + (park_state ? park_state.create_user : '?') + ', по станции : ' + (station ? station.text : '?') + '.', function (result) {
                            if (result) {
                                LockScreen(langView('mess_save', langs));
                                // Подготовим список вагонов для отправки
                                // Определим пакет данных отправки на другую станцию
                                var operation_delete_park_state = {
                                    id_station: pn_select.id_station_select,
                                    user: user_name,
                                }
                                // Выполнить операцию удалить парк
                                ids_inc.postOperationDeleteParkStateOfStation(operation_delete_park_state, function (result_create) {
                                    if (result_create && result_create.result >= 0) {
                                        // Обновим
                                        pn_select.update_select_park_status(pn_select.id_station_select, 0, function () {
                                            // Сообщение
                                            pn_select.val_add_park_status.out_info_message("Операция 'Удаление положения парка' - Выполнена");
                                            LockScreenOff();
                                        });
                                    } else {
                                        pn_select.val_add_park_status.out_warning_message("При выполнении операции 'Удалить положение парка' - произошла ошибка. Код ошибки =" + result_create.result);
                                        if (result_create && result_create.listResult && result_create.listResult.length > 0) {
                                            $.each(result_create.listResult, function (i, el) {
                                                if (el.result < 0) {
                                                    pn_select.val_add_park_status.out_error_message("Станция id :" + el.id + ". Код ошибки : " + el.result);
                                                }
                                            });
                                        }
                                        LockScreenOff();
                                    }
                                });
                            } else {
                                pn_select.bt_delete_park_status.prop("disabled", false);
                                pn_select.val_add_park_status.out_warning_message("Выполнение операции «Удаление положения парка» - отменено!");
                            }
                        });
                    } else {
                        // Парк применили, запрет удаления
                        pn_select.bt_delete_park_status.prop("disabled", false);
                        pn_select.val_add_park_status.out_warning_message("Нельзя удалить состояние парка, которое применили " + getReplaceTOfDT(park_state.applied) + "!");
                    }
                }),
            // Инициализация
            init: function (lang, list_station) {
                pn_select.id_station_select = -1;       // Станция по умолчанию (нет выбора)
                pn_select.id_park_status_select = 0;   // статус по умолчанию (нет выбора)
                pn_select.list_stations = list_station;
                pn_select.lang = lang;
                // настроим выбор станций
                pn_select.select_station = cd_initSelect(
                    pn_select.select_station,
                    { lang: pn_select.lang },
                    pn_select.list_stations,
                    null,
                    -1,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор
                        var id = Number($(this).val());
                        //pn_select.view(false);
                        // Обновим перечень документов
                        pn_select.update_select_park_status(id, 0, function () {
                            LockScreenOff();
                        });
                    },
                    null);
                // настроим выбор состояний парков
                var list_option = [];
                list_option.push({ value: 0, text: 'Создать новое' });
                pn_select.select_park_status = cd_initSelect(
                    pn_select.select_park_status,
                    { lang: pn_select.lang },
                    list_option,
                    null,
                    pn_select.id_park_status_select,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор
                        var id = Number($(this).val());
                        pn_select.update_view_park_status(id, function () {
                            LockScreenOff();
                        });
                    },
                    null);

                // настроим компонент выбора времени
                pn_select.input_park_status_on_dt = cd_initDateTimeRangePicker(pn_select.input_park_status_on_dt, { lang: pn_select.lang, time: true }, function (datetime) {

                });
                pn_select.all_obj_add_park_status = $([])
                    .add(pn_select.select_station)
                    .add(pn_select.input_park_status_on_dt.obj);
                // Проверка валидации операции роспуска
                pn_select.val_add_park_status = new VALIDATION(pn_select.lang, pn_select.alert, pn_select.all_obj_add_park_status); // Создадим класс VALIDATION
                // Показать последние состояния парка по станции
                pn_select.update_select_park_status(pn_select.id_station_select, pn_select.id_park_status_select, function () {

                })
            },
            // Обновим выбор состояний парка по станции
            update_select_park_status: function (id_station, id_park_status, callback) {
                // Сбросим 
                pn_select.val_add_park_status.clear_all();
                pn_select.clear_create_park_state();
                // Установим
                pn_select.id_station_select = id_station;
                pn_select.id_park_status_select = id_park_status;
                // Получить список состояний парка
                LockScreen(langView('mess_load_data', langs));
                ids_inc.getViewParkStateOfStation(pn_select.id_station_select, function (list_park_state) {
                    pn_select.list_park_state = list_park_state;
                    var list_option = [];
                    list_option.push({ value: 0, text: 'Создать новое' });
                    list_option = list_option.concat(getList2Option(pn_select.list_park_state, 'id', 'state_on', 'create_user', null, null));
                    // настроим выбор состояний парков
                    pn_select.select_park_status = cd_updateSelect(
                        pn_select.select_park_status,
                        { lang: pn_select.lang },
                        list_option,
                        null,
                        pn_select.id_park_status_select,
                        null);
                    // Покажем выбраное положение парка
                    pn_select.update_view_park_status(pn_select.id_park_status_select, function () {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    });

                });
            },
            // Покажем выбраное положение парка
            update_view_park_status: function (id_park_status, callback) {
                // Сбросим 
                pn_select.val_add_park_status.clear_all();
                pn_select.clear_create_park_state();
                // Очистим пути.
                pn_select.accordion_ways.empty();
                pn_select.list_way_state = null;
                // Установим
                pn_select.id_park_status_select = id_park_status;
                // Проверим если выбрано существующее положение тогда показать
                if (pn_select.id_park_status_select > 0) {
                    // Показать существующее
                    // Активируем меню
                    pn_select.bt_delete_park_status.prop('disabled', false);
                    pn_select.input_park_status_on_dt.obj.prop('disabled', true);
                    pn_select.bt_create_park_status.prop('disabled', true);
                    var patk_state = pn_select.get_park_state_of_id(pn_select.id_park_status_select);
                    pn_select.park_state_info.text('Состояние парка на :' + patk_state.state_on + '? созданное : ' + patk_state.create_user);
                    // Сделаем выборку 
                    ids_inc.getViewStatusParkStateOfParkStateStation(pn_select.id_park_status_select, function (list_way_state) {
                        pn_select.list_way_state = list_way_state;
                        if (pn_select.list_way_state && pn_select.list_way_state.length > 0) {
                            // Есть пути обновляем

                            table_ways_park_state.view(pn_select.list_way_state);
                            //$.each(pn_select.list_way_state, function (i, el) {
                            //    var heading_way = 'heading-way-' + i;
                            //    var collapse_way = 'collapse-way-' + i;

                            //    var park_way_name = el['park_abbr_' + lang];
                            //    var way_name = el['way_num_' + lang] + ' - ' + el['way_name_' + lang];


                            //    var div_card = $('<div class="card"></div>');
                            //    var div_card_header = $('<div class="card-header" id="' + heading_way + '"></div>');

                            //    var h5 = $('<h5 class="mb-0"></h5>');
                            //    var button_way = $('<button class="btn btn-link" data-toggle="collapse" data-target="#' + collapse_way + '" aria-expanded="true" aria-controls="' + collapse_way + '">' + way_name + ' <span class="badge badge-primary">' + el.count_wagon + '</span></button>');
                            //    var div_park = $('<div>' + park_way_name + '</div>');

                            //    var div_collapse = $('<div id="' + collapse_way + '" class="collapse' + (i === (pn_select.list_way_state.length-1) ? ' show' : '') + '" aria-labelledby="' + heading_way + '" data-parent="#accordion_ways">');

                            //    var div_card_body = $('<div class="card-body"></div>');
                            //    var div_row = $('<div class="row"></div>');

                            //    h5.append(div_park).append(button_way);
                            //    div_card_header.append(h5);
                            //    div_card_body.append(div_row);
                            //    div_collapse.append(div_card_body);
                            //    div_card.append(div_card_header).append(div_collapse)
                            //    pn_select.accordion_ways.prepend(div_card);

                            //});
                            //    { "id": 215, "id_park_state_station": 12, "id_park": 53, "id_way": 122, "position": 19, "park_name_ru": "Очистка вагонов", "park_name_en": "Cleaning of wagons", "park_abbr_ru": "Очистка вагонов", "park_abbr_en": "Cleaning of wagons", "way_num_ru": "17", "way_num_en": "17", "way_name_ru": "Очистка вагонов", "way_name_en": "Очистка вагонов", "way_abbr_ru": "Очистка вагонов", "way_abbr_en": "Очистка вагонов", "capacity": 28, "count_wagon": 0, "note": null, "create": "2020-11-26T10:13:16.707", "create_user": "EUROPE\\ealevchenko", "change": null, "change_user": null, "delete": null, "delete_user": null },

                            // Пути получены
                            if (typeof callback === 'function') {
                                callback();
                            }
                        } else {
                            // Путей нет
                            pn_select.val_add_park_status.out_warning_message("По выбранному положению парка отсутсвуют вагоны.");
                            LockScreenOff();
                        }
                    });
                } else {
                    // создать новое
                    // Активируем меню
                    pn_select.bt_delete_park_status.prop('disabled', true);
                    pn_select.input_park_status_on_dt.obj.prop('disabled', false);
                    pn_select.bt_create_park_status.prop('disabled', false);
                    pn_select.park_state_info.text('');
                    if (typeof callback === 'function') {
                        //LockScreenOff();
                        callback();
                    }
                }

            },
            // Валидация
            validation: function () {
                pn_select.val_add_park_status.clear_all();
                var valid = true;
                valid = valid & pn_select.val_add_park_status.checkSelection(pn_select.select_station, "Укажите станцию переписи вагонов");
                valid = valid & pn_select.val_add_park_status.checkInputOfNull(pn_select.input_park_status_on_dt.obj, "Укажите дату и время переписи вагонов");
                return valid;
            },
            // Получить станцию
            get_station_of_id: function (id) {
                if (id > 0) {
                    return pn_select.list_stations.find(function (o) {
                        return Number(o.value) === id;
                    });
                } else return null;
            },
            // Получить положение парка
            get_park_state_of_id: function (id) {
                if (id > 0) {
                    return pn_select.list_park_state.find(function (o) {
                        return Number(o.id) === id;
                    });
                } else return null;
            },
            // Очистить компоненты для создания парка
            clear_create_park_state: function () {
                pn_select.input_park_status_on_dt.setDateTime(null)
            }
        },
        // Таблица путей
        table_ways_park_state = {
            html_table: $('table#ways-park-state'),
            obj: null,
            index_select_way: null,                             // Индекс выбраной строки в таблице
            select_way: null,                                   // Выбранный путь
            //index:1,
            init: function () {
                var groupColumn = 0;
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
                    "columnDefs": [
                        { "visible": false, "targets": groupColumn }
                    ],
                    "order": [[groupColumn, 'asc']],
                    "displayLength": 25,
                    "drawCallback": function (settings) {
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;
                        api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before(
                                    '<tr class="group"><td colspan="3">' + group + '</td></tr>'
                                );

                                last = group;
                            }
                        });
                    },
                    columns: [
                        {
                            //data: "way_park",
                            data: function (row, type, val, meta) {
                                return row["park_abbr_" + lang];
                            },
                            title: langView('field_way_park', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            //data: "way_name",
                            data: function (row, type, val, meta) {
                                return row["way_num_" + lang] + " - " + row["way_abbr_" + lang];
                            },
                            title: langView('field_way_name', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            //data: "way_count_wagon",
                            data: function (row, type, val, meta) {
                                return row.count_wagon;

                            },
                            title: langView('field_way_count', langs), width: "30px", orderable: false, searchable: false
                        },
                        {
                            //data: "way_capacity",
                            data: function (row, type, val, meta) {
                                return row.capacity;
                            },
                            title: langView('field_way_capacity', langs), width: "30px", orderable: false, searchable: false
                        },
                    ],
                }).on('select', function (e, dt, type, indexes) {
                    // Сохраним выбраный путь
                    //operation_detali.table_ways_park_state.index_select_way = indexes && indexes.length > 0 ? indexes[0] : null;
                    //// получим путь
                    //var rowData = operation_detali.table_ways_park_state.obj.rows(indexes).data().toArray();
                    ////operation_detali.table_ways_park_state.select_way = rowData && rowData.length > 0 ? rowData[0] : null;
                    //operation_detali.id_way_dislocation_on = rowData && rowData.length > 0 ? rowData[0].id : null;
                    //// Отразим  состояние кнопки добавить
                    //operation_detali.table_wagons_dislocation_from.active_button_add();
                    // Показать вагоны выбранные для дислокации
                    // !!!
                });
            },
            // Показать таблицу с данными
            view: function (list_way_state) {
                table_ways_park_state.obj.clear();

                table_ways_park_state.obj.rows.add(list_way_state.sort(function (a, b) { return a.position - b.position;}));
                table_ways_park_state.obj.draw();
                //LockScreenOff();
            },
            //// Определить вагон
            //get_ways: function (way) {
            //    return {
            //        "id": way.id,
            //        "way_park": way["park_abbr_" + operation_detali.lang],
            //        "way_name": way["way_num_" + operation_detali.lang] + " - " + way["way_abbr_" + operation_detali.lang],
            //        "way_capacity": way.capacity,
            //        "way_count_wagon": way.count_wagon,
            //    };

            //},
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === false ? true : false; });
        pn_select.init(lang, list_station);
        table_ways_park_state.init();
        // Инициализация окна править группу ограничений
        LockScreenOff();
    });

});