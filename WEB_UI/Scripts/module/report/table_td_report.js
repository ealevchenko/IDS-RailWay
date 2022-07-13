/*Модуль Таблица "Прибываемые составы"*/
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
            'ttdr_field_adoption_sostav_station': 'ПРИБЫТИЕ',
            'ttdr_field_adoption_count_wagon': 'Всего вагонов',
            'ttdr_field_adoption_count_account_balance': 'Учетные вагоны',

            'ttdr_mess_init_module': 'Инициализация модуля (table_td_report) ...',
            'ttdr_mess_view_report': 'Отображаю данные ...',


            'ttdr_title_all': 'Все',

            'ttdr_title_button_export': 'Экспорт',
            'ttdr_title_button_buffer': 'Буфер',
            'ttdr_title_button_excel': 'Excel',
            'ttdr_title_excel_sheet_name': 'Отчет',
            'ttdr_title_button_field': 'Поля',
            'ttdr_title_button_field_select': 'Выбрать',
            'ttdr_title_button_field_view_all': 'Показать все',
            'ttdr_title_button_field_clear': 'Сбросить',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

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
        // Поля составы принятые
        {
            field: 'adoption_sostav_station',
            data: function (row, type, val, meta) {
                return row.station;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_adoption_sostav_station', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_adoption_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_adoption_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('ttdr_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('ttdr_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('ttdr_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('ttdr_title_excel_sheet_name', App.Langs),
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
            text: langView('ttdr_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('ttdr_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('ttdr_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('ttdr_title_button_field_clear', App.Langs),
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
    ];

    /*    var ddd = function () { }.bind(this)*/
    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_td_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        //this.fc_ui = new FC();
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_td_report.prototype.init_columns_detali = function () {
        var collums = [];
        return init_columns(collums, list_collums);
    };
    // инициализация полей adoption_sostav
    table_td_report.prototype.init_columns_adoption_sostav = function () {
        var collums = [];
        collums.push({ field: 'adoption_sostav_station', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_wagon', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_account_balance', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_td_report.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок adoption_sostav
    table_td_report.prototype.init_button_adoption_sostav = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_td_report.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_adoption_sostav();
                this.table_buttons = this.init_button_adoption_sostav();
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
    table_td_report.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('ttdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_wagons: false,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_init: null,
            fn_action_view_wagons: null,
        }, options);
        //
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        //----------------------------------
        // Создать макет таблицы
        var table_report = new this.fe_ui.table({
            id: 'tab-tdr-' + this.selector,
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td></td><td></td></tr></tfoot>'));
        this.$table_report = table_report.$table;
        this.$td_report.addClass('table-report-operation').append(this.$table_report);
        // Инициализируем таблицу
        this.obj_t_report = this.$table_report.DataTable({
            "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]],
            "pageLength": 10,
            "deferRender": true,
            "paging": false,
            "searching": false,
            "ordering": false,
            "info": false,
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
                //$(row).attr('id', data.id); // id строки 
                //switch (data.status) {
                //    case 1: $(row).addClass('yellow'); break;
                //    case 2: $(row).addClass('green'); break;
                //    case 3: $(row).addClass('red'); break;
                //}
            }.bind(this),
            "footerCallback": function (row, data, start, end, display) {
                //var api = this.api();
                //// Remove the formatting to get integer data for summation
                ////view_footer(api);
                //var intVal = function (i) {
                //    return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                //};
                //// Total over all pages
                //var total = api
                //    .column(1)
                //    .data()
                //    .reduce(function (a, b) {
                //        return intVal(a) + intVal(b);
                //    }, 0);

                //// Total over this page
                //var pageTotal = api
                //    .column(1, { page: 'current' })
                //    .data()
                //    .reduce(function (a, b) {
                //        return intVal(a) + intVal(b);
                //    }, 0);
                //// Update footer
                //$(api.column(1).footer()).html(total);
            },
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });



        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    //this.select_rows(); // определим строку
                    //this.enable_button();
                }.bind(this));
                break;
            };
        };
        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Выбрано
    table_td_report.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.select_rows_sostav = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_td_report.prototype.enable_button = function () {
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
    table_td_report.prototype.view = function (data) {
        this.out_clear();
        LockScreen(langView('ttdr_mess_view_report', App.Langs));
        this.obj_t_report.clear();
        this.obj_t_report.rows.add(data);
        this.obj_t_report.draw();
        this.view_footer();
        this.select_rows();
        this.enable_button();
        LockScreenOff();
    };
    //
    table_td_report.prototype.view_footer = function () {
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    var sum = this
                        .data()
                        .reduce(function (a, b) {
                            return a + b;
                        });
                    $(this.footer()).html(sum);
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    var sum = this
                        .data()
                        .reduce(function (a, b) {
                            return a + b;
                        });
                    $(this.footer()).html(sum);
                });
                break;
            };
        };
    };

    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_td_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_td_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_td_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_td_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_td_report.prototype.destroy = function () {
        // Вкл. когда понадобится
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Уберем модуль Форма "Править состав прибытия"
        if (this.fhiigs) {
            this.fhiigs.destroy();
            this.fhiigs = null;
        }
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    }

    App.table_td_report = table_td_report;

    window.App = App;
})(window);