(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_dt_apply = -1 * (60 * 3); // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_dt_apply = 60 * 3; // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vrc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ"',
            'vrc_card_header_on': 'ВЕРНУТЬ НА СТАНЦИЮ',
            'vrc_card_header_from': 'ОТПРАВЛЕННЫЕ СОСТАВЫ',
            'vrc_title_label_station_on': 'Станция отправления:',
            'vrc_title_placeholder_station_on': 'Станция отправления:',
            'vrc_title_label_way_on': 'Путь возврата:',
            'vrc_title_placeholder_way_on': 'Выберите путь',
            'vrc_title_label_locomotive1': 'Локомотив №1:',
            'vrc_title_label_locomotive2': 'Локомотив №2:',
            'vrc_title_placeholder_locomotive': ' № локомотива',
            'vrc_title_time_aplly': 'Время выполнения',
            'vrc_title_placeholder_time_aplly': 'Время выполнения',
            'vrc_title_type_return': 'Отмена операции',
            'vrc_title_form_apply': 'Выполнить?',

            'vrc_title_button_export': 'Экспорт',
            'vrc_title_button_buffer': 'Буфер',
            'vrc_title_button_excel': 'Excel',
            'vrc_title_button_cancel': 'Отменить',
            'vrc_title_button_return': 'Вернуть',
            'vrc_title_button_head': 'Голова',
            'vrc_title_button_tail': 'Хвост',
            'vrc_title_add_ok': 'ВЫПОЛНИТЬ',

            'vrc_mess_error_not_way': 'Выберите путь',
            'vrc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vrc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            'vrc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            'vrc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',
            'vrc_mess_error_not_wagons': 'Не выбраны вагоны для операции возврата или отмены (в окне «ОТПРАВЛЕННЫЕ СОСТАВЫ», выберите станцию, отправленный состав и сформируйте возврат или отмену).',
            'vrc_mess_error_operation_run': 'При выполнении операции «ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ» произошла ошибка, код ошибки:',
            'vrc_mess_cancel_operation_cancel': 'Операция "ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ ВАГОНОВ СОСТАВА" – отменена',
            'vrc_mess_cancel_operation_return': 'Операция "ВОЗРАТ ОТПРАВЛЕННЫХ ВАГОНОВ ИЗ СОСТАВА" – отменена',
            'vrc_mess_run_operation_cancel': 'Выполняю операцию отмены отправки вагонов состава',
            'vrc_mess_run_operation_return': 'Выполняю операцию возврата вагонов из состава',
            'vrc_mess_not_select_way_on': 'Выберите путь для приема вагонов!',

            'vrc_mess_load_operation': 'Загружаю операции...',
            'vrc_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vrc_mess_update_operation': 'Обновляю операции...',
            'vrc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            'vrc_mess_destroy_operation': 'Закрываю форму...',
            'vrc_mess_create_sostav': 'Формирую состав, переношу вагоны...',
            'vrc_mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            'vrc_mess_reverse_head_sostav': 'Формирую состав, реверс голова-хвост',
            'vrc_mess_reverse_sostav': 'Формирую состав, реверс вагонов...',
        },
        'en':  //default language: English
        {
            'vrc_card_header_panel': 'PERFORM THE OPERATION "RETURN OR CANCEL SEND OPERATION"',
            'vrc_card_header_on': 'RETURN TO STATION',
            'vrc_card_header_from': 'SHIPPED CONSTRUCTIONS',
            'vrc_title_label_station_on': 'Departure station:',
            'vrc_title_placeholder_station_on': 'Departure station:',
            'vrc_title_label_way_on': 'Return path:',
            'vrc_title_placeholder_way_on': 'Select path',
            'vrc_title_label_locomotive1': 'Locomotive # 1:',
            'vrc_title_label_locomotive2': 'Locomotive # 2:',
            'vrc_title_placeholder_locomotive': 'Locomotive #',
            'vrc_title_time_aplly': 'Runtime',
            'vrc_title_placeholder_time_aplly': 'Execution time',
            'vrc_title_type_return': 'Cancel operation',
            'vrc_title_form_apply': 'Run?',

            'vrc_title_button_export': 'Export',
            'vrc_title_button_buffer': 'Buffer',
            'vrc_title_button_excel': 'Excel',
            'vrc_title_button_cancel': 'Cancel',
            'vrc_title_button_return': 'Return',
            'vrc_title_button_head': 'Head',
            'vrc_title_button_tail': 'Tail',
            'vrc_title_add_ok': 'EXECUTE',

            'vrc_mess_error_not_way': 'Please select a path',
            'vrc_mess_error_equal_locomotive': 'Locomotive # 1 and # 2 are equal',
            'vrc_mess_error_not_locomotive': 'There is no locomotive # in the IDS directory',
            'vrc_mess_error_min_time_aplly': 'The date of the operation cannot be less than the current date, min. deviation (min) = ',
            'vrc_mess_error_max_time_aplly': 'The date of the operation cannot be greater than the current date, mac. deviation (min) = ',
            'vrc_mess_error_not_wagons': 'No wagons selected for the return or cancellation operation (in the SENDED CONVERSIONS window, select the station, the sent train and form a return or cancellation).',
            'vrc_mess_error_operation_run': 'An error occurred while performing the "RETURN OR CANCEL SEND OPERATION" operation, error code:',
            'vrc_mess_cancel_operation_cancel': 'The operation "CANCELING OPERATION OF SENDING STRAIGHT CARS" - canceled',
            'vrc_mess_cancel_operation_return': 'Operation "RETURN OF DEPARTED CARS FROM STAFF" - canceled',
            'vrc_mess_run_operation_cancel': 'I am performing the operation of canceling the dispatch of wagons of the train',
            'vrc_mess_run_operation_return': 'I am performing the operation of returning wagons from the train',
            'vrc_mess_not_select_way_on': 'Select a track to receive wagons!',

            'vrc_mess_load_operation': 'Loading operations ...',
            'vrc_mess_load_wagons': 'Loading wagons on the way ...',
            'vrc_mess_update_operation': 'Updating operations ...',
            'vrc_mess_init_panel': 'Initializing a module ...',
            'vrc_mess_destroy_operation': 'Closing the form ...',
            'vrc_mess_create_sostav': 'Forming train, moving wagons ...',
            'vrc_mess_clear_sostav': 'Forming a train, removing selected wagons ...',
            'vrc_mess_reverse_head_sostav': 'Form composition, reverse head-tail',
            'vrc_mess_reverse_sostav': 'Forming the train, the reverse of the wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var wsd = App.ids_wsd;
    var directory = App.ids_directory;
    // Модуль инициализаии компонентов формы
    var MCF = App.modal_confirm_form; // Создать модальную форму "Окно сообщений"
    var FC = App.form_control;
    var FIF = App.form_infield;

    var TSOW = App.table_sostav_outer_way; // Модуль составы на подходах
    var TCOW = App.table_cars_outer_way; // Модуль составы на подходах
    var TCWay = App.table_cars_way;         // Модуль вагоны на путях
    var alert = App.alert_form;

    // создадим основу формы
    function div_panel(base) {
        var row = new base.fc_ui.el_row();
        var col = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', '', '', langView('vrc_card_header_panel', App.Langs));
        var row_on = new base.fc_ui.el_row();
        var col_on = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_on = new base.fc_ui.el_card('border-primary', 'text-left', 'p-2', langView('vrc_card_header_on', App.Langs));
        var row_from = new base.fc_ui.el_row();
        var col_from = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_from = new base.fc_ui.el_card('border-primary', 'text-left', 'p-2', langView('vrc_card_header_from', App.Langs));

        var fieldset_on_setup = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);
        this.$setup_on = fieldset_on_setup.$fieldset;
        var fieldset_on_table = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);//langView('vrc_fieldset_on_table_title', App.Langs)
        this.$table_on = fieldset_on_table.$fieldset;

        var fieldset_from_setup = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);
        this.$setup_from = fieldset_from_setup.$fieldset;
        var fieldset_from_table = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);//langView('vrc_fieldset_on_table_title', App.Langs)
        this.$table_from = fieldset_from_table.$fieldset;

        var row_on_body = new base.fc_ui.el_row();
        var col_on_setup = new base.fc_ui.el_col('xl', 3, 'mb-1 mt-1');
        var col_on_table = new base.fc_ui.el_col('xl', 9, 'mb-1 mt-1');
        row_on_body.$row.append(col_on_setup.$col.append(this.$setup_on)).append(col_on_table.$col.append(this.$table_on));

        var row_from_body = new base.fc_ui.el_row();
        var col_from_setup = new base.fc_ui.el_col('xl', 2, 'mb-1 mt-1');
        var col_from_table = new base.fc_ui.el_col('xl', 10, 'mb-1 mt-1');
        row_from_body.$row.append(col_from_setup.$col.append(this.$setup_from)).append(col_from_table.$col.append(this.$table_from));

        var alert_on = new base.fc_ui.el_alert('on');
        var alert_from = new base.fc_ui.el_alert('from');

        this.$alert_on = alert_on.$alert;
        this.$alert_from = alert_from.$alert;

        card_on.$body.append(this.$alert_on).append(row_on_body.$row)
        card_from.$body.append(this.$alert_from).append(row_from_body.$row);

        row_on.$row.append(col_on.$col.append(card_on.$card));
        row_from.$row.append(col_from.$col.append(card_from.$card));

        card_panel.$body.append(row_on.$row).append(row_from.$row);
        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };
    // ассинхроная функция (нумерации вагонов)
    var wagons_enumerate_async = function (row, field, position, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback(position);
            }
            return 0;
        }
        function EnumerateWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i][field] = position;
                    position++;
                    EnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback(position);
                } else return 0;
            }
        }
        EnumerateWagonsAsync.call(this, 0);
    }.bind(this);
    // ассинхроная функция (Реверса нумерации вагонов)
    var wagons_reverse_enumerate_async = function (callback) {
        var row = this.wagons.filter(function (i) {
            return i.id_wim_arrival !== null;
        })
        if (row && row.length > 0) {
            row = row.sort(function (a, b) {
                return a.position_new - b.position_new;
            });
        };
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            } else return 0;
        } else {
            var position = row[row.length - 1].position_new;
        };
        //row = row.sort(function (a, b) { return a[field] - b[field]; });
        function ReverseEnumerateWagonsAsync(i) {
            if (len > 0) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i].position_new = position;
                    position--;
                    len--;
                    ReverseEnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        ReverseEnumerateWagonsAsync.call(this, 0);
    };

    // ассинхроная функция (Убрать вагоны)
    var wagons_del_async = function (row, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            };
            return 0;
        }
        function DelWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    // Найти и удалить с пути приема
                    var wagon = this.wagons.find(
                        function (o) { return o.wim_id === row[i].wim_id });
                    if (wagon !== null) {
                        // Удалить
                        var index = this.wagons.indexOf(wagon);
                        this.wagons.splice(index, 1);
                    };
                    // Пометим вагон в составе перегона
                    var wagon_sostav = this.wagons_sostav.find(
                        function (o) { return o.from_id_wim === row[i].wim_id });
                    if (wagon_sostav !== null) {
                        wagon_sostav.id_way_arrival = null;
                    }
                    DelWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        DelWagonsAsync.call(this, 0);
    };
    // ассинхроная функция (Добавить вагоны на путь прибытия)
    var wagons_add_async = function (row, position, callback) {
        var len = row.length;
        this.position = position;

        function AddWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    // Создадим строку вагон на пути
                    var new_car_way = {
                        position_new: this.position,
                        id_wim_arrival: row[i].from_id_wim,
                        arrival_cargo_group_name_en: row[i].arrival_cargo_group_name_en,
                        arrival_cargo_group_name_ru: row[i].arrival_cargo_group_name_ru,
                        arrival_cargo_name_en: row[i].arrival_cargo_name_en,
                        arrival_cargo_name_ru: row[i].arrival_cargo_name_ru,
                        arrival_commercial_condition_en: null,
                        arrival_commercial_condition_ru: null,
                        arrival_composition_index: null,
                        arrival_condition_abbr_en: row[i].arrival_condition_abbr_en,
                        arrival_condition_abbr_ru: row[i].arrival_condition_abbr_ru,
                        arrival_condition_name_en: row[i].arrival_condition_name_en,
                        arrival_condition_name_ru: row[i].arrival_condition_name_ru,
                        arrival_condition_red: row[i].arrival_condition_red,
                        arrival_date_adoption: null,
                        arrival_division_amkr_abbr_en: row[i].arrival_division_amkr_abbr_en,
                        arrival_division_amkr_abbr_ru: row[i].arrival_division_amkr_abbr_ru,
                        arrival_division_amkr_code: row[i].arrival_division_amkr_code,
                        arrival_division_amkr_name_en: row[i].arrival_division_amkr_name_en,
                        arrival_division_amkr_name_ru: row[i].arrival_division_amkr_name_ru,
                        arrival_duration: null,
                        arrival_id_commercial_condition: null,
                        arrival_id_sertification_data: row[i].arrival_id_sertification_data,
                        arrival_idle_time: null,
                        arrival_nom_doc: row[i].arrival_nom_doc,
                        arrival_nom_main_doc: row[i].arrival_nom_main_doc,
                        arrival_sertification_data_en: row[i].arrival_sertification_data_en,
                        arrival_sertification_data_ru: row[i].arrival_sertification_data_ru,
                        arrival_shipper_code: null,
                        arrival_shipper_name_en: null,
                        arrival_shipper_name_ru: null,
                        arrival_station_amkr_abbr_en: null,
                        arrival_station_amkr_abbr_ru: null,
                        arrival_station_amkr_name_en: null,
                        arrival_station_amkr_name_ru: null,
                        arrival_station_from_code: null,
                        arrival_station_from_name_en: null,
                        arrival_station_from_name_ru: null,
                        arrival_usage_fee: null,
                        current_condition_abbr_en: row[i].from_operation_condition_abbr_en,
                        current_condition_abbr_ru: row[i].from_operation_condition_abbr_ru,
                        current_condition_name_en: row[i].from_operation_condition_name_en,
                        current_condition_name_ru: row[i].from_operation_condition_name_ru,
                        current_condition_red: null,
                        current_id_loading_status: row[i].from_operation_id_loading_status,
                        current_id_operation: row[i].from_id_operation,
                        current_loading_status_en: row[i].from_operation_loading_status_en,
                        current_loading_status_ru: row[i].from_operation_loading_status_ru,
                        current_operation_end: row[i].from_operation_end,
                        current_operation_name_en: row[i].from_operation_name_en,
                        current_operation_name_ru: row[i].from_operation_name_ru,
                        current_operation_start: row[i].from_operation_start,
                        current_station_duration: null,
                        current_station_idle_time: null,
                        current_wagon_busy: row[i].from_busy,
                        current_way_duration: null,
                        diff_vesg: null,
                        doc_outgoing_car: row[i].doc_outgoing_car,
                        id_limiting_loading: row[i].id_limiting_loading,
                        id_operator: row[i].id_operator,
                        id_owner_wagon: null,
                        instructional_letters_datetime: null,
                        instructional_letters_note: null,
                        instructional_letters_num: null,
                        instructional_letters_station_code: null,
                        instructional_letters_station_name: null,
                        limiting_abbr_en: row[i].limiting_abbr_en,
                        limiting_abbr_ru: row[i].limiting_abbr_ru,
                        limiting_name_en: row[i].limiting_name_en,
                        limiting_name_ru: row[i].limiting_name_ru,
                        num: row[i].num,
                        operator_abbr_en: row[i].operator_abbr_en,
                        operator_abbr_ru: row[i].operator_abbr_ru,
                        operator_color: null,
                        operator_monitoring_idle_time: null,
                        operator_paid: null,
                        operator_rent_end: null,
                        operator_rent_start: null,
                        operators_en: row[i].operators_en,
                        operators_ru: row[i].operators_ru,
                        outgoing_date: null,
                        outgoing_id_return: null,
                        outgoing_return_cause_en: null,
                        outgoing_return_cause_ru: null,
                        outgoing_sostav_status: null,
                        owner_wagon_abbr_en: null,
                        owner_wagon_abbr_ru: null,
                        owner_wagon_en: null,
                        owner_wagon_ru: null,
                        position: null,
                        sap_incoming_supply_cargo_code: null,
                        sap_incoming_supply_cargo_name: null,
                        sap_incoming_supply_date: null,
                        sap_incoming_supply_num: null,
                        sap_incoming_supply_pos: null,
                        sap_incoming_supply_time: null,
                        sap_incoming_supply_warehouse_code: null,
                        sap_incoming_supply_warehouse_name: null,
                        wagon_adm: row[i].wagon_adm,
                        wagon_adm_abbr_en: row[i].wagon_adm_abbr_en,
                        wagon_adm_abbr_ru: row[i].wagon_adm_abbr_ru,
                        wagon_adm_name_en: row[i].wagon_adm_name_en,
                        wagon_adm_name_ru: row[i].wagon_adm_name_ru,
                        wagon_ban_uz: null,
                        wagon_brutto_amkr: null,
                        wagon_brutto_doc: null,
                        wagon_closed_route: null,
                        wagon_date_rem_uz: null,
                        wagon_gruzp_doc: null,
                        wagon_gruzp_uz: null,
                        wagon_rod: row[i].wagon_rod,
                        wagon_rod_abbr_en: row[i].wagon_rod_abbr_en,
                        wagon_rod_abbr_ru: row[i].wagon_rod_abbr_ru,
                        wagon_rod_name_en: row[i].wagon_rod_name_en,
                        wagon_rod_name_ru: row[i].wagon_rod_name_ru,
                        wagon_tara_arc_doc: null,
                        wagon_tara_doc: null,
                        wagon_tara_uz: null,
                        wagon_type_en: null,
                        wagon_type_ru: null,
                        wagon_vesg_amkr: null,
                        wagon_vesg_doc: null,
                        wim_id: row[i].from_id_wim,
                        wio_id: 0,
                        wir_id: row[i].id_wir,
                    };
                    this.wagons.push(new_car_way);
                    this.position++;
                    // Пометим вагон в составе перегона
                    var wagon_sostav = this.wagons_sostav.find(
                        function (o) { return o.from_id_wim === row[i].from_id_wim });
                    if (wagon_sostav !== null) {
                        wagon_sostav.id_way_arrival = this.id_way;
                    }
                    AddWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback(this.position);
                } else return 0;
            }
        };
        // получим вагоны на пути существующие
        var row_old = this.wagons.filter(function (i) {
            return i.id_wim_arrival === null;
        }).sort(function (a, b) {
            return a.position_new - b.position_new;
        });
        // получим вагоны на пути ранее добавленные
        var row_new = this.wagons.filter(function (i) {
            return i.id_wim_arrival !== null;
        }).sort(function (a, b) {
            return a.position_new - b.position_new;
        });
        // выполним добавление
        if (!this.head) {
            // добавим в хвост
            wagons_enumerate_async.call(this, row_old, 'position_new', 1, function (position) {
                this.position = position;
                wagons_enumerate_async.call(this, row_new, 'position_new', position, function (position) {
                    // Если указан вагоны для добавления тогда добавить иначе пропустить
                    if (len === 0) {
                        if (typeof callback === 'function') {
                            callback(this.position);
                        };
                        return 0;
                    } else {
                        this.position = position;
                        AddWagonsAsync.call(this, 0);
                    }
                }.bind(this))
            }.bind(this))
        } else {
            // добавим в голову
            wagons_enumerate_async.call(this, row_new, 'position_new', 1, function (position) {
                this.position = position;
                wagons_enumerate_async.call(this, row_old, 'position_new', position + len, function (position) {
                    // Если указан вагоны для добавления тогда добавить иначе пропустить
                    if (len === 0) {
                        if (typeof callback === 'function') {
                            callback(this.position);
                        };
                        return 0;
                    } else {
                        AddWagonsAsync.call(this, 0);
                    }
                }.bind(this));
            }.bind(this));
        }
    };

    function view_return_cars(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fc_ui = new FC();
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_return_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация модуля
    view_return_cars.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        // теперь выполним инициализацию, определим основные свойства

        // Создать модальную форму "Окно сообщений"
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            ids_wsd: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();

        this.id_station = -1;   // По умолчанию не выбрана
        this.from_id_way = -1;  // По умолчанию не выбрана
        this.id_way = -1;       // По умолчанию не выбрана
        this.list_station = []; // По умолчанию пустой список
        this.list_way = [];     // По умолчанию пустой список

        this.id_outer_way = -1;   // id перегона
        this.station_from = null; // Станция отправления

        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        this.wagons = [];       // Список вагонов на пути (рабочий)
        this.num_sostav = null; // Номер выбранного состава
        this.wagons_sostav = [];// Список вагонов выбранного состава (рабочий)

        // Сообщение
        LockScreen(langView('vrc_mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty();
        this.$setup_on = panelElement.$setup_on;
        this.$setup_from = panelElement.$setup_from;
        this.$table_on = panelElement.$table_on;
        this.$table_from = panelElement.$table_from;

        this.alert_on = new alert(panelElement.$alert_on);
        this.alert_from = new alert(panelElement.$alert_from);

        this.$panel.append(panelElement.$element);

        // Создадим и добавим макет таблицы

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station', 'ways', 'outer_ways', 'locomotive'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            // Список локомотивов
            this.list_locomotive = this.ids_dir.getListLocomotive('locomotive', 'locomotive', function (i) { return i.id_locomotive_status === 1; });
            //--------------------ФОРМА FROM ---------------------------
            // Создадим форму выбора пути отправки (this.$setup_from)
            this.form_setup_from = new FIF();
            var fl_station = {
                field: 'id_station',
                type: 'int',
                add: null,
                edit: 'select',
                name: 'station',
                prefix: 'sm', //'sm','','lg'
                label: langView('vrc_title_label_station_on', App.Langs),
                placeholder: langView('vrc_title_placeholder_station_on', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.list_station,
                select: function (e, ui) {
                    e.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    this.update_sostav_outer_ways_and_way_of_station(id, -1, null); // Обновим составы в прибытии и пути по выбранной станции

                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 1,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fields = [];
            fields.push(fl_station);
            //// Инициализация формы
            this.form_setup_from.init({
                alert: this.alert_from,
                mode: 'edit', // Указали что будем использовать форму типа edit
                fields: fields,
                mb: 2,
                id: null,
                cl_form: '',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                    }
                }.bind(this),
            });
            // 
            // Отображение формы
            this.$setup_from.append(this.form_setup_from.$form_edit);
            var sel_sostav_from = 'table-sfrom-' + this.selector;
            var sel_wagon_from = 'table-wfrom-' + this.selector;
            // Создадим таблицу вангонов на пути отправки
            var $div_table_sfrom = $('<div></div>', {
                'id': sel_sostav_from,
            });
            // Создадим таблицу вангонов на пути отправки
            var $div_table_wfrom = $('<div></div>', {
                'id': sel_wagon_from,
            });
            //------- FROM SOSTAV -----------------------------------
            if ($div_table_sfrom && $div_table_sfrom.length > 0) {
                this.$table_from.append($div_table_sfrom);
                this.tab_sostav_from = new TSOW('div#' + sel_sostav_from); // Создадим экземпляр составы на подходах
                this.tab_sostav_from.init({
                    alert: this.alert_from,
                    type_report: 'arrival-sostav-outer-way',  // Прибвыающие составы на внешнем пути
                    ids_wsd: this.ids_wsd,
                    fn_select_sostav: function (row) {
                        this.id_outer_way = null;   // id перегона
                        this.station_from = null; // Станция отправления
                        // получим строку состава
                        if (row && row.length > 0) {
                            this.id_outer_way = row[0].id_outer_way;    // id перегона
                            this.from_id_way = row[0].from_id_way;      // id пути отправки (изменяется при выборе состава)
                            this.id_way = row[0].from_id_way;           // id пути отправки (используется для выбора в ручную берется для работы)
                            this.station_from = row[0]['from_station_abbr_' + App.Lang]; // Станция отправления
                            // Установим путь
                            this.form_setup_on.set('id_way', this.id_way);
                            // Загрузим вагоны на пути приема
                            //this.load_wagons_of_way(this.id_way, function () {

                            //}.bind(this));
                            // обновим вагоны по выбранному сотаву
                            this.load_wagons_of_sostav(row[0].outer_way_num_sostav);
                        };
                    }.bind(this),
                }, function () {

                });
            };
            //------- FROM WAGON -----------------------------------
            if ($div_table_wfrom && $div_table_wfrom.length > 0) {
                this.$table_from.append($div_table_wfrom);
                this.tab_wagon_from = new TCOW('div#' + sel_wagon_from); // Создадим экземпляр составы на подходах
                this.tab_wagon_from.init({
                    alert: this.alert_from,
                    type_report: 'arrival-wagons-outer-way',  // Прибвыающие составы на внешнем пути
                    ids_wsd: this.ids_wsd,
                    // инициализируем кнопки
                    buttons: [
                        {
                            name: 'add_wagons_send',
                            action: function (e, dt, node, config) {
                                if (this.id_way >= 0) {
                                    LockScreen(langView('vrc_mess_create_sostav', App.Langs));
                                    // Выполнить операцию добавить вагоны
                                    wagons_add_async.call(this, this.tab_wagon_from.select_rows_wagons, 1, function (position) {
                                        this.tab_wagon_from.select_rows_wagons = null;
                                        this.view_wagons();
                                    }.bind(this));
                                } else {
                                    this.form_setup_from.out_warning(langView('vrc_mess_not_select_way_on', App.Langs));
                                }

                            }.bind(this)
                        },
                    ],
                    fn_change_data: function (wagons) {
                        //this.wagons = wagons;
                        //this.tab_cars_on.view(this.wagons.filter(function (i) { return i.position_new !== null; }), null);
                    }.bind(this),
                }, function () {

                });
            };
            //--------------------ФОРМА ON ---------------------------
            // Создадим форму выбора пути прибытия (this.$setup_on)
            this.form_setup_on = new FIF();
            var fl_way_on = {
                field: 'id_way',
                type: 'int',
                add: 'select',
                edit: null,
                name: 'way',
                prefix: 'sm',
                label: langView('vrc_title_label_way_on', App.Langs),
                placeholder: langView('vrc_title_placeholder_way_on', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.get_list_way(-1),
                select: function (e, ui) {
                    e.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    this.load_wagons_of_way(id);
                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 3,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_locomotive1 = {
                field: 'locomotive1',
                type: 'string',
                add: 'autocomplete',
                edit: null,
                name: 'locomotive1',
                prefix: 'sm',
                label: langView('vrc_title_label_locomotive1', App.Langs),
                placeholder: langView('vrc_title_placeholder_locomotive', App.Langs),
                maxlength: 20,
                required: true,
                control: null,
                list: this.list_locomotive,
                select: null,
                //select: function (e, ui) {
                //    event.preventDefault();
                //    // Обработать выбор
                //    var id = Number($(e.currentTarget).val());
                //    //view_wagons_from_way(id);
                //}.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 4,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_locomotive2 = {
                field: 'locomotive2',
                type: 'string',
                add: 'autocomplete',
                edit: null,
                name: 'locomotive2',
                prefix: 'sm',
                label: langView('vrc_title_label_locomotive2', App.Langs),
                placeholder: langView('vrc_title_placeholder_locomotive', App.Langs),
                maxlength: 20,
                required: false,
                control: null,
                list: this.list_locomotive,
                select: null,
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 4,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_time_aplly = {
                field: 'time_aplly',
                type: 'datetime',
                add: 'datetime',
                edit: null,
                name: 'time_aplly',
                prefix: 'sm',
                label: langView('vrc_title_time_aplly', App.Langs),
                placeholder: langView('vrc_title_placeholder_time_aplly', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: function (datetime) {

                },
                change: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 5,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_type_return = {
                field: 'type_return',
                type: 'boolean',
                add: 'checkbox',
                edit: null,
                name: 'type_return',
                prefix: 'sm',
                label: langView('vrc_title_type_return', App.Langs),
                placeholder: null,
                maxlength: null,
                required: false,
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                change: function (event) {
                    event.preventDefault();
                    var type = $(event.currentTarget).prop('checked');
                    this.form_setup_on.enable('id_way', !type);
                    this.form_setup_on.enable('locomotive1', !type);
                    this.form_setup_on.enable('locomotive2', !type);
                    this.form_setup_on.enable('time_aplly', !type);
                    if (type) {
                        // ! так как это отмена, проверим если выбор пути не совподает с путем отправки состава тогда все пути приведем в соответсвие!
                        if (this.from_id_way !== this.id_way) {
                            this.id_way = this.from_id_way;
                            this.load_wagons_of_sostav(this.num_sostav);
                        }
                        this.form_setup_on.set('id_way', this.id_way);
                    }
                }.bind(this),
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 2,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fields_on = [];
            fields_on.push(fl_way_on);
            fields_on.push(fl_locomotive1);
            fields_on.push(fl_locomotive2);
            fields_on.push(fl_time_aplly);
            fields_on.push(fl_type_return);
            //// Инициализация формы
            this.form_setup_on.init({
                alert: this.alert_on,
                mode: 'add', // Указали что будем использовать форму типа add
                fields: fields_on,
                mb: 2,
                id: null,
                cl_form: '',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        var message = null;
                        if (valid) {
                            var wagons = this.wagons.filter(function (i) { return i.position_new !== null && i.id_wim_arrival !== null; });// получить вагоны
                            if (result.new.type_return) {
                                // Отмена
                                message = 'Выполнить операцию "ОТМЕНА ОТПРАВКИ ВАГОНОВ СОСТАВА" в количестве: ' + (wagons ? wagons.length : 0) + ' (ваг.), станция отправки: ' + this.station_from + '?. В отчетах будет отраженно что операция была выполнена ошибочно, вагоны будут возвращены на путь отправки!';
                            } else {
                                // Возрат
                                message = 'Выполнить операцию "ВОЗРАТ ВАГОНОВ ОТПРАВЛЕННОГО СОСТАВА" в количестве: ' + (wagons ? wagons.length : 0) + ' (ваг.), станция отправки: ' + this.station_from + '?. Будет выполнен возврат вагонов с перегона на указанный путь станции отправления. В отчетах будет зафиксировано возврат с перегона!';
                            }
                            this.modal_confirm_form.view(langView('vrc_title_form_apply', App.Langs), message, function (res) {
                                if (res) {
                                    // Проверим наличие вагонов 
                                    var list_wagons = [];
                                    if (wagons && wagons.length > 0) {
                                        // Получим перечень вагонов и новую позицию
                                        $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                                            list_wagons.push({ wir_id: el.wir_id, position: el.position_new })
                                        }.bind(this));
                                        // Сформируем операцию
                                        var operation = {
                                            id_outer_way: this.id_outer_way,
                                            wagons: list_wagons,
                                            id_way_on: result.new.id_way,
                                            head: this.head,
                                            lead_time: result.new.time_aplly,
                                            locomotive1: result.new.locomotive1,
                                            locomotive2: result.new.locomotive2,
                                            type_return: result.new.type_return,
                                            user: App.User_Name
                                        };
                                        this.apply(operation);
                                    }
                                } else {
                                    // Отмена
                                    this.form_setup_on.out_warning(langView((result.new.type_return ? 'vrc_mess_cancel_operation_cancel' : 'vrc_mess_cancel_operation_return'), App.Langs));
                                }
                            }.bind(this));
                        }
                    }
                }.bind(this),
                button_add_ok: {
                    title: langView('vrc_title_add_ok', App.Langs),
                    click: function (event) {
                        event.preventDefault();
                        this.form_setup_on.$form_add.submit();
                    }.bind(this),
                },
            });
            // Отображение формы
            this.$setup_on.append(this.form_setup_on.$form_add);

            // Создадим таблицу вангонов собранных для отправки
            var $div_table_on = $('<div></div>', {
                'id': 'table-on-' + this.selector,
            });
            if ($div_table_on && $div_table_on.length > 0) {
                this.$table_on.append($div_table_on);
                this.tab_cars_on = new TCWay('div#table-on-' + this.selector);
                this.tab_cars_on.init({
                    type_report: 3,
                    alert: this.alert_on,
                    // инициализируем кнопки
                    buttons: [
                        {
                            name: 'del_wagons_send',
                            action: function (e, dt, node, config) {
                                LockScreen(langView('vrc_mess_clear_sostav', App.Langs));
                                var base = this;
                                // Убрать вагоны
                                wagons_del_async.call(this, this.tab_cars_on.select_rows_wagons, function () {
                                    // Авто нумерация
                                    // Выполнить операцию перенумеровать (добавить 0 - вагонов)
                                    wagons_add_async.call(base, [], 1, function (position) {
                                        this.tab_cars_on.select_rows_wagons = null;
                                        this.view_wagons();
                                    }.bind(base));
                                });
                            }.bind(this),
                        },
                        {
                            name: 'head_tail',
                            action: function (e, dt, node, config) {
                                LockScreen(langView('vrc_mess_reverse_head_sostav', App.Langs));
                                this.head = !this.head;
                                // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
                                wagons_add_async.call(this, [], 1, function (position) {
                                    this.view_wagons();
                                }.bind(this));
                            }.bind(this),
                        },
                        {
                            name: 'reverse_num_wagon',
                            action: function (e, dt, node, config) {
                                LockScreen(langView('vrc_mess_reverse_sostav', App.Langs));
                                wagons_reverse_enumerate_async.call(this, function () {
                                    // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
                                    wagons_add_async.call(this, [], 1, function (position) {
                                        this.view_wagons();
                                    }.bind(this));
                                }.bind(this));
                            }.bind(this),
                        },
                    ],
                    fn_change_data: function (wagons) {

                    }.bind(this),
                }, function () {

                });
            };

            //----------------------------------
            if (typeof fn_init_ok === 'function') {
                fn_init_ok(this.result_init);
            }
            //----------------------------------
        }.bind(this));
    };
    // Показать данные 
    view_return_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        LockScreen(langView('vrc_mess_load_operation', App.Langs));
        this.id_station = -1;
        this.id_way = -1;
        if (id_way) {
            var way = this.ids_dir.getWays_Of_ID(id_way);
            if (way) {
                this.id_station = way.id_station;
                // Отобразим выбор на панеле
                this.form_setup_from.view_edit({ id_station: this.id_station });
                this.id_way = id_way;
            }
        };
        this.update_sostav_outer_ways_and_way_of_station(this.id_station, this.id_way, this.num_sostav);
    };
    // Получить список путей станции
    view_return_cars.prototype.get_list_way = function (id_station) {
        this.id_station = id_station;
        var ways = [];
        var list_way = this.ids_dir.list_ways.filter(function (i) {
            return i.id_station == id_station && !i.way_delete;
        }.bind(this))
        if (list_way) {
            ways = this.ids_dir.getListObj2(list_way, 'id', 'way_num', 'way_name', App.Lang, null);
        }
        return ways
    };
    // Обновить составы на перегонах станции прибытия и пути станции прибытия
    view_return_cars.prototype.update_sostav_outer_ways_and_way_of_station = function (id_station, id_way, num_sostav, cb_update) {
        this.id_station = id_station;
        this.id_way = id_way;
        this.num_sostav = num_sostav;
        // сбросим выбранные вагоны на пути и состав
        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        this.wagons = [];       // Список вагонов на пути (рабочий)
        this.wagons_sostav = [];// Список вагонов выбранного состава (рабочий)
        this.id_outer_way = null;   // id перегона
        this.station_from = null; // Станция отправления
        // Обновить пути станции прибытия
        this.form_setup_on.update_list_element('id_way', this.get_list_way(this.id_station), id_way);
        // Загрузим вагоны на пути приема
        this.load_wagons_of_way(id_way, function () {
            // Обновить составы на перегонах станции прибытия
            this.tab_sostav_from.load_ow_arr_sostav_of_station_from(this.id_station, function () {
                this.tab_sostav_from.select_sostav(this.num_sostav);
                // Отложеный вызов - обновили данные
                if (typeof cb_update === 'function') {
                    cb_update();
                }
            }.bind(this));
        }.bind(this));

    };
    // Показать текущую ситуацию по вагонам на пути приема и состава ()
    view_return_cars.prototype.view_wagons = function () {
        this.form_setup_on.clear_all();
        // Показать вагоны на пути приема
        this.tab_cars_on.view(this.wagons, null);
        if (this.head) {
            this.tab_cars_on.obj_t_cars.button(5).text(langView('vrc_title_button_head', App.Langs));
        } else {
            this.tab_cars_on.obj_t_cars.button(5).text(langView('vrc_title_button_tail', App.Langs));
        }
        // Показать вагоны выбранного состава без учета уже перенесенных в состав  
        this.tab_wagon_from.view(this.wagons_sostav.filter(function (i) { return i.id_way_arrival === null; }), null);
    };
    // Сбросить выбор вагонов состава 
    view_return_cars.prototype.clear_wagons_of_sostav = function () {
        if (this.wagons_sostav) {
            $.each(this.wagons_sostav, function (i, el) {
                el['id_way_arrival'] = null;
            });
        };
    };
    // Загрузить вагоны по выбранному составу
    view_return_cars.prototype.load_wagons_of_sostav = function (num_sostav) {
        this.num_sostav = num_sostav;
        //clear_wagons_of_way();
        // сбросить выбранный путь!
        this.load_of_way(this.id_way, function () {
            // Получим вагоны по составу
            this.load_of_sostav(num_sostav, function (wagons) {
                this.view_wagons(wagons);
            }.bind(this))
        }.bind(this));
    };
    // Загрузить вагоны выбранного состава на перегоне
    view_return_cars.prototype.load_of_sostav = function (num_sostav, fn_load_data) {
        if (num_sostav !== null && num_sostav !== '') {
            LockScreen(langView('vrc_mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfSostavOuterWay(num_sostav, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['id_way_arrival'] = null;
                    });
                }
                this.wagons_sostav = wagons;
                // Событие обновили данные
                LockScreenOff();
                if (typeof fn_load_data === 'function') {
                    fn_load_data(this.wagons_sostav);
                }
            }.bind(this));
        } else {
            this.wagons_sostav = [];
            // Событие обновили данные
            if (typeof fn_load_data === 'function') {
                fn_load_data(this.wagons_sostav);
            }
        }

    };
    //// Сбросить (вернуть к текущему состоянию вагоны на пути приема)
    //view_return_cars.prototype.clear_wagons_of_way = function () {
    //    if (this.wagons) {
    //        var del_wag = [];
    //        $.each(this.wagons, function (i, el) {
    //            if (el.id_wim_arrival !== null) {
    //                // Построить перечень для удаления
    //                var index = this.wagons.indexOf(el);
    //                del_wag.push(index);
    //            } else {
    //                el.id_wim_arrival = null;
    //                el.position_new = el.position;
    //            }
    //        }.bind(this));
    //        // Удалить перечень
    //        $.each(del_wag.sort(function (a, b) {
    //            return a - b;
    //        }), function (i, el) {
    //            this.wagons.splice(el, 1);
    //        }.bind(this));
    //    };
    //};
    // загрузим вагоны на пути приема и отобразим
    view_return_cars.prototype.load_wagons_of_way = function (id_way, cb_load) {
        this.id_way = id_way;
        // сбросить выбранный состав!
        this.clear_wagons_of_sostav();
        // Загрузим вагоны на пути приема
        this.load_of_way(id_way, function (wagons) {
            this.view_wagons();
            // Отложеный вызов - загрузка данных
            if (typeof cb_load === 'function') {
                cb_load(wagons);
            }
        }.bind(this))

    };
    // Загрузить вагоны на пути в внутрений массив
    view_return_cars.prototype.load_of_way = function (id_way, fn_load_data) {
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('vrc_mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = el.position;
                        el['id_wim_arrival'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                LockScreenOff();
                if (typeof fn_load_data === 'function') {
                    fn_load_data(this.wagons);
                }
            }.bind(this));
        } else {
            this.wagons = [];
            // Событие обновили данные
            if (typeof fn_load_data === 'function') {
                fn_load_data(this.wagons);
            }
        }

    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_return_cars.prototype.validation = function (result) {
        var valid = true;
        // Проверим если возврат тогда проверяем время и локомотивы
        if (!result.new.type_return) {
            // Проверим локомотивы
            var loc1 = this.form_setup_on.get_element('locomotive1');
            var loc2 = this.form_setup_on.get_element('locomotive2');
            if (loc1 === loc2) {
                this.form_setup_on.set_object_error('locomotive1', langView('vrc_mess_error_equal_locomotive', App.Langs));
                this.form_setup_on.set_object_error('locomotive2', langView('vrc_mess_error_equal_locomotive', App.Langs));
                valid = false;
            } else {
                if (result.new && !result.new.locomotive1 && (loc1 !== null || loc1 !== '')) {
                    this.form_setup_on.set_object_error('locomotive1', langView('vrc_mess_error_not_locomotive', App.Langs) + loc1);
                    valid = false;
                }
                if ((loc2 !== null && loc2 !== '') && result.new && result.new.locomotive2 === null) {
                    this.form_setup_on.set_object_error('locomotive2', langView('vrc_mess_error_not_locomotive', App.Langs) + loc2);
                    valid = false;
                }
            }
            // Проверим время
            if (result.new && result.new.time_aplly) {
                var curr = moment();
                var aplly = moment(result.new.time_aplly);
                var minutes = aplly.diff(curr, 'minutes');
                if (minutes < min_dt_apply) {
                    this.form_setup_on.set_object_error('time_aplly', langView('vrc_mess_error_min_time_aplly', App.Langs) + (min_dt_apply * -1));
                    valid = false;
                }
                if (minutes > max_dt_apply) {
                    this.form_setup_on.set_object_error('time_aplly', langView('vrc_mess_error_max_time_aplly', App.Langs) + (max_dt_apply));
                    valid = false;
                }
            }
        } else {
            // Проверить только путь возврата
            if (result.new.id_way === null) {
                this.form_setup_on.set_object_error('id_way', langView('vrc_mess_error_not_way', App.Langs));
                valid = false;
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) { return i.position_new !== null && i.id_wim_arrival !== null; });
        if (wagons === null || wagons.length === 0) {
            this.form_setup_on.out_error(langView('vrc_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_return_cars.prototype.apply = function (data) {
        LockScreen(langView((data.type_return ? 'vrc_mess_run_operation_cancel' : 'vrc_mess_run_operation_return'), App.Langs));
        this.ids_wsd.postReturnWagonsOfStation(data, function (result) {
            if (result && result.result > 0) {
                this.out_clear();
                // Сбросим установки (время и локомотивы)
                this.form_setup_on.set('time_aplly', null);
                this.form_setup_on.set('locomotive1', null);
                this.form_setup_on.set('locomotive2', null);
                // обновить таблицы вагоны на пути приема, составы, вагоны выбранного состава
                this.update_sostav_outer_ways_and_way_of_station(this.id_station, this.id_way, this.num_sostav, function () {
                    this.form_setup_on.out_info('Состав принят, в количестве ' + result.moved + '(ваг.)');
                    if (typeof this.settings.fn_db_update === 'function') {
                        //TODO: можно добавить возвращать перечень для обновления
                        typeof this.settings.fn_db_update();
                    }
                    LockScreenOff();
                }.bind(this));
            } else {
                LockScreenOff();
                this.form_setup_on.out_error(langView('vrc_mess_error_operation_run', App.Langs) + result.result);
                // Выведем ошибки по вагонно.
                $.each(result.listResult, function (i, el) {
                    if (el.result <= 0) this.form_setup_on.out_error('Вагон №' + el.num + ', код ошибки : ' + el.result);
                }.bind(this));
            }
        }.bind(this));
    };

    //--------------------------------------------------------------------------------
    // Показать
    view_return_cars.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    view_return_cars.prototype.hide = function () {
        this.$panel.hide();
    }
    // Очистить сообщения
    view_return_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_return_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_return_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_return_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //--------------------------------------------------------------------------------
    // Очистить объект
    view_return_cars.prototype.destroy = function () {
        LockScreen(langView('vrc_mess_destroy_operation', App.Langs));
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Очистить форму выбора пути отправки
        if (this.form_setup_from) {
            this.form_setup_from.destroy();
            this.form_setup_from = null;
        }
        // Очистить форму выбора куда отправить
        if (this.form_setup_on) {
            this.form_setup_on.destroy();
            this.form_setup_on = null;
        }

        // Уберем модуль (Таблица собранный состав для отправки детально)
        if (this.tab_cars_on) {
            this.tab_cars_on.destroy();
            this.tab_cars_on = null;
        }
        // Уберем модуль (Таблицы составы и вагоны состава детально)
        if (this.tab_sostav_from) {
            this.tab_sostav_from.destroy();
            this.tab_sostav_from = null;
        }
        if (this.tab_wagon_from) {
            this.tab_wagon_from.destroy();
            this.tab_wagon_from = null;
        }
        this.$panel.empty(); // empty in case the columns change
        LockScreenOff();
    };

    App.view_return_cars = view_return_cars;

    window.App = App;
})(window);