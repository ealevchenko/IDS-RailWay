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
        this.list_cargo_out_group = null;
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
                if (table === 'countrys') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_countrys) {
                        process++;
                        this.getCountrys(function (data) {
                            this.list_countrys = data;
                            process--;
                            result.push('countrys');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'genus_wagon') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_genus_wagon) {
                        process++;
                        this.getGenusWagons(function (data) {
                            this.list_genus_wagon = data;
                            process--;
                            result.push('genus_wagon');
                            out_load(process);
                        }.bind(this));
                    };
                };
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
                if (table === 'cargo_out_group') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_cargo_out_group) {
                        process++;
                        this.getCargoOutGroup(function (data) {
                            this.list_cargo_out_group = data;
                            process--;
                            result.push('cargo_out_group');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'cargo_etsng') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_cargo_etsng) {
                        process++;
                        this.getCargoETSNG(function (data) {
                            this.list_cargo_etsng = data;
                            process--;
                            result.push('cargo_etsng');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'cargo_gng') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_cargo_gng) {
                        process++;
                        this.getCargoGNG(function (data) {
                            this.list_cargo_gng = data;
                            process--;
                            result.push('cargo_gng');
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
                if (table === 'border_checkpoint') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_border_checkpoint) {
                        process++;
                        this.getBorderCheckpoint(function (data) {
                            this.list_border_checkpoint = data;
                            process--;
                            result.push('border_checkpoint');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'shipper') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_shipper) {
                        process++;
                        this.getShipper(function (data) {
                            this.list_shipper = data;
                            process--;
                            result.push('shipper');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'consignee') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_consignee) {
                        process++;
                        this.getConsignee(function (data) {
                            this.list_consignee = data;
                            process--;
                            result.push('consignee');
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
                if (table === 'condition_arrival') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_condition_arrival) {
                        process++;
                        this.getConditionArrival(function (data) {
                            this.list_condition_arrival = data;
                            process--;
                            result.push('condition_arrival');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'type_wagons') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_type_wagons) {
                        process++;
                        this.getTypeWagons(function (data) {
                            this.list_type_wagons = data;
                            process--;
                            result.push('type_wagons');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'owners_wagons') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_owners_wagons) {
                        process++;
                        this.getOwnersWagons(function (data) {
                            this.list_owners_wagons = data;
                            process--;
                            result.push('owners_wagons');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'type_owner_ship') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_type_owner_ship) {
                        process++;
                        this.getTypeOwnerShip(function (data) {
                            this.list_type_owner_ship = data;
                            process--;
                            result.push('type_owner_ship');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'limiting_loading') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_limiting_loading) {
                        process++;
                        this.getLimitingLoading(function (data) {
                            this.list_limiting_loading = data;
                            process--;
                            result.push('limiting_loading');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'payer_sender') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_payer_sender) {
                        process++;
                        this.getPayerSender(function (data) {
                            this.list_payer_sender = data;
                            process--;
                            result.push('payer_sender');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'certification_data') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_certification_data) {
                        process++;
                        this.getCertificationData(function (data) {
                            this.list_certification_data = data;
                            process--;
                            result.push('certification_data');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'commercial_condition') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_commercial_condition) {
                        process++;
                        this.getCommercialCondition(function (data) {
                            this.list_commercial_condition = data;
                            process--;
                            result.push('commercial_condition');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'hazard_class') {
                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_hazard_class) {
                        process++;
                        this.getHazardClass(function (data) {
                            this.list_hazard_class = data;
                            process--;
                            result.push('hazard_class');
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
    //======= Directory_Countrys (Справочник стран) ======================================
    ids_directory.prototype.getCountrys = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/countrys/all',
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
                OnAJAXError("ids_directory.getCountrys", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_GenusWagons (Справочник РОД ВАГОНА) ======================================
    ids_directory.prototype.getGenusWagons = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/genus_wagon/all',
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
                OnAJAXError("ids_directory.getGenusWagons", x, y, z);
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
    //Добавить внешнюю станцию ИДС
    ids_directory.prototype.postOperationCreateUpdateWagons = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/wagon/operation/create_update/',
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
                OnAJAXError("ids_directory.postOperationCreateUpdateWagons", x, y, z);
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
    // Получить аренды по номеру вагона (полная выбрка)
    ids_directory.prototype.getViewWagonsRentOfNum = function (num, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/wagon_rent/view/num/' + num,
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
                OnAJAXError("ids_directory.getViewWagonsRentOfNum", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
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
    //======= Directory_CargoOutGroup (Справочник группа грузов) ======================================
    //
    ids_directory.prototype.getCargoOutGroup = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/cargo_out_group/all',
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
                OnAJAXError("ids_directory.getCargoOutGroup", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CargoETSNG (Справочник грузов ЕТСНГ) ======================================
    //
    ids_directory.prototype.getCargoETSNG = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/cargo_etsng/all',
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
                OnAJAXError("ids_directory.getCargoETSNG", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить груз
    ids_directory.prototype.postOperationCargoETSNG = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/cargo_etsng/operation/add/',
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
                OnAJAXError("ids_directory.postOperationCargoETSNG", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CargoGNG (Справочник грузов ГНГ) ======================================
    //
    ids_directory.prototype.getCargoGNG = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/cargo_gng/all',
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
                OnAJAXError("ids_directory.getCargoGNG", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить груз
    ids_directory.prototype.postOperationCargoGNG = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/cargo_gng/operation/add/',
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
                OnAJAXError("ids_directory.postOperationCargoGNG", x, y, z);
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
    //Добавить внешнюю станцию ИДС
    ids_directory.prototype.postOperationExternalStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/external_station/operation/add/',
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
                OnAJAXError("ids_directory.postOperationExternalStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_BorderCheckpoint (Справочник пограничных пунктов) ======================================
    //
    ids_directory.prototype.getBorderCheckpoint = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/border_checkpoint/all',
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
                OnAJAXError("ids_directory.GetBorderCheckpoint", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить внешнюю станцию ИДС
    ids_directory.prototype.postOperationBorderCheckpoint = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/border_checkpoint/operation/add/',
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
                OnAJAXError("ids_directory.postOperationBorderCheckpoint", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Shipper (Справочник грузоотправителей) ======================================
    ids_directory.prototype.getShipper = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/shipper/all',
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
                OnAJAXError("ids_directory.GetShipper", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить грузоотправителя ИДС
    ids_directory.prototype.postOperationShipper = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/shipper/operation/add/',
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
                OnAJAXError("ids_directory.postOperationShipper", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Consignee (Справочник грузополучателей) ======================================
    ids_directory.prototype.getConsignee = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/consignee/all',
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
                OnAJAXError("ids_directory.getConsignee", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_ConditionArrival (Справочник разметка по прибытию) ======================================
    //
    ids_directory.prototype.getConditionArrival = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/condition_arrival/all',
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
                OnAJAXError("ids_directory.getConditionArrival", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_TypeWagons (Справочник типов подвижного состава) ======================================
    //
    ids_directory.prototype.getTypeWagons = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/type_wagons/all',
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
                OnAJAXError("ids_directory.getTypeWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_OwnersWagons (Справочник собствинеков вагонов) ======================================
    //
    ids_directory.prototype.getOwnersWagons = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/owners_wagons/all',
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
                OnAJAXError("ids_directory.getOwnersWagons", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_TypeOwnerShip (Справочник типов собственности) ======================================
    //
    ids_directory.prototype.getTypeOwnerShip = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/type_owner_ship/all',
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
                OnAJAXError("ids_directory.getTypeOwnerShip", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_LimitingLoading (Справочник ограничение погрузки) ======================================
    //
    ids_directory.prototype.getLimitingLoading = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/limiting_loading/all',
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
                OnAJAXError("ids_directory.getLimitingLoading", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_PayerSender (Справочник платильщиков по отправке) ======================================
    //
    ids_directory.prototype.getPayerSender = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/payer_sender/all',
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
                OnAJAXError("ids_directory.getPayerSender", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить грузоотправителя ИДС
    ids_directory.prototype.postOperationPayerSender = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/payer_sender/operation/add/',
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
                OnAJAXError("ids_directory.postOperationPayerSender", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CertificationData (Справочник сертификационых данных) ======================================
    //
    ids_directory.prototype.getCertificationData = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/certification_data/all',
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
                OnAJAXError("ids_directory.getCertificationData", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CommercialCondition (Справочник комерчиского состояния) ======================================
    //
    ids_directory.prototype.getCommercialCondition = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/commercial_condition/all',
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
                OnAJAXError("ids_directory.getCommercialCondition", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_HazardClass (Справочник класов опасности) ======================================
    //
    ids_directory.prototype.getHazardClass = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/hazard_class/all',
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
                OnAJAXError("ids_directory.getHazardClass", x, y, z);
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
                    list.push({ value: l[fvalue], text: l[ftext1 + '_' + lang] + ' - ' + l[ftext2 + '_' + lang], disabled: false });
                } else {
                    list.push({ value: l[fvalue], text: l[ftext1] + ' - ' + l[ftext2], disabled: false });
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
            obj = list_obj.find(function (o) { return o[field_name] == value });
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
    //
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
    // Получить по id
    ids_directory.prototype.getDivisions_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_divisions, id);
    };
    // Получить по коду
    ids_directory.prototype.getDivisions_Of_Code = function (code) {
        return this.getObj_Of_field(this.list_divisions, 'code', code);
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
    ids_directory.prototype.getCargo_Of_IDETSNG = function (id) {
        return this.getObj_Of_field(this.list_cargo, 'id_cargo_etsng', id);
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
    //*======= ids_directory.list_cargo_out_group  (Справочник группы грузов по отправке) ======================================
    //
    ids_directory.prototype.getCargoOutGroup_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_cargo_out_group, id);
    };
    //
    ids_directory.prototype.getListCargoOutGroup = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_cargo_out_group, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCargoOutGroup_Of_CultureName = function (name, text) {
        if (this.list_cargo_out_group) {
            var obj = getObjects(this.list_cargo_out_group, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_cargo_etsng  (Справочник грузов ЕТСНГ) ======================================
    // Получить строку по id
    ids_directory.prototype.getCargoETSNG_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_cargo_etsng, id);
    };
    // Получить строку по коду
    ids_directory.prototype.getCargoETSNG_Of_Code = function (code) {
        return this.getObj_Of_field(this.list_cargo_etsng, 'code', code);
    };
    //
    ids_directory.prototype.getListCargoETSNG = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_cargo_etsng, fvalue, ftext, lang, filter);
    };
    //
    ids_directory.prototype.getListCargoETSNG2 = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.getListObj2(this.list_cargo_etsng, fvalue, ftext1, ftext2, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCargoETSNG_Of_CultureName = function (name, text) {
        if (this.list_cargo_etsng) {
            var obj = getObjects(this.list_cargo_etsng, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_cargo_gng  (Справочник грузов ГНГ) ======================================
    // Получить строку по id
    ids_directory.prototype.getCargoGNG_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_cargo_gng, id);
    };
    // Получить строку по коду
    ids_directory.prototype.getCargoGNG_Of_Code = function (code) {
        return this.getObj_Of_field(this.list_cargo_gng, 'code', code);
    };
    //
    ids_directory.prototype.getListCargoGNG = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_cargo_gng, fvalue, ftext, lang, filter);
    };
    //
    ids_directory.prototype.getListCargoGNG2 = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.getListObj2(this.list_cargo_gng, fvalue, ftext1, ftext2, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCargoGNG_Of_CultureName = function (name, text) {
        if (this.list_cargo_gng) {
            var obj = getObjects(this.list_cargo_gng, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    //*======= ids_directory.list_external_station  (Справочник внешних станций) ======================================
    //
    ids_directory.prototype.getExternalStation_Of_ID = function (code) {
        return this.getObj_Of_field(this.list_external_station, 'code', code);
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
    //*======= ids_directory.list_border_checkpoint  (Справочник погран переходов) ======================================
    //
    ids_directory.prototype.getBorderCheckpoint_Of_ID = function (code) {
        return this.getObj_Of_field(this.list_border_checkpoint, 'code', code);
    };
    //
    ids_directory.prototype.getListBorderCheckpoint = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_border_checkpoint, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getBorderCheckpoint_Of_CultureName = function (name, text) {
        if (this.list_border_checkpoint) {
            var obj = getObjects(this.list_border_checkpoint, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_shipper  (Справочник грузоотправителей) ======================================
    //
    ids_directory.prototype.getShipper_Of_ID = function (code) {
        return this.getObj_Of_field(this.list_shipper, 'code', code);
    };
    //
    ids_directory.prototype.getListShipper = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_shipper, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getShipper_Of_CultureName = function (name, text) {
        if (this.list_shipper) {
            var obj = getObjects(this.list_shipper, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_consignee  (Справочник грузополучателей) ======================================
    //
    ids_directory.prototype.getConsignee_Of_ID = function (code) {
        return this.getObj_Of_field(this.list_consignee, 'code', code);
    };
    //
    ids_directory.prototype.getListConsignee = function (fvalue, ftext, filter) {
        return this.getListObj(this.list_consignee, fvalue, ftext, null, filter);
    };
    //*======= ids_directory.list_countrys  (Справочник стран) ======================================
    // Получить по id
    ids_directory.prototype.getCountrys_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_countrys, id);
    };
    // Получить по коду
    ids_directory.prototype.getCountrys_Of_CodeSNG = function (code) {
        return this.getObj_Of_field(this.list_countrys, 'code_sng', code);
    };
    //
    ids_directory.prototype.getCountrys_Of_CodeEurope = function (code) {
        return this.getObj_Of_field(this.list_countrys, 'code_europe', code);
    };
    //
    ids_directory.prototype.getCountrys_Of_CodeISO = function (code) {
        return this.getObj_Of_field(this.list_countrys, 'code_iso', code);
    };
    //
    ids_directory.prototype.getCountrys_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_countrys, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListCountrys = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_countrys, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCountrys_Of_CultureName = function (name, text) {
        if (this.list_countrys) {
            var obj = getObjects(this.list_countrys, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    //*======= ids_directory.list_genus_wagon (Справочник РОД ВАГОНА) ======================================
    // Получить по id
    ids_directory.prototype.getGenusWagons_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_genus_wagon, id);
    };
    // Получить по коду
    ids_directory.prototype.getGenusWagons_Of_RodUZ = function (rod_uz) {
        return this.getObj_Of_field(this.list_genus_wagon, 'rod_uz', rod_uz);
    };
    //
    ids_directory.prototype.getGenusWagons_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_genus_wagon, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListGenusWagons = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_genus_wagon, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getGenusWagons_Of_CultureName = function (name, text) {
        if (this.list_genus_wagon) {
            var obj = getObjects(this.list_genus_wagon, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    //*======= ids_directory.list_condition_arrival  (Справочник разметка по прибытию) ======================================
    // Получить по id
    ids_directory.prototype.getConditionArrival_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_condition_arrival, id);
    };
    //
    ids_directory.prototype.getConditionArrival_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_condition_arrival, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListConditionArrival = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_condition_arrival, fvalue, ftext, lang, filter);
    };
    //
    ids_directory.prototype.getListConditionArrival2 = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.getListObj2(this.list_condition_arrival, fvalue, ftext1, ftext2, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getConditionArrival_Of_CultureName = function (name, text) {
        if (this.list_condition_arrival) {
            var obj = getObjects(this.list_condition_arrival, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_type_wagons (Справочник типов подвижного состава) ======================================
    // Получить по id
    ids_directory.prototype.getTypeWagons_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_type_wagons, id);
    };
    //
    ids_directory.prototype.getTypeWagons_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_type_wagons, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListTypeWagons = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_type_wagons, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getTypeWagons_Of_CultureName = function (name, text) {
        if (this.list_type_wagons) {
            var obj = getObjects(this.list_type_wagons, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_owners_wagons (Справочник собствинеков вагонов) ======================================
    // Получить по id
    ids_directory.prototype.getOwnersWagons_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_owners_wagons, id);
    };
    //
    ids_directory.prototype.getOwnersWagons_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_owners_wagons, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListOwnersWagons = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_owners_wagons, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getOwnersWagons_Of_CultureName = function (name, text) {
        if (this.list_owners_wagons) {
            var obj = getObjects(this.list_owners_wagons, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_type_owner_ship (Справочник типов собственности) ======================================
    // Получить по id
    ids_directory.prototype.getTypeOwnerShip_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_type_owner_ship, id);
    };
    //
    ids_directory.prototype.getTypeOwnerShip_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_type_owner_ship, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListTypeOwnerShip = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_type_owner_ship, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getTypeOwnerShip_Of_CultureName = function (name, text) {
        if (this.list_type_owner_ship) {
            var obj = getObjects(this.list_type_owner_ship, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_operators_wagons (Справочник операторов вагонов) ======================================
    // Получить по id
    ids_directory.prototype.getOperatorsWagons_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_operators_wagons, id);
    };
    //
    ids_directory.prototype.getOperatorsWagons_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_operators_wagons, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListOperatorsWagons = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_operators_wagons, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getOperatorsWagons_Of_CultureName = function (name, text) {
        if (this.list_operators_wagons) {
            var obj = getObjects(this.list_operators_wagons, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_limiting_loading  (Справочник ограничений погрузки) ======================================
    // Получить по id
    ids_directory.prototype.getLimitingLoading_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_limiting_loading, id);
    };
    //
    ids_directory.prototype.getLimitingLoading_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_limiting_loading, text, ftext, lang);
    };
    //
    ids_directory.prototype.getListLimitingLoading = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_limiting_loading, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getLimitingLoading_Of_CultureName = function (name, text) {
        if (this.list_limiting_loading) {
            var obj = getObjects(this.list_limiting_loading, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_payer_sender  (Справочник платильщиков по отправке) ======================================
    //
    ids_directory.prototype.getPayerSender_Of_ID = function (code) {
        return this.getObj_Of_field(this.list_payer_sender, 'code', code);
    };
    //
    ids_directory.prototype.getListPayerSender = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_payer_sender, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getPayerSender_Of_CultureName = function (name, text) {
        if (this.list_payer_sender) {
            var obj = getObjects(this.list_payer_sender, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_certification_data  (Справочник сертификационных данных) ======================================
    //
    ids_directory.prototype.getCertificationData_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_certification_data, id);
    };
    //
    ids_directory.prototype.getListCertificationData = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_certification_data, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCertificationData_Of_CultureName = function (name, text) {
        if (this.list_certification_data) {
            var obj = getObjects(this.list_certification_data, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_commercial_condition  (Справочник скомерчиских состояний) ======================================
    //
    ids_directory.prototype.getCommercialCondition_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_commercial_condition, id);
    };
    //
    ids_directory.prototype.getListCommercialCondition = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_commercial_condition, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getCommercialCondition_Of_CultureName = function (name, text) {
        if (this.list_commercial_condition) {
            var obj = getObjects(this.list_commercial_condition, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };
    //*======= ids_directory.list_hazard_class  (Справочник классов опасности) ======================================
    //
    ids_directory.prototype.getHazardClass_Of_ID = function (code) {
        return this.getObj_Of_field(this.list_hazard_class, 'code', code);
    };
    //
    ids_directory.prototype.getListHazardClass = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_hazard_class, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getHazardClass_Of_CultureName = function (name, text) {
        if (this.list_hazard_class) {
            var obj = getObjects(this.list_hazard_class, name + '_' + App.Lang, text);
            return obj;
        }
        return null;
    };

    App.ids_directory = ids_directory;

    window.App = App;

})(window);