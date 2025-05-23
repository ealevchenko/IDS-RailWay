﻿(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mi_title_label_date': 'СОСТАВЫ ЗА ПЕРИОД :',
            'mi_title_label_station': 'СТАНЦИЯ ОТПРАВКИ:',
            'mi_init_main': 'Инициализация формы прибытие...',
            'mi_title_label_dropdown': 'Отчетная документация',
            'mi_title_report_draft_fst': 'Натурная ведомость поезда (черновик)',
            'mi_title_report_fst': 'Натурная ведомость поезда (А4)',
            'mi_title_report_fst_landscape': 'Натурная ведомость поезда (А4-альбомный)',
            'mi_title_report_fsci': 'Натурная ведомость коммерческого осмотра (А4)',
            'mi_title_report_fsci_landscape': 'Натурная ведомость коммерческого осмотра (А4-альбомный)',
            'mi_title_report_aica_kr': 'Заявка на выдачу коммерческого акта ст. КР. (А4)',
            'mi_title_report_aica_kr_gl': 'Заявка на выдачу коммерческого акта ст. КР Гл. (А4)',
            'mi_title_report_api_kr': 'Заявка на участие в выдаче ст. КР. (А4)',
            'mi_title_report_api_kr_gl': 'Заявка на участие в выдаче ст. КР Гл. (А4)',
            'mi_title_report_apaca_kr': 'Заявка на участие с попутным Ком. Актом ст. КР. (А4)',
            'mi_title_report_apaca_kr_gl': 'Заявка на участие с попутным Ком. Актом ст. КР Гл. (А4)',
            'mi_title_report_gfa': 'Акт общей формы (А4-альбомный)',
            'mi_title_report_dg20': 'Накладная предприятия ДГ-20 (А4-альбомный)',
            'mi_title_report_way': 'Путевая',
            'mi_operation_mess_print': 'Готовлю документ для печати ...',
            'mi_title_button_send_db_us_doc': 'БД ЭПД',

        },
        'en':  //default language: English
        {
            'mi_title_label_date': 'LINE-UP PERIOD :',
            'mi_title_label_station': 'DEPARTURE STATION:',
            'mi_init_main': 'Initializing form arrival...',
            'mi_title_label_dropdown': 'Reporting documentation',
            'mi_title_report_draft_fst': 'Натурная ведомость поезда(черновик)',
            'mi_title_report_fst': 'Train sheet',
            'mi_title_report_fsci': 'Commercial inspection sheet',
            'mi_title_report_aica_kr': 'Application for the issuance of a commercial act art. KR.',
            'mi_title_report_aica_kr_gl': 'Application for the issuance of a commercial act art. CR Ch.',
            'mi_title_report_api_kr': 'Application for participation in the issuance of art. KR.',
            'mi_title_report_api_kr_gl': 'Application for participation in the issuance of art. CR Ch.',
            'mi_title_report_apaca_kr': 'Application for participation with accompanying Kom. Act Art. KR.',
            'mi_title_report_apaca_kr_gl': 'Application for participation with a passing Kom. Act Art. CR Ch.',
            'mi_title_report_gfa': 'General Form Act',
            'mi_title_report_dg20': 'Invoice of enterprise DG-20',
            'mi_title_report_way': 'Travel',
            'mi_operation_mess_print': 'Preparing a document for printing...',
            'mi_title_button_send_db_us_doc': 'EPD DB',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var interval_min_epd = 180;
    var duration_min_epd = 0;

    var IDS_DIRECTORY = App.ids_directory;
    var ids_dir = new IDS_DIRECTORY();

    var IDS_WSD = App.ids_wsd;
    var ids_wsd = new IDS_WSD();
    // Модуль инициализаии компонентов формы
    /*    var FC = App.form_control;*/
    var FE = App.form_element;

    var FIL = App.form_inline;
    //var fc_ui = new FC();
    var fe_ui = new FE();
    var alert = App.alert_form;

    var TIS = App.table_incoming_sostav;
    var table_incoming_sostav = new TIS('div#incoming-sostav');             // Создадим экземпляр

    var FD = App.form_detali;
    var form_detali = new FD('div#cars-detali');             // Создадим экземпляр

    var VICC = App.view_incoming_cars;
    var view_incoming_cars = null;

    var VICR = App.view_incoming_report;
    var view_incoming_report = new VICR();

    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var SRV = App.ids_server;
    var ids_srv = new SRV(); // Создадим класс ids_server

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

    // Диапазон времени
    var start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
    var stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
    var id_station = null;  // По умолчанию не выбрана
    var list_station = [];
    var id_sostav = null;   // По умолчанию не выбрана

    // Считаем строку с дополнительными параметрами
    var id_arrival = getUrlVar('id_arrival');
    var arrival = getUrlVar('arrival');
    // Функция получения информации из сервера
    var get_server_info = function () {
        // Запрос клиентов 
        ids_srv.getCountClient(function (count) {
            $('a#client_count').text(count);
        });
        // Проверка базы
        ids_wsd.getLastDT_UZ_DOC_DB_IDS(function (last_date) {
            var curent = moment();
            if (last_date) {
                var last_db = moment(last_date);
                var duration = moment.duration(curent.diff(last_db))
                var duration_min = duration.as('minutes');
                table_incoming_sostav.duration_min_epd = duration_min;

                if (table_incoming_sostav.obj_t_sostav) {
                    table_incoming_sostav.obj_t_sostav.button(8).enable(false);
                    table_incoming_sostav.obj_t_sostav.button(8).text(langView('mi_title_button_send_db_us_doc', App.Langs) + '-' + duration_min.toFixed(1));
                    if (duration_min > interval_min_epd) {
                        table_incoming_sostav.obj_t_sostav.button(8).enable(true);
                    } else {
                        table_incoming_sostav.obj_t_sostav.button(8).enable(false);
                    }
                }
            } else {
                table_incoming_sostav.obj_t_sostav.button(7).text(langView('mi_title_button_send_db_us_doc', App.Langs) + '- error!');
                table_incoming_sostav.obj_t_sostav.button(7).enable(true);
            }
        });
    }
    // После загрузки документа
    $(document).ready(function ($) {
        // Обновить
        setInterval(function () {
            $('label#curent_date').text(moment().format(format_datetime));
        }, 1000);
        if (id_arrival && arrival) {
            start = moment(arrival).set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
            stop = moment(arrival).set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;

            id_sostav = Number(id_arrival);
        }
        LockScreen(langView('mi_init_main', App.Langs));
        // Загрузим справочники, с признаком обязательно
        load_db(['station'], true, function (result) {
            var div = $('div#nb-incoming');
            // Подгрузили списки
            list_station = ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === true && i.station_delete === null; });
            // Создадим форму выбора для отчета
            this.form_panel = new FIL();
            var fl_interval_date = {
                type: 'interval_date',
                id: 'select_date',
                prefix: 'sm',
                title: langView('mi_title_label_date', App.Langs),
                start: start,
                stop: stop,
                select: function (interval) {
                    if (interval && interval.start && interval.stop) {
                        table_incoming_sostav.load_outgoing_sostav(moment(interval.start)._d, moment(interval.stop)._d, function (sostav) {
                            this.view(sostav, id_station, null);
                            LockScreenOff();
                        }.bind(table_incoming_sostav));
                    }
                }.bind(this),
            };
            var fl_station = {
                type: 'select',
                id: 'station',
                prefix: 'sm',
                title: langView('mi_title_label_station', App.Langs),
                list: list_station,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    id_station = id > 0 ? id : null;
                    this.update(function (sostav) {
                        this.view(sostav, id_station, this.id_sostav);
                        LockScreenOff();
                    }.bind(this));
                }.bind(table_incoming_sostav),
            };
            var fields = [];
            fields.push(fl_interval_date);
            fields.push(fl_station);
            // Инициализация формы
            this.form_panel.init({
                fields: fields,
                cl_form: 'd-flex w-100'
            });
            // Отображение формы выбора 
            div.append(this.form_panel.$form);
            // Инициализация отчетных документов
            var element_dropdown = new fe_ui.bs_dropdown({
                color: 'secondary',
                size: 'sm',
                class: 'mr-2 ml-auto dropleft',
                id: 'dd-report',
                label: langView('mi_title_label_dropdown', App.Langs),
                title: 'отчеты',
                list_menu: [
                    {
                        href: '#',
                        id: 'report_fst', label: langView('mi_title_report_draft_fst', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && table_incoming_sostav.select_rows_sostav[0].status <=3) {
                                window.open("https://krr-app-paweb01.europe.mittalco.com/IDSRW_UI/areas/print/print.html?report=arr_natural_statement_draft&format=A4L&id=" + table_incoming_sostav.id_sostav, "Print");
                                //window.open("http://localhost:53848//IDSRW_UI/areas/print/print.html?report=report_fst&id=" + table_incoming_sostav.id_sostav, "Print");
                            };
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_fst', label: langView('mi_title_report_fst', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && table_incoming_sostav.select_rows_sostav[0].status === 2) {
                                view_incoming_report.fst(table_incoming_sostav.id_sostav)
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_fst', label: langView('mi_title_report_fst_landscape', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && table_incoming_sostav.select_rows_sostav[0].status === 2) {
                                view_incoming_report.fst(table_incoming_sostav.id_sostav, true)
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_fsci', label: langView('mi_title_report_fsci', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.fsci(table_incoming_sostav.id_sostav)
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_fsci', label: langView('mi_title_report_fsci_landscape', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.fsci(table_incoming_sostav.id_sostav, true)
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_aica_kr', label: langView('mi_title_report_aica_kr', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'aica_kr');
                            }
                        }.bind(this)

                    },
                    {
                        href: '#', id: 'report_aica_kr_gl', label: langView('mi_title_report_aica_kr_gl', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'aica_kr_gl');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_api_kr', label: langView('mi_title_report_api_kr', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'api_kr');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_api_kr_gl', label: langView('mi_title_report_api_kr_gl', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'api_kr_gl');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_apaca_kr', label: langView('mi_title_report_apaca_kr', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'apaca_kr');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_apaca_kr_gl', label: langView('mi_title_report_apaca_kr_gl', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'apaca_kr_gl');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_gfa', label: langView('mi_title_report_gfa', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'gfa');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_dg20', label: langView('mi_title_report_dg20', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.move_nums(table_incoming_sostav.id_sostav, 'dg20');
                            }
                        }.bind(this)
                    },
                    {
                        href: '#', id: 'report_way', label: langView('mi_title_report_way', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_incoming_sostav.id_sostav && table_incoming_sostav.select_rows_sostav.length > 0 && (table_incoming_sostav.select_rows_sostav[0].status === 1 || table_incoming_sostav.select_rows_sostav[0].status === 2)) {
                                view_incoming_report.select_nums(table_incoming_sostav.id_sostav, 'way');
                            }
                        }.bind(this)
                    },
                ],
            });

            if (element_dropdown && element_dropdown.$element && element_dropdown.$element.length > 0) {
                this.form_panel.$form.append(element_dropdown.$element);
            };

            // Запускаем 3 процесса инициализации (паралельно)
            var process = 3;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    // Загрузим составы
                    table_incoming_sostav.load_outgoing_sostav(start, stop, function (sostav) {
                        this.view(sostav, id_station, id_sostav);
                        LockScreenOff();
                    }.bind(table_incoming_sostav));
                }
            }.bind(this);
            // Инициализация Окно детально
            form_detali.init({
                alert: alert,//alert,
                fn_init: function () {
                    // Инициализация окна детально выполнена
                    var id = this.$card_detali_content.attr('id');
                    view_incoming_cars = new VICC('div#' + id);
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(form_detali),
                fn_open: function () {
                    view_incoming_cars.open(table_incoming_sostav.id_sostav)
                }.bind(form_detali),
                fn_close: function () {
                    // Обновим информацию по составу
                    this.update(function (sostav) {
                        // Покажем обновленную информацию
                        this.view(sostav, this.id_station, this.id_sostav);
                        LockScreenOff();
                    }.bind(this));
                }.bind(table_incoming_sostav),
            });
            // Инициализация окна предъявить состав
            view_incoming_cars.init({
                alert: alert,
                ids_dir: ids_dir,
                ids_wsd: null,
                fn_init: function (init) {
                    // Инициализация окна предъявить состав - выполнена
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(this),
            });
            // Инициализация модуля "Таблица прибывающих составов"
            table_incoming_sostav.init({
                type_report: 'incoming_sostav',
                alert: alert,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    get_server_info();
                    process--;
                    out_init(process);
                },
                // Нажата кнопка показать вагоны детально
                fn_action_view_wagons: function (rows_sostav) {
                    form_detali.open();
                },
            });
            // Инициализация модуля "Отчет принятых составов"
            view_incoming_report.init({
                alert: alert,
                ids_wsd: null,
            });

            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict