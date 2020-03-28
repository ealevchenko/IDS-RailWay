jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'all_wagon': 'Все вагоны',

                'field_nvagon': '№ вагона',
                'field_dt': 'Дата и время',
                'field_nameop': 'Операция',
                'field_full_nameop': 'Полное название операции',
                'field_st_form': 'Код ст. form.',
                'field_nst_form': 'Ст. form.',
                'field_st_disl': 'Код ст. дисл.',
                'field_nst_disl': 'Ст. дисл.',
                'field_nsost': '№ Состава',
                'field_st_nazn': 'Код ст. назн.',
                'field_nst_nazn': 'Ст. назн.',
                'field_st_end': 'Код кон. ст.',
                'field_nst_end': 'Ст. кон.',
                'field_kgr': 'Код груза',
                'field_nkgr': 'Груз',
                'field_ves': 'Вес',
                'field_kgro': 'Грузоотправитель',
                'field_kgrp': 'Грузополучатель',
                'field_km': 'km',
                'field_station_from': 'Ст. отправки',
                'field_station_end': 'Ст. прибытия',

                'field_route_name': 'Маршрут',
                'field_location_name': 'Местонахождение вагона',
                'field_condition_name': 'Состояние вагона',
                'field_type_flight_name': 'Виды рейсов',

                'field_start_flight': 'Дата-время начала рейса',
                'field_duration_flight': 'Продолжительность текущего рейса, суток',
                'field_start_turnover': 'Дата-время начала оборота',
                'field_duration_turnover': 'Продолжительность текущего оборота, суток',

                'field_nsost': '№ Состава',
                'field_ntrain': '№ Поезда',
            },
            'en':  //default language: English
            {
                'all_wagon': 'All cars',

                'field_nvagon': 'wagon number',
                'field_dt': 'Date and time',
                'field_nameop': 'Operation',
                'field_full_nameop': 'Full name of the operation',
                'field_st_form': 'Art. form. ',
                'field_nst_form': 'Art. form. ',
                'field_st_disl': 'Art. dis. ',
                'field_nst_disl': 'Art. dis. ',
                'field_nsost': 'Composition No.',
                'field_st_nazn': 'Art. desig. ',
                'field_nst_nazn': 'Art. desig. ',
                'field_st_end': 'Con code. Art. ',
                'field_nst_end': 'Art. con. ',
                'field_kgr': 'Cargo code',
                'field_nkgr': 'Cargo',
                'field_ves': 'Weight',
                'field_kgro': 'Shipper',
                'field_kgrp': 'Consignee',
                'field_km': 'km',
                'field_station_from': 'Art. sending ',
                'field_station_end': 'Art. Arrival ',

                'field_route_name': 'Route',
                'field_location_name': 'Wagon location',
                'field_condition_name': 'Carriage Status',
                'field_type_flight_name': 'Flight types',

                'field_start_flight': 'Date-time of the start of the flight',
                'field_duration_flight': 'Duration of the current flight, days',
                'field_start_turnover': 'Date-time of the beginning of the turnover',
                'field_duration_turnover': 'Duration of the current turnover, days',

                'field_nsost': 'Composition No.',
                'field_ntrain': 'Train No.',
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
            mors.load(['park_wagons'], false, function () {
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
        // элементы окна
        select_park_wagon = null,
        // UPDATE Controls ---------------------------------------------------
        // Обновить компонент список парков
        update_list_park = function (id_park) {
            var list = mors.getListParksWagons('id', 'name_park', lang);
            list.push({ text: langView('all_wagon', langs), value: 0 })
            select_park_wagon = cd_initSelect(
                $('select#select-park-wagon'),
                { lang: lang },
                list.sort(function (a, b) {
                    return a.value - b.value;
                }),
                null,
                id_park ? Number(id_park) : -1,
                function (event) {
                    event.preventDefault();
                    var id = $(this).val();
                    update_list_wagons_park(id);
                },
                null);
        },
        // Обновим перечень вагонов входящих в парк
        update_list_wagons_park = function (id_park) {
            table_wms.view(id_park, true);
        },
        // Таблица 
        table_wms = {
            html_table: $('#table-wms'),
            obj: null,
            id_park_wagon: null,
            list_wms: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "select": false,
                    //select: {
                    //    style: 'multi'
                    //},
                    //"deferRender": true,
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                    },
                    columns: [
                        { data: "nvagon", title: langView('field_nvagon', langs), width: "50px", orderable: true, searchable: true },
                        { data: "dt", title: langView('field_dt', langs), width: "100px", orderable: true, searchable: false },

                        { data: "nsost", title: langView('field_nsost', langs), width: "50px", orderable: true, searchable: false },
                        { data: "ntrain", title: langView('field_ntrain', langs), width: "50px", orderable: true, searchable: false },

                        { data: "nameop", title: langView('field_nameop', langs), width: "50px", orderable: true, searchable: false },
                        { data: "full_nameop", title: langView('field_full_nameop', langs), width: "150px", orderable: true, searchable: false },

                        { data: "station_from", title: langView('field_station_from', langs), width: "50px", orderable: true, searchable: false },
                        { data: "station_end", title: langView('field_station_end', langs), width: "50px", orderable: true, searchable: false },


                        { data: "route_name", title: langView('field_route_name', langs), width: "50px", orderable: true, searchable: false },
                        { data: "shipper", title: langView('field_kgro', langs), width: "50px", orderable: true, searchable: false },
                        { data: "consignee", title: langView('field_kgrp', langs), width: "50px", orderable: true, searchable: false },
                        { data: "location_name", title: langView('field_location_name', langs), width: "50px", orderable: true, searchable: false },
                        { data: "condition_name", title: langView('field_condition_name', langs), width: "50px", orderable: true, searchable: false },
                        { data: "type_flight_name", title: langView('field_type_flight_name', langs), width: "50px", orderable: true, searchable: false },

                        { data: "kgr", title: langView('field_kgr', langs), width: "50px", orderable: true, searchable: false },
                        { data: "nkgr", title: langView('field_nkgr', langs), width: "150px", orderable: true, searchable: false },
                        { data: "ves", title: langView('field_ves', langs), width: "50px", orderable: true, searchable: false },


                        { data: "start_flight", title: langView('field_start_flight', langs), width: "50px", orderable: true, searchable: false },
                        { data: "duration_flight", title: langView('field_duration_flight', langs), width: "50px", orderable: true, searchable: false },
                        { data: "start_turnover", title: langView('field_start_turnover', langs), width: "50px", orderable: true, searchable: false },
                        { data: "duration_turnover", title: langView('field_duration_turnover', langs), width: "50px", orderable: true, searchable: false },

                        { data: "st_form", title: langView('field_st_form', langs), width: "50px", orderable: true, searchable: false },
                        { data: "nst_form", title: langView('field_nst_form', langs), width: "150px", orderable: true, searchable: false },
                        { data: "st_disl", title: langView('field_st_disl', langs), width: "50px", orderable: true, searchable: false },
                        { data: "nst_disl", title: langView('field_nst_disl', langs), width: "150px", orderable: true, searchable: false },
                        { data: "st_nazn", title: langView('field_st_nazn', langs), width: "50px", orderable: true, searchable: false },
                        { data: "nst_nazn", title: langView('field_nst_nazn', langs), width: "150px", orderable: true, searchable: false },
                        { data: "st_end", title: langView('field_st_end', langs), width: "50px", orderable: true, searchable: false },
                        { data: "nst_end", title: langView('field_nst_end', langs), width: "150px", orderable: true, searchable: false },
                        { data: "kgro", title: langView('field_kgro', langs), width: "50px", orderable: true, searchable: false },
                        { data: "kgrp", title: langView('field_kgrp', langs), width: "50px", orderable: true, searchable: false },

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
                            sheetName: 'Дислокация вагонов',
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
                });
            },
            // Показать таблицу с данными
            view: function (id_park_wagon, data_refresh) {
                LockScreen(langView('mess_delay', langs));
                table_wms.id_park_wagon = id_park_wagon;
                if (!table_wms.list_wms | data_refresh === true) {
                    // Обновим данные
                    mors.getWagonsMotionSignalsOfPark(
                        Number(id_park_wagon),
                        function (result) {
                            table_wms.list_wms = result;
                            table_wms.load_data(table_wms.list_wms);
                            table_wms.obj.draw();
                            LockScreenOff();
                        }
                    );
                } else {
                    table_wms.load_data(table_wms.list_wms);
                    table_wms.obj.draw();
                    LockScreenOff();
                };
            },
            // Загрузить данные
            load_data: function (data) {
                table_wms.obj.clear();
                $.each(data, function (i, el) {
                    table_wms.obj.row.add(table_wms.get_row_wms(el));
                });

                //table_wms.initComplete();
            },
            // Получить полную информацию по вагонам
            get_row_wms: function (data) {
                return {
                    "id": data.id,//3545382,
                    "id_wt": data.id_wt,//777878,
                    "nvagon": data.nvagon,
                    "st_disl": data.st_disl,//16000,
                    "nst_disl": data.nst_disl,//"ВИТЕБСК",
                    "kodop": data.kodop,//null,
                    "nameop": data.nameop,//"КОРВ",
                    "full_nameop": data.full_nameop,//"Корректировка сведений о вагоне",
                    "dt": data.dt.replace(/T/g,' '),//"2020-03-12T04:04:00",
                    "st_form": data.st_form,//1565,
                    "nst_form": data.nst_form,//"МОГИЛЕВ 2-НА-ДНЕПРЕ",
                    "idsost": data.idsost,//null,
                    "nsost": data.nsost,//"013",
                    "st_nazn": data.st_nazn,//1600,
                    "nst_nazn": data.nst_nazn,//"ВИТЕБСК",
                    "ntrain": data.ntrain,//2202,
                    "st_end": data.st_end,//9870,
                    "nst_end": data.nst_end,//"ЛИЕПАЯ-ПАССАЖИЕРУ-ЭКСПОРТ",
                    "kgr": data.kgr,//47114,
                    "nkgr": data.nkgr,//"СМОЛЫ КАМЕННОУГОЛЬНЫЕ,НЕ ПОИМЕНОВАННЫЕ В АЛФАВИТЕ",
                    "id_cargo": data.id_cargo,//0,
                    "kgrp": data.kgrp,//1528,
                    "ves": data.ves,//61.000,
                    "updated": data.updated.replace(/T/g, ' '),//"2020-03-12T08:44:19.78",
                    "kgro": data.kgro,//null,
                    "km": data.km,//674,
                    "station_from": data.station_from,//46720,
                    "station_end": data.station_end,//9870,
                    "route": data.route,//0,
                    "route_name": table_wms.get_route(data.route),
                    "shipper": data.shipper,//0,
                    "consignee": data.consignee,//1528,
                    "location": data.location,//1,
                    "location_name": table_wms.get_location(data.location),//1,
                    "condition": data.condition,//2,
                    "condition_name": table_wms.get_condition(data.condition),//2,
                    "type_flight": data.type_flight,//2,
                    "type_flight_name": table_wms.get_type_flight(data.type_flight),//2,
                    "start_flight": data.start_flight.replace(/T/g, ' '),//"2020-03-05T16:16:00",
                    "start_turnover": data.start_turnover.replace(/T/g, ' '),//"2020-02-24T06:45:00",
                    "duration_flight": data.duration_flight!== null ? (Number(data.duration_flight) /(60*24)).toFixed(1): null,//9348,
                    "duration_turnover": data.duration_turnover !== null ? (Number(data.duration_turnover) / (60 * 24)).toFixed(1) : null,//24319,
                    "note": data.note,//null
                };
            },
            // Определим маршрут
            get_route: function (route) {
                switch(route){
                    case 0: return 'Не определено';
                    case 1: return 'На АМКР';
                    case 2: return 'Отправлен клиенту';
                    case 3: return 'У клиента';
                    case 4: return 'Возвращается на АМКР';
                }
            },
            // Местонахождение вагона
            get_location: function (location) {
                switch (location) {
                    case 0: return 'Не определено';
                    case 1: return 'Входу';
                    case 2: return 'На станции погрузки-выгрузки';
                }
            },
            // Состояние вагона
            get_condition: function (condition) {
                switch (condition) {
                    case 0: return 'Не определено';
                    case 1: return 'Порожний';
                    case 2: return 'Груженный';
                }
            },
            // Виды рейсов
            get_type_flight: function (type) {
                switch (type) {
                    case 0: return 'Не определено';
                    case 1: return 'Погрузка';
                    case 2: return 'Груженный';
                    case 3: return 'Выгрузка';
                    case 4: return 'Порожний';
                }
            },
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Инициализация
    // 
    table_wms.init();
    // Загрузка основных библиотек
    loadReference(function (result) {
        update_list_park();
    });





});

