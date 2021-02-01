// Подключите common.js
// Подключите shared.js

var IDS_GLOBAL= function () {
    //this.lang = lang;

};

/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//==========================================================================================================
// Получить количество клиентов
IDS_GLOBAL.prototype.getCountClient = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/global/client/count',
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
            //OnAJAXError("IDS_GLOBAL.getCountClient", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить хосты всех клиентов
IDS_GLOBAL.prototype.getHostClient = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/global/client/hosts',
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
            OnAJAXError("IDS_GLOBAL.getHostClient", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_GLOBAL.prototype.getParkStateApply = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/global/park_state/apply',
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
            OnAJAXError("IDS_GLOBAL.getParkStateApply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_GLOBAL.prototype.postParkStateApply = function (id, callback) {
    $.ajax({
        url: '../../api/global/park_state/',
        type: 'POST',
        data: JSON.stringify(id),
        async: true,
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError("IDS_GLOBAL.postParkStateApply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_GLOBAL.prototype.deleteParkStateApply = function (id, callback) {
    $.ajax({
        url: '../../api/global/park_state/'+ id,
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
            OnAJAXError("IDS_GLOBAL.deleteParkStateApply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_GLOBAL.prototype.clearParkStateApply = function (callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/global/park_state/clear',
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
            OnAJAXError("IDS_GLOBAL.clearParkStateApply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};