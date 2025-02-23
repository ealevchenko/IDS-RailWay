﻿/// <reference path="../shared/modal_confirm_form.js" />
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
            'field_station': 'Станция',
            'field_park': 'Парк',
            'field_way_position': '№ поз.',
            'field_way_num': '№ пути',
            'field_way_name': 'Название пути',
            'field_way_abbr': 'Краткое название',
            'field_capacity': 'Вместимость',
            'field_deadlock': 'Тупик',
            'field_crossing_uz': 'Выход на УЗ',
            'field_crossing_amkr': 'Выход на АМКР',
            'field_devision': 'Подразделение',
            'field_dissolution': 'Путь роспуска',
            'field_output_dissolution': 'Выход на путь роспуска',
            'field_way_close': 'Путь закрыт',
            'field_way_delete': 'Путь удален',
            'field_note': 'Примечание',
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

            'mess_load_dir_way': 'Загружаю справочник путей...',
            'mess_operation_dir_way': 'Выполняю операцию...',
            'mess_init_dir_way': 'Выполняю инициализацию модуля справочника путей...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_station': 'Station',
            'field_park': 'Park',
            'field_way_position': 'Pos. no.',
            'field_way_num': 'Path #',
            'field_way_name': 'Path name',
            'field_way_abbr': 'Short name',
            'field_capacity': 'Capacity',
            'field_deadlock': 'Deadlock',
            'field_crossing_uz': 'Exit to UZ',
            'field_crossing_amkr': 'Exit to AMKR',
            'field_devision': 'Department',
            'field_dissolution': 'Dissolution path',
            'field_output_dissolution': 'Exit on the path of dissolution',
            'field_way_close': 'Path closed',
            'field_way_delete': 'Path deleted',
            'field_note': 'Note',
            'field_create': 'String created',
            'field_change': 'String updated',

            'tytle_yes': 'Yes',
            'tytle_no': 'No',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'title_button_up': 'Up',
            'title_button_dn': 'Down',
            'title_button_add': 'Add',
            'title_button_edit': 'Edit',
            'title_button_del': 'Remove',
            'title_button_auto': 'Auto-correction',

            'mess_load_dir_way': 'Loading path directory ...',
            'mess_operation_dir_way': 'Performing an operation ...',
            'mess_init_dir_way': 'Initializing the path directory module ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    /*    var ids_dir = new IDS_DIRECTORY(App.Lang);                // Создадим класс IDS_RWT*/
    var IDS_DIRECTORY = App.ids_directory;

    // Создать основу
    function table_way(base) {
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
            field: 'dir_way_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_way_station',
            data: function (row, type, val, meta) {
                var obj = row.Directory_Station ? row.Directory_Station : null;
                return obj ? obj['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'dir_way_park',
            data: function (row, type, val, meta) {
                var obj = row.Directory_ParkWays ? row.Directory_ParkWays : null;
                return obj ? obj['park_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_park', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'dir_way_position',
            data: function (row, type, val, meta) {
                return row.position_way;
            },
            className: 'dt-body-center',
            title: langView('field_way_position', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_way_num',
            data: function (row, type, val, meta) {
                return row ? row['way_num_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_way_num', App.Langs), width: "30px", orderable: true, searchable: true
        },
        {
            field: 'dir_way_name',
            data: function (row, type, val, meta) {
                return row ? row['way_name_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_way_name', App.Langs), width: "150px", orderable: true, searchable: true
        },
        {
            field: 'dir_way_abbr',
            data: function (row, type, val, meta) {
                return row ? row['way_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-left',
            title: langView('field_way_abbr', App.Langs), width: "50px", orderable: true, searchable: true
        },
        {
            field: 'dir_way_capacity',
            data: function (row, type, val, meta) {
                return row.capacity;
            },
            className: 'dt-body-center',
            title: langView('field_capacity', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_deadlock',
            data: function (row, type, val, meta) {
                return row.deadlock ? langView('tytle_yes', App.Langs) : null;
            },
            className: 'dt-body-center',
            title: langView('field_deadlock', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_crossing_uz',
            data: function (row, type, val, meta) {
                return row.crossing_uz ? langView('tytle_yes', App.Langs) : null;
            },
            className: 'dt-body-center',
            title: langView('field_crossing_uz', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_crossing_amkr',
            data: function (row, type, val, meta) {
                return row.crossing_amkr ? langView('tytle_yes', App.Langs) : null;
            },
            className: 'dt-body-center',
            title: langView('field_crossing_amkr', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_devision',
            data: function (row, type, val, meta) {
                var obj = row.Directory_Divisions ? row.Directory_Divisions : null;
                return obj ? obj['division_abbr_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_devision', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_dissolution',
            data: function (row, type, val, meta) {
                return row.dissolution ? langView('tytle_yes', App.Langs) : null;
            },
            className: 'dt-body-center',
            title: langView('field_dissolution', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_output_dissolution',
            data: function (row, type, val, meta) {
                return row.output_dissolution ? langView('tytle_yes', App.Langs) : null;
            },
            className: 'dt-body-center',
            title: langView('field_output_dissolution', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_close',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.way_close);
            },
            className: 'dt-body-center',
            title: langView('field_way_close', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_delete',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.way_delete);
            },
            className: 'dt-body-center',
            title: langView('field_way_delete', App.Langs), width: "50px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-left',
            title: langView('field_note', App.Langs), width: "300px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_create',
            data: function (row, type, val, meta) {
                return row.create ? (row.create_user + '<br />[' + getReplaceTOfDT(row.create) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_create', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'dir_way_change',
            data: function (row, type, val, meta) {
                return row.change ? (row.change_user + '<br />[' + getReplaceTOfDT(row.change) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_change', App.Langs), width: "100px", orderable: false, searchable: false
        },

    ];
    //
    function table_dir_way(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$dir_way = $(selector);
        if (this.$dir_way.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$dir_way.attr('id');
    }
    // инициализация полей таблицы вагоны на начальном пути
    table_dir_way.prototype.init_columns = function () {
        var collums = [];

        collums.push('dir_way_id');
        collums.push('dir_way_station');
        collums.push('dir_way_park');
        collums.push('dir_way_position');
        collums.push('dir_way_num');
        collums.push('dir_way_name');
        collums.push('dir_way_abbr');
        collums.push('dir_way_capacity');
        collums.push('dir_way_deadlock');
        collums.push('dir_way_crossing_uz');
        collums.push('dir_way_crossing_amkr');
        collums.push('dir_way_devision');
        collums.push('dir_way_dissolution');
        collums.push('dir_way_output_dissolution');
        collums.push('dir_way_close');
        collums.push('dir_way_delete');
        collums.push('dir_way_note');
        collums.push('dir_way_create');
        collums.push('dir_way_change');


        return init_columns(collums, list_collums);
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    table_dir_way.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация таблицы справочника путей
    table_dir_way.prototype.init = function (options, fn_init_ok) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_dir: null,
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
        this.list_ways = null;          // Список путей для отображения
        this.list_divisions = null;     // Список подразделений для отображения
        //
        this.select_row_ways = null;

        LockScreen(langView('mess_init_dir_way', App.Langs));
        var MCF = App.modal_confirm_form;
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        // Инициализация формы для правки полей
        var MEF = App.modal_edit_form;
        this.modal_edit_form = new MEF('mfe-' + this.selector); // Создадим экземпляр формы правки строк таблицы

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station', 'ways', 'park_ways', 'divisions'], false, function (result) {
            // Определим списки для полей
            // Получим список станций для отображения
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            // Функция получения списка парков по указаной станции
            var get_list_park = function (id_statation) {
                this.list_park_ways = this.ids_dir.getListParkWays('id', 'park_name', App.Lang);
                // Список путей по станции
                var list_way = this.ids_dir.list_ways.filter(function (i) {
                    return i.id_station == id_statation;
                });
                // Определим парки по стании
                $.each(list_way, function (i, el) {
                    var pw = el.Directory_ParkWays
                    var park_way = this.list_park_ways.find(function (o) {
                        return o.value === pw.id;
                    });
                    if (park_way) {
                        park_way.disabled = true;
                    }
                }.bind(this));
                return this.list_park_ways;
            }.bind(this);
            // Получим список подразделений
            this.list_divisions = this.ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);
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
            var fl_id_station = {
                field: 'id_station',
                type: 'number',
                add: 'select',
                edit: 'select',
                name: 'station',
                label: 'Станция',
                control: 'park',
                //control: null,
                list: this.list_station,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    var list_park = get_list_park(id);
                    var control = this.element_control;
                    if (control) {
                        control.update(list_park, -1);
                    }
                },
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите станцию',
                    ok: '',
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите станцию',
                    ok: '',
                }],
                default: -1,
                row: 1,
                col: 1,
                size: 5,
            };
            //var fl_id_park = {
            //    field: 'id_park',
            //    type: 'number',
            //    add: 'select',
            //    edit: 'select',
            //    name: 'park',
            //    label: 'Парки станции',
            //    control: null,
            //    list: get_list_park(-1),
            //    select: function (e, ui) {
            //        event.preventDefault();
            //        // Обработать выбор
            //        var id = Number($(e.currentTarget).val());
            //    },
            //    update: null,
            //    close: null,
            //    add_validation: [{
            //        check_type: 'not_null',
            //        error: 'Укажите парк',
            //        ok: null,
            //    }],
            //    edit_validation: [{
            //        check_type: 'not_null',
            //        error: 'Укажите парк',
            //        ok: null,
            //    }],
            //    default: -1,
            //    row: 1,
            //    col: 2,
            //    size: 7,
            //};
            var fl_id_park = {
                field: 'id_park',
                type: 'number',
                add: 'autocomplete',
                edit: 'autocomplete',
                name: 'park',
                label: 'Парк',
                placeholder: 'Парк станции',
                maxlength: 100,
                required: true,
                control: null,
                //list: this.list_park,
                list: get_list_park(-1),
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите парк',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите парк',
                    ok: null,
                }],
                default: null,
                button: null,
                row: 1,
                col: 2,
                size: 7,
            };
            var fl_position_park = {
                field: 'position_park',
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
            var fl_position_way = {
                field: 'position_way',
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
            var fl_way_num_ru = {
                field: 'way_num_ru',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'way_num_ru',
                label: '№ пути',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите номер пути (рус)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите номер пути (рус)',
                    ok: null,
                }],
                default: null,
                row: 2,
                col: 1,
                size: 2,
            };
            var fl_way_num_en = {
                field: 'way_num_en',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'way_num_en',
                label: '№ пути',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите номер пути (анг)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите номер пути (анг)',
                    ok: null,
                }],
                default: null,
                row: 3,
                col: 1,
                size: 2,
            };
            var fl_way_name_ru = {
                field: 'way_name_ru',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'way_name_ru',
                label: 'Название пути (рус.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название пути (рус)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название пути (рус)',
                    ok: null,
                }],
                default: null,
                row: 2,
                col: 2,
                size: 6,
            };
            var fl_way_name_en = {
                field: 'way_name_en',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'way_name_en',
                label: 'Название пути (анг.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название пути (анг)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название пути (анг)',
                    ok: null,
                }],
                default: null,
                row: 3,
                col: 2,
                size: 6,
            };
            var fl_way_abbr_ru = {
                field: 'way_abbr_ru',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'way_abbr_ru',
                label: 'Крат. назв. пути (рус.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру пути (рус)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру пути (рус)',
                    ok: null,
                }],
                default: null,
                row: 2,
                col: 3,
                size: 4,
            };
            var fl_way_abbr_en = {
                field: 'way_abbr_en',
                type: 'string',
                add: 'text',
                edit: 'text',
                name: 'way_abbr_en',
                label: 'Крат. назв. пути (анг.)',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру пути (анг)',
                    ok: null,
                }],
                edit_validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру пути (анг)',
                    ok: null,
                }],
                default: null,
                row: 3,
                col: 3,
                size: 4,
            };
            var fl_capacity = {
                field: 'capacity',
                type: 'number',
                add: 'number',
                edit: 'number',
                name: 'capacity',
                label: 'Вмес.',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 2,
                size: 2,
            };
            var fl_deadlock = {
                field: 'deadlock',
                type: 'boolean',
                add: 'checkbox',
                edit: 'checkbox',
                name: 'deadlock',
                label: 'Тупик',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 5,
                col: 1,
                size: 2,
            };
            var fl_crossing_uz = {
                field: 'crossing_uz',
                type: 'boolean',
                add: 'checkbox',
                edit: 'checkbox',
                name: 'crossing_uz',
                label: 'Выход УЗ',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 5,
                col: 2,
                size: 2,
            };
            var fl_crossing_amkr = {
                field: 'crossing_amkr',
                type: 'boolean',
                add: 'checkbox',
                edit: 'checkbox',
                name: 'crossing_amkr',
                label: 'Выход АМКР',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 5,
                col: 3,
                size: 2,
            };
            var fl_id_devision = {
                field: 'id_devision',
                type: 'number',
                add: 'select',
                edit: 'select',
                name: 'devision',
                label: 'Подразделение',
                control: null,
                list: this.list_divisions,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                },
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 4,
                col: 3,
                size: 2,
            };
            var fl_dissolution = {
                field: 'dissolution',
                type: 'boolean',
                add: 'checkbox',
                edit: 'checkbox',
                name: 'dissolution',
                label: 'Путь роспуска',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 5,
                col: 4,
                size: 3,
            };
            var fl_output_dissolution = {
                field: 'output_dissolution',
                type: 'boolean',
                add: 'checkbox',
                edit: 'checkbox',
                name: 'output_dissolution',
                label: 'Вых. на путь роспуска',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 5,
                col: 5,
                size: 3,
            };
            var fl_way_close = {
                field: 'way_close',
                type: 'datetime',
                add: 'datetime',
                edit: 'datetime',
                name: 'way_close',
                label: 'Путь закрыт',
                control: null,
                list: null,
                select: null,
                update: null,
                close: function (datetime) {

                },
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 4,
                size: 3,
            };
            var fl_way_delete = {
                field: 'way_delete',
                type: 'datetime',
                add: null,
                edit: 'datetime',
                name: 'way_delete',
                label: 'Путь удален',
                control: null,
                list: null,
                select: null,
                update: null,
                close: function (datetime) {

                },
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 5,
                size: 3,
            };
            var fl_note = {
                field: 'note',
                type: 'string',
                add: 'textarea',
                edit: 'textarea',
                name: 'note',
                label: 'Примечание',
                control: null,
                list: null,
                select: null,
                update: null,
                close: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 6,
                col: 1,
                size: 12,
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
            fields.push(fl_id_station)
            fields.push(fl_id_park)
            fields.push(fl_position_park)
            fields.push(fl_position_way)
            fields.push(fl_way_num_ru)
            fields.push(fl_way_num_en)
            fields.push(fl_way_name_ru)
            fields.push(fl_way_name_en)
            fields.push(fl_way_abbr_ru)
            fields.push(fl_way_abbr_en)
            fields.push(fl_capacity)
            fields.push(fl_deadlock)
            fields.push(fl_crossing_uz)
            fields.push(fl_crossing_amkr)
            fields.push(fl_id_devision)
            fields.push(fl_dissolution)
            fields.push(fl_output_dissolution)
            fields.push(fl_way_close)
            fields.push(fl_way_delete)
            fields.push(fl_note)
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
                    this.save(data);
                }.bind(this),
            });
            //----------------------------------
            // Создать макет таблицы
            var tableElement = new table_way(this);
            this.$dir_way.empty();
            this.$t_way = tableElement.$element;
            this.$dir_way.append(this.$t_way);
            // Инициализируем таблицу
            this.obj_t_way = this.$t_way.DataTable({
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
                            this.modal_edit_form.view(this.select_row_ways);
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
                var selected = this.obj_t_way.rows({ selected: true })[0].length > 0 ? true : false;
                var row = this.obj_t_way.rows(indexes).data().toArray()[0];
                if (selected) {
                    this.obj_t_way.button(2).enable(true);
                    this.obj_t_way.button(3).enable(!(row && row.way_delete));
                    this.obj_t_way.button(4).enable(!(row && row.way_delete));
                    this.obj_t_way.button(5).enable(!(row && row.way_delete));
                    this.select_row_ways = row;
                } else {
                    this.obj_t_way.button(2).enable(false);
                    this.obj_t_way.button(3).enable(false);
                    this.obj_t_way.button(4).enable(false);
                    this.obj_t_way.button(5).enable(false);
                    this.select_row_ways = null;
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
    table_dir_way.prototype.view = function (data) {
        this.obj_t_way.clear();
        this.obj_t_way.rows.add(data);
        this.obj_t_way.order([3, 'asc']);
        if (this.select_row_ways !== null) {
            this.obj_t_way.row('#' + this.select_row_ways.id).select();
        }
        this.obj_t_way.draw();
    };
    // загрузить данные 
    table_dir_way.prototype.load_of_station_park = function (id_station, id_park) {
        if (id_station >= 0 && id_park >= 0) {
            LockScreen(langView('mess_load_dir_way', App.Langs));
            this.ids_dir.getWaysOfStationIDParkID(id_station, id_park, function (ways) {
                this.id_station = id_station;
                this.id_park = id_park;
                this.modal_edit_form.set_default_fields_form('id_station', this.id_station);
                this.modal_edit_form.set_default_fields_form('id_park', this.id_park);
                this.select_row_ways = null;
                this.view(ways);
                LockScreenOff();
            }.bind(this));
        } else {
            //
        }

    };
    // Обновить данные
    table_dir_way.prototype.update = function () {
        if (this.id_station && this.id_park) {
            LockScreen(langView('mess_load_dir_way', App.Langs));
            this.ids_dir.getWaysOfStationIDParkID(this.id_station, this.id_park, function (ways) {
                this.view(ways);
                LockScreenOff();
            }.bind(this));
        }

    };
    // Обновить компоненты если обновлена база
    table_dir_way.prototype.update_element = function (list) {
        if (list) {
            if ($.inArray("station", list) >= 0) {
                //Обновился
                this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
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
    table_dir_way.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_dir_way.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    table_dir_way.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    table_dir_way.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    // вверх объект
    table_dir_way.prototype.up = function () {
        this.out_clear();
        var id = this.select_row_ways ? this.select_row_ways.id : null;
        var position = this.select_row_ways ? this.select_row_ways.position_way : null;
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
    table_dir_way.prototype.down = function () {
        this.out_clear();
        var id = this.select_row_ways ? this.select_row_ways.id : null;
        var position = this.select_row_ways ? this.select_row_ways.position_way : null;
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
    table_dir_way.prototype.auto = function () {
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
    table_dir_way.prototype.save = function (data) {
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
    table_dir_way.prototype.insert = function (data) {
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
    table_dir_way.prototype.edit = function (data) {
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
    table_dir_way.prototype.delete = function (data) {
        this.out_clear();
        if (this.select_row_ways !== null) {
            this.modal_confirm_form.view('Удалить', 'Удалить выбранный путь [' + this.select_row_ways['way_num_' + App.Lang] + ' - ' + this.select_row_ways['way_name_' + App.Lang] + '] ?', function (result) {
                if (result) {
                    // Выполнить
                    var operation = {
                        id_way: this.select_row_ways.id,
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
    table_dir_way.prototype.destroy = function () {
        this.modal_confirm_form.destroy();
        this.modal_edit_form.destroy();
        this.obj_t_way.destroy();
        this.$dir_way.empty(); // empty in case the columns change
    }

    App.table_dir_way = table_dir_way;

    window.App = App;
})(window);