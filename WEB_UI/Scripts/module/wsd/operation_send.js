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
            'card_header_panel': 'ИСТОРИЯ ОПЕРАЦИЙ "ОТПРАВЛЕНИЕ"',
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

            //'tytle_yes': 'Да',
            //'tytle_no': 'Нет',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_cancel': 'Отменить',
            'title_button_return': 'Вернуть',

            'mess_load_operation': 'Загружаю операции...',
            'mess_init_panel': 'Выполняю инициализацию модуля ...',
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
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', null, null, langView('card_header_panel', App.Langs));
        var card_operation = new base.fc_ui.el_card('border-primary', null, 'text-dark pl-3 pr-3 table-directory', null);
        this.$operation_header = card_operation.$header;
        this.$operation_body = card_operation.$body;
        card_panel.$body.append(card_operation.$card);
        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };
    // создадим основу формы
    function div_panel1(base) {
        var $div_row = $('<div></div>', {
            'class': 'row',
        });
        var $div_col = $('<div></div>', {
            'class': 'col-xl-12 mb-1 mt-1',
        });
        var $div_card_panel = $('<div></div>', {
            'class': 'card border-secondary mb-1',
        });
        var $div_card_header_panel = $('<div></div>', {
            'class': 'card-header',
            'text': langView('card_header_panel', App.Langs)
        });
        var $div_card_body_panel = $('<div></div>', {
            'class': 'card-body text-dark pl-3 pr-3',
        });
        //--------------
        var $div_card = $('<div></div>', {
            'class': 'card border-primary',
        });
        var $div_card_header = $('<div></div>', {
            'class': 'card-header',
        });
        var $div_card_body = $('<div></div>', {
            'class': 'card-body text-dark',
        });
        //--------------
        var $form = $('<form></form>', {
            'class': 'form-inline',
        });
        var $div_form_gr = $('<div></div>', {
            'class': 'form-group',
        });
        var $div_form_gr1 = $('<div></div>', {
            'class': 'form-group',
        });
        var $div_input_gr = $('<div></div>', {
            'class': 'input-group',
        });
        var $div_input_gr_append = $('<div></div>', {
            'class': 'input-group-append',
        });
        var $lab_date = $('<label></label>', {
            'class': 'col-form-label-sm mr-2',
            'for': base.selector + '-select-date',
            'text': langView('title_label_date', App.Langs)
        });
        var $span_date = $('<span></span>', {
            'class': 'mr-2',
            'id': base.selector + '-select-date'
        });
        var $input_date_start = $('<input></input>', {
            'class': 'form-control-sm mr-1',
            'id': base.selector + '-date-start',
            'name': base.selector + '-date-start',
            'data-type': 'start'
        });
        var $input_date_stop = $('<input></input>', {
            'class': 'form-control-sm',
            'id': base.selector + '-date-stop',
            'name': base.selector + '-date-stop',
            'data-type': 'stop'
        });
        var $lab_station = $('<label></label>', {
            'class': 'col-form-label-sm mr-2',
            'for': base.selector + '-station',
            'text': langView('title_label_station', App.Langs)
        });
        var $select_station = $('<select></select>', {
            'class': 'form-control-sm',
            'id': base.selector + '-station',
            'name': base.selector + '-station',
        });
        var $icon_refresh = $('<i></i>', {
            'class': 'fas fa-retweet',
            'aria-hidden': 'true',
        });
        var $bt_refresh = $('<button></button>', {
            'class': 'btn btn-sm  btn-primary mb-2',
            'type': 'submit',
            'id': base.selector + '-refresh',
            'name': base.selector + '-refresh',
        });

        this.$form = $form;
        this.$date_select = $span_date;
        this.$station = $select_station;
        this.$bt_refresh = $bt_refresh;

        this.$form
            .append($div_form_gr.append($lab_date).append(this.$date_select.append($input_date_start).append($input_date_stop)))
            .append($div_form_gr1.append($lab_station).append($div_input_gr.append(this.$station).append($div_input_gr_append.append(this.$bt_refresh.append($icon_refresh)))));
        this.$element = $div_row.append($div_col.append($div_card_panel.append($div_card_header_panel).append($div_card_body_panel.append($div_card.append($div_card_header.append(this.$form)).append($div_card_body)))));
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
            auto_view: true,
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
        this.id_station - 1; // По умолчанию не выбрана
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
        this.$operation_header = panelElement.$operation_header;
        this.$operation_body = panelElement.$operation_body;
        this.$panel.append(panelElement.$element);

        // Создадим и добавим макет таблицы
        var table_sostav = new this.fc_ui.el_table('tab-sostav-' + this.selector, 'display compact cell-border row-border hover');
        this.$table_sostav = table_sostav.$element;
        this.$operation_body.addClass('table-directory').append(this.$table_sostav);
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
                        $('td', row).eq(10).addClass('error');
                    }
                }
            },
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
                        this.modal_edit_form.view(this.select_row_sostav);
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

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
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
                    //var data2 = new Date();
                    //var data21 = moment(data2).toISOString();
                    //var data3 = moment();
                    //var data31 = moment(data2).toISOString();
                    //var data32 = moment(data2).toISOString(true);
                    //var data33 = moment(data2).toISOString(false);
                    //var data34 = moment(data2).format();
                    //var data35 = moment(data2).format('YYYY-MM-DDTHH:mm:ss.SSS');
                    //var sd = interval.start.substring(0, 23)

                    //var data = moment(interval.start);
                    //var data1 = moment(sd);
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
            var fields = [];
            fields.push(fl_interval_date);
            fields.push(fl_station);
            // Инициализация формы
            this.form_panel.init({
                fields: fields
            });
            // Отображение формы
            this.$operation_header.append(this.form_panel.$form);

            // Вывести информацию
            if (this.settings.auto_view) {
                var res = this.form_panel.get_value();
                if (res && res.select_date) {
                    this.load_operation(moment(res.select_date.start)._d, moment(res.select_date.stop)._d);
                }

            }


        }.bind(this));



        //// Инициализация формы для правки полей
        //var MEF = App.modal_edit_form;
        //this.modal_edit_form = new MEF('mfe-' + this.selector); // Создадим экземпляр формы правки строк таблицы

        //// Загрузим справочные данные, определим поля формы правки
        //this.load_db(['station', 'ways', 'park_ways', 'divisions'], false, function (result) {

        //    //----------------------------------
        //    // Создать макет таблицы
        //    var tableElement = new table_way(this);
        //    this.$panel.empty();
        //    this.$t_way = tableElement.$element;
        //    this.$panel.append(this.$t_way);
        //    // Инициализируем таблицу

        //    //----------------------------------
        //    if (typeof fn_init_ok === 'function') {
        //        fn_init_ok();
        //    }
        //    //----------------------------------
        //}.bind(this));
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
        //this.obj_t_sostav.order([3, 'asc']);
        if (this.select_row_sostav !== null) {
            this.obj_t_sostav.row('#' + this.select_row_sostav.id).select();
        }
        this.obj_t_sostav.draw();
        LockScreenOff();
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
        if (this.id_station && this.id_park) {
            LockScreen(langView('mess_load_dir_way', App.Langs));
            this.ids_dir.getWaysOfStationIDParkID(this.id_station, this.id_park, function (ways) {
                this.view(ways);
                LockScreenOff();
            }.bind(this));
        }

    };
    // Обновить компоненты если обновлена база
    operation_send.prototype.update_element = function (list) {
        if (list) {
            if ($.inArray("station", list) >= 0) {
                //Обновился
                this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
                this.modal_edit_form.update_list_fields_form('id_station', this.list_station);

            };
            if ($.inArray("ways", list) >= 0) {
                //Обновился при выборе станции
            };
            if ($.inArray("divisions", list) >= 0) {
                //Обновился
                this.list_divisions = this.ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);
                this.modal_edit_form.update_list_fields_form('id_devision', this.list_divisions);
            };
        };
    };
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
    // вверх объект
    operation_send.prototype.up = function () {
        this.out_clear();
        var id = this.select_row_sostav ? this.select_row_sostav.id : null;
        var position = this.select_row_sostav ? this.select_row_sostav.position_way : null;
        if (id && position > 0) {
            var operation = {
                id_way: id,
                user: App.User_Name,
            };
            LockScreen(langView('mess_operation_dir_way', App.Langs));
            this.ids_dir.postOperationUp1PositionWayOfPark(operation, function (result) {
                if (result > 0) {
                    this.update();
                    this.out_info("Путь перенесен на позицию верх");
                } else {
                    this.out_error("Ошибка, выполнения операции 'перенос на позицию вверх', код ошибки : " + result);
                    LockScreenOff();
                }
            }.bind(this));
        } else {
            this.out_clear();
            if (id === null) {
                this.out_error("Ошибка, выполнения операции изменения позиции пути, путь не определен");
            }
            if (position === null || position === 0) {
                this.out_error("Ошибка, выполнения операции изменения позиции пути, позиция пути неопределена или равна 0");
            }
        };
    };
    // вниз объект
    operation_send.prototype.down = function () {
        this.out_clear();
        var id = this.select_row_sostav ? this.select_row_sostav.id : null;
        var position = this.select_row_sostav ? this.select_row_sostav.position_way : null;
        if (id && position > 0) {
            var operation = {
                id_way: id,
                user: App.User_Name,
            };
            LockScreen(langView('mess_operation_dir_way', App.Langs));
            this.ids_dir.postOperationDown1PositionWayOfPark(operation, function (result) {
                if (result > 0) {
                    this.update();
                    this.out_info("Путь перенесен на позицию вниз");
                } else {
                    this.out_error("Ошибка, выполнения операции 'Перенос на позицию вниз', код ошибки : " + result);
                    LockScreenOff();
                }
            }.bind(this));
        } else {
            this.out_clear();
            if (id === null) {
                this.out_error("Ошибка, выполнения операции изменения позиции пути, путь не определен");
            }
            if (position === null || position === 0) {
                this.out_error("Ошибка, выполнения операции изменения позиции пути, позиция пути неопределена или равна 0");
            }
        };
    };
    // Авто-коррекция
    operation_send.prototype.auto = function () {
        this.out_clear();
        this.modal_confirm_form.view('Выполнить', 'Выполнить автоматическую коррекцию путей?', function (result) {
            if (result) {
                // Выполнить 
                if (this.id_station && this.id_park) {
                    var operation = {
                        id_station: this.id_station,
                        id_park: this.id_park,
                        user: App.User_Name,
                    };
                    LockScreen(langView('mess_operation_dir_way', App.Langs));
                    this.ids_dir.postOperationAutoPositionWayOfPark(operation, function (result) {
                        if (result > 0) {
                            this.update();
                            this.out_info("Автоматическая коррекция путей – выполнена! Обновленно :" + result + " записей");
                        } else {
                            this.out_error("Ошибка, выполнения операции автоматической коррекции путей, код ошибки : " + result);
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    this.out_error("Автоматическая коррекция путей – отклонена не определена станция [" + this.id_station + "] или парк [" + this.id_park + "]");
                    LockScreenOff();
                };
            } else {
                // Отмена
                this.out_warning("Автоматическая коррекция путей – отменена");
            }
        }.bind(this));
    };
    // Сохранить объект
    operation_send.prototype.save = function (data) {
        this.out_clear();
        if (data.new && data.new.id_park === null) {
            if (data.old) {
                this.modal_edit_form.set_object_error('id_park', 'edit', 'Указанного парка нет в справочнике ИДС ТД');
            } else {
                this.modal_edit_form.set_object_error('id_park', 'add', 'Указанного парка нет в справочнике ИДС ТД');
            }
        } else {
            if (data && !data.old) {
                // Добавить 
                this.insert(data.new);
            } else {
                // Править
                this.edit(data.new);
            };
        }


    };
    // Добавить объект
    operation_send.prototype.insert = function (data) {
        // Добавить 
        LockScreen(langView('mess_operation_dir_way', App.Langs));
        this.ids_dir.postOperationInsertWayOfPark(data, function (result) {
            if (result > 0) {
                this.modal_edit_form.close(); // закроем форму
                this.update();
                this.out_clear();
                this.out_info("Новый путь - добавлен");
                this.settings.fn_db_update(['ways']);
            } else {
                LockScreenOff();
                this.modal_edit_form.out_error('При добавлении пути произошла ошибка, код ошибки : ' + result);
            }
        }.bind(this));
    };
    // Изменить объект
    operation_send.prototype.edit = function (data) {
        if (data.way_delete !== null && data.position_way > 0) {
            // Ошибка
            this.modal_edit_form.set_object_error('way_delete', 'edit', 'Путь имеет признак – удален, позиция пути должна быть (0)');
            this.modal_edit_form.set_object_error('position_way', 'edit', 'Путь имеет признак – удален, позиция пути должна быть (0)');
        } else {
            // Выполнить править
            var operation = {
                way: data,
                user: App.User_Name,
            };
            LockScreen(langView('mess_operation_dir_way', App.Langs));
            this.ids_dir.postOperationUpdateWayOfPark(operation, function (result) {
                if (result > 0) {
                    this.modal_edit_form.close(); // закроем форму
                    this.update();
                    this.out_clear();
                    this.out_info("Путь - обновлен");
                    this.settings.fn_db_update(['ways']);
                } else {
                    LockScreenOff();
                    this.modal_edit_form.out_error('При обновлении пути произошла ошибка, код ошибки : ' + result);
                }
            }.bind(this));
        }
    };
    // Удалить объект
    operation_send.prototype.delete = function (data) {
        this.out_clear();
        if (this.select_row_sostav !== null) {
            this.modal_confirm_form.view('Удалить', 'Удалить выбранный путь [' + this.select_row_sostav['way_num_' + App.Lang] + ' - ' + this.select_row_sostav['way_name_' + App.Lang] + '] ?', function (result) {
                if (result) {
                    // Выполнить
                    var operation = {
                        id_way: this.select_row_sostav.id,
                        user: App.User_Name,
                    };
                    LockScreen(langView('mess_operation_dir_way', App.Langs));
                    this.ids_dir.postOperationDeleteWayOfPark(operation, function (result) {
                        if (result > 0) {
                            this.update();
                            this.out_clear();
                            this.out_info("Путь - удален!");
                            this.settings.fn_db_update(['ways']);
                        } else {
                            this.out_error("Ошибка, выполнения операции 'Удалить путь', код ошибки : " + result);
                            LockScreenOff();
                        }
                    }.bind(this));

                } else {
                    // Отмена
                    this.out_warning("Операция 'Удалить путь' – отменена");
                }
            }.bind(this));
        } else {

        }
    };
    // Очистить объект
    operation_send.prototype.destroy = function () {
        this.modal_confirm_form.destroy();
        this.modal_edit_form.destroy();
        this.obj_t_sostav.destroy();
        this.$panel.empty(); // empty in case the columns change
    }

    App.operation_send = operation_send;

    window.App = App;
})(window);