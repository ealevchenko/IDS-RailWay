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
            'field_change': 'Строка обновлена',

            'title_yes': 'Да',
/*            'tytle_no': 'Нет',*/

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'title_button_add': 'Добавить',
            'title_button_edit': 'Править',
            'title_button_del': 'Удалить',
            'title_button_auto': 'Авто-коррекция',

            'mess_load_operators': 'Загружаю справочник операторов...',
            //'mess_operation_dir_park': 'Выполняю операцию...',
            'mess_init_module': 'Выполняю инициализацию модуля...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
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
            className: 'dt-body-nowrap text-left',
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
            className: 'dt-body-centr',
            title: langView('field_paid', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'rop',
            data: function (row, type, val, meta) {
                return row.rop ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('field_rop', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'local_use',
            data: function (row, type, val, meta) {
                return row.local_use ? langView('title_yes', App.Langs) : '';
            },
            className: 'dt-body-centr',
            title: langView('field_local_use', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'color_view',
            data: function (row, type, val, meta) {
                return '  ';
            },
            className: 'dt-body-nowrap mw-50 color',
            title: langView('field_color', App.Langs), width: "30px", orderable: false, searchable: false
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
            className: 'dt-body-centr',
            title: langView('field_monitoring_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + moment(row.create).format(format_datetime) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'change',
            data: function (row, type, val, meta) {
                return row.change ? (row.change_user + '<br />[' + moment(row.change).format(format_datetime) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_change', App.Langs), width: "100px", orderable: false, searchable: false
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
        collums.push('color_view');
        collums.push('operators');
        collums.push('abbr');
        collums.push('paid');
        collums.push('rop');
        collums.push('local_use');
        collums.push('monitoring_idle_time');
        collums.push('create');
        collums.push('change');
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
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        // Инициализация формы для правки полей
        var MEF = App.modal_edit_form;
        this.modal_edit_form = new MEF('mfe-' + this.selector); // Создадим экземпляр формы правки строк таблицы

        // Определим поля
        var fl_id = {
            field: 'id',
            type: 'number',
            add: null,
            edit: null,
            name: null,
            label: null,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: 0,
            row: null,
            col: null,
            size: null,
        };
        var fl_park_name_ru = {
            field: 'park_name_ru',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'park_name_ru',
            label: 'Название парка (рус.)',
            placeholder: 'Полное название парка',
            maxlength: 100,
            required: true,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: 1,
            col: 1,
            size: 8,
        };
        var fl_park_name_en = {
            field: 'park_name_en',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'park_name_en',
            label: 'Название парка (анг.)',
            placeholder: 'Full name of the park',
            maxlength: 100,
            required: true,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: 2,
            col: 1,
            size: 8,
        };
        var fl_park_abbr_ru = {
            field: 'park_abbr_ru',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'park_abbr_ru',
            label: 'Крат. назв. парка (рус.)',
            placeholder: 'Аббревиатура парка',
            maxlength: 50,
            required: true,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: 1,
            col: 2,
            size: 4,
        };
        var fl_park_abbr_en = {
            field: 'park_abbr_en',
            type: 'string',
            add: 'text',
            edit: 'text',
            name: 'park_abbr_en',
            label: 'Крат. назв. парка (анг.)',
            placeholder: 'Park abbreviation',
            maxlength: 50,
            required: true,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: 2,
            col: 2,
            size: 4,
        };
        var fl_create = {
            field: 'create',
            type: 'datetime',
            add: null,
            edit: null,
            name: null,
            label: null,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: moment().format("YYYY-MM-DDThh:mm:ss"), //.utc().toISOString(),
            row: null,
            col: null,
            size: null,
        };
        var fl_create_user = {
            field: 'create_user',
            type: 'string',
            add: null,
            edit: null,
            name: null,
            label: null,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: App.User_Name,
            row: null,
            col: null,
            size: null,
        };
        var fl_change = {
            field: 'change',
            type: 'datetime',
            add: null,
            edit: null,
            name: null,
            label: null,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: null,
            col: null,
            size: null,
        };
        var fl_change_user = {
            field: 'change_user',
            type: 'string',
            add: null,
            edit: null,
            name: null,
            label: null,
            control: null,
            list: null,
            select: null,
            update: null,
            close: null,
            add_validation: null,
            edit_validation: null,
            default: null,
            row: null,
            col: null,
            size: null,
        };
        var fields = [];
        fields.push(fl_id)
        fields.push(fl_park_name_ru)
        fields.push(fl_park_name_en)
        fields.push(fl_park_abbr_ru)
        fields.push(fl_park_abbr_en)
        fields.push(fl_create)
        fields.push(fl_create_user)
        fields.push(fl_change)
        fields.push(fl_change_user);
        // Инициализируем форму
        this.modal_edit_form.init({
            fields_form: fields,
            alert: true,
            title: "Править оператора",
            size: "xl",
            fn_ok: function (data) {
                this.save(data);
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
                        $('td.color', row).attr('style', 'background-color:' + data.color)
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
                            this.modal_edit_form.view(null);
                        }.bind(this),
                        enabled: true
                    },
                    {
                        text: langView('title_button_edit', App.Langs),
                        action: function (e, dt, node, config) {
                            this.modal_edit_form.view(this.select_row_operation);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_del', App.Langs),
                        action: function (e, dt, node, config) {
                            this.delete();
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
        }

    };
    // загрузить данные 
    table_dir_operators_wagons.prototype.load = function (update) {
        LockScreen(langView('mess_load_operators', App.Langs));
        if (update) {
            this.load_db(['operators_wagons'], true, function (result) {
                this.select_row_operation = null;
                this.view(this.ids_dir.list_operators_wagons);
                LockScreenOff();
            }.bind(this));
        } else {
            this.view(this.ids_dir.list_operators_wagons!==null ? this.ids_dir.list_operators_wagons: []);
        }


    };
    // Обновить данные
    table_dir_operators_wagons.prototype.update = function () {
        this.load();
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
    // Удалить объект из базы данных
    table_dir_operators_wagons.prototype.delete = function () {
        this.out_clear();
        if (this.select_row_operation !== null) {
            this.modal_confirm_form.view('Удалить', 'Удалить выбранный парк [' + this.select_row_operation['park_name_' + App.Lang] + '] ?', function (result) {
                if (result) {
                    // Выполнить
                    LockScreen(langView('mess_operation_dir_park', App.Langs));
                    this.ids_dir.deleteParkWays(this.select_row_operation.id, function (result) {
                        if (result > 0) {
                            this.update();
                            this.out_clear();
                            this.out_info("Парк - удален!");
                        } else {
                            this.out_error("Ошибка, выполнения операции 'Удалить парк', код ошибки : " + result);
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    // Отмена
                    this.out_warning("Операция 'Удалить парк' – отменена");
                }
            }.bind(this));
        } else {
            this.out_warning("Операция 'Удалить парк' – отменена, выберите парк");
        };
    };
    // Сохранить объект
    table_dir_operators_wagons.prototype.save = function (data) {
        this.out_clear();
        if (data && !data.old) {
            // Добавить 
            this.insert(data.new);
        } else {
            // Править
            this.edit(data.new, data.old.id);
        };
    };
    // Добавить объект
    table_dir_operators_wagons.prototype.insert = function (data) {
        // Проверим есть такой парк
        var park = this.ids_dir.list_park_ways.find(function (o) {
            return o['park_name_' + App.Lang] === $.trim(data['park_name_' + App.Lang]);
        });
        if (park) {
            this.modal_edit_form.set_object_error('park_name_' + App.Lang, 'add', 'Парк с таким названием уже существует, id строки =' + park.id);
        } else {
            // Добавить
            LockScreen(langView('mess_operation_dir_park', App.Langs));
            this.ids_dir.postParkWays(data, function (result) {
                if (result > 0) {
                    this.modal_edit_form.close(); // закроем форму
                    this.update();
                    this.out_clear();
                    this.out_info("Новый парк - добавлен");
                } else {
                    LockScreenOff();
                    this.modal_edit_form.out_error('При добавлении парка произошла ошибка, код ошибки : ' + result);
                }
            }.bind(this));
        };
    };
    // Изменить объект
    table_dir_operators_wagons.prototype.edit = function (data, id_old) {
        // Выполнить править
        this.out_clear();
        if (data) {
            // Проверим есть такой парк
            var park = this.ids_dir.list_park_ways.find(function (o) {
                return o['park_name_' + App.Lang] === $.trim(data['park_name_' + App.Lang]);
            });
            if (park && data.id !== park.id) {
                this.modal_edit_form.set_object_error('park_name_' + App.Lang, 'edit', 'Парк с таким названием уже существует, id строки =' + park.id);
            } else {
                this.modal_edit_form.close(); // закроем форму
                this.modal_confirm_form.view('Править', 'Подтвердите правку парка, данная операция может затронуть несколько станций, править парк?', function (result) {
                    if (result) {
                        // Выполнить
                        LockScreen(langView('mess_operation_dir_park', App.Langs));
                        this.ids_dir.putParkWays(data, function (result) {
                            if (result > 0) {

                                this.update();
                                this.out_info("Парк - обновлен");
                            } else {
                                LockScreenOff();
                                this.modal_edit_form.out_error('При обновлении парка произошла ошибка, код ошибки : ' + result);
                            }
                        }.bind(this));
                    } else {
                        // Отмена
                        this.out_warning("Операция 'Обновить парк' – отменена");
                    }
                }.bind(this));
            }
        };

    };

    App.table_dir_operators_wagons = table_dir_operators_wagons;

    window.App = App;
})(window);