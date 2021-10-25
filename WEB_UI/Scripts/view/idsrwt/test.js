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

    //var wsd = App.ids_wsd;
    //var ids_wsd = new wsd();

    //var directory = App.ids_directory;
    //var ids_dir = new directory();



    //var MCF = App.modal_confirm_form;
    //var mcf_test = new MCF('confirm-test'); // Создадим экземпляр окно сообщений



    //var OP_SEND = App.operation_send;
    //var oper_send = new OP_SEND('div#operation-send'); // Создадим экземпляр

    //var TCOPER = App.table_cars_operation;
    //var tab_car_oper = new TCOPER('div#cars-oper'); // Создадим экземпляр

    //var TCWay = App.table_cars_way;
    //var t_wagons = new TCWay('div#wagons'); // Создадим экземпляр

    //var VSC = App.view_send_cars;
    //var vsc = new VSC('div#wagons'); // Создадим экземпляр

    //var TSOW = App.table_sostav_outer_way;
    //var t_sow = new TSOW('div#sostav');             // Создадим экземпляр

    //var TCOW = App.table_cars_outer_way;
    //var t_cow = new TCOW('div#wagons');             // Создадим экземпляр

    //var VAC = App.view_arrival_cars;
    //var vac = new VAC('div#arrival');             // Создадим экземпляр

    //var TCOW = App.table_cars_outer_way;
    //var t_cow = new TCOW('div#wagons');             // Создадим экземпляр

    //var VHOA = App.view_history_operation_arrival;
    //var vhoa = new VHOA('div#history_operation_arrival');             // Создадим экземпляр

    //var VRC = App.view_return_cars;
    //var vrc = new VRC('div#return');             // Создадим экземпляр
    var TTB = App.table_total_balance;
    var table_total_balance = new TTB('div#total-balance');             // Создадим экземпляр

    $('button#arrival').on('click', function (e) {
        //var data = oper_send.operation;
        //tab_car_oper.view(data);
        //trWay.update_station_of_id(8);
        //trWay.update_park_of_id(8, 3);
        //trWay.update_way_of_id(227);
        /*        trWay.open_way(8, 75, 244);*/
        //mcf_test.view('Подпись', 'Текст сообщения', function (result) {

        //})
        //oper_send.update();
        //t_wagons.update(54152087);
        //vhoa.update();

    });

    // После загрузки документа
    $(document).ready(function ($) {

        table_total_balance.init({
            ids_wsd: null,
        }, function (init) {
            table_total_balance.load();
            //LockScreenOff();
        });

        //vrc.init({
        //    alert: null,
        //    ids_dir: null,
        //    ids_wsd: null,
        //    fn_db_update: function (list) {
        //    }.bind(this),
        //}, function (init) {
        //    vrc.view(107);//880
        //    LockScreenOff();
        //});

        //        vhoa.init({
        //            alert: null,
        //            ids_dir: null,
        //            ids_wsd: null,
        //            fn_db_update: function (list) {
        //            }.bind(this),
        //        }, function (init) {
        ///*            vac.view(123);//880*/
        //            LockScreenOff();
        //        });
        //t_sow.init({
        //    alert: alert,
        //    type_report: 'arrival-outer-way',  // Прибвыающие составы на внешнем пути
        //    ids_wsd: ids_wsd,
        //}, function () {
        //    t_sow.load_ow_arr_sostav();
        //    //t_wagons.load_of_way(218, 54152087);//112
        //    //t_wagons.load_of_way(218);//112
        //});
        //vac.init({
        //    alert: null,
        //    ids_dir: null,
        //    ids_wsd: null,
        //    fn_db_update: function (list) {
        //    }.bind(this),
        //}, function (init) {
        //    vac.view(123);//880
        //    LockScreenOff();
        //});
        //t_cow.init({
        //    alert: alert,
        //    type_report: 'arrival-wagons-outer-way',  // Прибвыающие вагоны на внешнем пути
        //    ids_wsd: ids_wsd,
        //}, function () {
        //    t_cow.load_ow_arr_wagons_of_sostav('51-29092021153500');
        //    //t_wagons.load_of_way(218, 54152087);//112
        //    //t_wagons.load_of_way(218);//112
        //});

        //vsc.init({
        //    alert: null,
        //    ids_dir: null,
        //    ids_wsd: null,
        //    fn_db_update: function (list) {
        //    }.bind(this),
        //}, function (init) {
        //    vsc.view(215)
        //    //LockScreenOff();
        //});

        //t_wagons.init({
        //    alert: alert,
        //    ids_wsd: ids_wsd,
        //}, function () {
        //    //t_wagons.load_of_way(218, 54152087);//112
        //    t_wagons.load_of_way(218);//112
        //});

        //oper_send.init({
        //    alert: alert,
        //    ids_dir: ids_dir,
        //    ids_wsd: ids_wsd,
        //},
        //    function () {
        //        // Инициализация закончилась
        //        tab_car_oper.init({ alert: alert });
        //    });
        LockScreenOff();

    });

})(jQuery); // End of use strict