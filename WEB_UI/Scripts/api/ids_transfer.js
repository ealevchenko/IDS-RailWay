// Подключите common.js
// Подключите shared.js

var IDS_TRANSFER = function (lang) {
    this.lang = lang;

};

/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= Поиск и перенос ЭПД ======================================
// Найти документ в промежуточной базе, если есть - добавить или обновить в базе документов ИДС, если нет вернуть null
IDS_TRANSFER.prototype.AddUpdateUZ_DOC_To_DB_IDS = function (num, datetime, callback) {
    //var s = '../../api/ids/transfer/epd/db_uz/add_update_db_ids/num/' + num + '/datetime/' + (datetime).substring(0, 19);
    $.ajax({
        type: 'GET',
        url: '../../api/ids/transfer/epd/db_uz/add_update_db_ids/num/' + num + '/datetime/' + datetime.substring(0, 19),
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
            OnAJAXError("IDS_TRANSFER.AddUpdateUZ_DOC_To_DB_IDS", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Найти документ в промежуточной базе УЗ
IDS_TRANSFER.prototype.getUZ_DOC_DB_UZ_OfNum = function (num, datetime, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/transfer/epd/db_uz/num/' + num+ '/datetime/' + datetime.substring(0, 19),
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
            OnAJAXError("IDS_TRANSFER.getUZ_DOC_DB_UZ_OfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//Добавить или обновить в базе документов ИДС (документ типа промежуточной базы)
IDS_TRANSFER.prototype.postUZ_DOC_To_DB_IDS = function (uz_doc, callback) {
    $.ajax({
        url: '../../api/ids/transfer/db_ids/',
        type: 'POST',
        data: JSON.stringify(uz_doc),
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
            OnAJAXError("IDS_TRANSFER.postUZ_DOC_To_DB_IDS", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
