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
            'field_count_ways': 'Кол. путей',
            'field_position_park': '№ поз.',
            'field_park_name': 'Название парка',
            'field_park_abbr': 'Краткое название',
            'field_create': 'Строка создана',
            'field_change': 'Строка обновлена',

            'tytle_yes': 'Да',
            'tytle_no': 'Нет',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'title_button_up': 'Вверх',
            'title_button_dn': 'Вниз',
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
            field: 'dir_park_details_control',
            className: 'details-control  details-control-park',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'dir_park_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_count_ways',
            data: function (row, type, val, meta) {
                return row.count_ways;
            },
            className: 'dt-body-center',
            title: langView('field_count_ways', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_position_park',
            data: function (row, type, val, meta) {
                return row.position_park;
            },
            className: 'dt-body-center',
            title: langView('field_position_park', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_park_name',
            data: function (row, type, val, meta) {
                return row ? row['park_name_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_park_name', App.Langs), width: "3000px", orderable: true, searchable: true
        },
        {
            field: 'dir_park_abbr',
            data: function (row, type, val, meta) {
                return row ? row['park_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_park_abbr', App.Langs), width: "200px", orderable: true, searchable: true
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
    // -------------- Конструктор -----------------------------------------
    function table_dir_park_station(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$dir_park = $(selector);
        if (this.$dir_park.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$dir_park.attr('id');
    }
    // --------------------------------------------------------------------
    // инициализация полей таблицы вагоны на начальном пути
    table_dir_park_station.prototype.init_columns = function () {
        var collums = [];
        if (this.settings.detali_ways) collums.push('dir_park_details_control');
        collums.push('dir_park_id');
        collums.push('dir_count_ways');
        collums.push('dir_position_park');
        collums.push('dir_park_name');
        collums.push('dir_park_abbr');
        collums.push('dir_park_create');
        collums.push('dir_park_change');
        return init_columns(collums, list_collums);
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    table_dir_park_station.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация таблицы справочника путей
    table_dir_park_station.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            detali_ways: false,
            fn_db_update: function (list) {
                this.load_db(list, true, function (result) {
                    this.update_element(result)
                }.bind(this));
            }.bind(this),
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new IDS_DIRECTORY();
        // Списки для отображения
        this.list_station = null;       // Список станций для отображения
        //this.list_ways = null;          // Список путей для отображения
        this.list_park = null;          // Список парков
        //
        this.select_row_park = null;    // Выбраная строка
        //
        this.td_ways = {};
        //
        LockScreen(langView('mess_init_dir_park', App.Langs));
        var MCF = App.modal_confirm_form
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        // Инициализация формы для правки полей
        var MEF = App.modal_edit_form;
        this.modal_edit_form = new MEF('mfe-' + this.selector); // Создадим экземпляр формы правки строк таблицы

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station', 'ways', 'park_ways'], false, function (result) {
            // Определим списки для полей
            // Получим список станций для отображения
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            this.list_park = this.ids_dir.getListParkWays('id', 'park_name', App.Lang);
            //// Определим поля
            //var fl_id = {
            //    field: 'id',
            //    type: 'number',
            //    add: null,
            //    edit: null,
            //    name: null,
            //    label: null,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: 0,
            //    row: null,
            //    col: null,
            //    size: null,
            //};
            //var fl_id_station = {
            //    field: 'id_station',
            //    type: 'number',
            //    add: 'select',
            //    edit: 'select',
            //    name: 'station',
            //    label: 'Станция',
            //    placeholder: 'Укажите станцию',
            //    maxlength: null,
            //    required: true,
            //    control: null,
            //    list: this.list_station,
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());

            //    },
            //    update: null,
            //    close: null,
            //    default: -1,
            //    row: 1,
            //    col: 1,
            //    size: 8,
            //};
            //var fl_position_park = {
            //    field: 'position_park',
            //    type: 'number',
            //    add: 'number',
            //    edit: 'number',
            //    name: 'position',
            //    label: 'Поз.',
            //    placeholder: 'Позиция',
            //    maxlength: null,
            //    min: 1,
            //    max: 100,
            //    required: true,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    default: 1,
            //    row: 1,
            //    col: 2,
            //    size: 4,
            //};
            //var fl_park = {
            //    field: 'park_name_' + App.Lang, // Сделал для того чтобы подтягивалось по полу имя с учетом региональной настройки
            //    type: 'number',
            //    add: 'autocomplete',
            //    edit: 'autocomplete',
            //    name: 'park',
            //    label: 'Парк',
            //    placeholder: 'Парк станции',
            //    maxlength: 100,
            //    required: true,
            //    control: null,
            //    list: this.list_park,
            //    select: null,
            //    update: null,
            //    close: null,
            //    default: null,
            //    button: null,
            //    row: 2,
            //    col: 1,
            //    size: 12,
            //};
            //var fl_create = {
            //    field: 'create',
            //    type: 'datetime',
            //    add: null,
            //    edit: null,
            //    name: null,
            //    label: null,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: moment().format("YYYY-MM-DDThh:mm:ss"), //.utc().toISOString(),
            //    row: null,
            //    col: null,
            //    size: null,
            //};
            //var fl_create_user = {
            //    field: 'create_user',
            //    type: 'string',
            //    add: null,
            //    edit: null,
            //    name: null,
            //    label: null,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: App.User_Name,
            //    row: null,
            //    col: null,
            //    size: null,
            //};
            //var fl_change = {
            //    field: 'change',
            //    type: 'datetime',
            //    add: null,
            //    edit: null,
            //    name: null,
            //    label: null,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: null,
            //    row: null,
            //    col: null,
            //    size: null,
            //};
            //var fl_change_user = {
            //    field: 'change_user',
            //    type: 'string',
            //    add: null,
            //    edit: null,
            //    name: null,
            //    label: null,
            //    control: null,
            //    list: null,
            //    select: null,
            //    update: null,
            //    close: null,
            //    add_validation: null,
            //    edit_validation: null,
            //    default: null,
            //    row: null,
            //    col: null,
            //    size: null,
            //};
            //var fields = [];
            //fields.push(fl_id)
            //fields.push(fl_id_station)
            //fields.push(fl_position_park)
            //fields.push(fl_park)
            //fields.push(fl_create)
            //fields.push(fl_create_user)
            //fields.push(fl_change)
            //fields.push(fl_change_user);
            //// Инициализируем форму
            //this.modal_edit_form.init({
            //    fields_form: fields,
            //    alert: true,
            //    title: "Править",
            //    size: "lg",
            //    fn_ok: function (data) {
            //        this.save(data);
            //    }.bind(this),
            //});
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
                    // Отобразим птей нет
                    if (!data.count_ways || data.count_ways.length === 0) {
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
                                sheetName: 'Вагоны на пути',
                                messageTop: function () {
                                    return '';
                                }
                            },
                        ],
                        autoClose: true
                    },
                    //{
                    //    text: langView('title_button_add', App.Langs),
                    //    action: function (e, dt, node, config) {
                    //        this.modal_edit_form.view(null);
                    //    }.bind(this),
                    //    enabled: true
                    //},
                    //{
                    //    text: langView('title_button_edit', App.Langs),
                    //    action: function (e, dt, node, config) {
                    //        this.modal_edit_form.view(this.select_row_park);
                    //    }.bind(this),
                    //    enabled: false
                    //},
                    //{
                    //    text: langView('title_button_del', App.Langs),
                    //    action: function (e, dt, node, config) {
                    //        this.out_clear();
                    //        if (this.select_row_park !== null) {
                    //            this.modal_confirm_form.view('Удалить', 'Удалить выбранный путь [' + this.select_row_park['way_num_' + App.Lang] + ' - ' + this.select_row_park['way_name_' + App.Lang] + '] ?', function (result) {
                    //                if (result) {
                    //                    // Выполнить
                    //                    var operation = {
                    //                        id_way: this.select_row_park.id,
                    //                        user: App.User_Name,
                    //                    };
                    //                    LockScreen(langView('mess_operation_dir_park', App.Langs));
                    //                    this.ids_dir.postOperationDeleteWayOfPark(operation, function (result) {
                    //                        if (result > 0) {
                    //                            this.update();
                    //                            this.out_clear();
                    //                            this.out_info("Путь - удален!");
                    //                            this.settings.fn_db_update(['ways']);
                    //                        } else {
                    //                            this.out_error("Ошибка, выполнения операции 'Удалить путь', код ошибки : " + result);
                    //                            LockScreenOff();
                    //                        }
                    //                    }.bind(this));

                    //                } else {
                    //                    // Отмена
                    //                    this.out_warning("Операция 'Удалить путь' – отменена");
                    //                }
                    //            }.bind(this));
                    //        } else {

                    //        }

                    //    }.bind(this),
                    //    enabled: false
                    //},
                    {
                        text: langView('title_button_up', App.Langs),
                        action: function (e, dt, node, config) {
                            this.up();
                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_dn', App.Langs),
                        action: function (e, dt, node, config) {
                            this.down();
                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_auto', App.Langs),
                        action: function (e, dt, node, config) {
                            this.auto();
                        }.bind(this),
                        enabled: true
                    },
                    {
                        extend: 'pageLength',
                    }

                ]
            }).on('select deselect', function (e, dt, type, indexes) {
                var selected = this.obj_t_park.rows({ selected: true })[0].length > 0 ? true : false;
                var row = this.obj_t_park.rows(indexes).data().toArray()[0];
                if (selected) {
                    //this.obj_t_park.button(2).enable(true);
                    //this.obj_t_park.button(3).enable(!(row && row.way_delete));
                    //this.obj_t_park.button(4).enable(!(row && row.way_delete));
                    //this.obj_t_park.button(5).enable(!(row && row.way_delete));
                    this.obj_t_park.button(1).enable(!(row && row.way_delete));
                    this.obj_t_park.button(2).enable(!(row && row.way_delete));
                    this.select_row_park = row;
                } else {
                    //this.obj_t_park.button(2).enable(false);
                    //this.obj_t_park.button(3).enable(false);
                    //this.obj_t_park.button(4).enable(false);
                    //this.obj_t_park.button(5).enable(false);
                    this.obj_t_park.button(1).enable(false);
                    this.obj_t_park.button(2).enable(false);
                    this.select_row_park = null;
                }
            }.bind(this));
            if (this.settings.detali_ways) this.init_detali();
            //----------------------------------
            if (typeof fn_init_ok === 'function') {
                fn_init_ok();
            }
            //----------------------------------
        }.bind(this));
    };
    // Очистить объект
    table_dir_park_station.prototype.destroy = function () {
        this.modal_confirm_form.destroy();
        this.modal_edit_form.destroy();
        this.obj_t_park.destroy();
        this.$dir_park.empty(); // empty in case the columns change
    }
    // Показать данные 
    table_dir_park_station.prototype.view = function (data) {
        this.obj_t_park.clear();
        this.obj_t_park.rows.add(data);
        this.obj_t_park.order([(this.settings.detali_ways ? 3 : 2), 'asc']);
        if (this.select_row_park !== null) {
            this.obj_t_park.row('#' + this.select_row_park.id).select();
        }
        this.obj_t_park.draw();
        if (this.settings.detali_ways) {
            this.destroy_all_detali()
        }
    };
    // загрузить данные 
    table_dir_park_station.prototype.load_of_station = function (id_station) {
        this.out_clear();
        LockScreen(langView('mess_load_dir_park', App.Langs));
        this.ids_dir.getParkStationOfStationID(id_station, function (parks) {
            this.id_station = id_station;
            this.modal_edit_form.set_default_fields_form('id_station', this.id_station);
            this.select_row_park = null;
            this.view(parks);
            LockScreenOff();
        }.bind(this));
    };
    // Обновить данные
    table_dir_park_station.prototype.update = function () {
        this.out_clear();
        if (this.id_station) {
            var td_ways = this.td_ways;
            LockScreen(langView('mess_load_dir_park', App.Langs));
            this.ids_dir.getParkStationOfStationID(this.id_station, function (ways) {
                this.view(ways);
                // Открыть детали если есть
                if (this.settings.detali_ways) {
                    $.each(td_ways, function (i, el) {
                        if (el) {
                            var tr = $('tr#' + el.id_park);
                            if (tr && tr.length > 0) {
                                this.detali_select_row(tr);
                            }

                        }
                    }.bind(this));
                };
                LockScreenOff();
            }.bind(this));
        }
    };
    // Обновить компоненты если обновлена база
    table_dir_park_station.prototype.update_element = function (list) {
        if (list) {
            if ($.inArray("station", list) >= 0) {
                //Обновился
                //this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
                //this.modal_edit_form.update_list_fields_form('id_station', this.list_station);

            };
            if ($.inArray("ways", list) >= 0) {
                //Обновился при выборе станции
            };
        };
    };
    // --------------------------------------------------------------------
    // Очистить сообщения
    table_dir_park_station.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_dir_park_station.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_dir_park_station.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_dir_park_station.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //---------- Правка парков
    // Up Объект
    table_dir_park_station.prototype.up = function () {
        this.out_clear();
        var id_park = this.select_row_park ? this.select_row_park.id : null;
        if (this.id_station && id_park) {
            var operation = {
                id_station: this.id_station,
                id_park: id_park,
                user: App.User_Name,
            };
            LockScreen(langView('mess_operation_dir_park', App.Langs));
            this.ids_dir.postOperationUp1PositionParkOfStation(operation, function (result) {
                if (result > 0) {
                    this.update();
                    this.out_info("Парк перенесен на позицию верх");
                } else {
                    this.out_error("Ошибка, выполнения операции 'перенос на позицию вверх', код ошибки : " + result);
                    LockScreenOff();
                };
            }.bind(this));
        } else {
            this.out_clear();
            if (this.id_station === null) {
                this.out_error("Ошибка, выполнения операции изменения позиции парка, станция не определена");
            }
            if (id_park === null) {
                this.out_error("Ошибка, выполнения операции изменения позиции парка, парк не определен");
            };
        };
    };
    // Down Объект
    table_dir_park_station.prototype.down = function () {
        this.out_clear();
        var id_park = this.select_row_park ? this.select_row_park.id : null;
        if (this.id_station && id_park) {
            var operation = {
                id_station: this.id_station,
                id_park: id_park,
                user: App.User_Name,
            };
            LockScreen(langView('mess_operation_dir_park', App.Langs));
            this.ids_dir.postOperationDown1PositionParkOfStation(operation, function (result) {
                if (result > 0) {
                    this.update();
                    this.out_info("Парк перенесен на позицию вниз");
                } else {
                    this.out_error("Ошибка, выполнения операции 'Перенос на позицию вниз', код ошибки : " + result);
                    LockScreenOff();
                };
            }.bind(this));
        } else {
            this.out_clear();
            if (this.id_station === null) {
                this.out_error("Ошибка, выполнения операции изменения позиции парка, станция не определена");
            }
            if (id_park === null) {
                this.out_error("Ошибка, выполнения операции изменения позиции парка, парк не определен");
            };
        };
    };
    // Авто Объект
    table_dir_park_station.prototype.auto = function () {
        this.out_clear();
        this.modal_confirm_form.view('Выполнить', 'Выполнить автоматическую коррекцию парков станции?', function (result) {
            if (result) {
                // Выполнить 
                if (this.id_station) {
                    var operation = {
                        id_station: this.id_station,
                        user: App.User_Name,
                    };
                    LockScreen(langView('mess_operation_dir_park', App.Langs));
                    this.ids_dir.posOperationAutoPositionParkOfStation(operation, function (result) {
                        if (result > 0) {
                            this.update();
                            this.out_info("Автоматическая коррекция парков – выполнена! Обновленно :" + result + " записей");
                        } else {
                            this.out_error("Ошибка, выполнения операции автоматической коррекции парков, код ошибки : " + result);
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    this.out_error("Автоматическая коррекция парков – отклонена не определена станция [" + this.id_station + "]");
                    LockScreenOff();
                };
            } else {
                // Отмена
                this.out_warning("Автоматическая коррекция парков – отменена");
            }
        }.bind(this));
    };
    // Сохранить объект
    table_dir_park_station.prototype.save = function (data) {
        //this.out_clear();
        //if (data.new && !data.new['park_name_' + App.Lang]) {
        //    if (data.old) {
        //        this.modal_edit_form.set_object_error('park_name_' + App.Lang, 'edit', 'Указанного парка нет в справочнике ИДС ТД');
        //    } else {
        //        this.modal_edit_form.set_object_error('park_name_' + App.Lang, 'add', 'Указанного парка нет в справочнике ИДС ТД');
        //    }
        //} else {
        //    if (data && !data.old) {
        //        // Добавить 
        //        this.insert(data.new);
        //    } else {
        //        // Править
        //        this.edit(data.new);
        //    };
        //}


    };
    // Добавить объект
    table_dir_park_station.prototype.insert = function (data) {
        //// Проверим есть такой парк
        //var park = this.ids_dir.list_park_ways.find(function (o) {
        //    return o['park_name_' + App.Lang] === $.trim(data['park_name_' + App.Lang]);
        //});
        //if (park) {
        //    this.modal_edit_form.set_object_error('park_name_' + App.Lang, 'add', 'Парк с таким названием уже существует, id строки =' + park.id);
        //} else {
        //    // Добавить
        //    LockScreen(langView('mess_operation_dir_park', App.Langs));
        //    this.ids_dir.postParkWays(data, function (result) {
        //        if (result > 0) {
        //            this.modal_edit_form.close(); // закроем форму
        //            this.update();
        //            this.out_clear();
        //            this.out_info("Новый парк - добавлен");
        //        } else {
        //            LockScreenOff();
        //            this.modal_edit_form.out_error('При добавлении парка произошла ошибка, код ошибки : ' + result);
        //        }
        //    }.bind(this));
        //};
    };
    // Изменить объект
    table_dir_park_station.prototype.edit = function (data) {
        //// Выполнить править
        //this.out_clear();
        //if (data) {
        //    // Проверим есть такой парк
        //    var park = this.ids_dir.list_park_ways.find(function (o) {
        //        return o['park_name_' + App.Lang] === $.trim(data['park_name_' + App.Lang]);
        //    });
        //    if (park) {
        //        this.modal_edit_form.set_object_error('park_name_' + App.Lang, 'edit', 'Парк с таким названием уже существует, id строки =' + park.id);
        //    } else {
        //        this.modal_edit_form.close(); // закроем форму
        //        this.modal_confirm_form.view('Править', 'Подтвердите правку парка, данная операция может затронуть несколько станций, править парк?', function (result) {
        //            if (result) {
        //                // Выполнить
        //                LockScreen(langView('mess_operation_dir_park', App.Langs));
        //                this.ids_dir.putParkWays(data, function (result) {
        //                    if (result > 0) {

        //                        this.update();
        //                        this.out_info("Парк - обновлен");
        //                    } else {
        //                        LockScreenOff();
        //                        this.modal_edit_form.out_error('При обновлении парка произошла ошибка, код ошибки : ' + result);
        //                    }
        //                }.bind(this));
        //            } else {
        //                // Отмена
        //                this.out_warning("Операция 'Обновить парк' – отменена");
        //            }
        //        }.bind(this));
        //    }
        //};
    };
    // --------  Детально пути
    table_dir_park_station.prototype.detali_select_row = function (tr) {
        var row = this.obj_t_park.row(tr);
        // Проверим, строка определена
        if (row && row.length > 0) {
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                this.destroy_detali(row.data());
                tr.removeClass('shown');
            }
            else {
                //row.child('<div class="detali-operation"><div class="row"><div class="col-xl-12 operator-detali-tables"><table class="display compact cell-border row-border hover" id="wir-detali-' + row.data().id + '" style="width:100%;"></table></div></div></div>').show();
                row.child('<div class="detali-operation">' +
                    //'<div class="row">' +
                    //'<div class="col-xl-12">' +
                    '<div class="card border-primary ">' +
                    '<div class="card-header">Пути парка</div>' +
                    '<div class="card-body table-directory">' +
                    '<div class="row">' +
                    '<div class="col-xl-12 ">' +

                    '<div class="container-fluid">' +
                    '<div id="' + this.selector + '-wd-' + row.data().id + '"></div>' +
                    '</div>' +

                    //'<table class="display compact cell-border row-border hover" id="' + this.selector + '-wd-' + row.data().id + '" style="width:100%"></table>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    //'</div>' +
                    //'</div>' +
                    '</div>').show();

                // Инициализируем
                this.view_detali(row.data());
                tr.addClass('shown');
            }
        }
    };

    // Инициализация таблицы детально
    table_dir_park_station.prototype.init_detali = function () {
        var base = this;
        this.$t_park.find('tbody')
            .on('click', 'td.details-control-park', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var tr = $(e.currentTarget).closest('tr');
                this.detali_select_row(tr);
            }.bind(this));
    };
    // Показать детали
    table_dir_park_station.prototype.view_detali = function (data) {
        var base = this;
        var TDWAY = App.table_dir_way;
        var sl = 'div#' + this.selector + '-wd-' + data.id;
        this.td_ways[data.id] = new TDWAY(sl); // Создадим экземпляр таблицы
        this.td_ways[data.id].init({
            alert: this.settings.alert,
            ids_dir: this.ids_dir,
            //--
            fn_db_update: function (list) {
                base.settings.fn_db_update(list);
                // Обновим таблицы в модуле table_dir_park_station
                //base.load_db(list, true, function (result) {
                //    var res_global = result;
                //    //update_park();
                //    // Обновим таблицы в модуле
                //    this.load_db(list, false, function (result) {
                //        var list = null;
                //        if (res_global) {
                //            list = $.merge(res_global, result);
                //        }
                //        else {
                //            list = result
                //        };
                //        // Обновим списочные компоненты в модуле, в зависимости от результата обновления
                //        this.update_element(list);
                //    }.bind(this));
                //}.bind(this));
            }.bind(this.td_ways[data.id]),
            //--
        }, function () {
            this.td_ways[data.id].load_of_station_park(this.id_station, data.id);
        }.bind(this));
    };
    // Очистить детали по указаному пути
    table_dir_park_station.prototype.destroy_detali = function (data) {
        if (this.td_ways[data.id]) {
            this.td_ways[data.id].destroy();
            delete this.td_ways[data.id];
        }
    };
    // Очистить все детали
    table_dir_park_station.prototype.destroy_all_detali = function () {
        $.each(this.td_ways, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.td_ways = {};
    };
    //
    App.table_dir_park_station = table_dir_park_station;

    window.App = App;
})(window);