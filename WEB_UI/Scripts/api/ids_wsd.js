/*Модуль api-функций форм АРМ Диспетчера*/
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

    //=============================================================================================================
    //                                  РАЗДЕЛ ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ ВАГОНОВ
    //=============================================================================================================
    //======= WagonInternalRoutes (Внутреннее перемещение вагона на АМКР) =========================================================================
    // Вернуть строки внутренего перемещения указанного вагона
    ids_wsd.prototype.getWagonInternalRoutesOfNum= function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wir/wagon/num/' + num,
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
                OnAJAXError("ids_wsd.getWagonInternalRoutesOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Вернуть открытую последнюю строку внутреннего перемещения вагона
    ids_wsd.prototype.getOpenWagonInternalRoutesOfNum= function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wir/open/wagon/num/' + num,
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
                OnAJAXError("ids_wsd.getOpenWagonInternalRoutesOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= WagonInternalOperation (Внутреннее перемещение вагона на АМКР, операции над вагонами) =====================================
    // Вернуть строку операций по id
    ids_wsd.prototype.getWagonInternalOperationOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wio/id/' + id,
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
                OnAJAXError("ids_wsd.getWagonInternalOperationOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Вернуть список операций по id wir
    ids_wsd.prototype.getWagonInternalOperationOfIDWIR = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wio/wir/id/' + id,
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
                OnAJAXError("ids_wsd.getWagonInternalOperationOfWIRID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Вернуть песледнюю запись операций из внутренего перемещения вагонов
    ids_wsd.prototype.getLastWagonInternalOperationOfWIR = function (list_wio) {
        if (list_wio && list_wio.length > 0) {
            var wio = list_wio.sort(function (a, b) {
                return b.id - a.id;
            });
            if (wio && wio.length > 0) {
                return wio[0]
            }
        }
        return null;
    };
    //АРМ, сервис изменение "Коммерческого состояния" - правим годность и примечание
    ids_wsd.prototype.postChangeCommercialCondition = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/service/operation/commercial_condition/',
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
                OnAJAXError("ids_wsd.postChangeCommercialCondition", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Дерево путей) =========================================================
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
    //=============================================================================================================
    //                                  РАЗДЕЛ ПРИЕМ СОСТАВОВ НА АМКР
    //=============================================================================================================
    //================= ПРИБЫТИЕ СОСТАВОВ НА УЗ (Составы) =========================================================
    // Получить состав по ID
    ids_wsd.prototype.getIncomingSostavOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_sostav/sostav/id/' + id,
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
                OnAJAXError("ids_wsd.getIncomingSostavOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить все составы (View)
    ids_wsd.prototype.getViewIncomingSostav = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_sostav/view/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getViewIncomingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Добавить
    ids_wsd.prototype.postIncomingSostav = function (sostav, callback) {
        $.ajax({
            url: '../../api/ids/rwt/arrival_sostav/',
            type: 'POST',
            data: JSON.stringify(sostav),
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
                OnAJAXError("ids_wsd.postIncomingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить состав
    ids_wsd.prototype.putIncomingSostav = function (sostav, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/rwt/arrival_sostav/id/' + sostav.id,
            data: JSON.stringify(sostav),
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
                OnAJAXError("ids_wsd.putIncomingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Выполнить операцию удалить состав введенный вручную
    ids_wsd.prototype.deleteIncomingSostav = function (id, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/delete/arrival_sostav/id/' + id,
            type: 'DELETE',
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
                OnAJAXError("ids_wsd.deleteIncomingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить все вагоны принятого состава по id состава (View)
    ids_wsd.prototype.getViewIncomingCarsOfIDSostav = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_cars/view/sostav/id/' + id,
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
                OnAJAXError("ids_wsd.getViewIncomingCarsOfIDSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // вагон принятого состава по id вагона (View)
    ids_wsd.prototype.getViewIncomingCarsOfIDCar = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_cars/view/car/id/' + id,
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
                OnAJAXError("ids_wsd.getViewIncomingCarsOfIDCar", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить все вагоны принятые за период (View)
    ids_wsd.prototype.getViewIncomingCarsOfPeriod = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_cars/view/car/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getViewIncomingCarsOfPeriod", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция принять вагон (перенести в левую часть)
    ids_wsd.prototype.postOperationIncomingWagon = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/incoming/wagon/',
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
                OnAJAXError("ids_wsd.postOperationIncomingWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция вернуть принятый вагон (вернуть в правую часть)
    ids_wsd.prototype.postOutgoingReturnIncomingWagon = function (operation_return, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/return_incoming/wagon/',
            type: 'POST',
            data: JSON.stringify(operation_return),
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
                OnAJAXError("ids_wsd.postOutgoingReturnIncomingWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция принять состав на АМКР
    ids_wsd.prototype.postOperationIncomingSostav = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/incoming/sostav/',
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
                OnAJAXError("ids_wsd.postOperationIncomingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция отмена принятия состава на АМКР
    ids_wsd.prototype.postOperationCancelIncomingSostav = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/cancel_incoming/sostav/',
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
                OnAJAXError("ids_wsd.postOperationCancelIncomingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить последний номер по станции за текущий год
    ids_wsd.prototype.getCurrentNumArrivalSostavOfStation = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_sostav/current_num/station/id/' + id,
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
                OnAJAXError("ids_wsd.getCurrentNumArrivalSostavOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция поиска информации о вагонах введеных вручную
    ids_wsd.prototype.postOperationManualSearchArrivalWagon = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/arrival/wagon/searsh/manual/',
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
                OnAJAXError("ids_wsd.postOperationManualSearchArrivalWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция добавить вагоны введенные в ручную
    ids_wsd.prototype.postOperationManualAddArrivalWagon = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/arrival/wagon/add/',
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
                OnAJAXError("ids_wsd.postOperationManualAddArrivalWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //=============================================================================================================
    //                                  РАЗДЕЛ СДАЧА СОСТАВОВ НА УЗ
    //=============================================================================================================
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
    // Операция отменить предъявление сотава для сдачи на уз
    ids_wsd.prototype.postReturnProvideWagonsOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/return_provide/',
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
                OnAJAXError("ids_wsd.postReturnProvideWagonsOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция отменить сдачу состава на УЗ
    ids_wsd.prototype.postOperationReturnPresentSostav = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/return_present/sostav/',
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
                OnAJAXError("ids_wsd.postOperationReturnPresentSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить информацию по составу
    ids_wsd.prototype.getOutgoingSostavOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_sostav/id/' + id,
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
                OnAJAXError("ids_wsd.getOutgoingSostavOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить информацию по составу
    ids_wsd.prototype.getOutgoingSostavOfIDSostav = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_sostav/sostav/id/' + id,
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
                OnAJAXError("ids_wsd.getOutgoingSostavOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Выполнить операцию обновить или сдать состав на УЗ
    ids_wsd.prototype.postOperationPresentSostav = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/present/sostav/',
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
                OnAJAXError("ids_wsd.postOperationPresentSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция вернуть вагон с пръедявления
    ids_wsd.prototype.postPostOperationReturnProvideWagon = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/return_provide/wagon/',
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
                OnAJAXError("ids_wsd.postPostOperationReturnProvideWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //================= ОТПРАВКА ВАГОНОВ НА УЗ (Вагоны) =========================================================
    // Получить все вагоны состава для отправки по id состава (View)
    ids_wsd.prototype.getViewOutgoingCarsOfIDSostav = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_cars/view/sostav/id/' + id,
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
                OnAJAXError("ids_wsd.getViewOutgoingCarsOfIDSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // вагонs состава для отправки по id вагона (View)
    ids_wsd.prototype.getViewOutgoingCarsOfIDCar = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_cars/view/car/id/' + id,
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
                OnAJAXError("ids_wsd.getViewOutgoingCarsOfIDCar", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить информацию по отправленному вагону предыдущего прибытия вагона на АМКР(по id_wir текущего прибытия)
    ids_wsd.prototype.getViewPreviousOutgoingCarsOfIDWIR = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_cars/view/car/previous/wir/id/' + id,
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
                OnAJAXError("ids_wsd.getViewOutgoingCarsOfIDCar", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //================= ОТПРАВКА ВАГОНОВ НА УЗ (Задержания и возвраты) =========================================================
    //======= OutgoingDetentionReturn (Таблица задержаных-возвращеных вагонов) ======================================
    // Получить все задержания и возвраты
    ids_wsd.prototype.getOutgoingDetentionReturn = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_detention_return/all',
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
                OnAJAXError("ids_wsd.getOutgoingDetentionReturn", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить вагоны по id задержания и возврата
    ids_wsd.prototype.getOutgoingDetentionReturnOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_detention_return/id/' + id,
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
                OnAJAXError("ids_wsd.getOutgoingDetentionReturnOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить все задержания и возвраты по номеру вагона 
    ids_wsd.prototype.getOutgoingDetentionReturnOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_detention_return/num/' + num,
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
                OnAJAXError("ids_wsd.getOutgoingDetentionReturnOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Операция добавить или обновить задержание вагона
    ids_wsd.prototype.postUpdateOutgoingDetention = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/detention/',
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
                OnAJAXError("ids_wsd.postUpdateOutgoingDetention", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Операция открыть возврат по вагону 
    ids_wsd.prototype.postOpenOutgoingReturn = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/open_return/',
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
                OnAJAXError("ids_wsd.postOpenOutgoingReturn", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Операция закрыть возврат по вагону
    ids_wsd.prototype.postCloseOutgoingReturn = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/close_return/',
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
                OnAJAXError("ids_wsd.postCloseOutgoingReturn", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //================= ОТПРАВКА ВАГОНОВ НА УЗ (Предъявление) =========================================================
    // Операция предъявить вагон (перенести в левую часть)
    ids_wsd.prototype.postOutgoingPresentWagon = function (operation_present, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/present/wagon/',
            type: 'POST',
            data: JSON.stringify(operation_present),
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
                OnAJAXError("ids_wsd.postOutgoingPresentWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция вернуть предъявленный вагон (вернуть в правую часть)
    ids_wsd.prototype.postOutgoingReturnPresentWagon = function (operation_return, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/return_present/wagon/',
            type: 'POST',
            data: JSON.stringify(operation_return),
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
                OnAJAXError("ids_wsd.postOutgoingReturnPresentWagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция выполнить дислокацию (Предъявленных вагонов)
    ids_wsd.prototype.postOutgoingDislocationWagons = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/outgoing_dislocation/',
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
                OnAJAXError("ids_wsd.postOutgoingDislocationWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //=============================================================================================================
    //                                  РАЗДЕЛ ДОКУМЕНТЫ ЭПД
    //=============================================================================================================
    // Получить последнюю дату и время записи в промежуточной базе
    ids_wsd.prototype.getLastDT_UZ_DOC_DB_IDS = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/transfer/epd/db_uz/last_datatime/',
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
                OnAJAXError("ids_wsd.getLastDT_UZ_DOC_DB_IDS", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= UZ_DOC (Таблица ЭПД принятых вагонов) ======================================
    // Получить список документов по номеру накладной
    ids_wsd.prototype.getUZ_DOC_Of_NumDoc = function (num_doc, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/searsh/epd/num_doc/' + num_doc,
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
                LockScreenOff();
                OnAJAXError("ids_wsd.getUZ_DOC_Of_NumDoc", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить разпарсеный ЭПД принятого вагона по внутренему num_doc
    ids_wsd.prototype.getOTPR_UZ_DOCOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/uz_doc/otpr/num/' + num,
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
                OnAJAXError("ids_wsd.getOTPR_UZ_DOCOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить разпарсеный ЭПД принятого вагона по № накладной УЗ
    ids_wsd.prototype.getOTPR_UZ_DOCOfNum_UZ = function (num_uz, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/uz_doc/otpr/num_uz/' + num_uz,
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
                OnAJAXError("ids_wsd.getOTPR_UZ_DOCOfNum_UZ", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить PDF документ принятого вагона по внутренему num_doc
    ids_wsd.prototype.getPDFOfNumDoc = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids_arhiv/rwt/uz_doc_pdf/pdf_file/num_doc/' + num,
            async: true,
            //dataType: 'application/pdf',
            //data: formData,
            //contentType: false,
            //processData: false,
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("ids_wsd.getPDFOfNumDoc", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить строку PDF документа принятого вагона по внутренему num_doc
    ids_wsd.prototype.getUZ_DOC_PDFOfNumDoc = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids_arhiv/rwt/uz_doc_pdf/num_doc/' + num,
            async: true,
            //dataType: 'application/pdf',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("ids_wsd.getUZ_DOC_PDFOfNumDoc", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить разпарсеный ЭПД принятого вагона по XML
    ids_wsd.prototype.postOTPR_UZ_DOCOfXML = function (xml, callback) {
        $.ajax({
            url: '../../api/ids/rwt/uz_doc/otpr/xml/',
            type: 'POST',
            data: JSON.stringify(xml),
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
                OnAJAXError("ids_wsd.postOTPR_UZ_DOCOfXML", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить дату последнего документа введенного в ручную по № накладной УЗ
    ids_wsd.prototype.getDateTimeUZ_DOC_Of_manual_num_uz = function (num_uz, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/uz_doc/manual/date/num_uz/' + num_uz,
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
                OnAJAXError("ids_wsd.getDateTimeUZ_DOC_Of_manual_num_uz", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция выполнить поиск документа по номеру документа и номеру вагона, во всех местах (БД ИДС, Промежуточная база, СМС) и обновить в БД ИДС
    ids_wsd.prototype.postOperationUpdateUZ_DOC_Doc_Num = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/uz_doc/operation/update/document/num/',
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
                OnAJAXError("ids_wsd.postOperationUpdateUZ_DOC_Doc_Num", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция выполнить поиск документа по номеру вагона и дате прибытия, во всех местах (Промежуточная база, СМС) и добавить или обновить в БД ИДС
    ids_wsd.prototype.postOperationUpdateUZ_DOC_Num_DT = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/uz_doc/operation/update/num/dt_arrival/',
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
                OnAJAXError("ids_wsd.postOperationUpdateUZ_DOC_Num_DT", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= UZ_DOC (Таблица ЭПД отправленных вагонов) ======================================
    // Получить разпарсеный ЭПД отправленног вагона по внутренему num_doc
    ids_wsd.prototype.getOTPR_UZ_DOC_OUTOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/uz_doc_out/otpr/num/' + num,
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
                OnAJAXError("ids_wsd.getOTPR_UZ_DOC_OUTOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция обновить документы на предяъвленный и сданный состав ОБНОВЛЕНИЕ ДОКУМЕНТОВ ЭПД 
    ids_wsd.prototype.postOperationUpdateEPDSendingSostav = function (operation_update_epd, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/operation/update/epd/sending/sostav/',
            type: 'POST',
            data: JSON.stringify(operation_update_epd),
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
                OnAJAXError("ids_wsd.postOperationUpdateEPDSendingSostav", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= IDS_DOC (Таблица ЭПД принятых вагонов в базе данных АМКР ИДС) ======================================
    //======= Arrival_UZ_Document_Docs (Доки по ЭПД УЗ по прибытию (не досылочные)) ======================================
    // Получить все доки
    ids_wsd.prototype.getArrival_UZ_Document_Docs = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_document_docs/all',
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
                OnAJAXError("ids_wsd.getArrival_UZ_Document_Docs", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить док по id
    ids_wsd.prototype.getArrival_UZ_Document_DocsOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_document/id/' + id,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Document_DocsOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить доки по id документа
    ids_wsd.prototype.getArrival_UZ_Document_DocsOfID_Document = function (id_document, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_document_docs/document/id/' + id_document,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Document_DocsOfID_DOC_UZ", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Arrival_UZ_Document_Acts (Акты по ЭПД УЗ по прибытию (не досылочные)) ======================================
    // Получить все акты
    ids_wsd.prototype.getArrival_UZ_Document_Acts = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_document_acts/all',
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
                OnAJAXError("ids_wsd.getArrival_UZ_Document_Acts", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить акт по id
    ids_wsd.prototype.getArrival_UZ_Document_ActsOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_document_acts/id/' + id,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Document_ActsOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить акты по id документа
    ids_wsd.prototype.getArrival_UZ_Document_ActsOfID_Document = function (id_document, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_document_acts/document/id/' + id_document,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Document_ActsOfID_DOC_UZ", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Arrival_UZ_Vagon_Acts (Акты по ЭПД УЗ по прибытию (не досылочные)) ======================================
    // Получить все акты
    ids_wsd.prototype.getArrival_UZ_Vagon_Acts = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_acts/all',
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_Acts", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить акт по id
    ids_wsd.prototype.getArrival_UZ_Vagon_ActsOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_acts/id/' + id,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_ActsOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить акты по id вагона
    ids_wsd.prototype.getArrival_UZ_Vagon_ActsOfID_Vagon = function (id_vagon, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_acts/vagon/id/' + id_vagon,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_ActsOfID_Vagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Arrival_UZ_Vagon_Pay (Платежки по плательщикам ЭПД УЗ по прибытию) ======================================
    // Получить все платежки
    ids_wsd.prototype.getArrival_UZ_Vagon_Pay = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_pay/all',
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_Pay", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить платежку по id
    ids_wsd.prototype.getArrival_UZ_Vagon_PayOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_pay/id/' + id,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_PayOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить платежку по id вагона
    ids_wsd.prototype.getArrival_UZ_Vagon_PayOfID_Vagon = function (id_vagon, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_pay/vagon/id/' + id_vagon,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_PayOfID_Vagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Arrival_UZ_Vagon_Cont (Контейнеры на вагоне по ЭПД УЗ ) ======================================
    // Получить все контейнера
    ids_wsd.prototype.getArrival_UZ_Vagon_Cont = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_cont/all',
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_Cont", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить контейнер по id
    ids_wsd.prototype.getArrival_UZ_Vagon_ContOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_cont/id/' + id,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_ContOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить контейнера по id вагона
    ids_wsd.prototype.getArrival_UZ_Vagon_ContOfID_Vagon = function (id_vagon, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_uz_vagon_cont/vagon/id/' + id_vagon,
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
                OnAJAXError("ids_wsd.getArrival_UZ_Vagon_ContOfID_Vagon", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //=============================================================================================================
    //                                  РАЗДЕЛ ДОКУМЕНТЫ САП
    //=============================================================================================================
    //======= SAPIncomingSupply (SAP Входящие поставки) ======================================
    // Получить все поставки
    ids_wsd.prototype.getSAPIncomingSupply = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/sap/incoming_supply/all',
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
                OnAJAXError("ids_wsd.getSAPIncomingSupply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить поставку по id
    ids_wsd.prototype.getSAPIncomingSupplyOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/sap/incoming_supply/id/' + id,
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
                OnAJAXError("ids_wsd.getSAPIncomingSupplyOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить поставку по id_arrival_car
    ids_wsd.prototype.getSAPIncomingSupplyOfIDArrivalCar = function (id_arrival_car, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/sap/incoming_supply/arrival_car/id/' + id_arrival_car,
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
                OnAJAXError("ids_wsd.getSAPIncomingSupplyOfIDArrivalCar", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить поставки по номеру вагона
    ids_wsd.prototype.getSAPIncomingSupplyOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/sap/incoming_supply/num/' + num,
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
                OnAJAXError("ids_wsd.getSAPIncomingSupplyOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить поставку
    ids_wsd.prototype.postSAPIncomingSupply = function (sap, callback) {
        $.ajax({
            url: '../../api/ids/rwt/sap/incoming_supply/',
            type: 'POST',
            data: JSON.stringify(sap),
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
                OnAJAXError("ids_wsd.postSAPIncomingSupply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить поставку
    ids_wsd.prototype.putSAPIncomingSupply = function (sap, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/rwt/sap/incoming_supply/id/' + sap.id,
            data: JSON.stringify(sap),
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
                OnAJAXError("ids_wsd.putSAPIncomingSupply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Удалить поставку
    ids_wsd.prototype.deleteSAPIncomingSupply = function (id, callback) {
        $.ajax({
            url: '../../api/ids/rwt/sap/incoming_supply/id/' + id,
            type: 'DELETE',
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
                OnAJAXError("ids_wsd.deleteSAPIncomingSupply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Обновить входящую поставку с учетом данных на Web САП
    ids_wsd.prototype.postOperationUpdateSAPIncomingSupply = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/rwt/sap/incoming_supply/operation/update/',
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
                OnAJAXError("ids_wsd.postOperationUpdateSAPIncomingSupply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //=============================================================================================================
    //                                  РАЗДЕЛ ОТЧЕТЫ ДЕПАРТАМЕНТ ПО ПРОДАЖАМ
    //=============================================================================================================
    //Добавить поставку
    ids_wsd.prototype.postReportBorderCrossingOfNums = function (nums, callback) {
        $.ajax({
            url: '../../api/ids/rwt/wsd/report/sd/border_crossing/',
            type: 'POST',
            data: JSON.stringify(nums),
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
                OnAJAXError("ids_wsd.postReportBorderCrossingOfNums", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //=============================================================================================================
    //                                  РАЗДЕЛ ОТЧЕТЫ ТД
    //=============================================================================================================
    //Получить принятые составы за период
    ids_wsd.prototype.getReportAdoptionSostavOfPeriod = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_sostav/report/adoption_sostav/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getReportAdoptionSostavOfPeriod", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Получить принятые составы 
    ids_wsd.prototype.getReportAdoptionSostavOfDocs = function (docs, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_sostav/report/adoption_sostav/docs/' + docs,
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
                OnAJAXError("ids_wsd.getReportAdoptionSostavOfDocs", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Получить сданные-отправленые составы за период
    ids_wsd.prototype.getReportOutgoingSostavOfPeriod = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_sostav/report/outgoing_sostav/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getReportOutgoingSostavOfPeriod", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Получить принятые составы 
    ids_wsd.prototype.getReportOutgoingSostavOfDocs = function (docs, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_sostav/report/outgoing_sostav/docs/' + docs,
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
                OnAJAXError("ids_wsd.getReportOutgoingSostavOfDocs", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Получить принятые вагоны без операторов за период
    ids_wsd.prototype.getReportAdoptionWagonNotOperationOfPeriod = function (start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/arrival_cars/report/adoption_wagon/not_operator/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getReportAdoptionWagonNotOperationOfPeriod", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Получить принятые вагоны по условию выбора
    ids_wsd.prototype.postReportAdoptionWagonOfWhere = function (where, callback) {
        $.ajax({
            url: '../../api/ids/rwt/arrival_cars/view/car/where/',
            type: 'POST',
            data: JSON.stringify(where),
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
                OnAJAXError("ids_wsd.postReportAdoptionWagonOfWhere", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить отчет по вагону (прибытие и отправка) по номеру вагона
    ids_wsd.prototype.getViewIncomingOutgoingCarsOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_cars/view/incoming_outgoing/car/num/' + num,
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
                OnAJAXError("ids_wsd.getViewIncomingOutgoingCarsOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить отчет по вагону (прибытие и отправка) по номеру вагона за указаный период
    ids_wsd.prototype.getViewIncomingOutgoingCarsOfNum_Period = function (num, start, stop, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/outgoing_cars/view/incoming_outgoing/car/num/' + num + '/start/' + moment.utc(start).toISOString() + '/stop/' + moment.utc(stop).toISOString(),
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
                OnAJAXError("ids_wsd.getViewIncomingOutgoingCarsOfNum_Period", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить отчет по текущему оператору АМКР (Информация по вагону и собственнику) номеру вагона
    ids_wsd.prototype.getReportCurrentOperationWagonOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/rwt/wsd/report/td/current_operation_wagon/num/' + num,
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
                OnAJAXError("ids_wsd.getReportCurrentOperationWagonOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Получить отправленные вагоны по условию выбора
    ids_wsd.prototype.postReportOutgoingWagonOfWhere = function (where, callback) {
        $.ajax({
            url: '../../api/ids/rwt/outgoing_cars/view/car/where/',
            type: 'POST',
            data: JSON.stringify(where),
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
                OnAJAXError("ids_wsd.postReportOutgoingWagonOfWhere", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    App.ids_wsd = ids_wsd;

    window.App = App;
})(window);