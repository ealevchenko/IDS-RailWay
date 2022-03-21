/*Модуль Таблица "Отправляемые составы"*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_err_create = -1; // TODO: Минимальная разница в часах создания строки и указаной даты выполнения
    var max_err_create = 1; // TODO: Максимальная разница в часах создания строки и указаной даты выполнения

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'tos_field_id_sostav': 'id состав',
            'tos_field_num_doc': '№ Вед.',
            'tos_field_id_station_from': 'id Станции отправления',
            'tos_field_station_from_name': 'Отправлен со станции',
            'tos_field_station_from_abbr': 'Отправлен со станции',
            'tos_field_id_way_from': 'id пути отпр.',
            'tos_field_way_from_num': '№ пути отп.',
            'tos_field_way_from_name': 'Название пути отправления',
            'tos_field_id_station_on': 'id станции назначения',
            'tos_field_station_on_name': 'Станции назначения',
            'tos_field_station_on_abbr': 'Станции назначения',
            'tos_field_date_readiness_amkr': 'Время предъявления на УЗ',
            'tos_field_date_end_inspection_acceptance_delivery': 'Время окончания осмотра приемосдатчиком',
            'tos_field_date_end_inspection_loader': 'Время окончания осмотра грузчиками',
            'tos_field_date_end_inspection_vagonnik': 'Время окончания осмотра вагонниками',
            'tos_field_vagonnik_user': 'Вагонник',
            'tos_field_date_readiness_uz': 'Время готовности к сдаче на УЗ',
            'tos_field_date_outgoing': 'Время сдачи на УЗ',
            'tos_field_date_outgoing_act': 'Время сдачи на УЗ (по акту)',
            'tos_field_date_departure_amkr': 'Время отправления с АМКР',
            'tos_field_composition_index': 'Индекс поезда',
            'tos_field_status_icon': '',
            'tos_field_status': 'Статус',
            'tos_field_note': 'Примечание',
            'tos_field_route_sign': 'Признак маршрута',
            'tos_field_create': 'Создан',
            'tos_field_create_user': 'Создал',
            'tos_field_change': 'Правили',
            'tos_field_change_user': 'Правил',
            'tos_field_count_all': 'Кол. ваг.',
            'tos_field_count_outgoing': 'Предъявлено вагонов',
            'tos_field_count_not_outgoing': 'Осталось вагонов',
            'tos_field_count_return': 'Возврат',
            'tos_field_count_detention': 'Задержано',
            'tos_field_count_vagonnik': 'Осмотрено',
            'tos_field_count_status': 'Всего|отпр.|ост.|возр.|зад.|осм.',
            'tos_title_form_return': 'Вернуть состав?',

            'tos_title_yes': 'Да',
            'tos_title_yellow': 'В работе',
            'tos_title_green': 'Сдан',
            'tos_title_blue': 'Отправлен',
            'tos_title_red': 'Отмена',
            'tos_title_all': 'Все',
            'tos_title_button_export': 'Экспорт',
            'tos_title_button_buffer': 'Буфер',
            'tos_title_button_excel': 'Excel',
            'tos_title_excel_sheet_name': 'Составы',
            'tos_title_button_field': 'Поля',
            'tos_title_button_field_select': 'Выбрать',
            'tos_title_button_field_view_all': 'Показать все',
            'tos_title_button_field_clear': 'Сбросить',
            'tos_title_button_return': 'Вернуть состав',
            'tos_title_button_return_uz': 'Вернуть состав с УЗ',
            'tos_title_button_wagon': 'Вагоны',
            'tos_title_button_wagon_accept': 'Отправить вагоны',
            'tos_title_button_wagon_view': 'Показать вагоны',
            'tos_title_button_refresh': 'Обновить',
            'tos_mess_init_module': 'Инициализация модуля (table_outgoing_sostav) ...',
            'tos_mess_load_sostav': 'Загружаю составы...',
            'tos_mess_update_sostav': 'Обновляю составы...',
            'tos_mess_view_sostav': 'Показываю составы...',
            'tos_mess_run_operation': 'Выполняю операцию...',
            'tos_mess_err_return_sostav': 'Статус выбранного состава не позволяет отменить состав для предъявления!',
            'tos_mess_error_wagon_return': '№ вагона : {0}, код ошибки : {1}',
            'tos_mess_comfirm_return': 'Вы уверены что хотите вернуть состав вед № {0}, станция отправления: {1}, путь отправления № {2}?',
            'tos_mess_cancel_return': 'Операция «Вернуть состав, сформированный для предъявления» - Отменена!',
            'tos_mess_ok_return': 'Операция «Вернуть состав, сформированный для предъявления» - Выполнена',
            'tos_mess_error_return': 'Ошибка выполнения операции «Вернуть состав, сформированный для предъявления», код ошибки : {0}',
            'tos_mess_comfirm_return_uz': 'Вы уверены что хотите вернуть состав сданный на УЗ : {0}, вед № {1}, станция отправления: {2}, путь отправления № {3}?',
            'tos_mess_cancel_return_uz': 'Операция «Вернуть состав, сданный на УЗ» - Отменена!',
            'tos_mess_ok_return_uz': 'Операция «Вернуть состав, сданный на УЗ» - Выполнена',
            'tos_mess_error_return_uz': 'Ошибка выполнения операции «Вернуть состав, сданный на УЗ», код ошибки : {0}',

        },
        'en':  //default language: English
        {
            'tos_field_id_composition': 'composition id',
            'tos_field_num_doc': 'Ved. No.',
            'tos_field_id_station_from': 'id of Station of departure',
            'tos_field_station_from_name': 'Sent from station',
            'tos_field_station_from_abbr': 'Sent from station',
            'tos_field_id_way_from': 'tos path id',
            'tos_field_way_from_num': 'tos_field_way_from_num',
            'tos_field_way_from_name': 'Departure path name',
            'tos_field_id_station_on': 'id of destination station',
            'tos_field_station_on_name': 'Destination Stations',
            'tos_field_station_on_abbr': 'Destination Stations',
            'tos_field_date_readiness_amkr': 'Tos Presentation Time',
            'tos_field_date_end_inspection_acceptance_delivery': 'End time of inspection by the receiver/delivery',
            'tos_field_date_end_inspection_loader': 'Field Inspection End Time',
            'tos_field_date_end_inspection_vagonnik': 'Tos_field_date_end_inspection_vagonnik',
            'tos_field_vagonnik_user': 'Vagonnik',
            'tos_field_date_readiness_uz': 'Tos field_date_readiness_uz',
            'tos_field_date_outgoing': 'Tos Field Date Outgoing',
            'tos_field_date_outgoing_act': 'Tos field date (by act)',
            'tos_field_date_departure_amkr': 'AMKR Departure Time',
            'tos_field_composition_index': 'Train index',
            'tos_field_status_icon': '',
            'tos_field_status': 'Status',
            'tos_field_note': 'Note',
            'tos_field_route_sign': 'Route sign',
            'tos_field_create': 'Created',
            'tos_field_create_user': 'Created',
            'tos_field_change': 'Rules',
            'tos_field_change_user': 'Rules',
            'tos_field_count_all': 'Tos. vag.',
            'tos_field_count_outgoing': 'Wagons Outgoing',
            'tos_field_count_not_outgoing': 'Wagons left',
            'tos_field_count_return': 'Return',
            'tos_field_count_detention': 'Delayed',
            'tos_field_count_vagonnik': 'Viewed',
            'tos_field_count_status': 'Total|departure|residual|asc|task|inspection',
            'tos_title_form_return': 'Return lineup?',

            'tos_title_yes': 'Yes',
            'tos_title_yellow': 'In Progress',
            'tos_title_green': 'Passed',
            'tos_title_blue': 'Sent',
            'tos_title_red': 'Cancel',
            'tos_title_all': 'All',
            'tos_title_button_export': 'Export',
            'tos_title_button_buffer': 'Buffer',
            'tos_title_button_excel': 'Excel',
            'tos_title_excel_sheet_name': 'Sheets',
            'tos_title_button_field': 'Fields',
            'tos_title_button_field_select': 'Select',
            'tos_title_button_field_view_all': 'Show All',
            'tos_title_button_field_clear': 'Reset',
            'tos_title_button_return': 'Return lineup',
            'tos_title_button_return_uz': 'Return the composition from UZ',
            'tos_title_button_wagon': 'Wagons',
            'tos_title_button_wagon_accept': 'Send wagons',
            'tos_title_button_wagon_view': 'Show wagons',
            'tos_title_button_refresh': 'Refresh',
            'tos_mess_init_module': 'Initiating module...',
            'tos_mess_load_sostav': 'Loading lineups...',
            'tos_mess_update_sostav': 'Updating lineups...',
            'tos_mess_view_sostav': 'Showing lineups...',
            'tos_mess_run_operation': 'Running operation...',
            'tos_mess_err_return_sostav': 'The status of the selected composition does not allow you to cancel the presentation composition!',
            'tos_mess_error_wagon_return': 'wagon no : {0}, error code : {1}',
            'tos_mess_comfirm_return': 'Are you sure you want to return ved number {0}, departure station: {1}, departure route {2}?',
            'tos_mess_cancel_return': 'Operation "Return Composition Formed for Presentation" - Canceled!',
            'tos_mess_ok_return': 'Operation "Return the composition formed for presentation" - Completed',
            'tos_mess_error_return': 'Error performing operation "Return composition formed for presentation", error code : {0}',
            'tos_mess_comfirm_return_uz': 'Are you sure you want to return the train handed over to UZ : {0}, route number {1}, departure station: {2}, departure route number {3}?',
            'tos_mess_cancel_return_uz': 'Operation "Return Train Returned to UZ" - Canceled!',
            'tos_mess_ok_return_uz': 'Operation "Return Train Returned to UZ" - Done',
            'tos_mess_error_return_uz': 'Error performing the operation "Return train returned to UZ", error code : {0}',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

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
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('tos_field_id_sostav', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'num_doc',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('tos_field_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Станция отправки
        {
            field: 'id_station_from',
            data: function (row, type, val, meta) {
                return row.id_station_from;
            },
            className: 'dt-body-center',
            title: langView('tos_field_id_station_from', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'station_from_name',
            data: function (row, type, val, meta) {
                return row['station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tos_field_station_from_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'station_from_abbr',
            data: function (row, type, val, meta) {
                return row['station_from_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tos_field_station_from_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // путь отправки
        {
            field: 'id_way_from',
            data: function (row, type, val, meta) {
                return row.id_way_from;
            },
            className: 'dt-body-center',
            title: langView('tos_field_id_way_from', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'way_from_num',
            data: function (row, type, val, meta) {
                return row['way_from_num_' + App.Lang];
            },
            className: 'dt-body-center',
            title: langView('tos_field_way_from_num', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'way_from_name',
            data: function (row, type, val, meta) {
                return row['way_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tos_field_way_from_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Станция назаначения
        {
            field: 'id_station_on',
            data: function (row, type, val, meta) {
                return row.id_station_on;
            },
            className: 'dt-body-center',
            title: langView('tos_field_id_station_on', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'station_on_name',
            data: function (row, type, val, meta) {
                return row['station_on_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tos_field_station_on_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'station_on_abbr',
            data: function (row, type, val, meta) {
                return row['station_on_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tos_field_station_on_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время предъявления на УЗ
        {
            field: 'date_readiness_amkr',
            data: function (row, type, val, meta) {
                return row.date_readiness_amkr ? moment(row.date_readiness_amkr).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_readiness_amkr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время окончания осмотра приемосдатчиком
        {
            field: 'date_end_inspection_acceptance_delivery',
            data: function (row, type, val, meta) {
                return row.date_end_inspection_acceptance_delivery ? moment(row.date_end_inspection_acceptance_delivery).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_end_inspection_acceptance_delivery', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время окончания осмотра грузчиками
        {
            field: 'date_end_inspection_loader',
            data: function (row, type, val, meta) {
                return row.date_end_inspection_loader ? moment(row.date_end_inspection_loader).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_end_inspection_loader', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время окончания осмотра вагонниками
        {
            field: 'date_end_inspection_vagonnik',
            data: function (row, type, val, meta) {
                return row.date_end_inspection_vagonnik ? moment(row.date_end_inspection_vagonnik).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_end_inspection_vagonnik', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вагонник (имя пользователя)
        {
            field: 'vagonnik_user',
            data: function (row, type, val, meta) {
                return row.vagonnik_user;
            },
            className: 'dt-body-center',
            title: langView('tos_field_vagonnik_user', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        //[date_show_wagons]
        //Время готовности к сдаче на УЗ
        {
            field: 'date_readiness_uz',
            data: function (row, type, val, meta) {
                return row.date_readiness_uz ? moment(row.date_readiness_uz).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_readiness_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время сдачи на УЗ
        {
            field: 'date_outgoing',
            data: function (row, type, val, meta) {
                return row.date_outgoing ? moment(row.date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время сдачи на УЗ (по акту)
        {
            field: 'date_outgoing_act',
            data: function (row, type, val, meta) {
                return row.date_outgoing_act ? moment(row.date_outgoing_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_outgoing_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время отправления с АМКР
        {
            field: 'date_departure_amkr',
            data: function (row, type, val, meta) {
                return row.date_departure_amkr ? moment(row.date_departure_amkr).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_date_departure_amkr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Индекс поезда
        {
            field: 'composition_index',
            data: function (row, type, val, meta) {
                return row.composition_index;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_composition_index', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Статус
        {
            field: 'status_icon',
            data: function (row, type, val, meta) {
                switch (row.status) {
                    case 1: return "<i class='fas fa-exclamation-circle' style='color:#ffbf00;'></i>";
                    case 2: return "<i class='fas fa-check' style='color:#008000;'></i>";
                    case 3: return "<i class='fas fa-share' style='color:#0b0bff;'></i>";
                    case 4: return "<i class='fas fa-ban' style='color:#ff0b0b;'></i>";
                    default: return null;
                }
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_status_icon', App.Langs), width: "20px", orderable: false, searchable: false
        },
        {
            field: 'status',
            data: function (row, type, val, meta) {
                switch (row.status) {
                    case 1: return langView('tos_title_yellow', App.Langs);
                    case 2: return langView('tos_title_green', App.Langs);
                    case 3: return langView('tos_title_blue', App.Langs);
                    case 4: return langView('tos_title_red', App.Langs);
                    default: return null;
                }
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_status', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //Примечание
        {
            field: 'note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-left shorten mw-200',
            title: langView('tos_field_note', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Признак маршрута
        {
            field: 'route_sign',
            data: function (row, type, val, meta) {
                return row.route_sign ? langView('tos_title_yes', App.Langs) : '';
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_route_sign', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Создана
        {
            field: 'create',
            data: function (row, type, val, meta) {
                return row.create ? moment(row.create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'create_user',
            data: function (row, type, val, meta) {
                return row.create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // изменена
        {
            field: 'change',
            data: function (row, type, val, meta) {
                return row.change ? moment(row.change).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_change', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'change_user',
            data: function (row, type, val, meta) {
                return row.change_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_change_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Всего вагонов
        {
            field: 'count_all',
            data: function (row, type, val, meta) {
                return row.count_all;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_all', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Предъявлено вагонов
        {
            field: 'count_outgoing',
            data: function (row, type, val, meta) {
                return row.count_outgoing;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_outgoing', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Осталось вагонов
        {
            field: 'count_not_outgoing',
            data: function (row, type, val, meta) {
                return row.count_not_outgoing;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_not_outgoing', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Возврат
        {
            field: 'count_return',
            data: function (row, type, val, meta) {
                return row.count_return;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_return', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Задержано
        {
            field: 'count_detention',
            data: function (row, type, val, meta) {
                return row.count_detention;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_detention', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Осмотренно
        {
            field: 'count_vagonnik',
            data: function (row, type, val, meta) {
                return row.count_vagonnik;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_vagonnik', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: "count_status",
            data: function (row, type, val, meta) {
                return row.count_all + " | " + row.count_outgoing + " | " + row.count_not_outgoing + " | " + row.count_return + " | " + row.count_detention + " | " + row.count_vagonnik;
            },
            className: 'dt-body-nowrap',
            title: langView('tos_field_count_status', App.Langs), width: "50px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tos_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tos_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tos_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('tos_title_excel_sheet_name', App.Langs),
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
            text: langView('tos_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tos_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tos_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tos_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'return_sostav',
            text: langView('tos_title_button_return', App.Langs),
            enabled: false
        },
        {
            button: 'return_sostav_uz',
            text: langView('tos_title_button_return_uz', App.Langs),
            enabled: false
        },
        {
            button: 'view_wagons',
            text: langView('tos_title_button_wagon', App.Langs),
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
    function table_outgoing_sostav(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$outgoing_sostav = $(selector);
        if (this.$outgoing_sostav.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$outgoing_sostav.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_outgoing_sostav.prototype.init_columns_detali = function () {
        var collums = [];
        collums.push('id');
        collums.push('num_doc');
        collums.push('id_station_from');
        collums.push('station_from_name');
        collums.push('station_from_abbr');
        collums.push('id_way_from');
        collums.push('way_from_num');
        collums.push('way_from_name');
        collums.push('id_station_on');
        collums.push('station_on_name');
        collums.push('station_on_abbr');
        collums.push('date_readiness_amkr');
        collums.push('date_end_inspection_acceptance_delivery');
        collums.push('date_end_inspection_loader');
        collums.push('date_end_inspection_vagonnik');
        collums.push('vagonnik_user');
        collums.push('date_readiness_uz');                  //Время готовности к сдаче на УЗ
        collums.push('date_outgoing');                      //Время сдачи на УЗ
        collums.push('date_outgoing_act');                  //Время сдачи на УЗ (по акту)
        collums.push('date_departure_amkr');                //Время отправления с АМКР
        collums.push('composition_index');                  //Индекс поезда
        collums.push('status_icon');                             //Статус
        collums.push('status');                             //Статус
        collums.push('note');
        collums.push('route_sign');
        collums.push('create');
        collums.push('create_user');
        collums.push('change');
        collums.push('change_user');
        collums.push('count_all');                          // Всего вагонов
        collums.push('count_outgoing');                     // Предъявлено вагонов
        collums.push('count_not_outgoing');                 // Осталось вагонов
        collums.push('count_return');                       // Возврат
        collums.push('count_detention');                    // Задержано
        collums.push('count_vagonnik');                     // Осмотренно
        collums.push('count_status');                       // Всего|отпр.|ост.|возр.|зад.|осм.
        return init_columns(collums, list_collums);
    };
    // инициализация полей outgoing_sostav
    table_outgoing_sostav.prototype.init_columns_outgoing_sostav = function () {
        var collums = [];
        collums.push({ field: 'status_icon', title: null, class: 'fixed-column' });                        // Статус
        collums.push({ field: 'status', title: null, class: 'fixed-column' });                             // Статус
        collums.push({ field: 'num_doc', title: null, class: 'fixed-column' });                            // Ведомость
        collums.push({ field: 'date_readiness_amkr', title: null, class: 'fixed-column' });                // время предъявления
        collums.push({ field: 'station_from_name', title: null, class: 'fixed-column' });                  // Стоит на станции
        collums.push({ field: 'way_from_num', title: null, class: 'fixed-column' });                       // Путь
        collums.push({ field: 'count_all', title: null, class: 'fixed-column' });                          // Всего вагонов
        collums.push({ field: 'station_on_name', title: null, class: 'fixed-column' });                    // Станция назначения
        collums.push({ field: 'date_end_inspection_acceptance_delivery', title: null, class: null });
        collums.push({ field: 'date_end_inspection_loader', title: null, class: null });
        collums.push({ field: 'date_end_inspection_vagonnik', title: null, class: null });
        collums.push({ field: 'date_readiness_uz', title: null, class: null });                  //Время готовности к сдаче на УЗ
        collums.push({ field: 'date_outgoing', title: null, class: null });                      //Время сдачи на УЗ
        collums.push({ field: 'date_outgoing_act', title: null, class: null });                  //Время сдачи на УЗ (по акту)
        collums.push({ field: 'date_departure_amkr', title: null, class: null });                //Время отправления с АМКР
        collums.push({ field: 'count_status', title: null, class: null });                       // Всего|отпр.|ост.|возр.|зад.|осм.
        collums.push({ field: 'composition_index', title: null, class: null });                  //Индекс поезда
        collums.push({ field: 'note', title: null, class: null });
        collums.push({ field: 'create', title: null, class: null });
        collums.push({ field: 'create_user', title: null, class: null });
        collums.push({ field: 'change', title: null, class: null });
        collums.push({ field: 'change_user', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_outgoing_sostav.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок outgoing_sostav
    table_outgoing_sostav.prototype.init_button_outgoing_sostav = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'return_sostav',
            action: function (e, dt, node, config) {
                this.action_return_sostav(); // выполнить операцию
            }.bind(this)
        });
        buttons.push({
            name: 'return_sostav_uz',
            action: function (e, dt, node, config) {
                this.action_return_sostav_uz(); // выполнить операцию
            }.bind(this)
        });
        buttons.push({
            name: 'view_wagons',
            action: function (e, dt, node, config) {
                if (typeof this.settings.fn_action_view_wagons === 'function') {
                    this.settings.fn_action_view_wagons(this.select_rows_sostav);
                }

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
    table_outgoing_sostav.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'outgoing_sostav': {
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 8;
                this.order_column = [3, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_outgoing_sostav();
                this.table_buttons = this.init_button_outgoing_sostav();
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
    table_outgoing_sostav.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('tos_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_wagons: false,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_init: null,
            fn_action_view_wagons: null,
        }, options);
        //
        this.start = null;                  // Время начало выборки
        this.stop = null;                   // Время конца выборки
        this.id_station = null;             // Станция выборки (все станции null)
        this.id_sostav = null;              // Выбранный состав
        this.sostav = [];                   // Список составов
        this.select_rows_sostav = null;     // Выбранный состав

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

        // Включу когда понадобится 
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();
        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_cars = new this.fc_ui.el_table('tab-os-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_sostav = table_cars.$element;
        this.$outgoing_sostav.addClass('table-report-operation').append(this.$table_sostav);
        // Инициализируем таблицу
        this.obj_t_sostav = this.$table_sostav.DataTable({
            "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tos_title_all', App.Langs)]],
            "pageLength": 10,
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

                $(row).attr('id', data.id); // id строки 
                switch (data.status) {
                    case 1: $(row).addClass('yellow'); break;
                    case 2: $(row).addClass('green'); break;
                    case 3: $(row).addClass('blue'); break;
                    case 4: $(row).addClass('red'); break;
                }
                //if ((data.count_wagons_arrival > 0 || data.count_wagons_accepted > 0) && data.count_wagons_send > data.count_wagons_accepted) {
                //    $(row).addClass('yellow');// Отметим состав частично принят
                //}

                //if (data.count_wagons_accepted > 0 && data.count_wagons_send === data.count_wagons_accepted) {
                //    // Вагоны приняты, проверим как

                //    if (data.count_wagons_send === data.count_wagons_arrival) {
                //        $(row).addClass('green');// Вагоны приняты, все
                //    };
                //    if (data.count_wagons_arrival === 0 && data.count_wagons_return > 0 && data.count_wagons_send === data.count_wagons_return) {
                //        $(row).addClass('blue');// Вагоны возвращены или отменены, все
                //    };
                //    if (data.count_wagons_send > (data.count_wagons_arrival + data.count_wagons_return)) {
                //        $(row).addClass('red');// Вагоны приняты другой операцией
                //    };
                //};
                //// Проверка на создание строки операции отправки (ошибка если дата строки создания и выполнения операции больше часа )
                //var from_create = moment(data.from_operation_create);
                //var from_operat = moment(data.from_operation_end);
                //if (from_create && from_operat && from_create.isValid() && from_operat.isValid()) {
                //    var hour = from_create.diff(from_operat, 'hours');
                //    if (hour >= max_err_create || hour <= min_err_create) {
                //        $('td.from_create', row).addClass('error');
                //    }
                //}
                //// Проверка на создание строки операции прибытия (ошибка если дата строки создания и выполнения операции больше часа )
                //var on_create = moment(data.on_operation_create);
                //var on_operat = moment(data.on_operation_end);
                //if (on_create && on_operat && on_create.isValid() && on_operat.isValid()) {
                //    var hour = on_create.diff(on_operat, 'hours');
                //    if (hour >= max_err_create || hour <= min_err_create) {
                //        $('td.on_create', row).addClass('error');
                //    }
                //}

            }.bind(this),
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'outgoing_sostav': {
                this.obj_t_sostav.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                }.bind(this));

                break;
            };
        };
        // Определим показывать вагоны детально
        /*        if (this.settings.detali_wagons) this.init_detali();*/
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    //-------------------------------------------------------------------------------------------
    // обновим информацию об выбраных строках
    table_outgoing_sostav.prototype.select_rows = function () {
        var index = this.obj_t_sostav.rows({ selected: true });
        var rows = this.obj_t_sostav.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.select_rows_sostav = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Показать данные
    table_outgoing_sostav.prototype.view = function (data, id_station, id_sostav) {
        this.id_station = id_station;
        this.out_clear();
        LockScreen(langView('tos_mess_view_sostav', App.Langs));
        this.obj_t_sostav.clear();

        this.obj_t_sostav.rows.add(id_station !== null ? data.filter(function (i) { return i.id_station_from === id_station }) : data);
        this.obj_t_sostav.order(this.order_column);
        //this.obj_t_sostav.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
        this.obj_t_sostav.draw();
        if (id_sostav !== null) {
            this.id_sostav = id_sostav
            this.obj_t_sostav.row('#' + this.id_sostav).select();
        } else {
            this.id_sostav = null;
        }
        this.select_rows();
        this.enable_button();
        //LockScreenOff();
    };
    // Загрузить составы по прибытию
    table_outgoing_sostav.prototype.load_outgoing_sostav = function (start, stop, cb_load) {
        if (start !== null && stop !== null) {
            LockScreen(langView('tos_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingSostav(start, stop, function (sostav) {
                this.start = start;
                this.stop = stop;
                this.sostav = sostav;
                //LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.sostav);
                }
                //LockScreenOff();
            }.bind(this));
        } else {
            this.sostav = [];
            this.start = null;
            this.stop = null;
            if (typeof cb_load === 'function') {
                cb_load(this.sostav);
            }
        }

    };
    // Обновим составы по прибытию
    table_outgoing_sostav.prototype.update = function (cb_load) {
        if (this.start !== null && this.stop !== null) {
            LockScreen(langView('tos_mess_update_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingSostav(this.start, this.stop, function (sostav) {
                this.sostav = sostav;
                //LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.sostav);
                }
                //LockScreenOff();
            }.bind(this));
        } else {
            this.sostav = [];
            if (typeof cb_load === 'function') {
                cb_load(this.sostav);
            }
        }
    };
    // Отображение кнопки добавить
    table_outgoing_sostav.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            case 'outgoing_sostav': {
                if (this.select_rows_sostav && this.select_rows_sostav.length > 0) {
                    this.obj_t_sostav.button(4).enable(true);
                    if (this.select_rows_sostav[0].status < 1) {
                        this.obj_t_sostav.button(2).enable(true);
                        this.obj_t_sostav.button(3).enable(false); // отмена сдачи состава
                        this.obj_t_sostav.button(4).text(langView('tos_title_button_wagon_accept', App.Langs));
                    } else {
                        // Если статус в работе принят или удален 
                        this.obj_t_sostav.button(2).enable(false);
                        if (this.select_rows_sostav[0].status === 2) { this.obj_t_sostav.button(3).enable(true); } else { this.obj_t_sostav.button(3).enable(false); }
                        this.obj_t_sostav.button(4).text(langView('tos_title_button_wagon_view', App.Langs));
                    }
                } else {
                    this.obj_t_sostav.button(2).enable(false);
                    this.obj_t_sostav.button(3).enable(false);
                    this.obj_t_sostav.button(4).enable(false);
                }
                break;
            };
        };
    };
    // Выполнить операцию вернуть состав сформированы для предъявления
    table_outgoing_sostav.prototype.action_return_sostav = function () {
        this.out_clear();
        if (this.select_rows_sostav && this.select_rows_sostav.length > 0 && this.select_rows_sostav[0].status === 0) {
            var sostav = this.select_rows_sostav[0];
            var message = langView('tos_mess_comfirm_return', App.Langs).format(sostav.num_doc, sostav["station_from_name_" + App.Lang], sostav["way_from_num_" + App.Lang]);
            this.modal_confirm_form.view(langView('tos_title_form_return', App.Langs), message, function (res) {
                if (res) {
                    LockScreen(langView('tos_mess_run_operation', App.Langs));
                    // Сформируем операцию
                    var operation_provide = {
                        id_sostav: sostav.id,
                        user: App.User_Name,
                    }
                    // Выполнить операцию отменить предъявление сотава для сдачи на уз
                    this.ids_wsd.postReturnProvideWagonsOfStation(operation_provide, function (result_provide) {
                        if (result_provide && result_provide.result > 0) {
                            this.update(function (sostav) {
                                this.view(sostav, this.id_station, null);
                                this.out_info(langView('tos_mess_ok_return', App.Langs));
                                LockScreenOff();
                            }.bind(this));
                        } else {
                            this.out_error(langView('tos_mess_error_return', App.Langs).format(result_provide ? result_provide.result : null));
                            if (result_provide && result_provide.listResult && result_provide.listResult.length > 0) {
                                $.each(result_provide.listResult, function (i, el) {
                                    if (el.result < 0) {
                                        this.out_error(langView('tos_mess_error_wagon_return', App.Langs).format(el.num, el.result));
                                    }
                                }.bind(this));
                            }
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    this.out_clear();
                    this.out_warning(langView('tos_mess_cancel_return', App.Langs));
                }
            }.bind(this));
        } else {
            this.out_warning(langView('tos_mess_err_return_sostav', App.Langs));
        }
    };
    // Выполнить операцию вернуть состав сданный на УЗ
    table_outgoing_sostav.prototype.action_return_sostav_uz = function () {
        this.out_clear();
        if (this.select_rows_sostav && this.select_rows_sostav.length > 0 && this.select_rows_sostav[0].status === 2) {
            var sostav = this.select_rows_sostav[0];
            var message = langView('tos_mess_comfirm_return_uz', App.Langs).format((sostav.date_outgoing ? moment(sostav.date_outgoing).format(format_datetime) : null), sostav.num_doc, sostav["station_from_name_" + App.Lang], sostav["way_from_num_" + App.Lang]);
            this.modal_confirm_form.view(langView('tos_title_form_return', App.Langs), message, function (res) {
                if (res) {
                    LockScreen(langView('tos_mess_run_operation', App.Langs));
                    // Подготовим операцию
                    var operation = {
                        id_outgoing_sostav: sostav.id,
                        user: App.User_Name
                    };
                    // Выполним операцию
                    this.ids_wsd.postOperationReturnPresentSostav(operation, function (result_operation) {
                        if (result_operation > 0) {
                            this.update(function (sostav) {
                                this.view(sostav, this.id_station, this.id_sostav);
                                this.out_info(langView('tos_mess_ok_return_uz', App.Langs));
                                LockScreenOff();
                            }.bind(this));
                        } else {
                            // Ошибка выполнения
                            this.out_error(langView('tos_mess_error_return_uz', App.Langs).format(result_operation));
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    this.out_clear();
                    this.out_warning(langView('tos_mess_cancel_return_uz', App.Langs));
                }
            }.bind(this));
        } else {
            this.out_warning(langView('tos_mess_err_return_sostav', App.Langs));
        };
    };
    // Выполнить операцию обновить
    table_outgoing_sostav.prototype.action_refresh = function () {
        this.out_clear();
        this.update(function (sostav) {
            this.view(sostav, this.id_station, this.id_sostav);
            LockScreenOff();
        }.bind(this));
    };
    // Загрузить составы прибывающие на станцию 
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_outgoing_sostav.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_outgoing_sostav.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_outgoing_sostav.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_outgoing_sostav.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_outgoing_sostav.prototype.destroy = function () {
        // Вкл. когда понадобится
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        //
        if (this.obj_t_sostav) {
            this.obj_t_sostav.destroy(true);
            this.obj_t_sostav = null;
        }
        this.$outgoing_sostav.empty(); // empty in case the columns change
    }

    App.table_outgoing_sostav = table_outgoing_sostav;

    window.App = App;
})(window);