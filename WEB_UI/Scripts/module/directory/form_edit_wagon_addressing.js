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
    var list_adm_user = ['EUROPE\\ealevchenko', 'EUROPE\\ivshuba', 'EUROPE\\lvgubarenko', 'EUROPE\\nnlavrenko', 'EUROPE\\osnechaeva'];               // Список админов для правки ,

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'fewa_title_edit': 'Ок',
            'fewa_title_cancel': 'Отмена',
            'fewa_title_label_station_from': 'Станция отправки:',
            'fewa_title_placeholder_station_from': 'Станция отправки',
            'fewa_title_label_division': 'Цех получатель:',
            'fewa_title_placeholder_division': 'Цех получатель',
            'fewa_title_label_commercial_condition': 'Ком состояние:',
            'fewa_title_placeholder_commercial_condition': 'Ком состояние',
            'fewa_title_label_sertification_data': 'Серт.данные:',
            'fewa_title_placeholder_sertification_data': 'Серт.данные.',
            //'fewa_title_form_add': 'Добавить состав',
            'fewa_title_form_edit': 'Заадресовка вагонов',
            'fewa_mess_error_edit': 'Ошибка выполнения операции "Заадресовка вагонов", код ошибки = ',
            'fewa_mess_init_module': 'Инициализация модуля(form_edit_wagon_addressing)...',
            'fewa_mess_operation_run': 'Выполняю операцию...',

            //'fewa_title_form_arrival': 'Принять состав',


            //'fewa_error_date_arrival': 'Укажите правильно дату и время',
            //'fewa_error_date_arrival_not_deff_date_curent': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от текущего времени',
            //'fewa_error_date_arrival_not_deff_date_curent_arrival': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от прошлой даты прибытия {2}',
            //'fewa_error_date_arrival_not_deff_date_adoption': 'Дата и время прибытия должны быть не меньше {0} мин. и не равно {1} времени приема',
            //'fewa_error_date_arrival_not_deff_date_adoption_act': 'Дата и время прибытия по акту должны быть не меньше {0} мин. или больше {1} мин. от времени приема.',
            //'fewa_mess_error_add_sostav': 'Ошибка выполнения операции "Создать состав прибытия", код ошибки = ',
            //'fewa_mess_error_edit_sostav': 'Ошибка выполнения операции "Обновить состав прибытия", код ошибки = ',
            //'fewa_mess_error_operation_arrival_sostav': 'Ошибка выполнения операции "ПРИНЯТЬ СОСТАВ НА АМКР", код ошибки = ',

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

    function form_edit_wagon_addressing() {
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_edit_wagon_addressing.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_edit_wagon_addressing.prototype.init = function (options) {
        this.init = true;
        LockScreen(langView('fewa_mess_init_module', App.Langs));
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
        this.list_division = [];
        this.list_commercial_condition = [];
        this.list_sertification_data = [];

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['external_station', 'certification_data', 'commercial_condition', 'divisions'], false, function (result) {
            // Подгрузили списки
            this.list_station_from = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
            this.list_division = this.ids_dir.getListDivisions('id', 'name_division', App.Lang, null);
            this.list_commercial_condition = this.ids_dir.getListCommercialCondition('id', 'commercial_condition', App.Lang, null);
            this.list_sertification_data = this.ids_dir.getListCertificationData('id', 'certification_data', App.Lang, null);

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
                id: 'fewa-' + this.settings.id,
                prefix: null,
                cl_modal: null,
                //form: this.form,
                label_ok: langView('fewa_title_edit', App.Langs),
                label_close: langView('fewa_title_cancel', App.Langs),
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

            var user_adm = list_adm_user.indexOf(App.User_Name) >= 0;

            // Определим поля
            var fl_division = {
                field: 'id_division',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'division',
                prefix: null,
                label: langView('fewa_title_label_division', App.Langs),
                placeholder: langView('fewa_title_placeholder_division', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.sort_text(this.list_division, 'text'),
                select: function (e, ui) {
                    e.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());

                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 1,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_commercial_condition = {
                field: 'id_commercial_condition',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'commercial_condition',
                prefix: null,
                label: langView('fewa_title_label_commercial_condition', App.Langs),
                placeholder: langView('fewa_title_placeholder_commercial_condition', App.Langs),
                maxlength: null,
                required: false,
                control: null,
                list: this.sort_text(this.list_commercial_condition, 'text'),
                select: function (e, ui) {
                    e.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());

                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 2,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_sertification_data = {
                field: 'id_sertification_data',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'sertification_data',
                prefix: null,
                label: langView('fewa_title_label_sertification_data', App.Langs),
                placeholder: langView('fewa_title_placeholder_sertification_data', App.Langs),
                maxlength: null,
                required: false,
                control: null,
                list: this.sort_text(this.list_sertification_data, 'text'),
                select: function (e, ui) {
                    e.preventDefault();
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
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_station_from = {
                field: 'code_stn_from',
                type: 'int',
                add: 'select',
                edit: 'select',
                name: 'station_from',
                prefix: null,
                label: langView('fewa_title_label_station_from', App.Langs),
                placeholder: langView('fewa_title_placeholder_station_from', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.sort_text(this.list_station_from, 'text'),
                select: function (e, ui) {
                    e.preventDefault();
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
                col_size: 12,
            };

            var fields = [];
            fields.push(fl_division);
            fields.push(fl_commercial_condition);
            fields.push(fl_sertification_data);
            fields.push(fl_station_from);
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
                    //if (this.form && this.form.$form_add && this.form.$form_edit) {
                    //    this.mf_edit.$body.append(this.form.$form_add).append(this.form.$form_edit);
                    //}
                    //this.form.$form_edit.find('select option[value=-1]').remove();
                    this.form.$form_edit.find('select option[value=-1]').after('<option value="9999999">НЕ ПРАВИТЬ!</option>');
                    //;

                    if (this.form && this.form.$form_edit) {
                        this.mf_edit.$body.append(this.form.$form_edit);
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
    form_edit_wagon_addressing.prototype.validation = function (result) {
        var valid = true;
        var user_adm = list_adm_user.indexOf(App.User_Name) >= 0;
        if (user_adm) return valid;
        return valid;
    };
    // Открыть форму добавить
    //form_edit_wagon_addressing.prototype.add = function () {
    //    this.out_clear();
    //    this.form.view_add();
    //    this.mf_edit.open(langView('fewa_title_form_add', App.Langs));
    //};
    // Открыть форму править
    form_edit_wagon_addressing.prototype.edit = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        this.mf_edit.open(langView('fewa_title_form_edit', App.Langs));
        var id_division_on_amkr = data[0].arrival_uz_vagon_id_division_on_amkr;
        var id_commercial_condition = data[0].arrival_uz_vagon_id_commercial_condition;
        var id_certification_data = data[0].arrival_uz_vagon_id_certification_data;
        var code_stn_from = data[0].arrival_uz_document_code_stn_from;
        $.each(data, function (i, el) {
            if (id_division_on_amkr !== -1 && id_division_on_amkr !== el.arrival_uz_vagon_id_division_on_amkr) { id_division_on_amkr = -1; }
            if (id_commercial_condition !== -1 && id_commercial_condition !== el.arrival_uz_vagon_id_commercial_condition) { id_commercial_condition = -1; }
            if (id_certification_data !== -1 && id_certification_data !== el.arrival_uz_vagon_id_certification_data) { id_certification_data = -1; }
            if (code_stn_from !== -1 && code_stn_from !== el.arrival_uz_document_code_stn_from) { code_stn_from = -1; }
        }.bind(this));
        this.form.set('id_division', id_division_on_amkr);
        this.form.set('id_commercial_condition', id_commercial_condition);
        this.form.set('id_sertification_data', id_certification_data);
        this.form.set('code_stn_from', code_stn_from);
    };
    // Сохранить объект
    form_edit_wagon_addressing.prototype.save = function (data) {
        this.out_clear();
        this.update(data);
    };
    // Изменить объект
    form_edit_wagon_addressing.prototype.update = function (data) {
        LockScreen(langView('fewa_mess_operation_run', App.Langs));
        var list_arrival_uz_vagon_id = [];
        $.each(data.old, function (i, el) {
            list_arrival_uz_vagon_id.push(el.arrival_uz_vagon_id);
        }.bind(this));
        var id_division_on_amkr = this.form.val('id_division');
        var id_commercial_condition = this.form.val('id_commercial_condition');
        var id_certification_data = this.form.val('id_sertification_data');
        var code_stn_from = this.form.val('code_stn_from');
        var operation = {
            id_division_on_amkr: id_division_on_amkr === "9999999" ? -1 : id_division_on_amkr,
            id_commercial_condition: id_commercial_condition === "9999999" ? -1 : (id_commercial_condition === "-1" ? null : id_commercial_condition),
            id_certification_data: id_certification_data === "9999999" ? -1 : (id_certification_data === "-1" ? null : id_certification_data),
            code_stn_from: code_stn_from === "9999999" ? -1 : code_stn_from,
            list_arrival_uz_vagon_id: list_arrival_uz_vagon_id,
            user: App.User_Name,
        }
        this.ids_wsd.postChangeWagonAddressing(operation, function (result) {
            if (result > 0) {
                this.mf_edit.close(); // закроем форму
                if (typeof this.settings.fn_edit === 'function') {
                    this.settings.fn_edit({ data: data, result: result });
                }
                LockScreenOff();
            } else {
                LockScreenOff();
                this.mf_edit.out_error(langView('fewa_mess_error_edit', App.Langs) + result);
            }
        }.bind(this));
    };
    // Очистить сообщения
    form_edit_wagon_addressing.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_edit_wagon_addressing.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_edit_wagon_addressing.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_edit_wagon_addressing.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_edit_wagon_addressing.destroy = function () {
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

    form_edit_wagon_addressing.prototype.sort_text = function (list, name) {
        return list.sort(function (a, b) {
            var nameA = a[name] !== null ? a[name].toLowerCase() : '',
                nameB = b[name] !== null ? b[name].toLowerCase() : ''
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        });
    }

    App.form_edit_wagon_addressing = form_edit_wagon_addressing;

    window.App = App;

})(window);