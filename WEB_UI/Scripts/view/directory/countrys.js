﻿jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_id': 'ID',
                'field_code_sng': 'Код СНГ',
                'field_code_europe': 'Код Europe',
                'field_code_iso': 'Код ISO',

                'field_countrys_name_ru': 'Полное название дороги (рус)',
                'field_countrys_name_en': 'Полное название дороги (eng)',
                'field_countrys_abbr_ru': 'Краткое название дороги (рус)',
                'field_countrys_abbr_en': 'Краткое название дороги (eng)',
                'field_create': 'Строка создана',
                'field_change': 'Строку правил',

                // Подписи кнопок
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
                'title_button_edit_group': 'Изменить по группе',

                'title_sheetName_excel': 'Справочник дорог',

            },
            'en':  //default language: English
            {

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
        //loadReference = function (callback) {
        //    LockScreen(langView('mess_load', langs));
        //    var count = 1;
        //    ids_dir.load(['railway'], false, function () {
        //        count -= 1;
        //        if (count === 0) {
        //            if (typeof callback === 'function') {
        //                callback();
        //            }
        //        }
        //    });
        //},
        //*************************************************************************************
        // ОКНО ДОБАВИТЬ ПРАВИТЬ
        //*************************************************************************************
        pn_add_edit = {
            obj: null,
            lang: null,
            user_name: null,
            ids_dir: null,
            alert: $('div#add_edit_alert'),                                             // Сообщения
            all_obj: null,                                                              // массив всех элементов формы 
            val: null,                                                                  // класс валидации
            select_id: null,                                                          // код строки
            select_obj: null,                                                           // строка
            select_rw_code: null,                                                       // код строки
            // Поля формы
            add_edit_code_sng: $('input#add_edit_code_sng'),
            add_edit_code_europe: $('input#add_edit_code_europe'),
            add_edit_code_iso: $('input#add_edit_code_iso'),
            add_edit_countrys_name_ru: $('input#add_edit_countrys_name_ru'),
            add_edit_countrys_name_en: $('input#add_edit_countrys_name_en'),
            add_edit_country_abbr_ru: $('input#add_edit_country_abbr_ru'),
            add_edit_country_abbr_en: $('input#add_edit_country_abbr_en'),
            // загрузка библиотек
            loadReference: function (callback) {
                LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_add_edit.ids_dir.load(['countrys'], false, function () {
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
                    // Соберем все элементы в массив
                    pn_add_edit.all_obj = $([])
                        .add(pn_add_edit.add_edit_code_sng)
                        .add(pn_add_edit.add_edit_code_europe)
                        .add(pn_add_edit.add_edit_code_iso)
                        .add(pn_add_edit.add_edit_countrys_name_ru)
                        .add(pn_add_edit.add_edit_countrys_name_en)
                        .add(pn_add_edit.add_edit_country_abbr_ru)
                        .add(pn_add_edit.add_edit_country_abbr_en);
                // создадим классы 
                //pn_add_edit.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                pn_add_edit.val = new VALIDATION(pn_add_edit.lang, pn_add_edit.alert, pn_add_edit.all_obj); // Создадим класс VALIDATION
                //pn_add_edit.table_car.init();
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
            },
            // открыть окно добавмить вагоны вручную
            Open: function (id) {
                pn_add_edit.loadReference(function () {
                    alert.clear_message();
                    pn_add_edit.val.clear_all();
                    pn_add_edit.select_id = id;
                    pn_add_edit.select_obj = null;
                    if (pn_add_edit.select_id) {
                        // Правим запись
                        pn_add_edit.obj.dialog("option", "title", "Править");
                        var contrys = pn_add_edit.ids_dir.getCountrys_Of_ID(pn_add_edit.select_id);
                        if (contrys) {
                            pn_add_edit.select_obj = contrys;
                            pn_add_edit.add_edit_code_sng.val(pn_add_edit.select_obj.code_sng);
                            pn_add_edit.add_edit_code_europe.val(pn_add_edit.select_obj.code_europe);
                            pn_add_edit.add_edit_code_iso.val(pn_add_edit.select_obj.code_iso);
                            pn_add_edit.add_edit_countrys_name_ru.val(pn_add_edit.select_obj.countrys_name_ru);
                            pn_add_edit.add_edit_countrys_name_en.val(pn_add_edit.select_obj.countrys_name_en);
                            pn_add_edit.add_edit_country_abbr_ru.val(pn_add_edit.select_obj.country_abbr_ru);
                            pn_add_edit.add_edit_country_abbr_en.val(pn_add_edit.select_obj.country_abbr_en);
                            pn_add_edit.obj.dialog("open");
                        } else {
                            pn_add_edit.val.clear_all();
                            pn_add_edit.val.out_error_message("Ошибка. Не могу найти строку с кодом = " + pn_add_edit.select_code);
                        }
                    } else {
                        pn_add_edit.obj.dialog("option", "title", "Добавить");
                        pn_add_edit.add_edit_code_sng.val('');
                        pn_add_edit.add_edit_code_europe.val('');
                        pn_add_edit.add_edit_code_iso.val('');
                        pn_add_edit.add_edit_countrys_name_ru.val('');
                        pn_add_edit.add_edit_countrys_name_en.val('');
                        pn_add_edit.add_edit_country_abbr_ru.val('');
                        pn_add_edit.add_edit_country_abbr_en.val('');
                        // Добавим запись
                        pn_add_edit.obj.dialog("open");
                    }
                    LockScreenOff();
                });
            },
            // Обновим дороги
            update_railway: function (text) {
                pn_add_edit.add_edit_railway = initAutocomplete(
                    pn_add_edit.add_edit_railway,
                    { lang: pn_add_edit.lang, minLength: 1 },
                    getAutocompleteList(pn_add_edit.ids_dir.getListRailway('code', 'railway_name', pn_add_edit.lang, null), 'text'),
                    pn_add_edit.view_railway_manual,
                    text
                );
            },
            // Отобразим и проверим выбрваную дорогу
            view_railway_manual: function (text) {
                var valid = true;
                var code = null;
                if (text) {
                    var objs = pn_add_edit.ids_dir.getRailway_Of_Name(text, 'railway_name', pn_add_edit.lang)
                    if (objs && objs.length > 0) {
                        code = objs[0].code;
                        pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_railway, "");
                        pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_railway_code, "");
                    } else {
                        pn_add_edit.val.set_control_error(pn_add_edit.add_edit_railway, "Указанной дороги страны нет в справочнике, создайте!");
                        valid = false;
                    }
                }
                else {
                    pn_add_edit.val.set_control_error(pn_add_edit.add_edit_railway, "Укажите дорогу страны");
                    valid = false;
                }
                pn_add_edit.add_edit_railway.val(text);
                pn_add_edit.add_edit_railway_code.val(code);
                pn_add_edit.select_rw_code = code;
                return valid;
            },
            // Валидация данных
            validation: function () {
                pn_add_edit.val.clear_all();
                var valid = true;

                if (pn_add_edit.select_id === null) {
                    // Если добавить проверка кодов
                    var code = get_input_number_value(pn_add_edit.add_edit_code_sng);
                    if (code > 0) {
                        var contrys = pn_add_edit.ids_dir.getCountrys_Of_CodeSNG(code)
                        if (contrys) {
                            pn_add_edit.val.set_control_error(pn_add_edit.add_edit_code_sng, "Страна с указаным кодом СНГ уже существует");
                            valid = valid & false;
                        }
                    }
                    code = get_input_number_value(pn_add_edit.add_edit_code_europe);
                    if (code > 0) {
                        contrys = pn_add_edit.ids_dir.getCountrys_Of_CodeEUROPE(code)
                        if (contrys) {
                            pn_add_edit.val.set_control_error(pn_add_edit.add_edit_code_europe, "Страна с указаным кодом Europe уже существует");
                            valid = valid & false;
                        }
                    }
                    code = get_input_number_value(pn_add_edit.add_edit_code_iso);
                    if (code) {
                        contrys = pn_add_edit.ids_dir.getCountrys_Of_CodeISO(code)
                        if (contrys) {
                            pn_add_edit.val.set_control_error(pn_add_edit.add_edit_code_iso, "Страна с указаным кодом ISO уже существует");
                            valid = valid & false;
                        }
                    }
                }
                var val_contrys = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_countrys_name_ru, "Не указано полное название страны на русском");
                valid = valid & val_contrys;
                if (val_contrys) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_countrys_name_ru, 1, 100, "Полное название страны должно быть в диапазоне от 1-100 символов");
                }
                val_contrys = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_countrys_name_en, "Не указано полное название страны на английском");
                valid = valid & val_contrys;
                if (val_contrys) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_countrys_name_en, 1, 100, "Полное название страны должно быть в диапазоне от 1-100 символов");
                }
                val_contrys = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_country_abbr_ru, "Не указано краткое название страны на русском");
                valid = valid & val_contrys;
                if (val_contrys) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_country_abbr_ru, 1, 10, "Краткое название страны должно быть в диапазоне от 1-10 символов");
                }
                val_contrys = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_country_abbr_en, "Не указано краткое название страны на английском");
                valid = valid & val_contrys;
                if (val_contrys) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_country_abbr_en, 1, 10, "Краткое название страны должно быть в диапазоне от 1-10 символов");
                }
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var valid = pn_add_edit.validation();
                if (valid) {
                    LockScreen(langView('mess_operation', langs));
                    var new_object = pn_add_edit.get_object();
                    if (pn_add_edit.select_obj) {
                        // Править
                        pn_add_edit.ids_dir.putCountrys(new_object, function (result_upd) {
                            if (result_upd > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ type: 0, result: result_upd });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. При обновлении строки страны, произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    } else {
                        // добавить
                        pn_add_edit.ids_dir.postCountrys(new_object, function (result_add) {
                            if (result_add > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ type: 1, result: result_add });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. При добавлении строки страны, произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    }
                }
            },
            // Получить новый груз с измененной группой
            get_object: function () {
                return {
                    id: pn_add_edit.select_id !== null ? pn_add_edit.select_id : 0,
                    code_sng: get_input_number_value(pn_add_edit.add_edit_code_sng),
                    code_europe: get_input_number_value(pn_add_edit.add_edit_code_europe),
                    code_iso: get_input_number_value(pn_add_edit.add_edit_code_iso),
                    countrys_name_ru: get_input_string_value(pn_add_edit.add_edit_countrys_name_ru),
                    countrys_name_en: get_input_string_value(pn_add_edit.add_edit_countrys_name_en) ,
                    country_abbr_ru: get_input_string_value(pn_add_edit.add_edit_country_abbr_ru) ,
                    country_abbr_en: get_input_string_value(pn_add_edit.add_edit_country_abbr_en) ,
                    create: pn_add_edit.select_obj ? pn_add_edit.select_obj.create : toISOStringTZ(new Date()),
                    create_user: pn_add_edit.select_obj ? pn_add_edit.select_obj.create_user : pn_add_edit.user_name,
                    change: pn_add_edit.select_obj ? toISOStringTZ(new Date()) : null,
                    change_user: pn_add_edit.select_obj ? pn_add_edit.user_name : null,
                }
            },
        },
        //*************************************************************************************
        // ОСНОВНАЯ ТАБЛИЦА
        //*************************************************************************************
        table_directory = {
            html_table: $('table#table-directory'),
            obj: null,
            list_directory: null,
            select_string: null,
            count_string: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[20, 50, -1], [20, 50, "All"]],
                    "pageLength": -1,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    colReorder: true,               // вкл. перетаскивание полей
                    select: {
                        style: "single"
                    },
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                    },
                    columns: [
                        {
                            data: function (row, type, val, meta) {
                                return row.id;
                            },
                            className: 'dt-body-right',
                            title: langView('field_id', langs), width: "30px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.code_sng;
                            },
                            className: 'dt-body-centr',
                            title: langView('field_code_sng', langs), width: "30px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.code_europe;
                            },
                            className: 'dt-body-centr',
                            title: langView('field_code_europe', langs), width: "30px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.code_iso;
                            },
                            className: 'dt-body-centr',
                            title: langView('field_code_iso', langs), width: "30px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.countrys_name_ru;
                            },
                            className: 'dt-body-left',
                            title: langView('field_countrys_name_ru', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.countrys_name_en;
                            },
                            className: 'dt-body-left',
                            title: langView('field_countrys_name_en', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.country_abbr_ru;
                            },
                            className: 'dt-body-left',
                            title: langView('field_countrys_abbr_ru', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.country_abbr_en;
                            },
                            className: 'dt-body-left',
                            title: langView('field_countrys_abbr_en', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.create_user + ' (' + getReplaceTOfDT(row.create) + ')';
                            },
                            className: 'dt-body-left',
                            title: langView('field_create', langs), width: "250px", orderable: false, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.change ? (row.change_user + ' (' + getReplaceTOfDT(row.change) + ')') : '';
                            },
                            className: 'dt-body-left',
                            title: langView('field_change', langs), width: "250px", orderable: false, searchable: true
                        },
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
                                    sheetName: langView('title_sheetName_excel', langs),
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
                        //{
                        //    text: langView('title_button_select_all', langs),
                        //    extend: 'selectAll',
                        //},
                        //{
                        //    text: langView('title_button_select_none', langs),
                        //    extend: 'selectNone',
                        //},
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
                                    pn_add_edit.Open(table_directory.select_string.id);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_del', langs),
                            action: function (e, dt, node, config) {
                                alert.clear_message();
                                dc.dialog_confirm('Open', 'Удалить?', 'Вы уверены что хотите удалить страну: ' + table_directory.select_string['countrys_name_' + lang], function (result) {
                                    if (result) {
                                        LockScreen(langView('mess_operation', langs));
                                        ids_dir.deleteCountrys(table_directory.select_string.id, function (result_del) {
                                            alert.clear_message();
                                            if (result_del > 0) {
                                                alert.out_info_message('Строка справочника - удалена!');
                                            } else {
                                                alert.out_error_message('Ошибка удаления строки справочника!');
                                            }
                                            //
                                            table_directory.load();
                                        });
                                    } else {

                                        alert.out_warning_message('Оперрация "Удалить страну" - Отменена!');
                                    }
                                });
                            },
                            enabled: false
                        },
                        //{
                        //    text: langView('title_button_edit_group', langs),
                        //    action: function (e, dt, node, config) {
                        //        //var items = table_directory.obj.rows({ selected: true });
                        //        //var row_cargo = table_directory.obj.rows(items[0]).data();
                        //        //pn_change_group.Open(row_cargo);
                        //    },
                        //    enabled: false
                        //},
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
                    //table_directory.obj.button(7).enable(true);
                    if (table_directory.count_string === 1) {
                        table_directory.obj.button(3).enable(true);
                        table_directory.obj.button(4).enable(true);
                    } else {

                        table_directory.obj.button(3).enable(false);
                        table_directory.obj.button(4).enable(false);
                    }
                } else {
                    table_directory.deselect();
                }
            },
            // Показать таблицу с данными
            view: function (data) {
                var id_select = table_directory.select_string ? table_directory.select_string.id : 0;
                table_directory.obj.clear();
                // Сбросить выделенный состав
                table_directory.deselect();
                if (data && data.length > 0) {
                    table_directory.obj.rows.add(data);
                }
                if (table_directory.count_string === 1) {
                    table_directory.obj.row('#' + id_select).select();
                }
                table_directory.obj.draw();
                LockScreenOff();
            },
            //
            load: function () {
                LockScreen(langView('mess_load_data', langs));
                ids_dir.getCountrys(function (list_directory) {
                    table_directory.list_directory = list_directory;
                    table_directory.view(table_directory.list_directory)
                });
            },
            // Deselect
            deselect: function () {
                table_directory.select_string = null;
                table_directory.obj.button(3).enable(false);
                table_directory.obj.button(4).enable(false);
                //table_directory.obj.button(7).enable(false);
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    //loadReference(function (result) {
    // Инициализация окна добавить править
    pn_add_edit.init(lang, user_name, function (result_add_edit) {
        if (result_add_edit) {
            // Загрузить новый справочник
            alert.clear_message();
            if (result_add_edit.type === 0) {
                alert.out_info_message('Строка справочника - обновлена!');
            }
            if (result_add_edit.type === 1) {
                alert.out_info_message('Строка справочника - добавлена!');
            }
            table_directory.load();
        }
    });
    table_directory.init();
    table_directory.load();
    //});


});