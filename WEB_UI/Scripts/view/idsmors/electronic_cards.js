jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'mess_load_ids_dir': 'Загрузка справочников (Справочники ИДС - загружены)...',
                'mess_load_uz_dir': 'Загрузка справочников (Справочники УЗ - загружены)...',

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

                'text_link_tabs_control_1': 'Характеристики',
                'text_link_tabs_control_2': 'Ремонты',
            },
            'en':  //default language: English
            {
                'mess_load_ids_dir': 'Loading directories (IID directories - loaded) ...',
                'mess_load_uz_dir': 'Downloading directories (UZ directories - loaded) ...',

                'field_num': '# wagon',
                'field_genus_wagon': 'Rod wagon',
                'field_state': 'State Owner',
                'field_wagon_manufacturer': 'Manufacturer',
                'field_year_wagon_create': 'Year of construction',
                'field_station': 'Home station',
                'field_carrying_capacity': 'Payload, tons',
                'field_tara': 'Tara, tons',
                'field_type_repairs': 'Type of planned repair',
                'field_date_type_repairs': 'Date of planned repair',
                'field_code_model_wagon': 'Model',
                'field_type_wagon': 'Type of rolling stock',
                'field_axis_length': 'Length along the axes, m',
                'field_body_volume': 'Body volume',
                'field_type_ownership': 'Property attribute',
                'field_owner_wagon': 'Owner',
                'field_date_registration': 'Date of last registration',
                'field_lessor_wagon': 'Landlord',
                'field_operator_wagon': 'Operational management',
                'field_poligon_travel_wagon': 'Tracking range',
                'field_special_conditions': 'Special conditions',
                'field_sap': 'SAP',

                'text_link_tabs_control_1': 'Features',
                'text_link_tabs_control_2': 'Repairs',
            }
        };

    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        //Date = moment('15.01.2020', 'DD.MM.YYYY');
        mors = new IDS_MORS(lang), // Создадим класс IDS_MORS
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            //mors.load(['cards_wagons', 'cards_wagons_repairs'], function () {
            mors.load(['ids','uz'], function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        },

        // Таблица 
        table_wagon_cards = {
            html_table: $('#table-cards-wagons'),
            obj: null,
            select: null,
            // Инициализировать таблицу
            initObject: function () {
                this.obj = this.html_table.DataTable({
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
                            //postfixButtons: ['colvisRestore']
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
                    var rowData = table_wagon_cards.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_wagon_cards.select = rowData[0];
                        table_wagon_cards.obj.button(0).enable(true);
                    } else {
                        table_wagon_cards.obj.button(0).enable(false);
                    }
                }).on('deselect', function (e, dt, type, indexes) {
                    table_wagon_cards.select = null;
                    table_wagon_cards.obj.button(0).enable(false);
                });
            },
            // Показать таблицу с данными
            viewTable: function (data_refresh) {
                LockScreen(langView('mess_delay', langs));
                if (!mors.list_cards_wagons | data_refresh === true) {
                    // Обновим данные
                    mors.getCardsWagons(
                        function (result) {
                            mors.list_cards_wagons = result;
                            table_wagon_cards.loadDataTable(mors.list_cards_wagons);
                            table_wagon_cards.obj.draw();
                        }
                    );
                } else {
                    table_wagon_cards.loadDataTable(mors.list_cards_wagons);
                    table_wagon_cards.obj.draw();
                };
            },
            // Загрузить данные
            loadDataTable: function (data) {
                this.list = data;
                this.obj.clear();
                for (i = 0; i < data.length; i++) {
                    this.obj.row.add(this.getRow(data[i]));
                }
                LockScreenOff();
                table_wagon_cards.initComplete();
            },
            // Получить строку для таблицы
            getRow: function (data) {
                return {
                    "num": data.num,
                    "id_genus_wagon": data.id_genus_wagon,
                    "genus_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_GenusWagons_Of_ID(data.id_genus_wagon, 'genus', lang) : data.id_genus_wagon,
                    "id_state": data.id_state,
                    "state": mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(data.id_state, 'state') : data.id_state,
                    "id_wagon_manufacturer": data.id_wagon_manufacturer,
                    "wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getValue_WagonManufacturers_Of_ID(data.id_wagon_manufacturer, 'name', lang) : data.id_wagon_manufacturer,
                    "year_wagon_create": data.year_wagon_create,
                    "code_station": data.code_station,
                    "station": mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(data.code_station, 'station') : data.code_station,
                    "carrying_capacity": data.carrying_capacity !== null ? Number(data.carrying_capacity).toFixed(1) : null,
                    "tara": data.tara !== null ? Number(data.tara).toFixed(1) : null,
                    "id_type_repairs": data.id_type_repairs,
                    "type_repairs": mors.ids_dir !== null ? mors.ids_dir.getValue_TypesRepairsWagons_Of_ID(data.id_type_repairs, 'type_repairs', lang) : data.id_type_repairs,
                    "date_type_repairs": StringDateToFormatStringDate(data.date_type_repairs, lang),
                    "code_model_wagon": data.code_model_wagon,
                    "id_type_wagon": data.id_type_wagon,
                    "type_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeWagons_Of_ID(data.id_type_wagon, 'type', lang) : data.id_type_wagon,
                    "axis_length": data.axis_length !== null ? Number(data.axis_length).toFixed(2) : null,
                    "body_volume": data.body_volume !== null ? Number(data.body_volume).toFixed(1) : null,
                    "id_type_ownership": data.id_type_ownership,
                    "type_ownership": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeOwnerShip_Of_ID(data.id_type_ownership, 'type_ownership', lang) : data.id_type_ownership,
                    "id_owner_wagon": data.id_owner_wagon,
                    "owner_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OwnersWagons_Of_ID(data.id_owner_wagon, 'owner', lang) : data.id_owner_wagon,
                    "date_registration": StringDateToFormatStringDate(data.date_registration, lang),
                    "id_lessor_wagon": data.id_lessor_wagon,
                    "lessor_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_LessorsWagons_Of_ID(data.id_lessor_wagon, 'lessors', lang) : data.id_lessor_wagon,
                    "id_operator_wagon": data.id_operator_wagon,
                    "operator_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OperatorsWagons_Of_ID(data.id_operator_wagon, 'operators', lang) : data.id_operator_wagon,
                    "id_poligon_travel_wagon": data.id_poligon_travel_wagon,
                    "poligon_travel_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_PoligonTravelWagons_Of_ID(data.id_poligon_travel_wagon, 'poligon_travel', lang) : data.id_poligon_travel_wagon,
                    "id_special_conditions": data.id_special_conditions,
                    "special_conditions": mors.ids_dir !== null ? (data.id_special_conditions !== null ? mors.ids_dir.getValue_SpecialConditions_Of_ID(data.id_special_conditions, 'special_conditions', lang) : "") : data.id_special_conditions,
                    "sap": data.sap,
                    "note": data.note,
                    "create": data.create,
                    "create_user": data.create_user,
                    "change": data.change,
                    "change_user": data.change_user,
                }
            },
            // Обновить данные в таблице
            updateRow: function (data) {
                if (data) {
                    var row = this.getRow(data);
                    var index = table_wagon_cards.obj.row('#' + data.num).index();
                    table_wagon_cards.obj.cell(index, 1).data(row.genus_wagon);
                    table_wagon_cards.obj.cell(index, 2).data(row.state);
                    table_wagon_cards.obj.cell(index, 3).data(row.wagon_manufacturer);
                    table_wagon_cards.obj.cell(index, 4).data(row.year_wagon_create);
                    table_wagon_cards.obj.cell(index, 5).data(row.station);
                    table_wagon_cards.obj.cell(index, 6).data(row.carrying_capacity);
                    table_wagon_cards.obj.cell(index, 7).data(row.tara);
                    table_wagon_cards.obj.cell(index, 8).data(row.type_repairs);
                    table_wagon_cards.obj.cell(index, 9).data(row.date_type_repairs);
                    table_wagon_cards.obj.cell(index, 10).data(row.code_model_wagon);
                    table_wagon_cards.obj.cell(index, 11).data(row.type_wagon);
                    table_wagon_cards.obj.cell(index, 12).data(row.axis_length);
                    table_wagon_cards.obj.cell(index, 13).data(row.body_volume);
                    table_wagon_cards.obj.cell(index, 14).data(row.type_ownership);
                    table_wagon_cards.obj.cell(index, 15).data(row.owner_wagon);
                    table_wagon_cards.obj.cell(index, 16).data(row.date_registration);
                    table_wagon_cards.obj.cell(index, 17).data(row.lessor_wagon);
                    table_wagon_cards.obj.cell(index, 18).data(row.operator_wagon);
                    table_wagon_cards.obj.cell(index, 19).data(row.poligon_travel_wagon);
                    table_wagon_cards.obj.cell(index, 20).data(row.special_conditions);
                    table_wagon_cards.obj.cell(index, 21).data(row.sap);
                    table_wagon_cards.obj.draw();
                }
            },
            // Добавить данные в таблице
            addRow: function (data) {
                if (data) {
                    table_wagon_cards.obj.row.add(this.getRow(data));
                    // Убрать выделенную строку
                    table_wagon_cards.deselectRowOfSelect();
                    table_wagon_cards.obj.draw();
                    // Выбрать новую строку
                    table_wagon_cards.selectRow(data.num);
                }
            },
            // Добавить данные в таблице
            deleteRow: function () {
                table_wagon_cards.obj.row('.selected').remove().draw(false);
                // Убрать выделенную строку
                table_wagon_cards.select = null;
                table_wagon_cards.obj.button(0).enable(false);
            },
            // Select по номеру вагона
            selectRow: function (num) {
                var index = table_wagon_cards.obj.row('#' + num).index();
                table_wagon_cards.obj.row(index).select();
            },
            // Deselect по номеру вагона
            deselectRow: function (num) {
                var index = table_wagon_cards.obj.row('#' + num).index();
                table_wagon_cards.obj.row(index).deselect();
            },
            // Deselect по выбраному
            deselectRowOfSelect: function () {
                var index = table_wagon_cards.obj.row('.selected').index();
                table_wagon_cards.obj.row(index).deselect();
            },

            // Формирование элементов фильтра
            initComplete: function () {
                table_wagon_cards.obj.data().columns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).every(function () {
                    var n = 0;
                    var column = this;
                    var num = column[0][0];
                    var name = column.header().firstChild.innerText;
                    var select = $('<select class="filter"><option value="">Выбрать...</option></select>').on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                    //
                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + (d ? d : "") + '">' + (d ? d : "Не определенно") + '</option>');
                        n++;
                    });
                    if (n > 1) {
                        $('form#filtr')
                            .append('<div class="cd-filter-block" id="filter-block-' + num + '"></div>');
                        $('div#filter-block-' + num)
                            .append('<h4>' + name + '</h4>')
                            .append('<div class="cd-filter-content" id="filter-content-' + num + '"></div>');
                        $('div#filter-content-' + num)
                            .append('<div class="cd-select cd-filters" id="select-' + num + '"></div>');
                        $('div#select-' + num)
                            .append(select);
                    }
                });
                //close filter dropdown inside lateral .cd-filter 
                $('.cd-filter-block h4').on('click', function () {
                    $(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
                });
            }
        },
        // Окно вагон детально
        wagon_card = {
            tabs: {
                html_div: $("#tabs-controls"),
                active: 0,
                init: function () {
                    $('#link-tabs-control-1').text(langView('text_link_tabs_control_1', langs));
                    $('#link-tabs-control-2').text(langView('text_link_tabs_control_2', langs));
                    this.html_div.tabs({
                        collapsible: true,
                        activate: function (event, ui) {
                            wagon_card.tabs.active = wagon_card.tabs.html_div.tabs("option", "active");
                            wagon_card.tabs.activeTab(wagon_card.tabs.active, false);
                        },
                    });
                    //this.activeTable(this.active, true);
                },
                activeTab: function (active, data_refresh) {

                    if (active === 0) {
                        wagon_card.view_card(wagon_card.wagon, 0);
                    }
                    if (active === 1) {
                        wagon_card.load_repairs(wagon_card.num)
                    }

                },
                disableTabRepairs: function () {
                    wagon_card.tabs.html_div.tabs("option", "active", 0);
                    wagon_card.tabs.html_div.tabs("option", "disabled", [1]);
                },
                enableTabRepairs: function () {
                    wagon_card.tabs.html_div.tabs("option", "disabled", []);
                }
            },
            //-------------------------------------
            // Режим "Править" панель "Основная информация"
            bt_info_edit: $('button#bt-info-edit').on('click', function () {
                wagon_card.view_card(wagon_card.wagon, 1);
            }),
            // Режим "Править" панель "Основная информация"
            bt_info_delete: $('button#bt-info-delete').on('click', function () {
                wagon_card.delete_info();
            }),
            // "Сохранить изменения" панель "Основная информация"
            bt_info_save: $('button#bt-info-save').on('click', function () {
                wagon_card.save_info();
            }),
            // "Отмена" режима "Править" панель "Основная информация"
            bt_info_cancel: $('button#bt-info-cancel').on('click', function () {
                //wagon_card.clear_error();
                if (wagon_card.mode === 2) {
                    wagon_card.num = null;
                    wagon_card.wagon = null;
                    wagon_card.content.removeClass('is-visible'); // отмена по режиму "Добавить"
                } else {
                    wagon_card.view_card(wagon_card.wagon, 0); // отмена по режиму "Править"
                }
            }),
            //-------------------------------------
            // Режим "Добавить" панель "Ремонты"
            bt_repairs_add: $('button#bt-repairs-add').on('click', function () {
                wagon_card.view_repairs_card(6);
            }),
            // Режим "Править" панель "Ремонты"
            bt_depo_repairs_edit: $('button#bt-depo-repairs-edit').on('click', function () {
                wagon_card.view_repairs_card(3);
            }),
            // Режим "Править" панель "Ремонты"
            bt_kap_repairs_edit: $('button#bt-kap-repairs-edit').on('click', function () {
                wagon_card.view_repairs_card(4);
            }),
            // Режим "Править" панель "Ремонты"
            bt_cur_repairs_edit: $('button#bt-cur-repairs-edit').on('click', function () {
                wagon_card.view_repairs_card(5);
            }),
            // Режим "Править" панель "Ремонты"
            bt_depo_repairs_delete: $('button#bt-depo-repairs-delete').on('click', function () {
                wagon_card.delete_repair(wagon_card.repairs_depo_id);
            }),
            // Режим "Править" панель "Ремонты"
            bt_kap_repairs_delete: $('button#bt-kap-repairs-delete').on('click', function () {
                wagon_card.delete_repair(wagon_card.repairs_kap_id);
            }),
            // Режим "Править" панель "Ремонты"
            bt_cur_repairs_delete: $('button#bt-cur-repairs-delete').on('click', function () {
                wagon_card.delete_repair(wagon_card.repairs_cur_id);
            }),
            // "Сохранить изменения" панель "Ремонты"
            bt_repairs_save: $('button#bt-repairs-save').on('click', function () {
                wagon_card.save_repairs();
            }),
            // "Отмена" режима "Править" панель "Ремонты"
            bt_repairs_cancel: $('button#bt-repairs-cancel').on('click', function () {
                //wagon_card.clear_error();
                wagon_card.view_repairs_card(0);
            }),

            // Основные характеристики
            content: $('.cd-wagon-content'),
            // сообщения
            wagon_content_message: $('div#wagon-content-success-alert'),
            num_wagon_view: $('input#num-wagon-view'),
            num_wagon_edit: $('input#num-wagon-edit'),
            state_wagon_view: $('input#state-wagon-view'),
            state_wagon_edit: null,
            station_wagon_view: $('input#station-wagon-view'),
            station_wagon_edit: $('input#station-wagon-edit'),
            genus_wagon_view: $('input#genus-wagon-view'),
            genus_wagon_edit: null,
            type_wagon_view: $('input#type-wagon-view'),
            type_wagon_edit: null,
            code_model_wagon_view: $('input#code-model-wagon-view'),
            code_model_wagon_edit: $('input#code-model-wagon-edit'),
            wagon_manufacturer_wagon_view: $('input#wagon-manufacturer-wagon-view'),
            wagon_manufacturer_wagon_edit: null,
            year_wagon_create_wagon_view: $('input#year-wagon-create-wagon-view'),
            year_wagon_create_wagon_edit: $('input#year-wagon-create-wagon-edit'),
            carrying_capacity_wagon_view: $('input#carrying-capacity-wagon-view'),
            carrying_capacity_wagon_edit: $('input#carrying-capacity-wagon-edit'),
            tara_wagon_view: $('input#tara-wagon-view'),
            tara_wagon_edit: $('input#tara-wagon-edit'),
            body_volume_wagon_view: $('input#body-volume-wagon-view'),
            body_volume_wagon_edit: $('input#body-volume-wagon-edit'),
            axis_length_wagon_view: $('input#axis-length-wagon-view'),
            axis_length_wagon_edit: $('input#axis-length-wagon-edit'),
            type_repairs_wagon_view: $('input#type-repairs-wagon-view'),
            type_repairs_wagon_edit: null,
            date_type_repairs_wagon_view: $('input#date-type-repairs-wagon-view'),
            date_type_repairs_wagon_edit: $('input#date-type-repairs-wagon-edit'),
            type_ownership_wagon_view: $('input#type-ownership-wagon-view'),
            type_ownership_wagon_edit: null,
            owner_wagon_view: $('input#owner-wagon-view'),
            owner_wagon_edit: null,
            date_registration_wagon_view: $('input#date-registration-wagon-view'),
            date_registration_wagon_edit: $('input#date-registration-wagon-edit'),
            lessor_wagon_view: $('input#lessor-wagon-view'),
            lessor_wagon_edit: null,
            operator_wagon_view: $('input#operator-wagon-view'),
            operator_wagon_edit: null,
            poligon_travel_wagon_view: $('input#poligon-travel-wagon-view'),
            poligon_travel_wagon_edit: null,
            special_conditions_view: $('input#special-conditions-view'),
            special_conditions_edit: null,
            // Ремонты 
            depo_date_wagons_repairs_view: $('input#depo-date-wagons-repairs-view'),
            depo_internal_railroad_wagons_repairs_view: $('input#depo-internal-railroad-wagons-repairs-view'),
            depo_code_depo_wagons_repairs_view: $('input#depo-code-depo-wagons-repairs-view'),
            kap_date_wagons_repairs_view: $('input#kap-date-wagons-repairs-view'),
            kap_internal_railroad_wagons_repairs_view: $('input#kap-internal-railroad-wagons-repairs-view'),
            kap_code_depo_wagons_repairs_view: $('input#kap-code-depo-wagons-repairs-view'),
            cur_date_wagons_repairs_view: $('input#cur-date-wagons-repairs-view'),
            cur_internal_railroad_wagons_repairs_view: $('input#cur-internal-railroad-wagons-repairs-view'),
            cur_code_depo_wagons_repairs_view: $('input#cur-code-depo-wagons-repairs-view'),
            cur_type_wagons_repairs_view: $('input#cur-type-wagons-repairs-view'),
            cur_date_non_working_wagons_repairs_view: $('input#cur-date-non-working-wagons-repairs-view'),
            cur_condition_wagons_repairs_view: $('input#cur-condition-wagons-repairs-view'),

            date_wagons_repairs_edit: $('input#date-wagons-repairs-edit'),
            internal_railroad_wagons_repairs_edit: null,
            code_depo_wagons_repairs_edit: null,
            type_wagons_repairs_edit: null,
            date_non_working_wagons_repairs_edit: $('input#date-non-working-wagons-repairs-edit'),
            condition_wagons_repairs_edit: null,

            // Списки 
            list_state: null,
            list_station: null,
            list_genus_wagon: null,
            list_type_wagons: null,
            list_models_wagons: null,
            list_wagon_manufacturers: null,
            list_types_repairs_wagons: null,
            list_type_owner_ship: null,
            list_owners_wagons: null,
            list_lessors_wagons: null,
            list_operators_wagons: null,
            list_poligon_travel_wagons: null,
            list_special_conditions: null,
            list_internal_railroad: null,
            list_depo: null,
            //
            mode: 0,                    // Режим 0-view 1-edit 2 add
            num: null,                  // Номер вагона выбранного
            wagon: null,                // Информация по выбранному вагону
            repairs: null,              // Информация по ремонтам выбранного вагона
            repairs_depo_id: null,      // Информация по последнему деповскому ремонту выбранного вагона
            repair_depo: null,
            repairs_kap_id: null,       // Информация по последнему капитальному ремонту выбранного вагона
            repair_kap: null,
            repairs_cur_id: null,       // Информация по последнему текущему ремонту выбранного вагона
            repair_cur: null,
            // инициализировать
            init: function (
                list_state,
                list_station,
                list_genus_wagon,
                list_type_wagons,
                list_models_wagons,
                list_wagon_manufacturers,
                list_types_repairs_wagons,
                list_type_owner_ship,
                list_owners_wagons,
                list_lessors_wagons,
                list_operators_wagons,
                list_poligon_travel_wagons,
                list_special_conditions,
                list_internal_railroad,
                list_depo,
                list_wagons_condition

            ) {
                this.list_state = list_state;
                this.list_station = list_station;
                this.list_genus_wagon = list_genus_wagon;
                this.list_type_wagons = list_type_wagons;
                this.list_models_wagons = list_models_wagons;
                this.list_wagon_manufacturers = list_wagon_manufacturers;
                this.list_types_repairs_wagons = list_types_repairs_wagons;
                this.list_type_owner_ship = list_type_owner_ship;
                this.list_owners_wagons = list_owners_wagons;
                this.list_lessors_wagons = list_lessors_wagons;
                this.list_operators_wagons = list_operators_wagons;
                this.list_poligon_travel_wagons = list_poligon_travel_wagons;
                this.list_special_conditions = list_special_conditions;
                this.list_internal_railroad = list_internal_railroad;
                this.list_depo = list_depo;
                this.list_wagons_condition = list_wagons_condition;
                // Настроим панель 
                wagon_card.tabs.init();
                // Настройка закрыть детали проекта
                wagon_card.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    wagon_card.content.removeClass('is-visible');
                });
                // Событие создание новой карточки
                $('a#new-item').on('click', function () {
                    event.preventDefault();
                    wagon_card.view_card(null, 2); // Открыть в режиме добавить
                });
                // Инициализация выпадающих списков
                this.state_wagon_edit = cd_initSelect(
                    $('select#state-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_state,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // 
                this.station_wagon_edit = this.station_wagon_edit.autocomplete({
                    minLength: 3,
                    source: wagon_card.getAutocompleteList(wagon_card.list_station),
                    change: function (event, ui) {

                    }
                });
                //
                this.genus_wagon_edit = cd_initSelect(
                    $('select#genus-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_genus_wagon,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.type_wagon_edit = cd_initSelect(
                    $('select#type-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_type_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.code_model_wagon_edit = this.code_model_wagon_edit.autocomplete({
                    minLength: 3,
                    source: wagon_card.getAutocompleteList(wagon_card.list_models_wagons),
                    change: function (event, ui) {

                    }
                });
                //
                this.wagon_manufacturer_wagon_edit = cd_initSelect(
                    $('select#wagon-manufacturer-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_wagon_manufacturers,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.type_repairs_wagon_edit = cd_initSelect(
                    $('select#type-repairs-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_types_repairs_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.date_type_repairs_wagon_edit = this.date_type_repairs_wagon_edit.datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showAnim: 'slideDown',
                });
                //
                this.type_ownership_wagon_edit = cd_initSelect(
                    $('select#type-ownership-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_type_owner_ship,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                this.owner_wagon_edit = cd_initSelect(
                    $('select#owner-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_owners_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.date_registration_wagon_edit = this.date_registration_wagon_edit.datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showAnim: 'slideDown',
                });
                //
                this.lessor_wagon_edit = cd_initSelect(
                    $('select#lessor-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_lessors_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.operator_wagon_edit = cd_initSelect(
                    $('select#operator-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_operators_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.poligon_travel_wagon_edit = cd_initSelect(
                    $('select#poligon-travel-wagon-edit'),
                    { lang: lang },
                    wagon_card.list_poligon_travel_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.special_conditions_edit = cd_initSelect(
                    $('select#special-conditions-edit'),
                    { lang: lang },
                    wagon_card.list_special_conditions,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // ----------------------------------------------------------------
                this.date_wagons_repairs_edit = this.date_wagons_repairs_edit.datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showAnim: 'slideDown',
                });
                //
                this.internal_railroad_wagons_repairs_edit = cd_initSelect(
                    $('select#internal-railroad-wagons-repairs-edit'),
                    { lang: lang },
                    wagon_card.list_internal_railroad,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.code_depo_wagons_repairs_edit = cd_initSelect(
                    $('select#code-depo-wagons-repairs-edit'),
                    { lang: lang },
                    wagon_card.list_depo,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.type_wagons_repairs_edit = cd_initSelect(
                    $('select#type-wagons-repairs-edit'),
                    { lang: lang },
                    wagon_card.list_types_repairs_wagons,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                this.date_non_working_wagons_repairs_edit = this.date_non_working_wagons_repairs_edit.datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showAnim: 'slideDown',
                });
                //
                this.condition_wagons_repairs_edit = cd_initSelect(
                    $('select#condition-wagons-repairs-edit'),
                    { lang: lang },
                    wagon_card.list_wagons_condition,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                //
                $("form#wagon-content").submit(function () {
                    event.preventDefault();
                    var form = $(this);
                    return true; //отправляете ваш submit
                });
            },
            //----------------------------------------------------------------------
            // 
            load_repairs: function (num) {
                wagon_card.num = num;
                LockScreen(langView('mess_delay', langs));
                // Загрузим проект
                mors.getCardsWagonsRepairsOfNum(num, function (result_card_repairs) {
                    wagon_card.repairs = result_card_repairs;
                    // Определим последние ремонты
                    wagon_card.bt_depo_repairs_edit.prop('disabled', true);
                    wagon_card.bt_kap_repairs_edit.prop('disabled', true);
                    wagon_card.bt_cur_repairs_edit.prop('disabled', true);
                    wagon_card.bt_depo_repairs_delete.prop('disabled', true);
                    wagon_card.bt_kap_repairs_delete.prop('disabled', true);
                    wagon_card.bt_cur_repairs_delete.prop('disabled', true);
                    wagon_card.repair_depo = null;
                    wagon_card.repair_kap = null;
                    wagon_card.repair_cur = null;
                    wagon_card.repairs_depo_id = null;
                    wagon_card.repairs_kap_id = null;
                    wagon_card.repairs_cur_id = null;
                    // Отсортируем по убыванию
                    wagon_card.repairs.sort(function compareNumbers(a, b) {
                        if (ISOtoDate(a.date_repair) > ISOtoDate(b.date_repair)) return -1;
                        if (ISOtoDate(a.date_repair) == ISOtoDate(b.date_repair)) return 0;
                        if (ISOtoDate(a.date_repair) < ISOtoDate(b.date_repair)) return 1;
                    });
                    wagon_card.repairs.forEach(function (item, index, array) {
                        if ((item.id_type_repair_wagon === 1 || item.id_type_repair_wagon === 3) && wagon_card.repairs_kap_id === null) {
                            wagon_card.repairs_kap_id = item.id
                            wagon_card.repair_kap = item;
                            wagon_card.bt_kap_repairs_edit.prop('disabled', false);
                            wagon_card.bt_kap_repairs_delete.prop('disabled', false);
                        }; // Определим последний капитальный
                        if (item.id_type_repair_wagon === 2 && wagon_card.repairs_depo_id === null) {
                            wagon_card.repairs_depo_id = item.id
                            wagon_card.repair_depo = item;
                            wagon_card.bt_depo_repairs_edit.prop('disabled', false);
                            wagon_card.bt_depo_repairs_delete.prop('disabled', false);
                        }; // Определим последний деповский
                        if (item.id_type_repair_wagon > 3 && wagon_card.repairs_cur_id === null) {
                            wagon_card.repairs_cur_id = item.id
                            wagon_card.repair_cur = item;
                            wagon_card.bt_cur_repairs_edit.prop('disabled', false);
                            wagon_card.bt_cur_repairs_delete.prop('disabled', false);
                        }; // Определим последний текущий
                    });
                    wagon_card.mode = 0; // сбросим на просмотр
                    wagon_card.view_repairs_card(wagon_card.mode);
                    LockScreenOff();
                });
            },
            // Отобразить данные на экране
            view_repairs_card: function (mode) {
                wagon_card.mode = mode;
                wagon_card.clear_error(); // очистить сообщения об ошибках
                wagon_card.mode_clear(); // Очистить режим панелей
                if (mode === 0) {
                    wagon_card.out_repairs_card_mode_view(wagon_card.repair_depo, wagon_card.repair_kap, wagon_card.repair_cur); //Отобразить информацию режим "Просмотр"
                } else {
                    var rep = null;
                    switch (mode) {
                        case 3: {
                            wagon_card.out_repairs_card_mode_edit(wagon_card.repair_depo);
                            break;
                        }
                        case 4: {
                            wagon_card.out_repairs_card_mode_edit(wagon_card.repair_kap);
                            break;
                        }
                        case 5: {
                            wagon_card.out_repairs_card_mode_edit(wagon_card.repair_cur);
                            break;
                        }
                        case 6: {
                            wagon_card.out_repairs_card_mode_edit(null);
                            break;
                        }
                    }
                }
                wagon_card.content.addClass('is-visible');
            },
            //
            out_repairs_card_mode_view: function (repair_depo, repair_kap, repair_cur) {
                // ДЕПО
                wagon_card.depo_date_wagons_repairs_view.val(repair_depo && repair_depo.date_repair ? StringDateToFormatStringDate(repair_depo.date_repair, lang) : '');
                wagon_card.depo_internal_railroad_wagons_repairs_view.val(repair_depo ? this.getTextOfList(this.list_internal_railroad, repair_depo.id_internal_railroad) : '');
                wagon_card.depo_code_depo_wagons_repairs_view.val(repair_depo ? this.getTextOfList(this.list_depo, repair_depo.code_depo) : '');

                // КАП
                wagon_card.kap_date_wagons_repairs_view.val(repair_kap && repair_kap.date_repair ? StringDateToFormatStringDate(repair_kap.date_repair, lang) : '');
                wagon_card.kap_internal_railroad_wagons_repairs_view.val(repair_kap ? this.getTextOfList(this.list_internal_railroad, repair_kap.id_internal_railroad) : '');
                wagon_card.kap_code_depo_wagons_repairs_view.val(repair_kap ? this.getTextOfList(this.list_depo, repair_kap.code_depo) : '');

                // Тек
                wagon_card.cur_date_wagons_repairs_view.val(repair_cur && repair_cur.date_repair ? StringDateToFormatStringDate(repair_cur.date_repair, lang) : '');
                wagon_card.cur_internal_railroad_wagons_repairs_view.val(repair_cur ? this.getTextOfList(this.list_internal_railroad, repair_cur.id_internal_railroad) : '');
                wagon_card.cur_code_depo_wagons_repairs_view.val(repair_cur ? this.getTextOfList(this.list_depo, repair_cur.code_depo) : '');
                wagon_card.cur_type_wagons_repairs_view.val(repair_cur ? this.getTextOfList(this.list_types_repairs_wagons, repair_cur.id_type_repair_wagon) : '');
                wagon_card.cur_date_non_working_wagons_repairs_view.val(repair_cur && repair_cur.date_repair ? StringDateToFormatStringDate(repair_cur.date_non_working, lang) : '');
                wagon_card.cur_condition_wagons_repairs_view.val(repair_cur ? this.getTextOfList(this.list_wagons_condition, repair_cur.id_wagons_condition) : '');

                // отобразим панель "Основная информация" или "Ремонты"
                if (wagon_card.tabs.active === 0) {
                    wagon_card.mode_view_info();
                } else {
                    wagon_card.mode_view_repairs();
                }
            },
            //
            out_repairs_card_mode_edit: function (repairs) {

                if (repairs && repairs.date_repair) {
                    wagon_card.date_wagons_repairs_edit.datepicker("setDate", StringDateToFormatStringDate(repairs.date_repair, lang));
                } else {
                    wagon_card.date_wagons_repairs_edit.datepicker("setDate", "");
                }
                wagon_card.internal_railroad_wagons_repairs_edit.val(repairs && repairs.id_internal_railroad !== null ? repairs.id_internal_railroad : -1);
                wagon_card.code_depo_wagons_repairs_edit.val(repairs && repairs.code_depo !== null ? repairs.code_depo : -1);
                wagon_card.type_wagons_repairs_edit.val(repairs && repairs.id_type_repair_wagon !== null ? repairs.id_type_repair_wagon : -1);
                if (repairs && repairs.date_non_working) {
                    wagon_card.date_non_working_wagons_repairs_edit.datepicker("setDate", StringDateToFormatStringDate(repairs.date_non_working, lang));
                } else {
                    wagon_card.date_non_working_wagons_repairs_edit.datepicker("setDate", "");
                }
                wagon_card.condition_wagons_repairs_edit.val(repairs && repairs.id_wagons_condition !== null ? repairs.id_wagons_condition : -1);
                //
                if (wagon_card.tabs.active === 0) {
                    wagon_card.mode_edit_info();
                } else {
                    wagon_card.mode_edit_repairs();
                }
            },
            //----------------------------------------------------------------------
            // Загрузить данные и показать
            load_card: function (num) {
                this.num = num;
                LockScreen(langView('mess_delay', langs));
                // Загрузим проект
                mors.getCardsWagonsOfNum(num, function (result_card_wagon) {
                    wagon_card.wagon = result_card_wagon;
                    wagon_card.mode = 0; // сбросим на просмотр
                    wagon_card.view_card(wagon_card.wagon, wagon_card.mode);
                    LockScreenOff();
                });
            },
            // Отобразить данные на экране
            view_card: function (wagon, mode) {
                this.mode = mode;
                this.clear_error(); // очистить сообщения об ошибках
                this.mode_clear(); // Очистить режим панелей
                if (mode === 0) {
                    wagon_card.out_card_mode_view(wagon); //Отобразить информацию режим "Просмотр"
                } else {
                    wagon_card.out_card_mode_edit(wagon); //Отобразить информацию режим "Править", "Добаввить"
                }
                wagon_card.content.addClass('is-visible');
            },
            // Отобразить информацию режим "Просмотр"
            out_card_mode_view: function (wagon) {
                //
                this.num_wagon_view.val(wagon ? wagon.num : '');
                this.state_wagon_view.val(wagon ? this.getTextOfList(this.list_state, wagon.id_state) : '');
                this.station_wagon_view.val(wagon && wagon.code_station ? this.getTextOfList(this.list_station, wagon.code_station) : '');
                this.genus_wagon_view.val(wagon ? this.getTextOfList(this.list_genus_wagon, wagon.id_genus_wagon) : '');
                this.type_wagon_view.val(wagon ? this.getTextOfList(this.list_type_wagons, wagon.id_type_wagon) : '');
                this.code_model_wagon_view.val(wagon && wagon.code_model_wagon ? this.getTextOfList(this.list_models_wagons, wagon.code_model_wagon) : '');
                this.wagon_manufacturer_wagon_view.val(wagon ? this.getTextOfList(this.list_wagon_manufacturers, wagon.id_wagon_manufacturer) : '');
                this.year_wagon_create_wagon_view.val(wagon && wagon.year_wagon_create ? wagon.year_wagon_create : '');
                this.carrying_capacity_wagon_view.val(wagon && wagon.carrying_capacity ? wagon.carrying_capacity : '');
                this.tara_wagon_view.val(wagon && wagon.tara ? wagon.tara : '');
                this.body_volume_wagon_view.val(wagon && wagon.body_volume ? wagon.body_volume : '');
                this.axis_length_wagon_view.val(wagon && wagon.axis_length ? wagon.axis_length : '');
                this.type_repairs_wagon_view.val(wagon ? this.getTextOfList(this.list_types_repairs_wagons, wagon.id_type_repairs) : '');
                this.date_type_repairs_wagon_view.val(wagon && wagon.date_type_repairs ? StringDateToFormatStringDate(wagon.date_type_repairs, lang) : '');
                this.type_ownership_wagon_view.val(wagon ? this.getTextOfList(this.list_type_owner_ship, wagon.id_type_ownership) : '');
                this.owner_wagon_view.val(wagon ? this.getTextOfList(this.list_owners_wagons, wagon.id_owner_wagon) : '');
                this.date_registration_wagon_view.val(wagon && wagon.date_registration ? StringDateToFormatStringDate(wagon.date_registration, lang) : '');
                this.lessor_wagon_view.val(wagon ? this.getTextOfList(this.list_lessors_wagons, wagon.id_lessor_wagon) : '');
                this.operator_wagon_view.val(wagon ? this.getTextOfList(this.list_operators_wagons, wagon.id_operator_wagon) : '');
                this.poligon_travel_wagon_view.val(wagon ? this.getTextOfList(this.list_poligon_travel_wagons, wagon.id_poligon_travel_wagon) : '');
                this.special_conditions_view.val(wagon ? this.getTextOfList(this.list_special_conditions, wagon.id_special_conditions) : '');
                // отобразим панель "Основная информация" или "Ремонты"
                if (wagon_card.tabs.active === 0) {
                    wagon_card.mode_view_info();
                } else {
                    wagon_card.mode_view_repairs();
                }
            },
            // Отобразить информацию режим "Правки"
            out_card_mode_edit: function (wagon) {
                this.num_wagon_edit.val(wagon ? wagon.num : '');
                this.state_wagon_edit.val(wagon && wagon.id_state !== null ? wagon.id_state : -1);
                this.station_wagon_edit.val(wagon && wagon.code_station !== null ? wagon.code_station : '');
                this.genus_wagon_edit.val(wagon && wagon.id_genus_wagon !== null ? wagon.id_genus_wagon : -1);
                this.type_wagon_edit.val(wagon && wagon.id_type_wagon !== null ? wagon.id_type_wagon : -1);
                this.code_model_wagon_edit.val(wagon && wagon.code_model_wagon !== null ? wagon.code_model_wagon : '');
                this.wagon_manufacturer_wagon_edit.val(wagon && wagon.id_wagon_manufacturer !== null ? wagon.id_wagon_manufacturer : -1);
                this.year_wagon_create_wagon_edit.val(wagon && wagon.year_wagon_create ? wagon.year_wagon_create : '');
                this.carrying_capacity_wagon_edit.val(wagon && wagon.carrying_capacity ? wagon.carrying_capacity : '');
                this.tara_wagon_edit.val(wagon && wagon.tara ? wagon.tara : '');
                this.body_volume_wagon_edit.val(wagon && wagon.body_volume ? wagon.body_volume : '');
                this.axis_length_wagon_edit.val(wagon && wagon.axis_length ? wagon.axis_length : '');
                this.type_repairs_wagon_edit.val(wagon && wagon.id_type_repairs !== null ? wagon.id_type_repairs : -1);
                if (wagon && wagon.date_type_repairs) {
                    this.date_type_repairs_wagon_edit.datepicker("setDate", StringDateToFormatStringDate(wagon.date_type_repairs, lang));
                }
                this.type_ownership_wagon_edit.val(wagon && wagon.id_type_ownership !== null ? wagon.id_type_ownership : -1);
                this.owner_wagon_edit.val(wagon && wagon.id_owner_wagon !== null ? wagon.id_owner_wagon : -1);
                if (wagon && wagon.date_registration) {
                    this.date_registration_wagon_edit.datepicker("setDate", StringDateToFormatStringDate(wagon.date_registration, lang));
                }
                this.lessor_wagon_edit.val(wagon && wagon.id_lessor_wagon !== null ? wagon.id_lessor_wagon : -1);
                this.operator_wagon_edit.val(wagon && wagon.id_operator_wagon !== null ? wagon.id_operator_wagon : -1);
                this.poligon_travel_wagon_edit.val(wagon && wagon.id_poligon_travel_wagon !== null ? wagon.id_poligon_travel_wagon : -1);
                this.special_conditions_edit.val(wagon && wagon.id_special_conditions !== null ? wagon.id_special_conditions : -1);
                // Отобразить режим "Добавить" или "Править" (панель "Основная информация" или "Ремонты")
                if (wagon !== null) {
                    if (wagon_card.tabs.active === 0) {
                        wagon_card.mode_edit_info();
                    } else {
                        wagon_card.mode_edit_repairs();
                    }
                } else {
                    wagon_card.mode_add_info();
                }
            },
            // Очистить сообщения
            clear_message: function () {
                this.wagon_content_message.hide().text('');
                //this.wagon_content_message.addClass('hidden').find('div#wagon-content-message').text('');
            },
            // Вывести сообщение об ошибке
            out_error_message: function (message) {
                this.wagon_content_message.show().removeClass('alert-success').addClass('alert-danger').append(message).append($('<br />'));
            },
            // Вывести информационное сообщение
            out_info_message: function (message) {
                this.wagon_content_message.show().removeClass('alert-danger').addClass('alert-success').text(message);
            },
            // Очистить все ошибки
            clear_error: function () {
                this.clear_message();
                var fm = $('form#wagon-content');
                var fg = fm.find('input, select');
                fg.removeClass('is-valid is-invalid');

                //var fg = fm.find('.form-group').addClass('has-feedback').removeClass('has-error has-success');
                //var fcf = fg.find('.form-control-feedback').removeClass('glyphicon-ok glyphicon-remove');
            },
            //
            mode_clear: function () {
                $('.wagon-info-view').hide();
                $('.wagon-info-edit').hide();
                $('.wagon-info-add').hide();
                $('.wagon-repairs-view').hide();
                $('.wagon-repairs-edit').hide();
            },
            //
            mode_view_info: function () {
                wagon_card.tabs.enableTabRepairs();
                $('.wagon-view').show();
                $('.wagon-add').hide();
                $('.wagon-info-view').show();
                $('.wagon-info-edit').hide();
                $('.wagon-info-add').hide();
                $('.wagon-repairs-view').hide();
                $('.wagon-repairs-edit').hide();
            },
            //
            mode_edit_info: function () {
                wagon_card.tabs.enableTabRepairs();
                $('.wagon-view').show();
                $('.wagon-add').hide();
                $('.wagon-info-view').hide();
                $('.wagon-info-edit').show();
                $('.wagon-info-add').hide();
                $('.wagon-repairs-view').hide();
                $('.wagon-repairs-edit').hide();
            },
            //
            mode_add_info: function () {
                wagon_card.tabs.disableTabRepairs();
                $('.wagon-view').hide();
                $('.wagon-add').show();
                $('.wagon-info-view').hide();
                $('.wagon-info-edit').show();
                $('.wagon-info-add').show();
                $('.wagon-repairs-view').hide();
                $('.wagon-repairs-edit').hide();
            },
            //
            mode_view_repairs: function () {
                wagon_card.tabs.enableTabRepairs();
                $('.wagon-view').show();
                $('.wagon-add').hide();
                $('.wagon-info-view').hide();
                $('.wagon-info-edit').hide();
                $('.wagon-info-add').hide();
                $('.wagon-repairs-view').show();
                $('.wagon-repairs-edit').hide();
            },
            //
            mode_edit_repairs: function () {
                wagon_card.tabs.enableTabRepairs();
                $('.wagon-view').show();
                $('.wagon-add').hide();
                $('.wagon-info-view').hide();
                $('.wagon-info-edit').hide();
                $('.wagon-info-add').hide();
                $('.wagon-repairs-view').hide();
                $('.wagon-repairs-edit').show();
            },
            //----------ВАЛИДАЦИЯ-------------------------------------------------------
            // Установить признак ошибка
            set_control_error: function (o, message) {

                o.removeClass('is-valid').addClass('is-invalid').next(".invalid-feedback").text(message);

            //                var formGroupCaptcha = o.parents('div');
//var glyphiconCaptcha = formGroupCaptcha.find('.form-control-feedback');
                //var formGroupCaptcha = o.parents('.form-group');
                //var glyphiconCaptcha = formGroupCaptcha.find('.form-control-feedback');
                //formGroupCaptcha.addClass('has-error').removeClass('has-success');
                //glyphiconCaptcha.addClass('glyphicon-remove').removeClass('glyphicon-ok');
            },
            // Установить признак Ok
            set_control_ok: function (o) {
                o.removeClass('is-invalid').addClass('is-valid');
                //var formGroupCaptcha = o.parents('.form-group');
                //var glyphiconCaptcha = formGroupCaptcha.find('.form-control-feedback');
                //formGroupCaptcha.addClass('has-success').removeClass('has-error');
                //glyphiconCaptcha.addClass('glyphicon-ok').removeClass('glyphicon-remove');
            },
            // Проверим Select выбор сделан?
            checkSelection: function (o, message) {
                if (Number(o.val()) < 0) {
                    wagon_card.set_control_error(o,message);
                    wagon_card.out_error_message(message);
                    return false;
                } else {
                    wagon_card.set_control_ok(o);
                    return true;
                }
            },
            // Проверим Input введенное значение есть в справочнике
            checkInputOfList: function (o, list, message) {
                if (o.val() !== "") {
                    var value = o.val();
                    var obj = getObjects(list, 'value', value);
                    if (obj.length > 0) {
                        wagon_card.set_control_ok(o);
                        return true;
                    } else {
                        wagon_card.set_control_error(o, message);
                        wagon_card.out_error_message(message);
                        return false;
                    }
                } else {
                    wagon_card.set_control_ok(o);
                    return true;
                }
            },
            // Проверим Input введенное значение входит в диапазон
            checkInputOfRange: function (o, min, max, message) {
                if (o.val() !== "") {
                    var value = Number(o.val());
                    if (isNaN(value) || value > max || value < min) {
                        wagon_card.set_control_error(o, message);
                        wagon_card.out_error_message(message);
                        return false;
                    } else {
                        wagon_card.set_control_ok(o);
                        return true;
                    }
                } else {
                    wagon_card.set_control_ok(o);
                    return true;
                }
            },
            // Проверим Input размер текста
            checkInputOfLength: function (o, min, max, message) {
                var value = Number(o.val());
                if (o.val().length > max || o.val().length < min) {
                    wagon_card.set_control_error(o, message);
                    wagon_card.out_error_message(message);
                    return false;
                } else {
                    wagon_card.set_control_ok(o);
                    return true;
                }
            },
            // Проверить Input введенное значение даты
            checkInputOfDate: function (o, format) {
                if (o.val() !== "") {
                    var s = o.val();
                    var dt = moment(o.val(), format);
                    if (!dt.isValid()) {
                        wagon_card.set_control_error(o,"Дата должна быть указана в формате '" + format + "'");
                        wagon_card.out_error_message("Дата должна быть указана в формате '" + format + "'");
                        return false;
                    } else {
                        wagon_card.set_control_ok(o);
                        return true;
                    }
                } else {
                    wagon_card.set_control_ok(o);
                    return true;
                }
            },
            // Проверка валидности формы основных настроек
            validation_info: function () {
                this.clear_error();
                var valid = true;

                if (wagon_card.mode === 2) {
                    valid = valid & wagon_card.checkInputOfLength(wagon_card.num_wagon_edit, 8, 8, "Номер вагона должен иметь размер 8 чисел.");
                }
                // Проверим государство собственник
                valid = valid & wagon_card.checkSelection(wagon_card.state_wagon_edit, "Укажите государство собственник");
                // Если указана станция проверим
                valid = valid & wagon_card.checkInputOfList(wagon_card.station_wagon_edit, wagon_card.list_station, "Код станции не найден в справочнике.");
                valid = valid & wagon_card.checkSelection(wagon_card.genus_wagon_edit, "Выберите род подвижного состава");
                wagon_card.set_control_ok(wagon_card.type_wagon_edit);
                valid = valid & wagon_card.checkInputOfList(wagon_card.code_model_wagon_edit, wagon_card.list_models_wagons, "Модель вагона не найдена в справочнике.");
                wagon_card.set_control_ok(wagon_card.wagon_manufacturer_wagon_edit);
                valid = valid & wagon_card.checkInputOfRange(wagon_card.year_wagon_create_wagon_edit, 1980, new Date().getFullYear(), "Год постройки должен быть в диапазоне от 1980 по " + new Date().getFullYear());
                valid = valid & wagon_card.checkInputOfRange(wagon_card.carrying_capacity_wagon_edit, 60.0, 80.0, "Грузоподъемность должна быть в диапазоне от 60.0 до 80.0 тон.");
                valid = valid & wagon_card.checkInputOfRange(wagon_card.tara_wagon_edit, 20.0, 30.0, "Тара должна быть в диапазоне от 20.0 до 30.0 тон.");
                valid = valid & wagon_card.checkInputOfRange(wagon_card.body_volume_wagon_edit, 38.0, 94.0, "Объем кузова должен быть в диапазоне от 38.0 до 94.0 м.");
                valid = valid & wagon_card.checkInputOfRange(wagon_card.axis_length_wagon_edit, 13.0, 15.0, "Длина по осям должна быть в диапазоне от 13.0 до 15.0 м.");
                wagon_card.set_control_ok(wagon_card.type_repairs_wagon_edit);
                valid = valid & wagon_card.checkInputOfDate(wagon_card.date_type_repairs_wagon_edit, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & wagon_card.checkSelection(wagon_card.type_ownership_wagon_edit, "Укажите признак собственности");
                valid = valid & wagon_card.checkSelection(wagon_card.owner_wagon_edit, "Укажите собственника");
                valid = valid & wagon_card.checkInputOfDate(wagon_card.date_registration_wagon_edit, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                wagon_card.set_control_ok(wagon_card.lessor_wagon_edit);
                wagon_card.set_control_ok(wagon_card.operator_wagon_edit);
                wagon_card.set_control_ok(wagon_card.poligon_travel_wagon_edit);
                wagon_card.set_control_ok(wagon_card.special_conditions_edit);
                return valid;
            },
            // Проверка валидности формы ремонтов
            validation_repairs: function () {
                this.clear_error();
                var valid = true;
                valid = valid & wagon_card.checkSelection(wagon_card.type_wagons_repairs_edit, "Укажите вид ремонта");
                valid = valid & wagon_card.checkInputOfDate(wagon_card.date_wagons_repairs_edit, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & wagon_card.checkInputOfDate(wagon_card.date_non_working_wagons_repairs_edit, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                wagon_card.set_control_ok(wagon_card.internal_railroad_wagons_repairs_edit);
                wagon_card.set_control_ok(wagon_card.code_depo_wagons_repairs_edit);
                wagon_card.set_control_ok(wagon_card.condition_wagons_repairs_edit);
                return valid;
            },
            // Сохранить изменения основных настроек по карте вагона 
            save_info: function () {
                var valid = wagon_card.validation_info();
                if (valid) {
                    var wagon = wagon_card.get_wagon();
                    if (wagon_card.mode === 2) {
                        // Добавить вагон
                        mors.postCardsWagons(wagon, function (result_add) {
                            if (result_add > 0) {
                                // Ок
                                table_wagon_cards.addRow(wagon);
                                wagon_card.load_card(wagon.num);
                            } else {
                                wagon_card.clear_message();
                                wagon_card.out_error_message("При добавлении нового вагона произошла ошибка!");
                            }
                        });
                    } else {
                        // Обновить вагон
                        mors.putCardsWagons(wagon, function (result_upd) {
                            if (result_upd > 0) {
                                // Ок
                                table_wagon_cards.updateRow(wagon);
                                wagon_card.load_card(wagon.num);
                            } else {
                                wagon_card.clear_message();
                                wagon_card.out_error_message("При обновлении вагона произошла ошибка!");
                            }
                        });
                    }
                }
            },
            // Удалить вагон
            delete_info: function () {
                if (wagon_card.num) {
                    mors.deleteCardsWagons(wagon_card.num,
                        function (result_del) {
                            if (result_del > 0) {
                                table_wagon_cards.deleteRow();
                                wagon_card.content.removeClass('is-visible');
                            } else {
                                wagon_card.clear_message();
                                wagon_card.out_error_message("При удалении вагона произошла ошибка!");
                            }
                        });
                }
            },
            // Сохранить изменения ремонтов по карте вагона 
            save_repairs: function () {
                var valid = wagon_card.validation_repairs();
                if (valid) {
                    var repairs = wagon_card.get_repairs();
                    if (wagon_card.mode === 6) {
                        // Добавить ремонт
                        mors.postCardsWagonsRepairs(repairs, function (result_add) {
                            if (result_add > 0) {
                                // Ок
                                wagon_card.load_repairs(wagon_card.num);
                            } else {
                                wagon_card.clear_message();
                                wagon_card.out_error_message("При добавлении нового ремонта вагона произошла ошибка!");
                            }
                        });
                    } else {
                        // Обновить ремонт
                        mors.putCardsWagonsRepairs(repairs, function (result_upd) {
                            if (result_upd > 0) {
                                // Ок
                                wagon_card.load_repairs(wagon_card.num);
                            } else {
                                wagon_card.clear_message();
                                wagon_card.out_error_message("При обновлении ремонта вагона произошла ошибка!");
                            }
                        });
                    }
                }
            },
            // Удалить ремонт
            delete_repair: function (id) {
                if (id) {
                    mors.deleteCardsWagonsRepairs(id,
                        function (result_del) {
                            if (result_del > 0) {
                                wagon_card.load_repairs(wagon_card.num);
                            } else {
                                wagon_card.clear_message();
                                wagon_card.out_error_message("При удалении записи ремонта вагона произошла ошибка!");
                            }
                        });
                }
            },
            // Получить новый объект карта вагона
            get_wagon: function () {
                // Получим старый вагон
                var old_wagon = wagon_card.wagon;
                var mode = wagon_card.mode;
                return {
                    num: mode !== 2 && old_wagon ? old_wagon.num : Number(wagon_card.num_wagon_edit.val()),
                    id_genus_wagon: get_select_number_value(wagon_card.genus_wagon_edit),
                    id_state: get_select_number_value(wagon_card.state_wagon_edit),
                    id_wagon_manufacturer: get_select_number_value(wagon_card.wagon_manufacturer_wagon_edit),
                    year_wagon_create: get_input_value(wagon_card.year_wagon_create_wagon_edit),
                    code_station: get_input_value(wagon_card.station_wagon_edit),
                    carrying_capacity: get_input_value(wagon_card.carrying_capacity_wagon_edit),
                    tara: get_input_value(wagon_card.tara_wagon_edit),
                    id_type_repairs: get_select_number_value(wagon_card.type_repairs_wagon_edit),
                    date_type_repairs: toISOStringTZ(get_date_value(wagon_card.date_type_repairs_wagon_edit.datepicker("getDate"), lang)),
                    code_model_wagon: wagon_card.code_model_wagon_edit.val(),
                    id_type_wagon: get_select_number_value(wagon_card.type_wagon_edit),
                    axis_length: get_input_value(wagon_card.axis_length_wagon_edit),
                    body_volume: get_input_value(wagon_card.body_volume_wagon_edit),
                    id_type_ownership: get_select_number_value(wagon_card.type_ownership_wagon_edit),
                    id_owner_wagon: get_select_number_value(wagon_card.owner_wagon_edit),
                    date_registration: toISOStringTZ(get_date_value(wagon_card.date_registration_wagon_edit.datepicker("getDate"), lang)),
                    id_lessor_wagon: get_select_number_value(wagon_card.lessor_wagon_edit),
                    id_operator_wagon: get_select_number_value(wagon_card.operator_wagon_edit),
                    id_poligon_travel_wagon: get_select_number_value(wagon_card.poligon_travel_wagon_edit),
                    id_special_conditions: get_select_number_value(wagon_card.special_conditions_edit),
                    sap: null,
                    note: '',
                    create: mode !== 2 && old_wagon ? old_wagon.create : toISOStringTZ(new Date()),
                    create_user: mode !== 2 && old_wagon ? old_wagon.create_user : user_name,
                    change: toISOStringTZ(new Date()), //'2020-01-02T00:00:00'
                    change_user: user_name,
                }
            },

            get_repairs: function () {
                // Получим старый ремонт
                var old_repairs = null;
                var mode = wagon_card.mode;
                switch (mode) {
                    case 3: {
                        old_repairs = wagon_card.repair_depo;
                        break;
                    }
                    case 4: {
                        old_repairs = wagon_card.repair_kap;
                        break;
                    }
                    case 5: {
                        old_repairs = wagon_card.repair_cur;
                        break;
                    }
                }
                return {
                    id: mode !== 6 && old_repairs ? old_repairs.id : 0,
                    num: wagon_card.num,
                    id_type_repair_wagon: get_select_number_value(wagon_card.type_wagons_repairs_edit),
                    date_repair: toISOStringTZ(get_date_value(wagon_card.date_wagons_repairs_edit.datepicker("getDate"), lang)),
                    id_internal_railroad: get_select_number_value(wagon_card.internal_railroad_wagons_repairs_edit),
                    code_depo: get_select_number_value(wagon_card.code_depo_wagons_repairs_edit),
                    date_non_working: toISOStringTZ(get_date_value(wagon_card.date_non_working_wagons_repairs_edit.datepicker("getDate"), lang)),
                    id_wagons_condition: get_select_number_value(wagon_card.condition_wagons_repairs_edit),
                    note: '',
                    create: mode !== 6 && old_repairs ? old_repairs.create : toISOStringTZ(new Date()),
                    create_user: mode !== 2 && old_repairs ? old_repairs.create_user : user_name,
                    change: toISOStringTZ(new Date()),
                    change_user: user_name,
                }
            },
            // Получить список для выбора в компоненте JQuery UI Autocomplete
            getAutocompleteList: function (list) {
                var alist = [];
                if (list) {
                    for (i = 0, j = list.length; i < j; i++) {
                        alist.push({ value: list[i].value, label: list[i].value + " - " + list[i].text });
                    }
                }
                return alist;
            },
            // Получить значение поля из массива
            getTextOfList: function (list, id) {
                if (list) {
                    var obj = getObjects(list, 'value', id)
                    return obj && obj.length > 0 ? obj[0].text : null;
                } return null;
            }
        };
    // Инициализация
    table_wagon_cards.initObject();
    if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
    //Настроим фильтр open/close lateral filter
    $('.cd-filter-trigger').on('click', function () {
        triggerFilter(true);
    });

    $('.cd-filter .cd-close').on('click', function () {
        triggerFilter(false);
    });

    function triggerFilter($bool) {
        var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
        elementsToTrigger.each(function () {
            $(this).toggleClass('filter-is-visible', $bool);
        });
    }



    // Загрузка библиотек
    loadReference(function (result) {
        wagon_card.init(
            mors.uz_dir.getListStates('id', 'state'),
            mors.uz_dir.getListStation('code_cs', 'station'),
            mors.ids_dir.getListGenusWagons('id', 'genus', lang),
            mors.ids_dir.getListTypeWagons('id', 'type', lang),
            mors.ids_dir.getListModelsWagons('code', 'model', lang),
            mors.ids_dir.getListWagonManufacturers('id', 'name', lang),
            mors.ids_dir.getListTypesRepairsWagons('id', 'type_repairs', lang),
            mors.ids_dir.getListTypeOwnerShip('id', 'type_ownership', lang),
            mors.ids_dir.getListOwnersWagons('id', 'owner', lang),
            mors.ids_dir.getListLessorsWagons('id', 'lessors', lang),
            mors.ids_dir.getListOperatorsWagons('id', 'operators', lang),
            mors.ids_dir.getListPoligonTravelWagons('id', 'poligon_travel', lang),
            mors.ids_dir.getListSpecialConditions('id', 'special_conditions', lang),
            mors.uz_dir.getListInternalRailroad('id', 'internal_railroad'),
            mors.ids_dir.getListDEPO('code', 'depo', lang),
            mors.ids_dir.getListWagonsCondition('id', 'condition', lang)
        );
        table_wagon_cards.viewTable(false);
    });

});

//    //// Ремонты 
//    //this.depo_date_wagons_repairs_view = ;
//    //this.depo_internal_railroad_wagons_repairs_view = ;
//    //this.depo_code_depo_wagons_repairs_view = ;
//    //this.kap_date_wagons_repairs_view = ;
//    //this.kap_internal_railroad_wagons_repairs_view = ;
//    //this.kap_code_depo_wagons_repairs_view = ;
//    //this.cur_date_wagons_repairs_view = ;
//    //this.cur_internal_railroad_wagons_repairs_view = ;
//    //this.cur_code_depo_wagons_repairs_view = ;
//    //this.cur_type_wagons_repairs_view = ;
//    //this.cur_date_non_working_wagons_repairs_view = ;
//    //this.cur_condition_wagons_repairs_view = ;