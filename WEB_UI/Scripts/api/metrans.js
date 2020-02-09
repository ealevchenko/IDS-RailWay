// Подключите common.js
// Подключите shared.js
// Подключите uz_directory

var METRANS = function (lang) {
    this.lang = lang;
    this.ids_dir = new IDS_DIRECTORY(lang), // Создадим класс IDS_DIRECTORY
    this.uz_dir = new UZ_DIRECTORY(lang) // Создадим класс UZ_DIRECTORY
};

METRANS.list_arrival = [];

METRANS.list_consignee = [];

// Загрузить указаные справочники
METRANS.prototype.load = function (list, lockOff, callback) {
    var count = list.length;
    var obj = this;
    // Згрузка собственных таблиц
    $.each(list, function (i, el) {
        //if (el === 'ids') {
        //    // Згрузка библиотек справочников ИДС
        //    obj.ids_dir.load(['genus_wagon', 'wagon_manufacturers', 'types_repairs_wagons', 'models_wagons', 'type_wagons', 'type_owner_ship', 'owners_wagons', 'lessors_wagons', 'operators_wagons', 'poligon_travel_wagons', 'special_conditions', 'depo', 'wagons_condition'], lockOff, function () {
        //        count -= 1;
        //        if (count === 0) {
        //            if (typeof callback === 'function') {
        //                if (lockOff) { LockScreenOff(); }
        //                callback();
        //            }
        //        }
        //    });
        //};
        // Згрузка библиотек справочников УЗ
        if (el === 'uz') {
            obj.uz_dir.load(['states', 'stations', 'internal_railroad'], lockOff, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };

        if (el === 'list_consignee') {
            METRANS.prototype.getConsignee(function (result_consignee) {
                obj.list_consignee = result_consignee;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback(result_consignee);
                    }
                }
            });
        };
    });
};
/* ----------------------------------------------------------
функции для работы с объектами
-------------------------------------------------------------*/
METRANS.prototype.getValueObj = function (obj, name) {
    return obj ? obj[name] : null;
};
//
METRANS.prototype.getValueCultureObj = function (obj, name) {
    return obj ? obj[name + '_' + this.lang] : null;
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= ArrivalSostav (Таблица составов) ======================================
METRANS.prototype.getArrivalSostav = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/metrans/arrival_sostav/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXError("METRANS.getArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//======= Consignee (Таблица грузополучателей) ======================================
METRANS.prototype.getConsignee = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/metrans/consignee/all',
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
            OnAJAXError("METRANS.getConsignee", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
METRANS.prototype.getConsigneeOfCode = function (code, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/metrans/consignee/code/' + code,
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
            OnAJAXError("METRANS.getConsigneeOfCode", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
/* ----------------------------------------------------------
функции для работы с внутреним массивом
-------------------------------------------------------------*/
//======= METRANS.list_consignee  (Список грузополучателей) ======================================
METRANS.prototype.getConsignee_Internal_Of_ID = function (code) {
    if (this.list_consignee) {
        var obj = getObjects(this.list_consignee, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
METRANS.prototype.getValue_Consignee_Of_ID = function (code, name) {
    var obj = this.getConsignee_Internal_Of_ID(code);
    return obj ? obj[name] : null;
};
//
METRANS.prototype.getValueCulture_Consignee_Of_ID = function (code, name) {
    var obj = this.getConsignee_Internal_Of_ID(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
METRANS.prototype.getListConsignee = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_consignee) {
        for (i = 0, j = this.list_consignee.length; i < j; i++) {
            var l = this.list_consignee[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};
