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
            field: 'dir_park_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
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
    // инициализация полей таблицы вагоны на начальном пути
    table_dir_park_station.prototype.init_columns = function () {
        var collums = [];

        collums.push('dir_park_id');
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
            fn_db_update: function (list) {
                this.load_db(list, true, function (result) {
                    this.update_element(result)
                });
            }.bind(this),
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new IDS_DIRECTORY();
        // Списки для отображения
        this.list_station = null;       // Список станций для отображения
        this.list_ways = null;          // Список путей для отображения
        this.list_park = null;          // Список путей для отображения

        //
        LockScreen(langView('mess_init_dir_park', App.Langs));
        var MCF = App.modal_confirm_form;
        var modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        modal_confirm_form.init();

        // Инициализация формы для правки полей
        var MEF = App.modal_edit_form;
        this.modal_edit_form = new MEF('mfe-' + this.selector); // Создадим экземпляр формы правки строк таблицы

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station', 'ways', 'park_ways'], false, function (result) {
            // Определим списки для полей
            //// Получим список станций для отображения
            //this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
            //// Функция получения списка парков по указаной станции
            //var get_list_park = function (id_statation) {
            //    this.list_park = [];
            //    var list_way = this.ids_dir.list_ways.filter(function (i) {
            //        return i.id_station == id_statation;
            //    });
            //    $.each(list_way, function (i, el) {
            //        var pw = el.Directory_ParkWays
            //        var park = this.list_park.find(function (o) {
            //            return o.value === pw.id;
            //        });
            //        if (!park) {
            //            this.list_park.push({ value: pw.id, text: pw['park_name_' + App.Lang] });
            //        }
            //    }.bind(this));
            //    return this.list_park;
            //}.bind(this);
            //this.list_divisions = this.ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);

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
            var fl_position_park = {
                field: 'position_park',
                type: 'number',
                add: 'number',
                edit: 'number',
                name: 'position',
                label: 'Поз.',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'range_number',
                    min: 1,
                    max: 100,
                    error: 'Позиция пути должна быть в диапазоне от 1 до 100',
                    ok: null,
                }],
                edit_validation: [
                    {
                        check_type: 'range_number',
                        min: 1,
                        max: 100,
                        error: 'Позиция пути должна быть в диапазоне от 1 до 100',
                        ok: null,
                    },
                ],
                default: 1,
                row: 4,
                col: 1,
                size: 2,
            };
            var fl_park_name_ru = {
                field: 'park_name_ru',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'park_name_ru',
                label: 'Название парка (рус.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название парка (рус)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название парка (рус)',
                    ok: null,
                }],
                default: null,
                row: 2,
                col: 2,
                size: 6,
            };
            var fl_park_name_en = {
                field: 'park_name_en',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'park_name_en',
                label: 'Название парка (анг.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название парка (анг)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название парка (анг)',
                    ok: null,
                }],
                default: null,
                row: 2,
                col: 2,
                size: 6,
            };
            var fl_park_abbr_ru = {
                field: 'park_abbr_ru',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'park_abbr_ru',
                label: 'Крат. назв. парка (рус.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру парка (рус)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру парка (рус)',
                    ok: null,
                }],
                default: null,
                row: 2,
                col: 3,
                size: 4,
            };
            var fl_park_abbr_en = {
                field: 'park_abbr_en',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'park_abbr_en',
                label: 'Крат. назв. парка (анг.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру парка (анг)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру парка (анг)',
                    ok: null,
                }],
                default: null,
                row: 3,
                col: 3,
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
            fields.push(fl_position_park)
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
                title: "Править путь",
                size: "xl",
                fn_ok: function (data) {
                    this.out_clear();
                    if (data && !data.old) {
                        // Добавить 
                        LockScreen(langView('mess_operation_dir_park', App.Langs));
                        this.ids_dir.postOperationInsertWayOfPark(data.new, function (result) {
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
                    } else {
                        //
                        if (data.new && data.new.way_delete !== null && data.new.position_way > 0) {
                            // Ошибка
                            //this.modal_edit_form.out_error('Если путь имеет признак – удален, тогда позиция пути должна быть (0)');
                            this.modal_edit_form.set_object_error('way_delete', 'edit', 'Путь имеет признак – удален, позиция пути должна быть (0)');
                            this.modal_edit_form.set_object_error('position_way', 'edit', 'Путь имеет признак – удален, позиция пути должна быть (0)');
                        } else {
                            // Выполнить править
                            var operation = {
                                way: data.new,
                                user: App.User_Name,
                            };
                            LockScreen(langView('mess_operation_dir_park', App.Langs));
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
                    }
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
                    // Удалили
                    if (data.way_close) {
                        $(row).addClass('yellow');
                    }
                    if (data.way_delete) {
                        $(row).addClass('red');
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
                            this.out_clear();
                            if (App.Select_Row_ways !== null) {
                                modal_confirm_form.view('Удалить', 'Удалить выбранный путь [' + App.Select_Row_ways['way_num_' + App.Lang] + ' - ' + App.Select_Row_ways['way_name_' + App.Lang] + '] ?', function (result) {
                                    if (result) {
                                        // Выполнить
                                        var operation = {
                                            id_way: App.Select_Row_ways.id,
                                            user: App.User_Name,
                                        };
                                        LockScreen(langView('mess_operation_dir_park', App.Langs));
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

                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_up', App.Langs),
                        action: function (e, dt, node, config) {
                            this.out_clear();
                            var id_park = App.Select_Row_ways ? App.Select_Row_ways.id : null;
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
                                    }
                                }.bind(this));
                            } else {
                                this.out_clear();
                                if (this.id_station === null) {
                                    this.out_error("Ошибка, выполнения операции изменения позиции парка, станция не определена");
                                }
                                if (id_park === null) {
                                    this.out_error("Ошибка, выполнения операции изменения позиции парка, парк не определен");
                                }
                            }
                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_dn', App.Langs),
                        action: function (e, dt, node, config) {
                            this.out_clear();
                            var id_park = App.Select_Row_ways ? App.Select_Row_ways.id : null;
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
                                    }
                                }.bind(this));
                            } else {
                                this.out_clear();
                                if (this.id_station === null) {
                                    this.out_error("Ошибка, выполнения операции изменения позиции парка, станция не определена");
                                }
                                if (id_park === null) {
                                    this.out_error("Ошибка, выполнения операции изменения позиции парка, парк не определен");
                                }
                            }
                        }.bind(this),
                        enabled: false
                    },
                    {
                        text: langView('title_button_auto', App.Langs),
                        action: function (e, dt, node, config) {
                            this.out_clear();
                            modal_confirm_form.view('Выполнить', 'Выполнить автоматическую коррекцию парков станции?', function (result) {
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
                    this.obj_t_park.button(2).enable(true);
                    this.obj_t_park.button(3).enable(!(row && row.way_delete));
                    this.obj_t_park.button(4).enable(!(row && row.way_delete));
                    this.obj_t_park.button(5).enable(!(row && row.way_delete));
                    App.Select_Row_ways = row;
                } else {
                    this.obj_t_park.button(2).enable(false);
                    this.obj_t_park.button(3).enable(false);
                    this.obj_t_park.button(4).enable(false);
                    this.obj_t_park.button(5).enable(false);
                    App.Select_Row_ways = null;
                }
            }.bind(this));
            //----------------------------------
            if (typeof fn_init_ok === 'function') {
                fn_init_ok();
            }
            //----------------------------------
        }.bind(this));
    };
    // Показать данные 
    table_dir_park_station.prototype.view = function (data) {
        this.obj_t_park.clear();
        this.obj_t_park.rows.add(data);
        this.obj_t_park.order([1, 'asc']);
        if (App.Select_Row_ways !== null) {
            this.obj_t_park.row('#' + App.Select_Row_ways.id).select();
        }
        this.obj_t_park.draw();
    };
    // загрузить данные 
    table_dir_park_station.prototype.load_of_station = function (id_station) {
        LockScreen(langView('mess_load_dir_park', App.Langs));
        this.ids_dir.getParkStationOfStationID(id_station, function (parks) {
            this.id_station = id_station;
            this.modal_edit_form.set_default_fields_form('id_station', this.id_station);
            App.Select_Row_ways = null;
            this.view(parks);
            LockScreenOff();
        }.bind(this));
    };
    // Обновить данные
    table_dir_park_station.prototype.update = function () {
        if (this.id_station) {
            LockScreen(langView('mess_load_dir_park', App.Langs));
            this.ids_dir.getParkStationOfStationID(this.id_station, function (ways) {
                this.view(ways);
                LockScreenOff();
            }.bind(this));
        }

    };
    // Обновить компоненты если обновлена база
    table_dir_park_station.prototype.update_element = function (list) {
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

    App.table_dir_park_station = table_dir_park_station;

    window.App = App;
})(window);