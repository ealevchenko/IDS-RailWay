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
            'field_outer_way_num_sostav': '№ состава',
            'field_id_outer_way': 'id перег.',
            'field_name_outer_way': 'Перегон',
            'field_outer_way_close': 'Перег. закрыт',
            'field_outer_way_delete': 'Перег. удален',
            'field_from_operation_locomotive1': 'Лок.№1',
            'field_from_operation_locomotive2': 'Лок.№2',
            'field_from_operation_start': 'Нач. опер. отпр.',
            'field_from_operation_end': 'Кон. опер. отпр.',
            'field_from_operation_create': 'Опер. отпр. создана',
            'field_from_operation_create_user': 'Вып. опер. отправл.',
            'field_from_id_station': 'id ст. отпр.',
            'field_from_station_name': 'Станция отправления',
            'field_from_station_abbr': 'Ст. отпр. (аббр.)',
            'field_from_id_way': 'id путь отпр.',
            'field_from_id_park': 'id парка отпр.',
            'field_from_way_name': 'Путь отправки',
            'field_from_way_abbr': 'Путь отпр. (аббр.)',
            'field_from_way_capacity': 'Путь отпр. (вмест.)',
            'field_from_way_close': 'Путь отпр. закрыт',
            'field_from_way_delete': 'Путь отпр. удален',
            'field_count_wagons_send': 'Отпр. ваг.',
            'field_on_operation_locomotive1': 'Лок.№1',
            'field_on_operation_locomotive2': 'Лок.№2',
            'field_on_operation_start': 'Нач. опер. приб.',
            'field_on_operation_end': 'Кон. опер. приб.',
            'field_on_operation_create': 'Опер. приб. создана',
            'field_on_operation_create_user': 'Вып. опер. приб.',
            'field_on_id_station': 'id ст. приб.',
            'field_on_station_name': 'Станция прибытия',
            'field_on_station_abbr': 'Ст. приб. (аббр.)',
            'field_on_id_way': 'id путь приб.',
            'field_on_id_park': 'id парка приб.',
            'field_on_way_name': 'Путь прибытия',
            'field_on_way_abbr': 'Путь приб. (аббр.)',
            'field_on_way_capacity': 'Путь приб. (вмест.)',
            'field_on_way_close': 'Путь приб. закрыт',
            'field_on_way_delete': 'Путь приб. удален',
            'field_count_wagons_arrival': 'Прин. ваг.',

            //'title_yes': 'Да',
            //'title_busy': 'Занят',
            //'title_all': 'Все',
            //'title_status_0': 'Предъявлен',
            //'title_status_1': 'В работе',
            //'title_status_2': 'Сдан',
            //'title_status_3': 'Отправлен',
            //'title_status_4': 'Возврат',

            //'title_link_num': 'Показать историю по вагону...',

            //'title_button_export': 'Экспорт',
            //'title_button_buffer': 'Буфер',
            //'title_button_excel': 'Excel',
            //'title_button_field': 'Поля',
            //'title_button_field_select': 'Выбрать',
            //'title_button_field_view_all': 'Показать все',
            //'title_button_field_clear': 'Сбросить',

            //'title_button_select_all': 'Все вагоны',
            //'title_button_select_none': 'Убрать выбор',
            //'title_button_add_way_sending': 'Добавить в состав',
            //'title_button_del_way_sending': 'Убрать из состава',
            //'title_button_reverse_num_wagon': 'Реверс',

            'mess_init_module': 'Инициализация модуля…',
            'mess_load_wagons': 'Загружаю вагоны состава…',
            'mess_load_sostav': 'Загружаю составы на перегонах…',
            'mess_view_wagons': 'загрузка информации о вагонах состава…',
            'mess_view_sostav': 'загрузка информации о составах на перегоне…',
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
        {
            field: 'outer_way_num_sostav',
            data: function (row, type, val, meta) {
                return row.outer_way_num_sostav;
            },
            className: 'dt-body-center',
            title: langView('field_outer_way_num_sostav', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Перегон
        {
            field: 'id_outer_way',
            data: function (row, type, val, meta) {
                return row.id_outer_way;
            },
            className: 'dt-body-center',
            title: langView('field_id_outer_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'name_outer_way',
            data: function (row, type, val, meta) {
                return row['name_outer_way_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-200',
            title: langView('field_name_outer_way', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_close',
            data: function (row, type, val, meta) {
                return row.outer_way_close ? moment(row.outer_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_outer_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outer_way_delete',
            data: function (row, type, val, meta) {
                return row.outer_way_delete ? moment(row.outer_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_outer_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Операции отправки на станцию(дополнительная информаци)
        {
            field: 'from_operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.from_operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('field_from_operation_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.from_operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('field_from_operation_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_start',
            data: function (row, type, val, meta) {
                return row.from_operation_start ? moment(row.from_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_from_operation_start', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_end',
            data: function (row, type, val, meta) {
                return row.from_operation_end ? moment(row.from_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_from_operation_end', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_create',
            data: function (row, type, val, meta) {
                return row.from_operation_create ? moment(row.from_operation_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_from_operation_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'from_operation_create_user',
            data: function (row, type, val, meta) {
                return row.from_operation_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('field_from_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Станция отправки
        {
            field: 'from_id_station',
            data: function (row, type, val, meta) {
                return row.from_id_station;
            },
            className: 'dt-body-center',
            title: langView('field_from_id_station', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_station_name',
            data: function (row, type, val, meta) {
                return row['from_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_from_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_station_abbr',
            data: function (row, type, val, meta) {
                return row['from_station_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('field_from_station_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Путь отправки
        {
            field: 'from_id_way',
            data: function (row, type, val, meta) {
                return row.from_id_way;
            },
            className: 'dt-body-center',
            title: langView('field_from_id_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_id_park',
            data: function (row, type, val, meta) {
                return row.from_id_park;
            },
            className: 'dt-body-center',
            title: langView('field_from_id_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_way_name',
            data: function (row, type, val, meta) {
                return row['from_way_num_' + App.Lang] + '-' + row['from_way_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_from_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_way_abbr',
            data: function (row, type, val, meta) {
                return row['from_way_num_' + App.Lang] + '-' + row['from_way_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_from_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_capacity',
            data: function (row, type, val, meta) {
                return row.from_way_capacity;
            },
            className: 'dt-body-center',
            title: langView('field_from_way_capacity', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'from_way_close',
            data: function (row, type, val, meta) {
                return row.from_way_close ? moment(row.from_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_from_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'from_way_delete',
            data: function (row, type, val, meta) {
                return row.from_way_delete ? moment(row.from_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_from_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'count_wagons_send',
            data: function (row, type, val, meta) {
                return row.count_wagons_send;
            },
            className: 'dt-body-center',
            title: langView('field_count_wagons_send', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Операции прибыл на станцию(дополнительная информаци)
        {
            field: 'on_operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.on_operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('field_on_operation_locomotive1', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.on_operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('field_on_operation_locomotive2', App.Langs), width: "30px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_start',
            data: function (row, type, val, meta) {
                return row.on_operation_start ? moment(row.on_operation_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_on_operation_start', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_end',
            data: function (row, type, val, meta) {
                return row.on_operation_end ? moment(row.on_operation_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_on_operation_end', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_create',
            data: function (row, type, val, meta) {
                return row.on_operation_create ? moment(row.on_operation_create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_on_operation_create', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        {
            field: 'on_operation_create_user',
            data: function (row, type, val, meta) {
                return row.on_operation_create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('field_on_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true,
        },
        // Станция прибытия
        {
            field: 'on_id_station',
            data: function (row, type, val, meta) {
                return row.on_id_station;
            },
            className: 'dt-body-center',
            title: langView('field_on_id_station', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_station_name',
            data: function (row, type, val, meta) {
                return row['on_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_on_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_station_abbr',
            data: function (row, type, val, meta) {
                return row['on_station_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('field_on_station_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Путь прибытия
        {
            field: 'on_id_way',
            data: function (row, type, val, meta) {
                return row.on_id_way;
            },
            className: 'dt-body-center',
            title: langView('field_on_id_way', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_id_park',
            data: function (row, type, val, meta) {
                return row.on_id_park;
            },
            className: 'dt-body-center',
            title: langView('field_on_id_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_way_name',
            data: function (row, type, val, meta) {
                return row['on_way_num_' + App.Lang] ? row['on_way_num_' + App.Lang] + '-' + row['on_way_name_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_on_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'on_way_abbr',
            data: function (row, type, val, meta) {
                return row['on_way_num_' + App.Lang] ?  row['on_way_num_' + App.Lang] + '-' + row['on_way_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_on_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_capacity',
            data: function (row, type, val, meta) {
                return row.on_way_capacity;
            },
            className: 'dt-body-center',
            title: langView('field_on_way_capacity', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'on_way_close',
            data: function (row, type, val, meta) {
                return row.on_way_close ? moment(row.on_way_close).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_on_way_close', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_way_delete',
            data: function (row, type, val, meta) {
                return row.on_way_delete ? moment(row.on_way_delete).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_on_way_delete', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'count_wagons_send',
            data: function (row, type, val, meta) {
                return row.count_wagons_send;
            },
            className: 'dt-body-center',
            title: langView('field_count_wagons_send', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'count_wagons_arrival',
            data: function (row, type, val, meta) {
                return row.count_wagons_arrival;
            },
            className: 'dt-body-center',
            title: langView('field_count_wagons_arrival', App.Langs), width: "30px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
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
            button: 'field',
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
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'select_all',
            text: langView('title_button_select_all', App.Langs),

        },
        {
            button: 'select_none',
            extend: 'selectNone',
            text: langView('title_button_select_none', App.Langs),
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
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_change_data: null,   // Функция обратного вызова если изменили данные отображения (load... button:action...)
            fn_select_sostav: null, // Функция обратного вызова возвращяет выбранный состав
        }, options);
        //
        this.sostav = [];               // Список составов
        this.wagons = [];               // Список вагонов

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

        LockScreen(langView('mess_init_module', App.Langs));
        // Вклучу когда понадобится 
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
            }.bind(this),
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'arrival-sostav-outer-way': {
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
                    //this.obj_t_cars.button(4).enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
                    if (typeof this.settings.fn_select_sostav === 'function') {
                        this.settings.fn_select_sostav(rows);
                    }
                }.bind(this));
                break;
            };
        };
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
        LockScreen(langView('mess_view_sostav', App.Langs));
        this.obj_t_cars.clear();
        this.obj_t_cars.rows.add(data);
        //this.obj_t_cars.order([0, 'asc']);
        this.obj_t_cars.draw();
        //this.enable_button(); // отображение кнопки добавить
        LockScreenOff();
    };
    // Загрузить составы по прибытию
    table_sostav_outer_way.prototype.load_ow_arr_sostav = function () {
        //if (id_way !== null && id_way >= 0) {
        LockScreen(langView('mess_load_sostav', App.Langs));
        this.ids_wsd.getViewSostavOfOuterWay(function (sostav) {
            this.sostav = sostav;
            this.view(this.sostav);
            LockScreenOff();
        }.bind(this));
        //} else {
        //    this.wagons = [];
        //    this.id_way = null;
        //    this.select_row_wagons = null;
        //    this.select_rows_wagons = null;
        //    this.view(this.wagons, num);           //
        //}
    };
    // Загрузить составы по прибывающие на станцию 
    table_sostav_outer_way.prototype.load_ow_arr_sostav_of_station_on = function (id_station) {
        if (id_station !== null && id_station >= 0) {
        LockScreen(langView('mess_load_sostav', App.Langs));
        this.ids_wsd.getViewArrivalSostavOfStationOuterWay(id_station, function (sostav) {
            this.sostav = sostav;
            this.id_station_on = id_station;
            this.view(this.sostav);
            LockScreenOff();
        }.bind(this));
        } else {
            this.sostav = [];
            this.id_station_on = null;
            this.view(this.sostav);           //
        }
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
        // Вклучу когда понадобится 
        //this.modal_confirm_form.destroy();
        if (this.obj_t_cars) {
            this.obj_t_cars.destroy(true);
            this.obj_t_cars = null;
        }

        this.$table_cars.empty(); // empty in case the columns change
    }

    App.table_sostav_outer_way = table_sostav_outer_way;

    window.App = App;
})(window);