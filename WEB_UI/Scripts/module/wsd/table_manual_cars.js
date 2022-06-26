/*Модуль Отображения информации по ЭПД*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'tmc_field_searsh_num': '№ вагона',
            'tmc_field_searsh_position': 'позиция',
            'tmc_field_searsh_type_update': 'Статус',
            'tmc_field_new_uz_doc': '№ Накладной (найденый)',
            'tmc_field_new_id_doc': 'id док УЗ (найденый)',
            'tmc_field_arrival_id_doc': 'id док УЗ (существующий)',
            'tmc_field_sostav_arrival': 'Состав прибыл',
            'tmc_field_composition_index': 'Индекс',
            'tmc_field_train': 'Поезд',
            'tmc_field_sostav_status': 'Статус состава',
            'tmc_field_car_arrival': 'Вагон принят',
            'tmc_field_wir_status': 'Вагон на АМКР',
            'tmc_field_select_num': '№ вагона',
            'tmc_mess_init_module': 'Инициализация модуля(table_manual_cars)...',
            'tmc_title_all': 'Все',
            'tmc_title_type_update_0': 'Добавить вагон.',
            'tmc_title_type_update_1': 'Только обновить ЭПД.',
            'tmc_title_type_update_2': 'Перенести вагон из прибывшего состава.',
            'tmc_title_type_update_3': 'Перенести? (состав в работе, но вагон не принят!)',
            'tmc_title_type_update_4': 'Запрет! (Состав в работе вагон принят)',
            'tmc_title_type_update_5': 'Запрет! (Состав принят)',
            'tmc_title_type_update_6': 'Запрет! (Вагон на АМКР)',
            'tmc_title_type_update_7': 'Запрет! (Вагон уже находится в составе)',
            'tmc_title_ststus_0': 'Не принят',
            'tmc_title_ststus_1': 'В работе',
            'tmc_title_ststus_2': 'Принят',
            'tmc_title_ststus_3': 'Отклонен',
            'tmc_title_way': 'Стоит на станции: {0} на пути: {1}',
            'tmc_title_out_way': 'Стоит на перегоне :{0}',
            'tmc_title_button_export': 'Экспорт',
            'tmc_title_button_buffer': 'Буфер',
            'tmc_title_button_excel': 'Excel',
            'tmc_title_excel_sheet_name': 'Вагоны',
            'tmc_title_button_field': 'Поля',
            'tmc_title_button_field_select': 'Выбрать',
            'tmc_title_button_field_view_all': 'Показать все',
            'tmc_title_button_field_clear': 'Сбросить',
            'tmc_title_button_select_all': 'Выбрать все',
            'tmc_title_button_select_none': 'Убрать все',
        },
        'en':  //default language: English
        {
            'tmc_field_searsh_num': 'car number',
            'tmc_field_searsh_position': 'position',
            'tmc_field_searsh_type_update': 'Status',
            'tmc_field_new_uz_doc': 'Invoice # (found)',
            'tmc_field_new_id_doc': 'id doc doc (found)',
            'tmc_field_arrival_id_doc': 'id doc doc (existing)',
            'tmc_field_sostav_arrival': 'Composition Arrived',
            'tmc_field_composition_index': 'Index',
            'tmc_field_train': 'Train',
            'tmc_field_sostav_status': 'Squad Status',
            'tmc_field_car_arrival': 'Car received',
            'tmc_field_wir_status': 'Wagon on AMKR',
            'tmc_field_select_num': 'car number',
            'tmc_mess_init_module': 'Module initialization(table_manual_cars)...',
            'tmc_title_all': 'All',
            'tmc_title_type_update_0': 'Add a wagon.',
            'tmc_title_type_update_1': 'Update EPD only.',
            'tmc_title_type_update_2': 'Move wagon from incoming train.',
            'tmc_title_type_update_3': 'Reschedule? (the train is in operation, but the carriage has not been accepted!)',
            'tmc_title_type_update_4': 'Ban! (The composition in the work of the car is accepted)',
            'tmc_title_type_update_5': 'Ban! (Composition adopted)',
            'tmc_title_type_update_6': 'Ban! (Wagon on AMKR)',
            'tmc_title_type_update_7': 'Ban! (The car is already in the train)',
            'tmc_title_ststus_0': 'Not Accepted',
            'tmc_title_ststus_1': 'In Progress',
            'tmc_title_ststus_2': 'Accepted',
            'tmc_title_ststus_3': 'Rejected',
            'tmc_title_way': 'Standing at Station: {0} on Way: {1}',
            'tmc_title_out_way': 'Standing on track :{0}',
            'tmc_title_button_export': 'Export',
            'tmc_title_button_buffer': 'Buffer',
            'tmc_title_button_excel': 'Excel',
            'tmc_title_excel_sheet_name': 'Wagons',
            'tmc_title_button_field': 'Fields',
            'tmc_title_button_field_select': 'Select',
            'tmc_title_button_field_view_all': 'Show All',
            'tmc_title_button_field_clear': 'Reset',
            'tmc_title_button_select_all': 'Select All',
            'tmc_title_button_select_none': 'Remove All',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    var get_type_update = function (type_update) {
        switch (type_update) {
            case 0: return langView('tmc_title_type_update_0', App.Langs);
            case 1: return langView('tmc_title_type_update_1', App.Langs);
            case 2: return langView('tmc_title_type_update_2', App.Langs);
            case 3: return langView('tmc_title_type_update_3', App.Langs);
            case 4: return langView('tmc_title_type_update_4', App.Langs);
            case 5: return langView('tmc_title_type_update_5', App.Langs);
            case 6: return langView('tmc_title_type_update_6', App.Langs);
        }
    };
    var get_status = function (status) {
        switch (status) {
            case 0: return langView('tmc_title_ststus_0', App.Langs);
            case 1: return langView('tmc_title_ststus_1', App.Langs);
            case 2: return langView('tmc_title_ststus_2', App.Langs);
            case 3: return langView('tmc_title_ststus_3', App.Langs);
        }
    };
    // Перечень полей
    var list_collums = [
        {
            field: 'details_control',
            className: 'details-control  details-control-wagons-sostav',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        // Поля по документам
        {
            field: 'searsh_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_searsh_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'searsh_position',
            data: function (row, type, val, meta) {
                return row.position;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_searsh_position', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'searsh_type_update',
            data: function (row, type, val, meta) {
                return get_type_update(row.type_update);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tmc_field_searsh_type_update', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'searsh_new_uz_doc',
            data: function (row, type, val, meta) {
                return row.new_uz_doc !== null ? row.new_uz_doc.num_uz : null;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_new_uz_doc', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'searsh_new_id_doc',
            data: function (row, type, val, meta) {
                return row.new_uz_doc !== null ? row.new_uz_doc.num_doc : null;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_new_id_doc', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'searsh_arrival_id_doc',
            data: function (row, type, val, meta) {
                return row.car !== null ? row.car.num_doc : null;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_arrival_id_doc', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'searsh_sostav_arrival',
            data: function (row, type, val, meta) {
                return row.car !== null ? row.car.ArrivalSostav.date_arrival : null;
            },
            className: 'dt-body-center shorten mw-150',
            title: langView('tmc_field_sostav_arrival', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'searsh_composition_index',
            data: function (row, type, val, meta) {
                return row.car !== null ? row.car.ArrivalSostav.composition_index : null;
            },
            className: 'dt-body-center shorten mw-150',
            title: langView('tmc_field_composition_index', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'searsh_train',
            data: function (row, type, val, meta) {
                return row.car !== null ? row.car.ArrivalSostav.train : null;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_train', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'searsh_sostav_status',
            data: function (row, type, val, meta) {
                return row.car !== null ? get_status(row.car.ArrivalSostav.status) : null;
            },
            className: 'dt-body-center shorten mw-100',
            title: langView('tmc_field_sostav_status', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'searsh_wir_status',
            data: function (row, type, val, meta) {
                var wir_status = null;
                if (row.wir !== null) {
                    var wim = row.wir.WagonInternalMovement.find(function (o) {
                        return o.close == null;
                    })
                    if (wim !== null) {
                        var station = wim.Directory_Station != null ? wim.Directory_Station['station_name_' + App.Lang] : null;
                        var way = wim.Directory_Ways != null ? wim.Directory_Ways['way_num_' + App.Lang] : null;
                        var out_way = wim.Directory_OuterWays != null ? wim.Directory_OuterWays['name_outer_way_' + App.Lang] : null;
                        if (out_way === null) {
                            wir_status = langView('tmc_title_way', App.Langs).format(station, way);
                        } else {
                            wir_status = langView('tmc_title_out_way', App.Langs).format(out_way);
                        }
                    }
                }
                return wir_status;
            },
            className: 'dt-body-center shorten mw-300',
            title: langView('tmc_field_wir_status', App.Langs), width: "300px", orderable: true, searchable: true
        },
        //
        // Поля по документам
        {
            field: 'select_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('tmc_field_select_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tmc_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tmc_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tmc_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('tmc_title_excel_sheet_name', App.Langs),
                    messageTop: function () {
                        return '';
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'field',
            extend: 'collection',
            text: langView('tmc_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tmc_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tmc_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tmc_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'select_all',
            text: langView('tmc_title_button_select_all', App.Langs),
        },
        {
            button: 'select_none',
            text: langView('tmc_title_button_select_none', App.Langs),
        },
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        }
    ];
    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function table_manual_cars(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$div_out = $(selector);
        if (this.$div_out.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$div_out.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_manual_cars.prototype.init_columns_detali = function () {
        var collums = [];
        //collums.push('id');
        return init_columns(collums, list_collums);
    };
    // инициализация полей searsh_cars
    table_manual_cars.prototype.init_columns_searsh_cars = function () {
        var collums = [];
        collums.push({ field: 'searsh_num', title: null, class: 'fixed-column' });
        collums.push({ field: 'searsh_position', title: null, class: 'fixed-column' });
        collums.push({ field: 'searsh_type_update', title: null, class: null });
        collums.push({ field: 'searsh_new_uz_doc', title: null, class: null });
        collums.push({ field: 'searsh_new_id_doc', title: null, class: null });
        collums.push({ field: 'searsh_arrival_id_doc', title: null, class: null });
        collums.push({ field: 'searsh_sostav_arrival', title: null, class: null });
        collums.push({ field: 'searsh_composition_index', title: null, class: null });
        collums.push({ field: 'searsh_train', title: null, class: null });
        collums.push({ field: 'searsh_sostav_status', title: null, class: null });
        collums.push({ field: 'searsh_wir_status', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей nums_cars
    table_manual_cars.prototype.init_columns_nums_cars = function () {
        var collums = [];
        collums.push({ field: 'select_num', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_manual_cars.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок searsh_cars
    table_manual_cars.prototype.init_button_searsh_cars = function () {
        var buttons = [];
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                this.action_refresh();
            }.bind(this)
        });
        buttons.push({
            name: 'select_all',
            action: function (e, dt, node, config) {
                this.action_select_all();
            }.bind(this)
        });
        buttons.push({
            name: 'select_none',
            action: function (e, dt, node, config) {
                this.action_select_none();
            }.bind(this)
        });

        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок nums_cars
    table_manual_cars.prototype.init_button_nums_cars = function () {
        var buttons = [];
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({
            name: 'select_all',
            action: function (e, dt, node, config) {
                this.action_select_all(true);
            }.bind(this)
        });
        buttons.push({
            name: 'select_none',
            action: function (e, dt, node, config) {
                this.action_select_none();
            }.bind(this)
        });

        return init_buttons(buttons, list_buttons);
    };

    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_manual_cars.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'table-searsh-cars': {
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 2;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = {
                    style: 'multi'
                };
                this.table_columns = this.init_columns_searsh_cars();
                this.table_buttons = this.init_button_searsh_cars();
                break;
            };
            // Таблица составы по умолчанию (если не выставят тип отчета)
            case 'table-nums-cars': {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = {
                    style: 'multi'
                };
                this.table_columns = this.init_columns_nums_cars();
                this.table_buttons = this.init_button_nums_cars();
                break;
            };
            // Таблица составы по умолчанию (если не выставят тип отчета)
            default: {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_detali();
                this.table_buttons = this.init_button_detali();
                break;
            };
        }
    };
    // Инициализация
    table_manual_cars.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('tmc_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: null,     // 
            div_class: 'table-manual-info',
            table_class: 'display compact cell-border row-border hover',
            //ids_wsd: null,
            fn_select_rows: null,
            fn_init: null,
            fn_refresh: null,
        }, options);
        //
        this.id_select = null           // выбранная строка
        this.searsh_cars = null;        // Информаия по вагону
        this.selected_rows = null;     // Выбранная строка

        //this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        // Запускаем 2 процесса инициализации (паралельно)
        var process = 0;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                var MCF = App.modal_confirm_form;
                this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
                this.modal_confirm_form.init();
                //----------------------------------
                // Создать макет таблицы
                // Создадим и добавим макет таблицы
                var table_manual = new this.fc_ui.el_table('tab-mn-' + this.selector, this.settings.table_class);
                this.$table_manual = table_manual.$element;
                this.$div_out.addClass(this.settings.div_class).append(this.$table_manual);
                // Инициализируем таблицу
                this.obj_t_manual = this.$table_manual.DataTable({
                    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tmc_title_all', App.Langs)]],
                    "pageLength": -1,
                    "deferRender": true,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    colReorder: true,                       // вкл. перетаскивание полей
                    fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
                    fixedColumns: {
                        leftColumns: this.leftColumns,
                    },
                    select: this.table_select,
                    "autoWidth": false,
                    //"filter": true,
                    "scrollY": "300px",
                    sScrollX: "100%",
                    scrollX: true,
                    //"responsive": true,
                    //"bAutoWidth": false,
                    language: language_table(App.Langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        switch (this.settings.type_report) {
                            case 'table-searsh-cars': {
                                $(row).attr('id', data.num);
                                if (data.type_update < 4) {
                                    $(row).addClass('green');
                                } else {
                                    if (data.type_update > 4) {
                                        $(row).addClass('red');
                                    } else {
                                        $(row).addClass('yellow');
                                    }
                                }
                                break;
                            };
                            case 'table-nums-cars': {
                                $(row).attr('id', data.num);
                                break;
                            };
                        };
                    }.bind(this),
                    columns: this.table_columns,
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: this.table_buttons,
                });
                // Обработка события выбора
                switch (this.settings.type_report) {
                    case 'table-searsh-cars': {
                        this.obj_t_manual.on('user-select', function (e, dt, type, cell, originalEvent) {
                            var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                            var row = this.obj_t_manual.rows(indexes).data().toArray();
                            if (row && row.length > 0 && row[0].type_update && row[0].type_update > 3) {
                                e.preventDefault();
                            }
                        }.bind(this)).on('select deselect', function (e, dt, type, indexes) {
                            this.select_rows(); // определим строку
                            this.enable_button();
                            // Обработать событие выбрана строка
                            if (typeof this.settings.fn_select_rows === 'function') {
                                this.settings.fn_select_rows(this.selected_rows);
                            }
                        }.bind(this));

                        break;
                    };
                    case 'table-nums-cars': {
                        this.obj_t_manual.on('select deselect', function (e, dt, type, indexes) {
                            this.select_rows(); // определим строку
                            this.enable_button();
                            // Обработать событие выбрана строка
                            if (typeof this.settings.fn_select_rows === 'function') {
                                this.settings.fn_select_rows(this.selected_rows);
                            }
                        }.bind(this));

                        break;
                    };
                };
                //----------------------------------
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init(this.result_init);
                }
                //----------------------------------

            }
        }.bind(this);
        out_init(process); // Временно!
    };
    //-------------------------------------------------------------------------------------------
    // обновим информацию об выбраных строках
    table_manual_cars.prototype.select_clear = function () {
        this.obj_t_manual.rows({ selected: true }).deselect();
        this.obj_t_manual.draw();
    };
    // обновим информацию об выбраных строках
    table_manual_cars.prototype.select_rows = function () {
        var index = this.obj_t_manual.rows({ selected: true });
        var rows = this.obj_t_manual.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
    };
    // Показать данные
    table_manual_cars.prototype.view = function (data, id_select) {
        if (this.obj_t_manual) {
            this.obj_t_manual.columns().visible(true);
            this.id_select = id_select;
            this.out_clear();
            this.obj_t_manual.clear();
            this.obj_t_manual.rows.add(data);
            this.obj_t_manual.order(this.order_column);
            //this.obj_t_manual.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
            this.obj_t_manual.draw();
            if (id_select !== null) {
                this.id_select = id_select
                this.obj_t_manual.row('#' + this.id_select).select();
            } else {
                this.id_select = null;
            }
            this.select_rows();
            this.enable_button();
        };
    };
    // Показать данные
    table_manual_cars.prototype.clear = function () {
        if (this.obj_t_manual) {
            this.obj_t_manual.clear();
            this.obj_t_manual.draw();
        };
    };
    table_manual_cars.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            case 'table-searsh-cars': {
                if (this.selected_rows && this.selected_rows.length > 0) {

                } else {

                }
                break;
            };
        };
    };
    //-------------------------------------------------------------------------------------------
    // Выполнить операцию обновить
    table_manual_cars.prototype.action_refresh = function () {
        //this.out_clear();
        //if (typeof this.settings.fn_refresh === 'function') {
        //    this.settings.fn_refresh();
        //} else {
        //    this.update(function (wagons) {
        //        this.view(wagons, this.id_station, this.otpr);
        //        LockScreenOff();
        //    }.bind(this));
        //}
    };
    //
    table_manual_cars.prototype.action_select_all = function (all) {
        if (all) {
            this.obj_t_manual.rows().select();
        } else {
            this.obj_t_manual.rows(':not(.red)').select();
        }

    };
    //
    table_manual_cars.prototype.action_select_none = function () {
        this.obj_t_manual.rows().deselect();
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_manual_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_manual_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_manual_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_manual_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_manual_cars.prototype.destroy = function () {
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        //// Уберем модуль Форма "Предъявить состав"
        //if (this.fhoogs) {
        //    this.fhoogs.destroy();
        //    this.fhoogs = null;
        //}
        // Очистить таблицы
        if (this.obj_t_manual) {
            this.obj_t_manual.destroy(true);
            this.obj_t_manual = null;
        }
        this.$div_out.empty(); // empty in case the columns change
    }

    App.table_manual_cars = table_manual_cars;

    window.App = App;
})(window);