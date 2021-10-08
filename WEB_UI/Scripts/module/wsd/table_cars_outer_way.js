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
            'tcow_field_from_id_wim': 'id дисл. отпр.',
            'tcow_field_id_wir': 'id вн. перем.',
            'tcow_field_from_id_wio': 'id опер. отпр.',
            'tcow_field_on_id_wim': 'id дисл. приб.',
            'tcow_field_on_id_wio': 'id опер. приб.',
            'tcow_field_outer_way_num_sostav': '№ состава',
            'tcow_field_num': '№ ваг.',
            'tcow_field_position': '№ поз.',
            'tcow_field_arrival_nom_main_doc': '№ накл. по приб.',
            'tcow_field_arrival_nom_doc': '№ дос. по приб.',
            'tcow_field_wagon_adm': 'Код адм.',
            'tcow_field_wagon_adm_name': 'Администрация',
            'tcow_field_wagon_adm_abbr': 'Админ.',
            'tcow_field_wagon_rod': 'Род ваг.',
            'tcow_field_wagon_rod_name': 'Род ваг.',
            'tcow_field_wagon_rod_abbr': 'Род ваг.(аббр.)',
            'tcow_field_id_operator': 'id опер.',
            'tcow_field_operators': 'Оператор',
            'tcow_field_operator_abbr': 'Оператор (аббр.)',
            'tcow_field_operator_rent_start': 'Нач. аренды',
            'tcow_field_operator_rent_end': 'Кон. аренды',
            'tcow_field_operator_paid': 'Приз. платн.',
            'tcow_field_id_limiting_loading': 'id огран.',
            'tcow_field_limiting_name': 'Ограничение',
            'tcow_field_limiting_abbr': 'Огран. (аббр.)',
            'tcow_field_arrival_condition_name': 'Разметка (приб.)',
            'tcow_field_arrival_condition_abbr': 'Разм.',
            'tcow_field_arrival_condition_red': 'red',
            'tcow_field_arrival_cargo_group_name': 'Группа груза по прибытию',
            'tcow_field_arrival_cargo_name': 'Груз по прибытию ',
            'tcow_field_arrival_id_sertification_data': 'id сер. дан.',
            'tcow_field_arrival_sertification_data': 'Сертиф. данные',
            'tcow_field_arrival_division_amkr_code': 'Шифр цеха',
            'tcow_field_arrival_division_amkr_name': 'Цех получ.',
            'tcow_field_arrival_division_amkr_abbr': 'Цех получ.',
            'tcow_field_id_arrival_car': 'id приб. ваг. ',
            'tcow_field_id_sap_incoming_supply': 'id вх. пост.',
            'tcow_field_doc_outgoing_car': 'Нал. док. для сдачи на  УЗ',
            'tcow_field_id_outgoing_car': 'id отп. ваг.',
            'tcow_field_id_sap_outbound_supply': 'id исх. пост.',
            'tcow_field_wir_note': 'Примечание',
            'tcow_field_wir_create': 'Внутр. перем. создано',
            'tcow_field_wir_create_user': 'Внутр. перем. создал',
            'tcow_field_wir_close': 'Внутр. перем. закрыто',
            'tcow_field_wir_close_user': 'Внутр. перем. закрыл',
            // Операция прибытия
            'tcow_field_from_id_operation': 'id опер',
            'tcow_field_from_operation_name': 'Операция по отправлению',
            'tcow_field_from_operation_start': 'Нач. опер. отпр.',
            'tcow_field_from_operation_end': 'Кон. опер. отпр.',
            'tcow_field_from_busy': 'Занят (операция)',
            'tcow_field_from_operation_locomotive1': 'Лок.№1',
            'tcow_field_from_operation_locomotive2': 'Лок.№2',
            'tcow_field_from_operation_note': 'Опер. примечание',
            'tcow_field_from_operation_create': 'Опер. отпр. создана',
            'tcow_field_from_operation_create_user': 'Вып. опер. отправл.',
            'tcow_field_from_operation_close': 'Опер. отпр. закр.',
            'tcow_field_from_operation_close_user': 'Закр. опер. отправл.',
            'tcow_field_from_operation_parent_id': 'id пред. опер.',
            //
            'tcow_field_from_operation_id_condition': 'id Разм. отпр.',
            'tcow_field_from_operation_condition_name': 'Разметка (отпр.)',
            'tcow_field_from_operation_condition_abbr': 'Разм. отпр (аббр.)',
            'tcow_field_from_operation_id_loading_status': 'id сост. загр. отпр.',
            'tcow_field_from_operation_loading_status': 'Состояние загрузки при отправке',
            //
            'tcow_field_from_id_station': 'id ст. отпр.',
            'tcow_field_from_station_name': 'Станция отправления',
            'tcow_field_from_station_abbr': 'Ст. отпр. (аббр.)',
            'tcow_field_from_id_way': 'id путь отпр.',
            'tcow_field_from_id_park': 'id парка отпр.',
            'tcow_field_from_way_name': 'Путь отправки',
            'tcow_field_from_way_abbr': 'Путь отпр. (аббр.)',
            'tcow_field_from_way_capacity': 'Путь отпр. (вмест.)',
            'tcow_field_from_way_close': 'Путь отпр. закрыт',
            'tcow_field_from_way_delete': 'Путь отпр. удален',
            'tcow_field_from_way_note': 'Путь отпр. прмечание',
            'tcow_field_from_way_start': 'Путь отпр. ваг. приб.',
            'tcow_field_from_way_end': 'Путь отпр. ваг. убыл.',
            'tcow_field_id_outer_way': 'id перег.',
            'tcow_field_name_outer_way': 'Перегон',
            'tcow_field_outer_way_close': 'Перег. закрыт',
            'tcow_field_outer_way_delete': 'Перег. удален',
            'tcow_field_outer_way_note': 'Перегон прим.',
            'tcow_field_outer_way_start': 'Перегон ваг. пост.',
            'tcow_field_outer_way_end': 'Перегон. ваг. сняли.',
            'tcow_field_from_wim_note': 'Дисл. отпр. примечание',
            'tcow_field_from_wim_create': 'Дисл. отпр. создана',
            'tcow_field_from_wim_create_user': 'Дисл. отпр. создал',
            'tcow_field_from_wim_close': 'Дисл. отпр. закрыта',
            'tcow_field_from_wim_close_user': 'Дисл. отпр. закрыл',
            'tcow_field_from_wim_parent_id': 'id отпр. дислок.',
            'tcow_field_on_id_station': 'id ст. приб.',
            'tcow_field_on_station_name': 'Станция прибытия',
            'tcow_field_on_station_abbr': 'Ст. приб. (аббр.)',
            'tcow_field_on_id_way': 'id путь приб.',
            'tcow_field_on_id_park': 'id парка приб.',
            'tcow_field_on_way_name': 'Путь прибытия',
            'tcow_field_on_way_abbr': 'Путь приб. (аббр.)',
            'tcow_field_on_way_capacity': 'Путь приб. (вмест.)',
            'tcow_field_on_way_close': 'Путь приб. закрыт',
            'tcow_field_on_way_delete': 'Путь приб. удален',
            'tcow_field_on_way_note': 'Путь приб. прмечание',
            'tcow_field_on_way_start': 'Дисл. приб. ваг. приб.',
            'tcow_field_on_way_end': 'Дисл приб. ваг. убыл.',
            'tcow_field_on_way_position': 'Дисл приб. № поз.',
            'tcow_field_on_wim_note': 'Дисл. приб. примечание',
            'tcow_field_on_wim_create': 'Дисл. приб. создана',
            'tcow_field_on_wim_create_user': 'Дисл. приб. создал',
            'tcow_field_on_wim_close': 'Дисл. приб. закрыта',
            'tcow_field_on_wim_close_user': 'Дисл. приб. закрыл',
            'tcow_field_on_wim_parent_id': 'id пред. дислок.',
            //
            'tcow_field_on_id_operation': 'id опер',
            'tcow_field_on_operation_name': 'Операция по отправлению',
            'tcow_field_on_operation_start': 'Нач. опер. приб.',
            'tcow_field_on_operation_end': 'Кон. опер. приб.',
            'tcow_field_on_busy': 'Занят (операция)',
            'tcow_field_on_operation_locomotive1': 'Лок.№1',
            'tcow_field_on_operation_locomotive2': 'Лок.№2',
            'tcow_field_on_operation_note': 'Опер. примечание',
            'tcow_field_on_operation_create': 'Опер. приб. создана',
            'tcow_field_on_operation_create_user': 'Вып. опер. приб.',
            'tcow_field_on_operation_close': 'Опер. отпр. закр.',
            'tcow_field_on_operation_close_user': 'Закр. опер. отправл.',
            'tcow_field_on_operation_parent_id': 'id пред. опер.',
            //
            'tcow_field_on_operation_id_condition': 'id Разм. прием.',
            'tcow_field_on_operation_condition_name': 'Разметка (прием.)',
            'tcow_field_on_operation_condition_abbr': 'Разм. прием (аббр.)',
            'tcow_field_on_operation_id_loading_status': 'id сост. загр. прием.',
            'tcow_field_on_operation_loading_status': 'Состояние загрузки при приеме',

            'tcow_title_yes': 'Да',
            //'title_busy': 'Занят',
            //'title_all': 'Все',
            //'title_status_0': 'Предъявлен',
            //'title_status_1': 'В работе',
            //'title_status_2': 'Сдан',
            //'title_status_3': 'Отправлен',
            //'title_status_4': 'Возврат',

            //'title_link_num': 'Показать историю по вагону...',

            'tcow_title_button_export': 'Экспорт',
            'tcow_title_button_buffer': 'Буфер',
            'tcow_title_button_excel': 'Excel',
            'tcow_title_button_field': 'Поля',
            'tcow_title_button_tcow_field_select': 'Выбрать',
            'tcow_title_button_tcow_field_view_all': 'Показать все',
            'tcow_title_button_tcow_field_clear': 'Сбросить',

            'tcow_title_button_select_all': 'Все вагоны',
            'tcow_title_button_select_none': 'Убрать выбор',
            'tcow_title_button_add_way_sending': 'Добавить в состав',
            //'tcow_title_button_del_way_sending': 'Убрать из состава',
            //'tcow_title_button_reverse_num_wagon': 'Реверс',

            'tcow_mess_init_module': 'Инициализация модуля…',
            'tcow_mess_load_wagons': 'Загружаю вагоны…',
            'tcow_mess_view_wagons': 'загрузка информации о вагонах состава…',
            'tcow_mess_view_sostav': 'загрузка информации о составах на перегоне…',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    // Перечень полей
    var list_collums = [

        //=============== ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ ==================
        {
            field: 'from_id_wim',
            data: function (row, type, val, meta) {
                return row.from_id_wim;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_id_wim', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'id_wir',
            data: function (row, type, val, meta) {
                return row.id_wir;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_wir', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_id_wio',
            data: function (row, type, val, meta) {
                return row.from_id_wio;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_id_wio', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_id_wim',
            data: function (row, type, val, meta) {
                return row.on_id_wim;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_id_wim', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_id_wio',
            data: function (row, type, val, meta) {
                return row.on_id_wio;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_id_wio', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //=============== ОСНОВНОЕ ОКНО ==================
        {
            field: 'outer_way_num_sostav',
            data: function (row, type, val, meta) {
                return row.outer_way_num_sostav;
            },
            className: 'dt-body-center fixed-column',
            title: langView('tcow_field_outer_way_num_sostav', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center fixed-column num-wagon',
            title: langView('tcow_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'num_link',
            data: function (row, type, val, meta) {
                var fc_ui = new FC();
                var $alink = new fc_ui.el_a(row.num, 'num-wagon', '#', row.num, '_blank', langView('title_link_num', App.Langs))
                if ($alink && $alink.$alink && $alink.$alink.length > 0) {
                    return $alink.$alink[0].outerHTML;
                } else {
                    return row.num;
                }
            },
            className: 'dt-body-center fixed-column num-wagon',
            title: langView('tcow_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_position',
            data: function (row, type, val, meta) {
                return row.outer_way_position;
            },
            className: 'dt-body-center fixed-column',
            title: langView('tcow_field_position', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //=============== Номер накладной ==================
        // № накладной по приб
        {
            field: 'arrival_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_nom_main_doc ? row.arrival_nom_main_doc : row.arrival_nom_doc;
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_arrival_nom_main_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // № досылки по приб
        {
            field: 'arrival_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_nom_main_doc ? row.arrival_nom_doc : '';
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_arrival_nom_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Администрация
        {
            field: 'wagon_adm',
            data: function (row, type, val, meta) {
                return row.wagon_adm;
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_adm_name',
            data: function (row, type, val, meta) {
                return row['wagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_wagon_adm_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_wagon_adm_abbr', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Род вагона
        {
            field: 'wagon_rod',
            data: function (row, type, val, meta) {
                return row.wagon_rod;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_wagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_rod_name',
            data: function (row, type, val, meta) {
                return row['wagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_wagon_rod_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'wagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tcow_field_wagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Оператор
        {
            field: 'id_operator',
            data: function (row, type, val, meta) {
                return row.id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('tcow_field_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'operators',
            data: function (row, type, val, meta) {
                return row['operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('tcow_field_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'operator_abbr',
            data: function (row, type, val, meta) {
                return row['operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('tcow_field_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operator_rent_start',
            data: function (row, type, val, meta) {
                return row.operator_rent_start ? moment(row.operator_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('tcow_field_operator_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operator_rent_end',
            data: function (row, type, val, meta) {
                return row.operator_rent_end ? moment(row.operator_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('tcow_field_operator_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operator_paid',
            data: function (row, type, val, meta) {
                return row.operator_paid ? langView('tcow_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //operator_color
        //operator_monitoring_idle_time
        //Ограничение
        {
            field: 'id_limiting_loading',
            data: function (row, type, val, meta) {
                return row.id_limiting_loading;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_limiting_loading', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'limiting_name',
            data: function (row, type, val, meta) {
                return row['limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'limiting_abbr',
            data: function (row, type, val, meta) {
                return row['limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'arrival_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_arrival_condition_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_arrival_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_condition_red',
            data: function (row, type, val, meta) {
                return row.arrival_condition_red;
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_arrival_condition_red', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // груз по прибытию
        {
            field: 'arrival_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['arrival_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_arrival_cargo_group_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_arrival_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Сертификационные данные
        {
            field: 'arrival_id_sertification_data',
            data: function (row, type, val, meta) {
                return row.arrival_id_sertification_data;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_arrival_id_sertification_data', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_arrival_sertification_data', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Цех-получатель
        {
            field: 'arrival_division_amkr_code',
            data: function (row, type, val, meta) {
                return row.arrival_division_amkr_code;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_arrival_division_amkr_code', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_division_amkr_name',
            data: function (row, type, val, meta) {
                return row['arrival_division_amkr_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_arrival_division_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_division_amkr_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_division_amkr_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_arrival_division_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Прием вагона
        {
            field: 'id_arrival_car',
            data: function (row, type, val, meta) {
                return row.id_arrival_car;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_arrival_car', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Входящая поставка
        {
            field: 'id_sap_incoming_supply',
            data: function (row, type, val, meta) {
                return row.id_sap_incoming_supply;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_sap_incoming_supply', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Наличие документа для сдачи на  УЗ
        {
            field: 'doc_outgoing_car',
            data: function (row, type, val, meta) {
                return row.doc_outgoing_car ? langView('tcow_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('tcow_field_doc_outgoing_car', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Отправка вагона
        {
            field: 'id_outgoing_car',
            data: function (row, type, val, meta) {
                return row.id_outgoing_car;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_outgoing_car', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Исходящая поставка
        {
            field: 'id_sap_outbound_supply',
            data: function (row, type, val, meta) {
                return row.id_sap_outbound_supply;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_sap_outbound_supply', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Примечание по ходу движения вагона
        {
            field: 'wir_note',
            data: function (row, type, val, meta) {
                return row.wir_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_wir_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'wir_create',
            data: function (row, type, val, meta) {
                return row.wir_create ? moment(row.wir_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_wir_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'wir_create_user',
            data: function (row, type, val, meta) {
                return row.wir_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_wir_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'wir_close',
            data: function (row, type, val, meta) {
                return row.wir_close ? moment(row.wir_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_wir_close', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'wir_close_user',
            data: function (row, type, val, meta) {
                return row.wir_close_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_wir_close_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // wir_parent_id
        // Операции отправки на станцию
        {
            field: 'from_id_operation',
            data: function (row, type, val, meta) {
                return row.from_id_operation;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_id_operation', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_operation_name',
            data: function (row, type, val, meta) {
                return row['from_operation_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_from_operation_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_operation_start',
            data: function (row, type, val, meta) {
                return row.from_operation_start ? moment(row.from_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_operation_start', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_end',
            data: function (row, type, val, meta) {
                return row.from_operation_end ? moment(row.from_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_operation_end', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Занят (операция)
        {
            field: 'from_busy',
            data: function (row, type, val, meta) {
                return row.current_wagon_busy ? langView('tcow_title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_busy', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Операции отправки на станцию(дополнительная информаци)
        {
            field: 'from_operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.from_operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_operation_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.from_operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_operation_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        // Примечание
        {
            field: 'from_operation_note',
            data: function (row, type, val, meta) {
                return row.from_operation_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_from_operation_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_operation_create',
            data: function (row, type, val, meta) {
                return row.from_operation_create ? moment(row.from_operation_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_operation_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_create_user',
            data: function (row, type, val, meta) {
                return row.from_operation_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_close',
            data: function (row, type, val, meta) {
                return row.from_operation_close ? moment(row.from_operation_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_operation_close', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_close_user',
            data: function (row, type, val, meta) {
                return row.from_operation_close_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_operation_close_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_parent_id',
            data: function (row, type, val, meta) {
                return row.from_operation_parent_id;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_operation_parent_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Разметка по операции отправки
        {
            field: 'from_operation_id_condition',
            data: function (row, type, val, meta) {
                return row.from_operation_id_condition;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_operation_id_condition', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_operation_condition_name',
            data: function (row, type, val, meta) {
                return row['from_operation_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_from_operation_condition_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_operation_condition_abbr',
            data: function (row, type, val, meta) {
                return row['from_operation_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_from_operation_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Состояние загрузки
        {
            field: 'from_operation_id_loading_status',
            data: function (row, type, val, meta) {
                return row.from_operation_id_loading_status;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_operation_id_loading_status', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_operation_loading_status',
            data: function (row, type, val, meta) {
                return row['from_operation_loading_status_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_from_operation_loading_status', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Станция отправки
        {
            field: 'from_id_station',
            data: function (row, type, val, meta) {
                return row.from_id_station;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_id_station', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_station_name',
            data: function (row, type, val, meta) {
                return row['from_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_from_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_station_abbr',
            data: function (row, type, val, meta) {
                return row['from_station_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tcow_field_from_station_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Путь отправки
        {
            field: 'from_id_way',
            data: function (row, type, val, meta) {
                return row.from_id_way;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_id_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_id_park',
            data: function (row, type, val, meta) {
                return row.from_id_park;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_id_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_way_name',
            data: function (row, type, val, meta) {
                return row['from_way_num_' + App.Lang] + '-' + row['from_way_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_from_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_way_abbr',
            data: function (row, type, val, meta) {
                return row['from_way_num_' + App.Lang] + '-' + row['from_way_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_from_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_capacity',
            data: function (row, type, val, meta) {
                return row.from_way_capacity;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_way_capacity', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_way_close',
            data: function (row, type, val, meta) {
                return row.from_way_close ? moment(row.from_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_delete',
            data: function (row, type, val, meta) {
                return row.from_way_delete ? moment(row.from_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_note',
            data: function (row, type, val, meta) {
                return row.from_way_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_from_way_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_way_start',
            data: function (row, type, val, meta) {
                return row.from_way_start ? moment(row.from_way_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_way_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_end',
            data: function (row, type, val, meta) {
                return row.from_way_end ? moment(row.from_way_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_way_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Внешний путь\состав\позиция
        {
            field: 'id_outer_way',
            data: function (row, type, val, meta) {
                return row.id_outer_way;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_id_outer_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'name_outer_way',
            data: function (row, type, val, meta) {
                return row['name_outer_way_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-200',
            title: langView('tcow_field_name_outer_way', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_close',
            data: function (row, type, val, meta) {
                return row.outer_way_close ? moment(row.outer_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_outer_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_delete',
            data: function (row, type, val, meta) {
                return row.outer_way_delete ? moment(row.outer_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_outer_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_note',
            data: function (row, type, val, meta) {
                return row.outer_way_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_outer_way_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_start',
            data: function (row, type, val, meta) {
                return row.outer_way_start ? moment(row.outer_way_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_outer_way_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_end',
            data: function (row, type, val, meta) {
                return row.outer_way_end ? moment(row.outer_way_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_outer_way_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_wim_note',
            data: function (row, type, val, meta) {
                return row.from_wim_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_from_wim_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_wim_create',
            data: function (row, type, val, meta) {
                return row.from_wim_create ? moment(row.from_wim_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_wim_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_wim_create_user',
            data: function (row, type, val, meta) {
                return row.from_wim_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_wim_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_wim_close',
            data: function (row, type, val, meta) {
                return row.from_wim_close ? moment(row.from_wim_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_wim_close', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_wim_close_user',
            data: function (row, type, val, meta) {
                return row.from_wim_close_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_from_wim_close_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_wim_parent_id',
            data: function (row, type, val, meta) {
                return row.from_wim_parent_id;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_from_wim_parent_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Станция прибытия
        {
            field: 'on_id_station',
            data: function (row, type, val, meta) {
                return row.on_id_station;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_id_station', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_station_name',
            data: function (row, type, val, meta) {
                return row['on_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_on_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_station_abbr',
            data: function (row, type, val, meta) {
                return row['on_station_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tcow_field_on_station_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Путь прибытия
        {
            field: 'on_id_way',
            data: function (row, type, val, meta) {
                return row.on_id_way;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_id_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_id_park',
            data: function (row, type, val, meta) {
                return row.on_id_park;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_id_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_way_name',
            data: function (row, type, val, meta) {
                return row['on_way_num_' + App.Lang] ? row['on_way_num_' + App.Lang] + '-' + row['on_way_name_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_on_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_way_abbr',
            data: function (row, type, val, meta) {
                return row['on_way_num_' + App.Lang] ? row['on_way_num_' + App.Lang] + '-' + row['on_way_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_on_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_capacity',
            data: function (row, type, val, meta) {
                return row.on_way_capacity;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_way_capacity', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_way_close',
            data: function (row, type, val, meta) {
                return row.on_way_close ? moment(row.on_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_delete',
            data: function (row, type, val, meta) {
                return row.on_way_delete ? moment(row.on_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_note',
            data: function (row, type, val, meta) {
                return row.on_way_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_on_way_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_way_start',
            data: function (row, type, val, meta) {
                return row.on_way_start ? moment(row.on_way_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_way_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_end',
            data: function (row, type, val, meta) {
                return row.on_way_end ? moment(row.on_way_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_way_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_position',
            data: function (row, type, val, meta) {
                return row.on_way_position;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_way_position', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_wim_note',
            data: function (row, type, val, meta) {
                return row.on_wim_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_on_wim_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_wim_create',
            data: function (row, type, val, meta) {
                return row.on_wim_create ? moment(row.on_wim_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_wim_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_wim_create_user',
            data: function (row, type, val, meta) {
                return row.on_wim_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_wim_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_wim_close',
            data: function (row, type, val, meta) {
                return row.on_wim_close ? moment(row.on_wim_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_wim_close', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_wim_close_user',
            data: function (row, type, val, meta) {
                return row.on_wim_close_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_wim_close_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_wim_parent_id',
            data: function (row, type, val, meta) {
                return row.on_wim_parent_id;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_wim_parent_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Операции принять на станцию
        {
            field: 'on_id_operation',
            data: function (row, type, val, meta) {
                return row.on_id_operation;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_id_operation', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_operation_name',
            data: function (row, type, val, meta) {
                return row['on_operation_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_on_operation_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_operation_start',
            data: function (row, type, val, meta) {
                return row.on_operation_start ? moment(row.on_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_operation_start', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_end',
            data: function (row, type, val, meta) {
                return row.on_operation_end ? moment(row.on_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_operation_end', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Занят (операция)
        {
            field: 'on_busy',
            data: function (row, type, val, meta) {
                return row.on_busy ? langView('tcow_title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_busy', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Операция принял на станцию(дополнительная информаци)
        {
            field: 'on_operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.on_operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_operation_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.on_operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_operation_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        // Примечание
        {
            field: 'on_operation_note',
            data: function (row, type, val, meta) {
                return row.on_operation_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('tcow_field_on_operation_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_operation_create',
            data: function (row, type, val, meta) {
                return row.on_operation_create ? moment(row.on_operation_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_operation_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_create_user',
            data: function (row, type, val, meta) {
                return row.on_operation_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_close',
            data: function (row, type, val, meta) {
                return row.on_operation_close ? moment(row.on_operation_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_operation_close', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_close_user',
            data: function (row, type, val, meta) {
                return row.on_operation_close_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tcow_field_on_operation_close_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_parent_id',
            data: function (row, type, val, meta) {
                return row.on_operation_parent_id;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_operation_parent_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Разметка по прибытию на станцию
        {
            field: 'on_operation_id_condition',
            data: function (row, type, val, meta) {
                return row.on_operation_id_condition;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_operation_id_condition', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_operation_condition_name',
            data: function (row, type, val, meta) {
                return row['on_operation_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_on_operation_condition_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_operation_condition_abbr',
            data: function (row, type, val, meta) {
                return row['on_operation_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tcow_field_on_operation_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Состояние загрузки  прием на станцию
        {
            field: 'on_operation_id_loading_status',
            data: function (row, type, val, meta) {
                return row.on_operation_id_loading_status;
            },
            className: 'dt-body-center',
            title: langView('tcow_field_on_operation_id_loading_status', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_operation_loading_status',
            data: function (row, type, val, meta) {
                return row['on_operation_loading_status_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tcow_field_on_operation_loading_status', App.Langs), width: "150px", orderable: true, searchable: true
        },

    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tcow_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tcow_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tcow_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: 'Вагоны на пути',
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
            text: langView('tcow_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tcow_title_button_tcow_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tcow_title_button_tcow_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tcow_title_button_tcow_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'select_all',
            text: langView('tcow_title_button_select_all', App.Langs),

        },
        {
            button: 'select_none',
            extend: 'selectNone',
            text: langView('tcow_title_button_select_none', App.Langs),
        },
        {
            button: 'add_wagons_send',
            text: langView('tcow_title_button_add_way_sending', App.Langs),
            enabled: false
        },

        {
            button: 'page_length',
            extend: 'pageLength',
        }
    ];
    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function table_cars_outer_way(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$cars_way = $(selector);
        if (this.$cars_way.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$cars_way.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_cars_outer_way.prototype.init_columns_detali = function () {
        var collums = [];
        // Внутренне перемещение
        collums.push('from_id_wim');
        collums.push('id_wir');
        collums.push('from_id_wio');
        collums.push('on_id_wim');
        collums.push('on_id_wio');
        // Основные параметры
        collums.push('outer_way_num_sostav');
        collums.push('num');
        collums.push('outer_way_position');
        // Номер накладной
        collums.push('arrival_nom_main_doc');
        collums.push('arrival_nom_doc');
        // Администрация
        collums.push('wagon_adm');
        collums.push('wagon_adm_name');
        collums.push('wagon_adm_abbr');
        // Род вагона
        collums.push('wagon_rod');
        collums.push('wagon_rod_name');
        collums.push('wagon_rod_abbr');
        // Оператор
        collums.push('id_operator');
        collums.push('operators');
        collums.push('operator_abbr');
        collums.push('operator_rent_start');
        collums.push('operator_rent_end');
        collums.push('operator_paid');
        //collums.push('operator_color');
        //collums.push('operator_monitoring_idle_time');
        // Ограничение
        collums.push('id_limiting_loading');
        collums.push('limiting_name');
        collums.push('limiting_abbr');
        // Разметка по прибытию
        collums.push('arrival_condition_name');
        collums.push('arrival_condition_abbr');
        collums.push('arrival_condition_red');
        // груз по прибытию
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        // Сертификационные данные
        collums.push('arrival_id_sertification_data');
        collums.push('arrival_sertification_data');
        // Цех получатель
        collums.push('arrival_division_amkr_code');
        collums.push('arrival_division_amkr_name');
        collums.push('arrival_division_amkr_abbr');
        // Внутренее пермещение
        collums.push('id_arrival_car');
        collums.push('id_sap_incoming_supply');
        collums.push('doc_outgoing_car');
        collums.push('id_outgoing_car');
        collums.push('id_sap_outbound_supply');
        collums.push('wir_note');
        collums.push('wir_create');
        collums.push('wir_create_user');
        collums.push('wir_close');
        collums.push('wir_close_user');
        // Операции отправки на станцию
        collums.push('from_id_operation');
        collums.push('from_operation_name');
        collums.push('from_operation_start');
        collums.push('from_operation_end');
        // Операции отправки на станцию (дополнительная информаци)
        collums.push('from_busy');
        collums.push('from_operation_locomotive1');
        collums.push('from_operation_locomotive2');
        collums.push('from_operation_note');
        collums.push('from_operation_create');
        collums.push('from_operation_create_user');
        collums.push('from_operation_close');
        collums.push('from_operation_close_user');
        collums.push('from_operation_parent_id');
        // Разметка по операции отправки
        collums.push('from_operation_id_condition');
        collums.push('from_operation_condition_name');
        collums.push('from_operation_condition_abbr');
        // Состояние загрузки
        collums.push('from_operation_id_loading_status');
        collums.push('from_operation_loading_status');
        // Станция отправления
        collums.push('from_id_station');
        collums.push('from_station_name');
        collums.push('from_station_abbr');
        // Путь отправления
        collums.push('from_id_way');
        collums.push('from_id_park');
        collums.push('from_way_name');
        collums.push('from_way_abbr');
        collums.push('from_way_capacity');
        collums.push('from_way_close');
        collums.push('from_way_delete');
        collums.push('from_way_note');
        collums.push('from_way_start');
        collums.push('from_way_end');
        // Внешний путь\состав\позиция
        collums.push('id_outer_way');
        collums.push('name_outer_way');
        collums.push('outer_way_close');
        collums.push('outer_way_delete');
        collums.push('outer_way_note');
        collums.push('outer_way_start');
        collums.push('outer_way_end');
        collums.push('from_wim_note');
        collums.push('from_wim_create');
        collums.push('from_wim_create_user');
        collums.push('from_wim_close');
        collums.push('from_wim_close_user');
        collums.push('from_wim_parent_id');
        // Станция прибытия
        collums.push('on_id_station');
        collums.push('on_station_name');
        collums.push('on_station_abbr');
        // Путь прибытия
        collums.push('on_id_way');
        collums.push('on_id_park');
        collums.push('on_way_name');
        collums.push('on_way_abbr');
        collums.push('on_way_capacity');
        collums.push('on_way_close');
        collums.push('on_way_delete');
        collums.push('on_way_note');
        collums.push('on_way_start');
        collums.push('on_way_end');
        collums.push('on_way_position');
        collums.push('on_wim_note');
        collums.push('on_wim_create');
        collums.push('on_wim_create_user');
        collums.push('on_wim_close');
        collums.push('on_wim_close_user');
        collums.push('on_wim_parent_id');
        // Операция принять на станцию
        collums.push('on_id_operation');
        collums.push('on_operation_name');
        collums.push('on_operation_start');
        collums.push('on_operation_end');
        collums.push('on_busy');
        // Операция принять на станцию (дополнительная информаци)
        collums.push('on_operation_locomotive1');
        collums.push('on_operation_locomotive2');
        collums.push('on_operation_note');
        collums.push('on_operation_create');
        collums.push('on_operation_create_user');
        collums.push('on_operation_close');
        collums.push('on_operation_close_user');
        collums.push('on_operation_parent_id');
        // Разметка по операции отправки
        collums.push('on_operation_id_condition');
        collums.push('on_operation_condition_name');
        collums.push('on_operation_condition_abbr');
        // Состояние загрузки
        collums.push('on_operation_id_loading_status');
        collums.push('on_operation_loading_status');

        return init_columns(collums, list_collums);
    };
    // инициализация полей отчета ow_arr_sosta
    table_cars_outer_way.prototype.init_columns_arrival_wagons_outer_way = function () {
        var collums = [];
        // Внутренне перемещение
        collums.push('outer_way_position');
        collums.push('num');
        // Номер накладной
        collums.push('arrival_nom_main_doc');
        collums.push('arrival_nom_doc');
        // Род вагона
        collums.push('wagon_rod_abbr')
        // Администрация
        collums.push('wagon_adm_abbr');
        // Разметка по прибытию на АМКР
        collums.push('arrival_condition_abbr');
        // Разметка по операции отправки (текущая)
        collums.push('from_operation_condition_abbr');
        // Оператор
        collums.push('operator_abbr');
        // Ограничение
        collums.push('limiting_abbr');
        // груз по прибытию
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        // Сертификационные данные
        collums.push('arrival_sertification_data');
        // Состояние загрузки по отправке (текущее)
        collums.push('from_operation_loading_status');
        // Цех получатель
        collums.push('arrival_division_amkr_abbr');
        // Внешний путь\состав\позиция
        collums.push('outer_way_start');
        collums.push('outer_way_end');
        collums.push('from_wim_close');
        collums.push('from_wim_close_user');
        // Станция прибытия
        collums.push('on_station_abbr');
        // Путь прибытия
        collums.push('on_way_abbr');
        // Операция принять на станцию
        collums.push('on_operation_end');
        return init_columns(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_cars_outer_way.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'select_all',
            action: function () {
                this.obj_t_cars.rows().select();
            }.bind(this)
        });
        buttons.push({ name: 'select_none', action: null });
        if (this.settings.buttons && this.settings.buttons.length > 0) {
            $.each(this.settings.buttons, function (i, el_button) {
                buttons.push(el_button);
            }.bind(this));
        };
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок отчет arrival_wagons_outer_way
    table_cars_outer_way.prototype.init_button_arrival_wagons_outer_way = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'select_all',
            action: function () {
                this.obj_t_cars.rows().select();
            }.bind(this)
        });
        buttons.push({ name: 'select_none', action: null });
        if (this.settings.buttons && this.settings.buttons.length > 0) {
            $.each(this.settings.buttons, function (i, el_button) {
                buttons.push(el_button);
            }.bind(this));
        };
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_cars_outer_way.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            // Таблица вагоны прибывающего состава
            case 'arrival-wagons-outer-way': {
                this.type_select_rows = 2; // Выбирать несколько
                this.table_select = {
                    style: 'multi'
                };
                this.fixedHeader = true; // вкл. фикс. заголовка
                this.fixedColumns = { leftColumns: 2, };
                this.table_columns = this.init_columns_arrival_wagons_outer_way();
                this.table_buttons = this.init_button_arrival_wagons_outer_way();
                break;
            };
            // Таблица вагоны на пути по умолчанию (если не выставят тип отчета)
            default: {
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.fixedHeader = false; // вкл. фикс. заголовка
                this.fixedColumns = null;
                this.table_columns = this.init_columns_detali();
                this.table_buttons = this.init_button_detali();
                break;
            };
        }
    };
    // Инициализация
    table_cars_outer_way.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_change_data: null, // Функция обратного вызова если изменили данные отображения (load... button:action...)
        }, options);
        //
        this.num_sostav = null;         // Номер состава
        this.wagons = [];               // Список вагонов сотава

        this.id_station_on = null;      // Станция на которую прибывает состав

        this.select_row_wagons = null;  // для одинарного выбора (выбранный вагон)
        this.select_rows_wagons = null;  // для многочисленного выбора (Отчеты от 1.... выбранные вагоны)

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        LockScreen(langView('tcow_mess_init_module', App.Langs));
        // Включу когда понадобится 
        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();
        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_cars = new this.fc_ui.el_table('tab-ow-cars-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_cars = table_cars.$element;
        this.$cars_way.addClass('table-report-operation').append(this.$table_cars);
        // Инициализируем таблицу
        this.obj_t_cars = this.$table_cars.DataTable({
            "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('title_all', App.Langs)]],
            "pageLength": 10,
            "deferRender": true,
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            colReorder: true,               // вкл. перетаскивание полей
            fixedHeader: this.fixedHeader,             // вкл. фикс. заголовка
            fixedColumns: this.fixedColumns,
            select: this.table_select,
            "autoWidth": false,
            //"filter": true,
            //"scrollY": "600px",
            sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            "createdRow": function (row, data, index) {
                $(row).attr('id', data.from_id_wim); // id строки дислокации вагона в момент отправки
                switch (this.settings.type_report) {
                    case 'arrival-wagons-outer-way': {

                        break;
                    };
                };
            }.bind(this),
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'arrival-wagons-outer-way': {
                this.obj_t_cars.on('user-select', function (e, dt, type, cell, originalEvent) {
                    this.out_clear();
                    var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                    var row = this.obj_t_cars.rows(indexes).data().toArray();
                    //if (row && row.length > 0 && row[0].outgoing_sostav_status && row[0].outgoing_sostav_status > 0) {
                    //    e.preventDefault();
                    //    this.out_warning('Вагон № ' + row[0].num + ' для операций заблокирован (вагон пренадлежит составу который имеет статус - ' + row[0].outgoing_sostav_status + ')');
                    //}
                }.bind(this)).on('select deselect', function (e, dt, type, indexes) {
                    var index = this.obj_t_cars.rows({ selected: true });
                    var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
                    this.select_rows_wagons = rows;
                    this.enable_button(); // отображение кнопки
                }.bind(this));
                break;
            };
        };
        if (this.settings.link_num) {
            //this.$table_cars.on('click', 'a.num-wagon', function (e) {
            //    e.preventDefault();
            //    e.stopPropagation();
            //    var num = $(e.currentTarget).attr('id')
            //    window.open(url_search_wagon + '?num=' + num, '', '');
            //}.bind(this));
        }
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok(this.result_init);
        }
        //----------------------------------
    };
    // Отображение кнопки добавить
    table_cars_outer_way.prototype.enable_button = function () {
        var index = this.obj_t_cars.rows({ selected: true });
        // Кнопка добавить в состав отчет отправка состава
        if (this.settings.type_report === 1 || this.settings.type_report === 2) {
            this.obj_t_cars.button(4).enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
        }
    };
    //-------------------------------------------------------------------------------------------
    // Показать данные 
    table_cars_outer_way.prototype.view = function (data) {
        this.out_clear();
        LockScreen(langView('tcow_mess_view_sostav', App.Langs));
        this.obj_t_cars.clear();
        this.obj_t_cars.rows.add(data);
        //this.obj_t_cars.order([0, 'asc']);
        this.obj_t_cars.draw();
        this.enable_button(); // отображение кнопки
        LockScreenOff();
    };
    // Загрузить все вагоны которые были отправленны
    table_cars_outer_way.prototype.load_ow_arr_wagons = function () {
        LockScreen(langView('tcow_mess_load_wagons', App.Langs));
        this.ids_wsd.getViewWagonsOfOuterWay(function (wagons) {
            this.wagons = wagons;
            this.view(this.wagons);
            LockScreenOff();
        }.bind(this));
    };
    // Загрузить составы по прибывающие на станцию 
    table_cars_outer_way.prototype.load_ow_arr_wagons_of_sostav = function (num_sostav) {
        if (num_sostav !== null && num_sostav !== '') {
            LockScreen(langView('tcow_mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfSostavOuterWay(num_sostav, function (wagons) {
                this.num_sostav = num_sostav;
                this.wagons = wagons;
                this.view(this.wagons);
                LockScreenOff();
            }.bind(this));
        } else {
            this.wagons = [];
            this.num_sostav = null;
            this.view(this.wagons);           //
        }
    };
    // Активировать кнопки формы
    table_cars_outer_way.prototype.enable_button = function () {
        var index = this.obj_t_cars.rows({ selected: true });

        switch (this.settings.type_report) {
            case 'arrival-wagons-outer-way': {
                // активность кнопки добавить вагон состава
                this.obj_t_cars.button(4).enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
                break;
            }
        };
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_cars_outer_way.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_cars_outer_way.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_cars_outer_way.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_cars_outer_way.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_cars_outer_way.prototype.destroy = function () {
        // Вклучу когда понадобится 
        //this.modal_confirm_form.destroy();
        if (this.obj_t_cars) {
            this.obj_t_cars.destroy(true);
            this.obj_t_cars = null;
        }

        this.$table_cars.empty(); // empty in case the columns change
    }

    App.table_cars_outer_way = table_cars_outer_way;

    window.App = App;
})(window);