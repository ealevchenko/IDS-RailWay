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

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_wir_wagons': 'Загружаю список внутренних перемещений вагонов...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_num': 'Wagon number',
            'field_id_arrival_car': 'arrival id',
            'field_id_outgoing_car': 'send id',
            'field_id_sap_incoming_supply': 'SAP id Incoming delivery',
            'field_id_sap_outbound_supply': 'SAP id Outbound supply',
            'field_note': 'Note',
            'field_create': 'String created',
            'field_close': 'The line is closed',
            'field_parent_id': 'Previous row',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_wir_wagons': 'Loading the list of internal movements of wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'wir_car_details_control',
            className: 'details-control details-control-wir',
            /*            id:'wir_car_details_control',*/
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'wir_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn wir-button"><i class="far fa-eye"></i></button>',
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
        this.selector = this.$t_wir.attr('id');
    }

    // инициализация полей таблицы вагоны на начальном пути
    table_wir.prototype.init_columns = function () {
        var collums = [];
        if (this.b_detali) collums.push('wir_car_details_control');
        collums.push('wir_button_view');
        collums.push('wir_id');
        collums.push('wir_num');
        collums.push('wir_id_arrival_car');
        collums.push('wir_id_outgoing_car');
        collums.push('wir_id_sap_incoming_supply');
        collums.push('wir_id_sap_outbound_supply');
        collums.push('wir_note');
        collums.push('wir_create');
        collums.push('wir_close');
        collums.push('wir_parent_id');
        return init_columns(collums, list_collums);
    };
    //
    table_wir.prototype.init = function (detali) {
        this.b_detali = detali;     // Бит отображать детально
        this.d_twird = [];                    // Массив таблиц детально
        this.obj_wir = this.$t_wir.DataTable({
            "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            select: false,
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
        }).on('select', function (e, dt, type, indexes) {
        }.bind(this));
        var base = this;
        this.$t_wir.find('tbody').on('tbody click', 'button.wir-button', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var data = base.obj_wir.row($(e.currentTarget).parents('tr')).data();
            if (data && data.close === null) {
                var wims = data ? data.WagonInternalMovement : null;
                var way = wims && wims.length > 0 ? wims[wims.length - 1].Directory_Ways : null;
                if (way) {
                    window.open(url_wsd + '?station=' + way.id_station + '&park=' + way.id_park + '&way=' + way.id + '&num=' + data.num, '', '');
                }
            }
        }.bind(this));

        if (this.b_detali) this.init_detali();
    };
    // Показать данные 
    table_wir.prototype.view = function (data) {
        this.obj_wir.clear();
        //if (data && data.length > 0) {
        this.obj_wir.rows.add(data);
        this.obj_wir.order([(this.b_detali ? 2 : 1), 'desc']);
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
                this.view($(list_wir_wagon));
                LockScreenOff();
            }.bind(this));
        };
    };

    table_wir.prototype.load_of_id_arr_car = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wir_wagons', App.Langs));
            ids_rwt.getWagonInternalRoutesOfArrivalCarsID(id, function (list_wir_wagon) {
                //var list = [];
                //if (list_wir_wagon) {
                //    list.push(list_wir_wagon);
                //};
                this.view($(list_wir_wagon));
                LockScreenOff();
            }.bind(this));
        };
    };
    // Инициализация таблицы детально
    table_wir.prototype.init_detali = function () {
        var base = this;
        this.$t_wir.find('tbody')
            .on('click', 'td.details-control-wir', function (e) {
                e.preventDefault();
                var tr = $(e.target).closest('tr');
                var row = base.obj_wir.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    row.child('<div class="detali-operation">' +
                        '<div class="row">' +
                        '<div class="col-xl-12">' +
                        '<div id="' + this.selector + '-wird-' + row.data().id + '">' +

                        //'<div class="card border-primary mb-3">' +
                        //'<div class="card-header">Движение на АМКР</div>' +
                        //'<div class="card-body">' +
                        //'<div class="row">' +
                        //'<div class="col-xl-12">' +

                        //'</div>' +
                        //'</div>' +
                        //'</div>' +
                        //'</div>' +
                        //'</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>').show();

                    // Инициализируем
                    base.view_detali(row.data());
                    tr.addClass('shown');
                }
            }.bind(this));
    };
    // 
    table_wir.prototype.view_detali = function (data) {
        var TWIRD = App.table_wir_detali;
        this.d_twird[data.id] = new TWIRD('div#' + this.selector + '-wird-' + data.id); // Создадим экземпляр
        this.d_twird[data.id].init(data.id_arrival_car, data.id, data.id_outgoing_car);
    };
    // 
    App.table_wir = table_wir;

    window.App = App;
})(window);