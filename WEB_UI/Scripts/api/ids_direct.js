(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mess_load_reference': 'Загружаю справочники...',
        },
        'en':  //default language: English
        {
            'mess_load_reference': 'Loading references ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //****************************************************************************************
    //-------------------------------- Конструктор и инициализация ---------------
    // создать класс справочники ИДС
    function ids_directory() {
        this.list_station = null;
        this.list_ways = null;
        this.list_divisions = null;
        this.list_park_ways = null;

    }
    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------
    // Загрузить таблицы базы данных 
    ids_directory.prototype.load = function (list, lock, update, callback) {
        var process = 0;
        var result = [];
        var out_load = function (process) {
            if (process === 0) {
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(result);
                }
            }
        };
        if (list) {
            $.each(list, function (i, table) {
                if (table === 'station') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_station) {
                        process++;
                        this.getStation(function (data) {
                            this.list_station = data;
                            process--;
                            result.push('station');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'ways') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_ways) {
                        process++;
                        this.getWays(function (data) {
                            this.list_ways = data;
                            process--;
                            result.push('ways');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'divisions') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_divisions) {
                        process++;
                        this.getDivisions(function (data) {
                            this.list_divisions = data;
                            process--;
                            result.push('divisions');
                            out_load(process);
                        }.bind(this));
                    };
                };
                if (table === 'park_ways') {

                    if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                    if (update || !this.list_park_ways) {
                        process++;
                        this.getParkWays(function (data) {
                            this.list_park_ways = data;
                            process--;
                            result.push('park_ways');
                            out_load(process);
                        }.bind(this));
                    };
                };
            }.bind(this));
        };
        out_load(process);
    };
    //======= Directory_Station (Справочник станций ИДС) ======================================
    ids_directory.prototype.getStation = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/station/all',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                };
                //if (typeof this.settings.on_load_station === 'function') {
                //    this.settings.on_load_station();
                //};
            }/*.bind(this)*/,
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Ways (Справочник путей ИДС) ======================================
    // Получить все пути из базы
    ids_directory.prototype.getWays = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/all',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
                //if (typeof this.settings.on_load_ways === 'function') {
                //    this.settings.on_load_ways();
                //}
            }/*.bind(this)*/,
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить пути по указаной станции и парку
    ids_directory.prototype.getWaysOfStationIDParkID = function (id_station, id_park, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/station/id/' + id_station + '/park/id/' + id_park,
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
                OnAJAXError("ids_directory.getWaysOfStationIDParkID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить путь по id
    ids_directory.prototype.getWaysOfWayID = function (id_way, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/view/way/id/' + id_way,
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
                OnAJAXError("ids_directory.getWaysOfWayID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить пути роспуска
    ids_directory.prototype.getWaysOfDissolution = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/ways/view/way/dissolution/',
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
                OnAJAXError("ids_directory.getWaysOfDissolution", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция автокоррекции
    ids_directory.prototype.postOperationAutoPositionWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/auto_correct/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationAutoPositionWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вниз
    ids_directory.prototype.postOperationDown1PositionWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/down_position/1/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationDown1PositionWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вверх
    ids_directory.prototype.postOperationUp1PositionWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/up_position/1/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationUp1PositionWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция "Добавить путь"
    ids_directory.prototype.postOperationInsertWayOfPark = function (way, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/add/',
            type: 'POST',
            data: JSON.stringify(way),
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
                OnAJAXError("ids_directory.postOperationInsertWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция "Удалить путь"
    ids_directory.prototype.postOperationDeleteWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/delete/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationDeleteWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция "Обновить путь"
    ids_directory.prototype.postOperationUpdateWayOfPark = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/ways/operation/update/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationUpdateWayOfPark", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_ParkWay (Справочник путей ИДС) ======================================
    // Получить все парки
    ids_directory.prototype.getParkWays = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/park_ways/all',
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
                OnAJAXError("ids_directory.getParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить 
    ids_directory.prototype.postParkWays = function (obj, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/',
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
                OnAJAXError("ids_directory.postParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить 
    ids_directory.prototype.putParkWays = function (obj, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/directory/park_ways/id/' + obj.id,
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
                OnAJAXError("ids_directory.putParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Удалить 
    ids_directory.prototype.deleteParkWays = function (id, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/id/' + id,
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
                OnAJAXError("ids_directory.deleteParkWays", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    }
    // Получить парки по указаной станции c позицией
    ids_directory.prototype.getParkStationOfStationID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/park_ways/view/park_station/id/' + id,
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
                OnAJAXError("ids_directory.getParkStationOfStationID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция автокоррекции
    ids_directory.prototype.posOperationAutoPositionParkOfStation= function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/operation/auto_correct/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.posOperationAutoPositionParkOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вверх
    ids_directory.prototype.postOperationUp1PositionParkOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/operation/up_position/1/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationUp1PositionParkOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Операция свига на одни позицию вниз
    ids_directory.prototype.postOperationDown1PositionParkOfStation = function (operation, callback) {
        $.ajax({
            url: '../../api/ids/directory/park_ways/operation/down_position/1/',
            type: 'POST',
            data: JSON.stringify(operation),
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
                OnAJAXError("ids_directory.postOperationDown1PositionParkOfStation", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_Divisions (Справочник цехов) ======================================
    ids_directory.prototype.getDivisions = function (callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/division/all',
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
                OnAJAXError("ids_directory.GetDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Получить по коду
    ids_directory.prototype.getDivisionsOfID = function (id, callback) {
        $.ajax({
            type: 'GET',
            url: '../../api/ids/directory/division/id/' + id,
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
                OnAJAXError("ids_directory.getDivisionsOfID", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Обновить 
    ids_directory.prototype.putDivisions = function (division, callback) {
        $.ajax({
            type: 'PUT',
            url: '../../api/ids/directory/division/id/' + division.id,
            data: JSON.stringify(station),
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
                OnAJAXError("ids_directory.putDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    // Удалить 
    ids_directory.prototype.deleteDivisions = function (id, callback) {
        $.ajax({
            url: '../../api/ids/directory/division/id/' + id,
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
                OnAJAXError("ids_directory.deleteDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //Добавить 
    ids_directory.prototype.postDivisions = function (division, callback) {
        $.ajax({
            url: '../../api/ids/directory/division/',
            type: 'POST',
            data: JSON.stringify(division),
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
                OnAJAXError("ids_directory.postDivisions", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //****************************************************************************************
    //-------------------------------- функции для работы с объектами ------------------------
    ids_directory.prototype.getValueObj = function (obj, name, lang) {
        if (lang) {
            return obj ? obj[name + '_' + lang] : null;
        } else {
            return obj ? obj[name] : null;
        }
    };
    //
    ids_directory.prototype.getValueCultureObj = function (obj, name) {
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    ids_directory.prototype.getListObj = function (list_obj, fvalue, ftext, lang, filter) {
        var list = [];
        var list_filtr = null;
        if (list_obj) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.filter(filter);
            } else { list_filtr = list_obj; }
            $.each(list_filtr, function (i, el) {
                if (lang) {
                    list.push({ value: el[fvalue], text: el[ftext + '_' + lang], disabled: false });
                } else {
                    list.push({ value: el[fvalue], text: el[ftext], disabled: false });
                }
            }.bind(this));
        }
        return list;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    ids_directory.prototype.getListObj2 = function (list_obj, fvalue, ftext1, ftext2, lang, filter) {
        var list = [];
        var list_filtr = null;
        if (list_obj) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.filter(filter);
            } else { list_filtr = list_obj; }
            for (i = 0, j = list_filtr.length; i < j; i++) {
                var l = list_filtr[i];
                if (lang) {
                    list.push({ value: l[fvalue], text: l[ftext1 + '_' + lang] + ' - ' + l[ftext2 + '_' + lang] });
                } else {
                    list.push({ value: l[fvalue], text: l[ftext1] + ' - ' + l[ftext2] });
                }
            }
        }
        return list;
    };
    // Вернуть объект по id
    ids_directory.prototype.getObj_Of_ID = function (list_obj, id) {
        var obj = null;
        if (list_obj && list_obj.length > 0) {
            obj = list_obj.find(function (o) { return o.id === id });
        }
        return obj;
    };
    //  Вернуть объекты в указаным поле которых есть текст text
    ids_directory.prototype.getObjs_Of_text = function (list_obj, text, ftext, lang) {
        var objs = null;
        var field = lang ? ftext + '_' + lang : ftext;
        if (list_obj && list_obj.length > 0) {
            objs = list_obj.filter(function (i) {
                return $.trim(i[field]) === $.trim(text) ? true : false;
            });
        }
        return objs;
    };
    //****************************************************************************************
    //-------------------------------- функции для работы с таблицами ------------------------
    //*======= ids_directory.list_station  (Справочник станций) ======================================
    ids_directory.prototype.getStation_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_station, id);
    };
    //
    ids_directory.prototype.getValue_Station_Of_ID = function (id, name, lang) {
        var obj = this.getStation_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_Stations_Of_ID = function (id, name) {
        var obj = this.getStation_Of_ID(id);
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    //
    ids_directory.prototype.getListStation = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_station, fvalue, ftext, lang, filter);
    };
    //*======= ids_directory.list_ways  (Справочник станций) ======================================
    ids_directory.prototype.getWays_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_ways, id);
    };
    //
    ids_directory.prototype.getValue_Ways_Of_ID = function (id, name, lang) {
        var obj = this.getWays_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_Ways_Of_ID = function (id, name) {
        var obj = this.getWays_Of_ID(id);
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    //
    ids_directory.prototype.getListWays = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_ways, fvalue, ftext, lang, filter);
    };
    ids_directory.prototype.getListWays2 = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.getListObj2(this.list_ways, fvalue, ftext1, ftext2, lang, filter);
    };

    //*======= ids_directory.list_park_ways  (Справочник парков) ======================================
    ids_directory.prototype.getParkWays_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_park_ways, id);
    };
    //
    ids_directory.prototype.getValue_ParkWays_Of_ID = function (id, name, lang) {
        var obj = this.getParkWays_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_ParkWays_Of_ID = function (id, name) {
        var obj = this.getParkWays_Of_ID(id);
        return obj ? obj[name + '_' + App.Lang] : null;
    };
    //
    ids_directory.prototype.getListParkWays = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_park_ways, fvalue, ftext, lang, filter);
    };
    //*======= ids_directory.list_divisions  (Справочник подразделений) ======================================
    ids_directory.prototype.getDivisions_Of_ID = function (id) {
        return this.getObj_Of_ID(this.list_divisions, id);
    };
    //
    ids_directory.prototype.getValue_Divisions_Of_ID = function (id, name, lang) {
        var obj = this.getDivisions_Of_ID(id);
        return this.getValueObj(obj, name, lang);
    };
    //
    ids_directory.prototype.getValueCulture_Divisions_Of_ID = function (id, name) {
        var obj = this.getDivisions_Of_ID(id);
        return obj ? obj[name + '_' + this.lang] : null;
    };
    //
    ids_directory.prototype.getDivisions_Of_Name = function (text, ftext, lang) {
        return this.getObjs_Of_text(this.list_divisions, text, ftext, lang);
    };
    //
    ids_directory.prototype.getID_Divisions_Of_Name = function (text, ftext, lang) {
        var obj = this.getDivisions_Of_Name(text, ftext, lang);
        return obj && obj.length > 0 ? obj[0].id : null;
    };
    //
    ids_directory.prototype.getListDivisions = function (fvalue, ftext, lang, filter) {
        return this.getListObj(this.list_divisions, fvalue, ftext, lang, filter);
    };
    // Получим список с выборкой по полю
    ids_directory.prototype.getDivisions_Of_CultureName = function (name, lang, text) {
        if (this.list_divisions) {
            var obj = getObjects(this.list_divisions, name + '_' + lang, text);
            return obj;
        }
        return null;
    };

    App.ids_directory = ids_directory;

    window.App = App;
})(window);