/*Модуль Отображения информации по ЭПД*/
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
            'vepd_field_epd_id_doc': 'id-док.',
            'vepd_field_epd_revision': '№ рев.',
            'vepd_field_epd_num_uz': '№ нак.',
            'vepd_field_epd_status': 'Статус',
            'vepd_field_epd_sender_code': 'Грузоотправитель',
            'vepd_field_epd_recipient_code': 'Грузополучатель',
            'vepd_field_epd_dt': 'Обновлен',
            'vepd_field_epd_xml_final': 'XML',

            'vepd_field_doc_id': 'Ідентифікатор документа у базі АТ «Укрзалізниця»',
            'vepd_field_doc_description': 'Опис документа',
            'vepd_field_doc_doc_date': 'Дата документу',
            'vepd_field_doc_doc_type': 'Код типу супровідного документа',
            'vepd_field_doc_doc_type_name': 'Найменування типу супровідного документу',
            'vepd_field_doc_kod_zd_use': 'Код залізниці вилучення документа',
            'vepd_field_doc_kol': 'Кількість екземплярів',

            'vepd_field_act_carrier_kod': 'Код перевізника',
            'vepd_field_act_carrier_name': 'Скорочене найменування перевізника',
            'vepd_field_act_date_akt': 'Дата складання акту',
            'vepd_field_act_date_dved': 'Дата укладання досильної дорожньої відомості',
            'vepd_field_act_esr_akt': 'ЄСР станції складання акту ',
            'vepd_field_act_stn_name_akt': 'Найменування станції складання акту',
            'vepd_field_act_nom_akt': 'Номер акту',
            'vepd_field_act_nom_dved': 'Номер досильної дорожньої відомості',
            'vepd_field_act_oper_date': 'Дата внесення даних по акту у перевізний документ',
            'vepd_field_act_prichina_akt': 'Причина',
            'vepd_field_act_responsible_person': 'Ім`я особи, відповідальної за внесення данних по акту у перевізний документ',
            'vepd_field_act_ser_dved': 'Серія досильної дорожньої відомості',
            'vepd_field_act_type': 'Тип акту',
            'vepd_field_act_vagon_nom': 'Номер вагону ',
            'vepd_field_act_zd_kod': 'Код залізниці перевантаження',

            'vepd_field_cont_nom_cont': 'Номер контейнеру',
            'vepd_field_cont_kod_tiporazmer': 'Типорозмір контейнеру',
            'vepd_field_cont_gruzp': 'Маса брутто за трафаретом (т)',
            'vepd_field_cont_ves_tary_arc': 'Маса тари контейнеру (кг)',
            'vepd_field_cont_vesg': 'Вага вантажу нетто (кг)',
            'vepd_field_cont_brutto': 'Вага вантажу брутто',
            'vepd_field_cont_kod': 'Код платежу ',
            'vepd_field_cont_summa': 'Cума платежу (коп.)',
            'vepd_field_cont_nom_zpu': 'Номер ЗПП',
            'vepd_field_cont_kol_pac': 'Кількість місць упаковки',
            'vepd_field_cont_kod_etsng': 'Код вантажу по ЄТСНВ',

            'vepd_mess_init_module': 'Инициализация модуля(view_epd)...',
            'vepd_title_yes': 'Да',
            'vepd_title_all': 'Все',
            'vepd_title_button_export': 'Экспорт',
            'vepd_title_button_buffer': 'Буфер',
            'vepd_title_button_excel': 'Excel',
            'vepd_title_excel_sheet_name': 'Информация по ЭПД',
            'vepd_title_button_field': 'Поля',
            'vepd_title_button_field_select': 'Выбрать',
            'vepd_title_button_field_view_all': 'Показать все',
            'vepd_title_button_field_clear': 'Сбросить',

            'vepd_field_epd_status_unknown': 'Статус невідомий',
            'vepd_field_epd_status_draft': 'Чернетка',
            'vepd_field_epd_status_sending': 'Документ передається товарному касиру',
            'vepd_field_epd_status_registered': 'Документ переданий товарному касиру',
            'vepd_field_epd_status_reclaiming': 'Документ відкликається від товарного касира',
            'vepd_field_epd_status_accepted': 'Вантаж прийнято до перевезення',
            'vepd_field_epd_status_delivered': 'Вантаж прибув',
            'vepd_field_epd_status_recieved': 'Вантаж отримано одержувачем',
            'vepd_field_epd_status_uncredited': 'Документ розкредитовано товарним касиром',
            'vepd_field_epd_status_recieved_draft': 'Вантаж отримано одержувачем і редагується',
            'vepd_field_epd_status_recieved_sending': 'Вантаж отримано одержувачем і переданий товарному касиру',
            'vepd_field_epd_status_recieved_reclaiming': 'Вантаж отримано одержувачем і відкликається від товарного касира',
            'vepd_field_epd_status_canceled': 'Документ зіпсований товарним касиром',
            'vepd_field_epd_status_locked': 'Документ заблокований',

            'vepd_mess_load_epd_docs': 'Загружаю информацию с ЭПД (Сертификаты и другие документы)...',
            'vepd_mess_load_epd_acts': 'Загружаю информацию с ЭПД (Акты на вагоны)...',
            'vepd_mess_load_epd_conts': 'Загружаю информацию с ЭПД (Контейнера)...',
            'vepd_mess_update_epd': 'Обновляю информацию по ЭПД...',

        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;
    var EPD = App.epd;

    var get_status_epd = function (status) {
        switch (status) {
            case 0: { return langView('vepd_field_epd_status_unknown', App.Langs) }
            case 1: { return langView('vepd_field_epd_status_draft', App.Langs) }
            case 2: { return langView('vepd_field_epd_status_sending', App.Langs) }
            case 3: { return langView('vepd_field_epd_status_registered', App.Langs) }
            case 4: { return langView('vepd_field_epd_status_reclaiming', App.Langs) }
            case 5: { return langView('vepd_field_epd_status_accepted', App.Langs) }
            case 6: { return langView('vepd_field_epd_status_delivered', App.Langs) }
            case 7: { return langView('vepd_field_epd_status_recieved', App.Langs) }
            case 8: { return langView('vepd_field_epd_status_uncredited', App.Langs) }
            case 9: { return langView('vepd_field_epd_status_recieved_draft', App.Langs) }
            case 10: { return langView('vepd_field_epd_status_recieved_sending', App.Langs) }
            case 11: { return langView('vepd_field_epd_status_recieved_reclaiming', App.Langs) }
            case 12: { return langView('vepd_field_epd_status_canceled', App.Langs) }
            case 13: { return langView('vepd_field_epd_status_locked', App.Langs) }
            default: { return null;}
       }
    }


    // Перечень полей
    var list_collums = [
        {
            field: 'details_control',
            className: 'details-control  details-control-wagons-sostav',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        // Поля по ЭПД
        {
            field: 'epd_id_doc',
            data: function (row, type, val, meta) {
                return row.id_doc;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_epd_id_doc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'epd_revision',
            data: function (row, type, val, meta) {
                return row.revision;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_epd_revision', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'epd_num_uz',
            data: function (row, type, val, meta) {
                return row.num_uz;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_epd_num_uz', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'epd_status',
            data: function (row, type, val, meta) {
                return get_status_epd(row.status);
            },
            className: 'dt-body-left shorten mw-150',
            title: langView('vepd_field_epd_status', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'epd_sender_code',
            data: function (row, type, val, meta) {
                return row.sender_code;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_epd_sender_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'epd_recipient_code',
            data: function (row, type, val, meta) {
                return row.recipient_code;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_epd_recipient_code', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'epd_dt',
            data: function (row, type, val, meta) {
                return row.dt ? moment(row.dt).format(format_date) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('vepd_field_epd_dt', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'epd_xml_final',
            data: function (row, type, val, meta) {
                return row.xml_final;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_epd_xml_final', App.Langs), width: "50px", orderable: true, searchable: true
        },
        //public string xml { get; set; }
        //public OTPR otpr { get; set; }

        // Поля по документам
        {
            field: 'doc_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_doc_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'doc_description',
            data: function (row, type, val, meta) {
                return row.description;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('vepd_field_doc_description', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'doc_doc_date',
            data: function (row, type, val, meta) {
                return row.doc_date ? moment(row.doc_date).format(format_date) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('vepd_field_doc_doc_date', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'doc_doc_type',
            data: function (row, type, val, meta) {
                return row.doc_type;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_doc_doc_type', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'doc_doc_type_name',
            data: function (row, type, val, meta) {
                return row.doc_type_name;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('vepd_field_doc_doc_type_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'doc_kod_zd_use',
            data: function (row, type, val, meta) {
                return row.kod_zd_use ? Number(row.kod_zd_use) : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_doc_kod_zd_use', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'doc_kol',
            data: function (row, type, val, meta) {
                return row.kol ? Number(row.kol) : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_doc_kol', App.Langs), width: "30px", orderable: true, searchable: true
        },
        // Поля по Актам
        {
            field: 'act_carrier_kod',
            data: function (row, type, val, meta) {
                return row.carrier_kod ? Number(row.carrier_kod) : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_act_carrier_kod', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'act_carrier_name',
            data: function (row, type, val, meta) {
                return row.carrier_name ? row.carrier_name : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_carrier_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_date_akt',
            data: function (row, type, val, meta) {
                return row.date_akt ? moment(row.date_akt).format(format_date) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('vepd_field_act_date_akt', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_date_dved',
            data: function (row, type, val, meta) {
                return row.date_dved ? moment(row.date_dved).format(format_date) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('vepd_field_act_date_dved', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_esr_akt',
            data: function (row, type, val, meta) {
                return row.esr_akt ? row.esr_akt : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_esr_akt', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_stn_name_akt',
            data: function (row, type, val, meta) {
                return row.stn_name_akt;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_stn_name_akt', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_nom_akt',
            data: function (row, type, val, meta) {
                return row.nom_akt;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_nom_akt', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_nom_dved',
            data: function (row, type, val, meta) {
                return row.nom_dved ? Number(row.nom_dved) : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_act_nom_dved', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'act_oper_date',
            data: function (row, type, val, meta) {
                return row.oper_date ? moment(row.oper_date).format(format_date) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('vepd_field_act_oper_date', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_prichina_akt',
            data: function (row, type, val, meta) {
                return row.prichina_akt;
            },
            className: 'dt-body-left shorten mw-100',
            title: langView('vepd_field_act_prichina_akt', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'act_responsible_person',
            data: function (row, type, val, meta) {
                return row.responsible_person ? row.responsible_person : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_responsible_person', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_ser_dved',
            data: function (row, type, val, meta) {
                return row.ser_dved ? row.ser_dved : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_ser_dved', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'act_type',
            data: function (row, type, val, meta) {
                return row.type;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_type', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'act_vagon_nom',
            data: function (row, type, val, meta) {
                return row.vagon_nom;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_vagon_nom', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'act_zd_kod',
            data: function (row, type, val, meta) {
                return row.zd_kod ? row.zd_kod : null;
            },
            className: 'dt-body-left shorten mw-50',
            title: langView('vepd_field_act_zd_kod', App.Langs), width: "50px", orderable: true, searchable: true
        },
        // Контейнера
        {
            field: 'cont_nom_cont',
            data: function (row, type, val, meta) {
                return row.nom_cont ? row.nom_cont : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_cont_nom_cont', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_kod_tiporazmer',
            data: function (row, type, val, meta) {
                return row.kod_tiporazmer ? row.kod_tiporazmer : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_cont_kod_tiporazmer', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_gruzp',
            data: function (row, type, val, meta) {
                return row.gruzp ? Number(row.gruzp) : null;
            },
            className: 'dt-body-right',
            title: langView('vepd_field_cont_gruzp', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_ves_tary_arc',
            data: function (row, type, val, meta) {
                return row.ves_tary_arc ? Number(Number(row.ves_tary_arc) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-right',
            title: langView('vepd_field_cont_ves_tary_arc', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_vesg',
            data: function (row, type, val, meta) {
                return row.collect_k && row.collect_k.vesg ? Number(Number(row.collect_k.vesg) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-right',
            title: langView('vepd_field_cont_vesg', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_brutto',
            data: function (row, type, val, meta) {
                return row.collect_k && row.collect_k.vesg && row.ves_tary_arc ? Number((Number(row.ves_tary_arc) + Number(row.collect_k.vesg)) / 1000).toFixed(3) : null;
            },
            className: 'dt-body-right',
            title: langView('vepd_field_cont_brutto', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_kod',
            data: function (row, type, val, meta) {
                return row.pay_k && row.pay_k.length > 0 ? row.pay_k[0].kod : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_cont_kod', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_summa',
            data: function (row, type, val, meta) {
                return row.pay_k && row.pay_k.length > 0 ? Number(Number(row.pay_k[0].summa) / 100).toFixed(3) : null;
            },
            className: 'dt-body-right',
            title: langView('vepd_field_cont_summa', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_nom_zpu',
            data: function (row, type, val, meta) {
                return row.zpu_k && row.zpu_k.length > 0 ? row.zpu_k[0].nom_zpu : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_cont_nom_zpu', App.Langs), width: "50px", orderable: true, searchable: true
        },

        {
            field: 'cont_kol_pac',
            data: function (row, type, val, meta) {
                return row.collect_k && row.collect_k.kol_pac ? Number(row.collect_k.kol_pac) : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_cont_kol_pac', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'cont_kod_etsng',
            data: function (row, type, val, meta) {
                return row.collect_k ? Number(row.collect_k.kod_etsng) : null;
            },
            className: 'dt-body-center',
            title: langView('vepd_field_cont_kod_etsng', App.Langs), width: "50px", orderable: true, searchable: true
        },
    ];
    // Перечень кнопок
    var list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('vepd_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('vepd_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('vepd_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('vepd_title_excel_sheet_name', App.Langs),
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
            text: langView('vepd_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('vepd_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('vepd_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('vepd_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        //{
        //    button: 'hand_arrival_sostav',
        //    text: langView('ticc_title_button_hand_arrival_sostav', App.Langs),
        //    enabled: false
        //},
        //{
        //    button: 'hand_dislocation_sostav',
        //    text: langView('ticc_title_button_dislocation_over_sostav', App.Langs),
        //    enabled: true
        //},
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        }
    ];
    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function view_epd(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$div_out = $(selector);
        if (this.$div_out.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$div_out.attr('id');
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    view_epd.prototype.init_columns_detali = function () {
        var collums = [];
        //collums.push('id');
        return init_columns(collums, list_collums);
    };
    // инициализация полей epd_docs
    view_epd.prototype.init_columns_epd_docs = function () {
        var collums = [];
        collums.push({ field: 'doc_id', title: null, class: null });
        collums.push({ field: 'doc_description', title: null, class: null });
        collums.push({ field: 'doc_doc_date', title: null, class: null });
        collums.push({ field: 'doc_doc_type', title: null, class: null });
        collums.push({ field: 'doc_doc_type_name', title: null, class: null });
        collums.push({ field: 'doc_kod_zd_use', title: null, class: null });
        collums.push({ field: 'doc_kol', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей epd_acts
    view_epd.prototype.init_columns_epd_acts = function () {
        var collums = [];
        collums.push({ field: 'act_carrier_kod', title: null, class: null });
        collums.push({ field: 'act_carrier_name', title: null, class: null });
        collums.push({ field: 'act_date_akt', title: null, class: null });
        collums.push({ field: 'act_date_dved', title: null, class: null });
        collums.push({ field: 'act_esr_akt', title: null, class: null });
        collums.push({ field: 'act_stn_name_akt', title: null, class: null });
        collums.push({ field: 'act_nom_akt', title: null, class: null });
        collums.push({ field: 'act_nom_dved', title: null, class: null });
        collums.push({ field: 'act_oper_date', title: null, class: null });
        collums.push({ field: 'act_prichina_akt', title: null, class: null });
        collums.push({ field: 'act_responsible_person', title: null, class: null });
        collums.push({ field: 'act_ser_dved', title: null, class: null });
        collums.push({ field: 'act_type', title: null, class: null });
        collums.push({ field: 'act_vagon_nom', title: null, class: null });
        collums.push({ field: 'act_zd_kod', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей epd_conts
    view_epd.prototype.init_columns_epd_conts = function () {
        var collums = [];
        collums.push({ field: 'cont_nom_cont', title: null, class: null });
        collums.push({ field: 'cont_kod_tiporazmer', title: null, class: null });
        collums.push({ field: 'cont_gruzp', title: null, class: null });
        collums.push({ field: 'cont_ves_tary_arc', title: null, class: null });
        collums.push({ field: 'cont_vesg', title: null, class: null });
        collums.push({ field: 'cont_brutto', title: null, class: null });
        collums.push({ field: 'cont_kod', title: null, class: null });
        collums.push({ field: 'cont_summa', title: null, class: null });
        collums.push({ field: 'cont_nom_zpu', title: null, class: null });
        collums.push({ field: 'cont_kol_pac', title: null, class: null });
        collums.push({ field: 'cont_kod_etsng', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    // инициализация полей epd_docs
    view_epd.prototype.init_columns_epd = function () {
        var collums = [];
        collums.push({ field: 'epd_num_uz', title: null, class: null });
        collums.push({ field: 'epd_id_doc', title: null, class: null });
        collums.push({ field: 'epd_revision', title: null, class: null });
        collums.push({ field: 'epd_status', title: null, class: null });
        collums.push({ field: 'epd_dt', title: null, class: null });
        collums.push({ field: 'epd_sender_code', title: null, class: null });
        collums.push({ field: 'epd_recipient_code', title: null, class: null });
        collums.push({ field: 'epd_xml_final', title: null, class: null });
        return init_columns_detali(collums, list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    view_epd.prototype.init_button_detali = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок epd_docs
    view_epd.prototype.init_button_epd_docs = function () {
        var buttons = [];
        //buttons.push({ name: 'export', action: null });
        //buttons.push({ name: 'field', action: null });
        //buttons.push({
        //    name: 'hand_arrival_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_arrival_sostav(); // выполнить операцию "Принять состав"
        //    }.bind(this)
        //});
        //buttons.push({
        //    name: 'hand_dislocation_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_dislocation_sostav_sostav(); // выполнить операцию
        //    }.bind(this)
        //});
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок epd_docs
    view_epd.prototype.init_button_epd_acts = function () {
        var buttons = [];
        //buttons.push({ name: 'export', action: null });
        //buttons.push({ name: 'field', action: null });
        //buttons.push({
        //    name: 'hand_arrival_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_arrival_sostav(); // выполнить операцию "Принять состав"
        //    }.bind(this)
        //});
        //buttons.push({
        //    name: 'hand_dislocation_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_dislocation_sostav_sostav(); // выполнить операцию
        //    }.bind(this)
        //});
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок epd_conts
    view_epd.prototype.init_button_epd_conts = function () {
        var buttons = [];
        //buttons.push({ name: 'export', action: null });
        //buttons.push({ name: 'field', action: null });
        //buttons.push({
        //    name: 'hand_arrival_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_arrival_sostav(); // выполнить операцию "Принять состав"
        //    }.bind(this)
        //});
        //buttons.push({
        //    name: 'hand_dislocation_sostav',
        //    action: function (e, dt, node, config) {
        //        this.action_hand_dislocation_sostav_sostav(); // выполнить операцию
        //    }.bind(this)
        //});
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                this.action_refresh();
            }.bind(this)
        });
        //buttons.push({ name: 'page_length', action: null });
        return init_buttons(buttons, list_buttons);
    };
    // инициализация кнопок epd
    view_epd.prototype.init_button_epd = function () {
        var buttons = [];
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                this.action_refresh();
            }.bind(this)
        });
        return init_buttons(buttons, list_buttons);
    };
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    view_epd.prototype.init_type_report = function () {
        switch (this.settings.type_report) {
            case 'table-epd-docs': {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_epd_docs();
                this.table_buttons = this.init_button_epd_docs();
                break;
            };
            case 'table-epd-acts': {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_epd_acts();
                this.table_buttons = this.init_button_epd_acts();
                break;
            };
            case 'table-epd-conts': {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_epd_conts();
                this.table_buttons = this.init_button_epd_conts();
                break;
            };
            case 'table-epd': {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_epd();
                this.table_buttons = this.init_button_epd();
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
    view_epd.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('vepd_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_report: null,     // 
            div_class: 'table-epd-info',
            table_class: 'display compact cell-border row-border hover',
            //ids_wsd: null,
            fn_select_rows: null,
            fn_init: null,
            fn_refresh: null,
        }, options);
        //
        this.id_select = null           // выбранная строка
        this.epd = {};                  // весь ЭПД документ
        this.otpr = null;               // ЭПД документ
        this.sender_doc = null;         // ЭПД документы на вагон
        this.acts = null;               // ЭПД акты
        this.conts = null;              // ЭПД контейнера

        this.selected_rows = null;     // Выбранная строка

        this.epd_uz = new EPD();        // Создадим экземпляр библиотеки работы с ЭПД УЗ

        //this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        // Настройки отчета
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.table_columns = [];
        this.table_buttons = [];

        this.init_type_report();

        // Запускаем 2 процесса инициализации (паралельно)
        var process = 0;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                var MCF = App.modal_confirm_form;
                this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
                this.modal_confirm_form.init();
                //----------------------------------
                // Создать макет таблицы
                // Создадим и добавим макет таблицы
                var table_epd = new this.fc_ui.el_table('tab-epd-' + this.selector, this.settings.table_class);
                this.$table_epd = table_epd.$element;
                this.$div_out.addClass(this.settings.div_class).append(this.$table_epd);
                // Инициализируем таблицу
                this.obj_t_epd = this.$table_epd.DataTable({
                    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('vepd_title_all', App.Langs)]],
                    "pageLength": -1,
                    "deferRender": true,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    colReorder: true,                       // вкл. перетаскивание полей
                    fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
                    fixedColumns: {
                        leftColumns: this.leftColumns,
                    },
                    select: this.table_select,
                    "autoWidth": false,
                    //"filter": true,
                    //"scrollY": "600px",
                    sScrollX: "100%",
                    scrollX: true,
                    //"responsive": true,
                    //"bAutoWidth": false,
                    language: language_table(App.Langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        switch (this.settings.type_report) {
                            case 'table-epd-docs': {
                                $(row).attr('id', data.id);
                                break;
                            };
                            case 'table-epd': {
                                $(row).attr('id', data.revision);
                                break;
                            };
                        };
                    }.bind(this),
                    columns: this.table_columns,
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: this.table_buttons,
                });
                // Обработка события выбора
                switch (this.settings.type_report) {
                    case 'table-epd-docs': {
                        this.obj_t_epd.on('select deselect', function (e, dt, type, indexes) {
                            this.select_rows(); // определим строку
                            this.enable_button();
                            // Обработать событие выбрана строка
                            if (typeof this.settings.fn_select_rows === 'function') {
                                this.settings.fn_select_rows(this.selected_rows);
                            }
                        }.bind(this));
                        break;
                    };
                    case 'table-epd-acts': {
                        this.obj_t_epd.on('select deselect', function (e, dt, type, indexes) {
                            this.select_rows(); // определим строку
                            this.enable_button();
                            // Обработать событие выбрана строка
                            if (typeof this.settings.fn_select_rows === 'function') {
                                this.settings.fn_select_rows(this.selected_rows);
                            }
                        }.bind(this));

                        break;
                    };
                    case 'table-epd-conts': {
                        this.obj_t_epd.on('select deselect', function (e, dt, type, indexes) {
                            this.select_rows(); // определим строку
                            this.enable_button();
                            // Обработать событие выбрана строка
                            if (typeof this.settings.fn_select_rows === 'function') {
                                this.settings.fn_select_rows(this.selected_rows);
                            }
                        }.bind(this));

                        break;
                    };
                    case 'table-epd': {
                        this.obj_t_epd.on('select deselect', function (e, dt, type, indexes) {
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
                //----------------------------------
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init(this.result_init);
                }
                //----------------------------------

            }
        }.bind(this);
        out_init(process); // Временно!
        //
        //// Форма отправить состав ===============================================================================
        //this.fhoogs = new FHOOGS();
        //this.fhoogs.init({
        //    alert: this.settings.alert,
        //    ids_wsd: this.ids_wsd,
        //    fn_init: function (init) {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    }.bind(this),
        //    fn_add: function (result) {

        //    }.bind(this),
        //    fn_edit: function (result) {
        //        this.update();
        //        this.out_clear();
        //        if (result && result.data) {
        //            if (result.data.status < 2) {
        //                this.out_info(langView('ticc_mess_ok_operation_return_present', App.Langs));
        //            } else {
        //                this.out_info(langView('ticc_mess_update_operation_return_present', App.Langs));
        //            }
        //        } else {
        //            this.out_info(langView('ticc_mess_error_operation_return_present', App.Langs));
        //        }
        //    }.bind(this),
        //});
        ////
        //// Форма дислокации состав ===============================================================================
        //this.fhdogs = new FHDOGS();
        //this.fhdogs.init({
        //    alert: this.settings.alert,
        //    ids_wsd: this.ids_wsd,
        //    fn_init: function (init) {
        //        // На проверку окончания инициализации
        //        process--;
        //        out_init(process);
        //    }.bind(this),
        //    fn_add: function (result) {

        //    }.bind(this),
        //    fn_edit: function (result) {
        //        this.update();
        //        this.out_clear();
        //        if (typeof this.settings.fn_refresh === 'function') {
        //            this.settings.fn_refresh();
        //        }
        //        if (result && result.data) {
        //            this.out_info(langView('ticc_mess_ok_operation_outgoing_dislocation', App.Langs));
        //        } else {
        //            this.out_info(langView('ticc_mess_error_operation_outgoing_dislocation', App.Langs));
        //        }
        //    }.bind(this),
        //});
    };
    //-------------------------------------------------------------------------------------------
    // обновим информацию об выбраных строках
    view_epd.prototype.select_clear = function () {
        this.obj_t_epd.rows({ selected: true }).deselect();
        this.obj_t_epd.draw();
    };
    // обновим информацию об выбраных строках
    view_epd.prototype.select_rows = function () {
        var index = this.obj_t_epd.rows({ selected: true });
        var rows = this.obj_t_epd.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
    };
    // Показать данные
    view_epd.prototype.view = function (data, id_select, hide_colums) {
        if (this.obj_t_epd) {
            this.obj_t_epd.columns().visible(true);
            this.id_select = id_select;
            this.out_clear();
            this.obj_t_epd.clear();
            // Спрячим поля которые не показывать
            if (hide_colums && hide_colums.length > 0) {
                this.obj_t_epd.columns(hide_colums).visible(false);
            };
            this.obj_t_epd.rows.add(data);
            this.obj_t_epd.order(this.order_column);
            //this.obj_t_epd.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
            this.obj_t_epd.draw();
            if (id_select !== null) {
                this.id_select = id_select
                this.obj_t_epd.row('#' + this.id_select).select();
            } else {
                this.id_select = null;
            }
            this.select_rows();
            this.enable_button();
        };
    };
    // Показать данные
    view_epd.prototype.clear = function () {
        if (this.obj_t_epd) {
            this.obj_t_epd.clear();
            this.obj_t_epd.draw();
        };
    };
    // Загрузить документы
    view_epd.prototype.load_epd_docs = function (otpr, cb_load) {
        if (otpr !== null) {
            LockScreen(langView('vepd_mess_load_epd_docs', App.Langs));
            this.sender_doc = this.epd_uz.get_sender_doc(this.otpr);
            LockScreenOff();
            if (typeof cb_load === 'function') {
                cb_load(this.sender_doc);
            }
        } else {
            this.sender_doc = [];
            if (typeof cb_load === 'function') {
                cb_load(this.sender_doc);
            }
        }

    };
    // Загрузить акты на документ
    view_epd.prototype.load_epd_acts = function (otpr, cb_load) {
        if (otpr !== null) {
            LockScreen(langView('vepd_mess_load_epd_acts', App.Langs));
            this.acts = this.epd_uz.get_wagon_acts(this.otpr, null);
            LockScreenOff();
            if (typeof cb_load === 'function') {
                cb_load(this.acts);
            }
        } else {
            this.acts = [];
            if (typeof cb_load === 'function') {
                cb_load(this.acts);
            }
        }

    };
    // Загрузить акты на вагон
    view_epd.prototype.load_epd_acts_wagon = function (otpr, num, cb_load) {
        if (otpr !== null) {
            LockScreen(langView('vepd_mess_load_epd_acts', App.Langs));
            this.acts = this.epd_uz.get_wagon_acts(this.otpr, num);
            LockScreenOff();
            if (typeof cb_load === 'function') {
                cb_load(this.acts);
            }
        } else {
            this.acts = [];
            if (typeof cb_load === 'function') {
                cb_load(this.acts);
            }
        }

    };
    // Загрузить акты на вагон
    view_epd.prototype.load_epd_conts = function (otpr, num, cb_load) {
        if (otpr !== null) {
            LockScreen(langView('vepd_mess_load_epd_conts', App.Langs));
            this.conts = this.epd_uz.get_vagon_cont_epd(this.otpr, num);
            if (!this.conts) this.conts = [];
            LockScreenOff();
            if (typeof cb_load === 'function') {
                cb_load(this.conts);
            }
        } else {
            this.conts = [];
            if (typeof cb_load === 'function') {
                cb_load(this.conts);
            }
        }

    };
    // Обновим составы по прибытию
    view_epd.prototype.update = function (cb_load) {
        if (this.otpr !== null) {
            LockScreen(langView('vepd_mess_update_epd', App.Langs));
            this.sender_doc = this.filter_sender_doc(this.otpr);
            if (typeof cb_load === 'function') {
                cb_load(this.sender_doc);
            }
        } else {
            his.sender_doc = [];
            if (typeof cb_load === 'function') {
                cb_load(his.sender_doc);
            }
        }
    };
    //// Получить документы по ЭПД
    //view_epd.prototype.filter_sender_doc = function (otpr) {
    //    if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
    //        return otpr.sender_doc
    //    } else {
    //        return []
    //    }
    //};
    //// Получить акты по ЭПД
    //view_epd.prototype.filter_acts = function (otpr, num) {
    //    if (otpr && otpr.acts && otpr.acts.length > 0) {
    //        var acts = otpr.acts.filter(function (i) {
    //            if (Number(i.vagon_nom) === num) return true; else return false;
    //        });
    //    } else {
    //        return []
    //    }
    //};
    // Отображение кнопки добавить
    view_epd.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'incoming_sostav': {
            //    if (this.selected_rows && this.selected_rows.length > 0) {
            //        this.obj_t_epd.button(4).enable(true);
            //        if (this.selected_rows[0].status < 1) {
            //            this.obj_t_epd.button(2).enable(true);
            //            this.obj_t_epd.button(3).enable(false); // отмена сдачи состава
            //            this.obj_t_epd.button(4).text(langView('ticc_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_epd.button(2).enable(false);
            //            if (this.selected_rows[0].status === 2) { this.obj_t_epd.button(3).enable(true); } else { this.obj_t_epd.button(3).enable(false); }
            //            this.obj_t_epd.button(4).text(langView('ticc_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_epd.button(2).enable(false);
            //        this.obj_t_epd.button(3).enable(false);
            //        this.obj_t_epd.button(4).enable(false);
            //    }
            //    break;
            //};
        };
    };
    // Выполнить операцию обновить
    view_epd.prototype.action_refresh = function () {
        //this.out_clear();
        //if (typeof this.settings.fn_refresh === 'function') {
        //    this.settings.fn_refresh();
        //} else {
        //    this.update(function (wagons) {
        //        this.view(wagons, this.id_station, this.otpr);
        //        LockScreenOff();
        //    }.bind(this));
        //}
    };
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    view_epd.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_epd.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_epd.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_epd.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    view_epd.prototype.destroy = function () {
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        //// Уберем модуль Форма "Предъявить состав"
        //if (this.fhoogs) {
        //    this.fhoogs.destroy();
        //    this.fhoogs = null;
        //}
        // Очистить таблицы
        if (this.obj_t_epd) {
            this.obj_t_epd.destroy(true);
            this.obj_t_epd = null;
        }
        this.$div_out.empty(); // empty in case the columns change
    }

    App.view_epd = view_epd;

    window.App = App;
})(window);