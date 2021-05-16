(function ($) {
    "use strict"; // Start of use strict
    var App = window.App;
    var $ = window.jQuery;

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var $num_wagon = $('input#num_wagon').val(getUrlVar('num'));

    var alert = new ALERT($('div#main-alert')); // Создадим класс ALERTG

    var $bt_search_wagon = $('button#bt_search_wagon').on('click', function (event) {
        event.preventDefault();
        search_wagon();
    });

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Определим экземпляр таблица вагоны прибытие
    var TAW = App.table_arrival_wagons;
    var taw = new TAW('table#table_arrival_wagon'); // Создадим экземпляр таблицы
    // Определим экземпляр таблица вагоны прибытие
    var TWIR = App.table_wir;
    var twir = new TWIR('table#table_wir'); // Создадим экземпляр таблицы
    // Определим экземпляр таблица вагоны прибытие
    var TOW = App.table_outgoing_wagon;
    var tow = new TOW('table#table_outgoing_wagon'); // Создадим экземпляр таблицы

    // Найти вагон
    var search_wagon = function () {
        alert.clear_message();
        //clear(); // Очистим экран от старой информации
        LockScreen(langView('mess_delay', App.Langs));
        $bt_search_wagon.prop("disabled", true);
        var num = $num_wagon.val();
        if (!isNumeric(num) || !is_valid_num_wagon(num)) {
            // Ошибка ввода
            alert.out_error_message('Ошибка, введен неправильный номер :' + num);
            $bt_search_wagon.prop("disabled", false);
            LockScreenOff();
        } else {
            // Ок, начинаем поиск

            ids_rwt.getArrivalCarsOfNum(num, function (list_arrival_cars) {
                //table_arrival_wagon.view(list_arrival_cars);
                taw.view(list_arrival_cars);
                $bt_search_wagon.prop("disabled", false);
                LockScreenOff();
            });
        }
    };

    // После загрузки документа
    $(document).ready(function ($) {
        taw.init();
        taw.load_of_num($num_wagon.val());
        twir.init();
        twir.load_of_num($num_wagon.val());
        tow.init();
        tow.load_of_num($num_wagon.val());
        //search_wagon();
    });

})(jQuery); // End of use strict