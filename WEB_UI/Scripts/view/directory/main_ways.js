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

        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var ids_dir = new IDS_DIRECTORY(App.Lang);                // Создадим класс IDS_DIRECTORY
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

    var load_reference = function (callback) {
        LockScreen(langView('mess_load_reference', App.Langs));
        var count = 1;
        ids_dir.load(['station', 'ways'], false, function () {
            count -= 1;
            if (count === 0) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
    };
    // Показать пути
    var view_ways = function () {
        alert.clear_message();
        var id_station = station.val();
        var id_park = park.val();
        if (id_station >= 0 && id_park >= 0) {
            tdways.load_of_station_park(id_station, id_park);
        } else {
            alert.out_warning_message("Выберите станцию и парк");
        }
    }

    // После загрузки документа
    $(document).ready(function ($) {
        // Инициализация модуля "Таблица справочника путей"
        tdways.init({
            alert: alert
        }, function () {
            /*            tdways.load_of_station_park(23, 161);*/
        });
        // Загрузим справочники
        load_reference(function () {
            var list_station = ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
            var get_list_park = function (id_statation) {
                var list_way = ids_dir.list_ways.filter(function (i) {
                    return i.id_station == id_statation;
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
            station = new fc_ui.init_select($station, list_station, -1, null, function (e, ui) {
                event.preventDefault();
                // Обработать выбор
                var id = Number($(e.currentTarget).val());
                park.update(get_list_park(id), -1, null);
            });
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