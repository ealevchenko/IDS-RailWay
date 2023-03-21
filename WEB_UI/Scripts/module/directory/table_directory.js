/*Модуль библиотека таблицы справочников*/
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
            'tldir_field_numeration': '№ п.п.',

            'tldir_mess_init_module': 'Инициализация модуля (table_directory) ...',

            'tldir_mess_load_sostav': 'Загружаю состав ...',

            'tldir_mess_view_report': 'Показать отчет ...',

            'tldir_field_operators_wagons_abbr': 'Оператор аббр.',
            'tldir_field_operators_wagons_operators': 'Оператор полное название',

            'tldir_title_all': 'Все',
            'tldir_title_not_epd': 'Без ЭПД',
            'tldir_title_for_loading': 'Под погрузку',
            'tldir_title_route': 'маршрут',
            'tldir_title_not_route': 'не маршрут',
            'tldir_title_laden': 'груженный',
            'tldir_title_not_laden': 'порожний',

            'tldir_title_button_export': 'Экспорт',
            'tldir_title_button_buffer': 'Буфер',
            'tldir_title_button_excel': 'Excel',
            'tldir_title_excel_sheet_name': 'Отчет',
            'tldir_title_button_field': 'Поля',
            'tldir_title_button_field_select': 'Выбрать',
            'tldir_title_button_field_view_all': 'Показать все',
            'tldir_title_button_field_clear': 'Сбросить',
            'tldir_title_button_show_selection': 'Только выбранные',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //var wsd = App.ids_wsd;
    var ids_dir = App.ids_directory;

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    var VICR = App.view_incoming_report; // Модуль отчетов по прибытию

    // Перечень полей
    var list_collums = [
        // Поля составы принятые
        {
            field: 'numeration',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('tldir_field_numeration', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'details_control',
            className: 'details-control  details-control-wagons-sostav',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'checkbox_selection',
            targets: 0,
            className: 'select-checkbox',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        // Поля Directory_OperatorsWagons
        {
            field: 'operators_wagons_abbr',
            data: function (row, type, val, meta) {
                return row['abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_operators_wagons_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operators_wagons_operators',
            data: function (row, type, val, meta) {
                return row['operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-500',
            title: langView('tldir_field_operators_wagons_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tldir_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tldir_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tldir_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('tldir_title_excel_sheet_name', App.Langs),
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
            text: langView('tldir_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tldir_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tldir_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tldir_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        },
        {
            button: 'show_selection',
            extend: 'showSelected',
            text: langView('tldir_title_button_show_selection', App.Langs),
        },
    ];

    var pageTotal = 0;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_directory(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_directory.prototype.init_columns_detali = function () {
        var collums = [];
        return init_columns(collums, list_collums);
    };
    // инициализация полей adoption_sostav
    table_directory.prototype.init_columns_operators_wagons_select = function () {
        var collums = [];
        collums.push({ field: 'checkbox_selection', title: null, class: null });
        collums.push({ field: 'operators_wagons_abbr', title: null, class: null });
        collums.push({ field: 'operators_wagons_operators', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_directory.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок adoption_sostav
    table_directory.prototype.init_button_operators_wagons_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        buttons.push({ name: 'show_selection', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_directory.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'operators_wagons_select': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tldir_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi ',
                };
                this.autoWidth = false;
                //this.scrollY = 300,
                //this.scrollCollapse = true,
                this.table_columns = this.init_columns_operators_wagons_select();
                this.table_buttons = this.init_button_operators_wagons_select();
                this.dom = 'Bfrtip';
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
    table_directory.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('tldir_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_table: false,
            type_report: null,     // 
            link_num: false,
            ids_dir: null,
            fn_init: null,
            fn_select_rows: null,
            fn_action_view_wagons: null,
        }, options);
        //
        //this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new ids_dir();
        // Настройки отчета
        this.lengthMenu = null;
        this.pageLength = null;
        this.deferRender = true;
        this.paging = false;
        this.searching = false;
        this.ordering = false;
        this.info = false;
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.columnDefs = null;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.drawCallback = null;
        this.footerCallback = null;
        this.autoWidth = false;
        this.table_columns = [];
        this.table_buttons = [];
        this.dom = 'Bfrtip';
        this.init_type_report();
        this.data = [];
        this.selected_rows = null;
        this.tables_detali = [];                    // Массив таблиц детально
        //----------------------------------
        // Создать макет таблицы
        var table_report = new this.fe_ui.table({
            id: 'tab-tdr-' + this.selector,
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        //if (this.settings.type_report === 'adoption_sostav') {
        //    this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        //}

        this.$table_report = table_report.$table;
        this.$td_report.addClass('table-report').append(this.$table_report);
        // Инициализируем таблицу
        this.obj_t_report = this.$table_report.DataTable({
            "lengthMenu": this.lengthMenu,
            "pageLength": this.pageLength,
            "deferRender": this.deferRender,
            "paging": this.paging,
            "searching": this.searching,
            "ordering": this.ordering,
            "info": this.info,
            "keys": true,
            columnDefs: this.columnDefs,
            colReorder: true,                       // вкл. перетаскивание полей
            fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
            fixedColumns: {
                leftColumns: this.leftColumns,
            },
            select: this.table_select,
            "autoWidth": this.autoWidth,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            //scrollX: true,
            /*            sScrollXInner: "100%",*/
            //"responsive": true,
            //"bAutoWidth": false,
            //order: this.order_column,
            language: language_table(App.Langs),
            jQueryUI: false,
            drawCallback: this.drawCallback,
            "createdRow": function (row, data, index) {
                switch (this.settings.type_report) {
                    //case 'adoption_sostav': {
                    //    if (data.type === 0) {

                    //    } else {
                    //        $(row).addClass('yellow');
                    //    }
                    //    break;
                    //};
                };
            }.bind(this),
            footerCallback: this.footerCallback,
            columns: this.table_columns,
            dom: this.dom,
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            //case 'adoption_sostav': {
            //    this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
            //        this.select_rows(); // определим строку
            //        this.enable_button();
            //        // Обработать событие выбрана строка
            //        if (typeof this.settings.fn_select_rows === 'function') {
            //            this.settings.fn_select_rows(this.selected_rows);
            //        }
            //    }.bind(this));
            //    break;
            //};
        };
        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Выбрано
    table_directory.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_directory.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'adoption_sostav': {
            //    if (this.select_rows_sostav && this.select_rows_sostav.length > 0) {
            //        this.obj_t_sostav.button(5).enable(true);
            //        if (this.select_rows_sostav[0].status < 1) {
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(true); // отмена сдачи состава
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(false);
            //            //if (this.select_rows_sostav[0].status === 2) { this.obj_t_sostav.button(4).enable(true); } else { this.obj_t_sostav.button(4).enable(false); }
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_sostav.button(3).enable(false);
            //        this.obj_t_sostav.button(4).enable(false);
            //        this.obj_t_sostav.button(5).enable(false);
            //    }
            //    break;
            //};
        };
    };
    // Показать данные
    table_directory.prototype.view = function (data) {
        this.data = data;
        this.out_clear();
        LockScreen(langView('tldir_mess_view_report', App.Langs));
        this.obj_t_report.clear();
        this.obj_t_report.rows.add(data);
        this.obj_t_report.order(this.order_column);
        this.obj_t_report.draw();
        this.view_footer(data);
        this.select_rows();
        this.enable_button();
        //LockScreenOff();
    };
    //
    table_directory.prototype.view_footer = function (data) {
        //switch (this.settings.type_report) {
        //    case 'adoption_sostav': {
        //        if (data) {
        //            var sum_count_wagon = 0;
        //            var sum_count_wagon_all = 0;
        //            var sum_count_return_wagon = 0;
        //            var sum_count_return_wagon_all = 0;
        //            var sum_count_account_balance = 0;
        //            var sum_count_account_balance_all = 0;
        //            var sum_count_not_operator = 0;
        //            var sum_count_not_operator_all = 0;
        //            $.each(data, function (i, el) {
        //                if (el.type === 0) {
        //                    sum_count_wagon += el.count_wagon;
        //                    sum_count_account_balance += el.count_account_balance;
        //                    sum_count_not_operator += el.count_not_operator;
        //                    sum_count_return_wagon += el.count_return_wagon;
        //                }
        //                sum_count_wagon_all += el.count_wagon;
        //                sum_count_account_balance_all += el.count_account_balance;
        //                sum_count_not_operator_all += el.count_not_operator;
        //                sum_count_return_wagon += el.count_return_wagon;
        //            });
        //        }
        //        this.obj_t_report.columns('.sum_count_wagon').every(function () {
        //            $(this.footer()).html(sum_count_wagon_all + '(' + sum_count_wagon + ')');
        //        });
        //        this.obj_t_report.columns('.sum_count_account_balance').every(function () {
        //            $(this.footer()).html(sum_count_account_balance_all + '(' + sum_count_account_balance + ')');
        //        });
        //        this.obj_t_report.columns('.sum_count_not_operator').every(function () {
        //            $(this.footer()).html(sum_count_not_operator_all + '(' + sum_count_not_operator + ')');
        //        });
        //        this.obj_t_report.columns('.sum_count_return_wagon').every(function () {
        //            $(this.footer()).html(sum_count_return_wagon_all + '(' + sum_count_return_wagon + ')');
        //        });
        //        break;
        //    };
        //};
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_directory.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_directory.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    table_directory.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    table_directory.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Очистить объект
    table_directory.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    };
    // Очистить детали по указаному пути
    table_directory.prototype.destroy_detali = function (data) {
        if (this.tables_detali[data.id]) {
            this.tables_detali[data.id].destroy();
            delete this.tables_detali[data.id];
        }
    };
    // Очистить все детали
    table_directory.prototype.destroy_all_detali = function () {
        $.each(this.tables_detali, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.tables_detali = {};
    };
    //
    App.table_directory = table_directory;

    window.App = App;
})(window);