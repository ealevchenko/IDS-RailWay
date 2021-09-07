/// <reference path="../shared/common.js" />
/// <reference path="../../api/ids_direct.js" />
/// <reference path="../../api/ids_wsd.js" />


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
            'card_header_panel': 'ИСТОРИЯ ОПЕРАЦИЙ "ОТПРАВЛЕНИЕ СОСТАВОВ НА СТАНЦИИ АМКР"',
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
            'card_header_panel': 'HISTORY OF OPERATIONS "SENDING CONVENTIONS TO AMKR STATION" ',
            'title_label_date': 'PERIOD:',
            'title_label_station': 'STATION OF DEPARTURE:',

            'field_id': 'row id',
            'field_operation_end': 'Sent',
            'field_name_outer_way': 'Ferry',
            'field_from_station_name': 'Sent station',
            'field_from_way_name': 'Sent path',
            'field_on_station_name': 'Station arr.',
            'field_count_wagon_send': 'Sent',
            'field_count_wagon_arrival': 'Received',
            'field_operation_locomotive1': 'Locomotive1',
            'field_operation_locomotive2': 'Locomotive2',
            'operation_create_user': 'The operation was performed',
            'field_status': 'Status',

            'tytle_status_arr': 'Accepted',
            'tytle_status_work': 'In progress',
            'tytle_status_send': 'Sent',
            'tytle_detali_wagon': 'Wagons included',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',
            'title_button_cancel': 'Cancel',
            'title_button_return': 'Return',

            'mess_load_operation': 'Loading operations ...',
            'mess_update_operation': 'Updating operations ...',
            'mess_init_panel': 'Initializing the module ...',
            'mess_destroy_operation': 'Closing the form ...',
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
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', null, null, langView('card_header_panel', App.Langs));
        var card_operation = new base.fc_ui.el_card('border-primary', null, 'text-dark pl-3 pr-3 table-directory', null);
        this.$operation_header = card_operation.$header;
        this.$operation_body = card_operation.$body;
        card_panel.$body.append(card_operation.$card);
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
    function operation_send(selector) {
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
    operation_send.prototype.init_columns = function () {
        var collums = [];

        if (this.settings.detali_wagons) collums.push('details_control');
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
    operation_send.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация модуля
    operation_send.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            detali_wagons: true,
            auto_load: true,
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
        // Диапазон времени
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.id_station = -1; // По умолчанию не выбрана
        // список операций
        this.operation = null;
        // Выбраная строка
        this.select_row_sostav = null;
        // Детальные таблицы
        this.td_wagons = {};
        // Сообщение
        LockScreen(langView('mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty();
        this.$operation_header = panelElement.$operation_header;
        this.$operation_body = panelElement.$operation_body;
        this.$panel.append(panelElement.$element);

        // Создадим и добавим макет таблицы
        var table_sostav = new this.fc_ui.el_table('tab-sostav-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_sostav = table_sostav.$element;
        this.$operation_body.addClass('table-report-operation').append(this.$table_sostav);
        // Инициализируем таблицу
        this.obj_t_sostav = this.$table_sostav.DataTable({
            "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "keys": true,
            select: true,
            "autoWidth": true,
            //"filter": true,
            //"scrollY": "600px",
            sScrollX: "100%",
            scrollX: true,
            //"responsive": true,
            //"bAutoWidth": false,
            language: language_table(App.Langs),
            jQueryUI: false,
            "createdRow": function (row, data, index) {
                $(row).attr('id', data.id);
                // Приняли
                if (data.count_wagon_send == data.count_wagon_arrival) {
                    $(row).addClass('green');
                }
                if (data.count_wagon_send != data.count_wagon_arrival && data.count_wagon_arrival > 0) {
                    $(row)
                }
                // Проверка на создание строки (ошибка если дата строки создания и выполнения операции больше часа )
                var create = moment(data.operation_create);
                var operat = moment(data.operation_end);
                if (create && operat && create.isValid() && operat.isValid()) {
                    var hour = create.diff(operat, 'hours');
                    if (hour >= 1 || hour <= -1) {
                        $('td', row).eq(this.settings.detali_wagons ? 11 : 10).addClass('error');
                    }
                }
            }.bind(this),
            columns: this.init_columns(),
            dom: 'Bfrtip',
            stateSave: false,
            buttons: [
                {
                    extend: 'collection',
                    text: langView('title_button_export', App.Langs),
                    buttons: [
                        {
                            text: langView('title_button_buffer', App.Langs),
                            extend: 'copyHtml5',
                        },
                        {
                            text: langView('title_button_excel', App.Langs),
                            extend: 'excelHtml5',
                            sheetName: 'Вагоны на пути',
                            messageTop: function () {
                                return '';
                            }
                        },
                    ],
                    autoClose: true
                },
                {
                    text: langView('title_button_cancel', App.Langs),
                    action: function (e, dt, node, config) {

                    }.bind(this),
                    enabled: false,
                },
                {
                    text: langView('title_button_return', App.Langs),
                    action: function (e, dt, node, config) {

                    }.bind(this),
                    enabled: false
                },
                {
                    extend: 'pageLength',
                }

            ]
        }).on('select deselect', function (e, dt, type, indexes) {
            var selected = this.obj_t_sostav.rows({ selected: true })[0].length > 0 ? true : false;
            var row = this.obj_t_sostav.rows(indexes).data().toArray()[0];
            if (selected) {
                this.obj_t_sostav.button(1).enable(!(row && row.count_wagon_send === row.count_wagon_arrival));
                this.obj_t_sostav.button(2).enable(!(row && row.count_wagon_send === row.count_wagon_arrival));
                this.select_row_sostav = row;
            } else {
                this.obj_t_sostav.button(1).enable(false);
                this.obj_t_sostav.button(2).enable(false);
                this.select_row_sostav = null;
            }
        }.bind(this));
        if (this.settings.detali_wagons) this.init_detali();

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            // Создадим форму выбора для отчета
            this.form_panel = new FIL();
            var fl_interval_date = {
                type: 'interval_date',
                id: 'select_date',
                prefix: 'sm',
                title: langView('title_label_date', App.Langs),
                start: this.start,
                stop: this.stop,
                select: function (interval) {
                    if (interval && interval.start && interval.stop) {
                        this.load_operation(moment(interval.start)._d, moment(interval.stop)._d);
                    }
                }.bind(this),
            };
            var fl_station = {
                type: 'select',
                id: 'station',
                prefix: 'sm',
                title: langView('title_label_station', App.Langs),
                list: this.list_station,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    this.id_station = id;
                    this.view(this.operation);
                }.bind(this),
            };
            var fl_refresh = {
                type: 'button',
                id: 'refresh',
                prefix: 'sm',
                title: null,
                icon: 'fas fa-retweet',
                select: function (e, ui) {
                    event.preventDefault();
                    this.update();
                }.bind(this),
            };
            var fields = [];
            fields.push(fl_interval_date);
            fields.push(fl_station);
            fields.push(fl_refresh);
            // Инициализация формы
            this.form_panel.init({
                fields: fields
            });
            // Отображение формы
            this.$operation_header.append(this.form_panel.$form);

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
    operation_send.prototype.view = function (operation) {
        // Если указана станция выполним коррекцию по станции
        LockScreen(langView('mess_load_operation', App.Langs));
        if (this.id_station && this.id_station >= 0) {
            var operation = operation.filter(function (i) {
                return i.from_id_station === this.id_station;
            }.bind(this));
        }
        this.obj_t_sostav.clear();
        this.obj_t_sostav.rows.add(operation ? operation : []);
        this.obj_t_sostav.order([this.settings.detali_wagons ? 1 : 0, 'asc']);
        if (this.select_row_sostav !== null) {
            this.obj_t_sostav.row('#' + this.select_row_sostav.id).select();
        }
        this.obj_t_sostav.draw();
        if (this.settings.detali_wagons) {
            this.destroy_all_detali()
        }
        LockScreenOff();
    };
    // загрузить данные 
    operation_send.prototype.load_default = function () {
        var res = this.form_panel.get_value();
        if (res && res.select_date) {
            this.load_operation(moment(res.select_date.start)._d, moment(res.select_date.stop)._d);
        }
    };
    // загрузить данные 
    operation_send.prototype.load_operation = function (start, stop) {
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
    operation_send.prototype.update = function () {
        this.out_clear();
        if (this.start && this.stop) {
            var td_wagons = this.td_wagons;
            LockScreen(langView('mess_update_operation', App.Langs));
            this.ids_wsd.getSostavWagonsOperationOfSend(this.start, this.stop, function (operation) {
                this.operation = operation;
                this.view(operation);
                // Открыть детали если есть
                if (this.settings.detali_wagons) {
                    $.each(td_wagons, function (i, el) {
                        if (el) {
                            var tr = this.$table_sostav.find('tbody tr#' + i);
                            if (tr && tr.length > 0) {
                                this.detali_select_row(tr);
                            }
                        }
                    }.bind(this));
                };
            }.bind(this));
        } else {

        }
    };
    // Показать
    operation_send.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    operation_send.prototype.hide = function () {
        this.$panel.hide();
    }
    // Очистить сообщения
    operation_send.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    operation_send.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    operation_send.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    operation_send.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //------------------------------------------------------------------------
    // Выбрать строку детально
    operation_send.prototype.detali_select_row = function (tr) {
        var row = this.obj_t_sostav.row(tr);
        // Проверим, строка определена
        if (row && row.length > 0) {
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                this.destroy_detali(row.data());
                tr.removeClass('shown');
            }
            else {
                row.child('<div class="detali-operation">' +
                    '<div class="card border-primary ">' +
                    '<div class="card-header">' + langView('tytle_detali_wagon', App.Langs) + '</div>' +
                    '<div class="card-body table-directory">' +
                    '<div class="row">' +
                    '<div class="col-xl-12 ">' +
                    '<div class="container-fluid">' +
                    '<div id="' + this.selector + '-wd-' + row.data().id + '"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>').show();
                // Инициализируем
                this.view_detali(row.data());
                tr.addClass('shown');
            }
        }
    };
    // Инициализация таблицы детально
    operation_send.prototype.init_detali = function () {
        this.$table_sostav.find('tbody')
            .on('click', 'td.details-control-operation-send', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                this.detali_select_row(tr);
            }.bind(this));
    };
    // Показать детали
    operation_send.prototype.view_detali = function (data) {
        var base = this;
        var TCOPER = App.table_cars_operation;
        var sl = 'div#' + this.selector + '-wd-' + data.id;
        this.td_wagons[data.id] = new TCOPER(sl); // Создадим экземпляр таблицы
        this.td_wagons[data.id].init({
            alert: this.settings.alert,
        }, function () {
            this.td_wagons[data.id].view(data && data.wagons ? data.wagons : []);
        }.bind(this));
    };
    // Очистить детали по указаному составу
    operation_send.prototype.destroy_detali = function (data) {
        if (this.td_wagons[data.id]) {
            this.td_wagons[data.id].destroy();
            delete this.td_wagons[data.id];
        }
    };
    // Очистить все детали
    operation_send.prototype.destroy_all_detali = function () {
        $.each(this.td_wagons, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.td_wagons = {};
    };
    // Очистить объект
    operation_send.prototype.destroy = function () {
        //this.modal_confirm_form.destroy();
        //this.modal_edit_form.destroy();
        this.destroy_all_detali(); // Удалить все таблицы детально
        // Очистить форму выбора
        if (this.form_panel) {
            this.form_panel.destroy();
            this.form_panel = null;
        }
        LockScreen(langView('mess_destroy_operation', App.Langs));
        // Очистить объект таблица
        setTimeout(function () {
            this.destroy_table();
        }.bind(this),0);
        //if (this.obj_t_sostav) {
        //    LockScreen(langView('mess_destroy_operation', App.Langs));
        //    this.obj_t_sostav.destroy(true);
        //    this.obj_t_sostav = null;
        //    LockScreenOff();
        //}
        this.$panel.empty(); // empty in case the columns change
    };

    operation_send.prototype.destroy_table = function () {
        // Очистить объект таблица
        if (this.obj_t_sostav) {
            //LockScreen(langView('mess_destroy_operation', App.Langs));
            this.obj_t_sostav.destroy(true);
            this.obj_t_sostav = null;

        }
        LockScreenOff();
    };

    App.operation_send = operation_send;

    window.App = App;
})(window);