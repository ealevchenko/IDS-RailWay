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
                                    wagon.view(table_fuel_sales.select.num);
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
                        "genus_wagon": mors.ids_dir !== null ? mors.ids_dir.getGenusOfLocalGenusWagons(data[i].id_genus_wagon) : data[i].id_genus_wagon,
                        "id_state": data[i].id_state,
                        "state": mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(data[i].id_state, 'state') : data[i].id_state,
                        "id_wagon_manufacturer": data[i].id_wagon_manufacturer,
                        "wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getNameOfLocalWagonManufacturers(data[i].id_wagon_manufacturer) : data[i].id_wagon_manufacturer,
                        "year_wagon_create": data[i].year_wagon_create,
                        "code_station": data[i].code_station,
                        "station": mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(data[i].code_station, 'station') : data[i].code_station,
                        "carrying_capacity": data[i].carrying_capacity,
                        "tara": data[i].tara,
                        "id_type_repairs": data[i].id_type_repairs,
                        "type_repairs": mors.ids_dir !== null ? mors.ids_dir.getTypeOfLocalTypesRepairsWagons(data[i].id_type_repairs) : data[i].id_type_repairs,
                        "date_type_repairs": data[i].date_type_repairs,
                        "code_model_wagon": data[i].code_model_wagon,
                        "id_type_wagon": data[i].id_type_wagon,
                        "type_wagon": mors.ids_dir !== null ? mors.ids_dir.getTypeOfLocalTypeWagons(data[i].id_type_wagon) : data[i].id_type_wagon,
                        "axis_length": data[i].axis_length,
                        "body_volume": data[i].body_volume,
                        "id_type_ownership": data[i].id_type_ownership,
                        "type_ownership": mors.ids_dir !== null ? mors.ids_dir.getTypeOwnershipOfLocalTypeOwnerShip(data[i].id_type_ownership) : data[i].id_type_ownership,
                        "id_owner_wagon": data[i].id_owner_wagon,
                        "owner_wagon": mors.ids_dir !== null ? mors.ids_dir.getOwnerOfLocalOwnersWagons(data[i].id_owner_wagon) : data[i].id_owner_wagon,
                        "date_registration": data[i].date_registration,
                        "id_lessor_wagon": data[i].id_lessor_wagon,
                        "lessor_wagon": mors.ids_dir !== null ? mors.ids_dir.getLessorsOfLocalLessorsWagons(data[i].id_lessor_wagon) : data[i].id_lessor_wagon,
                        "id_operator_wagon": data[i].id_operator_wagon,
                        "operator_wagon": mors.ids_dir !== null ? mors.ids_dir.getOperatorsOfLocalOperatorsWagons(data[i].id_operator_wagon) : data[i].id_operator_wagon,
                        "id_poligon_travel_wagon": data[i].id_poligon_travel_wagon,
                        "poligon_travel_wagon": mors.ids_dir !== null ? mors.ids_dir.getPoligonTravelOfLocalPoligonTravelWagons(data[i].id_poligon_travel_wagon) : data[i].id_poligon_travel_wagon,
                        "id_special_conditions": data[i].id_special_conditions,
                        "special_conditions": mors.ids_dir !== null ? (data[i].id_special_conditions !== null ? mors.ids_dir.getSpecialConditionOfLocalSpecialConditions(data[i].id_special_conditions) : "") : data[i].id_special_conditions,
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
        wagon = {
            // панели
            panel_view: $('div.wagon-view').hide(),
            panel_edit: $('div.wagon-edit').hide(),
            // кнопки управления
            bt_edit: $('button#bt-edit').on('click', function () {
                wagon.view_mode(1);
            }),
            // кнопки управления
            bt_save: $('button#bt-save').on('click', function () {
                wagon.view_mode(0);
            }),
            bt_cancel: $('button#bt-cancel').on('click', function () {
                wagon.view_mode(0);
            }),
            // Основные характеристики
            content: $('.cd-wagon-content'),
            num_wagon_view: $('input#num-wagon-view'),
            state_wagon_view: $('input#state-wagon-view'),
            state_wagon_edit: null,
            station_wagon_view: $('input#station-wagon-view'),
            station_wagon_edit: $('input#station-wagon-edit'),
            genus_wagon_view: $('input#genus-wagon-view'),
            type_wagon_view: $('input#type-wagon-view'),
            code_model_wagon_view: $('input#code-model-wagon-view'),
            wagon_manufacturer_wagon_view: $('input#wagon-manufacturer-wagon-view'),
            year_wagon_create_wagon_view: $('input#year-wagon-create-wagon-view'),
            carrying_capacity_wagon_view: $('input#carrying-capacity-wagon-view'),
            tara_wagon_view: $('input#tara-wagon-view'),
            body_volume_wagon_view: $('input#body-volume-wagon-view'),
            axis_length_wagon_view: $('input#axis-length-wagon-view'),
            type_repairs_wagon_view: $('input#type-repairs-wagon-view'),
            date_type_repairs_wagon_view: $('input#date-type-repairs-wagon-view'),
            type_ownership_wagon_view: $('input#type-ownership-wagon-view'),
            owner_wagon_view: $('input#owner-wagon-view'),
            date_registration_wagon_view: $('input#date-registration-wagon-view'),
            lessor_wagon_view: $('input#lessor-wagon-view'),
            operator_wagon_view: $('input#operator-wagon-view'),
            poligon_travel_wagon_view: $('input#poligon-travel-wagon-view'),
            special_conditions_view: $('input#special-conditions-view'),
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

            //
            mode: 0,
            num: null,
            wagon: null,
            // инициализировать
            init: function () {
                // Настройка закрыть детали проекта
                wagon.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    wagon.content.removeClass('is-visible');
                });
                // Инициализация выпадающих списков
                this.state_wagon_edit = cd_initSelect(
                    $('select#state-wagon-edit'),
                    { lang: lang },
                    mors.uz_dir.list_states,
                    function (row) {
                        return { value: Number(row.id), text: mors.uz_dir.getValueObj(row, 'state') };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                var station_list = [];
                for (i = 0, j = mors.uz_dir.list_stations.length; i < j; i++) {
                    station_list.push(mors.uz_dir.list_stations[i].code_cs + " - " + mors.uz_dir.list_stations[i].station);
                }
                this.station_wagon_edit = this.station_wagon_edit.autocomplete({
                    minLength: 3,
                    source: station_list,
                    change: function (event, ui) {
                    }
                });
                //this.station_wagon_edit = cd_initSelect(
                //    $('select#station-wagon-edit'),
                //    { lang: lang },
                //    mors.uz_dir.list_stations,
                //    function (row) {
                //        return { value: Number(row.code_cs), text: row.station };
                //    },
                //    -1,
                //    function (event) {
                //        event.preventDefault();
                //        var id = $(this).val();
                //    },
                //    null);

                $("form#wagon-content").submit(function () {
                    event.preventDefault();
                    var form = $(this);
                    return true; //отправляете ваш submit
                });
            },
            // Показать информацию
            view: function (num) {
                this.num = num;
                // Получим данные
                if (num) {
                    LockScreen(langView('mess_delay', langs));
                    // Загрузим проект
                    mors.getCardsWagonsOfNum(num, function (result_card_wagon) {
                        wagon.wagon = result_card_wagon;
                        wagon.view_wagon(wagon.wagon, 0);
                        //project_detali.project = result_project;
                        //project_detali.view_mode_project(result_project, mode);
                        //project_detali.set_mode(mode, result_project.id_project_manager == pm.id);
                        ////!!! Добавить обновление списка и карточек на эеране
                        LockScreenOff();
                        //if (typeof callback === 'function') {
                        //    callback(result_project);
                        //}
                    });
                }
                wagon.content.addClass('is-visible');
            },
            // Показать информацию по вагону 
            view_wagon: function (wagon, mode) {
                this.view_mode(mode);
                this.num_wagon_view.val(wagon ? wagon.num : '');
                //
                this.state_wagon_view.val(wagon ? mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(wagon.id_state, 'state') : wagon.id_state : '');
                this.state_wagon_edit.val(wagon.id_state !== null ? wagon.id_state : -1);

                this.station_wagon_view.val(wagon ? mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(wagon.code_station, 'station') : wagon.code_station : '');
                //wagon.code_station = 40031;
                this.station_wagon_edit.val(mors.uz_dir !== null && wagon.code_station !== null ? wagon.code_station + " - " + mors.uz_dir.getValue_Station_Of_CodeCS(wagon.code_station, 'station') : '');
                //this.genus_wagon_view = ;
                //this.type_wagon_view = ;
                //this.code_model_wagon_view = ;
                //this.wagon_manufacturer_wagon_view = ;
                //this.year_wagon_create_wagon_view = ;
                //this.carrying_capacity_wagon_view = ;
                //this.tara_wagon_view = ;
                //this.body_volume_wagon_view = ;
                //this.axis_length_wagon_view = ;
                //this.type_repairs_wagon_view = ;
                //this.date_type_repairs_wagon_view = ;
                //this.type_ownership_wagon_view = ;
                //this.owner_wagon_view = ;
                //this.date_registration_wagon_view = ;
                //this.lessor_wagon_view = ;
                //this.operator_wagon_view = ;
                //this.poligon_travel_wagon_view = ;
                //this.special_conditions_view = ;
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
                wagon.panel_view.hide();
                wagon.panel_edit.hide();
                switch (mode) {
                    case 1: wagon.panel_edit.show(); wagon.mode = mode; break;
                    case 2: wagon.panel_edit.show(); wagon.mode = mode; break;
                    default: wagon.panel_view.show(); wagon.mode = 0; break;
                }
            }

        };
    // Инициализация
    table_fuel_sales.initObject();
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
        wagon.init();
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