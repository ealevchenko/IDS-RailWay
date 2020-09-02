jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_': '',

            },
            'en':  //default language: English
            {
                'field_': '',
            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        alert = new ALERT($('div#main-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
        loadReference = function (callback) {
                    LockScreen(langView('mess_load', langs));
                    var count = 1;
                    ids_inc.load([], ['station', 'ways'], [], false, function () {
                        count -= 1;
                        if (count === 0) {
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }
                    });
                };


    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        LockScreenOff();
    });
});