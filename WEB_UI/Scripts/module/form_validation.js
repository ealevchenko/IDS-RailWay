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
    // Валидацтя форм
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
    // Инициализация
    form_validation.prototype.init = function (alert, elemens) {
        // Найдем все элемены
        var element = this.$form.find('input, select, textarea');
        this.all_obj = element;
        this.$alert = alert;    // Алерт
        this.elemens = elemens; // Элементы
        this.val = new VALIDATION(App.Lang, this.$alert, this.all_obj); // Создадим класс VALIDATION
        this.$form.on('submit', function (event) {
            event.preventDefault();
            var data = $(event.currentTarget).serializeArray();
            var fm_element = $(event.currentTarget).find('input, select, textarea');
            $.each(fm_element, function (i, el) {
                var valid = el.validity;
            }.bind(this));
            //var valid = this.$form.checkValidity();
        }.bind(this));
    };

    form_validation.prototype.valid = function () {
        this.val.clear_all();
        var valid = true;
        $.each(this.elemens, function (i, el) {
            var value = el.element.val();
            var type = el.type;
            var validation = el.validation;
            // Необходима проверка
            if (validation && validation.length > 0) {
                $.each(validation, function (i, el_valid) {
                    if (el_valid.check_type === 'not_null') {
                        if (type === 'select') {
                            this.val.checkSelection(el.element.$element, el_valid.error, el_valid.ok)
                        }
                    }
                    if (el_valid.check_type === 'range_number') {
                        if (type === 'number') {
                            this.val.checkInputOfRange(el.element.$element, el_valid.min, el_valid.max, el_valid.error, el_valid.ok)
                        }
                    }
                }.bind(this));
            }
        }.bind(this));
    };

    form_validation.prototype.clear = function () {
        this.val.clear_all();
    };

    App.form_validation = form_validation;

    window.App = App;
})(window);