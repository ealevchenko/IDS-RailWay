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
IDS_TRANSFER.prototype.getNumEPDOfIntermediateDB = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/transfer/epd/intermediate_db/num/' + num,
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
            OnAJAXError("IDS_TRANSFER.getGetNumDoc", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
