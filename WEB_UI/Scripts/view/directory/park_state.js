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
            id_station_select: null,                                                    // Выбранная станция
            id_park_status_select: null,                                                // Выбранный статус
            select_station: $('select#select_station'),
            select_park_status: $('select#select_park_status'),
            input_park_status_on_dt: $('input#input_park_status_on_dt'),
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
                                        pn_select.update_select_park_status(pn_select.id_station_select, -1);

                                        pn_select.val_add_park_status.out_info_message("Операция 'Создать новое положение парка' - Выполнена");
                                    } else {
                                        pn_select.val_add_park_status.out_warning_message("При выполнении операции 'Создать новое положение парка' - произошла ошибка. Код ошибки =" + result_create.result);
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
                    // Подтвердить
                    dc.dialog_confirm('Open', 'Удалить?', 'Будет удалено положение парка по сотоянию на: ' + (park_state ? park_state.state_on : '?') + ', созданое : ' + (park_state ? park_state.create_user : '?') + ', по станции : ' + (station ? station.text : '?') + '.', function (result) {
                        if (result) {
                            //LockScreen(langView('mess_save', langs));
                            //// Подготовим список вагонов для отправки
                            //// Определим пакет данных отправки на другую станцию
                            //var operation_create_park_state = {
                            //    id_station: pn_select.id_station_select,
                            //    date_status_on: toISOStringTZ(get_datetime_value(pn_select.input_park_status_on_dt.val(), pn_select.lang)),
                            //    user: user_name,
                            //}
                            //// Выполнить операцию создать парк
                            //ids_inc.postOperationCreateParkStateOfStation(operation_create_park_state, function (result_create) {
                            //    if (result_create && result_create.result >= 0) {
                            //        // Обновим
                            //        pn_select.update_select_park_status(pn_select.id_station_select, -1);

                            //        pn_select.val_add_park_status.out_info_message("Операция 'Создать новое положение парка' - Выполнена");
                            //    } else {
                            //        pn_select.val_add_park_status.out_warning_message("При выполнении операции 'Создать новое положение парка' - произошла ошибка. Код ошибки =" + result_create.result);
                            //        if (result_create && result_create.listResult && result_create.listResult.length > 0) {
                            //            $.each(result_create.listResult, function (i, el) {
                            //                if (el.result < 0) {
                            //                    pn_select.val_add_park_status.out_error_message("Станция id :" + el.id + ". Код ошибки : " + el.result);
                            //                }
                            //            });
                            //        }
                            //        LockScreenOff();
                            //    }
                            //});
                        } else {
                            pn_select.bt_delete_park_status.prop("disabled", false);
                            pn_select.val_add_park_status.out_warning_message("Выполнение операции «Удаление положения парка» - отменено!");
                        }
                    });



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
                        pn_select.update_select_park_status(id, 0);
                    },
                    null);
                // настроим компонент выбора времени
                pn_select.input_park_status_on_dt = cd_initDateTimeRangePicker(pn_select.input_park_status_on_dt, { lang: pn_select.lang, time: true }, function (datetime) {

                });
                pn_select.all_obj_add_park_status = $([]).add(pn_select.input_park_status_on_dt);
                // Проверка валидации операции роспуска
                pn_select.val_add_park_status = new VALIDATION(pn_select.lang, pn_select.alert, pn_select.all_obj_add_park_status); // Создадим класс VALIDATION
                // Показать последние состояния парка по станции
                pn_select.update_select_park_status(pn_select.id_station_select, pn_select.id_park_status_select)
            },
            // Обновим выбор состояний парка по станции
            update_select_park_status: function (id_station, id_park_status) {
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
                            pn_select.update_view_park_status(id);
                        },
                        null);
                    // Покажем выбраное положение парка
                    pn_select.update_view_park_status(pn_select.id_park_status_select);
                });

            },
            // Покажем выбраное положение парка
            update_view_park_status: function (id_park_status) {
                pn_select.id_park_status_select = id_park_status;
                pn_select.val_add_park_status.clear_all();
                // Проверим если выбрано существующее положение тогда показать
                if (pn_select.id_park_status_select > 0) {
                    // Показать существующее
                    // Активируем меню
                    pn_select.bt_delete_park_status.prop('disabled', false);
                    pn_select.input_park_status_on_dt.obj.prop('disabled', true);
                    pn_select.bt_create_park_status.prop('disabled', true);
                } else {
                    // создать новое
                    // Активируем меню
                    pn_select.bt_delete_park_status.prop('disabled', true);
                    pn_select.input_park_status_on_dt.obj.prop('disabled', false);
                    pn_select.bt_create_park_status.prop('disabled', false);
                }
                LockScreenOff();
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
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === false ? true : false; });
        pn_select.init(lang, list_station);
        // Инициализация окна править группу ограничений
        LockScreenOff();
    });

});