/// <reference path="../shared/modal_confirm_form.js" />
/// <reference path="../shared/modal_edit_form.js" />

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
            'field_id': 'id строки',
            'field_link_ways': 'Кол. путей',
            'field_park_name': 'Название парка',
            'field_park_abbr': 'Краткое название',
            'field_create': 'Строка создана',
            'field_change': 'Строка обновлена',

            'tytle_yes': 'Да',
            'tytle_no': 'Нет',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'title_button_add': 'Добавить',
            'title_button_edit': 'Править',
            'title_button_del': 'Удалить',
            'title_button_auto': 'Авто-коррекция',

            'mess_load_dir_park': 'Загружаю справочник парков...',
            'mess_operation_dir_park': 'Выполняю операцию...',
            'mess_init_dir_park': 'Выполняю инициализацию модуля справочника парков...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_link_ways': ' Count. ways',
            'field_park_name': 'Park name',
            'field_park_abbr': 'Short name',
            'field_create': 'String created',
            'field_change': 'String updated',

            'tytle_yes': 'Yes',
            'tytle_no': 'No',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'title_button_add': 'Add',
            'title_button_edit': 'Edit',
            'title_button_del': 'Remove',
            'title_button_auto': 'Auto-correction',

            'mess_load_dir_park': 'Loading the parks directory ...',
            'mess_operation_dir_park': 'Performing an operation ...',
            'mess_init_dir_park': 'I am initializing the parks directory module ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var IDS_DIRECTORY = App.ids_directory;

    // Создать основу
    function table_park(base) {
        var $div_table = $('<table></table>', {
            'id': base.selector + '-table',
            'class': 'display compact cell-border row-border hover',
            'style': 'width:100%;'
        });
        this.$element = $div_table;
    };
    // Перечень полей
    var list_collums = [

        {
            field: 'dir_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_link_ways',
            data: function (row, type, val, meta) {
                var ways = row.Directory_Ways ? row.Directory_Ways : null;
                return ways ? ways.length : 0;
            },
            className: 'dt-body-center',
            title: langView('field_link_ways', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_park_name',
            data: function (row, type, val, meta) {
                return row ? row['park_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_park_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'dir_park_abbr',
            data: function (row, type, val, meta) {
                return row ? row['park_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_park_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'dir_park_create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + getReplaceTOfDT(row.create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'dir_park_change',
            data: function (row, type, val, meta) {
                return row.change ? (row.change_user + '<br />[' + getReplaceTOfDT(row.change) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_change', App.Langs), width: "100px", orderable: false, searchable: false
        },

    ];
    //
    function table_dir_park_ways(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$dir_park = $(selector);
        if (this.$dir_park.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$dir_park.attr('id');
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_dir_park_ways.prototype.init_columns = function () {
        var collums = [];

        collums.push('dir_id');
        collums.push('dir_link_ways');
        collums.push('dir_park_name');
        collums.push('dir_park_abbr');
        collums.push('dir_park_create');
        collums.push('dir_park_change');
        return init_columns(collums, list_collums);
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    table_dir_park_ways.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация таблицы справочника путей
    table_dir_park_ways.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new IDS_DIRECTORY();
        //
        LockScreen(langView('mess_init_dir_park', App.Langs));
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
            title: "Править парк",
            size: "xl",
            fn_ok: function (data) {
                this.save(data);
            }.bind(this),
        });
        //----------------------------------
        // Создать макет таблицы
        var tableElement = new table_park(this);
        this.$dir_park.empty();
        this.$t_park = tableElement.$element;
        this.$dir_park.append(this.$t_park);
        // Инициализируем таблицу
        this.obj_t_park = this.$t_park.DataTable({
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
                // Неиспользуются
                if ((!data.Directory_Ways) || (data.Directory_Ways && data.Directory_Ways.length == 0)) {
                    $(row).addClass('yellow');
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
                        this.modal_edit_form.view(App.Select_Row_ways);
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
            var selected = this.obj_t_park.rows({ selected: true })[0].length > 0 ? true : false;
            var row = this.obj_t_park.rows(indexes).data().toArray()[0];
            if (selected) {
                this.obj_t_park.button(2).enable(true);
                this.obj_t_park.button(3).enable((!row.Directory_Ways || (row && row.Directory_Ways.length == 0)));
                App.Select_Row_ways = row;
            } else {
                this.obj_t_park.button(2).enable(false);
                this.obj_t_park.button(3).enable(false);
                App.Select_Row_ways = null;
            }
        }.bind(this));
        //----------------------------------
        if (typeof fn_init_ok === 'function') {
            fn_init_ok();
        }
        //----------------------------------
    };
    // Показать данные 
    table_dir_park_ways.prototype.view = function (data) {
        this.obj_t_park.clear();
        this.obj_t_park.rows.add(data);
        if (App.Select_Row_ways !== null) {
            this.obj_t_park.row('#' + App.Select_Row_ways.id).select();
        }
        this.obj_t_park.draw();
    };
    // загрузить данные 
    table_dir_park_ways.prototype.load = function () {
        LockScreen(langView('mess_load_dir_park', App.Langs));
        this.load_db(['park_ways'], true, function (result) {
            App.Select_Row_ways = null;
            this.view(this.ids_dir.list_park_ways);
            LockScreenOff();
        }.bind(this));
    };
    // Обновить данные
    table_dir_park_ways.prototype.update = function () {
        this.load();
    };
    // Очистить сообщения
    table_dir_park_ways.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_dir_park_ways.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_dir_park_ways.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_dir_park_ways.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // Удалить объект из базы данных
    table_dir_park_ways.prototype.delete = function () {
        this.out_clear();
        if (App.Select_Row_ways !== null) {
            this.modal_confirm_form.view('Удалить', 'Удалить выбранный парк [' + App.Select_Row_ways['park_name_' + App.Lang] + '] ?', function (result) {
                if (result) {
                    // Выполнить
                    LockScreen(langView('mess_operation_dir_park', App.Langs));
                    this.ids_dir.deleteParkWays(App.Select_Row_ways.id, function (result) {
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
    table_dir_park_ways.prototype.save = function (data) {
        this.out_clear();
        if (data && !data.old) {
            // Добавить 
            this.insert(data.new);
        } else {
            // Править
            this.edit(data.new);
        };
    };
    // Добавить объект
    table_dir_park_ways.prototype.insert = function (data) {
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
    table_dir_park_ways.prototype.edit = function (data) {
        // Выполнить править
        this.out_clear();
        if (data) {
            // Проверим есть такой парк
            var park = this.ids_dir.list_park_ways.find(function (o) {
                return o['park_name_' + App.Lang] === $.trim(data['park_name_' + App.Lang]);
            });
            if (park) {
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

    App.table_dir_park_ways = table_dir_park_ways;

    window.App = App;
})(window);