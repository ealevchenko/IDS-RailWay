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


    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ =========================================================
    // АРМ, Получить список вагонов на пути станции
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
    // АРМ, Получить список составов на перегоне
    ids_wsd.prototype.getViewSostavOfOuterWay = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/outer_way/sostav/',
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
                OnAJAXError("ids_wsd.getViewSostavOfOuterWay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // АРМ, Получить составы прибывающие на станцию
    ids_wsd.prototype.getViewArrivalSostavOfStationOuterWay = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/outer_way/sostav/arrival/station/id/' + id,
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
                OnAJAXError("ids_wsd.getViewArrivalSostavOfStationOuterWay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // АРМ, Получить составы отправленные со станции
    ids_wsd.prototype.getViewSendSostavOfStationOuterWay = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/outer_way/sostav/send/station/id/' + id,
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
                OnAJAXError("ids_wsd.getViewSendSostavOfStationOuterWay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // АРМ, Получить список всех вагонов на перегоне
    ids_wsd.prototype.getViewWagonsOfOuterWay = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/outer_way/',
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
                OnAJAXError("ids_wsd.getViewWagonsOfOuterWay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // АРМ, Получить список вагонов состава на перегоне
    ids_wsd.prototype.getViewWagonsOfSostavOuterWay = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/outer_way/sostav/num/' + num,
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
                OnAJAXError("ids_wsd.getViewWagonsOfSostavOuterWay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Операции) =========================================================
    // Пулучить список составаов отправленных за период
    ids_wsd.prototype.getViewSostavOfPeriodOperationSend = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/operation/sostav/send/period/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getViewSostavOfPeriodOperationSend", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //АРМ, Операция отправки вагонов на внутрение станции АМКР 
    ids_wsd.prototype.postSendWagonsOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/sending/',
            type: 'POST',
            data: JSON.stringify(operation),
            contentType: "application/json;charset=utf-8",
            async: true,
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                LockScreenOff();
                OnAJAXError("ids_wsd.postSendWagonsOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
     //АРМ, Операция принять вагоны на внутреную станцию АМКР 
    ids_wsd.prototype.postArrivalWagonsOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/arrival/',
            type: 'POST',
            data: JSON.stringify(operation),
            contentType: "application/json;charset=utf-8",
            async: true,
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                LockScreenOff();
                OnAJAXError("ids_wsd.postArrivalWagonsOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
     //АРМ, Операция вернуть-оменить вагоны на внутреную станцию АМКР 
    ids_wsd.prototype.postReturnWagonsOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/return/',
            type: 'POST',
            data: JSON.stringify(operation),
            contentType: "application/json;charset=utf-8",
            async: true,
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                LockScreenOff();
                OnAJAXError("ids_wsd.postReturnWagonsOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
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
    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Дерево путей) =========================================================



    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Отчеты учетный остаток) =========================================================
    // Получить расчет остатков по вагонам
    ids_wsd.prototype.getViewTotalBalance = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/total_balance/',
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
                OnAJAXError("ids_wsd.getViewTotalBalance", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить все вагоны на АМКР (Отчет учетный остаток)
    ids_wsd.prototype.getViewWagonsOfBalance = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/view/vagons/balance/',
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
                OnAJAXError("ids_wsd.getViewWagonsOfBalance", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить все вагоны на АМКР (Отчет учетный остаток по условию выбора)
    ids_wsd.prototype.postViewWagonsOfBalance = function (option, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/view/vagons/balance/',
            type: 'POST',
            data: JSON.stringify(option),
            contentType: "application/json;charset=utf-8",
            async: true,
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                LockScreenOff();
                OnAJAXError("ids_wsd.postViewWagonsOfWhereBalance", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //================= ОТПРАВКА СОСТАВОВ НА УЗ (Составы) =========================================================
    // Получить все составы (View)
    ids_wsd.prototype.getViewOutgoingSostav = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_sostav/view/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getViewOutgoingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    App.ids_wsd = ids_wsd;

    window.App = App;
})(window);