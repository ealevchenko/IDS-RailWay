/*Модуль api-функций формы АРМ Диспетчера*/
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
    // создать класс АРМ оператора
    function ids_wsd() {
        //this.list_station = null;
        //this.list_ways = null;
        //this.list_divisions = null;
        //this.list_park_ways = null;

    }
    //****************************************************************************************

    //-------------------------------- Функции работы с БД через api ---------------
    // Получить список вагонов на пути
    ids_wsd.prototype.getViewWagonsOfWay = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/way/id/' + id,
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
                OnAJAXError("ids_wsd.getViewWagonsOfWay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //================= Операции =========================================================
    // Отчеты -> Операции "Отправка на станции АМКР"
    ids_wsd.prototype.getSostavWagonsOperationOfSend = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            //url: '../../api/ids/rwt/wsd/report/operation/send/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
            url: '../../api/ids/rwt/wsd/report/operation/send/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getSostavWagonsOperationOfSend", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    App.ids_wsd = ids_wsd;

    window.App = App;
})(window);