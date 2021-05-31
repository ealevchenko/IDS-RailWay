(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    //var $num_wagon = $('input#num_wagon').val(getUrlVar('num'));

    //var alert = new ALERT($('div#main-alert')); // Создадим класс ALERTG

    //var $bt_search_wagon = $('button#bt_search_wagon').on('click', function (event) {
    //    event.preventDefault();
    //    search_num($num_wagon.val());
    //});

    //var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT
    //// Определим экземпляр таблица вагоны прибытие
    //var TAW = App.table_arrival_wagons;
    //var taw = new TAW('table#tab_arr'); // Создадим экземпляр таблицы
    //// Определим экземпляр таблица вагоны прибытие
    //var TWIR = App.table_wir;
    //var twir = new TWIR('table#tab_wir'); // Создадим экземпляр таблицы
    //// Определим экземпляр таблица вагоны прибытие
    //var TOW = App.table_outgoing_wagon;
    //var tow = new TOW('table#tab_out'); // Создадим экземпляр таблицы

    //var active_tab = 0;

    //$('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
    //    switch (e.target.id) {
    //        case 'pills-directory-tab': {
    //            active_tab = 0; break;
    //        }
    //        case 'pills-history-tab': {
    //            active_tab = 1; break;
    //        }
    //        case 'pills-arrival-tab': {
    //            active_tab = 2;
    //            view_arrival_wagon();
    //            break;
    //        };
    //        case 'pills-wir-tab': {
    //            active_tab = 3;
    //            view_wir_wagon();
    //            break;
    //        };
    //        case 'pills-outgoing-tab': {
    //            active_tab = 4;
    //            view_outgoing_wagon();
    //            break;
    //        };
    //    }
    //    //// newly activated tab
    //    //e.relatedTarget // previous active tab
    //})
    //// Показать вагоны в прибытиии
    //var view_arrival_wagon = function () {
    //    taw.load_of_num($num_wagon.val());
    //};
    //// Показать вагоны на АМКР
    //var view_wir_wagon = function () {
    //    twir.load_of_num($num_wagon.val());
    //};
    //// Показать вагоны в отправках
    //var view_outgoing_wagon = function () {
    //    tow.load_of_num($num_wagon.val());
    //};
    //// Проверка номера вагона
    //var search_num = function (num) {
    //    alert.clear_message();
    //    //clear(); // Очистим экран от старой информации
    //    LockScreen(langView('mess_delay', App.Langs));
    //    $bt_search_wagon.prop("disabled", true);
    //    if (!isNumeric(num) || !is_valid_num_wagon(num)) {
    //        // Ошибка ввода
    //        alert.out_error_message('Ошибка, введен неправильный номер :' + num);
    //        taw.view([]);
    //        twir.view([]);
    //        tow.view([]);
    //        $bt_search_wagon.prop("disabled", false);
    //        LockScreenOff();
    //    } else {
    //        switch (active_tab) {
    //            case 0: {
    //                $bt_search_wagon.prop("disabled", false);
    //                LockScreenOff();
    //                break;

    //            };
    //            case 1: {
    //                $bt_search_wagon.prop("disabled", false);
    //                LockScreenOff();
    //                break;
    //            };
    //            case 2: {
    //                view_arrival_wagon();
    //                $bt_search_wagon.prop("disabled", false);
    //                break;
    //            };
    //            case 3: {
    //                view_wir_wagon();
    //                $bt_search_wagon.prop("disabled", false);
    //                break;
    //            };
    //            case 4: {
    //                view_outgoing_wagon();
    //                break;
    //            };
    //        }
    //    }

    //};

    // Определим экземпляр таблица вагоны прибытие
    var TTWay = App.ids_tree_way;
    var trWay = new TTWay('div#tree-way'); // Создадим экземпляр таблицы

    $('button#arrival').on('click', function (e) {
        trWay.update_station_of_id(8);
    });

    // После загрузки документа
    $(document).ready(function ($) {
        trWay.init(function (id_station, id_park, id_way) {
            // Обраблтка выбраного пути
        }, function (name, id) {
            // Обработка события детально
        });
        trWay.view();
        //trWay.view(8, 75, 244);

        //LockScreenOff();
        //taw.init(true);
        //twir.init(true);
        //tow.init(true);
        //search_num($num_wagon.val());
    });

})(jQuery); // End of use strict