(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var alert = new ALERT($('div#main-alert')); // Создадим класс ALERTG

    var directory = App.ids_directory;
    var ids_dir = new directory();

    var load_db = function (list, update, callback) {
        if (list) {
            ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // После загрузки документа
    $(document).ready(function ($) {
        var start = moment('05/01/2021').set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 })._d;
        var stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 })._d;
        //var name = 'Смолы каменноугольные,не поименованные в алфавите';
        var name = 'Смолы каменноугольные, не поименованные в алфавите';
        load_db(['cargo_etsng'], false, function (result) {
            var obj = ids_dir.getCargoETSNG_Of_Name_find('cargo_etsng_name', name, App.Lang);
        });


        LockScreenOff();

    });

})(jQuery); // End of use strict