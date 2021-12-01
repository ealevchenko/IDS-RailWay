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
            'vrrc_card_header_panel': 'ОТЧЕТ "ОПЕРАТИВНЫЙ ОСТАТОК ВАГОНОВ НА АМКР"',

            'vrrc_title_outer_car': 'Внешние стороние вагоны',
            'vrrc_title_amkr_outer_cars': 'Внешние вагоны АМКР',
            'vrrc_title_amkr_cars': 'Внутризаводские вагоны',
            'vrrc_title_handed_cars': 'Сданные вагоны на УЗ',
            'vrrc_title_amkr_cisterns': 'Цистерны арендованные',
            'vrrc_title_select_day': 'Сверх суток:',
            'vrrc_title_select_top': 'Топ:',
            'vrrc_title_operators': 'Оператор:',
            'vrrc_title_limiting': 'Ограничение:',
            'vrrc_title_cargo_arrival': 'Груз по прибытию:',
            'vrrc_title_cargo_group_arrival': 'Группа по ПРИБ:',
            'vrrc_title_certification_data': 'Сертификационные данные:',
            'vrrc_title_departure_station': 'Станция отправления:',
            'vrrc_title_division': 'Грузополучатель:',
            'vrrc_title_station_contiguity': 'Внешнее прибытие:',
            'vrrc_title_condition_arrival': 'Разметка по прибытию:',
            'vrrc_title_condition_mr': 'Вагоны МР:',
            'vrrc_title_genus': 'Род вагона:',
            'vrrc_title_cargo_sending': 'Груз по отправлению:',
            'vrrc_title_cargo_group_sending': 'Группа по ОТПР:',
            'vrrc_title_division_loading': 'Цех-погрузки:',
            'vrrc_title_destination_station': 'Станция назначения:',
            'vrrc_title_paid': 'Признак платности:',
            'vrrc_title_station_amkr': 'Станция нахождения вагона:',
            'vrrc_title_not_surrender_cars': 'Без учета сданных вагонов:',

            'vrrc_title_aplly_day': 'Применить выбрать свыше указанных дней',
            'vrrc_title_aplly_top': 'Применить выбрать топ',
            'vrrc_title_yes': 'Да',


            'vrrc_title_add_ok': 'ОБНОВИТЬ',
            'vrrc_title_where_clear': 'СБРОСИТЬ',
            'vrrc_title_where_load': 'ОБНОВИТЬ',
            'vrrc_title_select': 'Все...',
            'vrrc_title_null': '-',
            'vrrc_title_confirm_clear': 'Сбросить?',
            'vrrc_title_mesage_clear': 'Выполнить сброс выбора?',
            'vrrc_title_confirm_load': 'Обновить?',
            'vrrc_title_mesage_load': 'Выполнить загрузку новых данных из базы данных ИДС?',

            'vrrc_mess_load_wagons': 'Загружаю вагоны...',
            'vrrc_mess_where_wagons': 'Применяю фильтр выборки...',
            'vrrc_mess_view_wagons': 'Показываю выборку...',
            'vrrc_mess_clear_wagons': 'Сбросить выборку...',
            'vrrc_mess_update_list': 'Обновляю списки...',
            'vrrc_mess_init_panel': 'Выполняю инициализацию модуля остаток вагонов на АМКР',
            'vrrc_mess_destroy_operation': 'Закрываю форму...',
        },
        'en':  //default language: English
        {
            'vrrc_card_header_panel': 'REPORT "OPERATIONAL REMAINING OF CARS ON AMKR"',

            'vrrc_title_outer_car': 'Outer side carriages',
            'vrrc_title_amkr_outer_cars': 'AMKR external cars',
            'vrrc_title_amkr_cars': 'Internal carriages',
            'vrrc_title_handed_cars': 'Handed cars at UZ',
            'vrrc_title_amkr_cisterns': 'Tanks rented',
            'vrrc_title_select_day': 'Over day:',
            'vrrc_title_select_top': 'Top:',
            'vrrc_title_operators': 'Operator:',
            'vrrc_title_limiting': 'Limit:',
            'vrrc_title_cargo_arrival': 'Cargo on arrival:',
            'vrrc_title_cargo_group_arrival': 'Arrival group:',
            'vrrc_title_certification_data': 'Certification data:',
            'vrrc_title_departure_station': 'Departure station:',
            'vrrc_title_division': 'Consignee:',
            'vrrc_title_station_contiguity': 'External arrival:',
            'vrrc_title_condition_arrival': 'Layout on arrival:',
            'vrrc_title_condition_mr': 'Cars MR:',
            'vrrc_title_genus': 'Carriage type:',
            'vrrc_title_cargo_sending': 'Shipment by departure:',
            'vrrc_title_cargo_group_sending': 'OTR Group:',
            'vrrc_title_division_loading': 'Shop-loading:',
            'vrrc_title_destination_station': 'Destination station:',
            'vrrc_title_paid': 'Paid sign:',
            'vrrc_title_station_amkr': 'Station of the carriage:',
            'vrrc_title_not_surrender_cars': 'Excluding surrendered cars:',

            'vrrc_title_aplly_day': 'Apply select over specified days',
            'vrrc_title_aplly_top': 'Apply select top',
            'vrrc_title_yes': 'Yes',

            'vrrc_title_add_ok': 'UPDATE',
            'vrrc_title_where_clear': 'RESET',
            'vrrc_title_where_load': 'UPDATE',
            'vrrc_title_select': 'Everyone ...',
            'vrrc_title_null': '-',
            'vrrc_title_confirm_clear': 'Reset?',
            'vrrc_title_mesage_clear': 'Reset selection?',
            'vrrc_title_confirm_load': 'Update?',
            'vrrc_title_mesage_load': 'Do you want to load new data from the IDS database?',

            'vrrc_mess_load_wagons': 'Loading wagons ...',
            'vrrc_mess_where_wagons': 'Applying selection filter ...',
            'vrrc_mess_view_wagons': 'Showing selection ...',
            'vrrc_mess_clear_wagons': 'Reset selection ...',
            'vrrc_mess_update_list': 'Updating lists ...',
            'vrrc_mess_init_panel': 'I am initializing the module the rest of the cars on the AMKR',
            'vrrc_mess_destroy_operation': 'Closing the form ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var FIF = App.form_infield;
    var MCF = App.modal_confirm_form; // Создать модальную форму "Окно сообщений"

    var TCWay = App.table_cars_way;         // Модуль вагоны на путях
    var alert = App.alert_form;

    function div_panel(base) {
        var row = new base.fc_ui.el_row();
        var col = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', '', '', langView('vrrc_card_header_panel', App.Langs));

        var fieldset_setup = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_table = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);//langView('vrrc_fieldset_on_table_title', App.Langs)
        this.$table_select = fieldset_table.$fieldset;

        var row_body = new base.fc_ui.el_row();
        var col_setup = new base.fc_ui.el_col('xl', 2, null);
        var col_table = new base.fc_ui.el_col('xl', 10, null);
        row_body.$row.append(col_setup.$col.append(this.$setup_select)).append(col_table.$col.append(this.$table_select));
        var alert = new base.fc_ui.el_alert(null);
        this.$alert = alert.$alert;
        card_panel.$body.append(row_body.$row);

        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };

    function view_report_remainder_cars(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_report_remainder_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация модуля
    view_report_remainder_cars.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        // теперь выполним инициализацию, определим основные свойства
        // Создать модальную форму "Окно сообщений"
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            ids_wsd: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();

        this.wagons = [];               // Список вагонов на АМКР (рабочий после load)
        this.list_operators = [];       // Список операторов
        this.list_limiting = [];       // Список ограничений
        //this.wagons_where = [];        // Список вагонов на АМКР (рабочий для отображения после выборки where)

        // Выборка
        this.where_option = {
            outer_car: true,                //Внешние стороние вагоны
            amkr_outer_cars: true,          //Внешние вагоны АМКР
            amkr_cars: true,                //Внутри-заводские вагоны
            handed_cars: true,             //Сданные вагоны
            amkr_cisterns: true,           //Цистерны АМКР
            select_day: 0,                  //Сверх суток
            select_top: 0,                  //Топ
            id_operator: -1,                //Оператор
            id_limiting: -1,                //Ограничение
            id_cargo_arrival: -1,           //Груз по прибытию
            id_cargo_group_arrival: -1,     //Группа по ПРИБ
            id_certification_data: -1,      //Сертификационные данные
            id_departure_station: -1,       //Станция отправления
            id_division: -1,                //Грузополучатель
            id_station_contiguity: -1,      //Внешнее прибытие
            id_condition_arrival: -1,       //Разметка по прибытию
            condition_mr: false,            //Вагоны МР
            id_genus: -1,                   //Род вагона
            id_cargo_sending: -1,           //Груз по отправлению
            id_cargo_group_sending: -1,     //Группа по ОТПР
            id_division_loading: -1,        //Цех-погрузки
            id_destination_station: -1,     //Станция назначения
            paid: false,                    //Признак платности
            id_station_amkr: -1,            //Станция нахождения вагона
        }
        // Сообщение
        LockScreen(langView('vrrc_mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty();
        this.$setup_select = panelElement.$setup_select;
        this.$table_select = panelElement.$table_select;

        this.alert_select = new alert(panelElement.$alert);

        this.$panel.append(panelElement.$element);
        // Создадим и добавим макет таблицы

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['operators_wagons_group'], false, function (result) {
            // Подгрузили списки
            //--------------------ФОРМА  ---------------------------
            // Создадим форму выбора отчета (this.$setup_select)
            var form_select = new this.fc_ui.el_form(null, 'text-left');
            this.form_select = form_select.$form;
            // Добавим кнопки
            var div_button_form_row = new this.fc_ui.el_div_form_row();
            var col_button_clear = new this.fc_ui.el_col('md', 6, 'mb-1');
            var col_button_load = new this.fc_ui.el_col('md', 6, 'mb-1');
            var bt_clear = new this.fc_ui.el_button('sm', 'btn-primary ml-1', 'where-clear', langView('vrrc_title_where_clear', App.Langs), null);
            var bt_load = new this.fc_ui.el_button('sm', 'btn-primary ml-1', 'where-load', langView('vrrc_title_where_load', App.Langs), null);
            div_button_form_row.$div.append(col_button_clear.$col.append(bt_clear.$button)).append(col_button_load.$col.append(bt_load.$button));

            this.form_select.append(div_button_form_row.$div);
            // добавим выбор вагонов
            var div_fg_cars = new this.fc_ui.el_div_form_group();
            var sw_outer_cars = new this.fc_ui.el_switch('outer_cars', langView('vrrc_title_outer_car', App.Langs));
            var sw_amkr_outer_cars = new this.fc_ui.el_switch('amkr_outer_cars', langView('vrrc_title_amkr_outer_cars', App.Langs));
            var sw_amkr_cars = new this.fc_ui.el_switch('amkr_cars', langView('vrrc_title_amkr_cars', App.Langs));
            var sw_handed_cars = new this.fc_ui.el_switch('handed_cars', langView('vrrc_title_handed_cars', App.Langs));
            var sw_amkr_cisterns = new this.fc_ui.el_switch('amkr_cisterns', langView('vrrc_title_amkr_cisterns', App.Langs));
            div_fg_cars.$div.append(sw_outer_cars.$switch).append(sw_amkr_outer_cars.$switch).append(sw_amkr_cars.$switch).append(sw_handed_cars.$switch).append(sw_amkr_cisterns.$switch);
            // Добавим top свыше дней
            var div_fr_day_top = new this.fc_ui.el_div_form_row();
            var col_day = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_day = new this.fc_ui.el_label('select_day', null, langView('vrrc_title_select_day', App.Langs));
            var div_ig_day = new this.fc_ui.el_div_input_group();
            var div_igp_day = new this.fc_ui.el_div_input_group_prepend();
            var div_iga_day = new this.fc_ui.el_div_input_group_append();
            var bt_plus_day = new this.fc_ui.el_button('sm', 'btn-outline-dark', 'aplly-day', null, 'fas fa-plus');
            var bt_minus_day = new this.fc_ui.el_button('sm', 'btn-outline-dark', 'aplly-day', null, 'fas fa-minus');
            var bt_aplly_day = new this.fc_ui.el_button('sm', 'btn-primary ml-1', 'aplly-day', null, 'fas fa-retweet');
            var imp_day = new this.fc_ui.el_input('select_day', 'number', 'text-center form-control form-control-sm', null, false, 0, 1000, null, null, null);
            div_igp_day.$div.append(bt_minus_day.$button);
            div_iga_day.$div.append(bt_plus_day.$button).append(bt_aplly_day.$button.attr('title', langView('vrrc_title_aplly_day', App.Langs)));
            div_ig_day.$div.append(div_igp_day.$div).append(imp_day.$input.val('0')).append(div_iga_day.$div);
            col_day.$col.append(lab_day.$label).append(div_ig_day.$div);
            // Добавим top 
            var col_top = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_top = new this.fc_ui.el_label('select_top', null, langView('vrrc_title_select_top', App.Langs));
            var div_ig_top = new this.fc_ui.el_div_input_group();
            var div_igp_top = new this.fc_ui.el_div_input_group_prepend();
            var div_iga_top = new this.fc_ui.el_div_input_group_append();
            var bt_plus_top = new this.fc_ui.el_button('sm', 'btn-outline-dark', 'aplly-top', null, 'fas fa-plus');
            var bt_minus_top = new this.fc_ui.el_button('sm', 'btn-outline-dark', 'aplly-top', null, 'fas fa-minus');
            var bt_aplly_top = new this.fc_ui.el_button('sm', 'btn-primary ml-1', 'aplly-top', null, 'fas fa-retweet');
            var imp_top = new this.fc_ui.el_input('select_top', 'number', 'text-center form-control form-control-sm', null, false, 0, 100, null, null, null);
            div_igp_top.$div.append(bt_minus_top.$button);
            div_iga_top.$div.append(bt_plus_top.$button).append(bt_aplly_top.$button.attr('title', langView('vrrc_title_aplly_top', App.Langs)));
            div_ig_top.$div.append(div_igp_top.$div).append(imp_top.$input.val('0')).append(div_iga_top.$div);
            col_top.$col.append(lab_top.$label).append(div_ig_top.$div);
            this.form_select.append(div_fg_cars.$div).append(div_fr_day_top.$div.append(col_day.$col).append(col_top.$col));
            // Добавим выбор оператора
            var div_operator_form_row = new this.fc_ui.el_div_form_row();
            var col_operator = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_operator = new this.fc_ui.el_label('operators', null, langView('vrrc_title_operators', App.Langs));
            var sel_operator = new this.fc_ui.el_select('operators', 'custom-select custom-select-sm', null, false);
            div_operator_form_row.$div.append(col_operator.$col.append(lab_operator.$label).append(sel_operator.$select));
            this.form_select.append(div_operator_form_row.$div);
            // Добавим выбор ограничения
            var div_limiting_form_row = new this.fc_ui.el_div_form_row();
            var col_limiting = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_limiting = new this.fc_ui.el_label('limiting', null, langView('vrrc_title_limiting', App.Langs));
            var sel_limiting = new this.fc_ui.el_select('limiting', 'custom-select custom-select-sm', null, false);
            div_limiting_form_row.$div.append(col_limiting.$col.append(lab_limiting.$label).append(sel_limiting.$select));
            this.form_select.append(div_limiting_form_row.$div);
            // Добавим выбор груза по прибытию (autocomplete)
            var div_arrival_cargo_form_row = new this.fc_ui.el_div_form_row();
            var col_arrival_cargo = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_arrival_cargo = new this.fc_ui.el_label('arrival_cargo', null, langView('vrrc_title_cargo_arrival', App.Langs));
            var inp_arrival_cargo = new this.fc_ui.el_input_text('arrival_cargo', 'form-control form-control-sm', null, false, null, null);
            div_arrival_cargo_form_row.$div.append(col_arrival_cargo.$col.append(lab_arrival_cargo.$label).append(inp_arrival_cargo.$input));
            this.form_select.append(div_arrival_cargo_form_row.$div);
            // Добавим выбор группы груза по прибытию
            var div_arrival_group_cargo_form_row = new this.fc_ui.el_div_form_row();
            var col_arrival_group_cargo = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_arrival_group_cargo = new this.fc_ui.el_label('arrival_group_cargo', null, langView('vrrc_title_cargo_group_arrival', App.Langs));
            var sel_arrival_group_cargo = new this.fc_ui.el_select('arrival_group_cargo', 'custom-select custom-select-sm', null, false);
            div_arrival_group_cargo_form_row.$div.append(col_arrival_group_cargo.$col.append(lab_arrival_group_cargo.$label).append(sel_arrival_group_cargo.$select));
            this.form_select.append(div_arrival_group_cargo_form_row.$div);
            // Добавим выбор сертификационные данные (autocomplete)
            var div_arrival_sertification_data_form_row = new this.fc_ui.el_div_form_row();
            var col_arrival_sertification_data = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_arrival_sertification_data = new this.fc_ui.el_label('arrival_sertification_data', null, langView('vrrc_title_certification_data', App.Langs));
            var inp_arrival_sertification_data = new this.fc_ui.el_input_text('arrival_sertification_data', 'form-control form-control-sm', null, false, null, null);
            div_arrival_sertification_data_form_row.$div.append(col_arrival_sertification_data.$col.append(lab_arrival_sertification_data.$label).append(inp_arrival_sertification_data.$input));
            this.form_select.append(div_arrival_sertification_data_form_row.$div);
            // Добавим выбор станция отправления(autocomplete)
            var div_arrival_station_from_name_form_row = new this.fc_ui.el_div_form_row();
            var col_arrival_station_from_name = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_arrival_station_from_name = new this.fc_ui.el_label('arrival_station_from_name', null, langView('vrrc_title_departure_station', App.Langs));
            var inp_arrival_station_from_name = new this.fc_ui.el_input_text('arrival_station_from_name', 'form-control form-control-sm', null, false, null, null);
            div_arrival_station_from_name_form_row.$div.append(col_arrival_station_from_name.$col.append(lab_arrival_station_from_name.$label).append(inp_arrival_station_from_name.$input));
            this.form_select.append(div_arrival_station_from_name_form_row.$div);
            // Добавим выбор грузополучатель
            var div_arrival_division_amkr_form_row = new this.fc_ui.el_div_form_row();
            var col_arrival_division_amkr = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_arrival_division_amkr = new this.fc_ui.el_label('arrival_division_amkr', null, langView('vrrc_title_division', App.Langs));
            var sel_arrival_division_amkr = new this.fc_ui.el_select('arrival_division_amkr', 'custom-select custom-select-sm', null, false);
            div_arrival_division_amkr_form_row.$div.append(col_arrival_division_amkr.$col.append(lab_arrival_division_amkr.$label).append(sel_arrival_division_amkr.$select));
            this.form_select.append(div_arrival_division_amkr_form_row.$div);
            // Добавим выбор внешнее прибытие
            var div_accepted_station_amkr_abbr_form_row = new this.fc_ui.el_div_form_row();
            var col_accepted_station_amkr_abbr = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_accepted_station_amkr_abbr = new this.fc_ui.el_label('accepted_station_amkr_abbr', null, langView('vrrc_title_station_contiguity', App.Langs));
            var sel_accepted_station_amkr_abbr = new this.fc_ui.el_select('accepted_station_amkr_abbr', 'custom-select custom-select-sm', null, false);
            div_accepted_station_amkr_abbr_form_row.$div.append(col_accepted_station_amkr_abbr.$col.append(lab_accepted_station_amkr_abbr.$label).append(sel_accepted_station_amkr_abbr.$select));
            this.form_select.append(div_accepted_station_amkr_abbr_form_row.$div);
            // Добавим выбор разметка по прибытию
            var div_arrival_condition_abbr_form_row = new this.fc_ui.el_div_form_row();
            var col_arrival_condition_abbr = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_arrival_condition_abbr = new this.fc_ui.el_label('arrival_condition_abbr', null, langView('vrrc_title_condition_arrival', App.Langs));
            var sel_arrival_condition_abbr = new this.fc_ui.el_select('arrival_condition_abbr', 'custom-select custom-select-sm', null, false);
            div_arrival_condition_abbr_form_row.$div.append(col_arrival_condition_abbr.$col.append(lab_arrival_condition_abbr.$label).append(sel_arrival_condition_abbr.$select));
            this.form_select.append(div_arrival_condition_abbr_form_row.$div);
            // добавим выбор МР МРт
            var div_fg_condition_mr = new this.fc_ui.el_div_form_group();
            var sw_condition_mr = new this.fc_ui.el_switch('condition_mr', langView('vrrc_title_condition_mr', App.Langs));
            div_fg_condition_mr.$div.append(sw_condition_mr.$switch);
            this.form_select.append(div_fg_condition_mr.$div);
            // Добавим выбор род вагона
            var div_wagon_rod_abbr_form_row = new this.fc_ui.el_div_form_row();
            var col_wagon_rod_abbr = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_wagon_rod_abbr = new this.fc_ui.el_label('wagon_rod_abbr', null, langView('vrrc_title_genus', App.Langs));
            var sel_wagon_rod_abbr = new this.fc_ui.el_select('wagon_rod_abbr', 'custom-select custom-select-sm', null, false);
            div_wagon_rod_abbr_form_row.$div.append(col_wagon_rod_abbr.$col.append(lab_wagon_rod_abbr.$label).append(sel_wagon_rod_abbr.$select));
            this.form_select.append(div_wagon_rod_abbr_form_row.$div);
            // Добавим выбор груза по отправке (autocomplete)
            var div_sending_cargo_form_row = new this.fc_ui.el_div_form_row();
            var col_sending_cargo = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_sending_cargo = new this.fc_ui.el_label('sending_cargo', null, langView('vrrc_title_cargo_sending', App.Langs));
            var inp_sending_cargo = new this.fc_ui.el_input_text('sending_cargo', 'form-control form-control-sm', null, false, null, null);
            div_sending_cargo_form_row.$div.append(col_sending_cargo.$col.append(lab_sending_cargo.$label).append(inp_sending_cargo.$input));
            this.form_select.append(div_sending_cargo_form_row.$div);
            // Добавим выбор группы груза по отправке
            var div_sending_group_cargo_form_row = new this.fc_ui.el_div_form_row();
            var col_sending_group_cargo = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_sending_group_cargo = new this.fc_ui.el_label('sending_group_cargo', null, langView('vrrc_title_cargo_group_sending', App.Langs));
            var sel_sending_group_cargo = new this.fc_ui.el_select('sending_group_cargo', 'custom-select custom-select-sm', null, false);
            div_sending_group_cargo_form_row.$div.append(col_sending_group_cargo.$col.append(lab_sending_group_cargo.$label).append(sel_sending_group_cargo.$select));
            this.form_select.append(div_sending_group_cargo_form_row.$div);
            // Добавим цех погрузки
            var div_loading_division_amkr_form_row = new this.fc_ui.el_div_form_row();
            var col_loading_division_amkr = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_loading_division_amkr = new this.fc_ui.el_label('loading_division_amkr', null, langView('vrrc_title_division_loading', App.Langs));
            var sel_loading_division_amkr = new this.fc_ui.el_select('loading_division_amkr', 'custom-select custom-select-sm', null, false);
            div_loading_division_amkr_form_row.$div.append(col_loading_division_amkr.$col.append(lab_loading_division_amkr.$label).append(sel_loading_division_amkr.$select));
            this.form_select.append(div_loading_division_amkr_form_row.$div);
            // Добавим выбор станция назаначения
            var div_destination_station_form_row = new this.fc_ui.el_div_form_row();
            var col_destination_station = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_destination_station = new this.fc_ui.el_label('destination_station', null, langView('vrrc_title_destination_station', App.Langs));
            var inp_destination_station = new this.fc_ui.el_input_text('destination_station', 'form-control form-control-sm', null, false, null, null);
            div_destination_station_form_row.$div.append(col_destination_station.$col.append(lab_destination_station.$label).append(inp_destination_station.$input));
            this.form_select.append(div_destination_station_form_row.$div);
            // добавим выбор признака платности
            var div_fg_paid = new this.fc_ui.el_div_form_group();
            var sw_paid = new this.fc_ui.el_switch('paid', langView('vrrc_title_paid', App.Langs));
            div_fg_paid.$div.append(sw_paid.$switch);
            this.form_select.append(div_fg_paid.$div);
            // Добавим выбор станция нахождения вагона
            var div_current_station_amkr_form_row = new this.fc_ui.el_div_form_row();
            var col_current_station_amkr = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_current_station_amkr = new this.fc_ui.el_label('current_station_amkr', null, langView('vrrc_title_station_amkr', App.Langs));
            var sel_current_station_amkr = new this.fc_ui.el_select('current_station_amkr', 'custom-select custom-select-sm', null, false);
            div_current_station_amkr_form_row.$div.append(col_current_station_amkr.$col.append(lab_current_station_amkr.$label).append(sel_current_station_amkr.$select));
            this.form_select.append(div_current_station_amkr_form_row.$div);


            // Отображение формы
            this.$setup_select.append(this.form_select);
            // обработка события submit
            //this.form_select.bind("keypress", function (e) {
            //    if (e.keyCode == 13) {
            //        // return false;
            //    }
            //});
            // Получим элементы формы
            this.el_bt_clear = bt_clear.$button;
            this.el_bt_load = bt_load.$button;
            this.el_sw_outer_cars = sw_outer_cars.$input;
            this.el_sw_amkr_outer_cars = sw_amkr_outer_cars.$input;
            this.el_sw_amkr_cars = sw_amkr_cars.$input;
            this.el_handed_cars = sw_handed_cars.$input;
            this.el_amkr_cisterns = sw_amkr_cisterns.$input;
            // day
            this.el_imp_day = imp_day.$input;
            this.el_bt_plus_day = bt_plus_day.$button;
            this.el_bt_minus_day = bt_minus_day.$button;
            this.el_bt_aplly_day = bt_aplly_day.$button;
            // top
            this.el_imp_top = imp_top.$input;
            this.el_bt_plus_top = bt_plus_top.$button;
            this.el_bt_minus_top = bt_minus_top.$button;
            this.el_bt_aplly_top = bt_aplly_top.$button;
            //
            this.el_select_operator = sel_operator.$select;
            this.el_select_limiting = sel_limiting.$select;
            this.el_arrival_cargo = inp_arrival_cargo.$input.autocomplete({
                autoFocus: false,
                minLength: 1,
                source: [],
                change: function (event, ui) {
                    if (ui.item === null) {
                        var column = this.tab_cars.obj_t_cars.columns('.fl-arrival_cargo_name');
                        column
                            .search('', true, false)
                            .draw();
                        this.el_arrival_cargo.val('');
                    }
                }.bind(this),
                select: function (event, ui) {
                    //event.preventDefault();
                    var val = $.fn.dataTable.util.escapeRegex(
                        ui.item.value
                    );
                    var column = this.tab_cars.obj_t_cars.columns('.fl-arrival_cargo_name');
                    switch (val) {
                        case "": break;
                        case "null": val = '^\s*$'; break;
                        default: val = '^' + val + '$'; break;
                    }
                    column
                        .search(val, true, false)
                        .draw();
                }.bind(this)
            });
            this.el_arrival_group_cargo = sel_arrival_group_cargo.$select;
            this.el_arrival_sertification_data = inp_arrival_sertification_data.$input.autocomplete({
                autoFocus: false,
                minLength: 1,
                source: [],
                change: function (event, ui) {
                    if (ui.item === null) {
                        var column = this.tab_cars.obj_t_cars.columns('.fl-arrival_sertification_data');
                        column
                            .search('', true, false)
                            .draw();
                        this.el_arrival_cargo.val('');
                    }
                }.bind(this),
                select: function (event, ui) {
                    var val = $.fn.dataTable.util.escapeRegex(
                        ui.item.value
                    );
                    var column = this.tab_cars.obj_t_cars.columns('.fl-arrival_sertification_data');
                    switch (val) {
                        case "": break;
                        case "null": val = '^\s*$'; break;
                        default: val = '^' + val + '$'; break;
                    }
                    column
                        .search(val, true, false)
                        .draw();
                }.bind(this)
            });
            this.el_arrival_station_from_name = inp_arrival_station_from_name.$input.autocomplete({
                autoFocus: false,
                minLength: 1,
                source: [],
                change: function (event, ui) {
                    if (ui.item === null) {
                        var column = this.tab_cars.obj_t_cars.columns('.fl-arrival_station_from_name');
                        column
                            .search('', true, false)
                            .draw();
                        this.el_arrival_cargo.val('');
                    }
                }.bind(this),
                select: function (event, ui) {
                    var val = $.fn.dataTable.util.escapeRegex(
                        ui.item.value
                    );
                    var column = this.tab_cars.obj_t_cars.columns('.fl-arrival_station_from_name');
                    switch (val) {
                        case "": break;
                        case "null": val = '^\s*$'; break;
                        default: val = '^' + val + '$'; break;
                    }
                    column
                        .search(val, true, false)
                        .draw();
                }.bind(this)
            });
            this.el_arrival_division_amkr = sel_arrival_division_amkr.$select;
            this.el_accepted_station_amkr_abbr = sel_accepted_station_amkr_abbr.$select;
            this.el_arrival_condition_abbr = sel_arrival_condition_abbr.$select;
            this.el_condition_mr = sw_condition_mr.$input;
            this.el_wagon_rod_abbr = sel_wagon_rod_abbr.$select;
            this.el_sending_cargo = inp_sending_cargo.$input.prop('disabled', true).autocomplete({
                autoFocus: false,
                minLength: 1,
                source: [],
                change: function (event, ui) {
                    //if (ui.item === null) {
                    //    var column = this.tab_cars.obj_t_cars.columns('.fl-sending_cargo_name');
                    //    column
                    //        .search('', true, false)
                    //        .draw();
                    //    this.el_arrival_cargo.val('');
                    //}
                }.bind(this),
                select: function (event, ui) {
                    //var val = $.fn.dataTable.util.escapeRegex(
                    //    ui.item.value
                    //);
                    //var column = this.tab_cars.obj_t_cars.columns('.fl-sending_cargo_name');
                    //switch (val) {
                    //    case "": break;
                    //    case "null": val = '^\s*$'; break;
                    //    default: val = '^' + val + '$'; break;
                    //}
                    //column
                    //    .search(val, true, false)
                    //    .draw();
                }.bind(this)
            });
            this.el_sending_group_cargo = sel_sending_group_cargo.$select.prop('disabled', true);
            this.el_loading_division_amkr = sel_loading_division_amkr.$select.prop('disabled', true);
            this.el_destination_station = inp_destination_station.$input.prop('disabled', true).autocomplete({
                autoFocus: false,
                minLength: 1,
                source: [],
                change: function (event, ui) {
                    //if (ui.item === null) {
                    //    var column = this.tab_cars.obj_t_cars.columns('.fl-');
                    //    column
                    //        .search('', true, false)
                    //        .draw();
                    //    this.el_arrival_cargo.val('');
                    //}
                }.bind(this),
                select: function (event, ui) {
                    //var val = $.fn.dataTable.util.escapeRegex(
                    //    ui.item.value
                    //);
                    //var column = this.tab_cars.obj_t_cars.columns('.fl-');
                    //switch (val) {
                    //    case "": break;
                    //    case "null": val = '^\s*$'; break;
                    //    default: val = '^' + val + '$'; break;
                    //}
                    //column
                    //    .search(val, true, false)
                    //    .draw();
                }.bind(this)
            });
            this.el_paid = sw_paid.$input;
            this.el_current_station_amkr = sel_current_station_amkr.$select;
            // Обработка событий  ------------------
            // Событие сбросить
            this.el_bt_clear.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.modal_confirm_form.view(langView('vrrc_title_confirm_clear', App.Langs), langView('vrrc_title_mesage_clear', App.Langs), function (res) {
                    if (res) {
                        this.clear_where();
                    }
                }.bind(this));
            }.bind(this));
            // Событие обновить
            this.el_bt_load.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.modal_confirm_form.view(langView('vrrc_title_confirm_load', App.Langs), langView('vrrc_title_mesage_load', App.Langs), function (res) {
                    if (res) {
                        this.load_where();
                    }
                }.bind(this));
            }.bind(this));
            // Внешние вагоны
            this.el_sw_outer_cars.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                this.where_option.outer_car = checked;
                this.update_where(); // Обновим выборку

            }.bind(this));
            // Внешние вагоны АМКР
            this.el_sw_amkr_outer_cars.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                this.where_option.amkr_outer_cars = checked;
                this.update_where(); // Обновим выборку
            }.bind(this));
            // Вагоны АМКР
            this.el_sw_amkr_cars.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                this.where_option.amkr_cars = checked;
                this.update_where(); // Обновим выборку
            }.bind(this));
            // Вагоны сданные
            this.el_handed_cars.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                this.where_option.handed_cars = checked;
                this.update_where(); // Обновим выборку
            }.bind(this));
            // цистерны АМКР
            this.el_amkr_cisterns.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                this.where_option.amkr_cisterns = checked;
                this.update_where(); // Обновим выборку
            }.bind(this));
            // top
            this.el_imp_day.on('keydown', function (event) {
                if (event.keyCode == 13) {
                    $(event.currentTarget).change();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }.bind(this)).on('change', function (event) {
                var value = $(event.currentTarget).val();
                if (value !== '' && value !== null) {

                    if (Number(value) > 1000) {
                        this.where_option.select_day = 1000;
                        $(event.currentTarget).val(this.where_option.select_day);
                    }
                    if (Number(value) < 0) {
                        this.where_option.select_day = 0;
                        $(event.currentTarget).val(this.where_option.select_day);
                    }
                    if (Number(value) >= 0 && Number(value) <= 1000) {
                        this.where_option.select_day = Number(value);
                    }
                } else {
                    this.where_option.select_day = 0;
                    $(event.currentTarget).val(this.where_option.select_day);
                }
            }.bind(this));
            //
            this.el_bt_plus_day.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var value = this.el_imp_day.val();
                if (value !== '' && value !== null) {
                    this.where_option.select_day = Number(value);
                    if (this.where_option.select_day < 1000) {
                        this.el_imp_day.val(++this.where_option.select_day);
                    } else {
                        this.where_option.select_day = 0;
                        this.el_imp_day.val(this.where_option.select_day)
                    }

                } else {
                    this.where_option.select_day = 0;
                    this.el_imp_day.val(this.where_option.select_day)
                }
            }.bind(this));
            this.el_bt_minus_day.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var value = this.el_imp_day.val();
                if (value !== '' && value !== null) {
                    this.where_option.select_day = Number(value);
                    if (this.where_option.select_day > 0) {
                        this.el_imp_day.val(--this.where_option.select_day);
                    } else {
                        this.where_option.select_day = 1000;
                        this.el_imp_day.val(this.where_option.select_day)
                    }

                } else {
                    this.where_option.select_day = 0;
                    this.el_imp_day.val(this.where_option.select_day)
                }
            }.bind(this));
            this.el_bt_aplly_day.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.update_where(); // Обновим выборку
            }.bind(this));
            // top
            this.el_imp_top.on('keydown', function (event) {
                if (event.keyCode == 13) {
                    $(event.currentTarget).change();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }.bind(this)).on('change', function (event) {
                var value = $(event.currentTarget).val();
                if (value !== '' && value !== null) {

                    if (Number(value) > 100) {
                        this.where_option.select_top = 100;
                        $(event.currentTarget).val(this.where_option.select_top);
                    }
                    if (Number(value) < 0) {
                        this.where_option.select_top = 0;
                        $(event.currentTarget).val(this.where_option.select_top);
                    }
                    if (Number(value) >= 0 && Number(value) <= 100) {
                        this.where_option.select_top = Number(value);
                    }
                } else {
                    this.where_option.select_top = 0;
                    $(event.currentTarget).val(this.where_option.select_top);
                }
            }.bind(this));
            this.el_bt_plus_top.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var value = this.el_imp_top.val();
                if (value !== '' && value !== null) {
                    this.where_option.select_top = Number(value);
                    if (this.where_option.select_top < 100) {
                        this.el_imp_top.val(++this.where_option.select_top);
                    } else {
                        this.where_option.select_top = 0;
                        this.el_imp_top.val(this.where_option.select_top)
                    }

                } else {
                    this.where_option.select_top = 0;
                    this.el_imp_top.val(this.where_option.select_top)
                }
            }.bind(this));
            this.el_bt_minus_top.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var value = this.el_imp_top.val();
                if (value !== '' && value !== null) {
                    this.where_option.select_top = Number(value);
                    if (this.where_option.select_top > 0) {
                        this.el_imp_top.val(--this.where_option.select_top);
                    } else {
                        this.where_option.select_top = 100;
                        this.el_imp_top.val(this.where_option.select_top)
                    }

                } else {
                    this.where_option.select_top = 0;
                    this.el_imp_top.val(this.where_option.select_top)
                }
            }.bind(this));
            this.el_bt_aplly_top.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.update_where(); // Обновим выборку
            }.bind(this));
            //
            this.el_select_operator.on('change', function (event) {
                this.event_select_change(event, 'operator_abbr');
            }.bind(this));
            //
            this.el_select_limiting.on('change', function (event) {
                this.event_select_change(event, 'limiting_abbr');
            }.bind(this));
            // Груз по прибытию
            this.el_arrival_cargo.on('keydown', function (event) {
                if (event.keyCode == 13) {
                    this.el_arrival_cargo.change();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }.bind(this)).on('change', function (event) {
                this.event_autocomplete_change(event, 'arrival_cargo_name');
            }.bind(this));
            // группа груза по ПРИБ
            this.el_arrival_group_cargo.on('change', function (event) {
                this.event_select_change(event, 'arrival_cargo_group_name');
            }.bind(this));
            // Сертиф. данные
            this.el_arrival_sertification_data.on('keydown', function (event) {
                if (event.keyCode == 13) {
                    this.el_arrival_sertification_data.change();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }.bind(this)).on('change', function (event) {
                this.event_autocomplete_change(event, 'arrival_sertification_data');
            }.bind(this));
            // Станция отправления
            this.el_arrival_station_from_name.on('keydown', function (event) {
                if (event.keyCode == 13) {
                    this.el_arrival_station_from_name.change();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }.bind(this)).on('change', function (event) {
                this.event_autocomplete_change(event, 'arrival_station_from_name');
            }.bind(this));
            // грузополучатель (цех)
            this.el_arrival_division_amkr.on('change', function (event) {
                this.event_select_change(event, 'arrival_division_amkr_abbr');
            }.bind(this));
            // внешнее прибытие
            this.el_accepted_station_amkr_abbr.on('change', function (event) {
                this.event_select_change(event, 'accepted_station_amkr_abbr');
            }.bind(this));
            // разметка по прибытию
            this.el_arrival_condition_abbr.on('change', function (event) {
                this.event_select_change(event, 'arrival_condition_abbr');
            }.bind(this));
            // Выбор МР МРт
            this.el_condition_mr.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                var val = '';
                if (checked) {
                    val = '^' + langView('vrrc_title_yes', App.Langs) + '$';
                };
                var column = this.tab_cars.obj_t_cars.columns('.fl-condition_repairs');
                if (column && column.length > 0) {
                    // поле выбрано, выполним выборку
                    column
                        .search(val, true, false)
                        .draw();
                }
            }.bind(this));
            // род вагона
            this.el_wagon_rod_abbr.on('change', function (event) {
                this.event_select_change(event, 'wagon_rod_abbr');
            }.bind(this));
            // Груз по отпрвке
            this.el_sending_cargo.on('keydown', function (event) {
                if (event.keyCode == 13) {
                    this.el_sending_cargo.change();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }.bind(this)).on('change', function (event) {
                //this.event_autocomplete_change(event, '');
            }.bind(this));
            // группа груза по ОТПР
            this.el_arrival_group_cargo.on('change', function (event) {
                //this.event_select_change(event, '');
            }.bind(this));
            // Цех погрузки
            this.el_loading_division_amkr.on('change', function (event) {
                //this.event_select_change(event, '');
            }.bind(this));
            // станция назначения
            this.el_destination_station.on('change', function (event) {
                //this.event_select_change(event, '');
            }.bind(this));
            // Выбор платноти
            this.el_paid.on('change', function (event) {
                event.preventDefault();
                var checked = $(event.currentTarget).prop('checked');
                var val = '';
                if (checked) {
                    val = '^' + langView('vrrc_title_yes', App.Langs) + '$';
                };
                var column = this.tab_cars.obj_t_cars.columns('.fl-operator_paid');
                if (column && column.length > 0) {
                    // поле выбрано, выполним выборку
                    column
                        .search(val, true, false)
                        .draw();
                }
            }.bind(this));
            // текущая станция
            this.el_current_station_amkr.on('change', function (event) {
                this.event_select_change(event, 'current_station_amkr_abbr');
            }.bind(this));
            //----- ТАБЛИЦА ------------------------------------------------------
            var $div_table = $('<div></div>', {
                'id': 'table-' + this.selector,
            });
            // Инициализация таблицы
            if ($div_table && $div_table.length > 0) {
                this.$table_select.append($div_table);
                this.tab_cars = new TCWay('div#table-' + this.selector);
                // Инициализация элементов поиска по таблице
                this.tab_cars.init({
                    complete: [],
                    //complete: [
                    //    { field: 'operator_abbr', element: sel_operator.$select, type: 'select', pattern: null }
                    //    , { field: 'limiting_abbr', element: sel_limiting.$select, type: 'select', pattern: null }
                    //    , { field: 'arrival_cargo_name', element: sel_arrival_cargo.$select, type: 'select', pattern: null }
                    //],
                    type_report: 4,
                    alert: this.alert_select,
                }, function () {

                });
            };
            // Отобразим настройки выборки
            // Определим выбор вагонов по умолчанию
            this.el_sw_outer_cars.prop('checked', this.where_option.outer_car);
            this.el_sw_amkr_outer_cars.prop('checked', this.where_option.amkr_outer_cars);
            this.el_sw_amkr_cars.prop('checked', this.where_option.amkr_cars);
            this.el_handed_cars.prop('checked', this.where_option.handed_cars);
            this.el_amkr_cisterns.prop('checked', this.where_option.amkr_cisterns);
            //----------------------------------
            if (typeof fn_init_ok === 'function') {
                fn_init_ok(this.result_init);
            }
            //----------------------------------
        }.bind(this));
    };
    // Обработка события списочных элементов SELECT
    view_report_remainder_cars.prototype.event_select_change = function (event, field) {
        event.preventDefault();
        var val = $.fn.dataTable.util.escapeRegex(
            $(event.currentTarget).val()
        );
        var column = this.tab_cars.obj_t_cars.columns('.fl-' + field);
        if (column && column.length > 0) {
            // поле выбрано, выполним выборку
            switch (val) {
                case "": break;
                case "null": val = '^\s*$'; break;
                default: val = '^' + val + '$'; break;
            }
            column
                .search(val, true, false)
                .draw();
        }
    };
    // Обработка события списочных элементов Autocomplete
    view_report_remainder_cars.prototype.event_autocomplete_change = function (event, field) {
        event.preventDefault();
        var val = $(event.currentTarget).val();
        if (val === '') {
            var column = this.tab_cars.obj_t_cars.columns('.fl-' + field);
            if (column && column.length > 0) {
                column
                    .search('', true, false)
                    .draw();
            };
        }
    };
    // Инициализировать элемент выбора
    view_report_remainder_cars.prototype.init_where_element = function (element, field, type) {
        var value = element.val();
        element.empty().append('<option value="">' + langView('vrrc_title_select', App.Langs) + '</option>')
        //var index = col.indexes();
        var column = this.tab_cars.obj_t_cars.column(this.tab_cars.obj_t_cars.columns('.fl-' + field).indexes());
        if (column && column.length > 0) {
            switch (type) {
                case 'select': {
                    column.data().unique().sort().each(function (d, j) {
                        if (d === null) {
                            element.append('<option value=null>' + langView('vrrc_title_null', App.Langs) + '</option>')
                        } else {
                            element.append('<option value="' + d + '">' + d + '</option>')
                        };
                    }.bind(this));
                    break;
                }
                case 'autocomplete': {
                    var list = [];
                    column.data().unique().sort().each(function (d, j) {
                        list.push({ value: d, label: d });
                    }.bind(this));
                    element.autocomplete("option", "source", list);
                    break;
                }
            }
        }
        element.val(value);
    };
    // Инициализировать элементов выбора
    view_report_remainder_cars.prototype.init_where = function () {
        this.init_where_element(this.el_select_operator, 'operator_abbr', 'select');
        this.init_where_element(this.el_select_limiting, 'limiting_abbr', 'select');
        this.init_where_element(this.el_arrival_cargo, 'arrival_cargo_name', 'autocomplete');
        this.init_where_element(this.el_arrival_group_cargo, 'arrival_cargo_group_name', 'select');
        this.init_where_element(this.el_arrival_sertification_data, 'arrival_sertification_data', 'autocomplete');
        this.init_where_element(this.el_arrival_station_from_name, 'arrival_station_from_name', 'autocomplete');
        this.init_where_element(this.el_arrival_division_amkr, 'arrival_division_amkr_abbr', 'select');
        this.init_where_element(this.el_accepted_station_amkr_abbr, 'accepted_station_amkr_abbr', 'select');
        this.init_where_element(this.el_arrival_condition_abbr, 'arrival_condition_abbr', 'select');
        this.init_where_element(this.el_wagon_rod_abbr, 'wagon_rod_abbr', 'select');
        //this.init_where_element(this.el_sending_cargo, '', 'autocomplete');
        //this.init_where_element(this.el_sending_group_cargo, '', 'select');
        //this.init_where_element(this.el_loading_division_amkr, '', 'select');
        //this.init_where_element(this.el_destination_station, '', 'autocomplete');
        this.init_where_element(this.el_current_station_amkr, 'current_station_amkr_abbr', 'select');

    };
    // Показать данные 
    view_report_remainder_cars.prototype.view = function () {
        // Отобразим настройки выборки
        //this.form_setup.view_edit(this.where_option);
        // Выполним выборку
        this.where(this.where_option, function (wagons_where) {
            // Покажем вагоны
            LockScreen(langView('vrrc_mess_view_wagons', App.Langs));
            this.tab_cars.view(wagons_where, null);

        }.bind(this));
    };
    // Загрузить вагоны на пути в внутрений массив
    view_report_remainder_cars.prototype.load = function (b_clear_where) {
        LockScreen(langView('vrrc_mess_load_wagons', App.Langs));
        // Отобразим настройки выборки
        //this.form_setup.view_edit(this.where_option);
        this.ids_wsd.getViewWagonsOfBalance(function (wagons) {
            this.wagons = wagons;
            if (b_clear_where) this.clear_where(); // если определен бит сброса тогда сбросить выборку
            this.where(this.where_option, function (wagons) {
                LockScreen(langView('vrrc_mess_view_wagons', App.Langs));
                //покажем вагоны 
                this.tab_cars.view(wagons, null);
                this.init_where();
            }.bind(this));
        }.bind(this));
    };
    // Обновить выборку из базы данных
    view_report_remainder_cars.prototype.load_where = function () {
        this.load(false); // Загрузить без сброса
    };
    // Выполнить сброс выборки
    view_report_remainder_cars.prototype.clear_where = function () {
        LockScreen(langView('vrrc_mess_clear_wagons', App.Langs));
        // Проедемся по полям и сбросим выбор
        this.tab_cars.obj_t_cars.columns().indexes().flatten().each(function (i) {
            var column = this.tab_cars.obj_t_cars.column(i);
            column.search('', true, false);
        }.bind(this));
        // Проедемся по элементам выбора и сбросим выбор
        this.el_select_operator.val('');
        this.el_select_limiting.val('');
        this.el_arrival_cargo.val('');
        this.el_arrival_group_cargo.val('');
        this.el_arrival_sertification_data.val('');
        this.el_arrival_station_from_name.val('');
        this.el_arrival_division_amkr.val('');
        this.el_accepted_station_amkr_abbr.val('');
        this.el_arrival_condition_abbr.val('');
        this.el_condition_mr.prop('checked', false);
        this.el_wagon_rod_abbr.val('');
        this.el_sending_cargo.val('');
        this.el_sending_group_cargo.val('');
        this.el_loading_division_amkr.val('');
        this.el_paid.prop('checked', false);
        this.el_current_station_amkr.val('');

        this.tab_cars.obj_t_cars.search('').draw();

        LockScreenOff();

    };
    // Обновить выборку по условию
    view_report_remainder_cars.prototype.update_where = function () {
        this.where(this.where_option, function (wagons) {
            LockScreen(langView('vrrc_mess_view_wagons', App.Langs));
            //покажем вагоны 
            this.tab_cars.view(wagons, null);
        }.bind(this));
    };
    // Пренадлежит внешним вагонам
    view_report_remainder_cars.prototype.is_outer_cars = function (i) {
        return Boolean(i.id_operator !== 14 && i.id_operator !== 16 && i.id_operator !== 188);
    };
    // Пренадлежит внешним вагонам АМКР
    view_report_remainder_cars.prototype.is_amkr_outer_cars = function (i) {
        return Boolean(i.id_operator === 14 || i.id_operator === 16);
    };
    // Пренадлежит вагонам АМКР ВЗ
    view_report_remainder_cars.prototype.is_amkr_cars = function (i) {
        return Boolean(i.id_operator === 188);
    };
    // Пренадлежит сданным вагонам
    view_report_remainder_cars.prototype.is_handed_cars = function (i) {
        return i.outgoing_sostav_status !== null && Number(i.outgoing_sostav_status) === 2;
    };
    // Пренадлежит цестернам
    view_report_remainder_cars.prototype.is_amkr_cisterns = function (i) {
        return Boolean((i.id_operator === 28
            || i.id_operator === 23
            || i.id_operator === 2
            || i.id_operator === 41
            || i.id_operator === 125
            || i.id_operator === 193
            || i.id_operator === 192
            || i.id_operator === 31
            || i.id_operator === 29
            || i.id_operator === 32
            || i.id_operator === 27
            || i.id_operator === 1201)
            && i.wagon_rod === 70);
    };
    // Уточняющий запрос сданные вагоны и цистерны
    view_report_remainder_cars.prototype.is_clarify_where = function (is_result, where_option, i) {
        if (is_result === null) { is_result = true; }
        // Отобразить все 
        if (where_option.handed_cars === false && where_option.amkr_cisterns === false) {
            return is_result & !(this.is_handed_cars(i) || this.is_amkr_cisterns(i));
        } else {
            if (where_option.handed_cars === true && where_option.amkr_cisterns === true) {
                return is_result;
            } else {
                if (where_option.handed_cars === false) {
                    return is_result & !this.is_handed_cars(i);
                } else {
                    return is_result & !this.is_amkr_cisterns(i);
                }
            }

        }
    };
    // Выполнить запрос сданные вагоны и\или цистерны
    view_report_remainder_cars.prototype.is_not_clarify_where = function (where_option, i) {
        // Отобразить все 
        if (where_option.handed_cars === false && where_option.amkr_cisterns === false) {
            return false;
        } else {
            if (where_option.handed_cars === true && where_option.amkr_cisterns === true) {
                return (this.is_handed_cars(i) || this.is_amkr_cisterns(i));
            } else {
                if (where_option.handed_cars === false) {
                    return this.is_amkr_cisterns(i) && !this.is_handed_cars(i);
                } else {
                    return this.is_handed_cars(i) && !this.is_amkr_cisterns(i);
                }
            }
        }
    };
    // Сделать выборку по условию
    view_report_remainder_cars.prototype.where = function (where_option, fn_where) {
        LockScreen(langView('vrrc_mess_where_wagons', App.Langs));
        var wagons = null;
        // Запустим выборку отдельным процессом
        setTimeout(function () {
            // Отключен весь выбор
            if (where_option.outer_car === false && where_option.amkr_outer_cars === false && where_option.amkr_cars === false && where_option.handed_cars === false && where_option.amkr_cisterns === false) {
                wagons = [];
            } else {
                // Включен весь выбор
                if (where_option.outer_car === true && where_option.amkr_outer_cars === true && where_option.amkr_cars === true && where_option.handed_cars === true && where_option.amkr_cisterns === true) {
                    wagons = this.wagons;
                } else {
                    // Делаем выбор
                    wagons = this.wagons.filter(function (i) {
                        if (where_option.outer_car === true && where_option.amkr_outer_cars === true && where_option.amkr_cars === true) {
                            // Отобразить все 
                            return this.is_clarify_where(true, where_option, i);
                        } else {
                            if (where_option.outer_car === true) {
                                if (where_option.amkr_outer_cars === false && where_option.amkr_cars === false) {
                                    return this.is_clarify_where(this.is_outer_cars(i), where_option, i);
                                } else {
                                    if (where_option.amkr_outer_cars === true) {
                                        //return this.is_outer_cars(i) || this.is_amkr_outer_cars(i);
                                        return this.is_clarify_where((this.is_outer_cars(i) || this.is_amkr_outer_cars(i)), where_option, i);
                                    } else {
                                        //return this.is_outer_cars(i) || this.is_amkr_cars(i);
                                        return this.is_clarify_where((this.is_outer_cars(i) || this.is_amkr_cars(i)), where_option, i);
                                    }
                                }
                            } else {
                                if (where_option.amkr_outer_cars === true && where_option.amkr_cars === true) {
                                    //return this.is_amkr_outer_cars(i) || this.is_amkr_cars(i);
                                    return this.is_clarify_where((this.is_amkr_outer_cars(i) || this.is_amkr_cars(i)), where_option, i);
                                } else {
                                    if (where_option.amkr_outer_cars === false && where_option.amkr_cars === false) {
                                        return this.is_not_clarify_where(where_option, i);
                                        //return false;
                                    } else {
                                        if (where_option.amkr_outer_cars === true) {
                                            //return this.is_amkr_outer_cars(i);
                                            return this.is_clarify_where(this.is_amkr_outer_cars(i), where_option, i);
                                        } else {
                                            //return this.is_amkr_cars(i);
                                            return this.is_clarify_where(this.is_amkr_cars(i), where_option, i);
                                        }
                                    }
                                }
                            }
                        }
                    }.bind(this));
                };
            }
            if (this.where_option.select_day > 0) {
                wagons = wagons.filter(function (i) {
                    return i.arrival_duration >= (this.where_option.select_day * (24*60));
                }.bind(this)).sort(function (a, b) {
                    return b.arrival_duration - a.arrival_duration
                });
            }

            // Выборка закончена вернем данные
            if (typeof fn_where === 'function') {
                fn_where(wagons ? wagons : []);
            }
        }.bind(this), 0);
    };
    //--------------------------------------------------------------------------------
    // Показать
    view_report_remainder_cars.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    view_report_remainder_cars.prototype.hide = function () {
        this.$panel.hide();
    }
    // Очистить сообщения
    view_report_remainder_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_report_remainder_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_report_remainder_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_report_remainder_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //--------------------------------------------------------------------------------
    // Очистить объект
    view_report_remainder_cars.prototype.destroy = function () {
        LockScreen(langView('vrrc_mess_destroy_operation', App.Langs));
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Уберем модуль (все вагоны отчета)
        if (this.tab_cars) {
            this.tab_cars.destroy();
            this.tab_cars = null;
        }
        // Уберем autocomplete
        if (this.el_arrival_cargo) {
            this.el_arrival_cargo.autocomplete("destroy");
            this.el_arrival_cargo = null;
        }
        if (this.el_arrival_sertification_data) {
            this.el_arrival_sertification_data.autocomplete("destroy");
            this.el_arrival_sertification_data = null;
        }
        if (this.el_arrival_station_from_name) {
            this.el_arrival_station_from_name.autocomplete("destroy");
            this.el_arrival_station_from_name = null;
        }
        if (this.el_sending_cargo) {
            this.el_sending_cargo.autocomplete("destroy");
            this.el_sending_cargo = null;
        }
        if (this.el_destination_station) {
            this.el_destination_station.autocomplete("destroy");
            this.el_destination_station = null;
        }

        this.$panel.empty(); // empty in case the columns change
        LockScreenOff();
    };

    App.view_report_remainder_cars = view_report_remainder_cars;

    window.App = App;
})(window);
