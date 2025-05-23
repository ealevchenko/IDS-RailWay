﻿// Подключите common.js
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

IDS_DIRECTORY.list_locomotive = [];

IDS_DIRECTORY.list_station = [];

IDS_DIRECTORY.list_ways = [];

IDS_DIRECTORY.list_outer_ways = [];

IDS_DIRECTORY.list_consignee = [];

IDS_DIRECTORY.list_shipper = [];

IDS_DIRECTORY.list_border_checkpoint = [];

IDS_DIRECTORY.list_countrys = [];

IDS_DIRECTORY.list_railway = [];

IDS_DIRECTORY.list_inlandrailway = [];

IDS_DIRECTORY.list_external_station = [];

IDS_DIRECTORY.list_limiting_loading = [];

IDS_DIRECTORY.list_condition_arrival = [];

IDS_DIRECTORY.list_payer_arrival = [];

IDS_DIRECTORY.list_payer_sender = [];

IDS_DIRECTORY.list_cargo_group = [];

IDS_DIRECTORY.list_cargo_etsng = [];

IDS_DIRECTORY.list_cargo_gng = [];

IDS_DIRECTORY.list_cargo = [];

IDS_DIRECTORY.list_certification_data = [];

IDS_DIRECTORY.list_commercial_condition = [];

IDS_DIRECTORY.list_hazard_class = [];

IDS_DIRECTORY.list_cars = []; // Удалить

IDS_DIRECTORY.list_wagon = [];

IDS_DIRECTORY.list_wagon_rent = [];

IDS_DIRECTORY.list_type_division = [];

IDS_DIRECTORY.list_divisions = [];

IDS_DIRECTORY.list_reason_discrepancy = [];

IDS_DIRECTORY.list_detention_return = [];

/* ----------------------------------------------------------
ЗАГРУЗКА СПРАВОЧНИКОВ
-------------------------------------------------------------*/
// Загрузка списка справочников
IDS_DIRECTORY.prototype.load = function (list, lockOff, callback) {
    var count = list.length;
    if (count === 0) {
        if (typeof callback === 'function') {
            if (lockOff) { LockScreenOff(); }
            callback();
        }
    }
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
        if (el === 'locomotive') {
            IDS_DIRECTORY.prototype.getLocomotive(function (result_locomotive) {
                obj.list_locomotive = result_locomotive;
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
        if (el === 'ways') {
            IDS_DIRECTORY.prototype.getWays(function (result_ways) {
                obj.list_ways = result_ways;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'outer_ways') {
            IDS_DIRECTORY.prototype.getOuterWays(function (result_outer_ways) {
                obj.list_outer_ways = result_outer_ways;
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
        if (el === 'payer_sender') {
            IDS_DIRECTORY.prototype.getPayerSender(function (result_payer_sender) {
                obj.list_payer_sender = result_payer_sender;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'payer_arrival') {
            IDS_DIRECTORY.prototype.getPayerArrival(function (result_payer_arrival) {
                obj.list_payer_arrival = result_payer_arrival;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'cargo_group') {
            IDS_DIRECTORY.prototype.getCargoGroup(function (result_cargo_group) {
                obj.list_cargo_group = result_cargo_group;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'cargo_etsng') {
            IDS_DIRECTORY.prototype.getCargoETSNG(function (result_cargo_etsng) {
                obj.list_cargo_etsng = result_cargo_etsng;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'cargo_gng') {
            IDS_DIRECTORY.prototype.getCargoGNG(function (result_cargo_gng) {
                obj.list_cargo_gng = result_cargo_gng;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'cargo') {
            IDS_DIRECTORY.prototype.getCargo(function (result_cargo) {
                obj.list_cargo = result_cargo;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'certification_data') {
            IDS_DIRECTORY.prototype.getCertificationData(function (result_certification_data) {
                obj.list_certification_data = result_certification_data;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'commercial_condition') {
            IDS_DIRECTORY.prototype.getCommercialCondition(function (result_commercial_condition) {
                obj.list_commercial_condition = result_commercial_condition;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'hazard_class') {
            IDS_DIRECTORY.prototype.getHazardClass(function (result_hazard_class) {
                obj.list_hazard_class = result_hazard_class;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        //if (el === 'cars') {
        //    IDS_DIRECTORY.prototype.getCars(function (result_cars) {
        //        obj.list_cars = result_cars;
        //        count -= 1;
        //        if (count === 0) {
        //            if (typeof callback === 'function') {
        //                if (lockOff) { LockScreenOff(); }
        //                callback();
        //            }
        //        }
        //    });
        //};
        if (el === 'wagon') {
            IDS_DIRECTORY.prototype.getWagon(function (result_wagon) {
                obj.list_wagon = result_wagon;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'wagon_rent') {
            IDS_DIRECTORY.prototype.getWagonsRent(function (result_wagon_rent) {
                obj.list_wagon_rent = result_wagon_rent;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'type_division') {
            IDS_DIRECTORY.prototype.getTypeDivision(function (result_type_division) {
                obj.list_type_division = result_type_division;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'divisions') {
            IDS_DIRECTORY.prototype.getDivisions(function (result_divisions) {
                obj.list_divisions = result_divisions;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'reason_discrepancy') {
            IDS_DIRECTORY.prototype.getReason_Discrepancy(function (reason_discrepancy) {
                obj.list_reason_discrepancy = reason_discrepancy;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'detention_return') {
            IDS_DIRECTORY.prototype.getDetention_Return(function (detention_return) {
                obj.list_detention_return = detention_return;
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
//// Загрузка справочника вагонов
//IDS_DIRECTORY.prototype.loadCars = function (callback) {
//    var obj = this;
//    IDS_DIRECTORY.prototype.getCars(function (result_cars) {
//        obj.list_cars = result_cars;
//        if (typeof callback === 'function') {
//            callback();
//        }
//    });
//};
// Загрузка справочника вагонов новый
IDS_DIRECTORY.prototype.loadWagon = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getWagon(function (result_cars) {
        obj.list_wagon = result_cars;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника аренд вагонов новый
IDS_DIRECTORY.prototype.loadWagonRent = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getWagonsRent(function (result_cars) {
        obj.list_wagon_rent = result_cars;
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
// Загрузка справочника платильщик по отправке
IDS_DIRECTORY.prototype.loadPayerSender = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getPayerSender(function (result_payer_sender) {
        obj.list_payer_sender = result_payer_sender;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника платильщик по прибытию
IDS_DIRECTORY.prototype.loadPayerArrival = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getPayerArrival(function (result_payer_arrival) {
        obj.list_payer_arrival = result_payer_arrival;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника группа грузов
IDS_DIRECTORY.prototype.loadCargoGroup = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCargoGroup(function (result_cargo_group) {
        obj.list_cargo_group = result_cargo_group;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника грузов ЕТСНГ
IDS_DIRECTORY.prototype.loadCargoETSNG = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCargoETSNG(function (result_cargo_etsng) {
        obj.list_cargo_etsng = result_cargo_etsng;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника грузов ГНГ
IDS_DIRECTORY.prototype.loadCargoGNG = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCargoGNG(function (result_cargo_gng) {
        obj.list_cargo_gng = result_cargo_gng;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника грузов
IDS_DIRECTORY.prototype.loadCargo = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCargo(function (result_cargo) {
        obj.list_cargo = result_cargo;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника сертификационных данных
IDS_DIRECTORY.prototype.loadCertificationData = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCertificationData(function (result_certification_data) {
        obj.list_certification_data = result_certification_data;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника комерчиское состояние 
IDS_DIRECTORY.prototype.loadCommercialCondition = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getCommercialCondition(function (result_commercial_condition) {
        obj.list_commercial_condition = result_commercial_condition;
        if (typeof callback === 'function') {
            callback();
        }
    });
};
// Загрузка справочника комерчиское состояние 
IDS_DIRECTORY.prototype.loadHazardClass = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getHazardClass(function (result_hazard_class) {
        obj.list_hazard_class = result_hazard_class;
        if (typeof callback === 'function') {
            callback();
        }
    });
};

// Загрузка справочника причина расхождений
IDS_DIRECTORY.prototype.loadReason_Discrepancy = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getReason_Discrepancy(function (result_reason_discrepancy) {
        obj.list_reason_discrepancy = result_reason_discrepancy;
        if (typeof callback === 'function') {
            callback();
        }
    });
};

// Загрузка справочника причина задержаний и возвратов
IDS_DIRECTORY.prototype.loadDetention_Return = function (callback) {
    var obj = this;
    IDS_DIRECTORY.prototype.getDetention_Return(function (result_detention_return) {
        obj.list_detention_return = result_detention_return;
        if (typeof callback === 'function') {
            callback();
        }
    });
};

/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= Directory_Wagons (Справочник вагонов) ======================================
IDS_DIRECTORY.prototype.getWagon = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по номеру вагона
IDS_DIRECTORY.prototype.IsCorrectNumCar = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagon/is_correct/num/' + num,
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
            OnAJAXError("IDS_DIRECTORY.IsCorrectNumCar", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по номеру вагона
IDS_DIRECTORY.prototype.getWagonOfNum = function (num, callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWagonOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

IDS_DIRECTORY.prototype.getWagonOfNums = function (list_nums, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon/list_nums/',
        type: 'POST',
        data: JSON.stringify(list_nums),
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
            OnAJAXError("IDS_DIRECTORY.getWagonOfNums", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

IDS_DIRECTORY.prototype.getWagonOfOperator = function (id_operator, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagon/operator/id/' + id_operator,
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
            OnAJAXError("IDS_DIRECTORY.getWagonOfOperator", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

IDS_DIRECTORY.prototype.getWarningWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagon/warning',
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
            OnAJAXError("IDS_DIRECTORY.getWarningWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// --------- View -------------------------------------------------
// Показать вагоны с признаком проверки
IDS_DIRECTORY.prototype.getViewWarningWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagon/view/warning',
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
            OnAJAXError("IDS_DIRECTORY.getViewWarningWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Показать вагоны согласно списка
IDS_DIRECTORY.prototype.getViewWagonOfNums = function (list_nums, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon/view/list_nums/',
        type: 'POST',
        data: JSON.stringify(list_nums),
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
            OnAJAXError("IDS_DIRECTORY.getViewWagonOfNums", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Показать вагоны по оператору
IDS_DIRECTORY.prototype.getViewWagonOfOperator = function (id_operator, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/wagon/view/operator/id/' + id_operator,
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
            OnAJAXError("IDS_DIRECTORY.getViewWagonOfOperator", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//---------- Update
//Обновим оператора или ограничения по группе вагонов
IDS_DIRECTORY.prototype.postOperationUpdateWagons = function (operation_wagons, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon/operation/update/',
        type: 'POST',
        data: JSON.stringify(operation_wagons),
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
            OnAJAXError("IDS_DIRECTORY.postOperationUpdateWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновим строки справочника вагонов
IDS_DIRECTORY.prototype.postOperationUpdateWagon = function (operation_wagon, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon/operation/update/wagon/',
        type: 'POST',
        data: JSON.stringify(operation_wagon),
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
            OnAJAXError("IDS_DIRECTORY.postOperationUpdateWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//TODO: Убрать старая
IDS_DIRECTORY.prototype.getWagonOfNumSpecification = function (num, specification, callback) {
    $.ajax({
        type: 'POST',
        url: '../../api/ids/directory/wagon/num/' + num + '/specification/',
        data: JSON.stringify(specification),
        contentType: "application/json;charset=utf-8",
        async: true,
        //dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("IDS_DIRECTORY.getWagonOfNumSpecification", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагон
IDS_DIRECTORY.prototype.postWagon = function (wagon, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon/',
        type: 'POST',
        data: JSON.stringify(wagon),
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
            OnAJAXError("IDS_DIRECTORY.postWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагон
IDS_DIRECTORY.prototype.putWagon = function (wagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/wagon/num/' + wagon.num,
        data: JSON.stringify(wagon),
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
            OnAJAXError("IDS_DIRECTORY.putWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагоны
IDS_DIRECTORY.prototype.putListWagon = function (list_wagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/wagon/list/',
        data: JSON.stringify(list_wagon),
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
            OnAJAXError("IDS_DIRECTORY.putListWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Изменить номер вагона
IDS_DIRECTORY.prototype.postOperationChangeNumWagon = function (operation, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon/operation/change_num_wagon/',
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
            OnAJAXError("IDS_DIRECTORY.postOperationChangeNumWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//======= Directory_WagonsRent (Справочник аренд вагонов) ======================================
IDS_DIRECTORY.prototype.getWagonsRent = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWagonsRent", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить аренды по номеру вагона
IDS_DIRECTORY.prototype.getWagonsRentOfNum = function (num, callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWagonsRentOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить аренды по номеру вагона (полная выбрка)
IDS_DIRECTORY.prototype.getViewWagonsRentOfNum = function (num, callback) {
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
            OnAJAXError("IDS_DIRECTORY.getViewWagonsRentOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить список текуших аренд по номеру вагона
IDS_DIRECTORY.prototype.getCurrentWagonsRentOfNums = function (list_nums, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon_rent/current/list_nums/',
        type: 'POST',
        data: JSON.stringify(list_nums),
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
            OnAJAXError("IDS_DIRECTORY.getCurrentWagonsRentOfNums", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Добавить аренду вагона
IDS_DIRECTORY.prototype.postWagonsRent = function (wagon_rent, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon_rent/',
        type: 'POST',
        data: JSON.stringify(wagon_rent),
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
            OnAJAXError("IDS_DIRECTORY.postWagonsRent", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить аренды вагонов
IDS_DIRECTORY.prototype.postListWagonsRent = function (list_rent, callback) {
    $.ajax({
        url: '../../api/ids/directory/wagon_rent/list/',
        type: 'POST',
        data: JSON.stringify(list_rent),
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
            OnAJAXError("IDS_DIRECTORY.postListWagonsRent", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить аренду вагон
IDS_DIRECTORY.prototype.putWagonsRent = function (wagon_rent, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/wagon_rent/id/' + wagon_rent.id,
        data: JSON.stringify(wagon_rent),
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
            OnAJAXError("IDS_DIRECTORY.putWagonsRent", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить аренду вагонов
IDS_DIRECTORY.prototype.putListWagonsRent = function (list_rent, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/wagon_rent/list/',
        data: JSON.stringify(list_rent),
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
            OnAJAXError("IDS_DIRECTORY.putListWagonsRent", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_HazardClass (Справочник класов опасности) ======================================
//
IDS_DIRECTORY.prototype.getHazardClass = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getHazardClass", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по code
IDS_DIRECTORY.prototype.getHazardClassOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/hazard_class/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getHazardClassOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putHazardClass = function (hazard, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/hazard_class/id/' + hazard.id,
        data: JSON.stringify(hazard),
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
            OnAJAXError("IDS_DIRECTORY.putHazardClass", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteHazardClass = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/hazard_class/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteHazardClass", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postHazardClass = function (hazard, callback) {
    $.ajax({
        url: '../../api/ids/directory/hazard_class/',
        type: 'POST',
        data: JSON.stringify(hazard),
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
            OnAJAXError("IDS_DIRECTORY.postHazardClass", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_CertificationData (Справочник сертификационых данных) ======================================
//
IDS_DIRECTORY.prototype.getCertificationData = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCertificationData", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getCertificationDataOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/certification_data/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getCertificationDataOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCertificationData = function (certification, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/certification_data/id/' + certification.id,
        data: JSON.stringify(certification),
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
            OnAJAXError("IDS_DIRECTORY.putCertificationData", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCertificationData = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/certification_data/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCertificationData", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCertificationData = function (certification, callback) {
    $.ajax({
        url: '../../api/ids/directory/certification_data/',
        type: 'POST',
        data: JSON.stringify(certification),
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
            OnAJAXError("IDS_DIRECTORY.postCertificationData", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_CommercialCondition (Справочник комерчиского состояния) ======================================
//
IDS_DIRECTORY.prototype.getCommercialCondition = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCommercialCondition", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getCommercialConditionOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/commercial_condition/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getCommercialConditionOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCommercialCondition = function (condition, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/commercial_condition/id/' + condition.id,
        data: JSON.stringify(condition),
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
            OnAJAXError("IDS_DIRECTORY.putCommercialCondition", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCommercialCondition = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/commercial_condition/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCommercialCondition", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCommercialCondition = function (condition, callback) {
    $.ajax({
        url: '../../api/ids/directory/commercial_condition/',
        type: 'POST',
        data: JSON.stringify(condition),
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
            OnAJAXError("IDS_DIRECTORY.postCommercialCondition", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Cargo (Справочник грузов) ======================================
//
IDS_DIRECTORY.prototype.getCargo = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCargo", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getCargoOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cargo/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getCargoOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCargo = function (cargo, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/cargo/id/' + cargo.id,
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.putCargo", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

IDS_DIRECTORY.prototype.putListCargo = function (list_cargo, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/cargo/list/',
        data: JSON.stringify(list_cargo),
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
            OnAJAXError("IDS_DIRECTORY.putListCargo", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCargo = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCargo", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCargo = function (cargo, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo/',
        type: 'POST',
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.postCargo", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_CargoGNG (Справочник грузов ГНГ) ======================================
//
IDS_DIRECTORY.prototype.getCargoGNG = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCargoGNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getCargoGNGOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cargo_gng/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getCargoGNGOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по code
IDS_DIRECTORY.prototype.getCargoGNGOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cargo_gng/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getCargoGNGOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCargoGNG = function (cargo, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/cargo_gng/id/' + cargo.id,
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.putCargoGNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCargoGNG = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo_gng/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCargoGNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCargoGNG = function (cargo, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo_gng/',
        type: 'POST',
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.postCargoGNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_CargoETSNG (Справочник грузов ЕТСНГ) ======================================
//
IDS_DIRECTORY.prototype.getCargoETSNG = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCargoETSNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getCargoETSNGOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cargo_etsng/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getCargoETSNGOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по code
IDS_DIRECTORY.prototype.getCargoETSNGOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cargo_etsng/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getCargoETSNGOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCargoETSNG = function (cargo, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/cargo_etsng/id/' + cargo.id,
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.putCargoETSNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCargoETSNG = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo_etsng/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCargoETSNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCargoETSNG = function (cargo, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo_etsng/',
        type: 'POST',
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.postCargoETSNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_CargoGroup (Справочник группа грузов) ======================================
//
IDS_DIRECTORY.prototype.getCargoGroup = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getCargoGroup", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getCargoGroupOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/cargo_group/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getCargoGroupOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putCargoGroup = function (cargo, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/cargo_group/id/' + cargo.id,
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.putCargoGroup", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteCargoGroup = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo_group/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteCargoGroup", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postCargoGroup = function (cargo, callback) {
    $.ajax({
        url: '../../api/ids/directory/cargo_group/',
        type: 'POST',
        data: JSON.stringify(cargo),
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
            OnAJAXError("IDS_DIRECTORY.postCargoGroup", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_PayerSender (Справочник платильщиков по отправке) ======================================
//
IDS_DIRECTORY.prototype.getPayerSender = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getPayerSender", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getPayerSenderOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/payer_sender/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getPayerSenderOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putPayerSender = function (payer, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/payer_sender/code/' + payer.code,
        data: JSON.stringify(payer),
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
            OnAJAXError("IDS_DIRECTORY.putPayerSender", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deletePayerSender = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/payer_sender/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deletePayerSender", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postPayerSender = function (payer, callback) {
    $.ajax({
        url: '../../api/ids/directory/payer_sender/',
        type: 'POST',
        data: JSON.stringify(payer),
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
            OnAJAXError("IDS_DIRECTORY.postPayerSender", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_PayerArrival (Справочник платильщиков по прибытию) ======================================
//
IDS_DIRECTORY.prototype.getPayerArrival = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/payer_arrival/all',
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
            OnAJAXError("IDS_DIRECTORY.getPayerArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по id
IDS_DIRECTORY.prototype.getPayerArrivalOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/payer_arrival/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getPayerArrivalOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putPayerArrival = function (payer, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/payer_arrival/code/' + payer.code,
        data: JSON.stringify(payer),
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
            OnAJAXError("IDS_DIRECTORY.putPayerArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deletePayerArrival = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/payer_arrival/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deletePayerArrival", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postPayerArrival = function (payer, callback) {
    $.ajax({
        url: '../../api/ids/directory/payer_arrival/',
        type: 'POST',
        data: JSON.stringify(payer),
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
            OnAJAXError("IDS_DIRECTORY.postPayerArrival", x, y, z);
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
        url: '../../api/ids/directory/condition_arrival/id/' + id,
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
IDS_DIRECTORY.prototype.putConditionArrival = function (condition, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/condition_arrival/id/' + condition.id,
        data: JSON.stringify(condition),
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
IDS_DIRECTORY.prototype.postConditionArrival = function (condition, callback) {
    $.ajax({
        url: '../../api/ids/directory/condition_arrival/',
        type: 'POST',
        data: JSON.stringify(condition),
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
        url: '../../api/ids/directory/limiting_loading/id/' + id,
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
IDS_DIRECTORY.prototype.putLimitingLoading = function (limiting, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/limiting_loading/id/' + limiting.id,
        data: JSON.stringify(limiting),
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
IDS_DIRECTORY.prototype.postLimitingLoading = function (limiting, callback) {
    $.ajax({
        url: '../../api/ids/directory/limiting_loading/',
        type: 'POST',
        data: JSON.stringify(limiting),
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
        url: '../../api/ids/directory/countrys/id/' + id,
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
// Получить по коду
IDS_DIRECTORY.prototype.getRailwayOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/railway/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getRailwayOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putRailway = function (rw, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/railway/code/' + rw.code,
        data: JSON.stringify(rw),
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
            OnAJAXError("IDS_DIRECTORY.putRailway", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteRailway = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/railway/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteRailway", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postRailway = function (rw, callback) {
    $.ajax({
        url: '../../api/ids/directory/railway/',
        type: 'POST',
        data: JSON.stringify(rw),
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
            OnAJAXError("IDS_DIRECTORY.postRailway", x, y, z);
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
// Получить по коду
IDS_DIRECTORY.prototype.getInlandRailwayOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/inlandrailway/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.getInlandRailwayOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putInlandRailway = function (ir, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/inlandrailway/code/' + ir.code,
        data: JSON.stringify(ir),
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
            OnAJAXError("IDS_DIRECTORY.putInlandRailway", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteInlandRailway = function (code, callback) {
    $.ajax({
        url: '../../api/ids/directory/inlandrailway/code/' + code,
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
            OnAJAXError("IDS_DIRECTORY.deleteInlandRailway", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postInlandRailway = function (ir, callback) {
    $.ajax({
        url: '../../api/ids/directory/inlandrailway/',
        type: 'POST',
        data: JSON.stringify(ir),
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
            OnAJAXError("IDS_DIRECTORY.postInlandRailway", x, y, z);
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
IDS_DIRECTORY.prototype.putExternalStation = function (station, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/external_station/code/' + station.code,
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
IDS_DIRECTORY.prototype.postExternalStation = function (station, callback) {
    $.ajax({
        url: '../../api/ids/directory/external_station/',
        type: 'POST',
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
//======= Directory_Locomotive (Справочник локомотивов ИДС) ======================================
IDS_DIRECTORY.prototype.getLocomotive = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getLocomotive", x, y, z);
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
        url: '../../api/ids/directory/station/all_old',
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
//======= Directory_Ways (Справочник путей ИДС) ======================================
//
IDS_DIRECTORY.prototype.getWays = function (callback) {
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
        },
        error: function (x, y, z) {
            OnAJAXError("IDS_DIRECTORY.getWays", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить пути по указаной станции и парку
IDS_DIRECTORY.prototype.getWaysOfStationIDParkID = function (id_station, id_park, callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWaysOfStationIDParkID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить путь по id
IDS_DIRECTORY.prototype.getWaysOfWayID = function (id_way, callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWaysOfWayID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить пути роспуска
IDS_DIRECTORY.prototype.getWaysOfDissolution = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getWaysOfDissolution", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция автокоррекции
IDS_DIRECTORY.prototype.postOperationAutoPositionWayOfPark = function (operation, callback) {
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
            OnAJAXError("IDS_RWT.postOperationAutoPositionWayOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция свига на одни позицию вниз
IDS_DIRECTORY.prototype.postOperationDown1PositionWayOfPark = function (operation, callback) {
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
            OnAJAXError("IDS_RWT.postOperationDown1PositionWayOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция свига на одни позицию вверх
IDS_DIRECTORY.prototype.postOperationUp1PositionWayOfPark = function (operation, callback) {
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
            OnAJAXError("IDS_RWT.postOperationUp1PositionWayOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция "Добавить путь"
IDS_DIRECTORY.prototype.postOperationInsertWayOfPark = function (way, callback) {
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
            OnAJAXError("IDS_RWT.postOperationInsertWayOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция "Удалить путь"
IDS_DIRECTORY.prototype.postOperationDeleteWayOfPark = function (operation, callback) {
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
            OnAJAXError("IDS_RWT.postOperationDeleteWayOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция "Обновить путь"
IDS_DIRECTORY.prototype.postOperationUpdateWayOfPark = function (operation, callback) {
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
            OnAJAXError("IDS_RWT.postOperationUpdateWayOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_ParkWay (Справочник путей ИДС) ======================================
// Получить все парки
IDS_DIRECTORY.prototype.getParkWays = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getParkWays", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить парки по указаной станции
IDS_DIRECTORY.prototype.getParkWaysOfStationID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/park_ways/view/station/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getParkWaysOfStationID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//======= Directory_OuterWays (Справочник внешних путей ИДС) ======================================
// Получить все пути
IDS_DIRECTORY.prototype.getOuterWays = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getOuterWays", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить путь по id
IDS_DIRECTORY.prototype.getOuterWaysOfID = function (id_way, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/outer_ways/id/' + id_way,
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
            OnAJAXError("IDS_DIRECTORY.getOuterWaysOfID", x, y, z);
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
        url: '../../api/ids/directory/shipper/code/' + code,
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
IDS_DIRECTORY.prototype.putBorderCheckpoint = function (station, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/border_checkpoint/code/' + station.code,
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
IDS_DIRECTORY.prototype.postBorderCheckpoint = function (station, callback) {
    $.ajax({
        url: '../../api/ids/directory/border_checkpoint/',
        type: 'POST',
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
            LockScreenOff();
            OnAJAXError("IDS_DIRECTORY.postBorderCheckpoint", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_TypeDivision (Справочник типов цехов) ======================================
IDS_DIRECTORY.prototype.getTypeDivision = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/type_division/all',
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
            OnAJAXError("IDS_DIRECTORY.GetTypeDivision", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по коду
IDS_DIRECTORY.prototype.getTypeDivisionOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/directory/type_division/id/' + id,
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
            OnAJAXError("IDS_DIRECTORY.getTypeDivisionOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putTypeDivision = function (type_division, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/type_division/id' + type_division.id,
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
            OnAJAXError("IDS_DIRECTORY.putTypeDivision", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteTypeDivision = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/type_division/id' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteTypeDivision", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postTypeDivision = function (type_division, callback) {
    $.ajax({
        url: '../../api/ids/directory/type_division/',
        type: 'POST',
        data: JSON.stringify(type_division),
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
            OnAJAXError("IDS_DIRECTORY.postTypeDivision", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Divisions (Справочник цехов) ======================================
IDS_DIRECTORY.prototype.getDivisions = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.GetDivisions", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить по коду
IDS_DIRECTORY.prototype.getDivisionsOfID = function (id, callback) {
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
            OnAJAXError("IDS_DIRECTORY.getDivisionsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_DIRECTORY.prototype.putDivisions = function (division, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/directory/division/id' + division.id,
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
            OnAJAXError("IDS_DIRECTORY.putDivisions", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_DIRECTORY.prototype.deleteDivisions = function (id, callback) {
    $.ajax({
        url: '../../api/ids/directory/division/id' + id,
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
            OnAJAXError("IDS_DIRECTORY.deleteDivisions", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_DIRECTORY.prototype.postDivisions = function (division, callback) {
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
            OnAJAXError("IDS_DIRECTORY.postDivisions", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Reason_Discrepancy (Справочник причин расхождения) ======================================
IDS_DIRECTORY.prototype.getReason_Discrepancy = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getReason_Discrepancy", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//======= Directory_DetentionReturn (Справочник причин возвратов и задержаний) ======================================
IDS_DIRECTORY.prototype.getDetention_Return = function (callback) {
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
            OnAJAXError("IDS_DIRECTORY.getDetention_Return", x, y, z);
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
// Вернуть спсисок объектов таблицы в формате {value:, text:}
IDS_DIRECTORY.prototype.getListObj = function (list_obj, fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (list_obj) {
        if (typeof filter === 'function') {
            list_filtr = list_obj.filter(filter);
        } else { list_filtr = list_obj; }
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
// Вернуть спсисок объектов таблицы в формате {value:, text:}
IDS_DIRECTORY.prototype.getListObj2 = function (list_obj, fvalue, ftext1, ftext2, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (list_obj) {
        if (typeof filter === 'function') {
            list_filtr = list_obj.filter(filter);
        } else { list_filtr = list_obj; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
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
IDS_DIRECTORY.prototype.getObj_Of_ID = function (list_obj, id) {
    var obj = null;
    if (list_obj && list_obj.length > 0) {
        obj = list_obj.find(function (o) { return o.id === id });
    }
    return obj;
};
//  Вернуть объекты в указаным поле которых есть текст text
IDS_DIRECTORY.prototype.getObjs_Of_text = function (list_obj, text, ftext, lang) {
    var objs = null;
    var field = lang ? ftext + '_' + lang : ftext;
    if (list_obj && list_obj.length > 0) {
        objs = list_obj.filter(function (i) {
            return $.trim(i[field]) === $.trim(text) ? true : false;
        });
    }
    return objs;
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
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getGenusWagons_Of_CultureName = function (name, lang, text) {
    if (this.list_genus_wagon) {
        var obj = getObjects(this.list_genus_wagon, name + '_' + lang, text);
        return obj
    }
    return null;
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
IDS_DIRECTORY.prototype.getListTypeWagons = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_type_wagons) {
        if (typeof filter === 'function') {
            list_filtr = this.list_type_wagons.filter(filter);
        } else { list_filtr = this.list_type_wagons; }

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
        var obj = getObjects(this.list_operators_wagons, (lang ? ftext + '_' + lang : ftext), text);
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
//*======= IDS_DIRECTORY.list_locomotive  (Справочник локомотивов) ======================================
IDS_DIRECTORY.prototype.getLocomotive_Internal_Of_Locomotive = function (locomotive) {
    if (this.list_locomotive) {
        var obj = getObjects(this.list_locomotive, 'locomotive', locomotive)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Locomotive_Of_Locomotive = function (locomotive, name, lang) {
    var obj = this.getLocomotive_Internal_Of_Locomotive(locomotive);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Locomotive_Of_Locomotive = function (locomotive, name) {
    var obj = this.getLocomotive_Internal_Of_Locomotive(locomotive);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListLocomotive = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_locomotive) {
        if (typeof filter === 'function') {
            list_filtr = this.list_locomotive.filter(filter);
        } else { list_filtr = this.list_locomotive; }
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


//*======= IDS_DIRECTORY.list_station  (Справочник станций) ======================================
IDS_DIRECTORY.prototype.getStation_Of_ID = function (id) {
    //var station = null;
    //if (this.list_station) {
    //    //var obj = getObjects(this.list_station, 'id', id_station)
    //    //return obj && obj.length > 0 ? obj[0] : null;
    //    station = this.list_station.find(function (o) { return o.id === id });
    //}
    //return station;
    return this.getObj_Of_ID(this.list_station, id);
};
//
IDS_DIRECTORY.prototype.getValue_Station_Of_ID = function (id_station, name, lang) {
    var obj = this.getStation_Of_ID(id_station);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Stations_Of_ID = function (id_station, name) {
    var obj = this.getStation_Of_ID(id_station);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListStation = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_station, fvalue, ftext, lang, filter);
};
//*======= IDS_DIRECTORY.list_ways  (Справочник путей) ======================================
IDS_DIRECTORY.prototype.getWays_Of_ID = function (id) {
    return this.getObj_Of_ID(this.list_ways, id);
};
//
IDS_DIRECTORY.prototype.getValue_Ways_Of_ID = function (id_way, name, lang) {
    var obj = this.getWays_Of_ID(id_way);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Wayss_Of_ID = function (id_way, name) {
    var obj = this.getWays_Of_ID(id_way);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListWays = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_ways, fvalue, ftext, lang, filter);
};
//
IDS_DIRECTORY.prototype.getListWays2 = function (fvalue, ftext1, ftext2, lang, filter) {
    return this.getListObj2(this.list_ways, fvalue, ftext1, ftext2, lang, filter);
};
//
IDS_DIRECTORY.prototype.getListWaysOfAray = function (aray, fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (aray) {
        if (typeof filter === 'function') {
            list_filtr = aray.filter(filter);
        } else { list_filtr = aray; }
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

IDS_DIRECTORY.prototype.getListWays2TextOfAray = function (aray, fvalue, ftext1, ftext2, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (aray) {
        if (typeof filter === 'function') {
            list_filtr = aray.filter(filter);
        } else { list_filtr = aray; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
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

//*======= IDS_DIRECTORY.list_consignee  (Справочник грузополучателей) ======================================
IDS_DIRECTORY.prototype.getConsignee_Of_Code = function (code) {
    if (this.list_consignee) {
        var obj = getObjects(this.list_consignee, 'code', code)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_Consignee_Of_Code = function (code, name, lang) {
    var obj = this.getConsignee_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Consignee_Of_Code = function (code, name) {
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
IDS_DIRECTORY.prototype.getValue_Shipper_Of_Code = function (code, name, lang) {
    var obj = this.getShipper_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Shipper_Of_Code = function (code, name) {
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
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getShipper_Of_CultureName = function (name, lang, text) {
    if (this.list_shipper) {
        var obj = getObjects(this.list_shipper, name + '_' + lang, text);
        return obj
    }
    return null;
};
//*======= IDS_DIRECTORY.list_border_checkpoint  (Справочник пограничных пунктов) ======================================
IDS_DIRECTORY.prototype.getBorderCheckpoint_Of_Code = function (code) {
    if (this.list_border_checkpoint) {
        var obj = getObjects(this.list_border_checkpoint, 'code', code)
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_BorderCheckpoint_Of_Code = function (code, name, lang) {
    var obj = this.getBorderCheckpoint_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_BorderCheckpoint_Of_Code = function (code, name) {
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
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getBorderCheckpoint_Of_CultureName = function (name, lang, text) {
    if (this.list_border_checkpoint) {
        var obj = getObjects(this.list_border_checkpoint, name + '_' + lang, text);
        return obj
    }
    return null;
};

//*======= IDS_DIRECTORY.list_countrys  (Справочник стран) ======================================
IDS_DIRECTORY.prototype.getCountrys_Of_ID = function (id) {
    return this.getObj_Of_ID(this.list_countrys, id);
};
IDS_DIRECTORY.prototype.getCountrys_Of_CodeSNG = function (code_sng) {
    var obj = null;
    if (this.list_countrys && this.list_countrys.length > 0) {
        obj = this.list_countrys.find(function (o) { return o.code_sng === code_sng });
    }
    return obj;
};
IDS_DIRECTORY.prototype.getCountrys_Of_CodeEUROPE = function (code_europe) {
    var obj = null;
    if (this.list_countrys && this.list_countrys.length > 0) {
        obj = this.list_countrys.find(function (o) { return o.code_europe === code_europe });
    }
    return obj;
};
IDS_DIRECTORY.prototype.getCountrys_Of_CodeISO = function (code_iso) {
    var obj = null;
    if (this.list_countrys && this.list_countrys.length > 0) {
        obj = this.list_countrys.find(function (o) { return o.code_iso === code_iso });
    }
    return obj;
};
//
IDS_DIRECTORY.prototype.getValue_Countrys_Of_ID = function (id, name, lang) {
    var obj = this.getCountrys_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Countrys_Of_ID = function (id, name) {
    var obj = this.getCountrys_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
IDS_DIRECTORY.prototype.getCountrys_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_countrys, text, ftext, lang);
};
//
IDS_DIRECTORY.prototype.getListCountrys = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_countrys, fvalue, ftext, lang, filter);
    //var list = [];
    //var list_filtr = null;
    //if (this.list_countrys) {
    //    if (typeof filter === 'function') {
    //        list_filtr = this.list_countrys.filter(filter);
    //    } else { list_filtr = this.list_countrys; }
    //    for (i = 0, j = list_filtr.length; i < j; i++) {
    //        var l = list_filtr[i];
    //        if (lang) {
    //            list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
    //        } else {
    //            list.push({ value: l[fvalue], text: l[ftext] });
    //        }
    //    }
    //}
    //return list;
};
//*======= IDS_DIRECTORY.list_railway  (Справочник Ж.Д.) ======================================
IDS_DIRECTORY.prototype.getRailway_Of_Code = function (code) {
    var rw = null;
    if (this.list_railway) {
        rw = this.list_railway.find(function (o) { return o.code === (code ? Number(code): code) });
    }
    return rw;
};
//
IDS_DIRECTORY.prototype.getValue_Railway_Of_Code = function (code, name, lang) {
    var obj = this.getRailway_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Railway_Of_Code = function (code, name) {
    var obj = this.getRailway_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};

IDS_DIRECTORY.prototype.getRailway_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_railway, text, ftext, lang);
};
//
IDS_DIRECTORY.prototype.getListRailway = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_railway, fvalue, ftext, lang, filter);
};
//*======= IDS_DIRECTORY.list_inlandrailway  (Справочник внутрених Ж.Д.) ======================================
IDS_DIRECTORY.prototype.getInlandRailway_Of_Code = function (code) {
    var inlandrailway = null;
    if (this.list_inlandrailway) {
        inlandrailway = this.list_inlandrailway.find(function (o) { return o.code === (code ? Number(code) : code) });
    }
    return inlandrailway;
};
//
IDS_DIRECTORY.prototype.getValue_InlandRailway_Of_Code = function (code, name, lang) {
    var obj = this.getInlandRailway_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};

IDS_DIRECTORY.prototype.getInlandRailway_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_inlandrailway, text, ftext, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_InlandRailway_Of_ID = function (id, name) {
    var obj = this.getInlandRailway_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListInlandRailway = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_inlandrailway, fvalue, ftext, lang, filter);
};
//*======= IDS_DIRECTORY.list_external_station  (Справочник внешних станций) ======================================
IDS_DIRECTORY.prototype.getExternalStation_Of_Code = function (code) {
    var station = null;
    if (this.list_external_station) {
        station = this.list_external_station.find(function (o) { return o.code === (code ? Number(code) : code) });
    }
    return station;
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
IDS_DIRECTORY.prototype.geExternalStation_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_external_station, text, ftext, lang);
};
//
IDS_DIRECTORY.prototype.getID_ExternalStation_Of_Name = function (text, ftext, lang) {
    var obj = this.geExternalStation_Of_Name(text, ftext, lang);
    return obj && obj.length > 0 ? obj[0].id : null;
};
//
IDS_DIRECTORY.prototype.getListExternalStation = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_external_station, fvalue, ftext, lang, filter);
    //var list = [];
    //var list_filtr = null;
    //if (this.list_external_station) {
    //    if (typeof filter === 'function') {
    //        list_filtr = this.list_external_station.filter(filter);
    //    } else { list_filtr = this.list_external_station; }
    //    for (i = 0, j = list_filtr.length; i < j; i++) {
    //        var l = list_filtr[i];
    //        if (lang) {
    //            list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
    //        } else {
    //            list.push({ value: l[fvalue], text: l[ftext] });
    //        }
    //    }
    //}
    //return list;
};
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getExternalStation_Of_CultureName = function (name, lang, text) {
    if (this.list_external_station) {
        var obj = getObjects(this.list_external_station, name + '_' + lang, text);
        return obj
    }
    return null;
};
//*======= IDS_DIRECTORY.list_limiting_loading  (Справочник ограничений погрузки) ======================================
IDS_DIRECTORY.prototype.getLimitingLoading_Of_ID = function (id) {
    if (this.list_limiting_loading) {
        var obj = getObjects(this.list_limiting_loading, 'id', id);
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
    var obj = this.getLimitingLoading_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_LimitingLoading_Of_Code = function (id, name) {
    var obj = this.getLimitingLoading_Of_ID(id);
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
//*======= IDS_DIRECTORY.list_payer_sender  (Справочник платильщиков по отправке) ======================================
IDS_DIRECTORY.prototype.getPayerSender_Of_Code = function (code) {
    if (this.list_payer_sender) {
        var obj = getObjects(this.list_payer_sender, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getPayerSender_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_payer_sender) {
        var obj = getObjects(this.list_payer_sender, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_PayerSender_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getPayerSender_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_PayerSender_Of_Code = function (code, name, lang) {
    var obj = this.getPayerSender_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_PayerSender_Of_Code = function (id, name) {
    var obj = this.getPayerSender_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListPayerSender = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_payer_sender) {
        if (typeof filter === 'function') {
            list_filtr = this.list_payer_sender.filter(filter);
        } else { list_filtr = this.list_payer_sender; }
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
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getPayerSender_Of_CultureName = function (name, lang, text) {
    if (this.list_payer_sender) {
        var obj = getObjects(this.list_payer_sender, name + '_' + lang, text);
        return obj
    }
    return null;
};

//*======= IDS_DIRECTORY.list_payer_arrival  (Справочник платильщиков по прибытию) ======================================
IDS_DIRECTORY.prototype.getPayerArrival_Of_Code = function (code) {
    if (this.list_payer_arrival) {
        var obj = getObjects(this.list_payer_arrival, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getPayerArrival_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_payer_arrival) {
        var obj = getObjects(this.list_payer_arrival, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_PayerArrival_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getPayerArrival_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_PayerArrival_Of_Code = function (code, name, lang) {
    var obj = this.getPayerArrival_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_PayerArrival_Of_Code = function (id, name) {
    var obj = this.getPayerArrival_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListPayerArrival = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_payer_arrival) {
        if (typeof filter === 'function') {
            list_filtr = this.list_payer_arrival.filter(filter);
        } else { list_filtr = this.list_payer_arrival; }
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
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getPayerArrival_Of_CultureName = function (name, lang, text) {
    if (this.list_payer_arrival) {
        var obj = getObjects(this.list_payer_arrival, name + '_' + lang, text);
        return obj
    }
    return null;
};

//*======= IDS_DIRECTORY.list_cargo  (Справочник грузов ГНГ) ======================================
IDS_DIRECTORY.prototype.getCargo_Of_ID = function (id) {
    return this.getObj_Of_ID(this.list_cargo, id);
};
//
IDS_DIRECTORY.prototype.getCargo_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_cargo, text, ftext, lang);
};
//
IDS_DIRECTORY.prototype.getID_Cargo_Of_Name = function (text, ftext, lang) {
    var objs = this.getCargo_Of_Name(text, ftext, lang);
    return objs && objs.length > 0 ? objs[0].id : null;
};
//
IDS_DIRECTORY.prototype.getValue_Cargo_Of_ID = function (id, name, lang) {
    var obj = this.getCargo_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Cargo_Of_ID = function (id, name) {
    var obj = this.getCargo_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCargo = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_cargo, fvalue, ftext, lang, filter);
};
// Получить груз по id строки ЕТСНГ
IDS_DIRECTORY.prototype.getCargo_Of_IDETSNG = function (id_cargo_etsng) {
    if (this.list_cargo) {
        return getObjects(this.list_cargo, 'id_cargo_etsng', id_cargo_etsng);
    }
};
// Получить груз коду ЕТ СНГ с точным уточнением по коду и названию с учетом языка
IDS_DIRECTORY.prototype.getCargo_Of_ETSNGCodeCultureName = function (code_etsng, name_etsng, lang) {
    var obj = this.getCargoETSNG_Of_CodeCultureName(code_etsng, name_etsng, lang);
    if (obj && obj.length > 0) {
        return this.getCargo_Of_IDETSNG(obj[0].id);
    }
};
//*======= IDS_DIRECTORY.list_cargo_gng  (Справочник грузов ГНГ) ======================================
IDS_DIRECTORY.prototype.getCargoGNG_Of_Code = function (code) {
    if (this.list_cargo_gng) {
        var obj = getObjects(this.list_cargo_gng, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getCargoGNG_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_cargo_gng) {
        var obj = getObjects(this.list_cargo_gng, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_CargoGNG_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getCargoGNG_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_CargoGNG_Of_Code = function (code, name, lang) {
    var obj = this.getCargoGNG_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_CargoGNG_Of_Code = function (code, name) {
    var obj = this.getCargoGNG_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCargoGNG = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_cargo_gng) {
        if (typeof filter === 'function') {
            list_filtr = this.list_cargo_gng.filter(filter);
        } else { list_filtr = this.list_cargo_gng; }
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
// Вернуть строки грузов ГНГ по коду ГНГ с точным уточнением по коду и названию с учетом языка
IDS_DIRECTORY.prototype.getCargoGNG_Of_CodeCultureName = function (code, name, lang) {
    if (this.list_cargo_gng) {
        var obj = getObjects(this.list_cargo_gng, 'code', code);
        if (obj && obj.length > 0) {
            var obj_name = getObjects(this.list_cargo_gng, 'cargo_gng_name_' + lang, name);
            return obj_name && obj_name.length > 0 ? obj_name : null;
        }
        return null;
    }
};
//
IDS_DIRECTORY.prototype.getCargoGNG_Of_CultureName = function (name, lang, text) {
    if (this.list_cargo_gng) {
        var obj = getObjects(this.list_cargo_gng, name + '_' + lang, text);
        return obj
    }
    return null;
};

//*======= IDS_DIRECTORY.list_cargo_etsng  (Справочник грузов ЕТСНГ) ======================================
IDS_DIRECTORY.prototype.getCargoETSNG_Of_Code = function (code) {
    if (this.list_cargo_etsng) {
        var obj = getObjects(this.list_cargo_etsng, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getCargoETSNG_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_cargo_etsng) {
        var obj = getObjects(this.list_cargo_etsng, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_CargoETSNG_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getCargoETSNG_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_CargoETSNG_Of_Code = function (code, name, lang) {
    var obj = this.getCargoETSNG_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_CargoETSNG_Of_Code = function (code, name) {
    var obj = this.getCargoETSNG_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCargoETSNG = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_cargo_etsng) {
        if (typeof filter === 'function') {
            list_filtr = this.list_cargo_etsng.filter(filter);
        } else { list_filtr = this.list_cargo_etsng; }
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
// Вернуть строки грузов ЕТ СНГ по коду ЕТ СНГ с точным уточнением по коду и названию с учетом языка
IDS_DIRECTORY.prototype.getCargoETSNG_Of_CodeCultureName = function (code, name, lang) {
    if (this.list_cargo_etsng) {
        var obj = getObjects(this.list_cargo_etsng, 'code', code);
        if (obj && obj.length > 0) {
            var obj_name = getObjects(this.list_cargo_etsng, 'cargo_etsng_name_' + lang, name);
            return obj_name && obj_name.length > 0 ? obj_name : null;
        }
        return null;
    }
};
//
IDS_DIRECTORY.prototype.getCargoETSNG_Of_CultureName = function (name, lang, text) {
    if (this.list_cargo_etsng) {
        var obj = getObjects(this.list_cargo_etsng, name + '_' + lang, text);
        return obj
    }
    return null;
};

//*======= IDS_DIRECTORY.list_cargo_group  (Справочник групп грузов) ======================================
IDS_DIRECTORY.prototype.getCargoGroup_Of_ID = function (id) {
    if (this.list_cargo_group) {
        var obj = getObjects(this.list_cargo_group, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getCargoGroup_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_cargo_group) {
        var obj = getObjects(this.list_cargo_group, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_CargoGroup_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getCargoGroup_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_CargoGroup_Of_ID = function (id, name, lang) {
    var obj = this.getCargoGroup_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_CargoGroup_Of_ID = function (id, name) {
    var obj = this.getCargoGroup_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCargoGroup = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_cargo_group) {
        if (typeof filter === 'function') {
            list_filtr = this.list_cargo_group.filter(filter);
        } else { list_filtr = this.list_cargo_group; }
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
//*======= IDS_DIRECTORY.list_certification_data  (Справочник сертификационных данных) ======================================
IDS_DIRECTORY.prototype.getCertificationData_Of_ID = function (id) {
    if (this.list_certification_data) {
        var obj = getObjects(this.list_certification_data, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getCertificationData_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_certification_data) {
        var obj = getObjects(this.list_certification_data, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_CertificationData_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getCertificationData_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_CertificationData_Of_ID = function (id, name, lang) {
    var obj = this.getCertificationData_Of_Code(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_CertificationData_Of_ID = function (id, name) {
    var obj = this.getCertificationData_Of_Code(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCertificationData = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_certification_data) {
        if (typeof filter === 'function') {
            list_filtr = this.list_certification_data.filter(filter);
        } else { list_filtr = this.list_certification_data; }
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
//*======= IDS_DIRECTORY.list_commercial_condition  (Справочник скомерчиских состояний) ======================================
IDS_DIRECTORY.prototype.getCommercialCondition_Of_ID = function (id) {
    if (this.list_commercial_condition) {
        var obj = getObjects(this.list_commercial_condition, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getCommercialCondition_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_commercial_condition) {
        var obj = getObjects(this.list_commercial_condition, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_CommercialCondition_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getCommercialCondition_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_CommercialCondition_Of_ID = function (id, name, lang) {
    var obj = this.getCommercialCondition_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_CommercialCondition_Of_ID = function (id, name) {
    var obj = this.getCommercialCondition_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListCommercialCondition = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_commercial_condition) {
        if (typeof filter === 'function') {
            list_filtr = this.list_commercial_condition.filter(filter);
        } else { list_filtr = this.list_commercial_condition; }
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
//*======= IDS_DIRECTORY.list_hazard_class  (Справочник классов опасности) ======================================
IDS_DIRECTORY.prototype.getHazardClass_Of_Code = function (code) {
    if (this.list_hazard_class) {
        var obj = getObjects(this.list_hazard_class, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getHazardClass_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_hazard_class) {
        var obj = getObjects(this.list_hazard_class, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getID_HazardClass_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getHazardClass_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.id : null;
};
//
IDS_DIRECTORY.prototype.getValue_HazardClass_Of_Code = function (code, name, lang) {
    var obj = this.getHazardClass_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_HazardClass_Of_Code = function (code, name) {
    var obj = this.getHazardClass_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getListHazardClass = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_hazard_class) {
        if (typeof filter === 'function') {
            list_filtr = this.list_hazard_class.filter(filter);
        } else { list_filtr = this.list_hazard_class; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list.push({ value: $.trim(l[fvalue]), text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }
        }
    }
    return list;
};
//*======= IDS_DIRECTORY.list_condition_arrival  (Справочник годность по прибытию) ======================================
IDS_DIRECTORY.prototype.getConditionArrival_Of_ID = function (id) {
    if (this.list_condition_arrival) {
        var obj = getObjects(this.list_condition_arrival, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_DIRECTORY.prototype.getValue_ConditionArrival_Of_ID = function (id, name, lang) {
    var obj = this.getConditionArrival_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_ConditionArrival_Of_ID = function (id, name) {
    var obj = this.getConditionArrival_Of_ID(id);
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

IDS_DIRECTORY.prototype.getList2ConditionArrival = function (fvalue, ftext1, ftext2, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_condition_arrival) {
        if (typeof filter === 'function') {
            list_filtr = this.list_condition_arrival.filter(filter);
        } else { list_filtr = this.list_condition_arrival; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
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
//*======= IDS_DIRECTORY.list_divisions  (Справочник подразделений) ======================================
IDS_DIRECTORY.prototype.getDivisions_Of_ID = function (id) {
    return this.getObj_Of_ID(this.list_divisions, id);
};
//
IDS_DIRECTORY.prototype.getValue_Divisions_Of_ID = function (id, name, lang) {
    var obj = this.getDivisions_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Divisions_Of_ID = function (id, name) {
    var obj = this.getDivisions_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getDivisions_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_divisions, text, ftext, lang);
};
//
IDS_DIRECTORY.prototype.getID_Divisions_Of_Name = function (text, ftext, lang) {
    var obj = this.getDivisions_Of_Name(text, ftext, lang);
    return obj && obj.length>0 ? obj[0].id : null;
};
//
IDS_DIRECTORY.prototype.getListDivisions = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_divisions, fvalue, ftext, lang, filter);
};
//
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getDivisions_Of_CultureName = function (name, lang, text) {
    if (this.list_divisions) {
        var obj = getObjects(this.list_divisions, name + '_' + lang, text);
        return obj;
    }
    return null;
};
//*======= IDS_DIRECTORY.list_wagon  (Справочник вагонов) ======================================
IDS_DIRECTORY.prototype.getWagons_Of_num = function (num) {
    var wagon = null;
    if (this.list_wagon && this.list_wagon.length > 0) {
        wagon = this.list_wagon.find(function (o) { return o.num === num });
    }
    return wagon;
    //if (this.list_wagon) {
    //    var obj = getObjects(this.list_wagon, 'num', num);
    //    return obj && obj.length > 0 ? obj[0] : null;
    //}
};
//
IDS_DIRECTORY.prototype.getListWagons = function (fvalue, ftext, lang, filter) {
    return this.getObjs_Of_text(this.list_wagon, text, ftext, lang);
    //var list = [];
    //var list_filtr = null;
    //if (this.list_wagon) {
    //    if (typeof filter === 'function') {
    //        list_filtr = this.list_wagon.filter(filter);
    //    } else { list_filtr = this.list_wagon; }
    //    for (i = 0, j = list_filtr.length; i < j; i++) {
    //        var l = list_filtr[i];
    //        if (lang) {
    //            list.push({ value: $.trim(l[fvalue]), text: l[ftext + '_' + lang] });
    //        } else {
    //            list.push({ value: l[fvalue], text: l[ftext] });
    //        }
    //    }
    //}
    //return list;
};
// Вернуть копию без связей
IDS_DIRECTORY.prototype.getCloneWagons = function (wagon) {
    if (!wagon) return null;
    return {
        num: wagon.num,
        id_countrys: wagon.id_countrys,
        id_genus: wagon.id_genus,
        id_owner: wagon.id_owner,
        id_operator: wagon.id_operator,
        change_operator: wagon.change_operator,
        gruzp: wagon.gruzp,
        tara: wagon.tara,
        kol_os: wagon.kol_os,
        usl_tip: wagon.usl_tip,
        date_rem_uz: wagon.date_rem_uz,
        date_rem_vag: wagon.date_rem_vag,
        id_type_ownership: wagon.id_type_ownership,
        sign: wagon.sign,
        factory_number: wagon.factory_number,
        inventory_number: wagon.inventory_number,
        year_built: wagon.year_built,
        exit_ban: wagon.exit_ban,
        note: wagon.note,
        sobstv_kis: wagon.sobstv_kis,
        bit_warning: wagon.bit_warning,
        create: wagon.create,
        create_user: wagon.create_user,
        change: wagon.change,
        change_user: wagon.change_user,
    };
}
//*======= IDS_DIRECTORY.list_wagon_rent  (Справочник аренд вагонов) ======================================
IDS_DIRECTORY.prototype.geWagonsRent_Of_num = function (num) {
    var wagon = null;
    if (this.list_wagon_rent && this.list_wagon_rent.length > 0) {
        wagon = this.list_wagon_rent.filter(function (i) { return o.num === num });
    }
    return wagon;
};
// Вернуть текущую аренду вагона
IDS_DIRECTORY.prototype.getCurrentRentOfWagon = function (vagon) {
    if (vagon && vagon.Directory_WagonsRent && vagon.Directory_WagonsRent.length > 0) {
        var rent_current = vagon.Directory_WagonsRent.find(function (o) {
            return o.rent_end === null;
        });
        return rent_current;
    }
    return null;
};
// Вернуть аренду до указаного времени
IDS_DIRECTORY.prototype.getCurrentRentOfWagonOfDate = function (vagon, date) {
    var rent = null;
    if (vagon && vagon.Directory_WagonsRent && vagon.Directory_WagonsRent.length > 0) {
        var rents = vagon.Directory_WagonsRent.filter(function (i) {
            return moment(i.rent_start) <= date;
        });
        if (rents && rents.length > 0) {
            $.each(rents, function (i, el) {
                var r = el;
                if (rent === null || r.id > rent.id) {
                    rent = r;
                }
            });
        }
    }
    return rent;
};
// Вернуть копию без связй
IDS_DIRECTORY.prototype.getCloneWagonsRent = function (wagon_rent) {
    if (!wagon_rent) return null;
    return {
        "id": wagon_rent.id,
        "num": wagon_rent.num,
        "id_operator": wagon_rent.id_operator,
        "id_limiting": wagon_rent.id_limiting,
        "rent_start": wagon_rent.rent_start,
        "rent_end": wagon_rent.rent_end,
        "create": wagon_rent.create,
        "create_user": wagon_rent.create_user,
        "change": wagon_rent.change,
        "change_user": wagon_rent.change_user,
        "parent_id": wagon_rent.parent_id
    }
};
//*======= IDS_DIRECTORY.list_reason_discrepancy  (Справочник расхождений) ======================================
IDS_DIRECTORY.prototype.getReason_Discrepancy_Of_ID = function (id) {
    return this.getObj_Of_ID(this.list_reason_discrepancy, id);
};
//
IDS_DIRECTORY.prototype.getValue_Reason_Discrepancy_Of_ID = function (id, name, lang) {
    var obj = this.getReason_Discrepancy_Of_ID(id);
    return this.getValueObj(obj, name, lang);
};
//
IDS_DIRECTORY.prototype.getValueCulture_Reason_Discrepancy_Of_ID = function (id, name) {
    var obj = this.getReason_Discrepancy_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_DIRECTORY.prototype.getReason_Discrepancy_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_reason_discrepancy, text, ftext, lang);
    //if (this.list_reason_discrepancy) {
    //    var obj = getObjects(this.list_reason_discrepancy, (lang ? ftext + '_' + lang : name), text);
    //    return obj && obj.length > 0 ? obj[0] : null;
    //}
};
//
IDS_DIRECTORY.prototype.getID_Reason_Discrepancy_Of_Name = function (text, ftext, lang) {
    var objs = this.getReason_Discrepancy_Of_Name(text, ftext, lang);
    return objs && objs.length > 0 ? objs[0].id : null;
    //var obj = this.getReason_Discrepancy_Of_Name(text, ftext, lang);
    //return obj ? obj.id : null;
};
// Вернуть список в формате value: text
IDS_DIRECTORY.prototype.getListReason_Discrepancy = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_reason_discrepancy, fvalue, ftext, lang, filter);
};
// Получим список с выборкой по полю
IDS_DIRECTORY.prototype.getReason_Discrepancy_Of_CultureName = function (name, lang, text) {
    if (this.list_reason_discrepancy) {
        var obj = getObjects(this.list_reason_discrepancy, name + '_' + lang, text);
        return obj
    }
    return null;
};
//*======= IDS_DIRECTORY.list_detention_return  (Справочник возвратов и задержаний) ======================================
// Вернуть по id
IDS_DIRECTORY.prototype.getDetention_Return_Of_ID = function (id) {
    return this.getObj_Of_ID(this.list_detention_return, id);
};
// Вернуть список по полному названию причины
IDS_DIRECTORY.prototype.getDetention_Return_Of_Name = function (text, ftext, lang) {
    return this.getObjs_Of_text(this.list_detention_return, text, ftext, lang);
};
IDS_DIRECTORY.prototype.getID_Detention_Return_Of_Name = function (text, ftext, lang) {
    var objs = this.getDetention_Return_Of_Name(text, ftext, lang);
    return objs && objs.length > 0 ? objs[0].id : null;
};
// Вернуть список в формате value: text
IDS_DIRECTORY.prototype.getListDetention_Return = function (fvalue, ftext, lang, filter) {
    return this.getListObj(this.list_detention_return, fvalue, ftext, lang, filter);
};