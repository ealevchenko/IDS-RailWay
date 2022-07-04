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
            'field_number': '№п.п',
            'field_sample_datetime': 'Дата остатка',
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
            'field_arrival_condition_repairs': 'Разм. пр. МР.',
            'field_current_condition_name': 'Разметка (тек.)',
            'field_current_condition_abbr': 'Разм. тек.',
            'field_current_condition_red': 'red',
            'field_current_condition_repairs': 'Разм. тек. МР.',
            'field_condition_repairs': 'Приз. разм. МР.',
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
            'field_accepted_id_station_amkr': 'id ст. приб. АМКР',
            'field_accepted_station_amkr_name': 'Стан. приб. АМКР',
            'field_accepted_station_amkr_abbr': 'Стан. приб. АМКР',
            'field_arrival_id_station_amkr': 'id ст. назн. АМКР',
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

            'field_current_id_station_amkr': 'id тек. станц.',
            'field_current_station_amkr_name': 'Текущая станция нахождения',
            'field_current_station_amkr_abbr': 'Текущая станция (аббр.)',
            'field_current_id_way': 'id тек. путь.',
            'field_current_id_park': 'id тек. парк.',
            'field_current_way_num': '№ тек. пути',
            'field_current_way_name': 'Название тек. пути',
            'field_current_way_abbr': 'Аббр. тек. пути',
            'field_current_way_start': 'Время приб. на путь',
            'field_current_way_end': 'Время ухода с пути',
            'field_current_wim_note': 'Описание дислокации',
            'field_current_id_outer_way': 'id перегона',
            'field_current_outer_way_name': 'Название перегона',
            'field_current_outer_way_start': 'Время начала перегона',
            'field_current_outer_way_end': 'Время окончания перегона',
            'field_current_way_type': 'Дислокация',
            'field_current_way_full_name': 'Название пути(перегона)',

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
            'field_sap_incoming_supply_cargo_ban': 'Вх. пост. Запрет',

            'field_sap_outgoing_supply_num': 'Исх. пост. №',
            'field_sap_outgoing_supply_date': 'Исх. пост. дата созд.',
            'field_sap_outgoing_supply_cargo_code': 'Исх. пост. Код ЕТСНГ',
            'field_sap_outgoing_supply_cargo_name': 'Исх. пост. Наименование груза',
            'field_sap_outgoing_supply_shipper_code': 'Исх. пост. Код получателя',
            'field_sap_outgoing_supply_shipper_name': 'Исх. пост. Получатель',
            'field_sap_outgoing_supply_destination_station_code': 'Исх. пост. Код станции назначения',
            'field_sap_outgoing_supply_destination_station_name': 'Исх. пост. Станция назначения',
            'field_sap_outgoing_supply_border_checkpoint_code': 'Исх. пост. Код погранперехода',
            'field_sap_outgoing_supply_border_checkpoint_name': 'Исх. пост. Погранпереход',
            'field_sap_outgoing_supply_netto': 'Исх. пост. Вес нетто',
            'field_sap_outgoing_supply_warehouse_code': 'Исх. пост. склад',
            'field_sap_outgoing_supply_warehouse_name': 'Исх. пост. Наименование склада',
            'field_sap_outgoing_supply_responsible_post': 'Исх. пост. Долж. отв. за погрузку',
            'field_sap_outgoing_supply_responsible_fio': 'Исх. пост. ФИО отв. за погрузку',
            'field_sap_outgoing_supply_payer_code': 'Исх. пост. Код плательщик',
            'field_sap_outgoing_supply_payer_name': 'Исх. пост. Плательщик',

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
            'field_outgoing_sostav_status': 'Код стат. отпр. сост.',
            'field_outgoing_sostav_status_name': 'Статус отпр. сост.',
            'field_wagon_ban_uz': 'Запреты по УЗ',
            'field_wagon_closed_route': 'Замкнутый маршрут (кольцо)',
            'field_wir_note': 'Примечание',

            'title_yes': 'Да',
            'title_busy': 'Занят',
            'title_all': 'Все',
            'title_status_0': 'Предъявлен',
            'title_status_1': 'В работе',
            'title_status_2': 'Сдан',
            'title_status_3': 'Отправлен',
            'title_status_4': 'Возврат',
            'title_type_way': 'Путь станции',
            'title_type_outer_way': 'Перегон',
            'title_link_num': 'Показать историю по вагону...',
            'title_select': 'Выбирите...',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_field': 'Поля',
            'title_button_field_select': 'Выбрать',
            'title_button_field_view_all': 'Показать все',
            'title_button_field_clear': 'Сбросить',

            'title_button_select_all': 'Все вагоны',
            'title_button_select_none': 'Убрать выбор',
            'title_button_add_way_sending': 'Добавить в состав',
            'title_button_del_way_sending': 'Убрать из состава',
            'title_button_reverse_num_wagon': 'Реверс',
            'title_button_head_tail': 'Голова\Хвост',

            'mess_init_module': 'Инициализация модуля…',
            'mess_load_wagons': 'Загружаю вагоны на пути…',
            'mess_view_wagons': 'загрузка информации о вагонах…',

        },
        'en':  //default language: English
        {
            'field_number': 'No. of item',
            'field_sample_datetime': 'Remaining date',
            'field_wir_id': 'id wp',
            'field_wim_id': 'dis id.',
            'field_wio_id': 'opera id',
            'field_position': 'Pos. no.',
            'field_num': 'Wagon number',
            'field_id_operator': 'opera id',
            'field_operators': 'Operator',
            'field_operator_abbr': 'Operator (abbr.)',
            'field_operator_rent_start': 'Start. lease ',
            'field_operator_rent_end': 'End. lease ',
            'field_operator_paid': 'Prize. paid ',
            'field_id_limiting_loading': 'limiting id',
            'field_limiting_name': 'Limit',
            'field_limiting_abbr': 'Limiting. (abbr.) ',
            'field_id_owner_wagon': 'own id',
            'field_owner_wagon': 'Owner by UZ',
            'field_owner_wagon_abbr': 'Own. UZ (abbr.) ',
            'field_wagon_rod': 'Wagon rod.',
            'field_wagon_rod_name': 'Wagon rod.',
            'field_wagon_rod_abbr': 'Wagon genus (abbr.)',
            'field_wagon_type': 'Wagon type',
            'field_arrival_condition_name': 'Arrival (arrivals)',
            'field_arrival_condition_abbr': 'Size',
            'field_arrival_condition_red': 'red',
            'field_arrival_condition_repairs': ' Resize ave. MR. ',
            'field_current_condition_name': 'Markup (current)',
            'field_current_condition_abbr': 'Size tech. ',
            'field_current_condition_red': 'red',
            'field_current_condition_repairs': ' Res. tech. MR. ',
            'field_condition_repairs': ' Prize. size MR. ',
            'field_wagon_date_rem_uz': 'Date of depot repair by UZ',
            'field_wagon_gruzp_doc': 'Cargo, tons (doc.)',
            'field_wagon_gruzp_uz': 'Cargo, tn (US)',
            'field_wagon_adm': 'Admin code',
            'field_wagon_adm_name': 'Administration',
            'field_wagon_adm_abbr': 'Admin.',
            'field_arrival_cargo_group_name': 'Arrival Cargo Group',
            'field_arrival_cargo_name': 'Cargo upon arrival',
            'field_arrival_id_sertification_data': 'ser. id. Dan.',
            'field_arrival_sertification_data': 'Cert. data',
            'field_arrival_id_commercial_condition': 'com. id comp. ',
            'field_arrival_commercial_condition': 'Comm. comp. ',
            'field_arrival_station_from_code': 'Code. Art. send. ',
            'field_arrival_station_from_name': 'Station. sending ',
            'field_arrival_shipper_code': 'Shipper code',
            'field_arrival_shipper_name': 'Shipper',
            'field_accepted_id_station_amkr': 'id st. approx. AMKR ',
            'field_accepted_station_amkr_name': 'Station. approx. AMKR ',
            'field_accepted_station_amkr_abbr': 'Station. approx. AMKR ',
            'field_arrival_id_station_amkr': 'id st. assignment AMKR ',
            'field_arrival_station_amkr_name': 'Station. assignment AMKR ',
            'field_arrival_station_amkr_abbr': 'Station. assignment AMKR ',
            'field_arrival_division_amkr_name': 'Shop received',
            'field_arrival_division_amkr_abbr': 'Shop received',
            'field_current_id_loading_status': ' state id burial ',
            'field_current_loading_status': 'Load / Load.',
            'field_current_wagon_busy': 'Busy (operation)',
            'field_current_id_operation': 'opera id',
            'field_current_operation_name': 'Last operation on a wagon',
            'field_current_operation_start': 'Operation start date',
            'field_current_operation_end': 'End date of operation execution',

            'field_arrival_duration': 'Simple ARP, hour',
            'field_arrival_idle_time': 'Rate, hour',
            'field_arrival_usage_fee': 'Current fee, UAH',

            'field_current_id_station_amkr': 'current id. stanz. ',
            'field_current_station_amkr_name': 'Current station being located',
            'field_current_station_amkr_abbr': 'Current station (abbr.)',
            'field_current_id_way': 'id current. way.',
            'field_current_id_park': 'id current. a park.',
            'field_current_way_num': 'Current no. ways',
            'field_current_way_name': 'Current name ways',
            'field_current_way_abbr': 'Abbr. tech. ways',
            'field_current_way_start': 'Arrival time. on the way ',
            'field_current_way_end': 'Departure time',
            'field_current_wim_note': 'Location Description',
            'field_current_id_outer_way': 'ferry id',
            'field_current_outer_way_name': 'Line name',
            'field_current_outer_way_start': 'Ferry start time',
            'field_current_outer_way_end': 'Line end time',
            'field_current_way_type': 'Location',
            'field_current_way_full_name': 'Name of the path (ferry)',

            'field_current_station_duration': 'Fact st., h',
            'field_current_way_duration': 'Actual path, h',
            'field_current_station_idle_time': 'Station rate, h',
            'field_current_station_indicator': 'Ind.',
            'field_sap_incoming_supply_num': 'In. fast. No. ',
            'field_sap_incoming_supply_pos': ' pos. ',
            'field_sap_incoming_supply_date': 'Incoming. fast. creation date ',
            'field_sap_incoming_supply_time': 'Incoming. fast. creation time ',
            'field_sap_incoming_supply_cargo_code': 'Incoming. fast. Math code. ',
            'field_sap_incoming_supply_cargo_name': 'Incoming. fast. material (cargo) ',
            'field_sap_incoming_supply_warehouse_code': 'In. fast. warehouse',
            'field_sap_incoming_supply_warehouse_name': 'In. fast. Warehouse name ',
            'field_sap_incoming_supply_cargo_ban': 'In. fast. Ban',

            'field_sap_outgoing_supply_num': 'Out. fast. No. ',
            'field_sap_outgoing_supply_date': 'Out. fast. creation date ',
            'field_sap_outgoing_supply_cargo_code': 'Ref. fast. ETSNG code ',
            'field_sap_outgoing_supply_cargo_name': 'Outgoing. fast. Shipping Name',
            'field_sap_outgoing_supply_shipper_code': 'Out. fast. Recipient code ',
            'field_sap_outgoing_supply_shipper_name': 'Out. fast. Recipient',
            'field_sap_outgoing_supply_destination_station_code': 'Ref. fast. Destination station code ',
            'field_sap_outgoing_supply_destination_station_name': 'Out. fast. Destination station ',
            'field_sap_outgoing_supply_border_checkpoint_code': 'Ref. fast. Border crossing code ',
            'field_sap_outgoing_supply_border_checkpoint_name': 'Ref. fast. Border crossing ',
            'field_sap_outgoing_supply_netto': 'Ref. fast. Net weight',
            'field_sap_outgoing_supply_warehouse_code': 'Ref. fast. warehouse',
            'field_sap_outgoing_supply_warehouse_name': 'Ref. fast. Warehouse name ',
            'field_sap_outgoing_supply_responsible_post': 'Ref. fast. Should. otv. for loading ',
            'field_sap_outgoing_supply_responsible_fio': 'Ref. fast. Full name otv. for loading ',
            'field_sap_outgoing_supply_payer_code': 'Ref. fast. Payer code ',
            'field_sap_outgoing_supply_payer_name': 'Ref. fast. Payer',

            'field_instructional_letters_num': 'Letter No.',
            'field_instructional_letters_datetime': 'Letter date',
            'field_instructional_letters_station_code': 'Art. called. ',
            'field_instructional_letters_station_name': 'Destination station',
            'field_instructional_letters_note': 'Text',
            'field_wagon_brutto_doc': 'Gross EPD, tn',
            'field_wagon_brutto_amkr': 'Gross AMKR, tn',
            'field_wagon_tara_doc': 'EPD packaging, tn.',
            'field_wagon_tara_arc_doc': 'EPD tare ref., tn.',
            'field_wagon_tara_uz': 'Tara by UZ, tn.',
            'field_wagon_vesg_doc': 'Net EPD, tn',
            'field_wagon_vesg_amkr': 'Net AMKR, tn',
            'field_diff_vesg': 'Net difference, tn.',
            'field_doc_outgoing_car': 'Availability of document for delivery to UZ',
            'field_arrival_nom_main_doc': 'Arrival invoice no.',
            'field_arrival_nom_doc': 'Arrival arrival number',
            'field_arrival_composition_index': 'Train index',
            'field_arrival_date_adoption': 'Date of admission to AMKR',
            'field_outgoing_date': 'Date of delivery to UZ',
            'field_outgoing_id_return': 'return id',
            'field_outgoing_return_cause': 'Reason for return on departure',
            'field_outgoing_sostav_status': ' Code stat. send comp. ',
            'field_outgoing_sostav_status_name': 'Send status comp. ',
            'field_wagon_ban_uz': 'UZ bans',
            'field_wagon_closed_route': 'Closed route (ring)',
            'field_wir_note': 'Note',

            'title_yes': 'Yes',
            'title_busy': 'Busy',
            'title_all': 'Everyone',
            'title_status_0': 'Submitted',
            'title_status_1': 'In progress',
            'title_status_2': 'Completed',
            'title_status_3': 'Submitted',
            'title_status_4': 'Return',
            'title_type_way': 'Station path',
            'title_type_outer_way': 'Ferry',
            'title_link_num': 'Show wagon history ...',
            'title_select': 'Select ...',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',
            'title_button_field': 'Fields',
            'title_button_field_select': 'Select',
            'title_button_field_view_all': 'Show all',
            'title_button_field_clear': 'Reset',

            'title_button_select_all': 'All wagons',
            'title_button_select_none': 'Remove selection',
            'title_button_add_way_sending': 'Add to lineup',
            'title_button_del_way_sending': 'Remove from composition',
            'title_button_reverse_num_wagon': 'Reverse',
            'title_button_head_tail': 'Head \ Tail',

            'mess_init_module': 'Initializing a module ...',
            'mess_load_wagons': 'Loading wagons on the way ...',
            'mess_view_wagons': 'loading wagons information ...',
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
            field: 'number',
            data: function (row, type, val, meta) {
                return meta.row + 1;
            },
            ariaTitle: 'number',
            className: 'dt-body-center',
            title: langView('field_number', App.Langs), width: "30px", orderable: true, searchable: true,
            //createdCell: function (td, cellData, rowData, row, col) {
            //    $(th).attr('id', 'number');
            //},
        },
        {
            field: 'sample_datetime',
            data: function (row, type, val, meta) {
                return moment(row.sample_datetime).format(format_datetime);
            },
            className: 'dt-body-nowrap',
            title: langView('field_sample_datetime', App.Langs), width: "30px", orderable: true, searchable: true
        },
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
            field: 'position_new',
            data: function (row, type, val, meta) {
                return row.position_new;
            },
            className: 'dt-body-center fixed-column',
            title: langView('field_position', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center fixed-column num-wagon',
            title: langView('field_num', App.Langs), width: "50px", orderable: true, searchable: true
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
        {
            field: 'arrival_condition_repairs',
            data: function (row, type, val, meta) {
                return row.arrival_condition_repairs ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_arrival_condition_repairs', App.Langs), width: "30px", orderable: true, searchable: true
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
        {
            field: 'current_condition_repairs',
            data: function (row, type, val, meta) {
                return row.current_condition_repairs ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_current_condition_repairs', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Признак наличия разметки с ремоном
        {
            field: 'condition_repairs',
            data: function (row, type, val, meta) {
                return row.arrival_condition_repairs || row.current_condition_repairs ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_condition_repairs', App.Langs), width: "30px", orderable: true, searchable: true
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
        // Станция прибытия АМКР
        {
            field: 'accepted_id_station_amkr',
            data: function (row, type, val, meta) {
                return row.accepted_id_station_amkr;
            },
            className: 'dt-body-center',
            title: langView('field_accepted_id_station_amkr', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'accepted_station_amkr_name',
            data: function (row, type, val, meta) {
                return row['accepted_station_amkr_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_accepted_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'accepted_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row['accepted_station_amkr_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_accepted_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения АМКР
        {
            field: 'arrival_id_station_amkr',
            data: function (row, type, val, meta) {
                return row.arrival_id_station_amkr;
            },
            className: 'dt-body-center',
            title: langView('field_arrival_id_station_amkr', App.Langs), width: "30px", orderable: true, searchable: true
        },
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
            className: 'dt-body-nowrap arrival-duration',
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
        //=============== ТЕКУЩАЯ Ж.Д.СТАНЦИЯ ==================
        {
            field: 'current_id_station_amkr',
            data: function (row, type, val, meta) {
                if (row.current_way_end !== null && row.current_outer_way_start !== null && row.current_outer_way_end === null) {
                    return null;
                } else {
                    return row.current_id_station_amkr;
                }
            },
            className: 'dt-body-center',
            title: langView('field_current_id_station_amkr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_station_amkr_name',
            data: function (row, type, val, meta) {
                if (row.current_way_end !== null && row.current_outer_way_start !== null && row.current_outer_way_end === null) {
                    return null;
                } else {
                    return row['current_station_amkr_name_' + App.Lang];
                }
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_current_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_station_amkr_abbr',
            data: function (row, type, val, meta) {
                if (row.current_way_end !== null && row.current_outer_way_start !== null && row.current_outer_way_end === null) {
                    return null;
                } else {
                    return row['current_station_amkr_abbr_' + App.Lang];
                }
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_current_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //=============== ПРОСТОЙ НА Ж.Д.СТАНЦИИ ==================
        // индикатор
        {
            field: 'current_station_indicator',
            data: function (row, type, val, meta) {
                if (row.current_station_idle_time !== null) {
                    // Показать индикатор простоя
                    var fc_ui = new FC();
                    var $pb = new fc_ui.el_progress_bar(null, (row.current_station_idle_time !== null ? Number(row.current_station_idle_time) : 0), (row.current_station_duration !== null ? Number(row.current_station_duration) : 0))
                    if ($pb && $pb.$pb && $pb.$pb.length > 0) {
                        return $pb.$pb[0].outerHTML;
                    }
                } else {
                    // Не задана норма, индикатор не показываеи
                    return null;
                }
            },
            className: 'dt-body-justify mw-100 idle-station',
            title: langView('field_current_station_indicator', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Норма, ч
        {
            field: 'current_station_idle_time',
            data: function (row, type, val, meta) {
                return row.current_station_idle_time !== null ? Number(row.current_station_idle_time / 60) : null;
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
        //=============== ТЕКУЩИЙ ПУТЬ ==================
        {
            field: 'current_id_way',
            data: function (row, type, val, meta) {
                return row.current_id_way;
            },
            className: 'dt-body-center',
            title: langView('field_current_id_way', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_id_park',
            data: function (row, type, val, meta) {
                return row.current_id_park;
            },
            className: 'dt-body-center',
            title: langView('field_current_id_park', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_way_num',
            data: function (row, type, val, meta) {
                return row['current_way_num_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('field_current_way_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_way_name',
            data: function (row, type, val, meta) {
                return row['current_way_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_current_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'current_way_abbr',
            data: function (row, type, val, meta) {
                return row['current_way_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('field_current_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_way_start',
            data: function (row, type, val, meta) {
                return row.current_way_start ? moment(row.current_way_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_current_way_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_way_end',
            data: function (row, type, val, meta) {
                return row.current_way_end ? moment(row.current_way_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_current_way_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_wim_note',
            data: function (row, type, val, meta) {
                return row.current_wim_note;
            },
            className: 'dt-body-nowrap text-left',
            title: langView('field_current_wim_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        //=============== ПЕРЕГОН ==================
        {
            field: 'current_id_outer_way',
            data: function (row, type, val, meta) {
                return row.current_id_outer_way;
            },
            className: 'dt-body-center',
            title: langView('field_current_id_outer_way', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_outer_way_name',
            data: function (row, type, val, meta) {
                return row['current_outer_way_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('field_current_outer_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'current_outer_way_start',
            data: function (row, type, val, meta) {
                return row.current_outer_way_start ? moment(row.current_outer_way_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_current_outer_way_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_outer_way_end',
            data: function (row, type, val, meta) {
                return row.current_outer_way_end ? moment(row.current_outer_way_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_current_outer_way_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //=============== ТЕКУЩИЙ ПУТЬ ==================
        {
            field: 'current_way_type',
            data: function (row, type, val, meta) {
                if (row.current_way_end !== null && row.current_outer_way_start !== null && row.current_outer_way_end === null) {
                    return langView('title_type_outer_way', App.Langs);
                } else {
                    return langView('title_type_way', App.Langs);
                }
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('field_current_way_type', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'current_way_full_name',
            data: function (row, type, val, meta) {
                if (row.current_way_end !== null && row.current_outer_way_start !== null && row.current_outer_way_end === null) {
                    return row['current_outer_way_name_' + App.Lang];
                } else {
                    return row['current_way_num_' + App.Lang] + '-' + row['current_way_name_' + App.Lang];
                }
            },
            className: 'dt-body-left shorten mw-250',
            title: langView('field_current_way_full_name', App.Langs), width: "250px", orderable: true, searchable: true
        },
        //=============== ИНСТРУКТИВНЫЕ ПИСЬМА ==================
        // № письма
        {
            field: 'instructional_letters_num',
            data: function (row, type, val, meta) {
                return row.instructional_letters_num;
            },
            className: 'dt-body-nowrap ins-let',
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
        // sap_incoming_supply_cargo_ban
        {
            field: 'sap_incoming_supply_cargo_ban',
            data: function (row, type, val, meta) {
                switch (row.sap_incoming_supply_cargo_ban) {
                    case '@5C@': return "<i class='fas fa-ban' style='color:#ff4d4d;'></i>";
                    case '@5B@': return "<i class='fas fa-check' style='color:#00ce00;'></i>";
                    default: return null;
                }
            },
            className: 'dt-body-nowrap sap-inc-supp',
            title: langView('field_sap_incoming_supply_cargo_ban', App.Langs), width: "30px", orderable: true, searchable: true
        },

        //=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
        {
            field: 'sap_outgoing_supply_num',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_num;
            },
            className: 'dt-body-nowrap sap-out-supp',
            title: langView('field_sap_outgoing_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // дата создания
        {
            field: 'sap_outgoing_supply_date',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_date ? moment(row.sap_outgoing_supply_date).format(format_date) : null;
            },
            className: 'dt-body-nowrap sap-out-supp',
            title: langView('field_sap_outgoing_supply_date', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Груз
        {
            field: 'sap_outgoing_supply_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_cargo_code;
            },
            className: 'dt-body-center sap-out-supp',
            title: langView('field_sap_outgoing_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_cargo_name;
            },
            className: 'dt-body-left shorten mw-150 sap-out-supp',
            title: langView('field_sap_outgoing_supply_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Грузополучатель
        {
            field: 'sap_outgoing_supply_shipper_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_shipper_code;
            },
            className: 'dt-body-center sap-out-supp',
            title: langView('field_sap_outgoing_supply_shipper_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_shipper_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_shipper_name;
            },
            className: 'dt-body-left shorten mw-150 sap-out-supp',
            title: langView('field_sap_outgoing_supply_shipper_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Станция назначения
        {
            field: 'sap_outgoing_supply_destination_station_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_destination_station_code;
            },
            className: 'dt-body-center sap-out-supp',
            title: langView('field_sap_outgoing_supply_destination_station_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_destination_station_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_destination_station_name;
            },
            className: 'dt-body-left shorten mw-100 sap-out-supp',
            title: langView('field_sap_outgoing_supply_destination_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Погран переход
        {
            field: 'sap_outgoing_supply_border_checkpoint_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_border_checkpoint_code;
            },
            className: 'dt-body-center sap-out-supp',
            title: langView('field_sap_outgoing_supply_border_checkpoint_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_border_checkpoint_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_border_checkpoint_name;
            },
            className: 'dt-body-left shorten mw-100 sap-out-supp',
            title: langView('field_sap_outgoing_supply_border_checkpoint_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Нетто по исх пост, тн
        {
            field: 'sap_outgoing_supply_netto',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_netto !== null ? (row.sap_outgoing_supply_netto > 0 ? Number(row.sap_outgoing_supply_netto / 1000).toFixed(2) : Number(row.sap_outgoing_supply_netto).toFixed(2)) : null;
            },
            className: 'dt-body-right sap-out-supp',
            title: langView('field_sap_outgoing_supply_netto', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Склад, Наименование склада
        {
            field: 'sap_outgoing_supply_warehouse_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_warehouse_code;
            },
            className: 'dt-body-center sap-out-supp',
            title: langView('field_sap_outgoing_supply_warehouse_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_warehouse_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_warehouse_name;
            },
            className: 'dt-body-left shorten mw-100 sap-out-supp',
            title: langView('field_sap_outgoing_supply_warehouse_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ответственный за погрузку
        {
            field: 'sap_outgoing_supply_responsible_post',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_responsible_post;
            },
            className: 'dt-body-left shorten mw-100 sap-out-supp',
            title: langView('field_sap_outgoing_supply_responsible_post', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_responsible_fio',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_responsible_fio;
            },
            className: 'dt-body-left shorten mw-100 sap-out-supp',
            title: langView('field_sap_outgoing_supply_responsible_fio', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Плательщик ж.д. тарифа
        {
            field: 'sap_outgoing_supply_payer_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_payer_code;
            },
            className: 'dt-body-center sap-out-supp',
            title: langView('field_sap_outgoing_supply_payer_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_outgoing_supply_payer_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_payer_name;
            },
            className: 'dt-body-left shorten mw-150 sap-out-supp',
            title: langView('field_sap_outgoing_supply_payer_name', App.Langs), width: "150px", orderable: true, searchable: true
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
        {
            field: 'outgoing_sostav_status_name',
            data: function (row, type, val, meta) {
                switch (row.outgoing_sostav_status) {
                    default: return row.outgoing_sostav_status;
                    case 0: return langView('title_status_0', App.Langs);
                    case 1: return langView('title_status_1', App.Langs);
                    case 2: return langView('title_status_2', App.Langs);
                    case 3: return langView('title_status_3', App.Langs);
                    case 4: return langView('title_status_4', App.Langs);
                }
                //return row.outgoing_sostav_status;
            },
            className: 'dt-body-center',
            title: langView('field_outgoing_sostav_status_name', App.Langs), width: "30px", orderable: true, searchable: true
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
            //action: function () {
            //    //operation_detali.table_wagons_sending_way_from.obj.rows(':not(.select-sending)').select();
            //}
        },
        {
            button: 'select_none',
            extend: 'selectNone',
            text: langView('title_button_select_none', App.Langs),
        },
        {
            button: 'add_wagons_send',
            text: langView('title_button_add_way_sending', App.Langs),
            enabled: false
        },
        {
            button: 'del_wagons_send',
            text: langView('title_button_del_way_sending', App.Langs),
            enabled: false
        },
        {
            button: 'reverse_num_wagon',
            text: langView('title_button_reverse_num_wagon', App.Langs),
            enabled: true
        },
        {
            button: 'head_tail',
            text: langView('title_button_head_tail', App.Langs),
            enabled: true
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        }
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
    //------------------------------- ПОЛЯ -------------------------------------------------------------
    // инициализация полей таблицы вагоны на пути (все поля)
    table_cars_way.prototype.init_columns_all = function () {
        var collums = [];

        //collums.push('wir_id');
        //collums.push('wim_id');
        //collums.push('wio_id');
        //=============== ОСНОВНОЕ ОКНО ==================
        collums.push('position');
        collums.push('position_new');
        if (this.settings.link_num) {
            collums.push('num_link');
        } else {
            collums.push('num');
        }
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
        // Станция приема на АМКР
        collums.push('accepted_id_station_amkr');
        collums.push('accepted_station_amkr_name');
        collums.push('accepted_station_amkr_abbr');
        // Станция назначения АМКР
        collums.push('arrival_id_station_amkr');
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
        // Текущий путь
        collums.push('current_id_way');
        collums.push('current_id_park');
        collums.push('current_way_num');
        collums.push('current_way_name');
        collums.push('current_way_abbr');
        collums.push('current_way_start');
        collums.push('current_way_end');
        collums.push('current_wim_note');
        // Перегон
        collums.push('current_id_outer_way');
        collums.push('current_outer_way_name');
        collums.push('current_outer_way_start');
        collums.push('current_outer_way_end');
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
        //=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
        collums.push('sap_outgoing_supply_num');
        collums.push('sap_outgoing_supply_date');
        collums.push('sap_outgoing_supply_cargo_code');
        collums.push('sap_outgoing_supply_cargo_name');
        collums.push('sap_outgoing_supply_destination_station_code');
        collums.push('sap_outgoing_supply_destination_station_name');
        collums.push('sap_outgoing_supply_border_checkpoint_code');
        collums.push('sap_outgoing_supply_border_checkpoint_name');
        collums.push('sap_outgoing_supply_shipper_code');
        collums.push('sap_outgoing_supply_shipper_name');
        collums.push('sap_outgoing_supply_payer_code');
        collums.push('sap_outgoing_supply_payer_name');
        collums.push('sap_outgoing_supply_warehouse_code');
        collums.push('sap_outgoing_supply_warehouse_name');
        collums.push('sap_outgoing_supply_netto');
        collums.push('sap_outgoing_supply_responsible_post');
        collums.push('sap_outgoing_supply_responsible_fio');
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
        collums.push('outgoing_id_return');               // Возврат
        collums.push('outgoing_return_cause');           // Причина возврата
        collums.push('outgoing_sostav_status');          // Статус состава отправленного вагона
        collums.push('outgoing_sostav_status_name');     // Статус состава отправленного вагона
        collums.push('wagon_ban_uz');                    // Запреты по УЗ
        collums.push('wagon_closed_route');                    //Замкнутый маршрут(кольцо)
        collums.push('wir_note');                    // Примечание Вагонник ГС
        return init_columns(collums, list_collums);
    };
    // инициализация полей таблицы вагоны на пути (Отчет 0 - вагоны детально, дерево путей)
    table_cars_way.prototype.init_columns_detali = function () {
        var collums = [];

        //=============== ОСНОВНОЕ ОКНО ==================
        collums.push('position');
        if (this.settings.link_num) {
            collums.push('num_link');
        } else {
            collums.push('num');
        }
        // Оператор
        //collums.push('id_operator');
        //collums.push('operators');
        collums.push('operator_abbr');
        //collums.push('operator_rent_start');
        //collums.push('operator_rent_end');
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
        //collums.push('wagon_rod');
        //collums.push('wagon_rod_name');
        collums.push('wagon_rod_abbr');
        // Тип вагона
        collums.push('wagon_type');
        // Разметка прибытие
        //collums.push('arrival_condition_name');
        collums.push('arrival_condition_abbr');
        //collums.push('arrival_condition_red');
        // разметка текущая
        //collums.push('current_condition_name');
        collums.push('current_condition_abbr');
        //collums.push('current_condition_red');
        // Дата деповского ремонта по УЗ
        collums.push('wagon_date_rem_uz');
        // Грузоподъемность
        collums.push('wagon_gruzp_doc');
        collums.push('wagon_gruzp_uz');
        // Администрация
        collums.push('wagon_adm');
        //collums.push('wagon_adm_name');
        //collums.push('wagon_adm_abbr');
        // Груз по прибытию
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        // Сертификатные данные
        //collums.push('arrival_id_sertification_data');
        collums.push('arrival_sertification_data');
        // Коммерческое состояние
        //collums.push('arrival_id_commercial_condition');
        collums.push('arrival_commercial_condition');
        // Станция отправления
        collums.push('arrival_station_from_code');
        collums.push('arrival_station_from_name');
        //Отправитель
        collums.push('arrival_shipper_code');
        collums.push('arrival_shipper_name');
        // Станция назначения АМКР
        collums.push('arrival_station_amkr_name');
        //collums.push('arrival_station_amkr_abbr');
        // Цех-получатель
        //collums.push('arrival_division_amkr_name');
        collums.push('arrival_division_amkr_abbr');
        // Груж /порожний, состояние загрузки
        //collums.push('current_id_loading_status');
        collums.push('current_loading_status');
        // Занят (операция)
        collums.push('current_wagon_busy');
        // Последняя операция над вагоном
        //collums.push('current_id_operation');
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
        collums.push('sap_incoming_supply_cargo_ban');            // Номер вх. поставки
        collums.push('sap_incoming_supply_num');            // Номер вх. поставки
        //collums.push('sap_incoming_supply_pos');            // поз вх. поставки
        collums.push('sap_incoming_supply_date');           // дата создания вх. поставки
        collums.push('sap_incoming_supply_time');           // время создания вх. поставки
        collums.push('sap_incoming_supply_cargo_code');     // склад вх. поставки
        collums.push('sap_incoming_supply_cargo_name');     //
        collums.push('sap_incoming_supply_warehouse_code'); // материал вх. поставки
        collums.push('sap_incoming_supply_warehouse_name'); //
        //=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
        collums.push('sap_outgoing_supply_num');
        collums.push('sap_outgoing_supply_date');
        collums.push('sap_outgoing_supply_cargo_code');
        collums.push('sap_outgoing_supply_cargo_name');
        collums.push('sap_outgoing_supply_destination_station_code');
        collums.push('sap_outgoing_supply_destination_station_name');
        collums.push('sap_outgoing_supply_border_checkpoint_code');
        collums.push('sap_outgoing_supply_border_checkpoint_name');
        collums.push('sap_outgoing_supply_shipper_code');
        collums.push('sap_outgoing_supply_shipper_name');
        collums.push('sap_outgoing_supply_payer_code');
        collums.push('sap_outgoing_supply_payer_name');
        collums.push('sap_outgoing_supply_warehouse_code');
        collums.push('sap_outgoing_supply_warehouse_name');
        collums.push('sap_outgoing_supply_netto');
        //collums.push('sap_outgoing_supply_responsible_post');
        //collums.push('sap_outgoing_supply_responsible_fio');
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
        //collums.push('outgoing_sostav_status');          // Статус состава отправленного вагона
        collums.push('outgoing_sostav_status_name');     // Статус состава отправленного вагона
        collums.push('wagon_ban_uz');                    // Запреты по УЗ
        collums.push('wagon_closed_route');                    //Замкнутый маршрут(кольцо)
        collums.push('wir_note');                    // Примечание Вагонник ГС
        return init_columns(collums, list_collums);
    };
    // инициализация полей таблицы вагоны на пути отправки (Отчет 1- вагоны детально, дерево путей)
    table_cars_way.prototype.init_columns_sending = function () {
        var collums = [];
        collums.push('position');
        if (this.settings.link_num) {
            collums.push('num_link');
        } else {
            collums.push('num');
        }
        collums.push('outgoing_sostav_status_name');     // Статус состава отправленного вагона
        collums.push('wagon_rod_abbr');
        collums.push('wagon_adm');
        collums.push('arrival_condition_abbr');
        collums.push('current_condition_abbr');
        collums.push('operator_abbr');
        collums.push('limiting_abbr');
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        collums.push('arrival_sertification_data');
        collums.push('current_loading_status');
        collums.push('arrival_division_amkr_abbr');
        return init_columns(collums, list_collums);
    };
    // инициализация полей таблицы вагоны выбранные для отправки (Отчет 2- вагоны детально, дерево путей)
    table_cars_way.prototype.init_columns_sending_select = function () {
        var collums = [];
        collums.push('position_new');
        if (this.settings.link_num) {
            collums.push('num_link');
        } else {
            collums.push('num');
        }
        collums.push('outgoing_sostav_status_name');     // Статус состава отправленного вагона
        collums.push('wagon_rod_abbr');
        collums.push('wagon_adm');
        collums.push('arrival_condition_abbr');
        collums.push('current_condition_abbr');
        collums.push('operator_abbr');
        collums.push('limiting_abbr');
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        collums.push('arrival_sertification_data');
        collums.push('current_loading_status');
        collums.push('arrival_division_amkr_abbr');
        return init_columns(collums, list_collums);
    };
    // инициализация полей таблицы вагоны выбранные для отправки (Отчет 3- вагоны детально, дерево путей)
    table_cars_way.prototype.init_columns_arrival_select = function () {
        var collums = [];
        collums.push('position_new');
        if (this.settings.link_num) {
            collums.push('num_link');
        } else {
            collums.push('num');
        }
        //collums.push('outgoing_sostav_status_name');     // Статус состава отправленного вагона
        collums.push('wagon_rod_abbr');
        collums.push('wagon_adm');
        collums.push('arrival_condition_abbr');
        collums.push('current_condition_abbr');
        collums.push('operator_abbr');
        collums.push('limiting_abbr');
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        collums.push('arrival_sertification_data');
        collums.push('current_loading_status');
        collums.push('arrival_division_amkr_abbr');
        return init_columns(collums, list_collums);
    };
    // инициализация полей таблицы вагоны учетный остаток (Отчет 4- вагоны детально, учетный остаток)
    table_cars_way.prototype.init_columns_balance_select = function () {
        var collums = [];

        collums.push('number');
        if (this.settings.link_num) {
            collums.push('num_link');
        } else {
            collums.push('num');
        }
        collums.push('sample_datetime');
        collums.push('current_station_amkr_abbr');
        collums.push('current_way_type');
        collums.push('current_way_full_name');

        // Администрация
        collums.push('wagon_adm');
        //collums.push('wagon_adm_name');
        //collums.push('wagon_adm_abbr');
        // Оператор
        //collums.push('id_operator');
        //collums.push('operators');
        collums.push('operator_abbr');
        collums.push('operator_paid');// Признак платности
        //collums.push('operator_rent_start');
        //collums.push('operator_rent_end');
        // Ограничение 
        //collums.push('id_limiting_loading');
        //collums.push('limiting_name');
        collums.push('limiting_abbr');
        // Род вагона
        //collums.push('wagon_rod');
        //collums.push('wagon_rod_name');
        collums.push('wagon_rod_abbr');
        // Тип вагона
        collums.push('wagon_type');
        // Разметка прибытие
        //collums.push('arrival_condition_name');
        collums.push('arrival_condition_abbr');
        //collums.push('arrival_condition_red');
        // разметка текущая
        //collums.push('current_condition_name');
        collums.push('current_condition_abbr');
        //collums.push('current_condition_red');
        // Дата деповского ремонта по УЗ
        collums.push('wagon_date_rem_uz');
        // Груз по прибытию
        collums.push('arrival_cargo_group_name');
        collums.push('arrival_cargo_name');
        // Сертификатные данные
        //collums.push('arrival_id_sertification_data');
        collums.push('arrival_sertification_data');
        // Коммерческое состояние
        //collums.push('arrival_id_commercial_condition');
        collums.push('arrival_commercial_condition');
        // Станция отправления
        //collums.push('arrival_station_from_code');
        collums.push('arrival_station_from_name');
        // Принят на станцию
        collums.push('accepted_station_amkr_abbr');
        // Цех-получатель
        //collums.push('arrival_division_amkr_name');
        collums.push('arrival_division_amkr_abbr');
        // Груж /порожний, состояние загрузки
        //collums.push('current_id_loading_status');
        collums.push('current_loading_status');
        // Занят (операция)
        collums.push('current_wagon_busy');
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
        //collums.push('instructional_letters_note');         // Текст письма
        // Признак платности
        //collums.push('operator_paid');
        //// Грузоподъемность
        //collums.push('wagon_gruzp_doc');
        //collums.push('wagon_gruzp_uz');
        ////Отправитель
        //collums.push('arrival_shipper_code');
        //collums.push('arrival_shipper_name');
        // Станция назначения АМКР
        //collums.push('arrival_station_amkr_name');
        //collums.push('arrival_station_amkr_abbr');
        //// Последняя операция над вагоном
        //collums.push('current_id_operation');
        //collums.push('current_operation_name');
        //// Дата начала выполнения операции
        //collums.push('current_operation_start');
        //// Дата окончания выполнения операции
        //collums.push('current_operation_end');
        //=============== ВХОДЯЩАЯ ПОСТАВКА ==================
        // Вх. поставка САП
        //collums.push('sap_incoming_supply_num');            // Номер вх. поставки
        //collums.push('sap_incoming_supply_pos');            // поз вх. поставки
        //collums.push('sap_incoming_supply_date');           // дата создания вх. поставки
        //collums.push('sap_incoming_supply_time');           // время создания вх. поставки
        //collums.push('sap_incoming_supply_cargo_code');     // склад вх. поставки
        //collums.push('sap_incoming_supply_cargo_name');     //
        //collums.push('sap_incoming_supply_warehouse_code'); // материал вх. поставки
        //collums.push('sap_incoming_supply_warehouse_name'); //
        //=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
        //collums.push('sap_outgoing_supply_num');
        //collums.push('sap_outgoing_supply_date');
        //collums.push('sap_outgoing_supply_cargo_code');
        collums.push('sap_outgoing_supply_cargo_name');
        //collums.push('sap_outgoing_supply_destination_station_code');
        collums.push('sap_outgoing_supply_destination_station_name');
        //collums.push('sap_outgoing_supply_border_checkpoint_code');
        //collums.push('sap_outgoing_supply_border_checkpoint_name');
        //collums.push('sap_outgoing_supply_shipper_code');
        collums.push('sap_outgoing_supply_shipper_name');
        //collums.push('sap_outgoing_supply_payer_code');
        //collums.push('sap_outgoing_supply_payer_name');
        //collums.push('sap_outgoing_supply_warehouse_code');
        collums.push('sap_outgoing_supply_warehouse_name');
        //collums.push('sap_outgoing_supply_netto');
        //collums.push('sap_outgoing_supply_responsible_post');
        //collums.push('sap_outgoing_supply_responsible_fio');
        //=============== ВХОДНОЕ ВЗВЕШИВАНИЕ С УЗ ==================
        // Брутто, тн
        //collums.push('wagon_brutto_doc');                   // по ЭПД (нето ЭПД + тара ЭПД || тара ЭПД уточненная)
        //collums.push('wagon_brutto_amkr');                  // по ЭПД 
        //// Тара, тн
        //collums.push('wagon_tara_doc');                     // по ЭПД 
        //collums.push('wagon_tara_arc_doc');                 // по ЭПД уточненное
        //collums.push('wagon_tara_uz');                      // по УЗ
        //// Нетто, тн 
        //collums.push('wagon_vesg_doc');                     // Вес груза ЭПД
        //collums.push('wagon_vesg_amkr');                    // Вес груза АМКР
        //// Разница нетто, тн.
        //collums.push('diff_vesg');
        //=============== ДОПОЛНИТЕЛЬНО ==================
        //
        //collums.push('doc_outgoing_car');                   // Наличие документа для сдачи
        collums.push('arrival_nom_main_doc');               // Номер основного документа(если заполнен)
        collums.push('arrival_nom_doc');                    // Номер документа(досылки)
        //collums.push('arrival_composition_index');                    // Индекс поезда прибытие
        collums.push('arrival_date_adoption');                    // дата приема вагона
        //collums.push('outgoing_date');                    // дата отправки вагона
        //collums.push('outgoing_id_return');               // Возврат
        //collums.push('outgoing_return_cause');           // Причина возврата
        collums.push('outgoing_sostav_status');          // Статус состава отправленного вагона
        //collums.push('outgoing_sostav_status_name');     // Статус состава отправленного вагона
        //collums.push('wagon_ban_uz');                    // Запреты по УЗ
        //collums.push('wagon_closed_route');                    //Замкнутый маршрут(кольцо)
        collums.push('wir_note');                    // Примечание Вагонник ГС
        collums.push('condition_repairs');
        return init_columns(collums, list_collums);
    };
    //------------------------------- КНОПКИ -------------------------------------------------------------
    table_cars_way.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок таблицы вагоны на пути отправки (Отчет 1- вагоны детально, дерево путей)
    table_cars_way.prototype.init_button_sending = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'select_all',
            action: function () {
                this.obj_t_cars.rows(function (idx, data, node) {
                    return data.position_new === null && (data.outgoing_sostav_status === 0 || data.outgoing_sostav_status === null);
                }).select();
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
    // инициализация кнопок таблицы вагоны на пути отправки (Отчет 2- вагоны детально, дерево путей)
    table_cars_way.prototype.init_button_sending_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'select_all',
            action: function () {
                this.obj_t_cars.rows().select();
            }.bind(this)
        });
        buttons.push({
            name: 'select_none',
            action: null
        });
        if (this.settings.buttons && this.settings.buttons.length > 0) {
            $.each(this.settings.buttons, function (i, el_button) {
                buttons.push(el_button);
            }.bind(this));
        };
        buttons.push({
            name: 'page_length',
            action: null
        });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок таблицы вагоны на пути отправки (Отчет 3- вагоны детально, дерево путей)
    table_cars_way.prototype.init_button_arrival_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'select_all',
            action: function () {
                this.obj_t_cars.rows(function (idx, data, node) {
                    return data.id_wim_arrival !== null;
                }).select();
            }.bind(this)
        });
        buttons.push({
            name: 'select_none',
            action: null
        });
        if (this.settings.buttons && this.settings.buttons.length > 0) {
            $.each(this.settings.buttons, function (i, el_button) {
                buttons.push(el_button);
            }.bind(this));
        };
        buttons.push({
            name: 'page_length',
            action: null
        });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок таблицы вагоны учетный остаток (Отчет 4- вагоны детально, учетный остаток)
    table_cars_way.prototype.init_button_balance_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'page_length',
            action: null
        });
        return init_buttons(buttons, list_buttons);
    };

    //-------------------------------  -------------------------------------------------------------
    // Инициализация тип отчета
    table_cars_way.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            // Таблица вагоны на АМКР (учетный остаток)
            case 4: {
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_balance_select();
                this.table_buttons = this.init_button_balance_select();
                break;
            };
            // Таблица вагоны на пути для приема
            case 3: {
                this.type_select_rows = 2; // Выбирать несколько
                this.table_select = {
                    style: 'multi'
                };
                this.table_columns = this.init_columns_arrival_select();
                this.table_buttons = this.init_button_arrival_select();
                break;
            };
            // Таблица вагоны на пути для отправки
            case 2: {
                this.type_select_rows = 2; // Выбирать несколько
                this.table_select = {
                    style: 'multi'
                };
                this.table_columns = this.init_columns_sending_select();
                this.table_buttons = this.init_button_sending_select();
                break;
            };
            // Таблица вагоны на пути для отправки
            case 1: {
                this.type_select_rows = 2; // Выбирать несколько
                this.table_select = {
                    style: 'multi'
                };
                this.table_columns = this.init_columns_sending();
                this.table_buttons = this.init_button_sending();
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
    // инициализация таблицы 
    table_cars_way.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: 0,     // 0 - вагоны детально
            link_num: false,
            complete: null,
            ids_wsd: null,
            fn_change_data: null, // Функция обратного вызова если изменили данные отображения (load... button:action...)
        }, options);
        //
        this.wagons = [];               // Список вагонов
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
            fixedHeader: true,             // вкл. фикс. заголовка
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
                if (data.wir_highlight_color !== null) {
                    $(row).attr('style', 'background-color:' + data.wir_highlight_color + ' !important;');
                }
                // Проверим если по оператору контролировать норму времени, тогда проверить
                if (data.arrival_idle_time < data.arrival_duration) {
                    // Превышена норма нахождения вагона на АМКР
                    $('td.arrival-duration', row).addClass('idle-time-error');
                    if (data.operator_monitoring_idle_time) {
                        if (this.settings.link_num) {
                            $('td.num-wagon a', row).addClass('idle-time-error')
                        } else {
                            $('td.num-wagon', row).addClass('idle-time-error')
                        }
                    };
                }

                // Прибыл
                if (data.current_id_operation === 1) {
                    $('td.fixed-column', row).addClass('red'); // Отметим прибытие
                }
                // Предъявлен или сдан
                if (data.current_id_operation === 9 || data.current_id_operation === 8) {
                    if (data.outgoing_sostav_status === 2) {
                        $('td.fixed-column', row).addClass('green');// Отметим вагон сдан на УЗ
                    }
                    if (data.outgoing_sostav_status === 1 || data.outgoing_sostav_status === 0) {
                        $('td.fixed-column', row).addClass('yellow');// Отметим вагон предъявлен
                    }
                }
                // Цвет оператора
                if (data.operator_color && data.operator_color !== '') {
                    $('td.operator', row).attr('style', 'background-color:' + data.operator_color)
                }
                // Отчет по отправке поменить вагоны которые уже отобраны
                if (this.settings.type_report === 1) {
                    if (data.position_new !== null) {
                        $('td.num-wagon', row).addClass('wagon-busy');// Отметим вагон предъявлен

                    }
                }
                // Отчет по прибытию 
                if (this.settings.type_report === 3) {
                    if (data.id_wim_arrival === null) {
                        $(row).addClass('wagon-ban');  // Отметим вагон заблокирован
                    }
                }
            }.bind(this),
            columns: this.table_columns,
            dom: 'Bfrtip',
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора, отчет вагоны детально
        if (this.settings.type_report === 0) {
            this.obj_t_cars.on('select deselect', function (e, dt, type, indexes) {
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
        };
        // Обработка события выбора отчет отправка
        if (this.settings.type_report === 1) {
            this.obj_t_cars.on('user-select', function (e, dt, type, cell, originalEvent) {
                this.out_clear();
                var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                var row = this.obj_t_cars.rows(indexes).data().toArray();
                if (row && row.length > 0 && row[0].outgoing_sostav_status && row[0].outgoing_sostav_status > 0) {
                    e.preventDefault();
                    this.out_warning('Вагон № ' + row[0].num + ' для операций заблокирован (вагон пренадлежит составу который имеет статус - ' + row[0].outgoing_sostav_status + ')');
                }
            }.bind(this)).on('select deselect', function (e, dt, type, indexes) {
                var index = this.obj_t_cars.rows({ selected: true });
                var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
                this.select_rows_wagons = rows;
                this.enable_button();
            }.bind(this));
        };
        // Обработка события выбора отчет отправка
        if (this.settings.type_report === 2) {
            this.obj_t_cars.on('select deselect', function (e, dt, type, indexes) {
                var index = this.obj_t_cars.rows({ selected: true });
                var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
                this.select_rows_wagons = rows;
                this.enable_button();
            }.bind(this));
        };
        // Обработка события выбора отчет отправка
        if (this.settings.type_report === 3) {
            this.obj_t_cars.on('user-select', function (e, dt, type, cell, originalEvent) {
                this.out_clear();
                var indexes = cell && cell.length > 0 ? cell[0][0].row : null;
                var row = this.obj_t_cars.rows(indexes).data().toArray();
                if (row && row.length > 0 && row[0].id_wim_arrival === null) {
                    e.preventDefault();
                    this.out_warning('Вагон № ' + row[0].num + ' для операций заблокирован (вагон стоит на текущем пути!)');
                }
            }.bind(this)).on('select deselect', function (e, dt, type, indexes) {
                var index = this.obj_t_cars.rows({ selected: true });
                var rows = this.obj_t_cars.rows(index && index.length > 0 ? index[0] : null).data().toArray();
                this.select_rows_wagons = rows;
                this.enable_button();
            }.bind(this));
        };

        if (this.settings.link_num) {

            this.$table_cars.on('click', 'a.num-wagon', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var num = $(e.currentTarget).attr('id')
                window.open(url_search_wagon + '?num=' + num, '', '');
            }.bind(this));
        }
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok();
        }
        //----------------------------------
    };
    // Отображение кнопки добавить
    table_cars_way.prototype.enable_button = function () {
        var index = this.obj_t_cars.rows({ selected: true });
        // Кнопка добавить в состав отчет отправка состава
        if (this.settings.type_report === 1 || this.settings.type_report === 2 || this.settings.type_report === 3) {
            this.obj_t_cars.button(4).enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
        }
    };
    // Показать данные 
    table_cars_way.prototype.view = function (data, num) {
        this.out_clear();
        LockScreen(langView('mess_view_wagons', App.Langs));
        this.obj_t_cars.clear();
        this.obj_t_cars.rows.add(data);
        this.obj_t_cars.order([0, 'asc']);
        this.obj_t_cars.draw();
        //if (this.settings.complete !== null) this.init_complete();
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
        this.enable_button(); // отображение кнопки добавить
        LockScreenOff();
    };
    //TODO: ! (Пока только тестировал) инициализация фильтров выборки
    table_cars_way.prototype.init_complete = function (skip_field) {
        this.obj_t_cars.columns().indexes().flatten().each(function (i) {
            var column = this.obj_t_cars.column(i);
            var res = this.settings.complete.find(function (o) {
                var is_class = $(column.header()).hasClass('fl-' + o.field);
                return is_class;
            });
            if (res) {
                //// Сбросим сохраненый выбор если это поле не указано как пропущеное
                //column
                //    .search('', true, false)
                //    .draw();
                //if (res.field !== skip_field) {

                //}
                var $element = res.element;
                $element.empty().append('<option value="">' + langView('title_select', App.Langs) + '</option>')
                //.off('change')
                //.on('change', function (event) {
                //    //////event.preventDefault();
                //    //////var val = $.fn.dataTable.util.escapeRegex(
                //    //////    $(event.currentTarget).val()
                //    //////    //$(this).val()
                //    //////);
                //    //////switch (val) {
                //    //////    case "": break;
                //    //////    case "null": val = '^\s*$'; break;
                //    //////    default: val = '^' + val + '$'; break;
                //    //////}
                //    //////// var val = val && val !== "null" ? '^' + val + '$' : ;
                //    //////column
                //    //////    .search(val, true, false)
                //    //////    .draw();
                //    ////////this.init_complete(res.field);
                //    ////////this.init_complete();
                //}.bind(this));
                column.data().unique().sort().each(function (d, j) {
                    if (d === null) {
                        $element.append('<option value=null>[Пусто]</option>')
                    } else {
                        $element.append('<option value="' + d + '">' + d + '</option>')
                    };
                });
            };
        }.bind(this));

        //this.obj_t_cars.columns().indexes().flatten().each(function (i) {
        //    var column = this.obj_t_cars.column(i);
        //    var sel = $(column.header()).hasClass('fl-operator_abbr');
        //    if (sel) {
        //        //var name = column.header();//.firstChild.data;
        //        //var hed = $(name).hasClass('fl-operator_abbr')
        //        var select = $('<select><option value=""></option></select>')
        //            .appendTo($(column.header()).empty())
        //            .on('change', function () {
        //                // Escape the expression so we can perform a regex match
        //                var val = $.fn.dataTable.util.escapeRegex(
        //                    $(this).val()
        //                );

        //                column
        //                    .search(val ? '^' + val + '$' : '', true, false)
        //                    .draw();
        //            });

        //        column.data().unique().sort().each(function (d, j) {
        //            select.append('<option value="' + d + '">' + d + '</option>')
        //        });
        //    }
        //}.bind(this));
    };
    // Обновить данные
    table_cars_way.prototype.update = function (num) {
        if (this.id_way !== null && this.id_way >= 0) {
            LockScreen(langView('mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfWay(this.id_way, function (wagons) {
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof this.settings.fn_change_data === 'function') {
                    this.settings.fn_change_data(this.wagons);
                }
                this.view(this.wagons, num);
                LockScreenOff();
            }.bind(this));
        }
    };
    // загрузить данные 
    table_cars_way.prototype.load_of_way = function (id_way, num) {
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfWay(id_way, function (wagons) {
                this.wagons = wagons;
                this.id_way = id_way;
                this.select_row_wagons = null;
                this.select_rows_wagons = null;
                // модифицировать данные взависимости от отчета
                if (this.settings.type_report > 0) {
                    if (this.wagons) {
                        $.each(this.wagons, function (i, el) {
                            el['position_new'] = null;
                        });
                    }
                }
                // Событие обновили данные
                if (typeof this.settings.fn_change_data === 'function') {
                    this.settings.fn_change_data(this.wagons);
                }
                this.view(this.wagons, num);
                LockScreenOff();
            }.bind(this));
        } else {
            this.wagons = [];
            this.id_way = null;
            this.select_row_wagons = null;
            this.select_rows_wagons = null;
            this.view(this.wagons, num);           //
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