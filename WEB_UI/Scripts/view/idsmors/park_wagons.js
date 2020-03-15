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
            mors.load(['uz', 'park_wagons', 'cards_wagons'], false, function () {
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
                    table_wagon_cards.update_button_add(id);
                    update_list_wagons_park(id);
                },
                null);
            update_button_edit_park(id_park);
            table_wagon_cards.update_button_add(id_park);
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
            table_wagon_cards.view(id_park, true);
        },
        // Таблица 
        table_wagon_cards = {
            html_table: $('#table-wagons-park'),
            obj: null,
            id_park_wagon: null,
            list_wagon_park: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    //"select": true,
                    select: {
                        style: 'multi'
                    },
                    //"deferRender": true,
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
                            text: 'Добавить в список',
                            action: function (e, dt, node, config) {
                                var id_park = select_park_wagon.val();
                                if (id_park > 0) {
                                    table_wagon_cards.obj.rows().deselect();
                                    table_wagon_cards.view_panel_add_wagon();
                                } else {
                                    alert("Выберите парк");
                                }

                            },
                            enabled: true
                        },
                        {

                            text: 'Удалить из списка',
                            action: function (e, dt, node, config) {
                                var id_park = select_park_wagon.val();
                                var rows = table_wagon_cards.obj.rows('.selected').data();
                                dialog_confirm.open('Удалить?', 'Вы уверены что хотите удалить ' + rows.length + ' вагоа(нов) из парка : ' + mors.getValueCulture_ParksWagons_Of_ID(id_park, 'name_park') + '?', function (result) {
                                    if (result) {
                                        LockScreen('Удаляю из парка вагны в количестве : ' + rows.length + ' шт.');
                                        var id_park = select_park_wagon.val();
                                        var count = rows.length;
                                        var wh = [];
                                        $.each(rows, function (i, el) {
                                            wh.push(Number(el.id_list_wagon_park));
                                        });
                                        mors.deleteParksListWagonsArr(wh, function (result) {
                                            LockScreenOff();
                                            if (result > 0) {
                                                // Ок
                                                update_button_edit_park(Number(id_park));
                                                table_wagon_cards.update_button_add(id_park);
                                                table_wagon_cards.update_button_delete(0);
                                                table_wagon_cards.obj.rows('.selected').remove().draw(false);
                                                //update_list_wagons_park(Number(id_park));
                                            } else {
                                                // error
                                            }

                                        });
                                    }
                                });
                            },
                            enabled: false
                        },

                        {
                            text: 'Выбрать все',
                            extend: 'selectAll',
                        },
                        {
                            text: 'Убрать все',
                            extend: 'selectNone',
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
                }).on('select', function (e, dt, type, indexes) {
                    //var rowData = table_wagon_cards.obj.rows(indexes).data().toArray();
                    var rows = table_wagon_cards.obj.rows('.selected').data();
                    table_wagon_cards.update_button_delete(rows.length);

                })

                    .on('deselect', function (e, dt, type, indexes) {
                        //var rowData = table_wagon_cards.obj.rows(indexes).data().toArray();
                        var rows = table_wagon_cards.obj.rows('.selected').data();
                        table_wagon_cards.update_button_delete(rows.length);
                    });
            },
            // Показать таблицу с данными
            view: function (id_park_wagon, data_refresh) {
                LockScreen(langView('mess_delay', langs));
                table_wagon_cards.id_park_wagon = id_park_wagon;
                if (!table_wagon_cards.list_wagon_park | data_refresh === true) {
                    // Обновим данные
                    mors.getParksListWagonsOfPark(
                        Number(id_park_wagon),
                        function (result) {
                            table_wagon_cards.list_wagon_park = result;
                            table_wagon_cards.load_data(table_wagon_cards.list_wagon_park);
                            table_wagon_cards.obj.draw();
                            LockScreenOff();
                        }
                    );
                } else {
                    table_wagon_cards.load_data(table_wagon_cards.list_wagon_park);
                    table_wagon_cards.obj.draw();
                    LockScreenOff();
                };
            },
            // Загрузить данные
            load_data: function (data) {
                table_wagon_cards.obj.clear();
                $.each(data, function (i, el) {
                    var card_wagon = table_wagon_cards.get_row_card_wagon(el.CardsWagons);
                    card_wagon["id_list_wagon_park"] = el.id;
                    card_wagon["id_park_wagon"] = el.id_park_wagon;
                    table_wagon_cards.obj.row.add(card_wagon);
                });

                //table_wagon_cards.initComplete();
            },
            // Получить строку для таблицы
            get_row_data: function (data) {
                if (data) {
                    var card = mors.getCardsWagons_Internal_Of_ID(data.num);
                    var card_wagon = table_wagon_cards.get_row_card_wagon(card);
                    var card_park = {
                        "id_list_wagon_park": data.id,
                        "id_park_wagon": data.id_park_wagon,
                        "num": data.num,
                    };
                    $.extend(card_park, card_wagon);
                    //return card_wagon;
                    return card_park;
                }
            },
            // Получить полную информацию по вагонам
            get_row_card_wagon: function (data) {
                return {
                    "num": data.num,
                    "id_genus_wagon": data.id_genus_wagon,
                    "genus_wagon": data.Directory_GenusWagons ? mors.getValueCultureObj(data.Directory_GenusWagons, 'genus') : null,
                    //"genus_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_GenusWagons_Of_ID(data.id_genus_wagon, 'genus', lang) : data.id_genus_wagon,
                    "id_state": data.id_state,
                    "state": mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(data.id_state, 'state') : data.id_state,
                    "id_wagon_manufacturer": data.id_wagon_manufacturer,
                    "wagon_manufacturer": mors.getValueCultureObj(data.Directory_WagonManufacturers, 'name'),
                    //"wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getValue_WagonManufacturers_Of_ID(data.id_wagon_manufacturer, 'name', lang) : data.id_wagon_manufacturer,
                    "year_wagon_create": data.year_wagon_create,
                    "code_station": data.code_station,
                    //"station":'',
                    "station": mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(data.code_station, 'station') : data.code_station,
                    "carrying_capacity": data.carrying_capacity !== null ? Number(data.carrying_capacity).toFixed(1) : null,
                    "tara": data.tara !== null ? Number(data.tara).toFixed(1) : null,
                    "id_type_repairs": data.id_type_repairs,
                    "type_repairs": mors.getValueCultureObj(data.Directory_TypesRepairsWagons, 'type_repairs'),
                    //"type_repairs": mors.ids_dir !== null ? mors.ids_dir.getValue_TypesRepairsWagons_Of_ID(data.id_type_repairs, 'type_repairs', lang) : data.id_type_repairs,
                    "date_type_repairs": StringDateToFormatStringDate(data.date_type_repairs, lang),
                    "code_model_wagon": data.code_model_wagon,
                    "id_type_wagon": data.id_type_wagon,
                    "type_wagon": mors.getValueCultureObj(data.Directory_TypeWagons, 'type'),
                    //"type_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeWagons_Of_ID(data.id_type_wagon, 'type', lang) : data.id_type_wagon,
                    "axis_length": data.axis_length !== null ? Number(data.axis_length).toFixed(2) : null,
                    "body_volume": data.body_volume !== null ? Number(data.body_volume).toFixed(1) : null,
                    "id_type_ownership": data.id_type_ownership,
                    "type_ownership": mors.getValueCultureObj(data.Directory_TypeOwnerShip, 'type_ownership'),
                    //"type_ownership": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeOwnerShip_Of_ID(data.id_type_ownership, 'type_ownership', lang) : data.id_type_ownership,
                    "id_owner_wagon": data.id_owner_wagon,
                    "owner_wagon": mors.getValueCultureObj(data.Directory_OwnersWagons, 'owner'),
                    //"owner_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OwnersWagons_Of_ID(data.id_owner_wagon, 'owner', lang) : data.id_owner_wagon,
                    "date_registration": StringDateToFormatStringDate(data.date_registration, lang),
                    "id_lessor_wagon": data.id_lessor_wagon,
                    "lessor_wagon": mors.getValueCultureObj(data.Directory_LessorsWagons, 'lessors'),
                    //"lessor_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_LessorsWagons_Of_ID(data.id_lessor_wagon, 'lessors', lang) : data.id_lessor_wagon,
                    "id_operator_wagon": data.id_operator_wagon,
                    "operator_wagon": mors.getValueCultureObj(data.Directory_OperatorsWagons, 'operators'),
                    //"operator_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OperatorsWagons_Of_ID(data.id_operator_wagon, 'operators', lang) : data.id_operator_wagon,
                    "id_poligon_travel_wagon": data.id_poligon_travel_wagon,
                    "poligon_travel_wagon": mors.getValueCultureObj(data.Directory_PoligonTravelWagons, 'poligon_travel'),
                    //"poligon_travel_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_PoligonTravelWagons_Of_ID(data.id_poligon_travel_wagon, 'poligon_travel', lang) : data.id_poligon_travel_wagon,
                    "id_special_conditions": data.id_special_conditions,
                    "special_conditions": mors.getValueCultureObj(data.GetSpecialConditions, 'special_conditions'),
                    //"special_conditions": mors.ids_dir !== null ? (data.id_special_conditions !== null ? mors.ids_dir.getValue_SpecialConditions_Of_ID(data.id_special_conditions, 'special_conditions', lang) : "") : data.id_special_conditions,
                    "sap": data.sap,
                    "note": data.note,
                    "create": data.create,
                    "create_user": data.create_user,
                    "change": data.change,
                    "change_user": data.change_user,
                };
            },
            // Обновить кнопки
            update_button_delete: function (count) {
                if (count > 0) {
                    table_wagon_cards.obj.button(1).enable(true);
                } else {
                    table_wagon_cards.obj.button(1).enable(false);
                }
            },
            // Обновить кнопки
            update_button_add: function (id_park) {
                if (id_park > 0) {
                    table_wagon_cards.obj.button(0).enable(true);
                } else {
                    table_wagon_cards.obj.button(0).enable(false);
                }
            },
            // Отобразить панель добавить вагоны
            view_panel_add_wagon: function () {
                //LockScreen('Загружаю данные...');
                var rows = table_wagon_cards.obj.rows().data();
                var arr_num = [];
                $.each(rows, function (i, el) {
                    arr_num.push(el.num);
                });
                pn_add_wagon.Open(arr_num);
            }
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
                    pn_edit_park_name.mors.load(['park_wagons'], false, function () {
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
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
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
                });
            },
            // Получить новый парк
            getNew: function () {
                return {
                    id: (pn_edit_park_name.id ? pn_edit_park_name.id : 0),
                    name_park_ru: pn_edit_park_name.name_park_wagon_ru.val(),
                    name_park_en: pn_edit_park_name.name_park_wagon_en.val(),
                };
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
        // Панель добавить вагоны
        pn_add_wagon = {
            obj: null,
            table: null,
            // список парков
            list_cards_wagons: null,
            list_cards_wagons_select: null,
            lang: ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
            mors: null,
            // Загрузка библиотек
            loadReference: function (callback) {
                // загрузим список парков
                if (!pn_add_wagon.list_cards_wagons) {
                    pn_add_wagon.mors.load(['uz', 'cards_wagons'], false, function () {
                        pn_add_wagon.list_cards_wagons = pn_add_wagon.mors.list_cards_wagons;
                        if (typeof callback === 'function') {
                            //LockScreenOff();
                            callback();
                        }
                    });
                } else {
                    //LockScreenOff();
                    callback();
                }
            },
            // инициализвция Диалога
            init: function (list_cards_wagons, callback_ok) {
                pn_add_wagon.list_cards_wagons = list_cards_wagons;
                pn_add_wagon.mors = new IDS_MORS(pn_add_wagon.lang); // Создадим класс IDS_MORS
                pn_add_wagon.obj = $("div#add-wagon-park").dialog({
                    resizable: false,
                    title: 'Добавить вагоны в парк',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 1100,
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
                            text: "Ок",
                            class: "btn btn-outline-primary btn-sm",
                            click: function () {
                                var rows = pn_add_wagon.table.rows('.selected').data();
                                $(this).dialog("close");
                                if (typeof callback_ok === 'function') {
                                    callback_ok(rows);
                                }

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
                pn_add_wagon.init_table();
            },
            //
            init_table: function () {
                pn_add_wagon.table = $('#table-add-wagons-park').DataTable({
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    //"select": true,
                    select: {
                        style: 'multi'
                    },
                    "autoWidth": true,
                    //"filter": true,
                    "scrollY": "500px",
                    "scrollX": true,
                    language: language_table(langs),
                    jQueryUI: true,
                    "createdRow": function (row, data, index) {
                        //$(row).attr('id', data.num);
                    },
                    columns: [
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: true, searchable: true },
                        { data: "genus_wagon", title: langView('field_genus_wagon', langs), width: "100px", orderable: true, searchable: true },
                        //{ data: "state", title: langView('field_state', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "wagon_manufacturer", title: langView('field_wagon_manufacturer', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "year_wagon_create", title: langView('field_year_wagon_create', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "station", title: langView('field_station', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "carrying_capacity", title: langView('field_carrying_capacity', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "tara", title: langView('field_tara', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "type_repairs", title: langView('field_type_repairs', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "date_type_repairs", title: langView('field_date_type_repairs', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "code_model_wagon", title: langView('field_code_model_wagon', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "type_wagon", title: langView('field_type_wagon', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "axis_length", title: langView('field_axis_length', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "body_volume", title: langView('field_body_volume', langs), width: "50px", orderable: true, searchable: true },
                        { data: "type_ownership", title: langView('field_type_ownership', langs), width: "100px", orderable: true, searchable: true },
                        { data: "owner_wagon", title: langView('field_owner_wagon', langs), width: "100px", orderable: true, searchable: true },
                        //{ data: "date_registration", title: langView('field_date_registration', langs), width: "50px", orderable: true, searchable: true },
                        { data: "lessor_wagon", title: langView('field_lessor_wagon', langs), width: "100px", orderable: true, searchable: true },
                        { data: "operator_wagon", title: langView('field_operator_wagon', langs), width: "100px", orderable: true, searchable: true },
                        { data: "poligon_travel_wagon", title: langView('field_poligon_travel_wagon', langs), width: "100px", orderable: true, searchable: true },
                        { data: "special_conditions", title: langView('field_special_conditions', langs), width: "100px", orderable: true, searchable: true },
                        //{ data: "sap", title: langView('field_sap', langs), width: "50px", orderable: true, searchable: false },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            text: 'Выбрать все',
                            extend: 'selectAll',
                        },
                        {
                            text: 'Убрать все',
                            extend: 'selectNone',
                        },
                        {
                            extend: 'pageLength',
                        }
                    ],
                });
                //pn_add_wagon.initComplete()
            },
            // Формирование элементов фильтра
            initComplete: function () {
                pn_add_wagon.table.data().columns([1, 2, 3, 4, 5, 6, 7]).every(function () {
                    var n = 0;
                    var column = this;
                    var num = column[0][0];
                    var name = column.header().firstChild.innerText;
                    var select = $('<select><option value="">' + (lang == 'en' ? 'All' : 'Все') + '</option></select>')
                        .appendTo($(column.header()).empty().append(name))
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });
                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });

                    //var select = $('<select class="filter"><option value="">Выбрать...</option></select>')
                    //    .appendTo($(column.header()).empty())
                    //    .on('change', function () {
                    //    var val = $.fn.dataTable.util.escapeRegex(
                    //        $(this).val()
                    //    );
                    //    column
                    //        .search(val ? '^' + val + '$' : '', true, false)
                    //        .draw();
                    //});
                    ////
                    //column.data().unique().sort().each(function (d, j) {
                    //    select.append('<option value="' + (d ? d : "") + '">' + (d ? d : "Не определенно") + '</option>');
                    //    n++;
                    //});
                    //if (n > 1) {
                    //    $('form#filtr')
                    //        .append('<div class="cd-filter-block" id="filter-block-' + num + '"></div>');
                    //    $('div#filter-block-' + num)
                    //        .append('<h4>' + name + '</h4>')
                    //        .append('<div class="cd-filter-content" id="filter-content-' + num + '"></div>');
                    //    $('div#filter-content-' + num)
                    //        .append('<div class="cd-select cd-filters" id="select-' + num + '"></div>');
                    //    $('div#select-' + num)
                    //        .append(select);
                    //}
                });
            },
            // Открыть Диалог 
            Open: function (nums) {
                LockScreen('Загружаю данные...');
                // Загрузим перечень вагонов всех
                pn_add_wagon.loadReference(function () {
                    // если заданы существующие вагоны, исключим их из перечня
                    if (nums && nums.length > 0) {
                        pn_add_wagon.list_cards_wagons_select = pn_add_wagon.list_cards_wagons.filter(function (el) {
                            if ($.inArray(el.num, nums) !== -1) { return false; }
                            else { return true; }
                        });
                    } else {
                        pn_add_wagon.list_cards_wagons_select = pn_add_wagon.list_cards_wagons;
                    }
                    pn_add_wagon.load_data(pn_add_wagon.list_cards_wagons_select);
                    pn_add_wagon.obj.dialog("open");
                    LockScreenOff();
                });
            },
            // Загрузить данные
            load_data: function (data) {
                pn_add_wagon.table.clear();
                for (i = 0; i < data.length; i++) {
                    pn_add_wagon.table.row.add(pn_add_wagon.get_row_card_wagon(data[i]));
                }
                pn_add_wagon.table.draw();
                pn_add_wagon.table.order([1, 'asc']);
                //pn_add_wagon.initComplete()
            },
            //
            get_row_card_wagon: function (data) {
                return {
                    "num": data.num,
                    "id_genus_wagon": data.id_genus_wagon,
                    "genus_wagon": data.Directory_GenusWagons ? mors.getValueCultureObj(data.Directory_GenusWagons, 'genus') : null,
                    //"genus_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_GenusWagons_Of_ID(data.id_genus_wagon, 'genus', lang) : data.id_genus_wagon,
                    "id_state": data.id_state,
                    "state": mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(data.id_state, 'state') : data.id_state,
                    "id_wagon_manufacturer": data.id_wagon_manufacturer,
                    "wagon_manufacturer": mors.getValueCultureObj(data.Directory_WagonManufacturers, 'name'),
                    //"wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getValue_WagonManufacturers_Of_ID(data.id_wagon_manufacturer, 'name', lang) : data.id_wagon_manufacturer,
                    "year_wagon_create": data.year_wagon_create,
                    "code_station": data.code_station,
                    //"station":'',
                    "station": mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(data.code_station, 'station') : data.code_station,
                    "carrying_capacity": data.carrying_capacity !== null ? Number(data.carrying_capacity).toFixed(1) : null,
                    "tara": data.tara !== null ? Number(data.tara).toFixed(1) : null,
                    "id_type_repairs": data.id_type_repairs,
                    "type_repairs": mors.getValueCultureObj(data.Directory_TypesRepairsWagons, 'type_repairs'),
                    //"type_repairs": mors.ids_dir !== null ? mors.ids_dir.getValue_TypesRepairsWagons_Of_ID(data.id_type_repairs, 'type_repairs', lang) : data.id_type_repairs,
                    "date_type_repairs": StringDateToFormatStringDate(data.date_type_repairs, lang),
                    "code_model_wagon": data.code_model_wagon,
                    "id_type_wagon": data.id_type_wagon,
                    "type_wagon": mors.getValueCultureObj(data.Directory_TypeWagons, 'type'),
                    //"type_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeWagons_Of_ID(data.id_type_wagon, 'type', lang) : data.id_type_wagon,
                    "axis_length": data.axis_length !== null ? Number(data.axis_length).toFixed(2) : null,
                    "body_volume": data.body_volume !== null ? Number(data.body_volume).toFixed(1) : null,
                    "id_type_ownership": data.id_type_ownership,
                    "type_ownership": mors.getValueCultureObj(data.Directory_TypeOwnerShip, 'type_ownership'),
                    //"type_ownership": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeOwnerShip_Of_ID(data.id_type_ownership, 'type_ownership', lang) : data.id_type_ownership,
                    "id_owner_wagon": data.id_owner_wagon,
                    "owner_wagon": mors.getValueCultureObj(data.Directory_OwnersWagons, 'owner'),
                    //"owner_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OwnersWagons_Of_ID(data.id_owner_wagon, 'owner', lang) : data.id_owner_wagon,
                    "date_registration": StringDateToFormatStringDate(data.date_registration, lang),
                    "id_lessor_wagon": data.id_lessor_wagon,
                    "lessor_wagon": mors.getValueCultureObj(data.Directory_LessorsWagons, 'lessors'),
                    //"lessor_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_LessorsWagons_Of_ID(data.id_lessor_wagon, 'lessors', lang) : data.id_lessor_wagon,
                    "id_operator_wagon": data.id_operator_wagon,
                    "operator_wagon": mors.getValueCultureObj(data.Directory_OperatorsWagons, 'operators'),
                    //"operator_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OperatorsWagons_Of_ID(data.id_operator_wagon, 'operators', lang) : data.id_operator_wagon,
                    "id_poligon_travel_wagon": data.id_poligon_travel_wagon,
                    "poligon_travel_wagon": mors.getValueCultureObj(data.Directory_PoligonTravelWagons, 'poligon_travel'),
                    //"poligon_travel_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_PoligonTravelWagons_Of_ID(data.id_poligon_travel_wagon, 'poligon_travel', lang) : data.id_poligon_travel_wagon,
                    "id_special_conditions": data.id_special_conditions,
                    "special_conditions": mors.getValueCultureObj(data.GetSpecialConditions, 'special_conditions'),
                    //"special_conditions": mors.ids_dir !== null ? (data.id_special_conditions !== null ? mors.ids_dir.getValue_SpecialConditions_Of_ID(data.id_special_conditions, 'special_conditions', lang) : "") : data.id_special_conditions,
                    "sap": data.sap,
                    "note": data.note,
                    "create": data.create,
                    "create_user": data.create_user,
                    "change": data.change,
                    "change_user": data.change_user,
                };
            },
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
                dialog_confirm.obj.dialog("open");
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Инициализация
    // Инициализация "Правка Парков"
    pn_edit_park_name.init(null, function (result_id, refresh) {
        // Обратный вызов парк обновлен, добавлен
        var id = result_id;
        mors.loadParksWagons(function (result) {
            update_list_park(id);
        });
    });
    // Инициализация "Добавить вагоны"
    pn_add_wagon.init(null, function (rows) {
        // Обратный вызов вагоны добавлены
        LockScreen('Добавляю в парк новые вагны в количестве : ' + rows.length + ' шт.');
        var id_park = select_park_wagon.val();
        if (Number(id_park) > 0) {
            var count = rows.length;
            // Получим новый перечень 
            var list = [];
            $.each(rows, function (i, el) {
                list.push({ id: 0, id_park_wagon: Number(id_park), num: el.num });
            });
            // Добавим все сразу одним массивом
            mors.postParksListWagonsArr(list, function (result) {
                if (result > 0) {
                    // Ок
                    update_button_edit_park(Number(id_park));
                    update_list_wagons_park(Number(id_park));
                } else {
                    // error
                }
                LockScreenOff();
            });
        }

    });
    // 
    table_wagon_cards.init();
    // Загрузка основных библиотек
    loadReference(function (result) {
        update_list_park();
    });





});

