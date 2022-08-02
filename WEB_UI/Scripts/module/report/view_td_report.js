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
            'vtdr_link_title_report_2_1': 'Отчет по прибытию (общий)',


            'vtdr_title_report_1_1': 'Статистика {0}',
            'vtdr_title_report_2_1': 'Отчет по прибытию (общий) {0}',

            'vtdr_title_report_type_1': '«Ж.д. сутки» c:{0} по {1}',
            'vtdr_title_report_type_2': '«Календарные сутки» c:{0} по {1}',
            'vtdr_title_report_type_3': '«За месяц» c:{0} по {1}',
            'vtdr_title_report_type_4': '«За период» c:{0} по {1}',

            'vtdr_card_header_report_1_1_arr': 'ПРИБЫТИЕ',
            'vtdr_card_header_report_1_1_out': 'СДАЧА',
            'vtdr_card_header_report_1_1_not_oper': 'ВАГОНЫ БЕЗ ОПЕРАТОРОВ',
            'vtdr_load_adoption_sostav': 'Выполняю операцию выборка принятых составов ...',

            'vtdr_card_header_report_2_1_group': 'Общая информация',
            'vtdr_card_header_report_2_1_detali': 'Детально информация',


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

            'vtdr_mess_operation_run': 'Выполняю операцию поиска принятых составов ...',

            'vtdr_mess_error_search_cars': 'При формировании отчета произошла ошибка, код ошибки {0}',
            'vtdr_mess_error_search_docs': 'При формировании отчета произошла ошибка, код ошибки {0}',
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
    var TTDR = App.table_td_report;

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
        //
        this.adoption_sostav = [];
        this.vs_adoption_sostav = [];
        this.nb_adoption_sostav = [];
        this.pr_adoption_sostav = [];
        this.kr_adoption_sostav = [];
        this.outgoing_sostav = [];
        this.vs_outgoing_sostav = [];
        this.nb_outgoing_sostav = [];
        this.pr_outgoing_sostav = [];
        this.kr_outgoing_sostav = [];
        // Сылки на отчеты
        this.report_links = [
            {
                text: langView('vtdr_link_title_report_1_1', App.Langs),
                icon: 'fa-solid fa-chart-column mr-1',
                click: function () {
                    this.init_report_1_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_2_1', App.Langs),
                icon: 'fa-solid fa-arrow-right-to-bracket mr-1',
                click: function () {
                    this.init_report_2_1();
                }.bind(this),
            },
        ];
        // Очистим экран
        this.$panel.empty();
        // Построим основной экран
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
        this.$title_report = $('<h1 class="h2"></h1>');             // Подпись отчета
        this.$main_report = $('<div></div>');                       // Основное окно отчета
        var $alert = $('<div class="alert" role="alert">');         // вывод ошибки
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
        switch (this.report) {
            case 1: this.clear_report_1_1(); break;
            case 2: this.clear_report_2_1(); break;
        }
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
                    message_report = langView('vtdr_title_report_type_2', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 3: {
                // календарные сутки
                if (date) {
                    this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date)._d;
                    message_report = langView('vtdr_title_report_type_3', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 4: {
                if (interval && interval.start && interval.stop) {
                    this.start = moment(interval.start)._d;
                    this.stop = moment(interval.stop)._d;
                    message_report = langView('vtdr_title_report_type_4', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
        }
        switch (this.report) {
            case 1: this.$title_report.text(langView('vtdr_title_report_1_1', App.Langs).format(message_report)); break;
            case 2: this.$title_report.text(langView('vtdr_title_report_2_1', App.Langs).format(message_report)); break;
        }

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
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 1; // номер отчета
        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_1_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
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
        var div_col3 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        //--- Окно прибытие --------------------------------
        var card_arr = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_arr', App.Langs),
        });             // Карточка прибытия
        var nav_tabs_arr = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-arr',
            class_nav: null,
            id_content: 'tab-arr-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'arr-report',
                    aria_controls: 'arr-report-tab',
                    label: 'Отчет',
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-searsh',
                    aria_controls: 'arr-searsh-tab',
                    label: 'Поиск',
                    disable: false,
                    click: null,
                },
            ],
        });     // Переключатели панелей карточки
        //---- Панель "Отчет"
        var $arr_report = nav_tabs_arr.$content.find('div#arr-report-tab'); // Панель отчета
        $arr_report.append($('<div id="adoption-sostav-all"></div>')).append($('<div id="adoption-sostav-detali"></div>')); // Добавим div для таблиц
        //---- Панель "Поиск по ..."
        var $arr_searsh = nav_tabs_arr.$content.find('div#arr-searsh-tab'); // Панель поиска
        // Создать макет панели для поиска
        var row1_arr = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var button_arr = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: null,
            id: 'search_car',
            label: null,
            title: '',
            icon_left: null,
            icon_right: 'fas fa-search',
            click: function (event) {
                event.preventDefault();
                this.action_search_adoption_docs();
            }.bind(this),
        });
        var textarea_arr = new this.fe_ui.bs_textarea({
            id: 'list_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: '№№ Ведомостей',
            label_class: 'mb-1',
            textarea_size: null,
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: '№№ Ведомостей',
            textarea_maxlength: null,
            textarea_placeholder: 'xxxx;xxxx',
            textarea_required: null,
            textarea_readonly: false,
            input_group: true,
            input_group_prepend_class: null,
            input_group_prepend_objs: [],
            input_group_append_class: null,
            input_group_append_objs: [],
            input_group_obj_form: null,
        });
        var iga_arr = textarea_arr.$element.find('div.input-group-append');
        iga_arr.append(button_arr.$button);
        row1_arr.$row.append(textarea_arr.$element);
        var row2_arr = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var col2_arr = new this.fe_ui.bs_col({
            id: null,
            size: 'xl',
            col: 12,
            class: null,
        });
        var div_table_searsh_docs_arr = new this.fe_ui.div({
            class: null,
            id: 'adoption-searsh-docs',
        });
        this.$bt_search_car_arr = button_arr.$button;
        this.element_textarea_docs_arr = textarea_arr.element;
        $arr_searsh.append(row1_arr.$row).append(row2_arr.$row.append(col2_arr.$col.append(div_table_searsh_docs_arr.$div)));
        // Добавим панель в карточку
        card_arr.$header.append(nav_tabs_arr.$ul);
        card_arr.$body.append(nav_tabs_arr.$content);
        //--- Окно Отправка --------------------------------
        var card_out = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_out', App.Langs),
        });
        var nav_tabs_out = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-out',
            class_nav: null,
            id_content: 'tab-out-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'out-report',
                    aria_controls: 'out-report-tab',
                    label: 'Отчет',
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-searsh',
                    aria_controls: 'out-searsh-tab',
                    label: 'Поиск',
                    disable: false,
                    click: null,
                },
            ],
        });     // Переключатели панелей карточки
        //---- Панель "Отчет"
        var $out_report = nav_tabs_out.$content.find('div#out-report-tab'); // Панель отчета
        $out_report.append($('<div id="outgoing-sostav-all"></div>')).append($('<div id="outgoing-sostav-detali"></div>')); // Добавим div для таблиц
        //---- Панель "Поиск по ..."
        var $out_searsh = nav_tabs_out.$content.find('div#out-searsh-tab'); // Панель поиска
        // Создать макет панели для поиска
        var row1_out = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var button_out = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: null,
            id: 'search_car',
            label: null,
            title: '',
            icon_left: null,
            icon_right: 'fas fa-search',
            click: function (event) {
                event.preventDefault();
                this.action_search_outgoing_docs();
            }.bind(this),
        });
        var textarea_out = new this.fe_ui.bs_textarea({
            id: 'list_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: '№№ Ведомостей',
            label_class: 'mb-1',
            textarea_size: null,
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: '№№ Ведомостей',
            textarea_maxlength: null,
            textarea_placeholder: 'xxxx;xxxx',
            textarea_required: null,
            textarea_readonly: false,
            input_group: true,
            input_group_prepend_class: null,
            input_group_prepend_objs: [],
            input_group_append_class: null,
            input_group_append_objs: [],
            input_group_obj_form: null,
        });
        var iga_out = textarea_out.$element.find('div.input-group-append');
        iga_out.append(button_out.$button);
        row1_out.$row.append(textarea_out.$element);
        var row2_out = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var col2_out = new this.fe_ui.bs_col({
            id: null,
            size: 'xl',
            col: 12,
            class: null,
        });
        var div_table_searsh_docs_out = new this.fe_ui.div({
            class: null,
            id: 'outgoing-searsh-docs',
        });
        this.$bt_search_car_out = button_out.$button;
        this.element_textarea_docs_out = textarea_out.element;
        $out_searsh.append(row1_out.$row).append(row2_out.$row.append(col2_out.$col.append(div_table_searsh_docs_out.$div)));
        // Добавим панель в карточку
        card_out.$header.append(nav_tabs_out.$ul);
        card_out.$body.append(nav_tabs_out.$content);
        //----- Карточка вагоны без оператора
        var card_wag_not_oper = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1 mt-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_not_oper', App.Langs),
        });
        card_wag_not_oper.$body.append($('<div id="adoption-wagon-not-operation"></div>'));
        // Добавим форму отчета на основное окно
        div_row1.$row.append(div_col1.$col.append(card_arr.$card)).append(div_col2.$col.append(card_out.$card));
        this.$main_report.append(div_row1.$row).append(div_row2.$row.append(div_col3.$col.append(card_wag_not_oper.$card)));

        // Запускаем 6 процесса инициализации (паралельно)
        var process = 7;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                // 
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {
                        case 'arr-report': {
                            this.form_panel.$form.addClass('d-flex').show();
                            break;
                        };
                        case 'arr-searsh': {
                            this.form_panel.$form.removeClass('d-flex').hide();
                            break;
                        };
                        case 'out-report': {
                            this.form_panel.$form.addClass('d-flex').show();
                            break;
                        };
                        case 'out-searsh': {
                            this.form_panel.$form.removeClass('d-flex').hide();
                            break;
                        };
                    };
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    //event.target // newly activated tab
                    //event.relatedTarget // previous active tab
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        //
        this.table_adop_sostav_all = new TTDR('div#adoption-sostav-all');               // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_adop_sostav_all.init({
            alert: null,
            detali_table: false,
            type_report: 'adoption_sostav',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                    this.table_adop_sostav_detali.view(rows[0].adoption_sostav);
                    LockScreenOff();
                } else {
                    this.table_adop_sostav_detali.view([]);
                    LockScreenOff();
                }
            }.bind(this),
        });

        this.table_adop_sostav_detali = new TTDR('div#adoption-sostav-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_adop_sostav_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        this.table_adop_searsh_docs = new TTDR('div#adoption-searsh-docs');              // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_adop_searsh_docs.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });
        //
        this.table_outg_sostav_all = new TTDR('div#outgoing-sostav-all');               // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_outg_sostav_all.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_sostav',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0 && rows[0].outgoing_sostav && rows[0].outgoing_sostav.length > 0) {
                    this.table_outg_sostav_detali.view(rows[0].outgoing_sostav);
                    LockScreenOff();
                } else {
                    this.table_outg_sostav_detali.view([]);
                    LockScreenOff();
                }
            }.bind(this),
        });

        this.table_outg_sostav_detali = new TTDR('div#outgoing-sostav-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_outg_sostav_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'outgoing_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        this.table_outg_searsh_docs = new TTDR('div#outgoing-searsh-docs');              // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_outg_searsh_docs.init({
            alert: null,
            detali_table: true,
            type_report: 'outgoing_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });

        this.table_adop_wagon_not_operation = new TTDR('div#adoption-wagon-not-operation');              // Создадим экземпляр
        // Инициализация модуля "Таблица вагонов без оператора"
        this.table_adop_wagon_not_operation.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_wagon_not_operation',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });

    };
    // Показать отчет  "Статистика"
    view_td_report.prototype.view_report_1_1 = function (start, stop) {
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 3;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);

        LockScreen(langView('vtdr_load_adoption_sostav', App.Langs));
        // Прибытие
        this.ids_wsd.getReportAdoptionSostavOfPeriod(start, stop, function (result_sostav) {
            this.adoption_sostav = result_sostav;
            var adoption_sostav = [];

            this.vs_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 6 || i.id_station_on === 7 || i.id_station_on === 8;
            });
            this.nb_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 19;
            });
            this.pr_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 27;
            });
            this.kr_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 10;
            });

            adoption_sostav.push(this.get_adoption_sostav('Восточная', this.vs_adoption_sostav, 0));
            adoption_sostav.push(this.get_adoption_sostav('Промышленная', this.pr_adoption_sostav, 0));
            adoption_sostav.push(this.get_adoption_sostav('Новобункерная', this.nb_adoption_sostav, 0));
            adoption_sostav.push(this.get_adoption_sostav('Кирова', this.kr_adoption_sostav, 1));

            this.table_adop_sostav_all.view(adoption_sostav);
            process_load--;
            out_load(process_load);

        }.bind(this));
        // Отправка
        this.ids_wsd.getReportOutgoingSostavOfPeriod(start, stop, function (result_sostav) {
            this.outgoing_sostav = result_sostav;
            var outgoing_sostav = [];

            this.vs_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 6 || i.id_station_from === 7 || i.id_station_from === 8;
            });
            this.nb_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 19;
            });
            this.pr_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 27;
            });
            this.kr_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 10;
            });

            outgoing_sostav.push(this.get_outgoing_sostav('Восточная', this.vs_outgoing_sostav, 0));
            outgoing_sostav.push(this.get_outgoing_sostav('Промышленная', this.pr_outgoing_sostav, 0));
            outgoing_sostav.push(this.get_outgoing_sostav('Новобункерная', this.nb_outgoing_sostav, 0));
            outgoing_sostav.push(this.get_outgoing_sostav('Кирова', this.kr_outgoing_sostav, 1));

            this.table_outg_sostav_all.view(outgoing_sostav);
            process_load--;
            out_load(process_load);

        }.bind(this));
        // пустые операторы
        this.ids_wsd.getReportAdoptionWagonNotOperationOfPeriod(start, stop, function (result_wagons) {
            this.wagons_not_operation = result_wagons;
            this.table_adop_wagon_not_operation.view(this.wagons_not_operation);
            process_load--;
            out_load(process_load);

        }.bind(this));
    };
    // Получим строку для отчета
    view_td_report.prototype.get_adoption_sostav = function (station_name, list_sostav, type) {
        if (list_sostav === null) return null;
        var count_wagon = 0;
        var count_account_balance = 0;
        var count_not_operator = 0;
        $.each(list_sostav, function (i, s) {
            count_wagon += s.count_wagon;
            count_account_balance += s.count_account_balance;
            count_not_operator += s.count_not_operator;
        });
        return { type: type, station: station_name, count_wagon: count_wagon, count_account_balance: count_account_balance, count_not_operator: count_not_operator, adoption_sostav: list_sostav }
    };
    // Получим строку для отчета отправка
    view_td_report.prototype.get_outgoing_sostav = function (station_name, list_sostav, type) {
        if (list_sostav === null) return null;
        var count_wagon = 0;
        var count_account_balance = 0;
        $.each(list_sostav, function (i, s) {
            count_wagon += s.count_wagon;
            count_account_balance += s.count_account_balance;
        });
        return { type: type, station: station_name, count_wagon: count_wagon, count_account_balance: count_account_balance, outgoing_sostav: list_sostav }
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_1_1 = function () {
        if (this.table_adop_sostav_all) this.table_adop_sostav_all.view([]);
        if (this.table_adop_sostav_detali) this.table_adop_sostav_detali.view([]);
        if (this.table_outg_sostav_all) this.table_outg_sostav_all.view([]);
        if (this.table_outg_sostav_detali) this.table_outg_sostav_detali.view([]);
        if (this.table_adop_wagon_not_operation) this.table_adop_wagon_not_operation.view([]);
        LockScreenOff();
    };
    // Поиск по номеру документа
    view_td_report.prototype.action_search_adoption_docs = function () {
        this.out_clear();
        this.$bt_search_car_arr.prop("disabled", true); // сделаем не активной
        var list_docs = this.element_textarea_docs_arr.val();
        var nums = is_valid_docs(list_docs, this.alert);
        if (nums) {
            LockScreen(langView('vtdr_mess_operation_run', App.Langs));
            this.ids_wsd.getReportAdoptionSostavOfDocs(nums, function (result) {
                if (result !== null) {
                    this.table_adop_searsh_docs.view(result);
                    LockScreenOff();
                } else {
                    this.mf_edit.out_warning(langView('vtdr_mess_error_search_docs', App.Langs).format(result.result));
                }
                this.$bt_search_car_arr.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }.bind(this));
        } else {
            this.$bt_search_car_arr.prop("disabled", false); // сделаем активной
        };
    }
    // Поиск по номеру документа
    view_td_report.prototype.action_search_outgoing_docs = function () {
        this.out_clear();
        this.$bt_search_car_out.prop("disabled", true); // сделаем не активной
        var list_docs = this.element_textarea_docs_out.val();
        var nums = is_valid_docs(list_docs, this.alert);
        if (nums) {
            LockScreen(langView('vtdr_mess_operation_run', App.Langs));
            this.ids_wsd.getReportOutgoingSostavOfDocs(nums, function (result) {
                if (result !== null) {
                    this.table_outg_searsh_docs.view(result);
                    LockScreenOff();
                } else {
                    this.mf_edit.out_warning(langView('vtdr_mess_error_search_docs', App.Langs).format(result.result));
                }
                this.$bt_search_car_out.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }.bind(this));
        } else {
            this.$bt_search_car_out.prop("disabled", false); // сделаем активной
        };
    }
    //----------------------------------------------------------
    // Инициализировать отчет "Отчет по прибытию (общий)"
    view_td_report.prototype.init_report_2_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 2; // номер отчета
        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_2_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
        //------
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);
        //
        var div_row1 = new this.fe_ui.bs_row();
        var div_row2 = new this.fe_ui.bs_row();
        this.$table_view.append(div_row1.$row.append($('<div id="report-group"></div>'))).append(div_row2.$row.append($('<div id="report-detali"></div>')))
        //
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);


        //this.table_adop_sostav_all = new TTDR('div#adoption-sostav-all');               // Создадим экземпляр
        //// Инициализация модуля "Таблица прибывающих составов"
        //this.table_adop_sostav_all.init({
        //    alert: null,
        //    detali_table: false,
        //    type_report: 'adoption_sostav',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //    fn_select_rows: function (rows) {
        //        if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
        //            this.table_adop_sostav_detali.view(rows[0].adoption_sostav);
        //            LockScreenOff();
        //        } else {
        //            this.table_adop_sostav_detali.view([]);
        //            LockScreenOff();
        //        }
        //    }.bind(this),
        //});

        //this.table_adop_sostav_detali = new TTDR('div#adoption-sostav-detali');         // Создадим экземпляр
        //// Инициализация модуля "Таблица прибывающих составов"
        //this.table_adop_sostav_detali.init({
        //    alert: null,
        //    detali_table: true,
        //    type_report: 'adoption_sostav_detali',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //});

        //this.table_adop_searsh_docs = new TTDR('div#adoption-searsh-docs');              // Создадим экземпляр
        //// Инициализация модуля "Таблица прибывающих составов"
        //this.table_adop_searsh_docs.init({
        //    alert: null,
        //    detali_table: true,
        //    type_report: 'adoption_sostav_detali',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //    fn_select_rows: function (rows) {
        //        //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
        //        //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
        //        //} else {
        //        //    this.table_adop_sostav_detali.view([]);
        //        //}
        //    }.bind(this),
        //});
        ////
        //this.table_outg_sostav_all = new TTDR('div#outgoing-sostav-all');               // Создадим экземпляр
        //// Инициализация модуля "Таблица прибывающих составов"
        //this.table_outg_sostav_all.init({
        //    alert: null,
        //    detali_table: false,
        //    type_report: 'outgoing_sostav',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //    fn_select_rows: function (rows) {
        //        if (rows && rows.length > 0 && rows[0].outgoing_sostav && rows[0].outgoing_sostav.length > 0) {
        //            this.table_outg_sostav_detali.view(rows[0].outgoing_sostav);
        //            LockScreenOff();
        //        } else {
        //            this.table_outg_sostav_detali.view([]);
        //            LockScreenOff();
        //        }
        //    }.bind(this),
        //});

        //this.table_outg_sostav_detali = new TTDR('div#outgoing-sostav-detali');         // Создадим экземпляр
        //// Инициализация модуля "Таблица прибывающих составов"
        //this.table_outg_sostav_detali.init({
        //    alert: null,
        //    detali_table: true,
        //    type_report: 'outgoing_sostav_detali',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //});

        //this.table_outg_searsh_docs = new TTDR('div#outgoing-searsh-docs');              // Создадим экземпляр
        //// Инициализация модуля "Таблица прибывающих составов"
        //this.table_outg_searsh_docs.init({
        //    alert: null,
        //    detali_table: true,
        //    type_report: 'outgoing_sostav_detali',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //    fn_select_rows: function (rows) {
        //        //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
        //        //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
        //        //} else {
        //        //    this.table_adop_sostav_detali.view([]);
        //        //}
        //    }.bind(this),
        //});

        //this.table_adop_wagon_not_operation = new TTDR('div#adoption-wagon-not-operation');              // Создадим экземпляр
        //// Инициализация модуля "Таблица вагонов без оператора"
        //this.table_adop_wagon_not_operation.init({
        //    alert: null,
        //    detali_table: true,
        //    type_report: 'adoption_wagon_not_operation',     //
        //    link_num: false,
        //    ids_wsd: null,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //    fn_action_view_detali: function (rows) {

        //    },
        //    fn_select_rows: function (rows) {
        //        //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
        //        //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
        //        //} else {
        //        //    this.table_adop_sostav_detali.view([]);
        //        //}
        //    }.bind(this),
        //});

    };

    // Очистить таблицы
    view_td_report.prototype.clear_report_2_1 = function () {
        //if (this.table_adop_sostav_all) this.table_adop_sostav_all.view([]);
        //if (this.table_adop_sostav_detali) this.table_adop_sostav_detali.view([]);
        //if (this.table_outg_sostav_all) this.table_outg_sostav_all.view([]);
        //if (this.table_outg_sostav_detali) this.table_outg_sostav_detali.view([]);
        //if (this.table_adop_wagon_not_operation) this.table_adop_wagon_not_operation.view([]);
        LockScreenOff();
    };
    //------------------------------------------------------------------------------------------------
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
        if (this.table_adop_sostav_all) {
            this.table_adop_sostav_all.destroy();
            this.table_adop_sostav_all = null;
        }
        // Очистить таблицы
        if (this.table_adop_sostav_detali) {
            this.table_adop_sostav_detali.destroy();
            this.table_adop_sostav_detali = null;
        }
    };

    App.view_td_report = view_td_report;

    window.App = App;
})(window);