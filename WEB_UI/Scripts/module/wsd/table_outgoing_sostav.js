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
            'tos_field_num_doc': '№ Ведомости',
            'tos_field_id_station_from': 'id Станции отправления',
            'tos_field_station_from_name': 'Отправлен со станции',
            'tos_field_station_from_abbr': 'Отправлен со станции',
            'tos_field_id_way_from': 'id пути отпр.',
            'tos_field_way_from_num': '№ пути отправления',
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
            'tos_field_status': 'Статус',
            'tos_field_note': 'Примечание',
            'tos_field_route_sign': 'Признак маршрута',
            'tos_field_create': 'Создан',
            'tos_field_create_user': 'Создал',
            'tos_field_change': 'Правили',
            'tos_field_change_user': 'Правил',
            'tos_field_count_all': 'Всего вагонов',
            'tos_field_count_outgoing': 'Предъявлено вагонов',
            'tos_field_count_not_outgoing': 'Осталось вагонов',
            'tos_field_count_return': 'Возврат',
            'tos_field_count_detention': 'Задержано',
            'tos_field_count_vagonnik': 'Осмотренно',
            'tos_field_count_status': 'Всего|отпр.|ост.|возр.|зад.|осм.',

            'title_yes': 'Да',

            //'tos_field_outer_way_num_sostav': '№ состава',
            //'tos_field_status': 'Статус',
            //'tos_field_id_outer_way': 'id перег.',
            //'tos_field_name_outer_way': 'Перегон',
            //'tos_field_outer_way_close': 'Перег. закрыт',
            //'tos_field_outer_way_delete': 'Перег. удален',
            //'tos_field_from_operation_locomotive1': 'Лок.№1',
            //'tos_field_from_operation_locomotive2': 'Лок.№2',
            //'tos_field_from_operation_start': 'Нач. опер. отпр.',
            //'tos_field_from_operation_end': 'Отправлен',
            //'tos_field_from_operation_create': 'Опер. отпр. создана',
            //'tos_field_from_operation_create_user': 'Вып. опер. отправл.',
            //'tos_field_from_id_station': 'id ст. отпр.',
            //'tos_field_from_station_name': 'Станция отправления',
            //'tos_field_from_station_abbr': 'Ст. отпр. (аббр.)',
            //'tos_field_from_id_way': 'id путь отпр.',
            //'tos_field_from_id_park': 'id парка отпр.',
            //'tos_field_from_way_name': 'Путь отправки',
            //'tos_field_from_way_abbr': 'Путь отпр. (аббр.)',
            //'tos_field_from_way_capacity': 'Путь отпр. (вмест.)',
            //'tos_field_from_way_close': 'Путь отпр. закрыт',
            //'tos_field_from_way_delete': 'Путь отпр. удален',
            //'tos_field_count_wagons_send': 'Отпр. ваг.',
            //'tos_field_on_operation_locomotive1': 'Лок.№1',
            //'tos_field_on_operation_locomotive2': 'Лок.№2',
            //'tos_field_on_operation_start': 'Нач. опер. приб.',
            //'tos_field_on_operation_end': 'Принят',
            //'tos_field_on_operation_create': 'Опер. приб. создана',
            //'tos_field_on_operation_create_user': 'Вып. опер. приб.',
            //'tos_field_on_id_station': 'id ст. приб.',
            //'tos_field_on_station_name': 'Станция прибытия',
            //'tos_field_on_station_abbr': 'Ст. приб. (аббр.)',
            //'tos_field_on_id_way': 'id путь приб.',
            //'tos_field_on_id_park': 'id парка приб.',
            //'tos_field_on_way_name': 'Путь прибытия',
            //'tos_field_on_way_abbr': 'Путь приб. (аббр.)',
            //'tos_field_on_way_capacity': 'Путь приб. (вмест.)',
            //'tos_field_on_way_close': 'Путь приб. закрыт',
            //'tos_field_on_way_delete': 'Путь приб. удален',
            //'tos_field_count_wagons_arrival': 'Прин. факт.',
            //'tos_field_count_wagons_return': 'Возв(Отм.)',
            //'tos_field_count_wagons_accepted': 'Принят ИДС.',

            //'tos_title_detali_wagon': 'Вагоны в составе',

            'tos_title_all': 'Все',
            //'tos_title_status_arrival': 'Принят',
            //'tos_title_status_work': 'В работе',
            //'tos_title_status_send': 'Отправлен',

            'tos_title_button_export': 'Экспорт',
            'tos_title_button_buffer': 'Буфер',
            'tos_title_button_excel': 'Excel',
            'tos_title_excel_sheet_name': 'Составы',
            'tos_title_button_field': 'Поля',
            'tos_title_button_field_select': 'Выбрать',
            'tos_title_button_field_view_all': 'Показать все',
            'tos_title_button_field_clear': 'Сбросить',

            //'tos_title_button_select_all': 'Все вагоны',
            //'tos_title_button_select_none': 'Убрать выбор',

            'tos_mess_init_module': 'Инициализация модуля...',
            //'tos_mess_load_wagons': 'Загружаю вагоны состава…',
            'tos_mess_load_sostav': 'Загружаю составы...',
            //'tos_mess_view_wagons': 'загрузка информации о вагонах состава…',
            'tos_mess_view_sostav': 'Показываю составы...',
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
            field: 'status',
            data: function (row, type, val, meta) {
                switch (row.status) {
                    case 1: return "<i class='fas fa-exclamation-circle' style='color:#ffbf00;'></i>";
                    case 2: return "<i class='fas fa-check' style='color:#00ce00;'></i>";
                    case 3: return "<i class='fas fa-share' style='color:#00cc99;'></i>";
                    case 4: return "<i class='fas fa-ban' style='color:#ff6a8f;'></i>";
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
                return row.route_sign ? langView('title_yes', App.Langs) : '';
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
    table_outgoing_sostav.prototype.init_columns_detali = function () {
        var collums = [];
        // Перегон
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
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_outgoing_sostav.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_outgoing_sostav.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'outgoing_sostav_detali': {
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_detali();
                this.table_buttons = this.init_button_detali();
                break;
            };
            // Таблица составы по умолчанию (если не выставят тип отчета)
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
    table_outgoing_sostav.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_wagons: false,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            //fn_change_data: null,   // Функция обратного вызова если изменили данные отображения (load... button:action...)
            //fn_select_sostav: null, // Функция обратного вызова возвращяет выбранный состав
        }, options);
        //
        this.start = null;
        this.stop = null;
        this.sostav = [];               // Список составов

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        LockScreen(langView('tos_mess_init_module', App.Langs));
        // Вклучу когда понадобится 
        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();
        //----------------------------------
        // Создать макет таблицы
        // Создадим и добавим макет таблицы
        var table_cars = new this.fc_ui.el_table('tab-os-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_sostav = table_cars.$element;
        this.$cars_way.addClass('table-report-operation').append(this.$table_sostav);
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
                //$(row).attr('id', data.outer_way_num_sostav); // id строки дислокации вагона (data.count_wagons_arrival + data.count_wagons_return)
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
            //case 'arrival-sostav-outer-way': {
            //    this.obj_t_sostav.on('user-select', function (e, dt, type, cell, originalEvent) {
            //        this.out_clear();
            //        var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
            //        var row = this.obj_t_sostav.rows(indexes).data().toArray();
            //        //if (row && row.length > 0 && row[0].outgoing_sostav_status && row[0].outgoing_sostav_status > 0) {
            //        //    e.preventDefault();
            //        //    this.out_warning('Вагон № ' + row[0].num + ' для операций заблокирован (вагон пренадлежит составу который имеет статус - ' + row[0].outgoing_sostav_status + ')');
            //        //}
            //    }.bind(this)).on('select deselect', function (e, dt, type, indexes) {
            //        var index = this.obj_t_sostav.rows({ selected: true });
            //        var rows = this.obj_t_sostav.rows(index && index.length > 0 ? index[0] : null).data().toArray();
            //        this.select_rows_sostav = rows;
            //        //this.obj_t_sostav.button(4).enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
            //        if (typeof this.settings.fn_select_sostav === 'function') {
            //            this.settings.fn_select_sostav(rows);
            //        }
            //    }.bind(this));
            //    break;
            //};
        };
        // Определим показывать вагоны детально
        /*        if (this.settings.detali_wagons) this.init_detali();*/
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok(this.result_init);
        }
        //----------------------------------
    };
    //-------------------------------------------------------------------------------------------
    // Показать данные 
    table_outgoing_sostav.prototype.view = function (data, id_sostav) {
        this.out_clear();
        LockScreen(langView('tos_mess_view_sostav', App.Langs));
        this.obj_t_sostav.clear();
        this.obj_t_sostav.rows.add(data);
        this.obj_t_sostav.order([0, 'asc']);
        //this.obj_t_sostav.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
        this.obj_t_sostav.draw();
        if (id_sostav) {
            this.obj_t_sostav.row('#' + id_select).select();
        }
        //this.enable_button(); // отображение кнопки добавить
        LockScreenOff();
    };
    // Загрузить составы по прибытию
    table_outgoing_sostav.prototype.load_outgoing_sostav = function (start, stop, cb_load) {
        if (start !== null && stop !== null) {
            LockScreen(langView('tos_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingSostav(start, stop, function (sostav) {
                this.start = start;
                this.stop = stop;
                this.sostav = sostav;
                LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.sostav);
                }
                LockScreenOff();
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
        //if (this.modal_confirm_form) this.modal_confirm_form.destroy();
        this.destroy_all_detali(); // Удалить все таблицы детально, если созданы
        if (this.obj_t_sostav) {
            this.obj_t_sostav.destroy(true);
            this.obj_t_sostav = null;
        }

        this.$table_sostav.empty(); // empty in case the columns change
    }

    App.table_outgoing_sostav = table_outgoing_sostav;

    window.App = App;
})(window);