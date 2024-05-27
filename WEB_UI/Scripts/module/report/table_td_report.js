/*Модуль библиотека таблиц для отчета ТД*/
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
            'ttdr_field_numeration': '№ п.п.',

            'ttdr_field_adoption_sostav_station': 'ПРИБЫТИЕ',
            'ttdr_field_adoption_count_wagon': 'Всего вагонов',
            'ttdr_field_adoption_sostav_count_return_wagon': 'Возврат',
            'ttdr_field_adoption_count_account_balance': 'Учетные вагоны',
            'ttdr_field_adoption_count_not_operator': 'Без оператора',

            'ttdr_field_outgoing_sostav_station': 'ОТПРАВЛЕНИЕ',
            'ttdr_field_outgoing_sostav_count_wagon': 'Всего вагонов',
            'ttdr_field_outgoing_sostav_count_return_wagon': 'Вернуло УЗ',
            'ttdr_field_outgoing_sostav_account_balance': 'Учетные вагоны',

            'ttdr_field_adoption_sostav_detali_num_doc': '№ ведомости',
            'ttdr_field_adoption_sostav_detali_date_adoption': 'Дата приема',
            'ttdr_field_adoption_sostav_detali_count_wagon': 'кол-во',
            'ttdr_field_adoption_sostav_detali_count_account_balance': 'Уч. ваг.',
            'ttdr_field_adoption_sostav_detali_count_not_operator': 'Без опер.',

            'ttdr_field_outgoing_sostav_detali_num_doc': '№ ведомости',
            'ttdr_field_outgoing_sostav_detali_date_outgoing': 'Дата сдачи',
            'ttdr_field_outgoing_sostav_detali_count_wagon': 'кол-во',
            'ttdr_field_outgoing_sostav_detali_count_account_balance': 'Уч. ваг.',

            'ttdr_field_incoming_cars_id': 'id вагона',
            'ttdr_field_incoming_cars_arrival_sostav_num_doc': '№ ведомости прибытия',
            'ttdr_field_incoming_cars_position_arrival': '№ поз.',
            'ttdr_field_num': '№ вагона',
            'ttdr_field_incoming_cars_uz_document_nom_doc': '№ дос. накл.',
            'ttdr_field_incoming_cars_uz_document_nom_main_doc': '№ осн. накл.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_adm': 'Код Адм.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_adm_name': 'Адм.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_adm_abbr': 'Адм.',
            'ttdr_field_incoming_cars_uz_vagon_rod': 'Код Род.',
            'ttdr_field_incoming_cars_uz_vagon_rod_name': 'Род.',
            'ttdr_field_incoming_cars_uz_vagon_rod_abbr': 'Род.',
            'ttdr_field_incoming_cars_uz_vagon_gruzp': 'ГП,т.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_kol_os': 'Кол.ос.',
            'ttdr_field_incoming_cars_uz_vagon_wagon_usl_tip': 'Тип цс',
            'ttdr_field_incoming_cars_uz_vagon_u_tara': 'Тара (ут.),т.',
            'ttdr_field_incoming_cars_uz_vagon_ves_tary_arc': 'Тара,т.',
            'ttdr_field_incoming_cars_arrival_uz_vagon_route': 'Маршрут',
            'ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_uz': 'Рем. УЗ',
            'ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_vag': 'Рем. вагон',
            'ttdr_field_incoming_cars_uz_vagon_owner_wagon': 'Собственник',
            'ttdr_field_incoming_cars_uz_vagon_owner_wagon_abbr': 'Собственник',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_operator': 'id Опер. по отправке',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operators': 'Оператор по АМКР ПРИБ',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_abbr': 'Оператор по АМКР ПРИБ',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_start': 'Опер. по АМКР. нач. аренды',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_end': 'Опер. по АМКР. кон. аренды',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_paid': 'Опер. по АМКР. платный',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_limiting': 'id Огран. ПОГР',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_name': 'Огран. ПОГР',
            'ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_abbr': 'Огран. ПОГР',

            'ttdr_field_current_wagons_rent_operators': 'Оператор по АМКР ТЕКУЩ',
            'ttdr_field_current_wagons_rent_operator_abbr': 'Оператор по АМКР ТЕКУЩ',

            'ttdr_field_incoming_cars_uz_vagon_condition_name': 'Разм. ПРИБ',
            'ttdr_field_incoming_cars_uz_vagon_condition_abbr': 'Разм. по приб.',
            'ttdr_field_current_condition_name': 'Разм текущ.',
            'ttdr_field_current_condition_abbr': 'Разм текущ.',

            'ttdr_field_incoming_cars_uz_document_code_stn_from': 'Код ст. отпр.',
            'ttdr_field_incoming_cars_uz_document_station_from_name': 'Cт. отпр.',
            'ttdr_field_incoming_cars_uz_document_code_stn_to': 'Код ст. приб.',
            'ttdr_field_incoming_cars_uz_document_station_to_name': 'Cт. приб.',
            'ttdr_field_incoming_cars_uz_document_code_border_checkpoint': 'Код погр. пер.',
            'ttdr_field_incoming_cars_uz_document_border_checkpoint_station_name': 'Погр. пер.',
            'ttdr_field_incoming_cars_uz_document_cross_time': 'Врем. погр. пер.',
            'ttdr_field_incoming_cars_uz_document_code_shipper': 'Код гр. отпр.',
            'ttdr_field_incoming_cars_uz_document_shipper_name': 'Гр. отпр.',
            'ttdr_field_incoming_cars_uz_document_code_consignee': 'Код. гр. пол.',
            'ttdr_field_incoming_cars_uz_document_name_consignee': 'Гр. пол.',
            'ttdr_field_incoming_cars_uz_document_code_payer_sender': 'Код плат. ПРИБ.(по отправке).',
            'ttdr_field_incoming_cars_uz_document_payer_sender_name': 'Пл. отпр.',
            'ttdr_field_incoming_cars_uz_document_distance_way': 'Тар. расс.',
            'ttdr_field_incoming_cars_uz_vagon_vesg': 'Вес ЭПД, тн.',
            'ttdr_field_incoming_cars_uz_vagon_cargo_name': 'Груз ПРИБ',
            'ttdr_field_incoming_cars_uz_vagon_cargo_group_name': 'Группа груза',
            'ttdr_field_incoming_cars_uz_vagon_station_amkr_name': 'Следует на ст.АМКР',
            'ttdr_field_incoming_cars_uz_vagon_station_amkr_abbr': 'Следует на ст.АМКР',
            'ttdr_field_current_station_amkr_name': 'Текущая станция',
            'ttdr_field_current_station_amkr_abbr': 'Текущая станция',
            'ttdr_field_current_way_and_outer_way_name': 'Ж.д. путь(перегон)',
            'ttdr_field_current_way_and_outer_way_name': 'Ж.д. путь(перегон)',
            'ttdr_field_current_outer_way_name': 'Перегон',


            'ttdr_field_incoming_cars_uz_vagon_division_code': 'Шифр Цеха',
            'ttdr_field_incoming_cars_uz_vagon_name_division': 'Цех получатель',
            'ttdr_field_incoming_cars_uz_vagon_division_abbr': 'Цех получатель',
            'ttdr_field_incoming_cars_uz_vagon_commercial_condition': 'Ком состояние',
            'ttdr_field_incoming_cars_uz_vagon_sertification_data': 'Серт. данные',
            'ttdr_field_incoming_cars_arrival_sostav_station_on_name': 'Станц. примыкания',
            'ttdr_field_incoming_cars_arrival_sostav_station_on_abbr': 'Станц. примыкания',

            'ttdr_field_old_outgoing_uz_vagon_cargo_name': 'Груз по ОТПР предыдущий',
            'ttdr_field_old_date_outgoing': 'Дата последней сдачи',
            'ttdr_field_old_outgoing_uz_document_station_to_name': 'Станция ОТПР предыдущая',

            'ttdr_field_outgoing_cars_car_position_outgoing': '№ поз.',
            'ttdr_field_outgoing_cars_uz_document_nom_doc': '№ накл.',

            'ttdr_field_outgoing_cars_outgoing_uz_vagon_wagon_adm': 'Код Адм.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_name': 'Адм.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_abbr': 'Адм.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_rod': 'Код Род.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_name': 'Род.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_abbr': 'Род.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_division_code': 'Шифр Цех',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_name_division': 'Цех погр.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_division_abbr': 'Цех погр.',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon': 'Собственник',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr': 'Собственник',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator': 'id Опер. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators': 'Оператор по АМКР ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr': 'Оператор по АМКР ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start': 'Опер. по отпр. нач. аренды',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end': 'Опер. по отпр. кон. аренды',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid': 'Опер. по отпр. платный',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting': 'id Огран. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name': 'Огран. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr': 'Огран. по отправке',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_id_cargo': 'id Груз ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_name': 'Груз ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_id_group': 'id Группы груза ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_group_name': 'Группа ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_id_out_group': 'id Группа ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_out_group_name': 'Группа ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_id_cargo_etsng': '(ЭПД) id ЕТСНГ ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_etsng_code': '(ЭПД) Код Груз ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_etsng_name': '(ЭПД) Груз ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_id_cargo_gng': 'id ГНГ ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_gng_code': 'Код Груз ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_gng_name': 'Груз ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_vesg': '(ЭПД) Вес нетто ОТПР, тн',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_u_tara': '(ЭПД) Тара (ут) ОТПР, тн',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_ves_tary_arc': '(ЭПД) Тара ОТПР, тн',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_gruzp': '(ЭПД) ГП, тн',

            'ttdr_field_outgoing_cars_outgoing_uz_document_code_stn_to': '(ЭПД) Код ст. назначения',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_to_station_uz_name': '(ЭПД) Станция назначения',
            'ttdr_field_outgoing_cars_outgoing_uz_document_to_code_inlandrailway': 'Код дороги ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_document_to_inlandrailway_name': 'Дорога ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_document_to_inlandrailway_abbr': 'Дорога ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_document_code_border_checkpoint': '(ЭПД) Код погранперехода',
            'ttdr_field_outgoing_cars_outgoing_uz_document_border_checkpoint_station_name': '(ЭПД) Погранпереход',
            'ttdr_field_outgoing_cars_outgoing_uz_document_code_consignee': '(ЭПД) Код грузополучателя',
            'ttdr_field_outgoing_cars_outgoing_uz_document_consignee_name': '(ЭПД) Грузополучатель',
            'ttdr_field_outgoing_cars_outgoing_uz_document_code_payer': '(ЭПД) Код плат ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_document_payer_name': '(ЭПД) Плательщик ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_document_distance_way': '(ЭПД) Тар.расс. ОТПР',

            'ttdr_field_outgoing_cars_outgoing_sostav_id_station_from': 'id Ст.примыкания ОТПР',
            'ttdr_field_outgoing_cars_outgoing_sostav_from_station_amkr_name': 'Ст.примыкания ОТПР',
            'ttdr_field_outgoing_cars_outgoing_sostav_from_station_amkr_abbr': 'Ст.примыкания ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_laden': 'Гр/пор',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_readiness_amkr': 'Время предъявления на УЗ',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_end_inspection_acceptance_delivery': 'Время  осмотра пр-сд',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_end_inspection_loader': 'Время осмотра грузчик',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_end_inspection_vagonnik': 'Время осмотра вагонник',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_readiness_uz': 'Время готовности к сдаче на УЗ',
            'ttdr_field_outgoing_cars_idle_time': 'Общий простой, час',
            'ttdr_field_outgoing_cars_idle_time_act': 'Общий простой Акт, час',
            'ttdr_field_outgoing_cars_wagon_usage_fee_downtime': 'Общий простой, час',
            'ttdr_field_outgoing_cars_wagon_usage_fee_calc_time': 'Время пользования (расчетное), час',
            'ttdr_field_outgoing_cars_wagon_usage_fee_calc_fee_amount_final': 'Плата, грн',
            'ttdr_field_outgoing_cars_wagon_usage_fee_calc_fee_amount': 'Плата (расч.), грн',
            'ttdr_field_outgoing_cars_wagon_usage_fee_manual_time': 'Время пользования (ручн.), час',
            'ttdr_field_outgoing_cars_wagon_usage_fee_manual_fee_amount': 'Плата (ручн.), грн',
            'ttdr_field_outgoing_cars_arrival_sostav_old_date_adoption': 'Дата приема',
            'ttdr_field_outgoing_cars_arrival_sostav_old_date_adoption_act': 'Дата приема по Акту',
            'ttdr_field_outgoing_cars_wagon_usage_fee_note': 'Примечание, плата за пользование',
            'ttdir_field_outgoing_cars_wagon_usage_fee_create': 'Плата рассчитана',
            'ttdir_field_outgoing_cars_wagon_usage_fee_create_user': 'Плату рассчитал',
            'ttdir_field_outgoing_cars_wagon_usage_fee_change': 'Плата правка',
            'ttdir_field_outgoing_cars_wagon_usage_fee_change_user': 'Плату правил',

            'ttdr_field_outgoing_cars_arrival_uz_vagon_cargo_name': 'Груз ПРИБ',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_cargo_etsng_code': 'Код ЕТСНГ ПРИБ',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_sertification_data': 'Серт.данные',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_cargo_group_name': 'Группа ПРИБ.',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_division_code': 'Шифр цех получатель',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_name_division': 'Цех получатель',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_division_abbr': 'Цех получатель',
            'ttdr_field_outgoing_cars_arrival_uz_document_nom_doc': '№ Дос. накладной ПРИБ',
            'ttdr_field_outgoing_cars_arrival_uz_document_nom_main_doc': '№ Осн. накладной ПРИБ',
            'ttdr_field_outgoing_cars_arrival_uz_document_code_stn_from': 'Код ст. ОТПР',
            'ttdr_field_outgoing_cars_arrival_uz_document_station_from_name': 'Ст. ОТПР',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_condition_name': 'Разметка ПРИБ',
            'ttdr_field_outgoing_cars_arrival_uz_vagon_condition_abbr': 'Разметка ПРИБ',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_condition_name': 'Разметка ОТПР',
            'ttdr_field_outgoing_cars_outgoing_uz_vagon_condition_abbr': 'Разметка ОТПР',
            'ttdr_field_outgoing_cars_arrival_sostav_id_station_on': 'id Ст.примыкания ПРИБ',
            'ttdr_field_outgoing_cars_arrival_sostav_station_on_name': 'Ст.примыкания ПРИБ',
            'ttdr_field_outgoing_cars_arrival_sostav_station_on_abbr': 'Ст.примыкания ПРИБ',

            'ttdr_field_outgoing_cars_sap_outgoing_supply_num': 'SAP Исх. пост. №',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_cargo_code': 'SAP Код ЕТСНГ',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_cargo_name': 'SAP Груза ОТПР',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_destination_station_code': 'SAP Код станции назначения',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_destination_station_name': 'SAP Станция назначения',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_warehouse_code': 'код SAP склад',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_warehouse_name': 'SAP склад',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_netto': 'SAP вес нетто',
            'ttdr_field_outgoing_cars_sap_outgoing_supply_responsible_fio': 'SAP бригадир',

            'ttdr_field_outgoing_cars_epd_vagon_collect_v_name_etsng': 'Груз ОТПР (ЭПД)',
            'ttdr_field_outgoing_cars_epd_vagon_collect_v_kod_etsng': 'Код ЕТСНГ (ЭПД)',
            'ttdr_field_outgoing_cars_epd_vagon_collect_v_kod_gng': 'Код ГНГ (ЭПД)',
            'ttdr_field_outgoing_cars_epd_route_stn_to': 'Код ст. назначения (ЭПД)',
            'ttdr_field_outgoing_cars_epd_route_name_to': 'Станция назначения (ЭПД)',
            'ttdr_field_outgoing_cars_epd_joint_stn': 'Код погранперехода (ЭПД)',
            'ttdr_field_outgoing_cars_epd_joint_stn_name': 'Погранпереход (ЭПД)',
            'ttdr_field_outgoing_cars_epd_vagon_collect_v_vesg': 'Вес нетто ОТПР, тн (ЭПД)',
            'ttdr_field_outgoing_cars_epd_vagon_u_tara': 'Тара (ут) ОТПР, тн (ЭПД)',
            'ttdr_field_outgoing_cars_epd_vagon_ves_tary_arc': 'Тара ОТПР, тн (ЭПД)',
            'ttdr_field_outgoing_cars_epd_vagon_gruzp': 'ГП, тн (ЭПД)',
            'ttdr_field_outgoing_cars_epd_client_kod': 'Код грузополучателя (ЭПД)',
            'ttdr_field_outgoing_cars_epd_client_name': 'Грузополучатель (ЭПД)',
            'ttdr_field_outgoing_cars_epd_pl_kod_plat': 'Код плат ОТПР (ЭПД)',
            'ttdr_field_outgoing_cars_epd_pl_name_plat': 'Плательщик ОТПР (ЭПД)',
            'ttdr_field_outgoing_cars_epd_distance_way': 'Тар.расс. ОТПР (ЭПД)',

            'ttdr_field_adoption_wagon_not_operation_date_adoption': 'Дата приема',
            'ttdr_field_adoption_wagon_not_operation_cargo_name': 'Груз ПРИБ.',
            'ttdr_field_adoption_wagon_not_operation_nom_main_doc': 'Осн. накл.',
            'ttdr_field_adoption_wagon_not_operation_nom_doc': 'Дос. накл.',
            'ttdr_field_adoption_wagon_not_operation_station_from_name': 'Станция отправления',
            'ttdr_field_adoption_wagon_not_operation_division_abbr': 'Цех-получатель',

            'ttdr_field_incoming_cars_arrival_sostav_date_arrival': 'Дата прибытия',
            'ttdr_field_incoming_cars_arrival_sostav_date_adoption': 'Дата приема',
            'ttdr_field_incoming_cars_arrival_sostav_date_adoption_act': 'Дата приема по акту',
            'ttdr_field_incoming_cars_arrival_uz_vagon_id_type': 'id тип вагона',
            'ttdr_field_incoming_cars_arrival_uz_vagon_type': 'Тип вагона',
            'ttdr_field_incoming_cars_arrival_uz_vagon_vesg_reweighing': 'Вес АМКР, тн',
            'ttdr_field_incoming_cars_arrival_uz_vagon_deff_vesg': 'Отклонение, тн',
            'ttdr_field_incoming_cars_sap_incoming_supply_num': '№ Вх. поставки',
            'ttdr_field_incoming_cars_sap_incoming_supply_cargo_code': 'Код груза ПРИБ SAP',
            'ttdr_field_incoming_cars_sap_incoming_supply_cargo_name': 'Груз ПРИБ SAP',
            'ttdr_field_incoming_cars_arrival_uz_vagon_cargo_etsng_code': 'Код ЕТСНГ',

            'ttdr_field_incoming_cars_arrival_uz_document_code_payer_arrival': 'Код плательщика ПРИБ',
            'ttdr_field_incoming_cars_arrival_uz_document_payer_arrival_name': 'Платильщик ПРИБ',
            'ttdr_field_incoming_cars_arrival_uz_vagon_pay_summa': 'Тариф ПРИБ',
            'ttdr_field_incoming_cars_arrival_sostav_epd_date_otpr': 'Дата отправления на АМКР',
            'ttdr_field_incoming_cars_arrival_sostav_epd_date_vid': 'Дата раскредитовки',

            'ttdr_field_sostav_outgoing_naturka_arrival_uz_vagon_cargo_name': 'Груз по прибытию',
            'ttdr_field_sostav_outgoing_naturka_arrival_sostav_date_arrival': 'Дата приема с УЗ',

            'ttdr_field_incoming_cars_outgoing_uz_vagon_cargo_name': 'Груз по отправлению',
            'ttdr_field_incoming_cars_outgoing_sostav_date_outgoing': 'Дата последней сдачи',

            'ttdr_field_total_id': 'id',
            'ttdr_field_total_id_type': 'id_type',
            'ttdr_field_total_period': 'Период',
            'ttdr_field_total_operator_abbr': 'Опер. АМКР',
            'ttdr_field_total_limiting_abbr': 'Огран.',
            'ttdr_field_total_cargo_name': 'Груз ПРИБ',
            'ttdr_field_total_cargo_name_out': 'Груз ОТПР',
            'ttdr_field_total_group_name': 'Группа груз ПРИБ',
            'ttdr_field_total_group_name_out': 'Группа груз ОТПР',
            'ttdr_field_total_certification_data': 'Сертиф. данные',
            'ttdr_field_total_count_wagon': 'Кол-во ваг.',
            'ttdr_field_total_sum_vesg': 'Кол-во тн. по ЭПД',
            'ttdr_field_total_sum_vesg_reweighing': 'Кол-во тн. по АМКР',
            'ttdr_field_total_sum_vesg_deff': 'Откл., тн.',
            'ttdr_field_total_rod_abbr': 'Род ПРИБ',
            'ttdr_field_total_perent_wagon': '% от общего приб.',
            'ttdr_field_total_sap_cargo_code': 'Код материала SAP',
            'ttdr_field_total_sap_cargo_name': 'Груз ПРИБ SAP',
            'ttdr_field_total_station_from_name': 'Станция отправления',
            'ttdr_field_total_division_abbr': 'Цех-грузоп.',
            'ttdr_field_total_out_division_abbr': 'Цех погрузки.',
            'ttdr_field_total_station_on_name': 'Пункт погрузки',
            'ttdr_field_total_out_station_name': 'Станция назначения',
            'ttdr_field_total_cargo_out_group_name': 'Наименование груза',
            'ttdr_field_total_station_inlandrailway': 'Станция назначения/Дорога',
            'ttdr_field_total_note': 'Примечание',
            'ttdr_field_total_sum_idle_time': 'Общий простой, час',
            'ttdr_field_total_wagon_idle_time': 'На 1 вагон, час',

            'ttdr_field_usage_fee_sum_calc_time': 'Общий простой, час',
            'ttdr_field_usage_fee_wagon_calc_time': 'На 1 вагон, час.',
            'ttdr_field_usage_fee_sum_calc_fee_amount': 'Плата, грн',
            'ttdr_field_usage_fee_wagon_calc_fee_amount': 'На 1 ваг.,грн',
            'ttdr_field_usage_fee_wagon_persent_fee_amount': '% от общей платы',
            'ttdr_field_usage_fee_wagon_persent_derailment_fee_amount': '% от общей платы',
            'ttdr_field_usage_fee_wagon_persent_not_derailment_fee_amount': '% от общей платы',

            'ttdr_field_usage_fee_period_status_input': '',
            'ttdr_field_usage_fee_period_start': 'Начало периода',
            'ttdr_field_usage_fee_period_stop': 'Окончание периода',
            'ttdr_field_usage_fee_period_operator': 'Оператор',
            'ttdr_field_usage_fee_period_operator_abbr': 'Оператор (аббр)',
            'ttdr_field_usage_fee_period_genus_abbr': 'Род',
            'ttdr_field_usage_fee_period_rate': 'Ставка',
            'ttdr_field_usage_fee_period_rate_derailment': 'Ставка, сход',
            'ttdr_field_usage_fee_period_grace_time_1': 'Льготное время 1',
            'ttdr_field_usage_fee_period_grace_time_2': 'Льготное время 2',
            'ttdr_field_usage_fee_period_coefficient_route': 'Коэф.маршрут',
            'ttdr_field_usage_fee_period_coefficient_not_route': 'Коэф.не маршрут',
            'ttdr_field_usage_fee_period_hour_after_30': 'Полный час после 30 мин.',

            'ttdr_field_arrival_uz_document_nom_doc': '№ накладной',
            'ttdr_field_arrival_uz_document_nom_main_doc': '№ накладной',
            'ttdr_field_usage_fee_outgoing_cars_arrival_sostav_date_adoption': 'Дата приема.',
            'ttdr_field_usage_fee_outgoing_cars_arrival_sostav_date_adoption_act': 'Дата приема (акт).',
            'ttdr_field_usage_fee_outgoing_cars_arrival_uz_vagon_cargo_name': 'Груз ПРИБ',
            'ttdr_field_usage_fee_outgoing_cars_outgoing_sostav_date_outgoing': 'Дата сдачи.',
            'ttdr_field_usage_fee_outgoing_cars_outgoing_sostav_date_outgoing_act': 'Дата сдачи (акт)',
            'ttdr_field_usage_fee_outgoing_cars_outgoing_uz_vagon_cargo_name': 'Груз ОТПР',
            'ttdr_field_usage_fee_outgoing_cars_arrival_uz_vagon_route': 'Маршрут/не маршрут',
            'ttdr_field_usage_fee_outgoing_cars_outgoing_sostav_route_sign': 'Маршрут/не маршрут',

            'ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing': 'Дата и время сдачи',
            'ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing_act': 'Дата и время сдачи, акт',

            'ttdr_field_incoming_outgoing_car_simple_car': 'Простой УЗ, час.',
            'ttdr_field_incoming_outgoing_car_wagon_usage_fee_downtime': 'Общий простой, час',
            'ttdr_field_incoming_outgoing_car_wagon_usage_fee_calc_fee_amount_final': 'Плата , грн.',

            'ttdr_field_incoming_outgoing_car_wir_note': 'Примечание',

            'ttdr_field_curr_wagons_rent_id_operator': 'id_operator',
            'ttdr_field_curr_wagons_rent_operators': 'Оператор АМКР',
            'ttdr_field_curr_wagons_rent_operator_abbr': 'Оператор АМКР',
            'ttdr_field_curr_wagons_rent_start': 'Начало аренды',
            'ttdr_field_curr_wagons_rent_end': 'Окончание арены',
            'ttdr_field_curr_wagons_rent_operator_paid': 'Платный',
            'ttdr_field_curr_wagons_rent_id_limiting': 'id_limiting',
            'ttdr_field_curr_wagons_rent_limiting_name': 'Ограничение',
            'ttdr_field_curr_wagons_rent_limiting_abbr': 'Ограничение',

            'ttdr_field_instructional_letters_num': '№ письма',
            'ttdr_field_instructional_letters_datetime': 'Дата письма',
            'ttdr_field_instructional_letters_station_code': 'Код станции',
            'ttdr_field_instructional_letters_station_name': 'Станция назначения',

            'ttdr_field_genus_vagon': 'Род вагона',
            'ttdr_field_sap_incoming_supply_kod_r_10': 'Запрет ОТК',
            'ttdr_field_wir_note': 'Примечание',
            'ttdr_field_idle_time': 'Простой УЗ',
            'ttdr_field_idle_time_act': 'Простой УЗ (акт)',

            'ttdr_field_residue_total_operators_operator': 'Оператор',
            'ttdr_field_residue_total_operators_start': 'Было',
            'ttdr_field_residue_total_operators_arrival': 'Прибыло',
            'ttdr_field_residue_total_operators_outgoing': 'Убыло',
            'ttdr_field_residue_total_operators_stop': 'Остаток',

            'ttdr_field_residue_total_common_date': 'Дата',
            'ttdr_field_residue_total_common_total': 'Остаток общий',
            'ttdr_field_residue_total_common_external': 'Внешние вагоны',
            'ttdr_field_residue_total_common_paid': 'Оплатные',
            'ttdr_field_residue_total_common_accounting': 'Учетные вагоны',
            'ttdr_field_residue_total_common_amkr': 'Вагоны и цистерны АМКР + цистерны аренда АМКР',

            'ttdr_field_residue_total_arrival_condition_abbr': 'Разметка по прибытию',
            'ttdr_field_residue_total_current_condition_abbr': 'Разметка текущая',
            'ttdr_field_total_group_name_condition': 'Группа разметка',
            'ttdr_field_total_group_name_genus': 'Группа род вагона',
            'ttdr_field_total_station_amkr_abbr': 'Станция',
            'ttdr_field_total_cargo_group_name': 'Род груза',
            'ttdr_field_total_group_ext_station_from': 'Группа станция отправления',

            'ttdr_field_old_outgoing_uz_vagon_cargo_name': 'Груз по ОТПР предыдущий',
            'ttdr_field_old_date_outgoing': 'Дата последней сдачи',
            'ttdr_field_old_outgoing_uz_document_station_to_name': 'Станция ОТПР предыдущая',

            'ttdr_mess_init_module': 'Инициализация модуля (table_td_report) ...',
            'ttdr_mess_load_sostav': 'Загружаю состав ...',
            'ttdr_mess_view_report': 'Показать отчет ...',

            'ttdr_title_all': 'Все',
            'ttdr_title_yes': 'Да',
            'ttdr_title_not_epd': 'Без ЭПД',
            'ttdr_title_for_loading': 'Под погрузку',
            'ttdr_title_route': 'маршрут',
            'ttdr_title_not_route': 'не маршрут',
            'ttdr_title_laden': 'груженный',
            'ttdr_title_not_laden': 'порожний',

            'ttdr_title_button_export': 'Экспорт',
            'ttdr_title_button_buffer': 'Буфер',
            'ttdr_title_button_excel': 'Excel',
            'ttdr_title_excel_sheet_name': 'Отчет',
            'ttdr_title_button_field': 'Поля',
            'ttdr_title_button_field_select': 'Выбрать',
            'ttdr_title_button_field_view_all': 'Показать все',
            'ttdr_title_button_field_clear': 'Сбросить',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    var VICR = App.view_incoming_report; // Модуль отчетов по прибытию

    // Перечень полей
    var list_collums = [
        // Поля составы принятые
        {
            field: 'numeration',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_numeration', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'details_control',
            className: 'details-control  details-control-wagons-sostav',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        // Поля составы принятые
        {
            field: 'adoption_sostav_station',
            data: function (row, type, val, meta) {
                return row.station;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_adoption_sostav_station', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_adoption_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_return_wagon',
            data: function (row, type, val, meta) {
                return row.count_return_wagon;
            },
            className: 'dt-body-center sum_count_return_wagon',
            title: langView('ttdr_field_adoption_sostav_count_return_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_adoption_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_count_not_operator',
            data: function (row, type, val, meta) {
                return row.count_not_operator;
            },
            className: 'dt-body-center sum_count_not_operator',
            title: langView('ttdr_field_adoption_count_not_operator', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // Поля составы сданные
        {
            field: 'outgoing_sostav_station',
            data: function (row, type, val, meta) {
                return row.station;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_sostav_station', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_outgoing_sostav_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_count_return_wagon',
            data: function (row, type, val, meta) {
                return row.count_return_wagon;
            },
            className: 'dt-body-center sum_count_return_wagon',
            title: langView('ttdr_field_outgoing_sostav_count_return_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_outgoing_sostav_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // Поля принятые составы детально adoption_sostav_detali
        {
            field: 'adoption_sostav_detali_details_control',
            className: 'details-control adoption-sostav-detali',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "20px",
            searchable: false
        },
        {
            field: 'adoption_sostav_detali_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn arrival-button"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center button-control',
            width: "20px"
        },
        {
            field: 'adoption_sostav_detali_button_print',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn arrival-button-prn"><i class="fa-solid fa-print"></i></button>',
            orderable: false,
            className: 'dt-body-center button-control',
            width: "20px"
        },
        {
            field: 'adoption_sostav_detali_num_doc',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_sostav_detali_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_sostav_detali_date_adoption',
            data: function (row, type, val, meta) {
                return row.date_adoption ? moment(row.date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_adoption_sostav_detali_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'adoption_sostav_detali_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_adoption_sostav_detali_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_detali_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_adoption_sostav_detali_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'adoption_sostav_detali_count_not_operator',
            data: function (row, type, val, meta) {
                return row.count_not_operator;
            },
            className: 'dt-body-center sum_count_not_operator',
            title: langView('ttdr_field_adoption_sostav_detali_count_not_operator', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // Поля принятые составы детально outgoing_sostav_detali
        {
            field: 'outgoing_sostav_detali_details_control',
            className: 'details-control outgoing-sostav-detali',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "20px",
            searchable: false
        },
        {
            field: 'outgoing_sostav_detali_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn outgoing-button"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center button-control',
            width: "20px"
        },
        {
            field: 'outgoing_sostav_detali_num_doc',
            data: function (row, type, val, meta) {
                return row.num_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_sostav_detali_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_sostav_detali_date_outgoing',
            data: function (row, type, val, meta) {
                return row.date_outgoing ? moment(row.date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_sostav_detali_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_sostav_detali_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center sum_count_wagon',
            title: langView('ttdr_field_outgoing_sostav_detali_count_wagon', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_sostav_detali_count_account_balance',
            data: function (row, type, val, meta) {
                return row.count_account_balance;
            },
            className: 'dt-body-center sum_count_account_balance',
            title: langView('ttdr_field_outgoing_sostav_detali_count_account_balance', App.Langs), width: "50px", orderable: false, searchable: false
        },
        // НАТУРКА ПРИБЫТИЯ
        //// № п.п
        {
            field: 'incoming_cars_id',
            data: function (row, type, val, meta) {
                return row.arrival_car_id;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_car_position_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_car_position_arrival;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_position_arrival', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Документы накладных УЗ
        {
            field: 'incoming_cars_arrival_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_main_doc < 0 ? langView('ttdr_title_not_epd', App.Langs) : row.arrival_uz_document_nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_nom_main_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Администрация по отправке
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_adm',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_adm_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_wagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_wagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_adm_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Род по отправке
        {
            field: 'incoming_cars_arrival_uz_vagon_rod',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_rod;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_rod_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_rod_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_incoming_cars_uz_vagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Грузоподъемность
        {
            field: 'incoming_cars_arrival_uz_vagon_gruzp',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_gruzp;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_gruzp', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Кол. осей
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_kol_os',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_kol_os;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_kol_os', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тип цистерны
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_usl_tip',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_usl_tip;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_usl_tip', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'incoming_cars_arrival_uz_vagon_u_tara',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_u_tara ? Number(Number(row.arrival_uz_vagon_u_tara) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_u_tara', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара
        {
            field: 'incoming_cars_arrival_uz_vagon_ves_tary_arc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_ves_tary_arc ? Number(Number(row.arrival_uz_vagon_ves_tary_arc) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_ves_tary_arc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Маршрут
        {
            field: 'incoming_cars_arrival_uz_vagon_route',
            data: function (row, type, val, meta) {
                if (row.arrival_uz_vagon_route !== null) {
                    if (row.arrival_uz_vagon_route) {
                        return langView('ttdr_title_route', App.Langs);
                    } else {
                        return langView('ttdr_title_not_route', App.Langs);
                    }
                } else {
                    return null;
                }
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_route', App.Langs), width: "50px", orderable: true, searchable: true
        },

        // Ремонт УЗ и вагон
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_uz',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_date_rem_uz ? moment(row.arrival_uz_vagon_wagon_date_rem_uz).format(format_date) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_vag',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_wagon_date_rem_vag ? moment(row.arrival_uz_vagon_wagon_date_rem_vag).format(format_date) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_wagon_date_rem_vag', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник
        {
            field: 'incoming_cars_arrival_uz_vagon_owner_wagon',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_vagon_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
        // Оператор
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_start ? moment(row.arrival_uz_vagon_arrival_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_end ? moment(row.arrival_uz_vagon_arrival_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_operator_paid ? langView('ttdr_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        // Оператор текущий
        {
            field: 'current_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['current_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_current_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'current_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['current_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ttdr_field_current_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //Ограничение
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_arrival_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_arrival_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'incoming_cars_arrival_uz_vagon_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка текущая
        {
            field: 'current_condition_name',
            data: function (row, type, val, meta) {
                return row['current_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_current_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_condition_abbr',
            data: function (row, type, val, meta) {
                return row['current_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_current_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция отправления
        {
            field: 'incoming_cars_arrival_uz_document_code_stn_from',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_from;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_stn_from', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_station_from_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_document_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция прибытия
        {
            field: 'incoming_cars_arrival_uz_document_code_stn_to',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_to;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_stn_to', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_station_to_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_to_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_document_station_to_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Погран переход
        {
            field: 'incoming_cars_arrival_uz_document_code_border_checkpoint',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_border_checkpoint;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_border_checkpoint', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_border_checkpoint_station_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_border_checkpoint_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_document_border_checkpoint_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_cross_time',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_cross_time ? moment(row.arrival_uz_document_cross_time).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_incoming_cars_uz_document_cross_time', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузоотправитель
        {
            field: 'incoming_cars_arrival_uz_document_code_shipper',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_shipper;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_shipper', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_shipper_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_shipper_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_document_shipper_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузополучатель
        {
            field: 'incoming_cars_arrival_uz_document_code_consignee',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_consignee;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_consignee', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_name_consignee',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_name_consignee;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_document_name_consignee', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Платильщик по отправлению
        {
            field: 'incoming_cars_arrival_uz_document_code_payer_sender',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_payer_sender;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_code_payer_sender', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_payer_sender_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_payer_sender_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_document_payer_sender_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Тарифное расстояние
        {
            field: 'incoming_cars_arrival_uz_document_distance_way',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_distance_way;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_document_distance_way', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Вес
        {
            field: 'incoming_cars_arrival_uz_vagon_vesg',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg ? Number(Number(row.arrival_uz_vagon_vesg) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Груз
        {
            field: 'incoming_cars_arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения АМКР        
        {
            field: 'incoming_cars_arrival_uz_vagon_station_amkr_name',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_station_on_amkr !== null ? row['arrival_uz_vagon_station_amkr_name_' + App.Lang] : langView('ttdr_title_for_loading', App.Langs);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_station_on_amkr !== null ? row['arrival_uz_vagon_station_amkr_abbr_' + App.Lang] : langView('ttdr_title_for_loading', App.Langs);
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Текущая станция АМКР        
        {
            field: 'current_station_amkr_name',
            data: function (row, type, val, meta) {
                return row.current_id_outer_way === null ? row.current_id_station_amkr !== null ? row['current_station_amkr_name_' + App.Lang] : langView('ttdr_title_for_loading', App.Langs) : '';
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_current_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'current_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row.current_id_outer_way === null ? row.current_id_station_amkr !== null ? row['current_station_amkr_abbr_' + App.Lang] : langView('ttdr_title_for_loading', App.Langs) : '';
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_current_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Текущий путь        
        {
            field: 'current_way_and_outer_way_name',
            data: function (row, type, val, meta) {

                return row.current_id_outer_way !== null ? row['current_outer_way_name_' + App.Lang] : row['current_way_num_' + App.Lang] + '-' + row['current_way_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_current_way_and_outer_way_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //{
        //    field: 'current_way_abbr',
        //    data: function (row, type, val, meta) {
        //        return row.current_id_way !== null ? row['current_way_abbr_' + App.Lang] : '';
        //    },
        //    className: 'dt-body-left shorten mw-100',
        //    title: langView('ttdr_field_current_way_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        //},
        // Перегон      
        {
            field: 'current_outer_way_name',
            data: function (row, type, val, meta) {
                return row.current_id_outer_way !== null ? row['current_outer_way_name_' + App.Lang] + '-' + row['current_outer_way_name_' + App.Lang] : '';
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_current_outer_way_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Цех получатель
        {
            field: 'incoming_cars_arrival_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_uz_vagon_division_code', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_uz_vagon_name_division', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком состояние
        {
            field: 'incoming_cars_arrival_uz_vagon_commercial_condition',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_commercial_condition_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_commercial_condition', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Ком сертификационные данные
        {
            field: 'incoming_cars_arrival_uz_vagon_sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_uz_vagon_sertification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения АМКР        
        {
            field: 'incoming_cars_arrival_sostav_station_on_name',
            data: function (row, type, val, meta) {
                return row['arrival_sostav_station_on_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_station_on_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_station_on_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_sostav_station_on_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_station_on_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Груз по отправке предыдущий
        {
            field: 'old_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['old_outgoing_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_old_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дата последней здачи
        {
            field: 'old_date_outgoing',
            data: function (row, type, val, meta) {
                return row.old_date_outgoing_act ? moment(row.old_date_outgoing_act).format(format_datetime) : (row.old_date_outgoing ? moment(row.old_date_outgoing).format(format_datetime) : null);
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_old_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция ОТПР предыдущая
        {
            field: 'old_outgoing_uz_document_station_to_name',
            data: function (row, type, val, meta) {
                return row['old_outgoing_uz_document_station_to_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_old_outgoing_uz_document_station_to_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // НАТУРКА ОТПРАВКА
        // № п.п
        {
            field: 'outgoing_cars_car_position_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing_car_position_outgoing;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_car_position_outgoing', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Станция назначения основное поле по документу САП если пусто тогда по ручному вводу
        {
            field: 'outgoing_cars_to_station_uz_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_station_to_name_' + App.Lang] !== null && row['outgoing_uz_document_station_to_name_' + App.Lang] !== '' ? row['outgoing_uz_document_station_to_name_' + App.Lang] : row.outgoing_uz_vagon_to_station_uz_name;
                //return row.sap_outgoing_supply_destination_station_name !== null && row.sap_outgoing_supply_destination_station_name !== '' ? row.sap_outgoing_supply_destination_station_name : row.outgoing_uz_vagon_to_station_uz_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_to_station_uz_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Администрация по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_wagon_adm',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_wagon_adm;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_adm_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_adm_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_adm_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_adm_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_adm_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //Род по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_rod',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_rod;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_rod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_rod_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_rod_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_rod_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_rod_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Цех отправитель
        {
            field: 'outgoing_cars_outgoing_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_division_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_name_division', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Собственник
        {
            field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_owner_wagon_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ОПЕРАТОР ПО ОТПРАВКЕ [IDS].[Directory_OperatorsWagons]
        // Оператор по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_start ? moment(row.outgoing_uz_vagon_outgoing_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_end ? moment(row.outgoing_uz_vagon_outgoing_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_operator_paid ? langView('togc_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // field: 'operator_color'
        //Ограничение по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Груз по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_id_cargo',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_id_cargo;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_id_cargo', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Группа груза по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_id_group',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_id_group;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_id_group', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Группа (для отчетов) груза по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_id_out_group',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_id_out_group;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_id_out_group', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_out_group_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_out_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ЕТСНГ отправка
        {
            field: 'outgoing_cars_outgoing_uz_vagon_id_cargo_etsng',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_id_cargo_etsng;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_id_cargo_etsng', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_etsng_code',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_cargo_etsng_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_etsng_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_etsng_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_etsng_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_etsng_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // ГНГ отправка
        {
            field: 'outgoing_cars_outgoing_uz_vagon_id_cargo_gng',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_id_cargo_gng;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_id_cargo_gng', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_gng_code',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_cargo_gng_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_gng_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_cargo_gng_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_gng_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_cargo_gng_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вес по отправке (Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_vagon_vesg',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_vesg ? Number(Number(row.outgoing_uz_vagon_vesg) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-right mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Тара по отправке (Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_vagon_u_tara',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_u_tara ? Number(Number(row.outgoing_uz_vagon_u_tara) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-right mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_u_tara', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_ves_tary_arc',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_ves_tary_arc ? Number(Number(row.outgoing_uz_vagon_ves_tary_arc) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-right mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_ves_tary_arc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Грузоподъемность по отправке (Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_vagon_gruzp',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_gruzp ? Number(row.outgoing_uz_vagon_gruzp).toFixed(2) : null;
            },
            className: 'dt-body-right mw-50',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_gruzp', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Груз по прибытию
        {
            field: 'sostav_outgoing_naturka_arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_sostav_outgoing_naturka_arrival_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вагон приняли с УЗ
        {
            field: 'sostav_outgoing_naturka_arrival_sostav_date_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption ? moment(row.arrival_sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_sostav_outgoing_naturka_arrival_sostav_date_arrival', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция назначения (по отправке)(Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_document_code_stn_to',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_code_stn_to;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_code_stn_to', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_to_station_uz_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_station_to_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_to_station_uz_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дорога по отправке
        {
            field: 'outgoing_cars_outgoing_uz_document_to_code_inlandrailway',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_to_code_inlandrailway;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_to_code_inlandrailway', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_document_to_inlandrailway_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_to_inlandrailway_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_to_inlandrailway_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_document_to_inlandrailway_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_to_inlandrailway_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_to_inlandrailway_abbr', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Погран переход (по отправке)(Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_document_code_border_checkpoint',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_code_border_checkpoint;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_code_border_checkpoint', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_document_border_checkpoint_station_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_border_checkpoint_station_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_border_checkpoint_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Грузополучатель (по отправке)(Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_document_code_consignee',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_code_consignee;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_code_consignee', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_document_consignee_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_consignee_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_consignee_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Платильщик по отправке (по отправке)(Обновленный с ЭПД)
        {
            field: 'outgoing_cars_outgoing_uz_document_code_payer',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_code_payer;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_code_payer', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_document_payer_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_document_payer_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_payer_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // тарифное расстояние
        {
            field: 'outgoing_cars_outgoing_uz_document_distance_way',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_document_distance_way;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_document_distance_way', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // ВАГОНЫ БЕЗ ОПЕРАТОРОВ
        {
            field: 'adoption_wagon_not_operation_date_adoption',
            data: function (row, type, val, meta) {
                return row.sostav_date_adoption ? moment(row.sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_adoption_wagon_not_operation_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_cargo_name',
            data: function (row, type, val, meta) {
                return row['cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_adoption_wagon_not_operation_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.nom_main_doc < 0 ? langView('ttdr_title_not_epd', App.Langs) : row.nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_wagon_not_operation_nom_main_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_nom_doc',
            data: function (row, type, val, meta) {
                return row.nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_adoption_wagon_not_operation_nom_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_station_from_name',
            data: function (row, type, val, meta) {
                return row['station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_adoption_wagon_not_operation_station_from_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'adoption_wagon_not_operation_division_abbr',
            data: function (row, type, val, meta) {
                return row['division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_adoption_wagon_not_operation_division_abbr', App.Langs), width: "150px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // ПРИБЫТИЕ ДЕТАЛЬНО
        //
        {
            field: 'incoming_cars_arrival_sostav_num_doc',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_num_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_date_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_arrival ? moment(row.arrival_sostav_date_arrival).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_date_arrival', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_date_adoption',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption ? moment(row.arrival_sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_date_adoption_act',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption_act ? moment(row.arrival_sostav_date_adoption_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_date_adoption_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // тип вагона
        {
            field: 'incoming_cars_arrival_uz_vagon_id_type',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_id_type;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_id_type', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_type',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_type_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_type', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вес-перевеска АМКР
        {
            field: 'incoming_cars_arrival_uz_vagon_vesg_reweighing',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg_reweighing ? Number(Number(row.arrival_uz_vagon_vesg_reweighing) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_vesg_reweighing', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Вес-перевеска АМКР
        {
            field: 'incoming_cars_arrival_uz_vagon_deff_vesg',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_vesg && row.arrival_uz_vagon_vesg_reweighing ? Number(Number(Number(row.arrival_uz_vagon_vesg) - Number(row.arrival_uz_vagon_vesg_reweighing)) / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_deff_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Код груза ЕТСНГ
        {
            field: 'incoming_cars_arrival_uz_vagon_cargo_etsng_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_cargo_etsng_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_cargo_etsng_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_sap_incoming_supply_num',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_sap_incoming_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_sap_incoming_supply_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_cargo_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_sap_incoming_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_sap_incoming_supply_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_incoming_supply_cargo_name;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_incoming_cars_sap_incoming_supply_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Платильщик
        {
            field: 'incoming_cars_arrival_uz_document_code_payer_arrival',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_payer_arrival;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_document_code_payer_arrival', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_document_payer_arrival_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_payer_arrival_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_incoming_cars_arrival_uz_document_payer_arrival_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_uz_vagon_pay_summa',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_pay_summa ? Number(Number(row.arrival_uz_vagon_pay_summa) / 100).toFixed(2) : null;;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_cars_arrival_uz_vagon_pay_summa', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //
        {
            field: 'incoming_cars_arrival_sostav_epd_date_otpr',
            data: function (row, type, val, meta) {
                //return row.otpr && row.otpr.date_otpr ? moment(row.otpr.date_otpr).format(format_datetime) : null;
                return row.arrival_uz_document_date_otpr ? moment(row.arrival_uz_document_date_otpr).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_epd_date_otpr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'incoming_cars_arrival_sostav_epd_date_vid',
            data: function (row, type, val, meta) {
                //return row.otpr && row.otpr.date_vid ? moment(row.otpr.date_vid).format(format_datetime) : null;
                return row.arrival_uz_document_date_vid ? moment(row.arrival_uz_document_date_vid).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_arrival_sostav_epd_date_vid', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Груз по прибытию
        {
            field: 'incoming_cars_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                var previous_outgoing_car = row.previous_outgoing_car;
                return previous_outgoing_car ? previous_outgoing_car['outgoing_uz_vagon_cargo_name_' + App.Lang] : null;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_incoming_cars_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Вагон сдали на УЗ
        {
            field: 'incoming_cars_outgoing_sostav_date_outgoing',
            data: function (row, type, val, meta) {
                var previous_outgoing_car = row.previous_outgoing_car;
                return previous_outgoing_car && previous_outgoing_car.outgoing_sostav_date_outgoing ? moment(previous_outgoing_car.outgoing_sostav_date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_incoming_cars_outgoing_sostav_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Отчет-Груз по Оператору АМКР
        {
            field: 'total_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_id', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_id_type',
            data: function (row, type, val, meta) {
                return row.id_type;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_id_type', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_period',
            data: function (row, type, val, meta) {
                return row.period;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_period', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_operator_abbr',
            data: function (row, type, val, meta) {
                return row.operator_abbr;
            },
            className: 'dt-body-center shorten mw-200',
            title: langView('ttdr_field_total_operator_abbr', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'total_limiting_abbr',
            data: function (row, type, val, meta) {
                return row.limiting_abbr;
            },
            className: 'dt-body-center shorten mw-100',
            title: langView('ttdr_field_total_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_cargo_name',
            data: function (row, type, val, meta) {
                return row.cargo_name;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_total_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_group_name',
            data: function (row, type, val, meta) {
                return row.group_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_total_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_cargo_out_group_name',
            data: function (row, type, val, meta) {
                return row.cargo_out_group_name;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_total_cargo_out_group_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_certification_data',
            data: function (row, type, val, meta) {
                return row.certification_data;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_total_certification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_count_wagon',
            data: function (row, type, val, meta) {
                return row.count_wagon;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_count_wagon', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_sum_vesg',
            data: function (row, type, val, meta) {
                return row.sum_vesg ? Number(row.sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2);
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_sum_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_sum_vesg_reweighing',
            data: function (row, type, val, meta) {
                return row.sum_vesg_reweighing ? Number(row.sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2);
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_sum_vesg_reweighing', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_sum_vesg_deff',
            data: function (row, type, val, meta) {
                return row.sum_vesg_deff ? Number(row.sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2);
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_sum_vesg_deff', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_rod_abbr',
            data: function (row, type, val, meta) {
                return row.rod_abbr;
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_total_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_perent_wagon',
            data: function (row, type, val, meta) {
                return row.perent_wagon;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_total_perent_wagon', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_sap_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_cargo_code;
            },
            className: 'dt-body-center shorten mw-100',
            title: langView('ttdr_field_total_sap_cargo_code', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_sap_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_cargo_name;
            },
            className: 'dt-body-center mw-150',
            title: langView('ttdr_field_total_sap_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_station_from_name',
            data: function (row, type, val, meta) {
                return row.station_from_name;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_division_abbr',
            data: function (row, type, val, meta) {
                return row.division_abbr;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_out_division_abbr',
            data: function (row, type, val, meta) {
                return row.division_abbr;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_out_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_station_on_name',
            data: function (row, type, val, meta) {
                return row.station_on_name;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_station_on_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_out_station_name',
            data: function (row, type, val, meta) {
                return row.out_station_name;
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_out_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_station_inlandrailway',
            data: function (row, type, val, meta) {
                return row.station_inlandrailway;
            },
            className: 'dt-body-center mw-150',
            title: langView('ttdr_field_total_station_inlandrailway', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'total_note',
            data: function (row, type, val, meta) {
                return '';
            },
            className: 'dt-body-center mw-100',
            title: langView('ttdr_field_total_note', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Общий простой
        {
            field: 'total_sum_idle_time',
            data: function (row, type, val, meta) {
                return row.sum_idle_time !== null ? getTimeFromMins(row.sum_idle_time) : null;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_sum_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'total_wagon_idle_time',
            data: function (row, type, val, meta) {
                return row.sum_idle_time !== null ? getTimeFromMins(Number(Number(row.sum_idle_time / row.count_wagon).toFixed(0))) : null;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_total_wagon_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // ОТПРАВКА ДЕТАЛЬНО
        {
            field: 'outgoing_cars_outgoing_sostav_date_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_outgoing ? moment(row.outgoing_sostav_date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_sostav_date_outgoing_act',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_outgoing_act ? moment(row.outgoing_sostav_date_outgoing_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_outgoing_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        // Простой
        {
            field: 'incoming_outgoing_car_simple_car',
            data: function (row, type, val, meta) {
                return row.simple_car;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_incoming_outgoing_car_simple_car', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Оплата
        {
            field: 'incoming_outgoing_car_wagon_usage_fee_downtime',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_downtime !== null ? getTimeFromMins(row.wagon_usage_fee_downtime) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_outgoing_car_wagon_usage_fee_downtime', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'incoming_outgoing_car_wagon_usage_fee_calc_fee_amount_final',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_manual_fee_amount !== null ? Number(row.wagon_usage_fee_manual_fee_amount).toFixed(2) : (row.wagon_usage_fee_calc_fee_amount !== null ? Number(row.wagon_usage_fee_calc_fee_amount).toFixed(2) : null);
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_incoming_outgoing_car_wagon_usage_fee_calc_fee_amount_final', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //----------------------------------------------------
        {
            field: 'incoming_outgoing_car_wir_note',
            data: function (row, type, val, meta) {
                return row.wir_note;
            },
            className: 'dt-body-left mw-200',
            title: langView('ttdr_field_incoming_outgoing_car_wir_note', App.Langs), width: "200px", orderable: true, searchable: true
        },
        // История аренд операторов
        {
            field: 'curr_wagons_rent_id_operator',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_id_operator;
            },
            className: 'dt-body-center operator',
            title: langView('ttdr_field_curr_wagons_rent_id_operator', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_operators',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_operators_' + App.Lang];
            },
            className: 'dt-body-left mw-200',
            title: langView('ttdr_field_curr_wagons_rent_operators', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_operator_abbr',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-left mw-200',
            title: langView('ttdr_field_curr_wagons_rent_operator_abbr', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_start',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_start ? moment(row.curr_wagons_rent_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_curr_wagons_rent_start', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_end',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_end ? moment(row.curr_wagons_rent_end).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_curr_wagons_rent_end', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_operator_paid',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_operator_paid ? langView('togc_title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('ttdr_field_curr_wagons_rent_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
        },
        //
        {
            field: 'curr_wagons_rent_id_limiting',
            data: function (row, type, val, meta) {
                return row.curr_wagons_rent_id_limiting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_curr_wagons_rent_id_limiting', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_limiting_name',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_limiting_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_curr_wagons_rent_limiting_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'curr_wagons_rent_limiting_abbr',
            data: function (row, type, val, meta) {
                return row['curr_wagons_rent_limiting_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_curr_wagons_rent_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // САП отправка
        {
            field: 'outgoing_cars_sap_outgoing_supply_num',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Исх. пост. №
        {
            field: 'outgoing_cars_sap_outgoing_supply_cargo_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_cargo_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
        }, // SAP  Код ЕТСНГ
        {
            field: 'outgoing_cars_sap_outgoing_supply_cargo_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_cargo_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        }, // SAP  Груза ОТПР
        {
            field: 'outgoing_cars_sap_outgoing_supply_destination_station_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_destination_station_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_destination_station_code', App.Langs), width: "50px", orderable: true, searchable: true
        }, // SAP Код станции назначения
        {
            field: 'outgoing_cars_sap_outgoing_supply_destination_station_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_destination_station_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_destination_station_name', App.Langs), width: "100px", orderable: true, searchable: true
        }, // SAP Станция назначения
        {
            field: 'outgoing_cars_sap_outgoing_supply_warehouse_code',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_warehouse_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_warehouse_code', App.Langs), width: "50px", orderable: true, searchable: true
        }, // SAP склад код
        {
            field: 'outgoing_cars_sap_outgoing_supply_warehouse_name',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_warehouse_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_warehouse_name', App.Langs), width: "100px", orderable: true, searchable: true
        }, // SAP склад
        {
            field: 'outgoing_cars_sap_outgoing_supply_netto',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_netto ? Number(row.sap_outgoing_supply_netto / 1000).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_netto', App.Langs), width: "50px", orderable: true, searchable: true
        }, //  SAP  вес нетто
        {
            field: 'outgoing_cars_sap_outgoing_supply_responsible_fio',
            data: function (row, type, val, meta) {
                return row.sap_outgoing_supply_responsible_fio;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_sap_outgoing_supply_responsible_fio', App.Langs), width: "100px", orderable: true, searchable: true
        }, //  SAP бригадир
        // ЭПД по отправке
        {
            field: 'outgoing_cars_epd_vagon_collect_v_name_etsng',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon !== null && row.vagon.collect_v && row.vagon.collect_v.length > 0 && row.vagon.collect_v[0].name_etsng) {
                    return row.vagon.collect_v[0].name_etsng;
                }
                return null;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_collect_v_name_etsng', App.Langs), width: "100px", orderable: true, searchable: true
        }, // Груз ЕТСНГ
        {
            field: 'outgoing_cars_epd_vagon_collect_v_kod_etsng',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon !== null && row.vagon.collect_v && row.vagon.collect_v.length > 0 && row.vagon.collect_v[0].kod_etsng) {
                    return row.vagon.collect_v[0].kod_etsng;
                }
                return null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_collect_v_kod_etsng', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Код ЕТСНГ
        {
            field: 'outgoing_cars_epd_vagon_collect_v_kod_gng',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon !== null && row.vagon.collect_v && row.vagon.collect_v.length > 0 && row.vagon.collect_v[0].kod_gng) {
                    return row.vagon.collect_v[0].kod_gng;
                }
                return null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_collect_v_kod_gng', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Код ГНГ 
        {
            field: 'outgoing_cars_epd_vagon_collect_v_vesg',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon != null > 0 && row.vagon.collect_v && row.vagon.collect_v.length > 0 && row.vagon.collect_v[0].vesg) {
                    return Number(row.vagon.collect_v[0].vesg / 1000).toFixed(2);
                }
                return null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_collect_v_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Вес нетто ОТПР, тн
        {
            field: 'outgoing_cars_epd_vagon_u_tara',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon && row.vagon != null > 0 && row.vagon.u_tara) {
                    return Number(row.vagon.u_tara / 1000).toFixed(2);
                }
                return null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_u_tara', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Тара (ут) ОТПР, тн
        {
            field: 'outgoing_cars_epd_vagon_ves_tary_arc',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon && row.vagon != null && row.vagon.ves_tary_arc) {
                    return Number(row.vagon.ves_tary_arc / 1000).toFixed(2);
                }
                return null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_ves_tary_arc', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Тара ОТПР, тн
        {
            field: 'outgoing_cars_epd_vagon_gruzp',
            data: function (row, type, val, meta) {
                if (row && row.vagon && row.vagon && row.vagon != null && row.vagon.gruzp) {
                    return Number(row.vagon.gruzp).toFixed(2);
                }
                return null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_epd_vagon_gruzp', App.Langs), width: "50px", orderable: true, searchable: true
        }, // ГП, тн
        // Груз по прибытию вагона
        {
            field: 'outgoing_cars_arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        }, // Груз ПРИБ
        {
            field: 'outgoing_cars_arrival_uz_vagon_cargo_etsng_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_cargo_etsng_code;
            },
            className: 'dt-body-center arrival',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_cargo_etsng_code', App.Langs), width: "50px", orderable: true, searchable: true
        }, // Код ЕТСНГ ПРИБ
        {
            field: 'outgoing_cars_arrival_uz_vagon_cargo_group_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_group_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        }, // Группа ПРИБ.
        // Ком сертификационные данные
        {
            field: 'outgoing_cars_arrival_uz_vagon_sertification_data',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_sertification_data_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_sertification_data', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Цех получатель
        {
            field: 'outgoing_cars_arrival_uz_vagon_division_code',
            data: function (row, type, val, meta) {
                return row.arrival_uz_vagon_division_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_division_code', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_uz_vagon_name_division',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_name_division_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_name_division', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_uz_vagon_division_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_division_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_division_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Документы накладных УЗ
        {
            field: 'outgoing_cars_arrival_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_document_nom_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_uz_document_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_main_doc < 0 ? langView('ttdr_title_not_epd', App.Langs) : row.arrival_uz_document_nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_document_nom_main_doc', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Станция отправления
        {
            field: 'outgoing_cars_arrival_uz_document_code_stn_from',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_code_stn_from;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_document_code_stn_from', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_uz_document_station_from_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_document_station_from_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_document_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'outgoing_cars_arrival_uz_vagon_condition_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_uz_vagon_condition_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_uz_vagon_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по отправке
        {
            field: 'outgoing_cars_outgoing_uz_vagon_condition_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_condition_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_condition_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_uz_vagon_condition_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_condition_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция примыкания по прибытию
        {
            field: 'outgoing_cars_arrival_sostav_id_station_on',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_id_station_from;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_arrival_sostav_id_station_on', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_sostav_station_on_name',
            data: function (row, type, val, meta) {
                return row['arrival_sostav_station_on_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_outgoing_cars_arrival_sostav_station_on_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_sostav_station_on_abbr',
            data: function (row, type, val, meta) {
                return row['arrival_sostav_station_on_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_arrival_sostav_station_on_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция примыкания по отправлению
        {
            field: 'outgoing_cars_outgoing_sostav_id_station_from',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_id_station_from;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_id_station_from', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_sostav_from_station_amkr_name',
            data: function (row, type, val, meta) {
                return row['outgoing_sostav_from_station_amkr_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-150 operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_from_station_amkr_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_outgoing_sostav_from_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row['outgoing_sostav_from_station_amkr_abbr_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100 operator',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_from_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        //
        {
            field: 'outgoing_cars_outgoing_uz_vagon_laden',
            data: function (row, type, val, meta) {
                return row.outgoing_uz_vagon_laden ? langView('ttdr_title_laden', App.Langs) : langView('ttdr_title_not_laden', App.Langs);
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_outgoing_uz_vagon_laden', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Время предъявления на УЗ
        {
            field: 'outgoing_cars_outgoing_sostav_date_readiness_amkr',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_readiness_amkr ? moment(row.outgoing_sostav_date_readiness_amkr).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_readiness_amkr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Время  осмотра пр-сд
        {
            field: 'outgoing_cars_outgoing_sostav_date_end_inspection_acceptance_delivery',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_end_inspection_acceptance_delivery ? moment(row.outgoing_sostav_date_end_inspection_acceptance_delivery).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_end_inspection_acceptance_delivery', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Время осмотра грузчик
        {
            field: 'outgoing_cars_outgoing_sostav_date_end_inspection_loader',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_end_inspection_loader ? moment(row.outgoing_sostav_date_end_inspection_loader).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_end_inspection_loader', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Время осмотра вагонник
        {
            field: 'outgoing_cars_outgoing_sostav_date_end_inspection_vagonnik',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_end_inspection_vagonnik ? moment(row.outgoing_sostav_date_end_inspection_vagonnik).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_end_inspection_vagonnik', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Время готовности к сдаче на УЗ
        {
            field: 'outgoing_cars_outgoing_sostav_date_readiness_uz',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_readiness_uz ? moment(row.outgoing_sostav_date_readiness_uz).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_outgoing_cars_outgoing_sostav_date_readiness_uz', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Общий простой
        {
            field: 'outgoing_cars_idle_time',
            data: function (row, type, val, meta) {
                return row.idle_time !== null ? getTimeFromMins(row.idle_time) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_idle_time_act',
            data: function (row, type, val, meta) {
                return row.idle_time_act !== null ? getTimeFromMins(row.idle_time_act) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_idle_time_act', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Оплата
        {
            field: 'outgoing_cars_wagon_usage_fee_downtime',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_downtime !== null ? getTimeFromMins(row.wagon_usage_fee_downtime) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_downtime', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_calc_time',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_calc_time !== null ? getTimeFromMins(row.wagon_usage_fee_calc_time * 60) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_calc_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount_final',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_manual_fee_amount !== null ? Number(row.wagon_usage_fee_manual_fee_amount).toFixed(2) : (row.wagon_usage_fee_calc_fee_amount !== null ? Number(row.wagon_usage_fee_calc_fee_amount).toFixed(2) : null);
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_calc_fee_amount_final', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_calc_fee_amount !== null ? Number(row.wagon_usage_fee_calc_fee_amount).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_calc_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_manual_time',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_manual_time !== null ? getTimeFromMins(row.wagon_usage_fee_manual_time) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_manual_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_manual_fee_amount',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_manual_fee_amount !== null ? Number(row.wagon_usage_fee_manual_fee_amount).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_manual_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_sostav_old_date_adoption',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_old_date_adoption ? moment(row.arrival_sostav_old_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_arrival_sostav_old_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_arrival_sostav_old_date_adoption_act',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_old_date_adoption_act ? moment(row.arrival_sostav_old_date_adoption_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_outgoing_cars_arrival_sostav_old_date_adoption_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_note',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_note;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_outgoing_cars_wagon_usage_fee_note', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_create',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_create ? moment(row.wagon_usage_fee_create).format(format_datetime) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_outgoing_cars_wagon_usage_fee_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_create_user',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_create_user;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_outgoing_cars_wagon_usage_fee_create_user', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_change',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_change ? moment(row.wagon_usage_fee_change).format(format_datetime) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_outgoing_cars_wagon_usage_fee_change', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'outgoing_cars_wagon_usage_fee_change_user',
            data: function (row, type, val, meta) {
                return row.wagon_usage_fee_change_user;
            },
            className: 'dt-body-center',
            title: langView('ttdir_field_outgoing_cars_wagon_usage_fee_change_user', App.Langs), width: "100px", orderable: false, searchable: false
        },
        // 
        {
            field: 'usage_fee_sum_calc_time',
            data: function (row, type, val, meta) {
                return row.sum_calc_time != null ? getHourFromMins(row.sum_calc_time) : 0;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_sum_calc_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_wagon_calc_time',
            data: function (row, type, val, meta) {
                return row.sum_calc_time !== null && row.count_wagon ? getHourFromMins(Number(row.sum_calc_time / row.count_wagon)).toFixed(0) : 0;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_wagon_calc_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_sum_calc_fee_amount',
            data: function (row, type, val, meta) {
                return row.sum_calc_fee_amount !== null ? Number(row.sum_calc_fee_amount).toFixed(2) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_sum_calc_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_wagon_calc_fee_amount',
            data: function (row, type, val, meta) {
                return row.sum_calc_fee_amount !== null && row.count_wagon ? Number(row.sum_calc_fee_amount / row.count_wagon).toFixed(2) : 0.00;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_wagon_calc_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_wagon_persent_fee_amount',
            data: function (row, type, val, meta) {
                return row.persent !== null ? Number(row.persent).toFixed(2) : 0.00;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_wagon_persent_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_wagon_persent_derailment_fee_amount',
            data: function (row, type, val, meta) {
                return row.persent_derailment !== null ? Number(row.persent_derailment).toFixed(2) : 0.00;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_wagon_persent_derailment_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_wagon_persent_not_derailment_fee_amount',
            data: function (row, type, val, meta) {
                return row.persent_not_derailment !== null ? Number(row.persent_not_derailment).toFixed(2) : 0.00;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_wagon_persent_not_derailment_fee_amount', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //
        {
            field: 'usage_fee_period_status_input',
            data: function (row, type, val, meta) {
                if (row.usage_fee_period_stop != null) {
                    if (moment().isBefore(row.usage_fee_period_stop)) {
                        return '<i class="fa-solid fa-thumbs-up" style="color:#008000"></i>';
                    } else {
                        return '<i class="fa-solid fa-square-xmark" style="color:#ff6868"></i>';
                    }
                } else {
                    return '<i class="fa-sharp fa-solid fa-cart-plus" style="color:#1b1bff"></i>';
                }
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_period_status_input', App.Langs), width: "20px", orderable: false, searchable: false
        },
        {
            field: 'usage_fee_period_start',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_start ? moment(row.usage_fee_period_start).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_usage_fee_period_start', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_stop',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_stop ? moment(row.usage_fee_period_stop).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_usage_fee_period_stop', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_operator',
            data: function (row, type, val, meta) {
                return row['usage_fee_period_operator_' + App.Lang];
            },
            className: 'dt-body-center shorten mw-200',
            title: langView('ttdr_field_usage_fee_period_operator', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_operator_abbr',
            data: function (row, type, val, meta) {
                return row['usage_fee_period_operator_abbr_' + App.Lang];
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_operator_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_genus_abbr',
            data: function (row, type, val, meta) {
                return row['usage_fee_period_genus_abbr_' + App.Lang];
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_genus_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_rate',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_rate !== null ? Number(row.usage_fee_period_rate).toFixed(2) + ' ' + row['usage_fee_period_derailment_currency_' + App.Lang] : null;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_usage_fee_period_rate', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_rate_derailment',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_rate_derailment !== null ? Number(row.usage_fee_period_rate_derailment).toFixed(2) + ' ' + row['usage_fee_period_derailment_currency_' + App.Lang] : null;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_usage_fee_period_rate_derailment', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_grace_time_1',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_grace_time_1;
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_grace_time_1', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_grace_time_2',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_grace_time_2;
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_grace_time_2', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_coefficient_route',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_coefficient_route;
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_coefficient_route', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_coefficient_not_route',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_coefficient_not_route;
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_coefficient_not_route', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_period_hour_after_30',
            data: function (row, type, val, meta) {
                return row.usage_fee_period_hour_after_30 ? langView('ttdr_title_yes', App.Langs) : '';
            },
            className: 'dt-body-center shorten mw-50',
            title: langView('ttdr_field_usage_fee_period_hour_after_30', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Документ по прибытию
        {
            field: 'arrival_uz_document_nom_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_arrival_uz_document_nom_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'arrival_uz_document_nom_main_doc',
            data: function (row, type, val, meta) {
                return row.arrival_uz_document_nom_main_doc < 0 ? langView('ttdr_title_not_epd', App.Langs) : row.arrival_uz_document_nom_main_doc;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_arrival_uz_document_nom_main_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // usage_fee_outgoing_cars
        {
            field: 'usage_fee_outgoing_cars_arrival_sostav_date_adoption',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption ? moment(row.arrival_sostav_date_adoption).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_usage_fee_outgoing_cars_arrival_sostav_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_arrival_sostav_date_adoption_act',
            data: function (row, type, val, meta) {
                return row.arrival_sostav_date_adoption_act ? moment(row.arrival_sostav_date_adoption_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_usage_fee_outgoing_cars_arrival_sostav_date_adoption_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_arrival_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['arrival_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_usage_fee_outgoing_cars_arrival_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_outgoing_sostav_date_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_outgoing ? moment(row.outgoing_sostav_date_outgoing).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_usage_fee_outgoing_cars_outgoing_sostav_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_outgoing_sostav_date_outgoing_act',
            data: function (row, type, val, meta) {
                return row.outgoing_sostav_date_outgoing_act ? moment(row.outgoing_sostav_date_outgoing_act).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap operator',
            title: langView('ttdr_field_usage_fee_outgoing_cars_outgoing_sostav_date_outgoing_act', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['outgoing_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_usage_fee_outgoing_cars_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_arrival_uz_vagon_route',
            data: function (row, type, val, meta) {
                if (row.arrival_uz_vagon_route !== null) {
                    if (row.arrival_uz_vagon_route) {
                        return langView('ttdr_title_route', App.Langs);
                    } else {
                        return langView('ttdr_title_not_route', App.Langs);
                    }
                } else {
                    return null;
                }
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_outgoing_cars_arrival_uz_vagon_route', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'usage_fee_outgoing_cars_outgoing_sostav_route_sign',
            data: function (row, type, val, meta) {
                if (row.outgoing_sostav_route_sign !== null) {
                    if (row.outgoing_sostav_route_sign) {
                        return langView('ttdr_title_route', App.Langs);
                    } else {
                        return langView('ttdr_title_not_route', App.Langs);
                    }
                } else {
                    return null;
                }
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_usage_fee_outgoing_cars_outgoing_sostav_route_sign', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // № Письма
        {
            field: 'instructional_letters_num',
            data: function (row, type, val, meta) {
                return row.instructional_letters_num;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_instructional_letters_num', App.Langs), width: "30px", orderable: true, searchable: false
        },
        // Дата письма
        {
            field: 'instructional_letters_datetime',
            data: function (row, type, val, meta) {
                return row.instructional_letters_datetime ? moment(row.instructional_letters_datetime).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_instructional_letters_datetime', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Код станции
        {
            field: 'instructional_letters_station_code',
            data: function (row, type, val, meta) {
                return row.instructional_letters_station_code;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_instructional_letters_station_code', App.Langs), width: "30px", orderable: true, searchable: false
        },
        // Станция назначения
        {
            field: 'instructional_letters_station_name',
            data: function (row, type, val, meta) {
                return row.instructional_letters_station_name;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('ttdr_field_instructional_letters_station_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'sap_incoming_supply_kod_r_10',
            data: function (row, type, val, meta) {

                switch (row.sap_incoming_supply_kod_r_10) {
                    case '@5A@':
                    case '@5C@': return "<i class='fas fa-ban' style='color:#ff4d4d;'></i>";
                    case '@5B@': return "<i class='fas fa-check' style='color:#00ce00;'></i>";
                    default: return null;
                }

                //return row.sap_incoming_supply_kod_r_10 != null ? outSAP_KOD_R_10(row.sap_incoming_supply_kod_r_10) : null;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_sap_incoming_supply_kod_r_10', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'wir_note',
            data: function (row, type, val, meta) {
                return row.wir_note;
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('ttdr_field_wir_note', App.Langs), width: "150px", orderable: true, searchable: true
        },
        // Время простоя
        {
            field: 'idle_time',
            data: function (row, type, val, meta) {
                return row.idle_time !== null ? getTimeFromMins(row.idle_time) : null;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'idle_time_act',
            data: function (row, type, val, meta) {
                return row.idle_time_act !== null ? getTimeFromMins(row.idle_time_act) : null;
            },
            className: 'dt-body-right',
            title: langView('ttdr_field_idle_time_act', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // остатки Операторы за период
        {
            field: 'residue_total_operators_operator',
            data: function (row, type, val, meta) {
                return row.operator;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_residue_total_operators_operator', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'residue_total_operators_start',
            data: function (row, type, val, meta) {
                return row.start;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_operators_start', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_operators_arrival',
            data: function (row, type, val, meta) {
                return row.arrival;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_operators_arrival', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_operators_outgoing',
            data: function (row, type, val, meta) {
                return row.outgoing;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_operators_outgoing', App.Langs), width: "30px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_operators_stop',
            data: function (row, type, val, meta) {
                return row.stop;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_operators_stop', App.Langs), width: "30px", orderable: true, searchable: false
        },
        // остаток посуточно
        {
            field: 'residue_total_common_date',
            data: function (row, type, val, meta) {
                return row.date !== null ? moment(row.date).format(format_date) : '';
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_common_date', App.Langs), width: "50px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_common_total',
            data: function (row, type, val, meta) {
                return row.total;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_common_total', App.Langs), width: "50px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_common_external',
            data: function (row, type, val, meta) {
                return row.external;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_common_external', App.Langs), width: "50px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_common_paid',
            data: function (row, type, val, meta) {
                return row.paid;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_common_paid', App.Langs), width: "50px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_common_accounting',
            data: function (row, type, val, meta) {
                return row.accounting;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_common_accounting', App.Langs), width: "50px", orderable: true, searchable: false
        },
        {
            field: 'residue_total_common_amkr',
            data: function (row, type, val, meta) {
                return row.amkr;
            },
            className: 'dt-body-center',
            title: langView('ttdr_field_residue_total_common_amkr', App.Langs), width: "50px", orderable: true, searchable: false
        },
        //
        // Разметка по прибытию
        {
            field: 'residue_total_arrival_condition_abbr',
            data: function (row, type, val, meta) {
                return row.arrival_condition_abbr;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_residue_total_arrival_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Разметка по прибытию
        {
            field: 'residue_total_current_condition_abbr',
            data: function (row, type, val, meta) {
                return row.current_condition_abbr;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_residue_total_current_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_station_amkr_abbr',
            data: function (row, type, val, meta) {
                return row.station_amkr_abbr;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_total_station_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'total_cargo_group_name',
            data: function (row, type, val, meta) {
                return row.cargo_group_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_total_cargo_group_name', App.Langs), width: "100px", orderable: true, searchable: true
        },

        // Груз по отправке предыдущий
        {
            field: 'old_outgoing_uz_vagon_cargo_name',
            data: function (row, type, val, meta) {
                return row['old_outgoing_uz_vagon_cargo_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_old_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Дата последней здачи
        {
            field: 'old_date_outgoing',
            data: function (row, type, val, meta) {
                return row.old_date_outgoing_act ? moment(row.old_date_outgoing_act).format(format_datetime) : (row.old_date_outgoing ? moment(row.old_date_outgoing).format(format_datetime) : null);
            },
            className: 'dt-body-nowrap',
            title: langView('ttdr_field_old_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
        },
        // Станция ОТПР предыдущая
        {
            field: 'old_outgoing_uz_document_station_to_name',
            data: function (row, type, val, meta) {
                return row['old_outgoing_uz_document_station_to_name_' + App.Lang];
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('ttdr_field_old_outgoing_uz_document_station_to_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('ttdr_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('ttdr_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('ttdr_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('ttdr_title_excel_sheet_name', App.Langs),
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
            text: langView('ttdr_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('ttdr_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('ttdr_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('ttdr_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'print',
            extend: 'print',
        },
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        },
    ];

    var pageTotal = 0;
    var id_select = null;          // выбранная строка

    // Показать правильную дату
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + ':' + minutes;
    };
    // Показать Часы
    function getHourFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        return hours;
    };

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_td_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        //this.fc_ui = new FC();
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_td_report.prototype.init_columns_detali = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        return init_columns(collums, list_collums);
    };
    // инициализация полей adoption_sostav
    table_td_report.prototype.init_columns_adoption_sostav = function () {
        var collums = [];
        collums.push({ field: 'adoption_sostav_station', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_wagon', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_account_balance', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_not_operator', title: null, class: null });
        collums.push({ field: 'adoption_sostav_count_return_wagon', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_sostav
    table_td_report.prototype.init_columns_outgoing_sostav = function () {
        var collums = [];
        collums.push({ field: 'outgoing_sostav_station', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_wagon', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_account_balance', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_return_wagon', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // 
    table_td_report.prototype.init_columns_adoption_sostav_detali = function () {
        var collums = [];
        if (this.settings.detali_table) collums.push({ field: 'adoption_sostav_detali_details_control', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_button_view', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_button_print', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_num_doc', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_date_adoption', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_count_wagon', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_count_account_balance', title: null, class: null });
        collums.push({ field: 'adoption_sostav_detali_count_not_operator', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // 
    table_td_report.prototype.init_columns_outgoing_sostav_detali = function () {
        var collums = [];
        if (this.settings.detali_table) collums.push({ field: 'outgoing_sostav_detali_details_control', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_button_view', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_num_doc', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_date_outgoing', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_count_wagon', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_detali_count_account_balance', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей sostav_naturka
    table_td_report.prototype.init_columns_sostav_arrival_naturka = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_from', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_from_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_owner_wagon', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_main_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_vesg', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_code', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_name_division', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });    //TODO: Переделать (убрать otpr)
        collums.push({ field: 'incoming_cars_outgoing_sostav_date_outgoing', title: null, class: null });

        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_gruzp', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_kol_os', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_usl_tip', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_u_tara', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_ves_tary_arc', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_uz', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_vag', title: null, class: null });


        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_start', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_end', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_to', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_station_to_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_shipper', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_shipper_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_code_consignee', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_document_name_consignee', title: null, class: null });


        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_station_amkr_name', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_station_amkr_abbr', title: null, class: null });

        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_commercial_condition', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_sertification_data', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });
        //collums.push({ field: '', title: null, class: null });

        //collums.push({ field: 'adoption_sostav_count_account_balance', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей sostav_naturka
    table_td_report.prototype.init_columns_sostav_outgoing_naturka = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'outgoing_cars_uz_document_nom_doc', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_to_station_uz_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_vesg', title: null, class: null });
        collums.push({ field: 'sostav_outgoing_naturka_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'sostav_outgoing_naturka_arrival_sostav_date_arrival', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_group_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_adm_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_adm_abbr', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_division_code', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_name_division', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_operator', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_start', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_end', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_paid', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_id_limiting', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_wagon_not_operation
    table_td_report.prototype.init_columns_adoption_wagon_not_operation = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_date_adoption', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_cargo_name', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_nom_main_doc', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_nom_doc', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_station_from_name', title: null, class: null });
        collums.push({ field: 'adoption_wagon_not_operation_division_abbr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_common_detali
    table_td_report.prototype.init_columns_adoption_common_detali = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: 'fixed-column' });
        collums.push({ field: 'incoming_cars_arrival_sostav_num_doc', title: null, class: 'fixed-column' }); // +
        collums.push({ field: 'num', title: null, class: 'fixed-column' });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_main_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_nom_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_epd_date_otpr', title: null, class: null });    // дата отправления на АМКР //TODO: Переделать (убрать otpr)
        collums.push({ field: 'incoming_cars_arrival_sostav_date_arrival', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_epd_date_vid', title: null, class: null });     // дата раскредитования //TODO: Переделать (убрать otpr)
        collums.push({ field: 'incoming_cars_arrival_uz_document_name_consignee', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_type', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_gruzp', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_u_tara', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_ves_tary_arc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_vesg', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_deff_vesg', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_from', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_from_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_border_checkpoint', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_border_checkpoint_station_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_cross_time', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_stn_to', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_to_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_etsng_code', title: null, class: null }); // +
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_sertification_data', title: null, class: null });
        collums.push({ field: 'incoming_cars_sap_incoming_supply_cargo_code', title: null, class: null });
        collums.push({ field: 'incoming_cars_sap_incoming_supply_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_group_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_limiting_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_wagon_date_rem_uz', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_shipper', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_shipper_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_commercial_condition', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_station_amkr_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_payer_sender', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_code_payer_arrival', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_document_distance_way', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_pay_summa', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_station_on_abbr', title: null, class: null });
        collums.push({ field: 'old_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'old_date_outgoing', title: null, class: null });
        collums.push({ field: 'old_outgoing_uz_document_station_to_name', title: null, class: null });


        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_common_detali
    table_td_report.prototype.init_columns_outgoing_common_detali = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: 'fixed-column' });
        //
        collums.push({ field: 'num', title: null, class: 'fixed-column' });
        collums.push({ field: 'outgoing_cars_uz_document_nom_doc', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        collums.push({ field: 'outgoing_cars_arrival_sostav_old_date_adoption', title: null, class: null });
        collums.push({ field: 'outgoing_cars_arrival_sostav_old_date_adoption_act', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_outgoing', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_outgoing_act', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_limiting_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_wagon_adm', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_division_abbr', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_epd_vagon_collect_v_name_etsng', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_etsng_name', title: null, class: 'epd' }); //
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_group_name', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_vagon_collect_v_kod_etsng', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_etsng_code', title: null, class: 'epd' }); //
        //collums.push({ field: 'outgoing_cars_epd_route_stn_to', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_route_name_to', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_code_stn_to', title: null, class: 'epd' });   //
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_to_station_uz_name', title: null, class: 'epd' });  //
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_to_inlandrailway_name', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_joint_stn', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_joint_stn_name', title: null, class: 'epd' }); 
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_code_border_checkpoint', title: null, class: 'epd' });    //
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_border_checkpoint_station_name', title: null, class: 'epd' }); // 21
        //21
        //collums.push({ field: 'outgoing_cars_epd_vagon_collect_v_vesg', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_vesg', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_vagon_u_tara', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_u_tara', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_vagon_ves_tary_arc', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_ves_tary_arc', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_vagon_gruzp', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_gruzp', title: null, class: 'epd' });        //
        //
        //collums.push({ field: 'outgoing_cars_epd_client_kod', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_client_name', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_code_consignee', title: null, class: 'epd' }); //
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_consignee_name', title: null, class: 'epd' }); //

        //collums.push({ field: 'outgoing_cars_epd_pl_kod_plat', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_pl_name_plat', title: null, class: 'epd' });
        //collums.push({ field: 'outgoing_cars_epd_distance_way', title: null, class: 'epd' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_code_payer', title: null, class: 'epd' }); // 
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_payer_name', title: null, class: 'epd' }); //
        collums.push({ field: 'outgoing_cars_outgoing_uz_document_distance_way', title: null, class: 'epd' }); //

        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_num', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_cargo_code', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_cargo_name', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_destination_station_code', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_destination_station_name', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_warehouse_code', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_warehouse_name', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_netto', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_responsible_fio', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_arrival_uz_vagon_cargo_name', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_vagon_sertification_data', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_vagon_cargo_etsng_code', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_vagon_cargo_group_name', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_vagon_division_abbr', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_document_nom_main_doc', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_document_nom_doc', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_document_code_stn_from', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_document_station_from_name', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_uz_vagon_condition_abbr', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_arrival_sostav_station_on_abbr', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_condition_abbr', title: null, class: null });
        //26
        //
        //collums.push({ field: 'outgoing_cars_idle_time', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_idle_time_act', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_downtime', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount_final', title: null, class: null });

        //collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_time', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_wagon_usage_fee_manual_time', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_wagon_usage_fee_manual_fee_amount', title: null, class: null });
        //
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_laden', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_from_station_amkr_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_readiness_amkr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_end_inspection_acceptance_delivery', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_end_inspection_loader', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_end_inspection_vagonnik', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_readiness_uz', title: null, class: null }); // 7

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_cargo_operation_amkr
    table_td_report.prototype.init_columns_adoption_cargo_operation_amkr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_limiting_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_operator_to_ar
    table_td_report.prototype.init_columns_adoption_operator_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_limiting_abbr', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_cargo_to_arr
    table_td_report.prototype.init_columns_adoption_cargo_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name', App.Langs), class: null });
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name', App.Langs), class: null });
        collums.push({ field: 'total_certification_data', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_group_cargo_to_arr
    table_td_report.prototype.init_columns_adoption_group_cargo_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_group_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_genus_to_arr
    table_td_report.prototype.init_columns_adoption_genus_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_rod_abbr', title: langView('ttdr_field_genus_vagon', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: null, class: null });
        return init_columns_detali(collums, list_collums);

    };
    // инициализация полей adoption_cargo_sap_to_arr
    table_td_report.prototype.init_columns_adoption_cargo_sap_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_sap_cargo_code', title: null, class: null });
        collums.push({ field: 'total_sap_cargo_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_station_to_arr
    table_td_report.prototype.init_columns_adoption_station_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_station_from_name', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_station_to_arr
    table_td_report.prototype.init_columns_adoption_division_to_arr = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_division_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name', App.Langs), class: null });
        collums.push({ field: 'total_certification_data', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей adoption_station_to_arr
    table_td_report.prototype.init_columns_adoption_to_gs = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name', App.Langs), class: null });
        collums.push({ field: 'total_station_on_name', title: null, class: null });
        collums.push({ field: 'total_division_abbr', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_reweighing', title: null, class: null });
        collums.push({ field: 'total_sum_vesg_deff', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей incoming_outgoing_car
    table_td_report.prototype.init_columns_incoming_outgoing_car = function () {
        var collums = [];
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_name', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_outgoing', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_sostav_date_outgoing_act', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_outgoing_car_simple_car', title: null, class: null });
        //collums.push({ field: 'incoming_outgoing_car_pay_car', title: null, class: null });
        collums.push({ field: 'incoming_outgoing_car_wagon_usage_fee_downtime', title: null, class: null });
        collums.push({ field: 'incoming_outgoing_car_wagon_usage_fee_calc_fee_amount_final', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_route', title: null, class: null });
        collums.push({ field: 'outgoing_cars_outgoing_uz_vagon_division_abbr', title: null, class: null });
        //collums.push({ field: 'incoming_outgoing_car_wir_note', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей incoming_outgoing_car
    table_td_report.prototype.init_columns_list_wagons_rent = function () {
        var collums = [];
        collums.push({ field: 'curr_wagons_rent_operators', title: null, class: null });
        collums.push({ field: 'curr_wagons_rent_limiting_abbr', title: null, class: null });
        collums.push({ field: 'curr_wagons_rent_start', title: null, class: null });
        collums.push({ field: 'curr_wagons_rent_end', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_cargo_operator
    table_td_report.prototype.init_columns_outgoing_cargo_operator = function () {
        var collums = [];
        //collums.push({ field: 'total_period', title: null, class: null });
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_out_group_name', title: null, class: null });
        //collums.push({ field: 'total_cargo_name', title: null, class: null });
        //collums.push({ field: 'total_cargo_out_group_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_cargo_ext_station
    table_td_report.prototype.init_columns_outgoing_cargo_ext_station = function () {
        var collums = [];
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name_out', App.Langs), class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name_out', App.Langs), class: null });
        collums.push({ field: 'total_out_station_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_total_operators
    table_td_report.prototype.init_columns_outgoing_total_operators = function () {
        var collums = [];
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        collums.push({ field: 'total_sum_idle_time', title: null, class: null });
        collums.push({ field: 'total_wagon_idle_time', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей _outgoing_total_operators_cargo
    table_td_report.prototype.init_columns_outgoing_total_operators_cargo = function () {
        var collums = [];
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name_out', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_total_division_metall
    table_td_report.prototype.init_columns_outgoing_total_division_metall = function () {
        var collums = [];
        collums.push({ field: 'total_out_division_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: langView('ttdr_field_total_cargo_name_out', App.Langs), class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name_out', App.Langs), class: null });
        //collums.push({ field: 'total_cargo_out_group_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_note', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей outgoing_total_operators_cargo
    table_td_report.prototype.init_columns_outgoing_total_division_cargo = function () {
        var collums = [];
        collums.push({ field: 'total_out_division_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_out_group_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });
        collums.push({ field: 'total_note', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей init_columns_outgoing_total_cargo_metall
    table_td_report.prototype.init_columns_outgoing_total_cargo_metall = function () {
        var collums = [];
        collums.push({ field: 'total_out_division_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: null, class: null });
        //collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name_out', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей init_columns_outgoing_total_ext_station
    table_td_report.prototype.init_columns_outgoing_total_ext_station = function () {
        var collums = [];
        collums.push({ field: 'total_id', title: null, class: null });
        collums.push({ field: 'total_id_type', title: null, class: null });
        collums.push({ field: 'total_cargo_out_group_name', title: null, class: null });
        collums.push({ field: 'total_station_inlandrailway', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_sum_vesg', title: null, class: null });

        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_cargo = function () {
        var collums = [];
        collums.push({ field: 'total_cargo_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_persent_fee_amount', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_cargo_not_derailment = function () {
        var collums = [];
        collums.push({ field: 'total_cargo_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_persent_not_derailment_fee_amount', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_operator_amkr = function () {
        var collums = [];
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_persent_fee_amount', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_operator_amkr_derailment = function () {
        var collums = [];
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_cargo_name', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_time', title: null, class: null });
        collums.push({ field: 'usage_fee_sum_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'usage_fee_wagon_persent_fee_amount', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_period = function () {
        var collums = [];
        collums.push({ field: 'usage_fee_period_start', title: null, class: null });
        collums.push({ field: 'usage_fee_period_stop', title: null, class: null });
        collums.push({ field: 'usage_fee_period_operator', title: null, class: null });
        collums.push({ field: 'usage_fee_period_operator_abbr', title: null, class: null });
        collums.push({ field: 'usage_fee_period_hour_after_30', title: null, class: null });
        collums.push({ field: 'usage_fee_period_rate', title: null, class: null });
        collums.push({ field: 'usage_fee_period_rate_derailment', title: null, class: null });
        collums.push({ field: 'usage_fee_period_grace_time_1', title: null, class: null });
        collums.push({ field: 'usage_fee_period_grace_time_2', title: null, class: null });
        collums.push({ field: 'usage_fee_period_coefficient_route', title: null, class: null });
        collums.push({ field: 'usage_fee_period_coefficient_not_route', title: null, class: null });
        collums.push({ field: 'usage_fee_period_genus_abbr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_period_select = function () {
        var collums = [];
        collums.push({ field: 'usage_fee_period_status_input', title: null, class: null });
        collums.push({ field: 'usage_fee_period_start', title: null, class: null });
        collums.push({ field: 'usage_fee_period_stop', title: null, class: null });
        collums.push({ field: 'usage_fee_period_operator', title: null, class: null });
        collums.push({ field: 'usage_fee_period_operator_abbr', title: null, class: null });
        collums.push({ field: 'usage_fee_period_hour_after_30', title: null, class: null });
        collums.push({ field: 'usage_fee_period_rate', title: null, class: null });
        collums.push({ field: 'usage_fee_period_rate_derailment', title: null, class: null });
        collums.push({ field: 'usage_fee_period_grace_time_1', title: null, class: null });
        collums.push({ field: 'usage_fee_period_grace_time_2', title: null, class: null });
        collums.push({ field: 'usage_fee_period_coefficient_route', title: null, class: null });
        collums.push({ field: 'usage_fee_period_coefficient_not_route', title: null, class: null });
        collums.push({ field: 'usage_fee_period_genus_abbr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_usage_fee_outgoing_cars = function () {
        var collums = [];
        collums.push({ field: 'usage_fee_outgoing_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_sostav_date_outgoing', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_sostav_date_outgoing_act', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        //collums.push({ field: 'usage_fee_outgoing_cars_arrival_uz_vagon_route', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_sostav_route_sign', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_downtime', title: null, class: null });
        //collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount_final', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_time', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_manual_time', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_manual_fee_amount', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_note', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_create', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_create_user', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_change', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_change_user', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_manual_usage_fee = function () {
        var collums = [];

        collums.push({ field: 'num', title: null, class: 'fixed-column' });
        collums.push({ field: 'arrival_uz_document_nom_main_doc', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_arrival_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_sostav_date_outgoing', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_sostav_date_outgoing_act', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_uz_vagon_cargo_name', title: null, class: null });
        //collums.push({ field: 'usage_fee_outgoing_cars_arrival_uz_vagon_route', title: null, class: null });
        collums.push({ field: 'usage_fee_outgoing_cars_outgoing_sostav_route_sign', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_downtime', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_calc_fee_amount', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_manual_time', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_manual_fee_amount', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_note', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_change', title: null, class: null });
        collums.push({ field: 'outgoing_cars_wagon_usage_fee_change_user', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_operation_balance = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: 'fixed-column' });
        collums.push({ field: 'num', title: null, class: 'fixed-column' });
        collums.push({ field: 'arrival_uz_document_nom_main_doc', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_arrival_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'current_wagons_rent_operator_abbr', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_condition_abbr', title: null, class: 'common' });
        collums.push({ field: 'current_condition_abbr', title: null, class: 'common' });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_rod_abbr', title: null, class: 'common' });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_gruzp', title: null, class: 'common' });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_type', title: null, class: 'common' });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_cargo_name', title: null, class: 'arrival' });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_sertification_data', title: null, class: 'arrival' });
        collums.push({ field: 'incoming_cars_arrival_uz_document_station_from_name', title: null, class: 'arrival' });
        collums.push({ field: 'incoming_cars_arrival_uz_vagon_division_abbr', title: null, class: 'arrival' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_cargo_name', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_destination_station_name', title: null, class: 'sap' });
        collums.push({ field: 'outgoing_cars_sap_outgoing_supply_warehouse_name', title: null, class: 'sap' });
        //....
        // Груз ОТПР
        // Станция назначения
        // Цех ПОГР
        //....
        collums.push({ field: 'current_station_amkr_abbr', title: null, class: null });
        collums.push({ field: 'current_way_and_outer_way_name', title: null, class: null });
        //collums.push({ field: 'current_outer_way_name', title: null, class: null });
        //....
        // Операция с ваг.
        // Состояние ваг.
        //....
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption', title: null, class: null });
        collums.push({ field: 'incoming_cars_arrival_sostav_date_adoption_act', title: null, class: null });
        //....
        collums.push({ field: 'idle_time', title: null, class: null });
        collums.push({ field: 'idle_time_act', title: null, class: null });
        //....
        collums.push({ field: 'sap_incoming_supply_kod_r_10', title: null, class: null });
        collums.push({ field: 'wir_note', title: null, class: null });
        collums.push({ field: 'instructional_letters_num', title: null, class: 'letter' });
        collums.push({ field: 'instructional_letters_datetime', title: null, class: 'letter' });
        collums.push({ field: 'instructional_letters_station_code', title: null, class: 'letter' });
        collums.push({ field: 'instructional_letters_station_name', title: null, class: 'letter' });

        collums.push({ field: 'old_outgoing_uz_vagon_cargo_name', title: null, class: null });
        collums.push({ field: 'old_date_outgoing', title: null, class: null });
        collums.push({ field: 'old_outgoing_uz_document_station_to_name', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_residue_total_operators = function () {
        var collums = [];
        collums.push({ field: 'residue_total_operators_operator', title: null, class: null });
        collums.push({ field: 'residue_total_operators_start', title: null, class: null });
        collums.push({ field: 'residue_total_operators_arrival', title: null, class: null });
        collums.push({ field: 'residue_total_operators_outgoing', title: null, class: null });
        collums.push({ field: 'residue_total_operators_stop', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //
    table_td_report.prototype.init_columns_residue_total_common = function () {
        var collums = [];
        collums.push({ field: 'residue_total_common_date', title: null, class: null });
        collums.push({ field: 'residue_total_common_total', title: null, class: null });
        collums.push({ field: 'residue_total_common_external', title: null, class: null });
        collums.push({ field: 'residue_total_common_paid', title: null, class: null });
        collums.push({ field: 'residue_total_common_accounting', title: null, class: null });
        collums.push({ field: 'residue_total_common_amkr', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей residue_total_markup_arr
    table_td_report.prototype.init_columns_residue_total_markup_arr = function () {
        var collums = [];
        collums.push({ field: 'residue_total_arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей residue_total_markup_curr
    table_td_report.prototype.init_columns_residue_total_markup_curr = function () {
        var collums = [];
        collums.push({ field: 'residue_total_current_condition_abbr', title: null, class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей _outgoing_total_operators_cargo
    table_td_report.prototype.init_columns_residue_total_markup_arr_operator = function () {
        var collums = [];
        collums.push({ field: 'total_operator_abbr', title: null, class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name_condition', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей residue_total_genus
    table_td_report.prototype.init_columns_residue_total_genus = function () {
        var collums = [];
        collums.push({ field: 'total_rod_abbr', title: langView('ttdr_field_genus_vagon', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей residue_total_genus_station_amkr
    table_td_report.prototype.init_columns_residue_total_genus_station_amkr = function () {
        var collums = [];
        collums.push({ field: 'total_station_amkr_abbr', title: null, class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_name_genus', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей residue_total_station_out
    table_td_report.prototype.init_columns_residue_total_station_out = function () {
        var collums = [];
        collums.push({ field: 'total_cargo_group_name', title: null, class: null });
        collums.push({ field: 'total_group_name', title: langView('ttdr_field_total_group_ext_station_from', App.Langs), class: null });
        collums.push({ field: 'total_count_wagon', title: null, class: null });
        collums.push({ field: 'total_perent_wagon', title: '%', class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_td_report.prototype.init_button_detali = function () {
        var buttons = [];
        //buttons.push({ name: 'export', action: null });
        //buttons.push({ name: 'field', action: null });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок adoption_sostav
    table_td_report.prototype.init_button_adoption_sostav = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_sostav = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_sostav_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_sostav_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок sostav_arrival_naturka
    table_td_report.prototype.init_button_sostav_arrival_naturka = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок sostav_outgoing_naturka
    table_td_report.prototype.init_button_sostav_outgoing_naturka = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок adoption_wagon_not_operation
    table_td_report.prototype.init_button_adoption_wagon_not_operation = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_common_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_common_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_cargo_operation_amkr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_operator_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_cargo_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_group_cargo_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_genus_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_cargo_sap_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_station_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_division_to_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_adoption_to_gs = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_incoming_outgoing_car = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_list_wagons_rent = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_cargo_operator = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_cargo_ext_station = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_total_operators = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_total_operators_cargo = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_total_division_metall = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_total_division_cargo = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_total_cargo_metall = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_outgoing_total_ext_station = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_usage_fee_cargo = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_usage_fee_cargo_not_derailment = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_usage_fee_operator_amkr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_usage_fee_period = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_usage_fee_period_select = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_usage_fee_outgoing_cars = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_manual_usage_fee = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_operation_balance = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_residue_total_operators = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    //
    table_td_report.prototype.init_button_residue_total_common = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //
    table_td_report.prototype.init_button_residue_total_markup_arr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //
    table_td_report.prototype.init_button_residue_total_markup_curr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //
    table_td_report.prototype.init_button_residue_total_markup_arr_operator = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //
    table_td_report.prototype.init_button_residue_total_genus = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //
    table_td_report.prototype.init_button_residue_total_genus_station_amkr = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //
    table_td_report.prototype.init_button_residue_total_station_out = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    }
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_td_report.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_sostav();
                this.table_buttons = this.init_button_adoption_sostav();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_sostav': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = false;
                this.table_columns = this.init_columns_outgoing_sostav();
                this.table_buttons = this.init_button_outgoing_sostav();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_sostav_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [2, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_sostav_detali();
                this.table_buttons = this.init_button_adoption_sostav_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_sostav_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [2, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_outgoing_sostav_detali();
                this.table_buttons = this.init_button_outgoing_sostav_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'sostav_arrival_naturka': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 20;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_sostav_arrival_naturka();
                this.table_buttons = this.init_button_sostav_arrival_naturka();
                this.dom = 'B<"float-left"f>rtip';
                break;
            };
            case 'sostav_outgoing_naturka': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 20;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_sostav_outgoing_naturka();
                this.table_buttons = this.init_button_sostav_outgoing_naturka();
                this.dom = 'B<"float-left"f>rtip';
                break;
            };
            case 'adoption_wagon_not_operation': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_wagon_not_operation();
                this.table_buttons = this.init_button_adoption_wagon_not_operation();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_common_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 3;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0;          // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_adoption_common_detali();
                this.table_buttons = this.init_button_adoption_common_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_common_detali': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 2;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_outgoing_common_detali();
                this.table_buttons = this.init_button_outgoing_common_detali();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_cargo_operation_amkr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_cargo_operation_amkr();
                this.table_buttons = this.init_button_adoption_cargo_operation_amkr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_operator_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [3, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_operator_to_arr();
                this.table_buttons = this.init_button_adoption_operator_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_cargo_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 0 }];
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_cargo_to_arr();
                this.table_buttons = this.init_button_adoption_cargo_to_arr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;

                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td class="total-value">' + sum_vesg_reweighing.toFixed(2) + '</td><td class="total-value">' + sum_vesg_deff.toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="6">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                sum_vesg_reweighing = group.sum_vesg_reweighing > 0 ? group.sum_vesg_reweighing / 1000 : 0;
                                sum_vesg_deff = group.sum_vesg_deff > 0 ? group.sum_vesg_deff / 1000 : 0;

                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                sum_vesg_reweighing += group.sum_vesg_reweighing > 0 ? group.sum_vesg_reweighing / 1000 : 0;
                                sum_vesg_deff += group.sum_vesg_deff > 0 ? group.sum_vesg_deff / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td class="total-value">' + sum_vesg_reweighing.toFixed(2) + '</td><td class="total-value">' + sum_vesg_deff.toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'adoption_group_cargo_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_group_cargo_to_arr();
                this.table_buttons = this.init_button_adoption_group_cargo_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_genus_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [2, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_genus_to_arr();
                this.table_buttons = this.init_button_adoption_genus_to_arr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    var total = api
                        .column(2)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    api
                        .data()
                        .each(function (group, i) {
                            var persent = Number((group.count_wagon * 100) / total).toFixed(2);
                            //var ro = $(rows).eq(i);
                            $('td', $(rows).eq(i)).eq(3).text(persent);
                        });
                };
                break;
            };
            case 'adoption_cargo_sap_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_cargo_sap_to_arr();
                this.table_buttons = this.init_button_adoption_cargo_sap_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_station_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_station_to_arr();
                this.table_buttons = this.init_button_adoption_station_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_division_to_arr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_division_to_arr();
                this.table_buttons = this.init_button_adoption_division_to_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'adoption_to_gs': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                //this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_adoption_to_gs();
                this.table_buttons = this.init_button_adoption_to_gs();
                this.dom = 'Bfrtip';
                break;
            };
            case 'incoming_outgoing_car': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [4, 'desc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = true;
                this.table_columns = this.init_columns_incoming_outgoing_car();
                this.table_buttons = this.init_button_incoming_outgoing_car();
                this.dom = 'Bfrtip';
                break;
            };
            case 'list_wagons_rent': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_list_wagons_rent();
                this.table_buttons = this.init_button_list_wagons_rent();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_cargo_operator': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                //this.columnDefs = [{ visible: false, targets: 3 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_cargo_operator();
                this.table_buttons = this.init_button_outgoing_cargo_operator();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;

                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.cargo_out_group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="4">' + group.cargo_out_group_name + '</td></tr>');
                                last = group.cargo_out_group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'outgoing_cargo_ext_station': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_cargo_ext_station();
                this.table_buttons = this.init_button_outgoing_cargo_ext_station();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;

                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="4">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'outgoing_total_operators': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_outgoing_total_operators();
                this.table_buttons = this.init_button_outgoing_total_operators();
                this.dom = 'Bfrtip';
                break;
            };
            case 'outgoing_total_operators_cargo': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_total_operators_cargo();
                this.table_buttons = this.init_button_outgoing_total_operators_cargo();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var sum_persent = 0;

                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="5">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                sum_persent = group.perent_wagon ? Number(group.perent_wagon) : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                sum_persent += group.perent_wagon ? Number(group.perent_wagon) : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                    };
                };
                break;
            };
            case 'outgoing_total_division_metall': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 2 }];
                this.order_column = [2, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_total_division_metall();
                this.table_buttons = this.init_button_outgoing_total_division_metall();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last_group = null;
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var count_group = 0;
                    var sum_vesg_group = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };
                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.cargo_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="type-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td></td></tr>');
                                }
                                last = group.cargo_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            }
                            //
                            if (last_group !== group.group_name) {
                                // Подведем итог
                                if (last_group !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="2">' + last_group + ' ИТОГО:</td><td class="total-count">' + count_group + '</td><td class="total-value">' + sum_vesg_group.toFixed(2) + '</td><td></td></tr>')

                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="5">' + group.group_name + '</td></tr>');
                                last_group = group.group_name;
                                count_group = group.count_wagon;
                                sum_vesg_group = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count_group += group.count_wagon;
                                sum_vesg_group += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="2">' + last_group + ' ИТОГО:</td><td class="total-count">' + count_group + '</td><td class="total-value">' + sum_vesg_group.toFixed(2) + '</td><td></td></tr>')
                            .after('<tr class="type-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td></td></tr>')
                    };
                };
                break;
            };
            case 'outgoing_total_division_cargo': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                //this.columnDefs = [{ visible: false, targets: 2 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_total_division_cargo();
                this.table_buttons = this.init_button_outgoing_total_division_cargo();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };
                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.cargo_out_group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td></td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="5">' + group.cargo_out_group_name + '</td></tr>');
                                last = group.cargo_out_group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="2">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td><td></td></tr>');
                    };
                };
                break;
            };
            case 'outgoing_total_cargo_metall': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 0 }];
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_total_cargo_metall();
                this.table_buttons = this.init_button_outgoing_total_cargo_metall();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };
                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.division_abbr) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="3">' + group.division_abbr + '</td></tr>');
                                last = group.division_abbr;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="total-value">' + sum_vesg.toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'outgoing_total_ext_station': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: [0, 1] }];
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_outgoing_total_ext_station();
                this.table_buttons = this.init_button_outgoing_total_ext_station();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var last_id = null;
                    var last_id_type = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var count_group = 0;
                    var sum_vesg_group = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };
                    var getIDType = function (id_type) {
                        switch (id_type) {
                            case 0: { return 'по Украине'; }
                            case 1: { return 'экспорт порты'; }
                            case 2: { return 'страны СНГ и Балтии'; }
                            case 3: { return 'дальние зарубежье'; }
                            default: { return ''; }
                        }
                    }
                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last_id !== group.id) {
                                // Подведем итог
                                if (last_id !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total-' + last_id_type + '"><td class="total-text-type" colspan="2">Итого ' + last + ' ' + getIDType(last_id_type) + ':</td><td class="total-count-type">' + count + '</td><td class="total-value-type">' + sum_vesg.toFixed(2) + '</td></tr>');
                                }
                                if (last !== group.cargo_out_group_name) {
                                    if (last_id !== null) {
                                        $(rows)
                                            .eq(i)
                                            .before('<tr class="group-total"><td class="total-text-type" colspan="2">ИТОГО ' + last + ':</td><td class="total-count-type">' + count_group + '</td><td class="total-value-type">' + sum_vesg_group.toFixed(2) + '</td></tr>');
                                        count_group = 0;
                                        sum_vesg_group = 0;
                                        //count_group = group.count_wagon;
                                        //sum_vesg_group = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                                    }
                                    // Заглавие новой группы
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group"><td colspan="4">' + group.cargo_out_group_name + '</td></tr>');
                                }

                                last_id = group.id;
                                last_id_type = group.id_type;
                                last = group.cargo_out_group_name;
                                count = group.count_wagon;
                                sum_vesg = group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                            } else {
                                count += group.count_wagon;
                                sum_vesg += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;

                            }
                            count_group += group.count_wagon;
                            sum_vesg_group += group.sum_vesg > 0 ? group.sum_vesg / 1000 : 0;
                        });
                    // Последнее итого
                    if (last_id !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text-type" colspan="2">ИТОГО ' + last + ':</td><td class="total-count-type">' + count_group + '</td><td class="total-value-type">' + sum_vesg_group.toFixed(2) + '</td></tr>')
                            .after('<tr class="group-total' + last_id_type + '"><td class="total-text-type" colspan="2">Итого ' + last + ' ' + getIDType(last_id_type) + ':</td><td class="total-count-type">' + count + '</td><td class="total-value-type">' + sum_vesg.toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'usage_fee_cargo': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [6, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_cargo();
                this.table_buttons = this.init_button_usage_fee_cargo();
                this.dom = 'Bfrtip';
                break;
            };
            case 'usage_fee_cargo_not_derailment': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [6, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_cargo_not_derailment();
                this.table_buttons = this.init_button_usage_fee_cargo_not_derailment();
                this.dom = 'Bfrtip';
                break;
            };
            case 'usage_fee_operator_amkr': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_operator_amkr();
                this.table_buttons = this.init_button_usage_fee_operator_amkr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_usage_fee_sum_calc_time = 0;
                    var sum_usage_fee_sum_calc_fee_amount = 0;
                    var sum_usage_fee_wagon_persent_fee_amount = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };
                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.cargo_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text">' + last + ':</td><td class="total-count">' + count + '</td><td class="total-count">' + getHourFromMins(sum_usage_fee_sum_calc_time) + '</td><td class="total-count">' + getHourFromMins(Number(sum_usage_fee_sum_calc_time / count)).toFixed(0) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount / count).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="7">' + group.cargo_name + '</td></tr>');
                                last = group.cargo_name;
                                count = group.count_wagon;
                                sum_usage_fee_sum_calc_time = group.sum_calc_time;
                                sum_usage_fee_sum_calc_fee_amount = group.sum_calc_fee_amount;
                                sum_usage_fee_wagon_persent_fee_amount = group.persent;
                            } else {
                                count += group.count_wagon;
                                sum_usage_fee_sum_calc_time += group.sum_calc_time;
                                sum_usage_fee_sum_calc_fee_amount += group.sum_calc_fee_amount;
                                sum_usage_fee_wagon_persent_fee_amount += group.persent;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text">' + last + ':</td><td class="total-count">' + count + '</td><td class="total-count">' + getHourFromMins(sum_usage_fee_sum_calc_time) + '</td><td class="total-count">' + getHourFromMins(Number(sum_usage_fee_sum_calc_time / count)).toFixed(0) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount / count).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'usage_fee_operator_amkr_derailment': {
                //this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = -1;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_operator_amkr_derailment();
                this.table_buttons = this.init_button_usage_fee_operator_amkr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_usage_fee_sum_calc_time = 0;
                    var sum_usage_fee_sum_calc_fee_amount = 0;
                    var sum_usage_fee_wagon_persent_fee_amount = 0;


                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.cargo_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text">' + last + ':</td><td class="total-count">' + count + '</td><td class="total-count">' + getHourFromMins(sum_usage_fee_sum_calc_time) + '</td><td class="total-count">' + getHourFromMins(Number(sum_usage_fee_sum_calc_time / count)).toFixed(0) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount / count).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(2) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="7">' + group.cargo_name + '</td></tr>');
                                last = group.cargo_name;
                                count = group.count_wagon;
                                sum_usage_fee_sum_calc_time = group.sum_calc_time;
                                sum_usage_fee_sum_calc_fee_amount = group.sum_calc_fee_amount;
                                sum_usage_fee_wagon_persent_fee_amount = group.persent;
                            } else {
                                count += group.count_wagon;
                                sum_usage_fee_sum_calc_time += group.sum_calc_time;
                                sum_usage_fee_sum_calc_fee_amount += group.sum_calc_fee_amount;
                                sum_usage_fee_wagon_persent_fee_amount += group.persent;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text">' + last + ':</td><td class="total-count">' + count + '</td><td class="total-count">' + getHourFromMins(sum_usage_fee_sum_calc_time) + '</td><td class="total-count">' + getHourFromMins(Number(sum_usage_fee_sum_calc_time / count)).toFixed(0) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_sum_calc_fee_amount / count).toFixed(2) + '</td><td class="total-count">' + Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(2) + '</td></tr>');
                    };
                };
                break;
            };
            case 'usage_fee_period': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_period();
                this.table_buttons = this.init_button_usage_fee_period();
                this.dom = 'Bfrtip';
                break;
            };
            case 'usage_fee_period_select': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false; // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 2; // Выбирать одну
                this.table_select = {
                    style: 'multi ',
                };
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_period_select();
                this.table_buttons = this.init_button_usage_fee_period_select();
                this.dom = 'Bfrtip';
                break;
            };
            case 'usage_fee_outgoing_cars': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [3, 'desc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.autoWidth = true;
                this.table_columns = this.init_columns_usage_fee_outgoing_cars();
                this.table_buttons = this.init_button_usage_fee_outgoing_cars();
                this.dom = 'Bfrtip';
                break;
            };
            case 'manual_usage_fee': {
                this.lengthMenu = [[10, 20, -1], [10, 20, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 1;
                this.columnDefs = null;
                this.order_column = [3, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_manual_usage_fee();
                this.table_buttons = this.init_button_manual_usage_fee();
                this.dom = 'Bfrtip';
                break;
            };
            case 'operation_balance': {
                this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                this.pageLength = 10;
                this.deferRender = true;
                this.paging = true;
                this.searching = true;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = true;            // вкл. фикс. заголовка
                this.leftColumns = 2;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_operation_balance();
                this.table_buttons = this.init_button_operation_balance();
                this.dom = 'Bfrtip';
                break;
            };
            case 'residue_total_operators': {
                //this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_residue_total_operators();
                this.table_buttons = this.init_button_residue_total_operators();
                this.dom = 'Bfrtip';
                break;
            };
            case 'residue_total_common': {
                //this.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('ttdr_title_all', App.Langs)]];
                //this.pageLength = 10;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = true;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_residue_total_common();
                this.table_buttons = this.init_button_residue_total_common();
                this.dom = 'Bfrtip';
                break;
            };
            case 'residue_total_markup_arr': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_residue_total_markup_arr();
                this.table_buttons = this.init_button_residue_total_markup_arr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'residue_total_markup_curr': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_residue_total_markup_curr();
                this.table_buttons = this.init_button_residue_total_markup_curr();
                this.dom = 'Bfrtip';
                break;
            };
            case 'residue_total_markup_operator': {
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_residue_total_markup_arr_operator();
                this.table_buttons = this.init_button_residue_total_markup_arr_operator();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_vesg = 0;
                    var sum_persent = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="4">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_persent = group.perent_wagon ? Number(group.perent_wagon) : 0;
                            } else {
                                count += group.count_wagon;
                                sum_persent += group.perent_wagon ? Number(group.perent_wagon) : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                    };
                };
                break;
            };
            case 'residue_total_genus': {
                this.lengthMenu = null;
                this.pageLength = null;
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = true;
                this.info = false;
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = null;
                this.order_column = [1, 'desc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = false;
                this.table_columns = this.init_columns_residue_total_genus();
                this.table_buttons = this.init_button_residue_total_genus();
                this.dom = 'Bfrtip';
                break;
            };
            case 'residue_total_genus_station_amkr': {
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_residue_total_genus_station_amkr();
                this.table_buttons = this.init_button_residue_total_genus_station_amkr();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_persent = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="4">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_persent = group.perent_wagon ? Number(group.perent_wagon) : 0;
                            } else {
                                count += group.count_wagon;
                                sum_persent += group.perent_wagon ? Number(group.perent_wagon) : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                    };
                };
                break;
            };
            case 'residue_total_station_out': {
                this.deferRender = true;
                this.paging = false;
                this.searching = false;
                this.ordering = false;
                this.info = true;
                this.fixedHeader = false;   // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.columnDefs = [{ visible: false, targets: 1 }];
                this.order_column = [1, 'asc'];
                this.type_select_rows = 0; // Выбирать одну
                this.table_select = false;
                this.autoWidth = true;
                this.table_columns = this.init_columns_residue_total_station_out();
                this.table_buttons = this.init_button_residue_total_station_out();
                this.dom = 'Bfrtip';
                this.drawCallback = function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var count = 0;
                    var sum_persent = 0;
                    var intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    api
                        //.column(1, { page: 'current' })
                        .data()
                        .each(function (group, i) {
                            if (last !== group.group_name) {
                                // Подведем итог
                                if (last !== null) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                                }
                                // Заглавие новой группы
                                $(rows)
                                    .eq(i)
                                    .before('<tr class="group"><td colspan="4">' + group.group_name + '</td></tr>');
                                last = group.group_name;
                                count = group.count_wagon;
                                sum_persent = group.perent_wagon ? Number(group.perent_wagon) : 0;
                            } else {
                                count += group.count_wagon;
                                sum_persent += group.perent_wagon ? Number(group.perent_wagon) : 0;
                            }
                        });
                    // Последнее итого
                    if (last !== null) {
                        $(rows)
                            .last()
                            .after('<tr class="group-total"><td class="total-text" colspan="1">' + last + ' ИТОГО:</td><td class="total-count">' + count + '</td><td class="persent-value">' + sum_persent.toFixed(1) + '</td></tr>');
                    };
                };
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
    table_td_report.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        LockScreen(langView('ttdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            detali_table: false,
            type_report: null,     // 
            link_num: false,
            ids_wsd: null,
            fn_init: null,
            fn_select_rows: null,
            fn_action_view_wagons: null,
        }, options);
        //
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.lengthMenu = null;
        this.pageLength = null;
        this.deferRender = true;
        this.paging = false;
        this.searching = false;
        this.ordering = false;
        this.info = false;
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.columnDefs = null;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.drawCallback = null;
        this.footerCallback = null;
        this.autoWidth = false;
        this.table_columns = [];
        this.table_buttons = [];
        this.dom = 'Bfrtip';

        this.init_type_report();
        this.data = [];
        this.selected_rows = null;
        this.tables_detali = [];                    // Массив таблиц детально
        //----------------------------------
        // Создать макет таблицы
        var table_report = new this.fe_ui.table({
            id: 'tab-tdr-' + this.selector,
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        if (this.settings.type_report === 'adoption_sostav') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_sostav') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_sostav_detali') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_sostav_detali') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_common_detali') {
            this.$table_report = table_report.$table.append($('<tfoot>' +
                '<tr><th class="dt-right">Всего:</th><td class="dt-centr"></td><th colspan="16" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr" colspan="26"></td></tr>' +
                //'<tr><th class="dt-right">Всего:</th><td class="dt-centr"></td><th colspan="15" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr" colspan="25"></td></tr>' +
                '</tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_common_detali') {
            this.$table_report = table_report.$table.append($('<tfoot>' +
                '<tr><th class="dt-right">Всего:</th><td class="dt-centr"></td><th colspan="20" class="dt-right">ИТОГО:</th>' +
                //'<td class="dt-centr"></td><td class="dt-centr"></td>' +
                //'<td class="dt-centr"></td><td class="dt-centr"></td>' +
                '<td class="dt-centr"></td><td class="dt-centr"></td>' +
                '<td class="dt-centr"></td><td class="dt-centr"></td>' +
                '<td class="dt-centr" colspan="25"></td>' +
                '<td class="dt-centr"></td>' +
                //'<td class="dt-centr"></td>' +
                '<td class="dt-centr"></td>' +
                '<td class="dt-centr"></td>' +
                '<td class="dt-centr" colspan="7"></td></tr > ' +
                '</tfoot > '));
        }
        if (this.settings.type_report === 'adoption_cargo_operation_amkr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_operator_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_cargo_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right"></th><th class="dt-right"></th><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_group_cargo_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="1" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_genus_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="1" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_cargo_sap_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_station_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_division_to_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'adoption_to_gs') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="3" class="dt-right">ИТОГО:</th><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_cargo_operator') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_cargo_ext_station') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><td></td><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_total_division_metall') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><td></td><th colspan="2" class="dt-right">ИТОГО ЧЕРНЫЕ МЕТАЛЛЫ:</th><td class="dt-centr"></td><td class="dt-right"></td><td></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_total_division_cargo') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td><td></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_total_cargo_metall') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><td></td><th class="dt-right">ЧЕРНЫЕ МЕТАЛЛЫ:</th><td class="dt-centr"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_total_operators') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_total_operators_cargo') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td><td></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'outgoing_total_ext_station') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-right"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'usage_fee_cargo') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'usage_fee_cargo_not_derailment') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'usage_fee_operator_amkr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right" colspan="2">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'usage_fee_operator_amkr_derailment') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right" colspan="2">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-right"></td><td class="dt-right"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_operators') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_common') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">Ср. остаток:</th><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_markup_arr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_markup_curr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_markup_operator') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_genus') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_genus_station_amkr') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        if (this.settings.type_report === 'residue_total_station_out') {
            this.$table_report = table_report.$table.append($('<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><td class="dt-centr"></td><td class="dt-centr"></td></tr></tfoot>'));
        }
        this.$table_report = table_report.$table;
        this.$td_report.addClass('table-report').append(this.$table_report);
        // Инициализируем таблицу
        this.obj_t_report = this.$table_report.DataTable({
            "lengthMenu": this.lengthMenu,
            "pageLength": this.pageLength,
            "deferRender": this.deferRender,
            "paging": this.paging,
            "searching": this.searching,
            "ordering": this.ordering,
            "info": this.info,
            "keys": true,
            columnDefs: this.columnDefs,
            colReorder: true,                       // вкл. перетаскивание полей
            fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
            fixedColumns: {
                leftColumns: this.leftColumns,
            },
            select: this.table_select,
            "autoWidth": this.autoWidth,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            scrollX: true,
            /*            sScrollXInner: "100%",*/
            //"responsive": true,
            //"bAutoWidth": false,
            //order: this.order_column,
            language: language_table(App.Langs),
            jQueryUI: false,
            drawCallback: this.drawCallback,
            "createdRow": function (row, data, index) {
                switch (this.settings.type_report) {
                    case 'adoption_sostav': {
                        if (data.type === 0) {

                        } else {
                            $(row).addClass('yellow');
                        }
                        break;
                    };
                    case 'outgoing_sostav': {
                        if (data.type === 0) {

                        } else {
                            $(row).addClass('yellow');
                        }
                        break;
                    };
                    case 'incoming_outgoing_car': {

                        if (data.arrival_uz_vagon_cargo_returns) {
                            $(row).addClass('blue');
                        }
                        if (data.wir_highlight_color !== null) {
                            $(row).addClass('red');
                            //$(row).attr('style', 'background-color:' + data.wir_highlight_color + ' !important;');
                        }
                        break;
                    };
                    case 'outgoing_common_detali': {
                        if (data.arrival_uz_vagon_cargo_returns) {
                            $(row).addClass('red');
                        }
                        break;
                    };
                    case 'usage_fee_outgoing_cars': {
                        $(row).attr('id', data.outgoing_car_id);
                        break;
                    };
                };
            }.bind(this),
            footerCallback: this.footerCallback,
            columns: this.table_columns,
            dom: this.dom,
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'outgoing_sostav': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'adoption_sostav_detali': {
                // Инициализация модуля "Отчет принятых составов"
                this.view_incoming_report = new VICR();
                this.view_incoming_report.init({
                    alert: null,
                    ids_wsd: this.ids_wsd,
                });
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                // Настроим ссылку на прибытие
                this.$table_report.find('tbody').on('tbody click', 'button.arrival-button', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var data = this.obj_t_report.row($(e.currentTarget).parents('tr')).data();
                    if (data) {
                        var date = moment(data.date_arrival)
                        date = date.format('YYYY-MM-DD[T]HH:mm:ss');
                        window.open(url_incoming + '?id_arrival=' + data.id + '&arrival=' + date, '', '');
                    }

                }.bind(this));
                this.$table_report.find('tbody').on('tbody click', 'button.arrival-button-prn', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var data = this.obj_t_report.row($(e.currentTarget).parents('tr')).data();
                    if (data) {
                        this.view_incoming_report.fst(data.id)
                    }

                }.bind(this));
                if (this.settings.detali_table) this.init_arrival_detali();
                break;
            };
            case 'outgoing_sostav_detali': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                // Настроим ссылку на прибытие
                this.$table_report.find('tbody').on('tbody click', 'button.outgoing-button', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var data = this.obj_t_report.row($(e.currentTarget).parents('tr')).data();
                    if (data) {
                        var date = moment(data.date_readiness_amkr)
                        date = date.format('YYYY-MM-DD[T]HH:mm:ss');
                        window.open(url_outgoing + '?id=' + data.id + '&readiness=' + date, '', '');
                    }
                }.bind(this));
                if (this.settings.detali_table) this.init_outgoing_detali();
                break;
            };
            case 'incoming_outgoing_car': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'usage_fee_outgoing_cars': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
            case 'usage_fee_period_select': {
                this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                    this.select_rows(); // определим строку
                    this.enable_button();
                    // Обработать событие выбрана строка
                    if (typeof this.settings.fn_select_rows === 'function') {
                        this.settings.fn_select_rows(this.selected_rows);
                    }
                }.bind(this));
                break;
            };
        };
        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Выбрано
    table_td_report.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_td_report.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'adoption_sostav': {
            //    if (this.select_rows_sostav && this.select_rows_sostav.length > 0) {
            //        this.obj_t_sostav.button(5).enable(true);
            //        if (this.select_rows_sostav[0].status < 1) {
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(true); // отмена сдачи состава
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(false);
            //            //if (this.select_rows_sostav[0].status === 2) { this.obj_t_sostav.button(4).enable(true); } else { this.obj_t_sostav.button(4).enable(false); }
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_sostav.button(3).enable(false);
            //        this.obj_t_sostav.button(4).enable(false);
            //        this.obj_t_sostav.button(5).enable(false);
            //    }
            //    break;
            //};
        };
    };
    // Показать данные
    table_td_report.prototype.view = function (data, id_select) {
        this.data = data;
        this.id_select = id_select;
        this.out_clear();
        LockScreen(langView('ttdr_mess_view_report', App.Langs));
        this.obj_t_report.clear();
        this.obj_t_report.rows.add(data);
        this.obj_t_report.order(this.order_column);
        this.obj_t_report.draw();
        if (id_select !== null) {
            this.id_select = id_select
            this.obj_t_report.row('#' + this.id_select).select();
        } else {
            this.id_select = null;
        }
        this.view_footer(data);
        this.select_rows();
        this.enable_button();
        //LockScreenOff();
    };
    //
    table_td_report.prototype.view_footer = function (data) {
        switch (this.settings.type_report) {
            case 'adoption_sostav': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_wagon_all = 0;
                    var sum_count_return_wagon = 0;
                    var sum_count_return_wagon_all = 0;
                    var sum_count_account_balance = 0;
                    var sum_count_account_balance_all = 0;
                    var sum_count_not_operator = 0;
                    var sum_count_not_operator_all = 0;
                    $.each(data, function (i, el) {
                        if (el.type === 0) {
                            sum_count_wagon += el.count_wagon;
                            sum_count_account_balance += el.count_account_balance;
                            sum_count_not_operator += el.count_not_operator;
                            sum_count_return_wagon += el.count_return_wagon;
                        }
                        sum_count_wagon_all += el.count_wagon;
                        sum_count_account_balance_all += el.count_account_balance;
                        sum_count_not_operator_all += el.count_not_operator;
                        sum_count_return_wagon_all += el.count_return_wagon;
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon_all + '(' + sum_count_wagon + ')');
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance_all + '(' + sum_count_account_balance + ')');
                });
                this.obj_t_report.columns('.sum_count_not_operator').every(function () {
                    $(this.footer()).html(sum_count_not_operator_all + '(' + sum_count_not_operator + ')');
                });
                this.obj_t_report.columns('.sum_count_return_wagon').every(function () {
                    $(this.footer()).html(sum_count_return_wagon_all + '(' + sum_count_return_wagon + ')');
                });
                break;
            };
            case 'outgoing_sostav': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_wagon_all = 0;
                    var sum_count_account_balance = 0;
                    var sum_count_account_balance_all = 0;
                    var sum_count_return_wagon = 0;
                    var sum_count_return_wagon_all = 0;
                    $.each(data, function (i, el) {
                        if (el.type === 0) {
                            sum_count_wagon += el.count_wagon;
                            sum_count_return_wagon += el.count_return_wagon;
                            sum_count_account_balance += el.count_account_balance;
                        }
                        sum_count_wagon_all += el.count_wagon;
                        sum_count_return_wagon_all += el.count_return_wagon;
                        sum_count_account_balance_all += el.count_account_balance;
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon_all + '(' + sum_count_wagon + ')');
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance_all + '(' + sum_count_account_balance + ')');
                });
                this.obj_t_report.columns('.sum_count_return_wagon').every(function () {
                    $(this.footer()).html(sum_count_return_wagon_all + '(' + sum_count_return_wagon + ')');
                });
                break;
            };
            case 'adoption_sostav_detali': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_account_balance = 0;
                    var sum_count_not_operator = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_count_account_balance += el.count_account_balance;
                        sum_count_not_operator += el.count_not_operator;
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance);
                });
                this.obj_t_report.columns('.sum_count_not_operator').every(function () {
                    $(this.footer()).html(sum_count_not_operator);
                });
                break;
            };
            case 'outgoing_sostav_detali': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_count_account_balance += el.count_account_balance;
                    });
                }
                this.obj_t_report.columns('.sum_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.sum_count_account_balance').every(function () {
                    $(this.footer()).html(sum_count_account_balance);
                });
                break;
            };
            case 'adoption_common_detali': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_gruzp = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon++;
                        sum_vesg += el.arrival_uz_vagon_vesg;
                        sum_vesg_reweighing += el.arrival_uz_vagon_vesg_reweighing;
                        sum_vesg_deff += el.arrival_uz_vagon_vesg && el.arrival_uz_vagon_vesg_reweighing ? Number(Number(Number(el.arrival_uz_vagon_vesg) - Number(el.arrival_uz_vagon_vesg_reweighing)) / 1000) : 0;
                        //sum_gruzp += el.arrival_uz_vagon_gruzp;
                    });
                    //var avg_vesg = sum_vesg / sum_count_wagon;
                    //var avg_gruzp = sum_gruzp / sum_count_wagon;
                }
                this.obj_t_report.columns('.fl-num').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-incoming_cars_arrival_uz_vagon_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-incoming_cars_arrival_uz_vagon_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-incoming_cars_arrival_uz_vagon_deff_vesg').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_common_detali': {
                if (data) {
                    var sum_count_wagon = 0;
                    //var sum_vesg = 0;
                    var sum_vesg1 = 0;
                    var sum_idle_time = 0;
                    //var sum_idle_time_act = 0;
                    var downtime = 0;
                    var fee_amount = 0;
                    $.each(data, function (i, el) {
                        sum_vesg1 += el.outgoing_uz_vagon_vesg;
                        sum_count_wagon++;
                        //if (el && el.otpr && el.otpr.vagon && el.otpr.vagon.length > 0 && el.otpr.vagon[0].collect_v && el.otpr.vagon[0].collect_v.length > 0 && el.otpr.vagon[0].collect_v[0].vesg) {
                        //    sum_vesg += el.otpr.vagon[0].collect_v[0].vesg;
                        //}
                        sum_idle_time += el.idle_time !== null ? el.idle_time : 0;
                        //sum_idle_time_act += el.idle_time_act !== null ? el.idle_time_act : 0;
                        downtime += el.wagon_usage_fee_downtime !== null ? el.wagon_usage_fee_downtime : 0;
                        fee_amount += el.wagon_usage_fee_manual_fee_amount !== null ? el.wagon_usage_fee_manual_fee_amount : (el.wagon_usage_fee_calc_fee_amount !== null ? el.wagon_usage_fee_calc_fee_amount : 0);
                    });
                }
                this.obj_t_report.columns('.fl-num').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                //this.obj_t_report.columns('.fl-outgoing_cars_epd_vagon_collect_v_vesg').every(function () {
                //    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                //});
                this.obj_t_report.columns('.fl-outgoing_cars_outgoing_uz_vagon_vesg').every(function () {
                    $(this.footer()).html(sum_vesg1 ? Number(sum_vesg1 / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-outgoing_cars_idle_time').every(function () {
                    $(this.footer()).html(sum_idle_time ? getTimeFromMins(sum_idle_time) : '00:00');
                });
                //this.obj_t_report.columns('.fl-outgoing_cars_idle_time_act').every(function () {
                //    $(this.footer()).html(sum_idle_time_act ? getTimeFromMins(sum_idle_time_act) : '00:00');
                //});
                this.obj_t_report.columns('.fl-outgoing_cars_wagon_usage_fee_downtime').every(function () {
                    $(this.footer()).html(downtime ? getTimeFromMins(downtime) : '0:00');
                });
                this.obj_t_report.columns('.fl-outgoing_cars_wagon_usage_fee_calc_fee_amount_final').every(function () {
                    $(this.footer()).html(fee_amount ? Number(fee_amount).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_cargo_operation_amkr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_operator_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_perent_wagon = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_perent_wagon += (el.perent_wagon ? Number(el.perent_wagon) : 0);
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_perent_wagon').every(function () {
                    $(this.footer()).html(sum_perent_wagon ? Number(sum_perent_wagon).toFixed(1) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_cargo_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_group_cargo_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_genus_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_perent_wagon = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_perent_wagon += (el.perent_wagon ? Number(el.perent_wagon) : 0);
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_perent_wagon').every(function () {
                    $(this.footer()).html(sum_perent_wagon ? Number(sum_perent_wagon).toFixed(1) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_cargo_sap_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_station_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_division_to_arr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'adoption_to_gs': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    var sum_vesg_deff = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_vesg_reweighing += el.sum_vesg_reweighing;
                        sum_vesg_deff += el.sum_vesg_deff;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_reweighing').every(function () {
                    $(this.footer()).html(sum_vesg_reweighing ? Number(sum_vesg_reweighing / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_vesg_deff').every(function () {
                    $(this.footer()).html(sum_vesg_deff ? Number(sum_vesg_deff / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_cargo_operator': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_cargo_ext_station': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_total_division_metall': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_total_division_cargo': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_total_cargo_metall': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'outgoing_total_operators': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    var sum_perent_wagon = 0;
                    var sum_idle_time = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        sum_perent_wagon += (el.perent_wagon ? Number(el.perent_wagon) : 0);
                        sum_idle_time += (el.sum_idle_time ? Number(el.sum_idle_time) : 0);
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_perent_wagon').every(function () {
                    $(this.footer()).html(sum_perent_wagon ? Number(sum_perent_wagon).toFixed(1) : Number(0).toFixed(2));
                });
                this.obj_t_report.columns('.fl-total_sum_idle_time').every(function () {
                    $(this.footer()).html(getTimeFromMins(sum_idle_time));
                });
                this.obj_t_report.columns('.fl-total_wagon_idle_time').every(function () {
                    $(this.footer()).html(getTimeFromMins(Number(Number(sum_idle_time / sum_count_wagon).toFixed(0))));
                });
                break;
            };
            case 'outgoing_total_operators_cargo': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_perent_wagon = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                        //sum_perent_wagon += (el.perent_wagon ? Number(el.perent_wagon) : 0);
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                //this.obj_t_report.columns('.fl-total_perent_wagon').every(function () {
                //    $(this.footer()).html(sum_perent_wagon ? Number(sum_perent_wagon).toFixed(1) : Number(0).toFixed(2));
                //});
                break;
            };
            case 'outgoing_total_ext_station': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_vesg = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_vesg += el.sum_vesg;
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_sum_vesg').every(function () {
                    $(this.footer()).html(sum_vesg ? Number(sum_vesg / 1000).toFixed(2) : Number(0).toFixed(2));
                });
                break;
            };
            case 'usage_fee_cargo': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_usage_fee_sum_calc_time = 0;
                    var sum_usage_fee_sum_calc_fee_amount = 0;
                    var sum_usage_fee_wagon_persent_fee_amount = 0;
                    var usage_fee_wagon_calc_time = 0;
                    var usage_fee_wagon_calc_fee_amount = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_usage_fee_sum_calc_time += el.sum_calc_time;
                        sum_usage_fee_sum_calc_fee_amount += el.sum_calc_fee_amount;
                        sum_usage_fee_wagon_persent_fee_amount += el.persent;
                    });
                }
                usage_fee_wagon_calc_time = sum_count_wagon > 0 ? getHourFromMins(Number(sum_usage_fee_sum_calc_time / sum_count_wagon)).toFixed(0) : 0;
                usage_fee_wagon_calc_fee_amount = sum_count_wagon > 0 ? Number(sum_usage_fee_sum_calc_fee_amount / sum_count_wagon).toFixed(2) : 0.00;
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_time').every(function () {
                    $(this.footer()).html(getHourFromMins(sum_usage_fee_sum_calc_time));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_time').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_time);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_fee_amount').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_fee_amount);
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_persent_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(0));
                });
                break;
            };
            case 'usage_fee_cargo_not_derailment': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_usage_fee_sum_calc_time = 0;
                    var sum_usage_fee_sum_calc_fee_amount = 0;
                    var sum_usage_fee_wagon_persent_fee_amount = 0;
                    var usage_fee_wagon_calc_time = 0;
                    var usage_fee_wagon_calc_fee_amount = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_usage_fee_sum_calc_time += el.sum_calc_time;
                        sum_usage_fee_sum_calc_fee_amount += el.sum_calc_fee_amount;
                        sum_usage_fee_wagon_persent_fee_amount += el.persent_not_derailment;
                    });
                }
                usage_fee_wagon_calc_time = sum_count_wagon > 0 ? getHourFromMins(Number(sum_usage_fee_sum_calc_time / sum_count_wagon)).toFixed(0) : 0;
                usage_fee_wagon_calc_fee_amount = sum_count_wagon > 0 ? Number(sum_usage_fee_sum_calc_fee_amount / sum_count_wagon).toFixed(2) : 0.00;
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_time').every(function () {
                    $(this.footer()).html(getHourFromMins(sum_usage_fee_sum_calc_time));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_time').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_time);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_fee_amount').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_fee_amount);
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_persent_not_derailment_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(0));
                });
                break;
            };
            case 'usage_fee_operator_amkr': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_usage_fee_sum_calc_time = 0;
                    var sum_usage_fee_sum_calc_fee_amount = 0;
                    var sum_usage_fee_wagon_persent_fee_amount = 0;
                    var usage_fee_wagon_calc_time = 0;
                    var usage_fee_wagon_calc_fee_amount = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_usage_fee_sum_calc_time += el.sum_calc_time;
                        sum_usage_fee_sum_calc_fee_amount += el.sum_calc_fee_amount;
                        sum_usage_fee_wagon_persent_fee_amount += el.persent;
                    });
                }
                usage_fee_wagon_calc_time = sum_count_wagon > 0 ? getHourFromMins(Number(sum_usage_fee_sum_calc_time / sum_count_wagon)).toFixed(0) : 0;
                usage_fee_wagon_calc_fee_amount = sum_count_wagon > 0 ? Number(sum_usage_fee_sum_calc_fee_amount / sum_count_wagon).toFixed(2) : 0.00;
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_time').every(function () {
                    $(this.footer()).html(getHourFromMins(sum_usage_fee_sum_calc_time));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_time').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_time);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_fee_amount').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_fee_amount);
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_persent_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(0));
                });
                break;
            };
            case 'usage_fee_operator_amkr_derailment': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_usage_fee_sum_calc_time = 0;
                    var sum_usage_fee_sum_calc_fee_amount = 0;
                    var sum_usage_fee_wagon_persent_fee_amount = 0;
                    var usage_fee_wagon_calc_time = 0;
                    var usage_fee_wagon_calc_fee_amount = 0;

                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_usage_fee_sum_calc_time += el.sum_calc_time;
                        sum_usage_fee_sum_calc_fee_amount += el.sum_calc_fee_amount;
                        sum_usage_fee_wagon_persent_fee_amount += el.persent;
                    });
                }
                usage_fee_wagon_calc_time = sum_count_wagon > 0 ? getHourFromMins(Number(sum_usage_fee_sum_calc_time / sum_count_wagon)).toFixed(0) : 0;
                usage_fee_wagon_calc_fee_amount = sum_count_wagon > 0 ? Number(sum_usage_fee_sum_calc_fee_amount / sum_count_wagon).toFixed(2) : 0.00;
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_time').every(function () {
                    $(this.footer()).html(getHourFromMins(sum_usage_fee_sum_calc_time));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_time').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_time);
                });
                this.obj_t_report.columns('.fl-usage_fee_sum_calc_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_sum_calc_fee_amount).toFixed(2));
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_calc_fee_amount').every(function () {
                    $(this.footer()).html(usage_fee_wagon_calc_fee_amount);
                });
                this.obj_t_report.columns('.fl-usage_fee_wagon_persent_fee_amount').every(function () {
                    $(this.footer()).html(Number(sum_usage_fee_wagon_persent_fee_amount).toFixed(0));
                });
                break;
            };
            case 'residue_total_operators': {
                if (data) {
                    var sum_start = 0;
                    var sum_arrival = 0;
                    var sum_outgoing = 0;
                    var sum_stop = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_start += el.start;
                        sum_arrival += el.arrival;
                        sum_outgoing += el.outgoing;
                        sum_stop += el.stop;
                    });
                }
                this.obj_t_report.columns('.fl-residue_total_operators_start').every(function () {
                    $(this.footer()).html(sum_start);
                });
                this.obj_t_report.columns('.fl-residue_total_operators_arrival').every(function () {
                    $(this.footer()).html(sum_arrival);
                });
                this.obj_t_report.columns('.fl-residue_total_operators_outgoing').every(function () {
                    $(this.footer()).html(sum_outgoing);
                });
                this.obj_t_report.columns('.fl-residue_total_operators_stop').every(function () {
                    $(this.footer()).html(sum_stop);
                });
                break;
            };
            case 'residue_total_common': {
                if (data) {
                    var sum_total = 0;
                    var sum_external = 0;
                    var sum_paid = 0;
                    var sum_accounting = 0;
                    var sum_amkr = 0;
                    var count = 0
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_total += el.total;
                        sum_external += el.external;
                        sum_paid += el.paid;
                        sum_accounting += el.accounting;
                        sum_amkr += el.amkr;
                        count++;
                    });
                }
                this.obj_t_report.columns('.fl-residue_total_common_total').every(function () {
                    $(this.footer()).html(count > 0 ? Number(sum_total / count).toFixed(0) : 0);
                });
                this.obj_t_report.columns('.fl-residue_total_common_external').every(function () {
                    $(this.footer()).html(count > 0 ? Number(sum_external / count).toFixed(0) : 0);
                });
                this.obj_t_report.columns('.fl-residue_total_common_paid').every(function () {
                    $(this.footer()).html(count > 0 ? Number(sum_paid / count).toFixed(0) : 0);
                });
                this.obj_t_report.columns('.fl-residue_total_common_accounting').every(function () {
                    $(this.footer()).html(count > 0 ? Number(sum_accounting / count).toFixed(0) : 0);
                });
                this.obj_t_report.columns('.fl-residue_total_common_amkr').every(function () {
                    $(this.footer()).html(count > 0 ? Number(sum_amkr / count).toFixed(0) : 0);
                });
                break;
            };

            case 'residue_total_markup_arr':
            case 'residue_total_markup_curr':
            case 'residue_total_genus': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_perent_wagon = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_perent_wagon += (el.perent_wagon ? Number(el.perent_wagon) : 0);
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_perent_wagon').every(function () {
                    $(this.footer()).html(sum_perent_wagon ? Number(sum_perent_wagon).toFixed(1) : Number(0).toFixed(2));
                });
                break;
            };
            case 'residue_total_markup_operator':
            case 'residue_total_genus_station_amkr':
            case 'residue_total_station_out': {
                if (data) {
                    var sum_count_wagon = 0;
                    var sum_perent_wagon = 0;
                    //var sum_count_account_balance = 0;
                    $.each(data, function (i, el) {
                        sum_count_wagon += el.count_wagon;
                        sum_perent_wagon += (el.perent_wagon !== null ? Number(el.perent_wagon) : 0);
                    });
                }
                this.obj_t_report.columns('.fl-total_count_wagon').every(function () {
                    $(this.footer()).html(sum_count_wagon);
                });
                this.obj_t_report.columns('.fl-total_perent_wagon').every(function () {
                    $(this.footer()).html(Number(sum_perent_wagon).toFixed(0));
                });
                break;
            };
        };
    };
    // Инициализация таблицы детально
    table_td_report.prototype.init_arrival_detali = function () {
        var base = this;
        this.$table_report.find('tbody')
            .on('click', 'td.adoption-sostav-detali', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                var row = base.obj_t_report.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }
                else {
                    var data = row.data();
                    var sl = this.selector + '-detali-' + data.id;
                    row.child('<div class="detali-operation table-report-detali" id="' + sl + '">' + // style="clear:both;table-layout:fixed;width:100%"
                        '</div>').show();
                    // Инициализируем
                    tr.addClass('shown');
                    setTimeout(function () {
                        //var ff = base.$table_report.find(sl)
                        base.view_arrival_detali(data);
                        //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    }, 100);

                }
            }.bind(this));
    };
    //
    table_td_report.prototype.init_outgoing_detali = function () {
        var base = this;
        this.$table_report.find('tbody')
            .on('click', 'td.outgoing-sostav-detali', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                var row = base.obj_t_report.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }
                else {
                    var data = row.data();
                    var sl = this.selector + '-detali-' + data.id;
                    row.child('<div class="detali-operation table-report-detali" id="' + sl + '">' +
                        '</div>').show();
                    // Инициализируем
                    tr.addClass('shown');
                    setTimeout(function () {
                        //var ff = base.$table_report.find(sl)
                        base.view_outgoing_detali(data);
                        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    }, 100);

                }
            }.bind(this));
    };
    //
    table_td_report.prototype.view_arrival_detali = function (data) {
        var TTDR = App.table_td_report;
        var sl = 'div#' + this.selector + '-detali-' + data.id;
        //if (!this.tables_detali[data.id]) {
        this.tables_detali[data.id] = new TTDR(sl); // Создадим экземпляр таблицы
        // Инициализация модуля "Таблица прибывающих составов"
        this.tables_detali[data.id].init({
            alert: null,
            detali_table: false,
            type_report: 'sostav_arrival_naturka',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function (init) {
                this.load_incoming_cars_of_id_sostav(data.id, function (wagons) {
                    this.tables_detali[data.id].view(wagons);
                    LockScreenOff();
                    //setTimeout(function () {
                    //    //$($.fn.dataTable.tables(true)).DataTable().columns.adjust().fixedColumns().relayout();
                    //    //$($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
                    //    //$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                    //}, 100);
                }.bind(this));
            }.bind(this),
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });
    };
    //
    table_td_report.prototype.view_outgoing_detali = function (data) {
        var TTDR = App.table_td_report;
        var sl = 'div#' + this.selector + '-detali-' + data.id;
        //if (!this.tables_detali[data.id]) {
        this.tables_detali[data.id] = new TTDR(sl); // Создадим экземпляр таблицы
        // Инициализация модуля "Таблица прибывающих составов"
        this.tables_detali[data.id].init({
            alert: null,
            detali_table: false,
            type_report: 'sostav_outgoing_naturka',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function (init) {
                this.load_outgoing_cars_of_id_sostav(data.id, function (wagons) {
                    this.tables_detali[data.id].view(wagons);
                }.bind(this));
            }.bind(this),
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                //if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                //    this.table_adop_sostav_detali.view(rows[0].adoption_sostav)
                //} else {
                //    this.table_adop_sostav_detali.view([]);
                //}
            }.bind(this),
        });
    };
    //
    // Загрузить составы по прибытию
    table_td_report.prototype.load_incoming_cars_of_id_sostav = function (id_sostav, cb_load) {
        if (id_sostav !== null) {
            LockScreen(langView('ttdr_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewIncomingCarsOfIDSostav(id_sostav, function (wagons) {
                this.id_sostav = id_sostav;
                this.wagons = this.filter_wagons(wagons);
                // запустим паралелную загрузку предыдущих отправок с АМКР
                var process_load = this.wagons.length;
                // Выход из загрузки
                var out_load = function (process_load) {
                    if (process_load === 0) {
                        LockScreenOff();
                        if (typeof cb_load === 'function') {
                            cb_load(this.wagons);
                        }
                    }
                }.bind(this);
                // Получить прерырущие отправки с АМКР
                $.each(this.wagons, function (i, el) {
                    this.ids_wsd.getViewPreviousOutgoingCarsOfIDWIR(el.id_wir, function (outgoing_car) {
                        el['previous_outgoing_car'] = outgoing_car;
                        process_load--;
                        out_load(process_load);
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        } else {
            this.wagons = [];
            this.id_sostav = null;
            if (typeof cb_load === 'function') {
                cb_load(this.wagons);
            }
        }
    };
    //
    table_td_report.prototype.load_outgoing_cars_of_id_sostav = function (id_sostav, cb_load) {
        if (id_sostav !== null) {
            LockScreen(langView('ttdr_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewOutgoingCarsOfIDSostav(id_sostav, function (wagons) {
                this.id_sostav = id_sostav;
                this.wagons = this.filter_wagons(wagons);
                LockScreenOff();
                if (typeof cb_load === 'function') {
                    cb_load(this.wagons);
                }
                LockScreenOff();
            }.bind(this));
        } else {
            this.wagons = [];
            this.id_sostav = null;
            if (typeof cb_load === 'function') {
                cb_load(this.wagons);
            }
        }

    };
    // Отфильтровать вагоны
    table_td_report.prototype.filter_wagons = function (wagons) {
        switch (this.settings.type_report) {
            case 'adoption_sostav_detali': {
                return wagons
                    .filter(function (i) { return i.arrival_car_position_arrival !== null })
                    .sort(function (a, b) { return a.arrival_car_position_arrival - b.arrival_car_position_arrival });
            };
            case 'outgoing_sostav_detali': {
                return wagons
                    .filter(function (i) { return i.outgoing_car_position_outgoing !== null })
                    .sort(function (a, b) { return a.outgoing_car_position_outgoing - b.outgoing_car_position_outgoing });
            };
            default: {
                return wagons;
            }
        }
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_td_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_td_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    table_td_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    table_td_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Очистить объект
    table_td_report.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    };
    // Очистить детали по указаному пути
    table_td_report.prototype.destroy_detali = function (data) {
        if (this.tables_detali[data.id]) {
            this.tables_detali[data.id].destroy();
            delete this.tables_detali[data.id];
        }
    };
    // Очистить все детали
    table_td_report.prototype.destroy_all_detali = function () {
        $.each(this.tables_detali, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.tables_detali = {};
    };
    //
    App.table_td_report = table_td_report;

    window.App = App;
})(window);