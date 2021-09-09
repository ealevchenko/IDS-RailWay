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
            'field_position': '№ поз.',
            'field_wagon_adm': 'Код. Адм.',
            'field_wagon_adm_name': 'Администрация',
            'field_operation_condition_name': 'Разметка текущая',
            'field_operation_condition_abbr': 'Разм. тек.',
            'field_arrival_condition_name': 'Разметка по прибытию',
            'field_arrival_condition_abbr': 'Разм. по приб.',
            'field_wagon_rod': 'Род',
            'field_wagon_rod_abbr': 'Род ваг.',
            'field_wagon_operators_name': 'Оператор.',
            'field_wagon_operators_abbr': 'Оператор абр.',
            'field_wagon_limiting_name': 'Онраничение.',
            'field_wagon_limiting_abbr': 'Ограничение абр.',
            'field_arrival_cargo_name': 'Груз по прибытию',
            'field_operation_loading_status': 'Состояние погрузки',
            'field_create': 'Строку создал(а)',
            'field_close': 'Строку закрыл(а)',

            'mess_init_module': 'Инициализация модуля…',
            'mess_view_wagons': 'загрузка информации о вагонах…',

        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_num': 'Wagon number',
            'field_position': 'Pos. no.',
            'field_wagon_adm': 'Code. Adm. ',
            'field_wagon_adm_name': 'Administration',
            'field_operation_condition_name': 'Current markup',
            'field_operation_condition_abbr': 'Size. tech. ',
            'field_arrival_condition_name': 'Arrival layout',
            'field_arrival_condition_abbr': 'Resize by arr. ',
            'field_wagon_rod': 'Rod',
            'field_wagon_rod_abbr': 'Wagon rod.',
            'field_wagon_operators_name': 'Operator.',
            'field_wagon_operators_abbr': 'Operator abbr.',
            'field_wagon_limiting_name': 'Limiting.',
            'field_wagon_limiting_abbr': 'Limiting abbr.',
            'field_arrival_cargo_name': 'Cargo upon arrival',
            'field_operation_loading_status': 'Loading status',
            'field_create': 'Created string',
            'field_close': 'Closed string',

            'mess_init_module': 'Initializing a module ...',
            'mess_view_wagons': 'loading wagons information ...',

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    // Перечень полей
    var list_collums = [

        {
            field: 'id_wim',
            data: function (row, type, val, meta) {
                return row.id_wim;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'position',
            data: function (row, type, val, meta) {
                return row.wim_position;
            },
            className: 'dt-body-center',
            title: langView('field_position', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_adm',
            data: function (row, type, val, meta) {
                return row.wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('field_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_adm_name',
            data: function (row, type, val, meta) {
                return row['wagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_wagon_adm_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_condition_name_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_arrival_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_arrival_condition_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'operation_condition_name',
            data: function (row, type, val, meta) {
                return row['operation_condition_name_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_operation_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operation_condition_abbr',
            data: function (row, type, val, meta) {
                return row['operation_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_operation_condition_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_rod',
            data: function (row, type, val, meta) {
                return row.wagon_rod;
            },
            className: 'dt-body-center',
            title: langView('field_wagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_wagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_operators_name',
            data: function (row, type, val, meta) {
                return row['wagon_operators_name_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_wagon_operators_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'wagon_operators_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_operators_abbr_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_wagon_operators_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_limiting_name',
            data: function (row, type, val, meta) {
                return row['wagon_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_wagon_limiting_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'wagon_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_wagon_limiting_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_arrival_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'operation_loading_status',
            data: function (row, type, val, meta) {
                return row['operation_loading_status_' + App.Lang];
            },
            className: 'dt-body-left',
            title: langView('field_operation_loading_status', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'create',
            data: function (row, type, val, meta) {
                return row.wir_create ? (row.wir_create_user + '<br />[' + getReplaceTOfDT(row.wir_create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'close',
            data: function (row, type, val, meta) {
                return row.wim_close ? (row.wim_close_user + '<br />[' + getReplaceTOfDT(row.wim_close) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_close', App.Langs), width: "100px", orderable: false, searchable: false
        },
    ];
    //
    function table_cars_way(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$cars_way = $(selector);
        if (this.$cars_way.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$cars_way.attr('id');
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_cars_way.prototype.init_columns = function () {
        var collums = [];

        //collums.push('id_wim');
        collums.push('num');
        collums.push('position');
        collums.push('wagon_adm');
        collums.push('wagon_adm_name');
        collums.push('operation_condition_name');
        collums.push('operation_condition_abbr');
        collums.push('arrival_condition_name');
        collums.push('arrival_condition_abbr');
        collums.push('wagon_rod');
        collums.push('wagon_rod_abbr');
        collums.push('wagon_operators_name');
        collums.push('wagon_operators_abbr');
        collums.push('wagon_limiting_name');
        collums.push('wagon_limiting_abbr');
        collums.push('arrival_cargo_name');
        collums.push('operation_loading_status');
        collums.push('create');
        collums.push('close');
        return init_columns(collums, list_collums);
    };
    // инициализация таблицы справочника путей
    table_cars_way.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
        }, options);
        //
        this.select_cars_operation = null;

        LockScreen(langView('mess_init_module', App.Langs));
        // Вклучу когда понадобится 
        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();

        // Загрузим справочные данные, определим поля формы правки
        /*        this.load_db([], false, function (result) {*/

        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_cars = new this.fc_ui.el_table('tab-cars-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_cars = table_cars.$element;
        this.$cars_way.addClass('table-report-operation').append(this.$table_cars);
        // Инициализируем таблицу
        this.obj_t_cars = this.$table_cars.DataTable({
            "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            select: {
                style: 'multi'
            },
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
                $(row).attr('id', data.id_wim); // id строки дислокации вагона
                //// Удалили
                //if (data.way_close) {
                //    $(row).addClass('yellow');
                //}
                //if (data.way_delete) {
                //    $(row).addClass('red');
                //}
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
        }).on('select deselect', function (e, dt, type, indexes) {
            var selected = this.obj_t_cars.rows({ selected: true })[0].length > 0 ? true : false;
            var row = this.obj_t_cars.rows(indexes).data().toArray()[0];
            if (selected) {
                //this.obj_t_cars.button(2).enable(true);
                //this.obj_t_cars.button(3).enable(!(row && row.way_delete));
                //this.obj_t_cars.button(4).enable(!(row && row.way_delete));
                //this.obj_t_cars.button(5).enable(!(row && row.way_delete));
                this.select_cars_operation = row;
            } else {
                //this.obj_t_cars.button(2).enable(false);
                //this.obj_t_cars.button(3).enable(false);
                //this.obj_t_cars.button(4).enable(false);
                //this.obj_t_cars.button(5).enable(false);
                this.select_cars_operation = null;
            }
        }.bind(this));
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok();
        }
        //----------------------------------
        /*        }.bind(this));*/
    };
    // Показать данные 
    table_cars_way.prototype.view = function (data) {
        LockScreen(langView('mess_view_wagons', App.Langs));
        this.obj_t_cars.clear();
        this.obj_t_cars.rows.add(data);
        this.obj_t_cars.order([1, 'asc']);
        if (this.select_cars_operation !== null) {
            this.obj_t_cars.row('#' + this.select_cars_operation.id).select();
        }
        this.obj_t_cars.draw();
        LockScreenOff();
    };
    // Обновить данные
    table_cars_way.prototype.update = function () {

    };
    // Очистить сообщения
    table_cars_way.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_cars_way.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_cars_way.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_cars_way.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_cars_way.prototype.destroy = function () {
        // Вклучу когда понадобится 
        //this.modal_confirm_form.destroy();
        if (this.obj_t_cars) {
            this.obj_t_cars.destroy(true);
            this.obj_t_cars = null;
        }

        this.$cars_way.empty(); // empty in case the columns change
    }

    App.table_cars_way = table_cars_way;

    window.App = App;
})(window);