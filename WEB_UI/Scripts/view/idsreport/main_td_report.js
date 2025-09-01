(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {

            'mi_init_main': 'Инициализация формы ...',

        },
        'en':  //default language: English
        {
            'mi_init_main': 'Инициализация формы ...',
        }
    };

    // Определим глобальные переменные
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var VTDR = App.view_td_report;
    var view_td_report = new VTDR('#report');

    var IDS_WSD = App.ids_wsd;
    var ids_wsd = new IDS_WSD();

    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mess_load_reference', App.Langs));
        if (list) {
            ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };

    // После загрузки документа
    $(document).ready(function ($) {
        view_td_report.init({
            alert: null,
            ids_wsd: ids_wsd,
            fn_init: function (init) {
                LockScreenOff();
            }.bind(this),
        });
    });
})(jQuery); // End of use strict