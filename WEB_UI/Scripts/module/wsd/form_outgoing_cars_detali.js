/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />
/*Модуль форма "Отправляемый вагон детально"*/
(function (window) {
    'use strict';

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";


    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));


    var min_err_detention_start = -2 * 60;   // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_err_detention_start = 2 * 60;    // TODO: Максимальная разница в часах начало задержания и текущей даты
    var max_err_detention_deff = 4 * 60;        // TODO: Минимальная разница в часах межу началом и концом задержания
    var min_err_return_start = -2 * 60;     // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_err_return_start = 2 * 60;      // TODO: Максимальная разница в часах начало задержания и текущей даты
    var min_err_return_stop = -2 * 60;      // TODO: Минимальная разница в часах начало задержания и текущей даты
    var max_err_return_stop = 2 * 60;       // TODO: Максимальная разница в часах начало задержания и текущей даты
    //var max_err_return_deff = 4 * 60;     // TODO: Минимальная разница в часах межу началом и концом задержания
    var list_groups_cargo = [11, 16, 20, 24];        // TODO: Список id групп груза с порожними вагонами

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {

            'fogcd_label_num': '№ Вагона:',
            'fogcd_title_num': 'Номер вагона',
            'fogcd_label_position_outgoing': '№ в поезде:',
            'fogcd_title_position_outgoing': 'Автоматический ввод\корректировка (номер вагона в составе)',
            'fogcd_label_num_cont_1': '№ контейнера-1:',
            'fogcd_title_num_cont_1': 'Номер контейнера',
            'fogcd_label_num_cont_2': '№ контейнера-2:',
            'fogcd_title_num_cont_2': 'Номер контейнера',
            'fogcd_label_date_outgoing_act': 'Дата сдачи по акту:',
            'fogcd_title_date_outgoing_act': 'Ручной ввод (если вагон сдается по акту)',
            'fogcd_label_reason_discrepancy_amkr': 'Причина расхождения сдачи (АМКР):',
            'fogcd_title_reason_discrepancy_amkr': 'Причина расхождения сдачи',
            'fogcd_label_reason_discrepancy_uz': 'Причина расхождения сдачи (УЗ):',
            'fogcd_title_reason_discrepancy_uz': 'Причина расхождения сдачи',
            'fogcd_label_adm_kod': 'Адм.(код):',
            'fogcd_title_adm_kod': 'Код администрации',
            'fogcd_label_rod_vag_abbr': 'Род(абр):',
            'fogcd_title_rod_vag_abbr': 'Справочник "Карточка вагона" -> Название "Рода вагона(абр.)"',
            'fogcd_label_gruzp_uz': 'Грузоп. (УЗ),т:',
            'fogcd_title_gruzp_uz': '',
            'fogcd_label_tara_uz': 'Тара (УЗ),т:',
            'fogcd_title_tara_uz': '',
            'fogcd_label_condition_arrival': 'Разметка (прибытие):',
            'fogcd_title_condition_arrival': '',
            'fogcd_label_condition_provide': 'Разметка (текущая):',
            'fogcd_title_condition_provide': '',
            'fogcd_label_condition_present': 'Разметка по отправлению:',
            'fogcd_title_condition_present': '',
            'fogcd_label_cause_detention': 'Причина задержания:',
            'fogcd_title_cause_detention': '',
            'fogcd_label_detention_start': 'Начало задержания:',
            'fogcd_title_detention_start': '',
            'fogcd_label_detention_stop': 'Окончание задержания:',
            'fogcd_title_detention_stop': '',
            'fogcd_label_cause_return': 'Причина возврата:',
            'fogcd_title_cause_return': '',
            'fogcd_label_return_start': 'Начало возврата:',
            'fogcd_title_return_start': '',
            'fogcd_label_return_stop': 'Окончание возврата:',
            'fogcd_title_return_stop': '',
            'fogcd_label_return_num_act': 'Номер акта возврата:',
            'fogcd_title_return_num_act': '',
            'fogcd_label_return_date_act': 'Дата акта возврата:',
            'fogcd_title_return_date_act': '',
            'fogcd_label_return_note': 'Примечание возврат:',
            'fogcd_title_return_note': '',
            'fogcd_label_loaded_car': 'Груж/порожний',
            'fogcd_title_cargo_name': '',
            'fogcd_label_cargo_name': 'Наименование груза:',
            'fogcd_title_loading_devision_code': '',
            'fogcd_label_loading_devision_code': 'Шифр:',
            'fogcd_title_loading_devision': '',
            'fogcd_label_loading_devision': 'Цех погрузки:',
            'fogcd_title_code_station_to': '',
            'fogcd_label_code_station_to': 'Код:',
            'fogcd_title_name_station_to': '',
            'fogcd_label_name_station_to': 'Станция назначения:',
            'fogcd_title_owner_name': '',
            'fogcd_label_owner_name': 'Собственник:',
            'fogcd_title_operator_name': '',
            'fogcd_label_operator_name': 'Оператор (АМКР):',
            'fogcd_title_limiting_loading_amkr': '',
            'fogcd_label_limiting_loading_amkr': 'Ограничение (АМКР):',
            'fogcd_title_limiting_loading_uz': '',
            'fogcd_label_limiting_loading_uz': 'Ограничение (УЗ):',
            'fogcd_title_uz_doc_num': '',
            'fogcd_label_uz_doc_num': '№ Накладной:',
            'fogcd_title_vesg_uz_doc': '',
            'fogcd_label_vesg_uz_doc': 'Вес груза:',
            'fogcd_title_ves_tary_uz_doc': '',
            'fogcd_label_ves_tary_uz_doc': 'Вес тары:',
            'fogcd_title_brigadier_loading_uz_doc': '',
            'fogcd_label_brigadier_loading_uz_doc': 'Бригадир погрузки:',
            'fogcd_title_kod_etsng': 'ЭПД [OTPR/VAGON/COLLECT_V/kod_etsng] -> Код груза по ЕТ СНГ',
            'fogcd_label_kod_etsng': 'Код ЕТСНГ:',
            'fogcd_title_name_etsng': 'ЭПД [OTPR/VAGON/COLLECT_V/name_etsng] -> Справочник "Грузов ЕТ СНГ" -> Справочник "Грузов ИДС" -> Название груза по ЕТ СНГ',
            'fogcd_label_name_etsng': 'Название груза по ЕТСНГ',
            'fogcd_title_station_code_on': '',
            'fogcd_label_station_code_on': 'Код:',
            'fogcd_title_station_name_on': '',
            'fogcd_label_station_name_on': 'Станция назначения:',
            'fogcd_title_railway_name_on': '',
            'fogcd_label_railway_name_on': 'Дорога:',

            'fogcd_title_client_kod_on': '',
            'fogcd_label_client_kod_on': 'Код:',
            'fogcd_title_client_name_on': '',
            'fogcd_label_client_name_on': 'Грузополучатель:',
            'fogcd_title_cargo_arrival': '',
            'fogcd_label_cargo_arrival': 'Груз:',
            'fogcd_title_cargo_sap': '',
            'fogcd_label_cargo_sap': 'Название материала SAP:',
            'fogcd_title_date_arrival': '',
            'fogcd_label_date_arrival': 'Время приема:',
            'fogcd_title_owner_name_arrival': '',
            'fogcd_label_owner_name_arrival': 'Собственник:',
            'fogcd_title_operator_name_arrival': '',
            'fogcd_label_operator_name_arrival': 'Оператор (АМКР):',
            'fogcd_title_limiting_loading_arrival': '',
            'fogcd_label_limiting_loading_arrival': 'Ограничение (АМКР):',
            'fogcd_title_sap_outgoing_supply_num': '',
            'fogcd_label_sap_outgoing_supply_num': '№ исх. поставки:',
            'fogcd_title_sap_outgoing_supply_netto': '',
            'fogcd_label_sap_outgoing_supply_netto': 'Вес груза:',
            'fogcd_title_sap_outgoing_supply_responsible_fio': '',
            'fogcd_label_sap_outgoing_supply_responsible_fio': 'Бригадир погрузки:',
            'fogcd_title_sap_outgoing_supply_warehouse_code': '',
            'fogcd_label_sap_outgoing_supply_warehouse_code': 'Склад:',
            'fogcd_title_sap_outgoing_supply_warehouse_name': '',
            'fogcd_label_sap_outgoing_supply_warehouse_name': 'Цех погрузки:',
            'fogcd_title_sap_outgoing_supply_cargo_code': '',
            'fogcd_label_sap_outgoing_supply_cargo_code': 'Код ЕТСНГ:',
            'fogcd_title_sap_outgoing_supply_cargo_name': '',
            'fogcd_label_sap_outgoing_supply_cargo_name': 'Наименование груза:',
            'fogcd_title_sap_outgoing_supply_destination_station_code': '',
            'fogcd_label_sap_outgoing_supply_destination_station_code': 'Код:',
            'fogcd_title_sap_outgoing_supply_destination_station_name': '',
            'fogcd_label_sap_outgoing_supply_destination_station_name': 'Станция назначения:',
            'fogcd_title_sap_outgoing_supply_shipper_code': '',
            'fogcd_label_sap_outgoing_supply_shipper_code': 'Код:',
            'fogcd_title_sap_outgoing_supply_shipper_name': '',
            'fogcd_label_sap_outgoing_supply_shipper_name': 'Грузополучатель:',
            'fogcd_title_button_save': 'Сохранить',
            'fogcd_title_button_edit': 'Править',
            'fogcd_title_button_return_open': 'Выполнить возврат',
            'fogcd_title_button_return_close': 'Закрыть возврат',
            'fogcd_form_detention': 'Править задержание?',
            'fogcd_form_detention_message': 'Обновить информацию по задержанию вагона?',
            'fogcd_form_return_open': 'Открыть возврат?',
            'fogcd_form_return_open_message': 'Открыть возврат на вагон {0}?',
            'fogcd_form_return_close': 'Закрыть возврат?',
            'fogcd_form_return_close_message': 'Закрыть возврат по вагону {0}?',
            'fogcd_form_present': 'Выполнить?',
            'fogcd_form_present_message': 'Подтвердите выполнение операции «ПРЕДЪЯВИТЬ ВАГОН № {0} НА УЗ»?',
            'fogcd_form_return_present': 'Выполнить?',
            'fogcd_form_return_present_message': 'Подтвердите выполнение операции «ВЕРНУТЬ ВАГОН № {0} ПРЕДЪЯВЛЕННЫ НА УЗ»?',
            'fogcd_form_remove_wagon': 'Выполнить?',
            'fogcd_form_remove_wagon_message': 'Подтвердите выполнение операции «УБРАТЬ ВАГОН № {0} ИЗ СОСТАВА ДЛЯ ПРЕДЪЯВЛЕНИЯ»?',
            'fogcd_title_fieldset_detention_return': 'ЗАДЕРЖАНИЕ/ВОЗВРАТ',
            'fogcd_title_fieldset_detention': 'ЗАДЕРЖАНИЕ',
            'fogcd_title_fieldset_return': 'ВОЗВРАТ',
            'fogcd_title_fieldset_loading_data': 'ДАННЫЕ О ПОГРУЗКЕ',
            'fogcd_title_fieldset_epd': 'ЭПД(ПОСЛЕ ПРИНЯТИЯ УЗ)',
            'fogcd_title_fieldset_sap': 'SAP (ИСХОДЯЩАЯ ПОСТАВКА)',
            'fogcd_title_fieldset_data_arrival': 'ДАННЫЕ О ПРИБЫТИИ',

            'fogcd_mess_valid_reason_discrepancy': 'Указанной причины расхождения нет в справочнике ИДС.',
            'fogcd_mess_valid_cause_detention': 'Указанной причины задержания нет в справочнике ИДС.',
            'fogcd_mess_valid_not_cause_detention': 'Укажите причину задержания',
            'fogcd_mess_valid_not_detention_start': 'Укажите начало задержания',
            'fogcd_mess_valid_not_detention_stop': 'Укажите конец задержания',
            'fogcd_mess_valid_not_deff_date_detention': 'Дата и время начало задержания должны быть не меньше {0} мин. или больше {1} мин. от текущей даты',
            'fogcd_mess_valid_not_deff_date_detention_start_stop': 'Разница между началом и окончанием задержания должна быть больше 0 мин. но меньше {0} мин.',
            'fogcd_mess_valid_no_save_detention': 'Сохраните задержание, затем переносите вагон!',

            'fogcd_mess_valid_cause_return': 'Указанной причины возврата нет в справочнике ИДС.',
            'fogcd_mess_valid_not_cause_return': 'Укажите причину возврата',
            'fogcd_mess_valid_not_return_start': 'Укажите начало возврата',
            'fogcd_mess_valid_not_return_stop': 'Укажите конец возврата',
            'fogcd_mess_valid_not_deff_date_return': 'Дата и время начало возврата должны быть не меньше {0} мин. или больше {1} мин. от текущей даты',
            'fogcd_mess_valid_not_deff_date_stop_return': 'Дата и время окончания возврата должны быть не меньше {0} мин. или больше {1} мин. от текущей даты',
            'fogcd_mess_valid_not_deff_date_return_start_stop': 'Разница между началом и окончанием возврата должна быть больше 0 мин.',
            'fogcd_mess_valid_error_date_act': 'Ошибка формата даты акта',
            'fogcd_mess_valid_cargo': 'Указанного груза нет в справочнике ИДС.',
            'fogcd_mess_valid_loading_devision': 'Указанного подразделения нет в справочнике ИДС.',
            'fogcd_mess_valid_not_loading_devision': 'Укажите подразделение погрузки.',
            'fogcd_mess_valid_name_station_to': 'Указанной станции нет в справочнике ИДС.',
            'fogcd_mess_warning_no_data_wagon_ids': 'По указанному ID {0} вагона нет данных в БД ИДС.',
            'fogcd_mess_warning_no_data_wagon_uz': 'По выбранному вагону нет данных в БД УЗ. (будут применены данный из справочника ИДС).',
            'fogcd_mess_warning_no_data_dir_wagon': 'По выбранному вагону нет данных в справочнике вагонов ИДС.',
            'fogcd_mess_valid_error_position1': 'Первый предъявленный вагон должен начинается с 1 позиции',
            'fogcd_mess_valid_error_position2': 'Указанная позиция {0} уже существует, вагон № {1}',
            'fogcd_mess_valid_error_num': 'Указанный вагон {0} уже предъявлен, позиция № {1}',
            'fogcd_mess_valid_date_outgoing_act': 'Укажите правильно дату сдачи по акту',
            'fogcd_mess_valid_not_date_outgoing_act': 'Не указана дата сдачи по акту',
            'fogcd_mess_valid_not_cargo_name': 'Укажите наименование груза',
            'fogcd_mess_valid_cargo_name': 'Указанного наименование груза нет в справочнике ИДС.',
            'fogcd_mess_valid_not_reason_discrepancy': 'Укажите причину расхождения.',
            'fogcd_mess_valid_null_condition_present': 'Вагон не размечен вагонником.',

            'fogcd_value_vagonnik': 'Разметил : {0}, Разметка : {1}',
            'fogcd_mess_init_panel': 'Инициализация модуля (form_outgoing_cars_detali) ...',
            'fogcd_mess_load_wagon': 'Обновляю информацию по вагону...',
            'fogcd_mess_load_db_uz': 'Обновляю информацию о вагоне с БД УЗ...',
            'fogcd_mess_load_return_wagon': 'Поиск информации по возвратам',
            'fogcd_mess_update_operation_detention': 'Выполняю операцию обновления задержания по вагону',
            'fogcd_mess_cancel_operation_detention': 'Отмена выполнения операции "Обновить задержание по вагону"',
            'fogcd_mess_ok_operation_detention': 'Операция "Обновить задержание по вагону" - выполнена',
            'fogcd_mess_error_operation_detention': 'Ошибка выполнения операции "Обновить задержание по вагону", код ошибки = ',
            'fogcd_mess_update_operation_return_open': 'Выполняю операцию "Открыть возврат по вагону"',
            'fogcd_mess_cancel_operation_return_open': 'Отмена выполнения операции "Открыть возврат по вагону"',
            'fogcd_mess_ok_operation_return_open': 'Операция "Открыть возврат по вагону" - выполнена',
            'fogcd_mess_error_operation_return_open': 'Ошибка выполнения операции "Открыть возврат по вагону", код ошибки = ',
            'fogcd_mess_update_operation_return_close': 'Выполняю операцию "Закрыть возврат по вагону"',
            'fogcd_mess_cancel_operation_return_close': 'Отмена выполнения операции "Закрыть возврат по вагону"',
            'fogcd_mess_ok_operation_return_close': 'Операция "Закрыть возврат по вагону" - выполнена',
            'fogcd_mess_error_operation_return_close': 'Ошибка выполнения операции "Закрыть возврат по вагону", код ошибки = ',
            'fogcd_mess_error_operation_return_close_not_id': 'Ошибка выполнения операции "Закрыть возврат по вагону", id строки возврата неопределенно',
            'fogcd_mess_run_operation_present': 'Выполняю операцию "Предъявить вагон на УЗ"',
            'fogcd_mess_cancel_operation_present': 'Отмена выполнения операции "Предъявить вагон на УЗ"',
            'fogcd_mess_ok_operation_present': 'Операция "Предъявить вагон на УЗ" - выполнена',
            'fogcd_mess_error_operation_present': 'Ошибка выполнения операции "Предъявить вагон на УЗ", код ошибки = ',
            'fogcd_mess_run_operation_return_present': 'Выполняю операцию "Вернуть вагон предъявленный на УЗ"',
            'fogcd_mess_cancel_operation_return_present': 'Отмена выполнения операции "Вернуть вагон предъявленный на УЗ"',
            'fogcd_mess_ok_operation_return_present': 'Операция "Вернуть вагон предъявленный на УЗ" - выполнена',
            'fogcd_mess_error_operation_return_present': 'Ошибка выполнения операции "Вернуть вагон предъявленный на УЗ", код ошибки = ',
            'fogcd_mess_run_operation_remove_wagon': 'Выполняю операцию "Убрать вагон из состава для предъявления"',
            'fogcd_mess_cancel_operation_remove_wagon': 'Отмена выполнения операции "Убрать вагон из состава для предъявления"',
            'fogcd_mess_ok_operation_remove_wagon': 'Операция "Убрать вагон из состава для предъявления" - выполнена',
            'fogcd_mess_error_operation_remove_wagon': 'Ошибка выполнения операции "Убрать вагон из состава для предъявления", код ошибки = ',
        },
        'en':  //default language: English
        {
            'fogcd_label_num': 'Car #:',
            'fogcd_title_num': 'Wagon number',
            'fogcd_label_position_outgoing': 'Train #:',
            'fogcd_title_position_outgoing': 'Auto input/correction (car number in train)',
            'fogcd_label_num_cont_1': 'container-1:',
            'fogcd_title_num_cont_1': 'Container Number',
            'fogcd_label_num_cont_2': 'container-2:',
            'fogcd_title_num_cont_2': 'Container Number',
            'fogcd_label_date_outgoing_act': 'Fogcd_label_date_outgoing_act:',
            'fogcd_title_date_outgoing_act': 'Manual entry (if wagon is outgoing by act)',
            'fogcd_label_reason_discrepancy_amkr': 'Reason for change discrepancy (AMKR):',
            'fogcd_title_reason_discrepancy_amkr': 'Reason for change discrepancy',
            'fogcd_label_reason_discrepancy_uz': 'Cost discrepancy in change (KU):',
            'fogcd_title_reason_discrepancy_uz': 'Reason for change discrepancy',
            'fogcd_label_adm_kod': 'Adm.(code):',
            'fogcd_title_adm_kod': 'Admin Code',
            'fogcd_label_rod_vag_abbr': 'Rod(abbr):',
            'fogcd_title_rod_vag_abbr': 'Reference book "Car card" -> Title "Car type(abbr.)"',
            'fogcd_label_gruzp_uz': 'Freight. (UZ),t:',
            'fogcd_title_gruzp_uz': '',
            'fogcd_label_tara_uz': 'Tara (UZ),t:',
            'fogcd_title_tara_uz': '',
            'fogcd_label_condition_arrival': 'Label (arrival):',
            'fogcd_title_condition_arrival': '',
            'fogcd_label_condition_provide': 'Label (current):',
            'fogcd_title_condition_provide': '',
            'fogcd_label_condition_present': 'Fogcd_label_condition_present:',
            'fogcd_title_condition_present': '',
            'fogcd_label_cause_detention': 'Detention reason:',
            'fogcd_title_cause_detention': '',
            'fogcd_label_detention_start': 'Detention start:',
            'fogcd_title_detention_start': '',
            'fogcd_label_detention_stop': 'Detention end:',
            'fogcd_title_detention_stop': '',
            'fogcd_label_cause_return': 'Return Reason:',
            'fogcd_title_cause_return': '',
            'fogcd_label_return_start': 'Fogcd_label_return_start:',
            'fogcd_title_return_start': '',
            'fogcd_label_return_stop': 'Fogcd_label_return_stop',
            'fogcd_title_return_stop': '',
            'fogcd_label_return_num_act': 'Return act number:',
            'fogcd_title_return_num_act': '',
            'fogcd_label_return_date_act': 'Return act date:',
            'fogcd_title_return_date_act': '',
            'fogcd_label_return_note': 'Note return:',
            'fogcd_title_return_note': '',
            'fogcd_label_loaded_car': 'Loaded/empty',
            'fogcd_title_cargo_name': '',
            'fogcd_label_cargo_name': 'Cargo Name:',
            'fogcd_title_loading_devision_code': '',
            'fogcd_label_loading_devision_code': 'Code:',
            'fogcd_title_loading_devision': '',
            'fogcd_label_loading_devision': 'Loading department:',
            'fogcd_title_code_station_to': '',
            'fogcd_label_code_station_to': 'Code:',
            'fogcd_title_name_station_to': '',
            'fogcd_label_name_station_to': 'Destination station:',
            'fogcd_title_owner_name': '',
            'fogcd_label_owner_name': 'Owner:',
            'fogcd_title_operator_name': '',
            'fogcd_label_operator_name': 'Operator (mcr):',
            'fogcd_title_limiting_loading_amkr': '',
            'fogcd_label_limiting_loading_amkr': 'Limiting (AMKR):',
            'fogcd_title_limiting_loading_uz': '',
            'fogcd_label_limiting_loading_uz': 'Limiting (LL):',
            'fogcd_title_uz_doc_num': '',
            'fogcd_label_uz_doc_num': 'Invoice number:',
            'fogcd_title_vesg_uz_doc': '',
            'fogcd_label_vesg_uz_doc': 'Weight:',
            'fogcd_title_ves_tary_uz_doc': '',
            'fogcd_label_ves_tary_uz_doc': 'Tare:',
            'fogcd_title_brigadier_loading_uz_doc': '',
            'fogcd_label_brigadier_loading_uz_doc': 'Loading Foreman:',
            'fogcd_title_kod_etsng': 'ETD [OTPR/VAGON/COLLECT_V/kod_etsng] -> ET CIS cargo code',
            'fogcd_label_kod_etsng': 'ETSNG code:',
            'fogcd_title_name_etsng': 'EPD [OTPR/VAGON/COLLECT_V/name_etsng] -> "CIS UT Cargo" Directory -> "IDS Cargo" Directory -> CIS UT Cargo Name',
            'fogcd_label_name_etsng': 'Fogcd_label_name_etsng',
            'fogcd_title_station_code_on': '',
            'fogcd_label_station_code_on': 'Code:',
            'fogcd_title_station_name_on': '',
            'fogcd_label_station_name_on': 'Destination station:',
            'fogcd_title_railway_name_on': '',
            'fogcd_label_railway_name_on': 'Road:',

            'fogcd_title_client_kod_on': '',
            'fogcd_label_client_kod_on': 'Code:',
            'fogcd_title_client_name_on': '',
            'fogcd_label_client_name_on': 'Consignee:',
            'fogcd_title_cargo_arrival': '',
            'fogcd_label_cargo_arrival': 'Cargo:',
            'fogcd_title_cargo_sap': '',
            'fogcd_label_cargo_sap': 'SAP material name:',
            'fogcd_title_date_arrival': '',
            'fogcd_label_date_arrival': 'Received Time:',
            'fogcd_title_owner_name_arrival': '',
            'fogcd_label_owner_name_arrival': 'Owner:',
            'fogcd_title_operator_name_arrival': '',
            'fogcd_label_operator_name_arrival': 'Operator (mcr):',
            'fogcd_title_limiting_loading_arrival': '',
            'fogcd_label_limiting_loading_arrival': 'Limiting (mcr):',
            'fogcd_title_sap_outgoing_supply_num': '',
            'fogcd_label_sap_outgoing_supply_num': 'outgoing no. supplies:',
            'fogcd_title_sap_outgoing_supply_netto': '',
            'fogcd_label_sap_outgoing_supply_netto': 'Load Weight:',
            'fogcd_title_sap_outgoing_supply_responsible_fio': '',
            'fogcd_label_sap_outgoing_supply_responsible_fio': 'Loading Foreman:',
            'fogcd_title_sap_outgoing_supply_warehouse_code': '',
            'fogcd_label_sap_outgoing_supply_warehouse_code': 'Warehouse:',
            'fogcd_title_sap_outgoing_supply_warehouse_name': '',
            'fogcd_label_sap_outgoing_supply_warehouse_name': 'Loading House:',
            'fogcd_title_sap_outgoing_supply_cargo_code': '',
            'fogcd_label_sap_outgoing_supply_cargo_code': 'ETSNG Code:',
            'fogcd_title_sap_outgoing_supply_cargo_name': '',
            'fogcd_label_sap_outgoing_supply_cargo_name': 'Cargo Name:',
            'fogcd_title_sap_outgoing_supply_destination_station_code': '',
            'fogcd_label_sap_outgoing_supply_destination_station_code': 'Code:',
            'fogcd_title_sap_outgoing_supply_destination_station_name': '',
            'fogcd_label_sap_outgoing_supply_destination_station_name': 'Destination Station:',
            'fogcd_title_sap_outgoing_supply_shipper_code': '',
            'fogcd_label_sap_outgoing_supply_shipper_code': 'Code:',
            'fogcd_title_sap_outgoing_supply_shipper_name': '',
            'fogcd_label_sap_outgoing_supply_shipper_name': 'Consignee:',
            'fogcd_title_button_save': 'Save',
            'fogcd_title_button_edit': 'Edit',
            'fogcd_title_button_return_open': 'Return',
            'fogcd_title_button_return_close': 'Close Return',
            'fogcd_form_detention': 'Edit Detention?',
            'fogcd_form_detention_message': 'Update wagon detention information?',
            'fogcd_form_return_open': 'Open return?',
            'fogcd_form_return_open_message': 'Open return to wagon {0}?',
            'fogcd_form_return_close': 'Close return?',
            'fogcd_form_return_close_message': 'Close return on wagon {0}?',
            'fogcd_form_present': 'Run?',
            'fogcd_form_present_message': 'Confirm the operation "PRESENT CAR #{0} TO OZ"?',
            'fogcd_form_return_present': 'Run?',
            'fogcd_form_return_present_message': 'Confirm operation "RETURN CAR #{0} PRESENTED TO OZ"?',
            'fogcd_form_remove_wagon': 'Run?',
            'fogcd_form_remove_wagon_message': 'Confirm "REMOVE WAGON #{0} FROM PRESENTATION"?',
            'fogcd_title_fieldset_detention_return': 'DETENTION/RETURN',
            'fogcd_title_fieldset_detention': 'DETENTION',
            'fogcd_title_fieldset_return': 'RETURN',
            'fogcd_title_fieldset_loading_data': 'LOADING DATA',
            'fogcd_title_fieldset_epd': 'EPD(AFTER TITLE)',
            'fogcd_title_fieldset_sap': 'SAP (OUT DELIVERY)',
            'fogcd_title_fieldset_data_arrival': 'ARRIVAL DATA',

            'fogcd_mess_valid_reason_discrepancy': 'Specified reason for discrepancy is not in the FID directory.',
            'fogcd_mess_valid_cause_detention': 'The specified reason for detention is not in the FID directory.',
            'fogcd_mess_valid_not_cause_detention': 'Specify Detention Reason',
            'fogcd_mess_valid_not_detention_start': 'Specify Detention Start',
            'fogcd_mess_valid_not_detention_stop': 'Specify Detention End',
            'fogcd_mess_valid_not_deff_date_detention': 'The start date and time of the delay must be at least {0} min. or more {1} min. from current date',
            'fogcd_mess_valid_not_deff_date_detention_start_stop': 'The difference between the start and end of the delay must be greater than 0 minutes. but less than {0} min.',
            'fogcd_mess_valid_no_save_detention': 'Save the delay, then move the car!',

            'fogcd_mess_valid_cause_return': 'The specified reason for the return is not in the FID directory.',
            'fogcd_mess_valid_not_cause_return': 'Specify reason for return',
            'fogcd_mess_valid_not_return_start': 'Specify start of return',
            'fogcd_mess_valid_not_return_stop': 'Specify end of return',
            'fogcd_mess_valid_not_deff_date_return': 'The start date and time of the return must be at least {0} min. or more {1} min. from current date',
            'fogcd_mess_valid_not_deff_date_stop_return': 'The return end date and time must be at least {0} min. or more {1} min. from current date',
            'fogcd_mess_valid_not_deff_date_return_start_stop': 'Difference between start and end of return must be greater than 0 min.',
            'fogcd_mess_valid_error_date_act': 'Act date format error',
            'fogcd_mess_valid_cargo': 'The specified cargo is not in the CID directory.',
            'fogcd_mess_valid_loading_devision': 'The specified division is not in the FID directory.',
            'fogcd_mess_valid_not_loading_devision': 'Specify a loading division.',
            'fogcd_mess_valid_name_station_to': 'The specified station is not in the FID directory.',
            'fogcd_mess_warning_no_data_wagon_ids': 'The given wagon ID {0} has no data in the Wagon ID DB.',
            'fogcd_mess_warning_no_data_wagon_uz': 'There is no data for the selected wagon in the uz database. (data from the IDS directory will be applied).',
            'fogcd_mess_warning_no_data_dir_wagon': 'There is no data for the selected wagon in the FID wagon directory.',
            'fogcd_mess_valid_error_position1': 'First presented wagon must start at position 1',
            'fogcd_mess_valid_error_position2': 'The specified position {0} already exists, wagon #{1}',
            'fogcd_mess_valid_error_num': 'The specified wagon {0} has already been validated, position #{1}',
            'fogcd_mess_valid_date_outgoing_act': 'Please enter a valid outgoing date for the act',
            'fogcd_mess_valid_not_date_outgoing_act': 'Fogcd_mess_valid_not_date_outgoing_act',
            'fogcd_mess_valid_not_cargo_name': 'Please enter cargo name',
            'fogcd_mess_valid_cargo_name': 'The specified cargo name is not in the CID directory.',
            'fogcd_mess_valid_not_reason_discrepancy': 'Specify reason for discrepancy.',
            'fogcd_mess_valid_null_condition_present': 'The car is not marked with a wagon.',

            'fogcd_value_vagonnik': 'Marked : {0}, Marked : {1}',
            'fogcd_mess_init_panel': 'Initializing module...',
            'fogcd_mess_load_wagon': 'Updating wagon info...',
            'fogcd_mess_load_db_uz': 'Updating wagon info from uz DB...',
            'fogcd_mess_load_return_wagon': 'Search Information on Returns',
            'fogcd_mess_update_operation_detention': 'Performing a wagon detention update operation',
            'fogcd_mess_cancel_operation_detention': 'Cancel the operation "Update Detention by Car"',
            'fogcd_mess_ok_operation_detention': 'Operation "Update Detention by Wagon" completed',
            'fogcd_mess_error_operation_detention': 'Error performing operation "Update detention by wagon", error code = ',
            'fogcd_mess_update_operation_return_open': 'Performing the operation "Open return on wagon"',
            'fogcd_mess_cancel_operation_return_open': 'Canceling the operation "Open return wagon"',
            'fogcd_mess_ok_operation_return_open': 'Operation "Open wagon return" completed',
            'fogcd_mess_error_operation_return_open': 'Error executing operation "Open return wagon", error code = ',
            'fogcd_mess_update_operation_return_close': 'Performing Close Return Car operation',
            'fogcd_mess_cancel_operation_return_close': 'Canceling the operation "Close Return by Car"',
            'fogcd_mess_ok_operation_return_close': 'Operation "Close return wagon" completed',
            'fogcd_mess_error_operation_return_close': 'Error executing operation "Close return by wagon", error code = ',
            'fogcd_mess_error_operation_return_close_not_id': 'Error executing operation "Close return by wagon", return row id is undefined',
            'fogcd_mess_run_operation_present': 'Performing the operation "Present a wagon to the FG"',
            'fogcd_mess_cancel_operation_present': 'Canceling the operation "Present a wagon to the FG"',
            'fogcd_mess_ok_operation_present': 'Operation "Present wagon to OZ" completed',
            'fogcd_mess_error_operation_present': 'Error performing the operation "Present a wagon to UZ", error code = ',
            'fogcd_mess_run_operation_return_present': 'Performing the operation "Return the car presented to the FG"',
            'fogcd_mess_cancel_operation_return_present': 'Canceling the operation "Return the wagon presented to the FG"',
            'fogcd_mess_ok_operation_return_present': 'Operation "Return the wagon presented to the FG" has been completed',
            'fogcd_mess_error_operation_return_present': 'Error performing the operation "Return the wagon presented to UZ", error code = ',
            'fogcd_mess_run_operation_remove_wagon': 'Running "Remove wagon from present train"',
            'fogcd_mess_cancel_operation_remove_wagon': 'Canceling the operation "Remove wagon from train for presentation"',
            'fogcd_mess_ok_operation_remove_wagon': 'Remove wagon operation completed for presentation',
            'fogcd_mess_error_operation_remove_wagon': 'Error performing operation "Remove wagon from train for presentation", error code = ',
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

    function form_outgoing_cars_detali(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$form_outgoing_cars = $(selector);
        if (this.$form_outgoing_cars.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$form_outgoing_cars.attr('id');
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    form_outgoing_cars_detali.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // Инициализаия формы
    form_outgoing_cars_detali.prototype.init = function (options) {
        this.init = true;
        //-------------------------------------
        // Сообщение
        LockScreen(langView('fogcd_mess_init_panel', App.Langs));
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
        // Создадим и инициализируем модуль Задержания и возвраты детвльно
        var TOGDR = App.table_outgoing_detention_return; // Отправленные вагоны
        var sel_ogdr = 'table-ogdr-' + this.selector;
        //----------------------------------------------------------------
        //this.list_station = [];
        this.elements = {};                     // Все элементы формы
        this.list_reason_discrepancy = null;    // Список
        this.list_detention_return = null;
        this.list_cargo = null;
        this.list_cargo_group = null;
        this.list_divisions = null;
        this.list_external_station = null;
        this.id = null;                         // текущее id вагона
        this.wagon = null;                      // Текущий вагон
        this.current_id_return_wagons = null;   // Текущий id открытой строки возврата
        this.current_id_condition = null;       // Текущий id разметки
        this.arrival_id_wagon_rent = null;      // Текущий id аренды по прибытию
        this.outgoing_id_wagon_rent = null;     // Текущий id аренды по отправке
        this.current_id_countrys = null;        // Текущий id администрации
        this.current_id_genus = null;           // Текущий id род вагона
        this.current_id_owner = null;           // Текущий id владелец
        this.detention_edit = false;            // Текущий режим правки задержания
        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['reason_discrepancy', 'detention_return', 'cargo', 'cargo_group', 'divisions', 'external_station'], false, function (result) {
            // Подгрузили списки
            this.list_reason_discrepancy = this.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', App.Lang, null);
            this.list_detention_return = this.ids_dir.getListDetention_Return('id', 'cause', App.Lang, null);
            this.list_cargo = this.ids_dir.getListCargo('id', 'cargo_name', App.Lang, null);
            this.list_cargo_group = this.ids_dir.getListCargoGroup('id', 'cargo_group_name', App.Lang, null);
            this.list_divisions = this.ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);
            this.list_external_station = this.ids_dir.getListExternalStation('code', 'station_name', App.Lang, null);
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
            var bt_present_car = {
                obj: 'bs_button',
                options: {
                    color: 'primary',
                    size: null,
                    class: null,
                    id: 'present_car',
                    label: 'Предъявить вагон',
                    title: '',
                    icon_left: 'fas fa-arrow-circle-left',
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                        this.action_present_wagon();
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
                    label: 'Вернуть вагон',
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
            var bt_car_return = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'car_return',
                    label: null,
                    title: '',
                    icon_left: null,
                    icon_right: 'fas fa-retweet',
                    click: function (event) {
                        event.preventDefault();
                        this.action_remove_wagon();
                    }.bind(this),
                }
            };
            var form_input_num = {
                obj: 'bs_input_number',
                element: null,
                options: {
                    id: 'num_car',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_num', App.Langs),
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
                    input_group_append_objs: [bt_car_return],
                },
                childs: []
            };
            var form_input_position_outgoing = {
                obj: 'bs_input_number',
                options: {
                    id: 'position_outgoing',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_position_outgoing', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_position_outgoing', App.Langs),
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
            var form_input_num_cont_1 = {
                obj: 'bs_input_text',
                options: {
                    id: 'num_cont_1',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_num_cont_1', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_num_cont_1', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_num_cont_2 = {
                obj: 'bs_input_text',
                options: {
                    id: 'num_cont_2',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_num_cont_2', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_num_cont_2', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
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
            var form_input_date_outgoing_act = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'date_outgoing_act',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_date_outgoing_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_date_outgoing_act', App.Langs),
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
            var form_input_reason_discrepancy_amkr = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'reason_discrepancy_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_reason_discrepancy_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_reason_discrepancy_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_reason_discrepancy,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'reason_discrepancy_amkr', "");
                            } else {
                                this.form.set_validation_object_error(null, 'reason_discrepancy_amkr', langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_reason_discrepancy_uz = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'reason_discrepancy_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_reason_discrepancy_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_reason_discrepancy_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_reason_discrepancy,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'reason_discrepancy_uz', "");
                            } else {
                                this.form.set_validation_object_error(null, 'reason_discrepancy_uz', langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
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
            var form_input_adm_kod = {
                obj: 'bs_input_text',
                options: {
                    id: 'adm_kod',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_adm_kod', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_adm_kod', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_rod_vag_abbr = {
                obj: 'bs_input_text',
                options: {
                    id: 'rod_vag_abbr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_rod_vag_abbr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_rod_vag_abbr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_gruzp_uz = {
                obj: 'bs_input_number',
                options: {
                    id: 'gruzp_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_gruzp_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_gruzp_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_tara_uz = {
                obj: 'bs_input_number',
                options: {
                    id: 'tara_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_tara_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_tara_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_common4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_condition_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'condition_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_condition_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_condition_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_condition_present = {
                obj: 'bs_input_text',
                options: {
                    id: 'condition_present',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_condition_present', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_condition_present', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            // Задержания возврат
            var fieldset_detention_return = {
                obj: 'fieldset',
                options: {
                    class: 'border-warning',
                    legend: langView('fogcd_title_fieldset_detention_return', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_detention_return1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_textarea_condition_present = {
                obj: 'bs_textarea',
                options: {
                    id: 'condition_present',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_condition_present', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: null,
                    textarea_title: langView('fogcd_title_condition_present', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_detention = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_detention = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_detention = {
                obj: 'fieldset',
                options: {
                    class: 'border-warning',
                    legend: langView('fogcd_title_fieldset_detention', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_detention1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_detention1_1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 11,
                    class: 'text-left',
                },
                childs: []
            };
            var col_detention1_2 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 1,
                    class: 'pull-right mb-1 text-left',
                },
                childs: []
            };
            var form_alert = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'detention',
                },
                childs: []
            };
            var bt_detention_save = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'detention_save',
                    label: null,
                    title: langView('fogcd_title_button_save', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_save_detention();
                    }.bind(this),
                }
            };
            var bt_detention_edit = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'detention_edit',
                    label: null,
                    title: langView('fogcd_title_button_edit', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-edit',
                    click: function (event) {
                        event.preventDefault();
                        this.action_edit_detention();
                    }.bind(this),
                }
            };
            var form_row_detention2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cause_detention = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'cause_detention',
                    validation_group: 'detention',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cause_detention', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_cause_detention', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_detention_return,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getDetention_Return_Of_CultureName('cause', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_control_ok('detention', 'cause_detention', "");
                            } else {
                                this.form.set_validation_control_error('detention', 'cause_detention', langView('fogcd_mess_valid_cause_detention', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_detention_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'detention_start',
                    validation_group: 'detention',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_detention_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_detention_start', App.Langs),
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
            var form_input_detention_stop = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'detention_stop',
                    validation_group: 'detention',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_detention_stop', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_detention_stop', App.Langs),
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
            var form_row_return = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_return = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_return = {
                obj: 'fieldset',
                options: {
                    class: 'border-warning',
                    legend: langView('fogcd_title_fieldset_return', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_return1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_return1_1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 11,
                    class: 'text-left',
                },
                childs: []
            };
            var col_return1_2 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 1,
                    class: 'pull-right mb-1 text-left',
                },
                childs: []
            };
            var form_alert_return = {
                obj: 'bs_alert',
                options: {
                    id: null,
                    class: null,
                    validation_group: 'return',
                },
                childs: []
            };
            var bt_return_open = {
                obj: 'bs_button',
                options: {
                    color: 'danger',
                    size: 'sm',
                    class: null,
                    id: 'return_open',
                    label: null,
                    title: langView('fogcd_title_button_return_open', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-save',
                    click: function (event) {
                        event.preventDefault();
                        this.action_return_open();
                    }.bind(this),
                }
            };
            var bt_return_close = {
                obj: 'bs_button',
                options: {
                    color: 'warning',
                    size: 'sm',
                    class: null,
                    id: 'return_close',
                    label: null,
                    title: langView('fogcd_title_button_return_close', App.Langs),
                    icon_left: null,
                    icon_right: 'fas fa-times',
                    click: function (event) {
                        event.preventDefault();
                        this.action_return_close();
                    }.bind(this),
                }
            };
            var form_row_return2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cause_return = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'cause_return',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cause_return', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_cause_return', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_detention_return,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getDetention_Return_Of_CultureName('cause', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_control_ok('return', 'cause_return', "");
                            } else {
                                this.form.set_validation_control_error('return', 'cause_return', langView('fogcd_mess_valid_cause_return', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_return_start = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'return_start',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_start', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_start', App.Langs),
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
            var form_input_return_stop = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'return_stop',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_stop', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_stop', App.Langs),
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
            var form_row_return3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_return_num_act = {
                obj: 'bs_input_text',
                options: {
                    id: 'return_num_act',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_num_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_num_act', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                },
                childs: []
            };
            var form_input_return_date_act = {
                obj: 'bs_input_datetime',
                options: {
                    id: 'return_date_act',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_date_act', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_return_date_act', App.Langs),
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
            var form_textarea_return_note = {
                obj: 'bs_textarea',
                options: {
                    id: 'return_note',
                    validation_group: 'return',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_return_note', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 2,
                    textarea_class: 'inp-manual',
                    textarea_title: langView('fogcd_title_return_note', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_row_return4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_return_table = {
                obj: 'bs_col',
                options: {
                    id: sel_ogdr,
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            // ДАННЫЕ О ПОГРУЗКЕ
            var fieldset_loading_data = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('fogcd_title_fieldset_loading_data', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_loading_data1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_checkbox_loaded_car = {
                obj: 'bs_checkbox',
                element: null,
                options: {
                    id: 'loaded_car',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_loaded_car', App.Langs),
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
            var form_row_loading_data2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cargo_name = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'cargo_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 7,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_cargo_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    element_data: this.list_cargo,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getCargo_Of_CultureName('cargo_name', text)
                            if (obj && obj.length > 0) {
                                this.out_clear();
                                this.form.set_validation_object_ok(null, 'cargo_name', "");
                                // Это порожний вагон
                                var res = list_groups_cargo.indexOf(obj[0].id_group)
                                if (list_groups_cargo.indexOf(obj[0].id_group) >= 0) {
                                    // вагон порожний
                                    this.elements.checkbox_loaded_car.val(false);
                                    this.elements.autocomplete_loading_devision.val(1);
                                } else {
                                    // Вагон гружен
                                    this.elements.checkbox_loaded_car.val(true);
                                    // Уточним группу груза (если уже были вагоны в левой части)
                                    if (this.wagon_settings && this.wagon_settings.id_cargo && this.wagon_settings.id_cargo === obj[0].id && this.wagon_settings.id_division) {
                                        this.elements.autocomplete_loading_devision.val(this.wagon_settings.id_division); // Убрать подразделение по умолчанию
                                        this.elements.input_text_loading_devision_code.val(this.wagon_settings.division_code); // Убрать подразделение по умолчанию                                        this.elements.autocomplete_loading_devision_code.val(this.wagon_settings.division_code); // Убрать подразделение по умолчанию
                                    } else {
                                        this.elements.autocomplete_loading_devision.val(null); // Убрать подразделение
                                        this.elements.input_text_loading_devision_code.val(null); // Убрать подразделение
                                    }
                                }
                            } else {
                                this.form.set_validation_object_error(null, 'cargo_name', langView('fogcd_mess_valid_cargo', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_loading_devision_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'loading_devision_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_loading_devision_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_loading_devision_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_loading_devision = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'loading_devision',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_loading_devision', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_loading_devision', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_readonly: false,
                    element_data: this.list_divisions,
                    element_minLength: 0,
                    element_out_value: false,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getDivisions_Of_CultureName('division_abbr', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'loading_devision', "");
                                this.form.val('loading_devision_code', obj[0].code);
                            } else {
                                this.form.set_validation_object_error(null, 'loading_devision', langView('fogcd_mess_valid_loading_devision', App.Langs));
                                this.form.val('loading_devision_code', '');
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_row_loading_data3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_code_station_to = {
                obj: 'bs_input_text',
                options: {
                    id: 'code_station_to',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_code_station_to', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_code_station_to', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_name_station_to = {
                obj: 'bs_autocomplete',
                options: {
                    id: 'name_station_to',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_name_station_to', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-manual',
                    input_title: langView('fogcd_title_name_station_to', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_group: false,
                    input_readonly: false,
                    element_data: this.list_external_station,
                    element_minLength: 0,
                    element_out_value: true,
                    element_val_inp: 'value',
                    element_check: function (text) {
                        if (text) {
                            var obj = this.ids_dir.getExternalStation_Of_CultureName('station_name', text)
                            if (obj && obj.length > 0) {
                                this.form.set_validation_object_ok(null, 'name_station_to', "");
                                this.elements.input_text_code_station_to.val(obj[0].code);
                            } else {
                                this.form.set_validation_object_error(null, 'name_station_to', langView('fogcd_mess_valid_name_station_to', App.Langs));
                                this.elements.input_text_code_station_to.val('');
                                //this.elements.autocomplete_name_station_to.text('');
                            }
                        } else {
                            this.elements.input_text_code_station_to.val('');
                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_owner_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'owner_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_owner_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_owner_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: false,
                    input_group: false,
                },
                childs: []
            };
            var form_row_loading_data4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_operator_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'operator_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_operator_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_operator_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_limiting_loading_amkr = {
                obj: 'bs_input_text',
                options: {
                    id: 'limiting_loading_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_limiting_loading_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_limiting_loading_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_loading_data5 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_textarea_limiting_loading_uz = {
                obj: 'bs_textarea',
                options: {
                    id: 'limiting_loading_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_limiting_loading_uz', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 2,
                    textarea_class: 'inp-auto',
                    textarea_title: langView('fogcd_title_limiting_loading_uz', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_loading_data6 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_epd = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_epd = {
                obj: 'fieldset',
                options: {
                    class: 'border-info',
                    legend: langView('fogcd_title_fieldset_epd', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_epd1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_uz_doc_num = {
                obj: 'bs_input_text',
                options: {
                    id: 'uz_doc_num',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_uz_doc_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_uz_doc_num', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_vesg_uz_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'vesg_uz_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_vesg_uz_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_vesg_uz_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_ves_tary_uz_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'ves_tary_uz_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_ves_tary_uz_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_ves_tary_uz_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_brigadier_loading_uz_doc = {
                obj: 'bs_input_text',
                options: {
                    id: 'brigadier_loading_uz_doc',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_brigadier_loading_uz_doc', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_brigadier_loading_uz_doc', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_epd2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_kod_etsng = {
                obj: 'bs_input_text',
                options: {
                    id: 'kod_etsng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_kod_etsng', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_kod_etsng', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_textarea_name_etsng = {
                obj: 'bs_textarea',
                options: {
                    id: 'name_etsng',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_name_etsng', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 2,
                    textarea_class: 'inp-epd',
                    textarea_title: langView('fogcd_title_name_etsng', App.Langs),
                    textarea_maxlength: null,
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_epd3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_station_code_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'station_code_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_station_code_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_station_code_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_station_name_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'station_name_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_station_name_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_station_name_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_railway_name_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'railway_name_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 5,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_railway_name_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_railway_name_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_epd4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_client_kod_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'client_kod_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_client_kod_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_client_kod_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_client_name_on = {
                obj: 'bs_input_text',
                options: {
                    id: 'client_name_on',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_client_name_on', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-epd',
                    input_title: langView('fogcd_title_client_name_on', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            //
            var form_row_loading_data7 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var col_sap = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var fieldset_sap = {
                obj: 'fieldset',
                options: {
                    class: 'border-info',
                    legend: langView('fogcd_title_fieldset_sap', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_sap1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_num = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_num',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_num', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_netto = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_netto',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 2,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_netto', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_netto', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_responsible_fio = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_responsible_fio',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_responsible_fio', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_responsible_fio', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_sap2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_warehouse_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_warehouse_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_warehouse_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_warehouse_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_warehouse_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_warehouse_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_warehouse_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_warehouse_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_sap3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_cargo_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_cargo_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_cargo_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_cargo_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_cargo_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_cargo_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_cargo_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_cargo_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_sap4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_destination_station_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_destination_station_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_destination_station_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_destination_station_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_destination_station_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_destination_station_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_destination_station_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_destination_station_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_sap5 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_shipper_code = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_shipper_code',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_shipper_code', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_shipper_code', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_sap_outgoing_supply_shipper_name = {
                obj: 'bs_input_text',
                options: {
                    id: 'sap_outgoing_supply_shipper_name',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 9,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_sap_outgoing_supply_shipper_name', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-sap',
                    input_title: langView('fogcd_title_sap_outgoing_supply_shipper_name', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };

            // ДАННЫЕ О ПРИБЫТИИ'
            var fieldset_data_arrival = {
                obj: 'fieldset',
                options: {
                    class: 'border-primary',
                    legend: langView('fogcd_title_fieldset_data_arrival', App.Langs),
                    class_legend: null,
                },
                childs: []
            };
            var form_row_data_arrival1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cargo_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'cargo_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_cargo_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_cargo_sap = {
                obj: 'bs_input_text',
                options: {
                    id: 'cargo_sap',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 8,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_cargo_sap', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_cargo_sap', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_data_arrival2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_date_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'date_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 4,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_date_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_date_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_owner_name_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'owner_name_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 8,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_owner_name_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_owner_name_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_data_arrival3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_operator_name_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'operator_name_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_operator_name_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_operator_name_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_limiting_loading_arrival = {
                obj: 'bs_input_text',
                options: {
                    id: 'limiting_loading_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_limiting_loading_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_limiting_loading_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };

            // Собираем
            col1.childs.push(bt_present_car);
            col1.childs.push(bt_return_car);
            row1.childs.push(col1);
            //
            form_row_common1.childs.push(form_input_num);
            form_row_common1.childs.push(form_input_position_outgoing);
            form_row_common1.childs.push(form_input_num_cont_1);
            form_row_common1.childs.push(form_input_num_cont_2);
            form_row_common2.childs.push(form_input_date_outgoing_act);
            form_row_common2.childs.push(form_input_reason_discrepancy_amkr);
            form_row_common2.childs.push(form_input_reason_discrepancy_uz);
            form_row_common3.childs.push(form_input_adm_kod);
            form_row_common3.childs.push(form_input_rod_vag_abbr);
            form_row_common3.childs.push(form_input_gruzp_uz);
            form_row_common3.childs.push(form_input_tara_uz);
            form_row_common4.childs.push(form_input_condition_arrival);
            form_row_common4.childs.push(form_input_condition_present);
            //
            fieldset_common.childs.push(form_row_common1);
            fieldset_common.childs.push(form_row_common2);
            fieldset_common.childs.push(form_row_common3);
            fieldset_common.childs.push(form_row_common4);
            //
            form_row_detention_return1.childs.push(form_textarea_condition_present);
            fieldset_detention_return.childs.push(form_row_detention_return1);
            //
            col_detention1_2.childs.push(bt_detention_save);
            col_detention1_2.childs.push(bt_detention_edit);
            col_detention1_1.childs.push(form_alert);
            form_row_detention1.childs.push(col_detention1_1);
            form_row_detention1.childs.push(col_detention1_2);
            fieldset_detention.childs.push(form_row_detention1);

            form_row_detention2.childs.push(form_input_cause_detention);
            form_row_detention2.childs.push(form_input_detention_start);
            form_row_detention2.childs.push(form_input_detention_stop);

            fieldset_detention.childs.push(form_row_detention2);
            col_detention.childs.push(fieldset_detention);
            form_row_detention.childs.push(col_detention);
            fieldset_detention_return.childs.push(form_row_detention);
            //
            //
            col_return1_2.childs.push(bt_return_open);
            col_return1_2.childs.push(bt_return_close);
            col_return1_1.childs.push(form_alert_return);
            form_row_return1.childs.push(col_return1_1);
            form_row_return1.childs.push(col_return1_2);
            fieldset_return.childs.push(form_row_return1);
            //
            form_row_return2.childs.push(form_input_cause_return);
            form_row_return2.childs.push(form_input_return_start);
            form_row_return2.childs.push(form_input_return_stop);
            fieldset_return.childs.push(form_row_return2);
            //
            form_row_return3.childs.push(form_input_return_num_act);
            form_row_return3.childs.push(form_input_return_date_act);
            form_row_return3.childs.push(form_textarea_return_note);
            fieldset_return.childs.push(form_row_return3);
            // Таблица возвратов
            form_row_return4.childs.push(col_return_table);
            fieldset_return.childs.push(form_row_return4);
            //
            col_return.childs.push(fieldset_return);
            form_row_return.childs.push(col_return);
            fieldset_detention_return.childs.push(form_row_return);
            //
            form_row_loading_data1.childs.push(form_checkbox_loaded_car);
            //
            form_row_loading_data2.childs.push(form_input_cargo_name);
            form_row_loading_data2.childs.push(form_input_loading_devision_code);
            form_row_loading_data2.childs.push(form_input_loading_devision);
            //
            form_row_loading_data3.childs.push(form_input_code_station_to);
            form_row_loading_data3.childs.push(form_input_name_station_to);
            form_row_loading_data3.childs.push(form_input_owner_name);
            //
            form_row_loading_data4.childs.push(form_input_operator_name);
            form_row_loading_data4.childs.push(form_input_limiting_loading_amkr);
            //
            form_row_loading_data5.childs.push(form_textarea_limiting_loading_uz);
            //
            form_row_epd1.childs.push(form_input_uz_doc_num);
            form_row_epd1.childs.push(form_input_vesg_uz_doc);
            form_row_epd1.childs.push(form_input_ves_tary_uz_doc);
            form_row_epd1.childs.push(form_input_brigadier_loading_uz_doc);
            fieldset_epd.childs.push(form_row_epd1);
            //
            form_row_epd2.childs.push(form_input_kod_etsng);
            form_row_epd2.childs.push(form_textarea_name_etsng);
            fieldset_epd.childs.push(form_row_epd2);
            //
            form_row_epd3.childs.push(form_input_station_code_on);
            form_row_epd3.childs.push(form_input_station_name_on);
            form_row_epd3.childs.push(form_input_railway_name_on);
            fieldset_epd.childs.push(form_row_epd3);
            //
            form_row_epd4.childs.push(form_input_client_kod_on);
            form_row_epd4.childs.push(form_input_client_name_on);
            fieldset_epd.childs.push(form_row_epd4);
            //
            col_epd.childs.push(fieldset_epd);
            form_row_loading_data6.childs.push(col_epd);
            //
            form_row_sap1.childs.push(form_input_sap_outgoing_supply_num);
            form_row_sap1.childs.push(form_input_sap_outgoing_supply_netto);
            form_row_sap1.childs.push(form_input_sap_outgoing_supply_responsible_fio);
            fieldset_sap.childs.push(form_row_sap1);
            //
            form_row_sap2.childs.push(form_input_sap_outgoing_supply_warehouse_code);
            form_row_sap2.childs.push(form_input_sap_outgoing_supply_warehouse_name);
            fieldset_sap.childs.push(form_row_sap2);
            //
            form_row_sap3.childs.push(form_input_sap_outgoing_supply_cargo_code);
            form_row_sap3.childs.push(form_input_sap_outgoing_supply_cargo_name);
            fieldset_sap.childs.push(form_row_sap3);
            //
            form_row_sap4.childs.push(form_input_sap_outgoing_supply_destination_station_code);
            form_row_sap4.childs.push(form_input_sap_outgoing_supply_destination_station_name);
            fieldset_sap.childs.push(form_row_sap4);
            //
            form_row_sap5.childs.push(form_input_sap_outgoing_supply_shipper_code);
            form_row_sap5.childs.push(form_input_sap_outgoing_supply_shipper_name);
            fieldset_sap.childs.push(form_row_sap5);
            //
            col_sap.childs.push(fieldset_sap);
            form_row_loading_data6.childs.push(col_sap);
            //
            fieldset_loading_data.childs.push(form_row_loading_data1);
            fieldset_loading_data.childs.push(form_row_loading_data2);
            fieldset_loading_data.childs.push(form_row_loading_data3);
            fieldset_loading_data.childs.push(form_row_loading_data4);
            fieldset_loading_data.childs.push(form_row_loading_data5);
            fieldset_loading_data.childs.push(form_row_loading_data6);
            fieldset_loading_data.childs.push(form_row_loading_data7);
            //
            form_row_data_arrival1.childs.push(form_input_cargo_arrival);
            form_row_data_arrival1.childs.push(form_input_cargo_sap);
            //
            form_row_data_arrival2.childs.push(form_input_date_arrival);
            form_row_data_arrival2.childs.push(form_input_owner_name_arrival);
            //
            form_row_data_arrival3.childs.push(form_input_operator_name_arrival);
            form_row_data_arrival3.childs.push(form_input_limiting_loading_arrival);
            //
            fieldset_data_arrival.childs.push(form_row_data_arrival1);
            fieldset_data_arrival.childs.push(form_row_data_arrival2);
            fieldset_data_arrival.childs.push(form_row_data_arrival3);
            //
            col_detali.childs.push(fieldset_common);
            col_detali.childs.push(fieldset_detention_return);
            col_detali.childs.push(fieldset_loading_data);
            col_detali.childs.push(fieldset_data_arrival);
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
                    this.$form_outgoing_cars.empty();
                    this.$form_outgoing_cars.append(this.form.$form);
                    // Инициализация таблица возвратов детально
                    this.table_outgoing_detention_return = new TOGDR('div#' + sel_ogdr);             // Создадим экземпляр
                    this.table_outgoing_detention_return.init({
                        type_report: 'return_cars',
                        alert: null,
                        ids_dir: this.ids_dir,
                        ids_wsd: null,
                        fn_select_rows: function (rows) {

                        }.bind(this),
                        fn_init: function (init) {
                            // Инициализация закончена
                            if (typeof this.settings.fn_init === 'function') {
                                this.settings.fn_init(this.init);
                            };
                        }.bind(this),
                    });

                }.bind(this),
            });
        }.bind(this));
    }
    //----------------------------------------------------------------
    // Очистить форму
    form_outgoing_cars_detali.prototype.clear_out_validation = function () {
        this.out_clear();
        this.form.validation_common.clear_all();
        this.form.validation_detention.clear_all();
        this.form.validation_return.clear_all();
    };
    // Очистить форму
    form_outgoing_cars_detali.prototype.clear_form = function () {
        this.clear_out_validation();
        if (this.elements) {
            this.elements.input_number_num_car.val('');
            this.elements.input_number_position_outgoing.val('1');
            this.elements.input_text_num_cont_1.val('');
            this.elements.input_text_num_cont_2.val('');
            this.elements.input_datetime_date_outgoing_act.set(null); // уберем дату
            this.elements.autocomplete_reason_discrepancy_amkr.text('');
            this.elements.autocomplete_reason_discrepancy_uz.text('');
            this.elements.input_text_adm_kod.val('');
            this.elements.input_text_rod_vag_abbr.val('');
            this.elements.input_number_gruzp_uz.val('');
            this.elements.input_number_tara_uz.val('');
            this.elements.input_text_condition_arrival.val('');
            this.elements.input_text_condition_present.val('');

            this.elements.textarea_condition_present.val('');
            // Задержание
            this.elements.autocomplete_cause_detention.text('');
            this.elements.input_datetime_detention_start.set(null); // уберем дату
            this.elements.input_datetime_detention_stop.set(null); // уберем дату
            // Возврат
            this.elements.autocomplete_cause_return.text('');
            this.elements.input_datetime_return_start.set(null); // уберем дату
            this.elements.input_datetime_return_stop.set(null); // уберем дату
            this.elements.input_text_return_num_act.val('');
            this.elements.input_datetime_return_date_act.set(null); // уберем дату
            this.elements.textarea_return_note.val('');
            //this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
            // Данные о погрузке
            this.elements.checkbox_loaded_car.val(false);
            this.elements.autocomplete_cargo_name.text('');
            this.elements.input_text_loading_devision_code.val('');
            this.elements.autocomplete_loading_devision.text('');
            this.elements.input_text_code_station_to.val('');
            this.elements.autocomplete_name_station_to.text('');
            this.elements.input_text_owner_name.val('');
            this.elements.input_text_operator_name.val('');
            this.elements.input_text_limiting_loading_amkr.val('');
            this.elements.textarea_limiting_loading_uz.val('');
            // ЭПД
            this.elements.input_text_uz_doc_num.val('');
            this.elements.input_text_vesg_uz_doc.val('');
            this.elements.input_text_ves_tary_uz_doc.val('');
            this.elements.input_text_brigadier_loading_uz_doc.val('');
            //
            this.elements.input_text_kod_etsng.val('');
            this.elements.textarea_name_etsng.val('');
            //
            this.elements.input_text_station_code_on.val('');
            this.elements.input_text_station_name_on.val('');
            this.elements.input_text_railway_name_on.val('');
            //
            this.elements.input_text_client_kod_on.val('');
            this.elements.input_text_client_name_on.val('');
            // САП
            this.elements.input_text_sap_outgoing_supply_num.val('');
            this.elements.input_text_sap_outgoing_supply_netto.val('');
            this.elements.input_text_sap_outgoing_supply_responsible_fio.val('');
            this.elements.input_text_sap_outgoing_supply_warehouse_code.val('');
            this.elements.input_text_sap_outgoing_supply_warehouse_name.val('');
            this.elements.input_text_sap_outgoing_supply_cargo_code.val('');
            this.elements.input_text_sap_outgoing_supply_cargo_name.val('');
            this.elements.input_text_sap_outgoing_supply_destination_station_code.val('');
            this.elements.input_text_sap_outgoing_supply_destination_station_name.val('');
            this.elements.input_text_sap_outgoing_supply_shipper_code.val('');
            this.elements.input_text_sap_outgoing_supply_shipper_name.val('');
            // Прибытие
            this.elements.input_text_cargo_arrival.val('');
            this.elements.input_text_cargo_sap.val('');
            this.elements.input_text_date_arrival.val('');
            this.elements.input_text_owner_name_arrival.val('');
            this.elements.input_text_operator_name_arrival.val('');
            this.elements.input_text_limiting_loading_arrival.val('');
        } else {
            throw new Error('this.elements - пустой, нет привязки');
        }
    };
    // Обновить информацию по вагону
    form_outgoing_cars_detali.prototype.update_wagon = function (callback) {
        LockScreen(langView('fogcd_mess_load_wagon', App.Langs));
        this.ids_wsd.getViewOutgoingCarsOfIDCar(this.id, function (wagon) {
            if (wagon) {
                this.wagon = wagon;
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            } else {
                this.wagon = null;
                this.out_error(langView('fogcd_mess_warning_no_data_wagon_ids', App.Langs).format(this.id));
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagon);
                }
            }
        }.bind(this));

    };
    // Показать детали
    form_outgoing_cars_detali.prototype.wagon_detali = function (id, options) {
        LockScreen(langView('fogcd_mess_load_wagon', App.Langs));
        this.clear_out_validation();
        this.id = id;
        this.update_wagon(function (wagon) {
            if (wagon !== null) {
                if (this.elements) {
                    if (options.type === 1) {
                        // режим правки
                        this.edit();
                        LockScreen(langView('fogcd_mess_load_db_uz', App.Langs));
                        var process = 3;
                        //TODO:!ОТКЛЮЧИЛ ДЛЯ ПРОВЕРКИ
                        //options.info = null;
                        this.uz_dir.getInfoWagonOfNum(this.wagon.num, function (info) {
                            if (info === null) {
                                // Иногда нет ответа, сообщаем!
                                this.out_warning(langView('fogcd_mess_warning_no_data_wagon_uz', App.Langs))
                            }
                            options.info = info;
                            process--;
                            if (process === 0) {
                                //LockScreenOff();
                                this.wiew_wagon_detali(this.wagon, options);
                            }
                        }.bind(this));
                        this.ids_dir.getWagonsOfNum(this.wagon.num, function (dir_wagon) {
                            if (dir_wagon === null) {
                                // Иногда нет ответа, сообщаем!
                                this.out_warning(langView('fogcd_mess_warning_no_data_dir_wagon', App.Langs))
                            }
                            options.dir_wagon = dir_wagon;
                            process--;
                            if (process === 0) {
                                //LockScreenOff();
                                this.wiew_wagon_detali(this.wagon, options);
                            }
                        }.bind(this));
                        this.ids_wsd.getWagonInternalOperationOfIDWIR(wagon.id_wir, function (list) {
                            var last_wio = this.ids_wsd.getLastWagonInternalOperationOfWIR(list);
                            options.wio = last_wio;
                            process--;
                            if (process === 0) {
                                //LockScreenOff();
                                this.wiew_wagon_detali(this.wagon, options);
                            }
                        }.bind(this));
                    } else {
                        // режим просмотра
                        this.view();
                        this.wiew_wagon_detali(this.wagon, options)
                        LockScreenOff();
                    }
                } else {
                    throw new Error('this.elements - пустой, нет привязки');
                }
            }
        }.bind(this));
    };
    // Показать детали после определения типа (view & edit)
    form_outgoing_cars_detali.prototype.wiew_wagon_detali = function (wagon, options) {
        // Определим основные свойства
        this.wagon_settings = $.extend({
            type: 0,                // Тип операции 0-просмотр, 1-правка
            position: 1,            // Предлогаемая позиция в составе (используется в режиме правка)
            info: null,             // Данные по вагону из базы УЗ (используется в режиме правка)
            dir_wagon: null,        // Данные по вагону из справочника ИДС (используется в режиме правка)
            id_group: null,         // предыдущая группа груза (используется в режиме правка)
            id_division: null,      // предыдущее id подразделения погрузки (используется в режиме правка)
            station_uz_code: null,  // предыдущеий код станции прибытия (используется в режиме правка)
            wio: null,              // текущая операция  (используется в режиме правка)
            present_wagons: null,   // Список предявленных вагонов(используется в режиме правка)
        }, options);

        this.current_id_condition = null;       // Текущий id разметки
        this.arrival_id_wagon_rent = null;      // Текущий id аренды по прибытию
        this.outgoing_id_wagon_rent = null;     // Текущий id аренды по отправке
        this.current_id_countrys = null;        // Текущий id администрации
        this.current_id_genus = null;           // Текущий id род вагона
        this.current_id_owner = null;           // Текущий id владелец

        var adm_kod = wagon.outgoing_uz_vagon_wagon_adm;
        var gruzp_uz = wagon.outgoing_uz_vagon_gruzp_uz;
        var tara_uz = wagon.outgoing_uz_vagon_tara_uz;
        var note_uz = wagon.outgoing_uz_vagon_note_uz;
        var current_condition = wagon['outgoing_uz_vagon_condition_abbr' + App.Lang];
        var current_rod = wagon['outgoing_uz_vagon_rod_abbr_' + App.Lang];

        var laden = wagon.outgoing_uz_vagon_laden;
        var outgoing_uz_vagon_id_cargo = wagon.outgoing_uz_vagon_id_cargo;
        var outgoing_uz_vagon_id_division = wagon.outgoing_uz_vagon_id_division;
        var outgoing_uz_vagon_division_code = wagon.outgoing_uz_vagon_division_code;
        var outgoing_uz_vagon_to_station_uz_code = wagon.outgoing_uz_vagon_to_station_uz_code;
        //var outgoing_uz_vagon_to_station_uz_name = wagon.outgoing_uz_vagon_to_station_uz_name;

        var owner_name = wagon['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang];
        var arr_rent_operator = wagon['outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang];
        var arr_rent_limiting = wagon['outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang];
        var out_rent_operator = wagon['outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_' + App.Lang];
        var out_rent_limiting = wagon['outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_' + App.Lang];

        // Настроем отображение если окно в режиме редактирования
        if (this.wagon_settings.type === 1) {
            if (this.wagon_settings.dir_wagon) {
                gruzp_uz = options.dir_wagon.gruzp;         //
                tara_uz = options.dir_wagon.tara;
                // Администрация
                var wagon_contrys = options.dir_wagon.Directory_Countrys;
                this.current_id_countrys = wagon_contrys ? wagon_contrys.id : null;
                adm_kod = wagon_contrys ? wagon_contrys.code_sng : adm_kod;
                // Род вагона
                var wagon_genus = options.dir_wagon.Directory_GenusWagons;
                this.current_id_genus = wagon_genus ? wagon_genus.id : null;
                current_rod = wagon_genus ? wagon_genus['abbr_' + App.Lang] : current_rod;
                // Владелец
                var wagon_owners = options.dir_wagon.Directory_OwnersWagons;
                owner_name = wagon_owners ? wagon_owners['abbr_' + App.Lang] : owner_name;
                this.current_id_owner = wagon_owners ? wagon_owners.id : null;
                // Аренды
                var wagon_rents = options.dir_wagon.Directory_WagonsRent;
                if (wagon_rents) {
                    var out_wagon_rent = wagon_rents.find(function (o) {
                        return o.rent_end === null;
                    });
                    if (out_wagon_rent) {
                        this.outgoing_id_wagon_rent = out_wagon_rent.id;                        // Текущий id аренды по отправке
                        var dir_oper = out_wagon_rent.Directory_OperatorsWagons;
                        out_rent_operator = dir_oper ? dir_oper['abbr_' + App.Lang] : null;
                        var dir_ll = out_wagon_rent.Directory_LimitingLoading;
                        out_rent_limiting = dir_ll ? dir_ll['limiting_abbr_' + App.Lang] : null;
                    }
                    var rents = wagon_rents.filter(function (i) {
                        return i.rent_start <= wagon.arrival_sostav_date_adoption;
                    });
                    if (rents && rents.length > 0) {
                        var arr_wagon_rent = rents.sort(function (a, b) {
                            return b.id - a.id;
                        });
                        if (arr_wagon_rent && arr_wagon_rent.length > 0) {
                            this.arrival_id_wagon_rent = arr_wagon_rent[0].id;      // Текущий id аренды по прибытию
                            var dir_oper = arr_wagon_rent[0].Directory_OperatorsWagons;
                            arr_rent_operator = dir_oper ? dir_oper['abbr_' + App.Lang] : null;
                            var dir_ll = arr_wagon_rent[0].Directory_LimitingLoading;
                            arr_rent_limiting = dir_ll ? dir_ll['limiting_abbr_' + App.Lang] : null;
                        }
                    }

                }
                note_uz = options.dir_wagon.note;
                //current_condition wagon['arrival_uz_vagon_condition_abbr_' + App.Lang]
            };
            // Уточним группу груза (если уже были вагоны в левой части)
            if (this.wagon_settings && this.wagon_settings.id_cargo) {
                outgoing_uz_vagon_id_cargo = this.wagon_settings.id_cargo;
            }
            // Уточним группу груза (если уже были вагоны в левой части)
            if (this.wagon_settings && this.wagon_settings.laden) {
                laden = this.wagon_settings.laden;
            };
            // Уточним подразделение погрузки (если уже были вагоны в левой части)
            if (this.wagon_settings && this.wagon_settings.id_division) {
                outgoing_uz_vagon_id_division = this.wagon_settings.id_division;
            };
            // Уточним подразделение погрузки (если уже были вагоны в левой части)
            if (this.wagon_settings && this.wagon_settings.division_code) {
                outgoing_uz_vagon_division_code = this.wagon_settings.division_code;
            };

            // Уточним станцию назначения (если уже были вагоны в левой части)
            if (this.wagon_settings && this.wagon_settings.station_uz_code) {
                outgoing_uz_vagon_to_station_uz_code = this.wagon_settings.station_uz_code;
            };
            // Определим текущую разметку
            if (this.wagon_settings && this.wagon_settings.wio) {
                var dir_cond_arr = this.wagon_settings.wio.Directory_ConditionArrival;
                this.current_id_condition = dir_cond_arr ? dir_cond_arr.id : null;
                current_condition = dir_cond_arr ? dir_cond_arr['condition_abbr_' + App.Lang] : current_condition;
            };
        }
        // Проверим это правка
        if (this.wagon_settings.type === 1 && this.wagon_settings.info) {
            // Да заполним
            gruzp_uz = this.wagon_settings.info.carrying_capacity ? this.wagon_settings.info.carrying_capacity : gruzp_uz;         //
            tara_uz = this.wagon_settings.info.tara ? this.wagon_settings.info.tara : tara_uz;
            owner_name = this.wagon_settings.info.owner !== null && this.wagon_settings.info.owner !== '' ? this.wagon_settings.info.owner : owner_name;
            note_uz = (this.wagon_settings.info.exit_ban !== null ? this.wagon_settings.info.exit_ban + '; ' : '') + (this.wagon_settings.info.other_bans !== null ? this.wagon_settings.info.other_bans.replace(/<br>/g, '') : note_uz);
        }

        this.elements.input_number_num_car.val(wagon.num);
        this.elements.input_number_position_outgoing.val(this.wagon_settings.type === 1 ? this.wagon_settings.position : wagon.outgoing_car_position_outgoing);
        this.elements.input_text_num_cont_1.val(wagon.outgoing_uz_vagon_cont_1_nom_cont);
        this.elements.input_text_num_cont_2.val(wagon.outgoing_uz_vagon_cont_2_nom_cont);
        // сделал из-за того что неактивный компонент нехочет показывать дату
        if (this.wagon_settings.type !== 1) {
            this.elements.input_datetime_date_outgoing_act.enable();
            this.elements.input_datetime_date_outgoing_act.val(wagon.outgoing_car_date_outgoing_act); //
            this.elements.input_datetime_date_outgoing_act.disable();
        } else {
            this.elements.input_datetime_date_outgoing_act.val(wagon.outgoing_car_date_outgoing_act); //
        }

        this.elements.autocomplete_reason_discrepancy_amkr.text(wagon['outgoing_car_reason_discrepancy_amkr_name_' + App.Lang]);
        this.elements.autocomplete_reason_discrepancy_uz.text(wagon['outgoing_car_reason_discrepancy_uz_name_' + App.Lang]);
        //
        this.elements.input_text_adm_kod.val(adm_kod);
        this.elements.input_text_rod_vag_abbr.val(current_rod);
        this.elements.input_number_gruzp_uz.val(gruzp_uz);
        this.elements.input_number_tara_uz.val(tara_uz);
        //
        this.elements.input_text_condition_arrival.val(wagon['arrival_uz_vagon_condition_abbr_' + App.Lang]);
        //this.wagon_settings.type === 1 ? wagon['last_operation_condition_' + App.Lang] : wagon['outgoing_uz_vagon_condition_abbr' + App.Lang]
        this.elements.input_text_condition_present.val(current_condition);
        // -------------------------------------------
        var vagonik = wagon.outgoing_car_vagonnik_user ? wagon.outgoing_car_vagonnik_user : '';
        var vagonik_data = wagon.outgoing_car_vagonnik ? '(' + (wagon.outgoing_car_vagonnik ? moment(wagon.outgoing_car_vagonnik).format(format_datetime) : '') + ')' : '';
        var vagonik_note = wagon.outgoing_car_note_vagonnik ? wagon.outgoing_car_note_vagonnik : '';
        this.elements.textarea_condition_present.val(vagonik || vagonik_data || vagonik_note ? langView('fogcd_value_vagonnik', App.Langs).format(vagonik + vagonik_data, vagonik_note) : '-');
        // ---------- ЗАДЕРЖАНИЯ ------------------------------------------------------------------------------------
        this.wiew_detention_wagon_detali(wagon);
        // ---------- ВОЗВРАТЫ ------------------------------------------------------------------------------------
        this.wiew_return_wagon_detali(wagon)
        //this.elements.table_return_cars.view(null) // Очистить таблицу возвратов
        // Данные о погрузке
        this.elements.checkbox_loaded_car.val(laden);

        this.elements.autocomplete_cargo_name.val(outgoing_uz_vagon_id_cargo);

        this.elements.input_text_loading_devision_code.val(outgoing_uz_vagon_division_code);
        this.elements.autocomplete_loading_devision.val(outgoing_uz_vagon_id_division);
        this.elements.input_text_code_station_to.val(outgoing_uz_vagon_to_station_uz_code);
        this.elements.autocomplete_name_station_to.val(outgoing_uz_vagon_to_station_uz_code);
        this.elements.input_text_owner_name.val(owner_name);
        this.elements.input_text_operator_name.val(out_rent_operator);
        this.elements.input_text_limiting_loading_amkr.val(out_rent_limiting);
        this.elements.textarea_limiting_loading_uz.val(note_uz);
        // ЭПД
        this.elements.input_text_uz_doc_num.val(wagon.outgoing_uz_document_nom_doc);
        this.elements.input_text_vesg_uz_doc.val(wagon.outgoing_uz_vagon_vesg);
        this.elements.input_text_ves_tary_uz_doc.val(wagon.outgoing_uz_vagon_tara_uz);
        this.elements.input_text_brigadier_loading_uz_doc.val('');
        //
        this.elements.input_text_kod_etsng.val(wagon.outgoing_uz_vagon_cargo_etsng_code);
        this.elements.textarea_name_etsng.val(wagon['outgoing_uz_vagon_cargo_etsng_name_' + App.Lang]);
        //
        this.elements.input_text_station_code_on.val(wagon.outgoing_uz_document_code_stn_to);
        this.elements.input_text_station_name_on.val(wagon['outgoing_uz_document_station_to_name_' + App.Lang]);
        this.elements.input_text_railway_name_on.val(wagon['outgoing_uz_document_to_inlandrailway_name_' + App.Lang]);
        //
        this.elements.input_text_client_kod_on.val(wagon.outgoing_uz_document_code_consignee);
        this.elements.input_text_client_name_on.val(wagon['outgoing_uz_document_consignee_name_' + App.Lang]);
        // САП
        this.elements.input_text_sap_outgoing_supply_num.val(wagon.sap_outgoing_supply_num);
        this.elements.input_text_sap_outgoing_supply_netto.val(wagon.sap_outgoing_supply_netto);
        this.elements.input_text_sap_outgoing_supply_responsible_fio.val(wagon.sap_outgoing_supply_responsible_fio);
        this.elements.input_text_sap_outgoing_supply_warehouse_code.val(wagon.sap_outgoing_supply_warehouse_code);
        this.elements.input_text_sap_outgoing_supply_warehouse_name.val(wagon.sap_outgoing_supply_warehouse_name);
        this.elements.input_text_sap_outgoing_supply_cargo_code.val(wagon.sap_outgoing_supply_cargo_code);
        this.elements.input_text_sap_outgoing_supply_cargo_name.val(wagon.sap_outgoing_supply_cargo_name);
        this.elements.input_text_sap_outgoing_supply_destination_station_code.val(wagon.sap_outgoing_supply_destination_station_code);
        this.elements.input_text_sap_outgoing_supply_destination_station_name.val(wagon.sap_outgoing_supply_destination_station_name);
        this.elements.input_text_sap_outgoing_supply_shipper_code.val(wagon.sap_outgoing_supply_shipper_code);
        this.elements.input_text_sap_outgoing_supply_shipper_name.val(wagon.sap_outgoing_supply_shipper_name);
        // Прибытие
        this.elements.input_text_cargo_arrival.val(wagon['arrival_uz_vagon_cargo_name_' + App.Lang]);
        this.elements.input_text_cargo_sap.val(wagon.sap_incoming_supply_cargo_name);
        this.elements.input_text_date_arrival.val(wagon.arrival_sostav_date_adoption ? moment(wagon.arrival_sostav_date_adoption).format(format_datetime) : '');
        this.elements.input_text_owner_name_arrival.val(owner_name);
        this.elements.input_text_operator_name_arrival.val(arr_rent_operator);
        this.elements.input_text_limiting_loading_arrival.val(arr_rent_limiting);
    }
    // Показать детали задержания
    form_outgoing_cars_detali.prototype.wiew_detention_wagon_detali = function (wagon) {
        var id_outgoing_detention = wagon.outgoing_car_id_outgoing_detention
        this.elements.autocomplete_cause_detention.val(wagon.outgoing_car_id_detention_return);
        this.elements.input_datetime_detention_start.val(wagon.outgoing_car_detention_date_start); // уберем дату
        this.elements.input_datetime_detention_stop.val(wagon.outgoing_car_detention_date_stop); // уберем дату
        // обновим состояние элементов
        if (this.wagon_settings.type === 0) {
            this.elements.button_detention_edit.hide();
            this.elements.button_detention_save.hide();
            this.detention_edit = false;
        } else {
            if (id_outgoing_detention) {
                if (wagon.outgoing_car_detention_date_stop === null) {
                    this.elements.button_detention_edit.hide();
                    this.elements.button_detention_save.show();
                } else {
                    this.elements.button_detention_edit.show();
                    this.elements.button_detention_save.hide();
                    // скроем элементы
                    this.form.obj_form.validations[1].$elements.each(function () {
                        this.prop('disabled', true);
                    });
                }
            } else {
                this.elements.button_detention_edit.hide();
                this.elements.button_detention_save.show();
                this.detention_edit = true;
            }
        }
    };
    // Показать детали возврата
    form_outgoing_cars_detali.prototype.wiew_return_wagon_detali = function (wagon) {
        // Найдем все возвраты
        LockScreen(langView('fogcd_mess_load_return_wagon', App.Langs));
        this.current_return_wagons = null;
        this.ids_wsd.getOutgoingDetentionReturnOfNum(wagon.num, function (return_wagons) {

            if (return_wagons && return_wagons.length > 0) {
                var actual_return_wagons = return_wagons.filter(function (i) {
                    return moment(i.date_start).isAfter(moment(wagon.arrival_sostav_date_adoption));
                });
                this.table_outgoing_detention_return.view(actual_return_wagons, null);
                this.current_return_wagons = return_wagons.find(function (o) {
                    return o.date_stop === null;
                });
            } else {
                this.table_outgoing_detention_return.view([], null);
            };
            // обновим состояние элементов
            if (this.wagon_settings.type === 0) {
                this.elements.button_return_open.hide();
                this.elements.button_return_close.hide()
            } else {
                if (this.current_return_wagons) {
                    this.current_id_return_wagons = this.current_return_wagons.id; // Сохраним текущий id открытой строки возврата
                    // Показать возврат
                    this.elements.button_return_open.hide();
                    this.elements.button_return_close.show();
                    this.elements.autocomplete_cause_return.val(this.current_return_wagons.id_detention_return);
                    this.elements.input_datetime_return_start.val(this.current_return_wagons.date_start); // уберем дату
                    this.elements.input_datetime_return_stop.val(this.current_return_wagons.date_stop); // уберем дату
                    this.elements.input_text_return_num_act.val(this.current_return_wagons.num_act);
                    this.elements.input_datetime_return_date_act.val(this.current_return_wagons.date_act); // уберем дату
                    this.elements.textarea_return_note.val(this.current_return_wagons.note);
                    this.elements.autocomplete_cause_return.disable();
                    this.elements.input_datetime_return_start.disable();
                } else {
                    this.current_id_return_wagons = null;
                    this.elements.button_return_open.show();
                    this.elements.button_return_close.hide();
                    this.elements.autocomplete_cause_return.enable();
                    this.elements.input_datetime_return_start.enable();
                    this.elements.input_datetime_return_stop.enable();

                    this.elements.autocomplete_cause_return.val('');
                    this.elements.input_datetime_return_start.set(null); // уберем дату
                    this.elements.input_datetime_return_stop.set(null); // уберем дату
                    this.elements.input_text_return_num_act.val('');
                    this.elements.input_datetime_return_date_act.set(null); // уберем дату
                    this.elements.textarea_return_note.val('');
                    this.elements.input_datetime_return_stop.disable();
                };
            };
            LockScreenOff();
        }.bind(this));
    };
    //----------------------------------------------------------------
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.close = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.form.bt_hide('present_car');
        this.form.bt_hide('return_car');
        this.form.bt_hide('car_return');
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Задержание
        this.form.bt_hide('detention_save');
        this.form.bt_hide('detention_edit');
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Возврат
        this.form.bt_hide('return_open');
        this.form.bt_hide('return_close');
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });
    };
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.view = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        this.elements.button_present_car.hide();
        if (this.wagon && this.wagon.outgoing_sostav_status <= 1) {
            this.elements.button_return_car.show();
        } else {
            this.elements.button_return_car.hide();
        }
        this.elements.button_car_return.hide();
        this.form.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Задержание
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.hide();
        this.detention_edit = false;
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', true);
        });
        //-- Возврат
        this.elements.button_return_open.hide();
        this.elements.button_return_close.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            this.prop('disabled', true);
        });

    };
    // Перевести форму в режим не активно
    form_outgoing_cars_detali.prototype.edit = function () {
        this.clear_form();
        // Переведем все компоненты в режим disabled
        // Общие компоненты
        if (this.wagon && this.wagon.outgoing_sostav_status <= 1) {
            this.elements.button_present_car.show();
            this.elements.button_car_return.show();
        } else {
            this.elements.button_present_car.hide();
            this.elements.button_car_return.hide();
        }
        this.elements.button_return_car.hide();
        this.form.obj_form.validations[0].$elements.each(function () {
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        //-- Задержание
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.hide();
        this.detention_edit = false;
        this.form.obj_form.validations[1].$elements.each(function () {
            //this.prop('disabled', true);
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
        //-- Возврат
        this.elements.button_return_open.hide();
        this.elements.button_return_close.hide();
        this.form.obj_form.validations[2].$elements.each(function () {
            //this.prop('disabled', true);
            if (this.is('.inp-manual')) {
                this.prop('disabled', false);
            };
        });
    };
    //----------------------------------------------------------------
    // Валидация формы задержания
    form_outgoing_cars_detali.prototype.validation_wagon_detention = function () {
        this.form.validation_detention.clear_all();
        var valid = true;
        valid = valid & this.form.validation_detention.check_control_autocomplete(this.elements.autocomplete_cause_detention, langView('fogcd_mess_valid_cause_detention', App.Langs), '', langView('fogcd_mess_valid_not_cause_detention', App.Langs), true);
        // Проверка на время начало и конца
        var valid_start = this.form.validation_detention.check_control_datetime_input(this.elements.input_datetime_detention_start, langView('fogcd_mess_valid_not_detention_start', App.Langs), '', true);
        var valid_stop = this.form.validation_detention.check_control_datetime_input(this.elements.input_datetime_detention_stop, langView('fogcd_mess_valid_not_detention_stop', App.Langs), '', true);
        // Проверим временные интервалы 120<start<120
        if (valid_start && valid_stop) {
            var current = moment();
            var detention_start = moment(this.elements.input_datetime_detention_start.val());
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_start = current.diff(detention_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_start >= max_err_detention_start || minute_start <= min_err_detention_start) {
                valid = valid & this.form.validation_detention.set_object_error(this.elements.input_datetime_detention_start.$element, langView('fogcd_mess_valid_not_deff_date_detention', App.Langs).format(min_err_detention_start, max_err_detention_start));
            }
            var detention_stop = moment(this.elements.input_datetime_detention_stop.val());
            // Проверим на разницу между началом и концом задержания
            var minute = detention_stop.diff(detention_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute <= 0 || minute > max_err_detention_deff) {
                valid = valid & this.form.validation_detention.set_object_error(this.elements.input_datetime_detention_stop.$element, langView('fogcd_mess_valid_not_deff_date_detention_start_stop', App.Langs).format(max_err_detention_deff));
            }
        } else {
            valid = false;
        }
        return valid;
    };
    // Валидация формы возврат
    form_outgoing_cars_detali.prototype.validation_wagon_return = function (attr_close) {
        this.form.validation_return.clear_all();
        var valid = true;
        valid = valid & this.form.validation_return.check_control_autocomplete(this.elements.autocomplete_cause_return, langView('fogcd_mess_valid_cause_return', App.Langs), '', langView('fogcd_mess_valid_not_cause_return', App.Langs), true);
        // Проверка на время начало и конца
        var valid_start = this.form.validation_return.check_control_datetime_input(this.elements.input_datetime_return_start, langView('fogcd_mess_valid_not_return_start', App.Langs), '', true);
        var current = moment();
        var return_start = moment(this.elements.input_datetime_return_start.val());
        valid = valid & valid_start;
        if (valid_start && !attr_close) {
            // Проверим временной период начало задержания- будущее + Прошлое
            var minute_start = current.diff(return_start, 'minute');
            //- зашло в будущее + зашло в прошлое
            if (minute_start >= max_err_return_start || minute_start <= min_err_return_start) {
                valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_start.$element, langView('fogcd_mess_valid_not_deff_date_return', App.Langs).format(min_err_return_start, max_err_return_start));
            }
        }
        if (attr_close) {
            var valid_stop = this.form.validation_return.check_control_datetime_input(this.elements.input_datetime_return_stop, langView('fogcd_mess_valid_not_return_stop', App.Langs), '', true);
            valid = valid & valid_stop;
            if (valid_stop) {
                var return_stop = moment(this.elements.input_datetime_return_stop.val());
                var minute_stop = current.diff(return_stop, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_stop >= max_err_return_stop || minute_stop <= min_err_return_stop) {
                    valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_stop.$element, langView('fogcd_mess_valid_not_deff_date_stop_return', App.Langs).format(min_err_return_stop, max_err_return_stop));
                }
                // Проверим на разницу между началом и концом задержания
                var minute_deff = return_stop.diff(return_start, 'minute');
                //- зашло в будущее + зашло в прошлое
                if (minute_deff <= 0) {
                    valid = valid & this.form.validation_return.set_object_error(this.elements.input_datetime_return_stop.$element, langView('fogcd_mess_valid_not_deff_date_return_start_stop', App.Langs));
                }
            }
        }
        valid = valid & this.form.validation_return.set_object_ok(this.elements.input_text_return_num_act.$element, '');
        valid = valid & this.form.validation_return.check_control_datetime_input_null(this.elements.input_datetime_return_date_act, langView('fogcd_mess_valid_error_date_act', App.Langs), '', true);
        valid = valid & this.form.validation_return.set_object_ok(this.elements.textarea_return_note.$element, '');
        return valid;
    };
    // Валидация формы вагон детально
    form_outgoing_cars_detali.prototype.validation_wagon_detali = function () {
        this.clear_out_validation(); // очистить все сообщения
        var valid = true;
        // Проверка номера
        var num = this.elements.input_number_num_car.val();
        if (this.wagon_settings.present_wagons && this.wagon_settings.present_wagons.length > 0) {
            var wagon = this.wagon_settings.present_wagons.find(function (o) {
                return o.num === num;
            });
            if (wagon) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_num_car.$element, langView('fogcd_mess_valid_error_num', App.Langs).format(wagon.num, wagon.position));
            } else {
                valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_num_car.$element, '');
            }
        }
        // Проверка позиции
        var position = this.elements.input_number_position_outgoing.val();
        if (this.wagon_settings.position === 1) {
            if (position > this.wagon_settings.position) {
                valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_position_outgoing.$element, langView('fogcd_mess_valid_error_position1', App.Langs));
            } else {
                valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_position_outgoing.$element, '');
            }
        } else {
            // Проверим позицию
            if (this.wagon_settings.present_wagons && this.wagon_settings.present_wagons.length > 0) {
                var wagon = this.wagon_settings.present_wagons.find(function (o) {
                    return o.position === position;
                });
                if (wagon) {
                    valid = valid & this.form.validation_common.set_object_error(this.elements.input_number_position_outgoing.$element, langView('fogcd_mess_valid_error_position2', App.Langs).format(wagon.position, wagon.num));
                } else {
                    valid = valid & this.form.validation_common.set_object_ok(this.elements.input_number_position_outgoing.$element, '');
                }
            } else {
                // нет списка предъявленных вагонов
            }
        }
        valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_cargo_name, langView('fogcd_mess_valid_cargo_name', App.Langs), '', langView('fogcd_mess_valid_not_cargo_name', App.Langs), true);
        valid = valid & this.form.validation_common.check_control_datetime_input_null(this.elements.input_datetime_date_outgoing_act, langView('fogcd_mess_valid_date_outgoing_act', App.Langs), '', true);
        valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_reason_discrepancy_uz, langView('fogcd_mess_valid_reason_discrepancy', App.Langs), '', true);
        valid = valid & this.form.validation_common.check_control_autocomplete_null(this.elements.autocomplete_reason_discrepancy_amkr, langView('fogcd_mess_valid_reason_discrepancy', App.Langs), '', true);
        var date_outgoing_act = this.elements.input_datetime_date_outgoing_act.val();
        if (date_outgoing_act) {
            valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_reason_discrepancy_amkr, langView('fogcd_mess_valid_reason_discrepancy', App.Langs), '', langView('fogcd_mess_valid_not_reason_discrepancy', App.Langs), true);
        } else {
            if (this.elements.autocomplete_reason_discrepancy_amkr.val() > 0 || this.elements.autocomplete_reason_discrepancy_uz.val() > 0) {
                valid = valid & this.form.validation_common.check_control_datetime_input(this.elements.input_datetime_date_outgoing_act, langView('fogcd_mess_valid_not_date_outgoing_act', App.Langs), '', true);
            }
        }
        // Проверим отметку вагонником
        if (this.wagon && this.wagon.outgoing_car_vagonnik === null) {
            this.form.validation_common.set_object_error(this.elements.textarea_condition_present.$element, langView('fogcd_mess_valid_null_condition_present', App.Langs));
        }
        // Задержание
        if (this.detention_edit && (this.elements.autocomplete_cause_detention.text() !== '' || this.elements.input_datetime_detention_start.val() !== null || this.elements.input_datetime_detention_stop.val() !== null)) {
            valid = valid & this.validation_wagon_detention();
            // Проверка валидация прошла но кнопка не нажата
            if (this.detention_edit && valid) {
                this.form.validation_detention.out_error_message(langView('fogcd_mess_valid_no_save_detention', App.Langs))
                valid = false;
            };
        }

        // Задержания
        if (this.current_return_wagons && this.current_return_wagons.date_stop === null) {
            valid = valid & this.validation_wagon_return(true);
        }

        if (this.elements.checkbox_loaded_car.val() === true) {
            valid = valid & this.form.validation_common.check_control_autocomplete(this.elements.autocomplete_loading_devision, langView('fogcd_mess_valid_loading_devision', App.Langs), '', langView('fogcd_mess_valid_not_loading_devision', App.Langs), true);
        }
        return valid;
    };
    //----------------------------------------------------------------
    // Выполнить операцию сохранить задержание
    form_outgoing_cars_detali.prototype.action_save_detention = function () {
        this.elements.button_detention_save.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_detention();
        if (valid) {
            this.form.validation_detention.clear_all();
            this.modal_confirm_form.view(langView('fogcd_form_detention', App.Langs), langView('fogcd_form_detention_message', App.Langs), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_update_operation_detention', App.Langs));
                    // Подготовим операцию
                    var operation_detentions = {
                        id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                        id_detention_return: this.elements.autocomplete_cause_detention.val(),
                        date_start: this.elements.input_datetime_detention_start.val(),
                        date_stop: this.elements.input_datetime_detention_stop.val(),
                        user: App.User_Name,
                    };
                    // Обновим
                    this.ids_wsd.postUpdateOutgoingDetention(operation_detentions, function (result_operation) {
                        if (result_operation > 0) {
                            this.form.validation_detention.out_info_message(langView('fogcd_mess_ok_operation_detention', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.form.validation_detention.out_error_message(langView('fogcd_mess_error_operation_detention', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные
                        this.update_wagon(function (wagon) {
                            this.wiew_detention_wagon_detali(wagon);
                            this.detention_edit = false;
                            this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                            LockScreenOff();
                        }.bind(this));
                    }.bind(this));
                    this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                } else {
                    this.form.validation_detention.out_warning_message(langView('fogcd_mess_cancel_operation_detention', App.Langs))
                    this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_detention_save.prop("disabled", false); // сделаем активной
        }
        this.elements.button_detention_save.prop("disabled", false); // сделаем активной
    };
    // Выполнить операцию правка задержаня
    form_outgoing_cars_detali.prototype.action_edit_detention = function () {
        this.elements.button_detention_edit.hide();
        this.elements.button_detention_save.show();
        this.detention_edit = true;
        // раскроем элементы
        this.form.obj_form.validations[1].$elements.each(function () {
            this.prop('disabled', false);
        });
    };
    // Открыть возврат
    form_outgoing_cars_detali.prototype.action_return_open = function () {
        this.elements.button_return_open.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_return(false);
        if (valid) {
            this.form.validation_return.clear_all();
            this.modal_confirm_form.view(langView('fogcd_form_return_open', App.Langs), langView('fogcd_form_return_open_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_update_operation_return_open', App.Langs));
                    // Подготовим операцию
                    var operation_return = {
                        id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                        id_detention_return: this.elements.autocomplete_cause_return.val(),
                        date_start: this.elements.input_datetime_return_start.val(),
                        num_act: this.elements.input_text_return_num_act.val(),
                        date_act: this.elements.input_datetime_return_date_act.val(),
                        note: this.elements.textarea_return_note.val(),
                        user: App.User_Name,
                    };
                    // Откроем
                    this.ids_wsd.postOpenOutgoingReturn(operation_return, function (result_operation) {
                        if (result_operation > 0) {
                            this.form.validation_return.out_info_message(langView('fogcd_mess_ok_operation_return_open', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.form.validation_return.out_error_message(langView('fogcd_mess_error_operation_return_open', App.Langs) + result_operation);
                            LockScreenOff();
                        }
                        // Обновим данные полностью
                        if (typeof this.settings.fn_update === 'function') {
                            this.settings.fn_update();
                        };
                        this.elements.button_return_open.prop("disabled", false); // сделаем активной
                        LockScreenOff();
                    }.bind(this));
                    //this.elements.button_return_open.prop("disabled", false); // сделаем активной
                } else {
                    this.form.validation_return.out_warning_message(langView('fogcd_mess_cancel_operation_return_open', App.Langs))
                    this.elements.button_return_open.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_return_open.prop("disabled", false); // сделаем активной
        }
    };
    // закрыть возврат
    form_outgoing_cars_detali.prototype.action_return_close = function () {
        this.elements.button_return_close.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_return(true);
        if (valid) {
            this.form.validation_return.clear_all();
            this.modal_confirm_form.view(langView('fogcd_form_return_close', App.Langs), langView('fogcd_form_return_close_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_update_operation_return_close', App.Langs));
                    if (this.current_id_return_wagons !== null) {
                        // Подготовим операцию
                        var operation_return = {
                            id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                            id_outgoin_return: this.current_id_return_wagons,
                            date_stop: this.elements.input_datetime_return_stop.val(),
                            num_act: this.elements.input_text_return_num_act.val(),
                            date_act: this.elements.input_datetime_return_date_act.val(),
                            note: this.elements.textarea_return_note.val(),
                            user: App.User_Name,
                        };
                        // Закроем
                        this.ids_wsd.postCloseOutgoingReturn(operation_return, function (result_operation) {
                            if (result_operation > 0) {
                                this.form.validation_return.out_info_message(langView('fogcd_mess_ok_operation_return_close', App.Langs));
                            } else {
                                // Ошибка выполнения
                                this.form.validation_return.out_error_message(langView('fogcd_mess_error_operation_return_close', App.Langs) + result_operation);
                                LockScreenOff();
                            }
                            // Обновим данные
                            this.update_wagon(function (wagon) {
                                this.wiew_return_wagon_detali(wagon);
                                this.elements.button_detention_save.prop("disabled", false); // сделаем активной
                                LockScreenOff();
                            }.bind(this));
                            this.elements.button_return_close.prop("disabled", false); // сделаем активной
                            //LockScreenOff();
                        }.bind(this));
                        this.elements.button_return_close.prop("disabled", false); // сделаем активной

                    } else {
                        // Не определен id строки возврата
                        this.form.validation_return.out_warning_message(langView('fogcd_mess_error_operation_return_close_not_id', App.Langs))
                        this.elements.button_return_close.prop("disabled", false); // сделаем активной
                        LockScreenOff();
                    };

                } else {
                    // Отмена операции
                    this.form.validation_return.out_warning_message(langView('fogcd_mess_cancel_operation_return_close', App.Langs))
                    this.elements.button_return_close.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_return_close.prop("disabled", false); // сделаем активной
        }
    };
    // Предявить вагон (перенести в левую сторону)
    form_outgoing_cars_detali.prototype.action_present_wagon = function () {
        this.elements.button_present_car.prop("disabled", true); // сделаем не активной
        var valid = this.validation_wagon_detali();
        if (valid) {
            this.modal_confirm_form.view(langView('fogcd_form_present', App.Langs), langView('fogcd_form_present_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
                if (res) {
                    // Выполнить операцию
                    LockScreen(langView('fogcd_mess_run_operation_present', App.Langs));
                    // Подготовим операцию
                    var operation_present = {
                        id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                        position: this.elements.input_number_position_outgoing.val(),
                        date_outgoing_act: this.elements.input_datetime_date_outgoing_act.val(),
                        id_reason_discrepancy_amkr: this.elements.autocomplete_reason_discrepancy_amkr.val(),
                        id_reason_discrepancy_uz: this.elements.autocomplete_reason_discrepancy_uz.val(),
                        id_condition: this.current_id_condition, // разметка по отправке
                        id_wagons_rent_arrival: this.arrival_id_wagon_rent,
                        id_wagons_rent_outgoing: this.outgoing_id_wagon_rent,
                        id_countrys: this.current_id_countrys,
                        id_genus: this.current_id_genus,
                        id_owner: this.current_id_owner,
                        gruzp_uz: this.elements.input_number_gruzp_uz.val(),
                        tara_uz: this.elements.input_number_tara_uz.val(),
                        note_uz: this.elements.textarea_limiting_loading_uz.val(),
                        id_warehouse: null,
                        id_division: this.elements.autocomplete_loading_devision.val(),
                        laden: this.elements.checkbox_loaded_car.val(),
                        id_cargo: this.elements.autocomplete_cargo_name.val(),
                        nom_cont1: this.elements.input_text_num_cont_1.val(),
                        nom_cont2: this.elements.input_text_num_cont_2.val(),
                        //id_outgoing_detention_return: cars_detali.current_cars_return ? cars_detali.current_cars_return.id : null,
                        code_stn_to: this.elements.autocomplete_name_station_to.val(),
                        user: App.User_Name,
                    };
                    // Выполним предъявить
                    this.ids_wsd.postOutgoingPresentWagon(operation_present, function (result_operation) {
                        if (result_operation > 0) {
                            this.clear_out_validation(); // очистить все сообщения
                            this.form.validation_common.out_info_message(langView('fogcd_mess_ok_operation_present', App.Langs));
                        } else {
                            // Ошибка выполнения
                            this.clear_out_validation(); // очистить все сообщения
                            this.form.validation_common.out_error_message(langView('fogcd_mess_error_operation_present', App.Langs) + result_operation);
                            LockScreenOff();
                        };
                        // Обновим данные полностью
                        if (typeof this.settings.fn_update === 'function') {
                            this.settings.fn_update();
                        };
                        this.elements.button_present_car.prop("disabled", false); // сделаем активной
                        //LockScreenOff();
                    }.bind(this));
                } else {
                    // Отмена операции
                    this.form.validation_common.out_warning_message(langView('fogcd_mess_cancel_operation_present', App.Langs))
                    this.elements.button_present_car.prop("disabled", false); // сделаем активной
                }
            }.bind(this));
        } else {
            this.elements.button_present_car.prop("disabled", false); // сделаем активной
        }

    };
    // Отменить пръедявление (вернуть в правую сторону)
    form_outgoing_cars_detali.prototype.action_return_wagon = function () {
        this.elements.button_return_car.prop("disabled", true); // сделаем не активной
        this.modal_confirm_form.view(langView('fogcd_form_return_present', App.Langs), langView('fogcd_form_return_present_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
            if (res) {
                // Выполнить операцию
                LockScreen(langView('fogcd_mess_run_operation_return_present', App.Langs));
                // Подготовим операцию
                var operation_return = {
                    id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                    user: App.User_Name,
                };
                // Выполним предъявить
                this.ids_wsd.postOutgoingReturnPresentWagon(operation_return, function (result_operation) {
                    if (result_operation > 0) {
                        this.form.validation_common.out_info_message(langView('fogcd_mess_ok_operation_return_present', App.Langs));
                    } else {
                        // Ошибка выполнения
                        this.form.validation_common.out_error_message(langView('fogcd_mess_error_operation_return_present', App.Langs) + result_operation);
                        LockScreenOff();
                    }
                    // Обновим данные полностью
                    if (typeof this.settings.fn_update === 'function') {
                        this.settings.fn_update();
                    };
                    this.elements.button_return_car.prop("disabled", false); // сделаем активной
                    //LockScreenOff();
                }.bind(this));
            } else {
                // Отмена операции
                this.clear_out_validation(); // очистить все сообщения
                this.form.validation_common.out_warning_message(langView('fogcd_mess_cancel_operation_return_present', App.Langs))
                this.elements.button_return_car.prop("disabled", false); // сделаем активной
            }
        }.bind(this));
    };
    // Убрать вагон с состава для предявления 
    form_outgoing_cars_detali.prototype.action_remove_wagon = function () {
        this.elements.button_car_return.prop("disabled", true); // сделаем не активной
        this.modal_confirm_form.view(langView('fogcd_form_remove_wagon', App.Langs), langView('fogcd_form_remove_wagon_message', App.Langs).format(this.wagon ? this.wagon.num : null), function (res) {
            if (res) {
                // Выполнить операцию
                LockScreen(langView('fogcd_mess_run_operation_remove_wagon', App.Langs));
                // Подготовим операцию
                var operation_return = {
                    id_outgoing_car: this.wagon ? this.wagon.outgoing_car_id : null,
                    user: App.User_Name,
                };
                // Выполним убрать вагон
                this.ids_wsd.postPostOperationReturnProvideWagon(operation_return, function (result_operation) {
                    if (result_operation > 0) {
                        this.form.validation_common.out_info_message(langView('fogcd_mess_ok_operation_remove_wagon', App.Langs));
                    } else {
                        // Ошибка выполнения
                        this.form.validation_common.out_error_message(langView('fogcd_mess_error_operation_remove_wagon', App.Langs) + result_operation);
                        LockScreenOff();
                    }
                    // Обновим данные полностью
                    if (typeof this.settings.fn_update === 'function') {
                        this.settings.fn_update();
                    };
                    this.elements.button_car_return.prop("disabled", false); // сделаем активной
                    //LockScreenOff();
                }.bind(this));
            } else {
                // Отмена операции
                this.clear_out_validation(); // очистить все сообщения
                this.form.validation_common.out_warning_message(langView('fogcd_mess_cancel_operation_return_present', App.Langs))
                this.elements.button_car_return.prop("disabled", false); // сделаем активной
            }
        }.bind(this));
    };

    //----------------------------------------------------------------
    // Очистить сообщения об ошибках
    form_outgoing_cars_detali.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    };
    // Показать сообщение ошибки
    form_outgoing_cars_detali.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать сообщение предупреждения
    form_outgoing_cars_detali.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    form_outgoing_cars_detali.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Удалить объект
    form_outgoing_cars_detali.destroy = function () {
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        if (this.table_outgoing_detention_return) {
            this.table_outgoing_detention_return.destroy();
            this.table_outgoing_detention_return = null;
        }
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        this.$form_outgoing_cars.empty();
        LockScreenOff();
    };

    App.form_outgoing_cars_detali = form_outgoing_cars_detali;

    window.App = App;

})(window);