jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num': '№ вагона',
                'field_train': '№ поезда',
                'field_composition_index': 'Индекс поезда',
                'field_date_arrival': 'Время прибытия',
                'field_date_adoption': 'Время приема',
                'field_date_adoption_act': 'Время приема по акту',
                'field_station_from': 'Отправлено со станции',
                'field_station_on': 'Принят на станцию',
                'field_way': 'Принят на путь',
                'field_doc_uz': '№ накладной УЗ',
                'field_status': 'Статус',
                'field_note': 'Примечание',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал строку',
                'field_change': 'Строку правили',
                'field_change_user': 'Правил',
                'field_create_sostav': 'Добавил',
                'field_change_sostav': 'Правил',
            },
            'en':  //default language: English
            {
                'field_num': '',
            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        alert = new ALERT($('div#main-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
        num_wagon = $('input#num_wagon').val(''),
        bt_search_wagon = $('button#bt_search_wagon').on('click', function (event) {
            event.preventDefault();
            search_wagon();
        }),
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
        // Найти вагон
        search_wagon = function () {
            alert.clear_message();
            LockScreen(langView('mess_delay', langs));
            bt_search_wagon.prop("disabled", true);
            var num = num_wagon.val();
            if (!isNumeric(num) || !is_valid_num_wagon(num)) {
                // Ошибка ввода
                alert.out_error_message('Ошибка, введен неправильный номер :' + num);
                bt_search_wagon.prop("disabled", false);
                LockScreenOff();
            } else {
                // Ок, начинаем поиск
                ids_inc.getArrivalCarsOfNum(num, function (list_arrival_cars) {
                    table_arrival_wagon.view(list_arrival_cars);
                    bt_search_wagon.prop("disabled", false);
                    LockScreenOff();
                });
            }

        },
        // Таблица вагоны на подходах
        table_arrival_wagon = {
            html_table: $('table#table_arrival_wagon'),
            obj: null,
            select_string: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: false,
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    sScrollX: "100%",
                    scrollX: true,
                    //"responsive": true,
                    //"bAutoWidth": false,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                    },
                    columns: [
                        {
                            targets: 0,
                            data: null,
                            defaultContent: '<button type="button" class="btn btn-primary btn-sm">Показать</button>',
                            orderable: false,
                            //className: 'select-checkbox',
                            width: "50px"
                        },
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: false, searchable: true },
                        { data: "train", title: langView('field_train', langs), width: "50px", orderable: false, searchable: true },
                        { data: "composition_index", title: langView('field_composition_index', langs), width: "150px", orderable: false, searchable: true },
                        { data: "date_arrival", title: langView('field_date_arrival', langs), width: "150px", orderable: true, searchable: false },
                        { data: "date_adoption", title: langView('field_date_adoption', langs), width: "150px", orderable: false, searchable: false },
                        { data: "date_adoption_act", title: langView('field_date_adoption_act', langs), width: "150px", orderable: false, searchable: false },
                        { data: "station_from", title: langView('field_station_from', langs), width: "150px", orderable: false, searchable: true },
                        { data: "station_on", title: langView('field_station_on', langs), width: "150px", orderable: false, searchable: true },
                        { data: "id_way", title: langView('field_way', langs), width: "150px", orderable: false, searchable: false },
                        { data: "status_name", title: langView('field_status', langs), width: "100px", orderable: false, searchable: true },
                        { data: "doc_uz", title: langView('field_doc_uz', langs), width: "50px", orderable: false, searchable: true },
                        { data: "note", title: langView('field_note', langs), width: "300px", orderable: false, searchable: false },
                        //{
                        //    data: "create", title: langView('field_create', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "create_user", title: langView('field_create_user', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "change", title: langView('field_change', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "change_user", title: langView('field_change_user', langs), width: "100px", orderable: false, searchable: false
                        //},
                        { data: "create_sostav", title: langView('field_create_sostav', langs), width: "150px", orderable: false, searchable: false },
                        { data: "change_sostav", title: langView('field_change_sostav', langs), width: "150px", orderable: false, searchable: false }
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
                            sheetName: 'По прибытию',
                            messageTop: function () {
                                return '';
                            }
                        },
                        {
                            extend: 'pageLength',
                        }
                    ]
                });
                // Обработка события нажатия на кнопку
                this.html_table.find('tbody').on('tbody click', 'button', function () {
                    var data = table_arrival_wagon.obj.row($(this).parents('tr')).data();
                    window.open(url_incoming+'?id_arrival='+ data.id_arrival + '&arrival='+data.date_arrival, '','');

                });
            },
            // Отобразить кнопки редактирования таблицы
            view_button: function (indexes) {
                var items = table_arrival_wagon.obj.rows({ selected: true });
                table_arrival_wagon.select_string = items && items.count() === 1 ? table_arrival_wagon.obj.rows(items[0]).data()[0] : null;

            },
            // Показать таблицу с данными
            view: function (data) {
                var id_select = table_arrival_wagon.select_string ? table_arrival_wagon.select_string.id : 0;
                table_arrival_wagon.obj.clear();
                // Сбросить выделенный состав
                table_arrival_wagon.deselect();
                $.each(data, function (i, el) {
                    table_arrival_wagon.obj.row.add(table_arrival_wagon.get_string(el));
                });
                if (table_arrival_wagon.count_string === 1) {
                    table_arrival_wagon.obj.row('#' + id_select).select();
                }
                table_arrival_wagon.obj.order([4, 'desc']);
                table_arrival_wagon.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_string: function (data) {
                var sostav = data.ArrivalSostav ? data.ArrivalSostav : null;
                var doc = data.UZ_DOC ? data.UZ_DOC : null;
                //var corrent_rent = ids_dir.getCurrentRentOfWagon(data);
                //var countrys = data ? data.Directory_Countrys : null;
                //var genus = data ? data.Directory_GenusWagons : null;
                //var owner = data ? data.Directory_OwnersWagons : null;
                //var operator_uz = data ? data.Directory_OperatorsWagons : null;
                //var type_ownership = data ? data.Directory_TypeOwnerShip : null;
                //var operator = corrent_rent ? corrent_rent.Directory_OperatorsWagons : null;
                //var limiting = corrent_rent ? corrent_rent.Directory_LimitingLoading : null;

                return {
                    "id": data.id,
                    "id_arrival": data.id_arrival,
                    "num": data.num,
                    "train": sostav ? sostav.train : null,
                    "composition_index": sostav ? sostav.composition_index : null,
                    "date_arrival": sostav ? sostav.date_arrival.replace(/T/g, ' ') : null,
                    "date_adoption": sostav && sostav.date_adoption !== null? sostav.date_adoption.replace(/T/g, ' ') : null,
                    "date_adoption_act": sostav && sostav.date_adoption_act !== null ? sostav.date_adoption_act.replace(/T/g, ' ') : null,
                    "id_station_from": sostav ? sostav.id_station_from : null,
                    "station_from": sostav && sostav.id_station_from !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(sostav.id_station_from, 'station_name', lang) : '',
                    "id_station_on": sostav ? sostav.id_station_on : null,
                    "station_on": sostav && sostav.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(sostav.id_station_on, 'station_name', lang) : '',
                    "id_way": sostav && sostav.id_way !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Ways_Of_ID(sostav.id_way, 'way_num', lang) : '',
                    "status": sostav ? sostav.status : null,
                    "status_name": sostav ? outStatusArrivalSostav(sostav.status) : null,
                    "position": data.position,
                    "position_arrival": data.position_arrival,
                    "consignee": data.consignee,
                    "num_doc": data.num_doc,
                    "id_transfer": data.id_transfer,
                    "note": data.note,
                    "date_adoption_act": data.date_adoption_act !== null ? data.date_adoption_act.replace(/T/g, ' ') : null,
                    "doc_uz" : doc ? doc.num_uz : null,
                    "id_arrival_uz_vagon": data.id_arrival_uz_vagon,
                    "arrival": data.arrival !== null ? data.arrival.replace(/T/g, ' ') : null,
                    "arrival_user": data.arrival_user,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                    "create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
                    //"ArrivalSostav": { "id": 42298, "id_arrived": 3852, "id_sostav": 51377, "train": 3553, "composition_index": "4671-561-4670", "date_arrival": "2020-08-30T05:20:00", "date_adoption": "2020-08-30T06:40:00", "date_adoption_act": null, "id_station_from": 16, "id_station_on": 6, "id_way": 108, "numeration": false, "num_doc": 69, "count": 57, "status": 2, "note": null, "create": "2020-08-30T06:45:54.847", "create_user": "EUROPE\\krr-svc-RailWay", "change": "2020-08-30T12:11:23.843", "change_user": "EUROPE\\lssmelskaya", "Arrival_UZ_Vagon": [ ], "ArrivalCars": [ ], "Directory_Station": { "id": 16, "station_name_ru": "Кривой Рог- Главный", "station_name_en": "Kryvyi Rih - Main", "station_abbr_ru": "Кривой Рог- Глав.", "station_abbr_en": "Kryvyi Rih - Main", "exit_uz": false, "station_uz": true, "default_side": null, "code": 467004, "Arrival_UZ_Vagon": null, "ArrivalSostav": null, "ArrivalSostav1": null, "Directory_Ways": null, "OutgoingSostav": [ ], "OutgoingSostav1": [ ] }, "Directory_Station1": { "id": 6, "station_name_ru": "Восточная-Приемоотправочная", "station_name_en": "East Pickup", "station_abbr_ru": "ВП", "station_abbr_en": "East Pickup", "exit_uz": true, "station_uz": false, "default_side": true, "code": null, "Arrival_UZ_Vagon": null, "ArrivalSostav": null, "ArrivalSostav1": null, "Directory_Ways": null, "OutgoingSostav": [ ], "OutgoingSostav1": [ ] }, "Directory_Ways": { "id": 108, "id_station": 6, "id_park": 68, "position": 5, "way_num_ru": "5", "way_num_en": "5", "way_name_ru": "Приемоотправочный", "way_name_en": "Приемоотправочный", "capacity": 56, "deadlock": null, "crossing_uz": true, "crossing_amkr": true, "id_devision": null, "note": "", "create": "2020-06-11T08:00:00", "create_user": "EUROPE\\ealevchenko", "change": null, "change_user": null, "ArrivalSostav": null, "Directory_Divisions": null, "Directory_ParkWay": { "id": 68, "park_name_ru": "Приёмо-отправочный парк", "park_name_en": "Приёмо-отправочный парк", "create": "2020-06-11T08:00:00", "create_user": "EUROPE\\ealevchenko", "change": null, "change_user": null, "Directory_Ways": null }, "Directory_Station": { "id": 6, "station_name_ru": "Восточная-Приемоотправочная", "station_name_en": "East Pickup", "station_abbr_ru": "ВП", "station_abbr_en": "East Pickup", "exit_uz": true, "station_uz": false, "default_side": true, "code": null, "Arrival_UZ_Vagon": null, "ArrivalSostav": null, "ArrivalSostav1": null, "Directory_Ways": null, "OutgoingSostav": [ ], "OutgoingSostav1": [ ] }, "OutgoingSostav": [ ] } },
                    //"UZ_DOC": { "num_doc": "72738745", "revision": 412381574, "status": 6, "num_uz": 32949000, "code_from": "8814", "code_on": "7932", "dt": "2020-08-13T21:22:36.88", "xml_doc": "<uz-rwc-doc xmlns=\"uz:rwc:document:1.11\"><document-data><uz-rwc-doc><document-data><uz-rwc-doc><document-data><OTPR xmlns=\"uz:rwc:document:project:1.11\" country_nazn=\"804\" country_otpr=\"804\" doc_lang=\"de\" kod_doc=\"90\" pr_locom=\"0\" rab_esr=\"86\" speed=\"2\" vid=\"6\"><CLIENT adress=\"м. Київ вул. Січових Стрільців, 37/41, офіс 9\" kod=\"8814\" name=\"ТОВ &quot;АТЛАНТ КАПІТАЛ&quot;\" okpo=\"41317440\" representative_pib=\"Шинкарьов Олексій Анатолійович\" type=\"1\" /><CLIENT adress=\"50095, Дніпропетровська обл., м. Кривий Ріг, вул. Орджонікідзе, буд. 1\" kod=\"7932\" name=\"ПАТ &quot;АРСЕЛОРМІТТАЛ КРИВИЙ РІГ&quot;\" okpo=\"24432974\" type=\"2\" /><PL kod_plat=\"8211220\" name_plat=\"ТОВ &quot;АТЛАНТ КАПІТАЛ&quot;\" type=\"0\" /><ROUTE index=\"0\" name_from=\"Березань\" name_to=\"Кривой Рог-Главный\" rw_from=\"22\" rw_to=\"22\" stn_from=\"322801\" stn_to=\"467004\" zd_nazn=\"22\" zd_otpr=\"22\" /><SHTEMPEL column_num=\"20\" info_sht=\"Порожній власний вагон. З-під Шлаки гранулированные(271008). Власник АО «ТАСКОМБАНК».Оператор  ТОВ «АТЛАНТ КАПІТАЛ»\" nom_sht=\"628\" /><SHTEMPEL column_num=\"20\" info_sht=\"Направляється до пункту навантаження\" nom_sht=\"615\" /><SHTEMPEL column_num=\"19\" info_sht=\"Загальна кількість вагонів -  2. Дивись відомість.\" nom_sht=\"708\" /><SPEC_COND code=\"11\" /><TEXT create_place=\"Березань\" /><VAGON etsng_old=\"271008\" gruzp=\"70.0\" kod_adm=\"22\" kol_os=\"4\" name_firm_operator=\"ТОВ «АТЛАНТ КАПІТАЛ»\" name_firm_owner=\"АО «ТАСКОМБАНК»\" nomer=\"63447635\" pr_sobst=\"1\" rod_vag=\"60\" use=\"0\" ves_tary_arc=\"23500\"><COLLECT_V kod_etsng=\"421034\" name_etsng=\"Вагоны железнодорожные, перевозимые на своих осях, не поименованные в алфавите\" /></VAGON><VAGON etsng_old=\"271008\" gruzp=\"70.0\" kod_adm=\"22\" kol_os=\"4\" name_firm_operator=\"ТОВ «АТЛАНТ КАПІТАЛ»\" name_firm_owner=\"АО «ТАСКОМБАНК»\" nomer=\"63303077\" pr_sobst=\"1\" rod_vag=\"60\" use=\"0\" ves_tary_arc=\"23500\"><COLLECT_V kod_etsng=\"421034\" name_etsng=\"Вагоны железнодорожные, перевозимые на своих осях, не поименованные в алфавите\" /></VAGON></OTPR></document-data><signature>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</signature></uz-rwc-doc><changes xmlns=\"uz:rwc:document:accepted:1.11\"><delete target=\"OTPR\"><OTPR pr_locom=\"0\" /></delete><update target=\"OTPR\"><OTPR date_otpr=\"25.08.2020 11:20:00\" distance_way=\"531\" nom_doc=\"32949000\" nom_plan=\"984566\" osum=\"340900\" srok_end=\"30.08.2020 00:00:00\" type_pay=\"0\" /></update><insert target=\"OTPR/PL[1]/PAY[1]\"><PAY currency=\"980\" kod=\"001\" pr_avt=\"1\" summa=\"340900\" /></insert><delete target=\"OTPR/ROUTE[1]\"><ROUTE zd_nazn=\"22\" zd_otpr=\"22\" /></delete><insert target=\"OTPR/SCHEMA[1]\"><SCHEMA carry_sch=\"14.1\" pr_sch=\"2\" /></insert><insert target=\"OTPR/TAKS[1]\"><TAKS coeff_mode=\"2\" coeff_value=\"1.2420\" iskl_mode=\"2\" iskl_tar=\"2004\" /></insert><delete target=\"OTPR/TEXT[1]\"><TEXT create_place=\"Березань\" /></delete><update target=\"OTPR/TEXT[1]\"><TEXT name_tov=\"Дмитренко Валентина Іванівна\" /></update><update target=\"OTPR/VAGON[1]\"><VAGON calc_weight=\"0\" /></update><insert target=\"OTPR/VAGON[1]/PAY_V[1]\"><PAY_V kod=\"001\" summa=\"170450\" /></insert><update target=\"OTPR/VAGON[2]\"><VAGON calc_weight=\"0\" /></update><insert target=\"OTPR/VAGON[2]/PAY_V[1]\"><PAY_V kod=\"001\" summa=\"170450\" /></insert></changes></document-data><signature>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</signature></uz-rwc-doc><changes xmlns=\"uz:rwc:document:arrived:1.11\"><update target=\"OTPR\"><OTPR date_grpol=\"30.08.2020 06:34:00\" date_pr=\"30.08.2020 05:20:00\" /></update></changes></document-data><signature>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</signature></uz-rwc-doc>", "ArrivalCars": [ ], "Arrival_UZ_Document": [ ] },
                    //"Arrival_UZ_Vagon": null



                    //"id": data.id,
                    //"num": data.num,
                    //"id_countrys": data.id_countrys,
                    //"countrys": countrys ? ids_dir.getValueObj(countrys, 'country_abbr', lang) : '',
                    //"id_genus": data.id_genus,
                    //"genus": genus ? ids_dir.getValueObj(genus, 'abbr', lang) : '',
                    //"id_owner": data.id_owner,
                    //"owner": owner ? ids_dir.getValueObj(owner, 'owner', lang) : '',
                    //"id_operator_uz": data.id_operator_uz,
                    //"change_operator": data.change_operator !== null ? data.change_operator.replace(/T/g, ' ') : null,
                    //"operator_uz": operator_uz ? ids_dir.getValueObj(operator_uz, 'operators', lang) : '',
                    //"bit_warning": data.bit_warning,
                    //"id_operator": corrent_rent ? corrent_rent.id_operator : null,
                    //"operator": operator ? ids_dir.getValueObj(operator, 'operators', lang) : '',
                    //"gruzp": data.gruzp,
                    //"tara": data.tara,
                    //"kol_os": data.kol_os,
                    //"usl_tip": data.usl_tip,
                    //"date_rem_uz": data.date_rem_uz !== null ? data.date_rem_uz.replace(/T/g, ' ') : null,
                    //"date_rem_vag": data.date_rem_vag !== null ? data.date_rem_vag.replace(/T/g, ' ') : null,
                    //"id_limiting": corrent_rent ? corrent_rent.id_limiting : null,
                    //"limiting": limiting ? ids_dir.getValueObj(limiting, 'limiting_abbr', lang) : '',
                    //"id_type_ownership": data.id_type_ownership,
                    //"type_ownership": type_ownership ? ids_dir.getValueObj(type_ownership, 'type_ownership', lang) : '',
                    //"rent_start": corrent_rent && corrent_rent.rent_start !== null ? corrent_rent.rent_start.replace(/T/g, ' ') : null,
                    //"rent_end": corrent_rent && corrent_rent.rent_end !== null ? corrent_rent.rent_end.replace(/T/g, ' ') : null,
                    //"sign": data.sign,
                    //"note": data.note,
                    //"sobstv_kis": data.sobstv_kis,
                    //"create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    //"create_user": data.create_user,
                    //"change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    //"change_user": data.change_user,
                };
            },
            // Deselect
            deselect: function () {
                table_arrival_wagon.select_string = null;
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        table_arrival_wagon.init();
        var num = getUrlVar('num');
        if (num) {
            num_wagon.val(num);
            search_wagon();
        }


        LockScreenOff();
    });

});