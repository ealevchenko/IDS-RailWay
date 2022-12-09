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
            'maincc_label_con_change': 'Дата изменения разметки',
            'maincc_title_con_change': 'Дата изменения разметки',
            'maincc_label_con_change_user': 'Польз. изм. разм.',
            'maincc_title_con_change_user': 'Польз. изм. разм.',

            'maincc_label_cargo': 'Груз по прибытию',
            'maincc_title_cargo': 'Груз по прибытию',
            'maincc_label_station_ext': 'Станция отправления',
            'maincc_title_station_ext': 'Груз по прибытию',
            'maincc_label_divisions': 'Цех получатель',
            'maincc_title_divisions': 'Цех получатель',
            'maincc_label_date_adoption': 'Дата приема на АМКР',
            'maincc_title_date_adoption': 'Дата приема на АМКР',
            'maincc_label_note': 'Примечание',
            'maincc_title_note': 'Примечание',
            'maincc_label_distinguish': 'Выделить',
            'maincc_label_new_condition_current': 'Новая разметка.',
            'maincc_title_new_condition_current': 'Новая разметка',
            'maincc_label_new_note': 'Новое примечание',
            'maincc_title_new_note': 'Новое примечание',
            'maincc_label_bt_apply': 'Править',

            'maincc_searsh_num': 'Выполняю поиск ....',
            'maincc_mess_valid_not_condition_arrival': 'Укажите новую разметку',

            'maincc_form_apply': 'Править?',
            'maincc_form_message_apply': 'Заменить текущую разметку и примечание по вагону №{0}',
            'maincc_mess_run_apply': 'Выполняю операцию ...',
            'maincc_mess_cancel_apply': 'Отмена выполнения замены текущей разметки и примечания',
            'maincc_mess_error_apply': 'Ошибка выполнения замены текущей разметки и примечания, код ошибки: {0}',
            'maincc_mess_ok_apply': 'Замена текущей разметки и примечания - Выполнена!',
        },
        'en':  //default language: English
        {
            'maincc_load_reference': 'Loading references...',
            'maincc_init_main': 'Form initialization...',
            'maincc_not_num': 'Enter wagon number',
            'maincc_not_system_num': 'The wagon number did not pass the system numbering check!',
            'maincc_not_open_wir': 'There are no open internal movements for the specified wagon number.',
            'maincc_dislocation_out_way': 'On the way',
            'maincc_dislocation_way': 'On the way',
            'maincc_label_station_amkr': 'Current station',
            'maincc_title_station_amkr': 'Current station',
            'maincc_label_dislocation_amkr': 'Dislocation',
            'maincc_title_dislocation_amkr': 'Dislocation',
            'maincc_label_way_amkr': 'Name of the path (leg)',
            'maincc_title_way_amkr': 'Name of the way (leg)',
            'maincc_label_code_adm': 'Admin Code',
            'maincc_title_code_adm': 'Admin Code',
            'maincc_label_operator': 'Operator',
            'maincc_title_operator': 'Operator',
            'maincc_label_rod': 'Maincc_label_rod',
            'maincc_title_rod': 'Maincc_title_rod',
            'maincc_label_date_rem_uz': 'Maincc_label_date_rem_uz',
            'maincc_title_date_rem_uz': 'Repair date by uz',
            'maincc_label_condition_arrival': 'Label on arrival.',
            'maincc_title_condition_arrival': 'Tag on arrival.',
            'maincc_label_condition_current': 'Label is current.',
            'maincc_title_condition_current': 'Title is current',

            'maincc_label_cargo': 'Cargo on arrival',
            'maincc_title_cargo': 'Cargo on arrival',
            'maincc_label_station_ext': 'Departure Station',
            'maincc_title_station_ext': 'Cargo on arrival',
            'maincc_label_divisions': 'Destination Division',
            'maincc_title_divisions': 'Destination Division',
            'maincc_label_date_adoption': 'AMCR Adoption Date',
            'maincc_title_date_adoption': 'AMCR Acceptance Date',
            'maincc_label_note': 'Note',
            'maincc_title_note': 'Note',
            'maincc_label_distinguish': 'Distinguish',
            'maincc_label_new_condition_current': 'New label.',
            'maincc_title_new_condition_current': 'New Markup',
            'maincc_label_new_note': 'New Note',
            'maincc_title_new_note': 'New Note',
            'maincc_label_bt_apply': 'Edit',

            'maincc_searsh_num': 'Searching ....',
            'maincc_mess_valid_not_condition_arrival': 'Specify new markup',

            'maincc_form_apply': 'Edit?',
            'maincc_form_message_apply': 'Replace current markup and note for wagon #{0}',
            'maincc_mess_run_apply': 'Performing operation...',
            'maincc_mess_cancel_apply': 'Cancel performing replacement of the current markup and note',
            'maincc_mess_error_apply': 'Error while replacing current markup and note, error code: {0}',
            'maincc_mess_ok_apply': 'Replacing current markup and note - Done!',
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

    // Создать модальную форму "Окно сообщений"
    var MCF = App.modal_confirm_form;
    var modal_confirm_form = new MCF("mcc"); // Создадим экземпляр окно сообщений


    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    // Создадим форму правки информации по вагону
    var FDL = App.form_dialog;
    var form_info = new FDL();
    var form_edit = new FDL();


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
    var $wagon_edit = $('div#wagon-edit');

    var num = null;
    var id_wir = null;
    var elements = {};
    var edit_elements = {};
    var list_condition_arrival = null;


    $bt_searsh.on('click', function (event) {
        event.preventDefault();
        alert.clear_message();
        clear_element();
        close_edit_element();
        clear_edit_element();
        num = $num_vagon.val();
        if (num !== null && num !== '') {
            if (is_valid_num_wagon(num)) {
                view_info();
            } else {
                alert.out_warning_message(langView('maincc_not_system_num', App.Langs));
                LockScreenOff();
            }
        } else {
            alert.out_warning_message(langView('maincc_not_num', App.Langs));
            LockScreenOff();
        }

    }.bind(this));
    // Показать информацию по вагону
    var view_info = function () {
        LockScreen(langView('maincc_searsh_num', App.Langs));
        ids_wsd.getOpenWagonInternalRoutesOfNum(num, function (wir) {
            if (wir !== null) {
                id_wir = wir.id;
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

                var wagon = wir.Directory_Wagons;
                var rent = wagon !== null ? wagon.Directory_WagonsRent : null;
                var cur_rent = rent.find(function (o) { return o.rent_end === null });
                var oper = cur_rent !== null ? cur_rent.Directory_OperatorsWagons : null;

                var cargo = doc_vag !== null ? doc_vag.Directory_Cargo : null;
                var ext_station = doc_doc !== null ? doc_doc.Directory_ExternalStation : null;
                var division = doc_vag !== null ? doc_vag.Directory_Divisions : null;

                if (wir.highlight_color !== null) {
                    $wagon_detali.attr('style', 'background-color:' + wir.highlight_color);
                } else {
                    $wagon_detali.attr('style', 'background-color:');
                }


                elements.input_text_station_amkr.val(station ? station['station_name_' + App.Lang] : '');
                elements.input_text_dislocation_amkr.val(out_way !== null ? langView('maincc_dislocation_out_way', App.Langs) : langView('maincc_dislocation_way', App.Langs));
                elements.input_text_way_amkr.val(out_way !== null ? out_way['name_outer_way_' + App.Lang] : (way['way_num_' + App.Lang] + '-' + way['way_name_' + App.Lang]));

                elements.input_text_code_adm.val(countrys !== null ? countrys.code_sng : '');
                elements.input_text_operator.val(oper !== null ? oper['operators_' + App.Lang] : '');
                elements.input_text_rod.val(genus !== null ? genus['abbr_' + App.Lang] : '');
                elements.input_text_date_rem_uz.val(doc_vag !== null && doc_vag.date_rem_uz !== null ? moment(doc_vag.date_rem_uz).format(format_date) : '');
                elements.input_text_condition_arrival.val(condition_arrival !== null ? condition_arrival['condition_name_' + App.Lang] : '');
                elements.input_text_condition_current.val(condition_current !== null ? condition_current['condition_name_' + App.Lang] : '');

                elements.input_text_con_change.val(wio !== null && wio.con_change !== null ? moment(wio.con_change).format(format_datetime) : '');
                elements.input_text_con_change_user.val(wio !== null ? wio.con_change_user : '');

                elements.input_text_cargo.val(cargo !== null ? cargo['cargo_name_' + App.Lang] : '');
                elements.input_text_station_ext.val(ext_station !== null ? ext_station['station_name_' + App.Lang] : '');
                elements.input_text_divisions.val(division !== null ? division['name_division_' + App.Lang] : '');
                elements.input_text_date_adoption.val(arr_sost !== null && arr_sost.date_adoption !== null ? moment(arr_sost.date_adoption).format(format_datetime) : '');
                elements.textarea_note.val(wir.note !== null ? wir.note : '');
                open_edit_element();
                edit_elements.select_new_condition_arrival.val(condition_current !== null ? condition_current.id : -1);
                edit_elements.checkbox_distinguish.val(wir.highlight_color!==null);
                edit_elements.textarea_new_note.val(wir.note);
                LockScreenOff();
            } else {
                alert.out_warning_message(langView('maincc_not_open_wir', App.Langs));
                LockScreenOff();
            }
        }.bind(this));
    };
    // Очистить компоненты
    var clear_element = function () {
        elements.input_text_station_amkr.val('');
        elements.input_text_dislocation_amkr.val('');
        elements.input_text_way_amkr.val('');
        elements.input_text_code_adm.val('');
        elements.input_text_operator.val('');
        elements.input_text_rod.val('');
        elements.input_text_date_rem_uz.val('');
        elements.input_text_condition_arrival.val('');
        elements.input_text_condition_current.val('');
        elements.input_text_con_change.val('');
        elements.input_text_con_change_user.val('');
        elements.input_text_cargo.val('');
        elements.input_text_station_ext.val('');
        elements.input_text_divisions.val('');
        elements.input_text_date_adoption.val('');
        elements.textarea_note.val('');
    };
    var clear_edit_element = function () {
        edit_elements.select_new_condition_arrival.val(-1);
        edit_elements.checkbox_distinguish.val(false);
        edit_elements.textarea_new_note.val('');
    };
    // Закрыть форму правки
    var close_edit_element = function () {
        // Общая (common)
        form_edit.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', true);
        });
        edit_elements.button_apply.hide();
    };
    // открыть форму правки
    var open_edit_element = function () {
        // Общая (common)
        form_edit.obj_form.validations[0].$elements.each(function () {
            this.prop('disabled', false);
        });
        edit_elements.button_apply.show();
    };
    // применить правку
    var action_apply = function () {
        alert.clear_message();
        var valid = true;
        valid = valid & form_edit.validation_common.check_control_select_not_null(edit_elements.select_new_condition_arrival, langView('maincc_mess_valid_not_condition_arrival', App.Langs), '', true);
        if (valid) {
            modal_confirm_form.action_view({
                form_name: langView('maincc_form_apply', App.Langs),
                form_message: langView('maincc_form_message_apply', App.Langs).format($num_vagon.val()),
                message_operation: langView('maincc_mess_run_apply', App.Langs),
                fn_run: function () {
                    // Выполнить операцию
                    var operation = {
                        id_wir: id_wir,
                        id_condition_arrival: edit_elements.select_new_condition_arrival.getNumberNull(),
                        note: edit_elements.textarea_new_note.val(),
                        distinguish: edit_elements.checkbox_distinguish.val(),
                        user: App.User_Name,
                    }
                    // Выполним операцию
                    ids_wsd.postChangeCommercialCondition(operation, function (result) {
                        if (result >= 0) {
                            clear_edit_element();
                            view_info();
                            alert.out_info_message(langView('maincc_mess_ok_apply', App.Langs).format(result));
                            LockScreenOff();
                        } else {
                            alert.out_error_message(langView('maincc_mess_error_apply', App.Langs).format(result));
                        }
                    }.bind(this));
                }.bind(this),
                fn_cancel: function () {
                    // Отмена выполнения операции
                    alert.out_warning_message(langView('maincc_mess_cancel_apply', App.Langs));
                }.bind(this),
            });
        }
    };
    // После загрузки документа
    $(document).ready(function ($) {
        LockScreen(langView('maincc_init_main', App.Langs));
        modal_confirm_form.init();
        // Загрузим справочники, с признаком обязательно
        load_db(['condition_arrival'], true, function (result) {
            // Обновить
            setInterval(function () {
                $('label#curent_date').text(moment().format(format_datetime));
            }, 1000);

            list_condition_arrival = ids_dir.getListConditionArrival2('id', 'condition_abbr', 'condition_name', App.Lang, function (i) {
                return i.delete === null;
            });
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
            var form_row_5_1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_input_con_change = {
                obj: 'bs_input_text',
                options: {
                    id: 'con_change',
                    validation_group: 'view',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_con_change', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_con_change', App.Langs),
                    input_placeholder: null,
                    input_required: null,
                    input_readonly: true,
                    input_group: false,
                },
                childs: []
            };
            var form_input_con_change_user = {
                obj: 'bs_input_text',
                options: {
                    id: 'con_change_user',
                    validation_group: 'view',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_con_change_user', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_con_change_user', App.Langs),
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
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
                    validation_group: 'view',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_note', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: null,
                    textarea_title: langView('maincc_title_note', App.Langs),
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: true,
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
            form_row_5_1.childs.push(form_input_con_change);
            form_row_5_1.childs.push(form_input_con_change_user);
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
            objs.push(form_row_5_1);
            objs.push(form_row_6);
            objs.push(form_row_7);
            objs.push(form_row_8);
            //----------------------------------
            // Создать макет панели
            var objs_edit = [];
            var form_edit_row_1 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };
            var form_edit_row_2 = {
                obj: 'bs_form_row',
                options: {
                    class: null,
                },
                childs: []
            };

            var form_select_condition_arrival = {
                obj: 'bs_select',
                options: {
                    id: 'new_condition_arrival',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_new_condition_current', App.Langs),
                    label_class: 'mb-1',
                    input_size: null,
                    input_class: null,
                    input_title: langView('maincc_title_new_condition_current', App.Langs),
                    input_placeholder: null,
                    input_required: true,
                    input_group: false,
                    input_group_prepend_class: null,
                    input_group_prepend_objs: null,
                    input_group_append_class: null,
                    input_group_append_objs: null,
                    input_group_obj_form: null,
                    element_data: list_condition_arrival,
                    element_default: -1,
                    element_change: function (e) {
                        // var code = Number($(e.currentTarget).val());
                    }.bind(this),
                    element_check: function (value) {

                    }.bind(this),
                },
                childs: []
            };
            var form_checkbox_distinguish = {
                obj: 'bs_checkbox',
                element: null,
                options: {
                    id: 'distinguish',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 6,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_distinguish', App.Langs),
                    label_class: 'mb-1',
                    checkbox_class: 'inp-auto',
                    checkbox_title: null,
                    checkbox_required: null,
                    checkbox_readonly: null,
                    element_default: null,
                    element_change: null,
                },
                childs: []
            };
            var form_input_new_note = {
                obj: 'bs_textarea',
                options: {
                    id: 'new_note',
                    validation_group: 'common',
                    form_group_size: 'xl',
                    form_group_col: 12,
                    form_group_class: 'text-left',
                    label: langView('maincc_label_new_note', App.Langs),
                    label_class: 'mb-1',
                    textarea_size: null,
                    textarea_rows: 3,
                    textarea_class: null,
                    textarea_title: langView('maincc_title_new_note', App.Langs),
                    textarea_placeholder: null,
                    textarea_required: null,
                    textarea_readonly: null,
                    input_group: false,
                },
                childs: []
            };
            // Кнопки
            var row_edit1 = {
                obj: 'bs_row',
                options: {
                    class: 'mt-1',
                },
                childs: []
            };
            var col_edit1 = {
                obj: 'bs_col',
                options: {
                    size: 'xl',
                    col: 12,
                    class: 'text-left',
                },
                childs: []
            };
            var bt_apply = {
                obj: 'bs_button',
                options: {
                    color: 'primary',
                    size: null,
                    class: null,
                    id: 'apply',
                    label: langView('maincc_label_bt_apply', App.Langs),
                    title: '',
                    icon_left: 'fa-solid fa-pen-to-square',
                    icon_right: null,
                    click: function (event) {
                        event.preventDefault();
                        action_apply();
                    }.bind(this),
                }
            };
            form_edit_row_1.childs.push(form_select_condition_arrival);
            form_edit_row_1.childs.push(form_checkbox_distinguish);
            form_edit_row_2.childs.push(form_input_new_note);

            col_edit1.childs.push(bt_apply);
            row_edit1.childs.push(col_edit1);

            objs_edit.push(form_edit_row_1);
            objs_edit.push(form_edit_row_2);
            objs_edit.push(row_edit1);

            var process = 2;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    LockScreenOff();
                }
            }.bind(this);

            // Инициализируем форму отображающую информацию
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
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(this),
            });
            // Инициализируем форму редактирования
            form_edit.init({
                alert: alert,
                objs: objs_edit,
                mb: 2,
                id: null,
                cl_form: null,
                validation: true,
                fn_validation: null,
                fn_html_init: null,
                fn_init: function (init) {
                    // Инициализация формы закончена
                    // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                    form_edit.create_element(edit_elements, true);
                    // отобразим форму
                    $wagon_edit.empty();
                    $wagon_edit.append(form_edit.$form);
                    close_edit_element();
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(this),
            });

            // Запрос информации от сервера (1 раз в минуту)
            setInterval(function () {
                get_server_info();
            }, 60000);

        }.bind(this));
    });

})(jQuery); // End of use strict