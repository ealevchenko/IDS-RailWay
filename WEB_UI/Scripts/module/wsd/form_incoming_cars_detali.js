/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль форма "Принимаемый вагон детально"*/
(function (window) {
    'use strict';

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";


    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));


    var min_date_adoption_act = -2 * 60;   // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_date_adoption_act = 2 * 60;    // TODO: Максимальная разница в часах начало задержания и текущей даты
    //var max_err_detention_deff = 4 * 60;        // TODO: Минимальная разница в часах межу началом и концом задержания
    //var min_err_return_start = -2 * 60;     // TODO: Минимальная разница в часах начало задержания и текущей даты
    //var max_err_return_start = 2 * 60;      // TODO: Максимальная разница в часах начало задержания и текущей даты
    //var min_err_return_stop = -2 * 60;      // TODO: Минимальная разница в часах начало задержания и текущей даты
    //var max_err_return_stop = 2 * 60;       // TODO: Максимальная разница в часах начало задержания и текущей даты
    ////var max_err_return_deff = 4 * 60;     // TODO: Минимальная разница в часах межу началом и концом задержания
    //var list_groups_cargo = [11,20];        // TODO: Список id групп груза с порожними вагонами

    var gruzp_min_value = 0.0;                      // Минимальное значение
    var gruzp_max_value = 112.0;                    // Минимальное значение
    var ves_tary_arc_min_value = 15.0;               // Минимальное значение
    var ves_tary_arc_max_value = 51.0;             // Минимальное значение
    var u_tara_min_value = 15.0;                     // Минимальное значение
    var u_tara_max_value = 51.0;                   // Минимальное значение
    var select_uz_info = false;                     // Делать запрос в УЗ
    var list_groups_cargo = [11, 20];               // Список id групп груза с порожними вагонами

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {

            'ficcd_label_arrival_car': 'Принять вагон',
            'ficcd_label_return_car': 'Вернуть вагон',
            'ficcd_title_search_car': 'Найти ЭПД по номеру вагона',
            'ficcd_title_manual_car': 'Ввести данные в ручную',
            'ficcd_title_search_main_doc': 'Найти основной документ на УЗ',
            'ficcd_title_change_main_doc': 'Править № основной накладной',
            'ficcd_title_search_doc': 'Найти досылочный документ на УЗ',
            'ficcd_title_change_doc': 'Править № досылочной накладной',

            'ficcd_label_num': '№ Вагона:',
            'ficcd_title_num': 'Номер вагона',
            'ficcd_label_position_arrival': '№ в поезде:',
            'ficcd_title_position_arrival': 'Автоматический ввод\корректировка (номер вагона в составе)',
            'ficcd_label_date_adoption_act': 'Время и дата приема по акту:',
            'ficcd_title_date_adoption_act': 'Ручной ввод (если вагон принимаем по акту)',

            'fogcd_label_not_epd': 'Без ЭПД',
            'ficcd_label_document_nom_doc': '№ Досылочной накладной:',
            'ficcd_title_document_nom_doc': 'Номер досылочной накладной',
            'ficcd_label_document_nom_main_doc': '№ Основной накладной:',
            'ficcd_title_document_nom_main_doc': 'Номер основной накладной',
            'ficcd_title_fieldset_routes_clients': 'МАРШРУТЫ И КЛИЕНТЫ',
            'ficcd_title_fieldset_wagon_card': 'КАРТОЧКА ВАГОНА',
            'ficcd_title_fieldset_payer': 'ОПЛАТА',
            'ficcd_title_fieldset_cargo': 'ГРУЗ',
            'ficcd_title_fieldset_sap': 'SAP (ВХОДЯЩАЯ ПОСТАВКА)',
            'ficcd_title_sap_material': 'Материал',
            'ficcd_title_sap_warehouse': 'Заадресовка',
            'ficcd_title_sap_warehouse_new': 'Переадресация (Заадресовка 10км)',

            'ficcd_title_fieldset_departure_station': 'Станция отправки',
            'ficcd_label_code_stn_from': 'Код:',
            'ficcd_title_code_stn_from': 'ЭПД [OTPR/ROUTE/stn_from] -> Код станции отправки',
            'ficcd_label_station_from_name': 'Название:',
            'ficcd_title_station_from_name': 'ЭПД [OTPR/ROUTE/name_from] -> Справочник "Внешних станций" -> Справочник "Дорог" -> Название станции отправки',
            'ficcd_label_from_inlandrailway_name': 'Дорога:',
            'ficcd_title_from_inlandrailway_name': 'Автоматически берется из справочника "Дорог" -> Название дороги',

            'ficcd_title_fieldset_incoming_station': 'Станция прибытия',
            'ficcd_label_code_stn_on': 'Код:',
            'ficcd_title_code_stn_on': 'ЭПД [OTPR/ROUTE/stn_on] -> Код станции прибытия',
            'ficcd_label_station_on_name': 'Название:',
            'ficcd_title_station_on_name': 'ЭПД [OTPR/ROUTE/name_on] -> Справочник "Внешних станций" -> Справочник "Дорог" -> Название станции прибытия',
            'ficcd_label_on_inlandrailway_name': 'Дорога:',
            'ficcd_title_on_inlandrailway_name': 'Автоматически берется из справочника "Дорог" -> Название дороги',

            'ficcd_title_fieldset_border_crossing': 'Пограничный пункт',
            'ficcd_label_stn_border': 'Код:',
            'ficcd_title_stn_border': 'ЭПД [OTPR/ROUTE/JOINT/stn] - Код пограничного перехода',
            'ficcd_label_stn_border_name': 'Название:',
            'ficcd_title_stn_border_name': 'ЭПД [OTPR/ROUTE/JOINT/stn_name] -> Справочник "Погран переходов" -> Название станции погран перехода',
            'ficcd_label_border_cross_time': 'Дата и время перехода:',
            'ficcd_title_border_cross_time': 'ЭПД [OTPR/ROUTE/JOINT/cross_time] - Время перехода',

            'ficcd_label_shipper_code': 'Код:',
            'ficcd_title_shipper_code': 'ЭПД [OTPR/CLIENT[0]/kod] -> Код грузоотправителя',
            'ficcd_label_shipper_name': 'Грузоотправитель:',
            'ficcd_title_shipper_name': 'ЭПД [OTPR/CLIENT[0]/name] -> Справочник "Грузоотправителей" -> Название грузоотправителя',

            'ficcd_label_consignee_code': 'Код:',
            'ficcd_title_consignee_code': 'ЭПД [OTPR/CLIENT[1]/kod] -> Код грузополучателя',
            'ficcd_label_consignee_name': 'Грузополучатель:',
            'ficcd_title_consignee_name': 'ЭПД [OTPR/CLIENT[1]/name] -> Справочник "Грузополучателей" -> Название грузополучателя',

            'ficcd_label_station_amkr_name': 'Отправить на станцию АМКР:',
            'ficcd_title_station_amkr_name': 'Ручной выбор -> Справочник "Подразделений АМКР"',
            'ficcd_title_station_amkr_for_loading': 'Под погрузку',
            'ficcd_label_division_code': 'Шифр:',
            'ficcd_title_division_code': 'Ручной выбор -> Справочник "Подразделений АМКР"',
            'ficcd_label_division_name': 'Цех\склад:',
            'ficcd_title_division_name': 'Ручной выбор -> Справочник "Подразделений АМКР"',

            'ficcd_title_add_station_from': 'Добавить новую внешнюю станцию в справочник "Внешних станций" ИДС, информация берется автоматически из ЭПД',
            'ficcd_title_add_station_on': 'Добавить новую внешнюю станцию в справочник "Внешних станций" ИДС, информация берется автоматически из ЭПД',
            'ficcd_title_add_stn_border': 'Добавить новый погран-переход в справочник "Погран переходов" ИДС, информация берется автоматически из ЭПД',
            'ficcd_title_add_shipper': 'Добавить нового грузоотправителя в справочник "Грузоотправителей" ИДС, информация берется автоматически из ЭПД',
            'ficcd_title_add_name_plat': 'Добавить нового плательщика в справочник "Плательщиков по прибытию", информация берется автоматически из ЭПД',
            'ficcd_title_add_cargo_etsng': 'Добавить новый груз в справочник "Грузов ЕТ СНГ", информация берется автоматически из ЭПД',
            'ficcd_title_add_cargo_gng': 'Добавить новый груз в справочник "Грузов ГНГ", информация берется автоматически из ЭПД',
            'ficcd_title_add_inbound_delivery': 'Получить строку САП входящие поставки',

            'fogcd_label_route_flag': 'Признак маршрута',
            'fogcd_title_wagon_card_save': 'Добавить новую запись карточки вагона в справочник "Карточка вагона", информация берется автоматически из ЭПД и БД УЗ',
            'fogcd_title_wagon_card_edit': 'Править запись карточки вагона в справочник "Карточка вагона", информация берется автоматически из ЭПД и БД УЗ',

            'ficcd_label_kod_adm': 'Код Адм.:',
            'ficcd_title_kod_adm': 'ЭПД [OTPR/VAGON/kod_adm]',
            'ficcd_label_name_adm': 'Страна:',
            'ficcd_title_name_adm': 'ЭПД [OTPR/VAGON/kod_adm] -> Справочник "Стран" -> Название Администрации',
            'ficcd_label_rod_vag': 'Род вагона:',
            'ficcd_title_rod_vag': 'ЭПД [OTPR/VAGON/rod_vag] -> Справочник "Род вагона" -> Справочник "Карточка вагона" -> Название "Рода вагона"',

            'ficcd_label_usl_tip': 'Тип цистерны:',
            'ficcd_title_usl_tip': 'ЭПД [OTPR/VAGON/usl_tip] -> Справочник "Карточка вагона" -> Шифр "Типа цистерны"',
            'ficcd_label_condition_arrival': 'Разметка по прибытию:',
            'ficcd_title_condition_arrival': 'Ручной выбор -> Справочник "Годность по прибытию"',
            'ficcd_label_type_wagon': 'Тип вагона:',
            'ficcd_title_type_wagon': 'Ручной выбор -> Справочник "Тип вагона"',

            'ficcd_label_kol_os': 'Количество осей:',
            'ficcd_title_kol_os': 'ЭПД [OTPR/VAGON/kol_os] -> Справочник "Карточка вагона" -> Количество осей',
            'ficcd_label_gruzp': 'Грузоп. (ЭПД),т:',
            'ficcd_title_gruzp': 'ЭПД [OTPR/VAGON/gruzp] -> Грузоподъемность по ЭПД',
            'ficcd_label_gruzp_uz': 'Грузоп. (УЗ),т:',
            'ficcd_title_gruzp_uz': 'БД УЗ [https://uz.gov.ua/car_info/index.php] -> Грузоподъемность по БД УЗ',
            'ficcd_label_tara_uz': 'Тара(УЗ),т:',
            'ficcd_title_tara_uz': 'БД УЗ [https://uz.gov.ua/car_info/index.php] -> Тара по БД УЗ',

            'ficcd_label_ves_tary_arc': 'Вес тары (ЭПД), т:',
            'ficcd_title_ves_tary_arc': 'ЭПД [OTPR/VAGON/ves_tary_arc] -> Вес тары по ЭПД',
            'ficcd_label_u_tara': 'Вес тары(ут.ЭПД), т:',
            'ficcd_title_u_tara': 'ЭПД [OTPR/VAGON/u_tara] -> Вес уточнённой тары по ЭПД',
            'ficcd_label_date_rem_vag': 'Дата ремонта(вагон):',
            'ficcd_title_date_rem_vag': 'Ручной ввод (информация на вагоне) -> Справочник "Карточка вагона" -> Дата ремонта на вагоне',
            'ficcd_label_date_rem_uz': 'Дата ремонта(БД УЗ):',
            'ficcd_title_date_rem_uz': 'БД УЗ [https://uz.gov.ua/car_info/index.php] -> Справочник "Карточка вагона" -> Дата ремонта по БД УЗ',

            'ficcd_label_name_owner': 'Собственник:',
            'ficcd_title_name_owner': 'БД УЗ [https://uz.gov.ua/car_info/index.php] -> Справочник "Собственников вагонов" -> Справочник "Карточка вагона" -> Собственник вагона',
            'ficcd_label_rent_start': 'Начало аренды:',
            'ficcd_title_rent_start': 'Ручной ввод (при смене собственника) -> Справочник "Карточка вагона" -> Дата начала аренды',
            'ficcd_label_type_ownership': 'Признак собственности:',
            'ficcd_title_type_ownership': 'Автоматически берется из карточек собственных вагонов -> Признак собственности',

            'ficcd_label_name_operator': 'Оператор (АМКР):',
            'ficcd_title_name_operator': 'БД УЗ [https://uz.gov.ua/car_info/index.php] -> Справочник "Операторов" -> Справочник "Карточка вагона" -> Оператор вагона',
            'ficcd_label_limiting_loading': 'Ограничение погрузки:',
            'ficcd_title_limiting_loading': 'Автоматически берется из справочника "Карточка вагона" -> Ограничение погрузки',

            'fogcd_label_wagon_note_uz': 'Ограничения УЗ (БД УЗ):',
            'fogcd_title_wagon_note_uz': 'БД УЗ [https://uz.gov.ua/car_info/index.php] -> Справочник "Карточка вагона" -> Ограничения из БД УЗ',
            'fogcd_label_wagon_note': 'Примечание:',
            'fogcd_title_wagon_note': 'Ручной ввод (примечания)',

            'fogcd_title_docs': 'Сопроводительные документы, если в ЭПД вложены документы, тогда будет указано количество документов',
            'fogcd_text_docs': 'Сертификаты и другие документы на ЭПД',
            'fogcd_title_acts': 'Акты, если в ЭПД вложены акты, тогда будет указано количество актов',
            'fogcd_text_acts': 'Акты на ЭПД',
            'fogcd_title_acts_wagon': 'Акты на вагон, если в ЭПД на выбранный вагон вложены акты, тогда будет указано количество актов',
            'fogcd_text_acts_wagon': 'Акты по вагону',
            'fogcd_title_wagon_cont': 'Контейнера на вагоне, если в ЭПД на выбранный вагон есть контейнера, тогда будет указано количество контейнеров',
            'fogcd_text_wagon_cont': 'Контейнера',

            'ficcd_label_kod_plat': 'Код:',
            'ficcd_title_kod_plat': 'ЭПД [OTPR/PL/kod_plat] -> Код плательщика из ЭПД',
            'ficcd_label_name_plat': 'Плательщик с ЭПД:',
            'ficcd_title_name_plat': 'ЭПД [OTPR/PL/name_plat] -> Справочник "Плательщиков по прибытию" -> Название Плательщика',
            'ficcd_label_distance_way': 'Тарифное расстояние:',
            'ficcd_title_distance_way': 'ЭПД [OTPR/distance_way] -> Тарифное расстояние',
            'ficcd_label_vagon_pay_v_summa': 'Тариф при выдаче:',
            'ficcd_title_vagon_pay_v_summa': 'ЭПД [OTPR/VAGON/PAY_V/summa] если [OTPR/VAGON/PAY_V/kod=01 или OTPR/VAGON/PAY_V/kod=21]',

            'ficcd_label_kod_etsng': 'Код ЕТСНГ:',
            'ficcd_title_kod_etsng': 'ЭПД [OTPR/VAGON/COLLECT_V/kod_etsng] -> Код груза по ЕТ СНГ',
            'ficcd_label_name_etsng': 'Название груза по ЕТСНГ:',
            'ficcd_title_name_etsng': 'ЭПД [OTPR/VAGON/COLLECT_V/name_etsng] -> Справочник "Грузов ЕТ СНГ" -> Справочник "Грузов ИДС" -> Название груза по ЕТ СНГ',

            'ficcd_label_kod_gng': 'Код ГНГ:',
            'ficcd_title_kod_gng': 'ЭПД [OTPR/VAGON/COLLECT_V/kod_gng] -> Код груза по ГНГ',
            'ficcd_label_name_gng': 'Название груза по ГНГ:',
            'ficcd_title_name_gng': 'ЭПД [OTPR/VAGON/COLLECT_V/name_gng] -> Справочник "Грузов ГНГ" -> Название груза по ГНГ',

            'ficcd_label_group_cargo': 'Группа груза:',
            'ficcd_title_group_cargo': 'Автоматически берется из справочника "Грузов ИДС" -> Группа груза',
            'ficcd_label_certificate_data': 'Сертификатные данные:',
            'ficcd_title_certificate_data': 'Ручной выбор -> Справочник "Сертификатных данных"',
            'ficcd_label_commercial_condition': 'Коммерческое состояние:',
            'ficcd_title_commercial_condition': 'Ручной выбор -> Справочник "Коммерческого состояния вагона\груза"',

            'fogcd_label_cargo_analysis': 'Анализ груза:',
            'fogcd_title_cargo_analysis': 'ЭПД [OTPR/TEXT/zayava] -> Информация для анализа груза',

            'ficcd_label_kol_pac': 'Кол. мест:',
            'ficcd_title_kol_pac': 'ЭПД [OTPR/VAGON/COLLECT_V/kol_pac] -> Количество мест',
            'ficcd_label_vesg': 'Вес груза(накл.), т:',
            'ficcd_title_vesg': 'ЭПД [OTPR/VAGON/COLLECT_V/vesg] -> Вес груза',
            'ficcd_label_vesg_reweighing': 'Вес груза(перев.), т:',
            'ficcd_title_vesg_reweighing': 'Автоматически берется из системы ЕБД -> Вес груза после перевески',
            'ficcd_label_vesg_difference': 'Разница, т:',
            'ficcd_title_vesg_difference': 'Автоматически вычисляется после перевески -> Разница веса',
            'ficcd_label_nom_zpu': '№ ЗПУ:',
            'ficcd_title_nom_zpu': 'ЭПД [OTPR/VAGON/ZPU_V/nom_zpu] -> Номер ЗПУ',

            'ficcd_label_danger_class': 'Класс:',
            'ficcd_title_danger_class': 'ЭПД [OTPR/VAGON/COLLECT_V/danger] -> Класс опасности',
            'ficcd_label_danger_name': 'Описание класса опасности:',
            'ficcd_title_danger_name': 'ЭПД [OTPR/VAGON/COLLECT_V/danger] -> Справочник "Класс опасности" -> Название опасности',
            'ficcd_label_danger_kod': 'Код опасности:',
            'ficcd_title_danger_kod': 'ЭПД [OTPR/VAGON/COLLECT_V/danger_kod] -> Код опасности',

            'ficcd_label_num_input_sipply': '№ Входящей поставки:',
            'ficcd_title_num_input_sipply': 'Получить строку САП входящие поставки',
            'ficcd_label_num_pos_sipply': '№ позиции:',
            'ficcd_title_num_pos_sipply': '',
            'ficcd_label_delivery_dt_sipply': 'Создана:',
            'ficcd_title_delivery_dt_sipply': '',

            'ficcd_label_inbound_delivery_unloading_ban': 'Запрет выгр.:',
            'ficcd_title_inbound_delivery_unloading_ban': '',
            'ficcd_label_inbound_delivery_ship': 'Судно:',
            'ficcd_title_inbound_delivery_ship': '',

            'ficcd_label_inbound_delivery_material_code': 'Код материала:',
            'ficcd_title_inbound_delivery_material_code': '',
            'ficcd_label_inbound_delivery_material_name': 'Название материала:',
            'ficcd_title_inbound_delivery_material_name': '',

            'ficcd_label_inbound_delivery_warehouse_code': 'Код склада:',
            'ficcd_title_inbound_delivery_warehouse_code': '',
            'ficcd_label_inbound_delivery_warehouse_name': 'Склад:',
            'ficcd_title_inbound_delivery_warehouse_name': '',

            'ficcd_label_inbound_delivery_warehouse_code_new': 'Код склада:',
            'ficcd_title_inbound_delivery_warehouse_code_new': '',
            'ficcd_label_inbound_delivery_warehouse_name_new': 'Склад:',
            'ficcd_title_inbound_delivery_warehouse_name_new': '',

            'ficcd_form_add_db_ids': 'Добавить в справочник ИДС?',
            'ficcd_form_message_add_ext_station_ids': 'Вы уверены что хотите добавить в справочник «Внешних станций» БД ИДС новую станцию {0}, с кодом {1}?',
            'ficcd_form_message_add_border_checkpoint_ids': 'Вы уверены что хотите добавить в справочник «Погран переходов» БД ИДС новый погран переход, станцию {0}, с кодом {1}?',
            'ficcd_form_message_add_shipper_ids': 'Вы уверены что хотите добавить в справочник «Грузоотправителей» БД ИДС нового грузоотправителя {0}, с кодом {1}?',
            'ficcd_form_message_add_payer_sender_ids': 'Вы уверены что хотите добавить в справочник «Платильщики по прибытию» БД ИДС нового платильщика {0}, с кодом {1}?',
            'ficcd_form_message_add_cargo_etsng_ids': 'Вы уверены что хотите добавить в справочник «Грузов ЕТ СНГ» БД ИДС новый груз {0}, с кодом {1}?',
            'ficcd_form_message_add_cargo_gng_ids': 'Вы уверены что хотите добавить в справочник «Грузов ГНГ» БД ИДС новый груз {0}, с кодом {1}?',

            'ficcd_form_return_arrival_car': 'Добавить в справочник ИДС?',
            'ficcd_form_return_message_arrival_car': 'Вы уверены что хотите отменить прием вагона {0} на АМКР?',


            'ficcd_mess_run_add_db_ids': 'Выполняю операцию "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС"...',
            'ficcd_mess_cancel_add_db_ids': 'Отмена выполнения операции "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС"',
            'ficcd_mess_ok_add_db_ids': 'Операция "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС" - выполнена',
            'ficcd_mess_error_add_db_ids': 'Ошибка выполнения операции "ДОБАВИТЬ {0} В СПРАВОЧНИК ИДС"',
            'ficcd_mess_ok_update_dir_wagon_db_ids': 'Операция "ОБНОВИТЬ {0} В СПРАВОЧНИКT ИДС" - выполнена, карточка {1} {2}',
            //'ficcd_mess_ok_not_update_dir_wagon_db_ids': 'Операция "ПОЛУЧИТЬ {0} ИЗ СПРАВОЧНИКT ИДС" - выполнена без обновления информации по данным БД УЗ',
            'ficcd_mess_error_update_dir_wagon_db_ids': 'Ошибка выполнения операции "ОБНОВИТЬ {0} В СПРАВОЧНИКЕ ИДС", код ошибки {1}',
            'ficcd_mess_warning_sap_no_select': 'Запрос на информацию по входящей поставки созданной САП – не выполнялся, вы можете сделать запрос вручную, нажав кнопку ниже или запрос будет выполнен автоматически по каждому вагону, после принятия всего состава.',
            'ficcd_mess_warning_sap_not_full': 'Информация о входящей поставке не полная, информация дополняется, вы можете обновить информацию сделать запрос в ручную.',
            'ficcd_mess_ok_sap_full': 'Информация о входящей поставке - полная, строка закрыта.',
            'ficcd_mess_run_operation_arrival_wagon': 'Выполняю операцию "ПРИНЯТЬ ВАГОН {0} НА АМКР"...',
            'ficcd_mess_run_operation_searsh_main_doc': 'Выполняю операцию "ПОИСК ОСНОВГОНО ЭПД {0} ПО ВАГОНУ {1}"...',
            'ficcd_mess_run_operation_searsh_doc_of_num_dt': 'Выполняю операцию "ПОИСК ЭПД ПО ВАГОНУ {0} ПРИБЫВШЕГО {1}"...',
            'ficcd_mess_run_operation_change_mode_epd': 'Смена режима ЭПД...',
            'ficcd_mess_ok_operation_arrival_wagon': 'Операцию "ПРИНЯТЬ ВАГОН {0} НА АМКР" - Выполнена',
            'ficcd_mess_error_arrival_wagon': 'Ошибка выполнения операции "ПРИНЯТЬ ВАГОН {0} НА АМКР" - Код ошибки: {1}',
            'ficcd_mess_run_operation_return_arrival_wagon': 'Выполняю операцию "ОТМЕНА ПРИНЯТИЯ ВАГОНА {0} НА АМКР"...',
            'ficcd_mess_ok_operation_return_arrival_wagon': 'Операцию "ОТМЕНА ПРИНЯТИЯ ВАГОНА {0} НА АМКР" - Выполнена',
            'ficcd_mess_error_operation_return_arrival_wagon': 'Ошибка выполнения операции "ОТМЕНА ПРИНЯТИЯ ВАГОНА {0} НА АМКР" - Код ошибки: {1}',
            'ficcd_mess_cancel_operation_return_arrival_wagon': 'Отмена выполнения операции "ОТМЕНА ПРИНЯТИЯ ВАГОНА {0} НА АМКР"',

            'ficcd_mess_ok_operation_update_sap': 'Операция "ОБНОВИТЬ ВХОДЯЩУЮ ПОСТАВКУ" - выполнена',
            'ficcd_mess_error_operation_update_sap': 'Ошибка выполнения операции "ОБНОВИТЬ ВХОДЯЩУЮ ПОСТАВКУ"',

            'ficcd_title_ext_station': 'ВНЕШНЮЮ СТАНЦИЮ',
            'ficcd_title_border_checkpoint': 'СТАНЦИЮ ПОГРАН ПЕРЕХОДА',
            'ficcd_title_shipper': 'ГРУЗООТПРАВИТЕЛЯ',
            'ficcd_title_card_wagon': 'КАРТОЧКУ ВАГОНА',
            'ficcd_title_payer_sender': 'ПЛАТИЛЬЩИКА ПО ПРИБЫТИЮ',
            'ficcd_title_cargo_etsng': 'ГРУЗ ЕТ СНГ',
            'ficcd_title_cargo_gng': 'ГРУЗ ГНГ',
            'ficcd_title_not': 'без изменений',
            'ficcd_title_add': 'добавлена',
            'ficcd_title_update': 'обновлена',
            'ficcd_title_uz_epd': 'с БД УЗ и ЭПД',
            'ficcd_title_uz': 'только с БД УЗ.',

            'fogcd_form_search_epd': 'Найти ЭПД',
            'fogcd_form_search_car_uz_epd_message': 'Если ЭПД не будет найден в БД ИДС, включить в поиск документа систему «УЗ Клиент»?. Внимание! Поиск ЭПД в системе «УЗ Клиент» может занять несколько минут!',

            'ficcd_mess_valid_not_nom_main_doc': 'Укажите номер накладной',
            'ficcd_mess_valid_not_number_nom_main_doc': 'Номер накладной должен состоять из цифр',
            'ficcd_mess_valid_nom_main_doc_manual_exist': 'Накладная существует, создана {0} в ручном режиме.',
            'ficcd_mess_valid_not_epd_main_doc': 'Основной ЭПД – не найден!',
            'ficcd_mess_valid_not_epd_doc': 'Досылочный ЭПД – не найден!',
            'ficcd_mess_valid_epd_equal': 'Основной и досылочный № накладной - одинаковы!',

            'ficcd_mess_valid_not_station_from_name': 'Укажите станцию отправления',
            'ficcd_mess_valid_station_from_name': 'Указанной станции отправления нет в справочнике ИДС',
            'ficcd_mess_valid_add_station_from_name': 'Станции отправления нет в справочнике ИДС, для продолжения добавьте станцию в справочник',
            'ficcd_mess_valid_not_station_on_name': 'Укажите станцию прибытия',
            'ficcd_mess_valid_station_on_name': 'Указанной станции прибытия нет в справочнике ИДС',
            'ficcd_mess_valid_add_station_on_name': 'Станции прибытия нет в справочнике ИДС, для продолжения добавьте станцию в справочник',
            'ficcd_mess_valid_add_stn_border_name': 'Станции погран-перехода нет в справочнике ИДС, для продолжения добавьте станцию в справочник',
            'ficcd_mess_valid_border_name': 'Указанной станции погран-перехода нет в справочнике ИДС',
            //'ficcd_mess_valid_not_stn_border_name': 'Укажите станцию погран-перехода',
            'ficcd_mess_valid_not_stn_border_cross_time': 'Укажите дату и время пересечения погран-перехода',
            'ficcd_mess_valid_add_shipper_name': 'Грузоотправителя нет в справочнике ИДС, для продолжения добавьте грузоотправителя в справочник',
            'ficcd_mess_valid_shipper_name': 'Указанного грузоотправителя нет в справочнике ИДС',
            'ficcd_mess_valid_not_shipper_name': 'Укажите грузоотправителя',
            'ficcd_mess_valid_add_consignee_name': 'Грузополучателя нет в справочнике ИДС, обратитесь к администратору для добавления нового грузополучателя в справочник ИДС',
            'ficcd_mess_valid_not_consignee_name': 'Укажите грузополучателя',
            'ficcd_mess_valid_not_station_amkr_name': 'Укажите станцию АМКР',
            'ficcd_mess_valid_add_division_name': 'Подразделения АМКР нет в справочнике ИДС, обратитесь к администратору для добавления нового подразделения АМКР в справочник ИДС',
            'ficcd_mess_valid_division_name': 'Подразделения АМКР нет в справочнике ИДС',
            'ficcd_mess_valid_not_division_name': 'Укажите подразделение АМКР',
            'ficcd_mess_valid_add_name_adm': 'Администрации нет в справочнике ИДС, обратитесь к администратору для добавления новой администрации в справочник ИДС',
            'ficcd_mess_valid_not_name_adm': 'Укажите администрацию',
            'ficcd_mess_valid_add_rod_vag': 'Рода вагона нет в справочнике ИДС, обратитесь к администратору для добавления нового рода в справочник ИДС',
            'ficcd_mess_valid_not_rod_vag': 'Укажите род вагона',
            'ficcd_mess_valid_add_name_owner': 'Владельца вагона нет в справочнике ИДС, обратитесь к администратору для добавления нового владельца в справочник ИДС',
            'ficcd_mess_valid_not_name_owner': 'Укажите владельца',
            'ficcd_mess_valid_add_type_ownership': 'Типа владения вагоном нет в справочнике ИДС, обратитесь к администратору для добавления нового типа в справочник ИДС',
            'ficcd_mess_valid_add_adm_name_plat': 'Платильщика по отправке нет в справочнике ИДС, обратитесь к администратору для добавления нового платильщика в справочник ИДС',
            'ficcd_mess_valid_add_name_plat': 'Платильщика по отправке нет в справочнике ИДС, для продолжения добавте нового платильщика в справочник ИДС',
            'ficcd_mess_valid_name_plat': 'Платильщика по отправке нет в справочнике ИДС',
            'ficcd_mess_valid_not_name_plat': 'Укажите плательщика по отправке',
            'ficcd_mess_valid_add_adm_name_etsng': 'Груза ЕТ СНГ нет в справочнике ИДС, обратитесь к администратору для добавления нового груза в справочник ИДС',
            'ficcd_mess_valid_add_name_etsng': 'Груза ЕТ СНГ нет в справочнике ИДС, для продолжения добавте новый груз в справочник ИДС',
            'ficcd_mess_valid_name_etsng': 'Груза ЕТ СНГ нет в справочнике ИДС.',
            'ficcd_mess_valid_not_name_etsng': 'Укажите груз ЕТ СНГ',
            'ficcd_mess_valid_add_adm_name_gng': 'Груза ГНГ нет в справочнике ИДС, обратитесь к администратору для добавления нового груза в справочник ИДС',
            'ficcd_mess_valid_add_name_gng': 'Груза ГНГ нет в справочнике ИДС, для продолжения добавте новый груз в справочник ИДС',
            'ficcd_mess_valid_not_name_gng': 'Укажите груз ГНГ',
            'ficcd_mess_valid_not_condition_arrival': 'Укажите разметку по прибытию',
            'ficcd_mess_valid_range_gruzp': 'Грузоподъемность должна быть в диапазоне от {0} до {1} тон.',
            'ficcd_mess_valid_range_ves_tary': 'Тара должна быть в диапазоне от {0} до {1} тон.',
            'ficcd_mess_valid_not_group_cargo': 'Груз неопределен',
            'ficcd_mess_valid_nom_vesg': 'Укажите вес груза',
            'ficcd_mess_valid_not_distance_way': 'Не указано тарифное расстояние',
            'figcd_mess_valid_not_deff_date_detention': 'Дата и время приема по акту не может быть меньше времени прибытия состава {0} или больше {1} мин. от текущей даты',

            'ficcd_mess_valid_error_num': 'Указанный вагон {0} уже перенесен, позиция № {1}',
            'ficcd_mess_valid_error_position1': 'Первый предъявленный вагон должен начинается с 1 позиции',
            'ficcd_mess_valid_error_position2': 'Указанная позиция {0} уже существует, вагон № {1}',

            'ficcd_mess_warning_no_data_wagon_uz': 'По выбранному вагону нет данных в БД УЗ. (будут применены данный из справочника ИДС).', //
            'ficcd_mess_warning_off_data_wagon_uz': 'Внимание! Запрос к БД УЗ - отключен! (будут применены данный из справочника ИДС).', //
            'ficcd_mess_warning_no_data_wagon_ids': 'По выбранному вагону нет данных в БД ИДС.', //

            'ficcd_message_mode_manual': 'Внимание! Документ №{0} был введен в ручную!',
            'ficcd_message_mode_auto_manual': 'Внимание! Документ №{0} был введен в ручную в режиме "без документа"!',
            'ficcd_message_mode_null': 'Внимание! Выбран режим «Вода информации без накладной УЗ». Номер накладной будет сформирован автоматически, карточка переведена в ручной режим ввода.',
            'ficcd_message_mode_1': 'Внимание! По указанному вагону неопределен ЭПД, для продолжения выберите один из двух режимов: 1-«Ввод информации без накладной УЗ» (Выбрать галочку «Без ЭПД»); 2-«Поиск ЭПД по номеру вагона и дате прибытия» (Нажать кнопку поиска возле номера вагона) .',
            'ficcd_message_mode_2': 'Внимание! По указанному вагону неопределен основной ЭПД, для продолжения нажмите кнопку поиска ЭПД возле поля номера основной накладной. (Поиск ЭПД будет произведен по номеру вагона и номеру накладной)',
            'ficcd_message_mode_3': 'Внимание! По указанному вагону не удалось найти основной ЭПД, карточка переведена в ручной режим ввода, введите в ручную недостающую информацию.',
            'ficcd_message_mode_4': 'Внимание! По указанному вагону неопределен основной ЭПД, для продолжения выберите один из двух режимов: 1-«Ввод информации без накладной УЗ» (Выбрать галочку «Без ЭПД»); 2-«Поиск ЭПД по номеру вагона и номеру накладной» (Введите номер накладной и нажмите кнопку поиска)',
            'ficcd_message_mode_5': 'Внимание! По указанному вагону не удалось найти ЭПД, карточка переведена в ручной режим ввода, для продолжения выберите один из двух режимов: 1-«Ввод информации без накладной УЗ» (Выбрать галочку «Без ЭПД»); 2-«Полный ручной ввод» (Номера накладных и характеристики - вводятся в ручную).',

            //'ficcd_mess_warning_no_data_dir_wagon': 'По выбранному вагону нет данных в справочнике вагонов ИДС.', //
            'ficcd_mess_warning_no_epd_wagon': 'По выбранному вагону нет перевозочного документа.', //
            'ficcd_mess_warning_no_main_epd_wagon': 'По выбранному вагону нет ЭПД.', //
            'ficcd_mess_error_wagon_arrival': 'Вагон {0} - не принят: {1} или статус {2} не равен 1', //


            'ficcd_mess_init_panel': 'Инициализация модуля (form_incoming_cars_detali) ...',
            'ficcd_mess_load_wagon': 'Обновляю информацию по вагону...', //
            'ficcd_mess_update_wagon': 'Обновляю информацию по вагону в БД ИДС по данным ЭПД', //
            'ficcd_mess_load_db_uz': 'Обновляю информацию о вагоне с БД УЗ...', //
            'ficcd_mess_update_sap': 'Обновляю информацию по входящей поставке', //

            //'ficcd_mess_load_return_wagon': 'Поиск информации по возвратам',
            //'ficcd_mess_update_operation_detention': 'Выполняю операцию обновления задержания по вагону',

            //'ficcd_mess_ok_operation_detention': 'Операция "Обновить задержание по вагону" - выполнена',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;
    var uz_directory = App.uz_directory;

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    // Создадим форму правки операторов
    var FDL = App.form_dialog;
    //-----------------------------------------------------------------------------
    //-- КОНСТРУКТОР
    //-----------------------------------------------------------------------------
    function form_incoming_cars_detali(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$form_incoming_cars = $(selector);
        if (this.$form_incoming_cars.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$form_incoming_cars.attr('id');
    };
    //-----------------------------------------------------------------------------
    //-- Функции инициализации
    //-----------------------------------------------------------------------------
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_incoming_cars_detali.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Функция обновить данные из базы и обновить 
    form_incoming_cars_detali.prototype.update_db = function (list, callback) {
        if (list) {
            this.load_db(list, true, function (result) {
                if (result) {
                    // Выполним обновление компонентов
                    $.each(result, function (i, obj) {
                        switch (obj) {
                            case 'external_station': {
                                this.list_external_station = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
                                this.elements.autocomplete_station_from_name.update(this.list_external_station, null);
                                this.elements.autocomplete_station_on_name.update(this.list_external_station, null);
                                break;
                            };
                            case 'border_checkpoint': {
                                this.list_border_checkpoint = this.ids_dir.getListBorderCheckpoint('code', 'station_name', App.Lang, null);
                                this.elements.autocomplete_stn_border_name.update(this.list_border_checkpoint, null);
                                break;
                            };
                            case 'shipper': {
                                this.list_shipper = this.ids_dir.getListShipper('code', 'shipper_name', App.Lang, null);
                                this.elements.autocomplete_shipper_name.update(this.list_shipper, null);
                                break;
                            };
                            case 'payer_sender': {
                                this.list_payer_sender = this.ids_dir.getListPayerSender('code', 'payer_name', App.Lang, null);
                                this.elements.autocomplete_name_plat.update(this.list_payer_sender, null);
                                break;
                            };
                            case 'cargo_etsng': {
                                this.list_cargo_etsng = this.ids_dir.getListCargoETSNG('code', 'cargo_etsng_name', App.Lang, null);
                                this.elements.autocomplete_name_etsng.update(this.list_cargo_etsng, null);
                                break;
                            };
                            case 'cargo_gng': {
                                this.list_cargo_gng = this.ids_dir.getListCargoGNG('code', 'cargo_gng_name', App.Lang, null);
                                this.elements.autocomplete_name_gng.update(this.list_cargo_gng, null);
                                break;
                            };
                        }
                    }.bind(this));
                }

                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        };
    };
    // Инициализаия формы
    form_incoming_cars_detali.prototype.init = function (options) {
        this.init = true;
        //-------------------------------------
        // Сообщение
        LockScreen(langView('ficcd_mess_init_panel', App.Langs));
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            ids_dir: null,
            uz_dir: null,
            fn_init: null,
            fn_update: null,
        }, options);
        //----------------------------------------------------------------
        // Создадим ссылку на модуль работы с базой данных
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.uz_dir = this.settings.uz_dir ? this.settings.uz_dir : new uz_directory();

        // Создать модальную форму "Окно сообщений"
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        var EPD = App.epd;
        this.epd_uz = new EPD(); // Создадим экземпляр библиотеки работы с ЭПД УЗ

        //// Создадим и инициализируем модуль Задержания и возвраты детвльно
        //var TOGDR = App.table_outgoing_detention_return; // Отправленные вагоны
        var sel_ogdr = 'table-ogdr-' + this.selector;
        //----------------------------------------------------------------
        this.elements = {};                     // Все элементы формы
        // справочники 
        this.list_hazard_class = null;
        this.list_certification_data = null;
        this.list_commercial_condition = null;
        this.list_cargo_etsng = null;
        this.list_cargo_gng = null;
        this.list_payer_sender = null;
        this.list_type_owner_ship = null;
        this.list_type_wagons = null;
        this.list_condition_arrival = null;
        this.list_countrys = null;
        this.list_station = null;
        this.list_divisions = null;
        this.list_external_station = null;
        this.list_border_checkpoint = null;
        this.list_shipper = null;
        this.list_consignee = null;
        this.id = null;                         // текущее id вагона
        this.wagon = null;                      // Текущий вагон
        this.epd = {};                          // текщий ЭПД на вагон
        this.sap = null;                        // текщий САП на вагон
        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['hazard_class', 'certification_data', 'commercial_condition', 'cargo', 'cargo_group', 'cargo_gng', 'cargo_etsng', 'external_station', 'border_checkpoint', 'shipper', 'consignee', 'station', 'divisions', 'countrys', 'genus_wagon', 'condition_arrival', 'type_wagons', 'owners_wagons', 'type_owner_ship', 'operators_wagons', 'limiting_loading', 'payer_sender'], false, function (result) {
            // Подгрузили списки
            this.list_hazard_class = this.ids_dir.getListHazardClass('code', 'hazard_class', App.Lang, null);
            this.list_certification_data = this.ids_dir.getListCertificationData('id', 'certification_data', App.Lang, null);
            this.list_commercial_condition = this.ids_dir.getListCommercialCondition('id', 'commercial_condition', App.Lang, null);
            this.list_cargo_etsng = this.ids_dir.getListCargoETSNG('code', 'cargo_etsng_name', App.Lang, null);
            this.list_cargo_gng = this.ids_dir.getListCargoGNG('code', 'cargo_gng_name', App.Lang, null);
            this.list_payer_sender = this.ids_dir.getListPayerSender('code', 'payer_name', App.Lang, null);
            this.list_type_owner_ship = this.ids_dir.getListTypeOwnerShip('id', 'type_ownership', App.Lang, null);
            //this.list_owners_wagons = this.ids_dir.getListOwnersWagons('id', 'abbr', App.Lang, null);
            this.list_type_wagons = this.ids_dir.getListTypeWagons('id', 'type', App.Lang, null);
            this.list_condition_arrival = this.ids_dir.getListConditionArrival2('id', 'condition_abbr', 'condition_name', App.Lang, function (i) {
                return i.delete === null;
            });
            //this.list_genus_wagon = this.ids_dir.getListGenusWagons('rod_uz', 'genus', App.Lang, null);
            this.list_countrys = this.ids_dir.getListCountrys('code_sng', 'countrys_name', App.Lang, null);
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, null);
            this.list_divisions = this.ids_dir.getListDivisions('code', 'division_abbr', App.Lang, null);
            this.list_external_station = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
            this.list_border_checkpoint = this.ids_dir.getListBorderCheckpoint('code', 'station_name', App.Lang, null);
            this.list_shipper = this.ids_dir.getListShipper('code', 'shipper_name', App.Lang, null);
            this.list_consignee = this.ids_dir.getListConsignee('code', 'name', null);
            //----------------------------------
            // Создать макет панели
            this.form = new FDL();
            var objs = [];
            // Кнопки
            var row1 = {
                obj: 'bs_row',
                options: {
                    class: 'mb-1',
                },
                childs: []
            };
            var col1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var bt_arrival_car = {
                obj: 'bs_button',
                options: {
                    color: 'primary',
                    size: null,
                    class: null,
                    id: 'arrival_car',
                    label: langView('ficcd_label_arrival_car', App.Langs),
                    title: '',
                    icon_left: 'fas fa-arrow-circle-left',
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                        this.action_arrival_wagon();
                    }.bind(this),
                }
            };
            var bt_return_car = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: null,
                    class: 'float-right',
                    id: 'return_car',
                    label: langView('ficcd_label_return_car', App.Langs),
                    title: '',
                    icon_left: null,
                    icon_right: 'fas fa-arrow-circle-right',
                    click: function (event) {
                        event.preventDefault();
                        this.action_return_wagon();
                    }.bind(this),
                }
            };
            // Форма детально
            var row_detali = {
                obj: 'bs_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_detali = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: null,
                },
                childs: []
            };
            // Общие данные
            var fieldset_common = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: null,
                    class_legend: null,
                },
                childs: []
            };
            var form_row_common1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var bt_search_car = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'search_car',
                    label: null,
                    title: langView('ficcd_title_search_car', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-search',
                    click: function (event) {
                        event.preventDefault();
                        this.action_search_car();
                    }.bind(this),
                }
            };
            //var bt_manual_car = {
            //    obj: 'bs_button',
            //    options: {
            //        color: 'danger',
            //        size: 'sm',
            //        class: null,
            //        id: 'manual_car',
            //        label: null,
            //        title: langView('ficcd_title_manual_car', App.Langs),
            //        icon_left: null,
            //        icon_right: 'fas fa-edit',
            //        click: function (event) {
            //            event.preventDefault();
            //            //this.action_remove_wagon();
            //        }.bind(this),
            //    }
            //};
            var form_input_num = {
                obj: 'bs_input_number',
                element: null,
                options: {
                    id: 'num_car',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_num', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_readonly: true,
                    input_min: null,
                    input_max: null,
                    input_step: null,
                    input_spinner: false,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_search_car],
                },
                childs: []
            };
            var form_input_position_arrival = {
                obj: 'bs_input_number',
                options: {
                    id: 'position_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_position_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_position_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_min: 1,
                    input_max: 120,
                    input_step: 1,
                    input_spinner: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_date_adoption_act = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_adoption_act',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_date_adoption_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_date_adoption_act', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: true,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            var form_row_common2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_alert_epd = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'epd',
                },
                childs: []
            };
            var form_row_common3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_checkbox_not_epd = {
                obj: 'bs_checkbox',
                element: null,
                options: {
                    id: 'not_epd',
                    validation_group: 'epd',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_not_epd', App.Langs),
                    label_class: 'mb-1',
                    checkbox_class: 'inp-manual',
                    checkbox_title: null,
                    checkbox_required: null,
                    checkbox_readonly: false,
                    element_default: null,
                    element_change: function (e) {
                        //event.preventDefault();
                        if (this.wagon) {
                            LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                            this.view_wagon_detali(this.wagon)
                        }
                        //var res = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                childs: []
            };
            var bt_search_main_doc = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'search_main_doc',
                    label: null,
                    title: langView('ficcd_title_search_main_doc', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-search',
                    click: function (event) {
                        event.preventDefault();
                        this.action_search_main_doc();
                    }.bind(this),
                }
            };
            var bt_change_main_doc = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'change_main_doc',
                    label: null,
                    title: langView('ficcd_title_change_main_doc', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-delete-left',
                    click: function (event) {
                        event.preventDefault();
                        this.action_change_main_doc();
                    }.bind(this),
                }
            };
            var form_input_document_nom_main_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'document_nom_main_doc',
                    validation_group: 'epd',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_document_nom_main_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_document_nom_main_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_search_main_doc, bt_change_main_doc],
                    element_fn_change: function (e) {
                        var num = Number($(e.currentTarget).val());
                        if (this.mode_epd === 3 || this.mode_epd === 5) {
                            if (num) {
                                this.ids_wsd.getDateTimeUZ_DOC_Of_manual_num_uz(num, function (date) {
                                    this.form.validation_common.check_control_condition(date === null, this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_nom_main_doc_manual_exist', App.Langs).format(date), '', false);
                                }.bind(this))
                            }
                        }
                    }.bind(this),
                },
                childs: []
            };
            var bt_search_doc = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'search_doc',
                    label: null,
                    title: langView('ficcd_title_search_doc', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-search',
                    click: function (event) {
                        event.preventDefault();
                        //this.action_search_doc();
                    }.bind(this),
                }
            };
            var bt_change_doc = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'change_doc',
                    label: null,
                    title: langView('ficcd_title_change_doc', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-delete-left',
                    click: function (event) {
                        event.preventDefault();
                        this.action_change_doc();
                    }.bind(this),
                }
            };
            var form_input_document_nom_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'document_nom_doc',
                    validation_group: 'epd',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_document_nom_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_document_nom_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_search_doc, bt_change_doc],
                    element_fn_change: function (e) {
                        var num = Number($(e.currentTarget).val());
                        if (this.mode_epd === 3 || this.mode_epd === 5) {
                            if (num) {
                                this.ids_wsd.getDateTimeUZ_DOC_Of_manual_num_uz(num, function (date) {
                                    this.form.validation_common.check_control_condition(date === null, this.elements.input_text_document_nom_doc, langView('ficcd_mess_valid_nom_main_doc_manual_exist', App.Langs).format(date), '', false);
                                }.bind(this))
                            }
                        }
                    }.bind(this),
                },
                childs: []
            };
            // МАРШРУТЫ И КЛИЕНТЫ
            var fieldset_routes_clients = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('ficcd_title_fieldset_routes_clients', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            // Станция отправки
            var form_row_routes_clients1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_routes_clients1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_departure_station = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_fieldset_departure_station', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_departure_station = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_code_stn_from = {
                obj: 'bs_input_number',
                options: {
                    id: 'code_stn_from',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_code_stn_from', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_code_stn_from', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_station_from_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'station_from_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_station_from_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_station_from_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_external_station,
                    element_minLength: 2,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_statin_from = this.get_ids_ext_station(null, text);
                        this.view_element(this.ids_statin_from,
                            function (value) {
                                // Получили ответ
                                this.elements.input_number_code_stn_from.val(this.ids_statin_from.code);
                                this.elements.input_text_from_inlandrailway_name.val(this.ids_statin_from.ir_name);
                                this.form.set_validation_object_ok(null, 'station_from_name', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_number_code_stn_from.val('');
                                this.elements.input_text_from_inlandrailway_name.val('');
                                this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_station_from_name', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных                                
                                this.elements.input_number_code_stn_from.val('');
                                this.elements.input_text_from_inlandrailway_name.val('');
                                this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_not_station_from_name', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            var bt_add_station_from = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_station_from',
                    label: null,
                    title: langView('ficcd_title_add_station_from', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_station_from();
                    }.bind(this),
                }
            };
            var form_input_from_inlandrailway_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'from_inlandrailway_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_from_inlandrailway_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_from_inlandrailway_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_station_from],
                },
                childs: []
            };
            // Станция прибытия
            var form_row_routes_clients2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_routes_clients2 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_incoming_station = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_fieldset_incoming_station', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_incoming_station = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_code_stn_on = {
                obj: 'bs_input_number',
                options: {
                    id: 'code_stn_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_code_stn_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_code_stn_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_station_on_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'station_on_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_station_on_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_station_on_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_external_station,
                    element_minLength: 2,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_statin_on = this.get_ids_ext_station(null, text);
                        this.view_element(this.ids_statin_on,
                            function (value) {
                                // Получили ответ
                                this.elements.input_number_code_stn_on.val(this.ids_statin_on.code);
                                this.elements.input_text_on_inlandrailway_name.val(this.ids_statin_on.ir_name);
                                this.form.set_validation_object_ok(null, 'station_on_name', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_number_code_stn_on.val('');
                                this.elements.input_text_on_inlandrailway_name.val('');
                                this.form.set_validation_object_error(null, 'station_on_name', langView('ficcd_mess_valid_station_on_name', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных                                
                                this.elements.input_number_code_stn_on.val('');
                                this.elements.input_text_on_inlandrailway_name.val('');
                                this.form.set_validation_object_error(null, 'station_on_name', langView('ficcd_mess_valid_not_station_on_name', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            var bt_add_station_on = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_station_on',
                    label: null,
                    title: langView('ficcd_title_add_station_on', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_station_on();
                    }.bind(this),
                }
            };
            var form_input_on_inlandrailway_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'on_inlandrailway_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_on_inlandrailway_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_on_inlandrailway_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_station_on],
                },
                childs: []
            };
            // Пагран переход
            var form_row_routes_clients3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_routes_clients3 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_border_crossing = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_fieldset_border_crossing', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_border_crossing = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_stn_border = {
                obj: 'bs_input_number',
                options: {
                    id: 'stn_border',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_stn_border', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_stn_border', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var bt_add_stn_border = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_stn_border',
                    label: null,
                    title: langView('ficcd_title_add_stn_border', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_border_checkpoint();
                    }.bind(this),
                }
            };
            var form_input_stn_border_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'stn_border_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_stn_border_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_stn_border_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_stn_border],
                    element_data: this.list_border_checkpoint,
                    element_minLength: 2,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_border_crossing = this.get_ids_border_checkpoint(null, text);
                        this.view_element(this.ids_border_crossing,
                            function (value) {
                                // Получили ответ
                                this.elements.input_number_stn_border.val(this.ids_border_crossing.code);
                                this.form.set_validation_object_ok(null, 'stn_border_name', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_number_stn_border.val('');
                                this.form.set_validation_object_error(null, 'stn_border_name', langView('ficcd_mess_valid_add_stn_border_name', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных                                
                                this.elements.input_number_stn_border.val('');
                                this.form.set_validation_object_ok(null, 'stn_border_name', "Ок", true);
                                //this.form.set_validation_object_error(null, 'stn_border_name', langView('ficcd_mess_valid_not_stn_border_name', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            var form_input_border_cross_time = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'border_cross_time',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_border_cross_time', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_border_cross_time', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: true,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            //Грузоотправитель
            var form_row_shipper = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_shipper_code = {
                obj: 'bs_input_number',
                options: {
                    id: 'shipper_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_shipper_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_shipper_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var bt_add_shipper = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_shipper',
                    label: null,
                    title: langView('ficcd_title_add_shipper', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_shipper();
                    }.bind(this),
                }
            };
            var form_input_shipper_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'shipper_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_shipper_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_shipper_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_shipper],
                    element_data: this.list_shipper,
                    element_minLength: 2,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_shipper = this.get_ids_shipper(null, text);
                        this.view_element(this.ids_shipper,
                            function (value) {
                                // Получили ответ
                                this.elements.input_number_shipper_code.val(this.ids_shipper.code);
                                this.form.set_validation_object_ok(null, 'shipper_name', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_number_shipper_code.val('');
                                this.form.set_validation_object_error(null, 'shipper_name', langView('ficcd_mess_valid_add_shipper_name', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных 
                                this.elements.input_number_shipper_code.val('');
                                this.form.set_validation_object_error(null, 'shipper_name', langView('ficcd_mess_valid_not_shipper_name', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            //Грузополучатель
            var form_row_consignee = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_consignee_code = {
                obj: 'bs_input_number',
                options: {
                    id: 'consignee_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_consignee_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_consignee_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_select_consignee_name = {
                obj: 'bs_select',
                options: {
                    id: 'consignee_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_consignee_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_consignee_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: this.list_consignee,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        if (value && Number(value) >= 0) {
                            this.elements.input_number_consignee_code.val(value);
                            this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        } else {
                            this.elements.input_number_consignee_code.val("");
                            this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        }
                    }.bind(this),
                },
                childs: []
            };
            //Грузополучатель АМКР, станция\цех
            var form_row_consignee_amkr = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_select_station_amkr_name = {
                obj: 'bs_select',
                options: {
                    id: 'station_amkr_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_station_amkr_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_station_amkr_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: [{ value: 0, text: langView('ficcd_title_station_amkr_for_loading', App.Langs) }].concat(this.list_station),
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        if (value && Number(value) >= 0) {
                            this.form.set_validation_object_ok(null, 'station_amkr_name', "Ок", true);
                        } else {
                            this.form.set_validation_object_error(null, 'station_amkr_name', langView('ficcd_mess_valid_not_station_amkr_name', App.Langs), true);
                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_division_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'division_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_division_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_division_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_division_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'division_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_division_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_division_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_divisions,
                    element_minLength: 0,
                    element_out_value: true,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_divisions = this.get_ids_divisions(null, null, text);
                        this.view_element(this.ids_divisions,
                            function (value) {
                                // Получили ответ
                                this.elements.input_text_division_code.val(this.ids_divisions.code);
                                this.form.set_validation_object_ok(null, 'division_name', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_text_division_code.val('');
                                this.form.set_validation_object_error(null, 'division_name', langView('ficcd_mess_valid_add_division_name', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных 
                                this.elements.input_text_division_code.val('');
                                this.form.set_validation_object_error(null, 'division_name', langView('ficcd_mess_valid_not_division_name', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            // Карточка вагона
            var fieldset_wagon_card = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('ficcd_title_fieldset_wagon_card', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_alert = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'wagon_card',
                },
                childs: []
            };
            // Признак маршрута, правка карточки
            var form_row_wagon_card1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_col_wagon_card1_1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 10,
                    class: 'text-left',
                },
                childs: []
            };
            var form_col_wagon_card1_2 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 2,
                    class: 'pull-right mb-1 text-left',
                },
                childs: []
            };
            var form_checkbox_route_flag = {
                obj: 'bs_checkbox',
                element: null,
                options: {
                    id: 'route_flag',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_route_flag', App.Langs),
                    label_class: 'mb-1',
                    checkbox_class: 'inp-auto',
                    checkbox_title: null,
                    checkbox_required: null,
                    checkbox_readonly: true,
                    element_default: null,
                    element_change: null,
                },
                childs: []
            };
            var bt_wagon_card_save = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'wagon_card_save',
                    label: null,
                    title: langView('fogcd_title_wagon_card_save', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        //this.action_save_detention();
                    }.bind(this),
                }
            };
            var bt_wagon_card_edit = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'wagon_card_edit',
                    label: null,
                    title: langView('fogcd_title_wagon_card_edit', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-edit',
                    click: function (event) {
                        event.preventDefault();
                        //this.action_edit_detention();
                    }.bind(this),
                }
            };
            // код адм, род, 
            var form_row_wagon_card2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kod_adm = {
                obj: 'bs_input_number',
                options: {
                    id: 'kod_adm',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_kod_adm', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_kod_adm', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_select_name_adm = {
                obj: 'bs_select',
                options: {
                    id: 'name_adm',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_name_adm', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_name_adm', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: this.list_countrys,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        //if (value && Number(value) >= 0) {
                        //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        //} else {
                        //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        //}
                    }.bind(this),
                },
                childs: []
            };
            var form_input_rod_vag = {
                obj: 'bs_input_text',
                options: {
                    id: 'rod_vag',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_rod_vag', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_rod_vag', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            // тип цист, Разметка по прибытию, Тип вагона
            var form_row_wagon_card3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_usl_tip = {
                obj: 'bs_input_text',
                options: {
                    id: 'usl_tip',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_usl_tip', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_usl_tip', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_select_condition_arrival = {
                obj: 'bs_select',
                options: {
                    id: 'condition_arrival',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_condition_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_condition_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: this.list_condition_arrival,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        //if (value && Number(value) >= 0) {
                        //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        //} else {
                        //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        //}
                    }.bind(this),
                },
                childs: []
            };
            var form_select_type_wagon = {
                obj: 'bs_select',
                options: {
                    id: 'type_wagon',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_type_wagon', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_type_wagon', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: this.list_type_wagons,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        //if (value && Number(value) >= 0) {
                        //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        //} else {
                        //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        //}
                    }.bind(this),
                },
                childs: []
            };
            //Количество осей: Грузоп. (ЭПД), т: Грузоп. (УЗ), т: Тара(УЗ), т:
            var form_row_wagon_card4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kol_os = {
                obj: 'bs_input_number',
                options: {
                    id: 'kol_os',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_kol_os', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_kol_os', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_gruzp = {
                obj: 'bs_input_number',
                options: {
                    id: 'gruzp',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_gruzp', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_gruzp', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_gruzp_uz = {
                obj: 'bs_input_number',
                options: {
                    id: 'gruzp_uz',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_gruzp_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-uz',
                    input_title: langView('ficcd_title_gruzp_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_tara_uz = {
                obj: 'bs_input_number',
                options: {
                    id: 'tara_uz',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_tara_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-uz',
                    input_title: langView('ficcd_title_tara_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // Вес тары (ЭПД), т: Вес тары(ут.ЭПД), т: Дата ремонта(вагон): Дата ремонта(БД УЗ):
            var form_row_wagon_card5 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_ves_tary_arc = {
                obj: 'bs_input_number',
                options: {
                    id: 'ves_tary_arc',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_ves_tary_arc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_ves_tary_arc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_u_tara = {
                obj: 'bs_input_number',
                options: {
                    id: 'u_tara',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_u_tara', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_u_tara', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_date_rem_vag = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_rem_vag',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_date_rem_vag', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_date_rem_vag', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                    element_time: false,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            var form_input_date_rem_uz = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_rem_uz',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_date_rem_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-uz',
                    input_title: langView('ficcd_title_date_rem_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                    element_time: false,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            // Собственник: Начало аренды: Признак собственности:
            var form_row_wagon_card6 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_name_owner = {
                obj: 'bs_input_text',
                options: {
                    id: 'name_owner',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_name_owner', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-uz',
                    input_title: langView('ficcd_title_name_owner', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_rent_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'rent_start',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_rent_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_rent_start', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                    element_time: true,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            var form_select_type_ownership = {
                obj: 'bs_select',
                options: {
                    id: 'type_ownership',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_type_ownership', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_type_ownership', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_type_owner_ship,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        //if (value && Number(value) >= 0) {
                        //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        //} else {
                        //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        //}
                    }.bind(this),
                },
                childs: []
            };
            //Оператор (АМКР): Ограничение погрузки:
            var form_row_wagon_card7 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_name_operator = {
                obj: 'bs_input_text',
                options: {
                    id: 'name_operator',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_name_operator', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_name_operator', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_limiting_loading = {
                obj: 'bs_input_text',
                options: {
                    id: 'limiting_loading',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 7,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_limiting_loading', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_limiting_loading', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            // Ограничения УЗ (БД УЗ): Примечание:
            var form_row_wagon_card8 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_textarea_wagon_note_uz = {
                obj: 'bs_textarea',
                options: {
                    id: 'wagon_note_uz',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_wagon_note_uz', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: 'inp-uz',
                    textarea_title: langView('fogcd_title_wagon_note_uz', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_textarea_wagon_note = {
                obj: 'bs_textarea',
                options: {
                    id: 'wagon_note',
                    validation_group: 'wagon_card',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_wagon_note', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: 'inp-manual-epd',
                    textarea_title: langView('fogcd_title_wagon_note', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // Дополнительная документация на вагон (элемент акардион)
            var form_row_accordion = {
                obj: 'bs_accordion',
                options: {
                    id: 'accordion',
                    class: 'mt-1',
                    multiselectable: true,
                },
                childs: []
            };
            var form_div_sender_doc = {
                obj: 'div',
                options: {
                    id: 'tab-sender-doc',
                    class: null,
                },
                childs: []
            };
            var form_row_accordion_epd_doc = {
                obj: 'bs_accordion_card_1',
                options: {
                    id: null,
                    accordion_id: 'accordion',
                    card_class: 'border-primary',
                    header_id: 'headingOne',
                    header_class: 'text-left',
                    header_title: langView('fogcd_title_docs', App.Langs),
                    header_icon: 'fas fa-file',
                    header_text: langView('fogcd_text_docs', App.Langs),
                    header_badge: true,
                    header_badge_id: 'count-docs',
                    header_badge_class: 'badge-primary text-white ml-2',
                    collapse_id: 'epd-docs',
                    body_id: null,
                    body_class: null,
                    body_objs: [form_div_sender_doc],
                },
                childs: []
            };
            var form_div_acts = {
                obj: 'div',
                options: {
                    id: 'tab-acts',
                    class: null,
                },
                childs: []
            };
            var form_row_accordion_epd_acts = {
                obj: 'bs_accordion_card_1',
                options: {
                    id: null,
                    accordion_id: 'accordion',
                    card_class: 'border-primary',
                    header_id: 'headingTwo',
                    header_class: 'text-left',
                    header_title: langView('fogcd_title_acts', App.Langs),
                    header_icon: 'fas fa-file-code',
                    header_text: langView('fogcd_text_acts', App.Langs),
                    header_badge: true,
                    header_badge_id: 'count-acts',
                    header_badge_class: 'badge-primary text-white ml-2',
                    collapse_id: 'epd-acts',
                    body_id: null,
                    body_class: null,
                    body_objs: [form_div_acts],
                },
                childs: []
            };
            var form_div_acts_wagon = {
                obj: 'div',
                options: {
                    id: 'tab-acts-wagon',
                    class: null,
                },
                childs: []
            };
            var form_row_accordion_epd_acts_wagon = {
                obj: 'bs_accordion_card_1',
                options: {
                    id: null,
                    accordion_id: 'accordion',
                    card_class: 'border-primary',
                    header_id: 'headingThree',
                    header_class: 'text-left',
                    header_title: langView('fogcd_title_acts_wagon', App.Langs),
                    header_icon: 'fas fa-file-code',
                    header_text: langView('fogcd_text_acts_wagon', App.Langs),
                    header_badge: true,
                    header_badge_id: 'count-acts-wagon',
                    header_badge_class: 'badge-primary text-white ml-2',
                    collapse_id: 'epd-acts-wagon',
                    body_id: null,
                    body_class: null,
                    body_objs: [form_div_acts_wagon],
                },
                childs: []
            };
            // ОПЛАТА
            var fieldset_payer = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('ficcd_title_fieldset_payer', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            // Код: Плательщик с ЭПД Тарифное расстояние: Тариф при выдаче:
            var form_row_payer1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kod_plat = {
                obj: 'bs_input_text',
                options: {
                    id: 'kod_plat',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_kod_plat', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_kod_plat', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var bt_add_name_plat = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_payer_sender',
                    label: null,
                    title: langView('ficcd_title_add_name_plat', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_payer_sender();
                    }.bind(this),
                }
            };
            var form_input_name_plat = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'name_plat',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_name_plat', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_name_plat', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_name_plat],
                    element_data: this.list_payer_sender,
                    element_minLength: 2,
                    element_out_value: true,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_payer_sender = this.get_ids_payer_sender(null, text);
                        this.view_element(this.ids_payer_sender,
                            function (value) {
                                // Получили ответ
                                this.elements.input_text_kod_plat.val(this.ids_payer_sender.code);
                                this.form.set_validation_object_ok(null, 'name_plat', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_text_kod_plat.val('');
                                this.form.set_validation_object_error(null, 'name_plat', langView('ficcd_mess_valid_add_adm_name_plat', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных                                
                                this.elements.input_text_kod_plat.val('');
                                this.form.set_validation_object_error(null, 'name_plat', langView('ficcd_mess_valid_not_name_plat', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            var form_input_distance_way = {
                obj: 'bs_input_number',
                options: {
                    id: 'distance_way',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_distance_way', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_distance_way', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_vagon_pay_v_summa = {
                obj: 'bs_input_number',
                options: {
                    id: 'vagon_pay_v_summa',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_vagon_pay_v_summa', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_vagon_pay_v_summa', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // Груз
            var fieldset_cargo = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('ficcd_title_fieldset_cargo', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            // Код ЕТСНГ: Название груза по ЕТСНГ:
            var form_row_cargo1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kod_etsng = {
                obj: 'bs_input_number',
                options: {
                    id: 'kod_etsng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_kod_etsng', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_kod_etsng', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var bt_add_cargo_etsng = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_cargo_etsng',
                    label: null,
                    title: langView('ficcd_title_add_cargo_etsng', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_cargo_etsng();
                    }.bind(this),
                }
            };
            var form_input_name_etsng = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'name_etsng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_name_etsng', App.Langs),
                    label_class: 'mb-1',
                    input_type: 'textarea',
                    textarea_rows: 4,
                    textarea_cols: null,
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_name_etsng', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_cargo_etsng],
                    element_data: this.list_cargo_etsng,
                    element_minLength: 2,
                    element_out_value: true,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_cargo_etsng = this.get_ids_cargo_etsng(null, text);
                        this.view_element(this.ids_cargo_etsng,
                            function (value) {
                                // Получили ответ
                                this.elements.input_text_group_cargo.val(value.name_group);
                                this.elements.input_number_kod_etsng.val(value.code);
                                this.form.set_validation_object_ok(null, 'name_etsng', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_text_group_cargo.val('');
                                this.elements.input_number_kod_etsng.val('');
                                this.form.set_validation_object_error(null, 'name_etsng', langView('ficcd_mess_valid_add_adm_name_etsng', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных      
                                this.elements.input_text_group_cargo.val('');
                                this.elements.input_number_kod_etsng.val('');
                                this.form.set_validation_object_error(null, 'name_etsng', langView('ficcd_mess_valid_not_name_etsng', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            // Код ГНГ: Название груза по ГНГ:
            var form_row_cargo2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kod_gng = {
                obj: 'bs_input_number',
                options: {
                    id: 'kod_gng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_kod_gng', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_kod_gng', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var bt_add_cargo_gng = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'add_cargo_gng',
                    label: null,
                    title: langView('ficcd_title_add_cargo_gng', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_cargo_gng();
                    }.bind(this),
                }
            };
            var form_input_name_gng = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'name_gng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_name_gng', App.Langs),
                    label_class: 'mb-1',
                    input_type: 'textarea',
                    textarea_rows: 4,
                    textarea_cols: null,
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_name_gng', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [],
                    input_group_append_class: null,
                    input_group_append_objs: [bt_add_cargo_gng],
                    element_data: this.list_cargo_gng,
                    element_minLength: 2,
                    element_out_value: true,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        this.ids_cargo_gng = this.get_ids_cargo_gng(null, text);
                        this.view_element(this.ids_cargo_gng,
                            function (value) {
                                // Получили ответ
                                this.elements.input_number_kod_gng.val(this.ids_cargo_gng.code);
                                this.form.set_validation_object_ok(null, 'name_gng', "Ок", true);
                            }.bind(this),
                            function (value) {
                                // нет данных в ИДС
                                this.elements.input_number_kod_gng.val('');
                                this.form.set_validation_object_error(null, 'name_gng', langView('ficcd_mess_valid_add_adm_name_gng', App.Langs), true);

                            }.bind(this),
                            function (value) {
                                // нет входных данных данных                                
                                this.elements.input_number_kod_gng.val('');
                                this.form.set_validation_object_error(null, 'name_gng', langView('ficcd_mess_valid_not_name_gng', App.Langs), true);
                            }.bind(this)
                        );
                    }.bind(this),
                },
                childs: []
            };
            // Группа груза Сертификатные данные: Коммерческое состояние:
            var form_row_cargo3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_group_cargo = {
                obj: 'bs_input_text',
                options: {
                    id: 'group_cargo',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_group_cargo', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_group_cargo', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_select_certificate_data = {
                obj: 'bs_select',
                options: {
                    id: 'certificate_data',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_certificate_data', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_certificate_data', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_certification_data,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        //if (value && Number(value) >= 0) {
                        //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        //} else {
                        //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        //}
                    }.bind(this),
                },
                childs: []
            };
            var form_select_commercial_condition = {
                obj: 'bs_select',
                options: {
                    id: 'commercial_condition',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_commercial_condition', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('ficcd_title_commercial_condition', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_commercial_condition,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        //if (value && Number(value) >= 0) {
                        //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                        //} else {
                        //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                        //}
                    }.bind(this),
                },
                childs: []
            };
            // Анализ груза
            var form_row_cargo4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_textarea_cargo_analysis = {
                obj: 'bs_textarea',
                options: {
                    id: 'cargo_analysis',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_analysis', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: 'inp-manual',
                    textarea_title: langView('fogcd_title_cargo_analysis', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // Кол. мест: Вес груза(накл.), т: Вес груза(перев.), т: Разница, т: № ЗПУ:
            var form_row_cargo5 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kol_pac = {
                obj: 'bs_input_number',
                options: {
                    id: 'kol_pac',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_kol_pac', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_kol_pac', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_vesg = {
                obj: 'bs_input_number',
                options: {
                    id: 'vesg',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_vesg', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_vesg', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_input_vesg_reweighing = {
                obj: 'bs_input_number',
                options: {
                    id: 'vesg_reweighing',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_vesg_reweighing', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_vesg_reweighing', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_vesg_difference = {
                obj: 'bs_input_number',
                options: {
                    id: 'vesg_difference',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_vesg_difference', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('ficcd_title_vesg_difference', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_nom_zpu = {
                obj: 'bs_input_text',
                options: {
                    id: 'nom_zpu',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_nom_zpu', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_nom_zpu', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // Класс: Описание класса опасности: Код опасности:
            var form_row_cargo6 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_danger_class = {
                obj: 'bs_input_text',
                options: {
                    id: 'danger_class',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_danger_class', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_danger_class', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_select_danger_name = {
                obj: 'bs_select',
                options: {
                    id: 'danger_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 8,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_danger_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_danger_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_hazard_class,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {
                        if (value !== null && value !== "-1") {
                            this.elements.input_text_danger_class.val(value);
                            this.form.set_validation_object_ok(null, 'danger_name', "Ок", true);
                        } else {
                            this.elements.input_text_danger_class.val("");
                            this.form.set_validation_object_ok(null, 'danger_name', "Ок", true);
                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_danger_kod = {
                obj: 'bs_input_text',
                options: {
                    id: 'danger_kod',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_danger_kod', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual-epd',
                    input_title: langView('ficcd_title_danger_kod', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            // Контейнера (элемент акардион)
            var form_row_accordion_cont = {
                obj: 'bs_accordion',
                options: {
                    id: 'accordion',
                    class: 'mt-1',
                    multiselectable: true,
                },
                childs: []
            };
            var form_div_wagon_cont = {
                obj: 'div',
                options: {
                    id: 'tab-wagon-conts',
                    class: null,
                },
                childs: []
            };
            var form_row_accordion_wagon_cont = {
                obj: 'bs_accordion_card_1',
                options: {
                    id: null,
                    accordion_id: 'accordion',
                    card_class: 'border-primary',
                    header_id: 'headingFour',
                    header_class: 'text-left',
                    header_title: langView('fogcd_title_wagon_cont', App.Langs),
                    header_icon: 'fas fa-file',
                    header_text: langView('fogcd_text_wagon_cont', App.Langs),
                    header_badge: true,
                    header_badge_id: 'count-conts',
                    header_badge_class: 'badge-primary text-white ml-2',
                    collapse_id: 'epd-cont',
                    body_id: null,
                    body_class: null,
                    body_objs: [form_div_wagon_cont],
                },
                childs: []
            };
            // SAP
            var fieldset_sap = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('ficcd_title_fieldset_sap', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_alert_sap = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'sap',
                },
                childs: []
            };
            // № Входящей поставки: № позиции: Создана:
            var form_row_sap1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var bt_add_incoming_supply = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'add_incoming_supply',
                    label: null,
                    title: langView('ficcd_title_add_inbound_delivery', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-archive',
                    click: function (event) {
                        event.preventDefault();
                        this.action_add_incoming_supply();
                    }.bind(this),
                }
            };
            var form_input_incoming_supply_num = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_num',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_num_input_sipply', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_num_input_sipply', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: true,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: [bt_add_incoming_supply],
                    input_group_append_class: null,
                    input_group_append_objs: [],
                },
                childs: []
            };
            var form_input_incoming_supply_pos = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_pos',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_num_pos_sipply', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_num_pos_sipply', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_incoming_supply_date = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'incoming_supply_date',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_delivery_dt_sipply', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_delivery_dt_sipply', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_time: true,
                    element_default: null,
                    element_fn_close: function (datetime) {

                    },
                },
                childs: []
            };
            // Запрет выгр.: Судно:
            var form_row_sap2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_incoming_supply_ban = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_ban',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_unloading_ban', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_unloading_ban', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            var form_input_incoming_supply_ship = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_ship',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_ship', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_ship', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            // Материал
            var fieldset_sap_material = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_sap_material', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_material = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_incoming_supply_cargo_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_cargo_code',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_material_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_material_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            var form_input_incoming_supply_cargo_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_cargo_name',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 8,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_material_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_material_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            // Заадресовка
            var fieldset_sap_warehouse = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_sap_warehouse', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_warehouse = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_incoming_supply_warehouse_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_warehouse_code',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_warehouse_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_warehouse_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            var form_input_incoming_supply_warehouse_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_warehouse_name',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_warehouse_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_warehouse_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            // Переадресация (Заадресовка 10км)
            var fieldset_sap_warehouse_new = {
                obj: 'fieldset',
                options: {
                    class: 'border-secondary',
                    legend: langView('ficcd_title_sap_warehouse_new', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_warehouse_new = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_incoming_supply_warehouse_code_10 = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_warehouse_code_10',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_warehouse_code_new', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_warehouse_code_new', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };
            var form_input_incoming_supply_warehouse_name_10 = {
                obj: 'bs_input_text',
                options: {
                    id: 'incoming_supply_warehouse_name_10',
                    validation_group: 'sap',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('ficcd_label_inbound_delivery_warehouse_name_new', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('ficcd_title_inbound_delivery_warehouse_name_new', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false
                },
                childs: []
            };

            // Собираем
            col1.childs.push(bt_arrival_car);
            col1.childs.push(bt_return_car);
            row1.childs.push(col1);
            //
            form_row_common1.childs.push(form_input_num);
            form_row_common1.childs.push(form_input_position_arrival);
            form_row_common1.childs.push(form_input_date_adoption_act);
            form_row_common2.childs.push(form_alert_epd);
            form_row_common3.childs.push(form_checkbox_not_epd);
            form_row_common3.childs.push(form_input_document_nom_main_doc);
            form_row_common3.childs.push(form_input_document_nom_doc);
            //
            fieldset_common.childs.push(form_row_common1);
            fieldset_common.childs.push(form_row_common2);
            fieldset_common.childs.push(form_row_common3);
            // станция отправки
            form_row_departure_station.childs.push(form_input_code_stn_from);
            form_row_departure_station.childs.push(form_input_station_from_name);
            form_row_departure_station.childs.push(form_input_from_inlandrailway_name);
            // станция прибытия
            form_row_incoming_station.childs.push(form_input_code_stn_on);
            form_row_incoming_station.childs.push(form_input_station_on_name);
            form_row_incoming_station.childs.push(form_input_on_inlandrailway_name);
            // погран-переход
            form_row_border_crossing.childs.push(form_input_stn_border);
            form_row_border_crossing.childs.push(form_input_stn_border_name);
            form_row_border_crossing.childs.push(form_input_border_cross_time);
            // грузоотправитель
            form_row_shipper.childs.push(form_input_shipper_code);
            form_row_shipper.childs.push(form_input_shipper_name);
            // грузополучатель
            form_row_consignee.childs.push(form_input_consignee_code);
            form_row_consignee.childs.push(form_select_consignee_name);
            // грузополучатель АМКР
            form_row_consignee_amkr.childs.push(form_select_station_amkr_name);
            form_row_consignee_amkr.childs.push(form_input_division_code);
            form_row_consignee_amkr.childs.push(form_input_division_name);
            // Карточка вагонов, признак маршрута
            form_col_wagon_card1_1.childs.push(form_checkbox_route_flag);
            form_col_wagon_card1_2.childs.push(bt_wagon_card_save);
            form_col_wagon_card1_2.childs.push(bt_wagon_card_edit);
            // адм, род
            form_row_wagon_card2.childs.push(form_input_kod_adm);
            form_row_wagon_card2.childs.push(form_select_name_adm);
            form_row_wagon_card2.childs.push(form_input_rod_vag);
            // тип цист, Разметка по прибытию, Тип вагона
            form_row_wagon_card3.childs.push(form_input_usl_tip);
            form_row_wagon_card3.childs.push(form_select_condition_arrival);
            form_row_wagon_card3.childs.push(form_select_type_wagon);
            // Количество осей: Грузоп. (ЭПД), т: Грузоп. (УЗ), т: Тара(УЗ), т:
            form_row_wagon_card4.childs.push(form_input_kol_os);
            form_row_wagon_card4.childs.push(form_input_gruzp);
            form_row_wagon_card4.childs.push(form_input_gruzp_uz);
            form_row_wagon_card4.childs.push(form_input_tara_uz);
            // Вес тары (ЭПД), т: Вес тары(ут.ЭПД), т: Дата ремонта(вагон): Дата ремонта(БД УЗ):
            form_row_wagon_card5.childs.push(form_input_ves_tary_arc);
            form_row_wagon_card5.childs.push(form_input_u_tara);
            form_row_wagon_card5.childs.push(form_input_date_rem_vag);
            form_row_wagon_card5.childs.push(form_input_date_rem_uz);
            // Собственник: Начало аренды: Признак собственности:
            form_row_wagon_card6.childs.push(form_input_name_owner);
            form_row_wagon_card6.childs.push(form_input_rent_start);
            form_row_wagon_card6.childs.push(form_select_type_ownership);
            //Оператор (АМКР): Ограничение погрузки:
            form_row_wagon_card7.childs.push(form_input_name_operator);
            form_row_wagon_card7.childs.push(form_input_limiting_loading);
            // Ограничения УЗ (БД УЗ): Примечание:
            form_row_wagon_card8.childs.push(form_textarea_wagon_note_uz);
            form_row_wagon_card8.childs.push(form_textarea_wagon_note);


            fieldset_departure_station.childs.push(form_row_departure_station);
            col_routes_clients1.childs.push(fieldset_departure_station);
            //
            fieldset_incoming_station.childs.push(form_row_incoming_station);
            col_routes_clients2.childs.push(fieldset_incoming_station);
            //
            fieldset_border_crossing.childs.push(form_row_border_crossing);
            col_routes_clients3.childs.push(fieldset_border_crossing);
            //....

            // Маршруты и клиенты
            form_row_routes_clients1.childs.push(col_routes_clients1);
            form_row_routes_clients2.childs.push(col_routes_clients2);
            form_row_routes_clients3.childs.push(col_routes_clients3);
            // Карточка вагонов
            form_row_wagon_card1.childs.push(form_col_wagon_card1_1);
            form_row_wagon_card1.childs.push(form_col_wagon_card1_2);
            // Акардион по документам
            form_row_accordion.childs.push(form_row_accordion_epd_doc);
            form_row_accordion.childs.push(form_row_accordion_epd_acts);
            form_row_accordion.childs.push(form_row_accordion_epd_acts_wagon);
            // Оплата
            form_row_payer1.childs.push(form_input_kod_plat);
            form_row_payer1.childs.push(form_input_name_plat);
            form_row_payer1.childs.push(form_input_distance_way);
            form_row_payer1.childs.push(form_input_vagon_pay_v_summa);
            // Код ЕТСНГ: Название груза по ЕТСНГ:
            form_row_cargo1.childs.push(form_input_kod_etsng);
            form_row_cargo1.childs.push(form_input_name_etsng);
            // Код ГНГ: Название груза по ГНГ:
            form_row_cargo2.childs.push(form_input_kod_gng);
            form_row_cargo2.childs.push(form_input_name_gng);
            // Код ГНГ: Название груза по ГНГ:
            form_row_cargo3.childs.push(form_input_group_cargo);
            form_row_cargo3.childs.push(form_select_certificate_data);
            form_row_cargo3.childs.push(form_select_commercial_condition);
            // Анализ груза
            form_row_cargo4.childs.push(form_textarea_cargo_analysis);
            // Кол. мест: Вес груза(накл.), т: Вес груза(перев.), т: Разница, т: № ЗПУ:
            form_row_cargo5.childs.push(form_input_kol_pac);
            form_row_cargo5.childs.push(form_input_vesg);
            form_row_cargo5.childs.push(form_input_vesg_reweighing);
            form_row_cargo5.childs.push(form_input_vesg_difference);
            form_row_cargo5.childs.push(form_input_nom_zpu);
            //
            form_row_cargo6.childs.push(form_input_danger_class);
            form_row_cargo6.childs.push(form_select_danger_name);
            form_row_cargo6.childs.push(form_input_danger_kod);
            // Акардион по контейнерам
            form_row_accordion_cont.childs.push(form_row_accordion_wagon_cont);
            // № Входящей поставки: № позиции: Создана:
            form_row_sap1.childs.push(form_input_incoming_supply_num);
            form_row_sap1.childs.push(form_input_incoming_supply_pos);
            form_row_sap1.childs.push(form_input_incoming_supply_date);
            // Запрет выгр.: Судно:
            form_row_sap2.childs.push(form_input_incoming_supply_ban);
            form_row_sap2.childs.push(form_input_incoming_supply_ship);
            // Материал
            form_row_material.childs.push(form_input_incoming_supply_cargo_code);
            form_row_material.childs.push(form_input_incoming_supply_cargo_name);
            // Заадресовка
            form_row_warehouse.childs.push(form_input_incoming_supply_warehouse_code);
            form_row_warehouse.childs.push(form_input_incoming_supply_warehouse_name);
            // Переадресация (Заадресовка 10км)
            form_row_warehouse_new.childs.push(form_input_incoming_supply_warehouse_code_10);
            form_row_warehouse_new.childs.push(form_input_incoming_supply_warehouse_name_10);


            //
            fieldset_routes_clients.childs.push(form_row_routes_clients1);
            fieldset_routes_clients.childs.push(form_row_routes_clients2);
            fieldset_routes_clients.childs.push(form_row_routes_clients3);
            fieldset_routes_clients.childs.push(form_row_shipper);
            fieldset_routes_clients.childs.push(form_row_consignee);
            fieldset_routes_clients.childs.push(form_row_consignee_amkr);
            //
            fieldset_wagon_card.childs.push(form_alert);
            fieldset_wagon_card.childs.push(form_row_wagon_card1);
            fieldset_wagon_card.childs.push(form_row_wagon_card2);
            fieldset_wagon_card.childs.push(form_row_wagon_card3);
            fieldset_wagon_card.childs.push(form_row_wagon_card4);
            fieldset_wagon_card.childs.push(form_row_wagon_card5);
            fieldset_wagon_card.childs.push(form_row_wagon_card6);
            fieldset_wagon_card.childs.push(form_row_wagon_card7);
            fieldset_wagon_card.childs.push(form_row_wagon_card8);
            fieldset_wagon_card.childs.push(form_row_accordion);
            //
            fieldset_payer.childs.push(form_row_payer1);
            //
            fieldset_cargo.childs.push(form_row_cargo1);
            fieldset_cargo.childs.push(form_row_cargo2);
            fieldset_cargo.childs.push(form_row_cargo3);
            fieldset_cargo.childs.push(form_row_cargo4);
            fieldset_cargo.childs.push(form_row_cargo5);
            fieldset_cargo.childs.push(form_row_cargo6);
            fieldset_cargo.childs.push(form_row_accordion_cont);
            //
            fieldset_sap.childs.push(form_alert_sap);
            //
            fieldset_sap_material.childs.push(form_row_material);
            //
            fieldset_sap_warehouse.childs.push(form_row_warehouse);
            //
            fieldset_sap_warehouse_new.childs.push(form_row_warehouse_new);
            //
            fieldset_sap.childs.push(form_row_sap1);
            fieldset_sap.childs.push(form_row_sap2);
            fieldset_sap.childs.push(fieldset_sap_material);
            fieldset_sap.childs.push(fieldset_sap_warehouse);
            fieldset_sap.childs.push(fieldset_sap_warehouse_new);
            //
            col_detali.childs.push(fieldset_common);
            col_detali.childs.push(fieldset_routes_clients);
            col_detali.childs.push(fieldset_wagon_card);
            col_detali.childs.push(fieldset_payer);
            col_detali.childs.push(fieldset_cargo);
            col_detali.childs.push(fieldset_sap);

            row_detali.childs.push(col_detali);
            //
            objs.push(row1);
            objs.push(row_detali);
            // Инициализируем форму
            this.form.init({
                alert: this.settings.alert, // Подключим Alert модальной формы
                objs: objs,
                mb: 2,
                id: null,
                cl_form: null,
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {

                    }
                }.bind(this),
                fn_html_init: function () {
                    // HTML документы созданы

                }.bind(this),
                fn_init: function (init) {
                    // Инициализация формы закончена
                    // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                    this.form.create_element(this.elements, true);
                    // отобразим форму
                    this.$form_incoming_cars.empty();
                    this.$form_incoming_cars.append(this.form.$form);
                    // Настроим события открытия collapse докименты, акты, контейнера документа ЭПД
                    //$('#accordion').on('shown.bs.collapse', function () {
                    //    // !Перересуем таблицы для корректного отображения полей и данных (Datatables - некорректно отрисовывает скрытые таблицы)
                    //    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    //});

                    $('DIV.accordion').each(function () {
                        $(this).on('shown.bs.collapse', function () {
                            // !Перересуем таблицы для корректного отображения полей и данных (Datatables - некорректно отрисовывает скрытые таблицы)
                            $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                        });
                    });

                    // Создадим и инициализируем модуль информация по ЭПД (Документы)
                    var VEPD = App.view_epd; // Отправленные вагоны
                    this.table_epd_docs = new VEPD('div#tab-sender-doc');                   // Создадим экземпляр
                    this.table_epd_docs.init({
                        type_report: 'table-epd-docs',
                        alert: this.alert,
                        fn_select_rows: function (rows) {
                            if (rows && rows.length > 0) {

                            }
                        }.bind(this),
                        fn_init: function (init) {
                            // На проверку окончания инициализации
                            //process--;
                            //out_init(process);
                        },
                        fn_refresh: function () {
                            //this.out_clear();
                            //this.update();
                        }.bind(this),
                    });
                    // Создадим и инициализируем модуль информация по ЭПД (Акты)
                    this.table_epd_acts = new VEPD('div#tab-acts');                         // Создадим экземпляр
                    this.table_epd_acts.init({
                        type_report: 'table-epd-acts',
                        alert: this.alert,
                        fn_select_rows: function (rows) {
                            if (rows && rows.length > 0) {

                            }
                        }.bind(this),
                        fn_init: function (init) {
                            // На проверку окончания инициализации
                            //process--;
                            //out_init(process);
                        },
                        fn_refresh: function () {
                            //this.out_clear();
                            //this.update();
                        }.bind(this),
                    });
                    // Создадим и инициализируем модуль информация по ЭПД (Акты на вагон)
                    this.table_epd_acts_wagon = new VEPD('div#tab-acts-wagon');                   // Создадим экземпляр
                    this.table_epd_acts_wagon.init({
                        type_report: 'table-epd-acts',
                        alert: this.alert,
                        fn_select_rows: function (rows) {
                            if (rows && rows.length > 0) {

                            }
                        }.bind(this),
                        fn_init: function (init) {
                            // На проверку окончания инициализации
                            //process--;
                            //out_init(process);
                        },
                        fn_refresh: function () {
                            //this.out_clear();
                            //this.update();
                        }.bind(this),
                    });
                    // Создадим и инициализируем модуль информация по ЭПД (Контейнера)
                    this.table_epd_conts = new VEPD('div#tab-wagon-conts');                   // Создадим экземпляр
                    this.table_epd_conts.init({
                        type_report: 'table-epd-conts',
                        alert: this.alert,
                        fn_select_rows: function (rows) {
                            if (rows && rows.length > 0) {

                            }
                        }.bind(this),
                        fn_init: function (init) {
                            // На проверку окончания инициализации
                            //process--;
                            //out_init(process);
                        },
                        fn_refresh: function () {
                            //this.out_clear();
                            //this.update();
                        }.bind(this),
                    });

                    //// Инициализация таблица возвратов детально
                    //this.table_outgoing_detention_return = new TOGDR('div#' + sel_ogdr);             // Создадим экземпляр
                    //this.table_outgoing_detention_return.init({
                    //    type_report: 'return_cars',
                    //    alert: null,
                    //    ids_dir: this.ids_dir,
                    //    ids_wsd: null,
                    //    fn_select_rows: function (rows) {

                    //    }.bind(this),
                    //    fn_init: function (init) {
                    // Инициализация закончена
                    if (typeof this.settings.fn_init === 'function') {
                        this.settings.fn_init(this.init);
                    };
                    //    }.bind(this),
                    //});

                }.bind(this),
            });
        }.bind(this));
    }
    //-----------------------------------------------------------------------------
    //-- Функции обработки состояния формы
    //-----------------------------------------------------------------------------
    // Очистить форму
    form_incoming_cars_detali.prototype.clear_form = function (not_alert) {
        this.clear_out_validation(not_alert, not_alert);
        if (this.elements) {
            this.elements.input_number_num_car.val('');
            this.elements.input_number_position_arrival.val('1');
            this.elements.input_datetime_date_adoption_act.set(null); // уберем дату

            //this.elements.checkbox_not_epd.val(false);
            this.elements.input_text_document_nom_main_doc.val('');
            this.elements.input_text_document_nom_doc.val('');

            // станция отправки
            this.elements.input_number_code_stn_from.val('');
            this.elements.autocomplete_station_from_name.text('');
            this.elements.input_text_from_inlandrailway_name.val('');
            // станция прибытия
            this.elements.input_number_code_stn_on.val('');
            this.elements.autocomplete_station_on_name.text('');
            this.elements.input_text_on_inlandrailway_name.val('');
            // станция погран перехода
            this.elements.input_number_stn_border.val('');
            this.elements.autocomplete_stn_border_name.text('');
            this.elements.input_datetime_border_cross_time.set(null); // уберем дату
            // Грузоотправитель
            this.elements.input_number_shipper_code.val('');
            this.elements.autocomplete_shipper_name.text('');
            // Грузополучатель
            this.elements.input_number_consignee_code.val('');
            this.elements.select_consignee_name.val(-1);
            // Отправить на станцию АМКР, Цех
            this.elements.select_station_amkr_name.val(-1);
            this.elements.autocomplete_division_name.text('');
            // Карточка вагона
            this.elements.checkbox_route_flag.val(false);
            this.elements.input_number_kod_adm.val('');
            this.elements.select_name_adm.val(-1);
            this.elements.input_text_rod_vag.val('');
            this.elements.input_text_usl_tip.val('');
            this.elements.select_condition_arrival.val(-1);
            this.elements.select_type_wagon.val(-1);
            this.elements.input_number_kol_os.val('');
            this.elements.input_number_gruzp.val('');
            this.elements.input_number_gruzp_uz.val('');
            this.elements.input_number_tara_uz.val('');
            this.elements.input_number_ves_tary_arc.val('');
            this.elements.input_number_u_tara.val('');
            this.elements.input_datetime_date_rem_vag.set(null); // уберем дату
            this.elements.input_datetime_date_rem_uz.set(null); // уберем дату
            this.elements.input_text_name_owner.val('');
            this.elements.input_datetime_rent_start.set(null); // уберем дату
            this.elements.select_type_ownership.val(-1);
            this.elements.input_text_name_operator.val('');
            this.elements.input_text_limiting_loading.val('');
            this.elements.textarea_wagon_note_uz.val('');
            this.elements.textarea_wagon_note.val('');
            // документы и акты ЭПД
            $('span#count-docs').text(null); // отобразим количество
            $('span#count-acts').text(null); // отобразим количество
            $('span#count-acts-wagon').text(null); // отобразим количество
            //$('#epd-docs').collapse('toggle', false);
            //$('#epd-acts').collapse('toggle', false);
            // Оплата
            this.elements.input_text_kod_plat.val('');
            this.elements.autocomplete_name_plat.text('');
            this.elements.input_number_distance_way.val('');
            this.elements.input_number_vagon_pay_v_summa.val('');
            // Груз
            this.elements.input_number_kod_etsng.val('');
            this.elements.autocomplete_name_etsng.text('');
            this.elements.input_number_kod_gng.val('');
            this.elements.autocomplete_name_gng.text('');
            this.elements.input_text_group_cargo.val('');
            this.elements.select_certificate_data.val(-1);
            this.elements.select_commercial_condition.val(-1);
            // Анализ груза
            this.elements.textarea_cargo_analysis.val('');
            // Кол. мест: Вес груза(накл.), т: Вес груза(перев.), т: Разница, т: № ЗПУ:
            this.elements.input_number_kol_pac.val('');
            this.elements.input_number_vesg.val('');
            this.elements.input_number_vesg_reweighing.val('');
            this.elements.input_number_vesg_difference.val('');
            this.elements.input_text_nom_zpu.val('');
            // Класс: Описание класса опасности: Код опасности:
            this.elements.input_text_danger_class.val('');
            this.elements.select_danger_name.val(-1);
            this.elements.input_text_danger_kod.val('');
            // САП
            this.elements.input_text_incoming_supply_num.val('');
            this.elements.input_text_incoming_supply_pos.val('');
            this.elements.input_datetime_incoming_supply_date.set(null);
            this.elements.input_text_incoming_supply_ban.val('');
            this.elements.input_text_incoming_supply_ship.val('');
            this.elements.input_text_incoming_supply_cargo_code.val('');
            this.elements.input_text_incoming_supply_cargo_name.val('');
            this.elements.input_text_incoming_supply_warehouse_code.val('');
            this.elements.input_text_incoming_supply_warehouse_name.val('');
            this.elements.input_text_incoming_supply_warehouse_code_10.val('');
            this.elements.input_text_incoming_supply_warehouse_name_10.val('');
        } else {
            throw new Error('this.elements - пустой, нет привязки');
        }
    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.close = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.elements.button_arrival_car.hide();
        this.elements.button_return_car.hide();
        this.elements.button_search_car.hide();
        //this.elements.button_manual_car.hide();
        this.elements.button_search_main_doc.hide();
        this.elements.button_change_main_doc.hide();
        this.elements.button_search_doc.hide();
        this.elements.button_change_doc.hide();
        // кнопки дабовления в БД ИДС
        this.elements.button_add_station_from.hide();
        this.elements.button_add_station_on.hide();
        this.elements.button_add_stn_border.hide();
        this.elements.button_add_shipper.hide();
        this.elements.button_add_payer_sender.hide();
        this.elements.button_add_cargo_etsng.hide();
        this.elements.button_add_cargo_gng.hide();
        this.elements.button_add_incoming_supply.hide();
        this.elements.checkbox_not_epd.val(false);
        // Общая (common)
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        // Общая (epd)
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        // Карточка вагона (wagon_card)
        this.elements.button_wagon_card_edit.hide();
        this.elements.button_wagon_card_save.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });
        // Платильщики (sap)
        this.form.obj_form.validations[3].$elements.each(function () {
            this.prop('disabled', true);
        });
    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.view = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.elements.button_arrival_car.hide();
        if (this.wagon && this.wagon.arrival_sostav_status <= 1 && this.wagon.arrival_car_wim_cur_id === null) {
            this.elements.button_return_car.show();
        } else {
            this.elements.button_return_car.hide();
        }
        this.elements.button_search_car.hide();
        //this.elements.button_manual_car.hide();
        this.elements.button_search_main_doc.hide();
        this.elements.button_change_main_doc.hide();
        this.elements.button_search_doc.hide();
        this.elements.button_change_doc.hide();
        // кнопки дабовления в БД ИДС
        this.elements.button_add_station_from.hide();
        this.elements.button_add_station_on.hide();
        this.elements.button_add_stn_border.hide();
        this.elements.button_add_shipper.hide();
        this.elements.button_add_payer_sender.hide();
        this.elements.button_add_cargo_etsng.hide();
        this.elements.button_add_cargo_gng.hide();
        // Общая
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        // Общая (epd)
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        // Карточка вагона
        this.elements.button_wagon_card_edit.hide();
        this.elements.button_wagon_card_save.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });
        // Платильщики (sap)
        this.form.obj_form.validations[3].$elements.each(function () {
            this.prop('disabled', true);
        });
    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.view_epd = function () {
        this.clear_form(true);
        // Переведем все компоненты в режим disabled
        if (this.wagon && this.wagon.arrival_sostav_status <= 1 && this.wagon.arrival_car_wim_cur_id === null) {
            this.elements.button_arrival_car.show();
        } else {
            this.elements.button_arrival_car.hide();
        }
        this.elements.button_return_car.hide();

        this.elements.button_search_car.hide();
        //this.elements.button_return_car.hide();
        this.elements.button_search_main_doc.hide();
        this.elements.button_change_main_doc.hide();
        this.elements.button_search_doc.hide();
        this.elements.button_change_doc.hide();
        // кнопки дабовления в БД ИДС
        this.elements.button_add_station_from.hide();
        this.elements.button_add_station_on.hide();
        this.elements.button_add_stn_border.hide();
        this.elements.button_add_shipper.hide();
        this.elements.button_add_payer_sender.hide();
        this.elements.button_add_cargo_etsng.hide();
        this.elements.button_add_cargo_gng.hide();

        // деактивировать элементы ЭПД (Общая)
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', true);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        // деактивировать элементы ЭПД (Общая ЭПД)
        this.form.obj_form.validations[1].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', true);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[1].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[1].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        // Карточка вагона
        this.elements.button_wagon_card_edit.hide();
        this.elements.button_wagon_card_save.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', true);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[2].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[2].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        // Платильщики (sap)
        this.form.obj_form.validations[3].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', true);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[3].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[3].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
    };
    // Перевести форму в режим не активно
    form_incoming_cars_detali.prototype.edit = function () {
        this.clear_form(true);
        // кнопки дабовления в БД ИДС
        this.elements.button_add_station_from.hide();
        this.elements.button_add_station_on.hide();
        this.elements.button_add_stn_border.hide();
        this.elements.button_add_shipper.hide();
        this.elements.button_add_payer_sender.hide();
        this.elements.button_add_cargo_etsng.hide();
        this.elements.button_add_cargo_gng.hide();
        this.elements.button_search_main_doc.hide();
        this.elements.button_change_main_doc.hide();
        this.elements.button_search_doc.hide();
        this.elements.button_change_doc.hide();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        if (this.wagon && this.wagon.arrival_sostav_status <= 1) {
            this.elements.button_arrival_car.show();
        } else {
            this.elements.button_arrival_car.hide();
        }
        this.elements.button_return_car.hide();
        // деактивировать элементы ЭПД
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', false);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        // Общая ЭПД
        this.form.obj_form.validations[1].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', false);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[1].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[1].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        // Карточка вагона
        this.form.obj_form.validations[2].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', false);
            };
        });
        this.elements.select_name_adm.disable();
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[2].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[2].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        // SAP
        this.form.obj_form.validations[3].$elements.each(function () {
            if (this.is('.inp-manual-epd')) {
                this.prop('disabled', false);
            };
        });
        // деактивировать элементы базы данных УЗ
        this.form.obj_form.validations[3].$elements.each(function () {
            if (this.is('.inp-uz')) {
                this.prop('disabled', true);
            };
        });
        // активировать элементы ручного ввода
        this.form.obj_form.validations[3].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
    };
    //-----------------------------------------------------------------------------
    //-- Функции отображения информации в форме
    //-----------------------------------------------------------------------------
    // Обновить информацию по вагонам по по основному epd если в документе есть ссылка на него
    form_incoming_cars_detali.prototype.update_wagon_of_main_epd = function (callback) {
        // Проверим если есть ссылка на основной документ, тогда ищем его
        if (this.wagon_settings.main_otpr && this.wagon_settings.main_otpr.otprdp && this.wagon_settings.main_otpr.otprdp.nom_osn_doc) {
            this.wagon_settings.otpr_num = this.wagon_settings.main_otpr_num;                       // переопределяем основной номер как досылочный
            this.wagon_settings.main_otpr_num = this.wagon_settings.main_otpr.otprdp.nom_osn_doc;   // сохраняем основной
            // Получим ЭПД по основной накладной № накладной
            var current_mode_epd = this.mode_epd
            var operation = {
                num_doc: this.wagon_settings.main_otpr.otprdp.nom_osn_doc,
                num: this.wagon.num,
                add: true,
                search_sms: false, // Поищем позже через кнопку
            };
            this.ids_wsd.postOperationUpdateUZ_DOC_Doc_Num(operation, function (result) {
                if (result && result.obj) {
                    this.ids_wsd.postOTPR_UZ_DOCOfXML(result.obj.xml_doc, function (main_otpr) {
                        //main_otpr = null; //TODO: !!!!! тест убрать
                        if (!main_otpr) {
                            this.out_warning(langView('ficcd_mess_warning_no_main_epd_wagon', App.Langs));
                        }
                        this.mode_epd = main_otpr ? 0 : 2; // Режим ЭПД
                        this.wagon_settings.otpr = this.wagon_settings.main_otpr; // переопределяем основной как досылочный
                        this.wagon_settings.otpr_id = this.wagon_settings.main_otpr_id;
                        this.wagon_settings.main_otpr = main_otpr;    // и переопределяем основной даже если он не считан будет нуль
                        this.wagon_settings.main_otpr_id = result.obj.num_doc;
                        if (typeof callback === 'function') {
                            callback(main_otpr);
                        }
                    }.bind(this));
                } else {
                    // Иногда нет данных, сообщаем!
                    this.out_warning(langView('ficcd_mess_warning_no_main_epd_wagon', App.Langs));
                    this.wagon_settings.otpr = this.wagon_settings.main_otpr; // переопределяем основной как досылочный
                    this.wagon_settings.main_otpr = null;
                    this.wagon_settings.main_otpr_id = null;
                    this.mode_epd = 2; // Режим ЭПД
                    if (typeof callback === 'function') {
                        callback(null);
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback(null);
            }
        }
    };
    // Обновить информацию по вагонам по новым данным epd
    form_incoming_cars_detali.prototype.update_wagon_of_epd = function (callback) {
        // Получить все необходимые поля ЭПД
        this.epd = this.epd_uz.get_all_field_epd(this.wagon_settings.main_otpr, this.wagon_settings.otpr, this.wagon.num);
        this.wagon_settings.dir_wagon = null; // сбросим информацию о вагоне
        var info_operation = null;
        this.form.validation_wagon_card.clear_all();
        // обновим вагон
        if (this.epd && this.epd.vagon && this.epd.vagon.nomer) {
            //  Настроим по данным ЭПД
            info_operation = langView('ficcd_title_uz_epd', App.Langs);
            var option = {
                num: this.wagon.num,
                adm: this.epd.vagon.kod_adm,
                rod: this.epd.vagon.rod_vag,
                kol_os: this.epd.vagon.kol_os,
                usl_tip: this.epd.vagon.usl_tip,
                not_check_numeration: false, // не пропускать проверку на системную нумерацию
                user: App.User_Name,
            }

        } else {
            // Настроим с пустыми параметрами
            info_operation = langView('ficcd_title_uz', App.Langs);
            var option = {
                num: this.wagon.num,
                adm: 0,
                rod: null,
                kol_os: 0,
                usl_tip: null,
                not_check_numeration: false, // не пропускать проверку на системную нумерацию
                user: App.User_Name,
            }
        }
        // Выполним обновление
        LockScreen(langView('ficcd_mess_update_wagon', App.Langs));
        this.ids_dir.postOperationCreateUpdateWagons(option, function (result) {
            if (result !== null && result.result >= 0) {
                var mode_operation = langView('ficcd_title_not', App.Langs);

                switch (result.mode) {
                    case 1: {
                        mode_operation = langView('ficcd_title_add', App.Langs);
                        break;
                    };
                    case 2: {
                        mode_operation = langView('ficcd_title_update', App.Langs);
                        break;
                    };
                }
                this.wagon_settings.dir_wagon = result.obj;
                this.wagon_settings.dir_wagon_mode = result.mode;
                var message = langView('ficcd_mess_ok_update_dir_wagon_db_ids', App.Langs).format(langView('ficcd_title_card_wagon', App.Langs), mode_operation, info_operation);
                if (this.epd && this.epd.vagon && this.epd.vagon.nomer) {
                    this.form.validation_wagon_card.out_info_message(message);
                } else {
                    this.form.validation_wagon_card.out_warning_message(message);
                }
                if (typeof callback === 'function') {
                    callback(true);
                }
            } else {
                // Ошибка обновления
                this.form.validation_wagon_card.out_error_message(langView('ficcd_mess_error_update_dir_wagon_db_ids', App.Langs).format(langView('ficcd_title_card_wagon', App.Langs), result !== null ? result.result : null));
                if (typeof callback === 'function') {
                    callback(false);
                }
            }
        }.bind(this));
    };
    // Обновить информацию по вагону
    form_incoming_cars_detali.prototype.update_wagon = function (callback) {
        LockScreen(langView('ficcd_mess_load_wagon', App.Langs));
        this.ids_wsd.getViewIncomingCarsOfIDCar(this.id, function (wagon) {
            if (wagon) {
                this.wagon = wagon;
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            } else {
                this.wagon = null;
                this.out_error(langView('ficcd_mess_warning_no_data_wagon_ids', App.Langs).format(this.id));
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            }
        }.bind(this));

    };
    // Показать детали
    form_incoming_cars_detali.prototype.wagon_detali = function (id, options) {
        LockScreen(langView('ficcd_mess_load_wagon', App.Langs));
        this.form.validation_epd.clear_all(); // стираем только при смене режима
        this.clear_out_validation(false, false);
        this.id = id;
        // Определим основные свойства
        this.wagon_settings = $.extend({
            type: 0,                // Тип операции 0-просмотр, 1-правка
            position: 1,            // Предлогаемая позиция в составе (используется в режиме правка)
            info: null,             // Данные по вагону из базы УЗ (используется в режиме правка)
            dir_wagon: null,        // Данные по вагону из справочника ИДС (используется в режиме правка)
            dir_wagon_mode: 0,      // 
            main_otpr_num: null,    // ЭПД - № основного документа
            main_otpr: null,        // ЭПД - основного документа
            main_otpr_id: null,        // ЭПД - код УЗ основного документа
            otpr_num: null,         // ЭПД - № документа
            otpr: null,             // ЭПД - документа
            otpr_id: null,             // ЭПД - код УЗ документа
            arrival_wagons: null,   // Список принятых вагонов(используется в режиме правка)
            code_stn_from: null,          // Станция отправления (для ручного режима)
            code_stn_to: null,            // Станция назаначения (для ручного режима)
            station_code: null,           // Станция погран перехода (для ручного режима)
            id_station_on_amkr: null,     // Станция АМКР
            id_division_on_amkr: null,    // Цех АМКР
            division_code: null,          // Цех АМКР
            code_payer_sender: null,      // Платильщик по отправке  (для ручного режима)
            distance_way: null,        // Тарифное расстояние  (для ручного режима)
            cargo_etsng_code: null,       // Груз будет найден через етснг по отправке  (для ручного режима)
            cargo_gng_code: null,       // Груз ГНГ (для ручного режима)
            code_shipper: null,           // Грузоотправитель  (для ручного режима)
            code_consignee: null,         // Грузополучатель  (для ручного режима)
            id_certification_data: null,  // Сертификационные данные
        }, options);
        this.update_wagon(function (wagon) {
            if (wagon !== null) {
                if (this.elements) {
                    if (this.wagon_settings.type === 1) {
                        // режим переноса в левую сторону
                        this.mode_epd = 0; // Режим ЭПД
                        //this.view_epd(); // врежиме авто ЭПД
                        //this.edit();
                        LockScreen(langView('ficcd_mess_load_db_uz', App.Langs));
                        var process = 2;
                        // Выход из инициализации
                        var out_init = function (process) {
                            if (process === 0) {
                                this.update_wagon_of_epd(function (result) {
                                    if (result) this.view_wagon_detali(this.wagon);
                                }.bind(this));
                            }
                        }.bind(this);
                        //TODO:!ОТКЛЮЧИЛ ДЛЯ ПРОВЕРКИ
                        if (select_uz_info) {
                            this.uz_dir.getInfoWagonOfNum(this.wagon.num, function (info) {
                                if (info === null) {
                                    // Иногда нет ответа, сообщаем!
                                    this.out_warning(langView('ficcd_mess_warning_no_data_wagon_uz', App.Langs));
                                }
                                this.wagon_settings.info = info;
                                process--;
                                out_init(process);
                            }.bind(this));
                        } else {
                            this.wagon_settings.info = null;
                            this.out_warning(langView('ficcd_mess_warning_off_data_wagon_uz', App.Langs));
                            process--;
                            out_init(process);
                        }
                        // Получим ЭПД по номеру накладной базы УЗ
                        this.ids_wsd.getOTPR_UZ_DOCOfNum(this.wagon.arrival_car_num_doc, function (otpr) {
                            if (otpr === null) {
                                // Иногда нет данных, сообщаем!
                                this.out_warning(langView('ficcd_mess_warning_no_epd_wagon', App.Langs));
                                this.wagon_settings.main_otpr_num = null;
                                this.wagon_settings.main_otpr_id = null;
                                this.mode_epd = 1; // Режим ЭПД
                            } else {
                                this.wagon_settings.main_otpr_num = otpr.nom_doc;
                                this.wagon_settings.main_otpr_id = this.wagon.arrival_car_num_doc;
                                this.mode_epd = 0; // Режим ЭПД
                            }
                            this.wagon_settings.main_otpr = otpr;   // делаем пока как основной
                            this.wagon_settings.otpr_num = null;    // обнуляем досылочный номер
                            this.wagon_settings.otpr = null;        // обнуляем досылочный
                            // уточним информацию по основному документу если это досылка
                            this.update_wagon_of_main_epd(function (main_otpr) {
                                process--;
                                out_init(process);
                            }.bind(this));
                        }.bind(this));
                    } else {
                        // режим просмотра
                        this.view();
                        if (this.wagon_settings.type === 0) this.view_wagon_detali(this.wagon);
                        // Вагон на территории АМКР
                        if (this.wagon_settings.type === 2) {
                            var mess = null;
                            if (this.wagon.arrival_car_wim_cur_id_outer_way) {
                                // На перегоне
                                mess = langView('vicc_title_disable_wagon_out_way', App.Langs).format(this.wagon['arrival_car_wim_cur_name_outer_way_' + App.Lang], this.wagon.arrival_car_wim_cur_outer_way_start.format(format_datetime), this.wagon.arrival_car_wim_cur_outer_way_end ? this.wagon.arrival_car_wim_cur_outer_way_end.format(format_datetime) : '');
                            } else {
                                // На пути станции
                                mess = langView('vicc_title_disable_wagon_way', App.Langs).format(this.wagon['arrival_car_wim_cur_station_name_' + App.Lang], this.wagon['arrival_car_wim_cur_way_num_' + App.Lang] + '-' + this.wagon['arrival_car_wim_cur_way_name_' + App.Lang], this.wagon.arrival_car_wim_cur_way_start.format(format_datetime), this.wagon.arrival_car_wim_cur_way_end ? this.wagon.arrival_car_wim_cur_way_end.format(format_datetime) : '');
                            }
                            this.out_error(mess);
                        }
                        LockScreenOff();
                    }
                } else {
                    throw new Error('this.elements - пустой, нет привязки');
                }
            }
        }.bind(this));
    };
    // Показать детали после определения типа (view & edit)
    form_incoming_cars_detali.prototype.view_wagon_detali = function (wagon) {
        if (this.wagon_settings) {
            var nom_main_doc = wagon.arrival_uz_document_nom_main_doc;
            var nom_doc = wagon.arrival_uz_document_nom_doc;
            var document_manual = wagon.arrival_uz_document_manual;
            // Настроем отображение если окно в режиме редактирования
            this.form.validation_epd.clear_all();
            if (this.wagon_settings.type === 0) {
                if (nom_main_doc < 0) {
                    nom_main_doc = "#" + (nom_main_doc * -1);
                    this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_auto_manual', App.Langs).format(nom_doc !== null ? nom_doc : nom_main_doc));
                } else {
                    if (document_manual) {
                        this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_manual', App.Langs).format(nom_doc !== null ? nom_doc : nom_main_doc));
                    }
                }

            }
            if (this.wagon_settings.type === 1) {
                if (this.elements.checkbox_not_epd.val() === true) {
                    this.edit(); // режим ручной ЭПД
                    this.elements.button_search_car.hide();
                    this.elements.button_search_main_doc.hide();
                    this.elements.button_change_main_doc.hide();
                    this.elements.button_search_doc.hide();
                    this.elements.button_change_doc.hide();
                    this.elements.input_text_document_nom_main_doc.disable();
                    this.elements.input_text_document_nom_doc.disable();
                    nom_main_doc = 0;
                    nom_doc = null;
                    this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_null', App.Langs));
                } else {
                    this.view_epd(); // режим авто ЭПД
                    nom_main_doc = this.wagon_settings.main_otpr_num; //this.epd.nom_main_doc;
                    nom_doc = this.wagon_settings.otpr_num; //this.epd.nom_doc
                    switch (this.mode_epd) {
                        case 0: {
                            //Ок ЭПД определены
                            this.elements.checkbox_not_epd.disable();
                            //this.elements.checkbox_not_epd.val(false);
                            this.elements.button_search_car.hide();
                            this.elements.button_search_main_doc.hide();
                            if (nom_main_doc && nom_doc === null) this.elements.button_change_main_doc.show(); else this.elements.button_change_main_doc.hide();
                            this.elements.button_search_doc.hide();
                            if (nom_doc) this.elements.button_change_doc.show(); else this.elements.button_change_doc.hide();
                            this.elements.input_text_document_nom_main_doc.disable();
                            this.elements.input_text_document_nom_doc.disable();
                            break;
                        };
                        case 1: {
                            // На вагон осутсвуют ЭПД (выбор: Без ЭПД, Поиск по номеру и времени)
                            this.elements.checkbox_not_epd.enable();
                            //this.elements.checkbox_not_epd.val(false);
                            this.elements.button_search_car.show();
                            this.elements.button_search_main_doc.hide();
                            this.elements.button_search_doc.hide();
                            this.elements.input_text_document_nom_main_doc.disable();
                            this.elements.input_text_document_nom_doc.disable();
                            this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_1', App.Langs));
                            break;
                        };
                        case 2: {
                            // На вагон осутсвуют основной ЭПД но есть досылка (выбор: Без ЭПД-неактивно, Поиск по номеру и документу)
                            this.elements.checkbox_not_epd.disable();
                            //this.elements.checkbox_not_epd.val(false);
                            this.elements.button_search_car.hide();
                            this.elements.button_search_main_doc.show();
                            if (nom_main_doc && nom_doc === null) this.elements.button_change_main_doc.show(); else this.elements.button_change_main_doc.hide();
                            this.elements.button_search_doc.hide();
                            if (nom_doc) this.elements.button_change_doc.show(); else this.elements.button_change_doc.hide();
                            this.elements.input_text_document_nom_main_doc.disable();
                            this.elements.input_text_document_nom_doc.disable();
                            this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_2', App.Langs));
                            break;
                        };
                        case 3: {
                            // На вагон осутсвуют основной ЭПД проверка 2 была (выбор: Без ЭПД-неактивно, ручной режим)
                            this.edit(); // режим ручной ЭПД
                            this.elements.checkbox_not_epd.disable();
                            //this.elements.checkbox_not_epd.val(false);
                            this.elements.button_search_car.hide();
                            this.elements.button_search_main_doc.hide();
                            if (nom_main_doc && nom_doc === null) this.elements.button_change_main_doc.show(); else this.elements.button_change_main_doc.hide();
                            this.elements.button_search_doc.hide();
                            if (nom_doc) this.elements.button_change_doc.show(); else this.elements.button_change_doc.hide();
                            this.elements.input_text_document_nom_main_doc.disable();
                            this.elements.input_text_document_nom_doc.disable();
                            this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_3', App.Langs));
                            break;
                        };
                        case 4: {
                            // На вагон осутсвуют ЭПД, но выбор по номеру вагона и времени уже был (выбор: Без ЭПД, Поиск по номеру и накладной)
                            this.elements.checkbox_not_epd.enable();
                            //this.elements.checkbox_not_epd.val(false);
                            this.elements.button_search_car.show();
                            this.elements.button_search_main_doc.show();
                            this.elements.button_change_main_doc.hide();
                            this.elements.button_search_doc.hide();
                            this.elements.button_change_doc.hide();
                            this.elements.input_text_document_nom_main_doc.enable();
                            this.elements.input_text_document_nom_doc.disable();
                            this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_4', App.Langs));
                            break;
                        };
                        case 5: {
                            // На вагон осутсвуют ЭПД, но выбор по номеру вагона и времени уже был (выбор: Без ЭПД, Поиск по номеру и накладной)
                            this.edit(); // режим ручной ЭПД
                            this.elements.checkbox_not_epd.enable();
                            //this.elements.checkbox_not_epd.val(false);
                            this.elements.button_search_car.hide();
                            this.elements.button_search_main_doc.hide();
                            this.elements.button_change_main_doc.hide();
                            this.elements.button_search_doc.hide();
                            this.elements.button_change_doc.hide();
                            this.elements.input_text_document_nom_main_doc.enable();
                            this.elements.input_text_document_nom_doc.enable();
                            this.form.validation_epd.out_warning_message(langView('ficcd_message_mode_5', App.Langs));
                            break;
                        };
                    }
                }
            }
            // Общая информация
            this.elements.input_number_num_car.val(wagon.num);
            this.elements.input_number_position_arrival.val(this.wagon_settings.type === 1 ? this.wagon_settings.position : wagon.arrival_car_position_arrival);
            this.elements.input_datetime_date_adoption_act.val(wagon.arrival_sostav_date_adoption_act);
            // Сделать не активным окно номер основной накладной
            //
            this.elements.input_text_document_nom_main_doc.val(nom_main_doc);
            this.elements.input_text_document_nom_doc.val(nom_doc);
            if (this.wagon_settings.type === 1) { this.validation_epd(false); }
            // МАРШРУТЫ И КЛИЕНТЫ
            this.view_wagon_detali_station_from();      // станция отправки
            this.view_wagon_detali_station_on();        // станция прибытия
            this.view_wagon_detali_border_crossing();   // станция погран-перехода
            this.view_wagon_detali_shipper();           // грузоотправмтель
            this.view_wagon_detali_consignee();         // грузополучатель
            this.view_wagon_detali_consignee_amkr();    // грузополучатель на АМКР
            // КАРТОЧКА ВАГОНА
            this.view_wagon_detali_wagon_card();        // карточку вагона
            // ОПЛАТА
            this.view_wagon_detali_payer_sender();      // Платильщик по отправке
            // ГРУЗ
            this.view_wagon_detali_cargo_etsng();       // Груз ЕТ СНГ
            this.view_wagon_detali_cargo_gng();         // Груз ГНГ
            this.view_wagon_detali_cargo_detali();      // Груз детали
            this.view_wagon_detali_hazard();            // Груз опасность
            this.view_wagon_detali_conts();             // Контейнера
            // САП
            this.view_wagon_detali_sap();               // SAP
        }
        LockScreenOff();
    }
    // Показать детали станция отправления
    form_incoming_cars_detali.prototype.view_wagon_detali_station_from = function () {
        if (this.wagon && this.wagon_settings) {
            var code_stn_from = this.wagon.arrival_uz_document_code_stn_from;
            var station_from_name = this.wagon['arrival_uz_document_station_from_name_' + App.Lang];
            var from_inlandrailway_name = this.wagon['arrival_uz_document_from_inlandrailway_name_' + App.Lang];

            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                code_stn_from = this.epd.route.stn_from ? this.epd.route.stn_from : code_stn_from;
                station_from_name = this.epd.route.name_from ? this.epd.route.name_from : station_from_name;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    code_stn_from = this.wagon_settings.code_stn_from;
                }
                // Получим из БД ИДС
                this.ids_statin_from = this.get_ids_ext_station(code_stn_from, null);
                this.view_element(this.ids_statin_from,
                    function (value) {
                        code_stn_from = value.code;
                        station_from_name = value.name;
                        from_inlandrailway_name = value.ir_name;
                        this.elements.button_add_station_from.hide();
                        this.form.set_validation_object_ok(null, 'station_from_name', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_add_station_from_name', App.Langs), true);
                        this.elements.button_add_station_from.show();
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'station_from_name', langView('ficcd_mess_valid_not_station_from_name', App.Langs), true);
                    }.bind(this)
                );
            }
            // Отобразим
            this.elements.input_number_code_stn_from.val(code_stn_from);
            if (this.ids_statin_from) {
                this.elements.autocomplete_station_from_name.val(code_stn_from); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_station_from_name.text(station_from_name); // нет в справочнике ИДС
            }
            this.elements.input_text_from_inlandrailway_name.val(from_inlandrailway_name);
        }
    };
    // Показать детали станция прибытия
    form_incoming_cars_detali.prototype.view_wagon_detali_station_on = function () {
        if (this.wagon && this.wagon_settings) {
            var code_stn_to = this.wagon.arrival_uz_document_code_stn_to;
            var station_to_name = this.wagon['arrival_uz_document_station_to_name_' + App.Lang];
            var on_inlandrailway_name = this.wagon['arrival_uz_document_to_inlandrailway_name_' + App.Lang];

            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                code_stn_to = this.epd.route.stn_to ? this.epd.route.stn_to : code_stn_to;
                station_to_name = this.epd.route.name_to ? this.epd.route.name_to : station_to_name;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    code_stn_to = this.wagon_settings.code_stn_to;
                }
                // Получим из БД ИДС
                this.ids_statin_on = this.get_ids_ext_station(code_stn_to, null);
                this.view_element(this.ids_statin_on,
                    function (value) {
                        code_stn_to = value.code;
                        station_to_name = value.name;
                        on_inlandrailway_name = value.ir_name;
                        this.elements.button_add_station_on.hide();
                        this.form.set_validation_object_ok(null, 'station_on_name', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'station_on_name', langView('ficcd_mess_valid_add_station_on_name', App.Langs), true);
                        this.elements.button_add_station_on.show();
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'station_on_name', langView('ficcd_mess_valid_not_station_on_name', App.Langs), true);
                    }.bind(this)
                );
            }
            // Отобразим
            this.elements.input_number_code_stn_on.val(code_stn_to);
            if (this.ids_statin_on) {
                this.elements.autocomplete_station_on_name.val(code_stn_to); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_station_on_name.text(station_to_name); // нет в справочнике ИДС
            }
            this.elements.input_text_on_inlandrailway_name.val(on_inlandrailway_name);
        }
    };
    // Показать детали погран перехода
    form_incoming_cars_detali.prototype.view_wagon_detali_border_crossing = function () {
        if (this.wagon && this.wagon_settings) {
            var station_code = this.wagon.arrival_uz_document_code_border_checkpoint;
            var station_name = this.wagon['arrival_uz_document_border_checkpoint_station_name_' + App.Lang];
            var cross_time = this.wagon.arrival_uz_document_cross_time;

            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                station_code = this.epd.route.joint_stn ? this.epd.route.joint_stn : station_code;
                station_name = this.epd.route.joint_stn_name ? this.epd.route.joint_stn_name : station_name;
                cross_time = this.epd.route.joint_cross_time ? this.epd.route.joint_cross_time : cross_time;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    station_code = this.wagon_settings.station_code;
                    cross_time = this.wagon_settings.cross_time;
                }
                // Получим из БД ИДС
                this.ids_border_crossing = this.get_ids_border_checkpoint(station_code, null);
                this.view_element(this.ids_border_crossing,
                    function (value) {
                        station_code = value.code;
                        station_name = value.name;
                        this.elements.button_add_stn_border.hide();
                        this.form.set_validation_object_ok(null, 'stn_border_name', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'stn_border_name', langView('ficcd_mess_valid_add_stn_border_name', App.Langs), true);
                        this.elements.button_add_stn_border.show();
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        //this.form.set_validation_object_error(null, 'stn_border_name', langView('ficcd_mess_valid_not_stn_border_name', App.Langs), true);
                        this.form.set_validation_object_ok(null, 'stn_border_name', "ok", true);
                        this.elements.button_add_stn_border.hide();
                    }.bind(this)
                );
            }
            // Отобразим
            this.elements.input_number_stn_border.val(station_code);
            if (this.ids_border_crossing) {
                this.elements.autocomplete_stn_border_name.val(station_code); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_stn_border_name.text(station_name); // нет в справочнике ИДС
            }
            this.elements.input_datetime_border_cross_time.val(cross_time);
        }
    };
    // Показать детали грузоотправителя
    form_incoming_cars_detali.prototype.view_wagon_detali_shipper = function () {
        if (this.wagon && this.wagon_settings) {
            var shipper_code = this.wagon.arrival_uz_document_code_shipper;
            var shipper_name = this.wagon['arrival_uz_document_shipper_name_' + App.Lang];

            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                shipper_code = this.epd.client.kod_from ? this.epd.client.kod_from : shipper_code;
                shipper_name = this.epd.client.name_from ? this.epd.client.name_from : shipper_name;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    shipper_code = this.wagon_settings.code_shipper;
                }
                // Получим из БД ИДС
                this.ids_shipper = this.get_ids_shipper(shipper_code, null);
                this.view_element(this.ids_shipper,
                    function (value) {
                        shipper_code = value.code;
                        shipper_name = value.name;
                        this.elements.button_add_shipper.hide();
                        this.form.set_validation_object_ok(null, 'shipper_name', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'shipper_name', langView('ficcd_mess_valid_add_shipper_name', App.Langs), true);
                        this.elements.button_add_shipper.show();
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'shipper_name', langView('ficcd_mess_valid_not_shipper_name', App.Langs), true);
                        this.elements.button_add_shipper.hide();
                    }.bind(this)
                );
            };
            // Отобразим
            this.elements.input_number_shipper_code.val(shipper_code);
            if (this.ids_shipper) {
                this.elements.autocomplete_shipper_name.val(shipper_code); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_shipper_name.text(shipper_name); // нет в справочнике ИДС
            }

        }
    };
    // Показать детали грузополучателя
    form_incoming_cars_detali.prototype.view_wagon_detali_consignee = function () {
        if (this.wagon && this.wagon_settings) {
            var code = this.wagon.arrival_uz_document_code_consignee;
            var name = this.wagon['arrival_uz_document_consignee_name_' + App.Lang];
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                code = this.epd.client.kod_on ? this.epd.client.kod_on : code;
                name = this.epd.client.name_on ? this.epd.client.name_on : name;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    code = this.wagon_settings.code_consignee;
                }
                // Получим из БД ИДС
                this.ids_consignee = this.get_ids_consignee(code, null);
                this.view_element(this.ids_consignee,
                    function (value) {
                        code = value.code;
                        name = value.name;
                        this.form.set_validation_object_ok(null, 'consignee_name', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_add_consignee_name', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                    }.bind(this)
                );
            };
            // Отобразим
            this.elements.input_number_consignee_code.val(code);
            if (this.ids_consignee) {
                this.elements.select_consignee_name.val(code); // есть в справочнике ИДС
            } else {
                this.elements.select_consignee_name.text(name); // нет в справочнике ИДС
            }

        }
    };
    // Показать детали грузополучателя АМКР
    form_incoming_cars_detali.prototype.view_wagon_detali_consignee_amkr = function () {
        if (this.wagon && this.wagon_settings) {
            var id_station_on_amkr = this.wagon.arrival_uz_vagon_id_station_on_amkr == null ? 0 : this.wagon.arrival_uz_vagon_id_station_on_amkr;
            var id_division_on_amkr = this.wagon.arrival_uz_vagon_id_division_on_amkr;
            var division_code = this.wagon.arrival_uz_vagon_division_code;
            var division_name = this.wagon['arrival_uz_vagon_division_abbr_' + App.Lang];
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                id_station_on_amkr = this.wagon_settings.id_station_on_amkr !== null ? this.wagon_settings.id_station_on_amkr : -1;
                id_division_on_amkr = this.wagon_settings.id_division_on_amkr;
                // Получим из БД ИДС
                this.ids_divisions = this.get_ids_divisions(id_division_on_amkr, null, null);
                this.view_element(this.ids_divisions,
                    function (value) {
                        division_name = value.name;
                        division_code = value.code
                        this.form.set_validation_object_ok(null, 'division_name', "Ок", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'division_name', langView('ficcd_mess_valid_add_division_name', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'division_name', langView('ficcd_mess_valid_not_division_name', App.Langs), true);
                    }.bind(this)
                );
            };
            this.elements.select_station_amkr_name.val(id_station_on_amkr);
            this.elements.input_text_division_code.val(division_code);
            this.elements.autocomplete_division_name.text(division_name);
        }
    };
    // Показать детали карточка вагона
    form_incoming_cars_detali.prototype.view_wagon_detali_wagon_card = function () {
        if (this.wagon && this.wagon_settings) {
            var adm_code = this.wagon.arrival_uz_vagon_wagon_adm;
            var adm_name = this.wagon['arrival_uz_vagon_wagon_adm_name_' + App.Lang];
            var rod_uz = this.wagon.arrival_uz_vagon_rod;
            var rod_uz_name = this.wagon['arrival_uz_vagon_rod_name_' + App.Lang];
            var usl_tip = this.wagon.arrival_uz_vagon_wagon_usl_tip;
            var id_condition = this.wagon.arrival_uz_vagon_id_condition;
            var id_type = this.wagon.arrival_uz_vagon_id_type;
            var kol_os = this.wagon.arrival_uz_vagon_wagon_kol_os;
            var gruzp = this.wagon.arrival_uz_vagon_gruzp;
            var gruzp_uz = this.wagon.arrival_uz_vagon_gruzp_uz;
            var tara_uz = this.wagon.arrival_uz_vagon_tara_uz;
            var u_tara = this.wagon.arrival_uz_vagon_u_tara;
            var ves_tary_arc = this.wagon.arrival_uz_vagon_ves_tary_arc;
            var date_rem_uz = this.wagon.arrival_uz_vagon_wagon_date_rem_uz;
            var date_rem_vag = this.wagon.arrival_uz_vagon_wagon_date_rem_vag;
            var id_owner = this.wagon.arrival_uz_vagon_id_owner;
            var owner_name = this.wagon['arrival_uz_vagon_owner_wagon_abbr_' + App.Lang];
            var rent_start = this.wagon.arrival_uz_vagon_arrival_wagons_rent_start;
            var id_type_ownership = this.wagon.arrival_uz_vagon_id_type_ownership;
            var type_ownership = this.wagon['arrival_uz_vagon_type_ownership_' + App.Lang];
            var id_operator = this.wagon.arrival_uz_vagon_arrival_wagons_rent_id_operator;
            var operator_name = this.wagon['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
            var id_limiting = this.wagon.arrival_uz_vagon_arrival_wagons_rent_id_limiting;
            var limiting_name = this.wagon['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang];
            var note_uz = null;
            var note_vagon = this.wagon.arrival_uz_vagon_note_vagon;

            // Настроем отображение если окно в режиме просмотра
            if (this.wagon_settings.type === 0) {
                // Получим документы 
                var id_document = this.wagon.arrival_uz_document_id;
                if (id_document) {
                    this.ids_wsd.getArrival_UZ_Document_DocsOfID_Document(id_document, function (docs) {
                        $('span#count-docs').text(docs ? docs.length : null); // отобразим количество
                        this.table_epd_docs.view(docs ? docs : [], null);
                    }.bind(this));
                    this.ids_wsd.getArrival_UZ_Document_ActsOfID_Document(id_document, function (acts) {
                        $('span#count-acts').text(acts ? acts.length : null); // отобразим количество
                        this.table_epd_acts.view(acts ? acts : [], null, [0, 1, 4, 8, 10, 11, 14]);
                    }.bind(this));
                };
                // Получим акты по вагону 
                var id_vagon = this.wagon.arrival_uz_vagon_id;
                if (id_vagon) {
                    this.ids_wsd.getArrival_UZ_Vagon_ActsOfID_Vagon(id_vagon, function (acts) {
                        $('span#count-acts-wagon').text(acts ? acts.length : null); // отобразим количество
                        this.table_epd_acts_wagon.view(acts ? acts : [], null, [0, 1, 4, 8, 10, 11, 14]);
                    }.bind(this));
                }
            }
            // Настроем отображение если окно в режиме авто определение ЭПД (Полу редактирование)
            if (this.wagon_settings.type === 1) {
                var dir_wagon = this.wagon_settings.dir_wagon;
                var mode = this.wagon_settings.dir_wagon_mode;

                // Получим из БД ИДС
                // администрацию
                this.ids_countrys = this.get_ids_countrys(dir_wagon ? dir_wagon.id_countrys : 0, null, null);
                this.view_element(this.ids_countrys,
                    function (value) {
                        adm_code = value.code;
                        adm_name = value.name;
                        this.form.set_validation_object_ok(null, 'name_adm', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'name_adm', langView('ficcd_mess_valid_add_name_adm', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'name_adm', langView('ficcd_mess_valid_not_name_adm', App.Langs), true);
                    }.bind(this)
                );
                // род
                this.ids_genus_wagons = this.get_ids_genus_wagons(dir_wagon ? dir_wagon.id_genus : 0, null, null);
                this.view_element(this.ids_genus_wagons,
                    function (value) {
                        rod_uz = value.code;
                        rod_uz_name = value.name;
                        this.form.set_validation_object_ok(null, 'rod_vag', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'rod_vag', langView('ficcd_mess_valid_add_rod_vag', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'rod_vag', langView('ficcd_mess_valid_not_rod_vag', App.Langs), true);
                    }.bind(this)
                );
                usl_tip = dir_wagon ? dir_wagon.usl_tip : usl_tip;
                // годность по прибытию
                id_condition = -1;
                // тип вагона
                id_type = -1;
                // кол осей 
                kol_os = dir_wagon ? dir_wagon.kol_os : kol_os;
                // Грузоподъемность ЭПД
                gruzp = this.epd.vagon && this.epd.vagon.gruzp ? this.epd.vagon.gruzp : gruzp;
                // Грузоподъемность и тара по УЗ
                gruzp_uz = this.wagon_settings.info && this.wagon_settings.info.carrying_capacity ? Number(this.wagon_settings.info.carrying_capacity) : null;
                tara_uz = this.wagon_settings.info && this.wagon_settings.info.tara ? Number(this.wagon_settings.info.tara) : null;
                // Вес тары ЭПД
                var u_tara = this.epd.vagon && this.epd.vagon.u_tara ? this.epd.vagon.u_tara : u_tara;
                var ves_tary_arc = this.epd.vagon && this.epd.vagon.ves_tary_arc ? this.epd.vagon.ves_tary_arc : ves_tary_arc;
                // Дата ремонта вагона УЗ
                date_rem_uz = this.wagon_settings.info && this.wagon_settings.info.repair_date ? moment(this.wagon_settings.info.repair_date).format(format_date) : null;
                // Владелец
                this.ids_owner = this.get_ids_owner_wagon(dir_wagon ? dir_wagon.id_owner : 0, null);
                this.view_element(this.ids_owner,
                    function (value) {
                        id_owner = value.id;
                        owner_name = value.name;
                        this.form.set_validation_object_ok(null, 'name_owner', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'name_owner', langView('ficcd_mess_valid_add_name_owner', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'name_owner', langView('ficcd_mess_valid_not_name_owner', App.Langs), true);
                    }.bind(this)
                );
                // Начало аренды
                this.ids_current_rent = this.get_ids_current_rent(dir_wagon ? dir_wagon : null);
                if (this.ids_current_rent) rent_start = this.ids_current_rent.rent_start;
                // Тип собственности
                this.ids_type_ownership = this.get_ids_type_ownership(dir_wagon ? dir_wagon.id_type_ownership : null);
                this.view_element(this.ids_type_ownership,
                    function (value) {
                        id_type_ownership = value.id;
                        type_ownership = value.name;
                        //this.form.set_validation_object_ok(null, 'type_ownership', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        //this.form.set_validation_object_error(null, 'type_ownership', langView('ficcd_mess_valid_add_type_ownership', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        //this.form.set_validation_object_ok(null, 'type_ownership', "ok", true);
                    }.bind(this)
                );
                // Оператор на вагон
                this.ids_operators_wagons = this.get_ids_operators_wagons(this.ids_current_rent ? this.ids_current_rent.id_operator : null);
                this.view_element(this.ids_operators_wagons,
                    function (value) {
                        id_operator = value.id;
                        operator_name = value.name;
                        //this.form.set_validation_object_ok(null, 'name_operator', "ok", true);
                    }.bind(this), null, null
                );
                // Оператор на вагон
                this.ids_limiting_loading = this.get_ids_limiting_loading(this.ids_current_rent ? this.ids_current_rent.id_limiting : null);
                this.view_element(this.ids_limiting_loading,
                    function (value) {
                        id_limiting = value.id;
                        limiting_name = value.name;
                        //this.form.set_validation_object_ok(null, 'name_operator', "ok", true);
                    }.bind(this), null, null
                );
                // Показать примечания УЗ и на вагон
                var note_uz = dir_wagon ? dir_wagon.note : null;
                var note_vagon = null;
                // список документов
                this.table_epd_docs.load_epd_docs(this.epd, function (docs) {
                    $('span#count-docs').text(docs && docs.length > 0 ? docs.length : null); // отобразим количество
                    this.table_epd_docs.view(docs, null);
                }.bind(this));
                // список актов на документ
                this.table_epd_docs.load_epd_acts(this.epd, function (acts) {
                    $('span#count-acts').text(acts && acts.length > 0 ? acts.length : null); // отобразим количество
                    this.table_epd_acts.view(acts, null);
                }.bind(this));
                // список актов на вагон
                this.table_epd_docs.load_epd_acts_wagon(this.epd, this.wagon.num, function (acts) {
                    $('span#count-acts-wagon').text(acts && acts.length > 0 ? acts.length : null); // отобразим количество
                    this.table_epd_acts_wagon.view(acts, null);
                }.bind(this));
            };
            // Отобразим адм
            this.elements.input_number_kod_adm.val(adm_code);
            this.elements.select_name_adm.val(adm_code);
            // Отобразим род
            this.elements.input_text_rod_vag.val(rod_uz_name);
            // Тип цистерны
            this.elements.input_text_usl_tip.val(usl_tip);
            // годность по прибытию
            this.elements.select_condition_arrival.val(id_condition);
            // тип вагона
            this.elements.select_type_wagon.val(id_type);
            // Отобразим kol_os
            this.elements.input_number_kol_os.val(kol_os);
            // Отобразим грузоподъемность ЭПД
            this.elements.input_number_gruzp.val(gruzp);
            // Грузоподъемность и тара по УЗ
            this.elements.input_number_gruzp_uz.val(gruzp_uz);
            this.elements.input_number_tara_uz.val(tara_uz);
            // Вес тары ЭПД
            this.elements.input_number_ves_tary_arc.val(ves_tary_arc ? Number(ves_tary_arc / 1000).toFixed(3) : null);
            this.elements.input_number_u_tara.val(u_tara ? Number(u_tara / 1000).toFixed(3) : null);
            // Дата ремонта вагона 
            this.elements.input_datetime_date_rem_vag.val(date_rem_vag);
            this.elements.input_datetime_date_rem_uz.val(date_rem_uz);
            // Владелец
            this.elements.input_text_name_owner.val(owner_name);
            // начало аренды
            this.elements.input_datetime_rent_start.val(rent_start);
            // тип собственности
            this.elements.select_type_ownership.val(id_type_ownership !== null ? id_type_ownership : -1);
            // Оператор
            this.elements.input_text_name_operator.val(operator_name);
            // Ограничение погрузки
            this.elements.input_text_limiting_loading.val(limiting_name);
            // Показать примечания УЗ и на вагон
            this.elements.textarea_wagon_note_uz.val(note_uz);
            this.elements.textarea_wagon_note.val(note_vagon);
            // 

        }
    };
    // Показать детали платильщик по отправке
    form_incoming_cars_detali.prototype.view_wagon_detali_payer_sender = function () {
        if (this.wagon && this.wagon_settings) {
            var code = this.wagon.arrival_uz_document_code_payer_sender;
            var name = this.wagon['arrival_uz_document_payer_sender_name_' + App.Lang];
            var distance_way = this.wagon.arrival_uz_document_distance_way;
            var vagon_pay_summa = this.wagon.arrival_uz_vagon_pay_summa;
            // Настроем отображение если окно в режиме просмотра
            //if (this.wagon_settings.type === 0) {
            //    // Получим платежки по вагону
            //    var id_vagon = this.wagon.arrival_uz_vagon_id;
            //    if (id_vagon) {
            //        this.ids_wsd.getArrival_UZ_Vagon_PayOfID_Vagon(id_vagon, function (pays) {
            //            vagon_pay_summa = 0;
            //            for (var i = 0; i < pays.length; i++) {
            //                if (Number(pays[i].kod) === 1 || Number(pays[i].kod) === 21) {
            //                    vagon_pay_summa += pays[i].summa ? Number(pays[i].summa) : 0;
            //                }
            //            }
            //            this.elements.input_number_vagon_pay_v_summa.val(vagon_pay_summa ? Number(Number(vagon_pay_summa) / 100).toFixed(2) : null);
            //        }.bind(this));
            //    }
            //};
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                code = this.epd.pl.kod_plat ? this.epd.pl.kod_plat : code;
                name = this.epd.pl.name_plat ? this.epd.pl.name_plat : name;
                distance_way = this.epd.distance_way ? this.epd.distance_way : distance_way;
                vagon_pay_summa = this.epd.vagon_pay_summa ? this.epd.vagon_pay_summa : vagon_pay_summa;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    code = this.wagon_settings.code_payer_sender;
                    distance_way = this.wagon_settings.distance_way;
                }
                // Получим из БД ИДС
                this.ids_payer_sender = this.get_ids_payer_sender(code, null);
                this.view_element(this.ids_payer_sender,
                    function (value) {
                        code = value.code;
                        name = value.name;
                        if (this.mode_epd === 0) this.elements.autocomplete_name_plat.disable();
                        this.elements.button_add_payer_sender.hide();
                        this.form.set_validation_object_ok(null, 'name_plat', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.elements.button_add_payer_sender.show();
                        this.form.set_validation_object_error(null, 'name_plat', langView('ficcd_mess_valid_add_name_plat', App.Langs), true);
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        if (this.mode_epd === 0) this.elements.autocomplete_name_plat.enable();
                        this.elements.button_add_payer_sender.hide();
                        this.form.set_validation_object_error(null, 'name_plat', langView('ficcd_mess_valid_not_name_plat', App.Langs), true);
                    }.bind(this)
                );
                //this.elements.input_number_vagon_pay_v_summa.val(vagon_pay_summa ? Number(Number(vagon_pay_summa) / 100).toFixed(2) : null);
            };
            // Отобразим
            this.elements.input_text_kod_plat.val(code);
            if (this.ids_payer_sender) {
                this.elements.autocomplete_name_plat.val(code); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_name_plat.text(name); // нет в справочнике ИДС
            }
            this.elements.input_number_distance_way.val(distance_way);
            this.elements.input_number_vagon_pay_v_summa.val(vagon_pay_summa ? Number(Number(vagon_pay_summa) / 100).toFixed(2) : null);
        }
    };
    // Показать детали Груз ЕТ СНГ
    form_incoming_cars_detali.prototype.view_wagon_detali_cargo_etsng = function () {
        if (this.wagon && this.wagon_settings) {
            var code = this.wagon.arrival_uz_vagon_cargo_etsng_code;
            var name = this.wagon['arrival_uz_vagon_cargo_etsng_name_' + App.Lang];
            var name_group = this.wagon['arrival_uz_vagon_cargo_group_name_' + App.Lang];
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                code = this.epd.cargo.kod_etsng ? this.epd.cargo.kod_etsng : code;
                name = this.epd.cargo.name_etsng ? this.epd.cargo.name_etsng : name;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    code = this.wagon_settings.cargo_etsng_code;
                }
                // Получим из БД ИДС
                this.ids_cargo_etsng = this.get_ids_cargo_etsng(code, null);
                this.view_element(this.ids_cargo_etsng,
                    function (value) {
                        code = value.code;
                        name = value.name;
                        name_group = value.name_group;
                        this.elements.button_add_cargo_etsng.hide();
                        this.form.set_validation_object_ok(null, 'name_etsng', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'name_etsng', langView('ficcd_mess_valid_add_name_etsng', App.Langs), true);
                        this.elements.button_add_cargo_etsng.show();
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_error(null, 'name_etsng', langView('ficcd_mess_valid_not_name_etsng', App.Langs), true);
                        this.elements.button_add_cargo_etsng.hide();
                    }.bind(this)
                );
            };
            // Отобразим
            this.elements.input_number_kod_etsng.val(code);
            this.elements.input_text_group_cargo.val(name_group);
            if (this.ids_cargo_etsng) {
                this.elements.autocomplete_name_etsng.val(code); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_name_etsng.text(name); // нет в справочнике ИДС
            }
        }
    };
    // Показать детали Груз ГНГ
    form_incoming_cars_detali.prototype.view_wagon_detali_cargo_gng = function () {
        if (this.wagon && this.wagon_settings) {
            var code = this.wagon.arrival_uz_vagon_cargo_gng_code;
            var name = this.wagon['arrival_uz_vagon_cargo_gng_name_' + App.Lang];
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                code = this.epd.cargo.kod_gng ? this.epd.cargo.kod_gng : code;
                name = this.epd.cargo.name_gng ? this.epd.cargo.name_gng : name;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    code = this.wagon_settings.cargo_gng_code;
                }
                // Получим из БД ИДС
                this.ids_cargo_gng = this.get_ids_cargo_gng(code, null);
                this.view_element(this.ids_cargo_gng,
                    function (value) {
                        code = value.code;
                        name = value.name;
                        this.elements.button_add_cargo_gng.hide();
                        this.form.set_validation_object_ok(null, 'name_gng', "ok", true);
                    }.bind(this),
                    function (value) {
                        // нет данных в ИДС
                        this.form.set_validation_object_error(null, 'name_gng', langView('ficcd_mess_valid_add_name_gng', App.Langs), true);
                        this.elements.button_add_cargo_gng.show();
                    }.bind(this),
                    function (value) {
                        // нет входных данных данных
                        this.form.set_validation_object_ok(null, 'name_gng', "ok", true);
                        //this.form.set_validation_object_error(null, 'name_gng', langView('ficcd_mess_valid_not_name_gng', App.Langs), true);
                        this.elements.button_add_cargo_gng.hide();
                    }.bind(this)
                );
            };
            // Отобразим
            this.elements.input_number_kod_gng.val(code);
            if (this.ids_cargo_gng) {
                this.elements.autocomplete_name_gng.val(code); // есть в справочнике ИДС
            } else {
                this.elements.autocomplete_name_gng.text(name); // нет в справочнике ИДС
            }
        }
    };
    // Показать детали по грузу, сертиф данные, ком состояние, анализ вес, зпу
    form_incoming_cars_detali.prototype.view_wagon_detali_cargo_detali = function () {
        if (this.wagon && this.wagon_settings) {
            var id_certification_data = this.wagon.arrival_uz_vagon_id_certification_data;
            var id_commercial_condition = this.wagon.arrival_uz_vagon_id_commercial_condition;
            var zayava = this.wagon.arrival_uz_vagon_zayava;
            var kol_pac = this.wagon.arrival_uz_vagon_kol_pac;
            var vesg = this.wagon.arrival_uz_vagon_vesg;
            var vesg_reweighing = this.wagon.arrival_uz_vagon_vesg_reweighing;
            var vesg_difference = null;
            var nom_zpu = this.wagon.arrival_uz_vagon_nom_zpu;
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                id_certification_data = null;
                id_commercial_condition = null;
                zayava = this.epd.zayava ? this.epd.zayava : zayava;
                kol_pac = this.epd.cargo.kol_pac ? this.epd.cargo.kol_pac : kol_pac;
                vesg = this.epd.cargo.vesg ? this.epd.cargo.vesg : vesg;
                vesg_reweighing = 0; // !!!Добавить вес по перегрузке
                nom_zpu = this.epd.vagon_nom_zpu ? this.epd.vagon_nom_zpu : nom_zpu;
                // Ручной режим
                if (this.elements.checkbox_not_epd.val() === true || this.mode_epd === 3 || this.mode_epd === 5) {
                    id_certification_data = this.wagon_settings.id_certification_data;
                }
            };
            // Отобразим
            this.elements.select_certificate_data.val(id_certification_data !== null ? id_certification_data : -1);
            this.elements.select_commercial_condition.val(id_commercial_condition !== null ? id_commercial_condition : -1);
            this.elements.textarea_cargo_analysis.val(zayava);
            this.elements.input_number_kol_pac.val(kol_pac);
            this.elements.input_number_vesg.val(vesg ? Number(vesg / 1000).toFixed(3) : null);
            this.elements.input_number_vesg_reweighing.val(vesg_reweighing && vesg_reweighing > 0 ? Number(vesg_reweighing / 1000).toFixed(3) : null);
            // Посчитаем разницу
            if (vesg && vesg > 0 && vesg_reweighing && vesg_reweighing > 0) {
                vesg_difference = vesg - vesg_reweighing;
            }
            this.elements.input_number_vesg_difference.val(vesg_difference && vesg_difference > 0 ? Number(vesg_difference / 1000).toFixed(3) : null);
            this.elements.input_text_nom_zpu.val(nom_zpu);
        }
    };
    // Показать груз опасность
    form_incoming_cars_detali.prototype.view_wagon_detali_hazard = function () {
        if (this.wagon && this.wagon_settings) {
            var danger = this.wagon.arrival_uz_vagon_danger;
            var danger_kod = this.wagon.arrival_uz_vagon_danger_kod;
            // Настроем отображение если окно в режиме редактирования
            if (this.wagon_settings.type === 1) {
                // Прочесть текущее
                danger = this.epd.cargo.danger ? this.epd.cargo.danger : danger;
                danger_kod = this.epd.cargo.danger_kod ? this.epd.cargo.danger_kod : danger_kod;
            };
            // Отобразим
            this.elements.input_text_danger_class.val(danger);
            this.elements.select_danger_name.val(danger !== null ? danger : -1);
            this.elements.input_text_danger_kod.val(danger_kod);
        }
    };
    // Показать детали контейнеров
    form_incoming_cars_detali.prototype.view_wagon_detali_conts = function () {
        if (this.wagon && this.wagon_settings) {
            // Настроем отображение если окно в режиме просмотра
            if (this.wagon_settings.type === 0) {
                // Получим акты по вагону 
                var id_vagon = this.wagon.arrival_uz_vagon_id;
                if (id_vagon) {
                    this.ids_wsd.getArrival_UZ_Vagon_ContOfID_Vagon(id_vagon, function (conts) {
                        $('span#count-conts').text(conts ? conts.length : null); // отобразим количество
                        var conts_epd = [];
                        for (var i = 0; i < conts.length; i++) {
                            var new_conts_epd = {};
                            new_conts_epd.nom_cont = conts[i].nom_cont;
                            new_conts_epd.kod_tiporazmer = conts[i].kod_tiporazmer;
                            new_conts_epd.gruzp = conts[i].gruzp;
                            new_conts_epd.ves_tary_arc = conts[i].ves_tary_arc;
                            new_conts_epd.collect_k = {};
                            new_conts_epd.collect_k.vesg = conts[i].vesg;
                            new_conts_epd.collect_k.kol_pac = conts[i].kol_pac;
                            var cargo = conts[i].Directory_Cargo
                            var cargo_etsng = cargo ? cargo.Directory_CargoETSNG : null;
                            new_conts_epd.collect_k.kod_etsng = cargo_etsng ? cargo_etsng.code : null;
                            new_conts_epd.pay_k = [];
                            var pay = conts[i].Arrival_UZ_Cont_Pay;
                            var pay_k = {
                                kod: pay && pay.length > 0 ? pay[0].kod : null,
                                summa: pay && pay.length > 0 ? pay[0].summa : null,
                            };
                            new_conts_epd.pay_k.push(pay_k);
                            new_conts_epd.zpu_k = [];
                            var zpu_k = {
                                nom_zpu: conts[i].nom_zpu,
                            };
                            new_conts_epd.zpu_k.push(zpu_k);
                            conts_epd.push(new_conts_epd);
                        }
                        this.table_epd_conts.view(conts_epd ? conts_epd : [], null);
                    }.bind(this));
                }
            }
            // Настроем отображение если окно в режиме авто определение ЭПД (Полу редактирование)
            if (this.wagon_settings.type === 1) {
                // список актов на вагон
                this.table_epd_docs.load_epd_conts(this.epd, this.wagon.num, function (conts) {
                    $('span#count-conts').text(conts && conts.length > 0 ? conts.length : null); // отобразим количество
                    this.table_epd_conts.view(conts, null);
                }.bind(this));
            };
        }
    };
    // Показать детали SAP
    form_incoming_cars_detali.prototype.view_wagon_detali_sap = function () {
        if (this.wagon && this.wagon_settings) {
            var incoming_supply_num = this.wagon.sap_incoming_supply_num;
            var incoming_supply_pos = this.wagon.sap_incoming_supply_pos;
            var incoming_supply_date = this.wagon.sap_incoming_supply_date ? moment(this.wagon.sap_incoming_supply_date).format(format_date) : null;
            var incoming_supply_time = this.wagon.sap_incoming_supply_time;
            var incoming_supply_warehouse_code = this.wagon.sap_incoming_supply_warehouse_code;
            var incoming_supply_warehouse_name = this.wagon.sap_incoming_supply_warehouse_name;
            var incoming_supply_warehouse_code_10 = this.wagon.sap_incoming_supply_warehouse_code_10;
            var incoming_supply_warehouse_name_10 = this.wagon.sap_incoming_supply_warehouse_name_10;
            var incoming_supply_cargo_code = this.wagon.sap_incoming_supply_cargo_code;
            var incoming_supply_cargo_name = this.wagon.sap_incoming_supply_cargo_name;
            var incoming_supply_works = this.wagon.sap_incoming_supply_works;
            var incoming_supply_ship = this.wagon.sap_incoming_supply_ship;
            var incoming_supply_ban = this.wagon.sap_incoming_supply_ban;
            // Настроем отображение если окно в режиме авто определение ЭПД (Полу редактирование)
            if (this.wagon_settings.type === 0) {
                this.elements.button_add_incoming_supply.hide();
            }
            if (this.wagon_settings.type === 1) {
                // Получим акты по вагону 
                var id_arrival_car = this.wagon.arrival_car_id;
                if (id_arrival_car) {
                    this.ids_wsd.getSAPIncomingSupplyOfIDArrivalCar(id_arrival_car, function (sap) {
                        this.sap = sap;
                        // Активируем кнопку запрос в САП
                        if (!sap) {
                            this.elements.button_add_incoming_supply.show();
                            this.form.validation_sap.out_warning_message(langView('ficcd_mess_warning_sap_no_select', App.Langs));
                        } else {
                            if (sap.close === null) {
                                this.elements.button_add_incoming_supply.show();
                                this.form.validation_sap.out_warning_message(langView('ficcd_mess_warning_sap_not_full', App.Langs));
                            } else {
                                this.elements.button_add_incoming_supply.hide();
                                this.form.validation_sap.out_info_message(langView('ficcd_mess_ok_sap_full', App.Langs));
                            }
                            // Отобразим
                            this.elements.input_text_incoming_supply_num.val(sap.VBELN);
                            this.elements.input_text_incoming_supply_pos.val(sap.NUM_VBELN);
                            this.elements.input_datetime_incoming_supply_date.val(sap.ERDAT + ' ' + sap.ETIME);
                            this.elements.input_text_incoming_supply_ban.val(this.get_incoming_supply_ban(sap.KOD_R_10));
                            this.elements.input_text_incoming_supply_ship.val(sap.NAME_SH);
                            this.elements.input_text_incoming_supply_cargo_code.val(sap.MATNR);
                            this.elements.input_text_incoming_supply_cargo_name.val(sap.MAKTX);

                            this.elements.input_text_incoming_supply_warehouse_code.val(sap.LGORT);
                            this.elements.input_text_incoming_supply_warehouse_name.val(sap.LGOBE);
                            this.elements.input_text_incoming_supply_warehouse_code_10.val(sap.LGORT_10);
                            this.elements.input_text_incoming_supply_warehouse_name_10.val(sap.LGOBE_10);

                        }
                    }.bind(this));
                }
            };
            // Отобразим
            this.elements.input_text_incoming_supply_num.val(incoming_supply_num);
            this.elements.input_text_incoming_supply_pos.val(incoming_supply_pos);
            this.elements.input_datetime_incoming_supply_date.val(incoming_supply_date + ' ' + incoming_supply_time);
            this.elements.input_text_incoming_supply_ban.val(this.get_incoming_supply_ban(incoming_supply_ban));
            this.elements.input_text_incoming_supply_ship.val(incoming_supply_ship);
            this.elements.input_text_incoming_supply_cargo_code.val(incoming_supply_cargo_code);
            this.elements.input_text_incoming_supply_cargo_name.val(incoming_supply_cargo_name);

            this.elements.input_text_incoming_supply_warehouse_code.val(incoming_supply_warehouse_code);
            this.elements.input_text_incoming_supply_warehouse_name.val(incoming_supply_warehouse_name);
            this.elements.input_text_incoming_supply_warehouse_code_10.val(incoming_supply_warehouse_code_10);
            this.elements.input_text_incoming_supply_warehouse_name_10.val(incoming_supply_warehouse_name_10);

        }
    };
    //-----------------------------------------------------------------------------------
    //-- Функции работы со справочниками БД ИДС
    //-----------------------------------------------------------------------------
    // Получить информацию по станции прибытия из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_ext_station = function (code, name) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getExternalStation_Of_ID(code);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getExternalStation_Of_CultureName('station_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (obj_db) {
            result.code = obj_db.code;
            result.name = obj_db['station_name_' + App.Lang];
            result.ir_name = null;
            if (obj_db.Directory_InlandRailway) {
                result.ir_name = obj_db.Directory_InlandRailway['inlandrailway_name_' + App.Lang];
            }
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по станции прибытия из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_border_checkpoint = function (code, name) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getBorderCheckpoint_Of_ID(code);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getBorderCheckpoint_Of_CultureName('station_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (obj_db) {
            result.code = obj_db.code;
            result.name = obj_db['station_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по грузоотправителю из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_shipper = function (code, name) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getShipper_Of_ID(code);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getShipper_Of_CultureName('shipper_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (obj_db) {
            result.code = obj_db.code;
            result.name = obj_db['shipper_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по грузополучателю из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_consignee = function (code) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getConsignee_Of_ID(code);
            obj_db = obj ? obj : null;
        } else {
            return undefined; // Не один параметр не задан
        }
        if (obj_db) {
            result.code = obj_db.code;
            result.name = obj_db.name;
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по администрации из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_countrys = function (id, code, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getCountrys_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (code) {
                var obj = this.ids_dir.getCountrys_Of_CodeSNG(code);
                obj_db = obj ? obj : null;
            } else {
                if (name && name !== '') {
                    var obj = this.ids_dir.getCountrys_Of_CultureName('countrys_name', name);
                    obj_db = obj && obj.length > 0 ? obj[0] : 0;
                } else {
                    return undefined; // Не один параметр не задан
                }
            }
        }
        if (obj_db) {
            result.id = obj_db.id;
            result.code = obj_db.code_sng;
            result.name = obj_db['countrys_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по роду вагона из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_genus_wagons = function (id, code, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getGenusWagons_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (code) {
                var obj = this.ids_dir.getGenusWagons_Of_RodUZ(code);
                obj_db = obj ? obj : null;
            } else {
                if (name && name !== '') {
                    var obj = this.ids_dir.getGenusWagons_Of_CultureName('genus', name);
                    obj_db = obj && obj.length > 0 ? obj[0] : 0;
                } else {
                    return undefined; // Не один параметр не задан
                }
            }
        };
        if (obj_db) {
            result.id = obj_db.id;
            result.code = obj_db.rod_uz;
            result.name = obj_db['genus_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по владельцу из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_owner_wagon = function (id, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getOwnersWagons_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getOwnersWagons_Of_Name('abbr', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        };
        if (obj_db) {
            result.id = obj_db.id;
            result.name = obj_db['abbr_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Вернуть текущую аренду вагона из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_current_rent = function (vagon) {
        if (vagon && vagon.Directory_WagonsRent && vagon.Directory_WagonsRent.length > 0) {
            var rent = vagon.Directory_WagonsRent.filter(function (i) {
                return (i.rent_end) ? false : true;
            });
            if (rent && rent.length > 0) {
                return rent[0];
            }
        }
        return null;
    };
    // Получить информацию по типу собственности из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_type_ownership = function (id, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getTypeOwnerShip_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getTypeOwnerShip_Of_CultureName('type_ownership', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        };
        if (obj_db) {
            result.id = obj_db.id;
            result.name = obj_db['type_ownership_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по оператору вагона из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_operators_wagons = function (id, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getOperatorsWagons_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getOperatorsWagons_Of_CultureName('operators', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        };
        if (obj_db) {
            result.id = obj_db.id;
            result.name = obj_db['operators_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по ограничению погрузки вагона из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_limiting_loading = function (id, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getLimitingLoading_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getLimitingLoading_Of_CultureName('limiting_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        };
        if (obj_db) {
            result.id = obj_db.id;
            result.name = obj_db['limiting_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по подразделению АМКР из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_divisions = function (id, code, name) {
        var obj_db = null;
        var result = {};
        if (id !== null) {
            var obj = this.ids_dir.getDivisions_Of_ID(id);
            obj_db = obj ? obj : null;
        } else {
            if (code) {
                var obj = this.ids_dir.getDivisions_Of_Code(code);
                obj_db = obj ? obj : null;
            } else {
                if (name && name !== '') {
                    var obj = this.ids_dir.getDivisions_Of_CultureName('division_abbr', name);
                    obj_db = obj && obj.length > 0 ? obj[0] : 0;
                } else {
                    return undefined; // Не один параметр не задан
                }
            }
        };
        if (obj_db) {
            result.id = obj_db.id;
            result.code = obj_db.code;
            result.name = obj_db['division_abbr_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по платильщику по прибытию из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_payer_sender = function (code, name) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getPayerSender_Of_ID(code);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getPayerSender_Of_CultureName('payer_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (obj_db) {
            result.code = obj_db.code;
            result.name = obj_db['payer_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по грузу ЕТ СНГ из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_cargo_etsng = function (code, name) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getCargoETSNG_Of_Code(code);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getCargoETSNG_Of_CultureName('cargo_etsng_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (obj_db) {
            // Найдем группу груза
            result.name_group = '';
            result.id_cargo = null;
            result.id_group = null;
            var cargo = this.ids_dir.getCargo_Of_IDETSNG(obj_db.id);
            if (cargo && cargo.id_group) {
                var group = this.ids_dir.getCargoGroup_Of_ID(cargo.id_group);
                result.id_cargo = cargo.id;
                result.id_group = cargo.id_group
                result.name_group = group ? group['cargo_group_name_' + App.Lang] : '';
            }
            result.code = obj_db.code;
            result.name = obj_db['cargo_etsng_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Получить информацию по грузу ГНГ из базы данных ИДС
    form_incoming_cars_detali.prototype.get_ids_cargo_gng = function (code, name) {
        var obj_db = null;
        var result = {};
        if (code !== null) {
            var obj = this.ids_dir.getCargoGNG_Of_Code(code);
            obj_db = obj ? obj : null;
        } else {
            if (name && name !== '') {
                var obj = this.ids_dir.getCargoGNG_Of_CultureName('cargo_gng_name', name);
                obj_db = obj && obj.length > 0 ? obj[0] : 0;
            } else {
                return undefined; // Не один параметр не задан
            }
        }
        if (obj_db) {
            result.id = obj_db.id;
            result.code = obj_db.code;
            result.name = obj_db['cargo_gng_name_' + App.Lang];
            return result;
        } else return null; // Объект не найден
    };
    // Добавить внешнюю станцию в справочник ИДС.
    form_incoming_cars_detali.prototype.add_ids_ext_station = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationExternalStation(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    // Добавить погран переход в справочник ИДС.
    form_incoming_cars_detali.prototype.add_ids_border_checkpoint = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationBorderCheckpoint(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    // Добавить грузоотправителя в справочник ИДС.
    form_incoming_cars_detali.prototype.add_ids_shipper = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationShipper(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    // Добавить платильщика по отправке в справочник
    form_incoming_cars_detali.prototype.add_ids_payer_sender = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationPayerSender(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    // Добавить груз ЕТ СНГ в справочник ИДС.
    form_incoming_cars_detali.prototype.add_ids_cargo_etsng = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationCargoETSNG(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    // Добавить груз ГНГ в справочник ИДС.
    form_incoming_cars_detali.prototype.add_ids_cargo_gng = function (code, name, fn_ok, fn_err) {
        // подготовим операцию
        var operation = {
            code: code,
            name: name,
            user: App.User_Name,
        }
        // Выполним операцию
        this.ids_dir.postOperationCargoGNG(operation, function (result) {
            if (result) {
                if (typeof fn_ok === 'function') {
                    fn_ok(result);
                }
            } else {
                if (typeof fn_err === 'function') {
                    fn_err(result);
                }
            }
        }.bind(this));
    }
    //-----------------------------------------------------------------------------
    //-- Функции обработки часто повторяющихся задач
    //-----------------------------------------------------------------------------
    // Проверить и отработать информацию
    form_incoming_cars_detali.prototype.view_element = function (value, fn_ok, fn_null, fn_undefined) {
        if (value) {
            if (typeof fn_ok === 'function') {
                fn_ok(value);
            }
        } else {
            if (value === null) {
                if (typeof fn_null === 'function') {
                    fn_null(value);
                }
            } else {
                if (typeof fn_undefined === 'function') {
                    fn_undefined(value);
                }
            }
        }
    };
    //-----------------------------------------------------------------------------
    //-- Функции обработки преобразований
    //-----------------------------------------------------------------------------
    form_incoming_cars_detali.prototype.get_incoming_supply_ban = function (s) {
        if (s === null) return null;
        switch (s) {
            case '@5A@': return "Запрещена";
            case '@5B@': return "Разрешена";
            default: return s;
        }
    };
    //-----------------------------------------------------------------------------
    //-- Функции валидации
    //-----------------------------------------------------------------------------
    // Очистить сообщения валидации
    form_incoming_cars_detali.prototype.clear_out_validation = function (not_alert, not_alert_epd) {
        //if (!not_alert) this.out_clear();
        this.form.validation_common.clear_all(not_alert);
        this.form.validation_epd.clear_all(not_alert_epd); // стираем только при смене режима
        this.form.validation_wagon_card.clear_all(not_alert);
        //this.form.validation_payment.clear_all(not_alert);
        //this.form.validation_cargo.clear_all(not_alert);
        this.form.validation_sap.clear_all();
    };
    // Валидация формы ЭПД документов (наличие номера и считанного эпд)
    form_incoming_cars_detali.prototype.validation_epd = function (out_message) {
        var valid = true;
        if (this.elements.checkbox_not_epd.val() !== true) {
            // Проверим основной документ
            valid = valid & this.form.validation_common.check_control_input_not_null(this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_not_nom_main_doc', App.Langs), '', out_message)
            if (valid) {
                valid = valid & this.form.validation_common.check_control_condition(!isNaN(Number(this.elements.input_text_document_nom_main_doc.val())), this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_not_number_nom_main_doc', App.Langs), '', out_message);
                // Проверим соответсвие номер эпд и наличие самого ЭПД
                if (this.mode_epd === 1 || this.mode_epd === 2 || this.mode_epd === 4) {
                    valid = valid & this.form.validation_common.check_control_condition(this.wagon_settings.main_otpr_num && this.wagon_settings.main_otpr, this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_not_epd_main_doc', App.Langs), '', out_message);
                }
            }
            // Проверим досылочный документ
            if (this.elements.input_text_document_nom_doc.val() && this.elements.input_text_document_nom_doc.val() !== '') {
                valid = valid & this.form.validation_common.check_control_condition(!isNaN(Number(this.elements.input_text_document_nom_doc.val())), this.elements.input_text_document_nom_doc, langView('ficcd_mess_valid_not_number_nom_main_doc', App.Langs), '', out_message);
                if (this.mode_epd !== 3 && this.mode_epd !== 5) {
                    valid = valid & this.form.validation_common.check_control_condition(this.wagon_settings.otpr_num && this.wagon_settings.otpr, this.elements.input_text_document_nom_doc, langView('ficcd_mess_valid_not_epd_doc', App.Langs), '', out_message);
                }
            }
            if (valid) {
                if (this.elements.input_text_document_nom_doc.val() && this.elements.input_text_document_nom_doc.val() !== '' &&
                    this.elements.input_text_document_nom_main_doc.val() && this.elements.input_text_document_nom_main_doc.val() !== '') {
                    if (Number(this.elements.input_text_document_nom_doc.val()) === Number(this.elements.input_text_document_nom_main_doc.val())) {
                        valid = valid & this.form.validation_common.set_form_element_error(this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_epd_equal', App.Langs), out_message);
                        valid = valid & this.form.validation_common.set_form_element_error(this.elements.input_text_document_nom_doc, langView('ficcd_mess_valid_epd_equal', App.Langs), out_message);
                    }
                }

            }
            if (this.mode_epd === 3 || this.mode_epd === 5) {
                if (this.elements.input_text_document_nom_main_doc.val() !== null && this.elements.input_text_document_nom_main_doc.val() !== '') {
                    this.ids_wsd.getDateTimeUZ_DOC_Of_manual_num_uz(this.elements.input_text_document_nom_main_doc.val(), function (date) {
                        valid = valid & this.form.validation_common.check_control_condition(date === null, this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_nom_main_doc_manual_exist', App.Langs).format(date), '', out_message);
                    }.bind(this))
                }
                if (valid) {
                    if (this.elements.input_text_document_nom_doc.val() !== null && this.elements.input_text_document_nom_doc.val() !== '') {
                        this.ids_wsd.getDateTimeUZ_DOC_Of_manual_num_uz(this.elements.input_text_document_nom_doc.val(), function (date) {
                            valid = valid & this.form.validation_common.check_control_condition(date === null, this.elements.input_text_document_nom_doc, langView('ficcd_mess_valid_nom_main_doc_manual_exist', App.Langs).format(date), '', out_message);
                        }.bind(this))
                    }
                }
            }

        } else {

        }

        return valid
    };
    // Валидация формы детально
    form_incoming_cars_detali.prototype.validation_wagon_detali = function () {
        this.clear_out_validation(false, true); // очистить все сообщения
        var valid = true;
        // Проверка номера
        var num = this.elements.input_number_num_car.val();
        if (this.wagon_settings.arrival_wagons && this.wagon_settings.arrival_wagons.length > 0) {
            var wagon = this.wagon_settings.arrival_wagons.find(function (o) {
                return o.num === num;
            });
            if (wagon) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_num_car.$element, langView('ficcd_mess_valid_error_num', App.Langs).format(wagon.num, wagon.position));
            } else {
                valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_num_car.$element, '');
            }
        }
        // Проверка позиции
        var position = this.elements.input_number_position_arrival.val();
        if (this.wagon_settings.position === 1) {
            if (position > this.wagon_settings.position) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_position_arrival.$element, langView('ficcd_mess_valid_error_position1', App.Langs));
            } else {
                valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_position_arrival.$element, '');
            }
        } else {
            // Проверим позицию
            if (this.wagon_settings.arrival_wagons && this.wagon_settings.arrival_wagons.length > 0) {
                var wagon = this.wagon_settings.arrival_wagons.find(function (o) {
                    return o.position === position;
                });
                if (wagon) {
                    valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_position_arrival.$element, langView('ficcd_mess_valid_error_position2', App.Langs).format(wagon.position, wagon.num));
                } else {
                    valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_position_arrival.$element, '');
                }
            } else {
                // нет списка предъявленных вагонов
            }
        }
        // Проверка ЭПД
        valid = valid & this.validation_epd(true);
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_station_from_name, langView('ficcd_mess_valid_station_from_name', App.Langs), '', langView('ficcd_mess_valid_not_station_from_name', App.Langs), true);
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_station_on_name, langView('ficcd_mess_valid_station_on_name', App.Langs), '', langView('ficcd_mess_valid_not_station_on_name', App.Langs), true);
        // Проверка погран перехода
        valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_stn_border_name, langView('ficcd_mess_valid_border_name', App.Langs), '', true);
        var border_name = this.elements.autocomplete_stn_border_name.text();
        if (border_name !== null && border_name !== '') {
            // Указан погран переход, проверим время
            valid = valid & this.form.validation_common.check_control_datetime_input(this.elements.input_datetime_border_cross_time, langView('ficcd_mess_valid_not_stn_border_cross_time', App.Langs), '', true);
        }
        // грузополучатели и отправители
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_shipper_name, langView('ficcd_mess_valid_shipper_name', App.Langs), '', langView('ficcd_mess_valid_not_shipper_name', App.Langs), true);
        valid = valid & valid & this.form.validation_common.check_control_select_not_null(this.elements.select_consignee_name, langView('ficcd_mess_valid_not_consignee_name', App.Langs), '', true);
        // Грузополучатели на АМКР
        valid = valid & valid & this.form.validation_common.check_control_select_not_null(this.elements.select_station_amkr_name, langView('ficcd_mess_valid_not_station_amkr_name', App.Langs), '', true);
        valid = valid & this.form.validation_common.check_control_autocomplete_is_value_null(this.elements.autocomplete_division_name, langView('ficcd_mess_valid_division_name', App.Langs), '', langView('ficcd_mess_valid_not_division_name', App.Langs), true);
        // Проверка вагона

        // разметка по прибытию
        valid = valid & valid & this.form.validation_common.check_control_select_not_null(this.elements.select_condition_arrival, langView('ficcd_mess_valid_not_condition_arrival', App.Langs), '', true);
        // проверка данных с ЭПД
        valid = valid & valid & this.form.validation_common.checkInputOfRange(this.elements.input_number_gruzp, gruzp_min_value, gruzp_max_value, langView('ficcd_mess_valid_range_gruzp', App.Langs).format(gruzp_min_value, gruzp_max_value), '', true);
        valid = valid & valid & this.form.validation_common.checkInputOfRange(this.elements.input_number_ves_tary_arc, ves_tary_arc_min_value, ves_tary_arc_max_value, langView('ficcd_mess_valid_range_ves_tary', App.Langs).format(ves_tary_arc_min_value, ves_tary_arc_max_value), '', true);
        valid = valid & valid & this.form.validation_common.checkInputOfRange_IsNull(this.elements.input_number_u_tara, u_tara_min_value, u_tara_max_value, langView('ficcd_mess_valid_range_ves_tary', App.Langs).format(u_tara_min_value, u_tara_max_value), '', true);
        // Оплата
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_name_plat, langView('ficcd_mess_valid_name_plat', App.Langs), '', langView('ficcd_mess_valid_not_name_plat', App.Langs), true);
        valid = valid & valid & this.form.validation_common.check_control_input_not_null(this.elements.input_number_distance_way, langView('ficcd_mess_valid_not_distance_way', App.Langs), '', true)
        // Грузы
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_name_etsng, langView('ficcd_mess_valid_name_etsng', App.Langs), '', langView('ficcd_mess_valid_not_name_etsng', App.Langs), true);
        valid = valid & valid & this.form.validation_common.check_control_input_not_null(this.elements.input_text_group_cargo, langView('ficcd_mess_valid_not_group_cargo', App.Langs), '', true)
        if (this.ids_cargo_etsng && this.ids_cargo_etsng.id_group !== null) {
            var res = list_groups_cargo.indexOf(this.ids_cargo_etsng.id_group);
            var ves = this.elements.input_number_vesg.val();
            valid = valid & this.form.validation_common.check_control_condition((res < 1 && ves !== null && ves > 0) || res >= 0, this.elements.input_number_vesg, langView('ficcd_mess_valid_nom_vesg', App.Langs), '', true);
        }
        // Проверим дату 
        if (this.elements.input_datetime_date_adoption_act.val() !== null) {
            // Проверим временные интервалы arrival_sostav_date_arrival <start<120
            var current = moment();
            var date_adoption_act = moment(this.elements.input_datetime_date_adoption_act.val());
            var date_arrival = moment(this.wagon.arrival_sostav_date_arrival);
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_date_adoption_act = current.diff(date_adoption_act, 'minute');
            var minute_date_date_arrival = date_arrival.diff(date_adoption_act, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_date_adoption_act < min_date_adoption_act || minute_date_date_arrival > 0) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_datetime_date_adoption_act.$element, langView('figcd_mess_valid_not_deff_date_detention', App.Langs).format(this.wagon.arrival_sostav_date_arrival, min_date_adoption_act));
            }
        }



        //valid = valid & this.form.validation_common.check_control_datetime_input_null(this.elements.input_datetime_date_outgoing_act, langView('ficcd_mess_valid_date_outgoing_act', App.Langs), '', true);
        //valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_reason_discrepancy_uz, langView('ficcd_mess_valid_reason_discrepancy', App.Langs), '', true);
        //valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_reason_discrepancy_amkr, langView('ficcd_mess_valid_reason_discrepancy', App.Langs), '', true);
        //var date_outgoing_act = this.elements.input_datetime_date_outgoing_act.val();
        //if (date_outgoing_act) {
        //    valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_reason_discrepancy_amkr, langView('ficcd_mess_valid_reason_discrepancy', App.Langs), '', langView('ficcd_mess_valid_not_reason_discrepancy', App.Langs), true);
        //} else {
        //    if (this.elements.autocomplete_reason_discrepancy_amkr.val() > 0 || this.elements.autocomplete_reason_discrepancy_uz.val() > 0) {
        //        valid = valid & this.form.validation_common.check_control_datetime_input(this.elements.input_datetime_date_outgoing_act, langView('ficcd_mess_valid_not_date_outgoing_act', App.Langs), '', true);
        //    }
        //}
        //// Проверим отметку вагонником
        //if (this.wagon && this.wagon.outgoing_car_vagonnik === null) {
        //    this.form.validation_common.set_object_error(this.elements.textarea_condition_present.$element, langView('ficcd_mess_valid_null_condition_present', App.Langs));
        //}
        //// Задержание
        //if (this.detention_edit && (this.elements.autocomplete_cause_detention.text() !== '' || this.elements.input_datetime_detention_start.val() !== null || this.elements.input_datetime_detention_stop.val() !== null)) {
        //    valid = valid & this.validation_wagon_detention();
        //    // Проверка валидация прошла но кнопка не нажата
        //    if (this.detention_edit && valid) {
        //        this.form.validation_detention.out_error_message(langView('ficcd_mess_valid_no_save_detention', App.Langs))
        //        valid = false;
        //    };
        //}

        //// Задержания
        //if (this.current_return_wagons && this.current_return_wagons.date_stop === null) {
        //    valid = valid & this.validation_wagon_return(true);
        //}

        //if (this.elements.checkbox_loaded_car.val() === true) {
        //    valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_loading_devision, langView('ficcd_mess_valid_loading_devision', App.Langs), '', langView('ficcd_mess_valid_not_loading_devision', App.Langs), true);
        //}
        return valid;
    };
    //-----------------------------------------------------------------------------
    //-- Функции обработки ОПЕРАЦИЙ
    //-----------------------------------------------------------------------------
    // Править № основного документа
    form_incoming_cars_detali.prototype.action_change_main_doc = function () {
        //this.elements.input_text_document_nom_main_doc.enable();
        this.mode_epd = 4;
        this.view_wagon_detali(this.wagon);
    };
    // Править № досылочного документа    
    form_incoming_cars_detali.prototype.action_change_doc = function () {

    };
    // Выполнить операцию поиска документа по номеру вагона и дате прибытия
    form_incoming_cars_detali.prototype.action_search_car = function () {
        this.out_clear();
        this.elements.button_search_car.prop("disabled", true); // сделаем не активной
        //var current_mode_epd = this.mode_epd
        var operation = {
            num: this.wagon.num,
            dt_arrival: this.wagon.arrival_sostav_date_arrival,
            add: true,
            search_sms: false, // Поищем позже через кнопку
        };
        // Вопрос по использованию СМС
        this.modal_confirm_form.view(langView('fogcd_form_search_epd', App.Langs), langView('fogcd_form_search_car_uz_epd_message', App.Langs), function (res) {
            if (res) {
                operation.search_sms = true;
            };
            LockScreen(langView('ficcd_mess_run_operation_searsh_doc_of_num_dt', App.Langs).format(this.wagon.num, this.wagon.arrival_sostav_date_arrival));
            this.ids_wsd.postOperationUpdateUZ_DOC_Num_DT(operation, function (result) {
                if (result && result.obj) {
                    this.ids_wsd.postOTPR_UZ_DOCOfXML(result.obj.xml_doc, function (main_otpr) {
                        if (!main_otpr) {
                            this.out_warning(langView('ficcd_mess_warning_no_epd_wagon', App.Langs));
                        }
                        this.mode_epd = main_otpr ? 0 : 4; // Режим ЭПД
                        this.wagon_settings.main_otpr_num = main_otpr ? main_otpr.nom_doc : null;
                        this.wagon_settings.main_otpr = main_otpr;
                        this.wagon_settings.main_otpr_id = result.obj.num_doc;
                        this.wagon_settings.otpr_num = null;    // обнуляем досылочный номер
                        this.wagon_settings.otpr = null;        // обнуляем досылочный

                        // уточним информацию по основному документу если это досылка
                        this.update_wagon_of_main_epd(function (main_otpr) {
                            this.update_wagon_of_epd(function () {
                                this.view_wagon_detali(this.wagon);
                                this.elements.button_search_car.prop("disabled", false); // сделаем активной
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                } else {
                    // Иногда нет данных, сообщаем!
                    this.mode_epd = 4; // Режим ЭПД
                    this.out_warning(langView('ficcd_mess_warning_no_epd_wagon', App.Langs));
                    this.wagon_settings.main_otpr = null;
                    this.update_wagon_of_epd(function () {
                        this.view_wagon_detali(this.wagon);
                        this.elements.button_search_car.prop("disabled", false); // сделаем активной
                    }.bind(this));
                }
            }.bind(this));
        }.bind(this));
    };
    // Выполнить операцию поиска основного документа
    form_incoming_cars_detali.prototype.action_search_main_doc = function () {
        this.out_clear();
        var valid = true;
        valid = valid & this.form.validation_common.check_control_input_not_null(this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_not_nom_main_doc', App.Langs), '', false)
        if (valid) {
            //var dd = isNaN(Number(this.elements.input_text_document_nom_main_doc.val()));
            valid = valid & this.form.validation_common.check_control_condition(!isNaN(Number(this.elements.input_text_document_nom_main_doc.val())), this.elements.input_text_document_nom_main_doc, langView('ficcd_mess_valid_not_number_nom_main_doc', App.Langs), '', false);
        }
        if (valid) {
            this.elements.button_search_main_doc.prop("disabled", true); // сделаем не активной
            this.wagon_settings.main_otpr_num = Number(this.elements.input_text_document_nom_main_doc.val());
            // Выполнить операцию
            LockScreen(langView('ficcd_mess_run_operation_searsh_main_doc', App.Langs).format(this.elements.input_text_document_nom_main_doc.val(), this.wagon.num));
            // Получим ЭПД по основной накладной № накладной
            var current_mode_epd = this.mode_epd
            var operation = {
                num_doc: this.elements.input_text_document_nom_main_doc.val(),
                num: this.wagon.num,
                add: true,
                search_sms: true, // Поищем позже через кнопку
            };
            this.ids_wsd.postOperationUpdateUZ_DOC_Doc_Num(operation, function (result) {
                if (result && result.obj) {
                    this.ids_wsd.postOTPR_UZ_DOCOfXML(result.obj.xml_doc, function (main_otpr) {
                        //main_otpr = null; //TODO: !!!!! тест убрать
                        if (!main_otpr) {
                            this.out_warning(langView('ficcd_mess_warning_no_main_epd_wagon', App.Langs));
                        }
                        this.mode_epd = main_otpr ? 0 : (current_mode_epd == 4 ? 5 : (current_mode_epd == 2 ? 3 : current_mode_epd)); // Режим ЭПД
                        this.wagon_settings.main_otpr = main_otpr;    // и переопределяем основной даже если он не считан будет нуль
                        this.wagon_settings.main_otpr_id = result.obj.num_doc;
                        this.update_wagon_of_epd(function () {
                            this.view_wagon_detali(this.wagon);
                            this.elements.button_search_main_doc.prop("disabled", false); // сделаем активной
                        }.bind(this));
                    }.bind(this));
                } else {
                    // Иногда нет данных, сообщаем!
                    this.mode_epd = (current_mode_epd == 4 ? 5 : (current_mode_epd == 2 ? 3 : current_mode_epd)); // Режим ЭПД
                    this.out_warning(langView('ficcd_mess_warning_no_main_epd_wagon', App.Langs));
                    this.wagon_settings.main_otpr = null;
                    this.update_wagon_of_epd(function () {
                        this.view_wagon_detali(this.wagon);
                        this.elements.button_search_main_doc.prop("disabled", false); // сделаем активной
                    }.bind(this));
                }
            }.bind(this));
        }
    };
    // Выполнить операцию добавить станцию отправления
    form_incoming_cars_detali.prototype.action_add_station_from = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_ext_station_ids', App.Langs).format(this.elements.autocomplete_station_from_name.text(), this.elements.input_number_code_stn_from.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_ext_station(this.elements.input_number_code_stn_from.val(), this.elements.autocomplete_station_from_name.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
                        //
                        this.update_db(['external_station'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_station_from();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию добавить станцию прибытия
    form_incoming_cars_detali.prototype.action_add_station_on = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_ext_station_ids', App.Langs).format(this.elements.autocomplete_station_from_name.text(), this.elements.input_number_code_stn_from.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_ext_station(this.elements.input_number_code_stn_on.val(), this.elements.autocomplete_station_on_name.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
                        // Обновим справочник
                        this.update_db(['external_station'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_station_on();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_ext_station', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию добавить станцию прибытия
    form_incoming_cars_detali.prototype.action_add_border_checkpoint = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_border_checkpoint_ids', App.Langs).format(this.elements.autocomplete_stn_border_name.text(), this.elements.input_number_stn_border.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_border_checkpoint', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_border_checkpoint(this.elements.input_number_stn_border.val(), this.elements.autocomplete_stn_border_name.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_border_checkpoint', App.Langs)));
                        // Обновим справочник
                        this.update_db(['border_checkpoint'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_border_crossing();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_border_checkpoint', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_border_checkpoint', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию добавить грузоотправителя
    form_incoming_cars_detali.prototype.action_add_shipper = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_shipper_ids', App.Langs).format(this.elements.autocomplete_shipper_name.text(), this.elements.input_number_shipper_code.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_shipper', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_shipper(this.elements.input_number_shipper_code.val(), this.elements.autocomplete_shipper_name.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_shipper', App.Langs)));
                        // Обновим справочник
                        this.update_db(['shipper'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_shipper();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_shipper', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_shipper', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию добавить Платильщика по отправке
    form_incoming_cars_detali.prototype.action_add_payer_sender = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_payer_sender_ids', App.Langs).format(this.elements.autocomplete_name_plat.text(), this.elements.input_text_kod_plat.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_payer_sender', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_payer_sender(this.elements.input_text_kod_plat.val(), this.elements.autocomplete_name_plat.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_payer_sender', App.Langs)));
                        // Обновим справочник
                        this.update_db(['payer_sender'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_payer_sender();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_payer_sender', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_payer_sender', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию добавить Груз ЕТ СНГ
    form_incoming_cars_detali.prototype.action_add_cargo_etsng = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_cargo_etsng_ids', App.Langs).format(this.elements.autocomplete_name_etsng.text(), this.elements.input_number_kod_etsng.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_etsng', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_cargo_etsng(this.elements.input_number_kod_etsng.val(), this.elements.autocomplete_name_etsng.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_etsng', App.Langs)));
                        // Обновим справочник
                        this.update_db(['cargo_etsng'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_cargo_etsng();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_etsng', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_etsng', App.Langs)));
            }.bind(this),
        });
    };
    // Выполнить операцию добавить Груз ГНГ
    form_incoming_cars_detali.prototype.action_add_cargo_gng = function () {
        this.out_clear();
        this.modal_confirm_form.action_view({
            form_name: langView('ficcd_form_add_db_ids', App.Langs),
            form_message: langView('ficcd_form_message_add_cargo_gng_ids', App.Langs).format(this.elements.autocomplete_name_gng.text(), this.elements.input_number_kod_gng.val()),
            message_operation: langView('ficcd_mess_run_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_gng', App.Langs)),
            fn_run: function () {
                // Выполнить операцию
                this.add_ids_cargo_gng(this.elements.input_number_kod_gng.val(), this.elements.autocomplete_name_gng.text(),
                    function (result) {
                        // Ок
                        this.out_info(langView('ficcd_mess_ok_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_gng', App.Langs)));
                        // Обновим справочник
                        this.update_db(['cargo_gng'], function (result) {
                            // отобразим информацию
                            this.view_wagon_detali_cargo_gng();
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this),
                    function (result) {
                        // Ошибка
                        this.out_error(langView('ficcd_mess_error_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_gng', App.Langs)));
                        LockScreenOff();
                    }.bind(this))
            }.bind(this),
            fn_cancel: function () {
                // Отмена выполнения операции
                this.out_warning(langView('ficcd_mess_cancel_add_db_ids', App.Langs).format(langView('ficcd_title_cargo_gng', App.Langs)));
            }.bind(this),
        });
    };
    // Добавить САП
    form_incoming_cars_detali.prototype.action_add_incoming_supply = function () {
        this.out_clear();
        LockScreen(langView('ficcd_mess_update_sap', App.Langs));
        if (this.wagon && this.wagon_settings && this.wagon_settings.type === 1) {
            // выбран вагон и режим переноса в левую сторону
            var nom_main_doc = this.elements.input_text_document_nom_main_doc.val();
            if (nom_main_doc !== null && nom_main_doc !== '') {
                // Подготовим операцию
                var operation_update = {
                    id_arrival_car: this.wagon.arrival_car_id,
                    num: this.wagon.num,
                    doc_uz: nom_main_doc,
                    date_doc_uz: null,
                    code_border_checkpoint: this.epd.route.joint_stn ? this.epd.route.joint_stn : null,
                    name_border_checkpoint: this.epd.route.joint_stn_name ? this.epd.route.joint_stn_name : null,
                    cross_time: this.epd.route.joint_cross_time ? this.epd.route.joint_cross_time : null,
                    add: true,
                    user: App.User_Name,
                };
                // Выполним операцию
                this.ids_wsd.postOperationUpdateSAPIncomingSupply(operation_update, function (sap) {
                    if (sap) {
                        this.view_wagon_detali_sap();
                        this.form.validation_sap.out_info_message(langView('ficcd_mess_ok_operation_update_sap', App.Langs));
                    } else {
                        // Ошибка выполнения
                        this.form.validation_sap.out_error_message(langView('ficcd_mess_error_operation_update_sap', App.Langs));
                        LockScreenOff();
                    }
                    LockScreenOff();
                }.bind(this));
            } else {
                this.form.validation_sap.out_error_message(langView('ficcd_mess_valid_not_nom_main_doc', App.Langs));
                LockScreenOff();
            }
        }
    };
    // Выполнить принять вагон (перенос в левую сторону)
    form_incoming_cars_detali.prototype.action_arrival_wagon = function () {
        this.elements.button_arrival_car.prop("disabled", true); // сделаем не активной
        // Выполнить операцию
        LockScreen(langView('ficcd_mess_run_operation_arrival_wagon', App.Langs).format(this.wagon.num));
        this.ids_wsd.getViewIncomingCarsOfIDCar(this.id, function (wagon) {
            if (wagon) {
                if (!wagon.arrival_car_arrival) {
                    var valid = this.validation_wagon_detali();
                    if (valid) {
                        var num = wagon.num;
                        var mode = null;
                        // Если не выбра режим
                        if (this.elements.checkbox_not_epd.val() === false) {
                            switch (this.mode_epd) {
                                case 0: {
                                    mode = 0;
                                    break;
                                };
                                case 5: {
                                    this.wagon_settings.main_otpr_num = Number(this.elements.input_text_document_nom_main_doc.val());
                                    this.wagon_settings.otpr_num = Number(this.elements.input_text_document_nom_doc.val());
                                    var md_en = this.elements.input_text_document_nom_main_doc.$element.prop("disabled");
                                    var d_en = this.elements.input_text_document_nom_doc.$element.prop("disabled");
                                    this.wagon_settings.main_otpr = null;
                                    this.wagon_settings.main_otpr_id = null;
                                    this.wagon_settings.otpr = null;
                                    this.wagon_settings.otpr_id = null;
                                    mode = 1;
                                    break;
                                };
                                default: {
                                    if (this.wagon_settings.main_otpr_num && this.wagon_settings.main_otpr) {
                                        // 0, 2
                                        if (this.wagon_settings.otpr_num && this.wagon_settings.otpr) {
                                            mode = 0;
                                        } else {
                                            mode = 2;
                                        }
                                    } else {
                                        // 1, 3
                                        if (this.wagon_settings.otpr_num && this.wagon_settings.otpr) {
                                            mode = 3;
                                        } else {
                                            mode = 1;
                                        }
                                    };
                                    break;
                                }
                            }
                        };
                        // Основной документ
                        var arrival_main_doc = {
                            id_doc: this.wagon_settings.main_otpr_id,
                            nom_doc: this.wagon_settings.main_otpr_num,
                            epd_code_from: this.elements.input_number_shipper_code.val(),
                            epd_code_on: this.elements.input_number_consignee_code.val(),
                            code_stn_from: this.elements.input_number_code_stn_from.val(),
                            code_stn_to: this.elements.input_number_code_stn_on.val(),
                            code_border_checkpoint: this.elements.input_number_stn_border.val(),
                            cross_time: this.elements.input_datetime_border_cross_time.val(),
                            code_shipper: this.elements.input_number_shipper_code.val(),
                            code_consignee: this.elements.input_number_consignee_code.val(),
                            klient: Number(this.elements.input_number_consignee_code.val()) === 7932 ? false : true,
                            code_payer_sender: this.elements.input_text_kod_plat.val(),
                            code_payer_arrival: null,
                            distance_way: this.elements.input_number_distance_way.val(),
                            note: null,//this.elements.textarea_wagon_note.val(),
                            doc_pays: this.epd.main_doc_pay,
                            doc_acts: this.epd.main_doc_acts,
                            doc_docs: this.epd.main_doc_docs
                        };
                        //
                        var id_cargo = this.ids_cargo_etsng && this.ids_cargo_etsng.id_cargo !== null ? this.ids_cargo_etsng.id_cargo : null;
                        var id_cargo_gng = this.ids_cargo_gng && this.ids_cargo_gng.id !== null ? this.ids_cargo_gng.id : null;
                        var u_tara = this.elements.input_number_u_tara.val();
                        var ves_tary_arc = this.elements.input_number_ves_tary_arc.val();
                        var vesg = this.elements.input_number_vesg.val(); // Получим текущий вес груза
                        var vesg_reweighing = this.elements.input_number_vesg_reweighing.val();// Получим перевеску вес груза
                        var id_station_amkr = this.elements.select_station_amkr_name.getNumber();// Получим станцию назначения
                        var pay_summa = this.elements.input_number_vagon_pay_v_summa.val();
                        // Добавим контейнерам груз
                        if (this.epd.main_doc_conts && this.epd.main_doc_conts.length > 0) {
                            for (var c = 0; c < this.epd.main_doc_conts.length; c++) {
                                this.epd.main_doc_conts[c].id_cargo = id_cargo;
                                this.epd.main_doc_conts[c].id_cargo_gng = id_cargo_gng;
                            };
                        }
                        // Вагон, основной документ
                        var arrival_vagon_main_doc = {
                            num: this.elements.input_number_num_car.val(),
                            id_arrival: wagon.arrival_sostav_id,
                            id_car: wagon.arrival_car_id,
                            id_condition: this.elements.select_condition_arrival.getNumberNull(),
                            id_type: this.elements.select_type_wagon.getNumberNull(),
                            gruzp: this.elements.input_number_gruzp.val(),
                            u_tara: u_tara ? Number(u_tara * 1000) : null,
                            ves_tary_arc: ves_tary_arc ? Number(ves_tary_arc * 1000) : null,
                            route: this.elements.checkbox_route_flag.val(),
                            note_vagon: this.elements.textarea_wagon_note.val(),
                            id_cargo: id_cargo,
                            id_cargo_gng: id_cargo_gng,
                            id_certification_data: this.elements.select_certificate_data.getNumberNull(),
                            id_commercial_condition: this.elements.select_commercial_condition.getNumberNull(),
                            kol_pac: this.elements.input_number_kol_pac.val(),
                            pac: this.epd.cargo && this.epd.cargo.pac ? this.epd.cargo.pac : null,
                            vesg: vesg ? Number(vesg * 1000) : null,
                            vesg_reweighing: vesg_reweighing ? Number(vesg_reweighing * 1000) : null,
                            nom_zpu: this.elements.input_text_nom_zpu.val(),
                            danger: this.elements.input_text_danger_class.val(),
                            danger_kod: this.elements.input_text_danger_kod.val(),
                            cargo_returns: null,
                            id_station_on_amkr: id_station_amkr > 0 ? id_station_amkr : null,
                            id_division_on_amkr: this.ids_divisions && this.ids_divisions.id !== null ? this.ids_divisions.id : null,
                            empty_car: id_station_amkr === 0 ? true : null,
                            kol_conductor: this.epd.vagon && this.epd.vagon.kol_conductor ? this.epd.vagon.kol_conductor : null,
                            id_owner: this.ids_owner && this.ids_owner.id !== null ? this.ids_owner.id : 0,
                            id_countrys: this.ids_countrys && this.ids_countrys.id ? this.ids_countrys.id : 0,
                            id_genus: this.ids_genus_wagons && this.ids_genus_wagons.id ? this.ids_genus_wagons.id : 0,
                            kol_os: this.elements.input_number_kol_os.val(),
                            usl_tip: this.elements.input_text_usl_tip.val(),
                            date_rem_uz: this.elements.input_datetime_date_rem_uz.val(),
                            date_rem_vag: this.elements.input_datetime_date_rem_vag.val(),
                            id_type_ownership: this.elements.select_type_ownership.getNumberNull(),
                            gruzp_uz: this.elements.input_number_gruzp_uz.val(),
                            tara_uz: this.elements.input_number_tara_uz.val(),
                            zayava: this.elements.textarea_cargo_analysis.val(),
                            pay_summa: pay_summa ? Number(pay_summa * 100) : null,
                            conts: this.epd.main_doc_conts,
                            pays: this.epd.main_doc_vagon_pay,
                            acts: this.epd.main_doc_vagon_acts,
                        };
                        //---------------------------------------------------------------
                        var arrival_doc = null;         // Досылочный документ 
                        var arrival_vagon_doc = null;   // Вагон, досылочный документ
                        if (mode !== null && this.wagon_settings.otpr_num > 0) {
                            // Досылочный документ
                            arrival_doc = {
                                id_doc: this.wagon_settings.otpr_id,
                                nom_doc: this.wagon_settings.otpr_num,
                                epd_code_from: this.elements.input_number_shipper_code.val(),
                                epd_code_on: this.elements.input_number_consignee_code.val(),
                                code_stn_from: this.elements.input_number_code_stn_from.val(),
                                code_stn_to: this.elements.input_number_code_stn_on.val(),
                                code_border_checkpoint: this.elements.input_number_stn_border.val(),
                                cross_time: this.elements.input_datetime_border_cross_time.val(),
                                code_shipper: this.elements.input_number_shipper_code.val(),
                                code_consignee: this.elements.input_number_consignee_code.val(),
                                klient: Number(this.elements.input_number_consignee_code.val()) === 7932 ? false : true,
                                code_payer_sender: this.elements.input_text_kod_plat.val(),
                                code_payer_arrival: null,
                                distance_way: this.elements.input_number_distance_way.val(),
                                note: this.elements.textarea_wagon_note.val(),
                                doc_pays: this.epd.doc_pay,
                                doc_acts: this.epd.doc_acts,
                                doc_docs: this.epd.doc_docs
                            };
                            // Вагон, досылочный документ
                            arrival_vagon_doc = {
                                num: this.elements.input_number_num_car.val(),
                                id_arrival: wagon.arrival_sostav_id,
                                id_car: wagon.arrival_car_id,
                                id_condition: this.elements.select_condition_arrival.getNumberNull(),
                                id_type: this.elements.select_type_wagon.getNumberNull(),
                                gruzp: this.elements.input_number_gruzp.val(),
                                u_tara: u_tara ? Number(u_tara * 1000) : null,
                                ves_tary_arc: ves_tary_arc ? Number(ves_tary_arc * 1000) : null,
                                route: this.elements.checkbox_route_flag.val(),
                                note_vagon: this.elements.textarea_wagon_note.val(),
                                id_cargo: id_cargo,
                                id_cargo_gng: id_cargo_gng,
                                id_certification_data: this.elements.select_certificate_data.getNumberNull(),
                                id_commercial_condition: this.elements.select_commercial_condition.getNumberNull(),
                                kol_pac: this.elements.input_number_kol_pac.val(),
                                pac: this.epd.cargo && this.epd.cargo.pac ? this.epd.cargo.pac : null,
                                vesg: vesg ? Number(vesg * 1000) : null,
                                vesg_reweighing: vesg_reweighing ? Number(vesg_reweighing * 1000) : null,
                                nom_zpu: this.elements.input_text_nom_zpu.val(),
                                danger: this.elements.input_text_danger_class.val(),
                                danger_kod: this.elements.input_text_danger_kod.val(),
                                cargo_returns: null,
                                id_station_on_amkr: id_station_amkr > 0 ? id_station_amkr : null,
                                id_division_on_amkr: this.ids_divisions && this.ids_divisions.id !== null ? this.ids_divisions.id : null,
                                empty_car: id_station_amkr === 0 ? true : null,
                                kol_conductor: this.epd.vagon && this.epd.vagon.kol_conductor ? this.epd.vagon.kol_conductor : null,
                                id_owner: this.ids_owner && this.ids_owner.id !== null ? this.ids_owner.id : 0,
                                id_countrys: this.ids_countrys && this.ids_countrys.id !== null ? this.ids_countrys.id : 0,
                                id_genus: this.ids_genus_wagons && this.ids_genus_wagons.id !== null ? this.ids_genus_wagons.id : 0,
                                kol_os: this.elements.input_number_kol_os.val(),
                                usl_tip: this.elements.input_text_usl_tip.val(),
                                date_rem_uz: this.elements.input_datetime_date_rem_uz.val(),
                                date_rem_vag: this.elements.input_datetime_date_rem_vag.val(),
                                id_type_ownership: this.elements.select_type_ownership.getNumberNull(),
                                gruzp_uz: this.elements.input_number_gruzp_uz.val(),
                                tara_uz: this.elements.input_number_tara_uz.val(),
                                zayava: this.elements.textarea_cargo_analysis.val(),
                                pay_summa: pay_summa ? Number(pay_summa * 100) : null,
                                conts: this.epd.doc_conts,
                                pays: this.epd.doc_vagon_pay,
                                acts: this.epd.doc_vagon_acts,
                            };
                        }
                        //------------------------------------------------------------------
                        // Подготовим операцию
                        var operation = {
                            id_arrival_car: wagon.arrival_car_id,
                            position: this.elements.input_number_position_arrival.val(),
                            date_adoption_act: this.elements.input_datetime_date_adoption_act.val(),
                            mode: mode,
                            arrival_main_doc: arrival_main_doc,
                            arrival_doc: arrival_doc,
                            arrival_vagon_main_doc: arrival_vagon_main_doc,
                            arrival_vagon_doc: arrival_vagon_doc,
                            user: App.User_Name,
                        };
                        // Выполним предъявить
                        this.ids_wsd.postOperationIncomingWagon(operation, function (result_operation) {
                            //Обновим данные полностью
                            if (typeof this.settings.fn_update === 'function') {
                                this.clear_out_validation(); // очистить все сообщения
                                this.settings.fn_update(function () {
                                    if (result_operation > 0) {
                                        this.form.validation_common.out_info_message(langView('ficcd_mess_ok_operation_arrival_wagon', App.Langs).format(num));
                                    } else {
                                        // Ошибка выполнения
                                        this.form.validation_common.out_error_message(langView('ficcd_mess_error_arrival_wagon', App.Langs).format(num, result_operation));
                                    };
                                    this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
                                }.bind(this));
                            };
                        }.bind(this));
                        this.elements.button_arrival_car.prop("disabled", false); // !!! убрать сделаем активной
                    } else {
                        LockScreenOff();
                        this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
                    }
                } else {
                    this.out_error(langView('ficcd_mess_error_wagon_arrival', App.Langs).format(wagon.num, wagon.arrival_car_arrival, wagon.arrival_car_arrival_user));
                    LockScreenOff();
                    this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
                }
            } else {
                this.out_error(langView('ficcd_mess_warning_no_data_wagon_ids', App.Langs).format(this.id));
                LockScreenOff();
                this.elements.button_arrival_car.prop("disabled", false); // сделаем активной
            }
        }.bind(this));
    };
    // Отменить принятие (вернуть в правую сторону)
    form_incoming_cars_detali.prototype.action_return_wagon = function () {
        this.elements.button_return_car.prop("disabled", true); // сделаем не активной
        this.ids_wsd.getViewIncomingCarsOfIDCar(this.id, function (wagon) {
            if (wagon) {
                if (wagon.arrival_car_arrival && wagon.arrival_sostav_status === 1) {
                    var num = wagon.num;
                    this.modal_confirm_form.view(langView('ficcd_form_return_arrival_car', App.Langs), langView('ficcd_form_return_message_arrival_car', App.Langs).format(wagon ? wagon.num : null), function (res) {
                        if (res) {
                            // Выполнить операцию
                            LockScreen(langView('ficcd_mess_run_operation_return_arrival_wagon', App.Langs).format(wagon.num));
                            // Подготовим операцию

                            var operation_return = {
                                arrival_car_id: wagon.arrival_car_id,
                                user: App.User_Name,
                            };
                            // Выполним предъявить
                            this.ids_wsd.postOutgoingReturnIncomingWagon(operation_return, function (result_operation) {
                                //Обновим данные полностью
                                if (typeof this.settings.fn_update === 'function') {
                                    this.clear_out_validation(); // очистить все сообщения
                                    this.settings.fn_update(function () {
                                        if (result_operation > 0) {
                                            this.form.validation_common.out_info_message(langView('ficcd_mess_ok_operation_return_arrival_wagon', App.Langs).format(num));
                                        } else {
                                            // Ошибка выполнения
                                            this.form.validation_common.out_error_message(langView('ficcd_mess_error_operation_return_arrival_wagon', App.Langs).format(num, result_operation));
                                        };
                                        this.elements.button_return_car.prop("disabled", false); // сделаем активной
                                    }.bind(this));
                                };
                            }.bind(this));
                        } else {
                            // Отмена операции
                            this.clear_out_validation(); // очистить все сообщения
                            this.form.validation_common.out_warning_message(langView('ficcd_mess_cancel_operation_return_arrival_wagon', App.Langs).format(num))
                            this.elements.button_return_car.prop("disabled", false); // сделаем активной
                        }
                    }.bind(this));
                } else {
                    this.out_error(langView('ficcd_mess_error_wagon_arrival', App.Langs).format(wagon.num, wagon.arrival_car_arrival, wagon.arrival_sostav_status));
                    LockScreenOff();
                    this.elements.button_return_car.prop("disabled", false); // сделаем активной
                }
            } else {
                this.out_error(langView('ficcd_mess_warning_no_data_wagon_ids', App.Langs).format(this.id));
                LockScreenOff();
                this.elements.button_return_car.prop("disabled", false); // сделаем активной
            }
        }.bind(this));
    };
    //-----------------------------------------------------------------------------
    //-- Функции отображения информации на форме
    //-----------------------------------------------------------------------------
    // Очистить сообщения об ошибках
    form_incoming_cars_detali.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    };
    // Показать сообщение ошибки
    form_incoming_cars_detali.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать сообщение предупреждения
    form_incoming_cars_detali.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    form_incoming_cars_detali.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //-----------------------------------------------------------------------------
    //-- Функции для уничтожения объектов
    //-----------------------------------------------------------------------------
    // Удалить объект
    form_incoming_cars_detali.destroy = function () {
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        if (this.table_epd_docs) {
            this.table_epd_docs.destroy();
            this.table_epd_docs = null;
        }
        if (this.table_epd_acts) {
            this.table_epd_acts.destroy();
            this.table_epd_acts = null;
        }
        if (this.table_epd_acts_wagon) {
            this.table_epd_acts_wagon.destroy();
            this.table_epd_acts_wagon = null;
        }
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        this.$form_incoming_cars.empty();
        LockScreenOff();
    };
    //-----------------------------------------------------------------------------
    App.form_incoming_cars_detali = form_incoming_cars_detali;

    window.App = App;

})(window);