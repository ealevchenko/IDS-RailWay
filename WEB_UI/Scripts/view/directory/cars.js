jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_pos': '№ п.п',
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
            'field_closed_route': 'Замкнутый маршрут',
            'field_new_construction': 'Нова побудова',
            'field_sobstv_kis': 'Оператор (КИС)',
            'field_create': 'Строка создана',
            'field_create_user': 'Создал строку',
            'field_change': 'Строку правили',
            'field_change_user': 'Правил',

            //'title_button_buffer': 'Буфер',
            //'title_button_excel': 'Excel',
            //'title_button_field': 'Поля',
            //'title_button_field_all': 'Все поля',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_field': 'Поля',
            'title_button_field_select': 'Выбрать',
            'title_button_field_view_all': 'Показать все',
            'title_button_field_clear': 'Сбросить',


            'title_button_select_all': 'Выбрать все',
            'title_button_select_none': 'Убрать все',

            'title_button_add': 'Добавить',
            'title_button_edit': 'Править',
            'title_button_del': 'Удалить',
            'title_button_edit_group': 'Править оператора или ограничение',
            //'title_button_edit_limit': 'Изменить ограничение',
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
            cars_search_valodation_num: $('input#cars_search_valodation_num'),
            cars_comparison_valodation_num: $('input#cars_comparison_valodation_num'),
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
            //wagon_operator: $('select#wagon_operator'),
            select_wagon_operator: $('input#select_wagon_operator'),
            //wagon_operator_comparison: $('select#wagon_operator_comparison'),
            wagon_operator_comparison: $('input#wagon_operator_comparison'),

            text_type_searsh: $('#type-search').text(''),
            active: 0,
            num_cars_valid: [],
            num_cars_comparison_valid: [],
            id_operator: null,
            id_operator_comparison: null,
            // Инициализация
            init: function () {
                // обработка события show.bs.tab переключение панелей выбора
                $('#global-tab > ul > li > [data-toggle="tab"]').on('show.bs.tab', function (e) {
                    var activeTab = $(e.target);    // активная вкладка
                    alert.clear_message();          // Сбросить сообщения
                    // Сбросим таблицу
                    table_directory.view([], function () {
                        LockScreenOff();
                    });
                    switch (e.target.hash) {
                        case '#cars-warning': pn_search.active = 0; break;
                        case '#cars-search-num': pn_search.active = 1; pn_search.cars_search_valodation_num.prop("checked", true); break;
                        case '#cars-search-operator': pn_search.active = 2; break;
                        case '#cars-search-comparison': pn_search.active = 3; pn_search.cars_comparison_valodation_num.prop("checked", true); break;
                    };
                    // отобразим тип поиска
                    pn_search.text_type_searsh.text(activeTab.text());

                });

                // Инициализация элементов
                //pn_search.wagon_operator = cd_initSelect(
                //    pn_search.wagon_operator,
                //    { lang: lang },
                //    ids_dir.getListOperatorsWagons('id', 'operators', lang, null),
                //    null,
                //    -1,
                //    function (event) {
                //        event.preventDefault();
                //        // Найти вагон по оператору
                //        LockScreen(langView('mess_delay', langs));
                //        pn_search.view_cars();
                //    }, null);
                // настроим компонент операторов
                pn_search.select_wagon_operator = initAutocomplete(
                    pn_search.select_wagon_operator,
                    { lang: pn_search.lang, minLength: 2 },
                    getAutocompleteListText(ids_dir.getListOperatorsWagons('id', 'operators', lang, null), 'text'),
                    pn_search.view_bt_search_operation,
                    "");

                // 
                //pn_search.wagon_operator_comparison = cd_initSelect(
                //    pn_search.wagon_operator_comparison,
                //    { lang: lang },
                //    ids_dir.getListOperatorsWagons('id', 'operators', lang, null),
                //    null,
                //    -1,
                //    function (event) {
                //        event.preventDefault();
                //    }, null);
                //
                pn_search.wagon_operator_comparison = initAutocomplete(
                    pn_search.wagon_operator_comparison,
                    { lang: pn_search.lang, minLength: 2 },
                    getAutocompleteListText(ids_dir.getListOperatorsWagons('id', 'operators', lang, null), 'text'),
                    pn_search.view_bt_comparison_operation,
                    "");

                // Кнопка найти вагон требующий изменения
                pn_search.bt_cars_warning.on('click', function (event) {
                    event.preventDefault();
                    pn_search.text_type_searsh.text('Требующие правки'),
                        LockScreen(langView('mess_delay', langs));
                    pn_search.view_cars();
                    //table_directory.view_cars_warning();
                });
                // Кнопка найти вагоны по номерам
                pn_search.bt_cars_search_num.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    alert.clear_message();
                    if (pn_search.num_car.val() !== "") {

                        var num_valid = pn_search.cars_search_valodation_num.prop("checked");
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

                            if (!isNumeric($.trim(el))) {
                                alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                                valid = false;
                            } else {
                                if (Number($.trim(el)) <= 0) {
                                    alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' номер не может быть меньше или равен 0 :' + el);
                                    valid = false;
                                } else {
                                    // Разрешена проверка системной нумерации
                                    if (num_valid) {
                                        var num_val = is_valid_num_wagon(Number($.trim(el)));
                                        // Если валидный добавим в список
                                        if (num_val) {
                                            car_valid.push(Number($.trim(el)));
                                        } else {
                                            alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' не системная нумерация (ошибка контрольной суммы) :' + el);
                                        }
                                        valid = valid & num_val;
                                    } else {
                                        // добавим в список
                                        car_valid.push(Number($.trim(el)));
                                    }
                                }
                            }
                            //is_valid_num_wagon(num)
                            //if (!isNumeric($.trim(el)) || !(Number($.trim(el)) >= 10000000 && Number(el) <= 99999999)) {
                            //    // Ошибка ввода
                            //    alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                            //    valid = false;
                            //} else {
                            //    car_valid.push(Number(el));
                            //}
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
                pn_search.bt_cars_search_operator.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    alert.clear_message();
                    if (pn_search.id_operation !== null) {
                        pn_search.view_cars();
                    }
                });
                // Кнопка сравнить вагон по номеру и оператору
                pn_search.bt_cars_comparison_num.on('click', function (event) {
                    event.preventDefault();
                    alert.clear_message();
                    table_directory.nums_comparison = [];
                    table_directory.view_cars_comparison(function () {
                        LockScreen(langView('mess_operation', langs));
                        //LockScreen(langView('mess_delay', langs));
                        pn_search.num_cars_comparison_not.text();
                        pn_search.num_cars_comparison_yes.text();
                        pn_search.num_cars_comparison_no.text();
                        pn_search.num_cars_comparison_change.text();

                        // Проверим оператора
                        var id_operator = pn_search.id_operator_comparison; //get_select_number_value(pn_search.wagon_operator_comparison);
                        if (id_operator === null) {
                            alert.out_warning_message('Выберите оператора.');
                            //pn_search.bt_cars_comparison_num.prop("disabled", false);
                            LockScreenOff();
                        }
                        if (pn_search.num_cars_comparison.val() !== "") {
                            pn_search.bt_cars_comparison_num.prop("disabled", true);
                            var num_valid = pn_search.cars_comparison_valodation_num.prop("checked");

                            var isNumeric = function (value) {
                                return /^\d+$/.test(value);
                            };
                            // Провкерка на правильный ввод номеров
                            var valid = true;
                            var car_valid = [];
                            var cars = pn_search.num_cars_comparison.val().split(';');
                            // 
                            $.each(cars, function (i, el) {

                                if (!isNumeric($.trim(el))) {
                                    alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                                    valid = false;
                                } else {
                                    if (Number($.trim(el)) <= 0) {
                                        alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' номер не может быть меньше или равен 0 :' + el);
                                        valid = false;
                                    } else {
                                        // Разрешена проверка системной нумерации
                                        if (num_valid) {
                                            var num_val = is_valid_num_wagon(Number($.trim(el)));
                                            // Если валидный добавим в список
                                            if (num_val) {
                                                car_valid.push(Number($.trim(el)));
                                            } else {
                                                alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' не системная нумерация (ошибка контрольной суммы) :' + el);
                                            }
                                            valid = valid & num_val;
                                        } else {
                                            // добавим в список
                                            car_valid.push(Number($.trim(el)));
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
                                //
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
                                                if (current_rent && current_rent.id_operator === id_operator) {
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

                });
                // Показать вагоны соответсвующие оператору
                pn_search.bt_cars_comparison_num_yes.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    table_directory.nums_comparison = pn_search.num_cars_comparison_yes.text().split(';');
                    table_directory.view_cars_comparison(function () {
                        LockScreenOff();
                    });
                });
                // Показать вагоны требующиеизмения
                pn_search.bt_cars_comparison_num_no.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    table_directory.nums_comparison = pn_search.num_cars_comparison_no.text().split(';');
                    table_directory.view_cars_comparison(function () {
                        LockScreenOff();
                    });
                });
                // Показать вагоны не пренадлежащие оператору
                pn_search.bt_cars_comparison_num_change.on('click', function (event) {
                    event.preventDefault();
                    LockScreen(langView('mess_delay', langs));
                    table_directory.nums_comparison = pn_search.num_cars_comparison_change.text().split(';');
                    table_directory.view_cars_comparison(function () {
                        LockScreenOff();
                    });
                });
            },
            // Показать в зависимости от ыбранного режима поиска
            view_cars: function () {
                switch (pn_search.active) {
                    case 0: table_directory.view_cars_warning(); break;
                    case 1: table_directory.view_cars_search_num(pn_search.num_cars_valid, function () {
                        pn_search.bt_cars_search_num.prop("disabled", false);
                        LockScreenOff();
                    }); break;
                    case 2: table_directory.view_cars_search_operator(); break;
                    case 3: table_directory.view_cars_comparison(function () {
                        LockScreenOff();
                    }); break;
                }
            },
            // Поиск по оператору
            view_bt_search_operation: function (name_operator) {
                pn_search.id_operator = null; // Сбросим оператора
                pn_search.bt_cars_search_operator.prop('disabled', true);
                if (name_operator) {
                    var obj = ids_dir.list_operators_wagons.find(function (o) { return o['operators_' + lang] === name_operator; });
                    if (obj) {
                        pn_search.id_operator = obj.id; // Определим оператора

                        pn_search.select_wagon_operator.removeClass('is-invalid').addClass('is-valid');
                        pn_search.select_wagon_operator.next(".invalid-feedback").text("");
                        pn_search.bt_cars_search_operator.prop('disabled', false);
                    } else {
                        pn_search.select_wagon_operator.removeClass('is-valid').addClass('is-invalid');
                        pn_search.select_wagon_operator.next(".invalid-feedback").text("Указаного оператора нет в справочнике ИДС");
                    }
                } else {
                    pn_search.select_wagon_operator.removeClass('is-valid').addClass('is-invalid');
                    pn_search.select_wagon_operator.next(".invalid-feedback").text("Не указан оператор");
                }
            },
            // Поиск по оператору
            view_bt_comparison_operation: function (name_operator) {
                pn_search.id_operator_comparison = null; // Сбросим оператора
                pn_search.bt_cars_comparison_num.prop('disabled', true);
                if (name_operator) {
                    var obj = ids_dir.list_operators_wagons.find(function (o) { return o['operators_' + lang] === name_operator; });
                    if (obj) {
                        pn_search.id_operator_comparison = obj.id; // Определим оператора

                        pn_search.wagon_operator_comparison.removeClass('is-invalid').addClass('is-valid');
                        pn_search.wagon_operator_comparison.next(".invalid-feedback").text("");
                        pn_search.bt_cars_comparison_num.prop('disabled', false);
                    } else {
                        pn_search.wagon_operator_comparison.removeClass('is-valid').addClass('is-invalid');
                        pn_search.wagon_operator_comparison.next(".invalid-feedback").text("Указаного оператора нет в справочнике ИДС");
                    }
                } else {
                    pn_search.wagon_operator_comparison.removeClass('is-valid').addClass('is-invalid');
                    pn_search.wagon_operator_comparison.next(".invalid-feedback").text("Не указан оператор");
                }
            },



        },
        //*************************************************************************************
        // ОКНО ИЗМЕНИТЬ ОПЕРАТОРА ИЛИ ОГРАНИЧЕНИЯ ПО ГРУППЕ
        //*************************************************************************************
        pn_change_group = {
            obj: null,
            lang: null,
            user_name: null,
            ids_dir: null,
            alert: $('div#change_group_alert'),                                       // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_group: null,
            id_operation: null,
            //rows: null,
            list_nums: null,
            // Поля формы
            enable_change_operator: $('input#enable_change_operator'),
            enable_change_limiting: $('input#enable_change_limiting'),
            change_group_operator: $('input#change_group_operator'),
            change_group_rent_start: $('input#change_group_rent_start'),
            change_group_limiting: $('select#change_group_limiting'),
            // загрузка библиотек
            loadReference: function (callback) {
                var count = 1;
                pn_change_group.ids_dir.load(['operators_wagons', 'limiting_loading'], false, function () {
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
                pn_change_group.lang = lang;
                pn_change_group.user_name = user_name;
                pn_change_group.ids_dir = new IDS_DIRECTORY(pn_change_group.lang); // Создадим класс IDS_DIRECTORY
                // Загрузим библиотеки
                pn_change_group.loadReference(function () {
                    // Выбор правки операторов
                    pn_change_group.enable_change_operator.on('click',
                        function (event) {
                            //event.preventDefault();
                            pn_change_group.set_enable_change_operator(pn_change_group.enable_change_operator.prop('checked'));
                        });
                    // Выбор правки лимит
                    pn_change_group.enable_change_limiting.on('click',
                        function (event) {
                            //event.preventDefault();
                            pn_change_group.set_enable_change_limiting(pn_change_group.enable_change_limiting.prop('checked'));
                        });
                    // настроим компонент операторов
                    pn_change_group.change_group_operator = initAutocomplete(
                        pn_change_group.change_group_operator,
                        { lang: pn_change_group.lang, minLength: 2 },
                        getAutocompleteListText(pn_change_group.ids_dir.getListOperatorsWagons('id', 'operators', pn_change_group.lang, null), 'text'),
                        pn_change_group.view_operator,
                        "").focus(function () {
                            //!!!Корректируем отображение мендального окна (иначе компонент Autocomplete уходит на задний план после появления окна выбора даты)
                            $('DIV.change_group_form').css('z-index', 101);
                            $('DIV.ui-widget-overlay').css('z-index', 100);
                        });
                    // Дата начала аренды новая
                    pn_change_group.change_group_rent_start = cd_initDateTimeRangePicker(pn_change_group.change_group_rent_start, { lang: pn_change_group.lang, time: true }, function (datetime) {

                    });
                    pn_change_group.list_limiting = pn_change_group.ids_dir.getListLimitingLoading('id', 'limiting_name', pn_change_group.lang, null);
                    // Инициализация элементов
                    pn_change_group.change_group_limiting = cd_initSelect(
                        pn_change_group.change_group_limiting,
                        { lang: pn_change_group.lang },
                        pn_change_group.list_limiting,
                        null,
                        -1,
                        function (event) {
                            //event.preventDefault();
                            var id = Number($(this).val());
                        }, null);
                    // Соберем все элементы в массив
                    pn_change_group.all_obj = $([])
                        .add(pn_change_group.change_group_operator)
                        .add(pn_change_group.change_group_rent_start.obj)
                        .add(pn_change_group.change_group_limiting);
                    // создадим классы 

                    //pn_change_group.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                    pn_change_group.val = new VALIDATION(pn_change_group.lang, pn_change_group.alert, pn_change_group.all_obj); // Создадим класс VALIDATION
                    //pn_change_group.table_car.init();
                    pn_change_group.obj = $("div#change_group").dialog({
                        resizable: false,
                        title: 'Изменить оператора или лимит загрузки по группе вагонов',
                        modal: true,
                        autoOpen: false,
                        height: "auto",
                        width: 600,
                        classes: {
                            "ui-dialog": "card change_group_form",
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
                                    pn_change_group.save(callback_ok);
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
                    pn_change_group.obj.find("form").on("submit", function (event) {
                        event.preventDefault();
                    });
                });

            },
            // Показать станцию отправления (ручной режим)
            view_operator: function (text) {
                pn_change_group.validation_operator(text);
            },
            // открыть окно
            Open: function (list_nums) {
                // Сохраним и проверим список для изменения
                pn_change_group.list_nums = list_nums;
                pn_search.bt_cars_search_operator.prop('disabled', true);
                if (list_nums && list_nums.length > 0) {
                    pn_change_group.val.clear_all();
                    // Сросить все элементы
                    //pn_change_group.change_group_operator.val("");                 // Сбросить
                    //pn_change_group.change_group_rent_start.setDateTime(null);     // Сбросить
                    //pn_change_group.change_group_limiting.val(-1)            // сбросить выбор
                    pn_change_group.enable_change_operator.prop('checked', false);
                    pn_change_group.enable_change_limiting.prop('checked', false);
                    pn_change_group.set_enable_change_operator(pn_change_group.enable_change_operator.prop('checked'));
                    pn_change_group.set_enable_change_limiting(pn_change_group.enable_change_limiting.prop('checked'));
                    pn_change_group.obj.dialog("open");
                }
            },
            // Активировать или деактивировать 
            set_enable_change_operator: function (enabled) {
                pn_change_group.change_group_operator.prop("disabled", !enabled);
                pn_change_group.change_group_rent_start.obj.prop("disabled", !enabled);
                if (!enabled) {
                    pn_change_group.change_group_operator.val("");                 // Сбросить
                    pn_change_group.change_group_rent_start.setDateTime(null);     // Сбросить
                    // Сбросим ошибки
                    pn_change_group.val.clear_error(pn_change_group.change_group_operator);
                    pn_change_group.val.clear_error(pn_change_group.change_group_rent_start.obj);
                }
            },
            // Активировать или деактивировать 
            set_enable_change_limiting: function (enabled) {
                pn_change_group.change_group_limiting.prop("disabled", !enabled);
                if (!enabled) {
                    pn_change_group.change_group_limiting.val(-1);      // Сбросить
                    // Сбросим ошибки
                    pn_change_group.val.clear_error(pn_change_group.change_group_limiting);
                }
            },
            // Валидация оператора
            validation_operator: function (name_operator) {
                var valid = false;
                pn_change_group.id_operation = null; // Сбросим оператора
                if (name_operator) {
                    var obj = pn_change_group.ids_dir.list_operators_wagons.find(function (o) { return o['operators_' + pn_change_group.lang] === name_operator; });
                    if (obj) {
                        pn_change_group.id_operation = obj.id; // Определим оператора
                        pn_change_group.val.set_control_ok(pn_change_group.change_group_operator, "");
                        valid = true;
                    } else {
                        pn_change_group.val.set_control_error(pn_change_group.change_group_operator, "Указаного оператора нет в справочнике ИДС");
                    }
                } else {
                    pn_change_group.val.set_control_error(pn_change_group.change_group_operator, "Не указан оператор");
                }
                return valid
            },
            // Валидация данных
            validation: function () {
                pn_change_group.val.clear_all();
                var valid = true;
                var e_operator = pn_change_group.enable_change_operator.prop('checked');
                var e_limiting = pn_change_group.enable_change_limiting.prop('checked');
                // Проверим активные панели
                if (e_operator || e_limiting) {
                    if (e_operator) {
                        valid = valid & pn_change_group.validation_operator(pn_change_group.change_group_operator.val());
                        valid = valid & pn_change_group.val.checkInputOfNull(pn_change_group.change_group_rent_start.obj, "Укажите время начало аренды");
                        valid = valid & pn_change_group.val.checkInputOfDateTime(pn_change_group.change_group_rent_start.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm:ss');
                    }
                    //if (e_limiting) {
                    //    valid = valid & pn_change_group.val.checkSelection(pn_change_group.change_group_limiting, "Выберите ограничение");
                    //}
                } else {
                    pn_change_group.val.out_warning_message("Ни одно из свойств не выбрано для правки.")
                    valid = false;
                }
                return valid;
            },
            // Сохранить
            save: function (callback_ok) {
                var valid = pn_change_group.validation();
                if (valid) {
                    LockScreen(langView('mess_save', langs));
                    var enb_operator = pn_change_group.enable_change_operator.prop('checked');
                    var enb_limiting = pn_change_group.enable_change_limiting.prop('checked');

                    // Подготовим данные для операции обновления
                    var operation_update_wagons = {
                        list_nums: pn_change_group.list_nums,
                        edit_operator: enb_operator,
                        id_operator: (enb_operator ? pn_change_group.id_operation : null),
                        start_rent: (enb_operator ? toISOStringTZ(get_datetime_value(pn_change_group.change_group_rent_start.val(), pn_change_group.lang)) : null),
                        edit_limiting: enb_limiting,
                        id_limiting: (enb_limiting ? get_select_number_value(pn_change_group.change_group_limiting) : null),
                        user: pn_change_group.user_name,
                    }
                    // Обновим
                    pn_change_group.ids_dir.postOperationUpdateWagons(operation_update_wagons, function (result_operation) {
                        if (result_operation && result_operation.result > 0) {
                            if (typeof callback_ok === 'function') {
                                pn_change_group.obj.dialog("close");
                                callback_ok({ type: 0, result: result_operation });
                            }
                        } else {
                            pn_change_group.val.clear_all();
                            pn_change_group.val.out_error_message("При обновлении информации по группе вагонов произошла ошибка. Код ошибки = " + (result_operation ? result_operation.result : null));
                            if (result_operation && result_operation.listResultWagon && result_operation.listResultWagon.length > 0) {
                                $.each(result_operation.listResultWagon, function (i, el) {
                                    if (el.result < 0) {
                                        pn_change_group.val.out_error_message("№ вагона :" + el.num + ". Код ошибки -" + el.result);
                                    }
                                });
                            }
                            LockScreenOff();
                        }
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
            select_rent: null,                                                          // строка
            active_tab: null,
            table_rent: {
                html_table: $('table#list-rent'),
                obj: null,
                num: null,
                rents: null,
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": true,
                        "keys": true,
                        "select": false,
                        "autoWidth": false,
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$('td:eq(0)', row).text(index+1);
                        },
                        columns: [
                            {
                                data: function (row, type, val, meta) {
                                    return meta.row + 1;
                                },
                                title: langView('field_pos', langs),
                                width: "20px",
                                orderable: true,
                                searchable: false
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return row.Directory_OperatorsWagons ? row.Directory_OperatorsWagons['operators_' + pn_add_edit.lang] : '';
                                },
                                title: langView('field_operator', langs),
                                width: "200px",
                                orderable: true,
                                searchable: false
                            },
                            {
                                data: function (row, type, val, meta) { return getReplaceTOfDT(row.rent_start); },
                                title: langView('field_rent_start', langs),
                                width: "150px",
                                orderable: true,
                                searchable: false
                            },
                            {
                                data: function (row, type, val, meta) { return getReplaceTOfDT(row.rent_end); },
                                title: langView('field_rent_end', langs),
                                width: "150px",
                                orderable: true,
                                searchable: false
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return row.Directory_LimitingLoading ? row.Directory_LimitingLoading['limiting_name_' + pn_add_edit.lang] : '';
                                },
                                title: langView('field_limiting', langs),
                                width: "150px",
                                orderable: true,
                                searchable: false
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return row.create ? row.create_user + '</br> (' + getReplaceTOfDT(row.create) + ')' : null;
                                },
                                title: langView('field_create', langs), width: "150px", orderable: false, searchable: false
                            },
                            {
                                data: function (row, type, val, meta) {

                                    return row.change ? row.change_user + '</br>(' + getReplaceTOfDT(row.change) + ')' : null;
                                }
                                , title: langView('field_change', langs), width: "150px", orderable: false, searchable: false
                            }
                        ],
                        //dom: 'Bfrtip',
                    });
                },
                // Загрузить информацию
                load: function (num, callback) {
                    // Сбросим рабочий массив
                    LockScreen(langView('mess_delay', langs));
                    if (num) {
                        //if (pn_add_edit.num !== num) {
                        pn_add_edit.num = num;
                        pn_add_edit.ids_dir.getWagonsRentOfNum(num, function (rents) {
                            pn_add_edit.rents = rents;
                            pn_add_edit.table_rent.view(pn_add_edit.rents);
                        });
                        //} else {
                        //    pn_add_edit.num = num;
                        //    pn_add_edit.table_rent.view(pn_add_edit.rents);
                        //}

                    } else {
                        LockScreenOff();
                    }
                },
                // Показать таблицу с данными
                view: function (rents, callback) {
                    setTimeout(function () {
                        var list = rents.sort(function (a, b) { return a.id - b.id; });
                        pn_add_edit.table_rent.obj.clear();
                        if (list && list.length > 0) {
                            pn_add_edit.table_rent.obj.rows.add(list);
                        }
                        pn_add_edit.table_rent.obj.order([0, 'desc']).draw();
                        LockScreenOff();
                    }, 0);


                },
            },
            //id_new_operator: null,
            // Проверка номера вагона
            add_edit_valodation_num: $('input#add_edit_valodation_num'),
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

            add_edit_tara: $('input#add_edit_tara'),
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

            //add_edit_operator_car_new: $('select#add_edit_operator_car_new'),
            add_edit_operator_car_new: $('input#add_edit_operator_car_new'),
            add_edit_operator_car_rent_start_now: $('input#add_edit_operator_car_rent_start_now'),

            add_edit_limiting: $('select#add_edit_limiting'),
            add_edit_sign: $('select#add_edit_sign'),

            add_edit_date_rem_uz: $('input#add_edit_date_rem_uz'),
            add_edit_date_rem_vag: $('input#add_edit_date_rem_vag'),
            add_edit_note: $('textarea#add_edit_note'),

            add_edit_new_construction: $('input#add_edit_new_construction'),
            add_edit_closed_route: $('input#add_edit_closed_route'),

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
                        // обработка события show.bs.tab переключение панелей выбора
                        $('ul#add_edit_tab > li > [data-toggle="tab"]').on('show.bs.tab', function (e) {
                            switch (e.target.hash) {
                                case '#total': pn_add_edit.active_tab = 0; break;
                                case '#rent': pn_add_edit.active_tab = 1; break;
                            };
                            // Выбрана рента
                            if (pn_add_edit.active_tab === 1) {
                                pn_add_edit.table_rent.load(pn_add_edit.select_obj.num);
                            }
                        });
                        // Инициализация элементов
                        pn_add_edit.table_rent.init()
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
                        pn_add_edit.add_edit_operator_car_new = initAutocomplete(
                            pn_add_edit.add_edit_operator_car_new,
                            { lang: pn_add_edit.lang, minLength: 2 },
                            getAutocompleteListText(pn_add_edit.ids_dir.getListOperatorsWagons('id', 'operators', pn_add_edit.lang, null), 'text'),
                            pn_add_edit.validation_operator,
                            "").focus(function () {
                                //!!!Корректируем отображение мендального окна (иначе компонент Autocomplete уходит на задний план после появления окна выбора даты)
                                $('DIV.add_edit_form').css('z-index', 101);
                                $('DIV.ui-widget-overlay').css('z-index', 100);
                            });
                        //pn_add_edit.add_edit_operator_car_new = cd_initSelect(
                        //    pn_add_edit.add_edit_operator_car_new,
                        //    {
                        //        lang: pn_add_edit.lang
                        //    },
                        //    pn_add_edit.ids_dir.getListOperatorsWagons('id', 'operators', pn_add_edit.lang, null),
                        //    null,
                        //    -1,
                        //    function (event) {
                        //        event.preventDefault();
                        //        var id = Number($(this).val());
                        //    }, null);


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
                                "ui-dialog": "card add_edit_form",
                                "ui-dialog-titlebar": "card-header bg-primary text-white",
                                "ui-dialog-content": "card-body",
                                "ui-dialog-buttonpane": "card-footer text-muted"
                            },
                            open: function (event, ui) {

                            },
                            buttons: [
                                {
                                    disabled: true,
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
                        $("form#form_add_edit").on("submit", function (event) {
                            event.preventDefault();
                        });
                    });

            },
            //  вывести информацию о вагоне
            view_car: function (car) {
                if (car) {
                    LockScreen(langView('mess_update_uz', langs));
                    // Обновим информацию по вагону из справочника УЗ
                    var specification = {
                        adm: car.Directory_Countrys.code_sng, rod: car.Directory_GenusWagons.rod_uz, kol_os: car.kol_os, usl_tip: car.usl_tip
                    }
                    pn_add_edit.ids_dir.getWagonOfNumSpecification(car.num, specification, function (result_wagon) {
                        if (result_wagon) {
                            // Обновили инфу по вагону
                            $('#add_edit_tab a[href="#rent"]').prop('disabled', false);
                            pn_add_edit.add_edit_valodation_num.prop('checked', false).prop('disabled', true);
                            pn_add_edit.button_ok(true);
                            pn_add_edit.select_obj = result_wagon;
                            pn_add_edit.select_rent = pn_add_edit.ids_dir.getCurrentRentOfWagon(result_wagon)

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
                            pn_add_edit.add_edit_operator_uz_car.val(Number(pn_add_edit.select_obj.id_operator));
                            pn_add_edit.add_edit_change_operator.setDateTime(pn_add_edit.select_obj.change_operator !== null ? pn_add_edit.select_obj.change_operator.replace(/T/g, ' ') : null);

                            pn_add_edit.add_edit_operator_car.val(pn_add_edit.select_rent && pn_add_edit.select_rent.id_operator !== null ? Number(pn_add_edit.select_rent.id_operator) : -1);
                            pn_add_edit.add_edit_operator_car_rent_start.setDateTime(pn_add_edit.select_rent && pn_add_edit.select_rent.rent_start !== null ? pn_add_edit.select_rent.rent_start.replace(/T/g, ' ') : null);
                            pn_add_edit.add_edit_type_ownership.val(pn_add_edit.select_obj.id_type_ownership != null ? pn_add_edit.select_obj.id_type_ownership : -1).prop('disabled', false);

                            pn_add_edit.add_edit_operator_car_new.val('').prop('disabled', false);
                            pn_add_edit.add_edit_operator_car_rent_start_now.setDateTime(null); pn_add_edit.add_edit_operator_car_rent_start_now.obj.prop('disabled', false);
                            pn_add_edit.add_edit_limiting.val(Number(pn_add_edit.select_rent && pn_add_edit.select_rent.id_limiting !== null ? pn_add_edit.select_rent.id_limiting : -1)).prop('disabled', false);
                            pn_add_edit.add_edit_sign.val(pn_add_edit.select_obj.sign !== null ? pn_add_edit.select_obj.sign : -1).prop('disabled', false);

                            pn_add_edit.add_edit_date_rem_uz.setDateTime(pn_add_edit.select_obj.date_rem_uz !== null ? pn_add_edit.select_obj.date_rem_uz.replace(/T/g, ' ') : null);

                            pn_add_edit.add_edit_date_rem_vag.obj.prop('disabled', false);
                            pn_add_edit.add_edit_date_rem_vag.setDateTime(pn_add_edit.select_obj.date_rem_vag !== null ? pn_add_edit.select_obj.date_rem_vag.replace(/T/g, ' ') : null);

                            pn_add_edit.add_edit_note.text(pn_add_edit.select_obj.note);

                            pn_add_edit.add_edit_new_construction.val(pn_add_edit.select_obj.new_construction).prop('disabled', true);
                            pn_add_edit.add_edit_closed_route.prop('checked', pn_add_edit.select_obj.closed_route).prop('disabled', true);
                            LockScreenOff();
                        }
                    });
                }
            },
            // открыть окно добавмить вагоны вручную
            Open: function (num) {
                LockScreen(langView('mess_operation', langs));
                pn_add_edit.val.clear_all();
                // По умолчанию первая закладка
                $('#add_edit_tab a[href="#total"]').tab('show') // Select tab by name
                // Вторая не активна пока небудет определен номер вагона
                $('#add_edit_tab a[href="#rent"]').prop('disabled', true);
                // Убрать кнопку Ок
                pn_add_edit.button_ok(false);
                pn_add_edit.active_tab = 0;
                pn_add_edit.select_num = num;
                pn_add_edit.select_obj = null;
                pn_add_edit.disabled_element();
                if (pn_add_edit.select_num) {
                    // Правим запись
                    pn_add_edit.obj.dialog("option", "title", "Править вагон");
                    pn_add_edit.ids_dir.getWagonOfNum(pn_add_edit.select_num, function (result_obj) {
                        if (result_obj) {
                            pn_add_edit.view_car(result_obj);
                            pn_add_edit.obj.dialog("open");
                            //LockScreenOff();
                        }
                        else {
                            pn_add_edit.val.clear_all();
                            pn_add_edit.val.out_error_message("Ошибка. Не могу найти строку по id = " + pn_add_edit.select_num);
                            LockScreenOff();
                        }
                    });
                } else {
                    pn_add_edit.obj.dialog("option", "title", "Добавить вагон");
                    pn_add_edit.add_edit_num.val('').prop('disabled', false);
                    pn_add_edit.add_search_car.prop('disabled', false);
                    // Добавим запись
                    pn_add_edit.obj.dialog("open");
                    LockScreenOff();
                }
            },
            // Активация кнопки ок
            button_ok: function (active) {
                var buttons = pn_add_edit.obj.dialog("option", "buttons");
                buttons[0].disabled = !active;
                pn_add_edit.obj.dialog("option", "buttons", buttons);
            },
            // Сделать не активными все элементы
            disabled_element: function () {
                pn_add_edit.add_edit_valodation_num.prop('checked', true).prop('disabled', false);
                pn_add_edit.add_edit_kod_adm.val('').prop('disabled', true);
                pn_add_edit.add_edit_name_adm.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_name_rod.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_name_rod_abbr.val('').prop('disabled', true);
                pn_add_edit.add_edit_usl_tip.val('').prop('disabled', true);
                pn_add_edit.add_edit_kol_os.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_gruzp.val('').prop('disabled', true);

                pn_add_edit.add_edit_tara.val('').prop('disabled', true);
                pn_add_edit.add_edit_year_built.val('').prop('disabled', true);
                pn_add_edit.add_edit_factory_number.val('').prop('disabled', true);
                pn_add_edit.add_edit_inventory_number.val('').prop('disabled', true);
                pn_add_edit.add_edit_exit_ban.prop('checked', false).prop('disabled', true);

                pn_add_edit.add_edit_owner_car.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_operator_uz_car.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_change_operator.setDateTime(null);
                pn_add_edit.add_edit_change_operator.obj.prop('disabled', true);

                pn_add_edit.add_edit_operator_car.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_operator_car_rent_start.setDateTime(null);
                pn_add_edit.add_edit_operator_car_rent_start.obj.prop('disabled', true);
                pn_add_edit.add_edit_type_ownership.val(-1).prop('disabled', true);

                pn_add_edit.add_edit_operator_car_new.val('').prop('disabled', true);
                pn_add_edit.add_edit_operator_car_rent_start_now.setDateTime(null);
                pn_add_edit.add_edit_operator_car_rent_start_now.obj.prop('disabled', true);
                pn_add_edit.add_edit_limiting.val(-1).prop('disabled', true);
                pn_add_edit.add_edit_sign.val(-1).prop('disabled', true);


                pn_add_edit.add_edit_date_rem_uz.setDateTime(null);
                pn_add_edit.add_edit_date_rem_vag.setDateTime(null);
                pn_add_edit.add_edit_date_rem_uz.obj.prop('disabled', true);
                pn_add_edit.add_edit_date_rem_vag.obj.prop('disabled', true);

                pn_add_edit.add_edit_note.val('').prop('disabled', true);

                pn_add_edit.add_edit_new_construction.val('').prop('disabled', true);
                pn_add_edit.add_edit_closed_route.prop('checked', false).prop('disabled', true);
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
            // Валидация оператора
            validation_operator: function (name_operator) {
                var valid = false;
                //pn_add_edit.id_new_operator = null; // Сбросим оператора
                if (name_operator) {
                    var obj = pn_add_edit.ids_dir.list_operators_wagons.find(function (o) { return o['operators_' + pn_change_group.lang] === name_operator; });
                    if (obj) {
                        //pn_add_edit.id_new_operator = obj.id; // Определим оператора
                        pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_operator_car_new, "");
                        valid = true;
                    } else {
                        pn_add_edit.val.set_control_error(pn_add_edit.add_edit_operator_car_new, "Указаного оператора нет в справочнике ИДС");
                    }
                } else {
                    pn_add_edit.val.set_control_error(pn_add_edit.add_edit_operator_car_new, "Не указан оператор");
                }
                return valid
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
                var id_new_operator = pn_add_edit.get_new_operator(pn_add_edit.add_edit_operator_car_new.val());



                // Проверим если оператора АМКР небыло и не указали нового оператора, тогда ошибка валидации
                if ((id_operator_car_amkr === null || id_operator_car_amkr < 0) && (id_new_operator === null || id_new_operator < 0)) {
                    //pn_add_edit.val.set_control_error(pn_add_edit.add_edit_operator_car_new, "Не указан оператор");
                    //valid = false;
                    valid = valid & pn_add_edit.validation_operator(pn_add_edit.add_edit_operator_car_new.val());
                }
                if (id_new_operator && id_new_operator >= 0) {
                    valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_operator_car_rent_start_now.obj, "Укажите время начало аренды");
                    valid = valid & pn_add_edit.val.checkInputOfDateTime(pn_add_edit.add_edit_operator_car_rent_start_now.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm:ss');
                    // Проверять только если меняется оператор
                    //if (id_operator_car_amkr && id_operator_car_amkr > 0) {
                    //    var rent_start_now = moment(get_datetime_value(pn_add_edit.add_edit_operator_car_rent_start_now.val(), pn_add_edit.lang));
                    //    var rent_start_old = moment(pn_add_edit.select_rent.rent_start);
                    //    // Проверка на вводиую дату 
                    //    if (rent_start_now.isBefore(rent_start_old)) {
                    //        valid = false;
                    //        pn_add_edit.val.set_object_error(pn_add_edit.add_edit_operator_car_rent_start_now.obj, "Время начало аренды меньше времени начало аренды предыдущей записи")
                    //    }
                    //}

                }

                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_limiting);
                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_sign);

                //valid = valid & pn_add_edit.val.checkInputOfDateTime_IsNull(pn_add_edit.add_edit_date_rem_uz.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & pn_add_edit.val.checkInputOfDateTime_IsNull(pn_add_edit.add_edit_date_rem_vag.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');


                pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_note);
                return valid;
            },
            // Получить id нового оператора
            get_new_operator: function (name_operator) {
                var id_operator = null;
                if (name_operator) {
                    var obj = pn_add_edit.ids_dir.list_operators_wagons.find(function (o) { return o['operators_' + pn_change_group.lang] === name_operator; });
                    if (obj) {
                        id_operator = obj.id; // Определим оператора
                    }
                }
                return id_operator
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
                    if (Number(num) > 0) {
                        // Проверим бит контроля системной нумерации
                        var val_num = pn_add_edit.add_edit_valodation_num.prop('checked');
                        var valid_num = true;
                        if (val_num) {
                            // бит стоит проверим номер на контрольную сумму
                            valid_num = is_valid_num_wagon(num)
                        }
                        if (valid_num) {
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
                    } else {
                        pn_add_edit.val.out_error_message('Ошибка ввода номера вагона. Номер вагона не должен быть <=0');
                        if (typeof callback === 'function') {
                            callback(null);
                        }
                    }
                }
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var valid = pn_add_edit.validation();
                if (valid) {
                    LockScreen(langView('mess_save', langs));
                    // Получим строку обновлений
                    var operation_update_wagon = {
                        "num": pn_add_edit.select_obj.num,
                        "id_countrys": get_select_number_value(pn_add_edit.add_edit_name_adm), //
                        "id_genus": get_select_number_value(pn_add_edit.add_edit_name_rod),    //
                        "gruzp": get_select_number_value(pn_add_edit.add_edit_gruzp),
                        "tara": get_select_number_value(pn_add_edit.add_edit_tara),
                        "kol_os": get_select_number_value(pn_add_edit.add_edit_kol_os),
                        "usl_tip": get_input_string_value(pn_add_edit.add_edit_usl_tip),
                        "date_rem_vag": toISOStringTZ(get_date_value(pn_add_edit.add_edit_date_rem_vag.val(), pn_add_edit.lang)),
                        "id_type_ownership": get_select_number_value(pn_add_edit.add_edit_type_ownership),
                        "sign": get_select_number_value(pn_add_edit.add_edit_sign),
                        "factory_number": get_input_string_value(pn_add_edit.add_edit_factory_number),
                        "inventory_number": get_input_string_value(pn_add_edit.add_edit_inventory_number),
                        "year_built": get_select_number_value(pn_add_edit.add_edit_year_built),
                        "exit_ban": pn_add_edit.add_edit_exit_ban.prop('checked'),
                        "id_operator": pn_add_edit.get_new_operator(pn_add_edit.add_edit_operator_car_new.val()), //get_select_number_value(pn_add_edit.add_edit_operator_car_new),
                        "rent_start": toISOStringTZ(get_datetime_value(pn_add_edit.add_edit_operator_car_rent_start_now.val(), pn_add_edit.lang)),
                        "id_limiting": get_select_number_value(pn_add_edit.add_edit_limiting),
                        "user": pn_add_edit.user_name,
                    }
                    // Обновим
                    pn_add_edit.ids_dir.postOperationUpdateWagon(operation_update_wagon, function (result_operation) {
                        if (result_operation && result_operation.result > 0) {
                            if (typeof callback_ok === 'function') {
                                pn_add_edit.obj.dialog("close");
                                callback_ok({ result: result_operation });
                            }
                        } else {
                            pn_add_edit.val.clear_all();
                            pn_add_edit.val.out_error_message("При обновлении информации строки вагона, произошла ошибка. Код ошибки = " + (result_operation ? result_operation.result : null));
                            if (result_operation && result_operation.listResultWagon && result_operation.listResultWagon.length > 0) {
                                $.each(result_operation.listResultWagon, function (i, el) {
                                    if (el.result < 0) {
                                        pn_add_edit.val.out_error_message("№ вагона :" + el.num + ". Код ошибки : " + el.result);
                                    }
                                });
                            }
                            LockScreenOff();
                        }
                    });

                    //var new_object = pn_add_edit.get_object();
                    //pn_add_edit.save_wagon(new_object.wagon, function (result_wagon) {
                    //    if (result_wagon.result > 0) {
                    //        pn_add_edit.save_wagon_rent(new_object.old_wagon_rent, function (result_old_wagon_rent) {
                    //            if (result_old_wagon_rent.result >= 0) {
                    //                pn_add_edit.save_new_wagon_rent(new_object.new_wagon_rent, function (result_new_wagon_rent) {
                    //                    if (result_new_wagon_rent >= 0) {
                    //                        if (typeof callback_ok === 'function') {
                    //                            pn_add_edit.obj.dialog("close");
                    //                            callback_ok({ num: new_object.wagon.num, type_vagon: result_wagon.type, type_vagon_rent: result_old_wagon_rent.type, result_vagon_rent: result_old_wagon_rent.result, result_new_wagon_rent: result_new_wagon_rent });
                    //                        }
                    //                    } else {
                    //                        pn_add_edit.val.clear_all();
                    //                        pn_add_edit.val.out_error_message("Ошибка. Не могу добавить новю аренду вагон №" + new_object.wagon.num + ", id аренды =" + new_object.new_wagon_rent.id);
                    //                        LockScreenOff();
                    //                    }
                    //                });
                    //            } else {
                    //                pn_add_edit.val.clear_all();
                    //                pn_add_edit.val.out_error_message("Ошибка. Не могу обновить или добавить аренду вагон №" + new_object.wagon.num + ", id аренды =" + new_object.old_wagon_rent.id);
                    //                LockScreenOff();
                    //            }
                    //        });
                    //    } else {
                    //        pn_add_edit.val.clear_all();
                    //        pn_add_edit.val.out_error_message("Ошибка. Не могу обновить или добавить вагон №" + new_object.wagon.num);
                    //        LockScreenOff();
                    //    }
                    //})
                } else {
                    LockScreenOff();
                }
            },
        },
        //*************************************************************************************
        // ОСНОВНАЯ ТАБЛИЦА СПРАВОЧНИКА
        //*************************************************************************************
        table_directory = {
            html_table: $('table#table-directory'),
            obj: null,
            select_string: null,
            count_string: null,
            count_rows: null,              // Количество строк
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[10, 20, 50, 100, 200], [10, 20, 50, 100, 200]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    colReorder: false,               // вкл. перетаскивание полей
                    //fixedHeader: false,             // вкл. фикс. заголовка
                    //fixedColumns: {
                    //    leftColumns: 1,
                    //},
                    "deferRender": true,
                    select: false,
                    //select: {
                    //    style: "multi"
                    //},
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
                        $(row).attr('id', data.num);

                        //data.rent_start = data.rent_start !== null ? data.rent_start.replace(/T/g, ' ') : null
                        //$('td', row).eq(7).text(data.rent_start !== null ? data.rent_start.replace(/T/g, ' ') : null);
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
                            data: "country_abbr_" + lang, title: langView('field_countrys', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "genus_abbr_" + lang, title: langView('field_genus', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "owner_abbr_" + lang, title: langView('field_owner', langs), width: "150px", orderable: false, searchable: false
                        },
                        {
                            data: "operators_uz_" + lang, title: langView('field_operator_uz', langs), width: "150px", orderable: true, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return getReplaceTOfDT(row.change_operator_uz); }, title: langView('field_change_operator', langs), width: "50px", orderable: true, searchable: false
                        },
                        {
                            data: "operators_amkr_" + lang, title: langView('field_operator', langs), width: "150px", orderable: true, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return getReplaceTOfDT(row.rent_start); }, title: langView('field_rent_start', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return getReplaceTOfDT(row.rent_end); },
                            title: langView('field_rent_end', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "limiting_abbr_" + lang, title: langView('field_limiting', langs), width: "150px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) {
                                switch (row.sign) {
                                    case 0: return "Не грузить";
                                    case 1: return "Сход";
                                    default: return "";
                                }
                            },
                            title: langView('field_sign', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return row.gruzp !== null ? Number(row.gruzp).toFixed(2) : null; }, title: langView('field_gruzp', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return row.tara !== null ? Number(row.tara).toFixed(2) : null; }, title: langView('field_tara', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "kol_os", title: langView('field_kol_os', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "usl_tip", title: langView('field_usl_tip', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return getReplaceTOfDT(row.date_rem_uz); }, title: langView('field_date_rem_uz', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) { return getReplaceTOfDT(row.date_rem_vag); }, title: langView('field_date_rem_vag', langs), width: "100px", orderable: false, searchable: false
                        },
                        {
                            data: "type_ownership_" + lang, title: langView('field_type_ownership', langs), width: "100px", orderable: false, searchable: false
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
                            //data: "exit_ban",
                            data: function (row, type, val, meta) {
                                return row.exit_ban ? 'Да' : null;
                            },
                            title: langView('field_exit_ban', langs), width: "50px", orderable: false, searchable: false
                        },
                        {
                            data: "note", title: langView('field_note', langs), width: "300px", orderable: false, searchable: false
                        },
                        {
                            data: "new_construction", title: langView('field_new_construction', langs), width: "300px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.closed_route ? 'Да' : '';
                            }, title: langView('field_closed_route', langs), width: "100px", orderable: false, searchable: false
                        },
                        //{
                        //    data: "create_user_wagons_rent", title: langView('field_create_user', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: function (row, type, val, meta) { return getReplaceTOfDT(row.change_wagons_rent); }, title: langView('field_change', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "change_user_wagons_rent", title: langView('field_change_user', langs), width: "100px", orderable: false, searchable: false
                        //},
                        {
                            data: function (row, type, val, meta) {
                                return row.create_wagons ? row.create_user_wagons + '</br> (' + getReplaceTOfDT(row.create_wagons) + ')' : null;
                            },
                            title: langView('field_create', langs), width: "150px", orderable: false, searchable: false
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.change_wagons ? row.change_user_wagons + '</br>(' + getReplaceTOfDT(row.change_wagons) + ')' : null;
                            }
                            , title: langView('field_change', langs), width: "150px", orderable: false, searchable: false
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
                                    sheetName: 'Карточки вагонов',
                                    messageTop: function () {
                                        return '';
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            extend: 'collection',
                            text: langView('title_button_field', langs),
                            buttons: [
                                {
                                    extend: 'colvis',
                                    text: langView('title_button_field_select', langs),
                                    collectionLayout: 'fixed two-column',
                                },
                                {
                                    extend: 'colvisGroup',
                                    text: langView('title_button_field_view_all', langs),
                                    show: ':hidden'
                                },
                                {
                                    text: langView('title_button_field_clear', langs),
                                    action: function (e, dt, node, conf) {
                                        table_directory.obj.colReorder.reset();
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            //extend: 'selectAll',
                            text: langView('title_button_select_all', langs),
                            action: function () {
                                table_directory.html_table.find('tr').addClass('selected')
                                table_directory.view_button();
                            },
                            enabled: false
                        },
                        {
                            //extend: 'selectNone',
                            text: langView('title_button_select_none', langs),
                            action: function () {
                                $(table_directory.html_table.find('tr')).removeClass('selected')
                                table_directory.view_button();
                            },
                            enabled: false
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
                                var rows = table_directory.html_table.find('tbody tr.selected');
                                if (rows && rows.length === 1) {
                                    var num = $(rows[0]).attr("id")
                                    if (num) {
                                        pn_add_edit.Open(Number(num));
                                    }
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_edit_group', langs),
                            action: function (e, dt, node, config) {
                                // Получим список выделеных строк
                                pn_change_group.Open(table_directory.get_select_wagon());
                            },
                            enabled: false
                        },
                        //{
                        //    text: langView('title_button_edit_limit', langs),
                        //    action: function (e, dt, node, config) {
                        //        var items = table_directory.obj.rows({ selected: true });
                        //        var row_cargo = table_directory.obj.rows(items[0]).data();
                        //        pn_change_group_limit.Open(row_cargo);
                        //    },
                        //    enabled: false
                        //},
                        {
                            extend: 'pageLength',
                        }
                    ]
                }).on('click', 'tr', function () {
                    $(this).toggleClass('selected');
                    table_directory.view_button();
                });

                //.on('select', function (e, dt, type, indexes) {
                //    table_directory.obj.row(indexes).select();
                //    table_directory.view_button(indexes);

                //}).on('deselect', function (e, dt, type, indexes) {
                //    table_directory.obj.row(indexes).deselect();
                //    table_directory.view_button(indexes);
                //})
            },
            nums_comparison: [],
            // Получить список выбранных вагонов
            get_select_wagon: function () {
                // Получим список выделеных строк
                var list_nums = [];
                var rows = table_directory.html_table.find('tbody tr.selected');
                if (rows && rows.length > 0) {
                    // Получим перечень id последних аренд

                    rows.each(function (i, elem) {
                        var num = $(elem).attr("id")
                        if (num) {
                            list_nums.push(Number(num));
                        }
                    });
                }
                return list_nums;
            },
            // Выделить вагоны согласно списка
            set_select_wagon: function (nums) {
                if (nums && nums.length > 0) {
                    $.each(nums, function (i, el) {
                        $('tr#' + el).addClass('selected');
                    });
                }
            },

            // Отобразить кнопки редактирования таблицы
            view_button: function () {
                // Проверим данные есть
                if (table_directory.count_rows > 0) {
                    // Данные есть
                    table_directory.obj.button(2).enable(true);

                    var row = table_directory.html_table.find('tr.selected');
                    table_directory.count_string = row ? row.length : 0;
                    if (table_directory.count_string > 0) {
                        table_directory.obj.button(3).enable(true);
                        table_directory.obj.button(6).enable(true);
                        //table_directory.obj.button(7).enable(true);
                        if (table_directory.count_string === 1) {
                            table_directory.obj.button(5).enable(true);
                            //table_directory.obj.button(6).enable(true);
                        } else {

                            table_directory.obj.button(5).enable(false);
                            //table_directory.obj.button(6).enable(false);
                        }
                    } else {
                        table_directory.deselect();
                    }
                } else {
                    // Данных нет
                    table_directory.obj.button(2).enable(false);
                    table_directory.deselect();
                }

            },
            // Показать вагоны требующие внимания
            view_cars_warning: function () {
                alert.clear_message();
                ids_dir.getViewWarningWagons(function (wagons) {
                    table_directory.view(wagons, function () {
                        LockScreenOff();
                    });
                });
            },
            // Показать вагоны по списку номеров
            view_cars_search_num: function (car_valid, callback) {
                ids_dir.getViewWagonOfNums(car_valid, function (wagon) {
                    var not_car = car_valid.filter(function (i) {
                        var not = true;
                        for (var ci = 0; ci < wagon.length; ci++) {
                            if (Number(i) === wagon[ci].num) not = false;
                        }
                        return not;
                    });
                    table_directory.view(wagon, function () {
                        $.each(not_car, function (i, el) {
                            alert.out_warning_message('Вагон № :' + el + ' - не найден!');
                        });
                        // Функция обратного вызова
                        if (typeof callback === 'function') {
                            callback();
                        }
                    });

                });
            },
            // Показать вагоны по оператору
            view_cars_search_operator: function () {
                if (pn_search.id_operator !== null) {
                    var id = Number(pn_search.id_operator);
                    ids_dir.getViewWagonOfOperator(id, function (cars) {
                        table_directory.view(cars, function () {
                            LockScreenOff();
                        });
                    });
                }

            },
            // Вывести вагоны сравнения
            view_cars_comparison: function (callback) {
                table_directory.view_cars_search_num(table_directory.nums_comparison, function () {
                    // Функция обратного вызова
                    if (typeof callback === 'function') {
                        callback();
                    }
                    //LockScreenOff();
                });
            },
            // Показать таблицу с данными
            view: function (data, callback) {
                // Сохраним количество строк
                table_directory.count_rows = data ? data.length : 0;
                LockScreen(langView('mess_load_table', langs));
                var nums = table_directory.get_select_wagon()
                table_directory.obj.clear();
                // Сбросить выделенный состав
                table_directory.deselect();
                // Добавить поля асинхроно
                setTimeout(function () {
                    table_directory.obj.rows.add(data);
                    table_directory.obj.draw();
                    // Вернем выделеные строки

                    table_directory.set_select_wagon(nums);
                    //if (nums && nums.length > 0) {
                    //    $.each(nums, function (i, el) {
                    //        $('tr#' + el).addClass('selected');
                    //    });
                    //}
                    // Отразим кнопки
                    table_directory.view_button();
                    // Функция обратного вызова
                    if (typeof callback === 'function') {
                        callback();
                    }
                    //LockScreenOff();
                }, 0);
            },
            // Получить полную информацию по составау
            //get_string: function (data) {
            //    return {
            //        "id": data.id_wagons_rent,
            //        "num": data.num,
            //        "id_countrys": data.id_countrys,
            //        "code_sng": data.code_sng,
            //        "countrys": data['country_abbr_' + lang],
            //        "id_genus": data.id_genus,
            //        "rod_uz": data.rod_uz,
            //        "genus": data['genus_abbr_' + lang],
            //        "id_owner": data.id_owner,
            //        "owner": data['owner_abbr_' + lang],
            //        "id_operator_uz": data.id_operator_uz,
            //        "change_operator": data.change_operator_uz !== null ? data.change_operator_uz.replace(/T/g, ' '): null,
            //        "operator_uz": data['operators_uz_' + lang],
            //        "bit_warning": data.bit_warning,
            //        "id_operator": data.id_operator_amkr,
            //        "operator": data['operators_amkr_' + lang],
            //        "gruzp": data.gruzp,
            //        "tara": data.tara,
            //        "kol_os": data.kol_os,
            //        "usl_tip": data.usl_tip,
            //        "date_rem_uz": data.date_rem_uz !== null ? data.date_rem_uz.replace(/T/g, ' '): null,
            //        "date_rem_vag": data.date_rem_vag !== null ? data.date_rem_vag.replace(/T/g, ' '): null,
            //        "id_limiting": data.id_limiting,
            //        "limiting": data['limiting_abbr_' + lang],
            //        "id_type_ownership": data.id_type_ownership,
            //        "type_ownership": data['type_ownership_' + lang],
            //        "rent_start": data && data.rent_start !== null ? data.rent_start.replace(/T/g, ' '): null,
            //        "rent_end": data && data.rent_end !== null ? data.rent_end.replace(/T/g, ' '): null,
            //        "sign": data.sign,
            //        "factory_number": data.factory_number,
            //        "inventory_number": data.inventory_number,
            //        "year_built": data.year_built,
            //        "exit_ban": data.exit_ban,
            //        "note": data.note,
            //        "create": data.create_wagons_rent !== null ? data.create_wagons_rent.replace(/T/g, ' '): null,
            //        "create_user": data.create_user_wagons_rent,
            //        "change": data.change_wagons_rent !== null ? data.change_wagons_rent.replace(/T/g, ' '): null,
            //        "change_user": data.change_user_wagons_rent,
            //    };
            //},
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
                table_directory.obj.button(3).enable(false);
                table_directory.obj.button(5).enable(false);
                table_directory.obj.button(6).enable(false);
                //table_directory.obj.button(7).enable(false);
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        //if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
        pn_search.init();
        //// Инициализация окна править группу ограничений
        //pn_change_group_limit.init(lang, user_name, function (result_change_group) {
        //    if (result_change_group > 0) {
        //        // Показать после изменения
        //        pn_search.view_cars();
        //        alert.out_info_message('Обновлены огранечения по группе вагонов в количестве - ' + result_change_group + ' записей');
        //    }
        //});
        // Инициализация окна править группу операторов
        pn_change_group.init(lang, user_name, function (result_operation) {
            if (result_operation) {
                // Показать после изменения
                pn_search.view_cars();
                alert.out_info_message('Обновлена информация по группе вагонов в количестве - ' + result_operation.result.listResultWagon.length + ' записей.');
            }
        });
        // Инициализация окна добавить править груз
        pn_add_edit.init(lang, user_name, function (result_operation) {
            if (result_operation) {
                // Показать после изменения
                pn_search.view_cars();
                alert.out_info_message('Обновлена информация по вагону № ' + result_operation.result.listResultWagon[0].num + ', код выполнения :' + result_operation.result.listResultWagon[0].result + ', обновлено таблиц : ' + result_operation.result.result);
            }

            //if (result_add_edit) {
            //    // Загрузить новый справочник
            //    //alert.clear_message();
            //    // Показать после изменения
            //    pn_search.view_cars();
            //    var num = result_add_edit.num;
            //    if (result_add_edit.type_vagon === 1) {
            //        alert.out_info_message('Строка справочника вагона №' + num + ' - обновлена!');
            //    }
            //    if (result_add_edit.type_vagon === 0) {
            //        alert.out_info_message('Строка справочника вагона №' + num + ' - добавлена!');
            //    }
            //    if (result_add_edit.type_vagon_rent === 1 && result_add_edit.result_new_wagon_rent > 0) {
            //        alert.out_info_message('Строка аренды вагона №' + num + ' - закрыта! ID строки = ' + result_add_edit.result_vagon_rent);
            //    }
            //    if (result_add_edit.type_vagon_rent === 1 && result_add_edit.result_new_wagon_rent === 0) {
            //        alert.out_info_message('Строка аренды вагона №' + num + ' - обновлена! ID строки = ' + result_add_edit.result_vagon_rent);
            //    }
            //    if (result_add_edit.type_vagon_rent === 0) {
            //        alert.out_info_message('Строка аренды вагона №' + num + ' - добавлена! ID строки = ' + result_add_edit.result_vagon_rent);
            //    }
            //    if (result_add_edit.result_new_wagon_rent > 0) {
            //        alert.out_info_message('Добавлена новая строка аренды вагона №' + num + ', ID строки = ' + result_add_edit.result_new_wagon_rent);
            //    }
            //}
        });
        table_directory.init();
        LockScreenOff();
    });
});