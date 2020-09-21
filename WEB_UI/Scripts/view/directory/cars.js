jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num': '№ ваг',
                'field_countrys': 'Адм',
                'field_genus': 'Род',
                'field_owner': 'Владелец',
                'field_operator_uz': 'Оператор (УЗ)',
                'field_change_operator': 'Опер. измен.',
                'field_operator': 'Оператор (АМКР)',
                'field_gruzp': 'Грузопод.т',
                'field_tara': 'Тара.т',
                'field_kol_os': 'Кол. осей',
                'field_usl_tip': 'Тип цистерны',
                'field_date_rem_uz': 'Дата ремонта (УЗ)',
                'field_date_rem_vag': 'Дата ремонта (Вагон)',
                'field_limiting': 'Ограничение',
                'field_type_ownership': 'Собственность',
                'field_rent_start': 'Начало аренды',
                'field_rent_end': 'Конец аренды',
                'field_sign': 'Признаки',
                'field_factory_number': 'Заводской №',
                'field_inventory_number': 'Инвентарный №',
                'field_year_built': 'Год постройки',
                'field_exit_ban': 'запрет на выезд',
                'field_note': 'Примечание',
                'field_sobstv_kis': 'Оператор (КИС)',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал строку',
                'field_change': 'Строку правили',
                'field_change_user': 'Правил',

                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',
                'title_button_select_all': 'Выбрать все',
                'title_button_select_none': 'Убрать все',

                'title_button_add': 'Добавить',
                'title_button_edit': 'Изменить',
                'title_button_del': 'Удалить',
                'title_button_edit_operator': 'Изменить оператора',
                'title_button_edit_limit': 'Изменить ограничение',
            },
            'en':  //default language: English
            {
                'field_train': 'train number',
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
        ids_dir = new IDS_DIRECTORY(lang), // Создадим класс IDS_DIRECTORY
        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_dir.load(['operators_wagons'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        //*************************************************************************************
        // ПАНЕЛЬ ВАРИАНТОВ ПОИСКА ВАГОНОВ
        //*************************************************************************************
        pn_search = {
            num_car: $('textarea#num_cars'),
            num_cars_comparison: $('textarea#num_cars_comparison'),
            num_cars_comparison_not: $('textarea#num_cars_comparison_not'),
            num_cars_comparison_yes: $('textarea#num_cars_comparison_yes'),
            num_cars_comparison_no: $('textarea#num_cars_comparison_no'),
            num_cars_comparison_change: $('textarea#num_cars_comparison_change'),

            bt_cars_warning: $('button#cars_warning'),
            bt_cars_search_num: $('button#cars_search_num'),
            bt_cars_search_operator: $('button#cars_search_operator'),
            bt_cars_comparison_num: $('button#cars_comparison_num'),
            bt_cars_comparison_num_not: $('button#cars_comparison_num_not'),
            bt_cars_comparison_num_yes: $('button#cars_comparison_num_yes'),
            bt_cars_comparison_num_no: $('button#cars_comparison_num_no'),
            bt_cars_comparison_num_change: $('button#cars_comparison_num_change'),
            wagon_operator: $('select#wagon_operator'),
            wagon_operator_comparison: $('select#wagon_operator_comparison'),
            text_type_searsh: $('#type-search').text(''),
            active: 0,
            num_cars_valid: [],
            num_cars_comparison_valid: [],
            // Инициализация
            init: function () {
                // обработка события show.bs.tab переключение панелей выбора
                $('[data-toggle="tab"]').on('show.bs.tab', function (e) {
                    var activeTab = $(e.target);    // активная вкладка
                    switch (e.target.hash) {
                        case '#cars-warning': pn_search.active = 0; break;
                        case '#cars-search-num': pn_search.active = 1; break;
                        case '#cars-search-operator': pn_search.active = 2; break;
                    };
                    // отобразим тип поиска
                    pn_search.text_type_searsh.text(activeTab.text());

                    if (e.target.hash === "#cars-search-operator") {
                        LockScreen(langView('mess_delay', langs));
                        pn_search.view_cars();
                    } else {
                        table_directory.view([]);
                    }
                });

                // Инициализация элементов
                pn_search.wagon_operator = cd_initSelect(
                    pn_search.wagon_operator,
                    { lang: lang },
                    ids_dir.getListOperatorsWagons('id', 'operators', lang, null),
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        // Найти вагон по оператору
                        LockScreen(langView('mess_delay', langs));
                        pn_search.view_cars();
                    }, null);
                // 
                pn_search.wagon_operator_comparison = cd_initSelect(
                    pn_search.wagon_operator_comparison,
                    { lang: lang },
                    ids_dir.getListOperatorsWagons('id', 'operators', lang, null),
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                    }, null);
                // Кнопка найти вагон требующий изменения
                pn_search.bt_cars_warning.on('click', function (event) {
                    event.preventDefault();
                    pn_search.text_type_searsh.text('Требующие правки'),
                        LockScreen(langView('mess_delay', langs));
                    pn_search.view_cars();
                    //table_directory.view_cars_warning();
                });
                // Кнопка сравнить вагон по номеру и оператору
                pn_search.bt_cars_search_num.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    alert.clear_message();
                    if (pn_search.num_car.val() !== "") {
                        pn_search.bt_cars_search_num.prop("disabled", true);

                        var isNumeric = function (value) {
                            //return /^\d{8}/.test(value);
                            return /^\d+$/.test(value);
                        };
                        // Провкерка на правильный ввод номеров
                        var valid = true;
                        var car_valid = [];
                        var cars = pn_search.num_car.val().split(';');
                        $.each(cars, function (i, el) {
                            if (!isNumeric(el) || !(Number(el) >= 10000000 && Number(el) <= 99999999)) {
                                // Ошибка ввода
                                alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                                valid = false;
                            } else {
                                car_valid.push(Number(el));
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
                            LockScreenOff();
                        });
                        // Продолжим 
                        if (valid) {
                            // Сохраним номера вагонов для выбора
                            pn_search.num_cars_valid = car_valid;
                            pn_search.view_cars();
                        } else {
                            alert.out_warning_message('Исправьте указанные номера в указанных позициях и попробуйте заново.');
                            pn_search.bt_cars_search_num.prop("disabled", false);
                            LockScreenOff();
                        }

                    } else {
                        alert.out_error_message("Введите номер вагона или несколько вагонов, разделитель номеров ';'");
                        LockScreenOff();
                    }
                });
                // Кнопка сравнить вагон по номеру и оператору
                pn_search.bt_cars_comparison_num.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    alert.clear_message();
                    pn_search.num_cars_comparison_not.text();
                    pn_search.num_cars_comparison_yes.text();
                    pn_search.num_cars_comparison_no.text();
                    pn_search.num_cars_comparison_change.text();

                    // Проверим оператора
                    var id_operator = get_select_number_value(pn_search.wagon_operator_comparison);
                    if (id_operator === null) {
                        alert.out_warning_message('Выберите оператора.');
                        //pn_search.bt_cars_comparison_num.prop("disabled", false);
                        LockScreenOff();
                    }
                    if (pn_search.num_cars_comparison.val() !== "") {
                        pn_search.bt_cars_comparison_num.prop("disabled", true);

                        var isNumeric = function (value) {
                            return /^\d+$/.test(value);
                        };
                        // Провкерка на правильный ввод номеров
                        var valid = true;
                        var car_valid = [];
                        var cars = pn_search.num_cars_comparison.val().split(';');
                        $.each(cars, function (i, el) {
                            if (!isNumeric(el) || !(Number(el) >= 10000000 && Number(el) <= 99999999)) {
                                // Ошибка ввода
                                alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                                valid = false;
                            } else {
                                car_valid.push(Number(el));
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
                            pn_search.bt_cars_comparison_num.prop("disabled", false);
                            LockScreenOff();
                        });
                        // Продолжим 
                        if (valid) {
                            //var wagon_nums = pn_search.num_cars_comparison_valid; // Номера вагонов со списка
                            var wagon_list = null; // Вагоны со списка которые есть базе
                            var wagon_operator = null;
                            // 
                            var arr_not = [];
                            var arr_yes = [];
                            var arr_yes_operator = [];
                            var arr_no_operator = [];
                            var arr_change_operator = [];

                            // функция возрата номеров вагонов из массива
                            var get_arr_nums = function (arr) {
                                var arr_result = [];
                                for (var ia = 0; ia < arr.length; ia++) {
                                    arr_result.push(arr[ia].num);
                                }
                                return arr_result;
                            };
                            // Показать результаты
                            var view_result = function (textarea, nums) {
                                var result = '';
                                for (var iw = 0; iw < nums.length; iw++) {
                                    result += nums[iw] + (iw < (nums.length - 1) ? ';' : '');
                                }
                                if (textarea) {
                                    textarea.text(result);
                                }
                            };

                            // Сохраним номера вагонов для выбора
                            pn_search.num_cars_comparison_valid = car_valid;
                            // Проведем сравнение
                            // Получим вагоны со списка
                            ids_dir.getWagonOfNums(pn_search.num_cars_comparison_valid, function (result_wagon_list) {
                                wagon_list = result_wagon_list;
                                // Получить вагоны по оператору
                                ids_dir.getWagonOfOperator(id_operator, function (result_wagon_operator) {
                                    wagon_operator = result_wagon_operator;
                                    // Определим вагоны которые есть в базе и нет
                                    var nums = get_arr_nums(wagon_list);
                                    for (var i = 0; i < pn_search.num_cars_comparison_valid.length; i++) {
                                        if (nums.indexOf(pn_search.num_cars_comparison_valid[i]) === -1) {
                                            arr_not.push(pn_search.num_cars_comparison_valid[i]);
                                        } else {
                                            arr_yes.push(pn_search.num_cars_comparison_valid[i]);
                                        }
                                    }
                                    // Вагоны которые есть в базе, проверим на соответсвие оператору
                                    for (var io = 0; io < arr_yes.length; io++) {
                                        var res = wagon_list.find(function (item, index, array) {
                                            return item.num === arr_yes[io] ? true : false;
                                        });
                                        if (res) {
                                            var current_rent = ids_dir.getCurrentRentOfWagon(res);
                                            if (current_rent.id_operator === id_operator) {
                                                arr_yes_operator.push(arr_yes[io]);
                                            } else {
                                                arr_no_operator.push(arr_yes[io]);
                                            }
                                        }
                                    }
                                    // Определим вагоны которые теперь не пренадлежат оператору
                                    var nums = get_arr_nums(wagon_operator);
                                    for (var i = 0; i < nums.length; i++) {
                                        if (arr_yes_operator.indexOf(nums[i]) === -1) {
                                            arr_change_operator.push(nums[i]);
                                        }
                                    }
                                    // Покажем результат
                                    view_result(pn_search.num_cars_comparison_not, arr_not);
                                    view_result(pn_search.num_cars_comparison_yes, arr_yes_operator);
                                    view_result(pn_search.num_cars_comparison_no, arr_no_operator);
                                    view_result(pn_search.num_cars_comparison_change, arr_change_operator);
                                    pn_search.bt_cars_comparison_num.prop("disabled", false);
                                    alert.out_info_message('Проверено ' + pn_search.num_cars_comparison_valid.length + ' номеров вагонов, в справочнике найдено ' + arr_yes.length + ' вагона(ов), нет в справочнике ' + arr_not.length + ' вагона(ов), к указанному оператору в справочнике найдено ' + wagon_operator.length + ' вагона(ов) из них соответствует ' + arr_yes_operator.length + ' вагона(ов), не соответствует ' + arr_no_operator.length + ' вагона(ов), уже не соответствует ' + arr_change_operator.length + ' вагона(ов).');
                                    LockScreenOff();

                                });
                            });
                        } else {
                            alert.out_warning_message('Исправьте указанные номера в указанных позициях и попробуйте заново.');
                            pn_search.bt_cars_comparison_num.prop("disabled", false);
                            LockScreenOff();
                        }

                    } else {
                        alert.out_error_message("Введите номер вагона или несколько вагонов, разделитель номеров ';'");
                        pn_search.bt_cars_comparison_num.prop("disabled", false);
                        LockScreenOff();
                    }
                });
            },
            // Показать в зависимости от ыбранного режима поиска
            view_cars: function () {
                switch (pn_search.active) {
                    case 0: table_directory.view_cars_warning(); break;
                    case 1: table_directory.view_cars_search_num(pn_search.num_cars_valid, function () {
                        pn_search.bt_cars_search_num.prop("disabled", false);
                    }); break;
                    case 2: table_directory.view_cars_search_operator(); break;
                        //case 3: table_directory.view_cars_search_operator(); break;
                }
            }
        },
        //*************************************************************************************
        // ОКНО ИЗМЕНИТЬ ОГРАНИЧЕНИЕ ПО ГРУППЕ
        //*************************************************************************************
        pn_change_group_limit = {
            obj: null,
            lang: null,
            user_name: null,
            ids_dir: null,
            alert: $('div#change_group_limit_alert'),                                             // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_group: null,
            rows: null,
            // Поля формы
            change_group_limiting: $('select#change_group_limiting'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_change_group_limit.ids_dir.load(['limiting_loading'], false, function () {
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
                pn_change_group_limit.lang = lang;
                pn_change_group_limit.user_name = user_name;
                pn_change_group_limit.ids_dir = new IDS_DIRECTORY(pn_change_group_limit.lang), // Создадим класс IDS_DIRECTORY
                    pn_change_group_limit.loadReference(function () {
                        pn_change_group_limit.list_group = pn_change_group_limit.ids_dir.getListLimitingLoading('id', 'limiting_name', pn_change_group_limit.lang, null);
                        // Инициализация элементов
                        pn_change_group_limit.change_group_limiting = cd_initSelect(
                            pn_change_group_limit.change_group_limiting,
                            { lang: pn_change_group_limit.lang },
                            pn_change_group_limit.list_group,
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Соберем все элементы в массив
                        pn_change_group_limit.all_obj = $([])
                            .add(pn_change_group_limit.change_group_limiting)
                        ;
                        // создадим классы 

                        //pn_change_group_limit.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                        pn_change_group_limit.val = new VALIDATION(pn_change_group_limit.lang, pn_change_group_limit.alert, pn_change_group_limit.all_obj); // Создадим класс VALIDATION
                        //pn_change_group_limit.table_car.init();
                        pn_change_group_limit.obj = $("div#change_group_limit").dialog({
                            resizable: false,
                            title: 'Изменить ограничение по группе вагонов',
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
                                        pn_change_group_limit.save(callback_ok);
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
                        pn_change_group_limit.obj.find("form").on("submit", function (event) {
                            event.preventDefault();
                        });
                    });

            },
            // открыть окно добавмить вагоны вручную
            Open: function (rows) {
                pn_change_group_limit.val.clear_all();
                pn_change_group_limit.change_group_limiting.val(-1); // сбросить выбор
                pn_change_group_limit.rows = rows;
                if (rows && rows.length > 0) {
                    pn_change_group_limit.obj.dialog("open");
                }
            },
            // Валидация данных
            validation: function () {
                pn_change_group_limit.val.clear_all();
                var valid = true;
                valid = valid & pn_change_group_limit.val.checkSelection(pn_change_group_limit.change_group_limiting, "Выберите ограничение");
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var list_cars = [];
                var list_nums = [];
                var list_rent = [];
                var valid = pn_change_group_limit.validation();
                if (valid) {
                    pn_change_group_limit.val.clear_all();
                    LockScreen(langView('mess_save', langs));
                    // Получимсписок номеров вагонов
                    for (inum = 0; inum < pn_change_group_limit.rows.length; inum++) {
                        list_nums.push(pn_change_group_limit.rows[inum].num);
                    }
                    // Получим строки справочника по списку номеров вагона
                    pn_change_group_limit.ids_dir.getWagonOfNums(list_nums, function (result_wagon) {
                        //list_cars = result_wagon;
                        for (ir = 0; ir < result_wagon.length; ir++) {
                            // Получим текущую аренду
                            var car = pn_change_group_limit.ids_dir.getCloneWagons(result_wagon[ir]);
                            var current_rent = pn_change_group_limit.ids_dir.getCurrentRentOfWagon(result_wagon[ir]);
                            if (car.id_genus === 0 || car.id_countrys === 0 || current_rent === null || (current_rent.id_operator === null || current_rent.id_operator == 0)) {
                                car.bit_warning = true;
                            } else {
                                car.bit_warning = false;
                            }
                            car.change = toISOStringTZ(new Date());
                            car.change_user = pn_change_group_limit.user_name;
                            var new_rent = pn_change_group_limit.ids_dir.getCloneWagonsRent(current_rent);
                            new_rent.id_limiting = get_select_number_value(pn_change_group_limit.change_group_limiting);
                            new_rent.change = toISOStringTZ(new Date()),
                                new_rent.change_user = pn_change_group_limit.user_name,
                                list_rent.push(new_rent);
                            list_cars.push(car);
                        }
                        // обновим аренду
                        pn_change_group_limit.ids_dir.putListWagonsRent(list_rent, function (result_upd) {
                            if (result_upd >= 0) {
                                pn_change_group_limit.ids_dir.putListWagon(list_cars, function (result_upd_car) {
                                    if (result_upd_car >= 0) {
                                        if (typeof callback_ok === 'function') {
                                            pn_change_group_limit.obj.dialog("close");
                                            callback_ok(result_upd_car);
                                        }
                                    } else {
                                        //pn_change_group_limit.val.clear_all();
                                        pn_change_group_limit.val.out_error_message("При обновлении основной информации по группе вагонов произошла ошибка!");
                                        LockScreenOff();
                                    }
                                });
                            } else {
                                //pn_change_group_limit.val.clear_all();
                                pn_change_group_limit.val.out_error_message("При обновлении ограничения на группу вагонов произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    });
                }
            },
        },
        //*************************************************************************************
        // ОКНО ИЗМЕНИТЬ ОПЕРАТОРА ПО ГРУППЕ
        //*************************************************************************************
        pn_change_group_operator = {
            obj: null,
            lang: null,
            user_name: null,
            ids_dir: null,
            alert: $('div#change_group_operator_alert'),                                       // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_group: null,
            rows: null,
            // Поля формы
            change_group_operator: $('select#change_group_operator'),
            change_group_rent_start: $('input#change_group_rent_start'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_change_group_operator.ids_dir.load(['operators_wagons'], false, function () {
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
                pn_change_group_operator.lang = lang;
                pn_change_group_operator.user_name = user_name;
                pn_change_group_operator.ids_dir = new IDS_DIRECTORY(pn_change_group_operator.lang), // Создадим класс IDS_DIRECTORY
                    pn_change_group_operator.loadReference(function () {
                        pn_change_group_operator.list_group = pn_change_group_operator.ids_dir.getListOperatorsWagons('id', 'operators', pn_change_group_operator.lang, null);
                        // Инициализация элементов
                        pn_change_group_operator.change_group_operator = cd_initSelect(
                            pn_change_group_operator.change_group_operator,
                            {
                                lang: pn_change_group_operator.lang
                            },
                            pn_change_group_operator.list_group,
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Дата начала аренды новая
                        pn_change_group_operator.change_group_rent_start = cd_initDateTimeRangePicker(pn_change_group_operator.change_group_rent_start, { lang: lang, time: true }, function (datetime) {

                        }),
                        // Соберем все элементы в массив
                            pn_change_group_operator.all_obj = $([])
                                .add(pn_change_group_operator.change_group_operator)
                                .add(pn_change_group_operator.change_group_rent_start.obj)
                        ;
                        // создадим классы 

                        //pn_change_group_operator.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                        pn_change_group_operator.val = new VALIDATION(pn_change_group_operator.lang, pn_change_group_operator.alert, pn_change_group_operator.all_obj); // Создадим класс VALIDATION
                        //pn_change_group_operator.table_car.init();
                        pn_change_group_operator.obj = $("div#change_group_operator").dialog({
                            resizable: false,
                            title: 'Изменить оператора по группе вагонов',
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
                                        pn_change_group_operator.save(callback_ok);
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
                        pn_change_group_operator.obj.find("form").on("submit", function (event) {
                            event.preventDefault();
                        });
                    });

            },
            // открыть окно добавмить вагоны вручную
            Open: function (rows) {
                pn_change_group_operator.val.clear_all();
                pn_change_group_operator.change_group_operator.val(-1);                 // Сбросить
                pn_change_group_operator.change_group_rent_start.setDateTime(null);     // Сбросить
                pn_change_group_operator.rows = rows;
                if (rows && rows.length > 0) {
                    pn_change_group_operator.obj.dialog("open");
                }
            },
            // Валидация данных
            validation: function () {
                pn_change_group_operator.val.clear_all();
                var valid = true;
                valid = valid & pn_change_group_operator.val.checkSelection(pn_change_group_operator.change_group_operator, "Выберите оператора");
                valid = valid & pn_change_group_operator.val.checkInputOfNull(pn_change_group_operator.change_group_rent_start.obj, "Укажите время начало аренды");
                valid = valid & pn_change_group_operator.val.checkInputOfDateTime(pn_change_group_operator.change_group_rent_start.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm:ss');
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var list_nums = [];
                var list_cars = [];
                var list_old_rent = [];
                var list_new_rent = [];
                var new_rent = null;
                var id_operator = get_select_number_value(pn_change_group_operator.change_group_operator);
                var valid = pn_change_group_operator.validation();
                if (valid) {
                    LockScreen(langView('mess_save', langs));
                    // Получимсписок номеров вагонов
                    for (inum = 0; inum < pn_change_group_operator.rows.length; inum++) {
                        list_nums.push(pn_change_group_operator.rows[inum].num);
                    }
                    // Получим строки справочника по списку номеров вагона
                    pn_change_group_operator.ids_dir.getWagonOfNums(list_nums, function (result_wagon) {
                        for (ir = 0; ir < result_wagon.length; ir++) {
                            // Получим текущую аренду
                            var car = pn_change_group_operator.ids_dir.getCloneWagons(result_wagon[ir]);
                            var current_rent = pn_change_group_operator.ids_dir.getCurrentRentOfWagon(result_wagon[ir]);
                            var old_rent = pn_change_group_operator.ids_dir.getCloneWagonsRent(current_rent);
                            if (old_rent.id_operator !== id_operator) {
                                // Создаем новую строку
                                // Закроем старую
                                old_rent.rent_end = toISOStringTZ(get_datetime_value(pn_change_group_operator.change_group_rent_start.val(), pn_change_group_operator.lang));
                                old_rent.change = toISOStringTZ(new Date());
                                old_rent.change_user = pn_change_group_operator.user_name;
                                // Создадим новую
                                new_rent = {
                                    "id": 0,
                                    "num": old_rent.num,
                                    "id_operator": id_operator,
                                    "id_limiting": old_rent.id_limiting,
                                    "rent_start": toISOStringTZ(get_datetime_value(pn_change_group_operator.change_group_rent_start.val(), pn_change_group_operator.lang)),
                                    "rent_end": null,
                                    "create": toISOStringTZ(new Date()),
                                    "create_user": pn_change_group_operator.user_name,
                                    "change": null,
                                    "change_user": null,
                                    "parent_id": old_rent.id,
                                }
                                list_new_rent.push(new_rent);
                            }
                            list_old_rent.push(old_rent);
                            // Определим бит "требует внимание"
                            if (car.id_genus === 0 || car.id_countrys === 0 || old_rent === null
                                || (new_rent === null && (old_rent.id_operator === null || old_rent.id_operator === 0))
                                || (new_rent !== null && (new_rent.id_operator === null || new_rent.id_operator === 0))) {
                                car.bit_warning = true;
                            } else {
                                car.bit_warning = false;
                            }
                            car.change = toISOStringTZ(new Date());
                            car.change_user = pn_change_group_operator.user_name;

                            list_cars.push(car);
                        }
                        // Обновим старые аренды
                        pn_change_group_operator.ids_dir.putListWagonsRent(list_old_rent, function (result_upd) {
                            if (result_upd >= 0) {
                                // Добавим новые аренды
                                pn_change_group_operator.ids_dir.postListWagonsRent(list_new_rent, function (result_add) {
                                    if (result_add >= 0) {
                                        // Обновим осноную строку справочника вагона (с новым состоянием бита внимание и кто правил)
                                        pn_change_group_operator.ids_dir.putListWagon(list_cars, function (result_upd_car) {
                                            if (result_upd_car >= 0) {
                                                if (typeof callback_ok === 'function') {
                                                    pn_change_group_operator.obj.dialog("close");
                                                    callback_ok({ update: result_upd, add: result_add, cars: result_upd_car });
                                                }
                                            } else {
                                                //pn_change_group_limit.val.clear_all();
                                                pn_change_group_operator.val.out_error_message("При обновлении основной информации по группе вагонов произошла ошибка!");
                                                LockScreenOff();
                                            }
                                        });
                                    } else {
                                        pn_change_group_operator.val.clear_all();
                                        pn_change_group_operator.val.out_error_message("При добавлении новых строки операторов на группу вагонов произошла ошибка!");
                                        LockScreenOff();
                                    }
                                });
                            } else {
                                pn_change_group_operator.val.clear_all();
                                pn_change_group_operator.val.out_error_message("При обновлении операторов на группу вагонов произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    });
                }
            },
        },
        //*************************************************************************************
        // ОКНО ДОБАВИТЬ ПРАВИТЬ ГРУЗ
        //*************************************************************************************
        pn_add_edit = {
            obj: null,
            lang: null,
            user_name: null,
            ids_dir: null,
            alert: $('div#add_edit_alert'),                                             // Сообщения
            all_obj: null,                                                              // массив всех элементов формы 
            val: null,                                                                  // класс валидации
            select_num: null,                                                           // номер вагона
            select_obj: null,                                                           // строка
            select_rent: null,                                                           // строка
            // Поля формы
            add_edit_num: $('input#add_edit_num'),
            // Поиск и определение вагона
            add_search_car: $('button#add_search_car').on('click', function (event) {
                event.preventDefault();
                pn_add_edit.val.clear_message();

                var num = pn_add_edit.add_edit_num.val()

                pn_add_edit.add_wagon(Number(num), function (result_car) {
                    if (result_car) {
                        pn_add_edit.val.out_warning_message(' Можете откорректировать информацию, включен режим - править');
                        pn_add_edit.select_num = Number(num);
                        pn_add_edit.obj.dialog("option", "title", "Править вагон");
                        pn_add_edit.view_car(result_car)
                    } else {
                        pn_add_edit.val.out_error_message('Не удалось добавить в справочник строку по вагону');
                    }
                    LockScreenOff();
                });
            }),
            add_edit_kod_adm: $('input#add_edit_kod_adm'),
            add_edit_name_adm: $('select#add_edit_name_adm'),
            //add_edit_kod_rod: $('input#add_edit_kod_rod'),
            add_edit_name_rod: $('select#add_edit_name_rod'),
            add_edit_name_rod_abbr: $('input#add_edit_name_rod_abbr'),

            add_edit_usl_tip: $('input#add_edit_usl_tip'),
            add_edit_kol_os: $('select#add_edit_kol_os'),
            add_edit_gruzp: $('input#add_edit_gruzp'),

            add_edit_tara : $('input#add_edit_tara'),
            add_edit_year_built: $('input#add_edit_year_built'),
            add_edit_factory_number: $('input#add_edit_factory_number'),
            add_edit_inventory_number: $('input#add_edit_inventory_number'),
            add_edit_exit_ban: $('input#add_edit_exit_ban'),

            add_edit_owner_car: $('select#add_edit_owner_car'),
            add_edit_operator_uz_car: $('select#add_edit_operator_uz_car'),
            add_edit_change_operator: $('input#add_edit_change_operator'),

            add_edit_operator_car: $('select#add_edit_operator_car'),
            add_edit_operator_car_rent_start: $('input#add_edit_operator_car_rent_start'),
            add_edit_type_ownership: $('select#add_edit_type_ownership'),

            add_edit_operator_car_new: $('select#add_edit_operator_car_new'),
            add_edit_operator_car_rent_start_now: $('input#add_edit_operator_car_rent_start_now'),

            add_edit_limiting: $('select#add_edit_limiting'),
            add_edit_sign: $('select#add_edit_sign'),

            add_edit_date_rem_uz: $('input#add_edit_date_rem_uz'),
            add_edit_date_rem_vag: $('input#add_edit_date_rem_vag'),
            add_edit_note: $('textarea#add_edit_note'),

            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_add_edit.ids_dir.load(['countrys', 'genus_wagon', 'owners_wagons', 'operators_wagons', 'limiting_loading', 'type_owner_ship'], false, function () {
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
                pn_add_edit.lang = lang;
                pn_add_edit.user_name = user_name;
                pn_add_edit.ids_dir = new IDS_DIRECTORY(pn_add_edit.lang), // Создадим класс IDS_DIRECTORY
                    pn_add_edit.loadReference(function () {
                        // Инициализация элементов
                        // АДМ
                        pn_add_edit.add_edit_name_adm = cd_initSelect(
                            pn_add_edit.add_edit_name_adm,
                            {
                                lang: pn_add_edit.lang
                            },
                            pn_add_edit.ids_dir.getListCountrys('id', 'countrys_name', pn_add_edit.lang, function (i) {
                                return i.code_sng !== null ? true : false;
                            }),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                                pn_add_edit.add_edit_kod_adm.val(pn_add_edit.ids_dir.getValue_Countrys_Of_ID(Number(id), 'code_sng'));
                            }, null);
                        // РОД
                        pn_add_edit.add_edit_name_rod = cd_initSelect(
                            pn_add_edit.add_edit_name_rod,
                            {
                                lang: pn_add_edit.lang
                            },
                            pn_add_edit.ids_dir.getListGenusWagons('id', 'genus', pn_add_edit.lang, null),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                                //pn_add_edit.add_edit_kod_rod.val(pn_add_edit.ids_dir.getValue_GenusWagons_Of_ID(Number(id), 'rod_uz'));
                                pn_add_edit.add_edit_name_rod_abbr.val(pn_add_edit.ids_dir.getValue_GenusWagons_Of_ID(Number(id), 'abbr', pn_add_edit.lang));
                            }, null);
                        // Количество осей
                        pn_add_edit.add_edit_kol_os = cd_initSelect(
                            pn_add_edit.add_edit_kol_os,
                            {
                                lang: pn_add_edit.lang
                            },
                            [{
                                value: 0, text: "0"
                            }, { value: 4, text: "4" }, { value: 8, text: "8" }, { value: 12, text: "12" }, { value: 16, text: "16" }, {
                                value: 32, text: "32"
                            }],
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Владелец
                        pn_add_edit.add_edit_owner_car = cd_initSelect(
                            pn_add_edit.add_edit_owner_car,
                            {
                                lang: pn_add_edit.lang
                            },
                            pn_add_edit.ids_dir.getListOwnersWagons('id', 'owner', pn_add_edit.lang, null),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Оператор УЗ
                        pn_add_edit.add_edit_operator_uz_car = cd_initSelect(
                            pn_add_edit.add_edit_operator_uz_car,
                            {
                                lang: pn_add_edit.lang
                            },
                            pn_add_edit.ids_dir.getListOperatorsWagons('id', 'operators', pn_add_edit.lang, null),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Дата изменения оператора
                        pn_add_edit.add_edit_change_operator = cd_initDateTimeRangePicker(pn_add_edit.add_edit_change_operator, { lang: lang, time: true }, function (datetime) {

                        }),
                        // Оператор УЗ
                            pn_add_edit.add_edit_operator_car = cd_initSelect(
                                pn_add_edit.add_edit_operator_car,
                                {
                                    lang: pn_add_edit.lang
                                },
                                pn_add_edit.ids_dir.getListOperatorsWagons('id', 'operators', pn_add_edit.lang, null),
                                null,
                                -1,
                                function (event) {
                                    event.preventDefault();
                                    var id = Number($(this).val());
                                }, null);
                        // Дата начала аренды
                        pn_add_edit.add_edit_operator_car_rent_start = cd_initDateTimeRangePicker(pn_add_edit.add_edit_operator_car_rent_start, { lang: lang, time: true }, function (datetime) {

                        }),
                        // Признак собственности
                            pn_add_edit.add_edit_type_ownership = cd_initSelect(
                                pn_add_edit.add_edit_type_ownership,
                                {
                                    lang: pn_add_edit.lang
                                },
                                pn_add_edit.ids_dir.getListTypeOwnerShip('id', 'type_ownership', pn_add_edit.lang, null),
                                null,
                                -1,
                                function (event) {
                                    event.preventDefault();
                                    var id = Number($(this).val());
                                }, null);
                        // Оператор УЗ новый АМКР
                        pn_add_edit.add_edit_operator_car_new = cd_initSelect(
                            pn_add_edit.add_edit_operator_car_new,
                            {
                                lang: pn_add_edit.lang
                            },
                            pn_add_edit.ids_dir.getListOperatorsWagons('id', 'operators', pn_add_edit.lang, null),
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Дата начала аренды новая
                        pn_add_edit.add_edit_operator_car_rent_start_now = cd_initDateTimeRangePicker(pn_add_edit.add_edit_operator_car_rent_start_now, { lang: lang, time: true }, function (datetime) {

                        }),
                        // ограничение ограничения
                            pn_add_edit.add_edit_limiting = cd_initSelect(
                                pn_add_edit.add_edit_limiting,
                                {
                                    lang: pn_add_edit.lang
                                },
                                pn_add_edit.ids_dir.getListLimitingLoading('id', 'limiting_name', pn_add_edit.lang, null),
                                null,
                                -1,
                                function (event) {
                                    event.preventDefault();
                                    var id = Number($(this).val());
                                }, null);
                        // Количество осей
                        pn_add_edit.add_edit_sign = cd_initSelect(
                            pn_add_edit.add_edit_sign,
                            {
                                lang: pn_add_edit.lang
                            },
                            [{
                                value: 0, text: "Не грузить"
                            }, {
                                value: 1, text: "Сход"
                            }],
                            null,
                            -1,
                            function (event) {
                                event.preventDefault();
                                var id = Number($(this).val());
                            }, null);
                        // Дата ремонта вагона
                        pn_add_edit.add_edit_date_rem_uz = cd_initDateTimeRangePicker(pn_add_edit.add_edit_date_rem_uz, { lang: lang, time: false }, function (datetime) {

                        }),
                        // Дата ремонта вагона
                            pn_add_edit.add_edit_date_rem_vag = cd_initDateTimeRangePicker(pn_add_edit.add_edit_date_rem_vag, { lang: lang, time: false }, function (datetime) {

                            }),
                        // Соберем все элементы в массив
                            pn_add_edit.all_obj = $([])
                                .add(pn_add_edit.add_edit_num)
                                .add(pn_add_edit.add_edit_kod_adm)
                                .add(pn_add_edit.add_edit_name_adm)
                                //.add(pn_add_edit.add_edit_kod_rod)
                                .add(pn_add_edit.add_edit_name_rod)
                                .add(pn_add_edit.add_edit_name_rod_abbr)
                                .add(pn_add_edit.add_edit_usl_tip)
                                .add(pn_add_edit.add_edit_kol_os)
                                .add(pn_add_edit.add_edit_gruzp)
                                .add(pn_add_edit.add_edit_tara)
                                .add(pn_add_edit.add_edit_year_built)
                                .add(pn_add_edit.add_edit_factory_number)
                                .add(pn_add_edit.add_edit_inventory_number)
                                .add(pn_add_edit.add_edit_exit_ban)
                                .add(pn_add_edit.add_edit_owner_car)
                                .add(pn_add_edit.add_edit_operator_uz_car)
                                .add(pn_add_edit.add_edit_operator_car)
                                .add(pn_add_edit.add_edit_operator_car_rent_start.obj)
                                .add(pn_add_edit.add_edit_type_ownership)
                                .add(pn_add_edit.add_edit_operator_car_new)
                                .add(pn_add_edit.add_edit_operator_car_rent_start_now.obj)
                                .add(pn_add_edit.add_edit_limiting)
                                .add(pn_add_edit.add_edit_sign)
                                .add(pn_add_edit.add_edit_date_rem_uz.obj)
                                .add(pn_add_edit.add_edit_date_rem_vag.obj)
                                .add(pn_add_edit.add_edit_note)
                        ;
                        // создадим классы 

                        //pn_add_edit.alert = new ALERT($('div#add_edit_alert'));// Создадим класс ALERTG
                        pn_add_edit.val = new VALIDATION(pn_add_edit.lang, pn_add_edit.alert, pn_add_edit.all_obj); // Создадим класс VALIDATION
                        //pn_add_edit.table_car.init();
                        pn_add_edit.obj = $("div#add_edit").dialog({
                            resizable: false,
                            //title: 'Изменить группу груза',
                            modal: true,
                            autoOpen: false,
                            height: "auto",
                            width: 800,
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
                                        pn_add_edit.save(callback_ok);
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
                        pn_add_edit.obj.find("form").on("submit", function (event) {
                            event.preventDefault();
                        });
                    });

            },
            //  вывести информацию о вагоне
            view_car: function (car) {
                if (car) {
                    pn_add_edit.select_obj = car;
                    pn_add_edit.select_rent = pn_add_edit.ids_dir.getCurrentRentOfWagon(car)

                    pn_add_edit.add_edit_num.val(pn_add_edit.select_obj.num).prop('disabled', true);
                    pn_add_edit.add_search_car.prop('disabled', true);
                    pn_add_edit.add_edit_kod_adm.val(pn_add_edit.ids_dir.getValue_Countrys_Of_ID(Number(pn_add_edit.select_obj.id_countrys), 'code_sng'));
                    pn_add_edit.add_edit_name_adm.val(Number(pn_add_edit.select_obj.id_countrys)).prop('disabled', false);
                    //pn_add_edit.add_edit_kod_rod.val(pn_add_edit.ids_dir.getValue_GenusWagons_Of_ID(Number(pn_add_edit.select_obj.id_genus), 'rod_uz'));
                    pn_add_edit.add_edit_name_rod.val(Number(pn_add_edit.select_obj.id_genus)).prop('disabled', false);
                    pn_add_edit.add_edit_name_rod_abbr.val(pn_add_edit.ids_dir.getValue_GenusWagons_Of_ID(Number(pn_add_edit.select_obj.id_genus), 'abbr', pn_add_edit.lang));
                    pn_add_edit.add_edit_usl_tip.val(pn_add_edit.select_obj.usl_tip).prop('disabled', false);
                    pn_add_edit.add_edit_kol_os.val(pn_add_edit.select_obj.kol_os).prop('disabled', false);
                    pn_add_edit.add_edit_gruzp.val(pn_add_edit.select_obj.gruzp).prop('disabled', false);

                    pn_add_edit.add_edit_tara.val(pn_add_edit.select_obj.tara !== null ? pn_add_edit.select_obj.tara : 0).prop('disabled', false);
                    pn_add_edit.add_edit_year_built.val(pn_add_edit.select_obj.year_built).prop('disabled', false);
                    pn_add_edit.add_edit_factory_number.val(pn_add_edit.select_obj.factory_number).prop('disabled', false);
                    pn_add_edit.add_edit_inventory_number.val(pn_add_edit.select_obj.inventory_number).prop('disabled', false);
                    pn_add_edit.add_edit_exit_ban.prop('checked', pn_add_edit.select_obj.exit_ban !== null ? pn_add_edit.select_obj.exit_ban : false).prop('disabled', false);

                    pn_add_edit.add_edit_owner_car.val(Number(pn_add_edit.select_obj.id_owner));
                    pn_add_edit.add_edit_operator_uz_car.val(Number(pn_add_edit.select_obj.id_operator_uz));
                    pn_add_edit.add_edit_change_operator.setDateTime(pn_add_edit.select_obj.change_operator !== null ? pn_add_edit.select_obj.change_operator.replace(/T/g, ' ') : null);

                    pn_add_edit.add_edit_operator_car.val(Number(pn_add_edit.select_rent.id_operator));
                    pn_add_edit.add_edit_operator_car_rent_start.setDateTime(pn_add_edit.select_rent.rent_start !== null ? pn_add_edit.select_rent.rent_start.replace(/T/g, ' ') : null);
                    pn_add_edit.add_edit_type_ownership.val(pn_add_edit.select_obj.id_type_ownership);

                    pn_add_edit.add_edit_operator_car_new.val(-1).prop('disabled', false);
                    pn_add_edit.add_edit_operator_car_rent_start_now.setDateTime(null); pn_add_edit.add_edit_operator_car_rent_start_now.obj.prop('disabled', false);
                    pn_add_edit.add_edit_limiting.val(Number(pn_add_edit.select_rent.id_limiting)).prop('disabled', false);
                    pn_add_edit.add_edit_sign.val(pn_add_edit.select_obj.sign !== null ? pn_add_edit.select_obj.sign : -1).prop('disabled', false);

                    pn_add_edit.add_edit_date_rem_uz.setDateTime(pn_add_edit.select_obj.date_rem_uz !== null ? pn_add_edit.select_obj.date_rem_uz.replace(/T/g, ' ') : null);
                    pn_add_edit.add_edit_date_rem_vag.setDateTime(pn_add_edit.select_obj.date_rem_vag !== null ? pn_add_edit.select_obj.date_rem_vag.replace(/T/g, ' ') : null);

                    pn_add_edit.add_edit_note.text(pn_add_edit.select_obj.note);
                }
            },
            // открыть окно добавмить вагоны вручную
            Open: function (num) {
                pn_add_edit.val.clear_all();
                pn_add_edit.select_num = num;
                pn_add_edit.select_obj = null;
                if (pn_add_edit.select_num) {
                    // Правим запись
                    pn_add_edit.obj.dialog("option", "title", "Править вагон");
                    pn_add_edit.ids_dir.getWagonOfNum(pn_add_edit.select_num, function (result_obj) {
                        if (result_obj) {
                            pn_add_edit.view_car(result_obj);
                            //    pn_add_edit.select_obj = result_obj;
                            //    pn_add_edit.select_rent = pn_add_edit.ids_dir.getCurrentRentOfWagon(result_obj)

                            //    pn_add_edit.add_edit_num.val(pn_add_edit.select_obj.num).prop('disabled', true);
                            //    pn_add_edit.add_search_car.prop('disabled', true);
                            //    pn_add_edit.add_edit_kod_adm.val(pn_add_edit.ids_dir.getValue_Countrys_Of_ID(Number(pn_add_edit.select_obj.id_countrys), 'code_sng'));
                            //    pn_add_edit.add_edit_name_adm.val(Number(pn_add_edit.select_obj.id_countrys));
                            //    //pn_add_edit.add_edit_kod_rod.val(pn_add_edit.ids_dir.getValue_GenusWagons_Of_ID(Number(pn_add_edit.select_obj.id_genus), 'rod_uz'));
                            //    pn_add_edit.add_edit_name_rod.val(Number(pn_add_edit.select_obj.id_genus));
                            //    pn_add_edit.add_edit_name_rod_abbr.val(pn_add_edit.ids_dir.getValue_GenusWagons_Of_ID(Number(pn_add_edit.select_obj.id_genus), 'abbr', pn_add_edit.lang));
                            //    pn_add_edit.add_edit_usl_tip.val(pn_add_edit.select_obj.usl_tip);
                            //    pn_add_edit.add_edit_kol_os.val(pn_add_edit.select_obj.kol_os);
                            //    pn_add_edit.add_edit_gruzp.val(pn_add_edit.select_obj.gruzp);
                            //    pn_add_edit.add_edit_owner_car.val(Number(pn_add_edit.select_obj.id_owner));
                            //    pn_add_edit.add_edit_operator_uz_car.val(Number(pn_add_edit.select_obj.id_operator_uz));
                            //    pn_add_edit.add_edit_change_operator.setDateTime(pn_add_edit.select_obj.change_operator !== null ? pn_add_edit.select_obj.change_operator.replace(/T/g, ' ') : null);

                            //    pn_add_edit.add_edit_operator_car.val(Number(pn_add_edit.select_rent.id_operator));
                            //    pn_add_edit.add_edit_operator_car_rent_start.setDateTime(pn_add_edit.select_rent.rent_start !== null ? pn_add_edit.select_rent.rent_start.replace(/T/g, ' ') : null);
                            //    pn_add_edit.add_edit_type_ownership.val(pn_add_edit.select_obj.id_type_ownership);

                            //    pn_add_edit.add_edit_operator_car_new.val(-1);
                            //    pn_add_edit.add_edit_operator_car_rent_start_now.setDateTime(null);
                            //    pn_add_edit.add_edit_limiting.val(Number(pn_add_edit.select_rent.id_limiting));
                            //    pn_add_edit.add_edit_sign.val(pn_add_edit.select_obj.sign !== null ? pn_add_edit.select_obj.sign : -1);

                            //    pn_add_edit.add_edit_date_rem_uz.setDateTime(pn_add_edit.select_obj.date_rem_uz !== null ? pn_add_edit.select_obj.date_rem_uz.replace(/T/g, ' ') : null);
                            //    pn_add_edit.add_edit_date_rem_vag.setDateTime(pn_add_edit.select_obj.date_rem_vag !== null ? pn_add_edit.select_obj.date_rem_vag.replace(/T/g, ' ') : null);

                            //    pn_add_edit.add_edit_note.text(pn_add_edit.select_obj.note);
                            pn_add_edit.obj.dialog("open");

                        }
                        else {
                            pn_add_edit.val.clear_all();
                            pn_add_edit.val.out_error_message("Ошибка. Не могу найти строку по id = " + pn_add_edit.select_num);
                        }
                    });
                } else {
                    pn_add_edit.obj.dialog("option", "title", "Добавить вагон");
                    pn_add_edit.add_edit_num.val('').prop('disabled', false);
                    pn_add_edit.add_search_car.prop('disabled', false);
                    pn_add_edit.disabled_element();

                    //pn_add_edit.add_edit_cargo_group.val(-1);
                    //pn_add_edit.add_edit_cargo_etsng.val(-1);
                    //pn_add_edit.add_edit_cargo_name_ru.val('');
                    //pn_add_edit.add_edit_cargo_name_en.val('');
                    //pn_add_edit.add_edit_code_sap.val('');
                    //pn_add_edit.add_edit_sending.prop('checked', false);
                    // Добавим запись
                    pn_add_edit.obj.dialog("open");
                }
            },


            // Сделать не активными все элементы
            disabled_element: function () {
                pn_add_edit.add_edit_kod_adm.prop('disabled', true);
                pn_add_edit.add_edit_name_adm.prop('disabled', true);
                pn_add_edit.add_edit_name_rod.prop('disabled', true);
                pn_add_edit.add_edit_name_rod_abbr.prop('disabled', true);
                pn_add_edit.add_edit_usl_tip.prop('disabled', true);
                pn_add_edit.add_edit_kol_os.prop('disabled', true);
                pn_add_edit.add_edit_gruzp.prop('disabled', true);

                pn_add_edit.add_edit_tara.prop('disabled', true);
                pn_add_edit.add_edit_year_built.prop('disabled', true);
                pn_add_edit.add_edit_factory_number.prop('disabled', true);
                pn_add_edit.add_edit_inventory_number.prop('disabled', true);
                pn_add_edit.add_edit_exit_ban.prop('disabled', true);

                pn_add_edit.add_edit_owner_car.prop('disabled', true);
                pn_add_edit.add_edit_operator_uz_car.prop('disabled', true);
                pn_add_edit.add_edit_change_operator.obj.prop('disabled', true);

                pn_add_edit.add_edit_operator_car.prop('disabled', true);
                pn_add_edit.add_edit_operator_car_rent_start.obj.prop('disabled', true);
                pn_add_edit.add_edit_type_ownership.prop('disabled', true);

                pn_add_edit.add_edit_operator_car_new.prop('disabled', true);
                pn_add_edit.add_edit_operator_car_rent_start_now.obj.prop('disabled', true);
                pn_add_edit.add_edit_limiting.prop('disabled', true);
                pn_add_edit.add_edit_sign.prop('disabled', true);

                pn_add_edit.add_edit_date_rem_uz.obj.prop('disabled', true);
                pn_add_edit.add_edit_date_rem_vag.obj.prop('disabled', true);

                pn_add_edit.add_edit_note.prop('disabled', true);
            },
            // Сделать не активными все элементы для дабавления
            enabled_add_element: function () {

            },
            // Валидация поля  "администрация вагона"
            validation_adm: function (valid, off_message) {
                //valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_kod_adm, "Укажите код администрации", "", off_message);
                valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_name_adm, "Выберите администрацию", "", off_message);
                return valid;
            },
            // Валидация поля  "род вагона"
            validation_rod_vag: function (valid, off_message) {
                valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_name_rod, "Укажите род вагона", "", off_message);
                return valid;
            },
            // Валидация поля  "Количество осей"
            validation_vag_kol_os: function (valid, off_message) {
                valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_kol_os, "Укажите количество осей (0- по умолчанию, 4,8,12,16,32)", "", off_message);
                return valid;
            },
            // Валидация поля  "Грузоподъемность"
            validation_vag_gruzp: function (valid, off_message) {
                valid = valid & pn_add_edit.val.checkInputOfRange(pn_add_edit.add_edit_gruzp, 0.0, 80.0, "Грузоподъемность должна быть в диапазоне от 0.0 до 80.0 тон.", "", off_message);
                return valid;
            },
            // Валидация поля  "Тара"
            validation_vag_tara: function (valid, off_message) {
                valid = valid & pn_add_edit.val.checkInputOfRange(pn_add_edit.add_edit_tara, 0.0, 30.0, "Тара должна быть в диапазоне от 0.0 до 30.0 тон.", "", off_message);
                return valid;
            },
            // Валидация данных вагона
            validation: function () {
                pn_add_edit.val.clear_all();
                var valid = true;
                //valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_num, "Укажите номер вагона");
                valid = valid & pn_add_edit.validation_adm(valid, false);
                valid = valid & pn_add_edit.validation_rod_vag(valid, false);
                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_usl_tip);
                valid = valid & pn_add_edit.validation_vag_kol_os(valid, false);
                valid = valid & pn_add_edit.validation_vag_gruzp(valid, false);
                valid = valid & pn_add_edit.validation_vag_tara(valid, false);
                //valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_owner_car, "Укажите собственника");
                //pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_operator_uz_car);
                //pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_operator_car);
                //pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_operator_car_rent_start.obj);
                //pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_type_ownership);
                var id_operator_car_amkr = get_select_number_value(pn_add_edit.add_edit_operator_car);
                var id_new_operator = get_select_number_value(pn_add_edit.add_edit_operator_car_new);



                // Проверим если оператора АМКР небыло и не указали нового оператора, тогда ошибка валидации
                if ((!id_operator_car_amkr || id_operator_car_amkr < 0) && (!id_new_operator || id_new_operator < 0)) {
                    valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_operator_car_new, "Выберите оператора");
                }


                if (id_new_operator && id_new_operator >= 0) {
                    valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_operator_car_rent_start_now.obj, "Укажите время начало аренды");
                    valid = valid & pn_add_edit.val.checkInputOfDateTime(pn_add_edit.add_edit_operator_car_rent_start_now.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm:ss');
                    // Проверять только если меняется оператор
                    if (id_operator_car_amkr && id_operator_car_amkr > 0) {
                        var rent_start_now = moment(get_datetime_value(pn_add_edit.add_edit_operator_car_rent_start_now.val(), pn_add_edit.lang));
                        var rent_start_old = moment(pn_add_edit.select_rent.rent_start);
                        // Проверка на вводиую дату 
                        if (rent_start_now.isBefore(rent_start_old)) {
                            valid = false;
                            pn_add_edit.val.set_object_error(pn_add_edit.add_edit_operator_car_rent_start_now.obj, "Время начало аренды меньше времени начало аренды предыдущей записи")
                        }
                    }

                }

                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_limiting);
                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_sign);

                //valid = valid & pn_add_edit.val.checkInputOfDateTime_IsNull(pn_add_edit.add_edit_date_rem_uz.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & pn_add_edit.val.checkInputOfDateTime_IsNull(pn_add_edit.add_edit_date_rem_vag.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');


                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_note);
                return valid;
            },
            // Получить новый объек Cars
            get_new_cars: function (old_cars) {
                return {
                    id: old_cars.id,
                    num: old_cars.num,
                    id_countrys: old_cars.id_countrys,
                    id_genus: old_cars.id_genus,
                    id_owner: old_cars.id_owner,
                    id_operator_uz: old_cars.id_operator_uz,
                    ban_changes_operator: old_cars.ban_changes_operator,
                    id_operator: old_cars.id_operator,
                    gruzp: old_cars.gruzp,
                    kol_os: old_cars.kol_os,
                    usl_tip: old_cars.usl_tip,
                    date_rem_uz: old_cars.date_rem_uz,
                    date_rem_vag: old_cars.date_rem_vag,
                    id_limiting: old_cars.id_limiting,
                    id_type_ownership: old_cars.id_type_ownership,
                    rent_start: old_cars.rent_start,
                    rent_end: old_cars.rent_end,
                    sign: old_cars.sign,
                    note: old_cars.note,
                    sobstv_kis: old_cars.sobstv_kis,
                    create: old_cars.create,
                    create_user: old_cars.create_user,
                    change: old_cars.change,
                    change_user: old_cars.change_user,
                }
            },
            // Закрыть аренду по указаному вагону 
            close_rent: function (num, rent_start, rent_stop, callback) {
                if (num) {
                    pn_add_edit.ids_dir.getOpenRent_CarsOfNumRentStart(num, rent_start, function (not_close_cars) {
                        var close_cars = [];
                        for (i = 0; i < not_close_cars.length; i++) {
                            var close_car = pn_add_edit.get_new_cars(not_close_cars[i]);
                            close_car.ban_changes_operator = 0;
                            close_car.rent_end = rent_stop;
                            close_car.change = toISOStringTZ(new Date());
                            close_car.change_user = pn_add_edit.user_name;
                            close_cars.push(close_car);
                        }
                        // Обновим записи
                        pn_add_edit.ids_dir.putListCars(close_cars, function (result_upd) {
                            if (typeof callback === 'function') {
                                callback(result_upd);
                            }
                        });
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Сбросить бит требуется изменение по предыдущим записям
            clear_bit_warning: function (num, id, callback) {
                if (num) {
                    pn_add_edit.ids_dir.getCarsOfNum(num, function (not_clear_cars) {
                        var clear_cars = [];
                        for (i = 0; i < not_clear_cars.length; i++) {
                            var clear_car = pn_add_edit.get_new_cars(not_clear_cars[i]);
                            // если бит взведен и строка не текущая тогда сбросим
                            if (clear_car.ban_changes_operator && clear_car.id !== id) {
                                clear_car.ban_changes_operator = 0;
                                clear_car.change = toISOStringTZ(new Date());
                                clear_car.change_user = pn_add_edit.user_name;
                                clear_cars.push(clear_car);
                            }
                        }
                        // Обновим записи
                        pn_add_edit.ids_dir.putListCars(clear_cars, function (result_upd) {
                            if (typeof callback === 'function') {
                                callback(result_upd);
                            }
                        });
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Добавить первую строку вагона с проверкой
            add_wagon: function (num, callback) {
                LockScreen(langView('mess_delay', langs));

                var isNumeric = function (value) {
                    return /^\d+$/.test(value);
                };

                // Проверка на число
                if (!isNumeric(num)) {
                    pn_add_edit.val.out_error_message('Ошибка ввода номера вагона. Номер вагона состоит из 8 цифр');
                    if (typeof callback === 'function') {
                        callback(null);
                    }
                } else {
                    // Проверка на контрольную сумму
                    pn_add_edit.ids_dir.IsCorrectNumCar(num, function (result_correct) {
                        if (result_correct) {
                            pn_add_edit.ids_dir.getWagonOfNum(num, function (result_obj) {
                                if (result_obj) {
                                    // Вагон найден
                                    pn_add_edit.val.out_warning_message('Вагон уже существует в справочнике.');
                                    if (typeof callback === 'function') {
                                        callback(result_obj);
                                    }
                                } else {
                                    // Вагон не найден, добавить
                                    // Создадим первую запись или обновим строку вагона в справочнике вагонов и аренд
                                    var specification = {
                                        adm: 0, rod: 0, kol_os: 0, usl_tip: null
                                    }
                                    pn_add_edit.ids_dir.getWagonOfNumSpecification(num, specification, function (result_obj) {
                                        if (result_obj) {
                                            pn_add_edit.val.out_info_message('Первая строка по вагону добавлена в справочник.');
                                        }
                                        if (typeof callback === 'function') {
                                            callback(result_obj);
                                        }
                                    });
                                }
                            });
                        } else {
                            pn_add_edit.val.out_error_message('Ошибка ввода номера вагона. Такого номера не существует.');
                            if (typeof callback === 'function') {
                                callback(null);
                            }
                        }
                    });
                }
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var valid = pn_add_edit.validation();
                if (valid) {
                    LockScreen(langView('mess_save', langs));
                    var new_object = pn_add_edit.get_object();
                    pn_add_edit.save_wagon(new_object.wagon, function (result_wagon) {
                        if (result_wagon.result > 0) {
                            pn_add_edit.save_wagon_rent(new_object.old_wagon_rent, function (result_old_wagon_rent) {
                                if (result_old_wagon_rent.result >= 0) {
                                    pn_add_edit.save_new_wagon_rent(new_object.new_wagon_rent, function (result_new_wagon_rent) {
                                        if (result_new_wagon_rent >= 0) {
                                            if (typeof callback_ok === 'function') {
                                                pn_add_edit.obj.dialog("close");
                                                callback_ok({ num: new_object.wagon.num, type_vagon: result_wagon.type, type_vagon_rent: result_old_wagon_rent.type, result_vagon_rent: result_old_wagon_rent.result, result_new_wagon_rent: result_new_wagon_rent });
                                            }
                                        } else {
                                            pn_add_edit.val.clear_all();
                                            pn_add_edit.val.out_error_message("Ошибка. Не могу добавить новю аренду вагон №" + new_object.wagon.num + ", id аренды =" + new_object.new_wagon_rent.id);
                                            LockScreenOff();
                                        }
                                    });
                                } else {
                                    pn_add_edit.val.clear_all();
                                    pn_add_edit.val.out_error_message("Ошибка. Не могу обновить или добавить аренду вагон №" + new_object.wagon.num + ", id аренды =" + new_object.old_wagon_rent.id);
                                    LockScreenOff();
                                }
                            });
                        } else {
                            pn_add_edit.val.clear_all();
                            pn_add_edit.val.out_error_message("Ошибка. Не могу обновить или добавить вагон №" + new_object.wagon.num);
                            LockScreenOff();
                        }
                    })
                }
            },
            // Сохранить информацию о вагоне
            save_wagon: function (vagon, callback) {
                // Проверим, вагон найден?
                if (pn_add_edit.select_obj) {
                    // Оновим информацию
                    pn_add_edit.ids_dir.putWagon(vagon, function (result_upd) {
                        if (typeof callback === 'function') {
                            callback({
                                type: 1, result: result_upd
                            });
                        }
                    });
                } else {
                    // Добавим информацию
                    pn_add_edit.ids_dir.postWagon(vagon, function (result_add) {
                        if (typeof callback === 'function') {
                            callback({
                                type: 0, result: result_add
                            });
                        }
                    });
                }
            },
            // Сохранить аренду
            save_wagon_rent: function (old_wagon_rent, callback) {
                if (old_wagon_rent) {
                    if (old_wagon_rent.id === 0) {
                        // Добавить новую запись
                        pn_add_edit.ids_dir.postWagonsRent(old_wagon_rent, function (result_add) {
                            if (typeof callback === 'function') {
                                callback({
                                    type: 0, result: result_add
                                });
                            }
                        });
                    } else {
                        // Обновим запись
                        pn_add_edit.ids_dir.putWagonsRent(old_wagon_rent, function (result_upd) {
                            if (typeof callback === 'function') {
                                callback({
                                    type: 1, result: result_upd
                                });
                            }
                        });
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback({
                            type: null, result: 0
                        });
                    }
                }
            },
            // добавить новую аренду
            save_new_wagon_rent: function (new_wagon_rent, callback) {
                if (new_wagon_rent) {
                    // Добавить новую запись
                    pn_add_edit.ids_dir.postWagonsRent(new_wagon_rent, function (result_add_new) {
                        if (typeof callback === 'function') {
                            callback(result_add_new);
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Получить строку по вагону (если новый оператор тогда новая строка)
            get_object: function () {
                // Определим новый оператор назначен
                var bit_warning = false; // Опрелелим (определен род, определен адм выбран оператор)
                var id_countrys = get_select_number_value(pn_add_edit.add_edit_name_adm);
                var id_genus = get_select_number_value(pn_add_edit.add_edit_name_rod);
                var id_new_operator = get_select_number_value(pn_add_edit.add_edit_operator_car_new);
                var id_operator_car_amkr = get_select_number_value(pn_add_edit.add_edit_operator_car);

                // Если не определен род или адм.
                if (id_genus === 0 || id_countrys === 0 || (pn_add_edit.select_rent && pn_add_edit.select_rent.id_operator === null) || (pn_add_edit.select_rent && pn_add_edit.select_rent.rent_start === null)) {
                    bit_warning = true;
                }
                var new_wagon = {
                    "num": pn_add_edit.select_obj.num,
                    "id_countrys": get_select_number_value(pn_add_edit.add_edit_name_adm),
                    "id_genus": get_select_number_value(pn_add_edit.add_edit_name_rod),
                    "id_owner": pn_add_edit.select_obj.id_owner,
                    "id_operator": pn_add_edit.select_obj.id_operator,
                    "change_operator": pn_add_edit.select_obj.change_operator,
                    //"gruzp": pn_add_edit.select_obj.gruzp,
                    "gruzp": get_select_number_value(pn_add_edit.add_edit_gruzp),
                    //"tara": pn_add_edit.select_obj.tara,
                    "tara": get_select_number_value(pn_add_edit.add_edit_tara),
                    "kol_os": get_select_number_value(pn_add_edit.add_edit_kol_os),
                    "usl_tip": get_input_string_value(pn_add_edit.add_edit_usl_tip),
                    "date_rem_uz": pn_add_edit.select_obj.date_rem_uz,
                    "date_rem_vag": toISOStringTZ(get_date_value(pn_add_edit.add_edit_date_rem_vag.val(), pn_add_edit.lang)),
                    "id_type_ownership": get_select_number_value(pn_add_edit.add_edit_type_ownership),
                    "factory_number": get_input_string_value(pn_add_edit.add_edit_factory_number),
                    "inventory_number": get_input_string_value(pn_add_edit.add_edit_inventory_number),
                    "year_built": get_select_number_value(pn_add_edit.add_edit_year_built),
                    "exit_ban": pn_add_edit.add_edit_exit_ban.prop('checked'),
                    "sign": get_select_number_value(pn_add_edit.add_edit_sign),
                    "note": pn_add_edit.select_obj.note,
                    "sobstv_kis": pn_add_edit.select_obj.sobstv_kis,
                    "bit_warning": bit_warning,
                    "create": pn_add_edit.select_obj.create,
                    "create_user": pn_add_edit.select_obj.create_user,
                    "change": toISOStringTZ(new Date()),
                    "change_user": pn_add_edit.user_name,
                }
                var new_wagon_rent = null;
                var old_wagon_rent = pn_add_edit.ids_dir.getCloneWagonsRent(pn_add_edit.select_rent);
                // Определим сотояние строки аренда (Новая строка создается, если аренды нет или изменился оператор в строке аренда)
                if ((!pn_add_edit.select_rent) ||
                    ((id_new_operator && id_new_operator >= 0) && (pn_add_edit.select_rent && pn_add_edit.select_rent.id_operator && pn_add_edit.select_rent.id_operator > 0 && pn_add_edit.select_rent.id_operator !== id_new_operator))) {
                    // Закроем старую
                    old_wagon_rent.rent_end = toISOStringTZ(get_datetime_value(pn_add_edit.add_edit_operator_car_rent_start_now.val(), pn_add_edit.lang));
                    old_wagon_rent.change = toISOStringTZ(new Date());
                    old_wagon_rent.change_user = pn_add_edit.user_name;
                    // Создадим новую
                    new_wagon_rent = {
                        "id": 0,
                        "num": pn_add_edit.select_obj.num,
                        "id_operator": id_new_operator,
                        "id_limiting": get_select_number_value(pn_add_edit.add_edit_limiting),
                        "rent_start": toISOStringTZ(get_datetime_value(pn_add_edit.add_edit_operator_car_rent_start_now.val(), pn_add_edit.lang)),
                        "rent_end": null,
                        "create": toISOStringTZ(new Date()),
                        "create_user": pn_add_edit.user_name,
                        "change": null,
                        "change_user": null,
                        "parent_id": pn_add_edit.select_rent !== null ? pn_add_edit.select_rent.id : null,
                    }
                } else {
                    // Откорректируем старую
                    old_wagon_rent.id_operator = id_new_operator && id_new_operator >= 0 ? id_new_operator : old_wagon_rent.id_operator;
                    old_wagon_rent.id_limiting = get_select_number_value(pn_add_edit.add_edit_limiting);
                    var new_date_rent = get_datetime_value(pn_add_edit.add_edit_operator_car_rent_start_now.val(), pn_add_edit.lang);
                    if ((old_wagon_rent.rent_start === null && new_date_rent !== null) || (old_wagon_rent.rent_start !== null && new_date_rent !== null && old_wagon_rent.rent_start !== new_date_rent)) {
                        old_wagon_rent.rent_start = toISOStringTZ(new_date_rent);
                    }
                    old_wagon_rent.rent_end = null;
                    old_wagon_rent.change = toISOStringTZ(new Date());
                    old_wagon_rent.change_user = pn_add_edit.user_name;
                }
                return {
                    wagon: new_wagon, old_wagon_rent: old_wagon_rent, new_wagon_rent: new_wagon_rent
                };
            },
        },
        //*************************************************************************************
        // ОСНОВНАЯ ТАБЛИЦА СОСТАВОВ
        //*************************************************************************************
        table_directory = {
            html_table: $('table#table-directory'),
            obj: null,
            select_string: null,
            count_string: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: {
                        style: "multi"
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
                        //if (data.id_group === 0) {
                        //    $('td', row).eq(1).addClass('warning');
                        //}
                        //switch (data.status) {
                        //    case 1: $(row).addClass('status-in-work'); $('td', row).eq(0).addClass('icon-warning'); break;
                        //    case 2: $(row).addClass('status-accepted'); $('td', row).eq(0).addClass('icon-ok'); break;
                        //    case 3: $(row).addClass('status-rejected'); $('td', row).eq(0).addClass('icon-delete'); break;
                        //}
                        //if (data.id_arrived !== null && data.id_sostav !== null) {
                        //    $('td', row).eq(1).addClass('icon-right');
                        //} else { $('td', row).eq(1).addClass('icon-user'); }
                    },
                    columns: [
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: true, searchable: true },
                        {
                            data: "countrys", title: langView('field_countrys', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "genus", title: langView('field_genus', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "owner", title: langView('field_owner', langs), width: "150px", orderable: false, searchable: false
                        },
                        {
                            data: "operator_uz", title: langView('field_operator_uz', langs), width: "150px", orderable: true, searchable: false
                        },
                        {
                            data: "change_operator", title: langView('field_change_operator', langs), width: "50px", orderable: true, searchable: false
                        },
                        {
                            data: "operator", title: langView('field_operator', langs), width: "150px", orderable: true, searchable: false
                        },
                        {
                            data: "rent_start", title: langView('field_rent_start', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "rent_end", title: langView('field_rent_end', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "limiting", title: langView('field_limiting', langs), width: "150px", orderable: false, searchable: false
                        },
                        {
                            data: "sign", title: langView('field_sign', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "gruzp", title: langView('field_gruzp', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "tara", title: langView('field_tara', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "kol_os", title: langView('field_kol_os', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "usl_tip", title: langView('field_usl_tip', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "date_rem_uz", title: langView('field_date_rem_uz', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "date_rem_vag", title: langView('field_date_rem_vag', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "type_ownership", title: langView('field_type_ownership', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "factory_number", title: langView('field_factory_number', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "inventory_number", title: langView('field_inventory_number', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "year_built", title: langView('field_year_built', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "exit_ban", title: langView('field_exit_ban', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "note", title: langView('field_note', langs), width: "300px", orderable: false, searchable: false
                        },
                        //{ data: "sobstv_kis", title: langView('field_sobstv_kis', langs), width: "50px", orderable: false, searchable: false },
                        {
                            data: "create", title: langView('field_create', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "create_user", title: langView('field_create_user', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "change", title: langView('field_change', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "change_user", title: langView('field_change_user', langs), width: "100px", orderable: false, searchable: false
                        },
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
                            sheetName: 'Карточки вагонов',
                            messageTop: function () {
                                return '';
                            }
                        },
                        {
                            extend: 'colvis',
                            text: langView('title_button_field', langs),
                            collectionLayout: 'fixed two-column',
                            //postfixButtons: ['colvisRestore']
                        },
                        {
                            extend: 'colvisGroup',
                            text: langView('title_button_field_all', langs),
                            show: ':hidden'
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
                            text: langView('title_button_add', langs),
                            action: function (e, dt, node, config) {
                                pn_add_edit.Open(null);
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                if (table_directory.select_string) {
                                    pn_add_edit.Open(table_directory.select_string.num);
                                }
                            },
                            enabled: false
                        },
                        //{
                        //    text: langView('title_button_del', langs),
                        //    action: function (e, dt, node, config) {

                        //        dc.dialog_confirm('Open', 'Удалить?', 'Вы уверены что хотите удалить строку : ' + table_directory.select_string.cargo_name_ru, function (result) {
                        //            if (result) {
                        //                ids_dir.deleteCargo(table_directory.select_string.id, function (result_del) {
                        //                    alert.clear_message();
                        //                    if (result_del > 0) {
                        //                        alert.out_info_message('Строка справочника - удалена!');
                        //                    } else {
                        //                        alert.out_error_message('Ошибка удаления строки справочника!');
                        //                    }
                        //                    //
                        //                    ids_dir.loadCargo(function () {
                        //                        table_directory.view(ids_dir.list_cargo);

                        //                    });
                        //                });
                        //            }
                        //        });
                        //    },
                        //    enabled: false
                        //},
                        {
                            text: langView('title_button_edit_operator', langs),
                            action: function (e, dt, node, config) {
                                var items = table_directory.obj.rows({ selected: true });
                                var row_cargo = table_directory.obj.rows(items[0]).data();
                                pn_change_group_operator.Open(row_cargo);
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_edit_limit', langs),
                            action: function (e, dt, node, config) {
                                var items = table_directory.obj.rows({ selected: true });
                                var row_cargo = table_directory.obj.rows(items[0]).data();
                                pn_change_group_limit.Open(row_cargo);
                            },
                            enabled: false
                        },
                        {
                            extend: 'pageLength',
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    table_directory.view_button(indexes);

                }).on('deselect', function (e, dt, type, indexes) {
                    table_directory.view_button(indexes);
                });
            },
            // Отобразить кнопки редактирования таблицы
            view_button: function (indexes) {
                var items = table_directory.obj.rows({ selected: true });
                table_directory.count_string = items ? items.count() : 0;
                table_directory.select_string = items && items.count() === 1 ? table_directory.obj.rows(items[0]).data()[0] : null;
                if (table_directory.count_string > 0) {
                    table_directory.obj.button(8).enable(true);
                    table_directory.obj.button(9).enable(true);
                    if (table_directory.count_string === 1) {
                        table_directory.obj.button(7).enable(true);
                        //table_directory.obj.button(8).enable(true);
                    } else {

                        table_directory.obj.button(7).enable(false);
                        //table_directory.obj.button(8).enable(false);
                    }
                } else {
                    table_directory.deselect();
                }
            },
            // Показать вагоны требующие внимания
            view_cars_warning: function () {
                alert.clear_message();
                ids_dir.getWarningWagons(function (wagons) {
                    table_directory.view(wagons);
                });
            },
            // Показать вагоны по списку номеров
            view_cars_search_num: function (car_valid, callback) {
                ids_dir.getWagonOfNums(car_valid, function (wagon) {
                    var not_car = car_valid.filter(function (i) {
                        var not = true;
                        for (var ci = 0; ci < wagon.length; ci++) {
                            if (i === wagon[ci].num) not = false;
                        }
                        return not;
                    });
                    table_directory.view(wagon);
                    $.each(not_car, function (i, el) {
                        alert.out_warning_message('Вагон № :' + el + ' - не найден!');
                    });
                    // Функция обратного вызова
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            },
            // Показать вагоны по оператору
            view_cars_search_operator: function () {
                var id = Number(pn_search.wagon_operator.val());
                ids_dir.getWagonOfOperator(id, function (cars) {
                    table_directory.view(cars);
                });
            },
            // Показать таблицу с данными
            view: function (data) {
                var id_select = table_directory.select_string ? table_directory.select_string.id : 0;
                table_directory.obj.clear();
                // Сбросить выделенный состав
                table_directory.deselect();
                $.each(data, function (i, el) {
                    table_directory.obj.row.add(table_directory.get_string(el));
                });
                if (table_directory.count_string === 1) {
                    table_directory.obj.row('#' + id_select).select();
                }
                table_directory.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_string: function (data) {

                var corrent_rent = ids_dir.getCurrentRentOfWagon(data);
                var countrys = data ? data.Directory_Countrys : null;
                var genus = data ? data.Directory_GenusWagons : null;
                var owner = data ? data.Directory_OwnersWagons : null;
                var operator_uz = data ? data.Directory_OperatorsWagons : null;
                var type_ownership = data ? data.Directory_TypeOwnerShip : null;
                var operator = corrent_rent ? corrent_rent.Directory_OperatorsWagons : null;
                var limiting = corrent_rent ? corrent_rent.Directory_LimitingLoading : null;

                return {
                    "id": data.id,
                    "num": data.num,
                    "id_countrys": data.id_countrys,
                    "countrys": countrys ? ids_dir.getValueObj(countrys, 'country_abbr', lang) : '',
                    "id_genus": data.id_genus,
                    "genus": genus ? ids_dir.getValueObj(genus, 'abbr', lang) : '',
                    "id_owner": data.id_owner,
                    "owner": owner ? ids_dir.getValueObj(owner, 'owner', lang) : '',
                    "id_operator_uz": data.id_operator_uz,
                    "change_operator": data.change_operator !== null ? data.change_operator.replace(/T/g, ' ') : null,
                    "operator_uz": operator_uz ? ids_dir.getValueObj(operator_uz, 'operators', lang) : '',
                    "bit_warning": data.bit_warning,
                    "id_operator": corrent_rent ? corrent_rent.id_operator : null,
                    "operator": operator ? ids_dir.getValueObj(operator, 'operators', lang) : '',
                    "gruzp": data.gruzp,
                    "tara": data.tara,
                    "kol_os": data.kol_os,
                    "usl_tip": data.usl_tip,
                    "date_rem_uz": data.date_rem_uz !== null ? data.date_rem_uz.replace(/T/g, ' ') : null,
                    "date_rem_vag": data.date_rem_vag !== null ? data.date_rem_vag.replace(/T/g, ' ') : null,
                    "id_limiting": corrent_rent ? corrent_rent.id_limiting : null,
                    "limiting": limiting ? ids_dir.getValueObj(limiting, 'limiting_abbr', lang) : '',
                    "id_type_ownership": data.id_type_ownership,
                    "type_ownership": type_ownership ? ids_dir.getValueObj(type_ownership, 'type_ownership', lang) : '',
                    "rent_start": corrent_rent && corrent_rent.rent_start !== null ? corrent_rent.rent_start.replace(/T/g, ' ') : null,
                    "rent_end": corrent_rent && corrent_rent.rent_end !== null ? corrent_rent.rent_end.replace(/T/g, ' ') : null,
                    "sign": data.sign,
                    "factory_number": data.factory_number,
                    "inventory_number": data.inventory_number,
                    "year_built": data.year_built,
                    "exit_ban": data.exit_ban,
                    "note": data.note,
                    "sobstv_kis": data.sobstv_kis,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                };
            },
            // Обновить данные в таблице
            update_string: function (data) {
                if (data) {
                    //var row = table_directory.get_sostav(data);
                    //var index = table_directory.obj.row('#' + data.id).index();

                    //table_directory.obj.cell(index, 1).data(row.train);
                    //table_directory.obj.cell(index, 2).data(row.composition_index);
                    //table_directory.obj.cell(index, 3).data(row.date_arrival);
                    //table_directory.obj.cell(index, 4).data(row.date_adoption);
                    //table_directory.obj.cell(index, 5).data(row.date_adoption_act);
                    //table_directory.obj.cell(index, 6).data(row.station_from);
                    //table_directory.obj.cell(index, 7).data(row.station_on);
                    //table_directory.obj.cell(index, 8).data(row.id_way);
                    //table_directory.obj.cell(index, 9).data(row.num_doc);
                    //table_directory.obj.cell(index, 10).data(row.count_all);
                    //table_directory.obj.cell(index, 11).data(row.create_sostav);
                    //table_directory.obj.cell(index, 12).data(row.change_sostav);
                    //table_directory.obj.draw();
                }
            },
            // Deselect
            deselect: function () {
                table_directory.select_string = null;
                //table_directory.obj.button(6).enable(false);
                table_directory.obj.button(7).enable(false);
                table_directory.obj.button(8).enable(false);
                table_directory.obj.button(9).enable(false);
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        //if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
        pn_search.init();
        // Инициализация окна править группу ограничений
        pn_change_group_limit.init(lang, user_name, function (result_change_group) {
            if (result_change_group > 0) {
                // Показать после изменения
                pn_search.view_cars();
                alert.out_info_message('Обновлены огранечения по группе вагонов в количестве - ' + result_change_group + ' записей');
            }
        });
        // Инициализация окна править группу операторов
        pn_change_group_operator.init(lang, user_name, function (result_change_group) {
            if (result_change_group) {
                // Показать после изменения
                pn_search.view_cars();
                alert.out_info_message('Обновлены операторы по группе вагонов в количестве - ' + result_change_group.update + ' записей, операторы были изменены по ' + result_change_group.add + ' вагонам.');
            }
        });
        // Инициализация окна добавить править груз
        pn_add_edit.init(lang, user_name, function (result_add_edit) {
            if (result_add_edit) {
                // Загрузить новый справочник
                //alert.clear_message();
                // Показать после изменения
                pn_search.view_cars();
                var num = result_add_edit.num;
                if (result_add_edit.type_vagon === 1) {
                    alert.out_info_message('Строка справочника вагона №' + num + ' - обновлена!');
                }
                if (result_add_edit.type_vagon === 0) {
                    alert.out_info_message('Строка справочника вагона №' + num + ' - добавлена!');
                }
                if (result_add_edit.type_vagon_rent === 1 && result_add_edit.result_new_wagon_rent > 0) {
                    alert.out_info_message('Строка аренды вагона №' + num + ' - закрыта! ID строки = ' + result_add_edit.result_vagon_rent);
                }
                if (result_add_edit.type_vagon_rent === 1 && result_add_edit.result_new_wagon_rent === 0) {
                    alert.out_info_message('Строка аренды вагона №' + num + ' - обновлена! ID строки = ' + result_add_edit.result_vagon_rent);
                }
                if (result_add_edit.type_vagon_rent === 0) {
                    alert.out_info_message('Строка аренды вагона №' + num + ' - добавлена! ID строки = ' + result_add_edit.result_vagon_rent);
                }
                if (result_add_edit.result_new_wagon_rent > 0) {
                    alert.out_info_message('Добавлена новая строка аренды вагона №' + num + ', ID строки = ' + result_add_edit.result_new_wagon_rent);
                }
            }
        });
        table_directory.init();
        LockScreenOff();
    });
});