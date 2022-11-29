/*Модуль Таблица "Прибываемые составы"*/
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
            'ttdr_field_numeration': '№ п.п.',

            'ttdr_field_adoption_sostav_station': 'ПРИБЫТИЕ',
            'ttdr_field_adoption_count_wagon': 'Всего вагонов',
            'ttdr_field_adoption_sostav_count_return_wagon': 'Возврат',
            'ttdr_field_adoption_count_account_balance': 'Учетные вагоны',
            'ttdr_field_adoption_count_not_operator': 'Без оператора',

            'ttdr_field_outgoing_sostav_station': 'ОТПРАВЛЕНИЕ',
            'ttdr_field_outgoing_sostav_count_wagon': 'Всего вагонов',
            'ttdr_field_outgoing_sostav_count_return_wagon': 'Вернуло УЗ',
            'ttdr_field_outgoing_sostav_account_balance': 'Учетные вагоны',

            'ttdr_field_adoption_sostav_detali_num_doc': '№ ведомости',
            'ttdr_field_adoption_sostav_detali_date_adoption': 'Дата приема',
            'ttdr_field_adoption_sostav_detali_count_wagon': 'кол-во',
            'ttdr_field_adoption_sostav_detali_count_account_balance': 'Уч. ваг.',
            'ttdr_field_adoption_sostav_detali_count_not_operator': 'Без опер.',

            'ttdr_field_outgoing_sostav_detali_num_doc': '№ ведомости',
            'ttdr_field_outgoing_sostav_detali_date_outgoing': 'Дата сдачи',
            'ttdr_field_outgoing_sostav_detali_count_wagon': 'кол-во',
            'ttdr_field_outgoing_sostav_detali_count_account_balance': 'Уч. ваг.',

            //'ttdr_field_incoming_cars_position_arrival': '№',
            //'ttdr_field_incoming_cars_station_from_name': 'Станция отправления',

            'ttdr_field_incoming_cars_id': 'id вагона',
            'ttdr_field_incoming_cars_position_arrival': '№ поз.',
            'ttdr_field_num': '№ вагона',
            'ttdr_field_incoming_cars_uz_document_nom_doc': '№ дос. накл.',
            'ttdr_field_incoming_cars_uz_document_nom_main_doc': '№ осн. накл.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_adm': 'Код Адм.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_adm_name': 'Адм.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_adm_abbr': 'Адм.',
            'ttdr_field_incoming_cars_uz_vagon_rod': 'Код Род.',
            'ttdr_field_incoming_cars_uz_vagon_rod_name': 'Род.',
            'ttdr_field_incoming_cars_uz_vagon_rod_abbr': 'Род.',
            'ttdr_field_incoming_cars_uz_vagon_gruzp': 'ГП,т.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_kol_os': 'Кол.ос.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_usl_tip': 'Тип цс',
            'ttdr_field_incoming_cars_uz_vagon_u_tara': 'Тара (ут.),т.',
            'ttdr_field_incoming_cars_uz_vagon_ves_tary_arc': 'Тара,т.',
            'ttdr_field_incoming_cars_arrival_uz_vagon_route': 'Маршрут',
            'ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_uz': 'Рем. УЗ',
            'ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_vag': 'Рем. вагон',
            'ttdr_field_incoming_cars_uz_vagon_owner_wagon': 'Собственник',
            'ttdr_field_incoming_cars_uz_vagon_owner_wagon_abbr': 'Собственник',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_operator': 'id Опер. по отправке',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operators': 'Оператор по АМКР ПРИБ',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_abbr': 'Оператор по АМКР ПРИБ',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_start': 'Опер. по АМКР. нач. аренды',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_end': 'Опер. по АМКР. кон. аренды',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_paid': 'Опер. по АМКР. платный',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_limiting': 'id Огран. по отправке',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_name': 'Огран. по отправке',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_abbr': 'Огран. по отправке',

            'ttdr_field_incoming_cars_uz_vagon_condition_name': 'Огран. по отправке',
            'ttdr_field_incoming_cars_uz_vagon_condition_abbr': 'Разм. по приб.',
            'ttdr_field_incoming_cars_uz_document_code_stn_from': 'Код ст. отпр.',
            'ttdr_field_incoming_cars_uz_document_station_from_name': 'Cт. отпр.',
            'ttdr_field_incoming_cars_uz_document_code_stn_to': 'Код ст. приб.',
            'ttdr_field_incoming_cars_uz_document_station_to_name': 'Cт. приб.',
            'ttdr_field_incoming_cars_uz_document_code_border_checkpoint': 'Код погр. пер.',
            'ttdr_field_incoming_cars_uz_document_border_checkpoint_station_name': 'Погр. пер.',
            'ttdr_field_incoming_cars_uz_document_cross_time': 'Врем. погр. пер.',
            'ttdr_field_incoming_cars_uz_document_code_shipper': 'Код гр. отпр.',
            'ttdr_field_incoming_cars_uz_document_shipper_name': 'Гр. отпр.',
            'ttdr_field_incoming_cars_uz_document_code_consignee': 'Код. гр. пол.',
            'ttdr_field_incoming_cars_uz_document_name_consignee': 'Гр. пол.',
            'ttdr_field_incoming_cars_uz_document_code_payer_sender': 'Код. пл. отпр.',
            'ttdr_field_incoming_cars_uz_document_payer_sender_name': 'Пл. отпр.',
            'ttdr_field_incoming_cars_uz_document_distance_way': 'Тар. расс.',
            'ttdr_field_incoming_cars_uz_vagon_vesg': 'Вес, тн.',
            'ttdr_field_incoming_cars_uz_vagon_cargo_name': 'Груз',
            'ttdr_field_incoming_cars_uz_vagon_cargo_group_name': 'Группа груза',
            'ttdr_field_incoming_cars_uz_vagon_station_amkr_name': 'Следует на ст.АМКР',
            'ttdr_field_incoming_cars_uz_vagon_station_amkr_abbr': 'Следует на ст.АМКР',
            'ttdr_field_incoming_cars_uz_vagon_division_code': 'Шифр Цеха',
            'ttdr_field_incoming_cars_uz_vagon_name_division': 'Цех получатель',
            'ttdr_field_incoming_cars_uz_vagon_division_abbr': 'Цех получатель',
            'ttdr_field_incoming_cars_uz_vagon_commercial_condition': 'Ком состояние',
            'ttdr_field_incoming_cars_uz_vagon_sertification_data': 'Серт. данные',

            'ttdr_field_outgoing_cars_car_position_outgoing': '№ поз.',
            'ttdr_field_sostav_outgoing_naturka_num': '№ вагона',
            'ttdr_field_outgoing_cars_uz_document_nom_doc': '№ накл.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_name': 'Груз',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_group_name': 'Груз',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_to_station_uz_name': 'Станция назначения',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_wagon_adm': 'Код Адм.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_name': 'Адм.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_abbr': 'Адм.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_rod': 'Код Род.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_name': 'Род.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_abbr': 'Род.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_division_code': 'Шифр Цех',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_name_division': 'Цех погр.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_division_abbr': 'Цех погр.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon': 'Собственник',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr': 'Собственник',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator': 'id Опер. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators': 'Оператор по АМКР ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr': 'Оператор по АМКР ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start': 'Опер. по отпр. нач. аренды',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end': 'Опер. по отпр. кон. аренды',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid': 'Опер. по отпр. платный',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting': 'id Огран. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name': 'Огран. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr': 'Огран. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_vesg': 'Вес ЭПД, тн',

            'ttdr_field_adoption_wagon_not_operation_position': '№п.п.',
            'ttdr_field_adoption_wagon_not_operation_num': '№ вагона',
            'ttdr_field_adoption_wagon_not_operation_date_adoption': 'Дата приема',
            'ttdr_field_adoption_wagon_not_operation_cargo_name': 'Груз ПРИБ.',
            'ttdr_field_adoption_wagon_not_operation_nom_main_doc': 'Осн. накл.',
            'ttdr_field_adoption_wagon_not_operation_nom_doc': 'Дос. накл.',
            'ttdr_field_adoption_wagon_not_operation_station_from_name': 'Станция отправления',
            'ttdr_field_adoption_wagon_not_operation_division_abbr': 'Цех-получатель',

            'ttdr_field_incoming_cars_arrival_sostav_date_arrival': 'Дата прибытия',
            'ttdr_field_incoming_cars_arrival_sostav_date_adoption': 'Дата приема',
            'ttdr_field_incoming_cars_arrival_sostav_date_adoption_act': 'Дата приема по акту',
            'ttdr_field_incoming_cars_arrival_uz_vagon_id_type': 'id тип вагона',
            'ttdr_field_incoming_cars_arrival_uz_vagon_type': 'Тип вагона',
            'ttdr_field_incoming_cars_arrival_uz_vagon_vesg_reweighing': 'Вес АМКР, тн',
            'ttdr_field_incoming_cars_arrival_uz_vagon_deff_vesg': 'Отклонение, тн',
            'ttdr_field_incoming_cars_sap_incoming_supply_num': '№ Вх. поставки',
            'ttdr_field_incoming_cars_sap_incoming_supply_cargo_code': 'Код груза ПРИБ SAP',
            'ttdr_field_incoming_cars_sap_incoming_supply_cargo_name': 'Груз ПРИБ SAP',
            'ttdr_field_incoming_cars_arrival_uz_vagon_cargo_etsng_code': 'Код ЕТСНГ',

            'ttdr_field_incoming_cars_arrival_uz_document_code_payer_arrival': 'Код платильщика ПРИБ',
            'ttdr_field_incoming_cars_arrival_uz_document_payer_arrival_name': 'Платильщик ПРИБ',
            'ttdr_field_incoming_cars_arrival_uz_vagon_pay_summa': 'Тариф ПРИБ',
            'ttdr_field_incoming_cars_arrival_sostav_epd_date_otpr': 'Дата отправления на АМКР',
            'ttdr_field_incoming_cars_arrival_sostav_epd_date_vid': 'Дата раскредитовки',

            'ttdr_field_incoming_cars_number_in_sequence': '№ п.п',
            'ttdr_field_sostav_outgoing_naturka_number_in_sequence': '№ п.п',
            'ttdr_field_sostav_outgoing_naturka_arrival_uz_vagon_cargo_name': 'Груз по прибытию',
            'ttdr_field_sostav_outgoing_naturka_arrival_sostav_date_arrival': 'Дата приема с УЗ',

            'ttdr_field_incoming_cars_outgoing_uz_vagon_cargo_name': 'Груз по отправлению',
            'ttdr_field_incoming_cars_outgoing_sostav_date_outgoing': 'Дата последней сдачи',

            'ttdr_field_total_period': 'Период',
            'ttdr_field_total_arrival_operator_abbr': 'Опер. АМКР',
            'ttdr_field_total_arrival_limiting_abbr': 'Огран.',
            'ttdr_field_total_arrival_cargo_name': 'Груз ПРИБ',
            'ttdr_field_total_arrival_group_name': 'Группа груз ПРИБ',
            'ttdr_field_total_arrival_certification_data': 'Сертиф. данные',
            'ttdr_field_total_arrival_count_wagon': 'Кол-во ваг.',
            'ttdr_field_total_arrival_sum_vesg': 'Кол-во тн. по ЭПД',
            'ttdr_field_total_arrival_sum_vesg_reweighing': 'Кол-во тн. по АМКР',
            'ttdr_field_total_arrival_sum_vesg_deff': 'Откл., тн.',
            'ttdr_field_total_arrival_rod_abbr': 'Род ПРИБ',
            'ttdr_field_total_arrival_perent_wagon': '% от общего приб.',
            'ttdr_field_total_arrival_sap_cargo_code': 'Код материала SAP',
            'ttdr_field_total_arrival_sap_cargo_name': 'Груз ПРИБ SAP',
            'ttdr_field_total_arrival_station_from_name': 'Станция отправления',
            'ttdr_field_total_arrival_division_abbr': 'Цех-грузоп.',
            'ttdr_field_total_arrival_station_on_name': 'Пункт погрузки',

            'ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing': 'Дата и время сдачи',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing_act': 'Дата и время сдачи Акт',

            'ttdr_field_incoming_outgoing_car_simple_car': 'Простой УЗ, час.',
            'ttdr_field_incoming_outgoing_car_pay_car': 'Плата , грн.',

            'ttdr_field_incoming_outgoing_car_wir_note': 'Примечание',

            'ttdr_field_curr_wagons_rent_id_operator': 'id_operator',
            'ttdr_field_curr_wagons_rent_operators': 'Оператор АМКР',
            'ttdr_field_curr_wagons_rent_operator_abbr': 'Оператор АМКР',
            'ttdr_field_curr_wagons_rent_start': 'Начало аренды',
            'ttdr_field_curr_wagons_rent_end': 'Окончание арены',
            'ttdr_field_curr_wagons_rent_operator_paid': 'Платный',
            'ttdr_field_curr_wagons_rent_id_limiting': 'id_limiting',
            'ttdr_field_curr_wagons_rent_limiting_name': 'Ограничение',
            'ttdr_field_curr_wagons_rent_limiting_abbr': 'Ограничение',

            'ttdr_mess_init_module': 'Инициализация модуля (table_td_report) ...',

            'ttdr_mess_load_sostav': 'Загружаю состав ...',

            'ttdr_mess_view_report': 'Показать отчет ...',


            'ttdr_title_all': 'Все',
            'ttdr_title_not_epd': 'Без ЭПД',
            'ttdr_title_for_loading': 'Под погрузку',
            'ttdr_title_route': 'маршрут',
            'ttdr_title_not_route': 'не маршрут',

            'ttdr_title_button_export': 'Экспорт',
            'ttdr_title_button_buffer': 'Буфер',
            'ttdr_title_button_excel': 'Excel',
            'ttdr_title_excel_sheet_name': 'Отчет',
            'ttdr_title_button_field': 'Поля',
            'ttdr_title_button_field_select': 'Выбрать',
            'ttdr_title_button_field_view_all': 'Показать все',
            'ttdr_title_button_field_clear': 'Сбросить',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    // Перечень полей
    var list_collums = [
        // Поля составы принятые
        {
            field: 'numeration',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_numeration', App.Langs), width: "30px", orderable: false, searchable: false
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
        // Поля составы принятые
        {
            field: 'adoption_sostav_station',
            data: function (row, type, val, meta) {
                return row.station;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_adoption_sostav_station', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_adoption_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_return_wagon',
            data: function (row, type, val, meta) {
                return row.count_return_wagon;
            },
            className: 'dt-body-center sum_count_return_wagon',
            title: langView('ttdr_field_adoption_sostav_count_return_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_adoption_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_not_operator',
            data: function (row, type, val, meta) {
                return row.count_not_operator;
            },
            className: 'dt-body-center sum_count_not_operator',
            title: langView('ttdr_field_adoption_count_not_operator', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // Поля составы сданные
        {
            field: 'outgoing_sostav_station',
            data: function (row, type, val, meta) {
                return row.station;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_sostav_station', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_outgoing_sostav_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_count_return_wagon',
            data: function (row, type, val, meta) {
                return row.count_return_wagon;
            },
            className: 'dt-body-center sum_count_return_wagon',
            title: langView('ttdr_field_outgoing_sostav_count_return_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_outgoing_sostav_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // Поля принятые составы детально adoption_sostav_detali
        {
            field: 'adoption_sostav_detali_details_control',
            className: 'details-control adoption-sostav-detali',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "20px",
            searchable: false
        },
        {
            field: 'adoption_sostav_detali_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn arrival-button"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center button-control',
            width: "20px"
        },
        {
            field: 'adoption_sostav_detali_num_doc',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_sostav_detali_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_sostav_detali_date_adoption',
            data: function (row, type, val, meta) {
                return row.date_adoption ? moment(row.date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_adoption_sostav_detali_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'adoption_sostav_detali_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_adoption_sostav_detali_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_detali_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_adoption_sostav_detali_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_detali_count_not_operator',
            data: function (row, type, val, meta) {
                return row.count_not_operator;
            },
            className: 'dt-body-center sum_count_not_operator',
            title: langView('ttdr_field_adoption_sostav_detali_count_not_operator', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // Поля принятые составы детально outgoing_sostav_detali
        {
            field: 'outgoing_sostav_detali_details_control',
            className: 'details-control outgoing-sostav-detali',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "20px",
            searchable: false
        },
        {
            field: 'outgoing_sostav_detali_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn outgoing-button"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center button-control',
            width: "20px"
        },
        {
            field: 'outgoing_sostav_detali_num_doc',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_sostav_detali_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_sostav_detali_date_outgoing',
            data: function (row, type, val, meta) {
                return row.date_outgoing ? moment(row.date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_sostav_detali_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_sostav_detali_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_outgoing_sostav_detali_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_detali_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_outgoing_sostav_detali_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // НАТУРКА ПРИБЫТИЯ
        // № п.п
        {
            field: 'incoming_cars_number_in_sequence',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_number_in_sequence', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_id',
            data: function (row, type, val, meta) {
                return row.arrival_car_id;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_car_position_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_car_position_arrival;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_position_arrival', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Документы накладных УЗ
        {
            field: 'incoming_cars_arrival_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_main_doc < 0 ? langView('ttdr_title_not_epd', App.Langs) : row.arrival_uz_document_nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_nom_main_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Администрация по отправке
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_adm',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_adm_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_wagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_wagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_adm_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Род по отправке
        {
            field: 'incoming_cars_arrival_uz_vagon_rod',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_rod;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_rod_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_rod_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_incoming_cars_uz_vagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Грузоподъемность
        {
            field: 'incoming_cars_arrival_uz_vagon_gruzp',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_gruzp;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_gruzp', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Кол. осей
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_kol_os',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_kol_os;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_kol_os', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тип цистерны
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_usl_tip',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_usl_tip;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_usl_tip', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'incoming_cars_arrival_uz_vagon_u_tara',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_u_tara ? Number(Number(row.arrival_uz_vagon_u_tara) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_u_tara', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'incoming_cars_arrival_uz_vagon_ves_tary_arc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_ves_tary_arc ? Number(Number(row.arrival_uz_vagon_ves_tary_arc) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_ves_tary_arc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Маршрут
        {
            field: 'incoming_cars_arrival_uz_vagon_route',
            data: function (row, type, val, meta) {
                if (row.arrival_uz_vagon_route !== null) {
                    if (row.arrival_uz_vagon_route) {
                        return langView('ttdr_title_route', App.Langs);
                    } else {
                        return langView('ttdr_title_not_route', App.Langs);
                    }
                } else {
                    return null;
                }
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_route', App.Langs), width: "50px", orderable: true, searchable: true
        },

        // Ремонт УЗ и вагон
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_uz',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_date_rem_uz ? moment(row.arrival_uz_vagon_wagon_date_rem_uz).format(format_date) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_vag',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_date_rem_vag ? moment(row.arrival_uz_vagon_wagon_date_rem_vag).format(format_date) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_vag', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник
        {
            field: 'incoming_cars_arrival_uz_vagon_owner_wagon',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_vagon_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
        // Оператор
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_start ? moment(row.arrival_uz_vagon_arrival_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_end ? moment(row.arrival_uz_vagon_arrival_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_operator_paid ? langView('ttdr_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        //Ограничение
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'incoming_cars_arrival_uz_vagon_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция отправления
        {
            field: 'incoming_cars_arrival_uz_document_code_stn_from',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_from;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_stn_from', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_station_from_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_document_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция прибытия
        {
            field: 'incoming_cars_arrival_uz_document_code_stn_to',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_to;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_stn_to', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_station_to_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_to_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_document_station_to_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Погран переход
        {
            field: 'incoming_cars_arrival_uz_document_code_border_checkpoint',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_border_checkpoint;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_border_checkpoint', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_border_checkpoint_station_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_border_checkpoint_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_document_border_checkpoint_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_cross_time',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_cross_time ? moment(row.arrival_uz_document_cross_time).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_incoming_cars_uz_document_cross_time', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузоотправитель
        {
            field: 'incoming_cars_arrival_uz_document_code_shipper',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_shipper;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_shipper', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_shipper_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_shipper_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_document_shipper_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузополучатель
        {
            field: 'incoming_cars_arrival_uz_document_code_consignee',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_consignee;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_consignee', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_name_consignee',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_name_consignee;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_document_name_consignee', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Платильщик по отправлению
        {
            field: 'incoming_cars_arrival_uz_document_code_payer_sender',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_payer_sender;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_payer_sender', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_payer_sender_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_payer_sender_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_document_payer_sender_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Тарифное расстояние
        {
            field: 'incoming_cars_arrival_uz_document_distance_way',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_distance_way;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_distance_way', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Вес
        {
            field: 'incoming_cars_arrival_uz_vagon_vesg',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg ? Number(Number(row.arrival_uz_vagon_vesg) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Груз
        {
            field: 'incoming_cars_arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения АМКР        
        {
            field: 'incoming_cars_arrival_uz_vagon_station_amkr_name',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_station_on_amkr !== null ? row['arrival_uz_vagon_station_amkr_name_' + App.Lang] : langView('ttdr_title_for_loading', App.Langs);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_station_on_amkr !== null ? row['arrival_uz_vagon_station_amkr_abbr_' + App.Lang] : langView('ttdr_title_for_loading', App.Langs);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Цех получатель
        {
            field: 'incoming_cars_arrival_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_division_code', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_vagon_name_division', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком состояние
        {
            field: 'incoming_cars_arrival_uz_vagon_commercial_condition',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_commercial_condition_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_commercial_condition', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком сертификационные данные
        {
            field: 'incoming_cars_arrival_uz_vagon_sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_sertification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },

        // НАТУРКА ОТПРАВКА
        // № п.п
        {
            field: 'sostav_outgoing_naturka_number_in_sequence',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_sostav_outgoing_naturka_number_in_sequence', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sostav_outgoing_naturka_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_sostav_outgoing_naturka_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_car_position_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing_car_position_outgoing;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_car_position_outgoing', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_to_station_uz_name',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_code_stn_to ? row['outgoing_uz_document_station_to_name_' + App.Lang] : row.outgoing_uz_vagon_to_station_uz_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_to_station_uz_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения основное поле по документу САП если пусто тогда по ручному вводу
        {
            field: 'outgoing_cars_to_station_uz_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_station_to_name_' + App.Lang] !== null && row['outgoing_uz_document_station_to_name_' + App.Lang] !== '' ? row['outgoing_uz_document_station_to_name_' + App.Lang] : row.outgoing_uz_vagon_to_station_uz_name;
                //return row.sap_outgoing_supply_destination_station_name !== null && row.sap_outgoing_supply_destination_station_name !== '' ? row.sap_outgoing_supply_destination_station_name : row.outgoing_uz_vagon_to_station_uz_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_to_station_uz_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Администрация по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_wagon_adm',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_adm_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Род по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_rod',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_rod;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_rod_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Цех отправитель
        {
            field: 'outgoing_cars_outgoing_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_division_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_name_division', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник
        {
            field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ОПЕРАТОР ПО ОТПРАВКЕ [IDS].[Directory_OperatorsWagons]
        // Оператор
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_start ? moment(row.outgoing_uz_vagon_outgoing_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_end ? moment(row.outgoing_uz_vagon_outgoing_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_operator_paid ? langView('togc_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        //Ограничение
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_vesg',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_vesg ? Number(Number(row.outgoing_uz_vagon_vesg) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Груз по прибытию
        {
            field: 'sostav_outgoing_naturka_arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_sostav_outgoing_naturka_arrival_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вагон приняли с УЗ
        {
            field: 'sostav_outgoing_naturka_arrival_sostav_date_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption ? moment(row.arrival_sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_sostav_outgoing_naturka_arrival_sostav_date_arrival', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // ВАГОНЫ БЕЗ ОПЕРАТОРОВ
        {
            field: 'adoption_wagon_not_operation_position',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_wagon_not_operation_position', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_wagon_not_operation_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_date_adoption',
            data: function (row, type, val, meta) {
                return row.sostav_date_adoption ? moment(row.sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_adoption_wagon_not_operation_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_cargo_name',
            data: function (row, type, val, meta) {
                return row['cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_adoption_wagon_not_operation_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_wagon_not_operation_nom_main_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_nom_doc',
            data: function (row, type, val, meta) {
                return row.nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_wagon_not_operation_nom_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_station_from_name',
            data: function (row, type, val, meta) {
                return row['station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_adoption_wagon_not_operation_station_from_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_division_abbr',
            data: function (row, type, val, meta) {
                return row['division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_adoption_wagon_not_operation_division_abbr', App.Langs), width: "150px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // ПРИБЫТИЕ ДЕТАЛЬНО
        {
            field: 'incoming_cars_arrival_sostav_date_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_arrival ? moment(row.arrival_sostav_date_arrival).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_date_arrival', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_date_adoption',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption ? moment(row.arrival_sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_date_adoption_act',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption_act ? moment(row.arrival_sostav_date_adoption_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_date_adoption_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // тип вагона
        {
            field: 'incoming_cars_arrival_uz_vagon_id_type',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_type;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_id_type', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_type',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_type_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_type', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вес-перевеска АМКР
        {
            field: 'incoming_cars_arrival_uz_vagon_vesg_reweighing',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg_reweighing ? Number(Number(row.arrival_uz_vagon_vesg_reweighing) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_vesg_reweighing', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Вес-перевеска АМКР
        {
            field: 'incoming_cars_arrival_uz_vagon_deff_vesg',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg && row.arrival_uz_vagon_vesg_reweighing ? Number(Number(Number(row.arrival_uz_vagon_vesg) - Number(row.arrival_uz_vagon_vesg_reweighing)) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_deff_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Код груза ЕТСНГ
        {
            field: 'incoming_cars_arrival_uz_vagon_cargo_etsng_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_cargo_etsng_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_cargo_etsng_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_sap_incoming_supply_num',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_sap_incoming_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_sap_incoming_supply_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_cargo_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_sap_incoming_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_sap_incoming_supply_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_cargo_name;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_sap_incoming_supply_cargo_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Платильщик
        {
            field: 'incoming_cars_arrival_uz_document_code_payer_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_payer_arrival;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_document_code_payer_arrival', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_payer_arrival_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_payer_arrival_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_arrival_uz_document_payer_arrival_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_pay_summa',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_pay_summa ? Number(Number(row.arrival_uz_vagon_pay_summa) / 100).toFixed(2) : null;;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_pay_summa', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_epd_date_otpr',
            data: function (row, type, val, meta) {
                return row.otpr && row.otpr.date_otpr ? moment(row.otpr.date_otpr).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_epd_date_otpr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_epd_date_vid',
            data: function (row, type, val, meta) {
                return row.otpr && row.otpr.date_vid ? moment(row.otpr.date_vid).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_epd_date_vid', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Груз по прибытию
        {
            field: 'incoming_cars_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                var previous_outgoing_car = row.previous_outgoing_car;
                return previous_outgoing_car ? previous_outgoing_car['outgoing_uz_vagon_cargo_name_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вагон сдали на УЗ
        {
            field: 'incoming_cars_outgoing_sostav_date_outgoing',
            data: function (row, type, val, meta) {
                var previous_outgoing_car = row.previous_outgoing_car;
                return previous_outgoing_car && previous_outgoing_car.outgoing_sostav_date_outgoing ? moment(previous_outgoing_car.outgoing_sostav_date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_outgoing_sostav_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Отчет-Груз по Оператору АМКР
        {
            field: 'total_period',
            data: function (row, type, val, meta) {
                return row.period;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_period', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_operator_abbr',
            data: function (row, type, val, meta) {
                return row.operator_abbr;
            },
            className: 'dt-body-center shorten mw-100',
            title: langView('ttdr_field_total_arrival_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_limiting_abbr',
            data: function (row, type, val, meta) {
                return row.limiting_abbr;
            },
            className: 'dt-body-center shorten mw-100',
            title: langView('ttdr_field_total_arrival_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_cargo_name',
            data: function (row, type, val, meta) {
                return row.cargo_name;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_total_arrival_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_group_name',
            data: function (row, type, val, meta) {
                return row.group_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_total_arrival_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_certification_data',
            data: function (row, type, val, meta) {
                return row.certification_data;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_total_arrival_certification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_arrival_count_wagon', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_sum_vesg',
            data: function (row, type, val, meta) {
                return row.sum_vesg ? Number(row.sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2);
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_arrival_sum_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_sum_vesg_reweighing',
            data: function (row, type, val, meta) {
                return row.sum_vesg_reweighing ? Number(row.sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2);
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_arrival_sum_vesg_reweighing', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_sum_vesg_deff',
            data: function (row, type, val, meta) {
                return row.sum_vesg_deff ? Number(row.sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2);
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_arrival_sum_vesg_deff', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_rod_abbr',
            data: function (row, type, val, meta) {
                return row.rod_abbr;
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_total_arrival_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_perent_wagon',
            data: function (row, type, val, meta) {
                return row.perent_wagon;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_arrival_perent_wagon', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_sap_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_cargo_code;
            },
            className: 'dt-body-center shorten mw-100',
            title: langView('ttdr_field_total_arrival_sap_cargo_code', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_sap_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_cargo_name;
            },
            className: 'dt-body-center mw-150',
            title: langView('ttdr_field_total_arrival_sap_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_station_from_name',
            data: function (row, type, val, meta) {
                return row.station_from_name;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_arrival_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_division_abbr',
            data: function (row, type, val, meta) {
                return row.division_abbr;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_arrival_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_arrival_station_on_name',
            data: function (row, type, val, meta) {
                return row.station_on_name;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_arrival_station_on_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // ОТПРАВКА ДЕТАЛЬНО
        {
            field: 'outgoing_cars_outgoing_sostav_date_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_outgoing ? moment(row.outgoing_sostav_date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_sostav_date_outgoing_act',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_outgoing_act ? moment(row.outgoing_sostav_date_outgoing_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // Простой
        {
            field: 'incoming_outgoing_car_simple_car',
            data: function (row, type, val, meta) {
                return row.simple_car;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_incoming_outgoing_car_simple_car', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Оплата
        {
            field: 'incoming_outgoing_car_pay_car',
            data: function (row, type, val, meta) {
                return row.pay_car;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_incoming_outgoing_car_pay_car', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        {
            field: 'incoming_outgoing_car_wir_note',
            data: function (row, type, val, meta) {
                return row.wir_note;
            },
            className: 'dt-body-left mw-200',
            title: langView('ttdr_field_incoming_outgoing_car_wir_note', App.Langs), width: "200px", orderable: true, searchable: true
        },
        // История аренд операторов
        {
            field: 'curr_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ttdr_field_curr_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left mw-200',
            title: langView('ttdr_field_curr_wagons_rent_operators', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left mw-200',
            title: langView('ttdr_field_curr_wagons_rent_operator_abbr', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_start ? moment(row.curr_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_curr_wagons_rent_start', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_end ? moment(row.curr_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_curr_wagons_rent_end', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_operator_paid ? langView('togc_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ttdr_field_curr_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //
        {
            field: 'curr_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_curr_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_curr_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_curr_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('ttdr_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('ttdr_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('ttdr_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('ttdr_title_excel_sheet_name', App.Langs),
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
            text: langView('ttdr_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('ttdr_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('ttdr_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('ttdr_title_button_field_clear', App.Langs),
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
    ];

    var pageTotal = 0;


    /*    var ddd = function () { }.bind(this)*/
    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_td_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        //this.fc_ui = new FC();
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_td_report.prototype.init_columns_detali = function () {
        var collums = [];
        return init_columns(collums, list_collums);
    };
    // инициализация полей adoption_sostav
    table_td_report.prototype.init_columns_adoption_sostav = function () {
        var collums = [];
        collums.push({ field: 'adoption_sostav_station', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_wagon', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_account_balance', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_not_operator', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_return_wagon', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_sostav
    table_td_report.prototype.init_columns_outgoing_sostav = function () {
        var collums = [];
        collums.push({ field: 'outgoing_sostav_station', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_wagon', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_account_balance', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_return_wagon', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // 
    table_td_report.prototype.init_columns_adoption_sostav_detali = function () {
        var collums = [];
        if (this.settings.detali_table) collums.push({ field: 'adoption_sostav_detali_details_control', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_button_view', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_num_doc', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_date_adoption', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_count_wagon', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_count_account_balance', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_count_not_operator', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // 
    table_td_report.prototype.init_columns_outgoing_sostav_detali = function () {
        var collums = [];
        if (this.settings.detali_table) collums.push({ field: 'outgoing_sostav_detali_details_control', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_button_view', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_num_doc', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_date_outgoing', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_count_wagon', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_count_account_balance', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей sostav_naturka
    table_td_report.prototype.init_columns_sostav_arrival_naturka = function () {
        var collums = [];
        collums.push({ field: 'incoming_cars_number_in_sequence', title: null, class: null });
        collums.push({ field: 'incoming_cars_num', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_from', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_from_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_owner_wagon', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_main_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_vesg', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_code', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_name_division', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_outgoing_sostav_date_outgoing', title: null, class: null });

        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_gruzp', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_kol_os', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_usl_tip', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_u_tara', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_ves_tary_arc', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_uz', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_vag', title: null, class: null });


        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_start', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_end', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_to', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_station_to_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_shipper', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_shipper_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_consignee', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_name_consignee', title: null, class: null });


        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_station_amkr_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_station_amkr_abbr', title: null, class: null });

        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_commercial_condition', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_sertification_data', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });

        //collums.push({ field: 'adoption_sostav_count_account_balance', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей sostav_naturka
    table_td_report.prototype.init_columns_sostav_outgoing_naturka = function () {
        var collums = [];
        collums.push({ field: 'sostav_outgoing_naturka_number_in_sequence', title: null, class: null });
        collums.push({ field: 'sostav_outgoing_naturka_num', title: null, class: null });
        collums.push({ field: 'outgoing_cars_uz_document_nom_doc', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_to_station_uz_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_vesg', title: null, class: null });
        collums.push({ field: 'sostav_outgoing_naturka_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'sostav_outgoing_naturka_arrival_sostav_date_arrival', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_group_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_adm_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_adm_abbr', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_division_code', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_name_division', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_wagon_not_operation
    table_td_report.prototype.init_columns_adoption_wagon_not_operation = function () {
        var collums = [];
        collums.push({ field: 'adoption_wagon_not_operation_position', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_num', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_date_adoption', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_cargo_name', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_nom_main_doc', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_nom_doc', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_station_from_name', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_division_abbr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_common_detali
    table_td_report.prototype.init_columns_adoption_common_detali = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'incoming_cars_num', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_main_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_epd_date_otpr', title: null, class: null });    // дата отправления на АМКР
        collums.push({ field: 'incoming_cars_arrival_sostav_date_arrival', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_epd_date_vid', title: null, class: null });     // дата раскредитования
        collums.push({ field: 'incoming_cars_arrival_uz_document_name_consignee', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_type', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_gruzp', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_u_tara', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_ves_tary_arc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_vesg', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_deff_vesg', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_from', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_from_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_border_checkpoint', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_border_checkpoint_station_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_cross_time', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_to', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_to_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_sertification_data', title: null, class: null });
        collums.push({ field: 'incoming_cars_sap_incoming_supply_cargo_code', title: null, class: null });
        collums.push({ field: 'incoming_cars_sap_incoming_supply_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_group_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_uz', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_shipper', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_shipper_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_commercial_condition', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_station_amkr_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_payer_arrival', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_distance_way', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_pay_summa', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_cargo_operation_amkr
    table_td_report.prototype.init_columns_adoption_cargo_operation_amkr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_limiting_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_operator_to_ar
    table_td_report.prototype.init_columns_adoption_operator_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_limiting_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_cargo_to_arr
    table_td_report.prototype.init_columns_adoption_cargo_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_group_name', title: null, class: null });
        collums.push({ field: 'total_arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'total_arrival_certification_data', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_group_cargo_to_arr
    table_td_report.prototype.init_columns_adoption_group_cargo_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_group_name', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_genus_to_arr
    table_td_report.prototype.init_columns_adoption_genus_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_rod_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_perent_wagon', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_cargo_sap_to_arr
    table_td_report.prototype.init_columns_adoption_cargo_sap_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_sap_cargo_code', title: null, class: null });
        collums.push({ field: 'total_arrival_sap_cargo_name', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_station_to_arr
    table_td_report.prototype.init_columns_adoption_station_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_station_from_name', title: null, class: null });
        collums.push({ field: 'total_arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_station_to_arr
    table_td_report.prototype.init_columns_adoption_division_to_arr = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_division_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'total_arrival_certification_data', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_station_to_arr
    table_td_report.prototype.init_columns_adoption_to_gs = function () {
        var collums = [];
        collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'total_arrival_station_on_name', title: null, class: null });
        collums.push({ field: 'total_arrival_division_abbr', title: null, class: null });
        collums.push({ field: 'total_arrival_count_wagon', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_arrival_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей incoming_outgoing_car
    table_td_report.prototype.init_columns_incoming_outgoing_car = function () {
        var collums = [];
        collums.push({ field: 'incoming_outgoing_car_wir_note', title: null, class: null });
        collums.push({ field: 'incoming_cars_num', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_outgoing', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_outgoing_act', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'incoming_outgoing_car_simple_car', title: null, class: null });
        collums.push({ field: 'incoming_outgoing_car_pay_car', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_route', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей incoming_outgoing_car
    table_td_report.prototype.init_columns_list_wagons_rent = function () {
        var collums = [];
        collums.push({ field: 'curr_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'curr_wagons_rent_limiting_abbr', title: null, class: null });
        collums.push({ field: 'curr_wagons_rent_start', title: null, class: null });
        collums.push({ field: 'curr_wagons_rent_end', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_td_report.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок adoption_sostav
    table_td_report.prototype.init_button_adoption_sostav = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_sostav = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_sostav_detali = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_sostav_detali = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок sostav_arrival_naturka
    table_td_report.prototype.init_button_sostav_arrival_naturka = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок sostav_outgoing_naturka
    table_td_report.prototype.init_button_sostav_outgoing_naturka = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок adoption_wagon_not_operation
    table_td_report.prototype.init_button_adoption_wagon_not_operation = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_common_detali = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_cargo_operation_amkr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_operator_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_cargo_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_group_cargo_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_genus_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_cargo_sap_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_station_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_division_to_arr = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_to_gs = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_incoming_outgoing_car = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_list_wagons_rent = function () {
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
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_td_report.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
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
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_sostav();
                this.table_buttons = this.init_button_adoption_sostav();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_sostav': {
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
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = false;
                this.table_columns = this.init_columns_outgoing_sostav();
                this.table_buttons = this.init_button_outgoing_sostav();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_sostav_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [2, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_sostav_detali();
                this.table_buttons = this.init_button_adoption_sostav_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_sostav_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [2, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_outgoing_sostav_detali();
                this.table_buttons = this.init_button_outgoing_sostav_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'sostav_arrival_naturka': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 20;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_sostav_arrival_naturka();
                this.table_buttons = this.init_button_sostav_arrival_naturka();
                this.dom = 'B<"float-left"f>rtip';
                break;
            };
            case 'sostav_outgoing_naturka': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 20;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_sostav_outgoing_naturka();
                this.table_buttons = this.init_button_sostav_outgoing_naturka();
                this.dom = 'B<"float-left"f>rtip';
                break;
            };
            case 'adoption_wagon_not_operation': {
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
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_wagon_not_operation();
                this.table_buttons = this.init_button_adoption_wagon_not_operation();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_common_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [2, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_common_detali();
                this.table_buttons = this.init_button_adoption_common_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_cargo_operation_amkr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_cargo_operation_amkr();
                this.table_buttons = this.init_button_adoption_cargo_operation_amkr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_operator_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_operator_to_arr();
                this.table_buttons = this.init_button_adoption_operator_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_cargo_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_cargo_to_arr();
                this.table_buttons = this.init_button_adoption_cargo_to_arr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;

                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="3">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td class="total-value">' + sum_vesg_reweighing.toFixed(2) + '</td><td class="total-value">' + sum_vesg_deff.toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="7">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                sum_vesg_reweighing = group.sum_vesg_reweighing > 0 ? group.sum_vesg_reweighing / 1000 : 0;
                                sum_vesg_deff = group.sum_vesg_deff > 0 ? group.sum_vesg_deff / 1000 : 0;

                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                sum_vesg_reweighing += group.sum_vesg_reweighing > 0 ? group.sum_vesg_reweighing / 1000 : 0;
                                sum_vesg_deff += group.sum_vesg_deff > 0 ? group.sum_vesg_deff / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="3">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td class="total-value">' + sum_vesg_reweighing.toFixed(2) + '</td><td class="total-value">' + sum_vesg_deff.toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'adoption_group_cargo_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_group_cargo_to_arr();
                this.table_buttons = this.init_button_adoption_group_cargo_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_genus_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_genus_to_arr();
                this.table_buttons = this.init_button_adoption_genus_to_arr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    var total = api
                        .column(2)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    api
                        .data()
                        .each(function (group, i) {
                            var persent = Number((group.count_wagon * 100) / total).toFixed(2);
                            //var ro = $(rows).eq(i);
                            $('td', $(rows).eq(i)).eq(3).text(persent);
                        });
                };
                break;
            };
            case 'adoption_cargo_sap_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_cargo_sap_to_arr();
                this.table_buttons = this.init_button_adoption_cargo_sap_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_station_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_station_to_arr();
                this.table_buttons = this.init_button_adoption_station_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_division_to_arr': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_division_to_arr();
                this.table_buttons = this.init_button_adoption_division_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_to_gs': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_to_gs();
                this.table_buttons = this.init_button_adoption_to_gs();
                this.dom = 'Bfrtip';
                break;
            };
            case 'incoming_outgoing_car': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = true;
                this.table_columns = this.init_columns_incoming_outgoing_car();
                this.table_buttons = this.init_button_incoming_outgoing_car();
                this.dom = 'Bfrtip';
                break;
            };
            case 'list_wagons_rent': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_list_wagons_rent();
                this.table_buttons = this.init_button_list_wagons_rent();
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
    table_td_report.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('ttdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_table: false,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_init: null,
            fn_select_rows: null,
            fn_action_view_wagons: null,
        }, options);
        //
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
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
        this.dom = 'Bfrtip';

        this.init_type_report();
        this.data = [];
        this.selected_rows = null;
        this.tables_detali = [];                    // Массив таблиц детально
        //----------------------------------
        // Создать макет таблицы
        var table_report = new this.fe_ui.table({
            id: 'tab-tdr-' + this.selector,
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        if (this.settings.type_report === 'adoption_sostav') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_sostav') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_sostav_detali') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_sostav_detali') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_cargo_operation_amkr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="4" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_operator_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_group_cargo_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_genus_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_cargo_sap_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_station_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_division_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="4" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_to_gs') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="4" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
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
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            drawCallback: this.drawCallback,
            "createdRow": function (row, data, index) {
                switch (this.settings.type_report) {
                    case 'adoption_sostav': {
                        if (data.type === 0) {

                        } else {
                            $(row).addClass('yellow');
                        }
                        break;
                    };
                    case 'outgoing_sostav': {
                        if (data.type === 0) {

                        } else {
                            $(row).addClass('yellow');
                        }
                        break;
                    };
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
            case 'adoption_sostav': {
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
            case 'outgoing_sostav': {
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
            case 'adoption_sostav_detali': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                // Настроим ссылку на прибытие
                this.$table_report.find('tbody').on('tbody click', 'button.arrival-button', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var data = this.obj_t_report.row($(e.currentTarget).parents('tr')).data();
                    if (data) {
                        var date = moment(data.date_arrival)
                        date = date.format('YYYY-MM-DD[T]HH:mm:ss');
                        window.open(url_incoming + '?id_arrival=' + data.id + '&arrival=' + date, '', '');
                    }

                }.bind(this));
                if (this.settings.detali_table) this.init_arrival_detali();
                break;
            };
            case 'outgoing_sostav_detali': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                // Настроим ссылку на прибытие
                this.$table_report.find('tbody').on('tbody click', 'button.outgoing-button', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var data = this.obj_t_report.row($(e.currentTarget).parents('tr')).data();
                    if (data) {
                        var date = moment(data.date_readiness_amkr)
                        date = date.format('YYYY-MM-DD[T]HH:mm:ss');
                        window.open(url_outgoing + '?id=' + data.id + '&readiness=' + date, '', '');
                    }
                }.bind(this));
                if (this.settings.detali_table) this.init_outgoing_detali();
                break;
            };
            case 'incoming_outgoing_car': {
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
    table_td_report.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_td_report.prototype.enable_button = function () {
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
    table_td_report.prototype.view = function (data) {
        this.data = data;
        this.out_clear();
        LockScreen(langView('ttdr_mess_view_report', App.Langs));
        this.obj_t_report.clear();
        this.obj_t_report.rows.add(data);
        this.obj_t_report.draw();
        this.view_footer(data);
        this.select_rows();
        this.enable_button();
        //LockScreenOff();
    };
    //
    table_td_report.prototype.view_footer = function (data) {
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_wagon_all = 0;
                    var sum_count_return_wagon = 0;
                    var sum_count_return_wagon_all = 0;
                    var sum_count_account_balance = 0;
                    var sum_count_account_balance_all = 0;
                    var sum_count_not_operator = 0;
                    var sum_count_not_operator_all = 0;
                    $.each(data, function (i, el) {
                        if (el.type === 0) {
                            sum_count_wagon += el.count_wagon;
                            sum_count_account_balance += el.count_account_balance;
                            sum_count_not_operator += el.count_not_operator;
                            sum_count_return_wagon += el.count_return_wagon;
                        } else {
                            sum_count_wagon_all += el.count_wagon;
                            sum_count_account_balance_all += el.count_account_balance;
                            sum_count_not_operator_all += el.count_not_operator;
                            sum_count_return_wagon += el.count_return_wagon;
                        };

                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon_all + '(' + sum_count_wagon + ')');
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance_all + '(' + sum_count_account_balance + ')');
                });
                this.obj_t_report.columns('.sum_count_not_operator').every(function () {
                    $(this.footer()).html(sum_count_not_operator_all + '(' + sum_count_not_operator + ')');
                });
                this.obj_t_report.columns('.sum_count_return_wagon').every(function () {
                    $(this.footer()).html(sum_count_return_wagon_all + '(' + sum_count_return_wagon + ')');
                });
                break;
            };
            case 'outgoing_sostav': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_wagon_all = 0;
                    var sum_count_account_balance = 0;
                    var sum_count_account_balance_all = 0;
                    var sum_count_return_wagon = 0;
                    var sum_count_return_wagon_all = 0;
                    $.each(data, function (i, el) {
                        if (el.type === 0) {
                            sum_count_wagon += el.count_wagon;
                            sum_count_return_wagon += el.count_return_wagon;
                            sum_count_account_balance += el.count_account_balance;
                        } else {
                            sum_count_wagon_all += el.count_wagon;
                            sum_count_return_wagon_all += el.count_return_wagon;
                            sum_count_account_balance_all += el.count_account_balance;
                        }
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon_all + '(' + sum_count_wagon + ')');
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance_all + '(' + sum_count_account_balance + ')');
                });
                this.obj_t_report.columns('.sum_count_return_wagon').every(function () {
                    $(this.footer()).html(sum_count_return_wagon_all + '(' + sum_count_return_wagon + ')');
                });
                break;
            };
            case 'adoption_sostav_detali': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_account_balance = 0;
                    var sum_count_not_operator = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_count_account_balance += el.count_account_balance;
                        sum_count_not_operator += el.count_not_operator;
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance);
                });
                this.obj_t_report.columns('.sum_count_not_operator').every(function () {
                    $(this.footer()).html(sum_count_not_operator);
                });
                break;
            };
            case 'outgoing_sostav_detali': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_count_account_balance += el.count_account_balance;
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance);
                });
                break;
            };
            case 'adoption_cargo_operation_amkr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_operator_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                break;
            };
            case 'adoption_group_cargo_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_genus_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                break;
            };
            case 'adoption_cargo_sap_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_station_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_division_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_to_gs': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_arrival_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_arrival_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
        };
    };
    // Инициализация таблицы детально
    table_td_report.prototype.init_arrival_detali = function () {
        var base = this;
        this.$table_report.find('tbody')
            .on('click', 'td.adoption-sostav-detali', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                var row = base.obj_t_report.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }
                else {
                    var data = row.data();
                    var sl = this.selector + '-detali-' + data.id;
                    row.child('<div class="detali-operation table-report-detali" id="' + sl + '">' + // style="clear:both;table-layout:fixed;width:100%"
                        '</div>').show();
                    // Инициализируем
                    tr.addClass('shown');
                    setTimeout(function () {
                        //var ff = base.$table_report.find(sl)
                        base.view_arrival_detali(data);
                        //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    }, 100);

                }
            }.bind(this));
    };
    //
    table_td_report.prototype.init_outgoing_detali = function () {
        var base = this;
        this.$table_report.find('tbody')
            .on('click', 'td.outgoing-sostav-detali', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                var row = base.obj_t_report.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }
                else {
                    var data = row.data();
                    var sl = this.selector + '-detali-' + data.id;
                    row.child('<div class="detali-operation table-report-detali" id="' + sl + '">' +
                        '</div>').show();
                    // Инициализируем
                    tr.addClass('shown');
                    setTimeout(function () {
                        //var ff = base.$table_report.find(sl)
                        base.view_outgoing_detali(data);
                        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    }, 100);

                }
            }.bind(this));
    };
    //
    table_td_report.prototype.view_arrival_detali = function (data) {
        var TTDR = App.table_td_report;
        var sl = 'div#' + this.selector + '-detali-' + data.id;
        //if (!this.tables_detali[data.id]) {
        this.tables_detali[data.id] = new TTDR(sl); // Создадим экземпляр таблицы
        // Инициализация модуля "Таблица прибывающих составов"
        this.tables_detali[data.id].init({
            alert: null,
            detali_table: false,
            type_report: 'sostav_arrival_naturka',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function (init) {
                this.load_incoming_cars_of_id_sostav(data.id, function (wagons) {
                    this.tables_detali[data.id].view(wagons);
                    LockScreenOff();
                    //setTimeout(function () {
                    //    //$($.fn.dataTable.tables(true)).DataTable().columns.adjust().fixedColumns().relayout();
                    //    //$($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
                    //    //$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                    //}, 100);
                }.bind(this));
            }.bind(this),
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });
    };
    //
    table_td_report.prototype.view_outgoing_detali = function (data) {
        var TTDR = App.table_td_report;
        var sl = 'div#' + this.selector + '-detali-' + data.id;
        //if (!this.tables_detali[data.id]) {
        this.tables_detali[data.id] = new TTDR(sl); // Создадим экземпляр таблицы
        // Инициализация модуля "Таблица прибывающих составов"
        this.tables_detali[data.id].init({
            alert: null,
            detali_table: false,
            type_report: 'sostav_outgoing_naturka',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function (init) {
                this.load_outgoing_cars_of_id_sostav(data.id, function (wagons) {
                    this.tables_detali[data.id].view(wagons);
                }.bind(this));
            }.bind(this),
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });
    };
    //
    // Загрузить составы по прибытию
    table_td_report.prototype.load_incoming_cars_of_id_sostav = function (id_sostav, cb_load) {
        if (id_sostav !== null) {
            LockScreen(langView('ttdr_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewIncomingCarsOfIDSostav(id_sostav, function (wagons) {
                this.id_sostav = id_sostav;
                this.wagons = this.filter_wagons(wagons);
                // запустим паралелную загрузку предыдущих отправок с АМКР
                var process_load = this.wagons.length;
                // Выход из загрузки
                var out_load = function (process_load) {
                    if (process_load === 0) {
                        LockScreenOff();
                        if (typeof cb_load === 'function') {
                            cb_load(this.wagons);
                        }
                    }
                }.bind(this);
                // Получить прерырущие отправки с АМКР
                $.each(this.wagons, function (i, el) {
                    this.ids_wsd.getViewPreviousOutgoingCarsOfIDWIR(el.id_wir, function (outgoing_car) {
                        el['previous_outgoing_car'] = outgoing_car;
                        process_load--;
                        out_load(process_load);
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        } else {
            this.wagons = [];
            this.id_sostav = null;
            if (typeof cb_load === 'function') {
                cb_load(this.wagons);
            }
        }
    };
    //
    table_td_report.prototype.load_outgoing_cars_of_id_sostav = function (id_sostav, cb_load) {
        if (id_sostav !== null) {
            LockScreen(langView('ttdr_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingCarsOfIDSostav(id_sostav, function (wagons) {
                this.id_sostav = id_sostav;
                this.wagons = this.filter_wagons(wagons);
                LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.wagons);
                }
                LockScreenOff();
            }.bind(this));
        } else {
            this.wagons = [];
            this.id_sostav = null;
            if (typeof cb_load === 'function') {
                cb_load(this.wagons);
            }
        }

    };
    // Отфильтровать вагоны
    table_td_report.prototype.filter_wagons = function (wagons) {
        switch (this.settings.type_report) {
            case 'adoption_sostav_detali': {
                return wagons
                    .filter(function (i) { return i.arrival_car_position_arrival !== null })
                    .sort(function (a, b) { return a.arrival_car_position_arrival - b.arrival_car_position_arrival });
            };
            case 'outgoing_sostav_detali': {
                return wagons
                    .filter(function (i) { return i.outgoing_car_position_outgoing !== null })
                    .sort(function (a, b) { return a.outgoing_car_position_outgoing - b.outgoing_car_position_outgoing });
            };
            default: {
                return wagons;
            }
        }
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_td_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_td_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    table_td_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    table_td_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Очистить объект
    table_td_report.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    };
    // Очистить детали по указаному пути
    table_td_report.prototype.destroy_detali = function (data) {
        if (this.tables_detali[data.id]) {
            this.tables_detali[data.id].destroy();
            delete this.tables_detali[data.id];
        }
    };
    // Очистить все детали
    table_td_report.prototype.destroy_all_detali = function () {
        $.each(this.tables_detali, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.tables_detali = {};
    };
    //
    App.table_td_report = table_td_report;

    window.App = App;
})(window);