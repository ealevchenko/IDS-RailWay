/*Модуль Отображения информации по ЭПД*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vsdr_mess_init_module': 'Инициализация модуля(view_sd_report)...',
            'vsdr_link_report_1': 'Погран-переход',
            'vsdr_title_report_1': 'Движение грузов отгруженных АМКР для внешних потребителей продукции (Европа)',
            'vsdr_title_search_cars': 'Найти вагоны',
            'vsdr_label_list_nums': 'Добавте номера вагонов',
            'vsdr_title_list_nums': 'Добавте номера вагонов',
        },
        'en':  //default language: English
        {
            'vsdr_mess_init_module': 'Module initialization(view_sd_report)...',

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FE = App.form_element;

    var wsd = App.ids_wsd;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_sd_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fe_ui = new FE();
    }
    //==========================================================================================
    // Инициализация
    view_sd_report.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('vsdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            id_sidebar: null,
            fn_init: null,

        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.elements = {}; // Все элементы формы

        this.$panel.empty();
        var div = new this.fe_ui.div({
            class: 'd-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom',
        });
        this.$title_report = $('<h1 class="h2"></h1>');
        this.$main_report = $('<div></div>');
        this.$panel.append(div.$div.append(this.$title_report)).append(this.$main_report);
        // Настроим ссылку
        if (this.settings.id_sidebar) {
            var $ul_list_sidebar = $('#' + this.settings.id_sidebar);
            $ul_list_sidebar.empty();
            //<li class="active">
            //    <a href="#"><i class="fa-solid fa-magnifying-glass-arrow-right mr-1" style="color:#44bef1"></i>@IDSReportResource.report_sd_link_border_crossing</a>
            //</li>
            var $li1 = $('<li class="active"></li>');
            var $i1 = $('<i class="fa-solid fa-magnifying-glass-arrow-right mr-1" style="color:#44bef1"></i>');
            var a_link1 = new this.fe_ui.a({
                href: '#',
                text: langView('vsdr_link_report_1', App.Langs),
                target: null,
                title: null,
            });
            a_link1.$alink.prepend($i1);
            a_link1.$alink.on("click", function () {
                this.view_report_border_crossing();
            }.bind(this));
            $li1.append(a_link1.$alink);
            $ul_list_sidebar.append($li1);
        }

        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    //
    view_sd_report.prototype.load_sostav = function (id_sostav, callback) {
        //this.id_sostav = id_sostav;
        //if (this.id_sostav) {
        //    LockScreen(langView('vicr_mess_load_sostav', App.Langs));
        //    this.ids_wsd.getViewIncomingCarsOfIDSostav(this.id_sostav, function (wagons) {
        //        this.wagons = wagons;
        //        // Получим информацию по составу
        //        this.get_sostav(wagons);
        //        LockScreenOff();
        //        if (typeof callback === 'function') {
        //            callback(this.wagons);
        //        }
        //    }.bind(this));
        //} else {
        //    this.wagons = null;
        //    this.sostav = {};
        //    if (typeof callback === 'function') {
        //        callback(null);
        //    }
        //}
    }
    // Открыть отчет
    view_sd_report.prototype.view_report_border_crossing = function () {
        this.$title_report.text(langView('vsdr_title_report_1', App.Langs))
        // Очистим старую форму
        this.$main_report.empty();
        this.elements = {}; // Все элементы формы
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        // Создадим форму поиска вагонов через погран переход
        var FDL = App.form_dialog;
        this.form = new FDL();
        // Создать макет панели
        var objs = [];
        // Форма детально
        var row_input = {
            obj: 'bs_row',
            options: {
                class: null,
            },
            childs: []
        };
        var col_input = {
            obj: 'bs_col',
            options: {
                size: 'xl',
                col: 12,
                class: null,
            },
            childs: []
        };
        var bt_search_car = {
            obj: 'bs_button',
            options: {
                color: 'warning',
                size: 'sm',
                class: null,
                id: 'search_car',
                label: null,
                title: langView('vsdr_title_search_cars', App.Langs),
                icon_left: null,
                icon_right: 'fas fa-search',
                click: function (event) {
                    event.preventDefault();
                    this.action_search_border_crossing();
                }.bind(this),
            }
        };
        var form_textarea_list_nums = {
            obj: 'bs_textarea',
            options: {
                id: 'list_nums',
                validation_group: 'common',
                form_group_size: 'xl',
                form_group_col: 12,
                form_group_class: 'text-left',
                label: langView('vsdr_label_list_nums', App.Langs),
                label_class: 'mb-1',
                textarea_size: null,
                textarea_rows: 3,
                textarea_class: 'inp-manual',
                textarea_title: langView('vsdr_title_list_nums', App.Langs),
                textarea_maxlength: null,
                textarea_placeholder: null,
                textarea_required: null,
                textarea_readonly: false,
                input_group: true,
                input_group_prepend_class: null,
                input_group_prepend_objs: [],
                input_group_append_class: null,
                input_group_append_objs: [bt_search_car],
            },
            childs: []
        };

        col_input.childs.push(form_textarea_list_nums);
        row_input.childs.push(col_input);
        objs.push(row_input);

        // Инициализируем форму
        this.form.init({
            alert: this.settings.alert,
            objs: objs,
            mb: 2,
            id: null,
            cl_form: null,
            validation: true,
            fn_validation: function (result) {
                // Валидация успешна
                if (result && result.valid) {

                }
            }.bind(this),
            fn_html_init: function () {
                // HTML документы созданы

            }.bind(this),
            fn_init: function (init) {
                // Инициализация формы закончена
                // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                this.form.create_element(this.elements, true);
                // отобразим форму
                this.$main_report.append(this.form.$form);
            }.bind(this),
        });
    }
    // Выполнить поиск
    view_sd_report.prototype.action_search_border_crossing = function () {

    }
    //
    view_sd_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_sd_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_sd_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_sd_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //------------------------------------------------------------------
    // Очистить объект
    view_sd_report.prototype.destroy = function () {
        //if (this.mf_select_nums) {
        //    this.mf_select_nums.destroy();
        //    this.mf_select_nums = null;
        //}
        //this.table_manual_cars.destroy();
        //if (this.mf_move_nums) {
        //    this.mf_move_nums.destroy();
        //    this.mf_move_nums = null;
        //}
    }

    App.view_sd_report = view_sd_report;

    window.App = App;
})(window);