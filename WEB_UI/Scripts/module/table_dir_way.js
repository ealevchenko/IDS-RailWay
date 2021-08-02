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

            'mess_load_dir_way': 'Загружаю список путей...',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_dir = new IDS_DIRECTORY(App.Lang);                // Создадим класс IDS_RWT

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
            throw new Error('No selector provided');
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
    // Загрузка основных справочников приложения
    table_dir_way.prototype.load_reference = function (callback) {
        LockScreen(langView('mess_load_reference', App.Langs));
        var count = 1;
        ids_dir.load(['station', 'ways', 'divisions'], false, function () {
            count -= 1;
            if (count === 0) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
    };
    // инициализация таблицы справочника путей
    table_dir_way.prototype.init = function (options) {
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
        }, options);


        // Инициализация формы
        var FDWAY = App.form_edit;

        var $form = $('<div></div>', {
            'id': 'edit-' + this.selector
        });
        $('body').append($form)
        // Инициализация формы
        var form_edit = new FDWAY('div#edit-' + this.selector); // Создадим экземпляр таблицы
        // Загрузим данные
        this.load_reference(function () {
            // Создадим поля формы
            var rows_form = [];
            // Уровень 1 станции
            var row_station = [];
            var row_way = [];
            var row_way_ru = [];
            var row_way_en = [];
            var row_way_type = [];
            var row_way_note = [];

            // станции
            var list_station = ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false ? true : false; });
            var get_list_park = function (id_statation) {
                var list_way = ids_dir.list_ways.filter(function (i) {
                    return i.id_station == id_statation;
                })
                var list_park = [];
                $.each(list_way, function (i, el) {
                    var pw = el.Directory_ParkWays
                    var park = list_park.find(function (o) {
                        return o.value === pw.id;
                    });
                    if (!park) {
                        list_park.push({ value: pw.id, text: pw['park_name_' + App.Lang] });
                    }
                });
                return list_park;
            };
            var list_divisions = ids_dir.getListDivisions('id', 'division_abbr', App.Lang, null);

            var row_element_station = {
                col: 5,
                field: 'id_station',
                type: 'select',
                name: 'station',
                label: 'Станция',
                list: list_station,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    var list_park = get_list_park(id);
                    var control = this.element_control;
                    if (control) {
                        control.update(list_park, -1, null);
                    }
                },
                control: 'park',
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите станцию',
                    ok: null,
                }],

            };
            var row_element_park = {
                col: 7,
                field: 'id_park',
                type: 'select',
                name: 'park',
                label: 'Парки станции',
                list: get_list_park(-1),
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                },
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите парк',
                    ok: null,
                }],
            };
            //
            var row_element_position = {
                col: 2,
                field: 'position_way',
                type: 'number',
                name: 'position',
                label: 'Поз.',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'range_number',
                    min: 1,
                    max: 100,
                    error: 'Позиция пути должна быть в диапазоне от 1 до 100',
                    ok: null,
                }],
            };
            var row_element_capacity = {
                col: 2,
                field: 'capacity',
                type: 'number',
                name: 'capacity',
                label: 'Вмес.',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
            };
            var row_element_divisions = {
                col: 2,
                field: 'id_devision',
                type: 'select',
                name: 'devision',
                label: 'Подразделение',
                list: list_divisions,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                },
                control: null,
                update: null,
                close: null,
            };
            var row_element_way_delete = {
                col: 3,
                field: 'way_delete',
                type: 'datetime',
                name: 'way_delete',
                label: 'Путь удален',
                list: null,
                select: null,
                control: null,
                update: null,
                close: function (datetime) {

                },
            };
            var row_element_way_close = {
                col: 3,
                field: 'way_close',
                type: 'datetime',
                name: 'way_close',
                label: 'Путь закрыт',
                list: null,
                select: null,
                control: null,
                update: null,
                close: function (datetime) {

                },
            };
            //
            var row_element_num_ru = {
                col: 2,
                field: 'way_num_ru',
                type: 'text',
                name: 'way_num_ru',
                label: '№ пути',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите номер пути (рус)',
                    ok: null,
                }],
            };
            var row_element_name_ru = {
                col: 6,
                field: 'way_name_ru',
                type: 'text',
                name: 'way_name_ru',
                label: 'Название пути (рус.)',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название пути (рус)',
                    ok: null,
                }],
            };
            var row_element_abbr_ru = {
                col: 4,
                field: 'way_abbr_ru',
                type: 'text',
                name: 'way_abbr_ru',
                label: 'Крат. назв. пути (рус.)',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру пути (рус)',
                    ok: null,
                }],
            };
            var row_element_num_en = {
                col: 2,
                field: 'way_num_en',
                type: 'text',
                name: 'way_num_ru',
                label: '№ пути',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите номер пути (анг)',
                    ok: null,
                }],
            };
            var row_element_name_en = {
                col: 6,
                field: 'way_name_en',
                type: 'text',
                name: 'way_name_ru',
                label: 'Название пути (анг.)',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите название пути (анг)',
                    ok: null,
                }],
            };
            var row_element_abbr_en = {
                col: 4,
                field: 'way_abbr_en',
                type: 'text',
                name: 'way_abbr_en',
                label: 'Крат. назв. пути (анг.)',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                validation: [{
                    check_type: 'not_null',
                    error: 'Укажите абревиатуру пути (анг.)',
                    ok: null,
                }],
            };
            //
            var row_element_deadlock = {
                col: 2,
                field: 'deadlock',
                type: 'checkbox',
                name: 'deadlock',
                label: 'Тупик',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
                //validation: [{
                //    check_type: 'not_null',
                //    error: 'Укажите укажите тупик',
                //    ok: null,
                //}],
            };
            var row_element_crossing_uz = {
                col: 2,
                field: 'crossing_uz',
                type: 'checkbox',
                name: 'crossing_uz',
                label: 'Выход УЗ',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
            };
            var row_element_crossing_amkr = {
                col: 2,
                field: 'crossing_amkr',
                type: 'checkbox',
                name: 'crossing_amkr',
                label: 'Выход АМКР',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
            };
            var row_element_dissolution = {
                col: 3,
                field: 'dissolution',
                type: 'checkbox',
                name: 'dissolution',
                label: 'Путь роспуска',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
            };
            var row_element_output_dissolution = {
                col: 3,
                field: 'output_dissolution',
                type: 'checkbox',
                name: 'output_dissolution',
                label: 'Вых. на путь роспуска',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
            };

            var row_element_note = {
                col: 12,
                field: 'note',
                type: 'textarea',
                name: 'note',
                label: 'Примечание',
                list: null,
                select: null,
                control: null,
                update: null,
                close: null,
            };

            row_station.push(row_element_station);
            row_station.push(row_element_park);

            row_way.push(row_element_position);
            row_way.push(row_element_capacity);
            row_way.push(row_element_divisions);
            row_way.push(row_element_way_close);
            row_way.push(row_element_way_delete);

            row_way_ru.push(row_element_num_ru)
            row_way_ru.push(row_element_name_ru);
            row_way_ru.push(row_element_abbr_ru);
            row_way_en.push(row_element_num_en)
            row_way_en.push(row_element_name_en);
            row_way_en.push(row_element_abbr_en);

            row_way_type.push(row_element_deadlock);
            row_way_type.push(row_element_crossing_uz);
            row_way_type.push(row_element_crossing_amkr);
            row_way_type.push(row_element_dissolution);
            row_way_type.push(row_element_output_dissolution);

            row_way_note.push(row_element_note);

            rows_form.push(row_station);
            rows_form.push(row_way_ru);
            rows_form.push(row_way_en);
            rows_form.push(row_way);
            rows_form.push(row_way_type);
            rows_form.push(row_way_note);
            // Инициализируем форму
            form_edit.init({
                rows_form: rows_form,
                source: ids_dir,
                alert: true,
                title: "Править путь",
                size: "xl",
                fn_ok: function (data) {
                    var name_el = 'edit-' + this.selector;
                }.bind(this),
            });
            //----------------------------------
        }.bind(this));
        // Инициализация таблицы
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
                        form_edit.view(null);
                    },
                    enabled: true
                },
                {
                    text: langView('title_button_edit', App.Langs),
                    action: function (e, dt, node, config) {
                        form_edit.view(App.Select_Row_ways);
                    },
                    enabled: false
                },
                {
                    text: langView('title_button_del', App.Langs),
                    action: function (e, dt, node, config) {

                    },
                    enabled: false
                },
                {
                    text: langView('title_button_up', App.Langs),
                    action: function (e, dt, node, config) {
                        var id = App.Select_Row_ways ? App.Select_Row_ways.id : null;
                        var position = App.Select_Row_ways ? App.Select_Row_ways.position_way : null;
                        if (id && position > 0) {
                            var operation = {
                                id_way: id,
                                user: App.User_Name,
                            };
                            ids_dir.postOperationUp1PositionWayOfPark(operation, function (result) {
                                if (result > 0) {
                                    this.update();
                                    this.out_clear();
                                    this.out_info("Путь перенесен на позицию верх");
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
                        }
                    }.bind(this),
                    enabled: false
                },
                {
                    text: langView('title_button_dn', App.Langs),
                    action: function (e, dt, node, config) {
                        var id = App.Select_Row_ways ? App.Select_Row_ways.id : null;
                        var position = App.Select_Row_ways ? App.Select_Row_ways.position_way : null;
                        if (id && position > 0) {
                            var operation = {
                                id_way: id,
                                user: App.User_Name,
                            };
                            ids_dir.postOperationDown1PositionWayOfPark(operation, function (result) {
                                if (result > 0) {
                                    this.update();
                                    this.out_clear();
                                    this.out_info("Путь перенесен на позицию вниз");
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
                        }
                    }.bind(this),
                    enabled: false
                },
                {
                    extend: 'pageLength',
                }

            ]
        }).on('select deselect', function (e, dt, type, indexes) {
            //var index = this.obj_t_way.rows({ selected: true });
            var selected = this.obj_t_way.rows({ selected: true })[0].length > 0 ? true : false;
            var row = this.obj_t_way.rows(indexes).data().toArray()[0];
            if (selected) {
                this.obj_t_way.button(2).enable(true);
                this.obj_t_way.button(3).enable(true);
                this.obj_t_way.button(4).enable(true);
                this.obj_t_way.button(5).enable(true);
                App.Select_Row_ways = row;
            } else {
                this.obj_t_way.button(2).enable(false);
                this.obj_t_way.button(3).enable(false);
                this.obj_t_way.button(4).enable(false);
                this.obj_t_way.button(5).enable(false);
                App.Select_Row_ways = null;
            }

        }.bind(this));
    };
    // Показать данные 
    table_dir_way.prototype.view = function (data) {
        this.obj_t_way.clear();
        this.obj_t_way.rows.add(data);
        this.obj_t_way.order([3, 'asc']);
        if (App.Select_Row_ways !== null) {
            this.obj_t_way.row('#' + App.Select_Row_ways.id).select();
        }
        this.obj_t_way.draw();
    };
    // загрузить данные 
    table_dir_way.prototype.load_of_station_park = function (id_station, id_park) {
        LockScreen(langView('mess_load_dir_way', App.Langs));
        ids_dir.getWaysOfStationIDParkID(id_station, id_park, function (ways) {
            this.id_station = id_station;
            this.id_park = id_park;
            App.Select_Row_ways = null;
            this.view(ways);
            LockScreenOff();
        }.bind(this));
    };

    table_dir_way.prototype.update = function () {
        if (this.id_station && this.id_park) {
            LockScreen(langView('mess_load_dir_way', App.Langs));
            ids_dir.getWaysOfStationIDParkID(this.id_station, this.id_park, function (ways) {
                this.view(ways);
                LockScreenOff();
            }.bind(this));
        }

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

    App.table_dir_way = table_dir_way;

    window.App = App;
})(window);