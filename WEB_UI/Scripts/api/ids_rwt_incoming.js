// Подключите common.js
// Подключите shared.js


var IDS_RWT_INCOMING = function (lang) {
    this.lang = lang;
    this.ids_dir = new IDS_DIRECTORY(lang); // Создадим класс IDS_DIRECTORY
    this.uz_dir = new UZ_DIRECTORY(lang); // Создадим класс UZ_DIRECTORY
};

IDS_RWT_INCOMING.list_arrival = [];

// Загрузить указаные справочники
IDS_RWT_INCOMING.prototype.load = function (list_incoming, list_ids_dir, list_uz_dir, lockOff, callback) {
    var count = list_incoming.length + (list_ids_dir.length > 0 ? 1 : 0) + (list_uz_dir.length > 0 ? 1 : 0);
    if (count === 0) {
        if (typeof callback === 'function') {
            if (lockOff) { LockScreenOff(); }
            callback();
        }
    }
    var obj = this;
    // Загрузка справочников ИДС
    obj.ids_dir.load(list_ids_dir, lockOff, function () {
        count -= 1;
        if (count === 0) {
            if (typeof callback === 'function') {
                if (lockOff) { LockScreenOff(); }
                callback();
            }
        }
    });
    // Загрузка справочников УЗ
    obj.uz_dir.load(list_uz_dir, lockOff, function () {
        count -= 1;
        if (count === 0) {
            if (typeof callback === 'function') {
                if (lockOff) { LockScreenOff(); }
                callback();
            }
        }
    });
    // Згрузка собственных таблиц
    $.each(list_incoming, function (i, el) {
        if (el === 'arrival') {
            IDS_RWT_INCOMING.prototype.getArrivalSostav(function (result_arrival) {
                obj.list_arrival = result_arrival;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback(result_arrival);
                    }
                }
            });
        };
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
// Получить все составы
IDS_RWT_INCOMING.prototype.getArrivalSostav = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_sostav/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
// Получить состав
IDS_RWT_INCOMING.prototype.getArrivalSostavOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_sostav/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrivalSostavOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_RWT_INCOMING.prototype.putArrivalSostav = function (arrival_sostav, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_sostav/id/' + arrival_sostav.id,
        data: JSON.stringify(arrival_sostav),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_RWT_INCOMING.prototype.deleteArrivalSostav = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_sostav/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_RWT_INCOMING.prototype.postArrivalSostav = function (arrival_sostav, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_sostav/',
        type: 'POST',
        data: JSON.stringify(arrival_sostav),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= ArrivalCars (Таблица вагонов состава) ======================================
// Получить все вагоны
IDS_RWT_INCOMING.prototype.getArrivalCars = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_cars/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагоны сотава
IDS_RWT_INCOMING.prototype.getArrivalCarsOfSostav = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_cars/sostav/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrivalCarsOfSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон
IDS_RWT_INCOMING.prototype.getArrivalCarsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_cars/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrivalCarsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_RWT_INCOMING.prototype.putArrivalCars = function (arrival_cars, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_cars/id/' + arrival_cars.id,
        data: JSON.stringify(arrival_cars),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_RWT_INCOMING.prototype.deleteArrivalCars = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_cars/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_RWT_INCOMING.prototype.postArrivalCars = function (arrival_cars, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_cars/',
        type: 'POST',
        data: JSON.stringify(arrival_cars),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= UZ_DOC (Таблица ЭПД принятых вагонов) ======================================
// Получить все документы
IDS_RWT_INCOMING.prototype.getUZ_DOC = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/uz_doc/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getUZ_DOC", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить строку ЭПД принятого вагона по номеру документа
IDS_RWT_INCOMING.prototype.getUZ_DOCOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/uz_doc/num/' + num,
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
            OnAJAXError("IDS_RWT_INCOMING.getUZ_DOCOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить разпарсеный ЭПД принятого вагона по номеру документа
IDS_RWT_INCOMING.prototype.getOTPR_UZ_DOCOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/uz_doc/otpr/num/' + num,
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
            OnAJAXError("IDS_RWT_INCOMING.getOTPR_UZ_DOCOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};