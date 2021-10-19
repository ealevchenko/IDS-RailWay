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
            'tsow_field_outer_way_num_sostav': '№ состава',
            'tsow_field_status': 'Статус',
            'tsow_field_id_outer_way': 'id перег.',
            'tsow_field_name_outer_way': 'Перегон',
            'tsow_field_outer_way_close': 'Перег. закрыт',
            'tsow_field_outer_way_delete': 'Перег. удален',
            'tsow_field_from_operation_locomotive1': 'Лок.№1',
            'tsow_field_from_operation_locomotive2': 'Лок.№2',
            'tsow_field_from_operation_start': 'Нач. опер. отпр.',
            'tsow_field_from_operation_end': 'Отправлен',
            'tsow_field_from_operation_create': 'Опер. отпр. создана',
            'tsow_field_from_operation_create_user': 'Вып. опер. отправл.',
            'tsow_field_from_id_station': 'id ст. отпр.',
            'tsow_field_from_station_name': 'Станция отправления',
            'tsow_field_from_station_abbr': 'Ст. отпр. (аббр.)',
            'tsow_field_from_id_way': 'id путь отпр.',
            'tsow_field_from_id_park': 'id парка отпр.',
            'tsow_field_from_way_name': 'Путь отправки',
            'tsow_field_from_way_abbr': 'Путь отпр. (аббр.)',
            'tsow_field_from_way_capacity': 'Путь отпр. (вмест.)',
            'tsow_field_from_way_close': 'Путь отпр. закрыт',
            'tsow_field_from_way_delete': 'Путь отпр. удален',
            'tsow_field_count_wagons_send': 'Отпр. ваг.',
            'tsow_field_on_operation_locomotive1': 'Лок.№1',
            'tsow_field_on_operation_locomotive2': 'Лок.№2',
            'tsow_field_on_operation_start': 'Нач. опер. приб.',
            'tsow_field_on_operation_end': 'Принят',
            'tsow_field_on_operation_create': 'Опер. приб. создана',
            'tsow_field_on_operation_create_user': 'Вып. опер. приб.',
            'tsow_field_on_id_station': 'id ст. приб.',
            'tsow_field_on_station_name': 'Станция прибытия',
            'tsow_field_on_station_abbr': 'Ст. приб. (аббр.)',
            'tsow_field_on_id_way': 'id путь приб.',
            'tsow_field_on_id_park': 'id парка приб.',
            'tsow_field_on_way_name': 'Путь прибытия',
            'tsow_field_on_way_abbr': 'Путь приб. (аббр.)',
            'tsow_field_on_way_capacity': 'Путь приб. (вмест.)',
            'tsow_field_on_way_close': 'Путь приб. закрыт',
            'tsow_field_on_way_delete': 'Путь приб. удален',
            'tsow_field_count_wagons_arrival': 'Прин. ваг.',

            'tsow_title_detali_wagon': 'Вагоны в составе',

            'tsow_title_all': 'Все',
            'tsow_title_status_arrival': 'Принят',
            'tsow_title_status_work': 'В работе',
            'tsow_title_status_send': 'Отправлен',

            'tsow_title_button_export': 'Экспорт',
            'tsow_title_button_buffer': 'Буфер',
            'tsow_title_button_excel': 'Excel',
            'tsow_title_excel_sheet_name': 'Составы на подходах', 
            'tsow_title_button_field': 'Поля',
            'tsow_title_button_field_select': 'Выбрать',
            'tsow_title_button_field_view_all': 'Показать все',
            'tsow_title_button_field_clear': 'Сбросить',

            'tsow_title_button_select_all': 'Все вагоны',
            'tsow_title_button_select_none': 'Убрать выбор',

            'tsow_mess_init_module': 'Инициализация модуля…',
            'tsow_mess_load_wagons': 'Загружаю вагоны состава…',
            'tsow_mess_load_sostav': 'Загружаю составы…',
            'tsow_mess_view_wagons': 'загрузка информации о вагонах состава…',
            'tsow_mess_view_sostav': 'загрузка информации о составах на перегоне…',
        },
        'en':  //default language: English
        {
            'tsow_field_outer_way_num_sostav': 'Train #',
            'tsow_field_status': 'Status',
            'tsow_field_id_outer_way': 'field id',
            'tsow_field_name_outer_way': 'Ferry',
            'tsow_field_outer_way_close': 'Recur. closed ',
            'tsow_field_outer_way_delete': 'Trans. deleted ',
            'tsow_field_from_operation_locomotive1': 'Loc. # 1',
            'tsow_field_from_operation_locomotive2': 'Local # 2',
            'tsow_field_from_operation_start': 'Start. opera. send. ',
            'tsow_field_from_operation_end': 'End. opera. send. ',
            'tsow_field_from_operation_create': 'Opera. send created ',
            'tsow_field_from_operation_create_user': 'Issue. opera. sent. ',
            'tsow_field_from_id_station': 'id st. send. ',
            'tsow_field_from_station_name': 'Departure station',
            'tsow_field_from_station_abbr': 'Art. send (abbr.) ',
            'tsow_field_from_id_way': 'send id path',
            'tsow_field_from_id_park': 'park id sent.',
            'tsow_field_from_way_name': 'Submission path',
            'tsow_field_from_way_abbr': 'Send path (abbr.) ',
            'tsow_field_from_way_capacity': 'Send path (together) ',
            'tsow_field_from_way_close': 'Send path closed ',
            'tsow_field_from_way_delete': 'Send path deleted ',
            'tsow_field_count_wagons_send': 'Send vag. ',
            'tsow_field_on_operation_locomotive1': 'Loc. # 1',
            'tsow_field_on_operation_locomotive2': 'Loc. # 2',
            'tsow_field_on_operation_start': 'Start. opera. arr. ',
            'tsow_field_on_operation_end': 'End. opera. arr. ',
            'tsow_field_on_operation_create': 'Opera. approx. created ',
            'tsow_field_on_operation_create_user': 'Issue. opera. arr. ',
            'tsow_field_on_id_station': 'id st. arr. ',
            'tsow_field_on_station_name': 'Arrival station',
            'tsow_field_on_station_abbr': 'Art. approx. (abbr.) ',
            'tsow_field_on_id_way': 'id path arriv.',
            'tsow_field_on_id_park': 'park id.',
            'tsow_field_on_way_name': 'Arrival path',
            'tsow_field_on_way_abbr': 'Arrival path (abbr.) ',
            'tsow_field_on_way_capacity': 'Path approx. (together) ',
            'tsow_field_on_way_close': 'Arrival path closed ',
            'tsow_field_on_way_delete': 'Arrival path deleted ',
            'tsow_field_count_wagons_arrival': 'Accepted. vag. ',

            'tsow_title_detali_wagon': 'Wagons in the train',

            'tsow_title_all': 'All',
            'tsow_title_status_arrival': 'Received',
            'tsow_title_status_work': 'In Progress',
            'tsow_title_status_send': 'Sent',

            'tsow_title_button_export': 'Export',
            'tsow_title_button_buffer': 'Buffer',
            'tsow_title_button_excel': 'Excel',
            'tsow_title_excel_sheet_name': 'Lineups on the way',
            'tsow_title_button_field': 'Fields',
            'tsow_title_button_field_select': 'Select',
            'tsow_title_button_field_view_all': 'Show all',
            'tsow_title_button_field_clear': 'Reset',

            'tsow_title_button_select_all': 'All wagons',
            'tsow_title_button_select_none': 'Remove selection',

            'tsow_mess_init_module': 'Initializing a module ...',
            'tsow_mess_load_wagons': 'Loading wagons of the train ...',
            'tsow_mess_load_sostav': 'Loading compositions ...',
            'tsow_mess_view_wagons': 'loading information about wagons of the train ...',
            'tsow_mess_view_sostav': 'loading information about trains on the stretch ...',
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
            field: 'outer_way_num_sostav',
            data: function (row, type, val, meta) {
                return row.outer_way_num_sostav;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_outer_way_num_sostav', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'status',
            data: function (row, type, val, meta) {
                if (row.count_wagons_send === row.count_wagons_arrival) {
                    return langView('tsow_title_status_arrival', App.Langs);
                } else {
                    if (row.count_wagons_send !== row.count_wagons_arrival && row.count_wagons_arrival > 0) {
                        return langView('tsow_title_status_work', App.Langs);
                    } else {
                        return langView('tsow_title_status_send', App.Langs);
                    };
                };
            },
            className: 'dt-body-center',
            title: langView('tsow_field_status', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Перегон
        {
            field: 'id_outer_way',
            data: function (row, type, val, meta) {
                return row.id_outer_way;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_id_outer_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'name_outer_way',
            data: function (row, type, val, meta) {
                return row['name_outer_way_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-200',
            title: langView('tsow_field_name_outer_way', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_close',
            data: function (row, type, val, meta) {
                return row.outer_way_close ? moment(row.outer_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_outer_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_delete',
            data: function (row, type, val, meta) {
                return row.outer_way_delete ? moment(row.outer_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_outer_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Операции отправки на станцию(дополнительная информаци)
        {
            field: 'from_operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.from_operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_from_operation_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.from_operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_from_operation_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_start',
            data: function (row, type, val, meta) {
                return row.from_operation_start ? moment(row.from_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_from_operation_start', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_end',
            data: function (row, type, val, meta) {
                return row.from_operation_end ? moment(row.from_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_from_operation_end', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_create',
            data: function (row, type, val, meta) {
                return row.from_operation_create ? moment(row.from_operation_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap from_create',
            title: langView('tsow_field_from_operation_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_create_user',
            data: function (row, type, val, meta) {
                return row.from_operation_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_from_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Станция отправки
        {
            field: 'from_id_station',
            data: function (row, type, val, meta) {
                return row.from_id_station;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_from_id_station', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_station_name',
            data: function (row, type, val, meta) {
                return row['from_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tsow_field_from_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_station_abbr',
            data: function (row, type, val, meta) {
                return row['from_station_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tsow_field_from_station_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Путь отправки
        {
            field: 'from_id_way',
            data: function (row, type, val, meta) {
                return row.from_id_way;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_from_id_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_id_park',
            data: function (row, type, val, meta) {
                return row.from_id_park;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_from_id_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_way_name',
            data: function (row, type, val, meta) {
                return row['from_way_num_' + App.Lang] + '-' + row['from_way_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tsow_field_from_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_way_abbr',
            data: function (row, type, val, meta) {
                return row['from_way_num_' + App.Lang] + '-' + row['from_way_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tsow_field_from_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_capacity',
            data: function (row, type, val, meta) {
                return row.from_way_capacity;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_from_way_capacity', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_way_close',
            data: function (row, type, val, meta) {
                return row.from_way_close ? moment(row.from_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_from_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_delete',
            data: function (row, type, val, meta) {
                return row.from_way_delete ? moment(row.from_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_from_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'count_wagons_send',
            data: function (row, type, val, meta) {
                return row.count_wagons_send;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_count_wagons_send', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Операции прибыл на станцию(дополнительная информаци)
        {
            field: 'on_operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.on_operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_on_operation_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.on_operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_on_operation_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_start',
            data: function (row, type, val, meta) {
                return row.on_operation_start ? moment(row.on_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_on_operation_start', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_end',
            data: function (row, type, val, meta) {
                return row.on_operation_end ? moment(row.on_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_on_operation_end', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_create',
            data: function (row, type, val, meta) {
                return row.on_operation_create ? moment(row.on_operation_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap on_create',
            title: langView('tsow_field_on_operation_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_create_user',
            data: function (row, type, val, meta) {
                return row.on_operation_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_on_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Станция прибытия
        {
            field: 'on_id_station',
            data: function (row, type, val, meta) {
                return row.on_id_station;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_on_id_station', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_station_name',
            data: function (row, type, val, meta) {
                return row['on_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tsow_field_on_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_station_abbr',
            data: function (row, type, val, meta) {
                return row['on_station_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('tsow_field_on_station_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Путь прибытия
        {
            field: 'on_id_way',
            data: function (row, type, val, meta) {
                return row.on_id_way;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_on_id_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_id_park',
            data: function (row, type, val, meta) {
                return row.on_id_park;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_on_id_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_way_name',
            data: function (row, type, val, meta) {
                return row['on_way_num_' + App.Lang] ? row['on_way_num_' + App.Lang] + '-' + row['on_way_name_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tsow_field_on_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_way_abbr',
            data: function (row, type, val, meta) {
                return row['on_way_num_' + App.Lang] ? row['on_way_num_' + App.Lang] + '-' + row['on_way_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tsow_field_on_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_capacity',
            data: function (row, type, val, meta) {
                return row.on_way_capacity;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_on_way_capacity', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_way_close',
            data: function (row, type, val, meta) {
                return row.on_way_close ? moment(row.on_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_on_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_delete',
            data: function (row, type, val, meta) {
                return row.on_way_delete ? moment(row.on_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tsow_field_on_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'count_wagons_send',
            data: function (row, type, val, meta) {
                return row.count_wagons_send;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_count_wagons_send', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'count_wagons_arrival',
            data: function (row, type, val, meta) {
                return row.count_wagons_arrival;
            },
            className: 'dt-body-center',
            title: langView('tsow_field_count_wagons_arrival', App.Langs), width: "30px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tsow_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tsow_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tsow_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('tsow_title_excel_sheet_name', App.Langs),
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
            text: langView('tsow_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tsow_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tsow_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tsow_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'select_all',
            text: langView('tsow_title_button_select_all', App.Langs),

        },
        {
            button: 'select_none',
            extend: 'selectNone',
            text: langView('tsow_title_button_select_none', App.Langs),
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        }
    ];
    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function table_sostav_outer_way(selector) {
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
    table_sostav_outer_way.prototype.init_columns_detali = function () {
        var collums = [];
        // Перегон
        collums.push('outer_way_num_sostav');
        collums.push('id_outer_way');
        collums.push('name_outer_way');
        collums.push('outer_way_close');
        collums.push('outer_way_delete');
        // Операция отправления
        collums.push('from_operation_locomotive1');
        collums.push('from_operation_locomotive2');
        collums.push('from_operation_start');
        collums.push('from_operation_end');
        collums.push('from_operation_create');
        collums.push('from_operation_create_user');
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
        // Отправл.
        collums.push('count_wagons_send');
        // Операция прибытия
        collums.push('on_operation_locomotive1');
        collums.push('on_operation_locomotive2');
        collums.push('on_operation_start');
        collums.push('on_operation_end');
        collums.push('on_operation_create');
        collums.push('on_operation_create_user');
        // Станция отправления
        collums.push('on_id_station');
        collums.push('on_station_name');
        collums.push('on_station_abbr');
        // Путь отправления
        collums.push('on_id_way');
        collums.push('on_id_park');
        collums.push('on_way_name');
        collums.push('on_way_abbr');
        collums.push('on_way_capacity');
        collums.push('on_way_close');
        collums.push('on_way_delete');
        // Прибыл.
        collums.push('count_wagons_arrival');
        //collums.push('');
        //collums.push('');
        //collums.push('');
        //collums.push('');


        return init_columns(collums, list_collums);
    };
    // инициализация полей отчета ow_arr_sosta
    table_sostav_outer_way.prototype.init_columns_arrival_outer_way = function () {
        var collums = [];
        //collums.push('outer_way_num_sostav');
        // Перегон
        //collums.push('id_outer_way');
        collums.push('name_outer_way');
        //collums.push('outer_way_close');
        //collums.push('outer_way_delete');
        // Станция отправления
        //collums.push('from_id_station');
        collums.push('from_station_name');
        //collums.push('from_station_abbr');
        // Путь отправления
        //collums.push('from_id_way');
        //collums.push('from_id_park');
        //collums.push('from_way_name');
        collums.push('from_way_abbr');
        //collums.push('from_way_capacity');
        //collums.push('from_way_close');
        //collums.push('from_way_delete');
        // Отправл.
        collums.push('count_wagons_send');
        // Прибыл.
        collums.push('count_wagons_arrival');

        // Операция отправления
        collums.push('from_operation_locomotive1');
        collums.push('from_operation_locomotive2');
        //collums.push('from_operation_start');
        collums.push('from_operation_end');
        //collums.push('from_operation_create');
        collums.push('from_operation_create_user');
        //// Операция прибытия
        //collums.push('on_operation_locomotive1');
        //collums.push('on_operation_locomotive2');
        //collums.push('on_operation_start');
        //collums.push('on_operation_end');
        //collums.push('on_operation_create');
        //collums.push('on_operation_create_user');
        //// Станция отправления
        //collums.push('on_id_station');
        //collums.push('on_station_name');
        //collums.push('on_station_abbr');
        //// Путь отправления
        //collums.push('on_id_way');
        //collums.push('on_id_park');
        //collums.push('on_way_name');
        //collums.push('on_way_abbr');
        //collums.push('on_way_capacity');
        //collums.push('on_way_close');
        //collums.push('on_way_delete');

        //collums.push('');
        //collums.push('');
        //collums.push('');
        //collums.push('');


        return init_columns(collums, list_collums);
    };
    // инициализация полей отчета ow_arr_sosta
    table_sostav_outer_way.prototype.init_columns_arrival_sostav_operation = function () {
        var collums = [];
        if (this.settings.detali_wagons) collums.push('details_control');
        //collums.push('outer_way_num_sostav');
        collums.push('from_operation_end');
        collums.push('status');
        collums.push('name_outer_way');
        collums.push('from_station_name');
        collums.push('from_way_abbr');
        collums.push('on_station_name');
        // Отправл.
        collums.push('count_wagons_send');
        // Прибыл.
        collums.push('count_wagons_arrival');
        // Операция отправления
        collums.push('from_operation_locomotive1');
        collums.push('from_operation_locomotive2');
        collums.push('from_operation_create');
        collums.push('from_operation_create_user');
        collums.push('on_operation_end');
        collums.push('on_operation_create_user');
        collums.push('on_operation_create');
        return init_columns(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_sostav_outer_way.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок отчет ow_arr_sostav
    table_sostav_outer_way.prototype.init_button_arrival_outer_way = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок отчет ow_arr_sostav
    table_sostav_outer_way.prototype.init_button_arrival_sostav_operation = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_sostav_outer_way.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            // Таблица вагоны на пути для отправки
            case 'arrival-sostav-outer-way': {
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_arrival_outer_way();
                this.table_buttons = this.init_button_arrival_outer_way();
                break;
            };
            // Таблица вагоны на пути для отправки
            case 'arrival-sostav-operation': {
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_arrival_sostav_operation();
                this.table_buttons = this.init_button_arrival_sostav_operation();
                break;
            };
            // Таблица вагоны на пути по умолчанию (если не выставят тип отчета)
            default: {
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_detali();
                this.table_buttons = this.init_button_detali();
                break;
            };
        }
    };
    // Инициализация
    table_sostav_outer_way.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_wagons: false,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_change_data: null,   // Функция обратного вызова если изменили данные отображения (load... button:action...)
            fn_select_sostav: null, // Функция обратного вызова возвращяет выбранный состав
        }, options);
        //
        this.start = null;
        this.stop = null;
        this.sostav = [];               // Список составов
        this.wagons = [];               // Список вагонов

        this.id_station_on = null;      // Станция на которую прибывает состав

        this.select_row_sostav = null;  // для одинарного выбора (выбранный состав)
        this.select_rows_sostav = null;  // для многочисленного выбора
        // Детальные таблицы
        this.td_wagons = {};

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        LockScreen(langView('tsow_mess_init_module', App.Langs));
        // Вклучу когда понадобится 
        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();
        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_cars = new this.fc_ui.el_table('tab-ow-cars-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_sostav = table_cars.$element;
        this.$cars_way.addClass('table-report-operation').append(this.$table_sostav);
        // Инициализируем таблицу
        this.obj_t_sostav = this.$table_sostav.DataTable({
            "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tsow_title_all', App.Langs)]],
            "pageLength": 10,
            "deferRender": true,
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            colReorder: true,               // вкл. перетаскивание полей
            //fixedHeader: true,             // вкл. фикс. заголовка
            //fixedColumns: {
            //    leftColumns: 2,
            //},
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
                $(row).attr('id', data.outer_way_num_sostav); // id строки дислокации вагона
                if (data.count_wagons_arrival > 0 && data.count_wagons_send > data.count_wagons_arrival) {
                    $(row).addClass('yellow');// Отметим состав частично принят
                }
                if (data.count_wagons_arrival > 0 && data.count_wagons_send === data.count_wagons_arrival) {
                    $(row).addClass('green');// Отметим состав частично принят
                }
                // Проверка на создание строки операции отправки (ошибка если дата строки создания и выполнения операции больше часа )
                var from_create = moment(data.from_operation_create);
                var from_operat = moment(data.from_operation_end);
                if (from_create && from_operat && from_create.isValid() && from_operat.isValid()) {
                    var hour = from_create.diff(from_operat, 'hours');
                    if (hour >= max_err_create || hour <= min_err_create) {
                        $('td.from_create', row).addClass('error');
                    }
                }
                // Проверка на создание строки операции прибытия (ошибка если дата строки создания и выполнения операции больше часа )
                var on_create = moment(data.on_operation_create);
                var on_operat = moment(data.on_operation_end);
                if (on_create && on_operat && on_create.isValid() && on_operat.isValid()) {
                    var hour = on_create.diff(on_operat, 'hours');
                    if (hour >= max_err_create || hour <= min_err_create) {
                        $('td.on_create', row).addClass('error');
                    }
                }

            }.bind(this),
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'arrival-sostav-outer-way': {
                this.obj_t_sostav.on('user-select', function (e, dt, type, cell, originalEvent) {
                    this.out_clear();
                    var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                    var row = this.obj_t_sostav.rows(indexes).data().toArray();
                    //if (row && row.length > 0 && row[0].outgoing_sostav_status && row[0].outgoing_sostav_status > 0) {
                    //    e.preventDefault();
                    //    this.out_warning('Вагон № ' + row[0].num + ' для операций заблокирован (вагон пренадлежит составу который имеет статус - ' + row[0].outgoing_sostav_status + ')');
                    //}
                }.bind(this)).on('select deselect', function (e, dt, type, indexes) {
                    var index = this.obj_t_sostav.rows({ selected: true });
                    var rows = this.obj_t_sostav.rows(index && index.length > 0 ? index[0] : null).data().toArray();
                    this.select_rows_sostav = rows;
                    //this.obj_t_sostav.button(4).enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
                    if (typeof this.settings.fn_select_sostav === 'function') {
                        this.settings.fn_select_sostav(rows);
                    }
                }.bind(this));
                break;
            };
        };
        // Определим показывать вагоны детально
        if (this.settings.detali_wagons) this.init_detali();
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok(this.result_init);
        }
        //----------------------------------
    };
    //-------------------------------------------------------------------------------------------
    // Показать данные 
    table_sostav_outer_way.prototype.view = function (data) {
        this.out_clear();
        LockScreen(langView('tsow_mess_view_sostav', App.Langs));
        this.obj_t_sostav.clear();
        this.obj_t_sostav.rows.add(data);
        this.obj_t_sostav.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
        this.obj_t_sostav.draw();
        //this.enable_button(); // отображение кнопки добавить
        LockScreenOff();
    };
    // Выбрать состав
    table_sostav_outer_way.prototype.select_sostav = function (num) {
        if (num !== null) {
            this.obj_t_sostav.row('#' + num).select();
        }
    }
    // Загрузить составы по прибытию
    table_sostav_outer_way.prototype.load_ow_arr_sostav = function () {
        LockScreen(langView('tsow_mess_load_sostav', App.Langs));
        this.ids_wsd.getViewSostavOfOuterWay(function (sostav) {
            this.sostav = sostav;
            this.view(this.sostav);
            LockScreenOff();
        }.bind(this));
    };
    // Загрузить составы по прибывающие на станцию 
    table_sostav_outer_way.prototype.load_ow_arr_sostav_of_station_on = function (id_station, cb_load) {
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('tsow_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewArrivalSostavOfStationOuterWay(id_station, function (sostav) {
                this.sostav = sostav;
                this.id_station_on = id_station;
                this.view(this.sostav);
                LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load();
                }
            }.bind(this));
        } else {
            this.sostav = [];
            this.id_station_on = null;
            this.view(this.sostav);
            if (typeof cb_load === 'function') {
                cb_load();
            }
            //
        }
    };
    // Загрузить составы по прибывающие на станцию 
    table_sostav_outer_way.prototype.load_operation_sostav_of_period = function (start, stop, cb_load) {
        if (start >= 0 && stop >= 0) {
            LockScreen(langView('tsow_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewSostavOfPeriodOperationSend(start, stop, function (sostav) {
                this.sostav = sostav;
                this.start = start;
                this.stop = stop;
                this.select_row_sostav = null;
                //this.view(this.sostav);
                LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.sostav);
                }
            }.bind(this));
        } else {
            this.sostav = [];
            this.start = null;
            this.stop = null;
            //this.view(this.sostav);
            if (typeof cb_load === 'function') {
                cb_load(this.sostav);
            }
        }
    };
    //------------------------------------------------------------------------
    // Выбрать строку детально
    table_sostav_outer_way.prototype.detali_select_row = function (tr) {
        var row = this.obj_t_sostav.row(tr);
        // Проверим, строка определена
        if (row && row.length > 0) {
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                this.destroy_detali(row.data());
                tr.removeClass('shown');
            }
            else {
                row.child('<div class="card border-primary ml-1">' +
                    '<div class="card-header text-left">' + langView('tsow_title_detali_wagon', App.Langs) + ' : ' + row.data().outer_way_num_sostav + '</div>' +
                    '<div class="card-body table-directory">' +
                    '<div class="row">' +
                    '<div class="col-xl-12 ">' +
                    //'<div class="">' + //container-fluid
                    '<div id="' + this.selector + '-wd-' + row.data().outer_way_num_sostav + '"></div>' +
                    //'</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>').show();
                // Инициализируем
                this.view_detali(row.data());
                tr.addClass('shown');
            }
        }
    };
    // Инициализация таблицы детально
    table_sostav_outer_way.prototype.init_detali = function () {
        this.$table_sostav.find('tbody')
            .on('click', 'td.details-control-wagons-sostav', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                this.detali_select_row(tr);
            }.bind(this));
    };
    // Показать детали
    table_sostav_outer_way.prototype.view_detali = function (data) {
        var base = this;
        var TCOW = App.table_cars_outer_way;
        var sl = 'div#' + this.selector + '-wd-' + data.outer_way_num_sostav;
        this.td_wagons[data.outer_way_num_sostav] = new TCOW(sl); // Создадим экземпляр вогонов на подходах
        this.td_wagons[data.outer_way_num_sostav].init({
            alert: this.alert_from,
            type_report: 'history-send-wagons',  // вагоны отправленного состава
            ids_wsd: this.ids_wsd,
            fn_change_data: function (wagons) {
            }.bind(this),
        }, function () {
            this.td_wagons[data.outer_way_num_sostav].load_ow_arr_wagons_of_sostav(data ? data.outer_way_num_sostav : null);
        }.bind(this));
    };
    // Очистить детали по указаному составу
    table_sostav_outer_way.prototype.destroy_detali = function (data) {
        if (this.td_wagons[data.outer_way_num_sostav]) {
            this.td_wagons[data.outer_way_num_sostav].destroy();
            delete this.td_wagons[data.outer_way_num_sostav];
        }
    };
    // Очистить все детали
    table_sostav_outer_way.prototype.destroy_all_detali = function () {
        $.each(this.td_wagons, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.td_wagons = {};
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_sostav_outer_way.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_sostav_outer_way.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_sostav_outer_way.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_sostav_outer_way.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_sostav_outer_way.prototype.destroy = function () {
        // Вкл. когда понадобится 
        //if (this.modal_confirm_form) this.modal_confirm_form.destroy();
        this.destroy_all_detali(); // Удалить все таблицы детально, если созданы
        if (this.obj_t_sostav) {
            this.obj_t_sostav.destroy(true);
            this.obj_t_sostav = null;
        }

        this.$table_sostav.empty(); // empty in case the columns change
    }

    App.table_sostav_outer_way = table_sostav_outer_way;

    window.App = App;
})(window);