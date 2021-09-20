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
            'title_edit': 'Править',
            'title_cancel': 'Отмена',

            'title_label_operators_ru': 'Оператор (рус.)',
            'title_placeholder_operators_ru': 'Полное название оператора',
            'title_label_operators_en': 'Оператор (анг.)',
            'title_placeholder_operators_en': 'Full operator name',
            'title_label_abbr_ru': 'Крат. назв. оператора (рус.)',
            'title_placeholder_abbr_ru': 'Аббревиатура оператора',
            'title_label_abbr_en': 'Крат. назв. оператора (анг.)',
            'title_placeholder_abbr_en': 'Operator abbreviation',
            'title_label_paid': 'Платный',
            'title_label_rop': 'rop',
            'title_label_local_use': 'Местный',
            'title_label_monitoring_idle_time': 'Контр. врем.',
            'title_label_color': 'Цвет',
            'title_placeholder_color': '#RGB',

            'title_form_add': 'Добавить оператора',
            'title_form_edit': 'Править оператора',
            'title_form_del': 'Удалить',

            'mess_operation_run': 'Выполняю операцию...',
        },
        'en':  //default language: English
        {
            'title_edit': 'Edit',
            'title_cancel': 'Cancel',

            'title_label_operators_ru': 'Operator (Russian)',
            'title_placeholder_operators_ru': 'Full operator name',
            'title_label_operators_en': 'Operator (eng.)',
            'title_placeholder_operators_en': 'Full operator name',
            'title_label_abbr_ru': 'Krat. name operator (Russian) ',
            'title_placeholder_abbr_ru': 'Operator abbreviation',
            'title_label_abbr_en': 'Krat. name operator (eng.) ',
            'title_placeholder_abbr_en': 'Operator abbreviation',
            'title_label_paid': 'Paid',
            'title_label_rop': 'rop',
            'title_label_local_use': 'Local',
            'title_label_monitoring_idle_time': 'Control. time. ',
            'title_label_color': 'Color',
            'title_placeholder_color': '#RGB',

            'title_form_add': 'Add operator',
            'title_form_edit': 'Edit operator',
            'title_form_del': 'Delete',

            'mess_operation_run': 'Performing an operation ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var IDS_DIRECTORY = App.ids_directory;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    function edit_dir_operators_wagons() {
        this.fc_ui = new FC();
    }

    // Инициализаия формы
    edit_dir_operators_wagons.prototype.init = function (options, fn_init_ok) {

        var init = true;
        this.settings = $.extend({
            id: 'edow',
            alert: null,
            ids_dir: null,
            fn_add: null,
            fn_edit: null,
            fn_delete: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new IDS_DIRECTORY();

        // Создать модальную форму "Окно сообщений"
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.settings.id); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        // Создать модальную форму "Править"
        var MF = App.modal_form
        this.mf_edit = new MF();
        this.mf_edit.init({
            alert: null,
            id: 'mfeow-' + this.settings.id,
            prefix: 'lg',
            cl_modal: null,
            //form: this.form,
            label_ok: langView('title_edit', App.Langs),
            label_close: langView('title_cancel', App.Langs),
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
        var fl_operators_ru = {
            field: 'operators_ru',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'operators_ru',
            label: langView('title_label_operators_ru', App.Langs),
            placeholder: langView('title_placeholder_operators_ru', App.Langs),
            maxlength: 100,
            required: true,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            change: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: 1,
            col: 1,
            col_prefix: 'md',
            col_size: 8,
        };
        var fl_operators_en = {
            field: 'operators_en',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'operators_en',
            label: langView('title_label_operators_en', App.Langs),
            placeholder: langView('title_placeholder_operators_en', App.Langs),
            maxlength: 100,
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
            col_size: 8,
        };
        var fl_abbr_ru = {
            field: 'abbr_ru',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'abbr_ru',
            label: langView('title_label_abbr_ru', App.Langs),
            placeholder: langView('title_placeholder_abbr_ru', App.Langs),
            maxlength: 20,
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
            col: 2,
            col_prefix: 'md',
            col_size: 4,
        };
        var fl_abbr_en = {
            field: 'abbr_en',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'abbr_en',
            label: langView('title_label_abbr_en', App.Langs),
            placeholder: langView('title_placeholder_abbr_en', App.Langs),
            maxlength: 20,
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
        var fl_paid = {
            field: 'paid',
            type: 'boolean',
            add: 'checkbox',
            edit: 'checkbox',
            name: 'paid',
            label: langView('title_label_paid', App.Langs),
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
            row: 3,
            col: 1,
            col_prefix: 'md',
            col_size: 2,
        };
        var fl_rop = {
            field: 'rop',
            type: 'boolean',
            add: 'checkbox',
            edit: 'checkbox',
            name: 'rop',
            label: langView('title_label_rop', App.Langs),
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
            row: 3,
            col: 2,
            col_prefix: 'md',
            col_size: 2,
        };
        var fl_local_use = {
            field: 'local_use',
            type: 'boolean',
            add: 'checkbox',
            edit: 'checkbox',
            name: 'local_use',
            label: langView('title_label_local_use', App.Langs),
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
            row: 3,
            col: 3,
            col_prefix: 'md',
            col_size: 2,
        };
        var fl_monitoring_idle_time = {
            field: 'monitoring_idle_time',
            type: 'boolean',
            add: 'checkbox',
            edit: 'checkbox',
            name: 'monitoring_idle_time',
            label: langView('title_label_monitoring_idle_time', App.Langs),
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
            default: true,
            row: 3,
            col: 4,
            col_prefix: 'md',
            col_size: 2,
        };
        var fl_color = {
            field: 'color',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'color',
            label: langView('title_label_color', App.Langs),
            placeholder: langView('title_placeholder_color', App.Langs),
            pattern: '#[a-zA-Z0-9]{6}',
            maxlength: 10,
            required: false,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: 3,
            col: 5,
            col_prefix: 'md',
            col_size: 2,
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
        fields.push(fl_operators_ru);
        fields.push(fl_operators_en);
        fields.push(fl_abbr_ru);
        fields.push(fl_abbr_en);
        fields.push(fl_paid);
        fields.push(fl_rop);
        fields.push(fl_local_use);
        fields.push(fl_monitoring_idle_time);
        fields.push(fl_color);
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
            fn_validation: function (result) {
                // Валидация успешна
                if (result && result.valid) {
                    // Сдесь можно проверить дополнительно
                    this.save({ old: result.old, new: result.new });
                }
            }.bind(this),
        });

        // Добавим в мондальное окно форму правки
        if (this.form && this.form.$form_add && this.form.$form_edit) {
            this.mf_edit.$body.append(this.form.$form_add).append(this.form.$form_edit);
        }

        if (typeof fn_init_ok === 'function') {
            fn_init_ok(init);
        }
    }
    // Открыть форму добавить
    edit_dir_operators_wagons.prototype.add = function () {
        this.out_clear();
        this.form.view_add();
        this.mf_edit.open(langView('title_form_add', App.Langs));
    };
    // Открыть форму править
    edit_dir_operators_wagons.prototype.edit = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        this.mf_edit.open(langView('title_form_edit', App.Langs));
    };
    // Выполнить удаление
    edit_dir_operators_wagons.prototype.del = function (data) {
        this.out_clear();
        this.delete(data);
    };
    // Сохранить объект
    edit_dir_operators_wagons.prototype.save = function (data) {
        this.out_clear();
        if (data && !data.old) {
            // Добавить 
            this.insert(data.new);
        } else {
            // Править
            this.update(data.new);
        };
    };
    // Добавить объект
    edit_dir_operators_wagons.prototype.insert = function (data) {
        // Добавить 
        LockScreen(langView('mess_operation_run', App.Langs));
        this.ids_dir.postOperatorsWagons(data, function (result) {
            if (result > 0) {
                this.mf_edit.close(); // закроем форму
                if (typeof this.settings.fn_add === 'function') {
                    this.settings.fn_add({ data: data, result: result });
                }
                LockScreenOff();
            } else {
                LockScreenOff();
                this.mf_edit.out_error('При добавлении оператора произошла ошибка, код ошибки : ' + result);
            }
        }.bind(this));
    };
    // Изменить объект
    edit_dir_operators_wagons.prototype.update = function (data) {
        LockScreen(langView('mess_operation_run', App.Langs));
        this.ids_dir.putOperatorsWagons(data, function (result) {
            if (result > 0) {
                this.mf_edit.close(); // закроем форму
                if (typeof this.settings.fn_edit === 'function') {
                    this.settings.fn_edit({ data: data, result: result });
                }
                LockScreenOff();
            } else {
                LockScreenOff();
                this.mf_edit.out_error('При обновлении оператора произошла ошибка, код ошибки : ' + result);
            }
        }.bind(this));
    };
    // Удалить объект
    edit_dir_operators_wagons.prototype.delete = function (data) {
        if (data !== null) {
            this.modal_confirm_form.view(langView('title_form_del', App.Langs), 'Удалить выбранный оператор [' + data['operators_' + App.Lang] + '] ?', function (result) {
                if (result) {

                    this.ids_dir.deleteOperatorsWagons(data.id, function (result) {
                        if (result > 0) {
                            if (typeof this.settings.fn_delete === 'function') {
                                this.settings.fn_delete({ data: data, result: result });
                            }
                            LockScreenOff();
                        } else {
                            LockScreenOff();
                            this.out_error('При удалении оператора произошла ошибка, код ошибки : ' + result);
                        }
                    }.bind(this));

                } else {
                    // Отмена
                    this.out_warning("Операция 'Удалить оператора' – отменена");
                }
            }.bind(this));
        } else {

        }
    };
    // Очистить сообщения
    edit_dir_operators_wagons.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    edit_dir_operators_wagons.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    edit_dir_operators_wagons.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    edit_dir_operators_wagons.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    edit_dir_operators_wagons.destroy = function (){
        this.modal_confirm_form.destroy();
        this.form.destroy();
        this.mf_edit.destroy();
    };

    App.edit_dir_operators_wagons = edit_dir_operators_wagons;

    window.App = App;

})(window);