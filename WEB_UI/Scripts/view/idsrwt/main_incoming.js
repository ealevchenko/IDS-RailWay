(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mi_title_label_date': 'СОСТАВЫ ЗА ПЕРИОД :',
            'mi_title_label_station': 'СТАНЦИЯ ОТПРАВКИ:',
            'mi_init_main': 'Инициализация формы прибытие...',
        },
        'en':  //default language: English
        {
            'mi_title_label_date': 'LINE-UP PERIOD :',
            'mi_title_label_station': 'DEPARTURE STATION:',
            'mi_init_main': 'Form initialization arrival...',
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
/*    var FE = App.form_element;*/

    var FIL = App.form_inline;
    var fc_ui = new FC();
/*    var fe_ui = new FE();*/
    var alert = App.alert_form;

    var TIS = App.table_incoming_sostav;
    var table_incoming_sostav = new TIS('div#incoming-sostav');             // Создадим экземпляр

    var FD = App.form_detali;
    var form_detali = new FD('div#cars-detali');             // Создадим экземпляр

    var VICC = App.view_incoming_cars;
    var view_incoming_cars = null;

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
    var id_station = null;  // По умолчанию не выбрана
    var list_station = [];
    var id_sostav = null;   // По умолчанию не выбрана

    // Считаем строку с дополнительными параметрами
    var id_arrival = getUrlVar('id_arrival');
    var arrival = getUrlVar('arrival');

    // После загрузки документа
    $(document).ready(function ($) {

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
            var element_dropdown = new fc_ui.el_div_dropdown(null, 'mr-2 ml-auto', 'sm', 'btn-secondary', 'Отчетная документация');
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
            // Инициализация модуля "Таблица отправляемых составов"
            table_incoming_sostav.init({
                type_report: 'incoming_sostav',
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