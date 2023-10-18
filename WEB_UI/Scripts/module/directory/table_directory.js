/*Модуль библиотека таблицы справочников*/
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
            'tldir_field_numeration': '№ п.п.',

            'tldir_mess_init_module': 'Инициализация модуля (table_directory) ...',

            'tldir_mess_load_sostav': 'Загружаю состав ...',

            'tldir_mess_view_report': 'Показать отчет ...',

            'tldir_field_operators_wagons_abbr': 'Оператор аббр.',
            'tldir_field_operators_wagons_operators': 'Оператор полное название',
            'tldir_field_operators_and_genus_operators': 'Оператор',
            'tldir_field_operators_and_genus_operators_abbr': 'Оператор(аббр)',
            'tldir_field_operators_and_genus_genus': 'Род',
            'tldir_field_operators_and_genus_genus_abbr': 'Род(аббр)',

            'tldir_field_usage_fee_period_status_input': '',
            'tldir_field_usage_fee_period_operators_abbr': 'Оператор',
            'tldir_field_usage_fee_period_genus_abbr': 'Оператор',
            'ttdir_field_usage_fee_period_start': 'Начало',
            'ttdir_field_usage_fee_period_stop': 'Окончание',
            'ttdir_field_usage_fee_period_hour_after_30': 'Окр. часа после 30',
            'tldir_field_usage_fee_period_currency': 'Валюта',
            'tldir_field_usage_fee_period_derailment_currency': 'Валюта (сход)',
            'ttdir_field_usage_fee_period_rate': 'Ставка',
            'ttdir_field_usage_fee_period_rate_derailment': 'Ставка',
            'ttdir_field_usage_fee_period_coefficient_route': 'Коэф.(маршрут)',
            'ttdir_field_usage_fee_period_coefficient_not_route': 'Коэф.(Не маршрут)',
            'ttdir_field_usage_fee_period_grace_time_1': 'Льгот. время (1-е)',
            'ttdir_field_usage_fee_period_grace_time_2': 'Льгот. время (2-е)',
            'ttdir_field_usage_fee_period_create': 'Время создания',
            'ttdir_field_usage_fee_period_create_user': 'Создал',
            'ttdir_field_usage_fee_period_change': 'Время правки',
            'ttdir_field_usage_fee_period_change_user': 'Правил',

            'tldir_field_num': '№ вагона',
            'tldir_field_rod_abbr': 'Род.',
            'tldir_field_arrival_operator_abbr': 'Оператор по отправке',
            'tldir_field_station_from_abbr': 'Станция отправления',
            'tldir_field_arrival_cargo_name': 'Груз прибытия',
            'tldir_field_arrival_station_on': 'Следует на ст АМКР',
            'tldir_field_arrival_name_division': 'Цех получатель',
            'tldir_field_commercial_condition': 'Ком состояние',
            'tldir_field_sertification_data': 'Серт. данные',
            'tldir_field_arrival_uz_vagon_change': 'Дата правки',
            'tldir_field_arrival_uz_vagon_change_user': 'правил',
            'tldir_field_arrival_station_from_name': 'Станция отправления',

            'ttdir_title_yes': 'Да',
            'tldir_title_all': 'Все',
            'tldir_title_not_epd': 'Без ЭПД',
            'tldir_title_for_loading': 'Под погрузку',
            'tldir_title_route': 'маршрут',
            'tldir_title_not_route': 'не маршрут',
            'tldir_title_laden': 'груженный',
            'tldir_title_not_laden': 'порожний',

            'tldir_title_button_export': 'Экспорт',
            'tldir_title_button_buffer': 'Буфер',
            'tldir_title_button_excel': 'Excel',
            'tldir_title_excel_sheet_name': 'Отчет',
            'tldir_title_button_field': 'Поля',
            'tldir_title_button_field_select': 'Выбрать',
            'tldir_title_button_field_view_all': 'Показать все',
            'tldir_title_button_field_clear': 'Сбросить',
            'tldir_title_button_show_selection': 'Только выбранные',
            'tldir_title_button_select_all': 'Выбрать все',
            'tldir_title_button_select_none': 'Убрать все',
            'tldir_title_edit_wagon': 'Править',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //var wsd = App.ids_wsd;
    var ids_dir = App.ids_directory;

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    var VICR = App.view_incoming_report; // Модуль отчетов по прибытию

    // Перечень полей
    var list_collums = [
        // Поля составы принятые
        {
            field: 'numeration',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('tldir_field_numeration', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'details_control',
            className: 'details-control  details-control-wagons-sostav',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'checkbox_selection',
            targets: 0,
            className: 'select-checkbox',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        // Поля Directory_OperatorsWagons
        {
            field: 'operators_wagons_abbr',
            data: function (row, type, val, meta) {
                return row['abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_operators_wagons_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operators_wagons_operators',
            data: function (row, type, val, meta) {
                return row['operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-500',
            title: langView('tldir_field_operators_wagons_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // get_operators_and_genus
        {
            field: 'operators_and_genus_operators',
            data: function (row, type, val, meta) {
                return row['operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_operators_and_genus_operators', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operators_and_genus_operators_abbr',
            data: function (row, type, val, meta) {
                return row['operators_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_operators_and_genus_operators_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operators_and_genus_genus',
            data: function (row, type, val, meta) {
                return row['genus_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_operators_and_genus_genus', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operators_and_genus_genus_abbr',
            data: function (row, type, val, meta) {
                return row['genus_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_operators_and_genus_genus_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Usage_Fee_Period
        // Статус Вода состава
        {
            field: 'usage_fee_period_status_input',
            data: function (row, type, val, meta) {
                if (row.stop != null) {
                    if (moment().isBefore(row.stop)) {
                        return '<i class="fa-solid fa-thumbs-up" style="color:#008000"></i>';
                    } else {
                        return '<i class="fa-solid fa-square-xmark" style="color:#ff6868"></i>';
                    }
                } else {
                    return '<i class="fa-sharp fa-solid fa-cart-plus" style="color:#1b1bff"></i>';
                }
                //if (row.id_arrived !== null && row.id_sostav !== null) {
                //    return "<i class='fas fa-train' style='color:#795acd;'></i>";#1b1bff
                //} else { return "<i class='fas fa-user' style='color:#ffbf00;'></i>"; }
            },
            className: 'dt-body-nowrap',
            title: langView('tldir_field_usage_fee_period_status_input', App.Langs), width: "20px", orderable: false, searchable: false
        },
        {
            field: 'usage_fee_period_operators_abbr',
            data: function (row, type, val, meta) {
                var operator = row.Directory_OperatorsWagons;
                return operator !== null ? operator['abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tldir_field_usage_fee_period_operators_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_operators_abbr',
            data: function (row, type, val, meta) {
                var operator = row.Directory_OperatorsWagons;
                return operator !== null ? operator['abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tldir_field_usage_fee_period_operators_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_genus_abbr',
            data: function (row, type, val, meta) {
                var genus = row.Directory_GenusWagons;
                return genus !== null ? genus['abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tldir_field_usage_fee_period_genus_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_start',
            data: function (row, type, val, meta) {
                return row.start ? moment(row.start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdir_field_usage_fee_period_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_stop',
            data: function (row, type, val, meta) {
                return row.stop ? moment(row.stop).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdir_field_usage_fee_period_stop', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_hour_after_30',
            data: function (row, type, val, meta) {
                return row.hour_after_30 !== null && row.hour_after_30 === true ? langView('ttdir_title_yes', App.Langs) : '';
            },
            className: 'dt-body-nowrap',
            title: langView('ttdir_field_usage_fee_period_hour_after_30', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_currency',
            data: function (row, type, val, meta) {
                var currency = row.Directory_Currency;
                return currency !== null ? currency['currency_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tldir_field_usage_fee_period_currency', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_rate',
            data: function (row, type, val, meta) {
                return row.rate;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_rate', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_derailment_currency',
            data: function (row, type, val, meta) {
                var currency = row.Directory_Currency1;
                return currency !== null ? currency['currency_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tldir_field_usage_fee_period_derailment_currency', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_rate_derailment',
            data: function (row, type, val, meta) {
                return row.rate_derailment;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_rate_derailment', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_coefficient_route',
            data: function (row, type, val, meta) {
                return row.coefficient_route;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_coefficient_route', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_coefficient_not_route',
            data: function (row, type, val, meta) {
                return row.coefficient_not_route;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_coefficient_not_route', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_grace_time_1',
            data: function (row, type, val, meta) {
                return row.grace_time_1;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_grace_time_1', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_grace_time_2',
            data: function (row, type, val, meta) {
                return row.grace_time_2;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_grace_time_2', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_create',
            data: function (row, type, val, meta) {
                return row.create ? moment(row.create).format(format_datetime) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'usage_fee_period_create_user',
            data: function (row, type, val, meta) {
                return row.create_user;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_create_user', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'usage_fee_period_change',
            data: function (row, type, val, meta) {
                return row.change ? moment(row.change).format(format_datetime) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_change', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'usage_fee_period_change_user',
            data: function (row, type, val, meta) {
                return row.change_user;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_usage_fee_period_change_user', App.Langs), width: "100px", orderable: false, searchable: false
        },
        // arrival_cars
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-left mw-50',
            title: langView('tldir_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'rod_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tldir_field_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_operator_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('tldir_field_arrival_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'station_from_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_sostav_station_from_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('tldir_field_station_from_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_arrival_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_station_on',
            data: function (row, type, val, meta) {
                return row['arrival_sostav_station_on_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_arrival_station_on', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_name_division',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tldir_field_arrival_name_division', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Ком состояние
        {
            field: 'commercial_condition',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_commercial_condition_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_commercial_condition', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком сертиыикационные данные
        {
            field: 'sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_sertification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // изменена
        {
            field: 'arrival_uz_vagon_change',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_change ? moment(row.arrival_uz_vagon_change).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tldir_field_arrival_uz_vagon_change', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'arrival_uz_vagon_change_user',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_change_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tldir_field_arrival_uz_vagon_change_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'arrival_station_from_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tldir_field_arrival_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tldir_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tldir_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tldir_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('tldir_title_excel_sheet_name', App.Langs),
                    messageTop: function () {
                        return '';
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'field',
            extend: 'collection',
            text: langView('tldir_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tldir_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tldir_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tldir_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        },
        {
            button: 'show_selection',
            extend: 'showSelected',
            text: langView('tldir_title_button_show_selection', App.Langs),
        },
        {
            button: 'select_all',
            extend: 'selectAll',
            text: langView('tldir_title_button_select_all', App.Langs),
        },
        {
            button: 'select_none',
            extend: 'selectNone',
            text: langView('tldir_title_button_select_none', App.Langs),
        },
        {
            button: 'edit_wagon',
            text: langView('tldir_title_edit_wagon', App.Langs),
            enabled: true
        },
    ];

    var pageTotal = 0;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_directory(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_directory.prototype.init_columns_detali = function () {
        var collums = [];
        return init_columns(collums, list_collums);
    };
    // инициализация полей operators_wagons_select
    table_directory.prototype.init_columns_operators_wagons_select = function () {
        var collums = [];
        collums.push({ field: 'checkbox_selection', title: null, class: null });
        collums.push({ field: 'operators_wagons_abbr', title: null, class: null });
        collums.push({ field: 'operators_wagons_operators', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей operators_wagons_genus_select
    table_directory.prototype.init_columns_operators_wagons_genus_select = function () {
        var collums = [];
        collums.push({ field: 'checkbox_selection', title: null, class: null });
        collums.push({ field: 'operators_and_genus_operators', title: null, class: null });
        collums.push({ field: 'operators_and_genus_operators_abbr', title: null, class: null });
        collums.push({ field: 'operators_and_genus_genus', title: null, class: null });
        collums.push({ field: 'operators_and_genus_genus_abbr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_directory.prototype.init_columns_usage_fee_period = function () {
        var collums = [];
        collums.push({ field: 'usage_fee_period_status_input', title: null, class: null });
        collums.push({ field: 'usage_fee_period_operators_abbr', title: null, class: null });
        collums.push({ field: 'usage_fee_period_genus_abbr', title: null, class: null });
        collums.push({ field: 'usage_fee_period_start', title: null, class: null });
        collums.push({ field: 'usage_fee_period_stop', title: null, class: null });
        collums.push({ field: 'usage_fee_period_hour_after_30', title: null, class: null });
        collums.push({ field: 'usage_fee_period_currency', title: null, class: null });
        collums.push({ field: 'usage_fee_period_rate', title: null, class: null });
        collums.push({ field: 'usage_fee_period_derailment_currency', title: null, class: null });
        collums.push({ field: 'usage_fee_period_rate_derailment', title: null, class: null });
        collums.push({ field: 'usage_fee_period_coefficient_route', title: null, class: null });
        collums.push({ field: 'usage_fee_period_coefficient_not_route', title: null, class: null });
        collums.push({ field: 'usage_fee_period_grace_time_1', title: null, class: null });
        collums.push({ field: 'usage_fee_period_grace_time_2', title: null, class: null });
        collums.push({ field: 'usage_fee_period_create', title: null, class: null });
        collums.push({ field: 'usage_fee_period_create_user', title: null, class: null });
        collums.push({ field: 'usage_fee_period_change', title: null, class: null });
        collums.push({ field: 'usage_fee_period_change_user', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };

    table_directory.prototype.init_columns_arrival_cars = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'rod_abbr', title: null, class: null });
        collums.push({ field: 'arrival_operator_abbr', title: null, class: null });
        collums.push({ field: 'arrival_station_from_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_station_on', title: null, class: null });
        collums.push({ field: 'arrival_name_division', title: null, class: null });
        collums.push({ field: 'commercial_condition', title: null, class: null });
        collums.push({ field: 'sertification_data', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_change', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_change_user', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_directory.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок operators_wagons_select
    table_directory.prototype.init_button_operators_wagons_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        buttons.push({ name: 'show_selection', action: null });
        buttons.push({ name: 'select_all', action: null });
        buttons.push({ name: 'select_none', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок operators_wagons_genus_select
    table_directory.prototype.init_button_operators_wagons_genus_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        buttons.push({ name: 'show_selection', action: null });
        buttons.push({ name: 'select_all', action: null });
        buttons.push({ name: 'select_none', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_directory.prototype.init_button_usage_fee_period = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        buttons.push({ name: 'show_selection', action: null });
        buttons.push({ name: 'select_all', action: null });
        buttons.push({ name: 'select_none', action: null });
        return init_buttons(buttons, list_buttons);
    };

    table_directory.prototype.init_button_arrival_cars = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
               this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        buttons.push({ name: 'show_selection', action: null });
        buttons.push({ name: 'select_all', action: null });
        buttons.push({ name: 'select_none', action: null });
        buttons.push({
            name: 'edit_wagon',
            action: function (e, dt, node, config) {
                if (typeof this.settings.fn_action_edit_wagon === 'function') {
                    this.settings.fn_action_edit_wagon(this.selected_rows);
                }

            }.bind(this)
        });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_directory.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'operators_wagons_select': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tldir_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi ',
                    selector: 'td:first-child'
                };
                this.autoWidth = true;
                //this.scrollY = 300,
                //this.scrollCollapse = true,
                this.table_columns = this.init_columns_operators_wagons_select();
                this.table_buttons = this.init_button_operators_wagons_select();
                this.dom = 'Bfrtip';
                break;
            };
            case 'operators_wagons_genus_select': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tldir_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi ',
                    selector: 'td:first-child'
                };
                this.autoWidth = true;
                //this.scrollY = 300,
                //this.scrollCollapse = true,
                this.table_columns = this.init_columns_operators_wagons_genus_select();
                this.table_buttons = this.init_button_operators_wagons_genus_select();
                this.dom = 'Bfrtip';
                break;
            };
            case 'usage_fee_period': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tldir_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi ',
                };
                this.autoWidth = true;
                this.scrollX = true;
                this.table_columns = this.init_columns_usage_fee_period();
                this.table_buttons = this.init_button_usage_fee_period();
                this.dom = 'Bfrtip';
                break;
            };
            case 'arrival_cars': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tldir_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi ',
                };
                this.autoWidth = true;
                this.scrollX = true;
                this.table_columns = this.init_columns_arrival_cars();
                this.table_buttons = this.init_button_arrival_cars();
                this.dom = 'Bfrtip';
                break;
            };
            // Таблица составы по умолчанию (если не выставят тип отчета)
            default: {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_detali();
                this.table_buttons = this.init_button_detali();
                break;
            };
        }
    };
    // Инициализация
    table_directory.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('tldir_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_table: false,
            type_report: null,     // 
            link_num: false,
            ids_dir: null,
            fn_init: null,
            fn_refresh: null,
            fn_select_rows: null,
            fn_action_view_wagons: null,
            fn_action_edit_wagon: null,

        }, options);
        //
        //this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new ids_dir();
        // Настройки отчета
        this.lengthMenu = null;
        this.pageLength = null;
        this.deferRender = true;
        this.paging = false;
        this.searching = false;
        this.ordering = false;
        this.info = false;
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.columnDefs = null;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.drawCallback = null;
        this.footerCallback = null;
        this.autoWidth = false;
        this.table_columns = [];
        this.table_buttons = [];
        this.scrollX = false;
        this.dom = 'Bfrtip';
        this.init_type_report();
        this.data = [];
        this.selected_rows = null;
        this.tables_detali = [];                    // Массив таблиц детально
        //----------------------------------
        // Создать макет таблицы
        var table_report = new this.fe_ui.table({
            id: 'tab-tdr-' + this.selector,
            class: 'display cell-border row-border hover', // compact
            title: null,
        });
        //if (this.settings.type_report === 'adoption_sostav') {
        //    this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        //}

        this.$table_report = table_report.$table;
        this.$td_report.addClass('table-report').append(this.$table_report);
        // Инициализируем таблицу
        this.obj_t_report = this.$table_report.DataTable({
            "lengthMenu": this.lengthMenu,
            "pageLength": this.pageLength,
            "deferRender": this.deferRender,
            "paging": this.paging,
            "searching": this.searching,
            "ordering": this.ordering,
            "info": this.info,
            "keys": true,
            columnDefs: this.columnDefs,
            colReorder: true,                       // вкл. перетаскивание полей
            fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
            fixedColumns: {
                leftColumns: this.leftColumns,
            },
            select: this.table_select,
            "autoWidth": this.autoWidth,
            scrollX: this.scrollX,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            //scrollX: true,
            /*            sScrollXInner: "100%",*/
            //"responsive": true,
            //"bAutoWidth": false,
            //order: this.order_column,
            language: language_table(App.Langs),
            jQueryUI: false,
            drawCallback: this.drawCallback,
            "createdRow": function (row, data, index) {
                switch (this.settings.type_report) {
                    //case 'adoption_sostav': {
                    //    if (data.type === 0) {

                    //    } else {
                    //        $(row).addClass('yellow');
                    //    }
                    //    break;
                    //};
                };
            }.bind(this),
            footerCallback: this.footerCallback,
            columns: this.table_columns,
            dom: this.dom,
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'operators_wagons_select': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'operators_wagons_genus_select': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'usage_fee_period': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'arrival_cars': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
        };
        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Выбрано
    table_directory.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_directory.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'adoption_sostav': {
            //    if (this.select_rows_sostav && this.select_rows_sostav.length > 0) {
            //        this.obj_t_sostav.button(5).enable(true);
            //        if (this.select_rows_sostav[0].status < 1) {
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(true); // отмена сдачи состава
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(false);
            //            //if (this.select_rows_sostav[0].status === 2) { this.obj_t_sostav.button(4).enable(true); } else { this.obj_t_sostav.button(4).enable(false); }
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_sostav.button(3).enable(false);
            //        this.obj_t_sostav.button(4).enable(false);
            //        this.obj_t_sostav.button(5).enable(false);
            //    }
            //    break;
            //};
        };
    };
    // Показать данные
    table_directory.prototype.view = function (data) {
        this.data = data;
        this.out_clear();
        LockScreen(langView('tldir_mess_view_report', App.Langs));
        this.obj_t_report.clear();
        this.obj_t_report.rows.add(data);
        this.obj_t_report.order(this.order_column);
        this.obj_t_report.draw();
        this.view_footer(data);
        this.select_rows();
        this.enable_button();
        //LockScreenOff();
    };
    //
    table_directory.prototype.clear = function () {
        if (this.obj_t_report) {
            this.obj_t_report.clear();
            this.obj_t_report.draw();
        };
    };
    //
    table_directory.prototype.view_footer = function (data) {
        //switch (this.settings.type_report) {
        //    case 'adoption_sostav': {
        //        if (data) {
        //            var sum_count_wagon = 0;
        //            var sum_count_wagon_all = 0;
        //            var sum_count_return_wagon = 0;
        //            var sum_count_return_wagon_all = 0;
        //            var sum_count_account_balance = 0;
        //            var sum_count_account_balance_all = 0;
        //            var sum_count_not_operator = 0;
        //            var sum_count_not_operator_all = 0;
        //            $.each(data, function (i, el) {
        //                if (el.type === 0) {
        //                    sum_count_wagon += el.count_wagon;
        //                    sum_count_account_balance += el.count_account_balance;
        //                    sum_count_not_operator += el.count_not_operator;
        //                    sum_count_return_wagon += el.count_return_wagon;
        //                }
        //                sum_count_wagon_all += el.count_wagon;
        //                sum_count_account_balance_all += el.count_account_balance;
        //                sum_count_not_operator_all += el.count_not_operator;
        //                sum_count_return_wagon += el.count_return_wagon;
        //            });
        //        }
        //        this.obj_t_report.columns('.sum_count_wagon').every(function () {
        //            $(this.footer()).html(sum_count_wagon_all + '(' + sum_count_wagon + ')');
        //        });
        //        this.obj_t_report.columns('.sum_count_account_balance').every(function () {
        //            $(this.footer()).html(sum_count_account_balance_all + '(' + sum_count_account_balance + ')');
        //        });
        //        this.obj_t_report.columns('.sum_count_not_operator').every(function () {
        //            $(this.footer()).html(sum_count_not_operator_all + '(' + sum_count_not_operator + ')');
        //        });
        //        this.obj_t_report.columns('.sum_count_return_wagon').every(function () {
        //            $(this.footer()).html(sum_count_return_wagon_all + '(' + sum_count_return_wagon + ')');
        //        });
        //        break;
        //    };
        //};
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_directory.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_directory.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    table_directory.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    table_directory.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Очистить объект
    table_directory.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    };
    // Очистить детали по указаному пути
    table_directory.prototype.destroy_detali = function (data) {
        if (this.tables_detali[data.id]) {
            this.tables_detali[data.id].destroy();
            delete this.tables_detali[data.id];
        }
    };
    // Очистить все детали
    table_directory.prototype.destroy_all_detali = function () {
        $.each(this.tables_detali, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.tables_detali = {};
    };
    // Выполнить операцию обновить
    table_directory.prototype.action_refresh = function () {
        this.out_clear();
        if (typeof this.settings.fn_refresh === 'function') {
            this.settings.fn_refresh();
        }
    };
    //
    App.table_directory = table_directory;

    window.App = App;
})(window);