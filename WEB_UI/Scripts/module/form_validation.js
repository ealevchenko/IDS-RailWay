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
        this.$alert = $(selector);
        if (this.$alert.length === 0) {
            throw new Error('Неуказан селектор Alert: ' + selector);
        }
        this.selector = this.$alert.attr('id');
    }
    // Инициализация
    form_validation.prototype.init = function (all_obj) {
        this.all_obj = all_obj;

    };

    App.form_validation = form_validation;

    window.App = App;
})(window);