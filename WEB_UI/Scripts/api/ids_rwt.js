// Подключите common.js
// Подключите shared.js


var IDS_RWT = function (lang) {
    this.lang = lang;
    this.ids_tr = new IDS_TRANSFER(lang);   // Создадим класс IDS_TRANSFER 
    this.ids_sap = new IDS_SAP(lang);       // Создадим класс IDS_SAP 

    this.ids_dir = new IDS_DIRECTORY(lang); // Создадим класс IDS_DIRECTORY
    this.uz_dir = new UZ_DIRECTORY(lang);   // Создадим класс UZ_DIRECTORY
    // Статус сотава
    this.list_status_arrival = [
        { code: 0, name: 'Not', status_ru: 'Не обрабатывался', status_en: 'Not processed' },
        { code: 1, name: 'InWork', status_ru: 'В работе', status_en: 'In work' },
        { code: 2, name: 'Accepted', status_ru: 'Принят', status_en: 'Accepted' },
        { code: 3, name: 'Rejected', status_ru: 'Отклонён', status_en: 'Rejected' },
    ];
};

IDS_RWT.list_arrival = [];
IDS_RWT.list_instructional_letters = [];
IDS_RWT.list_instructional_letters_wagon = [];

// Загрузить указаные справочники
IDS_RWT.prototype.load = function (list_rwt, list_ids_dir, list_uz_dir, lockOff, callback) {
    var count = list_rwt.length + (list_ids_dir.length > 0 ? 1 : 0) + (list_uz_dir.length > 0 ? 1 : 0);
    if (count === 0) {
        if (typeof callback === 'function') {
            if (lockOff) { LockScreenOff(); }
            callback();
        }
    }
    var obj = this;
    // Загрузка справочников ИДС
    if (list_ids_dir.length > 0) {
        obj.ids_dir.load(list_ids_dir, lockOff, function () {
            count -= 1;
            if (count === 0) {
                if (typeof callback === 'function') {
                    if (lockOff) { LockScreenOff(); }
                    callback();
                }
            }
        });
    }
    // Загрузка справочников УЗ
    if (list_uz_dir.length > 0) {
        obj.uz_dir.load(list_uz_dir, lockOff, function () {
            count -= 1;
            if (count === 0) {
                if (typeof callback === 'function') {
                    if (lockOff) { LockScreenOff(); }
                    callback();
                }
            }
        });
    }
    // Згрузка собственных таблиц
    $.each(list_rwt, function (i, el) {
        if (el === 'arrival') {
            IDS_RWT.prototype.getArrivalSostav(function (result_arrival) {
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
        if (el === 'instructional_letters') {
            IDS_RWT.prototype.getInstructionalLetters(function (result_instructional_letters) {
                obj.list_instructional_letters = result_instructional_letters;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback(result_instructional_letters);
                    }
                }
            });
        };
        if (el === 'instructional_letters_wagon') {
            IDS_RWT.prototype.getInstructionalLettersWagon(function (result_instructional_letters_wagon) {
                obj.list_instructional_letters_wagon = result_instructional_letters_wagon;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback(result_instructional_letters_wagon);
                    }
                }
            });
        };
    });
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= SAPIncomingSupply (SAP Входящие поставки) ======================================
// Получить все поставки
IDS_RWT.prototype.getSAPIncomingSupply = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/sap/incoming_supply/all',
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
            OnAJAXError("IDS_RWT.getSAPIncomingSupply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить поставку по id
IDS_RWT.prototype.getSAPIncomingSupplyOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/sap/incoming_supply/id/' + id,
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
            OnAJAXError("IDS_RWT.getSAPIncomingSupplyOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить поставку по id_arrival_car
IDS_RWT.prototype.getSAPIncomingSupplyOfIDArrivalCar = function (id_arrival_car, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/sap/incoming_supply/arrival_car/id/' + id_arrival_car,
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
            OnAJAXError("IDS_RWT.getSAPIncomingSupplyOfIDArrivalCar", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить поставки по номеру вагона
IDS_RWT.prototype.getSAPIncomingSupplyOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/sap/incoming_supply/num/' + num,
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
            OnAJAXError("IDS_RWT.getSAPIncomingSupplyOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить поставку
IDS_RWT.prototype.postSAPIncomingSupply = function (sap, callback) {
    $.ajax({
        url: '../../api/ids/rwt/sap/incoming_supply/',
        type: 'POST',
        data: JSON.stringify(sap),
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
            OnAJAXError("IDS_RWT.postSAPIncomingSupply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить поставку
IDS_RWT.prototype.putSAPIncomingSupply = function (sap, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/sap/incoming_supply/id/' + sap.id,
        data: JSON.stringify(sap),
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
            OnAJAXError("IDS_RWT.putSAPIncomingSupply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить поставку
IDS_RWT.prototype.deleteSAPIncomingSupply = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/sap/incoming_supply/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteSAPIncomingSupply", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= InstructionalLetters (Инструктивные письма) ======================================
// Получить все письма
IDS_RWT.prototype.getInstructionalLetters = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/instructional_letters/all',
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
            OnAJAXError("IDS_RWT.getInstructionalLetters", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить письмо
IDS_RWT.prototype.getInstructionalLettersOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/instructional_letters/id/' + id,
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
            OnAJAXError("IDS_RWT.getInstructionalLettersOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//// Получить письмо
//IDS_RWT.prototype.getInstructionalLettersOfNumDate = function (num, date, callback) {
//    $.ajax({
//        type: 'GET',
//        url: '../../api/ids/rwt/instructional_letters/num/' + num + '/date/' + toISOStringTZ(date).substring(0, 19),
//        async: true,
//        dataType: 'json',
//        beforeSend: function () {
//            AJAXBeforeSend();
//        },
//        success: function (data) {
//            if (typeof callback === 'function') {
//                callback(data);
//            }
//        },
//        error: function (x, y, z) {
//            OnAJAXError("IDS_RWT.getInstructionalLettersOfNumDate", x, y, z);
//        },
//        complete: function () {
//            AJAXComplete();
//        },
//    });
//};
// Получить письмо
IDS_RWT.prototype.getInstructionalLettersOfNumDate = function (num, date, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters/num_date/',
        type: 'POST',
        data: JSON.stringify({ num: num, date: date }),
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
            OnAJAXError("IDS_RWT.getInstructionalLettersOfNumDate", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Добавить письмо
IDS_RWT.prototype.postInstructionalLetters = function (letters, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters/',
        type: 'POST',
        data: JSON.stringify(letters),
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
            OnAJAXError("IDS_RWT.postInstructionalLetters", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить письмо
IDS_RWT.prototype.putInstructionalLetters = function (letters, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/instructional_letters/id/' + letters.id,
        data: JSON.stringify(letters),
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
            OnAJAXError("IDS_RWT.putInstructionalLetters", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить письмо
IDS_RWT.prototype.deleteInstructionalLetters = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteInstructionalLetters", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= InstructionalLettersWagon (Инструктивные письма - вагоны) ======================================
// Получить все вагоны по всем письмам
IDS_RWT.prototype.getInstructionalLettersWagon = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/instructional_letters_wagon/all',
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
            OnAJAXError("IDS_RWT.getInstructionalLettersWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон по id
IDS_RWT.prototype.getInstructionalLettersWagonOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/instructional_letters_wagon/id/' + id,
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
            OnAJAXError("IDS_RWT.getInstructionalLettersWagonOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагоны по id письма
IDS_RWT.prototype.getInstructionalLettersWagonOfIDLetter = function (id_letter, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/instructional_letters_wagon/letter/id/' + id_letter,
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
            OnAJAXError("IDS_RWT.getInstructionalLettersWagonOfIDLetter", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагоны с открытыми письмами по номерам
IDS_RWT.prototype.getOpenInstructionalLettersWagonOfNums = function (list_nums, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters_wagon/open/list_nums/',
        type: 'POST',
        data: JSON.stringify(list_nums),
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
            OnAJAXError("IDS_RWT.getInstructionalLettersWagonOfNums", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагон
IDS_RWT.prototype.postInstructionalLettersWagon = function (wagon, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters_wagon/',
        type: 'POST',
        data: JSON.stringify(wagon),
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
            OnAJAXError("IDS_RWT.postInstructionalLettersWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагоны
IDS_RWT.prototype.postListInstructionalLettersWagon = function (list_wagon, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters_wagon/list/',
        type: 'POST',
        data: JSON.stringify(list_wagon),
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
            OnAJAXError("IDS_RWT.postListInstructionalLettersWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагон
IDS_RWT.prototype.putInstructionalLettersWagon = function (wagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/instructional_letters_wagon/id/' + wagon.id,
        data: JSON.stringify(wagon),
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
            OnAJAXError("IDS_RWT.putInstructionalLettersWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагоны
IDS_RWT.prototype.putListInstructionalLettersWagon = function (list_wagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/instructional_letters_wagon/list/',
        data: JSON.stringify(list_wagon),
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
            OnAJAXError("IDS_DIRECTORY.putListInstructionalLettersWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить вагон
IDS_RWT.prototype.deleteInstructionalLettersWagon = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/instructional_letters_wagon/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteInstructionalLettersWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======================================================================================================
//                                  РАЗДЕЛ ДОКУМЕНТЫ ПРИНЯТЫХ ВАГОНОВ
//======= Arrival_UZ_Document (ЭПД УЗ по прибытию) ======================================
// Получить все документы
IDS_RWT.prototype.getArrival_UZ_Document = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить документ
IDS_RWT.prototype.getArrival_UZ_DocumentOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_DocumentOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить документ по id_doc УЗ
IDS_RWT.prototype.getArrival_UZ_DocumentOfID_DOC_UZ = function (id_doc, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_DocumentOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить документ по накладной УЗ
IDS_RWT.prototype.getArrival_UZ_DocumentOfNumDoc = function (num_doc, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_DocumentOfNumDoc", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить документ
IDS_RWT.prototype.postArrival_UZ_Document = function (document, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить документ 
IDS_RWT.prototype.putArrival_UZ_Document = function (document, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document/id/' + document.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить документ  
IDS_RWT.prototype.deleteArrival_UZ_Document = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Document", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Document_Pay (Платежки по плательщикам ЭПД УЗ по прибытию) ======================================
// Получить все платежки
IDS_RWT.prototype.getArrival_UZ_Document_Pay = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id
IDS_RWT.prototype.getArrival_UZ_Document_PayOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_PayOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id документа
IDS_RWT.prototype.getArrival_UZ_Document_PayOfID_Document = function (id_document, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_PayOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежку
IDS_RWT.prototype.postArrival_UZ_Document_Pay = function (pay, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежки
IDS_RWT.prototype.postListArrival_UZ_Document_Pay = function (list_pay, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить платежку
IDS_RWT.prototype.putArrival_UZ_Document_Pay = function (pay, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document_pay/id/' + pay.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку
IDS_RWT.prototype.deleteArrival_UZ_Document_Pay = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_pay/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Document_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Document_Acts (Акты по ЭПД УЗ по прибытию (не досылочные)) ======================================
// Получить все акты
IDS_RWT.prototype.getArrival_UZ_Document_Acts = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акт по id
IDS_RWT.prototype.getArrival_UZ_Document_ActsOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_ActsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акты по id документа
IDS_RWT.prototype.getArrival_UZ_Document_ActsOfID_Document = function (id_document, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_ActsOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акт
IDS_RWT.prototype.postArrival_UZ_Document_Acts = function (act, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акты
IDS_RWT.prototype.postListArrival_UZ_Document_Acts = function (list_act, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить акт
IDS_RWT.prototype.putArrival_UZ_Document_Acts = function (act, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document_acts/id/' + act.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить акт
IDS_RWT.prototype.deleteArrival_UZ_Document_Acts = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_acts/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Document_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Document_Docs (Доки по ЭПД УЗ по прибытию (не досылочные)) ======================================
// Получить все доки
IDS_RWT.prototype.getArrival_UZ_Document_Docs = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить док по id
IDS_RWT.prototype.getArrival_UZ_Document_DocsOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_DocsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить доки по id документа
IDS_RWT.prototype.getArrival_UZ_Document_DocsOfID_Document = function (id_document, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Document_DocsOfID_DOC_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить док
IDS_RWT.prototype.postArrival_UZ_Document_Docs = function (doc, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить доки
IDS_RWT.prototype.postListArrival_UZ_Document_Docs = function (list_doc, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить док
IDS_RWT.prototype.putArrival_UZ_Document_Docs = function (doc, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_document_docs/id/' + doc.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить док
IDS_RWT.prototype.deleteArrival_UZ_Document_Docs = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_document_docs/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Document_Docs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon (ЭПД УЗ по прибытию) ======================================
// Получить все вагоны
IDS_RWT.prototype.getArrival_UZ_Vagon = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон по id
IDS_RWT.prototype.getArrival_UZ_VagonOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_VagonOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все вагоны пренадлежащие указаному документу
IDS_RWT.prototype.getArrival_UZ_VagonOfDocument = function (id_doc, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_VagonOfDocument", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон пренадлежащий указаному документу поиск по номеру вагона
IDS_RWT.prototype.getArrival_UZ_VagonOfDocumentNumVagon = function (id_doc, num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_uz_vagon/document/id/' + id_doc + '/vagon/num/' + num,
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
            OnAJAXError("IDS_RWT.getArrival_UZ_VagonOfDocumentNumVagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагон
IDS_RWT.prototype.postArrival_UZ_Vagon = function (vagon, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить вагоны
IDS_RWT.prototype.postListArrival_UZ_Vagon = function (list_vagon, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагон 
IDS_RWT.prototype.putArrival_UZ_Vagon = function (vagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon/id/' + vagon.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагоны
IDS_RWT.prototype.putListArrival_UZ_Vagon = function (list_wagon, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon/list/',
        data: JSON.stringify(list_wagon),
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
            OnAJAXError("IDS_DIRECTORY.putListArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить вагон  
IDS_RWT.prototype.deleteArrival_UZ_Vagon = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Вернуть копию без связей
IDS_RWT.prototype.getCloneArrival_UZ_Vagon = function (vagon) {
    if (!vagon) return null;
    return {
        id: vagon.id,
        id_document: vagon.id_document,
        num: vagon.num,
        id_arrival: vagon.id_arrival,
        id_car: vagon.id_car,
        id_condition: vagon.id_condition,
        id_type: vagon.id_type,
        gruzp: vagon.gruzp,
        u_tara: vagon.u_tara,
        ves_tary_arc: vagon.ves_tary_arc,
        route: vagon.route,
        note_vagon: vagon.note_vagon,
        id_cargo: vagon.id_cargo,
        id_cargo_gng: vagon.id_cargo_gng,
        id_certification_data: vagon.id_certification_data,
        id_commercial_condition: vagon.id_commercial_condition,
        kol_pac: vagon.kol_pac,
        pac: vagon.pac,
        vesg: vagon.vesg,
        vesg_reweighing: vagon.vesg_reweighing,
        nom_zpu: vagon.nom_zpu,
        danger: vagon.danger,
        danger_kod: vagon.danger_kod,
        cargo_returns: vagon.cargo_returns,
        id_station_on_amkr: vagon.id_station_on_amkr,
        id_division_on_amkr: vagon.id_division_on_amkr,
        empty_car: vagon.empty_car,
        kol_conductor: vagon.kol_conductor,
        create: vagon.create,
        create_user: vagon.create_user,
        change: vagon.change,
        change_user: vagon.change_user,
    };
}
//======= Arrival_UZ_Vagon_Pay (Платежки по плательщикам ЭПД УЗ по прибытию) ======================================
// Получить все платежки
IDS_RWT.prototype.getArrival_UZ_Vagon_Pay = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id
IDS_RWT.prototype.getArrival_UZ_Vagon_PayOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_PayOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id вагона
IDS_RWT.prototype.getArrival_UZ_Vagon_PayOfID_Vagon = function (id_vagon, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_PayOfID_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежку
IDS_RWT.prototype.postArrival_UZ_Vagon_Pay = function (pay, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежки
IDS_RWT.prototype.postListArrival_UZ_Vagon_Pay = function (list_pay, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить платежку
IDS_RWT.prototype.putArrival_UZ_Vagon_Pay = function (pay, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/id/' + pay.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку
IDS_RWT.prototype.deleteArrival_UZ_Vagon_Pay = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежки по вагону
IDS_RWT.prototype.deleteArrival_UZ_Vagon_PayOfVagon = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_pay/vagon/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon_PayOfVagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon_Acts (Акты по ЭПД УЗ по прибытию (не досылочные)) ======================================
// Получить все акты
IDS_RWT.prototype.getArrival_UZ_Vagon_Acts = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акт по id
IDS_RWT.prototype.getArrival_UZ_Vagon_ActsOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_ActsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить акты по id вагона
IDS_RWT.prototype.getArrival_UZ_Vagon_ActsOfID_Vagon = function (id_vagon, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_ActsOfID_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акт
IDS_RWT.prototype.postArrival_UZ_Vagon_Acts = function (act, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить акты
IDS_RWT.prototype.postListArrival_UZ_Vagon_Acts = function (list_act, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить акт
IDS_RWT.prototype.putArrival_UZ_Vagon_Acts = function (act, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/id/' + act.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить акт
IDS_RWT.prototype.deleteArrival_UZ_Vagon_Acts = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon_Acts", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить акты на вагон
IDS_RWT.prototype.deleteArrival_UZ_Vagon_ActsOfVagon = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_acts/vagon/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon_ActsOfVagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Vagon_Cont (Контейнеры на вагоне по ЭПД УЗ ) ======================================
// Получить все контейнера
IDS_RWT.prototype.getArrival_UZ_Vagon_Cont = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить контейнер по id
IDS_RWT.prototype.getArrival_UZ_Vagon_ContOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_ContOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить контейнера по id вагона
IDS_RWT.prototype.getArrival_UZ_Vagon_ContOfID_Vagon = function (id_vagon, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Vagon_ContOfID_Vagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить контейнер
IDS_RWT.prototype.postArrival_UZ_Vagon_Cont = function (cont, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить контейнера
IDS_RWT.prototype.postListArrival_UZ_Vagon_Cont = function (list_cont, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить контейнер
IDS_RWT.prototype.putArrival_UZ_Vagon_Cont = function (cont, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/id/' + cont.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить контейнер по id
IDS_RWT.prototype.deleteArrival_UZ_Vagon_Cont = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить контейнера по id вагона
IDS_RWT.prototype.deleteArrival_UZ_Vagon_ContOfVagon = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_vagon_cont/vagon/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Vagon_ContOfVagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Arrival_UZ_Cont_Pay (Платежки по плательщикам на контейнеры ЭПД УЗ по прибытию) ======================================
// Получить все платежки
IDS_RWT.prototype.getArrival_UZ_Cont_Pay = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id
IDS_RWT.prototype.getArrival_UZ_Cont_PayOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Cont_PayOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить платежку по id контейнера
IDS_RWT.prototype.getArrival_UZ_Cont_PayOfID_Cont = function (id_cont, callback) {
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
            OnAJAXError("IDS_RWT.getArrival_UZ_Cont_PayOfID_Cont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежку
IDS_RWT.prototype.postArrival_UZ_Cont_Pay = function (pay, callback) {
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
            OnAJAXError("IDS_RWT.postArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить платежки
IDS_RWT.prototype.postListArrival_UZ_Cont_Pay = function (list_pay, callback) {
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
            OnAJAXError("IDS_RWT.postListArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить платежку
IDS_RWT.prototype.putArrival_UZ_Cont_Pay = function (pay, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/arrival_uz_cont_pay/id/' + pay.id,
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
            OnAJAXError("IDS_RWT.putArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку
IDS_RWT.prototype.deleteArrival_UZ_Cont_Pay = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Cont_Pay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежку по контейнеру
IDS_RWT.prototype.deleteArrival_UZ_Cont_PayOfCont = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/cont/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Cont_PayOfCont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить платежки по списку id контейнеров
IDS_RWT.prototype.deleteArrival_UZ_Cont_PayOfListCont = function (list_cont, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_uz_cont_pay/cont/list/',
        data: JSON.stringify(list_cont),
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
            OnAJAXError("IDS_RWT.deleteArrival_UZ_Cont_PayOfListCont", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======================================================================================================
// РАЗДЕЛ ПРИБЫТИЕ
//======= ArrivalSostav (Таблица составов) =============================================================
// Получить все составы
IDS_RWT.prototype.getArrivalSostav = function (start, stop, callback) {
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
            OnAJAXError("IDS_RWT.getArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все составы представление 
IDS_RWT.prototype.getViewArrivalSostav = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_sostav/view/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXError("IDS_RWT.getViewArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все составы за период времени принятые на станцию
IDS_RWT.prototype.getArrivalSostavOfDatePeriodIDStationOn = function (start, stop, id_station, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_sostav/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19) + '/station/amkr/id/' + id_station,
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
            OnAJAXError("IDS_RWT.getArrivalSostavOfDatePeriodIDStationOn", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состав
IDS_RWT.prototype.getArrivalSostavOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrivalSostavOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить последний номер по станции за текущий год
IDS_RWT.prototype.getCurrentNumArrivalSostavOfStation = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getCurrentNumArrivalSostavOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_RWT.prototype.putArrivalSostav = function (arrival_sostav, callback) {
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
            OnAJAXError("IDS_RWT.putArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_RWT.prototype.deleteArrivalSostav = function (id, callback) {
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
            OnAJAXError("IDS_RWT.deleteArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_RWT.prototype.postArrivalSostav = function (arrival_sostav, callback) {
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
            OnAJAXError("IDS_RWT.postArrivalSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= ArrivalCars (Таблица вагонов состава) ======================================
// Получить все вагоны
IDS_RWT.prototype.getArrivalCars = function (callback) {
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
            OnAJAXError("IDS_RWT.getArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагоны сотава
IDS_RWT.prototype.getArrivalCarsOfSostav = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrivalCarsOfSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон
IDS_RWT.prototype.getArrivalCarsOfID = function (id, callback) {
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
            OnAJAXError("IDS_RWT.getArrivalCarsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон
IDS_RWT.prototype.getArrivalCarsOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_cars/num/' + num,
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
            OnAJAXError("IDS_RWT.getArrivalCarsOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить перечень вагонов за указаный период выбранные вагоны
IDS_RWT.prototype.getArrivalCarsOfPeriodNums = function (start, stop, nums, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/arrival_cars/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19) + '/nums/' + nums,
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
            OnAJAXError("IDS_RWT.getArrivalCarsOfPeriodNums", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить перечень вагонов за указаный период выбранные вагоны
IDS_RWT.prototype.postArrivalCarsOfPeriodNums = function (period, callback) {
    $.ajax({
        url: '../../api/ids/rwt/arrival_cars/period/',
        type: 'POST',
        data: JSON.stringify(period),
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
            OnAJAXError("IDS_RWT.postArrivalCarsOfPeriodNums", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_RWT.prototype.putArrivalCars = function (arrival_cars, callback) {
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
            OnAJAXError("IDS_RWT.putArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_RWT.prototype.deleteArrivalCars = function (id, callback) {
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
            OnAJAXError("IDS_RWT.deleteArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить вагоны состава
IDS_RWT.prototype.deleteArrivalCarsOfSostav = function (id_sostav, callback) {
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
            OnAJAXError("IDS_RWT.deleteArrivalCarsOfSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_RWT.prototype.postArrivalCars = function (arrival_cars, callback) {
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
            OnAJAXError("IDS_RWT.postArrivalCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= UZ_DOC (Таблица ЭПД принятых вагонов) ======================================
// Получить все документы
IDS_RWT.prototype.getUZ_DOC = function (callback) {
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
            OnAJAXError("IDS_RWT.getUZ_DOC", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить строку ЭПД принятого вагона по номеру документа (внутренему номеру документа)
IDS_RWT.prototype.getUZ_DOCOfNum = function (num, callback) {
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
            OnAJAXError("IDS_RWT.getUZ_DOCOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить разпарсеный ЭПД принятого вагона по номеру документа
IDS_RWT.prototype.getOTPR_UZ_DOCOfNum = function (num, callback) {
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
            OnAJAXError("IDS_RWT.getOTPR_UZ_DOCOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//П олучить строку ЭПД принятого вагона по номеру накладной УЗ
IDS_RWT.prototype.getUZ_DOCOfNum_UZ = function (num_uz, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/uz_doc/num_uz/' + num_uz,
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
            OnAJAXError("IDS_RWT.getUZ_DOCOfNum_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить разпарсеный ЭПД принятого вагона по номеру документа
IDS_RWT.prototype.getOTPR_UZ_DOCOfNum_UZ = function (num_uz, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/uz_doc/otpr/num_uz/' + num_uz,
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
            OnAJAXError("IDS_RWT.getOTPR_UZ_DOCOfNum_UZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_RWT.prototype.postUZ_DOC = function (uz_doc, callback) {
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
            OnAJAXError("IDS_RWT.postUZ_DOC", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======================================================================================================
// РАЗДЕЛ ОТПРАВКА
//======= OutgoingSostav (Таблица составов на отправку) ======================================
// Получить все составы
IDS_RWT.prototype.getOutgoingSostav = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_sostav/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXError("IDS_RWT.getOutgoingSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все составы (View)
IDS_RWT.prototype.getViewOutgoingSostav = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_sostav/view/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXError("IDS_RWT.getViewOutgoingSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все составы (View)
IDS_RWT.prototype.getViewOutgoingSostavOfPeriodStation = function (start, stop, id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_sostav/view/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19) + '/station/amkr/id/' + id,
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
            OnAJAXError("IDS_RWT.getViewOutgoingSostavOfPeriodStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состав
IDS_RWT.prototype.getOutgoingSostavOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_sostav/id/' + id,
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
            OnAJAXError("IDS_RWT.getOutgoingSostavOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить составы с указаным статусом
IDS_RWT.prototype.getOutgoingSostavOfStatus = function (status, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_sostav/view/sostav/status/' + status,
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
            OnAJAXError("IDS_RWT.getOutgoingSostavOfStatus", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить 
IDS_RWT.prototype.putOutgoingSostav = function (outgoing_sostav, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/outgoing_sostav/id/' + outgoing_sostav.id,
        data: JSON.stringify(outgoing_sostav),
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
            OnAJAXError("IDS_RWT.putOutgoingSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить 
IDS_RWT.prototype.deleteOutgoingSostav = function (id, callback) {
    $.ajax({
        url: '../../api/ids/rwt/outgoing_sostav/id/' + id,
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
            OnAJAXError("IDS_RWT.deleteOutgoingSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить 
IDS_RWT.prototype.postOutgoingSostav = function (outgoing_sostav, callback) {
    $.ajax({
        url: '../../api/ids/rwt/outgoing_sostav/',
        type: 'POST',
        data: JSON.stringify(outgoing_sostav),
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
            OnAJAXError("IDS_RWT.postOutgoingSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Вернуть копию без связй
IDS_RWT.prototype.getCloneOutgoingSostav = function (sostav) {
    if (!sostav) return null;
    return {
        id: sostav.id,
        num_doc: sostav.num_doc,
        id_station_from: sostav.id_station_from,
        id_way_from: sostav.id_way_from,
        id_station_on: sostav.id_station_on,
        date_readiness_amkr: sostav.date_readiness_amkr,
        date_end_inspection_acceptance_delivery: sostav.date_end_inspection_acceptance_delivery,
        date_end_inspection_loader: sostav.date_end_inspection_loader,
        date_end_inspection_vagonnik: sostav.date_end_inspection_vagonnik,
        date_show_wagons: sostav.date_show_wagons,
        date_readiness_uz: sostav.date_readiness_uz,
        date_outgoing: sostav.date_outgoing,
        date_outgoing_act: sostav.date_outgoing_act,
        date_departure_amkr: sostav.date_departure_amkr,
        composition_index: sostav.composition_index,
        status: sostav.status,
        note: sostav.note,
        create: sostav.create,
        create_user: sostav.create_user,
        change: sostav.change,
        change_user: sostav.change_user,
        route_sign: sostav.route_sign,
        vagonnik_user: sostav.vagonnik_user,
    }
};

//======= OutgoingCars (Таблица вагонов состава) ======================================
// Получить все вагоны
IDS_RWT.prototype.getOutgoingCars = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_cars/all',
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
            OnAJAXError("IDS_RWT.getOutgoingCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагоны сотава
IDS_RWT.prototype.getOutgoingCarsOfSostav = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_cars/sostav/id/' + id,
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
            OnAJAXError("IDS_RWT.getOutgoingCarsOfSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагон по id
IDS_RWT.prototype.getOutgoingCarsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_cars/id/' + id,
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
            OnAJAXError("IDS_RWT.getOutgoingCarsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить вагон для предъявления
IDS_RWT.prototype.putOutgoingCars = function (outgoing_cars, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/outgoing_cars/id/' + outgoing_cars.id,
        data: JSON.stringify(outgoing_cars),
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
            OnAJAXError("IDS_RWT.putOutgoingCars", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Вернуть копию без связй
IDS_RWT.prototype.getCloneOutgoingCars = function (car) {
    if (!car) return null;
    return {
        id: car.id,
        id_outgoing: car.id_outgoing,
        num: car.num,
        position: car.position,
        position_outgoing: car.position_outgoing,
        num_doc: car.num_doc,
        note: car.note,
        date_outgoing_act: car.date_outgoing_act,
        outgoing: car.outgoing,
        outgoing_user: car.outgoing_user,
        create: car.create,
        create_user: car.create_user,
        change: car.change,
        change_user: car.change_user,
        id_outgoing_uz_vagon: car.id_outgoing_uz_vagon,
        id_outgoing_detention: car.id_outgoing_detention,
        id_reason_discrepancy_amkr: car.id_reason_discrepancy_amkr,
        id_reason_discrepancy_uz: car.id_reason_discrepancy_uz,
        id_outgoing_return_start: car.id_outgoing_return_start,
        id_outgoing_return_stop: car.id_outgoing_return_stop,
        parent_wir_id: car.parent_wir_id,
        note_vagonnik: car.note_vagonnik,
    }
};
//======= OutgoingDetentionReturn (Таблица задержаных-возвращеных вагонов) ======================================
// Получить все задержания и возвраты
IDS_RWT.prototype.getOutgoingDetentionReturn = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_detention_return/all',
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
            OnAJAXError("IDS_RWT.getOutgoingDetentionReturn", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить вагоны по id задержания и возврата
IDS_RWT.prototype.getOutgoingDetentionReturnOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_detention_return/id/' + id,
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
            OnAJAXError("IDS_RWT.getOutgoingDetentionReturnOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить все задержания и возвраты по номеру вагона 
IDS_RWT.prototype.getOutgoingDetentionReturnOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/outgoing_detention_return/num/' + num,
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
            OnAJAXError("IDS_RWT.getOutgoingDetentionReturnOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить задержание или возврат
IDS_RWT.prototype.postOutgoingDetentionReturn = function (obj, callback) {
    $.ajax({
        url: '../../api/ids/rwt/outgoing_detention_return/',
        type: 'POST',
        data: JSON.stringify(obj),
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
            OnAJAXError("IDS_RWT.postOutgoingDetentionReturn", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить задержание или возврат
IDS_RWT.prototype.putOutgoingDetentionReturn = function (obj, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/rwt/outgoing_detention_return/id/' + obj.id,
        data: JSON.stringify(obj),
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
            OnAJAXError("IDS_RWT.putOutgoingDetentionReturn", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция добавить или обновить задержание 
IDS_RWT.prototype.postUpdateOutgoingDetention = function (operation_detention, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/detention/',
        type: 'POST',
        data: JSON.stringify(operation_detention),
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
            OnAJAXError("IDS_RWT.postUpdateOutgoingDetention", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция открыть возврат 
IDS_RWT.prototype.postOpenOutgoingReturn = function (operation_return, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/open_return/',
        type: 'POST',
        data: JSON.stringify(operation_return),
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
            OnAJAXError("IDS_RWT.postOpenOutgoingReturn", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция закрыть возврат 
IDS_RWT.prototype.postCloseOutgoingReturn = function (operation_return, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/close_return/',
        type: 'POST',
        data: JSON.stringify(operation_return),
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
            OnAJAXError("IDS_RWT.postCloseOutgoingReturn", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция предъявить вагон (перенести в левую часть)
IDS_RWT.prototype.postOutgoingPresentWagon = function (operation_present, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/present/wagon/',
        type: 'POST',
        data: JSON.stringify(operation_present),
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
            OnAJAXError("IDS_RWT.postOutgoingPresentWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция вернуть предъявленный вагон (вернуть в правую часть)
IDS_RWT.prototype.postOutgoingReturnPresentWagon = function (operation_return, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/return_present/wagon/',
        type: 'POST',
        data: JSON.stringify(operation_return),
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
            OnAJAXError("IDS_RWT.postOutgoingReturnPresentWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция предъявить состав на УЗ 
IDS_RWT.prototype.postOperationPresentSostav = function (operation_present, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/present/sostav/',
        type: 'POST',
        data: JSON.stringify(operation_present),
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
            OnAJAXError("IDS_RWT.postOperationPresentSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция отменить сдачу состава на УЗ
IDS_RWT.prototype.postOperationReturnPresentSostav = function (operation_present, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/return_present/sostav/',
        type: 'POST',
        data: JSON.stringify(operation_present),
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
            OnAJAXError("IDS_RWT.postOperationReturnPresentSostav", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======================================================================================================
//                              РАЗДЕЛ ПРАВКА ДОКУМЕНТОВ ПО ПРИБЫТИЮ
//======================================================================================================
//Обновим данные по вагону (Операция разметка вагона по прибытию)
IDS_RWT.prototype.postOperationUpdateWagonMarking = function (update_data, callback) {
    $.ajax({
        url: '../../api/ids/rwt/incoming/operation/update/wagon_marking/',
        type: 'POST',
        data: JSON.stringify(update_data),
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
            OnAJAXError("IDS_RWT.postOperationUpdateWagonMarking", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//======================================================================================================
//                                  РАЗДЕЛ АРМ ДИСПЕТЧЕРА
//======= WSD (АРМ диспетчера) =========================================================================
// Получить список вагонов на пути
IDS_RWT.prototype.getViewWagonsOfWay = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/vagons/way/id/' + id,
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
            OnAJAXError("IDS_RWT.getViewWagonsOfWay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить список вагонов на внешнем пути
IDS_RWT.prototype.getViewWagonsOfOuterWay = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/vagons/outer_way/id/' + id,
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
            OnAJAXError("IDS_RWT.getViewWagonsOfOuterWay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние всех станций
IDS_RWT.prototype.getViewStationStatus = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/station/status/all',
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
            OnAJAXError("IDS_RWT.getViewStationStatus", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние станции по id
IDS_RWT.prototype.getViewStationStatusOfIDStation = function (id_station, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/station/status/id/' + id_station,
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
            OnAJAXError("IDS_RWT.getViewStationStatusOfIDStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние парка путей по указаной станции
IDS_RWT.prototype.getViewParkWaysOfStation = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/park_ways/status/station/id/' + id,
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
            OnAJAXError("IDS_RWT.getViewParkWaysOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние парка путей по указаной станции
IDS_RWT.prototype.getViewWaysOfStationPark = function (id_station, id_park, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/ways/status/station/id/' + id_station + '/park_ways/id/' + id_park,
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
            OnAJAXError("IDS_RWT.getViewWaysOfStationPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние пути по id
IDS_RWT.prototype.getViewWaysOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/ways/status/id/' + id,
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
            OnAJAXError("IDS_RWT.getViewWaysOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние всех путей по указаной станции
IDS_RWT.prototype.getViewWaysStatusOfIDStation = function (id_station, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/ways/status/station/id/' + id_station,
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
            OnAJAXError("IDS_RWT.getViewWaysStatusOfIDStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить список составов на указаном внешнем пути
IDS_RWT.prototype.getViewArrivalSostavOfIDOuterWay = function (id_outer_way, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/arrival/sostav/outer_way/id/' + id_outer_way,
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
            OnAJAXError("IDS_RWT.getViewArrivalSostavOfIDOuterWay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция дислокации 
IDS_RWT.prototype.postDislocationWagonsOfStation = function (operation_dislocation, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/dislocation/',
        type: 'POST',
        data: JSON.stringify(operation_dislocation),
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
            OnAJAXError("IDS_RWT.postDislocationWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция роспуска 
IDS_RWT.prototype.postDissolutionWagonsOfStation = function (operation_dissolution, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/dissolution/',
        type: 'POST',
        data: JSON.stringify(operation_dissolution),
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
            OnAJAXError("IDS_RWT.postDissolutionWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция отправки 
IDS_RWT.prototype.postSendingWagonsOfStation = function (operation_sending, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/sending/',
        type: 'POST',
        data: JSON.stringify(operation_sending),
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
            OnAJAXError("IDS_RWT.postSendingWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция прибытия 
IDS_RWT.prototype.postArrivalWagonsOfStation = function (operation_arrival, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/arrival/',
        type: 'POST',
        data: JSON.stringify(operation_arrival),
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
            OnAJAXError("IDS_RWT.postArrivalWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция предъявления 
IDS_RWT.prototype.postProvideWagonsOfStation = function (operation_provide, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/provide/',
        type: 'POST',
        data: JSON.stringify(operation_provide),
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
            OnAJAXError("IDS_RWT.postProvideWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция отменить предъявление
IDS_RWT.prototype.postReturnProvideWagonsOfStation = function (operation_provide, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/return_provide/',
        type: 'POST',
        data: JSON.stringify(operation_provide),
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
            OnAJAXError("IDS_RWT.postReturnProvideWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция предъявления 
IDS_RWT.prototype.postTransferProvideWagonsOfStation = function (operation_transfer, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/transfer_provide/',
        type: 'POST',
        data: JSON.stringify(operation_transfer),
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
            OnAJAXError("IDS_RWT.postTransferProvideWagonsOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция вернуть вагон с пръедявления
IDS_RWT.prototype.postPostOperationReturnProvideWagon = function (operation_return, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/return_provide/wagon/',
        type: 'POST',
        data: JSON.stringify(operation_return),
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
            OnAJAXError("IDS_RWT.postPostOperationReturnProvideWagon", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция отправить состав на УЗ
IDS_RWT.prototype.postOperationSendingSostavOnUZ = function (operation_sending, callback) {
    $.ajax({
        url: '../../api/ids/rwt/wsd/operation/sending_uz/sostav/',
        type: 'POST',
        data: JSON.stringify(operation_sending),
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
            OnAJAXError("IDS_RWT.postOperationSendingSostavOnUZ", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======================================================================================================
//                                  РАЗДЕЛ ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ ВАГОНОВ
//======= WagonInternalRoutes (Состояние парка) =========================================================================
// Вернуть внутренее перемещение по id таблицы OutgoingCars
IDS_RWT.prototype.getWagonInternalRoutesOfOutgoingCarsID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wir/wagon/outgoing/id/' + id,
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
            OnAJAXError("IDS_RWT.getWagonInternalRoutesOfOutgoingCarsID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};


// Вернуть песледнюю запись операций из внутренего перемещения вагонов
IDS_RWT.prototype.getLastWagonInternalOperationOfWIR = function (wir) {
    var last_wio = null;
    if (wir && wir.WagonInternalOperation && wir.WagonInternalOperation.length > 0) {
        $.each(wir.WagonInternalOperation, function (i, el) {
            var wio = el;
            if (last_wio === null || wio.id > last_wio.id) {
                last_wio = wio;
            }
        });
    }
    return last_wio;
};


// ПОИСК ВАГОНОВ
// Поиск вагона на АМКР
IDS_RWT.prototype.getViewDislocationAMKRWagonOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/wsd/view/dislocation/amkr/wagon/num/' + num,
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
            OnAJAXError("IDS_RWT.getViewDislocationAMKRWagonOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======================================================================================================
//                                  РАЗДЕЛ СОСТОЯНИЕ ПАРКА
//======= ParkState (Состояние парка) =========================================================================
IDS_RWT.prototype.getParkState_StationOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/park_state/park_state_station/id/' + id,
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
            OnAJAXError("IDS_RWT.getParkState_StationOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Обновить состояние парка
IDS_RWT.prototype.putParkState_Station = function (pss, callback) {
    $.ajax({
        url: '../../api/ids/rwt/park_state/park_state_station/',
        type: 'PUT',
        data: JSON.stringify(pss),
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
            OnAJAXError("IDS_RWT.putParkState_Station", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить список сотояний парка по указаной станции
IDS_RWT.prototype.getViewParkStateOfStation = function (id_station, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/park_state/view/station_state/station/' + id_station,
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
            OnAJAXError("IDS_RWT.getViewParkStateOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить список вагонов по указаному пути
IDS_RWT.prototype.getViewWagonParkStateOfWay = function (id_way, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/park_state/view/wagon_state/way/' + id_way,
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
            OnAJAXError("IDS_RWT.getViewWagonParkStateOfWay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить состояние путей по указаному парку
IDS_RWT.prototype.getViewStatusParkStateOfParkStateStation = function (id_park_state_station, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/park_state/view/status/park_state_way/park_state_station/' + id_park_state_station,
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
            OnAJAXError("IDS_RWT.getViewStatusParkStateOfParkStateStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Операция создать парк 
IDS_RWT.prototype.postOperationCreateParkStateOfStation = function (operation_value, callback) {
    $.ajax({
        url: '../../api/ids/rwt/park_state/station/create/',
        type: 'POST',
        data: JSON.stringify(operation_value),
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
            OnAJAXError("IDS_RWT.postOperationCreateParkStateOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция удалить парк 
IDS_RWT.prototype.postOperationDeleteParkStateOfStation = function (operation_value, callback) {
    $.ajax({
        url: '../../api/ids/rwt/park_state/station/delete/',
        type: 'POST',
        data: JSON.stringify(operation_value),
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
            OnAJAXError("IDS_RWT.postOperationDeleteParkStateOfStation", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция добавить заменить вагоны на пути парка 
IDS_RWT.prototype.postOperationUpdateWagonsParkStateOfWay = function (operation_value, callback) {
    $.ajax({
        url: '../../api/ids/rwt/park_state/way/wagon/update/',
        type: 'POST',
        data: JSON.stringify(operation_value),
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
            OnAJAXError("IDS_RWT.postOperationUpdateWagonsParkStateOfWay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция удалить  вагоны на пути парка 
IDS_RWT.prototype.postOperationDeleteWagonsParkStateOfWay = function (operation_value, callback) {
    $.ajax({
        url: '../../api/ids/rwt/park_state/way/wagon/delete/',
        type: 'POST',
        data: JSON.stringify(operation_value),
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
            OnAJAXError("IDS_RWT.postOperationDeleteWagonsParkStateOfWay", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Операция удалить  вагоны на пути парка 
IDS_RWT.prototype.postOperationApplyWagonsParkState = function (operation_value, callback) {
    $.ajax({
        url: '../../api/ids/rwt/park_state/way/wagon/apply/',
        type: 'POST',
        data: JSON.stringify(operation_value),
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
            OnAJAXError("IDS_RWT.postOperationApplyWagonsParkState", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить положение вагонов по указаному парку
IDS_RWT.prototype.getViewDislocationAMKRWagonOfIDParkState = function (id_park_state_station, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/park_state/view/dislocation/amkr/park_state/id/' + id_park_state_station,
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
            OnAJAXError("IDS_RWT.getViewDislocationAMKRWagonOfIDParkState", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить положение вагонов за указаную дату
IDS_RWT.prototype.getViewDislocationAMKRWagonOfDate = function (date, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/rwt/park_state/view/dislocation/amkr/park_state/date/' + toISOStringTZ(date).substring(0, 19),
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
            OnAJAXError("IDS_RWT.getViewDislocationAMKRWagonOfDate", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
/* ----------------------------------------------------------
функции для работы с объектами
-------------------------------------------------------------*/
IDS_RWT.prototype.getValueObj = function (obj, name) {
    return obj ? obj[name] : null;
};
//
IDS_RWT.prototype.getValueCultureObj = function (obj, name) {
    var res = obj ? obj[name + '_' + this.lang] : null;
    return res;
};
/* ----------------------------------------------------------
функции для работы с внутреним массивом
-------------------------------------------------------------*/
//*======= IDS_RWT.list_instructional_letters  (Список писем) ======================================
// Вернуть копию без связей
IDS_RWT.prototype.getCloneInstructionalLetters = function (letter) {
    if (!letter) return null;
    return {
        id: letter.id,
        num: letter.num,
        dt: letter.dt,
        owner: letter.owner,
        destination_station: letter.destination_station,
        note: letter.note,
        create: letter.create,
        create_user: letter.create_user,
        change: letter.change,
        change_user: letter.change_user,
    };
};
//*======= IDS_RWT.list_instructional_letters_wagon  (Список вагонов по письмам) ======================================
// Вернуть копию без связей
IDS_RWT.prototype.getCloneInstructionalLettersWagon = function (wagon) {
    if (!wagon) return null;
    return {
        id: wagon.id,
        id_instructional_letters: wagon.id_instructional_letters,
        num: wagon.num,
        close: wagon.close,
        close_status: wagon.close_status,
        note: wagon.note,
        create: wagon.create,
        create_user: wagon.create_user,
        change: wagon.change,
        change_user: wagon.change_user,
    };
};

//*======= IDS_RWT.list_status_arrival  (Справочник статусов прибытия) ======================================
IDS_RWT.prototype.getStatusArrival_Internal_Of_Code = function (code) {
    if (this.list_status_arrival) {
        var obj = getObjects(this.list_status_arrival, 'code', code);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_RWT.prototype.getStatusArrival_Internal_Of_Name = function (text, ftext, lang) {
    if (this.list_status_arrival) {
        var obj = getObjects(this.list_status_arrival, (lang ? ftext + '_' + lang : name), text);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};

IDS_RWT.prototype.getCode_StatusArrival_Internal_Of_Name = function (text, ftext, lang) {
    var obj = this.getStatusArrival_Internal_Of_Name(text, ftext, lang);
    return obj ? obj.code : null;
};
//
IDS_RWT.prototype.getValue_StatusArrival_Of_Code = function (code, name, lang) {
    var obj = this.getStatusArrival_Internal_Of_Code(code);
    return this.getValueObj(obj, name, lang);
};
//
IDS_RWT.prototype.getValueCulture_StatusArrival_Of_Code = function (code, name) {
    var obj = this.getStatusArrival_Internal_Of_Code(code);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_RWT.prototype.getListStatusArrival = function (fvalue, ftext, lang, filter) {
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

