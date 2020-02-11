jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num': '№ вагона',
                'field_position': '№ в составе',
                'field_state': 'Государство собственник',
                'field_wight': 'Вес (кг.)',
                'field_cargo_code': 'Код ЕС СНГ',
                'field_cargo': 'Название груза',
                'field_station_code': 'Код станции',
                'field_station': 'Станция',
                'field_consignee': 'Код получателя',
                'field_operation': 'Операция',
                'field_date_operation': 'Дата операции',
                'field_train': 'Поезд',
                'field_num_doc_arrived': '№ док. принятия на АМКР',
                'field_arrived': 'Принят на АМКР'
            },
            'en':  //default language: English
            {
                'field_num': 'wagon number',
                'field_position': 'Member No.',
                'field_state': 'State owner',
                'field_wight': 'Weight (kg.)',
                'field_cargo_code': 'EU CIS Code',
                'field_cargo': 'Cargo name',
                'field_station_code': 'Station code',
                'field_station': 'Station',
                'field_consignee': 'Recipient code',
                'field_operation': 'Operation',
                'field_date_operation': 'Date of operation',
                'field_train': 'Train',
                'field_num_doc_arrived': 'doc no. adoption at AMKR ',
                'field_arrived': 'Adopted by AMKR'
            }
        };

    //================================================================
    // Объявление обектов
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        mt = new METRANS(lang), // Создадим класс METRANS
        list_arrival = null,
        data_start = null,
        data_stop = null,
        list_sostav_arrival = null,
        list_operation_arrival = null,
        // Таблица 
        table_wagon = {
            html_table: $('table#table-wagons'),
            obj: null,
            list_wagon: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": false,
                    "select": false,
                    //select: {
                    //    style: "single"
                    //    /*toggleable: false*/
                    //},
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.num);
                        if (data.id_consignee === 1) {
                            if (!data.auxiliary)
                            { $(row).addClass('consignee-basic'); }
                            if (data.auxiliary)
                            { $(row).addClass('consignee-auxiliary'); }


                        }
                    },
                    columns: [
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: true, searchable: true },
                        { data: "position", title: langView('field_position', langs), width: "50px", orderable: true, searchable: true },
                        { data: "state", title: langView('field_state', langs), width: "50px", orderable: true, searchable: true },
                        { data: "wight", title: langView('field_wight', langs), width: "50px", orderable: true, searchable: true },
                        { data: "cargo_code", title: langView('field_cargo_code', langs), width: "50px", orderable: true, searchable: true },
                        { data: "cargo", title: langView('field_cargo', langs), width: "250px", orderable: true, searchable: true },
                        { data: "station_code", title: langView('field_station_code', langs), width: "50px", orderable: true, searchable: true },
                        { data: "station", title: langView('field_station', langs), width: "100px", orderable: true, searchable: true },
                        { data: "consignee", title: langView('field_consignee', langs), width: "50px", orderable: true, searchable: true },
                        { data: "operation", title: langView('field_operation', langs), width: "50px", orderable: true, searchable: true },
                        { data: "date_operation", title: langView('field_date_operation', langs), width: "50px", orderable: true, searchable: true },
                        { data: "train", title: langView('field_train', langs), width: "50px", orderable: true, searchable: true },
                        { data: "num_doc_arrived", title: langView('field_num_doc_arrived', langs), width: "50px", orderable: true, searchable: true },
                        { data: "arrived", title: langView('field_arrived', langs), width: "50px", orderable: true, searchable: true },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
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
                        }
                    ],
                }).on('select', function (e, dt, type, indexes) {
                    var row = table_wagon.obj.rows(indexes).data();
                    if (row && row.length > 0) {
                        view_select(row[0]);
                    }
                    ////var rowData = table_wagon.obj.rows(indexes).data().toArray();
                    //var rows = table_wagon.obj.rows('.selected').data();
                    //table_wagon.update_button_delete(rows.length);

                });
            },
            // Показать таблицу с данными
            view: function (data) {
                table_wagon.obj.clear();
                $.each(data, function (i, el) {
                    table_wagon.obj.row.add(table_wagon.get_wagon(el));
                });
                table_wagon.obj.order([1, 'asc']);
                table_wagon.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по вагонам
            get_wagon: function (data) {

                var cs = mt.getConsignee_Internal_Of_ID(data.consignee);
                return {
                    "id": data.id,
                    "id_sostav": data.id_sostav,
                    "position": data.position,
                    "num": data.num,
                    "country_code": data.country_code,
                    "state": mt.uz_dir !== null ? mt.uz_dir.getValue_States_Of_ID(data.country_code, 'state') : data.country_code,
                    "wight": data.wight !== null ? Number(data.wight).toFixed(2) : null,
                    "cargo_code": data.cargo_code,
                    "cargo": data.cargo,
                    "station_code": data.station_code,
                    "station": data.station,
                    "consignee_code": data.consignee,
                    "consignee": cs !== null ? cs.name + '(' + data.consignee + ')' : data.consignee,
                    "id_consignee": cs !== null ? cs.id_consignee : null,
                    "auxiliary": cs !== null ? cs.auxiliary : null,
                    "operation": data.operation,
                    "composition_index": data.composition_index,
                    "date_operation": data.date_operation,
                    "train": data.train,
                    "num_doc_arrived": data.num_doc_arrived,
                    "arrived": data.arrived,
                    "parent_id": data.parent_id,
                    "user_name": data.user_name,



                    //"num": data.num,
                    //"id_genus_wagon": data.id_genus_wagon,
                    //"genus_wagon": data.Directory_GenusWagons ? mors.getValueCultureObj(data.Directory_GenusWagons, 'genus') : null,
                    ////"genus_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_GenusWagons_Of_ID(data.id_genus_wagon, 'genus', lang) : data.id_genus_wagon,
                    //"id_state": data.id_state,
                    //"state": mors.uz_dir !== null ? mors.uz_dir.getValue_States_Of_ID(data.id_state, 'state') : data.id_state,
                    //"id_wagon_manufacturer": data.id_wagon_manufacturer,
                    //"wagon_manufacturer": mors.getValueCultureObj(data.Directory_WagonManufacturers, 'name'),
                    ////"wagon_manufacturer": mors.ids_dir !== null ? mors.ids_dir.getValue_WagonManufacturers_Of_ID(data.id_wagon_manufacturer, 'name', lang) : data.id_wagon_manufacturer,
                    //"year_wagon_create": data.year_wagon_create,
                    //"code_station": data.code_station,
                    ////"station":'',
                    //"station": mors.uz_dir !== null ? mors.uz_dir.getValue_Station_Of_CodeCS(data.code_station, 'station') : data.code_station,
                    //"carrying_capacity": data.carrying_capacity !== null ? Number(data.carrying_capacity).toFixed(1) : null,
                    //"tara": data.tara !== null ? Number(data.tara).toFixed(1) : null,
                    //"id_type_repairs": data.id_type_repairs,
                    //"type_repairs": mors.getValueCultureObj(data.Directory_TypesRepairsWagons, 'type_repairs'),
                    ////"type_repairs": mors.ids_dir !== null ? mors.ids_dir.getValue_TypesRepairsWagons_Of_ID(data.id_type_repairs, 'type_repairs', lang) : data.id_type_repairs,
                    //"date_type_repairs": StringDateToFormatStringDate(data.date_type_repairs, lang),
                    //"code_model_wagon": data.code_model_wagon,
                    //"id_type_wagon": data.id_type_wagon,
                    //"type_wagon": mors.getValueCultureObj(data.Directory_TypeWagons, 'type'),
                    ////"type_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeWagons_Of_ID(data.id_type_wagon, 'type', lang) : data.id_type_wagon,
                    //"axis_length": data.axis_length !== null ? Number(data.axis_length).toFixed(2) : null,
                    //"body_volume": data.body_volume !== null ? Number(data.body_volume).toFixed(1) : null,
                    //"id_type_ownership": data.id_type_ownership,
                    //"type_ownership": mors.getValueCultureObj(data.Directory_TypeOwnerShip, 'type_ownership'),
                    ////"type_ownership": mors.ids_dir !== null ? mors.ids_dir.getValue_TypeOwnerShip_Of_ID(data.id_type_ownership, 'type_ownership', lang) : data.id_type_ownership,
                    //"id_owner_wagon": data.id_owner_wagon,
                    //"owner_wagon": mors.getValueCultureObj(data.Directory_OwnersWagons, 'owner'),
                    ////"owner_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OwnersWagons_Of_ID(data.id_owner_wagon, 'owner', lang) : data.id_owner_wagon,
                    //"date_registration": StringDateToFormatStringDate(data.date_registration, lang),
                    //"id_lessor_wagon": data.id_lessor_wagon,
                    //"lessor_wagon": mors.getValueCultureObj(data.Directory_LessorsWagons, 'lessors'),
                    ////"lessor_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_LessorsWagons_Of_ID(data.id_lessor_wagon, 'lessors', lang) : data.id_lessor_wagon,
                    //"id_operator_wagon": data.id_operator_wagon,
                    //"operator_wagon": mors.getValueCultureObj(data.Directory_OperatorsWagons, 'operators'),
                    ////"operator_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_OperatorsWagons_Of_ID(data.id_operator_wagon, 'operators', lang) : data.id_operator_wagon,
                    //"id_poligon_travel_wagon": data.id_poligon_travel_wagon,
                    //"poligon_travel_wagon": mors.getValueCultureObj(data.Directory_PoligonTravelWagons, 'poligon_travel'),
                    ////"poligon_travel_wagon": mors.ids_dir !== null ? mors.ids_dir.getValue_PoligonTravelWagons_Of_ID(data.id_poligon_travel_wagon, 'poligon_travel', lang) : data.id_poligon_travel_wagon,
                    //"id_special_conditions": data.id_special_conditions,
                    //"special_conditions": mors.getValueCultureObj(data.GetSpecialConditions, 'special_conditions'),
                    ////"special_conditions": mors.ids_dir !== null ? (data.id_special_conditions !== null ? mors.ids_dir.getValue_SpecialConditions_Of_ID(data.id_special_conditions, 'special_conditions', lang) : "") : data.id_special_conditions,
                    //"sap": data.sap,
                    //"note": data.note,
                    //"create": data.create,
                    //"create_user": data.create_user,
                    //"change": data.change,
                    //"change_user": data.change_user,
                };
            }
        },
        //
        loadReference = function (callback) {
            LockScreen(langView('mess_delay', langs));
            var count = 1;
            mt.load(['uz', 'list_consignee'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        //LockScreenOff();
                        callback();
                    }
                }
            });
        },
        // загрузить данные
        load = function (start, stop, callback) {
            LockScreen(langView('mess_delay', langs));
            loadReference(function () {
                if (data_start === null || data_stop === null || data_start !== start || data_stop !== stop) {
                    mt.getArrivalSostav(start, stop, function (data) {
                        list_arrival = data;
                        data_start = start;
                        data_stop = stop;
                        view_all(function () {
                            if (typeof callback === 'function') {
                                //LockScreenOff();
                                callback();
                            }
                        });
                    });
                } else {
                    view_all(function () {
                        if (typeof callback === 'function') {
                            //LockScreenOff();
                            callback();
                        }
                    });
                }
            });
        },
        // Показать все
        view_all = function (callback) {
            LockScreen(langView('mess_delay', langs));
            // Скорректируем под станцию
            var id_station = Number(pn_sel.select_station.val());
            var list_arrival_station = list_arrival;
            if (id_station > 0) {
                list_arrival_station = list_arrival.filter(function (i) {
                    var station = Number(i.composition_index.slice(9, 13));
                    if (station === id_station) { return true; }
                    else { return false; }
                });
            };
            // Полуим состав
            list_sostav_arrival = getObjects(list_arrival_station, 'Parent_id', null);
            var default_id_arrival = view_sostav();
            // Покажем операции.
            var default_id_sostav = view_operation(default_id_arrival);
            // Покажем вагоны
            var default_id_vagon = view_wagon(default_id_sostav);
            //LockScreenOff();
            if (typeof callback === 'function') {
                //LockScreenOff();
                callback();
            }

        },
        // Показать список составов
        view_sostav = function () {
            var list_sostav = $('div#list-sostav').empty();
            var default_id_arrival = null;
            default_id_arrival = list_sostav_arrival.length > 0 ? list_sostav_arrival[list_sostav_arrival.length - 1].id_arrived : null;
            $.each(list_sostav_arrival, function (i, el) {
                if (i === 0) {
                    default_id_arrival = el.id_arrived;
                }
                list_sostav.append($('<a href="#" id="' + el.id_arrived + '" class="list-group-item list-group-item-action">' + el.composition_index + ' (' + moment(el.date_time).format("DD.MM.YYYY HH:mm:ss") + ')' + '</a>'));
            });
            $('div#list-sostav').find('a').on('click', function (event) {
                event.preventDefault();
                var id = $(this).attr('id');
                // Покажем операции.
                var default_id_sostav = view_operation(id);
                // Покажем вагоны
                var default_id_wagon = view_wagon(default_id_sostav);
            });
            return default_id_arrival;
        },
        // показать операции
        view_operation = function (id_arrival) {
            // Убрать активные меню
            $('div#list-sostav a').removeClass('active');
            $('div#list-sostav a#' + id_arrival).addClass('active');

            var default_id_sostav = null;
            list_operation_arrival = getObjects(list_arrival, 'id_arrived', id_arrival);
            var list_operation = $('nav#list-operation').empty();

            default_id_sostav = list_operation_arrival.length > 0 ? list_operation_arrival[list_operation_arrival.length - 1].id : null;
            $.each(list_operation_arrival, function (i, el) {
                list_operation.append($('<a id="' + el.id + '" class="nav-link mt-2 mb-2" href="#">' + outOperation(el.operation) + ' (' + moment(el.date_time).format("DD.MM.YYYY HH:mm:ss") + ')' + '</a>'));
            });
            // Настроитбь события на меню
            $('nav#list-operation').find('a').on('click', function (event) {
                event.preventDefault();
                var id = $(this).attr('id');
                // Покажем вагоны
                var default_id_wagon = view_wagon(id);
            });
            return default_id_sostav;
        },
        // Показать вагоны
        view_wagon = function (id_sostav) {
            // Убрать активные меню
            $('nav#list-operation a').removeClass('active');
            $('nav#list-operation a#' + id_sostav).addClass('active');
            var default_id_wagon = null;
            list_operation_arrival = getObjects(list_arrival, 'id', id_sostav);
            if (list_operation_arrival !== null && list_operation_arrival.length > 0) {
                view_sostav_info(list_operation_arrival[0]);
                var cars = list_operation_arrival[0].ArrivalCars;
                table_wagon.view(cars);
                $('div#card-sostav').show();
            } else {
                $('div#card-sostav').hide();
                LockScreenOff();
            }
        },
        // Пока отключил
        view_select = function (row) {
            $('td#composition_index').text(row.composition_index);
            $('td#date_operation').text(row.date_operation);
            $('td#train').text(row.train);
        },
        // Показать информацию о составе
        view_sostav_info = function (sostav) {
            $('em#composition_index').text(sostav.composition_index);
            var departure_station = mt.uz_dir.getStations_Internal_Correct_Code(sostav.composition_index.substring(0, 4));
            $('em#departure_station').text(departure_station && departure_station.length > 0 ? departure_station[0].station + ' (' + departure_station[0].code + ')' : sostav.composition_index.substring(0, 4));
            var arrival_station = mt.uz_dir.getStations_Internal_Correct_Code(sostav.composition_index.substring(9, 13));
            $('em#arrival_station').text(arrival_station && arrival_station.length > 0 ? arrival_station[0].station + ' (' + arrival_station[0].code + ')' : sostav.composition_index.substring(9, 13));

            $('em#date_operation').text(sostav.date_time ? moment(sostav.date_time).format('DD.MM.YYYY HH:mm:ss') : '');
            $('em#train').text(sostav && sostav.ArrivalCars && sostav.ArrivalCars.length>0 ? sostav.ArrivalCars[0].train : '');
            $('em#count_wagon').text(sostav && sostav.ArrivalCars && sostav.ArrivalCars.length > 0 ? sostav.ArrivalCars.length : '');

            $('em#file_name').text(sostav.file_name);
            $('em#create').text(sostav.create ? moment(sostav.create).format('DD.MM.YYYY HH:mm:ss') : '');
            $('em#close').text(sostav.close ? moment(sostav.close).format('DD.MM.YYYY HH:mm:ss') : '');
        },
        // панель выбора исходных данных для запроса
        pn_sel = {
            cur_dt: moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
            start_dt: null,
            stop_dt: null,
            code_ctation: null,
            dt_obj: null,
            select_station: $('select#select-station'),
            span_range_date: $('span#select-date'),
            input_data_start: $('input#date-start'),
            input_data_stop: $('input#date-stop'),
            init: function () {
                // настроим компонент дата
                pn_sel.dt_obj = pn_sel.span_range_date.dateRangePicker(
                    {
                        language: 'ru',
                        format: 'DD.MM.YYYY HH:mm',
                        separator: '-',
                        autoClose: false,
                        time: {
                            enabled: true
                        },
                        setValue: function (s, s1, s2) {
                            pn_sel.input_data_start.val(s1);
                            pn_sel.input_data_stop.val(s2);
                        }
                    }).
                    bind('datepicker-change', function (evt, obj) {
                        pn_sel.start_dt = obj.date1;
                        pn_sel.stop_dt = obj.date2;
                    })
                    .bind('datepicker-closed', function () {
                        pn_sel.view();
                    });
                pn_sel.start_dt = moment(pn_sel.cur_dt).set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 })._d;
                pn_sel.stop_dt = moment(pn_sel.cur_dt).set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 })._d;
                pn_sel.dt_obj.data('dateRangePicker').setDateRange(moment(pn_sel.start_dt).format('DD.MM.YYYY HH:mm:'), moment(pn_sel.stop_dt).format('DD.MM.YYYY HH:mm:'), true);
                // настроим селект
                pn_sel.select_station = cd_initSelect(
                    pn_sel.select_station,
                    { lang: lang },
                    [
                        { value: 4670, text: "КРИВОЙ РОГ - ГЛАВНЫЙ" },
                        { value: 4671, text: "КРИВОЙ РОГ - СОРТИРОВОЧНЫЙ" },
                        { value: 4672, text: "КРИВОЙ РОГ" },
                        //{ value: 4672, text: "КРИВОЙ РОГ - ЗАПАДНЫЙ" }
                    ],
                    null,
                    -1,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор смены
                        pn_sel.view();
                    },
                    null);
            },
            view: function () {
                load(pn_sel.start_dt, pn_sel.stop_dt, function () {

                });
            }
        };

    //================================================================
    // Основной вход
    //=================================================================
    //LockScreen(langView('mess_delay', langs));
    // Инициализация
    pn_sel.init();
    table_wagon.init();
    // загрузим новый период
    load(pn_sel.start_dt, pn_sel.stop_dt, function () {
        //LockScreenOff();
    });

    //LockScreenOff();
});