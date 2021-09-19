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
            'field_id': 'id строки',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
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
            alert: null,
            ids_dir: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new IDS_DIRECTORY();

        // Создадим форму выбора пути отправки
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
            label: 'Оператор (рус.)',
            placeholder: 'Полное название оператора',
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
            label: 'Оператор (анг.)',
            placeholder: 'Full operator name',
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
            label: 'Крат. назв. оператора (рус.)',
            placeholder: 'Аббревиатура оператора',
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
            label: 'Крат. назв. оператора (анг.)',
            placeholder: 'Operator abbreviation',
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
            label: 'Платный',
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
            label: 'rop',
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
            label: 'Местный',
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
            label: 'Контр. врем.',
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
            label: 'Цвет',
            placeholder: '#RGB',
            pattern:'#[a-zA-Z0-9]{6}',
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
            alert: this.settings.alert,
            fields: fields,
            mb: 2,
            id: null,
            cl_form: '',
            validation: true,
            fn_validation: function (valid) {

            }
        });

        // Создать модальную форму "Править"
        var MF = App.modal_form
        this.mf_edit = new MF();
        this.mf_edit.init({
            alert: this.settings.alert,
            id: 'mfeow-' + this.selector,
            prefix: 'lg',
            cl_modal: null,
            form: this.form,
            label_ok: 'Править',
            label_close: 'Отмена',
            ok_click: function (e) {
                e.preventDefault();
                if (this.form) {
                    this.form['$form_'+this.form.mode].submit();
                }
            }.bind(this),
            //close_click: function () {

            //},
        });

        //this.mf_edit.open();
        if (typeof fn_init_ok === 'function') {
            fn_init_ok(init);
        }
    }
    // Открыть форму добавить
    edit_dir_operators_wagons.prototype.add = function () {
        this.form.view_add();
        this.mf_edit.open('Добавить оператора');
    }

    // Открыть форму добавить
    edit_dir_operators_wagons.prototype.edit = function (data) {
        this.form.view_edit(data);
        this.mf_edit.open('Править оператора');
    }

    App.edit_dir_operators_wagons = edit_dir_operators_wagons;

    window.App = App;

})(window);