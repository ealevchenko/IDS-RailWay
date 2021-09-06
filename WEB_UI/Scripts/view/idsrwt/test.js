(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var alert = new ALERT($('div#main-alert')); // Создадим класс ALERTG

    //var TDPW = App.table_dir_park_ways;
    //var tdpw = new TDPW('div#park-ways'); // Создадим экземпляр таблицы

    //var TDPARK = App.table_dir_park_station;
    //var tdpark = new TDPARK('div#park'); // Создадим экземпляр таблицы

    var wsd = App.ids_wsd;
    var ids_wsd = new wsd();

    var directory = App.ids_directory;
    var ids_dir = new directory();



    var MCF = App.modal_confirm_form;
    var mcf_test = new MCF('confirm-test'); // Создадим экземпляр окно сообщений



    var OP_SEND = App.operation_send;
    var oper_send = new OP_SEND('div#operation-send'); // Создадим экземпляр

    var TCOPER = App.table_cars_operation;
    var tab_car_oper = new TCOPER('div#cars-oper'); // Создадим экземпляр


    $('button#arrival').on('click', function (e) {
        //var data = oper_send.operation;
        //tab_car_oper.view(data);
        //trWay.update_station_of_id(8);
        //trWay.update_park_of_id(8, 3);
        //trWay.update_way_of_id(227);
        /*        trWay.open_way(8, 75, 244);*/
        //mcf_test.view('Подпись', 'Текст сообщения', function (result) {

        //})
        oper_send.update();

    });

    // После загрузки документа
    $(document).ready(function ($) {
        oper_send.init({
            alert: alert,
            ids_dir: ids_dir,
            ids_wsd: ids_wsd,
        },
            function () {
                // Инициализация закончилась
                tab_car_oper.init({ alert: alert });
            });
        LockScreenOff();

    });

})(jQuery); // End of use strict