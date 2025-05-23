﻿// Подключите common.js
// Подключите shared.js

var UZ_DIRECTORY = function (lang) {
    this.lang = lang;
    this.list_stations_buff = [];
};

UZ_DIRECTORY.list_states = [];

UZ_DIRECTORY.list_stations = [];

UZ_DIRECTORY.list_internal_railroad = [];

UZ_DIRECTORY.list_cargo = [];

UZ_DIRECTORY.prototype.load = function (list, lockOff, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'states') {
            UZ_DIRECTORY.prototype.getStates(function (result_states) {
                obj.list_states = result_states;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'stations') {
            UZ_DIRECTORY.prototype.getStations(function (result_stations) {
                obj.list_stations = result_stations;
                //obj.list_stations_sc = result_stations.filter(function (el) { return el.code_cs ? true : false });
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'internal_railroad') {
            UZ_DIRECTORY.prototype.getInternalRailroad(function (result_internal_railroad) {
                obj.list_internal_railroad = result_internal_railroad;
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
            UZ_DIRECTORY.prototype.getCargo(function (result_cargo) {
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

    });
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= Directory_States (Справочник Стран и железных дорог) ======================================
UZ_DIRECTORY.prototype.getStates = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/uz/directory/states/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("UZ_DIRECTORY.getStates", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Stations (Справочник ж.д. станций) ======================================
UZ_DIRECTORY.prototype.getStations = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/uz/directory/stations/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("UZ_DIRECTORY.getStations", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить станцию по коду
UZ_DIRECTORY.prototype.getStationsOfCodeCS = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/uz/directory/stations/code_cs/'+code,
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("UZ_DIRECTORY.getStationsOfCodeCS", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_InternalRailroad (Справочник регионов ж.д. дорог) ======================================
UZ_DIRECTORY.prototype.getInternalRailroad = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/uz/directory/internal_railroad/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("UZ_DIRECTORY.getInternalRailroad", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Directory_Cargo (Справочник грузов) ======================================
UZ_DIRECTORY.prototype.getCargo = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/uz/directory/cargo/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("UZ_DIRECTORY.getCargo", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
/* ----------------------------------------------------------
 ЗАПРОСЫ К БД УЗ 
-------------------------------------------------------------*/
//======= UZWagonInfo (Справочник вагонов УЗ ) ======================================
// Получить информацию по вагону из базы данных УЗ
UZ_DIRECTORY.prototype.getInfoWagonOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/uz/web/client/car_info/num/' + num,
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("UZ_DIRECTORY.getInfoWagonOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
/* ----------------------------------------------------------
функции для работы с объектами
-------------------------------------------------------------*/
UZ_DIRECTORY.prototype.getValueObj = function (obj, name) {
    return obj ? obj[name] : null;
};
//
UZ_DIRECTORY.prototype.getValueCultureObj = function (obj, name) {
    return obj ? obj[name + '_' + this.lang] : null;
};
/* ----------------------------------------------------------
функции для работы с внутреним массивом
-------------------------------------------------------------*/
//======= UZ_DIRECTORY.list_states  (Справочник Стран и железных дорог) ======================================
UZ_DIRECTORY.prototype.getStates_Internal_Of_ID = function (id_state) {
    if (this.list_states) {
        var obj = getObjects(this.list_states, 'id', id_state);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
UZ_DIRECTORY.prototype.getValue_States_Of_ID = function (id_state, name) {
    var obj = this.getStates_Internal_Of_ID(id_state);
    return obj ? obj[name] : null;
};
//
UZ_DIRECTORY.prototype.getValueCulture_States_Of_ID = function (id_state, name) {
    var obj = this.getStates_Internal_Of_ID(id_state);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
UZ_DIRECTORY.prototype.getListStates = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_states) {
        for (i = 0, j = this.list_states.length; i < j; i++) {
            var l = this.list_states[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};
//======= UZ_DIRECTORY.list_stations  (Справочник ж.д. станций) ======================================
//
UZ_DIRECTORY.prototype.getStations_Internal_Of_CodeCS = function (code_cs) {
    if (this.list_stations && code_cs) {
        var obj_buff = getObjects(this.list_stations_buff, 'code_cs', code_cs);
        if (!obj_buff || obj_buff.length === 0) {
            var obj = getObjects(this.list_stations, 'code_cs', code_cs);
            if (obj && obj.length > 0) {
                this.list_stations_buff.push(obj[0]);
                return obj[0];
            }
        } else {
            return obj_buff[0];
        }
    }
    return null;
};
//
UZ_DIRECTORY.prototype.getStations_Internal_Of_Code = function (code) {
    if (this.list_stations && code) {
        var obj_buff = getObjects(this.list_stations_buff, 'code', code);
        if (!obj_buff || obj_buff.length === 0) {
            var obj = getObjects(this.list_stations, 'code', code);
            if (obj && obj.length > 0) {
                this.list_stations_buff.push(obj[0]);
                return obj[0];
            }
        } else {
            return obj_buff[0];
        }
    }
    return null;
};
//
UZ_DIRECTORY.prototype.getValue_Station_Of_CodeCS = function (code_cs, name) {
    var obj = this.getStations_Internal_Of_CodeCS(code_cs);
    return obj ? obj[name] : null;
};
//
UZ_DIRECTORY.prototype.getListStation = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_stations) {
        if (typeof filter === 'function') {
            list_filtr = this.list_stations.filter(filter);
        } else { list_filtr = this.list_stations; }
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
// Получить список станций которые начинаются с указанного кода
UZ_DIRECTORY.prototype.getStations_Internal_Like_Code = function (code) {
    if (this.list_stations && code) {
        var res = this.list_stations.filter(function (i) {
            var str = String(i.code).slice(0, String(code).length);
            var num = str.indexOf(code, 0);
            return num >= 0 ? true : false;
        });
        return res;
    }
    return null;
};

UZ_DIRECTORY.prototype.getStations_Internal_Correct_Code = function (code) {
    if (this.list_stations && code) {
        var res = this.list_stations.filter(function (i) {
            return (i.code >= (code * 10)) && (i.code <= (code * 10) + 9) ? true : false;
        });
        return res;
    }
    return null;
};
// Получим список с выборкой по полю
UZ_DIRECTORY.prototype.getStations_Of_Name = function (name, text) {
    if (this.list_stations) {
        var obj = getObjects(this.list_stations, name, text);
        return obj
    }
    return null;
};

//======= UZ_DIRECTORY.list_internal_railroad  (Справочник Стран и железных дорог) ======================================
UZ_DIRECTORY.prototype.getInternalRailroad_Internal_Of_ID = function (id_internal_railroad) {
    if (this.list_internal_railroad) {
        var obj = getObjects(this.list_internal_railroad, 'id', id_internal_railroad);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
UZ_DIRECTORY.prototype.getValue_InternalRailroad_Of_ID = function (id_internal_railroad, name) {
    var obj = this.getInternalRailroad_Internal_Of_ID(id_internal_railroad);
    return obj ? obj[name] : null;
};
//
UZ_DIRECTORY.prototype.getValueCulture_InternalRailroad_Of_ID = function (id_internal_railroad, name) {
    var obj = this.getInternalRailroad_Internal_Of_ID(id_internal_railroad);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
UZ_DIRECTORY.prototype.getListInternalRailroad = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_internal_railroad) {
        for (i = 0, j = this.list_internal_railroad.length; i < j; i++) {
            var l = this.list_internal_railroad[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};
//
UZ_DIRECTORY.prototype.getInternalRailroad_Internal_Of_StationCode = function (code) {
    if (this.list_internal_railroad && code !== null) {
        var obj = this.list_internal_railroad.filter(function (i) {
            var list_station = i.list_code_station;
            if (list_station) {
                var arr_st = list_station.split(';')
                var res = false;
                arr_st.forEach(function (el, i, arr) {
                    if (el !== "") {
                        arr_code = el.split('–');
                        if (arr_code.length === 2) {
                            if (Number(code) >= Number(arr_code[0]) && Number(code) <= Number(arr_code[1]))
                                res = true;
                        }
                        if (arr_code.length === 1) {
                            if (Number(code) === Number(arr_code[0]))
                                res = true;
                        }
                    }
                });
                return res;
            } else return false;
        });
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//======= UZ_DIRECTORY.list_cargo  (Справочник грузов) ======================================
UZ_DIRECTORY.prototype.getCargo_Internal_Of_ID = function (id) {
    if (this.list_cargo) {
        var obj = getObjects(this.list_cargo, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
UZ_DIRECTORY.prototype.getValue_Cargo_Of_ID = function (id, name) {
    var obj = this.getCargo_Internal_Of_ID(id);
    return obj ? obj[name] : null;
};
//
UZ_DIRECTORY.prototype.getValueCulture_Cargo_Of_ID = function (id, name) {
    var obj = this.getCargo_Internal_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
UZ_DIRECTORY.prototype.getListCargo = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_cargo) {
        for (i = 0, j = this.list_cargo.length; i < j; i++) {
            var l = this.list_cargo[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};
// вернуть все строки по указанному коду ЕТСНГ
UZ_DIRECTORY.prototype.getCargo_Internal_Of_ETSNGCode = function (code) {
    if (this.list_cargo && code !== null) {
        var obj = getObjects(this.list_cargo, 'code_etsng', code);
        return obj;
    }
};
// вернуть все строки по указанному коду ГНГ
UZ_DIRECTORY.prototype.getCargo_Internal_Of_GNGCode = function (code) {
    if (this.list_cargo && code !== null) {
        var obj = getObjects(this.list_cargo, 'code_gng', code);
        return obj;
    }
};