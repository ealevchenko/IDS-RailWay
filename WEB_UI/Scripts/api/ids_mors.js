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


IDS_MORS.prototype.load = function (list, callback) {
    var count = list.length+2;
    var obj = this;
    // Згрузка библиотек справочников ИДС
    this.ids_dir.load(['genus_wagon', 'wagon_manufacturers', 'types_repairs_wagons', 'models_wagons', 'type_wagons', 'type_owner_ship', 'owners_wagons', 'lessors_wagons', 'operators_wagons', 'poligon_travel_wagons', 'special_conditions', 'depo', 'wagons_condition'], function () {
        count -= 1;
        if (count === 0) {
            if (typeof callback === 'function') {
                LockScreenOff();
                callback();
            }
        }
    });
    // Згрузка библиотек справочников УЗ
    this.uz_dir.load(['states', 'stations', 'internal_railroad'], function () {
        count -= 1;
        if (count === 0) {
            if (typeof callback === 'function') {
                LockScreenOff();
                callback();
            }
        }
    });
    // Згрузка собственных таблиц
    $.each(list, function (i, el) {
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
    });
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