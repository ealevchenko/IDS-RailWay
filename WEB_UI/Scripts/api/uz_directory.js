// Подключите common.js
// Подключите shared.js

var UZ_DIRECTORY = function (lang) {
    this.lang = lang;
    this.list_stations_buff = [];
};

UZ_DIRECTORY.list_states = [];

UZ_DIRECTORY.list_stations = [];

UZ_DIRECTORY.list_internal_railroad = [];

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
UZ_DIRECTORY.prototype.getValue_Station_Of_CodeCS = function (code_cs, name) {
    var obj = this.getStations_Internal_Of_CodeCS(code_cs);
    return obj ? obj[name] : null;
};
//
UZ_DIRECTORY.prototype.getListStation = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_stations) {
        for (i = 0, j = this.list_stations.length; i < j; i++) {
            var l = this.list_stations[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
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