/* ----------------------------------------------------------
    Список слов
-------------------------------------------------------------*/


$.Text_Common =
    {
        'default':  //default language: ru
        {
            'mess_delay': 'Мы обрабатываем ваш запрос...',
            'mess_load': 'Загрузка справочников...',
            'mess_save': 'Запись и обновление данных...',
        },
        'en':  //default language: English
        {
            'mess_delay': 'We are processing your request ...',
            'mess_load': 'Downloading reference books...',
            'mess_save': 'Writing and updating data ...',
        }

    };

/* ----------------------------------------------------------
    Вывод текста согласно региональных настроек
-------------------------------------------------------------*/
// Метод определения списка по указаному языку
var getLanguages = function (languages, lang) {
    if (lang === 'ru') {
        var language = navigator.language ? navigator.language : navigator.browserLanguage;
        if (!language) return languages['default'];
        language = language.toLowerCase();
        for (var key in languages) {
            if (language.indexOf(key) != -1) {
                return languages[key];
            }
        }
        return languages['default'];
    }
    else if (lang && lang in languages) {
        return languages[lang];
    }
    else {
        return languages['default'];
    }
};
// Показать текст
var langView = function (t, langs) {
    var _t = t.toLowerCase();
    var re = (t in langs) ? langs[t] : (_t in langs) ? langs[_t] : null;
    return re;
};


/* ----------------------------------------------------------
    Функции работы с масивами
-------------------------------------------------------------*/
// Поиск элемента массива по ключу по всем объектам включая и вложенные
var getAllObjects = function (obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getAllObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
};
// Поиск элемента массива по ключу по первому уровню 
var getObjects = function (obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getChildObjects(obj[i], key, val));
        } else
            if (i == key && obj[key] == val) {
                objects.push(obj);
            }
    }
    return objects;
};
// Поиск элемента массива во вложенных обектах второго уровня 
var getChildObjects = function (obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object' & false == true) {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            if (i == key && obj[key] == val) {
                objects.push(obj);
            }
    }
    return objects;
};
// Вернуть объект из списка
var getObjOflist = function (list, field, value) {
    var res = getObjects(list, field, value);
    if (res !== null && res.length > 0) {
        return res[0];
    }
};

/* ----------------------------------------------------------
    Блокировка экрана
-------------------------------------------------------------*/
// Блокировать с текстом
var LockScreen = function (message) {
    var lock = document.getElementById('lockPanel');
    if (lock)
        lock.className = 'LockOn';
    lock.innerHTML = message;
};
// Разблокировать 
var LockScreenOff = function () {
    var lock = document.getElementById('lockPanel');
    if (lock)
        lock.className = 'LockOff';
};

/* ----------------------------------------------------------
    DataTables Вывод текста согласно региональных настроек
-------------------------------------------------------------*/
// Список слов для описания таблиц
$.Text_Table =
    {
        'default':  //default language: ru
        {
            "dt_decimal": "",
            "dt_emptyTable": "Нет данных в таблице",
            "dt_info": "Отображение _START_ по _END_ из _TOTAL_ записей",
            "dt_infoEmpty": "Отображение 0 to 0 of 0 записей",
            "dt_infoFiltered": "(отфильтровано из _MAX_ всего записей)",
            "dt_infoPostFix": "",
            "dt_thousands": ".",
            "dt_lengthMenu": "Показать  _MENU_ записей",
            "dt_loadingRecords": "Загрузка...",
            "dt_processing": "Обработка ...",
            "dt_search": "Найти:",
            "dt_zeroRecords": "Не найдено совпадающих записей",
            "dt_paginate": {
                "first": "Первая",
                "last": "Последняя",
                "next": "Следующая",
                "previous": "Предыдущая"
            },
            "dt_aria": {
                "sortAscending": ": активировать сортировку столбца по возрастанию",
                "sortDescending": ": активировать сортировку колонки по убыванию"
            }

        },
        'en':  //default language: English
        {
            "dt_decimal": "",
            "dt_emptyTable": "No data available in table",
            "dt_info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "dt_infoEmpty": "Showing 0 to 0 of 0 entries",
            "dt_infoFiltered": "(filtered from _MAX_ total entries)",
            "dt_infoPostFix": "",
            "dt_thousands": ",",
            "dt_lengthMenu": "Show _MENU_ entries",
            "dt_loadingRecords": "Loading...",
            "dt_processing": "Processing...",
            "dt_search": "Search:",
            "dt_zeroRecords": "No matching records found",
            "dt_paginate": {
                "first": "First",
                "last": "Last",
                "next": "Next",
                "previous": "Previous"
            },
            "dt_aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }

        }

    };
// Настройка language(DataTables)
var language_table = function (langs) {
    return {
        "decimal": langView('dt_decimal', langs),
        "emptyTable": langView('dt_emptyTable', langs),
        "info": langView('dt_info', langs),
        "infoEmpty": langView('dt_infoEmpty', langs),
        "infoFiltered": langView('dt_infoFiltered', langs),
        "infoPostFix": langView('dt_infoPostFix', langs),
        "thousands": langView('dt_thousands', langs),
        "lengthMenu": langView('dt_lengthMenu', langs),
        "loadingRecords": langView('dt_loadingRecords', langs),
        "processing": langView('dt_processing', langs),
        "search": langView('dt_search', langs),
        "zeroRecords": langView('dt_zeroRecords', langs),
        "paginate": langView('dt_paginate', langs),
        "aria": langView('dt_aria', langs),
    };
};
/* ----------------------------------------------------------
    Компоненты UI
-------------------------------------------------------------*/
// Инициализация компонента Select CD компонент
var cd_initSelect = function (obj_select, property, data, callback_option, value_select, event_change, exceptions_value) {
    var options = [];
    var lang = 'ru';
    var select = true;
    if (property.lang) {
        lang = property.lang;
    }
    if (property.select) {
        select = property.select;
    }
    // Проверка выбор неопределен
    if (value_select === -1 | select) {
        options.push("<option value='-1' >" + (lang === 'en' ? 'Select...' : 'Выберите...') + "</option>");
    }
    if (data !== null) {
        for (i = 0, count_data_select = data.length; i < count_data_select; i++) {
            var option = { value: data[i].value, text: data[i].text, disabled: data[i].disabled };
            // Преобразовать формат
            if (typeof callback_option === 'function') {
                option = callback_option(data[i]);
            }
            if (option !== null) {
                if (exceptions_value !== null) {
                    if (exceptions_value.indexOf(option.value) === -1) {
                        options.push("<option value='" + option.value + "' " + (option.disabled ? "disabled='disabled'" : "") + ">" + option.text + "</option>");
                    }
                } else {
                    options.push("<option value='" + option.value + "' " + (option.disabled ? "disabled='disabled'" : "") + ">" + option.text + "</option>");
                }
            }
        }
    }
    obj_select.empty();
    //obj_select.selectmenu({
    //    icons: { button: "ui-icon ui-icon-circle-triangle-s" },
    //    width: property.width,
    //    change: event_change,
    //}).selectmenu("menuWidget").addClass("overflow");;
    // Заполним селект 
    //obj_select.append(options.join(""))
    //    .val(value_select)
    //    .selectmenu("refresh");
    obj_select.append(options.join("")).val(value_select);
    obj_select.on("change", event_change);
    return obj_select;
};


var cd_initDateTimeRangePicker = function (obj_select, property, close_function) {
    var dtrp = {
        obj: null,
        lang: 'ru',
        select_date: null,
        init: function (obj_select, property, close_function) {
            if (property.lang) {
                dtrp.lang = property.lang;
            }
            dtrp.obj = obj_select.dateRangePicker(
            {
                language: dtrp.lang,
                format: 'DD.MM.YYYY HH:mm',
                autoClose: false,
                singleDate: true,
                singleMonth: true,
                showShortcuts: false,
                time: {
                    enabled: true
                },
            }).
            bind('datepicker-change', function (evt, obj) {
                dtrp.select_date = obj.date1;
            })
            .bind('datepicker-closed', function () {
                // Преобразовать формат
                if (typeof close_function === 'function') {
                    close_function(dtrp.select_date);
                }
            });
        },
        getDateTime: function () {
            return dtrp.select_date;
        },
        setDateTime: function (datetime) {
            if (datetime !== null) {
                dtrp.obj.data('dateRangePicker').setDateRange(moment(datetime).format('DD.MM.YYYY HH:mm:'), moment(datetime).format('DD.MM.YYYY HH:mm:'), true)
            } else {
                // Установить текущую дату и время
                dtrp.obj.data('dateRangePicker').setDateRange(moment().format('DD.MM.YYYY HH:mm:'), moment().format('DD.MM.YYYY HH:mm:'), true)
                dtrp.obj.data('dateRangePicker').clear();
                dtrp.select_date = null; // чтобы вернуло нет даты
            }
        },
    };
    dtrp.init(obj_select, property, close_function);
    return dtrp;
}
/* ----------------------------------------------------------
    Компоненты JQUERY UI
-------------------------------------------------------------*/
//Datepicker ----------------------------------------------------------------------
$.datepicker.regional.ru = {
    closeText: "Закрыть",
    prevText: "&#x3C;Пред",
    nextText: "След&#x3E;",
    currentText: "Сегодня",
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekHeader: "Нед",
    dateFormat: "dd.mm.yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ""
};

/* ----------------------------------------------------------
    Спомогательные функции
-------------------------------------------------------------*/
// Коррекция вывода даты с учетом зоны
var toISOStringTZ = function (date) {
    return date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString() : null;
};
// Преобразовать из ISO в Date
var ISOtoDate = function (s_date) {
    if (s_date) {
        var dt = moment(s_date);
        return dt ? dt._d : null;
    }
    return null;
};
// Преобразовать из Date в строку согласно указанного формата
var DateToStringOfCulture = function (date, lang) {
    if (date) {
        return moment(date).format(lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
    }
    return null;
};
//
var StringDateToFormatStringDate = function (s_date, lang) {
    return DateToStringOfCulture(ISOtoDate(s_date), lang);
};

//var toCorrectISOString = function (date) {
//    return date ? date.toISOString() : null;
//};
//
var get_date_value_obj = function (obj, lang) {
    if (obj && obj.val()) {
        return get_date_value(obj.val(), lang);
    }
    return null;
};

var get_date_value = function (s_date, lang) {
    if (s_date) {
        var dt = moment(s_date, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
        return dt ? dt._d : null;
    }
    return null;
};

var set_date_value = function (date, lang) {
    if (date) {
        var dt = moment(date, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
        return dt ? dt._d : null;
    }
    return null;
};

// Врнуть значение select с проверкой
var get_input_value = function (obj) {
    if (obj) {
        return obj.val() !== '' ? Number(obj.val()) : null;
    }
    return null;
};
// Врнуть значение select с проверкой
var get_select_value = function (select) {
    if (select) {
        return select.val() === "-1" ? '' : select.val();
    }
    return '';
};
var get_select_number_value = function (select) {
    if (select) {
        return Number(select.val()) === -1 ? null : Number(select.val());
    }
    return null;
};

// Вернуть режим
var outOperation = function (i) {
    if (i === null) return null;
    switch (Number(i)) {
        case 1: return "ПРИБЫТИЕ";
        case 2: return "ТСП";
        default: return i;
    }
};
/* ----------------------------------------------------------
    Функции валидации и вывода сообщений
-------------------------------------------------------------*/

var VALIDATION = function (lang, alert, all_obj) {

    this.lang = lang;
    this.alert = alert;
    this.all_obj = all_obj;
};
VALIDATION.prototype.clear_all = function () {
    this.clear_message();
    this.clear_error();
};

// Очистить все ошибки
VALIDATION.prototype.clear_error = function (objs) {
    if (objs) {
        obs.removeClass('is-valid is-invalid');
    } else {
        this.all_obj.removeClass('is-valid is-invalid');
    }
};

// Очистить сообщения
VALIDATION.prototype.clear_message = function () {
    if (this.alert) {
        this.alert.hide().text('');
    }
};

// Вывести сообщение об ошибке
VALIDATION.prototype.out_error_message = function (message) {
    if (this.alert) {
        this.alert.show().removeClass('alert-success').addClass('alert-danger');
        if (message) {
            this.alert.append(message).append($('<br />'));
        }
    }
};
// Вывести информационное сообщение
VALIDATION.prototype.out_info_message = function (message) {
    if (this.alert) {
        this.alert.show().removeClass('alert-danger').addClass('alert-success');
        if (message) {
            this.alert.text(message);
        }
    }
};
// Установить признак ошибка
VALIDATION.prototype.set_control_error = function (o, message) {
    o.removeClass('is-valid').addClass('is-invalid');
    if (message) {
        o.next(".invalid-feedback").text(message);
    }
};
// Установить признак Ok
VALIDATION.prototype.set_control_ok = function (o, message) {
    o.removeClass('is-invalid').addClass('is-valid');
    if (message) {
        o.next(".valid-feedback").text(message);
    }
};

// Проверка на пустой объект
VALIDATION.prototype.checkInputOfNull = function (o, mes_error, mes_ok) {
    if (o.val() === '' || o.val() === null) {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    } else {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    }
};
//var checkInputOfStringRange = function (o, min, max, message) {
//    if (o.val() !== "") {
//        var value = Number(o.val());
//        if (isNaN(value) || value > max || value < min) {
//            wagon_card.set_control_error(o, message);
//            wagon_card.out_error_message(message);
//            return false;
//        } else {
//            wagon_card.set_control_ok(o);
//            return true;
//        }
//    } else {
//        wagon_card.set_control_ok(o);
//        return true;
//    }
//},