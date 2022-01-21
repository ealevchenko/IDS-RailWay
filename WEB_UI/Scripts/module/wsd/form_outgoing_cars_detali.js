/// <reference path="../../api/ids_direct.js" />
/// <reference path="../shared/common.js" />

(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

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

            //'fogcd_title_': '',
            //'fogcd_label_': '',
            'fogcd_title_button_save': 'Сохранить',
            'fogcd_title_button_edit': 'Править',
            'fogcd_title_button_return_open': 'Выполнить возврат',
            'fogcd_title_button_return_close': 'Закрыть возврат',

            'fogcd_title_fieldset_detention_return': 'ЗАДЕРЖАНИЕ/ВОЗВРАТ',
            'fogcd_title_fieldset_detention': 'ЗАДЕРЖАНИЕ',
            'fogcd_title_fieldset_return': 'ВОЗВРАТ',
            'fogcd_title_fieldset_loading_data': 'ДАННЫЕ О ПОГРУЗКЕ',
            'fogcd_title_fieldset_loading_data6': 'ЭПД(ПОСЛЕ ПРИНЯТИЯ УЗ)',
            'fogcd_title_fieldset_loading_data7': 'SAP (ИСХОДЯЩАЯ ПОСТАВКА)',
            'fogcd_title_fieldset_data_arrival': 'ДАННЫЕ О ПРИБЫТИИ',

            'fogcd_mess_valid_reason_discrepancy': 'Указанной причины расхождения нет в справочнике ИДС.',
            'fogcd_mess_valid_cause_detention': 'Указанной причины задержания нет в справочнике ИДС.',
            'fogcd_mess_valid_cause_return': 'Указанной причины возврата нет в справочнике ИДС.',

            'fogcd_mess_init_panel': 'Инициализация модуля...',


            //'fhoogs_title_form_add': 'Сдать состав',
            //'fhoogs_title_form_edit': 'Править сданный состав',
            ///*            'fhoogs_title_form_del': 'Удалить',*/

            //'fhoogs_mess_operation_run': 'Выполняю операцию...',
            //'fhoogs_error_date_end_inspection_acceptance_delivery': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            //'fhoogs_error_date_end_inspection_loader': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            //'fhoogs_error_date_end_inspection_vagonnik': 'Время окончания осмотра должно быть больше времени предъявления АМКР {0}',
            //'fhoogs_error_date_readiness_uz': 'Время готовности к сдаче на УЗ должно быть больше времени осмотров',
            //'fhoogs_error_date_outgoing': 'Время сдачи на УЗ должно быть больше времени готовности сдачи на УЗ',
            //'fhoogs_error_date_outgoing_act': 'Время сдаче на УЗ по акту должно быть больше времени сдачи на УЗ',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;

    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    // Создадим форму правки операторов
    var FDL = App.form_dialog;

    // создадим основу формы
    function div_panel(base) {
        var div = new base.fc_ui.el_div(null, null);
        var row = new base.fc_ui.el_row();
        var col_bt = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var bt_present = new base.fc_ui.el_button('sm', 'btn-primary float-left', 'present_car', ' Предъявить вагон', 'fa fa-arrow-circle-left');
        var bt_return = new base.fc_ui.el_button('sm', 'btn-danger float-right', 'return_car', 'Вернуть вагон ', 'fa fa-arrow-circle-right');
        row.$row.append(col_bt.$col.append(bt_present.$button).append(bt_return.$button));
        // Общие данные
        var fs_common = new base.fc_ui.el_fieldset('border-primary', null, null);
        //--
        var div_fr_common1 = new base.fc_ui.el_div_form_row();
        var bt_car_return = new base.fc_ui.el_button('sm', 'btn-warning', 'car_return', null, 'fa fa-retweet');
        var el_num = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 text-left',
            id: 'num_car',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_num', App.Langs),
            inp_type: 'number',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_num', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: bt_car_return.$button
        });
        var el_position_outgoing = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'position_outgoing',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_position_outgoing', App.Langs),
            inp_type: 'number',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_position_outgoing', App.Langs),
            placeholder: null,
            required: null,
            min: '1',
            max: '120',
            step: '1',
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_num_cont_1 = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'num_cont_1',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_num_cont_1', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_num_cont_1', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_num_cont_2 = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'num_cont_2',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_num_cont_2', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_num_cont_2', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_common1.$div.append(el_num.$element).append(el_position_outgoing.$element).append(el_num_cont_1.$element).append(el_num_cont_2.$element);
        //--
        var div_fr_common2 = new base.fc_ui.el_div_form_row();
        var el_date_outgoing_act = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'date_outgoing_act',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_date_outgoing_act', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_date_outgoing_act', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_reason_discrepancy_amkr = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-5 mb-1 text-left',
            id: 'reason_discrepancy_amkr',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_reason_discrepancy_amkr', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_reason_discrepancy_amkr', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_reason_discrepancy_uz = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-4 mb-1 text-left',
            id: 'reason_discrepancy_uz',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_reason_discrepancy_uz', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_reason_discrepancy_uz', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_common2.$div.append(el_date_outgoing_act.$element).append(el_reason_discrepancy_amkr.$element).append(el_reason_discrepancy_uz.$element);
        //--
        var div_fr_common3 = new base.fc_ui.el_div_form_row();
        var el_adm_kod = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'adm_kod',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_adm_kod', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_adm_kod', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_rod_vag_abbr = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'rod_vag_abbr',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_rod_vag_abbr', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_rod_vag_abbr', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_gruzp_uz = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'gruzp_uz',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_gruzp_uz', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_gruzp_uz', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_tara_uz = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'tara_uz',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_tara_uz', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_tara_uz', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_common3.$div.append(el_adm_kod.$element).append(el_rod_vag_abbr.$element).append(el_gruzp_uz.$element).append(el_tara_uz.$element);
        //--
        var div_fr_common4 = new base.fc_ui.el_div_form_row();
        var el_condition_arrival = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'condition_arrival',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_condition_arrival', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_condition_arrival', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_condition_provide = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'condition_provide',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_condition_provide', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_condition_provide', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_common4.$div.append(el_condition_arrival.$element).append(el_condition_provide.$element);
        //--
        fs_common.$fieldset.append(div_fr_common1.$div).append(div_fr_common2.$div).append(div_fr_common3.$div).append(div_fr_common4.$div);
        //-- Задержание и возврат
        var fs_common_detention_return = new base.fc_ui.el_fieldset('border-primary', null, langView('fogcd_title_fieldset_detention_return', App.Langs));
        //-- Разметка по отправлению
        var div_fr_common_detention_return1 = new base.fc_ui.el_div_form_row();
        var el_condition_present = new base.fc_ui.el_form_textarea({
            fg_cl: 'col-xl-12 mb-1 text-left',
            id: 'condition_present',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_condition_present', App.Langs),
            txar_cl: 'form-control',
            txar_title: langView('fogcd_title_condition_present', App.Langs),
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_common_detention_return1.$div.append(el_condition_present.$element);
        //-- Задержание
        var div_fr_common_detention_return2 = new base.fc_ui.el_div_form_row();
        var col_common_detention_return = new base.fc_ui.el_col('xl', 12, null);
        var fs_detention = new base.fc_ui.el_fieldset('border-warning', null, langView('fogcd_title_fieldset_detention', App.Langs));
        var div_fr_detention1 = new base.fc_ui.el_div_form_row();
        var col_detention1 = new base.fc_ui.el_col('xl', 11, null);
        var col_detention2 = new base.fc_ui.el_col('xl', 1, 'pull-right mb-1 text-left');
        var alert_detention = new base.fc_ui.el_alert(null);
        var bt_detention_save = new base.fc_ui.el_button('sm', 'btn-danger', 'detention_save', '', 'fa fa-save');
        var bt_detention_edit = new base.fc_ui.el_button('sm', 'btn-warning', 'detention_edit', '', 'fa fa-edit');
        div_fr_detention1.$div.append(col_detention1.$col.append(alert_detention)).append(col_detention2.$col.append(bt_detention_save.$button).append(bt_detention_edit.$button));
        //--
        var div_fr_detention2 = new base.fc_ui.el_div_form_row();
        var el_cause_detention = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'cause_detention',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_cause_detention', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_cause_detention', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_detention_start = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'detention_start',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_detention_start', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_detention_start', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_detention_stop = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'detention_stop',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_detention_stop', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_detention_stop', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });

        div_fr_detention2.$div.append(el_cause_detention.$element).append(el_detention_start.$element).append(el_detention_stop.$element);
        // Возврат
        var div_fr_common_detention_return3 = new base.fc_ui.el_div_form_row();
        var col_common_return = new base.fc_ui.el_col('xl', 12, null);
        var fs_return = new base.fc_ui.el_fieldset('border-warning', null, langView('fogcd_title_fieldset_return', App.Langs));
        var div_fr_return1 = new base.fc_ui.el_div_form_row();
        var col_return1 = new base.fc_ui.el_col('xl', 11, null);
        var col_return2 = new base.fc_ui.el_col('xl', 1, 'pull-right mb-1 text-left');
        var alert_return = new base.fc_ui.el_alert(null);
        var bt_return_open = new base.fc_ui.el_button('sm', 'btn-danger', 'bt_return_open', '', 'fa fa-save');
        var bt_return_close = new base.fc_ui.el_button('sm', 'btn-warning', 'return_close', '', 'fa fa-edit');
        div_fr_return1.$div.append(col_return1.$col.append(alert_return)).append(col_return2.$col.append(bt_return_open.$button).append(bt_return_close.$button));
        // 
        var div_fr_return2 = new base.fc_ui.el_div_form_row();
        var el_cause_return = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'cause_return',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_cause_return', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_cause_return', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_return_start = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'return_start',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_return_start', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_return_start', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_return_stop = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'return_stop',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_return_stop', App.Langs),
            inp_type: 'datetime',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_return_stop', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });

        div_fr_return2.$div.append(el_cause_return.$element).append(el_return_start.$element).append(el_return_stop.$element);
        //
        var div_fr_return3 = new base.fc_ui.el_div_form_row();
        var el_return_num_act = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'return_num_act',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_return_num_act', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_return_num_act', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_return_date_act = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'return_date_act',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_return_date_act', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_return_date_act', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_return_note = new base.fc_ui.el_form_textarea({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'return_note',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_return_note', App.Langs),
            txar_cl: 'form-control inp-manual',
            txar_title: langView('fogcd_title_return_note', App.Langs),
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_return3.$div.append(el_return_num_act.$element).append(el_return_date_act.$element).append(el_return_note.$element);
        //
        var div_fr_return4 = new base.fc_ui.el_div_form_row();
        var col_fr_return4 = new base.fc_ui.el_col('xl', 12, 'mb-1');
        var table_return = new base.fc_ui.el_table('table-return-car', 'display compact cell-border row-border hover');
        div_fr_return4.$div.append(col_fr_return4.$col.append(table_return.$table));
        // Данные о погрузке
        var fs_loading_data = new base.fc_ui.el_fieldset('border-primary', null, langView('fogcd_title_fieldset_loading_data', App.Langs));
        var div_fr_loading_data1 = new base.fc_ui.el_div_form_row();
        var el_loaded_car = new base.fc_ui.el_form_checkbox({
            div_cl: 'col-xl-3 mb-2 text-left"',
            id: 'loaded_car',
            lb_cl: null,
            lb_text: langView('fogcd_label_loaded_car', App.Langs),
            inp_cl: 'inp-manual',
            inp_title: null,
            required: null,
        });
        div_fr_loading_data1.$div.append(el_loaded_car.$element);
        //
        var div_fr_loading_data2 = new base.fc_ui.el_div_form_row();
        var el_cargo_name = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-7 mb-1 text-left',
            id: 'cargo_name',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_cargo_name', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_cargo_name', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_loading_devision_code = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-2 mb-1 text-left',
            id: 'loading_devision_code',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_loading_devision_code', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_loading_devision_code', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_loading_devision = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'loading_devision',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_loading_devision', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_loading_devision', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data2.$div.append(el_cargo_name.$element).append(el_loading_devision_code.$element).append(el_loading_devision.$element);
        //
        var div_fr_loading_data3 = new base.fc_ui.el_div_form_row();
        var el_code_station_to = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-2 mb-1 text-left',
            id: 'code_station_to',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_code_station_to', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_code_station_to', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_name_station_to = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-4 mb-1 text-left',
            id: 'name_station_to',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_name_station_to', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-manual',
            inp_title: langView('fogcd_title_name_station_to', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_owner_name = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'owner_name',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_owner_name', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_owner_name', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data3.$div.append(el_code_station_to.$element).append(el_name_station_to.$element).append(el_owner_name.$element);
        //
        var div_fr_loading_data4 = new base.fc_ui.el_div_form_row();
        var el_operator_name = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'operator_name',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_operator_name', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_operator_name', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_limiting_loading_amkr = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-6 mb-1 text-left',
            id: 'limiting_loading_amkr',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_limiting_loading_amkr', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-auto',
            inp_title: langView('fogcd_title_limiting_loading_amkr', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data4.$div.append(el_operator_name.$element).append(el_limiting_loading_amkr.$element);
        //
        var div_fr_loading_data5 = new base.fc_ui.el_div_form_row();
        var el_limiting_loading_uz = new base.fc_ui.el_form_textarea({
            fg_cl: 'col-xl-12 mb-1 text-left',
            id: 'limiting_loading_uz',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_limiting_loading_uz', App.Langs),
            txar_cl: 'form-control inp-auto',
            txar_title: langView('fogcd_title_limiting_loading_uz', App.Langs),
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data5.$div.append(el_limiting_loading_uz.$element);
        //ЭПД(ПОСЛЕ ПРИНЯТИЯ УЗ)
        var div_fr_loading_data6 = new base.fc_ui.el_div_form_row();
        var col_fr_loading_data6 = new base.fc_ui.el_col('xl', 12, 'mb-1');
        var fs_loading_data6 = new base.fc_ui.el_fieldset('border-primary', null, langView('fogcd_title_fieldset_loading_data6', App.Langs));
        //
        var div_fr_loading_data61 = new base.fc_ui.el_div_form_row();
        var el_uz_doc_num = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-4 mb-1 text-left',
            id: 'uz_doc_num',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_uz_doc_num', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_uz_doc_num', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_vesg_uz_doc = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-2 mb-1 text-left',
            id: 'vesg_uz_doc',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_vesg_uz_doc', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_vesg_uz_doc', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_ves_tary_uz_doc = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-2 mb-1 text-left',
            id: 'ves_tary_uz_doc',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_ves_tary_uz_doc', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_ves_tary_uz_doc', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_brigadier_loading_uz_doc = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-4 mb-1 text-left',
            id: 'brigadier_loading_uz_doc',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_brigadier_loading_uz_doc', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_brigadier_loading_uz_doc', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data61.$div.append(el_uz_doc_num.$element).append(el_vesg_uz_doc.$element).append(el_ves_tary_uz_doc.$element).append(el_brigadier_loading_uz_doc.$element);
        //
        var div_fr_loading_data62 = new base.fc_ui.el_div_form_row();
        var el_kod_etsng = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'kod_etsng',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_kod_etsng', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_kod_etsng', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_name_etsng = new base.fc_ui.el_form_textarea({
            fg_cl: 'col-xl-9 mb-1 text-left',
            id: 'name_etsng',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_name_etsng', App.Langs),
            txar_cl: 'form-control inp-epd',
            txar_title: langView('fogcd_title_name_etsng', App.Langs),
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data62.$div.append(el_kod_etsng.$element).append(el_name_etsng.$element);
        //
        var div_fr_loading_data63 = new base.fc_ui.el_div_form_row();
        var el_station_code_on = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'station_code_on',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_station_code_on', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_station_code_on', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_station_name_on = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-4 mb-1 text-left',
            id: 'station_name_on',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_station_name_on', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_station_name_on', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_railway_name_on = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-5 mb-1 text-left',
            id: 'railway_name_on',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_railway_name_on', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_railway_name_on', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data63.$div.append(el_station_code_on.$element).append(el_station_name_on.$element).append(el_railway_name_on.$element);
        //
        var div_fr_loading_data64 = new base.fc_ui.el_div_form_row();
        var el_client_kod_on = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-3 mb-1 text-left',
            id: 'client_kod_on',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_client_kod_on', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_client_kod_on', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        var el_client_name_on = new base.fc_ui.el_form_input({
            fg_cl: 'col-xl-9 mb-1 text-left',
            id: 'client_name_on',
            lb_cl: 'mb-1',
            lb_text: langView('fogcd_label_client_name_on', App.Langs),
            inp_type: 'text',
            inp_cl: 'form-control inp-epd',
            inp_title: langView('fogcd_title_client_name_on', App.Langs),
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        });
        div_fr_loading_data64.$div.append(el_client_kod_on.$element).append(el_client_name_on.$element);

        div_fr_loading_data6.$div.append(col_fr_loading_data6.$col.append(fs_loading_data6.$fieldset.append(div_fr_loading_data61.$div).append(div_fr_loading_data62.$div).append(div_fr_loading_data63.$div).append(div_fr_loading_data64.$div)));
        // SAP
        var div_fr_loading_data7 = new base.fc_ui.el_div_form_row();
        var col_fr_loading_data7 = new base.fc_ui.el_col('xl', 12, 'mb-1');
        var fs_loading_data7 = new base.fc_ui.el_fieldset('border-primary', null, langView('fogcd_title_fieldset_loading_data7', App.Langs));
        // ..........................................
        // ДАННЫЕ О ПРИБЫТИИ
        var fs_data_arrival = new base.fc_ui.el_fieldset('border-primary', null, langView('fogcd_title_fieldset_data_arrival', App.Langs));


        div_fr_loading_data7.$div.append(col_fr_loading_data7.$col.append(fs_loading_data7.$fieldset));
        // Задержание
        fs_detention.$fieldset.append(div_fr_detention1.$div).append(div_fr_detention2.$div);
        col_common_detention_return.$col.append(fs_detention.$fieldset);
        div_fr_common_detention_return2.$div.append(col_common_detention_return.$col);
        // Возврат
        fs_return.$fieldset.append(div_fr_return1.$div).append(div_fr_return2.$div).append(div_fr_return3.$div).append(div_fr_return4.$div);
        col_common_return.$col.append(fs_return.$fieldset);
        div_fr_common_detention_return3.$div.append(col_common_return.$col);

        //-- Задержание и возврат
        fs_common_detention_return.$fieldset.append(div_fr_common_detention_return1.$div).append(div_fr_common_detention_return2.$div).append(div_fr_common_detention_return3.$div);
        // Данные о погрузке
        fs_loading_data.$fieldset.append(div_fr_loading_data1.$div).append(div_fr_loading_data2.$div).append(div_fr_loading_data3.$div).append(div_fr_loading_data4.$div).append(div_fr_loading_data5.$div).append(div_fr_loading_data6.$div).append(div_fr_loading_data7.$div);
        //ДАННЫЕ О ПРИБЫТИИ

        //
        div.$div.append(row.$row).append(fs_common.$fieldset).append(fs_common_detention_return.$fieldset).append(fs_loading_data.$fieldset).append(fs_data_arrival.$fieldset);

        this.$bt_present = bt_present.$button;
        this.$bt_return = bt_return.$button;
        this.$bt_car_return = bt_car_return.$button;
        //--
        this.$num_car = el_num.$input;
        this.$position_outgoing = el_position_outgoing.$input;
        this.$num_cont_1 = el_num_cont_1.$input;
        this.$num_cont_2 = el_num_cont_2.$input;
        //--
        this.$date_outgoing_act = el_date_outgoing_act.$input;
        this.$reason_discrepancy_amkr = el_reason_discrepancy_amkr.$input;
        this.$reason_discrepancy_uz = el_reason_discrepancy_uz.$input;
        //--
        this.$adm_kod = el_adm_kod.$input;
        this.$rod_vag_abbr = el_rod_vag_abbr.$input;
        this.$gruzp_uz = el_gruzp_uz.$input;
        this.$tara_uz = el_tara_uz.$input;
        //--
        this.$condition_arrival = el_condition_arrival.$input;
        this.$condition_provide = el_condition_provide.$input;
        this.$element = div.$div;
    };

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
    form_outgoing_cars_detali.prototype.init = function (options, fn_init_ok) {

        var init = true;
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            ids_dir: null,
            fn_init: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();

        this.list_station = [];

        // Создать модальную форму "Окно сообщений"
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        var validation = App.validation_form;
        // Валидация перечень элементов
        this.all_elements = null;

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['reason_discrepancy', 'detention_return'], false, function (result) {
            // Подгрузили списки
            //this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === true && i.station_delete === null; });
            this.list_reason_discrepancy = this.ids_dir.getListReason_Discrepancy('id', 'reason_discrepancy_name', App.Lang, null);
            this.list_detention_return = this.ids_dir.getListDetention_Return('id', 'cause', App.Lang, null);
            //-------------------------------------
            // Сообщение
            LockScreen(langView('fogcd_mess_init_panel', App.Langs));
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
                    icon_left: 'fa fa-arrow-circle-left',
                    icon_right: null,
                    click: function () { },
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
                    icon_right: 'fa fa-arrow-circle-right',
                    click: function () { },
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
                    icon_right: 'fa fa-retweet',
                    click: function () { },
                }
            };
            var form_input_num = {
                obj: 'bs_input_number',
                element: null,
                options: {
                    id: 'num_car',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_num', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_num', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_min: null,
                    input_max: null,
                    input_step: null,
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
                element: null,
                options: {
                    id: 'position_outgoing',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('fogcd_label_position_outgoing', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: 'inp-auto',
                    input_title: langView('fogcd_title_position_outgoing', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_min: 1,
                    input_max: 120,
                    input_step: 1,
                    input_group: false,
                },
                childs: []
            };
            var form_input_num_cont_1 = {
                obj: 'bs_input_text',
                element: null,
                options: {
                    id: 'num_cont_1',
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
                element: null,
                options: {
                    id: 'num_cont_2',
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
                element: null,
                options: {
                    id: 'date_outgoing_act',
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
                element: null,
                options: {
                    id: 'reason_discrepancy_amkr',
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
                                this.validation.set_control_ok($(form_input_reason_discrepancy_amkr.element.$element), "");
                            } else {
                                this.validation.set_control_error($(form_input_reason_discrepancy_amkr.element.$element), langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_reason_discrepancy_uz = {
                obj: 'bs_autocomplete',
                element: null,
                options: {
                    id: 'reason_discrepancy_uz',
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
                                this.validation.set_control_ok($(form_input_reason_discrepancy_uz.element.$element), "");
                            } else {
                                this.validation.set_control_error($(form_input_reason_discrepancy_uz.element.$element), langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
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
                element: null,
                options: {
                    id: 'adm_kod',
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
                    input_group: false,
                },
                childs: []
            };
            var form_input_rod_vag_abbr = {
                obj: 'bs_input_text',
                element: null,
                options: {
                    id: 'rod_vag_abbr',
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
                    input_group: false,
                },
                childs: []
            };
            var form_input_gruzp_uz = {
                obj: 'bs_input_text',
                element: null,
                options: {
                    id: 'gruzp_uz',
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
                    input_group: false,
                },
                childs: []
            };
            var form_input_tara_uz = {
                obj: 'bs_input_text',
                element: null,
                options: {
                    id: 'tara_uz',
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
                element: null,
                options: {
                    id: 'condition_arrival',
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
                    input_group: false,
                },
                childs: []
            };
            var form_input_condition_present = {
                obj: 'bs_input_text',
                element: null,
                options: {
                    id: 'condition_present',
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
                element: null,
                options: {
                    id: 'condition_present',
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
                element: null,
                options: {
                    id: null,
                    class: null,
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
                    icon_right: 'fa fa-save',
                    click: function () { },
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
                    icon_right: 'fa fa-edit',
                    click: function () { },
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
                element: null,
                options: {
                    id: 'cause_detention',
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
                                this.validation_detention.set_control_ok($(form_input_cause_detention.element.$element), "");
                            } else {
                                this.validation_detention.set_control_error($(form_input_cause_detention.element.$element), langView('fogcd_mess_valid_cause_detention', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_detention_start = {
                obj: 'bs_input_datetime',
                element: null,
                options: {
                    id: 'detention_start',
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
                element: null,
                options: {
                    id: 'detention_stop',
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
                element: null,
                options: {
                    id: null,
                    class: null,
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
                    icon_right: 'fa fa-save',
                    click: function () { },
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
                    icon_right: 'fa fa-times',
                    click: function () { },
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
                element: null,
                options: {
                    id: 'cause_return',
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
                                this.validation_return.set_control_ok($(form_input_cause_return.element.$element), "");
                            } else {
                                this.validation_return.set_control_error($(form_input_cause_return.element.$element), langView('fogcd_mess_valid_cause_return', App.Langs));
                            }
                        } else {

                        }
                    }.bind(this),
                },
                childs: []
            };
            var form_input_return_start = {
                obj: 'bs_input_datetime',
                element: null,
                options: {
                    id: 'return_start',
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
                element: null,
                options: {
                    id: 'return_stop',
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
                element: null,
                options: {
                    id: 'return_num_act',
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
            var form_input_return_date_act= {
                obj: 'bs_input_datetime',
                element: null,
                options: {
                    id: 'return_date_act',
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
                element: null,
                options: {
                    id: 'return_note',
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
            //
            col_return.childs.push(fieldset_return);
            form_row_return.childs.push(col_return);
            fieldset_detention_return.childs.push(form_row_return);
            //
            col_detali.childs.push(fieldset_common);
            col_detali.childs.push(fieldset_detention_return);
            col_detali.childs.push(fieldset_loading_data);
            col_detali.childs.push(fieldset_data_arrival);
            row_detali.childs.push(col_detali);
            //
            objs.push(row1);
            objs.push(row_detali);


            this.form.init({
                alert: alert, // Подключим Alert модальной формы
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
                    // HTML документы создало, выполним инициализацию валидации
                    // Все элементы
                    this.all_elements = $([])
                        .add(form_input_num.element.$element)
                        .add(form_input_position_outgoing.element.$element)
                        .add(form_input_num_cont_1.element.$element)
                        .add(form_input_num_cont_2.element.$element)
                        .add(form_input_date_outgoing_act.element.$element)
                        .add(form_input_reason_discrepancy_amkr.element.$element)
                        .add(form_input_reason_discrepancy_uz.element.$element)
                        .add(form_input_adm_kod.element.$element)
                        .add(form_input_rod_vag_abbr.element.$element)
                        .add(form_input_gruzp_uz.element.$element)
                        .add(form_input_tara_uz.element.$element)
                        .add(form_input_condition_arrival.element.$element)
                        .add(form_input_condition_present.element.$element)
                        .add(form_textarea_condition_present.element.$element)
                        ;
                    this.all_elements_detention = $([])
                        .add(form_input_cause_detention.element.$element)
                        .add(form_input_detention_start.element.$element)
                        .add(form_input_detention_stop.element.$element)
                        ;
                    this.all_elements_return = $([])
                        .add(form_input_cause_return.element.$element)
                        .add(form_input_return_start.element.$element)
                        .add(form_input_return_stop.element.$element)
                        .add(form_input_return_num_act.element.$element)
                        .add(form_input_return_date_act.element.$element)
                        .add(form_textarea_return_note.element.$element)
                        ;
                    // Валидация инициализация
                    this.validation = new validation();
                    this.validation.init({
                        alert: this.settings.alert,
                        elements: this.all_elements,
                    });
                    this.validation_detention = new validation();
                    this.validation_detention.init({
                        alert: form_alert.element,
                        elements: this.all_elements_detention,
                    });
                    this.validation_return = new validation();
                    this.validation_return.init({
                        alert: form_alert_return.element,
                        elements: this.all_elements_return,
                    });
                }.bind(this),
                fn_init: function (init) {
                    // Инициализация формы закончена
                    this.$form_outgoing_cars.empty();
                    this.$form_outgoing_cars.append(this.form.$form);
                    // Инициализация закончена
                    if (typeof this.settings.fn_init === 'function') {
                        this.settings.fn_init(init);
                    };
                }.bind(this),
            });



            /*var panelElement = new div_panel(this);*/
            // Отобразим макет панели


            //this.$form_outgoing_cars.append(panelElement.$element);
            // Валидация перечень элементов
            //var all_elements = $([])
            //    .add(panelElement.$num_car)
            //    .add(panelElement.$position_outgoing)
            //    .add(panelElement.$num_cont_1)
            //    .add(panelElement.$num_cont_2)
            //    .add(panelElement.$date_outgoing_act)
            //    .add(panelElement.$reason_discrepancy_amkr)
            //    .add(panelElement.$reason_discrepancy_uz)
            //    .add(panelElement.$adm_kod)
            //    .add(panelElement.$rod_vag_abbr)
            //    .add(panelElement.$gruzp_uz)
            //    .add(panelElement.$tara_uz)
            //    .add(panelElement.$condition_arrival)
            //    .add(panelElement.$condition_provide)

            //// Валидация инициализация
            //this.validation = new validation();
            //this.validation.init({
            //    alert: this.settings.alert,
            //    elements: all_elements,
            //});
            //// Инициализируем элементы макета панели
            //this.num_car = new this.fc_ui.init_input(panelElement.$num_car, 0, function (e) { });
            //this.position_outgoing = new this.fc_ui.init_input(panelElement.$position_outgoing.inputSpinner(), 1, function (e) { });
            //this.num_cont_1 = new this.fc_ui.init_input(panelElement.$num_cont_1, null, function (e) { });
            //this.num_cont_2 = new this.fc_ui.init_input(panelElement.$num_cont_2, null, function (e) { });
            ////
            //this.$date_outgoing_act = new this.fc_ui.init_datetime_input(panelElement.$date_outgoing_act, null, function (dt) { }, true);
            //this.reason_discrepancy_amkr = new this.fc_ui.init_autocomplete(panelElement.$reason_discrepancy_amkr, {
            //    data: this.list_reason_discrepancy,
            //    minLength: 0,
            //    out_value: false,
            //    val_inp: 'value',
            //    check: function (text) {
            //        if (text) {
            //            var obj = this.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', text)
            //            if (obj && obj.length > 0) {
            //                this.validation.set_control_ok($(this.reason_discrepancy_amkr.$element), "");
            //            } else {
            //                this.validation.set_control_error($(this.reason_discrepancy_amkr.$element), langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
            //            }
            //        } else {

            //        }
            //    }.bind(this)
            //});
            //this.reason_discrepancy_uz = new this.fc_ui.init_autocomplete(panelElement.$reason_discrepancy_uz, {
            //    data: this.list_reason_discrepancy,
            //    minLength: 0,
            //    out_value: false,
            //    val_inp: 'value',
            //    check: function (text) {
            //        if (text) {
            //            var obj = this.ids_dir.getReason_Discrepancy_Of_CultureName('reason_discrepancy_name', text)
            //            if (obj && obj.length > 0) {
            //                this.validation.set_control_ok($(this.reason_discrepancy_uz.$element), "");
            //            } else {
            //                this.validation.set_control_error($(this.reason_discrepancy_uz.$element), langView('fogcd_mess_valid_reason_discrepancy', App.Langs));
            //            }
            //        } else {

            //        }
            //    }.bind(this)
            //});
            ////
            //this.adm_kod = new this.fc_ui.init_input(panelElement.$adm_kod, null, function (e) { });
            //this.rod_vag_abbr = new this.fc_ui.init_input(panelElement.$rod_vag_abbr, null, function (e) { });
            //this.gruzp_uz = new this.fc_ui.init_input(panelElement.$gruzp_uz, null, function (e) { });
            //this.tara_uz = new this.fc_ui.init_input(panelElement.$tara_uz, null, function (e) { });
            ////
            //this.condition_arrival = new this.fc_ui.init_input(panelElement.$condition_arrival, null, function (e) { });
            //this.condition_provide = new this.fc_ui.init_input(panelElement.$condition_provide, null, function (e) { });

            //this.validation.clear_all();
            //this.validation.set_object_error($(this.num_car.$element), "Элемент - не выбран.");
            //this.validation.set_object_error($(this.reason_discrepancy_uz.$element), "Элемент - не выбран.");

            //-------------------------------------
        }.bind(this));
    }
    // Уточняющая валидация данных
    form_outgoing_cars_detali.prototype.validation = function (result) {
        var valid = true;
        // Сдесь можно проверить дополнительно
        var date_readiness_amkr = moment(result.old.date_readiness_amkr);
        var sostav_date_end_inspection_acceptance_delivery = result.new.date_end_inspection_acceptance_delivery ? moment(result.new.date_end_inspection_acceptance_delivery) : null;
        var sostav_date_end_inspection_loader = result.new.date_end_inspection_loader ? moment(result.new.date_end_inspection_loader) : null;
        var sostav_date_end_inspection_vagonnik = result.new.date_end_inspection_vagonnik ? moment(result.new.date_end_inspection_vagonnik) : null;
        var sostav_date_readiness_uz = result.new.date_readiness_uz ? moment(result.new.date_readiness_uz) : null;
        var sostav_date_outgoing = result.new.date_outgoing ? moment(result.new.date_outgoing) : null;
        var sostav_date_outgoing_act = result.new.date_outgoing_act ? moment(result.new.date_outgoing_act) : null;

        // Проверим на интервалы времени
        if (!date_readiness_amkr.isBefore(sostav_date_end_inspection_acceptance_delivery)) {
            this.form.set_object_error('date_end_inspection_acceptance_delivery', langView('fhoogs_error_date_end_inspection_acceptance_delivery', App.Langs).format(date_readiness_amkr.format('DD.MM.YYYY HH:mm:ss')));
            valid = false;
        }
        if (!date_readiness_amkr.isBefore(sostav_date_end_inspection_loader)) {
            this.form.set_object_error('date_end_inspection_loader', langView('fhoogs_error_date_end_inspection_loader', App.Langs).format(date_readiness_amkr.format('DD.MM.YYYY HH:mm:ss')));
            valid = false;
        }
        if (!date_readiness_amkr.isBefore(sostav_date_end_inspection_vagonnik)) {
            this.form.set_object_error('date_end_inspection_vagonnik', langView('fhoogs_error_date_end_inspection_vagonnik', App.Langs).format(date_readiness_amkr.format('DD.MM.YYYY HH:mm:ss')));
            valid = false;
        }
        if (!sostav_date_readiness_uz.isAfter(sostav_date_end_inspection_acceptance_delivery) ||
            !sostav_date_readiness_uz.isAfter(sostav_date_end_inspection_loader) ||
            !sostav_date_readiness_uz.isAfter(sostav_date_end_inspection_vagonnik)) {
            this.form.set_object_error('date_readiness_uz', langView('fhoogs_error_date_readiness_uz', App.Langs));
            valid = false;
        }
        if (!sostav_date_outgoing.isAfter(sostav_date_readiness_uz)) {
            this.form.set_object_error('date_outgoing', langView('fhoogs_error_date_outgoing', App.Langs));
            valid = false;
        }
        if (sostav_date_outgoing_act !== null) {
            if (sostav_date_outgoing_act && !sostav_date_outgoing_act.isAfter(sostav_date_readiness_uz)) {
                this.form.set_object_error('date_outgoing_act', langView('fhoogs_error_date_outgoing_act', App.Langs));
                valid = false;
            }
        } else {
            //this.form.set_object_ok('date_outgoing_act','');
        }
        return valid;
    };
    // Открыть форму добавить
    form_outgoing_cars_detali.prototype.add = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        this.form.disabled('num_doc', true);
        this.mf_edit.open(langView('fhoogs_title_form_add', App.Langs));
    };
    // Открыть форму править
    form_outgoing_cars_detali.prototype.edit = function (data) {
        this.out_clear();
        this.form.view_edit(data);
        this.form.disabled('num_doc', true);
        this.mf_edit.open(langView('fhoogs_title_form_edit', App.Langs));
    };
    // Выполнить удаление
    form_outgoing_cars_detali.prototype.del = function (data) {
        this.out_clear();
        this.delete(data);
    };
    // Сохранить объект
    form_outgoing_cars_detali.prototype.save = function (data) {
        this.out_clear();
        this.update(data);
    };
    //// Добавить объект
    //form_outgoing_cars_detali.prototype.insert = function (data) {
    //    // Добавить 
    //    LockScreen(langView('fhoogs_mess_operation_run', App.Langs));
    //    this.ids_dir.postOperatorsWagons(data, function (result) {
    //        if (result > 0) {
    //            this.mf_edit.close(); // закроем форму
    //            if (typeof this.settings.fn_add === 'function') {
    //                this.settings.fn_add({ data: data, result: result });
    //            }
    //            LockScreenOff();
    //        } else {
    //            LockScreenOff();
    //            this.mf_edit.out_error('При добавлении оператора произошла ошибка, код ошибки : ' + result);
    //        }
    //    }.bind(this));
    //};
    // Изменить объект
    form_outgoing_cars_detali.prototype.update = function (data) {
        LockScreen(langView('fhoogs_mess_operation_run', App.Langs));
        this.ids_wsd.postOperationPresentSostav(data, function (result) {
            if (result > 0) {
                this.mf_edit.close(); // закроем форму
                if (typeof this.settings.fn_edit === 'function') {
                    this.settings.fn_edit({ data: data, result: result });
                }
                LockScreenOff();
            } else {
                LockScreenOff();
                this.mf_edit.out_error('При обновлении оператора произошла ошибка, код ошибки : ' + result);
            }
        }.bind(this));
    };
    //// Удалить объект
    //form_outgoing_cars_detali.prototype.delete = function (data) {
    //    if (data !== null) {
    //        this.modal_confirm_form.view(langView('fhoogs_title_form_del', App.Langs), 'Удалить выбранный оператор [' + data['operators_' + App.Lang] + '] ?', function (result) {
    //            if (result) {

    //                this.ids_dir.deleteOperatorsWagons(data.id, function (result) {
    //                    if (result > 0) {
    //                        if (typeof this.settings.fn_delete === 'function') {
    //                            this.settings.fn_delete({ data: data, result: result });
    //                        }
    //                        LockScreenOff();
    //                    } else {
    //                        LockScreenOff();
    //                        this.out_error('При удалении оператора произошла ошибка, код ошибки : ' + result);
    //                    }
    //                }.bind(this));

    //            } else {
    //                // Отмена
    //                this.out_warning("Операция 'Удалить оператора' – отменена");
    //            }
    //        }.bind(this));
    //    } else {

    //    }
    //};
    // Очистить сообщения
    form_outgoing_cars_detali.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать сообщение ошибки
    form_outgoing_cars_detali.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать сообщение предупреждения
    form_outgoing_cars_detali.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_outgoing_cars_detali.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    form_outgoing_cars_detali.destroy = function () {
        this.modal_confirm_form.destroy();
        this.form.destroy();
        this.mf_edit.destroy();
    };

    App.form_outgoing_cars_detali = form_outgoing_cars_detali;

    window.App = App;

})(window);