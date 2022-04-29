// Подключите common.js
// Подключите shared.js

var IDS_SAP = function (lang) {
    this.lang = lang;

};

//TODO: !! Убрал и перенес в модуль ids_wsd;
/* ----------------------------------------------------------
AJAX функции
//-------------------------------------------------------------*/
//////======= WEb API SAP Входящая поставка ======================================
//////Сделать запрос на Web сервис SAP и получить текущую строку САП входящие поставки
////IDS_SAP.prototype.getCurrentIncomingSupplyOfWebSAP = function (incoming_supply, callback) {
////    $.ajax({
////        url: '../../api/ids/sap/web/incoming_supply/',
////        type: 'POST',
////        data: JSON.stringify(incoming_supply),
////        contentType: "application/json;charset=utf-8",
////        async: true,
////        beforeSend: function () {
////            AJAXBeforeSend();
////        },
////        success: function (data) {
////            if (typeof callback === 'function') {
////                callback(data);
////            }
////        },
////        error: function (x, y, z) {
////            LockScreenOff();
////            OnAJAXError("IDS_SAP.getCurrentIncomingSupplyOfWebSAP", x, y, z);
////        },
////        complete: function () {
////            AJAXComplete();
////        },
////    });
////};
//////Сделать запросы на Web сервис SAP и обновить строки САП входящие поставки
////IDS_SAP.prototype.getListCurrentIncomingSupplyOfWebSAP = function (list_incoming_supply, callback) {
//    $.ajax({
//        url: '../../api/ids/sap/web/incoming_supply/list',
//        type: 'POST',
//        data: JSON.stringify(list_incoming_supply),
//        contentType: "application/json;charset=utf-8",
//        async: true,
//        beforeSend: function () {
//            AJAXBeforeSend();
//        },
//        success: function (data) {
//            if (typeof callback === 'function') {
//                callback(data);
//            }
//        },
//        error: function (x, y, z) {
//            LockScreenOff();
//            OnAJAXError("IDS_SAP.getListCurrentIncomingSupplyOfWebSAP", x, y, z);
//        },
//        complete: function () {
//            AJAXComplete();
//        },
//    });
//};
//======= SAPIncomingSupply Входящая поставка ======================================


