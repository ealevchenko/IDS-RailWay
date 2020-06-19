jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_id': 'Код',
                'field_group': 'Группа',
                'field_cargo_etsng_code': 'Код ЕТ СНГ',
                'field_cargo_etsng_name': 'Груз ЕТ СНГ',
                'field_cargo_name_ru': 'Груз в ИДС (рус)',
                'field_cargo_name_en': 'Груз в ИДС (анг)',
                'field_code_sap': 'Код по САП',
                'field_sending': 'Отправляемые',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал строку',
                'field_change': 'Строку правили',
                'field_change_user': 'Правил',

                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',
                'title_button_add': 'Добавить',
                'title_button_edit': 'Изменить',
                'title_button_del': 'Удалить',
                'title_button_edit_group': 'Присвоить группу',
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
            ids_dir.load(['cargo', 'cargo_group', 'cargo_etsng'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        ////*************************************************************************************
        //// МЕНДАЛЬНОЕ ОКНО ДИАЛОГ
        ////*************************************************************************************
        //dialog_confirm = {
        //    result: false,
        //    callback_ok: null,
        //    obj: $("#dialog-confirm").dialog({
        //        resizable: false,
        //        autoOpen: false,
        //        height: "auto",
        //        width: 500,
        //        modal: true,
        //        open: function (event, ui) {
        //        },
        //        close: function (event, ui) {
        //            if (typeof dialog_confirm.callback_ok === 'function') {
        //                dialog_confirm.callback_ok(dialog_confirm.result);
        //            }
        //        },
        //        classes: {
        //            "ui-dialog": "card",
        //            "ui-dialog-titlebar": "card-header bg-primary text-white",
        //            "ui-dialog-content": "card-body",
        //            "ui-dialog-buttonpane": "card-footer text-muted"
        //        },
        //        buttons: [
        //            {
        //                text: "Ок",
        //                class: "btn btn-outline-primary btn-sm",
        //                click: function () {
        //                    dialog_confirm.result = true;
        //                    $(this).dialog("close");
        //                }
        //            },
        //            {
        //                text: "Отмена",
        //                class: "btn btn-outline-primary btn-sm",
        //                click: function () {
        //                    $(this).dialog("close");
        //                }
        //            }]
        //    }),
        //    open: function (titlt, text, callback_ok) {
        //        dialog_confirm.result = false;
        //        dialog_confirm.obj.dialog("option", "title", titlt);
        //        $('p#dialog-confirm-text').text(text);
        //        dialog_confirm.callback_ok = callback_ok;
        //        dialog_confirm.obj.dialog("open");
        //    }
        //},
        //*************************************************************************************
        // ОКНО ИЗМЕНИТЬ ГРУППУ
        //*************************************************************************************
        pn_change_group = {
            obj: null,
            lang: null,
            user_name: null,
            ids_dir: null,
            alert: $('div#change_group_alert'),                                             // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            list_group: null,
            rows: null,
            // Поля формы
            change_group_cargo_group: $('select#change_group_cargo_group'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_change_group.ids_dir.load(['cargo', 'cargo_group', 'cargo_etsng'], false, function () {
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
                pn_change_group.ids_dir = new IDS_DIRECTORY(pn_change_group.lang), // Создадим класс IDS_DIRECTORY
                pn_change_group.loadReference(function () {
                    pn_change_group.list_group = pn_change_group.ids_dir.getListCargoGroup('id', 'cargo_group_name', pn_change_group.lang, null);
                    // Инициализация элементов
                    pn_change_group.change_group_cargo_group = cd_initSelect(
                        pn_change_group.change_group_cargo_group,
                        { lang: pn_change_group.lang },
                        pn_change_group.list_group,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id = Number($(this).val());
                        }, null);
                    // Соберем все элементы в массив
                    pn_change_group.all_obj = $([])
                        .add(pn_change_group.change_group_cargo_group)
                    ;
                    // создадим классы 

                    //pn_change_group.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                    pn_change_group.val = new VALIDATION(pn_change_group.lang, pn_change_group.alert, pn_change_group.all_obj); // Создадим класс VALIDATION
                    //pn_change_group.table_car.init();
                    pn_change_group.obj = $("div#change_group").dialog({
                        resizable: false,
                        title: 'Изменить группу груза',
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
            // открыть окно добавмить вагоны вручную
            Open: function (rows) {
                pn_change_group.rows = rows;
                if (rows && rows.length > 0) {
                    pn_change_group.obj.dialog("open");
                }
            },
            // Валидация данных
            validation: function () {
                pn_change_group.val.clear_all();
                var valid = true;
                valid = valid & pn_change_group.val.checkSelection(pn_change_group.change_group_cargo_group, "Выберите группу");
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var list_cargo = [];
                var valid = pn_change_group.validation();
                if (valid) {
                    // Получим список грузов для изменения
                    for (ir = 0; ir < pn_change_group.rows.length; ir++) {
                        var old_cargo = pn_change_group.ids_dir.getCargo_Of_ID(pn_change_group.rows[ir].id);
                        var new_cargo = pn_change_group.get_object(old_cargo, get_input_value(pn_change_group.change_group_cargo_group));
                        if (new_cargo) {
                            list_cargo.push(new_cargo);
                        }

                    }
                    // Обновим
                    if (list_cargo.length > 0) {
                        pn_change_group.ids_dir.putListCargo(list_cargo, function (result_upd) {
                            if (result_upd > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_change_group.obj.dialog("close");
                                    //LockScreenOff();
                                    callback_ok(result_upd);
                                }
                            } else {
                                pn_change_group.val.clear_all();
                                pn_change_group.val.out_error_message("Ошибка. При обновлении группы грузов произошла ошибка");
                                LockScreenOff();
                            }
                        });
                    }
                }
            },
            // Получить новый груз с измененной группой
            get_object: function (old_object, id_group) {
                if (old_object) {
                    return {
                        id: old_object.id,
                        id_group: id_group,
                        id_cargo_etsng: old_object.id_cargo_etsng,
                        cargo_name_ru: old_object.cargo_name_ru,
                        cargo_name_en: old_object.cargo_name_en,
                        code_sap: old_object.code_sap,
                        sending: old_object.sending,
                        create: old_object.create,
                        create_user: old_object.create_user,
                        change: toISOStringTZ(new Date()),
                        change_user: pn_change_group.user_name,
                    }
                }
                return null;
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
            select_id: null,                                                            // id строки
            select_obj: null,                                                           // строка
            // Поля формы
            add_edit_cargo_group: $('select#add_edit_cargo_group'),
            add_edit_cargo_etsng: $('select#add_edit_cargo_etsng'),
            add_edit_cargo_name_ru: $('textarea#add_edit_cargo_name_ru'),
            add_edit_cargo_name_en: $('textarea#add_edit_cargo_name_en'),
            add_edit_code_sap: $('input#add_edit_code_sap'),
            add_edit_sending: $('input#add_edit_sending'),

            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_add_edit.ids_dir.load(['cargo', 'cargo_group', 'cargo_etsng'], false, function () {
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
                    pn_add_edit.add_edit_cargo_group = cd_initSelect(
                        pn_add_edit.add_edit_cargo_group,
                        { lang: pn_add_edit.lang },
                        pn_add_edit.ids_dir.getListCargoGroup('id', 'cargo_group_name', pn_add_edit.lang, null),
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id = Number($(this).val());
                        }, null);
                    pn_add_edit.add_edit_cargo_etsng = cd_initSelect(
                        pn_add_edit.add_edit_cargo_etsng,
                        { lang: pn_add_edit.lang },
                        pn_add_edit.ids_dir.getListCargoETSNG('id', 'cargo_etsng_name', pn_add_edit.lang, null),
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id = Number($(this).val());
                        }, null);
                    // Соберем все элементы в массив
                    pn_add_edit.all_obj = $([])
                        .add(pn_add_edit.add_edit_cargo_group)
                        .add(pn_add_edit.add_edit_cargo_etsng)
                        .add(pn_add_edit.add_edit_cargo_name_ru)
                        .add(pn_add_edit.add_edit_cargo_name_en)
                        .add(pn_add_edit.add_edit_code_sap)
                        .add(pn_add_edit.add_edit_sending)
                    ;
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
                });

            },
            // открыть окно добавмить вагоны вручную
            Open: function (id) {
                pn_add_edit.select_id = id;
                pn_add_edit.select_obj = null;
                if (pn_add_edit.select_id) {
                    // Правим запись
                    pn_add_edit.obj.dialog("option", "title", "Править груз");
                    pn_add_edit.ids_dir.getCargoOfID(pn_add_edit.select_id, function (result_obj) {
                        if (result_obj) {
                            pn_add_edit.select_obj = result_obj;
                            pn_add_edit.add_edit_cargo_group.val(result_obj.id_group);
                            pn_add_edit.add_edit_cargo_etsng.val(result_obj.id_cargo_etsng);
                            pn_add_edit.add_edit_cargo_name_ru.val(result_obj.cargo_name_ru);
                            pn_add_edit.add_edit_cargo_name_en.val(result_obj.cargo_name_en);
                            pn_add_edit.add_edit_code_sap.val(result_obj.code_sap);
                            pn_add_edit.add_edit_sending.prop('checked', result_obj.sending);
                            pn_add_edit.obj.dialog("open");

                        }
                        //else {
                        //    pn_add_edit.val.clear_all();
                        //    pn_add_edit.val.out_error_message("Ошибка. Не могу найти строку по id = " + pn_add_edit.select_id);
                        //}
                    });




                } else {
                    pn_add_edit.obj.dialog("option", "title", "Добавить груз");
                    pn_add_edit.add_edit_cargo_group.val(-1);
                    pn_add_edit.add_edit_cargo_etsng.val(-1);
                    pn_add_edit.add_edit_cargo_name_ru.val('');
                    pn_add_edit.add_edit_cargo_name_en.val('');
                    pn_add_edit.add_edit_code_sap.val('');
                    pn_add_edit.add_edit_sending.prop('checked', false);
                    // Добавим запись
                    pn_add_edit.obj.dialog("open");
                }
            },
            // Валидация данных
            validation: function () {
                pn_add_edit.val.clear_all();
                var valid = true;
                valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_cargo_group, "Выберите группу");
                valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_cargo_etsng, "Выберите груз из справочника ЕТ СНГ");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_cargo_name_ru, "Не указано наименование груза на русском языке");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_cargo_name_en, "Не указано наименование груза на английском языке");
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var valid = pn_add_edit.validation();
                if (valid) {
                    var new_object = pn_add_edit.get_object();

                    if (pn_add_edit.select_obj) {
                        // Править
                        pn_add_edit.ids_dir.putCargo(new_object, function (result_upd) {
                            if (result_upd > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ type: 0, result: result_upd });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. При обновлении строки грузов, произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    } else {
                        // добавить
                        pn_add_edit.ids_dir.postCargo(new_object, function (result_add) {
                            if (result_add > 0) {
                                if (typeof callback_ok === 'function') {
                                    pn_add_edit.obj.dialog("close");
                                    callback_ok({ type: 1, result: result_add });
                                }
                            } else {
                                pn_add_edit.val.clear_all();
                                pn_add_edit.val.out_error_message("Ошибка. При добавлении строки грузов, произошла ошибка!");
                                LockScreenOff();
                            }
                        });
                    }
                }
            },
            // Получить новый груз с измененной группой
            get_object: function () {
                return {
                    id: pn_add_edit.select_obj ? pn_add_edit.select_obj.id : 0,
                    id_group: get_select_number_value(pn_add_edit.add_edit_cargo_group),
                    id_cargo_etsng: get_select_number_value(pn_add_edit.add_edit_cargo_etsng),
                    cargo_name_ru: pn_add_edit.add_edit_cargo_name_ru.val(),
                    cargo_name_en: pn_add_edit.add_edit_cargo_name_en.val(),
                    code_sap: pn_add_edit.add_edit_code_sap.val(),
                    sending: pn_add_edit.add_edit_sending.prop('checked'),
                    create: pn_add_edit.select_obj ? pn_add_edit.select_obj.create : toISOStringTZ(new Date()),
                    create_user: pn_add_edit.select_obj ? pn_add_edit.select_obj.create_user : pn_add_edit.user_name,
                    change: pn_add_edit.select_obj ? toISOStringTZ(new Date()) : null,
                    change_user: pn_add_edit.select_obj ? pn_add_edit.user_name : null,
                }
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
                    "scrollX": true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                        if (data.id_group === 0) {
                            $('td', row).eq(1).addClass('warning');
                        }
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
                        { data: "id", title: langView('field_id', langs), width: "50px", orderable: true, searchable: true },
                        { data: "group", title: langView('field_group', langs), width: "50px", orderable: true, searchable: true },
                        { data: "cargo_etsng_code", title: langView('field_cargo_etsng_code', langs), width: "50px", orderable: true, searchable: true },
                        { data: "cargo_etsng_name", title: langView('field_cargo_etsng_name', langs), width: "150px", orderable: true, searchable: true },
                        { data: "cargo_name_ru", title: langView('field_cargo_name_ru', langs), width: "150px", orderable: true, searchable: true },
                        { data: "cargo_name_en", title: langView('field_cargo_name_en', langs), width: "150px", orderable: true, searchable: true },
                        { data: "code_sap", title: langView('field_code_sap', langs), width: "50px", orderable: true, searchable: true },
                        { data: "sending", title: langView('field_sending', langs), width: "50px", orderable: true, searchable: true },
                        { data: "create", title: langView('field_create', langs), width: "50px", orderable: true, searchable: true },
                        { data: "create_user", title: langView('field_create_user', langs), width: "50px", orderable: true, searchable: true },
                        { data: "change", title: langView('field_change', langs), width: "50px", orderable: true, searchable: true },
                        { data: "change_user", title: langView('field_change_user', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "", title: langView('field_', langs), width: "50px", orderable: true, searchable: true },

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
                            sheetName: 'Поезда по прибытию',
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

                                dc.dialog_confirm('Open','Удалить?', 'Вы уверены что хотите удалить строку : ' + table_directory.select_string.cargo_name_ru, function (result) {
                                    if (result) {
                                        ids_dir.deleteCargo(table_directory.select_string.id, function (result_del) {
                                            alert.clear_message();
                                            if (result_del > 0) {
                                                alert.out_info_message('Строка справочника - удалена!');
                                            } else {
                                                alert.out_error_message('Ошибка удаления строки справочника!');
                                            }
                                            //
                                            ids_dir.loadCargo(function () {
                                                table_directory.view(ids_dir.list_cargo);

                                            });
                                        });
                                    }
                                });

                                //dialog_confirm.open('Удалить?', 'Вы уверены что хотите удалить строку : ' + table_directory.select_string.cargo_name_ru, function (result) {
                                //    if (result) {
                                //        ids_dir.deleteCargo(table_directory.select_string.id, function (result_del) {
                                //            alert.clear_message();
                                //            if (result_del > 0) {
                                //                alert.out_info_message('Строка справочника - удалена!');
                                //            } else {
                                //                alert.out_error_message('Ошибка удаления строки справочника!');
                                //            }
                                //            //
                                //            ids_dir.loadCargo(function () {
                                //                table_directory.view(ids_dir.list_cargo);

                                //            });
                                //        });
                                //    }
                                //});
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_edit_group', langs),
                            action: function (e, dt, node, config) {
                                var items = table_directory.obj.rows({ selected: true });
                                var row_cargo = table_directory.obj.rows(items[0]).data();
                                pn_change_group.Open(row_cargo);
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
                    table_directory.obj.button(7).enable(true);
                    if (table_directory.count_string === 1) {
                        table_directory.obj.button(5).enable(true);
                        table_directory.obj.button(6).enable(true);
                    } else {

                        table_directory.obj.button(5).enable(false);
                        table_directory.obj.button(6).enable(false);
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
                $.each(data, function (i, el) {
                    table_directory.obj.row.add(table_directory.get_string(el));
                });
                //table_directory.obj.order([3, 'asc']);
                if (table_directory.count_string === 1) {
                    table_directory.obj.row('#' + id_select).select();
                }
                table_directory.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_string: function (data) {
                ////var cs = mt.getConsignee_Internal_Of_ID(data.consignee);
                //var car_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
                //    return i.arrival ? true : false;
                //}) : [];
                //var car_not_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
                //    return !i.arrival ? true : false;
                //}) : [];

                return {
                    "id": data.id,
                    //"group": (data.id_group !== null && ids_dir !== null ? ids_dir.getValue_CargoGroup_Of_ID(data.id_group, 'cargo_group_name', lang) : null),
                    "group": (data.Directory_CargoGroup ? ids_dir.getValueObj(data.Directory_CargoGroup, 'cargo_group_name', lang) : null),
                    "id_group": data.id_group,
                    "id_cargo_etsng": data.id_cargo_etsng,
                    "cargo_etsng_code": (data.Directory_CargoETSNG ? ids_dir.getValueObj(data.Directory_CargoETSNG, 'code') : null),
                    "cargo_etsng_name": (data.Directory_CargoETSNG ? ids_dir.getValueObj(data.Directory_CargoETSNG, 'cargo_etsng_name', lang) : null),
                    "cargo_name_ru": data.cargo_name_ru,
                    "cargo_name_en": data.cargo_name_en,
                    "code_sap": data.code_sap,
                    "sending": data.sending,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                    //"id_arrived": data.id_arrived,
                    //"id_sostav": data.id_sostav,
                    //"train": data.train,
                    //"composition_index": data.composition_index,
                    //"date_arrival": data.date_arrival.replace(/T/g, ' '),
                    //"date_adoption": data.date_adoption !== null ? data.date_adoption.replace(/T/g, ' ') : null,
                    //"date_adoption_act": data.date_adoption_act !== null ? data.date_adoption_act.replace(/T/g, ' ') : null,
                    //"id_station_from": data.id_station_from,

                    //"id_station_on": data.id_station_on,
                    //"station_on": data.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_on, 'station_name', lang) : '',
                    //"id_way": data.id_way,
                    //"num_doc": data.num_doc,
                    //"count": data.ArrivalCars !== null ? data.ArrivalCars.length : 0,
                    //"count_arrival": car_arrival !== null ? car_arrival.length : 0,
                    //"count_not_arrival": car_not_arrival !== null ? car_not_arrival.length : 0,
                    //"count_all": (car_arrival !== null ? car_arrival.length : 0) + ' - ' + (car_not_arrival !== null ? car_not_arrival.length : 0),
                    //"status": data.status,
                    //"note": data.note,
                    //"create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    //"create_user": data.create_user,
                    //"change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    //"change_user": data.change_user,
                    //"create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    //"change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
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
                table_directory.obj.button(5).enable(false);
                table_directory.obj.button(6).enable(false);
                table_directory.obj.button(7).enable(false);
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        // Инициализация окна править группу грузов
        pn_change_group.init(lang, user_name, function (result_change_group) {
            if (result_change_group > 0) {
                // Загрузить новый справочник
                alert.clear_message();
                alert.out_info_message('Обновлены группы грузов в количестве - ' + result_change_group + ' записей');
                ids_dir.loadCargo(function () {
                    table_directory.view(ids_dir.list_cargo);

                });
            }
        });
        // Инициализация окна добавить править груз
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

                ids_dir.loadCargo(function () {
                    table_directory.view(ids_dir.list_cargo);

                });
            }
        });
        table_directory.init();
        table_directory.view(ids_dir.list_cargo);
    });


});