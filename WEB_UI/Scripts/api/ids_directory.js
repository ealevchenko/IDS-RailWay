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

IDS_DIRECTORY.list_external_network_station = [];

IDS_DIRECTORY.list_consignee = [];

IDS_DIRECTORY.list_shipper = [];

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
        if (el === 'external_network_station') {
            IDS_DIRECTORY.prototype.getExternalNetworkStation(function (result_external_network_station) {
                obj.list_external_network_station = result_external_network_station;
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
            IDS_DIRECTORY.prototype.LoadShipper(function () {
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

IDS_DIRECTORY.prototype.LoadShipper = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.GetShipper(function (result_shipper) {
        obj.list_shipper = result_shipper;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
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
//======= Directory_ExternalNetworkStation (Справочник внешних ситей и станций) ======================================
IDS_DIRECTORY.prototype.getExternalNetworkStation = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/external_network_station/all',
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
            OnAJAXError("IDS_DIRECTORY.getExternalNetworkStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по коду
IDS_DIRECTORY.prototype.getExternalNetworkStationOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/external_network_station/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getExternalNetworkStationOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putExternalNetworkStation = function (external_network_station, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/external_network_station/code/' + external_network_station.code,
        data: JSON.stringify(external_network_station),
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
            OnAJAXError("IDS_DIRECTORY.putExternalNetworkStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteExternalNetworkStation = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/external_network_station/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteExternalNetworkStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postExternalNetworkStation = function (external_network_station, callback) {
    $.ajax({
        url: '../../api/ids/directory/external_network_station/',
        type: 'POST',
        data: JSON.stringify(external_network_station),
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
            OnAJAXError("IDS_DIRECTORY.postExternalNetworkStation", x, y, z);
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
IDS_DIRECTORY.prototype.GetShipper = function (callback) {
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
IDS_DIRECTORY.prototype.GetShipperOfCode = function (code, callback) {
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
        var obj = getObjects(this.list_genus_wagon, 'id', id_genus_wagon)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_GenusWagons_Of_ID = function (id_state, name, lang) {
    var obj = this.getGenusWagons_Internal_Of_ID(id_state);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_GenusWagons_Of_ID = function (id_state, name) {
    var obj = this.getGenusWagons_Internal_Of_ID(id_state);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListGenusWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_genus_wagon) {
        for (i = 0, j = this.list_genus_wagon.length; i < j; i++) {
            var l = this.list_genus_wagon[i];
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
        var obj = getObjects(this.list_owners_wagons, 'id', id_owner_wagon)
        return obj && obj.length > 0 ? obj[0] : null;
    }
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
IDS_DIRECTORY.prototype.getListOwnersWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_owners_wagons) {
        for (i = 0, j = this.list_owners_wagons.length; i < j; i++) {
            var l = this.list_owners_wagons[i];
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
//*======= IDS_DIRECTORY.external_network_station  (Справочник внешних сетей) ======================================

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