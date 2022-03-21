/*Модуль Сплывающее окно детально*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
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
    function form_detali() {
        this.fc_ui = new FC();
    }
    // Инициализация валидации
    form_detali.prototype.init = function (options) {
        this.init = true;
        this.settings = $.extend({
            alert: null,
            fn_init: null,
            fn_open: null,
            fn_close: null,
        }, options);
        //<div id="cars-detali">
        //    <div class="container-fluid">
        //        <div class="alert" id="cars-detali-alert"></div>
        //        <div>
        //        </div>
        //        <a href="#0" class="close cd-img-replace">Close</a>
        //    </div>
        //</div>
        // 
        var div_cars_detali = new this.fc_ui.el_div(null, 'cd-cars-detali');
        this.$card_detali = div_cars_detali.$div;
        //
        var div_container_fluid = new this.fc_ui.el_div(null, 'container-fluid');
        this.$card_detali.append(div_container_fluid.$div);
        //
        var div_alert = new this.fc_ui.el_div(null, 'alert');
        var div_content = new this.fc_ui.el_div('cars-detali-content', 'cd-form');
        this.$card_detali_content = div_content.$div;
        var $a_close = new this.fc_ui.el_a(null, 'close cd-img-replace', '#0', 'Close', null, null)
        div_container_fluid.$div.append(div_alert.$div).append(this.$card_detali_content).append($a_close.$alink);
        //
        this.$card_detali.append(div_container_fluid.$div);
        $('body').append(this.$card_detali);
        // Настройка закрыть детали проекта
        this.$card_detali.on('click', '.close', function (event) {
            event.preventDefault();
            if (typeof this.settings.fn_close === 'function') {
                this.settings.fn_close();
            }
            this.$card_detali.removeClass('is-visible');
        }.bind(this));
        //
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.init);
        }
    };
    // Очистить форму от сообщений
    form_detali.prototype.open = function () {
        if (typeof this.settings.fn_open === 'function') {
            this.settings.fn_open();
        }
        this.$card_detali.addClass('is-visible');
    };

    App.form_detali = form_detali;

    window.App = App;
})(window);