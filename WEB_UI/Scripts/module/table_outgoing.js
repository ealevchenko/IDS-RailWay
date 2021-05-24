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

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_out_wagons': 'Загружаю список отправленных вагонов...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_num': 'Wagon number',
            'field_position_outgoing': 'Pos. as part of ',
            'field_date_readiness_amkr': 'Time of train presentation at UZ',
            'field_num_doc_sostav': 'Dock number of the train',
            'field_station_from': 'Sent from station',
            'field_way_from': 'Sent out of path',
            'field_out_station_on': 'Sent to station',
            'field_date_outgoing': 'The train has been handed over to UZ',
            'field_date_outgoing_act': 'The train was handed over to UZ according to the act',
            'field_date_departure_amkr': 'The train was sent to UZ',
            'field_status': 'Squad status',
            'field_id_doc_uz': 'Doc. no. int. UZ ',
            'field_doc_uz': 'UZ waybill no.',
            'field_note': 'Note',
            'field_date_outgoing_wagon_act': 'The car is handed over according to the certificate',
            'field_processed': 'Processed',
            'field_out_car_return_start': 'Return start (id - return page \ id - internal variable)',
            'field_out_car_return_stop': 'Return end (id - return page)',
            'field_out_car_uz_vagon': 'id page doc. IDS on the wagon ',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_out_wagons': 'Loading the list of sent wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'out_car_details_control',
            className: 'details-control  details-control-outgoing',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
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
        this.selector = this.$t_out_wag.attr('id');
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_outgoing_wagon.prototype.init_columns = function () {
        var collums = [];
        if (this.b_detali_wir) collums.push('out_car_details_control');
        collums.push('out_car_button_view');
        collums.push('out_car_id');
        collums.push('out_car_num');
        collums.push('out_car_position_outgoing');
        collums.push('out_car_date_readiness_amkr');
        collums.push('out_car_num_doc_sostav');
        collums.push('out_car_station_from');
        collums.push('out_car_way');
        collums.push('out_car_station_on');
        collums.push('out_car_date_outgoing');
        collums.push('out_car_date_outgoing_act');
        collums.push('out_car_date_departure_amkr');
        collums.push('out_car_status');
        collums.push('out_car_outgoing');
        collums.push('out_car_date_outgoing_wagon_act');
        collums.push('out_car_id_doc_uz');
        collums.push('out_car_doc_uz');
        collums.push('out_car_uz_vagon');
        collums.push('out_car_note');
        collums.push('out_car_return_start');
        collums.push('out_car_return_stop');
        return init_columns(collums, list_collums);
    };
    //
    table_outgoing_wagon.prototype.init = function (detali_wir) {
        this.b_detali_wir = detali_wir;     // Бит отображать детально
        this.d_wir = [];                    // Массив таблиц детально
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
        }).on('select', function (e, dt, type, indexes) {
        }.bind(this));
        if (this.b_detali_wir) this.init_detali();
    };
    // Показать данные 
    table_outgoing_wagon.prototype.view = function (data) {
        this.obj_out_wag.clear();
        this.obj_out_wag.rows.add(data);
        this.obj_out_wag.order([(this.b_detali_wir ? 5 : 4), 'desc']);
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

    table_outgoing_wagon.prototype.load_of_id = function (id) {
        if (id) {
            LockScreen(langView('mess_load_out_wagons', App.Langs));
            ids_rwt.getOutgoingCarsOfID(id, function (list_out_wagon) {
                this.view($(list_out_wagon));
                LockScreenOff();
            }.bind(this));
        }
    };
    // Инициализация таблицы детально
    table_outgoing_wagon.prototype.init_detali = function () {
        var base = this;
        this.$t_out_wag.find('tbody')
            .on('click', 'td.details-control-outgoing', function (e) {
                var tr = $(e.target).closest('tr');
                var row = base.obj_out_wag.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    //row.child('<div class="detali-operation"><div class="row"><div class="col-xl-12 operator-detali-tables"><table class="display compact cell-border row-border hover" id="wir-detali-' + row.data().id + '" style="width:100%;"></table></div></div></div>').show();
                    row.child('<div class="detali-operation">' +
                        //'<div class="row">' +
                        //'<div class="col-xl-12">' +
                        '<div class="card border-primary mb-3">' +
                        '<div class="card-header">Движение на АМКР</div>' +
                        '<div class="card-body">' +
                        '<div class="row">' +
                        '<div class="col-xl-12 operator-detali-tables">' +
                        '<table class="display compact cell-border row-border hover" id="' + this.selector +'-wird-' + row.data().id + '" style="width:100%"></table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        //'</div>' +
                        //'</div>' +
                        '</div>').show();

                    // Инициализируем
                    base.view_detali(row.data());
                    tr.addClass('shown');
                }
            }.bind(this));
    };
    //
    table_outgoing_wagon.prototype.view_detali = function (data) {
        var DWIR = App.table_wir;
        var sl = 'table#' + this.selector + '-wird-' + data.id;
        //if (!this.d_wir[data.id]) {
        this.d_wir[data.id] = new DWIR(sl); // Создадим экземпляр таблицы
        this.d_wir[data.id].init(true);
        //}
        this.d_wir[data.id].load_of_id_out_car(data.id);
    };
    // 
    App.table_outgoing_wagon = table_outgoing_wagon;

    window.App = App;
})(window);