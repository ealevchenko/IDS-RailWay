(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    var format_date = "YYYY-MM-DD";

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'maincc_load_reference': 'Загружаю справочники...',
            'maincc_init_main': 'Инициализация формы ...',
            'maincc_not_num': 'Укажите номер вагона',
            'maincc_not_system_num': 'Номер вагона не прошёл проверку на системную нумерацию!',
            'maincc_not_open_wir': 'По указанному номеру вагона нет открытых внутренних перемещений.',
            'maincc_dislocation_out_way': 'На перегоне',
            'maincc_dislocation_way': 'На пути',
            'maincc_label_station_amkr': 'Текущая станция',
            'maincc_title_station_amkr': 'Текущая станция',
            'maincc_label_dislocation_amkr': 'Дислокация',
            'maincc_title_dislocation_amkr': 'Дислокация',
            'maincc_label_way_amkr': 'Название пути (перегона)',
            'maincc_title_way_amkr': 'Название пути (перегона)',
            'maincc_label_code_adm': 'Код адм.',
            'maincc_title_code_adm': 'Код адм.',
            'maincc_label_operator': 'Оператор',
            'maincc_title_operator': 'Оператор',
            'maincc_label_rod': 'Род ваг.',
            'maincc_title_rod': 'Род ваг.',
            'maincc_label_date_rem_uz': 'Дата ремонта по УЗ',
            'maincc_title_date_rem_uz': 'Дата ремонта по УЗ',
            'maincc_label_condition_arrival': 'Разметка по прибытию.',
            'maincc_title_condition_arrival': 'Разметка по прибытию.',
            'maincc_label_condition_current': 'Разметка текущая.',
            'maincc_title_condition_current': 'Разметка текущая',
            'maincc_label_cargo': 'Груз по прибытию',
            'maincc_title_cargo': 'Груз по прибытию',
            'maincc_label_station_ext': 'Стан. отправ.',
            'maincc_title_station_ext': 'Груз по прибытию',
            'maincc_label_divisions': 'Цех получ',
            'maincc_title_divisions': 'Цех получ',
            'maincc_label_date_adoption': 'Дата приема на АМКР',
            'maincc_title_date_adoption': 'Дата приема на АМКР',
            'maincc_label_note': 'Примечание',
            'maincc_title_note': 'Примечание',



            'maincc_searsh_num': 'Выполняю поиск ....',
        },
        'en':  //default language: English
        {

        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang));
    App.User_Name = $('input#username').val();

    var IDS_DIRECTORY = App.ids_directory;
    var ids_dir = new IDS_DIRECTORY();

    var IDS_WSD = App.ids_wsd;
    var ids_wsd = new IDS_WSD();

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    // Создадим форму правки информации по вагону
    var FDL = App.form_dialog;
    var form_info = new FDL();


    var alert = App.alert_form;
    var alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var SRV = App.ids_server;
    var ids_srv = new SRV(); // Создадим класс ids_server

    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('maincc_load_reference', App.Langs));
        if (list) {
            ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };
    // Функция получения информации из сервера
    var get_server_info = function () {
        // Запрос клиентов 
        ids_srv.getCountClient(function (count) {
            $('a#client_count').text(count);
        });
    }

    var $num_vagon = $('input#num_vagon');
    var $bt_searsh = $('button#searsh');
    var $wagon_detali = $('div#wagon-detali');

    var elements = {};

    $bt_searsh.on('click', function (event) {
        event.preventDefault();
        alert.clear_message();
        var num = $num_vagon.val();
        if (num !== null && num !== '') {
            if (is_valid_num_wagon(num)) {
                LockScreen(langView('maincc_searsh_num', App.Langs));
                ids_wsd.getOpenWagonInternalRoutesOfNum(num, function (wir) {
                    if (wir !== null) {

                        var wim = wir.WagonInternalMovement !== null ? wir.WagonInternalMovement.find(function (o) { return o.close === null }) : null;
                        var wio_list = wir.WagonInternalOperation !== null ? wir.WagonInternalOperation.sort(function (a, b) { return b.id - a.id; }) : null;
                        var wio = wio_list !== null && wio_list.length > 0 ? wio_list[0] : null;

                        var station = wim ? wim.Directory_Station : null;
                        var way = wim ? wim.Directory_Ways : null;
                        var out_way = wim ? wim.Directory_OuterWays : null;
                        //------------------------------
                        var arr_car = wir.ArrivalCars;
                        var arr_sost = arr_car !== null ? arr_car.ArrivalSostav : null;
                        var doc_vag = arr_car !== null ? arr_car.Arrival_UZ_Vagon : null;
                        var doc_doc = doc_vag !== null ? doc_vag.Arrival_UZ_Document : null;
                        var countrys = doc_vag !== null ? doc_vag.Directory_Countrys : null;
                        var genus = doc_vag !== null ? doc_vag.Directory_GenusWagons : null;
                        var condition_arrival = doc_vag !== null ? doc_vag.Directory_ConditionArrival : null;
                        var condition_current = wio !== null ? wio.Directory_ConditionArrival : null;

                        var 

                        var cargo = doc_vag !== null ? doc_vag.Directory_Cargo : null;
                        var ext_station = doc_doc !== null ? doc_doc.Directory_ExternalStation : null;
                        var division = doc_vag !== null ? doc_vag.Directory_Divisions : null;


                        //doc_vag.Directory_Divisions = { ...}
                        elements.input_text_station_amkr.val(station ? station['station_name_' + App.Lang] : '');
                        elements.input_text_dislocation_amkr.val(out_way !== null ? langView('maincc_dislocation_out_way', App.Langs) : langView('maincc_dislocation_way', App.Langs));
                        elements.input_text_way_amkr.val(out_way !== null ? out_way['name_outer_way_' + App.Lang] : (way['way_num_' + App.Lang] + '-' + way['way_name_' + App.Lang]));

                        elements.input_text_code_adm.val(countrys !== null ? countrys.code_sng : '');
                        elements.input_text_operator.val('');
                        elements.input_text_rod.val(genus !== null ? genus['abbr_' + App.Lang] : '');
                        elements.input_text_date_rem_uz.val(doc_vag !== null && doc_vag.date_rem_uz !== null ? moment(doc_vag.date_rem_uz).format(format_date) : '');
                        elements.input_text_condition_arrival.val(condition_arrival !== null ? condition_arrival['condition_name_' + App.Lang] : '');
                        elements.input_text_condition_current.val(condition_current !== null ? condition_current['condition_name_' + App.Lang] : '');
                        elements.input_text_cargo.val(cargo !== null ? cargo['cargo_name_' + App.Lang] : '');
                        elements.input_text_station_ext.val(ext_station !== null ? ext_station['station_name_' + App.Lang] : '');
                        elements.input_text_divisions.val(division !== null ? division['name_division_' + App.Lang] : '');
                        elements.input_text_date_adoption.val(arr_sost !== null && arr_sost.date_adoption !== null ? moment(arr_sost.date_adoption).format(format_datetime) : '');
                        //elements.input_text_date_note.val('');
                        LockScreenOff();
                    } else {
                        alert.out_warning_message(langView('maincc_not_open_wir', App.Langs));
                        LockScreenOff();
                    }
                }.bind(this));
            } else {
                alert.out_warning_message(langView('maincc_not_system_num', App.Langs));
                LockScreenOff();
            }
        } else {
            alert.out_warning_message(langView('maincc_not_num', App.Langs));
            LockScreenOff();
        }

    }.bind(this));

    // После загрузки документа
    $(document).ready(function ($) {
        // Загрузим справочники, с признаком обязательно
        load_db(['station'], true, function (result) {
            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);
            LockScreen(langView('maincc_init_main', App.Langs));

            //----------------------------------
            // Создать макет панели
            var objs = [];
            var form_row_1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_station_amkr = {
                obj: 'bs_input_text',
                options: {
                    id: 'station_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_station_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_station_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            //var form_row_2 = {
            //    obj: 'bs_form_row',
            //    options: {
            //        class: null,
            //    },
            //    childs: []
            //};
            var form_input_dislocation_amkr = {
                obj: 'bs_input_text',
                options: {
                    id: 'dislocation_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_dislocation_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_dislocation_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_3 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_way_amkr = {
                obj: 'bs_input_text',
                options: {
                    id: 'way_amkr',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_way_amkr', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_way_amkr', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_4 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_code_adm = {
                obj: 'bs_input_text',
                options: {
                    id: 'code_adm',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_code_adm', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_code_adm', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_operator = {
                obj: 'bs_input_text',
                options: {
                    id: 'operator',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_operator', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_operator', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_rod = {
                obj: 'bs_input_text',
                options: {
                    id: 'rod',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_rod', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_rod', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_date_rem_uz = {
                obj: 'bs_input_text',
                options: {
                    id: 'date_rem_uz',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 3,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_date_rem_uz', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_date_rem_uz', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_5 = {
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
                    label: langView('maincc_label_condition_arrival', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_condition_arrival', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_condition_current = {
                obj: 'bs_input_text',
                options: {
                    id: 'condition_current',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_condition_current', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_condition_current', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_6 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_cargo = {
                obj: 'bs_input_text',
                options: {
                    id: 'cargo',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_cargo', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_cargo', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_station_ext = {
                obj: 'bs_input_text',
                options: {
                    id: 'station_ext',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_station_ext', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_station_ext', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_7 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_divisions = {
                obj: 'bs_input_text',
                options: {
                    id: 'divisions',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_divisions', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_divisions', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_date_adoption = {
                obj: 'bs_input_text',
                options: {
                    id: 'date_adoption',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_date_adoption', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_date_adoption', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_row_8 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_note = {
                obj: 'bs_textarea',
                options: {
                    id: 'note',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_note', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: null,
                    textarea_title: langView('maincc_title_note', App.Langs),
                    textarea__placeholder: null,
                    textarea__required: null,
                    textarea__readonly: true,
                    input_group: false,
                },
                childs: []
            };
            //
            form_row_1.childs.push(form_input_station_amkr);
            form_row_1.childs.push(form_input_dislocation_amkr);
            form_row_3.childs.push(form_input_way_amkr);
            form_row_4.childs.push(form_input_code_adm);
            form_row_4.childs.push(form_input_operator);
            form_row_4.childs.push(form_input_rod);
            form_row_4.childs.push(form_input_date_rem_uz);
            form_row_5.childs.push(form_input_condition_arrival);
            form_row_5.childs.push(form_input_condition_current);
            form_row_6.childs.push(form_input_cargo);
            form_row_6.childs.push(form_input_station_ext);
            form_row_7.childs.push(form_input_divisions);
            form_row_7.childs.push(form_input_date_adoption);
            form_row_8.childs.push(form_input_note);
            //
            objs.push(form_row_1);
            //objs.push(form_row_2);
            objs.push(form_row_3);
            objs.push(form_row_4);
            objs.push(form_row_5);
            objs.push(form_row_6);
            objs.push(form_row_7);
            objs.push(form_row_8);
            // Инициализируем форму
            form_info.init({
                alert: alert,
                objs: objs,
                mb: 2,
                id: null,
                cl_form: null,
                validation: true,
                fn_validation: null,
                fn_html_init: null,
                fn_init: function (init) {
                    // Инициализация формы закончена
                    // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                    form_info.create_element(elements, true);
                    // отобразим форму
                    $wagon_detali.empty();
                    $wagon_detali.append(form_info.$form);
                    LockScreenOff();
                }.bind(this),
            });
            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict