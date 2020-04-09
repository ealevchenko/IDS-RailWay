// Подключите common.js
// Подключите shared.js

var IDS_DIRECTORY = function (lang) {
    this.lang = lang;

};

IDS_DIRECTORY.list_genus_wagon = [];

IDS_DIRECTORY.list_wagon_manufacturers = [];

IDS_DIRECTORY.list_types_repairs_wagons = [];

IDS_DIRECTORY.list_models_wagons = [];

IDS_DIRECTORY.list_type_wagons = [];

IDS_DIRECTORY.list_type_owner_ship = [];

IDS_DIRECTORY.list_owners_wagons = [];

IDS_DIRECTORY.list_lessors_wagons = [];

IDS_DIRECTORY.list_operators_wagons = [];

IDS_DIRECTORY.list_poligon_travel_wagons = [];

IDS_DIRECTORY.list_special_conditions = [];

IDS_DIRECTORY.list_depo = [];

IDS_DIRECTORY.list_wagons_condition = [];

IDS_DIRECTORY.list_station = [];

IDS_DIRECTORY.list_external_network_station = []; // delete

IDS_DIRECTORY.list_consignee = [];

IDS_DIRECTORY.list_shipper = [];

IDS_DIRECTORY.list_border_checkpoint = [];

IDS_DIRECTORY.list_countrys = [];

IDS_DIRECTORY.list_railway = [];

IDS_DIRECTORY.list_inlandrailway = [];

IDS_DIRECTORY.list_external_station = [];

IDS_DIRECTORY.list_limiting_loading = [];

IDS_DIRECTORY.list_condition_arrival = [];

IDS_DIRECTORY.list_cars = [];

/* ----------------------------------------------------------
ЗАГРУЗКА СПРАВОЧНИКОВ
-------------------------------------------------------------*/
// Загрузка списка справочников
IDS_DIRECTORY.prototype.load = function (list, lockOff, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'genus_wagon') {
            IDS_DIRECTORY.prototype.getGenusWagons(function (result_genus_wagon) {
                obj.list_genus_wagon = result_genus_wagon;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'wagon_manufacturers') {
            IDS_DIRECTORY.prototype.getWagonManufacturers(function (result_wagon_manufacturers) {
                obj.list_wagon_manufacturers = result_wagon_manufacturers;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'types_repairs_wagons') {
            IDS_DIRECTORY.prototype.getTypesRepairsWagons(function (result_types_repairs_wagons) {
                obj.list_types_repairs_wagons = result_types_repairs_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'models_wagons') {
            IDS_DIRECTORY.prototype.getModelsWagons(function (result_models_wagons) {
                obj.list_models_wagons = result_models_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'type_wagons') {
            IDS_DIRECTORY.prototype.getTypeWagons(function (result_type_wagons) {
                obj.list_type_wagons = result_type_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'type_owner_ship') {
            IDS_DIRECTORY.prototype.getTypeOwnerShip(function (result_type_owner_ship) {
                obj.list_type_owner_ship = result_type_owner_ship;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'owners_wagons') {
            IDS_DIRECTORY.prototype.getOwnersWagons(function (result_owners_wagons) {
                obj.list_owners_wagons = result_owners_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'lessors_wagons') {
            IDS_DIRECTORY.prototype.getLessorsWagons(function (result_lessors_wagons) {
                obj.list_lessors_wagons = result_lessors_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'operators_wagons') {
            IDS_DIRECTORY.prototype.getOperatorsWagons(function (result_operators_wagons) {
                obj.list_operators_wagons = result_operators_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'poligon_travel_wagons') {
            IDS_DIRECTORY.prototype.getPoligonTravelWagons(function (result_poligon_travel_wagons) {
                obj.list_poligon_travel_wagons = result_poligon_travel_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'special_conditions') {
            IDS_DIRECTORY.prototype.getSpecialConditions(function (result_special_conditions) {
                obj.list_special_conditions = result_special_conditions;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'depo') {
            IDS_DIRECTORY.prototype.getDEPO(function (result_depo) {
                obj.list_depo = result_depo;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'wagons_condition') {
            IDS_DIRECTORY.prototype.getWagonsCondition(function (result_wagons_condition) {
                obj.list_wagons_condition = result_wagons_condition;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'station') {
            IDS_DIRECTORY.prototype.getStation(function (result_station) {
                obj.list_station = result_station;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'consignee') {
            IDS_DIRECTORY.prototype.getConsignee(function (result_consignee) {
                obj.list_consignee = result_consignee;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'shipper') {
            IDS_DIRECTORY.prototype.getShipper(function (result_shipper) {
                obj.list_shipper = result_shipper;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'border_checkpoint') {
            IDS_DIRECTORY.prototype.getBorderCheckpoint(function (result_border_checkpoint) {
                obj.list_border_checkpoint = result_border_checkpoint;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'countrys') {
            IDS_DIRECTORY.prototype.getCountrys(function (result_countrys) {
                obj.list_countrys = result_countrys;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'railway') {
            IDS_DIRECTORY.prototype.getRailway(function (result_railway) {
                obj.list_railway = result_railway;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'inlandrailway') {
            IDS_DIRECTORY.prototype.getInlandRailway(function (result_inlandrailway) {
                obj.list_inlandrailway = result_inlandrailway;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'external_station') {
            IDS_DIRECTORY.prototype.getExternalStation(function (result_external_station) {
                obj.list_external_station = result_external_station;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'limiting_loading') {
            IDS_DIRECTORY.prototype.getLimitingLoading(function (result_limiting_loading) {
                obj.list_limiting_loading = result_limiting_loading;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'condition_arrival') {
            IDS_DIRECTORY.prototype.getConditionArrival(function (result_condition_arrival) {
                obj.list_condition_arrival = result_condition_arrival;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'cars') {
            IDS_DIRECTORY.prototype.getExternalStation(function (result_cars) {
                obj.list_cars = result_cars;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
    });
};
// Загрузка справочника грузоотправителей
IDS_DIRECTORY.prototype.loadShipper = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getShipper(function (result_shipper) {
        obj.list_shipper = result_shipper;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника внешних дорог
IDS_DIRECTORY.prototype.loadBorderCheckpoint = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getBorderCheckpoint(function (result_border_checkpoint) {
        obj.list_border_checkpoint = result_border_checkpoint;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника стран
IDS_DIRECTORY.prototype.loadCountrys = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCountrys(function (result_countrys) {
        obj.list_countrys = result_countrys;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника внешних станций
IDS_DIRECTORY.prototype.loadExternalStation = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getExternalStation(function (result_external_station) {
        obj.list_external_station = result_external_station;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника вагонов
IDS_DIRECTORY.prototype.loadCars = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCars(function (result_cars) {
        obj.list_cars = result_cars;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника владельцев вагонов
IDS_DIRECTORY.prototype.loadOwnersWagons = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getOwnersWagons(function (result_owners_wagons) {
        obj.list_owners_wagons = result_owners_wagons;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника операторов вагонов
IDS_DIRECTORY.prototype.loadOperatorsWagons = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getOperatorsWagons(function (result_operators_wagons) {
        obj.list_operators_wagons = result_operators_wagons;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника ограничение погрузки
IDS_DIRECTORY.prototype.loadLimitingLoading = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getLimitingLoading(function (result_limiting_loading) {
        obj.list_limiting_loading = result_limiting_loading;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника годность по прибытию
IDS_DIRECTORY.prototype.loadConditionArrival = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getConditionArrival(function (result_condition_arrival) {
        obj.list_condition_arrival = result_condition_arrival;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= Directory_Cars (Справочник вагонов) ======================================
//
IDS_DIRECTORY.prototype.getCars = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cars/all',
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
            OnAJAXError("IDS_DIRECTORY.getCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по ID
IDS_DIRECTORY.prototype.getCarsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cars/id/'+id,
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
            OnAJAXError("IDS_DIRECTORY.getCarsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по номеру вагона
IDS_DIRECTORY.prototype.getCarsOfNum= function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cars/num/'+num,
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
            OnAJAXError("IDS_DIRECTORY.getCarsOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить текщий вагон по номеру вагона
IDS_DIRECTORY.prototype.getCurrentCarsOfNum= function (num, adm, rod, kol_os, usl_tip, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cars/current/num/'+num+'/adm/'+adm+'/rod/'+rod+'/kol_os/'+kol_os+'/usl_tip/'+usl_tip,
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
            OnAJAXError("IDS_DIRECTORY.getCurrentCarsOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCars = function (car, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/cars/id/' + car.id,
        data: JSON.stringify(car),
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
            OnAJAXError("IDS_DIRECTORY.putCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCars = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/cars/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCars = function (car, callback) {
    $.ajax({
        url: '../../api/ids/directory/cars/',
        type: 'POST',
        data: JSON.stringify(car),
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
            OnAJAXError("IDS_DIRECTORY.postCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_ConditionArrival (Справочник годности по прибытию) ======================================
//
IDS_DIRECTORY.prototype.getConditionArrival = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getConditionArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getConditionArrivalOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/condition_arrival/id/'+id,
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
            OnAJAXError("IDS_DIRECTORY.getConditionArrivalOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putConditionArrival = function (countrys, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/condition_arrival/id/' + countrys.id,
        data: JSON.stringify(countrys),
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
            OnAJAXError("IDS_DIRECTORY.putConditionArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteConditionArrival = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/condition_arrival/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteConditionArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postConditionArrival = function (countrys, callback) {
    $.ajax({
        url: '../../api/ids/directory/condition_arrival/',
        type: 'POST',
        data: JSON.stringify(countrys),
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
            OnAJAXError("IDS_DIRECTORY.postConditionArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_LimitingLoading (Справочник ограничение погрузки) ======================================
//
IDS_DIRECTORY.prototype.getLimitingLoading = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getLimitingLoading", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getLimitingLoadingOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/limiting_loading/id/'+id,
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
            OnAJAXError("IDS_DIRECTORY.getLimitingLoadingOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putLimitingLoading = function (countrys, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/limiting_loading/id/' + countrys.id,
        data: JSON.stringify(countrys),
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
            OnAJAXError("IDS_DIRECTORY.putLimitingLoading", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteLimitingLoading = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/limiting_loading/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteLimitingLoading", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postLimitingLoading = function (countrys, callback) {
    $.ajax({
        url: '../../api/ids/directory/limiting_loading/',
        type: 'POST',
        data: JSON.stringify(countrys),
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
            OnAJAXError("IDS_DIRECTORY.postLimitingLoading", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Countrys (Справочник стран) ======================================
IDS_DIRECTORY.prototype.getCountrys = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCountrys", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить страну по id
IDS_DIRECTORY.prototype.getCountrysOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/countrys/id/'+id,
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
            OnAJAXError("IDS_DIRECTORY.getCountrysOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить страну по коду СНГ
IDS_DIRECTORY.prototype.getCountrysOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/countrys/code_sng/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getCountrysOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCountrys = function (countrys, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/countrys/id/' + countrys.id,
        data: JSON.stringify(countrys),
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
            OnAJAXError("IDS_DIRECTORY.putCountrys", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCountrys = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/countrys/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCountrys", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCountrys = function (countrys, callback) {
    $.ajax({
        url: '../../api/ids/directory/countrys/',
        type: 'POST',
        data: JSON.stringify(countrys),
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
            OnAJAXError("IDS_DIRECTORY.postCountrys", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Railway (Справочник дорог) ======================================
IDS_DIRECTORY.prototype.getRailway = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/railway/all',
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
            OnAJAXError("IDS_DIRECTORY.getRailway", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_InlandRailway (Справочник внутрених дорог) ======================================
IDS_DIRECTORY.prototype.getInlandRailway = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/inlandrailway/all',
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
            OnAJAXError("IDS_DIRECTORY.getInlandRailway", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_ExternalStation (Справочник внешних станций) ======================================
IDS_DIRECTORY.prototype.getExternalStation = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getExternalStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по коду
IDS_DIRECTORY.prototype.getExternalStationOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/external_station/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.GetExternalStationOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putExternalStation = function (shipper, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/external_station/code/' + shipper.code,
        data: JSON.stringify(shipper),
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
            OnAJAXError("IDS_DIRECTORY.putExternalStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteExternalStation = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/external_station/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteExternalStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postExternalStation = function (shipper, callback) {
    $.ajax({
        url: '../../api/ids/directory/external_station/',
        type: 'POST',
        data: JSON.stringify(shipper),
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
            OnAJAXError("IDS_DIRECTORY.postExternalStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_GenusWagons (Справочник РОД ВАГОНА) ======================================
IDS_DIRECTORY.prototype.getGenusWagons = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getGenusWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_WagonManufacturers (Справочник заводов изготовителей) ======================================
IDS_DIRECTORY.prototype.getWagonManufacturers = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagon_manufacturers/all',
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
            OnAJAXError("IDS_DIRECTORY.getWagonManufacturers", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_TypesRepairsWagons (Справочник типов ремонта) ======================================
IDS_DIRECTORY.prototype.getTypesRepairsWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/types_repairs_wagons/all',
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
            OnAJAXError("IDS_DIRECTORY.getTypesRepairsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_ModelsWagons (Справочник моделей вагонов) ======================================
IDS_DIRECTORY.prototype.getModelsWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/models_wagons/all',
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
            OnAJAXError("IDS_DIRECTORY.getModelsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_TypeWagons (Справочник типов подвижного состава) ======================================
IDS_DIRECTORY.prototype.getTypeWagons = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getTypeWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_TypeOwnerShip (Справочник типов собственности) ======================================
IDS_DIRECTORY.prototype.getTypeOwnerShip = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getTypeOwnerShip", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_OwnersWagons (Справочник собствинеков вагонов) ======================================
IDS_DIRECTORY.prototype.getOwnersWagons = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getOwnersWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_LessorsWagons (Справочник арендодателей вагонов) ======================================
IDS_DIRECTORY.prototype.getLessorsWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/lessors_wagons/all',
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
            OnAJAXError("IDS_DIRECTORY.getLessorsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_OperatorsWagons (Справочник операторов вагонов) ======================================
IDS_DIRECTORY.prototype.getOperatorsWagons = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getOperatorsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_PoligonTravelWagons (Справочник полигоны курсирования) ======================================
IDS_DIRECTORY.prototype.getPoligonTravelWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/poligon_travel_wagons/all',
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
            OnAJAXError("IDS_DIRECTORY.getPoligonTravelWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_SpecialConditions (Справочник особых условий эксплуатации) ======================================
IDS_DIRECTORY.prototype.getSpecialConditions = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/special_conditions/all',
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
            OnAJAXError("IDS_DIRECTORY.getSpecialConditions", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_DEPO (Справочник ДЕПО) ======================================
IDS_DIRECTORY.prototype.getDEPO = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/depo/all',
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
            OnAJAXError("IDS_DIRECTORY.getDEPO", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_WagonsCondition (Справочник ДЕПО) ======================================
IDS_DIRECTORY.prototype.getWagonsCondition = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagons_condition/all',
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
            OnAJAXError("IDS_DIRECTORY.getWagonsCondition", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Station (Справочник станций ИДС) ======================================
IDS_DIRECTORY.prototype.getStation = function (callback) {
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
            }
        },
        error: function (x, y, z) {
            OnAJAXError("IDS_DIRECTORY.getStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Consignee (Справочник грузополучателей) ======================================
IDS_DIRECTORY.prototype.getConsignee = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getConsignee", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Shipper (Справочник грузоотправителей) ======================================
IDS_DIRECTORY.prototype.getShipper = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.GetShipper", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по коду
IDS_DIRECTORY.prototype.getShipperOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/shipper/code/'+code,
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
            OnAJAXError("IDS_DIRECTORY.GetShipperOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putShipper = function (shipper, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/shipper/code/' + shipper.code,
        data: JSON.stringify(shipper),
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
            OnAJAXError("IDS_DIRECTORY.putShipper", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteShipper = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/shipper/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteShipper", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postShipper = function (shipper, callback) {
    $.ajax({
        url: '../../api/ids/directory/shipper/',
        type: 'POST',
        data: JSON.stringify(shipper),
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
            OnAJAXError("IDS_DIRECTORY.postShipper", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_BorderCheckpoint (Справочник пограничных пунктов) ======================================
IDS_DIRECTORY.prototype.getBorderCheckpoint = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.GetBorderCheckpoint", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по коду
IDS_DIRECTORY.prototype.getBorderCheckpointOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/border_checkpoint/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.GetBorderCheckpointOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putBorderCheckpoint = function (shipper, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/border_checkpoint/code/' + shipper.code,
        data: JSON.stringify(shipper),
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
            OnAJAXError("IDS_DIRECTORY.putBorderCheckpoint", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteBorderCheckpoint = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/border_checkpoint/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteBorderCheckpoint", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postBorderCheckpoint = function (shipper, callback) {
    $.ajax({
        url: '../../api/ids/directory/border_checkpoint/',
        type: 'POST',
        data: JSON.stringify(shipper),
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
            OnAJAXError("IDS_DIRECTORY.postBorderCheckpoint", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
/* ----------------------------------------------------------
функции для работы с объектами
-------------------------------------------------------------*/
IDS_DIRECTORY.prototype.getValueObj = function (obj, name, lang) {
    if (lang) {
        return obj ? obj[name + '_' + lang] : null;
    } else {
        return obj ? obj[name] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValueCultureObj = function (obj, name) {
    return obj ? obj[name + '_' + this.lang] : null;
};
/* ----------------------------------------------------------
функции для работы с внутреним массивом
-------------------------------------------------------------*/
//*======= IDS_DIRECTORY.list_genus_wagon  (Справочник РОД ВАГОНА) ======================================
IDS_DIRECTORY.prototype.getGenusWagons_Internal_Of_ID = function (id_genus_wagon) {
    if (this.list_genus_wagon) {
        var obj = getObjects(this.list_genus_wagon, 'id', id_genus_wagon);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_DIRECTORY.prototype.getGenusWagons_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_genus_wagon) {
        var obj = getObjects(this.list_genus_wagon, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_DIRECTORY.prototype.getID_GenusWagons_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getGenusWagons_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_GenusWagons_Of_ID = function (id_genus_wagon, name, lang) {
    var obj = this.getGenusWagons_Internal_Of_ID(id_genus_wagon);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_GenusWagons_Of_ID = function (id_genus_wagon, name) {
    var obj = this.getGenusWagons_Internal_Of_ID(id_genus_wagon);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListGenusWagons = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_genus_wagon) {
        if (typeof filter === 'function') {
            list_filtr = this.list_genus_wagon.filter(filter);
        } else { list_filtr = this.list_genus_wagon; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_wagon_manufacturers (Справочник заводов изготовителей) ======================================
IDS_DIRECTORY.prototype.getWagonManufacturers_Internal_Of_ID = function (id_wagon_manufacturer) {
    if (this.list_wagon_manufacturers) {
        var obj = getObjects(this.list_wagon_manufacturers, 'id', id_wagon_manufacturer)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_WagonManufacturers_Of_ID = function (id_wagon_manufacturer, name, lang) {
    var obj = this.getWagonManufacturers_Internal_Of_ID(id_wagon_manufacturer);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_WagonManufacturers_Of_ID = function (id_wagon_manufacturer, name) {
    var obj = this.getWagonManufacturers_Internal_Of_ID(id_wagon_manufacturer);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListWagonManufacturers = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_wagon_manufacturers) {
        for (i = 0, j = this.list_wagon_manufacturers.length; i < j; i++) {
            var l = this.list_wagon_manufacturers[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_types_repairs_wagons (Справочник типов ремонта) ======================================
IDS_DIRECTORY.prototype.getTypesRepairsWagons_Internal_Of_ID = function (id_type_repairs) {
    if (this.list_types_repairs_wagons) {
        var obj = getObjects(this.list_types_repairs_wagons, 'id', id_type_repairs)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_TypesRepairsWagons_Of_ID = function (id_type_repairs, name, lang) {
    var obj = this.getTypesRepairsWagons_Internal_Of_ID(id_type_repairs);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_TypesRepairsWagons_Of_ID = function (id_type_repairs, name) {
    var obj = this.getTypesRepairsWagons_Internal_Of_ID(id_type_repairs);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListTypesRepairsWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_types_repairs_wagons) {
        for (i = 0, j = this.list_types_repairs_wagons.length; i < j; i++) {
            var l = this.list_types_repairs_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_models_wagons (Справочник моделей вагонов) ======================================
IDS_DIRECTORY.prototype.getModelsWagons_Internal_Of_ID = function (code) {
    if (this.list_models_wagons) {
        var obj = getObjects(this.list_models_wagons, 'code', code)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_ModelsWagons_Of_ID = function (code, name, lang) {
    var obj = this.getModelsWagons_Internal_Of_ID(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_ModelsWagons_Of_ID = function (code, name) {
    var obj = this.getModelsWagons_Internal_Of_ID(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListModelsWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_models_wagons) {
        for (i = 0, j = this.list_models_wagons.length; i < j; i++) {
            var l = this.list_models_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_type_wagons (Справочник типов подвижного состава) ======================================
IDS_DIRECTORY.prototype.getTypeWagons_Internal_Of_ID = function (id_type_wagon) {
    if (this.list_type_wagons) {
        var obj = getObjects(this.list_type_wagons, 'id', id_type_wagon)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_TypeWagons_Of_ID = function (id_type_wagon, name, lang) {
    var obj = this.getTypeWagons_Internal_Of_ID(id_type_wagon);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_TypeWagons_Of_ID = function (id_type_wagon, name) {
    var obj = this.getTypeWagons_Internal_Of_ID(id_type_wagon);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListTypeWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_type_wagons) {
        for (i = 0, j = this.list_type_wagons.length; i < j; i++) {
            var l = this.list_type_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_type_owner_ship (Справочник типов собственности) ======================================
IDS_DIRECTORY.prototype.getTypeOwnerShip_Internal_Of_ID = function (id_type_ownership) {
    if (this.list_type_owner_ship) {
        var obj = getObjects(this.list_type_owner_ship, 'id', id_type_ownership)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getTypeOwnerShip_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_type_owner_ship) {
        var obj = getObjects(this.list_type_owner_ship, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_TypeOwnerShip_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getTypeOwnerShip_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_TypeOwnerShip_Of_ID = function (id_type_ownership, name, lang) {
    var obj = this.getTypeOwnerShip_Internal_Of_ID(id_type_ownership);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_TypeOwnerShip_Of_ID = function (id_type_ownership, name) {
    var obj = this.getTypeOwnerShip_Internal_Of_ID(id_type_ownership);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListTypeOwnerShip = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_type_owner_ship) {
        for (i = 0, j = this.list_type_owner_ship.length; i < j; i++) {
            var l = this.list_type_owner_ship[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_owners_wagons (Справочник собствинеков вагонов) ======================================
IDS_DIRECTORY.prototype.getOwnersWagons_Internal_Of_ID = function (id_owner_wagon) {
    if (this.list_owners_wagons) {
        var obj = getObjects(this.list_owners_wagons, 'id', id_owner_wagon);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getOwnersWagons_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_owners_wagons) {
        var obj = getObjects(this.list_owners_wagons, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_DIRECTORY.prototype.getID_OwnersWagons_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getOwnersWagons_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_OwnersWagons_Of_ID = function (id_owner_wagon, name, lang) {
    var obj = this.getOwnersWagons_Internal_Of_ID(id_owner_wagon);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_OwnersWagons_Of_ID = function (id_owner_wagon, name) {
    var obj = this.getOwnersWagons_Internal_Of_ID(id_owner_wagon);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListOwnersWagons = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_owners_wagons) {
        if (typeof filter === 'function') {
            list_filtr = this.list_owners_wagons.filter(filter);
        } else { list_filtr = this.list_owners_wagons; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_lessors_wagons (Справочник арендодателей вагонов) ======================================
IDS_DIRECTORY.prototype.getLessorsWagons_Internal_Of_ID = function (id_lessor_wagon) {
    if (this.list_lessors_wagons) {
        var obj = getObjects(this.list_lessors_wagons, 'id', id_lessor_wagon)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_LessorsWagons_Of_ID = function (id_lessor_wagon, name, lang) {
    var obj = this.getLessorsWagons_Internal_Of_ID(id_lessor_wagon);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_LessorsWagons_Of_ID = function (id_lessor_wagon, name) {
    var obj = this.getLessorsWagons_Internal_Of_ID(id_lessor_wagon);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListLessorsWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_lessors_wagons) {
        for (i = 0, j = this.list_lessors_wagons.length; i < j; i++) {
            var l = this.list_lessors_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_operators_wagons (Справочник операторов вагонов) ======================================
IDS_DIRECTORY.prototype.getOperatorsWagons_Internal_Of_ID = function (id_operator_wagon) {
    if (this.list_operators_wagons) {
        var obj = getObjects(this.list_operators_wagons, 'id', id_operator_wagon)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getOperatorsWagons_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_operators_wagons) {
        var obj = getObjects(this.list_operators_wagons, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_DIRECTORY.prototype.getID_OperatorsWagons_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getOperatorsWagons_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_OperatorsWagons_Of_ID = function (id_operator_wagon, name, lang) {
    var obj = this.getOperatorsWagons_Internal_Of_ID(id_operator_wagon);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_OperatorsWagons_Of_ID = function (id_operator_wagon, name) {
    var obj = this.getOperatorsWagons_Internal_Of_ID(id_operator_wagon);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListOperatorsWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_operators_wagons) {
        for (i = 0, j = this.list_operators_wagons.length; i < j; i++) {
            var l = this.list_operators_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_poligon_travel_wagons (Справочник полигоны курсирования) ======================================
IDS_DIRECTORY.prototype.getPoligonTravelWagons_Internal_Of_ID = function (id_poligon_travel_wagon) {
    if (this.list_poligon_travel_wagons) {
        var obj = getObjects(this.list_poligon_travel_wagons, 'id', id_poligon_travel_wagon)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_PoligonTravelWagons_Of_ID = function (id_poligon_travel_wagon, name, lang) {
    var obj = this.getPoligonTravelWagons_Internal_Of_ID(id_poligon_travel_wagon);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_PoligonTravelWagons_Of_ID = function (id_poligon_travel_wagon, name) {
    var obj = this.getPoligonTravelWagons_Internal_Of_ID(id_poligon_travel_wagon);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListPoligonTravelWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_poligon_travel_wagons) {
        for (i = 0, j = this.list_poligon_travel_wagons.length; i < j; i++) {
            var l = this.list_poligon_travel_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_special_conditions (Справочник особых условий эксплуатации) ======================================
IDS_DIRECTORY.prototype.getSpecialConditions_Internal_Of_ID = function (id_special_conditions) {
    if (this.list_special_conditions) {
        var obj = getObjects(this.list_special_conditions, 'id', id_special_conditions)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_SpecialConditions_Of_ID = function (id_special_conditions, name, lang) {
    var obj = this.getSpecialConditions_Internal_Of_ID(id_special_conditions);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_SpecialConditions_Of_ID = function (id_special_conditions, name) {
    var obj = this.getSpecialConditions_Internal_Of_ID(id_special_conditions);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListSpecialConditions = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_special_conditions) {
        for (i = 0, j = this.list_special_conditions.length; i < j; i++) {
            var l = this.list_special_conditions[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_depo (Справочник ДЕПО) ======================================
IDS_DIRECTORY.prototype.getDEPO_Internal_Of_ID = function (code_depo) {
    if (this.list_depo) {
        var obj = getObjects(this.list_depo, 'code', code_depo)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_DEPO_Of_ID = function (code_depo, name, lang) {
    var obj = this.getDEPO_Internal_Of_ID(code_depo);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_DEPO_Of_ID = function (code_depo, name) {
    var obj = this.getDEPO_Internal_Of_ID(code_depo);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListDEPO = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_depo) {
        for (i = 0, j = this.list_depo.length; i < j; i++) {
            var l = this.list_depo[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//======= IDS_DIRECTORY.list_wagons_condition (Справочник ДЕПО) ======================================
IDS_DIRECTORY.prototype.getWagonsCondition_Internal_Of_ID = function (id_wagons_condition) {
    if (this.list_wagons_condition) {
        var obj = getObjects(this.list_wagons_condition, 'code', id_wagons_condition)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_WagonsCondition_Of_ID = function (id_wagons_condition, name, lang) {
    var obj = this.getWagonsCondition_Internal_Of_ID(id_wagons_condition);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_WagonsCondition_Of_ID = function (id_wagons_condition, name) {
    var obj = this.getWagonsCondition_Internal_Of_ID(id_wagons_condition);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListWagonsCondition = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_wagons_condition) {
        for (i = 0, j = this.list_wagons_condition.length; i < j; i++) {
            var l = this.list_wagons_condition[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_station  (Справочник станций) ======================================
IDS_DIRECTORY.prototype.getStation_Internal_Of_ID = function (id_station) {
    if (this.list_station) {
        var obj = getObjects(this.list_station, 'id', id_station)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Station_Of_ID = function (id_station, name, lang) {
    var obj = this.getStation_Internal_Of_ID(id_station);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Stations_Of_ID = function (id_station, name) {
    var obj = this.getStation_Internal_Of_ID(id_station);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListStation = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_station) {
        if (typeof filter === 'function') {
            list_filtr = this.list_station.filter(filter);
        } else { list_filtr = this.list_station; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_consignee  (Справочник грузополучателей) ======================================
IDS_DIRECTORY.prototype.getConsignee_Of_Code = function (code) {
    if (this.list_consignee) {
        var obj = getObjects(this.list_consignee, 'code', code)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Consignee_Of_ID = function (code, name, lang) {
    var obj = this.getConsignee_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Consignee_Of_ID = function (code, name) {
    var obj = this.getConsignee_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListConsignee = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_consignee) {
        if (typeof filter === 'function') {
            list_filtr = this.list_consignee.filter(filter);
        } else { list_filtr = this.list_consignee; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_shipper  (Справочник грузоотправителей) ======================================
IDS_DIRECTORY.prototype.getShipper_Of_Code = function (code) {
    if (this.list_shipper) {
        var obj = getObjects(this.list_shipper, 'code', code)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Shipper_Of_ID = function (code, name, lang) {
    var obj = this.getShipper_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Shipper_Of_ID = function (code, name) {
    var obj = this.getShipper_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListShipper = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_shipper) {
        if (typeof filter === 'function') {
            list_filtr = this.list_shipper.filter(filter);
        } else { list_filtr = this.list_shipper; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_border_checkpoint  (Справочник пограничных пунктов) ======================================
IDS_DIRECTORY.prototype.getBorderCheckpoint_Of_Code = function (code) {
    if (this.list_border_checkpoint) {
        var obj = getObjects(this.list_border_checkpoint, 'code', code)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_BorderCheckpoint_Of_ID = function (code, name, lang) {
    var obj = this.getBorderCheckpoint_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_BorderCheckpoint_Of_ID = function (code, name) {
    var obj = this.getBorderCheckpoint_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListBorderCheckpoint = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_border_checkpoint) {
        if (typeof filter === 'function') {
            list_filtr = this.list_border_checkpoint.filter(filter);
        } else { list_filtr = this.list_border_checkpoint; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_countrys  (Справочник стран) ======================================
IDS_DIRECTORY.prototype.getCountrys_Of_Code = function (id) {
    if (this.list_countrys) {
        var obj = getObjects(this.list_countrys, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Countrys_Of_ID = function (id, name, lang) {
    var obj = this.getCountrys_Of_Code(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Countrys_Of_ID = function (id, name) {
    var obj = this.getCountrys_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCountrys = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_countrys) {
        if (typeof filter === 'function') {
            list_filtr = this.list_countrys.filter(filter);
        } else { list_filtr = this.list_countrys; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_railway  (Справочник Ж.Д.) ======================================
IDS_DIRECTORY.prototype.getRailway_Of_Code = function (id) {
    if (this.list_railway) {
        var obj = getObjects(this.list_Railway, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Railway_Of_ID = function (id, name, lang) {
    var obj = this.getRailway_Of_Code(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Railway_Of_ID = function (id, name) {
    var obj = this.getRailway_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListRailway = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_railway) {
        if (typeof filter === 'function') {
            list_filtr = this.list_railway.filter(filter);
        } else { list_filtr = this.list_railway; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_inlandrailway  (Справочник внутрених Ж.Д.) ======================================
IDS_DIRECTORY.prototype.getInlandRailway_Of_Code = function (id) {
    if (this.list_inlandrailway) {
        var obj = getObjects(this.list_InlandRailway, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_InlandRailway_Of_ID = function (id, name, lang) {
    var obj = this.getInlandRailway_Of_Code(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_InlandRailway_Of_ID = function (id, name) {
    var obj = this.getInlandRailway_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListInlandRailway = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_inlandrailway) {
        if (typeof filter === 'function') {
            list_filtr = this.list_inlandrailway.filter(filter);
        } else { list_filtr = this.list_inlandrailway; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_external_station  (Справочник внешних станций) ======================================
IDS_DIRECTORY.prototype.getExternalStation_Of_Code = function (code) {
    if (this.list_external_station) {
        var obj = getObjects(this.list_external_station, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_ExternalStation_Of_Code = function (code, name, lang) {
    var obj = this.getExternalStation_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_ExternalStation_Of_Code = function (code, name) {
    var obj = this.getExternalStation_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListExternalStation = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_external_station) {
        if (typeof filter === 'function') {
            list_filtr = this.list_external_station.filter(filter);
        } else { list_filtr = this.list_external_station; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_limiting_loading  (Справочник ограничений погрузки) ======================================
IDS_DIRECTORY.prototype.getLimitingLoading_Of_Code = function (id) {
    if (this.list_limiting_loading) {
        var obj = getObjects(this.list_external_station, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getLimitingLoading_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_limiting_loading) {
        var obj = getObjects(this.list_limiting_loading, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_LimitingLoading_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getLimitingLoading_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_LimitingLoading_Of_Code = function (id, name, lang) {
    var obj = this.getLimitingLoading_Of_Code(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_LimitingLoading_Of_Code = function (id, name) {
    var obj = this.getLimitingLoading_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListLimitingLoading = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_limiting_loading) {
        if (typeof filter === 'function') {
            list_filtr = this.list_limiting_loading.filter(filter);
        } else { list_filtr = this.list_limiting_loading; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_condition_arrival  (Справочник годность по прибытию) ======================================
IDS_DIRECTORY.prototype.getConditionArrival_Of_Code = function (id) {
    if (this.list_condition_arrival) {
        var obj = getObjects(this.list_condition_arrival, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_ConditionArrival_Of_Code = function (id, name, lang) {
    var obj = this.getConditionArrival_Of_Code(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_ConditionArrival_Of_Code = function (id, name) {
    var obj = this.getConditionArrival_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListConditionArrival = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_condition_arrival) {
        if (typeof filter === 'function') {
            list_filtr = this.list_condition_arrival.filter(filter);
        } else { list_filtr = this.list_condition_arrival; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};