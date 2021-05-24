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
            'field_id': 'id строки',
            'field_num': '№ вагона',
            'field_id_arrival_car': 'id прибытия',
            'field_id_outgoing_car': 'id отправки',
            'field_id_sap_incoming_supply': 'id SAP Вх.поставки',
            'field_id_sap_outbound_supply': 'id SAP Исх.поставки',
            'field_note': 'Примечание',
            'field_create': 'Строка создана',
            'field_close': 'Строка закрыта',
            'field_parent_id': 'Предыдущая строка',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_wir_wagons': 'Загружаю список внутренних перемещений вагонов...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_num': 'Wagon number',
            'field_id_arrival_car': 'arrival id',
            'field_id_outgoing_car': 'send id',
            'field_id_sap_incoming_supply': 'SAP id Incoming delivery',
            'field_id_sap_outbound_supply': 'SAP id Outbound supply',
            'field_note': 'Note',
            'field_create': 'String created',
            'field_close': 'The line is closed',
            'field_parent_id': 'Previous row',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_wir_wagons': 'Loading the list of internal movements of wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'wir_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center',
            width: "20px"
        },
        {
            field: 'wir_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wir_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_arrival_car',
            data: function (row, type, val, meta) {
                return row.id_arrival_car;
            },
            className: 'dt-body-center',
            title: langView('field_id_arrival_car', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_sap_incoming_supply',
            data: function (row, type, val, meta) {
                return row.id_sap_incoming_supply;
            },
            className: 'dt-body-center',
            title: langView('field_id_sap_incoming_supply', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_outgoing_car',
            data: function (row, type, val, meta) {
                return row.id_outgoing_car;
            },
            className: 'dt-body-center',
            title: langView('field_id_outgoing_car', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_id_sap_outbound_supply',
            data: function (row, type, val, meta) {
                return row.id_sap_outbound_supply;
            },
            className: 'dt-body-center',
            title: langView('field_id_sap_outbound_supply', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'wir_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-left',
            title: langView('field_note', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'wir_create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + getReplaceTOfDT(row.create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wir_close',
            data: function (row, type, val, meta) {
                return row.close ? (row.close_user + '<br />[' + getReplaceTOfDT(row.close) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_close', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'wir_parent_id',
            data: function (row, type, val, meta) {
                return row.parent_id;
            },
            className: 'dt-body-left',
            title: langView('field_parent_id', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];

    //===========================================================================
    // Конструктор модуля таблицы внутренего движения вагона
    function tabs_detali(selector, id_arr, id_wir, id_out) {
        var $nav = $('<nav></nav>');
        var $div = $('<div></div>');
        var $div_tablist = $('<div></div>', {
            'id': selector + '-nav-tab-' + id_wir,
            'role': 'tablist',
            'class': 'nav nav-tabs'
        });
        var $div_tabcontent = $('<div></div>', {
            'id': 'nav-tabContent',
            'class': 'tab-content'
        });

        var $a_arrival = $('<a></a>', {
            'id': selector + '-nav-arrival-' + id_wir + '-tab',
            'data-toggle': 'tab',
            'text': 'Прибытие',
            'href': '#' + selector + '-nav-arrival-' + id_wir,
            'role': 'tab',
            'aria-controls': selector + '-nav-arrival-' + id_wir,
            'aria-selected': 'true',
            'class': 'nav-item nav-link active'
        });
        var $div_arrival = $('<div></div>', {
            'id': 'nav-arrival-' + id_wir,
            'role': 'tabpanel',
            'aria-labelledby': 'nav-arrival-' + id_wir + '-tab',
            /*            'text': 'arrival...',*/
            'class': 'tab-pane fade show active'
        });
        var $t_arrival = $('<div class="row"><div class="col-xl-12 operator-detali-tables"><table class="display compact cell-border row-border hover" id="' + selector + '-arrd-' + id_wir + '" style="width:100%"></table></div></div>');

        var $a_wim = $('<a></a>', {
            'id': selector + '-nav-wim-' + id_wir + '-tab',
            'data-toggle': 'tab',
            'text': 'Дислокация',
            'href': '#' + selector + '-nav-wim-' + id_wir,
            'role': 'tab',
            'aria-controls': selector + '-nav-wim-' + id_wir,
            'aria-selected': 'false',
            'class': 'nav-item nav-link'
        });
        var $div_wim = $('<div></div>', {
            'id': selector + '-nav-wim-' + id_wir,
            'role': 'tabpanel',
            'aria-labelledby': 'nav-wim-' + id_wir + '-tab',
            /*            'text': 'wim...',*/
            'class': 'tab-pane fade'
        });
        var $t_wim = $('<div class="row"><div class="col-xl-12 operator-detali-tables"><table class="display compact cell-border row-border hover" id="' + selector + '-wimd-' + id_wir + '" style="width:100%"></table></div></div>');

        var $a_wio = $('<a></a>', {
            'id': selector + '-nav-wio-' + id_wir + '-tab',
            'data-toggle': 'tab',
            'text': 'Операции',
            'href': '#' + selector + '-nav-wio-' + id_wir,
            'role': 'tab',
            'aria-controls': selector + '-nav-wio-' + id_wir,
            'aria-selected': 'false',
            'class': 'nav-item nav-link'
        });
        var $div_wio = $('<div></div>', {
            'id': selector + '-nav-wio-' + id_wir,
            'role': 'tabpanel',
            'aria-labelledby': 'nav-wio-' + id_wir + '-tab',
            /*            'text': 'wio...',*/
            'class': 'tab-pane fade'
        });
        var $t_wio = $('<div class="row"><div class="col-xl-12 operator-detali-tables"><table class="display compact cell-border row-border hover" id="' + selector + '-wiod-' + id_wir + '" style="width:100%"></table></div></div>');

        var $a_outgoing = $('<a></a>', {
            'id': selector + '-nav-outgoing-' + id_wir + '-tab',
            'data-toggle': 'tab',
            'text': 'Отправление',
            'href': '#' + selector + '-nav-outgoing-' + id_wir,
            'role': 'tab',
            'aria-controls': selector + '-nav-outgoing-' + id_wir,
            'aria-selected': 'false',
            'class': 'nav-item nav-link'
        });
        var $div_outgoing = $('<div></div>', {
            'id': selector + '-nav-outgoing-' + id_wir,
            'role': 'tabpanel',
            'aria-labelledby': 'nav-outgoing-1' + id_wir + '-tab',
            /*            'text': 'outgoing...',*/
            'class': 'tab-pane fade'
        });
        var $t_outgoing = $('<div class="row"><div class="col-xl-12 operator-detali-tables"><table class="display compact cell-border row-border hover" id="' + selector + '-outd-' + id_wir + '" style="width:100%"></table></div></div>');

        $div_tablist.append($a_arrival).append($a_wim).append($a_wio).append($a_outgoing);
        $div_tabcontent.append($div_arrival.append($t_arrival)).append($div_wim.append($t_wim)).append($div_wio.append($t_wio)).append($div_outgoing.append($t_outgoing));
        $nav.append($div_tablist);
        $div.append($nav)
        $div.append($div_tabcontent)
        this.$element = $div;

    }

    //===========================================================================
    //-----------------------------------------------------------------------
    // таблица истрия внутренего движения вагона
    //-----------------------------------------------------------------------
    // Конструктор модуля таблицы внутренего движения вагона
    function table_wir_detali(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_wir_d = $(selector);
        if (this.$t_wir_d.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$t_wir_d.attr('id');
    }
    // Инициализация панели с таблицами
    table_wir_detali.prototype.init = function (id_arr, id_wir, id_out) {
        this.id_arr = id_arr;
        this.id_wir = id_wir;
        this.id_out = id_out;
        var tabElement = new tabs_detali(this.selector, id_arr, id_wir, id_out);
        this.$t_wir_d.empty();
        this.$t_wir_d.append(tabElement.$element);

        var TAW = App.table_arrival_wagons;
        this.taw = new TAW('table#' + this.selector + '-arrd-' + this.id_wir); // Создадим экземпляр таблицы
        this.taw.init();

        var TWIM = App.table_wim;
        this.twim = new TWIM('table#' + this.selector + '-wimd-' + this.id_wir); // Создадим экземпляр таблицы
        this.twim.init();

        var TWIO = App.table_wio;
        this.twio = new TWIO('table#' + this.selector + '-wiod-' + this.id_wir); // Создадим экземпляр таблицы
        this.twio.init();

        var TOW = App.table_outgoing_wagon;
        this.tow = new TOW('table#' + this.selector + '-outd-' + this.id_wir); // Создадим экземпляр таблицы
        this.tow.init();

        // Определим событие выбора элемента
        $('#' + this.selector + '-nav-tab-' + this.id_wir + ' a').on('click', function (e) {
            e.preventDefault();
            var tab = e.target;
            $(tab).tab('show');
            // Отобразим данные
            var id = $(tab).attr('id');
            switch (id) {
                case this.selector + '-nav-arrival-' + this.id_wir + '-tab': this.view_arrival_detali(this.id_arr); break;
                case this.selector + '-nav-wim-' + this.id_wir + '-tab': this.view_wim_detali(this.id_wir); break;
                case this.selector + '-nav-wio-' + this.id_wir + '-tab': this.view_wio_detali(this.id_wir); break;
                case this.selector + '-nav-outgoing-' + this.id_wir + '-tab': this.view_outgoing_detali(this.id_out); break;
            };
        }.bind(this));
        // Покажем первую панель
        this.view_arrival_detali(this.id_arr);
    };
    // Показать детально прибытие
    table_wir_detali.prototype.view_arrival_detali = function (id_arr) {
        this.taw.load_of_id(id_arr);
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    };
    // Показать детально дислокацию
    table_wir_detali.prototype.view_wim_detali = function (id_wir) {
        this.twim.load_of_id_wir(id_wir);
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();

    };
    // Показать детально операции
    table_wir_detali.prototype.view_wio_detali = function (id_wir) {
        this.twio.load_of_id_wir(id_wir);
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    };
    // Показать детально отправку
    table_wir_detali.prototype.view_outgoing_detali = function (id_out) {
        this.tow.load_of_id(id_out);
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    };

    App.table_wir_detali = table_wir_detali;

    window.App = App;
})(window);