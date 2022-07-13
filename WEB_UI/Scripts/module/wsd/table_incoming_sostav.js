/*Модуль Таблица "Прибываемые составы"*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    var email_krr_services = 'KRR.IT.Service@arcelormittal.com';
    var email_error_epd = 'Sergey.Arhipov@arcelormittal.com';
    var email_error_mt = 'eduard.levchenko@arcelormittal.com';

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_err_create = -1; // TODO: Минимальная разница в часах создания строки и указаной даты выполнения
    var max_err_create = 1; // TODO: Максимальная разница в часах создания строки и указаной даты выполнения

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'tis_field_status_icon': '',
            'tis_field_status': 'Статус',
            'tis_field_id_sostav': 'id состав',
            'tis_field_train': '№ поезда',
            'tis_field_composition_index': 'Индекс поезда',
            'tis_field_date_arrival': 'Время прибытия',
            'tis_field_date_adoption': 'Время приема',
            'tis_field_date_adoption_act': 'Время приема по акту',
            'tis_field_id_station_from': 'id Станции отправления',
            'tis_field_station_from_name': 'Отправлен со станции',
            'tis_field_station_from_abbr': 'Отправлен со станции',
            'tis_field_id_station_on': 'id станции приема',
            'tis_field_station_on_name': 'Принят на станцию',
            'tis_field_station_on_abbr': 'Принят на станцию',
            'tis_field_id_way_on': 'id пути приема.',
            'tis_field_way_on_num': 'Принят на путь',
            'tis_field_way_on_name': 'Принят на путь',
            'tis_field_num_doc': '№ Вед.',
            'tis_field_count_status': 'Всего|прин.|ост.',
            'tis_field_create': 'Создан',
            'tis_field_create_user': 'Создал',
            'tis_field_change': 'Правили',
            'tis_field_change_user': 'Правил',

            'tis_title_yes': 'Да',
            'tis_title_yellow': 'В работе',
            'tis_title_green': 'Принят',
            'tis_title_red': 'Отмена',
            'tis_title_all': 'Все',
            'tis_title_button_export': 'Экспорт',
            'tis_title_button_buffer': 'Буфер',
            'tis_title_button_excel': 'Excel',
            'tis_title_excel_sheet_name': 'Составы',
            'tis_title_button_field': 'Поля',
            'tis_title_button_field_select': 'Выбрать',
            'tis_title_button_field_view_all': 'Показать все',
            'tis_title_button_field_clear': 'Сбросить',
            'tis_title_button_add_sostav': 'Добавить',
            'tis_title_button_edit_sostav': 'Править',
            'tis_title_button_delete_sostav': 'Удалить',
            'tis_title_button_wagon': 'Вагоны',
            'tis_title_button_wagon_accept': 'Принять вагоны',
            'tis_title_button_wagon_view': 'Показать вагоны',
            'tis_title_button_refresh': 'Обновить',
            'tis_title_button_rerror_db_epd': 'БД-ЭПД',

            'tis_mess_init_module': 'Инициализация модуля (table_incoming_sostav) ...',
            'tis_mess_load_sostav': 'Загружаю составы...',
            'tis_mess_run_operation': 'Выполняю операцию...',
            'tis_mess_warning_id_sostav_null': 'Операция недопустима состав не выбран!',
            'tis_mess_error_sostav_null': 'Состав по id:{0} не найден!',
            'tis_mess_operation_delete': '"УДАЛИТЬ СОСТАВ"',
            'tis_mess_operation_reject': '"ОТКЛОНИТЬ СОСТАВ"',

            'tis_mess_update_sostav': 'Обновляю составы...',
            'tis_mess_view_sostav': 'Показываю составы...',
            'tis_mess_ok_operation_edit_sostav': 'Операция «ПРАВИТЬ СОСТАВ» - Выполнена',
            'tis_mess_error_operation_edit_sostav': 'Ошибка выполнения операции «ПРАВИТЬ СОСТАВ»',
            'tis_mess_ok_operation_add_sostav': 'Операция «ДОБАВИТЬ СОСТАВ» - Выполнена',
            'tis_mess_error_operation_add_sostav': 'Ошибка выполнения операции «ДОБАВИТЬ СОСТАВ»',

            'tis_mess_error_select_sostav': 'Операция {0} - невозможна состав не выбран!',
            'tis_mess_error_status_sostav': 'Операция {0} - невозможна, состав уже обрабатывается или отклонён.',
            'tis_title_form_delete': 'Удалить?',
            'tis_title_form_reject': 'Отклонить?',
            'tis_message_form_delete_reject': 'Вы уверены что хотите выполнить операцию {0} над составом прибывшим : {1}, поездом №{2}?',
            'tis_mess_cancel_operation_delete': 'Операция {0} - Отменена!',
            'tis_mess_run_operation_reject': 'Выполняю операцию "ОТКЛОНИТЬ СОСТАВ"',
            'tis_mess_run_operation_delete': 'Выполняю операцию "УДАЛИТЬ СОСТАВ"',

            'tis_mess_ok_operation_reject': 'Операция "ОТКЛОНИТЬ СОСТАВ" - Выполнена',
            'tis_mess_error_operation_reject': 'Ошибка выполнения операции "ОТКЛОНИТЬ СОСТАВ", код ошибки :',
            'tis_mess_ok_operation_delete': 'Операция "УДАЛИТЬ СОСТАВ" - Выполнена',
            'tis_mess_error_operation_delete': 'Ошибка выполнения операции "УДАЛИТЬ СОСТАВ", код ошибки :',
        },
        'en':  //default language: English
        {
            'tis_field_status_icon': '',
            'tis_field_status': 'Status',
            'tis_field_id_sostav': 'composition id',
            'tis_field_id_composition': 'composition id',
            'tis_field_train': 'Train#',
            'tis_field_composition_index': 'Train index',
            'tis_field_date_arrival': 'Arrival Time',
            'tis_field_date_adoption': 'Adoption Time',
            'tis_field_date_adoption_act': 'Tis_field_date_adoption_act',
            'tis_field_id_station_from': 'id of departure station',
            'tis_field_station_from_name': 'Sent From Station',
            'tis_field_station_from_abbr': 'Sent From Station',
            'tis_field_id_station_on': 'receiving station id',
            'tis_field_station_on_name': 'Tis_field_station_on_name',
            'tis_field_station_on_abbr': 'Tis_field_station_on_abbr',
            'tis_field_id_way_on': 'id of the receiving path.',
            'tis_field_way_on_num': 'Tis_field_way_on_num',
            'tis_field_way_on_name': 'Tis_field_way_on_name',
            'tis_field_num_doc': 'Ved. No.',
            'tis_field_count_status': 'Total|Incoming|Remaining',
            'tis_field_create': 'Created',
            'tis_field_create_user': 'Created',
            'tis_field_change': 'Rules',
            'tis_field_change_user': 'Rules',

            'tis_title_yes': 'Yes',
            'tis_title_yellow': 'In Progress',
            'tis_title_green': 'Accepted',
            'tis_title_red': 'Cancel',
            'tis_title_all': 'All',
            'tis_title_button_export': 'Export',
            'tis_title_button_buffer': 'Buffer',
            'tis_title_button_excel': 'Excel',
            'tis_title_excel_sheet_name': 'Sheets',
            'tis_title_button_field': 'Fields',
            'tis_title_button_field_select': 'Select',
            'tis_title_button_field_view_all': 'Show All',
            'tis_title_button_field_clear': 'Reset',
            'tis_title_button_add_sostav': 'Add',
            'tis_title_button_edit_sostav': 'Edit',
            'tis_title_button_add_composition': 'Add',
            'tis_title_button_edit_composition': 'Edit',
            'tis_title_button_delete_sostav': 'Delete',
            'tis_title_button_wagon': 'Wagons',
            'tis_title_button_wagon_accept': 'Accept wagons',
            'tis_title_button_wagon_view': 'Show wagons',
            'tis_title_button_refresh': 'Refresh',
            'tis_title_button_rerror_db_epd': 'DB-EPD',

            'tis_mess_init_module': 'Module initialization (table_incoming_sostav) ...',
            'tis_mess_load_sostav': 'Loading lineups...',
            'tis_mess_run_operation': 'Running operation...',
            'tis_mess_warning_id_sostav_null': 'Operation invalid no composition selected!',
            'tis_mess_error_sostav_null': 'Composition by id:{0} not found!',
            'tis_mess_operation_delete': '"DELETE COMPOSITION"',
            'tis_mess_operation_reject': '"REJECT COMPOSITION"',

            'tis_mess_update_sostav': 'Updating lineups...',
            'tis_mess_view_sostav': 'Showing lineups...',
            'tis_mess_ok_operation_edit_sostav': 'Operation EDIT COMPOSITION Completed',
            'tis_mess_error_operation_edit_sostav': 'Error performing operation "EDIT COMPOSITION"',
            'tis_mess_ok_operation_add_sostav': 'Operation "ADD COMPOSITION" Completed',
            'tis_mess_error_operation_add_sostav': 'Error performing operation "ADD COMPOSITION"',

            'tis_mess_error_select_sostav': 'Operation {0} - impossible no composition selected!',
            'tis_mess_error_status_sostav': 'Operation {0} - not possible, composition already being processed or rejected.',
            'tis_title_form_delete': 'Delete?',
            'tis_title_form_reject': 'Reject?',
            'tis_message_form_delete_reject': 'Are you sure you want to perform operation {0} on the train that arrived: {1}, train #{2}?',
            'tis_mess_cancel_operation_delete': 'Operation {0} - Canceled!',
            'tis_mess_run_operation_reject': 'Running "REJECT COMPOSITION" operation',
            'tis_mess_run_operation_delete': 'Running "DELETE COMPOSITION" operation',

            'tis_mess_ok_operation_reject': 'Operation "REJECT COMPOSITION" - Done',
            'tis_mess_error_operation_reject': 'Error performing operation "REJECT COMPOSITION", error code :',
            'tis_mess_ok_operation_delete': 'DELETE COMPOSITION Operation Completed',
            'tis_mess_error_operation_delete': 'Error performing operation "DELETE COMPOSITION", error code :',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var FHIIGS = App.form_hi_incoming_sostav; // форма Добавления и изменения состава

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
        // Статус Вода состава
        {
            field: 'status_input',
            data: function (row, type, val, meta) {
                if (row.id_arrived !== null && row.id_sostav !== null) {
                    return "<i class='fas fa-train' style='color:#795acd;'></i>";
                } else { return "<i class='fas fa-user' style='color:#ffbf00;'></i>"; }
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_status_icon', App.Langs), width: "20px", orderable: false, searchable: false
        },
        // Статус обработки состава
        {
            field: 'status_icon',
            data: function (row, type, val, meta) {

                switch (row.status) {
                    case 1: return "<i class='fas fa-exclamation-circle' style='color:#ffbf00;'></i>";
                    case 2: return "<i class='fas fa-check' style='color:#008000;'></i>";
                    case 3: return "<i class='fas fa-ban' style='color:#ff0b0b;'></i>";
                    default: return null;
                }
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_status_icon', App.Langs), width: "20px", orderable: false, searchable: false
        },
        {
            field: 'status',
            data: function (row, type, val, meta) {
                switch (row.status) {
                    case 1: return "<i class='fas fa-exclamation-circle' style='color:#ffbf00;'></i> " + langView('tis_title_yellow', App.Langs);
                    case 2: return "<i class='fas fa-check' style='color:#008000;'></i> " + langView('tis_title_green', App.Langs);
                    case 3: return "<i class='fas fa-ban' style='color:#ff0b0b;'></i> " + langView('tis_title_red', App.Langs);
                    default: return null;
                }
            },
            className: 'dt-body-left',
            title: langView('tis_field_status', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('tis_field_id_sostav', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'train',
            data: function (row, type, val, meta) {


                if (row.id_arrived !== null && row.id_sostav !== null) {
                    return "<i class='fas fa-train' style='color:#795acd;'></i> " + row.train;
                } else { return "<i class='fas fa-user' style='color:#ffbf00;'></i> " + row.train; }
            },
            className: 'dt-body-center',
            title: langView('tis_field_train', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Индекс поезда
        {
            field: 'composition_index',
            data: function (row, type, val, meta) {
                return row.composition_index;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_composition_index', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время прибытия
        {
            field: 'date_arrival',
            data: function (row, type, val, meta) {
                return row.date_arrival ? moment(row.date_arrival).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_date_arrival', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Время приема
        {
            field: 'date_adoption',
            data: function (row, type, val, meta) {
                return row.date_adoption ? moment(row.date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'date_adoption_act',
            data: function (row, type, val, meta) {
                return row.date_adoption_act ? moment(row.date_adoption_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_date_adoption_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция отправки
        {
            field: 'id_station_from',
            data: function (row, type, val, meta) {
                return row.id_station_from;
            },
            className: 'dt-body-center',
            title: langView('tis_field_id_station_from', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'station_from_name',
            data: function (row, type, val, meta) {
                return row['station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tis_field_station_from_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'station_from_abbr',
            data: function (row, type, val, meta) {
                return row['station_from_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tis_field_station_from_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция приема
        {
            field: 'id_station_on',
            data: function (row, type, val, meta) {
                return row.id_station_on;
            },
            className: 'dt-body-center',
            title: langView('tis_field_id_station_on', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'station_on_name',
            data: function (row, type, val, meta) {
                return row['station_on_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tis_field_station_on_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'station_on_abbr',
            data: function (row, type, val, meta) {
                return row['station_on_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('tis_field_station_on_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // путь приема
        {
            field: 'id_way_on',
            data: function (row, type, val, meta) {
                return row.id_way_on;
            },
            className: 'dt-body-center',
            title: langView('tis_field_id_way_on', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'way_on_num',
            data: function (row, type, val, meta) {
                return row['way_on_num_' + App.Lang];
            },
            className: 'dt-body-center',
            title: langView('tis_field_way_on_num', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'way_on_name',
            data: function (row, type, val, meta) {
                return row['way_on_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('tis_field_way_on_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'num_doc',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('tis_field_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: "count_status",
            data: function (row, type, val, meta) {
                return row.count_all + " | " + row.count_arrival + " | " + row.count_not_arrival;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_count_status', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Создана
        {
            field: 'create',
            data: function (row, type, val, meta) {
                return row.create ? moment(row.create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'create_user',
            data: function (row, type, val, meta) {
                return row.create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // изменена
        {
            field: 'change',
            data: function (row, type, val, meta) {
                return row.change ? moment(row.change).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_change', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'change_user',
            data: function (row, type, val, meta) {
                return row.change_user;
            },
            className: 'dt-body-nowrap',
            title: langView('tis_field_change_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('tis_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('tis_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('tis_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('tis_title_excel_sheet_name', App.Langs),
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
            text: langView('tis_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('tis_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('tis_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('tis_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'add_sostav',
            text: langView('tis_title_button_add_sostav', App.Langs),
            enabled: true
        },
        {
            button: 'edit_sostav',
            text: langView('tis_title_button_edit_sostav', App.Langs),
            enabled: false
        },
        {
            button: 'delete_sostav',
            text: langView('tis_title_button_delete_sostav', App.Langs),
            enabled: false
        },
        {
            button: 'view_wagons',
            text: langView('tis_title_button_wagon', App.Langs),
            enabled: false
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
            button: 'error_db_epd',
            className: 'buttons-error',
            text: langView('tis_title_button_rerror_db_epd', App.Langs),
            enabled: true
        },
    ];
    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_incoming_sostav(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$incoming_sostav = $(selector);
        if (this.$incoming_sostav.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$incoming_sostav.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_incoming_sostav.prototype.init_columns_detali = function () {
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
    table_incoming_sostav.prototype.init_columns_incoming_sostav = function () {
        var collums = [];
        collums.push({ field: 'status', title: null, class: 'fixed-column' });                            // Статус
        collums.push({ field: 'train', title: null, class: 'fixed-column' });                             // Ведомость
        collums.push({ field: 'composition_index', title: null, class: 'fixed-column' });                 //Индекс поезда
        collums.push({ field: 'date_arrival', title: null, class: 'fixed-column' });                      // время прибытия
        collums.push({ field: 'date_adoption', title: null, class: null });                     // время приема
        collums.push({ field: 'date_adoption_act', title: null, class: null });                 // время приема
        collums.push({ field: 'station_from_name', title: null, class: null });                 // Станция отправки
        collums.push({ field: 'station_on_name', title: null, class: null });                   // Станция приема
        collums.push({ field: 'way_on_num', title: null, class: null });                        // Путь приема
        collums.push({ field: 'num_doc', title: null, class: null });                            // Ведомость
        collums.push({ field: 'count_status', title: null, class: null });                       // Всего|прин.|ост..
        collums.push({ field: 'create', title: null, class: null });
        collums.push({ field: 'create_user', title: null, class: null });
        collums.push({ field: 'change', title: null, class: null });
        collums.push({ field: 'change_user', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_incoming_sostav.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок outgoing_sostav
    table_incoming_sostav.prototype.init_button_incoming_sostav = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'add_sostav',
            action: function (e, dt, node, config) {
                this.action_add_sostav(); // выполнить операцию
            }.bind(this)
        });
        buttons.push({
            name: 'edit_sostav',
            action: function (e, dt, node, config) {
                this.action_edit_sostav(); // выполнить операцию
            }.bind(this)
        });
        buttons.push({
            name: 'delete_sostav',
            action: function (e, dt, node, config) {
                this.action_delete_sostav(); // выполнить операцию
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
        buttons.push({
            name: 'error_db_epd',
            action: function (e, dt, node, config) {
                this.action_error_db_epd();
            }.bind(this)
        });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_incoming_sostav.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'incoming_sostav': {
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 4;
                this.order_column = [3, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_incoming_sostav();
                this.table_buttons = this.init_button_incoming_sostav();
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
    table_incoming_sostav.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('tis_mess_init_module', App.Langs));
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

        this.duration_min_epd = 0;

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
        this.$incoming_sostav.addClass('table-report-operation').append(this.$table_sostav);
        // Инициализируем таблицу
        this.obj_t_sostav = this.$table_sostav.DataTable({
            "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('tis_title_all', App.Langs)]],
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
                    case 3: $(row).addClass('red'); break;
                }
            }.bind(this),
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'incoming_sostav': {
                this.obj_t_sostav.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                }.bind(this));

                break;
            };
        };

        // Форма править состав по приему ===============================================================================
        this.fhiigs = new FHIIGS();
        this.fhiigs.init({
            mode : 0,
            alert: this.settings.alert,
            ids_wsd: this.ids_wsd,
            fn_init: function (init) {
                // На проверку окончания инициализации
                //----------------------------------
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init(this.result_init);
                }
                //----------------------------------
            }.bind(this),
            fn_add: function (result) {
                this.out_clear();
                this.action_refresh(function () {
                    if (result && result.result > 0) {
                        this.out_info(langView('tis_mess_ok_operation_add_sostav', App.Langs));
                    } else {
                        this.out_info(langView('tis_mess_error_operation_add_sostav', App.Langs));
                    }
                }.bind(this));
            }.bind(this),
            fn_edit: function (result) {
                this.out_clear();
                this.action_refresh(function () {
                    if (result && result.result > 0) {
                        this.out_info(langView('tis_mess_ok_operation_edit_sostav', App.Langs));
                    } else {
                        this.out_info(langView('tis_mess_error_operation_edit_sostav', App.Langs));
                    }
                }.bind(this));
            }.bind(this),
        });
    };
    //-------------------------------------------------------------------------------------------
    // обновим информацию об выбраных строках
    table_incoming_sostav.prototype.select_rows = function () {
        var index = this.obj_t_sostav.rows({ selected: true });
        var rows = this.obj_t_sostav.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.select_rows_sostav = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Показать данные
    table_incoming_sostav.prototype.view = function (data, id_station, id_sostav) {
        this.id_station = id_station;
        this.out_clear();
        //var current_order = this.obj_t_sostav.order();
        LockScreen(langView('tis_mess_view_sostav', App.Langs));
        this.obj_t_sostav.clear();

        this.obj_t_sostav.rows.add(id_station !== null ? data.filter(function (i) { return i.id_station_from === id_station }) : data);
        // Если состав не выбран, сортировка по умолчанию
        if (id_sostav === null) {
            this.obj_t_sostav.order(this.order_column); // Сортируем по умолчанию если не выбран состав
            //this.obj_t_sostav.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
        }
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
    table_incoming_sostav.prototype.load_outgoing_sostav = function (start, stop, cb_load) {
        if (start !== null && stop !== null) {
            LockScreen(langView('tis_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewIncomingSostav(start, stop, function (sostav) {
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
    table_incoming_sostav.prototype.update = function (cb_load) {
        if (this.start !== null && this.stop !== null) {
            LockScreen(langView('tis_mess_update_sostav', App.Langs));
            this.ids_wsd.getViewIncomingSostav(this.start, this.stop, function (sostav) {
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
    table_incoming_sostav.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            case 'incoming_sostav': {
                if (this.select_rows_sostav && this.select_rows_sostav.length > 0) {
                    this.obj_t_sostav.button(5).enable(true);
                    if (this.select_rows_sostav[0].status < 1) {
                        this.obj_t_sostav.button(3).enable(true);
                        this.obj_t_sostav.button(4).enable(true); // отмена сдачи состава
                        this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_accept', App.Langs));
                    } else {
                        // Если статус в работе принят или удален 
                        this.obj_t_sostav.button(3).enable(true);
                        this.obj_t_sostav.button(4).enable(false);
                        //if (this.select_rows_sostav[0].status === 2) { this.obj_t_sostav.button(4).enable(true); } else { this.obj_t_sostav.button(4).enable(false); }
                        this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_view', App.Langs));
                    }
                } else {
                    this.obj_t_sostav.button(3).enable(false);
                    this.obj_t_sostav.button(4).enable(false);
                    this.obj_t_sostav.button(5).enable(false);
                }
                break;
            };
        };
    };
    // Выполнить операцию создать состав
    table_incoming_sostav.prototype.action_add_sostav = function () {
        this.out_clear();
        this.fhiigs.add();
    };
    // Выполнить операцию изменить состав
    table_incoming_sostav.prototype.action_edit_sostav = function () {
        this.out_clear();
        LockScreen(langView('tis_mess_run_operation', App.Langs));
        if (this.id_sostav !== null) {
            this.ids_wsd.getIncomingSostavOfID(this.id_sostav, function (sostav) {
                if (sostav) {
                    LockScreenOff();
                    this.fhiigs.edit(sostav);
                } else {
                    // Ошибка, состав не найден 
                    this.out_warning(langView('tis_mess_error_sostav_null', App.Langs).format(this.id_sostav));
                    LockScreenOff();
                };
            }.bind(this));
        } else {
            // Ошибка id не определено
            this.out_warning(langView('tis_mess_warning_id_sostav_null', App.Langs));
            LockScreenOff();
        }


    };
    // Выполнить операцию удалить состав
    table_incoming_sostav.prototype.action_delete_sostav = function () {
        this.out_clear();
        // Получим выбранный состав, если выбран
        var sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0] : null;
        if (sostav) {
            var name_operation = sostav.id_arrived === null ? langView('tis_mess_operation_delete', App.Langs) : langView('tis_mess_operation_reject', App.Langs);
            if (sostav.status === 0) {

                var message = langView('tis_message_form_delete_reject', App.Langs).format(name_operation, moment(sostav.date_arrival).format(format_datetime), sostav.train);
                var title = sostav.id_arrived === null ? langView('tis_title_form_delete', App.Langs) : langView('tis_title_form_reject', App.Langs)
                this.modal_confirm_form.view(title, message, function (res) {
                    if (res) {
                        // Проверим ручной ввод или автоматический
                        if (sostav.id_arrived === null) {
                            // Ручной ввод, удалим
                            LockScreen(langView('tis_mess_run_operation_delete', App.Langs));
                            this.out_clear();
                            // Выполнить операцию удалить состав
                            this.ids_wsd.deleteIncomingSostav(sostav.id, function (result_delete) {
                                if (result_delete > 0) {
                                    this.action_refresh(function () {
                                        this.out_info(langView('tis_mess_ok_operation_delete', App.Langs).format(name_operation));
                                        //LockScreenOff();
                                    }.bind(this));
                                } else {
                                    this.out_error(langView('tis_mess_error_operation_delete', App.Langs) + result_delete);
                                    LockScreenOff();
                                }
                            }.bind(this));
                        } else {
                            // Автоматический ввод, откланим
                            LockScreen(langView('tis_mess_run_operation_reject', App.Langs));
                            this.out_clear();
                            sostav.status = 3;
                            sostav.change = moment().format("YYYY-MM-DDThh:mm:ss");
                            sostav.change_user = App.User_Name;
                            this.ids_wsd.putIncomingSostav(sostav, function (result) {
                                if (result > 0) {
                                    this.action_refresh(function () {
                                        this.out_info(langView('tis_mess_ok_operation_reject', App.Langs).format(name_operation));
                                        //LockScreenOff();
                                    }.bind(this));
                                } else {
                                    this.out_error(langView('tis_mess_error_operation_reject', App.Langs) + result);
                                    LockScreenOff();
                                }
                            }.bind(this));
                        }
                    } else {
                        this.out_clear();
                        this.out_warning(langView('tis_mess_cancel_operation_delete', App.Langs).format(name_operation));
                    }
                }.bind(this));
            } else {
                this.out_warning(langView('tis_mess_error_status_sostav', App.Langs).format(name_operation));
            }
        } else {
            this.out_warning(langView('tis_mess_error_select_sostav', App.Langs).format(name_operation));
        }



        //if (this.select_rows_sostav && this.select_rows_sostav.length > 0 && this.select_rows_sostav[0].status === 0) {
        //    var sostav = this.select_rows_sostav[0];
        //    var message = langView('tos_mess_comfirm_return', App.Langs).format(sostav.num_doc, sostav["station_from_name_" + App.Lang], sostav["way_from_num_" + App.Lang]);
        //    this.modal_confirm_form.view(langView('tos_title_form_return', App.Langs), message, function (res) {
        //        if (res) {
        //            LockScreen(langView('tos_mess_run_operation', App.Langs));
        //            // Сформируем операцию
        //            var operation_provide = {
        //                id_sostav: sostav.id,
        //                user: App.User_Name,
        //            }
        //            // Выполнить операцию отменить предъявление сотава для сдачи на уз
        //            this.ids_wsd.postReturnProvideWagonsOfStation(operation_provide, function (result_provide) {
        //                if (result_provide && result_provide.result > 0) {
        //                    this.update(function (sostav) {
        //                        this.view(sostav, this.id_station, null);
        //                        this.out_info(langView('tos_mess_ok_return', App.Langs));
        //                        LockScreenOff();
        //                    }.bind(this));
        //                } else {
        //                    this.out_error(langView('tos_mess_error_return', App.Langs).format(result_provide ? result_provide.result : null));
        //                    if (result_provide && result_provide.listResult && result_provide.listResult.length > 0) {
        //                        $.each(result_provide.listResult, function (i, el) {
        //                            if (el.result < 0) {
        //                                this.out_error(langView('tos_mess_error_wagon_return', App.Langs).format(el.num, el.result));
        //                            }
        //                        }.bind(this));
        //                    }
        //                    LockScreenOff();
        //                }
        //            }.bind(this));
        //        } else {
        //            this.out_clear();
        //            this.out_warning(langView('tos_mess_cancel_return', App.Langs));
        //        }
        //    }.bind(this));
        //} else {
        //    this.out_warning(langView('tos_mess_err_return_sostav', App.Langs));
        //}
    };
    //table_incoming_sostav.prototype.action_return_sostav = function () {
    //    this.out_clear();
    //    if (this.select_rows_sostav && this.select_rows_sostav.length > 0 && this.select_rows_sostav[0].status === 0) {
    //        var sostav = this.select_rows_sostav[0];
    //        var message = langView('tis_mess_comfirm_return', App.Langs).format(sostav.num_doc, sostav["station_from_name_" + App.Lang], sostav["way_from_num_" + App.Lang]);
    //        this.modal_confirm_form.view(langView('tis_title_form_return', App.Langs), message, function (res) {
    //            if (res) {
    //                LockScreen(langView('tis_mess_run_operation', App.Langs));
    //                // Сформируем операцию
    //                var operation_provide = {
    //                    id_sostav: sostav.id,
    //                    user: App.User_Name,
    //                }
    //                // Выполнить операцию отменить предъявление сотава для сдачи на уз
    //                this.ids_wsd.postReturnProvideWagonsOfStation(operation_provide, function (result_provide) {
    //                    if (result_provide && result_provide.result > 0) {
    //                        this.update(function (sostav) {
    //                            this.view(sostav, this.id_station, null);
    //                            this.out_info(langView('tis_mess_ok_return', App.Langs));
    //                            LockScreenOff();
    //                        }.bind(this));
    //                    } else {
    //                        this.out_error(langView('tis_mess_error_return', App.Langs).format(result_provide ? result_provide.result : null));
    //                        if (result_provide && result_provide.listResult && result_provide.listResult.length > 0) {
    //                            $.each(result_provide.listResult, function (i, el) {
    //                                if (el.result < 0) {
    //                                    this.out_error(langView('tis_mess_error_wagon_return', App.Langs).format(el.num, el.result));
    //                                }
    //                            }.bind(this));
    //                        }
    //                        LockScreenOff();
    //                    }
    //                }.bind(this));
    //            } else {
    //                this.out_clear();
    //                this.out_warning(langView('tis_mess_cancel_return', App.Langs));
    //            }
    //        }.bind(this));
    //    } else {
    //        this.out_warning(langView('tis_mess_err_return_sostav', App.Langs));
    //    }
    //};
    //// Выполнить операцию вернуть состав сданный на УЗ
    //table_incoming_sostav.prototype.action_return_sostav_uz = function () {
    //    this.out_clear();
    //    if (this.select_rows_sostav && this.select_rows_sostav.length > 0 && this.select_rows_sostav[0].status === 2) {
    //        var sostav = this.select_rows_sostav[0];
    //        var message = langView('tis_mess_comfirm_return_uz', App.Langs).format((sostav.date_outgoing ? moment(sostav.date_outgoing).format(format_datetime) : null), sostav.num_doc, sostav["station_from_name_" + App.Lang], sostav["way_from_num_" + App.Lang]);
    //        this.modal_confirm_form.view(langView('tis_title_form_return', App.Langs), message, function (res) {
    //            if (res) {
    //                LockScreen(langView('tis_mess_run_operation', App.Langs));
    //                // Подготовим операцию
    //                var operation = {
    //                    id_outgoing_sostav: sostav.id,
    //                    user: App.User_Name
    //                };
    //                // Выполним операцию
    //                this.ids_wsd.postOperationReturnPresentSostav(operation, function (result_operation) {
    //                    if (result_operation > 0) {
    //                        this.update(function (sostav) {
    //                            this.view(sostav, this.id_station, this.id_sostav);
    //                            this.out_info(langView('tis_mess_ok_return_uz', App.Langs));
    //                            LockScreenOff();
    //                        }.bind(this));
    //                    } else {
    //                        // Ошибка выполнения
    //                        this.out_error(langView('tis_mess_error_return_uz', App.Langs).format(result_operation));
    //                        LockScreenOff();
    //                    }
    //                }.bind(this));
    //            } else {
    //                this.out_clear();
    //                this.out_warning(langView('tis_mess_cancel_return_uz', App.Langs));
    //            }
    //        }.bind(this));
    //    } else {
    //        this.out_warning(langView('tis_mess_err_return_sostav', App.Langs));
    //    };
    //};
    // Выполнить операцию обновить
    table_incoming_sostav.prototype.action_refresh = function (cb_refresh) {
        this.out_clear();
        this.update(function (sostav) {
            this.view(sostav, this.id_station, this.id_sostav);
            LockScreenOff();
            if (typeof cb_refresh === 'function') {
                cb_refresh(this.sostav);
            }
        }.bind(this));
    };
    //
    table_incoming_sostav.prototype.action_error_db_epd = function () {
        window.open('mailto:' + email_krr_services + ';' + email_error_epd + '?subject=Не заполняется промежуточная база ЭПД&body=Инцидент направить на группу: KRR-ДАТП - DDICS / Архипов Сергей (Arhipov, Sergey A) (интервал :' + this.duration_min_epd.toFixed(0) + ' минут)', '_self');
    };
    // Загрузить составы прибывающие на станцию 
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_incoming_sostav.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_incoming_sostav.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_incoming_sostav.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_incoming_sostav.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    table_incoming_sostav.prototype.destroy = function () {
        // Вкл. когда понадобится
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Уберем модуль Форма "Править состав прибытия"
        if (this.fhiigs) {
            this.fhiigs.destroy();
            this.fhiigs = null;
        }
        //
        if (this.obj_t_sostav) {
            this.obj_t_sostav.destroy(true);
            this.obj_t_sostav = null;
        }
        this.$incoming_sostav.empty(); // empty in case the columns change
    }

    App.table_incoming_sostav = table_incoming_sostav;

    window.App = App;
})(window);