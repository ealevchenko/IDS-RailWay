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
            'field_train': '№ поезда',
            'field_composition_index': 'Индекс поезда',
            'field_date_arrival': 'Прибил в составе',
            'field_date_adoption': 'Принят в составе',
            'field_date_adoption_act': 'Принят в составе по акту',
            'field_date_adoption_act_wagon': 'Вагон принят по акту',
            'field_processed': 'Обработан',
            'field_station_from': 'Отправлен со станции',
            'field_station_on': 'Принят на станцию',
            'field_way': 'Принят на путь',
            'field_doc_uz': '№ накладной УЗ',
            'field_status': 'Статус состава',
            'field_note': 'Примечание',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_arr_wagons': 'Загружаю список принятых вагонов...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_num': 'Wagon number',
            'field_train': 'Train no.',
            'field_composition_index': 'Train index',
            'field_date_arrival': 'Arrived in lineup',
            'field_date_adoption': 'Adopted with',
            'field_date_adoption_act': 'Adopted as part of the act',
            'field_date_adoption_act_wagon': 'The car was accepted according to the act',
            'field_processed': 'Processed',
            'field_station_from': 'Sent from station',
            'field_station_on': 'Received at station',
            'field_way': 'Accepted on path',
            'field_doc_uz': 'UZ waybill no.',
            'field_status': 'Squad status',
            'field_note': 'Note',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_arr_wagons': 'Loading the list of accepted wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'arr_car_details_control',
            className: 'details-control  details-control-arrival',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'arr_car_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn arrival-button"><i class="far fa-eye"></i></button>',
            orderable: false,
            //className: 'select-checkbox',
            width: "20px"
        },
        {
            field: 'arr_car_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            //data: "train",
            field: 'arr_car_train',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return sostav ? sostav.train : null;
            },
            className: 'dt-body-center',
            title: langView('field_train', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            //data: "composition_index",
            field: 'arr_car_composition_index',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return sostav ? sostav.composition_index : null;
            },
            className: 'dt-body-center',
            title: langView('field_composition_index', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_date_arrival',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return getReplaceTOfDT(sostav ? sostav.date_arrival : null);
            },
            className: 'dt-body-center',
            title: langView('field_date_arrival', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'arr_car_date_adoption',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                if (row.arrival !== null) {
                    return getReplaceTOfDT(sostav ? sostav.date_adoption : null);
                } else {
                    return getReplaceTOfDT(sostav ? sostav.date_adoption : null) ? 'Нет' : null;
                }
            },
            className: 'dt-body-center',
            title: langView('field_date_adoption', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            //data: "date_adoption_act",
            field: 'arr_car_date_adoption_act',
            data: function (row, type, val, meta) {
                if (row.arrival !== null) {
                    var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                    return getReplaceTOfDT(sostav ? sostav.date_adoption_act : null);
                } else {
                    return null;
                }
            },
            className: 'dt-body-center',
            title: langView('field_date_adoption_act', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'arr_car_date_adoption_act_wagon',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.date_adoption_act);
            },
            className: 'dt-body-center',
            title: langView('field_date_adoption_act_wagon', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'arr_car_date_arrival_wagon',
            data: function (row, type, val, meta) {
                return row.arrival ? (row.arrival_user + '<br />[' + getReplaceTOfDT(row.arrival) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_processed', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'arr_car_station_from',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                var station = sostav ? sostav.Directory_Station : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station_from', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_station_on',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                var station = sostav ? sostav.Directory_Station1 : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station_on', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            //data: "id_way",
            field: 'arr_car_way',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                var way = sostav ? sostav.Directory_Ways : null;
                return way ? way['way_num_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_way', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            //data: "status_name",
            field: 'arr_car_status',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return sostav ? outStatusArrivalSostav(sostav.status) : null;
            },
            className: 'dt-body-center',
            title: langView('field_status', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_doc_uz',
            data: function (row, type, val, meta) {
                var doc = row.UZ_DOC ? row.UZ_DOC : null;
                return doc ? doc.num_uz : null;
            },
            className: 'dt-body-center',
            title: langView('field_doc_uz', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-left',
            title: langView('field_note', App.Langs), width: "300px", orderable: false, searchable: false
        },
    ];
    //
    function table_arrival_wagons(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_arr_wag = $(selector);
        if (this.$t_arr_wag.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$t_arr_wag.attr('id');
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_arrival_wagons.prototype.init_columns = function () {
        var collums = [];
        if (this.b_detali_wir) collums.push('arr_car_details_control');
        collums.push('arr_car_button_view');
        collums.push('arr_car_num');
        collums.push('arr_car_train');
        collums.push('arr_car_composition_index');
        collums.push('arr_car_date_arrival');
        collums.push('arr_car_date_adoption');
        collums.push('arr_car_date_adoption_act');
        collums.push('arr_car_date_adoption_act_wagon');
        collums.push('arr_car_date_arrival_wagon');
        collums.push('arr_car_station_from');
        collums.push('arr_car_station_on');
        collums.push('arr_car_way');
        collums.push('arr_car_status');
        collums.push('arr_car_doc_uz');
        collums.push('arr_car_note');
        return init_columns(collums, list_collums);
    };
    // инициализация таблицы истрия прибытия вагона
    table_arrival_wagons.prototype.init = function (detali_wir) {
        this.b_detali_wir = detali_wir;     // Бит отображать детально
        this.d_wir = [];                    // Массив таблиц детально
        this.obj_arr_wag = this.$t_arr_wag.DataTable({
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
                var sostav = data.ArrivalSostav ? data.ArrivalSostav : null;
                if (data.arrival !== null) {
                    // приняли
                    $(row).removeClass('red').addClass('green');
                } else {
                    if (sostav && sostav.date_adoption) {
                        // неприняли
                        $(row).removeClass('green').addClass('red');
                    } else {
                        $(row).removeClass('green red');
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
            //var rowData = this.obj_arr_wag.rows(indexes).data();
            //if (rowData && rowData.length > 0) {
            //    this.id_car = rowData[0].id;
            //    this.tab_detali.load_of_num(53576047);
            //    var t = typeof this.tab_detali;
            //    //if (typeof this.fn_vew_detali === 'function') {
            //    //    //fn(this.id_car);
            //    //    //this.fn_vew_detali(53576047);
            //    //    this.tab_detali.load_of_num(53576047);
            //    //};
            //}
        }.bind(this));
        var base = this;
        this.$t_arr_wag.find('tbody').on('tbody click', 'button.arrival-button', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var data = base.obj_arr_wag.row($(e.currentTarget).parents('tr')).data();
            var sostav = data ? data.ArrivalSostav : null;
            if (sostav) {
                var date = moment(sostav.date_arrival)
                date = date.format('YYYY-MM-DD[T]HH:mm:ss');
                window.open(url_incoming + '?id_arrival=' + data.id_arrival + '&arrival=' + date, '', '');
            }

        }.bind(this));
        if (this.b_detali_wir) this.init_detali();
    };
    // Показать данные 
    table_arrival_wagons.prototype.view = function (data) {
        this.obj_arr_wag.clear();
        this.obj_arr_wag.rows.add(data);
        this.obj_arr_wag.order([(this.b_detali_wir ? 5 : 4), 'desc']);
        this.obj_arr_wag.draw();
    };
    // загрузить данные 
    table_arrival_wagons.prototype.load_of_num = function (num) {
        if (num) {
            LockScreen(langView('mess_load_arr_wagons', App.Langs));
            ids_rwt.getArrivalCarsOfNum(num, function (list_arrival_cars) {
                this.view(list_arrival_cars);
                LockScreenOff();
            }.bind(this));
        }
    };
    // загрузить данные 
    table_arrival_wagons.prototype.load_of_id = function (id) {
        if (id) {
            LockScreen(langView('mess_load_arr_wagons', App.Langs));
            ids_rwt.getArrivalCarsOfID(id, function (list_arrival_cars) {
                this.view($(list_arrival_cars));
                LockScreenOff();
            }.bind(this));
        }
    };
    // Инициализация таблицы детально
    table_arrival_wagons.prototype.init_detali = function () {
        var base = this;
        this.$t_arr_wag.find('tbody')
            .on('click', 'td.details-control-arrival', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                var row = base.obj_arr_wag.row(tr);
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
                        '<table class="display compact cell-border row-border hover" id="' + this.selector + '-wird-' + row.data().id + '" style="width:100%"></table>' +
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
    table_arrival_wagons.prototype.view_detali = function (data) {
        var DWIR = App.table_wir;
        var sl = 'table#' + this.selector + '-wird-' + data.id;
        //if (!this.d_wir[data.id]) {
        this.d_wir[data.id] = new DWIR(sl); // Создадим экземпляр таблицы
        this.d_wir[data.id].init(true);
        //}
        this.d_wir[data.id].load_of_id_arr_car(data.id);
    };
    // 
    App.table_arrival_wagons = table_arrival_wagons;

    window.App = App;
})(window);