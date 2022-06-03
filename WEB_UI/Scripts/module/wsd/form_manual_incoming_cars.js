/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль Форма "Добавить вагоны в ручном режиме"*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    //var min_err_date_arrival = -2 * 60;         // TODO: Минимальная разница в минутах дата прибытия
    //var max_err_date_arrival = 2 * 60;          // TODO: Максимальная разница в минутах дата прибытия
    //var max_err_date_adoption = 3 * 24 * 60;    // TODO: Максимальная разница в минутах дата приема
    //var min_err_date_adoption_act = -2 * 60;    // TODO: Минимальная разница в минутах дата приема по акту
    //var max_err_date_arrival_act = 2 * 60;      // TODO: Максимальная разница в минутах дата приема по акту

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'fmic_title_edit': 'Ок',
            'fmic_title_cancel': 'Отмена',

            'fmic_label_check_sys_num': 'Проверка системной нумерации',
            'fmic_label_list_nums': 'Добавте номера вагонов',
            'fmic_title_list_nums': 'xxxxxxxx;xxxxxxxx;',

            'fmic_field_num': '№Вагона',
            'fmic_field_position': 'Позиция',

            'fmic_title_search_cars': 'Поиск и проверка вагонов',

            //'fmic_title_label_num_doc': '№ Документа:',
            //'fmic_title_placeholder_num_doc': '№Документа',
            //'fmic_title_label_train': '№ Поезда:',
            //'fmic_title_placeholder_train': '№Поезда',
            //'fmic_title_label_composition_index': 'Индекс поезда',
            //'fmic_title_placeholder_composition_index': 'Индекс поезда',
            //'fmic_title_label_date_arrival': 'Дата и время прибытия:',
            //'fmic_title_placeholder_date_arrival': 'Время прибытия',
            //'fmic_title_label_date_adoption': 'Дата и время приема:',
            //'fmic_title_placeholder_date_adoption': 'Время приема',
            //'fmic_title_label_date_adoption_act': 'Дата и время приема (акт):',
            //'fmic_title_placeholder_date_adoption_act': 'Время приема (акт)',
            //'fmic_title_label_station_from': 'Прибытие со станции:',
            //'fmic_title_placeholder_station_from': 'Станция прибытия:',
            //'fmic_title_label_station_on': 'Принять на станцию:',
            //'fmic_title_placeholder_station_on': 'Принять на станцию:',
            //'fmic_title_label_way': 'Принять на путь:',
            //'fmic_title_placeholder_way': 'Принять на путь:',
            //'fmic_title_label_numeration': 'Начало нумерации с:',
            //'fmic_title_placeholder_numeration': 'Принять на путь:',
            //'fmic_title_head': 'Голова',
            //'fmic_title_tail': 'Хвост',

            //'fmic_title_label_note': 'Примечание:',
            //'fmic_title_placeholder_note': 'Примечание',
            'fmic_title_form_add': 'Добавить вагоны в ручном режиме',
            //'fmic_title_form_edit': 'Править состав',
            //'fmic_title_form_arrival': 'Принять состав',
            'fmic_mess_init_module': 'Инициализация модуля(form_manual_incoming_cars)...',
            'fmic_mess_operation_run': 'Выполняю операцию...',

            'fmic_form_add_cars': 'Добавить?',
            'fmic_form_add_cars_message': 'Добавить вагоны в количестве {0} шт. в состав?',

            'fmic_mess_input_wagon': 'Введите номера вагонов через разделитель “;”, и нажмите кнопку проверка. Внимание! Вагоны будут проверены на системную нумерацию введённого номера вагона(чтобы этот режим отключить - уберите галочку “Проверка системной нумерации”)',
            'fmic_mess_error_not_cars': 'Введите номер вагона или несколько вагонов, разделитель номеров ";"',
            'fmic_mess_error_input_num_cars': 'Ошибка ввода, номер позиции :{0}, введен неправильный номер :{1}',
            'fmic_mess_error_input_num_cars1': 'Ошибка ввода, номер позиции :{0}, номер не может быть меньше или равен 0 :{1}',
            'fmic_mess_error_input_num_cars2': 'Ошибка ввода, номер позиции :{0}, не системная нумерация (ошибка контрольной суммы) :{1}',
            'fmic_mess_error_input_num_cars_duble': 'Ошибка ввода, введеный номер :{0} - повторяется!',
            'fmic_mess_error_info': 'Исправьте указанные номера в указанных позициях и попробуйте заново.',

            'fmic_mess_error_search_cars': 'Ошибка выполнения операции "Поиск информации по вагонам введеным вручную, код ошибки:{0}"',
            'fmic_mess_run_operation_add_wagon': 'Выполняю операцию "ДОБАВИТЬ ВАГОНЫ В СОСТАВ"',
            'fmic_mess_run_error_operation_add_wagon': 'Ошибка выполнения операции "ДОБАВИТЬ ВАГОНЫ В СОСТАВ", код ошибки :{0}',
            
            //'fmic_error_date_arrival': 'Укажите правильно дату и время',
            //'fmic_error_date_arrival_not_deff_date_curent': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от текущего времени',
            //'fmic_error_date_arrival_not_deff_date_curent_arrival': 'Дата и время прибытия должны быть не меньше {0} мин. или больше {1} мин. от прошлой даты прибытия {2}',
            //'fmic_error_date_arrival_not_deff_date_adoption': 'Дата и время прибытия должны быть не меньше {0} мин. и не равно {1} времени приема',
            //'fmic_error_date_arrival_not_deff_date_adoption_act': 'Дата и время прибытия по акту должны быть не меньше {0} мин. или больше {1} мин. от времени приема.',
            //'fmic_mess_error_add_sostav': 'Ошибка выполнения операции "Создать состав прибытия", код ошибки = ',
            //'fmic_mess_error_edit_sostav': 'Ошибка выполнения операции "Обновить состав прибытия", код ошибки = ',
            //'fmic_mess_error_operation_arrival_sostav': 'Ошибка выполнения операции "ПРИНЯТЬ СОСТАВ НА АМКР", код ошибки = ',

        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FC = App.form_control;
    var wsd = App.ids_wsd;

    function form_manual_incoming_cars() {
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_manual_incoming_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_manual_incoming_cars.prototype.init = function (options) {
        this.init = true;
        LockScreen(langView('fmic_mess_init_module', App.Langs));
        this.settings = $.extend({
            id: 'fmic',
            alert: null,
            ids_wsd: null,
            fn_init: null,
            fn_add: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.elements = {}; // Все элементы формы
        this.id_sostav = null;
        this.rows = []; // Выбранные поля
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db([], false, function (result) {
        // Подгрузили списки
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
            id: 'mf-fmic-' + this.settings.id,
            prefix: 'lg',
            cl_modal: null,
            //form: this.form,
            label_ok: langView('fmic_title_edit', App.Langs),
            label_close: langView('fmic_title_cancel', App.Langs),
            ok_click: function (e) {
                e.preventDefault();
                this.mf_edit.close();
                // Вопрос перенести вагоны
                this.modal_confirm_form.view(langView('fmic_form_add_cars', App.Langs), langView('fmic_form_add_cars_message', App.Langs).format(this.rows.length), function (res) {
                    if (res) {
                        // Выполним перенос
                        this.action_add_cars();
                    } else {
                        this.mf_edit.open(langView('fmic_title_form_add', App.Langs));
                    };
                }.bind(this));
            }.bind(this),
            //close_click: function () {

            //},
            form_open: function () {
                $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
            }.bind(this),
        });
        this.mf_edit.$bt_ok.prop('disabled', true);

        // Создадим форму добавления вагонов
        var FDL = App.form_dialog;
        this.form = new FDL();
        // Создать макет панели
        var objs = [];
        // Форма детально
        var row_input = {
            obj: 'bs_row',
            options: {
                class: null,
            },
            childs: []
        };
        var col_input = {
            obj: 'bs_col',
            options: {
                size: 'xl',
                col: 12,
                class: null,
            },
            childs: []
        };
        // Общие данные
        var fieldset_input = {
            obj: 'fieldset',
            options: {
                class: 'border-primary',
                legend: null,
                class_legend: null,
            },
            childs: []
        };
        var form_row_input = {
            obj: 'bs_form_row',
            options: {
                class: null,
            },
            childs: []
        };
        var form_checkbox_route_flag = {
            obj: 'bs_checkbox',
            element: null,
            options: {
                id: 'check_sys_num',
                form_group_size: 'xl',
                form_group_col: 12,
                form_group_class: 'text-left',
                label: langView('fmic_label_check_sys_num', App.Langs),
                label_class: 'mb-1',
                checkbox_class: 'inp-auto',
                checkbox_title: null,
                checkbox_required: null,
                checkbox_readonly: false,
                element_default: true,
                element_change: null,
            },
            childs: []
        };
        var form_row_input1 = {
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
                title: langView('fmic_title_search_cars', App.Langs),
                icon_left: null,
                icon_right: 'fas fa-search',
                click: function (event) {
                    event.preventDefault();
                    this.action_search_car();
                }.bind(this),
            }
        };
        var form_textarea_list_nums = {
            obj: 'bs_textarea',
            options: {
                id: 'list_nums',
                validation_group: 'search',
                form_group_size: 'xl',
                form_group_col: 12,
                form_group_class: 'text-left',
                label: langView('fmic_label_list_nums', App.Langs),
                label_class: 'mb-1',
                textarea_size: null,
                textarea_rows: 3,
                textarea_class: 'inp-manual',
                textarea_title: langView('fmic_title_list_nums', App.Langs),
                textarea_maxlength: null,
                textarea_placeholder: null,
                textarea_required: null,
                textarea_readonly: false,
                input_group: true,
                input_group_prepend_class: null,
                input_group_prepend_objs: [],
                input_group_append_class: null,
                input_group_append_objs: [bt_search_car],
            },
            childs: []
        };
        var form_row_input2 = {
            obj: 'bs_form_row',
            options: {
                class: null,
            },
            childs: []
        };
        var form_alert_search = {
            obj: 'bs_alert',
            options: {
                id: null,
                class: null,
                validation_group: 'search',
            },
            childs: []
        };
        var form_row_input3 = {
            obj: 'bs_form_row',
            options: {
                class: null,
            },
            childs: []
        };
        var form_div_result_cars = {
            obj: 'div',
            options: {
                id: 'result-cars',
                class: 'col-md-12',
            },
            childs: []
        };
        //Соберем форму
        form_row_input.childs.push(form_checkbox_route_flag);
        fieldset_input.childs.push(form_row_input);
        //
        form_row_input1.childs.push(form_textarea_list_nums);
        fieldset_input.childs.push(form_row_input1);
        //
        form_row_input2.childs.push(form_alert_search);
        fieldset_input.childs.push(form_row_input2);
        //
        form_row_input3.childs.push(form_div_result_cars);
        fieldset_input.childs.push(form_row_input3);

        col_input.childs.push(fieldset_input);
        row_input.childs.push(col_input);
        objs.push(row_input);
        // Инициализируем форму
        this.form.init({
            alert: this.mf_edit.alert,
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
                this.mf_edit.$body.append(this.form.$form);
                // Показать информацию
                this.form.validation_search.out_warning_message(langView('fmic_mess_input_wagon', App.Langs));

                var TMC = App.table_manual_cars; // Отправленные вагоны
                this.table_manual_cars = new TMC('div#result-cars');                         // Создадим экземпляр
                this.table_manual_cars.init({
                    type_report: 'table-searsh-cars',
                    alert: this.alert,
                    fn_select_rows: function (rows) {
                        if (rows && rows.length > 0) {
                            this.rows = rows;
                            this.mf_edit.$bt_ok.prop('disabled', false);
                        } else {
                            this.mf_edit.$bt_ok.prop('disabled', true);
                            this.rows = [];
                        }
                    }.bind(this),
                    fn_init: function (init) {
                        // На проверку окончания инициализации
                        //process--;
                        //out_init(process);
                    },
                    fn_refresh: function () {
                        //this.out_clear();
                        //this.update();
                    }.bind(this),
                });
                this.table_manual_cars.view([]);
                //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                // Инициализация закончена
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init(this.init);
                }
            }.bind(this),
        });
    }
    // Уточняющая валидация данных 
    form_manual_incoming_cars.prototype.validation = function (result) {
        var valid = true;
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
        //                this.form.set_object_error('date_arrival', langView('fmic_error_date_arrival_not_deff_date_curent', App.Langs).format(min_err_date_arrival, max_err_date_arrival));
        //            } else {
        //                this.form.set_object_error('date_adoption', langView('fmic_error_date_arrival_not_deff_date_curent', App.Langs).format(min_err_date_arrival, max_err_date_arrival));
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
        //                this.form.set_object_error('date_arrival', langView('fmic_error_date_arrival_not_deff_date_adoption', App.Langs).format(max_err_date_adoption, date_adoption.format(format_datetime)));
        //                valid = valid & false;
        //            }
        //            // Проверим дату приема по акту
        //            if (date_adoption_act !== null && date_adoption_act.isValid) {
        //                var minute_adoption = date_adoption_act.diff(date_adoption, 'minute');
        //                //- зашло в будущее + зашло в прошлое
        //                if (minute_adoption >= max_err_date_arrival_act || minute_adoption < min_err_date_adoption_act) {
        //                    this.form.set_object_error('date_adoption_act', langView('fmic_error_date_arrival_not_deff_date_adoption_act', App.Langs).format(max_err_date_arrival_act, min_err_date_adoption_act));
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
        //                    this.form.set_object_error('date_arrival', langView('fmic_error_date_arrival_not_deff_date_curent_arrival', App.Langs).format(min_err_date_arrival, max_err_date_arrival, current_date_arrival.format(format_datetime)));
        //                    valid = valid & false;
        //                }
        //            }
        //        }
        //    }
        //} else {
        //    this.form.set_object_error('date_arrival', langView('fmic_error_date_arrival', App.Langs));
        //    valid = valid & false;
        //}
        return valid;
    };
    //-------------------------------------------------------------------
    // проверка введенных вагонов
    form_manual_incoming_cars.prototype.action_search_car = function () {
        var isNumeric = function (value) {
            return /^\d+$/.test(value);
        };
        this.mf_edit.out_clear();
        this.elements.button_search_car.prop("disabled", true); // сделаем не активной
        var list_cars = this.elements.textarea_list_nums.val();
        var check = this.elements.checkbox_check_sys_num.val();
        if (list_cars !== null && list_cars !== "") {
            LockScreen(langView('fmic_mess_operation_run', App.Langs));
            // Провкерка на правильный ввод номеров
            var valid = true;
            var car_valid = [];
            var car_out = [];
            var cars = list_cars.split(';');
            $.each(cars, function (i, el) {
                if (!isNumeric($.trim(el))) {
                    this.mf_edit.out_warning(langView('fmic_mess_error_input_num_cars', App.Langs).format((i + 1), el));
                    valid = false;
                } else {
                    if (Number($.trim(el)) <= 0) {
                        this.mf_edit.out_warning(langView('fmic_mess_error_input_num_cars1', App.Langs).format((i + 1), el));
                        valid = false;
                    } else {
                        // Разрешена проверка системной нумерации
                        if (check) {
                            var num_val = is_valid_num_wagon(Number($.trim(el)));
                            // Если валидный добавим в список
                            if (num_val) {
                                car_valid.push(Number($.trim(el)));
                                car_out.push(Number($.trim(el)));
                            } else {
                                this.mf_edit.out_warning(langView('fmic_mess_error_input_num_cars2', App.Langs).format((i + 1), el));
                            }
                            valid = valid & num_val;
                        } else {
                            // добавим в список
                            car_valid.push(Number($.trim(el)));
                            car_out.push(Number($.trim(el)));
                        }
                    }
                }
            }.bind(this));
            // Провкерка на повторяющиеся номера
            var arr_res = [];
            car_valid.sort();
            for (var i = 1; i < car_valid.length; i++) {
                if (car_valid[i] === car_valid[i - 1]) {
                    var is_unique = true;
                    for (var k = 0; k < arr_res.length; k++) {
                        if (arr_res[k] === car_valid[i]) {
                            is_unique = false;
                            break;
                        }
                    }
                    if (is_unique) {
                        arr_res.push(car_valid[i]);
                    }
                }
            }
            // Вывод сообщений повторяющихся номеров
            $.each(arr_res, function (i, el) {
                this.mf_edit.out_warning(langView('fmic_mess_error_input_num_cars_duble', App.Langs).format(el));
                LockScreenOff();
            }.bind(this));
            // Продолжим 
            if (valid) {
                var operation = {
                    id_arrival_sostav: this.id_sostav,
                    check: check,
                    num_cars: car_out,
                    as_client: false,
                    user: App.User_Name,
                };
                this.ids_wsd.postOperationManualSearchArrivalWagon(operation, function (result) {
                    this.mf_edit.out_clear();
                    if (result.result > 0) {
                        this.table_manual_cars.view(result.obj);
                    } else {
                        this.mf_edit.out_warning(langView('fmic_mess_error_search_cars', App.Langs).format(result.result));
                    }
                    this.elements.button_search_car.prop("disabled", false); // сделаем активной
                    LockScreenOff();
                }.bind(this));
            } else {
                this.mf_edit.out_warning(langView('fmic_mess_error_info', App.Langs));
                this.elements.button_search_car.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }
        } else {
            this.mf_edit.out_warning(langView('fmic_mess_error_not_cars', App.Langs));
            this.elements.button_search_car.prop("disabled", false); // сделаем активной
        }
    };
    // Добавить вагоны в состав
    form_manual_incoming_cars.prototype.action_add_cars = function () {
        var cars = [];
        $.each(this.rows, function (index, value) {
            cars.push(value.num);
        }.bind(this));
        var operation = {
            id_arrival_sostav: this.id_sostav,
            num_cars: cars,
            user: App.User_Name,
        }
        LockScreen(langView('fmic_mess_run_operation_add_wagon', App.Langs));
        this.ids_wsd.postOperationManualAddArrivalWagon(operation, function (result) {
            if (result>0) {
                //Обновим данные полностью
                this.mf_edit.close(); // закроем форму
                if (typeof this.settings.fn_add === 'function') {
                    this.settings.fn_add(result);
                }
                LockScreenOff();
            } else {
                this.mf_edit.open(langView('fmic_title_form_add', App.Langs));
                this.mf_edit.out_error(langView('fmic_mess_run_error_operation_add_wagon', App.Langs).format(result));
                LockScreenOff();
            }
        }.bind(this));
    }

    // Открыть форму добавить
    form_manual_incoming_cars.prototype.add = function (id_sostav) {
        this.id_sostav = id_sostav;
        this.out_clear();
        this.mf_edit.open(langView('fmic_title_form_add', App.Langs));
    };
    // Сохранить объект
    form_manual_incoming_cars.prototype.save = function (data) {
        //this.out_clear();
        //this.update(data);
    };
    // Изменить объект
    form_manual_incoming_cars.prototype.update = function (data) {
        //LockScreen(langView('fmic_mess_operation_run', App.Langs));
        //// Добавить или править состав
        //if (this.settings.mode === 0) {
        //    if (data.old === null) {
        //        // Добавить
        //        this.ids_wsd.postIncomingSostav(data.new, function (result) {
        //            if (result > 0) {
        //                this.mf_edit.close(); // закроем форму
        //                if (typeof this.settings.fn_edit === 'function') {
        //                    this.settings.fn_add({ data: data, result: result });
        //                }
        //                LockScreenOff();
        //            } else {
        //                LockScreenOff();
        //                this.mf_edit.out_error(langView('fmic_mess_error_add_sostav', App.Langs) + result);
        //            }
        //        }.bind(this));
        //    } else {
        //        // Править
        //        data.new.change = moment().format("YYYY-MM-DDThh:mm:ss");
        //        data.new.change_user = App.User_Name;
        //        this.ids_wsd.putIncomingSostav(data.new, function (result) {
        //            if (result > 0) {
        //                this.mf_edit.close(); // закроем форму
        //                if (typeof this.settings.fn_edit === 'function') {
        //                    this.settings.fn_edit({ data: data, result: result });
        //                }
        //                LockScreenOff();
        //            } else {
        //                LockScreenOff();
        //                this.mf_edit.out_error(langView('fmic_mess_error_edit_sostav', App.Langs) + result);
        //            }
        //        }.bind(this));
        //    }
        //}
        //// Принять состав на АМКР
        //if (this.settings.mode === 1) {
        //    var operation = {
        //        id_arrival_sostav: data.new.id,
        //        num_doc: Number(data.new.num_doc),
        //        train: data.new.train,
        //        composition_index: data.new.composition_index,
        //        date_arrival: data.new.date_arrival,
        //        date_adoption: data.new.date_adoption,
        //        date_adoption_act: data.new.date_adoption_act,
        //        id_station_from: data.new.id_station_from,
        //        id_station_on: data.new.id_station_on,
        //        id_way: data.new.id_way,
        //        numeration: data.new.numeration === 1 ? true : false,
        //        count: data.new.count,
        //        user: App.User_Name,
        //    }
        //    // Выполним операцию "Принять состав на АМКР"
        //    this.ids_wsd.postOperationIncomingSostav(operation, function (result) {
        //        if (result > 0) {
        //            this.mf_edit.close(); // закроем форму
        //            if (typeof this.settings.fn_edit === 'function') {
        //                this.settings.fn_edit({ data: data, result: result });
        //            }
        //            //LockScreenOff();
        //        } else {
        //            LockScreenOff();
        //            this.mf_edit.out_error(langView('fmic_mess_error_operation_arrival_sostav', App.Langs) + result);
        //        }
        //    }.bind(this));
        //}


    };
    // Очистить сообщения
    form_manual_incoming_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_manual_incoming_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_manual_incoming_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_manual_incoming_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_manual_incoming_cars.destroy = function () {
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }

        // Очистить таблицы
        if (this.obj_t_result) {
            this.obj_t_result.destroy(true);
            this.obj_t_result = null;
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

    App.form_manual_incoming_cars = form_manual_incoming_cars;

    window.App = App;

})(window);