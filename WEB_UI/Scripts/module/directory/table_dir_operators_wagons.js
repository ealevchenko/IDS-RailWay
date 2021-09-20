/// <reference path="../shared/modal_confirm_form.js" />
/// <reference path="../shared/modal_edit_form.js" />

(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_id': 'id строки',
            'field_operators': 'Оператор полное название',
            'field_abbr': 'Оператор (аббр)',
            'field_paid': 'Платный',
            'field_rop': 'rop',
            'field_local_use': 'Месный (ИДС"УСПС")',
            'field_color': 'Цвет оператора (#RGB)',
            'field_monitoring_idle_time': 'Контр. простой',
            'field_create': 'Строка создана',
            'field_create_user': 'Строку создал',
            'field_change': 'Строка обновлена',
            'field_change_user': 'Строку обновил',

            'title_yes': 'Да',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'title_button_add': 'Добавить',
            'title_button_edit': 'Править',
            'title_button_del': 'Удалить',

            'mess_load_operators': 'Загружаю справочник операторов...',
            'mess_init_module': 'Выполняю инициализацию модуля...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_operators': 'Operator full name',
            'field_abbr': 'Operator (abbr)',
            'field_paid': 'Paid',
            'field_rop': 'rop',
            'field_local_use': 'Local (IDS "USPS")',
            'field_color': 'Operator color (#RGB)',
            'field_monitoring_idle_time': 'Monitor. simple',
            'field_create': 'String created',
            'field_create_user': 'Created string',
            'field_change': 'String updated',
            'field_change_user': 'The line was updated',

            'title_yes': 'Yes',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'title_button_add': 'Add',
            'title_button_edit': 'Edit',
            'title_button_del': 'Remove',

            'mess_load_operators': 'Loading operator manual ...',
            'mess_init_module': 'Initializing the module ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var IDS_DIRECTORY = App.ids_directory;
    // Модуль инициализаии компонентов формы
    var FC = App.form_control;

    // Перечень полей
    var list_collums = [
        {
            field: 'id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'operators',
            data: function (row, type, val, meta) {
                return row['operators_' + App.Lang];
            },
            className: 'dt-body-nowrap text-left color',
            title: langView('field_operators', App.Langs), width: "200px", orderable: true, searchable: true
        },
        {
            field: 'abbr',
            data: function (row, type, val, meta) {
                return row['abbr_' + App.Lang];
            },
            className: 'dt-body-nowrap text-left',
            title: langView('field_abbr', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'paid',
            data: function (row, type, val, meta) {
                return row.paid ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_paid', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'rop',
            data: function (row, type, val, meta) {
                return row.rop ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_rop', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'local_use',
            data: function (row, type, val, meta) {
                return row.local_use ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_local_use', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'color',
            data: function (row, type, val, meta) {
                return row.color;
            },
            className: 'dt-body-nowrap',
            title: langView('field_color', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'monitoring_idle_time',
            data: function (row, type, val, meta) {
                return row.monitoring_idle_time ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-center',
            title: langView('field_monitoring_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'create',
            data: function (row, type, val, meta) {
                return row.create ? moment(row.create).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_create', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'create_user',
            data: function (row, type, val, meta) {
                return row.create_user;
            },
            className: 'dt-body-nowrap',
            title: langView('field_create_user', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'change',
            data: function (row, type, val, meta) {
                return row.change ? moment(row.change).format(format_datetime) : null;
            },
            className: 'dt-body-nowrap',
            title: langView('field_change', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'change_user',
            data: function (row, type, val, meta) {
                return row.change_user;
            },
            className: 'dt-body-nowrap',
            title: langView('field_change_user', App.Langs), width: "50px", orderable: true, searchable: true
        },

    ];
    //
    function table_dir_operators_wagons(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$dir_operators = $(selector);
        if (this.$dir_operators.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.fc_ui = new FC();
        this.selector = this.$dir_operators.attr('id');
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_dir_operators_wagons.prototype.init_columns = function () {
        var collums = [];
        collums.push('id');
        collums.push('color');
        collums.push('operators');
        collums.push('abbr');
        collums.push('paid');
        collums.push('rop');
        collums.push('local_use');
        collums.push('monitoring_idle_time');
        collums.push('create');
        collums.push('create_user');
        collums.push('change');
        collums.push('change_user');
        return init_columns(collums, list_collums);
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    table_dir_operators_wagons.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация таблицы справочника путей
    table_dir_operators_wagons.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        var init = true;
        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new IDS_DIRECTORY();
        //
        this.select_row_operation = null;
        LockScreen(langView('mess_init_module', App.Langs));
        //var MCF = App.modal_confirm_form;
        //this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        //this.modal_confirm_form.init();

        // Форма правки ===============================================================================

        var EDOW = App.edit_dir_operators_wagons;
        this.edow = new EDOW();
        this.edow.init({
            alert: this.settings.alert,
            ids_dir: this.ids_dir,
            fn_add: function (result) {
                this.update();
                this.out_clear();
                this.out_info("Новый оператор  [" + (result && result.data ? result.data['operators_' + App.Lang] : '') + "] - добавлен");
                //this.settings.fn_db_update(['ways']);
            }.bind(this),
            fn_edit: function (result) {
                this.update();
                this.out_clear();
                this.out_info("Оператор [" + (result && result.data ? result.data['operators_' + App.Lang] : '') + "] - Обновлен");
                //this.settings.fn_db_update(['ways']);
            }.bind(this),
            fn_delete: function (result) {
                this.select_row_operation = null;
                this.update();
                this.out_clear();
                this.out_info("Оператор [" + (result && result.data ? result.data['operators_' + App.Lang] : '') + "] - Удален");
                //this.settings.fn_db_update(['ways']);
            }.bind(this),
        });
        //----------------------------------
        this.$dir_operators.empty();
        // Создать макет таблицы
        var $tab = new this.fc_ui.el_table(this.selector + '-table', 'display compact cell-border row-border hover');
        if ($tab && $tab.$element && $tab.$element.length > 0) {
            this.$t_operators = $tab.$element;
            this.$dir_operators.append(this.$t_operators);
            // Инициализируем таблицу
            this.obj_t_operators = this.$t_operators.DataTable({
                "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                "paging": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "keys": true,
                select: true,
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
                    $(row).attr('id', data.id);
                    // Цвет оператора
                    if (data.color && data.color !== '') {
                        $('td.color', row).attr('style', 'background-color:' + data.color + ' !important;')
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
                                sheetName: 'Список парков',
                                messageTop: function () {
                                    return '';
                                }
                            },
                        ],
                        autoClose: true
                    },
                    {
                        text: langView('title_button_add', App.Langs),
                        action: function (e, dt, node, config) {
                            this.edow.add();
                        }.bind(this),
                        enabled: true
                    },
                    {
                        text: langView('title_button_edit', App.Langs),
                        action: function (e, dt, node, config) {
                            this.edow.edit(this.select_row_operation);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_del', App.Langs),
                        action: function (e, dt, node, config) {
                            this.edow.del(this.select_row_operation);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        extend: 'pageLength',
                    }

                ]
            }).on('select deselect', function (e, dt, type, indexes) {
                var selected = this.obj_t_operators.rows({ selected: true })[0].length > 0 ? true : false;
                var row = this.obj_t_operators.rows(indexes).data().toArray()[0];
                if (selected) {
                    this.obj_t_operators.button(2).enable(true);
                    this.obj_t_operators.button(3).enable(true);
                    this.select_row_operation = row;
                } else {
                    this.obj_t_operators.button(2).enable(false);
                    this.obj_t_operators.button(3).enable(false);
                    this.select_row_operation = null;
                }
            }.bind(this));
        } else {
            init = false;
            throw new Error('Не удалось создать элемент <table></table>');
        }
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok(init);
        }
        //----------------------------------
    };
    // Показать данные 
    table_dir_operators_wagons.prototype.view = function (data) {
        this.obj_t_operators.clear();
        this.obj_t_operators.rows.add(data);
        this.obj_t_operators.draw();
        if (this.select_row_operation !== null) {
            this.obj_t_operators.row('#' + this.select_row_operation.id).select();
        } else {
            this.obj_t_operators.row().deselect();
        }

    };
    // загрузить данные 
    table_dir_operators_wagons.prototype.load = function (update) {
        LockScreen(langView('mess_load_operators', App.Langs));
        if (update) {
            this.load_db(['operators_wagons'], true, function (result) {
                /*                this.select_row_operation = null;*/
                this.view(this.ids_dir.list_operators_wagons);
                LockScreenOff();
            }.bind(this));
        } else {
            this.view(this.ids_dir.list_operators_wagons !== null ? this.ids_dir.list_operators_wagons : []);
        }


    };
    // Обновить данные
    table_dir_operators_wagons.prototype.update = function () {
        this.load(true);
    };
    // Очистить сообщения
    table_dir_operators_wagons.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_dir_operators_wagons.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_dir_operators_wagons.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_dir_operators_wagons.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект
    table_dir_operators_wagons.prototype.destroy = function () {
        this.edow.destroy();
        if (this.obj_t_operators) {
            this.obj_t_operators.destroy(true);
            this.obj_t_operators = null;
        }
        this.$dir_operators.empty();
    }

    App.table_dir_operators_wagons = table_dir_operators_wagons;

    window.App = App;
})(window);