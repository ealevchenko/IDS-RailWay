(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    var format_date = "YYYY-MM-DD";

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mainuf_load_reference': 'Загружаю справочники...',
            'mainuf_init_main': 'Инициализация формы ...',
        },
        'en':  //default language: English
        {
            'mainuf_load_reference': 'Loading references...',
            'mainuf_init_main': 'Form initialization...',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var IDS_DIRECTORY = App.ids_directory;
    var ids_dir = new IDS_DIRECTORY();

    var IDS_WSD = App.ids_wsd;
    var ids_wsd = new IDS_WSD();

    // Создать модальную форму "Окно сообщений"
    var MCF = App.modal_confirm_form;
    var modal_confirm_form = new MCF("mcc"); // Создадим экземпляр окно сообщений


    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    // Создадим форму правки информации по вагону
    //var FDL = App.form_dialog;
    //var form_info = new FDL();
    //var form_edit = new FDL();

    var TDIR = App.table_directory;


    var alert = App.alert_form;
    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var SRV = App.ids_server;
    var ids_srv = new SRV(); // Создадим класс ids_server


    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mainuf_load_reference', App.Langs));
        if (list) {
            ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };
    // Функция получения информации из сервера
    var get_server_info = function () {
        // Запрос клиентов 
        ids_srv.getCountClient(function (count) {
            $('a#client_count').text(count);
        });
    }
    // После загрузки документа
    $(document).ready(function ($) {
        LockScreen(langView('mainuf_init_main', App.Langs));
        modal_confirm_form.init();
        // Загрузим справочники, с признаком обязательно
        load_db(['operators_wagons'], true, function (result) {
            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);

            var process = 1;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    this.table_operators_wagons.view(ids_dir.list_operators_wagons);
                    LockScreenOff();
                }
            }.bind(this);

            this.table_operators_wagons = new TDIR('div#operators-wagons');               // Создадим экземпляр
            // Инициализация модуля "Таблица прибывающих составов"
            this.table_operators_wagons.init({
                alert: null,
                detali_table: false,
                type_report: 'operators_wagons_select',     //
                link_num: false,
                ids_dir: ids_dir,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {
                    //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                    //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav);
                    //    LockScreenOff();
                    //} else {
                    //    this.table_adop_sostav_detali.view([]);
                    //    LockScreenOff();
                    //}
                }.bind(this),
            });

            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict