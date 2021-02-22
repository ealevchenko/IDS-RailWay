jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_code': 'Код',
                'field_inlandrailway_name_ru': 'Полное название дороги (рус)',
                'field_inlandrailway_name_en': 'Полное название дороги (eng)',
                'field_inlandrailway_abbr_ru': 'Краткое название дороги (рус)',
                'field_inlandrailway_abbr_en': 'Краткое название дороги (eng)',
                'field_code_railway': 'Дорога страны',

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
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_dir.load(['railway'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
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
            select_code: null,                                                          // код строки
            select_obj: null,                                                           // строка
            select_rw_code: null,                                                       // код строки
            // Поля формы
            add_edit_code: $('input#add_edit_code'),
            add_edit_inlandrailway_name_ru: $('textarea#add_edit_inlandrailway_name_ru'),
            add_edit_inlandrailway_name_en: $('textarea#add_edit_inlandrailway_name_en'),
            add_edit_inlandrailway_abbr_ru: $('input#add_edit_inlandrailway_abbr_ru'),
            add_edit_inlandrailway_abbr_en: $('input#add_edit_inlandrailway_abbr_en'),
            add_edit_railway_code: $('input#add_edit_railway_code'),
            add_edit_railway: $('textarea#add_edit_railway'),
            // загрузка библиотек
            loadReference: function (callback) {
                LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_add_edit.ids_dir.load(['inlandrailway', 'railway'], false, function () {
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
                        .add(pn_add_edit.add_edit_code)
                    .add(pn_add_edit.add_edit_inlandrailway_name_ru)
                    .add(pn_add_edit.add_edit_inlandrailway_name_en)
                    .add(pn_add_edit.add_edit_inlandrailway_abbr_ru)
                    .add(pn_add_edit.add_edit_inlandrailway_abbr_en)
                    .add(pn_add_edit.add_edit_railway_code)
                    .add(pn_add_edit.add_edit_railway);
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
            },
            // открыть окно добавмить вагоны вручную
            Open: function (code) {
                pn_add_edit.loadReference(function () {
                    alert.clear_message();
                    pn_add_edit.val.clear_all();
                    pn_add_edit.select_code = code;
                    pn_add_edit.select_obj = null;
                    if (pn_add_edit.select_code) {
                        // Правим запись
                        pn_add_edit.obj.dialog("option", "title", "Править");
                        var ir = pn_add_edit.ids_dir.getInlandRailway_Of_Code(code);
                        if (ir) {
                            pn_add_edit.select_obj = ir;
                            pn_add_edit.add_edit_code.val(pn_add_edit.select_obj.code).prop("disabled", true);
                            pn_add_edit.add_edit_inlandrailway_name_ru.val(pn_add_edit.select_obj.inlandrailway_name_ru);
                            pn_add_edit.add_edit_inlandrailway_name_en.val(pn_add_edit.select_obj.inlandrailway_name_en);
                            pn_add_edit.add_edit_inlandrailway_abbr_ru.val(pn_add_edit.select_obj.inlandrailway_abbr_ru);
                            pn_add_edit.add_edit_inlandrailway_abbr_en.val(pn_add_edit.select_obj.inlandrailway_abbr_en);
                            var railway = pn_add_edit.ids_dir.getRailway_Of_Code(ir.code_railway)
                            pn_add_edit.add_edit_railway_code.val(railway ? railway.code: '');
                            pn_add_edit.update_railway(railway ? railway['railway_name_' + pn_add_edit.lang] : '');
                            pn_add_edit.obj.dialog("open");
                        } else {
                            pn_add_edit.val.clear_all();
                            pn_add_edit.val.out_error_message("Ошибка. Не могу найти строку с кодом = " + pn_add_edit.select_code);
                        }
                    } else {
                        pn_add_edit.obj.dialog("option", "title", "Добавить");
                        pn_add_edit.add_edit_code.val('').prop("disabled", false);
                        pn_add_edit.add_edit_inlandrailway_name_ru.val('');
                        pn_add_edit.add_edit_inlandrailway_name_en.val('');
                        pn_add_edit.add_edit_inlandrailway_abbr_ru.val('');
                        pn_add_edit.add_edit_inlandrailway_abbr_en.val('');
                        pn_add_edit.add_edit_railway_code.val('');
                        pn_add_edit.update_railway('');
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
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_code, "Не указан код внутренней дороги");
                if (pn_add_edit.select_code === null) {
                    // Добавлена дорога
                    var ir = pn_add_edit.ids_dir.getInlandRailway_Of_Code(get_input_number_value(pn_add_edit.add_edit_code))
                    if (ir) {
                        pn_add_edit.val.set_control_error(pn_add_edit.add_edit_code, "Внутренняя дорога с таким кодом существует");
                        valid = valid & false;
                    }
                }
                var val_ir = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_inlandrailway_name_ru, "Не указано полное название дороги на русском");
                valid = valid & val_ir;
                if (val_ir) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_inlandrailway_name_ru, 1, 150, "Полное название дороги должно быть в диапазоне от 1-150 символов");
                }
                var val_ir = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_inlandrailway_name_en, "Не указано полное название дороги на английском");
                valid = valid & val_ir;
                if (val_ir) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_inlandrailway_name_en, 1, 150, "Полное название дороги должно быть в диапазоне от 1-150 символов");
                }
                val_ir = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_inlandrailway_abbr_ru, "Не указано краткое название дороги на русском");
                valid = valid & val_ir;
                if (val_ir) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_inlandrailway_abbr_ru, 1, 50, "Краткое название дороги должно быть в диапазоне от 1-50 символов");
                }
                var val_ir = pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_inlandrailway_abbr_en, "Не указано краткое название дороги на английском");
                valid = valid & val_ir;
                if (val_ir) {
                    valid = valid & pn_add_edit.val.checkInputOfLength(pn_add_edit.add_edit_inlandrailway_abbr_en, 1, 50, "Краткое название дороги должно быть в диапазоне от 1-50 символов");
                }
                valid = valid & pn_add_edit.view_railway_manual(pn_add_edit.add_edit_railway.val());
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
                        pn_add_edit.ids_dir.putInlandRailway(new_object, function (result_upd) {
                            if (result_upd > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ type: 0, result: result_upd });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. При обновлении строки внутренней дороги, произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    } else {
                        // добавить
                        pn_add_edit.ids_dir.postInlandRailway(new_object, function (result_add) {
                            if (result_add > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ type: 1, result: result_add });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. При добавлении строки внутренней дороги, произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    }
                }
            },
            // Получить новый груз с измененной группой
            get_object: function () {
                return {
                    code: get_input_number_value(pn_add_edit.add_edit_code),
                    inlandrailway_name_ru: get_input_string_value(pn_add_edit.add_edit_inlandrailway_name_ru),
                    inlandrailway_name_en: get_input_string_value(pn_add_edit.add_edit_inlandrailway_name_en),
                    inlandrailway_abbr_ru: get_input_string_value(pn_add_edit.add_edit_inlandrailway_abbr_ru),
                    inlandrailway_abbr_en: get_input_string_value(pn_add_edit.add_edit_inlandrailway_abbr_en),
                    code_railway: pn_add_edit.select_rw_code,
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
                    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                    "pageLength": 10,
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
                        $(row).attr('id', data.code);
                    },
                    columns: [
                        {
                            //data: "id",
                            data: function (row, type, val, meta) {
                                return row.code;
                            },
                            className: 'dt-body-right',
                            title: langView('field_code', langs), width: "30px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.inlandrailway_name_ru;
                            },
                            className: 'dt-body-left',
                            title: langView('field_inlandrailway_name_ru', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.inlandrailway_name_en;
                            },
                            className: 'dt-body-left',
                            title: langView('field_inlandrailway_name_en', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.inlandrailway_abbr_ru;
                            },
                            className: 'dt-body-left',
                            title: langView('field_inlandrailway_abbr_ru', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.inlandrailway_abbr_en;
                            },
                            className: 'dt-body-left',
                            title: langView('field_inlandrailway_abbr_en', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {

                                var railway = ids_dir.getRailway_Of_Code(row.code_railway)
                                return railway ? railway['railway_name_' + lang] : '';
                            },
                            className: 'dt-body-left',
                            title: langView('field_code_railway', langs), width: "200px", orderable: true, searchable: true
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
                                    pn_add_edit.Open(table_directory.select_string.code);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_del', langs),
                            action: function (e, dt, node, config) {
                                alert.clear_message();
                                dc.dialog_confirm('Open', 'Удалить?', 'Вы уверены что хотите удалить внутреннюю дорогу : ' + table_directory.select_string['inlandrailway_name_' + lang], function (result) {
                                    if (result) {
                                        LockScreen(langView('mess_operation', langs));
                                        ids_dir.deleteInlandRailway(table_directory.select_string.code, function (result_del) {
                                            alert.clear_message();
                                            if (result_del > 0) {
                                                alert.out_info_message('Строка справочника - удалена!');
                                            } else {
                                                alert.out_error_message('Ошибка удаления строки справочника!');
                                            }
                                            //
                                            ids_dir.loadCargo(function () {
                                                table_directory.load();

                                            });
                                        });
                                    } else {

                                        alert.out_warning_message('Оперрация "Удалить внутреннюю дорогу" - Отменена!');
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
                var id_select = table_directory.select_string ? table_directory.select_string.code : 0;
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
                ids_dir.getInlandRailway(function (list_directory) {
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
    loadReference(function (result) {
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
    });


});