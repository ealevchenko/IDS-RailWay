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
            'card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ОТПРАВИТЬ СОСТАВОВ НА СТАНЦИИ АМКР"',
            'card_header_on': 'ОТПРАВИТЬ НА СТАНЦИЮ',
            'card_header_from': 'ОТПРАВИТЬ СО СТАНЦИ',
            'fieldset_on_table_title': 'Сформированный состав',


            'title_label_date': 'ПЕРИОД :',
            'title_label_station': 'СТАНЦИЯ ОТПРАВЛЕНИЯ:',

            'field_id': 'id строки',
            'field_operation_end': 'Отправлен',
            'field_name_outer_way': 'Перегон',
            'field_from_station_name': 'Станция отпр.',
            'field_from_way_name': 'Путь отправл.',
            'field_on_station_name': 'Станция приб.',
            'field_count_wagon_send': 'Отправлено',
            'field_count_wagon_arrival': 'Принято',
            'field_operation_locomotive1': 'Локомотив1',
            'field_operation_locomotive2': 'Локомотив2',
            'operation_create_user': 'Операцию выполнил',
            'field_status': 'Статус',

            'tytle_status_arr': 'Принят',
            'tytle_status_work': 'В работе',
            'tytle_status_send': 'Отправлен',
            'tytle_detali_wagon': 'Вагоны в составе',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_cancel': 'Отменить',
            'title_button_return': 'Вернуть',

            'mess_load_operation': 'Загружаю операции...',
            'mess_update_operation': 'Обновляю операции...',
            'mess_init_panel': 'Выполняю инициализацию модуля ...',
            'mess_destroy_operation': 'Закрываю форму...',
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
    var FIL = App.form_inline;


    // создадим основу формы
    function div_panel(base) {
        var row = new base.fc_ui.el_row();
        var col = new base.fc_ui.el_col('xl', 12);
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', '', '', langView('card_header_panel', App.Langs));
        var row_on  = new base.fc_ui.el_row();
        var col_on  = new base.fc_ui.el_col('xl', 12);
        var card_on = new base.fc_ui.el_card('border-primary', 'text-left', 'p-2', langView('card_header_on', App.Langs));
        var row_from  = new base.fc_ui.el_row();
        var col_from  = new base.fc_ui.el_col('xl', 12);
        var card_from = new base.fc_ui.el_card('border-primary', 'text-left', 'p-2', langView('card_header_from', App.Langs));

        var fieldset_on_setup = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);
        this.setup_on = fieldset_on_setup.$fieldset;
        var fieldset_on_table = new base.fc_ui.el_fieldset('border-primary', 'border-primary', langView('fieldset_on_table_title', App.Langs));
        this.table_on = fieldset_on_table.$fieldset;

        var row_on_body = new base.fc_ui.el_row();
        var col_on_setup = new base.fc_ui.el_col('xl', 3);
        var col_on_table = new base.fc_ui.el_col('xl', 9);
        row_on_body.$row.append(col_on_setup.$col.append(this.setup_on)).append(col_on_table.$col.append(this.table_on));



        card_on.$body.append(row_on_body.$row);

        row_on.$row.append(col_on.$col.append(card_on.$card));
        row_from.$row.append(col_from.$col.append(card_from.$card));

        //var card_operation = new base.fc_ui.el_card('border-primary', null, 'text-dark pl-3 pr-3 table-directory', null);
        //this.$operation_header = card_operation.$header;
        //this.$operation_body = card_operation.$body;

        card_panel.$body.append(row_on.$row).append(row_from.$row);
        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };
    // Перечень полей
    var list_collums = [
        {
            field: 'details_control',
            className: 'details-control  details-control-operation-send',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'operation_end',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.operation_end);
            },
            className: 'dt-body-center',
            title: langView('field_operation_end', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'name_outer_way',
            data: function (row, type, val, meta) {
                return row.id_outer_way ? row['name_outer_way_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_name_outer_way', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'from_station_name',
            data: function (row, type, val, meta) {
                return row.from_id_station ? row['from_station_name_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_from_station_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'from_way_name',
            data: function (row, type, val, meta) {
                return row.from_id_way ? row['from_way_num_' + App.Lang] + '-' + row['from_way_name_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_from_way_name', App.Langs), width: "100px", orderable: true, searchable: true
        },
        {
            field: 'on_station_name',
            data: function (row, type, val, meta) {
                return row.id_station_on ? row['on_station_name_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_on_station_name', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'count_wagon_send',
            data: function (row, type, val, meta) {
                return row.count_wagon_send;
            },
            className: 'dt-body-center',
            title: langView('field_count_wagon_send', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'count_wagon_arrival',
            data: function (row, type, val, meta) {
                return row.count_wagon_arrival;
            },
            className: 'dt-body-center',
            title: langView('field_count_wagon_arrival', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'status',
            data: function (row, type, val, meta) {
                if (row.count_wagon_send === row.count_wagon_arrival) {
                    return langView('tytle_status_arr', App.Langs);
                } else {
                    if (row.count_wagon_send !== row.count_wagon_arrival && row.count_wagon_arrival > 0) {
                        return langView('tytle_status_work', App.Langs);
                    } else {
                        return langView('tytle_status_send', App.Langs);
                    };
                };
            },
            className: 'dt-body-center',
            title: langView('field_status', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'operation_locomotive1',
            data: function (row, type, val, meta) {
                return row.operation_locomotive1;
            },
            className: 'dt-body-center',
            title: langView('field_operation_locomotive1', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'operation_locomotive2',
            data: function (row, type, val, meta) {
                return row.operation_locomotive2;
            },
            className: 'dt-body-center',
            title: langView('field_operation_locomotive2', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'user_create',
            data: function (row, type, val, meta) {
                return row.operation_create ? (row.operation_create_user + '<br />[' + getReplaceTOfDT(row.operation_create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('operation_create_user', App.Langs), width: "100px", orderable: false, searchable: false
        },
    ];
    //
    function view_send_cars(selector) {
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
    // инициализация полей таблицы вагоны на начальном пути
    view_send_cars.prototype.init_columns = function () {
        var collums = [];

        //collums.push('id');
        collums.push('operation_end');
        collums.push('status');
        collums.push('name_outer_way');
        collums.push('from_station_name');
        collums.push('from_way_name');
        collums.push('on_station_name');
        collums.push('count_wagon_send');
        collums.push('count_wagon_arrival');
        collums.push('operation_locomotive1');
        collums.push('operation_locomotive2');
        collums.push('user_create');
        return init_columns(collums, list_collums);
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_send_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация модуля
    view_send_cars.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            ids_wsd: null,
            fn_db_update: function (list) {
                //this.load_db(list, true, function (result) {
                //    this.update_element(result)
                //}.bind(this));
            }.bind(this),
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();

        this.id_station = -1; // По умолчанию не выбрана
        // список операций
        this.operation = null;
        // Выбраная строка
        this.select_row_sostav = null;
        // Сообщение
        LockScreen(langView('mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty();
        //this.$operation_header = panelElement.$operation_header;
        //this.$operation_body = panelElement.$operation_body;
        this.$panel.append(panelElement.$element);

        // Создадим и добавим макет таблицы
        //var table_sostav = new this.fc_ui.el_table('tab-sostav-' + this.selector, 'display compact cell-border row-border hover');
        //this.$table_sostav = table_sostav.$element;
        //this.$operation_body.addClass('table-report-operation').append(this.$table_sostav);
        //// Инициализируем таблицу
        //this.obj_t_sostav = this.$table_sostav.DataTable({
        //    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
        //    "paging": true,
        //    "searching": true,
        //    "ordering": true,
        //    "info": true,
        //    "keys": true,
        //    select: true,
        //    "autoWidth": true,
        //    //"filter": true,
        //    //"scrollY": "600px",
        //    sScrollX: "100%",
        //    scrollX: true,
        //    //"responsive": true,
        //    //"bAutoWidth": false,
        //    language: language_table(App.Langs),
        //    jQueryUI: false,
        //    "createdRow": function (row, data, index) {
        //        $(row).attr('id', data.id);
        //        // Приняли
        //        if (data.count_wagon_send == data.count_wagon_arrival) {
        //            $(row).addClass('green');
        //        }
        //        if (data.count_wagon_send != data.count_wagon_arrival && data.count_wagon_arrival > 0) {
        //            $(row)
        //        }
        //        // Проверка на создание строки (ошибка если дата строки создания и выполнения операции больше часа )
        //        var create = moment(data.operation_create);
        //        var operat = moment(data.operation_end);
        //        if (create && operat && create.isValid() && operat.isValid()) {
        //            var hour = create.diff(operat, 'hours');
        //            if (hour >= 1 || hour <= -1) {
        //                $('td', row).eq(10).addClass('error');
        //            }
        //        }
        //    }.bind(this),
        //    columns: this.init_columns(),
        //    dom: 'Bfrtip',
        //    stateSave: false,
        //    buttons: [
        //        {
        //            extend: 'collection',
        //            text: langView('title_button_export', App.Langs),
        //            buttons: [
        //                {
        //                    text: langView('title_button_buffer', App.Langs),
        //                    extend: 'copyHtml5',
        //                },
        //                {
        //                    text: langView('title_button_excel', App.Langs),
        //                    extend: 'excelHtml5',
        //                    sheetName: 'Вагоны на пути',
        //                    messageTop: function () {
        //                        return '';
        //                    }
        //                },
        //            ],
        //            autoClose: true
        //        },
        //        {
        //            text: langView('title_button_cancel', App.Langs),
        //            action: function (e, dt, node, config) {

        //            }.bind(this),
        //            enabled: false,
        //        },
        //        {
        //            text: langView('title_button_return', App.Langs),
        //            action: function (e, dt, node, config) {

        //            }.bind(this),
        //            enabled: false
        //        },
        //        {
        //            extend: 'pageLength',
        //        }

        //    ]
        //}).on('select deselect', function (e, dt, type, indexes) {
        //    var selected = this.obj_t_sostav.rows({ selected: true })[0].length > 0 ? true : false;
        //    var row = this.obj_t_sostav.rows(indexes).data().toArray()[0];
        //    if (selected) {
        //        this.obj_t_sostav.button(1).enable(!(row && row.count_wagon_send === row.count_wagon_arrival));
        //        this.obj_t_sostav.button(2).enable(!(row && row.count_wagon_send === row.count_wagon_arrival));
        //        this.select_row_sostav = row;
        //    } else {
        //        this.obj_t_sostav.button(1).enable(false);
        //        this.obj_t_sostav.button(2).enable(false);
        //        this.select_row_sostav = null;
        //    }
        //}.bind(this));
        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            // Создадим форму выбора для отчета
            //this.form_panel = new FIL();
            //var fl_interval_date = {
            //    type: 'interval_date',
            //    id: 'select_date',
            //    prefix: 'sm',
            //    title: langView('title_label_date', App.Langs),
            //    start: this.start,
            //    stop: this.stop,
            //    select: function (interval) {
            //        if (interval && interval.start && interval.stop) {
            //            this.load_operation(moment(interval.start)._d, moment(interval.stop)._d);
            //        }
            //    }.bind(this),
            //};
            //var fl_station = {
            //    type: 'select',
            //    id: 'station',
            //    prefix: 'sm',
            //    title: langView('title_label_station', App.Langs),
            //    list: this.list_station,
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //        this.id_station = id;
            //        this.view(this.operation);
            //    }.bind(this),
            //};
            //var fl_refresh = {
            //    type: 'button',
            //    id: 'refresh',
            //    prefix: 'sm',
            //    title: null,
            //    icon: 'fas fa-retweet',
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        this.update();
            //    }.bind(this),
            //};
            //var fields = [];
            //fields.push(fl_interval_date);
            //fields.push(fl_station);
            //fields.push(fl_refresh);
            //// Инициализация формы
            //this.form_panel.init({
            //    fields: fields
            //});
            // Отображение формы
            //this.$operation_header.append(this.form_panel.$form);

            // Загрузить и вывести информацию если стоит признак
            if (this.settings.auto_load) {
                this.load_default();
            }

            //----------------------------------
            if (typeof fn_init_ok === 'function') {
                fn_init_ok();
            }
            //----------------------------------
        }.bind(this));
    };
    // Показать данные 
    view_send_cars.prototype.view = function (operation) {
        // Если указана станция выполним коррекцию по станции
        LockScreen(langView('mess_load_operation', App.Langs));
        if (this.id_station && this.id_station >= 0) {
            var operation = operation.filter(function (i) {
                return i.from_id_station === this.id_station;
            }.bind(this));
        }
        this.obj_t_sostav.clear();
        this.obj_t_sostav.rows.add(operation ? operation : []);
        this.obj_t_sostav.order([0, 'asc']);
        if (this.select_row_sostav !== null) {
            this.obj_t_sostav.row('#' + this.select_row_sostav.id).select();
        }
        this.obj_t_sostav.draw();
        LockScreenOff();
    };
    // загрузить данные 
    view_send_cars.prototype.load_default = function () {
        var res = this.form_panel.get_value();
        if (res && res.select_date) {
            this.load_operation(moment(res.select_date.start)._d, moment(res.select_date.stop)._d);
        }
    };
    // загрузить данные 
    view_send_cars.prototype.load_operation = function (start, stop) {
        if (start >= 0 && stop >= 0) {
            LockScreen(langView('mess_load_operation', App.Langs));
            this.ids_wsd.getSostavWagonsOperationOfSend(start, stop, function (operation) {
                this.start = start;
                this.stop = stop;
                this.operation = operation;
                this.select_row_sostav = null;
                this.view(operation);
                //LockScreenOff();
            }.bind(this));
        } else {
            //
        }

    };
    // Обновить данные
    view_send_cars.prototype.update = function () {
        this.out_clear();
        if (this.start && this.stop) {
            var td_wagons = this.td_wagons;
            LockScreen(langView('mess_update_operation', App.Langs));
            this.ids_wsd.getSostavWagonsOperationOfSend(this.start, this.stop, function (operation) {
                this.operation = operation;
                this.view(operation);
                // Открыть детали если есть

            }.bind(this));
        } else {

        }
    };
    // Показать
    view_send_cars.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    view_send_cars.prototype.hide = function () {
        this.$panel.hide();
    }
    // Очистить сообщения
    view_send_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_send_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_send_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_send_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Очистить объект
    view_send_cars.prototype.destroy = function () {
        //this.modal_confirm_form.destroy();
        //this.modal_edit_form.destroy();
        // Очистить форму выбора
        if (this.form_panel) {
            this.form_panel.destroy();
            this.form_panel = null;
        }
        LockScreen(langView('mess_destroy_operation', App.Langs));
        // Очистить объект таблица
        setTimeout(function () {
            this.destroy_table();
        }.bind(this), 0);
        //if (this.obj_t_sostav) {
        //    LockScreen(langView('mess_destroy_operation', App.Langs));
        //    this.obj_t_sostav.destroy(true);
        //    this.obj_t_sostav = null;
        //    LockScreenOff();
        //}
        this.$panel.empty(); // empty in case the columns change
    };

    view_send_cars.prototype.destroy_table = function () {
        // Очистить объект таблица
        if (this.obj_t_sostav) {
            //LockScreen(langView('mess_destroy_operation', App.Langs));
            this.obj_t_sostav.destroy(true);
            this.obj_t_sostav = null;

        }
        LockScreenOff();
    };

    App.view_send_cars = view_send_cars;

    window.App = App;
})(window);