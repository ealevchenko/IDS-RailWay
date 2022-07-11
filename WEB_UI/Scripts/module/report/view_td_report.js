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
            'vtdr_mess_init_module': 'Инициализация модуля(view_td_report)...',
            'vtdr_link_title_home1': 'ИДС "ОТЧЕТЫ"',
            'vtdr_link_title_home2': 'Транспортный департамент',

            'vtdr_link_title_report_1_1': 'Статистика',
            'vtdr_title_report_1_1': 'Статистика {0}',
            'vtdr_title_report_type_1': '«Ж.д. сутки» c:{0} по {1}',
            'vtdr_title_report_type_2': '«Календарные сутки» c:{0} по {1}',
            'vtdr_title_report_type_3': '«За месяц» c:{0} по {1}',
            'vtdr_title_report_type_4': '«За период» c:{0} по {1}',

            'vtdr_card_header_report_1_1_arr': 'ПРИБЫТИЕ',
            'vtdr_card_header_report_1_1_out': 'СДАЧА',

            'vtdr_title_type_select': 'Выборка за:',
            'vtdr_title_label_interval_date': ' период:',
            'vtdr_title_label_date': ' с даты:',
            'vtdr_title_button': ' Применить',

            'vtdr_link_report_1': 'Погран-переход',
            'vtdr_title_report_1': 'Статистика',
            'vtdr_title_search_cars': 'Найти вагоны',
            'vtdr_label_list_nums': 'Добавьте номера вагонов (разделитель “;”) по которым необходимо провести поиск:',
            'vtdr_title_list_nums': 'Добавте номера вагонов',
            'vtdr_placeholder_list_nums': '00000001;00000002;00000003',
            'vtdr_mess_operation_run': 'Выполняю операцию...',
            'vtdr_title_all': 'Все',
            'vtdr_title_button_export': 'Экспорт',
            'vtdr_title_button_buffer': 'Буфер',
            'vtdr_title_button_excel': 'Excel',
            'vtdr_title_excel_sheet_name': 'Погран переходы',

            'vtdr_field_border_crossing_num': '№ вагона',
            'vtdr_field_border_crossing_status': 'Статус вагона',
            'vtdr_field_border_crossing_date_departure_amkr': 'Вагон отправлен',
            'vtdr_field_border_crossing_border_crossing_stn': 'Код погр.-перехода',
            'vtdr_field_border_crossing_border_crossing_stn_name': 'Погран-переход',
            'vtdr_field_border_crossing_cross_time': 'Дата и время перехода',
            'vtdr_field_border_crossing_client_kod_on': 'Код грузополучателя',
            'vtdr_field_border_crossing_client_name_on': 'Грузополучатель',
            'vtdr_field_border_crossing_vesg': 'Вес груза',
            'vtdr_field_border_crossing_epd_status': 'Статус ЭПД',
            'vtdr_field_border_crossing_epd_date_otpr': 'Отправлен (ЭПД)',
            'vtdr_field_border_crossing_epd_date_pr': 'Прибыл (ЭПД)',
            'vtdr_field_border_crossing_epd_num_doc': 'Id документа (ЭПД)',
            'vtdr_field_border_crossing_epd_revision': '№ ревизии (ЭПД)',
            'vtdr_field_border_crossing_epd_num_uz': '№ накладной (ЭПД)',

            'vtdr_mess_error_search_cars': 'При формировании отчета произошла ошибка, код ошибки {0}',

        },
        'en':  //default language: English
        {
            'vtdr_mess_init_module': 'Module initialization(view_td_report)...',
            'vtdr_link_report_1': 'Border crossing',
            'vtdr_title_report_1': 'Movement of goods shipped by AMKR for external consumers of products (Europe)',
            'vtdr_title_search_cars': 'Find Cars',
            'vtdr_label_list_nums': 'Add wagon numbers (separator “;”) for which you want to search:',
            'vtdr_title_list_nums': 'Add wagon numbers',
            'vtdr_placeholder_list_nums': '00000001;00000002;00000003',
            'vtdr_mess_operation_run': 'Performing an operation...',
            'vtdr_title_all': 'All',
            'vtdr_title_button_export': 'Export',
            'vtdr_title_button_buffer': 'Buffer',
            'vtdr_title_button_excel': 'Excel',
            'vtdr_title_excel_sheet_name': 'Border Transitions',

            'vtdr_field_border_crossing_num': 'car number',
            'vtdr_field_border_crossing_status': 'Status of the wagon',
            'vtdr_field_border_crossing_date_departure_amkr': 'Wagon sent',
            'vtdr_field_border_crossing_border_crossing_stn': 'Boundary crossing code',
            'vtdr_field_border_crossing_border_crossing_stn_name': 'Border Crossing',
            'vtdr_field_border_crossing_cross_time': 'Date and time of crossing',
            'vtdr_field_border_crossing_client_kod_on': 'Consignee Code',
            'vtdr_field_border_crossing_client_name_on': 'Consignee',
            'vtdr_field_border_crossing_vesg': 'Weight',
            'vtdr_field_border_crossing_epd_status': 'EPD status',
            'vtdr_field_border_crossing_epd_date_otpr': 'Sent (EPD)',
            'vtdr_field_border_crossing_epd_date_pr': 'Arrived (EPD)',

            'vtdr_mess_error_search_cars': 'An error occurred while generating the report, error code {0}',

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FE = App.form_element;
    var alert = App.alert_form;
    var wsd = App.ids_wsd;

    var FIL = App.form_inline;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_td_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fe_ui = new FE();
    }
    //==========================================================================================
    // Инициализация
    view_td_report.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('vtdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            fn_init: null,
        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.elements = {}; // Все элементы формы

        this.report = null;     // Номер выбранного отчета
        this.type = 1;          // Тип диапазона времени отчета
        // Диапазон времени
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        // Сылки на отчеты
        this.report_links = [
            {
                text: langView('vtdr_link_title_report_1_1', App.Langs),
                icon: 'fa-solid fa-chart-column mr-1',
                click: function () {
                    this.init_report_1_1();
                }.bind(this),
            }
        ];
        this.$panel.empty();
        //<div class="wrapper d-flex align-items-stretch">
        this.$panel.addClass('wrapper d-flex align-items-stretch');

        var nav$ = $('<nav id="sidebar"></nav>');
        //<div class="custom-menu">
        var div_cm = new this.fe_ui.div({
            class: 'custom-menu',
        });
        //<button type="button" id="sidebarCollapse" class="btn btn-primary">
        //    <i class="fa-solid fa-bars"></i>
        //    <span class="sr-only">Toggle Menu</span>
        //</button>
        var button_mn = new this.fe_ui.bs_button({
            color: 'primary',
            size: null,
            class: null,
            id: 'sidebarCollapse',
            label: '<span class="sr-only">Toggle Menu</span>',
            title: null,
            icon_left: 'fa-solid fa-bars',
            icon_right: null,
            click: null,
        });
        div_cm.$div.on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        div_cm.$div.append(button_mn.$button);
        //--------------------
        //<div class="p-4">
        var div_p4 = new this.fe_ui.div({
            class: 'p-4',
        });
        //<h1><a href='@Url.Action("Index", "Home", new { Area = "IDSReport" })' class="logo">@IDSReportResource.system_idsreport_title<span><i class="fa-solid fa-sack-dollar mr-1"></i>@IDSReportResource.report_sd_title</span></a></h1>
        var $h1 = $('<h1></h1>');
        var a_home = new this.fe_ui.a({
            id: null,
            class: 'logo',
            href: '/IDSReport/Home',
            text: langView('vtdr_link_title_home1', App.Langs) + '<span><i class="fa-solid fa-train-subway mr-1"></i>' + langView('vtdr_link_title_home2', App.Langs) + '</span>',
            target: null,
            title: null,
        });
        $h1.append(a_home.$alink);
        //<h3 class="h6 mb-3">@IDSReportResource.report_sd_group_link_cargo</h3>
        //<ul class="list-unstyled components mb-5 text-left" id="list-sidebar">
        var $ul1 = $('<ul class="list-unstyled components mb-5 text-left"></ul>');
        //<li class="active">
        // <a href="#"><i class="fa-solid fa-magnifying-glass-arrow-right mr-1" style="color:#44bef1"></i>@IDSReportResource.report_sd_link_border_crossing</a>
        //</li>
        $.each(this.report_links, function (index, element) {
            var $li = $('<li></li>');
            var a_link = new this.fe_ui.a({
                id: null,
                class: null,
                href: '#',
                text: '<i class="' + element.icon + '" style="color:#ffff49"></i>' + element.text, //#44bef1
                target: null,
                title: null,
            });
            if (typeof element.click === 'function') {
                a_link.$alink.on("click", element.click);
            }
            $li.append(a_link.$alink);
            $ul1.append($li);
        }.bind(this));
        //<div class="footer">
        var div_ft = new this.fe_ui.div({
            class: 'footer',
        });
        //
        div_p4.$div.append($h1).append($ul1).append(div_ft.$div)
        //------------------------------------
        nav$.append(div_cm.$div).append(div_p4.$div)
        //------------------------------------
        //<div class="p-4 p-md-5 pt-5 pt-1">
        var div_content = new this.fe_ui.div({
            id: 'content',
            class: 'p-4 p-md-5 pt-5 pt-1"',
        });
        var div_title = new this.fe_ui.div({
            class: 'd-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom',
        });
        this.$title_report = $('<h1 class="h2"></h1>');
        this.$main_report = $('<div></div>');
        var $alert = $('<div class="alert" role="alert">');
        this.alert = new alert($alert);
        if (this.settings.alert === null) this.settings.alert = this.alert;
        div_content.$div.append(div_title.$div.append(this.$title_report)).append($alert).append(this.$main_report);
        //----------------------------------------------------------------
        this.$panel.append(nav$).append(div_content.$div);

        var fullHeight = function () {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });

        };
        fullHeight();
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    //----------------------------------------------------------------------
    // ФОРМА ВЫБОРА ВРЕМЕНИ ОТЧЕТА
    // Настройка выбора диапазона отчета
    view_td_report.prototype.init_select_report = function () {
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        // Создадим форму выбора для отчета
        this.form_panel = new FIL();
        var fl_interval_date = {
            type: 'interval_date',
            id: 'interval_date',
            prefix: 'sm',
            title: langView('vtdr_title_label_interval_date', App.Langs),
            start: this.start,
            stop: this.stop,
            select: function (interval) {
                this.set_data_report(null, interval);
            }.bind(this),
        };
        var fl_select_date = {
            type: 'date',
            id: 'select_date',
            prefix: 'sm',
            title: langView('vtdr_title_label_date', App.Langs),
            start: this.start,
            time: false,
            select: function (date) {
                this.set_data_report(date, null);
            }.bind(this),
        };
        var fl_type_select = {
            type: 'select',
            id: 'type_select',
            prefix: 'sm',
            title: langView('vtdr_title_type_select', App.Langs),
            list: [{ value: 1, text: 'ЖД сутки' }, { value: 2, text: 'Календарные сутки' }, { value: 3, text: 'От начала месяца' }, { value: 4, text: 'Произвольный выбор' }],
            default: this.type,
            select: function (event, ui) {
                event.preventDefault();
                // Обработать выбор
                var id = Number($(event.currentTarget).val());
                this.select_report(id);
            }.bind(this),
        };
        var fl_button = {
            type: 'button',
            id: 'button',
            prefix: 'sm',
            title: langView('vtdr_title_button', App.Langs),
            icon: 'fas fa-retweet',
            select: function (e, ui) {
                event.preventDefault();
                this.view_report();
            }.bind(this),
        };
        var fields = [];
        fields.push(fl_type_select);
        fields.push(fl_select_date);
        fields.push(fl_interval_date);
        fields.push(fl_button);
        // Инициализация формы
        this.form_panel.init({
            fields: fields,
            cl_form: 'd-flex w-100 mb-2'
        });
        // Отображение формы выбора 
        this.$main_report.append(this.form_panel.$form);
        this.div_interval_date = $('span#interval_date').closest("div").prev().closest("div");
        this.div_select_date = $('input#select_date').closest("div").prev().closest("div");
        this.div_select_date.hide();
        this.div_interval_date.hide();
        this.select_report(1);
    };
    // Выбор типа отчета
    view_td_report.prototype.select_report = function (type) {
        this.type = type;
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        if (type === 4) {
            this.div_select_date.hide();
            this.div_interval_date.show();
            this.set_data_report(null);
            this.form_panel.set('interval_date', { start: this.start, stop: this.stop });
            this.set_data_report(null, { start: this.start, stop: this.stop });
        } else {
            if (type > 0) {
                this.div_select_date.show();
                this.div_interval_date.hide();
                this.form_panel.set('select_date', moment());
                this.set_data_report(moment(), null);
            } else {
                this.div_select_date.hide();
                this.div_interval_date.hide();
                this.set_data_report(null, null);
            }
        }
    };
    // Получить дату отчета
    view_td_report.prototype.set_data_report = function (date, interval) {
        var message_report = '';
        switch (this.type) {
            case 1: {
                if (date) {
                    this.start = moment(date).subtract(1, 'd').set({ 'hour': 20, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
                    message_report = langView('vtdr_title_report_type_1', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 2: {
                // календарные сутки
                if (date) {
                    this.start = moment(date).set({ 'hour': 0, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                    message_report = langView('vtdr_title_report_type_1', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 3: {
                // календарные сутки
                if (date) {
                    this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date)._d;
                    message_report = langView('vtdr_title_report_type_1', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 4: {
                if (interval && interval.start && interval.stop) {
                    this.start = moment(interval.start)._d;
                    this.stop = moment(interval.stop)._d;
                    message_report = langView('vtdr_title_report_type_1', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
        }
        this.$title_report.text(langView('vtdr_title_report_1_1', App.Langs).format(message_report));
    };
    // Показать отчет
    view_td_report.prototype.view_report = function () {
        switch (this.report) {
            case 1: {
                this.view_report_1_1(this.start, this.stop);
                break;
            }
        }
    };
    //----------------------------------------------------------
    // Отчеты
    // Инициализировать отчет "Статистика"
    view_td_report.prototype.init_report_1_1 = function () {
        this.report = 1;
        $('#sidebar').toggleClass('active');
        this.$title_report.text(langView('vtdr_title_report_1_1', App.Langs).format(''));
        this.init_select_report();
        //this.$main_report.empty();
        //------
        var div_row1 = new this.fe_ui.bs_row();
        var div_row2 = new this.fe_ui.bs_row();
        var div_col1 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 6,
        });
        var div_col2 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 6,
        });

        var card_arr = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_arr', App.Langs),
        });

        var card_out = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_out', App.Langs),
        });

        div_row1.$row.append(div_col1.$col.append(card_arr.$card)).append(div_col2.$col.append(card_out.$card));
        this.$main_report.append(div_row1.$row).append(div_row2.$row)

    };
    // Показать отчет  "Статистика"
    view_td_report.prototype.view_report_1_1 = function () {
        
    };
    // Открыть отчет
    view_td_report.prototype.view_report_border_crossing = function () {
        $('#sidebar').toggleClass('active');
        this.$title_report.text(langView('vtdr_title_report_1', App.Langs));
        // Очистим старую форму
        this.$main_report.empty();
        this.elements = {}; // Все элементы формы
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        // Очистить таблицы
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        // Создадим форму поиска вагонов через погран переход
        var FDL = App.form_dialog;
        this.form = new FDL();
        // Создать макет панели
        var objs = [];
        // Форма детально
        var row_input = {
            obj: 'bs_row',
            options: {
                class: null,
            },
            childs: []
        };
        var bt_search_car = {
            obj: 'bs_button',
            options: {
                color: 'warning',
                size: 'sm',
                class: null,
                id: 'search_car',
                label: null,
                title: langView('vtdr_title_search_cars', App.Langs),
                icon_left: null,
                icon_right: 'fas fa-search',
                click: function (event) {
                    event.preventDefault();
                    this.action_search_border_crossing();
                }.bind(this),
            }
        };
        var form_textarea_list_nums = {
            obj: 'bs_textarea',
            options: {
                id: 'list_nums',
                validation_group: 'common',
                form_group_size: 'xl',
                form_group_col: 12,
                form_group_class: 'text-left',
                label: langView('vtdr_label_list_nums', App.Langs),
                label_class: 'mb-1',
                textarea_size: null,
                textarea_rows: 5,
                textarea_class: 'inp-manual',
                textarea_title: langView('vtdr_title_list_nums', App.Langs),
                textarea_maxlength: null,
                textarea_placeholder: langView('vtdr_placeholder_list_nums', App.Langs),
                textarea_required: null,
                textarea_readonly: false,
                input_group: true,
                input_group_prepend_class: null,
                input_group_prepend_objs: [],
                input_group_append_class: null,
                input_group_append_objs: [bt_search_car],
            },
            childs: []
        };
        var row_input1 = {
            obj: 'bs_row',
            options: {
                class: null,
            },
            childs: []
        };
        var form_div_result = {
            obj: 'div',
            options: {
                id: 'result-report',
                class: 'col-md-12 table-report-operation',
            },
            childs: []
        };
        //
        row_input.childs.push(form_textarea_list_nums);
        row_input1.childs.push(form_div_result);
        objs.push(row_input);
        objs.push(row_input1);
        // Инициализируем форму
        this.form.init({
            alert: this.alert,
            objs: objs,
            mb: 2,
            id: null,
            cl_form: null,
            validation: true,
            fn_validation: function (result) {
                // Валидация успешна
                if (result && result.valid) {

                }
            }.bind(this),
            fn_html_init: function () {
                // HTML документы созданы

            }.bind(this),
            fn_init: function (init) {
                // Инициализация формы закончена
                // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                this.form.create_element(this.elements, true);
                // отобразим форму
                this.$main_report.append(this.form.$form);
                // Создадим и добавим макет таблицы
                var table = new this.fe_ui.table({
                    id: 'table-report-sd',
                    class: 'display compact cell-border row-border hover',
                    title: null,
                });
                this.$table = table.$table;
                $('div#result-report').append(this.$table);
                //this.$div_out.addClass(this.settings.div_class).append(this.this.$table);
                // Инициализируем таблицу
                this.obj_t_report = this.$table.DataTable({
                    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('vtdr_title_all', App.Langs)]],
                    "pageLength": -1,
                    "deferRender": true,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: false,
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

                    }.bind(this),
                    columns: [
                        {
                            data: function (row, type, val, meta) {
                                return row.num;
                            },
                            className: 'dt-body-center',
                            title: langView('vtdr_field_border_crossing_num', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.status !== null ? outStatusOutgoingSostav(row.status) : '';
                            },
                            className: 'dt-body-left',
                            title: langView('vtdr_field_border_crossing_status', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.date_departure_amkr ? moment(row.date_departure_amkr).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_date_departure_amkr', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.border_crossing_stn;
                            },
                            className: 'dt-body-center',
                            title: langView('vtdr_field_border_crossing_border_crossing_stn', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.border_crossing_stn_name;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_border_crossing_stn_name', App.Langs), width: "100px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.cross_time ? moment(row.cross_time).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_cross_time', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.client_kod_on;
                            },
                            className: 'dt-body-center',
                            title: langView('vtdr_field_border_crossing_client_kod_on', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.client_name_on;
                            },
                            className: 'dt-body-left shorten mw-300',
                            title: langView('vtdr_field_border_crossing_client_name_on', App.Langs), width: "300px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.vesg !== null ? Number(Number(row.vesg) / 1000).toFixed(3) : '';
                            },
                            className: 'dt-body-right',
                            title: langView('vtdr_field_border_crossing_vesg', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.epd_status !== null ? get_status_epd(row.epd_status) : '';
                            },
                            className: 'dt-body-left',
                            title: langView('vtdr_field_border_crossing_epd_status', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.epd_date_otpr ? moment(row.epd_date_otpr).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_epd_date_otpr', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.epd_date_pr ? moment(row.epd_date_pr).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_epd_date_pr', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.num_doc;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_epd_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.revision;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_epd_revision', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.num_uz;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vtdr_field_border_crossing_epd_num_uz', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            extend: 'collection',
                            text: langView('vtdr_title_button_export', App.Langs),
                            buttons: [
                                {
                                    text: langView('vtdr_title_button_buffer', App.Langs),
                                    extend: 'copyHtml5',
                                },
                                {
                                    text: langView('vtdr_title_button_excel', App.Langs),
                                    extend: 'excelHtml5',
                                    sheetName: langView('vtdr_title_excel_sheet_name', App.Langs),
                                    messageTop: function () {
                                        return '';
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            button: 'page_length',
                            extend: 'pageLength',
                        }
                    ],
                });

            }.bind(this),
        });
    };
    // Выполнить поиск
    view_td_report.prototype.action_search_border_crossing = function () {
        this.out_clear();
        this.elements.button_search_car.prop("disabled", true); // сделаем не активной
        var list_cars = this.elements.textarea_list_nums.val();
        var nums = is_valid_nums(list_cars, this.alert, true);
        if (nums) {
            LockScreen(langView('vtdr_mess_operation_run', App.Langs));
            this.ids_wsd.postReportBorderCrossingOfNums(nums, function (result) {
                if (result !== null) {
                    if (this.obj_t_report) {
                        this.obj_t_report.clear();
                        this.obj_t_report.rows.add(result);
                        this.obj_t_report.draw();
                    }
                } else {
                    this.mf_edit.out_warning(langView('vtdr_mess_error_search_cars', App.Langs).format(result.result));
                }
                this.elements.button_search_car.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }.bind(this));
        } else {
            this.elements.button_search_car.prop("disabled", false); // сделаем активной
        };
    };
    //
    view_td_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    };
    // Показать ошибки
    view_td_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    view_td_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    view_td_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //------------------------------------------------------------------
    // Очистить объект
    view_td_report.prototype.destroy = function () {
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        // Очистить таблицы
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
    };

    App.view_td_report = view_td_report;

    window.App = App;
})(window);