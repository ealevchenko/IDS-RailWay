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

            'field_position': '№ позиции',
            'field_num': '№ вагона',
            'field_num_valid': 'Тип нумерации',
            'field_note': 'Дислокация на АМКР',
            'field_create_wagon': 'Добавил',
            'field_change_wagon': 'Правил',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_clear_wagon': 'Убрать вагоны',
        },
        'en':  //default language: English
        {
            'field_way_park': 'Park',
            'field_way_name': 'Path',
            'field_way_count': 'Worth',
            'field_way_capacity': 'Accommodates',

            'field_position': 'Position No.',
            'field_num': 'Wagon number',
            'field_num_valid': 'Numbering type',
            'field_note': 'Dislocation at AMKR',
            'field_create_wagon': 'Added',
            'field_change_wagon': 'Rules',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',
            'title_button_clear_wagon': 'Remove wagons',
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
        ids_gl = new IDS_GLOBAL(), // Создадим класс IDS_RWT
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
        // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА СТАНЦИИ, СОСТОЯНИЯ ПАРКА
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
            id_park_status_select: null,                                                // Выбранный id состояния парка
            park_status_select: null,                                                   // Выбраная строка состояния парка
            select_station: $('select#select_station'),
            select_park_status: $('select#select_park_status'),
            input_park_status_on_dt: $('input#input_park_status_on_dt'),
            park_state_info: $('div#park_state_info'),
            // Принять 
            bt_apply: $('<button type="button" class="btn btn-warning ml-3" id="apply_park_state">Проверить и применить</button>'),
            //accordion_ways: $('div#accordion_ways'),
            bt_set_7: $('button#set_7').on('click',
                function (event) {
                    pn_select.input_park_status_on_dt.setDateTime(moment().set({ 'hour': 7, 'minute': 0, 'second': 0, 'millisecond': 0 })._d);
                    event.preventDefault();
                }),
            bt_set_19: $('button#set_19').on('click',
                function (event) {
                    pn_select.input_park_status_on_dt.setDateTime(moment().set({ 'hour': 19, 'minute': 0, 'second': 0, 'millisecond': 0 })._d);
                    event.preventDefault();
                }),
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
                                    id_park_status: pn_select.id_park_status_select,
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


            // 
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
                table_ways_park_state.clear();
                table_wagon_park_state.clear();
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
                //pn_select.accordion_ways.empty();
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
                    pn_select.park_state_info.text('Состояние парка на :' + getReplaceTOfDT(patk_state.state_on) + ', созданное : ' + patk_state.create_user + ' ')
                        .append($('<label style="color:red;">' + (patk_state.applied ? '( применено : ' + getReplaceTOfDT(patk_state.applied) + ' )' : '') + '</label>'))
                        .append(pn_select.bt_apply.on('click', function (event) {
                            event.preventDefault();
                            pn_select.apply();
                        }));
                    // Сделаем выборку 
                    ids_inc.getViewStatusParkStateOfParkStateStation(pn_select.id_park_status_select, function (list_way_state) {
                        pn_select.list_way_state = list_way_state;
                        if (pn_select.list_way_state && pn_select.list_way_state.length > 0) {
                            // Есть пути обновляем

                            table_ways_park_state.view(pn_select.list_way_state);
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
                    pn_select.park_state_info.empty().text('');
                    table_ways_park_state.clear(); // Очистим путя
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
            },
            // Валидация введеных вагонов на наличее (на территории АМКР, отсутсвие в других статусах)
            validation_park_state: function (callback) {
                var b_apply = false;
                LockScreen(langView('mess_checking_data', langs));
                // счтать текущий статус
                var id_park_status = get_select_number_value(pn_select.select_park_status);
                ids_gl.getParkStateApply(function (result_apply) {
                    if (result_apply && result_apply.length > 0) {
                        //var list = result_apply.split(';');
                        $.each(result_apply, function (i, el) {
                            if (Number(el) === id_park_status) {
                                b_apply = true;
                            }
                        });
                    }
                    // Пров
                    if (b_apply === false) {
                        // Применение парка не выполняется, можем применять
                        //------------
                        if (id_park_status > 0) {
                            // Статус выбран
                            // найдем строку статуса
                            var ps = pn_select.list_park_state.find(function (o) {
                                return o.id == id_park_status;
                            });
                            // строка статуса есть?
                            if (ps) {
                                // Строка есть, сделаем выборку по всем статусам за указанное время
                                pn_select.park_status_select = ps;
                                ids_inc.getViewDislocationAMKRWagonOfDate(ISOtoDate(ps.state_on), function (list_wagon) {
                                    var valid = true;
                                    var list_internal = []; // список вагонов пренадлежащих текущему положению
                                    var list_external = []; // список вагонов пренадлежащих другим положениям
                                    if (list_wagon && list_wagon.length > 0) {
                                        // Вагоны есть 
                                        $.each(list_wagon, function (i, el) {
                                            if (el.id === id_park_status) {
                                                // пренадлежит текущему положению
                                                list_internal.push(el);
                                            } else {
                                                // не пренадлежит текущему положению
                                                list_external.push(el);
                                            }
                                        });
                                        // Разделили
                                        var wagons_not_arrival = []; // Вагоны которые не заходили
                                        var wagons_exit = []; // Вагоны которые вышли
                                        var wagons_amkr = []; // Вагоны которые на АМКР
                                        // Есть вагоны пренадлежащие текущему положению?
                                        if (list_internal && list_internal.length > 0) {
                                            $.each(list_internal, function (i, el) {
                                                if (el.wir_id === null) {
                                                    // Вагон не заходил
                                                    wagons_not_arrival.push(el);
                                                } else {
                                                    if (el.wim_close !== null) {
                                                        wagons_exit.push(el);
                                                    } else {
                                                        //if (el.num === 63663819) {
                                                        //    var s = 1;
                                                        //}
                                                        wagons_amkr.push(el);
                                                        var dublicat = list_external.find(function (o) {
                                                            return o.num === el.num;
                                                        });
                                                        if (dublicat) {
                                                            valid = false;
                                                            pn_select.val_add_park_status.out_error_message('Ошибка, введеный номер :' + el.num + ' повторяется в положении парка по станции :' + dublicat['pss_station_name_' + lang]);
                                                        }
                                                    }
                                                }
                                            });
                                            // Вагоны по текущему статусу разделены
                                            // проверим вагоны которые не заходили
                                            if (wagons_not_arrival && wagons_not_arrival.length > 0) {
                                                valid = false;
                                                pn_select.val_add_park_status.out_error_message('Ошибка, найдено :' + wagons_not_arrival.length + ' вагонов которые не разу не заходили на АМКР');
                                            }
                                            // проверим вагоны которые ушли
                                            if (wagons_exit && wagons_exit.length > 0) {
                                                valid = false;
                                                pn_select.val_add_park_status.out_error_message('Ошибка, найдено :' + wagons_exit.length + ' вагонов которые уже зданы на УЗ');
                                            }
                                            // Есть вагоны на амкр, проверим на повтор
                                            if (wagons_amkr && wagons_amkr.length > 0) {
                                                // Провкерка на повторяющиеся номера
                                                var arr_res = [];
                                                wagons_amkr.sort(function (a, b) {
                                                    return a.num - b.num;
                                                });
                                                for (var i = 1; i < wagons_amkr.length; i++) {
                                                    if (wagons_amkr[i].num === wagons_amkr[i - 1].num) {
                                                        var is_unique = true;
                                                        for (var k = 0; k < arr_res.length; k++) {
                                                            if (arr_res[k].num === wagons_amkr[i].num) {
                                                                is_unique = false;
                                                                break;
                                                            }
                                                        }
                                                        if (is_unique) {
                                                            valid = false;
                                                            arr_res.push(wagons_amkr[i]);
                                                        }
                                                    }
                                                }
                                                // Вывод сообщений повторяющихся номеров
                                                $.each(arr_res, function (i, el) {
                                                    valid = false;
                                                    pn_select.val_add_park_status.out_error_message('Ошибка, введеный номер :' + el.num + ' повторяется.');
                                                });

                                                if (valid) {
                                                    // Проверка пройдена, Ок
                                                    pn_select.val_add_park_status.out_info_message('Ок, вагоны проверены');
                                                }
                                                // Все прошли
                                                LockScreenOff();
                                                if (typeof callback === 'function') {
                                                    callback(valid ? list_internal : null);
                                                }
                                            } else {
                                                valid = false;
                                                pn_select.val_add_park_status.out_error_message('Ошибка, в текущем положении парка нет вагонов на территории АМКР');
                                                LockScreenOff();
                                                if (typeof callback === 'function') {
                                                    callback(null);
                                                }
                                            }
                                        } else {
                                            valid = false;
                                            pn_select.val_add_park_status.out_error_message('Ошибка, Вагонов в текущем положении парка нет для проверки за указаную дату:' + ps.state_on + ' - нет.');
                                            LockScreenOff();
                                            if (typeof callback === 'function') {
                                                callback(null);
                                            }
                                        }
                                    } else {
                                        valid = false;
                                        // Вагонов нет
                                        pn_select.val_add_park_status.out_error_message('Ошибка, Вагонов для проверки за указаную дату:' + ps.state_on + ' - нет.');
                                        LockScreenOff();
                                        if (typeof callback === 'function') {
                                            callback(null);
                                        }
                                    }

                                });
                            }
                        } else {
                            // Парк не выбран
                            pn_select.val_add_park_status.out_warning_message('Выберите состояние парка!');
                            if (typeof callback === 'function') {
                                callback(null);
                            }
                        }
                        //------------
                    } else {
                        // Парк не выбран
                        pn_select.val_add_park_status.out_warning_message('Состояние парка - уже применяется');
                        if (typeof callback === 'function') {
                            callback(null);
                        }
                    }
                });
            },
            // Применить статус
            apply: function () {
                pn_select.val_add_park_status.clear_all();
                pn_select.validation_park_state(function (wagons) {
                    if (wagons && wagons.length > 0) {
                        // Прошли валидацию, проверим наличие состояния парка
                        if (pn_select.park_status_select) {
                            LockScreenOff();
                            // Определим станцию
                            var station = pn_select.get_station_of_id(pn_select.id_station_select);
                            dc.dialog_confirm('Open', 'Применить?', 'Валидация прошла успешно, применить положение парка по станции ' + (station ? station.text : '?') + ' по состоянию на ' + pn_select.park_status_select.state_on + ' ?', function (result) {
                                if (result) {
                                    ids_gl.postParkStateApply(pn_select.park_status_select.id, function (result_post) {
                                        if (result_post) {
                                            //-----------------------------------
                                            LockScreen(langView('mess_save', langs));
                                            //
                                            var wagons_ps = []
                                            // Сформируем вагоны
                                            $.each(wagons, function (i, el) {
                                                wagons_ps.push({ id_way: el.ps_way_id_way, num: el.num, position: el.ps_wag_position })

                                            });
                                            // Парк опрелделен, подготовим операцию
                                            var operation_apply_park_status = {
                                                id_station: pn_select.park_status_select.id_station,
                                                wagons: wagons_ps,
                                                lead_time: pn_select.park_status_select.state_on,
                                                user: user_name
                                            }
                                            // Выполним операуию
                                            ids_inc.postOperationApplyWagonsParkState(operation_apply_park_status, function (result_operation) {
                                                if (result_operation && result_operation.result > 0) {
                                                    // Сделаем отметку о применении
                                                    ids_inc.getParkState_StationOfID(pn_select.id_park_status_select, function (result_pss) {
                                                        if (result_pss) {
                                                            result_pss.applied = toISOStringTZ(new Date());
                                                            result_pss.applied_user = user_name;
                                                            ids_inc.putParkState_Station(result_pss, function (result_upd) {
                                                                if (result_upd > 0) {
                                                                    // Покажем выбраное положение парка
                                                                    pn_select.update_select_park_status(pn_select.id_station_select, pn_select.id_park_status_select, function () {
                                                                        pn_select.val_add_park_status.clear_all();
                                                                        pn_select.val_add_park_status.out_info_message("Операция «Применить состояние парка» - выполнена!");
                                                                        LockScreenOff();
                                                                    });


                                                                    //pn_select.update_view_park_status(pn_select.id_park_status_select, function () {
                                                                    //    pn_select.val_add_park_status.clear_all();
                                                                    //    pn_select.val_add_park_status.out_info_message("Операция «Применить состояние парка» - выполнена!");
                                                                    //    LockScreenOff();
                                                                    //});
                                                                } else {
                                                                    pn_select.val_add_park_status.clear_all();
                                                                    pn_select.val_add_park_status.out_error_message("Ошибка обновления строки состояния парка, отметка о выполнении не применилась!");
                                                                    LockScreenOff();
                                                                }
                                                            });
                                                        } else {
                                                            pn_select.val_add_park_status.clear_all();
                                                            pn_select.val_add_park_status.out_error_message("Ошибка обновления строки состояния парка, нет строки состояния парка с id =" + pn_select.id_park_status_select);
                                                            LockScreenOff();
                                                        }
                                                    });

                                                } else {
                                                    // Отмена 
                                                    if (result_operation && result_operation.result === 0) {
                                                        pn_select.val_add_park_status.clear_all();
                                                        pn_select.val_add_park_status.out_warning_message("Отмена применения состояния парка, вагоны уже стоят согласно списку состояния парка!");
                                                    } else {
                                                        pn_select.val_add_park_status.clear_all();
                                                        pn_select.val_add_park_status.out_error_message("Ошибка применения состояния парка, код ошибки = " + (result_operation ? result_operation.result : null));
                                                        if (result_operation && result_operation.listResult && result_operation.listResult.length > 0) {
                                                            $.each(result_operation.listResult, function (i, el) {
                                                                if (el.result < 0) {
                                                                    pn_select.val_add_park_status.out_error_message("№ вагона :" + el.num + ", код ошибки -" + el.result);
                                                                }
                                                            });
                                                        }
                                                    }
                                                    LockScreenOff();
                                                }
                                            });
                                            //-------------------------------------------
                                        } else {
                                            //
                                            LockScreenOff();
                                        }
                                    });

                                } else {
                                    pn_select.val_add_park_status.out_warning_message('Операция «Применить состояние парка» - отменена!');
                                }
                            });
                        } else {
                            pn_select.val_add_park_status.out_warning_message('Выберите состояние парка!');
                        }
                    } else {
                        LockScreenOff();
                    }
                });
            }
        },
        // Таблица путей
        table_ways_park_state = {
            html_table: $('table#ways-park-state'),
            obj: null,
            id_way: null,
            index_way: null,                             // Индекс выбраной строки в таблице
            select_way: null,                            // Выбранный путь
            list_way_state: null,                        // Список путей путь
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
                        $(row).attr('id', data.id);
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
                    table_ways_park_state.index_way = indexes && indexes.length > 0 ? indexes[0] : null;
                    //// получим путь
                    var rowData = table_ways_park_state.obj.rows(indexes).data().toArray();
                    table_ways_park_state.id_way = rowData && rowData.length > 0 ? rowData[0].id : null;
                    // Покажем вагоны
                    table_wagon_park_state.load(table_ways_park_state.id_way);


                    // Активируем панель ввода вагонов
                    table_wagon_park_state.pn_edit_nums.active(true);
                });
            },
            // Показать таблицу с данными
            view: function (list_way_state) {
                table_ways_park_state.list_way_state = list_way_state;
                var index = table_ways_park_state.index_way !== null ? table_ways_park_state.index_way : null;
                table_ways_park_state.obj.clear();
                if (table_ways_park_state.list_way_state && table_ways_park_state.list_way_state.length > 0) {
                    table_ways_park_state.obj.rows.add(table_ways_park_state.list_way_state.sort(function (a, b) { return a.id_park - b.id_park; }));
                } else {
                    table_ways_park_state.id_way = null;
                    table_ways_park_state.index_way = null;                             // Индекс выбраной строки в таблице
                    table_ways_park_state.select_way = null;
                    table_wagon_park_state.pn_edit_nums.active(false);
                };
                table_ways_park_state.obj.draw();
                if (index !== null) {
                    table_ways_park_state.obj.row(index).select();
                }
                //LockScreenOff();
            },
            // Сбрость данные таблицы
            clear: function () {
                table_ways_park_state.view(null);
            }
        },
        // Таблица вагонов на путях
        table_wagon_park_state = {
            html_table: $('table#wagon-park-state'),
            // Панель правки вагонов
            pn_edit_nums: {
                num_wagon_park_state_validation: $('input#num_wagon_park_state_validation'),
                num_wagon_park_state: $('textarea#num_wagon_park_state'),
                // Кнопка добавить
                bt_num_wagon_park_state_add: $('button#num_wagon_park_state_add').on('click', function (event) {
                    event.preventDefault();
                    alert.clear_message();
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_add.prop("disabled", true);
                    var nums = table_wagon_park_state.pn_edit_nums.valid_nums(true);
                    if (nums && nums.length > 0) {
                        // Вагоны определены
                        LockScreen(langView('mess_save', langs));
                        // Определим пакет данных для обновлени вагонов
                        var operation_update_wagon_park_state = {
                            id_park_state_way: table_ways_park_state.id_way,
                            wagons: nums,
                            type_operation: 0, // Добавить
                            user: user_name,
                        }
                        // Обновим данные
                        ids_inc.postOperationUpdateWagonsParkStateOfWay(operation_update_wagon_park_state, function (result_update) {
                            if (result_update && result_update.result >= 0) {
                                // Покажем выбраное положение парка
                                pn_select.update_view_park_status(pn_select.id_park_status_select, function () {
                                    if (typeof callback === 'function') {
                                        LockScreenOff();
                                        alert.out_info_message("Операция 'Добавить вагоны на путь' - Выполнена");
                                    }
                                });
                            } else {
                                alert.out_warning_message("При выполнении операции 'Добавить вагоны на путь' - произошла ошибка. Код ошибки =" + result_update.result);
                                if (result_update && result_update.listResultWagon && result_update.listResultWagon.length > 0) {
                                    $.each(result_update.listResultWagon, function (i, el) {
                                        if (el.result < 0) {
                                            alert.out_error_message("№ вагона :" + el.num + ". Код ошибки : " + el.result);
                                        }
                                    });
                                }
                                pn_select.bt_create_park_status.prop("disabled", false);
                                LockScreenOff();
                            }
                        });
                    }
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_add.prop("disabled", false);
                }),
                // Нажата заменить
                bt_num_wagon_park_state_replace: $('button#num_wagon_park_state_replace').on('click', function (event) {
                    event.preventDefault();
                    alert.clear_message();
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop("disabled", true);
                    var nums = table_wagon_park_state.pn_edit_nums.valid_nums(false);
                    if (nums && nums.length > 0) {
                        // Вагоны определены
                        LockScreen(langView('mess_save', langs));
                        // Определим пакет данных для обновлени вагонов
                        var operation_update_wagon_park_state = {
                            id_park_state_way: table_ways_park_state.id_way,
                            wagons: nums,
                            type_operation: 1, // Заменить
                            user: user_name,
                        }
                        // Обновим данные
                        ids_inc.postOperationUpdateWagonsParkStateOfWay(operation_update_wagon_park_state, function (result_update) {
                            if (result_update && result_update.result >= 0) {
                                // Покажем выбраное положение парка
                                pn_select.update_view_park_status(pn_select.id_park_status_select, function () {
                                    if (typeof callback === 'function') {
                                        LockScreenOff();
                                        alert.out_info_message("Операция 'Заменить вагоны на путь' - Выполнена");
                                    }
                                });
                            } else {
                                alert.out_warning_message("При выполнении операции 'Заменить вагоны на пути' - произошла ошибка. Код ошибки =" + result_update.result);
                                if (result_update && result_update.listResultWagon && result_update.listResultWagon.length > 0) {
                                    $.each(result_update.listResultWagon, function (i, el) {
                                        if (el.result < 0) {
                                            alert.out_error_message("№ вагона :" + el.num + ". Код ошибки : " + el.result);
                                        }
                                    });
                                }
                                pn_select.bt_create_park_status.prop("disabled", false);
                                LockScreenOff();
                            }
                        });
                    }
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop("disabled", false);
                }),
                // Инициализация
                init: function () {
                    table_wagon_park_state.pn_edit_nums.clear();
                    table_wagon_park_state.pn_edit_nums.active(false);
                },
                // Активация окна ввода вагонов
                active: function (active) {
                    table_wagon_park_state.pn_edit_nums.num_wagon_park_state_validation.prop('disabled', !active);
                    table_wagon_park_state.pn_edit_nums.num_wagon_park_state.prop('disabled', !active);
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_add.prop('disabled', !active);
                    if (!active) {
                        table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop('disabled', true);
                        table_wagon_park_state.pn_edit_nums.num_wagon_park_state.val('');
                    }
                },
                // Очистить
                clear: function () {
                    table_wagon_park_state.pn_edit_nums.num_wagon_park_state_validation.prop("checked", true);
                    table_wagon_park_state.pn_edit_nums.num_wagon_park_state.val('');
                    //table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_add.prop("disabled", false);
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop("disabled", true);
                },
                // Показать по данным таблицы
                view_data: function (data) {
                    // Данные есть
                    if (data && data.length > 0) {
                        var nums = [];
                        $.each(data, function (i, el) {
                            nums.push(el.num);
                        });

                    }
                },
                // Вывести по списку номеров вагона
                view_nums: function (nums) {
                    var list_nums = '';
                    if (nums && nums.length > 0) {
                        $.each(nums, function (i, el) {
                            list_nums += String(el + (i !== (nums.length - 1) ? ';' : ''));
                        });
                        //table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_add.prop("disabled", false);
                        table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop("disabled", false);
                    }
                    table_wagon_park_state.pn_edit_nums.num_wagon_park_state.val(list_nums);
                },
                // Валидация номеров вагона
                valid_nums: function (num_existing) {
                    // Проверим выбраный путь
                    if (table_ways_park_state.id_way === null) {
                        alert.out_warning_message('Выберите путь на который будут перенесены вагоны');
                        return null;
                    }
                    // Проверим список вагонов
                    var text_nums = table_wagon_park_state.pn_edit_nums.num_wagon_park_state.val();
                    if (!text_nums || text_nums === null) {
                        alert.out_warning_message('Нет списка вагонов');
                        return null;
                    }
                    var isNumeric = function (value) {
                        return /^\d+$/.test(value);
                    };
                    // Провкерка на правильный ввод номеров
                    var valid = true;
                    var car_valid = [];
                    var car_out = [];
                    var cars = table_wagon_park_state.pn_edit_nums.num_wagon_park_state.val().split(';');

                    var num_valid = table_wagon_park_state.pn_edit_nums.num_wagon_park_state_validation.prop("checked");

                    $.each(cars, function (i, el) {
                        if (!isNumeric($.trim(el))) {
                            alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                            valid = false;
                        } else {
                            if (Number($.trim(el)) <= 0) {
                                alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' номер не может быть меньше или равен 0 :' + el);
                                valid = false;
                            } else {
                                // Разрешена проверка номера на существующий в базе
                                if (num_existing) {
                                    // Проверить на совпадение вагонов добавляемых с существующими
                                    if (table_wagon_park_state.list_wagon && table_wagon_park_state.list_wagon.length > 0) {
                                        var exist = table_wagon_park_state.list_wagon.find(function (o) {
                                            return o.num === Number($.trim(el));
                                        });
                                        if (exist) {
                                            alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ', указанный номер ' + el + ' уже существует на пути.');
                                            valid = false;
                                        }
                                    }
                                }
                                // Разрешена проверка системной нумерации
                                if (num_valid) {
                                    var num_val = is_valid_num_wagon(Number($.trim(el)));
                                    // Если валидный добавим в список
                                    if (num_val) {
                                        car_valid.push(Number($.trim(el)));
                                        car_out.push(Number($.trim(el)));
                                    } else {
                                        alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' не системная нумерация (ошибка контрольной суммы) :' + el);
                                    }
                                    valid = valid & num_val;
                                } else {
                                    // добавим в список
                                    car_valid.push(Number($.trim(el)));
                                    car_out.push(Number($.trim(el)));
                                }
                            }
                        }
                    });
                    // Провкерка на повторяющиеся номера
                    arr_res = [];
                    car_valid.sort();
                    for (var i = 1; i < car_valid.length; i++) {
                        if (car_valid[i] === car_valid[i - 1]) {
                            var is_unique = true;
                            for (var k = 0; k < arr_res.length; k++) {
                                if (arr_res[k] === car_valid[i]) {
                                    is_unique = false;
                                    break;
                                }
                            }
                            if (is_unique) {
                                arr_res.push(car_valid[i]);
                            }
                        }
                    }
                    // Вывод сообщений повторяющихся номеров
                    $.each(arr_res, function (i, el) {
                        alert.out_warning_message('Ошибка ввода, введеный номер :' + el + ' повторяется.');
                        valid = false;
                        //LockScreenOff();
                    });
                    return valid ? car_out : null;
                }
            },
            obj: null,
            list_wagon: null,
            // инициализация
            init: function () {
                table_wagon_park_state.pn_edit_nums.init();
                this.obj = this.html_table.DataTable({
                    "paging": false,
                    "searching": false,
                    "ordering": true,
                    "info": false,
                    "keys": true,
                    select: {
                        style: "single",
                        toggleable: false,
                    },
                    "autoWidth": true,
                    //sScrollX: "100%",
                    //scrollX: true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                    },
                    columns: [
                        {
                            data: function (row, type, val, meta) {
                                return row.position;
                            },
                            title: langView('field_position', langs), width: "30px", orderable: true, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.num
                            },
                            title: langView('field_num', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) {
                                return !is_valid_num_wagon(Number(row.num)) ? 'Не системная' : 'Системная'
                            },
                            title: langView('field_num_valid', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) {
                                var c = meta.col;
                                var r = meta.row;
                                var id = row.id
                                var num = row.num;
                                if (id === 21) {
                                    var s = '';
                                } var result_dislocation = 'Поиск..';

                                ids_inc.getViewDislocationAMKRWagonOfNum(num, function (result_position) {
                                    //if (id === 21) {
                                    //    var s = '';
                                    //}
                                    var tb = $('table#wagon-park-state');
                                    //var tr = $('table#wagon-park-state tbody tr#' + id);
                                    var tr = tb.find('tbody tr#' + id);
                                    var td = tr.find('td:eq(' + c + ')');
                                    //var result_dislocation = 'Вагона нет на территории АМКР';

                                    if (result_position && result_position.length > 0) {

                                        if (result_position[0].close_wir === null) {
                                            //$('table#wagon-park-state tbody tr#' + id).removeClass('not-exist-amkr').addClass('exist-amkr');
                                            tr.removeClass('not-exist-amkr').addClass('exist-amkr');
                                            // Вагон на территории АМКР
                                            if (result_position[0].id_outer_way === null) {
                                                // Вагон на станции
                                                result_dislocation = 'Вагон находится на станции : ' + result_position[0]['station_name_' + lang] + '; <br/>Путь станции : ' + result_position[0]['way_num_' + lang] + ' - ' + result_position[0]['way_name_' + lang] + '; <br/>Позиция на пути : ' + result_position[0].position + ', прибыл на путь : ' + getReplaceTOfDT(result_position[0].way_start);
                                            } else {
                                                // Вагон движется по территории.
                                                result_dislocation = 'Вагон находится на перегоне : ' + result_position[0]['name_outer_way_' + lang] + '; <br/>Отправлен : ' + getReplaceTOfDT(result_position[0].outer_way_start);
                                            }
                                        } else {
                                            // Вагон вышел
                                            //$('table#wagon-park-state tbody tr#' + id).removeClass('exist-amkr').addClass('not-exist-amkr');
                                            tr.removeClass('exist-amkr').addClass('not-exist-amkr');
                                            result_dislocation = 'Вагон сдан на УЗ ' + getReplaceTOfDT(result_position[0].way_end) + ' со станции ' + result_position[0]['station_name_' + lang];
                                        }
                                    } else {
                                        // Вагона небыло на территории
                                        //$('table#wagon-park-state tbody tr#' + id).removeClass('exist-amkr').addClass('not-exist-amkr');
                                        tr.removeClass('exist-amkr').addClass('not-exist-amkr');
                                        result_dislocation = 'Вагон не заходил на территорию АМКР.';
                                    }
                                    $(td).empty().append(result_dislocation);
                                });
                                return result_dislocation;
                            },
                            title: langView('field_note', langs), width: "400px", orderable: false, searchable: false
                        },
                        {
                            //data: "create_wagon",
                            data: function (row, type, val, meta) {
                                return row.create ? row.create_user + '</br> (' + getReplaceTOfDT(row.create) + ')' : null;
                            },
                            title: langView('field_create_wagon', langs), width: "150px", orderable: false, searchable: false
                        },
                        {
                            //data: "change_wagon",
                            data: function (row, type, val, meta) {
                                return row.change ? row.change_user + '</br>(' + getReplaceTOfDT(row.change) + ')' : null;
                            },
                            title: langView('field_change_wagon', langs), width: "150px", orderable: false, searchable: false
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
                                    sheetName: 'Вагоны на пути',
                                    messageTop: function () {
                                        return '';
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            text: langView('title_button_clear_wagon', langs),
                            action: function (e, dt, node, config) {
                                // Подтверждение выполнения операции.
                                dc.dialog_confirm('Open', 'Убрать?', 'Убрать все вагоны с указанного пути?', function (result) {
                                    if (result) {
                                        // Убрать
                                        LockScreen(langView('mess_save', langs));
                                        // Определим пакет данных для обновлени вагонов
                                        var operation_delete_wagon_park_state = {
                                            id_park_state_way: table_ways_park_state.id_way,
                                            user: user_name,
                                        }
                                        // Обновим данные
                                        ids_inc.postOperationDeleteWagonsParkStateOfWay(operation_delete_wagon_park_state, function (result_delete) {
                                            if (result_delete && result_delete.result >= 0) {
                                                // Покажем выбраное положение парка
                                                pn_select.update_view_park_status(pn_select.id_park_status_select, function () {
                                                    if (typeof callback === 'function') {
                                                        LockScreenOff();
                                                        alert.out_info_message("Операция 'Удаления вагонов на пути' - Выполнена");
                                                    }
                                                });
                                            } else {
                                                alert.out_warning_message("При выполнении операции 'Удалить вагоны на пути' - произошла ошибка. Код ошибки =" + result_delete.result);
                                                if (result_delete && result_delete.listResultWagon && result_delete.listResultWagon.length > 0) {
                                                    $.each(result_delete.listResultWagon, function (i, el) {
                                                        if (el.result < 0) {
                                                            alert.out_error_message("№ вагона :" + el.num + ". Код ошибки : " + el.result);
                                                        }
                                                    });
                                                }
                                                LockScreenOff();
                                            }
                                        });

                                    }
                                });
                            },
                            enabled: false
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    // Сохраним выбраный путь
                    //table_wagon_park_state.index_way = indexes && indexes.length > 0 ? indexes[0] : null;
                    ////// получим путь
                    //var rowData = table_wagon_park_state.obj.rows(indexes).data().toArray();
                    //table_wagon_park_state.id_way = rowData && rowData.length > 0 ? rowData[0].id : null;
                    //// Отразим  состояние кнопки добавить
                    //operation_detali.table_wagons_dislocation_from.active_button_add();
                    // Показать вагоны выбранные для дислокации
                    // !!!
                });
            },
            // Загрузить данные по вагонам по указаному пути
            load: function (id_way) {
                LockScreen(langView('mess_load_data', langs));
                table_wagon_park_state.list_wagon = null; // Очистим список
                if (id_way > 0) {
                    // Путь указан покажем вагоны
                    ids_inc.getViewWagonParkStateOfWay(id_way, function (wagons) {
                        table_wagon_park_state.list_wagon = wagons;
                        table_wagon_park_state.view(table_wagon_park_state.list_wagon);

                    });
                } else {
                    // Путь не указан очистим таблицу
                    table_wagon_park_state.clear();
                }
            },
            // Показать данные
            view: function (data) {

                table_wagon_park_state.obj.clear();
                table_wagon_park_state.obj.button(1).enable(false);
                if (data && data.length > 0) {
                    table_wagon_park_state.obj.rows.add(data.sort(function (a, b) { return a.position - b.position; }));
                    table_wagon_park_state.obj.button(1).enable(true);
                }
                // Отобразить вагоны на пути для редактирования
                table_wagon_park_state.pn_edit_nums.view_data(data);
                table_wagon_park_state.obj.draw();
                table_wagon_park_state.view_nums(data); // Отобразить вагоны в окне
                LockScreenOff();
            },
            // Очистить данные
            clear: function () {
                table_wagon_park_state.view(null);
            },
            // Показать вагоны в окне ввода вагонов
            view_nums: function (data) {
                var nums_txt = "";
                table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop('disabled', true);
                if (data && data.length > 0) {
                    $.each(data, function (i, el) {
                        nums_txt += el.num + (i !== (data.length - 1) ? ";" : "");
                    });
                    table_wagon_park_state.pn_edit_nums.bt_num_wagon_park_state_replace.prop('disabled', false);
                };
                table_wagon_park_state.pn_edit_nums.num_wagon_park_state.val(nums_txt);
            }
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        // Обновить
        setInterval(function () {
            $('label#curent_date').text(getReplaceTOfDT(toISOStringTZ(new Date())));
            ids_gl.getCountClient(function (count) {
                $('label#client_count').text(count);
            });

        }, 1000);

        table_ways_park_state.init();
        table_wagon_park_state.init();
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === false && i.id !== 99 ? true : false; });
        pn_select.init(lang, list_station);
        // Инициализация окна править группу ограничений
        LockScreenOff();
    });

});