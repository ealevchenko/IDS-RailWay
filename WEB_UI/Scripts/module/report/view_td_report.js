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
            'vtdr_link_title_report_3_1': 'Прибытие ИТОГ',


            'vtdr_title_report_1_1': 'Статистика {0}',
            'vtdr_title_report_2_1': 'Отчет по прибытию (общий) {0}',
            'vtdr_title_report_3_1': 'Прибытие ИТОГ {0}',

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

            'vtdr_card_header_chart': 'ДИАГРАМА',
            'vtdr_card_header_table': 'ДАННЫЕ',

            'vtdr_load_adoption_cars': 'Выполняю операцию выборка принятых вагонов ...',

            'vtdr_load_select_cars': 'Выполняю операцию выборка вагонов ...',

            'vtdr_label_button_setup_clear': 'СБРОСИТЬ',
            'vtdr_label_button_setup_select': 'ВЫБРАТЬ',
            'vtdr_label_laden': 'Только с грузом',
            'vtdr_label_accounting': 'Учетные вагоны',
            'vtdr_label_client': 'Клиентура',
            'vtdr_label_not_client': 'Без учета клиентуры',
            'vtdr_label_paid': 'Платные',

            'vtdr_label_wagon_nums': '№№ ваг:',
            'vtdr_title_wagon_nums': 'Введите номера вагонов',
            'vtdr_label_main_epd_docs': '№№ Основного ЭПД:',
            'vtdr_title_main_epd_docs': 'Введите номера основных ЭПД',
            'vtdr_label_epd_docs': '№№ Досылочного ЭПД:',
            'vtdr_title_epd_docs': 'Введите номера досылочных ЭПД',
            'vtdr_label_operation_amkr': 'Оператор АМКР:',
            'vtdr_title_operation_amkr': 'Оператор АМКР',
            'vtdr_label_limiting': 'Огр. ПОГР:',
            'vtdr_title_limiting': 'Огр. ПОГР',
            'vtdr_label_owners': 'Собственник:',
            'vtdr_title_owners': 'Собственник',
            'vtdr_label_station_from': 'Станция отправления:',
            'vtdr_title_station_from': 'Станция отправления',
            'vtdr_label_cargo': 'Груз ПРИБ:',
            'vtdr_title_cargo': 'Груз ПРИБ',
            'vtdr_label_certification_data': 'Сертификатные данные:',
            'vtdr_title_certification_data': 'Сертификатные данные',
            'vtdr_label_cargo_sap': 'Код груза ПРИБ SAP:',
            'vtdr_title_cargo_sap': 'Код груза ПРИБ SAP',
            'vtdr_label_group_arrival': 'Группа ПРИБ:',
            'vtdr_title_group_arrival': 'Группа ПРИБ',
            'vtdr_label_consignee': 'Грузополучатель:',
            'vtdr_title_consignee': 'Грузополучатель',
            'vtdr_label_division': 'Цех-получатель:',
            'vtdr_title_division': 'Цех-получатель',
            'vtdr_label_genus': 'Род вагона:',
            'vtdr_title_genus': 'Род вагона',
            'vtdr_label_condition': 'Разметка по прибытию:',
            'vtdr_title_condition': 'Разметка по прибытию',
            'vtdr_label_payer_name': 'Плательщик ПРИБ:',
            'vtdr_title_payer_name': 'Плательщик ПРИБ',
            'vtdr_label_payer_code': 'Код плат. ПРИБ:',
            'vtdr_title_payer_code': 'Код плат. ПРИБ',
            'vtdr_label_station_amkr': 'Станция примыкания:',
            'vtdr_title_station_amkr': 'Станция примыкания',

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
    var directory = App.ids_directory;
    var wsd = App.ids_wsd;
    var FIL = App.form_inline;
    var TTDR = App.table_td_report;
    var CAM = App.chart_amcharts;
    // асинхронно добавим распарсеный ЭПД
    var wagons_get_epd_async = function (row, callback) {
        var base = this;
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            }
            return 0;
        }
        function GetEPDWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    this.ids_wsd.getOTPR_UZ_DOCOfNum(row[i].arrival_car_num_doc, function (doc_uz_sms) {
                        row[i].otpr = null;
                        if (doc_uz_sms !== null) {
                            // Получим дату отправки
                            row[i].otpr = doc_uz_sms;
                        };
                        GetEPDWagonsAsync.call(this, i + 1);
                    }.bind(this));
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        GetEPDWagonsAsync.call(this, 0);
    };
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
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_td_report.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
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
            ids_dir: null,
            fn_init: null,
        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();

        this.elements = {}; // Все элементы формы

        this.report = null;         // Номер выбранного отчета
        this.report_panel = null;   // Номер выбранного панели отчета
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

        this.wagons_not_operation = [];

        this.wagons_adoption = [];
        this.clone_wagons_adoption = [];
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
            {
                text: langView('vtdr_link_title_report_3_1', App.Langs),
                icon: 'fa-sharp fa-solid fa-chart-simple mr-1',
                click: function () {
                    this.init_report_3_1();
                }.bind(this),
            },
            //<i class="fa-sharp fa-solid fa-chart-simple"></i>
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
            case 3: this.clear_report_3_1(); break;
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
                // за месяц
                if (date) {
                    this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                    message_report = langView('vtdr_title_report_type_3', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 4: {
                // Произвольный выбор
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
            case 3: this.$title_report.text(langView('vtdr_title_report_3_1', App.Langs).format(message_report)); break;
        }

    };
    // Показать отчет
    view_td_report.prototype.view_report = function () {
        switch (this.report) {
            case 1: {
                this.view_report_1_1(this.start, this.stop);
                break;
            }
            case 2: {
                this.view_report_2_1(this.start, this.stop);
                break;
            }
            case 3: {
                this.view_report_3_1(this.start, this.stop);
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
        });
        // Карточка прибытия
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
        this.init_select_report();                                                     // Инициализация формы выбора периода отчетов
        //$('#example-getting-started').multiselect();
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db(['operators_wagons'], false, function (result) {

        //    this.list_operators_wagons = this.ids_dir.getListOperatorsWagons('id', 'abbr', App.Lang);

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

        // Создадим панель выбора
        var nav_tabs_arr_cammon = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-arr-common',
            class_nav: null,
            id_content: 'tab-arr-common-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'arr-common-report',
                    aria_controls: 'arr-common-group-tab',
                    label: 'По грузам',
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-common-searsh',
                    aria_controls: 'arr-common-detali-tab',
                    label: 'Детально',
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        // Закладка групповой отчет
        var div_row_cg = $('<div></div>', {
            class: 'row',
            style: 'margin-top: 10px;'
        });
        this.$div_group_sostav = $('<div></div>', {
            id: 'group-sostav',
            class: 'col-xl-12'
        });
        var $arr_common_group = nav_tabs_arr_cammon.$content.find('div#arr-common-group-tab'); // Панель отчета
        $arr_common_group.append(div_row_cg.append(this.$div_group_sostav)); // Добавим div для таблиц
        // Закладка отчет детально 
        var div_row_detali = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        var $arr_common_detali = nav_tabs_arr_cammon.$content.find('div#arr-common-detali-tab'); // Панель поиска
        $arr_common_detali.append(div_row_detali.$row.append($('<div id="arr-common-report-detali" class="col-xl-12"></div>')));
        // Дабавим закладку на форму
        this.$table_view.append(nav_tabs_arr_cammon.$ul).append(nav_tabs_arr_cammon.$content);
        //
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------
        // Формируем форму выбора
        var form_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_select = form_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_2_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_2_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        //
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_laden = new this.fe_ui.bs_switch({
            id: 'laden',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_laden', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_laden.$element);
        this.switch_laden = sw_laden.element;
        // Только с грузом
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_accounting = new this.fe_ui.bs_switch({
            id: 'accounting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_accounting', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_accounting.$element);
        this.switch_accounting = sw_accounting.element;
        // Клиентура 
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_client = new this.fe_ui.bs_switch({
            id: 'client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_client.$element);
        this.switch_client = sw_client.element;
        // Без учета клиентуры
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_not_client = new this.fe_ui.bs_switch({
            id: 'not_client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_not_client.$element);
        this.switch_not_client = sw_not_client.element;
        // Платные
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // вагоны
        var row_setup_1 = new this.fe_ui.bs_row();
        var ta_wagon_nums = new this.fe_ui.bs_textarea({
            id: 'wagon_nums',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_wagon_nums', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_wagon_nums', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_1.$row.append(ta_wagon_nums.$element);
        this.textarea_wagon_nums = ta_wagon_nums.element;
        // основн документы
        var row_setup_2 = new this.fe_ui.bs_row();
        var ta_main_epd_docs = new this.fe_ui.bs_textarea({
            id: 'main_epd_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_main_epd_docs', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_main_epd_docs', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_2.$row.append(ta_main_epd_docs.$element);
        this.textarea_main_epd_docs = ta_main_epd_docs.element;
        // досылочные документы
        var row_setup_3 = new this.fe_ui.bs_row();
        var ta_epd_docs = new this.fe_ui.bs_textarea({
            id: 'epd_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_epd_docs', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_epd_docs', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_3.$row.append(ta_epd_docs.$element);
        this.textarea_epd_docs = ta_epd_docs.element;
        // Операторы АМКР
        var row_setup_4 = new this.fe_ui.bs_row();
        var select_operation_amkr = new this.fe_ui.bs_select_multiple({
            id: 'operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {
                //if (value && Number(value) >= 0) {
                //    this.elements.input_number_consignee_code.val(value);
                //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                //} else {
                //    this.elements.input_number_consignee_code.val("");
                //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                //}
            }.bind(this),
        });
        row_setup_4.$row.append(select_operation_amkr.$element);
        this.select_operation_amkr = select_operation_amkr.element;
        // ограничение погрузки
        var row_setup_5 = new this.fe_ui.bs_row();
        var select_limiting = new this.fe_ui.bs_select_multiple({
            id: 'limiting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_limiting', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_limiting', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_5.$row.append(select_limiting.$element);
        this.select_limiting = select_limiting.element;
        // Собственник
        var row_setup_6 = new this.fe_ui.bs_row();
        var select_owners = new this.fe_ui.bs_select_multiple({
            id: 'owners',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_owners', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_owners', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_6.$row.append(select_owners.$element);
        this.select_owners = select_owners.element;
        // Станция отправления
        var row_setup_7 = new this.fe_ui.bs_row();
        var select_station_from = new this.fe_ui.bs_select_multiple({
            id: 'station_from',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_from', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_from', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_7.$row.append(select_station_from.$element);
        this.select_station_from = select_station_from.element;
        // Груз
        var row_setup_8 = new this.fe_ui.bs_row();
        var select_cargo = new this.fe_ui.bs_select_multiple({
            id: 'cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_8.$row.append(select_cargo.$element);
        this.select_cargo = select_cargo.element;
        // Сертификатные данные
        var row_setup_9 = new this.fe_ui.bs_row();
        var select_certification_data = new this.fe_ui.bs_select_multiple({
            id: 'certification_data',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_certification_data', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_certification_data', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_9.$row.append(select_certification_data.$element);
        this.select_certification_data = select_certification_data.element;
        // Код груза ПРИБ SAP
        var row_setup_10 = new this.fe_ui.bs_row();
        var select_cargo_sap = new this.fe_ui.bs_select_multiple({
            id: 'cargo_sap',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo_sap', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo_sap', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_10.$row.append(select_cargo_sap.$element);
        this.select_cargo_sap = select_cargo_sap.element;
        // Группа ПРИБ
        var row_setup_11 = new this.fe_ui.bs_row();
        var select_group_arrival = new this.fe_ui.bs_select_multiple({
            id: 'group_arrival',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_group_arrival', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_group_arrival', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_11.$row.append(select_group_arrival.$element);
        this.select_group_arrival = select_group_arrival.element;
        // Грузополучатель
        var row_setup_12 = new this.fe_ui.bs_row();
        var select_consignee = new this.fe_ui.bs_select_multiple({
            id: 'consignee',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_consignee', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_consignee', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_12.$row.append(select_consignee.$element);
        this.select_consignee = select_consignee.element;
        // Цех-получатель
        var row_setup_13 = new this.fe_ui.bs_row();
        var select_division = new this.fe_ui.bs_select_multiple({
            id: 'division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_13.$row.append(select_division.$element);
        this.select_division = select_division.element;
        // Цех-получатель
        var row_setup_14 = new this.fe_ui.bs_row();
        var select_genus = new this.fe_ui.bs_select_multiple({
            id: 'genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_14.$row.append(select_genus.$element);
        this.select_genus = select_genus.element;
        // Разметка по прибытию
        var row_setup_15 = new this.fe_ui.bs_row();
        var select_condition = new this.fe_ui.bs_select_multiple({
            id: 'condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_15.$row.append(select_condition.$element);
        this.select_condition = select_condition.element;
        // Плательщик ПРИБ
        var row_setup_16 = new this.fe_ui.bs_row();
        var select_payer_name = new this.fe_ui.bs_select_multiple({
            id: 'payer_name',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_payer_name', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_payer_name', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_16.$row.append(select_payer_name.$element);
        this.select_payer_name = select_payer_name.element;
        // Код плат. ПРИБ
        var row_setup_17 = new this.fe_ui.bs_row();
        var select_payer_code = new this.fe_ui.bs_select_multiple({
            id: 'payer_code',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_payer_code', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_payer_code', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_17.$row.append(select_payer_code.$element);
        this.select_payer_code = select_payer_code.element;
        // Станция примыкания
        var row_setup_18 = new this.fe_ui.bs_row();
        var select_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_18.$row.append(select_station_amkr.$element);
        this.select_station_amkr = select_station_amkr.element;
        //
        this.$form_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup_1.$row)
            .append(row_setup_2.$row)
            .append(row_setup_3.$row)
            .append(row_setup_4.$row)
            .append(row_setup_5.$row)
            .append(row_setup_6.$row)
            .append(row_setup_7.$row)
            .append(row_setup_8.$row)
            .append(row_setup_9.$row)
            .append(row_setup_10.$row)
            .append(row_setup_11.$row)
            .append(row_setup_12.$row)
            .append(row_setup_13.$row)
            .append(row_setup_14.$row)
            .append(row_setup_15.$row)
            .append(row_setup_16.$row)
            .append(row_setup_17.$row)
            .append(row_setup_18.$row)
            ;
        this.$setup_select.append(this.$form_setup_select);

        // Запускаем 6 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {
                        case 'arr-common-report': {

                            break;
                        };
                        case 'arr-common-searsh': {

                            break;
                        };
                    };
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);

        this.table_arr_common_detali = new TTDR('div#arr-common-report-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_arr_common_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_common_detali',     //
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

        /*}.bind(this));*/
    };
    // Показать отчет  "Отчет по прибытию (общий)"
    view_td_report.prototype.view_report_2_1 = function (start, stop) {
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_adoption_cars', App.Langs));

        //var d = moment.utc(start).toISOString();
        //var d1 = moment(start).format(format_datetime);
        //var d2 = moment(start).toISOString();
        //var w = moment().utc().format();
        //var w1 = moment().format();
        // пустые операторы
        var where = {
            start: moment(start).format(format_datetime),
            stop: moment(stop).format(format_datetime),
            laden: false,
            accounting: false,
            client: false,
            not_client: false,
            paid: false,
            nums: null,
            nom_main_docs: null,
            nom_docs: null,
            id_operator: null,
            id_limiting: null,
            id_owner: null,
            code_stn_from: null,
            id_cargo: null,
            id_certification_data: null,
            supply_cargo_code: null,
            id_group_cargo: null,
            code_consignee: null,
            id_division: null,
            id_genus: null,
            id_condition: null,
            code_payer_arrival: null,
            code_payer_arrival_name: null,
            id_station_on: null,
        };
        // Загрузим данные
        this.load_select_report_2_1(where, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные
    view_td_report.prototype.load_select_report_2_1 = function (where, callback) {
        if (!where) {
            var cur_where = {
                start: moment(this.start).format(format_datetime),
                stop: moment(this.stop).format(format_datetime),
                laden: this.switch_laden.val(),
                accounting: this.switch_accounting.val(),
                client: this.switch_client.val(),
                not_client: this.switch_not_client.val(),
                paid: this.switch_paid.val(),
                nums: this.nums,
                nom_main_docs: this.main_epd_docs,
                nom_docs: this.epd_docs,
                id_operator: this.select_operation_amkr.val(),
                id_limiting: this.select_limiting.val(),
                id_owner: this.select_owners.val(),
                code_stn_from: this.select_station_from.val(),
                id_cargo: this.select_cargo.val(),
                id_certification_data: this.select_certification_data.val(),
                supply_cargo_code: this.select_cargo_sap.val(),
                id_group_cargo: this.select_group_arrival.val(),
                code_consignee: this.select_consignee.val(),
                id_division: this.select_division.val(),
                id_genus: this.select_genus.val(),
                id_condition: this.select_condition.val(),
                code_payer_arrival: this.select_payer_name.val(),
                code_payer_arrival_name: this.select_payer_code.val(),
                id_station_on: this.select_station_amkr.val(),
            };
        } else {
            cur_where = where;
        };
        this.ids_wsd.postReportAdoptionWagonOfWhere(cur_where, function (result_wagons) {
            this.wagons_adoption = result_wagons;
            // Обновим спсисок вагонов распарсиным ЭПД
            wagons_get_epd_async.call(this, this.wagons_adoption, function () {
                // Проверим если это выбор толко по времени (первый выбор) тогда клонируем
                if (where) {
                    this.clone_wagons_adoption = JSON.parse(JSON.stringify(this.wagons_adoption));
                }
                // Обработать и показать данные
                this.process_data_view_report_2_1(this.wagons_adoption, cur_where);
                // Выход
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        }.bind(this));
    };
    // Обработать и показать данные
    view_td_report.prototype.process_data_view_report_2_1 = function (wagons_adoption, where) {
        // Продолжим
        this.list_operators_wagons = [];
        this.list_limiting = [];
        this.list_owners = [];
        this.list_station_from = [];
        this.list_cargo = [];
        this.list_certification_data = [];
        this.list_cargo_sap = [];
        this.list_group_arrival = [];
        this.list_consignee = [];
        this.list_division = [];
        this.list_genus = [];
        this.list_condition = [];
        this.list_payer_name = [];
        this.list_payer_code = [];
        this.list_station_amkr = [];
        this.list_group_sostav = [];
        // выборка для списков отчета

        $.each(wagons_adoption, function (key, value) {
            //
            var group_sostav = this.list_group_sostav.find(function (o) { return o.id === value.arrival_sostav_id }.bind(this));
            if (!group_sostav) {
                var sostav = wagons_adoption.filter(function (i) { return i.arrival_sostav_id === value.arrival_sostav_id }.bind(this));
                var sostav_cargo = [];
                $.each(sostav, function (i, el) {
                    var cargo = sostav_cargo.find(function (o) { return o.id_cargo === el.arrival_uz_vagon_id_cargo }.bind(this))
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    if (!cargo) {
                        sum_vesg = 0;
                        sum_vesg_reweighing = 0;
                        var cargo_list = sostav.filter(function (i) { return i.arrival_uz_vagon_id_cargo === el.arrival_uz_vagon_id_cargo }.bind(this));
                        // Проссумируем 
                        $.each(cargo_list, function (i1, el1) {
                            sum_vesg += el1.arrival_uz_vagon_vesg ? el1.arrival_uz_vagon_vesg : 0;
                            sum_vesg_reweighing = + el1.arrival_uz_vagon_vesg_reweighing ? el1.arrival_uz_vagon_vesg_reweighing : 0;
                        }.bind(this));
                        sostav_cargo.push({ id_cargo: el.arrival_uz_vagon_id_cargo, cargo_name: el['arrival_uz_vagon_cargo_name_' + App.Lang], count: cargo_list.length, sum_vesg: sum_vesg, sum_vesg_reweighing: sum_vesg_reweighing });
                    };
                }.bind(this));
                this.list_group_sostav.push({ id: value.arrival_sostav_id, date_adoption: value.arrival_sostav_date_adoption, const_wagon: sostav.length, count_account_balance_wagon: sostav.filter(function (i) { return i.account_balance }.bind(this)).length, cargo_group: sostav_cargo });

            }
            // выборка для списков отчета
            var ow = this.list_operators_wagons.find(function (o) { return o.value === value.arrival_uz_vagon_arrival_wagons_rent_id_operator }.bind(this));
            if (!ow) {
                this.list_operators_wagons.push({ value: value.arrival_uz_vagon_arrival_wagons_rent_id_operator, text: value['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang] });
            }
            var lm = this.list_limiting.find(function (o) { return o.value === value.arrival_uz_vagon_arrival_wagons_rent_id_limiting }.bind(this));
            if (!lm) {
                this.list_limiting.push({ value: value.arrival_uz_vagon_arrival_wagons_rent_id_limiting, text: value['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang] });
            }
            var own = this.list_owners.find(function (o) { return o.value === value.arrival_uz_vagon_id_owner }.bind(this));
            if (!own) {
                this.list_owners.push({ value: value.arrival_uz_vagon_id_owner, text: value['arrival_uz_vagon_owner_wagon_abbr_' + App.Lang] });
            }
            var stfr = this.list_station_from.find(function (o) { return o.value === value.arrival_uz_document_code_stn_from }.bind(this));
            if (!stfr) {
                this.list_station_from.push({ value: value.arrival_uz_document_code_stn_from, text: value['arrival_uz_document_station_from_name_' + App.Lang] });
            }
            var crg = this.list_cargo.find(function (o) { return o.value === value.arrival_uz_vagon_id_cargo }.bind(this));
            if (!crg) {
                this.list_cargo.push({ value: value.arrival_uz_vagon_id_cargo, text: value['arrival_uz_vagon_cargo_name_' + App.Lang] });
            }
            var srtdt = this.list_certification_data.find(function (o) { return o.value === value.arrival_uz_vagon_id_certification_data }.bind(this));
            if (!srtdt) {
                this.list_certification_data.push({ value: value.arrival_uz_vagon_id_certification_data, text: value['arrival_uz_vagon_sertification_data_' + App.Lang] });
            }
            var crgsap = this.list_cargo_sap.find(function (o) { return o.value === value.sap_incoming_supply_cargo_code }.bind(this));
            if (!crgsap) {
                this.list_cargo_sap.push({ value: value.sap_incoming_supply_cargo_code, text: value.sap_incoming_supply_cargo_code });
            }
            var grpcrg = this.list_group_arrival.find(function (o) { return o.value === value.arrival_uz_vagon_id_group }.bind(this));
            if (!grpcrg) {
                this.list_group_arrival.push({ value: value.arrival_uz_vagon_id_group, text: value['arrival_uz_vagon_cargo_group_name_' + App.Lang] });
            }
            var cnsg = this.list_consignee.find(function (o) { return o.value === value.arrival_uz_document_code_consignee }.bind(this));
            if (!cnsg) {
                this.list_consignee.push({ value: value.arrival_uz_document_code_consignee, text: value.arrival_uz_document_name_consignee });
            }
            var dvsn = this.list_division.find(function (o) { return o.value === value.arrival_uz_vagon_id_division_on_amkr }.bind(this));
            if (!dvsn) {
                this.list_division.push({ value: value.arrival_uz_vagon_id_division_on_amkr, text: value['arrival_uz_vagon_division_abbr_' + App.Lang] });
            }
            var genus = this.list_genus.find(function (o) { return o.value === value.arrival_uz_vagon_id_genus }.bind(this));
            if (!genus) {
                this.list_genus.push({ value: value.arrival_uz_vagon_id_genus, text: value['arrival_uz_vagon_rod_abbr_' + App.Lang] });
            }
            var condition = this.list_condition.find(function (o) { return o.value === value.arrival_uz_vagon_id_condition }.bind(this));
            if (!condition) {
                this.list_condition.push({ value: value.arrival_uz_vagon_id_condition, text: value['arrival_uz_vagon_condition_abbr_' + App.Lang] });
            }
            var payer_name = this.list_payer_name.find(function (o) { return o.value === value.arrival_uz_document_code_payer_arrival }.bind(this));
            if (!payer_name) {
                this.list_payer_name.push({ value: value.arrival_uz_document_code_payer_arrival, text: value['arrival_uz_document_payer_arrival_name_' + App.Lang] });
            }
            var payer_code = this.list_payer_code.find(function (o) { return o.value === value.arrival_uz_document_code_payer_arrival }.bind(this));
            if (!payer_code) {
                this.list_payer_code.push({ value: value.arrival_uz_document_code_payer_arrival, text: value.arrival_uz_document_code_payer_arrival });
            }
            var station_amkr = this.list_station_amkr.find(function (o) { return o.value === value.arrival_sostav_id_station_on }.bind(this));
            if (!station_amkr) {
                this.list_station_amkr.push({ value: value.arrival_sostav_id_station_on, text: value['arrival_sostav_station_on_abbr_' + App.Lang] });
            }

        }.bind(this));
        //
        this.view_table_group_sostav(this.list_group_sostav);

        this.table_arr_common_detali.view(wagons_adoption);

        // обновление списков отчета
        if (!where || !where.id_operator || where.id_operator.length === 0) {
            this.select_operation_amkr.update(this.list_operators_wagons, -1);
        }
        if (!where || !where.id_limiting || where.id_limiting.length === 0) {
            this.select_limiting.update(this.list_limiting, -1);
        }
        if (!where || !where.id_owner || where.id_owner.length === 0) {
            this.select_owners.update(this.list_owners, -1);
        }
        if (!where || !where.code_stn_from || where.code_stn_from.length === 0) {
            this.select_station_from.update(this.list_station_from, -1);
        }
        if (!where || !where.id_cargo || where.id_cargo.length === 0) {
            this.select_cargo.update(this.list_cargo, -1);
        }
        if (!where || !where.id_certification_data || where.id_certification_data.length === 0) {
            this.select_certification_data.update(this.list_certification_data, -1);
        }
        if (!where || !where.supply_cargo_code || where.supply_cargo_code.length === 0) {
            this.select_cargo_sap.update(this.list_cargo_sap, -1);
        }
        if (!where || !where.id_group_cargo || where.id_group_cargo.length === 0) {
            this.select_group_arrival.update(this.list_group_arrival, -1);
        }
        if (!where || !where.code_consignee || where.code_consignee.length === 0) {
            this.select_consignee.update(this.list_consignee, -1);
        }
        if (!where || !where.id_division || where.id_division.length === 0) {
            this.select_division.update(this.list_division, -1);
        }
        if (!where || !where.id_genus || where.id_genus.length === 0) {
            this.select_genus.update(this.list_genus, -1);
        }
        if (!where || !where.id_condition || where.id_condition.length === 0) {
            this.select_condition.update(this.list_condition, -1);
        }
        if (!where || !where.code_payer_arrival || where.code_payer_arrival.length === 0) {
            this.select_payer_name.update(this.list_payer_name, -1);
        }
        if (!where || !where.code_payer_arrival_name || where.code_payer_arrival_name.length === 0) {
            this.select_payer_code.update(this.list_payer_code, -1);
        }
        if (!where || !where.id_station_on || where.id_station_on.length === 0) {
            this.select_station_amkr.update(this.list_station_amkr, -1);
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_2_1 = function () {
        this.out_clear();
        this.nums = null;
        var list_nums = this.textarea_wagon_nums.val();
        if (list_nums !== '') {
            this.nums = is_valid_nums(list_nums, this.settings.alert, false, true);
            if (!this.nums) return;
        };
        this.main_epd_docs = null;
        var list_main_epd_docs = this.textarea_main_epd_docs.val();
        if (list_main_epd_docs !== '') {
            this.main_epd_docs = is_valid_docs(list_main_epd_docs, this.settings.alert, true);
            if (!this.main_epd_docs) return;
        };

        this.epd_docs = null;
        var list_epd_docs = this.textarea_epd_docs.val();
        if (list_epd_docs !== '') {
            this.epd_docs = is_valid_docs(list_epd_docs, this.settings.alert, true);
            if (!this.epd_docs) return;
        };

        LockScreen(langView('vtdr_load_adoption_cars', App.Langs));
        this.load_select_report_2_1(null, function () {
            LockScreenOff();
        }.bind(this))
    };
    // Действие кнопки обновим
    view_td_report.prototype.view_table_group_sostav = function (list_group_sostav) {
        this.$div_group_sostav.empty();
        var table_group_sostav = new this.fe_ui.table({
            id: 'table-group-sostav',
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        this.table_group_sostav = table_group_sostav.$table;
        var $thead = $('<thead></thead>');
        var $tr_h = $('<tr></tr>');
        var $th1 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Дата приема'
        });
        var $th2 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Общее кол.'
        });
        var $th3 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Кол. уч. ваг.'
        });
        var $th4 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Род груза'
        });
        var $th5 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Вес по ЭПД, тн.'
        });
        var $th6 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Вес по перевеске, тн.'
        });
        var $th7 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Разница, тн.'
        });
        $thead.append($tr_h.append($th1).append($th2).append($th3).append($th4).append($th5).append($th6).append($th7));
        var $tbody = $('<tbody></tbody>');
        this.table_group_sostav.append($thead)
        //
        var const_wagon = 0;
        var count_account_balance_wagon = 0;
        var sum_vesg = 0;
        var sum_vesg_reweighing = 0;
        var sum_def_vesg = 0;
        if (list_group_sostav && list_group_sostav.length > 0) {
            $.each(list_group_sostav, function (i, el) {
                var $tr_d = $('<tr></tr>', {
                    id: el.id
                });
                $.each(el.cargo_group, function (i1, el1) {
                    if (i1 === 0) {
                        var $tr_d = $('<tr></tr>', {
                            id: el.id
                        });
                        var $td_date_adoption = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.date_adoption ? moment(el.date_adoption).format(format_datetime) : ''
                        });
                        var $td_const_wagon = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.const_wagon
                        });
                        var $td_count_account_balance_wagon = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.count_account_balance_wagon
                        });
                        var $td_cargo = $('<td></td>', {
                            class: 'dt-body-left',
                            text: el1.count + '-' + el1.cargo_name
                        });
                        var $td_sum_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg ? Number(el1.sum_vesg / 1000).toFixed(3) : 0.000
                        });
                        var $td_sum_vesg_reweighing = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg_reweighing ? Number(el1.sum_vesg_reweighing / 1000).toFixed(3) : 0.000
                        });
                        var $td_def_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg & el1.sum_vesg_reweighing ? Number(Number(el1.sum_vesg - el1.sum_vesg_reweighing) / 1000).toFixed(3) : 0.000
                        });
                        $tr_d.append($td_date_adoption).append($td_const_wagon).append($td_count_account_balance_wagon).append($td_cargo).append($td_sum_vesg).append($td_sum_vesg_reweighing).append($td_def_vesg);
                        $tbody.append($tr_d);
                        const_wagon += el.const_wagon;
                        count_account_balance_wagon += el.count_account_balance_wagon;
                    } else {
                        var $tr_d = $('<tr></tr>');
                        var $td_date_adoption = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_const_wagon = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_count_account_balance_wagon = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_cargo = $('<td></td>', {
                            class: 'dt-body-left',
                            text: el1.count + '-' + el1.cargo_name
                        });
                        var $td_sum_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg ? Number(el1.sum_vesg / 1000).toFixed(3) : 0.000
                        });
                        var $td_sum_vesg_reweighing = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg_reweighing ? Number(el1.sum_vesg_reweighing / 1000).toFixed(3) : 0.000
                        });
                        var $td_def_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg & el1.sum_vesg_reweighing ? Number(Number(el1.sum_vesg - el1.sum_vesg_reweighing) / 1000).toFixed(3) : 0.000
                        });
                        $tr_d.append($td_date_adoption).append($td_const_wagon).append($td_count_account_balance_wagon).append($td_cargo).append($td_sum_vesg).append($td_sum_vesg_reweighing).append($td_def_vesg);
                        $tbody.append($tr_d);
                    }
                    sum_vesg += el1.sum_vesg;
                    sum_vesg_reweighing += el1.sum_vesg_reweighing;
                    sum_def_vesg += (el1.sum_vesg & el1.sum_vesg_reweighing ? Number(el1.sum_vesg - el1.sum_vesg_reweighing) : 0);
                }.bind(this));
            }.bind(this));
        }
        this.table_group_sostav.append($tbody);
        var $tfoot = $('<tfoot></tfoot>');
        var $tr_f = $('<tr></tr>');
        var $tdf1 = $('<td></td>', {
            class: 'dt-right',
            text: 'ИТОГО:'
        });
        var $tdf2 = $('<td></td>', {
            class: 'dt-center',
            text: Number(const_wagon)
        });
        var $tdf3 = $('<td></td>', {
            class: 'dt-center',
            text: Number(count_account_balance_wagon)
        });
        var $tdf4 = $('<td></td>');
        var $tdf5 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg > 0 ? Number(sum_vesg / 1000).toFixed(3) : 0
        });
        var $tdf6 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg_reweighing > 0 ? Number(sum_vesg_reweighing).toFixed(3) : 0
        });
        var $tdf7 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg_reweighing > 0 ? Number(sum_def_vesg).toFixed(3) : 0
        });
        $tfoot.append($tr_f.append($tdf1).append($tdf2).append($tdf3).append($tdf4).append($tdf5).append($tdf6).append($tdf7));
        this.table_group_sostav.append($tfoot);
        this.$div_group_sostav.append(this.table_group_sostav);
        this.table_group_sostav.DataTable({
            "lengthMenu": null,
            "pageLength": null,
            "deferRender": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "info": true,
            select: false,
            "autoWidth": false,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            dom: 'Bfrtip',
            stateSave: false,
            buttons: {
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
        });

    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_2_1 = function () {
        this.switch_laden.val(false);
        this.switch_accounting.val(false);
        this.switch_client.val(false);
        this.switch_not_client.val(false);
        this.switch_paid.val(false);
        this.textarea_wagon_nums.val('');
        this.textarea_main_epd_docs.val('');
        this.textarea_epd_docs.val('');
        this.select_operation_amkr.val(-1);
        this.select_limiting.val(-1);
        this.select_owners.val(-1);
        this.select_station_from.val(-1);
        this.select_cargo.val(-1);
        this.select_certification_data.val(-1);
        this.select_cargo_sap.val(-1);
        this.select_group_arrival.val(-1);
        this.select_consignee.val(-1);
        this.select_division.val(-1);
        this.select_genus.val(-1);
        this.select_condition.val(-1);
        this.select_payer_name.val(-1);
        this.select_payer_code.val(-1);
        this.select_station_amkr.val(-1);
        // Обработать и показать данные
        this.process_data_view_report_2_1(this.clone_wagons_adoption, null);
        LockScreenOff();
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_2_1 = function () {
        if (this.textarea_wagon_nums) {
            this.switch_laden.val(false);
            this.switch_accounting.val(false);
            this.switch_client.val(false);
            this.switch_not_client.val(false);
            this.switch_paid.val(false);
            this.textarea_wagon_nums.val('');
            this.textarea_main_epd_docs.val('');
            this.textarea_epd_docs.val('');
            this.select_operation_amkr.val(-1);
            this.select_limiting.val(-1);
            this.select_owners.val(-1);
            this.select_station_from.val(-1);
            this.select_cargo.val(-1);
            this.select_certification_data.val(-1);
            this.select_cargo_sap.val(-1);
            this.select_group_arrival.val(-1);
            this.select_consignee.val(-1);
            this.select_division.val(-1);
            this.select_genus.val(-1);
            this.select_condition.val(-1);
            this.select_payer_name.val(-1);
            this.select_payer_code.val(-1);
            this.select_station_amkr.val(-1);
            this.wagons_adoption = [];
            this.clone_wagons_adoption = [];
            this.process_data_view_report_2_1(this.clone_wagons_adoption, null);
            LockScreenOff();
        }
    };
    //------------------------------------------------------------------------------------------------
    // Инициализация панели
    view_td_report.prototype.init_panel_report = function (name_panel, name_div) {
        // Груз по Оператору АМКР
        var card_chart = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center text-white bg-info',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_chart', App.Langs),
        });
        card_chart.$body.append($('<div>', {
            id: name_div + '-chart',
        }))
        var card_table = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-center text-white bg-primary',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_table', App.Langs),
        });
        card_table.$body.append($('<div>', {
            id: name_div,
        }))
        var row_chart = new this.fe_ui.bs_row();
        var row_table = new this.fe_ui.bs_row();
        var col_chart = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var col_table = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        //
        row_chart.$row.append(col_chart.$col.append(card_chart.$card));
        row_table.$row.append(col_table.$col.append(card_table.$card));
        // Добавим в панель
        var $panel = this.nav_tabs_arr_total.$content.find('div#' + name_panel); // Панель
        $panel.append(row_table.$row).append(row_chart.$row);
    };
    // Инициализировать отчет "Прибытие ИТОГ"
    view_td_report.prototype.init_report_3_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 3;       // номер отчета
        this.report_panel = 0; // номер под-отчета
        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_3_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                     // Инициализация формы выбора периода отчетов
        //------
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_setup_detali = new this.fe_ui.fieldset({
            class: 'border-info mt-1',
            legend: null,
            class_legend: 'border-info',
        });
        this.$setup_detali_select = fieldset_setup_detali.$fieldset;
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
        col_setup.$col.append(this.$setup_select).append(this.$setup_detali_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);
        // ---------------------------------------------------------------
        // Формируем форму выбора 
        var form_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_select = form_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_3_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_3_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        //
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_laden = new this.fe_ui.bs_switch({
            id: 'laden',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_laden', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_laden.$element);
        this.switch_laden = sw_laden.element;
        // Только с грузом
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_accounting = new this.fe_ui.bs_switch({
            id: 'accounting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_accounting', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_accounting.$element);
        this.switch_accounting = sw_accounting.element;
        // Клиентура 
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_client = new this.fe_ui.bs_switch({
            id: 'client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_client.$element);
        this.switch_client = sw_client.element;
        // Без учета клиентуры
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_not_client = new this.fe_ui.bs_switch({
            id: 'not_client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_not_client.$element);
        this.switch_not_client = sw_not_client.element;
        // Платные
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // Станция примыкания
        var row_setup3_1 = new this.fe_ui.bs_row();
        var select_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup3_1.$row.append(select_station_amkr.$element);
        this.select_station_amkr = select_station_amkr.element;
        //
        this.$form_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup3_1.$row)
            ;
        this.$setup_select.append(this.$form_setup_select);
        //----------------------------------------------------------------
        // Формируем форму выбора детально
        var form_setup_detali_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_detali_select = form_setup_detali_select.$form;
        // Оператор АМКР
        var row_setup_detali_operation_amkr = new this.fe_ui.bs_row();
        var select_detali_operation_amkr = new this.fe_ui.bs_select({
            id: 'detali_operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_cargo_operation_amkr();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_operation_amkr.$row.append(select_detali_operation_amkr.$element);
        this.row_setup_detali_operation_amkr = row_setup_detali_operation_amkr.$row;
        this.select_detali_operation_amkr = select_detali_operation_amkr.element;
        // Оператор АМКР - multiple
        var row_setup_detali_operation_amkr_multiple = new this.fe_ui.bs_row();
        var select_detali_operation_amkr_multiple = new this.fe_ui.bs_select_multiple({
            id: 'detali_operation_amkr_multiple',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_operation_to_arr();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_operation_amkr_multiple.$row.append(select_detali_operation_amkr_multiple.$element);
        this.row_setup_detali_operation_amkr_multiple = row_setup_detali_operation_amkr_multiple.$row;
        this.select_detali_operation_amkr_multiple = select_detali_operation_amkr_multiple.element;
        // Ограничение
        var row_setup_detali_limiting = new this.fe_ui.bs_row();
        var select_detali_limiting = new this.fe_ui.bs_select({
            id: 'detali_limiting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_limiting', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_limiting', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {

                if (this.report_panel === 0) {
                    this.view_filter_report_total_cargo_operation_amkr();
                }
                if (this.report_panel === 1) {
                    this.view_filter_report_total_operation_to_arr();
                }                
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_limiting.$row.append(select_detali_limiting.$element);
        this.row_setup_detali_limiting = row_setup_detali_limiting.$row;
        this.select_detali_limiting = select_detali_limiting.element;
        // Груз прибытие
        var row_setup_detali_cargo = new this.fe_ui.bs_row();
        var select_detali_cargo = new this.fe_ui.bs_select({
            id: 'detali_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_cargo.$row.append(select_detali_cargo.$element);
        this.row_setup_detali_cargo = row_setup_detali_cargo.$row;
        this.select_detali_cargo = select_detali_cargo.element;
        // Сертификационные данные
        var row_setup_detali_certification_data = new this.fe_ui.bs_row();
        var select_detali_certification_data = new this.fe_ui.bs_select({
            id: 'detali_certification_data',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_certification_data', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_certification_data', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_certification_data.$row.append(select_detali_certification_data.$element);
        this.row_setup_detali_certification_data = row_setup_detali_certification_data.$row;
        this.select_detali_certification_data = select_detali_certification_data.element;
        // Группа ПРИБ
        var row_setup_detali_group_arrival = new this.fe_ui.bs_row();
        var select_detali_group_arrival = new this.fe_ui.bs_select({
            id: 'detali_group_arrival',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_group_arrival', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_group_arrival', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_group_arrival.$row.append(select_detali_group_arrival.$element);
        this.row_setup_detali_group_arrival = row_setup_detali_group_arrival.$row;
        this.select_detali_group_arrival = select_detali_group_arrival.element;
        // Род вагона
        var row_setup_detali_genus = new this.fe_ui.bs_row();
        var select_detali_genus = new this.fe_ui.bs_select({
            id: 'detali_genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_genus.$row.append(select_detali_genus.$element);
        this.row_setup_detali_genus = row_setup_detali_genus.$row;
        this.select_detali_genus = select_detali_genus.element;
        // Род вагона
        var row_setup_detali_cargo_sap = new this.fe_ui.bs_row();
        var select_detali_cargo_sap = new this.fe_ui.bs_select({
            id: 'detali_cargo_sap',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo_sap', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo_sap', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_cargo_sap.$row.append(select_detali_cargo_sap.$element);
        this.row_setup_detali_cargo_sap = row_setup_detali_cargo_sap.$row;
        this.select_detali_cargo_sap = select_detali_cargo_sap.element;
        // Оператор АМКР - multiple
        var row_setup_detali_station_from_multiple = new this.fe_ui.bs_row();
        var select_detali_station_from_multiple = new this.fe_ui.bs_select_multiple({
            id: 'detali_station_from_multiple',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_from', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_from', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_station_from_multiple.$row.append(select_detali_station_from_multiple.$element);
        this.row_setup_detali_station_from_multiple = row_setup_detali_station_from_multiple.$row;
        this.select_detali_station_from_multiple = select_detali_station_from_multiple.element;
        // Добавим элементы на форму
        this.$form_setup_detali_select
            .append(row_setup_detali_operation_amkr.$row)
            .append(row_setup_detali_operation_amkr_multiple.$row)
            .append(row_setup_detali_limiting.$row)
            .append(row_setup_detali_cargo.$row)
            .append(row_setup_detali_certification_data.$row)
            .append(row_setup_detali_group_arrival.$row)
            .append(row_setup_detali_genus.$row)
            .append(row_setup_detali_cargo_sap.$row)
            .append(row_setup_detali_station_from_multiple.$row)
            ;
        this.$setup_detali_select.append(this.$form_setup_detali_select);

        //----------------------------------------------------------------
        // Создадим панель выбора отчета
        this.nav_tabs_arr_total = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-arr-total',
            class_nav: null,
            id_content: 'tab-arr-total-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'arr-total-cargo-operator-amkr',
                    aria_controls: 'arr-total-cargo-operator-amkr-tab',
                    label: 'Груз по Оператору АМКР',
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-operator-to-arr',
                    aria_controls: 'arr-total-operator-to-arr-tab',
                    label: 'Оператор по ПРИБ',
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        //----------------------------------------
        // Груз по Оператору АМКР
        this.init_panel_report('arr-total-cargo-operator-amkr-tab', 'adoption-cargo-operation-amkr');
        //-------------------------------------------
        // Закладка Отчет-Оператор по ПРИБ
        this.init_panel_report('arr-total-operator-to-arr-tab', 'adoption-operator-to-arr');
        // Дабавим закладку на форму
        this.$table_view.append(this.nav_tabs_arr_total.$ul).append(this.nav_tabs_arr_total.$content);
        //-----------------------------------------------------------------
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем 4 процесса инициализации (паралельно)
        var process = 4;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;
                this.view_setup_detali_report_3_1(this.report_panel);
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {

                        case 'arr-total-cargo-operator-amkr': {
                            this.report_panel = 0;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            break;
                        };
                        case 'arr-total-operator-to-arr': {
                            this.report_panel = 1;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            break;
                        };
                    };
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        //-----------------------------------------------
        // Таблица-Груз по Оператору АМКР
        this.table_total_cargo_operation_amkr = new TTDR('div#adoption-cargo-operation-amkr');         // Создадим экземпляр
        this.table_total_cargo_operation_amkr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_cargo_operation_amkr',     //
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
        // Инициализация модуля графиков тип: Гистограмма с накоплением
        this.chart_total_cargo_operation_amkr = new CAM('div#adoption-cargo-operation-amkr-chart');         // Создадим экземпляр
        this.chart_total_cargo_operation_amkr.init({
            alert: null,
            type_chart: 'stacked_column_chart_percent',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Оператор по ПРИБ
        this.table_total_operation_to_arr = new TTDR('div#adoption-operator-to-arr');         // Создадим экземпляр
        this.table_total_operation_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_operator_to_arr',     //
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
        // Инициализация модуля графиков тип: Гистограмма с накоплением
        this.chart_total_operation_to_arr = new CAM('div#adoption-operator-to-arr-chart');         // Создадим экземпляр
        this.chart_total_operation_to_arr.init({
            alert: null,
            type_chart: 'simple_treemap',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });

    };
    // Показать отчет  "Отчет по прибытию (общий)"
    view_td_report.prototype.view_report_3_1 = function (start, stop) {
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_select_cars', App.Langs));
        // пустые операторы
        var where = {
            start: moment(start).format(format_datetime),
            stop: moment(stop).format(format_datetime),
            laden: false,
            accounting: false,
            client: false,
            not_client: false,
            paid: false,
            id_station_on: null,
        };
        // Загрузим данные
        this.load_select_report_3_1(where, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные с учетом параметров выбора
    view_td_report.prototype.load_select_report_3_1 = function (where, callback) {
        if (!where) {
            var cur_where = {
                start: moment(this.start).format(format_datetime),
                stop: moment(this.stop).format(format_datetime),
                laden: this.switch_laden.val(),
                accounting: this.switch_accounting.val(),
                client: this.switch_client.val(),
                not_client: this.switch_not_client.val(),
                paid: this.switch_paid.val(),
                id_station_on: this.select_station_amkr.val(),
            };
        } else {
            cur_where = where;
        };
        // Выборка
        this.ids_wsd.postReportAdoptionWagonOfWhere(cur_where, function (result_wagons) {
            this.wagons_adoption = result_wagons;

            // Проверим если это выбор толко по времени (первый выбор) тогда клонируем
            if (where) {
                this.clone_wagons_adoption = JSON.parse(JSON.stringify(this.wagons_adoption));
            }
            // Обработать и показать данные
            this.process_data_view_report_3_1(this.wagons_adoption, cur_where);
            //this.process_data_view_report_3_2(this.wagons_adoption, cur_where);

            // Выход
            if (typeof callback === 'function') {
                callback();
            }

            //// Обновим спсисок вагонов распарсиным ЭПД
            //wagons_get_epd_async.call(this, this.wagons_adoption, function () {

            //}.bind(this));
        }.bind(this));
    };
    // Обработка данных для отчетов
    view_td_report.prototype.process_data_select_report_3_1 = function (data, callback) {
        this.list_station_amkr = [];
        this.list_operation_amkr = [];
        this.list_limiting = [];
        this.list_cargo = [];
        this.list_certification_data = [];
        this.list_group_arrival = [];
        this.list_genus = [];
        this.list_cargo_sap = [];
        this.list_station_from = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        $.each(data, function (key, el_wag) {
            // выборка для списков отчета
            var ow = this.list_operation_amkr.find(function (o) { return o.value === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_operator }.bind(this));
            if (!ow) {
                this.list_operation_amkr.push({ value: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_operator, text: el_wag['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang] });
            }
            var lm = this.list_limiting.find(function (o) { return o.value === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting }.bind(this));
            if (!lm) {
                this.list_limiting.push({ value: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting, text: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang] });
            }
            var station_amkr = this.list_station_amkr.find(function (o) { return o.value === el_wag.arrival_sostav_id_station_on }.bind(this));
            if (!station_amkr) {
                this.list_station_amkr.push({ value: el_wag.arrival_sostav_id_station_on, text: el_wag['arrival_sostav_station_on_abbr_' + App.Lang] });
            }
        }.bind(this));
        if (typeof callback === 'function') {
            callback();
        }
    };
    view_td_report.prototype.process_data_report_3_1 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_operator &&
                    o.id_limiting === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting &&
                    o.id_cargo === el_wag.arrival_uz_vagon_id_cargo
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_operator: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_operator,
                    operators: el_wag['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang],
                    operator_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang],
                    id_limiting: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting,
                    limiting_name: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang],
                    limiting_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang],
                    id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                    cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.arrival_uz_vagon_vesg ? op.sum_vesg + el_wag.arrival_uz_vagon_vesg : op.sum_vesg;
                op.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? op.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : op.sum_vesg_reweighing;
                op.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? op.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : op.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_2 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_operator &&
                    o.id_limiting === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_operator: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_operator,
                    operators: el_wag['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang],
                    operator_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang],
                    id_limiting: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting,
                    limiting_name: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang],
                    limiting_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang],
                    count_wagon: 1,
                    count_persent: 0
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    // Обработать и отображение данных на экране
    view_td_report.prototype.process_data_view_report_3_1 = function (wagons_adoption, where) {
        // Продолжим
        this.total_cargo_operation_amkr = [];   // список Груз по Оператору АМКР
        this.total_operation_amkr = [];         // список Оператор по ПРИБ

        // Запускаем 2 процесса инициализации (паралельно)
        var process = 3;
        // Выход из инициализации
        var out_process_data = function (process) {
            if (process === 0) {
                // Обновим элементы выбора
                this.select_detali_operation_amkr.update(this.list_operation_amkr, -1);
                this.select_detali_operation_amkr_multiple.update(this.list_operation_amkr, -1);
                this.select_detali_limiting.update(this.list_limiting, -1);
                // Обновим спсисок станции "Внешнее прибытие"
                if (!where || !where.id_station_on || where.id_station_on.length === 0) {
                    this.select_station_amkr.update(this.list_station_amkr, -1);
                };
                // Отобразить данные в таблице Груз по Оператору АМКР
                this.view_filter_report_total_cargo_operation_amkr();
                // Отобразить данные в таблице Оператор по ПРИБ
                this.view_filter_report_total_operation_to_arr();
            }
        }.bind(this);
        this.process_data_select_report_3_1(wagons_adoption, function (result) {
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_1(wagons_adoption, function (result) {
            this.total_cargo_operation_amkr = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_2(wagons_adoption, function (result) {
            this.total_operation_amkr = result;
            process--;
            out_process_data(process);
        }.bind(this));
    };
    // Выполнить фильтрацию и вывести данные по отчету "Груз по Оператору АМКР"
    view_td_report.prototype.view_filter_report_total_cargo_operation_amkr = function () {
        if (this.total_cargo_operation_amkr) {
            var id_operator = Number(this.select_detali_operation_amkr.val());
            var id_limiting = Number(this.select_detali_limiting.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_cargo_operation_amkr));
            // Применим фильтр
            if (id_operator > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_operator === (id_operator > 0 ? id_operator : null);
                }.bind(this));
            }
            if (id_limiting > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_limiting === (id_limiting > 0 ? id_limiting : null);
                }.bind(this));
            }
            // Отобразим
            this.table_total_cargo_operation_amkr.view(list_view);

            var data = [];
            $.each(list_view, function (key, element) {
                data.push({ "group": element.operator_abbr, "name": element.cargo_name, "fieldName": element.id_cargo, "value": element.count_wagon });
            }.bind(this));

            //var data = [
            //    {
            //        "group": "АМКР",
            //        "name": "Концентрат",
            //        "fieldName": "1",
            //        "value": 100

            //    },
            //    {
            //        "group": "АМКР",
            //        "name": "Порожняк",
            //        "fieldName": "2",
            //        "value": 50
            //    },
            //    {
            //        "group": "ЦТД",
            //        "name": "Порожняк",
            //        "fieldName": "2",
            //        "value": 67
            //    },
            //    {
            //        "group": "ЦТД",
            //        "name": "Кокс",
            //        "fieldName": "3",
            //        "value": 85
            //    },
            //    {
            //        "group": "ООО",
            //        "name": "Кокс",
            //        "fieldName": "3",
            //        "value": 13
            //    },
            //    {
            //        "group": "ООО",
            //        "name": "Концентрат",
            //        "fieldName": "1",
            //        "value": 35
            //    },
            //    {
            //        "group": "ООО",
            //        "name": "Порожняк",
            //        "fieldName": "2",
            //        "value": 8
            //    },
            //]

            this.chart_total_cargo_operation_amkr.view(data);

            LockScreenOff();
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Оператор по ПРИБ"
    view_td_report.prototype.view_filter_report_total_operation_to_arr = function () {
        if (this.total_cargo_operation_amkr) {
            var operators = this.select_detali_operation_amkr_multiple.val();
            var id_limiting = Number(this.select_detali_limiting.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_cargo_operation_amkr));
            // Применим фильтр
            if (operators && operators.length>0) {
                //list_view = list_view.filter(function (i) {
                //    return i.id_operator === (id_operator > 0 ? id_operator : null);
                //}.bind(this));
            };
            if (id_limiting > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_limiting === (id_limiting > 0 ? id_limiting : null);
                }.bind(this));
            };
            // Отобразим
            this.table_total_operation_to_arr.view(list_view);

            var data = {
                name: "Root",
                children: []
            };

            $.each(list_view, function (key, element) {
                var child = {
                    name: element.operator_abbr,
                    children: [
                        {
                            name: element.id_operator,
                            value: element.count_wagon
                        }
                    ]
                };
                data.children.push(child);
            }.bind(this));
            //var data = {
            //    name: "Root",
            //    children: [
            //        {
            //            name: "First",
            //            children: [
            //                {
            //                    name: "A1",
            //                    value: 100
            //                },
            //                {
            //                    name: "A2",
            //                    value: 60
            //                },
            //                {
            //                    name: "A3",
            //                    value: 30
            //                }
            //            ]
            //        },
            //        {
            //            name: "Second",
            //            children: [
            //                {
            //                    name: "B1",
            //                    value: 135
            //                },
            //                {
            //                    name: "B2",
            //                    value: 98
            //                },
            //                {
            //                    name: "B3",
            //                    value: 56
            //                }
            //            ]
            //        },
            //        {
            //            name: "Third",
            //            children: [
            //                {
            //                    name: "C1",
            //                    value: 335
            //                },
            //                {
            //                    name: "C2",
            //                    value: 148
            //                },
            //                {
            //                    name: "C3",
            //                    value: 126
            //                },
            //                {
            //                    name: "C4",
            //                    value: 26
            //                }
            //            ]
            //        },
            //        {
            //            name: "Fourth",
            //            children: [
            //                {
            //                    name: "D1",
            //                    value: 415
            //                },
            //                {
            //                    name: "D2",
            //                    value: 148
            //                },
            //                {
            //                    name: "D3",
            //                    value: 89
            //                },
            //                {
            //                    name: "D4",
            //                    value: 64
            //                },
            //                {
            //                    name: "D5",
            //                    value: 16
            //                }
            //            ]
            //        },
            //        {
            //            name: "Fifth",
            //            children: [
            //                {
            //                    name: "E1",
            //                    value: 687
            //                },
            //                {
            //                    name: "E2",
            //                    value: 148
            //                }
            //            ]
            //        }
            //    ]
            //};
            this.chart_total_operation_to_arr.view(data);

            LockScreenOff();
        }
    };

    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_3_1 = function () {
        this.out_clear();
        LockScreen(langView('vtdr_load_adoption_cars', App.Langs));
        this.load_select_report_3_1(null, function () {
            LockScreenOff();
        }.bind(this))
    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_3_1 = function () {
        this.switch_laden.val(false);
        this.switch_accounting.val(false);
        this.switch_client.val(false);
        this.switch_not_client.val(false);
        this.switch_paid.val(false);
        this.select_station_amkr.val(-1);
        // Обработать и показать данные
        this.process_data_view_report_3_1(this.clone_wagons_adoption, null);
        LockScreenOff();
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_3_1 = function () {
        if (this.switch_laden) {
            this.switch_laden.val(false);
            this.switch_accounting.val(false);
            this.switch_client.val(false);
            this.switch_not_client.val(false);
            this.switch_paid.val(false);
            this.select_station_amkr.val(-1);
            this.wagons_adoption = [];
            this.clone_wagons_adoption = [];
            this.process_data_view_report_3_1(this.clone_wagons_adoption, null);
            LockScreenOff();
        }
    };

    view_td_report.prototype.chart_3_1 = function () {
        am5.ready(function () {

            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            var root = am5.Root.new("adoption-operator-to-arr-chart");


            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
                am5themes_Animated.new(root)
            ]);


            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }));

            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);


            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
            xRenderer.labels.template.setAll({
                rotation: -90,
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15
            });

            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "country",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));

            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, {})
            }));


            // Create series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "country",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            }));

            series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
            series.columns.template.adapters.add("fill", function (fill, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            series.columns.template.adapters.add("stroke", function (stroke, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });


            // Set data
            var data = [{
                country: "USA",
                value: 2025
            }, {
                country: "China",
                value: 1882
            }, {
                country: "Japan",
                value: 1809
            }, {
                country: "Germany",
                value: 1322
            }, {
                country: "UK",
                value: 1122
            }, {
                country: "France",
                value: 1114
            }, {
                country: "India",
                value: 984
            }, {
                country: "Spain",
                value: 711
            }, {
                country: "Netherlands",
                value: 665
            }, {
                country: "South Korea",
                value: 443
            }, {
                country: "Canada",
                value: 441
            }];

            xAxis.data.setAll(data);
            series.data.setAll(data);


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear(1000);
            chart.appear(1000, 100);

        }); // end am5.ready()
    };
    view_td_report.prototype.chart_3_2 = function () {
        am5.ready(function () {

            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            var root = am5.Root.new("adoption-operator-to-arr-chart");

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            // Create wrapper container
            var container = root.container.children.push(
                am5.Container.new(root, {
                    width: am5.percent(100),
                    height: am5.percent(100),
                    layout: root.verticalLayout
                })
            );

            // Create series
            // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
            var series = container.children.push(
                am5hierarchy.Treemap.new(root, {
                    singleBranchOnly: false,
                    downDepth: 1,
                    upDepth: -1,
                    initialDepth: 2,
                    valueField: "value",
                    categoryField: "name",
                    childDataField: "children",
                    nodePaddingOuter: 0,
                    nodePaddingInner: 0
                })
            );

            series.rectangles.template.setAll({
                strokeWidth: 2
            });

            // Generate and set data
            // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
            var maxLevels = 2;
            var maxNodes = 10;
            var maxValue = 100;

            var data = {
                name: "Root",
                children: [
                    {
                        name: "First",
                        children: [
                            {
                                name: "A1",
                                value: 100
                            },
                            //{
                            //    name: "A2",
                            //    value: 60
                            //},
                            //{
                            //    name: "A3",
                            //    value: 30
                            //}
                        ]
                    },
                    {
                        name: "Second",
                        children: [
                            {
                                name: "B1",
                                value: 135
                            },
                            //{
                            //    name: "B2",
                            //    value: 98
                            //},
                            //{
                            //    name: "B3",
                            //    value: 56
                            //}
                        ]
                    },
                    {
                        name: "Third",
                        children: [
                            {
                                name: "C1",
                                value: 335
                            },
                            //{
                            //    name: "C2",
                            //    value: 148
                            //},
                            //{
                            //    name: "C3",
                            //    value: 126
                            //},
                            //{
                            //    name: "C4",
                            //    value: 26
                            //}
                        ]
                    },
                    {
                        name: "Fourth",
                        children: [
                            {
                                name: "D1",
                                value: 415
                            },
                            //{
                            //    name: "D2",
                            //    value: 148
                            //},
                            //{
                            //    name: "D3",
                            //    value: 89
                            //},
                            //{
                            //    name: "D4",
                            //    value: 64
                            //},
                            //{
                            //    name: "D5",
                            //    value: 16
                            //}
                        ]
                    },
                    {
                        name: "Fifth",
                        children: [
                            {
                                name: "E1",
                                value: 687
                            },
                            //{
                            //    name: "E2",
                            //    value: 148
                            //}
                        ]
                    }
                ]
            };

            series.data.setAll([data]);
            series.set("selectedDataItem", series.dataItems[0]);

            // Make stuff animate on load
            series.appear(1000, 100);

        }); // end am5.ready()
    };

    // обновим выбор детально
    view_td_report.prototype.view_setup_detali_report_3_1 = function (rep) {
        this.row_setup_detali_operation_amkr.hide();
        this.row_setup_detali_operation_amkr_multiple.hide();
        this.row_setup_detali_limiting.hide();
        this.row_setup_detali_cargo.hide();
        this.row_setup_detali_certification_data.hide();
        this.row_setup_detali_group_arrival.hide();
        this.row_setup_detali_genus.hide();
        this.row_setup_detali_cargo_sap.hide();
        this.row_setup_detali_station_from_multiple.hide();
        switch (rep) {
            case 0: {
                this.row_setup_detali_operation_amkr.show();
                this.row_setup_detali_limiting.show();
                break;
            };
            case 1: {
                this.row_setup_detali_operation_amkr_multiple.show();
                this.row_setup_detali_limiting.show();
                break;
            };
        }
    };

    //--------------------------------------------------------------------------------------------------
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