(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mo_title_label_date': 'СОСТАВЫ ЗА ПЕРИОД :',
            'mo_title_label_station': 'СТАНЦИЯ ОТПРАВКИ:',
            'mo_init_main': 'Инициализация формы отправки...',
            'mo_title_label_dropdown': 'Отчетная документация',
            'mo_title_report_register_doc_transfer': 'Реєстр передач документів.',
            'mo_title_report_register_doc_transfer_amkr': 'Реєстр передач документів (АМКР).',
        },
        'en':  //default language: English
        {
            'mo_title_label_date': 'LINE-UP PERIOD :',
            'mo_title_label_station': 'DEPARTURE STATION:',
            'mo_init_main': 'Initializing the submit form...',
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
    var FE = App.form_element;

    var FIL = App.form_inline;
    var fc_ui = new FC();
    var fe_ui = new FE();
    var alert = App.alert_form;

    var TOS = App.table_outgoing_sostav;
    var table_outgoing_sostav = new TOS('div#outgoing-sostav');             // Создадим экземпляр

    var FD = App.form_detali;
    var form_detali = new FD('div#cars-detali');             // Создадим экземпляр

    var VOC = App.view_outgoing_cars;
    var view_outgoing_cars = null;

    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

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
    var id_station = null; // По умолчанию не выбрана
    var list_station = [];
    var id_sostav = null;   // По умолчанию не выбрана

    // Считаем строку с дополнительными параметрами
    var id_outgoing = getUrlVar('id');
    var readiness = getUrlVar('readiness');
    // Функция получения информации из сервера
    var get_server_info = function () {
        // Запрос клиентов 
        ids_srv.getCountClient(function (count) {
            $('a#client_count').text(count);
        });
    }
    // После загрузки документа
    $(document).ready(function ($) {
        // Обновить
        setInterval(function () {
            $('label#curent_date').text(moment().format(format_datetime));
        }, 1000);
        if (id_outgoing && readiness) {
            start = moment(readiness).set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
            stop = moment(readiness).set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;

            id_sostav = Number(id_outgoing);
        };
        LockScreen(langView('mo_init_main', App.Langs));
        // Загрузим справочники, с признаком обязательно
        load_db(['station'], true, function (result) {
            var div = $('div#nb-outgoing');
            // Подгрузили списки
            list_station = ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.exit_uz === true && i.station_delete === null; });
            // Создадим форму выбора для отчета
            this.form_panel = new FIL();
            var fl_interval_date = {
                type: 'interval_date',
                id: 'select_date',
                prefix: 'sm',
                title: langView('mo_title_label_date', App.Langs),
                start: start,
                stop: stop,
                select: function (interval) {
                    if (interval && interval.start && interval.stop) {
                        table_outgoing_sostav.load_outgoing_sostav(moment(interval.start)._d, moment(interval.stop)._d, function (sostav) {
                            this.view(sostav, id_station, null);
                            LockScreenOff();
                        }.bind(table_outgoing_sostav));
                    }
                }.bind(this),
            };
            var fl_station = {
                type: 'select',
                id: 'station',
                prefix: 'sm',
                title: langView('mo_title_label_station', App.Langs),
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
                }.bind(table_outgoing_sostav),
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
            //var element_dropdown = new fc_ui.el_div_dropdown(null, 'mr-2 ml-auto', 'sm', 'btn-secondary', 'Отчетная документация');
            var element_dropdown = new fe_ui.bs_dropdown({
                color: 'secondary',
                size: 'sm',
                class: 'mr-2 ml-auto dropleft',
                id: 'dd-report',
                label: langView('mo_title_label_dropdown', App.Langs),
                title: 'отчеты',
                list_menu: [
                    {
                        href: '#',
                        id: 'register_doc_transfer', label: langView('mo_title_report_register_doc_transfer', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_outgoing_sostav.id_sostav && table_outgoing_sostav.select_rows_sostav.length > 0 && table_outgoing_sostav.select_rows_sostav[0].status >=2) {
                                window.open("https://krr-app-paweb01.europe.mittalco.com/IDSRW_UI/areas/print/print.html?report=out_register_doc_transfer&format=A4&id=" + table_outgoing_sostav.id_sostav, "Print");
                            };
                        }.bind(this)
                    },
                    {
                        href: '#',
                        id: 'register_doc_transfer_amkr', label: langView('mo_title_report_register_doc_transfer_amkr', App.Langs), disabled: false, click: function (event) {
                            event.preventDefault();
                            if (table_outgoing_sostav.id_sostav && table_outgoing_sostav.select_rows_sostav.length > 0 && table_outgoing_sostav.select_rows_sostav[0].status >=2) {
                                window.open("https://krr-app-paweb01.europe.mittalco.com/IDSRW_UI/areas/print/print.html?report=out_register_doc_transfer_amkr&format=A4&id=" + table_outgoing_sostav.id_sostav, "Print");
                            };
                        }.bind(this)
                    },
                ],
            });



            if (element_dropdown && element_dropdown.$element && element_dropdown.$element.length > 0) {
                this.form_panel.$form.append(element_dropdown.$element);
                // Добавить отчеты
                //<a class="dropdown-item" href="#" id="report_fst">Натурная ведомость поезда</a>
                //.....
                //<a class="dropdown-item" href="#" id="report_fsci">Натурная ведомость коммерческого осмотра</a>
            }
            // Запускаем 3 процесса инициализации (паралельно)
            var process = 3;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    // Загрузим составы
                    table_outgoing_sostav.load_outgoing_sostav(start, stop, function (sostav) {
                        this.view(sostav, id_station, id_sostav);
                        LockScreenOff();
                    }.bind(table_outgoing_sostav));
                }
            }.bind(this);

            // Инициализация Окно детально
            form_detali.init({
                alert: alert,//alert,
                fn_init: function () {
                    // Инициализация окна детально выполнена
                    var id = this.$card_detali_content.attr('id');
                    view_outgoing_cars = new VOC('div#' + id);
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(form_detali),
                fn_open: function () {
                    view_outgoing_cars.open(table_outgoing_sostav.id_sostav)
                }.bind(form_detali),
                fn_close: function () {
                    // Обновим информацию по составу
                    this.update(function (sostav) {
                        // Покажем обновленную информацию
                        this.view(sostav, this.id_station, this.id_sostav);
                        LockScreenOff();
                    }.bind(this));
                }.bind(table_outgoing_sostav),
            });
            // Инициализация окна предъявить состав
            view_outgoing_cars.init({
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
            // Инициализация модуля "Таблица отправляемых составов"
            table_outgoing_sostav.init({
                type_report: 'outgoing_sostav',
                alert: alert,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                },
                // Нажата кнопка показать вагоны детально
                fn_action_view_wagons: function (rows_sostav) {

                    form_detali.open();
                },
            });

        }.bind(this));
    });

})(jQuery); // End of use strict