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
            'mainuf_label_derailment_rate_currency': 'Валюта :',
            'mainuf_title_derailment_rate_currency': 'Валюта',
            'mainuf_label_rate_value': 'Ставка :',
            'mainuf_title_rate_value': 'Ставка',
            'mainuf_label_derailment_rate_value': 'Ставка :',
            'mainuf_title_derailment_rate_value': 'Ставка',
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

    var list_operators_genus = [];  // Перечень операторов и родов вагонов
    var edit_elements = {};

    var $form_edit = $('div#form-edit');

    // После загрузки документа
    $(document).ready(function ($) {
        LockScreen(langView('mainuf_init_main', App.Langs));
        modal_confirm_form.init();
        // Загрузим справочники, с признаком обязательно
        load_db(['operators_wagons'], true, function (result) {
            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);

            var process = 3;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    this.table_operators_wagons.view(ids_dir.list_operators_wagons);
                    LockScreenOff();
                }
            }.bind(this);

            this.table_operators_wagons = new TDIR('div#operators-wagons');               // Создадим экземпляр
            // Инициализация модуля "Таблица прибывающих составов"
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
                            LockScreenOff();
                        }.bind(this));
                    } else {

                        this.table_operators_wagons_genus.view(list_operators_genus);
                        LockScreenOff();
                    }
                }.bind(this),
            });

            this.table_operators_wagons_genus = new TDIR('div#operators-wagons-genus');               // Создадим экземпляр
            // Инициализация модуля "Таблица прибывающих составов"
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
                    if (rows && rows.length > 0) {
                        ids_dir.getOperatorsWagonsOfGenus(function (genus_period) {

                        }.bind(this));
                        //this.table_adop_sostav_detali.view(rows[0].adoption_sostav);
                        LockScreenOff();
                    } else {
                        //this.table_adop_sostav_detali.view([]);
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

            var form_input_date_period_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_period_start',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_date_period_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_date_period_start', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: true,
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
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('mainuf_label_date_period_stop', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('mainuf_title_date_period_stop', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: true,
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
                    form_group_col: 2,
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
                    element_data: [],
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
                    form_group_col: 2,
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
                    element_data: [],
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_input_rate_value= {
                obj: 'bs_input_number',
                options: {
                    id: 'rate_value',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col:2,
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
            var form_input_derailment_rate_value= {
                obj: 'bs_input_number',
                options: {
                    id: 'derailment_rate_value',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col:2,
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

            //var form_checkbox_distinguish = {
            //    obj: 'bs_checkbox',
            //    element: null,
            //    options: {
            //        id: 'distinguish',
            //        validation_group: 'common',
            //        form_group_size: 'xl',
            //        form_group_col: 6,
            //        form_group_class: 'text-left',
            //        label: langView('maincc_label_distinguish', App.Langs),
            //        label_class: 'mb-1',
            //        checkbox_class: 'inp-auto',
            //        checkbox_title: null,
            //        checkbox_required: null,
            //        checkbox_readonly: null,
            //        element_default: null,
            //        element_change: null,
            //    },
            //    childs: []
            //};
            //var form_input_new_note = {
            //    obj: 'bs_textarea',
            //    options: {
            //        id: 'new_note',
            //        validation_group: 'common',
            //        form_group_size: 'xl',
            //        form_group_col: 12,
            //        form_group_class: 'text-left',
            //        label: langView('maincc_label_new_note', App.Langs),
            //        label_class: 'mb-1',
            //        textarea_size: null,
            //        textarea_rows: 3,
            //        textarea_class: null,
            //        textarea_title: langView('maincc_title_new_note', App.Langs),
            //        textarea_placeholder: null,
            //        textarea_required: null,
            //        textarea_readonly: null,
            //        input_group: false,
            //    },
            //    childs: []
            //};
            // Кнопки
            //var row_edit1 = {
            //    obj: 'bs_row',
            //    options: {
            //        class: 'mt-1',
            //    },
            //    childs: []
            //};
            //var col_edit1 = {
            //    obj: 'bs_col',
            //    options: {
            //        size: 'xl',
            //        col: 12,
            //        class: 'text-left',
            //    },
            //    childs: []
            //};
            //var bt_apply = {
            //    obj: 'bs_button',
            //    options: {
            //        color: 'primary',
            //        size: null,
            //        class: null,
            //        id: 'apply',
            //        label: langView('maincc_label_bt_apply', App.Langs),
            //        title: '',
            //        icon_left: 'fa-solid fa-pen-to-square',
            //        icon_right: null,
            //        click: function (event) {
            //            event.preventDefault();
            //            action_apply();
            //        }.bind(this),
            //    }
            //};
            form_edit_row_1.childs.push(form_input_date_period_start);
            form_edit_row_1.childs.push(form_select_rate_currency);
            form_edit_row_1.childs.push(form_input_rate_value);
/*            form_edit_row_1.childs.push(form_checkbox_distinguish);*/
            form_edit_row_2.childs.push(form_input_date_period_stop);
            form_edit_row_2.childs.push(form_select_derailment_rate_currency);
            form_edit_row_2.childs.push(form_input_derailment_rate_value);

            //col_edit1.childs.push(bt_apply);
            //row_edit1.childs.push(col_edit1);

            objs_edit.push(form_edit_row_1);
            objs_edit.push(form_edit_row_2);
/*            objs_edit.push(row_edit1);*/
            // Инициализируем форму редактирования
            form_edit.init({
                alert: alert,
                objs: objs_edit,
                mb: 2,
                id: null,
                cl_form: null,
                validation: true,
                fn_validation: null,
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