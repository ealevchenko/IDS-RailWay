/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль Форма "Добавить или править состав по прибытию на АМКР"*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_err_date_arrival = -2 * 60;         // TODO: Минимальная разница в минутах дата прибытия
    var max_err_date_arrival = 2 * 60;          // TODO: Максимальная разница в минутах дата прибытия
    var max_err_date_adoption = 3 * 24 * 60;    // TODO: Максимальная разница в минутах дата приема
    var min_err_date_adoption_act = -2 * 60;    // TODO: Минимальная разница в минутах дата приема по акту
    var max_err_date_arrival_act = 2 * 60;      // TODO: Максимальная разница в минутах дата приема по акту

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'fhiis_title_edit': 'Ок',
            'fhiis_title_cancel': 'Отмена',

            'fhiis_title_label_num_doc': '№ Документа:',
            'fhiis_title_placeholder_num_doc': '№Документа',
            'fhiis_title_label_train': '№ Поезда:',
            'fhiis_title_placeholder_train': '№Поезда',
            'fhiis_title_label_composition_index': 'Индекс поезда',
            'fhiis_title_placeholder_composition_index': 'Индекс поезда',
            'fhiis_title_label_date_arrival': 'Дата и время прибытия:',
            'fhiis_title_placeholder_date_arrival': 'Время прибытия',
            'fhiis_title_label_date_adoption': 'Дата и время приема:',
            'fhiis_title_placeholder_date_adoption': 'Время приема',
            'fhiis_title_label_date_adoption_act': 'Дата и время приема (акт):',
            'fhiis_title_placeholder_date_adoption_act': 'Время приема (акт)',
            'fhiis_title_label_station_from': 'Прибытие со станции:',
            'fhiis_title_placeholder_station_from': 'Станция прибытия:',
            'fhiis_title_label_station_on': 'Принять на станцию:',
            'fhiis_title_placeholder_station_on': 'Принять на станцию:',
            'fhiis_title_label_way': 'Принять на путь:',
            'fhiis_title_placeholder_way': 'Принять на путь:',
            'fhiis_title_label_numeration': 'Начало нумерации с:',
            'fhiis_title_placeholder_numeration': 'Принять на путь:',
            'fhiis_title_head': 'Голова',
            'fhiis_title_tail': 'Хвост',

            'fhiis_title_label_note': 'Примечание:',
            'fhiis_title_placeholder_note': 'Примечание',
            'fhiis_title_form_add': 'Добавить состав',
            'fhiis_title_form_edit': 'Править состав',
            'fhiis_title_form_arrival': 'Принять состав',
            'fhiis_mess_init_module': 'Инициализация модуля(form_hi_incoming_sostav)...',
            'fhiis_mess_operation_run': 'Выполняю операцию...',
            'fhiis_error_date_arrival': 'Укажите правильно дату и время',
            'fhiis_error_date_arrival_not_deff_date_curent': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от текущего времени',
            'fhiis_error_date_arrival_not_deff_date_curent_arrival': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от прошлой даты прибытия {2}',
            'fhiis_error_date_arrival_not_deff_date_adoption': 'Дата и время прибытия должны быть не меньше {0} мин. и не равно {1} времени приема',
            'fhiis_error_date_arrival_not_deff_date_adoption_act': 'Дата и время прибытия по акту должны быть не меньше {0} мин. или больше {1} мин. от времени приема.',
            'fhiis_mess_error_add_sostav': 'Ошибка выполнения операции "Создать состав прибытия", код ошибки = ',
            'fhiis_mess_error_edit_sostav': 'Ошибка выполнения операции "Обновить состав прибытия", код ошибки = ',
            'fhiis_mess_error_operation_arrival_sostav': 'Ошибка выполнения операции "ПРИНЯТЬ СОСТАВ НА АМКР", код ошибки = ',

        },
        'en':  //default language: English
        {
            'fhiis_title_edit': 'OK',
            'fhiis_title_cancel': 'Cancel',
            'fhiis_title_label_train': 'Train #:',
            'fhiis_title_placeholder_train': 'Train#',
            'fhiis_title_label_composition_index': 'Train index',
            'fhiis_title_placeholder_composition_index': 'Train Index',
            'fhiis_title_label_date_arrival': 'Date and time of arrival:',
            'fhiis_title_placeholder_date_arrival': 'Arrival Time',
            'fhiis_title_label_station_from': 'Arrived from station:',
            'fhiis_title_placeholder_station_from': 'Arrival Station:',
            'fhiis_title_label_note': 'Note:',
            'fhiis_title_placeholder_note': 'Note',
            'fhiis_title_form_add': 'Add Form',
            'fhiis_title_form_edit': 'Edit Composition',
            'fhiis_mess_init_module': 'Module initialization(form_hi_incoming_sostav)...',
            'fhiis_mess_operation_run': 'Performing an operation...',
            'fhiis_error_date_arrival': 'Please enter the correct date and time',
            'fhiis_error_date_arrival_not_deff_date_current': 'Date and time of arrival must be at least {0} min. or more {1} min. from current time',
            'fhiis_error_date_arrival_not_deff_date_current_arrival': 'Date and time of arrival must be at least {0} min. or more {1} min. from last arrival date {2}',
            'fhiis_error_date_arrival_not_deff_date_adoption': 'Date and time of arrival must be at least {0} min. and not equal to {1} reception time',
            'fhiis_mess_error_add_sostav': 'Error performing "Create arrival composition" operation, error code = ',
            'fhiis_mess_error_edit_sostav': 'Error performing "Update arrival composition" operation, error code = ',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    function form_hi_incoming_sostav() {
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_hi_incoming_sostav.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_hi_incoming_sostav.prototype.init = function (options) {
        this.init = true;
        LockScreen(langView('fhiis_mess_init_module', App.Langs));
        this.settings = $.extend({
            id: 'fhiis',
            mode: 0,
            alert: null,
            ids_wsd: null,
            fn_init: null,
            fn_add: null,
            fn_edit: null,
            fn_delete: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = new directory();

        this.list_station_from = [];
        this.list_station_on = [];
        this.list_ways = [];
        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station', 'ways'], false, function (result) {
            // Подгрузили списки
            this.list_station_from = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === true && i.station_delete === null; });
            this.list_station_on = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.exit_uz && i.station_delete === null; });
            this.list_ways = [];
            this.list_numeration = []
            this.list_numeration.push({ value: 0, text: langView('fhiis_title_head', App.Langs) });
            this.list_numeration.push({ value: 1, text: langView('fhiis_title_tail', App.Langs) });
            //-------------------------------------
            // Создать модальную форму "Окно сообщений"
            var MCF = App.modal_confirm_form;
            this.modal_confirm_form = new MCF(this.settings.id); // Создадим экземпляр окно сообщений
            this.modal_confirm_form.init();

            // Создать модальную форму "Править"
            var MF = App.modal_form
            this.mf_edit = new MF();
            this.mf_edit.init({
                alert: null,
                id: 'mfhiis-' + this.settings.id,
                prefix: null,
                cl_modal: null,
                //form: this.form,
                label_ok: langView('fhiis_title_edit', App.Langs),
                label_close: langView('fhiis_title_cancel', App.Langs),
                ok_click: function (e) {
                    e.preventDefault();
                    if (this.form) {
                        this.form['$form_' + this.form.mode].submit();
                    }
                }.bind(this),
                //close_click: function () {

                //},
            });
            this.mf_edit.modal.$modal_bt_ok
            // Создадим форму правки операторов
            var FIF = App.form_infield;
            this.form = new FIF();

            // Определим поля
            var fl_id = {
                field: 'id',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: 0,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_id_arrived = {
                field: 'id_arrived',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_id_sostav = {
                field: 'id_sostav',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_train = {
                field: 'train',
                type: 'number',
                add: 'text',
                edit: 'text',
                name: 'train',
                label: langView('fhiis_title_label_train', App.Langs),
                placeholder: langView('fhiis_title_placeholder_train', App.Langs),
                maxlength: 4,
                required: true,
                pattern: '[0-9]{4}',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 2,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_composition_index = {
                field: 'composition_index',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'composition_index',
                label: langView('fhiis_title_label_composition_index', App.Langs),
                placeholder: langView('fhiis_title_placeholder_composition_index', App.Langs),
                maxlength: 13,
                required: true,
                pattern: '[0-9]{4}\-[0-9]{3}\-[0-9]{4}',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 2,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_date_arrival = {
                field: 'date_arrival',
                type: 'datetime',
                add: 'datetime',
                edit: 'datetime',
                name: 'date_arrival',
                prefix: null,
                label: langView('fhiis_title_label_date_arrival', App.Langs),
                placeholder: langView('fhiis_title_placeholder_date_arrival', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 3,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_date_adoption = {
                field: 'date_adoption',
                type: 'datetime',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_date_adoption_1 = {
                field: 'date_adoption',
                type: 'datetime',
                add: 'datetime',
                edit: 'datetime',
                name: 'date_adoption',
                prefix: null,
                label: langView('fhiis_title_label_date_adoption', App.Langs),
                placeholder: langView('fhiis_title_placeholder_date_adoption', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_date_adoption_act = {
                field: 'date_adoption_act',
                type: 'datetime',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_date_adoption_act_1 = {
                field: 'date_adoption_act',
                type: 'datetime',
                add: 'datetime',
                edit: 'datetime',
                name: 'date_adoption_act',
                prefix: null,
                label: langView('fhiis_title_label_date_adoption_act', App.Langs),
                placeholder: langView('fhiis_title_placeholder_date_adoption_act', App.Langs),
                maxlength: null,
                required: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_station_from = {
                field: 'id_station_from',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'station_from',
                prefix: null,
                label: langView('fhiis_title_label_station_from', App.Langs),
                placeholder: langView('fhiis_title_placeholder_station_from', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.list_station_from,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());

                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 3,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_station_on = {
                field: 'id_station_on',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_station_on_1 = {
                field: 'id_station_on',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'station_on',
                prefix: null,
                label: langView('fhiis_title_label_station_on', App.Langs),
                placeholder: langView('fhiis_title_placeholder_station_on', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.list_station_on,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    if (id > 0) {
                        this.form.disabled('id_way', false);
                        this.list_station_on = this.ids_dir.getListWays2('id', 'way_num', 'way_name', App.Lang, function (i) { return !i.way_delete && i.id_station === id && i.crossing_uz });
                        if (this.settings.mode === 1) {
                            this.ids_wsd.getCurrentNumArrivalSostavOfStation(id, function (current_num) {
                                this.form.set('num_doc', Number(current_num) + 1);
                            }.bind(this))
                        }
                    } else {
                        this.form.disabled('id_way', true);
                        this.list_station_on = [];
                    }
                    this.form.update_list_element('id_way', this.list_station_on, -1);
                }.bind(this),
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 6,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_way = {
                field: 'id_way',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: false,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_way_1 = {
                field: 'id_way',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'way',
                prefix: null,
                label: langView('fhiis_title_label_way', App.Langs),
                placeholder: langView('fhiis_title_placeholder_way', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 6,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_num_doc = {
                field: 'num_doc',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_num_doc_1 = {
                field: 'num_doc',
                type: 'int',
                add: 'text',
                edit: 'text',
                name: 'num_doc',
                prefix: null,
                label: langView('fhiis_title_label_num_doc', App.Langs),
                placeholder: langView('fhiis_title_placeholder_num_doc', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 1,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_numeration = {
                field: 'numeration',
                type: 'checkbox',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: false,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_numeration_1 = {
                field: 'numeration',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'numeration',
                prefix: null,
                label: langView('fhiis_title_label_numeration', App.Langs),
                placeholder: langView('fhiis_title_placeholder_numeration', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.list_numeration,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: 0,
                row: 1,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_count = {
                field: 'count',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_status = {
                field: 'status',
                type: 'number',
                add: null,
                edit: null,
                name: null,
                prefix: null,
                label: null,
                placeholder: null,
                maxlength: null,
                required: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: 0,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_note = {
                field: 'note',
                type: 'string',
                add: 'textarea',
                edit: 'textarea',
                name: 'note',
                label: langView('fhiis_title_label_note', App.Langs),
                placeholder: langView('fhiis_title_placeholder_note', App.Langs),
                maxlength: 200,
                required: false,
                pattern: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 7,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_create = {
                field: 'create',
                type: 'datetime',
                add: null,
                edit: null,
                name: null,
                label: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: moment().format("YYYY-MM-DDThh:mm:ss"), //.utc().toISOString(),
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_create_user = {
                field: 'create_user',
                type: 'string',
                add: null,
                edit: null,
                name: null,
                label: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: App.User_Name,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_change = {
                field: 'change',
                type: 'datetime',
                add: null,
                edit: null,
                name: null,
                label: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fl_change_user = {
                field: 'change_user',
                type: 'string',
                add: null,
                edit: null,
                name: null,
                label: null,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: null,
                col: null,
                col_prefix: null,
                col_size: null,
            };
            var fields = [];
            fields.push(fl_id);
            fields.push(fl_id_arrived);
            fields.push(fl_id_sostav);
            fields.push(fl_train);
            fields.push(fl_composition_index);
            fields.push(fl_date_arrival);
            fields.push(this.settings.mode === 0 ? fl_date_adoption : fl_date_adoption_1);
            fields.push(this.settings.mode === 0 ? fl_date_adoption_act : fl_date_adoption_act_1);
            fields.push(fl_station_from);
            fields.push(this.settings.mode === 0 ? fl_station_on : fl_station_on_1);
            fields.push(this.settings.mode === 0 ? fl_way : fl_way_1);
            fields.push(this.settings.mode === 0 ? fl_num_doc : fl_num_doc_1);
            fields.push(this.settings.mode === 0 ? fl_numeration : fl_numeration_1);
            fields.push(fl_count);
            fields.push(fl_status);
            fields.push(fl_note);
            fields.push(fl_create);
            fields.push(fl_create_user);
            fields.push(fl_change);
            fields.push(fl_change_user);
            // Инициализация формы
            this.form.init({
                alert: this.mf_edit.alert, // Подключим Alert модальной формы
                fields: fields,
                mb: 2,
                id: null,
                cl_form: '',
                validation: true,
                fn_init: function (init) {
                    // Окончание инициализации
                    // Добавим в мондальное окно форму правки
                    if (this.form && this.form.$form_add && this.form.$form_edit) {
                        this.mf_edit.$body.append(this.form.$form_add).append(this.form.$form_edit);
                    }
                    if (typeof this.settings.fn_init === 'function') {
                        this.settings.fn_init(this.init);
                    }
                }.bind(this),
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            this.save(result);
                        }
                    }
                }.bind(this),
            });


            //-------------------------------------
        }.bind(this));
    }
    // Уточняющая валидация данных 
    form_hi_incoming_sostav.prototype.validation = function (result) {
        var valid = true;
        //// Сдесь можно проверить дополнительно
        var current = moment();
        var current_date_arrival = result.old && result.old.date_arrival ? moment(result.old.date_arrival) : null;
        var date_arrival = moment(result.new.date_arrival);
        var date_adoption = result.new.date_adoption ? moment(result.new.date_adoption) : null;
        var date_adoption_act = result.new.date_adoption_act ? moment(result.new.date_adoption_act) : null;

        if (date_arrival.isValid) {
            // Если это операция добавить, проверим на время
            if (result.old === null) {
                // Проверим временной период предъявления - будущее + Прошлое
                var minute_arrival = current.diff(date_arrival, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_arrival >= max_err_date_arrival || minute_arrival <= min_err_date_arrival) {
                    if (this.settings.mode === 0) {
                        this.form.set_object_error('date_arrival', langView('fhiis_error_date_arrival_not_deff_date_curent', App.Langs).format(min_err_date_arrival, max_err_date_arrival));
                    } else {
                        this.form.set_object_error('date_adoption', langView('fhiis_error_date_arrival_not_deff_date_curent', App.Langs).format(min_err_date_arrival, max_err_date_arrival));
                    }
                    valid = valid & false;
                }
            } else {
                // Форма правим, проверим чтобы дата прибытия была меньше даты принятия на определенное время
                if (date_adoption !== null && date_adoption.isValid) {
                    // Есть дата приема, тогда пляшем вокруг ее
                    // Проверим временной период предъявления - будущее + Прошлое
                    var minute_adoption = date_adoption.diff(date_arrival, 'minute');
                    //- зашло в будущее + зашло в прошлое
                    if (minute_adoption >= max_err_date_adoption || minute_adoption < 0) {
                        this.form.set_object_error('date_arrival', langView('fhiis_error_date_arrival_not_deff_date_adoption', App.Langs).format(max_err_date_adoption, date_adoption.format(format_datetime)));
                        valid = valid & false;
                    }
                    // Проверим дату приема по акту
                    if (date_adoption_act !== null && date_adoption_act.isValid) {
                        var minute_adoption = date_adoption_act.diff(date_adoption, 'minute');
                        //- зашло в будущее + зашло в прошлое
                        if (minute_adoption >= max_err_date_arrival_act || minute_adoption < min_err_date_adoption_act) {
                            this.form.set_object_error('date_adoption_act', langView('fhiis_error_date_arrival_not_deff_date_adoption_act', App.Langs).format(max_err_date_arrival_act, min_err_date_adoption_act));
                            valid = valid & false;
                        }
                    }
                } else {
                    // Нет дата приема, тогда пляшем вокруг старой даты прибытия
                    if (current_date_arrival.isValid) {
                        // Проверим временной период предъявления - будущее + Прошлое
                        var minute_arrival = current_date_arrival.diff(date_arrival, 'minute');
                        //- зашло в будущее + зашло в прошлое
                        if (minute_arrival >= max_err_date_arrival || minute_arrival <= min_err_date_arrival) {
                            this.form.set_object_error('date_arrival', langView('fhiis_error_date_arrival_not_deff_date_curent_arrival', App.Langs).format(min_err_date_arrival, max_err_date_arrival, current_date_arrival.format(format_datetime)));
                            valid = valid & false;
                        }
                    }
                }
            }
        } else {
            this.form.set_object_error('date_arrival', langView('fhiis_error_date_arrival', App.Langs));
            valid = valid & false;
        }
        return valid;
    };
    // Открыть форму добавить
    form_hi_incoming_sostav.prototype.add = function () {
        this.out_clear();
        this.form.view_add();
        this.mf_edit.open(langView('fhiis_title_form_add', App.Langs));
    };
    // Открыть форму править
    form_hi_incoming_sostav.prototype.edit = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        if (this.settings.mode === 1) {
            this.form.disabled('id_way', true);
            this.form.disabled('num_doc', true);
            this.form.set('numeration', 0);
            this.form.set('id_station_on', -1);
            this.mf_edit.open(langView('fhiis_title_form_arrival', App.Langs));
        } else {
            this.mf_edit.open(langView('fhiis_title_form_edit', App.Langs));
        }

    };
    // Сохранить объект
    form_hi_incoming_sostav.prototype.save = function (data) {
        this.out_clear();
        this.update(data);
    };
    // Изменить объект
    form_hi_incoming_sostav.prototype.update = function (data) {
        LockScreen(langView('fhiis_mess_operation_run', App.Langs));
        // Добавить или править состав
        if (this.settings.mode === 0) {
            if (data.old === null) {
                // Добавить
                this.ids_wsd.postIncomingSostav(data.new, function (result) {
                    if (result > 0) {
                        this.mf_edit.close(); // закроем форму
                        if (typeof this.settings.fn_edit === 'function') {
                            this.settings.fn_add({ data: data, result: result });
                        }
                        LockScreenOff();
                    } else {
                        LockScreenOff();
                        this.mf_edit.out_error(langView('fhiis_mess_error_add_sostav', App.Langs) + result);
                    }
                }.bind(this));
            } else {
                // Править
                data.new.change = moment().format("YYYY-MM-DDThh:mm:ss");
                data.new.change_user = App.User_Name;
                this.ids_wsd.putIncomingSostav(data.new, function (result) {
                    if (result > 0) {
                        this.mf_edit.close(); // закроем форму
                        if (typeof this.settings.fn_edit === 'function') {
                            this.settings.fn_edit({ data: data, result: result });
                        }
                        LockScreenOff();
                    } else {
                        LockScreenOff();
                        this.mf_edit.out_error(langView('fhiis_mess_error_edit_sostav', App.Langs) + result);
                    }
                }.bind(this));
            }
        }
        // Принять состав на АМКР
        if (this.settings.mode === 1) {
            var operation = {
                id_arrival_sostav: data.new.id,
                num_doc : Number(data.new.num_doc),
                train: data.new.train,
                composition_index: data.new.composition_index,
                date_arrival: data.new.date_arrival,
                date_adoption: data.new.date_adoption,
                date_adoption_act: data.new.date_adoption_act,
                id_station_from: data.new.id_station_from,
                id_station_on: data.new.id_station_on,
                id_way: data.new.id_way,
                numeration: data.new.numeration === 1 ? true : false,
                count: data.new.count,
                user: App.User_Name,
            }
            // Выполним операцию "Принять состав на АМКР"
            this.ids_wsd.postOperationIncomingSostav(operation, function (result) {
                if (result > 0) {
                    this.mf_edit.close(); // закроем форму
                    if (typeof this.settings.fn_edit === 'function') {
                        this.settings.fn_edit({ data: data, result: result });
                    }
                    //LockScreenOff();
                } else {
                    LockScreenOff();
                    this.mf_edit.out_error(langView('fhiis_mess_error_operation_arrival_sostav', App.Langs) + result);
                }
            }.bind(this));
        }


    };
    // Очистить сообщения
    form_hi_incoming_sostav.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_hi_incoming_sostav.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_hi_incoming_sostav.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_hi_incoming_sostav.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_hi_incoming_sostav.destroy = function () {
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        if (this.mf_edit) {
            this.mf_edit.destroy();
            this.mf_edit = null;
        }
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
    };

    App.form_hi_incoming_sostav = form_hi_incoming_sostav;

    window.App = App;

})(window);