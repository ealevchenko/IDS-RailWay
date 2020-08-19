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


                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',
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
        outgoing_alert = new ALERT($('div#outgoing-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
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

                ids_inc.getArrivalSostav(start, stop, function (data) {
                    list_sostav = data;
                    data_start = start;
                    data_stop = stop;
                    table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav);
                });
            } else {
                table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav);
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


            if (id) {
                LockScreen(langView('mess_print', langs));
                ids_inc.getArrivalSostavOfID(id, function (result_sostav) {
                    LockScreenOff()
                    if (result_sostav && result_sostav.status === 2) {
                        // Состав принят можно показать отчет
                        var sostav = result_sostav;
                        switch (report) {
                            case 'report_fst': view_report_fst(sostav); break;
                            case 'report_fsci': view_report_fsci(sostav); break;
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
                                                                                    outgoing_alert.clear_message();
                                                                                    outgoing_alert.out_error_message("При удалении сотава произошла ошибка");
                                                                                }
                                                                            });
                                                                    } else {
                                                                        // Ошибка удаления вагонов
                                                                        outgoing_alert.clear_message();
                                                                        outgoing_alert.out_error_message("При удалении вагонов сотава произошла ошибка");
                                                                    }
                                                                });
                                                            } else {
                                                                // Вагонов нет удалим состав
                                                                ids_inc.deleteArrivalSostav(sostav.id, function (result_del) {
                                                                    if (result_del > 0) {
                                                                        pn_sel.view(true);
                                                                    } else {
                                                                        outgoing_alert.clear_message();
                                                                        outgoing_alert.out_error_message("При удалении сотава произошла ошибка");
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            // Состав не найден
                                                            outgoing_alert.clear_message();
                                                            outgoing_alert.out_error_message("Перед процедурой удаления, не удалось получить информацию о составе!");
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            // Состав уже в работе удаление запрещено
                                            outgoing_alert.clear_message();
                                            outgoing_alert.out_error_message("Состав в работе, удаление – отклонено!");
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
                                                            outgoing_alert.clear_message();
                                                            outgoing_alert.out_info_message("Статус состава (отклонить) - установлен.");
                                                        } else {
                                                            outgoing_alert.clear_message();
                                                            outgoing_alert.out_error_message("При обновлении статуса сотава произошла ошибка");
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
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    var rowData = table_sostav.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_sostav.select_sostav = rowData[0];
                        table_sostav.obj.button(7).enable(true);
                        if (table_sostav.select_sostav.status < 1) {
                            table_sostav.obj.button(5).enable(true);
                            table_sostav.obj.button(6).enable(true);
                            table_sostav.obj.button(7).text(langView('title_button_wagon_accept', langs));
                        } else {
                            // Если статус в работе принят или удален 
                            table_sostav.obj.button(5).enable(false);
                            table_sostav.obj.button(6).enable(false);
                            table_sostav.obj.button(7).text(langView('title_button_wagon_view', langs));
                        }
                    } else {
                        table_sostav.obj.button(5).enable(false);
                        table_sostav.obj.button(6).enable(false);
                        table_sostav.obj.button(7).enable(false);
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
                table_sostav.obj.order([3, 'asc']);
                table_sostav.obj.row('#' + id_select).select();
                table_sostav.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_sostav: function (data) {

                //var cs = mt.getConsignee_Internal_Of_ID(data.consignee);
                var car_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
                    return i.arrival ? true : false;
                }) : [];
                var car_not_arrival = data.ArrivalCars !== null ? data.ArrivalCars.filter(function (i) {
                    return !i.arrival ? true : false;
                }) : [];
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
                    "station_from": data.id_station_from !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_from, 'station_name', lang) : '',
                    "id_station_on": data.id_station_on,
                    "station_on": data.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_on, 'station_name', lang) : '',
                    "id_way": data.id_way !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Ways_Of_ID(data.id_way, 'way_num', lang) : '',
                    "num_doc": data.num_doc,
                    "count": data.ArrivalCars !== null ? data.ArrivalCars.length : 0,
                    "count_arrival": car_arrival !== null ? car_arrival.length : 0,
                    "count_not_arrival": car_not_arrival !== null ? car_not_arrival.length : 0,
                    "count_all": (car_arrival !== null ? car_arrival.length : 0) + ' - ' + (car_not_arrival !== null ? car_not_arrival.length : 0),
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
                table_sostav.obj.button(5).enable(false);
                table_sostav.obj.button(6).enable(false);
                table_sostav.obj.button(7).enable(false);
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
        // ДИАЛОГОВОЕ ОКНО "ДОБАВИТЬ/ПРАВИТЬ СОСТАВ"
        //*************************************************************************************
        pn_edit_sostav = {
            obj: null,
            table: null,
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
                pn_edit_sostav.ids_inc = new IDS_RWT_INCOMING(lang); // Создадим класс IDS_RWT_INCOMING
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
        //cars_detali.init(lang, user_name);
        //table_sostav.init();
        //pn_sel.view(true);
        LockScreenOff();
    });
});
