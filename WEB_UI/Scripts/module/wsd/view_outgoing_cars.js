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
            'vogc_card_header_detali': 'ИНФОРМАЦИЯ ПО СОСТАВУ',
            'vogc_card_header_detali_sostav': 'ИНФОРМАЦИЯ ПО СОСТАВУ [Накладная № :{0}, время предъявления на УЗ :{1}, станция отправления :{2}, путь :{3} ]',
            'vogc_card_table_cars': 'Предъявленные вагоны',
            'vogc_card_info_cars': 'Информация по вагону',
            'vogc_card_list_cars': 'Вагоны',



            //'card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ОТПРАВИТЬ СОСТАВОВ НА СТАНЦИИ АМКР"',
            //'card_header_on': 'ОТПРАВИТЬ НА СТАНЦИЮ',
            //'card_header_from': 'ОТПРАВИТЬ СО СТАНЦИ',
            //'fieldset_on_table_title': 'Сформированный состав',
            //'title_label_station_from': 'Станция отправления:',
            //'title_placeholder_station_from': 'Станция отправления:',
            //'title_label_way': 'Путь отправления:',
            //'title_placeholder_way': 'Выберите путь',
            //'fieldset_on_as_table_title': 'Прибывающие составы на выбранную станцию',

            //'title_label_station_on': 'Станция прибытия:',
            //'title_placeholder_station_on': 'Станция прибытия:',
            //'title_label_outer_way': 'Внешний путь:',
            //'title_placeholder_outer_way': 'Внешний путь',
            //'title_label_locomotive1': 'Локомотив №1:',
            //'title_label_locomotive2': 'Локомотив №2:',
            //'title_placeholder_locomotive': ' № локомотива',
            //'title_time_aplly': 'Время выполнения',
            //'title_placeholder_time_aplly': 'Время выполнения',

            //'title_form_apply': 'Выполнить?',

            //'title_button_export': 'Экспорт',
            //'title_button_buffer': 'Буфер',
            //'title_button_excel': 'Excel',
            //'title_button_cancel': 'Отменить',
            //'title_button_return': 'Вернуть',

            //'title_add_ok': 'ВЫПОЛНИТЬ',


            //'mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            //'mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            //'mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            //'mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',
            //'mess_error_not_wagons': 'Не выбраны вагоны для отправления (в окне «ОТПРАВИТЬ СО СТАНЦИ», на пути отправки выберите вагоны и сформируйте состав).',
            //'mess_error_operation_run': 'При выполнении операции «ОТПРАВИТЬ СО СТАНЦИ» произошла ошибка, код ошибки:',

            //'mess_cancel_operation': 'Операция "ОТПРАВИТЬ СОСТАВОВ НА СТАНЦИИ АМКР" – отменена',
            //'mess_run_operation_send': 'Выполняю операцию отправки состава на станцию АМКР',

            'vogc_mess_not_id_sostav': 'Состав не выбран, неопределен id',

            //'mess_load_operation': 'Загружаю операции...',
            //'mess_load_wagons': 'Загружаю вагоны на пути...',
            //'mess_update_operation': 'Обновляю операции...',
            'vogc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            'vogc_mess_load_sostav': 'Загружаю информацию по выбранному составу...',
            //'mess_destroy_operation': 'Закрываю форму...',
            //'mess_create_sostav': 'Формирую состав, переношу вагоны...',
            //'mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            //'mess_reverse_sostav': 'Формирую состав, реверс вагонов...',
            'vogc_mess_load_vagon_detali': 'Загружаю информацию по вагону',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;
    // Модуль инициализаии компонентов формы
    var MCF = App.modal_confirm_form; // Создать модальную форму "Окно сообщений"
    //var FC = App.form_control;
    var FE = App.form_element;

    // создадим основу формы
    function div_panel(base) {
        var row = new base.fe_ui.bs_row();
        var col = new base.fe_ui.bs_col({
            size: 'xl',
            col: 12,
            class: 'mb-1 mt-1',
        });
        var card_panel = new base.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vogc_card_header_detali', App.Langs),
        });
        var alert = new base.fe_ui.bs_alert({ class: null, id: null, })
        this.$alert = alert.$alert;
        this.alert = alert.alert;
        card_panel.$body.append(this.$alert)
        this.$header_card_panel = card_panel.$header;

        var row_panel = new base.fe_ui.bs_row();
        //var col_table_cars = new base.fc_ui.el_col('xl', 5, 'mb-1 pl-1 pr-1');
        //var col_info_cars = new base.fc_ui.el_col('xl', 6, 'mb-1 pl-1 pr-1');
        //var col_list_cars = new base.fc_ui.el_col('xl', 1, 'mb-1 pl-1 pr-1');
        var col_table_cars = new base.fe_ui.bs_col({
            size: 'xl',
            col: 5,
            class: 'mb-1 pl-1 pr-1',
        });
        var col_info_cars = new base.fe_ui.bs_col({
            size: 'xl',
            col: 6,
            class: 'mb-1 pl-1 pr-1',
        });
        var col_list_cars = new base.fe_ui.bs_col({
            size: 'xl',
            col: 1,
            class: 'mb-1 pl-1 pr-1',
        });
        //var card_table_cars = new base.fc_ui.el_card('border-success', 'text-center', 'p-1', langView('vogc_card_table_cars', App.Langs));
        var card_table_cars = new base.fe_ui.bs_card({
            class_card: 'border-success',
            header: true,
            class_header: 'text-center',
            class_body: 'p-1',
            title_header: langView('vogc_card_table_cars', App.Langs),
        });
        //var card_info_cars = new base.fc_ui.el_card('border-warning', 'text-center', 'p-1', langView('vogc_card_info_cars', App.Langs));
        var card_info_cars = new base.fe_ui.bs_card({
            class_card: 'border-warning',
            header: true,
            class_header: 'text-center',
            class_body: 'p-1',
            title_header: langView('vogc_card_info_cars', App.Langs),
        });
        //var card_list_cars = new base.fc_ui.el_card('border-primary', 'text-center', 'p-1', langView('vogc_card_list_cars', App.Langs));
        var card_list_cars = new base.fe_ui.bs_card({
            class_card: 'border-primary',
            header: true,
            class_header: 'text-center',
            class_body: 'p-1',
            title_header: langView('vogc_card_list_cars', App.Langs),
        });

        this.$table_cars = card_table_cars.$body;
        this.$info_cars = card_info_cars.$body;
        this.$list_cars = card_list_cars.$body;

        col_table_cars.$col.append(card_table_cars.$card);
        col_info_cars.$col.append(card_info_cars.$card);
        col_list_cars.$col.append(card_list_cars.$card);

        row_panel.$row.append(col_table_cars.$col).append(col_info_cars.$col).append(col_list_cars.$col);

        card_panel.$body.append(row_panel.$row);
        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };

    function view_outgoing_cars(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        //this.fc_ui = new FC();
        this.fe_ui = new FE();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_outgoing_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация модуля
    view_outgoing_cars.prototype.init = function (options) {
        this.result_init = true;
        // теперь выполним инициализацию, определим основные свойства

        // Создать модальную форму "Окно сообщений"
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            ids_wsd: null,
            fn_init: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();

        this.id_sostav = null;
        this.wagons = [];
        this.select_sostav = null;
        // Сообщение
        LockScreen(langView('vogc_mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty();
        //--------------------------------------------------------
        // Создадим и добавим макет для модуля отправленые вагоны
        var sel_ogc = 'table-ogc-' + this.selector;
        var $div_ogc = $('<div></div>', { 'id': sel_ogc });
        panelElement.$table_cars.append($div_ogc);
        // Сылка на надпись
        this.$header_card_panel = panelElement.$header_card_panel;
        this.$table_cars = panelElement.$table_cars;
        //--------------------------------------------------------
        // Создадим и добавим макет для модуля вагон детально
        this.$info_cars = panelElement.$info_cars;
        var sel_focd = 'focd-' + this.selector;
        var $div_focd = $('<div></div>', { 'id': sel_focd });
        this.$info_cars.append($div_focd);
        //--------------------------------------------------------
        // Создадим и добавим макет для список не предъявленных вагонов 
        //<div class="list-group" id="list-cars-not-outgoing" role="tablist">
        //</div>
        var $div_tablist = new this.fe_ui.div({
            class: 'list-group',
            id: null,
        });
        $div_tablist.$div.attr('role', 'tablist');
        this.tablist = $div_tablist.$div;
        panelElement.$list_cars.append(this.tablist);
        this.$list_cars = panelElement.$list_cars;
        //--------------------------------------------------------
        // Алерты
        this.alert = panelElement.alert;
        this.$alert = panelElement.$alert;
        // Покажем элементы на форме
        this.$panel.append(panelElement.$element);
        //------------------------------------------------------------
        // Создадим и инициализируем модуль Отправленые вагоны детально
        var TOGC = App.table_outgoing_cars; // Отправленные вагоны
        this.table_outgoing_cars = new TOGC('div#' + sel_ogc);             // Создадим экземпляр
        this.table_outgoing_cars.init({
            type_report: 'outgoing_cars',
            alert: null,
            ids_wsd: null,
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0) {
                    LockScreen(langView('vogc_mess_load_vagon_detali', App.Langs));
                    var id = rows[0].outgoing_car_id;
                    this.view_car_detali(id, { type: 0 }); // Показать выбраный вагон в режиме просмотр
                }
            }.bind(this),
            fn_init: function (init) {

            },
            fn_refresh: function () {
                this.update();
            }.bind(this),
        });
        // Создадим и добавим макет формы
        var FOCD = App.form_outgoing_cars_detali;
        this.form_outgoing_cars_detali = new FOCD('div#' + sel_focd);             // Создадим экземпляр
        this.form_outgoing_cars_detali.init({
            alert: this.alert,
            ids_wsd: null,
            ids_dir: null,
            fn_init: function (init) {
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init();
                }
                //LockScreenOff();
            }.bind(this),
            fn_update: function (wagon) {
                this.update();
            }.bind(this),
        });

        //// Загрузим справочные данные, определим поля формы правки
        //this.load_db(['station', 'ways', 'outer_ways', 'locomotive'], false, function (result) {
        //    //
        //    if (typeof this.settings.fn_init === 'function') {
        //        this.settings.fn_init();
        //    }
        //}.bind(this));
    };
    // Открыть модуль 
    view_outgoing_cars.prototype.open = function (id_sostav) {
        this.id_sostav = id_sostav;
        this.update();
    };
    // Обновить информацию по модуль
    view_outgoing_cars.prototype.update = function () {
        this.out_clear();

        this.tablist.empty();
        this.table_outgoing_cars.clear();
        if (this.id_sostav) {
            LockScreen(langView('vogc_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingCarsOfIDSostav(this.id_sostav, function (wagons) {
                this.wagons = wagons;
                // Отобразить информацию о составе
                if (this.wagons && this.wagons.length > 0) {
                    var outgoing_sostav_num_doc = this.wagons[0].outgoing_sostav_num_doc;
                    var outgoing_sostav_date_readiness_uz = this.wagons[0].outgoing_sostav_date_readiness_uz;
                    var outgoing_sostav_from_station_amkr_abbr = this.wagons[0]['outgoing_sostav_from_station_amkr_abbr_' + App.Lang];
                    var outgoing_sostav_from_way = this.wagons[0]['outgoing_sostav_from_way_num_' + App.Lang] + '-' + this.wagons[0]['outgoing_sostav_from_way_abbr_' + App.Lang];
                    this.$header_card_panel.empty().append(langView('vogc_card_header_detali_sostav', App.Langs).format(outgoing_sostav_num_doc, outgoing_sostav_date_readiness_uz, outgoing_sostav_from_station_amkr_abbr, outgoing_sostav_from_way));
                } else {
                    this.$header_card_panel.empty().append(langView('vogc_card_header_detali', App.Langs));
                }
                // Показать вагоны которые не сдали.
                this.view_cars_not_outgoing(this.wagons);
                // Показать вагоны которые не сдали.
                this.view_cars_outgoing(this.wagons)
                // Закрыть форму детально
                this.form_outgoing_cars_detali.close();

                LockScreenOff();
            }.bind(this));
        } else {
            this.out_warning(langView('vogc_mess_not_id_sostav', App.Langs));
        }
    };
    // Показать вагоны не перенесеные влево
    view_outgoing_cars.prototype.view_cars_not_outgoing = function (cars) {
        this.tablist.empty();
        // Фильтр на не принятые вагоны
        var wagons = cars.filter(function (i) {
            return i.outgoing_car_outgoing === null ? true : false;
        }).sort(function (a, b) {
            return Number(a.outgoing_car_position) - Number(b.outgoing_car_position);
        });
        $.each(wagons, function (i, el) {
            var $icon = (el.outgoing_car_parent_wir_id ? $('<i class="fas fa-retweet" aria-hidden="true"></i>') : $('<i class="fas fa-train" aria-hidden="true"></i>'));
            var $link = new this.fe_ui.a({
                id: el.outgoing_car_id,
                class: 'list-group-item list-group-item-action',
                href: '#',
                text: el.num,
                target: null,
                title: null,
            });
            //el.outgoing_car_id, 'list-group-item list-group-item-action', '#', el.num, null, null
            if ($link && $link.$alink && $link.$alink.length > 0) {
                $link.$alink.attr('data-toggle', 'list');
                $link.$alink.attr('role', 'tab');
                $link.$alink.attr('aria-controls', '');
                $link.$alink.prepend(' ').prepend($icon);
                if (el.outgoing_car_parent_wir_id) {
                    $link.$alink.addClass('disabled');
                } else {
                    $link.$alink.on('click', function (event) {
                        event.preventDefault();
                        // Обработать выбор
                        var id = Number($(event.currentTarget).attr('id'));
                        this.view_car_detali(id, { type: 1 }); // Показать выбраный вагон в режиме "правка"
                    }.bind(this));
                }
                this.tablist.append($link.$alink);
            }


        }.bind(this));
    };
    // Показать вагоны перенесеные влево
    view_outgoing_cars.prototype.view_cars_outgoing = function (wagons) {
        wagons = this.table_outgoing_cars.filter_wagons(wagons);
        this.table_outgoing_cars.view(wagons, null, null);
    };
    // Показать вагон детально
    view_outgoing_cars.prototype.view_car_detali = function (id, options) {
        LockScreen(langView('vogc_mess_load_vagon_detali', App.Langs));
        if (options && options.type != null) {
            if (options.type === 1) {
                // Наполняем дополнительной информацией
                // Определим следующую позицию
                var wagons = this.wagons.filter(function (i) { return i.outgoing_car_position_outgoing !== null }).sort(function (a, b) {
                    return b.outgoing_car_position_outgoing - a.outgoing_car_position_outgoing;
                });
                var present_wagons = [];
                wagons.forEach(function (el) {
                    present_wagons.push({num:el.num, position:el.outgoing_car_position_outgoing});
                }.bind(this));
                // Берем последнюю запись по вагону о подставляем значения
                if (wagons && wagons.length) {
                    options.position = wagons[0].outgoing_car_position_outgoing + 1;
                    options.id_cargo = wagons[0].outgoing_uz_vagon_id_cargo;
                    options.id_division = wagons[0].outgoing_uz_vagon_id_division;
                    options.code_division = wagons[0].outgoing_uz_vagon_id_division;
                    options.division_code = wagons[0].outgoing_uz_vagon_division_code;
                    options.station_uz_code = wagons[0].outgoing_uz_vagon_to_station_uz_code;
                    options.present_wagons = present_wagons;
                } else {
                    options.position = 1;
                }
            }
            this.form_outgoing_cars_detali.wagon_detali(id, options);
        }

        //var wagon = this.wagons.find(function (o) {
        //    return o.outgoing_car_id === id;
        //});


    };
    //--------------------------------------------------------------------------------
    // Показать
    view_outgoing_cars.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    view_outgoing_cars.prototype.hide = function () {
        this.$panel.hide();
    }
    // Очистить сообщения
    view_outgoing_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_outgoing_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_outgoing_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_outgoing_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //--------------------------------------------------------------------------------
    // Очистить объект
    view_outgoing_cars.prototype.destroy = function () {
        LockScreen(langView('mess_destroy_operation', App.Langs));
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Очистить форму выбора пути отправки
        if (this.form_setup_from) {
            this.form_setup_from.destroy();
            this.form_setup_from = null;
        }
        // Очистить форму выбора куда отправить
        if (this.form_setup_on) {
            this.form_setup_on.destroy();
            this.form_setup_on = null;
        }

        // Уберем модуль (Таблица собранный состав для отправки детально)
        if (this.tab_cars_on) {
            this.tab_cars_on.destroy();
            this.tab_cars_on = null;
        }
        // Уберем модуль (Таблица вагоны на на пути отправки детально)
        if (this.tab_cars_from) {
            this.tab_cars_from.destroy();
            this.tab_cars_from = null;

        }
        this.$panel.empty(); // empty in case the columns change
        LockScreenOff();
    };

    App.view_outgoing_cars = view_outgoing_cars;

    window.App = App;
})(window);