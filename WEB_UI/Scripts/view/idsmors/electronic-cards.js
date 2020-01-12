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
            select_id: null,
            //list: [],
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
                    jQueryUI: true,
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
                                wagon.content.addClass('is-visible');
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
                }).on('select deselect', function () {
                    var selectedRows = table_fuel_sales.obj.rows({ selected: true }).count();
                    table_fuel_sales.obj.button(0).enable(selectedRows === 1);
                });
            },
            // Показать таблицу с данными
            viewTable: function (data_refresh) {
                LockScreen(langView('mess_delay', langs));
                if (mors.list_cards_wagons == null | data_refresh == true) {
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
                        "state": mors.uz_dir !== null ? mors.uz_dir.getStateOfLocalStates(data[i].id_state) : data[i].id_state,
                        "id_wagon_manufacturer": data[i].id_wagon_manufacturer,
                        "wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getNameOfLocalWagonManufacturers(data[i].id_wagon_manufacturer) : data[i].id_wagon_manufacturer,
                        "year_wagon_create": data[i].year_wagon_create,
                        "code_station": data[i].code_station,
                        "station": mors.uz_dir !== null ? mors.uz_dir.getStationOfLocalStations(data[i].code_station) : data[i].code_station,
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
                        $('form')
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
            content: $('.cd-wagon-content'),
            init: function () {
                // Настройка закрыть детали проекта
                wagon.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    wagon.content.removeClass('is-visible');
                });
                //
                $("form.cd-form").submit(function () {
                    event.preventDefault();
                    var form = $(this);
                    return true; //отправляете ваш submit
                });
            }
        };
    // Инициализация
    table_fuel_sales.initObject();
    wagon.init();
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