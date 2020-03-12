// Подключите common.js
// Подключите shared.js


var IDS_RWT_INCOMING = function (lang) {
    this.lang = lang;
    this.ids_dir = new IDS_DIRECTORY(lang), // Создадим класс IDS_DIRECTORY
    this.uz_dir = new UZ_DIRECTORY(lang) // Создадим класс UZ_DIRECTORY
};

IDS_RWT_INCOMING.list_arrival = [];

// Загрузить указаные справочники
IDS_RWT_INCOMING.prototype.load = function (list, lockOff, callback) {
    var count = list.length;
    if (count === 0) {
        if (typeof callback === 'function') {
            if (lockOff) { LockScreenOff(); }
            callback();
        }
    }
    var obj = this;
    // Згрузка собственных таблиц
    $.each(list, function (i, el) {
        // Згрузка библиотек справочников УЗ
        if (el === 'ids') {
            obj.ids_dir.load(['station'], lockOff, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };

        //if (el === 'list_consignee') {
        //    METRANS.prototype.getConsignee(function (result_consignee) {
        //        obj.list_consignee = result_consignee;
        //        count -= 1;
        //        if (count === 0) {
        //            if (typeof callback === 'function') {
        //                if (lockOff) { LockScreenOff(); }
        //                callback(result_consignee);
        //            }
        //        }
        //    });
        //};
    });
};
/* ----------------------------------------------------------
функции для работы с объектами
-------------------------------------------------------------*/
IDS_RWT_INCOMING.prototype.getValueObj = function (obj, name) {
    return obj ? obj[name] : null;
};
//
IDS_RWT_INCOMING.prototype.getValueCultureObj = function (obj, name) {
    return obj ? obj[name + '_' + this.lang] : null;
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= ArrivalSostav (Таблица составов) ======================================
IDS_RWT_INCOMING.prototype.getArrivalSostav = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids_rwt/arrival_sostav/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXError("IDS_RWT_INCOMING.getArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};