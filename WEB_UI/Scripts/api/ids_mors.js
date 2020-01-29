// Подключите common.js
// Подключите shared.js
// Подключите ids_directory.js
// Подключите uz_directory

var IDS_MORS = function (lang) {
    this.lang = lang;
    this.ids_dir = new IDS_DIRECTORY(lang), // Создадим класс IDS_DIRECTORY
    this.uz_dir = new UZ_DIRECTORY(lang) // Создадим класс UZ_DIRECTORY
};

IDS_MORS.list_cards_wagons = [];

IDS_MORS.list_cards_wagons_repairs = [];

IDS_MORS.list_park_wagons = [];

IDS_MORS.list_park_list_wagons = [];

// Загрузить указаные справочники
IDS_MORS.prototype.load = function (list, callback) {
    var count = list.length;
    var obj = this;
    // Згрузка собственных таблиц
    $.each(list, function (i, el) {
        if (el === 'ids') {
            // Згрузка библиотек справочников ИДС
            obj.ids_dir.load(['genus_wagon', 'wagon_manufacturers', 'types_repairs_wagons', 'models_wagons', 'type_wagons', 'type_owner_ship', 'owners_wagons', 'lessors_wagons', 'operators_wagons', 'poligon_travel_wagons', 'special_conditions', 'depo', 'wagons_condition'], function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
        // Згрузка библиотек справочников УЗ
        if (el === 'uz') {
            obj.uz_dir.load(['states', 'stations', 'internal_railroad'], function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };

        if (el === 'cards_wagons') {
            IDS_MORS.prototype.getCardsWagons(function (result_cards_wagons) {
                obj.list_cards_wagons = result_cards_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback(result_cards_wagons);
                    }
                }
            });
        };
        if (el === 'cards_wagons_repairs') {
            IDS_MORS.prototype.getCardsWagonsRepairs(function (result_cards_wagons_repairs) {
                obj.list_cards_wagons_repairs = result_cards_wagons_repairs;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback(result_cards_wagons_repairs);
                    }
                }
            });
        };
        // Парк вагонов
        if (el === 'park_wagons') {
            IDS_MORS.prototype.getParksWagons(function (result_park_wagons) {
                obj.list_park_wagons = result_park_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback(result_park_wagons);
                    }
                }
            });
        };
        if (el === 'park_list_wagons') {
            IDS_MORS.prototype.getParksWagons(function (result_park_list_wagons) {
                obj.list_park_list_wagons = result_park_list_wagons;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback(result_park_list_wagons);
                    }
                }
            });
        };

    });
};

IDS_MORS.prototype.loadCardsWagons = function (callback) {
    var obj = this;
    IDS_MORS.prototype.getCardsWagons(function (result_cards_wagons) {
        obj.list_cards_wagons = result_cards_wagons;
        if (typeof callback === 'function') {
            callback(result_cards_wagons);
        }
    });
};
// Загрузить список парков
IDS_MORS.prototype.loadParksWagons = function (callback) {
    var obj = this;
    IDS_MORS.prototype.getParksWagons(function (result_park_wagons) {
        obj.list_park_wagons = result_park_wagons;
        if (typeof callback === 'function') {
            callback(result_park_wagons);
        }
    });
};

/* ----------------------------------------------------------
функции для работы с объектами
-------------------------------------------------------------*/
IDS_MORS.prototype.getValueObj = function (obj, name) {
    return obj ? obj[name] : null;
};
//
IDS_MORS.prototype.getValueCultureObj = function (obj, name) {
    return obj ? obj[name + '_' + this.lang] : null;
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= CardsWagons (Таблица карточек вагонов) ======================================
IDS_MORS.prototype.getCardsWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/cards_wagons/all',
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
            OnAJAXError("IDS_MORS.getCardsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_MORS.prototype.getCardsWagonsOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/cards_wagons/num/' + num,
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
            OnAJAXError("IDS_MORS.getCardsWagonsOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить карточку
IDS_MORS.prototype.putCardsWagons = function (card, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/mors/cards_wagons/num/' + card.num,
        data: JSON.stringify(card),
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
            OnAJAXError("IDS_MORS.putCardsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить карточку по номеру вагона
IDS_MORS.prototype.deleteCardsWagons = function (num, callback) {
    $.ajax({
        url: '../../api/ids/mors/cards_wagons/num/' + num,
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
            OnAJAXError("IDS_MORS.deleteCardsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить карточку
IDS_MORS.prototype.postCardsWagons = function (card, callback) {
    $.ajax({
        url: '../../api/ids/mors/cards_wagons/',
        type: 'POST',
        data: JSON.stringify(card),
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
            OnAJAXError("IDS_MORS.postCardsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= CardsWagonsRepairs (Таблица карточек ремонтов вагонов) ======================================
IDS_MORS.prototype.getCardsWagonsRepairs = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/cards_wagons_repairs/all',
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
            OnAJAXError("IDS_MORS.getCardsWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_MORS.prototype.getCardsWagonsRepairsOfNum = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/cards_wagons_repairs/num/' + num,
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
            OnAJAXError("IDS_MORS.getCardsWagonsRepairsOfNum", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_MORS.prototype.getCardsWagonsRepairsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/cards_wagons_repairs/id/' + id,
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
            OnAJAXError("IDS_MORS.getCardsWagonsRepairsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Добавить карточку
IDS_MORS.prototype.postCardsWagonsRepairs = function (repairs, callback) {
    $.ajax({
        url: '../../api/ids/mors/cards_wagons_repairs/',
        type: 'POST',
        data: JSON.stringify(repairs),
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
            OnAJAXError("IDS_MORS.postCardsWagonsRepairs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить карточку
IDS_MORS.prototype.putCardsWagonsRepairs = function (repairs, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/mors/cards_wagons_repairs/id/' + repairs.id,
        data: JSON.stringify(repairs),
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
            OnAJAXError("IDS_MORS.putCardsWagonsRepairs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить карточку по номеру вагона
IDS_MORS.prototype.deleteCardsWagonsRepairs = function (id, callback) {
    $.ajax({
        url: '../../api/ids/mors/cards_wagons_repairs/id/' + id,
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
            OnAJAXError("IDS_MORS.deleteCardsWagonsRepairs", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= ParksWagons (Таблица парков вагонов) ======================================
IDS_MORS.prototype.getParksWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/park_wagons/all',
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
            OnAJAXError("IDS_MORS.getParksWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_MORS.prototype.getParksWagonsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/park_wagons/id/' + id,
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
            OnAJAXError("IDS_MORS.getParksWagonsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Добавить
IDS_MORS.prototype.postParksWagons = function (park, callback) {
    $.ajax({
        url: '../../api/ids/mors/park_wagons/',
        type: 'POST',
        data: JSON.stringify(park),
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
            OnAJAXError("IDS_MORS.postParksWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Обновить
IDS_MORS.prototype.putParksWagons = function (park, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/ids/mors/park_wagons/id/' + park.id,
        data: JSON.stringify(park),
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
            OnAJAXError("IDS_MORS.putParksWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Удалить
IDS_MORS.prototype.deleteParksWagons = function (id, callback) {
    $.ajax({
        url: '../../api/ids/mors/park_wagons/id/' + id,
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
            OnAJAXError("IDS_MORS.deleteParksWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= ParksListWagons (Таблица списков вагонов парка вагонов) ======================================
IDS_MORS.prototype.getParksListWagons = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/park_list_wagons/all',
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
            OnAJAXError("IDS_MORS.getParksListWagons", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_MORS.prototype.getParksListWagonsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/park_list_wagons/id/' + id,
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
            OnAJAXError("IDS_MORS.getParksListWagonsOfID", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//
IDS_MORS.prototype.getParksListWagonsOfPark = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ids/mors/park_list_wagons/park/id/' + id,
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
            OnAJAXError("IDS_MORS.getParksListWagonsOfPark", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
/* ----------------------------------------------------------
функции для работы с внутреним массивом
-------------------------------------------------------------*/
//======= IDS_MORS.list_cards_wagons  (Список парков) ======================================
IDS_MORS.prototype.getCardsWagons_Internal_Of_ID = function (num) {
    if (this.list_cards_wagons) {
        var obj = getObjects(this.list_cards_wagons, 'num', num);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_MORS.prototype.getValue_CardsWagons_Of_ID = function (num, name) {
    var obj = this.getCardsWagons_Internal_Of_ID(num);
    return obj ? obj[name] : null;
};
//
IDS_MORS.prototype.getValueCulture_CardsWagons_Of_ID = function (num, name) {
    var obj = this.getCardsWagons_Internal_Of_ID(num);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_MORS.prototype.getListCardsWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_cards_wagons) {
        for (i = 0, j = this.list_cards_wagons.length; i < j; i++) {
            var l = this.list_cards_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};
//======= IDS_MORS.list_park_wagons  (Список парков) ======================================
IDS_MORS.prototype.getParksWagons_Internal_Of_ID = function (id_park) {
    if (this.list_park_wagons) {
        var obj = getObjects(this.list_park_wagons, 'id', id_park);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
IDS_MORS.prototype.getValue_ParksWagons_Of_ID = function (id_park, name) {
    var obj = this.getParksWagons_Internal_Of_ID(id_park);
    return obj ? obj[name] : null;
};
//
IDS_MORS.prototype.getValueCulture_ParksWagons_Of_ID = function (id_park, name) {
    var obj = this.getParksWagons_Internal_Of_ID(id_park);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
IDS_MORS.prototype.getListParksWagons = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_park_wagons) {
        for (i = 0, j = this.list_park_wagons.length; i < j; i++) {
            var l = this.list_park_wagons[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};