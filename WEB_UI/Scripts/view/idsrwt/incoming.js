jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_train': '№ поезда',
            'field_composition_index': 'Индекс поезда',
            'field_date_arrival': 'Время прибытия',
            'field_date_adoption': 'Время приема',
            'field_date_adoption_act': 'Время приема по акту',
            'field_station_from': 'Отправлено со станции',
            'field_station_on': 'Принят на станцию',
            'field_way': 'Принят на путь',
            'field_num_doc': '№ Ведомости',
            'field_count': 'Кол. вагонов',
            'field_count_all': 'Принято-Осталось вагонов',
            'field_status': 'Статус',
            'field_create': 'Строка создана',
            'field_create_user': 'Создал',
            'field_change': 'Строка изменена',
            'field_change_user': 'Правил',
            'field_create_sostav': 'Добавил',
            'field_change_sostav': 'Правил',

            'field_doc_id': 'Ідентифікатор документа у базі АТ «Укрзалізниця»',
            'field_description': 'Опис документа',
            'field_doc_date': 'Дата документу',
            'field_doc_type': 'Код типу супровідного документа',
            'field_doc_type_name': 'Найменування типу супровідного документу',
            'field_kod_zd_use': 'Код залізниці вилучення документа',
            'field_kol': 'Кількість екземплярів',

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


            //'title_button_buffer': 'Буфер',
            //'title_button_excel': 'Excel',

            //'title_button_field': 'Поля',
            //'title_button_field_all': 'Все поля',
            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_field': 'Поля',
            'title_button_field_select': 'Выбрать',
            'title_button_field_view_all': 'Показать все',
            'title_button_field_clear': 'Сбросить',

            'title_button_add': 'Добавить',
            'title_button_edit': 'Изменить',
            'title_button_del': 'Удалить(Отклонить)',
            'title_button_wagon': 'Вагоны',
            'title_button_wagon_accept': 'Принять вагоны',
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
        incoming_alert = new ALERT($('div#incoming-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT(lang), // Создадим класс IDS_RWT
        list_sostav = null,
        data_start = null,
        data_stop = null,
        start_id_sostav = null, // Выбираемый состав по умолчанию
        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            //if ($('input[name="isLoggedIn"]').val() == "true") {
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
            //};



        },
        // Показать составы
        view_sostav = function (refresh, start, stop, filter, id_sostav) {
            incoming_alert.clear_message();
            LockScreen(langView('mess_delay', langs));
            if (refresh || data_start === null || data_stop === null || data_start !== start || data_stop !== stop) {

                ids_inc.getViewArrivalSostav(start, stop, function (data) {
                    list_sostav = data;
                    data_start = start;
                    data_stop = stop;
                    table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav, id_sostav);
                });
            } else {
                table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav, id_sostav);
            }
        },
        // Показать отчет
        view_report = function (id, report) {
            // Вывисти заголовок прибытия
            var view_title = function (doc, sostav) {
                var station_on = sostav.Directory_Station1 ? sostav.Directory_Station1 : null;
                var way_on = sostav.Directory_Ways ? sostav.Directory_Ways : null;
                doc.write('<table class="table-title">');
                doc.write('<tr>');
                doc.write('<th>Индекс поезда</th>');
                doc.write('<td>' + sostav.composition_index + '</td>');
                doc.write('<th>Прибытие</th>');
                doc.write('<td>' + sostav.date_arrival.replace(/T/g, ' ') + '</td>');
                doc.write('<th>Прием</th>');
                doc.write('<td>' + sostav.date_adoption.replace(/T/g, ' ') + '</td>');
                doc.write('</tr>');
                doc.write('<tr>');
                doc.write('<th>Поезд прибыл на станцию</th>');
                doc.write('<td>' + (station_on ? ids_inc.ids_dir.getValueObj(station_on, 'station_name', lang) : '') + '</td>');
                doc.write('<th>Путь</th>');
                doc.write('<td>' + ((station_on ? ids_inc.ids_dir.getValueObj(way_on, 'way_num', lang) : '') + ' - ' + (station_on ? ids_inc.ids_dir.getValueObj(way_on, 'way_name', lang) : '')) + '</td>');
                doc.write('<th>Нумерация</th>');
                doc.write('<td>' + (sostav.numeration ? 'с хвоста' : sostav.numeration === false ? 'с головы' : 'не указана') + '</td>');
                doc.write('</tr>');
                doc.write('</table>');
            };
            // Вывести вагоны в составе
            var view_table_info_car_fst = function (doc, sostav) {

                doc.write('<table class="table-info">');
                doc.write('<tr>');
                doc.write('<th scope="col">№</th>');
                doc.write('<th scope="col">Станция отправления</th>');
                doc.write('<th scope="col">Груз</th>');
                doc.write('<th scope="col">Оператор</th>');
                doc.write('<th scope="col">Ограничение</th>');
                doc.write('<th scope="col">Собственник</th>');
                doc.write('<th scope="col">Код</th>');
                doc.write('<th scope="col">№ Вагона</th>');
                doc.write('<th scope="col">№ ж.д. накладной</th>');
                doc.write('<th scope="col">Вес. тн</th>');
                doc.write('<th scope="col">Цех получатель</th>');
                doc.write('<th scope="col">Разметка</th>');
                doc.write('<th scope="col">Примечание</th>');
                doc.write('</tr>');

                var list_cars = sostav.ArrivalCars.filter(function (i) {
                    return i.position_arrival
                }).sort(function (a, b) {
                    return Number(a.position_arrival) - Number(b.position_arrival)
                });

                var total_vesg = 0;
                var group_operators = [];
                // Список вагонов есть
                if (list_cars) {
                    for (i = 0; i < list_cars.length; i++) {

                        var doc_uz = list_cars[i].Arrival_UZ_Vagon && list_cars[i].Arrival_UZ_Vagon.Arrival_UZ_Document ? list_cars[i].Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                        var vag_uz = list_cars[i].Arrival_UZ_Vagon ? list_cars[i].Arrival_UZ_Vagon : null;
                        var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;

                        var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                        var dir_certificat = vag_uz && vag_uz.Directory_CertificationData ? vag_uz.Directory_CertificationData : null;

                        var dir_condition = vag_uz && vag_uz.Directory_ConditionArrival ? vag_uz.Directory_ConditionArrival : null;

                        var dir_car = vag_uz && vag_uz.Directory_Wagons ? vag_uz.Directory_Wagons : null;
                        var current_rent = cars_detali.get_current_rent(dir_car);

                        var dir_operator = current_rent && current_rent.Directory_OperatorsWagons ? current_rent.Directory_OperatorsWagons : null;
                        var dir_ll = current_rent && current_rent.Directory_LimitingLoading ? current_rent.Directory_LimitingLoading : null;
                        var dir_owner = dir_car && dir_car.Directory_OwnersWagons ? dir_car.Directory_OwnersWagons : null;
                        var dir_countrys = dir_car && dir_car.Directory_Countrys ? dir_car.Directory_Countrys : null;


                        var dir_division = vag_uz && vag_uz.Directory_Divisions ? vag_uz.Directory_Divisions : null;
                        doc.write('<tr>');
                        doc.write('<th>' + list_cars[i].position_arrival + '</th>');
                        doc.write('<td>' + (dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) + (dir_certificat ? ' (' + ids_inc.ids_dir.getValueObj(dir_certificat, 'certification_data', lang) + ')' : '') : '') + '</td>');
                        doc.write('<td>' + (dir_operator ? ids_inc.ids_dir.getValueObj(dir_operator, 'abbr', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_ll ? ids_inc.ids_dir.getValueObj(dir_ll, 'limiting_abbr', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_owner ? ids_inc.ids_dir.getValueObj(dir_owner, 'owner', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_countrys ? ids_inc.ids_dir.getValueObj(dir_countrys, 'code_sng') : '') + '</td>');
                        doc.write('<td>' + list_cars[i].num + '</td>');
                        doc.write('<td>' + doc_uz.nom_doc + (doc_uz.nom_main_doc ? '(' + doc_uz.nom_main_doc + ')' : '') + '</td>');
                        doc.write('<td>' + (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000).toFixed(2) : '0.00') + '</td>');
                        doc.write('<td>' + (dir_division ? ids_inc.ids_dir.getValueObj(dir_division, 'division_abbr', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_condition ? ids_inc.ids_dir.getValueObj(dir_condition, 'condition_abbr', lang) : '') + '</td>');
                        doc.write('<td></td>');
                        doc.write('</tr>');
                        // Подчет общего веса
                        total_vesg += (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0);
                        // Группировка операторов
                        var opr = getObjects(group_operators, 'id', dir_operator ? dir_operator.id : 0)
                        if (opr && opr.length > 0) {
                            opr[0].count += 1;
                            opr[0].vesg = Number(opr[0].vesg) + (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0);
                        } else {
                            if (dir_operator) {
                                group_operators.push({ id: dir_operator.id, operator: ids_inc.ids_dir.getValueObj(dir_operator, 'operators', lang), count: 1, vesg: (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0) });
                            } else {
                                group_operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0) });
                            }
                        }
                    }
                }
                doc.write('<tr>');
                doc.write('<th colspan="6" class="total">Всего вагонов</th>');
                doc.write('<td class="total">' + list_cars.length + '</td>');
                doc.write('<th colspan="2" class="total">Общий вес</th>');
                doc.write('<td class="total">' + total_vesg.toFixed(2) + '</td>');
                doc.write('<th colspan="3"></td>');
                doc.write('</tr>');
                doc.write('<tr>');
                doc.write('<th colspan="13">Информация по операторам</th>');
                doc.write('</tr>');
                if (group_operators && group_operators.length > 0) {
                    for (io = 0; io < group_operators.length; io++) {
                        doc.write('<tr>');
                        doc.write('<th colspan="6" class="total">' + group_operators[io].operator + '</th>');
                        doc.write('<td class="total">' + group_operators[io].count + '</td>');
                        doc.write('<th colspan="2"></th>');
                        doc.write('<td class="total">' + group_operators[io].vesg.toFixed(2) + '</td>');
                        doc.write('<th colspan="3"></td>');
                        doc.write('</tr>');
                    }
                }
                doc.write('</table>');


            };
            // Вывести вагоны в составе
            var view_table_info_car_fsci = function (doc, sostav) {

                doc.write('<table class="table-info">');
                doc.write('<tr>');
                doc.write('<th scope="col">№</th>');
                doc.write('<th scope="col">Код</th>');
                doc.write('<th scope="col">Грузоподъемность</th>');
                doc.write('<th scope="col">Вес,тн</th>');
                doc.write('<th scope="col">Род</th>');
                doc.write('<th scope="col">№ вагона</th>');
                doc.write('<th scope="col">№ ж.д. накладной</th>');
                doc.write('<th scope="col">Груз</th>');
                doc.write('<th scope="col">Станция отправления</th>');
                doc.write('<th scope="col">Оператор</th>');
                doc.write('<th scope="col">Собственник</th>');
                doc.write('<th scope="col">Цех-получатель</th>');
                doc.write('<th scope="col">Ограничение погрузки</th>');
                doc.write('<th scope="col">Судно</th>');
                doc.write('<th scope="col">Ком. состояние груза</th>');
                doc.write('<th scope="col">Акты</th>');
                doc.write('</tr>');

                var list_cars = sostav.ArrivalCars.filter(function (i) {
                    return i.position_arrival
                }).sort(function (a, b) {
                    return Number(a.position_arrival) - Number(b.position_arrival)
                });

                var total_vesg = 0;
                var group_operators = [];
                // Список вагонов есть
                if (list_cars) {
                    for (i = 0; i < list_cars.length; i++) {

                        var doc_uz = list_cars[i].Arrival_UZ_Vagon && list_cars[i].Arrival_UZ_Vagon.Arrival_UZ_Document ? list_cars[i].Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                        var vag_uz = list_cars[i].Arrival_UZ_Vagon ? list_cars[i].Arrival_UZ_Vagon : null;
                        var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;

                        var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                        var dir_certificat = vag_uz && vag_uz.Directory_CertificationData ? vag_uz.Directory_CertificationData : null;
                        var dir_commercial = vag_uz && vag_uz.Directory_CommercialCondition ? vag_uz.Directory_CommercialCondition : null;
                        var vag_acts_uz = vag_uz && vag_uz.Arrival_UZ_Vagon_Acts ? vag_uz.Arrival_UZ_Vagon_Acts : null;
                        var acts_uz = null;
                        for (ia = 0; ia < vag_acts_uz.length; ia++) {
                            acts_uz += ('id=' + vag_acts_uz[ia].id_document + ' №' + vag_acts_uz[ia].nom_akt + ' от ' + (vag_acts_uz[ia].date_akt ? vag_acts_uz[ia].date_akt.replace(/T/g, ' ') : '') + ' ' + vag_acts_uz[ia].prichina_akt + ' ст.' + vag_acts_uz[ia].stn_name_akt + ';');
                        }


                        var dir_condition = vag_uz && vag_uz.Directory_ConditionArrival ? vag_uz.Directory_ConditionArrival : null;

                        var dir_car = vag_uz && vag_uz.Directory_Wagons ? vag_uz.Directory_Wagons : null;
                        var current_rent = cars_detali.get_current_rent(dir_car);
                        var dir_operator = current_rent && current_rent.Directory_OperatorsWagons ? current_rent.Directory_OperatorsWagons : null;
                        var dir_ll = current_rent && current_rent.Directory_LimitingLoading ? current_rent.Directory_LimitingLoading : null;


                        var dir_owner = dir_car && dir_car.Directory_OwnersWagons ? dir_car.Directory_OwnersWagons : null;
                        var dir_countrys = dir_car && dir_car.Directory_Countrys ? dir_car.Directory_Countrys : null;
                        var dir_genus = dir_car && dir_car.Directory_GenusWagons ? dir_car.Directory_GenusWagons : null;




                        var dir_division = vag_uz && vag_uz.Directory_Divisions ? vag_uz.Directory_Divisions : null;
                        doc.write('<tr>');
                        doc.write('<th>' + list_cars[i].position_arrival + '</th>');
                        doc.write('<td>' + (dir_countrys ? ids_inc.ids_dir.getValueObj(dir_countrys, 'code_sng') : '') + '</td>');
                        doc.write('<td>' + (dir_car.gruzp ? Number(dir_car.gruzp).toFixed(2) : '0.00') + '</td>');
                        doc.write('<td>' + (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000).toFixed(2) : '0.00') + '</td>');
                        doc.write('<td>' + (dir_genus ? ids_inc.ids_dir.getValueObj(dir_genus, 'abbr', lang) : '') + '</td>');
                        doc.write('<td>' + list_cars[i].num + '</td>');
                        doc.write('<td>' + doc_uz.nom_doc + (doc_uz.nom_main_doc ? '(' + doc_uz.nom_main_doc + ')' : '') + '</td>');
                        doc.write('<td>' + (dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) + (dir_certificat ? ' (' + ids_inc.ids_dir.getValueObj(dir_certificat, 'certification_data', lang) + ')' : '') : '') + '</td>');
                        doc.write('<td>' + (dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_operator ? ids_inc.ids_dir.getValueObj(dir_operator, 'operators', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_owner ? ids_inc.ids_dir.getValueObj(dir_owner, 'owner', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_division ? ids_inc.ids_dir.getValueObj(dir_division, 'name_division', lang) : '') + '</td>');
                        doc.write('<td>' + (dir_ll ? ids_inc.ids_dir.getValueObj(dir_ll, 'limiting_abbr', lang) : '') + '</td>');
                        doc.write('<td></td>');
                        doc.write('<td>' + (dir_certificat ? ids_inc.ids_dir.getValueObj(dir_commercial, 'commercial_condition', lang) : '') + '</td>');
                        doc.write('<td>' + (acts_uz ? acts_uz : '') + '</td>');
                        doc.write('</tr>');
                        // Подчет общего веса
                        total_vesg += (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0);
                        // Группировка операторов
                        var opr = getObjects(group_operators, 'id', dir_operator ? dir_operator.id : 0)
                        if (opr && opr.length > 0) {
                            opr[0].count += 1;
                            opr[0].vesg = Number(opr[0].vesg) + (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0);
                        } else {
                            if (dir_operator) {
                                group_operators.push({ id: dir_operator.id, operator: ids_inc.ids_dir.getValueObj(dir_operator, 'operators', lang), count: 1, vesg: (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0) });
                            } else {
                                group_operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: (vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000) : 0) });
                            }
                        }
                    }
                }
                doc.write('<tr>');
                doc.write('<th colspan="3" class="total">Общий вес</th>');
                doc.write('<td class="total">' + total_vesg.toFixed(2) + '</td>');
                doc.write('<th class="total"></th>');
                doc.write('<td class="total">' + list_cars.length + '</td>');
                doc.write('<th colspan="10"></td>');
                doc.write('</tr>');
                //doc.write('<tr>');
                //doc.write('<th colspan="13">Информация по операторам</th>');
                //doc.write('</tr>');
                //if (group_operators && group_operators.length > 0) {
                //    for (io = 0; io < group_operators.length; io++) {
                //        doc.write('<tr>');
                //        doc.write('<th colspan="6" class="total">' + group_operators[io].operator + '</th>');
                //        doc.write('<td class="total">' + group_operators[io].count + '</td>');
                //        doc.write('<th colspan="2"></th>');
                //        doc.write('<td class="total">' + group_operators[io].vesg.toFixed(2) + '</td>');
                //        doc.write('<th colspan="3"></td>');
                //        doc.write('</tr>');
                //    }
                //}
                doc.write('</table>');


            };
            // Вывести отчет Натурная ведомость поезда
            var view_report_fst = function (sostav) {
                var mywindow = window.open('', 'Натурная ведомость поезда №' + sostav.num_doc);
                mywindow.document.write('<html><head><title>Натурная ведомость поезда №' + sostav.num_doc + '</title>');
                mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print.css">');
                mywindow.document.write('</head><body>');
                mywindow.document.write('<h2>Натурная ведомость поезда №' + sostav.num_doc + '</h2>');
                view_title(mywindow.document, sostav);      // Заголовок
                view_table_info_car_fst(mywindow.document, sostav);  // Вагоны в составе
                mywindow.document.write('<br />');
                mywindow.document.write('<br />');
                mywindow.document.write('<div">Подпись приемосдатчика ______________________</div>');
                mywindow.document.write('</body></html>');

                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10
            };
            // Вывести отчет Натурная ведомость коммерческого осмотра
            var view_report_fsci = function (sostav) {
                var mywindow = window.open('', 'Натурная ведомость коммерческого осмотра №' + sostav.num_doc);
                mywindow.document.write('<html><head><title>Натурная ведомость коммерческого осмотра №' + sostav.num_doc + '</title>');
                mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print.css">');
                mywindow.document.write('</head><body>');
                mywindow.document.write('<h2>Натурная ведомость коммерческого осмотра №' + sostav.num_doc + '</h2>');
                view_title(mywindow.document, sostav);              // Заголовок
                view_table_info_car_fsci(mywindow.document, sostav);     // Вагоны в составе
                mywindow.document.write('<br />');
                mywindow.document.write('<br />');
                mywindow.document.write('<div">Подпись приемосдатчика ______________________</div>');
                mywindow.document.write('</body></html>');

                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10
            };
            // Вывести отчет "Заявка на выдачу коммерческого акта ст. КР."
            var view_report_aica = function (sostav, station_name) {

                var list_cars = sostav.ArrivalCars.filter(function (i) {
                    return i.position_arrival;
                });

                var nums = getArrOfNameObjArr(list_cars, 'num');
                pn_sel_wagon.Open(nums, function (select_nums) {
                    // Получить отчет
                    if (select_nums && select_nums.length > 0) {

                        var mywindow = window.open('', 'Заявка на выдачу коммерческого акта ст. ' + station_name);
                        mywindow.document.write('<html><head><title>Заявка на выдачу коммерческого акта ст. ' + station_name + '</title>');
                        mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
                        mywindow.document.write('</head><body>');
                        mywindow.document.write('<div class=WordSection1>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику станції</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">' + station_name + '</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
                        mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">на видачу комерційного акту</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год.________хв.</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Згідно зі ст. 129 Статуту залізниць України прошу скласти та надати комерційний акт на вантаж , що прибув потягом № ­­­­­­­ ­­­­­­­­­­­­­­_______________(дата)</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">__________(год./хв.) з невідповідності маси вантажу натурою з даними, зазначеними у залізничній накладній</span></p>');

                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td>Вагон №</td>');
                        mywindow.document.write('<td>Найменування вантажу</td>');
                        mywindow.document.write('<td>Станція відправлення</td>');
                        mywindow.document.write('<td>Відправник</td>');
                        mywindow.document.write('</tr>');

                        select_nums.forEach(function (item, index, array) {
                            var wag = getObjOflist(sostav.ArrivalCars, 'num', item);

                            var doc_uz = wag.Arrival_UZ_Vagon && wag.Arrival_UZ_Vagon.Arrival_UZ_Document ? wag.Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                            var vag_uz = wag.Arrival_UZ_Vagon ? wag.Arrival_UZ_Vagon : null;
                            var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                            var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;
                            var dir_ship = doc_uz && doc_uz.Directory_Shipper ? doc_uz.Directory_Shipper : null;

                            mywindow.document.write('<tr>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(wag.num);
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td class="shipper">');
                            mywindow.document.write(dir_ship ? ids_inc.ids_dir.getValueObj(dir_ship, 'shipper_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('</tr>');

                        });
                        mywindow.document.write('</table>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Представник</span></p>');
                        mywindow.document.write('</div>');
                        mywindow.document.write('</body></html>');

                        mywindow.document.close(); // necessary for IE >= 10
                        mywindow.focus(); // necessary for IE >= 10
                    }
                });
            };
            // Вывести отчет "Заявка на участие в выдаче ст. КР."
            var view_report_api = function (sostav, station_name) {

                var list_cars = sostav.ArrivalCars.filter(function (i) {
                    return i.position_arrival;
                });

                var nums = getArrOfNameObjArr(list_cars, 'num');
                pn_sel_wagon.Open(nums, function (select_nums) {
                    // Получить отчет
                    if (select_nums && select_nums.length > 0) {

                        var mywindow = window.open('', 'Заявка на участие в выдаче ст. ' + station_name);
                        mywindow.document.write('<html><head><title>Заявка на участие в выдаче ст. ' + station_name + '</title>');
                        mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
                        mywindow.document.write('</head><body>');
                        mywindow.document.write('<div class=WordSection1>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику станції</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">' + station_name + '</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год.________хв.</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Відповідно до ст. 52 Статуту залізниць України , прошу направити представника залізниці для участі у видачі ( переважуванні) вантажу, що прибув поїздом</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">________________________________________(дата)</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">____________________(год/хв)</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td>Вагон №</td>');
                        mywindow.document.write('<td>Найменування вантажу</td>');
                        mywindow.document.write('<td>Відправник</td>');
                        mywindow.document.write('<td>Станція відправлення</td>');
                        mywindow.document.write('<td>Вага по документу</td>');
                        mywindow.document.write('</tr>');

                        select_nums.forEach(function (item, index, array) {
                            var wag = getObjOflist(sostav.ArrivalCars, 'num', item);

                            var doc_uz = wag.Arrival_UZ_Vagon && wag.Arrival_UZ_Vagon.Arrival_UZ_Document ? wag.Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                            var vag_uz = wag.Arrival_UZ_Vagon ? wag.Arrival_UZ_Vagon : null;
                            var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                            var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;
                            var dir_ship = doc_uz && doc_uz.Directory_Shipper ? doc_uz.Directory_Shipper : null;

                            mywindow.document.write('<tr>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(wag.num);
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td class="shipper">');
                            mywindow.document.write(dir_ship ? ids_inc.ids_dir.getValueObj(dir_ship, 'shipper_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(vag_uz && vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000).toFixed(2) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('</tr>');
                        });
                        mywindow.document.write('</table>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">За результатами перевірки  прошу видати комерційний акт відповідно до Правил.</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">ПП « Стіл Сервіс»&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Ст. ' + station_name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('</div>');
                        mywindow.document.write('</body></html>');

                        mywindow.document.close(); // necessary for IE >= 10
                        mywindow.focus(); // necessary for IE >= 10
                    }
                });
            };
            // Вывести отчет "Заявка на участие с попутным Ком. Актом ст. КР"
            var view_report_apaca = function (sostav, station_name) {

                var list_cars = sostav.ArrivalCars.filter(function (i) {
                    return i.position_arrival;
                });

                var nums = getArrOfNameObjArr(list_cars, 'num');
                pn_sel_wagon.Open(nums, function (select_nums) {
                    // Получить отчет
                    if (select_nums && select_nums.length > 0) {

                        var mywindow = window.open('', 'Заявка на участие с попутным коммерческим Актом ст. ' + station_name);
                        mywindow.document.write('<html><head><title>Заявка на участие с попутным коммерческим Актом ст. ' + station_name + '</title>');
                        mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
                        mywindow.document.write('</head><body>');
                        mywindow.document.write('<div class=WordSection1>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику УЗТ</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">транспортного департаменту</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">ПАТ «АрселорМіттал</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Кривий Ріг»</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год. ________хв.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ст. ' + station_name + '</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Відповідно до ст. 52 Статуту залізниць України , прошу подати вагон(и), якій (які) прибув( ли) з попутним комерційним актом, для перевірки маси вантажу . Прибули на адресу ПАТ «« АрселорМіттал  Кривий Ріг» поїздом №_____________</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">____________________( дата , год/хв)</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td>Вагон №</td>');
                        mywindow.document.write('<td>Найменування вантажу</td>');
                        mywindow.document.write('<td>Станція відправлення</td>');
                        mywindow.document.write('<td>№ комерційного акту</td>');
                        mywindow.document.write('</tr>');

                        select_nums.forEach(function (item, index, array) {
                            var wag = getObjOflist(sostav.ArrivalCars, 'num', item);

                            var doc_uz = wag.Arrival_UZ_Vagon && wag.Arrival_UZ_Vagon.Arrival_UZ_Document ? wag.Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                            var vag_uz = wag.Arrival_UZ_Vagon ? wag.Arrival_UZ_Vagon : null;
                            var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                            var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;
                            var dir_ship = doc_uz && doc_uz.Directory_Shipper ? doc_uz.Directory_Shipper : null;

                            mywindow.document.write('<tr>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(wag.num);
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');
                            mywindow.document.write(dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '');
                            mywindow.document.write('</td>');
                            mywindow.document.write('<td>');

                            mywindow.document.write('</td>');
                            mywindow.document.write('</tr>');
                        });
                        mywindow.document.write('</table>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">За результатами перевірки  прошу видати комерційний акт відповідно до Правил.</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">ПП « Стіл Сервіс»&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Ст. ' + station_name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
                        mywindow.document.write('<br />');
                        mywindow.document.write('</div>');
                        mywindow.document.write('</body></html>');

                        mywindow.document.close(); // necessary for IE >= 10
                        mywindow.focus(); // necessary for IE >= 10
                    }
                });
            };

            var view_report_dg20 = function (sostav) {
                // Добавить пробелы
                var add_nbsp = function (count) {
                    var result = '';
                    for (i = 0; i < count; i++) {
                        // Добавить документ в таблицу
                        result += '&nbsp;';
                    }
                    return result;
                }
                // Добавить документ
                var add_document = function (mywindow, nums, num_doc) {
                    var vagons_page1 = [];
                    if (nums && nums.length > 0) {
                        for (iw = 0; iw < nums.length; iw++) {
                            vagons_page1.push(getObjOflist(sostav.ArrivalCars, 'num', nums[iw]));
                        }
                        var doc_uz = vagons_page1[0].Arrival_UZ_Vagon && vagons_page1[0].Arrival_UZ_Vagon.Arrival_UZ_Document ? vagons_page1[0].Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                        var vag_uz = vagons_page1[0].Arrival_UZ_Vagon ? vagons_page1[0].Arrival_UZ_Vagon : null;
                        var dir_station = vag_uz && vag_uz.Directory_Station ? vag_uz.Directory_Station : null;
                        var dir_div = vag_uz && vag_uz.Directory_Divisions ? vag_uz.Directory_Divisions : null;
                        var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
                        var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;
                        var dir_ship = doc_uz && doc_uz.Directory_Shipper ? doc_uz.Directory_Shipper : null;
                    }
                    mywindow.document.write('<p class=MsoNormal><b><span>ПАО «АРСЕЛОРМИТТАЛ КРИВОЙ РОГ»</span></b><span>' + add_nbsp(40) + '<i>Форма ДГ-20</i></span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>' + add_nbsp(80) + '<b>НАКЛАДНАЯ ПРЕДПРИЯТИЯ</b></span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>                                                     НАКЛАДНАЯ № ' + num_doc + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>                                              Ведомость прибытия груза № ' + sostav.num_doc + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>Заадресовка груза:</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>Дата:     ________________</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>Ф.И.О.  ________________</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
                    mywindow.document.write('<p class=MsoNormal><b><span>Станция назначения</span></b><span>&nbsp;' + (dir_station ? ids_inc.ids_dir.getValueObj(dir_station, 'station_name', lang) : '') + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><b><span>Место выгрузки (цех-получатель)</span></b><span>&nbsp;' + (dir_div ? ids_inc.ids_dir.getValueObj(dir_div, 'division_abbr', lang) : '') + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><b><span>Род груза</span></b><span>&nbsp;' + (dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : '') + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><b><span>Станция отправления</span></b><span>&nbsp;' + (dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '') + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><b><span>Отправитель</span></b><span>&nbsp;' + (dir_ship ? ids_inc.ids_dir.getValueObj(dir_ship, 'shipper_name', lang) : '') + '</span></p>');
                    mywindow.document.write('<p class=MsoNormal><b><span>Примечание</span></b><span>&nbsp;_________________________________________________</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>___________________________________________________________</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
                    mywindow.document.write('<table class="MsoNormalTable" border=1 cellspacing=0 cellpadding=0 width=0>');
                    mywindow.document.write('<tr style="height:25.45pt">');
                    mywindow.document.write('<td width=29 rowspan=2 style="width:21.3pt;border:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center;text-indent:.4pt"><span style="font-size:8.0pt;line-height:107%">№ п/п</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=46 rowspan=2 style="width:33.05pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">№ вагона</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=65 rowspan=2 style="width:40.15pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">№ ж.д. накладной</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=74 rowspan=2 style="width:40.15pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Сертификат. данные</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=106 colspan=2 style="width:80.3pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Вес нетто, тн</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=90 colspan=2 style="width:80.35pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Начало грузовых операций</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=90 colspan=2 style="width:80.35pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Окончание грузовых операций</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('</tr>');
                    mywindow.document.write('<tr style="height:40.4pt">');
                    mywindow.document.write('<td width=44 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">По ж.д. накл.</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=62 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">После перевески</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=42 style="width:40.2pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Дата</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=47 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Время</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=42 style="width:40.2pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Дата</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('<td width=47 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
                    mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Время</span></p>');
                    mywindow.document.write('</td>');
                    mywindow.document.write('</tr>');
                    // Отображение данных
                    vagons_page1.forEach(function (item, index, array) {
                        var doc_uz = item.Arrival_UZ_Vagon && item.Arrival_UZ_Vagon.Arrival_UZ_Document ? item.Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                        var vag_uz = item.Arrival_UZ_Vagon ? item.Arrival_UZ_Vagon : null;
                        var dir_sd = vag_uz && vag_uz.Directory_CertificationData ? vag_uz.Directory_CertificationData : null;
                        mywindow.document.write('<tr style="height:14.35pt">');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write(index + 1);
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write(item.num);
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write(doc_uz.nom_doc);
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write(dir_sd ? ids_inc.ids_dir.getValueObj(dir_sd, 'certification_data', lang) : '');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write(vag_uz.vesg ? vag_uz.vesg : '');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write(vag_uz.vesg_reweighing ? vag_uz.vesg_reweighing : '');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
                        mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
                        mywindow.document.write('</tr>');
                    });
                    mywindow.document.write('</table>');
                    mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>Приемосдатчик груза и багажа ____________________   ____________________</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>' + add_nbsp(65) + '(подпись)' + add_nbsp(30) + '(Ф.И.О.)</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>Грузополучатель' + add_nbsp(24) + '_____________________   ____________________</span></p>');
                    mywindow.document.write('<p class=MsoNormal><span>' + add_nbsp(65) + '(подпись)' + add_nbsp(30) + '(Ф.И.О.)</span></p>');
                };

                var list_cars = sostav.ArrivalCars.filter(function (i) {
                    return i.position_arrival;
                });

                var nums = getArrOfNameObjArr(list_cars, 'num');


                pn_rep_sel_wagon.Open(nums, function (page_nums1, page_nums2) {
                    // Получить отчет

                    if ((page_nums1 && page_nums1.length > 0) || (page_nums2 && page_nums2.length > 0)) {
                        var mywindow = window.open('', 'Форма ДГ-20');
                        mywindow.document.write('<html><head><title>Форма ДГ-20</title>');
                        mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_dg20.css">');
                        mywindow.document.write('<div class=WordSection1>');
                        mywindow.document.write('<table class="MsoTableGrid" border=0 cellspacing=0 cellpadding=0>');
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=525 valign=top>');
                        if (page_nums1 && page_nums1.length > 0) {
                            add_document(mywindow, page_nums1, 1)
                        }
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=525 valign=top>');
                        if (page_nums2 && page_nums2.length > 0) {
                            add_document(mywindow, page_nums2, 2)
                        }
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        mywindow.document.write('</table>');
                        mywindow.document.write('</div>');
                        mywindow.document.write('</head><body>');
                        mywindow.document.write('</body></html>');
                        mywindow.document.close(); // necessary for IE >= 10
                        mywindow.focus(); // necessary for IE >= 10
                    }
                });
            };

            if (id) {
                LockScreen(langView('mess_print', langs));
                ids_inc.getArrivalSostavOfID(id, function (result_sostav) {
                    LockScreenOff();
                    if (result_sostav && result_sostav.status === 2) {
                        // Состав принят можно показать отчет
                        var sostav = result_sostav;
                        switch (report) {
                            case 'report_fst': view_report_fst(sostav); break;
                            case 'report_fsci': view_report_fsci(sostav); break;
                            case 'report_aica_kr': view_report_aica(sostav, 'Кривий Ріг'); break;
                            case 'report_aica_kr_gl': view_report_aica(sostav, 'Кривий Ріг-Головний'); break;
                            case 'report_api_kr': view_report_api(sostav, 'Кривий Ріг'); break;
                            case 'report_api_kr_gl': view_report_api(sostav, 'Кривий Ріг-Головний'); break;
                            case 'report_apaca_kr': view_report_apaca(sostav, 'Кривий Ріг'); break;
                            case 'report_apaca_kr_gl': view_report_apaca(sostav, 'Кривий Ріг-Головний'); break;
                            case 'report_dg20': view_report_dg20(sostav); break;

                            default: break;
                        }
                    }

                });
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
                    "lengthMenu": [[-1, 20, 50, 100], ["All", 20, 50, 100]],
                    "pageLength": -1,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    colReorder: true,               // вкл. перетаскивание полей
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
                            defaultContent: ""
                        },
                        { data: "train", title: langView('field_train', langs), width: "50px", orderable: true, searchable: true },
                        { data: "composition_index", title: langView('field_composition_index', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_arrival", title: langView('field_date_arrival', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_adoption", title: langView('field_date_adoption', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_adoption_act", title: langView('field_date_adoption_act', langs), width: "150px", orderable: false, searchable: false },
                        { data: "station_from", title: langView('field_station_from', langs), width: "150px", orderable: true, searchable: true },
                        { data: "station_on", title: langView('field_station_on', langs), width: "150px", orderable: true, searchable: true },
                        { data: "id_way", title: langView('field_way', langs), width: "150px", orderable: true, searchable: true },
                        { data: "num_doc", title: langView('field_num_doc', langs), width: "50px", orderable: true, searchable: true },
                        { data: "count_all", title: langView('field_count_all', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "status", title: langView('field_status', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create", title: langView('field_create', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create_user", title: langView('field_create_user', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change", title: langView('field_change', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change_user", title: langView('field_change_user', langs), width: "50px", orderable: true, searchable: true },
                        { data: "create_sostav", title: langView('field_create_sostav', langs), width: "150px", orderable: true, searchable: true },
                        { data: "change_sostav", title: langView('field_change_sostav', langs), width: "150px", orderable: true, searchable: true }
                    ],
                    dom: 'Bfrtip',
                    stateSave: true,
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
                            text: langView('title_button_add', langs),
                            action: function (e, dt, node, config) {
                                pn_edit_sostav.Open(null);
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    pn_edit_sostav.Open(table_sostav.select_sostav.id);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_del', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    if (table_sostav.select_sostav.id_arrived === null) {
                                        // Состав был добавлен вручную, можно удалить
                                        if (table_sostav.select_sostav.status === 0) {
                                            // Состав не принимался, можно удалить
                                            dialog_confirm.open('Удалить?', 'Вы уверены что хотите удалить состав : ' + table_sostav.select_sostav.composition_index, function (result) {
                                                if (result) {
                                                    ids_inc.getArrivalSostavOfID(table_sostav.select_sostav.id, function (result_sostav) {
                                                        if (result_sostav) {
                                                            var sostav = result_sostav;
                                                            // Состав найден, вагоны есть?
                                                            if (sostav.ArrivalCars && sostav.ArrivalCars.length > 0) {
                                                                // Вагоны есть, удалим вагоны
                                                                ids_inc.deleteArrivalCarsOfSostav(sostav.id, function (result_del_cars) {
                                                                    if (result_del_cars > 0) {
                                                                        // Вагоны удалены, удалим состав
                                                                        ids_inc.deleteArrivalSostav(sostav.id,
                                                                            function (result_del) {
                                                                                if (result_del > 0) {
                                                                                    pn_sel.view(true);
                                                                                } else {
                                                                                    incoming_alert.clear_message();
                                                                                    incoming_alert.out_error_message("При удалении сотава произошла ошибка");
                                                                                }
                                                                            });
                                                                    } else {
                                                                        // Ошибка удаления вагонов
                                                                        incoming_alert.clear_message();
                                                                        incoming_alert.out_error_message("При удалении вагонов сотава произошла ошибка");
                                                                    }
                                                                });
                                                            } else {
                                                                // Вагонов нет удалим состав
                                                                ids_inc.deleteArrivalSostav(sostav.id, function (result_del) {
                                                                    if (result_del > 0) {
                                                                        pn_sel.view(true);
                                                                    } else {
                                                                        incoming_alert.clear_message();
                                                                        incoming_alert.out_error_message("При удалении сотава произошла ошибка");
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            // Состав не найден
                                                            incoming_alert.clear_message();
                                                            incoming_alert.out_error_message("Перед процедурой удаления, не удалось получить информацию о составе!");
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            // Состав уже в работе удаление запрещено
                                            incoming_alert.clear_message();
                                            incoming_alert.out_error_message("Состав в работе, удаление – отклонено!");
                                        }
                                    } else {
                                        // Состав добавлен автоматически, только отклонить
                                        dialog_confirm.open('Отклонить?', 'Вы уверены что хотите отклонить состав : ' + table_sostav.select_sostav.composition_index, function (result) {
                                            if (result) {
                                                table_sostav.select_sostav.status = 3;                          // Присвоим статус отклонить
                                                table_sostav.select_sostav.change = toISOStringTZ(new Date());  // Сохраним кто менял
                                                table_sostav.select_sostav.change_user = user_name;
                                                ids_inc.putArrivalSostav(table_sostav.select_sostav,
                                                    function (result_upd) {
                                                        if (result_upd > 0) {
                                                            pn_sel.view(true);
                                                            incoming_alert.clear_message();
                                                            incoming_alert.out_info_message("Статус состава (отклонить) - установлен.");
                                                        } else {
                                                            incoming_alert.clear_message();
                                                            incoming_alert.out_error_message("При обновлении статуса сотава произошла ошибка");
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                }
                            },
                            enabled: false
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
                        },
                        {
                            extend: 'pageLength',
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    var rowData = table_sostav.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_sostav.select_sostav = rowData[0];
                        table_sostav.obj.button(5).enable(true);
                        if (table_sostav.select_sostav.status < 1) {
                            table_sostav.obj.button(3).enable(true);
                            table_sostav.obj.button(4).enable(true);
                            table_sostav.obj.button(5).text(langView('title_button_wagon_accept', langs));
                        } else {
                            // Если статус в работе принят или удален 
                            table_sostav.obj.button(3).enable(false);
                            table_sostav.obj.button(4).enable(false);
                            table_sostav.obj.button(5).text(langView('title_button_wagon_view', langs));
                        }
                    } else {
                        table_sostav.obj.button(3).enable(false);
                        table_sostav.obj.button(4).enable(false);
                        table_sostav.obj.button(5).enable(false);
                    }
                }).on('deselect', function (e, dt, type, indexes) {
                    table_sostav.deselect();
                });
            },
            // Показать таблицу с данными
            view: function (data, id_sostav) {
                var id_select = id_sostav ? id_sostav : table_sostav.select_sostav ? table_sostav.select_sostav.id : 0;
                table_sostav.obj.clear();
                // Сбросить выделенный состав
                table_sostav.deselect();
                $.each(data, function (i, el) {
                    table_sostav.obj.row.add(table_sostav.get_sostav(el));
                });
                table_sostav.obj.order([3, 'asc']);
                table_sostav.obj.row('#' + id_select).select();
                table_sostav.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_sostav: function (data) {

                //var cs = mt.getConsignee_Internal_Of_ID(data.consignee);
                //var car_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
                //    return i.arrival ? true : false;
                //}) : [];
                //var car_not_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
                //    return !i.arrival ? true : false;
                //}) : [];
                return {
                    "id": data.id,
                    "id_arrived": data.id_arrived,
                    "id_sostav": data.id_sostav,
                    "train": data.train,
                    "composition_index": data.composition_index,
                    "date_arrival": data.date_arrival.replace(/T/g, ' '),
                    "date_adoption": data.date_adoption !== null ? data.date_adoption.replace(/T/g, ' ') : null,
                    "date_adoption_act": data.date_adoption_act !== null ? data.date_adoption_act.replace(/T/g, ' ') : null,
                    "id_station_from": data.id_station_from,
                    //"station_from": data.id_station_from !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_from, 'station_name', lang) : '',
                    "station_from": data.id_station_from !== null ? ids_inc.getValueCultureObj(data, 'station_from_name') : '',


                    "id_station_on": data.id_station_on,
                    //"station_on": data.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_on, 'station_name', lang) : '',
                    "station_on": data.id_station_on !== null ? ids_inc.getValueCultureObj(data, 'station_on_name') : '',

                    //"id_way": data.id_way !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Ways_Of_ID(data.id_way, 'way_num', lang) : '',
                    "id_way": data.id_way !== null ? ids_inc.getValueCultureObj(data, 'way_num') : '',
                    "num_doc": data.num_doc,
                    "count": data.count,
                    "count_arrival": data.count_arrival,
                    "count_not_arrival": data.count_not_arrival,
                    "count_all": data.count_arrival + ' - ' + data.count_not_arrival,
                    "status": data.status,
                    "note": data.note,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                    "create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
                };
            },
            // Обновить данные в таблице
            update_sostav: function (data) {
                if (data) {
                    var row = table_sostav.get_sostav(data);
                    var index = table_sostav.obj.row('#' + data.id).index();

                    table_sostav.obj.cell(index, 1).data(row.train);
                    table_sostav.obj.cell(index, 2).data(row.composition_index);
                    table_sostav.obj.cell(index, 3).data(row.date_arrival);
                    table_sostav.obj.cell(index, 4).data(row.date_adoption);
                    table_sostav.obj.cell(index, 5).data(row.date_adoption_act);
                    table_sostav.obj.cell(index, 6).data(row.station_from);
                    table_sostav.obj.cell(index, 7).data(row.station_on);
                    table_sostav.obj.cell(index, 8).data(row.id_way);
                    table_sostav.obj.cell(index, 9).data(row.num_doc);
                    table_sostav.obj.cell(index, 10).data(row.count_all);
                    table_sostav.obj.cell(index, 11).data(row.create_sostav);
                    table_sostav.obj.cell(index, 12).data(row.change_sostav);
                    table_sostav.obj.draw();
                }
            },
            // Deselect
            deselect: function () {
                table_sostav.select_sostav = null;
                table_sostav.obj.button(3).enable(false);
                table_sostav.obj.button(4).enable(false);
                table_sostav.obj.button(5).enable(false);
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
            report_aica_kr: $('#report_aica_kr'),
            report_aica_kr_gl: $('#report_aica_kr_gl'),
            report_api_kr: $('#report_api_kr'),
            report_api_kr_gl: $('#report_api_kr_gl'),
            report_apaca_kr: $('#report_apaca_kr'),
            report_apaca_kr_gl: $('#report_apaca_kr_gl'),
            report_dg20: $('#report_dg20'),

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
                //
                pn_sel.report_aica_kr.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_aica_kr');
                    }
                });
                //
                pn_sel.report_aica_kr_gl.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_aica_kr_gl');
                    }
                });
                //
                pn_sel.report_api_kr.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_api_kr');
                    }
                });
                //
                pn_sel.report_api_kr_gl.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_api_kr_gl');
                    }
                });
                //
                pn_sel.report_apaca_kr.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_apaca_kr');
                    }
                });
                //
                pn_sel.report_apaca_kr_gl.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_apaca_kr_gl');
                    }
                });
                //
                pn_sel.report_dg20.on('click', function (event) {
                    event.preventDefault();
                    if (table_sostav.select_sostav) {
                        view_report(table_sostav.select_sostav.id, 'report_dg20');
                    }
                });
            },
            view: function (refresh, id_sostav) {
                view_sostav(refresh, pn_sel.start_dt, pn_sel.stop_dt, Number(pn_sel.select_station.val()) !== -1 ? function (i) { return i.id_station_from === Number(pn_sel.select_station.val()) ? true : false; } : null, id_sostav);
            }
        },

        //*************************************************************************************
        // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА ВАГОНОВ
        //*************************************************************************************
        pn_sel_wagon = {
            obj: null,
            callback_ok: function () {
                return [];
            },
            //Таблица с вагонами документа
            table_wagon: {
                html_table: $('#table-list-wagons'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function (callback_ok) {
                    pn_sel_wagon.table_wagon.obj = pn_sel_wagon.table_wagon.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        "info": true,
                        select: {
                            style: 'multi',
                            selector: 'td:first-child'
                        },
                        //select: {
                        //    //style: 'multi',
                        //    style: 'multi',
                        //    selector: 'td:first-child'
                        //},
                        "autoWidth": false,
                        //"filter": true,
                        "scrollY": "400px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //var bt_xml = $('<button type="button" class="btn btn-warning btn-sm" id="add-num-car-manual" title="Показать XML"><i class="fa fa-file-code-o" aria-hidden="true" ></i></button>');
                            //bt_xml.on('click', function (event) {
                            //    pn_sel_wagon.table_wagon.open_xml(data.xml_final);
                            //});
                            //$('td', row).eq(6).text('').append(bt_xml);
                        },
                        columns: [
                            {
                                targets: 0,
                                data: null,
                                defaultContent: '',
                                orderable: false,
                                className: 'select-checkbox',
                                width: "20px"
                            },
                            { data: "num", title: langView('field_manual_car_num', langs), width: "100px", orderable: false, searchable: false },
                        ],
                        dom: 'Bfrtip',
                        stateSave: false,
                        buttons: [
                            {
                                extend: 'selectAll',
                                text: 'Select All',
                            },
                            {
                                extend: 'selectNone',
                                text: 'Deselect All',
                            }]
                    }).on('select deselect', function (e, dt, type, indexes) {
                        // Определим количество выбранных вагонов
                        var count = pn_sel_wagon.table_wagon.obj.rows({ selected: true }).count();
                        // Если есть вагоны выбранные отобразим кнопку "Ок"
                        var buttons = pn_sel_wagon.obj.dialog("option", "buttons");
                        buttons[0].disabled = count > 0 ? false : true;
                        pn_sel_wagon.obj.dialog("option", "buttons", buttons);
                    });
                },
                // Показать таблицу с данными
                view: function (list) {
                    pn_sel_wagon.table_wagon.obj.clear();
                    for (i = 0; i < list.length; i++) {
                        // Добавить документ в таблицу
                        pn_sel_wagon.table_wagon.obj.row.add({ num: list[i] });
                    }
                    pn_sel_wagon.table_wagon.obj.draw();
                },
            },
            init: function () {
                pn_sel_wagon.obj = $("div#select-wagons").dialog({
                    resizable: false,
                    title: 'Укажите вагоны',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 500,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {
                            disabled: true,
                            text: "Ок",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                pn_sel_wagon.select(pn_sel_wagon.callback_ok);
                            }
                        },
                        {
                            text: "Отмена",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                pn_sel_wagon.table_wagon.init();
            },
            //
            Open: function (list_num, callback_ok) {
                if (typeof callback_ok === 'function') {
                    pn_sel_wagon.callback_ok = callback_ok;
                }

                if (list_num && list_num.length > 0) {
                    pn_sel_wagon.table_wagon.view(list_num);
                }
                pn_sel_wagon.obj.dialog("open");
            },
            // Сохранить изменения
            select: function (callback_ok) {
                var index = pn_sel_wagon.table_wagon.obj.rows({ selected: true });
                var row_select_wagon = pn_sel_wagon.table_wagon.obj.rows(index[0]).data();
                // Ок
                pn_sel_wagon.obj.dialog("close");
                if (typeof callback_ok === 'function') {
                    callback_ok(getArrOfNameObjArr(row_select_wagon, 'num'));
                }
            },
        },
        //*************************************************************************************
        // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА ВАГОНОВ ДЛЯ ОТЧЕТА
        //*************************************************************************************
        pn_rep_sel_wagon = {
            obj: null,
            list_nums: $('ul#list_nums'),
            report_page1: $('ul#report_page1'),
            report_page2: $('ul#report_page2'),
            callback_ok: function () {
                return [];
            },
            init: function () {
                pn_rep_sel_wagon.obj = $("div#rep-select-wagons").dialog({
                    resizable: false,
                    title: 'Укажите вагоны',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 700,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {
                            //disabled: true,
                            text: "Ок",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                pn_rep_sel_wagon.select(pn_rep_sel_wagon.callback_ok);
                            }
                        },
                        {
                            text: "Отмена",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                //pn_rep_sel_wagon.table_wagon.init();
            },
            //
            Open: function (list_num, callback_ok) {
                if (typeof callback_ok === 'function') {
                    pn_rep_sel_wagon.callback_ok = callback_ok;
                }
                $("#list_nums, #report_page1, #report_page2").sortable({
                    connectWith: ".connectedSortable"
                }).disableSelection();
                pn_rep_sel_wagon.list_nums.empty();
                pn_rep_sel_wagon.report_page1.empty();
                pn_rep_sel_wagon.report_page2.empty();
                if (list_num && list_num.length > 0) {
                    for (i = 0; i < list_num.length; i++) {
                        // Добавить документ в таблицу
                        pn_rep_sel_wagon.list_nums.append($('<li num="' + list_num[i] + '" class="ui-state-default">' + list_num[i] + '</li>'));
                    }
                }
                pn_rep_sel_wagon.obj.dialog("open");
            },
            // Сохранить изменения
            select: function (callback_ok) {
                var page_nums1 = [];
                var page_nums2 = [];
                var list_pg1 = $('#report_page1 li');
                var list_pg2 = $('#report_page2 li');

                if (list_pg1 && list_pg1.length > 0) {
                    for (i = 0; i < list_pg1.length; i++) {
                        page_nums1.push(Number(list_pg1[i].innerText));
                    }
                }
                if (list_pg2 && list_pg2.length > 0) {
                    for (i = 0; i < list_pg2.length; i++) {
                        page_nums2.push(Number(list_pg2[i].innerText));
                    }
                }
                //var index = pn_rep_sel_wagon.table_wagon.obj.rows({ selected: true });
                //var row_select_wagon = pn_rep_sel_wagon.table_wagon.obj.rows(index[0]).data();
                //// Ок
                pn_rep_sel_wagon.obj.dialog("close");
                if (typeof callback_ok === 'function') {
                    callback_ok(page_nums1, page_nums2);
                }
                //getArrOfNameObjArr(row_select_wagon, 'num')
            },
        },

        //*************************************************************************************
        // ДИАЛОГОВОЕ ОКНО "ДОБАВИТЬ/ПРАВИТЬ СОСТАВ"
        //*************************************************************************************
        pn_edit_sostav = {
            obj: null,
            //table: null,
            lang: null,
            list_station: null,
            user_name: null,
            ids_inc: null,
            id: null,
            sostav: null,
            // Поля формы
            train_edit: $('input#train-edit'),
            composition_index_edit: $('input#composition-index-edit'),
            date_arrival_edit: $('input#date-arrival-edit'),
            date_arrival: null,
            station_from_edit: $('select#station-from-edit'),
            note_edit: $('textarea#note-edit'),
            alert_sostav: $('div#edit-sostav-alert'),
            all_obj: null,  // массив всех элементов формы 
            val: null,      // класс валидации
            // инициализвция Диалога
            init: function (lang, list_station, user_name, callback_ok) {
                pn_edit_sostav.lang = lang;
                pn_edit_sostav.list_station = list_station;
                pn_edit_sostav.user_name = user_name;
                // Инициализация элементов
                pn_edit_sostav.station_from_edit = cd_initSelect(
                    pn_edit_sostav.station_from_edit,
                    { lang: pn_edit_sostav.lang },
                    pn_edit_sostav.list_station,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // настроим компонент выбора времени
                pn_edit_sostav.date_arrival = cd_initDateTimeRangePicker(pn_edit_sostav.date_arrival_edit, { lang: pn_edit_sostav.lang, time: true }, function (datetime) {

                });
                // Соберем все элементы в массив
                pn_edit_sostav.all_obj = $([])
                    .add(pn_edit_sostav.train_edit)
                    .add(pn_edit_sostav.composition_index_edit)
                    .add(pn_edit_sostav.date_arrival_edit)
                    .add(pn_edit_sostav.station_from_edit)
                    .add(pn_edit_sostav.note_edit)
                    .add(pn_edit_sostav.alert_park_wagon);
                // создадим классы
                pn_edit_sostav.ids_inc = new IDS_RWT(lang); // Создадим класс IDS_RWT
                pn_edit_sostav.val = new VALIDATION(pn_edit_sostav.lang, pn_edit_sostav.alert_sostav, pn_edit_sostav.all_obj); // Создадим класс VALIDATION
                pn_edit_sostav.obj = $("div#edit-sostav").dialog({
                    resizable: false,
                    //title: 'Принять состав',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 500,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {
                            text: "Ок",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                pn_edit_sostav.save(callback_ok);
                            }
                        },
                        {
                            text: "Отмена",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                // Sumbit form
                pn_edit_sostav.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
            },
            // открыть диалог
            Open: function (id) {
                pn_edit_sostav.val.clear_all(); // Очистим ошибки и сообщения;
                pn_edit_sostav.id = id;
                if (pn_edit_sostav.id !== null) {
                    pn_edit_sostav.obj.dialog("option", "title", "Изменить состав");
                    // Получим текуший состав
                    pn_edit_sostav.ids_inc.getArrivalSostavOfID(pn_edit_sostav.id, function (result_sostav) {
                        pn_edit_sostav.sostav = result_sostav;
                        pn_edit_sostav.train_edit.val(pn_edit_sostav.sostav.train);
                        pn_edit_sostav.composition_index_edit.val(pn_edit_sostav.sostav.composition_index);
                        pn_edit_sostav.station_from_edit.val(pn_edit_sostav.sostav.id_station_from);
                        pn_edit_sostav.date_arrival.setDateTime(pn_edit_sostav.sostav.date_arrival !== null ? pn_edit_sostav.sostav.date_arrival.replace(/T/g, ' ') : null);
                        pn_edit_sostav.note_edit.val(pn_edit_sostav.sostav.note);

                    });
                } else {
                    // 
                    pn_edit_sostav.obj.dialog("option", "title", "Добавить состав");
                    pn_edit_sostav.sostav = null;
                    pn_edit_sostav.train_edit.val('');
                    pn_edit_sostav.composition_index_edit.val('');
                    pn_edit_sostav.station_from_edit.val(-1);
                    pn_edit_sostav.date_arrival.setDateTime(null);
                    pn_edit_sostav.note_edit.val('');

                }
                pn_edit_sostav.obj.dialog("open");
            },
            // Валидация данных
            validation: function () {
                pn_edit_sostav.val.clear_all();
                var valid = true;
                valid = valid & pn_edit_sostav.val.checkInputOfNull(pn_edit_sostav.train_edit, "Укажите номер поезда");
                valid = valid & pn_edit_sostav.val.checkRegexp(pn_edit_sostav.train_edit, /[0-9]{4}/, "Номер поезда должен содержать 4-и цифры");
                valid = valid & pn_edit_sostav.val.checkInputOfNull(pn_edit_sostav.composition_index_edit, "Укажите индекс поезда");
                valid = valid & pn_edit_sostav.val.checkRegexp(pn_edit_sostav.composition_index_edit, /[0-9]{4}[-]{1}[0-9]{3}[-]{1}[0-9]{4}/, "Индекс поезда должен быть в формате (XXXX-XXX-XXXX)");
                valid = valid & pn_edit_sostav.val.checkInputOfNull(pn_edit_sostav.date_arrival_edit, "Укажите время прибытия поезда");
                valid = valid & pn_edit_sostav.val.checkSelection(pn_edit_sostav.station_from_edit, "Укажите станцию прибытия");
                return valid;
            },
            // Сохранить изменения
            save: function (callback_ok) {
                var valid = pn_edit_sostav.validation();
                if (valid) {
                    var arrival_sostav = pn_edit_sostav.getArrivalSostav();
                    if (pn_edit_sostav.id) {
                        // Править
                        pn_edit_sostav.ids_inc.putArrivalSostav(arrival_sostav,
                            function (result_edit) {
                                if (result_edit > 0) {
                                    // Ок
                                    pn_edit_sostav.obj.dialog("close");
                                    if (typeof callback_ok === 'function') {
                                        callback_ok(pn_edit_sostav.id, false);
                                    }
                                } else {
                                    pn_edit_sostav.val.clear_message();
                                    pn_edit_sostav.val.out_error_message("При обновлении состава произошла ошибка!");
                                }
                            });
                    } else {
                        // Добавить
                        pn_edit_sostav.ids_inc.postArrivalSostav(arrival_sostav,
                            function (result_add) {
                                if (result_add > 0) {
                                    // Ок
                                    pn_edit_sostav.obj.dialog("close");
                                    if (typeof callback_ok === 'function') {
                                        callback_ok(result_add, true);
                                    }
                                } else {
                                    pn_edit_sostav.val.clear_message();
                                    pn_edit_sostav.val.out_error_message("При добавлении состава произошла ошибка!");
                                }
                            });
                    }
                }
            },
            // Получить новый состав
            getArrivalSostav: function () {
                return {
                    id: pn_edit_sostav.id ? pn_edit_sostav.id : 0,
                    id_arrived: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_arrived : null,
                    id_sostav: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_sostav : null,
                    train: pn_edit_sostav.train_edit.val(),
                    composition_index: pn_edit_sostav.composition_index_edit.val(),
                    date_arrival: toISOStringTZ(pn_edit_sostav.date_arrival.getDateTime()),
                    date_adoption: pn_edit_sostav.id ? pn_edit_sostav.sostav.date_adoption : null,
                    date_adoption_act: pn_edit_sostav.id ? pn_edit_sostav.sostav.date_adoption_act : null,
                    id_station_from: get_select_number_value(pn_edit_sostav.station_from_edit),
                    id_station_on: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_station_on : null,
                    id_way: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_way : null,
                    num_doc: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.num_doc : null,
                    count: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.count : null,
                    status: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.status : 0,
                    note: pn_edit_sostav.note_edit.val(),
                    create: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.create : toISOStringTZ(new Date()),
                    create_user: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.create_user : pn_edit_sostav.user_name,
                    change: pn_edit_sostav.id !== null ? toISOStringTZ(new Date()) : null,
                    change_user: pn_edit_sostav.id !== null ? pn_edit_sostav.user_name : null,
                };
            },
        },

        //*************************************************************************************
        // МЕНДАЛЬНОЕ ОКНО ДИАЛОГ
        //*************************************************************************************
        dialog_confirm = {
            result: false,
            callback_ok: null,
            obj: $("#dialog-confirm").dialog({
                resizable: false,
                autoOpen: false,
                height: "auto",
                width: 500,
                modal: true,
                open: function (event, ui) {
                },
                close: function (event, ui) {
                    if (typeof dialog_confirm.callback_ok === 'function') {
                        dialog_confirm.callback_ok(dialog_confirm.result);
                    }
                },
                classes: {
                    "ui-dialog": "card",
                    "ui-dialog-titlebar": "card-header bg-primary text-white",
                    "ui-dialog-content": "card-body",
                    "ui-dialog-buttonpane": "card-footer text-muted"
                },
                buttons: [
                    {
                        text: "Ок",
                        class: "btn btn-outline-primary btn-sm",
                        click: function () {
                            dialog_confirm.result = true;
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "Отмена",
                        class: "btn btn-outline-primary btn-sm",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }]
            }),
            open: function (titlt, text, callback_ok) {
                dialog_confirm.result = false;
                dialog_confirm.obj.dialog("option", "title", titlt);
                $('p#dialog-confirm-text').text(text);
                dialog_confirm.callback_ok = callback_ok;
                dialog_confirm.obj.dialog("open");
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
                cars_detali.alert_sap_is = new ALERT($('div#sap-is-alert'));// Создадим класс ALERTG
                //
                // Соберем все элементы для валидации принятия вагона в массив 
                cars_detali.all_obj_arrival_car = $([])
                    .add(cars_detali.uz_doc_num_doc)
                    .add(cars_detali.uz_doc_num_osn_doc)
                    .add(cars_detali.uz_route_stn_from)
                    .add(cars_detali.uz_route_stn_on)
                    .add(cars_detali.uz_route_stn_border)
                    .add(cars_detali.uz_route_border_cross_time.obj)
                    .add(cars_detali.uz_cargo_client_kod_from)
                    .add(cars_detali.uz_cargo_client_kod_on)
                    .add(cars_detali.uz_rask_kod_plat)
                    .add(cars_detali.uz_rask_distance_way)
                    // вагон
                    .add(cars_detali.bt_card_vag_add)
                    .add(cars_detali.uz_vag_condition_arrival)
                    .add(cars_detali.uz_vag_type_wagon)
                    .add(cars_detali.uz_vag_gruzp)
                    .add(cars_detali.uz_vag_ves_tary_arc)
                    .add(cars_detali.uz_vag_u_tara)
                    .add(cars_detali.uz_vag_route)
                    .add(cars_detali.uz_vag_note)
                    .add(cars_detali.uz_cargo_kod_etsng)
                    .add(cars_detali.uz_cargo_kod_gng)
                    .add(cars_detali.uz_vag_station_on_amkr)
                    .add(cars_detali.uz_vag_devision_on_amkr_kod)
                    .add(cars_detali.uz_vag_devision_on_amkr_name)
                    .add(cars_detali.arrival_cars_position_arrival)
                    .add(cars_detali.arrival_cars_car_date_adoption_act.obj)
                ;

                // Соберем все элементы в массив
                cars_detali.all_obj_card_vag = $([])
                    .add(cars_detali.card_vag_kod_adm)
                    .add(cars_detali.card_vag_name_adm)
                    .add(cars_detali.card_vag_name_rod_vag)
                    .add(cars_detali.card_vag_name_owner)
                    .add(cars_detali.card_vag_name_operator)
                    .add(cars_detali.card_vag_gruzp)
                    .add(cars_detali.card_vag_tara)
                    .add(cars_detali.card_vag_kol_os)
                    .add(cars_detali.card_vag_usl_tip)
                    .add(cars_detali.card_vag_date_rem_vag.obj)
                    .add(cars_detali.card_vag_date_rem_uz.obj)
                    .add(cars_detali.card_vag_limiting_loading)
                    .add(cars_detali.card_vag_type_ownership)
                    .add(cars_detali.card_vag_note)
                    .add(cars_detali.card_vag_rent_start.obj);

                cars_detali.all_obj_searsh_card_vag = $([])
                    .add(cars_detali.card_vag_kod_adm)
                    .add(cars_detali.card_vag_name_adm)
                    .add(cars_detali.card_vag_name_rod_vag)
                    .add(cars_detali.card_vag_kol_os)
                    .add(cars_detali.card_vag_usl_tip);

                // Валидации
                cars_detali.val_arrival_car = new VALIDATION(cars_detali.lang, cars_detali.alert_arrival_car, cars_detali.all_obj_arrival_car); // Создадим класс VALIDATION
                cars_detali.val_card_vag = new VALIDATION(cars_detali.lang, cars_detali.alert_card_vag, cars_detali.all_obj_card_vag); // Создадим класс VALIDATION
                cars_detali.val_searsh_card_vag = new VALIDATION(cars_detali.lang, cars_detali.alert_card_vag, cars_detali.all_obj_searsh_card_vag); // Создадим класс VALIDATION
                // Таблицы
                cars_detali.table_dosc.init();// Инициализация таблицы с документами
                cars_detali.table_acts.init();// Инициализация таблицы с акт
                cars_detali.table_cont.init();// Инициализация таблицы с контейнера

                cars_detali.table_arrival_cars.init();// Инициализация таблицы с принятыми вагонами

                // Инициализация окна поиска вагонов по номеру документа
                pn_search_epd.init(cars_detali.lang, cars_detali.user, function (result_search) {
                    // Обработка результатов поиска
                    cars_detali.alert.clear_message();
                    if (result_search) {
                        $.each(result_search, function (i, el) {
                            var result_text = 'сотояние операции не определено.';
                            switch (el.result) {
                                case -1: result_text = 'ошибка. операция не выполнена'; break;
                                case 0: result_text = 'принят на АМКР, операция пропущена.'; break;
                                case 1: result_text = 'принадлежит этому составу, обновлен только ЭПД.'; break;
                                case 2: result_text = 'добавлен в состав как новый и обновлен ЭПД.'; break;
                                case 3: result_text = 'перенесен в состав из другого состава и обновлен ЭПД.'; break;
                            }
                            cars_detali.alert.out_warning_message("Вагон №" + el.num + " - " + result_text);
                        });
                        // Установить признак обновления составов
                        cars_detali.update_sostav = true;
                    }
                    // Показать 
                    cars_detali.view(table_sostav.select_sostav.id, false);
                });
                // Инициализация окна ручного вводаномеров вагона
                pn_manual_car.init(cars_detali.lang, cars_detali.user, function (result_manual) {
                    // !!! сделать обработку результата
                    cars_detali.alert.clear_message();
                    if (result_manual) {
                        $.each(result_manual, function (i, el) {
                            var result_text = 'сотояние операции не определено.';
                            switch (el.result) {
                                case -1: result_text = 'ошибка. операция не выполнена'; break;
                                case 0: result_text = 'принят на АМКР, операция пропущена.'; break;
                                case 1: result_text = 'принадлежит этому составу'; break;
                                case 2: result_text = 'добавлен в состав как новый'; break;
                                case 3: result_text = 'перенесен в состав из другого состава'; break;
                            }
                            var result_doc = 'не определено.';
                            switch (el.doc) {
                                case -1: result_doc = 'ошибка.'; break;
                                case 0: result_doc = 'не найден.'; break;
                                case 1: result_doc = 'перезаписан.'; break;
                                case 2: result_doc = 'предыдущий.'; break;
                            }
                            cars_detali.alert.out_warning_message("Вагон №" + el.num + " - " + result_text + ", добавление или обновление ЭПД - " + result_doc);
                        });
                        // Установить признак обновления составов
                        cars_detali.update_sostav = true;
                    }
                    //// Показать 
                    cars_detali.view(table_sostav.select_sostav.id, false);
                });
                // Инициализация окна принять состав
                pn_arrival_sostav.init(cars_detali.lang, cars_detali.user, function (result_arrival_sostav) {
                    // !!! сделать обработку результата
                    cars_detali.alert.clear_message();
                    cars_detali.alert.out_info_message('Состав (№ поезда :' + cars_detali.sostav.train + ', Индекс поезда :' + cars_detali.sostav.composition_index + ') - Принят на АМКР');
                    // Установить признак обновления составов
                    cars_detali.update_sostav = true;
                    // Показать 
                    cars_detali.view(table_sostav.select_sostav.id, false);
                });
                // Sumbit form
                cars_detali.content.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
                // Настройка закрыть детали проекта
                cars_detali.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    //// Обновлено
                    //ids_inc.getArrivalSostavOfID(table_sostav.select_sostav.id, function (result_sostav) {
                    //    if (result_sostav) {
                    //        table_sostav.update_sostav(result_sostav);
                    //    }
                    //});
                    // Обновить все (Обновится тогда когда будет признак cars_detali.update_sostav=true, очень много строк неоходимо обновлять - пример перенос вагонов по прибытию)
                    if (cars_detali.update_sostav) {
                        pn_sel.view(true);
                    }

                    cars_detali.content.removeClass('is-visible');

                });
            },
            // Обновить и загрузить списочные компоненты окна
            init_select: function () {
                cars_detali.update_list_station_name_from(null);        // Станция отправитель
                cars_detali.update_list_station_name_on(null);          // Станция получатель
                cars_detali.update_list_station_border(null);           // Пограничный пункт
                cars_detali.update_list_consignee(null);                // Грузополучатели
                cars_detali.update_list_shipper(null);                  // Грузопоотправитель
                cars_detali.update_list_station_on_amkr(-1);            // Станция АМКР
                //cars_detali.update_list_devision_on_amkr(-1);           // Цеха АМКР
                cars_detali.update_list_devision_on_amkr(null);           // Цеха АМКР
                cars_detali.update_list_adm(-1);                        // Администрации
                cars_detali.update_list_rod(null);                      // Род вагона
                cars_detali.update_list_owner(null);                    // Владелец вагона
                cars_detali.update_list_operator(null);                 // Оператор вагона
                cars_detali.update_list_kol_os(0);                      // Количество осей
                cars_detali.update_list_limiting_loading(null);         // Ограничение погрузки
                cars_detali.update_list_type_ownership(-1);             // Признак собственности
                cars_detali.update_list_condition_arrival(-1);          // Годность по прибытию
                cars_detali.update_list_type_wagon(-1);                 // Тип вагона
                cars_detali.update_list_name_plat(null);                // Плательщик по прибытию
                cars_detali.update_list_cargo_etsng(null);              // Грузы ЕТ СНГ
                cars_detali.update_list_cargo_gng(null);                // Грузы ЕТ ГНГ
                cars_detali.update_list_certificate_data(-1);           // сертификационные данные
                cars_detali.update_list_commercial_condition(-1);       // комерчиское состояние
                cars_detali.update_list_danger_name(-1);                // класс опасности
            },
            //-------------------------------------------------------------------------------------
            // Управление режимами и состоянием окна "Принять вагоны"
            //-------------------------------------------------------------------------------------
            // Возвращает свойство "редактирование разрешено" - true, запрещено -false
            is_edit_mode_of_element: function (el) {
                //var d = $(el).attr('data-edit');
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
            //-------------------------------------------------------------------------------------
            // Открыть окно
            //-------------------------------------------------------------------------------------
            // Открыть окно и показать информацию по составу
            view: function (id, message) {
                cars_detali.clear(message);            // Очистить все ячейки
                cars_detali.set_close_edit();          // Перевести в режим "close" по умолчанию
                if (id === null) return;
                cars_detali.id_sostav = id;
                // Загрузка библиотек
                cars_detali.loadReference(function () {
                    // Получим текуший состав
                    LockScreen(langView('mess_delay', langs));
                    cars_detali.ids_inc.getArrivalSostavOfID(cars_detali.id_sostav, function (result_sostav) {
                        cars_detali.sostav = result_sostav;
                        // Покаать информацию по составу
                        cars_detali.sostav_title.text('Информация по составу (№ поезда :' + cars_detali.sostav.train + ', Индекс поезда :' + cars_detali.sostav.composition_index + ', Прибыл:' + (cars_detali.sostav.date_arrival ? cars_detali.sostav.date_arrival.replace(/T/g, ' ') : null) + ')');
                        // Загрузим списочные компоненты
                        cars_detali.init_select();
                        // Показать список не принятых вагонов
                        cars_detali.view_cars_not_arrival(cars_detali.sostav.ArrivalCars.filter(function (i) { return i.arrival === null ? true : false; }).sort(function (a, b) { return Number(a.position) - Number(b.position) }));
                        // Показать список принятых вагонов
                        cars_detali.table_arrival_cars.view(cars_detali.sostav.ArrivalCars.filter(function (i) { return i.arrival !== null ? true : false; }).sort(function (a, b) { return Number(a.position_arrival) - Number(b.position_arrival) }))

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
            // Кнопка найти вагон по ЭПД
            add_num_car_of_epd: $('button#add-num-car-of-epd').on('click', function (event) {
                event.preventDefault();
                pn_search_epd.Open(cars_detali.sostav);
            }),
            // Кнопка найти вагон вручную
            add_num_car_manual: $('button#add-num-car-manual').on('click', function (event) {
                event.preventDefault();
                pn_manual_car.Open(cars_detali.sostav);
            }),
            //-------------------------------------------------------------------------------------
            // КОМПОНЕНТЫ РАЗДЕЛА "ВАГОНЫ"
            //-------------------------------------------------------------------------------------
            // Отображение компонентов раздела "Вагоны"
            //-------------------------------------------------------------------------------------
            // Показать не принятые вагоны
            view_cars_not_arrival: function (list) {
                $('div#list-cars-not-arrival').empty();
                $.each(list, function (i, el) {
                    var icon_arrival = 'fa-train';
                    if (el.id_transfer) {
                        icon_arrival = 'fa-share';
                    } else {
                        if (el.note) {
                            icon_arrival = 'fa-hand-paper-o';
                        }
                    }
                    var link = $('<a class="list-group-item list-group-item-action" id="' + el.id + '" data-toggle="list" href="#" role="tab" aria-controls="">' + el.num + ' <i class="fa ' + icon_arrival + '" aria-hidden="true"></i> ' + (el.num_doc ? '<i class="fa fa-file-text-o" aria-hidden="true" title="Документ найден"></i>' : '') + '</a>');
                    if (el.consignee === 7932) {
                        link.addClass('list-group-item-success');
                    }
                    $('div#list-cars-not-arrival').append(link);

                });
                // Определим событие
                $('#list-cars-not-arrival a').on('click', function (e) {
                    e.preventDefault();
                    var id = $(this).attr('id');
                    LockScreen(langView('mess_searsh_epd', langs));
                    cars_detali.alert.clear_message();
                    cars_detali.val_arrival_car.clear_all(); // Очистить ошибки если принимали вагон, с ошибкой
                    cars_detali.alert_sap_is.clear_message();// Очистить сообщения по САП
                    cars_detali.ids_inc.getArrivalCarsOfID(id, function (car) {
                        if (car !== null) {
                            cars_detali.select_id = car.id; // Сохраним id вагона
                            // !! Два запроса выполняются паралельно
                            // 1. Прочесть информацию по САП
                            cars_detali.view_sap_incoming_supply(car.id, function () {

                            });
                            // 2. Если есть вагон найти и ЭПД документ
                            cars_detali.ids_inc.getOTPR_UZ_DOCOfNum(car.num_doc, function (result_otpr) {
                                if (result_otpr === null) {
                                    // Документа нет пишим сообщение
                                    cars_detali.alert.out_warning_message(langView('mess_not_searsh_epd', langs));
                                }
                                cars_detali.view_cars_epd(car.num, result_otpr);
                                //LockScreenOff();
                            });
                        } else {
                            cars_detali.alert.out_error_message('Запись по вагону id:' + id + ' - не найдена!');
                            LockScreenOff();
                        }
                    });
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
            select_sap_is: null,                               // Информация по САП
            select_id_cargo: null,                              // Выбранный груз (таблица [KRR-PA-CNT-Railway].[IDS].[Directory_Cargo])
            select_id_cargo_gng: null,                          // Выбранный груз (таблица [KRR-PA-CNT-Railway].[IDS].[Directory_CargoGNG])
            select_otpr: null,                                  // Выбранный документ
            select_otpr_vagon: null,                            // Информация по выбраному вагону эпд
            select_otpr_cont: null,                             // Информация о контейнерах выбраного вагона эпд
            select_main_otpr: null,                             // Выбранный основной документ (заполняется если по вагону досылочный документ)
            select_main_otpr_vagon: null,                       // Информация по выбраному вагону из основного документа эпд (заполняется если по вагону досылочный документ)
            select_main_otpr_cont: null,                        // Информация о контейнерах выбраного вагона из основного документа эпд (заполняется если по вагону досылочный документ)
            select_vagon: null,                                 // Информация по выбраному из справочника
            select_vagon_mode: false,                           // Режим вывода вагона из справочника (select_vagon_mode = false-вагон режим просмотра true-режим ввода в ручную)
            // ВАЛИДАЦИЯ --------------------------------------------------------------------
            val_arrival_car: null,                              // класс валидации val_arrival_car
            val_card_vag: null,                                 // класс валидации card_vag
            val_searsh_card_vag: null,                          // класс валидации searsh_card_vag
            alert_arrival_car: $('div#car-detali-alert'),       // класс сообщений alert_arrival_car
            alert_card_vag: $('div#card-vag-alert'),            // класс сообщений card_vag
            alert_sap_is: null,                                 // класс сообщений card_vag
            all_obj_arrival_car: null,                          // массив всех элементов валидации all_obj_arrival_car
            all_obj_card_vag: null,                             // массив всех элементов валидации card_vag

            //-------------------------------------------------------------------------------------
            // Переменные раздела "Информация о вагоне и ЭПД" 
            //-------------------------------------------------------------------------------------
            // Тестовые кнопки перехода в режимы
            bt_mode_view: $('button#mode-view').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_mode(false);
            }),
            bt_mode_edit: $('button#mode-edit').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_mode(true);
            }),
            bt_mode_open: $('button#mode-open').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_open_edit();
            }),
            bt_mode_close: $('button#mode-close').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_close_edit();
            }),
            // Кнопка "Принять вагон"
            bt_arrival_car: $('button#arrival-car').on('click', function (event) {
                event.preventDefault();
                // Принять вагон
                cars_detali.arrival_vagon(cars_detali.select_id, function (result) {
                    if (result > 0) {
                        cars_detali.alert.out_info_message('Вагон №' + cars_detali.select_num + ' - Добавлен в систему ИДС');
                        cars_detali.update_sostav = true;
                        // Показать 
                        cars_detali.view(table_sostav.select_sostav.id, false);
                    }
                    LockScreenOff();
                });
            }),
            // Кнопка найти вагон в промежуточной базе
            search_cars_num_doc: $('button#search-car-num-doc').on('click', function (event) {
                event.preventDefault();
                //!!!!!!!!!!!!! тест
                //cars_detali.select_num = 56942493;
                LockScreen(langView('mess_searsh_epd', langs));
                cars_detali.val_arrival_car.clear_all();
                cars_detali.val_card_vag.clear_all();
                cars_detali.set_mode(false); // вернуть режим просмотра
                cars_detali.ids_inc.ids_tr.AddUpdateUZ_DOC_To_DB_IDS(cars_detali.select_num, (cars_detali.sostav ? cars_detali.sostav.date_arrival : toISOStringTZ(new Date())),
                    function (result_num) {
                        if (result_num !== null) {
                            // Документ найдент и сохранен в локальной базе
                            cars_detali.ids_inc.getArrivalCarsOfID(cars_detali.select_id, function (result_car) {
                                if (result_car !== null && result_car.num === cars_detali.select_num) {
                                    // Номера вагонов совподают, добавим номер документа и штамп изменений
                                    result_car.num_doc = result_num;
                                    result_car.UZ_DOC = null;
                                    //result_car.Arrival_UZ_Vagon = null;
                                    result_car.change = toISOStringTZ(new Date());
                                    result_car.change_user = cars_detali.user;
                                    // Сохраним изменения 
                                    cars_detali.ids_inc.putArrivalCars(result_car, function (result_upd) {
                                        if (result_upd <= 0) {
                                            // Информация по вагону не обновилась
                                            cars_detali.alert.out_warning_message('ЭПД - найден (№ док. ' + result_num + ') и сохранен в базу данных "ЭПД по прибытию", но при обновлении информации по вагону №' + cars_detali.select_num + ' - произошла ошибка.');
                                            cars_detali.show_booton_epd_manual();
                                        } else {
                                            // Информация по вагону обновилась, добавим значек
                                            $('a#' + cars_detali.select_id).text(cars_detali.select_num + ' ');
                                            $('a#' + cars_detali.select_id).append(result_num ? $('<i class="fa fa-file-text-o" aria-hidden="true"></i>') : '');
                                        }
                                        // Прочитаем ЭПД
                                        cars_detali.ids_inc.getOTPR_UZ_DOCOfNum(result_num, function (result_otpr) {
                                            if (result_otpr === null) {
                                                // Документа нет пишим сообщение
                                                cars_detali.alert.out_warning_message(langView('mess_not_manual_epd', langs));
                                                cars_detali.show_booton_epd_manual();
                                            }
                                            cars_detali.view_cars_epd(cars_detali.select_num, result_otpr);
                                        });

                                    });
                                } else {
                                    if (result_car === null) {
                                        cars_detali.alert.out_warning_message('ЭПД - найден (№ док. ' + result_num + ') и сохранен в базу данных "ЭПД по прибытию", но при обновлении информации по вагону №' + cars_detali.select_num + ' - произошла ошибка чтения записи id:' + cars_detali.select_id);
                                    } else {
                                        cars_detali.alert.out_warning_message('ЭПД - найден (№ док. ' + result_num + ') и сохранен в базу данных "ЭПД по прибытию", но при обновлении информации по вагону №' + cars_detali.select_num + ' - произошла ошибка чтения записи id:' + cars_detali.select_id + ' номер вагона записи (' + result_car.num + ') не совпадает с номер вагона обновления');
                                    }
                                    cars_detali.show_booton_epd_manual();
                                    LockScreenOff();
                                }
                            });

                        } else {
                            // Документа нет пишим сообщение
                            cars_detali.alert.out_warning_message(langView('mess_not_manual_epd', langs));
                            cars_detali.show_booton_epd_manual();
                            LockScreenOff();
                        }
                    });
            }),
            // Убрать кнопки ЭПД
            show_booton_not: function () {
                cars_detali.edit_car_num_doc.hide();
                cars_detali.search_cars_num_doc.hide();
            },
            // Показать кнопку найти документ
            show_booton_epd_search: function () {
                cars_detali.edit_car_num_doc.hide();
                cars_detali.search_cars_num_doc.show();
            },
            // Показать кнопку ввести значения в ручную
            show_booton_epd_manual: function () {
                cars_detali.edit_car_num_doc.show();
                cars_detali.search_cars_num_doc.hide();
            },
            // Кнопка ввести данные в ручную
            edit_car_num_doc: $('button#edit-car-num-doc').on('click', function (event) {
                event.preventDefault();
                cars_detali.val_arrival_car.clear_all();
                cars_detali.val_card_vag.clear_all();
                cars_detali.set_mode(true);
            }),
            // Номер вагона
            num_car: $('input#num_car'),
            // Номера документа
            title_num_doc: $('label#title_num_doc').show(),
            title_num_deliv_doc: $('label#title_num_deliv_doc').hide(),
            uz_doc_num_doc: $('input#uz_doc_num_doc'),
            title_num_osn_doc: $('label#title_num_osn_doc').hide(),
            uz_doc_num_osn_doc: $('input#uz_doc_num_osn_doc').hide(),
            arrival_cars_position_arrival: $('input#arrival_cars_position_arrival').inputSpinner(),
            // дата и время принятия вагона по акту
            arrival_cars_car_date_adoption_act: cd_initDateTimeRangePicker($('input#arrival_cars_car_date_adoption_act'), { lang: lang, time: true }, function (datetime) {

            }),
            // Маршруты клиенты, станция отправки
            uz_route_stn_from: $('input#uz_route_stn_from'),
            uz_route_name_from: $('input#uz_route_name_from'),
            uz_route_name_railway_from: $('input#uz_route_name_railway_from'),
            bt_route_name_from_add: $('button#uz_route_name_from_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Внешних сетей и станций"', 'Будет добавлена новая запись внешней станции [ Код = ' + cars_detali.uz_route_stn_from.val() + ', Станция = ' + cars_detali.uz_route_name_from.val() + ', Дорога = ' + cars_detali.uz_route_name_railway_from.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_ExternalStation(cars_detali.uz_route_stn_from.val(), cars_detali.uz_route_name_from.val(), function () {
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_from, "");
                            cars_detali.update_list_station_name_from(cars_detali.uz_route_stn_from.val());
                            cars_detali.view_epd_station_from(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Маршруты клиенты, станция приема
            uz_route_stn_on: $('input#uz_route_stn_on'),
            uz_route_name_on: $('input#uz_route_name_on'),
            uz_route_name_railway_on: $('input#uz_route_name_railway_on'),
            bt_route_name_on_add: $('button#uz_route_name_on_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Внешних сетей и станций"', 'Будет добавлена новая запись станции прибытия [ Код = ' + cars_detali.uz_route_stn_on.val() + ', Станция = ' + cars_detali.uz_route_name_on.val() + ', Дорога = ' + cars_detali.uz_route_name_railway_on.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_ExternalStation(cars_detali.uz_route_stn_on.val(), cars_detali.uz_route_name_on.val(), function () {
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_on, "");
                            cars_detali.update_list_station_name_on(cars_detali.uz_route_stn_on.val());
                            cars_detali.view_epd_station_on(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Маршруты клиенты, пограничные пункты
            uz_route_stn_border: $('input#uz_route_stn_border'),
            uz_route_stn_border_name: $('input#uz_route_stn_border_name'),
            //uz_route_border_cross_time: $('input#uz_route_border_cross_time'),
            uz_route_border_cross_time: cd_initDateTimeRangePicker($('input#uz_route_border_cross_time'), { lang: lang, time: true }, function (datetime) {

            }),
            bt_route_stn_border_add: $('button#uz_route_stn_border_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Пограничных пунктов"', 'Будет добавлена новая запись пограничного пункта [ Код = ' + cars_detali.uz_route_stn_border.val() + ', Станция = ' + cars_detali.uz_route_stn_border_name.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_BorderCheckpoint(cars_detali.uz_route_stn_border.val(), cars_detali.uz_route_stn_border_name.val(), function () {
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_border, "");
                            cars_detali.update_list_station_border(cars_detali.uz_route_stn_border.val());
                            cars_detali.view_epd_station_border(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Грузоотправители
            uz_cargo_client_kod_from: $('input#uz_cargo_client_kod_from'),
            uz_cargo_client_name_from: $('input#uz_cargo_client_name_from'),
            bt_client_name_from_add: $('button#uz_cargo_client_name_from_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Грузоотправителей"', 'Будет добавлена новая запись грузоотправителя [ Код = ' + cars_detali.uz_cargo_client_kod_from.val() + ', Название = ' + cars_detali.uz_cargo_client_name_from.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_Shipper(cars_detali.uz_cargo_client_kod_from.val(), cars_detali.uz_cargo_client_name_from.val(), function () {
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_client_kod_from, "");
                            cars_detali.update_list_shipper(cars_detali.uz_cargo_client_kod_from.val());
                            cars_detali.view_epd_client(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // грузополучатели
            uz_cargo_client_kod_on: $('input#uz_cargo_client_kod_on'),
            uz_cargo_client_name_on: $('input#uz_cargo_client_name_on'),
            select_uz_cargo_client_name_on: $('select#uz_cargo_client_name_on'),
            // Возврат поставщику
            uz_cargo_returns: $('input#uz_cargo_returns'),
            // Отправка на станцию АМКР
            uz_vag_station_on_amkr: $('select#uz_vag_station_on_amkr'),
            // Отправка в цех АМКР
            //uz_vag_devision_on_amkr: $('select#uz_vag_devision_on_amkr'),
            uz_vag_devision_on_amkr_kod: $('input#uz_vag_devision_on_amkr_kod'),
            uz_vag_devision_on_amkr_name: $('input#uz_vag_devision_on_amkr_name'),
            // ВАГОН
            bt_card_vag_add: $('button#card_vag_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Справочник вагонов"', 'Будет добавлена новая запись в карточку вагона №' + cars_detali.select_num + '', function (result) {
                    if (result) {
                        cars_detali.addDirectory_Cars(function () {
                            cars_detali.get_vagon_dir(cars_detali.select_otpr_vagon, cars_detali.select_num,
                                function (result_vagon) {
                                    cars_detali.select_vagon = result_vagon;
                                    if (!cars_detali.select_vagon) {
                                        // Вагон не найден в справочнике
                                        //cars_detali.val_card_vag.out_warning_message("Вагон №" + cars_detali.select_num + " не найден в справочнике вагонов ИДС, также не удалось создать строку справочника по данным УЗ, если вы уверены, что номер вагона указан правильно, создайте строку справочника вагона в ручном режиме или обратитесь к администратору ИДС. ");
                                        cars_detali.bt_card_vag_add.show();
                                        cars_detali.set_mode_vagon_card(true);
                                    } else {
                                        // Запись вагона из справочника
                                        cars_detali.bt_card_vag_add.hide();
                                        cars_detali.set_mode_vagon_card(false);
                                        cars_detali.val_arrival_car.set_control_ok(cars_detali.bt_card_vag_add, "");
                                    }
                                    cars_detali.view_epd_card_vag(cars_detali.select_vagon);
                                });
                        }, null);
                    }
                });
            }),
            // 
            uz_vag_route: $('input#uz_vag_route'), // Признак маршрута
            // Админ.
            card_vag_kod_adm: $('input#card_vag_kod_adm'),
            card_vag_name_adm: $('select#card_vag_name_adm'),
            // Род
            card_vag_name_rod_vag: $('input#card_vag_name_rod_vag'),
            // Тип цистерны
            card_vag_usl_tip: $('input#card_vag_usl_tip'),
            // Количество осей
            card_vag_kol_os: $('select#card_vag_kol_os'),
            // Грузоподъемность
            card_vag_gruzp: $('input#card_vag_gruzp'),
            // Дата ремонта
            card_vag_date_rem_vag: cd_initDateTimeRangePicker($('input#card_vag_date_rem_vag'), { lang: lang, time: false }, function (datetime) {

            }),
            card_vag_date_rem_uz: cd_initDateTimeRangePicker($('input#card_vag_date_rem_uz'), { lang: lang, time: false }, function (datetime) {

            }),
            // Собственник
            card_vag_name_owner: $('input#card_vag_name_owner'),
            // Начало аренды
            card_vag_rent_start: cd_initDateTimeRangePicker($('input#card_vag_rent_start'), { lang: lang, time: true }, function (datetime) {

            }),
            // Оператор
            card_vag_name_operator: $('input#card_vag_name_operator'),
            // Ограничение погрузки
            card_vag_limiting_loading: $('input#card_vag_limiting_loading'),
            // Признак собственности
            card_vag_type_ownership: $('select#card_vag_type_ownership'),
            // Ограничение уз
            card_vag_note: $('textarea#card_vag_note'),
            // Вес тары УЗ
            card_vag_tara: $('input#card_vag_tara'),
            // Грузоподъемность эпд
            uz_vag_gruzp: $('input#uz_vag_gruzp'),
            // Весы тары
            uz_vag_ves_tary_arc: $('input#uz_vag_ves_tary_arc'),
            // Весы тары (уточн)
            uz_vag_u_tara: $('input#uz_vag_u_tara'),
            // Примечание к вагону
            uz_vag_note: $('textarea#uz_vag_note'),
            // Годность по прибытию
            uz_vag_condition_arrival: $('select#uz_vag_condition_arrival'),
            // Тип вагона
            uz_vag_type_wagon: $('select#uz_vag_type_wagon'),
            // Код платильщика
            uz_rask_kod_plat: $('input#uz_rask_kod_plat'),
            // Название платильщика
            uz_rask_name_plat: $('input#uz_rask_name_plat'),
            // Кнопка добавить платильщика
            uz_rask_name_plat_add: $('button#uz_rask_name_plat_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Плательщик по прибытию"', 'Будет добавлена новая запись плательщика [ Код = ' + cars_detali.uz_rask_kod_plat.val() + ', Название = ' + cars_detali.uz_rask_name_plat.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_PayerSender(cars_detali.uz_rask_kod_plat.val(), cars_detali.uz_rask_name_plat.val(), function () {
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_rask_kod_plat, "");
                            cars_detali.update_list_name_plat(cars_detali.uz_rask_name_plat.val());
                            cars_detali.view_epd_plat(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Тарифное расстояние
            uz_rask_distance_way: $('input#uz_rask_distance_way'),
            // Тариф при выдачи
            uz_rask_pl_pay_summa: $('input#uz_rask_pl_pay_summa'),
            // Грузы
            uz_cargo_kod_etsng: $('input#uz_cargo_kod_etsng'),
            uz_cargo_name_etsng: $('textarea#uz_cargo_name_etsng'),
            uz_cargo_name_etsng_add: $('button#uz_cargo_name_etsng_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Грузы ЕТСНГ"', 'Будет добавлена новая запись груза [ Код = ' + cars_detali.uz_cargo_kod_etsng.val() + ', Название = ' + cars_detali.uz_cargo_name_etsng.text() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_CargoETSNG(cars_detali.uz_cargo_kod_etsng.val(), cars_detali.uz_cargo_name_etsng.val(), function () {
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_kod_etsng, "");
                            cars_detali.update_list_cargo_etsng(cars_detali.uz_cargo_name_etsng.val());
                            if (cars_detali.select_otpr_cont) {
                                cars_detali.view_epd_cargo_etsng_of_cont(cars_detali.select_otpr_cont);
                            } else {
                                cars_detali.view_epd_cargo_etsng_of_vagon(cars_detali.select_otpr_vagon);
                            }
                        }, null);
                    }
                });
            }),
            uz_cargo_kod_gng: $('input#uz_cargo_kod_gng'),
            uz_cargo_name_gng: $('textarea#uz_cargo_name_gng'),
            uz_cargo_name_gng_add: $('button#uz_cargo_name_gng_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Грузы ГНГ"', 'Будет добавлена новая запись груза [ Код = ' + cars_detali.uz_cargo_kod_gng.val() + ', Название = ' + cars_detali.uz_cargo_name_gng.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_CargoGNG(cars_detali.uz_cargo_kod_gng.val(), cars_detali.uz_cargo_name_gng.val(), function () {
                            cars_detali.update_list_cargo_gng(cars_detali.uz_cargo_name_gng.val());
                            //cars_detali.view_epd_cargo_gng(cars_detali.select_otpr_vagon);
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_kod_gng, "");
                            if (cars_detali.select_otpr_cont) {
                                cars_detali.view_epd_cargo_gng_of_cont(cars_detali.select_otpr_cont);
                            } else {
                                cars_detali.view_epd_cargo_gng_of_vagon(cars_detali.select_otpr_vagon);
                            }

                        }, null);
                    }
                });
            }),
            uz_cargo_group_cargo: $('input#uz_cargo_group_cargo'),
            // Сертификационные данные
            uz_cargo_certificate_data: $('select#uz_cargo_certificate_data'),
            // Сертификационные данные
            uz_cargo_commercial_condition: $('select#uz_cargo_commercial_condition'),
            // Анализ груза
            uz_cargo_cargo_analysis: $('textarea#uz_cargo_cargo_analysis'),
            // Кол мест упаковки
            uz_cargo_kol_pac: $('input#uz_cargo_kol_pac'),
            // Вес груза по ЭПД
            uz_cargo_vesg_doc: $('input#uz_cargo_vesg_doc'),
            // Вес груза перевеска
            uz_cargo_vesg_reweighing: $('input#uz_cargo_vesg_reweighing'),
            // Вес груза разница
            uz_cargo_vesg_difference: $('input#uz_cargo_vesg_difference'),
            // ЗПУ
            uz_cargo_nom_zpu: $('input#uz_cargo_nom_zpu'),
            // класс опасности
            uz_cargo_danger_class: $('input#uz_cargo_danger_class'),
            uz_cargo_danger_name: $('select#uz_cargo_danger_name'),
            // код опасности
            uz_cargo_danger_kod: $('input#uz_cargo_danger_kod'),
            // Таблица с документами на груз
            table_dosc: {
                html_table: $('#table-sender-doc'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_dosc.obj = cars_detali.table_dosc.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "id", title: langView('field_doc_id', langs), width: "50px", orderable: true, searchable: false },
                            { data: "description", title: langView('field_description', langs), width: "50px", orderable: true, searchable: false },
                            { data: "doc_date", title: langView('field_doc_date', langs), width: "50px", orderable: true, searchable: false },
                            { data: "doc_type", title: langView('field_doc_type', langs), width: "50px", orderable: true, searchable: false },
                            { data: "doc_type_name", title: langView('field_doc_type_name', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod_zd_use", title: langView('field_kod_zd_use', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kol", title: langView('field_kol', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    });
                },
                // Показать таблицу с данными
                view: function (sender_doc) {
                    cars_detali.table_dosc.load(sender_doc);
                    cars_detali.table_dosc.obj.draw();
                },
                // Загрузить данные
                load: function (sender_doc) {
                    cars_detali.table_dosc.list = sender_doc;
                    cars_detali.table_dosc.obj.clear();
                    for (i = 0; i < sender_doc.length; i++) {
                        cars_detali.table_dosc.obj.row.add(cars_detali.table_dosc.get_row(sender_doc[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    return {
                        "id": data.id,
                        "description": data.description,
                        "doc_date": data.doc_date !== null ? data.doc_date.replace(/T/g, ' ') : null,
                        "doc_type": data.doc_type,
                        "doc_type_name": data.doc_type_name,
                        "kod_zd_use": data.kod_zd_use !== null ? Number(data.kod_zd_use) : null,
                        "kol": data.kol !== null ? Number(data.kol) : null,
                    };
                }
            },
            // Таблица с Актами
            table_acts: {
                html_table: $('#table-acts'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_acts.obj = cars_detali.table_acts.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "carrier_kod", title: langView('field_carrier_kod', langs), width: "50px", orderable: true, searchable: false },
                            { data: "carrier_name", title: langView('field_carrier_name', langs), width: "50px", orderable: true, searchable: false },
                            { data: "date_akt", title: langView('field_date_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "date_dved", title: langView('field_date_dved', langs), width: "50px", orderable: true, searchable: false },
                            { data: "esr_akt", title: langView('field_esr_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "stn_name_akt", title: langView('field_stn_name_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_akt", title: langView('field_nom_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_dved", title: langView('field_nom_dved', langs), width: "50px", orderable: true, searchable: false },
                            { data: "oper_date", title: langView('field_oper_date', langs), width: "50px", orderable: true, searchable: false },
                            { data: "prichina_akt", title: langView('field_prichina_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "responsible_person", title: langView('field_responsible_person', langs), width: "50px", orderable: true, searchable: false },
                            { data: "ser_dved", title: langView('field_ser_dved', langs), width: "50px", orderable: true, searchable: false },
                            { data: "type", title: langView('field_type', langs), width: "50px", orderable: true, searchable: false },
                            { data: "vagon_nom", title: langView('field_vagon_nom', langs), width: "50px", orderable: true, searchable: false },
                            { data: "zd_kod", title: langView('field_zd_kod', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    });
                },
                // Показать таблицу с данными
                view: function (act) {
                    cars_detali.table_acts.load(act);
                    cars_detali.table_acts.obj.draw();
                },
                // Загрузить данные
                load: function (act) {
                    cars_detali.table_acts.list = act;
                    cars_detali.table_acts.obj.clear();
                    for (i = 0; i < act.length; i++) {
                        cars_detali.table_acts.obj.row.add(cars_detali.table_acts.get_row(act[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    return {
                        "carrier_kod": data.carrier_kod !== null ? Number(data.carrier_kod) : null,
                        "carrier_name": data.carrier_name,
                        "date_akt": data.date_akt !== null ? data.date_akt.replace(/T/g, ' ') : null,
                        "date_dved": data.date_dved !== null ? data.date_dved.replace(/T/g, ' ') : null,
                        "esr_akt": data.esr_akt,
                        "stn_name_akt": data.stn_name_akt,
                        "nom_akt": data.nom_akt,
                        "nom_dved": data.nom_dved !== null ? Number(data.nom_dved) : null,
                        "oper_date": data.oper_date !== null ? data.oper_date.replace(/T/g, ' ') : null,
                        "prichina_akt": data.prichina_akt,
                        "responsible_person": data.responsible_person,
                        "ser_dved": data.ser_dved,
                        "type": data.type, // ActKind
                        "vagon_nom": data.vagon_nom,
                        "zd_kod": data.zd_kod !== null ? Number(data.zd_kod) : null,
                    };
                }
            },
            // Таблица с Контейнеры
            table_cont: {
                html_table: $('#table-cont'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_cont.obj = cars_detali.table_cont.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "nom_cont", title: langView('field_nom_cont', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod_tiporazmer", title: langView('field_kod_tiporazmer', langs), width: "50px", orderable: true, searchable: false },
                            { data: "gruzp", title: langView('field_gruzp', langs), width: "50px", orderable: true, searchable: false },
                            { data: "ves_tary_arc", title: langView('field_ves_tary_arc', langs), width: "50px", orderable: true, searchable: false },
                            { data: "vesg", title: langView('field_vesg', langs), width: "50px", orderable: true, searchable: false },
                            { data: "brutto", title: langView('field_brutto', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod_etsng", title: langView('field_kod_etsng', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kol_pac", title: langView('field_kol_pac', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod", title: langView('field_kod', langs), width: "50px", orderable: true, searchable: false },
                            { data: "summa", title: langView('field_summa', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_zpu", title: langView('field_nom_zpu', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    });
                },
                // Показать таблицу с данными
                view: function (conts) {
                    cars_detali.table_cont.load(conts);
                    cars_detali.table_cont.obj.draw();
                },
                // Загрузить данные
                load: function (conts) {
                    cars_detali.table_cont.list = conts;
                    cars_detali.table_cont.obj.clear();
                    for (i = 0; i < conts.length; i++) {
                        cars_detali.table_cont.obj.row.add(cars_detali.table_cont.get_row(conts[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    return {

                        "nom_cont": data.nom_cont,
                        "kod_tiporazmer": data.kod_tiporazmer,
                        "gruzp": data.gruzp ? Number(data.gruzp) : null,
                        "ves_tary_arc": data.ves_tary_arc ? Number(Number(data.ves_tary_arc) / 1000).toFixed(3) : null,
                        "vesg": data.collect_k ? Number(Number(data.collect_k.vesg) / 1000).toFixed(3) : null,
                        "brutto": data.ves_tary_arc && data.collect_k ? Number((Number(data.ves_tary_arc) + Number(data.collect_k.vesg)) / 1000).toFixed(3) : null,
                        "kod": data.pay_k && data.pay_k.length > 0 ? data.pay_k[0].kod : null,
                        "summa": data.pay_k && data.pay_k.length > 0 ? Number(Number(data.pay_k[0].summa) / 100).toFixed(3) : null,
                        "nom_zpu": data.zpu_k && data.zpu_k.length > 0 ? data.zpu_k[0].nom_zpu : null,
                        "kol_pac": data.collect_k ? Number(data.collect_k.kol_pac) : null,
                        "kod_etsng": data.collect_k ? Number(data.collect_k.kod_etsng) : null,

                    };
                }
            },
            // SAP
            // Номер вх поставки
            SAP_inbound_delivery_num_input_sipply: $('input#SAP_inbound_delivery_num_input_sipply'),
            // Позиция вх поставки
            SAP_inbound_delivery_num_pos_sipply: $('input#SAP_inbound_delivery_num_pos_sipply'),
            // дата создания вх поставки
            SAP_inbound_delivery_dt_sipply: $('input#SAP_inbound_delivery_dt_sipply'),
            // Ограничение выгрузки
            SAP_inbound_delivery_unloading_ban: $('input#SAP_inbound_delivery_unloading_ban'),
            // Корабль
            SAP_inbound_delivery_ship: $('input#SAP_inbound_delivery_ship'),
            // Код материала
            SAP_inbound_delivery_material_code: $('input#SAP_inbound_delivery_material_code'),
            // Наименование материала
            SAP_inbound_delivery_material_name: $('input#SAP_inbound_delivery_material_name'),
            // Код склада
            SAP_inbound_delivery_warehouse_code: $('input#SAP_inbound_delivery_warehouse_code'),
            // Наименование склада
            SAP_inbound_delivery_warehouse_name: $('input#SAP_inbound_delivery_warehouse_name'),
            // Код склада переадресация 10 км
            SAP_inbound_delivery_warehouse_code_new: $('input#SAP_inbound_delivery_warehouse_code_new'),
            // Наименование склада переадресация 10 км
            SAP_inbound_delivery_warehouse_name_new: $('input#SAP_inbound_delivery_warehouse_name_new'),

            // Кнопка выполнить запрос в САП
            bt_SAP_inbound_delivery_add: $('button#SAP_inbound_delivery_add').on('click', function (event) {
                event.preventDefault();
                LockScreen(langView('mess_save', langs));
                cars_detali.alert_sap_is.clear_message();
                var num_uz = get_input_number_value(cars_detali.uz_doc_num_doc);
                if (num_uz) {
                    cars_detali.add_sap_incoming_supply(cars_detali.select_id, function (result_add_upd_sap_is) {
                        //if (result_add_upd_sap_is && result_add_upd_sap_is.select === true && (result_add_upd_sap_is.add !== -1 && result_add_upd_sap_is.update !== -1)) {
                        if (result_add_upd_sap_is > 0) {
                            cars_detali.alert_sap_is.out_info_message('В БД ИДС обновлена строка входящей поставки САП по выбраному вагону.');
                            cars_detali.view_sap_incoming_supply(cars_detali.select_id, function () {
                                LockScreenOff();
                            });
                        } else {
                            // Ошибка
                            cars_detali.alert_sap_is.out_error_message('Ошибка сохранения в БД ИДС строки входящей поставки САП.');
                            LockScreenOff();
                        };
                    });
                } else {
                    cars_detali.alert_sap_is.out_warning_message('Укажите номер накладной');
                    LockScreenOff();
                }
            }),
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
                    //cars_detali.val_arrival_car.clear_all(); // Очистить ошибки если принимали вагон, с ошибкой
                }
                cars_detali.val_arrival_car.clear_error();
                cars_detali.alert_sap_is.clear_message();// Очистить сообщения по САП
                // Очистить не принятые вагоны.. ! добавить остальные ячейки
                cars_detali.select_otpr = null;
                cars_detali.select_main_otpr = null;
                cars_detali.select_id = null;
                cars_detali.select_num = null;
                cars_detali.select_otpr_vagon = null;
                cars_detali.select_otpr_cont = null;
                cars_detali.select_vagon = null;
                $('div#list-cars-not-arrival').empty();
                cars_detali.clear_cars_epd(); // Очистить ячейки ЭПД
            },
            // Очистить ячейки ЭПД
            clear_cars_epd: function () {
                // Показать кнопку поиска по номеру вагона
                cars_detali.show_booton_not(); // Убрать отображение кнопок

                cars_detali.num_car.val('');
                cars_detali.uz_doc_num_doc.val('');
                cars_detali.uz_doc_num_osn_doc.val('');
                cars_detali.arrival_cars_car_date_adoption_act.setDateTime(null); // уберем дату
                cars_detali.arrival_cars_position_arrival.val(1);


                cars_detali.uz_route_stn_from.val('');
                cars_detali.uz_route_name_from.val('');
                cars_detali.uz_route_name_railway_from.val('');
                cars_detali.bt_route_name_from_add.hide();

                cars_detali.uz_route_stn_on.val('');
                cars_detali.uz_route_name_on.val('');
                cars_detali.uz_route_name_railway_on.val('');
                cars_detali.bt_route_name_on_add.hide();

                cars_detali.uz_route_stn_border.val('');
                cars_detali.uz_route_stn_border_name.val('');
                cars_detali.bt_route_stn_border_add.hide();
                cars_detali.uz_route_border_cross_time.setDateTime(null); // уберем дату

                cars_detali.uz_cargo_client_kod_from.val('');
                cars_detali.uz_cargo_client_name_from.val('');
                cars_detali.bt_client_name_from_add.hide();

                cars_detali.bt_card_vag_add.hide();
                //cars_detali.bt_card_vag_searsh.hide();
                cars_detali.uz_cargo_client_kod_on.val('');
                cars_detali.select_uz_cargo_client_name_on.val(-1);


                cars_detali.val_card_vag.clear_all();       // Очистим ошибки и сообщения в разделе вагоны;
                cars_detali.card_vag_kod_adm.val('');
                cars_detali.card_vag_name_adm.val(-1);
                cars_detali.card_vag_name_rod_vag.val('');
                cars_detali.card_vag_usl_tip.val('');
                cars_detali.card_vag_kol_os.val(-1);
                cars_detali.card_vag_gruzp.val('');
                cars_detali.card_vag_tara.val('');
                cars_detali.card_vag_date_rem_vag.setDateTime(null); // уберем дату
                cars_detali.card_vag_date_rem_uz.setDateTime(null); // уберем дату
                cars_detali.card_vag_name_owner.val('');
                cars_detali.card_vag_rent_start.setDateTime(null); // уберем дату
                cars_detali.card_vag_name_operator.val('');
                cars_detali.card_vag_limiting_loading.val('');
                cars_detali.card_vag_type_ownership.val(-1);
                cars_detali.card_vag_note.val('');

                cars_detali.uz_vag_condition_arrival.val(-1);
                cars_detali.uz_vag_type_wagon.val(-1);

                cars_detali.uz_vag_station_on_amkr.val(-1);
                cars_detali.uz_vag_devision_on_amkr_kod.val('');
                cars_detali.uz_vag_devision_on_amkr_name.val('');
                //cars_detali.uz_vag_devision_on_amkr.val(-1);

                cars_detali.uz_vag_gruzp.val('');
                cars_detali.uz_vag_ves_tary_arc.val('');
                cars_detali.uz_vag_u_tara.val('');

                cars_detali.table_dosc.view([]);
                cars_detali.table_acts.view([]);
                $('span#count-docs').text('');
                $('span#count-acts').text('');

                cars_detali.uz_rask_kod_plat.val('');
                cars_detali.uz_rask_name_plat.val('');
                cars_detali.uz_rask_name_plat_add.hide();
                cars_detali.uz_rask_distance_way.val('');
                cars_detali.uz_rask_pl_pay_summa.val('');

                cars_detali.uz_cargo_kod_etsng.val('');
                cars_detali.uz_cargo_name_etsng.val('');
                cars_detali.uz_cargo_name_etsng_add.hide();
                cars_detali.uz_cargo_kod_gng.val('');
                cars_detali.uz_cargo_name_gng.val('');
                cars_detali.uz_cargo_name_gng_add.hide();
                cars_detali.uz_cargo_group_cargo.val('');

                cars_detali.uz_cargo_certificate_data.val(-1);
                cars_detali.uz_cargo_commercial_condition.val(-1);
                cars_detali.uz_cargo_cargo_analysis.val('');

                cars_detali.uz_cargo_kol_pac.val('');
                cars_detali.uz_cargo_vesg_doc.val('');
                cars_detali.uz_cargo_nom_zpu.val('');

                cars_detali.uz_cargo_danger_class.val('');
                cars_detali.uz_cargo_danger_name.val(-1);
                cars_detali.uz_cargo_danger_kod.val('');

                cars_detali.table_cont.view([]);
                $('span#count-cont').text('');
            },
            // Очистить кнопки добавить информацию в справочник
            clear_button_add: function () {
                cars_detali.bt_route_name_from_add.hide();
                cars_detali.bt_route_name_on_add.hide();
                cars_detali.bt_route_stn_border_add.hide();
                cars_detali.bt_client_name_from_add.hide();
                //cars_detali.bt_card_vag_add.hide();
                cars_detali.uz_rask_name_plat_add.hide();
                cars_detali.uz_cargo_name_etsng_add.hide();
                cars_detali.uz_cargo_name_gng_add.hide();
            },
            //-------------------------------------------------------------------------------------
            // Обновление компонентов раздела "Информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            // Обновить компонент список грузоотправителей
            update_list_shipper: function (text) {
                cars_detali.uz_cargo_client_name_from = initAutocomplete(
                    this.uz_cargo_client_name_from,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListShipper('code', 'shipper_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_shipper_manual,
                    text
                );
            },
            // Обновить компонент список грузополучателей
            update_list_consignee: function (code) {
                cars_detali.select_uz_cargo_client_name_on = cd_initSelect(
                    $('select#uz_cargo_client_name_on'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListConsignee('code', 'name', null, function (i) { return !i.auxiliary }),
                    null,
                    code ? Number(code) : -1,
                    function (event) {
                        event.preventDefault();
                        var code = $(this).val();
                        if (Number(code) !== -1) {
                            cars_detali.uz_cargo_client_kod_on.val(code);
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_client_kod_on, "");
                        } else {
                            cars_detali.uz_cargo_client_kod_on.val("");
                            cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_client_kod_on, "Не указан код грузополучателя");
                        }
                        if (Number(code) === 7932) {
                            if (cars_detali.car_status === 2) {
                                // Если ручной режим уже выбрат, тогда внем и остаемся
                                cars_detali.set_mode(true);
                            } else {
                                // Иначе вернуть в автомат
                                cars_detali.set_mode(false);
                            }
                        } else {
                            cars_detali.set_mode(true);
                        }
                    },
                    null);
            },
            // Обновить компонент станция отправки
            update_list_station_name_from: function (text) {
                cars_detali.uz_route_name_from = initAutocomplete(
                    this.uz_route_name_from,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListExternalStation('code', 'station_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_station_from_manual,
                    text
                );
            },
            //
            update_list_station_name_on: function (text) {
                cars_detali.uz_route_name_on = initAutocomplete(
                    this.uz_route_name_on,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListExternalStation('code', 'station_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_station_on_manual,
                    text
                );
            },
            // Обновить компонент пограничные пункты
            update_list_station_border: function (text) {
                cars_detali.uz_route_stn_border_name = initAutocomplete(
                    this.uz_route_stn_border_name,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListBorderCheckpoint('code', 'station_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_station_border_manual,
                    text
                );
            },
            // Обновить компонент станций АМКР
            update_list_station_on_amkr: function (id) {
                cars_detali.uz_vag_station_on_amkr = cd_initSelect(
                    $('select#uz_vag_station_on_amkr'),
                    { lang: lang },
                    [{ value: 0, text: 'Под погрузку' }].concat(cars_detali.ids_inc.ids_dir.getListStation('id', 'station_name', cars_detali.lang, function (i) { return !i.station_uz })),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                        cars_detali.validation_vag_station_on_amkr(true, false);
                    },
                    null);
            },
            // Обновить компонент станций АМКР
            // Обновить компонент подразделения АМКР
            update_list_devision_on_amkr: function (text) {
                cars_detali.uz_vag_devision_on_amkr_name = initAutocomplete(
                    this.uz_vag_devision_on_amkr_name,
                    { lang: cars_detali.lang, minLength: 1 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListDivisions('code', 'division_abbr', cars_detali.lang, null), 'text'),
                    cars_detali.view_devision_on_amkr_manual,
                    text
                );
            },
            // Обновить компонент Администрации
            update_list_adm: function (id) {
                cars_detali.card_vag_name_adm = cd_initSelect(
                    $('select#card_vag_name_adm'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListCountrys('id', 'countrys_name', cars_detali.lang, function (i) { return i.code_sng !== null ? true : false; }),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                        cars_detali.card_vag_kod_adm.val(cars_detali.ids_inc.ids_dir.getValue_Countrys_Of_ID(Number(id), 'code_sng'));
                        cars_detali.validation_adm(true, true);
                    },
                    null);
            },
            // Обновить компонент род вагона
            update_list_rod: function (text) {
                cars_detali.card_vag_name_rod_vag = initAutocomplete(
                    this.card_vag_name_rod_vag,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListGenusWagons('rod_uz', 'genus', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_rod_manual,
                    text
                );
            },
            // Обновить компонент владелец
            update_list_owner: function (text) {
                cars_detali.card_vag_name_owner = cars_detali.card_vag_name_owner.autocomplete({
                    minLength: 2,
                    source: getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListOwnersWagons('id', 'owner', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент оператор
            update_list_operator: function (text) {
                cars_detali.card_vag_name_operator = cars_detali.card_vag_name_operator.autocomplete({
                    minLength: 2,
                    source: getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListOperatorsWagons('id', 'operators', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент станций АМКР
            update_list_kol_os: function (id) {
                cars_detali.card_vag_kol_os = cd_initSelect(
                    $('select#card_vag_kol_os'),
                    { lang: lang },
                    [{ value: 0, text: "0" }, { value: 4, text: "4" }, { value: 8, text: "8" }, { value: 12, text: "12" }, { value: 16, text: "16" }, { value: 32, text: "32" }],
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                        cars_detali.validation_vag_kol_os(true, true);
                    },
                    null);
            },
            // Обновить компонент ограничение погрузки
            update_list_limiting_loading: function (text) {
                cars_detali.card_vag_limiting_loading = cars_detali.card_vag_limiting_loading.autocomplete({
                    minLength: 2,
                    source: getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListLimitingLoading('id', 'limiting_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент признак собственности
            update_list_type_ownership: function (id) {
                cars_detali.card_vag_type_ownership = cd_initSelect(
                    $('select#card_vag_type_ownership'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListTypeOwnerShip('id', 'type_ownership', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент годность по прибытию
            update_list_condition_arrival: function (id) {
                cars_detali.uz_vag_condition_arrival = cd_initSelect(
                    $('select#uz_vag_condition_arrival'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getList2ConditionArrival('id', 'condition_abbr', 'condition_name', cars_detali.lang, function (i) {
                        return i.delete === null;
                    }),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                        cars_detali.validation_vag_condition_arrival(true, true);
                    },
                    null);
            },
            // Обновить компонент тип вагона
            update_list_type_wagon: function (id) {
                cars_detali.uz_vag_type_wagon = cd_initSelect(
                    $('select#uz_vag_type_wagon'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListTypeWagons('id', 'type', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент платильщик по прибытию
            update_list_name_plat: function (text) {
                cars_detali.uz_rask_name_plat = initAutocomplete(
                    this.uz_rask_name_plat,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListPayerSender('code', 'payer_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_plat_manual,
                    text
                );
            },
            // Обновить компонент грузы ЕТ СНГ
            update_list_cargo_etsng: function (text) {
                cars_detali.uz_cargo_name_etsng = initAutocomplete(
                    this.uz_cargo_name_etsng,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListCargoETSNG('code', 'cargo_etsng_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_cargo_etsng_manual,
                    text
                );
            },
            // Обновить компонент грузы ГНГ
            update_list_cargo_gng: function (text) {
                cars_detali.uz_cargo_name_gng = initAutocomplete(
                    this.uz_cargo_name_gng,
                    { lang: cars_detali.lang, minLength: 2 },
                    getAutocompleteList(cars_detali.ids_inc.ids_dir.getListCargoGNG('code', 'cargo_gng_name', cars_detali.lang, null), 'text'),
                    cars_detali.view_epd_cargo_gng_manual,
                    text
                );

                //cars_detali.uz_cargo_name_gng = this.uz_cargo_name_gng.autocomplete({
                //    minLength: 2,
                //    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListCargoGNG('code', 'cargo_gng_name', cars_detali.lang, null), 'text'),
                //    change: function (event, ui) {

                //    },
                //    select: function (event, ui) {

                //    }
                //}).val(text ? text : '');
            },
            // Обновить компонент сертификационные данные
            update_list_certificate_data: function (id) {
                cars_detali.uz_cargo_certificate_data = cd_initSelect(
                    $('select#uz_cargo_certificate_data'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListCertificationData('id', 'certification_data', cars_detali.lang, null).sort(function (a, b) {
                        if (a.text < b.text)
                            return -1
                        if (a.text > b.text)
                            return 1
                        return 0
                    }),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент комерчиские данные
            update_list_commercial_condition: function (id) {
                cars_detali.uz_cargo_commercial_condition = cd_initSelect(
                    $('select#uz_cargo_commercial_condition'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListCommercialCondition('id', 'commercial_condition', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить класс опасности
            update_list_danger_name: function (code) {
                var listHazardClass = cars_detali.ids_inc.ids_dir.getListHazardClass('code', 'hazard_class', cars_detali.lang, null);

                cars_detali.uz_cargo_danger_name = cd_initSelect(
                    $('select#uz_cargo_danger_name'),
                    { lang: lang },
                    listHazardClass,
                    null,
                    code ? code : -1,
                    function (event) {
                        event.preventDefault();
                        var code = $.trim($(this).val());
                        if (code === "-1") {
                            code = "";
                        }
                        cars_detali.uz_cargo_danger_class.val(code);
                    },
                    null);
            },
            //-------------------------------------------------------------------------------------
            // Отображение компонентов раздела "Информация о вагоне и ЭПД"
            //-------------------------------------------------------------------------------------
            // Показать грузоотправителя и грузополучателя
            view_epd_client: function (otpr) {
                cars_detali.select_uz_cargo_client_name_on.prop("disabled", false);
                var client_kod_from = null, client_name_from = null, client_kod_on = null, client_name_on = null;
                if (otpr && otpr.client && otpr.client.length > 0) {
                    otpr.client.forEach(function (el, i, arr) {
                        if (Number(el.type) === 1) {
                            client_kod_from = el.kod;
                            client_name_from = el.name;
                            var shipper = cars_detali.ids_inc.ids_dir.getShipper_Of_Code(el.kod); // Иногда код россии пустой
                            if (!el.kod || shipper) {
                                cars_detali.bt_client_name_from_add.hide();
                            } else {
                                cars_detali.bt_client_name_from_add.show();
                            }
                        };
                        if (Number(el.type) === 2) {
                            client_kod_on = el.kod;
                            client_name_on = el.name;
                            cars_detali.select_uz_cargo_client_name_on.prop("disabled", true);
                        };
                    });
                }
                cars_detali.uz_cargo_client_kod_from.val(client_kod_from);
                cars_detali.uz_cargo_client_name_from.val(client_name_from);
                cars_detali.uz_cargo_client_kod_on.val(client_kod_on);
                cars_detali.select_uz_cargo_client_name_on.val(client_kod_on);
            },
            // Показать грузоотправителя (ручной режим)
            view_epd_shipper_manual: function (text) {
                var code = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getShipper_Of_CultureName('shipper_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_client_kod_from, "");
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_client_kod_from, "Указанного грузоотправителя нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_client_kod_from, "Не указан код грузоотправителя");
                }
                cars_detali.uz_cargo_client_kod_from.val(code);
            },
            // Показать станцию отправления
            view_epd_station_from: function (otpr) {
                var stn_from = null, name_from = null, ir_name_from = null;
                if (otpr && otpr.route && otpr.route.length > 0) {
                    stn_from = cars_detali.select_otpr.route[0].stn_from;
                    name_from = cars_detali.select_otpr.route[0].name_from;
                    var enstation = cars_detali.ids_inc.ids_dir.getExternalStation_Of_Code(stn_from); // Определим запись в справочнике
                    if (enstation) {
                        cars_detali.bt_route_name_from_add.hide();
                        if (enstation.Directory_InlandRailway) {
                            ir_name_from = cars_detali.ids_inc.ids_dir.getValueCultureObj(enstation.Directory_InlandRailway, 'inlandrailway_name');
                        }
                    } else {
                        cars_detali.bt_route_name_from_add.show();
                        // Определим дорогу
                        cars_detali.ids_inc.uz_dir.getStationsOfCodeCS(stn_from, function (external_station) {
                            if (external_station) {
                                var ir_from = cars_detali.ids_inc.uz_dir.list_internal_railroad.find(function (o) {
                                    return o.id === external_station.id_ir;
                                });
                                if (ir_from) {
                                    cars_detali.uz_route_name_railway_from.val(ir_from.internal_railroad);
                                }

                            }
                        });
                        //var ir_from = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn_from);
                        //if (ir_from) {
                        //    ir_name_from = ir_from.internal_railroad;
                        //} else {

                        //}
                    }
                }
                cars_detali.uz_route_stn_from.val(stn_from);
                cars_detali.uz_route_name_from.val(name_from);
                cars_detali.uz_route_name_railway_from.val(ir_name_from);
            },
            // Показать станцию отправления (ручной режим)
            view_epd_station_from_manual: function (text) {
                var code = null;
                var irw = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getExternalStation_Of_CultureName('station_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        if (obj[0].Directory_InlandRailway) {
                            irw = cars_detali.ids_inc.ids_dir.getValueCultureObj(obj[0].Directory_InlandRailway, 'inlandrailway_name');
                        }
                        cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_from, "");
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_route_stn_from, "Указанной станции отправки нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_arrival_car.set_control_error(cars_detali.uz_route_stn_from, "Не указан код станции отправки");
                }
                cars_detali.uz_route_stn_from.val(code);
                cars_detali.uz_route_name_railway_from.val(irw);
            },
            // Показать станцию прибытия
            view_epd_station_on: function (otpr) {
                var stn_on = null, name_on = null, ir_name_on = null;
                if (otpr && otpr.route && otpr.route.length > 0) {
                    stn_on = cars_detali.select_otpr.route[0].stn_to;
                    name_on = cars_detali.select_otpr.route[0].name_to;
                    var enstation = cars_detali.ids_inc.ids_dir.getExternalStation_Of_Code(stn_on); // Определим запись в справочнике
                    if (enstation) {
                        cars_detali.bt_route_name_on_add.hide();
                        if (enstation.Directory_InlandRailway) {
                            ir_name_on = cars_detali.ids_inc.ids_dir.getValueCultureObj(enstation.Directory_InlandRailway, 'inlandrailway_name');
                        }
                    } else {
                        cars_detali.bt_route_name_on_add.show();
                        // Определим дорогу
                        var ir_on = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn_on);
                        if (ir_on) {
                            ir_name_on = ir_on.internal_railroad;
                        }
                    }
                }
                cars_detali.uz_route_stn_on.val(stn_on);
                cars_detali.uz_route_name_on.val(name_on);
                cars_detali.uz_route_name_railway_on.val(ir_name_on);
            },
            // Показать станцию прибытия (ручной режим)
            view_epd_station_on_manual: function (text) {
                var code = null;
                var irw = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getExternalStation_Of_CultureName('station_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        if (obj[0].Directory_InlandRailway) {
                            irw = cars_detali.ids_inc.ids_dir.getValueCultureObj(obj[0].Directory_InlandRailway, 'inlandrailway_name');
                        }
                        cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_on, "");
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_route_stn_on, "Указанной станции прибытия нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_arrival_car.set_control_error(cars_detali.uz_route_stn_on, "Не указан код станции прибытия");
                }
                cars_detali.uz_route_stn_on.val(code);
                cars_detali.uz_route_name_railway_on.val(irw);
            },
            // Показать пограничный пункт
            view_epd_station_border: function (otpr) {
                var cross_time = null, stn = null, stn_name = null;
                if (otpr && otpr.route && otpr.route.length > 0) {
                    // Определим "Погран переход"
                    if (otpr.route[0].joint.length > 0) {
                        for (i = 0; i < otpr.route[0].joint.length; i++) {
                            var joint = otpr.route[0].joint[i];
                            if (joint.admin === 22) {
                                cross_time = joint.cross_time;
                                stn = joint.stn;
                                stn_name = joint.stn_name;
                                var border = cars_detali.ids_inc.ids_dir.getBorderCheckpoint_Of_Code(stn); // Определим запись в справочнике
                                if (border) {
                                    cars_detali.bt_route_stn_border_add.hide();
                                } else {
                                    cars_detali.bt_route_stn_border_add.show();
                                }
                            }
                        }
                    }
                }
                cars_detali.uz_route_stn_border.val(stn);
                cars_detali.uz_route_stn_border_name.val(stn_name);
                // Показать дату прохождения 
                cars_detali.uz_route_border_cross_time.setDateTime(cross_time !== null ? cross_time.replace(/T/g, ' ') : null);
            },
            // Показать пограничный пункт (ручной режим)
            view_epd_station_border_manual: function (text) {
                var code = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getBorderCheckpoint_Of_CultureName('station_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_border, "");
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_route_stn_border, "Указанного пограничного пункта нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_route_stn_border, "");
                }
                cars_detali.uz_route_stn_border.val(code);
            },
            // Показать администрацию
            view_epd_adm: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_name_adm.val(vagon.id_countrys);
                    cars_detali.card_vag_kod_adm.val(cars_detali.ids_inc.ids_dir.getValue_Countrys_Of_ID(vagon.id_countrys, 'code_sng'));
                } else {
                    // Тогда проверим режим, вагон вводится в ручную
                    if (cars_detali.select_vagon_mode) {
                        cars_detali.card_vag_name_adm.val(0);
                        cars_detali.card_vag_kod_adm.val(cars_detali.ids_inc.ids_dir.getValue_Countrys_Of_ID(0, 'code_sng'));
                    }
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать род вагона
            view_epd_rod: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_name_rod_vag.val(cars_detali.ids_inc.ids_dir.getValueCulture_GenusWagons_Of_ID(vagon.id_genus, 'genus'));
                } else {
                    // Тогда проверим режим, вагон вводится в ручную
                    if (cars_detali.select_vagon_mode) {
                        cars_detali.card_vag_name_rod_vag.val(cars_detali.ids_inc.ids_dir.getValueCulture_GenusWagons_Of_ID(0, 'genus'));
                    }
                }
            },
            // Показать род вагона (ручной режим)
            view_epd_rod_manual: function (text) {
                cars_detali.card_vag_name_rod_vag.val(text);
                cars_detali.validation_rod_vag(true, true);
            },
            // Показать тип цистерны
            view_epd_usl_tip: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_usl_tip.val(vagon.usl_tip);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать кол осей
            view_epd_kol_os: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_kol_os.val(vagon.kol_os);
                } else {
                    // Тогда проверим режим, вагон вводится в ручную
                    if (cars_detali.select_vagon_mode) {
                        cars_detali.card_vag_kol_os.val(0);
                    }
                }
            },
            // Показать грузоподъемность
            view_epd_gruzp_uz: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_gruzp.val(vagon.gruzp);
                } else {
                    // Тогда проверим режим, вагон вводится в ручную
                    if (cars_detali.select_vagon_mode) {
                        cars_detali.card_vag_gruzp.val(0);
                    }
                }
            },
            // Показать тару
            view_epd_tara_uz: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_tara.val(Number(vagon.tara).toFixed(2));
                } else {
                    // Тогда проверим режим, вагон вводится в ручную
                    if (cars_detali.select_vagon_mode) {
                        cars_detali.card_vag_tara.val(0);
                    }
                }
            },
            // Показать дату ремонта вагона по уз
            view_epd_date_rem_vag: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_date_rem_vag.setDateTime(vagon.date_rem_vag !== null ? vagon.date_rem_vag.replace(/T/g, ' ') : null);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать дату ремонта вагона по уз
            view_epd_date_rem_uz: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_date_rem_uz.setDateTime(vagon.date_rem_uz !== null ? vagon.date_rem_uz.replace(/T/g, ' ') : null);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать владельца
            view_epd_owner: function (vagon) {
                if (vagon) {
                    // Обновить справочник
                    cars_detali.ids_inc.ids_dir.loadOwnersWagons(function () {
                        cars_detali.card_vag_name_owner.val(cars_detali.ids_inc.ids_dir.getValueCulture_OwnersWagons_Of_ID(vagon.id_owner, 'owner'));
                    });
                    //if (vagon.id === 0) {
                    //    // Обновить справочник
                    //    cars_detali.ids_inc.ids_dir.loadOwnersWagons(function () {
                    //        cars_detali.card_vag_name_owner.val(cars_detali.ids_inc.ids_dir.getValueCulture_OwnersWagons_Of_ID(vagon.id_owner, 'owner'));
                    //    });
                    //} else {
                    //    cars_detali.card_vag_name_owner.val(cars_detali.ids_inc.ids_dir.getValueCulture_OwnersWagons_Of_ID(vagon.id_owner, 'owner'));
                    //}
                    //cars_detali.card_vag_name_owner.prop("disabled", vagon.card_vag_name_owner); // если запрет смены владельца
                } else {
                    // Тогда проверим режим, вагон вводится в ручную
                    if (cars_detali.select_vagon_mode) {
                        cars_detali.card_vag_name_owner.val(cars_detali.ids_inc.ids_dir.getValueCulture_OwnersWagons_Of_ID(0, 'owner'));
                    }
                }
            },
            // Показать дату начала аренды
            view_epd_rent_start: function (vagon) {
                // Получим текущую ренту
                var current_rent = cars_detali.get_current_rent(vagon);
                if (current_rent) {
                    cars_detali.card_vag_rent_start.setDateTime(current_rent.rent_start !== null ? current_rent.rent_start.replace(/T/g, ' ') : null);
                    cars_detali.card_vag_rent_start.enable(false);
                }

                //if (vagon.rent_start) {
                //    cars_detali.card_vag_rent_start.setDateTime(vagon.rent_start !== null ? vagon.rent_start.replace(/T/g, ' ') : null);
                //    cars_detali.card_vag_rent_start.enable(false);
                //} else {
                //    cars_detali.card_vag_rent_start.setDateTime(null);
                //    cars_detali.card_vag_rent_start.enable(cars_detali.is_edit_mode_of_element(cars_detali.card_vag_rent_start.obj));
                //}

                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать оператор
            view_epd_operator: function (vagon) {
                // Получим текущую ренту
                var current_rent = cars_detali.get_current_rent(vagon);
                if (current_rent) {
                    cars_detali.ids_inc.ids_dir.loadOperatorsWagons(function () {
                        cars_detali.card_vag_name_operator.val(cars_detali.ids_inc.ids_dir.getValueCulture_OperatorsWagons_Of_ID(current_rent.id_operator, 'operators'));
                    });
                }
            },
            // Показать ограничения погрузки
            view_epd_limiting_loading: function (vagon) {
                // Получим текущую ренту
                var current_rent = cars_detali.get_current_rent(vagon);
                if (current_rent) {
                    var res = cars_detali.ids_inc.ids_dir.getValueCulture_LimitingLoading_Of_Code(current_rent.id_limiting, 'limiting_name');
                    cars_detali.card_vag_limiting_loading.val(res);
                }

                //if (vagon && vagon.Directory_WagonsRent && vagon.Directory_WagonsRent.length > 0) {
                //    var rent = vagon.Directory_WagonsRent.filter(function (i) {
                //        return (i.rent_end) ? false : true;
                //    });

                //    if (rent && rent.length > 0) {
                //        var res = cars_detali.ids_inc.ids_dir.getValueCulture_LimitingLoading_Of_Code(rent[0].id_limiting, 'limiting_name');
                //        cars_detali.card_vag_limiting_loading.val(res);
                //    }
                //}
                //if (vagon) {
                //    var res = cars_detali.ids_inc.ids_dir.getValueCulture_LimitingLoading_Of_Code(vagon.id_limiting, 'limiting_name');
                //    cars_detali.card_vag_limiting_loading.val(res);
                //}
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать признак собственности
            view_epd_type_ownership: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_type_ownership.val(vagon.id_type_ownership);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать ограничение УЗ
            view_epd_card_vag_note: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_note.val(vagon.note);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать всю информацию по справочнику вагона
            view_epd_card_vag: function (vagon) {
                cars_detali.view_epd_adm(vagon);
                cars_detali.view_epd_rod(vagon);
                cars_detali.view_epd_usl_tip(vagon);
                cars_detali.view_epd_kol_os(vagon);
                cars_detali.view_epd_gruzp_uz(vagon);
                cars_detali.view_epd_tara_uz(vagon);
                cars_detali.view_epd_date_rem_vag(vagon);
                cars_detali.view_epd_date_rem_uz(vagon);
                cars_detali.view_epd_owner(vagon);
                cars_detali.view_epd_rent_start(vagon);
                cars_detali.view_epd_operator(vagon);
                cars_detali.view_epd_limiting_loading(vagon);
                cars_detali.view_epd_type_ownership(vagon);
                cars_detali.view_epd_card_vag_note(vagon);
            },
            // Показать всю информацию по вагону из ЭПД
            view_epd_uz_vag: function (vagon) {
                if (vagon) {
                    cars_detali.uz_vag_gruzp.val(vagon.gruzp);
                    cars_detali.uz_vag_ves_tary_arc.val(vagon.ves_tary_arc ? Number(Number(vagon.ves_tary_arc) / 1000).toFixed(3) : null);
                    cars_detali.uz_vag_u_tara.val(vagon.u_tara ? Number(Number(vagon.u_tara) / 1000).toFixed(3) : null);
                }
            },
            // Показать доп документацию
            view_epd_docs: function (otpr) {
                if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
                    $('span#count-docs').text(otpr.sender_doc.length);
                    cars_detali.table_dosc.view(otpr.sender_doc);
                } else {
                    $('span#count-docs').text('');
                }
            },
            // Показать акты
            view_epd_acts: function (otpr) {
                if (otpr && otpr.acts && otpr.acts.length > 0) {
                    var acts = otpr.acts.filter(function (i) {
                        if (Number(i.vagon_nom) === cars_detali.select_num) return true; else return false;
                    });
                    $('span#count-acts').text(acts.length > 0 ? acts.length : '');
                    cars_detali.table_acts.view(acts);
                } else {
                    $('span#count-acts').text('');
                }
            },
            // Показать плательщика
            view_epd_plat: function (otpr) {
                var pl = null;
                if (otpr && otpr.pl && otpr.pl.length > 0) {
                    if (otpr.pl.length === 1) {
                        // если плательщик один тогда берем его
                        pl = otpr.pl[0];
                    } else {
                        // если плательщиков много тогда берем только УЗ или только отправителя type=0
                        for (var i = 0; i < otpr.pl.length; i++) {
                            if (Number(otpr.pl[i].carrier_kod) === 22 || Number(otpr.pl[i].type) === 0) {
                                pl = otpr.pl[i];
                                break;
                            }

                        }
                    }
                    // Если опрелен платильщик отобразим его
                    if (pl) {
                        var plat = cars_detali.ids_inc.ids_dir.getPayerSender_Of_Code(pl.kod_plat); // Определим запись в справочнике
                        if (plat) {
                            cars_detali.uz_rask_name_plat_add.hide();
                        } else {
                            cars_detali.uz_rask_name_plat_add.show();
                        }
                        cars_detali.uz_rask_kod_plat.val(pl.kod_plat);
                        cars_detali.uz_rask_name_plat.val(pl.name_plat);
                    }
                }
            },
            // Показать плательщика (ручной режим)
            view_epd_plat_manual: function (text) {
                var code = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getPayerSender_Of_CultureName('payer_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_rask_kod_plat, "");
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_rask_kod_plat, "Указанного плательщика по отправке нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_arrival_car.set_control_error(cars_detali.uz_rask_kod_plat, "Не указан плательщик по отправке");
                }
                cars_detali.uz_rask_kod_plat.val(code);
                //cars_detali.validation_vagon_pay(true, true);
            },
            // Показать тарифное расстояние
            view_epd_distance_way: function (otpr) {
                if (otpr) {
                    cars_detali.uz_rask_distance_way.val(otpr.distance_way);
                }
            },
            // Показать тариф при выдаче по вагону
            view_epd_pay_summa_of_vagon: function (vagon) {
                if (vagon && vagon.pay_v && vagon.pay_v.length > 0) {
                    cars_detali.view_epd_pay_summa(vagon.pay_v);
                }
            },
            // Показать тариф при выдаче по контейнеру
            view_epd_pay_summa_of_cont: function (conts) {
                if (conts && conts.length > 0) {
                    var pays = [];
                    for (var i = 0; i < conts.length; i++) {
                        pays.push(conts[i].pay_k && conts[i].pay_k.length > 0 ? conts[i].pay_k[0] : []);
                    }
                    cars_detali.view_epd_pay_summa(pays);
                }
            },
            // Показать тариф при выдаче
            view_epd_pay_summa: function (pays) {
                pl_summ = 0;
                if (pays && pays.length > 0) {
                    for (var i = 0; i < pays.length; i++) {
                        if (Number(pays[i].kod) === 1 || Number(pays[i].kod) === 21) {
                            pl_summ += pays[i].summa ? Number(pays[i].summa) : 0;
                        }
                    }
                }
                cars_detali.uz_rask_pl_pay_summa.val(pl_summ ? Number(Number(pl_summ) / 100).toFixed(2) : '');
            },
            // Показать груз и группу ет снг вагона
            view_epd_cargo_etsng_of_vagon: function (vagon) {
                var code = null, name = null;
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    code = vagon.collect_v[0].kod_etsng ? Number(vagon.collect_v[0].kod_etsng) : null;
                    name = vagon.collect_v[0].name_etsng;
                    cars_detali.view_epd_cargo_etsng(code, name);
                }
            },
            // Показать груз и группу ет снг контейнеров вагона
            view_epd_cargo_etsng_of_cont: function (conts) {
                var code = null, name = null;
                if (conts && conts.length > 0) {
                    code = conts[0].collect_k.kod_etsng ? Number(conts[0].collect_k.kod_etsng) : null;
                    name = conts[0].collect_k.name_etsng;
                    cars_detali.view_epd_cargo_etsng(code, name);
                }
            },
            // Показать груз и группу ет снг
            view_epd_cargo_etsng: function (code, name) {
                if (!name && code > 0) {
                    var uz_cargo = cars_detali.ids_inc.uz_dir.getCargo_Internal_Of_ETSNGCode(code);
                    if (uz_cargo && uz_cargo.length > 0) {
                        name = uz_cargo[0].name_etsng;
                    }
                }
                cars_detali.select_id_cargo = null; // сбросим выбранный груз
                var etsng = cars_detali.ids_inc.ids_dir.list_cargo_etsng.filter(function (i) {
                    if (i.code === code && i['cargo_etsng_name_' + cars_detali.lang] === name) return true; else false;
                });
                if (etsng && etsng.length > 0) {
                    cars_detali.uz_cargo_name_etsng_add.hide();
                    var cargo = cars_detali.ids_inc.ids_dir.list_cargo.filter(function (i) {
                        if (i.id_cargo_etsng === etsng[0].id) return true; else false;
                    });
                    if (cargo && cargo.length > 0) {
                        var cargo_group = cars_detali.ids_inc.ids_dir.getCargoGroup_Of_ID(cargo[0].id_group);
                        cars_detali.uz_cargo_group_cargo.val(cars_detali.ids_inc.ids_dir.getValueObj(cargo_group, 'cargo_group_name', cars_detali.lang));
                        cars_detali.select_id_cargo = cargo[0].id; // сохраним выбранный груз
                    }

                } else {
                    cars_detali.uz_cargo_name_etsng_add.show();
                }
                cars_detali.uz_cargo_kod_etsng.val(code);
                cars_detali.uz_cargo_name_etsng.val(name);

            },
            // Показать груз и группу ет снг (ручной режим)
            view_epd_cargo_etsng_manual: function (text) {
                var code = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getCargoETSNG_Of_CultureName('cargo_etsng_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        var cargo = cars_detali.ids_inc.ids_dir.getCargo_Of_ETSNGCodeCultureName(code, text, cars_detali.lang);
                        if (cargo && cargo.length > 0) {
                            var cargo_group = cars_detali.ids_inc.ids_dir.getCargoGroup_Of_ID(cargo[0].id_group);
                            cars_detali.uz_cargo_group_cargo.val(cars_detali.ids_inc.ids_dir.getValueObj(cargo_group, 'cargo_group_name', cars_detali.lang));
                            cars_detali.select_id_cargo = cargo[0].id; // сохраним выбранный груз
                            cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_kod_etsng, "");
                        } else {
                            cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_kod_etsng, "Указанного груза нет в справочнике ИДС.");
                        }
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_kod_etsng, "Указанного кода груза ЕТ СНГ нет в справочнике ИДС.");
                    }
                } else {
                    cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_kod_etsng, "Не указан код груза ЕТ СНГ");
                }
                cars_detali.uz_cargo_kod_etsng.val(code);
            },
            // Показать груз и группу гнг вагона
            view_epd_cargo_gng_of_vagon: function (vagon) {
                var code = null, name = null;
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    code = vagon.collect_v[0].kod_gng ? Number(vagon.collect_v[0].kod_gng) : null;
                    name = vagon.collect_v[0].name_gng;
                    cars_detali.view_epd_cargo_gng(code, name);
                }
            },
            // Показать груз и группу гнг контейнеров вагона
            view_epd_cargo_gng_of_cont: function (conts) {
                var code = null, name = null;
                if (conts && conts.length > 0) {
                    code = conts[0].collect_k.kod_gng ? Number(conts[0].collect_k.kod_gng) : null;
                    name = conts[0].collect_k.name_gng;
                    cars_detali.view_epd_cargo_gng(code, name);
                }
            },
            // Показать груз и группу гнг
            view_epd_cargo_gng: function (code, name) {
                cars_detali.select_id_cargo_gng = null; // сбросим выбранный груз гнг
                var gng = cars_detali.ids_inc.ids_dir.list_cargo_gng.filter(function (i) {
                    if (i.code === code && i['cargo_gng_name_' + cars_detali.lang] === name) return true; else false;
                });
                if (!code || (gng && gng.length > 0)) {
                    cars_detali.select_id_cargo_gng = gng.length > 0 ? gng[0].id : null; // добавим выбранный груз ГНГ
                    cars_detali.uz_cargo_name_gng_add.hide();
                } else {
                    if (gng.length > 0) {
                        cars_detali.select_id_cargo_gng = gng[0].id; // добавим выбранный груз ГНГ
                        cars_detali.uz_cargo_name_gng_add.hide();
                    }
                    cars_detali.uz_cargo_name_gng_add.show();
                }
                cars_detali.uz_cargo_kod_gng.val(code);
                cars_detali.uz_cargo_name_gng.val(name);

            },
            // Показать груз и группу гнг (ручной режим)
            view_epd_cargo_gng_manual: function (text) {

                var code = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getCargoGNG_Of_CultureName('cargo_gng_name', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_kod_gng, "");
                    } else {
                        cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_kod_gng, "Указанного кода груза ГНГ нет в справочнике ИДС.");
                    }
                } else {
                    //cars_detali.val_arrival_car.set_control_error(cars_detali.uz_cargo_kod_gng, "Не указан код груза ГНГ");
                    cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_cargo_kod_gng, "");
                }
                cars_detali.uz_cargo_kod_gng.val(code);
            },
            // Показать анализ груза
            view_epd_cargo_analysis: function (otpr) {
                //if (otpr && otpr.text) {
                //    cars_detali.uz_cargo_cargo_analysis.val(otpr.text.zayava);
                //}
                cars_detali.uz_cargo_cargo_analysis.val(cars_detali.get_text_zayava_epd(otpr));
            },
            // Показать анализ груза
            view_epd_kol_pac: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_kol_pac.val(vagon.collect_v[0].kol_pac);
                }
            },
            // Показать вес груза вагона по ЭПД
            view_epd_vesg_doc_of_vagon: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_vesg_doc.val(vagon.collect_v[0].vesg ? Number(Number(vagon.collect_v[0].vesg) / 1000).toFixed(3) : null);
                }
            },
            // Показать вес груза контейнеров вагона по ЭПД
            view_epd_vesg_doc_of_cont: function (conts) {
                if (conts && conts.length > 0) {
                    var vesg = 0;
                    for (var i = 0; i < conts.length; i++) {
                        vesg += conts[i].collect_k.vesg ? Number(conts[i].collect_k.vesg) : 0;
                    }
                    cars_detali.uz_cargo_vesg_doc.val(vesg > 0 ? Number(Number(vesg) / 1000).toFixed(3) : null);
                }
            },
            // Показать вес груза по ЭПД
            view_epd_nom_zpu: function (vagon) {
                if (vagon && vagon.zpu_v && vagon.zpu_v.length > 0) {
                    cars_detali.uz_cargo_nom_zpu.val(vagon.zpu_v[0].nom_zpu);
                }
            },
            // Показать класс опасности
            view_epd_danger_class: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_danger_class.val(vagon.collect_v[0].danger);
                    cars_detali.uz_cargo_danger_name.val(vagon.collect_v[0].danger);
                }
            },
            // Показать код опасности
            view_epd_danger_kod: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_danger_kod.val(vagon.collect_v[0].danger_kod);
                }
            },
            // Показать контейнеры
            view_epd_cont: function (conts) {
                if (conts && conts.length > 0) {
                    $('span#count-cont').text(conts.length > 0 ? conts.length : '');
                    // Показать тариф при выдаче
                    cars_detali.view_epd_pay_summa_of_cont(conts);
                    // Вес груза
                    cars_detali.view_epd_vesg_doc_of_cont(conts);
                    // Груз ет снг
                    cars_detali.view_epd_cargo_etsng_of_cont(conts);
                    // Груз гнг
                    cars_detali.view_epd_cargo_gng_of_cont(conts);
                    // Показать контейнера
                    cars_detali.table_cont.view(conts);
                } else {
                    $('span#count-cont').text('');
                }
            },
            // Показать станцию и цех по номеру документа принятого ранее
            view_station_devision_on_amkr: function (num_doc) {
                // Показать позицию
                var result_pos = cars_detali.table_arrival_cars.list.filter(function (i) {
                    var num_doc_arrival = i.Arrival_UZ_Vagon && i.Arrival_UZ_Vagon.Arrival_UZ_Document ? i.Arrival_UZ_Vagon.Arrival_UZ_Document && i.Arrival_UZ_Vagon.Arrival_UZ_Document.nom_doc : null;
                    return Number(i.position_arrival) > 0 && num_doc_arrival === num_doc ? true : false;
                });
                if (result_pos && result_pos.length > 0) {
                    var vag_uz = result_pos[0].Arrival_UZ_Vagon ? result_pos[0].Arrival_UZ_Vagon : null;
                    // Покажем станцию назначения АМКР (с учетом признака под погрузку)
                    cars_detali.uz_vag_station_on_amkr.val(vag_uz && vag_uz.id_station_on_amkr ? vag_uz.id_station_on_amkr : vag_uz && vag_uz.empty_car ? 0 : -1);
                    // Получим название цеха и покажем его
                    var division = vag_uz && vag_uz.Directory_Divisions ? vag_uz.Directory_Divisions : null;
                    cars_detali.view_devision_on_amkr_manual(division ? cars_detali.ids_inc.ids_dir.getValueObj(division, 'division_abbr', cars_detali.lang) : null);
                }

            },
            // Показать подразделение на которое отправлен вагон
            view_devision_on_amkr_manual: function (text) {
                var code = null;
                if (text) {
                    var obj = cars_detali.ids_inc.ids_dir.getDivisions_Of_CultureName('division_abbr', cars_detali.lang, text)
                    if (obj && obj.length > 0) {
                        code = obj[0].code;
                        //cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_vag_devision_on_amkr_kod, "");
                        //cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_vag_devision_on_amkr_name, "");
                    } else {
                        //cars_detali.val_arrival_car.set_control_error(cars_detali.uz_vag_devision_on_amkr_name, "Указанного цеха нет в справочнике ИДС.");
                    }
                }
                //else {
                //    cars_detali.val_arrival_car.set_control_error(cars_detali.uz_vag_devision_on_amkr_kod, "Не указан шифр цеха");
                //}
                cars_detali.uz_vag_devision_on_amkr_kod.val(code);
                cars_detali.uz_vag_devision_on_amkr_name.val(text);
                cars_detali.validation_vag_devision_on_amkr(true, true);

            },
            // показать электронно перевозочный документ
            view_cars_epd: function (num, otpr) {
                cars_detali.select_otpr = otpr; // Сохраним документ
                cars_detali.select_num = num;   // Сохраним номер вагона
                cars_detali.set_open_edit();   // Перевести в режим "open-edit"
                cars_detali.clear_cars_epd();   // Очистить параметры окна ЭПД
                // Номер вагона
                cars_detali.num_car.val(cars_detali.select_num);
                // Показать позицию
                var result_pos = cars_detali.table_arrival_cars.list.filter(function (i) {
                    return Number(i.position_arrival) > 0 ? true : false;
                }).sort(function (a, b) {
                    return a.position_arrival - b.position_arrival
                });
                var np = result_pos && result_pos.length > 0 ? Number(Number(result_pos[result_pos.length - 1].position_arrival) + 1) : 1;
                cars_detali.arrival_cars_position_arrival.val(np);
                // Если есть эпд, получим эпд на выбранный вагон и контейнеры этого вагона
                if (cars_detali.select_otpr !== null) {
                    // Выбрать вагон
                    cars_detali.select_otpr_vagon = cars_detali.get_vagon_epd(cars_detali.select_otpr, cars_detali.select_num);
                    if (cars_detali.select_otpr_vagon === null) {
                        // Документа нет пишим сообщение
                        cars_detali.alert.out_warning_message(langView('mess_not_searsh_epd_vagon', langs));
                    }
                    // Выбрать контейнеры пренадлежащие вагону
                    cars_detali.select_otpr_cont = cars_detali.get_vagon_cont_epd(cars_detali.select_otpr, cars_detali.select_num);
                }

                // Проверим наличее перевозочного документа а также в нем наличие выбранного вагона 
                if (cars_detali.select_otpr !== null && cars_detali.select_otpr_vagon !== null) {
                    // Документ найден
                    //--------------------------------------------------------
                    // Обновим информацию о вагоне
                    //Получить текущий вагон из справочника вагонов ИДС
                    cars_detali.get_vagon_dir(cars_detali.select_otpr_vagon, cars_detali.select_num, function (result_vagon) {
                        //cars_detali.bt_card_vag_searsh.hide();
                        cars_detali.select_vagon = result_vagon;
                        if (!cars_detali.select_vagon) {
                            // Вагон не найден в справочнике
                            cars_detali.val_card_vag.out_warning_message("Вагон №" + cars_detali.select_num + " не найден в справочнике вагонов ИДС, также не удалось создать строку справочника по данным УЗ, если вы уверены, что номер вагона указан правильно, создайте строку справочника вагона в ручном режиме или обратитесь к администратору ИДС. ");
                            cars_detali.bt_card_vag_add.show();
                            cars_detali.set_mode_vagon_card(true);
                        } else {
                            // Запись вагона из справочника
                            cars_detali.bt_card_vag_add.hide();
                            cars_detali.set_mode_vagon_card(false);
                        }
                        //--------------------------------------------------------
                        // требования
                        //cars_detali.search_cars_num_doc.prop("disabled", true);
                        cars_detali.show_booton_not(); // убрать все кнопки

                        // найдем основной документ
                        cars_detali.get_main_epd((cars_detali.select_otpr.otprdp && cars_detali.select_otpr.otprdp.nom_osn_doc ? cars_detali.select_otpr.otprdp.nom_osn_doc : null), function (result_main_otpr) {
                            // Получим основной документ
                            cars_detali.select_main_otpr = result_main_otpr;

                            // Если есть основной эпд, получим основной эпд на выбранный вагон и контейнеры этого вагона
                            if (cars_detali.select_main_otpr !== null) {
                                // Выбрать вагон
                                cars_detali.select_main_otpr_vagon = cars_detali.get_vagon_epd(cars_detali.select_main_otpr, cars_detali.select_num);
                                // Выбрать контейнеры пренадлежащие вагону
                                cars_detali.select_main_otpr_cont = cars_detali.get_vagon_cont_epd(cars_detali.select_main_otpr, cars_detali.select_num);
                            }
                            // Отобразим информацию по накладной и основному документу
                            if (cars_detali.select_otpr.otprdp && cars_detali.select_otpr.otprdp.nom_osn_doc) {
                                // Это досылочный документ
                                cars_detali.title_num_doc.hide();
                                cars_detali.title_num_deliv_doc.show();
                                cars_detali.title_num_osn_doc.show();
                                cars_detali.uz_doc_num_osn_doc.show();
                            } else {
                                // Это обычный документ
                                cars_detali.title_num_doc.show();
                                cars_detali.title_num_deliv_doc.hide();
                                cars_detali.title_num_osn_doc.hide();
                                cars_detali.uz_doc_num_osn_doc.hide();
                            }
                            // 
                            cars_detali.uz_doc_num_doc.val(cars_detali.select_otpr !== null ? cars_detali.select_otpr.nom_doc : null);
                            cars_detali.uz_doc_num_osn_doc.val(cars_detali.select_otpr.otprdp !== null ? cars_detali.select_otpr.otprdp.nom_osn_doc : null);
                            //---------------------------------------------------------------------------------------------
                            // Маршруты клиенты OTPR\ROUTE
                            cars_detali.view_epd_station_from(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            cars_detali.view_epd_station_on(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            cars_detali.view_epd_station_border(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            //-------------------------------------------------------------------
                            // Оределим грузоотправителя и грузополучателя OTPR\CLIENT  
                            cars_detali.view_epd_client(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            // Показать станцию и подразделение на которые будет отправлен вагон если по номеру документа уже принимался вагон
                            cars_detali.view_station_devision_on_amkr(get_input_number_value(cars_detali.uz_doc_num_doc));
                            //-------------------------------------------------------------------
                            // Показать информацию из справочника вагонов ИДС (вагон определяеется ранее)
                            cars_detali.view_epd_card_vag(cars_detali.select_vagon);
                            // Показать информацию из ЭПД
                            cars_detali.view_epd_uz_vag(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            // Показать сопроводительные документы
                            cars_detali.view_epd_docs(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            cars_detali.view_epd_acts(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            // Платильщик по прибытию
                            cars_detali.view_epd_plat(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            cars_detali.view_epd_distance_way(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            cars_detali.view_epd_pay_summa_of_vagon(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            // Грузы
                            //if (!cars_detali.select_otpr_cont) {
                            cars_detali.view_epd_cargo_etsng_of_vagon(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            cars_detali.view_epd_cargo_gng_of_vagon(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            //}
                            cars_detali.view_epd_cargo_analysis(!cars_detali.select_main_otpr ? cars_detali.select_otpr : cars_detali.select_main_otpr);
                            cars_detali.view_epd_kol_pac(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            cars_detali.view_epd_vesg_doc_of_vagon(cars_detali.select_otpr_vagon);
                            cars_detali.view_epd_nom_zpu(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            // Опасность
                            cars_detali.view_epd_danger_class(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            cars_detali.view_epd_danger_kod(!cars_detali.select_main_otpr_vagon ? cars_detali.select_otpr_vagon : cars_detali.select_main_otpr_vagon);
                            // Контейнер
                            cars_detali.view_epd_cont(!cars_detali.select_main_otpr_cont ? cars_detali.select_otpr_cont : cars_detali.select_main_otpr_cont);
                            LockScreenOff();

                        });
                    });

                } else {
                    // Документ не найден
                    //cars_detali.search_cars_num_doc.prop("disabled", false);
                    cars_detali.get_vagon_of_num_dir(cars_detali.select_num, function (result_vagon) {
                        //if (result_vagon) {
                        //cars_detali.bt_card_vag_searsh.hide();
                        // Информация о вагоне вернулась
                        cars_detali.select_vagon = result_vagon;
                        if (!cars_detali.select_vagon) {
                            // Запись вагона новая
                            cars_detali.val_card_vag.out_warning_message("Вагон №" + cars_detali.select_num + " не найден в справочнике вагонов ИДС, также не удалось создать строку справочника по данным УЗ, если вы уверены, что номер вагона указан правильно, создайте строку справочника вагона в ручном режиме или обратитесь к администратору ИДС. ");
                            cars_detali.bt_card_vag_add.show();
                            cars_detali.set_mode_vagon_card(true);
                        } else {
                            // Запись вагона из справочника
                            cars_detali.bt_card_vag_add.hide();
                            cars_detali.set_mode_vagon_card(false);
                        }
                        //-------------------------------------------------------------------
                        // Показать информацию из справочника вагонов ИДС (вагон определяеется ранее)
                        cars_detali.view_epd_card_vag(cars_detali.select_vagon);
                        //} else {
                        //    // Создать новую запись вагона 
                        //    //cars_detali.bt_card_vag_searsh.show();
                        //    cars_detali.bt_card_vag_add.hide();
                        //    cars_detali.set_mode_vagon_card(false);
                        //}
                        cars_detali.show_booton_epd_search(); // Показать кнопку поиска документа

                        LockScreenOff();
                    });

                }
            },
            // Показать информацию по сап
            view_sap_incoming_supply: function (id_arrival_car, callback) {
                // Очистим ячейки
                cars_detali.SAP_inbound_delivery_num_input_sipply.val('');
                cars_detali.SAP_inbound_delivery_num_pos_sipply.val('');
                cars_detali.SAP_inbound_delivery_dt_sipply.val('');
                cars_detali.SAP_inbound_delivery_unloading_ban.val('');
                cars_detali.SAP_inbound_delivery_ship.val('');
                cars_detali.SAP_inbound_delivery_material_code.val('');
                cars_detali.SAP_inbound_delivery_material_name.val('');
                cars_detali.SAP_inbound_delivery_warehouse_code.val('');
                cars_detali.SAP_inbound_delivery_warehouse_name.val('');
                cars_detali.SAP_inbound_delivery_warehouse_code_new.val('');
                cars_detali.SAP_inbound_delivery_warehouse_name_new.val('');
                if (id_arrival_car) {
                    cars_detali.ids_inc.getSAPIncomingSupplyOfIDArrivalCar(id_arrival_car, function (sap_is) {
                        cars_detali.select_sap_is = sap_is;
                        // Активируем кнопку запрос в САП
                        if (!sap_is) {
                            cars_detali.bt_SAP_inbound_delivery_add.prop('disabled', false);
                            cars_detali.alert_sap_is.out_warning_message('Запрос на информацию по входящей поставки созданной САП – не выполнялся, вы можете сделать запрос вручную, нажав кнопку ниже или запрос будет выполнен автоматически по каждому вагону, после принятия всего состава.');
                        } else {
                            if (sap_is.close === null) {
                                cars_detali.bt_SAP_inbound_delivery_add.prop('disabled', false);
                                cars_detali.alert_sap_is.out_warning_message('Информация о входящей поставке не полная, информация дополняется, вы можете обновить информацию сделать запрос в ручную.');
                            } else {
                                cars_detali.bt_SAP_inbound_delivery_add.prop('disabled', true);
                                cars_detali.alert_sap_is.out_info_message('Информация о входящей поставке - полная, строка закрыта');
                            }
                            // Заполним
                            cars_detali.SAP_inbound_delivery_num_input_sipply.val(sap_is.VBELN);
                            cars_detali.SAP_inbound_delivery_num_pos_sipply.val(sap_is.NUM_VBELN);
                            cars_detali.SAP_inbound_delivery_dt_sipply.val(sap_is.ERDAT !== null && sap_is.ETIME !== null ? sap_is.ERDAT + ' ' + sap_is.ETIME : '');
                            cars_detali.SAP_inbound_delivery_unloading_ban.val(sap_is.KOD_R_10);
                            cars_detali.SAP_inbound_delivery_ship.val(sap_is.NAME_SH);
                            cars_detali.SAP_inbound_delivery_material_code.val(sap_is.MATNR);
                            cars_detali.SAP_inbound_delivery_material_name.val(sap_is.MAKTX);
                            cars_detali.SAP_inbound_delivery_warehouse_code.val(sap_is.LGORT);
                            cars_detali.SAP_inbound_delivery_warehouse_name.val(sap_is.LGOBE);
                            cars_detali.SAP_inbound_delivery_warehouse_code_new.val(sap_is.LGORT_10);
                            cars_detali.SAP_inbound_delivery_warehouse_name_new.val(sap_is.LGOBE_10);
                        }
                        if (typeof callback === 'function') {
                            callback(true);
                        }
                    });
                } else {
                    // Не указан id_arrival_car
                    if (typeof callback === 'function') {
                        callback(null);
                    }
                }

            },
            //-------------------------------------------------------------------------------------
            // ФУНКЦИОНАЛ ПРИНЯТЬ ВАГОН
            //-------------------------------------------------------------------------------------
            // Добавить информацию о входящей поставке САП
            add_sap_incoming_supply: function (id_arrival_car, callback) {
                if (id_arrival_car) {
                    // Ищем строку САП для этого прибытия
                    cars_detali.ids_inc.getSAPIncomingSupplyOfIDArrivalCar(id_arrival_car, function (sap_is) {
                        if (!sap_is) {
                            // Строки нет, создадим
                            sap_is = cars_detali.get_sap_incoming_supply();
                        } else {
                            // Строки есть, обновим
                            sap_is.change = toISOStringTZ(new Date());
                            sap_is.change_user = cars_detali.user;
                        }
                        cars_detali.select_web_and_save_sap_incoming_supply(sap_is, function (result_add_upd_sap_is) {
                            // Не указан id_arrival_car
                            if (typeof callback === 'function') {
                                callback(!result_add_upd_sap_is || result_add_upd_sap_is.select === false || result_add_upd_sap_is.add === -1 || result_add_upd_sap_is.update === -1 ? -1 : id_arrival_car);
                            }
                        });
                    });
                } else {
                    // Не указан id_arrival_car
                    if (typeof callback === 'function') {
                        callback(-1);
                    }
                }
            },
            // сделаем запрос на web sap и результат сохраним в базе ИДС
            select_web_and_save_sap_incoming_supply: function (new_sap_is, callback) {
                cars_detali.ids_inc.ids_sap.getCurrentIncomingSupplyOfWebSAP(new_sap_is, function (result_sap_is) {
                    if (result_sap_is) {
                        if (result_sap_is.id === 0) {
                            // Добавить
                            cars_detali.ids_inc.postSAPIncomingSupply(result_sap_is, function (result_add) {
                                if (result_add >= 0) {
                                    callback({ select: true, add: result_add, update: null });
                                } else {
                                    // Ошибка,
                                    if (typeof callback === 'function') {
                                        callback({ select: true, add: -1, update: null });
                                    }
                                }
                            });
                        } else {
                            // Обновить
                            cars_detali.ids_inc.putSAPIncomingSupply(result_sap_is, function (result_upd) {
                                if (result_upd >= 0) {
                                    callback({ select: true, add: null, update: result_upd });
                                } else {
                                    // Ошибка,
                                    if (typeof callback === 'function') {
                                        callback({ select: true, add: null, update: -1 });
                                    }
                                }
                            });
                        }
                    } else {
                        // Ошибка обновление не получено
                        if (typeof callback === 'function') {
                            callback({ select: false, add: null, update: null });
                        }
                    }
                });
            },
            // Создадим или определим ранее созданый документ УЗ (в ручном режиме)
            add_doc_uz: function (callback) {
                // Определим название документа
                var manual_num = 'MNL_' + cars_detali.uz_doc_num_doc.val();
                var result_manual_num_doc = null;
                cars_detali.ids_inc.getUZ_DOCOfNum(manual_num, function (result_manual_num_doc) {
                    if (!result_manual_num_doc) {
                        // Документа нет, создадим документ
                        result_manual_num_doc = {
                            num_doc: manual_num,
                            revision: 0,
                            num_uz: get_input_number_value(cars_detali.uz_doc_num_doc),
                            status: 6,
                            code_from: cars_detali.uz_cargo_client_kod_from.val(),
                            code_on: cars_detali.uz_cargo_client_kod_on.val(),
                            dt: toISOStringTZ(new Date()),
                            xml_doc: null
                        };
                        cars_detali.ids_inc.postUZ_DOC(result_manual_num_doc, function (result_add_manual_num_doc) {
                            if (result_add_manual_num_doc > 0) {
                                // документ добавлен
                                if (typeof callback === 'function') {
                                    callback(manual_num);
                                }
                            } else {
                                // Документ не добавлен
                                cars_detali.alert.out_error_message("Ошибка добавления ЭПД созданного вручном режиме");
                                if (typeof callback === 'function') {
                                    callback(null);
                                }
                            }
                        });
                    } else {
                        // Документ есть
                        if (typeof callback === 'function') {
                            callback(manual_num);
                        }
                    }
                });
            },
            // Добавить платежки
            add_document_pays: function (otpr, id_document_uz, callback) {
                var list_document_pay = cars_detali.get_list_document_pay(otpr, id_document_uz);
                if (list_document_pay && list_document_pay.length > 0) {
                    cars_detali.ids_inc.postListArrival_UZ_Document_Pay(list_document_pay, function (result_add_pays) {
                        if (typeof callback === 'function') {
                            callback(result_add_pays);
                        }
                    });
                } else {
                    // Нечего добавлять
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Добавить акты
            add_document_acts: function (otpr, id_document_uz, callback) {
                var list_document_acts = cars_detali.get_list_document_acts(otpr, id_document_uz);
                if (list_document_acts && list_document_acts.length > 0) {
                    cars_detali.ids_inc.postListArrival_UZ_Document_Acts(list_document_acts, function (result_add_acts) {
                        if (typeof callback === 'function') {
                            callback(result_add_acts);
                        }
                    });
                } else {
                    // Нечего добавлять
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Добавить документы
            add_document_docs: function (otpr, id_document_uz, callback) {
                var list_document_docs = cars_detali.get_list_document_docs(otpr, id_document_uz);
                if (list_document_docs && list_document_docs.length > 0) {
                    cars_detali.ids_inc.postListArrival_UZ_Document_Docs(list_document_docs, function (result_add_docs) {
                        if (typeof callback === 'function') {
                            callback(result_add_docs);
                        }
                    });
                } else {
                    // Нечего добавлять
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            //
            add_vagon_document: function (id_document_uz, callback) {

            },
            // Добавить платежки по вагону
            add_vagon_pays: function (otpr_vagon, id_vagon, callback) {
                var list_vagon_pay = cars_detali.get_list_vagon_pay(otpr_vagon, id_vagon);
                if (list_vagon_pay && list_vagon_pay.length > 0) {
                    cars_detali.ids_inc.postListArrival_UZ_Vagon_Pay(list_vagon_pay, function (result_add_vagon_pays) {
                        if (typeof callback === 'function') {
                            callback(result_add_vagon_pays);
                        }
                    });
                } else {
                    // Нечего добавлять
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Добавить акты по вагону
            add_vagon_acts: function (otpr, id_vagon, num, callback) {
                var list_vagon_acts = cars_detali.get_list_vagon_acts(otpr, id_vagon, num);
                if (list_vagon_acts && list_vagon_acts.length > 0) {
                    cars_detali.ids_inc.postListArrival_UZ_Vagon_Acts(list_vagon_acts, function (result_add_vagon_acts) {
                        if (typeof callback === 'function') {
                            callback(result_add_vagon_acts);
                        }
                    });
                } else {
                    // Нечего добавлять
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Добавить контейнеры по вагону
            add_vagon_cont: function (otpr_cont, id_vagon, callback) {
                var list_vagon_cont = cars_detali.get_list_vagon_cont(otpr_cont, id_vagon);
                if (list_vagon_cont && list_vagon_cont.length > 0) {
                    cars_detali.ids_inc.postListArrival_UZ_Vagon_Cont(list_vagon_cont, function (result_add_vagon_conts) {
                        if (typeof callback === 'function') {
                            callback(result_add_vagon_conts);
                        }
                    });
                } else {
                    // Нечего добавлять
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Добавить платежки по контейнерам
            add_cont_pays: function (otpr_cont, id_vagon, callback) {
                cars_detali.ids_inc.getArrival_UZ_Vagon_ContOfID_Vagon(id_vagon, function (result_conts_of_vagon) {
                    var list_cont_pay = [];
                    for (var ic = 0; ic < result_conts_of_vagon.length; ic++) {
                        list_cont_pay = list_cont_pay.concat(cars_detali.get_list_cont_pay(otpr_cont, result_conts_of_vagon[ic]));
                    }
                    //
                    if (list_cont_pay && list_cont_pay.length > 0) {
                        cars_detali.ids_inc.postListArrival_UZ_Cont_Pay(list_cont_pay, function (result_add_cont_pay) {
                            if (typeof callback === 'function') {
                                callback(result_add_cont_pay);
                            }
                        });
                    } else {
                        // Нечего добавлять
                        if (typeof callback === 'function') {
                            callback(0);
                        }
                    }

                });
            },
            // Добавить вагон
            add_vagon: function (id_document_uz, num, id_arrival, mode, callback) {
                result_vagon_uz = cars_detali.get_arrival_uz_vagon(id_document_uz, num, id_arrival, mode);
                if (result_vagon_uz) {
                    // вагон определен добавим его в базу
                    cars_detali.ids_inc.postArrival_UZ_Vagon(result_vagon_uz, function (result_add_vagon) {
                        if (result_add_vagon > 0) {
                            if (mode < 2) {
                                // Вагон добавлен, занесем платежки Pay
                                cars_detali.add_vagon_pays(cars_detali.select_otpr_vagon, result_add_vagon, function (result_add_vagon_pays) {
                                    // Добавим акты
                                    cars_detali.add_vagon_acts(cars_detali.select_otpr, result_add_vagon, num, function (result_add_vagon_acts) {
                                        // Добавим контейнеры
                                        cars_detali.add_vagon_cont(cars_detali.select_otpr_cont, result_add_vagon, function (result_add_vagon_conts) {
                                            if (result_add_vagon_conts > 0) {
                                                // Если контейнеры есть и добавлены тогда запишим платежки
                                                cars_detali.add_cont_pays(cars_detali.select_otpr_cont, result_add_vagon, function (result_add_cont_pays) {
                                                    if (typeof callback === 'function') {
                                                        callback(result_add_vagon);
                                                    }
                                                });
                                            } else {
                                                // Контейнеров нет
                                                if (typeof callback === 'function') {
                                                    callback(result_add_vagon);
                                                }
                                            }
                                        });
                                    });
                                });
                            } else {
                                // В ручном режиме pay, act, doc - не сохраняем (пока!)
                                if (typeof callback === 'function') {
                                    callback(result_add_vagon);
                                }
                            }
                        } else {
                            // Ошибка добавления
                            cars_detali.alert.out_error_message("Ошибка сохранения информации о вагоне в базе ИДС");
                            LockScreenOff();
                            if (typeof callback === 'function') {
                                callback(result_add_vagon);
                            }
                        }
                    });
                }
            },
            // Обновим вагон
            upd_vagon: function () {

            },
            // добавить или обновить вагон
            add_upd_vagon: function (id_document_uz, car, mode, callback) {
                // Проверим вагон сохранялся ранее
                cars_detali.ids_inc.getArrival_UZ_VagonOfDocumentNumVagon(id_document_uz, car.num, function (result_vagon_uz) {
                    if (!result_vagon_uz) {
                        // Вагон ранее не сохранялся, добавим его
                        cars_detali.add_vagon(id_document_uz, car.num, car.id_arrival, mode, function (result_add_vagon_uz) {
                            if (typeof callback === 'function') {
                                callback(result_add_vagon_uz);
                            }
                        });

                    } else {
                        // TODO:
                        // Вагон ранее сохранялся, обновим информацию по нему
                        if (typeof callback === 'function') {
                            callback(result_vagon_uz.id);
                        }
                    }

                });
            },

            // Обновить информацию о принятом вагоне (перенос влево в окно принятые вагоны, изменение статуса состава "В работе")
            update_arrival_car: function (car, id_vagon, callback) {
                if (car) {
                    car.position_arrival = get_input_number_value(cars_detali.arrival_cars_position_arrival);
                    car.date_adoption_act = toISOStringTZ(get_datetime_value(cars_detali.arrival_cars_car_date_adoption_act.val(), cars_detali.lang));
                    car.id_arrival_uz_vagon = id_vagon;
                    car.arrival = toISOStringTZ(new Date());
                    car.arrival_user = cars_detali.user;
                    car.change = toISOStringTZ(new Date());
                    car.change_user = cars_detali.user;
                    // обновим информацию о вагоне
                    cars_detali.ids_inc.putArrivalCars(car, function (result_update_car) {
                        if (result_update_car > 0) {
                            // Информация по принятому вагону обновлена, поменяем статус состава на стату "В работе"
                            cars_detali.ids_inc.getArrivalSostavOfID(car.id_arrival, function (arrival_sostav) {
                                if (arrival_sostav) {
                                    // Состав определен
                                    arrival_sostav.status = 1;
                                    arrival_sostav.change = toISOStringTZ(new Date());
                                    arrival_sostav.change_user = cars_detali.user;
                                    arrival_sostav.Arrival_UZ_Vagon = null;// что-бы не вызывало ошибки
                                    arrival_sostav.ArrivalCars = null;// что-бы не вызывало ошибки
                                    cars_detali.ids_inc.putArrivalSostav(arrival_sostav, function (result_update_arrival_sostav) {
                                        if (typeof callback === 'function') {
                                            callback(result_update_arrival_sostav > 0 ? result_update_car : result_update_arrival_sostav);
                                        }
                                    });
                                } else {
                                    // Состав не определен
                                    cars_detali.alert.out_error_message("Статус состава принятого вагона №" + car.num + " - не изменен!");
                                    //LockScreenOff();
                                    if (typeof callback === 'function') {
                                        callback(-1);
                                    }
                                }
                            });
                        } else {
                            // Документ не определен
                            cars_detali.alert.out_error_message("Информация по принятому вагону №" + car.num + " - не обновлена!");
                            //LockScreenOff();
                            if (typeof callback === 'function') {
                                callback(result_update_car);
                            }
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },

            // Принять вагон в системе ИДС
            arrival_vagon: function (id_car, callback) {
                cars_detali.alert.clear_message();
                LockScreen(langView('mess_arrival_vagon', langs));
                if (id_car && id_car > 0) {
                    // Выбран вагон
                    cars_detali.ids_inc.getArrivalCarsOfID(id_car, function (result_car) {
                        if (result_car) {
                            // Вагон найден, проверим режим
                            if (!result_car.arrival && cars_detali.car_status > 0) {
                                var valid = cars_detali.validation_arrival_car();
                                if (valid) {
                                    // Обновим строку САП
                                    cars_detali.add_sap_incoming_supply(id_car, function (result_add_upd_sap_is) {
                                        if (result_add_upd_sap_is >= 0) {
                                            // Вагон не принят в автоматическом режиме ------------------------------------------------
                                            if (cars_detali.car_status === 1) {
                                                // Обработаем вагон согласно режима ввода авто-ручной
                                                // АВТОМАТИЧЕСКИЙ РЕЖИМ -------------------------------------------------
                                                if (result_car.num_doc && result_car.num_doc !== "") {
                                                    // Документ определен
                                                    // Определим, документ сохранялся ранее ?
                                                    cars_detali.ids_inc.getArrival_UZ_DocumentOfID_DOC_UZ(result_car.num_doc, function (result_document_uz) {
                                                        if (!result_document_uz) {
                                                            // Документа нет
                                                            cars_detali.get_arrival_uz_document(result_car.num_doc, 1, function (result_new_arrival_uz_document) {
                                                                result_document_uz = result_new_arrival_uz_document;
                                                                // добавим документ
                                                                if (result_document_uz) {
                                                                    // Документ определен, добавим его в базу
                                                                    cars_detali.ids_inc.postArrival_UZ_Document(result_document_uz, function (result_add_document) {
                                                                        if (result_add_document > 0) {
                                                                            // Документ добавлен, занесем платежки Pay
                                                                            cars_detali.add_document_pays(cars_detali.select_otpr, result_add_document, function (result_add_pays) {
                                                                                // Добавим акты
                                                                                cars_detali.add_document_acts(cars_detali.select_otpr, result_add_document, function (result_add_acts) {
                                                                                    // Добавим доки
                                                                                    cars_detali.add_document_docs(cars_detali.select_otpr, result_add_document, function (result_add_docs) {
                                                                                        //--------------------------------------------------------------------------------------
                                                                                        // Обработка вагонов
                                                                                        cars_detali.add_upd_vagon(result_add_document, result_car, 1, function (result_add_vagon) {
                                                                                            // Обработка записис по принятому вагону
                                                                                            if (result_add_vagon > 0) {
                                                                                                cars_detali.update_arrival_car(result_car, result_add_vagon, function (result_add_car) {
                                                                                                    if (typeof callback === 'function') {
                                                                                                        callback(result_add_car);
                                                                                                    }
                                                                                                });
                                                                                            } else {
                                                                                                // Ошибка обновления или добавления вагона
                                                                                                cars_detali.alert.out_error_message("Ошибка обновления или добавления вагона");
                                                                                                if (typeof callback === 'function') {
                                                                                                    callback(result_add_vagon);
                                                                                                }
                                                                                            }
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        } else {
                                                                            // Ошибка добавления
                                                                            cars_detali.alert.out_error_message("Ошибка сохранения нового документа в базе ИДС");
                                                                            //LockScreenOff();
                                                                            if (typeof callback === 'function') {
                                                                                callback(result_add_document);
                                                                            }
                                                                        }
                                                                    });
                                                                } else {
                                                                    // Документ не определен, ошибка
                                                                    cars_detali.alert.out_error_message("Ошибка формирования нового документа");
                                                                    //LockScreenOff();
                                                                    if (typeof callback === 'function') {
                                                                        callback(-1);
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            //TODO: !!! Подумать нужно обновлять документ
                                                            // Добавим к доку вагон
                                                            cars_detali.add_upd_vagon(result_document_uz.id, result_car, 1, function (result_add_vagon) {
                                                                // Обработка записис по принятому вагону
                                                                if (result_add_vagon > 0) {
                                                                    cars_detali.update_arrival_car(result_car, result_add_vagon, function (result_add_car) {
                                                                        if (typeof callback === 'function') {
                                                                            callback(result_add_car);
                                                                        }
                                                                    });
                                                                } else {
                                                                    // Ошибка обновления или добавления вагона
                                                                    cars_detali.alert.out_error_message("Ошибка обновления или добавления вагона");
                                                                    if (typeof callback === 'function') {
                                                                        callback(result_add_vagon);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    });
                                                } else {
                                                    // Документ не определен
                                                    cars_detali.alert.out_error_message("По вагону не определен ЭПД");
                                                    //LockScreenOff();
                                                    if (typeof callback === 'function') {
                                                        callback(-1);
                                                    }
                                                }
                                            }
                                            // Вагон добавляется в ручном режиме------------------------------------------------
                                            if (cars_detali.car_status === 2) {
                                                // РУЧНОЙ РЕЖИМ ----------------------------------
                                                // Проверим наличие УЗ Документа (созданного вручную)
                                                cars_detali.add_doc_uz(function (manual_num) {
                                                    if (manual_num) {
                                                        cars_detali.ids_inc.getArrival_UZ_DocumentOfID_DOC_UZ(manual_num, function (result_document_uz) {
                                                            if (!result_document_uz) {
                                                                // Документа нет
                                                                cars_detali.get_arrival_uz_document(manual_num, 2, function (result_new_arrival_uz_document) {
                                                                    result_document_uz = result_new_arrival_uz_document;
                                                                    // добавим документ
                                                                    if (result_document_uz) {
                                                                        // Документ определен, добавим его в базу
                                                                        cars_detali.ids_inc.postArrival_UZ_Document(result_document_uz, function (result_add_document) {
                                                                            if (result_add_document > 0) {
                                                                                //// Документ добавлен, занесем платежки Pay
                                                                                //cars_detali.add_document_pays(cars_detali.select_otpr, result_add_document, function (result_add_pays) {
                                                                                //    // Добавим акты
                                                                                //    cars_detali.add_document_acts(cars_detali.select_otpr, result_add_document, function (result_add_acts) {
                                                                                //        // Добавим доки
                                                                                //        cars_detali.add_document_docs(cars_detali.select_otpr, result_add_document, function (result_add_docs) {
                                                                                //--------------------------------------------------------------------------------------
                                                                                // Обработка вагонов
                                                                                cars_detali.add_upd_vagon(result_add_document, result_car, 2, function (result_add_vagon) {
                                                                                    // Обработка записис по принятому вагону
                                                                                    if (result_add_vagon > 0) {
                                                                                        cars_detali.update_arrival_car(result_car, result_add_vagon, function (result_add_car) {
                                                                                            if (typeof callback === 'function') {
                                                                                                callback(result_add_car);
                                                                                            }
                                                                                        });
                                                                                    } else {
                                                                                        // Ошибка обновления или добавления вагона
                                                                                        cars_detali.alert.out_error_message("Ошибка обновления или добавления вагона");
                                                                                        if (typeof callback === 'function') {
                                                                                            callback(result_add_vagon);
                                                                                        }
                                                                                    }
                                                                                });
                                                                                //        });
                                                                                //    });
                                                                                //});
                                                                            } else {
                                                                                // Ошибка добавления
                                                                                cars_detali.alert.out_error_message("Ошибка сохранения нового документа (ручной режим) в базе ИДС");
                                                                                //LockScreenOff();
                                                                                if (typeof callback === 'function') {
                                                                                    callback(result_add_document);
                                                                                }
                                                                            }
                                                                        });
                                                                    } else {
                                                                        // Документ не определен, ошибка
                                                                        cars_detali.alert.out_error_message("Ошибка формирования нового документа");
                                                                        //LockScreenOff();
                                                                        if (typeof callback === 'function') {
                                                                            callback(-1);
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                // Добавим к доку вагон
                                                                cars_detali.add_upd_vagon(result_document_uz.id, result_car, 2, function (result_add_vagon) {
                                                                    // Обработка записис по принятому вагону
                                                                    if (result_add_vagon > 0) {
                                                                        cars_detali.update_arrival_car(result_car, result_add_vagon, function (result_add_car) {
                                                                            if (typeof callback === 'function') {
                                                                                callback(result_add_car);
                                                                            }
                                                                        });
                                                                    } else {
                                                                        // Ошибка обновления или добавления вагона
                                                                        cars_detali.alert.out_error_message("Ошибка обновления или добавления вагона");
                                                                        if (typeof callback === 'function') {
                                                                            callback(result_add_vagon);
                                                                        }
                                                                    }
                                                                });

                                                            }
                                                        });
                                                    } else {
                                                        // Документ УЗ - Ошибка
                                                        if (typeof callback === 'function') {
                                                            callback(-1);
                                                        }
                                                    }
                                                });
                                            } // {Конец. обработаем вагон согласно режима ввода авто-ручной}
                                        } else {
                                            // Ошибка создания строки САП входящая поставка
                                            cars_detali.alert.out_error_message("Ошибка создания строки САП входящая поставка.");
                                            if (typeof callback === 'function') {
                                                callback(-1);
                                            }
                                        }
                                    });
                                } else {
                                    // Не прошло валидацию
                                    //LockScreenOff();
                                    if (typeof callback === 'function') {
                                        callback(-1);
                                    }
                                }

                            } else {
                                //Вагон уже принят
                                cars_detali.alert.out_warning_message("Вагон принят");
                                //LockScreenOff();
                                if (typeof callback === 'function') {
                                    callback(0);
                                }
                            }
                        } else {
                            // Вагон не прочитан из БД
                            cars_detali.alert.out_error_message("Вагон не найден в прибытии");
                            //LockScreenOff();
                            if (typeof callback === 'function') {
                                callback(-1);
                            }
                        }
                    });
                } else {
                    // Вагон не выбран
                    cars_detali.alert.out_warning_message("Вагон не выбран");
                    //LockScreenOff();
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Валидация данных перед принятием вагона
            validation_arrival_car: function () {
                cars_detali.val_arrival_car.clear_all();
                var valid = true;
                // Документ
                valid = valid & cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_doc_num_doc, "Не указан номер накладной");
                valid = valid & cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_route_stn_from, "Не указан код станции отправки");
                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory(cars_detali.uz_route_stn_from, this, 'ids_inc.ids_dir.getExternalStation_Of_Code', "Указанной станции отправки нет в справочнике ИДС.");
                valid = valid & cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_route_stn_on, "Не указан код станции прибытия");
                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory(cars_detali.uz_route_stn_on, this, 'ids_inc.ids_dir.getExternalStation_Of_Code', "Указанной станции прибытия нет в справочнике ИДС.");
                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory_IsNull(cars_detali.uz_route_stn_border, this, 'ids_inc.ids_dir.getBorderCheckpoint_Of_Code', "Указанного пограничного пункта нет в справочнике ИДС.");
                valid = valid & cars_detali.val_card_vag.checkInputOfDateTime_IsNull(cars_detali.uz_route_border_cross_time.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_cargo_client_kod_from, "Не указан код грузоотправителя");
                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory(cars_detali.uz_cargo_client_kod_from, this, 'ids_inc.ids_dir.getShipper_Of_Code', "Указанного грузоотправителя нет в справочнике ИДС.");
                valid = valid & cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_cargo_client_kod_on, "Не указан код грузополучателя");
                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory(cars_detali.uz_cargo_client_kod_on, this, 'ids_inc.ids_dir.getConsignee_Of_Code', "Указанного грузополучателя нет в справочнике ИДС.");
                valid = valid & cars_detali.validation_vagon_pay(valid, false);

                valid = valid & cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_rask_distance_way, "Не указано тарифное расстояние");
                // Вагон
                if (!cars_detali.select_vagon) {
                    valid = valid & cars_detali.val_arrival_car.set_object_error(cars_detali.bt_card_vag_add, "На выбранный вагон не заведена карточка в справочнике ИДС");
                }

                valid = valid & cars_detali.validation_vag_condition_arrival(valid, false);

                valid = valid & cars_detali.val_arrival_car.checkInputOfRange(cars_detali.uz_vag_gruzp, 60.0, 80.0, "Грузоподъемность должна быть в диапазоне от 60.0 до 80.0 тон.");
                valid = valid & cars_detali.val_arrival_car.checkInputOfRange(cars_detali.uz_vag_ves_tary_arc, 15.0, 35.0, "Тара должна быть в диапазоне от 15.0 до 35.0 тон.");
                valid = valid & cars_detali.val_arrival_car.checkInputOfRange_IsNull(cars_detali.uz_vag_u_tara, 15.0, 35.0, "Тара должна быть в диапазоне от 15.0 до 35.0 тон.");

                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory(cars_detali.uz_cargo_kod_etsng, this, 'ids_inc.ids_dir.getCargoETSNG_Of_Code', "Указанного кода груза ЕТ СНГ нет в справочнике ИДС.");
                valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory_IsNull(cars_detali.uz_cargo_kod_gng, this, 'ids_inc.ids_dir.getCargoGNG_Of_Code', "Указанного кода груза ГНГ нет в справочнике ИДС.");

                valid = valid & cars_detali.validation_vag_station_on_amkr(valid, false);
                valid = valid & cars_detali.validation_vag_devision_on_amkr(valid, false);
                // Вычисление позиции
                var pos = get_input_number_value(cars_detali.arrival_cars_position_arrival);
                var result_pos = cars_detali.table_arrival_cars.list.filter(function (i) {
                    return Number(i.position_arrival) === pos ? true : false;
                });
                // Проверка позиции
                if (result_pos && result_pos.length > 0) {
                    valid = valid & cars_detali.val_arrival_car.set_object_error(cars_detali.arrival_cars_position_arrival, "Указаная позиция уже существует");
                } else {
                    valid = valid & cars_detali.val_arrival_car.set_object_ok(cars_detali.arrival_cars_position_arrival, "");
                }
                // Проверка даты принятия по акту
                valid = valid & cars_detali.val_card_vag.checkInputOfDateTime_IsNull(cars_detali.arrival_cars_car_date_adoption_act.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                return valid;
            },
            // Получить строку входящая поставка
            get_sap_incoming_supply: function () {
                var term = moment().add(15, 'days')._d;
                var sap_is = {
                    id: 0,
                    id_arrival_car: cars_detali.select_id,
                    num: cars_detali.select_num,
                    num_doc_uz: get_input_number_value(cars_detali.uz_doc_num_doc),
                    date_doc_uz: null,
                    code_border_checkpoint: get_input_number_value(cars_detali.uz_route_stn_border),
                    name_border_checkpoint: get_input_string_value(cars_detali.uz_route_stn_border_name),
                    cross_time: toISOStringTZ(get_datetime_value(cars_detali.uz_route_border_cross_time.val(), cars_detali.lang)),
                    VBELN: null,
                    NUM_VBELN: null,
                    WERKS: null,
                    LGORT: null,
                    LGOBE: null,
                    ERDAT: null,
                    ETIME: null,
                    LGORT_10: null,
                    LGOBE_10: null,
                    MATNR: null,
                    MAKTX: null,
                    NAME_SH: null,
                    KOD_R_10: null,
                    note: null,
                    term: toISOStringTZ(term),
                    attempt: 0,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user,
                    change: null,
                    change_user: null,
                    close: null,
                    close_user: null
                };
                return sap_is;
            },
            // Получить документ для обновления или добавления
            get_arrival_uz_document: function (id_doc_uz, mode, callback) {
                // Если это досылочный документ, найдем основной
                cars_detali.ids_inc.getArrival_UZ_DocumentOfID_DOC_UZ(get_input_number_value(cars_detali.uz_doc_num_osn_doc), function (result_main_document_uz) {
                    // Получим  документ
                    var document = {
                        id: 0,
                        id_doc_uz: id_doc_uz,
                        nom_doc: get_input_number_value(cars_detali.uz_doc_num_doc),
                        nom_main_doc: get_input_number_value(cars_detali.uz_doc_num_osn_doc),
                        code_stn_from: get_input_number_value(cars_detali.uz_route_stn_from),
                        code_stn_to: get_input_number_value(cars_detali.uz_route_stn_on),
                        code_border_checkpoint: get_input_number_value(cars_detali.uz_route_stn_border),
                        cross_time: toISOStringTZ(get_datetime_value(cars_detali.uz_route_border_cross_time.val(), cars_detali.lang)),
                        code_shipper: get_input_number_value(cars_detali.uz_cargo_client_kod_from),
                        code_consignee: get_input_number_value(cars_detali.uz_cargo_client_kod_on),
                        klient: get_input_number_value(cars_detali.uz_cargo_client_kod_on) === 7932 ? false : true,
                        code_payer_sender: get_input_string_value(cars_detali.uz_rask_kod_plat),
                        code_payer_arrival: mode < 2 ? cars_detali.get_kod_pl_arrival_epd(cars_detali.select_otpr) : null, // после раскредитации
                        distance_way: get_input_number_value(cars_detali.uz_rask_distance_way),
                        note: null,
                        parent_id: result_main_document_uz ? result_main_document_uz.id : null,
                        create: toISOStringTZ(new Date()),
                        create_user: cars_detali.user,
                    };
                    if (typeof callback === 'function') {
                        callback(document);
                    }
                });
            },
            // Получить вагон для обновления или добавления
            get_arrival_uz_vagon: function (id_document_uz, num, id_arrival, mode) {
                // Вернуть назать преобразование тары и уточненой тары
                var u_tara = get_input_number_value(cars_detali.uz_vag_ves_tary_arc);
                var ves_tary_arc = get_input_number_value(cars_detali.uz_vag_u_tara);
                var vesg = get_input_number_value(cars_detali.uz_cargo_vesg_doc);
                u_tara = u_tara !== null ? Number(u_tara * 1000) : null;
                ves_tary_arc = ves_tary_arc !== null ? Number(ves_tary_arc * 1000) : null;
                vesg = vesg !== null ? Number(vesg * 1000) : null;

                var id_station_amkr = get_select_number_value(cars_detali.uz_vag_station_on_amkr);


                var vagon = {
                    id: 0,
                    id_document: id_document_uz,
                    num: num,
                    id_arrival: id_arrival,
                    id_car: 0, // Нет необходимости номер информация о вагоне по номеру вагона cars_detali.select_vagon.id,
                    id_condition: get_select_number_value(cars_detali.uz_vag_condition_arrival),
                    id_type: get_select_number_value(cars_detali.uz_vag_type_wagon),
                    gruzp: get_input_number_value(cars_detali.uz_vag_gruzp),
                    u_tara: u_tara,
                    ves_tary_arc: ves_tary_arc,
                    route: cars_detali.uz_vag_route.prop('checked'),
                    note_vagon: cars_detali.uz_vag_note.val(),
                    id_cargo: cars_detali.select_id_cargo,
                    id_cargo_gng: cars_detali.select_id_cargo_gng,
                    id_certification_data: get_select_number_value(cars_detali.uz_cargo_certificate_data),
                    id_commercial_condition: get_select_number_value(cars_detali.uz_cargo_commercial_condition),
                    kol_pac: get_input_number_value(cars_detali.uz_cargo_kol_pac),
                    pac: num < 2 ? cars_detali.get_epd_vagon_collect_v_pac(cars_detali.select_otpr_vagon) : null, //
                    vesg: vesg,
                    vesg_reweighing: get_input_number_value(cars_detali.uz_cargo_vesg_reweighing),
                    nom_zpu: cars_detali.uz_cargo_nom_zpu.val(),
                    danger: get_input_string_value(cars_detali.uz_cargo_danger_class),
                    danger_kod: get_input_number_value(cars_detali.uz_cargo_danger_kod),
                    //cargo_returns: cars_detali.uz_cargo_returns.prop('checked'),
                    cargo_returns: null, // возврат будет определен позже!
                    id_station_on_amkr: id_station_amkr > 0 ? id_station_amkr : null,
                    id_division_on_amkr: cars_detali.ids_inc.ids_dir.getID_Divisions_Internal_Of_Name(cars_detali.uz_vag_devision_on_amkr_name.val(), 'division_abbr', cars_detali.lang), //get_select_number_value(cars_detali.uz_vag_devision_on_amkr),
                    empty_car: id_station_amkr === 0 ? true : null,
                    kol_conductor: num < 2 ? cars_detali.get_epd_vagon_kol_conductor(cars_detali.select_otpr_vagon) : null, //
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user,
                };
                return vagon;
            },
            //-------------------------------------------------------------------------------------
            // ФУНКЦИОНАЛ ВЕРУТЬ ВАГОН (Убрать из документов как принятый)
            //-------------------------------------------------------------------------------------

            //Удалить платежки по контейнерам
            del_vagon_cont_pay: function (conts, callback) {
                if (conts) {
                    var list_id = [];
                    for (ic = 0; ic < conts.length; ic++) {
                        list_id.push(conts[ic].id);
                    }
                    cars_detali.ids_inc.deleteArrival_UZ_Cont_PayOfListCont(list_id, function (result_del_conts_pays) {
                        if (typeof callback === 'function') {
                            callback(result_del_conts_pays);
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
                //deleteArrival_UZ_Cont_PayOfCont
            },
            // Удалить контейнеры по вагону
            del_vagon_cont: function (id_vagon, callback) {
                // Найдем контейнеры принадлежащие вагону
                cars_detali.ids_inc.getArrival_UZ_Vagon_ContOfID_Vagon(id_vagon, function (list_count) {
                    if (list_count && list_count.length > 0) {
                        // Контейнеры есть
                        cars_detali.del_vagon_cont_pay(list_count, function (result_del_cont_pay) {
                            // результаты удаления
                            if (result_del_cont_pay >= 0) {
                                // Платежек нет или удалены, удалим контейнера
                                cars_detali.ids_inc.deleteArrival_UZ_Vagon_ContOfVagon(id_vagon, function (result_del_conts) {
                                    if (typeof callback === 'function') {
                                        callback(result_del_conts);
                                    }
                                });
                            } else {
                                // Ошибка удаления платежек
                                if (typeof callback === 'function') {
                                    callback(-1);
                                }
                            }
                        });
                    } else {
                        // Контейнеров нет
                        if (typeof callback === 'function') {
                            callback(0);
                        }
                    }
                });

            },
            // Удалить акты по вагону
            del_vagon_acts: function (id_vagon, callback) {
                cars_detali.ids_inc.deleteArrival_UZ_Vagon_ActsOfVagon(id_vagon, function (result_del_acts) {
                    if (typeof callback === 'function') {
                        callback(result_del_acts);
                    }
                });
            },
            // Удалить платежки по вагону
            del_vagon_pays: function (id_vagon, callback) {
                cars_detali.ids_inc.deleteArrival_UZ_Vagon_PayOfVagon(id_vagon, function (result_del_pays) {
                    if (typeof callback === 'function') {
                        callback(result_del_pays);
                    }
                });
            },
            // Удалить вагон
            del_vagon: function (cars, callback) {
                if (cars && cars.id_arrival_uz_vagon) {
                    var id_vagon = cars.id_arrival_uz_vagon;
                    // Удалим контейнера
                    cars_detali.del_vagon_cont(id_vagon, function (result_del_cont) {
                        if (result_del_cont < 0) {
                            // Ошибка выходим
                            if (typeof callback === 'function') {
                                callback(result_del_cont);
                            }
                        } else {
                            // Удалим акты
                            cars_detali.del_vagon_acts(id_vagon, function (result_del_acts) {
                                if (result_del_acts < 0) {
                                    // Ошибка выходим
                                    if (typeof callback === 'function') {
                                        callback(result_del_acts);
                                    }
                                } else {
                                    // Удалим платежки
                                    cars_detali.del_vagon_pays(id_vagon, function (result_del_pays) {
                                        if (result_del_pays < 0) {
                                            // Ошибка выходим
                                            if (typeof callback === 'function') {
                                                callback(result_del_pays);
                                            }
                                        } else {
                                            // Удалим вагон
                                            cars_detali.clear_arrival_car(cars, function (result_clear_car) {
                                                if (result_clear_car < 0) {
                                                    // Ошибка выходим
                                                    if (typeof callback === 'function') {
                                                        callback(result_clear_car);
                                                    }
                                                } else {
                                                    cars_detali.ids_inc.deleteArrival_UZ_Vagon(id_vagon, function (result_del_vagon) {
                                                        if (typeof callback === 'function') {
                                                            callback(result_del_vagon);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // Сбросить информацию о принятом вагоне (перенос в право в окно вагоны на подходе.)
            clear_arrival_car: function (car, callback) {
                if (car) {
                    car.position_arrival = null;
                    car.date_adoption_act = null;
                    car.id_arrival_uz_vagon = null;
                    car.arrival = null;
                    car.arrival_user = null;
                    car.change = toISOStringTZ(new Date());
                    car.change_user = cars_detali.user;
                    car.Arrival_UZ_Vagon = null;// что-бы не вызывало ошибки
                    // обновим информацию о вагоне
                    cars_detali.ids_inc.putArrivalCars(car, function (result_update_car) {
                        if (result_update_car > 0) {
                            // Информация по принятому вагону обновлена, поменяем статус состава на стату "В работе"
                            cars_detali.ids_inc.getArrivalSostavOfID(car.id_arrival, function (arrival_sostav) {
                                if (arrival_sostav) {

                                    var arrival_cars = arrival_sostav.ArrivalCars.filter(function (i) {
                                        return i.position_arrival;
                                    });

                                    // Состав определен
                                    arrival_sostav.status = arrival_cars && arrival_cars.length > 0 ? 1 : 0;
                                    arrival_sostav.change = toISOStringTZ(new Date());
                                    arrival_sostav.change_user = cars_detali.user;
                                    arrival_sostav.Arrival_UZ_Vagon = null;// что-бы не вызывало ошибки
                                    arrival_sostav.ArrivalCars = null;// что-бы не вызывало ошибки
                                    cars_detali.ids_inc.putArrivalSostav(arrival_sostav, function (result_update_arrival_sostav) {
                                        if (typeof callback === 'function') {
                                            callback(result_update_arrival_sostav > 0 ? result_update_car : result_update_arrival_sostav);
                                        }
                                    });
                                } else {
                                    // Состав не определен
                                    cars_detali.alert.out_error_message("Статус состава при возвращении вагона №" + car.num + " в прибытие – не обновлен!");
                                    //LockScreenOff();
                                    if (typeof callback === 'function') {
                                        callback(-1);
                                    }
                                }
                            });
                        } else {
                            // Документ не определен
                            cars_detali.alert.out_error_message("Информация по вагону №" + car.num + ", возвращенному в прибытие – не обновлена!");
                            if (typeof callback === 'function') {
                                callback(result_update_car);
                            }
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(0);
                    }
                }
            },
            // ФУНКЦИИ РАЗДЕЛА "ПРИНЯТЫЕ ВАГОНЫ" ************************************************************************************************************************************

            // Таблица c информацией о принятых вагонах
            table_arrival_cars: {
                html_table: $('#table-arrival-cars'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_arrival_cars.obj = cars_detali.table_arrival_cars.html_table.DataTable({
                        "lengthMenu": [[-1, 20, 50, 100], ["All", 20, 50, 100]],
                        "pageLength": -1,
                        "paging": true,
                        "searching": false,
                        "ordering": true,
                        "info": true,
                        colReorder: true,               // вкл. перетаскивание полей
                        //fixedColumns: {
                        //    leftColumns: 2,
                        //},
                        select: {
                            style: "single"
                        },
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "position", title: langView('field_position_arrival', langs), width: "30px", orderable: true, searchable: false },
                            { data: "nom_doc", title: langView('field_nom_doc_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_main_doc", title: langView('field_nom_main_doc_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "num", title: langView('field_num_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "car_adm", title: langView('field_car_countrys_arrival', langs), width: "30px", orderable: true, searchable: false },
                            { data: "car_rod", title: langView('field_car_rod_arrival', langs), width: "30px", orderable: true, searchable: false },

                            { data: "gruzp", title: langView('field_gruzp_arrival', langs), width: "30px", orderable: true, searchable: false },
                            { data: "car_kol_os", title: langView('field_car_kol_os_arrival', langs), width: "30px", orderable: true, searchable: false },
                            { data: "car_usl_tip", title: langView('field_car_usl_tip_arrival', langs), width: "30px", orderable: true, searchable: false },
                            { data: "u_tara", title: langView('field_u_tara_arrival', langs), width: "30px", orderable: true, searchable: false },
                            { data: "car_date_rem_uz", title: langView('field_car_date_rem_uz_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "car_date_rem_vag", title: langView('field_car_date_rem_vag_arrival', langs), width: "150px", orderable: true, searchable: false },

                            { data: "car_owner", title: langView('field_car_owner_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "car_operator", title: langView('field_car_operator_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "limiting", title: langView('field_limiting_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "car_rent_start", title: langView('field_car_rent_start_arrival', langs), width: "150px", orderable: true, searchable: false },

                            { data: "condition", title: langView('field_condition_arrival', langs), width: "50px", orderable: true, searchable: false },

                            { data: "code_stn_from", title: langView('field_code_stn_from_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "name_stn_from", title: langView('field_name_stn_from_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "code_stn_to", title: langView('field_code_stn_to_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "name_stn_to", title: langView('field_name_stn_to_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "code_border_checkpoint", title: langView('field_code_border_checkpoint_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "name_border_checkpoint", title: langView('field_name_border_checkpoint_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "cross_time", title: langView('field_cross_time_arrival', langs), width: "150px", orderable: true, searchable: false },

                            { data: "code_shipper", title: langView('field_code_shipper_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "name_shipper", title: langView('field_name_shipper_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "code_consignee", title: langView('field_code_consignee_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "name_consignee", title: langView('field_name_consignee_arrival', langs), width: "150px", orderable: true, searchable: false },

                            { data: "code_payer_sender", title: langView('field_code_payer_sender_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "name_payer_sender", title: langView('field_name_payer_sender_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "distance_way", title: langView('field_distance_way_arrival', langs), width: "50px", orderable: true, searchable: false },


                            { data: "vesg", title: langView('field_vesg_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "cargo", title: langView('field_cargo_arrival', langs), width: "250px", orderable: true, searchable: false },

                            { data: "station_on_amkr", title: langView('field_station_on_amkr_arrival', langs), width: "150px", orderable: true, searchable: false },
                            { data: "division_on_amkr", title: langView('field_division_on_amkr_arrival', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: true,
                        dom: 'Bfrtip',
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
                                        sheetName: 'Принимаемый состав',
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
                                            cars_detali.table_arrival_cars.obj.colReorder.reset();
                                        }
                                    },
                                ],
                                autoClose: true
                            },
                            {
                                text: langView('title_arrival_sostav', langs),
                                action: function (e, dt, node, config) {
                                    if (cars_detali.table_arrival_cars.list && cars_detali.table_arrival_cars.list.length > 0) {
                                        pn_arrival_sostav.Open(cars_detali.id_sostav);

                                    } else {
                                        cars_detali.alert.clear_message();
                                        cars_detali.alert.out_warning_message("Вагоны в составе не определены! Сначала добавьте вагоны.")
                                    }
                                },
                                enabled: false
                            },
                            {
                                text: langView('title_return_car', langs),
                                action: function (e, dt, node, config) {

                                    var index = cars_detali.table_arrival_cars.obj.rows({ selected: true });
                                    var row_cars = cars_detali.table_arrival_cars.obj.rows(index[0]).data();
                                    if (row_cars && row_cars.length > 0) {

                                        dialog_confirm.open('Вернуть вагон', 'Вы уверены что хотите вернуть вагон №' + row_cars[0].num + ' в состав на подходах', function (result) {
                                            if (result) {
                                                LockScreen(langView('mess_clear_vagon', langs));
                                                var id = row_cars[0].id;
                                                var list_cont;
                                                // Найдем контейнеры принадлежащие вагону
                                                cars_detali.ids_inc.getArrivalCarsOfID(id, function (cars) {
                                                    if (cars) {
                                                        // вагон получен
                                                        cars_detali.del_vagon(cars, function (result) {
                                                            if (result > 0) {


                                                                cars_detali.alert.out_info_message('Вагон №' + row_cars[0].num + ' - возвращен в сотав на подходах!');
                                                                cars_detali.update_sostav = true;
                                                                // Показать 
                                                                cars_detali.view(table_sostav.select_sostav.id, false);
                                                            }
                                                            LockScreenOff();
                                                        });

                                                    } else {
                                                        // вагона нет
                                                        cars_detali.alert.clear_message();
                                                        cars_detali.alert.out_warning_message("Вагон №" + row_cars[0].num + " в таблице [IDS].[ArrivalCars] перечня вагонов составов на подходах  - не найден!");
                                                        LockScreenOff();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    //if (cars_detali.table_arrival_cars.list && cars_detali.table_arrival_cars.list.length > 0) {
                                    //    pn_arrival_sostav.Open(cars_detali.id_sostav);

                                    //} else {
                                    //    cars_detali.alert.clear_message();
                                    //    cars_detali.alert.out_warning_message("Вагоны в составе не определены! Сначала добавьте вагоны.");
                                    //}
                                },
                                enabled: false
                            },
                            {
                                extend: 'pageLength',
                            }
                        ]
                    }).on('select deselect', function (e, dt, type, indexes) {
                        // Определим активность кнопки венрнуть вагон
                        cars_detali.table_arrival_cars.enable_button_return();
                    });
                    //$('body').find('.dataTables_scrollBody').wrap('<div id="scroll_div"></div>');
                    //$('#scroll_div').doubleScroll();
                },
                // Показать таблицу с данными
                view: function (arrival_vagons) {
                    cars_detali.table_arrival_cars.load(arrival_vagons);
                    // Определим активность кнопки принять состав
                    if (cars_detali.sostav && cars_detali.sostav.status < 2 && cars_detali.table_arrival_cars.list && cars_detali.table_arrival_cars.list.length > 0) {
                        cars_detali.table_arrival_cars.obj.button(2).enable(true);
                    } else {
                        cars_detali.table_arrival_cars.obj.button(2).enable(false);
                    }
                    // Определим активность кнопки вернуть вагон
                    cars_detali.table_arrival_cars.enable_button_return();
                    cars_detali.table_arrival_cars.obj.draw();

                },
                // Загрузить данные
                load: function (arrival_vagons) {
                    cars_detali.table_arrival_cars.list = arrival_vagons;
                    cars_detali.table_arrival_cars.obj.clear();
                    for (i = 0; i < arrival_vagons.length; i++) {
                        cars_detali.table_arrival_cars.obj.row.add(cars_detali.table_arrival_cars.get_row(arrival_vagons[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    var doc_uz = data.Arrival_UZ_Vagon && data.Arrival_UZ_Vagon.Arrival_UZ_Document ? data.Arrival_UZ_Vagon.Arrival_UZ_Document : null;
                    var vag_uz = data.Arrival_UZ_Vagon ? data.Arrival_UZ_Vagon : null;
                    // Вагон
                    var dir_car = vag_uz && vag_uz.Directory_Wagons ? vag_uz.Directory_Wagons : null;
                    // Последняяаренда
                    var current_rent = cars_detali.get_current_rent(dir_car);

                    var dir_division = vag_uz && vag_uz.Directory_Divisions ? vag_uz.Directory_Divisions : null;

                    return {
                        "id": data.id,
                        "position": data.position_arrival,
                        "num": data.num,
                        // Cars
                        "car_countrys": dir_car && dir_car.Directory_Countrys ? cars_detali.ids_inc.ids_dir.getValueObj(dir_car.Directory_Countrys, 'country_abbr', cars_detali.lang) : null,
                        "car_adm": dir_car && dir_car.Directory_Countrys ? cars_detali.ids_inc.ids_dir.getValueObj(dir_car.Directory_Countrys, 'code_sng') : null,
                        "car_rod": dir_car && dir_car.Directory_GenusWagons ? cars_detali.ids_inc.ids_dir.getValueObj(dir_car.Directory_GenusWagons, 'abbr', cars_detali.lang) : null,
                        "car_kol_os": dir_car && dir_car.kol_os ? Number(dir_car.kol_os) : null,
                        "car_usl_tip": dir_car ? dir_car.usl_tip : null,
                        "car_date_rem_uz": dir_car && dir_car.date_rem_uz ? dir_car.date_rem_uz.replace(/T/g, ' ') : null,
                        "car_date_rem_vag": dir_car && dir_car.date_rem_vag ? dir_car.date_rem_vag.replace(/T/g, ' ') : null,
                        "car_owner": dir_car && dir_car.Directory_OwnersWagons ? cars_detali.ids_inc.ids_dir.getValueObj(dir_car.Directory_OwnersWagons, 'abbr', cars_detali.lang) : null,
                        "car_operator": current_rent && current_rent.Directory_OperatorsWagons ? cars_detali.ids_inc.ids_dir.getValueObj(current_rent.Directory_OperatorsWagons, 'abbr', cars_detali.lang) : null,
                        "limiting": current_rent ? cars_detali.ids_inc.ids_dir.getValue_LimitingLoading_Of_Code(current_rent.limiting, 'abbr', cars_detali.lang) : null,
                        "car_rent_start": doc_uz && doc_uz.rent_start ? doc_uz.rent_start.replace(/T/g, ' ') : null,

                        // По документу
                        "nom_doc": doc_uz ? doc_uz.nom_doc : null,
                        "nom_main_doc": doc_uz ? doc_uz.nom_main_doc : null,

                        "gruzp": vag_uz ? Number(vag_uz.gruzp) : null,
                        "u_tara": vag_uz && vag_uz.u_tara ? Number(Number(vag_uz.u_tara) / 1000).toFixed(3) : null,

                        "condition": vag_uz && vag_uz.id_condition ? cars_detali.ids_inc.ids_dir.getValue_ConditionArrival_Of_ID(vag_uz.id_condition, 'condition_abbr', cars_detali.lang) : null,

                        "code_stn_from": doc_uz ? doc_uz.code_stn_from : null,
                        "name_stn_from": doc_uz ? cars_detali.ids_inc.ids_dir.getValue_ExternalStation_Of_Code(doc_uz.code_stn_from, 'station_name', cars_detali.lang) : null,
                        "code_stn_to": doc_uz ? doc_uz.code_stn_to : null,
                        "name_stn_to": doc_uz ? cars_detali.ids_inc.ids_dir.getValue_ExternalStation_Of_Code(doc_uz.code_stn_to, 'station_name', cars_detali.lang) : null,
                        "code_border_checkpoint": doc_uz ? doc_uz.code_border_checkpoint : null,
                        "name_border_checkpoint": doc_uz ? cars_detali.ids_inc.ids_dir.getValue_BorderCheckpoint_Of_Code(doc_uz.code_border_checkpoint, 'station_name', cars_detali.lang) : null,
                        "cross_time": doc_uz && doc_uz.cross_time ? doc_uz.cross_time.replace(/T/g, ' ') : null,
                        "code_shipper": doc_uz ? doc_uz.code_shipper : null,
                        "name_shipper": doc_uz ? cars_detali.ids_inc.ids_dir.getValue_Shipper_Of_Code(doc_uz.code_shipper, 'shipper_name', cars_detali.lang) : null,
                        "code_consignee": doc_uz ? doc_uz.code_consignee : null,
                        "name_consignee": doc_uz ? cars_detali.ids_inc.ids_dir.getValue_Consignee_Of_Code(doc_uz.code_consignee, 'name', null) : null,

                        "code_payer_sender": doc_uz ? doc_uz.code_payer_sender : null,
                        "name_payer_sender": doc_uz ? cars_detali.ids_inc.ids_dir.getValue_PayerSender_Of_Code(doc_uz.code_payer_sender, 'payer_name', cars_detali.lang) : null,
                        "distance_way": doc_uz ? doc_uz.distance_way : null,
                        "note": doc_uz ? doc_uz.note : null,

                        "vesg": vag_uz && vag_uz.vesg ? Number(Number(vag_uz.vesg) / 1000).toFixed(3) : null,
                        "cargo": vag_uz && vag_uz.Directory_Cargo ? cars_detali.ids_inc.ids_dir.getValueObj(vag_uz.Directory_Cargo, 'cargo_name', cars_detali.lang) : null,
                        "station_on_amkr": vag_uz && vag_uz.Directory_Station ? cars_detali.ids_inc.ids_dir.getValueObj(vag_uz.Directory_Station, 'station_name', cars_detali.lang) : null,
                        "division_on_amkr": dir_division ? cars_detali.ids_inc.ids_dir.getValueObj(dir_division, 'division_abbr', cars_detali.lang) : null
                    };
                },
                // Состяние кнопки "Вернуть вагон"
                enable_button_return: function () {
                    var count = cars_detali.table_arrival_cars.obj.rows({ selected: true }).count();
                    cars_detali.table_arrival_cars.obj.button(3).enable(count > 0 && cars_detali.sostav && cars_detali.sostav.status < 2 ? true : false);
                }
            },
            // СПРАВОЧНИКИ И СПИСКИ *************************************************************************************************************************************************
            //-------------------------------------------------------------------------------------
            // Загрузка справочников(библиотек)
            //-------------------------------------------------------------------------------------
            // Загрузка справочников(библиотек)
            loadReference: function (callback) {
                LockScreen(langView('mess_load', langs));
                var count = 1;
                cars_detali.ids_inc.load([], ['hazard_class', 'commercial_condition', 'certification_data', 'payer_sender', 'cargo', 'cargo_gng', 'cargo_etsng', 'cargo_group', 'type_wagons', 'condition_arrival', 'type_owner_ship', 'limiting_loading', 'operators_wagons', 'owners_wagons', 'genus_wagon', 'countrys', 'railway', 'inlandrailway', 'external_station', 'station', 'consignee', 'shipper', 'border_checkpoint', 'divisions'], ['internal_railroad', 'cargo'], false, function () {
                    count -= 1;
                    if (count === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            },
            //-------------------------------------------------------------------------------------
            // Валидация справочников
            //-------------------------------------------------------------------------------------

            // Валидация поля  "администрация вагона"
            validation_adm: function (valid, off_message) {
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_kod_adm, "Укажите код администрации", "", off_message);
                valid = valid & cars_detali.val_card_vag.checkSelection(cars_detali.card_vag_name_adm, "Выберите администрацию", "", off_message);
                return valid;
            },
            // Валидация поля  "род вагона"
            validation_rod_vag: function (valid, off_message) {
                valid_rod = cars_detali.val_searsh_card_vag.checkInputOfNull(cars_detali.card_vag_name_rod_vag, "Укажите род вагона", "", off_message)
                valid = valid & valid_rod;
                if (valid_rod) {
                    valid = valid & cars_detali.val_searsh_card_vag.checkInputOfList(cars_detali.card_vag_name_rod_vag, cars_detali.ids_inc.ids_dir.getListGenusWagons('id', 'genus', cars_detali.lang, null), "Указаного 'Рода вагона' нет в справочнике", "", off_message);
                }
                return valid;
            },

            // Валидация поля  "Количество осей"
            validation_vag_kol_os: function (valid, off_message) {
                valid = valid & cars_detali.val_card_vag.checkSelection(cars_detali.card_vag_kol_os, "Укажите количество осей (0- по умолчанию, 4,8,12,16,32)", "", off_message);
                return valid;
            },
            // Валидация поля  "Грузоподъемность"
            validation_vag_gruzp: function (valid, off_message) {
                valid = valid & cars_detali.val_card_vag.checkInputOfRange(cars_detali.card_vag_gruzp, 0.0, 80.0, "Грузоподъемность должна быть в диапазоне от 0.0 до 80.0 тон.", "", off_message);
                return valid;
            },
            // Валидация поля  "Разметка по прибытию"
            validation_vag_condition_arrival: function (valid, off_message) {
                valid = valid & cars_detali.val_arrival_car.checkSelection(cars_detali.uz_vag_condition_arrival, "Укажите разметку по прибытию", "", off_message);
                return valid;
            },
            // Валидация поля  "Станция амкр"
            validation_vag_station_on_amkr: function (valid, off_message) {
                valid = valid & cars_detali.val_arrival_car.checkSelection(cars_detali.uz_vag_station_on_amkr, "Укажите станцию АМКР на которую будет отправлен вагон", "", off_message);
                return valid;
            },
            // Валидация поля  "Цех амкр"
            validation_vag_devision_on_amkr: function (valid, off_message) {
                valid_code = cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_vag_devision_on_amkr_name, "Не указан цех получатель");
                valid = valid & valid_code;
                if (valid_code) {
                    valid_name = cars_detali.val_searsh_card_vag.checkInputOfList(cars_detali.uz_vag_devision_on_amkr_name, cars_detali.ids_inc.ids_dir.getListDivisions('id', 'division_abbr', cars_detali.lang, null), "Указаного цеха нет в справочнике", "", off_message);
                    valid = valid & valid_name;
                    //if (valid_name)
                    //    cars_detali.val_arrival_car.set_control_ok(cars_detali.uz_vag_devision_on_amkr_kod, "");
                }
                return valid;
            },
            // Валидация поля  "Платильщик по отправке"
            validation_vagon_pay: function (valid, off_message) {
                //valid = valid & cars_detali.val_arrival_car.checkInputTextOfDirectory_IsNull(cars_detali.uz_rask_name_plat, this, 'ids_inc.ids_dir.getPayerSender_Of_CultureName', 'payer_name', "Указанного плательщика по отправке нет в справочнике ИДС.", "", off_message);
                valid_pay = cars_detali.val_arrival_car.checkInputOfNull(cars_detali.uz_rask_kod_plat, "Не указан плательщик по отправке", "", off_message);
                valid = valid & valid_pay;
                if (valid_pay) {
                    valid = valid & cars_detali.val_arrival_car.checkInputOfDirectory(cars_detali.uz_rask_kod_plat, this, 'ids_inc.ids_dir.getPayerSender_Of_Code', "Указанного плательщика по отправке нет в справочнике ИДС.", "", off_message);
                }
                return valid;
            },
            // Валидация данных справочника "Карточки вагонов"
            validation_card_vag: function () {
                cars_detali.val_card_vag.clear_all();
                var valid = true;
                valid = valid & cars_detali.validation_adm(valid, false);
                valid = valid & cars_detali.validation_rod_vag(valid, false);
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_name_owner, "Укажите собственника");
                valid = valid & cars_detali.val_card_vag.checkInputOfList(cars_detali.card_vag_name_owner, cars_detali.ids_inc.ids_dir.getListOwnersWagons('id', 'owner', cars_detali.lang, null), "Указаного 'Владельца' нет в справочнике");
                valid = valid & cars_detali.val_card_vag.checkInputOfList_IsNull(cars_detali.card_vag_name_operator, cars_detali.ids_inc.ids_dir.getListOperatorsWagons('id', 'operators', cars_detali.lang, null), "Указаного 'Оператора' нет в справочнике");
                valid = valid & cars_detali.validation_vag_gruzp(valid, false);
                valid = valid & cars_detali.validation_vag_kol_os(valid, false);
                cars_detali.val_card_vag.set_control_ok(cars_detali.card_vag_usl_tip);
                valid = valid & cars_detali.val_card_vag.checkInputOfDateTime_IsNull(cars_detali.card_vag_date_rem_vag.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & cars_detali.val_card_vag.checkInputOfDateTime_IsNull(cars_detali.card_vag_date_rem_uz.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & cars_detali.val_card_vag.checkInputOfList_IsNull(cars_detali.card_vag_limiting_loading, cars_detali.ids_inc.ids_dir.getListLimitingLoading('id', 'limiting_name', cars_detali.lang, null), "Указаного 'Ограничения погрузки' нет в справочнике");
                //valid = valid & cars_detali.val_card_vag.checkInputOfList_IsNull(cars_detali.card_vag_type_ownership, cars_detali.ids_inc.ids_dir.getListTypeOwnerShip('id', 'type_ownership', cars_detali.lang, null), "Указаного 'Признака собственности' нет в справочнике");
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_rent_start.obj, "Укажите время начало аренды");
                cars_detali.val_card_vag.set_control_ok(cars_detali.card_vag_note);
                return valid;
            },
            // Валидация данных поиска в справочнике "Карточки вагонов"
            validation_searsh_card_vag: function () {
                cars_detali.val_searsh_card_vag.clear_all();
                var valid = true;
                valid = valid & cars_detali.validation_adm(valid, false);
                valid = valid & cars_detali.validation_rod_vag(valid, false);
                valid = valid & cars_detali.validation_vag_kol_os(valid, false);
                cars_detali.val_searsh_card_vag.set_control_ok(cars_detali.card_vag_usl_tip);
                return valid;
            },

            //-------------------------------------------------------------------------------------
            // Правка справочников
            //-------------------------------------------------------------------------------------
            // Добавить запись в справочник Shipper
            addDirectory_Shipper: function (stn, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postShipper({
                    code: stn,
                    shipper_name_ru: name,
                    shipper_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadShipper(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            // Добавить запись в справочник ExternalNetworkStation
            addDirectory_ExternalStation: function (stn, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                // Поиск дороги простым способом
                //var ir = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn);
                ////
                //if (ir === null) {

                //}
                // Найдем запись внешней станции в спраочнике УЗ 
                cars_detali.ids_inc.uz_dir.getStationsOfCodeCS(stn, function (external_station) {
                    if (external_station) {
                        // Станция найдена, определим дорогу
                        var ir = cars_detali.ids_inc.uz_dir.list_internal_railroad.find(function (o) { return o.id === external_station.id_ir; });
                        if (ir) {
                            // Дорога определена, сохраним
                            cars_detali.ids_inc.ids_dir.postExternalStation({
                                code: stn,
                                station_name_ru: name,
                                station_name_en: name,
                                code_inlandrailway: ir.code,
                                create: toISOStringTZ(new Date()),
                                create_user: cars_detali.user
                            }, function (result_add) {
                                if (result_add > 0) {
                                    // Ок
                                    cars_detali.ids_inc.ids_dir.loadExternalStation(function () {
                                        if (typeof callback_ok === 'function') {
                                            callback_ok();
                                        }
                                        LockScreenOff();
                                    });
                                } else {
                                    cars_detali.alert.clear_message();
                                    cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                                    if (typeof callback_err === 'function') {
                                        callback_err();
                                    }
                                    LockScreenOff();
                                }
                            });
                        }

                    } else {
                        // Станция не найдена
                        // cars_detali.alert.clear_message();
                        cars_detali.alert.out_warning_message("Во внутреннем справочнике УЗ нет станции " + stn_from + ", добавьте станцию вручную или обновите справочник УЗ.");
                        LockScreenOff();
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                    }
                });


            },
            // Добавить запись в справочник BorderCheckpoint
            addDirectory_BorderCheckpoint: function (stn, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                var ir = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn);
                cars_detali.ids_inc.ids_dir.postBorderCheckpoint(
                    {
                        code: stn,
                        station_name_ru: name,
                        station_name_en: name,
                        code_inlandrailway: ir.code,
                        create: toISOStringTZ(new Date()),
                        create_user: cars_detali.user
                    },
                    function (result_add) {
                        if (result_add > 0) {
                            // Ок
                            cars_detali.ids_inc.ids_dir.loadBorderCheckpoint(function () {
                                if (typeof callback_ok === 'function') {
                                    callback_ok();
                                }
                                LockScreenOff();
                            });
                        } else {
                            cars_detali.alert.clear_message();
                            cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                            if (typeof callback_err === 'function') {
                                callback_err();
                            }
                            LockScreenOff();
                        }
                    });
            },
            // Добавить запись в справочник "Карточки вагонов"
            addDirectory_Cars: function (callback_ok, callback_err) {
                var valid = cars_detali.validation_card_vag();
                if (valid) {
                    LockScreen(langView('mess_save', langs));

                    var note = cars_detali.card_vag_note.val();
                    // Получим запись по вагону
                    var new_wagon = {
                        num: cars_detali.select_num,
                        id_countrys: get_select_number_value(cars_detali.card_vag_name_adm),
                        id_genus: cars_detali.ids_inc.ids_dir.getID_GenusWagons_Internal_Of_Name(cars_detali.card_vag_name_rod_vag.val(), 'genus', cars_detali.lang),
                        id_owner: cars_detali.ids_inc.ids_dir.getID_OwnersWagons_Internal_Of_Name(cars_detali.card_vag_name_owner.val(), 'owner', cars_detali.lang),
                        id_operator: null,
                        change_operator: null,
                        gruzp: cars_detali.card_vag_gruzp.val() !== '' ? Number(cars_detali.card_vag_gruzp.val()) : null,
                        tara: cars_detali.card_vag_tara.val() !== '' ? Number(cars_detali.card_vag_tara.val()) : null,
                        kol_os: Number(cars_detali.card_vag_kol_os.val()),
                        usl_tip: get_input_string_value(cars_detali.card_vag_usl_tip),
                        date_rem_uz: toISOStringTZ(get_date_value(cars_detali.card_vag_date_rem_uz.val(), cars_detali.lang)),
                        date_rem_vag: toISOStringTZ(get_date_value(cars_detali.card_vag_date_rem_vag.val(), cars_detali.lang)),
                        id_type_ownership: get_select_number_value(cars_detali.card_vag_type_ownership),
                        sign: null,
                        factory_number: null,
                        inventory_number: null,
                        year_built: null,
                        exit_ban: null,
                        note: note == null || note == '' ? 'Строка создана в ручном режиме' : note,
                        sobstv_kis: null,
                        bit_warning: true,
                        create: toISOStringTZ(new Date()),
                        create_user: cars_detali.user
                    };
                    // Получиим запись по аренде
                    var new_wagon_rent = {
                        id: 0,
                        num: cars_detali.select_num,
                        id_operator: null,
                        id_limiting: null,
                        rent_start: toISOStringTZ(get_datetime_value(cars_detali.card_vag_rent_start.val(), cars_detali.lang)),
                        rent_end: null,
                        create: toISOStringTZ(new Date()),
                        create_user: cars_detali.user,
                        parent_id: null

                    }
                    //id_operator: cars_detali.ids_inc.ids_dir.getID_OperatorsWagons_Internal_Of_Name(cars_detali.card_vag_name_operator.val(), 'operators', cars_detali.lang),
                    //id_limiting: cars_detali.ids_inc.ids_dir.getID_LimitingLoading_Internal_Of_Name(cars_detali.card_vag_limiting_loading.val(), 'limiting_name', cars_detali.lang),
                    //rent_start: toISOStringTZ(get_datetime_value(cars_detali.card_vag_rent_start.val(), cars_detali.lang)),
                    cars_detali.ids_inc.ids_dir.postWagon(new_wagon, function (result_add_wagon) {
                        if (result_add_wagon > 0) {
                            // Если вагон добавлен добавим аренду
                            // Ок вагон
                            cars_detali.ids_inc.ids_dir.postWagonsRent(new_wagon_rent, function (result_add_rent) {
                                if (result_add_rent > 0) {
                                    // Ок аренда
                                    if (typeof callback_ok === 'function') {
                                        callback_ok();
                                    }
                                    LockScreenOff();
                                } else {
                                    cars_detali.val_card_vag.clear_all();
                                    cars_detali.val_card_vag.out_error_message("Ошибка. При добавлении записи оператора и аренды в справочник аренд вагонов ИДС - возникла ошибка!");
                                    if (typeof callback_err === 'function') {
                                        callback_err();
                                    }
                                    LockScreenOff();
                                }
                            });
                        } else {
                            cars_detali.val_card_vag.clear_all();
                            cars_detali.val_card_vag.out_error_message("Ошибка. При добавлении записи в справочник вагонов ИДС - возникла ошибка!");
                            if (typeof callback_err === 'function') {
                                callback_err();
                            }
                            LockScreenOff();
                        }
                    });
                };
            },
            // Добавить запись в справочник PayerSender
            addDirectory_PayerSender: function (code, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postPayerSender({
                    code: code,
                    payer_name_ru: name,
                    payer_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadPayerSender(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            // Добавить запись в справочник CargoETSNG
            addDirectory_CargoETSNG: function (code, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postCargoETSNG({
                    code: code,
                    cargo_etsng_name_ru: name,
                    cargo_etsng_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.postCargo({
                            id: 0,
                            id_group: 0,
                            id_cargo_etsng: result_add,
                            cargo_name_ru: name.substr(0, 49),
                            cargo_name_en: name.substr(0, 49),
                            create: toISOStringTZ(new Date()),
                            create_user: cars_detali.user
                        }, function (result_add_cargo) {
                            if (result_add_cargo > 0) {
                                cars_detali.ids_inc.ids_dir.loadCargoETSNG(function () {
                                    cars_detali.ids_inc.ids_dir.loadCargo(function () {
                                        if (typeof callback_ok === 'function') {
                                            callback_ok();
                                        }
                                        LockScreenOff();
                                    });
                                });
                            } else {
                                cars_detali.alert.clear_message();
                                cars_detali.alert.out_error_message("Ошибка. При добавлении записи в в основной справочник 'Грузов' возникла ошибка.");
                                if (typeof callback_err === 'function') {
                                    callback_err();
                                }
                                LockScreenOff();
                            }
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник 'Грузов ЕТСНГ' возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            // Добавить запись в справочник CargoGNG
            addDirectory_CargoGNG: function (code, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postCargoGNG({
                    code: code,
                    cargo_gng_name_ru: name,
                    cargo_gng_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadCargoGNG(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник 'Грузов ЕТСНГ' возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            //-------------------------------------------------------------------------------------
            // функции справочников
            //-------------------------------------------------------------------------------------
            // Получить страку по вагону из справочника по номеру вагона
            get_vagon_of_num: function (num, callback) {
                cars_detali.ids_inc.ids_dir.getWagonOfNum(num, function (result_card) {
                    if (typeof callback === 'function') {
                        callback(result_card);
                    }
                });
            },
            // Получить текущий вагон из справочника
            get_vagon_dir: function (vagon, num, callback) {
                var specification = { adm: vagon.kod_adm, rod: vagon.rod_vag, kol_os: vagon.kol_os, usl_tip: vagon.usl_tip }
                cars_detali.ids_inc.ids_dir.getWagonOfNumSpecification(num, specification, function (result_card) {
                    //cars_detali.ids_inc.ids_dir.getWagonOfNumAdmRod(num, vagon.kod_adm, vagon.rod_vag, vagon.kol_os, vagon.usl_tip, function (result_card) {
                    //result_card = null;
                    if (typeof callback === 'function') {
                        callback(result_card);
                    }
                });
            },
            // Получить текущий вагон из справочника (в ручном режиме)
            get_vagon_of_num_dir: function (num, callback) {
                cars_detali.get_vagon_of_num(num, function (vagon) {
                    var adm = cars_detali.ids_inc.ids_dir.getCountrys_Internal_Of_ID(0);
                    var rod = cars_detali.ids_inc.ids_dir.getGenusWagons_Internal_Of_ID(0);
                    var kol_os = 0;
                    var usl_tip = null;
                    // Вагон есть в базе
                    if (vagon) {
                        // Преобразуем переменные
                        adm = cars_detali.ids_inc.ids_dir.getCountrys_Internal_Of_ID(vagon.id_countrys);
                        rod = cars_detali.ids_inc.ids_dir.getGenusWagons_Internal_Of_ID(vagon.id_genus);
                        kol_os = vagon.kol_os;
                        usl_tip = vagon.usl_tip;
                    }
                    // Создадим первую запись или обновим строку вагона в справочнике вагонов и аренд
                    var specification = { adm: (adm ? adm.code_sng : 0), rod: (rod ? rod.rod_uz : 0), kol_os: kol_os, usl_tip: (usl_tip === "" ? null : usl_tip) }
                    cars_detali.ids_inc.ids_dir.getWagonOfNumSpecification(num, specification, function (result_card) {
                        //cars_detali.ids_inc.ids_dir.getWagonOfNumAdmRod(num, (adm ? adm.code_sng : 0), (rod ? rod.rod_uz : 0), kol_os, (usl_tip === "" ? null : usl_tip), function (result_card) {
                        if (typeof callback === 'function') {
                            callback(result_card);
                        }
                    });
                });
            },
            // Вернуть текущую аренду вагона
            get_current_rent: function (vagon) {
                if (vagon && vagon.Directory_WagonsRent && vagon.Directory_WagonsRent.length > 0) {
                    var rent = vagon.Directory_WagonsRent.filter(function (i) {
                        return (i.rent_end) ? false : true;
                    });
                    if (rent && rent.length > 0) {
                        return rent[0];
                    }
                }
                return null;
            },
            // ЭЛЕКТРОННО ПЕРЕВОЗОЧНЫЙ ДОКУМЕНТ ************************************************************************************************************************************
            // !!! можно перенести в отдельный класс
            //-------------------------------------------------------------------------------------
            // функции обработки ЭПД
            //-------------------------------------------------------------------------------------
            // Получить основной документ
            get_main_epd: function (num_uz, callback) {
                if (num_uz) {
                    // Найдем основной документ
                    cars_detali.ids_inc.getOTPR_UZ_DOCOfNum_UZ(num_uz, function (result_main_otpr) {
                        if (typeof callback === 'function') {
                            callback(result_main_otpr);
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(null);
                    }
                }
            },

            // Получить из ЭПД информацию о вагоне
            get_vagon_epd: function (otpr, num) {
                if (otpr && otpr.vagon && otpr.vagon.length > 0) {
                    for (var i = 0; i < otpr.vagon.length; i++) {
                        if (Number(otpr.vagon[i].nomer) === num)
                            return otpr.vagon[i];
                    }
                }
                return null;
            },
            // Получить из ЭПД информацию о контейнерах на вагонах
            get_vagon_cont_epd: function (otpr, num) {
                if (otpr && otpr.cont && otpr.cont.length > 0) {
                    var conts = otpr.cont.filter(function (i) {
                        if (Number(i.nom_vag) === cars_detali.select_num) return true; else return false;
                    });
                    return conts;
                }
            },
            // Получить код рода упаковки
            get_epd_vagon_collect_v_pac: function (otpr_vagon) {
                if (otpr_vagon && otpr_vagon.collect_v && otpr_vagon.collect_v.length > 0) {
                    return otpr_vagon.collect_v[0].pac;
                }
                return null;
            },
            // Получить Кількість провідників
            get_epd_vagon_kol_conductor: function (otpr_vagon) {
                if (otpr_vagon) {
                    return otpr_vagon.kol_conductor;
                }
                return null;
            },
            // Получить плательщика по пребытию
            get_kod_pl_arrival_epd: function (otpr) {
                if (otpr && otpr.pl && otpr.pl.length > 0) {
                    for (var i = 0; i < otpr.pl.length; i++) {
                        if (Number(otpr.pl[i].type) === 1) {
                            //return otpr.pl[i].kod_plat ? Number(otpr.pl[i].kod_plat) : null;
                            return otpr.pl[i].kod_plat ? otpr.pl[i].kod_plat : null;
                        }
                    }
                }
                return null;
            },
            //// Получить из ЭПД информацию Сума по відправленню 
            //get_osum_epd: function (otpr) {
            //    return otpr ? otpr.osum : null;
            //},
            //// Получить из ЭПД информацию Сума по прибуттю
            //get_sum_deliv_epd: function (otpr) {
            //    return otpr ? otpr.sum_deliv : null;
            //},
            //// Получить из ЭПД информацию Винятковий тариф
            //get_taks_iskl_tar_epd: function (otpr) {
            //    return otpr && otpr.taks ? otpr.taks.iskl_tar : null;
            //},
            //// Получить из ЭПД информацию Код способу визначення маси (обов'язковий, якщо контейнер або вагон не порожній)
            //get_metod_epd: function (otpr) {
            //    return otpr ? otpr.metod : null;
            //},
            //// Получить из ЭПД информацию Найменування страхової компаніх одержувача
            //get_name_strah_komp_recipient_epd: function (otpr) {
            //    return otpr ? otpr.name_strah_komp_recipient : null;
            //},
            //// Получить из ЭПД информацию Найменування власника під'їзної колії 
            //get_text_branch_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.branch : null;
            //},
            //// Получить из ЭПД информацию Відмітки не обов'язкові для залізниці 
            //get_text_marks_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.marks : null;
            //},
            //// Получить из ЭПД информацию Розділи ТУ , згідно яких закріплений вантаж
            //get_text_mount_chapter_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.mount_chapter : null;
            //},
            //// Получить из ЭПД информацию Параграфи ТУ , згідно яких закріплений вантаж
            //get_text_mount_para_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.mount_para : null;
            //},
            //// Получить из ЭПД информацию Додаткові відомості про вантаж
            //get_text_name_gr_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.name_gr : null;
            //},
            //// Получить из ЭПД информацию Відмітки залізниці 
            //get_text_rw_note_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.rw_note : null;
            //},
            //// Получить из ЭПД информацию Знаки
            //get_text_sing_epd: function (otpr) {
            //    return otpr && otpr.text ? otpr.text.sing : null;
            //},
            // Получить из ЭПД информацию Особливі відмітки відправника
            get_text_zayava_epd: function (otpr) {
                return otpr && otpr.text ? otpr.text.zayava : null;
            },
            // Получить список платежок по всем платильщикам по указаному документу
            get_list_document_pay: function (otpr, id_document_uz) {
                var list_document_pay = [];
                if (otpr && otpr.pl && otpr.pl.length > 0) {
                    for (var i = 0; i < otpr.pl.length; i++) {
                        pl = otpr.pl[i];
                        if (pl && pl.pay && pl.pay.length > 0)
                            for (var ip = 0; ip < pl.pay.length; ip++) {
                                list_document_pay.push({ id: 0, id_document: id_document_uz, code_payer: Number(pl.kod_plat), type_payer: Number(pl.type), kod: pl.pay[ip].kod, summa: Number(pl.pay[ip].summa) });
                            }
                    }
                }
                return list_document_pay;
            },
            // Получить список актов по указаному документу
            get_list_document_acts: function (otpr, id_document_uz) {
                var list_document_acts = [];
                if (otpr && otpr.acts && otpr.acts.length > 0) {
                    for (var ia = 0; ia < otpr.acts.length; ia++) {
                        act = otpr.acts[ia];
                        if (!act.vagon_nom || !act.vagon_nom === '') {
                            // Акт не по вагону
                            list_document_acts.push({
                                id: 0,
                                id_document: id_document_uz,
                                date_akt: act.date_akt,
                                date_dved: act.date_dved,
                                nom_akt: act.nom_akt,
                                nom_dved: act.nom_dved,
                                prichina_akt: act.prichina_akt,
                                stn_akt: act.stn_akt,
                                stn_name_akt: act.stn_name_akt,
                                type: act.type,
                                vagon_nom: act.vagon_nom
                            });
                        }
                    }
                }
                return list_document_acts;
            },
            // Получить список сопроводительных документов по указаному документу
            get_list_document_docs: function (otpr, id_document_uz) {
                var list_document_docs = [];
                if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
                    for (var id = 0; id < otpr.sender_doc.length; id++) {
                        doc = otpr.sender_doc[id];
                        list_document_docs.push({
                            id: 0,
                            id_document: id_document_uz,
                            id_doc: doc.id,
                            description: doc.description,
                            doc_date: doc.doc_date,
                            doc_type: doc.doc_type,
                            doc_type_name: doc.doc_type_name,
                            doc: null,
                        });

                    }
                }
                return list_document_docs;
            },
            // Получить список платежок по всем платильщикам по указаному вагону
            get_list_vagon_pay: function (otpr_vagon, id_vagon) {
                var list_vagon_pay = [];
                if (otpr_vagon && otpr_vagon.pay_v && otpr_vagon.pay_v.length > 0) {
                    for (var i = 0; i < otpr_vagon.pay_v.length; i++) {
                        pay = otpr_vagon.pay_v[i];
                        list_vagon_pay.push({ id: 0, id_vagon: id_vagon, kod: pay.kod, summa: Number(pay.summa) });
                    }
                }
                return list_vagon_pay;
            },
            // Получить список актов по указаному вагону
            get_list_vagon_acts: function (otpr, id_vagon, num) {
                var list_vagon_acts = [];
                if (otpr && otpr.acts && otpr.acts.length > 0) {
                    for (var ia = 0; ia < otpr.acts.length; ia++) {
                        act = otpr.acts[ia];
                        if (Number(act.vagon_nom) === num) {
                            // Акт по вагону
                            list_vagon_acts.push({
                                id: 0,
                                id_vagon: id_vagon,
                                date_akt: act.date_akt,
                                date_dved: act.date_dved,
                                nom_akt: act.nom_akt,
                                nom_dved: act.nom_dved,
                                prichina_akt: act.prichina_akt,
                                stn_akt: act.stn_akt,
                                stn_name_akt: act.stn_name_akt,
                                type: act.type,
                                vagon_nom: act.vagon_nom
                            });
                        }
                    }
                }
                return list_vagon_acts;
            },
            // Получить список контейнеров на вагоне
            get_list_vagon_cont: function (otpr_cont, id_vagon) {
                var list_vagon_cont = [];
                if (otpr_cont && otpr_cont.length > 0) {
                    for (var ic = 0; ic < otpr_cont.length; ic++) {
                        var cont = otpr_cont[ic];
                        var collect_k = cont && cont.collect_k ? cont.collect_k : null;
                        var zpu_k = cont && cont.zpu_k && cont.zpu_k.length > 0 ? cont.zpu_k[0] : null;
                        var cargo = cars_detali.ids_inc.ids_dir.getCargo_Of_ETSNGCodeCultureName(collect_k.kod_etsng, collect_k.name_etsng, cars_detali.lang);
                        var gng = cars_detali.ids_inc.ids_dir.getCargoGNG_Of_CodeCultureName(collect_k.kod_gng, collect_k.name_gng, cars_detali.lang);
                        list_vagon_cont.push({
                            id: 0,
                            id_vagon: id_vagon,
                            nom_cont: cont.nom_cont,
                            kod_tiporazmer: cont.kod_tiporazmer,
                            gruzp: cont.gruzp,
                            ves_tary_arc: cont.ves_tary_arc,
                            id_cargo: cargo && cargo.length > 0 ? cargo[0].id : null,
                            id_cargo_gng: gng && gng.length > 0 ? gng[0].id : null,
                            kol_pac: collect_k ? collect_k.kol_pac : null,
                            pac: collect_k ? collect_k.pac : null,
                            vesg: collect_k ? collect_k.vesg : null,
                            vesg_reweighing: null,
                            nom_zpu: zpu_k ? zpu_k.nom_zpu : null
                        });
                    }
                }
                return list_vagon_cont;
            },
            // Получить список платежок по всем платильщикам по указаному контейнеру
            get_list_cont_pay: function (otpr_cont, cont) {
                var list_cont_pay = [];
                if (otpr_cont && otpr_cont.length > 0) {
                    for (var icr = 0; icr < otpr_cont.length; icr++) {
                        var cont_doc = otpr_cont[icr];
                        if (cont_doc.nom_cont === cont.nom_cont) {
                            if (cont_doc && cont_doc.pay_k && cont_doc.pay_k.length > 0) {
                                for (var i = 0; i < cont_doc.pay_k.length; i++) {
                                    pay = cont_doc.pay_k[i];
                                    list_cont_pay.push({ id: 0, id_cont: cont.id, kod: pay.kod, summa: Number(pay.summa) });
                                }
                            }
                        }
                    }
                }
                return list_cont_pay;
            },
        },

        //*************************************************************************************
        // ОКНО НАЙТИ ЭПД
        //*************************************************************************************
        pn_search_epd = {
            obj: null,
            // Таблица с документами
            table_epd: {
                html_table: $('#table-list-epd'),
                obj: null,
                list: null,
                select_UZ_DOC: null,
                // Инициализировать таблицу
                init: function () {
                    pn_search_epd.table_epd.obj = pn_search_epd.table_epd.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": {
                            "style": 'single',
                            "toggleable": false
                        },
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        //"scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            var bt_xml = $('<button type="button" class="btn btn-warning btn-sm" id="add-num-car-manual" title="Показать XML"><i class="fa fa-file-code-o" aria-hidden="true" ></i></button>');
                            bt_xml.on('click', function (event) {
                                pn_search_epd.table_epd.open_xml(data.xml_final);
                            });
                            $('td', row).eq(6).text('').append(bt_xml);
                        },
                        columns: [
                            { data: "id_doc", title: langView('field_epd_num_doc', langs), width: "50px", orderable: true, searchable: false },
                            { data: "revision", title: langView('field_epd_revision', langs), width: "50px", orderable: true, searchable: false },
                            { data: "status_name", title: langView('field_epd_status', langs), width: "50px", orderable: true, searchable: false },
                            { data: "dt", title: langView('field_epd_dt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "sender_code", title: langView('field_epd_code_from', langs), width: "50px", orderable: true, searchable: false },
                            { data: "recipient_code", title: langView('field_epd_code_on', langs), width: "50px", orderable: true, searchable: false },
                            { data: null, title: langView('field_epd_xml', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    })
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = pn_search_epd.table_epd.obj.rows(indexes).data();
                            if (rowData && rowData.length > 0) {
                                // Сохраним документ
                                pn_search_epd.table_epd.select_UZ_DOC = rowData[0];
                                // Получим вагоны
                                var vagon = rowData[0].otpr && rowData[0].otpr.vagon ? rowData[0].otpr.vagon : [];
                                // Проверим вагоны на пренадлежность текущему составу
                                if (pn_search_epd.sostav) {
                                    // Состав определен
                                    pn_search_epd.loading_cars.show();
                                    var select_vagon = [];
                                    for (i = 0; i < vagon.length; i++) {
                                        if (!pn_search_epd.is_car_of_arrival_sostav(vagon[i].nomer, pn_search_epd.sostav)) {
                                            // Вагона нет в текущем составе
                                            //select_vagon.push(vagon[i]);
                                            vagon[i]['operation'] = 1;
                                        } else {
                                            //Вагон есть в текущем составе
                                            //pn_search_epd.alert.out_warning_message("Вагон с номером " + vagon[i].nomer + " уже есть в составе, в который вы хотите добавить вагоны указанные найденном ЭПД УЗ.");
                                            vagon[i]['operation'] = 0;
                                        }
                                        select_vagon.push(vagon[i]);
                                    }
                                } else {
                                    // Состав не определен
                                    pn_search_epd.alert.clear_message();
                                    pn_search_epd.alert.out_error_message("Ошибка. Не указан состав, в который вы хотите добавить вагоны указанные найденном ЭПД УЗ");
                                }
                                // найдем вагоны на подходах
                                pn_search_epd.get_list_cars_of_period(1, select_vagon, function (cars) {
                                    // Отфильтруем вагоны в приоритете вагоны из текущего состава
                                    var cars_select = [];

                                    for (isv = 0; isv < select_vagon.length; isv++) {
                                        var cars_is_num = cars.filter(function (i) {
                                            if (i.num === Number(select_vagon[isv].nomer)) return true; else return false;
                                        });

                                        // Вагон есть в текущем составе, поэтому проверим если с подходов вернуло 2 вагона выбераем по id_sostava
                                        if (select_vagon[isv].operation === 0 && cars_is_num && cars_is_num.length > 1) {
                                            for (iin = 0; iin < cars_is_num.length; iin++) {
                                                if (cars_is_num[iin].id_arrival === pn_search_epd.sostav.id) {
                                                    cars_select.push(cars_is_num[iin]);
                                                }
                                            }
                                        } else {
                                            if (cars_is_num && cars_is_num.length > 0) {
                                                cars_select.push(cars_is_num[0]);
                                            }
                                        }
                                    }
                                    // Показать вагоны
                                    //pn_search_epd.loading_cars.show();
                                    pn_search_epd.table_car.view(select_vagon, cars_select);
                                });

                            }
                        });
                },
                // Показать таблицу с данными
                view: function (epds) {
                    pn_search_epd.table_epd.load(epds);
                    pn_search_epd.table_epd.obj.draw();
                },
                // Загрузить данные
                load: function (epds) {
                    pn_search_epd.table_epd.list = epds;
                    pn_search_epd.table_epd.obj.clear();
                    if (epds && epds.length > 0) {
                        for (i = 0; i < epds.length; i++) {
                            pn_search_epd.table_epd.obj.row.add(pn_search_epd.table_epd.get_row(epds[i]));
                        }
                    }
                    //else {
                    //    pn_search_epd.alert.out_warning_message("При попытке получить документ с УЗ, произошла ошибка.");

                    //}
                },
                // Получить строку для таблицы
                get_row: function (epds) {
                    return {
                        "id_doc": epds.id_doc,
                        "revision": epds.revision,
                        "status": epds.status,
                        "status_name": epds.status ? pn_search_epd.uz_sms.getValueCulture_Status_Of_Code(epds.status, 'status') : epds.status,
                        "dt": epds.dt !== null ? epds.dt.replace(/T/g, ' ') : null,
                        "sender_code": epds.sender_code,
                        "recipient_code": epds.recipient_code,
                        "xml": epds.xml,
                        "xml_final": epds.xml_final,
                        "otpr": epds.otpr
                    };
                },
                // Показать XML в открытом окне
                open_xml: function (xml) {
                    //var xmlString = xml2Str(xml);
                    myXmlWindow = window.open('', '', 'scrollbars=1');
                    myXmlWindow.document.write('<!DOCTYPE xml><title>Заголовок</title>' + $.parseHTML(xml));
                    //myXmlWindow.document.write('<?xml version="1.0" encoding="utf-8"?>'+xml);
                    myXmlWindow.focus();
                }
            },
            // Таблица с вагонами документа
            table_car: {
                html_table: $('#table-list-epd-car'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    pn_search_epd.table_car.obj = pn_search_epd.table_car.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        select: {
                            style: 'multi'
                        },
                        "autoWidth": false,
                        //"filter": true,
                        //"scrollY": "200px",
                        //"scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //var bt_xml = $('<button type="button" class="btn btn-warning btn-sm" id="add-num-car-manual" title="Показать XML"><i class="fa fa-file-code-o" aria-hidden="true" ></i></button>');
                            //bt_xml.on('click', function (event) {
                            //    pn_search_epd.table_car.open_xml(data.xml_final);
                            //});
                            //$('td', row).eq(6).text('').append(bt_xml);
                        },
                        columns: [
                            { data: "num", title: langView('field_epd_car_num', langs), width: "50px", orderable: true, searchable: false },
                            { data: "operation_text", title: langView('field_epd_car_operation', langs), width: "300px", orderable: true, searchable: false },
                            { data: "arrival", title: langView('field_epd_sostav_arrival', langs), width: "100px", orderable: true, searchable: false },
                            { data: "composition_index", title: langView('field_epd_car_composition_index', langs), width: "100px", orderable: true, searchable: false },
                            { data: "train", title: langView('field_epd_car_train', langs), width: "50px", orderable: true, searchable: false },
                            { data: "staus", title: langView('field_epd_car_staus', langs), width: "100px", orderable: true, searchable: false },
                            { data: "arrival_car", title: langView('field_epd_car_arrival', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    }).on('select deselect', function (e, dt, type, indexes) {
                        // Определим количество выбранных вагонов
                        var count = pn_search_epd.table_car.obj.rows({ selected: true }).count();
                        // Если есть вагоны выбранные отобразим кнопку "Ок"
                        var buttons = pn_search_epd.obj.dialog("option", "buttons");
                        buttons[0].disabled = count > 0 ? false : true;
                        pn_search_epd.obj.dialog("option", "buttons", buttons);
                    });
                },
                // Показать таблицу с данными
                view: function (cars, cars_arrival) {
                    if (cars_arrival && cars_arrival.length > 0) {
                        pn_search_epd.table_car.load(cars, cars_arrival);
                        pn_search_epd.table_car.obj.draw();
                    } else {
                        if (cars_arrival && cars_arrival.length === 0) {
                            var nums = '';
                            for (i = 0; i < cars.length; i++) {
                                nums += cars[i].nomer + ((i < cars.length - 1) ? ',' : '');
                            }
                            pn_search_epd.alert.clear_message();
                            pn_search_epd.alert.out_warning_message("Вагон(ы) № [" + nums + "], перечисленные в документе не найдены в текущем составе или на подходах, добавьте вагоны вручную.");

                        } else {
                            // Просто Очистим окно
                            pn_search_epd.table_car.obj.clear();
                            pn_search_epd.table_car.obj.draw();
                        }
                        pn_search_epd.loading_cars.hide();
                    }
                },
                // Загрузить данные
                load: function (cars, cars_arrival) {
                    //pn_search_epd.table_car.list = cars;
                    pn_search_epd.table_car.obj.clear();
                    for (i = 0; i < cars.length; i++) {
                        pn_search_epd.table_car.obj.row.add(pn_search_epd.table_car.get_row(cars[i], cars_arrival));
                    }
                    pn_search_epd.loading_cars.hide();
                },
                // Получить строку для таблицы
                get_row: function (car, cars_arrival) {
                    var arrival_car = cars_arrival.find(function (element, index, array) {
                        if (element.num === Number(car.nomer)) return true; else return false;
                    });
                    var operation = Number(car.operation === 0 ? 0 : (arrival_car ? 2 : 1));
                    return {
                        "num": car.nomer,
                        //"operation": arrival_car ? 2 : (car.operation === 0 ? 0 : 1),
                        "operation_text": pn_search_epd.table_car.get_operation(operation, arrival_car ? arrival_car.arrival : null),
                        "operation": operation,
                        "arrival": arrival_car && arrival_car.ArrivalSostav && arrival_car.ArrivalSostav.date_arrival ? arrival_car.ArrivalSostav.date_arrival.replace(/T/g, ' ') : null,
                        "composition_index": arrival_car && arrival_car.ArrivalSostav ? arrival_car.ArrivalSostav.composition_index : null,
                        "train": arrival_car && arrival_car.ArrivalSostav ? arrival_car.ArrivalSostav.train : null,
                        "staus": arrival_car && arrival_car.ArrivalSostav ? pn_search_epd.ids_inc.getValueCulture_StatusArrival_Of_Code(arrival_car.ArrivalSostav.status, 'status') : null,
                        "arrival_car": arrival_car && arrival_car.arrival ? arrival_car.arrival.replace(/T/g, ' ') : null,
                        "id_car": arrival_car ? arrival_car.id : null,
                        "id_arrival": arrival_car ? arrival_car.id_arrival : null,
                    };
                },
                // Определим операцию над вагоном которая будет придложена
                get_operation: function (operation, arrival) {
                    if (arrival) {
                        return 'Вагон принят, пропустить';
                    }
                    switch (operation) {
                        case 0: return 'Вагон существует, только обновить ЭПД';
                        case 1: return 'Добавит новый вагон и обновить ЭПД';
                        case 2: return 'Перенести ранее принятый вагон и обновить ЭПД';
                    }
                },
                // Показать XML в открытом окне
                open_xml: function (xml) {
                    //var xmlString = xml2Str(xml);
                    myXmlWindow = window.open('', '', 'scrollbars=1');
                    myXmlWindow.document.write('<!DOCTYPE xml><title>Заголовок</title>' + $.parseHTML(xml));
                    //myXmlWindow.document.write('<?xml version="1.0" encoding="utf-8"?>'+xml);
                    myXmlWindow.focus();
                }
            },
            //
            sostav: null,       // Составы на подходах
            alert: null,        // Сообщения
            lang: null,
            user_name: null,
            uz_sms: null,      // модуль работы с СМС
            ids_inc: null,
            // Поля формы
            loading_cars: $('div#loading-cars'),
            loading_epd: $('div#loading-epd'),

            num_epd_to_search: $('input#num_epd_to_search'),
            // Кнопка ввести данные в ручную
            bt_num_epd_to_search: $('button#bt_num_epd_to_search').on('click', function (event) {
                event.preventDefault();
                pn_search_epd.alert.clear_message();
                if (pn_search_epd.num_epd_to_search.val() !== "") {
                    pn_search_epd.table_epd.view([]);
                    pn_search_epd.table_car.view([], null);
                    $('label#time-epd').text('');
                    pn_search_epd.alert.out_warning_message("Начат поиск ЭПД в 'АС Клиент' УЗ. Ожидайте поиск этой информации может занять несколько минут...");
                    pn_search_epd.loading_epd.show();
                    pn_search_epd.bt_num_epd_to_search.prop("disabled", true);
                    var start = moment();
                    var stop = moment();
                    var differentInSeconds = 0;
                    pn_search_epd.uz_sms.getUZ_DOC_Of_Num(pn_search_epd.num_epd_to_search.val(),
                        function (res_ok) {
                            pn_search_epd.alert.clear_message();
                            pn_search_epd.bt_num_epd_to_search.prop("disabled", false);
                            pn_search_epd.table_epd.view(res_ok);
                            pn_search_epd.loading_epd.hide();
                            stop = moment();
                            differentInSeconds = stop.diff(start, 'seconds');
                            $('label#time-epd').text('Время выполнения : ' + differentInSeconds + 'c.');

                        },
                        function (res_err) {
                            if (res_err) {
                                pn_search_epd.alert.clear_message();
                                pn_search_epd.alert.out_error_message("Ошибка. " + res_err.responseText);
                                pn_search_epd.bt_num_epd_to_search.prop("disabled", false);
                                pn_search_epd.loading_epd.hide();
                                stop = moment();
                                differentInSeconds = stop.diff(start, 'seconds');
                                $('label#time-epd').text('Время выполнения : ' + differentInSeconds + 'c.');
                            }
                        });
                } else {
                    pn_search_epd.alert.out_error_message("У кажите номер документа!");
                    pn_search_epd.loading_epd.hide();
                }

            }),
            // инициализвция Окна
            init: function (lang, user_name, callback_ok) {
                pn_search_epd.lang = lang;
                pn_search_epd.user_name = user_name;
                // создадим классы               
                pn_search_epd.alert = new ALERT($('div#search-epd-alert'));// Создадим класс ALERTG
                pn_search_epd.uz_sms = new UZ_SMS(pn_search_epd.lang); // Создадим класс IDS_RWT
                pn_search_epd.ids_inc = new IDS_RWT(pn_search_epd.lang); // Создадим класс IDS_RWT
                //pn_search_epd.val = new VALIDATION(pn_search_epd.lang, pn_search_epd.alert_sostav, pn_search_epd.all_obj); // Создадим класс VALIDATION
                pn_search_epd.table_epd.init();
                pn_search_epd.table_car.init();

                pn_search_epd.obj = $("div#search-epd").dialog({
                    resizable: false,
                    title: 'Найти ЭПД по номеру документа',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 1000,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {

                            disabled: true,
                            text: "Ок",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                pn_search_epd.add_cars(callback_ok);
                            }
                        },
                        {
                            text: "Отмена",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                // Sumbit form
                pn_search_epd.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
            },
            // открыть окно передав состав
            Open: function (sostav) {
                pn_search_epd.sostav = sostav;
                if (sostav) {
                    // если указан состав, в который нужно добавить вагоны тогда открываем диалоговое окно
                    pn_search_epd.alert.clear_message();
                    pn_search_epd.num_epd_to_search.val('');
                    $('label#time-epd').text('');
                    pn_search_epd.table_epd.view([]);
                    pn_search_epd.table_car.view([], null);
                    pn_search_epd.bt_num_epd_to_search.prop("disabled", false);
                    // Получим списвок текущих вагонов

                    pn_search_epd.obj.dialog("open");
                }
            },
            // Сохранить изменения по всем вагонам
            add_cars: function (callback_ok) {
                LockScreen(langView('mess_save', langs));
                var index = pn_search_epd.table_car.obj.rows({ selected: true });
                var row_cars = pn_search_epd.table_car.obj.rows(index[0]).data();
                // Получим позицию для добавления
                var position = pn_search_epd.sostav.ArrivalCars && pn_search_epd.sostav.ArrivalCars.length > 0 ? pn_search_epd.sostav.ArrivalCars.length + 1 : 1;

                // Обновим документ в базе документов ИДС
                pn_search_epd.ids_inc.ids_tr.postUZ_DOC_To_DB_IDS(pn_search_epd.table_epd.select_UZ_DOC, function (result_num) {
                    if (result_num && result_num !== "") {
                        // Определим количесво для определения конца обновления
                        var count = row_cars.length;
                        var result = [];

                        // Документ добавлен, пройдемся по вагонам
                        for (i = 0; i < row_cars.length; i++) {
                            var car = row_cars[i];
                            // Проверим. Вагон принят?
                            if (car.arrival_car === null) {
                                // Нет вагон не принят, проверим вагон есть на подходах
                                if (car.id_car > 0) {
                                    // Да, вагон наподходах
                                    pn_search_epd.update_car(car, result_num, position, function (result_upd) {
                                        count -= 1;
                                        result.push(result_upd);
                                        // Проверим конец сахранения 
                                        if (count === 0) {
                                            if (typeof callback_ok === 'function') {
                                                LockScreenOff();
                                                pn_search_epd.obj.dialog("close");
                                                callback_ok(result, true);
                                            }
                                        }
                                    });
                                    // Следующая позиция
                                    position += 1;
                                } else {
                                    // Нет, вагона  нет наподходах
                                    var new_car = {
                                        id: 0,
                                        id_arrival: pn_search_epd.sostav.id,
                                        num: car.num,
                                        position: position,
                                        position_arrival: null,
                                        consignee: pn_search_epd.table_epd.select_UZ_DOC.recipient_code,
                                        num_doc: result_num,
                                        id_transfer: null,
                                        note: "Добавлен (Поиск ЭПД по номеру)" + pn_search_epd.num_epd_to_search.val(),
                                        date_adoption_act: null,
                                        arrival: null,
                                        arrival_user: null,
                                        create: toISOStringTZ(new Date()),
                                        create_user: pn_search_epd.user_name,
                                    };
                                    // Следующая позиция
                                    position += 1;
                                    // Добавим данные
                                    pn_search_epd.add_car(new_car, function (result_add) {
                                        count -= 1;
                                        result.push(result_add);
                                        // Проверим конец сахранения 
                                        if (count === 0) {
                                            if (typeof callback_ok === 'function') {
                                                LockScreenOff();
                                                pn_search_epd.obj.dialog("close");
                                                callback_ok(result, true);
                                            }
                                        }
                                    });
                                }
                            } else {
                                // Вагон уже принят операция отменяется.
                                count -= 1;
                                result.push({ num: car.num, result: 0 });
                                // Проверим конец сахранения 
                                if (count === 0) {
                                    if (typeof callback_ok === 'function') {
                                        LockScreenOff();
                                        pn_search_epd.obj.dialog("close");
                                        callback_ok(result, true);
                                    }
                                }
                            }
                        }

                    } else {
                        // Ошибка документ не добавлен
                        LockScreenOff();
                        pn_search_epd.alert.clear_message();
                        pn_search_epd.alert.out_error_message("Ошибка. Найденый ЭПД №" + pn_search_epd.num_epd_to_search.val() + " не сохранился в базе документов ИДС");
                    }
                });
            },
            // Обновим вагон
            update_car: function (car, num_doc, position, callback_ok) {
                pn_search_epd.ids_inc.getArrivalCarsOfID(car.id_car, function (result_car) {
                    if (result_car) {
                        if (car.operation === 0) {
                            // только обновить эпд
                            result_car.note = "Обновили ЭПД" + pn_search_epd.num_epd_to_search.val();
                        } else {
                            // Перенос вагона
                            result_car.id_transfer = result_car.id_arrival;
                            result_car.id_arrival = pn_search_epd.sostav.id;
                            result_car.position = position;
                            result_car.note = "Перенесен (Поиск ЭПД по номеру)" + pn_search_epd.num_epd_to_search.val();
                        }
                        // Получим вагон.
                        result_car.num_doc = num_doc;
                        result_car.change = toISOStringTZ(new Date());
                        result_car.change_user = pn_search_epd.user_name;
                        result_car.UZ_DOC = null;
                        pn_search_epd.ids_inc.putArrivalCars(result_car, function (result_upd) {
                            if (typeof callback_ok === 'function') {
                                callback_ok({ num: result_car.num, result: result_upd >= 0 ? (car.operation === 0 ? 1 : 3) : -1 });
                            }
                        });
                    } else {
                        if (typeof callback_ok === 'function') {
                            callback_ok({ num: car.num, result: -1 });
                        }
                    }

                });
            },
            // Добавим новый вагон
            add_car: function (car, callback_ok) {
                pn_search_epd.ids_inc.postArrivalCars(car, function (result_add) {
                    if (typeof callback_ok === 'function') {
                        callback_ok({ num: car.num, result: result_add > 0 ? 2 : -1 });
                    }
                });
            },
            // Получить перечень составов на подходах за указаный период
            get_list_cars_of_period: function (day, vagon, callback) {
                // Состав указан, дата прибытия указана
                if (pn_search_epd.sostav && pn_search_epd.sostav.date_arrival) {
                    // Определим период
                    var stop = moment(pn_search_epd.sostav.date_arrival).add('days', day);
                    var start = moment(pn_search_epd.sostav.date_arrival).add('days', -1 * day);
                    // Определим вагоны
                    if (vagon && vagon.length > 0) {
                        // Вагоны указаны
                        var nums = '';
                        for (i = 0; i < vagon.length; i++) {
                            //if (vagon[i].operation === 1) {
                            nums += vagon[i].nomer + (i !== vagon.length - 1 ? ',' : '');
                            //}
                        }
                        // Получим перечень вагонов
                        if (nums !== '') {
                            pn_search_epd.ids_inc.getArrivalCarsOfPeriodNums(start._d, stop._d, nums, function (cars) {
                                if (typeof callback === 'function') {
                                    callback(cars);
                                }
                            });
                        } else {
                            if (typeof callback === 'function') {
                                callback([]);
                            }
                        }
                    } else {
                        // вагонов нет нет смысла переносить
                        //pn_search_epd.alert.clear_message();
                        pn_search_epd.alert.out_warning_message("В выбраном ЭПД нет вагонов для добавления");
                        if (typeof callback === 'function') {
                            callback(null);
                        }
                    }

                }
            },
            // Определить есть вагон в указаном списке
            is_car_of_arrival_sostav: function (num, arrival_sostav) {
                if (arrival_sostav && arrival_sostav.ArrivalCars && num) {
                    var arrival_car = arrival_sostav.ArrivalCars.find(function (element, index, array) {
                        if (element.num === Number(num)) return true; else return false;
                    });
                    if (arrival_car) return true; else return false;
                } else false;
            }

        },
        //*************************************************************************************
        // ОКНО ДОБАВИТЬ ВАГОН
        //*************************************************************************************
        pn_manual_car = {
            obj: null,
            // Таблица с вагонами документа
            table_car: {
                html_table: $('#table-list-manual-car'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    pn_manual_car.table_car.obj = pn_manual_car.table_car.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        select: {
                            style: 'multi'
                        },
                        "autoWidth": false,
                        //"filter": true,
                        //"scrollY": "200px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //var bt_xml = $('<button type="button" class="btn btn-warning btn-sm" id="add-num-car-manual" title="Показать XML"><i class="fa fa-file-code-o" aria-hidden="true" ></i></button>');
                            //bt_xml.on('click', function (event) {
                            //    pn_manual_car.table_car.open_xml(data.xml_final);
                            //});
                            //$('td', row).eq(6).text('').append(bt_xml);
                        },
                        columns: [
                            { data: "num", title: langView('field_manual_car_num', langs), width: "50px", orderable: true, searchable: false },
                            { data: "operation_text", title: langView('field_manual_car_operation', langs), width: "300px", orderable: true, searchable: false },
                            { data: "id_doc_new", title: langView('field_manual_car_id_doc_new', langs), width: "50px", orderable: true, searchable: false },
                            { data: "id_doc_arrival", title: langView('field_manual_car_id_doc_arrival', langs), width: "50px", orderable: true, searchable: false },
                            { data: "arrival", title: langView('field_manual_sostav_arrival', langs), width: "100px", orderable: true, searchable: false },
                            { data: "composition_index", title: langView('field_manual_car_composition_index', langs), width: "100px", orderable: true, searchable: false },
                            { data: "train", title: langView('field_manual_car_train', langs), width: "50px", orderable: true, searchable: false },
                            { data: "staus", title: langView('field_manual_car_staus', langs), width: "100px", orderable: true, searchable: false },
                            { data: "arrival_car", title: langView('field_manual_car_arrival', langs), width: "100px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    }).on('select deselect', function (e, dt, type, indexes) {
                        // Определим количество выбранных вагонов
                        var count = pn_manual_car.table_car.obj.rows({ selected: true }).count();
                        // Если есть вагоны выбранные отобразим кнопку "Ок"
                        var buttons = pn_manual_car.obj.dialog("option", "buttons");
                        buttons[0].disabled = count > 0 ? false : true;
                        pn_manual_car.obj.dialog("option", "buttons", buttons);
                    });
                },
                // Показать таблицу с данными
                view: function (cars, cars_arrival) {
                    pn_manual_car.table_car.load(cars, cars_arrival);
                    pn_manual_car.table_car.obj.draw();
                },
                // Загрузить данные
                load: function (cars, cars_arrival) {
                    //pn_manual_car.table_car.list = cars;
                    pn_manual_car.table_car.obj.clear();
                    for (i = 0; i < cars.length; i++) {
                        // Добавить документ в таблицу
                        pn_manual_car.table_car.obj.row.add(pn_manual_car.table_car.get_row(cars[i], cars_arrival));
                    }
                    pn_manual_car.loading_cars.hide();
                    pn_manual_car.bt_num_car_search.prop("disabled", false);
                },
                // Получить строку для таблицы
                get_row: function (car, cars_arrival) {
                    var arrival_car = cars_arrival.find(function (element, index, array) {
                        if (element.num === Number(car.num)) return true; else return false;
                    });
                    // Определим код операции.
                    var operation = arrival_car && arrival_car.id_arrival === pn_manual_car.sostav.id ? 0 : (arrival_car ? 2 : 1);
                    return {
                        "num": car.num,
                        "operation_text": pn_manual_car.table_car.get_operation(operation, arrival_car ? arrival_car.arrival : null),
                        "operation": operation,
                        "uz_doc": car.uz_doc,
                        "id_doc_new": car.uz_doc ? car.uz_doc.id_doc : null,
                        "id_doc_arrival": arrival_car && arrival_car.num_doc ? arrival_car.num_doc : null,
                        "arrival": arrival_car && arrival_car.ArrivalSostav && arrival_car.ArrivalSostav.date_arrival ? arrival_car.ArrivalSostav.date_arrival.replace(/T/g, ' ') : null,
                        "composition_index": arrival_car && arrival_car.ArrivalSostav ? arrival_car.ArrivalSostav.composition_index : null,
                        "train": arrival_car && arrival_car.ArrivalSostav ? arrival_car.ArrivalSostav.train : null,
                        "staus": arrival_car && arrival_car.ArrivalSostav ? pn_manual_car.ids_inc.getValueCulture_StatusArrival_Of_Code(arrival_car.ArrivalSostav.status, 'status') : null,
                        "arrival_car": arrival_car && arrival_car.arrival ? arrival_car.arrival.replace(/T/g, ' ') : null,
                        "id_car": arrival_car ? arrival_car.id : null,
                        "id_arrival": arrival_car ? arrival_car.id_arrival : null,
                    };
                },
                // Определим операцию над вагоном которая будет придложена
                get_operation: function (operation, arrival) {
                    if (arrival) {
                        return 'Вагон принят, пропустить';
                    }
                    switch (operation) {
                        case 0: return 'Вагон существует, только обновить ЭПД';
                        case 1: return 'Добавит новый вагон и обновить ЭПД';
                        case 2: return 'Перенести ранее принятый вагон и обновить ЭПД';
                    }
                },
                // Показать XML в открытом окне
                open_xml: function (xml) {
                    //var xmlString = xml2Str(xml);
                    myXmlWindow = window.open('', '', 'scrollbars=1');
                    myXmlWindow.document.write('<!DOCTYPE xml><title>Заголовок</title>' + $.parseHTML(xml));
                    //myXmlWindow.document.write('<?xml version="1.0" encoding="utf-8"?>'+xml);
                    myXmlWindow.focus();
                }
            },
            //
            sostav: null,       // Составы на подходах
            alert: null,        // Сообщения
            lang: null,
            user_name: null,
            uz_sms: null,      // модуль работы с СМС
            ids_inc: null,
            // Поля формы
            loading_cars: $('div#loading-cars'),

            manual_num_car: $('textarea#manual_num_car'),
            // Кнопка поиск информации в ИДС
            bt_num_car_search: $('button#bt_num_car_search').on('click', function (event) {
                event.preventDefault();
                pn_manual_car.alert.clear_message();
                if (pn_manual_car.manual_num_car.val() !== "") {
                    pn_manual_car.table_car.view([], null);
                    //pn_manual_car.alert.out_warning_message("Начат поиск ЭПД в 'АС Клиент' УЗ. Ожидайте поиск этой информации может занять несколько минут...");
                    pn_manual_car.bt_num_car_search.prop("disabled", true);

                    var isNumeric = function (value) {
                        //return /^\d{8}/.test(value);
                        return /^\d+$/.test(value);
                    };
                    // Провкерка на правильный ввод номеров
                    var valid = true;
                    var car_valid = [];
                    var cars = pn_manual_car.manual_num_car.val().split(';');
                    $.each(cars, function (i, el) {
                        //pn_manual_car.alert.out_warning_message();
                        if (!isNumeric(el) || !(Number(el) >= 10000000 && Number(el) <= 99999999)) {
                            // Ошибка ввода
                            pn_manual_car.alert.out_warning_message('Ошибка ввода, номер позиции :' + (i + 1) + ' введен неправильный номер :' + el);
                            valid = false;
                        } else {
                            car_valid.push(el);
                        }
                    });
                    // Провкерка на повторяющиеся номера
                    arr_res = [];
                    car_valid.sort();
                    for (var i = 1; i < car_valid.length; i++) {
                        if (car_valid[i] === car_valid[i - 1]) {
                            var is_unique = true;
                            for (var k = 0; k < arr_res.length; k++) {
                                if (arr_res[k] === car_valid[i]) {
                                    is_unique = false;
                                    break;
                                }
                            }
                            if (is_unique) {
                                arr_res.push(car_valid[i]);
                            }
                        }
                    }
                    // Вывод сообщений повторяющихся номеров
                    $.each(arr_res, function (i, el) {
                        pn_manual_car.alert.out_warning_message('Ошибка ввода, введеный номер :' + el + ' повторяется.');
                    });
                    // Продолжим 
                    if (valid) {
                        pn_manual_car.loading_cars.show();
                        var new_car = [];
                        // Привяжим вагоны к документам из промежуточной базы
                        var count_c = car_valid.length;
                        for (var ic = 0; ic < car_valid.length; ic++) {
                            //
                            pn_manual_car.get_id_doc_new_cars(car_valid[ic], function (result_car) {
                                new_car.push(result_car);
                                count_c -= 1;
                                if (count_c === 0) {
                                    // Продолжим ввод
                                    pn_manual_car.get_list_cars_of_period(1, new_car, function (res_cars) {
                                        pn_manual_car.table_car.view(new_car, res_cars);
                                    });
                                }
                            });
                        }

                    } else {
                        pn_manual_car.alert.out_warning_message('Исправьте указанные номера в указанных позициях и попробуйте заново.');
                        pn_manual_car.bt_num_car_search.prop("disabled", false);
                    }

                } else {
                    pn_manual_car.alert.out_error_message("Введите номер вагона или несколько вагонов, разделитель номеров ';'");
                }

            }),
            // инициализвция Окна
            init: function (lang, user_name, callback_ok) {
                pn_manual_car.lang = lang;
                pn_manual_car.user_name = user_name;
                // создадим классы               
                pn_manual_car.alert = new ALERT($('div#manual-car-alert'));// Создадим класс ALERTG
                pn_manual_car.uz_sms = new UZ_SMS(pn_manual_car.lang); // Создадим класс IDS_RWT
                pn_manual_car.ids_inc = new IDS_RWT(pn_manual_car.lang); // Создадим класс IDS_RWT
                pn_manual_car.table_car.init();

                pn_manual_car.obj = $("div#manual-car").dialog({
                    resizable: false,
                    title: 'Добавить вагоны вручную',
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 1000,
                    classes: {
                        "ui-dialog": "card",
                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                        "ui-dialog-content": "card-body",
                        "ui-dialog-buttonpane": "card-footer text-muted"
                    },
                    open: function (event, ui) {

                    },
                    buttons: [
                        {

                            disabled: true,
                            text: "Ок",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                pn_manual_car.add_cars(callback_ok);
                            }
                        },
                        {
                            text: "Отмена",
                            class: "btn btn-outline-primary btn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        },
                    ]
                });
                // Sumbit form
                pn_manual_car.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
            },
            // открыть окно добавмить вагоны вручную
            Open: function (sostav) {
                pn_manual_car.sostav = sostav;
                if (sostav) {
                    // если указан состав, в который нужно добавить вагоны тогда открываем диалоговое окно
                    pn_manual_car.alert.clear_message();
                    pn_manual_car.manual_num_car.val('');
                    pn_manual_car.table_car.view([], null);
                    pn_manual_car.bt_num_car_search.prop("disabled", false);
                    pn_manual_car.obj.dialog("open");
                }
            },
            // Сохранить изменения по всем вагонам
            add_cars: function (callback_ok) {
                LockScreen(langView('mess_save', langs));
                pn_manual_car.alert.clear_message();
                var index = pn_manual_car.table_car.obj.rows({ selected: true });
                var row_cars = pn_manual_car.table_car.obj.rows(index[0]).data();
                // Получим позицию для добавления
                var result = [];
                var position = pn_manual_car.sostav.ArrivalCars && pn_manual_car.sostav.ArrivalCars.length > 0 ? pn_manual_car.sostav.ArrivalCars.length + 1 : 1;
                var count = row_cars.length;
                // Пройдемся по всем вагонам
                for (inc = 0; inc < row_cars.length; inc++) {
                    var car = row_cars[inc];
                    pn_manual_car.add_car_ids(car, position, function (result_add_car) {
                        count -= 1;
                        result.push(result_add_car);
                        // Проверим конец сахранения 
                        if (count === 0) {
                            if (typeof callback_ok === 'function') {
                                LockScreenOff();
                                pn_manual_car.obj.dialog("close");
                                callback_ok(result, true);
                            }
                        }
                    });
                    // Следующая позиция
                    position += 1;
                }
            },
            // Добавим вагон
            add_car_ids: function (car, position, callback_ok) {
                // Проверим. Вагон принят?
                if (car.arrival_car === null) {
                    // вагон не принят
                    // Проверим и при необходимости сохраним документ
                    if (car.uz_doc && car.uz_doc.id_doc && car.uz_doc.id_doc !== "") {
                        // Обновим документ в базе документов ИДС
                        pn_manual_car.ids_inc.ids_tr.postUZ_DOC_To_DB_IDS(car.uz_doc.id_doc, function (result_num) {
                            if (result_num && result_num !== "") {
                                // Документ обновился
                                pn_manual_car.add_car_doc_ids(car, result_num, position, function (result_add_car_doc) {
                                    if (typeof callback_ok === 'function') {
                                        // Документ обновился
                                        result_add_car_doc.doc = 1;
                                        callback_ok(result_add_car_doc);
                                    }
                                });
                            } else {
                                // Ошибка документ не добавлен
                                pn_manual_car.alert.out_error_message("Ошибка. Для вагона №" + car.num + ", найденый ЭПД №" + car.uz_doc.id_doc + " не сохранился в базе документов ИДС");
                                pn_manual_car.add_car_doc_ids(car, null, position, function (result_add_car_doc) {
                                    if (typeof callback_ok === 'function') {
                                        // Ошибка обновления документа
                                        result_add_car_doc.doc = -1;
                                        callback_ok(result_add_car_doc);
                                    }
                                });
                            }
                        });
                    } else {
                        // Нового документа нет
                        pn_manual_car.add_car_doc_ids(car, null, position, function (result_add_car_not_doc) {
                            if (typeof callback_ok === 'function') {
                                callback_ok(result_add_car_not_doc);
                            }
                        });
                    }
                }
                else {
                    // Вагон уже принят операция отменяется.
                    if (typeof callback_ok === 'function') {
                        callback_ok({ num: car.num, result: 0, doc: false });
                    }

                }
            },
            // Добавить вагон с определенным документом
            add_car_doc_ids: function (car, num_doc, position, callback_ok) {
                // добавим или обновим вагон
                if (car.id_car > 0) {
                    // Да, вагон наподходах
                    pn_manual_car.update_car(car, num_doc, position, function (result_upd) {
                        if (typeof callback_ok === 'function') {
                            callback_ok(result_upd);
                        }
                    });
                } else {
                    // Нет, вагон новый
                    var new_car = {
                        id: 0,
                        id_arrival: pn_manual_car.sostav.id,
                        num: car.num,
                        position: position,
                        position_arrival: null,
                        consignee: car.uz_doc ? car.uz_doc.recipient_code : null,
                        num_doc: num_doc,
                        id_transfer: null,
                        note: "Добавлен (Ручной режим)",
                        date_adoption_act: null,
                        arrival: null,
                        arrival_user: null,
                        create: toISOStringTZ(new Date()),
                        create_user: pn_manual_car.user_name,
                    };
                    // Добавим данные
                    pn_manual_car.add_car(new_car, function (result_add) {
                        if (typeof callback_ok === 'function') {
                            callback_ok(result_add);
                        }
                    });
                }
            },
            // Обновим вагон
            update_car: function (car, num_doc, position, callback_ok) {
                pn_manual_car.ids_inc.getArrivalCarsOfID(car.id_car, function (result_car) {
                    if (result_car) {
                        if (car.operation === 0) {
                            // только обновить эпд
                            result_car.note = "Обновили ЭПД (Ручной ввод)";
                        } else {
                            // Перенос вагона
                            result_car.id_transfer = result_car.id_arrival;
                            result_car.id_arrival = pn_manual_car.sostav.id;
                            result_car.position = position;
                            result_car.note = "Перенесен (Ручной ввод)";
                        }
                        // Получим вагон.
                        result_car.num_doc = num_doc && num_doc !== "" ? num_doc : result_car.num_doc;
                        result_car.change = toISOStringTZ(new Date());
                        result_car.change_user = pn_manual_car.user_name;
                        result_car.UZ_DOC = null; // уберем докмент для корректного обновления
                        pn_manual_car.ids_inc.putArrivalCars(result_car, function (result_upd) {
                            if (typeof callback_ok === 'function') {
                                callback_ok({ num: result_car.num, result: result_upd >= 0 ? (car.operation === 0 ? 1 : 3) : -1, doc: (num_doc && num_doc !== "" ? 1 : (result_car.num_doc && result_car.num_doc !== "" ? 2 : 0)) });
                            }
                        });
                    } else {
                        // Вагон не прочло
                        if (typeof callback_ok === 'function') {
                            callback_ok({ num: car.num, result: -1, doc: 0 });
                        }
                    }

                });
            },
            // Добавим новый вагон
            add_car: function (car, callback_ok) {
                pn_manual_car.ids_inc.postArrivalCars(car, function (result_add) {
                    if (typeof callback_ok === 'function') {
                        callback_ok({ num: car.num, result: result_add > 0 ? 2 : -1, doc: (car.num_doc && car.num_doc !== "" ? 1 : 0) });
                    }
                });
            },
            // Получить перечень составов на подходах за указаный период
            get_list_cars_of_period: function (day, cars, callback) {
                // Состав указан, дата прибытия указана
                if (pn_manual_car.sostav && pn_manual_car.sostav.date_arrival) {
                    // Определим период
                    var stop = moment(pn_manual_car.sostav.date_arrival).add('days', day);
                    var start = moment(pn_manual_car.sostav.date_arrival).add('days', -1 * day);
                    // Определим вагоны
                    if (cars && cars.length > 0) {
                        // Вагоны указаны
                        var nums = '';
                        for (i = 0; i < cars.length; i++) {
                            nums += cars[i].num + (i !== cars.length - 1 ? ',' : '');
                        }
                        // Получим перечень вагонов
                        if (nums !== '') {
                            pn_manual_car.ids_inc.getArrivalCarsOfPeriodNums(start._d, stop._d, nums, function (cars) {
                                if (typeof callback === 'function') {
                                    callback(cars);
                                }
                            });
                        } else {
                            if (typeof callback === 'function') {
                                callback([]);
                            }
                        }
                    } else {
                        // вагонов нет? нет смысла переносить
                        pn_manual_car.alert.out_warning_message("Вагоны не указаны");
                        if (typeof callback === 'function') {
                            callback(null);
                        }
                    }

                }
            },
            // Привязать документы к вагонам
            get_id_doc_new_cars: function (car, callback) {
                // Найдем документ в промежуточной базе 
                pn_manual_car.ids_inc.ids_tr.getUZ_DOC_DB_UZ_OfNum(car, (cars_detali.sostav ? cars_detali.sostav.date_arrival : toISOStringTZ(new Date())), function (result_uz_doc) {
                    if (typeof callback === 'function') {
                        callback({ num: car, uz_doc: result_uz_doc });
                    }
                });
            },
        },
        //*************************************************************************************
        // ОКНО ПРИНЯТЬ СОСТАВ
        //*************************************************************************************
        pn_arrival_sostav = {
            obj: null,
            lang: null,
            user_name: null,
            list_station: null,
            id: null,                                                                       // id состава
            sostav: null,                                                                   // состав
            //uz_sms: null,                                                                 // модуль работы с СМС
            ids_inc: null,
            alert: $('div#arrival-sostav-alert'),                                           // Сообщения
            all_obj: null,                                                                  // массив всех элементов формы 
            val: null,                                                                      // класс валидации
            // Поля формы
            arrival_sostav_num_sheet: $('input#arrival_sostav_num_sheet'),
            arrival_sostav_date_arrival: $('input#arrival_sostav_date_arrival'),
            arrival_sostav_date_adoption: $('input#arrival_sostav_date_adoption'),
            arrival_sostav_date_adoption_act: $('input#arrival_sostav_date_adoption_act'),
            arrival_sostav_station_on: $('select#arrival_sostav_station_on'),
            arrival_sostav_way_on: $('select#arrival_sostav_way_on'),
            arrival_count_car: $('input#arrival_count_car'),
            arrival_sostav_numeration: $('div#arrival_sostav_numeration'),
            arrival_sostav_head: $('input#arrival_sostav_head'),
            arrival_sostav_tail: $('input#arrival_sostav_tail'),
            // загрузка библиотек
            loadReference: function (callback) {
                //LockScreen(langView('mess_load', langs));
                var count = 1;
                pn_arrival_sostav.ids_inc.load([], ['station'], [], false, function () {
                    count -= 1;
                    if (count === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            },
            // инициализвция Окна
            init: function (lang, user_name, callback_ok) {
                pn_arrival_sostav.lang = lang;
                pn_arrival_sostav.user_name = user_name;
                pn_arrival_sostav.ids_inc = new IDS_RWT(pn_arrival_sostav.lang); // Создадим класс IDS_RWT
                pn_arrival_sostav.loadReference(function () {
                    pn_arrival_sostav.list_station = pn_arrival_sostav.ids_inc.ids_dir.getListStation('id', 'station_name', pn_arrival_sostav.lang, function (i) { return i.exit_uz === true ? true : false; });
                    // Инициализация элементов
                    pn_arrival_sostav.arrival_sostav_station_on = cd_initSelect(
                        pn_arrival_sostav.arrival_sostav_station_on,
                        { lang: pn_arrival_sostav.lang },
                        pn_arrival_sostav.list_station,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id = Number($(this).val());
                            if (id > 0) {
                                pn_arrival_sostav.arrival_sostav_way_on.prop("disabled", false);
                                var station = pn_arrival_sostav.ids_inc.ids_dir.getStation_Internal_Of_ID(id);
                                if (station && station.Directory_Ways && station.Directory_Ways.length > 0) {
                                    // Определим текущий номер накладной по указаной станции
                                    pn_arrival_sostav.ids_inc.getCurrentNumArrivalSostavOfStation(station.id, function (current_num) {
                                        // укажем следующий номер
                                        pn_arrival_sostav.arrival_sostav_num_sheet.val(Number(current_num) + 1);
                                        // Определим список путей для станции
                                        var list_ways = pn_arrival_sostav.ids_inc.ids_dir.getListWays2TextOfAray(station.Directory_Ways, 'id', 'way_num', 'way_name', pn_arrival_sostav.lang, null);
                                        // Пересоздадим компонент выбора путей
                                        pn_arrival_sostav.arrival_sostav_way_on = cd_initSelect(
                                            pn_arrival_sostav.arrival_sostav_way_on,
                                            { lang: pn_arrival_sostav.lang },
                                            list_ways,
                                            null,
                                            -1,
                                            function (event) {
                                                event.preventDefault();
                                                var id = Number($(this).val());
                                                //if (id > 0) {

                                                //} else {
                                                //    //arrival_sostav_way_on.
                                                //}
                                            },
                                            null).prop("disabled", false);
                                    });
                                }
                                //var s = 2;
                            } else {
                                pn_arrival_sostav.arrival_sostav_way_on.val(-1);
                                pn_arrival_sostav.arrival_sostav_way_on.prop("disabled", true);
                            }
                        }, null);

                    pn_arrival_sostav.arrival_sostav_way_on = cd_initSelect(
                        pn_arrival_sostav.arrival_sostav_way_on,
                        { lang: pn_arrival_sostav.lang },
                        [],
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id = Number($(this).val());
                            if (id > 0) {

                            } else {
                                //arrival_sostav_way_on.
                            }
                        },
                        null).prop("disabled", true);
                    // настроим компонент выбора времени
                    pn_arrival_sostav.arrival_sostav_date_arrival = cd_initDateTimeRangePicker(pn_arrival_sostav.arrival_sostav_date_arrival, { lang: pn_arrival_sostav.lang, time: true }, function (datetime) {

                    });
                    // настроим компонент выбора времени
                    pn_arrival_sostav.arrival_sostav_date_adoption = cd_initDateTimeRangePicker(pn_arrival_sostav.arrival_sostav_date_adoption, { lang: pn_arrival_sostav.lang, time: true }, function (datetime) {

                    });
                    // настроим компонент выбора времени
                    pn_arrival_sostav.arrival_sostav_date_adoption_act = cd_initDateTimeRangePicker(pn_arrival_sostav.arrival_sostav_date_adoption_act, { lang: pn_arrival_sostav.lang, time: true }, function (datetime) {

                    });
                    // Соберем все элементы в массив
                    pn_arrival_sostav.all_obj = $([])
                        .add(pn_arrival_sostav.arrival_sostav_num_sheet)
                        .add(pn_arrival_sostav.arrival_sostav_date_arrival.obj)
                        .add(pn_arrival_sostav.arrival_sostav_date_adoption.obj)
                        .add(pn_arrival_sostav.arrival_sostav_date_adoption_act.obj)
                        .add(pn_arrival_sostav.arrival_sostav_station_on)
                        .add(pn_arrival_sostav.arrival_sostav_way_on)
                        .add(pn_arrival_sostav.arrival_count_car)
                        .add(pn_arrival_sostav.arrival_sostav_numeration)
                    ;
                    // создадим классы 

                    //pn_arrival_sostav.alert = new ALERT($('div#arrival-sostav-alert'));// Создадим класс ALERTG
                    pn_arrival_sostav.val = new VALIDATION(pn_arrival_sostav.lang, pn_arrival_sostav.alert, pn_arrival_sostav.all_obj); // Создадим класс VALIDATION
                    //pn_arrival_sostav.table_car.init();
                    pn_arrival_sostav.obj = $("div#arrival-sostav").dialog({
                        resizable: false,
                        title: 'Принять состав на АМКР',
                        modal: true,
                        autoOpen: false,
                        height: "auto",
                        width: 600,
                        classes: {
                            "ui-dialog": "card",
                            "ui-dialog-titlebar": "card-header bg-primary text-white",
                            "ui-dialog-content": "card-body",
                            "ui-dialog-buttonpane": "card-footer text-muted"
                        },
                        open: function (event, ui) {

                        },
                        buttons: [
                            {

                                disabled: false,
                                text: "Ок",
                                class: "btn btn-outline-primary btn",
                                click: function () {
                                    pn_arrival_sostav.add_arrival_sostav(callback_ok);
                                }
                            },
                            {
                                text: "Отмена",
                                class: "btn btn-outline-primary btn",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            },
                        ]
                    });
                    // Sumbit form
                    pn_arrival_sostav.obj.find("form").on("submit", function (event) {
                        event.preventDefault();
                    });
                });

            },
            // открыть окно добавмить вагоны вручную
            Open: function (id) {
                pn_arrival_sostav.id = id;
                if (id) {
                    // id получено, работаем...
                    pn_arrival_sostav.ids_inc.getArrivalSostavOfID(pn_arrival_sostav.id, function (result_sostav) {
                        if (result_sostav) {
                            if (result_sostav.status > 1) {
                                // Состав уже принят или отклонен
                                return;
                            }
                            pn_arrival_sostav.sostav = result_sostav;
                            // Определим количество вагонов для приема
                            var arrival_cars = [];
                            if (result_sostav.ArrivalCars && result_sostav.ArrivalCars.length > 0) {
                                arrival_cars = result_sostav.ArrivalCars.filter(function (i) {
                                    return i.arrival ? true : false;
                                });
                            };
                            pn_arrival_sostav.arrival_sostav_num_sheet.val('');
                            pn_arrival_sostav.arrival_sostav_date_arrival.setDateTime(result_sostav.date_arrival);
                            pn_arrival_sostav.arrival_sostav_date_adoption.setDateTime(null);
                            pn_arrival_sostav.arrival_sostav_date_adoption_act.setDateTime(null);
                            pn_arrival_sostav.arrival_sostav_station_on.val(-1);
                            pn_arrival_sostav.arrival_sostav_way_on.val(-1);
                            pn_arrival_sostav.arrival_count_car.val(arrival_cars && arrival_cars.length > 0 ? arrival_cars.length : 0);
                            // Состав определен
                            pn_arrival_sostav.val.clear_all();
                            //pn_arrival_sostav.bt_num_car_search.prop("disabled", false);
                            pn_arrival_sostav.obj.dialog("open");
                        }
                    });
                }
            },
            // Валидация данных
            validation: function () {
                pn_arrival_sostav.val.clear_all();
                var valid = true;
                valid = valid & pn_arrival_sostav.val.checkInputOfNull(pn_arrival_sostav.arrival_sostav_num_sheet, "Не указан номер накладной, выберите станцию!");
                var valid_date_arrival = pn_arrival_sostav.val.checkInputOfNull(pn_arrival_sostav.arrival_sostav_date_arrival.obj, "Укажите время прибытия поезда");
                valid = valid & valid_date_arrival;
                if (valid_date_arrival)
                    valid = valid & pn_arrival_sostav.val.checkInputOfDateTime_IsNull(pn_arrival_sostav.arrival_sostav_date_arrival.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm' : 'MM/DD/YYYY HH:mm');
                var valid_date_adoption = pn_arrival_sostav.val.checkInputOfNull(pn_arrival_sostav.arrival_sostav_date_adoption.obj, "Укажите время принятия поезда");
                valid = valid & valid_date_adoption;
                if (valid_date_adoption)
                    valid = valid & pn_arrival_sostav.val.checkInputOfDateTime_IsNull(pn_arrival_sostav.arrival_sostav_date_adoption.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm' : 'MM/DD/YYYY HH:mm');
                valid = valid & pn_arrival_sostav.val.checkInputOfDateTime_IsNull(pn_arrival_sostav.arrival_sostav_date_adoption_act.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm' : 'MM/DD/YYYY HH:mm');
                valid = valid & pn_arrival_sostav.val.checkSelection(pn_arrival_sostav.arrival_sostav_station_on, "Укажите станцию приема сотава");
                valid = valid & pn_arrival_sostav.val.checkSelection(pn_arrival_sostav.arrival_sostav_way_on, "Укажите путь приема сотава");
                // Определим голова хвост
                var head = pn_arrival_sostav.arrival_sostav_head.prop('checked');
                var tail = pn_arrival_sostav.arrival_sostav_tail.prop('checked');
                if (!head && !tail) {
                    valid = valid & pn_arrival_sostav.val.set_object_error(pn_arrival_sostav.arrival_sostav_numeration, "Укажите начало нумерации");
                } else {
                    pn_arrival_sostav.val.set_object_ok(pn_arrival_sostav.arrival_sostav_head, "");
                    pn_arrival_sostav.val.set_object_ok(pn_arrival_sostav.arrival_sostav_tail, "");
                    valid = valid & pn_arrival_sostav.val.set_object_ok(pn_arrival_sostav.arrival_sostav_numeration, "");
                }
                return valid;
            },
            // Сохранить прибытие состава
            add_arrival_sostav: function (callback_ok) {
                var valid = pn_arrival_sostav.validation();
                if (valid) {
                    LockScreen(langView('mess_save', langs));
                    // добавить состав
                    var arr_sostav = pn_arrival_sostav.getArrivalSostav(pn_arrival_sostav.sostav);
                    if (arr_sostav) {
                        pn_arrival_sostav.ids_inc.putArrivalSostav(arr_sostav, function (result_upd) {
                            if (result_upd > 0) {
                                //ПЕРЕНОС ВАГОНОВ В ПРИБЫТИЕ
                                var transfer_sostav = { id: arr_sostav.id, user: pn_arrival_sostav.user_name };
                                pn_arrival_sostav.ids_inc.ids_tr.postIncomingArrivalSostav(transfer_sostav, function (result_transfer) {
                                    if (result_transfer > 0) {

                                        if (typeof callback_ok === 'function') {
                                            pn_arrival_sostav.obj.dialog("close");
                                            LockScreenOff();
                                            callback_ok(result_upd);
                                        }
                                    } else {
                                        pn_arrival_sostav.val.clear_all();
                                        pn_arrival_sostav.val.out_error_message("Ошибка. При переносе вагонов на станцию прибытия АМКР - возникла ошибка!");
                                        LockScreenOff();
                                    }
                                });

                            } else {
                                pn_arrival_sostav.val.clear_all();
                                pn_arrival_sostav.val.out_error_message("Ошибка. При обновлении записи состава возникла ошибка.");
                                LockScreenOff();
                            }
                        });
                    } else {
                        pn_arrival_sostav.val.clear_all();
                        pn_arrival_sostav.val.out_error_message("Ошибка. При обновлении записи состава возникла ошибка.");
                    }

                }
            },
            // Получить новый состав
            getArrivalSostav: function (arrival_sostsv) {
                if (arrival_sostsv) {

                    var head = pn_arrival_sostav.arrival_sostav_head.prop('checked');
                    var tail = pn_arrival_sostav.arrival_sostav_tail.prop('checked');

                    return {
                        id: arrival_sostsv.id,
                        id_arrived: arrival_sostsv.id_arrived,
                        id_sostav: arrival_sostsv.id_sostav,
                        train: arrival_sostsv.train,
                        composition_index: arrival_sostsv.composition_index,
                        date_arrival: toISOStringTZ(get_datetime_value(pn_arrival_sostav.arrival_sostav_date_arrival.val(), pn_arrival_sostav.lang)),
                        date_adoption: toISOStringTZ(get_datetime_value(pn_arrival_sostav.arrival_sostav_date_adoption.val(), pn_arrival_sostav.lang)),
                        date_adoption_act: toISOStringTZ(get_datetime_value(pn_arrival_sostav.arrival_sostav_date_adoption_act.val(), pn_arrival_sostav.lang)),
                        id_station_from: arrival_sostsv.id_station_from,
                        id_station_on: get_input_number_value(pn_arrival_sostav.arrival_sostav_station_on),
                        id_way: get_input_number_value(pn_arrival_sostav.arrival_sostav_way_on),
                        num_doc: get_input_number_value(pn_arrival_sostav.arrival_sostav_num_sheet),
                        count: get_input_number_value(pn_arrival_sostav.arrival_count_car),
                        status: 2,
                        note: arrival_sostsv.note,
                        create: arrival_sostsv.create,
                        create_user: arrival_sostsv.create_user,
                        change: toISOStringTZ(new Date()),
                        change_user: pn_arrival_sostav.user_name,
                        numeration: tail && !head ? true : !tail && head ? false : null,
                    };
                }
                return null;
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек

    loadReference(function (result) {


        // Инициализация
        if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === true ? true : false; });
        // Считаем строку с дополнительными параметрами
        var id_arrival = getUrlVar('id_arrival');
        var arrival = getUrlVar('arrival');
        if (id_arrival && arrival) {
            pn_sel.cur_dt = moment(arrival).set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 });
            start_id_sostav = Number(id_arrival);
        }

        pn_sel.init(list_station);
        pn_sel_wagon.init();
        pn_rep_sel_wagon.init();
        pn_edit_sostav.init(lang, list_station, user_name, function (result) {
            pn_sel.view(true);
        });
        //print_detali.init(lang, user_name);
        cars_detali.init(lang, user_name);
        table_sostav.init();
        //$("a.dt-button").removeClass('dt-button').addClass('btn btn-secondary');
        pn_sel.view(true, start_id_sostav);
    });
});
