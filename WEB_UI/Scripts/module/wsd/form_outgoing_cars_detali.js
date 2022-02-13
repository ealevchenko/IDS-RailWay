/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />

(function (window) {
    'use strict';

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";


    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));


    var min_err_detention_start = -2 * 60;   // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_err_detention_start = 2 * 60;    // TODO: Максимальная разница в часах начало задержания и текущей даты
    var max_err_detention_deff = 4 * 60;    // TODO: Минимальная разница в часах межу началом и концом задержания
    var min_err_return_start = -2 * 60;   // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_err_return_start = 2 * 60;    // TODO: Максимальная разница в часах начало задержания и текущей даты
    var min_err_return_stop = -2 * 60;   // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_err_return_stop = 2 * 60;    // TODO: Максимальная разница в часах начало задержания и текущей даты
    //var max_err_return_deff = 4 * 60;    // TODO: Минимальная разница в часах межу началом и концом задержания


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
            'fogcd_form_detention': 'Править задержание?',
            'fogcd_form_detention_message': 'Обновить информацию по задержанию вагона?',
            'fogcd_form_return_open': 'Открыть возврат?',
            'fogcd_form_return_open_message': 'Открыть возврат на вагон {0}?',
            'fogcd_form_return_close': 'Закрыть возврат?',
            'fogcd_form_return_close_message': 'Закрыть возврат по вагону {0}?',

            'fogcd_title_fieldset_detention_return': 'ЗАДЕРЖАНИЕ/ВОЗВРАТ',
            'fogcd_title_fieldset_detention': 'ЗАДЕРЖАНИЕ',
            'fogcd_title_fieldset_return': 'ВОЗВРАТ',
            'fogcd_title_fieldset_loading_data': 'ДАННЫЕ О ПОГРУЗКЕ',
            'fogcd_title_fieldset_epd': 'ЭПД(ПОСЛЕ ПРИНЯТИЯ УЗ)',
            'fogcd_title_fieldset_sap': 'SAP (ИСХОДЯЩАЯ ПОСТАВКА)',
            'fogcd_title_fieldset_data_arrival': 'ДАННЫЕ О ПРИБЫТИИ',

            'fogcd_mess_valid_reason_discrepancy': 'Указанной причины расхождения нет в справочнике ИДС.',
            'fogcd_mess_valid_cause_detention': 'Указанной причины задержания нет в справочнике ИДС.',
            'fogcd_mess_valid_not_cause_detention': 'Укажите причину задержания',
            'fogcd_mess_valid_not_detention_start': 'Укажите начало задержания',
            'fogcd_mess_valid_not_detention_stop': 'Укажите конец задержания',
            'fogcd_mess_valid_not_deff_date_detention': 'Дата и время начало задержания должны быть не меньше {0} мин. или больше {1} мин. от текущей даты',
            'fogcd_mess_valid_not_deff_date_detention_start_stop': 'Разница между началом и окончанием задержания должна быть больше 0 мин. но меньше {0} мин.',
            'fogcd_mess_valid_cause_return': 'Указанной причины возврата нет в справочнике ИДС.',
            'fogcd_mess_valid_not_cause_return': 'Укажите причину возврата',
            'fogcd_mess_valid_not_return_start': 'Укажите начало возврата',
            'fogcd_mess_valid_not_return_stop': 'Укажите конец возврата',
            'fogcd_mess_valid_not_deff_date_return': 'Дата и время начало возврата должны быть не меньше {0} мин. или больше {1} мин. от текущей даты',
            'fogcd_mess_valid_not_deff_date_stop_return': 'Дата и время окончания возврата должны быть не меньше {0} мин. или больше {1} мин. от текущей даты',
            'fogcd_mess_valid_not_deff_date_return_start_stop': 'Разница между началом и окончанием возврата должна быть больше 0 мин.',
            'fogcd_mess_valid_error_date_act': 'Ошибка формата даты акта',

            'fogcd_mess_valid_cargo': 'Указанного груза нет в справочнике ИДС.',
            'fogcd_mess_valid_loading_devision': 'Указанного подразделения нет в справочнике ИДС.',
            'fogcd_mess_valid_name_station_to': 'Указанной станции нет в справочнике ИДС.',
            'fogcd_mess_warning_no_data_wagon_ids': 'По указаному ID {0} вагона нет данных в БД ИДС.',
            'fogcd_mess_warning_no_data_wagon_uz': 'По выбранному вагону нет данных в БД УЗ. (будут применены данный из справочника ИДС).',
            'fogcd_mess_warning_no_data_dir_wagon': 'По выбранному вагону нет данных в справочнике вагонов ИДС.',


            'fogcd_value_vagonnik': 'Разметил : {0}, Разметка : {1}',

            'fogcd_mess_init_panel': 'Инициализация модуля...',
            'fogcd_mess_load_wagon': 'Обновляю информацию по вагону...',
            'fogcd_mess_load_db_uz': 'Обновляю информацию о вагоне с бд УЗ...',
            'fogcd_mess_load_return_wagon': 'Поиск информации по возвратам',
            'fogcd_mess_update_operation_detention': 'Выполняю операцию обновления задержания по вагону',
            'fogcd_mess_cancel_operation_detention': 'Отмена выполнения операции "Обновить задержание по вагону"',
            'fogcd_mess_ok_operation_detention': 'Операция "Обновить задержание по вагону" - выполнена',
            'fogcd_mess_error_operation_detention': 'Ошибка выполения операции "Обновить задержание по вагону", код ошибки = ',
            'fogcd_mess_update_operation_return_open': 'Выполняю операцию "Открыть возврат по вагону"',
            'fogcd_mess_cancel_operation_return_open': 'Отмена выполнения операции "Открыть возврат по вагону"',
            'fogcd_mess_ok_operation_return_open': 'Операция "Открыть возврат по вагону" - выполнена',
            'fogcd_mess_error_operation_return_open': 'Ошибка выполения операции "Открыть возврат по вагону", код ошибки = ',
            'fogcd_mess_update_operation_return_close': 'Выполняю операцию "Закрыть возврат по вагону"',
            'fogcd_mess_cancel_operation_return_close': 'Отмена выполнения операции "Закрыть возврат по вагону"',
            'fogcd_mess_ok_operation_return_close': 'Операция "Закрыть возврат по вагону" - выполнена',
            'fogcd_mess_error_operation_return_close': 'Ошибка выполения операции "Закрыть возврат по вагону", код ошибки = ',
            'fogcd_mess_error_operation_return_close_not_id': 'Ошибка выполения операции "Закрыть возврат по вагону", id cтроки возврата неопределенн',

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
    var uz_directory = App.uz_directory;

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
        // Создадим и инициализируем модуль Задержания и возвраты детвльно
        var TOGDR = App.table_outgoing_detention_return; // Отправленные вагоны
        var sel_ogdr = 'table-ogdr-' + this.selector;
        //----------------------------------------------------------------
        //this.list_station = [];
        this.elements = {};                     // Все элементы формы
        this.list_reason_discrepancy = null;    // Список
        this.list_detention_return = null;
        this.list_cargo = null;
        this.list_cargo_group = null;
        this.list_divisions = null;
        this.list_external_station = null;
        this.id = null;                         // текущее id вагона
        this.wagon = null;                      // Текущий вагон
        this.current_id_return_wagons = null;   // Текущий id открытой строки возврата

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['reason_discrepancy', 'detention_return', 'cargo', 'cargo_group', 'divisions', 'external_station'], false, function (result) {
            // Подгрузили списки
            this.list_reason_discrepancy = this.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', App.Lang, null);
            this.list_detention_return = this.ids_dir.getListDetention_Return('id', 'cause', App.Lang, null);
            this.list_cargo = this.ids_dir.getListCargo('id', 'cargo_name', App.Lang, null);
            this.list_cargo_group = this.ids_dir.getListCargoGroup('id', 'cargo_group_name', App.Lang, null);
            this.list_divisions = this.ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);
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
                        this.action_save_detention();
                    }.bind(this),
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
                        this.action_edit_detention();
                    }.bind(this),
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
                                this.form.set_validation_control_ok('detention', 'cause_detention', "");
                            } else {
                                this.form.set_validation_control_error('detention', 'cause_detention', langView('fogcd_mess_valid_cause_detention', App.Langs));
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
                        this.action_return_open();
                    }.bind(this),
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
                        this.action_return_close();
                    }.bind(this),
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
                                this.form.set_validation_control_ok('return', 'cause_return', "");
                            } else {
                                this.form.set_validation_control_error('return', 'cause_return', langView('fogcd_mess_valid_cause_return', App.Langs));
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
            var form_row_return4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_return_table = {
                obj: 'bs_col',
                options: {
                    id: sel_ogdr,
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
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
                    element_data: this.list_cargo_group,
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
            // Таблица возвратов
            form_row_return4.childs.push(col_return_table);
            fieldset_return.childs.push(form_row_return4);
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
                    // Инициализация таблица возвратов детально
                    this.table_outgoing_detention_return = new TOGDR('div#' + sel_ogdr);             // Создадим экземпляр
                    this.table_outgoing_detention_return.init({
                        type_report: 'return_cars',
                        alert: null,
                        ids_dir: this.ids_dir,
                        ids_wsd: null,
                        fn_select_rows: function (rows) {

                        }.bind(this),
                        fn_init: function (init) {
                            // Инициализация закончена
                            if (typeof this.settings.fn_init === 'function') {
                                this.settings.fn_init(this.init);
                            };
                        }.bind(this),
                    });

                }.bind(this),
            });
        }.bind(this));
    }
    //----------------------------------------------------------------
    // Очистить форму
    form_outgoing_cars_detali.prototype.clear_form = function () {
        this.out_clear();
        this.form.validation_common.clear_all();
        this.form.validation_detention.clear_all();
        this.form.validation_return.clear_all();
        if (this.elements) {
            this.elements.input_number_num_car.val('');
            this.elements.input_number_position_outgoing.val('1');
            this.elements.input_text_num_cont_1.val('');
            this.elements.input_text_num_cont_2.val('');
            this.elements.input_datetime_date_outgoing_act.set(null); // уберем дату
            this.elements.autocomplete_reason_discrepancy_amkr.text('');
            this.elements.autocomplete_reason_discrepancy_uz.text('');
            this.elements.input_text_adm_kod.val('');
            this.elements.input_text_rod_vag_abbr.val('');
            this.elements.input_text_gruzp_uz.val('');
            this.elements.input_text_tara_uz.val('');
            this.elements.input_text_condition_arrival.val('');
            this.elements.input_text_condition_present.val('');

            this.elements.textarea_condition_present.val('');
            // Задержание
            this.elements.autocomplete_cause_detention.text('');
            this.elements.input_datetime_detention_start.set(null); // уберем дату
            this.elements.input_datetime_detention_stop.set(null); // уберем дату
            // Возврат
            this.elements.autocomplete_cause_return.text('');
            this.elements.input_datetime_return_start.set(null); // уберем дату
            this.elements.input_datetime_return_stop.set(null); // уберем дату
            this.elements.input_text_return_num_act.val('');
            this.elements.input_datetime_return_date_act.set(null); // уберем дату
            this.elements.textarea_return_note.val('');
            //this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
            // Данные о погрузке
            this.elements.checkbox_loaded_car.val(false);
            this.elements.autocomplete_cargo_name.text('');
            this.elements.input_text_loading_devision_code.val('');
            this.elements.autocomplete_loading_devision.text('');
            this.elements.input_text_code_station_to.val('');
            this.elements.autocomplete_name_station_to.text('');
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
    };
    // Обновить информацию по вагону
    form_outgoing_cars_detali.prototype.update_wagon = function (callback) {
        LockScreen(langView('fogcd_mess_load_wagon', App.Langs));
        this.ids_wsd.getViewOutgoingCarsOfIDCar(this.id, function (wagon) {
            if (wagon) {
                this.wagon = wagon;
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            } else {
                this.wagon = null;
                this.out_error(langView('fogcd_mess_warning_no_data_wagon_uz', App.Langs).format(this.id));
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            }
        }.bind(this));

    };
    // Показать детали
    form_outgoing_cars_detali.prototype.wagon_detali = function (id, options) {
        LockScreen(langView('fogcd_mess_load_wagon', App.Langs));
        this.out_clear();
        this.id = id;
        this.update_wagon(function (wagon) {
            if (wagon !== null) {
                if (this.elements) {
                    if (options.type === 1) {
                        // режим правки
                        this.edit();
                        LockScreen(langView('fogcd_mess_load_db_uz', App.Langs));
                        var process = 1;//2;
                        //TODO:!ОТКЛЮЧИЛ ДЛЯ ПРОВЕРКИ
                        options.info = null;
                        //this.uz_dir.getInfoWagonOfNum(this.wagon.num, function (info) {
                        //    if (info === null) {
                        //        // Иногда нет ответа, сообщаем!
                        //        this.out_warning(langView('fogcd_mess_warning_no_data_wagon_uz', App.Langs))
                        //    }
                        //    options.info = info;
                        //    process--;
                        //    if (process === 0) {
                        //        //LockScreenOff();
                        //        this.wiew_wagon_detali(this.wagon, options);
                        //    }
                        //}.bind(this));
                        this.ids_dir.getWagonsOfNum(this.wagon.num, function (dir_wagon) {
                            if (dir_wagon === null) {
                                // Иногда нет ответа, сообщаем!
                                this.out_warning(langView('fogcd_mess_warning_no_data_dir_wagon', App.Langs))
                            }
                            options.dir_wagon = dir_wagon;
                            process--;
                            if (process === 0) {
                                //LockScreenOff();
                                this.wiew_wagon_detali(this.wagon, options);
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
    form_outgoing_cars_detali.prototype.wiew_wagon_detali = function (wagon, options) {
        // Определим основные свойства
        this.wagon_settings = $.extend({
            type: 0,
            position: 1,
            wagon_info: null,
        }, options);

        var adm_kod = wagon.outgoing_uz_vagon_wagon_adm;
        var gruzp_uz = wagon.outgoing_uz_vagon_gruzp_uz;
        var tara_uz = wagon.outgoing_uz_vagon_tara_uz;
        var note_uz = wagon.outgoing_uz_vagon_note_uz;
        var current_condition = wagon['outgoing_uz_vagon_condition_abbr' + App.Lang];

        var laden = wagon.outgoing_uz_vagon_laden;
        var outgoing_uz_vagon_id_group = wagon.outgoing_uz_vagon_id_group;
        var outgoing_uz_vagon_id_division = wagon.outgoing_uz_vagon_id_division;
        var outgoing_uz_vagon_division_code = wagon.outgoing_uz_vagon_division_code;
        var outgoing_uz_vagon_to_station_uz_code = wagon.outgoing_uz_vagon_to_station_uz_code;
        //var outgoing_uz_vagon_to_station_uz_name = wagon.outgoing_uz_vagon_to_station_uz_name;

        var owner_name = wagon['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang];
        var rent_operator = wagon['outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_' + App.Lang];
        var rent_limiting = wagon['outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_' + App.Lang];

        // Настроем отображение если окно в режиме редактирования
        if (this.wagon_settings.type === 1) {
            if (options.dir_wagon) {
                gruzp_uz = options.dir_wagon.gruzp;         //
                tara_uz = options.dir_wagon.tara;
                var wagon_contrys = options.dir_wagon.Directory_Countrys;
                adm_kod = wagon_contrys ? wagon_contrys.code_sng : null;
                var wagon_owners = options.dir_wagon.Directory_OwnersWagons;
                owner_name = wagon_owners ? wagon_owners['abbr_' + App.Lang] : null;
                var wagon_rents = options.dir_wagon.Directory_WagonsRent;
                if (wagon_rents) {
                    var wagon_rent = wagon_rents.find(function (o) {
                        return o.rent_end === null;
                    });
                    if (wagon_rent) {
                        var dir_oper = wagon_rent.Directory_OperatorsWagons;
                        rent_operator = dir_oper ? dir_oper['abbr_' + App.Lang] : null;
                        var dir_ll = wagon_rent.Directory_LimitingLoading;
                        rent_limiting = dir_ll ? dir_ll['limiting_abbr_' + App.Lang] : null;
                    }
                }
                note_uz = options.dir_wagon.note;
                // Текущая операция
                this.ids_wsd.getWagonInternalOperationOfIDWIR(wagon.id_wir, function (list) {

                });
                //current_condition wagon['arrival_uz_vagon_condition_abbr_' + App.Lang]


            };
            if (options && options.id_group) {
                outgoing_uz_vagon_id_group = options.id_group;
            }
            if (options && options.id_division) {
                var outgoing_uz_vagon_id_division = options.id_division;
            }
            if (options && options.division_code) {
                var outgoing_uz_vagon_division_code = options.division_code
            }
            //laden // коректируем по грузу
        }
        // Проверим это правка
        if (this.wagon_settings.type === 1 && this.wagon_settings.info) {
            // Да заполним
            gruzp_uz = this.wagon_settings.info.carrying_capacity ? this.wagon_settings.info.carrying_capacity : gruzp_uz;         //
            tara_uz = this.wagon_settings.info.tara ? this.wagon_settings.info.tara : tara_uz;
            owner_name = this.wagon_settings.info.owner !== null && this.wagon_settings.info.owner !== '' ? this.wagon_settings.info.owner : owner_name;
            note_uz = (wagon_settings.info.exit_ban !== null ? wagon_settings.info.exit_ban + '; ' : '') + (wagon_settings.info.other_bans !== null ? wagon_settings.info.other_bans.replace(/<br>/g, '') : note_uz);
        }

        this.elements.input_number_num_car.val(wagon.num);
        this.elements.input_number_position_outgoing.val(this.wagon_settings.type === 1 ? this.wagon_settings.position : wagon.outgoing_car_position_outgoing);
        this.elements.input_text_num_cont_1.val(wagon.outgoing_uz_vagon_cont_1_nom_cont);
        this.elements.input_text_num_cont_2.val(wagon.outgoing_uz_vagon_cont_2_nom_cont);
        this.elements.input_datetime_date_outgoing_act.val(wagon.outgoing_car_date_outgoing_act); // уберем дату
        this.elements.autocomplete_reason_discrepancy_amkr.text(wagon['outgoing_car_reason_discrepancy_amkr_name_' + App.Lang]);
        this.elements.autocomplete_reason_discrepancy_uz.text(wagon['outgoing_car_reason_discrepancy_uz_name_' + App.Lang]);
        //
        this.elements.input_text_adm_kod.val(adm_kod);
        this.elements.input_text_rod_vag_abbr.val(wagon['outgoing_uz_vagon_rod_abbr_' + App.Lang]);
        this.elements.input_text_gruzp_uz.val(gruzp_uz);
        this.elements.input_text_tara_uz.val(tara_uz);
        //
        this.elements.input_text_condition_arrival.val(wagon['arrival_uz_vagon_condition_abbr_' + App.Lang]);
        //this.wagon_settings.type === 1 ? wagon['last_operation_condition_' + App.Lang] : wagon['outgoing_uz_vagon_condition_abbr' + App.Lang]
        this.elements.input_text_condition_present.val(current_condition);
        // -------------------------------------------
        var vagonik = wagon.outgoing_car_vagonnik_user ? wagon.outgoing_car_vagonnik_user : '';
        var vagonik_data = wagon.outgoing_car_vagonnik ? '(' + (wagon.outgoing_car_vagonnik ? moment(wagon.outgoing_car_vagonnik).format(format_datetime) : '') + ')' : '';
        var vagonik_note = wagon.outgoing_car_note_vagonnik ? wagon.outgoing_car_note_vagonnik : '';
        this.elements.textarea_condition_present.val(vagonik || vagonik_data || vagonik_note ? langView('fogcd_value_vagonnik', App.Langs).format(vagonik + vagonik_data, vagonik_note) : '-');
        // ---------- ЗАДЕРЖАНИЯ ------------------------------------------------------------------------------------
        this.wiew_detention_wagon_detali(wagon);
        // ---------- ВОЗВРАТЫ ------------------------------------------------------------------------------------
        this.wiew_return_wagon_detali(wagon)
        //this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
        // Данные о погрузке
        this.elements.checkbox_loaded_car.val(laden);

        this.elements.autocomplete_cargo_name.val(outgoing_uz_vagon_id_group);

        this.elements.input_text_loading_devision_code.val(outgoing_uz_vagon_division_code);
        this.elements.autocomplete_loading_devision.val(outgoing_uz_vagon_id_division);
        this.elements.input_text_code_station_to.val(outgoing_uz_vagon_to_station_uz_code);
        this.elements.autocomplete_name_station_to.val(outgoing_uz_vagon_to_station_uz_code);
        this.elements.input_text_owner_name.val(owner_name);
        this.elements.input_text_operator_name.val(rent_operator);
        this.elements.input_text_limiting_loading_amkr.val(rent_limiting);
        this.elements.textarea_limiting_loading_uz.val(note_uz);
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
    }
    // Показать детали задержания
    form_outgoing_cars_detali.prototype.wiew_detention_wagon_detali = function (wagon) {
        var id_outgoing_detention = wagon.outgoing_car_id_outgoing_detention
        this.elements.autocomplete_cause_detention.val(wagon.outgoing_car_id_detention_return);
        this.elements.input_datetime_detention_start.val(wagon.outgoing_car_detention_date_start); // уберем дату
        this.elements.input_datetime_detention_stop.val(wagon.outgoing_car_detention_date_stop); // уберем дату
        // обновим состояние элементов
        if (this.wagon_settings.type === 0) {
            this.elements.button_detention_edit.hide();
            this.elements.button_detention_save.hide();
        } else {
            if (id_outgoing_detention) {
                if (wagon.outgoing_car_detention_date_stop === null) {
                    this.elements.button_detention_edit.hide();
                    this.elements.button_detention_save.show();
                } else {
                    this.elements.button_detention_edit.show();
                    this.elements.button_detention_save.hide();
                    // скроем элементы
                    this.form.obj_form.validations[1].$elements.each(function () {
                        this.prop('disabled', true);
                    });
                }
            } else {
                this.elements.button_detention_edit.hide();
                this.elements.button_detention_save.show();
            }
        }
    };
    // Показать детали возврата
    form_outgoing_cars_detali.prototype.wiew_return_wagon_detali = function (wagon) {
        // Найдем все возвраты
        LockScreen(langView('fogcd_mess_load_return_wagon', App.Langs));
        var current_return_wagons = null;
        this.ids_wsd.getOutgoingDetentionReturnOfNum(wagon.num, function (return_wagons) {

            if (return_wagons && return_wagons.length > 0) {
                this.table_outgoing_detention_return.view(return_wagons, null);
                current_return_wagons = return_wagons.find(function (o) {
                    return o.date_stop === null;
                });
            } else {
                this.table_outgoing_detention_return.view([], null);
            };
            // обновим состояние элементов
            if (this.wagon_settings.type === 0) {
                this.elements.button_return_open.hide();
                this.elements.button_return_close.hide()
            } else {
                if (current_return_wagons) {
                    this.current_id_return_wagons = current_return_wagons.id; // Сохраним текущий id открытой строки возврата
                    // Показать возврат
                    this.elements.button_return_open.hide();
                    this.elements.button_return_close.show();
                    this.elements.autocomplete_cause_return.val(current_return_wagons.id_detention_return);
                    this.elements.input_datetime_return_start.val(current_return_wagons.date_start); // уберем дату
                    this.elements.input_datetime_return_stop.val(current_return_wagons.date_stop); // уберем дату
                    this.elements.input_text_return_num_act.val(current_return_wagons.num_act);
                    this.elements.input_datetime_return_date_act.val(current_return_wagons.date_act); // уберем дату
                    this.elements.textarea_return_note.val(current_return_wagons.note);
                    this.elements.autocomplete_cause_return.disable();
                    this.elements.input_datetime_return_start.disable();
                } else {
                    this.current_id_return_wagons = null;
                    this.elements.button_return_open.show();
                    this.elements.button_return_close.hide();
                    this.elements.autocomplete_cause_return.val('');
                    this.elements.input_datetime_return_start.set(null); // уберем дату
                    this.elements.input_datetime_return_stop.set(null); // уберем дату
                    this.elements.input_text_return_num_act.val('');
                    this.elements.input_datetime_return_date_act.set(null); // уберем дату
                    this.elements.textarea_return_note.val('');
                    this.elements.input_datetime_return_stop.disable();
                };
            };
            LockScreenOff();
        }.bind(this));
    };
    //----------------------------------------------------------------
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.close = function () {
        this.clear_form();
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
    };
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.view = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.elements.button_present_car.hide();
        this.elements.button_return_car.show();
        this.elements.button_car_return.hide();
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Задержание
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.hide();
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Возврат
        this.elements.button_return_open.hide();
        this.elements.button_return_close.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });

    };
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.edit = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.elements.button_present_car.show();
        this.elements.button_return_car.hide();
        this.elements.button_car_return.show();
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        //-- Задержание
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.hide();
        this.form.obj_form.validations[1].$elements.each(function () {
            //this.prop('disabled', true);
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        //-- Возврат
        this.elements.button_return_open.hide();
        this.elements.button_return_close.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            //this.prop('disabled', true);
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
    };
    //----------------------------------------------------------------
    // Валидация формы задержания
    form_outgoing_cars_detali.prototype.validation_wagon_detention = function () {
        this.form.validation_detention.clear_all();
        var valid = true;
        valid = valid & this.form.validation_detention.check_control_autocomplete(this.elements.autocomplete_cause_detention, langView('fogcd_mess_valid_cause_detention', App.Langs), '', langView('fogcd_mess_valid_not_cause_detention', App.Langs), true);
        // Проверка на время начало и конца
        var valid_start = this.form.validation_detention.check_control_datetime_input(this.elements.input_datetime_detention_start, langView('fogcd_mess_valid_not_detention_start', App.Langs), '', true);
        var valid_stop = this.form.validation_detention.check_control_datetime_input(this.elements.input_datetime_detention_stop, langView('fogcd_mess_valid_not_detention_stop', App.Langs), '', true);
        // Проверим временные интервалы 120<start<120
        if (valid_start && valid_stop) {
            var current = moment();
            var detention_start = moment(this.elements.input_datetime_detention_start.val());
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_start = current.diff(detention_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_start >= max_err_detention_start || minute_start <= min_err_detention_start) {
                valid = valid & this.form.validation_detention.set_object_error(this.elements.input_datetime_detention_start.$element, langView('fogcd_mess_valid_not_deff_date_detention', App.Langs).format(min_err_detention_start, max_err_detention_start));
            }
            var detention_stop = moment(this.elements.input_datetime_detention_stop.val());
            // Проверим на разницу между началом и концом задержания
            var minute = detention_stop.diff(detention_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute <= 0 || minute > max_err_detention_deff) {
                valid = valid & this.form.validation_detention.set_object_error(this.elements.input_datetime_detention_stop.$element, langView('fogcd_mess_valid_not_deff_date_detention_start_stop', App.Langs).format(max_err_detention_deff));
            }
        }
        return valid;
    };
    // Валидация формы возврат
    form_outgoing_cars_detali.prototype.validation_wagon_return = function (attr_close) {
        this.form.validation_return.clear_all();
        var valid = true;
        valid = valid & this.form.validation_return.check_control_autocomplete(this.elements.autocomplete_cause_return, langView('fogcd_mess_valid_cause_return', App.Langs), '', langView('fogcd_mess_valid_not_cause_return', App.Langs), true);
        // Проверка на время начало и конца
        var valid_start = this.form.validation_return.check_control_datetime_input(this.elements.input_datetime_return_start, langView('fogcd_mess_valid_not_return_start', App.Langs), '', true);
        var current = moment();
        var return_start = moment(this.elements.input_datetime_return_start.val());
        valid = valid & valid_start;
        if (valid_start && !attr_close) {
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_start = current.diff(return_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_start >= max_err_return_start || minute_start <= min_err_return_start) {
                valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_start.$element, langView('fogcd_mess_valid_not_deff_date_return', App.Langs).format(min_err_return_start, max_err_return_start));
            }
        }
        if (attr_close) {
            var valid_stop = this.form.validation_return.check_control_datetime_input(this.elements.input_datetime_return_stop, langView('fogcd_mess_valid_not_return_stop', App.Langs), '', true);
            valid = valid & valid_stop;
            if (valid_stop) {
                var return_stop = moment(this.elements.input_datetime_return_stop.val());
                var minute_stop = current.diff(return_stop, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_stop >= max_err_return_stop || minute_stop <= min_err_return_stop) {
                    valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_stop.$element, langView('fogcd_mess_valid_not_deff_date_stop_return', App.Langs).format(min_err_return_stop, max_err_return_stop));
                }
                // Проверим на разницу между началом и концом задержания
                var minute_deff = return_stop.diff(return_start, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_deff <= 0) {
                    valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_stop.$element, langView('fogcd_mess_valid_not_deff_date_return_start_stop', App.Langs));
                }
            }
        }
        valid = valid & this.form.validation_return.set_object_ok(this.elements.input_text_return_num_act.$element, '');
        valid = valid & this.form.validation_return.check_control_datetime_input_null(this.elements.input_datetime_return_date_act, langView('fogcd_mess_valid_error_date_act', App.Langs), '', true);
        valid = valid & this.form.validation_return.set_object_ok(this.elements.textarea_return_note.$element, '');
        return valid;
    };
    //----------------------------------------------------------------
    // Выполнить операцию сохранить задержание
    form_outgoing_cars_detali.prototype.action_save_detention = function () {
        this.elements.button_detention_save.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_detention();
        if (valid) {
            this.form.validation_detention.clear_all();
            this.modal_confirm_form.view(langView('fogcd_form_detention', App.Langs), langView('fogcd_form_detention_message', App.Langs), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_update_operation_detention', App.Langs));
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
                            this.form.validation_detention.out_info_message(langView('fogcd_mess_ok_operation_detention', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.form.validation_detention.out_error_message(langView('fogcd_mess_error_operation_detention', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные
                        this.update_wagon(function (wagon) {
                            this.wiew_detention_wagon_detali(wagon);
                            this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this));
                    this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                } else {
                    this.form.validation_detention.out_warning_message(langView('fogcd_mess_cancel_operation_detention', App.Langs))
                    this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_detention_save.prop("disabled", false); // сделаем активной
        }
    };
    // Выполнить операцию правка задержаня
    form_outgoing_cars_detali.prototype.action_edit_detention = function () {
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.show();
        // раскроем элементы
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', false);
        });
    };
    // Открыть возврат
    form_outgoing_cars_detali.prototype.action_return_open = function () {
        this.elements.button_return_open.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_return(false);
        if (valid) {
            this.form.validation_return.clear_all();
            this.modal_confirm_form.view(langView('fogcd_form_return_open', App.Langs), langView('fogcd_form_return_open_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_update_operation_return_open', App.Langs));
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
                            this.form.validation_return.out_info_message(langView('fogcd_mess_ok_operation_return_open', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.form.validation_return.out_error_message(langView('fogcd_mess_error_operation_return_open', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные полностью
                        if (typeof this.settings.fn_update === 'function') {
                            this.settings.fn_update();
                        };
                        this.elements.button_return_open.prop("disabled", false); // сделаем активной
                        LockScreenOff();
                    }.bind(this));
                    this.elements.button_return_open.prop("disabled", false); // сделаем активной
                } else {
                    this.form.validation_return.out_warning_message(langView('fogcd_mess_cancel_operation_return_open', App.Langs))
                    this.elements.button_return_open.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_return_open.prop("disabled", false); // сделаем активной
        }
    };
    // закрыть возврат
    form_outgoing_cars_detali.prototype.action_return_close = function () {
        this.elements.button_return_close.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_return(true);
        if (valid) {
            this.form.validation_return.clear_all();
            this.modal_confirm_form.view(langView('fogcd_form_return_close', App.Langs), langView('fogcd_form_return_close_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_update_operation_return_close', App.Langs));
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
                                this.form.validation_return.out_info_message(langView('fogcd_mess_ok_operation_return_close', App.Langs));
                            } else {
                                // Ошибка выполнения
                                this.form.validation_return.out_error_message(langView('fogcd_mess_error_operation_return_close', App.Langs) + result_operation);
                                LockScreenOff();
                            }
                            // Обновим данные
                            this.update_wagon(function (wagon) {
                                this.wiew_return_wagon_detali(wagon);
                                this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                                LockScreenOff();
                            }.bind(this));
                            this.elements.button_return_close.prop("disabled", false); // сделаем активной
                            LockScreenOff();
                        }.bind(this));
                        this.elements.button_return_close.prop("disabled", false); // сделаем активной

                    } else {
                        // Не определен id строки возврата
                        this.form.validation_return.out_warning_message(langView('fogcd_mess_error_operation_return_close_not_id', App.Langs))
                        this.elements.button_return_close.prop("disabled", false); // сделаем активной
                        LockScreenOff();
                    };

                } else {
                    // Отмена операции
                    this.form.validation_return.out_warning_message(langView('fogcd_mess_cancel_operation_return_close', App.Langs))
                    this.elements.button_return_close.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_return_close.prop("disabled", false); // сделаем активной
        }
    };
    //----------------------------------------------------------------
    // Очистить сообщения об ошибках
    form_outgoing_cars_detali.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    };
    // Показать сообщение ошибки
    form_outgoing_cars_detali.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать сообщение предупреждения
    form_outgoing_cars_detali.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    form_outgoing_cars_detali.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Удалить объект
    form_outgoing_cars_detali.destroy = function () {
        this.modal_confirm_form.destroy();
        this.form.destroy();
        this.mf_edit.destroy();
    };

    App.form_outgoing_cars_detali = form_outgoing_cars_detali;

    window.App = App;

})(window);