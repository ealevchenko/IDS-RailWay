jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                //'mess_load_ids_dir': 'Загрузка справочников (Справочники ИДС - загружены)...',
                //'mess_load_uz_dir': 'Загрузка справочников (Справочники УЗ - загружены)...',

                'field_num': '№ вагона',
                'field_genus_wagon': 'Род вагона',
                'field_state': 'Государство собственник',
                'field_wagon_manufacturer': 'Завод изготовитель',
                'field_year_wagon_create': 'Год постройки',
                'field_station': 'Станция приписки',
                'field_carrying_capacity': 'Грузоподъемность, тонн',
                'field_tara': 'Тара, тонн',
                'field_type_repairs': 'Тип планируемого ремонта',
                'field_date_type_repairs': 'Дата планируемого ремонта',
                'field_code_model_wagon': 'Модель',
                'field_type_wagon': 'Тип подвижного состава',
                'field_axis_length': 'Длина по осям, м',
                'field_body_volume': 'Объем кузова',
                'field_type_ownership': 'Признак собственности',
                'field_owner_wagon': 'Собственник',
                'field_date_registration': 'Дата последней регистрации',
                'field_lessor_wagon': 'Арендодатель',
                'field_operator_wagon': 'Оперативное управление',
                'field_poligon_travel_wagon': 'Полигон курсирования',
                'field_special_conditions': 'Особые условия',
                'field_sap': 'SAP',

                //'text_link_tabs_control_1': 'Характеристики',
                //'text_link_tabs_control_2': 'Ремонты',
            },
            'en':  //default language: English
            {
                //'mess_load_ids_dir': 'Loading directories (IID directories - loaded) ...',
                //'mess_load_uz_dir': 'Downloading directories (UZ directories - loaded) ...',

                'field_num': '# wagon',
                'field_genus_wagon': 'Rod wagon',
                'field_state': 'State Owner',
                'field_wagon_manufacturer': 'Завод изготовитель',
                'field_year_wagon_create': 'Год постройки',
                'field_station': 'Станция приписки',
                'field_carrying_capacity': 'Грузоподъемность, тонн',
                'field_tara': 'Тара, тонн',
                'field_type_repairs': 'Тип планируемого ремонта',
                'field_date_type_repairs': 'Дата планируемого ремонта',
                'field_code_model_wagon': 'Модель',
                'field_type_wagon': 'Тип подвижного состава',
                'field_axis_length': 'Длина по осям, м',
                'field_body_volume': 'Объем кузова',
                'field_type_ownership': 'Признак собственности',
                'field_owner_wagon': 'Собственник',
                'field_date_registration': 'Дата последней регистрации',
                'field_lessor_wagon': 'Арендодатель',
                'field_operator_wagon': 'Оперативное управление',
                'field_poligon_travel_wagon': 'Полигон курсирования',
                'field_special_conditions': 'Особые условия',
                'field_sap': 'SAP',
            }
        };


    //--------------------------------------------------------------------------------
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
    langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
    user_name = $('input#username').val(),
    mors = new IDS_MORS(lang), // Создадим класс IDS_MORS
    loadReference = function (callback) {
        LockScreen(langView('mess_load', langs));
        var count = 1;
        mors.load(['ids', 'uz', 'park_wagons'], function () {
            count -= 1;
            if (count === 0) {
                if (typeof callback === 'function') {
                    LockScreenOff();
                    callback();
                }
            }
        });
    },
    // Controls ---------------------------------------------------
    // "Добавить"
    bt_add_park = $('button#add-park').on('click', function () {
        pn_edit_park_name.Open();
    }),
    // "Править"
    bt_edit_park = $('button#edit-park').prop('disabled', true).on('click', function () {
        if (select_park_wagon) {
            var id = select_park_wagon.val();
            if (id > 0) {
                pn_edit_park_name.Open(id);
            }
        }
    }),
    // "Удалить"
    bt_delete_park = $('button#delete-park').prop('disabled', true).on('click', function () {
        if (select_park_wagon) {
            var id = select_park_wagon.val();
            if (id > 0) {
                dialog_confirm.open('Удалить?', 'Вы уверены что хотите удалить парк : ' + mors.getValueCulture_ParksWagons_Of_ID(id, 'name_park') + '?', function (result) {
                    if (result) {
                        mors.deleteParksWagons(id,
                            function (result_del) {
                                if (result_del > 0) {
                                    // Ок
                                    mors.loadParksWagons(function (result) {
                                        update_list_park();
                                    })
                                } else {
                                    //pn_edit_park_name.val.clear_message();
                                    //pn_edit_park_name.val.out_error_message("При обновлении названия парка произошла ошибка!");
                                }
                            });
                    }
                });
            }
        }
    }),
    // элементы окна
    select_park_wagon = null,
    // UPDATE Controls ---------------------------------------------------
    // Обновить компонент список парков
    update_list_park = function (id_park) {
        select_park_wagon = cd_initSelect(
                $('select#select-park-wagon'),
                { lang: lang },
                mors.getListParksWagons('id', 'name_park', lang),
                null,
                id_park ? Number(id_park) : -1,
                function (event) {
                    event.preventDefault();
                    var id = $(this).val();
                    update_button_edit_park(id);
                },
                null);
        update_button_edit_park(id_park);
    },
    // Обновить состояние кнопок редактирования парков
    update_button_edit_park = function (id_park) {
        if (id_park > 0) {
            bt_edit_park.prop('disabled', false);
            bt_delete_park.prop('disabled', false);
        } else {
            bt_edit_park.prop('disabled', true);
            bt_delete_park.prop('disabled', true);
        }
    },
    // Обновим перечень вагонов входящих в парк
    update_list_wagons_park = function (id_park) {

    },
            // Таблица 
    table_wagon_cards = {
        html_table: $('#table-wagons-park'),
        obj: $('#table-wagons-park').DataTable({
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "select": true,
            "autoWidth": true,
            //"filter": true,
            //"scrollY": "600px",
            "scrollX": true,
            language: language_table(langs),
            jQueryUI: false,
            "createdRow": function (row, data, index) {
                $(row).attr('id', data.num);
            },
            columns: [
                { data: "num", title: langView('field_num', langs), width: "50px", orderable: true, searchable: true },
                { data: "genus_wagon", title: langView('field_genus_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "state", title: langView('field_state', langs), width: "50px", orderable: true, searchable: true },
                { data: "wagon_manufacturer", title: langView('field_wagon_manufacturer', langs), width: "50px", orderable: true, searchable: true },
                { data: "year_wagon_create", title: langView('field_year_wagon_create', langs), width: "50px", orderable: true, searchable: true },
                { data: "station", title: langView('field_station', langs), width: "50px", orderable: true, searchable: true },
                { data: "carrying_capacity", title: langView('field_carrying_capacity', langs), width: "50px", orderable: true, searchable: true },
                { data: "tara", title: langView('field_tara', langs), width: "50px", orderable: true, searchable: true },
                { data: "type_repairs", title: langView('field_type_repairs', langs), width: "50px", orderable: true, searchable: true },
                { data: "date_type_repairs", title: langView('field_date_type_repairs', langs), width: "50px", orderable: true, searchable: true },
                { data: "code_model_wagon", title: langView('field_code_model_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "type_wagon", title: langView('field_type_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "axis_length", title: langView('field_axis_length', langs), width: "50px", orderable: true, searchable: true },
                { data: "body_volume", title: langView('field_body_volume', langs), width: "50px", orderable: true, searchable: true },
                { data: "type_ownership", title: langView('field_type_ownership', langs), width: "50px", orderable: true, searchable: true },
                { data: "owner_wagon", title: langView('field_owner_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "date_registration", title: langView('field_date_registration', langs), width: "50px", orderable: true, searchable: true },
                { data: "lessor_wagon", title: langView('field_lessor_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "operator_wagon", title: langView('field_operator_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "poligon_travel_wagon", title: langView('field_poligon_travel_wagon', langs), width: "50px", orderable: true, searchable: true },
                { data: "special_conditions", title: langView('field_special_conditions', langs), width: "50px", orderable: true, searchable: true },
                { data: "sap", title: langView('field_sap', langs), width: "50px", orderable: true, searchable: false },
            ],
            dom: 'Bfrtip',
            stateSave: false,
            buttons: [
                {

                    text: 'Детально',
                    action: function (e, dt, node, config) {
                        if (table_wagon_cards.select) {
                            // загрузить и открыть окно просмотра-правки
                            wagon_card.load_card(table_wagon_cards.select.num);
                        }
                    },
                    enabled: false
                },
                {
                    text: 'Скопировать в буфер',
                    extend: 'copyHtml5',
                },
                {
                    text: 'Экспорт в Excel',
                    extend: 'excelHtml5',
                    sheetName: 'Карточки вагонов',
                    messageTop: function () {
                        return '';
                    }
                },
                {
                    extend: 'colvis',
                    text: 'Выбрать поля таблицы',
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: 'Показать все поля',
                    show: ':hidden'
                },
                {
                    extend: 'pageLength',
                }
            ],
        }),
    },
    // DIALOG Controls ---------------------------------------------------
    // Панель "Править название парка"
    pn_edit_park_name = {
        obj: null,
        id: null,
        name_park_wagon_ru: $('input#name-park-wagon-ru'),
        name_park_wagon_en: $('input#name-park-wagon-en'),
        alert_park_wagon: $('#edit-park-name-alert'),
        all_obj: null,
        // список парков
        list_park_wagons: null,
        lang: ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        mors: null,
        val: null,
        // Загрузка библиотек
        loadReference: function (callback) {
            // загрузим список парков
            if (!pn_edit_park_name.list_park_wagons) {
                pn_edit_park_name.mors.load(['park_wagons'], function () {
                    pn_edit_park_name.list_park_wagons = pn_edit_park_name.mors.list_park_wagons;
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                });
            } else {
                LockScreenOff();
                callback();
            }
        },
        // Валидация данных
        validation: function () {
            pn_edit_park_name.val.clear_all();
            var valid = true;
            valid = valid & pn_edit_park_name.val.checkInputOfNull(pn_edit_park_name.name_park_wagon_ru, "Укажите название парка на русском");
            valid = valid & pn_edit_park_name.val.checkInputOfNull(pn_edit_park_name.name_park_wagon_en, "Укажите название парка на английском");
            return valid;
        },
        // инициализвция Диалога
        init: function (list_park_wagons, callback_ok) {
            pn_edit_park_name.list_park_wagons = list_park_wagons;
            this.all_obj = $([]).add(this.name_park_wagon_ru).add(this.name_park_wagon_en);
            this.mors = new IDS_MORS(pn_edit_park_name.lang); // Создадим класс IDS_MORS
            this.val = new VALIDATION(pn_edit_park_name.lang, pn_edit_park_name.alert_park_wagon, pn_edit_park_name.all_obj); // Создадим класс VALIDATION
            pn_edit_park_name.obj = $("div#edit-park-name").dialog({
                resizable: false,
                modal: true,
                autoOpen: false,
                height: "auto",
                width: 500,
                classes: {
                    "ui-dialog":"card",
                    "ui-dialog-titlebar": "card-header bg-primary text-white",
                    "ui-dialog-content":"card-body",
                    "ui-dialog-buttonpane": "card-footer text-muted"
                },
                open: function (event, ui) {

                },
                buttons: [
                  {
                      text: "Сохранить",
                      class: "btn btn-outline-primary btn-sm",
                      click: function () {
                          pn_edit_park_name.save(callback_ok);
                      }
                  },
                  {
                      text: "Отмена",
                      class: "btn btn-outline-primary btn-sm",
                      click: function () {
                          $(this).dialog("close");
                      }
                  },
                ]
            });
        },
        // Открыть Диалог 
        Open: function (id) {
            pn_edit_park_name.val.clear_all(); // Очистим ошибки и сообщения
            pn_edit_park_name.id = id;
            LockScreen("Обновляю справочники...");//LockScreen(langView('mess_load', langs));
            // Обновим справочники
            pn_edit_park_name.loadReference(function () {
                if (id) {
                    pn_edit_park_name.obj.dialog("option", "title", 'Изменить название парка подвижного состава');

                    pn_edit_park_name.mors.getParksWagonsOfID(id, function (data) {
                        //
                        pn_edit_park_name.name_park_wagon_ru.val(data.name_park_ru);
                        pn_edit_park_name.name_park_wagon_en.val(data.name_park_en);
                        pn_edit_park_name.obj.dialog("open");
                    })

                } else {
                    pn_edit_park_name.obj.dialog("option", "title", 'Добавить парк подвижного состава');
                    //
                    pn_edit_park_name.name_park_wagon_ru.val("");
                    pn_edit_park_name.name_park_wagon_en.val("");
                    pn_edit_park_name.obj.dialog("open");
                }
            })
        },
        // Получить новый парк
        getNew: function () {
            return {
                id: (pn_edit_park_name.id ? pn_edit_park_name.id : 0),
                name_park_ru: pn_edit_park_name.name_park_wagon_ru.val(),
                name_park_en: pn_edit_park_name.name_park_wagon_en.val(),
            }
        },
        // Сохранить изменения
        save: function (callback_ok) {
            var valid = pn_edit_park_name.validation();
            if (valid) {
                var park = pn_edit_park_name.getNew();
                if (pn_edit_park_name.id) {
                    // править
                    // добавить
                    pn_edit_park_name.mors.putParksWagons(park,
                        function (result_edit) {
                            if (result_edit > 0) {
                                // Ок
                                pn_edit_park_name.obj.dialog("close");
                                if (typeof callback_ok === 'function') {
                                    callback_ok(pn_edit_park_name.id, false);
                                }
                            } else {
                                pn_edit_park_name.val.clear_message();
                                pn_edit_park_name.val.out_error_message("При обновлении названия парка произошла ошибка!");
                            }
                        })
                } else {
                    // добавить
                    pn_edit_park_name.mors.postParksWagons(park,
                        function (result_add) {
                            if (result_add > 0) {
                                // Ок
                                pn_edit_park_name.obj.dialog("close");
                                if (typeof callback_ok === 'function') {
                                    callback_ok(result_add, true);
                                }
                            } else {
                                pn_edit_park_name.val.clear_message();
                                pn_edit_park_name.val.out_error_message("При добавлении нового парка произошла ошибка!");
                            }
                        })
                }
            }
        }
    },
    // Форма диалога
    dialog_confirm = {
        result: false,
        callback_ok: null,
        obj: $("#dialog-confirm").dialog({
            resizable: false,
            autoOpen: false,
            height: "auto",
            width: 400,
            modal: true,
            open: function (event, ui) {
            },
            close: function (event, ui) {
                if (typeof dialog_confirm.callback_ok === 'function') {
                    dialog_confirm.callback_ok(dialog_confirm.result);
                }
            },
            classes: {
                "ui-dialog": "card",
                "ui-dialog-titlebar": "card-header bg-primary text-white",
                "ui-dialog-content": "card-body",
                "ui-dialog-buttonpane": "card-footer text-muted"
            },
            buttons: [
                {
                    text: "Ок",
                    class: "btn btn-outline-primary btn-sm",
                    click: function () {
                        dialog_confirm.result = true;
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Отмена",
                    class: "btn btn-outline-primary btn-sm",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
        }),
        open: function (titlt, text, callback_ok) {
            dialog_confirm.result = false;
            dialog_confirm.obj.dialog("option", "title", titlt);
            $('p#dialog-confirm-text').text(text);
            dialog_confirm.callback_ok = callback_ok;
            dialog_confirm.obj.dialog("open")
        }
    };
    //================================================================
    // Основной вход
    //=================================================================
    // Инициализация
    pn_edit_park_name.init(null, function (result_id, refresh) {
        var id = result_id;
        mors.loadParksWagons(function (result) {
            update_list_park(id)
        })
    });
    // Загрузка основных библиотек
    loadReference(function (result) {
        update_list_park()
    });





});

