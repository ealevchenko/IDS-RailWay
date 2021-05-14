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
            'field_date_arrival_wagon': 'Вагон принял',
            'field_station_from': 'Отправлено со станции',
            'field_station_on': 'Принят на станцию',
            'field_way': 'Принят на путь',
            'field_doc_uz': '№ накладной УЗ',
            'field_status': 'Статус состава',
            'field_note': 'Примечание',
            'field_create': 'Строка создана',
            'field_create_user': 'Создал строку',
            'field_change': 'Строку правили',
            'field_change_user': 'Правил',
            'field_create_sostav': 'Добавил',
            'field_change_sostav': 'Правил',

            'field_id_arrival_car': 'id прибытия',
            'field_id_outgoing_car': 'id отправки',
            'field_id_sap_incoming_supply': 'id SAP Вх.поставки',
            'field_id_sap_outbound_supply': 'id SAP Исх.поставки',
            'field_close': 'Строка закрыта',
            'field_parent_id': 'id предыд. строки',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_arr_wagons': 'Загружаю список принятых вагонов...',
            'mess_load_wir_wagons': 'Загружаю список внутренних перемещений вагонов...',
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
    // Инициализация полей таблицы
    var init_columns = function (collums_name) {
        var collums = [];
        if (collums_name && collums_name.length > 0) {
            $.each(collums_name, function (i, el) {
                var field = list_collums.find(function (o) {
                    return o.field === el;
                });
                // Если поле не найдено, создадим по умолчанию (чтобы небыло ошибки)
                if (!field) {
                    field = {
                        field: el,
                        data: function (row, type, val, meta) {
                            return "Field_error";
                        },
                        title: el, width: "100px", orderable: false, searchable: false
                    };
                }
                collums.push(field);
            });
        }
        return collums;
    };

    //===========================================================================
    //-----------------------------------------------------------------------
    // таблица истрия прибытия вагона
    //-----------------------------------------------------------------------
    // Конструктор модуля таблицы истрия прибытия вагона
    function table_arrival_wagons(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_arr_wag = $(selector);
        if (this.$t_arr_wag.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    // инициализация таблицы истрия прибытия вагона
    table_arrival_wagons.prototype.init = function () {
        this.obj_arr_wag = this.$t_arr_wag.DataTable({
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
                var sostav = data.ArrivalSostav ? data.ArrivalSostav : null;
                if (data.arrival !== null) {
                    // приняли
                    $(row).removeClass('skip_wagon').addClass('arrival_wagon');
                } else {
                    if (sostav.date_adoption) {
                        // неприняли
                        $(row).removeClass('arrival_wagon').addClass('skip_wagon');
                    } else {
                        $(row).removeClass('arrival_wagon skip_wagon');
                    }
                }
            },
            columns: [
                {
                    targets: 0,
                    data: null,
                    defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
                    orderable: false,
                    //className: 'select-checkbox',
                    width: "20px"
                },
                {
                    data: function (row, type, val, meta) {
                        return row.num;
                    },
                    className: 'dt-body-center',
                    title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
                },
                {
                    //data: "train",
                    data: function (row, type, val, meta) {
                        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                        return sostav ? sostav.train : null;
                    },
                    className: 'dt-body-center',
                    title: langView('field_train', App.Langs), width: "50px", orderable: false, searchable: true
                },
                {
                    //data: "composition_index",
                    data: function (row, type, val, meta) {
                        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                        return sostav ? sostav.composition_index : null;
                    },
                    className: 'dt-body-center',
                    title: langView('field_composition_index', App.Langs), width: "100px", orderable: false, searchable: true
                },
                {
                    data: function (row, type, val, meta) {
                        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                        return getReplaceTOfDT(sostav.date_arrival);
                    },
                    className: 'dt-body-center',
                    title: langView('field_date_arrival', App.Langs), width: "100px", orderable: true, searchable: false
                },
                {
                    data: function (row, type, val, meta) {
                        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                        if (row.arrival !== null) {
                            return getReplaceTOfDT(sostav.date_adoption);
                        } else {
                            return sostav.date_adoption ? 'Нет' : null;
                        }
                    },
                    className: 'dt-body-center',
                    title: langView('field_date_adoption', App.Langs), width: "100px", orderable: false, searchable: false
                },
                {
                    //data: "date_adoption_act",
                    data: function (row, type, val, meta) {
                        if (row.arrival !== null) {
                            var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                            return getReplaceTOfDT(sostav.date_adoption_act);
                        } else {
                            return null;
                        }
                    },
                    className: 'dt-body-center',
                    title: langView('field_date_adoption_act', App.Langs), width: "100px", orderable: false, searchable: false
                },
                {
                    data: function (row, type, val, meta) {
                        return getReplaceTOfDT(row.date_adoption_act);
                    },
                    className: 'dt-body-center',
                    title: langView('field_date_adoption_act_wagon', App.Langs), width: "100px", orderable: false, searchable: false
                },
                {
                    data: function (row, type, val, meta) {
                        return row.arrival ? (row.arrival_user + '<br />[' + getReplaceTOfDT(row.arrival) + ']') : null;
                    },
                    className: 'dt-body-center',
                    title: langView('field_date_arrival_wagon', App.Langs), width: "100px", orderable: false, searchable: false
                },
                {
                    data: function (row, type, val, meta) {
                        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                        var station = sostav ? sostav.Directory_Station : null;
                        return station ? station['station_name_' + App.Lang] : null;
                    },
                    className: 'dt-body-center',
                    title: langView('field_station_from', App.Langs), width: "100px", orderable: false, searchable: true
                },
                {
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
                    data: function (row, type, val, meta) {
                        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                        return sostav ? outStatusArrivalSostav(sostav.status) : null;
                    },
                    className: 'dt-body-center',
                    title: langView('field_status', App.Langs), width: "100px", orderable: false, searchable: true
                },
                {
                    data: function (row, type, val, meta) {
                        var doc = row.UZ_DOC ? row.UZ_DOC : null;
                        return doc ? doc.num_uz : null;
                    },
                    className: 'dt-body-center',
                    title: langView('field_doc_uz', App.Langs), width: "50px", orderable: false, searchable: true
                },
                {
                    data: function (row, type, val, meta) {
                        return row.note;
                    },
                    className: 'dt-body-left',
                    title: langView('field_note', App.Langs), width: "300px", orderable: false, searchable: false
                },
                ////{
                ////    data: "create", title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
                ////},
                ////{
                ////    data: "create_user", title: langView('field_create_user', App.Langs), width: "100px", orderable: false, searchable: false
                ////},
                ////{
                ////    data: "change", title: langView('field_change', App.Langs), width: "100px", orderable: false, searchable: false
                ////},
                ////{
                ////    data: "change_user", title: langView('field_change_user', App.Langs), width: "100px", orderable: false, searchable: false
                ////},
                //{ data: "create_sostav", title: langView('field_create_sostav', App.Langs), width: "150px", orderable: false, searchable: false },
                //{ data: "change_sostav", title: langView('field_change_sostav', App.Langs), width: "150px", orderable: false, searchable: false }
            ],
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
    table_arrival_wagons.prototype.view = function (data) {
        this.obj_arr_wag.clear();
        this.obj_arr_wag.rows.add(data);
        this.obj_arr_wag.order([4, 'desc']);
        this.obj_arr_wag.draw();
    };
    // загрузить данные 
    table_arrival_wagons.prototype.load_of_num = function (num) {
        LockScreen(langView('mess_load_arr_wagons', App.Langs));
        ids_rwt.getArrivalCarsOfNum(num, function (list_arrival_cars) {
            this.view(list_arrival_cars);
            LockScreenOff();
        }.bind(this));
    };
    // 
    App.table_arrival_wagons = table_arrival_wagons;
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
            'wir_parent_id']);
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
                    $(row).removeClass('skip_wagon').addClass('arrival_wagon');
                } else {
                    $(row).removeClass('arrival_wagon').addClass('skip_wagon');
                }
            },
            columns: this.init_columns(),
            //columns: [
            //    {
            //        targets: 0,
            //        data: null,
            //        defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            //        orderable: false,
            //        //className: 'select-checkbox',
            //        width: "20px"
            //    },
            //    {
            //        data: function (row, type, val, meta) {
            //            return row.num;
            //        },
            //        className: 'dt-body-center',
            //        title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
            //    },
            //    //{
            //    //    //data: "train",
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        return sostav ? sostav.train : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_train', App.Langs), width: "50px", orderable: false, searchable: true
            //    //},
            //    //{
            //    //    //data: "composition_index",
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        return sostav ? sostav.composition_index : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_composition_index', App.Langs), width: "100px", orderable: false, searchable: true
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        return getReplaceTOfDT(sostav.date_arrival);
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_date_arrival', App.Langs), width: "100px", orderable: true, searchable: false
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        if (row.arrival !== null) {
            //    //            return getReplaceTOfDT(sostav.date_adoption);
            //    //        } else {
            //    //            return sostav.date_adoption ? 'Нет' : null;
            //    //        }
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_date_adoption', App.Langs), width: "100px", orderable: false, searchable: false
            //    //},
            //    //{
            //    //    //data: "date_adoption_act",
            //    //    data: function (row, type, val, meta) {
            //    //        if (row.arrival !== null) {
            //    //            var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //            return getReplaceTOfDT(sostav.date_adoption_act);
            //    //        } else {
            //    //            return null;
            //    //        }
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_date_adoption_act', App.Langs), width: "100px", orderable: false, searchable: false
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        return getReplaceTOfDT(row.date_adoption_act);
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_date_adoption_act_wagon', App.Langs), width: "100px", orderable: false, searchable: false
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        return row.arrival ? (row.arrival_user + '<br />[' + getReplaceTOfDT(row.arrival) + ']') : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_date_arrival_wagon', App.Langs), width: "100px", orderable: false, searchable: false
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        var station = sostav ? sostav.Directory_Station : null;
            //    //        return station ? station['station_name_' + App.Lang] : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_station_from', App.Langs), width: "100px", orderable: false, searchable: true
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        var station = sostav ? sostav.Directory_Station1 : null;
            //    //        return station ? station['station_name_' + App.Lang] : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_station_on', App.Langs), width: "100px", orderable: false, searchable: true
            //    //},
            //    //{
            //    //    //data: "id_way",
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        var way = sostav ? sostav.Directory_Ways : null;
            //    //        return way ? way['way_num_' + App.Lang] : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_way', App.Langs), width: "100px", orderable: false, searchable: false
            //    //},
            //    //{
            //    //    //data: "status_name",
            //    //    data: function (row, type, val, meta) {
            //    //        var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
            //    //        return sostav ? outStatusArrivalSostav(sostav.status) : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_status', App.Langs), width: "100px", orderable: false, searchable: true
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        var doc = row.UZ_DOC ? row.UZ_DOC : null;
            //    //        return doc ? doc.num_uz : null;
            //    //    },
            //    //    className: 'dt-body-center',
            //    //    title: langView('field_doc_uz', App.Langs), width: "50px", orderable: false, searchable: true
            //    //},
            //    //{
            //    //    data: function (row, type, val, meta) {
            //    //        return row.note;
            //    //    },
            //    //    className: 'dt-body-left',
            //    //    title: langView('field_note', App.Langs), width: "300px", orderable: false, searchable: false
            //    //},
            //    ////{
            //    ////    data: "create", title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
            //    ////},
            //    ////{
            //    ////    data: "create_user", title: langView('field_create_user', App.Langs), width: "100px", orderable: false, searchable: false
            //    ////},
            //    ////{
            //    ////    data: "change", title: langView('field_change', App.Langs), width: "100px", orderable: false, searchable: false
            //    ////},
            //    ////{
            //    ////    data: "change_user", title: langView('field_change_user', App.Langs), width: "100px", orderable: false, searchable: false
            //    ////},
            //    //{ data: "create_sostav", title: langView('field_create_sostav', App.Langs), width: "150px", orderable: false, searchable: false },
            //    //{ data: "change_sostav", title: langView('field_change_sostav', App.Langs), width: "150px", orderable: false, searchable: false }
            //],
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
        this.obj_wir.rows.add(data);
        this.obj_wir.order([1, 'desc']);
        this.obj_wir.draw();
    };
    // загрузить данные 
    table_wir.prototype.load_of_num = function (num) {
        LockScreen(langView('mess_load_wir_wagons', App.Langs));
        ids_rwt.getWagonInternalRoutesOfWagonNum(num, function (list_wir_wagon) {
            this.view(list_wir_wagon);
            LockScreenOff();
        }.bind(this));
    };
    // 
    App.table_wir = table_wir;
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
            'wir_button_view',
            'wir_id',
            'wir_num']);
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
                if (data.close !== null) {
                    // приняли
                    $(row).removeClass('skip_wagon').addClass('arrival_wagon');
                } else {
                    $(row).removeClass('arrival_wagon').addClass('skip_wagon');
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
        //this.obj_out_wag.order([1, 'desc']);
        this.obj_out_wag.draw();
    };
    // загрузить данные 
    table_outgoing_wagon.prototype.load_of_num = function (num) {
        LockScreen(langView('mess_load_out_wagons', App.Langs));
        ids_rwt.getOutgoingCarsOfWagonNum(num, function (list_out_wagon) {
            this.view(list_out_wagon);
            LockScreenOff();
        }.bind(this));
    };
    // 
    App.table_outgoing_wagon = table_outgoing_wagon;

    window.App = App;
})(window);