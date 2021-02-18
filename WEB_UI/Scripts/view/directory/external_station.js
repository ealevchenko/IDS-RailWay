jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_code': 'Код',
                'field_station_name_ru': 'Станция(рус)',
                'field_station_name_en': 'Станция(eng)',
                'field_code_inlandrailway': 'Принадлежит дороге',
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
                'title_button_edit': 'Изменить',
                'title_button_del': 'Удалить',
                'title_button_edit_group': 'Изменить по группе',

            },
            'en':  //default language: English
            {
                'field_code': 'Code',
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
            ids_dir.load(['inlandrailway'], false, function () {
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
            select_ir_code: null,                                                       // код строки
            // Поля формы
            add_edit_code: $('input#add_edit_code'),
            add_edit_station_name_ru: $('input#add_edit_station_name_ru'),
            add_edit_station_name_en: $('input#add_edit_station_name_en'),
            add_edit_inlandrailway: $('input#add_edit_inlandrailway'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_add_edit.ids_dir.load(['external_station', 'inlandrailway'], false, function () {
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

                        //pn_add_edit.add_edit_cargo_group = cd_initSelect(
                        //    pn_add_edit.add_edit_cargo_group,
                        //    { lang: pn_add_edit.lang },
                        //    pn_add_edit.ids_dir.getListCargoGroup('id', 'cargo_group_name', pn_add_edit.lang, null),
                        //    null,
                        //    -1,
                        //    function (event) {
                        //        event.preventDefault();
                        //        var id = Number($(this).val());
                        //    }, null);
                        //pn_add_edit.add_edit_cargo_etsng = cd_initSelect(
                        //    pn_add_edit.add_edit_cargo_etsng,
                        //    { lang: pn_add_edit.lang },
                        //    pn_add_edit.ids_dir.getListCargoETSNG('id', 'cargo_etsng_name', pn_add_edit.lang, null),
                        //    null,
                        //    -1,
                        //    function (event) {
                        //        event.preventDefault();
                        //        var id = Number($(this).val());
                        //    }, null);
                        // Соберем все элементы в массив
                        pn_add_edit.all_obj = $([])
                            .add(pn_add_edit.add_edit_code)
                            .add(pn_add_edit.add_edit_station_name_ru)
                            .add(pn_add_edit.add_edit_station_name_en)
                            .add(pn_add_edit.add_edit_inlandrailway)
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
            // открыть окно добавмить вагоны вручную
            Open: function (code) {
                pn_add_edit.val.clear_all();
                pn_add_edit.select_code = code;
                pn_add_edit.select_obj = null;
                if (pn_add_edit.select_code) {
                    // Правим запись
                    pn_add_edit.obj.dialog("option", "title", "Править");
                    var ir = pn_add_edit.ids_dir.getExternalStation_Of_Code(code);
                    if (ir) {
                        pn_add_edit.select_obj = ir;
                        pn_add_edit.add_edit_code.val(pn_add_edit.select_obj.code).prop("disabled", true);
                        pn_add_edit.add_edit_station_name_ru.val(pn_add_edit.select_obj.station_name_ru);
                        pn_add_edit.add_edit_station_name_en.val(pn_add_edit.select_obj.station_name_en);
                        var inlandrailway = ids_dir.getInlandRailway_Of_Code(ir.code_inlandrailway)
                        pn_add_edit.update_inland_railway(inlandrailway ? inlandrailway['inlandrailway_name_' + pn_add_edit.lang] : '');
                        pn_add_edit.obj.dialog("open");
                    } else {
                        pn_add_edit.val.clear_all();
                        pn_add_edit.val.out_error_message("Ошибка. Не могу найти строку с кодом = " + pn_add_edit.select_code);
                    }
                } else {
                    pn_add_edit.obj.dialog("option", "title", "Добавить");
                    pn_add_edit.add_edit_code.val('').prop("disabled", false);
                    pn_add_edit.add_edit_station_name_ru.val('');
                    pn_add_edit.add_edit_station_name_en.val('');
                    pn_add_edit.update_inland_railway('');
                    // Добавим запись
                    pn_add_edit.obj.dialog("open");
                }
            },
            // 
            update_inland_railway: function (text) {
                pn_add_edit.add_edit_inlandrailway = initAutocomplete(
                    pn_add_edit.add_edit_inlandrailway,
                    { lang: pn_add_edit.lang, minLength: 1 },
                    getAutocompleteListText(pn_add_edit.ids_dir.getListInlandRailway('code', 'inlandrailway_name', pn_add_edit.lang, null), 'text'),
                    pn_add_edit.view_inland_railway_manual,
                    text
                );
            },
            //
            view_inland_railway_manual: function (text) {
                var valid = true;
                var code = null;
                if (text) {
                    var objs = pn_add_edit.ids_dir.getInlandRailway_Of_Name(text, 'inlandrailway_name', pn_add_edit.lang)
                    if (objs && objs.length > 0) {
                        code = objs[0].code;
                        pn_add_edit.val.set_control_ok(pn_add_edit.add_edit_inlandrailway, "");
                    } else {
                        pn_add_edit.val.set_control_error(pn_add_edit.add_edit_inlandrailway, "Указанной дороги нет в справочнике, создайте!");
                        valid = false;
                    }
                }
                else {
                    pn_add_edit.val.set_control_error(pn_add_edit.add_edit_inlandrailway, "Укажите дорогу");
                    valid = false;
                }
                pn_add_edit.add_edit_inlandrailway.val(text);
                pn_add_edit.select_ir_code = code;
                return valid;
            },
            // Валидация данных
            validation: function () {
                pn_add_edit.val.clear_all();
                var valid = true;
                //valid = valid & pn_add_edit.val.checkSelection(pn_add_edit.add_edit_cargo_group, "Выберите группу");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_code, "Не указан код станции");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_station_name_ru, "Не указано наименование станции на русском языке");
                valid = valid & pn_add_edit.val.checkInputOfNull(pn_add_edit.add_edit_station_name_en, "Не указано наименование станции на английском языке");
                valid = valid & pn_add_edit.view_inland_railway_manual(pn_add_edit.add_edit_inlandrailway.val());

                //if (pn_add_edit.select_ir_code !== null) {
                //    var ir = pn_add_edit.ids_dir.getInlandRailway_Of_Code(pn_add_edit.select_ir_code);
                //    if (!ir) {
                //        pn_add_edit.val.set_control_error(pn_add_edit.add_edit_inlandrailway, "Указанной дороги нет в справочнике, создайте!");
                //        valid = valid & false;
                //    }
                //} else {
                //    pn_add_edit.val.set_control_error(pn_add_edit.add_edit_inlandrailway, "Укажите дорогу");
                //    valid = valid & false;
                //}
                return valid;
            },
            // Сохранить прибытие состава
            save: function (callback_ok) {
                var valid = pn_add_edit.validation();
                if (valid) {
                    //var new_object = pn_add_edit.get_object();

                    //if (pn_add_edit.select_obj) {
                    //    // Править
                    //    pn_add_edit.ids_dir.putCargo(new_object, function (result_upd) {
                    //        if (result_upd > 0) {
                    //            if (typeof callback_ok === 'function') {
                    //                pn_add_edit.obj.dialog("close");
                    //                callback_ok({ type: 0, result: result_upd });
                    //            }
                    //        } else {
                    //            pn_add_edit.val.clear_all();
                    //            pn_add_edit.val.out_error_message("Ошибка. При обновлении строки грузов, произошла ошибка!");
                    //            LockScreenOff();
                    //        }
                    //    });
                    //} else {
                    //    // добавить
                    //    pn_add_edit.ids_dir.postCargo(new_object, function (result_add) {
                    //        if (result_add > 0) {
                    //            if (typeof callback_ok === 'function') {
                    //                pn_add_edit.obj.dialog("close");
                    //                callback_ok({ type: 1, result: result_add });
                    //            }
                    //        } else {
                    //            pn_add_edit.val.clear_all();
                    //            pn_add_edit.val.out_error_message("Ошибка. При добавлении строки грузов, произошла ошибка!");
                    //            LockScreenOff();
                    //        }
                    //    });
                    //}
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
                                return row.station_name_ru;
                            },
                            className: 'dt-body-left',
                            title: langView('field_station_name_ru', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.station_name_en;
                            },
                            className: 'dt-body-left',
                            title: langView('field_station_name_en', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {

                                var inlandrailway = ids_dir.getInlandRailway_Of_Code(row.code_inlandrailway)
                                return inlandrailway ? inlandrailway['inlandrailway_name_' + lang] : '';
                            },
                            className: 'dt-body-left',
                            title: langView('field_code_inlandrailway', langs), width: "200px", orderable: true, searchable: true
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
                                    sheetName: 'Поезда по прибытию',
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
                            text: langView('title_button_select_all', langs),
                            extend: 'selectAll',
                        },
                        {
                            text: langView('title_button_select_none', langs),
                            extend: 'selectNone',
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
                                    pn_add_edit.Open(table_directory.select_string.code);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_del', langs),
                            action: function (e, dt, node, config) {
                                dc.dialog_confirm('Open', 'Удалить?', 'Вы уверены что хотите удалить станцию : ' + table_directory.select_string['station_name_' + lang], function (result) {
                                    alert.clear_message();
                                    if (result) {
                                        //ids_dir.deleteCargo(table_directory.select_string.id, function (result_del) {
                                        //    alert.clear_message();
                                        //    if (result_del > 0) {
                                        //        alert.out_info_message('Строка справочника - удалена!');
                                        //    } else {
                                        //        alert.out_error_message('Ошибка удаления строки справочника!');
                                        //    }
                                        //    //
                                        //    ids_dir.loadCargo(function () {
                                        //        table_directory.view(ids_dir.list_cargo);

                                        //    });
                                        //});
                                    } else {

                                        alert.out_warning_message('Оперрация "Удалить станцию" - Отменена!');
                                    }
                                });
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_edit_group', langs),
                            action: function (e, dt, node, config) {
                                //var items = table_directory.obj.rows({ selected: true });
                                //var row_cargo = table_directory.obj.rows(items[0]).data();
                                //pn_change_group.Open(row_cargo);
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
                ids_dir.getExternalStation(function (list_directory) {
                    table_directory.list_directory = list_directory;
                    table_directory.view(table_directory.list_directory)
                });
            },
            //// Получить полную информацию по составау
            //get_string: function (data) {
            //    ////var cs = mt.getConsignee_Internal_Of_ID(data.consignee);
            //    //var car_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
            //    //    return i.arrival ? true : false;
            //    //}) : [];
            //    //var car_not_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
            //    //    return !i.arrival ? true : false;
            //    //}) : [];

            //    return {
            //        "id": data.id,
            //        //"group": (data.id_group !== null && ids_dir !== null ? ids_dir.getValue_CargoGroup_Of_ID(data.id_group, 'cargo_group_name', lang) : null),
            //        "group": (data.Directory_CargoGroup ? ids_dir.getValueObj(data.Directory_CargoGroup, 'cargo_group_name', lang) : null),
            //        "id_group": data.id_group,
            //        "id_cargo_etsng": data.id_cargo_etsng,
            //        "cargo_etsng_code": (data.Directory_CargoETSNG ? ids_dir.getValueObj(data.Directory_CargoETSNG, 'code') : null),
            //        "cargo_etsng_name": (data.Directory_CargoETSNG ? ids_dir.getValueObj(data.Directory_CargoETSNG, 'cargo_etsng_name', lang) : null),
            //        "cargo_name_ru": data.cargo_name_ru,
            //        "cargo_name_en": data.cargo_name_en,
            //        "code_sap": data.code_sap,
            //        "sending": data.sending,
            //        "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
            //        "create_user": data.create_user,
            //        "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
            //        "change_user": data.change_user,
            //        //"id_arrived": data.id_arrived,
            //        //"id_sostav": data.id_sostav,
            //        //"train": data.train,
            //        //"composition_index": data.composition_index,
            //        //"date_arrival": data.date_arrival.replace(/T/g, ' '),
            //        //"date_adoption": data.date_adoption !== null ? data.date_adoption.replace(/T/g, ' ') : null,
            //        //"date_adoption_act": data.date_adoption_act !== null ? data.date_adoption_act.replace(/T/g, ' ') : null,
            //        //"id_station_from": data.id_station_from,

            //        //"id_station_on": data.id_station_on,
            //        //"station_on": data.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_on, 'station_name', lang) : '',
            //        //"id_way": data.id_way,
            //        //"num_doc": data.num_doc,
            //        //"count": data.ArrivalCars !== null ? data.ArrivalCars.length : 0,
            //        //"count_arrival": car_arrival !== null ? car_arrival.length : 0,
            //        //"count_not_arrival": car_not_arrival !== null ? car_not_arrival.length : 0,
            //        //"count_all": (car_arrival !== null ? car_arrival.length : 0) + ' - ' + (car_not_arrival !== null ? car_not_arrival.length : 0),
            //        //"status": data.status,
            //        //"note": data.note,
            //        //"create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
            //        //"create_user": data.create_user,
            //        //"change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
            //        //"change_user": data.change_user,
            //        //"create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
            //        //"change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
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