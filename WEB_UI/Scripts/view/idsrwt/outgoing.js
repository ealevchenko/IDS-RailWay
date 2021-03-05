jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num_doc': '№ Ведомости',
                'field_date_readiness_amkr': 'Время предъявления на УЗ',
                'field_station_from': 'Стоит на станции',
                'field_way_from': 'Стоит на пути',
                'field_count': 'Кол. вагонов',
                'field_station_on': 'Отправлен на станцию УЗ',
                'field_date_show_wagons': 'Время готовности сдачи',
                'field_date_end_inspection_acceptance_delivery': 'Время окон. осм. приемосд.',
                'field_date_end_inspection_loader': 'Время окон. осм. грузчиками',
                'field_date_end_inspection_vagonnik': 'Время окон. осм. вагонниками',
                'field_date_readiness_uz': 'Время готовности к сдаче на УЗ                                    ',
                'field_date_outgoing': 'Время сдачи на УЗ',
                'field_date_outgoing_act': 'Время сдачи на УЗ (по акту)',
                'field_date_departure': 'Время отправления с АМКР',
                'field_count_all': 'Всего|отпр.|ост.|задерж.',
                'field_composition_index': 'Индекс поезда',
                'field_note': 'Примечание',
                'field_status': 'Статус',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал',
                'field_change': 'Строка изменена',
                'field_change_user': 'Правил',
                'field_create_sostav': 'Добавил',
                'field_change_sostav': 'Правил',

                'field_cause_return': 'Причина возврата',
                'field_return_start': 'Вернули',
                'field_return_stop': 'Закрыли возврат',
                'field_return_num_act': 'Номер акта',
                'field_return_date_act': 'Дата акта',

                //'field_carrier_kod': 'Код перевізника',
                //'field_carrier_name': 'Скорочене найменування перевізника',
                //'field_date_akt': 'Дата складання акту',
                //'field_date_dved': 'Дата укладання досильної дорожньої відомості',
                //'field_esr_akt': 'ЄСР станції складання акту ',
                //'field_stn_name_akt': 'Найменування станції складання акту',
                //'field_nom_akt': 'Номер акту',
                //'field_nom_dved': 'Номер досильної дорожньої відомості',
                //'field_oper_date': 'Дата внесення даних по акту у перевізний документ',
                //'field_prichina_akt': 'Причина',
                //'field_responsible_person': 'Ім`я особи, відповідальної за внесення данних по акту у перевізний документ',
                //'field_ser_dved': 'Серія досильної дорожньої відомості',
                //'field_type': 'Тип акту',
                //'field_vagon_nom': 'Номер вагону ',
                //'field_zd_kod': 'Код залізниці перевантаження',

                //'field_nom_cont': 'Номер контейнеру',
                //'field_kod_tiporazmer': 'Типорозмір контейнеру',
                //'field_gruzp': 'Маса брутто за трафаретом (т)',
                //'field_ves_tary_arc': 'Маса тари контейнеру (кг)',
                //'field_vesg': 'Вага вантажу нетто (кг)',
                //'field_brutto': 'Вага вантажу брутто',
                //'field_kod': 'Код платежу ',
                //'field_summa': 'Cума платежу (коп.)',
                //'field_nom_zpu': 'Номер ЗПП',
                //'field_kol_pac': 'Кількість місць упаковки',
                //'field_kod_etsng': 'Код вантажу по ЄТСНВ',

                //'field_epd_num_doc': 'id-док.',
                //'field_epd_revision': '№ рев.',
                //'field_epd_status': 'Статус',
                //'field_epd_dt': 'Обновлен',
                //'field_epd_code_from': 'Грузоотправитель',
                //'field_epd_code_on': 'Грузополучатель',
                //'field_epd_xml': 'XML',

                //'field_epd_car_num': '№ вагона',
                //'field_epd_car_operation': 'Будет прим. операц.',
                //'field_epd_car_composition_index': 'Индекс состава',
                //'field_epd_car_train': 'Поезд',
                //'field_epd_sostav_arrival': 'Состав прибыл',
                //'field_epd_car_staus': 'Статус состава',
                //'field_epd_car_arrival': 'Вагон принят',

                //'field_manual_car_num': '№ вагона',
                //'field_manual_car_operation': 'Будет прим. операц.',
                //'field_manual_car_id_doc_new': 'Найденный id-док',
                //'field_manual_car_id_doc_arrival': 'Привязаный id-док',
                //'field_manual_car_composition_index': 'Индекс состава',
                //'field_manual_car_train': 'Поезд',
                //'field_manual_sostav_arrival': 'Состав прибыл',
                //'field_manual_car_staus': 'Статус состава',
                //'field_manual_car_arrival': 'Вагон принят',

                //'field_position_arrival': '№',
                //'field_nom_doc_arrival': '№ накл.',
                //'field_nom_main_doc_arrival': '№ осн. накл',
                //'field_num_arrival': '№ вагона',
                //'field_car_countrys_arrival': 'Адм.',
                //'field_car_rod_arrival': 'Род',
                //'field_gruzp_arrival': 'ГП,т',
                //'field_u_tara_arrival': 'Тара,т',
                //'field_car_date_rem_uz_arrival': 'Рем. УЗ',
                //'field_car_date_rem_vag_arrival': 'Рем. вагон',


                //'field_car_owner_arrival': 'Собств.',
                //'field_car_operator_arrival': 'Операт.',
                //'field_limiting_arrival': 'Огран.',
                //'field_car_rent_start_arrival': 'Нач. аренды',

                //'field_condition_arrival': 'Разм. по приб.',

                //'field_code_stn_from_arrival': 'Код. ст. отпр.',
                //'field_name_stn_from_arrival': 'Ст. отпр.',
                //'field_code_stn_to_arrival': 'Код. ст. приб.',
                //'field_name_stn_to_arrival': 'Ст. приб.',
                //'field_code_border_checkpoint_arrival': 'Код. погр. перех',
                //'field_name_border_checkpoint_arrival': 'Погр. перех.',
                //'field_cross_time_arrival': 'Вр. перех.',
                //'field_code_shipper_arrival': 'Код. гру-отпр.',
                //'field_name_shipper_arrival': 'Гру-отпр.',
                //'field_code_consignee_arrival': 'Код. гру-пол.',
                //'field_name_consignee_arrival': 'Гру-пол.',

                //'field_code_payer_sender_arrival': 'Код. плат. по отпр.',
                //'field_name_payer_sender_arrival': 'Плат. по отпр',
                //'field_distance_way_arrival': 'Тар. расс.',

                //'field_vesg_arrival': 'Вес,т',
                //'field_cargo_arrival': 'Груз',
                //'field_car_kol_os_arrival': 'Кол. ос.',
                //'field_car_usl_tip_arrival': 'Тип цс',
                //'field_station_on_amkr_arrival': 'Следует на ст.',
                //'field_division_on_amkr_arrival': 'Цех получатель',

                'title_button_export': 'Экспорт',
                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_select': 'Выбрать',
                'title_button_field_view_all': 'Показать все',
                'title_button_field_clear': 'Сбросить',
                'title_button_return': 'Вернуть состав',
                'title_button_wagon': 'Вагоны',
                'title_button_wagon_accept': 'Отправить вагоны',
                'title_button_wagon_view': 'Показать вагоны',

                //'title_arrival_sostav': 'Принять состав',
                //'title_return_car': 'Вернуть вагон',

                'mess_searsh_info_wagon': 'Сбор информации по вагону ...',
                //'mess_searsh_vagon': 'Поиск вагона ...',
                //'mess_not_searsh_epd': 'Автоматически ЭПД не найден, попробуйте найти документ по номеру вагона в промежуточной базе данных (воспользовавшись кнопкой поиска справа от поля "№ Вагона") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',
                //'mess_not_searsh_epd_vagon': 'Автоматически ЭПД найден но в нем нет выбранного вагона, попробуйте найти документ по номеру вагона в промежуточной базе данных (воспользовавшись кнопкой поиска справа от поля "№ Вагона") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',

                //'mess_not_manual_epd': 'В промежуточной базе данных ЭПД не найден, введите данные вручную перейдя в режим "Ручной ввод" (воспользовавшись кнопкой "Правка" справа от поля "№ Вагона" или выбрав грузополучателя не "АМКР") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',
                //'mess_arrival_vagon': 'Переношу вагон в базу данных как прибывший ...',
                //'mess_clear_vagon': 'Возвращаю вагон в базу данных на подходах ...',
                //'mess_print': 'Готовлю документ для печати ...',
            },
            'en':  //default language: English
            {
                'field_num_doc': 'No. of the Statement',
                'field_date_readiness_amkr': 'Presentation time on UZ',
                'field_station_from': 'Standing at a station',
                'field_way_from': 'Is in the way',
                'field_count': 'Count. wagons',
                'field_station_on': 'Sent to UZ station',
                'field_date_show_wagons': 'Surrender ready time',
                'field_date_end_inspection_acceptance_delivery': 'Window time. osm. reception. ',
                'field_date_end_inspection_loader': 'Window time. osm. loaders',
                'field_date_end_inspection_vagonnik': 'Window time. osm. carriages',
                'field_date_readiness_uz': 'Readiness time for delivery to UZ',
                'field_date_outgoing': 'Time of delivery to UZ',
                'field_date_outgoing_act': 'Time of delivery to UZ (by act)',
                'field_date_departure': 'Departure time from AMKR',
                'field_count_all': 'Total | send | stop | delay',
                'field_composition_index': 'Train index',
                'field_note': 'Note',
                'field_status': 'Status',
                'field_create': 'String created',
                'field_create_user': 'Created',
                'field_change': 'String changed',
                'field_change_user': 'Rules',
                'field_create_sostav': 'Added',
                'field_change_sostav': 'Rules',

                'field_carrier_kod': 'Carrier code',
                'field_carrier_name': 'Carrier name is not fast enough',
                'field_date_akt': 'Date the act was folded',
                'field_date_dved': 'Date when the road was set to the right size',
                'field_esr_akt': 'ЄСР station folding to act',
                'field_stn_name_akt': 'Naming the station for the act',
                'field_nom_akt': 'Act number',
                'field_nom_dved': 'Number of sufficient road views',
                'field_oper_date': 'The date of the entry of the tribute according to the act of the rewinding document',
                'field_prichina_akt': 'Reason',
                'field_responsible_person': 'I`m individual, based on the data entered according to the act of the re-transfer document',
                'field_ser_dved': 'Serious road views',
                'field_type': 'Act type',
                'field_vagon_nom': 'Number of the car',
                'field_zd_kod': 'Code of zd_zd_kod',

                'field_nom_cont': 'Container number',
                'field_kod_tiporazmer': 'Type size for container',
                'field_gruzp': 'Masa gross per stencil (t)',
                'field_ves_tary_arc': 'Masa tary container (kg)',
                'field_vesg': 'Vaha vantage net (kg)',
                'field_brutto': 'Wagah vantage gross',
                'field_kod': 'Payment code',
                'field_summa': 'Amount for payment (cop.)',
                'field_nom_zpu': 'ZPP number',
                'field_kol_pac': 'Number of packs',
                'field_kod_etsng': 'Vantage code for ЄTSNV',

                'field_epd_num_doc': 'doc-id',
                'field_epd_revision': 'rev. no.',
                'field_epd_status': 'Status',
                'field_epd_dt': 'Updated',
                'field_epd_code_from': 'Shipper',
                'field_epd_code_on': 'Consignee',
                'field_epd_xml': 'XML',

                'field_epd_car_num': 'Car number',
                'field_epd_car_operation': 'Will be approx. oper. ',
                'field_epd_car_composition_index': 'Composition Index',
                'field_epd_car_train': 'Train',
                'field_epd_sostav_arrival': 'The train has arrived',
                'field_epd_car_staus': 'Train Status',
                'field_epd_car_arrival': 'Carriage accepted',

                'field_manual_car_num': 'Car number',
                'field_manual_car_operation': 'Will be approx. oper. ',
                'field_manual_car_id_doc_new': 'Found id-doc',
                'field_manual_car_id_doc_arrival': 'Bound dock id',
                'field_manual_car_composition_index': 'Composition Index',
                'field_manual_car_train': 'Train',
                'field_manual_sostav_arrival': 'The train has arrived',
                'field_manual_car_staus': 'Train status',
                'field_manual_car_arrival': 'Carriage accepted',

                'field_position_arrival': 'No.',
                'field_nom_doc_arrival': 'Incl. no.',
                'field_nom_main_doc_arrival': 'Main no. tilt ',
                'field_num_arrival': 'Wagon number',
                'field_car_countrys_arrival': 'Adm.',
                'field_car_rod_arrival': 'Rod',
                'field_gruzp_arrival': 'GP, t',
                'field_u_tara_arrival': 'Tara, t',
                'field_car_date_rem_uz_arrival': 'Rem. UZ ',
                'field_car_date_rem_vag_arrival': 'Rem. railway carriage',
                'field_car_owner_arrival': 'Own',
                'field_car_operator_arrival': 'Operator',
                'field_limiting_arrival': 'Limiting',
                'field_car_rent_start_arrival': 'Start. rent ',

                'field_condition_arrival': 'Resize by arr. ',

                'field_code_stn_from_arrival': 'Code. Art. send. ',
                'field_name_stn_from_arrival': 'Art. send. ',
                'field_code_stn_to_arrival': 'Code. Art. arr. ',
                'field_name_stn_to_arrival': 'Art. arr. ',
                'field_code_border_checkpoint_arrival': 'Code. burial cross',
                'field_name_border_checkpoint_arrival': 'Border. junction. ',
                'field_cross_time_arrival': 'Arrival time junction. ',
                'field_code_shipper_arrival': 'Code. gru-send ',
                'field_name_shipper_arrival': 'Ship shipper',
                'field_code_consignee_arrival': 'Code. gru-pol. ',
                'field_name_consignee_arrival': 'Gru-pol.',

                'field_code_payer_sender_arrival': 'Code. boards. to send ',
                'field_name_payer_sender_arrival': 'Pay. by send ',
                'field_distance_way_arrival': 'Tar. rass. ',

                'field_vesg_arrival': 'Weight, t',
                'field_cargo_arrival': 'Cargo',
                'field_car_kol_os_arrival': 'Qty. os. ',
                'field_car_usl_tip_arrival': 'Type cs',
                'field_station_on_amkr_arrival': 'Follows the station',
                'field_division_on_amkr_arrival': 'Shop recipient',

                'title_button_export': 'Export',
                'title_button_buffer': 'Buffer',
                'title_button_excel': 'Excel',
                'title_button_field': 'Fields',
                'title_button_field_select': 'Select',
                'title_button_field_view_all': 'Show all',
                'title_button_field_clear': 'Reset',
                'title_button_return': 'Return wagon',

                'title_button_wagon': 'Wagons',
                'title_button_wagon_accept': 'Send wagons',
                'title_button_wagon_view': 'Show wagons',
                'title_arrival_sostav': 'Receive Arrival',
                'title_return_car': 'Return the car',

                'mess_searsh_info_wagon': 'Search for wagon ...',
                'mess_searsh_vagon': 'Searching for a car ...',
                'mess_not_searsh_epd': 'Automatically EPD was not found, try to find the document by car number in the intermediate database (using the search button to the right of the "Car number" field) or get the car number by the consignment note number ("EPD details" column).',
                'mess_not_searsh_epd_vagon': 'Automatically EPD was found but the selected wagon does not exist in it, try to find the document by wagon number in the intermediate database (using the search button to the right of the "Wagon number" field) or get the wagon number by the consignment note number ("EPD details" column ). ',

                'mess_not_manual_epd': 'EPD was not found in the intermediate database, enter the data manually by switching to the "Manual input" mode (using the "Edit" button to the right of the "Car number" field or by selecting the consignee not "AMKR") or get the car number by number consignment note (column "EPD details"). ',
                'mess_arrival_vagon': 'Transferring the wagon to the database as arrived ...',
                'mess_clear_vagon': 'Returning the wagon to the database on the way ...',
                'mess_print': 'Preparing a document for printing ...',
            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        dc = $('div#dialog-confirm').dialog_confirm({}),
        outgoing_alert = new ALERT($('div#outgoing-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT(lang), // Создадим класс IDS_RWT
        list_sostav = null,
        data_start = null,
        data_stop = null,
        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_inc.load([], ['station'], [], false, function () {
                //ids_inc.load([], ['station', 'ways'], [], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        // Показать составы
        view_sostav = function (refresh, start, stop, filter) {
            outgoing_alert.clear_message();
            LockScreen(langView('mess_delay', langs));
            if (refresh || data_start === null || data_stop === null || data_start !== start || data_stop !== stop) {

                ids_inc.getViewOutgoingSostav(start, stop, function (data) {
                    list_sostav = data;
                    data_start = start;
                    data_stop = stop;
                    table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav);
                });
            } else {
                table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav);
            }
        },

        //*************************************************************************************
        // ОСНОВНАЯ ТАБЛИЦА СОСТАВОВ
        //*************************************************************************************
        table_sostav = {
            html_table: $('table#table-sostav-outgoing'),
            obj: null,
            select_sostav: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: {
                        style: "single"
                    },
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    sScrollX: "100%",
                    scrollX: true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                        switch (data.status) {
                            case 1: $(row).addClass('status-in-work'); $('td', row).eq(0).addClass('icon-warning'); break;
                            case 2: $(row).addClass('status-accepted'); $('td', row).eq(0).addClass('icon-ok'); break;
                            case 3: $(row).addClass('status-rejected'); $('td', row).eq(0).addClass('icon-delete'); break;
                        }
                        if (data.id_arrived !== null && data.id_sostav !== null) {
                            $('td', row).eq(1).addClass('icon-right');
                        } else { $('td', row).eq(1).addClass('icon-user'); }
                    },
                    columns: [
                        {
                            orderable: false,
                            title: langView('field_status', langs),
                            data: null,
                            defaultContent: "",
                            width: "30px"
                        },
                        {
                            //data: "num_doc",
                            data: function (row, type, val, meta) {
                                return row.num_doc;
                            },
                            title: langView('field_num_doc', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            //data: "date_readiness_amkr",
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_readiness_amkr);
                            },
                            title: langView('field_date_readiness_amkr', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "station_from",
                            data: function (row, type, val, meta) {
                                return row['station_from_name_' + lang];
                            },
                            title: langView('field_station_from', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "way_from",
                            data: function (row, type, val, meta) {
                                return row['way_from_num_' + lang];
                            },
                            title: langView('field_way_from', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "count",
                            data: function (row, type, val, meta) {
                                return row.count_all;
                            },
                            title: langView('field_count', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            //data: "station_on",
                            data: function (row, type, val, meta) {
                                return row['station_on_name_' + lang];
                            },
                            title: langView('field_station_on', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "date_show_wagons",
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_end_inspection_acceptance_delivery);
                            },
                            title: langView('field_date_end_inspection_acceptance_delivery', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_end_inspection_loader);
                            },
                            title: langView('field_date_end_inspection_loader', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_end_inspection_vagonnik);
                            },
                            title: langView('field_date_end_inspection_vagonnik', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "date_readiness_uz",
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_readiness_uz);
                            },
                            title: langView('field_date_readiness_uz', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "date_outgoing",
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_outgoing);
                            },
                            title: langView('field_date_outgoing', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "date_outgoing_act",                            
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_outgoing_act);
                            },
                            title: langView('field_date_outgoing_act', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return getReplaceTOfDT(row.date_departure);
                            },
                            title: langView('field_date_departure', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "count_all",
                            data: function (row, type, val, meta) {
                                return row.count_all + " | " + row.count_outgoing + " | " + row.count_not_outgoing + " | " + row.count_detention_return;
                            },
                            title: langView('field_count_all', langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            //data: "composition_index",
                            data: function (row, type, val, meta) {
                                return row.composition_index;
                            },
                            title: langView('field_composition_index', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "note",
                            data: function (row, type, val, meta) {
                                return row.note;
                            },
                            title: langView('field_note', langs), width: "150px", orderable: true, searchable: true
                        },
                        //{ data: "status", title: langView('field_status', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create", title: langView('field_create', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create_user", title: langView('field_create_user', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change", title: langView('field_change', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change_user", title: langView('field_change_user', langs), width: "50px", orderable: true, searchable: true },
                        {
                            //data: "create_sostav",
                            data: function (row, type, val, meta) {
                                return row.create !== null && row.create_user !== null ? row.create_user + ' (' + row.create.replace(/T/g, ' ') + ')' : null
                            },
                            title: langView('field_create_sostav', langs), width: "150px", orderable: true, searchable: true
                        },
                        {
                            //data: "change_sostav",
                            data: function (row, type, val, meta) {
                                return row.change !== null && row.change_user !== null ? row.change_user + ' (' + row.change.replace(/T/g, ' ') + ')' : null
                            },
                            title: langView('field_change_sostav', langs), width: "150px", orderable: true, searchable: true
                        }
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            extend: 'collection',
                            text: langView('title_button_export', langs),
                            buttons: [
                                {
                                    text: langView('title_button_buffer', langs),
                                    extend: 'copyHtml5',
                                },
                                {
                                    text: langView('title_button_excel', langs),
                                    extend: 'excelHtml5',
                                    sheetName: 'Поезда по прибытию',
                                    messageTop: function () {
                                        return '';
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            extend: 'collection',
                            text: langView('title_button_field', langs),
                            buttons: [
                                {
                                    extend: 'colvis',
                                    text: langView('title_button_field_select', langs),
                                    collectionLayout: 'fixed two-column',
                                },
                                {
                                    extend: 'colvisGroup',
                                    text: langView('title_button_field_view_all', langs),
                                    show: ':hidden'
                                },
                                {
                                    text: langView('title_button_field_clear', langs),
                                    action: function (e, dt, node, conf) {
                                        table_sostav.obj.colReorder.reset();
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            text: langView('title_button_return', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav && table_sostav.select_sostav.status === 0) {
                                    dc.dialog_confirm('Open', 'Вернуть?', 'Вы уверены что хотите вернуть состав, сформированый с № : ' + table_sostav.select_sostav.num_doc, function (result) {
                                        if (result) {
                                            // Определим пакет данных отправки на другую станцию
                                            var operation_provide = {
                                                id_sostav: table_sostav.select_sostav.id,
                                                user: user_name,
                                            }
                                            // Выполнить операцию отправки postSendingWagonsOfStation
                                            ids_inc.postReturnProvideWagonsOfStation(operation_provide, function (result_provide) {
                                                if (result_provide && result_provide.result > 0) {
                                                    pn_sel.view(true);
                                                    outgoing_alert.out_info_message("Операция «Вернуть состав, сформированный для предъявления» - Выполнена");
                                                } else {
                                                    outgoing_alert.out_error_message("Ошибка выполнения операции «Вернуть состав, сформированный для предъявления», код ошибки = " + (result_provide ? result_provide.result : null));
                                                    if (result_provide && result_provide.listResult && result_provide.listResult.length > 0) {
                                                        $.each(result_provide.listResult, function (i, el) {
                                                            if (el.result < 0) {
                                                                outgoing_alert.out_error_message("№ вагона :" + el.num + ", код ошибки -" + el.result);
                                                            }
                                                        });
                                                    }
                                                    LockScreenOff();
                                                }
                                            });
                                        } else {
                                            // Состав уже в работе удаление запрещено
                                            outgoing_alert.clear_message();
                                            outgoing_alert.out_warning_message("Операция «Вернуть состав сформированный для предъявления» - Отменена!");
                                        }
                                    });
                                }
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_wagon', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    // Сбросим признак обновлять информацию о составах
                                    cars_detali.update_sostav = false;
                                    cars_detali.view(table_sostav.select_sostav.id, true);
                                }
                            },
                            enabled: false
                        }
                        //{
                        //    text: langView('title_button_add', langs),
                        //    action: function (e, dt, node, config) {
                        //        pn_edit_sostav.Open(null);
                        //    },
                        //    enabled: true
                        //},
                        //{
                        //    text: langView('title_button_edit', langs),
                        //    action: function (e, dt, node, config) {
                        //        if (table_sostav.select_sostav) {
                        //            pn_edit_sostav.Open(table_sostav.select_sostav.id);
                        //        }
                        //    },
                        //    enabled: false
                        //},
                        //{
                        //    text: langView('title_button_del', langs),
                        //    action: function (e, dt, node, config) {
                        //        if (table_sostav.select_sostav) {
                        //            if (table_sostav.select_sostav.id_arrived === null) {
                        //                // Состав был добавлен вручную, можно удалить
                        //                if (table_sostav.select_sostav.status === 0) {
                        //                    // Состав не принимался, можно удалить
                        //                    dialog_confirm.open('Удалить?', 'Вы уверены что хотите удалить состав : ' + table_sostav.select_sostav.composition_index, function (result) {
                        //                        if (result) {
                        //                            ids_inc.getArrivalSostavOfID(table_sostav.select_sostav.id, function (result_sostav) {
                        //                                if (result_sostav) {
                        //                                    var sostav = result_sostav;
                        //                                    // Состав найден, вагоны есть?
                        //                                    if (sostav.ArrivalCars && sostav.ArrivalCars.length > 0) {
                        //                                        // Вагоны есть, удалим вагоны
                        //                                        ids_inc.deleteArrivalCarsOfSostav(sostav.id, function (result_del_cars) {
                        //                                            if (result_del_cars > 0) {
                        //                                                // Вагоны удалены, удалим состав
                        //                                                ids_inc.deleteArrivalSostav(sostav.id,
                        //                                                    function (result_del) {
                        //                                                        if (result_del > 0) {
                        //                                                            pn_sel.view(true);
                        //                                                        } else {
                        //                                                            outgoing_alert.clear_message();
                        //                                                            outgoing_alert.out_error_message("При удалении сотава произошла ошибка");
                        //                                                        }
                        //                                                    });
                        //                                            } else {
                        //                                                // Ошибка удаления вагонов
                        //                                                outgoing_alert.clear_message();
                        //                                                outgoing_alert.out_error_message("При удалении вагонов сотава произошла ошибка");
                        //                                            }
                        //                                        });
                        //                                    } else {
                        //                                        // Вагонов нет удалим состав
                        //                                        ids_inc.deleteArrivalSostav(sostav.id, function (result_del) {
                        //                                            if (result_del > 0) {
                        //                                                pn_sel.view(true);
                        //                                            } else {
                        //                                                outgoing_alert.clear_message();
                        //                                                outgoing_alert.out_error_message("При удалении сотава произошла ошибка");
                        //                                            }
                        //                                        });
                        //                                    }
                        //                                } else {
                        //                                    // Состав не найден
                        //                                    outgoing_alert.clear_message();
                        //                                    outgoing_alert.out_error_message("Перед процедурой удаления, не удалось получить информацию о составе!");
                        //                                }
                        //                            });
                        //                        }
                        //                    });
                        //                } else {
                        //                    // Состав уже в работе удаление запрещено
                        //                    outgoing_alert.clear_message();
                        //                    outgoing_alert.out_error_message("Состав в работе, удаление – отклонено!");
                        //                }
                        //            } else {
                        //                // Состав добавлен автоматически, только отклонить
                        //                dialog_confirm.open('Отклонить?', 'Вы уверены что хотите отклонить состав : ' + table_sostav.select_sostav.composition_index, function (result) {
                        //                    if (result) {
                        //                        table_sostav.select_sostav.status = 3;                          // Присвоим статус отклонить
                        //                        table_sostav.select_sostav.change = toISOStringTZ(new Date());  // Сохраним кто менял
                        //                        table_sostav.select_sostav.change_user = user_name;
                        //                        ids_inc.putArrivalSostav(table_sostav.select_sostav,
                        //                            function (result_upd) {
                        //                                if (result_upd > 0) {
                        //                                    pn_sel.view(true);
                        //                                    outgoing_alert.clear_message();
                        //                                    outgoing_alert.out_info_message("Статус состава (отклонить) - установлен.");
                        //                                } else {
                        //                                    outgoing_alert.clear_message();
                        //                                    outgoing_alert.out_error_message("При обновлении статуса сотава произошла ошибка");
                        //                                }
                        //                            });
                        //                    }
                        //                });
                        //            }
                        //        }
                        //    },
                        //    enabled: false
                        //},

                    ]
                }).on('select', function (e, dt, type, indexes) {
                    var rowData = table_sostav.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_sostav.select_sostav = rowData[0];
                        table_sostav.obj.button(3).enable(true);
                        if (table_sostav.select_sostav.status < 1) {
                            //table_sostav.obj.button(5).enable(true);
                            table_sostav.obj.button(2).enable(true);
                            table_sostav.obj.button(3).text(langView('title_button_wagon_accept', langs));
                        } else {
                            // Если статус в работе принят или удален 
                            //table_sostav.obj.button(5).enable(false);
                            table_sostav.obj.button(2).enable(false);
                            table_sostav.obj.button(3).text(langView('title_button_wagon_view', langs));
                        }
                    } else {
                        //table_sostav.obj.button(5).enable(false);
                        table_sostav.obj.button(2).enable(false);
                        table_sostav.obj.button(3).enable(false);
                    }
                }).on('deselect', function (e, dt, type, indexes) {
                    table_sostav.deselect();
                });
            },
            // Показать таблицу с данными
            view: function (data) {
                var id_select = table_sostav.select_sostav ? table_sostav.select_sostav.id : 0;
                table_sostav.obj.clear();
                // Сбросить выделенный состав
                table_sostav.deselect();
                table_sostav.obj.rows.add(data);
                //$.each(data, function (i, el) {
                //    table_sostav.obj.row.add(table_sostav.get_sostav(el));
                //});
                table_sostav.obj.order([1, 'asc']);
                table_sostav.obj.row('#' + id_select).select();
                table_sostav.obj.draw();
                LockScreenOff();
            },
            // Обновить данные в таблице
            update_sostav: function (data) {
                //if (data) {
                //    var row = table_sostav.get_sostav(data);
                //    var index = table_sostav.obj.row('#' + data.id).index();

                //    table_sostav.obj.cell(index, 1).data(row.train);
                //    table_sostav.obj.cell(index, 2).data(row.composition_index);
                //    table_sostav.obj.cell(index, 3).data(row.date_arrival);
                //    table_sostav.obj.cell(index, 4).data(row.date_adoption);
                //    table_sostav.obj.cell(index, 5).data(row.date_adoption_act);
                //    table_sostav.obj.cell(index, 6).data(row.station_from);
                //    table_sostav.obj.cell(index, 7).data(row.station_on);
                //    table_sostav.obj.cell(index, 8).data(row.id_way);
                //    table_sostav.obj.cell(index, 9).data(row.num_doc);
                //    table_sostav.obj.cell(index, 10).data(row.count_all);
                //    table_sostav.obj.cell(index, 11).data(row.create_sostav);
                //    table_sostav.obj.cell(index, 12).data(row.change_sostav);
                //    table_sostav.obj.draw();
                //}
            },
            // Deselect
            deselect: function () {
                table_sostav.select_sostav = null;
                //table_sostav.obj.button(5).enable(false);
                //table_sostav.obj.button(6).enable(false);
                table_sostav.obj.button(2).enable(false);
            }
        },

        //*************************************************************************************
        // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА СОСТАВОВ
        //*************************************************************************************
        pn_sel = {
            cur_dt: moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
            start_dt: null,
            stop_dt: null,
            code_ctation: null,
            dt_obj: null,
            select_station: $('select#select-station'),
            span_range_date: $('span#select-date'),
            input_data_start: $('input#date-start'),
            input_data_stop: $('input#date-stop'),
            report_fst: $('#report_fst'),
            report_fsci: $('#report_fsci'),

            init: function (list_station) {
                // настроим компонент дата
                pn_sel.dt_obj = pn_sel.span_range_date.dateRangePicker(
                    {
                        language: 'ru',
                        format: 'DD.MM.YYYY HH:mm',
                        separator: '-',
                        autoClose: false,
                        time: {
                            enabled: true
                        },
                        setValue: function (s, s1, s2) {
                            pn_sel.input_data_start.val(s1);
                            pn_sel.input_data_stop.val(s2);
                        }
                    }).
                    bind('datepicker-change', function (evt, obj) {
                        pn_sel.start_dt = obj.date1;
                        pn_sel.stop_dt = obj.date2;
                    })
                    .bind('datepicker-closed', function () {
                        pn_sel.view(false);
                    });
                pn_sel.start_dt = moment(pn_sel.cur_dt).set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 })._d;
                pn_sel.stop_dt = moment(pn_sel.cur_dt).set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 })._d;
                pn_sel.dt_obj.data('dateRangePicker').setDateRange(moment(pn_sel.start_dt).format('DD.MM.YYYY HH:mm:'), moment(pn_sel.stop_dt).format('DD.MM.YYYY HH:mm:'), true);
                // настроим селект
                pn_sel.select_station = cd_initSelect(
                    pn_sel.select_station,
                    { lang: lang },
                    list_station,
                    null,
                    -1,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор смены
                        pn_sel.view(false);
                    },
                    null);
                // 
                pn_sel.report_fst.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_fst');
                    }
                });
                //
                pn_sel.report_fsci.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_fsci');
                    }
                });
            },
            view: function (refresh) {
                view_sostav(refresh, pn_sel.start_dt, pn_sel.stop_dt, Number(pn_sel.select_station.val()) !== -1 ? function (i) { return i.id_station_from === Number(pn_sel.select_station.val()) ? true : false; } : null);
            }
        },

        //*************************************************************************************
        // ОКНО "ПРЕДЪЯВИТЬ И ОТПРАВИТЬ ВАГОНЫ"
        //*************************************************************************************
        cars_detali = {
            // ФУНКЦИИ ОКНА "ПРЕДЪЯВИТЬ И ОТПРАВИТЬ ВАГОНЫ" ****************************************************************************************************************************************
            //---------------------------------------------------------------------------------------------------
            // Основные переменные окна "Предъявить и отправить вагоны"
            //---------------------------------------------------------------------------------------------------
            content: $('.cd-cars-detali'),
            lang: null,
            user: null,
            ids_inc: null,
            id_sostav: null,
            sostav: null,
            alert: null,

            //alert_detention: null,
            update_sostav: false,                               // Признак обновления состава после закрытия окна
            //-------------------------------------------------------------------------------------
            // Переменные компонентов окна "Предъявить и отправить вагоны"
            //-------------------------------------------------------------------------------------
            sostav_title: $('h1#sostav-title'),
            //-------------------------------------------------------------------------------------
            // Инициализация объектов окна "Предъявить и отправить вагоны"
            //-------------------------------------------------------------------------------------
            // Общая инициализация объектов окна
            init: function (lang, user_name) {
                cars_detali.lang = lang;
                cars_detali.user = user_name;
                // создадим классы
                cars_detali.ids_inc = new IDS_RWT(cars_detali.lang); // Создадим класс IDS_RWT
                cars_detali.alert = new ALERT($('div#car-detali-alert'));// Создадим класс ALERTG
                // Соберем все элементы для валидации отправки вагона в массив 
                cars_detali.all_obj_outgoing_car = $([])
                    .add(cars_detali.position_outgoing)
                    .add(cars_detali.date_outgoing_act)
                    .add(cars_detali.date_outgoing_act.obj)
                    .add(cars_detali.rod_vag_abbr)
                    .add(cars_detali.rod_vag_name)
                    .add(cars_detali.adm_kod)
                    .add(cars_detali.adm_name)
                    .add(cars_detali.num_cont_1)
                    .add(cars_detali.num_cont_2)
                    .add(cars_detali.loaded_car)
                    .add(cars_detali.condition_arrival)
                    .add(cars_detali.condition_provide)

                    .add(cars_detali.cargo_name)
                    .add(cars_detali.loading_devision_code)
                    .add(cars_detali.loading_devision)
                    .add(cars_detali.owner_name)
                    .add(cars_detali.operator_name)
                    .add(cars_detali.limiting_loading_uz)
                    .add(cars_detali.limiting_loading_amkr)

                    .add(cars_detali.cause_detention)
                    .add(cars_detali.detention_start.obj)
                    .add(cars_detali.detention_stop.obj)

                    .add(cars_detali.cause_return)
                    .add(cars_detali.return_start.obj)
                    .add(cars_detali.return_stop.obj)
                    .add(cars_detali.return_num_act)
                    .add(cars_detali.return_date_act.obj)
                    .add(cars_detali.return_note)

                    .add(cars_detali.cargo_arrival)
                    .add(cars_detali.cargo_sap)
                    .add(cars_detali.date_arrival)
                    .add(cars_detali.gruzp_arrival)
                    .add(cars_detali.tara_arrival)
                    .add(cars_detali.owner_name_arrival)
                    .add(cars_detali.operator_name_arrival)
                    .add(cars_detali.limiting_loading_arrival)
                    ;

                // Соберем все элементы для валидации отправки вагона в массив 
                cars_detali.all_obj_outgoing_car_detention = $([])
                    .add(cars_detali.cause_detention)
                    .add(cars_detali.detention_start.obj)
                    .add(cars_detali.detention_stop.obj);
                // Соберем все элементы для валидации отправки вагона в массив 
                cars_detali.all_obj_outgoing_car_return = $([])
                    .add(cars_detali.cause_return)
                    .add(cars_detali.return_start.obj)
                    .add(cars_detali.return_stop.obj)
                    .add(cars_detali.return_num_act)
                    .add(cars_detali.return_date_act.obj)
                    .add(cars_detali.return_note);

                // Валидации
                cars_detali.val_outgoing_car = new VALIDATION(cars_detali.lang, cars_detali.alert_outgoing_car, cars_detali.all_obj_outgoing_car); // Создадим класс VALIDATION
                cars_detali.val_outgoing_car_detention = new VALIDATION(cars_detali.lang, cars_detali.alert_detention_car, cars_detali.all_obj_outgoing_car_detention); // Создадим класс VALIDATION
                cars_detali.val_outgoing_car_return = new VALIDATION(cars_detali.lang, cars_detali.alert_return_car, cars_detali.all_obj_outgoing_car_return); // Создадим класс VALIDATION

                // Таблицы
                cars_detali.table_return_cars.init();// Инициализация таблицы возврата вагонов


                //cars_detali.table_arrival_cars.init();// Инициализация таблицы с принятыми вагонами

                // Инициализация окна принять состав
                //pn_arrival_sostav.init(cars_detali.lang, cars_detali.user, function (result_arrival_sostav) {
                //    // !!! сделать обработку результата
                //    cars_detali.alert.clear_message();
                //    cars_detali.alert.out_info_message('Состав (№ поезда :' + cars_detali.sostav.train + ', Индекс поезда :' + cars_detali.sostav.composition_index + ') - Принят на АМКР');
                //    // Установить признак обновления составов
                //    cars_detali.update_sostav = true;

                //    // Показать 
                //    cars_detali.view(table_sostav.select_sostav.id, false);
                //});
                // Sumbit form
                cars_detali.content.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
                // Настройка закрыть детали проекта
                cars_detali.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    // Обновить все (Обновится тогда когда будет признак cars_detali.update_sostav=true, очень много строк неоходимо обновлять - пример перенос вагонов по прибытию)
                    if (cars_detali.update_sostav) {
                        pn_sel.view(true);
                    }
                    cars_detali.content.removeClass('is-visible');
                });
            },
            // Обновить и загрузить списочные компоненты окна
            init_select: function () {
                cars_detali.update_reason_discrepancy_amkr(null);           // Причина расхождения АМКР
                cars_detali.update_reason_discrepancy_uz(null);             // Причина расхождения УЗ
                cars_detali.update_cargo(null);                             // Груз
                cars_detali.update_loading_devision(null);                  // Цех погрузки
                cars_detali.update_cause_detention(null);                   // Причина задержания
                cars_detali.update_cause_return(null);                      // Причина возврата

            },
            //-------------------------------------------------------------------------------------
            // Управление режимами и состоянием окна "Предъявить и отправить вагоны"
            //-------------------------------------------------------------------------------------
            // Возвращает свойство "редактирование разрешено" - true, запрещено -false
            is_edit_mode_of_element: function (el) {
                var res = $(el).attr('data-edit') === 'open' || $(el).attr('data-edit') === '' ? true : false;
                return res;
            },
            // Открыть элементы для редактирования (вагон принят)
            set_open_edit: function () {
                // Выполнить если состав определен и статус <2
                if (cars_detali.sostav && cars_detali.sostav.status < 2) {
                    $('[data-form="transceiver"]').each(function (i, el) {
                        $(el).attr('data-edit', 'open');
                        // Проверим элемент имеет статус редактируемый
                        if ($(el).attr('data-mode') === 'edit') {
                            $(el).prop("disabled", false);
                        }
                    });
                }
            },
            // Закрыть элементы для редактирования (вагон новый или принемается)
            set_close_edit: function () {
                $('[data-form="transceiver"]').each(function (i, el) {
                    $(el).attr('data-edit', 'close');
                    $(el).prop("disabled", true); // Все элементы деактивируем
                });
                cars_detali.car_status = 0;
            },
            // Показать вагоны
            view: function (id, message) {
                cars_detali.clear(message);            // Очистить все ячейки
                cars_detali.set_close_edit();          // Перевести в режим "close" по умолчанию
                if (id === null) return;
                cars_detali.id_sostav = id;
                // Загрузка библиотек
                cars_detali.loadReference(function () {
                    // Получим текуший состав
                    LockScreen(langView('mess_delay', langs));
                    // Загрузим состав
                    cars_detali.loadOutgoingCarsOfSostav(cars_detali.id_sostav, function (result_sostav) {
                        if (result_sostav) {
                            // Запись есть
                            // определим станцию и путь
                            var station = cars_detali.ids_inc.ids_dir.getStation_Internal_Of_ID(result_sostav.id_station_from);
                            var way = cars_detali.ids_inc.ids_dir.getWays_Internal_Of_ID(result_sostav.id_way_from);
                            // Покаать информацию по составу
                            cars_detali.sostav_title.text('Информация по составу [ № Накладной :' + cars_detali.sostav.num_doc + ', время предъявления на УЗ :' + getReplaceTOfDT(cars_detali.sostav.date_readiness_amkr) + ', станция :' + (station !== null ? station['station_name_' + cars_detali.lang] : null) + ', путь :' + (way !== null ? way['way_num_' + cars_detali.lang] + '-' + way['way_name_' + cars_detali.lang] : null) + ' ]');
                            // Загрузим списочные компоненты
                            cars_detali.init_select();
                            // Показать список не отправленных вагонов, отсортировав по позиции
                            cars_detali.view_cars_not_outgoing(cars_detali.sostav.OutgoingCars.filter(function (i) { return i.outgoing === null ? true : false; }).sort(function (a, b) { return Number(a.position) - Number(b.position); }));
                            // Показать список принятых вагонов
                            //cars_detali.table_arrival_cars.view(cars_detali.sostav.ArrivalCars.filter(function (i) { return i.arrival !== null ? true : false; }).sort(function (a, b) { return Number(a.position_arrival) - Number(b.position_arrival); }));
                            // Показать страницу детально
                            cars_detali.content.addClass('is-visible');
                            LockScreenOff();
                        } else {
                            cars_detali.alert.out_error_message('В базе данных нет записи по составу с id=' + cars_detali.id_sostav);
                            LockScreenOff();
                        }
                    });
                    //cars_detali.ids_inc.getOutgoingSostavOfID(cars_detali.id_sostav, function (result_sostav) {
                    //    // Запомним результат
                    //    cars_detali.sostav = result_sostav;
                    //});
                });
            },

            // ФУНКЦИИ РАЗДЕЛА "ВАГОНЫ" ******************************************************************************************************************************************
            //-------------------------------------------------------------------------------------
            // Переменные раздела "Вагоны" 
            //-------------------------------------------------------------------------------------
            //// Кнопка найти вагон по ЭПД
            //add_num_car_of_epd: $('button#add-num-car-of-epd').on('click', function (event) {
            //    event.preventDefault();
            //    pn_search_epd.Open(cars_detali.sostav);
            //}),
            //// Кнопка найти вагон вручную
            //add_num_car_manual: $('button#add-num-car-manual').on('click', function (event) {
            //    event.preventDefault();
            //    pn_manual_car.Open(cars_detali.sostav);
            //}),
            //-------------------------------------------------------------------------------------
            // КОМПОНЕНТЫ РАЗДЕЛА "ВАГОНЫ"
            //-------------------------------------------------------------------------------------
            // Отображение компонентов раздела "Вагоны"
            //-------------------------------------------------------------------------------------
            // Показать не отправленные вагоны
            view_cars_not_outgoing: function (list) {
                $('div#list-cars-not-outgoing').empty();
                $.each(list, function (i, el) {
                    var icon_arrival = 'fa-train';
                    //if (el.id_transfer) {
                    //    icon_arrival = 'fa-share';
                    //} else {
                    //    if (el.note) {
                    //        icon_arrival = 'fa-hand-paper-o';
                    //    }
                    //}
                    var link = $('<a class="list-group-item list-group-item-action" id="' + el.id + '" data-toggle="list" href="#" role="tab" aria-controls="">' + el.num + ' <i class="fa ' + icon_arrival + '" aria-hidden="true"></i> ' + (el.num_doc ? '<i class="fa fa-file-text-o" aria-hidden="true" title="Документ найден"></i>' : '') + '</a>');
                    //if (el.consignee === 7932) {
                    //    link.addClass('list-group-item-success');
                    //}
                    $('div#list-cars-not-outgoing').append(link);

                });
                // Определим событие
                $('#list-cars-not-outgoing a').on('click', function (e) {
                    e.preventDefault();
                    var id = $(this).attr('id');
                    LockScreen(langView('mess_searsh_info_wagon', langs));
                    cars_detali.alert.clear_message();
                    cars_detali.val_outgoing_car.clear_all();                 // Очистить ошибки если принимали вагон, с ошибкой
                    cars_detali.val_outgoing_car_detention.clear_all();       // Очистить ошибки по задержаниям
                    cars_detali.val_outgoing_car_return.clear_all();        // Очистить ошибки по возвратам
                    cars_detali.select_wir = null;                          // Сбросим внутреенее перемещение вагона
                    cars_detali.list_detention_return = null;               // Сбросим список возвратов и задержаний
                    cars_detali.wagon_info_uz = null;                       // Сбросим информацию о вагоне с базы днных УЗ
                    cars_detali.load_car_of_db(id, function (car) {
                        if (car !== null) {
                            // Найдем информацию по внутренему перемещению
                            cars_detali.ids_inc.getWagonInternalRoutesOfOutgoingCarsID(id, function (wir) {
                                if (wir) {
                                    cars_detali.select_wir = wir;
                                    // Найдем и обновим всю информацию по возвратам и задержаниям
                                    cars_detali.loadOutgoingDetentionReturnOfnum(cars_detali.select_num, function (list_detention_return) {
                                        cars_detali.ids_inc.uz_dir.getInfoWagonOfNum(cars_detali.select_num, function (car_info) {
                                            cars_detali.wagon_info_uz = car_info;
                                            // Внутренее перемещение есть
                                            cars_detali.view_cars(cars_detali.select_car, cars_detali.select_wir, cars_detali.wagon_info_uz);
                                        });
                                    });
                                } else {
                                    // нет информации о внутренем перемещениии
                                    cars_detali.alert.out_error_message('В базе данных нет записи по внутренему перемещению вагона c id_outgoing_car = ' + id);
                                    LockScreenOff();
                                }
                            });
                        } else {
                            cars_detali.alert.out_error_message('В базе данных нет записи по вагону c id = ' + id);
                            LockScreenOff();
                        }
                    });

                });
            },
            // Загрузить вагон
            load_car_of_db: function (id, callback) {
                cars_detali.select_id = null;                                             // Сохраним id вагона
                cars_detali.select_num = null;                                           // Сохраним номер вагона
                cars_detali.select_car = null;
                cars_detali.ids_inc.getOutgoingCarsOfID(id, function (car) {
                    if (car !== null) {
                        cars_detali.select_id = car.id;                                             // Сохраним id вагона
                        cars_detali.select_num = car.num;                                           // Сохраним номер вагона
                        cars_detali.select_car = car;                                               // Сохраним номер вагона
                    } else {
                        cars_detali.alert.out_error_message('В базе данных нет записи по вагону c id = ' + id);
                        LockScreenOff();
                    }
                    if (typeof callback === 'function') {
                        callback(car);
                    }
                });

            },
            // ФУНКЦИИ РАЗДЕЛА "ИНФОРМАЦИЯ О ВАГОНЕ И ЭПД" **********************************************************************************************************************
            //-------------------------------------------------------------------------------------
            // Основные переменные раздела "информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            car_status: 0,                                      // Состояние вагона 0-закрыт (уже принят иди вагон еще не выбран), 
            // 1-автомат (выбран и не принят и вагон вводится автоматически с ЭПД, только минимальный ручной ввод)
            // 2-ручной ввод (выбран и не принят и вся информация вводится в ручную и из существующих справочников)
            select_id: null,                                    // Выбранный id вагона
            select_num: null,                                   // Выбранный номер вагона
            select_car: null,                                   // Выбранный вагон
            //select_id_outgoing_detention_return: null,        // Выбранное id задержания
            select_wir: null,                                   // Выбранное внутренее перемещение вагона
            list_detention_return: null,                        // Список задержаний и возвратов
            current_cars_return: null,                          // Текущий возврат
            wagon_info_uz: null,                                // Информация о вагоне из БД УЗ (текущая)
            //select_id_cargo: null,                              // Выбранный груз (таблица [KRR-PA-CNT-Railway].[IDS].[Directory_Cargo])
            //select_id_cargo_gng: null,                          // Выбранный груз (таблица [KRR-PA-CNT-Railway].[IDS].[Directory_CargoGNG])
            //select_otpr: null,                                  // Выбранный документ
            //select_otpr_vagon: null,                            // Информация по выбраному вагону эпд
            //select_otpr_cont: null,                             // Информация о контейнерах выбраного вагона эпд
            //select_main_otpr: null,                             // Выбранный основной документ (заполняется если по вагону досылочный документ)
            //select_main_otpr_vagon: null,                       // Информация по выбраному вагону из основного документа эпд (заполняется если по вагону досылочный документ)
            //select_main_otpr_cont: null,                        // Информация о контейнерах выбраного вагона из основного документа эпд (заполняется если по вагону досылочный документ)
            //select_vagon: null,                                 // Информация по выбраному из справочника
            //select_vagon_mode: false,                           // Режим вывода вагона из справочника (select_vagon_mode = false-вагон режим просмотра true-режим ввода в ручную)
            // ВАЛИДАЦИЯ --------------------------------------------------------------------
            val_outgoing_car: null,                                 // класс валидации val_arrival_car
            val_outgoing_car_detention: null,                       // класс валидации val_outgoing_car_detention
            val_outgoing_car_return: null,                          // класс валидации val_outgoing_car_return
            alert_outgoing_car: $('div#car-detali-alert'),          // класс сообщений alert_arrival_car
            alert_detention_car: $('div#car-detention-alert'),      // класс сообщений alert_arrival_car
            alert_return_car: $('div#car-return-alert'),            // класс сообщений alert_arrival_car
            all_obj_outgoing_car: null,                             // массив всех элементов валидации all_obj_outgoingl_car
            all_obj_outgoing_car_detention: null,                   // массив всех элементов валидации all_obj_outgoing_car_detention    
            all_obj_outgoing_car_return: null,                      // массив всех элементов валидации all_obj_outgoing_car_detention             
            //-------------------------------------------------------------------------------------
            // Переменные раздела "Информация о вагоне и ЭПД" 
            //-------------------------------------------------------------------------------------
            // Тестовые кнопки перехода в режимы
            // Кнопка "Предъявить вагон"
            bt_arrival_car: $('button#present-car').on('click', function (event) {
                event.preventDefault();
            }),
            // Раздел основная информация
            num_car: $('input#num_car'), // Номер вагона
            position_outgoing: $('input#position_outgoing').inputSpinner(),
            // дата и время принятия вагона по акту
            date_outgoing_act: cd_initDateTimeRangePicker($('input#date_outgoing_act'), { lang: lang, time: true }, function (datetime) {

            }),
            car_return: $('button#car_return').on('click', function() {
                event.preventDefault();
                // Подтверждение выполнения операции.
                dc.dialog_confirm('Open', 'Отменить?', 'Отменить предъявление вагона №' + cars_detali.select_num+'. Вагон будет убран из состава для предъявления и возвращен на путь и открыт для операций перемещения.', function (result) {
                    if (result) {
                        // Выполнить операцию
                        LockScreen(langView('mess_operation', langs));
                        cars_detali.val_outgoing_car_return.clear_all();
                        // Ок, возврат определен
                        // Подготовим операцию
                        var operation_return = {
                            id_outgoing_car: cars_detali.select_id,
                            date_start: toISOStringTZ(new Date()),
                            user: cars_detali.user
                        };
                        // Выполним операцию
                        cars_detali.ids_inc.postPostOperationReturnProvideWagon(operation_return, function (result_operation) {
                            if (result_operation > 0) {
                                cars_detali.alert.out_info_message("Операция «ОТМЕНА ПРЕДЪЯВЛЕНИЯ ВАГОНА» – выполнена!");
                            } else {
                                // Ошибка выполнения
                                cars_detali.alert.out_error_message("Ошибка выполнения операции «ОТМЕНА ПРЕДЪЯВЛЕНИЯ ВАГОНА», код ошибки = " + result_operation);
                                //cars_detali.return_open.prop("disabled", false);
                                LockScreenOff();
                            }
                            // Обновим данные
                            cars_detali.loadOutgoingCarsOfSostav(cars_detali.id_sostav, function (result_sostav) {
                                //cars_detali.return_open.prop("disabled", false);
                                if (result_sostav) {
                                    // Показать список не отправленных вагонов, отсортировав по позиции
                                    cars_detali.clear(false);            // Очистить все ячейки
                                    cars_detali.set_close_edit();          // Перевести в режим "close" по умолчанию
                                    cars_detali.view_cars_not_outgoing(cars_detali.sostav.OutgoingCars.filter(function (i) { return i.outgoing === null ? true : false; }).sort(function (a, b) { return Number(a.position) - Number(b.position); }));
                                    cars_detali.update_sostav = true;
                                    LockScreenOff();
                                } else {
                                    cars_detali.alert.out_error_message('В базе данных нет записи по составу с id=' + cars_detali.id_sostav);
                                    LockScreenOff();
                                }
                            });
                        });
                    } else {
                        cars_detali.alert.out_warning_message("Выполнение операции «ОТМЕНИТЬ ПРЕДЪЯВЛЕНИЕ ВАГОНА» - отменено!");
                    }
                });
            }),
            num_cont_1: $('input#num_cont_1'), // Номер контейнера 1
            num_cont_2: $('input#num_cont_2'), // Номер контейнера 2
            rod_vag_abbr: $('input#rod_vag_abbr'), // Род вагона абрив.
            rod_vag_name: $('input#rod_vag_name'), // Род вагона полное назв.
            adm_kod: $('input#adm_kod'), // Код адм.
            adm_name: $('input#adm_name'), // Имя Адм.
            num_cont_1: $('input#num_cont_1'), // Номер контейнера 1
            num_cont_2: $('input#num_cont_2'), // Номер контейнера 1
            loaded_car: $('input#loaded_car'), // Груженный/порожний
            condition_arrival: $('input#condition_arrival'), // Разметка прибыти
            condition_provide: $('input#condition_provide'), // Разметка выгрузка
            reason_discrepancy_amkr: $('input#reason_discrepancy_amkr'), // причина расхождения АМКР
            reason_discrepancy_uz: $('input#reason_discrepancy_uz'), // причина расхождения УЗ
            cause_detention: $('input#cause_detention'), // причина задержания
            // начало задержания
            detention_start: cd_initDateTimeRangePicker($('input#detention_start'), { lang: lang, time: true }, function (datetime) {

            }),
            // конец задержания
            detention_stop: cd_initDateTimeRangePicker($('input#detention_stop'), { lang: lang, time: true }, function (datetime) {

            }),
            // Кнопка добавить 
            detention_save: $('button#detention_save').on('click', function () {
                event.preventDefault();
                cars_detali.detention_save.prop("disabled", true);
                var valid = cars_detali.validation_outgoing_car_detention();
                if (valid) {
                    // Подтверждение выполнения операции.
                    dc.dialog_confirm('Open', 'Сохранить?', 'Подтвердите выполнение операции «СОХРАНИТЬ ЗАДЕРЖАНИЕ»', function (result) {
                        if (result) {
                            // Выполнить операцию
                            LockScreen(langView('mess_operation', langs));
                            cars_detali.val_outgoing_car_detention.clear_all();
                            // Подготовим операцию
                            var operation_detentions = {
                                id_outgoing_car: cars_detali.select_id,
                                id_detention_return: cars_detali.ids_inc.ids_dir.getID_Detention_Return_Of_Name(get_input_string_value(cars_detali.cause_detention), 'cause', cars_detali.lang),
                                date_start: toISOStringTZ(get_datetime_value(cars_detali.detention_start.val(), cars_detali.lang)),
                                date_stop: toISOStringTZ(get_datetime_value(cars_detali.detention_stop.val(), cars_detali.lang)),
                                user: cars_detali.user
                            };
                            // Выполним операцию
                            cars_detali.ids_inc.postUpdateOutgoingDetention(operation_detentions, function (result_operation) {
                                if (result_operation > 0) {
                                    cars_detali.val_outgoing_car_detention.out_info_message("Операция «Добавить или обновить задержание» – выполнена!");
                                } else {
                                    // Ошибка выполнения
                                    cars_detali.val_outgoing_car_detention.out_error_message("Ошибка выполнения операции «Добавить или обновить задержание», код ошибки = " + result_operation);
                                    LockScreenOff();
                                }
                                // Обновим данные
                                cars_detali.load_car_of_db(cars_detali.select_id, function (car) {
                                    cars_detali.detention_save.prop("disabled", false);
                                    cars_detali.view_cars_detention_current(car.OutgoingDetentionReturn);
                                    LockScreenOff();
                                });
                            });
                        } else {
                            cars_detali.detention_save.prop("disabled", false);
                            cars_detali.val_outgoing_car_detention.out_warning_message("Выполнение операции «Сохранить задержание» - отменено!");
                        }
                    });
                } else {
                    cars_detali.detention_save.prop("disabled", false);
                }
            }),
            // Кнопка добавить 
            detention_edit: $('button#detention_edit').on('click', function () {
                event.preventDefault();
                cars_detali.view_cars_detention_buttons(false); // edit
            }),
            // Возврат
            cause_return: $('input#cause_return'), // причина возврата
            // начало возврата
            return_start: cd_initDateTimeRangePicker($('input#return_start'), { lang: lang, time: true }, function (datetime) { }),
            // конец возврата
            return_stop: cd_initDateTimeRangePicker($('input#return_stop'), { lang: lang, time: true }, function (datetime) { }),
            return_num_act: $('input#return_num_act'), // номер акта
            // Дата акта
            return_date_act: cd_initDateTimeRangePicker($('input#return_date_act'), { lang: lang, time: false }, function (datetime) { }),
            return_note: $('textarea#return_note'), // Примечание
            // Кнопка добавить 
            return_open: $('button#return_open').on('click', function () {
                event.preventDefault();
                cars_detali.return_open.prop("disabled", true);
                var valid = cars_detali.validation_outgoing_car_return(false);
                if (valid) {
                    // Подтверждение выполнения операции.
                    dc.dialog_confirm('Open', 'Открыть?', 'Подтвердите выполнение операции «ОТКРЫТЬ ВОЗВРАТ». Вагон будет убран из состава для предъявления и возвращен на путь и открыт для операций перемещения.', function (result) {
                        if (result) {
                            // Выполнить операцию
                            LockScreen(langView('mess_operation', langs));
                            cars_detali.val_outgoing_car_return.clear_all();
                            // Ок, возврат определен
                            // Подготовим операцию
                            var operation_return = {
                                id_outgoing_car: cars_detali.select_id,
                                id_detention_return: cars_detali.ids_inc.ids_dir.getID_Detention_Return_Of_Name(get_input_string_value(cars_detali.cause_return), 'cause', cars_detali.lang),
                                date_start: toISOStringTZ(get_datetime_value(cars_detali.return_start.val(), cars_detali.lang)),
                                num_act: get_input_string_value(cars_detali.return_num_act),
                                date_act: toISOStringTZ(get_date_value(cars_detali.return_date_act.val(), cars_detali.lang)),
                                note: get_input_string_value(cars_detali.return_note),
                                user: cars_detali.user
                            };
                            // Выполним операцию
                            cars_detali.ids_inc.postOpenOutgoingReturn(operation_return, function (result_operation) {
                                if (result_operation > 0) {
                                    cars_detali.val_outgoing_car_return.out_info_message("Операция «ОТКРЫТЬ ВОЗВРАТ» – выполнена!");
                                } else {
                                    // Ошибка выполнения
                                    cars_detali.val_outgoing_car_return.out_error_message("Ошибка выполнения операции «ОТКРЫТЬ ВОЗВРАТ», код ошибки = " + result_operation);
                                    cars_detali.return_open.prop("disabled", false);
                                    LockScreenOff();
                                }
                                // Обновим данные
                                cars_detali.loadOutgoingCarsOfSostav(cars_detali.id_sostav, function (result_sostav) {
                                    cars_detali.return_open.prop("disabled", false);
                                    if (result_sostav) {
                                        // Показать список не отправленных вагонов, отсортировав по позиции
                                        cars_detali.clear(false);            // Очистить все ячейки
                                        cars_detali.set_close_edit();          // Перевести в режим "close" по умолчанию
                                        cars_detali.view_cars_not_outgoing(cars_detali.sostav.OutgoingCars.filter(function (i) { return i.outgoing === null ? true : false; }).sort(function (a, b) { return Number(a.position) - Number(b.position); }));
                                        cars_detali.update_sostav = true;
                                        LockScreenOff();
                                    } else {
                                        cars_detali.alert.out_error_message('В базе данных нет записи по составу с id=' + cars_detali.id_sostav);
                                        LockScreenOff();
                                    }
                                });
                            });
                        } else {
                            cars_detali.return_open.prop("disabled", false);
                            cars_detali.val_outgoing_car_return.out_warning_message("Выполнение операции «Сохранить задержание» - отменено!");
                        }
                    });
                } else {
                    cars_detali.return_open.prop("disabled", false);
                }
            }),
            // Кнопка добавить 
            return_close: $('button#return_close').on('click', function () {
                event.preventDefault();
                cars_detali.return_close.prop("disabled", true);
                var valid = cars_detali.validation_outgoing_car_return(true);
                if (valid) {
                    // Подтверждение выполнения операции.
                    dc.dialog_confirm('Open', 'ЗАКРЫТЬ?', 'Подтвердите выполнение операции «ЗАКРЫТЬ ВОЗВРАТ»', function (result) {
                        if (result) {
                            // Выполнить операцию
                            LockScreen(langView('mess_operation', langs));
                            cars_detali.val_outgoing_car_return.clear_all();
                            if (cars_detali.current_cars_return) {
                                // Ок, возврат определен
                                // Обновим строку
                                car_return = {
                                    id: cars_detali.current_cars_return.id,
                                    num: cars_detali.current_cars_return.num,
                                    id_detention_return: cars_detali.current_cars_return.id_detention_return,
                                    type_detention_return: cars_detali.current_cars_return.type_detention_return,
                                    date_start: cars_detali.current_cars_return.date_start,
                                    date_stop: toISOStringTZ(get_datetime_value(cars_detali.return_stop.val(), cars_detali.lang)),
                                    num_act: get_input_string_value(cars_detali.return_num_act),
                                    date_act: toISOStringTZ(get_date_value(cars_detali.return_date_act.val(), cars_detali.lang)),
                                    note: get_input_string_value(cars_detali.return_note),
                                    create: cars_detali.current_cars_return.create,
                                    create_user: cars_detali.current_cars_return.create_user,
                                    change: toISOStringTZ(new Date()),
                                    change_user: cars_detali.user,
                                };
                                // Выполним операцию
                                cars_detali.ids_inc.putOutgoingDetentionReturn(car_return, function (result_upd) {
                                    if (result_upd > 0) {
                                        cars_detali.val_outgoing_car_return.out_info_message("Операция «ЗАКРЫТЬ ВОЗВРАТ» – выполнена!");
                                    } else {
                                        // Ошибка выполнения
                                        cars_detali.return_close.prop("disabled", false);
                                        cars_detali.val_outgoing_car_return.out_error_message("Ошибка выполнения операции «ЗАКРЫТЬ ВОЗВРАТ», код ошибки = " + result_upd);
                                        LockScreenOff();
                                    }
                                    // Обновим данные
                                    cars_detali.loadOutgoingDetentionReturnOfnum(cars_detali.select_num, function (list_detention_return) {
                                        cars_detali.return_close.prop("disabled", false);
                                        cars_detali.view_cars_return_current(cars_detali.select_num);
                                        LockScreenOff();
                                    });
                                });
                            } else {
                                cars_detali.val_outgoing_car_return.out_error_message("Ошибка выполнения операции «ЗАКРЫТЬ ВОЗВРАТ», cтрока возврата неопределенна!");
                                LockScreenOff();
                            }
                        } else {
                            cars_detali.return_close.prop("disabled", false);
                            cars_detali.val_outgoing_car_return.out_warning_message("Выполнение операции «ЗАКРЫТЬ ВОЗВРАТ» - отменено!");
                        }
                    });
                } else {
                    cars_detali.return_close.prop("disabled", false);
                }
            }),
            // Таблица списка возвратов вогона
            table_return_cars: {
                html_table: $('table#table-return-car'),
                obj: null,
                init: function () {
                    this.obj = this.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": false,
                        "keys": false,
                        select: false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        sScrollX: "100%",
                        scrollX: true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                        },
                        columns: [
                            {
                                data: function (row, type, val, meta) {
                                    var cause_return = cars_detali.ids_inc.ids_dir.getDetention_Return_Of_ID(row.id_detention_return);
                                    return cause_return ? cause_return['cause_' + cars_detali.lang] : null;
                                },
                                title: langView('field_cause_return', langs), width: "150px", orderable: true, searchable: true
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return getReplaceTOfDT(row.date_start);
                                },
                                title: langView('field_return_start', langs), width: "100px", orderable: true, searchable: true
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return getReplaceTOfDT(row.date_stop);
                                },
                                title: langView('field_return_stop', langs), width: "100px", orderable: true, searchable: true
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return row.num_act;
                                },
                                title: langView('field_return_num_act', langs), width: "50px", orderable: true, searchable: true
                            },
                            {
                                data: function (row, type, val, meta) {
                                    return getSupstrTOfDT(row.date_act);
                                },
                                title: langView('field_return_date_act', langs), width: "50px", orderable: true, searchable: true
                            },
                        ]
                    });
                },
                // Показать таблицу с данными
                view: function (data) {
                    cars_detali.table_return_cars.obj.clear();
                    if (data) {
                        cars_detali.table_return_cars.obj.rows.add(data);
                    } else {
                        cars_detali.table_return_cars.obj.rows.add([]);
                    }
                    cars_detali.table_return_cars.obj.draw();
                }
            },

            cargo_name: $('input#cargo_name'), // Наименование груза
            loading_devision_code: $('input#loading_devision_code'), // цех погрузки
            loading_devision: $('input#loading_devision'), // цех погрузки
            owner_name: $('input#owner_name'), // собственник по уз
            operator_name: $('input#operator_name'), // Оператр который выставили на АМКР
            limiting_loading_uz: $('input#limiting_loading_uz'), // Ограничения по УЗ
            limiting_loading_amkr: $('input#limiting_loading_amkr'), // Ограничения по УЗ

            cargo_arrival: $('input#cargo_arrival'), // Груз по прибытию
            cargo_sap: $('input#cargo_sap'), // Материал по прибытию
            date_arrival: $('input#date_arrival'), // Дата прибытия
            gruzp_arrival: $('input#gruzp_arrival'), // Грузоподъемность
            tara_arrival: $('input#tara_arrival'), // Тара
            owner_name_arrival: $('input#owner_name_arrival'), // Владелец прибытие
            operator_name_arrival: $('input#operator_name_arrival'), // Оператор прибытие
            limiting_loading_arrival: $('input#limiting_loading_arrival'), // Ограничение прибытие
            //-------------------------------------------------------------------------------------
            // КОМПОНЕНТЫ РАЗДЕЛА
            //-------------------------------------------------------------------------------------
            // Очистка компонентов раздела "Информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            // Очистить поля элементов вывода информации
            clear_cars_view: function () {
                // Показать кнопку поиска по номеру вагона
                cars_detali.num_car.val('');
                cars_detali.position_outgoing.val('');
                cars_detali.date_outgoing_act.setDateTime(null); // уберем дату
                cars_detali.rod_vag_abbr.val('');
                cars_detali.rod_vag_name.val('');
                cars_detali.adm_kod.val('');
                cars_detali.adm_name.val('');
                cars_detali.num_cont_1.val('');
                cars_detali.num_cont_2.val('');
                cars_detali.loaded_car.prop('checked', false);
                cars_detali.condition_arrival.val('');
                cars_detali.condition_provide.val('');
                cars_detali.reason_discrepancy_amkr.val('');
                cars_detali.reason_discrepancy_uz.val('');
                cars_detali.cargo_name.val('');
                cars_detali.loading_devision_code.val('');
                cars_detali.loading_devision.val('');
                cars_detali.owner_name.val('');
                cars_detali.operator_name.val('');
                cars_detali.limiting_loading_uz.val('');
                cars_detali.limiting_loading_amkr.val('');

                cars_detali.cause_detention.val('');
                cars_detali.detention_start.setDateTime(null); // уберем дату
                cars_detali.detention_stop.setDateTime(null); // уберем дату

                cars_detali.cause_return.val('');
                cars_detali.return_start.setDateTime(null); // уберем дату
                cars_detali.return_stop.setDateTime(null); // уберем дату
                cars_detali.return_num_act.val('');
                cars_detali.return_date_act.setDateTime(null); // уберем дату
                cars_detali.return_note.val('');
                cars_detali.table_return_cars.view(null) // Очистить таблицу возвратов

                cars_detali.cargo_arrival.val('');
                cars_detali.cargo_sap.val('');
                cars_detali.date_arrival.val('');
                cars_detali.gruzp_arrival.val('');
                cars_detali.tara_arrival.val('');
                cars_detali.owner_name_arrival.val('');
                cars_detali.operator_name_arrival.val('');
                cars_detali.limiting_loading_arrival.val('');
            },
            //-------------------------------------------------------------------------------------
            // Обновление компонентов раздела "Информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            // Обновить компонент список причина расхождения АМКР
            update_reason_discrepancy_amkr: function (text) {
                cars_detali.reason_discrepancy_amkr = initAutocomplete(
                    this.reason_discrepancy_amkr,
                    { lang: cars_detali.lang, minLength: 1 },
                    getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_reason_discrepancy_amkr_manual,
                    text
                );
            },
            // Обновить компонент список причина расхождения АМКР
            update_reason_discrepancy_uz: function (text) {
                cars_detali.reason_discrepancy_uz = initAutocomplete(
                    this.reason_discrepancy_uz,
                    { lang: cars_detali.lang, minLength: 1 },
                    getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_reason_discrepancy_uz_manual,
                    text
                );
            },
            // Обновить компонент список грузов
            update_cargo: function (text) {
                cars_detali.cargo_name = initAutocomplete(
                    this.cargo_name,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListCargo('id', 'cargo_name', cars_detali.lang, function (i) { return i.sending; }), 'text'),
                    cars_detali.view_cargo_name_manual,
                    text
                );
            },
            // Обновить компонент цех погрузки
            update_loading_devision: function (text) {
                cars_detali.loading_devision = initAutocomplete(
                    this.loading_devision,
                    { lang: cars_detali.lang, minLength: 1 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListDivisions('code', 'division_abbr', cars_detali.lang, null), 'text'),
                    cars_detali.view_loading_devision_manual,
                    text
                );
            },
            // Обновить компонент причина задержания
            update_cause_detention: function (text) {
                cars_detali.cause_detention = initAutocomplete(
                    this.cause_detention,
                    { lang: cars_detali.lang, minLength: 3 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListDetention_Return('id', 'cause', cars_detali.lang, null), 'text'),
                    cars_detali.view_cause_detention_manual,
                    text
                );
            },
            // Обновить компонент причина возврата
            update_cause_return: function (text) {
                cars_detali.cause_return = initAutocomplete(
                    this.cause_return,
                    { lang: cars_detali.lang, minLength: 3 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListDetention_Return('id', 'cause', cars_detali.lang, null), 'text'),
                    cars_detali.view_cause_return_manual,
                    text
                );
            },
            //-------------------------------------------------------------------------------------
            // Отображение компонентов раздела "Информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            // Показать причинцу расхождения АМКР (ручной режим)
            view_reason_discrepancy_amkr_manual: function (text) {
                cars_detali.view_reason_discrepancy_manual(cars_detali.reason_discrepancy_amkr, text);
            },
            // Показать причинцу расхождения УЗ (ручной режим)
            view_reason_discrepancy_uz_manual: function (text) {
                cars_detali.view_reason_discrepancy_manual(cars_detali.reason_discrepancy_uz, text);
            },
            // Показать причинцу расхождения (ручной режим)
            view_reason_discrepancy_manual: function (inp, text) {
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        cars_detali.val_outgoing_car.set_control_ok(inp, "");
                    } else {
                        cars_detali.val_outgoing_car.set_control_error(inp, "Указанной причины расхождения нет в справочнике ИДС.");
                    }
                }
                inp.val(text);
            },
            // Показать груз 
            view_cargo_name_manual: function (text) {
                var cargo = null;
                if (text) {
                    var objs = cars_detali.ids_inc.ids_dir.getCargo_Of_Name(text, 'cargo_name', cars_detali.lang)
                    if (objs && objs.length > 0) {
                        cargo = objs[0]['cargo_name_' + cars_detali.lang];
                        cars_detali.val_outgoing_car.set_control_ok(cars_detali.cargo_name, "");
                    } else {
                        cars_detali.val_outgoing_car.set_control_error(cars_detali.cargo_name, "Указанного груза нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_outgoing_car.set_control_error(cars_detali.cargo_name, "Не указан груз");
                }
                cars_detali.cargo_name.val(text);
            },
            // Показать цех погрузки вагона
            view_loading_devision_manual: function (text) {
                var code = null;
                if (text) {
                    var objs = cars_detali.ids_inc.ids_dir.getDivisions_Of_Name(text, 'division_abbr', cars_detali.lang)
                    if (objs && objs.length > 0) {
                        code = objs[0].code;
                        cars_detali.val_outgoing_car.set_control_ok(cars_detali.loading_devision_code, "");
                        cars_detali.val_outgoing_car.set_control_ok(cars_detali.loading_devision, "");
                    } else {
                        cars_detali.val_outgoing_car.set_control_error(cars_detali.loading_devision, "Указанного цеха нет в справочнике ИДС.");
                    }
                }
                else {
                    cars_detali.val_outgoing_car.set_control_error(cars_detali.loading_devision_code, "Не указан шифр цеха");
                }
                cars_detali.loading_devision_code.val(code);
                cars_detali.loading_devision.val(text);
                //cars_detali.validation_vag_devision_on_amkr(true, true);

            },
            // Показать причину задержания
            view_cause_detention_manual: function (text) {
                var valid = true;
                if (text) {
                    var objs = cars_detali.ids_inc.ids_dir.getDetention_Return_Of_Name(text, 'cause', cars_detali.lang)
                    if (objs && objs.length > 0) {
                        cars_detali.val_outgoing_car.set_control_ok(cars_detali.cause_detention, "");
                    } else {
                        cars_detali.val_outgoing_car.set_control_error(cars_detali.cause_detention, "Указанной причины задержания нет в справочнике ИДС.");
                        valid = false;
                    }
                }
                cars_detali.cause_detention.val(text);
                return valid;
            },
            // Показать причину возврата
            view_cause_return_manual: function (text) {
                var valid = true;
                if (text) {
                    var objs = cars_detali.ids_inc.ids_dir.getDetention_Return_Of_Name(text, 'cause', cars_detali.lang)
                    if (objs && objs.length > 0) {
                        cars_detali.val_outgoing_car.set_control_ok(cars_detali.cause_return, "");
                    } else {
                        cars_detali.val_outgoing_car.set_control_error(cars_detali.cause_return, "Указанной причины возврата нет в справочнике ИДС.");
                        valid = false;
                    }
                }
                cars_detali.cause_return.val(text);
                return valid;
            },
            // Показать текущий статус вагона по задержанию
            view_cars_detention_current: function (detention) {
                if (detention) {
                    cars_detali.view_cars_detention_buttons(true); // save
                    // Показать причину
                    var dr = detention.Directory_DetentionReturn;
                    cars_detali.view_cause_detention_manual(dr ? dr['cause_' + cars_detali.lang] : null);
                    cars_detali.detention_start.setDateTime(detention.date_start);
                    cars_detali.detention_stop.setDateTime(detention.date_stop);
                } else {
                    cars_detali.view_cars_detention_buttons(false); // edit
                }
            },
            // Отобразить кнопки задержания
            view_cars_detention_buttons: function (save_edit) {
                if (save_edit !== null) {
                    if (save_edit) {
                        // save
                        cars_detali.detention_save.hide();
                        cars_detali.detention_edit.show();
                    } else {
                        // edit
                        cars_detali.detention_save.show();
                        cars_detali.detention_edit.hide();
                    }
                    cars_detali.cause_detention.prop("disabled", save_edit);
                    cars_detali.detention_start.obj.prop("disabled", save_edit);
                    cars_detali.detention_stop.obj.prop("disabled", save_edit);
                } else {
                    cars_detali.detention_save.hide();
                    cars_detali.detention_edit.hide();
                    cars_detali.cause_detention.prop("disabled", true);
                    cars_detali.detention_start.obj.prop("disabled", true);
                    cars_detali.detention_stop.obj.prop("disabled", true);
                }
            },
            // Показать текущий статус вагона по возврату
            view_cars_return_current: function (num) {
                var list_cars_return;
                if (cars_detali.list_detention_return && cars_detali.list_detention_return.length > 0) {
                    // Список есть
                    list_cars_return = cars_detali.list_detention_return.filter(function (i) {
                        return i.type_detention_return === 1;
                    }).sort(function (a, b) {
                        return b.id - a.id;
                    });
                }
                // Отобразить таблицу
                cars_detali.table_return_cars.view(list_cars_return);
                // показать для редактирования
                if (list_cars_return && list_cars_return.length > 0) {
                    var current_cars_return = list_cars_return.find(function (o) {
                        return o.date_stop === null;
                    });
                    cars_detali.current_cars_return = current_cars_return;
                    if (current_cars_return) {
                        cars_detali.view_cars_return_buttons(true);
                        // Показать причину
                        var dr = current_cars_return.Directory_DetentionReturn;
                        cars_detali.view_cause_return_manual(dr ? dr['cause_' + cars_detali.lang] : null);
                        cars_detali.return_start.setDateTime(current_cars_return.date_start);
                        cars_detali.return_stop.setDateTime(current_cars_return.date_stop);
                        cars_detali.return_num_act.val(current_cars_return.num_act);
                        cars_detali.return_date_act.setDateTime(current_cars_return.date_act)
                        cars_detali.return_note.val(current_cars_return.note);
                    } else {
                        cars_detali.view_cause_return_manual(null);
                        cars_detali.return_start.setDateTime(null); // уберем дату
                        cars_detali.return_stop.setDateTime(null); // уберем дату
                        cars_detali.return_num_act.val('');
                        cars_detali.return_date_act.setDateTime(null); // уберем дату
                        cars_detali.return_note.val('');
                        cars_detali.view_cars_return_buttons(false);
                    }
                } else {
                    cars_detali.view_cars_return_buttons(false);
                }
            },
            // Отобразить кнопки возврата
            view_cars_return_buttons: function (open_close) {
                if (open_close !== null) {
                    if (open_close) {
                        // open
                        cars_detali.return_open.hide();
                        cars_detali.return_close.show();
                        //cars_detali.return_stop.obj.prop("disabled", true);
                        cars_detali.return_num_act.prop("disabled", false);
                        cars_detali.return_date_act.obj.prop("disabled", false);
                        cars_detali.return_note.prop("disabled", false);
                    } else {
                        // close
                        cars_detali.return_open.show();
                        cars_detali.return_close.hide();
                        //cars_detali.return_stop.obj.prop("disabled", false);
                        cars_detali.return_num_act.prop("disabled", false);
                        cars_detali.return_date_act.obj.prop("disabled", false);
                        cars_detali.return_note.prop("disabled", false);
                    }
                    cars_detali.cause_return.prop("disabled", open_close);
                    cars_detali.return_start.obj.prop("disabled", open_close);
                    cars_detali.return_stop.obj.prop("disabled", !open_close);

                } else {
                    cars_detali.return_open.hide();
                    cars_detali.return_close.hide();
                    cars_detali.cause_return.prop("disabled", true);
                    cars_detali.return_start.obj.prop("disabled", true);
                    cars_detali.return_stop.obj.prop("disabled", true);
                    cars_detali.return_num_act.prop("disabled", true);
                    cars_detali.return_date_act.obj.prop("disabled", true);
                    cars_detali.return_note.prop("disabled", true);
                }
            },
            // Показать вагон
            view_cars: function (car, wir, wagon_info_uz) {
                cars_detali.set_open_edit();   // Перевести в режим "open-edit"
                cars_detali.clear_cars_view();   // Очистить параметры окна ЭПД
                if (car && wir) {
                    cars_detali.num_car.val(cars_detali.select_num);// Номер вагона
                    cars_detali.position_outgoing.val(car.position);// Позиция
                    // справочник вагонов
                    var dir_wag = wir.Directory_Wagons; // Получим информацию из справочника вагона
                    var wag_current_rent = cars_detali.ids_inc.ids_dir.getCurrentRentOfWagon(dir_wag); // Получим текущую аренду
                    var wag_current_rent_operator = wag_current_rent ? wag_current_rent.Directory_OperatorsWagons : null; // Получим текущего оператора по данным АМКР
                    var wag_current_rent_limiting = wag_current_rent ? wag_current_rent.Directory_LimitingLoading : null; // Получим текущее ограничение по данным АМКР
                    // прибытие вагона
                    var arrival_car = wir.ArrivalCars;  // Получим информацию с прибытия
                    var arrival_uz_vagon = arrival_car ? arrival_car.Arrival_UZ_Vagon : null;  // Получим информацию c документа по прибытию

                    var arrival_sostav = arrival_car ? arrival_car.ArrivalSostav : null;
                    if (arrival_sostav) {
                        // Информация по прибытию есть
                        var date_adoption_wagon = moment(arrival_sostav.date_adoption);
                        var wag_adoption_rent = cars_detali.ids_inc.ids_dir.getCurrentRentOfWagonOfDate(dir_wag, date_adoption_wagon._d); // Получим текущую аренду
                        var wag_adoption_rent_operator = wag_adoption_rent ? wag_adoption_rent.Directory_OperatorsWagons : null; // Получим текущего оператора по данным АМКР
                        var wag_adoption_rent_limiting = wag_adoption_rent ? wag_adoption_rent.Directory_LimitingLoading : null; // Получим текущее ограничение по данным АМКР
                    } else {
                        // Нет информация по прибытию
                    }


                    // последняя операция над вагоном
                    var last_wio = cars_detali.ids_inc.getLastWagonInternalOperationOfWIR(wir);
                    // САП входящая поставка
                    var sap_is = wir.SAPIncomingSupply;

                    // ОСНОВНОЕ ОКНО ------------------------------------------------------
                    cars_detali.car_return.prop("disabled", false);
                    // род вагона
                    var genus = dir_wag !== null ? dir_wag.Directory_GenusWagons : null;
                    if (genus) {
                        cars_detali.rod_vag_abbr.val(genus['abbr_' + cars_detali.lang]);
                        cars_detali.rod_vag_name.val(genus['genus_' + cars_detali.lang]);
                    }
                    // Администрация
                    var countrys = dir_wag !== null ? dir_wag.Directory_Countrys : null;
                    if (countrys) {
                        cars_detali.adm_kod.val(countrys['code_sng']);
                        cars_detali.adm_name.val(countrys['countrys_name_' + cars_detali.lang]);
                    }
                    // Разметка приб
                    var condition_arrival = arrival_uz_vagon !== null ? arrival_uz_vagon.Directory_ConditionArrival : null;
                    if (condition_arrival) {
                        cars_detali.condition_arrival.val(condition_arrival['condition_abbr_' + cars_detali.lang]);
                    }
                    // Разметка выгр
                    var condition_provide = last_wio !== null ? last_wio.Directory_ConditionArrival : null;
                    if (condition_provide) {
                        cars_detali.condition_provide.val(condition_provide['condition_abbr_' + cars_detali.lang]);
                    }
                    // ЗАДЕРЖАНИЕ -------------------------------------------------------------
                    cars_detali.view_cars_detention_current(car.OutgoingDetentionReturn);
                    // ВОЗВРАТ -------------------------------------------------------------
                    cars_detali.view_cars_return_current(cars_detali.select_num);
                    // ДАННЫЕ О ПОГРУЗКЕ -------------------------------------------------------------
                    if (wagon_info_uz) {
                        cars_detali.owner_name.val(wagon_info_uz.owner);// Собственник (по УЗ)
                        cars_detali.limiting_loading_uz.val((wagon_info_uz.exit_ban !== null ? wagon_info_uz.exit_ban + '; ' : '') + (wagon_info_uz.other_bans !== null ? wagon_info_uz.other_bans.replace(/<br>/g, '') : ''));// Ограничения (по УЗ)
                    }
                    if (wag_current_rent_operator) {
                        cars_detali.operator_name.val(wag_current_rent_operator['operators_' + cars_detali.lang]);// Собственник (по УЗ)
                    }
                    if (wag_current_rent_limiting) {
                        cars_detali.limiting_loading_amkr.val(wag_current_rent_limiting['limiting_abbr_' + cars_detali.lang]);// Собственник (по УЗ)
                    }
                    //ЭПД (после принятия УЗ)------------------------------------------------

                    //Данные о прибытии----------------------------------------------------
                    var cargo_arrival = arrival_uz_vagon !== null ? arrival_uz_vagon.Directory_Cargo : null;
                    if (cargo_arrival) {
                        cars_detali.cargo_arrival.val(cargo_arrival['cargo_name_' + cars_detali.lang]);// Собственник (по УЗ)
                    }

                    if (sap_is) {
                        cars_detali.cargo_sap.val(sap_is['MAKTX']);// Материал
                    }
                    if (arrival_sostav) {
                        cars_detali.date_arrival.val(getReplaceTOfDT(arrival_sostav.date_adoption));// принят состав
                    }
                    if (arrival_uz_vagon) {
                        cars_detali.gruzp_arrival.val(arrival_uz_vagon.gruzp);// 
                        cars_detali.tara_arrival.val(arrival_uz_vagon.u_tara);//
                    }
                    var owner = dir_wag !== null ? dir_wag.Directory_OwnersWagons : null;
                    if (owner) {
                        cars_detali.owner_name_arrival.val(owner['owner_' + cars_detali.lang]);// 
                    }

                    if (wag_adoption_rent_operator) {
                        cars_detali.operator_name_arrival.val(wag_adoption_rent_operator['operators_' + cars_detali.lang]);// Собственник (по УЗ)
                    }
                    if (wag_adoption_rent_limiting) {
                        cars_detali.limiting_loading_arrival.val(wag_adoption_rent_limiting['limiting_abbr_' + cars_detali.lang]);// Собственник (по УЗ)
                    }
                }
                LockScreenOff();
            },
            // Очистить все ячейки
            clear: function (message) {
                // Очистить сообщения
                if (message) {
                    // Очистим общие сооьщения
                    cars_detali.alert.clear_message();
                }
                cars_detali.val_outgoing_car.clear_error();
                cars_detali.val_outgoing_car_detention.clear_all();       // Очистить ошибки по задержаниям
                cars_detali.val_outgoing_car_return.clear_all();        // Очистить ошибки по возвратам
                // кнопки 
                cars_detali.detention_save.hide();
                cars_detali.detention_edit.hide();
                cars_detali.return_open.hide();
                cars_detali.return_close.hide();
                // Очистить не принятые вагоны.. ! добавить остальные ячейки
                //cars_detali.select_otpr = null;
                //cars_detali.select_main_otpr = null;
                cars_detali.select_id = null;
                cars_detali.select_num = null;
                //cars_detali.select_otpr_vagon = null;
                //cars_detali.select_otpr_cont = null;
                //cars_detali.select_vagon = null;
                $('div#list-cars-not-outgoing').empty();
                cars_detali.clear_cars_view(); // Очистить ячейки ЭПД
            },
            // СПРАВОЧНИКИ И СПИСКИ *************************************************************************************************************************************************
            //-------------------------------------------------------------------------------------
            // Загрузка справочников(библиотек)
            //-------------------------------------------------------------------------------------
            // Загрузка справочников(библиотек)
            loadReference: function (callback) {
                LockScreen(langView('mess_load', langs));
                var count = 1;
                //cars_detali.ids_inc.load([], ['hazard_class', 'commercial_condition', 'certification_data', 'payer_arrival', 'cargo', 'cargo_gng', 'cargo_etsng', 'cargo_group', 'type_wagons', 'condition_arrival', 'type_owner_ship', 'limiting_loading', 'operators_wagons', 'owners_wagons', 'genus_wagon', 'countrys', 'railway', 'inlandrailway', 'external_station', 'station', 'consignee', 'shipper', 'border_checkpoint', 'divisions'], ['internal_railroad', 'cargo'], false, function () {
                cars_detali.ids_inc.load([], ['station', 'ways', 'reason_discrepancy', 'cargo', 'divisions', 'detention_return'], [], false, function () {
                    count -= 1;
                    if (count === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            },
            // Загрузить вагоны состава
            loadOutgoingCarsOfSostav: function (id_sostav, callback) {
                cars_detali.ids_inc.getOutgoingSostavOfID(id_sostav, function (result_sostav) {
                    // Запомним результат
                    cars_detali.sostav = result_sostav;
                    if (typeof callback === 'function') {
                        callback(result_sostav);
                    }
                });
            },
            // Загрузка задержаний и возвратов по номеру вагона
            loadOutgoingDetentionReturnOfnum: function (num, callback) {
                cars_detali.ids_inc.getOutgoingDetentionReturnOfNum(num, function (list_detention_return) {
                    cars_detali.list_detention_return = list_detention_return; // сохраним список задержаний и возвратов
                    if (typeof callback === 'function') {
                        callback(list_detention_return);
                    }
                });
            },
            //-------------------------------------------------------------------------------------
            // Валидация справочников и списков
            //-------------------------------------------------------------------------------------
            //
            validation_outgoing_car_detention: function () {
                cars_detali.val_outgoing_car_detention.clear_all();
                var valid = true;
                var val_det = cars_detali.val_outgoing_car_detention.checkInputOfNull(cars_detali.cause_detention, "Укажите причину задержания");
                valid = valid & val_det;
                if (val_det) {
                    valid = valid & cars_detali.view_cause_detention_manual(cars_detali.cause_detention.val());
                }
                valid = valid & cars_detali.val_outgoing_car_detention.checkInputOfNull(cars_detali.detention_start.obj, "Укажите время начало задержания");
                valid = valid & cars_detali.val_outgoing_car_detention.checkInputOfNull(cars_detali.detention_stop.obj, "Укажите время конца задержания");
                if (valid) {
                    var start = moment(cars_detali.detention_start.getDateTime());
                    var stop = moment(cars_detali.detention_stop.getDateTime());
                    if (start.isBefore(stop)) {  //|| !start.isSame(stop)
                        valid = valid & true;
                    } else {
                        cars_detali.val_outgoing_car_detention.set_object_error(cars_detali.detention_start.obj, "Время начала должно быть меньше времени конца.");
                        cars_detali.val_outgoing_car_detention.set_object_error(cars_detali.detention_stop.obj, "Время начала должно быть меньше времени конца.");
                        valid = valid & false;
                    }
                }
                return valid;
            },
            // Проверка валидации возврата
            validation_outgoing_car_return: function (close) {
                cars_detali.val_outgoing_car_return.clear_all();
                var valid = true;
                var val_det = cars_detali.val_outgoing_car_return.checkInputOfNull(cars_detali.cause_return, "Укажите причину возврата");
                valid = valid & val_det;
                if (val_det) {
                    valid = valid & cars_detali.view_cause_return_manual(cars_detali.cause_return.val());
                }
                valid = valid & cars_detali.val_outgoing_car_return.checkInputOfNull(cars_detali.return_start.obj, "Укажите время начало возврата");
                valid = valid & cars_detali.val_outgoing_car_return.checkInputOfDateTime_IsNull(cars_detali.return_date_act.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                // Если проверка на закрытие возврата
                if (close) {
                    valid = valid & cars_detali.val_outgoing_car_return.checkInputOfNull(cars_detali.return_stop.obj, "Укажите время конца возврата");
                    if (valid) {
                        var start = moment(cars_detali.return_start.getDateTime());
                        var stop = moment(cars_detali.return_stop.getDateTime());
                        if (start.isBefore(stop)) {  //|| !start.isSame(stop)
                            valid = valid & true;
                        } else {
                            cars_detali.val_outgoing_car_return.set_object_error(cars_detali.return_start.obj, "Время начала должно быть меньше времени конца.");
                            cars_detali.val_outgoing_car_return.set_object_error(cars_detali.return_stop.obj, "Время начала должно быть меньше времени конца.");
                            valid = valid & false;
                        }
                    }
                }
                cars_detali.val_outgoing_car_return.set_control_ok(cars_detali.return_num_act, "");
                cars_detali.val_outgoing_car_return.set_control_ok(cars_detali.return_note, "");
                return valid;
            },
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        // Инициализация
        if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === false && i.exit_uz === true ? true : false; });
        pn_sel.init(list_station);
        //pn_edit_sostav.init(lang, list_station, user_name, function (result) {
        // pn_sel.view(true);
        //});
        cars_detali.init(lang, user_name);
        table_sostav.init();
        pn_sel.view(true);
        LockScreenOff();
        //var sd = window;
    });
});
