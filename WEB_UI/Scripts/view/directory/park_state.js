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
                    pn_select.val_add_park_status.clear_all();
                    event.preventDefault();
                }),
            // Удалить
            bt_delete_park_status: $('button#delete_park_status').on('click',
                function (event) {
                    pn_select.bt_delete_park_status.prop("disabled", true);
                    pn_select.val_add_park_status.clear_all();
                    event.preventDefault();
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

            //// Инициализация выбора документа
            //update_obj_select_doc: function (list_doc) {
            //    pn_select.select_doc = cd_updateSelect(
            //        pn_select.select_doc,
            //        { lang: pn_select.lang },
            //        list_doc,
            //        null,
            //        -1,
            //        null);
            //},
            //// Обновим компонент выбора документа
            //update_select_doc: function (start, stop, id_station, callback) {
            //    var list_doc = [];
            //    if (start && stop && id_station && id_station > 0) {
            //        // Делаем запрос
            //        LockScreen(langView('mess_load_data', langs));
            //        ids_inc.getArrivalSostavOfDatePeriodIDStationOn(start, stop, id_station, function (list_sostav) {
            //            table_arrival_wagon.view([]); //Очистим таблицу
            //            list_sostav.forEach(function (item, index, array) {
            //                list_doc.push({ value: item.id, text: item.num_doc });
            //            });
            //            pn_select.update_obj_select_doc(list_doc);
            //            if (typeof callback === 'function') {
            //                LockScreenOff();
            //                callback(list_sostav);
            //            }
            //        });
            //    } else {
            //        pn_select.update_obj_select_doc(list_doc);
            //        if (typeof callback === 'function') {
            //            LockScreenOff();
            //            callback(list_doc);
            //        }
            //    }
            //},
            //// Показать вагоны
            //view_arrival_wagon: function (id_sostav) {
            //    LockScreen(langView('mess_load_data', langs));
            //    // Получить инфу по составу
            //    ids_inc.getArrivalSostavOfID(id_sostav, function (sostav) {
            //        // Вывести информацию о составе
            //        var info = 'Индекс состава : ' + (sostav ? sostav.composition_index : '') + ', прибыл : ' + (sostav ? sostav.date_arrival : '');
            //        pn_select.sostav_info.text(info);
            //        if (sostav && sostav.ArrivalCars) {
            //            var list_wagon_sort = sostav.ArrivalCars.filter(function (i) {
            //                return i.position_arrival;
            //            }).sort(function (a, b) {
            //                return Number(a.position_arrival) - Number(b.position_arrival);
            //            });

            //            table_arrival_wagon.view(list_wagon_sort);
            //        }

            //    });
            //}
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