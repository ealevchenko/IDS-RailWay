jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num_doc': '№ Ведомости',
                'field_date_readiness_amkr': 'Время готовности на АМКР',
                'field_station_from': 'Стоит на станции',
                'field_way_from': 'Стоит на пути',
                'field_count': 'Кол. вагонов',
                'field_station_on': 'Отправлен на станцию УЗ',
                'field_date_show_wagons': 'Время готовности сдачи',
                'field_date_readiness_uz': 'Время предъявления УЗ',
                'field_date_outgoing': 'Время сдачи на УЗ',
                'field_date_outgoing_act': 'Время сдачи на УЗ (по акту)',
                'field_count_all': 'Отправлено-Осталось вагонов',
                'field_composition_index': 'Индекс поезда',
                'field_note': 'Примечание',
                'field_status': 'Статус',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал',
                'field_change': 'Строка изменена',
                'field_change_user': 'Правил',
                'field_create_sostav': 'Добавил',
                'field_change_sostav': 'Правил',

                //'field_doc_id': 'Ідентифікатор документа у базі АТ «Укрзалізниця»',
                //'field_description': 'Опис документа',
                //'field_doc_date': 'Дата документу',
                //'field_doc_type': 'Код типу супровідного документа',
                //'field_doc_type_name': 'Найменування типу супровідного документу',
                //'field_kod_zd_use': 'Код залізниці вилучення документа',
                //'field_kol': 'Кількість екземплярів',

                'field_carrier_kod': 'Код перевізника',
                'field_carrier_name': 'Скорочене найменування перевізника',
                'field_date_akt': 'Дата складання акту',
                'field_date_dved': 'Дата укладання досильної дорожньої відомості',
                'field_esr_akt': 'ЄСР станції складання акту ',
                'field_stn_name_akt': 'Найменування станції складання акту',
                'field_nom_akt': 'Номер акту',
                'field_nom_dved': 'Номер досильної дорожньої відомості',
                'field_oper_date': 'Дата внесення даних по акту у перевізний документ',
                'field_prichina_akt': 'Причина',
                'field_responsible_person': 'Ім`я особи, відповідальної за внесення данних по акту у перевізний документ',
                'field_ser_dved': 'Серія досильної дорожньої відомості',
                'field_type': 'Тип акту',
                'field_vagon_nom': 'Номер вагону ',
                'field_zd_kod': 'Код залізниці перевантаження',

                'field_nom_cont': 'Номер контейнеру',
                'field_kod_tiporazmer': 'Типорозмір контейнеру',
                'field_gruzp': 'Маса брутто за трафаретом (т)',
                'field_ves_tary_arc': 'Маса тари контейнеру (кг)',
                'field_vesg': 'Вага вантажу нетто (кг)',
                'field_brutto': 'Вага вантажу брутто',
                'field_kod': 'Код платежу ',
                'field_summa': 'Cума платежу (коп.)',
                'field_nom_zpu': 'Номер ЗПП',
                'field_kol_pac': 'Кількість місць упаковки',
                'field_kod_etsng': 'Код вантажу по ЄТСНВ',

                'field_epd_num_doc': 'id-док.',
                'field_epd_revision': '№ рев.',
                'field_epd_status': 'Статус',
                'field_epd_dt': 'Обновлен',
                'field_epd_code_from': 'Грузоотправитель',
                'field_epd_code_on': 'Грузополучатель',
                'field_epd_xml': 'XML',

                'field_epd_car_num': '№ вагона',
                'field_epd_car_operation': 'Будет прим. операц.',
                'field_epd_car_composition_index': 'Индекс состава',
                'field_epd_car_train': 'Поезд',
                'field_epd_sostav_arrival': 'Состав прибыл',
                'field_epd_car_staus': 'Статус состава',
                'field_epd_car_arrival': 'Вагон принят',

                'field_manual_car_num': '№ вагона',
                'field_manual_car_operation': 'Будет прим. операц.',
                'field_manual_car_id_doc_new': 'Найденный id-док',
                'field_manual_car_id_doc_arrival': 'Привязаный id-док',
                'field_manual_car_composition_index': 'Индекс состава',
                'field_manual_car_train': 'Поезд',
                'field_manual_sostav_arrival': 'Состав прибыл',
                'field_manual_car_staus': 'Статус состава',
                'field_manual_car_arrival': 'Вагон принят',

                'field_position_arrival': '№',
                'field_nom_doc_arrival': '№ накл.',
                'field_nom_main_doc_arrival': '№ осн. накл',
                'field_num_arrival': '№ вагона',
                'field_car_countrys_arrival': 'Адм.',
                'field_car_rod_arrival': 'Род',
                'field_gruzp_arrival': 'ГП,т',
                'field_u_tara_arrival': 'Тара,т',
                'field_car_date_rem_uz_arrival': 'Рем. УЗ',
                'field_car_date_rem_vag_arrival': 'Рем. вагон',
                'field_car_owner_arrival': 'Собств.',
                'field_car_operator_arrival': 'Операт.',
                'field_limiting_arrival': 'Огран.',
                'field_car_rent_start_arrival': 'Нач. аренды',

                'field_condition_arrival': 'Разм. по приб.',

                'field_code_stn_from_arrival': 'Код. ст. отпр.',
                'field_name_stn_from_arrival': 'Ст. отпр.',
                'field_code_stn_to_arrival': 'Код. ст. приб.',
                'field_name_stn_to_arrival': 'Ст. приб.',
                'field_code_border_checkpoint_arrival': 'Код. погр. перех',
                'field_name_border_checkpoint_arrival': 'Погр. перех.',
                'field_cross_time_arrival': 'Вр. перех.',
                'field_code_shipper_arrival': 'Код. гру-отпр.',
                'field_name_shipper_arrival': 'Гру-отпр.',
                'field_code_consignee_arrival': 'Код. гру-пол.',
                'field_name_consignee_arrival': 'Гру-пол.',

                'field_code_payer_sender_arrival': 'Код. плат. по отпр.',
                'field_name_payer_sender_arrival': 'Плат. по отпр',
                'field_distance_way_arrival': 'Тар. расс.',

                'field_vesg_arrival': 'Вес,т',
                'field_cargo_arrival': 'Груз',
                'field_car_kol_os_arrival': 'Кол. ос.',
                'field_car_usl_tip_arrival': 'Тип цс',
                'field_station_on_amkr_arrival': 'Следует на ст.',
                'field_division_on_amkr_arrival': 'Цех получатель',


                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',
                //'title_button_add': 'Добавить',
                //'title_button_edit': 'Изменить',
                //'title_button_del': 'Удалить(Отклонить)',
                'title_button_wagon': 'Вагоны',
                'title_button_wagon_accept': 'Отправить вагоны',
                'title_button_wagon_view': 'Показать вагоны',
                'title_arrival_sostav': 'Принять состав',
                'title_return_car': 'Вернуть вагон',

                'mess_searsh_epd': 'Поиск ЭПД ...',
                'mess_searsh_vagon': 'Поиск вагона ...',
                'mess_not_searsh_epd': 'Автоматически ЭПД не найден, попробуйте найти документ по номеру вагона в промежуточной базе данных (воспользовавшись кнопкой поиска справа от поля "№ Вагона") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',
                'mess_not_searsh_epd_vagon': 'Автоматически ЭПД найден но в нем нет выбранного вагона, попробуйте найти документ по номеру вагона в промежуточной базе данных (воспользовавшись кнопкой поиска справа от поля "№ Вагона") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',

                'mess_not_manual_epd': 'В промежуточной базе данных ЭПД не найден, введите данные вручную перейдя в режим "Ручной ввод" (воспользовавшись кнопкой "Правка" справа от поля "№ Вагона" или выбрав грузополучателя не "АМКР") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',
                'mess_arrival_vagon': 'Переношу вагон в базу данных как прибывший ...',
                'mess_clear_vagon': 'Возвращаю вагон в базу данных на подходах ...',
                'mess_print': 'Готовлю документ для печати ...',
            },
            'en':  //default language: English
            {
                'field_train': 'train number',
                'field_composition_index': 'Train index',
                'field_date_arrival': 'Arrival time',
                'field_date_adoption': 'Receive time',
                'field_date_adoption_act': 'Actual reception time',
                'field_station_from': 'Sent from station',
                'field_station_on': 'Received at station',
                'field_way': 'Accepted on the way',
                'field_num_doc': 'Vedomosti No.',
                'field_count': 'Qty. wagons',
                'field_count_all': 'Accepted-Remaining wagons',
                'field_status': 'Status',
                'field_create': 'String created',
                'field_create_user': 'Created',
                'field_change': 'String changed',
                'field_change_user': 'Rules',
                'field_create_sostav': 'Added',
                'field_change_sostav': 'Rules',

                'field_doc_id': 'The identifier of the document at the base of Ukrzaliznytsia AT',
                'field_description': 'Document description',
                'field_doc_date': 'Date to document',
                'field_doc_type': 'Code for type of supra document',
                'field_doc_type_name': 'Name the type of superview document',
                'field_kod_zd_use': 'Code of the document document voucher',
                'field_kol': 'Number of instances',

                'field_carrier_kod': 'Code of the re-collector',
                'field_carrier_name': 'Sooner than the date of transfer',
                'field_date_akt': 'Date of folding act',
                'field_date_dved': 'Date of completion of the road-side vidomosti',
                'field_esr_akt': 'ЄСРstation station folding act',
                'field_stn_name_akt': 'Name of station station statement',
                'field_nom_akt': 'Act number',
                'field_nom_dved': 'The number of the road-side vidomosti',
                'field_oper_date': 'Date of submission of tribute to the act of re-document',
                'field_prichina_akt': 'Reason',
                'field_responsible_person': 'I`m individual, individual for the entry of data on the act of the transferable document',
                'field_ser_dved': 'Seriya dosilnoї road vіdomostі',
                'field_type': 'Act type',
                'field_vagon_nom': 'Wagon number',
                'field_zd_kod': 'Code zaliznitsi re-installation',

                'field_nom_cont': 'Number to container',
                'field_kod_tiporazmer': 'Type for container',
                'field_gruzp': 'Masa gross behind the screen (t)',
                'field_ves_tary_arc': 'Masa tari container (kg)',
                'field_vesg': 'Net wag wantaju (kg)',
                'field_brutto': 'Vaga wantage gross',
                'field_kod': 'Payment code',
                'field_summa': 'Amount to payment (cop.)',
                'field_nom_zpu': 'RFP number',
                'field_kol_pac': 'Number of packages',
                'field_kod_etsng': 'ванTSNV vantage code',

                'field_epd_num_doc': 'id doc.',
                'field_epd_revision': 'rev no.',
                'field_epd_status': 'Status',
                'field_epd_dt': 'Updated',
                'field_epd_code_from': 'Shipper',
                'field_epd_code_on': 'Consignee',
                'field_epd_xml': 'XML',

                'field_epd_car_num': 'wagon number',
                'field_epd_car_operation': 'There will be approx. op. ',
                'field_epd_car_composition_index': 'Composition index',
                'field_epd_car_train': 'Train',
                'field_epd_sostav_arrival': 'Composition has arrived',
                'field_epd_car_staus': 'Composition status',
                'field_epd_car_arrival': 'Wagon accepted',

                'field_manual_car_num': 'wagon number',
                'field_manual_car_operation': 'There will be approx. op. ',
                'field_manual_car_id_doc_new': 'Found id-dock',
                'field_manual_car_id_doc_arrival': 'Bound id-dock',
                'field_manual_car_composition_index': 'Composition index',
                'field_manual_car_train': 'Train',
                'field_manual_sostav_arrival': 'Composition has arrived',
                'field_manual_car_staus': 'Composition status',
                'field_manual_car_arrival': 'Wagon accepted',

                'title_button_buffer': 'Buffer',
                'title_button_excel': 'Excel',
                'title_button_field': 'Fields',
                'title_button_field_all': 'All fields',
                'title_button_add': 'Add',
                'title_button_edit': 'Edit',
                'title_button_del': 'Delete (Reject)',
                'title_button_wagon': 'Wagons',
                'title_button_wagon_accept': 'Take cars',
                'title_button_wagon_view': 'Show cars',

                'mess_searsh_epd': 'Search for EPD ...',
                'mess_searsh_vagon': 'Search for a car ...',
                'mess_not_searsh_epd': 'EPD was not found automatically, try to find the document by car number in the intermediate database (using the search button to the right of the "Car number" field) or get the car number by waybill number (column "EPD information").',
                'mess_not_manual_epd': 'No EPD was found in the intermediate database, enter the data manually by entering the “Manual entry” mode (using the “Edit” button to the right of the “Wagon No.” field or choosing the consignee not “AMKR”) or get the wagon number by number consignment note (column "EPD Details"). ',
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
            ids_inc.load([], ['station', 'ways'], [], false, function () {
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

                ids_inc.getOutgoingSostav(start, stop, function (data) {
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
            html_table: $('table#table-sostav-arrival'),
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
                        { data: "num_doc", title: langView('field_num_doc', langs), width: "50px", orderable: true, searchable: true },
                        { data: "date_readiness_amkr", title: langView('field_date_readiness_amkr', langs), width: "150px", orderable: true, searchable: true },
                        { data: "station_from", title: langView('field_station_from', langs), width: "150px", orderable: true, searchable: true },
                        { data: "way_from", title: langView('field_way_from', langs), width: "150px", orderable: true, searchable: true },
                        { data: "count", title: langView('field_count', langs), width: "50px", orderable: true, searchable: true },
                        { data: "station_on", title: langView('field_station_on', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_show_wagons", title: langView('field_date_show_wagons', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_readiness_uz", title: langView('field_date_readiness_uz', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_outgoing", title: langView('field_date_outgoing', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_outgoing_act", title: langView('field_date_outgoing_act', langs), width: "150px", orderable: true, searchable: true },
                        { data: "count_all", title: langView('field_count_all', langs), width: "50px", orderable: true, searchable: true },
                        { data: "composition_index", title: langView('field_composition_index', langs), width: "150px", orderable: true, searchable: true },
                        { data: "note", title: langView('field_note', langs), width: "150px", orderable: true, searchable: true },
                        //{ data: "status", title: langView('field_status', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create", title: langView('field_create', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create_user", title: langView('field_create_user', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change", title: langView('field_change', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change_user", title: langView('field_change_user', langs), width: "50px", orderable: true, searchable: true },
                        { data: "create_sostav", title: langView('field_create_sostav', langs), width: "150px", orderable: true, searchable: true },
                        { data: "change_sostav", title: langView('field_change_sostav', langs), width: "150px", orderable: true, searchable: true }
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
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
                        {
                            extend: 'colvis',
                            text: langView('title_button_field', langs),
                            collectionLayout: 'fixed two-column',
                            //postfixButtons: ['colvisRestore']
                        },
                        {
                            extend: 'colvisGroup',
                            text: langView('title_button_field_all', langs),
                            show: ':hidden'
                        },
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
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    var rowData = table_sostav.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_sostav.select_sostav = rowData[0];
                        table_sostav.obj.button(4).enable(true);
                        if (table_sostav.select_sostav.status < 1) {
                            //table_sostav.obj.button(5).enable(true);
                            //table_sostav.obj.button(6).enable(true);
                            table_sostav.obj.button(4).text(langView('title_button_wagon_accept', langs));
                        } else {
                            // Если статус в работе принят или удален 
                            //table_sostav.obj.button(5).enable(false);
                            //table_sostav.obj.button(6).enable(false);
                            table_sostav.obj.button(4).text(langView('title_button_wagon_view', langs));
                        }
                    } else {
                        //table_sostav.obj.button(5).enable(false);
                        //table_sostav.obj.button(6).enable(false);
                        table_sostav.obj.button(4).enable(false);
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
                $.each(data, function (i, el) {
                    table_sostav.obj.row.add(table_sostav.get_sostav(el));
                });
                table_sostav.obj.order([1, 'asc']);
                table_sostav.obj.row('#' + id_select).select();
                table_sostav.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_sostav: function (data) {
                var car_outgoing = data.OutgoingCars !== null ? data.OutgoingCars.filter(function (i) {
                    return i.outgoing ? true : false;
                }) : [];
                var car_not_outgoing = data.OutgoingCars !== null ? data.OutgoingCars.filter(function (i) {
                    return !i.outgoing ? true : false;
                }) : [];
                return {
                    "id": data.id,
                    "num_doc": data.num_doc,
                    "id_station_from": data.id_station_from,
                    "station_from": data.id_station_from !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_from, 'station_name', lang) : '',
                    "id_way_from": data.id_way_from,
                    "way_from": data.id_way !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Ways_Of_ID(data.id_way, 'way_num', lang) : '',
                    "id_station_on": data.id_station_on,
                    "station_on": data.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_on, 'station_name', lang) : '',
                    "date_readiness_amkr": data.date_readiness_amkr.replace(/T/g, ' '),
                    "date_show_wagons": data.date_show_wagons !== null ? data.date_show_wagons.replace(/T/g, ' ') : null,
                    "date_readiness_uz": data.date_readiness_uz !== null ? data.date_readiness_uz.replace(/T/g, ' ') : null,
                    "date_outgoing": data.date_outgoing !== null ? data.date_outgoing.replace(/T/g, ' ') : null,
                    "date_outgoing_act": data.date_outgoing_act !== null ? data.date_outgoing_act.replace(/T/g, ' ') : null,
                    "composition_index": data.composition_index,
                    "status": data.status,
                    "note": data.note,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                    "create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null,
                    "count": data.OutgoingCars !== null ? data.OutgoingCars.length : 0,
                    "count_all": (car_outgoing !== null ? car_outgoing.length : 0) + ' - ' + (car_not_outgoing !== null ? car_not_outgoing.length : 0)
                };
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
                table_sostav.obj.button(4).enable(false);
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
        // ОКНО "ПРИНЯТЬ ВАГОНЫ"
        //*************************************************************************************
        cars_detali = {
            // ФУНКЦИИ ОКНА "ПРИНЯТЬ ВАГОНЫ" ****************************************************************************************************************************************
            //---------------------------------------------------------------------------------------------------
            // Основные переменные окна "Принять вагоны"
            //---------------------------------------------------------------------------------------------------
            content: $('.cd-cars-detali'),
            lang: null,
            user: null,
            ids_inc: null,
            id_sostav: null,
            sostav: null,
            alert: null,
            update_sostav: false,                               // Признак обновления состава после закрытия окна
            //-------------------------------------------------------------------------------------
            // Переменные компонентов окна "Принять вагоны"
            //-------------------------------------------------------------------------------------
            sostav_title: $('h1#sostav-title'),
            //-------------------------------------------------------------------------------------
            // Инициализация объектов окна "Принять вагоны"
            //-------------------------------------------------------------------------------------
            // Общая инициализация объектов окна
            init: function (lang, user_name) {
                cars_detali.lang = lang;
                cars_detali.user = user_name;
                // создадим классы
                cars_detali.ids_inc = new IDS_RWT(cars_detali.lang); // Создадим класс IDS_RWT
                cars_detali.alert = new ALERT($('div#car-detali-alert'));// Создадим класс ALERTG
                //
                // Соберем все элементы для валидации принятия вагона в массив 
                cars_detali.all_obj_outgoing_car = $([])
                    //.add(cars_detali.uz_doc_num_doc)
                    //.add(cars_detali.uz_doc_num_osn_doc)
                    //.add(cars_detali.uz_route_stn_from)
                    //.add(cars_detali.uz_route_stn_on)
                    //.add(cars_detali.uz_route_stn_border)
                    //.add(cars_detali.uz_route_border_cross_time.obj)
                    //.add(cars_detali.uz_cargo_client_kod_from)
                    //.add(cars_detali.uz_cargo_client_kod_on)
                    //.add(cars_detali.uz_rask_kod_plat)
                    //.add(cars_detali.uz_rask_distance_way)
                    //// вагон
                    //.add(cars_detali.bt_card_vag_add)
                    //.add(cars_detali.uz_vag_condition_arrival)
                    //.add(cars_detali.uz_vag_type_wagon)
                    //.add(cars_detali.uz_vag_gruzp)
                    //.add(cars_detali.uz_vag_ves_tary_arc)
                    //.add(cars_detali.uz_vag_u_tara)
                    //.add(cars_detali.uz_vag_route)
                    //.add(cars_detali.uz_vag_note)
                    //.add(cars_detali.uz_cargo_kod_etsng)
                    //.add(cars_detali.uz_cargo_kod_gng)
                    //.add(cars_detali.uz_vag_station_on_amkr)
                    //.add(cars_detali.uz_vag_devision_on_amkr_kod)
                    //.add(cars_detali.uz_vag_devision_on_amkr_name)
                    //.add(cars_detali.arrival_cars_position_arrival)
                    //.add(cars_detali.arrival_cars_car_date_adoption_act.obj)
                    ;


                // Валидации
                cars_detali.val_outgoing_car = new VALIDATION(cars_detali.lang, cars_detali.alert_outgoing_car, cars_detali.all_obj_outgoing_car); // Создадим класс VALIDATION
                // Таблицы
                //cars_detali.table_dosc.init();// Инициализация таблицы с документами
                //cars_detali.table_acts.init();// Инициализация таблицы с акт
                //cars_detali.table_cont.init();// Инициализация таблицы с контейнера

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
                //cars_detali.update_list_station_name_from(null);        // Станция отправитель
                //cars_detali.update_list_station_name_on(null);          // Станция получатель
                //cars_detali.update_list_station_border(null);           // Пограничный пункт
                //cars_detali.update_list_consignee(null);                // Грузополучатели
                //cars_detali.update_list_shipper(null);                  // Грузопоотправитель
                //cars_detali.update_list_station_on_amkr(-1);            // Станция АМКР
                ////cars_detali.update_list_devision_on_amkr(-1);           // Цеха АМКР
                //cars_detali.update_list_devision_on_amkr(null);           // Цеха АМКР
                //cars_detali.update_list_adm(-1);                        // Администрации
                //cars_detali.update_list_rod(null);                      // Род вагона
                //cars_detali.update_list_owner(null);                    // Владелец вагона
                //cars_detali.update_list_operator(null);                 // Оператор вагона
                //cars_detali.update_list_kol_os(0);                      // Количество осей
                //cars_detali.update_list_limiting_loading(null);         // Ограничение погрузки
                //cars_detali.update_list_type_ownership(-1);             // Признак собственности
                //cars_detali.update_list_condition_arrival(-1);          // Годность по прибытию
                //cars_detali.update_list_type_wagon(-1);                 // Тип вагона
                //cars_detali.update_list_name_plat(null);                // Плательщик по прибытию
                //cars_detali.update_list_cargo_etsng(null);              // Грузы ЕТ СНГ
                //cars_detali.update_list_cargo_gng(null);                // Грузы ЕТ ГНГ
                //cars_detali.update_list_certificate_data(-1);           // сертификационные данные
                //cars_detali.update_list_commercial_condition(-1);       // комерчиское состояние
                //cars_detali.update_list_danger_name(-1);                // класс опасности
            },
            //-------------------------------------------------------------------------------------
            // Управление режимами и состоянием окна "Принять вагоны"
            //-------------------------------------------------------------------------------------
            // Возвращает свойство "редактирование разрешено" - true, запрещено -false
            is_edit_mode_of_element: function (el) {
                var res = $(el).attr('data-edit') === 'open' || $(el).attr('data-edit') === '' ? true : false;
                return res;
            },
            //
            is_edit_mode_of_vagon_element: function (el) {
                if ($(el).attr('data-type') !== 'vagon-card') {
                    //var s = "w";
                }
                var res = $(el).attr('data-type') !== 'vagon-card' || $(el).attr('data-type') === 'vagon-card' && (!cars_detali.select_vagon);
                return res;
            },
            // Устоновить режим эементов (false-view; true-edit)
            set_mode: function (mode) {
                if (mode)
                    cars_detali.clear_button_add();
                cars_detali.car_status = (mode ? 2 : 1);
                $('[data-mode]').each(function (i, el) {
                    //var edit = $(el).attr('data-edit');
                    switch ($(el).attr('data-mode')) {
                        case 'all': {
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.is_edit_mode_of_vagon_element(el)) { $(el).prop("disabled", !mode); }
                            else { $(el).prop("disabled", true); }
                            break;
                        }
                        case 'view': {
                            $(el).prop("disabled", true);
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.is_edit_mode_of_vagon_element(el)) { if (!mode) { $(el).show(); } else { $(el).hide(); } }
                            else { $(el).show(); }
                            break;
                        }
                        case 'view-global': {
                            $(el).prop("disabled", true);
                            break;
                        }
                        case 'edit': {
                            $(el).prop("disabled", false);
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.is_edit_mode_of_vagon_element(el)) { if (mode) { $(el).show(); } else { $(el).hide(); } }
                            else { $(el).hide(); }
                            break;
                        }
                        case 'edit-global': {
                            // Глобальный элемент для редактирования (не активный только когда - close)
                            //$(el).show(); убрал иза элемента bootstrap-input-spinner (он скрыт), можно добавить атрибут этого элемента и тогда пропускать
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.is_edit_mode_of_vagon_element(el)) { $(el).prop("disabled", false); }
                            else { $(el).prop("disabled", true); }
                            break;
                        }
                    }
                });

            },
            // Устоновить режим эементов карточки вагонов (false-view; true-edit)
            set_mode_vagon_card: function (enable) {
                $('[data-type="vagon-card"]').each(function (i, el) {
                    cars_detali.car_status
                    cars_detali.select_vagon_mode = enable; // установить режим вывода вагона
                    switch ($(el).attr('data-mode')) {
                        case 'all': {
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.car_status > 0) { $(el).prop("disabled", !enable); }
                            else { $(el).prop("disabled", true); }
                            break;
                        }
                        case 'view': {
                            $(el).prop("disabled", true);
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.car_status > 0) { if (!enable) { $(el).show(); } else { $(el).hide(); } }
                            else { $(el).show(); }
                            break;
                        }
                        case 'view-global': {
                            $(el).prop("disabled", true);
                            break;
                        }
                        case 'edit': {
                            if (cars_detali.car_status === 2)
                                $(el).prop("disabled", !enable);
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.car_status > 0) { if (enable) { $(el).show(); } else { $(el).hide(); } }
                            else { $(el).hide(); }
                            break;
                        }
                        case 'edit-global': {
                            // Глобальный элемент для редактирования (не активный только когда - close)
                            //$(el).show(); убрал иза элемента bootstrap-input-spinner (он скрыт), можно добавить атрибут этого элемента и тогда пропускать
                            if (cars_detali.is_edit_mode_of_element(el) && cars_detali.car_status > 0) { $(el).prop("disabled", false); }
                            else { $(el).prop("disabled", true); }
                            break;
                        }
                    }
                });
            },
            // Закрыть элементы для редактирования (вагон принят)
            set_open_edit: function () {
                // Выполнить если состав определен и статус <2
                if (cars_detali.sostav && cars_detali.sostav.status < 2) {
                    $('[data-form="transceiver"]').each(function (i, el) {
                        $(el).attr('data-edit', 'open');
                        cars_detali.set_mode(false);
                    });
                }
            },
            // Открыть элементы для редактирования (вагон новый или принемается)
            set_close_edit: function () {
                $('[data-form="transceiver"]').each(function (i, el) {
                    $(el).attr('data-edit', 'close');
                });
                cars_detali.set_mode(false);
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
                    cars_detali.ids_inc.getOutgoingSostavOfID(cars_detali.id_sostav, function (result_sostav) {
                        cars_detali.sostav = result_sostav;
                        // Покаать информацию по составу
                        cars_detali.sostav_title.text('Информация по составу (№ Накладной :' + cars_detali.sostav.num_doc + ', время готовности по АМКР:' + (cars_detali.sostav.date_readiness_amkr ? cars_detali.sostav.date_readiness_amkr.replace(/T/g, ' ') : null) + ')');
                        // Загрузим списочные компоненты
                        cars_detali.init_select();
                        // Показать список не принятых вагонов
                        cars_detali.view_cars_not_outgoing(cars_detali.sostav.OutgoingCars.filter(function (i) { return i.outgoing === null ? true : false; }).sort(function (a, b) { return Number(a.position) - Number(b.position); }));
                        // Показать список принятых вагонов
                        //cars_detali.table_arrival_cars.view(cars_detali.sostav.ArrivalCars.filter(function (i) { return i.arrival !== null ? true : false; }).sort(function (a, b) { return Number(a.position_arrival) - Number(b.position_arrival); }));
                        // Показать страницу детально
                        cars_detali.content.addClass('is-visible');
                        LockScreenOff();
                    });
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
            // Показать не принятые вагоны
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
                    //LockScreen(langView('mess_searsh_epd', langs));
                    cars_detali.alert.clear_message();
                    cars_detali.val_outgoing_car.clear_all(); // Очистить ошибки если принимали вагон, с ошибкой

                    //cars_detali.ids_inc.getArrivalCarsOfID(id, function (car) {
                    //    if (car !== null) {
                    //        cars_detali.select_id = car.id; // Сохраним id вагона
                    //        // Если есть вагон найти и ЭПД документ
                    //        cars_detali.ids_inc.getOTPR_UZ_DOCOfNum(car.num_doc, function (result_otpr) {
                    //            if (result_otpr === null) {
                    //                // Документа нет пишим сообщение
                    //                cars_detali.alert.out_warning_message(langView('mess_not_searsh_epd', langs));
                    //            }
                    //            cars_detali.view_cars_epd(car.num, result_otpr);
                    //            //LockScreenOff();
                    //        });
                    //    } else {
                    //        cars_detali.alert.out_error_message('Запись по вагону id:' + id + ' - не найдена!');
                    //        LockScreenOff();
                    //    }
                    //});
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
            select_num: null,                                   // Выбранный вагон
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
            val_outgoing_car: null,                              // класс валидации val_arrival_car
            alert_outgoing_car: $('div#car-detali-alert'),       // класс сообщений alert_arrival_car
            all_obj_outgoing_car: null,                          // массив всех элементов валидации all_obj_outgoingl_car
            //-------------------------------------------------------------------------------------
            // КОМПОНЕНТЫ РАЗДЕЛА
            //-------------------------------------------------------------------------------------
            // Очистка компонентов раздела "Информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            // Очистить все ячейки
            clear: function (message) {
                // Очистить сообщения
                if (message) {
                    cars_detali.alert.clear_message();
                }
                cars_detali.val_outgoing_car.clear_error();
                // Очистить не принятые вагоны.. ! добавить остальные ячейки
                cars_detali.select_otpr = null;
                cars_detali.select_main_otpr = null;
                cars_detali.select_id = null;
                cars_detali.select_num = null;
                cars_detali.select_otpr_vagon = null;
                cars_detali.select_otpr_cont = null;
                cars_detali.select_vagon = null;
                $('div#list-cars-not-outgoing').empty();
                //cars_detali.clear_cars_epd(); // Очистить ячейки ЭПД
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
                cars_detali.ids_inc.load([], [], [], false, function () {
                    count -= 1;
                    if (count === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
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
    });
});
