/*Модуль Таблица "Вагоны отправляемого состава"*/
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
            'ticc_field_arrival_car_id': 'id вагона',
            'ticc_field_arrival_car_position_arrival': '№ поз.',
            'ticc_field_num': '№ вагона',
            'ticc_field_arrival_uz_document_nom_doc': '№ дос. накл.',
            'ticc_field_arrival_uz_document_nom_main_doc': '№ осн. накл.',
            'ticc_field_arrival_uz_vagon_wagon_adm': 'Код Адм.',
            'ticc_field_arrival_uz_vagon_wagon_adm_name': 'Адм.',
            'ticc_field_arrival_uz_vagon_wagon_adm_abbr': 'Адм.',
            'ticc_field_arrival_uz_vagon_rod': 'Код Род.',
            'ticc_field_arrival_uz_vagon_rod_name': 'Род.',
            'ticc_field_arrival_uz_vagon_rod_abbr': 'Род.',
            'ticc_field_arrival_uz_vagon_gruzp': 'ГП,т.',
            'ticc_field_arrival_uz_vagon_wagon_kol_os': 'Кол.ос.',
            'ticc_field_arrival_uz_vagon_wagon_usl_tip': 'Тип цс',
            'ticc_field_arrival_uz_vagon_u_tara': 'Тара (ут.),т.',
            'ticc_field_arrival_uz_vagon_ves_tary_arc': 'Тара,т.',
            'ticc_field_arrival_uz_vagon_wagon_date_rem_uz': 'Рем. УЗ',
            'ticc_field_arrival_uz_vagon_wagon_date_rem_vag': 'Рем. вагон',
            'ticc_field_arrival_uz_vagon_owner_wagon': 'Собственник',
            'ticc_field_arrival_uz_vagon_owner_wagon_abbr': 'Собственник',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_id_operator': 'id Опер. по отправке',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_operators': 'Оператор по отправке',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_operator_abbr': 'Оператор по отправке',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_start': 'Опер. по отпр. нач. аренды',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_end': 'Опер. по отпр. кон. аренды',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_operator_paid': 'Опер. по отпр. платный',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_id_limiting': 'id Огран. по отправке',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_limiting_name': 'Огран. по отправке',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr': 'Огран. по отправке',

            'ticc_field_arrival_uz_vagon_condition_name': 'Огран. по отправке',
            'ticc_field_arrival_uz_vagon_condition_abbr': 'Разм. по приб.',
            'ticc_field_arrival_uz_document_code_stn_from': 'Код ст. отпр.',
            'ticc_field_arrival_uz_document_station_from_name': 'Cт. отпр.',
            'ticc_field_arrival_uz_document_code_stn_to': 'Код ст. приб.',
            'ticc_field_arrival_uz_document_station_to_name': 'Cт. приб.',
            'ticc_field_arrival_uz_document_code_border_checkpoint': 'Код погр. пер.',
            'ticc_field_arrival_uz_document_border_checkpoint_station_name': 'Погр. пер.',
            'ticc_field_arrival_uz_document_cross_time': 'Врем. погр. пер.',
            'ticc_field_arrival_uz_document_code_shipper': 'Код гр. отпр.',
            'ticc_field_arrival_uz_document_shipper_name': 'Гр. отпр.',
            'ticc_field_arrival_uz_document_code_consignee': 'Код. гр. пол.',
            'ticc_field_arrival_uz_document_name_consignee': 'Код. гр. пол.',
            'ticc_field_arrival_uz_document_code_payer_sender': 'Код. пл. отпр.',
            'ticc_field_arrival_uz_document_payer_sender_name': 'Пл. отпр.',
            'ticc_field_arrival_uz_document_distance_way': 'Тар. расс.',
            'ticc_field_arrival_uz_vagon_vesg': 'Вес. гр.',
            'ticc_field_arrival_uz_vagon_cargo_name': 'Груз',
            'ticc_field_arrival_uz_vagon_cargo_group_name': 'Группа груза',
            'ticc_field_arrival_uz_vagon_station_amkr_name': 'Следует на ст.АМКР',
            'ticc_field_arrival_uz_vagon_station_amkr_abbr': 'Следует на ст.АМКР',
            'ticc_field_arrival_uz_vagon_division_code': 'Шифр Цеха',
            'ticc_field_arrival_uz_vagon_name_division': 'Цех получатель',
            'ticc_field_arrival_uz_vagon_division_abbr': 'Цех получатель',
            'ticc_field_arrival_uz_vagon_commercial_condition': 'Ком состояние',
            'ticc_field_arrival_uz_vagon_sertification_data': 'Серт. данные',

            'ticc_title_yes': 'Да',
            'ticc_title_all': 'Все',
            'ticc_title_not_epd': 'Без ЭПД',
            'ticc_title_for_loading': 'Под погрузку',

            'ticc_title_button_export': 'Экспорт',
            'ticc_title_button_buffer': 'Буфер',
            'ticc_title_button_excel': 'Excel',
            'ticc_title_excel_sheet_name': 'Вагоны',
            'ticc_title_button_field': 'Поля',
            'ticc_title_button_field_select': 'Выбрать',
            'ticc_title_button_field_view_all': 'Показать все',
            'ticc_title_button_field_clear': 'Сбросить',
            'ticc_title_button_hand_arrival_sostav': 'Принять состав',
            'ticc_title_button_cancel_arrival_sostav': 'Отмена приема на АМКР',
            'ticc_form_cancel_arrival_sostav': 'Отменить прием на АМКР',
            'ticc_form_return_message_cancel_arrival_sostav': 'Вы хотите отменить прием состава {0} принятого на АМКР {1}? Внимание! Данная операция будет возможна если все вагоны состава не перемещались.',
            'ticc_mess_run_operation_cancel_arrival_sostav': 'Выполняю операцию "ОТМЕНА ПРИЕМА СОСТАВА НА АМКР"',
            'ticc_mess_cancel_operation_cancel_arrival_sostav': 'Отмена выполнения операции "ОТМЕНА ПРИЕМА СОСТАВА НА АМКР"',


            'ticc_mess_init_module': 'Инициализация модуля (table_incoming_cars)...',
            'ticc_mess_load_sostav': 'Загружаю вагоны...',
            'ticc_mess_update_sostav': 'Обновляю вагоны...',
            'ticc_mess_view_sostav': 'Показываю составы...',
            'ticc_mess_run_operation': 'Выполняю операцию...',
            'ticc_mess_warning_id_sostav_null': 'Операция недопустима состав не выбран!',
            'ticc_mess_warning_sostav_status_4': 'Операция недопустима состав отклонён!',
            'ticc_mess_warning_sostav_status_5': 'Операция недопустима, состав не имеет статус «в работе» или «предъявлен»!',
            'ticc_mess_warning_sostav_status_6': 'Операция недопустима, состав не имеет статус «в работе»!',
            'ticc_mess_error_sostav_null': 'Состав по id:{0} не найден!',
            'ticc_mess_ok_operation_return_present': 'Операция "Предъявить состав на УЗ" - выполнена',
            'ticc_mess_update_operation_return_present': 'Информация об операция "Предъявить состав на УЗ" - обновлена',
            'ticc_mess_error_operation_return_present': 'Ошибка выполнения операции "Предъявить состав на УЗ", статус выполнения не определён!',
            'ticc_mess_ok_operation_outgoing_dislocation': 'Операция "Сменить дислокацию предъявленного состава" - выполнена',
            'ticc_mess_error_operation_outgoing_dislocation': 'Ошибка выполнения операции "Сменить дислокацию предъявленного состава"',
            'ticc_mess_ok_operation_incoming_sostav': 'Операция "ПРИНЯТЬ СОСТАВ НА АМКР" - выполнена',
            'ticc_mess_error_operation_incoming_sostav': 'Ошибка выполнения операции "ПРИНЯТЬ СОСТАВ НА АМКР"',
            'ticc_mess_ok_operation_cancel_arrival_sostav': 'Операция "ОТМЕНА ПРИЕМА СОСТАВА НА АМКР" - выполнена',
            'ticc_mess_error_operation_cancel_arrival_sostav': 'Ошибка выполнения операции "ОТМЕНА ПРИЕМА СОСТАВА НА АМКР"',
        },
        'en':  //default language: English
        {
            'ticc_field_arrival_car_id': 'car id',
            'ticc_field_arrival_car_position_arrival': 'Pos#',
            'ticc_field_num': 'car number',
            'ticc_field_arrival_uz_document_nom_doc': 'Document no. inc.',
            'ticc_field_arrival_uz_document_nom_main_doc': 'main no. inc.',
            'ticc_field_arrival_uz_vagon_wagon_adm': 'Admin Code',
            'ticc_field_arrival_uz_vagon_wagon_adm_name': 'Atm.',
            'ticc_field_arrival_uz_vagon_wagon_adm_abbr': 'Atm.',
            'ticc_field_arrival_uz_vagon_rod': 'Code Rod.',
            'ticc_field_arrival_uz_vagon_rod_name': 'Rod.',
            'ticc_field_arrival_uz_vagon_rod_abbr': 'Rod.',
            'ticc_field_arrival_uz_vagon_gruzp': 'GP,t.',
            'ticc_field_arrival_uz_vagon_wagon_kol_os': 'Ticc_field_arrival_uz_vagon_wagon_kol_os',
            'ticc_field_arrival_uz_vagon_wagon_usl_tip': 'Ticc Type',
            'ticc_field_arrival_uz_vagon_u_tara': 'Tara (ut.),t.',
            'ticc_field_arrival_uz_vagon_ves_tary_arc': 'Tara, t.',
            'ticc_field_arrival_uz_vagon_wagon_date_rem_uz': 'Rem. UZ',
            'ticc_field_arrival_uz_vagon_wagon_date_rem_vag': 'Rem. railway carriage',
            'ticc_field_arrival_uz_vagon_owner_wagon': 'Owner',
            'ticc_field_arrival_uz_vagon_owner_wagon_abbr': 'Owner',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_id_operator': 'operator id on dispatch',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_operators': 'Dispatch Operator',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_operator_abbr': 'Dispatch Operator',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_start': 'Op. by desp. early rent',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_end': 'Op. by desp. con. rent',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_operator_paid': 'Op. by desp. paid',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_id_limiting': 'id limiting on dispatch',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_limiting_name': ' on dispatch',
            'ticc_field_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr': ' on dispatch',

            'ticc_field_arrival_uz_vagon_condition_name': 'Restrict. on dispatch',
            'ticc_field_arrival_uz_vagon_condition_abbr': 'Size. by arb.',
            'ticc_field_arrival_uz_document_code_stn_from': 'Stn. desp.',
            'ticc_field_arrival_uz_document_station_from_name': 'St. desp.',
            'ticc_field_arrival_uz_document_code_stn_to': 'Code Art. approx.',
            'ticc_field_arrival_uz_document_station_to_name': 'Ticc. arr.',
            'ticc_field_arrival_uz_document_code_border_checkpoint': 'Ticc_field_arrival_uz_document_code_border_checkpoint per.',
            'ticc_field_arrival_uz_document_border_checkpoint_station_name': 'Tick. per.',
            'ticc_field_arrival_uz_document_cross_time': 'Tick. burial per.',
            'ticc_field_arrival_uz_document_code_shipper': 'Code gr. desp.',
            'ticc_field_arrival_uz_document_shipper_name': 'Gr. desp.',
            'ticc_field_arrival_uz_document_code_consignee': 'Code. gr. floor.',
            'ticc_field_arrival_uz_document_name_consignee': 'Code. gr. floor.',
            'ticc_field_arrival_uz_document_code_payer_sender': 'Code. sq. desp.',
            'ticc_field_arrival_uz_document_payer_sender_name': 'Pl. desp.',
            'ticc_field_arrival_uz_document_distance_way': 'Tar. diss.',
            'ticc_field_arrival_uz_vagon_vesg': 'Weight. gr.',
            'ticc_field_arrival_uz_vagon_cargo_name': 'Cargo',
            'ticc_field_arrival_uz_vagon_cargo_group_name': 'Cargo group',
            'ticc_field_arrival_uz_vagon_station_amkr_name': 'Ticc_field_arrival_uz_vagon_station_amkr_name',
            'ticc_field_arrival_uz_vagon_station_amkr_abbr': 'Ticc_field_arrival_uz_vagon_station_amkr_abbr',
            'ticc_field_arrival_uz_vagon_division_code': 'Workshop Code',
            'ticc_field_arrival_uz_vagon_name_division': 'Ticc_field_arrival_uz_vagon_name_division',
            'ticc_field_arrival_uz_vagon_division_abbr': 'Ticc_field_arrival_uz_vagon_division_abbr',
            'ticc_field_arrival_uz_vagon_commercial_condition': 'Commercial condition',
            'ticc_field_arrival_uz_vagon_sertification_data': 'Cert. data',

            'ticc_title_yes': 'Yes',
            'ticc_title_all': 'All',
            'ticc_title_not_epd': 'No EPD',
            'ticc_title_for_loading': 'Ticc_title_for_loading',

            'ticc_title_button_export': 'Export',
            'ticc_title_button_buffer': 'Buffer',
            'ticc_title_button_excel': 'Excel',
            'ticc_title_excel_sheet_name': 'Wagons',
            'ticc_title_button_field': 'Fields',
            'ticc_title_button_field_select': 'Select',
            'ticc_title_button_field_view_all': 'Show All',
            'ticc_title_button_field_clear': 'Reset',
            'ticc_title_button_hand_arrival_sostav': 'Accept composition',
            'ticc_title_button_cancel_arrival_sostav': 'Cancel ACR Acceptance',
            'ticc_form_cancel_arrival_sostav': 'Cancel AMCR Acceptance',
            'ticc_form_return_message_cancel_arrival_sostav': 'Do you want to cancel train {0} received at AMC {1}? Attention! This operation will be possible if all wagons of the train did not move.',
            'ticc_mess_run_operation_cancel_arrival_sostav': 'Performing the operation "CANCEL ACCEPTANCE OF AMERICAN COMPOSITION"',
            'ticc_mess_cancel_operation_cancel_arrival_sostav': 'Cancellation of the operation "CANCEL ACCEPTANCE OF AMERICAN STRUCTURE"',

            'ticc_mess_init_module': 'Initializing module (table_incoming_cars)...',
            'ticc_mess_load_sostav': 'Loading wagons...',
            'ticc_mess_update_sostav': 'Updating wagons...',
            'ticc_mess_view_sostav': 'Showing lineups...',
            'ticc_mess_run_operation': 'Running operation...',
            'ticc_mess_warning_id_sostav_null': 'Operation invalid no composition selected!',
            'ticc_mess_warning_sostav_status_4': 'Operation invalid composition rejected!',
            'ticc_mess_warning_sostav_status_5': 'Operation is invalid, the composition does not have the status " in progress" or "submitted"!',
            'ticc_mess_warning_sostav_status_6': 'Operation is invalid, the composition is not in progress!',
            'ticc_mess_error_sostav_null': 'Composition by id:{0} not found!',
            'ticc_mess_ok_operation_return_present': 'Operation "Present Composition to OZ" completed',
            'ticc_mess_update_operation_return_present': 'Information about the operation "Present the composition on the OZ" - updated',
            'ticc_mess_error_operation_return_present': 'Error performing operation "Present composition to OC", execution status undefined!',
            'ticc_mess_ok_operation_outgoing_dislocation': 'Operation "Change the location of the presented composition" - completed',
            'ticc_mess_error_operation_outgoing_dislocation': 'Error executing the operation "Change the location of the submitted composition"',
            'ticc_mess_ok_operation_incoming_sostav': 'Operation "ACCEPT COMPOSITION TO AMKR" completed',
            'ticc_mess_error_operation_incoming_sostav': 'Error performing operation "ACCEPT COMPOSITION TO AMKR"',
            'ticc_mess_ok_operation_cancel_arrival_sostav': 'Operation "CANCEL ACCEPTANCE OF AMERICAN COMPOSITION" completed',
            'ticc_mess_error_operation_cancel_arrival_sostav': 'Error performing operation "CANCEL ACCEPTANCE OF AMERICAN COMPOSITION"',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var FHIIGS = App.form_hi_incoming_sostav; // форма Добавления и изменения состава
    //var FHDOGS = App.form_hd_outgoing_sostav; // форма перенести состав

    // Перечень полей
    var list_collums = [
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
            field: 'id',
            data: function (row, type, val, meta) {
                return row.arrival_car_id;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_car_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_car_position_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_car_position_arrival;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_car_position_arrival', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Документы накладных УЗ
        {
            field: 'arrival_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_main_doc < 0 ? langView('ticc_title_not_epd', App.Langs) : row.arrival_uz_document_nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_nom_main_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Администрация по отправке
        {
            field: 'arrival_uz_vagon_wagon_adm',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_wagon_adm_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_wagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_wagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_wagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_wagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ticc_field_arrival_uz_vagon_wagon_adm_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Род по отправке
        {
            field: 'arrival_uz_vagon_rod',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_rod;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_rod_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_rod_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ticc_field_arrival_uz_vagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Грузоподъемность
        {
            field: 'arrival_uz_vagon_gruzp',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_gruzp;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_gruzp', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Кол. осей
        {
            field: 'arrival_uz_vagon_wagon_kol_os',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_kol_os;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_wagon_kol_os', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тип цистерны
        {
            field: 'arrival_uz_vagon_wagon_usl_tip',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_usl_tip;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_wagon_usl_tip', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'arrival_uz_vagon_u_tara',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_u_tara ? Number(Number(row.arrival_uz_vagon_u_tara) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_u_tara', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'arrival_uz_vagon_ves_tary_arc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_ves_tary_arc ? Number(Number(row.arrival_uz_vagon_ves_tary_arc) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_ves_tary_arc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Ремонт УЗ и вагон
        {
            field: 'arrival_uz_vagon_wagon_date_rem_uz',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_date_rem_uz ? moment(row.arrival_uz_vagon_wagon_date_rem_uz).format(format_date) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ticc_field_arrival_uz_vagon_wagon_date_rem_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_wagon_date_rem_vag',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_date_rem_vag ? moment(row.arrival_uz_vagon_wagon_date_rem_vag).format(format_date) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ticc_field_arrival_uz_vagon_wagon_date_rem_vag', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник
        {
            field: 'arrival_uz_vagon_owner_wagon',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ticc_field_arrival_uz_vagon_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
        // Оператор
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_start ? moment(row.arrival_uz_vagon_arrival_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_end ? moment(row.arrival_uz_vagon_arrival_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_operator_paid ? langView('ticc_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        //Ограничение
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_arrival_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'arrival_uz_vagon_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция отправления
        {
            field: 'arrival_uz_document_code_stn_from',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_from;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_code_stn_from', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_station_from_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_document_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция прибытия
        {
            field: 'arrival_uz_document_code_stn_to',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_to;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_code_stn_to', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_station_to_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_to_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_document_station_to_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Погран переход
        {
            field: 'arrival_uz_document_code_border_checkpoint',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_border_checkpoint;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_code_border_checkpoint', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_border_checkpoint_station_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_border_checkpoint_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_document_border_checkpoint_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_cross_time',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_cross_time ? moment(row.arrival_uz_document_cross_time).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ticc_field_arrival_uz_document_cross_time', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузоотправитель
        {
            field: 'arrival_uz_document_code_shipper',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_shipper;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_code_shipper', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_shipper_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_shipper_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ticc_field_arrival_uz_document_shipper_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузополучатель
        {
            field: 'arrival_uz_document_code_consignee',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_consignee;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_code_consignee', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_name_consignee',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_name_consignee;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ticc_field_arrival_uz_document_name_consignee', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Платильщик по отправлению
        {
            field: 'arrival_uz_document_code_payer_sender',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_payer_sender;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_code_payer_sender', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_payer_sender_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_payer_sender_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ticc_field_arrival_uz_document_payer_sender_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Тарифное расстояние
        {
            field: 'arrival_uz_document_distance_way',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_distance_way;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_document_distance_way', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Вес
        {
            field: 'arrival_uz_vagon_vesg',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg ? Number(Number(row.arrival_uz_vagon_vesg) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Груз
        {
            field: 'arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения АМКР        
        {
            field: 'arrival_uz_vagon_station_amkr_name',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_station_on_amkr !== null ? row['arrival_uz_vagon_station_amkr_name_' + App.Lang] : langView('ticc_title_for_loading', App.Langs);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_station_on_amkr !== null ? row['arrival_uz_vagon_station_amkr_abbr_' + App.Lang] : langView('ticc_title_for_loading', App.Langs);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Цех получатель
        {
            field: 'arrival_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('ticc_field_arrival_uz_vagon_division_code', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ticc_field_arrival_uz_vagon_name_division', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком состояние
        {
            field: 'arrival_uz_vagon_commercial_condition',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_commercial_condition_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_commercial_condition', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком сертиыикационные данные
        {
            field: 'arrival_uz_vagon_sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ticc_field_arrival_uz_vagon_sertification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('ticc_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('ticc_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('ticc_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('ticc_title_excel_sheet_name', App.Langs),
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
            text: langView('ticc_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('ticc_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('ticc_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('ticc_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'hand_arrival_sostav',
            text: langView('ticc_title_button_hand_arrival_sostav', App.Langs),
            enabled: false
        },
        {
            button: 'hand_cancel_arrival_sostav',
            text: langView('ticc_title_button_cancel_arrival_sostav', App.Langs),
            enabled: false
        },
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        }
    ];
    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function table_incoming_cars(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$cars_sostav = $(selector);
        if (this.$cars_sostav.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$cars_sostav.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_incoming_cars.prototype.init_columns_detali = function () {
        var collums = [];
        //collums.push('id');
        return init_columns(collums, list_collums);
    };
    // инициализация полей incoming_cars
    table_incoming_cars.prototype.init_columns_incoming_cars = function () {
        var collums = [];
        //collums.push({ field: 'id', title: null, class: null });
        collums.push({ field: 'arrival_car_position_arrival', title: null, class: 'fixed-column' });
        collums.push({ field: 'arrival_uz_document_nom_main_doc', title: null, class: 'fixed-column' });
        collums.push({ field: 'arrival_uz_document_nom_doc', title: null, class: 'fixed-column' });
        collums.push({ field: 'num', title: null, class: 'fixed-column' });
        collums.push({ field: 'arrival_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_gruzp', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_wagon_kol_os', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_wagon_usl_tip', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_ves_tary_arc', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_u_tara', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_wagon_date_rem_uz', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_wagon_date_rem_vag', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_arrival_wagons_rent_limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_arrival_wagons_rent_start', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_condition_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_code_stn_from', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_station_from_name', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_code_stn_to', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_station_to_name', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_code_border_checkpoint', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_border_checkpoint_station_name', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_cross_time', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_code_shipper', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_shipper_name', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_code_consignee', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_name_consignee', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_code_payer_sender', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_payer_sender_name', title: null, class: null });
        collums.push({ field: 'arrival_uz_document_distance_way', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_vesg', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_station_amkr_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_commercial_condition', title: null, class: null });
        collums.push({ field: 'arrival_uz_vagon_sertification_data', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_incoming_cars.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок incoming_sostav
    table_incoming_cars.prototype.init_button_incoming_cars = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'hand_arrival_sostav',
            action: function (e, dt, node, config) {
                this.action_hand_arrival_sostav(); // выполнить операцию "Принять состав"
            }.bind(this)
        });
        buttons.push({
            name: 'hand_cancel_arrival_sostav',
            action: function (e, dt, node, config) {
                this.action_hand_cancel_arrival_sostav(); // выполнить операцию "Оменить принятие состава"
            }.bind(this)
        });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_incoming_cars.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'incoming_cars': {
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 4;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_incoming_cars();
                this.table_buttons = this.init_button_incoming_cars();
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
    table_incoming_cars.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('ticc_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_select_rows: null,
            fn_init: null,
            fn_refresh: null,
        }, options);
        //
        this.id_outgoing_car = null
        this.id_sostav = null;              // Выбранный состав
        this.wagons = [];                   // Список составов
        this.select_rows_wagons = null;     // Выбранный состав

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        // Запускаем 2 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                var MCF = App.modal_confirm_form;
                this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
                this.modal_confirm_form.init();
                //----------------------------------
                // Создать макет таблицы
                // Создадим и добавим макет таблицы
                var table_cars = new this.fc_ui.el_table('tab-oc-' + this.selector, 'display compact cell-border row-border hover');
                this.$table_cars = table_cars.$element;
                this.$cars_sostav.addClass('table-report-operation').append(this.$table_cars);
                // Инициализируем таблицу
                this.obj_t_cars = this.$table_cars.DataTable({
                    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ticc_title_all', App.Langs)]],
                    "pageLength": -1,
                    "deferRender": true,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    colReorder: true,                       // вкл. перетаскивание полей
                    fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
                    fixedColumns: {
                        leftColumns: this.leftColumns,
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
                        $(row).attr('id', data.outgoing_car_id); // id строки

                    }.bind(this),
                    columns: this.table_columns,
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: this.table_buttons,
                });
                // Обработка события выбора
                switch (this.settings.type_report) {
                    case 'incoming_cars': {
                        this.obj_t_cars.on('select deselect', function (e, dt, type, indexes) {
                            this.select_rows(); // определим строку
                            this.enable_button();
                            // Обработать событие выбрана строка
                            if (typeof this.settings.fn_select_rows === 'function') {
                                this.settings.fn_select_rows(this.select_rows_wagons);
                            }
                        }.bind(this));

                        break;
                    };

                };
                //----------------------------------
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init(this.result_init);
                }
                //----------------------------------

            }
        }.bind(this);
        out_init(process); // Временно!
        // Форма принять или править состав ===============================================================================
        this.fhiigs = new FHIIGS();
        this.fhiigs.init({
            mode: 1,
            alert: this.settings.alert,
            ids_wsd: this.ids_wsd,
            fn_init: function (init) {
                // На проверку окончания инициализации
                //----------------------------------
                // На проверку окончания инициализации
                process--;
                out_init(process);
                //----------------------------------
            }.bind(this),
            fn_add: function (result) {

            }.bind(this),
            fn_edit: function (result) {
                //this.out_clear();
                this.action_refresh(function () {
                    if (result && result.result > 0) {
                        this.out_info(langView('ticc_mess_ok_operation_incoming_sostav', App.Langs));
                    } else {
                        this.out_info(langView('ticc_mess_error_operation_incoming_sostav', App.Langs));
                    }
                }.bind(this));
            }.bind(this),
        });
        ////
        //// Форма дислокации состав ===============================================================================
        //this.fhdogs = new FHDOGS();
        //this.fhdogs.init({
        //    alert: this.settings.alert,
        //    ids_wsd: this.ids_wsd,
        //    fn_init: function (init) {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    }.bind(this),
        //    fn_add: function (result) {

        //    }.bind(this),
        //    fn_edit: function (result) {
        //        this.update();
        //        this.out_clear();
        //        if (typeof this.settings.fn_refresh === 'function') {
        //            this.settings.fn_refresh();
        //        }
        //        if (result && result.data) {
        //            this.out_info(langView('ticc_mess_ok_operation_outgoing_dislocation', App.Langs));
        //        } else {
        //            this.out_info(langView('ticc_mess_error_operation_outgoing_dislocation', App.Langs));
        //        }
        //    }.bind(this),
        //});
    };
    //-------------------------------------------------------------------------------------------
    // обновим информацию об выбраных строках
    table_incoming_cars.prototype.select_clear = function () {
        this.obj_t_cars.rows({ selected: true }).deselect();
        this.obj_t_cars.draw();
    };
    // обновим информацию об выбраных строках
    table_incoming_cars.prototype.select_rows = function () {
        var index = this.obj_t_cars.rows({ selected: true });
        var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.select_rows_wagons = rows;
    };
    // Показать данные
    table_incoming_cars.prototype.view = function (data, id_arrival_car) {
        if (this.obj_t_cars) {
            this.id_arrival_car = id_arrival_car;
            this.out_clear();
            LockScreen(langView('ticc_mess_view_sostav', App.Langs));
            this.obj_t_cars.clear();

            this.obj_t_cars.rows.add(data);
            this.obj_t_cars.order(this.order_column);
            //this.obj_t_cars.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
            this.obj_t_cars.draw();
            if (id_arrival_car !== null) {
                this.id_arrival_car = id_arrival_car
                this.obj_t_cars.row('#' + this.id_arrival_car).select();
            } else {
                this.id_arrival_car = null;
            }
            this.select_rows();
            this.enable_button();
        };
    };
    // Показать данные
    table_incoming_cars.prototype.clear = function () {
        if (this.obj_t_cars) {
            this.obj_t_cars.clear();
            this.obj_t_cars.draw();
        };
    };
    // Загрузить составы по прибытию
    table_incoming_cars.prototype.load_incoming_cars_of_id_sostav = function (id_sostav, cb_load) {
        if (id_sostav !== null) {
            LockScreen(langView('ticc_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewIncomingCarsOfIDSostav(id_sostav, function (wagons) {
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
    // Обновим составы по прибытию
    table_incoming_cars.prototype.update = function (cb_load) {
        if (this.id_sostav !== null) {
            LockScreen(langView('ticc_mess_update_sostav', App.Langs));
            this.ids_wsd.getViewIncomingCarsOfIDSostav(this.id_sostav, function (wagons) {
                this.wagons = this.filter_wagons(wagons);
                LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.wagons);
                }
                //LockScreenOff();
            }.bind(this));
        } else {
            this.sostav = [];
            if (typeof cb_load === 'function') {
                cb_load(this.wagons);
            }
        }
    };
    // Отфильтровать вагоны
    table_incoming_cars.prototype.filter_wagons = function (wagons) {
        if (this.settings.type_report === 'incoming_cars') {
            // Сохраним отфильтрованый выбор(вагоны которые приняли)
            return wagons
                .filter(function (i) { return i.arrival_car_position_arrival !== null })
                .sort(function (a, b) { return a.arrival_car_position_arrival - b.arrival_car_position_arrival });
        } else {
            return wagons;
        }
    };
    // Отображение кнопки добавить
    table_incoming_cars.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            case 'incoming_cars': {
                if (this.wagons && this.wagons.length > 0) {
                    if (this.wagons[0].arrival_sostav_status === 1) {
                        this.obj_t_cars.button(2).enable(true);
                        this.obj_t_cars.button(3).enable(false);
                    } else {
                        if (this.wagons[0].arrival_sostav_status === 2) {
                            this.obj_t_cars.button(2).enable(false);
                            this.obj_t_cars.button(3).enable(true);
                        } else {
                            this.obj_t_cars.button(2).enable(false);
                            this.obj_t_cars.button(3).enable(false);
                        }
                    }
                } else {
                    this.obj_t_cars.button(2).enable(false);
                    this.obj_t_cars.button(3).enable(false);
                }
                break;
            };
        };
    };
    // Выполнить операцию обновить
    table_incoming_cars.prototype.action_refresh = function (cb_refresh) {
        this.out_clear();
        // Перезагрузка полная
        if (typeof this.settings.fn_refresh === 'function') {
            this.settings.fn_refresh(function () {
                if (typeof cb_refresh === 'function') {
                    cb_refresh();
                }
            }.bind(this));
        } else {
            // Перезагрузка вагонов слева
            this.update(function (wagons) {
                this.view(wagons, this.id_station, this.id_sostav);
                LockScreenOff();
                if (typeof cb_refresh === 'function') {
                    cb_refresh();
                }
            }.bind(this));
        }

    };
    // Выполнить операцию Принять состав
    table_incoming_cars.prototype.action_hand_arrival_sostav = function () {
        this.out_clear();
        LockScreen(langView('ticc_mess_run_operation', App.Langs));
        if (this.id_sostav !== null) {
            this.ids_wsd.getIncomingSostavOfID(this.id_sostav, function (sostav) {
                if (sostav) {
                    if (sostav.status < 3) {
                        if (sostav.status == 2) {
                            // Сдать состав
                            LockScreenOff();
                            this.fhiigs.add(sostav);
                        } else {
                            // Править сданный состав
                            LockScreenOff();
                            this.fhiigs.edit(sostav);
                        };
                    } else {
                        // Ошибка, состав откланен 
                        this.out_warning(langView('ticc_mess_warning_sostav_status_4', App.Langs).format(this.id_sostav));
                        LockScreenOff();
                    };
                } else {
                    // Ошибка, состав не найден 
                    this.out_warning(langView('ticc_mess_error_sostav_null', App.Langs).format(this.id_sostav));
                    LockScreenOff();
                };
            }.bind(this));

        } else {
            // Ошибка id не определено
            this.out_warning(langView('ticc_mess_warning_id_sostav_null', App.Langs));
            LockScreenOff();
        }
    };
    // Выполнить операцию отмена
    table_incoming_cars.prototype.action_hand_cancel_arrival_sostav = function () {
        this.out_clear();
        LockScreen(langView('ticc_mess_run_operation', App.Langs));
        if (this.id_sostav !== null) {
            this.ids_wsd.getIncomingSostavOfID(this.id_sostav, function (sostav) {
                if (sostav) {
                    if (sostav.status < 3) {
                        if (sostav.status == 2) {
                            LockScreenOff();
                            this.modal_confirm_form.view(langView('ticc_form_cancel_arrival_sostav', App.Langs), langView('ticc_form_return_message_cancel_arrival_sostav', App.Langs).format(sostav.composition_index, sostav.date_adoption.format(format_datetime)), function (res) {
                                if (res) {
                                    // Выполнить операцию
                                    LockScreen(langView('ticc_mess_run_operation_cancel_arrival_sostav', App.Langs));
                                    // Подготовим операцию
                                    var operation_cancel = {
                                        id_arrival_sostav: this.id_sostav,
                                        user: App.User_Name,
                                    };
                                    // Выполним предъявить
                                    this.ids_wsd.postOperationCancelIncomingSostav(operation_cancel, function (result_operation) {
                                        this.action_refresh(function () {
                                            if (result_operation > 0) {
                                                this.out_info(langView('ticc_mess_ok_operation_cancel_arrival_sostav', App.Langs));
                                            } else {
                                                this.out_info(langView('ticc_mess_error_operation_cancel_arrival_sostav', App.Langs));
                                            }
                                        }.bind(this));
                                    }.bind(this));
                                } else {
                                    // Отмена операции
                                    this.out_warning(langView('ticc_mess_cancel_operation_cancel_arrival_sostav', App.Langs).format(this.id_sostav));
                                    LockScreenOff();
                                }
                            }.bind(this));
                        } else {
                            // Ошибка, состав откланен 
                            this.out_warning(langView('ticc_mess_warning_sostav_status_6', App.Langs).format(this.id_sostav));
                            LockScreenOff();
                        };
                    } else {
                        // Ошибка, состав откланен 
                        this.out_warning(langView('ticc_mess_warning_sostav_status_4', App.Langs).format(this.id_sostav));
                        LockScreenOff();
                    };
                } else {
                    // Ошибка, состав не найден 
                    this.out_warning(langView('ticc_mess_error_sostav_null', App.Langs).format(this.id_sostav));
                    LockScreenOff();
                };
            }.bind(this));

        } else {
            // Ошибка id не определено
            this.out_warning(langView('ticc_mess_warning_id_sostav_null', App.Langs));
            LockScreenOff();
        }




        //this.out_clear();
        //LockScreen(langView('ticc_mess_run_operation', App.Langs));
        //if (this.id_sostav !== null) {
        //    this.ids_wsd.getOutgoingSostavOfIDSostav(this.id_sostav, function (sostav) {
        //        if (sostav) {
        //            if (sostav.status === 1 || sostav.status === 2) {
        //                var hand_dislocation = {
        //                    reverse: false,
        //                    side: 0,
        //                    id_station: sostav.id_station_from,
        //                    id_way: sostav.id_way_from,
        //                    wagons: this.wagons,
        //                    locomotive1: null,
        //                    locomotive2: null,
        //                    time_aplly: null
        //                };
        //                this.fhdogs.edit(hand_dislocation);
        //                LockScreenOff();
        //            } else {
        //                // Ошибка, состав откланен 
        //                this.out_warning(langView('ticc_mess_warning_sostav_status_5', App.Langs).format(this.id_sostav));
        //                LockScreenOff();
        //            };
        //        } else {
        //            // Ошибка, состав не найден 
        //            this.out_warning(langView('ticc_mess_error_sostav_null', App.Langs).format(this.id_sostav));
        //            LockScreenOff();
        //        };
        //    }.bind(this));

        //} else {
        //    // Ошибка id не определено
        //    this.out_warning(langView('ticc_mess_warning_id_sostav_null', App.Langs));
        //    LockScreenOff();
        //}
    };
    // Загрузить составы прибывающие на станцию 
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_incoming_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_incoming_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_incoming_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_incoming_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_incoming_cars.prototype.destroy = function () {
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Уберем модуль Форма "Предъявить состав"
        if (this.fhoogs) {
            this.fhoogs.destroy();
            this.fhoogs = null;
        }
        // Очистить таблицы
        if (this.obj_t_cars) {
            this.obj_t_cars.destroy(true);
            this.obj_t_cars = null;
        }

        this.$cars_sostav.empty(); // empty in case the columns change
    }

    App.table_incoming_cars = table_incoming_cars;

    window.App = App;
})(window);