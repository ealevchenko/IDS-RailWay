(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            //'mess_load_reference': 'Загружаю справочники...',
            'mo_title_label_date': 'СОСТАВЫ ЗА ПЕРИОД :',
            'mo_title_label_station': 'СТАНЦИЯ ОТПРАВКИ:',
            'mo_card_header_detali': 'ИНФОРМАЦИЯ ПО СОСТАВУ',
        },
        'en':  //default language: English
        {
            'mess_load_reference': 'Loading references ...',
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
    var FIL = App.form_inline;
    var fc_ui = new FC();
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

    // После загрузки документа
    $(document).ready(function ($) {
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
            var element_dropdown = new fc_ui.el_div_dropdown(null, 'mr-2 ml-auto', 'sm', 'btn-secondary', 'Отчетная документация');
            if (element_dropdown && element_dropdown.$element && element_dropdown.$element.length > 0) {
                this.form_panel.$form.append(element_dropdown.$element);
                // Добавить отчеты
                //<a class="dropdown-item" href="#" id="report_fst">Натурная ведомость поезда</a>
                //.....
                //<a class="dropdown-item" href="#" id="report_fsci">Натурная ведомость коммерческого осмотра</a>
            }
            // Инициализация модуля "Таблица справочника путей"
            table_outgoing_sostav.init({
                type_report: 'outgoing_sostav',
                alert: alert,
                ids_wsd: null,
                fn_action_view_wagons: function (rows_sostav) {
                    form_detali.open();
                },
            }, function (init) {
                table_outgoing_sostav.load_outgoing_sostav(start, stop, function (sostav) {
                    this.view(sostav, id_station, null);
                    LockScreenOff();
                }.bind(table_outgoing_sostav));
            });

            //
            var row = new fc_ui.el_row();
            var col = new fc_ui.el_col('xl', 12, 'mb-1 mt-1');
            var card_panel = new fc_ui.el_card('border-secondary mb-1', '', '', langView('mo_card_header_detali', App.Langs));

            row.$row.append(col.$col.append(card_panel.$card))
            //
            form_detali.init({
                alert: null,
                fn_init: function () {
                    var id = this.$card_detali_content.attr('id');
                    view_outgoing_cars = new VOC('div#' + id);
                    view_outgoing_cars.init();
                }.bind(form_detali),
                fn_open: function () {
                    view_outgoing_cars.open(table_outgoing_sostav.id_sostav)
                }.bind(form_detali),
                fn_close: function () {

                },
            });
        }.bind(this));
    });

})(jQuery); // End of use strict