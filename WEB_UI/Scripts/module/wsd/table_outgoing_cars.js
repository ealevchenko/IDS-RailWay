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
            'togc_field_outgoing_car_id': 'id вагона',
            'togc_field_outgoing_car_position_outgoing': '№ поз.',
            'togc_field_num': '№ вагона',
            'togc_field_outgoing_uz_document_nom_doc': '№ накл.',
            'togc_field_outgoing_uz_vagon_cargo_name': 'Груз',
            'togc_field_outgoing_uz_vagon_cargo_group_name': 'Груз',
            'togc_field_outgoing_uz_vagon_to_station_uz_name': 'Станция назначения',
            'togc_field_outgoing_uz_vagon_wagon_adm': 'Код Адм.',
            'togc_field_outgoing_uz_vagon_adm_name': 'Адм.',
            'togc_field_outgoing_uz_vagon_adm_abbr': 'Адм.',
            'togc_field_outgoing_uz_vagon_rod': 'Код Род.',
            'togc_field_outgoing_uz_vagon_rod_name': 'Род.',
            'togc_field_outgoing_uz_vagon_rod_abbr': 'Род.',
            'togc_field_outgoing_uz_vagon_division_code': 'Шифр Цех',
            'togc_field_outgoing_uz_vagon_name_division': 'Цех погр.',
            'togc_field_outgoing_uz_vagon_division_abbr': 'Цех погр.',
            'togc_field_outgoing_uz_vagon_owner_wagon': 'Собственник',
            'togc_field_outgoing_uz_vagon_owner_wagon_abbr': 'Собственник',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_id_operator': 'id Опер. по отправке',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operators': 'Оператор по отправке',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr': 'Оператор по отправке',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_start': 'Опер. по отпр. нач. аренды',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_end': 'Опер. по отпр. кон. аренды',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid': 'Опер. по отпр. платный',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting': 'id Огран. по отправке',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name': 'Огран. по отправке',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr': 'Огран. по отправке',
            'togc_title_yes': 'Да',
            'togc_title_all': 'Все',
            'togc_title_button_export': 'Экспорт',
            'togc_title_button_buffer': 'Буфер',
            'togc_title_button_excel': 'Excel',
            'togc_title_excel_sheet_name': 'Вагоны',
            'togc_title_button_field': 'Поля',
            'togc_title_button_field_select': 'Выбрать',
            'togc_title_button_field_view_all': 'Показать все',
            'togc_title_button_field_clear': 'Сбросить',
            'togc_title_button_hand_over_sostav': 'Сдать состав',
            'togc_title_button_dislocation_over_sostav': 'Перем. состав',
            'togc_title_button_update_doc_uz': 'Обн.ЭПД',
            'togc_mess_init_module': 'Инициализация модуля (table_outgoing_cars)...',
            'togc_mess_load_sostav': 'Загружаю вагоны...',
            'togc_mess_update_sostav': 'Обновляю вагоны...',
            'togc_mess_view_sostav': 'Показываю составы...',
            'togc_mess_run_operation': 'Выполняю операцию...',
            'togc_mess_warning_id_sostav_null': 'Операция недопустима состав не выбран!',
            'togc_mess_warning_sostav_status_4': 'Операция недопустима состав отклонён!',
            'togc_mess_warning_sostav_status_5': 'Операция недопустима, состав не имеет статус «в работе» или «предъявлен»!',
            'togc_mess_warning_sostav_status_6': 'Операция недопустима, состав не имеет статус «отправлен»!',
            'togc_mess_error_sostav_null': 'Состав по id:{0} не найден!',
            'togc_mess_ok_operation_return_present': 'Операция "Предъявить состав на УЗ" - выполнена',
            'togc_mess_update_operation_return_present': 'Информация об операция "Предъявить состав на УЗ" - обновлена',
            'togc_mess_error_operation_return_present': 'Ошибка выполнения операции "Предъявить состав на УЗ", статус выполнения не определён!',
            'togc_mess_ok_operation_outgoing_dislocation': 'Операция "Сменить дислокацию предъявленного состава" - выполнена',
            'togc_mess_error_operation_outgoing_dislocation': 'Ошибка выполнения операции "Сменить дислокацию предъявленного состава"',
            'togc_mess_error_update_epd': 'Ошибка выполнения операции "Обновить ЭПД по отправленному составу", код ошибки :{0}',
            'togc_mess_ok_update_epd': 'Операция "Обновить ЭПД по отправленному составу" - выполнена, обновленно :{0} вагонов.',
        },
        'en':  //default language: English
        {
            'togc_field_outgoing_car_id': 'car id',
            'togc_field_outgoing_car_position_outgoing': 'Pos#',
            'togc_field_num': 'car number',
            'togc_field_outgoing_uz_document_nom_doc': 'inc#',
            'togc_field_outgoing_uz_vagon_cargo_group_name': 'Cargo',
            'togc_field_outgoing_uz_vagon_to_station_uz_name': 'Destination Station',
            'togc_field_outgoing_uz_vagon_wagon_adm': 'Admin Code',
            'togc_field_outgoing_uz_vagon_adm_name': 'Adm.',
            'togc_field_outgoing_uz_vagon_adm_abbr': 'Adm.',
            'togc_field_outgoing_uz_vagon_rod': 'Rod Code',
            'togc_field_outgoing_uz_vagon_rod_name': 'Rod',
            'togc_field_outgoing_uz_vagon_rod_abbr': 'Rod',
            'togc_field_outgoing_uz_vagon_division_code': 'Workshop Code',
            'togc_field_outgoing_uz_vagon_name_division': 'Togc_field_outgoing_uz_vagon_name_division',
            'togc_field_outgoing_uz_vagon_division_abbr': 'Togc_field_outgoing_uz_vagon_division_abbr',
            'togc_field_outgoing_uz_vagon_owner_wagon': 'Owner',
            'togc_field_outgoing_uz_vagon_owner_wagon_abbr': 'Owner',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_id_operator': 'operator id on dispatch',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operators': 'Dispatch Operator',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr': 'Dispatch Operator',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_start': 'Oper. by desp. early rent',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_end': 'Oper. by desp. con. rent',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid': 'Op. by desp. paid',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting': 'id limiting on dispatch',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name': 'Limited. on dispatch',
            'togc_field_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr': 'Limited. on dispatch',
            'togc_title_yes': 'Yes',
            'togc_title_all': 'All',
            'togc_title_button_export': 'Export',
            'togc_title_button_buffer': 'Buffer',
            'togc_title_button_excel': 'Excel',
            'togc_title_excel_sheet_name': 'Wagons',
            'togc_title_button_field': 'Fields',
            'togc_title_button_field_select': 'Select',
            'togc_title_button_field_view_all': 'Show All',
            'togc_title_button_field_clear': 'Reset',
            'togc_title_button_hand_over_sostav': 'Hand Over Composition',
            'togc_title_button_dislocation_over_sostav': 'Wagon Disloc.',
            'togc_title_button_update_doc_uz': 'Upd.ESD',
            'togc_mess_init_module': 'Initiating module...',
            'togc_mess_load_sostav': 'Loading wagons...',
            'togc_mess_update_sostav': 'Updating wagons...',
            'togc_mess_view_sostav': 'Showing lineups...',
            'togc_mess_run_operation': 'Running operation...',
            'togc_mess_warning_id_sostav_null': 'Operation invalid no composition selected!',
            'togc_mess_warning_sostav_status_4': 'Operation invalid composition rejected!',
            'togc_mess_warning_sostav_status_5': 'Operation is invalid, composition does not have status "in progress" or "submitted"!',
            'togc_mess_warning_sostav_status_6': 'Operation is invalid, the composition does not have status "sent"!',
            'togc_mess_error_sostav_null': 'Composition by id:{0} not found!',
            'togc_mess_ok_operation_return_present': 'Operation "Present composition to OC" - completed',
            'togc_mess_update_operation_return_present': 'Information about the operation "Present Composition at OZ" - updated',
            'togc_mess_error_operation_return_present': 'Error executing the operation "Present composition to OC", execution status is undefined!',
            'togc_mess_error_update_epd': 'Error performing operation "Update EPD by sent train", error code :{0}',
            'togc_mess_ok_update_epd': 'Operation "Update EPD by sent train" - completed, updated :{0} cars',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var FHOOGS = App.form_ho_outgoing_sostav; // форма отправить состав
    var FHDOGS = App.form_hd_outgoing_sostav; // форма перенести состав

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
                return row.outgoing_car_id;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_car_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('togc_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_car_position_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing_car_position_outgoing;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_car_position_outgoing', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_to_station_uz_name',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_to_station_uz_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_to_station_uz_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения основное поле по документу САП если пусто тогда по ручному вводу
        {
            field: 'outgoing_to_station_uz_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_station_to_name_' + App.Lang] !== null && row['outgoing_uz_document_station_to_name_' + App.Lang] !== '' ? row['outgoing_uz_document_station_to_name_' + App.Lang] : row.outgoing_uz_vagon_to_station_uz_name;
                //return row.sap_outgoing_supply_destination_station_name !== null && row.sap_outgoing_supply_destination_station_name !== '' ? row.sap_outgoing_supply_destination_station_name : row.outgoing_uz_vagon_to_station_uz_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_to_station_uz_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Администрация по отправке
        {
            field: 'outgoing_uz_vagon_wagon_adm',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_uz_vagon_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_adm_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('togc_field_outgoing_uz_vagon_adm_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Род по отправке
        {
            field: 'outgoing_uz_vagon_rod',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_rod;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_uz_vagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_rod_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_rod_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('togc_field_outgoing_uz_vagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Цех отправитель
        {
            field: 'outgoing_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_uz_vagon_division_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_name_division', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник
        {
            field: 'outgoing_uz_vagon_owner_wagon',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('togc_field_outgoing_uz_vagon_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ОПЕРАТОР ПО ОТПРАВКЕ [IDS].[Directory_OperatorsWagons]
        // Оператор
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_start ? moment(row.outgoing_uz_vagon_outgoing_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_end ? moment(row.outgoing_uz_vagon_outgoing_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_operator_paid ? langView('togc_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        //Ограничение
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('togc_field_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('togc_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('togc_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('togc_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('togc_title_excel_sheet_name', App.Langs),
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
            text: langView('togc_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('togc_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('togc_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('togc_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'hand_over_sostav',
            text: langView('togc_title_button_hand_over_sostav', App.Langs),
            enabled: true
        },
        {
            button: 'hand_dislocation_sostav',
            text: langView('togc_title_button_dislocation_over_sostav', App.Langs),
            enabled: true
        },
        {
            button: 'update_doc_uz',
            text: langView('togc_title_button_update_doc_uz', App.Langs),
            enabled: true
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
    function table_outgoing_cars(selector) {
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
    table_outgoing_cars.prototype.init_columns_detali = function () {
        var collums = [];
        //collums.push('id');
        return init_columns(collums, list_collums);
    };
    // инициализация полей outgoing_cars
    table_outgoing_cars.prototype.init_columns_outgoing_cars = function () {
        var collums = [];
        //collums.push({ field: 'id', title: null, class: null });
        collums.push({ field: 'outgoing_car_position_outgoing', title: null, class: 'fixed-column' });
        collums.push({ field: 'num', title: null, class: 'fixed-column' });
        collums.push({ field: 'outgoing_uz_document_nom_doc', title: null, class: 'fixed-column' });
        collums.push({ field: 'outgoing_uz_vagon_cargo_name', title: null, class: null });
        //collums.push({ field: 'outgoing_uz_vagon_cargo_group_name', title: null, class: null });
        //collums.push({ field: 'outgoing_uz_vagon_to_station_uz_name', title: null, class: null });
        collums.push({ field: 'outgoing_to_station_uz_name', title: null, class: null });
        collums.push({ field: 'outgoing_uz_vagon_wagon_adm', title: null, class: null });
        //collums.push({ field: 'outgoing_uz_vagon_adm_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_outgoing_cars.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок outgoing_sostav
    table_outgoing_cars.prototype.init_button_outgoing_cars = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'hand_over_sostav',
            action: function (e, dt, node, config) {
                this.action_hand_over_sostav_sostav(); // выполнить операцию
            }.bind(this)
        });
        buttons.push({
            name: 'hand_dislocation_sostav',
            action: function (e, dt, node, config) {
                this.action_hand_dislocation_sostav_sostav(); // выполнить операцию
            }.bind(this)
        });
        buttons.push({
            name: 'update_doc_uz',
            action: function (e, dt, node, config) {
                this.update_doc_uz(); // выполнить операцию
            }.bind(this)
        });
        //buttons.push({
        //    name: 'view_wagons',
        //    action: function (e, dt, node, config) {
        //        if (typeof this.settings.fn_action_view_wagons === 'function') {
        //            this.settings.fn_action_view_wagons(this.select_rows_wagons);
        //        }

        //    }.bind(this)
        //});
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
    table_outgoing_cars.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'outgoing_cars': {
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 3;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_outgoing_cars();
                this.table_buttons = this.init_button_outgoing_cars();
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
    table_outgoing_cars.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('togc_mess_init_module', App.Langs));
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
        var process = 2;
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
                    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('togc_title_all', App.Langs)]],
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
                    case 'outgoing_cars': {
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
        //
        // Форма отправить состав ===============================================================================
        this.fhoogs = new FHOOGS();
        this.fhoogs.init({
            alert: this.settings.alert,
            ids_wsd: this.ids_wsd,
            fn_init: function (init) {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            }.bind(this),
            fn_add: function (result) {

            }.bind(this),
            fn_edit: function (result) {
                this.update();
                this.out_clear();
                if (result && result.data) {
                    if (result.data.status < 2) {
                        this.out_info(langView('togc_mess_ok_operation_return_present', App.Langs));
                    } else {
                        this.out_info(langView('togc_mess_update_operation_return_present', App.Langs));
                    }
                } else {
                    this.out_info(langView('togc_mess_error_operation_return_present', App.Langs));
                }
            }.bind(this),
        });
        //
        // Форма дислокации состав ===============================================================================
        this.fhdogs = new FHDOGS();
        this.fhdogs.init({
            alert: this.settings.alert,
            ids_wsd: this.ids_wsd,
            fn_init: function (init) {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            }.bind(this),
            fn_add: function (result) {

            }.bind(this),
            fn_edit: function (result) {
                this.update();
                this.out_clear();
                if (typeof this.settings.fn_refresh === 'function') {
                    this.settings.fn_refresh();
                }
                if (result && result.data) {
                    this.out_info(langView('togc_mess_ok_operation_outgoing_dislocation', App.Langs));
                } else {
                    this.out_info(langView('togc_mess_error_operation_outgoing_dislocation', App.Langs));
                }
            }.bind(this),
        });
    };
    //-------------------------------------------------------------------------------------------
    // обновим информацию об выбраных строках
    table_outgoing_cars.prototype.select_clear = function () {
        this.obj_t_cars.rows({ selected: true }).deselect();
        this.obj_t_cars.draw();
    };
    // обновим информацию об выбраных строках
    table_outgoing_cars.prototype.select_rows = function () {
        var index = this.obj_t_cars.rows({ selected: true });
        var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.select_rows_wagons = rows;
    };
    // Показать данные
    table_outgoing_cars.prototype.view = function (data, id_outgoing_car) {
        if (this.obj_t_cars) {
            this.id_outgoing_car = id_outgoing_car;
            this.out_clear();
            LockScreen(langView('togc_mess_view_sostav', App.Langs));
            this.obj_t_cars.clear();

            this.obj_t_cars.rows.add(data);
            this.obj_t_cars.order(this.order_column);
            //this.obj_t_cars.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
            this.obj_t_cars.draw();
            if (id_outgoing_car !== null) {
                this.id_outgoing_car = id_outgoing_car
                this.obj_t_cars.row('#' + this.id_outgoing_car).select();
            } else {
                this.id_outgoing_car = null;
            }
            this.select_rows();
            this.enable_button();
        };
    };
    // Показать данные
    table_outgoing_cars.prototype.clear = function () {
        if (this.obj_t_cars) {
            this.obj_t_cars.clear();
            this.obj_t_cars.draw();
        };
    };
    // Загрузить составы по отправке
    table_outgoing_cars.prototype.load_outgoing_cars_of_id_sostav = function (id_sostav, cb_load) {
        if (id_sostav !== null) {
            LockScreen(langView('togc_mess_load_sostav', App.Langs));
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
    // Обновим составы по прибытию
    table_outgoing_cars.prototype.update = function (cb_load) {
        if (this.id_sostav !== null) {
            LockScreen(langView('togc_mess_update_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingCarsOfIDSostav(this.id_sostav, function (wagons) {
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
    table_outgoing_cars.prototype.filter_wagons = function (wagons) {
        if (this.settings.type_report === 'outgoing_cars') {
            // Сохраним отфильтрованый выбор(вагоны которые приняли)
            return wagons
                .filter(function (i) { return i.outgoing_car_position_outgoing !== null })
                .sort(function (a, b) { return a.outgoing_car_position_outgoing - b.outgoing_car_position_outgoing });
        } else {
            return wagons;
        }
    };

    // Отображение кнопки добавить
    table_outgoing_cars.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'outgoing_sostav': {
            //    if (this.select_rows_wagons && this.select_rows_wagons.length > 0) {
            //        this.obj_t_cars.button(4).enable(true);
            //        if (this.select_rows_wagons[0].status < 1) {
            //            this.obj_t_cars.button(2).enable(true);
            //            this.obj_t_cars.button(3).enable(false); // отмена сдачи состава
            //            this.obj_t_cars.button(4).text(langView('togc_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_cars.button(2).enable(false);
            //            if (this.select_rows_wagons[0].status === 2) { this.obj_t_cars.button(3).enable(true); } else { this.obj_t_cars.button(3).enable(false); }
            //            this.obj_t_cars.button(4).text(langView('togc_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_cars.button(2).enable(false);
            //        this.obj_t_cars.button(3).enable(false);
            //        this.obj_t_cars.button(4).enable(false);
            //    }
            //    break;
            //};
        };
    };
    // Выполнить операцию обновить
    table_outgoing_cars.prototype.action_refresh = function () {
        this.out_clear();
        if (typeof this.settings.fn_refresh === 'function') {
            this.settings.fn_refresh();
        } else {
            this.update(function (wagons) {
                this.view(wagons, this.id_station, this.id_sostav);
                LockScreenOff();
            }.bind(this));
        }

    };
    // Выполнить операцию Сдать состав
    table_outgoing_cars.prototype.action_hand_over_sostav_sostav = function () {
        this.out_clear();
        LockScreen(langView('togc_mess_run_operation', App.Langs));
        if (this.id_sostav !== null) {
            this.ids_wsd.getOutgoingSostavOfIDSostav(this.id_sostav, function (sostav) {
                if (sostav) {
                    if (sostav.status < 4) {
                        if (sostav.status < 2) {
                            // Сдать состав
                            LockScreenOff();
                            this.fhoogs.add(sostav);
                        } else {
                            // Править сданный состав
                            LockScreenOff();
                            this.fhoogs.edit(sostav);
                        };
                    } else {
                        // Ошибка, состав откланен 
                        this.out_warning(langView('togc_mess_warning_sostav_status_4', App.Langs).format(this.id_sostav));
                        LockScreenOff();
                    };
                } else {
                    // Ошибка, состав не найден 
                    this.out_warning(langView('togc_mess_error_sostav_null', App.Langs).format(this.id_sostav));
                    LockScreenOff();
                };
            }.bind(this));

        } else {
            // Ошибка id не определено
            this.out_warning(langView('togc_mess_warning_id_sostav_null', App.Langs));
            LockScreenOff();
        }

    };
    // Выполнить операцию переместить состав
    table_outgoing_cars.prototype.action_hand_dislocation_sostav_sostav = function () {
        this.out_clear();
        LockScreen(langView('togc_mess_run_operation', App.Langs));
        if (this.id_sostav !== null) {
            this.ids_wsd.getOutgoingSostavOfIDSostav(this.id_sostav, function (sostav) {
                if (sostav) {
                    if (sostav.status === 1 || sostav.status === 2) {
                        var hand_dislocation = {
                            reverse: false,
                            side: 0,
                            id_station: sostav.id_station_from,
                            id_way: sostav.id_way_from,
                            wagons: this.wagons,
                            locomotive1: null,
                            locomotive2: null,
                            time_aplly: null
                        };
                        this.fhdogs.edit(hand_dislocation);
                        LockScreenOff();
                    } else {
                        // Ошибка, состав откланен 
                        this.out_warning(langView('togc_mess_warning_sostav_status_5', App.Langs).format(this.id_sostav));
                        LockScreenOff();
                    };
                } else {
                    // Ошибка, состав не найден 
                    this.out_warning(langView('togc_mess_error_sostav_null', App.Langs).format(this.id_sostav));
                    LockScreenOff();
                };
            }.bind(this));

        } else {
            // Ошибка id не определено
            this.out_warning(langView('togc_mess_warning_id_sostav_null', App.Langs));
            LockScreenOff();
        }

    };
    //
    table_outgoing_cars.prototype.update_doc_uz = function () {
        this.out_clear();
        LockScreen(langView('togc_mess_run_operation', App.Langs));
        if (this.id_sostav !== null) {
            this.ids_wsd.getOutgoingSostavOfIDSostav(this.id_sostav, function (sostav) {
                if (sostav) {
                    if (sostav.status === 3) {
                        // Подготовим операцию обновления документов ЭПД
                        var operation_update_epd = {
                            id_outgoing_sostav: this.id_sostav,
                            user: App.User_Name,
                        };
                        // Обновим документы ЭПД
                        this.ids_wsd.postOperationUpdateEPDSendingSostav(operation_update_epd, function (result_update_epd) {
                            if (result_update_epd !== null && result_update_epd.result >= 0) {
                                this.update(function(wagons) {
                                    this.view(wagons, this.id_station, this.id_sostav);
                                    this.out_info(langView('togc_mess_ok_update_epd', App.Langs).format(result_update_epd.listResult.length))
                                    LockScreenOff();
                                }.bind(this));
                            } else {
                                // Ошибка, выполнения операции
                                this.out_error(langView('togc_mess_error_update_epd', App.Langs).format(result_update_epd !== null ? result_update_epd.error : null));
                                LockScreenOff();
                            }
                        }.bind(this));
                    } else {
                        // Ошибка, состав откланен 
                        this.out_warning(langView('togc_mess_warning_sostav_status_6', App.Langs).format(this.id_sostav));
                        LockScreenOff();
                    };
                } else {
                    // Ошибка, состав не найден 
                    this.out_warning(langView('togc_mess_error_sostav_null', App.Langs).format(this.id_sostav));
                    LockScreenOff();
                };
            }.bind(this));
        } else {
            // Ошибка id не определено
            this.out_warning(langView('togc_mess_warning_id_sostav_null', App.Langs));
            LockScreenOff();
        }
    };
    // Загрузить составы прибывающие на станцию 
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_outgoing_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_outgoing_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_outgoing_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_outgoing_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_outgoing_cars.prototype.destroy = function () {
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

    App.table_outgoing_cars = table_outgoing_cars;

    window.App = App;
})(window);