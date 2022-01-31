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
            'mess_load_reference': 'Загружаю справочники...',
        },
        'en':  //default language: English
        {
            'mess_load_reference': 'Loading references ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //****************************************************************************************
    //-------------------------------- Конструктор и инициализация ---------------
    // создать класс справочники UZ
    function uz_directory() {

    }
    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------
    // Загрузить таблицы базы данных 
    uz_directory.prototype.load = function (list, lock, update, callback) {
        var process = 0;
        var result = [];
        var out_load = function (process) {
            if (process === 0) {
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(result);
                }
            }
        };
        if (list) {
            $.each(list, function (i, table) {
                //if (table === 'station') {
                //    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                //    if (update || !this.list_station) {
                //        process++;
                //        this.getStation(function (data) {
                //            this.list_station = data;
                //            process--;
                //            result.push('station');
                //            out_load(process);
                //        }.bind(this));
                //    };
                //};
            }.bind(this));
        };
        out_load(process);
    };

    //======= UZWagonInfo (Справочник вагонов УЗ ) ======================================
    // Получить информацию по вагону из базы данных УЗ
    uz_directory.prototype.getInfoWagonOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/uz/web/client/car_info/num/' + num,
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("uz_directory.getInfoWagonOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    App.uz_directory = uz_directory;

    window.App = App;
})(window);