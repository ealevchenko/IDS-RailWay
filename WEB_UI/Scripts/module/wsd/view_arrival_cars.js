(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_dt_apply = -1 * (60 * 3); // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_dt_apply = 60 * 3; // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vac_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР"',
            'vac_card_header_on': 'ПРИНЯТЬ НА СТАНЦИЮ',
            'vac_card_header_from': 'СОСТАВЫ НА ПОДХОДАХ',
            'vac_fieldset_on_table_title': 'Сформированный состав',

            'vac_title_label_station_on': 'Станция прибытия:',
            'vac_title_placeholder_station_on': 'Станция прибытия:',

            'vac_title_label_way_on': 'Путь прибытия:',
            'vac_title_placeholder_way_on': 'Выберите путь',


            'vac_title_label_outer_way': 'Внешний путь:',
            'vac_title_placeholder_outer_way': 'Внешний путь',
            'vac_title_label_locomotive1': 'Локомотив №1:',
            'vac_title_label_locomotive2': 'Локомотив №2:',
            'vac_title_placeholder_locomotive': ' № локомотива',
            'vac_title_time_aplly': 'Время выполнения',
            'vac_title_placeholder_time_aplly': 'Время выполнения',

            'vac_title_form_apply': 'Выполнить?',

            'vac_title_button_export': 'Экспорт',
            'vac_title_button_buffer': 'Буфер',
            'vac_title_button_excel': 'Excel',
            'vac_title_button_cancel': 'Отменить',
            'vac_title_button_return': 'Вернуть',

            'vac_title_add_ok': 'ВЫПОЛНИТЬ',


            'vac_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vac_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            'vac_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            'vac_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',
            'vac_mess_error_not_wagons': 'Не выбраны вагоны для отправления (в окне «ОТПРАВИТЬ СО СТАНЦИ», на пути отправки выберите вагоны и сформируйте состав).',
            'vac_mess_error_operation_run': 'При выполнении операции «ОТПРАВИТЬ СО СТАНЦИ» произошла ошибка, код ошибки:',

            'vac_mess_cancel_operation': 'Операция "ОТПРАВИТЬ СОСТАВОВ НА СТАНЦИИ АМКР" – отменена',
            'vac_mess_run_operation_send': 'Выполняю операцию отправки состава на станцию АМКР',

            'vac_mess_load_operation': 'Загружаю операции...',
            'vac_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vac_mess_update_operation': 'Обновляю операции...',
            'vac_mess_init_panel': 'Выполняю инициализацию модуля ...',
            'vac_mess_destroy_operation': 'Закрываю форму...',
            'vac_mess_create_sostav': 'Формирую состав, переношу вагоны...',
            'vac_mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            'vac_mess_reverse_sostav': 'Формирую состав, реверс вагонов...',
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
    var MCF = App.modal_confirm_form; // Создать модальную форму "Окно сообщений"
    var FC = App.form_control;
    var FIF = App.form_infield;
    var TSOW = App.table_sostav_outer_way; // Модуль составы на подходах
    var TCWay = App.table_cars_way;         // Модуль вагоны на путях
    var alert = App.alert_form;

    // создадим основу формы
    function div_panel(base) {
        var row = new base.fc_ui.el_row();
        var col = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_panel = new base.fc_ui.el_card('border-secondary mb-1', '', '', langView('vac_card_header_panel', App.Langs));
        var row_on = new base.fc_ui.el_row();
        var col_on = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_on = new base.fc_ui.el_card('border-primary', 'text-left', 'p-2', langView('vac_card_header_on', App.Langs));
        var row_from = new base.fc_ui.el_row();
        var col_from = new base.fc_ui.el_col('xl', 12, 'mb-1 mt-1');
        var card_from = new base.fc_ui.el_card('border-primary', 'text-left', 'p-2', langView('vac_card_header_from', App.Langs));

        var fieldset_on_setup = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);
        this.$setup_on = fieldset_on_setup.$fieldset;
        var fieldset_on_table = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);//langView('vac_fieldset_on_table_title', App.Langs)
        this.$table_on = fieldset_on_table.$fieldset;

        var fieldset_from_setup = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);
        this.$setup_from = fieldset_from_setup.$fieldset;
        var fieldset_from_table = new base.fc_ui.el_fieldset('border-primary', 'border-primary', null);//langView('vac_fieldset_on_table_title', App.Langs)
        this.$table_from = fieldset_from_table.$fieldset;

        var row_on_body = new base.fc_ui.el_row();
        var col_on_setup = new base.fc_ui.el_col('xl', 3, 'mb-1 mt-1');
        var col_on_table = new base.fc_ui.el_col('xl', 9, 'mb-1 mt-1');
        row_on_body.$row.append(col_on_setup.$col.append(this.$setup_on)).append(col_on_table.$col.append(this.$table_on));

        var row_from_body = new base.fc_ui.el_row();
        var col_from_setup = new base.fc_ui.el_col('xl', 2, 'mb-1 mt-1');
        var col_from_table = new base.fc_ui.el_col('xl', 10, 'mb-1 mt-1');
        row_from_body.$row.append(col_from_setup.$col.append(this.$setup_from)).append(col_from_table.$col.append(this.$table_from));

        var alert_on = new base.fc_ui.el_alert('on');
        var alert_from = new base.fc_ui.el_alert('from');

        this.$alert_on = alert_on.$alert;
        this.$alert_from = alert_from.$alert;

        card_on.$body.append(this.$alert_on).append(row_on_body.$row)
        card_from.$body.append(this.$alert_from).append(row_from_body.$row);

        row_on.$row.append(col_on.$col.append(card_on.$card));
        row_from.$row.append(col_from.$col.append(card_from.$card));

        card_panel.$body.append(row_on.$row).append(row_from.$row);
        this.$element = row.$row.append(col.$col.append(card_panel.$card));
    };
    // ассинхроная функция (нумерации вагонов)
    var wagons_enumerate_async = function (row, field, position, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            } else return 0;
        }
        function EnumerateWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i][field] = position;
                    position++;
                    EnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        EnumerateWagonsAsync.call(this, 0);
    }.bind(this);
    // ассинхроная функция (Реверса нумерации вагонов)
    var wagons_reverse_enumerate_async = function (row, field, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            } else return 0;
        }
        row = row.sort(function (a, b) { return a[field] - b[field]; });
        function ReverseEnumerateWagonsAsync(i) {
            if (len > 0) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i][field] = len;
                    len--;
                    ReverseEnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        ReverseEnumerateWagonsAsync.call(this, 0);
    }.bind(this);

    // ассинхроная функция (Убрать вагоны)
    var wagons_del_async = function (row, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            } else return 0;
        }
        function DelWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    var wagon = this.wagons.find(
                        function (o) { return o.wir_id === row[i].wir_id });
                    if (wagon !== null) {
                        wagon.position_new = null;
                    }
                    DelWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        DelWagonsAsync.call(this, 0);
    };
    // ассинхроная функция (Добавить вагоны)
    var wagons_add_async = function (row, position, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            } else return 0;
        }
        function AddWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    var wagon = this.wagons.find(
                        function (o) { return o.wir_id === row[i].wir_id });
                    if (wagon !== null) {
                        wagon.position_new = position;
                        position++;
                    }
                    AddWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        AddWagonsAsync.call(this, 0);
    };
    // вернуть название станции прибытия по id внешнего пути
    var get_station_name = function (id_outer_way) {
        var outer_way = this.ids_dir.list_outer_ways.find(function (o) { return o.id === id_outer_way; });
        if (outer_way) {
            var station = this.ids_dir.list_station.find(function (o) { return o.id === outer_way.id_station_on; });
            return station ? station['station_name_' + App.Lang] : null;
        }
        return null
    };

    function view_arrival_cars(selector) {
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
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_arrival_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.ids_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    };
    // инициализация модуля
    view_arrival_cars.prototype.init = function (options, fn_init_ok) {
        this.result_init = true;
        // теперь выполним инициализацию, определим основные свойства

        // Создать модальную форму "Окно сообщений"
        this.modal_confirm_form = new MCF(this.selector); // Создадим экземпляр окно сообщений
        this.modal_confirm_form.init();

        this.settings = $.extend({
            alert: null,
            ids_dir: null,
            ids_wsd: null,
            fn_db_update: null,
        }, options);
        // Создадим ссылку на модуль работы с базой данных
        this.ids_dir = this.settings.ids_dir ? this.settings.ids_dir : new directory();
        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();

        this.id_station = -1;   // По умолчанию не выбрана
        this.id_way = -1;       // По умолчанию не выбрана
        this.list_station = []; // По умолчанию пустой список
        this.list_way = [];     // По умолчанию пустой список

        this.wagons = [];       // Список вагонов (рабочий)
        // Сообщение
        LockScreen(langView('vac_mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        var panelElement = new div_panel(this);
        this.$panel.empty();
        this.$setup_on = panelElement.$setup_on;
        this.$setup_from = panelElement.$setup_from;
        this.$table_on = panelElement.$table_on;
        this.$table_from = panelElement.$table_from;

        this.alert_on = new alert(panelElement.$alert_on);
        this.alert_from = new alert(panelElement.$alert_from);

        this.$panel.append(panelElement.$element);

        // Создадим и добавим макет таблицы

        // Загрузим справочные данные, определим поля формы правки
        this.load_db(['station', 'ways', 'outer_ways', 'locomotive'], false, function (result) {
            // Подгрузили списки
            this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
            // Получим список путей  
            //var get_list_way = function (id_station) {
            //    this.id_station = id_station;
            //    var ways = [];
            //    var list_way = this.ids_dir.list_ways.filter(function (i) {
            //        return i.id_station == id_station && !i.way_delete;
            //    }.bind(this))
            //    if (list_way) {
            //        ways = this.ids_dir.getListObj2(list_way, 'id', 'way_num', 'way_name', App.Lang, null);
            //    }
            //    return ways
            //}.bind(this);
            // Получим список внешних путей
            //var get_list_outer_ways = function (id_station_on) {
            //    var outer_ways = [];
            //    var list_outer_ways = this.ids_dir.list_outer_ways.filter(function (i) {
            //        return i.id_station_on == id_station_on && i.id_station_from == this.id_station && !i.way_delete;
            //    }.bind(this))
            //    if (list_outer_ways) {
            //        outer_ways = this.ids_dir.getListObj(list_outer_ways, 'id', 'name_outer_way', App.Lang, null);
            //    }
            //    return outer_ways
            //}.bind(this);
            // Список локомотивов
            this.list_locomotive = this.ids_dir.getListLocomotive('locomotive', 'locomotive', function (i) { return i.id_locomotive_status === 1; });
            // Получить список станций для отправки
            var get_list_station_on = function (id_station, id_way) {
                var station_on = [];
                // получим внешние пути пренадлежащие выбранной станции
                var list_outer_ways = this.ids_dir.list_outer_ways.filter(function (i) {
                    return i.id_station_from == id_station && !i.way_delete;
                }.bind(this));
                // Получим уникальные станции прибытия
                if (list_outer_ways && list_outer_ways.length > 0) {
                    // Поиск уникальных станций
                    $.each(list_outer_ways, function (i, el) {
                        if (el.Directory_Station && !el.Directory_Station.station_uz) {
                            var res = station_on.find(function (o) {
                                return o.value === el.Directory_Station.id
                            });
                            if (!res) {
                                station_on.push({ value: el.Directory_Station.id, text: el.Directory_Station["station_name_" + App.Lang], disabled: false });
                            }
                        }
                    }.bind(this));
                }
                return station_on ? station_on.sort(function (a, b) { return a.value - b.value; }) : station_on;
            }.bind(this);
            //// Показать вагоны на пути
            //var view_wagons_from_way = function (id_way) {
            //    this.id_way = id_way;
            //    // Получить список станций для прибытия (из списка внешних путей)
            //    var list_station_on = get_list_station_on(this.id_station, this.id_way);
            //    this.form_setup_on.update_list_element('id_station', list_station_on, -1);
            //    // Вывести данные вагоны на пути отправки
            //    this.load_of_way(this.id_way, function (wagons) {
            //        this.view_wagons(wagons);
            //    }.bind(this));
            //}.bind(this);

            // Создадим форму выбора пути отправки (this.$setup_from)
            this.form_setup_from = new FIF();
            var fl_station = {
                field: 'id_station',
                type: 'int',
                add: null,
                edit: 'select',
                name: 'station',
                prefix: 'sm', //'sm','','lg'
                label: langView('vac_title_label_station_on', App.Langs),
                placeholder: langView('vac_title_placeholder_station_on', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.list_station,
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    this.update_sostav_outer_ways_and_way_of_station(id, -1); // Обновим составы в прибытии и пути по выбранной станции

                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 1,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fields = [];
            fields.push(fl_station);
            //// Инициализация формы
            this.form_setup_from.init({
                alert: this.alert_from,
                mode: 'edit', // Указали что будем использовать форму типа edit
                fields: fields,
                mb: 2,
                id: null,
                cl_form: '',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                    }
                }.bind(this),
            });

            // Отображение формы
            this.$setup_from.append(this.form_setup_from.$form_edit);
            // Создадим таблицу вангонов на пути отправки
            var $div_table_from = $('<div></div>', {
                'id': 'table-from-' + this.selector,
            });
            if ($div_table_from && $div_table_from.length > 0) {
                this.$table_from.append($div_table_from);
                this.tab_sostav_from = new TSOW('div#table-from-' + this.selector); // Создадим экземпляр составы на подходах
                this.tab_sostav_from.init({
                    alert: this.alert_from,
                    type_report: 'arrival-outer-way',  // Прибвыающие составы на внешнем пути
                    ids_wsd: this.ids_wsd,
                }, function () {

                });
            };
            // Создадим форму выбора пути прибытия (this.$setup_on)
            this.form_setup_on = new FIF();
            var fl_way_on = {
                field: 'id_way',
                type: 'int',
                add: 'select',
                edit: null,
                name: 'way',
                prefix: 'sm',
                label: langView('vac_title_label_way_on', App.Langs),
                placeholder: langView('vac_title_placeholder_way_on', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: this.get_list_way(-1),
                select: function (e, ui) {
                    event.preventDefault();
                    // Обработать выбор
                    var id = Number($(e.currentTarget).val());
                    //view_wagons_from_way(id);
                }.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 2,
                col: 1,
                col_prefix: 'md',
                col_size: 12,
            };
            var fl_locomotive1 = {
                field: 'locomotive1',
                type: 'string',
                add: 'autocomplete',
                edit: null,
                name: 'locomotive1',
                prefix: 'sm',
                label: langView('vac_title_label_locomotive1', App.Langs),
                placeholder: langView('vac_title_placeholder_locomotive', App.Langs),
                maxlength: 20,
                required: true,
                control: null,
                list: this.list_locomotive,
                select: null,
                //select: function (e, ui) {
                //    event.preventDefault();
                //    // Обработать выбор
                //    var id = Number($(e.currentTarget).val());
                //    //view_wagons_from_way(id);
                //}.bind(this),
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 3,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_locomotive2 = {
                field: 'locomotive2',
                type: 'string',
                add: 'autocomplete',
                edit: null,
                name: 'locomotive2',
                prefix: 'sm',
                label: langView('vac_title_label_locomotive2', App.Langs),
                placeholder: langView('vac_title_placeholder_locomotive', App.Langs),
                maxlength: 20,
                required: false,
                control: null,
                list: this.list_locomotive,
                select: null,
                update: null,
                close: null,
                change: null,
                add_validation: null,
                edit_validation: null,
                default: -1,
                row: 3,
                col: 2,
                col_prefix: 'md',
                col_size: 6,
            };
            var fl_time_aplly = {
                field: 'time_aplly',
                type: 'datetime',
                add: 'datetime',
                edit: null,
                name: 'time_aplly',
                prefix: 'sm',
                label: langView('vac_title_time_aplly', App.Langs),
                placeholder: langView('vac_title_placeholder_time_aplly', App.Langs),
                maxlength: null,
                required: true,
                control: null,
                list: null,
                select: null,
                update: null,
                close: function (datetime) {

                },
                change: null,
                add_validation: null,
                edit_validation: null,
                default: null,
                row: 4,
                col: 1,
                col_prefix: 'md',
                col_size: 6,
            };
            var fields_on = [];
            fields_on.push(fl_way_on);
            fields_on.push(fl_locomotive1);
            fields_on.push(fl_locomotive2);
            fields_on.push(fl_time_aplly);
            //// Инициализация формы
            this.form_setup_on.init({
                alert: this.alert_on,
                mode: 'add', // Указали что будем использовать форму типа add
                fields: fields_on,
                mb: 2,
                id: null,
                cl_form: '',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            var name_station = get_station_name.call(this, result.new.id_outer_way);// Получим название станции
                            var wagons = this.wagons.filter(function (i) { return i.position_new !== null; });// получить вагоны
                            this.modal_confirm_form.view(langView('vac_title_form_apply', App.Langs), 'Выполнить операцию "ОТПРАВИТЬ СОСТАВОВ НА СТАНЦИИ АМКР" в количестве: ' + (wagons ? wagons.length : 0) + ' (ваг.), станция прибытия: ' + name_station + '?', function (res) {
                                if (res) {
                                    // Проверим наличие вагонов 
                                    var list_wagons = [];
                                    if (wagons && wagons.length > 0) {
                                        // Получим перечень вагонов и новую позицию
                                        $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                                            list_wagons.push({ wir_id: el.wir_id, position: el.position_new })
                                        }.bind(this));
                                        // Сформируем операцию
                                        var operation = {
                                            id_way_from: this.id_way,
                                            wagons: list_wagons,
                                            id_outer_ways: result.new.id_outer_way,
                                            lead_time: result.new.time_aplly,
                                            locomotive1: result.new.locomotive1,
                                            locomotive2: result.new.locomotive2,
                                            user: App.User_Name
                                        };
                                        this.apply(operation);
                                    }
                                } else {
                                    // Отмена
                                    this.form_setup_on.out_warning(langView('vac_mess_cancel_operation', App.Langs));
                                }
                            }.bind(this));
                        }
                    }
                }.bind(this),
                button_add_ok: {
                    title: langView('vac_title_add_ok', App.Langs),
                    click: function (event) {
                        event.preventDefault();
                        this.form_setup_on.$form_add.submit();
                    }.bind(this),
                },
            });
            // Отображение формы
            this.$setup_on.append(this.form_setup_on.$form_add);

            // Создадим таблицу вангонов собранных для отправки
            var $div_table_on = $('<div></div>', {
                'id': 'table-on-' + this.selector,
            });
            if ($div_table_on && $div_table_on.length > 0) {
                this.$table_on.append($div_table_on);
                this.tab_cars_on = new TCWay('div#table-on-' + this.selector);
                this.tab_cars_on.init({
                    type_report: 2,
                    alert: this.settings.alert,
                    // инициализируем кнопки
                    buttons: [
                        {
                            name: 'del_wagons_send',
                            action: function (e, dt, node, config) {
                                LockScreen(langView('vac_mess_clear_sostav', App.Langs));
                                var base = this;
                                // Убрать вагоны
                                wagons_del_async.call(this, this.tab_cars_on.select_rows_wagons, function () {
                                    // Авто нумерация
                                    wagons_enumerate_async(base.wagons.filter(function (i) { return i.position_new !== null; }), 'position_new', 1, function () {
                                        this.tab_cars_on.select_rows_wagons = null;
                                        this.view_wagons(this.wagons);
                                    }.bind(base));
                                });
                            }.bind(this),
                        },
                        {
                            name: 'reverse_num_wagon',
                            action: function (e, dt, node, config) {
                                LockScreen(langView('vac_mess_reverse_sostav', App.Langs));
                                wagons_reverse_enumerate_async(this.wagons.filter(function (i) { return i.position_new !== null; }), 'position_new', function () {
                                    this.tab_cars_on.select_rows_wagons = null;
                                    this.view_wagons(this.wagons);
                                }.bind(this));
                            }.bind(this),
                        },
                    ],
                    fn_change_data: function (wagons) {

                    }.bind(this),
                }, function () {

                });
            };

            //----------------------------------
            if (typeof fn_init_ok === 'function') {
                fn_init_ok(this.result_init);
            }
            //----------------------------------
        }.bind(this));
    };
    // Показать данные 
    view_arrival_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        LockScreen(langView('vac_mess_load_operation', App.Langs));
        this.id_station = -1;
        this.id_way = -1;
        if (id_way) {
            var way = this.ids_dir.getWays_Of_ID(id_way);
            if (way) {
                this.id_station = way.id_station;
                // Отобразим выбор на панеле
                this.form_setup_from.view_edit({ id_station: this.id_station });
                this.id_way = id_way;
            }
        }
        this.update_sostav_outer_ways_and_way_of_station(this.id_station, this.id_way)
        //// Вывести данные вагоны на пути отправки
        //this.load_of_way(this.id_way, function (wagons) {
        //    this.view_wagons(wagons);
        //}.bind(this));
    };
    // Получить список путей станции
    view_arrival_cars.prototype.get_list_way = function (id_station) {
        this.id_station = id_station;
        var ways = [];
        var list_way = this.ids_dir.list_ways.filter(function (i) {
            return i.id_station == id_station && !i.way_delete;
        }.bind(this))
        if (list_way) {
            ways = this.ids_dir.getListObj2(list_way, 'id', 'way_num', 'way_name', App.Lang, null);
        }
        return ways
    };
    // Обновить составы на перегонах станции прибытия и пути станции прибытия
    view_arrival_cars.prototype.update_sostav_outer_ways_and_way_of_station = function (id_station, id_way) {
        this.id_station = id_station;
        this.id_way = id_way;
        // Обновить пути станции прибытия
        this.form_setup_on.update_list_element('id_way', this.get_list_way(this.id_station), id_way)
        // Обновить составы на перегонах станции прибытия
        this.tab_sostav_from.load_ow_arr_sostav_of_station_on(this.id_station);
    };
    // 
    view_arrival_cars.prototype.view_wagons = function (wagons) {
        this.form_setup_on.clear_all();
        //this.tab_cars_from.view(wagons.filter(function (i) { return i.position_new === null; }), null);
        this.tab_cars_on.view(wagons.filter(function (i) { return i.position_new !== null; }), null);
    };
    // Загрузить вагоны на пути
    view_arrival_cars.prototype.load_of_way = function (id_way, fn_load_data) {
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('vac_mess_load_wagons', App.Langs));
            this.ids_wsd.getViewWagonsOfWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                LockScreenOff();
                if (typeof fn_load_data === 'function') {
                    fn_load_data(this.wagons);
                }
            }.bind(this));
        } else {
            this.wagons = [];
            // Событие обновили данные
            if (typeof fn_load_data === 'function') {
                fn_load_data(this.wagons);
            }
        }

    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_arrival_cars.prototype.validation = function (result) {
        var valid = true;
        // Проверим локомотивы
        var loc1 = this.form_setup_on.get_element('locomotive1');
        var loc2 = this.form_setup_on.get_element('locomotive2');
        if (loc1 === loc2) {
            this.form_setup_on.set_object_error('locomotive1', langView('vac_mess_error_equal_locomotive', App.Langs));
            this.form_setup_on.set_object_error('locomotive2', langView('vac_mess_error_equal_locomotive', App.Langs));
            valid = false;
        } else {
            if (result.new && !result.new.locomotive1 && (loc1 !== null || loc1 !== '')) {
                this.form_setup_on.set_object_error('locomotive1', langView('vac_mess_error_not_locomotive', App.Langs) + loc1);
                valid = false;
            }
            if ((loc2 !== null && loc2 !== '') && result.new && result.new.locomotive2 === null) {
                this.form_setup_on.set_object_error('locomotive2', langView('vac_mess_error_not_locomotive', App.Langs) + loc2);
                valid = false;
            }
        }
        // Проверим время
        if (result.new && result.new.time_aplly) {
            var curr = moment();
            var aplly = moment(result.new.time_aplly);
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < min_dt_apply) {
                this.form_setup_on.set_object_error('time_aplly', langView('vac_mess_error_min_time_aplly', App.Langs) + (min_dt_apply * -1));
                valid = false;
            }
            if (minutes > max_dt_apply) {
                this.form_setup_on.set_object_error('time_aplly', langView('vac_mess_error_max_time_aplly', App.Langs) + (max_dt_apply));
                valid = false;
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) { return i.position_new !== null; });
        if (wagons === null || wagons.length === 0) {
            this.form_setup_on.out_error(langView('vac_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_arrival_cars.prototype.apply = function (data) {
        LockScreen(langView('vac_mess_run_operation_send', App.Langs));
        this.ids_wsd.postSendWagonsOfStation(data, function (result) {
            if (result && result.result > 0) {
                // Вывести данные вагоны на пути отправки
                this.load_of_way(this.id_way, function (wagons) {
                    this.view_wagons(wagons);
                }.bind(this));
                this.out_clear();

                // Сбросим установки (время и локомотивы)
                this.form_setup_on.set('time_aplly', null);
                this.form_setup_on.set('locomotive1', null);
                this.form_setup_on.set('locomotive2', null);

                this.form_setup_on.out_info('Состав отправлен, в количестве ' + result.moved + '(ваг.)');
                if (typeof this.settings.fn_db_update === 'function') {
                    //TODO: можно добавить возвращать перечень для обновления
                    typeof this.settings.fn_db_update();
                }
                LockScreenOff();
            } else {
                LockScreenOff();
                this.form_setup_on.out_error(langView('vac_mess_error_operation_run', App.Langs) + result.result);
                // Выведем ошибки по вагонно.
                $.each(result.listResult, function (i, el) {
                    if (el.result <= 0) this.form_setup_on.out_error('Вагон №' + el.num + ', код ошибки : ' + el.result);
                }.bind(this));
            }
        }.bind(this));
    };

    //--------------------------------------------------------------------------------
    // Показать
    view_arrival_cars.prototype.show = function () {
        this.$panel.show();
    }
    // Скрыть
    view_arrival_cars.prototype.hide = function () {
        this.$panel.hide();
    }
    // Очистить сообщения
    view_arrival_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_arrival_cars.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_arrival_cars.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_arrival_cars.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //--------------------------------------------------------------------------------
    // Очистить объект
    view_arrival_cars.prototype.destroy = function () {
        LockScreen(langView('vac_mess_destroy_operation', App.Langs));
        // Очистить модальную форму подтверждения
        if (this.modal_confirm_form) {
            this.modal_confirm_form.destroy();
            this.modal_confirm_form = null;
        }
        // Очистить форму выбора пути отправки
        if (this.form_setup_from) {
            this.form_setup_from.destroy();
            this.form_setup_from = null;
        }
        // Очистить форму выбора куда отправить
        if (this.form_setup_on) {
            this.form_setup_on.destroy();
            this.form_setup_on = null;
        }

        // Уберем модуль (Таблица собранный состав для отправки детально)
        if (this.tab_cars_on) {
            this.tab_cars_on.destroy();
            this.tab_cars_on = null;
        }
        // Уберем модуль (Таблица вагоны на на пути отправки детально)
        //if (this.tab_cars_from) {
        //    this.tab_cars_from.destroy();
        //    this.tab_cars_from = null;

        //}
        this.$panel.empty(); // empty in case the columns change
        LockScreenOff();
    };

    App.view_arrival_cars = view_arrival_cars;

    window.App = App;
})(window);