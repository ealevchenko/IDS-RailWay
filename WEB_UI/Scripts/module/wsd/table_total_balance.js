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
            'ttb_field_id': 'Остаток',
            'ttb_field_all': 'Все вагоны',
            'ttb_field_amkr': 'Вагоны АМКР',
            'ttb_field_id_1': 'ВСЕГО',
            'ttb_field_id_2': 'ОСТАТОК ВНЕШНИХ',
            'ttb_field_id_3': 'УЧЕТНЫЙ ОСТАТОК',

            'ttb_mess_init_module': 'Инициализация модуля…',
            'ttb_mess_load_balance': 'Загружаю вагоны…',
            'ttb_mess_view_balance': 'загрузка информации о вагонах состава…',
        },
        'en':  //default language: English
        {
            'ttb_field_id': 'Remainder',
            'ttb_field_all': 'All wagons',
            'ttb_field_amkr': 'AMKR Cars',
            'ttb_field_id_1': 'TOTAL',
            'ttb_field_id_2': 'REMAINING EXTERNAL',
            'ttb_field_id_3': 'ACCOUNTING BALANCE',

            'ttb_mess_init_module': 'Initializing a module ...',
            'ttb_mess_load_balance': 'Loading wagons ...',
            'ttb_mess_view_balance': 'loading information about train wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    //
    function table_total_balance(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$total_balance = $(selector);
        if (this.$total_balance.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$total_balance.attr('id');
    }
    //------------------------------- ПОЛЯ -------------------------------------------------------------
    // инициализация полей таблицы вагоны на пути (все поля)
    table_total_balance.prototype.init_columns_all = function () {
        var collums = [];
        collums.push('wir_id');
        return init_columns(collums, list_collums);
    };
    // инициализация таблицы 
    table_total_balance.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            ids_wsd: null,
        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();

        LockScreen(langView('ttb_mess_init_module', App.Langs));
        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_total_balance = new this.fc_ui.el_table('tab-tb-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_total_balance = table_total_balance.$element;
        this.$total_balance.addClass('table-report-operation').append(this.$table_total_balance);
        // Инициализируем таблицу
        this.obj_t_tb = this.$table_total_balance.DataTable({
            "paging": false,
            "searching": false,
            "ordering": false,
            "info": false,
            "keys": false,
            select: false,
            "autoWidth": true,
            //"filter": true,
            //"scrollY": "600px",
            sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            "createdRow": function (row, data, index) {
            }.bind(this),
            columns: [
                {
                    data: function (row, type, val, meta) {
                        return langView('ttb_field_id_' + row.id, App.Langs);
                    },
                    className: 'dt-body-left',
                    title: langView('ttb_field_id', App.Langs), width: "30px", orderable: false, searchable: false
                },
                {
                    data: function (row, type, val, meta) {
                        return row.all;
                    },
                    className: 'dt-body-center',
                    title: langView('ttb_field_all', App.Langs), width: "30px", orderable: false, searchable: false
                },
                {
                    data: function (row, type, val, meta) {
                        return row.amkr;
                    },
                    className: 'dt-body-center',
                    title: langView('ttb_field_amkr', App.Langs), width: "30px", orderable: false, searchable: false
                },
            ],
            dom: 'Bfrtip',
            //stateSave: true,
            buttons: [],
        });
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok();
        }
        //----------------------------------
    };
    // Показать данные 
    table_total_balance.prototype.view = function (data) {
        LockScreen(langView('ttb_mess_view_balance', App.Langs));
        this.obj_t_tb.clear();
        this.obj_t_tb.rows.add(data);
        this.obj_t_tb.draw();
        LockScreenOff();
    };
    // загрузить данные 
    table_total_balance.prototype.load = function () {
        LockScreen(langView('ttb_mess_load_balance', App.Langs));
        this.ids_wsd.getViewTotalBalance(function (balance) {
            this.view(balance);
            LockScreenOff();
        }.bind(this));

    };
    // Очистить объект
    table_total_balance.prototype.destroy = function () {
        // Вклучу когда понадобится 
        //this.modal_confirm_form.destroy();
        if (this.obj_t_tb) {
            this.obj_t_tb.destroy(true);
            this.obj_t_tb = null;
        }

        this.$table_total_balance.empty(); // empty in case the columns change
    }

    App.table_total_balance = table_total_balance;

    window.App = App;
})(window);