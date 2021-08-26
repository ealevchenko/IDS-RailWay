/// <reference path="common.js" />
/// <reference path="form_validation.js" />

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
            'title_select': 'Выберите...',
            'mess_load_reference': 'Загружаю справочники...',
        },
        'en':  //default language: English
        {
            'title_select': 'Select ...',
            'mess_load_reference': 'Loading references ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var fc_ui = new FC();

    //-------------------------------------------------------------------------------
    // Создадим макет "Модальной формы"
    function modal_form(base) {
        var size = "";
        if (base.settings.size !== "") {
            size = "modal-" + base.settings.size;
        }
        var $div_modal = $('<div></div>', {
            'id': 'em-' + base.selector,
            'class': 'modal fade',
            'tabindex': '1',
            'aria-labelledby': 'ml-' + base.selector,
            'aria-hidden': 'true',
        });
        var $div_md = $('<div></div>', {
            'class': 'modal-dialog ' + size,

        });
        var $div_mc = $('<div></div>', {
            'class': 'modal-content',

        });
        var $div_mh = $('<div></div>', {
            'class': 'modal-header',
        });
        var $div_mb = $('<div></div>', {
            'class': 'modal-body',
        });
        var $div_mf = $('<div></div>', {
            'class': 'modal-footer',
        });
        var $h5 = $('<h5></h5>', {
            'id': 'ml-' + base.selector,
            'class': 'modal-title font-weight-bold',
            'text': base.settings.title,
        });
        var $button_modal_close = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
            'class': 'close',
        });
        var $span = $('<span aria-hidden="true">&times;</span>');
        var $button_modal_cancel = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'text': 'Отмена',
            'class': 'btn btn-secondary',
        });
        var $button_modal_ok = $('<button></button>', {
            'type': 'button',
            'text': 'Ок',
            'class': 'btn btn-primary',
        });
        var $form = $('<form></form>', {
            'id': 'fm-' + base.selector,
            'novalidate': null,
            'class': 'needs-validation',
        });
        $button_modal_close.append($span);
        $div_mh.append($h5).append($button_modal_close);
        $div_mf.append($button_modal_cancel).append($button_modal_ok);
        this.$form = $form;
        this.$bt_ok = $button_modal_ok;
        $div_mb.append(this.$form);
        this.$body = $div_mb;
        $div_mc.append($div_mh).append(this.$body).append($div_mf);
        $div_md.append($div_mc);
        $div_modal.append($div_md);
        this.$element = $div_modal;
    };
    // Создать макет "Alert"
    function alert_eliment(base) {
        var $div_row = $('<div></div>', {
            'class': 'form-row',
        });
        var $div_col = $('<div></div>', {
            'class': 'col-xl-12',
        });
        var $div_alert = $('<div></div>', {
            'class': 'alert',
            'id': 'alert-' + base.selector,
        });
        this.$alert = $div_alert;
        $div_row.append($div_col.append(this.$alert));
        this.$element = $div_row;
    };
    // Создать макет ROW
    function row_element() {
        var $div_row = $('<div></div>', {
            'class': 'form-row',
        });
        this.$element = $div_row;
    };
    // Создать макет COL
    function col_element(size) {
        var $div_col = $('<div></div>', {
            'class': 'col-xl-' + size + ' mb-1',
        });
        this.$element = $div_col;
    };
    // Создать макет SELECT
    function select_element(col, base, name, text, mode) {
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': base.selector + '-' + name + '-' + mode,
            'text': text,
            'data-mode': mode,
        });
        var $select = $('<select></select>', {
            'class': 'form-control',
            'id': base.selector + '-' + name + '-' + mode,
            'name': base.selector + '-' + name + '-' + mode,
            'data-mode': mode,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
            'data-mode': mode,
        });
        this.$element = $select;
        col.append($lab).append($select).append($div_invalid);
    };
    // Создать макет INPUT
    function input_element(col, base, name, text, mode, type) {
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': base.selector + '-' + name + '-' + mode,
            'text': text,
            'data-mode': mode,
        });
        var $input = $('<input>', {
            'class': 'form-control',
            'id': base.selector + '-' + name + '-' + mode,
            'name': base.selector + '-' + name + '-' + mode,
            'type': type,
            'data-mode': mode,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
            'data-mode': mode,
        });
        this.$element = $input;
        col.append($lab).append($input).append($div_invalid);
    };
    // Создать макет checkbox
    function checkbox_element(col, base, name, text, mode) {
        var $div_fm_check = $('<div></div>', {
            'class': 'form-check',
            'data-mode': mode,
        });
        var $lab = $('<label></label>', {
            'class': 'form-check-label',
            'for': base.selector + '-' + name + '-' + mode,
            'text': text,
            'data-mode': mode,
        });
        var $input = $('<input>', {
            'class': 'form-check-input',
            'id': base.selector + '-' + name + '-' + mode,
            'name': base.selector + '-' + name + '-' + mode,
            'type': 'checkbox',
            'data-mode': mode,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
            'data-mode': mode,
        });
        this.$element = $input;
        $div_fm_check.append($input).append($lab).append($div_invalid);
        col.append($div_fm_check);
    };
    // Создать макет TEXTAREA
    function textarea_element(col, base, name, text, mode) {
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': base.selector + '-' + name + '-' + mode,
            'text': text,
            'data-mode': mode,
        });
        var $textarea = $('<textarea></textarea>', {
            'class': 'form-control',
            'id': base.selector + '-' + name + '-' + mode,
            'name': base.selector + '-' + name + '-' + mode,
            'data-mode': mode,
            'rows': '2'
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
            'data-mode': mode,
        });
        this.$element = $textarea;
        col.append($lab).append($textarea).append($div_invalid);

    };
    // Получить макет элемента по типу 
    function get_form_element(col, base, name, text, mode, type) {
        var element = null;
        //this.$element = null;
        if (type === 'select') {
            element = new select_element(col, base, name, text, mode);
            return element.$element;
        }
        if (type === 'number') {
            element = new input_element(col, base, name, text, mode, 'number');
            return element.$element;
        }
        if (type === 'text') {
            element = new input_element(col, base, name, text, mode, 'text');
            return element.$element;
        }
        if (type === 'datetime') {
            element = new input_element(col, base, name, text, mode, 'datetime');
            return element.$element;
        }
        if (type === 'date') {
            element = new input_element(col, base, name, text, mode, 'date');
            return element.$element;
        }
        if (type === 'textarea') {
            element = new textarea_element(col, base, name, text, mode, 'textarea');
            return element.$element;
        }
        if (type === 'checkbox') {
            col.attr('style', 'display:flex;align-items:center');
            element = new checkbox_element(col, base, name, text, mode);
            return element.$element;
        }
        if (type === 'autocomplete') {
            element = new input_element(col, base, name, text, mode, 'text');
            return element.$element;
        }
    };
    // Получить элемент формы в зависисмости от типа
    function form_element(col, base, name, text, add, edit) {
        this.$element_add = get_form_element(col, base, name, text, 'add', add);
        this.$element_edit = get_form_element(col, base, name, text, 'edit', edit);
    };
    // Инициализация полей формы   
    function init_form_element(element, field, type) {
        var init_element = null;
        if (type === 'select') {
            init_element = new fc_ui.init_select(element, field.list, -1, null, field.select);
        }
        if (type === 'number') {
            init_element = new fc_ui.init_input(element, null, field.select);
        }
        if (type === 'text') {
            init_element = new fc_ui.init_input(element, null, field.select);
        }
        if (type === 'checkbox') {
            init_element = new fc_ui.init_checkbox(element, null, field.select);
        }
        if (type === 'datetime') {
            init_element = new fc_ui.init_datetime_input(element, null, field.close, true);
        }
        if (type === 'date') {
            init_element = new fc_ui.init_datetime_input(element, null, field.close, false);
        }
        if (type === 'textarea') {
            init_element = new fc_ui.init_textarea(element, null, field.select);
        }
        if (type === 'autocomplete') {
            init_element = new fc_ui.init_autocomplete(element, { data: field.list, minLength: 2 });
        }
        return init_element;
    };
    //-------------------------------------------------------------------------------
    // Конструктор формы 
    function modal_edit_form(selector) {
        if (!selector) {
            throw new Error('Не указан селектор!');
        }
        this.selector = selector;
    }
    // Инициализация модальной формы
    modal_edit_form.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            fields_form: [],
            source: null,
            alert: false,
            title: "Титле",
            size: "",
            fn_ok: null,

        }, options);
        this.rules_valid = [];
        this.data = null;


        //---------------------------------------------------------
        // Создадим модальную форму для редактирования
        var modalElement = new modal_form(this);
        //this.$body_modal = modalElement.$body;
        // Создадим ссылку на форму
        this.$form_modal = modalElement.$form;
        // Создадим ссылку на кнопку и обработку события нажатия
        this.$bt_ok = modalElement.$bt_ok;
        this.$bt_ok.on('click', function (e) {
            e.preventDefault();
            this.$form_modal.submit();
        }.bind(this));
        // Создать Alert, если указано в настройках
        this.$alert = null;
        this.alert_form = null;
        if (this.settings.alert) {
            var alertElement = new alert_eliment(this);
            this.$alert = alertElement.$alert;
            this.$form_modal.append(alertElement.$element);
            this.alert_form = new ALERT(this.$alert); // Создадим класс ALERTG
        }

        $('body').append(modalElement.$element);
        //---------------------------------------------------------
        // Создаем элементы и отрисовываем их на форме
        // Получим список элементов которые должны отображатся на форме
        var form_elements = this.settings.fields_form.filter(function (i) {
            return i.row !== null;
        }).sort(function (a, b) {
            return a.row - b.row;
        });
        var row = 0;
        var col = 0;
        var $row = null;
        // Пройдемся по элементам и отрисуем их на форме
        $.each(form_elements, function (i, el_field) {
            if (el_field.row !== row) {
                // Это новая строка, создадим ее
                if ($row) this.$form_modal.append($row);
                col = 0;
                var rowElement = new row_element();
                $row = rowElement.$element;
                row = el_field.row;
            };
            if (el_field.col !== col) {
                // Это новая колонка, строки
                var colElement = new col_element(el_field.size);
                var $col = colElement.$element;
                // Получим и добавим элементы
                var colElement = new form_element($col, this, el_field.name, el_field.label, el_field.add, el_field.edit);
                // Добавить метку заполнитель
                if (el_field.placeholder) {
                    colElement.$element_add.attr('placeholder', el_field.placeholder);
                    colElement.$element_edit.attr('placeholder', el_field.placeholder);
                }
                // Добавить макс длину
                if (el_field.maxlength) {
                    colElement.$element_add.attr('maxlength', el_field.maxlength);
                    colElement.$element_edit.attr('maxlength', el_field.maxlength);
                }
                // Добавить признак обязательное поле
                if (el_field.required) {
                    colElement.$element_add.attr('required', '');
                    colElement.$element_edit.attr('required', '');
                }
                var $element_add = init_form_element(colElement.$element_add, el_field, el_field.add);
                var $element_edit = init_form_element(colElement.$element_edit, el_field, el_field.edit);
                var field = this.settings.fields_form.find(function (o) { return o.field === el_field.field });
                if (field) {
                    if ($element_add) {
                        field['element_add'] = $element_add;
                        if (el_field.add_validation) this.rules_valid.push({ name: $($element_add.$element).attr('name'), validation: el_field.add_validation });
                    };
                    if ($element_edit) {
                        field['element_edit'] = $element_edit;
                        if (el_field.edit_validation) this.rules_valid.push({ name: $($element_edit.$element).attr('name'), validation: el_field.edit_validation });
                    };
                };
                col = el_field.col;
                $row.append($col);
            }
        }.bind(this));
        if ($row) this.$form_modal.append($row);
        // Пройдемся по зависимостям
        $.each(form_elements.filter(function (i) { return i.control !== null }), function (i, el_control) {
            var n_control = el_control.control;
            var element_control = form_elements.find(function (o) {
                return o.name === n_control;
            });
            if (element_control) {
                if (element_control.element_add && el_control.element_add) {
                    el_control.element_add['element_control'] = element_control.element_add;
                }
                if (element_control.element_edit && el_control.element_edit) {
                    el_control.element_edit['element_control'] = element_control.element_edit;
                }
            } else {
                throw new Error('Неопределен контролируемый элемент : ' + n_control);
            }
        }.bind(this));
        // Валидация, инициализация модуля 
        var FVAL = App.form_validation;
        this.form_val = new FVAL('#' + this.$form_modal.attr('id')); // Создадим экземпляр таблицы
        this.form_val.init(this.$alert, this.rules_valid, function (valid) {
            var result = {};
            // Проверим валидация прошла
            if (valid) {
                // Заполним result полями
                $.each(this.settings.fields_form, function (i, el) {
                    //TODO: Переключить val() на element_form
                    var element = this.data ? (el.element_edit ? el.element_edit.$element : null) : (el.element_add ? el.element_add.$element : null);
                    var element_form = this.data ? (el.element_edit ? el.element_edit : null) : (el.element_add ? el.element_add : null);
                    var type = this.data ? el.edit : el.add;
                    var value = element ? ($(element).attr('type') === "checkbox" ? $(element).prop('checked') : element.val()) : null;
                    switch (type) {
                        case null: {
                            result[el.field] = this.data ? this.data[el.field] : el.default;

                            break;
                        };
                        case "select": {
                            //result[el.field] = value !== null && value !== "-1" ? Number(value) : null;
                            var value = element_form.val();
                            result[el.field] = value !== null && value !== "-1" ? Number(value) : null;
                            break;
                        };
                        case "text": {
                            //result[el.field] = value;
                            result[el.field] = element_form.val();
                            break;
                        };
                        case "textarea": {
                            //result[el.field] = value;
                            result[el.field] = element_form.val();
                            break;
                        };
                        case "number": {
                            //result[el.field] = value !== null && value !== "" ? Number(value) : null;
                            var value = element_form.val();
                            result[el.field] = value !== null && value !== "" ? Number(value) : null;
                            break;
                        };
                        case "checkbox": {
                            var value = element_form.val();
                            result[el.field] = value !== null && value !== "" ? Boolean(value) : null;
                            break;
                        };
                        case "datetime": {
                            //result[el.field] = value !== null && value !== "" ? moment(value, 'DD.MM.YYYY HH:mm').toISOString() : null;
                            var value = element_form.val();
                            result[el.field] = value;// !== null && value !== "" ? moment(value, 'DD.MM.YYYY HH:mm').toISOString() : null;;
                            break;

                        };
                        case "autocomplete": {
                            result[el.field] = element_form.val();
                            break;
                        };
                    }
                }.bind(this));
                if (typeof this.settings.fn_ok === 'function') {
                    this.settings.fn_ok({ old: this.data, new: result });
                }
            }
        }.bind(this));
        // Инициализация модальной формы
        this.$modal_edit = $('div#em-' + this.selector).modal({
            keyboard: false,
            show: false
        }).on('show.bs.modal', function (event) {
            // do something...
        });
    };
    // Показать данные 
    modal_edit_form.prototype.view = function (data) {
        this.form_val.clear();
        this.data = data;
        this.form_elements = null;
        this.mode = null;
        // Определим элементы для сокрытия в зависимости от режима добавить - править
        var el_add = this.$form_modal.find('[data-mode="add"]');
        var el_edit = this.$form_modal.find('[data-mode="edit"]');
        if (this.data) {
            // Править
            this.form_elements = this.settings.fields_form.filter(function (i) {
                return i.element_edit;
            });
            $(el_add).hide();
            $(el_edit).show();
            this.mode = 'edit';
        } else {
            // Добавить
            this.form_elements = this.settings.fields_form.filter(function (i) {
                return i.element_add;
            });
            $(el_add).show();
            $(el_edit).hide();
            this.mode = 'add';
        }
        // Заполним данными
        $.each(this.form_elements, function (i, el) {
            // Получим значение поля
            //var value = data ? data[el.field] : (el[this.mode] === "select" ? -1 : el.default);
            var value = data ? data[el.field] : el.default;
            if (value !== undefined) {
                // Значение поля определено, получим элемент
                var element = el['element_' + this.mode];
                // Покажем значение
                element.val(value);
                // Проверим наличие элемента который должен быть изменен если изменить текущий элемент
                if (element.element_control) {
                    // Обновим текщий элемент, для запуска цепочки обновлений
                    element.$element.change();
                }
            } else {
                throw new Error('Ошибка считывания значения поля [' + el.field + ']');
            };
        }.bind(this));

        this.$modal_edit.modal('show');
    };
    // Закрыть форму 
    modal_edit_form.prototype.close = function () {
        this.$modal_edit.modal('hide');
    };
    // Вывести на форме сообщение об ошибке 
    modal_edit_form.prototype.out_error = function (message) {
        if (this.alert_form) {
            this.alert_form.out_error_message(message)
        }
    };
    // Обновить значение по умолчанию по указанному полю (Применяется если при добавлении нужно чтобы некоторые поля уже были заполнены значениями)
    modal_edit_form.prototype.set_default_fields_form = function (field, value_default) {
        if (this.settings.fields_form) {
            var field = this.settings.fields_form.find(function (o) {
                return o.field === field
            });
            if (field) {
                field.default = value_default;
            }
        }
    }
    // Обновить списочный компонент
    modal_edit_form.prototype.update_list_fields_form = function (field, list) {
        if (this.settings.fields_form) {
            var field = this.settings.fields_form.find(function (o) {
                return o.field === field
            });
            if (field) {
                if (field.element_add) {
                    field.element_add.update(list, field.element_add.val(), null);
                }
                if (field.element_edit) {
                    field.element_edit.update(list, field.element_add.val(), null);
                }
            }
        }
    }
    // Вывести на форме сообщение об ошибке под элементом
    modal_edit_form.prototype.set_object_error = function (field, mode, message) {
        if (this.settings.fields_form) {
            var field = this.settings.fields_form.find(function (o) {
                return o.field === field
            });
            if (field) {
                var el = field['element_' + mode].$element;
                if (this.form_val && this.form_val.val) this.form_val.val.set_object_error($(el), message);
            }
        }
    };

    App.modal_edit_form = modal_edit_form;

    window.App = App;
})(window);