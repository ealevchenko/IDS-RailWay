/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль Форма "Сдать состав на УЗ"*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_err_data_outgoing = -20 * 60;   // TODO: Минимальная разница в часах дата предъявления
    var max_err_data_outgoing = 20 * 60;    // TODO: Максимальная разница в часах дата сдачи
    var list_adm_user = ['EUROPE\\ealevchenko', 'EUROPE\\ivshuba', 'EUROPE\\lvgubarenko', 'EUROPE\\nnlavrenko', 'EUROPE\\osnechaeva'];               // Список админов для правки

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'fhoogs_title_edit': 'Ок',
            'fhoogs_title_cancel': 'Отмена',
            'fhoogs_title_num_doc': '№ ведомости',
            'fhoogs_title_placeholder_num_doc': '№ вед.',
            'fhoogs_title_date_end_inspection_acceptance_delivery': 'Время окон. осм. приемосд.',
            'fhoogs_title_placeholder_date_end_inspection_acceptance_delivery': 'Добавить время',
            'fhoogs_title_date_end_inspection_loader': 'Время окон. осм. грузчиками.',
            'fhoogs_title_placeholder_date_end_inspection_loadery': 'Добавить время',
            'fhoogs_title_date_end_inspection_vagonnik': 'Время окон. осм. вагонниками.',
            'fhoogs_title_placeholder_date_end_inspection_vagonnik': 'Добавить время',
            'fhoogs_title_date_readiness_uz': 'Время готовности к сдаче на УЗ',
            'fhoogs_title_placeholder_date_readiness_uz': 'Добавить время',
            'fhoogs_title_date_outgoing': 'Время сдачи на УЗ',
            'fhoogs_title_placeholder_date_outgoing': 'Добавить время',
            'fhoogs_title_date_outgoing_act': 'Время сдачи на УЗ (по акту)',
            'fhoogs_title_placeholder_date_outgoing_act': 'Добавить время',
            'fhoogs_title_label_station_on': 'Отправить на станцию',
            'fhoogs_title_placeholder_station_on': 'Выберите станцию',
            'fhoogs_title_label_route_sign': 'Маршрут',
            'fhoogs_title_label_composition_index': 'Индекс поезда',
            'fhoogs_title_placeholder_composition_index': 'XXXX-XXX-XXXX',
            'fhoogs_title_form_add': 'Сдать состав',
            'fhoogs_title_form_edit': 'Править сданный состав',
            'fhoogs_mess_init_module': 'Инициализация модуля(form_ho_outgoing_sostav)...',
            'fhoogs_mess_operation_run': 'Выполняю операцию...',
            'fhoogs_error_date_end_inspection_acceptance_delivery': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            'fhoogs_error_date_end_inspection_loader': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            'fhoogs_error_date_end_inspection_vagonnik': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            'fhoogs_error_date_readiness_uz': 'Время готовности к сдаче на УЗ должно быть больше времени осмотров',
            'fhoogs_error_date_outgoing': 'Время сдачи на УЗ должно быть больше времени готовности сдачи на УЗ',
            'fhoogs_error_date_outgoing_act': 'Время сдаче на УЗ по акту должно быть больше времени сдачи на УЗ',
            'fhoogs_error_date_time': 'Укажите правильно дату и время',
            'fhoogs_error_date_outgoing_not_deff_date_detention': 'Дата и время предъявления должны быть не меньше {0} мин. или больше {1} мин. от текущего времени',
            'fhoogs_mess_error_operation_return_present': 'Ошибка выполнения операции "Предъявить состав на УЗ", код ошибки = ',
            'fhoogs_mess_error_operation_return_present1': 'Ошибка расчета платы операции "Предъявить состав на УЗ", код ошибки = ',
        },
        'en':  //default language: English
        {
            'fhoogs_title_edit': 'Ok',
            'fhoogs_title_cancel': 'Cancel',
            'fhoogs_title_num_doc': 'sheet number',
            'fhoogs_title_placeholder_num_doc': 'fhoogs_title_placeholder_num_doc',
            'fhoogs_title_date_end_inspection_acceptance_delivery': 'Windows times. osm. reception ',
            'fhoogs_title_placeholder_date_end_inspection_acceptance_delivery': 'Add Time',
            'fhoogs_title_date_end_inspection_loader': 'Windows time. osm. movers.',
            'fhoogs_title_placeholder_date_end_inspection_loadery': 'Add Time',
            'fhoogs_title_date_end_inspection_vagonnik': 'Windows time. osm. wagons.',
            'fhoogs_title_placeholder_date_end_inspection_vagonnik': 'Add time',
            'fhoogs_title_date_readiness_uz': 'Uz readiness time',
            'fhoogs_title_placeholder_date_readiness_uz': 'Add time',
            'fhoogs_title_date_outgoing': 'Title Date Outgoing',
            'fhoogs_title_placeholder_date_outgoing': 'Add time',
            'fhoogs_title_date_outgoing_act': 'Title delivery time (by act)',
            'fhoogs_title_placeholder_date_outgoing_act': 'Add time',
            'fhoogs_title_label_station_on': 'Send to station',
            'fhoogs_title_placeholder_station_on': 'Select a station',
            'fhoogs_title_label_route_sign': 'Route',
            'fhoogs_title_label_composition_index': 'Train index',
            'fhoogs_title_placeholder_composition_index': 'XXXX-XXX-XXXX',
            'fhoogs_title_form_add': 'Submit Composition',
            'fhoogs_title_form_edit': 'Edit Turned In Form',
            'fhoogs_mess_init_module': 'Module initialization(form_ho_outgoing_sostav)...',
            'fhoogs_mess_operation_run': 'Running operation...',
            'fhoogs_error_date_end_inspection_acceptance_delivery': 'Inspection end time must be greater than AMC present time {0}',
            'fhoogs_error_date_end_inspection_loader': 'Inspection end time must be greater than AMKR presentation time {0}',
            'fhoogs_error_date_end_inspection_vagonnik': 'Inspection end time must be greater than AMKR presentation time {0}',
            'fhoogs_error_date_readiness_uz': 'Uz readiness time must be greater than inspection time',
            'fhoogs_error_date_outgoing': 'OF turn-in time must be greater than OZ ready time',
            'fhoogs_error_date_outgoing_act': 'The turn-in time for the OZ according to the act must be greater than the turn-in time for the OZ',
            'fhoogs_error_date_time': 'Please enter the correct date and time',
            'fhoogs_error_date_outgoing_not_deff_date_detention': 'Date and time of presentation must be at least {0} min. or more {1} min. from current time',
            'fhoogs_mess_error_operation_return_present': 'Error executing operation "Present composition to UZ", error code = ',
            'fhoogs_mess_error_operation_return_present1': 'Error calculating the fee for the operation "Present the train to the UZ", error code = ',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    function form_ho_outgoing_sostav() {
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_ho_outgoing_sostav.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_ho_outgoing_sostav.prototype.init = function (options) {
        this.init = true;
        LockScreen(langView('fhoogs_mess_init_module', App.Langs));
        this.settings = $.extend({
            id: 'fhoogs',
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

        this.list_station = [];

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === true && i.station_delete === null; });
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
                id: 'mfhoogs-' + this.settings.id,
                prefix: 'lg',
                cl_modal: null,
                //form: this.form,
                label_ok: langView('fhoogs_title_edit', App.Langs),
                label_close: langView('fhoogs_title_cancel', App.Langs),
                ok_click: function (e) {
                    e.preventDefault();
                    if (this.form) {
                        this.form['$form_' + this.form.mode].submit();
                    }
                }.bind(this),
                //close_click: function () {

                //},
            });
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
            var fl_num_doc = {
                field: 'num_doc',
                type: 'number',
                add: null,
                edit: 'text',
                name: 'num_doc',
                prefix: null,
                label: langView('fhoogs_title_num_doc', App.Langs),
                placeholder: null,//langView('fhoogs_title_placeholder_num_doc', App.Langs),
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
                col_size: 4,
            };
            var fl_date_end_inspection_acceptance_delivery = {
                field: 'date_end_inspection_acceptance_delivery',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'date_end_inspection_acceptance_delivery',
                prefix: null,
                label: langView('fhoogs_title_date_end_inspection_acceptance_delivery', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_date_end_inspection_acceptance_delivery', App.Langs),
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
                row: 2,
                col: 1,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_date_end_inspection_loader = {
                field: 'date_end_inspection_loader',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'date_end_inspection_loader',
                prefix: null,
                label: langView('fhoogs_title_date_end_inspection_loader', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_date_end_inspection_loadery', App.Langs),
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
                row: 2,
                col: 2,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_date_end_inspection_vagonnik = {
                field: 'date_end_inspection_vagonnik',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'date_end_inspection_vagonnik',
                prefix: null,
                label: langView('fhoogs_title_date_end_inspection_vagonnik', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_date_end_inspection_vagonnik', App.Langs),
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
                row: 2,
                col: 3,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_date_readiness_uz = {
                field: 'date_readiness_uz',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'date_readiness_uz',
                prefix: null,
                label: langView('fhoogs_title_date_readiness_uz', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_date_readiness_uz', App.Langs),
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
                col_size: 4,
            };
            var fl_date_outgoing = {
                field: 'date_outgoing',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'date_outgoing',
                prefix: null,
                label: langView('fhoogs_title_date_outgoing', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_date_outgoing', App.Langs),
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
                col: 2,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_date_outgoing_act = {
                field: 'date_outgoing_act',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'date_outgoing_act',
                prefix: null,
                label: langView('fhoogs_title_date_outgoing_act', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_date_outgoing_act', App.Langs),
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
                row: 3,
                col: 3,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_station_on = {
                field: 'id_station_on',
                type: 'int',
                add: null,
                edit: 'select',
                name: 'station',
                prefix: null,
                label: langView('fhoogs_title_label_station_on', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_station_on', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.list_station,
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
                row: 4,
                col: 1,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_route_sign = {
                field: 'route_sign',
                type: 'boolean',
                add: null,
                edit: 'checkbox',
                name: 'route_sign',
                label: langView('fhoogs_title_label_route_sign', App.Langs),
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
                row: 4,
                col: 2,
                col_prefix: 'md',
                col_size: 4,
            };
            var fl_composition_index = {
                field: 'composition_index',
                type: 'string',
                add: null,
                edit: 'text',
                name: 'composition_index',
                label: langView('fhoogs_title_label_composition_index', App.Langs),
                placeholder: langView('fhoogs_title_placeholder_composition_index', App.Langs),
                maxlength: 100,
                required: null,
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
                row: 4,
                col: 3,
                col_prefix: 'md',
                col_size: 4,
            };
            var fields = [];
            fields.push(fl_id);
            fields.push(fl_num_doc);
            fields.push(fl_station_on);
            fields.push(fl_date_end_inspection_acceptance_delivery);
            fields.push(fl_date_end_inspection_loader);
            fields.push(fl_date_end_inspection_vagonnik);
            fields.push(fl_date_readiness_uz);
            fields.push(fl_date_outgoing);
            fields.push(fl_date_outgoing_act);
            fields.push(fl_composition_index);
            fields.push(fl_route_sign);
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
                            result.new.status = result.old.status; // передадим текущий статус
                            result.new.user = App.User_Name;
                            this.save(result.new);
                        }
                    }
                }.bind(this),
            });
            //-------------------------------------
        }.bind(this));
    }
    // Уточняющая валидация данных 
    form_ho_outgoing_sostav.prototype.validation = function (result) {
        var valid = true;
        var user_adm = list_adm_user.indexOf(App.User_Name) >= 0;
        if (user_adm) return valid;
        // Сдесь можно проверить дополнительно
        var current = moment();
        var date_readiness_amkr = moment(result.old.date_readiness_amkr);
        var sostav_date_end_inspection_acceptance_delivery = result.new.date_end_inspection_acceptance_delivery ? moment(result.new.date_end_inspection_acceptance_delivery) : null;
        var sostav_date_end_inspection_loader = result.new.date_end_inspection_loader ? moment(result.new.date_end_inspection_loader) : null;
        var sostav_date_end_inspection_vagonnik = result.new.date_end_inspection_vagonnik ? moment(result.new.date_end_inspection_vagonnik) : null;
        var sostav_date_readiness_uz = result.new.date_readiness_uz ? moment(result.new.date_readiness_uz) : null;
        var sostav_date_outgoing = result.new.date_outgoing ? moment(result.new.date_outgoing) : null;
        var sostav_date_outgoing_act = result.new.date_outgoing_act ? moment(result.new.date_outgoing_act) : null;

        if (date_readiness_amkr.isValid &&
            sostav_date_end_inspection_acceptance_delivery.isValid &&
            sostav_date_end_inspection_loader.isValid &&
            sostav_date_end_inspection_vagonnik.isValid &&
            sostav_date_readiness_uz.isValid &&
            sostav_date_outgoing.isValid
        ) {
            // Дата указана правильно проверим далее
            // Проверим на интервалы времени
            if (!date_readiness_amkr.isBefore(sostav_date_end_inspection_acceptance_delivery)) {
                this.form.set_object_error('date_end_inspection_acceptance_delivery', langView('fhoogs_error_date_end_inspection_acceptance_delivery', App.Langs).format(date_readiness_amkr.format('DD.MM.YYYY HH:mm:ss')));
                valid = valid & false;
            }
            if (!date_readiness_amkr.isBefore(sostav_date_end_inspection_loader)) {
                this.form.set_object_error('date_end_inspection_loader', langView('fhoogs_error_date_end_inspection_loader', App.Langs).format(date_readiness_amkr.format('DD.MM.YYYY HH:mm:ss')));
                valid = valid & false;
            }
            if (!date_readiness_amkr.isBefore(sostav_date_end_inspection_vagonnik)) {
                this.form.set_object_error('date_end_inspection_vagonnik', langView('fhoogs_error_date_end_inspection_vagonnik', App.Langs).format(date_readiness_amkr.format('DD.MM.YYYY HH:mm:ss')));
                valid = valid & false;
            }
            if (!sostav_date_readiness_uz.isAfter(sostav_date_end_inspection_acceptance_delivery) ||
                !sostav_date_readiness_uz.isAfter(sostav_date_end_inspection_loader) ||
                !sostav_date_readiness_uz.isAfter(sostav_date_end_inspection_vagonnik)) {
                this.form.set_object_error('date_readiness_uz', langView('fhoogs_error_date_readiness_uz', App.Langs));
                valid = valid & false;
            }
            if (!sostav_date_outgoing.isAfter(sostav_date_readiness_uz)) {
                this.form.set_object_error('date_outgoing', langView('fhoogs_error_date_outgoing', App.Langs));
                valid = valid & false;
            }
            // Проверим временной период предъявления - будущее + Прошлое
            var minute_outgoing = current.diff(sostav_date_outgoing, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_outgoing >= max_err_data_outgoing || minute_outgoing <= min_err_data_outgoing) {
                this.form.set_object_error('date_outgoing', langView('fhoogs_error_date_outgoing_not_deff_date_detention', App.Langs).format(min_err_data_outgoing, max_err_data_outgoing));
                valid = valid & false;
            }
            if (sostav_date_outgoing_act !== null) {
                if (sostav_date_outgoing_act && !sostav_date_outgoing_act.isAfter(sostav_date_readiness_uz)) {
                    this.form.set_object_error('date_outgoing_act', langView('fhoogs_error_date_outgoing_act', App.Langs));
                    valid = valid & false;
                }
            } else {
                //this.form.set_object_ok('date_outgoing_act','');
            }

        } else {
            // Вывести сообщение о неправильной дате
            if (!sostav_date_end_inspection_acceptance_delivery.isValid) this.form.set_object_error('date_end_inspection_acceptance_delivery', langView('fhoogs_error_date_time', App.Langs));
            if (!sostav_date_end_inspection_loader.isValid) this.form.set_object_error('date_end_inspection_loader', langView('fhoogs_error_date_time', App.Langs));
            if (!sostav_date_end_inspection_vagonnik.isValid) this.form.set_object_error('date_end_inspection_vagonnik', langView('fhoogs_error_date_time', App.Langs));
            if (!sostav_date_readiness_uz.isValid) this.form.set_object_error('date_readiness_uz', langView('fhoogs_error_date_time', App.Langs));
            if (!sostav_date_outgoing.isValid) this.form.set_object_error('date_outgoing', langView('fhoogs_error_date_time', App.Langs));
            valid = valid & false;
        }
        return valid;
    };
    // Открыть форму добавить
    form_ho_outgoing_sostav.prototype.add = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        this.form.disabled('num_doc', true);
        this.mf_edit.open(langView('fhoogs_title_form_add', App.Langs));
    };
    // Открыть форму править
    form_ho_outgoing_sostav.prototype.edit = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        this.form.disabled('num_doc', true);
        this.mf_edit.open(langView('fhoogs_title_form_edit', App.Langs));
    };
    // Сохранить объект
    form_ho_outgoing_sostav.prototype.save = function (data) {
        this.out_clear();
        this.update(data);
    };
    // Изменить объект
    form_ho_outgoing_sostav.prototype.update = function (data) {
        LockScreen(langView('fhoogs_mess_operation_run', App.Langs));
        this.ids_wsd.postOperationPresentSostav(data, function (result) {
            if (result > 0) {
                this.ids_wsd.getCalcUsageFeeOfOutgoingSostav(data.id, function (result_calc) {
                    this.mf_edit.close(); // закроем форму
                    if (typeof this.settings.fn_edit === 'function') {
                        this.settings.fn_edit({ data: data, result: result });
                    }
                    if (result_calc.error > 0) {
                        this.mf_edit.out_error(langView('fhoogs_mess_error_operation_return_present1', App.Langs) + result_calc.error);
                    }
                    LockScreenOff();
                }.bind(this));
            } else {
                LockScreenOff();
                this.mf_edit.out_error(langView('fhoogs_mess_error_operation_return_present', App.Langs) + result);
            }
        }.bind(this));
    };
    // Очистить сообщения
    form_ho_outgoing_sostav.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_ho_outgoing_sostav.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_ho_outgoing_sostav.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_ho_outgoing_sostav.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_ho_outgoing_sostav.destroy = function () {
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

    App.form_ho_outgoing_sostav = form_ho_outgoing_sostav;

    window.App = App;

})(window);