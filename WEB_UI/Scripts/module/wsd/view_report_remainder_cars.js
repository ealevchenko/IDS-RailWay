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
            'vrrc_card_header_panel': 'ОТЧЕТ "ОСТАТОК ВАГОНОВ НА АМКР"',

            'vrrc_title_outer_car': 'Внешние стороние вагоны',
            'vrrc_title_amkr_outer_cars': 'Внешние вагоны АМКР',
            'vrrc_title_amkr_cars': 'Внутри заводские вагоны',
            'vrrc_title_handed_cars': 'Сданные вагоны',
            'vrrc_title_amkr_cisterns': 'Цистерны АМКР',
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

            //'vrrc_card_header_from': 'ОТПРАВЛЕННЫЕ СОСТАВЫ',
            //'vrrc_title_label_station_on': 'Станция отправления:',
            //'vrrc_title_placeholder_station_on': 'Станция отправления:',
            //'vrrc_title_label_way_on': 'Путь возврата:',
            //'vrrc_title_placeholder_way_on': 'Выберите путь',
            //'vrrc_title_label_locomotive1': 'Локомотив №1:',
            //'vrrc_title_label_locomotive2': 'Локомотив №2:',
            //'vrrc_title_placeholder_locomotive': ' № локомотива',
            //'vrrc_title_time_aplly': 'Время выполнения',
            //'vrrc_title_placeholder_time_aplly': 'Время выполнения',
            //'vrrc_title_type_return': 'Отмена операции',
            //'vrrc_title_form_apply': 'Выполнить?',

            //'vrrc_title_button_export': 'Экспорт',
            //'vrrc_title_button_buffer': 'Буфер',
            //'vrrc_title_button_excel': 'Excel',
            //'vrrc_title_button_cancel': 'Отменить',
            //'vrrc_title_button_return': 'Вернуть',
            //'vrrc_title_button_head': 'Голова',
            //'vrrc_title_button_tail': 'Хвост',
            'vrrc_title_add_ok': 'ОБНОВИТЬ',
            'vrrc_title_where_clear': 'СБРОСИТЬ',
            'vrrc_title_select': 'Все...',
            'vrrc_title_null': '-',
            'vrrc_title_confirm_clear': 'Сбросить?',
            'vrrc_title_mesage_clear': 'Выполнить сброс выбора?',


            //'vrrc_mess_error_not_way': 'Выберите путь',
            //'vrrc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            //'vrrc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            //'vrrc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            //'vrrc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',
            //'vrrc_mess_error_not_wagons': 'Не выбраны вагоны для операции возврата или отмены (в окне «ОТПРАВЛЕННЫЕ СОСТАВЫ», выберите станцию, отправленный состав и сформируйте возврат или отмену).',
            //'vrrc_mess_error_operation_run': 'При выполнении операции «ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ» произошла ошибка, код ошибки:',
            //'vrrc_mess_cancel_operation_cancel': 'Операция "ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ ВАГОНОВ СОСТАВА" – отменена',
            //'vrrc_mess_cancel_operation_return': 'Операция "ВОЗРАТ ОТПРАВЛЕННЫХ ВАГОНОВ ИЗ СОСТАВА" – отменена',
            //'vrrc_mess_run_operation_cancel': 'Выполняю операцию отмены отправки вагонов состава',
            //'vrrc_mess_run_operation_return': 'Выполняю операцию возврата вагонов из состава',
            //'vrrc_mess_not_select_way_on': 'Выберите путь для приема вагонов!',

            //'vrrc_mess_load_operation': 'Загружаю операции...',
            'vrrc_mess_load_wagons': 'Загружаю вагоны...',
            'vrrc_mess_where_wagons': 'Применяю фильтр выборки...',
            'vrrc_mess_view_wagons': 'Показываю выборку...',
            'vrrc_mess_clear_wagons': 'Сбросить выборку...',
            'vrrc_mess_update_list': 'Обновляю списки...',
            //'vrrc_mess_update_operation': 'Обновляю операции...',
            'vrrc_mess_init_panel': 'Выполняю инициализацию модуля остаток вагонов на АМКР',
            //'vrrc_mess_destroy_operation': 'Закрываю форму...',
            //'vrrc_mess_create_sostav': 'Формирую состав, переношу вагоны...',
            //'vrrc_mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            //'vrrc_mess_reverse_head_sostav': 'Формирую состав, реверс голова-хвост',
            //'vrrc_mess_reverse_sostav': 'Формирую состав, реверс вагонов...',
        },
        'en':  //default language: English
        {

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

    //var TSOW = App.table_sostav_outer_way; // Модуль составы на подходах
    //var TCOW = App.table_cars_outer_way; // Модуль составы на подходах
    var TCWay = App.table_cars_way;         // Модуль вагоны на путях
    var alert = App.alert_form;

    // ассинхроная функция (формирования списков выбора)
    var wagons_list_update_async = function (row, callback) {
        var len = row ? row.length : 0; // защита от пустой выборки
        var data = {
            list_operators: [],
            list_limiting: [],
        };
        var list_operators = [];
        if (len === 0) {
            if (typeof callback === 'function') {
                callback(data);
            };
            return 0;
        }
        function WagonsListUpdate(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    LockScreen(langView('vrrc_mess_update_list', App.Langs));
                    var id_operator = row[i].id_operator;
                    var operator = data.list_operators.find(function (o) {
                        return o.value === row[i].id_operator;
                    });
                    if (!operator) {
                        data.list_operators.push({ value: row[i].id_operator, text: row[i]['operators_' + App.Lang] });
                    }
                    WagonsListUpdate.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback(data);
                } else return 0;
            }
        }
        WagonsListUpdate.call(this, 0);
    };

    //// ассинхроная функция (формирования списков выбора)
    //var wagons_where_async = function (row, callback) {
    //    var len = row ? row.length : 0; // защита от пустой выборки
    //    var list_operators = [];
    //    if (len === 0) {
    //        if (typeof callback === 'function') {
    //            callback(data);
    //        };
    //        return 0;
    //    }
    //    function WagonsWhere(i) {
    //        if (i < len) {
    //            // Поместим следующий вызов функции в цикл событий.
    //            setTimeout(function () {
    //                LockScreen(langView('vrrc_mess_where_wagons', App.Langs));
    //                var id_operator = row[i].id_operator;
    //                var operator = data.list_operators.find(function (o) {
    //                    return o.value === row[i].id_operator;
    //                });
    //                if (!operator) {
    //                    data.list_operators.push({ value: row[i].id_operator, text: row[i]['operators_' + App.Lang] });
    //                }
    //                WagonsWhere.call(this, i + 1);
    //            }.bind(this), 0);
    //        } else {
    //            // Так как достигнут конец массива, мы вызываем коллбэк
    //            if (typeof callback === 'function') {
    //                callback(data);
    //            } else return 0;
    //        }
    //    }
    //    WagonsWhere.call(this, 0);
    //};


    // создадим основу формы
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
            var col_button = new this.fc_ui.el_col('md', 12, 'mb-1');
            var bt_clear = new this.fc_ui.el_button('md', 'btn-primary ml-2', 'where-clear', langView('vrrc_title_where_clear', App.Langs), null);
            div_button_form_row.$div.append(col_button.$col.append(bt_clear.$button));
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
            var imp_day = new this.fc_ui.el_input('select_day', 'number', 'form-control form-control-sm', null, false, 0, 1000, null, null, null);
            col_day.$col.append(lab_day.$label).append(imp_day.$input.val('0'));
            // Добавим top 
            var col_top = new this.fc_ui.el_col('md', 12, 'mb-1');
            var lab_top = new this.fc_ui.el_label('select_top', null, langView('vrrc_title_select_top', App.Langs));
            var imp_top = new this.fc_ui.el_input('select_top', 'number', 'form-control form-control-sm', null, false, 0, 100, null, null, null);
            col_top.$col.append(lab_top.$label).append(imp_top.$input.val('0'));
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
            this.el_sw_outer_cars = sw_outer_cars.$input;
            this.el_sw_amkr_outer_cars = sw_amkr_outer_cars.$input;
            this.el_sw_amkr_cars = sw_amkr_cars.$input;
            this.el_handed_cars = sw_handed_cars.$input;
            this.el_amkr_cisterns = sw_amkr_cisterns.$input;
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
            this.el_bt_clear.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.modal_confirm_form.view(langView('vrrc_title_confirm_clear', App.Langs), langView('vrrc_title_mesage_clear', App.Langs), function (res) {
                    if (res) {
                        this.clear_where();
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
                    val = '^' + 'Да' + '$';
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
                    val = '^' + 'Да' + '$';
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

            // Инициализация компонента TOP & Day
            $("input#select_day").inputSpinner();
            $("input#select_top").inputSpinner();
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
    view_report_remainder_cars.prototype.load = function () {
        LockScreen(langView('vrrc_mess_load_wagons', App.Langs));
        // Отобразим настройки выборки
        //this.form_setup.view_edit(this.where_option);
        this.ids_wsd.getViewWagonsOfBalance(function (wagons) {
            this.wagons = wagons;
            this.clear_where();
            this.where(this.where_option, function (wagons) {
                LockScreen(langView('vrrc_mess_view_wagons', App.Langs));
                //покажем вагоны 
                this.tab_cars.view(wagons, null);
                this.init_where();
            }.bind(this));
        }.bind(this));
    };
    //
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

    view_report_remainder_cars.prototype.where_amkr_outer_cars = function (bit, i) {
        if (bit) {
            return i.id_operator === 14 || i.id_operator === 16;
        } else {
            return i.id_operator !== 14 && i.id_operator !== 16;
        }
    };

    view_report_remainder_cars.prototype.where_amkr_cars = function (bit, i) {
        if (bit) {
            return i.id_operator === 188;
        } else {
            return i.id_operator !== 188;
        }
    };

    view_report_remainder_cars.prototype.where_handed_cars = function (bit, i) {
        if (bit) {
            return i.outgoing_sostav_status !== null && Number(i.outgoing_sostav_status) === 2;
        } else {
            return i.outgoing_sostav_status === null || Number(i.outgoing_sostav_status) < 2
        }
    };

    view_report_remainder_cars.prototype.where_amkr = function (amkr_outer_cars, amkr_cars, handed_cars, i) {
        if (amkr_outer_cars && amkr_cars) {
            if (handed_cars) {
                return this.where_amkr_outer_cars(amkr_outer_cars, i) || this.where_amkr_cars(amkr_cars, i);
            } else {
                return (this.where_amkr_outer_cars(amkr_outer_cars, i) || this.where_amkr_cars(amkr_cars, i)) && (i.outgoing_sostav_status === null || Number(i.outgoing_sostav_status) < 2);
            }
        } else {
            if (handed_cars) {
                return this.where_amkr_outer_cars(amkr_outer_cars, i) && this.where_amkr_cars(amkr_cars, i) || (i.outgoing_sostav_status !== null && Number(i.outgoing_sostav_status) === 2);
            } else {
                return this.where_amkr_outer_cars(amkr_outer_cars, i) && this.where_amkr_cars(amkr_cars, i) || (i.outgoing_sostav_status === null || Number(i.outgoing_sostav_status) < 2);
            }

        }

        //////if (amkr_outer_cars && amkr_cars && handed_cars) {
        //////    return this.where_amkr_outer_cars(amkr_outer_cars, i) || this.where_amkr_cars(amkr_cars, i) || this.where_handed_cars(handed_cars, i);
        //////} else {
        //////    if (amkr_outer_cars && amkr_cars) {
        //////        if (handed_cars) {
        //////            return this.where_amkr_outer_cars(amkr_outer_cars, i) || this.where_amkr_cars(amkr_cars, i) || this.where_handed_cars(handed_cars, i);
        //////        } else {
        //////            return this.where_amkr_outer_cars(amkr_outer_cars, i) || this.where_amkr_cars(amkr_cars, i) && this.where_handed_cars(handed_cars, i);
        //////        }

        //////        //return this.where_amkr_outer_cars(amkr_outer_cars, i) || this.where_amkr_cars(amkr_cars, i);
        //////    } else {
        //////        return this.where_amkr_outer_cars(amkr_outer_cars, i) && this.where_amkr_cars(amkr_cars, i);
        //////    }

        //////}
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
                        if (where_option.outer_car === true && where_option.amkr_outer_cars === false && where_option.amkr_cars === false) {
                            return i.id_operator !== 14 && i.id_operator !== 16 && i.id_operator !== 188;
                        } else {
                            if (where_option.outer_car === true) {
                                if (where_option.amkr_outer_cars === false && where_option.amkr_cars === true) {
                                    return i.id_operator !== 14 && i.id_operator !== 16;
                                } else {
                                    return i.id_operator !== 188;
                                };
                            } else {
                                if (where_option.amkr_outer_cars === true && where_option.amkr_cars === true) {
                                    return i.id_operator === 14 || i.id_operator === 16 || i.id_operator === 188;
                                } else {
                                    if (where_option.amkr_outer_cars === false && where_option.amkr_cars === true) {
                                        return i.id_operator === 188;
                                    } else {
                                        return i.id_operator === 14 || i.id_operator === 16;
                                    };
                                };
                            };
                        };
                    }.bind(this));
                    if (wagons && wagons.length > 0) {
                        wagons = wagons.filter(function (i) {
                            var result = true;
                            // && where_option.amkr_cisterns === false
                            if (where_option.handed_cars === false) {
                                result = result && i.outgoing_sostav_status === null || Number(i.outgoing_sostav_status) < 2
                            }
                            if (where_option.amkr_cisterns === false) {
                                result = result;
                            }
                            return result;
                        }.bind(this));
                    } else {
                        wagons = this.wagons.filter(function (i) {
                            var result = true;
                            // && where_option.amkr_cisterns === false
                            if (where_option.handed_cars === true) {
                                result = result && i.outgoing_sostav_status !== null && Number(i.outgoing_sostav_status) === 2
                            }
                            if (where_option.amkr_cisterns === true) {
                                result = result;
                            }
                            return result;
                        }.bind(this));
                    }
                };
            }
            // Выборка закончена вернем данные
            if (typeof fn_where === 'function') {
                fn_where(wagons ? wagons : []);
            }
        }.bind(this), 0);

        //handed_cars: true,             //Сданные вагоны
        //amkr_cisterns : true,           //Цистерны АМКР
    };
    //--------------------------------------------------------------------------------
    // выполнить операцию
    view_report_remainder_cars.prototype.apply = function (data) {

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
        // Очистить форму выбора пути отправки
        if (this.form_setup_from) {
            this.form_setup_from.destroy();
            this.form_setup_from = null;
        }
        // Очистить форму выбора куда отправить
        if (this.form_setup_on) {
            this.form_setup_on.destroy();
            this.form_setup_on = null;
        }

        // Уберем модуль (Таблица собранный состав для отправки детально)
        if (this.tab_cars) {
            this.tab_cars.destroy();
            this.tab_cars = null;
        }
        // Уберем модуль (Таблицы составы и вагоны состава детально)
        if (this.tab_sostav_from) {
            this.tab_sostav_from.destroy();
            this.tab_sostav_from = null;
        }
        if (this.tab_wagon_from) {
            this.tab_wagon_from.destroy();
            this.tab_wagon_from = null;
        }
        this.$panel.empty(); // empty in case the columns change
        LockScreenOff();
    };

    App.view_report_remainder_cars = view_report_remainder_cars;

    window.App = App;
})(window);


                //var wagons = this.wagons.filter(function (i) {
                //    return i.id_operator === 14;
                //});
                //this.tab_cars.view((wagons ? wagons : []), null);


                //var column = this.tab_cars.obj_t_cars.columns('.fl-operator_abbr');

                //column.data().filter(function (value, index) {
                //    //return value[index] === 'АМКР' ? true : false;
                //    return false;
                //}).draw();
                ////column.search('^\s*$', true, false)
                //// 

            //this.form_setup = new FIF();
            //var fl_outer_cars = {
            //    field: 'outer_car',
            //    type: 'boolean',
            //    add: null,
            //    edit: 'switch',
            //    name: 'outer_car',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_outer_car', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: function (event) {
            //        event.preventDefault();
            //        var checked = $(event.currentTarget).prop('checked');
            //        this.where_option.outer_car = checked;
            //        this.load();
            //    }.bind(this),
            //    add_validation: null,
            //    edit_validation: null,
            //    default: true,
            //    row: 2,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_amkr_outer_cars = {
            //    field: 'amkr_outer_cars',
            //    type: 'boolean',
            //    add: null,
            //    edit: 'switch',
            //    name: 'amkr_outer_cars',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_amkr_outer_cars', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: function (event) {
            //        event.preventDefault();
            //        var checked = $(event.currentTarget).prop('checked');
            //        this.where_option.amkr_outer_cars = checked;
            //        this.load();
            //    }.bind(this),
            //    add_validation: null,
            //    edit_validation: null,
            //    default: false,
            //    row: 3,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_amkr_cars = {
            //    field: 'amkr_cars',
            //    type: 'boolean',
            //    add: null,
            //    edit: 'switch',
            //    name: 'amkr_cars',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_amkr_cars', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: function (event) {
            //        event.preventDefault();
            //        var checked = $(event.currentTarget).prop('checked');
            //        this.where_option.amkr_cars = checked;
            //        this.load();
            //    }.bind(this),
            //    add_validation: null,
            //    edit_validation: null,
            //    default: false,
            //    row: 4,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_select_day = {
            //    field: 'select_day',
            //    type: 'number',
            //    add: null,
            //    edit: 'number',
            //    name: 'select_day',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_select_day', App.Langs),
            //    placeholder: null,
            //    min: 0,
            //    max: 1000,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: 0,
            //    row: 5,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_select_top = {
            //    field: 'select_top',
            //    type: 'number',
            //    add: null,
            //    edit: 'number',
            //    name: 'select_top',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_select_top', App.Langs),
            //    placeholder: null,
            //    min: 0,
            //    max: 100,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: 0,
            //    row: 6,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            ////var fl_operators = {
            ////    field: 'id_operator',
            ////    type: 'int',
            ////    add: null,
            ////    edit: 'select',
            ////    name: 'operators',
            ////    prefix: 'sm',
            ////    label: langView('vrrc_title_operators', App.Langs),
            ////    placeholder: null,
            ////    maxlength: null,
            ////    required: true,
            ////    control: null,
            ////    list: this.list_operators,
            ////    select: function (e, ui) {
            ////        event.preventDefault();
            ////        // Обработать выбор
            ////        var id = Number($(e.currentTarget).val());
            ////        //view_wagons_from_way(id);
            ////    }.bind(this),
            ////    update: null,
            ////    close: null,
            ////    change: null,
            ////    add_validation: null,
            ////    edit_validation: null,
            ////    default: -1,
            ////    row: 7,
            ////    col: 1,
            ////    col_prefix: 'md',
            ////    col_size: 12,
            ////};
            //var fl_limiting = {
            //    field: 'id_limiting',
            //    type: 'int',
            //    add: null,
            //    edit: 'select',
            //    name: 'limiting',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_limiting', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: this.list_limiting,
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 8,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_cargo_arrival = {
            //    field: 'id_cargo_arrival',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'cargo_arrival',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_cargo_arrival', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 9,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_cargo_group_arrival = {
            //    field: 'id_cargo_group_arrival',
            //    type: 'int',
            //    add: null,
            //    edit: 'select',
            //    name: 'cargo_group_arrival',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_cargo_group_arrival', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 10,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_certification_data = {
            //    field: 'id_certification_data',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'certification_data',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_certification_data', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 11,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_departure_station = {
            //    field: 'id_departure_station',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'departure_station',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_departure_station', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 12,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_division = {
            //    field: 'id_division',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'division',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_division', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 13,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_station_contiguity = {
            //    field: 'id_station_contiguity',
            //    type: 'int',
            //    add: null,
            //    edit: 'select',
            //    name: 'station_contiguity',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_station_contiguity', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 14,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_condition_arrival = {
            //    field: 'id_condition_arrival',
            //    type: 'int',
            //    add: null,
            //    edit: 'select',
            //    name: 'condition_arrival',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_condition_arrival', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 15,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_condition_mr = {
            //    field: 'condition_mr',
            //    type: 'boolean',
            //    add: null,
            //    edit: 'switch',
            //    name: 'condition_mr',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_condition_mr', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: function (event) {
            //        event.preventDefault();
            //        var type = $(event.currentTarget).prop('checked');
            //    }.bind(this),
            //    add_validation: null,
            //    edit_validation: null,
            //    default: true,
            //    row: 16,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_genus = {
            //    field: 'id_genus',
            //    type: 'int',
            //    add: null,
            //    edit: 'select',
            //    name: 'genus',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_genus', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 17,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_cargo_sending = {
            //    field: 'id_cargo_sending',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'cargo_sending',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_cargo_sending', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 18,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_cargo_sending_arrival = {
            //    field: 'id_cargo_group_sending',
            //    type: 'int',
            //    add: null,
            //    edit: 'select',
            //    name: 'cargo_group_v',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_cargo_group_sending', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 19,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_division_loading = {
            //    field: 'id_division_loading',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'division_loading',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_division_loading', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 20,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_destination_station = {
            //    field: 'id_destination_station',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'destination_station',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_destination_station', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 21,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_paid = {
            //    field: 'paid',
            //    type: 'boolean',
            //    add: null,
            //    edit: 'switch',
            //    name: 'paid',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_paid', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: function (event) {
            //        event.preventDefault();
            //        var type = $(event.currentTarget).prop('checked');
            //    }.bind(this),
            //    add_validation: null,
            //    edit_validation: null,
            //    default: true,
            //    row: 22,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_station_amkr = {
            //    field: 'id_station_amkr',
            //    type: 'int',
            //    add: null,
            //    edit: 'autocomplete',
            //    name: 'station_amkr',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_station_amkr', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: [],
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        //view_wagons_from_way(id);
            //    }.bind(this),
            //    update: null,
            //    close: null,
            //    change: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: -1,
            //    row: 23,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fl_not_surrender_cars = {
            //    field: 'not_surrender_cars',
            //    type: 'boolean',
            //    add: null,
            //    edit: 'switch',
            //    name: 'not_surrender_cars',
            //    prefix: 'sm',
            //    label: langView('vrrc_title_not_surrender_cars', App.Langs),
            //    placeholder: null,
            //    maxlength: null,
            //    required: false,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    change: function (event) {
            //        event.preventDefault();
            //        var type = $(event.currentTarget).prop('checked');
            //    }.bind(this),
            //    add_validation: null,
            //    edit_validation: null,
            //    default: true,
            //    row: 24,
            //    col: 1,
            //    col_prefix: 'md',
            //    col_size: 12,
            //};
            //var fields = [];
            //fields.push(fl_outer_cars);
            //fields.push(fl_amkr_outer_cars);
            //fields.push(fl_amkr_cars);
            //fields.push(fl_select_day);
            //fields.push(fl_select_top);
            ///*            fields.push(fl_operators);*/
            //fields.push(fl_limiting);
            //fields.push(fl_cargo_arrival);
            //fields.push(fl_cargo_group_arrival);
            //fields.push(fl_certification_data);
            //fields.push(fl_departure_station);
            //fields.push(fl_division);
            //fields.push(fl_station_contiguity);
            //fields.push(fl_condition_arrival);
            //fields.push(fl_condition_mr);
            //fields.push(fl_genus);
            //fields.push(fl_cargo_sending);
            //fields.push(fl_cargo_sending_arrival);
            //fields.push(fl_division_loading);
            //fields.push(fl_destination_station);
            //fields.push(fl_paid);
            //fields.push(fl_station_amkr);
            //fields.push(fl_not_surrender_cars);
            //// Инициализация формы
            //this.form_setup.init({
            //    alert: this.alert_select,
            //    //mode: 'edit', // Указали что будем использовать форму типа add
            //    fields: fields,
            //    mb: 1,
            //    id: null,
            //    cl_form: '',
            //    validation: true,
            //    fn_validation: function (result) {
            //        // Валидация успешна
            //        if (result && result.valid) {
            //            // Дополнительная проверка
            //        }
            //    }.bind(this),
            //    button_add_ok: {
            //        title: langView('vrrc_title_add_ok', App.Langs),
            //        click: function (event) {
            //            event.preventDefault();
            //            //this.form_setup_on.$form_add.submit();
            //        }.bind(this),
            //    },
            //});
            //// Сылка на форму
            //this.$setup_select_form = this.form_setup.$form_edit;
            //// Отображение формы
            //this.$setup_select.append(this.form_setup.$form_edit);
            // Добавим элементы выбора


            // Создадим таблицу вангонов собранных для отправки