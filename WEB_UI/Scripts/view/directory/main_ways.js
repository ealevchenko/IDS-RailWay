(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

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

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var IDS_DIRECTORY = App.ids_directory;
    var ids_dir = new IDS_DIRECTORY();
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var fc_ui = new FC();
    // Модуль "Таблица справочника путей"
    var TDWAY = App.table_dir_way;
    var tdways = new TDWAY('div#ways'); // Создадим экземпляр таблицы

    var $bt_search_wagon = $('button#view_ways').on('click', function (event) {
        event.preventDefault();
        view_ways();
    });

    var alert = new ALERT($('div#main-alert')); // Создадим класс ALERTG
    var $station = $('select#station');
    var $park = $('select#park');
    var station = null;
    var park = null;
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mess_load_reference', App.Langs));
        if (list) {
            ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };
    // Показать пути
    var view_ways = function () {
        alert.clear_message();
        var id_station = station.val();
        var id_park = park.val();
        if (id_station !== null && id_park != null && id_station >= 0 && id_park >= 0) {
            tdways.load_of_station_park(id_station, id_park);
        } else {
            alert.out_warning_message("Выберите станцию и парк");
            tdways.view([]);
        }
    };
    // Получить список парков по станции
    var get_list_park = function (id_station) {
        var list_way = ids_dir.list_ways.filter(function (i) {
            return i.id_station == id_station;
        })
        var list_park = [];
        $.each(list_way, function (i, el) {
            var pw = el.Directory_ParkWays
            var park = list_park.find(function (o) {
                return o.value === pw.id;
            });
            if (!park) {
                list_park.push({ value: pw.id, text: pw['park_name_' + App.Lang] });
            }
        });
        return list_park;
    };
    // Обновить список парков 
    var update_park = function () {
        var id_station = Number(station.val());
        var id_park = Number(park.val());
        var way = ids_dir.list_ways.find(function (o) {
            return o.id_station === id_station && o.id_park === id_park;
        });
        park.update(get_list_park(id_station), way ? id_park : -1, null);
        view_ways();
    };

    // После загрузки документа
    $(document).ready(function ($) {
        // Загрузим справочники, с признаком обязательно
        load_db(['station', 'ways'], true, function (result) {
            // Инициализация модуля "Таблица справочника путей"
            tdways.init({
                alert: alert,
                ids_dir: ids_dir,
                // Функция обратного вызова (модуль сделал изменение в базе, list-список таблиц для перезагрузки)
                fn_db_update: function (list) {
                    // Обновить таблицы согласно списка - принудительно, result- список фактически обновленных таблиц
                    load_db(list, true, function (result) {
                        var res_global = result;
                        update_park();
                        // Обновим таблицы в модуле
                        this.load_db(list, false, function (result) {
                            var list = null;
                            if (res_global) {
                                list = $.merge(res_global, result);
                            }
                            else {
                                list = result
                            };
                            // Обновим списочные компоненты в модуле, в зависимости от результата обновления
                            this.update_element(list);
                        }.bind(this));
                    }.bind(this));
                }.bind(tdways),
            }, function () {
                /*            tdways.load_of_station_park(23, 161);*/
            });
            // Обновим списки
            var list_station = ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
            // Инициализируем компонент список станций
            station = new fc_ui.init_select($station, list_station, -1, null, function (e, ui) {
                event.preventDefault();
                // Обработать выбор
                var id = Number($(e.currentTarget).val());
                park.update(get_list_park(id), -1, null);
            });
            // Инициализируем компонент список парков
            park = new fc_ui.init_select($park, get_list_park(-1), -1, null, function (e, ui) {
                event.preventDefault();
                // Обработать выбор
                var id = Number($(e.currentTarget).val());
                view_ways();
            });
            LockScreenOff();
        }.bind(this));
    });

})(jQuery); // End of use strict