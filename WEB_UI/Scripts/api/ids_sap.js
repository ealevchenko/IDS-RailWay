// Подключите common.js
// Подключите shared.js

var IDS_SAP = function (lang) {
    this.lang = lang;

};

/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= SAP Входящая поставка ======================================

//Сделать запрос на Web сервис SAP и получить текущую строку САП входящие поставки
IDS_SAP.prototype.getCurrentIncomingSupplyOfWebSAP = function (incoming_supply, callback) {
    $.ajax({
        url: '../../api/ids/sap/web/incoming_supply/',
        type: 'POST',
        data: JSON.stringify(incoming_supply),
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
            OnAJAXError("IDS_SAP.getCurrentIncomingSupplyOfWebSAP", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
