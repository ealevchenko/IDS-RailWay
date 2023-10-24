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
            'mwa_load_reference': 'Загружаю справочники...',
            'mwa_init_main': 'Инициализация формы ...',
            'mwa_load': 'Загружаю ...',
            'mwa_update': 'Обновляю ...',
            'mwa_title_label_date': 'ПЕРИОД :',
            'mwa_title_label_station': 'СТАНЦИЯ ПРИБЫТИЯ:',
            'mwa_title_label_num_doc': '№ ДОКУМЕНТА:',
            'mwa_mess_load_sostav': 'Загружаю вагоны состава...',
            'mwa_card_header_detali': 'СОСТАВ',
            'mwa_card_header_detali_sostav': 'СОСТАВ [№ поезда:{0}, индекс поезда:{1}, дата прибытия :{2}, дата приема :{3}]',

            'mwa_mess_not_id_sostav': 'Состав не выбран, не определен id',
            'mwa_mess_ok_operation': 'Операция "ЗААДРЕСОВКА ВАГОНОВ" - Выполнена',
            'mwa_mess_error_operation': 'Ошибка выполнения операции "ЗААДРЕСОВКА ВАГОНОВ", код ошибки :',

        },
        'en':  //default language: English
        {
            'mwa_load_reference': 'Loading references...',
            'mwa_init_main': 'Form initialization...',
            'mwa_load': 'Loading ...',
            'mwa_update': 'Updating ...',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var IDS_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;

    var ids_dir = new IDS_DIRECTORY();
    var ids_wsd = new IDS_WSD();

    // Создать модальную форму "Окно сообщений"
    var MCF = App.modal_confirm_form;
    var modal_confirm_form = new MCF("mcc"); // Создадим экземпляр окно сообщений


    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var FIL = App.form_inline;
    var form_panel = new FIL();

    // Создадим форму правки информации по вагону
    /*    var FDL = App.form_dialog;*/
    //var form_info = new FDL();
    //var form_edit = new FDL();

    var FEWA = App.form_edit_wagon_addressing
    var fewa = new FEWA();

    var TDIR = App.table_directory;
    var table_arrival_cars = new TDIR('div#list-cars');                     // Создадим экземпляр
    //var TTDR = App.table_td_report;


    var alert = App.alert_form;
    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var SRV = App.ids_server;
    var ids_srv = new SRV(); // Создадим класс ids_server


    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mwa_load_reference', App.Langs));
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

    var $form_select = $('div#nb-wagon-addressing');
    var $header_card_tittle = $('div#header-card-title');


    var start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
    var stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
    var List_sostav = [];
    var list_station = [];
    var list_doc = [];
    var id_sostav = null;
    var list_wagons = [];

    var load_default = function () {
        load_arrival(start, stop)
    };

    var load_arrival = function (start, stop) {
        LockScreen(langView('mwa_load', App.Langs));
        ids_wsd.getViewIncomingSostav(start, stop, function (sostav) {
            start = start;
            stop = stop;
            List_sostav = sostav.filter(function (i) {
                return i.id_station_on !== null;
            }.bind(this));
            list_station = [];
            $.each(List_sostav, function (i, el) {
                var st = list_station.find(function (o) {
                    return o.value == el.id_station_on
                }.bind(this));
                if (!st) {
                    list_station.push({ value: el.id_station_on, text: el['station_on_name_' + App.Lang], disabled: false });
                }
            }.bind(this));
            form_panel.update('station', list_station, -1);
            load_docs(-1);
            table_arrival_cars.clear();
            LockScreenOff();
        }.bind(this));
    };

    var load_docs = function (id_station) {
        if (List_sostav !== null && List_sostav.length > 0 && id_station !== null) {
            LockScreen(langView('mwa_load', App.Langs));
            list_doc = [];
            $.each(List_sostav.filter(function (i) { return i.id_station_on === id_station }.bind(this)), function (i, el) {
                var doc = list_doc.find(function (o) {
                    return o.value == el.num_doc
                }.bind(this));
                if (!doc) {
                    list_doc.push({ value: el.num_doc, text: el.num_doc, disabled: false });
                }
            }.bind(this));
            form_panel.update('docs', list_doc, -1);
            table_arrival_cars.clear();
            LockScreenOff();
        }
    };

    var load_cars = function (num_doc) {
        var sostav = List_sostav.find(function (o) {
            return o.num_doc == num_doc;
        }.bind(this));
        id_sostav = sostav ? sostav.id : null;
        update(function () {
            LockScreenOff();
        }.bind(this));
    };

    var update = function (cb_refresh) {
        table_arrival_cars.clear();
        if (id_sostav) {
            LockScreen(langView('mwa_mess_load_sostav', App.Langs));
            ids_wsd.getViewIncomingCarsOfIDSostav(id_sostav, function (wagons) {
                list_wagons = wagons;
                /*                this.table_incoming_cars.id_sostav = this.id_sostav; // передадим состав*/
                // Отобразить информацию о составе
                if (list_wagons && list_wagons.length > 0) {
                    var arrival_sostav_train = list_wagons[0].arrival_sostav_train;
                    var arrival_sostav_composition_index = list_wagons[0].arrival_sostav_composition_index;
                    var arrival_sostav_date_arrival = list_wagons[0].arrival_sostav_date_arrival;
                    var arrival_sostav_date_adoption = list_wagons[0].arrival_sostav_date_adoption;
                    $header_card_tittle.empty().append(langView('mwa_card_header_detali_sostav', App.Langs).format(arrival_sostav_train, arrival_sostav_composition_index, getReplaceTOfDT(arrival_sostav_date_arrival), getReplaceTOfDT(arrival_sostav_date_adoption)));
                } else {
                    $header_card_tittle.empty().append(langView('mwa_card_header_detali', App.Langs));
                }
                table_arrival_cars.view(list_wagons);
                if (typeof cb_refresh === 'function') {
                    cb_refresh();
                }
            }.bind(this));
        } else {
            out_warning(langView('mwa_mess_not_id_sostav', App.Langs));
            if (typeof cb_refresh === 'function') {
                cb_refresh();
            }
        }
    };

    // Выполнить операцию обновить
    var action_refresh = function (cb_refresh) {
        out_clear();
        update(function () {
            if (typeof cb_refresh === 'function') {
                cb_refresh();
            }
        }.bind(this));
    };

    // Показать ошибки
    var out_error = function (message) {
        if (alert) {
            alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    var out_warning = function (message) {
        if (alert) {
            alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    var out_info = function (message) {
        if (alert) {
            alert.out_info_message(message)
        }
    }
    // Очистит  предупреждения
    var out_clear = function () {
        if (alert) {
            alert.clear_message()
        }
    }
    // После загрузки документа
    $(document).ready(function ($) {
        LockScreen(langView('mwa_init_main', App.Langs));
        // Загрузим справочники, с признаком обязательно
        load_db(['certification_data'], true, function (result) {
            var fl_interval_date = {
                type: 'interval_date',
                id: 'select_date',
                prefix: 'sm',
                title: langView('mwa_title_label_date', App.Langs),
                start: start,
                stop: stop,
                select: function (interval) {
                    if (interval && interval.start && interval.stop) {
                        load_arrival(moment(interval.start)._d, moment(interval.stop)._d);
                    }
                }.bind(this),
            };
            var fl_station = {
                type: 'select',
                id: 'station',
                prefix: 'sm',
                title: langView('mwa_title_label_station', App.Langs),
                list: list_station,
                select: function (e, ui) {
                    e.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    load_docs(id);
                }.bind(this),
            };
            var fl_docs = {
                type: 'select',
                id: 'docs',
                prefix: 'sm',
                title: langView('mwa_title_label_num_doc', App.Langs),
                list: list_doc,
                select: function (e, ui) {
                    e.preventDefault();
                    // Обработать выбор
                    var num_doc = Number($(e.currentTarget).val());
                    load_cars(num_doc)
                }.bind(this),
            };
            var fl_refresh = {
                type: 'button',
                id: 'refresh',
                prefix: 'sm',
                title: null,
                icon: 'fas fa-retweet',
                select: function (e, ui) {
                    e.preventDefault();
                    update(function () {
                        LockScreenOff();
                    }.bind(this));
                }.bind(this),
            };
            var fields = [];
            fields.push(fl_interval_date);
            fields.push(fl_station);
            fields.push(fl_docs);
            fields.push(fl_refresh);
            // Инициализация формы
            form_panel.init({
                fields: fields
            });
            $form_select.append(form_panel.$form);

            // Форма править состав по приему ===============================================================================
            fewa.init({
                mode: 0,
                alert: alert,
                ids_wsd: ids_wsd,
                fn_init: function (init) {
                    // На проверку окончания инициализации
                    //----------------------------------
                    //if (typeof this.settings.fn_init === 'function') {
                    //    this.settings.fn_init(this.result_init);
                    //}
                    //----------------------------------
                }.bind(this),
                fn_add: function (result) {

                }.bind(this),
                fn_edit: function (result) {
                    out_clear();
                    action_refresh(function () {
                        if (result && result.result > 0) {
                            out_info(langView('mwa_mess_ok_operation', App.Langs));
                        } else {
                            out_info(langView('mwa_mess_error_operation', App.Langs));
                        }
                        LockScreenOff();
                    }.bind(this));
                }.bind(this),
            });
            // Инициализация модуля "Таблица операторов вагонов"
            table_arrival_cars.init({
                alert: null,
                detali_table: false,
                type_report: 'arrival_cars',     //
                link_num: false,
                ids_dir: ids_dir,
                fn_init: function () {

                },
                fn_refresh: function () {
                    action_refresh(function () {
                        LockScreenOff();
                    }.bind(this));
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_action_edit_wagon: function (rows) {
                    out_clear();
                    if (rows !== null && rows.length > 0) {
                        fewa.edit(rows);
                    }
                },
            });
            //
            load_default();

            //LockScreenOff();

            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);
            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict