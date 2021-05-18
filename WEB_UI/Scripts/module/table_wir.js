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
            'field_id_arrival_car': 'id прибытия',
            'field_id_outgoing_car': 'id отправки',
            'field_id_sap_incoming_supply': 'id SAP Вх.поставки',
            'field_id_sap_outbound_supply': 'id SAP Исх.поставки',
            'field_note': 'Примечание',
            'field_create': 'Строка создана',
            'field_close': 'Строка закрыта',
            'field_parent_id': 'Предыдущая строка',

            //'field_train': '№ поезда',
            //'field_composition_index': 'Индекс поезда',
            //'field_date_arrival': 'Прибил в составе',
            //'field_date_adoption': 'Принят в составе',
            //'field_date_adoption_act': 'Принят в составе по акту',
            //'field_date_adoption_act_wagon': 'Вагон принят по акту',
            //'field_date_arrival_wagon': 'Вагон принял',
            //'field_station_from': 'Отправлен со станции',
            //'field_station_on': 'Принят на станцию',
            //'field_out_station_on': 'Отправлен на станцию',
            //'field_way': 'Принят на путь',
            //'field_way_from': 'Отправлен с пути',
            //'field_id_doc_uz': '№ док. внутр. УЗ',
            //'field_doc_uz': '№ накладной УЗ',
            //'field_status': 'Статус состава',
            
            
            //'field_create_user': 'Создал строку',
            //'field_change': 'Строку правили',
            //'field_change_user': 'Правил',
            //'field_create_sostav': 'Добавил',
            //'field_change_sostav': 'Правил',
            //'field_position_outgoing': '№ поз. в составе',
            //'field_processed': 'Обработан',
            //'field_date_outgoing_wagon_act': 'Вагон сдан по акту',
            //'field_date_readiness_amkr': 'Время предъявления состава на УЗ',
            //'field_num_doc_sostav': '№ док состава',
            //'field_date_outgoing': 'Состав сдан на УЗ',
            //'field_date_outgoing_act': 'Состав сдан на УЗ по акту',
            //'field_date_departure_amkr': 'Состав отправлен на УЗ',
            //'field_out_car_return_start': 'Возврат начало (id – стр. возврата \ id- стр. внут. перем.)',
            //'field_out_car_return_stop': 'Возврат конец (id – стр. возврата)',
            //'field_out_car_uz_vagon': 'id стр. док. ИДС на вагон',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            //'mess_load_arr_wagons': 'Загружаю список принятых вагонов...',
            'mess_load_wir_wagons': 'Загружаю список внутренних перемещений вагонов...',
            //'mess_load_wim_wagons': 'Загружаю список истории дислокации вагонова...',
            //'mess_load_out_wagons': 'Загружаю список отправленных вагонов...',
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
            field: 'wir_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center',
            width: "20px"
        },
        {
            field: 'wir_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wir_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_arrival_car',
            data: function (row, type, val, meta) {
                return row.id_arrival_car;
            },
            className: 'dt-body-center',
            title: langView('field_id_arrival_car', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_sap_incoming_supply',
            data: function (row, type, val, meta) {
                return row.id_sap_incoming_supply;
            },
            className: 'dt-body-center',
            title: langView('field_id_sap_incoming_supply', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_outgoing_car',
            data: function (row, type, val, meta) {
                return row.id_outgoing_car;
            },
            className: 'dt-body-center',
            title: langView('field_id_outgoing_car', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_sap_outbound_supply',
            data: function (row, type, val, meta) {
                return row.id_sap_outbound_supply;
            },
            className: 'dt-body-center',
            title: langView('field_id_sap_outbound_supply', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-left',
            title: langView('field_note', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'wir_create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + getReplaceTOfDT(row.create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wir_close',
            data: function (row, type, val, meta) {
                return row.close ? (row.close_user + '<br />[' + getReplaceTOfDT(row.close) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_close', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wir_parent_id',
            data: function (row, type, val, meta) {
                return row.parent_id;
            },
            className: 'dt-body-left',
            title: langView('field_parent_id', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];

    //===========================================================================
    //-----------------------------------------------------------------------
    // таблица истрия внутренего движения вагона
    //-----------------------------------------------------------------------
    // Конструктор модуля таблицы внутренего движения вагона
    function table_wir(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_wir = $(selector);
        if (this.$t_wir.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    // инициализация полей таблицы вагоны на начальном пути
    table_wir.prototype.init_columns = function () {
        return init_columns([
            'wir_button_view',
            'wir_id',
            'wir_num',
            'wir_id_arrival_car',
            'wir_id_outgoing_car',
            'wir_id_sap_incoming_supply',
            'wir_id_sap_outbound_supply',
            'wir_note',
            'wir_create',
            'wir_close',
            'wir_parent_id'], list_collums);
    };
    //
    table_wir.prototype.init = function () {
        this.obj_wir = this.$t_wir.DataTable({
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
                if (data.close !== null) {
                    // приняли
                    if (data.id_outgoing_car) {
                        $(row).removeClass('yellow red').addClass('green');
                    } else {
                        $(row).removeClass('green yellow').addClass('red');
                    }
                } else {
                    if (data.id_outgoing_car) {
                        $(row).removeClass('green red').addClass('yellow');
                    } else {
                        $(row).removeClass('green yellow').addClass('red');
                    }
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
    table_wir.prototype.view = function (data) {
        this.obj_wir.clear();
        //if (data && data.length > 0) {
        this.obj_wir.rows.add(data);
        this.obj_wir.order([1, 'desc']);
        //}
        this.obj_wir.draw();
    };
    // загрузить данные по num
    table_wir.prototype.load_of_num = function (num) {
        if (num) {
            LockScreen(langView('mess_load_wir_wagons', App.Langs));
            ids_rwt.getWagonInternalRoutesOfWagonNum(num, function (list_wir_wagon) {
                this.view(list_wir_wagon);
                LockScreenOff();
            }.bind(this));
        };
    };
    // загрузить данные по id
    table_wir.prototype.load_of_id = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wir_wagons', App.Langs));
            ids_rwt.getWagonInternalRoutesOfID(id, function (list_wir_wagon) {
                this.view(list_wir_wagon);
                LockScreenOff();
            }.bind(this));
        };
    };

    table_wir.prototype.load_of_id_out_car = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wir_wagons', App.Langs));
            ids_rwt.getWagonInternalRoutesOfOutgoingCarsID(id, function (list_wir_wagon) {
                this.view(list_wir_wagon);
                LockScreenOff();
            }.bind(this));
        };
    };

    table_wir.prototype.load_of_id_arr_car = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wir_wagons', App.Langs));
            ids_rwt.getWagonInternalRoutesOfArrivalCarsID(id, function (list_wir_wagon) {
                var list = [];
                if (list_wir_wagon) {
                    list.push(list_wir_wagon);
                };
                this.view(list);
                LockScreenOff();
            }.bind(this));
        };
    };
    // 
    App.table_wir = table_wir;

    window.App = App;
})(window);