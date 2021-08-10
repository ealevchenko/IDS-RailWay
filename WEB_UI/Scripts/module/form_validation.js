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
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //--------------------------------Конструктор и инициализация---------------
    // создать класс валидации форм
    function form_validation(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$form = $(selector);
        if (this.$form.length === 0) {
            throw new Error('Неуказан селектор form: ' + selector);
        }
        this.selector = this.$form.attr('id');
    }
    // Инициализация валидации
    form_validation.prototype.init = function (alert, rules_val, fn_ok) {
        // Найдем все элемены
        var element = this.$form.find('input, select, textarea');
        this.all_obj = element;
        this.$alert = alert;    // Алерт
        this.rules_val = rules_val; // Элементы
        this.val = new VALIDATION(App.Lang, this.$alert, this.all_obj); // Создадим класс VALIDATION
        this.valid = true;
        // Обработка отправки полей на сервер
        this.$form.on('submit', function (event) {
            event.preventDefault();
            this.val.clear_all();
            $(this.$form.find('div.invalid-feedback')).text('');
            this.valid = true;
            var fm_element = $(event.currentTarget).find('input:visible, select:visible, textarea:visible');
            $.each(fm_element, function (i, el) {
                var valid = el.validity;
                // Проверим внешние правила
                if (this.rules_val === null) {
                    // Нет внешних правил
                    if (!valid.valid) {
                        this.valid = false;
                        if (valid.valueMissing) {
                            this.val.set_object_error($(el), "Элемент [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - не заполнен.");
                        }
                        if (valid.patternMismatch) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - не соответствует шаблону.");
                        }
                        if (valid.patternMismatch) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - не соответствует шаблону.");
                        }
                        if (valid.rangeOverflow) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - больше максимально допустимого (" + el.max + ").");
                        }
                        if (valid.rangeUnderflow) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - меньше минимально допустимого (" + el.min + ").");
                        }
                        if (valid.tooLong) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - значение превышает лимит (" + el.maxlength + ").");
                        }
                        if (valid.tooShort) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - не достигает минимума (" + el.minlength + ").");
                        }
                        if (valid.typeMismatch) {
                            this.val.set_object_error($(el), "Значение элемента [" + (el.placeholder !== "" ? el.placeholder : el.id) + "] - не соответствует требуемому синтаксису (" + el.type + ").");
                        }
                    } else {
                        this.val.set_control_ok($(el), "");
                    }
                } else {
                    // Есть внешние првила
                    var val = el.value;
                    var tag = el.tagName;
                    var type = el.type;
                    var name = el.name;

                    var rules = this.rules_val.find(function (o) {
                        return o.name === name;
                    });
                    // Проверим наличие правила
                    if (rules && rules.validation && rules.validation && rules.validation.length > 0) {
                        $.each(rules.validation, function (i, el_valid) {
                            // Проверка на пустое значение
                            if (el_valid.check_type === 'not_null') {
                                if (tag === 'SELECT') {
                                    this.valid = this.valid & this.val.checkSelection($(el), el_valid.error, el_valid.ok)
                                }
                                if (tag === 'INPUT') {
                                    this.valid = this.valid & this.val.checkInputOfNull($(el), el_valid.error, el_valid.ok)
                                }
                            }
                            // Проверка на приделы мин-макс
                            if (el_valid.check_type === 'range_number') {
                                if (tag === 'INPUT') {
                                    this.valid = this.valid & this.val.checkInputOfRange($(el), el_valid.min, el_valid.max, el_valid.error, el_valid.ok)
                                }
                            }
                        }.bind(this));
                    } else {
                        this.val.set_control_ok($(el), "");
                    }
                };
            }.bind(this));
            if (!this.valid) {
                event.stopPropagation();
            }
            if (typeof fn_ok === 'function') {
                fn_ok(Boolean(this.valid));
            }
        }.bind(this));
    };
    // Очистить форму от сообщений
    form_validation.prototype.clear = function () {
        this.val.clear_all();
        $(this.$form.find('div.invalid-feedback')).text('');
    };

    App.form_validation = form_validation;

    window.App = App;
})(window);