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
    function ids_directory() {
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
        this.list_external_station = null;
        this.list_wagon = null;
        this.list_wagon_rent = null;
    }
    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------
    // Загрузить таблицы базы данных 
    ids_directory.prototype.load = function (list, lock, update, callback) {
        var process = 0;
        var result = [];
        var out_load = function (process) {
            if (process === 0) {
                if (lock) { LockScreenOff(); }
                if (typeof callback === 'function') {
                    callback(result);
                }
            }
        };
        if (list) {
            $.each(list, function (i, table) {
                if (table === 'station') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_station) {
                        process++;
                        this.getStation(function (data) {
                            this.list_station = data;
                            process--;
                            result.push('station');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'ways') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_ways) {
                        process++;
                        this.getWays(function (data) {
                            this.list_ways = data;
                            process--;
                            result.push('ways');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'outer_ways') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_outer_ways) {
                        process++;
                        this.getOuterWays(function (data) {
                            this.list_outer_ways = data;
                            process--;
                            result.push('outer_ways');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'divisions') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_divisions) {
                        process++;
                        this.getDivisions(function (data) {
                            this.list_divisions = data;
                            process--;
                            result.push('divisions');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'park_ways') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_park_ways) {
                        process++;
                        this.getParkWays(function (data) {
                            this.list_park_ways = data;
                            process--;
                            result.push('park_ways');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'operators_wagons') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_operators_wagons) {
                        process++;
                        this.getOperatorsWagons(function (data) {
                            this.list_operators_wagons = data;
                            process--;
                            result.push('operators_wagons');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'operators_wagons_group') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_operators_wagons_group) {
                        process++;
                        this.getOperatorsWagonsGroup(function (data) {
                            this.list_operators_wagons_group = data;
                            process--;
                            result.push('operators_wagons_group');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'locomotive') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_locomotive) {
                        process++;
                        this.getLocomotive(function (data) {
                            this.list_locomotive = data;
                            process--;
                            result.push('operators_wagons');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'reason_discrepancy') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_reason_discrepancy) {
                        process++;
                        this.getReason_Discrepancy(function (data) {
                            this.list_reason_discrepancy = data;
                            process--;
                            result.push('reason_discrepancy');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'detention_return') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_detention_return) {
                        process++;
                        this.getDetention_Return(function (data) {
                            this.list_detention_return = data;
                            process--;
                            result.push('detention_return');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'cargo') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_cargo) {
                        process++;
                        this.getCargo(function (data) {
                            this.list_cargo = data;
                            process--;
                            result.push('cargo');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'cargo_group') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_cargo_group) {
                        process++;
                        this.getCargoGroup(function (data) {
                            this.list_cargo_group = data;
                            process--;
                            result.push('cargo_group');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'external_station') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_external_station) {
                        process++;
                        this.getExternalStation(function (data) {
                            this.list_external_station = data;
                            process--;
                            result.push('external_station');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'wagons') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_wagons) {
                        process++;
                        this.getWagons(function (data) {
                            this.list_wagons = data;
                            process--;
                            result.push('wagon');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'wagons_rent') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_wagons_rent) {
                        process++;
                        this.getWagonsRent(function (data) {
                            this.list_wagons_rent = data;
                            process--;
                            result.push('wagons_rent');
                            out_load(process);
                        }.bind(this));
                    };
                };
            }.bind(this));
        };
        out_load(process);
    };
    //======= Directory_OperatorsWagons (Справочник операторов вагонов) ======================================
    ids_directory.prototype.getOperatorsWagons = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/operators_wagons/all',
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
                OnAJAXError("ids_directory.getOperatorsWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить парки по указаной станции c позицией
    ids_directory.prototype.getOperatorsWagonsID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/operators_wagons/id/' + id,
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
                OnAJAXError("ids_directory.getOperatorsWagonsID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить
    ids_directory.prototype.postOperatorsWagons = function (obj, callback) {
        $.ajax({
            url: '../../api/ids/directory/operators_wagons/',
            type: 'POST',
            data: JSON.stringify(obj),
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
                OnAJAXError("ids_directory.postOperatorsWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить 
    ids_directory.prototype.putOperatorsWagons = function (obj, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/directory/operators_wagons/id/' + obj.id,
            data: JSON.stringify(obj),
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
                OnAJAXError("ids_directory.putOperatorsWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Удалить 
    ids_directory.prototype.deleteOperatorsWagons = function (id, callback) {
        $.ajax({
            url: '../../api/ids/directory/operators_wagons/id/' + id,
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
                OnAJAXError("ids_directory.deleteOperatorsWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    }
    //======= Directory_OperatorsWagons (Справочник групп операторов вагонов) ======================================
    ids_directory.prototype.getOperatorsWagonsGroup = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/operators_wagons_group/all',
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
                OnAJAXError("ids_directory.getOperatorsWagonsGroup", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //======= Directory_Station (Справочник станций ИДС) ======================================
    ids_directory.prototype.getStation = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/station/all',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                };
                //if (typeof this.settings.on_load_station === 'function') {
                //    this.settings.on_load_station();
                //};
            }/*.bind(this)*/,
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Ways (Справочник путей ИДС) ======================================
    // Получить все пути из базы
    ids_directory.prototype.getWays = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/all',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
                //if (typeof this.settings.on_load_ways === 'function') {
                //    this.settings.on_load_ways();
                //}
            }/*.bind(this)*/,
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить пути по указаной станции и парку
    ids_directory.prototype.getWaysOfStationIDParkID = function (id_station, id_park, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/station/id/' + id_station + '/park/id/' + id_park,
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
                OnAJAXError("ids_directory.getWaysOfStationIDParkID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить путь по id
    ids_directory.prototype.getWaysOfWayID = function (id_way, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/view/way/id/' + id_way,
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
                OnAJAXError("ids_directory.getWaysOfWayID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить пути роспуска
    ids_directory.prototype.getWaysOfDissolution = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/view/way/dissolution/',
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
                OnAJAXError("ids_directory.getWaysOfDissolution", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция автокоррекции
    ids_directory.prototype.postOperationAutoPositionWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/auto_correct/',
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
                OnAJAXError("ids_directory.postOperationAutoPositionWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вниз
    ids_directory.prototype.postOperationDown1PositionWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/down_position/1/',
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
                OnAJAXError("ids_directory.postOperationDown1PositionWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вверх
    ids_directory.prototype.postOperationUp1PositionWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/up_position/1/',
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
                OnAJAXError("ids_directory.postOperationUp1PositionWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция "Добавить путь"
    ids_directory.prototype.postOperationInsertWayOfPark = function (way, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/add/',
            type: 'POST',
            data: JSON.stringify(way),
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
                OnAJAXError("ids_directory.postOperationInsertWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция "Удалить путь"
    ids_directory.prototype.postOperationDeleteWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/delete/',
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
                OnAJAXError("ids_directory.postOperationDeleteWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция "Обновить путь"
    ids_directory.prototype.postOperationUpdateWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/update/',
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
                OnAJAXError("ids_directory.postOperationUpdateWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_OuterWays (Справочник путей ИДС) ======================================
    // Получить все пути из базы
    ids_directory.prototype.getOuterWays = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/outer_ways/all',
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
                OnAJAXError("ids_directory.getOuterWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_ParkWay (Справочник путей ИДС) ======================================
    // Получить все парки
    ids_directory.prototype.getParkWays = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/park_ways/all',
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
                OnAJAXError("ids_directory.getParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить 
    ids_directory.prototype.postParkWays = function (obj, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/',
            type: 'POST',
            data: JSON.stringify(obj),
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
                OnAJAXError("ids_directory.postParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить 
    ids_directory.prototype.putParkWays = function (obj, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/directory/park_ways/id/' + obj.id,
            data: JSON.stringify(obj),
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
                OnAJAXError("ids_directory.putParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Удалить 
    ids_directory.prototype.deleteParkWays = function (id, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/id/' + id,
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
                OnAJAXError("ids_directory.deleteParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    }
    // Получить парки по указаной станции c позицией
    ids_directory.prototype.getParkStationOfStationID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/park_ways/view/park_station/id/' + id,
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
                OnAJAXError("ids_directory.getParkStationOfStationID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция автокоррекции
    ids_directory.prototype.posOperationAutoPositionParkOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/operation/auto_correct/',
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
                OnAJAXError("ids_directory.posOperationAutoPositionParkOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вверх
    ids_directory.prototype.postOperationUp1PositionParkOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/operation/up_position/1/',
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
                OnAJAXError("ids_directory.postOperationUp1PositionParkOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вниз
    ids_directory.prototype.postOperationDown1PositionParkOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/operation/down_position/1/',
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
                OnAJAXError("ids_directory.postOperationDown1PositionParkOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Divisions (Справочник цехов) ======================================
    ids_directory.prototype.getDivisions = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/division/all',
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
                OnAJAXError("ids_directory.GetDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить по коду
    ids_directory.prototype.getDivisionsOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/division/id/' + id,
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
                OnAJAXError("ids_directory.getDivisionsOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить 
    ids_directory.prototype.putDivisions = function (division, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/directory/division/id/' + division.id,
            data: JSON.stringify(station),
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
                OnAJAXError("ids_directory.putDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Удалить 
    ids_directory.prototype.deleteDivisions = function (id, callback) {
        $.ajax({
            url: '../../api/ids/directory/division/id/' + id,
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
                OnAJAXError("ids_directory.deleteDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить 
    ids_directory.prototype.postDivisions = function (division, callback) {
        $.ajax({
            url: '../../api/ids/directory/division/',
            type: 'POST',
            data: JSON.stringify(division),
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
                OnAJAXError("ids_directory.postDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Locomotive (Справочник локомотивов ИДС) ======================================
    ids_directory.prototype.getLocomotive = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/locomotive/all',
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
                OnAJAXError("ids_directory.getLocomotive", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Wagons (Справочник вагонов) ======================================
    ids_directory.prototype.getWagons = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/wagon/all',
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
                OnAJAXError("ids_directory.getWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить по номеру вагона
    ids_directory.prototype.getWagonsOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/wagon/num/' + num,
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
                OnAJAXError("ids_directory.getWagonsOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_WagonsRent (Справочник аренд вагонов) ======================================
    ids_directory.prototype.getWagonsRent = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/wagon_rent/all',
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
                OnAJAXError("ids_directory.getWagonsRent", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить аренды по номеру вагона
    ids_directory.prototype.getWagonsRentOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/wagon_rent/num/' + num,
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
                OnAJAXError("ids_directory.getWagonsRentOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //****************************************************************************************
    //-------------------------------- функции для работы с объектами ------------------------
    ids_directory.prototype.getValueObj = function (obj, name, lang) {
        if (lang) {
            return obj ? obj[name + '_' + lang] : null;
        } else {
            return obj ? obj[name] : null;
        }
    };
    //
    ids_directory.prototype.getValueCultureObj = function (obj, name) {
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    ids_directory.prototype.getListObj = function (list_obj, fvalue, ftext, lang, filter) {
        var list = [];
        var list_filtr = null;
        if (list_obj) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.filter(filter);
            } else { list_filtr = list_obj; }
            $.each(list_filtr, function (i, el) {
                if (lang) {
                    list.push({ value: el[fvalue], text: el[ftext + '_' + lang], disabled: false });
                } else {
                    list.push({ value: el[fvalue], text: el[ftext], disabled: false });
                }
            }.bind(this));
        }
        return list;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    ids_directory.prototype.getListObj2 = function (list_obj, fvalue, ftext1, ftext2, lang, filter) {
        var list = [];
        var list_filtr = null;
        if (list_obj) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.filter(filter);
            } else { list_filtr = list_obj; }
            for (var i = 0, j = list_filtr.length; i < j; i++) {
                var l = list_filtr[i];
                if (lang) {
                    list.push({ value: l[fvalue], text: l[ftext1 + '_' + lang] + ' - ' + l[ftext2 + '_' + lang] });
                } else {
                    list.push({ value: l[fvalue], text: l[ftext1] + ' - ' + l[ftext2] });
                }
            }
        }
        return list;
    };
    // Вернуть объект по id
    ids_directory.prototype.getObj_Of_ID = function (list_obj, id) {
        var obj = null;
        if (list_obj && list_obj.length > 0) {
            obj = list_obj.find(function (o) { return o.id === id });
        }
        return obj;
    };
    // Вернуть объект по полю
    ids_directory.prototype.getObj_Of_field = function (list_obj, field_name, value) {
        var obj = null;
        if (list_obj && list_obj.length > 0) {
            obj = list_obj.find(function (o) { return o[field_name] === value });
        }
        return obj;
    };
    //  Вернуть объекты в указаным поле которых есть текст text
    ids_directory.prototype.getObjs_Of_text = function (list_obj, text, ftext, lang) {
        var objs = null;
        var field = lang ? ftext + '_' + lang : ftext;
        if (list_obj && list_obj.length > 0) {
            objs = list_obj.filter(function (i) {
                return $.trim(i[field]) === $.trim(text) ? true : false;
            });
        }
        return objs;
    };
    //======= Directory_Reason_Discrepancy (Справочник причин расхождения) ===============================
    ids_directory.prototype.getReason_Discrepancy = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/reason_discrepancy/all',
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
                OnAJAXError("ids_directory.getReason_Discrepancy", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_DetentionReturn (Справочник причин возвратов и задержаний) ======================================
    ids_directory.prototype.getDetention_Return = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/detention_return/all',
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
                OnAJAXError("ids_directory.getDetention_Return", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Cargo (Справочник грузов) ======================================
    //
    ids_directory.prototype.getCargo = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/cargo/all',
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
                OnAJAXError("ids_directory.getCargo", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CargoGroup (Справочник группа грузов) ======================================
    //
    ids_directory.prototype.getCargoGroup = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/cargo_group/all',
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
                OnAJAXError("ids_directory.getCargoGroup", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //======= Directory_ExternalStation (Справочник внешних станций) ======================================
    //
    ids_directory.prototype.getExternalStation = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/external_station/all',
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
                OnAJAXError("ids_directory.getExternalStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //****************************************************************************************
    //-------------------------------- функции для работы с таблицами ------------------------
    //*======= ids_directory.list_locomotive  (Справочник локомотивов) ======================================
    // Выбрать строку по номеру локомотива
    ids_directory.prototype.getLocomotive_Of_ID = function (locomotive) {
        return this.getObj_Of_ID(this.list_locomotive, 'locomotive', locomotive);
    };
    // Вернуть значение поля строки по номеру локомотива
    ids_directory.prototype.getValue_Locomotive_Of_ID = function (locomotive, name, lang) {
        var obj = this.getLocomotive_Of_ID(locomotive);
        return this.getValueObj(obj, name, lang);
    };
    // Вернуть список локомотивов
    ids_directory.prototype.getListLocomotive = function (fvalue, ftext, filter) {
        return this.getListObj(this.list_locomotive, fvalue, ftext, null, filter);
    };
    //*======= ids_directory.list_station  (Справочник станций) ======================================
    ids_directory.prototype.getStation_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_station, id);
    };
    //
    ids_directory.prototype.getValue_Station_Of_ID = function (id, name, lang) {
        var obj = this.getStation_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_Stations_Of_ID = function (id, name) {
        var obj = this.getStation_Of_ID(id);
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    //
    ids_directory.prototype.getListStation = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_station, fvalue, ftext, lang, filter);
    };
    //*======= ids_directory.list_ways  (Справочник станций) ======================================
    ids_directory.prototype.getWays_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_ways, id);
    };
    //
    ids_directory.prototype.getValue_Ways_Of_ID = function (id, name, lang) {
        var obj = this.getWays_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_Ways_Of_ID = function (id, name) {
        var obj = this.getWays_Of_ID(id);
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    //
    ids_directory.prototype.getListWays = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_ways, fvalue, ftext, lang, filter);
    };
    ids_directory.prototype.getListWays2 = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.getListObj2(this.list_ways, fvalue, ftext1, ftext2, lang, filter);
    };

    //*======= ids_directory.list_park_ways  (Справочник парков) ======================================
    ids_directory.prototype.getParkWays_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_park_ways, id);
    };
    //
    ids_directory.prototype.getValue_ParkWays_Of_ID = function (id, name, lang) {
        var obj = this.getParkWays_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_ParkWays_Of_ID = function (id, name) {
        var obj = this.getParkWays_Of_ID(id);
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    //
    ids_directory.prototype.getListParkWays = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_park_ways, fvalue, ftext, lang, filter);
    };
    //*======= ids_directory.list_divisions  (Справочник подразделений) ======================================
    ids_directory.prototype.getDivisions_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_divisions, id);
    };
    //
    ids_directory.prototype.getValue_Divisions_Of_ID = function (id, name, lang) {
        var obj = this.getDivisions_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_Divisions_Of_ID = function (id, name) {
        var obj = this.getDivisions_Of_ID(id);
        return obj ? obj[name + '_' + this.lang] : null;
    };
    //
    ids_directory.prototype.getDivisions_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_divisions, text, ftext, lang);
    };
    //
    ids_directory.prototype.getID_Divisions_Of_Name = function (text, ftext, lang) {
        var obj = this.getDivisions_Of_Name(text, ftext, lang);
        return obj && obj.length > 0 ? obj[0].id : null;
    };
    //
    ids_directory.prototype.getListDivisions = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_divisions, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getDivisions_Of_CultureName = function (name, text) {
        if (this.list_divisions) {
            var obj = getObjects(this.list_divisions, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    //*======= ids_directory.list_reason_discrepancy  (Справочник причин расхождения) ======================================

    ids_directory.prototype.getReason_Discrepancy_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_reason_discrepancy, id);
    };

    ids_directory.prototype.getListReason_Discrepancy = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_reason_discrepancy, fvalue, ftext, lang, filter);
    };

    // Получим список с выборкой по полю
    ids_directory.prototype.getReason_Discrepancy_Of_CultureName = function (name, text) {
        if (this.list_reason_discrepancy) {
            var obj = getObjects(this.list_reason_discrepancy, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    //*======= ids_directory.list_detention_return  (Справочник причин возвратов и задержаний) ======================================

    ids_directory.prototype.getDetention_Return_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_detention_return, id);
    };

    ids_directory.prototype.getListDetention_Return = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_detention_return, fvalue, ftext, lang, filter);
    };

    // Получим список с выборкой по полю
    ids_directory.prototype.getDetention_Return_Of_CultureName = function (name, text) {
        if (this.list_detention_return) {
            var obj = getObjects(this.list_detention_return, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    //*======= ids_directory.list_cargo  (Справочник грузов) ======================================
    //
    ids_directory.prototype.getCargo_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_cargo, id);
    };
    //
    ids_directory.prototype.getListCargo = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_cargo, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCargo_Of_CultureName = function (name, text) {
        if (this.list_cargo) {
            var obj = getObjects(this.list_cargo, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_cargo_group  (Справочник группы грузов) ======================================
    //
    ids_directory.prototype.getCargoGroup_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_cargo_group, id);
    };
    //
    ids_directory.prototype.getListCargoGroup = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_cargo_group, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCargoGroup_Of_CultureName = function (name, text) {
        if (this.list_cargo_group) {
            var obj = getObjects(this.list_cargo_group, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_external_station  (Справочник внешних станций) ======================================
    //
    ids_directory.prototype.getExternalStation_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_external_station, id);
    };
    //
    ids_directory.prototype.getListExternalStation = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_external_station, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getExternalStation_Of_CultureName = function (name, text) {
        if (this.list_external_station) {
            var obj = getObjects(this.list_external_station, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    App.ids_directory = ids_directory;

    window.App = App;
})(window);