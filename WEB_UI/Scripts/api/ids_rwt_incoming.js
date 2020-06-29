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
//======= Arrival_UZ_Document (ЭПД УЗ по прибытию) ======================================
// Получить все документы
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить документ
IDS_RWT_INCOMING.prototype.getArrival_UZ_DocumentOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_DocumentOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить документ по id_doc УЗ
IDS_RWT_INCOMING.prototype.getArrival_UZ_DocumentOfID_DOC_UZ = function (id_doc, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document/id_doc/' + id_doc,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_DocumentOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить документ по накладной УЗ
IDS_RWT_INCOMING.prototype.getArrival_UZ_DocumentOfNumDoc = function (num_doc, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document/num_doc/' + num_doc,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_DocumentOfNumDoc", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить документ
IDS_RWT_INCOMING.prototype.postArrival_UZ_Document = function (document, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document/',
        type: 'POST',
        data: JSON.stringify(document),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить документ 
IDS_RWT_INCOMING.prototype.putArrival_UZ_Document = function (document, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document/id' + document.id,
        data: JSON.stringify(document),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить документ  
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Document = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Document_Pay (Платежки по плательщикам ЭПД УЗ по прибытию) ======================================
// Получить все платежки
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_Pay = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_pay/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_PayOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_pay/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_PayOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id документа
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_PayOfID_Document = function (id_document, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_pay/document/id/' + id_document,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_PayOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежку
IDS_RWT_INCOMING.prototype.postArrival_UZ_Document_Pay = function (pay, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_pay/',
        type: 'POST',
        data: JSON.stringify(pay),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежки
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Document_Pay = function (list_pay, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_pay/list/',
        type: 'POST',
        data: JSON.stringify(list_pay),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить платежку
IDS_RWT_INCOMING.prototype.putArrival_UZ_Document_Pay = function (pay, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document_pay/id' + pay.id,
        data: JSON.stringify(pay),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Document_Pay = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_pay/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Document_Acts (Акты по ЭПД УЗ по прибытию (не досылочные)) ======================================
// Получить все акты
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_Acts = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_acts/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акт по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_ActsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_acts/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_ActsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акты по id документа
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_ActsOfID_Document = function (id_document, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_acts/document/id/' + id_document,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_ActsOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акт
IDS_RWT_INCOMING.prototype.postArrival_UZ_Document_Acts = function (act, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_acts/',
        type: 'POST',
        data: JSON.stringify(act),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акты
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Document_Acts = function (list_act, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_acts/list/',
        type: 'POST',
        data: JSON.stringify(list_act),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить акт
IDS_RWT_INCOMING.prototype.putArrival_UZ_Document_Acts = function (act, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document_acts/id' + act.id,
        data: JSON.stringify(act),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить акт
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Document_Acts = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_acts/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Document_Docs (Доки по ЭПД УЗ по прибытию (не досылочные)) ======================================
// Получить все доки
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_Docs = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_docs/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить док по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_DocsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_DocsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить доки по id документа
IDS_RWT_INCOMING.prototype.getArrival_UZ_Document_DocsOfID_Document = function (id_document, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_document_docs/document/id/' + id_document,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Document_DocsOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить док
IDS_RWT_INCOMING.prototype.postArrival_UZ_Document_Docs = function (doc, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_docs/',
        type: 'POST',
        data: JSON.stringify(doc),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить доки
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Document_Docs = function (list_doc, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_docs/list/',
        type: 'POST',
        data: JSON.stringify(list_doc),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить док
IDS_RWT_INCOMING.prototype.putArrival_UZ_Document_Docs = function (doc, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document_docs/id' + doc.id,
        data: JSON.stringify(doc),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить док
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Document_Docs = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_docs/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon (ЭПД УЗ по прибытию) ======================================
// Получить все вагоны
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_VagonOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_VagonOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все вагоны пренадлежащие указаному документу
IDS_RWT_INCOMING.prototype.getArrival_UZ_VagonOfDocument = function (id_doc, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon/document/id/' + id_doc,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_VagonOfDocument", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон пренадлежащий указаному документу поиск по номеру вагона
IDS_RWT_INCOMING.prototype.getArrival_UZ_VagonOfDocumentNumVagon = function (id_doc, num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon/document/id/'+id_doc+'/vagon/num/' + num,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_VagonOfDocumentNumVagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагон
IDS_RWT_INCOMING.prototype.postArrival_UZ_Vagon = function (vagon, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon/',
        type: 'POST',
        data: JSON.stringify(vagon),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагоны
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Vagon = function (list_vagon, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon/list/',
        type: 'POST',
        data: JSON.stringify(list_vagon),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагон 
IDS_RWT_INCOMING.prototype.putArrival_UZ_Vagon = function (vagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon/id' + vagon.id,
        data: JSON.stringify(vagon),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить вагон  
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Vagon = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon_Pay (Платежки по плательщикам ЭПД УЗ по прибытию) ======================================
// Получить все платежки
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_Pay = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_PayOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_PayOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id вагона
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_PayOfID_Vagon = function (id_vagon, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/vagon/id/' + id_vagon,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_PayOfID_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежку
IDS_RWT_INCOMING.prototype.postArrival_UZ_Vagon_Pay = function (pay, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/',
        type: 'POST',
        data: JSON.stringify(pay),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежки
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Vagon_Pay = function (list_pay, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/list/',
        type: 'POST',
        data: JSON.stringify(list_pay),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить платежку
IDS_RWT_INCOMING.prototype.putArrival_UZ_Vagon_Pay = function (pay, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/id' + pay.id,
        data: JSON.stringify(pay),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Vagon_Pay = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon_Acts (Акты по ЭПД УЗ по прибытию (не досылочные)) ======================================
// Получить все акты
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_Acts = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акт по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_ActsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_ActsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акты по id вагона
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_ActsOfID_Vagon = function (id_vagon, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/vagon/id/' + id_vagon,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_ActsOfID_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акт
IDS_RWT_INCOMING.prototype.postArrival_UZ_Vagon_Acts = function (act, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/',
        type: 'POST',
        data: JSON.stringify(act),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акты
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Vagon_Acts = function (list_act, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/list/',
        type: 'POST',
        data: JSON.stringify(list_act),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить акт
IDS_RWT_INCOMING.prototype.putArrival_UZ_Vagon_Acts = function (act, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/id' + act.id,
        data: JSON.stringify(act),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить акт
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Vagon_Acts = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon_Cont (Контейнеры на вагоне по ЭПД УЗ ) ======================================
// Получить все акты
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_Cont = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акт по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_ContOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_ContOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акты по id вагона
IDS_RWT_INCOMING.prototype.getArrival_UZ_Vagon_ContOfID_Vagon = function (id_vagon, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/vagon/id/' + id_vagon,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Vagon_ContOfID_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акт
IDS_RWT_INCOMING.prototype.postArrival_UZ_Vagon_Cont = function (cont, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/',
        type: 'POST',
        data: JSON.stringify(cont),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акты
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Vagon_Cont = function (list_cont, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/list/',
        type: 'POST',
        data: JSON.stringify(list_cont),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить акт
IDS_RWT_INCOMING.prototype.putArrival_UZ_Vagon_Cont = function (cont, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/id' + cont.id,
        data: JSON.stringify(cont),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить акт
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Vagon_Cont = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Cont_Pay (Платежки по плательщикам на контейнеры ЭПД УЗ по прибытию) ======================================
// Получить все платежки
IDS_RWT_INCOMING.prototype.getArrival_UZ_Cont_Pay = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_cont_pay/all',
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id
IDS_RWT_INCOMING.prototype.getArrival_UZ_Cont_PayOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_cont_pay/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Cont_PayOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id контейнера
IDS_RWT_INCOMING.prototype.getArrival_UZ_Cont_PayOfID_Cont = function (id_cont, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_cont_pay/cont/id/' + id_cont,
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
            OnAJAXError("IDS_RWT_INCOMING.getArrival_UZ_Cont_PayOfID_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежку
IDS_RWT_INCOMING.prototype.postArrival_UZ_Cont_Pay = function (pay, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/',
        type: 'POST',
        data: JSON.stringify(pay),
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
            OnAJAXError("IDS_RWT_INCOMING.postArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежки
IDS_RWT_INCOMING.prototype.postListArrival_UZ_Cont_Pay = function (list_pay, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/list/',
        type: 'POST',
        data: JSON.stringify(list_pay),
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
            OnAJAXError("IDS_RWT_INCOMING.postListArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить платежку
IDS_RWT_INCOMING.prototype.putArrival_UZ_Cont_Pay = function (pay, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_cont_pay/id' + pay.id,
        data: JSON.stringify(pay),
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
            OnAJAXError("IDS_RWT_INCOMING.putArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Cont_Pay = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку по контейнеру
IDS_RWT_INCOMING.prototype.deleteArrival_UZ_Cont_PayOfCont = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/cont/id' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.deleteArrival_UZ_Cont_PayOfCont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
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
// Получить последний номер по станции за текущий год
IDS_RWT_INCOMING.prototype.getCurrentNumArrivalSostavOfStation = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_sostav/current_num/station/id/' + id,
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
            OnAJAXError("IDS_RWT_INCOMING.getCurrentNumArrivalSostavOfStation", x, y, z);
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
//Добавить 
IDS_RWT_INCOMING.prototype.postUZ_DOC = function (uz_doc, callback) {
    $.ajax({
        url: '../../api/ids/rwt/uz_doc/',
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
            OnAJAXError("IDS_RWT_INCOMING.postUZ_DOC", x, y, z);
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