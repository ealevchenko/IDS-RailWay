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
            'field_operations': 'Операция',
            'field_operation_start': 'Начало операции',
            'field_operation_end': 'Окончание операции',
            'field_condition': 'Разметка',
            'field_loading_status': 'Сотояние загрузки',
            'field_locomotive1': 'Сотояние загрузки',
            'field_locomotive2': 'Сотояние загрузки',
            'field_note': 'Примечание',
            'field_create': 'Строка создана',
            'field_close': 'Строка закрыта',
            'field_parent_id': 'Предыдущая строка',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_wio_wagons': 'Загружаю список истории операций вагона...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_operations': 'Operation',
            'field_operation_start': 'Operation start',
            'field_operation_end': 'End of operation',
            'field_condition': 'Markup',
            'field_loading_status': 'Loading status',
            'field_locomotive1': 'Loading status',
            'field_locomotive2': 'Loading status',
            'field_note': 'Note',
            'field_create': 'String created',
            'field_close': 'The line is closed',
            'field_parent_id': 'Previous row',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_wio_wagons': 'Loading the list of wagon operations history ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'wio_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center',
            width: "20px"
        },
        {
            field: 'wio_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wio_operations',
            data: function (row, type, val, meta) {
                var operations = row.Directory_WagonOperations ? row.Directory_WagonOperations : null;
                return operations ? operations['operation_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_operations', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wio_operation_start',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.operation_start);
            },
            className: 'dt-body-center',
            title: langView('field_operation_start', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wio_operation_end',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.operation_end);
            },
            className: 'dt-body-center',
            title: langView('field_operation_end', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wio_condition',
            data: function (row, type, val, meta) {
                var condition = row.Directory_ConditionArrival ? row.Directory_ConditionArrival : null;
                return condition ? condition['condition_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_condition', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wio_loading_status',
            data: function (row, type, val, meta) {
                var loading_status = row.Directory_WagonLoadingStatus ? row.Directory_WagonLoadingStatus : null;
                return loading_status ? loading_status['loading_status_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_loading_status', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'wio_locomotive1',
            data: function (row, type, val, meta) {
                return row.locomotive1;
            },
            className: 'dt-body-center',
            title: langView('field_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wio_locomotive2',
            data: function (row, type, val, meta) {
                return row.locomotive1;
            },
            className: 'dt-body-center',
            title: langView('field_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wio_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-center',
            title: langView('field_note', App.Langs), width: "30px", orderable: false, searchable: false
        },
        {
            field: 'wio_create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + getReplaceTOfDT(row.create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wio_close',
            data: function (row, type, val, meta) {
                return row.close ? (row.close_user + '<br />[' + getReplaceTOfDT(row.close) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_close', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wio_parent_id',
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
    function table_wio(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_wio = $(selector);
        if (this.$t_wio.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    // инициализация полей таблицы вагоны на начальном пути
    table_wio.prototype.init_columns = function () {
        var collums = [];
        //if (this.b_detali_wir) collums.push('arr_car_details_control');
        collums.push('wio_button_view');
        collums.push('wio_id');
        collums.push('wio_operations');
        collums.push('wio_operation_start');
        collums.push('wio_operation_end');
        collums.push('wio_condition');
        collums.push('wio_loading_status');
        collums.push('wio_locomotive1');
        collums.push('wio_locomotive2');
        collums.push('wio_note');
        collums.push('wio_create');
        collums.push('wio_close');
        collums.push('wio_parent_id');
        return init_columns(collums, list_collums);
    };
    //
    table_wio.prototype.init = function () {
        this.obj_wio = this.$t_wio.DataTable({
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
    table_wio.prototype.view = function (data) {
        this.obj_wio.clear();
        this.obj_wio.rows.add(data);
        this.obj_wio.order([1, 'desc']);
        this.obj_wio.draw();
    };
    // загрузить данные по id
    table_wio.prototype.load_of_id = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wio_wagons', App.Langs));
            ids_rwt.getWagonInternalOperationOfID(id, function (list_wio_wagon) {
                this.view($(list_wio_wagon));
                LockScreenOff();
            }.bind(this));
        };
    };
    // загрузить данные по id
    table_wio.prototype.load_of_id_wir = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wio_wagons', App.Langs));
            ids_rwt.getWagonInternalOperationOfWIRID(id, function (list_wio_wagon) {
                this.view(list_wio_wagon);
                LockScreenOff();
            }.bind(this));
        };
    };
    //
    App.table_wio = table_wio;

    window.App = App;
})(window);