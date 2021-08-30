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
            'mess_update_parks': 'Обновляю парки...',
        },
        'en':  //default language: English
        {
            'mess_load_reference': 'Loading references ...',
            'mess_update_parks': 'Updating parks ...',
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

    var TDPW = App.table_dir_park_ways;
    var tdpw = new TDPW('div#park-ways'); // Создадим экземпляр таблицы

    var TDPARK = App.table_dir_park_station;
    var tdpark = new TDPARK('div#park-station'); // Создадим экземпляр таблицы

    var active_tab = 0;
    // Инициализируем tabs
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        switch (e.target.id) {
            case 'pills-park-station-tab': {
                active_tab = 0;
                alert.clear_message();
                view_parks();
                break;
            }
            case 'pills-parks-tab': {
                alert.clear_message();
                active_tab = 1;
                tdpw.load();
                break;
            }

        }
    })
    // Обновить парки по станции
    var $bt_search_wagon = $('button#view_ways').on('click', function (event) {
        event.preventDefault();
        //LockScreen(langView('mess_update_parks', App.Langs));
        tdpark.update();
        //view_parks();
    });
    // Сообщения
    var alert = new ALERT($('div#main-alert')); // Создадим класс ALERTG

    var $station = $('select#station');

    var station = null;

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
    // Показать парки пос танции
    var view_parks = function () {
        alert.clear_message();
        var id_station = Number(station.val());
        if (id_station >= 0) {
            tdpark.load_of_station(id_station);
        } else {
            alert.out_warning_message("Выберите станцию");
        }
    }
    // После загрузки документа
    $(document).ready(function ($) {
        // Загрузим справочники, с признаком обязательно
        load_db(['station', 'ways'], true, function (result) {
            // Инициализация модуля "Таблица справочника парков"
            tdpw.init({
                alert: alert,
                ids_dir: ids_dir,
            }, function () {
                tdpw.load();
            });
            // Инициализация модуля "Таблица справочника парки по станции"
            tdpark.init({
                alert: alert,
                ids_dir: ids_dir,
                detali_ways: true,
                // Функция обратного вызова (модуль сделал изменение в базе, list-список таблиц для перезагрузки)
                fn_db_update: function (list) {
                    // Обновить таблицы согласно списка - принудительно, result- список фактически обновленных таблиц
                    load_db(list, true, function (result) {
                        // После оновления глобального - обновим в дочернем элементе парки по станции
                        this.update();
                    }.bind(this));
                }.bind(tdpark),
            }, function () {

            });
            // Обновим списки
            var list_station = ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
            station = new fc_ui.init_select($station, list_station, -1, null, function (e, ui) {
                event.preventDefault();
                // Обработать выбор
                var id = Number($(e.currentTarget).val());
                tdpark.load_of_station(id)
            });
            LockScreenOff();
        }.bind(this));
    });

})(jQuery); // End of use strict