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
            'togdr_field_id': 'id',
            'togdr_field_num': '№ Вагона',
            'togdr_field_return_cause': 'Причина возврата',
            'togdr_field_date_start': 'Вернули',
            'togdr_field_date_stop': 'Закрыли возврат',
            'togdr_field_num_act': 'Номер акта',
            'togdr_field_date_act': 'Дата акта',

            'togdr_title_button_export': 'Экспорт',
            'togdr_title_button_buffer': 'Буфер',
            'togdr_title_button_excel': 'Excel',

            'togdr_title_excel_sheet_name': 'Список вагонов',
            'togdr_title_button_field': 'Поля',
            'togdr_title_button_field_select': 'Выбрать',
            'togdr_title_button_field_view_all': 'Показать все',
            'togdr_title_button_field_clear': 'Сбросить',


            'togdr_mess_init_module': 'Инициализация модуля(table_outgoing_detention_return)...',
            'togdr_mess_view_wagons': 'Отображаю вагоны...',
        },
        'en':  //default language: English
        {
            'togdr_field_id': 'id',
            'togdr_field_num': 'Wagon#',
            'togdr_field_return_cause': 'Return Reason',
            'togdr_field_date_start': 'Returned',
            'togdr_field_date_stop': 'Stopped return',
            'togdr_field_num_act': 'Act number',
            'togdr_field_date_act': 'Act Date',

            'togdr_title_button_export': 'Export',
            'togdr_title_button_buffer': 'Buffer',
            'togdr_title_button_excel': 'Excel',

            'togdr_title_excel_sheet_name': 'Wagon List',
            'togdr_title_button_field': 'Fields',
            'togdr_title_button_field_select': 'Select',
            'togdr_title_button_field_view_all': 'Show All',
            'togdr_title_button_field_clear': 'Reset',


            'togdr_mess_init_module': 'Module initialization(table_outgoing_detention_return)...',
            'togdr_mess_view_wagons': 'Displaying wagons...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var wsd = App.ids_wsd;
    var directory = App.ids_directory;

    // Перечень полей
    var list_collums = [
        //{
        //    field: 'details_control',
        //    className: 'details-control  details-control-wagons-sostav',
        //    orderable: false,
        //    data: null,
        //    defaultContent: '',
        //    width: "30px",
        //    searchable: false
        //},
        {
            field: 'id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('togdr_field_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('togdr_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'return_cause',
            data: function (row, type, val, meta) {
                var cause_return = row.Directory_DetentionReturn;
                return cause_return ? cause_return['cause_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('togdr_field_return_cause', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'date_start',
            data: function (row, type, val, meta) {
                return row.date_start ? moment(row.date_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('togdr_field_date_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'date_stop',
            data: function (row, type, val, meta) {
                return row.date_stop ? moment(row.date_stop).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('togdr_field_date_stop', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'num_act',
            data: function (row, type, val, meta) {
                return row.num_act;
            },
            className: 'dt-body-center operator',
            title: langView('togdr_field_num_act', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'date_act',
            data: function (row, type, val, meta) {
                return row.date_act ? moment(row.date_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('togdr_field_date_act', App.Langs), width: "100px", orderable: true, searchable: true
        },

    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('togdr_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('togdr_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('togdr_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('togdr_title_excel_sheet_name', App.Langs),
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
            text: langView('togdr_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('togdr_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('togdr_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('togdr_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        //{
        //    button: 'hand_over_sostav',
        //    text: langView('togc_title_button_hand_over_sostav', App.Langs),
        //    enabled: true
        //},
        //{
        //    button: 'refresh',
        //    text: '<i class="fas fa-retweet"></i>',
        //},
        {
            button: 'page_length',
            extend: 'pageLength',
        }
    ];
    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function table_outgoing_detention_return(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$cars_dr = $(selector);
        if (this.$cars_dr.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fe_ui = new FE();
        this.selector = this.$cars_dr.attr('id');
    }

    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    table_outgoing_detention_return.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };

    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_outgoing_detention_return.prototype.init_columns_detali = function () {
        var collums = [];
        //collums.push('id');
        return init_columns(collums, list_collums);
    };
    // инициализация полей outgoing_sostav
    table_outgoing_detention_return.prototype.init_columns_return_cars = function () {
        var collums = [];
        //collums.push({ field: 'id', title: null, class: null });
        //collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'return_cause', title: null, class: null });
        collums.push({ field: 'date_start', title: null, class: null });
        collums.push({ field: 'date_stop', title: null, class: null });
        collums.push({ field: 'num_act', title: null, class: null });
        collums.push({ field: 'date_act', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_outgoing_detention_return.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок outgoing_sostav
    table_outgoing_detention_return.prototype.init_button_return_cars = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        //buttons.push({
        //    name: 'hand_over_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_over_sostav_sostav(); // выполнить операцию
        //    }.bind(this)
        //});
        //buttons.push({
        //    name: 'refresh',
        //    action: function (e, dt, node, config) {
        //        this.action_refresh();
        //    }.bind(this)
        //});
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //-----------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_outgoing_detention_return.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'return_cars': {
                this.searching = false; 
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [1, 'desc'];
                this.type_select_rows = null; // Выбирать одну
                this.table_select = false;
                this.table_columns = this.init_columns_return_cars();
                this.table_buttons = [];
                break;
            };
            // Таблица составы по умолчанию (если не выставят тип отчета)
            default: {
                this.searching = true;
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
    table_outgoing_detention_return.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('togdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: null,     // 
            link_num: false,
            ids_dir: null,
            ids_wsd: null,
            fn_select_rows: null,
            fn_init: null,
        }, options);
        //
        this.id_row = null;                 // id строки
        this.wagons = [];                   // Список составов
        this.select_rows_wagons = null;     // Выбранный состав

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();

        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();

        // Настройки отчета
        this.searching = true;            // вкл. фикс. заголовка
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        this.load_db(['detention_return'], false, function (result) {
            //----------------------------------
            // Создать макет таблицы
            // Создадим и добавим макет таблицы
            var table_cars = new this.fe_ui.table({
                id: 'tab-ogdr-' + this.selector,
                class: 'display compact cell-border row-border hover',
                title: null,
            });
            this.$table_cars = table_cars.$table;
            this.$cars_dr.addClass('table-report-operation').append(this.$table_cars);
            // Инициализируем таблицу
            this.obj_t_cars = this.$table_cars.DataTable({
                "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('togc_title_all', App.Langs)]],
                "pageLength": -1,
                "deferRender": true,
                "paging": true,
                "searching": this.searching,
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
                //"scrollY": "600px",
                sScrollX: "100%",
                scrollX: true,
                //"responsive": true,
                //"bAutoWidth": false,
                language: language_table(App.Langs),
                jQueryUI: false,
                "createdRow": function (row, data, index) {
                    $(row).attr('id', data.id); // id строки

                }.bind(this),
                columns: this.table_columns,
                dom: 'Bfrtip',
                stateSave: false,
                buttons: this.table_buttons,
            });
            // Обработка события выбора
            switch (this.settings.type_report) {
                case 'return_cars': {
                    this.obj_t_cars.on('select deselect', function (e, dt, type, indexes) {
                        this.select_rows(); // определим строку
                        this.enable_button();
                        // Обработать событие выбрана строка
                        if (typeof this.settings.fn_select_rows === 'function') {
                            this.settings.fn_select_rows(this.select_rows_wagons);
                        }
                    }.bind(this));

                    break;
                };
            };
            // Определим показывать вагоны детально
            /*        if (this.settings.detali_wagons) this.init_detali();*/
            //----------------------------------
            if (typeof this.settings.fn_init === 'function') {
                this.settings.fn_init(this.result_init);
            }
            //----------------------------------
        }.bind(this));


    };

    // обновим информацию об выбраных строках
    table_outgoing_detention_return.prototype.select_rows = function () {
        var index = this.obj_t_cars.rows({ selected: true });
        var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.select_rows_wagons = rows;

        //this.id_sostav = this.select_rows_wagons && this.select_rows_wagons.length > 0 ? this.select_rows_wagons[0].id : null;
    };
    // Показать данные
    table_outgoing_detention_return.prototype.view = function (data, id) {
        this.id_row = id;
        this.out_clear();
        LockScreen(langView('togdr_mess_view_wagons', App.Langs));
        this.obj_t_cars.clear();

        this.obj_t_cars.rows.add(data);
        this.obj_t_cars.order(this.order_column);
        //this.obj_t_cars.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
        this.obj_t_cars.draw();
        if (id !== null) {
            this.id_row = id
            this.obj_t_cars.row('#' + this.id).select();
        } else {
            this.id_row = null;
        }
        this.select_rows();
        this.enable_button();
        //LockScreenOff();
    };

    // Отображение кнопки добавить
    table_outgoing_detention_return.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'outgoing_sostav': {
            //    if (this.select_rows_wagons && this.select_rows_wagons.length > 0) {
            //        this.obj_t_cars.button(4).enable(true);
            //        if (this.select_rows_wagons[0].status < 1) {
            //            this.obj_t_cars.button(2).enable(true);
            //            this.obj_t_cars.button(3).enable(false); // отмена сдачи состава
            //            this.obj_t_cars.button(4).text(langView('togc_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_cars.button(2).enable(false);
            //            if (this.select_rows_wagons[0].status === 2) { this.obj_t_cars.button(3).enable(true); } else { this.obj_t_cars.button(3).enable(false); }
            //            this.obj_t_cars.button(4).text(langView('togc_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_cars.button(2).enable(false);
            //        this.obj_t_cars.button(3).enable(false);
            //        this.obj_t_cars.button(4).enable(false);
            //    }
            //    break;
            //};
        };
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_outgoing_detention_return.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_outgoing_detention_return.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_outgoing_detention_return.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_outgoing_detention_return.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_outgoing_detention_return.prototype.destroy = function () {
        // Вкл. когда понадобится 
        if (this.modal_confirm_form) this.modal_confirm_form.destroy();
        //this.destroy_all_detali(); // Удалить все таблицы детально, если созданы
        if (this.obj_t_cars) {
            this.obj_t_cars.destroy(true);
            this.obj_t_cars = null;
        }

        this.$table_cars.empty(); // empty in case the columns change
    }

    App.table_outgoing_detention_return = table_outgoing_detention_return;

    window.App = App;
})(window);