(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vhos_card_header_panel': 'ИСТОРИЯ ОПЕРАЦИЙ "ОТПРАВИТЬ СОСТАВОВ НА СТАНЦИИ АМКР"',
            'vhos_title_label_date': 'ПЕРИОД :',
            'vhos_title_label_station': 'СТАНЦИЯ ОТПРАВЛЕНИЯ:',

            'vhos_mess_load_operation': 'Загружаю операции...',
            'vhos_mess_update_operation': 'Обновляю операции...',
            'vhos_mess_init_panel': 'Выполняю инициализацию модуля история операций отправления составов...',
            'vhos_mess_destroy_operation': 'Закрываю форму...',
        },
        'en':  //default language: English
        {
            'vhos_card_header_panel': 'HISTORY OF OPERATIONS "SEND TRAINS TO AMKR STATION"',
            'vhos_title_label_date': 'PERIOD:',
            'vhos_title_label_station': 'STATION OF DEPARTURE:',

            'vhos_mess_load_operation': 'Loading operations ...',
            'vhos_mess_update_operation': 'Updating operations ...',
            'vhos_mess_init_panel': 'I am initializing the module history of train dispatch operations ...',
            'vhos_mess_destroy_operation': 'Closing the form ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;
    // Модуль инициализаии компонентов формы
    var MCF = App.modal_confirm_form; // Создать модальную форму "Окно сообщений"
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var FIL = App.form_inline;
    var TSOW = App.table_sostav_outer_way; // Модуль составы на подходах

    // создадим основу формы
    function div_panel(base) {
        var row = new base.fc_ui.el_row();
        var col = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', '', '', langView('vhos_card_header_panel', App.Langs));
        var card_operation = new base.fc_ui.el_card('border-primary', '', 'text-dark pl-3 pr-3 table-directory', null);
        this.$operation_header = card_operation.$header;
        this.$operation_body = card_operation.$body;
        card_panel.$body.append(card_operation.$card);
        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };
    //
    function view_history_operation_send(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_history_operation_send.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    //----------------------------------------------------------------------------------------
    // инициализация модуля
    view_history_operation_send.prototype.init = function (options, fn_init_ok) {
        this.result_init = true; // Состояние инициализации 
        // Создать модальную форму "Окно сообщений"
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            detali_wagons: true,
            auto_load: true,
            alert: null,
            ids_dir: null,
            ids_wsd: null,
            fn_db_update: function (list) {
                //this.load_db(list, true, function (result) {
                //    this.update_element(result)
                //}.bind(this));
            }.bind(this),
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Диапазон времени
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.id_station = -1; // По умолчанию не выбрана
        // список операций
        this.operation = null;
        // Выбраная строка
        this.select_row_sostav = null;
        // Сообщение
        LockScreen(langView('vhos_mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty(); // Очистим содержимое
        this.$operation_header = panelElement.$operation_header;
        this.$operation_body = panelElement.$operation_body;
        this.$panel.append(panelElement.$element);
        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            // Создадим форму выбора для отчета
            this.form_panel = new FIL();
            var fl_interval_date = {
                type: 'interval_date',
                id: 'select_date',
                prefix: 'sm',
                title: langView('vhos_title_label_date', App.Langs),
                start: this.start,
                stop: this.stop,
                select: function (interval) {
                    if (interval && interval.start && interval.stop) {
                        this.load_operation(moment(interval.start)._d, moment(interval.stop)._d);
                    }
                }.bind(this),
            };
            var fl_station = {
                type: 'select',
                id: 'station',
                prefix: 'sm',
                title: langView('vhos_title_label_station', App.Langs),
                list: this.list_station,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    this.id_station = id;
                    this.view();
                }.bind(this),
            };
            var fl_refresh = {
                type: 'button',
                id: 'refresh',
                prefix: 'sm',
                title: null,
                icon: 'fas fa-retweet',
                select: function (e, ui) {
                    event.preventDefault();
                    this.update();
                }.bind(this),
            };
            var fields = [];
            fields.push(fl_interval_date);
            fields.push(fl_station);
            fields.push(fl_refresh);
            // Инициализация формы
            this.form_panel.init({
                fields: fields
            });
            // Отображение формы
            this.$operation_header.append(this.form_panel.$form);
            //------- ARRIVAL SOSTAV -----------------------------------
            // Создадим и добавим макет для модуля составы на подходах
            var sel_sostav_arrival = 'table-sa-' + this.selector;
            // Создадим таблицу вангонов на пути отправки
            var $div_table_sa = $('<div></div>', {
                'id': sel_sostav_arrival,
            });
            if ($div_table_sa && $div_table_sa.length > 0) {
                this.$operation_body.append($div_table_sa);
                this.tab_sostav_arrival = new TSOW('div#' + sel_sostav_arrival); // Создадим экземпляр составы на подходах
                this.tab_sostav_arrival.init({
                    alert: this.settings.alert, // уточнить
                    detali_wagons: this.settings.detali_wagons,
                    type_report: 'arrival-sostav-operation',  // История по прибывающим составам по операции прибитие
                    ids_wsd: this.ids_wsd,
                    fn_select_sostav: function (row) {
                        // выбран состав
                    }.bind(this),
                }, function (init_result) {
                    // Загрузить и вывести информацию если стоит признак
                    if (init_result && this.settings.auto_load) {
                        this.load_default();
                    }
                    // сохраним признак статуса выполнения инициализации
                    this.result_init = init_result;
                    //----------------------------------
                    // вернуть результат выполнения инициализации
                    if (typeof fn_init_ok === 'function') {
                        fn_init_ok(this.result_init);
                    }
                    //----------------------------------
                }.bind(this));
            };
            //----------------------------------------------------------
        }.bind(this));
    };
    //----------------------------------------------------------------------------------------
    // Показать составы с учетом станции
    view_history_operation_send.prototype.view = function () {
        if (this.tab_sostav_arrival.sostav && this.tab_sostav_arrival.sostav.length > 0) {
            if (this.id_station >= 0) {
                this.tab_sostav_arrival.view(this.tab_sostav_arrival.sostav.filter(function (i) {
                    return i.from_id_station === this.id_station;
                }.bind(this)));
                return;
            };
        };
        this.tab_sostav_arrival.view(this.tab_sostav_arrival.sostav);
    };
    // загрузить данные 
    view_history_operation_send.prototype.load_default = function () {
        var res = this.form_panel.get_value();
        if (res && res.select_date) {
            this.load_operation(moment(res.select_date.start)._d, moment(res.select_date.stop)._d);
        }
    };
    // загрузить данные 
    view_history_operation_send.prototype.load_operation = function (start, stop) {
        this.start = start;
        this.stop = stop;
        this.tab_sostav_arrival.load_operation_sostav_of_period(this.start, this.stop, function () {
            this.view();
        }.bind(this));
    };
    // Обновить данные
    view_history_operation_send.prototype.update = function () {
        this.out_clear();
        if (this.start && this.stop) {
            var td_wagons = this.tab_sostav_arrival.td_wagons;
            LockScreen(langView('vhos_mess_update_operation', App.Langs));
            this.tab_sostav_arrival.load_operation_sostav_of_period(this.start, this.stop, function () {
                this.view();
                $.each(td_wagons, function (i, el) {
                    if (el) {
                        var tr = this.tab_sostav_arrival.$table_sostav.find('tbody tr#' + i);
                        if (tr && tr.length > 0) {
                            LockScreen(langView('vhos_mess_update_operation', App.Langs));
                            this.tab_sostav_arrival.detali_select_row(tr);
                        }
                    }
                }.bind(this));

            }.bind(this));
        } else {

        }
    };
    // Показать
    view_history_operation_send.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    view_history_operation_send.prototype.hide = function () {
        this.$panel.hide();
    }
    //-------------------------------------------------------------------------
    // Очистить сообщения
    view_history_operation_send.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_history_operation_send.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_history_operation_send.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_history_operation_send.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //------------------------------------------------------------------------
    // Очистить объект
    view_history_operation_send.prototype.destroy = function () {
        LockScreen(langView('vhos_mess_destroy_operation', App.Langs));
        // очистим модальную форму
        if (this.modal_confirm_form) this.modal_confirm_form.destroy();
        // Очистить модуль вывода отправленных составов 
        if (this.tab_sostav_arrival) {
            this.tab_sostav_arrival.destroy();
            this.tab_sostav_arrival = null;
        }
        // Очистить форму выбора
        if (this.form_panel) {
            this.form_panel.destroy();
            this.form_panel = null;
        }
        this.$panel.empty(); // empty in case the columns change
        LockScreenOff();
    };

    App.view_history_operation_send = view_history_operation_send;

    window.App = App;
})(window);