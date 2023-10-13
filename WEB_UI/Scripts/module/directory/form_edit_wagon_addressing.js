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



            'fewa_title_form_arrival': 'Принять состав',
            'fewa_mess_init_module': 'Инициализация модуля(form_edit_wagon_addressing)...',
            'fewa_mess_operation_run': 'Выполняю операцию...',
            'fewa_error_date_arrival': 'Укажите правильно дату и время',
            'fewa_error_date_arrival_not_deff_date_curent': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от текущего времени',
            'fewa_error_date_arrival_not_deff_date_curent_arrival': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от прошлой даты прибытия {2}',
            'fewa_error_date_arrival_not_deff_date_adoption': 'Дата и время прибытия должны быть не меньше {0} мин. и не равно {1} времени приема',
            'fewa_error_date_arrival_not_deff_date_adoption_act': 'Дата и время прибытия по акту должны быть не меньше {0} мин. или больше {1} мин. от времени приема.',
            'fewa_mess_error_add_sostav': 'Ошибка выполнения операции "Создать состав прибытия", код ошибки = ',
            'fewa_mess_error_edit_sostav': 'Ошибка выполнения операции "Обновить состав прибытия", код ошибки = ',
            'fewa_mess_error_operation_arrival_sostav': 'Ошибка выполнения операции "ПРИНЯТЬ СОСТАВ НА АМКР", код ошибки = ',

        },
        'en':  //default language: English
        {
            'fewa_title_edit': 'OK',
            'fewa_title_cancel': 'Cancel',

            'fewa_title_label_num_doc': 'Document#:',
            'fewa_title_placeholder_num_doc': 'Document#',
            'fewa_title_label_train': 'Train #:',
            'fewa_title_placeholder_train': 'Train#',
            'fewa_title_label_composition_index': 'Train index',
            'fewa_title_placeholder_composition_index': 'Train Index',
            'fewa_title_label_date_arrival': 'Date and time of arrival:',
            'fewa_title_placeholder_date_arrival': 'Arrival Time',
            'fewa_title_label_date_adoption': 'Date and time of admission:',
            'fewa_title_placeholder_date_adoption': 'Adoption Time',
            'fewa_title_label_date_adoption_act': 'Date and time of admission (act):',
            'fewa_title_placeholder_date_adoption_act': 'Adoption time (act)',
            'fewa_title_label_station_from': 'Arrived from station:',
            'fewa_title_placeholder_station_from': 'Arrival Station:',
            'fewa_title_label_station_on': 'Accept to station:',
            'fewa_title_placeholder_station_on': 'Accept to station:',
            'fewa_title_label_way': 'Take to path:',
            'fewa_title_placeholder_way': 'Take to path:',
            'fewa_title_label_numeration': 'Numbering starts from:',
            'fewa_title_placeholder_numeration': 'Accept on path:',
            'fewa_title_head': 'Head',
            'fewa_title_tail': 'Tail',

            'fewa_title_label_note': 'Note:',
            'fewa_title_placeholder_note': 'Note',
            'fewa_title_form_add': 'Add Form',
            'fewa_title_form_edit': 'Edit Composition',
            'fewa_title_form_arrival': 'Accept composition',
            'fewa_mess_init_module': 'Module initialization(form_edit_wagon_addressing)...',
            'fewa_mess_operation_run': 'Performing an operation...',
            'fewa_error_date_arrival': 'Please enter the correct date and time',
            'fewa_error_date_arrival_not_deff_date_current': 'Date and time of arrival must be at least {0} min. or more {1} min. from current time',
            'fewa_error_date_arrival_not_deff_date_current_arrival': 'Date and time of arrival must be at least {0} min. or more {1} min. from last arrival date {2}',
            'fewa_error_date_arrival_not_deff_date_adoption': 'Date and time of arrival must be at least {0} min. and not equal to {1} reception time',
            'fewa_error_date_arrival_not_deff_date_adoption_act': 'The date and time of arrival according to the act must be at least {0} min. or more {1} min. from the time of admission.',
            'fewa_mess_error_add_sostav': 'Error performing "Create arrival composition" operation, error code = ',
            'fewa_mess_error_edit_sostav': 'Error performing "Update arrival composition" operation, error code = ',
            'fewa_mess_error_operation_arrival_sostav': 'Error performing operation "ACCEPT COMPOSITION TO AMCR", error code = ',
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
                list: this.list_division,
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
                required: true,
                control: null,
                list: this.list_commercial_condition,
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
                required: true,
                control: null,
                list: this.list_sertification_data,
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
                list: this.list_station_from,
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
    form_edit_wagon_addressing.prototype.validation = function (result) {
        var valid = true;
        //var user_adm = list_adm_user.indexOf(App.User_Name) >= 0;
        //if (user_adm) return valid;
        ////// Сдесь можно проверить дополнительно
        //var current = moment();
        //var current_date_arrival = result.old && result.old.date_arrival ? moment(result.old.date_arrival) : null;
        //var date_arrival = moment(result.new.date_arrival);
        //var date_adoption = result.new.date_adoption ? moment(result.new.date_adoption) : null;
        //var date_adoption_act = result.new.date_adoption_act ? moment(result.new.date_adoption_act) : null;

        //if (date_arrival.isValid) {
        //    // Если это операция добавить, проверим на время
        //    if (result.old === null) {
        //        // Проверим временной период предъявления - будущее + Прошлое
        //        var minute_arrival = current.diff(date_arrival, 'minute');
        //        //- зашло в будущее + зашло в прошлое
        //        if (minute_arrival >= max_err_date_arrival || minute_arrival <= min_err_date_arrival) {
        //            if (this.settings.mode === 0) {
        //                this.form.set_object_error('date_arrival', langView('fewa_error_date_arrival_not_deff_date_curent', App.Langs).format(min_err_date_arrival, max_err_date_arrival));
        //            } else {
        //                this.form.set_object_error('date_adoption', langView('fewa_error_date_arrival_not_deff_date_curent', App.Langs).format(min_err_date_arrival, max_err_date_arrival));
        //            }
        //            valid = valid & false;
        //        }
        //    } else {
        //        // Форма правим, проверим чтобы дата прибытия была меньше даты принятия на определенное время
        //        if (date_adoption !== null && date_adoption.isValid) {
        //            // Есть дата приема, тогда пляшем вокруг ее
        //            // Проверим временной период предъявления - будущее + Прошлое
        //            var minute_adoption = date_adoption.diff(date_arrival, 'minute');
        //            //- зашло в будущее + зашло в прошлое
        //            if (minute_adoption >= max_err_date_adoption || minute_adoption < 0) {
        //                this.form.set_object_error('date_arrival', langView('fewa_error_date_arrival_not_deff_date_adoption', App.Langs).format(max_err_date_adoption, date_adoption.format(format_datetime)));
        //                valid = valid & false;
        //            }
        //            // Проверим дату приема по акту
        //            if (date_adoption_act !== null && date_adoption_act.isValid) {
        //                var minute_adoption = date_adoption_act.diff(date_adoption, 'minute');
        //                //- зашло в будущее + зашло в прошлое
        //                if (minute_adoption >= max_err_date_arrival_act || minute_adoption < min_err_date_adoption_act) {
        //                    this.form.set_object_error('date_adoption_act', langView('fewa_error_date_arrival_not_deff_date_adoption_act', App.Langs).format(max_err_date_arrival_act, min_err_date_adoption_act));
        //                    valid = valid & false;
        //                }
        //            }
        //        } else {
        //            // Нет дата приема, тогда пляшем вокруг старой даты прибытия
        //            if (current_date_arrival.isValid) {
        //                // Проверим временной период предъявления - будущее + Прошлое
        //                var minute_arrival = current_date_arrival.diff(date_arrival, 'minute');
        //                //- зашло в будущее + зашло в прошлое
        //                if (minute_arrival >= max_err_date_arrival || minute_arrival <= min_err_date_arrival) {
        //                    this.form.set_object_error('date_arrival', langView('fewa_error_date_arrival_not_deff_date_curent_arrival', App.Langs).format(min_err_date_arrival, max_err_date_arrival, current_date_arrival.format(format_datetime)));
        //                    valid = valid & false;
        //                }
        //            }
        //        }
        //    }
        //} else {
        //    this.form.set_object_error('date_arrival', langView('fewa_error_date_arrival', App.Langs));
        //    valid = valid & false;
        //}
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
        this.form.set('id_certification_data', id_certification_data);
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
        // Добавить или править состав
        if (this.settings.mode === 0) {
            if (data.old === null) {
                data.new.create = moment().format("YYYY-MM-DDThh:mm:ss");
                data.new.create_user = App.User_Name;
                // Добавить
                this.ids_wsd.postIncomingSostav(data.new, function (result) {
                    if (result > 0) {
                        this.mf_edit.close(); // закроем форму
                        if (typeof this.settings.fn_edit === 'function') {
                            this.settings.fn_edit({ data: data, result: result });
                        }
                        LockScreenOff();
                    } else {
                        LockScreenOff();
                        this.mf_edit.out_error(langView('fewa_mess_error_add_sostav', App.Langs) + result);
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
                        this.mf_edit.out_error(langView('fewa_mess_error_edit_sostav', App.Langs) + result);
                    }
                }.bind(this));
            }
        }
        // Принять состав на АМКР
        if (this.settings.mode === 1) {
            var operation = {
                id_arrival_sostav: data.new.id,
                num_doc: Number(data.new.num_doc),
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
                    this.mf_edit.out_error(langView('fewa_mess_error_operation_arrival_sostav', App.Langs) + result);
                }
            }.bind(this));
        }
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

    App.form_edit_wagon_addressing = form_edit_wagon_addressing;

    window.App = App;

})(window);