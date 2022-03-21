/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль Форма "Сдать состав на УЗ"*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_dt_apply = -1 * (60 * 3); // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_dt_apply = 60 * 3; // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'fhdogs_title_edit': 'Ок',
            'fhdogs_title_cancel': 'Отмена',
            'fhdogs_title_label_reverse': 'Выполнить реверс',
            'fhdogs_title_label_side': 'Сторона:',
            'fhdogs_title_placeholder_side': 'Сторона',
            'fhdogs_title_label_way': 'Путь дислокации',
            'fhdogs_title_placeholder_way': 'Путь дислокации',
            'fhdogs_title_label_locomotive1': 'Локомотив №1:',
            'fhdogs_title_label_locomotive2': 'Локомотив №2:',
            'fhdogs_title_placeholder_locomotive': 'Локомотив',
            'fhdogs_title_time_aplly': 'Время выполнения:',
            'fhdogs_title_placeholder_time_aplly': 'Время выполнения',

            //'fhdogs_title_num_doc': '№ ведомости',
            //'fhdogs_title_placeholder_num_doc': '№ вед.',
            //'fhdogs_title_date_end_inspection_acceptance_delivery': 'Время окон. осм. приемосд.',
            //'fhdogs_title_placeholder_date_end_inspection_acceptance_delivery': 'Добавить время',
            //'fhdogs_title_date_end_inspection_loader': 'Время окон. осм. грузчиками.',
            //'fhdogs_title_placeholder_date_end_inspection_loadery': 'Добавить время',
            //'fhdogs_title_date_end_inspection_vagonnik': 'Время окон. осм. вагонниками.',
            //'fhdogs_title_placeholder_date_end_inspection_vagonnik': 'Добавить время',
            //'fhdogs_title_date_readiness_uz': 'Время готовности к сдаче на УЗ',
            //'fhdogs_title_placeholder_date_readiness_uz': 'Добавить время',
            //'fhdogs_title_date_outgoing': 'Время сдачи на УЗ',
            //'fhdogs_title_placeholder_date_outgoing': 'Добавить время',
            //'fhdogs_title_date_outgoing_act': 'Время сдачи на УЗ (по акту)',
            //'fhdogs_title_placeholder_date_outgoing_act': 'Добавить время',
            //'fhdogs_title_label_station_on': 'Отправить на станцию',
            //'fhdogs_title_placeholder_station_on': 'Выберите станцию',
            //'fhdogs_title_label_route_sign': 'Маршрут',
            //'fhdogs_title_label_composition_index': 'Индекс поезда',
            //'fhdogs_title_placeholder_composition_index': 'XXXX-XXX-XXXX',
            /*            'fhdogs_title_form_add': 'Сдать состав',*/
            'fhdogs_mess_error_operation_outgoing_dislocation': 'Ошибка выполнения операции "Сменить дислокацию предъявленного состава"',
            'fhdogs_mess_error_equal_way': 'Выберите новый путь',
            'fhdogs_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'fhdogs_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            'fhdogs_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            'fhdogs_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',

            //'fhdogs_mess_error_operation_run': 'При выполнении операции «ПРИНЯТЬ СОСТАВ НА СТАНЦИЮ» произошла ошибка, код ошибки:',





            'fhdogs_title_form_edit': 'Выполнить дислокацию состава',
            'fhdogs_mess_operation_run': 'Выполняю операцию...',
            'fhdogs_error_date_end_inspection_acceptance_delivery': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            'fhdogs_error_date_end_inspection_loader': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            'fhdogs_error_date_end_inspection_vagonnik': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            'fhdogs_error_date_readiness_uz': 'Время готовности к сдаче на УЗ должно быть больше времени осмотров',
            'fhdogs_error_date_outgoing': 'Время сдачи на УЗ должно быть больше времени готовности сдачи на УЗ',
            'fhdogs_error_date_outgoing_act': 'Время сдаче на УЗ по акту должно быть больше времени сдачи на УЗ',
            'fhdogs_error_date_time': 'Укажите правильно дату и время',
            'fhdogs_error_date_outgoing_not_deff_date_detention': 'Дата и время предъявления должны быть не меньше {0} мин. или больше {1} мин. от текущего времени',
            'fhdogs_mess_error_operation_return_present': 'Ошибка выполнения операции "Предъявить состав на УЗ", код ошибки = ',
        },
        'en':  //default language: English
        {
            //'fhdogs_title_edit': 'Ok',
            //'fhdogs_title_cancel': 'Cancel',
            //'fhdogs_title_num_doc': 'sheet number',
            //'fhdogs_title_placeholder_num_doc': 'fhdogs_title_placeholder_num_doc',
            //'fhdogs_title_date_end_inspection_acceptance_delivery': 'Windows times. osm. reception ',
            //'fhdogs_title_placeholder_date_end_inspection_acceptance_delivery': 'Add Time',
            //'fhdogs_title_date_end_inspection_loader': 'Windows time. osm. movers.',
            //'fhdogs_title_placeholder_date_end_inspection_loadery': 'Add Time',
            //'fhdogs_title_date_end_inspection_vagonnik': 'Windows time. osm. wagons.',
            //'fhdogs_title_placeholder_date_end_inspection_vagonnik': 'Add time',
            //'fhdogs_title_date_readiness_uz': 'Uz readiness time',
            //'fhdogs_title_placeholder_date_readiness_uz': 'Add time',
            //'fhdogs_title_date_outgoing': 'Title Date Outgoing',
            //'fhdogs_title_placeholder_date_outgoing': 'Add time',
            //'fhdogs_title_date_outgoing_act': 'Title delivery time (by act)',
            //'fhdogs_title_placeholder_date_outgoing_act': 'Add time',
            //'fhdogs_title_label_station_on': 'Send to station',
            //'fhdogs_title_placeholder_station_on': 'Select a station',
            //'fhdogs_title_label_route_sign': 'Route',
            //'fhdogs_title_label_composition_index': 'Train index',
            //'fhdogs_title_placeholder_composition_index': 'XXXX-XXX-XXXX',
            //'fhdogs_title_form_add': 'Submit Composition',
            //'fhdogs_title_form_edit': 'Edit Turned In Form',
            //'fhdogs_mess_operation_run': 'Running operation...',
            //'fhdogs_error_date_end_inspection_acceptance_delivery': 'Inspection end time must be greater than AMC present time {0}',
            //'fhdogs_error_date_end_inspection_loader': 'Inspection end time must be greater than AMKR presentation time {0}',
            //'fhdogs_error_date_end_inspection_vagonnik': 'Inspection end time must be greater than AMKR presentation time {0}',
            //'fhdogs_error_date_readiness_uz': 'Uz readiness time must be greater than inspection time',
            //'fhdogs_error_date_outgoing': 'OF turn-in time must be greater than OZ ready time',
            //'fhdogs_error_date_outgoing_act': 'The turn-in time for the OZ according to the act must be greater than the turn-in time for the OZ',
            //'fhdogs_error_date_time': 'Please enter the correct date and time',
            //'fhdogs_error_date_outgoing_not_deff_date_detention': 'Date and time of presentation must be at least {0} min. or more {1} min. from current time',
            //'fhdogs_mess_error_operation_return_present': 'Error executing operation "Present composition to UZ", error code = ',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    function form_hd_outgoing_sostav() {
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_hd_outgoing_sostav.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_hd_outgoing_sostav.prototype.init = function (options) {
        this.init = true;
        this.settings = $.extend({
            id: 'fhdogs',
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

        //this.list_station = [];

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['ways', 'locomotive'], false, function (result) {
            // Подгрузили списки
            //this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === true && i.station_delete === null; });
            //this.list_ways = this.ids_dir.getListWays2('id', 'way_num', 'way_name', App.Lang, function (i) { return i.way_delete === null; });
            // Список локомотивов
            this.list_locomotive = this.ids_dir.getListLocomotive('locomotive', 'locomotive', function (i) { return i.id_locomotive_status === 1; });
            //-------------------------------------
            // Создать модальную форму "Окно сообщений"
            var MCF = App.modal_confirm_form;
            this.modal_confirm_form = new MCF(this.settings.id); // Создадим экземпляр окно сообщений
            this.modal_confirm_form.init();

            // Создать модальную форму "Править сдать состав"
            var MF = App.modal_form
            this.mf_edit = new MF();
            this.mf_edit.init({
                alert: null,
                id: 'mfhdogs-' + this.settings.id,
                prefix: null,
                cl_modal: null,
                //form: this.form,
                label_ok: langView('fhdogs_title_edit', App.Langs),
                label_close: langView('fhdogs_title_cancel', App.Langs),
                ok_click: function (e) {
                    e.preventDefault();
                    if (this.form) {
                        this.form['$form_' + this.form.mode].submit();
                    }
                }.bind(this),
                //close_click: function () {

                //},
            });
            // Создадим форму правки сдать состав
            var FIF = App.form_infield;
            this.form = new FIF();
            // Определим поля
            var fl_reverse = {
                field: 'reverse',
                type: 'boolean',
                add: null,
                edit: 'checkbox',
                name: 'reverse',
                label: langView('fhdogs_title_label_reverse', App.Langs),
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
                row: 1,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_side = {
                field: 'side',
                type: 'int',
                add: null,
                edit: 'select',
                name: 'side',
                prefix: 'sm',
                label: langView('fhdogs_title_label_side', App.Langs),
                placeholder: langView('fhdogs_title_placeholder_side', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: [{ value: 0, text: 'Голова' }, { value: 1, text: 'Хвост' }],
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
                default: 0,
                row: 1,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_way = {
                field: 'id_way',
                type: 'int',
                add: null,
                edit: 'select',
                name: 'way',
                prefix: 'sm',
                label: langView('fhdogs_title_label_way', App.Langs),
                placeholder: langView('fhdogs_title_placeholder_way', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: [],
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
                row: 2,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_locomotive1 = {
                field: 'locomotive1',
                type: 'string',
                add: null,
                edit: 'autocomplete',
                name: 'locomotive1',
                prefix: 'sm',
                label: langView('fhdogs_title_label_locomotive1', App.Langs),
                placeholder: langView('fhdogs_title_placeholder_locomotive', App.Langs),
                maxlength: 20,
                required: true,
                control: null,
                list: this.list_locomotive,
                select: null,
                //select: function (e, ui) {
                //    event.preventDefault();
                //    // Обработать выбор
                //    var id = Number($(e.currentTarget).val());
                //    //view_wagons_from_way(id);
                //}.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 3,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_locomotive2 = {
                field: 'locomotive2',
                type: 'string',
                add: null,
                edit: 'autocomplete',
                name: 'locomotive2',
                prefix: 'sm',
                label: langView('fhdogs_title_label_locomotive2', App.Langs),
                placeholder: langView('fhdogs_title_placeholder_locomotive', App.Langs),
                maxlength: 20,
                required: false,
                control: null,
                list: this.list_locomotive,
                select: null,
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
            var fl_time_aplly = {
                field: 'time_aplly',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'time_aplly',
                prefix: 'sm',
                label: langView('fhdogs_title_time_aplly', App.Langs),
                placeholder: langView('fhdogs_title_placeholder_time_aplly', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: function (datetime) {

                },
                change: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fields = [];
            fields.push(fl_reverse);
            fields.push(fl_side);
            fields.push(fl_way);
            fields.push(fl_locomotive1);
            fields.push(fl_locomotive2);
            fields.push(fl_time_aplly);
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
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            result.new.id_way_old = result.old.id_way;
                            this.save(result.new);
                        }
                    }
                }.bind(this),
            });
            // Добавим в мондальное окно форму правки
            if (this.form && this.form.$form_add && this.form.$form_edit) {
                this.mf_edit.$body.append(this.form.$form_add).append(this.form.$form_edit);
            }

            if (typeof this.settings.fn_init === 'function') {
                this.settings.fn_init(this.init);
            }
            //-------------------------------------
        }.bind(this));
    }
    // Уточняющая валидация данных 
    form_hd_outgoing_sostav.prototype.validation = function (result) {
        var valid = true;
        //
        if (result && result.old.id_way === result.new.id_way) {
            this.form.set_object_error('id_way', langView('fhdogs_mess_error_equal_way', App.Langs));
            valid = false;
        }
        // Проверим локомотивы
        var loc1 = this.form.get_element('locomotive1');
        var loc2 = this.form.get_element('locomotive2');
        if (loc1 === loc2) {
            this.form.set_object_error('locomotive1', langView('fhdogs_mess_error_equal_locomotive', App.Langs));
            this.form.set_object_error('locomotive2', langView('fhdogs_mess_error_equal_locomotive', App.Langs));
            valid = false;
        } else {
            if (result.new && !result.new.locomotive1 && (loc1 !== null || loc1 !== '')) {
                this.form.set_object_error('locomotive1', langView('fhdogs_mess_error_not_locomotive', App.Langs) + loc1);
                valid = false;
            }
            if ((loc2 !== null && loc2 !== '') && result.new && result.new.locomotive2 === null) {
                this.form.set_object_error('locomotive2', langView('fhdogs_mess_error_not_locomotive', App.Langs) + loc2);
                valid = false;
            }
        }
        // Проверим время
        if (result.new && result.new.time_aplly) {
            var curr = moment();
            var aplly = moment(result.new.time_aplly);
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < min_dt_apply) {
                this.form.set_object_error('time_aplly', langView('fhdogs_mess_error_min_time_aplly', App.Langs) + (min_dt_apply * -1));
                valid = false;
            }
            if (minutes > max_dt_apply) {
                this.form.set_object_error('time_aplly', langView('fhdogs_mess_error_max_time_aplly', App.Langs) + (max_dt_apply));
                valid = false;
            }
        }
        return valid;
    };
    // Открыть форму править
    form_hd_outgoing_sostav.prototype.edit = function (data) {
        this.out_clear();
        this.wagons = data ? data.wagons : null;
        var list_way = this.ids_dir.getListWays2('id', 'way_num', 'way_name', App.Lang, function (i) { return i.id_station === data.id_station && i.way_delete === null; });
        this.form.view_edit(data);
        this.form.update_list_element('id_way', list_way, data.id_way);
        this.mf_edit.open(langView('fhdogs_title_form_edit', App.Langs));
    };
    // Сохранить объект
    form_hd_outgoing_sostav.prototype.save = function (data) {
        this.out_clear();
        this.update(data);
    };
    // Изменить объект
    form_hd_outgoing_sostav.prototype.update = function (data) {
        LockScreen(langView('fhdogs_mess_operation_run', App.Langs));
        var list_dislocation = [];
        // Определим вагоны
        if (this.wagons && this.wagons.length > 0) {
            $.each(this.wagons, function (i, el) {
                list_dislocation.push({ wir_id: el.id_wir, position: el.outgoing_car_position_outgoing })
            });
        }
        // Определим операцию
        var operation_dislocation = {
            id_way_from: data.id_way_old,
            reverse: data.reverse,
            list_dislocation: list_dislocation,
            id_way_on: data.id_way,
            side_on: data.side,
            lead_time: data.time_aplly,
            locomotive1: data.locomotive1,
            locomotive2: data.locomotive2,
            user: App.User_Name,
        }
        // Выполним операцию "Сменить дислокацию предъявленного состава"
        this.ids_wsd.postOutgoingDislocationWagons(operation_dislocation, function (result) {
            if (result > 0) {
                this.mf_edit.close(); // закроем форму
                if (typeof this.settings.fn_edit === 'function') {
                    this.settings.fn_edit({ data: data, result: result });
                }
                LockScreenOff();
            } else {
                LockScreenOff();
                this.mf_edit.out_error(langView('fhdogs_mess_error_operation_outgoing_dislocation', App.Langs) + result);
            }
        }.bind(this));
    };
    // Очистить сообщения
    form_hd_outgoing_sostav.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_hd_outgoing_sostav.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_hd_outgoing_sostav.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_hd_outgoing_sostav.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_hd_outgoing_sostav.destroy = function () {
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

    App.form_hd_outgoing_sostav = form_hd_outgoing_sostav;

    window.App = App;

})(window);