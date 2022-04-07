/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль форма "Принимаемый вагон детально"*/
(function (window) {
    'use strict';

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";


    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));


    //var min_err_detention_start = -2 * 60;   // TODO: Минимальная разница в часах начало задержания и текущей даты
    //var max_err_detention_start = 2 * 60;    // TODO: Максимальная разница в часах начало задержания и текущей даты
    //var max_err_detention_deff = 4 * 60;        // TODO: Минимальная разница в часах межу началом и концом задержания
    //var min_err_return_start = -2 * 60;     // TODO: Минимальная разница в часах начало задержания и текущей даты
    //var max_err_return_start = 2 * 60;      // TODO: Максимальная разница в часах начало задержания и текущей даты
    //var min_err_return_stop = -2 * 60;      // TODO: Минимальная разница в часах начало задержания и текущей даты
    //var max_err_return_stop = 2 * 60;       // TODO: Максимальная разница в часах начало задержания и текущей даты
    ////var max_err_return_deff = 4 * 60;     // TODO: Минимальная разница в часах межу началом и концом задержания
    //var list_groups_cargo = [11,20];        // TODO: Список id групп груза с порожними вагонами

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {

            'ficcd_label_arrival_car': 'Принять вагон',
            'ficcd_label_return_car': 'Вернуть вагон',
            'ficcd_title_search_car': 'Найти ЭПД по номеру вагона',
            'ficcd_title_manual_car': 'Ввести данные в ручную',
            'ficcd_label_num': '№ Вагона:',
            'ficcd_title_num': 'Номер вагона',
            'ficcd_label_position_arrival': '№ в поезде:',
            'ficcd_title_position_arrival': 'Автоматический ввод\корректировка (номер вагона в составе)',
            'ficcd_label_date_adoption_act': 'Время и дата приема по акту:',
            'ficcd_title_date_adoption_act': 'Ручной ввод (если вагон принимаем по акту)',
            'ficcd_label_document_nom_doc': '№ Досылочной накладной:',
            'ficcd_title_document_nom_doc': 'Номер досылочной накладной',
            'ficcd_label_document_nom_main_doc': '№ Основной накладной:',
            'ficcd_title_document_nom_main_doc': 'Номер основной накладной',
            'ficcd_title_fieldset_routes_clients': 'МАРШРУТЫ И КЛИЕНТЫ',
            'ficcd_title_departure_station': 'Станция отправки',
            'ficcd_label_code_stn_from': 'Код:',
            'ficcd_title_code_stn_from': 'ЭПД [OTPR/ROUTE/stn_from] -> Код станции отправки',
            'ficcd_label_station_from_name': 'Название:',
            'ficcd_title_station_from_name': 'ЭПД [OTPR/ROUTE/name_from] -> Справочник "Внешних станций" -> Справочник "Дорог" -> Название станции отправки',
            'ficcd_label_from_inlandrailway_name': 'Дорога:',
            'ficcd_title_from_inlandrailway_name': 'Автоматически берется из справочника "Дорог" -> Название дороги',

            'ficcd_title_add_station_from': 'Добавить новую внешнюю станцию в справочник "Внешних станций", информация берется автоматически из ЭПД',
            'ficcd_form_add_db_ids': 'Добавить в справочник ИДС?',
            'ficcd_form_message_add_ext_station_ids': 'Вы уверены что хотите добавить в справочник «Внешних станций» БД ИДС новую станцию {0}, с кодом {1}?',
            'ficcd_mess_run_add_db_ids': 'Выполняю операцию "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС"...',
            'ficcd_mess_cancel_add_db_ids': 'Отмена выполнения операции "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС"',
            'ficcd_mess_ok_add_db_ids': 'Операция "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС" - выполнена',
            'ficcd_mess_error_add_db_ids': 'Ошибка выполнения операции "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС"',

            'ficcd_title_ext_station': 'ВНЕШНЮЮ СТАНЦИЮ',



            'ficcd_mess_valid_not_station_from_name': 'Укажите станцию отправления', //
            'ficcd_mess_valid_station_from_name': 'Указанной станции отправления нет в справочнике ИДС', //
            'ficcd_mess_valid_add_station_from_name': 'Станции отправления нет в справочнике ИДС, для продолжения добавьте станцию в справочник', //

            'ficcd_mess_warning_no_data_wagon_uz': 'По выбранному вагону нет данных в БД УЗ. (будут применены данный из справочника ИДС).', //
            'ficcd_mess_warning_no_data_dir_wagon': 'По выбранному вагону нет данных в справочнике вагонов ИДС.', //
            'ficcd_mess_warning_no_epd_wagon': 'По выбранному вагону нет перевозочного документа.', //
            'ficcd_mess_warning_no_main_epd_wagon': 'По выбранному вагону нет не найден основной перевозочный документ.', //

            'ficcd_mess_init_panel': 'Инициализация модуля (form_incoming_cars_detali) ...',
            'ficcd_mess_load_wagon': 'Обновляю информацию по вагону...', //
            'ficcd_mess_load_db_uz': 'Обновляю информацию о вагоне с БД УЗ...', //


            //'ficcd_mess_load_return_wagon': 'Поиск информации по возвратам',
            //'ficcd_mess_update_operation_detention': 'Выполняю операцию обновления задержания по вагону',

            //'ficcd_mess_ok_operation_detention': 'Операция "Обновить задержание по вагону" - выполнена',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;
    var uz_directory = App.uz_directory;

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    // Создадим форму правки операторов
    var FDL = App.form_dialog;
    //-----------------------------------------------------------------------------
    //-- КОНСТРУКТОР
    //-----------------------------------------------------------------------------
    function form_incoming_cars_detali(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$form_incoming_cars = $(selector);
        if (this.$form_incoming_cars.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$form_incoming_cars.attr('id');
    };
    //-----------------------------------------------------------------------------
    //-- Функции инициализации
    //-----------------------------------------------------------------------------
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_incoming_cars_detali.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_incoming_cars_detali.prototype.init = function (options) {
        this.init = true;
        //-------------------------------------
        // Сообщение
        LockScreen(langView('ficcd_mess_init_panel', App.Langs));
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            ids_dir: null,
            uz_dir: null,
            fn_init: null,
            fn_update: null,
        }, options);
        //----------------------------------------------------------------
        // Создадим ссылку на модуль работы с базой данных
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.uz_dir = this.settings.uz_dir ? this.settings.uz_dir : new uz_directory();

        // Создать модальную форму "Окно сообщений"
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();
        //// Создадим и инициализируем модуль Задержания и возвраты детвльно
        //var TOGDR = App.table_outgoing_detention_return; // Отправленные вагоны
        var sel_ogdr = 'table-ogdr-' + this.selector;
        //----------------------------------------------------------------
        //this.list_station = [];
        this.elements = {};                     // Все элементы формы

        //this.list_reason_discrepancy = null;    // Список
        //this.list_detention_return = null;
        //this.list_cargo = null;
        //this.list_cargo_group = null;
        //this.list_divisions = null;
        this.list_external_station = null;
        this.id = null;                         // текущее id вагона
        this.wagon = null;                      // Текущий вагон
        //this.current_id_return_wagons = null;   // Текущий id открытой строки возврата
        //this.current_id_condition = null;       // Текущий id разметки
        //this.arrival_id_wagon_rent = null;      // Текущий id аренды по прибытию
        //this.outgoing_id_wagon_rent = null;     // Текущий id аренды по отправке
        //this.current_id_countrys = null;        // Текущий id администрации
        //this.current_id_genus = null;           // Текущий id род вагона
        //this.current_id_owner = null;           // Текущий id владелец
        //this.detention_edit = false;            // Текущий режим правки задержания
        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['external_station'], false, function (result) {
            // Подгрузили списки
            //this.list_reason_discrepancy = [];//this.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', App.Lang, null);
            //this.list_detention_return = [];//this.ids_dir.getListDetention_Return('id', 'cause', App.Lang, null);
            //this.list_cargo = [];//this.ids_dir.getListCargo('id', 'cargo_name', App.Lang, null);
            //this.list_cargo_group = [];//this.ids_dir.getListCargoGroup('id', 'cargo_group_name', App.Lang, null);
            //this.list_divisions = [];//this.ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);
            this.list_external_station = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
            //----------------------------------
            // Создать макет панели
            this.form = new FDL();
            var objs = [];
            // Кнопки
            var row1 = {
                obj: 'bs_row',
                options: {
                    class: 'mb-1',
                },
                childs: []
            };
            var col1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var bt_arrival_car = {
                obj: 'bs_button',
                options: {
                    color: 'primary',
                    size: null,
                    class: null,
                    id: 'arrival_car',
                    label: langView('ficcd_label_arrival_car', App.Langs),
                    title: '',
                    icon_left: 'fa fa-arrow-circle-left',
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                        this.action_present_wagon();
                    }.bind(this),
                }
            };
            var bt_return_car = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: null,
                    class: 'float-right',
                    id: 'return_car',
                    label: langView('ficcd_label_return_car', App.Langs),
                    title: '',
                    icon_left: null,
                    icon_right: 'fa fa-arrow-circle-right',
                    click: function (event) {
                        event.preventDefault();
                        this.action_return_wagon();
                    }.bind(this),
                }
            };
            // Форма детально
            var row_detali = {
                obj: 'bs_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_detali = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: null,
                },
                childs: []
            };
            // Общие данные
            var fieldset_common = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: null,
                    class_legend: null,
                },
                childs: []
            };
            var form_row_common1 = {
                obj: 'bs_form_row',
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
                    title: langView('ficcd_title_search_car', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-search',
                    click: function (event) {
                        event.preventDefault();
                        //this.action_remove_wagon();
                    }.bind(this),
                }
            };
            var bt_manual_car = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'manual_car',
                    label: null,
                    title: langView('ficcd_title_manual_car', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-edit',
                    click: function (event) {
                        event.preventDefault();
                        //this.action_remove_wagon();
                    }.bind(this),
                }
            };
            var form_input_num = {
                obj: 'bs_input_number',
                element: null,
                options: {
                    id: 'num_car',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_num', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_readonly: true,
                    input_min: null,
                    input_max: null,
                    input_step: null,
                    input_spinner: false,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_search_car, bt_manual_car],
                },
                childs: []
            };
            var form_input_position_arrival = {
                obj: 'bs_input_number',
                options: {
                    id: 'position_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_position_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_position_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_min: 1,
                    input_max: 120,
                    input_step: 1,
                    input_spinner: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_date_adoption_act = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_adoption_act',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_date_adoption_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_date_adoption_act', App.Langs),
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
            var form_row_common2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_document_nom_main_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'document_nom_main_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_document_nom_main_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_document_nom_main_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_document_nom_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'document_nom_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_document_nom_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_document_nom_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };

            // МАРШРУТЫ И КЛИЕНТЫ
            var fieldset_routes_clients = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('ficcd_title_fieldset_routes_clients', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            // Станция отправки
            var form_row_routes_clients1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_routes_clients1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_departure_station = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_departure_station', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_departure_station = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_code_stn_from = {
                obj: 'bs_input_number',
                options: {
                    id: 'code_stn_from',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_code_stn_from', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_code_stn_from', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_station_from_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'station_from_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_station_from_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_station_from_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_external_station,
                    element_minLength: 2,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_statin_from = this.get_ids_station_from(null, text);
                        this.view_element(this.ids_statin_from,
                            function (value) {
                                // Получили ответ
                                this.elements.input_number_code_stn_from.val(this.ids_statin_from.code);
                                this.elements.input_text_from_inlandrailway_name.val(this.ids_statin_from.ir_name);
                                this.form.set_validation_object_ok(null, 'station_from_name', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_number_code_stn_from.val('');
                                this.elements.input_text_from_inlandrailway_name.val('');
                                this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_station_from_name', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных                                
                                this.elements.input_number_code_stn_from.val('');
                                this.elements.input_text_from_inlandrailway_name.val('');
                                this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_not_station_from_name', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            var bt_add_station_from = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_station_from',
                    label: null,
                    title: langView('ficcd_title_add_station_from', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_station_from();
                    }.bind(this),
                }
            };
            var form_input_from_inlandrailway_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'from_inlandrailway_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_from_inlandrailway_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_from_inlandrailway_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_station_from],
                },
                childs: []
            };
            // Станция прибытия


            // Собираем
            col1.childs.push(bt_arrival_car);
            col1.childs.push(bt_return_car);
            row1.childs.push(col1);
            //
            form_row_common1.childs.push(form_input_num);
            form_row_common1.childs.push(form_input_position_arrival);
            form_row_common1.childs.push(form_input_date_adoption_act);
            form_row_common2.childs.push(form_input_document_nom_main_doc);
            form_row_common2.childs.push(form_input_document_nom_doc);
            //
            fieldset_common.childs.push(form_row_common1);
            fieldset_common.childs.push(form_row_common2);
            // станция отправки
            form_row_departure_station.childs.push(form_input_code_stn_from);
            form_row_departure_station.childs.push(form_input_station_from_name);
            form_row_departure_station.childs.push(form_input_from_inlandrailway_name);
            //
            fieldset_departure_station.childs.push(form_row_departure_station);
            col_routes_clients1.childs.push(fieldset_departure_station);
            //....

            // Маршруты и клиенты
            form_row_routes_clients1.childs.push(col_routes_clients1);
            fieldset_routes_clients.childs.push(form_row_routes_clients1);

            //
            col_detali.childs.push(fieldset_common);
            col_detali.childs.push(fieldset_routes_clients);

            row_detali.childs.push(col_detali);
            //
            objs.push(row1);
            objs.push(row_detali);
            // Инициализируем форму
            this.form.init({
                alert: this.settings.alert, // Подключим Alert модальной формы
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
                    this.$form_incoming_cars.empty();
                    this.$form_incoming_cars.append(this.form.$form);
                    //// Инициализация таблица возвратов детально
                    //this.table_outgoing_detention_return = new TOGDR('div#' + sel_ogdr);             // Создадим экземпляр
                    //this.table_outgoing_detention_return.init({
                    //    type_report: 'return_cars',
                    //    alert: null,
                    //    ids_dir: this.ids_dir,
                    //    ids_wsd: null,
                    //    fn_select_rows: function (rows) {

                    //    }.bind(this),
                    //    fn_init: function (init) {
                    // Инициализация закончена
                    if (typeof this.settings.fn_init === 'function') {
                        this.settings.fn_init(this.init);
                    };
                    //    }.bind(this),
                    //});

                }.bind(this),
            });
        }.bind(this));
    }
    //-----------------------------------------------------------------------------
    //-- Функции обработки состояния формы
    //-----------------------------------------------------------------------------
    // Очистить форму
    form_incoming_cars_detali.prototype.clear_form = function () {
        this.clear_out_validation();
        if (this.elements) {
            this.elements.input_number_num_car.val('');
            this.elements.input_number_position_arrival.val('1');
            this.elements.input_datetime_date_adoption_act.set(null); // уберем дату
            this.elements.input_text_document_nom_doc.val('');
            this.elements.input_text_document_nom_main_doc.val('');
            this.elements.input_number_code_stn_from.val('');
            this.elements.autocomplete_station_from_name.text('');
            this.elements.input_text_from_inlandrailway_name.val('');

            //this.elements.input_number_gruzp_uz.val('');
            //this.elements.input_datetime_detention_start.set(null); // уберем дату

        } else {
            throw new Error('this.elements - пустой, нет привязки');
        }
    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.close = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.form.bt_hide('arrival_car');
        this.form.bt_hide('return_car');
        this.form.bt_hide('car_return');
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Задержание
        this.form.bt_hide('detention_save');
        this.form.bt_hide('detention_edit');
        if (this.form.obj_form.validations.length > 1) {
            this.form.obj_form.validations[1].$elements.each(function () {
                this.prop('disabled', true);
            });
        }

        //-- Возврат
        this.form.bt_hide('return_open');
        this.form.bt_hide('return_close');
        if (this.form.obj_form.validations.length > 2) {
            this.form.obj_form.validations[2].$elements.each(function () {
                this.prop('disabled', true);
            });
        }

    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.view = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.elements.button_arrival_car.hide();
        if (this.wagon && this.wagon.outgoing_sostav_status <= 1) {
            this.elements.button_return_car.show();
        } else {
            this.elements.button_return_car.hide();
        }
        this.elements.button_return_car.hide();
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        ////-- Задержание
        //this.elements.button_detention_edit.hide();
        //this.elements.button_detention_save.hide();
        //this.detention_edit = false;
        //this.form.obj_form.validations[1].$elements.each(function () {
        //    this.prop('disabled', true);
        //});
        ////-- Возврат
        //this.elements.button_return_open.hide();
        //this.elements.button_return_close.hide();
        //this.form.obj_form.validations[2].$elements.each(function () {
        //    this.prop('disabled', true);
        //});

    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.epd = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        if (this.wagon && this.wagon.outgoing_sostav_status <= 1) {
            this.elements.button_arrival_car.show();
            this.elements.button_return_car.show();
        } else {
            this.elements.button_arrival_car.hide();
            this.elements.button_return_car.hide();
        }
        //this.elements.button_return_car.hide();
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', true);
            };
        });
        ////-- Задержание
        //this.elements.button_detention_edit.hide();
        //this.elements.button_detention_save.hide();
        //this.detention_edit = false;
        //this.form.obj_form.validations[1].$elements.each(function () {
        //    //this.prop('disabled', true);
        //    if (this.is('.inp-manual')) {
        //        this.prop('disabled', false);
        //    };
        //});
        ////-- Возврат
        //this.elements.button_return_open.hide();
        //this.elements.button_return_close.hide();
        //this.form.obj_form.validations[2].$elements.each(function () {
        //    //this.prop('disabled', true);
        //    if (this.is('.inp-manual')) {
        //        this.prop('disabled', false);
        //    };
        //});
    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.edit = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        if (this.wagon && this.wagon.outgoing_sostav_status <= 1) {
            this.elements.button_arrival_car.show();
            //this.elements.button_car_return.show();
        } else {
            this.elements.button_arrival_car.hide();
            //this.elements.button_car_return.hide();
        }
        //this.elements.button_return_car.hide();
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        ////-- Задержание
        //this.elements.button_detention_edit.hide();
        //this.elements.button_detention_save.hide();
        //this.detention_edit = false;
        //this.form.obj_form.validations[1].$elements.each(function () {
        //    //this.prop('disabled', true);
        //    if (this.is('.inp-manual')) {
        //        this.prop('disabled', false);
        //    };
        //});
        ////-- Возврат
        //this.elements.button_return_open.hide();
        //this.elements.button_return_close.hide();
        //this.form.obj_form.validations[2].$elements.each(function () {
        //    //this.prop('disabled', true);
        //    if (this.is('.inp-manual')) {
        //        this.prop('disabled', false);
        //    };
        //});
    };
    //-----------------------------------------------------------------------------
    //-- Функции отображения информации в форме
    //-----------------------------------------------------------------------------
    // Обновить информацию по вагону
    form_incoming_cars_detali.prototype.update_wagon = function (callback) {
        LockScreen(langView('ficcd_mess_load_wagon', App.Langs));
        this.ids_wsd.getViewIncomingCarsOfIDCar(this.id, function (wagon) {
            if (wagon) {
                this.wagon = wagon;
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            } else {
                this.wagon = null;
                this.out_error(langView('ficcd_mess_warning_no_data_wagon_ids', App.Langs).format(this.id));
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            }
        }.bind(this));

    };
    // Показать детали
    form_incoming_cars_detali.prototype.wagon_detali = function (id, options) {
        LockScreen(langView('ficcd_mess_load_wagon', App.Langs));
        this.clear_out_validation();
        this.id = id;
        this.update_wagon(function (wagon) {
            if (wagon !== null) {
                if (this.elements) {
                    if (options.type === 1) {
                        // режим правки
                        //this.view();
                        LockScreen(langView('ficcd_mess_load_db_uz', App.Langs));
                        var process = 3;
                        // Выход из инициализации
                        var out_init = function (process) {
                            if (process === 0) {
                                this.wiew_wagon_detali(this.wagon, options);
                            }
                        }.bind(this);
                        //TODO:!ОТКЛЮЧИЛ ДЛЯ ПРОВЕРКИ
                        //options.info = null;
                        this.uz_dir.getInfoWagonOfNum(this.wagon.num, function (info) {
                            if (info === null) {
                                // Иногда нет ответа, сообщаем!
                                this.out_warning(langView('ficcd_mess_warning_no_data_wagon_uz', App.Langs))
                            }
                            options.info = info;
                            process--;
                            out_init(process);
                        }.bind(this));
                        this.ids_dir.getWagonsOfNum(this.wagon.num, function (dir_wagon) {
                            if (dir_wagon === null) {
                                // Иногда нет данных, сообщаем!
                                this.out_warning(langView('ficcd_mess_warning_no_data_dir_wagon', App.Langs))
                            }
                            options.dir_wagon = dir_wagon;
                            process--;
                            out_init(process);
                        }.bind(this));
                        // Получим ЭПД 
                        this.ids_wsd.getOTPR_UZ_DOCOfNum(this.wagon.arrival_car_num_doc, function (otpr) {
                            if (otpr === null) {
                                // Иногда нет данных, сообщаем!
                                this.out_warning(langView('ficcd_mess_warning_no_epd_wagon', App.Langs))
                            }
                            options.main_otpr = otpr;   // делаем пока как основной
                            options.otpr = null;        // обнуляем досылочный
                            // Проверим если есть ссылка на основной документ, тогда ищем его
                            if (options.otpr && options.otpr.otprdp && options.otprdp.nom_osn_doc) {
                                this.ids_wsd.getOTPR_UZ_DOCOfNum_UZ(this.wagon.arrival_car_num_doc, function (main_otpr) {
                                    if (main_otpr === null) {
                                        // Иногда нет данных, сообщаем!
                                        this.out_warning(langView('ficcd_mess_warning_no_main_epd_wagon', App.Langs))
                                    }
                                    options.otpr = options.main_otpr; // переопределяем основной как досылочный
                                    options.main_otpr = main_otpr;    // и переопределяем основной даже если он не считан будет нуль
                                    process--;
                                    out_init(process);
                                }.bind(this));
                            } else {
                                process--;
                                out_init(process);
                            }


                        }.bind(this));
                    } else {
                        // режим просмотра
                        this.view();
                        this.wiew_wagon_detali(this.wagon, options)
                        LockScreenOff();
                    }
                } else {
                    throw new Error('this.elements - пустой, нет привязки');
                }
            }
        }.bind(this));
    };
    // Показать детали после определения типа (view & edit)
    form_incoming_cars_detali.prototype.wiew_wagon_detali = function (wagon, options) {
        // Определим основные свойства
        this.wagon_settings = $.extend({
            type: 0,                // Тип операции 0-просмотр, 1-правка
            position: 1,            // Предлогаемая позиция в составе (используется в режиме правка)
            info: null,             // Данные по вагону из базы УЗ (используется в режиме правка)
            dir_wagon: null,        // Данные по вагону из справочника ИДС (используется в режиме правка)
            main_otpr: null,        // ЭПД - основного документа
            otpr: null,             // ЭПД - документа
            //id_group: null,         // предыдущая группа груза (используется в режиме правка)
            //id_division: null,      // предыдущее id подразделения погрузки (используется в режиме правка)
            //station_uz_code: null,  // предыдущеий код станции прибытия (используется в режиме правка)
            //wio: null,              // текущая операция  (используется в режиме правка)
            //present_wagons: null,   // Список предявленных вагонов(используется в режиме правка)
        }, options);

        var nom_main_doc = wagon.arrival_uz_document_nom_main_doc;
        var nom_doc = wagon.arrival_uz_document_nom_doc;

        // Настроем отображение если окно в режиме редактирования
        if (this.wagon_settings.type === 1) {
            // Получим данные по основному ЭПД
            if (this.wagon_settings.main_otpr) {
                //this.epd(); // врежиме авто ЭПД
                this.edit(); // врежиме авто ЭПД
                this.main_otpr_vagon = this.get_vagon_epd(this.wagon_settings.main_otpr, wagon.num);
                this.main_otpr_cont = this.get_vagon_cont_epd(this.wagon_settings.main_otpr, wagon.num);
                nom_main_doc = this.wagon_settings.main_otpr.nom_doc;
            }
            // Получим данные по досылочному документу
            if (this.wagon_settings.otpr) {
                this.otpr_vagon = this.get_vagon_epd(this.wagon_settings.otpr, wagon.num);
                this.otpr_cont = this.get_vagon_cont_epd(this.wagon_settings.otpr, wagon.num);
                nom_doc = this.wagon_settings.otpr.nom_doc;
                this.elements.input_text_document_nom_doc.enable();
            } else {
                this.elements.input_text_document_nom_doc.disable();
            }
        }
        // Общая информация
        this.elements.input_number_num_car.val(wagon.num);
        this.elements.input_number_position_arrival.val(this.wagon_settings.type === 1 ? this.wagon_settings.position : wagon.arrival_car_position_arrival);
        this.elements.input_datetime_date_adoption_act.val(wagon.arrival_sostav_date_adoption);
        this.elements.input_text_document_nom_main_doc.val(nom_main_doc);
        this.elements.input_text_document_nom_doc.val(nom_doc);
        // МАРШРУТЫ И КЛИЕНТЫ
        this.wiew_wagon_detali_station_from();

        LockScreenOff();

        //this.current_id_condition = null;       // Текущий id разметки
        //this.arrival_id_wagon_rent = null;      // Текущий id аренды по прибытию
        //this.outgoing_id_wagon_rent = null;     // Текущий id аренды по отправке
        //this.current_id_countrys = null;        // Текущий id администрации
        //this.current_id_genus = null;           // Текущий id род вагона
        //this.current_id_owner = null;           // Текущий id владелец

        //var adm_kod = wagon.outgoing_uz_vagon_wagon_adm;
        //var gruzp_uz = wagon.outgoing_uz_vagon_gruzp_uz;
        //var tara_uz = wagon.outgoing_uz_vagon_tara_uz;
        //var note_uz = wagon.outgoing_uz_vagon_note_uz;
        //var current_condition = wagon['outgoing_uz_vagon_condition_abbr' + App.Lang];
        //var current_rod = wagon['outgoing_uz_vagon_rod_abbr_' + App.Lang];

        //var laden = wagon.outgoing_uz_vagon_laden;
        //var outgoing_uz_vagon_id_cargo = wagon.outgoing_uz_vagon_id_cargo;
        //var outgoing_uz_vagon_id_division = wagon.outgoing_uz_vagon_id_division;
        //var outgoing_uz_vagon_division_code = wagon.outgoing_uz_vagon_division_code;
        //var outgoing_uz_vagon_to_station_uz_code = wagon.outgoing_uz_vagon_to_station_uz_code;
        ////var outgoing_uz_vagon_to_station_uz_name = wagon.outgoing_uz_vagon_to_station_uz_name;

        //var owner_name = wagon['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang];
        //var arr_rent_operator = wagon['outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang];
        //var arr_rent_limiting = wagon['outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang];
        //var out_rent_operator = wagon['outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_' + App.Lang];
        //var out_rent_limiting = wagon['outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_' + App.Lang];

        //// Настроем отображение если окно в режиме редактирования
        //if (this.wagon_settings.type === 1) {
        //    if (this.wagon_settings.dir_wagon) {
        //        gruzp_uz = options.dir_wagon.gruzp;         //
        //        tara_uz = options.dir_wagon.tara;
        //        // Администрация
        //        var wagon_contrys = options.dir_wagon.Directory_Countrys;
        //        this.current_id_countrys = wagon_contrys ? wagon_contrys.id : null;
        //        adm_kod = wagon_contrys ? wagon_contrys.code_sng : adm_kod;
        //        // Род вагона
        //        var wagon_genus = options.dir_wagon.Directory_GenusWagons;
        //        this.current_id_genus = wagon_genus ? wagon_genus.id : null;
        //        current_rod = wagon_genus ? wagon_genus['abbr_' + App.Lang] : current_rod;
        //        // Владелец
        //        var wagon_owners = options.dir_wagon.Directory_OwnersWagons;
        //        owner_name = wagon_owners ? wagon_owners['abbr_' + App.Lang] : owner_name;
        //        this.current_id_owner = wagon_owners ? wagon_owners.id : null;
        //        // Аренды
        //        var wagon_rents = options.dir_wagon.Directory_WagonsRent;
        //        if (wagon_rents) {
        //            var out_wagon_rent = wagon_rents.find(function (o) {
        //                return o.rent_end === null;
        //            });
        //            if (out_wagon_rent) {
        //                this.outgoing_id_wagon_rent = out_wagon_rent.id;                        // Текущий id аренды по отправке
        //                var dir_oper = out_wagon_rent.Directory_OperatorsWagons;
        //                out_rent_operator = dir_oper ? dir_oper['abbr_' + App.Lang] : null;
        //                var dir_ll = out_wagon_rent.Directory_LimitingLoading;
        //                out_rent_limiting = dir_ll ? dir_ll['limiting_abbr_' + App.Lang] : null;
        //            }
        //            var rents = wagon_rents.filter(function (i) {
        //                return i.rent_start <= wagon.arrival_sostav_date_adoption;
        //            });
        //            if (rents && rents.length > 0) {
        //                var arr_wagon_rent = rents.sort(function (a, b) {
        //                    return b.id - a.id;
        //                });
        //                if (arr_wagon_rent && arr_wagon_rent.length > 0) {
        //                    this.arrival_id_wagon_rent = arr_wagon_rent[0].id;      // Текущий id аренды по прибытию
        //                    var dir_oper = arr_wagon_rent[0].Directory_OperatorsWagons;
        //                    arr_rent_operator = dir_oper ? dir_oper['abbr_' + App.Lang] : null;
        //                    var dir_ll = arr_wagon_rent[0].Directory_LimitingLoading;
        //                    arr_rent_limiting = dir_ll ? dir_ll['limiting_abbr_' + App.Lang] : null;
        //                }
        //            }

        //        }
        //        note_uz = options.dir_wagon.note;
        //        //current_condition wagon['arrival_uz_vagon_condition_abbr_' + App.Lang]
        //    };
        //    // Уточним группу груза (если уже были вагоны в левой части)
        //    if (this.wagon_settings && this.wagon_settings.id_cargo) {
        //        outgoing_uz_vagon_id_cargo = this.wagon_settings.id_cargo;
        //    }
        //    // Уточним группу груза (если уже были вагоны в левой части)
        //    if (this.wagon_settings && this.wagon_settings.laden) {
        //        laden = this.wagon_settings.laden;
        //    };
        //    // Уточним подразделение погрузки (если уже были вагоны в левой части)
        //    if (this.wagon_settings && this.wagon_settings.id_division) {
        //        outgoing_uz_vagon_id_division = this.wagon_settings.id_division;
        //    };
        //    // Уточним подразделение погрузки (если уже были вагоны в левой части)
        //    if (this.wagon_settings && this.wagon_settings.division_code) {
        //        outgoing_uz_vagon_division_code = this.wagon_settings.division_code;
        //    };

        //    // Уточним станцию назначения (если уже были вагоны в левой части)
        //    if (this.wagon_settings && this.wagon_settings.station_uz_code) {
        //        outgoing_uz_vagon_to_station_uz_code = this.wagon_settings.station_uz_code;
        //    };
        //    // Определим текущую разметку
        //    if (this.wagon_settings && this.wagon_settings.wio) {
        //        var dir_cond_arr = this.wagon_settings.wio.Directory_ConditionArrival;
        //        this.current_id_condition = dir_cond_arr ? dir_cond_arr.id : null;
        //        current_condition = dir_cond_arr ? dir_cond_arr['condition_abbr_' + App.Lang] : current_condition;
        //    };
        //}
        //// Проверим это правка
        //if (this.wagon_settings.type === 1 && this.wagon_settings.info) {
        //    // Да заполним
        //    gruzp_uz = this.wagon_settings.info.carrying_capacity ? this.wagon_settings.info.carrying_capacity : gruzp_uz;         //
        //    tara_uz = this.wagon_settings.info.tara ? this.wagon_settings.info.tara : tara_uz;
        //    owner_name = this.wagon_settings.info.owner !== null && this.wagon_settings.info.owner !== '' ? this.wagon_settings.info.owner : owner_name;
        //    note_uz = (this.wagon_settings.info.exit_ban !== null ? this.wagon_settings.info.exit_ban + '; ' : '') + (this.wagon_settings.info.other_bans !== null ? this.wagon_settings.info.other_bans.replace(/<br>/g, '') : note_uz);
        //}

        //this.elements.input_number_num_car.val(wagon.num);
        //this.elements.input_number_position_arrival.val(this.wagon_settings.type === 1 ? this.wagon_settings.position : wagon.arrival_car_position_arrival);
        //this.elements.input_text_num_cont_1.val(wagon.outgoing_uz_vagon_cont_1_nom_cont);
        //this.elements.input_text_num_cont_2.val(wagon.outgoing_uz_vagon_cont_2_nom_cont);
        //// сделал из-за того что неактивный компонент нехочет показывать дату
        //if (this.wagon_settings.type !== 1) {
        //    this.elements.input_datetime_date_outgoing_act.enable();
        //    this.elements.input_datetime_date_outgoing_act.val(wagon.outgoing_car_date_outgoing_act); //
        //    this.elements.input_datetime_date_outgoing_act.disable();
        //} else {
        //    this.elements.input_datetime_date_outgoing_act.val(wagon.outgoing_car_date_outgoing_act); //
        //}

        //this.elements.autocomplete_reason_discrepancy_amkr.text(wagon['outgoing_car_reason_discrepancy_amkr_name_' + App.Lang]);
        //this.elements.autocomplete_reason_discrepancy_uz.text(wagon['outgoing_car_reason_discrepancy_uz_name_' + App.Lang]);
        ////
        //this.elements.input_text_adm_kod.val(adm_kod);
        //this.elements.input_text_rod_vag_abbr.val(current_rod);
        //this.elements.input_number_gruzp_uz.val(gruzp_uz);
        //this.elements.input_number_tara_uz.val(tara_uz);
        ////
        //this.elements.input_text_condition_arrival.val(wagon['arrival_uz_vagon_condition_abbr_' + App.Lang]);
        ////this.wagon_settings.type === 1 ? wagon['last_operation_condition_' + App.Lang] : wagon['outgoing_uz_vagon_condition_abbr' + App.Lang]
        //this.elements.input_text_condition_present.val(current_condition);
        //// -------------------------------------------
        //var vagonik = wagon.outgoing_car_vagonnik_user ? wagon.outgoing_car_vagonnik_user : '';
        //var vagonik_data = wagon.outgoing_car_vagonnik ? '(' + (wagon.outgoing_car_vagonnik ? moment(wagon.outgoing_car_vagonnik).format(format_datetime) : '') + ')' : '';
        //var vagonik_note = wagon.outgoing_car_note_vagonnik ? wagon.outgoing_car_note_vagonnik : '';
        //this.elements.textarea_condition_present.val(vagonik || vagonik_data || vagonik_note ? langView('ficcd_value_vagonnik', App.Langs).format(vagonik + vagonik_data, vagonik_note) : '-');
        //// ---------- ЗАДЕРЖАНИЯ ------------------------------------------------------------------------------------
        //this.wiew_detention_wagon_detali(wagon);
        //// ---------- ВОЗВРАТЫ ------------------------------------------------------------------------------------
        //this.wiew_return_wagon_detali(wagon)
        ////this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
        //// Данные о погрузке
        //this.elements.checkbox_loaded_car.val(laden);

        //this.elements.autocomplete_cargo_name.val(outgoing_uz_vagon_id_cargo);

        //this.elements.input_text_loading_devision_code.val(outgoing_uz_vagon_division_code);
        //this.elements.autocomplete_loading_devision.val(outgoing_uz_vagon_id_division);
        //this.elements.input_text_code_station_to.val(outgoing_uz_vagon_to_station_uz_code);
        //this.elements.autocomplete_name_station_to.val(outgoing_uz_vagon_to_station_uz_code);
        //this.elements.input_text_owner_name.val(owner_name);
        //this.elements.input_text_operator_name.val(out_rent_operator);
        //this.elements.input_text_limiting_loading_amkr.val(out_rent_limiting);
        //this.elements.textarea_limiting_loading_uz.val(note_uz);
        //// ЭПД
        //this.elements.input_text_uz_doc_num.val(wagon.outgoing_uz_document_nom_doc);
        //this.elements.input_text_vesg_uz_doc.val(wagon.outgoing_uz_vagon_vesg);
        //this.elements.input_text_ves_tary_uz_doc.val(wagon.outgoing_uz_vagon_tara_uz);
        //this.elements.input_text_brigadier_loading_uz_doc.val('');
        ////
        //this.elements.input_text_kod_etsng.val(wagon.outgoing_uz_vagon_cargo_etsng_code);
        //this.elements.textarea_name_etsng.val(wagon['outgoing_uz_vagon_cargo_etsng_name_' + App.Lang]);
        ////
        //this.elements.input_text_station_code_on.val(wagon.outgoing_uz_document_code_stn_to);
        //this.elements.input_text_station_name_on.val(wagon['outgoing_uz_document_station_to_name_' + App.Lang]);
        //this.elements.input_text_railway_name_on.val(wagon['outgoing_uz_document_to_inlandrailway_name_' + App.Lang]);
        ////
        //this.elements.input_text_client_kod_on.val(wagon.outgoing_uz_document_code_consignee);
        //this.elements.input_text_client_name_on.val(wagon['outgoing_uz_document_consignee_name_' + App.Lang]);
        //// САП
        //this.elements.input_text_sap_outgoing_supply_num.val(wagon.sap_outgoing_supply_num);
        //this.elements.input_text_sap_outgoing_supply_netto.val(wagon.sap_outgoing_supply_netto);
        //this.elements.input_text_sap_outgoing_supply_responsible_fio.val(wagon.sap_outgoing_supply_responsible_fio);
        //this.elements.input_text_sap_outgoing_supply_warehouse_code.val(wagon.sap_outgoing_supply_warehouse_code);
        //this.elements.input_text_sap_outgoing_supply_warehouse_name.val(wagon.sap_outgoing_supply_warehouse_name);
        //this.elements.input_text_sap_outgoing_supply_cargo_code.val(wagon.sap_outgoing_supply_cargo_code);
        //this.elements.input_text_sap_outgoing_supply_cargo_name.val(wagon.sap_outgoing_supply_cargo_name);
        //this.elements.input_text_sap_outgoing_supply_destination_station_code.val(wagon.sap_outgoing_supply_destination_station_code);
        //this.elements.input_text_sap_outgoing_supply_destination_station_name.val(wagon.sap_outgoing_supply_destination_station_name);
        //this.elements.input_text_sap_outgoing_supply_shipper_code.val(wagon.sap_outgoing_supply_shipper_code);
        //this.elements.input_text_sap_outgoing_supply_shipper_name.val(wagon.sap_outgoing_supply_shipper_name);
        //// Прибытие
        //this.elements.input_text_cargo_arrival.val(wagon['arrival_uz_vagon_cargo_name_' + App.Lang]);
        //this.elements.input_text_cargo_sap.val(wagon.sap_incoming_supply_cargo_name);
        //this.elements.input_text_date_arrival.val(wagon.arrival_sostav_date_adoption ? moment(wagon.arrival_sostav_date_adoption).format(format_datetime) : '');
        //this.elements.input_text_owner_name_arrival.val(owner_name);
        //this.elements.input_text_operator_name_arrival.val(arr_rent_operator);
        //this.elements.input_text_limiting_loading_arrival.val(arr_rent_limiting);
    }
    // Показать детали станция отправления
    form_incoming_cars_detali.prototype.wiew_wagon_detali_station_from = function () {
        if (this.wagon && this.wagon_settings) {
            var code_stn_from = this.wagon.arrival_uz_document_code_stn_from;
            var station_from_name = this.wagon['arrival_uz_document_station_from_name_' + App.Lang];
            var from_inlandrailway_name = this.wagon['arrival_uz_document_from_inlandrailway_name_' + App.Lang];

            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Получим данные по основному ЭПД
                if (this.wagon_settings.main_otpr) {
                    //----------------------------------------------------------------------------------------------
                    // Раздел ROUTE станции отправки и прибытия и коды администрации отпр и прибытия
                    if (this.wagon_settings.main_otpr.route && this.wagon_settings.main_otpr.route.length > 0) {
                        // Данные по умолчанию
                        //TODO: Убрать +1 тест
                        code_stn_from = this.wagon_settings.main_otpr.route[0].stn_to;
                        station_from_name = this.wagon_settings.main_otpr.route[0].name_to;

                        this.ids_statin_from = this.get_ids_station_from(code_stn_from, null);
                        this.view_element(this.ids_statin_from,
                            function (value) {
                                code_stn_from = value.code;
                                station_from_name = value.name;
                                from_inlandrailway_name = value.ir_name;
                                this.elements.button_add_station_from.hide();
                                this.form.set_validation_object_ok(null, 'station_from_name', "ok", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_add_station_from_name', App.Langs), true);
                                this.elements.button_add_station_from.show();
                            }.bind(this),
                            function (value) {
                                // нет входных данных данных
                                this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_not_station_from_name', App.Langs), true);
                            }.bind(this)
                        );
                    }
                }
            }
            // МАРШРУТЫ И КЛИЕНТЫ
            this.elements.input_number_code_stn_from.val(code_stn_from);
            if (this.ids_statin_from) {
                this.elements.autocomplete_station_from_name.val(code_stn_from); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_station_from_name.text(station_from_name); // нет в справочнике ИДС
            }
            this.elements.input_text_from_inlandrailway_name.val(from_inlandrailway_name);
        }

    };

    //-----------------------------------------------------------------------------
    //-- Функции обработки информации из ЭПД
    //-----------------------------------------------------------------------------
    // Получить информацию по вагону из документа ЭПД
    form_incoming_cars_detali.prototype.get_vagon_epd = function (otpr, num) {
        if (otpr && otpr.vagon && otpr.vagon.length > 0) {
            for (var i = 0; i < otpr.vagon.length; i++) {
                if (Number(otpr.vagon[i].nomer) === num)
                    return otpr.vagon[i];
            }
        }
        return null;
    };
    // Получить информацию по контейнеру из документа ЭПД
    form_incoming_cars_detali.prototype.get_vagon_cont_epd = function (otpr, num) {
        if (otpr && otpr.cont && otpr.cont.length > 0) {
            var conts = otpr.cont.filter(function (i) {
                if (Number(i.nom_vag) === cars_detali.select_num) return true; else return false;
            });
            return conts ? conts : null;
        }
        return null;
    };
    //-----------------------------------------------------------------------------------
    //-- Функции работы со справочниками БД ИДС
    //-----------------------------------------------------------------------------
    // Получить информацию по станции прибытия из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_station_from = function (code, name) {
        var ext_station = null;
        var result = {};
        if (code) {
            var obj = this.ids_dir.getExternalStation_Of_ID(code);
            ext_station = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getExternalStation_Of_CultureName('station_name', name);
                ext_station = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (ext_station) {
            result.code = ext_station.code;
            result.name = ext_station['station_name_' + App.Lang];
            result.ir_name = null;
            if (ext_station.Directory_InlandRailway) {
                result.ir_name = ext_station.Directory_InlandRailway['inlandrailway_name_' + App.Lang];
            }
            return result;
        } else return null; // Объект не найден
    };
    // Добавить внешнюю станцию в справочник
    form_incoming_cars_detali.prototype.add_ids_station_from = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationExternalStation(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    //-----------------------------------------------------------------------------
    //-- Функции обработки часто повторяющихся задач
    //-----------------------------------------------------------------------------
    // Проверить и отработать информацию
    form_incoming_cars_detali.prototype.view_element = function (value, fn_ok, fn_null, fn_undefined) {
        if (value) {
            if (typeof fn_ok === 'function') {
                fn_ok(value);
            }
        } else {
            if (value === null) {
                if (typeof fn_null === 'function') {
                    fn_null(value);
                }
            } else {
                if (typeof fn_undefined === 'function') {
                    fn_undefined(value);
                }
            }
        }
    };
    //-----------------------------------------------------------------------------
    //-- Функции валидации
    //-----------------------------------------------------------------------------
    // Очистить сообщения валидации
    form_incoming_cars_detali.prototype.clear_out_validation = function () {
        this.out_clear();
        this.form.validation_common.clear_all();
        //this.form.validation_detention.clear_all();
        //this.form.validation_return.clear_all();
    };
    // Валидация формы задержания
    form_incoming_cars_detali.prototype.validation_wagon_detention = function () {
        this.form.validation_detention.clear_all();
        var valid = true;
        valid = valid & this.form.validation_detention.check_control_autocomplete(this.elements.autocomplete_cause_detention, langView('ficcd_mess_valid_cause_detention', App.Langs), '', langView('ficcd_mess_valid_not_cause_detention', App.Langs), true);
        // Проверка на время начало и конца
        var valid_start = this.form.validation_detention.check_control_datetime_input(this.elements.input_datetime_detention_start, langView('ficcd_mess_valid_not_detention_start', App.Langs), '', true);
        var valid_stop = this.form.validation_detention.check_control_datetime_input(this.elements.input_datetime_detention_stop, langView('ficcd_mess_valid_not_detention_stop', App.Langs), '', true);
        // Проверим временные интервалы 120<start<120
        if (valid_start && valid_stop) {
            var current = moment();
            var detention_start = moment(this.elements.input_datetime_detention_start.val());
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_start = current.diff(detention_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_start >= max_err_detention_start || minute_start <= min_err_detention_start) {
                valid = valid & this.form.validation_detention.set_object_error(this.elements.input_datetime_detention_start.$element, langView('ficcd_mess_valid_not_deff_date_detention', App.Langs).format(min_err_detention_start, max_err_detention_start));
            }
            var detention_stop = moment(this.elements.input_datetime_detention_stop.val());
            // Проверим на разницу между началом и концом задержания
            var minute = detention_stop.diff(detention_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute <= 0 || minute > max_err_detention_deff) {
                valid = valid & this.form.validation_detention.set_object_error(this.elements.input_datetime_detention_stop.$element, langView('ficcd_mess_valid_not_deff_date_detention_start_stop', App.Langs).format(max_err_detention_deff));
            }
        } else {
            valid = false;
        }
        return valid;
    };
    // Валидация формы возврат
    form_incoming_cars_detali.prototype.validation_wagon_return = function (attr_close) {
        this.form.validation_return.clear_all();
        var valid = true;
        valid = valid & this.form.validation_return.check_control_autocomplete(this.elements.autocomplete_cause_return, langView('ficcd_mess_valid_cause_return', App.Langs), '', langView('ficcd_mess_valid_not_cause_return', App.Langs), true);
        // Проверка на время начало и конца
        var valid_start = this.form.validation_return.check_control_datetime_input(this.elements.input_datetime_return_start, langView('ficcd_mess_valid_not_return_start', App.Langs), '', true);
        var current = moment();
        var return_start = moment(this.elements.input_datetime_return_start.val());
        valid = valid & valid_start;
        if (valid_start && !attr_close) {
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_start = current.diff(return_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_start >= max_err_return_start || minute_start <= min_err_return_start) {
                valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_start.$element, langView('ficcd_mess_valid_not_deff_date_return', App.Langs).format(min_err_return_start, max_err_return_start));
            }
        }
        if (attr_close) {
            var valid_stop = this.form.validation_return.check_control_datetime_input(this.elements.input_datetime_return_stop, langView('ficcd_mess_valid_not_return_stop', App.Langs), '', true);
            valid = valid & valid_stop;
            if (valid_stop) {
                var return_stop = moment(this.elements.input_datetime_return_stop.val());
                var minute_stop = current.diff(return_stop, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_stop >= max_err_return_stop || minute_stop <= min_err_return_stop) {
                    valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_stop.$element, langView('ficcd_mess_valid_not_deff_date_stop_return', App.Langs).format(min_err_return_stop, max_err_return_stop));
                }
                // Проверим на разницу между началом и концом задержания
                var minute_deff = return_stop.diff(return_start, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_deff <= 0) {
                    valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_stop.$element, langView('ficcd_mess_valid_not_deff_date_return_start_stop', App.Langs));
                }
            }
        }
        valid = valid & this.form.validation_return.set_object_ok(this.elements.input_text_return_num_act.$element, '');
        valid = valid & this.form.validation_return.check_control_datetime_input_null(this.elements.input_datetime_return_date_act, langView('ficcd_mess_valid_error_date_act', App.Langs), '', true);
        valid = valid & this.form.validation_return.set_object_ok(this.elements.textarea_return_note.$element, '');
        return valid;
    };
    // Валидация формы вагон детально
    form_incoming_cars_detali.prototype.validation_wagon_detali = function () {
        this.clear_out_validation(); // очистить все сообщения
        var valid = true;
        // Проверка номера
        var num = this.elements.input_number_num_car.val();
        if (this.wagon_settings.present_wagons && this.wagon_settings.present_wagons.length > 0) {
            var wagon = this.wagon_settings.present_wagons.find(function (o) {
                return o.num === num;
            });
            if (wagon) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_num_car.$element, langView('ficcd_mess_valid_error_num', App.Langs).format(wagon.num, wagon.position));
            } else {
                valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_num_car.$element, '');
            }
        }
        // Проверка позиции
        var position = this.elements.input_number_position_outgoing.val();
        if (this.wagon_settings.position === 1) {
            if (position > this.wagon_settings.position) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_position_outgoing.$element, langView('ficcd_mess_valid_error_position1', App.Langs));
            } else {
                valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_position_outgoing.$element, '');
            }
        } else {
            // Проверим позицию
            if (this.wagon_settings.present_wagons && this.wagon_settings.present_wagons.length > 0) {
                var wagon = this.wagon_settings.present_wagons.find(function (o) {
                    return o.position === position;
                });
                if (wagon) {
                    valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_position_outgoing.$element, langView('ficcd_mess_valid_error_position2', App.Langs).format(wagon.position, wagon.num));
                } else {
                    valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_position_outgoing.$element, '');
                }
            } else {
                // нет списка предъявленных вагонов
            }
        }
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_cargo_name, langView('ficcd_mess_valid_cargo_name', App.Langs), '', langView('ficcd_mess_valid_not_cargo_name', App.Langs), true);
        valid = valid & this.form.validation_common.check_control_datetime_input_null(this.elements.input_datetime_date_outgoing_act, langView('ficcd_mess_valid_date_outgoing_act', App.Langs), '', true);
        valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_reason_discrepancy_uz, langView('ficcd_mess_valid_reason_discrepancy', App.Langs), '', true);
        valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_reason_discrepancy_amkr, langView('ficcd_mess_valid_reason_discrepancy', App.Langs), '', true);
        var date_outgoing_act = this.elements.input_datetime_date_outgoing_act.val();
        if (date_outgoing_act) {
            valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_reason_discrepancy_amkr, langView('ficcd_mess_valid_reason_discrepancy', App.Langs), '', langView('ficcd_mess_valid_not_reason_discrepancy', App.Langs), true);
        } else {
            if (this.elements.autocomplete_reason_discrepancy_amkr.val() > 0 || this.elements.autocomplete_reason_discrepancy_uz.val() > 0) {
                valid = valid & this.form.validation_common.check_control_datetime_input(this.elements.input_datetime_date_outgoing_act, langView('ficcd_mess_valid_not_date_outgoing_act', App.Langs), '', true);
            }
        }
        // Проверим отметку вагонником
        if (this.wagon && this.wagon.outgoing_car_vagonnik === null) {
            this.form.validation_common.set_object_error(this.elements.textarea_condition_present.$element, langView('ficcd_mess_valid_null_condition_present', App.Langs));
        }
        // Задержание
        if (this.detention_edit && (this.elements.autocomplete_cause_detention.text() !== '' || this.elements.input_datetime_detention_start.val() !== null || this.elements.input_datetime_detention_stop.val() !== null)) {
            valid = valid & this.validation_wagon_detention();
            // Проверка валидация прошла но кнопка не нажата
            if (this.detention_edit && valid) {
                this.form.validation_detention.out_error_message(langView('ficcd_mess_valid_no_save_detention', App.Langs))
                valid = false;
            };
        }

        // Задержания
        if (this.current_return_wagons && this.current_return_wagons.date_stop === null) {
            valid = valid & this.validation_wagon_return(true);
        }

        if (this.elements.checkbox_loaded_car.val() === true) {
            valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_loading_devision, langView('ficcd_mess_valid_loading_devision', App.Langs), '', langView('ficcd_mess_valid_not_loading_devision', App.Langs), true);
        }
        return valid;
    };
    //-----------------------------------------------------------------------------
    //-- Функции обработки ОПЕРАЦИЙ
    //-----------------------------------------------------------------------------
    // Выполнить операцию добавить станцию
    form_incoming_cars_detali.prototype.action_add_station_from = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_ext_station_ids', App.Langs).format(this.elements.autocomplete_station_from_name.text(), this.elements.input_number_code_stn_from.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_station_from(this.elements.input_number_code_stn_from.val(), this.elements.autocomplete_station_from_name.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
                        // Обновим справочник
                        this.load_db(['external_station'], true, function (result) {
                            // Обновим список и эемент выбора
                            this.list_external_station = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
                            this.elements.autocomplete_station_from_name.update(this.list_external_station, null);
                            // отобразим информацию
                            this.wiew_wagon_detali_station_from();
                            LockScreenOff();
                        }.bind(this));

                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию сохранить задержание
    form_incoming_cars_detali.prototype.action_save_detention = function () {
        this.elements.button_detention_save.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_detention();
        if (valid) {
            this.form.validation_detention.clear_all();
            this.modal_confirm_form.view(langView('ficcd_form_detention', App.Langs), langView('ficcd_form_detention_message', App.Langs), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('ficcd_mess_update_operation_detention', App.Langs));
                    // Подготовим операцию
                    var operation_detentions = {
                        id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                        id_detention_return: this.elements.autocomplete_cause_detention.val(),
                        date_start: this.elements.input_datetime_detention_start.val(),
                        date_stop: this.elements.input_datetime_detention_stop.val(),
                        user: App.User_Name,
                    };
                    // Обновим
                    this.ids_wsd.postUpdateOutgoingDetention(operation_detentions, function (result_operation) {
                        if (result_operation > 0) {
                            this.form.validation_detention.out_info_message(langView('ficcd_mess_ok_operation_detention', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.form.validation_detention.out_error_message(langView('ficcd_mess_error_operation_detention', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные
                        this.update_wagon(function (wagon) {
                            this.wiew_detention_wagon_detali(wagon);
                            this.detention_edit = false;
                            this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this));
                    this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                } else {
                    this.form.validation_detention.out_warning_message(langView('ficcd_mess_cancel_operation_detention', App.Langs))
                    this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_detention_save.prop("disabled", false); // сделаем активной
        }
        this.elements.button_detention_save.prop("disabled", false); // сделаем активной
    };
    // Выполнить операцию правка задержаня
    form_incoming_cars_detali.prototype.action_edit_detention = function () {
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.show();
        this.detention_edit = true;
        // раскроем элементы
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', false);
        });
    };
    // Открыть возврат
    form_incoming_cars_detali.prototype.action_return_open = function () {
        this.elements.button_return_open.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_return(false);
        if (valid) {
            this.form.validation_return.clear_all();
            this.modal_confirm_form.view(langView('ficcd_form_return_open', App.Langs), langView('ficcd_form_return_open_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('ficcd_mess_update_operation_return_open', App.Langs));
                    // Подготовим операцию
                    var operation_return = {
                        id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                        id_detention_return: this.elements.autocomplete_cause_return.val(),
                        date_start: this.elements.input_datetime_return_start.val(),
                        num_act: this.elements.input_text_return_num_act.val(),
                        date_act: this.elements.input_datetime_return_date_act.val(),
                        note: this.elements.textarea_return_note.val(),
                        user: App.User_Name,
                    };
                    // Откроем
                    this.ids_wsd.postOpenOutgoingReturn(operation_return, function (result_operation) {
                        if (result_operation > 0) {
                            this.form.validation_return.out_info_message(langView('ficcd_mess_ok_operation_return_open', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.form.validation_return.out_error_message(langView('ficcd_mess_error_operation_return_open', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные полностью
                        if (typeof this.settings.fn_update === 'function') {
                            this.settings.fn_update();
                        };
                        this.elements.button_return_open.prop("disabled", false); // сделаем активной
                        LockScreenOff();
                    }.bind(this));
                    //this.elements.button_return_open.prop("disabled", false); // сделаем активной
                } else {
                    this.form.validation_return.out_warning_message(langView('ficcd_mess_cancel_operation_return_open', App.Langs))
                    this.elements.button_return_open.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_return_open.prop("disabled", false); // сделаем активной
        }
    };
    // закрыть возврат
    form_incoming_cars_detali.prototype.action_return_close = function () {
        this.elements.button_return_close.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_return(true);
        if (valid) {
            this.form.validation_return.clear_all();
            this.modal_confirm_form.view(langView('ficcd_form_return_close', App.Langs), langView('ficcd_form_return_close_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('ficcd_mess_update_operation_return_close', App.Langs));
                    if (this.current_id_return_wagons !== null) {
                        // Подготовим операцию
                        var operation_return = {
                            id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                            id_outgoin_return: this.current_id_return_wagons,
                            date_stop: this.elements.input_datetime_return_stop.val(),
                            num_act: this.elements.input_text_return_num_act.val(),
                            date_act: this.elements.input_datetime_return_date_act.val(),
                            note: this.elements.textarea_return_note.val(),
                            user: App.User_Name,
                        };
                        // Закроем
                        this.ids_wsd.postCloseOutgoingReturn(operation_return, function (result_operation) {
                            if (result_operation > 0) {
                                this.form.validation_return.out_info_message(langView('ficcd_mess_ok_operation_return_close', App.Langs));
                            } else {
                                // Ошибка выполнения
                                this.form.validation_return.out_error_message(langView('ficcd_mess_error_operation_return_close', App.Langs) + result_operation);
                                LockScreenOff();
                            }
                            // Обновим данные
                            this.update_wagon(function (wagon) {
                                this.wiew_return_wagon_detali(wagon);
                                this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                                LockScreenOff();
                            }.bind(this));
                            this.elements.button_return_close.prop("disabled", false); // сделаем активной
                            //LockScreenOff();
                        }.bind(this));
                        this.elements.button_return_close.prop("disabled", false); // сделаем активной

                    } else {
                        // Не определен id строки возврата
                        this.form.validation_return.out_warning_message(langView('ficcd_mess_error_operation_return_close_not_id', App.Langs))
                        this.elements.button_return_close.prop("disabled", false); // сделаем активной
                        LockScreenOff();
                    };

                } else {
                    // Отмена операции
                    this.form.validation_return.out_warning_message(langView('ficcd_mess_cancel_operation_return_close', App.Langs))
                    this.elements.button_return_close.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_return_close.prop("disabled", false); // сделаем активной
        }
    };
    // Предявить вагон (перенести в левую сторону)
    form_incoming_cars_detali.prototype.action_present_wagon = function () {
        this.elements.button_arrival_car.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_detali();
        if (valid) {
            this.modal_confirm_form.view(langView('ficcd_form_present', App.Langs), langView('ficcd_form_present_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('ficcd_mess_run_operation_present', App.Langs));
                    // Подготовим операцию
                    var operation_present = {
                        id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                        position: this.elements.input_number_position_outgoing.val(),
                        date_outgoing_act: this.elements.input_datetime_date_outgoing_act.val(),
                        id_reason_discrepancy_amkr: this.elements.autocomplete_reason_discrepancy_amkr.val(),
                        id_reason_discrepancy_uz: this.elements.autocomplete_reason_discrepancy_uz.val(),
                        id_condition: this.current_id_condition, // разметка по отправке
                        id_wagons_rent_arrival: this.arrival_id_wagon_rent,
                        id_wagons_rent_outgoing: this.outgoing_id_wagon_rent,
                        id_countrys: this.current_id_countrys,
                        id_genus: this.current_id_genus,
                        id_owner: this.current_id_owner,
                        gruzp_uz: this.elements.input_number_gruzp_uz.val(),
                        tara_uz: this.elements.input_number_tara_uz.val(),
                        note_uz: this.elements.textarea_limiting_loading_uz.val(),
                        id_warehouse: null,
                        id_division: this.elements.autocomplete_loading_devision.val(),
                        laden: this.elements.checkbox_loaded_car.val(),
                        id_cargo: this.elements.autocomplete_cargo_name.val(),
                        nom_cont1: this.elements.input_text_num_cont_1.val(),
                        nom_cont2: this.elements.input_text_num_cont_2.val(),
                        //id_outgoing_detention_return: cars_detali.current_cars_return ? cars_detali.current_cars_return.id : null,
                        code_stn_to: this.elements.autocomplete_name_station_to.val(),
                        user: App.User_Name,
                    };
                    // Выполним предъявить
                    this.ids_wsd.postOutgoingPresentWagon(operation_present, function (result_operation) {
                        if (result_operation > 0) {
                            this.clear_out_validation(); // очистить все сообщения
                            this.form.validation_common.out_info_message(langView('ficcd_mess_ok_operation_present', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.clear_out_validation(); // очистить все сообщения
                            this.form.validation_common.out_error_message(langView('ficcd_mess_error_operation_present', App.Langs) + result_operation);
                            LockScreenOff();
                        };
                        // Обновим данные полностью
                        if (typeof this.settings.fn_update === 'function') {
                            this.settings.fn_update();
                        };
                        this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
                        //LockScreenOff();
                    }.bind(this));
                } else {
                    // Отмена операции
                    this.form.validation_common.out_warning_message(langView('ficcd_mess_cancel_operation_present', App.Langs))
                    this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
        }

    };
    // Отменить пръедявление (вернуть в правую сторону)
    form_incoming_cars_detali.prototype.action_return_wagon = function () {
        this.elements.button_return_car.prop("disabled", true); // сделаем не активной
        this.modal_confirm_form.view(langView('ficcd_form_return_present', App.Langs), langView('ficcd_form_return_present_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
            if (res) {
                // Выполнить операцию
                LockScreen(langView('ficcd_mess_run_operation_return_present', App.Langs));
                // Подготовим операцию
                var operation_return = {
                    id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                    user: App.User_Name,
                };
                // Выполним предъявить
                this.ids_wsd.postOutgoingReturnPresentWagon(operation_return, function (result_operation) {
                    if (result_operation > 0) {
                        this.form.validation_common.out_info_message(langView('ficcd_mess_ok_operation_return_present', App.Langs));
                    } else {
                        // Ошибка выполнения
                        this.form.validation_common.out_error_message(langView('ficcd_mess_error_operation_return_present', App.Langs) + result_operation);
                        LockScreenOff();
                    }
                    // Обновим данные полностью
                    if (typeof this.settings.fn_update === 'function') {
                        this.settings.fn_update();
                    };
                    this.elements.button_return_car.prop("disabled", false); // сделаем активной
                    //LockScreenOff();
                }.bind(this));
            } else {
                // Отмена операции
                this.clear_out_validation(); // очистить все сообщения
                this.form.validation_common.out_warning_message(langView('ficcd_mess_cancel_operation_return_present', App.Langs))
                this.elements.button_return_car.prop("disabled", false); // сделаем активной
            }
        }.bind(this));
    };
    // Убрать вагон с состава для предявления 
    form_incoming_cars_detali.prototype.action_remove_wagon = function () {
        this.elements.button_car_return.prop("disabled", true); // сделаем не активной
        this.modal_confirm_form.view(langView('ficcd_form_remove_wagon', App.Langs), langView('ficcd_form_remove_wagon_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
            if (res) {
                // Выполнить операцию
                LockScreen(langView('ficcd_mess_run_operation_remove_wagon', App.Langs));
                // Подготовим операцию
                var operation_return = {
                    id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                    user: App.User_Name,
                };
                // Выполним убрать вагон
                this.ids_wsd.postPostOperationReturnProvideWagon(operation_return, function (result_operation) {
                    if (result_operation > 0) {
                        this.form.validation_common.out_info_message(langView('ficcd_mess_ok_operation_remove_wagon', App.Langs));
                    } else {
                        // Ошибка выполнения
                        this.form.validation_common.out_error_message(langView('ficcd_mess_error_operation_remove_wagon', App.Langs) + result_operation);
                        LockScreenOff();
                    }
                    // Обновим данные полностью
                    if (typeof this.settings.fn_update === 'function') {
                        this.settings.fn_update();
                    };
                    this.elements.button_car_return.prop("disabled", false); // сделаем активной
                    //LockScreenOff();
                }.bind(this));
            } else {
                // Отмена операции
                this.clear_out_validation(); // очистить все сообщения
                this.form.validation_common.out_warning_message(langView('ficcd_mess_cancel_operation_return_present', App.Langs))
                this.elements.button_car_return.prop("disabled", false); // сделаем активной
            }
        }.bind(this));
    };
    //-----------------------------------------------------------------------------
    //-- Функции отображения информации на форме
    //-----------------------------------------------------------------------------
    // Очистить сообщения об ошибках
    form_incoming_cars_detali.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    };
    // Показать сообщение ошибки
    form_incoming_cars_detali.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать сообщение предупреждения
    form_incoming_cars_detali.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    form_incoming_cars_detali.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //-----------------------------------------------------------------------------
    //-- Функции для уничтожения объектов
    //-----------------------------------------------------------------------------
    // Удалить объект
    form_incoming_cars_detali.destroy = function () {
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        if (this.table_outgoing_detention_return) {
            this.table_outgoing_detention_return.destroy();
            this.table_outgoing_detention_return = null;
        }
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        this.$form_incoming_cars.empty();
        LockScreenOff();
    };
    //-----------------------------------------------------------------------------
    App.form_incoming_cars_detali = form_incoming_cars_detali;

    window.App = App;

})(window);