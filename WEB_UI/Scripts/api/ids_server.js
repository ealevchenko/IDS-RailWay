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
    // создать класс справочники ИДС
    function ids_server() {
        this.list_countrys = null;
        this.list_genus_wagon = null;
        this.list_station = null;
        this.list_ways = null;
        this.list_outer_ways = null;
        this.list_divisions = null;
        this.list_park_ways = null;
        this.list_operators_wagons = null;
        this.list_operators_wagons_group = null;
        this.list_locomotive = null;
        this.list_reason_discrepancy = null;
        this.list_detention_return = null;
        this.list_cargo = null;
        this.list_cargo_group = null;
        this.list_cargo_etsng = null;
        this.list_cargo_gng = null;
        this.list_external_station = null;
        this.list_border_checkpoint = null;
        this.list_shipper = null;
        this.list_consignee = null;
        this.list_wagon = null;
        this.list_wagon_rent = null;
        this.list_condition_arrival = null;
        this.list_type_wagons = null;
        this.list_owners_wagons = null;
        this.list_type_owner_ship = null;
        this.list_limiting_loading = null;
        this.list_payer_sender = null;
        this.list_certification_data = null;
        this.list_commercial_condition = null;
        this.list_hazard_class = null;
    }

    ids_server.prototype.getCountClient = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/global/client/count',
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
                OnAJAXError("ids_server.getCountClient", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить хосты всех клиентов
    ids_server.prototype.getHostClient = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/global/client/hosts',
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
                OnAJAXError("ids_server.getHostClient", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //
    ids_server.prototype.getParkStateApply = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/global/park_state/apply',
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
                OnAJAXError("ids_server.getParkStateApply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //
    ids_server.prototype.postParkStateApply = function (id, callback) {
        $.ajax({
            url: '../../api/global/park_state/',
            type: 'POST',
            data: JSON.stringify(id),
            async: true,
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("ids_server.postParkStateApply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //
    ids_server.prototype.deleteParkStateApply = function (id, callback) {
        $.ajax({
            url: '../../api/global/park_state/' + id,
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
                OnAJAXError("ids_server.deleteParkStateApply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //
    ids_server.prototype.clearParkStateApply = function (callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/global/park_state/clear',
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
                OnAJAXError("ids_server.clearParkStateApply", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    App.ids_server = ids_server;

    window.App = App;

})(window);