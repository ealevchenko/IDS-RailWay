
var UZ_DIRECTORY = function (lang) {
    this.lang = lang;

};

UZ_DIRECTORY.list_states = [];

UZ_DIRECTORY.list_stations = [];

UZ_DIRECTORY.list_internal_railroad = [];

UZ_DIRECTORY.prototype.load = function (list, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'states') {
            UZ_DIRECTORY.prototype.getStates(function (result_states) {
                obj.list_states = result_states;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
        if (el === 'stations') {
            UZ_DIRECTORY.prototype.getStations(function (result_stations) {
                obj.list_stations = result_stations;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
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
