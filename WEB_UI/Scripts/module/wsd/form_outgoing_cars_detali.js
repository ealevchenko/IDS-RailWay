/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />

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

            'fogcd_label_num': '№ Вагона:',
            'fogcd_title_num': 'Номер вагона',
            'fogcd_label_position_outgoing': '№ в поезде:',
            'fogcd_title_position_outgoing': 'Автоматический ввод\корректировка (номер вагона в составе)',
            'fogcd_label_num_cont_1': '№ контейнера-1:',
            'fogcd_title_num_cont_1': 'Номер контейнера',
            'fogcd_label_num_cont_2': '№ контейнера-2:',
            'fogcd_title_num_cont_2': 'Номер контейнера',
            'fogcd_label_date_outgoing_act': 'Дата сдачи по акту:',
            'fogcd_title_date_outgoing_act': 'Ручной ввод (если вагон сдается по акту)',
            'fogcd_label_reason_discrepancy_amkr': 'Причина расхождения сдачи (АМКР):',
            'fogcd_title_reason_discrepancy_amkr': 'Причина расхождения сдачи',
            'fogcd_label_reason_discrepancy_uz': 'Причина расхождения сдачи (УЗ):',
            'fogcd_title_reason_discrepancy_uz': 'Причина расхождения сдачи',
            'fogcd_label_adm_kod': 'Адм.(код):',
            'fogcd_title_adm_kod': 'Код администрации',
            'fogcd_label_rod_vag_abbr': 'Род(абр):',
            'fogcd_title_rod_vag_abbr': 'Справочник "Карточка вагона" -> Название "Рода вагона(абр.)"',
            'fogcd_label_gruzp_uz': 'Грузоп. (УЗ),т:',
            'fogcd_title_gruzp_uz': '',
            'fogcd_label_tara_uz': 'Тара (УЗ),т:',
            'fogcd_title_tara_uz': '',
            'fogcd_label_condition_arrival': 'Разметка (прибытие):',
            'fogcd_title_condition_arrival': '',
            'fogcd_label_condition_provide': 'Разметка (текущая):',
            'fogcd_title_condition_provide': '',
            'fogcd_label_condition_present': 'Разметка по отправлению:',
            'fogcd_title_condition_present': '',
            'fogcd_label_cause_detention': 'Причина задержания:',
            'fogcd_title_cause_detention': '',
            'fogcd_label_detention_start': 'Начало задержания:',
            'fogcd_title_detention_start': '',
            'fogcd_label_detention_stop': 'Окончание задержания:',
            'fogcd_title_detention_stop': '',
            'fogcd_label_cause_return': 'Причина возврата:',
            'fogcd_title_cause_return': '',
            'fogcd_label_return_start': 'Начало возврата:',
            'fogcd_title_return_start': '',
            'fogcd_label_return_stop': 'Окончание возврата:',
            'fogcd_title_return_stop': '',
            'fogcd_label_return_num_act': 'Номер акта возврата:',
            'fogcd_title_return_num_act': '',
            'fogcd_label_return_date_act': 'Дата акта возврата:',
            'fogcd_title_return_date_act': '',
            'fogcd_label_return_note': 'Примечание возврат:',
            'fogcd_title_return_note': '',
            'fogcd_label_loaded_car': 'Груж/порожний',
            'fogcd_title_cargo_name': '',
            'fogcd_label_cargo_name': 'Наименование груза:',
            'fogcd_title_loading_devision_code': '',
            'fogcd_label_loading_devision_code': 'Шифр:',
            'fogcd_title_loading_devision': '',
            'fogcd_label_loading_devision': 'Цех погрузки:',
            'fogcd_title_code_station_to': '',
            'fogcd_label_code_station_to': 'Код:',
            'fogcd_title_name_station_to': '',
            'fogcd_label_name_station_to': 'Станция назначения:',
            'fogcd_title_owner_name': '',
            'fogcd_label_owner_name': 'Собственник:',
            'fogcd_title_operator_name': '',
            'fogcd_label_operator_name': 'Оператор (АМКР):',
            'fogcd_title_limiting_loading_amkr': '',
            'fogcd_label_limiting_loading_amkr': 'Ограничение (АМКР):',
            'fogcd_title_limiting_loading_uz': '',
            'fogcd_label_limiting_loading_uz': 'Ограничение (УЗ):',
            'fogcd_title_uz_doc_num': '',
            'fogcd_label_uz_doc_num': '№ Накладной:',
            'fogcd_title_vesg_uz_doc': '',
            'fogcd_label_vesg_uz_doc': 'Вес груза:',
            'fogcd_title_ves_tary_uz_doc': '',
            'fogcd_label_ves_tary_uz_doc': 'Вес тары:',
            'fogcd_title_brigadier_loading_uz_doc': '',
            'fogcd_label_brigadier_loading_uz_doc': 'Бригадир погрузки:',
            'fogcd_title_kod_etsng': 'ЭПД [OTPR/VAGON/COLLECT_V/kod_etsng] -> Код груза по ЕТ СНГ',
            'fogcd_label_kod_etsng': 'Код ЕТСНГ:',
            'fogcd_title_name_etsng': 'ЭПД [OTPR/VAGON/COLLECT_V/name_etsng] -> Справочник "Грузов ЕТ СНГ" -> Справочник "Грузов ИДС" -> Название груза по ЕТ СНГ',
            'fogcd_label_name_etsng': 'Название груза по ЕТСНГ',
            'fogcd_title_station_code_on': '',
            'fogcd_label_station_code_on': 'Код:',
            'fogcd_title_station_name_on': '',
            'fogcd_label_station_name_on': 'Станция назначения:',
            'fogcd_title_railway_name_on': '',
            'fogcd_label_railway_name_on': 'Дорога:',
            'fogcd_title_client_kod_on': '',
            'fogcd_label_client_kod_on': 'Код:',
            'fogcd_title_client_name_on': '',
            'fogcd_label_client_name_on': 'Грузополучатель:',
            'fogcd_title_cargo_arrival': '',
            'fogcd_label_cargo_arrival': 'Груз:',
            'fogcd_title_cargo_sap': '',
            'fogcd_label_cargo_sap': 'Название материала SAP:',
            'fogcd_title_date_arrival': '',
            'fogcd_label_date_arrival': 'Время приема:',
            'fogcd_title_owner_name_arrival': '',
            'fogcd_label_owner_name_arrival': 'Собственник:',
            'fogcd_title_operator_name_arrival': '',
            'fogcd_label_operator_name_arrival': 'Оператор (АМКР):',
            'fogcd_title_limiting_loading_arrival': '',
            'fogcd_label_limiting_loading_arrival': 'Ограничение (АМКР):',

            //'fogcd_title_': '',
            //'fogcd_label_': '',
            'fogcd_title_button_save': 'Сохранить',
            'fogcd_title_button_edit': 'Править',
            'fogcd_title_button_return_open': 'Выполнить возврат',
            'fogcd_title_button_return_close': 'Закрыть возврат',

            'fogcd_title_fieldset_detention_return': 'ЗАДЕРЖАНИЕ/ВОЗВРАТ',
            'fogcd_title_fieldset_detention': 'ЗАДЕРЖАНИЕ',
            'fogcd_title_fieldset_return': 'ВОЗВРАТ',
            'fogcd_title_fieldset_loading_data': 'ДАННЫЕ О ПОГРУЗКЕ',
            'fogcd_title_fieldset_epd': 'ЭПД(ПОСЛЕ ПРИНЯТИЯ УЗ)',
            'fogcd_title_fieldset_sap': 'SAP (ИСХОДЯЩАЯ ПОСТАВКА)',
            'fogcd_title_fieldset_data_arrival': 'ДАННЫЕ О ПРИБЫТИИ',

            'fogcd_mess_valid_reason_discrepancy': 'Указанной причины расхождения нет в справочнике ИДС.',
            'fogcd_mess_valid_cause_detention': 'Указанной причины задержания нет в справочнике ИДС.',
            'fogcd_mess_valid_cause_return': 'Указанной причины возврата нет в справочнике ИДС.',
            'fogcd_mess_valid_cargo': 'Указанного груза нет в справочнике ИДС.',
            'fogcd_mess_valid_loading_devision': 'Указанного подразделения нет в справочнике ИДС.',
            'fogcd_mess_valid_name_station_to': 'Указанной станции нет в справочнике ИДС.',

            'fogcd_mess_init_panel': 'Инициализация модуля...',


            //'fhoogs_title_form_add': 'Сдать состав',
            //'fhoogs_title_form_edit': 'Править сданный состав',
            ///*            'fhoogs_title_form_del': 'Удалить',*/

            //'fhoogs_mess_operation_run': 'Выполняю операцию...',
            //'fhoogs_error_date_end_inspection_acceptance_delivery': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            //'fhoogs_error_date_end_inspection_loader': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            //'fhoogs_error_date_end_inspection_vagonnik': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            //'fhoogs_error_date_readiness_uz': 'Время готовности к сдаче на УЗ должно быть больше времени осмотров',
            //'fhoogs_error_date_outgoing': 'Время сдачи на УЗ должно быть больше времени готовности сдачи на УЗ',
            //'fhoogs_error_date_outgoing_act': 'Время сдаче на УЗ по акту должно быть больше времени сдачи на УЗ',
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

    // Создадим форму правки операторов
    var FDL = App.form_dialog;

    function form_outgoing_cars_detali(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$form_outgoing_cars = $(selector);
        if (this.$form_outgoing_cars.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$form_outgoing_cars.attr('id');
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_outgoing_cars_detali.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_outgoing_cars_detali.prototype.init = function (options) {
        this.init = true;
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            ids_dir: null,
            fn_init: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();

        this.list_station = [];
        this.elements = {};
        // Создать модальную форму "Окно сообщений"
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        var validation = App.validation_form;
        // Валидация перечень элементов
        this.all_elements = null;

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['reason_discrepancy', 'detention_return', 'cargo', 'divisions', 'external_station'], false, function (result) {
            // Подгрузили списки
            this.list_reason_discrepancy = this.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', App.Lang, null);
            this.list_detention_return = this.ids_dir.getListDetention_Return('id', 'cause', App.Lang, null);
            this.list_cargo = this.ids_dir.getListCargo('id', 'cargo_name', App.Lang, null);
            this.list_divisions = this.ids_dir.getListDivisions('code', 'division_abbr', App.Lang, null);
            this.list_external_station = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
            //-------------------------------------
            // Сообщение
            LockScreen(langView('fogcd_mess_init_panel', App.Langs));
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
            var bt_present_car = {
                obj: 'bs_button',
                options: {
                    color: 'primary',
                    size: null,
                    class: null,
                    id: 'present_car',
                    label: 'Предъявить вагон',
                    title: '',
                    icon_left: 'fa fa-arrow-circle-left',
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                    },
                }
            };
            var bt_return_car = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: null,
                    class: 'float-right',
                    id: 'return_car',
                    label: 'Вернуть вагон',
                    title: '',
                    icon_left: null,
                    icon_right: 'fa fa-arrow-circle-right',
                    click: function (event) {
                        event.preventDefault();
                    },
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
            var bt_car_return = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'car_return',
                    label: null,
                    title: '',
                    icon_left: null,
                    icon_right: 'fa fa-retweet',
                    click: function (event) {
                        event.preventDefault();
                    },
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
                    label: langView('fogcd_label_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_num', App.Langs),
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
                    input_group_append_objs: [bt_car_return],
                },
                childs: []
            };
            var form_input_position_outgoing = {
                obj: 'bs_input_number',
                options: {
                    id: 'position_outgoing',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_position_outgoing', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_position_outgoing', App.Langs),
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
            var form_input_num_cont_1 = {
                obj: 'bs_input_text',
                options: {
                    id: 'num_cont_1',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_num_cont_1', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_num_cont_1', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_num_cont_2 = {
                obj: 'bs_input_text',
                options: {
                    id: 'num_cont_2',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_num_cont_2', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_num_cont_2', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
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
            var form_input_date_outgoing_act = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_outgoing_act',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_date_outgoing_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_date_outgoing_act', App.Langs),
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
            var form_input_reason_discrepancy_amkr = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'reason_discrepancy_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_reason_discrepancy_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_reason_discrepancy_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_reason_discrepancy,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'reason_discrepancy_amkr', "");
                            } else {
                                this.form.set_validation_object_error(null, 'reason_discrepancy_amkr', langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_reason_discrepancy_uz = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'reason_discrepancy_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_reason_discrepancy_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_reason_discrepancy_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_reason_discrepancy,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object__ok(null, 'reason_discrepancy_uz', "");
                            } else {
                                this.form.set_validation_object_error(null, 'reason_discrepancy_uz', langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_row_common3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_adm_kod = {
                obj: 'bs_input_text',
                options: {
                    id: 'adm_kod',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_adm_kod', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_adm_kod', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_rod_vag_abbr = {
                obj: 'bs_input_text',
                options: {
                    id: 'rod_vag_abbr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_rod_vag_abbr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_rod_vag_abbr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_gruzp_uz = {
                obj: 'bs_input_text',
                options: {
                    id: 'gruzp_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_gruzp_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_gruzp_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_tara_uz = {
                obj: 'bs_input_text',
                options: {
                    id: 'tara_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_tara_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_tara_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_common4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_condition_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'condition_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_condition_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_condition_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_condition_present = {
                obj: 'bs_input_text',
                options: {
                    id: 'condition_present',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_condition_present', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_condition_present', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            // Задержания возврат
            var fieldset_detention_return = {
                obj: 'fieldset',
                options: {
                    class: 'border-warning',
                    legend: langView('fogcd_title_fieldset_detention_return', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_detention_return1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_textarea_condition_present = {
                obj: 'bs_textarea',
                options: {
                    id: 'condition_present',
                    validation_group: null,
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_condition_present', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: null,
                    textarea_title: langView('fogcd_title_condition_present', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_detention = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_detention = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_detention = {
                obj: 'fieldset',
                options: {
                    class: 'border-warning',
                    legend: langView('fogcd_title_fieldset_detention', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_detention1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_detention1_1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 11,
                    class: 'text-left',
                },
                childs: []
            };
            var col_detention1_2 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 1,
                    class: 'pull-right mb-1 text-left',
                },
                childs: []
            };
            var form_alert = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'detention',
                },
                childs: []
            };
            var bt_detention_save = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'detention_save',
                    label: null,
                    title: langView('fogcd_title_button_save', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-save',
                    click: function (event) {
                        event.preventDefault();
                    },
                }
            };
            var bt_detention_edit = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'detention_edit',
                    label: null,
                    title: langView('fogcd_title_button_edit', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-edit',
                    click: function (event) {
                        event.preventDefault();
                    },
                }
            };
            var form_row_detention2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cause_detention = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'cause_detention',
                    validation_group: 'detention',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cause_detention', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_cause_detention', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_detention_return,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getDetention_Return_Of_CultureName('cause', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok('detention', 'cause_detention', "");
                            } else {
                                this.form.set_validation_object_error('detention', 'cause_detention', langView('fogcd_mess_valid_cause_detention', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_detention_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'detention_start',
                    validation_group: 'detention',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_detention_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_detention_start', App.Langs),
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
            var form_input_detention_stop = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'detention_stop',
                    validation_group: 'detention',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_detention_stop', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_detention_stop', App.Langs),
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
            var form_row_return = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_return = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_return = {
                obj: 'fieldset',
                options: {
                    class: 'border-warning',
                    legend: langView('fogcd_title_fieldset_return', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_return1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_return1_1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 11,
                    class: 'text-left',
                },
                childs: []
            };
            var col_return1_2 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 1,
                    class: 'pull-right mb-1 text-left',
                },
                childs: []
            };
            var form_alert_return = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'return',
                },
                childs: []
            };
            var bt_return_open = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'return_open',
                    label: null,
                    title: langView('fogcd_title_button_return_open', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-save',
                    click: function (event) {
                        event.preventDefault();
                    },
                }
            };
            var bt_return_close = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'return_close',
                    label: null,
                    title: langView('fogcd_title_button_return_close', App.Langs),
                    icon_left: null,
                    icon_right: 'fa fa-times',
                    click: function (event) {
                        event.preventDefault();
                    },
                }
            };
            var form_row_return2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cause_return = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'cause_return',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cause_return', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_cause_return', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_detention_return,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getDetention_Return_Of_CultureName('cause', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok('return', 'cause_return', "");
                            } else {
                                this.form.set_validation_object_error('return', 'cause_return', langView('fogcd_mess_valid_cause_return', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_return_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'return_start',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_start', App.Langs),
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
            var form_input_return_stop = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'return_stop',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_stop', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_stop', App.Langs),
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
            var form_row_return3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_return_num_act = {
                obj: 'bs_input_text',
                options: {
                    id: 'return_num_act',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_num_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_num_act', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_return_date_act = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'return_date_act',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_date_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_date_act', App.Langs),
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
            var form_textarea_return_note = {
                obj: 'bs_textarea',
                options: {
                    id: 'return_note',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_note', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 2,
                    textarea_class: 'inp-manual',
                    textarea_title: langView('fogcd_title_return_note', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // ДАННЫЕ О ПОГРУЗКЕ
            var fieldset_loading_data = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('fogcd_title_fieldset_loading_data', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_loading_data1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_checkbox_loaded_car = {
                obj: 'bs_checkbox',
                element: null,
                options: {
                    id: 'loaded_car',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_loaded_car', App.Langs),
                    label_class: 'mb-1',
                    checkbox_class: 'inp-manual',
                    checkbox_title: null,
                    checkbox_required: null,
                    element_default: null,
                    element_change: null,
                },
                childs: []
            };
            var form_row_loading_data2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cargo_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'cargo_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 7,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_cargo_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_cargo,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getCargo_Of_CultureName('cargo_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'cargo_name', "");
                            } else {
                                this.form.set_validation_object_error(null, 'cargo_name', langView('fogcd_mess_valid_cargo', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_loading_devision_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'loading_devision_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_loading_devision_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_loading_devision_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_loading_devision = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'loading_devision',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_loading_devision', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_loading_devision', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_readonly: false,
                    element_data: this.list_divisions,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getDivisions_Of_CultureName('division_abbr', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'loading_devision', "");
                                this.form.val('loading_devision_code', obj[0].code);
                            } else {
                                this.form.set_validation_object_error(null, 'loading_devision', langView('fogcd_mess_valid_loading_devision', App.Langs));
                                this.form.val('loading_devision_code', '');
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_row_loading_data3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_code_station_to = {
                obj: 'bs_input_text',
                options: {
                    id: 'code_station_to',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_code_station_to', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_code_station_to', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_name_station_to = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'name_station_to',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_name_station_to', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_name_station_to', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_readonly: false,
                    element_data: this.list_external_station,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getExternalStation_Of_CultureName('station_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'name_station_to', "");
                                this.form.val('code_station_to', obj[0].code)

                            } else {
                                this.form.set_validation_object_error(null, 'name_station_to', langView('fogcd_mess_valid_name_station_to', App.Langs));
                                this.form.val('code_station_to', '')
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_owner_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'owner_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_owner_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_owner_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_row_loading_data4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_operator_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'operator_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_operator_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_operator_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_limiting_loading_amkr = {
                obj: 'bs_input_text',
                options: {
                    id: 'limiting_loading_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_limiting_loading_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_limiting_loading_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_loading_data5 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_textarea_limiting_loading_uz = {
                obj: 'bs_textarea',
                options: {
                    id: 'limiting_loading_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_limiting_loading_uz', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 2,
                    textarea_class: 'inp-auto',
                    textarea_title: langView('fogcd_title_limiting_loading_uz', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_loading_data6 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_epd = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_epd = {
                obj: 'fieldset',
                options: {
                    class: 'border-info',
                    legend: langView('fogcd_title_fieldset_epd', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_epd1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_uz_doc_num = {
                obj: 'bs_input_text',
                options: {
                    id: 'uz_doc_num',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_uz_doc_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_uz_doc_num', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_vesg_uz_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'vesg_uz_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_vesg_uz_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_vesg_uz_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_ves_tary_uz_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'ves_tary_uz_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_ves_tary_uz_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_ves_tary_uz_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_brigadier_loading_uz_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'brigadier_loading_uz_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_brigadier_loading_uz_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_brigadier_loading_uz_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_epd2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kod_etsng = {
                obj: 'bs_input_text',
                options: {
                    id: 'kod_etsng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_kod_etsng', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_kod_etsng', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_textarea_name_etsng = {
                obj: 'bs_textarea',
                options: {
                    id: 'name_etsng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_name_etsng', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 2,
                    textarea_class: 'inp-epd',
                    textarea_title: langView('fogcd_title_name_etsng', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_epd3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_station_code_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'station_code_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_station_code_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_station_code_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_station_name_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'station_name_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_station_name_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_station_name_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_railway_name_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'railway_name_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_railway_name_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_railway_name_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_epd4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_client_kod_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'client_kod_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_client_kod_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_client_kod_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_client_name_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'client_name_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_client_name_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_client_name_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            //
            var form_row_loading_data7 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_sap = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_sap = {
                obj: 'fieldset',
                options: {
                    class: 'border-info',
                    legend: langView('fogcd_title_fieldset_sap', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            // ДАННЫЕ О ПРИБЫТИИ'
            var fieldset_data_arrival = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('fogcd_title_fieldset_data_arrival', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_data_arrival1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cargo_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'cargo_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_cargo_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_cargo_sap = {
                obj: 'bs_input_text',
                options: {
                    id: 'cargo_sap',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 8,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_sap', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_cargo_sap', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_data_arrival2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_date_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'date_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_date_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_date_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_owner_name_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'owner_name_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 8,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_owner_name_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_owner_name_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_data_arrival3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_operator_name_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'operator_name_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_operator_name_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_operator_name_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_limiting_loading_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'limiting_loading_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_limiting_loading_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_limiting_loading_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };

            // Собираем
            col1.childs.push(bt_present_car);
            col1.childs.push(bt_return_car);
            row1.childs.push(col1);
            //
            form_row_common1.childs.push(form_input_num);
            form_row_common1.childs.push(form_input_position_outgoing);
            form_row_common1.childs.push(form_input_num_cont_1);
            form_row_common1.childs.push(form_input_num_cont_2);
            form_row_common2.childs.push(form_input_date_outgoing_act);
            form_row_common2.childs.push(form_input_reason_discrepancy_amkr);
            form_row_common2.childs.push(form_input_reason_discrepancy_uz);
            form_row_common3.childs.push(form_input_adm_kod);
            form_row_common3.childs.push(form_input_rod_vag_abbr);
            form_row_common3.childs.push(form_input_gruzp_uz);
            form_row_common3.childs.push(form_input_tara_uz);
            form_row_common4.childs.push(form_input_condition_arrival);
            form_row_common4.childs.push(form_input_condition_present);
            //
            fieldset_common.childs.push(form_row_common1);
            fieldset_common.childs.push(form_row_common2);
            fieldset_common.childs.push(form_row_common3);
            fieldset_common.childs.push(form_row_common4);
            //
            form_row_detention_return1.childs.push(form_textarea_condition_present);
            fieldset_detention_return.childs.push(form_row_detention_return1);
            //
            col_detention1_2.childs.push(bt_detention_save);
            col_detention1_2.childs.push(bt_detention_edit);
            col_detention1_1.childs.push(form_alert);
            form_row_detention1.childs.push(col_detention1_1);
            form_row_detention1.childs.push(col_detention1_2);
            fieldset_detention.childs.push(form_row_detention1);

            form_row_detention2.childs.push(form_input_cause_detention);
            form_row_detention2.childs.push(form_input_detention_start);
            form_row_detention2.childs.push(form_input_detention_stop);

            fieldset_detention.childs.push(form_row_detention2);
            col_detention.childs.push(fieldset_detention);
            form_row_detention.childs.push(col_detention);
            fieldset_detention_return.childs.push(form_row_detention);
            //
            //
            col_return1_2.childs.push(bt_return_open);
            col_return1_2.childs.push(bt_return_close);
            col_return1_1.childs.push(form_alert_return);
            form_row_return1.childs.push(col_return1_1);
            form_row_return1.childs.push(col_return1_2);
            fieldset_return.childs.push(form_row_return1);
            //
            form_row_return2.childs.push(form_input_cause_return);
            form_row_return2.childs.push(form_input_return_start);
            form_row_return2.childs.push(form_input_return_stop);
            fieldset_return.childs.push(form_row_return2);
            //
            form_row_return3.childs.push(form_input_return_num_act);
            form_row_return3.childs.push(form_input_return_date_act);
            form_row_return3.childs.push(form_textarea_return_note);
            fieldset_return.childs.push(form_row_return3);
            //
            col_return.childs.push(fieldset_return);
            form_row_return.childs.push(col_return);
            fieldset_detention_return.childs.push(form_row_return);
            //
            form_row_loading_data1.childs.push(form_checkbox_loaded_car);
            //
            form_row_loading_data2.childs.push(form_input_cargo_name);
            form_row_loading_data2.childs.push(form_input_loading_devision_code);
            form_row_loading_data2.childs.push(form_input_loading_devision);
            //
            form_row_loading_data3.childs.push(form_input_code_station_to);
            form_row_loading_data3.childs.push(form_input_name_station_to);
            form_row_loading_data3.childs.push(form_input_owner_name);
            //
            form_row_loading_data4.childs.push(form_input_operator_name);
            form_row_loading_data4.childs.push(form_input_limiting_loading_amkr);
            //
            form_row_loading_data5.childs.push(form_textarea_limiting_loading_uz);
            //
            form_row_epd1.childs.push(form_input_uz_doc_num);
            form_row_epd1.childs.push(form_input_vesg_uz_doc);
            form_row_epd1.childs.push(form_input_ves_tary_uz_doc);
            form_row_epd1.childs.push(form_input_brigadier_loading_uz_doc);
            fieldset_epd.childs.push(form_row_epd1);
            //
            form_row_epd2.childs.push(form_input_kod_etsng);
            form_row_epd2.childs.push(form_textarea_name_etsng);
            fieldset_epd.childs.push(form_row_epd2);
            //
            form_row_epd3.childs.push(form_input_station_code_on);
            form_row_epd3.childs.push(form_input_station_name_on);
            form_row_epd3.childs.push(form_input_railway_name_on);
            fieldset_epd.childs.push(form_row_epd3);
            //
            form_row_epd4.childs.push(form_input_client_kod_on);
            form_row_epd4.childs.push(form_input_client_name_on);
            fieldset_epd.childs.push(form_row_epd4);
            //
            col_epd.childs.push(fieldset_epd);
            form_row_loading_data6.childs.push(col_epd);
            //
            col_sap.childs.push(fieldset_sap);
            form_row_loading_data6.childs.push(col_sap);
            //
            fieldset_loading_data.childs.push(form_row_loading_data1);
            fieldset_loading_data.childs.push(form_row_loading_data2);
            fieldset_loading_data.childs.push(form_row_loading_data3);
            fieldset_loading_data.childs.push(form_row_loading_data4);
            fieldset_loading_data.childs.push(form_row_loading_data5);
            fieldset_loading_data.childs.push(form_row_loading_data6);
            fieldset_loading_data.childs.push(form_row_loading_data7);
            //
            form_row_data_arrival1.childs.push(form_input_cargo_arrival);
            form_row_data_arrival1.childs.push(form_input_cargo_sap);
            //
            form_row_data_arrival2.childs.push(form_input_date_arrival);
            form_row_data_arrival2.childs.push(form_input_owner_name_arrival);
            //
            form_row_data_arrival3.childs.push(form_input_operator_name_arrival);
            form_row_data_arrival3.childs.push(form_input_limiting_loading_arrival);
            //
            fieldset_data_arrival.childs.push(form_row_data_arrival1);
            fieldset_data_arrival.childs.push(form_row_data_arrival2);
            fieldset_data_arrival.childs.push(form_row_data_arrival3);
            //
            col_detali.childs.push(fieldset_common);
            col_detali.childs.push(fieldset_detention_return);
            col_detali.childs.push(fieldset_loading_data);
            col_detali.childs.push(fieldset_data_arrival);
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
                    this.$form_outgoing_cars.empty();
                    this.$form_outgoing_cars.append(this.form.$form);
                    // Инициализация закончена
                    if (typeof this.settings.fn_init === 'function') {
                        this.settings.fn_init(this.init);
                    };
                }.bind(this),
            });
        }.bind(this));
    }
    //
    form_outgoing_cars_detali.prototype.clear_form = function () {
        if (this.elements) {
            this.elements.input_number_num_car.val('');
            this.elements.input_number_position_outgoing.val('1');
            this.elements.input_text_num_cont_1.val('');
            this.elements.input_text_num_cont_2.val('');
            this.elements.input_datetime_date_outgoing_act.set(null); // уберем дату
            this.elements.autocomplete_reason_discrepancy_amkr.set('');
            this.elements.autocomplete_reason_discrepancy_uz.set('');
            this.elements.input_text_adm_kod.val('');
            this.elements.input_text_rod_vag_abbr.val('');
            this.elements.input_text_gruzp_uz.val('');
            this.elements.input_text_tara_uz.val('');
            this.elements.input_text_condition_arrival.val('');
            //this.elements.input_text_condition_provide.val('');

            this.elements.textarea_condition_present.val('');
            //this.elements.condition_present_user.val('Разметка по отправлению:');
            // Задержание
            this.elements.autocomplete_cause_detention.set('');
            this.elements.input_datetime_detention_start.set(null); // уберем дату
            this.elements.input_datetime_detention_stop.set(null); // уберем дату
            // Возврат
            this.elements.autocomplete_cause_return.set('');
            this.elements.input_datetime_return_start.set(null); // уберем дату
            this.elements.input_datetime_return_stop.set(null); // уберем дату
            this.elements.input_text_return_num_act.val('');
            this.elements.input_datetime_return_date_act.set(null); // уберем дату
            this.elements.textarea_return_note.val('');
            //this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
            // Данные о погрузке
            this.elements.checkbox_loaded_car.val(false);
            this.elements.autocomplete_cargo_name.set('');
            this.elements.input_text_loading_devision_code.val('');
            this.elements.autocomplete_loading_devision.set('');
            this.elements.input_text_code_station_to.val('');
            this.elements.autocomplete_name_station_to.set('');
            this.elements.input_text_owner_name.val('');
            this.elements.input_text_operator_name.val('');
            this.elements.input_text_limiting_loading_amkr.val('');
            this.elements.textarea_limiting_loading_uz.val('');
            // ЭПД
            this.elements.input_text_uz_doc_num.val('');
            this.elements.input_text_vesg_uz_doc.val('');
            this.elements.input_text_ves_tary_uz_doc.val('');
            this.elements.input_text_brigadier_loading_uz_doc.val('');
            //
            this.elements.input_text_kod_etsng.val('');
            this.elements.textarea_name_etsng.val('');
            //
            this.elements.input_text_station_code_on.val('');
            this.elements.input_text_station_name_on.val('');
            this.elements.input_text_railway_name_on.val('');
            //
            this.elements.input_text_client_kod_on.val('');
            this.elements.input_text_client_name_on.val('');
            // Прибытие
            this.elements.input_text_cargo_arrival.val('');
            this.elements.input_text_cargo_sap.val('');
            this.elements.input_text_date_arrival.val('');
            this.elements.input_text_owner_name_arrival.val('');
            this.elements.input_text_operator_name_arrival.val('');
            this.elements.input_text_limiting_loading_arrival.val('');
        } else {
            throw new Error('this.elements - пустой, нет привязки');
        }
    }

    form_outgoing_cars_detali.prototype.view_wagon = function (wagon, position) {
        if (wagon) {
            if (this.elements) {
                if (position) {
                    this.edit();
                } else {
                    this.view();
                }
                this.elements.input_number_num_car.val(wagon.num);
                this.elements.input_number_position_outgoing.val(position ? position : wagon.outgoing_car_position_outgoing);
                this.elements.input_text_num_cont_1.val(wagon.outgoing_uz_vagon_cont_1_nom_cont);
                this.elements.input_text_num_cont_2.val(wagon.outgoing_uz_vagon_cont_2_nom_cont);
                this.elements.input_datetime_date_outgoing_act.val(wagon.outgoing_car_date_outgoing_act); // уберем дату
                this.elements.autocomplete_reason_discrepancy_amkr.val(wagon['outgoing_car_reason_discrepancy_amkr_name_'+ App.Lang]);
                this.elements.autocomplete_reason_discrepancy_uz.val(wagon['outgoing_car_reason_discrepancy_uz_name_'+ App.Lang]);
                this.elements.input_text_adm_kod.val(wagon.outgoing_uz_vagon_wagon_adm);
                this.elements.input_text_rod_vag_abbr.val(wagon.outgoing_uz_vagon_rod);
                this.elements.input_text_gruzp_uz.val(wagon.outgoing_uz_vagon_gruzp);
                this.elements.input_text_tara_uz.val(wagon.outgoing_uz_vagon_tara_uz);
                this.elements.input_text_condition_arrival.val(wagon['outgoing_uz_vagon_condition_' + App.Lang]);
                this.elements.textarea_condition_present.val(wagon['outgoing_uz_vagon_condition_' + App.Lang]);
                //this.elements.condition_present_user.val('Разметка по отправлению:');
                // Задержание
                this.elements.autocomplete_cause_detention.set('');
                this.elements.input_datetime_detention_start.set(null); // уберем дату
                this.elements.input_datetime_detention_stop.set(null); // уберем дату
                // Возврат
                this.elements.autocomplete_cause_return.set('');
                this.elements.input_datetime_return_start.set(null); // уберем дату
                this.elements.input_datetime_return_stop.set(null); // уберем дату
                this.elements.input_text_return_num_act.val('');
                this.elements.input_datetime_return_date_act.set(null); // уберем дату
                this.elements.textarea_return_note.val('');
                //this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
                // Данные о погрузке
                this.elements.checkbox_loaded_car.val(false);
                this.elements.autocomplete_cargo_name.set('');
                this.elements.input_text_loading_devision_code.val('');
                this.elements.autocomplete_loading_devision.set('');
                this.elements.input_text_code_station_to.val('');
                this.elements.autocomplete_name_station_to.set('');
                this.elements.input_text_owner_name.val('');
                this.elements.input_text_operator_name.val('');
                this.elements.input_text_limiting_loading_amkr.val('');
                this.elements.textarea_limiting_loading_uz.val('');
                // ЭПД
                this.elements.input_text_uz_doc_num.val('');
                this.elements.input_text_vesg_uz_doc.val('');
                this.elements.input_text_ves_tary_uz_doc.val('');
                this.elements.input_text_brigadier_loading_uz_doc.val('');
                //
                this.elements.input_text_kod_etsng.val('');
                this.elements.textarea_name_etsng.val('');
                //
                this.elements.input_text_station_code_on.val('');
                this.elements.input_text_station_name_on.val('');
                this.elements.input_text_railway_name_on.val('');
                //
                this.elements.input_text_client_kod_on.val('');
                this.elements.input_text_client_name_on.val('');
                // Прибытие
                this.elements.input_text_cargo_arrival.val('');
                this.elements.input_text_cargo_sap.val('');
                this.elements.input_text_date_arrival.val('');
                this.elements.input_text_owner_name_arrival.val('');
                this.elements.input_text_operator_name_arrival.val('');
                this.elements.input_text_limiting_loading_arrival.val('');
            } else {
                throw new Error('this.elements - пустой, нет привязки');
            }
        }
    }
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.close = function () {
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.form.bt_hide('present_car');
        this.form.bt_hide('return_car');
        this.form.bt_hide('car_return');
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Задержание
        this.form.bt_hide('detention_save');
        this.form.bt_hide('detention_edit');
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Возврат
        this.form.bt_hide('return_open');
        this.form.bt_hide('return_close');
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });
    }
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.view = function () {
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.form.bt_hide('present_car');
        this.form.bt_show('return_car');
        this.form.bt_hide('car_return');
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Задержание
        this.form.bt_hide('detention_save');
        this.form.bt_hide('detention_edit');
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Возврат
        this.form.bt_hide('return_open');
        this.form.bt_hide('return_close');
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });
    }
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.edit = function () {
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.form.bt_show('present_car');
        this.form.bt_hide('return_car');
        this.form.bt_show('car_return');
        this.form.obj_form.validations[0].$elements.find('.inp-manual').each(function () {
            this.prop('disabled', false);
        });
        //-- Задержание
        this.form.bt_hide('detention_save');
        this.form.bt_hide('detention_edit');
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Возврат
        this.form.bt_hide('return_open');
        this.form.bt_hide('return_close');
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });
        this.clear_form();
    }

    form_outgoing_cars_detali.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_outgoing_cars_detali.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_outgoing_cars_detali.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_outgoing_cars_detali.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_outgoing_cars_detali.destroy = function () {
        this.modal_confirm_form.destroy();
        this.form.destroy();
        this.mf_edit.destroy();
    };

    App.form_outgoing_cars_detali = form_outgoing_cars_detali;

    window.App = App;

})(window);