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
            'field_station': 'Станция',
            'field_park_way': 'Парк',
            'field_way': 'Путь',
            'field_way_start': 'Поставили на путь',
            'field_way_end': 'Убрали с пути',
            'field_outer_way': 'Перегон',
            'field_outer_way_start': 'Вышел на перегон',
            'field_outer_way_end': 'Пришел с перегона',
            'field_position': '№ поз.',
            'field_note': 'Примечание',
            'field_create': 'Строка создана',
            'field_close': 'Строка закрыта',
            'field_parent_id': 'Предыдущая строка',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_wim_wagons': 'Загружаю список истории дислокации вагона...',

        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_station': 'Station',
            'field_park_way': 'Park',
            'field_way': 'Path',
            'field_way_start': 'Put on a path',
            'field_way_end': 'Out of the way',
            'field_outer_way': 'Ferry',
            'field_outer_way_start': 'Out on the track',
            'field_outer_way_end': 'Came from the stretch',
            'field_position': 'Pos. no.',
            'field_note': 'Note',
            'field_create': 'String created',
            'field_close': 'The line is closed',
            'field_parent_id': 'Previous row',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_wim_wagons': 'Loading the list of wagon deployment history ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'wim_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center',
            width: "20px"
        },
        {
            field: 'wim_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wim_station',
            data: function (row, type, val, meta) {
                var station = row.Directory_Station ? row.Directory_Station : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wim_park_way',
            data: function (row, type, val, meta) {
                var way = row.Directory_Ways ? row.Directory_Ways : null;
                var park = way ? way.Directory_ParkWays : null;
                return park ? (park['park_name_' + App.Lang]) : null;
            },
            className: 'dt-body-center',
            title: langView('field_park_way', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'wim_way',
            data: function (row, type, val, meta) {
                var way = row.Directory_Ways ? row.Directory_Ways : null;
                return way ? (way['way_num_' + App.Lang] + ' - ' + way['way_name_' + App.Lang]) : null;
            },
            className: 'dt-body-center',
            title: langView('field_way', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'wim_way_start',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.way_start);
            },
            className: 'dt-body-center',
            title: langView('field_way_start', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wim_way_end',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.way_end);
            },
            className: 'dt-body-center',
            title: langView('field_way_end', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wim_outer_way',
            data: function (row, type, val, meta) {
                var way = row.Directory_OuterWays ? row.Directory_OuterWays : null;
                return way ? (way['name_outer_way_' + App.Lang]) : null;
            },
            className: 'dt-body-center',
            title: langView('field_outer_way', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'wim_outer_way_start',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.outer_way_start);
            },
            className: 'dt-body-center',
            title: langView('field_outer_way_start', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wim_outer_way_end',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.outer_way_end);
            },
            className: 'dt-body-center',
            title: langView('field_outer_way_end', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wim_position',
            data: function (row, type, val, meta) {
                return row.position;
            },
            className: 'dt-body-center',
            title: langView('field_position', App.Langs), width: "30px", orderable: false, searchable: false
        },
        {
            field: 'wim_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-center',
            title: langView('field_note', App.Langs), width: "30px", orderable: false, searchable: false
        },
        {
            field: 'wim_create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + getReplaceTOfDT(row.create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wim_close',
            data: function (row, type, val, meta) {
                return row.close ? (row.close_user + '<br />[' + getReplaceTOfDT(row.close) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_close', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wim_parent_id',
            data: function (row, type, val, meta) {
                return row.parent_id;
            },
            className: 'dt-body-left',
            title: langView('field_parent_id', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //
    ];

    //===========================================================================
    //-----------------------------------------------------------------------
    // таблица истрия внутренего передвижения вагона
    //-----------------------------------------------------------------------
    // Конструктор модуля таблицы внутреней дислокации вагона
    function table_wim(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_wim = $(selector);
        if (this.$t_wim.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    // инициализация полей таблицы вагоны на начальном пути
    table_wim.prototype.init_columns = function () {
        var collums = [];
        //if (this.b_detali_wir) collums.push('arr_car_details_control');
        collums.push('wim_button_view');
        collums.push('wim_id');
        collums.push('wim_position');
        collums.push('wim_station');
        collums.push('wim_park_way');
        collums.push('wim_way');
        collums.push('wim_way_start');
        collums.push('wim_way_end');
        collums.push('wim_outer_way');
        collums.push('wim_outer_way_start');
        collums.push('wim_outer_way_end');
        collums.push('wim_note');
        collums.push('wim_create');
        collums.push('wim_close');
        collums.push('wim_parent_id');
        return init_columns(collums, list_collums);
    };
    //
    table_wim.prototype.init = function () {
        this.obj_wim = this.$t_wim.DataTable({
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
                if (data.close === null) {
                    $(row).addClass('yellow');
                } else {
                    if (data.way_start !== null && data.way_end === null) {
                        $(row).addClass('red');
                    }
                    if (data.way_start !== null && data.way_end !== null && data.outer_way_start !== null && data.outer_way_end === null) {
                        $(row).addClass('red');
                    }
                    $(row).addClass('green');
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
    table_wim.prototype.view = function (data) {
        this.obj_wim.clear();
        this.obj_wim.rows.add(data);
        this.obj_wim.order([1, 'desc']);
        this.obj_wim.draw();
    };
    // загрузить данные по id
    table_wim.prototype.load_of_id = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wim_wagons', App.Langs));
            ids_rwt.getWagonInternalMovementOfID(id, function (list_wim_wagon) {
                this.view($(list_wim_wagon));
                LockScreenOff();
            }.bind(this));
        };
    };
    // загрузить данные по id
    table_wim.prototype.load_of_id_wir = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wim_wagons', App.Langs));
            ids_rwt.getWagonInternalMovementOfWIRID(id, function (list_wim_wagon) {
                this.view(list_wim_wagon);
                LockScreenOff();
            }.bind(this));
        };
    };
    //
    App.table_wim = table_wim;

    window.App = App;
})(window);