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
            'field_wir_id': 'id в.п.',
            'field_wim_id': 'id дис.',
            'field_wio_id': 'id опер.',
            'field_position': '№ поз.',
            'field_num': '№ вагона',
            'field_id_operator': 'id опер.',
            'field_operators': 'Оператор',
            'field_operator_abbr': 'Оператор (аббр.)',
            'field_operator_rent_start': 'Нач. аренды',
            'field_operator_rent_end': 'Кон. аренды',
            'field_operator_paid': 'Приз. платн.',
            'field_id_limiting_loading': 'id огран.',
            'field_limiting_name': 'Ограничение',
            'field_limiting_abbr': 'Огран. (аббр.)',
            'field_id_owner_wagon': 'id собст.',
            'field_owner_wagon': 'Собственник по УЗ',
            'field_owner_wagon_abbr': 'Собст. УЗ (аббр.)',
            'field_wagon_rod': 'Род ваг.',
            'field_wagon_rod_name': 'Род ваг.',
            'field_wagon_rod_abbr': 'Род ваг.(аббр.)',
            'field_wagon_type': 'Тип вагона',
            'field_arrival_condition_name': 'Разметка (приб.)',
            'field_arrival_condition_abbr': 'Разм.',
            'field_arrival_condition_red': 'red',
            'field_current_condition_name': 'Разметка (тек.)',
            'field_current_condition_abbr': 'Разм. тек.',
            'field_current_condition_red': 'red',
            'field_wagon_date_rem_uz': 'Дата деповского ремонта по УЗ',
            'field_wagon_gruzp_doc': 'Груз-ть, тн (док.)',
            'field_wagon_gruzp_uz': 'Груз-ть, тн (УЗ.)',
            'field_wagon_adm': 'Код адм.',
            'field_wagon_adm_name': 'Администрация',
            'field_wagon_adm_abbr': 'Админ.',
            'field_arrival_cargo_group_name': 'Группа груза по прибытию',
            'field_arrival_cargo_name': 'Груз по прибытию ',
            'field_arrival_id_sertification_data': 'id сер. дан.',
            'field_arrival_sertification_data': 'Сертиф. данные',
            'field_arrival_id_commercial_condition': 'id ком. сост.',
            'field_arrival_commercial_condition': 'Комм. сост.',
            'field_arrival_station_from_code': 'Код. ст. отпр.',
            'field_arrival_station_from_name': 'Стан. отправ.',
            'field_arrival_shipper_code': 'Код отпр.',
            'field_arrival_shipper_name': 'Отправитель',
            'field_arrival_station_amkr_name': 'Стан. назн. АМКР',
            'field_arrival_station_amkr_abbr': 'Стан. назн. АМКР',
            'field_arrival_division_amkr_name': 'Цех получ.',
            'field_arrival_division_amkr_abbr': 'Цех получ.',
            'field_current_id_loading_status': 'id сост. погр.',
            'field_current_loading_status': 'Груж/порож.',
            'field_current_wagon_busy': 'Занят (операция)',
            'field_current_id_operation': 'id опер',
            'field_current_operation_name': 'Последняя операция над вагоном',
            'field_current_operation_start': 'Дата начала выполнения операции',
            'field_current_operation_end': 'Дата окончания выполнения операции',

            'field_arrival_duration': 'Простой  УЗ, час',
            'field_arrival_idle_time': 'Норма, час',
            'field_arrival_usage_fee': 'Плата на текущий момент, грн',
            'field_current_station_duration': 'Факт ст., ч',
            'field_current_way_duration': 'Факт путь, ч',
            'field_current_station_idle_time': 'Норма ст., ч',
            'field_current_station_indicator': 'Инд.',
            'field_sap_incoming_supply_num': 'Вх. пост. №',
            'field_sap_incoming_supply_pos': ' поз. ',
            'field_sap_incoming_supply_date': 'Вх. пост. дата созд.',
            'field_sap_incoming_supply_time': 'Вх. пост. время созд.',
            'field_sap_incoming_supply_cargo_code': 'Вх. пост. Код мат.',
            'field_sap_incoming_supply_cargo_name': 'Вх. пост. материал (груз)',
            'field_sap_incoming_supply_warehouse_code': 'Вх. пост. склад',
            'field_sap_incoming_supply_warehouse_name': 'Вх. пост. Наименование склада',
            'field_instructional_letters_num': '№ письма',
            'field_instructional_letters_datetime': 'Дата письма',
            'field_instructional_letters_station_code': 'Код ст. наз.',
            'field_instructional_letters_station_name': 'Станция назначения',
            'field_instructional_letters_note': 'Текст',
            'field_wagon_brutto_doc': 'Брутто по ЭПД, тн',
            'field_wagon_brutto_amkr': 'Брутто АМКР, тн',
            'field_wagon_tara_doc': 'Тара по ЭПД, тн.',
            'field_wagon_tara_arc_doc': 'Тара по ЭПД уточ., тн.',
            'field_wagon_tara_uz': 'Тара по УЗ, тн.',
            'field_wagon_vesg_doc': 'Нетто по ЭПД, тн',
            'field_wagon_vesg_amkr': 'Нетто АМКР, тн',
            'field_diff_vesg': 'Разница нетто, тн.',
            'field_doc_outgoing_car': 'Наличие документа для сдачи на  УЗ',
            'field_arrival_nom_main_doc': '№ накладной по приб',
            'field_arrival_nom_doc': '№ досылки по приб',
            'field_arrival_composition_index': 'Индекс поезда',
            'field_arrival_date_adoption': 'Дата приема на АМКР',
            'field_outgoing_date': 'Дата сдачи на УЗ',
            'field_outgoing_id_return': 'id возврат',
            'field_outgoing_return_cause': 'Причина возврата по отправлению',
            'field_outgoing_sostav_status': 'Статус отпр. сост.',
            'field_wagon_ban_uz': 'Запреты по УЗ',
            'field_wagon_closed_route': 'Замкнутый маршрут (кольцо)',
            'field_wir_note': 'Примечание',

            'title_yes': 'Да',
            'title_busy': 'Занят',
            'title_all': 'Все',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_field': 'Поля',
            'title_button_field_select': 'Выбрать',
            'title_button_field_view_all': 'Показать все',
            'title_button_field_clear': 'Сбросить',

            'mess_init_module': 'Инициализация модуля…',
            'mess_load_wagons': 'Загружаю вагоны на пути…',
            'mess_view_wagons': 'загрузка информации о вагонах…',

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

    // Получить часы из менут
    var getHoursFromMinuts = function (minutes) {
        var hours = parseInt(minutes / 60);
        hours = hours < 10 ? '0' + hours : hours;
        var min = minutes % 60;
        min = min < 10 ? '0' + min : min;
        return hours + ':' + min;
    }

    // Перечень полей
    var list_collums = [
        {
            field: 'wir_id',
            data: function (row, type, val, meta) {
                return row.wir_id;
            },
            className: 'dt-body-center',
            title: langView('field_wir_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wim_id',
            data: function (row, type, val, meta) {
                return row.wim_id;
            },
            className: 'dt-body-center',
            title: langView('field_wim_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wio_id',
            data: function (row, type, val, meta) {
                return row.wio_id;
            },
            className: 'dt-body-center',
            title: langView('field_wio_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //=============== ОСНОВНОЕ ОКНО ==================
        {
            field: 'position',
            data: function (row, type, val, meta) {
                return row.position;
            },
            className: 'dt-body-center fixed-column',
            title: langView('field_position', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center fixed-column',
            title: langView('field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Оператор
        {
            field: 'id_operator',
            data: function (row, type, val, meta) {
                return row.id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('field_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'operators',
            data: function (row, type, val, meta) {
                return row['operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('field_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'operator_abbr',
            data: function (row, type, val, meta) {
                return row['operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('field_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operator_rent_start',
            data: function (row, type, val, meta) {
                return row.operator_rent_start ? moment(row.operator_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('field_operator_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operator_rent_end',
            data: function (row, type, val, meta) {
                return row.operator_rent_end ? moment(row.operator_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('field_operator_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'operator_paid',
            data: function (row, type, val, meta) {
                return row.operator_paid ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('field_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        //Ограничение
        {
            field: 'id_limiting_loading',
            data: function (row, type, val, meta) {
                return row.id_limiting_loading;
            },
            className: 'dt-body-center',
            title: langView('field_id_limiting_loading', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'limiting_name',
            data: function (row, type, val, meta) {
                return row['limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'limiting_abbr',
            data: function (row, type, val, meta) {
                return row['limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник по УЗ
        {
            field: 'id_owner_wagon',
            data: function (row, type, val, meta) {
                return row.id_owner_wagon;
            },
            className: 'dt-body-center',
            title: langView('field_id_owner_wagon', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'owner_wagon',
            data: function (row, type, val, meta) {
                return row['owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Род вагона
        {
            field: 'wagon_rod',
            data: function (row, type, val, meta) {
                return row.wagon_rod;
            },
            className: 'dt-body-center',
            title: langView('field_wagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_rod_name',
            data: function (row, type, val, meta) {
                return row['wagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_wagon_rod_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'wagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('field_wagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тип вагона
        {
            field: 'wagon_type',
            data: function (row, type, val, meta) {
                return row['wagon_type_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_wagon_type', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'arrival_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_arrival_condition_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_arrival_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_condition_red',
            data: function (row, type, val, meta) {
                return row.arrival_condition_red;
            },
            className: 'dt-body-centr',
            title: langView('field_arrival_condition_red', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Разметка по текущей операции 
        {
            field: 'current_condition_name',
            data: function (row, type, val, meta) {
                return row['current_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_current_condition_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'current_condition_abbr',
            data: function (row, type, val, meta) {
                return row['current_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_current_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_condition_red',
            data: function (row, type, val, meta) {
                return row.current_condition_red;
            },
            className: 'dt-body-centr',
            title: langView('field_current_condition_red', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Дата деповского ремонта по УЗ'
        {
            field: 'wagon_date_rem_uz',
            data: function (row, type, val, meta) {
                //return row.wagon_date_rem_uz ? getReplaceTOfDT(row.wagon_date_rem_uz) : null;
                return row.wagon_date_rem_uz ? moment(row.wagon_date_rem_uz).format(format_date) : null;
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_date_rem_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузоподъемность
        {
            field: 'wagon_gruzp_doc',
            data: function (row, type, val, meta) {
                return row.wagon_gruzp_doc ? Number(row.wagon_gruzp_doc).toFixed(1) : null;
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_gruzp_doc', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'wagon_gruzp_uz',
            data: function (row, type, val, meta) {
                return row.wagon_gruzp_uz ? Number(row.wagon_gruzp_uz).toFixed(1) : null;
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_gruzp_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Администрация
        {
            field: 'wagon_adm',
            data: function (row, type, val, meta) {
                return row.wagon_adm;
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'wagon_adm_name',
            data: function (row, type, val, meta) {
                return row['wagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_adm_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['wagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_adm_abbr', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Груз по прибытию
        {
            field: 'arrival_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['arrival_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_arrival_cargo_group_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_arrival_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Сертификационные данные
        {
            field: 'arrival_id_sertification_data',
            data: function (row, type, val, meta) {
                return row.arrival_id_sertification_data;
            },
            className: 'dt-body-center',
            title: langView('field_arrival_id_sertification_data', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_arrival_sertification_data', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Коммерческое состояние
        {
            field: 'arrival_id_commercial_condition',
            data: function (row, type, val, meta) {
                return row.arrival_id_commercial_condition;
            },
            className: 'dt-body-center',
            title: langView('field_arrival_id_commercial_condition', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_commercial_condition',
            data: function (row, type, val, meta) {
                return row['arrival_commercial_condition_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_arrival_commercial_condition', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Станция отправления
        {
            field: 'arrival_station_from_code',
            data: function (row, type, val, meta) {
                return row.arrival_station_from_code;
            },
            className: 'dt-body-center',
            title: langView('field_arrival_station_from_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_station_from_name',
            data: function (row, type, val, meta) {
                return row['arrival_station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_arrival_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Отправитель
        {
            field: 'arrival_shipper_code',
            data: function (row, type, val, meta) {
                return row.arrival_shipper_code;
            },
            className: 'dt-body-center',
            title: langView('field_arrival_shipper_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_shipper_name',
            data: function (row, type, val, meta) {
                return row['arrival_shipper_name_' + App.Lang];
            },
            className: 'dt-body-nowrap text-left',
            title: langView('field_arrival_shipper_name', App.Langs), width: "300px", orderable: true, searchable: true
        },
        // Станция назначения АМКР
        {
            field: 'arrival_station_amkr_name',
            data: function (row, type, val, meta) {
                return row['arrival_station_amkr_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_arrival_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_station_amkr_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_arrival_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Цех-получатель
        {
            field: 'arrival_division_amkr_name',
            data: function (row, type, val, meta) {
                return row['arrival_division_amkr_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_arrival_division_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_division_amkr_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_division_amkr_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_arrival_division_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Груж/пор
        {
            field: 'current_id_loading_status',
            data: function (row, type, val, meta) {
                return row.current_id_loading_status;
            },
            className: 'dt-body-center',
            title: langView('field_current_id_loading_status', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_loading_status',
            data: function (row, type, val, meta) {
                return row['current_loading_status_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_current_loading_status', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Занят (операция)
        {
            field: 'current_wagon_busy',
            data: function (row, type, val, meta) {
                return row.current_wagon_busy ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_current_wagon_busy', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Последняя операция над вагоном
        {
            field: 'current_id_operation',
            data: function (row, type, val, meta) {
                return row.current_id_operation;
            },
            className: 'dt-body-center',
            title: langView('field_current_id_operation', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_operation_name',
            data: function (row, type, val, meta) {
                return row['current_operation_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_current_operation_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дата начала выполнения операции
        {
            field: 'current_operation_start',
            data: function (row, type, val, meta) {
                return row.current_operation_start ? moment(row.current_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_current_operation_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дата окончания выполнения операции
        {
            field: 'current_operation_end',
            data: function (row, type, val, meta) {
                return row.current_operation_end ? moment(row.current_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_current_operation_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Простой  УЗ, час
        {
            field: 'arrival_duration',
            data: function (row, type, val, meta) {
                return row.arrival_duration !== null ? getHoursFromMinuts(Number(row.arrival_duration)) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_arrival_duration', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Норма, час
        {
            field: 'arrival_idle_time',
            data: function (row, type, val, meta) {
                return row.arrival_idle_time !== null ? Number(row.arrival_idle_time / 60) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_arrival_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Плата на текущий момент, грн
        {
            field: 'arrival_usage_fee',
            data: function (row, type, val, meta) {
                return row.arrival_usage_fee !== null ? Number(row.arrival_usage_fee).toFixed(2) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_arrival_usage_fee', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //=============== ПРОСТОЙ НА Ж.Д.СТАНЦИИ ==================
        // индикатор
        {
            field: 'current_station_indicator',
            data: function (row, type, val, meta) {
                var fc_ui = new FC();
                var $pb = new fc_ui.el_progress_bar(null, (row.current_station_idle_time !== null ? Number(row.current_station_idle_time) : 0), (row.current_station_duration !== null ? Number(row.current_station_duration) : 0))
                if ($pb && $pb.$pb && $pb.$pb.length > 0) {
                    return $pb.$pb[0].outerHTML;
                }
            },
            className: 'dt-body-justify mw-100 idle-station',
            title: langView('field_current_station_indicator', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Норма, ч
        {
            field: 'current_station_idle_time',
            data: function (row, type, val, meta) {
                return row.current_station_idle_time !== null ? Number(row.current_station_idle_time) : null;
            },
            className: 'dt-body-nowrap idle-station',
            title: langView('field_current_station_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Факт станция, ч
        {
            field: 'current_station_duration',
            data: function (row, type, val, meta) {
                return row.current_station_duration !== null ? getHoursFromMinuts(Number(row.current_station_duration)) : null;
            },
            className: 'dt-body-nowrap idle-station',
            title: langView('field_current_station_duration', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // факт путь, ч
        {
            field: 'current_way_duration',
            data: function (row, type, val, meta) {
                return row.current_way_duration !== null ? getHoursFromMinuts(Number(row.current_way_duration)) : null;
            },
            className: 'dt-body-nowrap idle-station',
            title: langView('field_current_way_duration', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //=============== ИНСТРУКТИВНЫЕ ПИСЬМА ==================
        // № письма
        {
            field: 'instructional_letters_num',
            data: function (row, type, val, meta) {
                return row.instructional_letters_num;
            },
            className: 'dt-body-center ins-let',
            title: langView('field_instructional_letters_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Дата письма
        {
            field: 'instructional_letters_datetime',
            data: function (row, type, val, meta) {
                return row.instructional_letters_datetime ? moment(row.instructional_letters_datetime).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap ins-let',
            title: langView('field_instructional_letters_datetime', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Станция назначения
        {
            field: 'instructional_letters_station_code',
            data: function (row, type, val, meta) {
                return row.instructional_letters_station_code;
            },
            className: 'dt-body-center ins-let',
            title: langView('field_instructional_letters_station_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'instructional_letters_station_name',
            data: function (row, type, val, meta) {
                return row.instructional_letters_station_name;
            },
            className: 'dt-body-left shorten mw-100 ins-let',
            title: langView('field_instructional_letters_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Текст
        {
            field: 'instructional_letters_note',
            data: function (row, type, val, meta) {
                return row.instructional_letters_note;
            },
            className: 'dt-body-nowrap text-left ins-let',
            title: langView('field_instructional_letters_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        //=============== ВХОДЯЩАЯ ПОСТАВКА ==================
        {
            field: 'sap_incoming_supply_num',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_num;
            },
            className: 'dt-body-nowrap sap-inc-supp',
            title: langView('field_sap_incoming_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_incoming_supply_pos',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_pos;
            },
            className: 'dt-body-nowrap sap-inc-supp',
            title: langView('field_sap_incoming_supply_pos', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // дата создания
        {
            field: 'sap_incoming_supply_date',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_date ? moment(row.sap_incoming_supply_date).format(format_date) : null;
            },
            className: 'dt-body-nowrap sap-inc-supp',
            title: langView('field_sap_incoming_supply_date', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // время создания
        {
            field: 'sap_incoming_supply_time',
            data: function (row, type, val, meta) {
                //return row.sap_incoming_supply_time ? moment(row.sap_incoming_supply_time).format(format_time) : null;
                return row.sap_incoming_supply_time;
            },
            className: 'dt-body-nowrap sap-inc-supp',
            title: langView('field_sap_incoming_supply_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Материал
        {
            field: 'sap_incoming_supply_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_cargo_code;
            },
            className: 'dt-body-center sap-inc-supp',
            title: langView('field_sap_incoming_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_incoming_supply_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_cargo_name;
            },
            className: 'dt-body-left shorten mw-150 sap-inc-supp',
            title: langView('field_sap_incoming_supply_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Склад, Наименование склада
        {
            field: 'sap_incoming_supply_warehouse_code',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_warehouse_code;
            },
            className: 'dt-body-center sap-inc-supp',
            title: langView('field_sap_incoming_supply_warehouse_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_incoming_supply_warehouse_name',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_warehouse_name;
            },
            className: 'dt-body-left shorten mw-150 sap-inc-supp',
            title: langView('field_sap_incoming_supply_warehouse_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        //=============== ВХОДНОЕ ВЗВЕШИВАНИЕ С УЗ ==================
        // Брутто по ЭПД, тн
        {
            field: 'wagon_brutto_doc',
            data: function (row, type, val, meta) {
                return row.wagon_brutto_doc !== null ? (row.wagon_brutto_doc > 0 ? Number(row.wagon_brutto_doc / 1000).toFixed(2) : Number(row.wagon_brutto_doc).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_brutto_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Брутто по ЭПД, тн
        {
            field: 'wagon_brutto_amkr',
            data: function (row, type, val, meta) {
                return row.wagon_brutto_amkr !== null ? (row.wagon_brutto_amkr > 0 ? Number(row.wagon_brutto_amkr / 1000).toFixed(2) : Number(row.wagon_brutto_amkr).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_brutto_amkr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'wagon_tara_doc',
            data: function (row, type, val, meta) {
                return row.wagon_tara_doc !== null ? (row.wagon_tara_doc > 0 ? Number(row.wagon_tara_doc / 1000).toFixed(2) : Number(row.wagon_tara_doc).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_tara_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_tara_arc_doc',
            data: function (row, type, val, meta) {
                return row.wagon_tara_arc_doc !== null ? (row.wagon_tara_arc_doc > 0 ? Number(row.wagon_tara_arc_doc / 1000).toFixed(2) : Number(row.wagon_tara_arc_doc).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_tara_arc_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'wagon_tara_uz',
            data: function (row, type, val, meta) {
                return row.wagon_tara_uz !== null ? (row.wagon_tara_uz > 0 ? Number(row.wagon_tara_uz).toFixed(2) : 0.00) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_tara_uz', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Нетто по ЭПД, тн
        {
            field: 'wagon_vesg_doc',
            data: function (row, type, val, meta) {
                return row.wagon_vesg_doc !== null ? (row.wagon_vesg_doc > 0 ? Number(row.wagon_vesg_doc / 1000).toFixed(2) : Number(row.wagon_vesg_doc).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_vesg_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Нетто АМКР, тн
        {
            field: 'wagon_vesg_amkr',
            data: function (row, type, val, meta) {
                return row.wagon_vesg_amkr !== null ? (row.wagon_vesg_amkr > 0 ? Number(row.wagon_vesg_amkr / 1000).toFixed(2) : Number(row.wagon_vesg_amkr).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_wagon_vesg_amkr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Разница нетто, тн.
        {
            field: 'diff_vesg',
            data: function (row, type, val, meta) {
                return row.diff_vesg !== null ? (row.diff_vesg > 0 ? Number(row.diff_vesg / 1000).toFixed(2) : Number(row.diff_vesg).toFixed(2)) : null;
            },
            className: 'dt-body-right weighing',
            title: langView('field_diff_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //=============== ДОПОЛНИТЕЛЬНО ==================
        // Наличие документа для сдачи на  УЗ
        {
            field: 'doc_outgoing_car',
            data: function (row, type, val, meta) {
                return row.doc_outgoing_car ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('field_doc_outgoing_car', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // № накладной по приб
        {
            field: 'arrival_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_nom_main_doc ? row.arrival_nom_main_doc : row.arrival_nom_doc;
            },
            className: 'dt-body-centr',
            title: langView('field_arrival_nom_main_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // № досылки по приб
        {
            field: 'arrival_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_nom_main_doc ? row.arrival_nom_doc : '';
            },
            className: 'dt-body-centr',
            title: langView('field_arrival_nom_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Индекс поезда
        {
            field: 'arrival_composition_index',
            data: function (row, type, val, meta) {
                return row.arrival_composition_index;
            },
            className: 'dt-body-nowrap',
            title: langView('field_arrival_composition_index', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дата приема на АМКР
        {
            field: 'arrival_date_adoption',
            data: function (row, type, val, meta) {
                return row.arrival_date_adoption ? moment(row.arrival_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_arrival_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дата сдачи на УЗ
        {
            field: 'outgoing_date',
            data: function (row, type, val, meta) {
                return row.outgoing_date ? moment(row.outgoing_date).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_outgoing_date', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Причина возврата по отправлению
        {
            field: 'outgoing_id_return',
            data: function (row, type, val, meta) {
                return row.outgoing_id_return;
            },
            className: 'dt-body-center',
            title: langView('field_outgoing_id_return', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_return_cause',
            data: function (row, type, val, meta) {
                return row['outgoing_return_cause_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_outgoing_return_cause', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Статус отправляемого состава
        {
            field: 'outgoing_sostav_status',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_status;
            },
            className: 'dt-body-center',
            title: langView('field_outgoing_sostav_status', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Запреты по УЗ 
        {
            field: 'wagon_ban_uz',
            data: function (row, type, val, meta) {
                return row.wagon_ban_uz;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('field_wagon_ban_uz', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Замкнутый маршрут (кольцо)
        {
            field: 'wagon_closed_route',
            data: function (row, type, val, meta) {
                return row.wagon_closed_route ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('field_wagon_closed_route', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Примечание
        {
            field: 'wir_note',
            data: function (row, type, val, meta) {
                return row.wir_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('field_wir_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
    ];
    //
    function table_cars_way(selector) {
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
    // инициализация полей таблицы вагоны на начальном пути
    table_cars_way.prototype.init_columns_all = function () {
        var collums = [];

        //collums.push('wir_id');
        //collums.push('wim_id');
        //collums.push('wio_id');
        //=============== ОСНОВНОЕ ОКНО ==================
        collums.push('position');
        collums.push('num');
        // Оператор
        collums.push('id_operator');
        collums.push('operators');
        collums.push('operator_abbr');
        collums.push('operator_rent_start');
        collums.push('operator_rent_end');
        // Ограничение 
        collums.push('id_limiting_loading');
        collums.push('limiting_name');
        collums.push('limiting_abbr');
        // Собственник по УЗ
        collums.push('id_owner_wagon');
        collums.push('owner_wagon');
        collums.push('owner_wagon_abbr');
        // Признак платности
        collums.push('operator_paid');
        // Род вагона
        collums.push('wagon_rod');
        collums.push('wagon_rod_name');
        collums.push('wagon_rod_abbr');
        // Тип вагона
        collums.push('wagon_type');
        // Разметка прибытие
        collums.push('arrival_condition_name');
        collums.push('arrival_condition_abbr');
        collums.push('arrival_condition_red');
        // разметка текущая
        collums.push('current_condition_name');
        collums.push('current_condition_abbr');
        collums.push('current_condition_red');
        // Дата деповского ремонта по УЗ
        collums.push('wagon_date_rem_uz');
        // Грузоподъемность
        collums.push('wagon_gruzp_doc');
        collums.push('wagon_gruzp_uz');
        // Администрация
        collums.push('wagon_adm');
        collums.push('wagon_adm_name');
        collums.push('wagon_adm_abbr');
        // Груз по прибытию
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        // Сертификатные данные
        collums.push('arrival_id_sertification_data');
        collums.push('arrival_sertification_data');
        // Коммерческое состояние
        collums.push('arrival_id_commercial_condition');
        collums.push('arrival_commercial_condition');
        // Станция отправления
        collums.push('arrival_station_from_code');
        collums.push('arrival_station_from_name');
        //Отправитель
        collums.push('arrival_shipper_code');
        collums.push('arrival_shipper_name');
        // Станция назначения АМКР
        collums.push('arrival_station_amkr_name');
        collums.push('arrival_station_amkr_abbr');
        // Цех-получатель
        collums.push('arrival_division_amkr_name');
        collums.push('arrival_division_amkr_abbr');
        // Груж /порожний, состояние загрузки
        collums.push('current_id_loading_status');
        collums.push('current_loading_status');
        // Занят (операция)
        collums.push('current_wagon_busy');
        // Последняя операция над вагоном
        collums.push('current_id_operation');
        collums.push('current_operation_name');
        // Дата начала выполнения операции
        collums.push('current_operation_start');
        // Дата окончания выполнения операции
        collums.push('current_operation_end');
        // Простой УЗ
        collums.push('arrival_duration');
        // Норма, час
        collums.push('arrival_idle_time');
        // Плата на текущий момент, грн
        collums.push('arrival_usage_fee');
        //=============== ПРОСТОЙ НА Ж.Д.СТАНЦИИ ==================
        // Индикатор (Станция)
        collums.push('current_station_indicator');
        // Норма, ч (Станция)
        collums.push('current_station_idle_time');
        // Факт, ч (Станция)
        collums.push('current_station_duration');
        // Факт, ч (Путь)
        collums.push('current_way_duration');
        //=============== ИНСТРУКТИВНЫЕ ПИСЬМА ==================
        // Инструктивные письма
        collums.push('instructional_letters_num');          // №
        collums.push('instructional_letters_datetime');     // Дата и время
        collums.push('instructional_letters_station_code'); // Станция назначения
        collums.push('instructional_letters_station_name'); // 
        collums.push('instructional_letters_note');         // Текст письма
        //=============== ВХОДЯЩАЯ ПОСТАВКА ==================
        // Вх. поставка САП
        collums.push('sap_incoming_supply_num');            // Номер вх. поставки
        collums.push('sap_incoming_supply_pos');            // поз вх. поставки
        collums.push('sap_incoming_supply_date');           // дата создания вх. поставки
        collums.push('sap_incoming_supply_time');           // время создания вх. поставки
        collums.push('sap_incoming_supply_cargo_code');     // склад вх. поставки
        collums.push('sap_incoming_supply_cargo_name');     //
        collums.push('sap_incoming_supply_warehouse_code'); // материал вх. поставки
        collums.push('sap_incoming_supply_warehouse_name'); //
        //=============== ВХОДНОЕ ВЗВЕШИВАНИЕ С УЗ ==================
        // Брутто, тн
        collums.push('wagon_brutto_doc');                   // по ЭПД (нето ЭПД + тара ЭПД || тара ЭПД уточненная)
        collums.push('wagon_brutto_amkr');                  // по ЭПД 
        // Тара, тн
        collums.push('wagon_tara_doc');                     // по ЭПД 
        collums.push('wagon_tara_arc_doc');                 // по ЭПД уточненное
        collums.push('wagon_tara_uz');                      // по УЗ
        // Нетто, тн 
        collums.push('wagon_vesg_doc');                     // Вес груза ЭПД
        collums.push('wagon_vesg_amkr');                    // Вес груза АМКР
        // Разница нетто, тн.
        collums.push('diff_vesg');
        //=============== ДОПОЛНИТЕЛЬНО ==================
        //
        collums.push('doc_outgoing_car');                   // Наличие документа для сдачи
        collums.push('arrival_nom_main_doc');               // Номер основного документа(если заполнен)
        collums.push('arrival_nom_doc');                    // Номер документа(досылки)
        collums.push('arrival_composition_index');                    // Индекс поезда прибытие
        collums.push('arrival_date_adoption');                    // дата приема вагона
        collums.push('outgoing_date');                    // дата отправки вагона
        collums.push('outgoing_id_return');                    // Возврат
        collums.push('outgoing_return_cause');                    // Причина возврата
        collums.push('outgoing_sostav_status');                    // Статус отправленного вагона
        collums.push('wagon_ban_uz');                    // Запреты по УЗ
        collums.push('wagon_closed_route');                    //Замкнутый маршрут(кольцо)
        collums.push('wir_note');                    // Примечание Вагонник ГС
        return init_columns(collums, list_collums);
    };

    table_cars_way.prototype.init_columns_detali = function () {
        var collums = [];

           //=============== ОСНОВНОЕ ОКНО ==================
        collums.push('position');
        collums.push('num');
        // Оператор
/*        collums.push('id_operator');*/
/*        collums.push('operators');*/
        collums.push('operator_abbr');
        collums.push('operator_rent_start');
        collums.push('operator_rent_end');
        // Ограничение 
        //collums.push('id_limiting_loading');
        //collums.push('limiting_name');
        collums.push('limiting_abbr');
        // Собственник по УЗ
        //collums.push('id_owner_wagon');
        //collums.push('owner_wagon');
        collums.push('owner_wagon_abbr');
        // Признак платности
        collums.push('operator_paid');
        // Род вагона
        collums.push('wagon_rod');
/*        collums.push('wagon_rod_name');*/
        collums.push('wagon_rod_abbr');
        // Тип вагона
        collums.push('wagon_type');
        // Разметка прибытие
/*        collums.push('arrival_condition_name');*/
        collums.push('arrival_condition_abbr');
/*        collums.push('arrival_condition_red');*/
        // разметка текущая
/*        collums.push('current_condition_name');*/
        collums.push('current_condition_abbr');
/*        collums.push('current_condition_red');*/
        // Дата деповского ремонта по УЗ
        collums.push('wagon_date_rem_uz');
        // Грузоподъемность
        collums.push('wagon_gruzp_doc');
        collums.push('wagon_gruzp_uz');
        // Администрация
        collums.push('wagon_adm');
/*        collums.push('wagon_adm_name');*/
        collums.push('wagon_adm_abbr');
        // Груз по прибытию
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        // Сертификатные данные
/*        collums.push('arrival_id_sertification_data');*/
        collums.push('arrival_sertification_data');
        // Коммерческое состояние
/*        collums.push('arrival_id_commercial_condition');*/
        collums.push('arrival_commercial_condition');
        // Станция отправления
        collums.push('arrival_station_from_code');
        collums.push('arrival_station_from_name');
        //Отправитель
        collums.push('arrival_shipper_code');
        collums.push('arrival_shipper_name');
        // Станция назначения АМКР
        collums.push('arrival_station_amkr_name');
        collums.push('arrival_station_amkr_abbr');
        // Цех-получатель
/*        collums.push('arrival_division_amkr_name');*/
        collums.push('arrival_division_amkr_abbr');
        // Груж /порожний, состояние загрузки
/*        collums.push('current_id_loading_status');*/
        collums.push('current_loading_status');
        // Занят (операция)
        collums.push('current_wagon_busy');
        // Последняя операция над вагоном
/*        collums.push('current_id_operation');*/
        collums.push('current_operation_name');
        // Дата начала выполнения операции
        collums.push('current_operation_start');
        // Дата окончания выполнения операции
        collums.push('current_operation_end');
        // Простой УЗ
        collums.push('arrival_duration');
        // Норма, час
        collums.push('arrival_idle_time');
        // Плата на текущий момент, грн
        collums.push('arrival_usage_fee');
        //=============== ПРОСТОЙ НА Ж.Д.СТАНЦИИ ==================
        // Индикатор (Станция)
        collums.push('current_station_indicator');
        // Норма, ч (Станция)
        collums.push('current_station_idle_time');
        // Факт, ч (Станция)
        collums.push('current_station_duration');
        // Факт, ч (Путь)
        collums.push('current_way_duration');
        //=============== ИНСТРУКТИВНЫЕ ПИСЬМА ==================
        // Инструктивные письма
        collums.push('instructional_letters_num');          // №
        collums.push('instructional_letters_datetime');     // Дата и время
        collums.push('instructional_letters_station_code'); // Станция назначения
        collums.push('instructional_letters_station_name'); // 
        collums.push('instructional_letters_note');         // Текст письма
        //=============== ВХОДЯЩАЯ ПОСТАВКА ==================
        // Вх. поставка САП
        collums.push('sap_incoming_supply_num');            // Номер вх. поставки
        collums.push('sap_incoming_supply_pos');            // поз вх. поставки
        collums.push('sap_incoming_supply_date');           // дата создания вх. поставки
        collums.push('sap_incoming_supply_time');           // время создания вх. поставки
        collums.push('sap_incoming_supply_cargo_code');     // склад вх. поставки
        collums.push('sap_incoming_supply_cargo_name');     //
        collums.push('sap_incoming_supply_warehouse_code'); // материал вх. поставки
        collums.push('sap_incoming_supply_warehouse_name'); //
        //=============== ВХОДНОЕ ВЗВЕШИВАНИЕ С УЗ ==================
        // Брутто, тн
        collums.push('wagon_brutto_doc');                   // по ЭПД (нето ЭПД + тара ЭПД || тара ЭПД уточненная)
        collums.push('wagon_brutto_amkr');                  // по ЭПД 
        // Тара, тн
        collums.push('wagon_tara_doc');                     // по ЭПД 
        collums.push('wagon_tara_arc_doc');                 // по ЭПД уточненное
        collums.push('wagon_tara_uz');                      // по УЗ
        // Нетто, тн 
        collums.push('wagon_vesg_doc');                     // Вес груза ЭПД
        collums.push('wagon_vesg_amkr');                    // Вес груза АМКР
        // Разница нетто, тн.
        collums.push('diff_vesg');
        //=============== ДОПОЛНИТЕЛЬНО ==================
        //
        collums.push('doc_outgoing_car');                   // Наличие документа для сдачи
        collums.push('arrival_nom_main_doc');               // Номер основного документа(если заполнен)
        collums.push('arrival_nom_doc');                    // Номер документа(досылки)
        collums.push('arrival_composition_index');                    // Индекс поезда прибытие
        collums.push('arrival_date_adoption');                    // дата приема вагона
        collums.push('outgoing_date');                    // дата отправки вагона
/*        collums.push('outgoing_id_return');                    // Возврат*/
        collums.push('outgoing_return_cause');                    // Причина возврата
        collums.push('outgoing_sostav_status');                    // Статус отправленного вагона
        collums.push('wagon_ban_uz');                    // Запреты по УЗ
        collums.push('wagon_closed_route');                    //Замкнутый маршрут(кольцо)
        collums.push('wir_note');                    // Примечание Вагонник ГС
        return init_columns(collums, list_collums);
    };
    // Инициализация тип отчета
    table_cars_way.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 1: {
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi'
                };
                break;
            };
            default: {

                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_detali();
                break;
            };
        }
    };
    // инициализация таблицы справочника путей
    table_cars_way.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: 0, // 0 - вагоны детально
            ids_wsd: null,
        }, options);
        //
        this.select_row_wagons = null;

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];

        this.init_type_report();

        LockScreen(langView('mess_init_module', App.Langs));
        // Вклучу когда понадобится 
        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();

        // Загрузим справочные данные, определим поля формы правки
        /*        this.load_db([], false, function (result) {*/

        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_cars = new this.fc_ui.el_table('tab-cars-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_cars = table_cars.$element;
        this.$cars_way.addClass('table-report-operation').append(this.$table_cars);
        // Инициализируем таблицу
        this.obj_t_cars = this.$table_cars.DataTable({
            "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('title_all', App.Langs)]],
            "pageLength": 100,
            "deferRender": true,
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            colReorder: true,               // вкл. перетаскивание полей
            fixedHeader: false,             // вкл. фикс. заголовка
            fixedColumns: {
                leftColumns: 2,
            },
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
                $(row).attr('id', data.wim_id); // id строки дислокации вагона
                $(row).attr('data-num', data.num); // data-num номер вагона
                // Проверим если по оператору контролировать норму времени, тогда проверить
                if (data.operator_monitoring_idle_time && data.arrival_idle_time < data.arrival_duration) {
                    // Превышена норма нахождения вагона на АМКР
                    $('td', row).eq(1).addClass('idle-time-error');
                }
                // Прибыл
                if (data.current_id_operation === 1) {
                    $('td.fixed-column', row).addClass('red'); // Отметим прибытие
                }
                // Предъявлен или сдан
                if (data.current_id_operation === 9) {
                    if (data.outgoing_sostav_status === 2) {
                        $('td.fixed-column', row).addClass('green');// Отметим вагон сдан на УЗ
                    } else {
                        $('td.fixed-column', row).addClass('yellow');// Отметим вагон предъявлен
                    }
                }
                // Цвет оператора
                if (data.operator_color && data.operator_color !== '') {
                    $('td.operator', row).attr('style', 'background-color:' + data.operator_color)
                }

            },
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: false,
            buttons: [
                {
                    extend: 'collection',
                    text: langView('title_button_export', App.Langs),
                    buttons: [
                        {
                            text: langView('title_button_buffer', App.Langs),
                            extend: 'copyHtml5',
                        },
                        {
                            text: langView('title_button_excel', App.Langs),
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
                    extend: 'collection',
                    text: langView('title_button_field', App.Langs),
                    buttons: [
                        {
                            extend: 'colvis',
                            text: langView('title_button_field_select', App.Langs),
                            collectionLayout: 'fixed two-column',
                        },
                        {
                            extend: 'colvisGroup',
                            text: langView('title_button_field_view_all', App.Langs),
                            show: ':hidden'
                        },
                        {
                            text: langView('title_button_field_clear', App.Langs),
                            action: function (e, dt, node, conf) {
                                this.obj_t_cars.colReorder.reset();
                            }.bind(this)
                        },
                    ],
                    autoClose: true
                },
                {
                    extend: 'pageLength',
                }

            ]
        }).on('select deselect', function (e, dt, type, indexes) {
            var selected = this.obj_t_cars.rows({ selected: true })[0].length > 0 ? true : false;
            var row = this.obj_t_cars.rows(indexes).data().toArray()[0];
            if (selected) {
                //this.obj_t_cars.button(2).enable(true);
                //this.obj_t_cars.button(3).enable(!(row && row.way_delete));
                //this.obj_t_cars.button(4).enable(!(row && row.way_delete));
                //this.obj_t_cars.button(5).enable(!(row && row.way_delete));
                this.select_row_wagons = row;
            } else {
                //this.obj_t_cars.button(2).enable(false);
                //this.obj_t_cars.button(3).enable(false);
                //this.obj_t_cars.button(4).enable(false);
                //this.obj_t_cars.button(5).enable(false);
                this.select_row_wagons = null;
            }
        }.bind(this));
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok();
        }
        //----------------------------------
        /*        }.bind(this));*/
    };
    // Показать данные 
    table_cars_way.prototype.view = function (data, num) {
        LockScreen(langView('mess_view_wagons', App.Langs));
        this.obj_t_cars.clear();
        this.obj_t_cars.rows.add(data);
        this.obj_t_cars.order([0, 'asc']);
        this.obj_t_cars.draw();
        // Если указан номер показать по номеру
        if (num) {
            //var tr = this.$table_cars.find('tbody tr[data-num="' + num + '"]');
            this.obj_t_cars.row('tr[data-num="' + num + '"]').select();
        } else {
            // иначе если указан id показать его
            if (this.select_row_wagons !== null) {
                this.obj_t_cars.row('#' + this.select_row_wagons.wim_id).select();
            }
        }
        LockScreenOff();
    };
    // Обновить данные
    table_cars_way.prototype.update = function (num) {
        if (this.id_way !== null && this.id_way >= 0) {
            LockScreen(langView('mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfWay(this.id_way, function (ways) {
                this.view(ways, num);
                LockScreenOff();
            }.bind(this));
        }
    };
    // загрузить данные 
    table_cars_way.prototype.load_of_way = function (id_way, num) {
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfWay(id_way, function (ways) {
                this.id_way = id_way;
                this.select_row_wagons = null;
                this.view(ways, num);
                LockScreenOff();
            }.bind(this));
        } else {
            //
        }

    };
    // Очистить сообщения
    table_cars_way.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_cars_way.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_cars_way.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_cars_way.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_cars_way.prototype.destroy = function () {
        // Вклучу когда понадобится 
        //this.modal_confirm_form.destroy();
        if (this.obj_t_cars) {
            this.obj_t_cars.destroy(true);
            this.obj_t_cars = null;
        }

        this.$table_cars.empty(); // empty in case the columns change
    }

    App.table_cars_way = table_cars_way;

    window.App = App;
})(window);