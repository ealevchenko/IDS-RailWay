// Подключите common.js
// Подключите shared.js


var IDS_RWT_INCOMING = function (lang) {
    this.lang = lang;
    this.ids_tr = new IDS_TRANSFER(lang); // Создадим класс IDS_TRANSFER 

    this.ids_dir = new IDS_DIRECTORY(lang); // Создадим класс IDS_DIRECTORY
    this.uz_dir = new UZ_DIRECTORY(lang); // Создадим класс UZ_DIRECTORY
    // Статус сотава
    this.list_status_arrival = [
        { code: 0, name: 'Not', status_ru: 'Не обрабатывался', status_en: 'Not processed' },
        { code: 1, name: 'InWork', status_ru: 'В работе', status_en: 'In work' },
        { code: 2, name: 'Accepted', status_ru: 'Принят', status_en: 'Accepted' },
        { code: 3, name: 'Rejected', status_ru: 'Отклонён', status_en: 'Rejected' },
    ];
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
// Получить перечень вагонов за указаный период выбранные вагоны
IDS_RWT_INCOMING.prototype.getArrivalCarsOfPeriodNums = function (start, stop, nums, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_cars/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19)+ '/nums/' + nums,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrivalCarsOfPeriodNums", x, y, z);
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
// Удалить вагоны состава
IDS_RWT_INCOMING.prototype.deleteArrivalCarsOfSostav = function (id_sostav, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_cars/sostav/id/' + id_sostav,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrivalCarsOfSostav", x, y, z);
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
                callback(data, arrival_cars);
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
функции для работы с внутреним массивом
-------------------------------------------------------------*/
//*======= IDS_RWT_INCOMING.list_status_arrival  (Справочник статусов прибытия) ======================================
IDS_RWT_INCOMING.prototype.getStatusArrival_Internal_Of_Code = function (code) {
    if (this.list_status_arrival) {
        var obj = getObjects(this.list_status_arrival, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_RWT_INCOMING.prototype.getStatusArrival_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_status_arrival) {
        var obj = getObjects(this.list_status_arrival, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_RWT_INCOMING.prototype.getCode_StatusArrival_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getStatusArrival_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.code : null;
};
//
IDS_RWT_INCOMING.prototype.getValue_StatusArrival_Of_Code = function (code, name, lang) {
    var obj = this.getStatusArrival_Internal_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_RWT_INCOMING.prototype.getValueCulture_StatusArrival_Of_Code = function (code, name) {
    var obj = this.getStatusArrival_Internal_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_RWT_INCOMING.prototype.getListStatusArrival = function (fvalue, ftext, lang, filter) {
    var list = [];
    var list_filtr = null;
    if (this.list_status_arrival) {
        if (typeof filter === 'function') {
            list_filtr = this.list_status_arrival.filter(filter);
        } else { list_filtr = this.list_status_arrival; }
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