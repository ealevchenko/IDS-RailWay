(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_id': 'id строки',
            'field_num': '№ вагона',
            'field_position_outgoing': '№ поз. в составе',
            'field_date_readiness_amkr': 'Время предъявления состава на УЗ',
            'field_num_doc_sostav': '№ док состава',
            'field_station_from': 'Отправлен со станции',
            'field_way_from': 'Отправлен с пути',
            'field_out_station_on': 'Отправлен на станцию',
            'field_date_outgoing': 'Состав сдан на УЗ',
            'field_date_outgoing_act': 'Состав сдан на УЗ по акту',
            'field_date_departure_amkr': 'Состав отправлен на УЗ',
            'field_status': 'Статус состава',
            'field_id_doc_uz': '№ док. внутр. УЗ',
            'field_doc_uz': '№ накладной УЗ',
            'field_note': 'Примечание',
            'field_date_outgoing_wagon_act': 'Вагон сдан по акту',
            'field_processed': 'Обработан',
            'field_out_car_return_start': 'Возврат начало (id – стр. возврата \ id- стр. внут. перем.)',
            'field_out_car_return_stop': 'Возврат конец (id – стр. возврата)',
            'field_out_car_uz_vagon': 'id стр. док. ИДС на вагон',


            //'field_train': '№ поезда',
            //'field_composition_index': 'Индекс поезда',
            //'field_date_arrival': 'Прибил в составе',
            //'field_date_adoption': 'Принят в составе',
            //'field_date_adoption_act': 'Принят в составе по акту',
            //'field_date_adoption_act_wagon': 'Вагон принят по акту',
            //'field_date_arrival_wagon': 'Вагон принял',
            //'field_station_on': 'Принят на станцию',
            //'field_way': 'Принят на путь',
            //'field_create': 'Строка создана',
            //'field_create_user': 'Создал строку',
            //'field_change': 'Строку правили',
            //'field_change_user': 'Правил',
            //'field_create_sostav': 'Добавил',
            //'field_change_sostav': 'Правил',
            //'field_id_arrival_car': 'id прибытия',
            //'field_id_outgoing_car': 'id отправки',
            //'field_id_sap_incoming_supply': 'id SAP Вх.поставки',
            //'field_id_sap_outbound_supply': 'id SAP Исх.поставки',
            //'field_close': 'Строка закрыта',
            //'field_parent_id': 'Предыдущая строка',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            //'mess_load_arr_wagons': 'Загружаю список принятых вагонов...',
            //'mess_load_wir_wagons': 'Загружаю список внутренних перемещений вагонов...',
            //'mess_load_wim_wagons': 'Загружаю список истории дислокации вагонова...',
            'mess_load_out_wagons': 'Загружаю список отправленных вагонов...',
        },
        'en':  //default language: English
        {
            'field_num': 'Wagon number',
            'field_train': 'Train no.',
            'field_composition_index': 'Train index',
            'field_date_arrival': 'Arrival time',
            'field_date_adoption': 'Admission time',
            'field_date_adoption_act': 'Acceptance time by act',
            'field_station_from': 'Sent from station',
            'field_station_on': 'Received at station',
            'field_way': 'Accepted on path',
            'field_doc_uz': 'UZ waybill No.',
            'field_status': 'Status',
            'field_note': 'Note',
            'field_create': 'String created',
            'field_create_user': 'Created a string',
            'field_change': 'The line was edited',
            'field_change_user': 'Rules',
            'field_create_sostav': 'Added',
            'field_change_sostav': 'Rules',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'out_car_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center',
            width: "20px"
        },
        {
            field: 'out_car_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'out_car_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_position_outgoing',
            data: function (row, type, val, meta) {
                return row.position_outgoing;
            },
            className: 'dt-body-center',
            title: langView('field_position_outgoing', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_date_readiness_amkr',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                return getReplaceTOfDT(sostav.date_readiness_amkr);
            },
            className: 'dt-body-center',
            title: langView('field_date_readiness_amkr', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'out_car_num_doc_sostav',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                return sostav ? sostav.num_doc : null;
            },
            className: 'dt-body-center',
            title: langView('field_num_doc_sostav', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_station_from',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                var station = sostav ? sostav.Directory_Station : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station_from', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_way',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                var way = sostav ? sostav.Directory_Ways : null;
                return way ? way['way_num_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_way_from', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'out_car_station_on',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                var station = sostav ? sostav.Directory_Station1 : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_out_station_on', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'out_car_date_outgoing',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                return getReplaceTOfDT(sostav.date_outgoing);
            },
            className: 'dt-body-center',
            title: langView('field_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'out_car_date_outgoing_act',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                return getReplaceTOfDT(sostav.date_outgoing_act);
            },
            className: 'dt-body-center',
            title: langView('field_date_outgoing_act', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'out_car_date_departure_amkr',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                return getReplaceTOfDT(sostav.date_departure_amkr);
            },
            className: 'dt-body-center',
            title: langView('field_date_departure_amkr', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            //data: "status_name",
            field: 'out_car_status',
            data: function (row, type, val, meta) {
                var sostav = row.OutgoingSostav ? row.OutgoingSostav : null;
                return sostav ? outStatusOutgoingSostav(sostav.status) : null;
            },
            className: 'dt-body-center',
            title: langView('field_status', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'out_car_id_doc_uz',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('field_id_doc_uz', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_doc_uz',
            data: function (row, type, val, meta) {
                var doc = row.UZ_DOC_OUT ? row.UZ_DOC_OUT : null;
                return doc ? doc.num_uz : null;
            },
            className: 'dt-body-center',
            title: langView('field_doc_uz', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-center',
            title: langView('field_note', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_date_outgoing_wagon_act',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.date_outgoing_act);
            },
            className: 'dt-body-center',
            title: langView('field_date_outgoing_wagon_act', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing ? (row.outgoing_user + '<br />[' + getReplaceTOfDT(row.outgoing) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_processed', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_return_start',
            data: function (row, type, val, meta) {
                return row.id_outgoing_return_start ? (row.id_outgoing_return_start + ' \\ ' + row.parent_wir_id) : null;
            },
            className: 'dt-body-center',
            title: langView('field_out_car_return_start', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_return_stop',
            data: function (row, type, val, meta) {
                return row.id_outgoing_return_stop;
            },
            className: 'dt-body-center',
            title: langView('field_out_car_return_stop', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'out_car_uz_vagon',
            data: function (row, type, val, meta) {
                return row.id_outgoing_uz_vagon;
            },
            className: 'dt-body-center',
            title: langView('field_out_car_uz_vagon', App.Langs), width: "50px", orderable: false, searchable: true
        },
    ];

    //===========================================================================
    //-----------------------------------------------------------------------
    // таблица истрия отправлений вагона
    //-----------------------------------------------------------------------
    // Конструктор модуля таблицы внутренего движения вагона
    function table_outgoing_wagon(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_out_wag = $(selector);
        if (this.$t_out_wag.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_outgoing_wagon.prototype.init_columns = function () {
        return init_columns([
            'out_car_button_view',
            'out_car_id',
            'out_car_num',
            'out_car_position_outgoing',
            'out_car_date_readiness_amkr',
            'out_car_num_doc_sostav',
            'out_car_station_from',
            'out_car_way',
            'out_car_station_on',
            'out_car_date_outgoing',
            'out_car_date_outgoing_act',
            'out_car_date_departure_amkr',
            'out_car_status',
            'out_car_outgoing',
            'out_car_date_outgoing_wagon_act',
            'out_car_id_doc_uz',
            'out_car_doc_uz',
            'out_car_uz_vagon',
            'out_car_note',
            'out_car_return_start',
            'out_car_return_stop',
        ], list_collums);
    };
    //
    table_outgoing_wagon.prototype.init = function () {
        this.obj_out_wag = this.$t_out_wag.DataTable({
            "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            select: true,
            "autoWidth": true,
            //"filter": true,
            //"scrollY": "600px",
            sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            "createdRow": function (row, data, index) {
                $(row).attr('id', data.id);
                var sostav = data.OutgoingSostav ? data.OutgoingSostav : null;
                if (data.outgoing !== null) {
                    // приняли
                    if (sostav && sostav.status === 1) {
                        $(row).removeClass('red green blue ').addClass('yellow');
                    }
                    if (sostav && sostav.status === 2) {
                        $(row).removeClass('red yellow blue').addClass('green');
                    }
                    if (sostav && sostav.status === 3) {
                        $(row).removeClass('red green yellow').addClass('blue');
                    }
                } else {
                    $(row).removeClass('green yellow blue').addClass('red');
                }
            },
            columns: this.init_columns(),
            dom: 'Bfrtip',
            stateSave: false,
            buttons: [
                {
                    extend: 'collection',
                    text: langView('title_button_export', App.Langs),
                    buttons: [
                        {
                            text: langView('title_button_buffer', App.Langs),
                            extend: 'copyHtml5',
                        },
                        {
                            text: langView('title_button_excel', App.Langs),
                            extend: 'excelHtml5',
                            sheetName: 'Вагоны на пути',
                            messageTop: function () {
                                return '';
                            }
                        },
                    ],
                    autoClose: true
                },
                {
                    extend: 'pageLength',
                }
            ]
        });
    };
    // Показать данные 
    table_outgoing_wagon.prototype.view = function (data) {
        this.obj_out_wag.clear();
        this.obj_out_wag.rows.add(data);
        this.obj_out_wag.order([4, 'desc']);
        this.obj_out_wag.draw();
    };
    // загрузить данные 
    table_outgoing_wagon.prototype.load_of_num = function (num) {
        if (num) {
            LockScreen(langView('mess_load_out_wagons', App.Langs));
            ids_rwt.getOutgoingCarsOfWagonNum(num, function (list_out_wagon) {
                this.view(list_out_wagon);
                LockScreenOff();
            }.bind(this));
        }
    };
    // 
    App.table_outgoing_wagon = table_outgoing_wagon;

    window.App = App;
})(window);