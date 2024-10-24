﻿/* ----------------------------------------------------------
    Список слов
-------------------------------------------------------------*/
$.Text_Common =
{
    'default':  //default language: ru
    {
        'mess_delay': 'Мы обрабатываем ваш запрос...',
        'mess_load_table': 'Формируем таблицу...',
        'mess_load': 'Загрузка справочников...',
        'mess_save': 'Запись и обновление данных...',
        'mess_load_data': 'Получение запрашиваемых данных...',
        'mess_operation': 'Выполняю операцию...',
        'mess_update_uz': 'Обновляю данные на УЗ...',
        'mess_checking_data': 'Проверяю данные...',

        'mess_error_not_cars': 'Введите номер вагона или несколько вагонов, разделитель номеров ";"',
        'mess_error_input_num_cars': 'Ошибка ввода, номер позиции :{0}, введен неправильный номер :{1}',
        'mess_error_input_num_cars1': 'Ошибка ввода, номер позиции :{0}, номер не может быть меньше или равен 0 :{1}',
        'mess_error_input_num_cars2': 'Ошибка ввода, номер позиции :{0}, не системная нумерация (ошибка контрольной суммы) :{1}',
        'mess_error_input_num_cars_duble': 'Ошибка ввода, введеный номер :{0} - повторяется!',

        'mess_error_not_docs': 'Введите номер документа или несколько документов, разделитель номеров ";"',
        'mess_error_input_num_docs': 'Ошибка ввода, номер позиции :{0}, введен неправильный номер :{1}',
        'mess_error_input_num_docs1': 'Ошибка ввода, номер позиции :{0}, номер не может быть меньше или равен 0 :{1}',
        'mess_error_input_num_docs_duble': 'Ошибка ввода, введеный номер :{0} - повторяется!',


        'epd_status_unknown': 'Статус невідомий',
        'epd_status_draft': 'Чернетка',
        'epd_status_sending': 'Документ передається товарному касиру',
        'epd_status_registered': 'Документ переданий товарному касиру',
        'epd_status_reclaiming': 'Документ відкликається від товарного касира',
        'epd_status_accepted': 'Вантаж прийнято до перевезення',
        'epd_status_delivered': 'Вантаж прибув',
        'epd_status_recieved': 'Вантаж отримано одержувачем',
        'epd_status_uncredited': 'Документ розкредитовано товарним касиром',
        'epd_status_recieved_draft': 'Вантаж отримано одержувачем і редагується',
        'epd_status_recieved_sending': 'Вантаж отримано одержувачем і переданий товарному касиру',
        'epd_status_recieved_reclaiming': 'Вантаж отримано одержувачем і відкликається від товарного касира',
        'epd_status_canceled': 'Документ зіпсований товарним касиром',
        'epd_status_locked': 'Документ заблокований',

    },
    'en':  //default language: English
    {
        'mess_delay': 'We are processing your request ...',
        'mess_load_table': 'Forming table ...',
        'mess_load': 'Downloading reference books...',
        'mess_save': 'Writing and updating data ...',
        'mess_load_data': 'Receiving the requested data...',
        'mess_operation': 'Performing an operation...',
        'mess_update_uz': 'I am updating the data on the UZ ...',
        'mess_checking_data': 'Checking data...',

        'mess_error_not_cars': 'Enter the number of a car or several cars, number separator ";"',
        'mess_error_input_num_cars': 'Input error, item number :{0}, wrong number entered :{1}',
        'mess_error_input_num_cars1': 'Input error, position number :{0}, number cannot be less than or equal to 0 :{1}',
        'mess_error_input_num_cars2': 'Input error, position number :{0}, non-system numbering (checksum error) :{1}',
        'mess_error_input_num_cars_duble': 'Input error, number entered :{0} - repeated!',

        'epd_status_unknown': 'Unknown status',
        'epd_status_draft': 'Darling',
        'epd_status_sending': 'Document is being sent to the commodity cashier',
        'epd_status_registered': 'Document of transfers to the commodity cashier',
        'epd_status_reclaiming': 'Document reclaimed by cashier',
        'epd_status_accepted': 'Vantage accepted before moving',
        'epd_status_delivered': 'Epd_status_delivered',
        'epd_status_recieved': 'Vantage received by owner',
        'epd_status_uncredited': 'Document uncredited by commodity cashier',
        'epd_status_recieved_draft': 'Vantage received and edited',
        'epd_status_recieved_sending': 'Vantage received by the receiver and the goods cashier',
        'epd_status_recieved_reclaiming': 'Vantage received by the owner and reclaimed by the cashier',
        'epd_status_canceled': 'Document of zіpsovaniya commodity cashier',
        'epd_status_locked': 'Lock Document',
    }

};
//==============================================================================================
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
    if (re === null) {
        throw new Error('Неопределённ параметр : ' + t);
    }
    return re;
};

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
//==============================================================================================
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
            if (typeof obj[key] === 'string') {
                if (i == key && obj[key].toUpperCase() == String(val).toUpperCase()) {
                    objects.push(obj);
                }
            } else {
                if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
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
// вернуть масив свойств выбранных в масиве
var getArrOfNameObjArr = function (list, name) {
    var result = [];
    if (!list || !name) return null;
    for (var ia = 0; ia < list.length; ia++) {
        result.push(list[ia][name]);
    };
    return result;
};

var getStringArr = function (list, sep) {
    var result = '';
    if (!list) return result;
    list.forEach(function (item, index, array) {
        result += item + (index < list.length - 1 ? String(sep) : '');
    });
    return result;
};
// Получить список для в формате (value:text)
var getList2Option = function (list, fvalue, ftext1, ftext2, lang, filter) {
    var list_result = [];
    var list_filtr = null;
    if (list) {
        if (typeof filter === 'function') {
            list_filtr = list.filter(filter);
        } else { list_filtr = list; }
        for (i = 0, j = list_filtr.length; i < j; i++) {
            var l = list_filtr[i];
            if (lang) {
                list_result.push({ value: l[fvalue], text: l[ftext1 + '_' + lang] + ' - ' + l[ftext2 + '_' + lang] });
            } else {
                list_result.push({ value: l[fvalue], text: l[ftext1] + ' - ' + l[ftext2] });
            }
        }
    }
    return list_result;
};
//==============================================================================================
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

//------------------------------------------------------------------------
// Определение параметров переданных по url
var getUrlVars = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};
var getUrlVar = function (name) {
    return getUrlVars()[name];
};

var test_event = function test(elem, event, fun) {
    var events = $._data(elem, "events");
    return !!events && !!(events = events[event]) && (!fun || events.some(function (data) {
        return data.handler == fun
    }));
}

//==============================================================================================
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

var init_columns = function (collums_name, list_collums) {
    var collums = [];
    if (collums_name && collums_name.length > 0) {
        $.each(collums_name, function (i, el) {
            var field = list_collums.find(function (o) {
                return o.field === el;
            });
            // Если поле не найдено, создадим по умолчанию (чтобы небыло ошибки)
            if (!field) {
                field = {
                    field: el,
                    data: function (row, type, val, meta) {
                        return "Field_error";
                    },
                    title: el, width: "100px", orderable: false, searchable: false
                };
            }
            field.className += ' fl-' + el;
            collums.push(field);
        });
    }
    return collums;
};

var init_columns_detali = function (collums_detali, list_collums) {
    var collums = [];
    if (collums_detali && collums_detali.length > 0) {
        $.each(collums_detali, function (i, el) {
            var field = list_collums.find(function (o) {
                return o.field === el.field;
            });
            // Если поле не найдено, создадим по умолчанию (чтобы небыло ошибки)
            if (!field) {
                field = {
                    field: el,
                    data: function (row, type, val, meta) {
                        return "Field_error";
                    },
                    title: el, width: "100px", orderable: false, searchable: false
                };
            }
            field.className += ' fl-' + el.field;
            // Добавим детали
            if (el.title !== null) {
                field.title = el.title;
            }
            if (el.class !== null) {
                field.className += ' ' +el.class;
            }
            collums.push(field);
        });
    }
    return collums;
};

var init_buttons = function (buttons_name, list_buttons) {
    var buttons = [];
    if (buttons_name && buttons_name.length > 0) {
        $.each(buttons_name, function (i, el) {
            var button = list_buttons.find(function (o) {
                return o.button === el.name;
            });
            // Если кнопка не найдена, создадим по умолчанию (чтобы небыло ошибки)
            if (!button) {
                button = {
                    button: el.name,
                    text: button_error,
                    action: function (e, dt, node, config) {

                    },
                    enabled: false
                };
            }
            if (el.action) {
                button.action = el.action;
            }
            buttons.push(button);
        });
    }
    return buttons;
};

//==============================================================================================
/* ----------------------------------------------------------
    Компоненты UI
-------------------------------------------------------------*/
// Инициализация компонента Select CD компонент
var cd_initSelect = function (obj_select, property, data, callback_option, value_select, event_change, exceptions_value) {
    var options = [];
    var lang = 'ru';
    //var select = true;
    if (property.lang) {
        lang = property.lang;
    }
    //if (property.select) {
    //    select = property.select;
    //}
    // Проверка выбор неопределен
    if (value_select === -1) {
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

var cd_updateSelect = function (obj_select, property, data, callback_option, value_select, exceptions_value) {
    var options = [];
    var lang = 'ru';
    //var select = true;
    if (property.lang) {
        lang = property.lang;
    }
    // Проверка выбор неопределен
    if (value_select === -1) {
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
    obj_select.append(options.join("")).val(value_select);
    return obj_select;
};
//
var cd_initDateTimeRangePicker = function (obj_select, property, close_function) {
    var dtrp = {
        obj: null,
        lang: 'ru',
        time: true,
        select_date: null,
        init: function (obj_select, property, close_function) {
            if (property.lang == null) {
                dtrp.lang = property.lang;
            }
            if (property.time !== null) {
                dtrp.time = property.time;
            }

            dtrp.obj = obj_select.dateRangePicker(
                {
                    language: dtrp.lang,
                    format: dtrp.lang === 'ru' ? 'DD.MM.YYYY' + (dtrp.time ? ' HH:mm' : '') : 'DD\MM\YYYY' + (dtrp.time ? ' HH:mm' : ''),
                    autoClose: false,
                    singleDate: true,
                    singleMonth: true,
                    showShortcuts: false,
                    time: {
                        enabled: dtrp.time
                    },
                }).
                bind('datepicker-change', function (evt, obj) {
                    dtrp.select_date = obj.date1;
                }).bind('datepicker-closed', function () {
                    //dtrp.setDateTime(dtrp.select_date); // Иначе дату не возможно убрать
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
            var e = dtrp.obj.attr("disabled");
            if (e === "disabled") {
                dtrp.obj.prop("disabled", false);
            }
            if (datetime !== null) {
                dtrp.obj.data('dateRangePicker').setDateRange(moment(datetime).format('DD.MM.YYYY' + (dtrp.time ? ' HH:mm' : '')), moment(datetime).format('DD.MM.YYYY' + (dtrp.time ? ' HH:mm' : '')), true);
            } else {
                // Установить текущую дату и время
                dtrp.obj.data('dateRangePicker').setDateRange(moment().format('DD.MM.YYYY' + (dtrp.time ? ' HH:mm' : '')), moment().format('DD.MM.YYYY' + (dtrp.time ? ' HH:mm' : '')), true);
                dtrp.obj.data('dateRangePicker').clear();
                dtrp.select_date = null; // чтобы вернуло нет даты
            }
            if (e === "disabled") {
                dtrp.obj.prop("disabled", true);
            }
        },
        enable: function (enb) {
            dtrp.obj.prop("disabled", !enb);
        },
        val: function () {
            return dtrp.obj.val();
            //dtrp.getDateTime();
        }
    };
    dtrp.init(obj_select, property, close_function);
    return dtrp;
}
//==============================================================================================
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
// Получить список для выбора в компоненте JQuery UI Autocomplete
var getAutocompleteList = function (list, field_value) {
    var alist = [];
    if (list) {
        for (i = 0, j = list.length; i < j; i++) {
            alist.push({ value: (field_value === 'value' ? list[i].value : list[i].text), label: list[i].value + " - " + list[i].text });
        }
    }
    return alist;
};
// Получить список для выбора в компоненте JQuery UI Autocomplete
var getAutocompleteListText = function (list, field_value) {
    var alist = [];
    if (list) {
        for (i = 0, j = list.length; i < j; i++) {
            alist.push({ value: (field_value === 'value' ? list[i].value : list[i].text), label: list[i].text });
        }
    }
    return alist;
};
// Инициализация компонента Input.Autocomplete
var initAutocomplete = function (obj_input, property, source, view, text_default) {
    var lang = 'ru';
    var minLength = 2;
    if (property.lang) {
        lang = property.lang;
    }
    if (property.minLength) {
        minLength = property.minLength;
    }
    return obj_input.autocomplete({
        minLength: minLength,
        source: source,
        change: function (event, ui) {
            if (typeof view === 'function') {
                view(obj_input.val());
            }
        },
        select: function (event, ui) {
            //if (ui.item.value)
        },
        search: function (event, ui) {
            if (typeof view === 'function') {
                view(obj_input.val());
            }
        },
        focus: function (event, ui) {
            if (ui.item.value)
                if (typeof view === 'function') {
                    view(ui.item.value);
                }
        }
    }).val(text_default ? text_default : '');
};
//==============================================================================================
/* ----------------------------------------------------------
    Вспомогательные функции
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
// Убрать Т из формата даты ISO
var getReplaceTOfDT = function (date) {
    return date !== null && date !== undefined ? date.replace(/T/g, ' ').replace(/Z/g, '') : null;
};
// Убрать время из даты ISO
var getSupstrTOfDT = function (date) {
    return date !== null ? date.substr(0, 10) : null;
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

var get_datetime_value = function (s_date, lang) {
    if (s_date) {
        var dt = moment(s_date, lang === 'ru' ? 'DD.MM.YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm:ss');
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
// Врнуть значение Input с проверкой
var get_input_number_value = function (obj) {
    if (obj) {
        return obj.val() !== '' ? Number(obj.val()) : null;
    }
    return null;
};

// Врнуть значение Input с проверкой
var get_input_string_value = function (obj) {
    if (obj) {
        return obj.val() !== '' ? $.trim(String(obj.val())) : null;
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
// Врнуть значение select типа Number с проверкой (-1 -> null, 0,1,2,3... )
var get_select_number_value = function (select) {
    if (select) {
        //var s = select.val();
        return select.val() === null || Number(select.val()) === -1 ? null : Number(select.val());
    }
    return null;
};
// Врнуть значение select типа String с проверкой (-1 -> null, строка.... )
var get_select_string_value = function (select) {
    if (select) {
        return select.val() === null || Number(select.val()) === -1 ? null : select.val();
    }
    return null;
};

var isNumeric = function (value) {
    return /^\d+$/.test(value);
};
var isDecimal = function (value) {
    return /^(0|[1-9]\d*)(\.[0-9]{1,2})?$/.test(value);
};

//==============================================================================================
/* ----------------------------------------------------------
    Функции вывода сообщений
-------------------------------------------------------------*/
var ALERT = function (alert) {
    this.alert = alert;
};
// Очистить сообщения
ALERT.prototype.clear_message = function () {
    if (this.alert) {
        this.alert.hide().text('').removeClass('alert-success alert-warning alert-danger');
    }
};
// Вывести сообщение об ошибке
ALERT.prototype.out_error_message = function (message) {
    if (this.alert) {
        this.alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
        if (message) {
            this.alert.append(message).append($('<br />'));
        }
    }
};
// Вывести сообщение об ошибке
ALERT.prototype.out_warning_message = function (message) {
    if (this.alert) {
        this.alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
        if (message) {
            this.alert.append(message).append($('<br />'));
        }
    }
};
// Вывести информационное сообщение
ALERT.prototype.out_info_message = function (message) {
    if (this.alert) {
        this.alert.show().removeClass('alert-danger alert-warning').addClass('alert-success');
        if (message) {
            this.alert.append(message).append($('<br />'));
        }
    }
};
//==============================================================================================
/* ----------------------------------------------------------
    Функции валидации и вывода сообщений
-------------------------------------------------------------*/
var VALIDATION = function (lang, alert, all_obj) {

    this.lang = lang;
    this.alert = alert;
    this.all_obj = all_obj;
    this.type_message = 0; // 0- ок 1-warning 2-error
};
VALIDATION.prototype.clear_all = function () {
    this.clear_message();
    this.clear_error();
};
// Очистить все ошибки
VALIDATION.prototype.clear_error = function (obj) {
    if (obj) {
        obj.removeClass('is-valid is-invalid');
    } else {
        this.all_obj.removeClass('is-valid is-invalid');
    }
};
// Очистить сообщения
VALIDATION.prototype.clear_message = function () {
    if (this.alert) {
        this.alert.hide().text('').removeClass('alert-success alert-warning alert-danger');
        this.type_message = 0;
    }
};
// Вывести сообщение об ошибке
VALIDATION.prototype.out_error_message = function (message) {
    if (this.alert) {
        if (this.type_message <= 1) {
            this.alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
            this.type_message = 2;
        }
        if (message) {
            this.alert.append(message).append($('<br />'));
        }
    }
};
// Вывести сообщение внимание
VALIDATION.prototype.out_warning_message = function (message) {
    if (this.alert) {
        if (this.type_message <= 0) {
            this.alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
            this.type_message = 1;
        }
        if (message) {
            this.alert.append(message).append($('<br />'));
        }
    }
};
// Вывести информационное сообщение
VALIDATION.prototype.out_info_message = function (message) {
    if (this.alert) {
        if (this.type_message === 0) {
            this.alert.show().removeClass('alert-warning alert-danger').addClass('alert-success');
        }
        if (message) {
            this.alert.text(message).append($('<br />'));
        }
    }
};
// Установить признак ошибка
VALIDATION.prototype.set_control_error = function (o, message) {
    o.removeClass('is-valid').addClass('is-invalid');
    if (message) {
        o.next(".invalid-feedback").text(message);
    } else { o.next(".invalid-feedback").text('') };
};
// Установить признак Ok
VALIDATION.prototype.set_control_ok = function (o, message) {
    o.removeClass('is-invalid').addClass('is-valid');
    if (message) {
        o.next(".valid-feedback").text(message);
    } else { o.next(".invalid-feedback").text('') };
};
// Установить признак ошибка
VALIDATION.prototype.set_object_error = function (o, mes_error) {
    this.set_control_error(o, mes_error);
    this.out_error_message(mes_error);
    return false;
};
// Установить признак ок
VALIDATION.prototype.set_object_ok = function (o, mes_ok) {
    this.set_control_ok(o, mes_ok);
    this.out_info_message(mes_ok);
    return true;
};
// Проверка на пустое значение
VALIDATION.prototype.checkValueOfNull = function (o, val, mes_error, mes_ok) {
    if (val === '' || val === null) {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    } else {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    }
};
// Проверка на пустой объект
VALIDATION.prototype.checkInputOfNull = function (o, mes_error, mes_ok, off_message) {
    if (o.val() === '' || o.val() === null) {
        this.set_control_error(o, mes_error);
        if (!(off_message !== undefined && off_message))
            this.out_error_message(mes_error);
        return false;
    } else {
        this.set_control_ok(o, mes_ok);
        if (!(off_message !== undefined && off_message))
            this.out_info_message(mes_ok);
        return true;
    }
};
// Проверка Select на выбраный раздел
VALIDATION.prototype.checkSelection = function (o, mes_error, mes_ok, off_message) {
    var s = Number(o.val())
    if (Number(o.val()) < 0) {
        this.set_control_error(o, mes_error);
        if (!(off_message !== undefined && off_message))
            this.out_error_message(mes_error);
        return false;
    } else {
        this.set_control_ok(o, mes_ok);
        if (!(off_message !== undefined && off_message))
            this.out_info_message(mes_ok);
        return true;
    }
};
// проверка на шаблон
VALIDATION.prototype.checkRegexp = function (o, regexp, mes_error, mes_ok) {
    if (!(regexp.test(o.val()))) {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    } else {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    }
};
// проверка на шаблон (пустое значение - допускается)
VALIDATION.prototype.checkRegexp_IsNull = function (o, regexp, mes_error, mes_ok) {
    if (o.val() !== '' && o.val() !== null) {
        if (!(regexp.test(o.val()))) {
            this.set_control_error(o, mes_error);
            this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    }

};
// Проверим Input введенное значение входит в размер строки (пустое значение - не допускается)
VALIDATION.prototype.checkInputOfLength = function (o, min, max, mes_error, mes_ok) {
    if (o.val() !== '' && o.val() !== null) {
        var count = o.val().length;
        if (isNaN(count) || count > max || count < min) {
            this.set_control_error(o, mes_error);
            this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    }
};

// Проверим Input введенное значение входит в диапазон (пустое значение - не допускается)
VALIDATION.prototype.checkInputOfRange = function (o, min, max, mes_error, mes_ok) {
    if (o.val() !== '' && o.val() !== null) {
        var value = Number(o.val());
        if (isNaN(value) || value > max || value < min) {
            this.set_control_error(o, mes_error);
            this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    }
};
// Проверим Input введенное значение входит в диапазон (пустое значение - допускается)
VALIDATION.prototype.checkInputOfRange_IsNull = function (o, min, max, mes_error, mes_ok) {
    if (o.val() !== '' && o.val() !== null) {
        var value = Number(o.val());
        if (isNaN(value) || value > max || value < min) {
            this.set_control_error(o, mes_error);
            this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    }
};
// Проверим Input введенное значение соответствует формату даты и времени (пустое значение - не допускается)
VALIDATION.prototype.checkInputOfDateTime = function (o, format, mes_ok) {
    if (o.val() !== '' && o.val() !== null) {
        var s = o.val();
        var dt = moment(o.val(), format);
        if (!dt.isValid()) {
            this.set_control_error(o, "Дата должна быть указана в формате '" + format + "'");
            this.out_error_message("Дата должна быть указана в формате '" + format + "'");
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_error(o, "Дата должна быть указана в формате '" + format + "'");
        this.out_error_message("Дата должна быть указана в формате '" + format + "'");
        return false;
    }
};
// Проверим Input введенное значение соответствует формату даты и времени (пустое значение - допускается)
VALIDATION.prototype.checkInputOfDateTime_IsNull = function (o, format, mes_ok) {
    if (o.val() !== '' && o.val() !== null) {
        var s = o.val();
        var dt = moment(o.val(), format);
        if (!dt.isValid()) {
            this.set_control_error(o, "Дата должна быть указана в формате '" + format + "'");
            this.out_error_message("Дата должна быть указана в формате '" + format + "'");
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    }
};
// Проверим Input введенное значение есть в списке (пустое значение - не допускается)
VALIDATION.prototype.checkInputOfList = function (o, list, mes_error, mes_ok, off_message) {
    if (o.val() !== '' && o.val() !== null) {
        var text = o.val();
        var obj = getObjects(list, 'text', text);
        if (!obj || obj.length === 0) {
            this.set_control_error(o, mes_error);
            if (!(off_message !== undefined && off_message))
                this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            if (!(off_message !== undefined && off_message))
                this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_error(o, mes_error);
        if (!(off_message !== undefined && off_message))
            this.out_error_message(mes_error);
        return false;
    }
};
// Проверим Input введенное значение есть в списке (пустое значение - допускается)
VALIDATION.prototype.checkInputOfList_IsNull = function (o, list, mes_error, mes_ok, off_message) {
    if (o.val() !== '' && o.val() !== null) {
        var text = o.val();
        var obj = getObjects(list, 'text', text);
        if (!obj || obj.length === 0) {
            this.set_control_error(o, mes_error);
            if (!(off_message !== undefined && off_message))
                this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            if (!(off_message !== undefined && off_message))
                this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_ok(o, mes_ok);
        if (!(off_message !== undefined && off_message))
            this.out_info_message(mes_ok);
        return true;
    }
};
// Проверим Input введенное значение есть в в указаном справочнике (пустое значение - не допускается)
VALIDATION.prototype.checkInputOfDirectory = function (o, link, name_func, mes_error, mes_ok, off_message) {
    if (o.val() !== '' && o.val() !== null) {
        var result = null;
        eval('result = link.' + name_func + '(Number(o.val()))');
        if (!result || result.length === 0) {
            this.set_control_error(o, mes_error);
            if (!(off_message !== undefined && off_message))
                this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            if (!(off_message !== undefined && off_message))
                this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_error(o, mes_error);
        if (!(off_message !== undefined && off_message))
            this.out_error_message(mes_error);
        return false;
    }
};
// Проверим Input введенное значение есть в в указаном справочнике (пустое значение - допускается)
VALIDATION.prototype.checkInputOfDirectory_IsNull = function (o, link, name_func, mes_error, mes_ok, off_message) {
    if (o.val() !== '' && o.val() !== null) {
        var result = null;
        eval('result = link.' + name_func + '(Number(o.val()))');
        if (!result || result.length === 0) {
            this.set_control_error(o, mes_error);
            if (!(off_message !== undefined && off_message))
                this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            if (!(off_message !== undefined && off_message))
                this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_ok(o, mes_ok);
        if (!(off_message !== undefined && off_message))
            this.out_info_message(mes_ok);
        return true;
    }
};
// Проверим Input введенное значение есть в в указаном справочнике (пустое значение - не допускается)
VALIDATION.prototype.checkInputTextOfDirectory = function (o, link, name_func, field, mes_error, mes_ok, off_message) {
    if (o.val() !== '' && o.val() !== null) {
        var result = null;
        eval('result = link.' + name_func + '("' + field + '", link.lang, o.val())');
        if (!result || result.length === 0) {
            this.set_control_error(o, mes_error);
            if (!(off_message !== undefined && off_message))
                this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            if (!(off_message !== undefined && off_message))
                this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_error(o, mes_error);
        if (!(off_message !== undefined && off_message))
            this.out_error_message(mes_error);
        return false;
    }
};
// Проверим Input введенное значение есть в в указаном справочнике (пустое значение - допускается)
VALIDATION.prototype.checkInputTextOfDirectory_IsNull = function (o, link, name_func, field, mes_error, mes_ok, off_message) {
    if (o.val() !== '' && o.val() !== null) {
        var result = null;
        var ss = o.val();
        eval('result = link.' + name_func + '("' + field + '", link.lang, o.val())');
        if (!result || result.length === 0) {
            this.set_control_error(o, mes_error);
            if (!(off_message !== undefined && off_message))
                this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o, mes_ok);
            if (!(off_message !== undefined && off_message))
                this.out_info_message(mes_ok);
            return true;
        }
    } else {
        this.set_control_ok(o, mes_ok);
        if (!(off_message !== undefined && off_message))
            this.out_info_message(mes_ok);
        return true;
    }
};
//==============================================================================================
/* ----------------------------------------------------------
    Функции УЗ
-------------------------------------------------------------*/
// Проверка системной нумерации
var is_valid_num_wagon = function (num) {
    if (num) {
        if (!isNumeric(num)) return false;
        if (!(Number(num) >= 10000000 && Number(num) <= 99999999)) return false;
        var symbols = String(num).split(""); // разбиваем на массив символов
        if (symbols.length !== 8) return false;
        var cs = Number(symbols[7]);
        symbols.length--;
        var kof = [2, 1, 2, 1, 2, 1, 2];
        var result = 0;
        for (ni = 0; ni < symbols.length; ni++) {
            var res_k = symbols[ni] * kof[ni];
            if (res_k > 9) {
                var symbols_k = String(res_k).split(""); // разбиваем на массив символов
                res_k = Number(symbols_k[0]) + Number(symbols_k[1]);
            }
            result += Number(res_k);
        }
        result = Number(result) + cs;
        var res = result % 10;
        if (res === 0) { return true; } else { return false; }
    }
    return false;
};
// Проверка списка вагонов
var is_valid_nums = function (nums, alert, valid_sys_numbering, valid_not_null) {
    // Проверим список вагонов
    if (!nums || nums === null) {
        if(!valid_not_null) alert.out_warning_message(langView('mess_error_not_cars', App.Langs));
        return null;
    }
    var isNumeric = function (value) {
        return /^\d+$/.test(value);
    };
    // Провкерка на правильный ввод номеров
    var valid = true;
    var car_valid = [];
    var car_out = [];
    var cars = nums.split(';');

    var num_valid = valid_sys_numbering;

    $.each(cars, function (i, el) {
        if (!isNumeric($.trim(el))) {
            alert.out_warning_message(langView('mess_error_input_num_cars', App.Langs).format((i + 1), el));
            valid = false;
        } else {
            if (Number($.trim(el)) <= 0) {
                alert.out_warning_message(langView('mess_error_input_num_cars1', App.Langs).format((i + 1), el));
                valid = false;
            } else {
                // Разрешена проверка системной нумерации
                if (num_valid) {
                    var num_val = is_valid_num_wagon(Number($.trim(el)));
                    // Если валидный добавим в список
                    if (num_val) {
                        car_valid.push(Number($.trim(el)));
                        car_out.push(Number($.trim(el)));
                    } else {
                        alert.out_warning_message(langView('mess_error_input_num_cars2', App.Langs).format((i + 1), el));
                    }
                    valid = valid & num_val;
                } else {
                    // добавим в список
                    car_valid.push(Number($.trim(el)));
                    car_out.push(Number($.trim(el)));
                }
            }
        }
    });
    // Провкерка на повторяющиеся номера
    arr_res = [];
    car_valid.sort();
    for (var i = 1; i < car_valid.length; i++) {
        if (car_valid[i] === car_valid[i - 1]) {
            var is_unique = true;
            for (var k = 0; k < arr_res.length; k++) {
                if (arr_res[k] === car_valid[i]) {
                    is_unique = false;
                    break;
                }
            }
            if (is_unique) {
                arr_res.push(car_valid[i]);
            }
        }
    }
    // Вывод сообщений повторяющихся номеров
    $.each(arr_res, function (i, el) {
        alert.out_warning_message(langView('mess_error_input_num_cars_duble', App.Langs).format(el));
        valid = false;
    });
    return valid ? car_out : null;
}
// Проверка списка документов
var is_valid_docs = function (nums, alert, valid_not_null) {
    // Проверим список вагонов
    if (!nums || nums === null) {
        if (!valid_not_null) alert.out_warning_message(langView('mess_error_not_docs', App.Langs));
        return null;
    }
    var isNumeric = function (value) {
        return /^\d+$/.test(value);
    };
    // Провкерка на правильный ввод номеров
    var valid = true;
    var car_valid = [];
    var car_out = [];
    var cars = nums.split(';');

    $.each(cars, function (i, el) {
        if (!isNumeric($.trim(el))) {
            alert.out_warning_message(langView('mess_error_input_num_docs', App.Langs).format((i + 1), el));
            valid = false;
        } else {
            if (Number($.trim(el)) <= 0) {
                alert.out_warning_message(langView('mess_error_input_num_docs1', App.Langs).format((i + 1), el));
                valid = false;
            } else {
                // Разрешена проверка системной нумерации
                // добавим в список
                car_valid.push(Number($.trim(el)));
                car_out.push(Number($.trim(el)));
            }
        }
    });
    // Провкерка на повторяющиеся номера
    arr_res = [];
    car_valid.sort();
    for (var i = 1; i < car_valid.length; i++) {
        if (car_valid[i] === car_valid[i - 1]) {
            var is_unique = true;
            for (var k = 0; k < arr_res.length; k++) {
                if (arr_res[k] === car_valid[i]) {
                    is_unique = false;
                    break;
                }
            }
            if (is_unique) {
                arr_res.push(car_valid[i]);
            }
        }
    }
    // Вывод сообщений повторяющихся номеров
    $.each(arr_res, function (i, el) {
        alert.out_warning_message(langView('mess_error_input_num_docs_duble', App.Langs).format(el));
        valid = false;
    });
    return valid ? car_out : null;
}
// Вернуть режим
var outOperation = function (i) {
    if (i === null) return null;
    switch (Number(i)) {
        case 1: return "ПРИБЫТИЕ";
        case 2: return "ТСП";
        default: return i;
    }
};

// Вернуть режим
var outStatusArrivalSostav = function (i) {
    if (i === null) return null;
    switch (Number(i)) {
        case 0: return "Не обработан";
        case 1: return "В работе";
        case 2: return "Принят";
        case 3: return "Отклонен";
        default: return i;
    }
};
// Вернуть режим
var outStatusOutgoingSostav = function (i) {
    if (i === null) return null;
    switch (Number(i)) {
        case 0: return "Предъявлен";
        case 1: return "Обрабатывается";
        case 2: return "Сдан на УЗ";
        case 3: return "Отправлен на УЗ";
        case 4: return "Отменен";
        default: return i;
    }
};

var get_status_epd = function (status) {
    switch (status) {
        case 0: { return langView('epd_status_unknown', App.Langs) }
        case 1: { return langView('epd_status_draft', App.Langs) }
        case 2: { return langView('epd_status_sending', App.Langs) }
        case 3: { return langView('epd_status_registered', App.Langs) }
        case 4: { return langView('epd_status_reclaiming', App.Langs) }
        case 5: { return langView('epd_status_accepted', App.Langs) }
        case 6: { return langView('epd_status_delivered', App.Langs) }
        case 7: { return langView('epd_status_recieved', App.Langs) }
        case 8: { return langView('epd_status_uncredited', App.Langs) }
        case 9: { return langView('epd_status_recieved_draft', App.Langs) }
        case 10: { return langView('epd_status_recieved_sending', App.Langs) }
        case 11: { return langView('epd_status_recieved_reclaiming', App.Langs) }
        case 12: { return langView('epd_status_canceled', App.Langs) }
        case 13: { return langView('epd_status_locked', App.Langs) }
        default: { return null; }
    }
}

//==============================================================================================
/* ----------------------------------------------------------
    Функции САП
-------------------------------------------------------------*/

var outSAP_KOD_R_10 = function (s) {
    if (s === null) return null;
    switch (s) {
        case '@5A@': return "Запрещена";
        case '@5B@': return "Разрешена";
        case '@5C@': return "Запрещена";
        default: return s;
    }
};