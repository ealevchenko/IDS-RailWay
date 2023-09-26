/*Модуль Отображения информации по ЭПД*/
(function (window) {
    "use strict"; // Start of use strict

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    var list_groups_cargo = [11, 16, 20, 24];               // Список id групп груза с порожними вагонами
    var list_railway_sng = [20, 21, 23, 24, 25, 26, 27, 28, 29, 57, 58, 59, 66, 67];               // Список кодов жд СНГ - 22 украина

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vtdr_mess_init_module': 'Инициализация модуля(view_td_report)...',
            'vtdr_link_title_home1': 'ИДС "ОТЧЕТЫ"',
            'vtdr_link_title_home2': 'Транспортный департамент',

            'vtdr_link_title_report_1_1': 'Статистика',
            'vtdr_link_title_report_2_1': 'Отчет по прибытию (общий)',
            'vtdr_link_title_report_3_1': 'Прибытие ИТОГ',
            'vtdr_link_title_report_4_1': 'Информация по вагону и собственнику',
            'vtdr_link_title_report_5_1': 'Отчет по отправлению (общий)',
            'vtdr_link_title_report_6_1': 'Отправление ИТОГ',
            'vtdr_link_title_report_7_1': 'Вагоны с корректировкой платы',
            'vtdr_link_title_report_8_1': 'История ставок',
            'vtdr_link_title_report_9_1': 'Плата за пользование (ИТОГ)',
            'vtdr_link_title_report_10_1': 'Остаток вагонов (общий)',
            'vtdr_link_title_report_11_1': 'Остаток ИТОГ',

            'vtdr_link_group_title_report_1': 'ОБЩИЕ:',
            'vtdr_link_group_title_report_2': 'ПРИБЫТИЕ:',
            'vtdr_link_group_title_report_3': 'ОТПРАВЛЕНИЕ:',
            'vtdr_link_group_title_report_4': 'ПЛАТА:',
            'vtdr_link_group_title_report_5': 'ОСТАТОК:',

            'vtdr_title_report_1_1': 'Статистика {0}',
            'vtdr_title_report_2_1': 'Отчет по прибытию (общий) {0}',
            'vtdr_title_report_3_1': 'Прибытие ИТОГ {0}',
            'vtdr_title_report_4_1': 'Информация по вагону и собственнику {0}',
            'vtdr_title_report_5_1': 'Отчет по отправлению (общий) {0}',
            'vtdr_title_report_6_1': 'Отправление ИТОГ {0}',
            'vtdr_title_report_7_1': 'Вагоны с корректировкой платы {0}',
            'vtdr_title_report_8_1': 'История ставок {0}',
            'vtdr_title_report_9_1': 'Плата за пользование (ИТОГ) {0}',
            'vtdr_title_report_10_1': 'Отчет остаток вагонов (общий) {0}',
            'vtdr_title_report_11_1': 'Отчет остаток (ИТОГ) {0}',


            'vtdr_title_report_type_0': '«Текущая дата» :{0}',
            'vtdr_title_report_type_1': '«Ж.д. сутки» c:{0} по {1}',
            'vtdr_title_report_type_2': '«Календарные сутки» c:{0} по {1}',
            'vtdr_title_report_type_3': '«За месяц» c:{0} по {1}',
            'vtdr_title_report_type_4': '«За период» c:{0} по {1}',
            'vtdr_title_report_type_5': '«За отчетный период (продажа)» c:{0} по {1}',
            'vtdr_title_report_type_6': '«За отчетный период (плата)» c:{0} по {1}',

            'vtdr_card_header_report_1_1_arr': 'ПРИБЫТИЕ',
            'vtdr_card_header_report_1_1_out': 'СДАЧА',
            'vtdr_card_header_report_1_1_not_oper': 'ВАГОНЫ БЕЗ ОПЕРАТОРОВ',
            'vtdr_load_adoption_sostav': 'Выполняю операцию выборка принятых составов ...',
            'vtdr_load_vagon': 'Выполняю операцию выборки вагонов ...',
            'vtdr_load_incoming_outgoing_car': 'Выполняю операцию выборки информации по вагону ...',

            'vtdr_card_header_report_2_1_group': 'Общая информация',
            'vtdr_card_header_report_2_1_detali': 'Детально информация',
            'vtdr_title_calculation_static_load': 'Расчет стат. нагрузки',

            'vtdr_card_header_chart': 'ДИАГРАММА',
            'vtdr_card_header_table': 'ДАННЫЕ',

            'vtdr_card_header_common': 'ВАГОН',

            'vtdr_load_adoption_cars': 'Выполняю операцию выборки принятых вагонов ...',
            'vtdr_load_outgoing_cars': 'Выполняю операцию выборки отправленных вагонов ...',
            'vtdr_load_operating_balance': 'Выполняю операцию выборки оперативного остатка вагонов ...',

            'vtdr_load_select_cars': 'Выполняю операцию выборка вагонов ...',

            'vtdr_label_tab_total_cargo_operator_amkr': 'Груз по Оператору',
            'vtdr_label_tab_total_operator_to_arr': 'Оператор по ПРИБ',
            'vtdr_label_tab_total_cargo_to_arr': 'Груз ПРИБ',
            'vtdr_label_tab_total_group_cargo_to_arr': 'Группа ПРИБ',
            'vtdr_label_tab_total_genus_to_arr': 'Род вагона ПРИБ',
            'vtdr_label_tab_total_sap_to_arr': 'Груз ПРИБ SAP',
            'vtdr_label_tab_total_station_to_arr': 'Станция ПРИБ',
            'vtdr_label_tab_total_division_to_arr': 'Цех-грузополучатель',
            'vtdr_label_tab_total_to_gs': 'Отчет для ГС',

            'vtdr_label_tab_out_total_cargo': 'Груз ОТПР',
            'vtdr_label_tab_out_total_operator_amkr': 'Оператор по ОТПР',
            'vtdr_label_tab_out_total_division_amkr': 'Цех-грузоотправитель',
            'vtdr_label_tab_out_total_ext_station': 'Направление ОТПР',
            'vtdr_label_tab_out_total_cargo_metall': 'Металл ОТПР',
            'vtdr_label_tab_out_total_operators': 'ИТОГ оператор',

            'vtdr_label_tab_usage_fee_cargo': 'Груз ПРИБ',
            'vtdr_label_tab_usage_fee_operator_amkr': 'Оператор',
            'vtdr_label_tab_usage_fee_operator_amkr_derailment': 'Сход',
            'vtdr_label_tab_usage_fee_cargo_not_derailment': 'Груз ПРИБ (без схода)',

            'vtdr_label_tab_residue_total_operators': 'Оператор',
            'vtdr_label_tab_residue_total_common': 'Итоги',
            'vtdr_label_tab_residue_total_markup': 'Разметка',
            'vtdr_label_tab_residue_total_genus': 'Род вагона',
            'vtdr_label_tab_residue_total_station_out': ' Станция отправления',
            'vtdr_label_tab_residue_total_cargo_arr': 'Груз ПРИБ',
            'vtdr_label_tab_residue_total_operation': 'Операции',

            'vtdr_label_button_setup_clear': 'СБРОСИТЬ',
            'vtdr_label_button_setup_select': 'ВЫБРАТЬ',
            'vtdr_label_laden': 'Только с грузом',
            'vtdr_label_accounting': 'Учетные вагоны',
            'vtdr_label_client': 'Клиентура',
            'vtdr_label_not_client': 'Без учета клиентуры',
            'vtdr_label_paid': 'Платные',
            'vtdr_label_shu': 'ШУ',

            'vtdr_label_outer_cars': 'Внешние стороние вагоны',
            'vtdr_label_amkr_outer_cars': 'Внешние вагоны АМКР',
            'vtdr_label_amkr_cisterns': 'Цистерны арендованные',
            'vtdr_label_curr_condition': 'Разметка текущая:',
            'vtdr_title_curr_condition': 'Разметка текущая',
            'vtdr_label_type_wagons': 'Тип вагона:',
            'vtdr_title_type_wagons': 'Тип вагона',
            'vtdr_label_arr_ext_station_to': 'Станция отправления:',
            'vtdr_title_arr_ext_station_to': 'Станция отправления',
            'vtdr_label_inp_division': 'Цех-получатель:',
            'vtdr_title_inp_division': 'Цех-получатель',
            'vtdr_label_curr_station_amkr': 'Станция нахождения вагона:',
            'vtdr_title_curr_station_amkr': 'Станция нахождения вагона',
            'vtdr_label_curr_way': 'Ж.д. путь нахождения вагона:',
            'vtdr_title_curr_way': 'Ж.д. путь нахождения вагона',
            'vtdr_label_sap_destination_station': 'Станция назначения SAP:',
            'vtdr_title_sap_destination_station': 'Станция назначения SAP',
            'vtdr_label_sap_warehouse_name': 'Цех SAP:',
            'vtdr_title_sap_warehouse_name': 'Цех SAP',
            'vtdr_label_not_letters': 'Вагоны без ПИСЕМ',
            'vtdr_label_OTC_ban': 'Запрет ОТК',

            'vtdr_label_wagon_nums': '№№ ваг:',
            'vtdr_title_wagon_nums': 'Введите номера вагонов',
            'vtdr_label_main_epd_docs': '№№ Основного ЭПД:',
            'vtdr_title_main_epd_docs': 'Введите номера основных ЭПД',
            'vtdr_label_epd_docs': '№№ Досылочного ЭПД:',
            'vtdr_title_epd_docs': 'Введите номера досылочных ЭПД',
            'vtdr_label_operation_amkr': 'Оператор АМКР:',
            'vtdr_title_operation_amkr': 'Оператор АМКР',
            'vtdr_label_out_operation_amkr': 'Оператор по отправке:',
            'vtdr_title_out_operation_amkr': 'Оператор по отправке',
            'vtdr_label_limiting': 'Огр. ПОГР:',
            'vtdr_title_limiting': 'Огр. ПОГР',
            'vtdr_label_owners': 'Собственник:',
            'vtdr_title_owners': 'Собственник',
            'vtdr_label_station_from': 'Станция отправления:',
            'vtdr_title_station_from': 'Станция отправления',
            'vtdr_label_cargo': 'Груз ПРИБ:',
            'vtdr_title_cargo': 'Груз ПРИБ',
            'vtdr_label_certification_data': 'Сертификатные данные:',
            'vtdr_title_certification_data': 'Сертификатные данные',
            'vtdr_label_cargo_sap': 'Код груза ПРИБ SAP:',
            'vtdr_title_cargo_sap': 'Код груза ПРИБ SAP',
            'vtdr_label_group_arrival': 'Группа ПРИБ:',
            'vtdr_title_group_arrival': 'Группа ПРИБ',
            'vtdr_label_consignee': 'Грузополучатель:',
            'vtdr_title_consignee': 'Грузополучатель',
            'vtdr_label_division': 'Цех-получатель:',
            'vtdr_title_division': 'Цех-получатель',
            'vtdr_label_genus': 'Род вагона:',
            'vtdr_title_genus': 'Род вагона',
            'vtdr_label_condition': 'Разметка по прибытию:',
            'vtdr_title_condition': 'Разметка по прибытию',
            'vtdr_label_payer_name': 'Плательщик ПРИБ:',
            'vtdr_title_payer_name': 'Плательщик ПРИБ',
            'vtdr_label_payer_code': 'Код плат. ПРИБ:',
            'vtdr_title_payer_code': 'Код плат. ПРИБ',
            'vtdr_label_station_amkr': 'Станция примыкания:',
            'vtdr_title_station_amkr': 'Станция примыкания',
            'vtdr_label_genus': 'Род вагона:',
            'vtdr_title_genus': 'Род вагона',
            'vtdr_label_out_division': 'Цех погрузки:',
            'vtdr_title_out_division': 'Цех погрузки',
            'vtdr_label_out_cargo': 'Груз ОТПР:',
            'vtdr_title_out_cargo': 'Груз ОТПР',
            'vtdr_label_out_cargo_group': 'Группа ОТПР:',
            'vtdr_title_out_cargo_group': 'Группа ОТПР',
            'vtdr_label_out_sap_cargo': 'Груз ОТПР SAP:',
            'vtdr_title_out_sap_cargo': 'Груз ОТПР SAP',
            'vtdr_label_out_ext_station_to': 'Станция назначения:',
            'vtdr_title_out_ext_station_to': 'Станция назначения',
            'vtdr_label_out_inlandrailway_to': 'Дорога:',
            'vtdr_title_out_inlandrailway_to': 'Дорога',
            'vtdr_label_out_border_checkpoint_to': 'Погран.переход:',
            'vtdr_title_out_border_checkpoint_to': 'Погран.переход',
            'vtdr_label_arr_cargo': 'Груз ПРИБ:',
            'vtdr_title_arr_cargo': 'Груз ПРИБ',
            'vtdr_label_arr_group_arrival': 'Группа ПРИБ.:',
            'vtdr_title_arr_group_arrival': 'Группа ПРИБ.',

            'vtdr_label_payer_sender_name': 'Плательщик ОТПР:',
            'vtdr_title_payer_sender_name': 'Плательщик ОТПР',
            'vtdr_label_code_payer_sender': 'Код плат.ОТПР:',
            'vtdr_title_code_payer_sender': 'Код плат.ОТПР',
            'vtdr_label_arr_division': 'Цех-получатель:',
            'vtdr_title_arr_division': 'Цех-получатель',

            'vtdr_title_type_select': 'Выборка за:',
            'vtdr_title_select_month': 'за месяц:',
            'vtdr_title_select_year': 'за год:',
            'vtdr_title_label_interval_date': ' период:',
            'vtdr_title_label_date': ' с даты:',
            'vtdr_title_num_wag': ' ИНФОРМАЦИЯ ПО ВАГОНУ №',
            'vtdr_title_button': ' Применить',
            'vtdr_title_button_searsh': 'НАЙТИ',

            'vtdr_link_report_1': 'Погран-переход',
            'vtdr_title_report_1': 'Статистика',
            'vtdr_title_search_cars': 'Найти вагоны',
            'vtdr_label_list_nums': 'Добавьте номера вагонов (разделитель “;”) по которым необходимо провести поиск:',
            'vtdr_title_list_nums': 'Добавте номера вагонов',
            'vtdr_placeholder_list_nums': '00000001;00000002;00000003',

            'vtdr_label_cw_arrival_station_on_name': 'Станция приема:',
            'vtdr_label_cw_outgoing_from_station_amkr_name': 'Станция отправления:',
            'vtdr_label_cw_arrival_num_doc': '№ вед. прибытия:',
            'vtdr_label_cw_outgoing_num_doc': '№ вед. отправки:',
            'vtdr_label_cw_arrival_ext_station_from_name': 'Станция отправления:',
            'vtdr_label_cw_outgoing_ext_station_to_name': 'Станция назначения:',
            'vtdr_label_cw_arrival_nom_main_doc': '№ ж.д. накладной ПРИБ:',
            'vtdr_label_cw_outgoing_nom_doc': '№ ж.д. накладной ОТПР:',

            'vtdr_label_od_last_date_outgoing': 'Дата последней сдачи:',
            'vtdr_label_od_instructional_letters_datetime': 'Дата последней инструкции:',
            'vtdr_label_od_wagon_rod_abbr': 'Род вагона:',
            'vtdr_label_od_wagon_date_rem_uz': 'Дата деп. ремонта:',
            'vtdr_label_od_wir_note': 'Примечание:',
            'vtdr_label_od_curr_wagons_rent_operator_abbr': 'Оператор АМКР:',
            'vtdr_label_od_curr_wagons_rent_limiting_abbr': 'Ограничение:',
            'vtdr_label_od_curr_wagons_rent_start': 'Начало аренды:',
            'vtdr_label_od_curr_wagons_rent_end': 'Окончание арены:',
            'vtdr_label_od_arrival_condition_abbr': 'Разметка ПРИБ:',
            'vtdr_label_od_current_condition_abbr': 'Разметка текущ:',
            'vtdr_label_od_current_condition_create': 'Дата изменения разметки:',
            'vtdr_label_od_current_condition_create_user': 'Польз. изм. разм.:',
            'vtdr_label_od_instructional_letters_num': '№ инструкции:',
            'vtdr_label_od_instructional_letters_datetime': 'Дата инструкции:',
            'vtdr_label_od_instructional_letters_station_name': 'Станция по инструкции:',

            'vtdr_title_all': 'Все',
            'vtdr_title_button_export': 'Экспорт',
            'vtdr_title_button_buffer': 'Буфер',
            'vtdr_title_button_excel': 'Excel',
            'vtdr_title_excel_sheet_name': 'Погран переходы',

            'vtdr_title_common_wagon_legend': 'Общая информация по вагону',
            'vtdr_title_operator_wagon_legend': 'Информация по операторам АМКР',
            'vtdr_title_report_wagon_legend': 'Отчет по вагону',
            'vtdr_title_report_operation_legend': 'Отчет  оператору АМКР',

            'vtdr_field_border_crossing_num': '№ вагона',
            'vtdr_field_border_crossing_status': 'Статус вагона',
            'vtdr_field_border_crossing_date_departure_amkr': 'Вагон отправлен',
            'vtdr_field_border_crossing_border_crossing_stn': 'Код погр.-перехода',
            'vtdr_field_border_crossing_border_crossing_stn_name': 'Погран-переход',
            'vtdr_field_border_crossing_cross_time': 'Дата и время перехода',
            'vtdr_field_border_crossing_client_kod_on': 'Код грузополучателя',
            'vtdr_field_border_crossing_client_name_on': 'Грузополучатель',
            'vtdr_field_border_crossing_vesg': 'Вес груза',
            'vtdr_field_border_crossing_epd_status': 'Статус ЭПД',
            'vtdr_field_border_crossing_epd_date_otpr': 'Отправлен (ЭПД)',
            'vtdr_field_border_crossing_epd_date_pr': 'Прибыл (ЭПД)',
            'vtdr_field_border_crossing_epd_num_doc': 'Id документа (ЭПД)',
            'vtdr_field_border_crossing_epd_revision': '№ ревизии (ЭПД)',
            'vtdr_field_border_crossing_epd_num_uz': '№ накладной (ЭПД)',

            'vtdr_mess_operation_run': 'Выполняю операцию поиска принятых составов ...',

            'vtdr_mess_error_search_cars': 'При формировании отчета произошла ошибка, код ошибки {0}',
            'vtdr_mess_error_search_docs': 'При формировании отчета произошла ошибка, код ошибки {0}',
        },
        'en':  //default language: English
        {
            'vtdr_mess_init_module': 'Module initialization(view_td_report)...',
            'vtdr_link_report_1': 'Border crossing',
            'vtdr_title_report_1': 'Movement of goods shipped by AMKR for external consumers of products (Europe)',
            'vtdr_title_search_cars': 'Find Cars',
            'vtdr_label_list_nums': 'Add wagon numbers (separator “;”) for which you want to search:',
            'vtdr_title_list_nums': 'Add wagon numbers',
            'vtdr_placeholder_list_nums': '00000001;00000002;00000003',
            'vtdr_mess_operation_run': 'Performing an operation...',
            'vtdr_title_all': 'All',
            'vtdr_title_button_export': 'Export',
            'vtdr_title_button_buffer': 'Buffer',
            'vtdr_title_button_excel': 'Excel',
            'vtdr_title_excel_sheet_name': 'Border Transitions',

            'vtdr_field_border_crossing_num': 'car number',
            'vtdr_field_border_crossing_status': 'Status of the wagon',
            'vtdr_field_border_crossing_date_departure_amkr': 'Wagon sent',
            'vtdr_field_border_crossing_border_crossing_stn': 'Boundary crossing code',
            'vtdr_field_border_crossing_border_crossing_stn_name': 'Border Crossing',
            'vtdr_field_border_crossing_cross_time': 'Date and time of crossing',
            'vtdr_field_border_crossing_client_kod_on': 'Consignee Code',
            'vtdr_field_border_crossing_client_name_on': 'Consignee',
            'vtdr_field_border_crossing_vesg': 'Weight',
            'vtdr_field_border_crossing_epd_status': 'EPD status',
            'vtdr_field_border_crossing_epd_date_otpr': 'Sent (EPD)',
            'vtdr_field_border_crossing_epd_date_pr': 'Arrived (EPD)',

            'vtdr_mess_error_search_cars': 'An error occurred while generating the report, error code {0}',

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FE = App.form_element;
    var alert = App.alert_form;
    var directory = App.ids_directory;
    var wsd = App.ids_wsd;
    var FIL = App.form_inline;
    var TTDR = App.table_td_report;
    var CAM = App.chart_amcharts;
    //// асинхронно добавим распарсеный ЭПД
    //var wagons_get_epd_async = function (row, callback) {
    //    var base = this;
    //    var len = row.length;
    //    if (len === 0) {
    //        if (typeof callback === 'function') {
    //            callback();
    //        }
    //        return 0;
    //    }
    //    function GetEPDWagonsAsync(i) {
    //        if (i < len) {
    //            // Поместим следующий вызов функции в цикл событий.
    //            setTimeout(function () {
    //                this.ids_wsd.getOTPR_UZ_DOCOfNum(row[i].arrival_car_num_doc, function (doc_uz_sms) {
    //                    row[i].otpr = null;
    //                    if (doc_uz_sms !== null) {
    //                        // Получим дату отправки
    //                        row[i].otpr = doc_uz_sms;
    //                    };
    //                    GetEPDWagonsAsync.call(this, i + 1);
    //                }.bind(this));
    //            }.bind(this), 0);
    //        } else {
    //            // Так как достигнут конец массива, мы вызываем коллбэк
    //            if (typeof callback === 'function') {
    //                callback();
    //            } else return 0;
    //        }
    //    }
    //    GetEPDWagonsAsync.call(this, 0);
    //};
    // асинхронно добавим распарсеный ЭПД
    //var wagons_get_out_epd_async = function (row, callback) {
    //    var base = this;
    //    var len = row.length;
    //    if (len === 0) {
    //        if (typeof callback === 'function') {
    //            callback();
    //        }
    //        return 0;
    //    }
    //    function GetEPDWagonsAsync(i) {
    //        if (i < len) {
    //            // Поместим следующий вызов функции в цикл событий.
    //            setTimeout(function () {
    //                this.ids_wsd.getOTPR_UZ_DOC_OUTOfNum(row[i].outgoing_uz_document_id_doc_uz, function (doc_uz_sms) {
    //                    row[i].otpr = null;
    //                    row[i].vagon = null;
    //                    if (doc_uz_sms !== null) {
    //                        // Получим дату отправки
    //                        row[i].otpr = doc_uz_sms;
    //                        if (doc_uz_sms && doc_uz_sms.vagon && doc_uz_sms.vagon.length > 0) {
    //                            for (var iv = 0; iv < doc_uz_sms.vagon.length; iv++) {
    //                                if (Number(doc_uz_sms.vagon[iv].nomer) === row[i].num)
    //                                    row[i].vagon = doc_uz_sms.vagon[iv];
    //                            }
    //                        }
    //                    };
    //                    GetEPDWagonsAsync.call(this, i + 1);
    //                }.bind(this));
    //            }.bind(this), 0);
    //        } else {
    //            // Так как достигнут конец массива, мы вызываем коллбэк
    //            if (typeof callback === 'function') {
    //                callback();
    //            } else return 0;
    //        }
    //    }
    //    GetEPDWagonsAsync.call(this, 0);
    //};
    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_td_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fe_ui = new FE();
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_td_report.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    //==========================================================================================
    // Инициализация
    view_td_report.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('vtdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            ids_dir: null,
            fn_init: null,
        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();

        this.elements = {}; // Все элементы формы

        this.report = null;         // Номер выбранного отчета
        this.report_panel = null;   // Номер выбранного панели отчета
        this.type = 1;              // Тип диапазона времени отчета
        // Диапазон времени
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        //
        this.adoption_sostav = [];
        this.vs_adoption_sostav = [];
        this.nb_adoption_sostav = [];
        this.pr_adoption_sostav = [];
        this.kr_adoption_sostav = [];
        this.outgoing_sostav = [];
        this.vs_outgoing_sostav = [];
        this.nb_outgoing_sostav = [];
        this.pr_outgoing_sostav = [];
        this.kr_outgoing_sostav = [];

        this.outgoing_cars = [];
        this.outgoing_cars_usage_fee = [];
        this.outgoing_cars_usage_fee_not_derailment = [];
        this.outgoing_cars_usage_fee_operator_amkr = [];

        this.usage_fee_period = [];
        this.manual_usage_fee = [];

        this.wagons_not_operation = [];

        this.wagons_adoption = [];
        this.clone_wagons_adoption = [];

        this.wagons_outgoing = [];
        this.mine_cargo = [];
        this.clone_wagons_outgoing = [];

        this.is_acts = false;

        // Сылки на общие отчеты 
        this.report_links_cammon = [
            {
                text: langView('vtdr_link_title_report_1_1', App.Langs),
                icon: 'fa-solid fa-chart-column mr-1',
                click: function () {
                    this.init_report_1_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_4_1', App.Langs),
                icon: 'fa-solid fa-diagram-project mr-1',
                click: function () {
                    this.init_report_4_1();
                }.bind(this),
            },
            //<i class="fa-sharp fa-solid fa-chart-simple"></i>
        ];
        // Сылки на отчеты прибытия
        this.report_links_arrival = [
            {
                text: langView('vtdr_link_title_report_2_1', App.Langs),
                icon: 'fa-solid fa-arrow-right-to-bracket mr-1',
                click: function () {
                    this.init_report_2_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_3_1', App.Langs),
                icon: 'fa-sharp fa-solid fa-chart-simple mr-1',
                click: function () {
                    this.init_report_3_1();
                }.bind(this),
            },
            //<i class="fa-sharp fa-solid fa-chart-simple"></i>
        ];
        // Сылки на отчеты отправки
        this.report_links_outgoing = [
            {
                text: langView('vtdr_link_title_report_5_1', App.Langs),
                icon: 'fa-solid fa-arrow-right-to-bracket mr-1',
                click: function () {
                    this.init_report_5_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_6_1', App.Langs),
                icon: 'fa-sharp fa-solid fa-chart-simple mr-1',
                click: function () {
                    this.init_report_6_1();
                }.bind(this),
            },
            //<i class="fa-sharp fa-solid fa-chart-simple"></i>
        ];
        // Сылки на отчеты плата за пользование
        this.report_links_usage_fee = [
            {
                text: langView('vtdr_link_title_report_7_1', App.Langs),
                icon: 'fa-solid fa-arrow-right-to-bracket mr-1',
                click: function () {
                    this.init_report_7_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_8_1', App.Langs),
                icon: 'fa-sharp fa-solid fa-chart-simple mr-1',
                click: function () {
                    this.init_report_8_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_9_1', App.Langs),
                icon: 'fa-sharp fa-solid fa-chart-simple mr-1',
                click: function () {
                    this.init_report_9_1();
                }.bind(this),
            },
        ];
        // Сылки на отчеты остаток
        this.report_links_residue = [
            {
                text: langView('vtdr_link_title_report_10_1', App.Langs),
                icon: 'fa-solid fa-arrow-right-to-bracket mr-1',
                click: function () {
                    this.init_report_10_1();
                }.bind(this),
            },
            {
                text: langView('vtdr_link_title_report_11_1', App.Langs),
                icon: 'fa-solid fa-arrow-right-to-bracket mr-1',
                click: function () {
                    this.init_report_11_1();
                }.bind(this),
            },
        ];
        // Очистим экран
        this.$panel.empty();
        // Построим основной экран
        //<div class="wrapper d-flex align-items-stretch">
        this.$panel.addClass('wrapper d-flex align-items-stretch');
        var nav$ = $('<nav id="sidebar"></nav>');
        //<div class="custom-menu">
        var div_cm = new this.fe_ui.div({
            class: 'custom-menu',
        });
        //<button type="button" id="sidebarCollapse" class="btn btn-primary">
        //    <i class="fa-solid fa-bars"></i>
        //    <span class="sr-only">Toggle Menu</span>
        //</button>
        var button_mn = new this.fe_ui.bs_button({
            color: 'primary',
            size: null,
            class: null,
            id: 'sidebarCollapse',
            label: '<span class="sr-only">Toggle Menu</span>',
            title: null,
            icon_left: 'fa-solid fa-bars',
            icon_right: null,
            click: null,
        });
        div_cm.$div.on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        div_cm.$div.append(button_mn.$button);
        //--------------------
        //<div class="p-4">
        var div_p4 = new this.fe_ui.div({
            class: 'p-4',
        });
        //<h1><a href='@Url.Action("Index", "Home", new { Area = "IDSReport" })' class="logo">@IDSReportResource.system_idsreport_title<span><i class="fa-solid fa-sack-dollar mr-1"></i>@IDSReportResource.report_sd_title</span></a></h1>
        var $h1 = $('<h1></h1>');
        var a_home = new this.fe_ui.a({
            id: null,
            class: 'logo',
            href: '/IDSReport/Home',
            text: langView('vtdr_link_title_home1', App.Langs) + '<span><i class="fa-solid fa-train-subway mr-1"></i>' + langView('vtdr_link_title_home2', App.Langs) + '</span>',
            target: null,
            title: null,
        });
        $h1.append(a_home.$alink);
        //<h3 class="h6 mb-3">@IDSReportResource.report_sd_group_link_cargo</h3>
        //<ul class="list-unstyled components mb-5 text-left" id="list-sidebar">
        //
        div_p4.$div.append($h1);
        //------------------------------------------
        // Общие отчеты
        var $h6_cammon = $('<h6></h6>', {
            class: 'sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white',
        });
        var $sp_cammon = $('<span>' + langView('vtdr_link_group_title_report_1', App.Langs) + '</span>');
        div_p4.$div.append($h6_cammon.append($sp_cammon));
        var $ul_cammon = $('<ul class="list-unstyled components mb-2 text-left"></ul>');
        $.each(this.report_links_cammon, function (index, element) {
            var $li = $('<li></li>');
            var a_link = new this.fe_ui.a({
                id: null,
                class: null,
                href: '#',
                text: '<i class="' + element.icon + '" style="color:#ffff49"></i>' + element.text, //#44bef1
                target: null,
                title: null,
            });
            if (typeof element.click === 'function') {
                a_link.$alink.on("click", element.click);
            }
            $li.append(a_link.$alink);
            $ul_cammon.append($li);
        }.bind(this));
        div_p4.$div.append($ul_cammon);
        //--------------------------------------------
        // Отчеты по прибытию
        var $h6_arrival = $('<h6></h6>', {
            class: 'sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white',
        });
        var $sp_arrival = $('<span>' + langView('vtdr_link_group_title_report_2', App.Langs) + '</span>');
        div_p4.$div.append($h6_arrival.append($sp_arrival));
        var $ul_arrival = $('<ul class="list-unstyled components mb-2 text-left"></ul>');
        $.each(this.report_links_arrival, function (index, element) {
            var $li = $('<li></li>');
            var a_link = new this.fe_ui.a({
                id: null,
                class: null,
                href: '#',
                text: '<i class="' + element.icon + '" style="color:#ffff49"></i>' + element.text, //#44bef1
                target: null,
                title: null,
            });
            if (typeof element.click === 'function') {
                a_link.$alink.on("click", element.click);
            }
            $li.append(a_link.$alink);
            $ul_arrival.append($li);
        }.bind(this));
        div_p4.$div.append($ul_arrival);
        //--------------------------------------------
        // Отчеты по отправке
        var $h6_outgoing = $('<h6></h6>', {
            class: 'sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white',
        });
        var $sp_outgoing = $('<span>' + langView('vtdr_link_group_title_report_3', App.Langs) + '</span>');
        div_p4.$div.append($h6_outgoing.append($sp_outgoing));
        var $ul_outgoing = $('<ul class="list-unstyled components mb-2 text-left"></ul>');
        $.each(this.report_links_outgoing, function (index, element) {
            var $li = $('<li></li>');
            var a_link = new this.fe_ui.a({
                id: null,
                class: null,
                href: '#',
                text: '<i class="' + element.icon + '" style="color:#ffff49"></i>' + element.text, //#44bef1
                target: null,
                title: null,
            });
            if (typeof element.click === 'function') {
                a_link.$alink.on("click", element.click);
            }
            $li.append(a_link.$alink);
            $ul_outgoing.append($li);
        }.bind(this));
        div_p4.$div.append($ul_outgoing);
        //--------------------------------------------
        // Отчеты ПЛАТА ЗА ПОЛЬЗОВАНИЕ
        var $h6_outgoing = $('<h6></h6>', {
            class: 'sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white',
        });
        var $sp_outgoing = $('<span>' + langView('vtdr_link_group_title_report_4', App.Langs) + '</span>');
        div_p4.$div.append($h6_outgoing.append($sp_outgoing));
        var $ul_outgoing = $('<ul class="list-unstyled components mb-2 text-left"></ul>');
        $.each(this.report_links_usage_fee, function (index, element) {
            var $li = $('<li></li>');
            var a_link = new this.fe_ui.a({
                id: null,
                class: null,
                href: '#',
                text: '<i class="' + element.icon + '" style="color:#ffff49"></i>' + element.text, //#44bef1
                target: null,
                title: null,
            });
            if (typeof element.click === 'function') {
                a_link.$alink.on("click", element.click);
            }
            $li.append(a_link.$alink);
            $ul_outgoing.append($li);
        }.bind(this));
        div_p4.$div.append($ul_outgoing);
        //--------------------------------------------
        // Отчеты ОСТАТОК ВАГОНОВ
        var $h6_residue = $('<h6></h6>', {
            class: 'sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white',
        });
        var $sp_residue = $('<span>' + langView('vtdr_link_group_title_report_5', App.Langs) + '</span>');
        div_p4.$div.append($h6_residue.append($sp_residue));
        var $ul_residue = $('<ul class="list-unstyled components mb-2 text-left"></ul>');
        $.each(this.report_links_residue, function (index, element) {
            var $li = $('<li></li>');
            var a_link = new this.fe_ui.a({
                id: null,
                class: null,
                href: '#',
                text: '<i class="' + element.icon + '" style="color:#ffff49"></i>' + element.text, //#44bef1
                target: null,
                title: null,
            });
            if (typeof element.click === 'function') {
                a_link.$alink.on("click", element.click);
            }
            $li.append(a_link.$alink);
            $ul_residue.append($li);
        }.bind(this));
        div_p4.$div.append($ul_residue);

        //--------------------------------------------
        // Подвал
        //<div class="footer">
        var div_ft = new this.fe_ui.div({
            class: 'footer',
        });

        div_p4.$div.append(div_ft.$div);
        //------------------------------------
        nav$.append(div_cm.$div).append(div_p4.$div)
        //------------------------------------
        //<div class="p-4 p-md-5 pt-5 pt-1">
        var div_content = new this.fe_ui.div({
            id: 'content',
            class: 'p-4 p-md-5 pt-5 pt-1"',
        });
        var div_title = new this.fe_ui.div({
            class: 'd-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom',
        });
        this.$title_report = $('<h1 class="h2"></h1>');             // Подпись отчета
        this.$main_report = $('<div></div>');                       // Основное окно отчета
        var $alert = $('<div class="alert" role="alert">');         // вывод ошибки
        this.alert = new alert($alert);
        if (this.settings.alert === null) this.settings.alert = this.alert;
        div_content.$div.append(div_title.$div.append(this.$title_report)).append($alert).append(this.$main_report);
        //----------------------------------------------------------------
        this.$panel.append(nav$).append(div_content.$div);

        var fullHeight = function () {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });

        };
        fullHeight();
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    //------------------------------------------------------------------------------------------------
    // Инициализация панели только c карточкой таблица
    view_td_report.prototype.init_panel_table_report = function (tabs, name_panel, name_div) {
        // 
        var card_table = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-center text-white bg-primary',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_table', App.Langs),
        });
        card_table.$body.append($('<div>', {
            id: name_div,
        }))
        var row_table = new this.fe_ui.bs_row();
        var col_table = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        //
        row_table.$row.append(col_table.$col.append(card_table.$card));
        // Добавим в панель
        //var $panel = this.nav_tabs_arr_total.$content.find('div#' + name_panel); // Панель
        var $panel = tabs.$content.find('div#' + name_panel); // Панель
        $panel.append(row_table.$row);
    };
    // Инициализация панели c вертикальным расположением карточек
    view_td_report.prototype.init_panel_report = function (tabs, name_panel, name_div) {
        // Груз по Оператору АМКР
        var card_table = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-center text-white bg-primary',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_table', App.Langs),
        });
        card_table.$body.append($('<div>', {
            id: name_div,
        }))
        var row_table = new this.fe_ui.bs_row();
        var col_table = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        row_table.$row.append(col_table.$col.append(card_table.$card));
        // Добавим в панель
        var $panel = tabs.$content.find('div#' + name_panel); // Панель
        $panel.append(row_table.$row);
    };
    // Инициализация панели c вертикальным расположением карточек
    view_td_report.prototype.init_panel_vertical_report = function (tabs, name_panel, name_div) {
        // Груз по Оператору АМКР
        var card_chart = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center text-white bg-info',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_chart', App.Langs),
        });
        card_chart.$body.append($('<div>', {
            id: name_div + '-chart',
        }))
        var card_table = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-center text-white bg-primary',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_table', App.Langs),
        });
        card_table.$body.append($('<div>', {
            id: name_div,
        }))
        var row_chart = new this.fe_ui.bs_row();
        var row_table = new this.fe_ui.bs_row();
        var col_chart = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var col_table = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        //
        row_chart.$row.append(col_chart.$col.append(card_chart.$card));
        row_table.$row.append(col_table.$col.append(card_table.$card));
        // Добавим в панель
        //var $panel = this.nav_tabs_arr_total.$content.find('div#' + name_panel); // Панель
        var $panel = tabs.$content.find('div#' + name_panel); // Панель
        $panel.append(row_table.$row).append(row_chart.$row);
    };
    // Инициализация панели c горизонтальным расположением карточек
    view_td_report.prototype.init_panel_horizontal_report = function (tabs, name_panel, name_div, tab_col, char_col) {
        // Груз по Оператору АМКР
        var card_chart = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center text-white bg-info',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_chart', App.Langs),
        });
        card_chart.$body.append($('<div>', {
            id: name_div + '-chart',
        }))
        var card_table = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-center text-white bg-primary',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_table', App.Langs),
        });
        card_table.$body.append($('<div>', {
            id: name_div,
        }))
        var row = new this.fe_ui.bs_row();
        var col_chart = new this.fe_ui.bs_col({
            size: 'xl',
            col: char_col ? char_col : 6,
        });
        var col_table = new this.fe_ui.bs_col({
            size: 'xl',
            col: tab_col ? tab_col : 6,
        });
        row.$row.append(col_table.$col.append(card_table.$card)).append(col_chart.$col.append(card_chart.$card));
        //
        // Добавим в панель
        //var $panel = this.nav_tabs_arr_total.$content.find('div#' + name_panel); // Панель
        var $panel = tabs.$content.find('div#' + name_panel); // Панель
        $panel.append(row.$row);
    };
    //
    view_td_report.prototype.init_panel_horizontal_char2_report = function (tabs, name_panel, name_div, tab_col, char_col) {
        // Груз по Оператору АМКР
        var card_chart1 = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center text-white bg-info',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_chart', App.Langs),
        });
        card_chart1.$body.append($('<div>', {
            id: name_div + '1-chart',
        }))
        var card_chart2 = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center text-white bg-info',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_chart', App.Langs),
        });
        card_chart2.$body.append($('<div>', {
            id: name_div + '2-chart',
        }))

        var card_table = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-center text-white bg-primary',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_table', App.Langs),
        });
        card_table.$body.append($('<div>', {
            id: name_div,
        }))
        var row = new this.fe_ui.bs_row();
        var col_chart = new this.fe_ui.bs_col({
            size: 'xl',
            col: char_col ? char_col : 6,
        });
        var col_table = new this.fe_ui.bs_col({
            size: 'xl',
            col: tab_col ? tab_col : 6,
        });
        row.$row.append(col_table.$col.append(card_table.$card)).append(col_chart.$col.append(card_chart1.$card).append(card_chart2.$card));
        //
        // Добавим в панель
        //var $panel = this.nav_tabs_arr_total.$content.find('div#' + name_panel); // Панель
        var $panel = tabs.$content.find('div#' + name_panel); // Панель
        $panel.append(row.$row);
    };
    //----------------------------------------------------------------------
    // ФОРМА ВЫБОРА ВРЕМЕНИ ОТЧЕТА
    // Настройка выбора диапазона отчета
    view_td_report.prototype.init_select_report = function () {
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.month = moment().month();
        this.year = moment().year();

        // Создадим форму выбора для отчета
        this.form_panel = new FIL();
        var fl_interval_date = {
            type: 'interval_date',
            id: 'interval_date',
            prefix: 'sm',
            title: langView('vtdr_title_label_interval_date', App.Langs),
            start: this.start,
            stop: this.stop,
            select: function (interval) {
                this.set_data_report(null, interval);
            }.bind(this),
        };
        var fl_select_date = {
            type: 'date',
            id: 'select_date',
            prefix: 'sm',
            title: langView('vtdr_title_label_date', App.Langs),
            start: this.start,
            time: false,
            select: function (date) {
                this.set_data_report(date, null);
            }.bind(this),
        };
        var fl_type_select = {
            type: 'select',
            id: 'type_select',
            prefix: 'sm',
            title: langView('vtdr_title_type_select', App.Langs),
            list: [
                //{ value: 1, text: 'ЖД сутки' },
                //{ value: 2, text: 'Календарные сутки' },
                //{ value: 3, text: 'От начала месяца' },
                //{ value: 4, text: 'Произвольный выбор' },
                //{ value: 5, text: 'Отчетный период (продажа)' },
                //{ value: 6, text: 'Отчетный период (плата)' },
            ],
            default: this.type,
            select: function (event, ui) {
                event.preventDefault();
                // Обработать выбор
                var id = Number($(event.currentTarget).val());
                this.select_report(id);
            }.bind(this),
        };
        var fl_select_month = {
            type: 'select',
            id: 'select_month',
            prefix: 'sm',
            title: langView('vtdr_title_select_month', App.Langs),
            list: [
                { value: 1, text: 'Январь' },
                { value: 2, text: 'Февраль' },
                { value: 3, text: 'Март' },
                { value: 4, text: 'Апрель' },
                { value: 5, text: 'Май' },
                { value: 6, text: 'Июнь' },
                { value: 7, text: 'Июль' },
                { value: 8, text: 'Август' },
                { value: 9, text: 'Сентябрь' },
                { value: 10, text: 'Октябрь' },
                { value: 11, text: 'Ноябрь' },
                { value: 12, text: 'Декабрь' },
            ],
            default: this.month + 1,
            select: function (event, ui) {
                event.preventDefault();
                // Обработать выбор
                var month = Number($(event.currentTarget).val());
                if (month >= 0) {
                    this.month = month - 1;
                    this.select_report(this.type);
                }
            }.bind(this),
        };
        var fl_select_year = {
            type: 'select',
            id: 'select_year',
            prefix: 'sm',
            title: langView('vtdr_title_select_year', App.Langs),
            list: [
                { value: this.year, text: this.year },
                { value: this.year - 1, text: this.year - 1 },
                { value: this.year - 2, text: this.year - 2 },
            ],
            default: this.year,
            select: function (event, ui) {
                event.preventDefault();
                // Обработать выбор
                var year = Number($(event.currentTarget).val());
                if (year >= 0) {
                    this.year = year;
                    this.select_report(this.type);
                }
            }.bind(this),
        };
        var fl_button = {
            type: 'button',
            id: 'button',
            prefix: 'sm',
            title: langView('vtdr_title_button', App.Langs),
            icon: 'fas fa-retweet',
            select: function (e, ui) {
                event.preventDefault();
                this.view_report();
            }.bind(this),
        };
        var fields = [];
        fields.push(fl_type_select);
        fields.push(fl_select_date);
        fields.push(fl_interval_date);
        fields.push(fl_select_year);
        fields.push(fl_select_month);
        fields.push(fl_button);
        // Инициализация формы
        this.form_panel.init({
            fields: fields,
            cl_form: 'd-flex w-100 mb-2'
        });
        // Отображение формы выбора 
        this.$main_report.append(this.form_panel.$form);
        this.div_interval_date = $('span#interval_date').closest("div").prev().closest("div");
        this.div_select_date = $('input#select_date').closest("div").prev().closest("div");
        this.div_select_year = $('select#select_year').closest("div").prev().closest("div");
        this.div_select_month = $('select#select_month').closest("div").prev().closest("div");
        this.div_select_date.hide();
        this.div_interval_date.hide();
        this.div_select_year.hide();
        this.div_select_month.hide();
        this.form_panel.enable('type_select');
        this.type = 1; // по умолчанию
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        if (this.report === 4) {
            this.start = moment().subtract(5, 'years').set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
            this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
            this.type = 4;
            this.form_panel.disable('type_select', null);
        }
        this.select_report(this.type);
    };
    // Выбор типа отчета
    view_td_report.prototype.select_report = function (type) {
        this.type = type;
        this.form_panel.set('type_select', this.type);
        switch (type) {
            case 6:
            case 5: {
                this.start = moment().set({ 'year': this.year, 'month': this.month, 'date': 1, 'hour': 20, 'minute': 1, 'second': 0 }).subtract(1, 'days')._d;
                this.stop = moment().set({ 'year': (this.month < 11 ? this.year : this.year + 1), 'month': (this.month < 11 ? this.month + 1 : 0), 'date': 1, 'hour': 20, 'minute': 0, 'second': 0 }).subtract(1, 'days')._d;
                this.div_select_date.hide();
                this.div_interval_date.hide();
                this.div_select_year.show();
                this.div_select_month.show();
                this.set_data_report(null, { start: this.start, stop: this.stop });
                break;
            };
            case 4: {
                this.div_select_date.hide();
                this.div_interval_date.show();
                this.div_select_year.hide();
                this.div_select_month.hide();
                this.set_data_report(null);
                this.form_panel.set('interval_date', { start: this.start, stop: this.stop });
                this.set_data_report(null, { start: this.start, stop: this.stop });
                break;
            };
            case 1:
            case 2:
            case 3:
                //case 7:
                //case 8:
                //case 9:
                {
                    this.div_select_date.show();
                    this.div_interval_date.hide();
                    this.div_select_year.hide();
                    this.div_select_month.hide();
                    this.form_panel.set('select_date', moment());
                    this.set_data_report(moment(), null);
                    break;
                };
            case 0:
                {
                    this.div_select_date.show();
                    this.div_interval_date.hide();
                    this.div_select_year.hide();
                    this.div_select_month.hide();
                    this.form_panel.set('select_date', moment());
                    this.set_data_report(moment(), null);
                    break;
                };
            default: {
                this.div_select_date.hide();
                this.div_interval_date.hide();
                this.div_select_year.hide();
                this.div_select_month.hide();
                this.set_data_report(null, null);
                break;
            }
        };
    };
    // Получить дату отчета
    view_td_report.prototype.set_data_report = function (date, interval) {
        var message_report = '';
        var list = [
            { value: 1, text: 'ЖД сутки' },
            { value: 2, text: 'Календарные сутки' },
            { value: 3, text: 'От начала месяца' },
            { value: 4, text: 'Произвольный выбор' },
            { value: 5, text: 'Отчетный период (продажа)' },
            { value: 6, text: 'Отчетный период (плата)' },
        ];
        switch (this.report) {
            case 1:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_1_1(); break;
            case 2:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_2_1(); break;
            case 3:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_3_1(); break;
            case 4:
                this.form_panel.update('type_select', list, this.type);//4
                this.clear_report_4_1(); break;
            case 5:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_5_1(); break;
            case 6:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_6_1(); break;
            case 7:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_7_1(); break;
            case 8:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_8_1(); break;
            case 9:
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_9_1(); break;
            case 10:
                var list = [
                    { value: 0, text: 'Текущая дата' },
                    { value: 1, text: 'ЖД сутки' },
                    { value: 2, text: 'Календарные сутки' },
                    //{ value: 3, text: 'От начала месяца' },
                    //{ value: 4, text: 'Произвольный выбор' },
                    //{ value: 5, text: 'Отчетный период (продажа)' },
                    //{ value: 6, text: 'Отчетный период (плата)' },
                ];
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_10_1();
                break;
            case 11:
                var list = [
                    { value: 0, text: 'Текущая дата' },
                    { value: 1, text: 'ЖД сутки' },
                    { value: 2, text: 'Календарные сутки' },
                    { value: 3, text: 'От начала месяца' },
                    { value: 4, text: 'Произвольный выбор' },
                    //{ value: 5, text: 'Отчетный период (продажа)' },
                    //{ value: 6, text: 'Отчетный период (плата)' },
                ];
                this.form_panel.update('type_select', list, this.type);
                this.clear_report_11_1();
                break;
        }
        switch (this.type) {
            case 0: {
                if (date) {
                    this.start = moment(date)._d;
                    this.stop = moment(date)._d;
                    message_report = langView('vtdr_title_report_type_0', App.Langs).format(moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 1: {
                if (date) {
                    this.start = moment(date).subtract(1, 'd').set({ 'hour': 20, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
                    message_report = langView('vtdr_title_report_type_1', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 2: {
                // календарные сутки
                if (date) {
                    this.start = moment(date).set({ 'hour': 0, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                    message_report = langView('vtdr_title_report_type_2', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 3: {
                // за месяц
                if (date) {
                    this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                    this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                    message_report = langView('vtdr_title_report_type_3', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 4: {
                // Произвольный выбор
                if (interval && interval.start && interval.stop) {
                    this.start = moment(interval.start)._d;
                    this.stop = moment(interval.stop)._d;
                    message_report = langView('vtdr_title_report_type_4', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 5: {
                // Отчетный период
                if (interval && interval.start && interval.stop) {
                    this.start = moment(interval.start)._d;
                    this.stop = moment(interval.stop)._d;
                    message_report = langView('vtdr_title_report_type_5', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
            case 6: {
                // Отчетный период
                if (interval && interval.start && interval.stop) {
                    this.start = moment(interval.start)._d;
                    this.stop = moment(interval.stop)._d;
                    message_report = langView('vtdr_title_report_type_6', App.Langs).format(moment(this.start).format(format_datetime), moment(this.stop).format(format_datetime));
                }
                break;
            };
        }
        switch (this.report) {
            case 1: this.$title_report.text(langView('vtdr_title_report_1_1', App.Langs).format(message_report)); break;
            case 2: this.$title_report.text(langView('vtdr_title_report_2_1', App.Langs).format(message_report)); break;
            case 3: this.$title_report.text(langView('vtdr_title_report_3_1', App.Langs).format(message_report)); break;
            case 4: this.$title_report.text(langView('vtdr_title_report_4_1', App.Langs).format(message_report)); break;
            case 5: this.$title_report.text(langView('vtdr_title_report_5_1', App.Langs).format(message_report)); break;
            case 6: this.$title_report.text(langView('vtdr_title_report_6_1', App.Langs).format(message_report)); break;
            case 7: this.$title_report.text(langView('vtdr_title_report_7_1', App.Langs).format(message_report)); break;
            case 8: this.$title_report.text(langView('vtdr_title_report_8_1', App.Langs).format(message_report)); break;
            case 9: this.$title_report.text(langView('vtdr_title_report_9_1', App.Langs).format(message_report)); break;
            case 10: this.$title_report.text(langView('vtdr_title_report_10_1', App.Langs).format(message_report)); break;
            case 11: this.$title_report.text(langView('vtdr_title_report_11_1', App.Langs).format(message_report)); break;
        }
    };
    // Показать отчет
    view_td_report.prototype.view_report = function () {
        switch (this.report) {
            case 1: {
                this.view_report_1_1(this.start, this.stop);
                break;
            };
            case 2: {
                this.view_report_2_1(this.start, this.stop);
                break;
            };
            case 3: {
                this.view_report_3_1(this.start, this.stop);
                break;
            };
            case 4: {
                this.view_report_4_1(this.start, this.stop);
                break;
            };
            case 5: {
                this.view_report_5_1(this.start, this.stop, this.type === 6 ? true : false);
                break;
            };
            case 6: {
                this.view_report_6_1(this.start, this.stop, this.type === 6 ? true : false);
                break;
            };
            case 7: {
                this.view_report_7_1(this.start, this.stop);
                break;
            };
            case 8: {
                this.view_report_8_1(this.start, this.stop);
                break;
            };
            case 9: {
                this.view_report_9_1(this.start, this.stop, this.type === 6 ? true : false);
                break;
            };
            case 10: {
                this.view_report_10_1(this.start, this.stop);
                break;
            };
            case 11: {
                this.view_report_11_1(this.start, this.stop);
                break;
            };
        }
    };
    //----------------------------------------------------------
    // Отчеты
    // Инициализировать отчет "Статистика"
    view_td_report.prototype.init_report_1_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 1; // номер отчета
        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_1_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
        //------
        var div_row1 = new this.fe_ui.bs_row();
        var div_row2 = new this.fe_ui.bs_row();
        var div_col1 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 6,
        });
        var div_col2 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 6,
        });
        var div_col3 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        //--- Окно прибытие --------------------------------
        var card_arr = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_arr', App.Langs),
        });
        // Карточка прибытия
        var nav_tabs_arr = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-arr',
            class_nav: null,
            id_content: 'tab-arr-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'arr-report',
                    aria_controls: 'arr-report-tab',
                    label: 'Отчет',
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-searsh',
                    aria_controls: 'arr-searsh-tab',
                    label: 'Поиск',
                    disable: false,
                    click: null,
                },
            ],
        });     // Переключатели панелей карточки
        //---- Панель "Отчет"
        var $arr_report = nav_tabs_arr.$content.find('div#arr-report-tab'); // Панель отчета
        $arr_report.append($('<div id="adoption-sostav-all"></div>')).append($('<div id="adoption-sostav-detali"></div>')); // Добавим div для таблиц
        //---- Панель "Поиск по ..."
        var $arr_searsh = nav_tabs_arr.$content.find('div#arr-searsh-tab'); // Панель поиска
        // Создать макет панели для поиска
        var row1_arr = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var button_arr = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: null,
            id: 'search_car',
            label: null,
            title: '',
            icon_left: null,
            icon_right: 'fas fa-search',
            click: function (event) {
                event.preventDefault();
                this.action_search_adoption_docs();
            }.bind(this),
        });
        var textarea_arr = new this.fe_ui.bs_textarea({
            id: 'list_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: '№№ Ведомостей',
            label_class: 'mb-1',
            textarea_size: null,
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: '№№ Ведомостей',
            textarea_maxlength: null,
            textarea_placeholder: 'xxxx;xxxx',
            textarea_required: null,
            textarea_readonly: false,
            input_group: true,
            input_group_prepend_class: null,
            input_group_prepend_objs: [],
            input_group_append_class: null,
            input_group_append_objs: [],
            input_group_obj_form: null,
        });
        var iga_arr = textarea_arr.$element.find('div.input-group-append');
        iga_arr.append(button_arr.$button);
        row1_arr.$row.append(textarea_arr.$element);
        var row2_arr = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var col2_arr = new this.fe_ui.bs_col({
            id: null,
            size: 'xl',
            col: 12,
            class: null,
        });
        var div_table_searsh_docs_arr = new this.fe_ui.div({
            class: null,
            id: 'adoption-searsh-docs',
        });
        this.$bt_search_car_arr = button_arr.$button;
        this.element_textarea_docs_arr = textarea_arr.element;
        $arr_searsh.append(row1_arr.$row).append(row2_arr.$row.append(col2_arr.$col.append(div_table_searsh_docs_arr.$div)));
        // Добавим панель в карточку
        card_arr.$header.append(nav_tabs_arr.$ul);
        card_arr.$body.append(nav_tabs_arr.$content);
        //--- Окно Отправка --------------------------------
        var card_out = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_out', App.Langs),
        });
        var nav_tabs_out = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-out',
            class_nav: null,
            id_content: 'tab-out-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'out-report',
                    aria_controls: 'out-report-tab',
                    label: 'Отчет',
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-searsh',
                    aria_controls: 'out-searsh-tab',
                    label: 'Поиск',
                    disable: false,
                    click: null,
                },
            ],
        });     // Переключатели панелей карточки
        //---- Панель "Отчет"
        var $out_report = nav_tabs_out.$content.find('div#out-report-tab'); // Панель отчета
        $out_report.append($('<div id="outgoing-sostav-all"></div>')).append($('<div id="outgoing-sostav-detali"></div>')); // Добавим div для таблиц
        //---- Панель "Поиск по ..."
        var $out_searsh = nav_tabs_out.$content.find('div#out-searsh-tab'); // Панель поиска
        // Создать макет панели для поиска
        var row1_out = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var button_out = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: null,
            id: 'search_car',
            label: null,
            title: '',
            icon_left: null,
            icon_right: 'fas fa-search',
            click: function (event) {
                event.preventDefault();
                this.action_search_outgoing_docs();
            }.bind(this),
        });
        var textarea_out = new this.fe_ui.bs_textarea({
            id: 'list_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: '№№ Ведомостей',
            label_class: 'mb-1',
            textarea_size: null,
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: '№№ Ведомостей',
            textarea_maxlength: null,
            textarea_placeholder: 'xxxx;xxxx',
            textarea_required: null,
            textarea_readonly: false,
            input_group: true,
            input_group_prepend_class: null,
            input_group_prepend_objs: [],
            input_group_append_class: null,
            input_group_append_objs: [],
            input_group_obj_form: null,
        });
        var iga_out = textarea_out.$element.find('div.input-group-append');
        iga_out.append(button_out.$button);
        row1_out.$row.append(textarea_out.$element);
        var row2_out = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var col2_out = new this.fe_ui.bs_col({
            id: null,
            size: 'xl',
            col: 12,
            class: null,
        });
        var div_table_searsh_docs_out = new this.fe_ui.div({
            class: null,
            id: 'outgoing-searsh-docs',
        });
        this.$bt_search_car_out = button_out.$button;
        this.element_textarea_docs_out = textarea_out.element;
        $out_searsh.append(row1_out.$row).append(row2_out.$row.append(col2_out.$col.append(div_table_searsh_docs_out.$div)));
        // Добавим панель в карточку
        card_out.$header.append(nav_tabs_out.$ul);
        card_out.$body.append(nav_tabs_out.$content);
        //----- Карточка вагоны без оператора
        var card_wag_not_oper = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-secondary mb-1 mt-1',
            header: true,
            class_header: 'text-center',
            class_body: 'text-center',
            title_header: langView('vtdr_card_header_report_1_1_not_oper', App.Langs),
        });
        card_wag_not_oper.$body.append($('<div id="adoption-wagon-not-operation"></div>'));
        // Добавим форму отчета на основное окно
        div_row1.$row.append(div_col1.$col.append(card_arr.$card)).append(div_col2.$col.append(card_out.$card));
        this.$main_report.append(div_row1.$row).append(div_row2.$row.append(div_col3.$col.append(card_wag_not_oper.$card)));

        // Запускаем 6 процесса инициализации (паралельно)
        var process = 7;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                // 
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {
                        case 'arr-report': {
                            this.form_panel.$form.addClass('d-flex').show();
                            break;
                        };
                        case 'arr-searsh': {
                            this.form_panel.$form.removeClass('d-flex').hide();
                            break;
                        };
                        case 'out-report': {
                            this.form_panel.$form.addClass('d-flex').show();
                            break;
                        };
                        case 'out-searsh': {
                            this.form_panel.$form.removeClass('d-flex').hide();
                            break;
                        };
                    };
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    //event.target // newly activated tab
                    //event.relatedTarget // previous active tab
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        //
        this.table_adop_sostav_all = new TTDR('div#adoption-sostav-all');               // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_adop_sostav_all.init({
            alert: null,
            detali_table: false,
            type_report: 'adoption_sostav',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0 && rows[0].adoption_sostav && rows[0].adoption_sostav.length > 0) {
                    this.table_adop_sostav_detali.view(rows[0].adoption_sostav);
                    LockScreenOff();
                } else {
                    this.table_adop_sostav_detali.view([]);
                    LockScreenOff();
                }
            }.bind(this),
        });

        this.table_adop_sostav_detali = new TTDR('div#adoption-sostav-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_adop_sostav_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        this.table_adop_searsh_docs = new TTDR('div#adoption-searsh-docs');              // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_adop_searsh_docs.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
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
        //
        this.table_outg_sostav_all = new TTDR('div#outgoing-sostav-all');               // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_outg_sostav_all.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_sostav',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0 && rows[0].outgoing_sostav && rows[0].outgoing_sostav.length > 0) {
                    this.table_outg_sostav_detali.view(rows[0].outgoing_sostav);
                    LockScreenOff();
                } else {
                    this.table_outg_sostav_detali.view([]);
                    LockScreenOff();
                }
            }.bind(this),
        });

        this.table_outg_sostav_detali = new TTDR('div#outgoing-sostav-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица отправленных составов"
        this.table_outg_sostav_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'outgoing_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        this.table_outg_searsh_docs = new TTDR('div#outgoing-searsh-docs');              // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_outg_searsh_docs.init({
            alert: null,
            detali_table: true,
            type_report: 'outgoing_sostav_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
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

        this.table_adop_wagon_not_operation = new TTDR('div#adoption-wagon-not-operation');              // Создадим экземпляр
        // Инициализация модуля "Таблица вагонов без оператора"
        this.table_adop_wagon_not_operation.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_wagon_not_operation',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
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
    // Показать отчет  "Статистика"
    view_td_report.prototype.view_report_1_1 = function (start, stop) {
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 3;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);

        LockScreen(langView('vtdr_load_adoption_sostav', App.Langs));
        // Прибытие
        this.ids_wsd.getReportAdoptionSostavOfPeriod(start, stop, function (result_sostav) {
            this.adoption_sostav = result_sostav;
            var adoption_sostav = [];

            this.vs_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 6 || i.id_station_on === 7 || i.id_station_on === 8;
            });
            this.nb_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 19;
            });
            this.pr_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 27;
            });
            this.kr_adoption_sostav = result_sostav.filter(function (i) {
                return i.id_station_on === 10;
            });

            adoption_sostav.push(this.get_adoption_sostav('Восточная', this.vs_adoption_sostav, 0));
            adoption_sostav.push(this.get_adoption_sostav('Промышленная', this.pr_adoption_sostav, 0));
            adoption_sostav.push(this.get_adoption_sostav('Новобункерная', this.nb_adoption_sostav, 0));
            adoption_sostav.push(this.get_adoption_sostav('Кирова', this.kr_adoption_sostav, 1));

            this.table_adop_sostav_all.view(adoption_sostav);
            process_load--;
            out_load(process_load);

        }.bind(this));
        // Отправка
        this.ids_wsd.getReportOutgoingSostavOfPeriod(start, stop, function (result_sostav) {
            this.outgoing_sostav = result_sostav;
            var outgoing_sostav = [];

            this.vs_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 6 || i.id_station_from === 7 || i.id_station_from === 8;
            });
            this.nb_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 19;
            });
            this.pr_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 27;
            });
            this.kr_outgoing_sostav = result_sostav.filter(function (i) {
                return i.id_station_from === 10;
            });

            outgoing_sostav.push(this.get_outgoing_sostav('Восточная', this.vs_outgoing_sostav, 0));
            outgoing_sostav.push(this.get_outgoing_sostav('Промышленная', this.pr_outgoing_sostav, 0));
            outgoing_sostav.push(this.get_outgoing_sostav('Новобункерная', this.nb_outgoing_sostav, 0));
            outgoing_sostav.push(this.get_outgoing_sostav('Кирова', this.kr_outgoing_sostav, 1));

            this.table_outg_sostav_all.view(outgoing_sostav);
            process_load--;
            out_load(process_load);

        }.bind(this));
        // пустые операторы
        this.ids_wsd.getReportAdoptionWagonNotOperationOfPeriod(start, stop, function (result_wagons) {
            this.wagons_not_operation = result_wagons;
            this.table_adop_wagon_not_operation.view(this.wagons_not_operation);
            process_load--;
            out_load(process_load);

        }.bind(this));
    };
    // Получим строку для отчета
    view_td_report.prototype.get_adoption_sostav = function (station_name, list_sostav, type) {
        if (list_sostav === null) return null;
        var count_wagon = 0;
        var count_return_wagon = 0;
        var count_account_balance = 0;
        var count_not_operator = 0;
        $.each(list_sostav, function (i, s) {
            count_wagon += s.count_wagon;
            count_return_wagon += s.count_return_wagon;
            count_account_balance += s.count_account_balance;
            count_not_operator += s.count_not_operator;
        });
        return { type: type, station: station_name, count_wagon: count_wagon, count_return_wagon: count_return_wagon, count_account_balance: count_account_balance, count_not_operator: count_not_operator, adoption_sostav: list_sostav }
    };
    // Получим строку для отчета отправка
    view_td_report.prototype.get_outgoing_sostav = function (station_name, list_sostav, type) {
        if (list_sostav === null) return null;
        var count_wagon = 0;
        var count_return_wagon = 0;
        var count_account_balance = 0;
        $.each(list_sostav, function (i, s) {
            count_wagon += s.count_wagon;
            count_return_wagon += s.count_return_wagon;
            count_account_balance += s.count_account_balance;
        });
        return { type: type, station: station_name, count_wagon: count_wagon, count_return_wagon: count_return_wagon, count_account_balance: count_account_balance, outgoing_sostav: list_sostav }
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_1_1 = function () {
        if (this.table_adop_sostav_all) this.table_adop_sostav_all.view([]);
        if (this.table_adop_sostav_detali) this.table_adop_sostav_detali.view([]);
        if (this.table_outg_sostav_all) this.table_outg_sostav_all.view([]);
        if (this.table_outg_sostav_detali) this.table_outg_sostav_detali.view([]);
        if (this.table_adop_wagon_not_operation) this.table_adop_wagon_not_operation.view([]);
        LockScreenOff();
    };
    // Поиск по номеру документа
    view_td_report.prototype.action_search_adoption_docs = function () {
        this.out_clear();
        this.$bt_search_car_arr.prop("disabled", true); // сделаем не активной
        var list_docs = this.element_textarea_docs_arr.val();
        var nums = is_valid_docs(list_docs, this.alert);
        if (nums) {
            LockScreen(langView('vtdr_mess_operation_run', App.Langs));
            this.ids_wsd.getReportAdoptionSostavOfDocs(nums, function (result) {
                if (result !== null) {
                    this.table_adop_searsh_docs.view(result);
                    LockScreenOff();
                } else {
                    this.mf_edit.out_warning(langView('vtdr_mess_error_search_docs', App.Langs).format(result.result));
                }
                this.$bt_search_car_arr.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }.bind(this));
        } else {
            this.$bt_search_car_arr.prop("disabled", false); // сделаем активной
        };
    };
    // Поиск по номеру документа
    view_td_report.prototype.action_search_outgoing_docs = function () {
        this.out_clear();
        this.$bt_search_car_out.prop("disabled", true); // сделаем не активной
        var list_docs = this.element_textarea_docs_out.val();
        var nums = is_valid_docs(list_docs, this.alert);
        if (nums) {
            LockScreen(langView('vtdr_mess_operation_run', App.Langs));
            this.ids_wsd.getReportOutgoingSostavOfDocs(nums, function (result) {
                if (result !== null) {
                    this.table_outg_searsh_docs.view(result);
                    LockScreenOff();
                } else {
                    this.mf_edit.out_warning(langView('vtdr_mess_error_search_docs', App.Langs).format(result.result));
                }
                this.$bt_search_car_out.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }.bind(this));
        } else {
            this.$bt_search_car_out.prop("disabled", false); // сделаем активной
        };
    };
    //----------------------------------------------------------
    // Инициализировать отчет "Отчет по прибытию (общий)"
    view_td_report.prototype.init_report_2_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 2; // номер отчета
        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_2_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                     // Инициализация формы выбора периода отчетов
        //$('#example-getting-started').multiselect();
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db(['operators_wagons'], false, function (result) {

        //    this.list_operators_wagons = this.ids_dir.getListOperatorsWagons('id', 'abbr', App.Lang);

        //------
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);

        // Создадим панель выбора
        var nav_tabs_arr_cammon = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-arr-common',
            class_nav: null,
            id_content: 'tab-arr-common-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'arr-common-group',
                    aria_controls: 'arr-common-group-tab',
                    label: 'По грузам',
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-common-detali',
                    aria_controls: 'arr-common-detali-tab',
                    label: 'Детально',
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        // Закладка групповой отчет
        var div_row_cg = $('<div></div>', {
            class: 'row',
            style: 'margin-top: 10px;'
        });
        this.$div_group_sostav = $('<div></div>', {
            id: 'group-sostav',
            class: 'col-xl-12'
        });
        var $arr_common_group = nav_tabs_arr_cammon.$content.find('div#arr-common-group-tab'); // Панель отчета
        $arr_common_group.append(div_row_cg.append(this.$div_group_sostav)); // Добавим div для таблиц
        // Закладка отчет детально 
        var div_row_detali_stat = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        var div_row_detali = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        //var $bt = $('<button type="button" class="btn btn-primary">Primary</button>');
        //$bt.on('click', function (event) {
        //    this.ids_wsd.getPDFOfNumDoc('86854766', function (data) {
        //        //var blob = new Blob([data], { type: 'application/pdf' });
        //        ////var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        //        ////link.href = URL.createObjectURL(blob);
        //        ////link.download = 'teams.csv';
        //        ////link.click();
        //        //var objectUrl = URL.createObjectURL(blob);
        //        //window.open(objectUrl);

        //        function b64DecodeUnicode(str) {
        //            // Going backwards: from bytestream, to percent-encoding, to original string.
        //            return decodeURIComponent(atob(str).split('').map(function (c) {
        //                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        //            }).join(''));
        //        }
        //        //windows-1251
        //        function Base64Decode(str, encoding = 'windows-1251') {
        //            var bytes = base64js.toByteArray(str);
        //            return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
        //        }



        //        const encodedDataURL = Base64Decode(data);
        //        var count = encodedDataURL.length;

        //        var blob = new Blob([encodedDataURL], { type: 'text/plain;charset=utf-8' });//

        //        //var reader = new FileReader();
        //        //reader.readAsDataURL(blob);

        //        var link = document.createElement('a');
        //        //link.download = 'hello.pdf';

        //        link.href = window.URL.createObjectURL(blob);
        //        //window.open(link);

        //        //reader.onload = function () {
        //        //    link.href = reader.result; // url с данными
        //        //    link.click();
        //        //};

        //        link.setAttribute('download', 'custom_filename.pdf'); // set custom file name
        //        document.body.appendChild(link);

        //        link.click(); // force download file without open new tab


        //    }.bind(this));
        //}.bind(this));
        var $h3 = $('<h3>' + langView('vtdr_title_calculation_static_load', App.Langs) + '</h3>');
        var $tab_nagr = $('<table class="table table-bordered"><thead><tr><th>кол.</th><th>ГП, т</th><th>Вес, тн</th><th>АМКР, тн</th></tr></thead><tbody><tr><td class="dt-centr" id="count_wagon"></td><td class="dt-centr" id="avg_gruzp"></td><td class="dt-centr" id="avg_vesg"></td><td class="dt-centr" id="avg_vesg_reweighing">0</td></tr></tbody></table>');
        var $col_nagr = $('<div id="arr-common-report-detali-stat-nagr" class="col-xl-6"></div>');
        var $arr_common_detali = nav_tabs_arr_cammon.$content.find('div#arr-common-detali-tab'); // Панель поиска
        $arr_common_detali.append(div_row_detali_stat.$row.append($col_nagr.append($h3).append($tab_nagr))); //.append($bt)
        $arr_common_detali.append(div_row_detali.$row.append($('<div id="arr-common-report-detali" class="col-xl-12"></div>')));
        // Дабавим закладку на форму
        this.$table_view.append(nav_tabs_arr_cammon.$ul).append(nav_tabs_arr_cammon.$content);
        //
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------
        // Формируем форму выбора
        var form_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_select = form_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_2_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_2_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        //
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_laden = new this.fe_ui.bs_switch({
            id: 'laden',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_laden', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_laden.$element);
        this.switch_laden = sw_laden.element;
        // Только с грузом
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_accounting = new this.fe_ui.bs_switch({
            id: 'accounting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_accounting', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_accounting.$element);
        this.switch_accounting = sw_accounting.element;
        // Клиентура 
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_client = new this.fe_ui.bs_switch({
            id: 'client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_client.$element);
        this.switch_client = sw_client.element;
        // Без учета клиентуры
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_not_client = new this.fe_ui.bs_switch({
            id: 'not_client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_not_client.$element);
        this.switch_not_client = sw_not_client.element;
        // Платные
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // вагоны
        var row_setup_1 = new this.fe_ui.bs_row();
        var ta_wagon_nums = new this.fe_ui.bs_textarea({
            id: 'wagon_nums',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_wagon_nums', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_wagon_nums', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_1.$row.append(ta_wagon_nums.$element);
        this.textarea_wagon_nums = ta_wagon_nums.element;
        // основн документы
        var row_setup_2 = new this.fe_ui.bs_row();
        var ta_main_epd_docs = new this.fe_ui.bs_textarea({
            id: 'main_epd_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_main_epd_docs', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_main_epd_docs', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_2.$row.append(ta_main_epd_docs.$element);
        this.textarea_main_epd_docs = ta_main_epd_docs.element;
        // досылочные документы
        var row_setup_3 = new this.fe_ui.bs_row();
        var ta_epd_docs = new this.fe_ui.bs_textarea({
            id: 'epd_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_epd_docs', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_epd_docs', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_3.$row.append(ta_epd_docs.$element);
        this.textarea_epd_docs = ta_epd_docs.element;
        // Операторы АМКР
        var row_setup_4 = new this.fe_ui.bs_row();
        var select_operation_amkr = new this.fe_ui.bs_select_multiple({
            id: 'operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {
                //if (value && Number(value) >= 0) {
                //    this.elements.input_number_consignee_code.val(value);
                //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                //} else {
                //    this.elements.input_number_consignee_code.val("");
                //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                //}
            }.bind(this),
        });
        row_setup_4.$row.append(select_operation_amkr.$element);
        this.select_operation_amkr = select_operation_amkr.element;
        // ограничение погрузки
        var row_setup_5 = new this.fe_ui.bs_row();
        var select_limiting = new this.fe_ui.bs_select_multiple({
            id: 'limiting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_limiting', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_limiting', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_5.$row.append(select_limiting.$element);
        this.select_limiting = select_limiting.element;
        // Собственник
        var row_setup_6 = new this.fe_ui.bs_row();
        var select_owners = new this.fe_ui.bs_select_multiple({
            id: 'owners',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_owners', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_owners', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_6.$row.append(select_owners.$element);
        this.select_owners = select_owners.element;
        // Станция отправления
        var row_setup_7 = new this.fe_ui.bs_row();
        var select_station_from = new this.fe_ui.bs_select_multiple({
            id: 'station_from',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_from', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_from', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_7.$row.append(select_station_from.$element);
        this.select_station_from = select_station_from.element;
        // Груз
        var row_setup_8 = new this.fe_ui.bs_row();
        var select_cargo = new this.fe_ui.bs_select_multiple({
            id: 'cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_8.$row.append(select_cargo.$element);
        this.select_cargo = select_cargo.element;
        // Сертификатные данные
        var row_setup_9 = new this.fe_ui.bs_row();
        var select_certification_data = new this.fe_ui.bs_select_multiple({
            id: 'certification_data',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_certification_data', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_certification_data', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_9.$row.append(select_certification_data.$element);
        this.select_certification_data = select_certification_data.element;
        // Код груза ПРИБ SAP
        var row_setup_10 = new this.fe_ui.bs_row();
        var select_cargo_sap = new this.fe_ui.bs_select_multiple({
            id: 'cargo_sap',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo_sap', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo_sap', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_10.$row.append(select_cargo_sap.$element);
        this.select_cargo_sap = select_cargo_sap.element;
        // Группа ПРИБ
        var row_setup_11 = new this.fe_ui.bs_row();
        var select_group_arrival = new this.fe_ui.bs_select_multiple({
            id: 'group_arrival',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_group_arrival', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_group_arrival', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_11.$row.append(select_group_arrival.$element);
        this.select_group_arrival = select_group_arrival.element;
        // Грузополучатель
        var row_setup_12 = new this.fe_ui.bs_row();
        var select_consignee = new this.fe_ui.bs_select_multiple({
            id: 'consignee',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_consignee', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_consignee', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_12.$row.append(select_consignee.$element);
        this.select_consignee = select_consignee.element;
        // Цех-получатель
        var row_setup_13 = new this.fe_ui.bs_row();
        var select_division = new this.fe_ui.bs_select_multiple({
            id: 'division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_13.$row.append(select_division.$element);
        this.select_division = select_division.element;
        // Цех-получатель
        var row_setup_14 = new this.fe_ui.bs_row();
        var select_genus = new this.fe_ui.bs_select_multiple({
            id: 'genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_14.$row.append(select_genus.$element);
        this.select_genus = select_genus.element;
        // Разметка по прибытию
        var row_setup_15 = new this.fe_ui.bs_row();
        var select_condition = new this.fe_ui.bs_select_multiple({
            id: 'condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_15.$row.append(select_condition.$element);
        this.select_condition = select_condition.element;
        // Плательщик ПРИБ
        var row_setup_16 = new this.fe_ui.bs_row();
        var select_payer_name = new this.fe_ui.bs_select_multiple({
            id: 'payer_name',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_payer_name', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_payer_name', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_16.$row.append(select_payer_name.$element);
        this.select_payer_name = select_payer_name.element;
        // Код плат. ПРИБ
        var row_setup_17 = new this.fe_ui.bs_row();
        var select_payer_code = new this.fe_ui.bs_select_multiple({
            id: 'payer_code',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_payer_code', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_payer_code', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_17.$row.append(select_payer_code.$element);
        this.select_payer_code = select_payer_code.element;
        // Станция примыкания
        var row_setup_18 = new this.fe_ui.bs_row();
        var select_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_18.$row.append(select_station_amkr.$element);
        this.select_station_amkr = select_station_amkr.element;
        //
        this.$form_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup_1.$row)
            .append(row_setup_2.$row)
            .append(row_setup_3.$row)
            .append(row_setup_4.$row)
            .append(row_setup_5.$row)
            .append(row_setup_6.$row)
            .append(row_setup_7.$row)
            .append(row_setup_8.$row)
            .append(row_setup_9.$row)
            .append(row_setup_10.$row)
            .append(row_setup_11.$row)
            .append(row_setup_12.$row)
            .append(row_setup_13.$row)
            .append(row_setup_14.$row)
            .append(row_setup_15.$row)
            .append(row_setup_16.$row)
            .append(row_setup_17.$row)
            .append(row_setup_18.$row)
            ;
        this.$setup_select.append(this.$form_setup_select);

        // Запускаем 6 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {
                        case 'arr-common-group': {
                            //if (this.table_group_sostav) {
                            //    this.table_group_sostav[0]. .columns.adjust().draw();
                            //}
                            $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust(); // table.columns.adjust().draw();
                            break;
                        };
                        case 'arr-common-detali': {
                            this.table_arr_common_detali.obj_t_report.columns.adjust().draw();
                            //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                            break;
                        };
                    };
                    //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust(); // table.columns.adjust().draw();
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);

        this.table_arr_common_detali = new TTDR('div#arr-common-report-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_arr_common_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_common_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        /*}.bind(this));*/
    };
    // Показать отчет  "Отчет по прибытию (общий)"
    view_td_report.prototype.view_report_2_1 = function (start, stop) {
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_adoption_cars', App.Langs));

        //var d = moment.utc(start).toISOString();
        //var d1 = moment(start).format(format_datetime);
        //var d2 = moment(start).toISOString();
        //var w = moment().utc().format();
        //var w1 = moment().format();
        // пустые операторы
        var where = {
            start: moment(start).format(format_datetime),
            stop: moment(stop).format(format_datetime),
            laden: false,
            accounting: false,
            client: false,
            not_client: false,
            paid: false,
            nums: null,
            nom_main_docs: null,
            nom_docs: null,
            id_operator: null,
            id_limiting: null,
            id_owner: null,
            code_stn_from: null,
            id_cargo: null,
            id_certification_data: null,
            supply_cargo_code: null,
            id_group_cargo: null,
            code_consignee: null,
            id_division: null,
            id_genus: null,
            id_condition: null,
            code_payer_arrival: null,
            code_payer_arrival_name: null,
            id_station_on: null,
        };
        // Загрузим данные
        this.load_select_report_2_1(where, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные
    view_td_report.prototype.load_select_report_2_1 = function (where, callback) {
        if (!where) {
            var cur_where = {
                start: moment(this.start).format(format_datetime),
                stop: moment(this.stop).format(format_datetime),
                laden: this.switch_laden.val(),
                accounting: this.switch_accounting.val(),
                client: this.switch_client.val(),
                not_client: this.switch_not_client.val(),
                paid: this.switch_paid.val(),
                nums: this.nums,
                nom_main_docs: this.main_epd_docs,
                nom_docs: this.epd_docs,
                id_operator: this.select_operation_amkr.val(),
                id_limiting: this.select_limiting.val(),
                id_owner: this.select_owners.val(),
                code_stn_from: this.select_station_from.val(),
                id_cargo: this.select_cargo.val(),
                id_certification_data: this.select_certification_data.val(),
                supply_cargo_code: this.select_cargo_sap.val(),
                id_group_cargo: this.select_group_arrival.val(),
                code_consignee: this.select_consignee.val(),
                id_division: this.select_division.val(),
                id_genus: this.select_genus.val(),
                id_condition: this.select_condition.val(),
                code_payer_arrival: this.select_payer_name.val(),
                code_payer_arrival_name: this.select_payer_code.val(),
                id_station_on: this.select_station_amkr.val(),
            };
        } else {
            cur_where = where;
        };
        this.ids_wsd.postReportAdoptionWagonOfWhere(cur_where, function (result_wagons) {
            this.wagons_adoption = result_wagons;
            // Обновим спсисок вагонов распарсиным ЭПД
            //wagons_get_epd_async.call(this, this.wagons_adoption, function () {
            // Проверим если это выбор толко по времени (первый выбор) тогда клонируем
            if (where) {
                this.clone_wagons_adoption = JSON.parse(JSON.stringify(this.wagons_adoption));
            }
            // Обработать и показать данные
            this.process_data_view_report_2_1(this.wagons_adoption, cur_where);
            // Выход
            if (typeof callback === 'function') {
                callback();
            }
            //}.bind(this));
        }.bind(this));
    };
    // Обработать и показать данные
    view_td_report.prototype.process_data_view_report_2_1 = function (wagons_adoption, where) {
        // Продолжим
        this.list_operators_wagons = [];
        this.list_limiting = [];
        this.list_owners = [];
        this.list_station_from = [];
        this.list_cargo = [];
        this.list_certification_data = [];
        this.list_cargo_sap = [];
        this.list_group_arrival = [];
        this.list_consignee = [];
        this.list_division = [];
        this.list_genus = [];
        this.list_condition = [];
        this.list_payer_name = [];
        this.list_payer_code = [];
        this.list_station_amkr = [];
        this.list_group_sostav = [];
        // выборка для списков отчета
        var count_load = 0;
        var sum_gruzp = 0;
        var sum_vesg = 0;
        var sum_vesg_reweighing = 0;

        $.each(wagons_adoption, function (key, value) {
            var res = list_groups_cargo.indexOf(value.arrival_uz_vagon_id_group);
            if (res === -1) {
                count_load++;
                sum_gruzp += value.arrival_uz_vagon_gruzp;
                sum_vesg += value.arrival_uz_vagon_vesg;
                sum_vesg_reweighing += value.arrival_uz_vagon_vesg_reweighing;
            }
            //
            var group_sostav = this.list_group_sostav.find(function (o) { return o.id === value.arrival_sostav_id }.bind(this));
            if (!group_sostav) {
                var sostav = wagons_adoption.filter(function (i) { return i.arrival_sostav_id === value.arrival_sostav_id }.bind(this));
                var sostav_cargo = [];
                $.each(sostav, function (i, el) {
                    var cargo = sostav_cargo.find(function (o) { return o.id_cargo === el.arrival_uz_vagon_id_cargo }.bind(this))
                    var sum_vesg = 0;
                    var sum_vesg_reweighing = 0;
                    if (!cargo) {
                        sum_vesg = 0;
                        sum_vesg_reweighing = 0;
                        var cargo_list = sostav.filter(function (i) { return i.arrival_uz_vagon_id_cargo === el.arrival_uz_vagon_id_cargo }.bind(this));
                        // Проссумируем 
                        $.each(cargo_list, function (i1, el1) {
                            sum_vesg += el1.arrival_uz_vagon_vesg ? el1.arrival_uz_vagon_vesg : 0;
                            sum_vesg_reweighing = + el1.arrival_uz_vagon_vesg_reweighing ? el1.arrival_uz_vagon_vesg_reweighing : 0;
                        }.bind(this));
                        sostav_cargo.push({ id_cargo: el.arrival_uz_vagon_id_cargo, cargo_name: el['arrival_uz_vagon_cargo_name_' + App.Lang], count: cargo_list.length, sum_vesg: sum_vesg, sum_vesg_reweighing: sum_vesg_reweighing });
                    };
                }.bind(this));
                this.list_group_sostav.push({ id: value.arrival_sostav_id, date_adoption: value.arrival_sostav_date_adoption, const_wagon: sostav.length, count_account_balance_wagon: sostav.filter(function (i) { return i.account_balance }.bind(this)).length, cargo_group: sostav_cargo });

            }
            // выборка для списков отчета
            var ow = this.list_operators_wagons.find(function (o) { return o.value === value.arrival_uz_vagon_arrival_wagons_rent_group_id_operator }.bind(this));
            if (!ow) {
                this.list_operators_wagons.push({ value: value.arrival_uz_vagon_arrival_wagons_rent_group_id_operator, text: value['arrival_uz_vagon_arrival_wagons_rent_operator_group_abbr_' + App.Lang] });
            }
            var lm = this.list_limiting.find(function (o) { return o.value === value.arrival_uz_vagon_arrival_wagons_rent_id_limiting }.bind(this));
            if (!lm) {
                this.list_limiting.push({ value: value.arrival_uz_vagon_arrival_wagons_rent_id_limiting, text: value['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang] });
            }
            var own = this.list_owners.find(function (o) { return o.value === value.arrival_uz_vagon_id_owner }.bind(this));
            if (!own) {
                this.list_owners.push({ value: value.arrival_uz_vagon_id_owner, text: value['arrival_uz_vagon_owner_wagon_abbr_' + App.Lang] });
            }
            var stfr = this.list_station_from.find(function (o) { return o.value === value.arrival_uz_document_code_stn_from }.bind(this));
            if (!stfr) {
                this.list_station_from.push({ value: value.arrival_uz_document_code_stn_from, text: value['arrival_uz_document_station_from_name_' + App.Lang] });
            }
            var crg = this.list_cargo.find(function (o) { return o.value === value.arrival_uz_vagon_id_cargo }.bind(this));
            if (!crg) {
                this.list_cargo.push({ value: value.arrival_uz_vagon_id_cargo, text: value['arrival_uz_vagon_cargo_name_' + App.Lang] });
            }
            var srtdt = this.list_certification_data.find(function (o) { return o.value === value.arrival_uz_vagon_id_certification_data }.bind(this));
            if (!srtdt) {
                this.list_certification_data.push({ value: value.arrival_uz_vagon_id_certification_data, text: value['arrival_uz_vagon_sertification_data_' + App.Lang] });
            }
            var crgsap = this.list_cargo_sap.find(function (o) { return o.value === value.sap_incoming_supply_cargo_code }.bind(this));
            if (!crgsap) {
                this.list_cargo_sap.push({ value: value.sap_incoming_supply_cargo_code, text: value.sap_incoming_supply_cargo_code });
            }
            var grpcrg = this.list_group_arrival.find(function (o) { return o.value === value.arrival_uz_vagon_id_group }.bind(this));
            if (!grpcrg) {
                this.list_group_arrival.push({ value: value.arrival_uz_vagon_id_group, text: value['arrival_uz_vagon_cargo_group_name_' + App.Lang] });
            }
            var cnsg = this.list_consignee.find(function (o) { return o.value === value.arrival_uz_document_code_consignee }.bind(this));
            if (!cnsg) {
                this.list_consignee.push({ value: value.arrival_uz_document_code_consignee, text: value.arrival_uz_document_name_consignee });
            }
            var dvsn = this.list_division.find(function (o) { return o.value === value.arrival_uz_vagon_id_division_on_amkr }.bind(this));
            if (!dvsn) {
                this.list_division.push({ value: value.arrival_uz_vagon_id_division_on_amkr, text: value['arrival_uz_vagon_division_abbr_' + App.Lang] });
            }
            var genus = this.list_genus.find(function (o) { return o.value === value.arrival_uz_vagon_id_genus }.bind(this));
            if (!genus) {
                this.list_genus.push({ value: value.arrival_uz_vagon_id_genus, text: value['arrival_uz_vagon_rod_abbr_' + App.Lang] });
            }
            var condition = this.list_condition.find(function (o) { return o.value === value.arrival_uz_vagon_id_condition }.bind(this));
            if (!condition) {
                this.list_condition.push({ value: value.arrival_uz_vagon_id_condition, text: value['arrival_uz_vagon_condition_abbr_' + App.Lang] });
            }
            var payer_name = this.list_payer_name.find(function (o) { return o.value === value.arrival_uz_document_code_payer_arrival }.bind(this));
            if (!payer_name) {
                this.list_payer_name.push({ value: value.arrival_uz_document_code_payer_arrival, text: value['arrival_uz_document_payer_arrival_name_' + App.Lang] });
            }
            var payer_code = this.list_payer_code.find(function (o) { return o.value === value.arrival_uz_document_code_payer_arrival }.bind(this));
            if (!payer_code) {
                this.list_payer_code.push({ value: value.arrival_uz_document_code_payer_arrival, text: value.arrival_uz_document_code_payer_arrival });
            }
            var station_amkr = this.list_station_amkr.find(function (o) { return o.value === value.arrival_sostav_id_station_on }.bind(this));
            if (!station_amkr) {
                this.list_station_amkr.push({ value: value.arrival_sostav_id_station_on, text: value['arrival_sostav_station_on_abbr_' + App.Lang] });
            }

        }.bind(this));
        // Отсортируем по алфавиту
        this.list_operators_wagons = this.sort_text(this.list_operators_wagons, "text");
        this.list_limiting = this.sort_text(this.list_limiting, "text");
        this.list_owners = this.sort_text(this.list_owners, "text");
        this.list_station_from = this.sort_text(this.list_station_from, "text");
        this.list_cargo = this.sort_text(this.list_cargo, "text");
        this.list_certification_data = this.sort_text(this.list_certification_data, "text");
        this.list_cargo_sap = this.sort_text(this.list_cargo_sap, "text");
        this.list_group_arrival = this.sort_text(this.list_group_arrival, "text");
        this.list_consignee = this.sort_text(this.list_consignee, "text");
        this.list_division = this.sort_text(this.list_division, "text");
        this.list_genus = this.sort_text(this.list_genus, "text");
        this.list_condition = this.sort_text(this.list_condition, "text");
        this.list_payer_name = this.sort_text(this.list_payer_name, "text");
        this.list_payer_code = this.sort_text(this.list_payer_code, "text");
        this.list_station_amkr = this.sort_text(this.list_station_amkr, "text");
        //
        this.view_table_group_sostav(this.list_group_sostav);

        this.table_arr_common_detali.view(wagons_adoption);

        // обновим Стат. нагр
        var avg_gruzp = 0;
        var avg_vesg = 0;
        var avg_vesg_reweighing = 0;
        if (count_load > 0) {
            avg_gruzp = sum_gruzp > 0 ? sum_gruzp / count_load : 0;
            avg_vesg = sum_vesg > 0 ? (sum_vesg / 1000) / count_load : 0;
            avg_vesg_reweighing = sum_vesg_reweighing > 0 ? sum_vesg_reweighing / count_load : 0;
        };

        $('td#count_wagon').text(count_load);
        $('td#avg_gruzp').text(avg_gruzp.toFixed(2));
        $('td#avg_vesg').text(avg_vesg.toFixed(2));
        $('td#avg_vesg_reweighing').text(avg_vesg_reweighing.toFixed(2));

        // обновление списков отчета
        if (!where || !where.id_operator || where.id_operator.length === 0) {
            this.select_operation_amkr.update(this.list_operators_wagons, -1);
        }
        if (!where || !where.id_limiting || where.id_limiting.length === 0) {
            this.select_limiting.update(this.list_limiting, -1);
        }
        if (!where || !where.id_owner || where.id_owner.length === 0) {
            this.select_owners.update(this.list_owners, -1);
        }
        if (!where || !where.code_stn_from || where.code_stn_from.length === 0) {
            this.select_station_from.update(this.list_station_from, -1);
        }
        if (!where || !where.id_cargo || where.id_cargo.length === 0) {
            this.select_cargo.update(this.list_cargo, -1);
        }
        if (!where || !where.id_certification_data || where.id_certification_data.length === 0) {
            this.select_certification_data.update(this.list_certification_data, -1);
        }
        if (!where || !where.supply_cargo_code || where.supply_cargo_code.length === 0) {
            this.select_cargo_sap.update(this.list_cargo_sap, -1);
        }
        if (!where || !where.id_group_cargo || where.id_group_cargo.length === 0) {
            this.select_group_arrival.update(this.list_group_arrival, -1);
        }
        if (!where || !where.code_consignee || where.code_consignee.length === 0) {
            this.select_consignee.update(this.list_consignee, -1);
        }
        if (!where || !where.id_division || where.id_division.length === 0) {
            this.select_division.update(this.list_division, -1);
        }
        if (!where || !where.id_genus || where.id_genus.length === 0) {
            this.select_genus.update(this.list_genus, -1);
        }
        if (!where || !where.id_condition || where.id_condition.length === 0) {
            this.select_condition.update(this.list_condition, -1);
        }
        if (!where || !where.code_payer_arrival || where.code_payer_arrival.length === 0) {
            this.select_payer_name.update(this.list_payer_name, -1);
        }
        if (!where || !where.code_payer_arrival_name || where.code_payer_arrival_name.length === 0) {
            this.select_payer_code.update(this.list_payer_code, -1);
        }
        if (!where || !where.id_station_on || where.id_station_on.length === 0) {
            this.select_station_amkr.update(this.list_station_amkr, -1);
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_2_1 = function () {
        this.out_clear();
        this.nums = null;
        var list_nums = this.textarea_wagon_nums.val();
        if (list_nums !== '') {
            this.nums = is_valid_nums(list_nums, this.settings.alert, false, true);
            if (!this.nums) return;
        };
        this.main_epd_docs = null;
        var list_main_epd_docs = this.textarea_main_epd_docs.val();
        if (list_main_epd_docs !== '') {
            this.main_epd_docs = is_valid_docs(list_main_epd_docs, this.settings.alert, true);
            if (!this.main_epd_docs) return;
        };

        this.epd_docs = null;
        var list_epd_docs = this.textarea_epd_docs.val();
        if (list_epd_docs !== '') {
            this.epd_docs = is_valid_docs(list_epd_docs, this.settings.alert, true);
            if (!this.epd_docs) return;
        };

        LockScreen(langView('vtdr_load_adoption_cars', App.Langs));
        this.load_select_report_2_1(null, function () {
            LockScreenOff();
        }.bind(this))
    };
    // Показать данные по группам
    view_td_report.prototype.view_table_group_sostav = function (list_group_sostav) {
        this.$div_group_sostav.empty();
        var table_group_sostav = new this.fe_ui.table({
            id: 'table-group-sostav',
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        this.table_group_sostav = table_group_sostav.$table;
        var $thead = $('<thead></thead>');
        var $tr_h = $('<tr></tr>');
        var $th1 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Дата приема'
        });
        var $th2 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Общее кол.'
        });
        var $th3 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Кол. уч. ваг.'
        });
        var $th4 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Род груза'
        });
        var $th5 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Вес по ЭПД, тн.'
        });
        var $th6 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Вес по перевеске, тн.'
        });
        var $th7 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Разница, тн.'
        });
        $thead.append($tr_h.append($th1).append($th2).append($th3).append($th4).append($th5).append($th6).append($th7));
        var $tbody = $('<tbody></tbody>');
        this.table_group_sostav.append($thead)
        //
        var const_wagon = 0;
        var count_account_balance_wagon = 0;
        var sum_vesg = 0;
        var sum_vesg_reweighing = 0;
        var sum_def_vesg = 0;
        if (list_group_sostav && list_group_sostav.length > 0) {
            $.each(list_group_sostav, function (i, el) {
                var $tr_d = $('<tr></tr>', {
                    id: el.id
                });
                $.each(el.cargo_group, function (i1, el1) {
                    if (i1 === 0) {
                        var $tr_d = $('<tr></tr>', {
                            id: el.id
                        });
                        var $td_date_adoption = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.date_adoption ? moment(el.date_adoption).format(format_datetime) : ''
                        });
                        var $td_const_wagon = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.const_wagon
                        });
                        var $td_count_account_balance_wagon = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.count_account_balance_wagon
                        });
                        var $td_cargo = $('<td></td>', {
                            class: 'dt-body-left',
                            text: el1.count + '-' + el1.cargo_name
                        });
                        var $td_sum_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg ? Number(el1.sum_vesg / 1000).toFixed(3) : 0.000
                        });
                        var $td_sum_vesg_reweighing = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg_reweighing ? Number(el1.sum_vesg_reweighing / 1000).toFixed(3) : 0.000
                        });
                        var $td_def_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg & el1.sum_vesg_reweighing ? Number(Number(el1.sum_vesg - el1.sum_vesg_reweighing) / 1000).toFixed(3) : 0.000
                        });
                        $tr_d.append($td_date_adoption).append($td_const_wagon).append($td_count_account_balance_wagon).append($td_cargo).append($td_sum_vesg).append($td_sum_vesg_reweighing).append($td_def_vesg);
                        $tbody.append($tr_d);
                        const_wagon += el.const_wagon;
                        count_account_balance_wagon += el.count_account_balance_wagon;
                    } else {
                        var $tr_d = $('<tr></tr>');
                        var $td_date_adoption = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_const_wagon = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_count_account_balance_wagon = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_cargo = $('<td></td>', {
                            class: 'dt-body-left',
                            text: el1.count + '-' + el1.cargo_name
                        });
                        var $td_sum_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg ? Number(el1.sum_vesg / 1000).toFixed(3) : 0.000
                        });
                        var $td_sum_vesg_reweighing = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg_reweighing ? Number(el1.sum_vesg_reweighing / 1000).toFixed(3) : 0.000
                        });
                        var $td_def_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg & el1.sum_vesg_reweighing ? Number(Number(el1.sum_vesg - el1.sum_vesg_reweighing) / 1000).toFixed(3) : 0.000
                        });
                        $tr_d.append($td_date_adoption).append($td_const_wagon).append($td_count_account_balance_wagon).append($td_cargo).append($td_sum_vesg).append($td_sum_vesg_reweighing).append($td_def_vesg);
                        $tbody.append($tr_d);
                    }
                    sum_vesg += el1.sum_vesg;
                    sum_vesg_reweighing += el1.sum_vesg_reweighing;
                    sum_def_vesg += (el1.sum_vesg & el1.sum_vesg_reweighing ? Number(el1.sum_vesg - el1.sum_vesg_reweighing) : 0);
                }.bind(this));
            }.bind(this));
        }
        this.table_group_sostav.append($tbody);
        var $tfoot = $('<tfoot></tfoot>');
        var $tr_f = $('<tr></tr>');
        var $tdf1 = $('<td></td>', {
            class: 'dt-right',
            text: 'ИТОГО:'
        });
        var $tdf2 = $('<td></td>', {
            class: 'dt-center',
            text: Number(const_wagon)
        });
        var $tdf3 = $('<td></td>', {
            class: 'dt-center',
            text: Number(count_account_balance_wagon)
        });
        var $tdf4 = $('<td></td>');
        var $tdf5 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg > 0 ? Number(sum_vesg / 1000).toFixed(3) : 0
        });
        var $tdf6 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg_reweighing > 0 ? Number(sum_vesg_reweighing).toFixed(3) : 0
        });
        var $tdf7 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg_reweighing > 0 ? Number(sum_def_vesg).toFixed(3) : 0
        });
        $tfoot.append($tr_f.append($tdf1).append($tdf2).append($tdf3).append($tdf4).append($tdf5).append($tdf6).append($tdf7));
        this.table_group_sostav.append($tfoot);
        this.$div_group_sostav.append(this.table_group_sostav);
        this.table_group_sostav.DataTable({
            "lengthMenu": null,
            "pageLength": null,
            "deferRender": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "info": true,
            select: false,
            "autoWidth": false,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            dom: 'Bfrtip',
            stateSave: false,
            buttons: {
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
        });
    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_2_1 = function () {
        if (this.switch_laden) { this.switch_laden.val(false); }
        if (this.switch_accounting) { this.switch_accounting.val(false); }
        if (this.switch_client) { this.switch_client.val(false); }
        if (this.switch_not_client) { this.switch_not_client.val(false); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.textarea_wagon_nums) { this.textarea_wagon_nums.val(''); }
        if (this.textarea_main_epd_docs) { this.textarea_main_epd_docs.val(''); }
        if (this.textarea_epd_docs) { this.textarea_epd_docs.val(''); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_limiting) { this.select_limiting.val(-1); }
        if (this.select_owners) { this.select_owners.val(-1); }
        if (this.select_station_from) { this.select_station_from.val(-1); }
        if (this.select_cargo) { this.select_cargo.val(-1); }
        if (this.select_certification_data) { this.select_certification_data.val(-1); }
        if (this.select_cargo_sap) { this.select_cargo_sap.val(-1); }
        if (this.select_group_arrival) { this.select_group_arrival.val(-1); }
        if (this.select_consignee) { this.select_consignee.val(-1); }
        if (this.select_division) { this.select_division.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_condition) { this.select_condition.val(-1); }
        if (this.select_payer_name) { this.select_payer_name.val(-1); }
        if (this.select_payer_code) { this.select_payer_code.val(-1); }
        if (this.select_station_amkr) { this.select_station_amkr.val(-1); }
        // Обработать и показать данные
        this.process_data_view_report_2_1(this.clone_wagons_adoption, null);
        LockScreenOff();
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_2_1 = function () {
        if (this.switch_laden) { this.switch_laden.val(false); }
        if (this.switch_accounting) { this.switch_accounting.val(false); }
        if (this.switch_client) { this.switch_client.val(false); }
        if (this.switch_not_client) { this.switch_not_client.val(false); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.textarea_wagon_nums) { this.textarea_wagon_nums.val(''); }
        if (this.textarea_main_epd_docs) { this.textarea_main_epd_docs.val(''); }
        if (this.textarea_epd_docs) { this.textarea_epd_docs.val(''); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_limiting) { this.select_limiting.val(-1); }
        if (this.select_owners) { this.select_owners.val(-1); }
        if (this.select_station_from) { this.select_station_from.val(-1); }
        if (this.select_cargo) { this.select_cargo.val(-1); }
        if (this.select_certification_data) { this.select_certification_data.val(-1); }
        if (this.select_cargo_sap) { this.select_cargo_sap.val(-1); }
        if (this.select_group_arrival) { this.select_group_arrival.val(-1); }
        if (this.select_consignee) { this.select_consignee.val(-1); }
        if (this.select_division) { this.select_division.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_condition) { this.select_condition.val(-1); }
        if (this.select_payer_name) { this.select_payer_name.val(-1); }
        if (this.select_payer_code) { this.select_payer_code.val(-1); }
        if (this.select_station_amkr) { this.select_station_amkr.val(-1); }
        if (this.textarea_epd_docs) {
            this.wagons_adoption = [];
            this.clone_wagons_adoption = [];
            this.process_data_view_report_2_1(this.clone_wagons_adoption, null);
            LockScreenOff();
        }
    };
    // Инициализировать отчет "Прибытие ИТОГ"
    view_td_report.prototype.init_report_3_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 3;        // номер отчета
        this.report_panel = 0;  // номер под-отчета
        this.chart_data = [];
        this.chart_data[0] = [];   // Данные для графиков
        this.chart_data[1] = [];   // Данные для графиков
        this.chart_data[2] = [];   // Данные для графиков
        this.chart_data[3] = [];   // Данные для графиков
        this.chart_data[4] = [];   // Данные для графиков
        this.chart_data[5] = [];   // Данные для графиков
        this.chart_data[6] = [];   // Данные для графиков
        this.chart_data[7] = [];   // Данные для графиков
        this.chart_data[8] = [];   // Данные для графиков

        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_3_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                     // Инициализация формы выбора периода отчетов
        //------
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_setup_detali = new this.fe_ui.fieldset({
            class: 'border-info mt-1',
            legend: null,
            class_legend: 'border-info',
        });
        this.$setup_detali_select = fieldset_setup_detali.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select).append(this.$setup_detali_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);
        // ---------------------------------------------------------------
        // Формируем форму выбора 
        var form_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_select = form_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_3_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_3_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        //
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_laden = new this.fe_ui.bs_switch({
            id: 'laden',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_laden', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_laden.$element);
        this.switch_laden = sw_laden.element;
        // Только с грузом
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_accounting = new this.fe_ui.bs_switch({
            id: 'accounting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_accounting', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_accounting.$element);
        this.switch_accounting = sw_accounting.element;
        // Клиентура 
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_client = new this.fe_ui.bs_switch({
            id: 'client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_client.$element);
        this.switch_client = sw_client.element;
        // Без учета клиентуры
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_not_client = new this.fe_ui.bs_switch({
            id: 'not_client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_not_client.$element);
        this.switch_not_client = sw_not_client.element;
        // Платные
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // Станция примыкания
        var row_setup3_1 = new this.fe_ui.bs_row();
        var select_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup3_1.$row.append(select_station_amkr.$element);
        this.select_station_amkr = select_station_amkr.element;
        //
        this.$form_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup3_1.$row)
            ;
        this.$setup_select.append(this.$form_setup_select);
        //----------------------------------------------------------------
        // Формируем форму выбора детально
        var form_setup_detali_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_detali_select = form_setup_detali_select.$form;
        // Оператор АМКР
        var row_setup_detali_operation_amkr = new this.fe_ui.bs_row();
        var select_detali_operation_amkr = new this.fe_ui.bs_select({
            id: 'detali_operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_cargo_operation_amkr();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_operation_amkr.$row.append(select_detali_operation_amkr.$element);
        this.row_setup_detali_operation_amkr = row_setup_detali_operation_amkr.$row;
        this.select_detali_operation_amkr = select_detali_operation_amkr.element;
        // Оператор АМКР - multiple
        var row_setup_detali_operation_amkr_multiple = new this.fe_ui.bs_row();
        var select_detali_operation_amkr_multiple = new this.fe_ui.bs_select_multiple({
            id: 'detali_operation_amkr_multiple',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_operation_to_arr();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_operation_amkr_multiple.$row.append(select_detali_operation_amkr_multiple.$element);
        this.row_setup_detali_operation_amkr_multiple = row_setup_detali_operation_amkr_multiple.$row;
        this.select_detali_operation_amkr_multiple = select_detali_operation_amkr_multiple.element;
        // Ограничение
        var row_setup_detali_limiting = new this.fe_ui.bs_row();
        var select_detali_limiting = new this.fe_ui.bs_select({
            id: 'detali_limiting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_limiting', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_limiting', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                if (this.report_panel === 0) {
                    this.view_filter_report_total_cargo_operation_amkr();
                }
                if (this.report_panel === 1) {
                    this.view_filter_report_total_operation_to_arr();
                }
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_limiting.$row.append(select_detali_limiting.$element);
        this.row_setup_detali_limiting = row_setup_detali_limiting.$row;
        this.select_detali_limiting = select_detali_limiting.element;
        // Груз прибытие
        var row_setup_detali_cargo = new this.fe_ui.bs_row();
        var select_detali_cargo = new this.fe_ui.bs_select({
            id: 'detali_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_cargo();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_cargo.$row.append(select_detali_cargo.$element);
        this.row_setup_detali_cargo = row_setup_detali_cargo.$row;
        this.select_detali_cargo = select_detali_cargo.element;
        // Сертификационные данные
        var row_setup_detali_certification_data = new this.fe_ui.bs_row();
        var select_detali_certification_data = new this.fe_ui.bs_select({
            id: 'detali_certification_data',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_certification_data', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_certification_data', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_cargo();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_certification_data.$row.append(select_detali_certification_data.$element);
        this.row_setup_detali_certification_data = row_setup_detali_certification_data.$row;
        this.select_detali_certification_data = select_detali_certification_data.element;
        // Группа ПРИБ
        var row_setup_detali_group_arrival = new this.fe_ui.bs_row();
        var select_detali_group_arrival = new this.fe_ui.bs_select({
            id: 'detali_group_arrival',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_group_arrival', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_group_arrival', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_group_cargo();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_group_arrival.$row.append(select_detali_group_arrival.$element);
        this.row_setup_detali_group_arrival = row_setup_detali_group_arrival.$row;
        this.select_detali_group_arrival = select_detali_group_arrival.element;
        // Род вагона
        var row_setup_detali_genus = new this.fe_ui.bs_row();
        var select_detali_genus = new this.fe_ui.bs_select({
            id: 'detali_genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_genus();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_genus.$row.append(select_detali_genus.$element);
        this.row_setup_detali_genus = row_setup_detali_genus.$row;
        this.select_detali_genus = select_detali_genus.element;
        // Код груза ПРИБ SAP
        var row_setup_detali_cargo_sap = new this.fe_ui.bs_row();
        var select_detali_cargo_sap = new this.fe_ui.bs_select({
            id: 'detali_cargo_sap',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_cargo_sap', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_cargo_sap', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: false,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {
                this.view_filter_report_total_cargo_sap();
            }.bind(this),
        });
        row_setup_detali_cargo_sap.$row.append(select_detali_cargo_sap.$element);
        this.row_setup_detali_cargo_sap = row_setup_detali_cargo_sap.$row;
        this.select_detali_cargo_sap = select_detali_cargo_sap.element;
        // Оператор АМКР - multiple
        var row_setup_detali_station_from_multiple = new this.fe_ui.bs_row();
        var select_detali_station_from_multiple = new this.fe_ui.bs_select_multiple({
            id: 'detali_station_from_multiple',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_from', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_from', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_station_from();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_station_from_multiple.$row.append(select_detali_station_from_multiple.$element);
        this.row_setup_detali_station_from_multiple = row_setup_detali_station_from_multiple.$row;
        this.select_detali_station_from_multiple = select_detali_station_from_multiple.element;
        // Цех АМКР - multiple
        var row_setup_detali_division_multiple = new this.fe_ui.bs_row();
        var select_detali_division_multiple = new this.fe_ui.bs_select_multiple({
            id: 'detali_division_multiple',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.view_filter_report_total_division();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_detali_division_multiple.$row.append(select_detali_division_multiple.$element);
        this.row_setup_detali_division_multiple = row_setup_detali_division_multiple.$row;
        this.select_detali_division_multiple = select_detali_division_multiple.element;
        // Добавим элементы на форму
        this.$form_setup_detali_select
            .append(row_setup_detali_operation_amkr.$row)
            .append(row_setup_detali_operation_amkr_multiple.$row)
            .append(row_setup_detali_limiting.$row)
            .append(row_setup_detali_cargo.$row)
            .append(row_setup_detali_certification_data.$row)
            .append(row_setup_detali_group_arrival.$row)
            .append(row_setup_detali_genus.$row)
            .append(row_setup_detali_cargo_sap.$row)
            .append(row_setup_detali_station_from_multiple.$row)
            .append(row_setup_detali_division_multiple.$row)
            ;
        this.$setup_detali_select.append(this.$form_setup_detali_select);

        //----------------------------------------------------------------
        // Создадим панель выбора отчета
        this.nav_tabs_arr_total = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-arr-total',
            class_nav: null,
            id_content: 'tab-arr-total-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'arr-total-cargo-operator-amkr',
                    aria_controls: 'arr-total-cargo-operator-amkr-tab',
                    label: langView('vtdr_label_tab_total_cargo_operator_amkr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-operator-to-arr',
                    aria_controls: 'arr-total-operator-to-arr-tab',
                    label: langView('vtdr_label_tab_total_operator_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-cargo-to-arr',
                    aria_controls: 'arr-total-cargo-to-arr-tab',
                    label: langView('vtdr_label_tab_total_cargo_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-group-cargo-to-arr',
                    aria_controls: 'arr-total-group-cargo-to-arr-tab',
                    label: langView('vtdr_label_tab_total_group_cargo_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-genus-to-arr',
                    aria_controls: 'arr-total-genus-to-arr-tab',
                    label: langView('vtdr_label_tab_total_genus_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-sap-to-arr',
                    aria_controls: 'arr-total-sap-to-arr-tab',
                    label: langView('vtdr_label_tab_total_sap_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-station-to-arr',
                    aria_controls: 'arr-total-station-to-arr-tab',
                    label: langView('vtdr_label_tab_total_station_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-division-to-arr',
                    aria_controls: 'arr-total-division-to-arr-tab',
                    label: langView('vtdr_label_tab_total_division_to_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'arr-total-to-gs',
                    aria_controls: 'arr-total-to-gs-tab',
                    label: langView('vtdr_label_tab_total_to_gs', App.Langs),
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        //----------------------------------------
        // Закладка Груз по Оператору АМКР
        this.init_panel_vertical_report(this.nav_tabs_arr_total, 'arr-total-cargo-operator-amkr-tab', 'adoption-cargo-operation-amkr');
        //-------------------------------------------
        // Закладка Отчет-Оператор по ПРИБ
        this.init_panel_horizontal_report(this.nav_tabs_arr_total, 'arr-total-operator-to-arr-tab', 'adoption-operator-to-arr', 5, 7);
        //----------------------------------------
        // Закладка Груз ПРИБ
        this.init_panel_vertical_report(this.nav_tabs_arr_total, 'arr-total-cargo-to-arr-tab', 'adoption-cargo-to-arr');
        //----------------------------------------
        // Закладка Группа ПРИБ
        this.init_panel_vertical_report(this.nav_tabs_arr_total, 'arr-total-group-cargo-to-arr-tab', 'adoption-group-cargo-to-arr');
        //----------------------------------------
        // Закладка Род вагона ПРИБ
        this.init_panel_horizontal_report(this.nav_tabs_arr_total, 'arr-total-genus-to-arr-tab', 'adoption-genus-to-arr', 5, 7);
        //----------------------------------------
        // Закладка Груз ПРИБ SAP
        this.init_panel_vertical_report(this.nav_tabs_arr_total, 'arr-total-sap-to-arr-tab', 'adoption-sap-to-arr');
        //----------------------------------------
        // Закладка Станция ПРИБ
        this.init_panel_vertical_report(this.nav_tabs_arr_total, 'arr-total-station-to-arr-tab', 'adoption-station-to-arr');
        //----------------------------------------
        // Закладка Цех-грузополучатель
        this.init_panel_vertical_report(this.nav_tabs_arr_total, 'arr-total-division-to-arr-tab', 'adoption-division-to-arr');
        //----------------------------------------
        // Закладка Отчет для ГС
        this.init_panel_table_report(this.nav_tabs_arr_total, 'arr-total-to-gs-tab', 'adoption-to-gs');

        // Дабавим закладку на форму
        this.$table_view.append(this.nav_tabs_arr_total.$ul).append(this.nav_tabs_arr_total.$content);
        //-----------------------------------------------------------------
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем 18 процесса инициализации (паралельно)
        var process = 17;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;
                this.view_setup_detali_report_3_1(this.report_panel);
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    switch (event.target.id) {
                        case 'arr-total-cargo-operator-amkr': {
                            this.report_panel = 0;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_cargo_operation_amkr();
                            break;
                        };
                        case 'arr-total-operator-to-arr': {
                            this.report_panel = 1;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            setTimeout(function () {
                                this.view_chart_total_operation_to_arr();
                            }.bind(this), 500);
                            break;
                        };
                        case 'arr-total-cargo-to-arr': {
                            this.report_panel = 2;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_cargo();
                            break;
                        };
                        case 'arr-total-group-cargo-to-arr': {
                            this.report_panel = 3;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_group_cargo();
                            break;
                        };
                        case 'arr-total-genus-to-arr': {
                            this.report_panel = 4;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_genus();
                            break;
                        };
                        case 'arr-total-sap-to-arr': {
                            this.report_panel = 5;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_cargo_sap();
                            break;
                        };
                        case 'arr-total-station-to-arr': {
                            this.report_panel = 6;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_station_from();
                            break;
                        };
                        case 'arr-total-division-to-arr': {
                            this.report_panel = 7;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            setTimeout(function () {
                                this.view_chart_total_division_from();
                            }.bind(this), 500);
                            //this.view_chart_total_division_from();
                            break;
                        };
                        case 'arr-total-to-gs': {
                            this.report_panel = 8;
                            this.view_setup_detali_report_3_1(this.report_panel);
                            this.view_chart_total_gs();
                            break;
                        };
                    };
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        //-----------------------------------------------
        // Таблица-Груз по Оператору АМКР
        this.table_total_cargo_operation_amkr = new TTDR('div#adoption-cargo-operation-amkr');         // Создадим экземпляр
        this.table_total_cargo_operation_amkr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_cargo_operation_amkr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Гистограмма с накоплением
        this.chart_total_cargo_operation_amkr = new CAM('div#adoption-cargo-operation-amkr-chart');         // Создадим экземпляр
        this.chart_total_cargo_operation_amkr.init({
            alert: null,
            type_chart: 'stacked_column_chart_percent',     //stacked_column_chart_percent
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Оператор по ПРИБ
        this.table_total_operation_to_arr = new TTDR('div#adoption-operator-to-arr');         // Создадим экземпляр
        this.table_total_operation_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_operator_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Гистограмма с накоплением
        this.chart_total_operation_to_arr = new CAM('div#adoption-operator-to-arr-chart');         // Создадим экземпляр
        this.chart_total_operation_to_arr.init({
            alert: null,
            type_chart: 'simple_treemap',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Груз ПРИБ
        this.table_total_cargo_to_arr = new TTDR('div#adoption-cargo-to-arr');         // Создадим экземпляр
        this.table_total_cargo_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_cargo_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Столбец с повернутыми меткам
        this.chart_total_cargo_to_arr = new CAM('div#adoption-cargo-to-arr-chart');         // Создадим экземпляр
        this.chart_total_cargo_to_arr.init({
            alert: null,
            type_chart: 'column_with_rotated_labels',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Группа ПРИБ
        this.table_total_group_cargo_to_arr = new TTDR('div#adoption-group-cargo-to-arr');         // Создадим экземпляр
        this.table_total_group_cargo_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_group_cargo_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Круговая диаграмма
        this.chart_total_group_cargo_to_arr = new CAM('div#adoption-group-cargo-to-arr-chart');         // Создадим экземпляр
        this.chart_total_group_cargo_to_arr.init({
            alert: null,
            type_chart: 'pie_chart',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Род вагона ПРИБ  
        this.table_total_genus_to_arr = new TTDR('div#adoption-genus-to-arr');         // Создадим экземпляр
        this.table_total_genus_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_genus_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Круговая диаграмма
        this.chart_total_genus_to_arr = new CAM('div#adoption-genus-to-arr-chart');         // Создадим экземпляр
        this.chart_total_genus_to_arr.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //pie_chart
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Груз ПРИБ SAP
        this.table_total_cargo_sap_to_arr = new TTDR('div#adoption-sap-to-arr');         // Создадим экземпляр
        this.table_total_cargo_sap_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_cargo_sap_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Столбец с повернутыми меткам
        this.chart_total_cargo_sap_to_arr = new CAM('div#adoption-sap-to-arr-chart');         // Создадим экземпляр
        this.chart_total_cargo_sap_to_arr.init({
            alert: null,
            type_chart: 'column_with_rotated_labels',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Станция ПРИБ 
        this.table_total_station_to_arr = new TTDR('div#adoption-station-to-arr');         // Создадим экземпляр
        this.table_total_station_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_station_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: Столбец с повернутыми меткам
        this.chart_total_station_to_arr = new CAM('div#adoption-station-to-arr-chart');         // Создадим экземпляр
        this.chart_total_station_to_arr.init({
            alert: null,
            type_chart: 'column_with_rotated_labels',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Цех-грузополучатель
        this.table_total_division_to_arr = new TTDR('div#adoption-division-to-arr');         // Создадим экземпляр
        this.table_total_division_to_arr.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_division_to_arr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: radial_histogram
        this.chart_total_division_to_arr = new CAM('div#adoption-division-to-arr-chart');         // Создадим экземпляр
        this.chart_total_division_to_arr.init({
            alert: null,
            type_chart: 'column_with_rotated_labels',     //radial_histogram
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Отчет для ГС
        this.table_total_adoption_to_gs = new TTDR('div#adoption-to-gs');         // Создадим экземпляр
        this.table_total_adoption_to_gs.init({
            alert: null,
            detali_table: true,
            type_report: 'adoption_to_gs',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        //// Инициализация модуля графиков тип: Круговая диаграмма
        //this.chart_total_adoption_to_gs = new CAM('div#adoption-to-gs-chart');         // Создадим экземпляр
        //this.chart_total_adoption_to_gs.init({
        //    alert: null,
        //    type_chart: 'pie_chart',     //
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //});
    };
    // Показать отчет  "Отчет по прибытию (общий)"
    view_td_report.prototype.view_report_3_1 = function (start, stop) {
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_select_cars', App.Langs));
        // пустые операторы
        var where = {
            start: moment(start).format(format_datetime),
            stop: moment(stop).format(format_datetime),
            laden: false,
            accounting: false,
            client: false,
            not_client: false,
            paid: false,
            id_station_on: null,
        };
        // Загрузим данные
        this.load_select_report_3_1(where, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные с учетом параметров выбора
    view_td_report.prototype.load_select_report_3_1 = function (where, callback) {
        if (!where) {
            var cur_where = {
                start: moment(this.start).format(format_datetime),
                stop: moment(this.stop).format(format_datetime),
                laden: this.switch_laden.val(),
                accounting: this.switch_accounting.val(),
                client: this.switch_client.val(),
                not_client: this.switch_not_client.val(),
                paid: this.switch_paid.val(),
                id_station_on: this.select_station_amkr.val(),
            };
        } else {
            cur_where = where;
        };
        // Выборка
        this.ids_wsd.postReportAdoptionWagonOfWhere(cur_where, function (result_wagons) {
            this.wagons_adoption = result_wagons;

            // Проверим если это выбор толко по времени (первый выбор) тогда клонируем
            if (where) {
                this.clone_wagons_adoption = JSON.parse(JSON.stringify(this.wagons_adoption));
            }
            // Обработать и показать данные
            this.process_data_view_report_3_1(this.wagons_adoption, cur_where);

            // Выход
            if (typeof callback === 'function') {
                callback();
            }

            //// Обновим спсисок вагонов распарсиным ЭПД
            //wagons_get_epd_async.call(this, this.wagons_adoption, function () {

            //}.bind(this));
        }.bind(this));
    };
    // Обработка данных для отчетов
    view_td_report.prototype.process_data_select_report_3_1 = function (data, callback) {
        this.list_station_amkr = [];
        this.list_operation_amkr = [];
        this.list_limiting = [];
        this.list_cargo = [];
        this.list_certification_data = [];
        this.list_group_arrival = [];
        this.list_genus = [];
        this.list_cargo_sap = [];
        this.list_station_from = [];
        this.list_division = [];
        // Выбор по умолчанию
        this.value_station_amkr = -1;
        this.value_operation_amkr = -1;
        this.value_operation_amkr_multiple = [];
        this.value_limiting0 = -1;
        this.value_limiting1 = -1;
        this.value_cargo = -1;
        this.value_certification_data = -1;
        this.value_group_arrival = -1;
        this.value_genus = -1;
        this.value_cargo_sap = "-1";
        this.value_station_from = [];
        this.value_division = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        $.each(data, function (key, el_wag) {
            // выборка для списков отчета
            var ow = this.list_operation_amkr.find(function (o) { return o.value === el_wag.arrival_uz_vagon_arrival_wagons_rent_group_id_operator }.bind(this));
            if (!ow) {
                this.list_operation_amkr.push({ value: el_wag.arrival_uz_vagon_arrival_wagons_rent_group_id_operator, text: el_wag['arrival_uz_vagon_arrival_wagons_rent_operator_group_abbr_' + App.Lang] });
            }
            var lm = this.list_limiting.find(function (o) { return o.value === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting }.bind(this));
            if (!lm) {
                this.list_limiting.push({ value: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting, text: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang] });
            }
            var station_amkr = this.list_station_amkr.find(function (o) { return o.value === el_wag.arrival_sostav_id_station_on }.bind(this));
            if (!station_amkr) {
                this.list_station_amkr.push({ value: el_wag.arrival_sostav_id_station_on, text: el_wag['arrival_sostav_station_on_abbr_' + App.Lang] });
            }
            var cargo = this.list_cargo.find(function (o) { return o.value === el_wag.arrival_uz_vagon_id_cargo }.bind(this));
            if (!cargo) {
                this.list_cargo.push({ value: el_wag.arrival_uz_vagon_id_cargo, text: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang] });
            }
            var cd = this.list_certification_data.find(function (o) { return o.value === el_wag.arrival_uz_vagon_id_certification_data }.bind(this));
            if (!cd) {
                this.list_certification_data.push({ value: el_wag.arrival_uz_vagon_id_certification_data, text: el_wag['arrival_uz_vagon_sertification_data_' + App.Lang] });
            }
            var group_arrival = this.list_group_arrival.find(function (o) { return o.value === el_wag.arrival_uz_vagon_id_group }.bind(this));
            if (!group_arrival) {
                this.list_group_arrival.push({ value: el_wag.arrival_uz_vagon_id_group, text: el_wag['arrival_uz_vagon_cargo_group_name_' + App.Lang] });
            }
            var genus = this.list_genus.find(function (o) { return o.value === el_wag.arrival_uz_vagon_id_genus }.bind(this));
            if (!genus) {
                this.list_genus.push({ value: el_wag.arrival_uz_vagon_id_genus, text: el_wag['arrival_uz_vagon_rod_abbr_' + App.Lang] });
            }
            var cargo_sap = this.list_cargo_sap.find(function (o) { return o.value === el_wag.sap_incoming_supply_cargo_code }.bind(this));
            if (!cargo_sap) {
                this.list_cargo_sap.push({ value: el_wag.sap_incoming_supply_cargo_code, text: el_wag.sap_incoming_supply_cargo_name });
            }
            var station_from = this.list_station_from.find(function (o) { return o.value === el_wag.arrival_uz_document_code_stn_from }.bind(this));
            if (!station_from) {
                this.list_station_from.push({ value: el_wag.arrival_uz_document_code_stn_from, text: el_wag['arrival_uz_document_station_from_name_' + App.Lang] });
            }
            var division = this.list_division.find(function (o) { return o.value === el_wag.arrival_uz_vagon_id_division_on_amkr }.bind(this));
            if (!division) {
                this.list_division.push({ value: el_wag.arrival_uz_vagon_id_division_on_amkr, text: el_wag['arrival_uz_vagon_division_abbr_' + App.Lang] });
            }
        }.bind(this));
        // Отсортируем по алфавиту
        this.list_station_amkr = this.sort_text(this.list_station_amkr, "text");
        this.list_operation_amkr = this.sort_text(this.list_operation_amkr, "text");
        this.list_limiting = this.sort_text(this.list_limiting, "text");
        this.list_cargo = this.sort_text(this.list_cargo, "text");
        this.list_certification_data = this.sort_text(this.list_certification_data, "text");
        this.list_group_arrival = this.sort_text(this.list_group_arrival, "text");
        this.list_genus = this.sort_text(this.list_genus, "text");
        this.list_cargo_sap = this.sort_text(this.list_cargo_sap, "text");
        this.list_station_from = this.sort_text(this.list_station_from, "text");
        this.list_division = this.sort_text(this.list_division, "text");

        if (typeof callback === 'function') {
            callback();
        }
    };
    view_td_report.prototype.process_data_report_3_1 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.arrival_uz_vagon_arrival_wagons_rent_group_id_operator &&
                    o.id_limiting === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting &&
                    o.id_cargo === el_wag.arrival_uz_vagon_id_cargo
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_operator: el_wag.arrival_uz_vagon_arrival_wagons_rent_group_id_operator,
                    operators: el_wag['arrival_uz_vagon_arrival_wagons_rent_group_operators_' + App.Lang],
                    operator_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_operator_group_abbr_' + App.Lang],
                    id_limiting: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting,
                    limiting_name: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang],
                    limiting_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang],
                    id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                    cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.arrival_uz_vagon_vesg ? op.sum_vesg + el_wag.arrival_uz_vagon_vesg : op.sum_vesg;
                op.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? op.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : op.sum_vesg_reweighing;
                op.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? op.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : op.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_2 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        var sum_count = data.length;
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.arrival_uz_vagon_arrival_wagons_rent_group_id_operator &&
                    o.id_limiting === el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_operator: el_wag.arrival_uz_vagon_arrival_wagons_rent_group_id_operator,
                    operators: el_wag['arrival_uz_vagon_arrival_wagons_rent_group_operators_' + App.Lang],
                    operator_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_operator_group_abbr_' + App.Lang],
                    id_limiting: el_wag.arrival_uz_vagon_arrival_wagons_rent_id_limiting,
                    limiting_name: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_name_' + App.Lang],
                    limiting_abbr: el_wag['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang],
                    count_wagon: 1,
                    perent_wagon: Number(100 / sum_count).toFixed(2),
                    //count_persent: 0
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.perent_wagon = Number((op.count_wagon * 100) / sum_count).toFixed(2);
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_3 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз по Оператору АМКР
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.id_group === el_wag.arrival_uz_vagon_id_group &&
                    o.id_cargo === el_wag.arrival_uz_vagon_id_cargo &&
                    o.id_certification_data === el_wag.arrival_uz_vagon_id_certification_data
            }.bind(this));
            if (!obj) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_group: el_wag.arrival_uz_vagon_id_group,
                    group_name: el_wag['arrival_uz_vagon_cargo_group_name_' + App.Lang],
                    id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                    cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                    id_certification_data: el_wag.arrival_uz_vagon_id_certification_data,
                    certification_data: el_wag['arrival_uz_vagon_sertification_data_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                });
            } else {
                obj.count_wagon = obj.count_wagon + 1;
                obj.sum_vesg = el_wag.arrival_uz_vagon_vesg ? obj.sum_vesg + el_wag.arrival_uz_vagon_vesg : obj.sum_vesg;
                obj.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : obj.sum_vesg_reweighing;
                obj.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : obj.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_4 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Группа ПРИБ.
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.id_group === el_wag.arrival_uz_vagon_id_group
            }.bind(this));
            if (!obj) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_group: el_wag.arrival_uz_vagon_id_group,
                    group_name: el_wag['arrival_uz_vagon_cargo_group_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                });
            } else {
                obj.count_wagon = obj.count_wagon + 1;
                obj.sum_vesg = el_wag.arrival_uz_vagon_vesg ? obj.sum_vesg + el_wag.arrival_uz_vagon_vesg : obj.sum_vesg;
                obj.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : obj.sum_vesg_reweighing;
                obj.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : obj.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_5 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Род вагона ПРИБ.
        var sum_count = data.length;
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.id_genus === el_wag.arrival_uz_vagon_id_genus
            }.bind(this));
            if (!obj) {
                //sum_count++;
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_genus: el_wag.arrival_uz_vagon_id_genus,
                    rod_abbr: el_wag['arrival_uz_vagon_rod_abbr_' + App.Lang],
                    count_wagon: 1,
                    perent_wagon: Number(100 / sum_count).toFixed(2),
                });
            } else {
                //sum_count++;
                obj.count_wagon = obj.count_wagon + 1;
                obj.perent_wagon = Number((obj.count_wagon * 100) / sum_count).toFixed(2);
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_6 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз ПРИБ SAP.
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.sap_cargo_code === el_wag.sap_incoming_supply_cargo_code
            }.bind(this));
            if (!obj) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    sap_cargo_code: el_wag.sap_incoming_supply_cargo_code,
                    sap_cargo_name: el_wag.sap_incoming_supply_cargo_name,
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,

                });
            } else {
                obj.count_wagon = obj.count_wagon + 1;
                obj.sum_vesg = el_wag.arrival_uz_vagon_vesg ? obj.sum_vesg + el_wag.arrival_uz_vagon_vesg : obj.sum_vesg;
                obj.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : obj.sum_vesg_reweighing;
                obj.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : obj.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_7 = function (data, callback) {
        var list_result = [];
        // выборка для списков Отчет-Груз ПРИБ SAP.
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.code_stn_from === el_wag.arrival_uz_document_code_stn_from &&
                    o.id_cargo === el_wag.arrival_uz_vagon_id_cargo
            }.bind(this));
            if (!obj) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    code_stn_from: el_wag.arrival_uz_document_code_stn_from,
                    station_from_name: el_wag['arrival_uz_document_station_from_name_' + App.Lang],
                    id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                    cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,

                });
            } else {
                obj.count_wagon = obj.count_wagon + 1;
                obj.sum_vesg = el_wag.arrival_uz_vagon_vesg ? obj.sum_vesg + el_wag.arrival_uz_vagon_vesg : obj.sum_vesg;
                obj.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : obj.sum_vesg_reweighing;
                obj.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : obj.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_8 = function (data, callback) {
        var list_result = [];
        // выборка для списков Цех-грузополучатель.
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.id_division === el_wag.arrival_uz_vagon_id_division_on_amkr &&
                    o.id_cargo === el_wag.arrival_uz_vagon_id_cargo &&
                    o.id_certification_data === el_wag.arrival_uz_vagon_id_certification_data
            }.bind(this));
            if (!obj) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_division: el_wag.arrival_uz_vagon_id_division_on_amkr,
                    division_abbr: el_wag['arrival_uz_vagon_division_abbr_' + App.Lang],
                    id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                    cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                    id_certification_data: el_wag.arrival_uz_vagon_id_certification_data,
                    certification_data: el_wag['arrival_uz_vagon_sertification_data_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,

                });
            } else {
                obj.count_wagon = obj.count_wagon + 1;
                obj.sum_vesg = el_wag.arrival_uz_vagon_vesg ? obj.sum_vesg + el_wag.arrival_uz_vagon_vesg : obj.sum_vesg;
                obj.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : obj.sum_vesg_reweighing;
                obj.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : obj.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    view_td_report.prototype.process_data_report_3_9 = function (data, callback) {
        var list_result = [];
        // выборка для списков Цех-грузополучатель.
        $.each(data, function (key, el_wag) {
            var obj = list_result.find(function (o) {
                return o.id_cargo === el_wag.arrival_uz_vagon_id_cargo &&
                    o.id_station_on === el_wag.arrival_sostav_id_station_on &&
                    o.id_division === el_wag.arrival_uz_vagon_id_division_on_amkr
            }.bind(this));
            if (!obj) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                    cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                    id_station_on: el_wag.arrival_sostav_id_station_on,
                    station_on_name: el_wag['arrival_sostav_station_on_name_' + App.Lang],
                    id_division: el_wag.arrival_uz_vagon_id_division_on_amkr,
                    division_abbr: el_wag['arrival_uz_vagon_division_abbr_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.arrival_uz_vagon_vesg ? el_wag.arrival_uz_vagon_vesg : 0,
                    sum_vesg_reweighing: el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                    sum_vesg_deff: el_wag.arrival_uz_vagon_arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing : 0,
                });
            } else {
                obj.count_wagon = obj.count_wagon + 1;
                obj.sum_vesg = el_wag.arrival_uz_vagon_vesg ? obj.sum_vesg + el_wag.arrival_uz_vagon_vesg : obj.sum_vesg;
                obj.sum_vesg_reweighing = el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_reweighing + el_wag.arrival_uz_vagon_vesg_reweighing : obj.sum_vesg_reweighing;
                obj.sum_vesg_deff = el_wag.arrival_uz_vagon_vesg && el_wag.arrival_uz_vagon_vesg_reweighing ? obj.sum_vesg_deff + (el_wag.arrival_uz_vagon_vesg - el_wag.arrival_uz_vagon_vesg_reweighing) : obj.sum_vesg_deff;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    // Обработать и отображение данных на экране
    view_td_report.prototype.process_data_view_report_3_1 = function (wagons_adoption, where) {
        // Продолжим
        this.total_cargo_operation_amkr = [];       // список Груз по Оператору АМКР
        this.total_operation_amkr = [];             // список Оператор по ПРИБ
        this.total_cargo = [];                      // список Оператор по ПРИБ
        this.total_group_cargo = [];                // список Группы ПРИБ
        this.total_genus = [];                      // список Род вагона ПРИБ  
        this.total_cargo_sap = [];                  // список Груз ПРИБ SAP
        this.total_station_from = [];               // список Станция ПРИБ 
        this.total_division = [];                   // список Цех-грузополучатель
        this.total_gs = [];                         // список Отчет для ГС
        // Запускаем 10 процесса инициализации (паралельно)
        var process = 10;
        // Выход из инициализации
        var out_process_data = function (process) {
            if (process === 0) {
                // Обновим элементы выбора
                this.select_detali_operation_amkr.update(this.list_operation_amkr, this.value_operation_amkr);
                this.select_detali_operation_amkr_multiple.update(this.list_operation_amkr, this.value_operation_amkr_multiple);
                this.select_detali_limiting.update(this.list_limiting, this.value_limiting0);
                this.select_detali_cargo.update(this.list_cargo, this.value_cargo);
                this.select_detali_certification_data.update(this.list_certification_data, this.value_certification_data);
                this.select_detali_group_arrival.update(this.list_group_arrival, this.value_group_arrival);
                this.select_detali_genus.update(this.list_genus, this.value_genus);
                this.select_detali_cargo_sap.update(this.list_cargo_sap, this.value_cargo_sap);
                this.select_detali_station_from_multiple.update(this.list_station_from, this.value_station_from);
                this.select_detali_division_multiple.update(this.list_division, this.value_division);
                // Обновим спсисок станции "Внешнее прибытие"
                if (!where || !where.id_station_on || where.id_station_on.length === 0) {
                    this.select_station_amkr.update(this.list_station_amkr, -1);
                };
                // Отобразить данные в таблице Груз по Оператору АМКР
                this.view_filter_report_total_cargo_operation_amkr();
                // Отобразить данные в таблице Оператор по ПРИБ
                this.view_filter_report_total_operation_to_arr();
                // Отобразить данные в таблице  Груз ПРИБ
                this.view_filter_report_total_cargo();
                // Отобразить данные в таблице группы ПРИБ
                this.view_filter_report_total_group_cargo();
                // Отобразить данные в таблице Род вагона ПРИБ
                this.view_filter_report_total_genus();
                // Отобразить данные в таблице Груз ПРИБ SAP
                this.view_filter_report_total_cargo_sap();
                // Отобразить данные в таблице Станция ПРИБ
                this.view_filter_report_total_station_from();
                // Отобразить данные в таблице Цех-грузополучатель
                this.view_filter_report_total_division();
                // Отобразить данные в таблице Отчет для ГС
                this.view_filter_report_total_gs();
            }
        }.bind(this);
        this.process_data_select_report_3_1(wagons_adoption, function (result) {
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_1(wagons_adoption, function (result) {
            this.total_cargo_operation_amkr = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_2(wagons_adoption, function (result) {
            this.total_operation_amkr = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_3(wagons_adoption, function (result) {
            this.total_cargo = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_4(wagons_adoption, function (result) {
            this.total_group_cargo = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_5(wagons_adoption, function (result) {
            this.total_genus = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_6(wagons_adoption, function (result) {
            this.total_cargo_sap = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_7(wagons_adoption, function (result) {
            this.total_station_from = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_8(wagons_adoption, function (result) {
            this.total_division = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_3_9(wagons_adoption, function (result) {
            this.total_gs = result;
            process--;
            out_process_data(process);
        }.bind(this));
    };
    // Выполнить фильтрацию и вывести данные по отчету "Груз по Оператору АМКР"
    view_td_report.prototype.view_filter_report_total_cargo_operation_amkr = function () {
        if (this.total_cargo_operation_amkr) {
            this.value_operation_amkr = Number(this.select_detali_operation_amkr.val());
            this.value_limiting0 = Number(this.select_detali_limiting.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_cargo_operation_amkr));
            // Применим фильтр
            if (this.value_operation_amkr > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_operator === (this.value_operation_amkr > 0 ? this.value_operation_amkr : null);
                }.bind(this));
            }
            if (this.value_limiting0 > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_limiting === (this.value_limiting0 > 0 ? this.value_limiting0 : null);
                }.bind(this));
            }
            // Отобразим
            this.table_total_cargo_operation_amkr.view(list_view);

            var data = [];
            $.each(list_view, function (key, element) {
                data.push({ "group": element.operator_abbr, "name": element.cargo_name, "fieldName": element.id_cargo, "value": element.count_wagon });
            }.bind(this));

            this.chart_data[0] = data;
            //var data = [
            //    {
            //        "group": "АМКР",
            //        "name": "Концентрат",
            //        "fieldName": "1",
            //        "value": 100

            //    },
            //    {
            //        "group": "АМКР",
            //        "name": "Порожняк",
            //        "fieldName": "2",
            //        "value": 50
            //    },
            //    {
            //        "group": "ЦТД",
            //        "name": "Порожняк",
            //        "fieldName": "2",
            //        "value": 67
            //    },
            //    {
            //        "group": "ЦТД",
            //        "name": "Кокс",
            //        "fieldName": "3",
            //        "value": 85
            //    },
            //    {
            //        "group": "ООО",
            //        "name": "Кокс",
            //        "fieldName": "3",
            //        "value": 13
            //    },
            //    {
            //        "group": "ООО",
            //        "name": "Концентрат",
            //        "fieldName": "1",
            //        "value": 35
            //    },
            //    {
            //        "group": "ООО",
            //        "name": "Порожняк",
            //        "fieldName": "2",
            //        "value": 8
            //    },
            //]

            this.view_chart_total_cargo_operation_amkr();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Груз по Оператору АМКР" 
    view_td_report.prototype.view_chart_total_cargo_operation_amkr = function () {
        if (this.report_panel === 0 && this.chart_data) {
            this.chart_total_cargo_operation_amkr.view(this.chart_data[0]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Оператор по ПРИБ"
    view_td_report.prototype.view_filter_report_total_operation_to_arr = function () {
        if (this.total_operation_amkr) {
            this.value_operation_amkr_multiple = this.select_detali_operation_amkr_multiple.val();
            this.value_limiting1 = Number(this.select_detali_limiting.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_operation_amkr));
            // Применим фильтр
            if (this.value_operation_amkr_multiple && this.value_operation_amkr_multiple.length > 0) {
                list_view = list_view.filter(function (i) {
                    var op = this.value_operation_amkr_multiple.find(function (o) {
                        if (o !== "") {
                            return Number(o) === i.id_operator;
                        } else {
                            return i.id_operator === null;
                        }
                    }.bind(this));
                    return op !== undefined ? true : false;
                }.bind(this));
            };
            if (this.value_limiting1 > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_limiting === (this.value_limiting1 > 0 ? this.value_limiting : null);
                }.bind(this));
            };
            // Отобразим
            this.table_total_operation_to_arr.view(list_view);

            var data = {
                name: "Root",
                children: []
            };

            $.each(list_view, function (key, element) {
                var child = {
                    name: element.operator_abbr,
                    children: [
                        {
                            name: element.id_operator,
                            value: element.count_wagon
                        }
                    ]
                };
                data.children.push(child);
            }.bind(this));

            this.chart_data[1] = data;

            //var data = {
            //    name: "Root",
            //    children: [
            //        {
            //            name: "First",
            //            children: [
            //                {
            //                    name: "A1",
            //                    value: 100
            //                },
            //                {
            //                    name: "A2",
            //                    value: 60
            //                },
            //                {
            //                    name: "A3",
            //                    value: 30
            //                }
            //            ]
            //        },
            //        {
            //            name: "Second",
            //            children: [
            //                {
            //                    name: "B1",
            //                    value: 135
            //                },
            //                {
            //                    name: "B2",
            //                    value: 98
            //                },
            //                {
            //                    name: "B3",
            //                    value: 56
            //                }
            //            ]
            //        },
            //        {
            //            name: "Third",
            //            children: [
            //                {
            //                    name: "C1",
            //                    value: 335
            //                },
            //                {
            //                    name: "C2",
            //                    value: 148
            //                },
            //                {
            //                    name: "C3",
            //                    value: 126
            //                },
            //                {
            //                    name: "C4",
            //                    value: 26
            //                }
            //            ]
            //        },
            //        {
            //            name: "Fourth",
            //            children: [
            //                {
            //                    name: "D1",
            //                    value: 415
            //                },
            //                {
            //                    name: "D2",
            //                    value: 148
            //                },
            //                {
            //                    name: "D3",
            //                    value: 89
            //                },
            //                {
            //                    name: "D4",
            //                    value: 64
            //                },
            //                {
            //                    name: "D5",
            //                    value: 16
            //                }
            //            ]
            //        },
            //        {
            //            name: "Fifth",
            //            children: [
            //                {
            //                    name: "E1",
            //                    value: 687
            //                },
            //                {
            //                    name: "E2",
            //                    value: 148
            //                }
            //            ]
            //        }
            //    ]
            //};
            this.view_chart_total_operation_to_arr();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Оператор по ПРИБ"
    view_td_report.prototype.view_chart_total_operation_to_arr = function () {
        if (this.report_panel === 1 && this.chart_data) {
            this.chart_total_operation_to_arr.view(this.chart_data[1]);
        };
    };
    // Выполнить фильтрацию и вывести данные по отчету "Оператор по ПРИБ"
    view_td_report.prototype.view_filter_report_total_cargo = function () {
        if (this.total_cargo) {
            this.value_cargo = Number(this.select_detali_cargo.val());
            this.value_certification_data = Number(this.select_detali_certification_data.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_cargo));
            // Применим фильтр
            if (this.value_cargo > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_cargo === (this.value_cargo > 0 ? this.value_cargo : null);
                }.bind(this));
            };
            if (this.value_certification_data > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_certification_data === (this.value_certification_data > 0 ? this.value_certification_data : null);
                }.bind(this));
            };
            var list = list_view.sort(function (a, b) { return a.id_group - b.id_group }.bind(this));
            // Отобразим
            this.table_total_cargo_to_arr.view(list);

            var data = [];
            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.cargo_name; });
                if (gn === undefined) {
                    data.push({ "name": element.cargo_name, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
            }.bind(this));
            this.chart_data[2] = data;
            // Set data
            //var data = [{
            //    country: "USA",
            //    value: 2025
            //}, {
            //    country: "China",
            //    value: 1882
            //}, {
            //    country: "Japan",
            //    value: 1809
            //}, {
            //    country: "Germany",
            //    value: 1322
            //}, {
            //    country: "UK",
            //    value: 1122
            //}, {
            //    country: "France",
            //    value: 1114
            //}, {
            //    country: "India",
            //    value: 984
            //}, {
            //    country: "Spain",
            //    value: 711
            //}, {
            //    country: "Netherlands",
            //    value: 665
            //}, {
            //    country: "South Korea",
            //    value: 443
            //}, {
            //    country: "Canada",
            //    value: 441
            //}];
            this.view_chart_total_cargo();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Оператор по ПРИБ"
    view_td_report.prototype.view_chart_total_cargo = function () {
        if (this.report_panel === 2 && this.chart_data) {
            this.chart_total_cargo_to_arr.view(this.chart_data[2]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Группы ПРИБ"
    view_td_report.prototype.view_filter_report_total_group_cargo = function () {
        if (this.total_group_cargo) {
            this.value_group_arrival = Number(this.select_detali_group_arrival.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_group_cargo));
            // Применим фильтр
            if (this.value_group_arrival > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_group === (this.value_group_arrival > 0 ? this.value_group_arrival : null);
                }.bind(this));
            };
            // Отобразим
            this.table_total_group_cargo_to_arr.view(list_view);


            //var data = [{
            //    category: "Lithuania",
            //    value: 501.9
            //}, {
            //    category: "Czechia",
            //    value: 301.9
            //}, {
            //    category: "Ireland",
            //    value: 201.1
            //}, {
            //    category: "Germany",
            //    value: 165.8
            //}, {
            //    category: "Australia",
            //    value: 139.9
            //}, {
            //    category: "Austria",
            //    value: 128.3
            //}, {
            //    category: "UK",
            //    value: 99
            //}];

            var data = [];
            $.each(list_view, function (key, element) {
                data.push({ "name": element.group_name, "value": element.count_wagon });
            }.bind(this));

            this.chart_data[3] = data;

            this.view_chart_total_group_cargo();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Оператор по ПРИБ"
    view_td_report.prototype.view_chart_total_group_cargo = function () {
        if (this.report_panel === 3 && this.chart_data) {
            this.chart_total_group_cargo_to_arr.view(this.chart_data[3]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Род вагона ПРИБ"
    view_td_report.prototype.view_filter_report_total_genus = function () {
        if (this.total_group_cargo) {
            this.value_genus = Number(this.select_detali_genus.val());
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_genus));
            // Применим фильтр
            if (this.value_genus > -1) {
                list_view = list_view.filter(function (i) {
                    return i.id_genus === (this.value_genus > 0 ? this.value_genus : null);
                }.bind(this));
            };
            // Отобразим
            this.table_total_genus_to_arr.view(list_view);


            //var data = [{
            //    category: "Lithuania",
            //    value: 501.9
            //}, {
            //    category: "Czechia",
            //    value: 301.9
            //}, {
            //    category: "Ireland",
            //    value: 201.1
            //}, {
            //    category: "Germany",
            //    value: 165.8
            //}, {
            //    category: "Australia",
            //    value: 139.9
            //}, {
            //    category: "Austria",
            //    value: 128.3
            //}, {
            //    category: "UK",
            //    value: 99
            //}];

            var data = [];
            $.each(list_view, function (key, element) {
                data.push({ "name": element.rod_abbr, "value": element.count_wagon });
            }.bind(this));

            this.chart_data[4] = data;

            this.view_chart_total_genus();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Род вагона ПРИБ"
    view_td_report.prototype.view_chart_total_genus = function () {
        if (this.report_panel === 4 && this.chart_data) {
            this.chart_total_genus_to_arr.view(this.chart_data[4]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Груз ПРИБ SAP"
    view_td_report.prototype.view_filter_report_total_cargo_sap = function () {
        if (this.total_cargo_sap) {
            this.value_cargo_sap = this.select_detali_cargo_sap.val();
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_cargo_sap));
            // Применим фильтр
            if (this.value_cargo_sap !== "-1") {
                list_view = list_view.filter(function (i) {
                    return i.sap_cargo_code === this.value_cargo_sap;
                }.bind(this));
            };
            // Отобразим
            this.table_total_cargo_sap_to_arr.view(list_view);
            //var data = [{
            //    category: "Lithuania",
            //    value: 501.9
            //}, {
            //    category: "Czechia",
            //    value: 301.9
            //}, {
            //    category: "Ireland",
            //    value: 201.1
            //}, {
            //    category: "Germany",
            //    value: 165.8
            //}, {
            //    category: "Australia",
            //    value: 139.9
            //}, {
            //    category: "Austria",
            //    value: 128.3
            //}, {
            //    category: "UK",
            //    value: 99
            //}];
            var data = [];
            $.each(list_view, function (key, element) {
                data.push({ "name": element.sap_cargo_name, "value": element.count_wagon });
            }.bind(this));

            this.chart_data[5] = data;

            this.view_chart_total_cargo_sap();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Груз ПРИБ SAP"
    view_td_report.prototype.view_chart_total_cargo_sap = function () {
        if (this.report_panel === 5 && this.chart_data) {
            this.chart_total_cargo_sap_to_arr.view(this.chart_data[5]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Станция ПРИБ"
    view_td_report.prototype.view_filter_report_total_station_from = function () {
        if (this.total_station_from) {
            this.value_station_from = this.select_detali_station_from_multiple.val();
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_station_from));
            // Применим фильтр
            if (this.value_station_from && this.value_station_from.length > 0) {
                list_view = list_view.filter(function (i) {
                    var op = this.value_station_from.find(function (o) {
                        return Number(o) === i.code_stn_from;
                    }.bind(this));
                    return op ? true : false;
                }.bind(this));
            };
            // Отобразим
            this.table_total_station_to_arr.view(list_view);
            //var data = [{
            //    name: "Lithuania",
            //    value: 501.9
            //}, {
            //    name: "Czechia",
            //    value: 301.9
            //}, {
            //    name: "Ireland",
            //    value: 201.1
            //}, {
            //    name: "Germany",
            //    value: 165.8
            //}, {
            //    name: "Australia",
            //    value: 139.9
            //}, {
            //    name: "Austria",
            //    value: 128.3
            //}, {
            //    name: "UK",
            //    value: 99
            //}];
            var data = [];
            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.station_from_name; });
                if (gn === undefined) {
                    data.push({ "name": element.station_from_name, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
                //data.push({ "name": element.station_from_name, "value": element.count_wagon });
            }.bind(this));

            this.chart_data[6] = data;

            this.view_chart_total_station_from();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Груз ПРИБ SAP"
    view_td_report.prototype.view_chart_total_station_from = function () {
        if (this.report_panel === 6 && this.chart_data) {
            this.chart_total_station_to_arr.view(this.chart_data[6]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Цех-грузополучатель."
    view_td_report.prototype.view_filter_report_total_division = function () {
        if (this.total_division) {
            this.value_division = this.select_detali_division_multiple.val();
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_division));
            // Применим фильтр
            if (this.value_division && this.value_division.length > 0) {
                list_view = list_view.filter(function (i) {
                    var op = this.value_division.find(function (o) {
                        return Number(o) === i.id_division;
                    }.bind(this));
                    return op ? true : false;
                }.bind(this));
            };
            // Отобразим
            this.table_total_division_to_arr.view(list_view);
            //var data = [{
            //    name: "Lithuania",
            //    value: 501.9
            //}, {
            //    name: "Czechia",
            //    value: 301.9
            //}, {
            //    name: "Ireland",
            //    value: 201.1
            //}, {
            //    name: "Germany",
            //    value: 165.8
            //}, {
            //    name: "Australia",
            //    value: 139.9
            //}, {
            //    name: "Austria",
            //    value: 128.3
            //}, {
            //    name: "UK",
            //    value: 99
            //}];
            var data = [];
            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.division_abbr; });
                if (gn === undefined) {
                    data.push({ "name": element.division_abbr, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
                //data.push({ "name": element.division_abbr, "value": element.count_wagon });
            }.bind(this));

            this.chart_data[7] = data;

            this.view_chart_total_division_from();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Цех-грузополучатель."
    view_td_report.prototype.view_chart_total_division_from = function () {
        if (this.report_panel === 7 && this.chart_data) {
            this.chart_total_division_to_arr.view(this.chart_data[7]);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Отчет для ГС"
    view_td_report.prototype.view_filter_report_total_gs = function () {
        if (this.total_gs) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_gs));
            // Отобразим
            this.table_total_adoption_to_gs.view(list_view);
            //var data = [{
            //    name: "Lithuania",
            //    value: 501.9
            //}, {
            //    name: "Czechia",
            //    value: 301.9
            //}, {
            //    name: "Ireland",
            //    value: 201.1
            //}, {
            //    name: "Germany",
            //    value: 165.8
            //}, {
            //    name: "Australia",
            //    value: 139.9
            //}, {
            //    name: "Austria",
            //    value: 128.3
            //}, {
            //    name: "UK",
            //    value: 99
            //}];
            var data = [];
            //$.each(list_view, function (key, element) {
            //    data.push({ "name": element.division_abbr, "value": element.count_wagon });
            //}.bind(this));

            this.chart_data[8] = data;

            this.view_chart_total_gs();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Отчет для ГС"
    view_td_report.prototype.view_chart_total_gs = function () {
        if (this.report_panel === 8 && this.chart_data) {
            //this.chart_total_adoption_to_gs.view(this.chart_data[8]);
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_3_1 = function () {
        this.out_clear();
        LockScreen(langView('vtdr_load_adoption_cars', App.Langs));
        this.load_select_report_3_1(null, function () {
            LockScreenOff();
        }.bind(this))
    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_3_1 = function () {
        this.switch_laden.val(false);
        this.switch_accounting.val(false);
        this.switch_client.val(false);
        this.switch_not_client.val(false);
        this.switch_paid.val(false);
        //this.switch_shu.val(true);
        this.select_station_amkr.val(-1);
        // Обработать и показать данные
        this.process_data_view_report_3_1(this.clone_wagons_adoption, null);
        LockScreenOff();
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_3_1 = function () {
        if (this.switch_laden && this.select_detali_operation_amkr) {
            this.switch_laden.val(false);
            this.switch_accounting.val(false);
            this.switch_client.val(false);
            this.switch_not_client.val(false);
            this.switch_paid.val(false);
            //this.switch_shu.val(true);
            this.select_station_amkr.val(-1);
            this.wagons_adoption = [];
            this.clone_wagons_adoption = [];
            this.process_data_view_report_3_1(this.clone_wagons_adoption, null);
            LockScreenOff();
        }
    };
    //view_td_report.prototype.chart_3_1 = function () {
    //    am5.ready(function () {

    //        // Create root element
    //        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //        var root = am5.Root.new("adoption-operator-to-arr-chart");


    //        // Set themes
    //        // https://www.amcharts.com/docs/v5/concepts/themes/
    //        root.setThemes([
    //            am5themes_Animated.new(root)
    //        ]);


    //        // Create chart
    //        // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //        var chart = root.container.children.push(am5xy.XYChart.new(root, {
    //            panX: true,
    //            panY: true,
    //            wheelX: "panX",
    //            wheelY: "zoomX",
    //            pinchZoomX: true
    //        }));

    //        // Add cursor
    //        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    //        cursor.lineY.set("visible", false);


    //        // Create axes
    //        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    //        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    //        xRenderer.labels.template.setAll({
    //            rotation: -90,
    //            centerY: am5.p50,
    //            centerX: am5.p100,
    //            paddingRight: 15
    //        });

    //        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    //            maxDeviation: 0.3,
    //            categoryField: "country",
    //            renderer: xRenderer,
    //            tooltip: am5.Tooltip.new(root, {})
    //        }));

    //        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    //            maxDeviation: 0.3,
    //            renderer: am5xy.AxisRendererY.new(root, {})
    //        }));


    //        // Create series
    //        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    //        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    //            name: "Series 1",
    //            xAxis: xAxis,
    //            yAxis: yAxis,
    //            valueYField: "value",
    //            sequencedInterpolation: true,
    //            categoryXField: "country",
    //            tooltip: am5.Tooltip.new(root, {
    //                labelText: "{valueY}"
    //            })
    //        }));

    //        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    //        series.columns.template.adapters.add("fill", function (fill, target) {
    //            return chart.get("colors").getIndex(series.columns.indexOf(target));
    //        });

    //        series.columns.template.adapters.add("stroke", function (stroke, target) {
    //            return chart.get("colors").getIndex(series.columns.indexOf(target));
    //        });


    //        // Set data
    //        var data = [{
    //            country: "USA",
    //            value: 2025
    //        }, {
    //            country: "China",
    //            value: 1882
    //        }, {
    //            country: "Japan",
    //            value: 1809
    //        }, {
    //            country: "Germany",
    //            value: 1322
    //        }, {
    //            country: "UK",
    //            value: 1122
    //        }, {
    //            country: "France",
    //            value: 1114
    //        }, {
    //            country: "India",
    //            value: 984
    //        }, {
    //            country: "Spain",
    //            value: 711
    //        }, {
    //            country: "Netherlands",
    //            value: 665
    //        }, {
    //            country: "South Korea",
    //            value: 443
    //        }, {
    //            country: "Canada",
    //            value: 441
    //        }];

    //        xAxis.data.setAll(data);
    //        series.data.setAll(data);


    //        // Make stuff animate on load
    //        // https://www.amcharts.com/docs/v5/concepts/animations/
    //        series.appear(1000);
    //        chart.appear(1000, 100);

    //    }); // end am5.ready()
    //};
    //view_td_report.prototype.chart_3_2 = function () {
    //    am5.ready(function () {

    //        // Create root element
    //        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //        var root = am5.Root.new("adoption-operator-to-arr-chart");

    //        // Set themes
    //        // https://www.amcharts.com/docs/v5/concepts/themes/
    //        root.setThemes([
    //            am5themes_Animated.new(root)
    //        ]);

    //        // Create wrapper container
    //        var container = root.container.children.push(
    //            am5.Container.new(root, {
    //                width: am5.percent(100),
    //                height: am5.percent(100),
    //                layout: root.verticalLayout
    //            })
    //        );

    //        // Create series
    //        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    //        var series = container.children.push(
    //            am5hierarchy.Treemap.new(root, {
    //                singleBranchOnly: false,
    //                downDepth: 1,
    //                upDepth: -1,
    //                initialDepth: 2,
    //                valueField: "value",
    //                categoryField: "name",
    //                childDataField: "children",
    //                nodePaddingOuter: 0,
    //                nodePaddingInner: 0
    //            })
    //        );

    //        series.rectangles.template.setAll({
    //            strokeWidth: 2
    //        });

    //        // Generate and set data
    //        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
    //        var maxLevels = 2;
    //        var maxNodes = 10;
    //        var maxValue = 100;

    //        var data = {
    //            name: "Root",
    //            children: [
    //                {
    //                    name: "First",
    //                    children: [
    //                        {
    //                            name: "A1",
    //                            value: 100
    //                        },
    //                        //{
    //                        //    name: "A2",
    //                        //    value: 60
    //                        //},
    //                        //{
    //                        //    name: "A3",
    //                        //    value: 30
    //                        //}
    //                    ]
    //                },
    //                {
    //                    name: "Second",
    //                    children: [
    //                        {
    //                            name: "B1",
    //                            value: 135
    //                        },
    //                        //{
    //                        //    name: "B2",
    //                        //    value: 98
    //                        //},
    //                        //{
    //                        //    name: "B3",
    //                        //    value: 56
    //                        //}
    //                    ]
    //                },
    //                {
    //                    name: "Third",
    //                    children: [
    //                        {
    //                            name: "C1",
    //                            value: 335
    //                        },
    //                        //{
    //                        //    name: "C2",
    //                        //    value: 148
    //                        //},
    //                        //{
    //                        //    name: "C3",
    //                        //    value: 126
    //                        //},
    //                        //{
    //                        //    name: "C4",
    //                        //    value: 26
    //                        //}
    //                    ]
    //                },
    //                {
    //                    name: "Fourth",
    //                    children: [
    //                        {
    //                            name: "D1",
    //                            value: 415
    //                        },
    //                        //{
    //                        //    name: "D2",
    //                        //    value: 148
    //                        //},
    //                        //{
    //                        //    name: "D3",
    //                        //    value: 89
    //                        //},
    //                        //{
    //                        //    name: "D4",
    //                        //    value: 64
    //                        //},
    //                        //{
    //                        //    name: "D5",
    //                        //    value: 16
    //                        //}
    //                    ]
    //                },
    //                {
    //                    name: "Fifth",
    //                    children: [
    //                        {
    //                            name: "E1",
    //                            value: 687
    //                        },
    //                        //{
    //                        //    name: "E2",
    //                        //    value: 148
    //                        //}
    //                    ]
    //                }
    //            ]
    //        };

    //        series.data.setAll([data]);
    //        series.set("selectedDataItem", series.dataItems[0]);

    //        // Make stuff animate on load
    //        series.appear(1000, 100);

    //    }); // end am5.ready()
    //};

    // обновим выбор детально
    view_td_report.prototype.view_setup_detali_report_3_1 = function (rep) {
        this.row_setup_detali_operation_amkr.hide();
        this.row_setup_detali_operation_amkr_multiple.hide();
        this.row_setup_detali_limiting.hide();
        this.row_setup_detali_cargo.hide();
        this.row_setup_detali_certification_data.hide();
        this.row_setup_detali_group_arrival.hide();
        this.row_setup_detali_genus.hide();
        this.row_setup_detali_cargo_sap.hide();
        this.row_setup_detali_station_from_multiple.hide();
        this.row_setup_detali_division_multiple.hide();
        switch (rep) {
            case 0: {
                this.row_setup_detali_operation_amkr.show();
                this.row_setup_detali_limiting.show();
                this.select_detali_operation_amkr.update(this.list_operation_amkr, this.value_operation_amkr);
                this.select_detali_limiting.update(this.list_limiting, this.value_limiting0);

                break;
            };
            case 1: {
                this.row_setup_detali_operation_amkr_multiple.show();
                this.row_setup_detali_limiting.show();
                this.select_detali_operation_amkr_multiple.update(this.list_operation_amkr, this.value_operation_amkr_multiple);
                this.select_detali_limiting.update(this.list_limiting, this.value_limiting1);

                break;
            };
            case 2: {
                this.row_setup_detali_cargo.show();
                this.row_setup_detali_certification_data.show();
                this.select_detali_cargo.update(this.list_cargo, this.value_cargo);
                this.select_detali_certification_data.update(this.list_certification_data, this.value_certification_data);
                break;
            };
            case 3: {
                this.row_setup_detali_group_arrival.show();
                this.select_detali_group_arrival.update(this.list_group_arrival, this.value_group_arrival);

                break;
            };
            case 4: {
                this.row_setup_detali_genus.show();
                this.select_detali_genus.update(this.list_genus, this.value_genus);
                break;
            };
            case 5: {
                this.row_setup_detali_cargo_sap.show();
                this.select_detali_cargo_sap.update(this.list_cargo_sap, this.value_cargo_sap);
                break;
            };
            case 6: {
                this.row_setup_detali_station_from_multiple.show();
                this.select_detali_station_from_multiple.update(this.list_station_from, this.value_station_from);
                break;
            };
            case 7: {
                this.row_setup_detali_division_multiple.show();
                this.select_detali_division_multiple.update(this.list_division, this.value_division);
                break;
            };
        }
    };
    //--------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Информация по вагону и собственнику"
    view_td_report.prototype.init_report_4_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 4;        // номер отчета
        this.report_panel = 0;  // номер под-отчета

        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_4_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
        //------
        var row_common = new this.fe_ui.bs_row();
        var col_common = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var row_common_wagon = new this.fe_ui.bs_row();
        var col_common_wagon1 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 5,
        });
        var col_common_wagon2 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 7,
        });
        row_common.$row.append(col_common.$col);
        var card_common = new this.fe_ui.bs_card({
            id: null,
            class_card: 'border-primary mb-1',
            header: true,
            class_header: 'text-centr text-white bg-primary',
            class_body: 'text-left',
            title_header: null,
        });
        // Создадим форму выбора для отчета
        this.form_select_num = new FIL();
        var fl_input_num = {
            type: 'input_number',
            id: 'num_wag',
            prefix: 'sm',
            title: langView('vtdr_title_num_wag', App.Langs),
            default: null,
            change: function (event, ui) {
                //event.preventDefault();
                //// Обработать выбор
                //var id = Number($(event.currentTarget).val());
                //this.select_report(id);
            }.bind(this),
        };
        var fl_button_searsh = {
            type: 'button',
            id: 'button_searsh',
            prefix: 'sm',
            title: langView('vtdr_title_button_searsh', App.Langs),
            icon: 'fas fa-retweet',
            select: function (e, ui) {
                event.preventDefault();
                this.view_report_4_1(this.start, this.stop);
            }.bind(this),
        };
        var fields = [];
        fields.push(fl_input_num);
        fields.push(fl_button_searsh);
        // Инициализация формы
        this.form_select_num.init({
            fields: fields,
            cl_form: null
        });
        //------
        var fieldset_common_wagon = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: langView('vtdr_title_common_wagon_legend', App.Langs),
            class_legend: 'border-primary',
        });
        this.$common_wagon = fieldset_common_wagon.$fieldset;
        var fieldset_operator_wagon = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: langView('vtdr_title_operator_wagon_legend', App.Langs),
            class_legend: 'border-primary',
        });
        this.$operator_wagon = fieldset_operator_wagon.$fieldset;
        var fieldset_report_wagon = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: langView('vtdr_title_report_wagon_legend', App.Langs),
            class_legend: 'border-primary',
        });
        this.$report_wagon = fieldset_report_wagon.$fieldset;
        //
        card_common.$header.append(this.form_select_num.$form);
        row_common_wagon.$row.append(col_common_wagon1.$col.append(this.$common_wagon)).append(col_common_wagon2.$col.append(this.$operator_wagon))

        card_common.$body.append(row_common_wagon.$row).append(this.$report_wagon);
        //
        col_common.$col.append(card_common.$card);
        this.$main_report.append(row_common.$row);
        // добавим поля детально информация по внутреннему перемещению
        var $form_cw = $('<form></form>');
        // --
        var $div_row_cw0 = $('<div></div>', { class: 'form-row' });
        // arrival_sostav_num_doc
        var $div_group_cw0_1 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw0_1_1 = $('<label></label>', { for: 'arrival_num_doc', text: langView('vtdr_label_cw_arrival_num_doc', App.Langs) });
        var $div_input_group_cw0_1 = $('<div></div>', { class: 'input-group' });
        this.$input_arrival_num_doc = $('<input>', { id: 'arrival_num_doc', name: 'arrival_num_doc', class: 'form-control', type: 'number', disabled: '' });
        var $div_input_group_append_cw0_1 = $('<div></div>', { class: 'input-group-append' });
        this.$button_arrival_num_doc = $('<button class="btn btn-outline-secondary" type="button"></button>');
        this.$button_arrival_num_doc.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = $(e.currentTarget).attr('id-arrival');
            var date = $(e.currentTarget).attr('date');
            if (id && date) {
                window.open(url_incoming + '?id_arrival=' + id + '&arrival=' + date, '', '');
            };
        }.bind(this));
        var $icon_cw0_1 = $('<i class="fa-solid fa-eye"></i>');
        //$div_group_cw0_1.append($lab_cw0_1_1).append(this.$input_arrival_num_doc);
        $div_input_group_append_cw0_1.append(this.$button_arrival_num_doc.append($icon_cw0_1));
        $div_input_group_cw0_1.append(this.$input_arrival_num_doc).append($div_input_group_append_cw0_1);
        $div_group_cw0_1.append($lab_cw0_1_1).append($div_input_group_cw0_1);

        // outgoing_sostav_num_doc
        var $div_group_cw0_2 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw0_2_1 = $('<label></label>', { for: 'outgoing_num_doc', text: langView('vtdr_label_cw_outgoing_num_doc', App.Langs) });
        var $div_input_group_cw0_2 = $('<div></div>', { class: 'input-group' });
        this.$input_outgoing_num_doc = $('<input>', { id: 'outgoing_num_doc', name: 'outgoing_num_doc', class: 'form-control', type: 'number', disabled: '' });
        var $div_input_group_append_cw0_2 = $('<div></div>', { class: 'input-group-append' });
        this.$button_outgoing_num_doc = $('<button class="btn btn-outline-secondary" type="button"></button>');
        this.$button_outgoing_num_doc.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = $(e.currentTarget).attr('id-outgoing');
            var date = $(e.currentTarget).attr('date');
            if (id && date) {
                //window.open(url_incoming + '?id_arrival=' + id + '&arrival=' + date, '', '');
                window.open(url_outgoing + '?id=' + id + '&readiness=' + date, '', '');
            };
        }.bind(this));
        var $icon_cw0_2 = $('<i class="fa-solid fa-eye"></i>');
        //$div_group_cw0_2.append($lab_cw0_2_1).append(this.$input_outgoing_num_doc);
        $div_input_group_append_cw0_2.append(this.$button_outgoing_num_doc.append($icon_cw0_2));
        $div_input_group_cw0_2.append(this.$input_outgoing_num_doc).append($div_input_group_append_cw0_2);
        $div_group_cw0_2.append($lab_cw0_2_1).append($div_input_group_cw0_2);

        var $div_row_cw1 = $('<div></div>', { class: 'form-row' });
        // 
        var $div_group_cw1_1 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw1_1_1 = $('<label></label>', { for: 'arrival_station_on_name', text: langView('vtdr_label_cw_arrival_station_on_name', App.Langs) });
        this.$input_arrival_station_on_name = $('<input>', { id: 'arrival_station_on_name', name: 'arrival_station_on_name', class: 'form-control', type: 'text', disabled: '' });
        $div_group_cw1_1.append($lab_cw1_1_1).append(this.$input_arrival_station_on_name);
        // outgoing_sostav_from_station_amkr_name
        var $div_group_cw1_2 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw1_2_1 = $('<label></label>', { for: 'outgoing_from_station_amkr_name', text: langView('vtdr_label_cw_outgoing_from_station_amkr_name', App.Langs) });
        this.$input_outgoing_from_station_amkr_name = $('<input>', { id: 'outgoing_from_station_amkr_name', name: 'outgoing_from_station_amkr_name', class: 'form-control', type: 'text', disabled: '' });
        $div_group_cw1_2.append($lab_cw1_2_1).append(this.$input_outgoing_from_station_amkr_name);

        // --
        var $div_row_cw2 = $('<div></div>', { class: 'form-row' });
        // arrival_uz_document_station_from_name
        var $div_group_cw2_1 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw2_1_1 = $('<label></label>', { for: 'arrival_ext_station_from_name', text: langView('vtdr_label_cw_arrival_ext_station_from_name', App.Langs) });
        //var $div_input_group_cw2_1 = $('<div></div>', { class: 'input-group' });
        this.$input_arrival_ext_station_from_name = $('<input>', { id: 'arrival_ext_station_from_name', name: 'arrival_ext_station_from_name', class: 'form-control', type: 'text', disabled: '' });
        //var $div_input_group_append_cw2_1 = $('<div></div>', { class: 'input-group-append' });
        this.$button_arrival_ext_station_from_name = $('<button class="btn btn-outline-secondary" type="button"></button>');
        //var $icon_cw2_1 = $('<i class="fa-solid fa-eye"></i>');
        $div_group_cw2_1.append($lab_cw2_1_1).append(this.$input_arrival_ext_station_from_name);
        //$div_input_group_append_cw2_1.append(this.$button_arrival_ext_station_from_name.append($icon_cw2_1));
        //$div_input_group_cw2_1.append(this.$input_arrival_ext_station_from_name).append($div_input_group_append_cw2_1);
        //$div_group_cw2_1.append($lab_cw2_1_1).append($div_input_group_cw2_1);
        // outgoing_uz_document_station_to_name
        var $div_group_cw2_2 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw2_2_1 = $('<label></label>', { for: 'outgoing_ext_station_to_name', text: langView('vtdr_label_cw_outgoing_ext_station_to_name', App.Langs) });
        //var $div_input_group_cw2_2 = $('<div></div>', { class: 'input-group' });
        this.$input_outgoing_ext_station_to_name = $('<input>', { id: 'outgoing_ext_station_to_name', name: 'outgoing_ext_station_to_name', class: 'form-control', type: 'text', disabled: '' });
        //var $div_input_group_append_cw2_2 = $('<div></div>', { class: 'input-group-append' });
        this.$button_outgoing_ext_station_to_name = $('<button class="btn btn-outline-secondary" type="button"></button>');
        //var $icon_cw2_2 = $('<i class="fa-solid fa-eye"></i>');
        $div_group_cw2_2.append($lab_cw2_2_1).append(this.$input_outgoing_ext_station_to_name);
        //$div_input_group_append_cw2_2.append(this.$button_outgoing_ext_station_to_name.append($icon_cw2_2));
        //$div_input_group_cw2_2.append(this.$input_outgoing_ext_station_to_name).append($div_input_group_append_cw2_2);
        //$div_group_cw2_2.append($lab_cw2_2_1).append($div_input_group_cw2_2);
        // --
        var $div_row_cw3 = $('<div></div>', { class: 'form-row' });
        // arrival_uz_document_nom_main_doc
        var $div_group_cw3_1 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw3_1_1 = $('<label></label>', { for: 'arrival_nom_main_doc', text: langView('vtdr_label_cw_arrival_nom_main_doc', App.Langs) });
        this.$input_arrival_nom_main_doc = $('<input>', { id: 'arrival_nom_main_doc', name: 'arrival_nom_main_doc', class: 'form-control', type: 'text', disabled: '' });
        $div_group_cw3_1.append($lab_cw3_1_1).append(this.$input_arrival_nom_main_doc);
        // outgoing_uz_document_nom_doc
        var $div_group_cw3_2 = $('<div></div>', { class: 'form-group col-md-6' });
        var $lab_cw3_2_1 = $('<label></label>', { for: 'outgoing_nom_doc', text: langView('vtdr_label_cw_outgoing_nom_doc', App.Langs) });
        this.$input_outgoing_nom_doc = $('<input>', { id: 'outgoing_nom_doc', name: 'outgoing_nom_doc', class: 'form-control', type: 'text', disabled: '' });
        $div_group_cw3_2.append($lab_cw3_2_1).append(this.$input_outgoing_nom_doc);

        $div_row_cw0.append($div_group_cw0_1).append($div_group_cw0_2);
        $div_row_cw1.append($div_group_cw1_1).append($div_group_cw1_2);
        $div_row_cw2.append($div_group_cw2_1).append($div_group_cw2_2);
        $div_row_cw3.append($div_group_cw3_1).append($div_group_cw3_2);

        $form_cw.append($div_row_cw0).append($div_row_cw1).append($div_row_cw2).append($div_row_cw3);

        this.$common_wagon.append($form_cw);
        // ------------------------------------------------------------------
        // Создадим панель выбора "Оператор текущий детально - таблица всех операторов"
        var nav_tabs_operators_wagon = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-operators-wagon',
            class_nav: null,
            id_content: 'tab-operators-wagon-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'operators-wagon-detali',
                    aria_controls: 'operators-wagon-detali-tab',
                    label: 'Детально',
                    disable: false,
                    click: null,
                },
                {
                    id: 'operators-wagon-list',
                    aria_controls: 'operators-wagon-list-tab',
                    label: 'Все операторы',
                    disable: false,
                    click: null,
                },
            ],
        });
        // Закладка отчет детально -----------------
        // Создадим форму вывода детальной информации
        var $form_od = $('<form></form>');
        var $div_row_od1 = $('<div></div>', { class: 'form-row' });
        // даты
        var $div_group_od1_1 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od1_1_1 = $('<label></label>', { for: 'arrival_station_on_name', text: langView('vtdr_label_od_last_date_outgoing', App.Langs) });
        this.$input_last_date_outgoing = $('<input>', { id: 'last_date_outgoing', name: 'last_date_outgoing', class: 'form-control form-control-sm', type: 'datetime', disabled: '' });
        $div_group_od1_1.append($lab_od1_1_1).append(this.$input_last_date_outgoing);
        // 
        //var $div_group_od1_2 = $('<div></div>', { class: 'form-group col-md-3' });
        //var $lab_od1_2_1 = $('<label></label>', { for: 'instructional_letters_datetime', text: langView('vtdr_label_od_instructional_letters_datetime', App.Langs) });
        //this.$input_instructional_letters_datetime = $('<input>', { id: 'instructional_letters_datetime', name: 'instructional_letters_datetime', class: 'form-control form-control-sm', type: 'datetime', disabled: '' });
        //$div_group_od1_2.append($lab_od1_2_1).append(this.$input_instructional_letters_datetime);
        var $div_group_od1_3 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od1_3_1 = $('<label></label>', { for: 'wagon_rod_abbr', text: langView('vtdr_label_od_wagon_rod_abbr', App.Langs) });
        this.$input_wagon_rod_abbr = $('<input>', { id: 'wagon_rod_abbr', name: 'wagon_rod_abbr', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od1_3.append($lab_od1_3_1).append(this.$input_wagon_rod_abbr);
        var $div_group_od1_4 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od1_4_1 = $('<label></label>', { for: 'wagon_date_rem_uz', text: langView('vtdr_label_od_wagon_date_rem_uz', App.Langs) });
        this.$input_wagon_date_rem_uz = $('<input>', { id: 'wagon_date_rem_uz', name: 'wagon_date_rem_uz', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od1_4.append($lab_od1_4_1).append(this.$input_wagon_date_rem_uz);
        // node
        var $div_row_od2 = $('<div></div>', { class: 'form-row' });
        var $div_group_od2_1 = $('<div></div>', { class: 'form-group col-md-12' });
        var $lab_od2_1_1 = $('<label></label>', { for: 'wir_note', text: langView('vtdr_label_od_wir_note', App.Langs) });
        this.$textarea_wir_note = $('<textarea></textarea>', { id: 'wir_note', name: 'wir_note', class: 'form-control form-control-sm', rows: '3', disabled: '' });
        $div_group_od2_1.append($lab_od2_1_1).append(this.$textarea_wir_note);
        // Операторы АМКР
        var $div_row_od3 = $('<div></div>', { class: 'form-row' });
        var $div_group_od3_1 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od3_1_1 = $('<label></label>', { for: 'curr_wagons_rent_operator_abbr', text: langView('vtdr_label_od_curr_wagons_rent_operator_abbr', App.Langs) });
        this.$input_curr_wagons_rent_operator_abbr = $('<input>', { id: 'curr_wagons_rent_operator_abbr', name: 'curr_wagons_rent_operator_abbr', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od3_1.append($lab_od3_1_1).append(this.$input_curr_wagons_rent_operator_abbr);
        var $div_group_od3_2 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od3_2_1 = $('<label></label>', { for: 'curr_wagons_rent_limiting_abbr', text: langView('vtdr_label_od_curr_wagons_rent_limiting_abbr', App.Langs) });
        this.$input_curr_wagons_rent_limiting_abbr = $('<input>', { id: 'curr_wagons_rent_limiting_abbr', name: 'curr_wagons_rent_limiting_abbr', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od3_2.append($lab_od3_2_1).append(this.$input_curr_wagons_rent_limiting_abbr);
        var $div_group_od3_3 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od3_3_1 = $('<label></label>', { for: 'curr_wagons_rent_start', text: langView('vtdr_label_od_curr_wagons_rent_start', App.Langs) });
        this.$input_curr_wagons_rent_start = $('<input>', { id: 'curr_wagons_rent_start', name: 'curr_wagons_rent_start', class: 'form-control form-control-sm', type: 'datetime', disabled: '' });
        $div_group_od3_3.append($lab_od3_3_1).append(this.$input_curr_wagons_rent_start);
        var $div_group_od3_4 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od3_4_1 = $('<label></label>', { for: 'curr_wagons_rent_end', text: langView('vtdr_label_od_curr_wagons_rent_end', App.Langs) });
        this.$input_curr_wagons_rent_end = $('<input>', { id: 'curr_wagons_rent_end', name: 'curr_wagons_rent_end', class: 'form-control form-control-sm', type: 'datetime', disabled: '' });
        $div_group_od3_4.append($lab_od3_4_1).append(this.$input_curr_wagons_rent_end);
        // Разметка
        var $div_row_od4 = $('<div></div>', { class: 'form-row' });
        var $div_group_od4_1 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od4_1_1 = $('<label></label>', { for: 'arrival_condition_abbr', text: langView('vtdr_label_od_arrival_condition_abbr', App.Langs) });
        this.$input_arrival_condition_abbr = $('<input>', { id: 'arrival_condition_abbr', name: 'arrival_condition_abbr', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od4_1.append($lab_od4_1_1).append(this.$input_arrival_condition_abbr);
        var $div_group_od4_2 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od4_2_1 = $('<label></label>', { for: 'current_condition_abbr', text: langView('vtdr_label_od_current_condition_abbr', App.Langs) });
        this.$input_current_condition_abbr = $('<input>', { id: 'current_condition_abbr', name: 'current_condition_abbr', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od4_2.append($lab_od4_2_1).append(this.$input_current_condition_abbr);
        var $div_group_od4_3 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od4_3_1 = $('<label></label>', { for: 'current_condition_create', text: langView('vtdr_label_od_current_condition_create', App.Langs) });
        this.$input_current_condition_create = $('<input>', { id: 'current_condition_create', name: 'current_condition_create', class: 'form-control form-control-sm', type: 'datetime', disabled: '' });
        $div_group_od4_3.append($lab_od4_3_1).append(this.$input_current_condition_create);
        var $div_group_od4_4 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od4_4_1 = $('<label></label>', { for: 'current_condition_create_user', text: langView('vtdr_label_od_current_condition_create_user', App.Langs) });
        this.$input_current_condition_create_user = $('<input>', { id: 'current_condition_create_user', name: 'current_condition_create_user', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od4_4.append($lab_od4_4_1).append(this.$input_current_condition_create_user);
        // Инструкция
        var $div_row_od5 = $('<div></div>', { class: 'form-row' });
        var $div_group_od5_1 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od5_1_1 = $('<label></label>', { for: 'instructional_letters_num', text: langView('vtdr_label_od_instructional_letters_num', App.Langs) });
        this.$input_instructional_letters_num = $('<input>', { id: 'instructional_letters_num', name: 'v', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od5_1.append($lab_od5_1_1).append(this.$input_instructional_letters_num);
        var $div_group_od5_2 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od5_2_1 = $('<label></label>', { for: 'instructional_letters_datetime', text: langView('vtdr_label_od_instructional_letters_datetime', App.Langs) });
        this.$input_instructional_letters_datetime = $('<input>', { id: 'instructional_letters_datetime', name: 'instructional_letters_datetime', class: 'form-control form-control-sm', type: 'text', disabled: '' });
        $div_group_od5_2.append($lab_od5_2_1).append(this.$input_instructional_letters_datetime);
        var $div_group_od5_3 = $('<div></div>', { class: 'form-group col-md-3' });
        var $lab_od5_3_1 = $('<label></label>', { for: 'instructional_letters_station_name', text: langView('vtdr_label_od_instructional_letters_station_name', App.Langs) });
        this.$input_instructional_letters_station_name = $('<input>', { id: 'instructional_letters_station_name', name: 'instructional_letters_station_name', class: 'form-control form-control-sm', type: 'datetime', disabled: '' });
        $div_group_od5_3.append($lab_od5_3_1).append(this.$input_instructional_letters_station_name);
        //
        $div_row_od1.append($div_group_od1_1).append($div_group_od1_3).append($div_group_od1_4);
        $div_row_od2.append($div_group_od2_1);
        $div_row_od3.append($div_group_od3_1).append($div_group_od3_2).append($div_group_od3_3).append($div_group_od3_4);
        $div_row_od4.append($div_group_od4_1).append($div_group_od4_2).append($div_group_od4_3).append($div_group_od4_4);
        $div_row_od5.append($div_group_od5_1).append($div_group_od5_2).append($div_group_od5_3);
        $form_od.append($div_row_od1).append($div_row_od2).append($div_row_od3).append($div_row_od4).append($div_row_od5);
        //
        var div_row_detali = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        var $operators_wagon_detali = nav_tabs_operators_wagon.$content.find('div#operators-wagon-detali-tab'); // Все операторы
        $operators_wagon_detali.append(div_row_detali.$row.append($('<div id="detali-operators-wagon" class="col-xl-12"></div>').append($form_od)));
        // Закладка отчет таблица операторов 
        var div_row_list = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        var $operators_wagon_list = nav_tabs_operators_wagon.$content.find('div#operators-wagon-list-tab'); // Все операторы
        $operators_wagon_list.append(div_row_list.$row.append($('<div id="list-operators-wagon" class="col-xl-12"></div>')));
        //
        this.$operator_wagon.append(nav_tabs_operators_wagon.$ul).append(nav_tabs_operators_wagon.$content);
        //--------------------------------------------------------------------
        // Добавим div для таблицы история прибытия и отправк
        this.$report_wagon.append($('<div id="incoming-outgoing-car"></div>'));

        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем ? процесса инициализации (паралельно)
        var process = 2;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {
                        case 'operators-wagon-detali': {

                            break;
                        };
                        case 'operators-wagon-list': {

                            break;
                        };
                    };
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                }.bind(this));

                LockScreenOff();
            }
        }.bind(this);

        //-----------------------------------------------
        // Таблица : Отчет по вагону  
        this.table_incoming_outgoing_car = new TTDR('div#incoming-outgoing-car');         // Создадим экземпляр
        this.table_incoming_outgoing_car.init({
            alert: null,
            detali_table: true,
            type_report: 'incoming_outgoing_car',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0 && rows[0].wir_id) {
                    this.view_common_wagon(rows[0]);
                } else {
                    this.view_common_wagon(null);
                }
                LockScreenOff();
            }.bind(this),
        });
        // Таблица : Отчет по вагону  
        this.table_wagons_rent = new TTDR('div#list-operators-wagon');         // Создадим экземпляр
        this.table_wagons_rent.init({
            alert: null,
            detali_table: true,
            type_report: 'list_wagons_rent',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
            fn_select_rows: function (rows) {

            }.bind(this),
        });
    };
    // Показать отчет  "Информация по вагону и собственнику"
    view_td_report.prototype.view_report_4_1 = function (start, stop) {
        this.view_common_wagon(null); // очистим общую инормацию детально
        this.load_report_4_1(function () {
            LockScreenOff();
        }.bind(this));
    };
    // отобразить информацию по вагону детально
    view_td_report.prototype.view_common_wagon = function (row) {
        if (row) {
            this.$input_arrival_num_doc.val(row.arrival_sostav_num_doc);
            this.$button_arrival_num_doc.attr('id-arrival', row.arrival_sostav_id);
            this.$button_arrival_num_doc.attr('date', row.arrival_sostav_date_arrival);
            this.$input_outgoing_num_doc.val(row.outgoing_sostav_num_doc);
            this.$button_outgoing_num_doc.attr('id-outgoing', row.outgoing_sostav_id);
            this.$button_outgoing_num_doc.attr('date', row.outgoing_sostav_date_readiness_uz);
            this.$input_arrival_station_on_name.val(row['arrival_sostav_station_on_name_' + App.Lang]);
            this.$input_outgoing_from_station_amkr_name.val(row['outgoing_sostav_from_station_amkr_name_' + App.Lang]);
            this.$input_arrival_ext_station_from_name.val(row['arrival_uz_document_station_from_name_' + App.Lang]);
            this.$input_outgoing_ext_station_to_name.val(row['outgoing_uz_document_station_to_name_' + App.Lang]);
            this.$input_arrival_nom_main_doc.val((row.arrival_uz_document_nom_main_doc !== null ? row.arrival_uz_document_nom_main_doc : '') + (row.arrival_uz_document_nom_doc !== null ? '/' + row.arrival_uz_document_nom_doc : ''));
            this.$input_outgoing_nom_doc.val(row.outgoing_uz_document_nom_doc);
        } else {
            this.$input_arrival_num_doc.val('');
            this.$button_arrival_num_doc.attr('id-arrival', '');
            this.$button_arrival_num_doc.attr('date', '');
            this.$input_outgoing_num_doc.val('');
            this.$button_outgoing_num_doc.attr('id-outgoing', '');
            this.$button_outgoing_num_doc.attr('date', '');
            this.$input_arrival_station_on_name.val('');
            this.$input_outgoing_from_station_amkr_name.val('');
            this.$input_arrival_ext_station_from_name.val('');
            this.$input_outgoing_ext_station_to_name.val('');
            this.$input_arrival_nom_main_doc.val('');
            this.$input_outgoing_nom_doc.val('');
        }
    };
    // отобразить информацию по оператору АМКР детально
    view_td_report.prototype.view_current_operator = function (row) {
        if (row) {
            this.$input_last_date_outgoing.val(row.last_date_outgoing ? moment(row.last_date_outgoing).format(format_datetime) : '');
            //this.$input_instructional_letters_datetime.val(row.instructional_letters_datetime);
            this.$input_wagon_rod_abbr.val(row['wagon_rod_abbr_' + App.Lang]);
            this.$input_wagon_date_rem_uz.val(row.wagon_date_rem_uz ? moment(row.wagon_date_rem_uz).format(format_datetime) : '');
            if (row.wir_highlight_color !== '') {
                this.$textarea_wir_note.attr('style', 'background-color:' + row.wir_highlight_color);
            } else {
                this.$textarea_wir_note.attr('style', '');
            }
            this.$textarea_wir_note.val(row.wir_note);
            this.$input_curr_wagons_rent_operator_abbr.val(row['curr_wagons_rent_operator_abbr_' + App.Lang]);
            this.$input_curr_wagons_rent_limiting_abbr.val(row['curr_wagons_rent_limiting_abbr_' + App.Lang]);
            this.$input_curr_wagons_rent_start.val(row.curr_wagons_rent_start ? moment(row.curr_wagons_rent_start).format(format_datetime) : '');
            this.$input_curr_wagons_rent_end.val(row.curr_wagons_rent_end ? moment(row.curr_wagons_rent_end).format(format_datetime) : '');
            this.$input_arrival_condition_abbr.val(row['arrival_condition_abbr_' + App.Lang]);
            this.$input_current_condition_abbr.val(row['current_condition_abbr_' + App.Lang]);
            this.$input_current_condition_create.val(row.current_condition_create ? moment(row.current_condition_create).format(format_datetime) : '');
            this.$input_current_condition_create_user.val(row.current_condition_create_user);
            //var d = moment(row.instructional_letters_datetime).isAfter(moment(row.last_date_outgoing));
            if (row.cur_date_outgoing === null && moment(row.instructional_letters_datetime).isAfter(moment(row.last_date_outgoing))) {
                // Отображаем если несдан и инструкци я больше последней сдачи
                this.$input_instructional_letters_num.val(row.instructional_letters_num);
                this.$input_instructional_letters_datetime.val(row.instructional_letters_datetime ? moment(row.instructional_letters_datetime).format(format_datetime) : '');
                this.$input_instructional_letters_station_name.val(row.instructional_letters_station_name);
            } else {
                this.$input_instructional_letters_num.val('');
                this.$input_instructional_letters_datetime.val('');
                this.$input_instructional_letters_station_name.val('');
            }

        } else {
            this.$input_last_date_outgoing.val('');
            //this.$input_instructional_letters_datetime.val('');
            this.$input_wagon_rod_abbr.val('');
            this.$input_wagon_date_rem_uz.val('');
            this.$textarea_wir_note.val('');
            this.$input_curr_wagons_rent_operator_abbr.val('');
            this.$input_curr_wagons_rent_limiting_abbr.val('');
            this.$input_curr_wagons_rent_start.val('');
            this.$input_curr_wagons_rent_end.val('');
            this.$input_arrival_condition_abbr.val('');
            this.$input_current_condition_abbr.val('');
            this.$input_current_condition_create.val('');
            this.$input_current_condition_create_user.val('');
            this.$input_instructional_letters_num.val('');
            this.$input_instructional_letters_datetime.val('');
            this.$input_instructional_letters_station_name.val('');
        }
    };
    // Загрузить отчет  "Информация по вагону и собственнику"
    view_td_report.prototype.load_report_4_1 = function (callback) {
        LockScreen(langView('vtdr_load_incoming_outgoing_car', App.Langs));
        var num = this.form_select_num.get('num_wag');
        if (num) {
            // Запускаем 3 процесса выборки
            var process = 3;
            // Выход из инициализации
            var out_load = function (process) {
                if (process === 0) {
                    // Выход
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this);
            // Выборка истории прибытия и отправки
            this.ids_wsd.getViewIncomingOutgoingCarsOfNum_Period(num, this.start, this.stop, function (result_wagons) {
                // Обработать и показать данные
                this.table_incoming_outgoing_car.view(result_wagons);
                // На проверку окончания загрузки
                process--;
                out_load(process);

            }.bind(this));
            // Выборка информации о текущем операторе АМКР вагона
            this.ids_wsd.getReportCurrentOperationWagonOfNum(num, function (result_wagons_operation) {
                // Обработать и показать данные
                this.view_current_operator(result_wagons_operation);
                // На проверку окончания загрузки
                process--;
                out_load(process);
            }.bind(this));
            // Выборка информации о текущем операторе АМКР вагона
            this.ids_dir.getViewWagonsRentOfNum(num, function (result_wagons_rent) {
                // Обработать и показать данные
                this.table_wagons_rent.view(result_wagons_rent);
                // На проверку окончания загрузки
                process--;
                out_load(process);
            }.bind(this));
        } else {
            // Выход
            if (typeof callback === 'function') {
                callback();
            }
        }

    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_4_1 = function () {
        if (this.table_incoming_outgoing_car) {
            this.table_incoming_outgoing_car.view([]);
            this.view_common_wagon(null);
            this.view_current_operator([]);
            this.table_wagons_rent.view([]);
        };
        LockScreenOff();
    };
    //--------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Отчет по отправлению (общий)"
    view_td_report.prototype.init_report_5_1 = function () {
        this.is_acts = false;
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 5; // номер отчета
        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_5_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
        //
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;
        //
        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);

        // Создадим панель выбора
        var nav_tabs_out_cammon = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-out-common',
            class_nav: null,
            id_content: 'tab-out-common-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'out-common-group',
                    aria_controls: 'out-common-group-tab',
                    label: 'По грузам',
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-common-detali',
                    aria_controls: 'out-common-detali-tab',
                    label: 'Детально',
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        // Закладка групповой отчет
        var div_row_cg = $('<div></div>', {
            class: 'row',
            style: 'margin-top: 10px;'
        });
        this.$div_group_sostav = $('<div></div>', {
            id: 'group-sostav',
            class: 'col-xl-12'
        });
        var $out_common_group = nav_tabs_out_cammon.$content.find('div#out-common-group-tab'); // Панель отчета
        $out_common_group.append(div_row_cg.append(this.$div_group_sostav)); // Добавим div для таблиц
        // Закладка отчет детально
        var div_row_detali_stat = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        var div_row_detali = new this.fe_ui.bs_row({
            class: 'mt-2',
        });
        //
        var $h3 = $('<h3>' + langView('vtdr_title_calculation_static_load', App.Langs) + '</h3>');
        var $tab_nagr = $('<table class="table table-bordered"><thead><tr><th>кол.</th><th>ГП, т</th><th>Вес, тн</th></tr></thead><tbody><tr><td class="dt-centr" id="count_wagon"></td><td class="dt-centr" id="avg_gruzp"></td><td class="dt-centr" id="avg_vesg"></td></tr></tbody></table>');
        var $col_nagr = $('<div id="arr-common-report-detali-stat-nagr" class="col-xl-6"></div>');

        var $out_common_detali = nav_tabs_out_cammon.$content.find('div#out-common-detali-tab'); // Панель поиска
        $out_common_detali.append(div_row_detali_stat.$row.append($col_nagr.append($h3).append($tab_nagr))); //.append($bt)
        $out_common_detali.append(div_row_detali.$row.append($('<div id="out-common-report-detali" class="col-xl-12"></div>')));
        // Дабавим закладку на форму
        this.$table_view.append(nav_tabs_out_cammon.$ul).append(nav_tabs_out_cammon.$content);
        //
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------
        // Формируем форму выбора
        var form_out_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_out_setup_select = form_out_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_5_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_5_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        //
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_laden = new this.fe_ui.bs_switch({
            id: 'laden',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_laden', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_laden.$element);
        this.switch_laden = sw_laden.element;
        // Только с грузом
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_accounting = new this.fe_ui.bs_switch({
            id: 'accounting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_accounting', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_accounting.$element);
        this.switch_accounting = sw_accounting.element;
        // Клиентура 
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_client = new this.fe_ui.bs_switch({
            id: 'client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_client.$element);
        this.switch_client = sw_client.element;
        // Без учета клиентуры
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_not_client = new this.fe_ui.bs_switch({
            id: 'not_client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_not_client.$element);
        this.switch_not_client = sw_not_client.element;
        // Платные
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
                //event.preventDefault();
                //if (this.wagon) {
                //    LockScreen(langView('ficcd_mess_run_operation_change_mode_epd', App.Langs));
                //    this.view_wagon_detali(this.wagon)
                //}
                //var res = $(e.currentTarget).prop('checked');
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // вагоны
        var row_setup_1 = new this.fe_ui.bs_row();
        var ta_wagon_nums = new this.fe_ui.bs_textarea({
            id: 'wagon_nums',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_wagon_nums', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_wagon_nums', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_1.$row.append(ta_wagon_nums.$element);
        this.textarea_wagon_nums = ta_wagon_nums.element;
        // основн документы
        var row_setup_2 = new this.fe_ui.bs_row();
        var ta_main_epd_docs = new this.fe_ui.bs_textarea({
            id: 'main_epd_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_main_epd_docs', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_main_epd_docs', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_2.$row.append(ta_main_epd_docs.$element);
        this.textarea_main_epd_docs = ta_main_epd_docs.element;
        // Операторы АМКР
        var row_setup_3 = new this.fe_ui.bs_row();
        var select_operation_amkr = new this.fe_ui.bs_select_multiple({
            id: 'operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {
                //if (value && Number(value) >= 0) {
                //    this.elements.input_number_consignee_code.val(value);
                //    this.form.set_validation_object_ok(null, 'consignee_name', "Ок", true);
                //} else {
                //    this.elements.input_number_consignee_code.val("");
                //    this.form.set_validation_object_error(null, 'consignee_name', langView('ficcd_mess_valid_not_consignee_name', App.Langs), true);
                //}
            }.bind(this),
        });
        row_setup_3.$row.append(select_operation_amkr.$element);
        this.select_operation_amkr = select_operation_amkr.element;
        // ограничение погрузки
        var row_setup_4 = new this.fe_ui.bs_row();
        var select_limiting = new this.fe_ui.bs_select_multiple({
            id: 'limiting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_limiting', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_limiting', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_4.$row.append(select_limiting.$element);
        this.select_limiting = select_limiting.element;
        // Собственник
        var row_setup_5 = new this.fe_ui.bs_row();
        var select_owners = new this.fe_ui.bs_select_multiple({
            id: 'owners',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_owners', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_owners', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_5.$row.append(select_owners.$element);
        this.select_owners = select_owners.element;
        // Род вагона
        var row_setup_6 = new this.fe_ui.bs_row();
        var select_genus = new this.fe_ui.bs_select_multiple({
            id: 'genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_6.$row.append(select_genus.$element);
        this.select_genus = select_genus.element;
        // Цех погрузки
        var row_setup_7 = new this.fe_ui.bs_row();
        var select_out_division = new this.fe_ui.bs_select_multiple({
            id: 'out_division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_7.$row.append(select_out_division.$element);
        this.select_out_division = select_out_division.element;
        // Груз ОТПР
        var row_setup_8 = new this.fe_ui.bs_row();
        var select_out_cargo = new this.fe_ui.bs_select_multiple({
            id: 'out_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_8.$row.append(select_out_cargo.$element);
        this.select_out_cargo = select_out_cargo.element;
        // Группа ОТПР
        var row_setup_9 = new this.fe_ui.bs_row();
        var select_out_cargo_group = new this.fe_ui.bs_select_multiple({
            id: 'out_cargo_group',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_cargo_group', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_cargo_group', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_9.$row.append(select_out_cargo_group.$element);
        this.select_out_cargo_group = select_out_cargo_group.element;
        // Груз ОТПР SAP
        var row_setup_10 = new this.fe_ui.bs_row();
        var select_out_sap_cargo = new this.fe_ui.bs_select_multiple({
            id: 'out_sap_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_sap_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_sap_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_10.$row.append(select_out_sap_cargo.$element);
        this.select_out_sap_cargo = select_out_sap_cargo.element;
        // Станция назначения
        var row_setup_11 = new this.fe_ui.bs_row();
        var select_out_ext_station_to = new this.fe_ui.bs_select_multiple({
            id: 'out_ext_station_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_ext_station_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_ext_station_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_11.$row.append(select_out_ext_station_to.$element);
        this.select_out_ext_station_to = select_out_ext_station_to.element;
        // Дорога
        var row_setup_12 = new this.fe_ui.bs_row();
        var select_out_inlandrailway_to = new this.fe_ui.bs_select_multiple({
            id: 'out_inlandrailway_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_inlandrailway_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_inlandrailway_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_12.$row.append(select_out_inlandrailway_to.$element);
        this.select_out_inlandrailway_to = select_out_inlandrailway_to.element;
        // Погран.переход
        var row_setup_13 = new this.fe_ui.bs_row();
        var select_out_border_checkpoint_to = new this.fe_ui.bs_select_multiple({
            id: 'out_border_checkpoint_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_border_checkpoint_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_border_checkpoint_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_13.$row.append(select_out_border_checkpoint_to.$element);
        this.select_out_border_checkpoint_to = select_out_border_checkpoint_to.element;
        // Груз ПРИБ
        var row_setup_14 = new this.fe_ui.bs_row();
        var select_arr_cargo = new this.fe_ui.bs_select_multiple({
            id: 'arr_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_14.$row.append(select_arr_cargo.$element);
        this.select_arr_cargo = select_arr_cargo.element;
        // Сертификатные данные
        var row_setup_15 = new this.fe_ui.bs_row();
        var select_certification_data = new this.fe_ui.bs_select_multiple({
            id: 'certification_data',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_certification_data', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_certification_data', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_15.$row.append(select_certification_data.$element);
        this.select_certification_data = select_certification_data.element;
        // Группа ПРИБ
        var row_setup_16 = new this.fe_ui.bs_row();
        var select_arr_group_arrival = new this.fe_ui.bs_select_multiple({
            id: 'arr_group_arrival',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_group_arrival', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_group_arrival', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_16.$row.append(select_arr_group_arrival.$element);
        this.select_arr_group_arrival = select_arr_group_arrival.element;
        // Разметка по прибытию
        var row_setup_17 = new this.fe_ui.bs_row();
        var select_arr_condition = new this.fe_ui.bs_select_multiple({
            id: 'arr_condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_17.$row.append(select_arr_condition.$element);
        this.select_arr_condition = select_arr_condition.element;
        // Цех-получатель
        var row_setup_18 = new this.fe_ui.bs_row();
        var select_arr_division = new this.fe_ui.bs_select_multiple({
            id: 'arr_division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_18.$row.append(select_arr_division.$element);
        this.select_arr_division = select_arr_division.element;
        // Станция примыкания ОТПР
        var row_setup_19 = new this.fe_ui.bs_row();
        var select_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_19.$row.append(select_station_amkr.$element);
        this.select_station_amkr = select_station_amkr.element;
        // Плательщик ОТПР
        var row_setup_20 = new this.fe_ui.bs_row();
        var select_payer_sender_name = new this.fe_ui.bs_select_multiple({
            id: 'payer_sender_name',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_payer_sender_name', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_payer_sender_name', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_20.$row.append(select_payer_sender_name.$element);
        this.select_payer_sender_name = select_payer_sender_name.element;
        // Код плат.ОТПР
        var row_setup_21 = new this.fe_ui.bs_row();
        var select_code_payer_sender = new this.fe_ui.bs_select_multiple({
            id: 'code_payer_sender',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_code_payer_sender', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_code_payer_sender', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_21.$row.append(select_code_payer_sender.$element);
        this.select_code_payer_sender = select_code_payer_sender.element;
        //
        this.$form_out_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup_1.$row)
            .append(row_setup_2.$row)
            .append(row_setup_3.$row)
            .append(row_setup_4.$row)
            .append(row_setup_5.$row)
            .append(row_setup_6.$row)
            .append(row_setup_7.$row)
            .append(row_setup_8.$row)
            .append(row_setup_9.$row)
            .append(row_setup_10.$row)
            .append(row_setup_11.$row)
            .append(row_setup_12.$row)
            .append(row_setup_13.$row)
            .append(row_setup_14.$row)
            .append(row_setup_15.$row)
            .append(row_setup_16.$row)
            .append(row_setup_17.$row)
            .append(row_setup_18.$row)
            .append(row_setup_19.$row)
            .append(row_setup_20.$row)
            .append(row_setup_21.$row)
            ;
        this.$setup_select.append(this.$form_out_setup_select);

        // Запускаем 6 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    switch (event.target.id) {
                        case 'out-common-group': {
                            $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust(); // table.columns.adjust().draw();
                            break;
                        };
                        case 'out-common-detali': {
                            this.table_out_common_detali.obj_t_report.columns.adjust().draw();
                            break;
                        };
                    };
                    //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust(); // table.columns.adjust().draw();
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        //
        this.table_out_common_detali = new TTDR('div#out-common-report-detali');         // Создадим экземпляр
        // Инициализация модуля "Таблица прибывающих составов"
        this.table_out_common_detali.init({
            alert: null,
            detali_table: true,
            type_report: 'outgoing_common_detali',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        /*}.bind(this));*/
    };
    // Показать отчет  "Отчет по отправлению (общий)"
    view_td_report.prototype.view_report_5_1 = function (start, stop, is_acts) {
        this.is_acts = is_acts;
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_outgoing_cars', App.Langs));
        // пустые операторы
        var where = {
            start: moment(start).format(format_datetime),
            stop: moment(stop).format(format_datetime),
            laden: false,
            accounting: false,
            client: false,
            not_client: false,
            paid: false,
            nums: null,
            nom_main_docs: null,
            id_operator: null,
            id_limiting: null,
            id_owner: null,
            id_genus: null,
            id_out_division: null,
            id_out_cargo: null,
            id_out_cargo_group: null,
            out_sap_cargo_code: null,
            out_code_ext_station_to: null,
            out_code_inlandrailway_to: null,
            out_code_border_checkpoint: null,
            id_arr_cargo: null,
            id_certification_data: null,
            id_arr_cargo_group: null,
            id_arr_condition: null,
            id_arr_division: null,
            id_station_from: null,
            code_payer_sender: null,
            code_payer_sender_name: null,
            IsActs: this.is_acts,
        };
        // Загрузим данные
        this.load_select_report_5_1(where, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные
    view_td_report.prototype.load_select_report_5_1 = function (where, callback) {
        if (!where) {
            var cur_where = {
                start: moment(this.start).format(format_datetime),
                stop: moment(this.stop).format(format_datetime),
                laden: this.switch_laden.val(),
                accounting: this.switch_accounting.val(),
                client: this.switch_client.val(),
                not_client: this.switch_not_client.val(),
                paid: this.switch_paid.val(),
                nums: this.nums,
                nom_main_docs: this.main_epd_docs,
                id_operator: this.select_operation_amkr.val(),                          // Операторы АМКР
                id_limiting: this.select_limiting.val(),                                // Ограничение погрузки
                id_owner: this.select_owners.val(),                                // Собственник
                id_genus: this.select_genus.val(),                                      // Род вагона
                id_out_division: this.select_out_division.val(),                        // Цех погрузки
                id_out_cargo: this.select_out_cargo.val(),                              // Груз ОТПР
                id_out_cargo_group: this.select_out_cargo_group.val(),                  // Группа ОТПР
                out_sap_cargo_code: this.select_out_sap_cargo.val(),                    // Груз ОТПР SAP
                out_code_ext_station_to: this.select_out_ext_station_to.val(),          // Станция назначения
                out_code_inlandrailway_to: this.select_out_inlandrailway_to.val(),      // Дорога
                out_code_border_checkpoint: this.select_out_border_checkpoint_to.val(), // Погран.переход
                id_arr_cargo: this.select_arr_cargo.val(),                              // Груз ПРИБ
                id_certification_data: this.select_certification_data.val(),            // Сертификатные данные
                id_arr_cargo_group: this.select_arr_group_arrival.val(),              // Группа ПРИБ
                id_arr_condition: this.select_arr_condition.val(),                      // Разметка по прибытию
                id_arr_division: this.select_arr_division.val(),                        // Цех-получатель
                id_station_from: this.select_station_amkr.val(),                        // Станция примыкания ОТПР
                code_payer_sender_name: this.select_payer_sender_name.val(),                 // Плательщик ОТПР
                code_payer_sender: this.select_code_payer_sender.val(),            // Код плат.ОТПР
                IsActs: this.is_acts,
            };
        } else {
            cur_where = where;
        };
        this.ids_wsd.postReportOutgoingWagonOfWhere(cur_where, function (result_wagons) {
            this.wagons_outgoing = result_wagons;
            // Обновим спсисок вагонов распарсиным ЭПД
            //wagons_get_out_epd_async.call(this, this.wagons_outgoing, function () {
            // Проверим если это выбор толко по времени (первый выбор) тогда клонируем
            if (where) {
                this.clone_wagons_outgoing = JSON.parse(JSON.stringify(this.wagons_outgoing));
            }
            // Обработать и показать данные
            this.process_data_view_report_5_1(this.wagons_outgoing, cur_where);
            // Выход
            if (typeof callback === 'function') {
                callback();
            }
            //}.bind(this));
        }.bind(this));
    };
    // Обработать и показать данные
    view_td_report.prototype.process_data_view_report_5_1 = function (wagons_outgoing, where) {
        // Продолжим
        this.list_operators_wagons = [];
        this.list_limiting = [];
        this.list_owners = [];
        this.list_genus = [];
        this.list_out_division = [];
        this.list_out_cargo = [];
        this.list_out_cargo_group = [];
        this.list_out_sap_cargo = [];
        this.list_out_ext_station_to = [];
        this.list_out_inlandrailway_to = [];
        this.list_out_border_checkpoint = [];
        this.list_arr_cargo = [];
        this.list_certification_data = [];
        this.list_arr_cargo_group = [];
        this.list_arr_condition = [];
        this.list_arr_division = [];
        this.list_station_from = [];
        this.list_payer_sender_name = [];
        this.list_code_payer_sender = [];
        this.list_group_sostav_outgoing = [];
        // выборка для списков отчета
        var count_load = 0;
        var sum_gruzp = 0;
        var sum_vesg = 0;

        $.each(wagons_outgoing, function (key, value) {
            var res = list_groups_cargo.indexOf(value.outgoing_uz_vagon_id_group);
            if (res === -1) {
                count_load++;
                sum_vesg += value.outgoing_uz_vagon_vesg;
                sum_gruzp += value.outgoing_uz_vagon_gruzp;
            }
            // Список групп отправки
            var group_sostav_outgoing = this.list_group_sostav_outgoing.find(function (o) { return o.id === value.outgoing_sostav_id }.bind(this));
            if (!group_sostav_outgoing) {
                var sostav_outgoing = wagons_outgoing.filter(function (i) { return i.outgoing_sostav_id === value.outgoing_sostav_id }.bind(this));
                var sostav_cargo_outgoing = [];
                $.each(sostav_outgoing, function (i, el) {
                    var cargo_outgoing = sostav_cargo_outgoing.find(function (o) { return o.id_cargo === el.outgoing_uz_vagon_id_cargo }.bind(this))
                    var sum_vesg = 0;
                    if (!cargo_outgoing) {
                        sum_vesg = 0;
                        var cargo_list = sostav_outgoing.filter(function (i) { return i.outgoing_uz_vagon_id_cargo === el.outgoing_uz_vagon_id_cargo }.bind(this));
                        // Просумируем 
                        $.each(cargo_list, function (i1, el1) {
                            sum_vesg += el1.outgoing_uz_vagon_vesg;
                            //if (el1 && el1.otpr && el1.otpr.vagon && el1.otpr.vagon.length > 0 && el1.otpr.vagon[0].collect_v && el1.otpr.vagon[0].collect_v.length > 0 && el1.otpr.vagon[0].collect_v[0].vesg) {
                            //    sum_vesg += el1.otpr.vagon[0].collect_v[0].vesg;
                            //}
                        }.bind(this));
                        sostav_cargo_outgoing.push({ id_cargo: el.outgoing_uz_vagon_id_cargo, cargo_name: el['outgoing_uz_vagon_cargo_name_' + App.Lang], count: cargo_list.length, sum_vesg: sum_vesg });
                    };
                }.bind(this));
                this.list_group_sostav_outgoing.push({ id: value.outgoing_sostav_id, date_outgoing: value.outgoing_sostav_date_outgoing, const_wagon: sostav_outgoing.length, count_account_balance_wagon: sostav_outgoing.filter(function (i) { return i.account_balance }.bind(this)).length, cargo_group: sostav_cargo_outgoing });

            }

            // выборка для списков отчета
            var ow = this.list_operators_wagons.find(function (o) { return o.value === value.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator }.bind(this));
            if (!ow) {
                this.list_operators_wagons.push({ value: value.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator, text: value['outgoing_uz_vagon_outgoing_wagons_rent_group_operators_' + App.Lang] });
            }
            var lm = this.list_limiting.find(function (o) { return o.value === value.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting }.bind(this));
            if (!lm) {
                this.list_limiting.push({ value: value.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting, text: value['outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_' + App.Lang] });
            }
            var own = this.list_owners.find(function (o) { return o.value === value.outgoing_uz_vagon_id_owner }.bind(this));
            if (!own) {
                this.list_owners.push({ value: value.outgoing_uz_vagon_id_owner, text: value['outgoing_uz_vagon_owner_wagon_abbr_' + App.Lang] });
            }
            var genus = this.list_genus.find(function (o) { return o.value === value.outgoing_uz_vagon_id_genus }.bind(this));
            if (!genus) {
                this.list_genus.push({ value: value.outgoing_uz_vagon_id_genus, text: value['outgoing_uz_vagon_rod_abbr_' + App.Lang] });
            }
            // Цех погрузки
            var out_dv = this.list_out_division.find(function (o) { return o.value === value.outgoing_uz_vagon_id_division }.bind(this));
            if (!out_dv) {
                this.list_out_division.push({ value: value.outgoing_uz_vagon_id_division, text: value['outgoing_uz_vagon_division_abbr_' + App.Lang] });
            }
            // Груз ОТПР
            var out_cargo = this.list_out_cargo.find(function (o) { return o.value === value.outgoing_uz_vagon_id_cargo }.bind(this));
            if (!out_cargo) {
                this.list_out_cargo.push({ value: value.outgoing_uz_vagon_id_cargo, text: value['outgoing_uz_vagon_cargo_name_' + App.Lang] });
            }
            // Группа ОТПР
            var out_cargo_group = this.list_out_cargo_group.find(function (o) { return o.value === value.outgoing_uz_vagon_id_group }.bind(this));
            if (!out_cargo_group) {
                this.list_out_cargo_group.push({ value: value.outgoing_uz_vagon_id_group, text: value['outgoing_uz_vagon_cargo_group_name_' + App.Lang] });
            }
            // Груз ОТПР SAP
            var out_sap_cargo = this.list_out_sap_cargo.find(function (o) { return o.value === value.sap_outgoing_supply_cargo_code }.bind(this));
            if (!out_sap_cargo) {
                this.list_out_sap_cargo.push({ value: value.sap_outgoing_supply_cargo_code, text: value.sap_outgoing_supply_cargo_name });
            }
            // Станция назначения
            var ext_station_to = this.list_out_ext_station_to.find(function (o) { return o.value === value.outgoing_uz_document_code_stn_to }.bind(this));
            if (!ext_station_to) {
                this.list_out_ext_station_to.push({ value: value.outgoing_uz_document_code_stn_to, text: value['outgoing_uz_document_station_to_name_' + App.Lang] });
            }
            // Дорога
            var out_inlandrailway_to = this.list_out_inlandrailway_to.find(function (o) { return o.value === value.outgoing_uz_document_to_code_inlandrailway }.bind(this));
            if (!out_inlandrailway_to) {
                this.list_out_inlandrailway_to.push({ value: value.outgoing_uz_document_to_code_inlandrailway, text: value['outgoing_uz_document_to_inlandrailway_abbr_' + App.Lang] });
            }
            // Погран.переход
            var out_border_checkpoint = this.list_out_border_checkpoint.find(function (o) { return o.value === value.outgoing_uz_document_code_border_checkpoint }.bind(this));
            if (!out_border_checkpoint) {
                this.list_out_border_checkpoint.push({ value: value.outgoing_uz_document_code_border_checkpoint, text: value['outgoing_uz_document_border_checkpoint_station_name_' + App.Lang] });
            }
            // Груз ПРИБ
            var arr_cargo = this.list_arr_cargo.find(function (o) { return o.value === value.arrival_uz_vagon_id_cargo }.bind(this));
            if (!arr_cargo) {
                this.list_arr_cargo.push({ value: value.arrival_uz_vagon_id_cargo, text: value['arrival_uz_vagon_cargo_name_' + App.Lang] });
            }
            // Сертификатные данные
            var certification_data = this.list_certification_data.find(function (o) { return o.value === value.arrival_uz_vagon_id_certification_data }.bind(this));
            if (!certification_data) {
                this.list_certification_data.push({ value: value.arrival_uz_vagon_id_certification_data, text: value['arrival_uz_vagon_sertification_data_' + App.Lang] });
            }
            // Группа ПРИБ.
            var cargo_group = this.list_arr_cargo_group.find(function (o) { return o.value === value.arrival_uz_vagon_id_group }.bind(this));
            if (!cargo_group) {
                this.list_arr_cargo_group.push({ value: value.arrival_uz_vagon_id_group, text: value['arrival_uz_vagon_cargo_group_name_' + App.Lang] });
            }
            // Разметка по прибытию
            var arr_condition = this.list_arr_condition.find(function (o) { return o.value === value.arrival_uz_vagon_id_condition }.bind(this));
            if (!arr_condition) {
                this.list_arr_condition.push({ value: value.arrival_uz_vagon_id_condition, text: value['arrival_uz_vagon_condition_abbr_' + App.Lang] });
            }
            // Цех-получатель
            var arr_division = this.list_arr_division.find(function (o) { return o.value === value.arrival_uz_vagon_id_division_on_amkr }.bind(this));
            if (!arr_division) {
                this.list_arr_division.push({ value: value.arrival_uz_vagon_id_division_on_amkr, text: value['arrival_uz_vagon_division_abbr_' + App.Lang] });
            }
            // Станция примыкания ОТПР
            var station_from = this.list_station_from.find(function (o) { return o.value === value.outgoing_sostav_id_station_from }.bind(this));
            if (!station_from) {
                this.list_station_from.push({ value: value.outgoing_sostav_id_station_from, text: value['outgoing_sostav_from_station_amkr_abbr_' + App.Lang] });
            }
            // Плательщик ОТПР
            var payer_sender_name = this.list_payer_sender_name.find(function (o) { return o.value === value.outgoing_uz_document_code_payer }.bind(this));
            if (!payer_sender_name) {
                this.list_payer_sender_name.push({ value: value.outgoing_uz_document_code_payer, text: value['outgoing_uz_document_payer_name_' + App.Lang] });
            }
            // Код плат.ОТПР
            var code_payer_sender = this.list_code_payer_sender.find(function (o) { return o.value === value.outgoing_uz_document_code_payer }.bind(this));
            if (!code_payer_sender) {
                this.list_code_payer_sender.push({ value: value.outgoing_uz_document_code_payer, text: value.outgoing_uz_document_code_payer });
            }
        }.bind(this));
        // Отсортируем по алфавиту
        this.list_operators_wagons = this.sort_text(this.list_operators_wagons, "text");
        this.list_limiting = this.sort_text(this.list_limiting, "text");
        this.list_owners = this.sort_text(this.list_owners, "text");
        this.list_genus = this.sort_text(this.list_genus, "text");
        this.list_out_division = this.sort_text(this.list_out_division, "text");
        this.list_out_cargo = this.sort_text(this.list_out_cargo, "text");
        this.list_out_cargo_group = this.sort_text(this.list_out_cargo_group, "text");
        this.list_out_sap_cargo = this.sort_text(this.list_out_sap_cargo, "text");
        this.list_out_ext_station_to = this.sort_text(this.list_out_ext_station_to, "text");
        this.list_out_inlandrailway_to = this.sort_text(this.list_out_inlandrailway_to, "text");
        this.list_out_border_checkpoint = this.sort_text(this.list_out_border_checkpoint, "text");
        this.list_arr_cargo = this.sort_text(this.list_arr_cargo, "text");
        this.list_certification_data = this.sort_text(this.list_certification_data, "text");
        this.list_arr_cargo_group = this.sort_text(this.list_arr_cargo_group, "text");
        this.list_arr_condition = this.sort_text(this.list_arr_condition, "text");
        this.list_arr_division = this.sort_text(this.list_arr_division, "text");
        this.list_station_from = this.sort_text(this.list_station_from, "text");
        this.list_payer_sender_name = this.sort_text(this.list_payer_sender_name, "text");
        this.list_code_payer_sender = this.sort_text(this.list_code_payer_sender, "text");
        //
        this.view_table_group_sostav_outgoing(this.list_group_sostav_outgoing);

        this.table_out_common_detali.view(wagons_outgoing);

        // обновим Стат. нагр
        var avg_gruzp = 0;
        var avg_vesg = 0;

        if (count_load > 0) {
            avg_gruzp = sum_gruzp > 0 ? sum_gruzp / count_load : 0;
            avg_vesg = sum_vesg > 0 ? (sum_vesg / 1000) / count_load : 0;
        };

        $('td#count_wagon').text(count_load);
        $('td#avg_gruzp').text(avg_gruzp.toFixed(2));
        $('td#avg_vesg').text(avg_vesg.toFixed(2));

        // обновление списков отчета
        if (!where || !where.id_operator || where.id_operator.length === 0) {
            this.select_operation_amkr.update(this.list_operators_wagons, -1);
        }
        if (!where || !where.id_limiting || where.id_limiting.length === 0) {
            this.select_limiting.update(this.list_limiting, -1);
        }
        if (!where || !where.id_owner || where.id_owner.length === 0) {
            this.select_owners.update(this.list_owners, -1);
        }
        if (!where || !where.id_genus || where.id_genus.length === 0) {
            this.select_genus.update(this.list_genus, -1);
        }
        if (!where || !where.id_out_division || where.id_out_division.length === 0) {
            this.select_out_division.update(this.list_out_division, -1);
        }
        if (!where || !where.id_out_cargo || where.id_out_cargo.length === 0) {
            this.select_out_cargo.update(this.list_out_cargo, -1);
        }
        if (!where || !where.id_out_cargo_group || where.id_out_cargo_group.length === 0) {
            this.select_out_cargo_group.update(this.list_out_cargo_group, -1);
        }
        if (!where || !where.out_sap_cargo_code || where.out_sap_cargo_code.length === 0) {
            this.select_out_sap_cargo.update(this.list_out_sap_cargo, -1);
        }
        if (!where || !where.out_code_ext_station_to || where.out_code_ext_station_to.length === 0) {
            this.select_out_ext_station_to.update(this.list_out_ext_station_to, -1);
        }
        if (!where || !where.out_code_inlandrailway_to || where.out_code_inlandrailway_to.length === 0) {
            this.select_out_inlandrailway_to.update(this.list_out_inlandrailway_to, -1);
        }
        if (!where || !where.out_code_border_checkpoint || where.out_code_border_checkpoint.length === 0) {
            this.select_out_border_checkpoint_to.update(this.list_out_border_checkpoint, -1);
        }
        if (!where || !where.id_arr_cargo || where.id_arr_cargo.length === 0) {
            this.select_arr_cargo.update(this.list_arr_cargo, -1);
        }
        if (!where || !where.id_certification_data || where.id_certification_data.length === 0) {
            this.select_certification_data.update(this.list_certification_data, -1);
        }
        if (!where || !where.id_arr_cargo_group || where.id_arr_cargo_group.length === 0) {
            this.select_arr_group_arrival.update(this.list_arr_cargo, -1);
        }
        if (!where || !where.id_arr_condition || where.id_arr_condition.length === 0) {
            this.select_arr_condition.update(this.list_arr_condition, -1);
        }
        if (!where || !where.id_arr_division || where.id_arr_division.length === 0) {
            this.select_arr_division.update(this.list_arr_division, -1);
        }
        if (!where || !where.id_station_from || where.id_station_from.length === 0) {
            this.select_station_amkr.update(this.list_station_from, -1);
        }
        if (!where || !where.code_payer_sender_name || where.code_payer_sender_name.length === 0) {
            this.select_payer_sender_name.update(this.list_payer_sender_name, -1);
        }
        if (!where || !where.code_payer_sender || where.code_payer_sender.length === 0) {
            this.select_code_payer_sender.update(this.list_code_payer_sender, -1);
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_5_1 = function () {
        this.out_clear();
        this.nums = null;
        var list_nums = this.textarea_wagon_nums.val();
        if (list_nums !== '') {
            this.nums = is_valid_nums(list_nums, this.settings.alert, false, true);
            if (!this.nums) return;
        };
        this.main_epd_docs = null;
        var list_main_epd_docs = this.textarea_main_epd_docs.val();
        if (list_main_epd_docs !== '') {
            this.main_epd_docs = is_valid_docs(list_main_epd_docs, this.settings.alert, true);
            if (!this.main_epd_docs) return;
        };

        LockScreen(langView('vtdr_load_outgoing_cars', App.Langs));
        this.load_select_report_5_1(null, function () {
            LockScreenOff();
        }.bind(this))
    };
    // Показать данные по группам отправки
    view_td_report.prototype.view_table_group_sostav_outgoing = function (list_group_sostav_outgoing) {
        this.$div_group_sostav.empty();
        var table_group_sostav = new this.fe_ui.table({
            id: 'table-group-sostav',
            class: 'display compact cell-border row-border hover',
            title: null,
        });
        this.table_group_sostav = table_group_sostav.$table;
        var $thead = $('<thead></thead>');
        var $tr_h = $('<tr></tr>');
        var $th1 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Дата сдачи'
        });
        var $th2 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Общее кол.'
        });
        var $th3 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Кол. уч. ваг.'
        });
        var $th4 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Род груза'
        });
        var $th5 = $('<th></th>', {
            class: 'dt-head-center',
            text: 'Вес по ЭПД, тн.'
        });
        $thead.append($tr_h.append($th1).append($th2).append($th3).append($th4).append($th5));
        var $tbody = $('<tbody></tbody>');
        this.table_group_sostav.append($thead)
        //
        var const_wagon = 0;
        var count_account_balance_wagon = 0;
        var sum_vesg = 0;

        if (list_group_sostav_outgoing && list_group_sostav_outgoing.length > 0) {
            $.each(list_group_sostav_outgoing, function (i, el) {
                var $tr_d = $('<tr></tr>', {
                    id: el.id
                });
                $.each(el.cargo_group, function (i1, el1) {
                    if (i1 === 0) {
                        var $tr_d = $('<tr></tr>', {
                            id: el.id
                        });
                        var $td_date_outgoing = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.date_outgoing ? moment(el.date_outgoing).format(format_datetime) : ''
                        });
                        var $td_const_wagon = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.const_wagon
                        });
                        var $td_count_account_balance_wagon = $('<td></td>', {
                            rowspan: el.cargo_group.length,
                            class: 'dt-body-center',
                            text: el.count_account_balance_wagon
                        });
                        var $td_cargo = $('<td></td>', {
                            class: 'dt-body-left',
                            text: el1.count + '-' + el1.cargo_name
                        });
                        var $td_sum_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg ? Number(el1.sum_vesg / 1000).toFixed(3) : 0.000
                        });
                        $tr_d.append($td_date_outgoing).append($td_const_wagon).append($td_count_account_balance_wagon).append($td_cargo).append($td_sum_vesg);
                        $tbody.append($tr_d);
                        const_wagon += el.const_wagon;
                        count_account_balance_wagon += el.count_account_balance_wagon;
                    } else {
                        var $tr_d = $('<tr></tr>');
                        var $td_date_outgoing = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_const_wagon = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_count_account_balance_wagon = $('<td></td>', {
                            class: 'dt-body-center',
                            style: 'display: none;'
                        });
                        var $td_cargo = $('<td></td>', {
                            class: 'dt-body-left',
                            text: el1.count + '-' + el1.cargo_name
                        });
                        var $td_sum_vesg = $('<td></td>', {
                            class: 'dt-body-right',
                            text: el1.sum_vesg ? Number(el1.sum_vesg / 1000).toFixed(3) : 0.000
                        });
                        $tr_d.append($td_date_outgoing).append($td_const_wagon).append($td_count_account_balance_wagon).append($td_cargo).append($td_sum_vesg);
                        $tbody.append($tr_d);
                    }
                    sum_vesg += el1.sum_vesg;
                }.bind(this));
            }.bind(this));
        }
        this.table_group_sostav.append($tbody);
        var $tfoot = $('<tfoot></tfoot>');
        var $tr_f = $('<tr></tr>');
        var $tdf1 = $('<td></td>', {
            class: 'dt-right',
            text: 'ИТОГО:'
        });
        var $tdf2 = $('<td></td>', {
            class: 'dt-center',
            text: Number(const_wagon)
        });
        var $tdf3 = $('<td></td>', {
            class: 'dt-center',
            text: Number(count_account_balance_wagon)
        });
        var $tdf4 = $('<td></td>');
        var $tdf5 = $('<td></td>', {
            class: 'dt-right',
            text: sum_vesg > 0 ? Number(sum_vesg / 1000).toFixed(3) : 0
        });
        $tfoot.append($tr_f.append($tdf1).append($tdf2).append($tdf3).append($tdf4).append($tdf5));
        this.table_group_sostav.append($tfoot);
        this.$div_group_sostav.append(this.table_group_sostav);
        this.table_group_sostav.DataTable({
            "lengthMenu": null,
            "pageLength": null,
            "deferRender": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "info": true,
            select: false,
            "autoWidth": false,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            dom: 'Bfrtip',
            stateSave: false,
            buttons: {
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
        });

    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_5_1 = function () {
        if (this.switch_laden) { this.switch_laden.val(false); }
        if (this.switch_accounting) { this.switch_accounting.val(false); }
        if (this.switch_client) { this.switch_client.val(false); }
        if (this.switch_not_client) { this.switch_not_client.val(false); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.textarea_wagon_nums) { this.textarea_wagon_nums.val(''); }
        if (this.textarea_main_epd_docs) { this.textarea_main_epd_docs.val(''); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_limiting) { this.select_limiting.val(-1); }
        if (this.select_owners) { this.select_owners.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_out_division) { this.select_out_division.val(-1); }
        if (this.select_out_cargo) { this.select_out_cargo.val(-1); }
        if (this.select_out_cargo_group) { this.select_out_cargo_group.val(-1); }
        if (this.select_out_sap_cargo) { this.select_out_sap_cargo.val(-1); }
        if (this.select_out_ext_station_to) { this.select_out_ext_station_to.val(-1); }
        if (this.select_out_inlandrailway_to) { this.select_out_inlandrailway_to.val(-1); }
        if (this.select_out_border_checkpoint_to) { this.select_out_border_checkpoint_to.val(-1); }
        if (this.select_arr_cargo) { this.select_arr_cargo.val(-1); }
        if (this.select_certification_data) { this.select_certification_data.val(-1); }
        if (this.select_arr_group_arrival) { this.select_arr_group_arrival.val(-1); }
        if (this.select_arr_condition) { this.select_arr_condition.val(-1); }
        if (this.select_arr_division) { this.select_arr_division.val(-1); }
        if (this.select_station_amkr) { this.select_station_amkr.val(-1); }
        if (this.select_payer_sender_name) { this.select_payer_sender_name.val(-1); }
        if (this.select_code_payer_sender) { this.select_code_payer_sender.val(-1); }
        // Обработать и показать данные
        this.process_data_view_report_5_1(this.clone_wagons_outgoing, null);
        LockScreenOff();
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_5_1 = function () {
        if (this.switch_laden) { this.switch_laden.val(false); }
        if (this.switch_accounting) { this.switch_accounting.val(false); }
        if (this.switch_client) { this.switch_client.val(false); }
        if (this.switch_not_client) { this.switch_not_client.val(false); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.textarea_wagon_nums) { this.textarea_wagon_nums.val(''); }
        if (this.textarea_main_epd_docs) { this.textarea_main_epd_docs.val(''); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_limiting) { this.select_limiting.val(-1); }
        if (this.select_owners) { this.select_owners.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_out_division) { this.select_out_division.val(-1); }
        if (this.select_out_cargo) { this.select_out_cargo.val(-1); }
        if (this.select_out_cargo_group) { this.select_out_cargo_group.val(-1); }
        if (this.select_out_sap_cargo) { this.select_out_sap_cargo.val(-1); }
        if (this.select_out_ext_station_to) { this.select_out_ext_station_to.val(-1); }
        if (this.select_out_inlandrailway_to) { this.select_out_inlandrailway_to.val(-1); }
        if (this.select_out_border_checkpoint_to) { this.select_out_border_checkpoint_to.val(-1); }
        if (this.select_arr_cargo) { this.select_arr_cargo.val(-1); }
        if (this.select_certification_data) { this.select_certification_data.val(-1); }
        if (this.select_arr_group_arrival) { this.select_arr_group_arrival.val(-1); }
        if (this.select_arr_condition) { this.select_arr_condition.val(-1); }
        if (this.select_arr_division) { this.select_arr_division.val(-1); }
        if (this.select_station_amkr) { this.select_station_amkr.val(-1); }
        if (this.select_payer_sender_name) { this.select_payer_sender_name.val(-1); }
        if (this.select_code_payer_sender) { this.select_code_payer_sender.val(-1); }
        if (this.table_out_common_detali) {
            this.wagons_outgoing = [];
            this.clone_wagons_outgoing = [];
            this.process_data_view_report_5_1(this.clone_wagons_outgoing, null);
            LockScreenOff();
        }
    };
    //------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Отправление ИТОГ"
    view_td_report.prototype.init_report_6_1 = function () {
        this.is_acts = false;
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 6;        // номер отчета
        this.report_panel = 0;  // номер под-отчета
        this.chart_data_total_outgoing_cargo_operator = [];
        this.chart_data_total_operator_amkr = [];
        this.chart_data_total_division_metals = [];
        this.chart_data_total_division_cargo1 = [];
        this.chart_data_total_division_cargo2 = [];
        this.chart_data_total_ext_station_ukr = [];
        this.chart_data_total_ext_station_exp = [];
        //...
        this.chart_data_total_cargo_metall = [];
        this.chart_data_total_operators = [];
        this.chart_data_total_operators_cargo = [];

        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_6_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                     // Инициализация формы выбора периода отчетов
        //------
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        //var fieldset_setup_detali = new this.fe_ui.fieldset({
        //    class: 'border-info mt-1',
        //    legend: null,
        //    class_legend: 'border-info',
        //});
        //this.$setup_detali_select = fieldset_setup_detali.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select);//.append(this.$setup_detali_select)
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);
        // ---------------------------------------------------------------
        // Формируем форму выбора 
        var form_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_setup_select = form_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_6_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_6_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        // Только с грузом
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_laden = new this.fe_ui.bs_switch({
            id: 'laden',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_laden', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_laden.$element);
        this.switch_laden = sw_laden.element;
        // Учетные вагоны
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_accounting = new this.fe_ui.bs_switch({
            id: 'accounting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_accounting', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_accounting.$element);
        this.switch_accounting = sw_accounting.element;
        // Клиентура 
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_client = new this.fe_ui.bs_switch({
            id: 'client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_client.$element);
        this.switch_client = sw_client.element;
        // Без учета клиентуры
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_not_client = new this.fe_ui.bs_switch({
            id: 'not_client',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_client', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_not_client.$element);
        this.switch_not_client = sw_not_client.element;
        // Платные
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // ШУ
        var row_setup_sw6 = new this.fe_ui.bs_row();
        var sw_shu = new this.fe_ui.bs_switch({
            id: 'shu',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_shu', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
            }.bind(this),
        });
        row_setup_sw6.$row.append(sw_shu.$element);
        this.switch_shu = sw_shu.element;
        // Оператор по отправке
        var row_setup6_1 = new this.fe_ui.bs_row();
        var select_operation_amkr = new this.fe_ui.bs_select_multiple({
            id: 'operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
            }.bind(this),
            element_check: function (value) {
            }.bind(this),
        });
        row_setup6_1.$row.append(select_operation_amkr.$element);
        this.select_operation_amkr = select_operation_amkr.element;
        // ограничение погрузки
        var row_setup6_2 = new this.fe_ui.bs_row();
        var select_limiting = new this.fe_ui.bs_select_multiple({
            id: 'limiting',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_limiting', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_limiting', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup6_2.$row.append(select_limiting.$element);
        this.select_limiting = select_limiting.element;
        // Цех погрузки
        var row_setup6_3 = new this.fe_ui.bs_row();
        var select_out_division = new this.fe_ui.bs_select_multiple({
            id: 'out_division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup6_3.$row.append(select_out_division.$element);
        this.select_out_division = select_out_division.element;
        // Груз ОТПР
        var row_setup6_4 = new this.fe_ui.bs_row();
        var select_out_cargo = new this.fe_ui.bs_select_multiple({
            id: 'out_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup6_4.$row.append(select_out_cargo.$element);
        this.select_out_cargo = select_out_cargo.element;
        // Станция назначения
        var row_setup6_5 = new this.fe_ui.bs_row();
        var select_out_ext_station_to = new this.fe_ui.bs_select_multiple({
            id: 'out_ext_station_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_ext_station_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_ext_station_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup6_5.$row.append(select_out_ext_station_to.$element);
        this.select_out_ext_station_to = select_out_ext_station_to.element;
        // Станция примыкания
        var row_setup6_6 = new this.fe_ui.bs_row();
        var select_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                // var code = Number($(e.currentTarget).val());
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup6_6.$row.append(select_station_amkr.$element);
        this.select_station_amkr = select_station_amkr.element;
        //
        this.$form_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup_sw6.$row)
            .append(row_setup6_1.$row)
            .append(row_setup6_2.$row)
            .append(row_setup6_3.$row)
            .append(row_setup6_4.$row)
            .append(row_setup6_5.$row)
            .append(row_setup6_6.$row)
            ;
        this.$setup_select.append(this.$form_setup_select);
        //----------------------------------------------------------------
        // Создадим панель выбора отчета
        this.nav_tabs_out_total = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-out-total',
            class_nav: null,
            id_content: 'tab-out-total-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'out-total-cargo',
                    aria_controls: 'out-total-cargo-tab',
                    label: langView('vtdr_label_tab_out_total_cargo', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-total-operator-amkr',
                    aria_controls: 'out-total-operator-amkr-tab',
                    label: langView('vtdr_label_tab_out_total_operator_amkr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-total-division-amkr',
                    aria_controls: 'out-total-division-amkr-tab',
                    label: langView('vtdr_label_tab_out_total_division_amkr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-total-ext-station',
                    aria_controls: 'out-total-ext-station-tab',
                    label: langView('vtdr_label_tab_out_total_ext_station', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-total-cargo-metall',
                    aria_controls: 'out-total-cargo-metall-tab',
                    label: langView('vtdr_label_tab_out_total_cargo_metall', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'out-total-operators',
                    aria_controls: 'out-total-operators-tab',
                    label: langView('vtdr_label_tab_out_total_operators', App.Langs),
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        //----------------------------------------
        // Закладка Груз ОТПР
        this.init_panel_vertical_report(this.nav_tabs_out_total, 'out-total-cargo-tab', 'outgoing-cargo-operator');
        // Закладка Оператор по ОТПР
        //this.init_panel_vertical_report(this.nav_tabs_out_total, 'out-total-operator-amkr-tab', 'outgoing-operator-amkr');
        this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-operator-amkr-tab', 'outgoing-operator-amkr', 5, 7);
        // Закладка Цех-грузоотправитель
        //this.init_panel_vertical_report(this.nav_tabs_out_total, 'out-total-division-amkr-tab', 'outgoing-division-amkr');
        this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-division-amkr-tab', 'outgoing-total-division-metall', 6, 6);
        this.init_panel_horizontal_char2_report(this.nav_tabs_out_total, 'out-total-division-amkr-tab', 'outgoing-total-division-cargo', 6, 6);
        //this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-division-amkr-tab', 'outgoing-total-division-cargo', 5, 7);
        // Закладка Отчет об отгруженной продукции предприятия.
        this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-ext-station-tab', 'outgoing-total-ext-station', 6, 6);
        //this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-ext-station-tab', 'outgoing-total-ext-station-ukr', 5, 7);
        //this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-ext-station-tab', 'outgoing-total-ext-station-exp', 5, 7);
        // Закладка Металл ОТПР
        //this.init_panel_vertical_report(this.nav_tabs_out_total, 'out-total-cargo-metall-tab', 'outgoing-cargo-metall');
        this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-cargo-metall-tab', 'outgoing-total-cargo-metall', 5, 7);
        // Закладка ИТОГ оператор
        //this.init_panel_vertical_report(this.nav_tabs_out_total, 'out-total-operators-tab', 'outgoing-total-operators');
        this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-operators-tab', 'outgoing-total-operators', 5, 7);
        this.init_panel_horizontal_report(this.nav_tabs_out_total, 'out-total-operators-tab', 'outgoing-total-operators-cargo', 5, 7);
        //-------------------------------------------
        // Дабавим закладку на форму
        this.$table_view.append(this.nav_tabs_out_total.$ul).append(this.nav_tabs_out_total.$content);
        //-----------------------------------------------------------------
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем 18 процесса инициализации (паралельно)
        var process = 17;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;
                //this.view_setup_detali_report_6_1(this.report_panel);
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    switch (event.target.id) {
                        case 'out-total-cargo': {
                            this.report_panel = 0;

                            this.view_chart_total_outgoing_cargo_operator();
                            break;
                        };
                        case 'out-total-operator-amkr': {
                            this.report_panel = 1;
                            this.view_chart_total_operator_amkr();
                            break;
                        };
                        case 'out-total-division-amkr': {
                            this.report_panel = 2;
                            this.view_chart_total_division_metals();
                            this.view_chart_total_division_cargo();
                            break;
                        };
                        case 'out-total-ext-station': {
                            this.report_panel = 3;
                            this.view_chart_total_ext_station();
                            //this.view_chart_total_ext_station_ukr();
                            //this.view_chart_total_ext_station_exp();

                            break;
                        };
                        case 'out-total-cargo-metall': {
                            this.report_panel = 4;
                            this.view_chart_total_cargo_metall()
                            break;
                        };
                        case 'out-total-operators': {
                            this.report_panel = 5;

                            this.view_chart_total_operators();
                            this.view_chart_total_operators_cargo()
                            break;
                        };
                    };
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db(['cargo_out_group'], false, function (result) {
        //-----------------------------------------------
        // Таблица-Груз по Оператору АМКР
        this.table_total_outgoing_cargo_operator = new TTDR('div#outgoing-cargo-operator');         // Создадим экземпляр
        this.table_total_outgoing_cargo_operator.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_cargo_operator',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_exploding_pie_chart
        this.chart_total_outgoing_cargo_operator = new CAM('div#outgoing-cargo-operator-chart');         // Создадим экземпляр
        this.chart_total_outgoing_cargo_operator.init({
            alert: null,
            type_chart: 'stacked_column_chart_percent',     //pie_exploding_pie_chart   stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Груз по Оператор по ОТПР
        this.table_total_operator_amkr = new TTDR('div#outgoing-operator-amkr');         // Создадим экземпляр
        this.table_total_operator_amkr.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_cargo_ext_station',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_exploding_pie_chart
        this.chart_total_operator_amkr = new CAM('div#outgoing-operator-amkr-chart');         // Создадим экземпляр
        this.chart_total_operator_amkr.init({
            alert: null,
            type_chart: 'partitioned_bar_chart',     //stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Грузоотправители по черным металам
        this.table_total_division_metals = new TTDR('div#outgoing-total-division-metall');         // Создадим экземпляр
        this.table_total_division_metals.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_total_division_metall',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_chart
        this.chart_total_division_metals = new CAM('div#outgoing-total-division-metall-chart');         // Создадим экземпляр
        this.chart_total_division_metals.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //stacked_column_chart_percent
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Грузоотправители по группе отправке
        this.table_total_division_cargo = new TTDR('div#outgoing-total-division-cargo');         // Создадим экземпляр
        this.table_total_division_cargo.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_total_division_cargo',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_chart
        this.chart_total_division_cargo1 = new CAM('div#outgoing-total-division-cargo1-chart');         // Создадим экземпляр
        this.chart_total_division_cargo1.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //pie_chart
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        this.chart_total_division_cargo2 = new CAM('div#outgoing-total-division-cargo2-chart');         // Создадим экземпляр
        this.chart_total_division_cargo2.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //pie_chart
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Отчета об отгруженной продукции предприятия по украине
        this.table_total_ext_station = new TTDR('div#outgoing-total-ext-station');         // Создадим экземпляр
        this.table_total_ext_station.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_total_ext_station',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_chart
        this.chart_total_ext_station = new CAM('div#outgoing-total-ext-station-chart');         // Создадим экземпляр
        this.chart_total_ext_station.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //pie_chart
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });

        //-----------------------------------------------
        //.......
        // Таблица-Металл ОТПР
        this.table_total_cargo_metall = new TTDR('div#outgoing-total-cargo-metall');         // Создадим экземпляр
        this.table_total_cargo_metall.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_total_cargo_metall',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_exploding_pie_chart
        this.chart_total_cargo_metall = new CAM('div#outgoing-total-cargo-metall-chart');         // Создадим экземпляр
        this.chart_total_cargo_metall.init({
            alert: null,
            type_chart: 'partitioned_bar_chart',     //stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-ИТОГ оператор
        this.table_total_operators = new TTDR('div#outgoing-total-operators');         // Создадим экземпляр
        this.table_total_operators.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_total_operators',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: pie_chart
        this.chart_total_operators = new CAM('div#outgoing-total-operators-chart');         // Создадим экземпляр
        this.chart_total_operators.init({
            alert: null,
            type_chart: 'pie_chart',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        //-----------------------------------------------
        // Таблица-ИТОГ оператор-груз
        this.table_total_operators_cargo = new TTDR('div#outgoing-total-operators-cargo');         // Создадим экземпляр
        this.table_total_operators_cargo.init({
            alert: null,
            detali_table: false,
            type_report: 'outgoing_total_operators_cargo',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: partitioned_bar_chart
        this.chart_total_operators_cargo = new CAM('div#outgoing-total-operators-cargo-chart');         // Создадим экземпляр
        this.chart_total_operators_cargo.init({
            alert: null,
            type_chart: 'partitioned_bar_chart',     //
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        //}.bind(this));
    };
    // Показать отчет  "Отчет по отправлению (общий)"
    view_td_report.prototype.view_report_6_1 = function (start, stop, is_acts) {
        this.is_acts = is_acts;
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_select_cars', App.Langs));
        // пустые операторы
        var where = {
            start: moment(start).format(format_datetime),
            stop: moment(stop).format(format_datetime),
            laden: false,
            accounting: false,
            client: false,
            not_client: false,
            paid: false,
            id_operator: null,
            id_limiting: null,
            id_out_division: null,
            id_out_cargo: null,
            out_code_ext_station_to: null,
            id_station_from: null,
            IsActs: this.is_acts,
        };
        // Загрузим данные
        this.load_select_report_6_1(where, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные с учетом параметров выбора
    view_td_report.prototype.load_select_report_6_1 = function (where, callback) {
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 2;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                // Обновим спсисок вагонов распарсиным ЭПД
                //wagons_get_out_epd_async.call(this, this.wagons_outgoing, function () {
                // Проверим если это выбор толко по времени (первый выбор) тогда клонируем
                if (where) {
                    this.clone_wagons_outgoing = JSON.parse(JSON.stringify(this.wagons_outgoing));
                }
                // Обработать и показать данные
                this.process_data_view_report_6_1(this.wagons_outgoing, cur_where);
                // Выход
                if (typeof callback === 'function') {
                    callback();
                }
                //}.bind(this));
            }
        }.bind(this);

        if (!where) {
            var cur_where = {
                start: moment(this.start).format(format_datetime),
                stop: moment(this.stop).format(format_datetime),
                laden: this.switch_laden.val(),
                accounting: this.switch_accounting.val(),
                client: this.switch_client.val(),
                not_client: this.switch_not_client.val(),
                paid: this.switch_paid.val(),
                id_operator: this.select_operation_amkr.val(),                          // Операторы АМКР
                id_limiting: this.select_limiting.val(),                                // Ограничение погрузки
                id_out_division: this.select_out_division.val(),                        // Цех погрузки
                id_out_cargo: this.select_out_cargo.val(),                              // Груз ОТПР
                out_code_ext_station_to: this.select_out_ext_station_to.val(),          // Станция назначения
                id_station_from: this.select_station_amkr.val(),                        // Станция примыкания ОТПР
                IsActs: this.is_acts,
            };
        } else {
            cur_where = where;
        };
        // Выборка
        this.ids_wsd.postReportOutgoingWagonOfWhere(cur_where, function (result_wagons) {
            this.wagons_outgoing = result_wagons;
            process_load--;
            out_load(process_load);
        }.bind(this));
        // Запрос по данным ШУ (ШМАКОВО)
        this.ids_wsd.getMineCargoIncomingCarsOfPeriod(cur_where.start, cur_where.stop, function (result_mine_cargo) {
            this.mine_cargo = result_mine_cargo;
            process_load--;
            out_load(process_load);
        }.bind(this));
    };
    // Обработка данных для отчетов
    view_td_report.prototype.process_data_select_report_6_1 = function (data, callback) {
        this.list_operators_wagons = [];
        this.list_limiting = [];
        this.list_out_division = [];
        this.list_out_cargo = [];
        this.list_out_ext_station_to = [];
        this.list_station_from = [];
        // выборка для списков
        $.each(data, function (key, value) {
            // выборка для списков отчета
            var ow = this.list_operators_wagons.find(function (o) { return o.value === value.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator }.bind(this));
            if (!ow) {
                this.list_operators_wagons.push({ value: value.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator, text: value['outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_' + App.Lang] });
            }
            var lm = this.list_limiting.find(function (o) { return o.value === value.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting }.bind(this));
            if (!lm) {
                this.list_limiting.push({ value: value.outgoing_uz_vagon_outgoing_wagons_rent_id_limiting, text: value['outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_' + App.Lang] });
            }
            // Цех погрузки
            var out_dv = this.list_out_division.find(function (o) { return o.value === value.outgoing_uz_vagon_id_division }.bind(this));
            if (!out_dv) {
                this.list_out_division.push({ value: value.outgoing_uz_vagon_id_division, text: value['outgoing_uz_vagon_division_abbr_' + App.Lang] });
            }
            // Груз ОТПР
            var out_cargo = this.list_out_cargo.find(function (o) { return o.value === value.outgoing_uz_vagon_id_cargo }.bind(this));
            if (!out_cargo) {
                this.list_out_cargo.push({ value: value.outgoing_uz_vagon_id_cargo, text: value['outgoing_uz_vagon_cargo_name_' + App.Lang] });
            }
            // Станция назначения
            var ext_station_to = this.list_out_ext_station_to.find(function (o) { return o.value === value.outgoing_uz_document_code_stn_to }.bind(this));
            if (!ext_station_to) {
                this.list_out_ext_station_to.push({ value: value.outgoing_uz_document_code_stn_to, text: value['outgoing_uz_document_station_to_name_' + App.Lang] });
            }
            // Станция примыкания ОТПР
            var station_from = this.list_station_from.find(function (o) { return o.value === value.outgoing_sostav_id_station_from }.bind(this));
            if (!station_from) {
                this.list_station_from.push({ value: value.outgoing_sostav_id_station_from, text: value['outgoing_sostav_from_station_amkr_abbr_' + App.Lang] });
            }
        }.bind(this));
        // Отсортируем по алфавиту
        this.list_operators_wagons = this.sort_text(this.list_operators_wagons, "text");
        this.list_limiting = this.sort_text(this.list_limiting, "text");
        this.list_out_division = this.sort_text(this.list_out_division, "text");
        this.list_out_cargo = this.sort_text(this.list_out_cargo, "text");
        this.list_out_ext_station_to = this.sort_text(this.list_out_ext_station_to, "text");
        this.list_station_from = this.sort_text(this.list_station_from, "text");
        if (typeof callback === 'function') {
            callback();
        }
    };
    // Выборка для Груз ОТПР
    view_td_report.prototype.process_data_report_6_1 = function (data, callback) {
        var list_result = [];
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator &&
                    o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    period: moment(this.start).format(format_datetime) + ' - ' + moment(this.stop).format(format_datetime),
                    id_operator: el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator,
                    operators: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_group_operators_' + App.Lang],
                    operator_abbr: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_' + App.Lang],
                    id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                    cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                    cargo_name: el_wag['outgoing_uz_vagon_cargo_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + op.sum_vesg : op.sum_vesg;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            //callback(list_sort_result.sort(function (a, b) { return a.id_out_group - b.id_out_group }.bind(this)));
            callback(this.sort_table(list_result, 'id_out_group', 'count_wagon', true));
        }
    };
    // Выборка для Оператор по ОТПР
    view_td_report.prototype.process_data_report_6_2 = function (data, callback) {
        var list_result = [];
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_group === el_wag.outgoing_uz_vagon_id_group &&
                    o.code_stn === el_wag.outgoing_uz_document_code_stn_to
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    id_group: el_wag.outgoing_uz_vagon_id_group,
                    group_name: el_wag['outgoing_uz_vagon_cargo_group_name_' + App.Lang],
                    //id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                    //cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                    cargo_name: el_wag['outgoing_uz_vagon_cargo_name_' + App.Lang],
                    code_stn: el_wag.outgoing_uz_document_code_stn_to,
                    out_station_name: el_wag['outgoing_uz_document_station_to_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + op.sum_vesg : op.sum_vesg;
            };
        }.bind(this));
        if (typeof callback === 'function') {
            //callback(list_sort_result);
            callback(this.sort_table(list_result, 'id_group', 'count_wagon', true));
        }
    };
    // Выборка для Цех-грузоотправитель (6_5)
    view_td_report.prototype.process_data_report_6_3_1 = function (data, callback) {
        var list_result = [];
        $.each(data, function (key, el_wag) {
            // отберем группу черных металлов
            if (el_wag.outgoing_uz_vagon_id_out_group === 1) {
                var op = list_result.find(function (o) {
                    return o.id_cargo === el_wag.outgoing_uz_vagon_id_cargo &&
                        o.id_division === el_wag.outgoing_uz_vagon_id_division
                }.bind(this));
                if (!op) {
                    // Не данных 
                    list_result.push({
                        id_sort: (el_wag.outgoing_uz_vagon_id_group * 10000) + el_wag.outgoing_uz_vagon_id_cargo,
                        id_cargo: el_wag.outgoing_uz_vagon_id_cargo,
                        cargo_name: el_wag['outgoing_uz_vagon_cargo_name_' + App.Lang],
                        id_group: el_wag.outgoing_uz_vagon_id_group,
                        group_name: el_wag['outgoing_uz_vagon_cargo_group_name_' + App.Lang],
                        id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                        cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                        id_division: el_wag.outgoing_uz_vagon_id_division,
                        division_abbr: el_wag['outgoing_uz_vagon_division_abbr_' + App.Lang],
                        count_wagon: 1,
                        sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    });
                } else {
                    op.count_wagon = op.count_wagon + 1;
                    op.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + op.sum_vesg : op.sum_vesg;
                };
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result);
        }
    };
    // Выборка для Цех-грузоотправитель
    view_td_report.prototype.process_data_report_6_3_2 = function (data, callback) {
        var list_result = [];
        $.each(data, function (key, el_wag) {
            // отберем группу черных металлов
            var op = list_result.find(function (o) {
                return o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group &&
                    o.id_division === el_wag.outgoing_uz_vagon_id_division
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    id_group: el_wag.outgoing_uz_vagon_id_group,
                    group_name: el_wag['outgoing_uz_vagon_cargo_group_name_' + App.Lang],
                    id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                    cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                    cargo_name: el_wag['outgoing_uz_vagon_cargo_name_' + App.Lang],
                    id_division: el_wag.outgoing_uz_vagon_id_division,
                    division_abbr: el_wag['outgoing_uz_vagon_division_abbr_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + op.sum_vesg : op.sum_vesg;
            };
        }.bind(this));
        if (this.switch_shu.val() === true) {
            $.each(this.mine_cargo, function (key, el_mc) {
                var res = list_groups_cargo.indexOf(el_mc.id_group_cargo);
                if (res === -1) {
                    var op = list_result.find(function (o) {
                        return o.id_group === el_mc.id_group_cargo &&
                            o.id_division === el_mc.id_division
                    }.bind(this));
                    if (!op) {
                        // Не данных 
                        list_result.push({
                            id_group: el_mc.id_group_cargo,
                            group_name: el_mc['cargo_group_name_' + App.Lang],
                            id_out_group: el_mc.id_out_group_cargo,
                            cargo_out_group_name: el_mc['cargo_out_group_name_' + App.Lang],
                            cargo_name: el_mc['cargo_name_' + App.Lang],
                            id_division: el_mc.id_division,
                            division_abbr: el_mc['division_abbr_' + App.Lang],
                            count_wagon: el_mc.count_wagon,
                            sum_vesg: el_mc.vesg,
                        });
                    } else {
                        op.count_wagon = op.count_wagon ? op.count_wagon + el_mc.count_wagon : op.count_wagon;
                        op.sum_vesg = el_mc.vesg ? el_mc.vesg + op.sum_vesg : op.sum_vesg;
                    };
                }
            }.bind(this));
        }


        if (typeof callback === 'function') {
            //callback(list_sort_result);
            callback(this.sort_table(list_result, 'id_out_group', 'count_wagon', true));
        }
    };
    // Выборка для Отчета об отгруженной продукции предприятия
    view_td_report.prototype.process_data_report_6_4 = function (data, callback) {
        var list_result = [];
        var list_group = [];
        var list_result_ukr = [];
        var list_result_exp = [];
        var list_result_sng = [];
        var list_result_europe = [];

        $.each(data, function (key, el_wag) {
            var gr = list_group.find(function (o) {
                return o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group
            }.bind(this));
            if (!gr) {
                list_group.push({
                    id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                    cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                });
            };
            // Выборка по украине
            if (el_wag.outgoing_uz_document_to_code_railway === 22 && !el_wag.outgoing_uz_document_station_to_port) {
                var ukr = list_result_ukr.find(function (o) {
                    return o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group && o.code_inlandrailway === el_wag.outgoing_uz_document_to_code_inlandrailway
                }.bind(this));
                if (!ukr) {
                    // Не данных 
                    list_result_ukr.push({
                        id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                        cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                        code_inlandrailway: el_wag.outgoing_uz_document_to_code_inlandrailway,
                        inlandrailway_name: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        inlandrailway_abbr: el_wag['outgoing_uz_document_to_inlandrailway_abbr_' + App.Lang],
                        code_railway: el_wag.outgoing_uz_document_to_code_railway,
                        country_nazn: el_wag.outgoing_uz_document_country_nazn,
                        countrys_name: el_wag['outgoing_uz_document_to_countrys_name_' + App.Lang],
                        country_abbr: el_wag['outgoing_uz_document_to_country_abbr_' + App.Lang],
                        station_inlandrailway: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        count_wagon: 1,
                        sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    });
                } else {
                    ukr.count_wagon = ukr.count_wagon + 1;
                    ukr.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + ukr.sum_vesg : ukr.sum_vesg;
                }
            }
            // сортировка по экспорту
            if (el_wag.outgoing_uz_document_station_to_port) {
                var exp = list_result_exp.find(function (o) {
                    return o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group &&
                        el_wag.outgoing_uz_document_station_to_port &&
                        o.code_stn === el_wag.outgoing_uz_document_code_stn_to
                }.bind(this));
                if (!exp) {
                    // Не данных 
                    list_result_exp.push({
                        id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                        cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                        code_stn: el_wag.outgoing_uz_document_code_stn_to,
                        out_station_name: el_wag['outgoing_uz_document_station_to_name_' + App.Lang],
                        code_inlandrailway: el_wag.outgoing_uz_document_to_code_inlandrailway,
                        inlandrailway_name: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        inlandrailway_abbr: el_wag['outgoing_uz_document_to_inlandrailway_abbr_' + App.Lang],
                        code_railway: el_wag.outgoing_uz_document_to_code_railway,
                        country_nazn: el_wag.outgoing_uz_document_country_nazn,
                        countrys_name: el_wag['outgoing_uz_document_to_countrys_name_' + App.Lang],
                        country_abbr: el_wag['outgoing_uz_document_to_country_abbr_' + App.Lang],

                        station_inlandrailway: el_wag['outgoing_uz_document_station_to_name_' + App.Lang],
                        count_wagon: 1,
                        sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    });
                } else {
                    exp.count_wagon = exp.count_wagon + 1;
                    exp.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + exp.sum_vesg : exp.sum_vesg;
                };
            }
            // Выборка по СНГ
            if (list_railway_sng.indexOf(el_wag.outgoing_uz_document_to_code_railway) >= 0) {
                var sng = list_result_sng.find(function (o) {
                    return o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group && o.code_inlandrailway === el_wag.outgoing_uz_document_to_code_inlandrailway
                }.bind(this));
                if (!sng) {
                    // Не данных 
                    list_result_sng.push({
                        id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                        cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                        code_inlandrailway: el_wag.outgoing_uz_document_to_code_inlandrailway,
                        inlandrailway_name: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        inlandrailway_abbr: el_wag['outgoing_uz_document_to_inlandrailway_abbr_' + App.Lang],
                        code_railway: el_wag.outgoing_uz_document_to_code_railway,
                        country_nazn: el_wag.outgoing_uz_document_country_nazn,
                        countrys_name: el_wag['outgoing_uz_document_to_countrys_name_' + App.Lang],
                        country_abbr: el_wag['outgoing_uz_document_to_country_abbr_' + App.Lang],

                        station_inlandrailway: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        count_wagon: 1,
                        sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    });
                } else {
                    sng.count_wagon = sng.count_wagon + 1;
                    sng.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + sng.sum_vesg : sng.sum_vesg;
                }
            }
            // Выборка по европе
            if (list_railway_sng.indexOf(el_wag.outgoing_uz_document_to_code_railway) < 0 && el_wag.outgoing_uz_document_to_code_railway !== 22) {
                var europe = list_result_europe.find(function (o) {
                    return o.id_out_group === el_wag.outgoing_uz_vagon_id_out_group && o.code_inlandrailway === el_wag.outgoing_uz_document_to_code_inlandrailway
                }.bind(this));
                if (!europe) {
                    // Не данных 
                    list_result_europe.push({
                        id_out_group: el_wag.outgoing_uz_vagon_id_out_group,
                        cargo_out_group_name: el_wag['outgoing_uz_vagon_cargo_out_group_name_' + App.Lang],
                        code_inlandrailway: el_wag.outgoing_uz_document_to_code_inlandrailway,
                        inlandrailway_name: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        inlandrailway_abbr: el_wag['outgoing_uz_document_to_inlandrailway_abbr_' + App.Lang],
                        code_railway: el_wag.outgoing_uz_document_to_code_railway,
                        country_nazn: el_wag.outgoing_uz_document_country_nazn,
                        countrys_name: el_wag['outgoing_uz_document_to_countrys_name_' + App.Lang],
                        country_abbr: el_wag['outgoing_uz_document_to_country_abbr_' + App.Lang],

                        station_inlandrailway: el_wag['outgoing_uz_document_to_inlandrailway_name_' + App.Lang],
                        count_wagon: 1,
                        sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    });
                } else {
                    europe.count_wagon = europe.count_wagon + 1;
                    europe.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + europe.sum_vesg : europe.sum_vesg;
                }
            }
        }.bind(this));


        // Сформируем обобщенный отчет
        $.each(list_group.sort(function (a, b) { return a.id_out_group - b.id_out_group }.bind(this)), function (key, el_gp) {
            // Перенесем по украине
            var list = list_result_ukr.filter(function (i) { return i.id_out_group === el_gp.id_out_group }.bind(this));
            //var sum_ukr = 0;
            //$.each(list_result_ukr, function (i, el) { sum_ukr += el.count_wagon });
            $.each(list.sort(function (a, b) { return b.count_wagon - a.count_wagon }.bind(this)), function (key, el) {
                list_result.push({
                    id: el.id_out_group * 10,
                    id_type: 0,
                    id_out_group: el.id_out_group,
                    cargo_out_group_name: el.cargo_out_group_name,
                    station_inlandrailway: el.station_inlandrailway,
                    count_wagon: el.count_wagon,
                    sum_vesg: el.sum_vesg,
                    //persent: Number(Number(el.count_wagon * 100) / sum_ukr),
                });
            }.bind(this));
            // Перенесем по портам
            var list = list_result_exp.filter(function (i) { return i.id_out_group === el_gp.id_out_group }.bind(this));
            //var sum_exp = 0;
            //$.each(list_result_exp, function (i, el) { sum_exp += el.count_wagon });
            $.each(list.sort(function (a, b) { return b.count_wagon - a.count_wagon }.bind(this)), function (key, el) {
                list_result.push({
                    id: (el.id_out_group * 10) + 1,
                    id_type: 1,
                    id_out_group: el.id_out_group,
                    cargo_out_group_name: el.cargo_out_group_name,
                    station_inlandrailway: el.station_inlandrailway,
                    count_wagon: el.count_wagon,
                    sum_vesg: el.sum_vesg,
                    //persent: Number(Number(el.count_wagon * 100) / sum_exp),
                });
            }.bind(this));
            // Перенесем по СНГ
            var list = list_result_sng.filter(function (i) { return i.id_out_group === el_gp.id_out_group }.bind(this));
            //var sum_sng = 0;
            //$.each(list_result_sng, function (i, el) { sum_sng += el.count_wagon });
            $.each(list.sort(function (a, b) { return b.count_wagon - a.count_wagon }.bind(this)), function (key, el) {
                list_result.push({
                    id: (el.id_out_group * 10) + 2,
                    id_type: 2,
                    id_out_group: el.id_out_group,
                    cargo_out_group_name: el.cargo_out_group_name,
                    station_inlandrailway: el.station_inlandrailway,
                    count_wagon: el.count_wagon,
                    sum_vesg: el.sum_vesg,
                    //persent: Number(Number(el.count_wagon * 100) / sum_sng),
                });
            }.bind(this));
            // Перенесем по европе
            var list = list_result_europe.filter(function (i) { return i.id_out_group === el_gp.id_out_group }.bind(this));
            //var sum_europe = 0;
            //$.each(list_result_europe, function (i, el) { sum_europe += el.count_wagon });
            $.each(list.sort(function (a, b) { return b.count_wagon - a.count_wagon }.bind(this)), function (key, el) {
                list_result.push({
                    id: (el.id_out_group * 10) + 3,
                    id_type: 3,
                    id_out_group: el.id_out_group,
                    cargo_out_group_name: el.cargo_out_group_name,
                    station_inlandrailway: el.station_inlandrailway,
                    count_wagon: el.count_wagon,
                    sum_vesg: el.sum_vesg,
                    //persent: Number(Number(el.count_wagon * 100) / sum_europe),
                });
            }.bind(this));
        }.bind(this));

        //var sum = 0;
        //$.each(list_result, function (i, el) { sum += el.persent });

        if (typeof callback === 'function') {
            callback(list_result,
                this.sort_table(list_result_ukr, 'id_out_group', 'count_wagon', true),
                this.sort_table(list_result_exp, 'id_out_group', 'count_wagon', true),
                this.sort_table(list_result_sng, 'id_out_group', 'count_wagon', true),
                this.sort_table(list_result_europe, 'id_out_group', 'count_wagon', true)
            );
        }
    };
    // ИТОГ оператор
    view_td_report.prototype.process_data_report_6_6_1 = function (data, callback) {
        var list_result = [];
        var sum_count = data && data.length > 0 ? data.length : 0;
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator
            }.bind(this));
            if (!op) {
                // Не данных 
                list_result.push({
                    id_operator: el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator,
                    operators: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_group_operators_' + App.Lang],
                    operator_abbr: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    perent_wagon: Number(100 / sum_count).toFixed(2),
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + op.sum_vesg : op.sum_vesg;
                op.perent_wagon = Number((op.count_wagon * 100) / sum_count).toFixed(2);
            };
        }.bind(this));
        if (typeof callback === 'function') {
            callback(list_result.sort(function (a, b) { return b.id_operator - a.id_operator }.bind(this)));
        }
    };
    // ИТОГ оператор груз
    view_td_report.prototype.process_data_report_6_6_2 = function (data, callback) {
        var list_result = [];
        var sum_count = 0;
        $.each(data, function (key, el_wag) {
            var op = list_result.find(function (o) {
                return o.id_operator === el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator &&
                    o.id_group === el_wag.outgoing_uz_vagon_id_group
            }.bind(this));
            sum_count = data.filter(function (i) {
                return i.outgoing_uz_vagon_id_group === el_wag.outgoing_uz_vagon_id_group
            }.bind(this)).length;
            if (!op) {
                // Не данных 
                list_result.push({
                    id_operator: el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator,
                    operators: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_group_operators_' + App.Lang],
                    operator_abbr: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_' + App.Lang],
                    id_group: el_wag.outgoing_uz_vagon_id_group,
                    group_name: el_wag['outgoing_uz_vagon_cargo_group_name_' + App.Lang],
                    //cargo_name: el_wag['outgoing_uz_vagon_cargo_name_' + App.Lang],
                    count_wagon: 1,
                    sum_vesg: el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg : 0,
                    perent_wagon: Number(100 / sum_count).toFixed(2),
                });
            } else {
                op.count_wagon = op.count_wagon + 1;
                op.sum_vesg = el_wag.outgoing_uz_vagon_vesg ? el_wag.outgoing_uz_vagon_vesg + op.sum_vesg : op.sum_vesg;
                op.perent_wagon = Number((op.count_wagon * 100) / sum_count).toFixed(2);
            };

        }.bind(this));
        if (typeof callback === 'function') {
            //callback(list_sort_result);
            callback(this.sort_table(list_result, 'id_group', 'perent_wagon', true));
        }
    };
    // Обработать и отображение данных на экране
    view_td_report.prototype.process_data_view_report_6_1 = function (wagons_outgoing, where) {
        // Продолжим
        this.total_outgoing_cargo_operator = [];    // список Груз ОТПР
        this.total_operator_amkr = [];              // список Оператор по ОТПР
        this.total_division_metals = [];            // список Цех-грузоотправитель по черным металлам
        this.total_division_cargo = [];             // список Цех-грузоотправитель по грузу отправителю
        this.total_ext_station = [];                // список об отгруженной продукции предприятия
        this.total_ext_station_ukr = [];            // список об отгруженной продукции предприятия по украине
        this.total_ext_station_exp = [];            // список об отгруженной продукции предприятия по портам на экспорт
        this.total_ext_station_sng = [];            // список об отгруженной продукции предприятия по странам СНГ
        this.total_ext_station_europe = [];         // список об отгруженной продукции предприятия по странам зарубежье

        this.total_cargo_metall = [];               // список Металл ОТПР
        this.total_operators = [];                  // список ИТОГ оператор
        this.total_operators_cargo = [];            // список ИТОГ оператор груз

        // Запускаем 10 процесса инициализации (паралельно)
        var process = 8;
        // Выход из инициализации
        var out_process_data = function (process) {
            if (process === 0) {
                // Обновим элементы выбора
                if (!where || !where.id_operator || where.id_operator.length === 0) {
                    this.select_operation_amkr.update(this.list_operators_wagons, -1);
                }
                if (!where || !where.id_limiting || where.id_limiting.length === 0) {
                    this.select_limiting.update(this.list_limiting, -1);
                }
                if (!where || !where.id_out_division || where.id_out_division.length === 0) {
                    this.select_out_division.update(this.list_out_division, -1);
                }
                if (!where || !where.id_out_cargo || where.id_out_cargo.length === 0) {
                    this.select_out_cargo.update(this.list_out_cargo, -1);
                }
                if (!where || !where.out_code_ext_station_to || where.out_code_ext_station_to.length === 0) {
                    this.select_out_ext_station_to.update(this.list_out_ext_station_to, -1);
                }
                if (!where || !where.id_station_from || where.id_station_from.length === 0) {
                    this.select_station_amkr.update(this.list_station_from, -1);
                }
                // Отобразить данные в таблице Груз ОТПР
                this.view_filter_report_total_outgoing_cargo_operator();
                // Отобразить данные в таблице Оператор по ОТПР
                this.view_filter_report_total_operator_amkr();
                // Отобразить данные в таблице  Цех-грузоотправитель груза черные металы
                this.view_filter_report_total_division_metals();
                // Отобразить данные в таблице  Цех-грузоотправитель груза по отправке
                this.view_filter_report_total_division_cargo();
                // Отобразить данные в таблице Отчета об отгруженной продукции предприятия
                this.view_filter_report_total_ext_station();
                // Металл ОТПР
                this.view_filter_report_total_cargo_metall();
                // ИТОГ оператор
                this.view_filter_report_total_operators();
                this.view_filter_report_total_operators_cargo()
            }
        }.bind(this);
        this.process_data_select_report_6_1(wagons_outgoing, function (result) {
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_6_1(wagons_outgoing, function (result) {
            this.total_outgoing_cargo_operator = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_6_2(wagons_outgoing, function (result) {
            this.total_operator_amkr = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_6_3_1(wagons_outgoing, function (result) {
            this.total_division_metals = this.sort_table(result, 'id_sort', 'count_wagon', true);
            this.total_cargo_metall = this.sort_table(result, 'id_division', 'count_wagon', true);
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_6_3_2(wagons_outgoing, function (result) {
            this.total_division_cargo = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_6_4(wagons_outgoing, function (list_result, result_ukr, result_exp, result_sng, result_europe) {
            this.total_ext_station = list_result;
            this.total_ext_station_ukr = result_ukr;
            this.total_ext_station_exp = result_exp;
            this.total_ext_station_sng = result_sng;
            this.total_ext_station_europe = result_europe;
            process--;
            out_process_data(process);
        }.bind(this));
        //this.process_data_report_6_5(wagons_outgoing, function (result) {
        //    this.total_cargo_metall = this.sort_table(result, 'id_division', 'count_wagon', true);
        //    process--;
        //    out_process_data(process);
        //}.bind(this));
        this.process_data_report_6_6_1(wagons_outgoing, function (result) {
            this.total_operators = result;
            process--;
            out_process_data(process);
        }.bind(this));
        this.process_data_report_6_6_2(wagons_outgoing, function (result) {
            this.total_operators_cargo = result;
            process--;
            out_process_data(process);
        }.bind(this));
    };
    // Выполнить фильтрацию и вывести данные по отчету "Груз ОТПР"
    view_td_report.prototype.view_filter_report_total_outgoing_cargo_operator = function () {
        if (this.total_outgoing_cargo_operator) {

            var shorten_string = function (str) {
                if (str === null) return '';
                var result = '';
                var arrayOfStrings = str.split(' ');
                $.each(arrayOfStrings, function (key, el) {
                    if (el.length > 1) {
                        result += el.substr(0, 3) + '. ';
                    } else {
                        result += el + ' ';
                    }

                }.bind(this));
                return result;
            }

            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_outgoing_cargo_operator));
            // Применим фильтр

            // Отобразим
            this.table_total_outgoing_cargo_operator.view(list_view);

            var data = [];
            $.each(list_view, function (key, element) {
                data.push({ "group": element.operator_abbr, "name": element.cargo_out_group_name, "fieldName": element.id_out_group, "value": element.count_wagon });
            }.bind(this));

            //var data = [];
            //$.each(list_view, function (key, element) {
            //    var gn = data.find(function (o) { return o.name === shorten_string(element.cargo_out_group_name); });
            //    if (gn === undefined) {
            //        var subData = [];
            //        subData.push({ name: element.operator_abbr, value: element.count_wagon })
            //        data.push({ "name": shorten_string(element.cargo_out_group_name), "value": element.count_wagon, subData: subData });

            //    } else {
            //        gn.value += element.count_wagon;
            //        gn.subData.push({ name: element.operator_abbr, value: element.count_wagon })
            //    }
            //}.bind(this));

            this.chart_data_total_outgoing_cargo_operator = data;
            this.view_chart_total_outgoing_cargo_operator();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Груз ОТПР"
    view_td_report.prototype.view_chart_total_outgoing_cargo_operator = function () {
        if (this.report_panel === 0 && this.chart_data_total_outgoing_cargo_operator) {
            this.chart_total_outgoing_cargo_operator.view(this.chart_data_total_outgoing_cargo_operator);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Оператор по ОТПР"
    view_td_report.prototype.view_filter_report_total_operator_amkr = function () {
        if (this.total_operator_amkr) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_operator_amkr));
            // Применим фильтр

            // Отобразим
            this.table_total_operator_amkr.view(list_view);

            var data = [

            ];

            $.each(this.sort_table(list_view, 'id_group', 'count_wagon', false), function (key, element) {
                data.push({ "group": element.group_name, "name": element.out_station_name + "-" + element.count_wagon + "ваг.", "value": Number(element.count_wagon) });
            }.bind(this));

            this.chart_data_total_operator_amkr = data;
            this.view_chart_total_operator_amkr();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "ИТОГ оператор"
    view_td_report.prototype.view_chart_total_operator_amkr = function () {
        if (this.report_panel === 1 && this.chart_data_total_operator_amkr) {
            this.chart_total_operator_amkr.view(this.chart_data_total_operator_amkr);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Цех погрузки черных металлов"
    view_td_report.prototype.view_filter_report_total_division_metals = function () {
        if (this.total_division_metals) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_division_metals));

            // Применим фильтр

            // Отобразим
            this.table_total_division_metals.view(list_view);

            var data = [

            ];

            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.group_name; });
                if (gn === undefined) {
                    data.push({ "name": element.group_name, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
            }.bind(this));

            this.chart_data_total_division_metals = data;
            this.view_chart_total_division_metals();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Цех погрузки черных металлов"
    view_td_report.prototype.view_chart_total_division_metals = function () {
        if (this.report_panel === 2 && this.chart_data_total_division_metals) {
            this.chart_total_division_metals.view(this.chart_data_total_division_metals);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Цех погрузки по группам отправки"
    view_td_report.prototype.view_filter_report_total_division_cargo = function () {
        if (this.total_division_cargo) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_division_cargo));

            // Применим фильтр

            // Отобразим
            this.table_total_division_cargo.view(list_view);

            var data1 = [];
            var data2 = [];

            //$.each(list_view, function (key, element) {
            //    data.push({ "name": element.cargo_out_group_name, "value": element.count_wagon });
            //}.bind(this));

            $.each(list_view, function (key, element) {
                var gn = data1.find(function (o) { return o.name === element.cargo_out_group_name; });
                if (gn === undefined) {
                    data1.push({ "name": element.cargo_out_group_name, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
            }.bind(this));

            $.each(list_view, function (key, element) {
                var gn = data2.find(function (o) { return o.name === element.division_abbr; });
                if (gn === undefined) {
                    data2.push({ "name": element.division_abbr, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
            }.bind(this));

            this.chart_data_total_division_cargo1 = data1;
            this.chart_data_total_division_cargo2 = data2;
            this.view_chart_total_division_cargo();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Цех погрузки черных металлов"
    view_td_report.prototype.view_chart_total_division_cargo = function () {
        if (this.report_panel === 2 && this.chart_data_total_division_cargo1 && this.chart_data_total_division_cargo2) {
            this.chart_total_division_cargo1.view(this.chart_data_total_division_cargo1);
            this.chart_total_division_cargo2.view(this.chart_data_total_division_cargo2);
        }
    };
    // Выполнить фильтрацию и вывести данные по Отчета об отгруженной продукции предприятия по украине
    view_td_report.prototype.view_filter_report_total_ext_station_ukr = function () {
        if (this.total_ext_station_ukr) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_ext_station_ukr));

            // Применим фильтр

            // Отобразим
            this.table_total_ext_station_ukr.view(list_view);

            var data = [

            ];

            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.cargo_out_group_name; });
                if (gn === undefined) {
                    data.push({ "name": element.cargo_out_group_name, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
            }.bind(this));

            this.chart_data_total_ext_station_ukr = data;
            this.view_chart_total_ext_station_ukr();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "отгруженной продукции предприятия по украине"
    view_td_report.prototype.view_chart_total_ext_station_ukr = function () {
        if (this.report_panel === 3 && this.chart_data_total_ext_station_ukr) {
            this.chart_total_ext_station_ukr.view(this.chart_data_total_ext_station_ukr);
        }
    };
    // Выполнить фильтрацию и вывести данные по Отчета об отгруженной продукции предприятия по экспорт
    view_td_report.prototype.view_filter_report_total_ext_station_exp = function () {
        if (this.total_ext_station_exp) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_ext_station_exp));

            // Применим фильтр

            // Отобразим
            this.table_total_ext_station_exp.view(list_view);

            var data = [

            ];

            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.cargo_out_group_name; });
                if (gn === undefined) {
                    data.push({ "name": element.cargo_out_group_name, "value": element.count_wagon });
                } else {
                    gn.value += element.count_wagon;
                }
            }.bind(this));

            this.chart_data_total_ext_station_exp = data;
            this.view_chart_total_ext_station_exp();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "отгруженной продукции предприятия по экспорт"
    view_td_report.prototype.view_chart_total_ext_station_exp = function () {
        if (this.report_panel === 3 && this.chart_data_total_ext_station_exp) {
            this.chart_total_ext_station_exp.view(this.chart_data_total_ext_station_exp);
        }
    };
    // Выполнить фильтрацию и вывести данные по Отчета об отгруженной продукции предприятия
    view_td_report.prototype.view_filter_report_total_ext_station = function () {
        if (this.total_ext_station) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_ext_station));

            var shorten_string = function (str) {
                if (str === null) return '';
                var result = '';
                var arrayOfStrings = str.split(' ');
                $.each(arrayOfStrings, function (key, el) {
                    if (el.length > 1) {
                        result += el.substr(0, 3) + '. ';
                    } else {
                        result += el + ' ';
                    }

                }.bind(this));
                return result;
            }

            var getIDType = function (id_type) {
                switch (id_type) {
                    case 0: { return 'Украина'; }
                    case 1: { return 'Порты'; }
                    case 2: { return 'СНГ и Балтия'; }
                    case 3: { return 'Зарубежье'; }
                    default: { return ''; }
                }
            }
            // Применим фильтр

            // Отобразим
            this.table_total_ext_station.view(list_view);

            var data = [

            ];

            //var sum = 0;
            //$.each(list_view, function (i, el) { sum += el.count_wagon });


            $.each(list_view, function (key, element) {

                if (element.id_out_group == 1) {
                    var gn = data.find(function (o) { return o.id === element.id_type; });
                    if (gn === undefined) {
                        data.push({ "id": element.id_type, "name": getIDType(element.id_type), "value": element.count_wagon });
                    } else {
                        gn.value += element.count_wagon;
                    }
                }

                //var gn = data.find(function (o) { return o.id_out_group === element.id; });
                //if (gn === undefined) {
                //    var sum_type = 0;
                //    $.each(list_view, function (i, el) { if (el.id === element.id) sum_type += el.count_wagon });
                //    data.push({ "id": element.id, "group": shorten_string(element.cargo_out_group_name), "name": getIDType(element.id_type), "value": Number(Number(sum_type * 100) / sum) });

                //}
            }.bind(this));

            //$.each(list_view, function (key, element) {
            //    var gn = data.find(function (o) { return o.id === element.id; });
            //    if (gn === undefined) {
            //        var subs = [];
            //        subs.push({ name: getIDType(element.id_type), value: Number(Number(element.count_wagon * 100) / sum) })
            //        data.push({ "id": element.id, "name": element.cargo_out_group_name, "value": Number(Number(element.count_wagon * 100) / sum), subs: subs });

            //    } else {
            //        gn.subs.push({ name: getIDType(element.id_type), value: Number(Number(element.count_wagon * 100) / sum) })
            //    }
            //}.bind(this));

            //$.each(list_view, function (key, element) {
            //    var list = data.filter(function (i) { return i.name === element.cargo_out_group_name; });
            //    if (gn === undefined) {
            //        data.push({ "name": element.cargo_out_group_name, "value": element.count_wagon });
            //    }
            //}.bind(this));

            this.chart_data_total_ext_station = data;
            this.view_chart_total_ext_station();
            LockScreenOff();
        }
    };
    //
    view_td_report.prototype.view_chart_total_ext_station = function () {
        if (this.report_panel === 3 && this.chart_data_total_ext_station) {
            this.chart_total_ext_station.view(this.chart_data_total_ext_station);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Металл ОТПР"
    view_td_report.prototype.view_filter_report_total_cargo_metall = function () {
        if (this.total_cargo_metall) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_cargo_metall));
            // Применим фильтр

            // Отобразим
            this.table_total_cargo_metall.view(list_view);

            var data = [

            ];
            $.each(this.sort_table(list_view, 'id_division', 'count_wagon', false), function (key, element) {
                data.push({ "group": element.division_abbr, "name": element.cargo_name + "-" + element.count_wagon + " ваг.", "value": Number(element.count_wagon) });
            }.bind(this));

            this.chart_data_total_cargo_metall = data;
            this.view_chart_total_cargo_metall();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "ИТОГ оператор"
    view_td_report.prototype.view_chart_total_cargo_metall = function () {
        if (this.report_panel === 4 && this.chart_data_total_cargo_metall) {
            this.chart_total_cargo_metall.view(this.chart_data_total_cargo_metall);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "ИТОГ оператор"
    view_td_report.prototype.view_filter_report_total_operators = function () {
        if (this.total_operators) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_operators));
            // Применим фильтр

            // Отобразим
            this.table_total_operators.view(list_view);

            var data = [];

            $.each(list_view, function (key, element) {
                data.push({ "name": element.operator_abbr, "value": element.count_wagon });
            }.bind(this));

            this.chart_data_total_operators = data;
            this.view_chart_total_operators();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "ИТОГ оператор"
    view_td_report.prototype.view_chart_total_operators = function () {
        if (this.report_panel === 5 && this.chart_data_total_operators) {
            this.chart_total_operators.view(this.chart_data_total_operators);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "ИТОГ оператор-груз"
    view_td_report.prototype.view_filter_report_total_operators_cargo = function () {
        if (this.total_operators_cargo) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.total_operators_cargo));
            // Применим фильтр

            // Отобразим
            this.table_total_operators_cargo.view(list_view);

            var data = [];

            $.each(this.sort_table(list_view, 'id_group', 'perent_wagon', false), function (key, element) {
                data.push({ "group": element.group_name, "name": element.operator_abbr + "-" + element.count_wagon + "ваг. (" + element.perent_wagon + "%)", "value": Number(element.perent_wagon) });
            }.bind(this));

            //var data = [{
            //    group: "Central",
            //    name: "North Dakota",
            //    value: 920
            //}, {
            //    group: "Central",
            //    name: "South Dakota",
            //    value: 1317
            //}, {
            //    group: "Central",
            //    name: "Kansas",
            //    value: 2916
            //}, {
            //    group: "Central",
            //    name: "Iowa",
            //    value: 4577
            //}, {
            //    group: "Central",
            //    name: "Nebraska",
            //    value: 7464
            //}, {
            //    group: "Central",
            //    name: "Oklahoma",
            //    value: 19686
            //}, {
            //    group: "Central",
            //    name: "Missouri",
            //    value: 22207
            //}, {
            //    group: "Central",
            //    name: "Minnesota",
            //    value: 29865
            //}, {
            //    group: "Central",
            //    name: "Wisconsin",
            //    value: 32125
            //}, {
            //    group: "Central",
            //    name: "Indiana",
            //    value: 53549
            //}, {
            //    group: "Central",
            //    name: "Michigan",
            //    value: 76281
            //}, {
            //    group: "Central",
            //    name: "Illinois",
            //    value: 80162
            //}, {
            //    group: "Central",
            //    name: "Texas",
            //    value: 170187
            //}, {
            //    group: "East",
            //    name: "West Virginia",
            //    value: 1209
            //}, {
            //    group: "East",
            //    name: "Maine",
            //    value: 1270
            //}, {
            //    group: "East",
            //    name: "District of Columbia",
            //    value: 2866
            //}, {
            //    group: "East",
            //    name: "New Hampshire",
            //    value: 7294
            //}, {
            //    group: "East",
            //    name: "Vermont",
            //    value: 8929
            //}, {
            //    group: "East",
            //    name: "Connecticut",
            //    value: 13386
            //}, {
            //    group: "East",
            //    name: "Rhode Island",
            //    value: 22629
            //}, {
            //    group: "East",
            //    name: "Maryland",
            //    value: 23707
            //}, {
            //    group: "East",
            //    name: "Delaware",
            //    value: 27453
            //}, {
            //    group: "East",
            //    name: "Massachusetts",
            //    value: 28639
            //}, {
            //    group: "East",
            //    name: "New Jersey",
            //    value: 35763
            //}, {
            //    group: "East",
            //    name: "Ohio",
            //    value: 78253
            //}, {
            //    group: "East",
            //    name: "Pennsylvania",
            //    value: 116522
            //}, {
            //    group: "East",
            //    name: "New York",
            //    value: 310914
            //}, {
            //    group: "South",
            //    name: "South Carolina",
            //    value: 8483
            //}, {
            //    group: "South",
            //    name: "Louisiana",
            //    value: 9219
            //}, {
            //    group: "South",
            //    name: "Mississippi",
            //    value: 10772
            //}, {
            //    group: "South",
            //    name: "Arkansas",
            //    value: 11678
            //}, {
            //    group: "South",
            //    name: "Alabama",
            //    value: 19511
            //}, {
            //    group: "South",
            //    name: "Tennessee",
            //    value: 30662
            //}, {
            //    group: "South",
            //    name: "Kentucky",
            //    value: 36598
            //}, {
            //    group: "South",
            //    name: "Georgia",
            //    value: 49103
            //}, {
            //    group: "South",
            //    name: "North Carolina",
            //    value: 55604
            //}, {
            //    group: "South",
            //    name: "Virginia",
            //    value: 70641
            //}, {
            //    group: "South",
            //    name: "Florida",
            //    value: 89479
            //}, {
            //    group: "West",
            //    name: "Wyoming",
            //    value: 1603
            //}, {
            //    group: "West",
            //    name: "Idaho",
            //    value: 4380
            //}, {
            //    group: "West",
            //    name: "New Mexico",
            //    value: 4779
            //}, {
            //    group: "West",
            //    name: "Montana",
            //    value: 5589
            //}, {
            //    group: "West",
            //    name: "Utah",
            //    value: 11223
            //}, {
            //    group: "West",
            //    name: "Nevada",
            //    value: 16729
            //}, {
            //    group: "West",
            //    name: "Oregon",
            //    value: 17431
            //}, {
            //    group: "West",
            //    name: "Colorado",
            //    value: 32110
            //}, {
            //    group: "West",
            //    name: "Arizona",
            //    value: 35283
            //}, {
            //    group: "West",
            //    name: "Washington",
            //    value: 138656
            //}, {
            //    group: "West",
            //    name: "California",
            //    value: 457731
            //}];

            //$.each(list_view, function (key, element) {
            //    data.push({ "name": element.operator_abbr, "value": element.count_wagon });
            //}.bind(this));

            this.chart_data_total_operators_cargo = data;
            this.view_chart_total_operators_cargo();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "ИТОГ оператор"
    view_td_report.prototype.view_chart_total_operators_cargo = function () {
        if (this.report_panel === 5 && this.chart_data_total_operators_cargo) {
            this.chart_total_operators_cargo.view(this.chart_data_total_operators_cargo);
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_6_1 = function () {
        this.out_clear();
        LockScreen(langView('vtdr_load_outgoing_cars', App.Langs));
        this.load_select_report_6_1(null, function () {
            LockScreenOff();
        }.bind(this))
    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_6_1 = function () {
        this.switch_laden.val(false);
        this.switch_accounting.val(false);
        this.switch_client.val(false);
        this.switch_not_client.val(false);
        this.switch_paid.val(false);
        this.select_station_amkr.val(-1);
        // Обработать и показать данные
        this.process_data_view_report_6_1(this.clone_wagons_outgoing, null);
        LockScreenOff();
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_6_1 = function () {
        if (this.switch_laden) { this.switch_laden.val(false); }
        if (this.switch_accounting) { this.switch_accounting.val(false); }
        if (this.switch_client) { this.switch_client.val(false); }
        if (this.switch_not_client) { this.switch_not_client.val(false); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.switch_shu) { this.switch_shu.val(true); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_limiting) { this.select_limiting.val(-1); }
        if (this.select_out_division) { this.select_out_division.val(-1); }
        if (this.select_out_cargo) { this.select_out_cargo.val(-1); }
        if (this.select_out_ext_station_to) { this.select_out_ext_station_to.val(-1); }
        if (this.select_station_amkr) { this.select_station_amkr.val(-1); }
        if (this.table_total_outgoing_cargo_operator) {
            this.wagons_outgoing = [];
            this.mine_cargo = [];
            this.clone_wagons_outgoing = [];
            this.process_data_view_report_6_1(this.clone_wagons_outgoing, null);
            LockScreenOff();
        }
    };
    //------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Вагоны с корректировкой платы"
    view_td_report.prototype.init_report_7_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 7;        // номер отчета
        this.report_panel = 0;  // номер под-отчета

        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_7_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
        //------

        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();

        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        col_view.$col.append(this.$table_view);
        //----------------------------------------------------------------
        // Дабавим закладку на форму
        this.$table_view.append('<div id="manual-usage-fee" class="col-xl-12"></div>');
        //-----------------------------------------------------------------
        row_common.$row.append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем 1 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;

                LockScreenOff();
            }
        }.bind(this);
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db(['cargo_out_group'], false, function (result) {
        //-----------------------------------------------
        // Таблица-Вагоны с корректировкой платы.
        this.table_manual_usage_fee = new TTDR('div#manual-usage-fee');         // Создадим экземпляр
        this.table_manual_usage_fee.init({
            alert: null,
            detali_table: false,
            type_report: 'manual_usage_fee',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        //}.bind(this));
    };
    // Показать отчет  "Вагоны с корректировкой платы"
    view_td_report.prototype.view_report_7_1 = function (start, stop) {
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                this.view_filter_report_manual_usage_fee();
                LockScreenOff();
            }
        }.bind(this);

        LockScreen(langView('vtdr_load_vagon', App.Langs));
        // Отправка
        this.ids_wsd.getReportViewOutgoingCarsOfPeriod(start, stop, false, function (result_cars) {
            this.manual_usage_fee = result_cars.filter(function (i) { return i.wagon_usage_fee_manual_fee_amount !== null }.bind(this));
            process_load--;
            out_load(process_load);

        }.bind(this));
    };
    // Выполнить фильтрацию и вывести данные по отчету "Вагоны с корректировкой платы"
    view_td_report.prototype.view_filter_report_manual_usage_fee = function () {
        if (this.manual_usage_fee) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.manual_usage_fee));
            // Отобразим
            this.table_manual_usage_fee.view(list_view);
            LockScreenOff();
        }
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_7_1 = function () {
        this.manual_usage_fee = [];
        LockScreenOff();
    };
    //------------------------------------------------------------------------------------------------
    // Инициализировать отчет "История ставок"
    view_td_report.prototype.init_report_8_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 8;        // номер отчета
        this.report_panel = 0;  // номер под-отчета

        this.list_operators = [];
        this.list_rod = [];

        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_8_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                          // Инициализация формы выбора периода отчетов
        //------

        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();

        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        col_view.$col.append(this.$table_view);
        //----------------------------------------------------------------
        // Создадим форму выбора для отчета
        this.form_panel_operator_rod = new FIL();
        var fl_select_operators = {
            type: 'select',
            id: 'operators',
            prefix: 'sm',
            title: langView('vtdr_title_operation_amkr', App.Langs),
            list: this.list_operators,
            default: this.type,
            select: function (event, ui) {
                event.preventDefault();
                // Обработать выбор
                this.view_filter_report_usage_fee_period();
                //var id = Number($(event.currentTarget).val());
                //this.select_report(id);
            }.bind(this),
        };
        var fl_select_genus = {
            type: 'select',
            id: 'genus',
            prefix: 'sm',
            title: langView('vtdr_title_genus', App.Langs),
            list: this.list_rod,
            default: this.month + 1,
            select: function (event, ui) {
                event.preventDefault();
                this.view_filter_report_usage_fee_period();
                // Обработать выбор
            }.bind(this),
        };
        //var fl_button = {
        //    type: 'button',
        //    id: 'button',
        //    prefix: 'sm',
        //    title: langView('vtdr_title_button', App.Langs),
        //    icon: 'fas fa-retweet',
        //    select: function (e, ui) {
        //        event.preventDefault();
        //        this.view_filter_report_usage_fee_period();
        //        //this.view_report();
        //    }.bind(this),
        //};
        var fields = [];
        fields.push(fl_select_operators);
        fields.push(fl_select_genus);
        /*        fields.push(fl_button);*/
        // Инициализация формы
        this.form_panel_operator_rod.init({
            fields: fields,
            cl_form: 'd-flex w-100 mb-2'
        });

        this.$table_view.append(this.form_panel_operator_rod.$form);
        // Дабавим закладку на форму
        this.$table_view.append('<div id="usage-fee-period" class="col-xl-12"></div>');
        //-----------------------------------------------------------------
        row_common.$row.append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем 4 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;

                LockScreenOff();
            }
        }.bind(this);
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db(['cargo_out_group'], false, function (result) {
        //-----------------------------------------------
        // Таблица-Плата за пользование груз по ПРИБ.
        this.table_usage_fee_period = new TTDR('div#usage-fee-period');         // Создадим экземпляр
        this.table_usage_fee_period.init({
            alert: null,
            detali_table: false,
            type_report: 'usage_fee_period',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });

        this.select_operations = this.form_panel_operator_rod.get_element('operators');
        this.select_rod = this.form_panel_operator_rod.get_element('genus');
        //}.bind(this));
    };
    // Показать отчет  "История ставок"
    view_td_report.prototype.view_report_8_1 = function (start, stop) {
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                this.list_operators = [];
                this.list_rod = [];
                $.each(this.usage_fee_period, function (key, value) {
                    // выборка для списков отчета
                    var lop = this.list_operators.find(function (o) { return o.value === value.usage_fee_period_id_operator }.bind(this));
                    if (!lop) {
                        this.list_operators.push({ value: value.usage_fee_period_id_operator, text: value['usage_fee_period_operator_abbr_' + App.Lang] });
                    }
                    var lrod = this.list_rod.find(function (o) { return o.value === value.usage_fee_period_id_genus }.bind(this));
                    if (!lrod) {
                        this.list_rod.push({ value: value.usage_fee_period_id_genus, text: value['usage_fee_period_genus_abbr_' + App.Lang] });
                    }
                }.bind(this));
                //
                this.select_operations.update(this.list_operators, -1);
                this.select_rod.update(this.list_rod, -1);
                this.view_filter_report_usage_fee_period();
                LockScreenOff();
            }
        }.bind(this);

        LockScreen(langView('vtdr_load_vagon', App.Langs));
        // Отправка
        this.ids_wsd.getReportUsage_Fee_PeriodOfDateTime(start, stop, function (result_ufp) {
            this.usage_fee_period = result_ufp;

            process_load--;
            out_load(process_load);

        }.bind(this));
    };
    // Выполнить фильтрацию и вывести данные по отчету "Плата за пользование груз по ПРИБ."
    view_td_report.prototype.view_filter_report_usage_fee_period = function () {
        if (this.usage_fee_period) {
            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.usage_fee_period));
            var id_operator = Number(this.select_operations.val());
            var id_genus = Number(this.select_rod.val());
            if (id_operator >= 0) {
                list_view = list_view.filter(function (i) {
                    return i.usage_fee_period_id_operator === id_operator
                }.bind(this));
            }
            if (id_genus >= 0) {
                list_view = list_view.filter(function (i) {
                    return i.usage_fee_period_id_genus === id_genus
                }.bind(this));
            }
            // Отобразим
            this.table_usage_fee_period.view(list_view);
            LockScreenOff();
        }
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_8_1 = function () {
        this.usage_fee_period = [];
        this.list_operators = [];
        this.list_rod = [];
        if (this.select_operations) this.select_operations.update(this.list_operators, -1);
        if (this.select_rod) this.select_rod.update(this.list_rod, -1);
        if (this.table_usage_fee_period) {
            this.view_filter_report_usage_fee_period();
        }
        LockScreenOff();
    };
    //------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Плата за пользование (ИТОГ)"
    view_td_report.prototype.init_report_9_1 = function () {
        this.is_acts = false;
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 9;        // номер отчета
        this.report_panel = 0;  // номер под-отчета
        this.chart_data_usage_fee_cargo = [];
        this.chart_data_usage_fee_operator_amkr = [];
        this.chart_data_usage_fee_operator_amkr_derailment = [];
        this.chart_data_usage_fee_cargo_not_derailment = [];

        $('#sidebar').toggleClass('active');                                                // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_9_1', App.Langs).format(''));   // выведем название отчета
        this.init_select_report();                                                     // Инициализация формы выбора периода отчетов
        //------

        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;

        var row_common = new this.fe_ui.bs_row();

        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        col_view.$col.append(this.$table_view);
        //----------------------------------------------------------------
        // Создадим панель выбора отчета
        this.nav_tabs_usage_fee = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-usage-fee',
            class_nav: null,
            id_content: 'tab-usage-fee-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'usage-fee-cargo',
                    aria_controls: 'usage-fee-cargo-tab',
                    label: langView('vtdr_label_tab_usage_fee_cargo', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'usage-fee-operator-amkr',
                    aria_controls: 'usage-fee-operator-amkr-tab',
                    label: langView('vtdr_label_tab_usage_fee_operator_amkr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'usage-fee-operator-amkr-derailment',
                    aria_controls: 'usage-fee-operator-amkr-derailment-tab',
                    label: langView('vtdr_label_tab_usage_fee_operator_amkr_derailment', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'usage-fee-cargo-not-derailment',
                    aria_controls: 'usage-fee-cargo-not-derailment-tab',
                    label: langView('vtdr_label_tab_usage_fee_cargo_not_derailment', App.Langs),
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        //----------------------------------------
        // Закладка Плата за пользование груз по ПРИБ.
        this.init_panel_horizontal_report(this.nav_tabs_usage_fee, 'usage-fee-cargo-tab', 'usage-fee-cargo', 5, 7);
        // Закладка Плата за пользование груз по операторам.
        this.init_panel_horizontal_report(this.nav_tabs_usage_fee, 'usage-fee-operator-amkr-tab', 'usage-fee-operator-amkr', 6, 6);
        // Закладка Плата за пользование груз по операторам-сход.
        this.init_panel_horizontal_report(this.nav_tabs_usage_fee, 'usage-fee-operator-amkr-derailment-tab', 'usage-fee-operator-amkr-derailment', 6, 6);
        // Закладка Плата за пользование груз по ПРИБ-без схода.
        this.init_panel_horizontal_report(this.nav_tabs_usage_fee, 'usage-fee-cargo-not-derailment-tab', 'usage-fee-cargo-not-derailment', 5, 7);

        //-------------------------------------------
        // Дабавим закладку на форму
        this.$table_view.append(this.nav_tabs_usage_fee.$ul).append(this.nav_tabs_usage_fee.$content);
        //-----------------------------------------------------------------
        row_common.$row.append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем 4 процесса инициализации (паралельно)
        var process = 8;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    switch (event.target.id) {
                        case 'usage-fee-cargo': {
                            this.report_panel = 0;
                            this.view_filter_report_usage_fee_cargo();
                            break;
                        };
                        case 'usage-fee-operator-amkr': {
                            this.report_panel = 1;
                            this.view_filter_report_usage_fee_operator_amkr();
                            break;
                        };
                        case 'usage-fee-operator-amkr-derailment': {
                            this.report_panel = 2;
                            this.view_filter_report_usage_fee_operator_amkr_derailment();
                            break;
                        };
                        case 'usage-fee-cargo-not-derailment': {
                            this.report_panel = 3;
                            this.view_filter_report_usage_fee_cargo_not_derailment();
                            break;
                        };
                    };
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        // Загрузим справочные данные, определим поля формы правки
        //this.load_db(['cargo_out_group'], false, function (result) {
        //-----------------------------------------------
        // Таблица-Плата за пользование груз по ПРИБ.
        this.table_usage_fee_cargo = new TTDR('div#usage-fee-cargo');         // Создадим экземпляр
        this.table_usage_fee_cargo.init({
            alert: null,
            detali_table: false,
            type_report: 'usage_fee_cargo',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: donut_with_radial_gradient
        this.chart_usage_fee_cargo = new CAM('div#usage-fee-cargo-chart');         // Создадим экземпляр
        this.chart_usage_fee_cargo.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Плата за пользование груз по операторам.
        this.table_usage_fee_operator_amkr = new TTDR('div#usage-fee-operator-amkr');         // Создадим экземпляр
        this.table_usage_fee_operator_amkr.init({
            alert: null,
            detali_table: false,
            type_report: 'usage_fee_operator_amkr',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: partitioned_bar_chart
        this.chart_usage_fee_operator_amkr = new CAM('div#usage-fee-operator-amkr-chart');         // Создадим экземпляр
        this.chart_usage_fee_operator_amkr.init({
            alert: null,
            type_chart: 'partitioned_bar_chart',     //stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Плата за пользование груз по операторам-сход.
        this.table_usage_fee_operator_amkr_derailment = new TTDR('div#usage-fee-operator-amkr-derailment');         // Создадим экземпляр
        this.table_usage_fee_operator_amkr_derailment.init({
            alert: null,
            detali_table: false,
            type_report: 'usage_fee_operator_amkr_derailment',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: partitioned_bar_chart
        this.chart_usage_fee_operator_amkr_derailment = new CAM('div#usage-fee-operator-amkr-derailment-chart');         // Создадим экземпляр
        this.chart_usage_fee_operator_amkr_derailment.init({
            alert: null,
            type_chart: 'partitioned_bar_chart',     //stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });
        // Таблица-Плата за пользование груз по ПРИБ (без схода).
        this.table_usage_fee_cargo_not_derailment = new TTDR('div#usage-fee-cargo-not-derailment');         // Создадим экземпляр
        this.table_usage_fee_cargo_not_derailment.init({
            alert: null,
            detali_table: false,
            type_report: 'usage_fee_cargo_not_derailment',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        // Инициализация модуля графиков тип: donut_with_radial_gradient
        this.chart_usage_fee_cargo_not_derailment = new CAM('div#usage-fee-cargo-not-derailment-chart');         // Создадим экземпляр
        this.chart_usage_fee_cargo_not_derailment.init({
            alert: null,
            type_chart: 'donut_with_radial_gradient',     //stacked_column_chart_percent
            list_name: this.ids_dir.list_cargo_out_group,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
        });

        //}.bind(this));
    };
    // Показать отчет  "Плата за пользование (ИТОГ)"
    view_td_report.prototype.view_report_9_1 = function (start, stop, is_acts) {
        this.is_acts = is_acts;
        // Запускаем 6 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                this.view_filter_report_usage_fee_cargo();
                this.view_filter_report_usage_fee_operator_amkr();
                this.view_filter_report_usage_fee_operator_amkr_derailment()
                this.view_filter_report_usage_fee_cargo_not_derailment()
                LockScreenOff();
            }
        }.bind(this);

        LockScreen(langView('vtdr_load_adoption_sostav', App.Langs));
        // Отправка
        this.ids_wsd.getReportViewOutgoingCarsOfPeriod(start, stop, this.is_acts, function (result_cars) {
            this.outgoing_cars = result_cars;
            var list_cars_usage_fee = [];                       // сортировка по грузу
            var list_cars_usage_fee_not_derailment = [];        // сортировка по грузу и без схода
            var list_usage_fee_operator_amkr = [];              // сортировка по оператору
            var list_usage_fee_operator_amkr_derailment = [];   // сортировка по оператору тока сход

            var sum_amount = result_cars.filter(function (i) {
                return i.wagon_usage_fee_calc_fee_amount > 0 || i.wagon_usage_fee_manual_fee_amount > 0;
            }.bind(this)).reduce(function (a, b) {
                return a + (b.wagon_usage_fee_manual_fee_amount > 0 ? Number(b.wagon_usage_fee_manual_fee_amount) : Number(b.wagon_usage_fee_calc_fee_amount));
            }.bind(this), 0);
            var sum_amount_derailment = result_cars.filter(function (i) {
                return (i.wagon_usage_fee_calc_fee_amount > 0 || i.wagon_usage_fee_manual_fee_amount > 0) && i.wagon_usage_fee_derailment;
            }.bind(this)).reduce(function (a, b) {
                return a + (b.wagon_usage_fee_manual_fee_amount > 0 ? Number(b.wagon_usage_fee_manual_fee_amount) : Number(b.wagon_usage_fee_calc_fee_amount));
            }.bind(this), 0);
            var sum_amount_not_derailment = result_cars.filter(function (i) {
                return (i.wagon_usage_fee_calc_fee_amount > 0 || i.wagon_usage_fee_manual_fee_amount > 0) && !i.wagon_usage_fee_derailment;
            }.bind(this)).reduce(function (a, b) {
                return a + (b.wagon_usage_fee_manual_fee_amount > 0 ? Number(b.wagon_usage_fee_manual_fee_amount) : Number(b.wagon_usage_fee_calc_fee_amount));
            }.bind(this), 0);
            // выборка для списков Отчет-Груз по Оператору АМКР
            $.each(result_cars, function (key, el_wag) {
                if (el_wag.wagon_usage_fee_calc_fee_amount > 0) {
                    var op = list_usage_fee_operator_amkr.find(function (o) {
                        return o.id_operator === el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator &&
                            o.id_cargo === el_wag.arrival_uz_vagon_id_cargo
                    }.bind(this));
                    var fee_amout = el_wag.wagon_usage_fee_manual_fee_amount !== null ? el_wag.wagon_usage_fee_manual_fee_amount : el_wag.wagon_usage_fee_calc_fee_amount ? el_wag.wagon_usage_fee_calc_fee_amount : 0;
                    if (!op) {
                        // Не данных 
                        list_usage_fee_operator_amkr.push({
                            id_operator: el_wag.outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator,
                            operators: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_group_operators_' + App.Lang],
                            operator_abbr: el_wag['outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_' + App.Lang],
                            id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                            cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                            count_wagon: 1,
                            sum_calc_time: el_wag.wagon_usage_fee_downtime ? el_wag.wagon_usage_fee_downtime : 0,
                            sum_calc_fee_amount: fee_amout,
                            persent: Number(Number(fee_amout * 100) / sum_amount),
                            persent_derailment: el_wag.wagon_usage_fee_derailment ? Number(Number(fee_amout * 100) / sum_amount_derailment) : 0,
                            derailment: el_wag.wagon_usage_fee_derailment,
                        });
                    } else {
                        op.count_wagon = op.count_wagon + 1;
                        op.sum_calc_time = el_wag.wagon_usage_fee_downtime ? op.sum_calc_time + el_wag.wagon_usage_fee_downtime : op.sum_calc_time;
                        op.sum_calc_fee_amount = op.sum_calc_fee_amount + fee_amout;
                        op.persent = Number(Number(op.sum_calc_fee_amount * 100) / sum_amount);
                        op.persent_derailment = op.wagon_usage_fee_derailment ? Number(Number(op.sum_calc_fee_amount * 100) / sum_amount_derailment) : 0;
                    };
                    //--------------------------------------------------------
                    var cuf = list_cars_usage_fee.find(function (o) {
                        return o.id_cargo === el_wag.arrival_uz_vagon_id_cargo
                    }.bind(this));
                    var fee_amout = el_wag.wagon_usage_fee_manual_fee_amount !== null ? el_wag.wagon_usage_fee_manual_fee_amount : el_wag.wagon_usage_fee_calc_fee_amount ? el_wag.wagon_usage_fee_calc_fee_amount : 0;
                    if (!cuf) {
                        // Не данных 
                        list_cars_usage_fee.push({
                            id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                            cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                            count_wagon: 1,
                            sum_calc_time: el_wag.wagon_usage_fee_downtime ? el_wag.wagon_usage_fee_downtime : 0,
                            sum_calc_fee_amount: fee_amout,
                            persent: Number(Number(fee_amout * 100) / sum_amount),
                            persent_not_derailment: !el_wag.wagon_usage_fee_derailment ? Number(Number(fee_amout * 100) / sum_amount_not_derailment) : 0,
                            derailment: el_wag.wagon_usage_fee_derailment,
                        });
                    } else {
                        cuf.count_wagon = cuf.count_wagon + 1;
                        cuf.sum_calc_time = el_wag.wagon_usage_fee_downtime ? cuf.sum_calc_time + el_wag.wagon_usage_fee_downtime : cuf.sum_calc_time;
                        cuf.sum_calc_fee_amount = cuf.sum_calc_fee_amount + fee_amout;
                        cuf.persent = Number(Number(cuf.sum_calc_fee_amount * 100) / sum_amount);
                        cuf.persent_not_derailment = !cuf.wagon_usage_fee_derailment ? Number(Number(cuf.sum_calc_fee_amount * 100) / sum_amount_not_derailment) : 0;
                    };
                    //--------------------------------------------------------
                    if (!el_wag.wagon_usage_fee_derailment) {
                        var cufnd = list_cars_usage_fee_not_derailment.find(function (o) {
                            return o.id_cargo === el_wag.arrival_uz_vagon_id_cargo
                        }.bind(this));
                        var fee_amout = el_wag.wagon_usage_fee_manual_fee_amount !== null ? el_wag.wagon_usage_fee_manual_fee_amount : el_wag.wagon_usage_fee_calc_fee_amount ? el_wag.wagon_usage_fee_calc_fee_amount : 0;
                        if (!cufnd) {
                            // Не данных 
                            list_cars_usage_fee_not_derailment.push({
                                id_cargo: el_wag.arrival_uz_vagon_id_cargo,
                                cargo_name: el_wag['arrival_uz_vagon_cargo_name_' + App.Lang],
                                count_wagon: 1,
                                sum_calc_time: el_wag.wagon_usage_fee_downtime ? el_wag.wagon_usage_fee_downtime : 0,
                                sum_calc_fee_amount: fee_amout,
                                persent: Number(Number(fee_amout * 100) / sum_amount),
                                persent_not_derailment: !el_wag.wagon_usage_fee_derailment ? Number(Number(fee_amout * 100) / sum_amount_not_derailment) : 0,
                                derailment: el_wag.wagon_usage_fee_derailment,
                            });
                        } else {
                            cufnd.count_wagon = cufnd.count_wagon + 1;
                            cufnd.sum_calc_time = el_wag.wagon_usage_fee_downtime ? cufnd.sum_calc_time + el_wag.wagon_usage_fee_downtime : cufnd.sum_calc_time;
                            cufnd.sum_calc_fee_amount = cufnd.sum_calc_fee_amount + fee_amout;
                            cufnd.persent = Number(Number(cufnd.sum_calc_fee_amount * 100) / sum_amount);
                            cufnd.persent_not_derailment = !cufnd.wagon_usage_fee_derailment ? Number(Number(cufnd.sum_calc_fee_amount * 100) / sum_amount_not_derailment) : 0;
                        };
                    }

                };
            }.bind(this));
            this.outgoing_cars_usage_fee = this.sort_table(list_cars_usage_fee, 'id_cargo', 'count_wagon', true);
            this.outgoing_cars_usage_fee_not_derailment = this.sort_table(list_cars_usage_fee_not_derailment, 'id_cargo', 'count_wagon', true);
            this.outgoing_cars_usage_fee_operator_amkr = this.sort_table(list_usage_fee_operator_amkr, 'id_cargo', 'count_wagon', true);

            process_load--;
            out_load(process_load);

        }.bind(this));
    };
    // Выполнить фильтрацию и вывести данные по отчету "Плата за пользование груз по ПРИБ."
    view_td_report.prototype.view_filter_report_usage_fee_cargo = function () {
        if (this.outgoing_cars_usage_fee) {

            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.outgoing_cars_usage_fee));
            // Применим фильтр

            // Отобразим
            this.table_usage_fee_cargo.view(list_view);

            var data = [

            ];

            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.cargo_name; });
                if (gn === undefined) {
                    data.push({ "name": element.cargo_name, "value": element.sum_calc_fee_amount });
                } else {
                    gn.value += element.sum_calc_fee_amount;
                }
            }.bind(this));

            this.chart_data_usage_fee_cargo = data;
            this.view_chart_usage_fee_cargo();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Плата за пользование груз по ПРИБ."
    view_td_report.prototype.view_chart_usage_fee_cargo = function () {
        if (this.report_panel === 0 && this.chart_data_usage_fee_cargo) {
            this.chart_usage_fee_cargo.view(this.chart_data_usage_fee_cargo);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Таблица-Плата за пользование груз по операторам"
    view_td_report.prototype.view_filter_report_usage_fee_operator_amkr = function () {
        if (this.outgoing_cars_usage_fee_operator_amkr) {

            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.outgoing_cars_usage_fee_operator_amkr));
            // Применим фильтр

            // Отобразим
            this.table_usage_fee_operator_amkr.view(list_view);

            var data = [

            ];

            $.each(this.sort_table(list_view, 'id_cargo', 'sum_calc_fee_amount', false), function (key, element) {
                data.push({ "group": element.cargo_name, "name": element.operator_abbr + "-" + element.count_wagon + "ваг.," + Number(element.sum_calc_fee_amount).toFixed(0) + "грн.", "value": Number(Number(element.sum_calc_fee_amount).toFixed(0)) });
            }.bind(this));

            this.chart_data_usage_fee_operator_amkr = data;
            this.view_chart_usage_fee_operator_amkr();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Таблица-Плата за пользование груз по операторам"
    view_td_report.prototype.view_chart_usage_fee_operator_amkr = function () {
        if (this.report_panel === 1 && this.chart_data_usage_fee_operator_amkr) {
            this.chart_usage_fee_operator_amkr.view(this.chart_data_usage_fee_operator_amkr);
        }
    };
    // Выполнить фильтрацию и вывести данные по отчету "Таблица-Плата за пользование груз по операторам-сход"
    view_td_report.prototype.view_filter_report_usage_fee_operator_amkr_derailment = function () {
        if (this.outgoing_cars_usage_fee_operator_amkr) {

            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.outgoing_cars_usage_fee_operator_amkr.filter(function (i) { return i.derailment; }.bind(this))));
            // Применим фильтр

            // Отобразим
            this.table_usage_fee_operator_amkr_derailment.view(list_view);

            var data = [

            ];

            $.each(this.sort_table(list_view, 'id_cargo', 'sum_calc_fee_amount', false), function (key, element) {
                data.push({ "group": element.cargo_name, "name": element.operator_abbr + "-" + element.count_wagon + "ваг.," + Number(element.sum_calc_fee_amount).toFixed(0) + "грн.", "value": Number(Number(element.sum_calc_fee_amount).toFixed(0)) });
            }.bind(this));

            this.chart_data_usage_fee_operator_amkr_derailment = data;
            this.view_chart_usage_fee_operator_amkr_derailment();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Таблица-Плата за пользование груз по операторам-сход"
    view_td_report.prototype.view_chart_usage_fee_operator_amkr_derailment = function () {
        if (this.report_panel === 2 && this.chart_data_usage_fee_operator_amkr_derailment) {
            this.chart_usage_fee_operator_amkr_derailment.view(this.chart_data_usage_fee_operator_amkr_derailment);
        }
    }
    // Выполнить фильтрацию и вывести данные по отчету "Плата за пользование груз по ПРИБ. (без схода)"
    view_td_report.prototype.view_filter_report_usage_fee_cargo_not_derailment = function () {
        if (this.outgoing_cars_usage_fee_not_derailment) {

            // сделаем копию данных
            var list_view = JSON.parse(JSON.stringify(this.outgoing_cars_usage_fee_not_derailment));
            // Применим фильтр

            // Отобразим
            this.table_usage_fee_cargo_not_derailment.view(list_view);

            var data = [

            ];

            $.each(list_view, function (key, element) {
                var gn = data.find(function (o) { return o.name === element.cargo_name; });
                if (gn === undefined) {
                    data.push({ "name": element.cargo_name, "value": element.sum_calc_fee_amount });
                } else {
                    gn.value += element.sum_calc_fee_amount;
                }
            }.bind(this));

            this.chart_data_usage_fee_cargo_not_derailment = data;
            this.view_chart_usage_fee_cargo_not_derailment();
            LockScreenOff();
        }
    };
    // Вывести данные по диаграмме "Плата за пользование груз по ПРИБ.(без схода)"
    view_td_report.prototype.view_chart_usage_fee_cargo_not_derailment = function () {
        if (this.report_panel === 3 && this.chart_data_usage_fee_cargo_not_derailment) {
            this.chart_usage_fee_cargo_not_derailment.view(this.chart_data_usage_fee_cargo_not_derailment);
        }
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_9_1 = function () {
        this.outgoing_cars = [];
        this.outgoing_cars_usage_fee = [];
        this.outgoing_cars_usage_fee_not_derailment = [];
        this.outgoing_cars_usage_fee_operator_amkr = [];
        this.outgoing_cars_usage_fee_operator_amkr_derailment = [];
        if (this.table_usage_fee_cargo) {
            this.view_filter_report_usage_fee_cargo();
            this.view_filter_report_usage_fee_operator_amkr();
            this.view_filter_report_usage_fee_operator_amkr_derailment();
        }
        LockScreenOff();
    };
    //--------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Остаток (ОБЩИЙ)"
    view_td_report.prototype.init_report_10_1 = function () {
        //this.is_acts = false;
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 10; // номер отчета
        $('#sidebar').toggleClass('active');                                                    // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_10_1', App.Langs).format(''));      // выведем название отчета
        this.init_select_report();                                                              // Инициализация формы выбора периода отчетов

        //
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        // Дабавим закладку на форму
        var $tab_count = $('<table class="table table-bordered"><tbody><tr><th>Всего вагонов</th><td class="dt-centr" id="count_wagon"></td></tr></tbody></table>');
        var $col_count = $('<div id="operation-balance-count" class="col-xl-2"></div>');
        fieldset_view.$fieldset.append($col_count.append($tab_count));
        fieldset_view.$fieldset.append('<div id="operation-balance" class="col-xl-12"></div>');
        this.$table_view = fieldset_view.$fieldset;
        //
        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);
        //
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------
        // Формируем форму выбора
        var form_residue_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_residue_setup_select = form_residue_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_10_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        // Внешние стороние вагоны
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_outer_cars = new this.fe_ui.bs_switch({
            id: 'outer_cars',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_outer_cars', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_outer_cars.$element);
        this.switch_outer_cars = sw_outer_cars.element;
        // Внешние вагоны АМКР
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_amkr_outer_cars = new this.fe_ui.bs_switch({
            id: 'amkr_outer_cars',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_amkr_outer_cars', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_amkr_outer_cars.$element);
        this.switch_amkr_outer_cars = sw_amkr_outer_cars.element;
        // Цистерны арендованные
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_amkr_cisterns = new this.fe_ui.bs_switch({
            id: 'amkr_cisterns',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_amkr_cisterns', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_amkr_cisterns.$element);
        this.switch_amkr_cisterns = sw_amkr_cisterns.element;
        // Платные
        var row_setup_sw4 = new this.fe_ui.bs_row();
        var sw_paid = new this.fe_ui.bs_switch({
            id: 'paid',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_paid', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: false,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_sw4.$row.append(sw_paid.$element);
        this.switch_paid = sw_paid.element;
        // вагоны
        var row_setup_1 = new this.fe_ui.bs_row();
        var ta_wagon_nums = new this.fe_ui.bs_textarea({
            id: 'wagon_nums',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_wagon_nums', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_wagon_nums', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_1.$row.append(ta_wagon_nums.$element);
        this.textarea_wagon_nums = ta_wagon_nums.element;
        // основн документы
        var row_setup_2 = new this.fe_ui.bs_row();
        var ta_main_epd_docs = new this.fe_ui.bs_textarea({
            id: 'main_epd_docs',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_main_epd_docs', App.Langs),
            label_class: 'mb-1',
            textarea_size: 'sm',
            textarea_rows: 2,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: langView('vtdr_title_main_epd_docs', App.Langs),
            textarea_maxlength: null,
            textarea_placeholder: 'xxxxxxxx;xxxxxxxx',
            textarea_required: null,
            textarea_readonly: false,
        });
        row_setup_2.$row.append(ta_main_epd_docs.$element);
        this.textarea_main_epd_docs = ta_main_epd_docs.element;
        // Операторы АМКР
        var row_setup_3 = new this.fe_ui.bs_row();
        var select_operation_amkr = new this.fe_ui.bs_select_multiple({
            id: 'operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_3.$row.append(select_operation_amkr.$element);
        this.select_operation_amkr = select_operation_amkr.element;
        // Разметка по прибытию
        var row_setup_4_0 = new this.fe_ui.bs_row();
        var select_arr_condition = new this.fe_ui.bs_select_multiple({
            id: 'arr_condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_4_0.$row.append(select_arr_condition.$element);
        this.select_arr_condition = select_arr_condition.element;
        // Разметка текущая
        var row_setup_4 = new this.fe_ui.bs_row();
        var select_curr_condition = new this.fe_ui.bs_select_multiple({
            id: 'curr_condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_curr_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_curr_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_4.$row.append(select_curr_condition.$element);
        this.select_curr_condition = select_curr_condition.element;
        // Род вагона
        var row_setup_5 = new this.fe_ui.bs_row();
        var select_genus = new this.fe_ui.bs_select_multiple({
            id: 'genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_5.$row.append(select_genus.$element);
        this.select_genus = select_genus.element;
        // Тип вагона
        var row_setup_6 = new this.fe_ui.bs_row();
        var select_type_wagons = new this.fe_ui.bs_select_multiple({
            id: 'type_wagons',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_type_wagons', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_type_wagons', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_6.$row.append(select_type_wagons.$element);
        this.select_type_wagons = select_type_wagons.element;
        // Груз ПРИБ
        var row_setup_7 = new this.fe_ui.bs_row();
        var select_arr_cargo = new this.fe_ui.bs_select_multiple({
            id: 'arr_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_7.$row.append(select_arr_cargo.$element);
        this.select_arr_cargo = select_arr_cargo.element;
        // Сертификатные данные
        var row_setup_8 = new this.fe_ui.bs_row();
        var select_certification_data = new this.fe_ui.bs_select_multiple({
            id: 'certification_data',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_certification_data', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_certification_data', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_8.$row.append(select_certification_data.$element);
        this.select_certification_data = select_certification_data.element;
        // Станция отправления
        var row_setup_9 = new this.fe_ui.bs_row();
        var select_arr_ext_station_to = new this.fe_ui.bs_select_multiple({
            id: 'arr_ext_station_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_ext_station_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_ext_station_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_9.$row.append(select_arr_ext_station_to.$element);
        this.select_arr_ext_station_to = select_arr_ext_station_to.element;
        // Цех получатель
        var row_setup_10 = new this.fe_ui.bs_row();
        var select_inp_division = new this.fe_ui.bs_select_multiple({
            id: 'inp_division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_inp_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_inp_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_10.$row.append(select_inp_division.$element);
        this.select_inp_division = select_inp_division.element;
        // Груз ОТПР SAP
        var row_setup_11 = new this.fe_ui.bs_row();
        var select_out_sap_cargo = new this.fe_ui.bs_select_multiple({
            id: 'out_sap_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_sap_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_sap_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_11.$row.append(select_out_sap_cargo.$element);
        this.select_out_sap_cargo = select_out_sap_cargo.element;
        // Склад погрузки SAP
        var row_setup_12 = new this.fe_ui.bs_row();
        var select_sap_warehouse_name = new this.fe_ui.bs_select_multiple({
            id: 'sap_warehouse_name',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_sap_warehouse_name', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_sap_warehouse_name', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {
            }.bind(this),
        });
        row_setup_12.$row.append(select_sap_warehouse_name.$element);
        this.select_sap_warehouse_name = select_sap_warehouse_name.element;
        // Станция назначения SAP
        var row_setup_13 = new this.fe_ui.bs_row();
        var select_sap_destination_station = new this.fe_ui.bs_select_multiple({
            id: 'sap_destination_station',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_sap_destination_station', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_sap_destination_station', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {
            }.bind(this),
        });
        row_setup_13.$row.append(select_sap_destination_station.$element);
        this.select_sap_destination_station = select_sap_destination_station.element;
        // Груз ОТПР
        var row_setup_14 = new this.fe_ui.bs_row();
        var select_out_cargo = new this.fe_ui.bs_select_multiple({
            id: 'out_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_14.$row.append(select_out_cargo.$element);
        this.select_out_cargo = select_out_cargo.element;
        // Станция назначения
        var row_setup_15 = new this.fe_ui.bs_row();
        var select_out_ext_station_to = new this.fe_ui.bs_select_multiple({
            id: 'out_ext_station_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_ext_station_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_ext_station_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_15.$row.append(select_out_ext_station_to.$element);
        this.select_out_ext_station_to = select_out_ext_station_to.element;
        // Цех погрузки
        var row_setup_16 = new this.fe_ui.bs_row();
        var select_out_division = new this.fe_ui.bs_select_multiple({
            id: 'out_division',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_out_division', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_out_division', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_16.$row.append(select_out_division.$element);
        this.select_out_division = select_out_division.element;
        // Станция нахождения вагона
        var row_setup_17 = new this.fe_ui.bs_row();
        var select_curr_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'curr_station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_curr_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_curr_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_17.$row.append(select_curr_station_amkr.$element);
        this.select_curr_station_amkr = select_curr_station_amkr.element;
        // Станция нахождения вагона
        var row_setup_18 = new this.fe_ui.bs_row();
        var select_curr_way = new this.fe_ui.bs_select_multiple({
            id: 'curr_way',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_curr_way', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_curr_way', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_18.$row.append(select_curr_way.$element);
        this.select_curr_way = select_curr_way.element;
        //..........
        // Операция с вагоном
        // Состояние вагона
        //............

        // Вагоны без ПИСЕМ
        var row_setup_sw5 = new this.fe_ui.bs_row();
        var sw_not_letters = new this.fe_ui.bs_switch({
            id: 'not_letters',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_not_letters', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: false,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_sw5.$row.append(sw_not_letters.$element);
        this.switch_not_letters = sw_not_letters.element;
        // Запрет ОТК
        var row_setup_sw6 = new this.fe_ui.bs_row();
        var sw_OTC_ban = new this.fe_ui.bs_switch({
            id: 'OTC_ban',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_OTC_ban', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: false,
            element_change: function (e) {
                this.action_select_report_10_1();
            }.bind(this),
        });
        row_setup_sw6.$row.append(sw_OTC_ban.$element);
        this.switch_OTC_ban = sw_OTC_ban.element;
        //
        this.$form_residue_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_sw4.$row)
            .append(row_setup_sw5.$row)
            .append(row_setup_sw6.$row)
            .append(row_setup_1.$row)
            .append(row_setup_2.$row)
            .append(row_setup_3.$row)
            .append(row_setup_4_0.$row)
            .append(row_setup_4.$row)
            .append(row_setup_5.$row)
            .append(row_setup_6.$row)
            .append(row_setup_7.$row)
            .append(row_setup_8.$row)
            .append(row_setup_9.$row)
            .append(row_setup_10.$row)
            .append(row_setup_11.$row)
            .append(row_setup_12.$row)
            .append(row_setup_13.$row)
            .append(row_setup_14.$row)
            .append(row_setup_15.$row)
            .append(row_setup_16.$row)
            .append(row_setup_17.$row)
            .append(row_setup_18.$row);
        this.$setup_select.append(this.$form_residue_setup_select);

        // Запускаем 6 процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                LockScreenOff();
            }
        }.bind(this);
        // Оперативный остаток на АМКР
        this.table_operation_balance = new TTDR('div#operation-balance');         // Создадим экземпляр
        // Инициализация модуля "Оперативный остаток на АМКР"
        this.table_operation_balance.init({
            alert: null,
            detali_table: true,
            type_report: 'operation_balance',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        /*}.bind(this));*/
    };
    // Показать отчет  "Остаток (ОБЩИЙ)"
    view_td_report.prototype.view_report_10_1 = function (start, stop) {
        //this.is_acts = is_acts;
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 1;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_operating_balance', App.Langs));
        // Загрузим данные
        this.load_select_report_10_1(stop, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные
    view_td_report.prototype.load_select_report_10_1 = function (date, callback) {
        this.ids_wsd.getReportViewOperatingBalanceOfDate(date, function (result_operating_balance) {
            this.operating_balance = result_operating_balance;
            this.clone_operating_balance = JSON.parse(JSON.stringify(this.operating_balance));
            // Обработать и показать данные
            this.process_data_view_report_10_1(this.operating_balance, function () {
                // Выход
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));

        }.bind(this));
    };
    // Обработать и показать данные
    view_td_report.prototype.process_data_view_report_10_1 = function (operating_balance, callback) {
        // Продолжим
        this.report_operating_balance = [];
        this.list_operation_amkr = [];
        this.list_arrival_condition = [];
        this.list_curr_condition = [];
        this.list_genus = [];
        this.list_type_wagons = [];
        this.list_arr_cargo = [];
        this.list_certification_data = [];
        this.list_arr_ext_station_to = [];
        this.list_inp_division = [];
        this.list_out_sap_cargo = [];
        this.list_sap_warehouse_name = [];
        this.list_sap_destination_station = [];
        this.list_out_cargo = [];
        this.list_out_ext_station_to = [];
        this.list_out_division = [];
        this.list_curr_station_amkr = [];
        this.list_curr_way = [];

        var value_operation_amkr = this.select_operation_amkr.val();
        var value_arr_condition = this.select_arr_condition.val();
        var value_curr_condition = this.select_curr_condition.val();
        var value_genus = this.select_genus.val();
        var value_type_wagons = this.select_type_wagons.val();
        var value_arr_cargo = this.select_arr_cargo.val();
        var value_certification_data = this.select_certification_data.val();
        var value_arr_ext_station_to = this.select_arr_ext_station_to.val();
        var value_inp_division = this.select_inp_division.val();
        var value_out_sap_cargo = this.select_out_sap_cargo.val();
        var value_sap_warehouse_name = this.select_sap_warehouse_name.val();
        var value_sap_destination_station = this.select_sap_destination_station.val();
        var value_out_cargo = this.select_out_cargo.val();
        var value_out_ext_station_to = this.select_out_ext_station_to.val();
        var value_out_division = this.select_out_division.val();
        var value_curr_station_amkr = this.select_curr_station_amkr.val();
        var value_curr_way = this.select_curr_way.val();

        $.each(operating_balance, function (key, value) {
            var select = true;

            if (select && this.switch_paid.val() === true) {
                if (!value.current_wagons_rent_operator_paid) {
                    select = false;
                }
            }
            if (select && this.switch_not_letters.val() === true) {
                if (value.instructional_letters_num !== null) {
                    select = false;
                }
            }
            if (select && this.switch_OTC_ban.val() === true) {
                if (value.sap_incoming_supply_kod_r_10 !== '@5C@' && value.sap_incoming_supply_kod_r_10 !== '@5A@') {
                    select = false;
                }
            }
            if (select && this.switch_amkr_outer_cars.val() === false) {
                if (value.current_operators_wagons_group === 'amkr') {
                    select = false;
                }
            }
            if (select && this.switch_amkr_cisterns.val() === false) {
                if (value.current_operators_wagons_group === 'cisterns') {
                    select = false;
                }
            }
            if (select && this.switch_outer_cars.val() === false) {
                if (value.current_operators_wagons_group !== 'amkr' && value.current_operators_wagons_group !== 'cisterns') {
                    select = false;
                }
            }

            if (select && (!value_operation_amkr || value_operation_amkr.length > 0)) {
                //var res = value_operation_amkr.indexOf(String(value.arrival_uz_vagon_arrival_wagons_rent_id_operator));
                var res = value_operation_amkr.indexOf(value.current_wagons_rent_operator_abbr_ru);
                if (res === -1) select = false;
            }
            if (select && (!value_arr_condition || value_arr_condition.length > 0)) {
                var res = value_arr_condition.indexOf(String(value.arrival_uz_vagon_id_condition));
                if (res === -1) select = false;
            }
            if (select && (!value_curr_condition || value_curr_condition.length > 0)) {
                var res = value_curr_condition.indexOf(String(value.current_id_condition));
                if (res === -1) select = false;
            }
            if (select && (!value_genus || value_genus.length > 0)) {
                var res = value_genus.indexOf(String(value.arrival_uz_vagon_id_genus));
                if (res === -1) select = false;
            }
            if (select && (!value_type_wagons || value_type_wagons.length > 0)) {
                var res = value_type_wagons.indexOf(String(value.arrival_uz_vagon_id_type));
                if (res === -1) select = false;
            }
            if (select && (!value_arr_cargo || value_arr_cargo.length > 0)) {
                var res = value_arr_cargo.indexOf(String(value.arrival_uz_vagon_id_cargo));
                if (res === -1) select = false;
            }
            if (select && (!value_certification_data || value_certification_data.length > 0)) {
                var res = value_certification_data.indexOf(String(value.arrival_uz_vagon_id_certification_data));
                if (res === -1) select = false;
            }
            if (select && (!value_arr_ext_station_to || value_arr_ext_station_to.length > 0)) {
                var res = value_arr_ext_station_to.indexOf(String(value.arrival_uz_document_code_stn_from));
                if (res === -1) select = false;
            }
            if (select && (!value_inp_division || value_inp_division.length > 0)) {
                var res = value_inp_division.indexOf(String(value.arrival_uz_vagon_id_division_on_amkr));
                if (res === -1) select = false;
            }
            if (select && (!value_out_sap_cargo || value_out_sap_cargo.length > 0)) {
                var res = value_out_sap_cargo.indexOf(String(value.sap_outgoing_supply_cargo_code));
                if (res === -1) select = false;
            }
            if (select && (!value_sap_warehouse_name || value_sap_warehouse_name.length > 0)) {
                var res = value_sap_warehouse_name.indexOf(String(value.sap_outgoing_supply_warehouse_code));
                if (res === -1) select = false;
            }
            if (select && (!value_sap_destination_station || value_sap_destination_station.length > 0)) {
                var res = value_sap_destination_station.indexOf(String(value.sap_outgoing_supply_destination_station_code));
                if (res === -1) select = false;
            }
            // value_out_cargo
            // value_out_ext_station_to
            // value_out_division
            if (select && (!value_curr_station_amkr || value_curr_station_amkr.length > 0)) {
                var res = value_curr_station_amkr.indexOf(String(value.current_id_station_amkr));
                if (res === -1) select = false;
            }
            if (select && (!value_curr_way || value_curr_way.length > 0)) {
                var res = value_curr_way.indexOf(String(value.current_id_way));
                if (res === -1) select = false;
            }
            if (select) {
                this.report_operating_balance.push(value);
                var oa = this.list_operation_amkr.find(function (o) { return o.value === value.current_wagons_rent_operator_abbr_ru }.bind(this));
                if (!oa) {
                    this.list_operation_amkr.push({ value: value.current_wagons_rent_operator_abbr_ru, text: value['current_wagons_rent_operator_abbr_' + App.Lang] });
                }
                var ac = this.list_arrival_condition.find(function (o) { return o.value === value.arrival_uz_vagon_id_condition }.bind(this));
                if (!ac) {
                    this.list_arrival_condition.push({ value: value.arrival_uz_vagon_id_condition, text: value['arrival_uz_vagon_condition_abbr_' + App.Lang] });
                }
                var cc = this.list_curr_condition.find(function (o) { return o.value === value.current_id_condition }.bind(this));
                if (!cc) {
                    this.list_curr_condition.push({ value: value.current_id_condition, text: value['current_condition_abbr_' + App.Lang] });
                }
                var lg = this.list_genus.find(function (o) { return o.value === value.arrival_uz_vagon_id_genus }.bind(this));
                if (!lg) {
                    this.list_genus.push({ value: value.arrival_uz_vagon_id_genus, text: value['arrival_uz_vagon_rod_abbr_' + App.Lang] });
                }
                var tw = this.list_type_wagons.find(function (o) { return o.value === value.arrival_uz_vagon_id_type }.bind(this));
                if (!tw) {
                    this.list_type_wagons.push({ value: value.arrival_uz_vagon_id_type, text: value['arrival_uz_vagon_type_' + App.Lang] });
                }
                var acg = this.list_arr_cargo.find(function (o) { return o.value === value.arrival_uz_vagon_id_cargo }.bind(this));
                if (!acg) {
                    this.list_arr_cargo.push({ value: value.arrival_uz_vagon_id_cargo, text: value['arrival_uz_vagon_cargo_name_' + App.Lang] });
                }
                var cd = this.list_certification_data.find(function (o) { return o.value === value.arrival_uz_vagon_id_certification_data }.bind(this));
                if (!cd) {
                    this.list_certification_data.push({ value: value.arrival_uz_vagon_id_certification_data, text: value['arrival_uz_vagon_sertification_data_' + App.Lang] });
                }
                var aest = this.list_arr_ext_station_to.find(function (o) { return o.value === value.arrival_uz_document_code_stn_from }.bind(this));
                if (!aest) {
                    this.list_arr_ext_station_to.push({ value: value.arrival_uz_document_code_stn_from, text: value['arrival_uz_document_station_from_name_' + App.Lang] });
                }
                var lid = this.list_inp_division.find(function (o) { return o.value === value.arrival_uz_vagon_id_division_on_amkr }.bind(this));
                if (!lid) {
                    this.list_inp_division.push({ value: value.arrival_uz_vagon_id_division_on_amkr, text: value['arrival_uz_vagon_division_abbr_' + App.Lang] });
                }
                var oscg = this.list_out_sap_cargo.find(function (o) { return o.value === value.sap_outgoing_supply_cargo_code }.bind(this));
                if (!oscg) {
                    this.list_out_sap_cargo.push({ value: value.sap_outgoing_supply_cargo_code, text: value.sap_outgoing_supply_cargo_name });
                }
                var swn = this.list_sap_warehouse_name.find(function (o) { return o.value === value.sap_outgoing_supply_warehouse_code }.bind(this));
                if (!swn) {
                    this.list_sap_warehouse_name.push({ value: value.sap_outgoing_supply_warehouse_code, text: value.sap_outgoing_supply_warehouse_name });
                }
                var sds = this.list_sap_destination_station.find(function (o) { return o.value === value.sap_outgoing_supply_destination_station_code }.bind(this));
                if (!sds) {
                    this.list_sap_destination_station.push({ value: value.sap_outgoing_supply_destination_station_code, text: value.sap_outgoing_supply_destination_station_name });
                }
                //this.list_out_cargo = [];
                //this.list_out_ext_station_to = [];
                //this.list_out_division = [];
                var csa = this.list_curr_station_amkr.find(function (o) { return o.value === value.current_id_station_amkr }.bind(this));
                if (!csa) {
                    this.list_curr_station_amkr.push({ value: value.current_id_station_amkr, text: value['current_station_amkr_abbr_' + App.Lang] });
                }
                var csa = this.list_curr_way.find(function (o) { return o.value === value.current_id_way }.bind(this));
                if (!csa) {
                    this.list_curr_way.push({ value: value.current_id_way, text: value['current_way_abbr_' + App.Lang] });
                }
            }


        }.bind(this));
        $('td#count_wagon').text(this.report_operating_balance.length);
        // вывод данных
        this.table_operation_balance.view(this.report_operating_balance);
        // обновление списков отчета
        if (!value_operation_amkr || value_operation_amkr.length === 0) {
            this.select_operation_amkr.update(this.sort_text(this.list_operation_amkr, "text"), -1);
        }
        if (!value_arr_condition || value_arr_condition.length === 0) {
            this.select_arr_condition.update(this.sort_text(this.list_arrival_condition, "text"), -1);
        }
        if (!value_curr_condition || value_curr_condition.length === 0) {
            this.select_curr_condition.update(this.sort_text(this.list_curr_condition, "text"), -1);
        }
        if (!value_genus || value_genus.length === 0) {
            this.select_genus.update(this.sort_text(this.list_genus, "text"), -1);
        }
        if (!value_type_wagons || value_type_wagons.length === 0) {
            this.select_type_wagons.update(this.sort_text(this.list_type_wagons, "text"), -1);
        }
        if (!value_arr_cargo || value_arr_cargo.length === 0) {
            this.select_arr_cargo.update(this.sort_text(this.list_arr_cargo, "text"), -1);
        }
        if (!value_certification_data || value_certification_data.length === 0) {
            this.select_certification_data.update(this.sort_text(this.list_certification_data, "text"), -1);
        }
        if (!value_arr_ext_station_to || value_arr_ext_station_to.length === 0) {
            this.select_arr_ext_station_to.update(this.sort_text(this.list_arr_ext_station_to, "text"), -1);
        }
        if (!value_inp_division || value_inp_division.length === 0) {
            this.select_inp_division.update(this.sort_text(this.list_inp_division, "text"), -1);
        }
        if (!value_out_sap_cargo || value_out_sap_cargo.length === 0) {
            this.select_out_sap_cargo.update(this.sort_text(this.list_out_sap_cargo, "text"), -1);
        }
        if (!value_sap_warehouse_name || value_sap_warehouse_name.length === 0) {
            this.select_sap_warehouse_name.update(this.sort_text(this.list_sap_warehouse_name, "text"), -1);
        }
        if (!value_sap_destination_station || value_sap_destination_station.length === 0) {
            this.select_sap_destination_station.update(this.sort_text(this.list_sap_destination_station, "text"), -1);
        }
        if (!value_out_cargo || value_out_cargo.length === 0) {
            this.select_out_cargo.update(this.sort_text(this.list_out_cargo, "text"), -1);
        }
        if (!value_out_ext_station_to || value_out_ext_station_to.length === 0) {
            this.select_out_ext_station_to.update(this.sort_text(this.list_out_ext_station_to, "text"), -1);
        }
        if (!value_out_division || value_out_division.length === 0) {
            this.select_out_division.update(this.sort_text(this.list_out_division, "text"), -1);
        }
        if (!value_curr_station_amkr || value_curr_station_amkr.length === 0) {
            this.select_curr_station_amkr.update(this.sort_text(this.list_curr_station_amkr, "text"), -1);
        }
        if (!value_curr_way || value_curr_way.length === 0) {
            this.select_curr_way.update(this.sort_text(this.list_curr_way, "text"), -1);
        }
        // Выход
        if (typeof callback === 'function') {
            callback();
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_10_1 = function () {
        this.out_clear();
        this.nums = null;
        var list_nums = this.textarea_wagon_nums.val();
        if (list_nums !== '') {
            this.nums = is_valid_nums(list_nums, this.settings.alert, false, true);
            if (!this.nums) return;
        };
        this.main_epd_docs = null;
        var list_main_epd_docs = this.textarea_main_epd_docs.val();
        if (list_main_epd_docs !== '') {
            this.main_epd_docs = is_valid_docs(list_main_epd_docs, this.settings.alert, true);
            if (!this.main_epd_docs) return;
        };

        LockScreen(langView('vtdr_load_operating_balance', App.Langs));
        this.process_data_view_report_10_1(this.operating_balance, function () {
            LockScreenOff();
        }.bind(this));
    };
    // Очистить выбор
    view_td_report.prototype.action_clear_select_report_10_1 = function () {
        if (this.switch_outer_cars) { this.switch_outer_cars.val(true); }
        if (this.switch_amkr_outer_cars) { this.switch_amkr_outer_cars.val(true); }
        if (this.switch_amkr_cisterns) { this.switch_amkr_cisterns.val(true); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.switch_not_letters) { this.switch_not_letters.val(false); }
        if (this.switch_OTC_ban) { this.switch_OTC_ban.val(false); }
        if (this.textarea_wagon_nums) { this.textarea_wagon_nums.val(''); }
        if (this.textarea_main_epd_docs) { this.textarea_main_epd_docs.val(''); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_arr_condition) { this.select_arr_condition.val(-1); }
        if (this.select_curr_condition) { this.select_curr_condition.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_type_wagons) { this.select_type_wagons.val(-1); }
        if (this.select_arr_cargo) { this.select_arr_cargo.val(-1); }
        if (this.select_certification_data) { this.select_certification_data.val(-1); }
        if (this.select_arr_ext_station_to) { this.select_arr_ext_station_to.val(-1); }
        if (this.select_inp_division) { this.select_inp_division.val(-1); }
        if (this.select_out_sap_cargo) { this.select_out_sap_cargo.val(-1); }
        if (this.select_sap_warehouse_name) { this.select_sap_warehouse_name.val(-1); }
        if (this.select_sap_destination_station) { this.select_sap_destination_station.val(-1); }
        if (this.select_out_cargo) { this.select_out_cargo.val(-1); }
        if (this.select_out_ext_station_to) { this.select_out_ext_station_to.val(-1); }
        if (this.select_out_division) { this.select_out_division.val(-1); }
        if (this.select_curr_station_amkr) { this.select_curr_station_amkr.val(-1); }
        if (this.select_curr_way) { this.select_curr_way.val(-1); }
        // Обработать и показать данные
        this.process_data_view_report_10_1(this.clone_operating_balance, function () {
            LockScreenOff();
        }.bind(this));
    };
    // Очистить таблицы
    view_td_report.prototype.clear_report_10_1 = function () {
        if (this.switch_outer_cars) { this.switch_outer_cars.val(true); }
        if (this.switch_amkr_outer_cars) { this.switch_amkr_outer_cars.val(true); }
        if (this.switch_amkr_cisterns) { this.switch_amkr_cisterns.val(true); }
        if (this.switch_paid) { this.switch_paid.val(false); }
        if (this.switch_not_letters) { this.switch_not_letters.val(false); }
        if (this.switch_OTC_ban) { this.switch_OTC_ban.val(false); }
        if (this.textarea_wagon_nums) { this.textarea_wagon_nums.val(''); }
        if (this.textarea_main_epd_docs) { this.textarea_main_epd_docs.val(''); }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_arr_condition) { this.select_arr_condition.val(-1); }
        if (this.select_curr_condition) { this.select_curr_condition.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_type_wagons) { this.select_type_wagons.val(-1); }
        if (this.select_arr_cargo) { this.select_arr_cargo.val(-1); }
        if (this.select_certification_data) { this.select_certification_data.val(-1); }
        if (this.select_arr_ext_station_to) { this.select_arr_ext_station_to.val(-1); }
        if (this.select_inp_division) { this.select_inp_division.val(-1); }
        if (this.select_out_sap_cargo) { this.select_out_sap_cargo.val(-1); }
        if (this.select_sap_warehouse_name) { this.select_sap_warehouse_name.val(-1); }
        if (this.select_sap_destination_station) { this.select_sap_destination_station.val(-1); }
        if (this.select_out_cargo) { this.select_out_cargo.val(-1); }
        if (this.select_out_ext_station_to) { this.select_out_ext_station_to.val(-1); }
        if (this.select_out_division) { this.select_out_division.val(-1); }
        if (this.select_curr_station_amkr) { this.select_curr_station_amkr.val(-1); }
        if (this.select_curr_way) { this.select_curr_way.val(-1); }
        if (this.table_operation_balance) {
            this.operating_balance = [];
            this.clone_operating_balance = [];
            this.process_data_view_report_10_1(this.clone_operating_balance, function () {
                LockScreenOff();
            }.bind(this));
        }
    };
    //--------------------------------------------------------------------------------------------------
    // Инициализировать отчет "Остаток (ИТОГ)"
    view_td_report.prototype.init_report_11_1 = function () {
        // очистим основное окно отчета
        this.$main_report.empty();
        this.report = 11;        // номер отчета
        this.report_panel = 0;  // номер под-отчета
        this.list_operator_ob = []; // список для отчета "Оператор"
        this.clone_list_operator_ob = []; // список для отчета "Оператор"
        //this.chart_data_total_ = [];

        $('#sidebar').toggleClass('active');                                                    // Скрыть список отчетов
        this.$title_report.text(langView('vtdr_title_report_11_1', App.Langs).format(''));      // выведем название отчета
        this.init_select_report();                                                              // Инициализация формы выбора периода отчетов
        //------
        var fieldset_setup = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$setup_select = fieldset_setup.$fieldset;
        var fieldset_view = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: null,
            class_legend: 'border-primary',
        });
        this.$table_view = fieldset_view.$fieldset;
        var row_common = new this.fe_ui.bs_row();
        var col_setup = new this.fe_ui.bs_col({
            size: 'xl',
            col: 2,
        });
        col_setup.$col.append(this.$setup_select);
        var col_view = new this.fe_ui.bs_col({
            size: 'xl',
            col: 10,
        });
        col_view.$col.append(this.$table_view);
        //--------------------------------------------------------------------
        // Формируем форму выбора
        var form_residue_setup_select = new this.fe_ui.form({
            class: null,
            id: null,
            novalidate: null
        });
        this.$form_residue_setup_select = form_residue_setup_select.$form;
        //-кнопка
        var row_setup_bt = new this.fe_ui.bs_row();
        var col_setup_bt = new this.fe_ui.bs_col({
            size: 'xl',
            col: 12,
        });
        var bt_setup_clear = new this.fe_ui.bs_button({
            color: 'warning',
            size: 'sm',
            class: 'mr-1',
            id: null,
            label: langView('vtdr_label_button_setup_clear', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_clear_select_report_11_1();
            }.bind(this),
        });
        var bt_setup_select = new this.fe_ui.bs_button({
            color: 'primary',
            size: 'sm',
            class: null,
            id: null,
            label: langView('vtdr_label_button_setup_select', App.Langs),
            title: null,
            icon_left: null,
            icon_right: null,
            click: function (event) {
                event.preventDefault();
                this.action_select_report_11_1();
            }.bind(this),
        });
        row_setup_bt.$row.append(col_setup_bt.$col.append(bt_setup_clear.$button).append(bt_setup_select.$button));
        // Внешние стороние вагоны
        var row_setup_sw1 = new this.fe_ui.bs_row();
        var sw_outer_cars = new this.fe_ui.bs_switch({
            id: 'outer_cars',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_outer_cars', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
        });
        row_setup_sw1.$row.append(sw_outer_cars.$element);
        this.switch_outer_cars = sw_outer_cars.element;
        // Внешние вагоны АМКР
        var row_setup_sw2 = new this.fe_ui.bs_row();
        var sw_amkr_outer_cars = new this.fe_ui.bs_switch({
            id: 'amkr_outer_cars',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_amkr_outer_cars', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
        });
        row_setup_sw2.$row.append(sw_amkr_outer_cars.$element);
        this.switch_amkr_outer_cars = sw_amkr_outer_cars.element;
        // Цистерны арендованные
        var row_setup_sw3 = new this.fe_ui.bs_row();
        var sw_amkr_cisterns = new this.fe_ui.bs_switch({
            id: 'amkr_cisterns',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left',
            label: langView('vtdr_label_amkr_cisterns', App.Langs),
            label_class: 'mb-1',
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: true,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
        });
        row_setup_sw3.$row.append(sw_amkr_cisterns.$element);
        this.switch_amkr_cisterns = sw_amkr_cisterns.element;
        // Операторы АМКР
        var row_setup_3 = new this.fe_ui.bs_row();
        var select_operation_amkr = new this.fe_ui.bs_select_multiple({
            id: 'operation_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_operation_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_operation_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_3.$row.append(select_operation_amkr.$element);
        this.select_operation_amkr = select_operation_amkr.element;
        // Разметка по прибытию
        var row_setup_4_0 = new this.fe_ui.bs_row();
        var select_arr_condition = new this.fe_ui.bs_select_multiple({
            id: 'arr_condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_4_0.$row.append(select_arr_condition.$element);
        this.select_arr_condition = select_arr_condition.element;
        // Разметка текущая
        var row_setup_4 = new this.fe_ui.bs_row();
        var select_curr_condition = new this.fe_ui.bs_select_multiple({
            id: 'curr_condition',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_curr_condition', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_curr_condition', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_4.$row.append(select_curr_condition.$element);
        this.select_curr_condition = select_curr_condition.element;
        // Род вагона
        var row_setup_5 = new this.fe_ui.bs_row();
        var select_genus = new this.fe_ui.bs_select_multiple({
            id: 'genus',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_genus', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_genus', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_5.$row.append(select_genus.$element);
        this.select_genus = select_genus.element;
        // Груз ПРИБ
        var row_setup_7 = new this.fe_ui.bs_row();
        var select_arr_cargo = new this.fe_ui.bs_select_multiple({
            id: 'arr_cargo',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_cargo', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_cargo', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_7.$row.append(select_arr_cargo.$element);
        this.select_arr_cargo = select_arr_cargo.element;
        // Станция отправления
        var row_setup_9 = new this.fe_ui.bs_row();
        var select_arr_ext_station_to = new this.fe_ui.bs_select_multiple({
            id: 'arr_ext_station_to',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_arr_ext_station_to', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_arr_ext_station_to', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_9.$row.append(select_arr_ext_station_to.$element);
        this.select_arr_ext_station_to = select_arr_ext_station_to.element;
        // Станция нахождения вагона
        var row_setup_17 = new this.fe_ui.bs_row();
        var select_curr_station_amkr = new this.fe_ui.bs_select_multiple({
            id: 'curr_station_amkr',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_curr_station_amkr', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_curr_station_amkr', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_17.$row.append(select_curr_station_amkr.$element);
        this.select_curr_station_amkr = select_curr_station_amkr.element;
        // Путь нахождения вагона
        var row_setup_18 = new this.fe_ui.bs_row();
        var select_curr_way = new this.fe_ui.bs_select_multiple({
            id: 'curr_way',
            form_group_size: 'xl',
            form_group_col: 12,
            form_group_class: 'text-left mb-0',
            label: langView('vtdr_label_curr_way', App.Langs),
            label_class: 'mb-1',
            input_size: 'sm',
            input_class: null,
            input_title: langView('vtdr_title_curr_way', App.Langs),
            input_placeholder: null,
            input_required: null,
            input_multiple: true,
            input_group: true,
            element_data: [],
            element_default: null,
            element_change: function (e) {
                this.action_select_report_11_1();
            }.bind(this),
            element_check: function (value) {

            }.bind(this),
        });
        row_setup_18.$row.append(select_curr_way.$element);
        this.select_curr_way = select_curr_way.element;
        //..........
        // Операция с вагоном
        // Состояние вагона
        //............
        this.$form_residue_setup_select
            .append(row_setup_bt.$row)
            .append(row_setup_sw1.$row)
            .append(row_setup_sw2.$row)
            .append(row_setup_sw3.$row)
            .append(row_setup_3.$row)
            .append(row_setup_4_0.$row)
            .append(row_setup_4.$row)
            .append(row_setup_5.$row)
            .append(row_setup_7.$row)
            .append(row_setup_9.$row)
            .append(row_setup_17.$row)
            .append(row_setup_18.$row);
        this.$setup_select.append(this.$form_residue_setup_select);
        //----------------------------------------------------------------
        // Создадим панель выбора отчета
        this.nav_tabs_residue_total = new this.fe_ui.bs_nav_tabs({
            id_nav: 'tab-residue-total',
            class_nav: null,
            id_content: 'tab-residue-total-conntent',
            class_content: null,
            list_link: [
                {
                    id: 'residue-total-operators',
                    aria_controls: 'residue-total-operators-tab',
                    label: langView('vtdr_label_tab_residue_total_operators', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'residue-total-common',
                    aria_controls: 'residue-total-common-tab',
                    label: langView('vtdr_label_tab_residue_total_common', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'residue-total-markup',
                    aria_controls: 'residue-total-markup-tab',
                    label: langView('vtdr_label_tab_residue_total_markup', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'residue-total-genus',
                    aria_controls: 'residue-total-genus-tab',
                    label: langView('vtdr_label_tab_residue_total_genus', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'residue-total-station-out',
                    aria_controls: 'residue-total-station-out-tab',
                    label: langView('vtdr_label_tab_residue_total_station_out', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'residue-total-cargo-arr',
                    aria_controls: 'residue-total-cargo-arr-tab',
                    label: langView('vtdr_label_tab_residue_total_cargo_arr', App.Langs),
                    disable: false,
                    click: null,
                },
                {
                    id: 'residue-total-operation',
                    aria_controls: 'residue-total-operation-tab',
                    label: langView('vtdr_label_tab_residue_total_operation', App.Langs),
                    disable: false,
                    click: null,
                },
            ],
        });
        // Переключатели панелей таблиц отчета
        //----------------------------------------
        // Закладка "Оператор"
        this.init_panel_report(this.nav_tabs_residue_total, 'residue-total-operators-tab', 'residue-total-operators');
        //this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-operators-tab', 'residue-total-operators', 6, 6);
        // Закладка "ИТОГ"
        this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-common-tab', 'residue-total-common', 6, 6);
        // Закладка "Разметка"
        this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-markup-tab', 'residue-total-markup', 6, 6);
        // Закладка "Род вагона"
        this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-genus-tab', 'residue-total-genus', 6, 6);
        // Закладка "Станция отправления"
        this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-station-out-tab', 'residue-total-station', 6, 6);
        // Закладка "Груз ПРИБ"
        this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-cargo-arr-tab', 'residue-total-cargo-arr', 6, 6);
        // Закладка "Операции"
        this.init_panel_horizontal_report(this.nav_tabs_residue_total, 'residue-total-operation-tab', 'residue-total-operation', 6, 6);
        //this.init_panel_vertical_report(this.nav_tabs_residue_total, 'out-total-cargo-tab', 'outgoing-cargo-operator');
        //this.init_panel_horizontal_char2_report(this.nav_tabs_residue_total, 'out-total-division-amkr-tab', 'outgoing-total-division-cargo', 6, 6);
        //-------------------------------------------
        // Дабавим закладку на форму
        this.$table_view.append(this.nav_tabs_residue_total.$ul).append(this.nav_tabs_residue_total.$content);
        //-----------------------------------------------------------------
        row_common.$row.append(col_setup.$col).append(col_view.$col)
        this.$main_report.append(row_common.$row);
        //--------------------------------------------------------------------

        // ------------------------------------------------
        // Запускаем ... процесса инициализации (паралельно)
        var process = 1;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                this.report_panel = 0;
                //this.view_setup_detali_report_6_1(this.report_panel);
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    this.active_tabs_report_11(event.target.id, event.relatedTarget.id);
                    switch (event.target.id) {
                        case 'residue-total-operators': {
                            this.report_panel = 0;
                            //this.view_chart_total_outgoing_cargo_operator();
                            break;
                        };
                        case 'residue-total-common': {
                            this.report_panel = 1;
                            //this.view_chart_total_operator_amkr();
                            break;
                        };
                        case 'residue-total-markup': {
                            this.report_panel = 2;
                            //this.view_chart_total_division_metals();
                            //this.view_chart_total_division_cargo();
                            break;
                        };
                        case 'residue-total-genus': {
                            this.report_panel = 3;
                            //this.view_chart_total_ext_station();
                            break;
                        };
                        case 'residue-total-station-out': {
                            this.report_panel = 4;
                            //this.view_chart_total_cargo_metall()
                            break;
                        };
                        case 'residue-total-cargo-arr': {
                            this.report_panel = 5;
                            //this.view_chart_total_operators();
                            break;
                        };
                        case 'residue-total-operation': {
                            this.report_panel = 6;
                            //this.view_chart_total_operators();
                            break;
                        };
                    };
                }.bind(this));
                LockScreenOff();
            }
        }.bind(this);
        //-----------------------------------------------
        // Таблица-Груз по Оператору АМКР
        this.table_residue_total_operators = new TTDR('div#residue-total-operators');         // Создадим экземпляр
        this.table_residue_total_operators.init({
            alert: null,
            detali_table: false,
            type_report: 'residue_total_operators',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                process--;
                out_init(process);
            },
            fn_action_view_detali: function (rows) {

            },
        });
        //// Инициализация модуля графиков тип: pie_exploding_pie_chart
        //this.chart_total_outgoing_cargo_operator = new CAM('div#outgoing-cargo-operator-chart');         // Создадим экземпляр
        //this.chart_total_outgoing_cargo_operator.init({
        //    alert: null,
        //    type_chart: 'stacked_column_chart_percent',     //pie_exploding_pie_chart   stacked_column_chart_percent
        //    list_name: this.ids_dir.list_cargo_out_group,
        //    fn_init: function () {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    },
        //});
    };
    // Показать отчет  "Остаток (ИТОГ)"
    view_td_report.prototype.view_report_11_1 = function (start, stop) {
        // Запускаем 1 процесса инициализации (паралельно)
        var process_load = 2;
        // Выход из загрузки
        var out_load = function (process_load) {
            if (process_load === 0) {
                LockScreenOff();
            }
        }.bind(this);
        LockScreen(langView('vtdr_load_operating_balance', App.Langs));
        // Загрузим данные
        this.load_select_report_11_1_1(start, stop, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
        this.load_select_report_11_1_2(start, stop, function () {
            process_load--;
            out_load(process_load);
        }.bind(this))
    };
    // Загрузить данные отчета "Оператор"
    view_td_report.prototype.load_select_report_11_1_1 = function (start, stop, callback) {
        this.ids_wsd.getReportViewOperators_OB_OfPeriod(start, stop, function (result_operator_ob) {
            this.list_operator_ob = result_operator_ob;
            this.clone_list_operator_ob = JSON.parse(JSON.stringify(this.list_operator_ob));
            // Обработать и показать данные
            this.process_data_view_report_11_1_1(this.list_operator_ob, function () {
                // Выход
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));

        }.bind(this));
    };
    // Загрузить данные отчета "ИТОГ"
    view_td_report.prototype.load_select_report_11_1_2 = function (start, stop, callback) {

        var date = moment(start).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
        var date_stop = moment(stop).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
        var process_load_1 = 0;
        while (date <= date_stop) {
            process_load_1++;


            date = moment(date).add('days', 1)._d;
        }



        // Выход
        if (typeof callback === 'function') {
            callback();
        }



    };
    // Обработать и показать данные отчета "Оператор"
    view_td_report.prototype.process_data_view_report_11_1_1 = function (list_operator_ob, callback) {
        // Продолжим
        this.report_operator_ob = [];
        this.list_operation_amkr = [];
        var value_operation_amkr = this.select_operation_amkr.val();
        $.each(list_operator_ob, function (key, value) {
            var select = true;
            if (select && this.switch_amkr_outer_cars.val() === false) {
                if (value.group === 'amkr') {
                    select = false;
                }
            }
            if (select && this.switch_amkr_cisterns.val() === false) {
                if (value.group === 'cisterns') {
                    select = false;
                }
            }
            if (select && this.switch_outer_cars.val() === false) {
                if (value.group !== 'amkr' && value.group !== 'cisterns') {
                    select = false;
                }
            }
            if (select && (!value_operation_amkr || value_operation_amkr.length > 0)) {
                var res = value_operation_amkr.indexOf(value.current_wagons_rent_operator_abbr_ru);
                if (res === -1) select = false;
            }
            if (select) {
                //this.report_operator_ob.push(value);
                var oa = this.list_operation_amkr.find(function (o) { return o.value === value.current_wagons_rent_operator_abbr_ru }.bind(this));
                if (!oa) {
                    this.report_operator_ob.push({
                        operator: value['current_wagons_rent_operator_abbr_' + App.Lang],
                        start: value.type === 'start' ? 1 : 0,
                        arrival: value.type === 'arrival' ? 1 : 0,
                        outgoing: value.type === 'outgoing' ? 1 : 0,
                        stop: value.type === 'stop' ? 1 : 0
                    });
                    this.list_operation_amkr.push({ value: value.current_wagons_rent_operator_abbr_ru, text: value['current_wagons_rent_operator_abbr_' + App.Lang] });
                } else {
                    var operator = this.report_operator_ob.find(function (o) { return o.operator === value['current_wagons_rent_operator_abbr_' + App.Lang] }.bind(this));
                    if (operator) {
                        operator.start += (value.type === 'start' ? 1 : 0);
                        operator.arrival += (value.type === 'arrival' ? 1 : 0);
                        operator.outgoing += (value.type === 'outgoing' ? 1 : 0);
                        operator.stop += (value.type === 'stop' ? 1 : 0);
                    }
                }
            }

        }.bind(this));
        // вывод данных
        this.table_residue_total_operators.view(this.report_operator_ob);
        // обновление списков отчета
        if (!value_operation_amkr || value_operation_amkr.length === 0) {
            this.select_operation_amkr.update(this.sort_text(this.list_operation_amkr, "text"), -1);
        }
        // Выход
        if (typeof callback === 'function') {
            callback();
        }
    };
    // Действие кнопки обновим
    view_td_report.prototype.action_select_report_11_1 = function () {
        this.out_clear();
        // Показать в зависимости от закладки

        if (this.report_panel === 0) {
            LockScreen(langView('vtdr_load_operating_balance', App.Langs));
            this.process_data_view_report_11_1_1(this.list_operator_ob, function () {
                LockScreenOff();
            }.bind(this));
        }

    };

    view_td_report.prototype.active_tabs_report_11 = function (new_id, old_id) {
        // Запомнить предыдущее состояние
        switch (old_id) {
            case 'residue-total-operators': {
                this.buffer_amkr_outer_cars_1 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_1 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_1 = this.switch_outer_cars.val();
                this.buffer_operation_amkr_1 = JSON.parse(JSON.stringify(this.list_operation_amkr));
                this.buffer_operation_amkr_value_1 = this.select_operation_amkr.val();
                break;
            };
            case 'residue-total-common': {
                this.buffer_amkr_outer_cars_2 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_2 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_2 = this.switch_outer_cars.val();
                break;
            };
            case 'residue-total-markup': {
                this.buffer_amkr_outer_cars_3 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_3 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_3 = this.switch_outer_cars.val();
                break;
            };
            case 'residue-total-genus': {
                this.buffer_amkr_outer_cars_4 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_4 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_4 = this.switch_outer_cars.val();
                break;
            };
            case 'residue-total-station-out': {
                this.buffer_amkr_outer_cars_5 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_5 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_5 = this.switch_outer_cars.val();
                break;
            };
            case 'residue-total-cargo-arr': {
                this.buffer_amkr_outer_cars_6 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_6 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_6 = this.switch_outer_cars.val();
                break;
            };
            case 'residue-total-operation': {
                this.buffer_amkr_outer_cars_7 = this.switch_amkr_outer_cars.val();
                this.buffer_amkr_cisterns_7 = this.switch_amkr_cisterns.val();
                this.buffer_outer_cars_7 = this.switch_outer_cars.val();
                break;
            };
        }
        // Определим текущее состояние
        switch (new_id) {
            case 'residue-total-operators': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_1);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_1);
                this.switch_outer_cars.val(this.buffer_outer_cars_1);
                this.select_operation_amkr.enable();
                this.select_operation_amkr.update(this.sort_text(this.buffer_operation_amkr_1, "text"), this.buffer_operation_amkr_value_1);
                this.select_arr_condition.disable(true);
                this.select_curr_condition.disable(true);
                this.select_genus.disable(true);
                this.select_arr_cargo.disable(true);
                this.select_arr_ext_station_to.disable(true);
                this.select_curr_station_amkr.disable(true);
                this.select_curr_way.disable(true);
                break;
            };
            case 'residue-total-common': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_2);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_2);
                this.switch_outer_cars.val(this.buffer_outer_cars_2);
                this.select_operation_amkr.disable(true);
                this.select_arr_condition.disable(true);
                this.select_curr_condition.disable(true);
                this.select_genus.disable(true);
                this.select_arr_cargo.disable(true);
                this.select_arr_ext_station_to.disable(true);
                this.select_curr_station_amkr.disable(true);
                this.select_curr_way.disable(true);
                break;
            };
            case 'residue-total-markup': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_3);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_3);
                this.switch_outer_cars.val(this.buffer_outer_cars_3);
                break;
            };
            case 'residue-total-genus': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_4);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_4);
                this.switch_outer_cars.val(this.buffer_outer_cars_4);
                break;
            };
            case 'residue-total-station-out': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_5);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_5);
                this.switch_outer_cars.val(this.buffer_outer_cars_5);
                break;
            };
            case 'residue-total-cargo-arr': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_6);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_6);
                this.switch_outer_cars.val(this.buffer_outer_cars_6);
                break;
            };
            case 'residue-total-operation': {
                this.switch_amkr_outer_cars.val(this.buffer_amkr_outer_cars_7);
                this.switch_amkr_cisterns.val(this.buffer_amkr_cisterns_7);
                this.switch_outer_cars.val(this.buffer_outer_cars_7);
                break;
            };
        }
    }
    // Очистить таблицы
    view_td_report.prototype.clear_report_11_1 = function () {
        this.buffer_outer_cars_1 = true;
        this.buffer_outer_cars_2 = true;
        this.buffer_outer_cars_3 = true;
        this.buffer_outer_cars_4 = true;
        this.buffer_outer_cars_5 = true;
        this.buffer_outer_cars_6 = true;
        this.buffer_outer_cars_7 = true;
        //
        this.buffer_amkr_outer_cars_1 = true;
        this.buffer_amkr_outer_cars_2 = true;
        this.buffer_amkr_outer_cars_3 = true;
        this.buffer_amkr_outer_cars_4 = true;
        this.buffer_amkr_outer_cars_5 = true;
        this.buffer_amkr_outer_cars_6 = true;
        this.buffer_amkr_outer_cars_7 = true;
        //
        this.buffer_amkr_cisterns_1 = true;
        this.buffer_amkr_cisterns_2 = true;
        this.buffer_amkr_cisterns_3 = true;
        this.buffer_amkr_cisterns_4 = true;
        this.buffer_amkr_cisterns_5 = true;
        this.buffer_amkr_cisterns_6 = true;
        this.buffer_amkr_cisterns_7 = true;

        if (this.switch_outer_cars) {
            this.switch_outer_cars.val(true);
        }
        if (this.switch_amkr_outer_cars) {
            this.switch_amkr_outer_cars.val(true);
        }
        if (this.switch_amkr_cisterns) {
            this.switch_amkr_cisterns.val(true);
        }
        if (this.select_operation_amkr) { this.select_operation_amkr.val(-1); }
        if (this.select_arr_condition) { this.select_arr_condition.val(-1); }
        if (this.select_curr_condition) { this.select_curr_condition.val(-1); }
        if (this.select_genus) { this.select_genus.val(-1); }
        if (this.select_arr_cargo) { this.select_arr_cargo.val(-1); }
        if (this.select_arr_ext_station_to) { this.select_arr_ext_station_to.val(-1); }
        if (this.select_curr_station_amkr) { this.select_curr_station_amkr.val(-1); }
        if (this.select_curr_way) { this.select_curr_way.val(-1); }
        //if (this.table_operation_balance) {
        //    this.operating_balance = [];
        //    this.clone_operating_balance = [];
        //    this.process_data_view_report_10_1(this.clone_operating_balance, function () {
        //        LockScreenOff();
        //    }.bind(this));
        //}
    };
    //-----------------------------------------------------------------------------------------
    //
    view_td_report.prototype.sort_text = function (list, name) {
        return list.sort(function (a, b) {
            var nameA = a[name] !== null ? a[name].toLowerCase() : '',
                nameB = b[name] !== null ? b[name].toLowerCase() : ''
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        });
    }
    // группировка и сортировка таблицы
    view_td_report.prototype.sort_table = function (list, field_group, field_sort, desc) {
        var result = [];
        if (list && list.length > 0 && field_group && field_sort) {
            $.each(list.sort(function (a, b) { return a[field_group] - b[field_group] }.bind(this)), function (key, el) {
                var op = result.find(function (o) {
                    return o[field_group] === el[field_group]
                }.bind(this));
                if (!op) {
                    // Не данных 
                    var list_gr = list.filter(function (i) { return i[field_group] === el[field_group] }.bind(this));
                    if (list_gr && list_gr.length > 0) {

                        if (desc) {
                            result = result.concat(list_gr.sort(function (a, b) { return b[field_sort] - a[field_sort] }.bind(this)));
                        } else {
                            result = result.concat(list_gr.sort(function (a, b) { return a[field_sort] - b[field_sort] }.bind(this)));
                        }
                    }
                }
            }.bind(this));
        }
        return result;
    };
    //
    view_td_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    };
    // Показать ошибки
    view_td_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    view_td_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    view_td_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //------------------------------------------------------------------
    // Очистить объект
    view_td_report.prototype.destroy = function () {
        // Таблицы
        if (this.table_adop_sostav_all) {
            this.table_adop_sostav_all.destroy();
            this.table_adop_sostav_all = null;
        }
        if (this.table_adop_sostav_detali) {
            this.table_adop_sostav_detali.destroy();
            this.table_adop_sostav_detali = null;
        }
        if (this.table_adop_searsh_docs) {
            this.table_adop_searsh_docs.destroy();
            this.table_adop_searsh_docs = null;
        }
        if (this.table_outg_sostav_all) {
            this.table_outg_sostav_all.destroy();
            this.table_outg_sostav_all = null;
        }
        if (this.table_outg_sostav_detali) {
            this.table_outg_sostav_detali.destroy();
            this.table_outg_sostav_detali = null;
        }
        if (this.table_outg_searsh_docs) {
            this.table_outg_searsh_docs.destroy();
            this.table_outg_searsh_docs = null;
        }
        if (this.table_adop_wagon_not_operation) {
            this.table_adop_wagon_not_operation.destroy();
            this.table_adop_wagon_not_operation = null;
        }
        if (this.table_incoming_outgoing_car) {
            this.table_incoming_outgoing_car.destroy();
            this.table_incoming_outgoing_car = null;
        }
        if (this.table_wagons_rent) {
            this.table_wagons_rent.destroy();
            this.table_wagons_rent = null;
        }

        if (this.this.table_usage_fee_period) {
            this.this.table_usage_fee_period.destroy();
            this.this.table_usage_fee_period = null;
        }

        // Графики
        if (this.chart_total_cargo_operation_amkr) {
            this.chart_total_cargo_operation_amkr.destroy();
            this.chart_total_cargo_operation_amkr = null;
        }
        if (this.chart_total_operation_to_arr) {
            this.chart_total_operation_to_arr.destroy();
            this.chart_total_operation_to_arr = null;
        }
        if (this.chart_total_cargo_to_arr) {
            this.chart_total_cargo_to_arr.destroy();
            this.chart_total_cargo_to_arr = null;
        }
        if (this.table_total_group_cargo_to_arr) {
            this.table_total_group_cargo_to_arr.destroy();
            this.table_total_group_cargo_to_arr = null;
        }
        if (this.chart_total_group_cargo_to_arr) {
            this.chart_total_group_cargo_to_arr.destroy();
            this.chart_total_group_cargo_to_arr = null;
        }
        if (this.table_total_genus_to_arr) {
            this.table_total_genus_to_arr.destroy();
            this.table_total_genus_to_arr = null;
        }
        if (this.chart_total_station_to_arr) {
            this.chart_total_station_to_arr.destroy();
            this.chart_total_station_to_arr = null;
        }
        if (this.table_total_division_to_arr) {
            this.table_total_division_to_arr.destroy();
            this.table_total_division_to_arr = null;
        }
        if (this.chart_total_division_to_arr) {
            this.chart_total_division_to_arr.destroy();
            this.chart_total_division_to_arr = null;
        }
        if (this.table_total_adoption_to_gs) {
            this.table_total_adoption_to_gs.destroy();
            this.table_total_adoption_to_gs = null;
        }
        // Модуля
        if (this.form_select_num) {
            this.form_select_num.destroy();
            this.form_select_num = null;
        }
    };

    App.view_td_report = view_td_report;

    window.App = App;
})(window);