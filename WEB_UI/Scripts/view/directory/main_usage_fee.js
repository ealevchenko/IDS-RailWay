﻿(function ($) {
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
            'mainuf_update': 'Обновляю ...',


            'mainuf_label_date_period_start': 'Начало :',
            'mainuf_title_date_period_start': 'Начало',
            'mainuf_label_date_period_stop': 'Окончание :',
            'mainuf_title_date_period_stop': 'Окончание',
            'mainuf_label_hour_after_30': 'Округление часа после 30 мин.',
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

            'mainuf_label_stn_from': 'Cт. отпр. :',
            'mainuf_title_stn_from': 'Cт. отпр.',
            'mainuf_label_arrival_cargo': 'Груз. приб. :',
            'mainuf_title_arrival_cargo': 'Груз. приб.',
            'mainuf_label_stn_to': 'Cт. приб. :',
            'mainuf_title_stn_to': 'Cт. приб.',
            'mainuf_label_outgoing_cargo': 'Груз. отпр. :',
            'mainuf_title_outgoing_cargo': 'Груз. отпр.',
            'mainuf_label_grace_time': 'Льгот время :',
            'mainuf_title_grace_time': 'Льгот время',
            'mainuf_label_bt_save': 'Сохранить',


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

            'mainuf_form_aplly_period_detali_message': 'Применить настройки детального ограничения на выбранный период',
            'mainuf_mess_cancel_operation_aplly_period_detali': 'Операция "ПРИМЕНИТЬ НАСТРОЙКИ ОГРАНИЧЕНИЯ ПЕРИОДА"-Отменена пользователем',
            'mainuf_mess_update_operation_aplly_period_detali': 'Выполняю операцию "ПРИМЕНИТЬ НАСТРОЙКИ ОГРАНИЧЕНИЯ ПЕРИОДА"',

            'mainuf_mess_ok_operation_aplly_period': 'Операция "ПРИМЕНИТЬ НАСТРОЙКИ ПЕРИОДА" - выполнена',
            'mainuf_mess_ok_operation_aplly_period_detali': 'Операция "ПРИМЕНИТЬ НАСТРОЙКИ ОГРАНИЧЕНИЯ ПЕРИОДА" - выполнена',
            'mainuf_mess_ok_operation_delete_period_detali': 'Операция "УДАЛИТЬ НАСТРОЙКИ ОГРАНИЧЕНИЯ ПЕРИОДА" - выполнена',

            'mainuf_mess_error_operation_aplly_period': 'Ошибка выполнения операции "ПРИМЕНИТЬ НАСТРОЙКИ ПЕРИОДА", код ошибки=',
            'mainuf_mess_error_operation_aplly_period_detali': 'Ошибка выполнения операции "ПРИМЕНИТЬ НАСТРОЙКИ ОГРАНИЧЕНИЯ ПЕРИОДА", код ошибки=',
            'mainuf_mess_error_operation_delete_period_detali': 'Ошибка выполнения операции "УДАЛИТЬ НАСТРОЙКИ ОГРАНИЧЕНИЯ ПЕРИОДА", код ошибки=',

            'mainuf_mess_valid_select_period_is_null': 'Не выбраны связки оператор-род',

            'mainuf_mess_valid_select_period_detali_is_null': 'Не выбраны условия льготного времени',


            'mainuf_error_value_manual_fee_amount': 'Ошибка, введена неправильная сумма :{0} - число должно быть больше 0 и иметь 2 знака после точки!',
            'mainuf_error_value_manual_time': 'Ошибка, введена неправильное время :{0} - число должно быть больше 0 и определенно в целых минутах',
            'mainuf_error_value': 'Ошибка, не введены данные для изменения',

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
    var TTDR = App.table_td_report;

    var alert = App.alert_form;
    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var SRV = App.ids_server;
    var ids_srv = new SRV(); // Создадим класс ids_server

    // Показать правильную дату
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + ':' + minutes;
    };

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
    var list_external_station = [];     // Перечень внешних станций
    var list_cargo = [];                // Перечень грузов

    var list_operation_rod = [];        // Перечень выбранных операторов и родов
    var list_period = [];               // Перечень периодов
    var list_select_period = [];        // Перечень выбранных периодов
    var list_period_detali = [];        // Перечень выбранных деталей периодов
    var list_select_period_detali = []; // Перечень выбранных деталных периодов
    var id_usage_fee_period = null;

    var list_outgoing_num = [];         // Перечень
    var select_rows = null;

    var edit_elements = {};

    var $form_edit = $('div#form-edit');

    var table_usage_fee_period = new TTDR('div#usage-fee-period');                     // Создадим экземпляр

    var table_usage_fee_outgoing_cars = new TTDR('div#usage-fee-outgoing-cars');       // Создадим экземпляр

    var out_label_time = function (val) {
        var res = "error";
        if (isNumeric(val) && Number(val) >= 0) {
            var res = getTimeFromMins(Number(val));
        } else if (val === null || val === "") {
            var res = "";
        }
        $lb_manual_time_hour.text(res);
    };

    var $num_wagon = $('input#num_wagon');
    var $manual_fee_amount = $('input#manual_fee_amount');
    var $manual_time = $('input#manual_time');
    $manual_time.on('change', function (e) {
        var val = $(e.currentTarget).val();
        out_label_time(val);
    });
    var $lb_manual_time_hour = $('label#manual_time_hour');
    var $note = $('input#note');

    var $bt_search_wagon = $('button#bt_search_wagon').on('click', function (event) {
        event.preventDefault();
        search_num($num_wagon.val());
    });
    var $bt_update_wagon = $('button#bt_update_wagon').on('click', function (event) {
        event.preventDefault();
        update_manual_fee_amount($manual_fee_amount.val(), $manual_time.val());
    });

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

    var validation_detali = function () {
        form_edit.validation_common.clear_all();
        var valid = true;
        // Проверка 

        if (list_select_period === null || (list_select_period !== null && list_select_period.length === 0)) {
            form_edit.validation_common.out_error_message(langView('mainuf_mess_valid_select_period_is_null', App.Langs));
            valid = false;
        }

        var stn_from = Number(edit_elements.select_code_stn_from.val());
        var arrival_cargo = Number(edit_elements.select_id_cargo_arrival.val());
        var stn_to = Number(edit_elements.select_code_stn_to.val());
        var outgoing_cargo = Number(edit_elements.select_id_cargo_outgoing.val());
        if (stn_from === -1 && arrival_cargo === -1 && stn_to === -1 && outgoing_cargo === -1) {
            form_edit.validation_common.out_error_message(langView('mainuf_mess_valid_select_period_detali_is_null', App.Langs));
            form_edit.validation_common.check_control_select_not_null(edit_elements.select_code_stn_from, langView('mainuf_mess_valid_select_period_detali_is_null', App.Langs), '', true);
            form_edit.validation_common.check_control_select_not_null(edit_elements.select_id_cargo_arrival, langView('mainuf_mess_valid_select_period_detali_is_null', App.Langs), '', true);
            form_edit.validation_common.check_control_select_not_null(edit_elements.select_code_stn_to, langView('mainuf_mess_valid_select_period_detali_is_null', App.Langs), '', true);
            form_edit.validation_common.check_control_select_not_null(edit_elements.select_id_cargo_outgoing, langView('mainuf_mess_valid_select_period_detali_is_null', App.Langs), '', true);
            valid = false;
        }
        // Ставка
        valid = valid & form_edit.validation_common.check_control_input_not_null(edit_elements.input_number_grace_time, langView('mainuf_mess_valid_rate_value_not_null', App.Langs), '', true);
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
                        list_period.push({ id: el.id_usage_fee_period, id_operator: el.usage_fee_period_id_operator, id_genus: el.usage_fee_period_id_genus });
                    }.bind(this));
                    var start = moment(form_edit.get('date_period_start')).set({ 'hour': 0, 'minute': 0, 'second': 0 }).format();       //.format('YYYY-MM-DD HH:mm:ss"');
                    var stop = moment(form_edit.get('date_period_stop')).set({ 'hour': 23, 'minute': 59, 'second': 59 }).format();      //.format('YYYY-MM-DD HH:mm:ss"');
                    var operation = {
                        start: start,
                        stop: stop,
                        hour_after_30: form_edit.get('hour_after_30'),
                        id_currency: get_select_number_value(edit_elements.select_rate_currency),
                        rate: form_edit.get('rate_value'),
                        id_currency_derailment: get_select_number_value(edit_elements.select_derailment_rate_currency),
                        rate_derailment: form_edit.get('derailment_rate_value'),
                        coefficient_route: form_edit.get('coefficient_route_value'),
                        coefficient_not_route: form_edit.get('coefficient_not_route_value'),
                        grace_time_1: get_input_number_value(form_edit.get('grace_time_value1')),
                        grace_time_2: get_input_number_value(form_edit.get('grace_time_value2')),
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
    // Обновить или добавить детали периода
    var action_save = function () {
        var valid = validation_detali();
        if (valid) {
            var operation = {
                id_usage_fee_period: list_select_period[0].id_usage_fee_period,
                id: list_select_period_detali !== null && list_select_period_detali.length > 0 ? list_select_period_detali[0].id : 0,
                stn_from: get_select_number_value(edit_elements.select_code_stn_from),
                arrival_cargo: get_select_number_value(edit_elements.select_id_cargo_arrival),
                stn_to: get_select_number_value(edit_elements.select_code_stn_to),
                outgoing_cargo: get_select_number_value(edit_elements.select_id_cargo_outgoing),
                grace_time: get_input_number_value(edit_elements.input_number_grace_time),
                user: App.User_Name,
            };
            var r = 5;
            ids_wsd.postChangeUsageFeePeriodDetali(operation, function (result_operation) {
                if (result_operation > 0) {
                    form_edit.validation_common.out_info_message(langView('mainuf_mess_ok_operation_aplly_period_detali', App.Langs));
                    LockScreenOff();
                } else {
                    // Ошибка выполнения
                    form_edit.validation_common.out_error_message(langView('mainuf_mess_error_operation_aplly_period_detali', App.Langs) + result_operation);
                    LockScreenOff();
                }
                // Обновим данные
                update_usage_fee_period_detali.call(this, id_usage_fee_period);
            }.bind(this));
        } else {

        }
    }
    // Удалить детали периода
    var active_delete = function () {
        modal_confirm_form.view(langView('mainuf_form_aplly', App.Langs), langView('mainuf_form_aplly_period_detali_message', App.Langs), function (res) {
            if (res) {
                // Выполнить операцию
                LockScreen(langView('mainuf_mess_update_operation_aplly_period_detali', App.Langs));
                var id = list_select_period_detali !== null && list_select_period_detali.length > 0 ? list_select_period_detali[0].id : 0;
                ids_wsd.deleteUsageFeePeriodDetali(id, function (result_operation) {
                if (result_operation > 0) {
                    form_edit.validation_common.out_info_message(langView('mainuf_mess_ok_operation_delete_period_detali', App.Langs));
                    LockScreenOff();
                } else {
                    // Ошибка выполнения
                    form_edit.validation_common.out_error_message(langView('mainuf_mess_error_operation_delete_period_detali', App.Langs) + result_operation);
                    LockScreenOff();
                }
                // Обновим данные
                update_usage_fee_period_detali.call(this, id_usage_fee_period);
            }.bind(this));
            } else {
                form_edit.validation_common.out_warning_message(langView('mainuf_mess_cancel_operation_aplly_period_detali', App.Langs))
            }
        }.bind(this));
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
        list_period_detali = [];
        if (list_operation_rod && list_operation_rod.length > 0) {
            process_period = list_operation_rod.length;
            $.each(list_operation_rod, function (key, el) {
                ids_wsd.getLastUsageFeePeriodOfOperatorGenus(el.id_operator, el.id_genus, function (list_result) {
                    if (list_result && list_result.length > 0) {
                        list_period = list_period.concat(list_result);
                    } else {
                        var genus = ids_dir.getGenusWagons_Of_ID(el.id_genus);
                        var operator = ids_dir.getOperatorsWagons_Of_ID(el.id_operator);
                        list_period.push({
                            id_usage_fee_period: 0,
                            usage_fee_period_id_operator: el.id_operator,
                            usage_fee_period_operator_abbr_ru: operator.abbr_ru,
                            usage_fee_period_operator_ru: operator.operators_ru,
                            usage_fee_period_operator_abbr_en: operator.abbr_en,
                            usage_fee_period_operator_en: operator.operators_en,
                            usage_fee_period_operators_paid: null,
                            usage_fee_period_operators_rop: null,
                            usage_fee_period_operators_local_use: null,
                            usage_fee_period_operators_color: null,
                            usage_fee_period_id_genus: el.id_genus,
                            usage_fee_period_genus_ru: genus.genus_ru,
                            usage_fee_period_genus_en: genus.genus_en,
                            usage_fee_period_genus_abbr_ru: genus.abbr_ru,
                            usage_fee_period_genus_abbr_en: genus.abbr_en,
                            usage_fee_period_rod_uz: null,
                            usage_fee_period_start: null,
                            usage_fee_period_stop: null,
                            usage_fee_period_id_currency: null,
                            usage_fee_period_currency_ru: null,
                            usage_fee_period_currency_en: null,
                            usage_fee_period_code: null,
                            usage_fee_period_code_cc: null,
                            usage_fee_period_rate: null,
                            usage_fee_period_id_currency_derailment: null,
                            usage_fee_period_derailment_currency_ru: null,
                            usage_fee_period_derailment_currency_en: null,
                            usage_fee_period_derailment_code: null,
                            usage_fee_period_derailment_code_cc: null,
                            usage_fee_period_rate_derailment: null,
                            usage_fee_period_coefficient_route: null,
                            usage_fee_period_coefficient_not_route: null,
                            usage_fee_period_grace_time_1: null,
                            usage_fee_period_grace_time_2: null,
                            usage_fee_period_note: null,
                            usage_fee_period_create: null,
                            usage_fee_period_create_user: null,
                            usage_fee_period_change: null,
                            usage_fee_period_change_user: null,
                            usage_fee_period_close: null,
                            usage_fee_period_close_user: null,
                            usage_fee_period_parent_id: null,
                            usage_fee_period_hour_after_30: null,
                        });
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

    // обновить данные детального периода
    var update_usage_fee_period_detali = function (id_usage_fee_period) {
        ids_wsd.getUsageFeePeriodDetaliOfIDPeriod(id_usage_fee_period, function (list_result) {
            list_period_detali = list_result;
            list_select_period_detali = [];
            this.table_usage_fee_period_detali.obj_t_report.button(0).enable(true);
            this.table_usage_fee_period_detali.view(list_period_detali);
            LockScreenOff();
        }.bind(this));
    };

    // Показать вагоны в отправках
    var view_outgoing_wagon = function () {
        ids_wsd.getViewOutgoingCarsOfNum($num_wagon.val(), function (vagon_result) {
            list_outgoing_num = vagon_result;
            table_usage_fee_outgoing_cars.view(vagon_result, select_rows !== null ? select_rows.outgoing_car_id : null);
            LockScreenOff();
        }.bind(this));
    };
    // править плату за пользование
    var update_outgoing_wagon = function () {
        var mfa = $manual_fee_amount.val();
        var mt = $manual_time.val();
        if (select_rows !== null) {
            var options = {
                id_wir: select_rows.id_wir,
                manual_fee_amount: ((mfa !== null && mfa !== "") ? Number(mfa) : null),
                manual_time: ((mt !== null && mt !== "") ? Number(mt) : null),
                note: $note.val(),
                user: App.User_Name,
            };
            ids_wsd.postUpdateManualFeeAmount(options, function (result) {
                if (result >= 0) {
                    view_outgoing_wagon();
                    alert.out_info_message('Правка платы за пользование, выполнена!');
                } else {
                    alert.out_error_message('Ошибка, правки платы за пользование, код ошибки :' + result);
                    LockScreenOff();
                }

            }.bind(this));
        }
    };

    // Проверка номера вагона
    var search_num = function (num) {
        alert.clear_message();
        //clear(); // Очистим экран от старой информации
        LockScreen(langView('mess_delay', App.Langs));
        $bt_search_wagon.prop("disabled", true);
        if (!isNumeric(num) || !is_valid_num_wagon(num)) {
            // Ошибка ввода
            alert.out_error_message('Ошибка, введен неправильный номер :' + num);
            $bt_search_wagon.prop("disabled", false);
            LockScreenOff();
        } else {
            view_outgoing_wagon();
            $bt_search_wagon.prop("disabled", false);
        }
    };

    // Проверка номера вагона
    var update_manual_fee_amount = function (mfa, mt) {
        alert.clear_message();
        LockScreen(langView('mainuf_update', App.Langs));
        $bt_update_wagon.prop("disabled", true);
        var update = false;
        if ((mfa !== null && mfa !== "") || (mt !== null && mt !== "")) {
            if (mfa !== null && mfa !== "") {
                if (!isDecimal(mfa) || Number(mfa) < 0) {
                    // Ошибка ввода
                    alert.out_error_message(langView('mainuf_error_value_manual_fee_amount', App.Langs).format(mfa));
                    $bt_update_wagon.prop("disabled", false);
                    update = false;
                    LockScreenOff();
                } else {
                    update = true;
                }
            }
            if (mt !== null && mt !== "") {
                if (!isNumeric(mt) || Number(mt) < 0) {
                    // Ошибка ввода
                    alert.out_error_message(langView('mainuf_error_value_manual_time', App.Langs).format(mt));
                    $bt_update_wagon.prop("disabled", false);
                    update = false;
                } else {
                    update = true;
                }
            }
        } else {
            mfa = null;
            mt = null;
            update = true;
        }
        if (update) {
            update_outgoing_wagon();
            $bt_update_wagon.prop("disabled", false);
            LockScreenOff();
        } else {
            alert.out_error_message(langView('mainuf_error_value', App.Langs));
            $bt_update_wagon.prop("disabled", false);
            LockScreenOff();
        }

    };

    var active_tab = 0;

    var form_edit_detali_clear = function (enable) {
        $('button#save').prop("disabled", !enable);
        form_edit.set('code_stn_from', -1);
        form_edit.set('id_cargo_arrival', -1);
        form_edit.set('code_stn_to', -1);
        form_edit.set('id_cargo_outgoing', -1);
        form_edit.set('grace_time', null);
        if (enable) {
            form_edit.enable('code_stn_from');
            form_edit.enable('id_cargo_arrival');
            form_edit.enable('code_stn_to');
            form_edit.enable('id_cargo_outgoing');
            form_edit.enable('grace_time');
        } else {
            form_edit.disable('code_stn_from');
            form_edit.disable('id_cargo_arrival');
            form_edit.disable('code_stn_to');
            form_edit.disable('id_cargo_outgoing');
            form_edit.disable('grace_time');
        }
    };

    var form_edit_clear = function () {
        $('button#apply').prop("disabled", true);
        form_edit.set('date_period_start', null); form_edit.disable('date_period_start');
        form_edit.set('date_period_stop', null); form_edit.disable('date_period_stop');
        form_edit.set('hour_after_30', false); form_edit.disable('hour_after_30');
        form_edit.set('rate_currency', -1); form_edit.disable('rate_currency');
        form_edit.set('rate_value', null); form_edit.disable('rate_value');
        form_edit.set('derailment_rate_currency', -1); form_edit.disable('derailment_rate_currency');
        form_edit.set('derailment_rate_value', null); form_edit.disable('derailment_rate_value');
        form_edit.set('coefficient_route_value', null); form_edit.disable('coefficient_route_value');
        form_edit.set('coefficient_not_route_value', null); form_edit.disable('coefficient_not_route_value');
        form_edit.set('grace_time_value1', null); form_edit.disable('grace_time_value1');
        form_edit.set('grace_time_value2', null); form_edit.disable('grace_time_value2');
        form_edit_detali_clear(false);
    };

    // После загрузки документа
    $(document).ready(function ($) {
        LockScreen(langView('mainuf_init_main', App.Langs));
        $bt_update_wagon.prop("disabled", true);
        $manual_fee_amount.val('');
        $manual_time.val('');
        $note.val('');
        $manual_fee_amount.prop("disabled", true);
        $manual_time.prop("disabled", true);
        $note.prop("disabled", true);
        modal_confirm_form.init();
        // Загрузим справочники, с признаком обязательно
        load_db(['operators_wagons', 'currency', 'genus_wagon', 'external_station', 'cargo'], true, function (result) {
            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);

            list_currency = ids_dir.getListCurrency('id', 'currency', App.Lang, null);
            list_external_station = ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
            list_cargo = ids_dir.getListCargo('id', 'cargo_name', App.Lang, null);

            var process = 6;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    this.table_operators_wagons.view(ids_dir.list_operators_wagons.filter(function (i) { return i.parent_id === null }.bind(this)));
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
                                    return (i.parent_id === null && i.id_operator === el.id) || (i.parent_id !== null && i.parent_id === el.id); //
                                }.bind(this));
                                list_operators_genus = list_operators_genus.concat(genus);
                            }.bind(this));
                            this.table_operators_wagons_genus.view(list_operators_genus);
                            list_period = [];
                            list_select_period = [];
                            list_period_detali = [];
                            table_usage_fee_period.view(list_period);
                            LockScreenOff();
                        }.bind(this));
                    } else {
                        form_edit_clear();
                        this.table_operators_wagons_genus.view(list_operators_genus);
                        list_period = [];
                        list_select_period = [];
                        list_period_detali = [];
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
                    form_edit_clear();
                    list_operation_rod = rows;
                    update_period_operation_rod();
                }.bind(this),
            });
            // Инициализация модуля "Таблица операторов вагонов"
            table_usage_fee_period.init({
                alert: null,
                detali_table: false,
                type_report: 'usage_fee_period_select',     //
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
                    list_select_period_detali = [];
                    form_edit.validation_common.clear_all();
                    if (rows && rows.length > 0) {
                        $('button#apply').prop("disabled", false);
                        form_edit.set('date_period_start', rows[rows.length - 1].usage_fee_period_start); form_edit.enable('date_period_start');
                        form_edit.set('date_period_stop', rows[rows.length - 1].usage_fee_period_stop); form_edit.enable('date_period_stop');
                        form_edit.set('hour_after_30', rows[rows.length - 1].usage_fee_period_hour_after_30); form_edit.enable('hour_after_30');
                        form_edit.set('rate_currency', rows[rows.length - 1].usage_fee_period_id_currency); form_edit.enable('rate_currency');
                        form_edit.set('rate_value', rows[rows.length - 1].usage_fee_period_rate); form_edit.enable('rate_value');
                        form_edit.set('derailment_rate_currency', rows[rows.length - 1].usage_fee_period_id_currency_derailment); form_edit.enable('derailment_rate_currency');
                        form_edit.set('derailment_rate_value', rows[rows.length - 1].usage_fee_period_rate_derailment); form_edit.enable('derailment_rate_value');
                        form_edit.set('coefficient_route_value', rows[rows.length - 1].usage_fee_period_coefficient_route); form_edit.enable('coefficient_route_value');
                        form_edit.set('coefficient_not_route_value', rows[rows.length - 1].usage_fee_period_coefficient_not_route); form_edit.enable('coefficient_not_route_value');
                        form_edit.set('grace_time_value1', rows[rows.length - 1].usage_fee_period_grace_time_1); form_edit.enable('grace_time_value1');
                        form_edit.set('grace_time_value2', rows[rows.length - 1].usage_fee_period_grace_time_2); form_edit.enable('grace_time_value2');
                        if (rows.length == 1) {
                            form_edit_detali_clear(false);
                            id_usage_fee_period = rows[0].id_usage_fee_period;
                            update_usage_fee_period_detali.call(this, id_usage_fee_period);
                            //ids_wsd.getUsageFeePeriodDetaliOfIDPeriod(id_usage_fee_period, function (list_result) {
                            //    list_period_detali = list_result;
                            //    list_select_period_detali = [];
                            //    this.table_usage_fee_period_detali.obj_t_report.button(0).enable(true);
                            //    this.table_usage_fee_period_detali.view(list_period_detali);
                            //    LockScreenOff();
                            //}.bind(this));
                        } else {
                            form_edit_detali_clear(false);
                            list_period_detali = [];
                            list_select_period_detali = [];
                            this.table_usage_fee_period_detali.obj_t_report.button(0).enable(false);
                            this.table_usage_fee_period_detali.view(list_period_detali);
                            LockScreenOff();
                        }
                    } else {
                        form_edit_clear();
                        list_period_detali = [];
                        list_select_period_detali = [];
                        this.table_usage_fee_period_detali.obj_t_report.button(0).enable(false);
                        this.table_usage_fee_period_detali.view(list_period_detali);
                        LockScreenOff();
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
            var form_edit_row_6 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };

            var form_edit_row_7_edit = {
                obj: 'bs_form_row',
                options: {
                    class: 'm-1 border border-primary',
                },
                childs: []
            };
            var form_edit_row_7_table = {
                obj: 'bs_form_row',
                options: {
                    class: 'mt-2',
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
            var form_checkbox_hour_after_30 = {
                obj: 'bs_checkbox',
                element: null,
                options: {
                    id: 'hour_after_30',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left p-1',
                    label: langView('mainuf_label_hour_after_30', App.Langs),
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

            var form_select_stn_from = {
                obj: 'bs_select',
                options: {
                    id: 'code_stn_from',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_stn_from', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_stn_from', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_external_station,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_select_arrival_cargo = {
                obj: 'bs_select',
                options: {
                    id: 'id_cargo_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_arrival_cargo', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_arrival_cargo', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_cargo,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_select_stn_to = {
                obj: 'bs_select',
                options: {
                    id: 'code_stn_to',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_stn_to', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_stn_to', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_external_station,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_select_outgoing_cargo = {
                obj: 'bs_select',
                options: {
                    id: 'id_cargo_outgoing',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_outgoing_cargo', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_outgoing_cargo', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_cargo,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_input_grace_time = {
                obj: 'bs_input_number',
                options: {
                    id: 'grace_time',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_grace_time', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_grace_time', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var col_bt_save = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 6,
                    class: 'p-2 d-flex justify-content-center',
                },
                childs: []
            };
            var bt_save = {
                obj: 'bs_button',
                options: {
                    color: 'success',
                    size: null,
                    class: null,
                    id: 'save',
                    label: langView('mainuf_label_bt_save', App.Langs),
                    title: '',
                    icon_left: 'fa-regular fa-floppy-disk', //<i class="fa-regular fa-floppy-disk"></i>
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                        action_save.call(this);
                    }.bind(this),
                }
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

            var col_table = {
                obj: 'bs_col',
                options: {
                    id: 'usage-fee-period-detali',
                    size: 'xl',
                    col: 12,
                    class: 'mt-2 text-left',
                },
                childs: []
            };

            form_edit_row_1.childs.push(form_input_date_period_start);
            form_edit_row_1.childs.push(form_input_date_period_stop);

            form_edit_row_2.childs.push(form_checkbox_hour_after_30);

            form_edit_row_3.childs.push(form_select_rate_currency);
            form_edit_row_3.childs.push(form_input_rate_value);

            form_edit_row_4.childs.push(form_select_derailment_rate_currency);
            form_edit_row_4.childs.push(form_input_derailment_rate_value);

            form_edit_row_5.childs.push(form_input_coefficient_route_value);
            form_edit_row_5.childs.push(form_input_coefficient_not_route_value);

            form_edit_row_6.childs.push(form_input_grace_time_value1);
            form_edit_row_6.childs.push(form_input_grace_time_value2);


            form_edit_row_7_edit.childs.push(form_select_stn_from);
            form_edit_row_7_edit.childs.push(form_select_arrival_cargo);
            form_edit_row_7_edit.childs.push(form_select_stn_to);
            form_edit_row_7_edit.childs.push(form_select_outgoing_cargo);
            form_edit_row_7_edit.childs.push(form_input_grace_time);
            col_bt_save.childs.push(bt_save);
            form_edit_row_7_edit.childs.push(col_bt_save);
            //form_edit_row_7_edit.childs.push(col_edit_arr);
            //form_edit_row_7_edit.childs.push(col_edit_out);

            form_edit_row_7_edit.childs.push(col_table);

            col_edit1.childs.push(bt_apply);
            row_edit1.childs.push(col_edit1);

            objs_edit.push(row_edit1);
            objs_edit.push(form_edit_row_1);
            objs_edit.push(form_edit_row_2);
            objs_edit.push(form_edit_row_3);
            objs_edit.push(form_edit_row_4);
            objs_edit.push(form_edit_row_5);
            objs_edit.push(form_edit_row_6);
            objs_edit.push(form_edit_row_7_edit);
            objs_edit.push(form_edit_row_7_table);


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

                    this.table_usage_fee_period_detali = new TTDR('div#usage-fee-period-detali');       // Создадим экземпляр
                    this.table_usage_fee_period_detali.init({
                        alert: null,
                        detali_table: false,
                        type_report: 'usage_fee_period_detali',     //
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
                            list_select_period_detali = rows;
                            if (rows != null && rows.length > 0) {
                                form_edit_detali_clear(true);
                                form_edit.set('code_stn_from', rows[0].code_stn_from);
                                form_edit.set('id_cargo_arrival', rows[0].id_cargo_arrival);
                                form_edit.set('code_stn_to', rows[0].code_stn_to);
                                form_edit.set('id_cargo_outgoing', rows[0].id_cargo_outgoing);
                                form_edit.set('grace_time', rows[0].grace_time);
                            } else {
                                form_edit_detali_clear(false);
                            }
                        }.bind(this),
                        fn_action: function (e, dt, node, config) {
                            if (config.button === 'add_detali') {
                                list_select_period_detali = [];
                                form_edit_detali_clear(true);
                            }
                            if (config.button === 'delete_detali') {
                                active_delete.call(this);
                            }
                        }.bind(this),
                    });

                    process--;
                    out_init(process);
                }.bind(this),
            });

            //
            table_usage_fee_outgoing_cars.init({
                alert: null,
                detali_table: false,
                type_report: 'usage_fee_outgoing_cars',     //
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
                    alert.clear_message();
                    if (rows && rows.length > 0) {
                        select_rows = rows[0];
                        $bt_update_wagon.prop("disabled", false);
                        $manual_fee_amount.prop("disabled", false);
                        $manual_time.prop("disabled", false);
                        $manual_fee_amount.val(rows[0].wagon_usage_fee_manual_fee_amount);
                        $manual_time.val(rows[0].wagon_usage_fee_manual_time);
                        out_label_time(rows[0].wagon_usage_fee_manual_time);
                        $note.prop("disabled", false);
                        $note.val(rows[0].wagon_usage_fee_note);
                    } else {
                        select_rows = null;
                        $bt_update_wagon.prop("disabled", true);
                        $manual_fee_amount.val('');
                        $manual_fee_amount.prop("disabled", true);
                        $manual_time.val('');
                        $manual_time.prop("disabled", true);
                        $note.val('');
                        $note.prop("disabled", true);
                    }
                }.bind(this),
            });
            form_edit_clear();
            //
            $('button[data-toggle="pill"]').on('shown.bs.tab', function (event) {
                switch (event.target.id) {
                    case 'pills-rates-tab': {
                        active_tab = 0; break;
                    }
                    case 'pills-correction-tab': {
                        active_tab = 1; break;
                    }
                }
                $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
            })
            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict