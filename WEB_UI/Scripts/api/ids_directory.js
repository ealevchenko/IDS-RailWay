
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

IDS_DIRECTORY.prototype.load = function (list, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'genus_wagon') {
            IDS_DIRECTORY.prototype.getGenusWagons(function (result_genus_wagon) {
                obj.list_genus_wagon = result_genus_wagon;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
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
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
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
