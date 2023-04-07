(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    var format_date = "YYYY-MM-DD";

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mainuf_load_reference': 'Загружаю справочники...',
            'mainuf_init_main': 'Инициализация формы ...',
            'mainuf_load': 'Загружаю ...',

            'mainuf_label_date_period_start': 'Начало :',
            'mainuf_title_date_period_start': 'Начало',
            'mainuf_label_date_period_stop': 'Окончание :',
            'mainuf_title_date_period_stop': 'Окончание',
            'mainuf_label_rate_currency': 'Валюта :',
            'mainuf_title_rate_currency': 'Валюта',
            'mainuf_label_derailment_rate_currency': 'Валюта (сход):',
            'mainuf_title_derailment_rate_currency': 'Валюта (сход)',
            'mainuf_label_rate_value': 'Ставка :',
            'mainuf_title_rate_value': 'Ставка',
            'mainuf_label_derailment_rate_value': 'Ставка (сход):',
            'mainuf_title_derailment_rate_value': 'Ставка (сход)',
            'mainuf_label_coefficient_route_value': 'Коэф. маршрут :',
            'mainuf_title_coefficient_route_value': 'Коэф. маршрут',
            'mainuf_label_coefficient_not_route_value': 'Коэф. не маршрут: ',
            'mainuf_title_coefficient_not_route_value': 'Коэф. не маршрут',
            'mainuf_label_grace_time_value1': 'Льгот время 1-е: ',
            'mainuf_title_grace_time_value1': 'Льгот время 1-е',
            'mainuf_label_grace_time_value2': 'Льгот время 2-е: ',
            'mainuf_title_grace_time_value2': 'Льгот время 2-е',

            'mainuf_label_bt_apply': 'Применить',
            'mainuf_mess_valid_date_period_start': 'Не указано начало',
            'mainuf_mess_valid_date_period_stop': 'Не указано окончание',
            'mainuf_mess_valid_before_date': 'Начало должно быть меньше окончания',
            'mainuf_mess_valid_rate_currency': 'Не указана валюта ставки',
            'mainuf_mess_valid_rate_value_not_null': 'Не указана ставка',
            'mainuf_mess_valid_derailment_rate_value_not_null': 'Не указана ставка (сход)',

            'mainuf_form_aplly': 'ПРИМЕНИТЬ?',
            'mainuf_form_aplly_period_message': 'Применить настройки периода на выбранные операторы',
            'mainuf_mess_cancel_operation_aplly_period': 'Операция "ПРИМЕНИТЬ НАСТРОЙКИ ПЕРИОДА"-Отменена пользователем',
            'mainuf_mess_update_operation_aplly_period': 'Выполняю операцию "ПРИМЕНИТЬ НАСТРОЙКИ ПЕРИОДА"',
            'mainuf_mess_ok_operation_aplly_period': 'Операция "ПРИМЕНИТЬ НАСТРОЙКИ ПЕРИОДА" - выполнена',
            'mainuf_mess_error_operation_aplly_period': 'Ошибка выполнения операции "ПРИМЕНИТЬ НАСТРОЙКИ ПЕРИОДА", код ошибки=',
            'mainuf_mess_valid_select_period_is_null': 'Не выбраны связки оператор-род',
        },
        'en':  //default language: English
        {
            'mainuf_load_reference': 'Loading references...',
            'mainuf_init_main': 'Form initialization...',
            'mainuf_load': 'Loading ...',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var IDS_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;

    var ids_dir = new IDS_DIRECTORY();
    var ids_wsd = new IDS_WSD();

    // Создать модальную форму "Окно сообщений"
    var MCF = App.modal_confirm_form;
    var modal_confirm_form = new MCF("mcc"); // Создадим экземпляр окно сообщений


    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    // Создадим форму правки информации по вагону
    var FDL = App.form_dialog;
    //var form_info = new FDL();
    var form_edit = new FDL();

    var TDIR = App.table_directory;


    var alert = App.alert_form;
    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var SRV = App.ids_server;
    var ids_srv = new SRV(); // Создадим класс ids_server


    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mainuf_load_reference', App.Langs));
        if (list) {
            ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };
    // Функция получения информации из сервера
    var get_server_info = function () {
        // Запрос клиентов 
        ids_srv.getCountClient(function (count) {
            $('a#client_count').text(count);
        });
    }

    var list_operators_genus = [];      // Перечень операторов и родов вагонов
    var list_currency = [];             // Перечень валют
    var list_operation_rod = [];        // Перечень выбранных операторов и родов
    var list_period = [];               // Перечень периодов
    var list_select_period = [];        // Перечень периодов

    var edit_elements = {};

    var $form_edit = $('div#form-edit');

    var table_usage_fee_period = new TDIR('div#usage-fee-period');                     // Создадим экземпляр

    var validation = function () {
        form_edit.validation_common.clear_all();
        var valid = true;
        // Проверка 

        if (list_select_period === null || (list_select_period !== null && list_select_period.length === 0)) {
            form_edit.validation_common.out_error_message(langView('mainuf_mess_valid_select_period_is_null', App.Langs));
            valid = false;
        }
        valid = valid & form_edit.validation_common.check_control_datetime_input(edit_elements.input_datetime_date_period_start, langView('mainuf_mess_valid_date_period_start', App.Langs), '', true);
        valid = valid & form_edit.validation_common.check_control_datetime_input(edit_elements.input_datetime_date_period_stop, langView('mainuf_mess_valid_date_period_stop', App.Langs), '', true);
        var date_start = edit_elements.input_datetime_date_period_start.val();
        var date_stop = edit_elements.input_datetime_date_period_stop.val();
        if (valid && !moment(date_start).isBefore(date_stop)) {
            form_edit.validation_common.set_object_error(edit_elements.input_datetime_date_period_start.$element, langView('mainuf_mess_valid_before_date', App.Langs));
            valid = false;
        }
        // Ставка
        valid = valid & form_edit.validation_common.check_control_select_not_null(edit_elements.select_rate_currency, langView('mainuf_mess_valid_rate_currency', App.Langs), '', true);
        valid = valid & form_edit.validation_common.check_control_input_not_null(edit_elements.input_number_rate_value, langView('mainuf_mess_valid_rate_value_not_null', App.Langs), '', true);
        // Ставка сход
        var drc = edit_elements.select_derailment_rate_currency.val();
        if (drc >= 0) {
            valid = valid & form_edit.validation_common.check_control_input_not_null(edit_elements.input_number_derailment_rate_value, langView('mainuf_mess_valid_derailment_rate_value_not_null', App.Langs), '', true);
        }
        return valid;
    };

    var action_apply = function () {
        var valid = validation();
        if (valid) {
            modal_confirm_form.view(langView('mainuf_form_aplly', App.Langs), langView('mainuf_form_aplly_period_message', App.Langs), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('mainuf_mess_update_operation_aplly_period', App.Langs));
                    // Подготовим операцию

                    var list_period = [];
                    $.each(list_select_period, function (key, el) {
                        list_period.push({ id: el.id, id_operator: el.id_operator, id_genus: el.id_genus });
                    }.bind(this));
                    var operation = {
                        start: form_edit.get('date_period_start'),
                        stop: form_edit.get('date_period_stop'),
                        id_currency: edit_elements.select_rate_currency.val(),
                        rate: form_edit.get('rate_value'),
                        id_currency_derailment: edit_elements.select_derailment_rate_currency.val(),
                        rate_derailment: form_edit.get('derailment_rate_value'),
                        coefficient_route: form_edit.get('coefficient_route_value'),
                        coefficient_not_route: form_edit.get('coefficient_not_route_value'),
                        grace_time_1: form_edit.get('grace_time_value1'),
                        grace_time_2: form_edit.get('grace_time_value2'),
                        note: '',
                        list_period: list_period,
                        user: App.User_Name,
                    };
                    // Обновим
                    ids_wsd.postChangeUsageFeePeriod(operation, function (result_operation) {
                        if (result_operation > 0) {
                            form_edit.validation_common.out_info_message(langView('mainuf_mess_ok_operation_aplly_period', App.Langs));
                            LockScreenOff();
                        } else {
                            // Ошибка выполнения
                            form_edit.validation_common.out_error_message(langView('mainuf_mess_error_operation_aplly_period', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные
                        update_period_operation_rod();
                    }.bind(this));
                } else {
                    form_edit.validation_common.out_warning_message(langView('mainuf_mess_cancel_operation_aplly_period', App.Langs))
                }
            }.bind(this));
        } else {

        }
    }

    var update_period_operation_rod = function () {
        var process_period = 0;
        // Выход из инициализации
        var out_load_period = function (process_period) {
            if (process_period === 0) {
                table_usage_fee_period.view(list_period);
                LockScreenOff();
            }
        };

        list_period = [];
        list_select_period = [];
        if (list_operation_rod && list_operation_rod.length > 0) {
            process_period = list_operation_rod.length;
            $.each(list_operation_rod, function (key, el) {
                ids_wsd.getLastUsageFeePeriodOfOperatorGenus(el.id_operator, el.id_genus, function (list_result) {
                    if (list_result) {
                        list_period = list_period.concat(list_result);
                    } else {
                        var genus = ids_dir.getGenusWagons_Of_ID(el.id_genus);
                        var operator = ids_dir.getOperatorsWagons_Of_ID(el.id_operator);
                        list_period.push({
                            id: 0,
                            id_operator: el.id_operator,
                            id_genus: el.id_genus,
                            start: null,
                            stop: null,
                            id_currency: null,
                            rate: null,
                            id_currency_derailment: null,
                            rate_derailment: null,
                            coefficient_route: null,
                            coefficient_not_route: null,
                            grace_time_1: null,
                            grace_time_2: null,
                            note: null,
                            create: null,
                            create_user: null,
                            change: null,
                            change_user: null,
                            close: null,
                            close_user: null,
                            parent_id: null,
                            Directory_OperatorsWagons: { abbr_ru: genus.abbr_ru, abbr_en: genus.abbr_en },
                            Directory_GenusWagons: { abbr_ru: operator.abbr_ru, abbr_en: operator.abbr_en },
                            Directory_Currency: { currency_ru: '', currency_en: '' },
                            Directory_Currency1: { currency_ru: '', currency_en: '' }
                        });
                        //list_create_period.push({ id_operator: el.id_operator, id_genus: el.id_genus });
                    }
                    // На проверку окончания инициализации
                    process_period--;
                    out_load_period.call(this, process_period);
                }.bind(this));
            }.bind(this));
            //LockScreenOff();
        } else {
            out_load_period(process_period);
            //LockScreenOff();
        }
    };

    // После загрузки документа
    $(document).ready(function ($) {
        LockScreen(langView('mainuf_init_main', App.Langs));
        modal_confirm_form.init();
        // Загрузим справочники, с признаком обязательно
        load_db(['operators_wagons', 'currency', 'genus_wagon'], true, function (result) {
            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);

            list_currency = ids_dir.getListCurrency('id', 'currency', App.Lang, null);
            var process = 4;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    this.table_operators_wagons.view(ids_dir.list_operators_wagons);
                    LockScreenOff();
                }
            }.bind(this);

            this.table_operators_wagons = new TDIR('div#operators-wagons');                     // Создадим экземпляр
            // Инициализация модуля "Таблица операторов вагонов"
            this.table_operators_wagons.init({
                alert: null,
                detali_table: false,
                type_report: 'operators_wagons_select',     //
                link_num: false,
                ids_dir: ids_dir,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {
                    list_operators_genus = [];
                    if (rows && rows.length > 0) {
                        LockScreen(langView('mainuf_load', App.Langs));
                        ids_dir.getOperatorsWagonsOfGenus(function (operators_genus) {
                            $.each(rows, function (key, el) {
                                var genus = operators_genus.filter(function (i) {
                                    return i.id_operator == el.id;
                                }.bind(this));
                                list_operators_genus = list_operators_genus.concat(genus);
                            }.bind(this));
                            this.table_operators_wagons_genus.view(list_operators_genus);
                            list_period = [];
                            list_select_period = [];
                            table_usage_fee_period.view(list_period);
                            LockScreenOff();
                        }.bind(this));
                    } else {
                        this.table_operators_wagons_genus.view(list_operators_genus);
                        list_period = [];
                        list_select_period = [];
                        table_usage_fee_period.view(list_period);
                        LockScreenOff();
                    }
                }.bind(this),
            });
            //
            this.table_operators_wagons_genus = new TDIR('div#operators-wagons-genus');         // Создадим экземпляр
            // Инициализация модуля "Таблица родов вагона"
            this.table_operators_wagons_genus.init({
                alert: null,
                detali_table: false,
                type_report: 'operators_wagons_genus_select',     //
                link_num: false,
                ids_dir: ids_dir,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {
                    list_operation_rod = rows;
                    update_period_operation_rod();
                    //var process_period = 0;
                    //// Выход из инициализации
                    //var out_load_period = function (process_period) {
                    //    if (process_period === 0) {
                    //        this.table_usage_fee_period.view(list_period);
                    //        LockScreenOff();
                    //    }
                    //}.bind(this);
                    //list_period = [];
                    //list_select_period = [];
                    //if (rows && rows.length > 0) {
                    //    process_period = rows.length;
                    //    $.each(rows, function (key, el) {
                    //        ids_wsd.getLastUsageFeePeriodOfOperatorGenus(el.id_operator, el.id_genus, function (list_result) {
                    //            if (list_result) {
                    //                list_period = list_period.concat(list_result);
                    //            } else {
                    //                var genus = ids_dir.getGenusWagons_Of_ID(el.id_genus);
                    //                var operator = ids_dir.getOperatorsWagons_Of_ID(el.id_operator);
                    //                list_period.push({
                    //                    id: 0,
                    //                    id_operator: el.id_operator,
                    //                    id_genus: el.id_genus,
                    //                    start: null,
                    //                    stop: null,
                    //                    id_currency: null,
                    //                    rate: null,
                    //                    id_currency_derailment: null,
                    //                    rate_derailment: null,
                    //                    coefficient_route: null,
                    //                    coefficient_not_route: null,
                    //                    grace_time_1: null,
                    //                    grace_time_2: null,
                    //                    note: null,
                    //                    create: null,
                    //                    create_user: null,
                    //                    change: null,
                    //                    change_user: null,
                    //                    close: null,
                    //                    close_user: null,
                    //                    parent_id: null,
                    //                    Directory_OperatorsWagons: { abbr_ru: genus.abbr_ru, abbr_en: genus.abbr_en },
                    //                    Directory_GenusWagons: { abbr_ru: operator.abbr_ru, abbr_en: operator.abbr_en },
                    //                    Directory_Currency: { currency_ru: '', currency_en: '' },
                    //                    Directory_Currency1: { currency_ru: '', currency_en: '' }
                    //                });
                    //                //list_create_period.push({ id_operator: el.id_operator, id_genus: el.id_genus });
                    //            }
                    //            // На проверку окончания инициализации
                    //            process_period--;
                    //            out_load_period(process_period);
                    //        }.bind(this));
                    //    }.bind(this));
                    //    //LockScreenOff();
                    //} else {
                    //    out_load_period(process_period);
                    //    //LockScreenOff();
                    //}
                }.bind(this),
            });
            //
/*            var table_usage_fee_period = new TDIR('div#usage-fee-period');                     // Создадим экземпляр*/
            // Инициализация модуля "Таблица операторов вагонов"
            table_usage_fee_period.init({
                alert: null,
                detali_table: false,
                type_report: 'usage_fee_period',     //
                link_num: false,
                ids_dir: ids_dir,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {
                    list_select_period = rows;
                    form_edit.validation_common.clear_all();
                    if (rows && rows.length > 0) {
                        form_edit.set('date_period_start', rows[0].start);
                        form_edit.set('date_period_stop', rows[0].stop);
                        form_edit.set('rate_currency', rows[0].id_currency);
                        form_edit.set('rate_value', rows[0].rate);
                        form_edit.set('derailment_rate_currency', rows[0].id_currency_derailment);
                        form_edit.set('derailment_rate_value', rows[0].rate_derailment);
                        form_edit.set('coefficient_route_value', rows[0].coefficient_route);
                        form_edit.set('coefficient_not_route_value', rows[0].coefficient_not_route);
                        form_edit.set('grace_time_value1', rows[0].grace_time_1);
                        form_edit.set('grace_time_value2', rows[0].grace_time_2);
                    } else {
                        form_edit.set('date_period_start', null);
                        form_edit.set('date_period_stop', null);
                        form_edit.set('rate_currency', -1);
                        form_edit.set('rate_value', null);
                        form_edit.set('derailment_rate_currency', -1);
                        form_edit.set('derailment_rate_value', null);
                        form_edit.set('coefficient_route_value', null);
                        form_edit.set('coefficient_not_route_value', null);
                        form_edit.set('grace_time_value1', null);
                        form_edit.set('grace_time_value2', null);
                    }
                }.bind(this),
            });

            //----------------------------------
            // Создать макет панели
            var objs_edit = [];
            var form_edit_row_1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_edit_row_2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_edit_row_3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_edit_row_4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_edit_row_5 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };

            var form_input_date_period_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_period_start',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_date_period_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_date_period_start', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: false,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            var form_input_date_period_stop = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_period_stop',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_date_period_stop', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_date_period_stop', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: false,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            var form_select_rate_currency = {
                obj: 'bs_select',
                options: {
                    id: 'rate_currency',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_rate_currency', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_rate_currency', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_currency,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_select_derailment_rate_currency = {
                obj: 'bs_select',
                options: {
                    id: 'derailment_rate_currency',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_derailment_rate_currency', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_derailment_rate_currency', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_currency,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_input_rate_value = {
                obj: 'bs_input_number',
                options: {
                    id: 'rate_value',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_rate_value', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_rate_value', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_derailment_rate_value = {
                obj: 'bs_input_number',
                options: {
                    id: 'derailment_rate_value',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_derailment_rate_value', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_derailment_rate_value', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_coefficient_route_value = {
                obj: 'bs_input_number',
                options: {
                    id: 'coefficient_route_value',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_coefficient_route_value', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_coefficient_route_value', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_coefficient_not_route_value = {
                obj: 'bs_input_number',
                options: {
                    id: 'coefficient_not_route_value',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_coefficient_not_route_value', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_coefficient_not_route_value', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_grace_time_value1 = {
                obj: 'bs_input_number',
                options: {
                    id: 'grace_time_value1',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_grace_time_value1', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_grace_time_value1', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_grace_time_value2 = {
                obj: 'bs_input_number',
                options: {
                    id: 'grace_time_value2',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_grace_time_value2', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_grace_time_value2', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };

            // Кнопки
            var row_edit1 = {
                obj: 'bs_row',
                options: {
                    class: 'mt-1',
                },
                childs: []
            };
            var col_edit1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var bt_apply = {
                obj: 'bs_button',
                options: {
                    color: 'primary',
                    size: null,
                    class: null,
                    id: 'apply',
                    label: langView('mainuf_label_bt_apply', App.Langs),
                    title: '',
                    icon_left: 'fa-solid fa-pen-to-square',
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                        action_apply();
                    }.bind(this),
                }
            };

            form_edit_row_1.childs.push(form_input_date_period_start);
            form_edit_row_1.childs.push(form_input_date_period_stop);

            form_edit_row_2.childs.push(form_select_rate_currency);
            form_edit_row_2.childs.push(form_input_rate_value);

            form_edit_row_3.childs.push(form_select_derailment_rate_currency);
            form_edit_row_3.childs.push(form_input_derailment_rate_value);

            form_edit_row_4.childs.push(form_input_coefficient_route_value);
            form_edit_row_4.childs.push(form_input_coefficient_not_route_value);

            form_edit_row_5.childs.push(form_input_grace_time_value1);
            form_edit_row_5.childs.push(form_input_grace_time_value2);

            /*            form_edit_row_1.childs.push(form_checkbox_distinguish);*/

            col_edit1.childs.push(bt_apply);
            row_edit1.childs.push(col_edit1);

            objs_edit.push(row_edit1);
            objs_edit.push(form_edit_row_1);
            objs_edit.push(form_edit_row_2);
            objs_edit.push(form_edit_row_3);
            objs_edit.push(form_edit_row_4);
            objs_edit.push(form_edit_row_5);

            // Инициализируем форму редактирования
            form_edit.init({
                alert: alert,
                objs: objs_edit,
                mb: 2,
                id: null,
                cl_form: null,
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {

                    }
                }.bind(this),
                fn_html_init: null,
                fn_init: function (init) {
                    // Инициализация формы закончена
                    // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                    form_edit.create_element(edit_elements, true);
                    // отобразим форму
                    $form_edit.empty();
                    $form_edit.append(form_edit.$form);
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(this),
            });

            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict