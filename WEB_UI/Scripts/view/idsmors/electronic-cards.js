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

    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        mors = new IDS_MORS(lang), // Создадим класс IDS_MORS
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            //mors.load(['cards_wagons', 'cards_wagons_repairs'], function () {
            mors.load([], function () {
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
        table_fuel_sales = {
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
                        $(row).attr('num', data.num);
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
                                if (table_fuel_sales.select) {
                                    wagon_card.view(table_fuel_sales.select.num);
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
                    var rowData = table_fuel_sales.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_fuel_sales.select = rowData[0];
                        table_fuel_sales.obj.button(0).enable(true);
                    } else {
                        table_fuel_sales.obj.button(0).enable(false);
                    }
                }).on('deselect', function (e, dt, type, indexes) {
                    table_fuel_sales.select = null;
                    table_fuel_sales.obj.button(0).enable(false);
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
                            table_fuel_sales.loadDataTable(mors.list_cards_wagons);
                            table_fuel_sales.obj.draw();
                        }
                    );
                } else {
                    table_fuel_sales.loadDataTable(mors.list_cards_wagons);
                    table_fuel_sales.obj.draw();
                };
            },
            // Загрузить данные
            loadDataTable: function (data) {
                this.list = data;
                this.obj.clear();
                for (i = 0; i < data.length; i++) {
                    this.obj.row.add({
                        "num": data[i].num,
                        "id_genus_wagon": data[i].id_genus_wagon,
                        "genus_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_GenusWagons_Of_ID(data[i].id_genus_wagon, 'genus', lang) : data[i].id_genus_wagon,
                        "id_state": data[i].id_state,
                        "state": mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(data[i].id_state, 'state') : data[i].id_state,
                        "id_wagon_manufacturer": data[i].id_wagon_manufacturer,
                        "wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getValue_WagonManufacturers_Of_ID(data[i].id_wagon_manufacturer, 'name', lang) : data[i].id_wagon_manufacturer,
                        "year_wagon_create": data[i].year_wagon_create,
                        "code_station": data[i].code_station,
                        "station": mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(data[i].code_station, 'station') : data[i].code_station,
                        "carrying_capacity": data[i].carrying_capacity,
                        "tara": data[i].tara,
                        "id_type_repairs": data[i].id_type_repairs,
                        "type_repairs": mors.ids_dir !== null ? mors.ids_dir.getTypesRepairsWagons_Internal_Of_ID(data[i].id_type_repairs, 'type_repairs', lang) : data[i].id_type_repairs,
                        "date_type_repairs": data[i].date_type_repairs,
                        "code_model_wagon": data[i].code_model_wagon,
                        "id_type_wagon": data[i].id_type_wagon,
                        "type_wagon": mors.ids_dir !== null ? mors.ids_dir.getTypeWagons_Internal_Of_ID(data[i].id_type_wagon, 'type', lang) : data[i].id_type_wagon,
                        "axis_length": data[i].axis_length,
                        "body_volume": data[i].body_volume,
                        "id_type_ownership": data[i].id_type_ownership,
                        "type_ownership": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeOwnerShip_Of_ID(data[i].id_type_ownership, 'type_ownership', lang) : data[i].id_type_ownership,
                        "id_owner_wagon": data[i].id_owner_wagon,
                        "owner_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OwnersWagons_Of_ID(data[i].id_owner_wagon, 'owner', lang) : data[i].id_owner_wagon,
                        "date_registration": data[i].date_registration,
                        "id_lessor_wagon": data[i].id_lessor_wagon,
                        "lessor_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_LessorsWagons_Of_ID(data[i].id_lessor_wagon, 'lessors', lang) : data[i].id_lessor_wagon,
                        "id_operator_wagon": data[i].id_operator_wagon,
                        "operator_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OperatorsWagons_Of_ID(data[i].id_operator_wagon, 'operators', lang) : data[i].id_operator_wagon,
                        "id_poligon_travel_wagon": data[i].id_poligon_travel_wagon,
                        "poligon_travel_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_PoligonTravelWagons_Of_ID(data[i].id_poligon_travel_wagon, 'poligon_travel', lang) : data[i].id_poligon_travel_wagon,
                        "id_special_conditions": data[i].id_special_conditions,
                        "special_conditions": mors.ids_dir !== null ? (data[i].id_special_conditions !== null ? mors.ids_dir.getValue_SpecialConditions_Of_ID(data[i].id_special_conditions, 'special_conditions', lang) : "") : data[i].id_special_conditions,
                        "sap": data[i].sap,
                        "note": data[i].note,
                        "create": data[i].create,
                        "create_user": data[i].create_user,
                        "change": data[i].change,
                        "change_user": data[i].change_user,
                    });
                }
                LockScreenOff();
                table_fuel_sales.initComplete();
            },
            // Формирование элементов фильтра
            initComplete: function () {
                table_fuel_sales.obj.data().columns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).every(function () {
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
                        wagon_card.view_mode(0);
                        //table_fuel_sales.viewTable(data_refresh);
                    }
                    if (active === 1) {
                        wagon_card.view_mode(2);
                        //table_fuel_sales.viewTable(data_refresh);
                    }

                },
                disableTabRepairs: function () {
                    wagon_card.tabs.html_div.tabs("option", "active", 0);
                    wagon_card.tabs.html_div.tabs("option", "disabled", [1]);
                },
                enableTabRepairs: function () {
                    wagon_card.tabs.html_div.tabs("option", "disabled", []);
                },
            },
            // панели
            //panel_view: $('div.wagon-view').hide(),
            //panel_edit: $('div.wagon-edit').hide(),
            // кнопки управления
            bt_info_edit: $('button#bt-info-edit').on('click', function () {
                wagon_card.view_mode(1);
            }),
            // кнопки управления
            bt_info_save: $('button#bt-info-save').on('click', function () {
                //переменная formValid
                var formValid = true;
                //перебрать все элементы управления input
                $('input').each(function () {
                    //найти предков, которые имеют класс .form-group, для установления success/error
                    var formGroup = $(this).parents('.form-group');
                    //найти glyphicon, который предназначен для показа иконки успеха или ошибки
                    var glyphicon = formGroup.find('.form-control-feedback');
                    //для валидации данных используем HTML5 функцию checkValidity
                    if (this.checkValidity()) {
                        //добавить к formGroup класс .has-success, удалить has-error
                        formGroup.addClass('has-success').removeClass('has-error');
                        //добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
                        glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
                    } else {
                        //добавить к formGroup класс .has-error, удалить .has-success
                        formGroup.addClass('has-error').removeClass('has-success');
                        //добавить к glyphicon класс glyphicon-remove, удалить glyphicon-ok
                        glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
                        //отметить форму как невалидную
                        formValid = false;
                    }
                });
                if (formValid) {
                    //отобразить сообщение об успехе
                    $('#success-alert').removeClass('hidden');
                    wagon_card.view_mode(0);
                }
            }),
            bt_info_cancel: $('button#bt-info-cancel').on('click', function () {
                wagon_card.clear_error();
                if (wagon_card.mode === 4) {
                    wagon_card.content.removeClass('is-visible');
                } else {
                    wagon_card.view_mode(0);
                }

            }),
            bt_repairs_edit: $('button#bt-repairs-edit').on('click', function () {
                wagon_card.view_mode(3);
            }),
            // кнопки управления
            bt_repairs_save: $('button#bt-repairs-save').on('click', function () {
                wagon_card.view_mode(2);
            }),
            bt_repairs_cancel: $('button#bt-repairs-cancel').on('click', function () {
                wagon_card.clear_error();
                wagon_card.view_mode(2);
            }),

            // Основные характеристики
            content: $('.cd-wagon-content'),
            num_wagon_view: $('input#num-wagon-view'),
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



            //
            mode: 0,
            num: null,
            wagon: null,
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
                list_special_conditions
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
                // Настроим панель 
                wagon_card.tabs.init();
                // Настройка закрыть детали проекта
                wagon_card.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    wagon_card.content.removeClass('is-visible');
                });
                // Событие создание нового проекта
                $('a#new-item').on('click', function () {
                    event.preventDefault();
                    wagon_card.view(null);
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
                //
                $("form#wagon-content").submit(function () {
                    event.preventDefault();
                    var form = $(this);
                    return true; //отправляете ваш submit
                });
            },
            // Показать информацию
            view: function (num) {
                this.clear_error();
                //    .parents('.form-group').addClass('has-feedback');
                ////найти glyphicon, который предназначен для показа иконки успеха или ошибки
                //formGroup.find('.form-control-feedback').removeClass('glyphicon-ok glyphicon-remove');
                // Получим данные
                if (num) {
                    this.num = num;
                    LockScreen(langView('mess_delay', langs));
                    // Загрузим проект
                    mors.getCardsWagonsOfNum(num, function (result_card_wagon) {
                        wagon_card.wagon = result_card_wagon;
                        wagon_card.view_wagon(wagon_card.wagon, 0);
                        //project_detali.project = result_project;
                        //project_detali.view_mode_project(result_project, mode);
                        //project_detali.set_mode(mode, result_project.id_project_manager == pm.id);
                        ////!!! Добавить обновление списка и карточек на эеране
                        LockScreenOff();
                        //if (typeof callback === 'function') {
                        //    callback(result_project);
                        //}
                    });
                } else {
                    wagon_card.view_wagon(null, 4);
                }
                wagon_card.content.addClass('is-visible');
            },
            // Показать информацию по вагону 
            view_wagon: function (wagon, mode) {
                this.view_mode(mode);
                this.num_wagon_view.val(wagon ? wagon.num : '');
                //
                this.state_wagon_view.val(wagon ? this.getTextOfList(this.list_state, wagon.id_state) : '');
                this.state_wagon_edit.val(wagon && wagon.id_state !== null ? wagon.id_state : -1);
                //
                this.station_wagon_view.val(wagon && wagon.code_station ? this.getTextOfList(this.list_station, wagon.code_station) : '');
                //wagon.code_station = 40031;
                this.station_wagon_edit.val(wagon && wagon.code_station !== null ? wagon.code_station : '');
                //
                this.genus_wagon_view.val(wagon ? this.getTextOfList(this.list_genus_wagon, wagon.id_genus_wagon) : '');
                this.genus_wagon_edit.val(wagon && wagon.id_genus_wagon !== null ? wagon.id_genus_wagon : -1);
                //
                this.type_wagon_view.val(wagon ? this.getTextOfList(this.list_type_wagons, wagon.id_type_wagon) : '');
                this.type_wagon_edit.val(wagon && wagon.id_type_wagon !== null ? wagon.id_type_wagon : -1);
                //
                this.code_model_wagon_view.val(wagon && wagon.code_model_wagon ? this.getTextOfList(this.list_models_wagons, wagon.code_model_wagon) : '');
                //wagon.code_model_wagon = '10-475';
                this.code_model_wagon_edit.val(wagon && wagon.code_model_wagon !== null ? wagon.code_model_wagon : '');
                //
                this.wagon_manufacturer_wagon_view.val(wagon ? this.getTextOfList(this.list_wagon_manufacturers, wagon.id_wagon_manufacturer) : '');
                this.wagon_manufacturer_wagon_edit.val(wagon && wagon.id_wagon_manufacturer !== null ? wagon.id_wagon_manufacturer : -1);
                //
                this.year_wagon_create_wagon_view.val(wagon && wagon.year_wagon_create ? wagon.year_wagon_create : '');
                this.year_wagon_create_wagon_edit.val(wagon && wagon.year_wagon_create ? wagon.year_wagon_create : '');
                //
                this.carrying_capacity_wagon_view.val(wagon && wagon.carrying_capacity ? wagon.carrying_capacity : '');
                this.carrying_capacity_wagon_edit.val(wagon && wagon.carrying_capacity ? wagon.carrying_capacity : '');
                //
                this.tara_wagon_view.val(wagon && wagon.tara ? wagon.tara : '');
                this.tara_wagon_edit.val(wagon && wagon.tara ? wagon.tara : '');
                //
                this.body_volume_wagon_view.val(wagon && wagon.body_volume ? wagon.body_volume : '');
                this.body_volume_wagon_edit.val(wagon && wagon.body_volume ? wagon.body_volume : '');
                //
                this.axis_length_wagon_view.val(wagon && wagon.axis_length ? wagon.axis_length : '');
                this.axis_length_wagon_edit.val(wagon && wagon.axis_length ? wagon.axis_length : '');

                this.type_repairs_wagon_view.val(wagon ? this.getTextOfList(this.list_types_repairs_wagons, wagon.id_type_repairs) : '');
                this.type_repairs_wagon_edit.val(wagon && wagon.id_type_repairs !== null ? wagon.id_type_repairs : -1);
                //
                this.date_type_repairs_wagon_view.val(wagon && wagon.date_type_repairs ? wagon.date_type_repairs : '');
                //wagon.date_type_repairs = "2020-01-02T00:00:00";
                this.date_type_repairs_wagon_edit.val(wagon && wagon.date_type_repairs ? wagon.date_type_repairs : '');
                //
                this.type_ownership_wagon_view.val(wagon ? this.getTextOfList(this.list_type_owner_ship, wagon.id_type_ownership) : '');
                this.type_ownership_wagon_edit.val(wagon && wagon.id_type_ownership !== null ? wagon.id_type_ownership : -1);
                //
                this.owner_wagon_view.val(wagon ? this.getTextOfList(this.list_owners_wagons, wagon.id_owner_wagon) : '');
                this.owner_wagon_edit.val(wagon && wagon.id_owner_wagon !== null ? wagon.id_owner_wagon : -1);
                //
                this.date_registration_wagon_view.val(wagon && wagon.date_registration ? wagon.date_registration : '');
                //wagon.date_type_repairs = "2020-01-02T00:00:00";
                this.date_registration_wagon_edit.val(wagon && wagon.date_registration ? wagon.date_registration : '');
                //
                this.lessor_wagon_view.val(wagon ? this.getTextOfList(this.list_lessors_wagons, wagon.id_lessor_wagon) : '');
                this.lessor_wagon_edit.val(wagon && wagon.id_lessor_wagon !== null ? wagon.id_lessor_wagon : -1);
                //
                this.operator_wagon_view.val(wagon ? this.getTextOfList(this.list_operators_wagons, wagon.id_operator_wagon) : '');
                this.operator_wagon_edit.val(wagon && wagon.id_operator_wagon !== null ? wagon.id_operator_wagon : -1);
                //
                this.poligon_travel_wagon_view.val(wagon ? this.getTextOfList(this.list_poligon_travel_wagons, wagon.id_poligon_travel_wagon) : '');
                this.poligon_travel_wagon_edit.val(wagon && wagon.id_poligon_travel_wagon !== null ? wagon.id_poligon_travel_wagon : -1);
                //
                this.special_conditions_view.val(wagon ? this.getTextOfList(this.list_special_conditions, wagon.id_special_conditions) : '');
                this.special_conditions_edit.val(wagon && wagon.id_special_conditions !== null ? wagon.id_special_conditions : -1);

                //// Ремонты 
                //this.depo_date_wagons_repairs_view = ;
                //this.depo_internal_railroad_wagons_repairs_view = ;
                //this.depo_code_depo_wagons_repairs_view = ;
                //this.kap_date_wagons_repairs_view = ;
                //this.kap_internal_railroad_wagons_repairs_view = ;
                //this.kap_code_depo_wagons_repairs_view = ;
                //this.cur_date_wagons_repairs_view = ;
                //this.cur_internal_railroad_wagons_repairs_view = ;
                //this.cur_code_depo_wagons_repairs_view = ;
                //this.cur_type_wagons_repairs_view = ;
                //this.cur_date_non_working_wagons_repairs_view = ;
                //this.cur_condition_wagons_repairs_view = ;

            },
            // Активировать панель
            view_mode: function (mode) {
                wagon_card.mode_clear();
                switch (mode) {
                    case 0: wagon_card.mode_view_info(); wagon_card.mode = 0; break;
                    case 1: wagon_card.mode_edit_info(); wagon_card.mode = 1; break;
                    case 2: wagon_card.mode_view_repairs(); wagon_card.mode = 2; break;
                    case 3: wagon_card.mode_edit_repairs(); wagon_card.mode = 3; break;
                    case 4: wagon_card.mode_add_info(); wagon_card.mode = 4; break;
                }
            },

            clear_error: function () {
                var fm = $('form#wagon-content');
                var fg = fm.find('.form-group').addClass('has-feedback').removeClass('has-error has-success');
                var fcf = fg.find('.form-control-feedback').removeClass('glyphicon-ok glyphicon-remove');
            },

            mode_clear: function () {
                $('.wagon-info-view').hide();
                $('.wagon-info-edit').hide();
                $('.wagon-info-add').hide();
                $('.wagon-repairs-view').hide();
                $('.wagon-repairs-edit').hide();
            },

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
    table_fuel_sales.initObject();
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
            mors.ids_dir.getListSpecialConditions('id', 'special_conditions', lang)
        );
        table_fuel_sales.viewTable(false);
        // #myInput is a <input type="text"> element

        //$('#myInput1').on( 'keyup', function () {

        //    //table_fuel_sales.obj.search(this.value).draw();

        //    table_fuel_sales.obj.columns(1).search(this.value,false,true)
        //    table_fuel_sales.obj.draw();

        //});
        //$('#myInput2').on( 'keyup', function () {

        //    //table_fuel_sales.obj.search(this.value).draw();

        //    table_fuel_sales.obj.columns(2).search(this.value,false,true)
        //    table_fuel_sales.obj.draw();

        //});

        //var t = mors
    });

});