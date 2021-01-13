jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num': '№ Письма',
                'field_dt': 'от',
                'field_owner': 'Собственник (по письму)',
                'field_destination_station': 'Код',
                'field_destination_station_name': 'Станция назначения',
                'field_note': 'Примечание',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал строку',
                'field_change': 'Строку правили',
                'field_change_user': 'Правил',

                'field_num_wagon': '№ вагона',
                'field_close': 'Письмо закрыто',
                'field_close_status': 'Статус закрытия',

                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',

                'title_button_add': 'Добавить',
                'title_button_edit': 'Изменить',
                'title_button_del': 'Удалить',
                'title_button_close': 'Закрыть',

            },
            'en':  //default language: English
            {
                'field_num': 'Letter No.',
                'field_dt': 'from',
                'field_owner': 'Owner (by letter)',
                'field_destination_station': 'Code',
                'field_destination_station_name': 'Destination station',
                'field_note': 'Note',
                'field_create': 'String created',
                'field_create_user': 'Created a string',
                'field_change': 'The line was edited',
                'field_change_user': 'Rules',

                'field_num_wagon': 'Wagon number',
                'field_close': 'Email closed',
                'field_close_status': 'Close status',

                'title_button_buffer': 'Buffer',
                'title_button_excel': 'Excel',
                'title_button_field': 'Fields',
                'title_button_field_all': 'All fields',

                'title_button_add': 'Add',
                'title_button_edit': 'Edit',
                'title_button_del': 'Remove',
                'title_button_close': 'Close',
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
        //ids_dir = new IDS_DIRECTORY(lang), // Создадим класс IDS_DIRECTORY
        ids_inc = new IDS_RWT(lang),
        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_inc.load([], [], ['stations'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },

        //add_edit_destination_station1 = $('input#add_edit_destination_station1'),
        //*************************************************************************************
        // ПАНЕЛЬ ВАРИАНТОВ 
        //*************************************************************************************
        pn_search = {
            active: 0,
            // Инициализация
            init: function () {
                // обработка события show.bs.tab переключение панелей выбора
                $('[data-toggle="tab"]').on('show.bs.tab', function (e) {
                    var activeTab = $(e.target);    // активная вкладка
                    switch (e.target.hash) {
                        case '#tab-letters': pn_search.active = 0; break;
                        case '#tab-wagon': pn_search.active = 1; break;
                    };
                });
            },
            // Показать в зависимости от ыбранного режима поиска
            view_table: function () {
                switch (pn_search.active) {
                    //case 0: table_directory.view_cars_warning(); break;
                    //case 1: table_directory.view_cars_search_num(pn_search.num_cars_valid, function () {
                    //    pn_search.bt_cars_search_num.prop("disabled", false);
                    //}); break;
                    //case 2: table_directory.view_cars_search_operator(); break;
                    //    //case 3: table_directory.view_cars_search_operator(); break;
                }
            }
        },
        //*************************************************************************************
        // ОКНО ДОБАВИТЬ ПРАВИТЬ 
        //*************************************************************************************
        pn_add_edit = {
            obj: null,
            lang: null,
            user_name: null,
            //ids_dir: null,
            ids_inc: null,
            alert: $('div#add_edit_alert'),                                             // Сообщения
            all_obj: null,                                                              // массив всех элементов формы 
            val: null,                                                                  // класс валидации
            select_id: null,                                                            // id строки письма
            select_obj: null,                                                           // письмо
            select_rent: null,                                                           // строка
            // Поля формы
            add_edit_num: $('input#add_edit_num'),
            add_edit_datetime: $('input#add_edit_datetime'),
            add_edit_destination_station: $('input#add_edit_destination_station'),
            add_edit_destination_station_code: $('input#add_edit_destination_station_code'),
            add_edit_owner: $('input#add_edit_owner'),
            add_edit_wagons: $('textarea#add_edit_wagons'),
            add_edit_note: $('textarea#add_edit_note'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_add_edit.ids_inc.load([], [], ['stations'], false, function () {
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
                //pn_add_edit.ids_dir = new IDS_DIRECTORY(pn_add_edit.lang), // Создадим класс IDS_DIRECTORY
                pn_add_edit.ids_inc = new IDS_RWT(pn_add_edit.lang), // Создадим класс IDS_RWT
                    pn_add_edit.loadReference(function () {
                        // Инициализация элементов
                        // Дата письма
                        pn_add_edit.add_edit_datetime = cd_initDateTimeRangePicker(pn_add_edit.add_edit_datetime,
                            { lang: lang, time: false },
                            function (datetime) {

                            }),
                            pn_add_edit.add_edit_destination_station = initAutocomplete(
                                pn_add_edit.add_edit_destination_station,
                                { lang: pn_add_edit.lang, minLength: 3 },
                                getAutocompleteList(pn_add_edit.ids_inc.uz_dir.getListStation('code_cs', 'station', null, null), 'text'),
                                function (text) {
                                    pn_add_edit.add_edit_destination_station_code.val(null);
                                    if (text) {
                                        var obj = pn_add_edit.ids_inc.uz_dir.getStations_Of_Name('station', text)
                                        if (obj && obj.length > 0) {
                                            var code = obj[0].code_cs;
                                            pn_add_edit.add_edit_destination_station_code.val(code);
                                        }
                                    }
                                },
                                null
                            ).focus(function () {
                                //!!!Корректируем отображение мендального окна (иначе компонент Autocomplete уходит на задний план после появления окна выбора даты)
                                $('[aria-describedby="add_edit"]').css('z-index', 101);
                                $('DIV.ui-widget-overlay').css('z-index', 100);
                            });

                        // Соберем все элементы в массив
                        pn_add_edit.all_obj = $([])
                            .add(pn_add_edit.add_edit_num)
                            .add(pn_add_edit.add_edit_datetime)
                            .add(pn_add_edit.add_edit_destination_station)
                            .add(pn_add_edit.add_edit_owner)
                            .add(pn_add_edit.add_edit_wagons)
                            .add(pn_add_edit.add_edit_note)
                        ;
                        // создадим классы 
                        pn_add_edit.val = new VALIDATION(pn_add_edit.lang, pn_add_edit.alert, pn_add_edit.all_obj); // Создадим класс VALIDATION
                        pn_add_edit.obj = $("div#add_edit").dialog({
                            resizable: false,
                            //title: 'Изменить группу груза',
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
            // Открыть
            Open: function (id) {
                pn_add_edit.val.clear_all();
                pn_add_edit.select_id = id;
                pn_add_edit.select_obj = null;
                if (pn_add_edit.select_id) {
                    pn_add_edit.obj.dialog("option", "title", "Править письмо");
                    // редактировать письмо
                    pn_add_edit.ids_inc.getInstructionalLettersOfID(pn_add_edit.select_id, function (result_il) {
                        if (result_il) {
                            pn_add_edit.select_obj = result_il;
                            pn_add_edit.add_edit_num.val(result_il.num);
                            pn_add_edit.add_edit_datetime.setDateTime(result_il.dt);
                            pn_add_edit.add_edit_destination_station_code.val(result_il.destination_station);
                            var station = pn_add_edit.ids_inc.uz_dir.getStations_Internal_Of_CodeCS(result_il.destination_station)
                            pn_add_edit.add_edit_destination_station.val(station ? station.station : null);
                            pn_add_edit.add_edit_owner.val(result_il.owner);
                            pn_add_edit.add_edit_wagons.val(getStringArr(getArrOfNameObjArr(result_il.InstructionalLettersWagon, 'num'), ';')).prop('disabled', true);
                            pn_add_edit.add_edit_note.val(result_il.note);
                            pn_add_edit.obj.dialog("open");
                        } else {
                            alert.out_error_message('Ошибка чтения строки письма с id=' + pn_add_edit.select_id);
                        }
                    });
                } else {
                    // Создать новое письмо
                    pn_add_edit.obj.dialog("option", "title", "Добавить новое письмо");
                    pn_add_edit.add_edit_num.val('');
                    pn_add_edit.add_edit_datetime.setDateTime(null);
                    pn_add_edit.add_edit_destination_station_code.val('');
                    pn_add_edit.add_edit_destination_station.val('');
                    pn_add_edit.add_edit_owner.val('');
                    pn_add_edit.add_edit_wagons.val('');
                    pn_add_edit.add_edit_note.val('').prop('disabled', false);
                    pn_add_edit.obj.dialog("open");
                }
            },
            // Валидация введенных номеров
            validation_list_nums: function (valid, list) {
                if (!list) return false;
                // Провкерка на правильный ввод номеров
                var car_valid = [];
                //var car_out = [];
                var cars = list.split(';');
                $.each(cars, function (i, el) {
                    if (!isNumeric($.trim(el)) || !is_valid_num_wagon($.trim(el))) {
                        // Ошибка ввода
                        pn_add_edit.val.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                        valid = false;
                    } else {
                        car_valid.push(Number(el));
                        //car_out.push(Number(el));
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
                            valid = false;
                            arr_res.push(car_valid[i]);
                        }
                    }
                }
                // Вывод сообщений повторяющихся номеров
                $.each(arr_res, function (i, el) {
                    pn_add_edit.val.out_warning_message('Ошибка ввода, введеный номер :' + el + ' повторяется.');
                });
                return valid;
            },
            // Валидация данных 
            validation: function () {
                pn_add_edit.val.clear_all();
                var valid = true;
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_num, "Укажите номер письма");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_datetime.obj, "Укажите дату письма");
                valid = valid & pn_add_edit.val.checkInputOfDateTime(pn_add_edit.add_edit_datetime.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & pn_add_edit.val.checkInputOfDirectory(pn_add_edit.add_edit_destination_station_code, this, 'ids_inc.uz_dir.getStations_Internal_Of_CodeCS', "Указанной станции нет в справочнике УЗ");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_owner, "Укажите владельца");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_wagons, "Укажите вагон или перечень вагонов, разделитель ';'");
                valid = valid & pn_add_edit.validation_list_nums(valid, pn_add_edit.add_edit_wagons.val());
                return valid;
            },
            // Проверка на совподение номера и даты письма
            validation_dublicat: function (new_il, callback) {
                pn_add_edit.ids_inc.getInstructionalLettersOfNumDate(new_il.num, get_date_value(pn_add_edit.add_edit_datetime.val(), pn_add_edit.lang), function (result_dublicat) {
                    if (result_dublicat) {
                        dc.dialog_confirm('Open', 'Добавить?', 'Письмо № ' + new_il.num + ' от ' + new_il.dt + ' - уже существует. Вы уверены что хотите добавить новое письмо?', function (result) {
                            if (typeof callback === 'function') {
                                callback(result);
                            }
                        });
                    } else {
                        callback(true);
                    }

                });
            },

            // Сохранить прибытие состава
            save: function (callback_ok) {
                var valid = pn_add_edit.validation();
                if (valid) {
                    if (pn_add_edit.select_id > 0) {
                        // править
                        LockScreen(langView('mess_save', langs));
                        var litter = pn_add_edit.ids_inc.getCloneInstructionalLetters(pn_add_edit.select_obj);
                        litter.num = get_input_string_value(pn_add_edit.add_edit_num);
                        litter.dt = toISOStringTZ(get_date_value(pn_add_edit.add_edit_datetime.val(), pn_add_edit.lang));
                        litter.owner = get_input_string_value(pn_add_edit.add_edit_owner);
                        litter.destination_station = get_select_number_value(pn_add_edit.add_edit_destination_station_code);
                        litter.note = pn_add_edit.add_edit_note.val();
                        litter.change = toISOStringTZ(new Date());
                        litter.change_user = pn_add_edit.user_name;
                        pn_add_edit.ids_inc.putInstructionalLetters(litter, function (result_upd) {
                            if (result_upd >= 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ mode: 1, letter: result_upd, close: 0, new: 0 });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. Не могу обновить информацию по письму");
                                LockScreenOff();
                            }
                        });
                    } else {
                        // добавить
                        var new_il = pn_add_edit.get_new_instructional_letters();
                        pn_add_edit.validation_dublicat(new_il, function (result) {
                            if (result) {
                                LockScreen(langView('mess_save', langs));
                                pn_add_edit.ids_inc.postInstructionalLetters(new_il, function (result_il) {
                                    if (result_il > 0) {
                                        // Строка с письмом создана, добавим вагоны.
                                        var arr_num = pn_add_edit.add_edit_wagons.val().split(';');
                                        pn_add_edit.add_wagons(result_il, arr_num, function (result_add) {
                                            //letter: id_letters, close: result_upd_ilw, new: -1
                                            if (result_add.letter >= 0 && result_add.close >= 0 && result_add.new >= 0) {
                                                if (typeof callback_ok === 'function') {
                                                    pn_add_edit.obj.dialog("close");
                                                    callback_ok({ mode: 0, letter: result_add.letter, close: result_add.close, new: result_add.new });
                                                }
                                            } else {
                                                pn_add_edit.val.clear_all();
                                                pn_add_edit.val.out_error_message("Ошибка. Не могу добавить вагоны по новому письму.");
                                                LockScreenOff();
                                            }
                                        });
                                    } else {
                                        pn_add_edit.val.clear_all();
                                        pn_add_edit.val.out_error_message("Ошибка. Не могу создать строку с новым письмом.");
                                        LockScreenOff();
                                    }
                                });
                            }
                        });
                    }
                }
            },
            // Добавим вагоны по письму 
            add_wagons: function (id_letters, wagons, callback) {
                var list_old_ilw = [];
                if (id_letters && wagons && wagons.length > 0) {
                    pn_add_edit.ids_inc.getInstructionalLettersOfID(id_letters, function (result_il) {
                        if (result_il) {
                            // Документ есть
                            pn_add_edit.ids_inc.getOpenInstructionalLettersWagonOfNums(wagons, function (open_nums) {
                                // Есть вагоны с открытыми письмами, закроем 
                                for (ic = 0; ic < open_nums.length; ic++) {
                                    // Получим копию
                                    var ilw_old = pn_add_edit.ids_inc.getCloneInstructionalLettersWagon(open_nums[ic]);
                                    // Закроем
                                    ilw_old.close = toISOStringTZ(new Date());
                                    ilw_old.close_status = 1; // Закрылся по другому документу
                                    ilw_old.note = "Закрыт письмом №" + result_il.num + " от " + result_il.dt + " id=" + result_il.id;
                                    ilw_old.change = toISOStringTZ(new Date());
                                    ilw_old.change_user = pn_add_edit.user_name;
                                    list_old_ilw.push(ilw_old);
                                }
                                // Обновим закрытые вагоны
                                pn_add_edit.ids_inc.putListInstructionalLettersWagon(list_old_ilw, function (result_upd_ilw) {
                                    if (result_upd_ilw >= 0) {
                                        var new_wagon = [];
                                        // Добавим новые вагоны
                                        for (ni = 0; ni < wagons.length; ni++) {
                                            var wagon = pn_add_edit.get_new_wagon(wagons[ni], id_letters);
                                            new_wagon.push(wagon);
                                        }
                                        // Добавим новые
                                        pn_add_edit.ids_inc.postListInstructionalLettersWagon(new_wagon, function (result_add_ilw) {
                                            if (result_add_ilw >= 0) {
                                                if (typeof callback === 'function') {
                                                    callback({ letter: id_letters, close: result_upd_ilw, new: result_add_ilw });
                                                }
                                            } else {
                                                // Ошибка добавления!
                                                if (typeof callback === 'function') {
                                                    callback({ letter: id_letters, close: result_upd_ilw, new: -1 });
                                                }
                                            }
                                        });

                                    } else {
                                        // Ошибка обновления!
                                        if (typeof callback === 'function') {
                                            callback({ letter: id_letters, close: -1, new: 0 });
                                        }
                                    }
                                });
                            });
                        } else {
                            // Документа нет!
                            if (typeof callback === 'function') {
                                callback({ letter: -1, close: 0, new: 0 });
                            }
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback({ letter: 0, close: 0, new: 0 });
                    }
                }
            },
            // Получить строку письма
            get_new_instructional_letters: function () {
                var new_instructional_letters =
                {
                    id: 0,
                    num: get_input_string_value(pn_add_edit.add_edit_num),
                    dt: toISOStringTZ(get_date_value(pn_add_edit.add_edit_datetime.val(), pn_add_edit.lang)),
                    owner: get_input_string_value(pn_add_edit.add_edit_owner),
                    destination_station: get_select_number_value(pn_add_edit.add_edit_destination_station_code),
                    note: pn_add_edit.add_edit_note.val(),
                    create: toISOStringTZ(new Date()),
                    create_user: pn_add_edit.user_name,
                };
                return new_instructional_letters;
            },
            // Получить строку вагон из письма
            get_new_wagon: function (num, id_instructional_letters) {
                var new_wagon =
                {
                    id: 0,
                    id_instructional_letters: id_instructional_letters,
                    num: num,
                    close: null,
                    close_status: null,
                    note: null,
                    create: toISOStringTZ(new Date()),
                    create_user: pn_add_edit.user_name,
                };
                return new_wagon;
            }
        },
        //*************************************************************************************
        // ОСНОВНАЯ ТАБЛИЦА СОСТАВОВ
        //*************************************************************************************
        table_letters = {
            html_table: $('table#table-letters'),
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
                        style: "single"
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
                            className: 'details-control',
                            orderable: false,
                            data: null,
                            defaultContent: '',
                            width: "30px",
                            searchable: false
                        },
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: true, searchable: true },
                        { data: "dt", title: langView('field_dt', langs), width: "50px", orderable: true, searchable: true },
                        { data: "owner", title: langView('field_owner', langs), width: "50px", orderable: true, searchable: true },
                        { data: "destination_station", title: langView('field_destination_station', langs), width: "50px", orderable: true, searchable: true },
                        { data: "destination_station_name", title: langView('field_destination_station_name', langs), width: "50px", orderable: true, searchable: true },
                        { data: "note", title: langView('field_note', langs), width: "300px", orderable: false, searchable: false },
                        { data: "create", title: langView('field_create', langs), width: "100px", orderable: false, searchable: false },
                        { data: "create_user", title: langView('field_create_user', langs), width: "100px", orderable: false, searchable: false },
                        { data: "change", title: langView('field_change', langs), width: "100px", orderable: false, searchable: false },
                        { data: "change_user", title: langView('field_change_user', langs), width: "100px", orderable: false, searchable: false },
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
                            text: langView('title_button_add', langs),
                            action: function (e, dt, node, config) {
                                pn_add_edit.Open(null);
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                if (table_letters.select_string) {
                                    pn_add_edit.Open(table_letters.select_string.id);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_close', langs),
                            action: function (e, dt, node, config) {
                                if (table_letters.select_string) {
                                    //pn_add_edit.Open(table_letters.select_string.num);
                                }
                            },
                            enabled: false
                        },
                        {
                            extend: 'pageLength',
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    table_letters.view_button(indexes);

                }).on('deselect', function (e, dt, type, indexes) {
                    table_letters.view_button(indexes);
                });
                table_letters.initEventSelectChild();
            },
            // Отобразить кнопки редактирования таблицы
            view_button: function (indexes) {
                var items = table_letters.obj.rows({ selected: true });
                table_letters.count_string = items ? items.count() : 0;
                table_letters.select_string = items && items.count() === 1 ? table_letters.obj.rows(items[0]).data()[0] : null;
                if (table_letters.count_string > 0) {
                    table_letters.obj.button(3).enable(true);
                    table_letters.obj.button(4).enable(true);
                } else {
                    table_letters.deselect();
                }
            },
            // Загрузить основные данные
            load: function () {
                LockScreen(langView('mess_delay', langs));
                ids_inc.getInstructionalLetters(function (letters) {
                    table_letters.view(letters);
                });
            },
            // Показать таблицу с основными данными
            view: function (data) {
                var id_select = table_letters.select_string ? table_letters.select_string.id : 0;
                table_letters.obj.clear();
                // Сбросить выделенный состав
                table_letters.deselect();
                $.each(data, function (i, el) {
                    table_letters.obj.row.add(table_letters.get_letter(el));
                });
                if (table_letters.count_string === 1) {
                    table_letters.obj.row('#' + id_select).select();
                }
                table_letters.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_letter: function (data) {
                var station = ids_inc.uz_dir.getStations_Internal_Of_CodeCS(data.destination_station);

                return {
                    "id": data.id,
                    "num": data.num,
                    "dt": data.dt !== null ? data.dt.replace(/T/g, ' ') : null,
                    "owner": data.owner,
                    "destination_station": data.destination_station,
                    "destination_station_name": station ? station.station : '?',
                    "note": data.note,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                };
            },
            // Обновить данные в таблице
            update_string: function (data) {
                if (data) {
                    //var row = table_letters.get_sostav(data);
                    //var index = table_letters.obj.row('#' + data.id).index();

                    //table_letters.obj.cell(index, 1).data(row.train);
                    //table_letters.obj.cell(index, 2).data(row.composition_index);
                    //table_letters.obj.cell(index, 3).data(row.date_arrival);
                    //table_letters.obj.cell(index, 4).data(row.date_adoption);
                    //table_letters.obj.cell(index, 5).data(row.date_adoption_act);
                    //table_letters.obj.cell(index, 6).data(row.station_from);
                    //table_letters.obj.cell(index, 7).data(row.station_on);
                    //table_letters.obj.cell(index, 8).data(row.id_way);
                    //table_letters.obj.cell(index, 9).data(row.num_doc);
                    //table_letters.obj.cell(index, 10).data(row.count_all);
                    //table_letters.obj.cell(index, 11).data(row.create_sostav);
                    //table_letters.obj.cell(index, 12).data(row.change_sostav);
                    //table_letters.obj.draw();
                }
            },
            // Deselect
            deselect: function () {
                table_letters.select_string = null;
                table_letters.obj.button(3).enable(false);
                table_letters.obj.button(4).enable(false);
            },
            // Инициализация события выборки детально
            initEventSelectChild: function () {
                this.html_table.find('tbody')
                    .on('click', 'td.details-control', function () {
                        var tr = $(this).closest('tr');
                        var row = table_letters.obj.row(tr);
                        if (row.child.isShown()) {
                            // This row is already open - close it
                            row.child.hide();
                            tr.removeClass('shown');
                        }
                        else {
                            row.child('<div id="wagons-letters-' + row.data().id + '" class="row"><div class="col-xl-12">' +
                                '<div class="card border-light mb-3">' +
                                '<div class="card-header bg-light">Вагоны согласно письму</div>' +
                                '<div class="card-body text-info"><div class="col-xl-12">' +
                                '<table class="table table-sm thead-light" id="table-wagons-letters-' + row.data().id + '" style="width:100%; table-layout: fixed"></table>' +
                                '</div></div>' +
                                '</div>' +
                                '</div></div>').show();



                            // Инициализируем
                            table_letters.view_child(row.data());
                            tr.addClass('shown');
                        }
                    });
            },
            // Показать детальную таблицу
            view_child: function (row_data) {
                LockScreen(langView('mess_delay', langs));
                var table_wagons_letter;
                if ($.fn.dataTable.isDataTable('#table-wagons-letters-' + row_data.id)) {
                    table_wagons_letter = $('#table-wagons-letters-' + row_data.id).DataTable();
                }
                else {
                    table_wagons_letter = table_letters.init_child_table('#table-wagons-letters-' + row_data.id);
                }
                ids_inc.getInstructionalLettersWagonOfIDLetter(row_data.id, function (letter_wagons) {
                    table_wagons_letter.clear();
                    $.each(letter_wagons, function (i, el) {
                        table_wagons_letter.row.add(table_letters.get_wagon_letter(el));
                    });
                    table_wagons_letter.draw();
                    LockScreenOff();
                });
            },
            // Создать дочернюю таблицу
            init_child_table: function (name) {
                return $(name).DataTable({
                    //"lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: {
                        style: "single"
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
                        { data: "num", title: langView('field_num_wagon', langs), width: "50px", orderable: true, searchable: true },
                        { data: "close", title: langView('field_close', langs), width: "50px", orderable: true, searchable: true },
                        { data: "close_status", title: langView('field_close_status', langs), width: "50px", orderable: true, searchable: true },
                        { data: "note", title: langView('field_note', langs), width: "300px", orderable: false, searchable: false },
                        { data: "create", title: langView('field_create', langs), width: "100px", orderable: false, searchable: false },
                        { data: "create_user", title: langView('field_create_user', langs), width: "100px", orderable: false, searchable: false },
                        { data: "change", title: langView('field_change', langs), width: "100px", orderable: false, searchable: false },
                        { data: "change_user", title: langView('field_change_user', langs), width: "100px", orderable: false, searchable: false },
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
                            sheetName: 'Список вагонов',
                            messageTop: function () {
                                return '';
                            }
                        },
                        {
                            text: langView('title_button_add', langs),
                            action: function (e, dt, node, config) {
                                //pn_add_edit.Open(null);
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                if (table_letters.select_string) {
                                    //pn_add_edit.Open(table_letters.select_string.num);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_close', langs),
                            action: function (e, dt, node, config) {
                                if (table_letters.select_string) {
                                    //pn_add_edit.Open(table_letters.select_string.num);
                                }
                            },
                            enabled: false
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {

                    var table_wagons_letter = e.target;

                    table_wagons_letter = $(e.target.id).DataTable();
                    //var table_wagons_letter = $(this);

                    //var items = table_wagons_letter[0].rows({ selected: true });
                    //table_wagons_letter.count_string = items ? items.count() : 0;
                    //table_wagons_letter.select_string = items && items.count() === 1 ? table_wagons_letter.obj.rows(items[0]).data()[0] : null;
                    //if (table_wagons_letter.count_string > 0) {
                    //    table_wagons_letter.obj.button(3).enable(true);
                    //    table_wagons_letter.obj.button(4).enable(true);
                    //} else {
                    //    table_wagons_letter.select_string = null;
                    //    table_wagons_letter.obj.button(3).enable(false);
                    //    table_wagons_letter.obj.button(4).enable(false);
                    //}

                    //var items = table_wagons_letter.rows({ selected: true });
                    ////table_wagons_letter.count_string = items ? items.count() : 0;
                    ////table_wagons_letter.select_string = items && items.count() === 1 ? table_wagons_letter.obj.rows(items[0]).data()[0] : null;
                    //if (items.length > 0) {
                    //    table_wagons_letter.button(3).enable(true);
                    //    table_wagons_letter.button(4).enable(true);
                    //} else {
                    //    //table_wagons_letter.select_string = null;
                    //    table_wagons_letter.button(3).enable(false);
                    //    table_wagons_letter.button(4).enable(false);
                    //}



                }).on('deselect', function (e, dt, type, indexes) {

                    //var table_wagons_letter = $(this);
                    //var items = table_wagons_letter.obj.rows({ selected: true });
                    //table_wagons_letter.count_string = items ? items.count() : 0;
                    //table_wagons_letter.select_string = items && items.count() === 1 ? table_wagons_letter.obj.rows(items[0]).data()[0] : null;
                    //if (table_wagons_letter.count_string > 0) {
                    //    table_wagons_letter.obj.button(3).enable(true);
                    //    table_wagons_letter.obj.button(4).enable(true);
                    //} else {
                    //    table_wagons_letter.select_string = null;
                    //    table_wagons_letter.obj.button(3).enable(false);
                    //    table_wagons_letter.obj.button(4).enable(false);
                    //}
                });
            },
            // Получить вагон по письму
            get_wagon_letter: function (data) {

                var get_status = function (close_status) {
                    if (!close_status) return null;
                    switch (close_status) {
                        case 0: return 'Вагон ушел согласно письма.';
                        case 1: return 'Вагон закрыт, согласно нового письма.';
                    }
                };

                return {
                    "id": data.id,
                    "num": data.num,
                    "close": data.close !== null ? data.close.replace(/T/g, ' ') : null,
                    "close_status": get_status(data.close_status),
                    "note": data.note,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                };
            },

        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        //if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
        pn_search.init();

        // Инициализация окна добавить править груз
        pn_add_edit.init(lang, user_name, function (result_add_edit) {
            if (result_add_edit) {
                // Загрузить новый справочник
                alert.clear_message();
                // Показать после изменения
                table_letters.load();

                //mode: 0, letter: result_add.letter, close: result_add.close, new: result_add.new;
                //var num = result_add_edit.num;
                if (result_add_edit.mode === 0) {
                    alert.out_info_message('Строка с новым письмом добавлена id=' + result_add_edit.letter + ' , закрыто вагонов ' + result_add_edit.close + ', добавлено новых ' + result_add_edit.new + '.');
                }
                if (result_add_edit.mode === 1) {
                    alert.out_info_message('Строка с письмом обновлена id=' + result_add_edit.letter);
                }
            }
        });
        table_letters.init();
        table_letters.load();
        //LockScreenOff();
    });
});