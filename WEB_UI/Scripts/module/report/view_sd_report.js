/*Модуль Отображения информации по ЭПД*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vsdr_mess_init_module': 'Инициализация модуля(view_sd_report)...',
            'vsdr_link_report_1': 'Погран-переход',
            'vsdr_title_report_1': 'Движение грузов отгруженных АМКР для внешних потребителей продукции (Европа)',
            'vsdr_title_search_cars': 'Найти вагоны',
            'vsdr_label_list_nums': 'Добавьте номера вагонов (разделитель “;”) по которым необходимо провести поиск:',
            'vsdr_title_list_nums': 'Добавте номера вагонов',
            'vsdr_placeholder_list_nums': '00000001;00000002;00000003',
            'vsdr_mess_operation_run': 'Выполняю операцию...',
            'vsdr_title_all': 'Все',
            'vsdr_title_button_export': 'Экспорт',
            'vsdr_title_button_buffer': 'Буфер',
            'vsdr_title_button_excel': 'Excel',
            'vsdr_title_excel_sheet_name': 'Погран переходы',

            'vsdr_field_border_crossing_num': '№ вагона',
            'vsdr_field_border_crossing_status': 'Статус вагона',
            'vsdr_field_border_crossing_date_departure_amkr': 'Вагон отправлен',
            'vsdr_field_border_crossing_border_crossing_stn': 'Код погр.-перехода',
            'vsdr_field_border_crossing_border_crossing_stn_name': 'Погран-переход',
            'vsdr_field_border_crossing_cross_time': 'Дата и время перехода',
            'vsdr_field_border_crossing_client_kod_on': 'Код грузополучателя',
            'vsdr_field_border_crossing_client_name_on': 'Грузополучатель',
            'vsdr_field_border_crossing_vesg': 'Вес груза',
            'vsdr_field_border_crossing_epd_status': 'Статус ЭПД',
            'vsdr_field_border_crossing_epd_date_otpr': 'Отправлен (ЭПД)',
            'vsdr_field_border_crossing_epd_date_pr': 'Прибыл (ЭПД)',
            'vsdr_field_border_crossing_epd_num_doc': 'Id документа (ЭПД)',
            'vsdr_field_border_crossing_epd_revision': '№ ревизии (ЭПД)',
            'vsdr_field_border_crossing_epd_num_uz': '№ накладной (ЭПД)',

            'vsdr_mess_error_search_cars': 'При формировании отчета произошла ошибка, код ошибки {0}',

        },
        'en':  //default language: English
        {
            'vsdr_mess_init_module': 'Module initialization(view_sd_report)...',
            'vsdr_link_report_1': 'Border crossing',
            'vsdr_title_report_1': 'Movement of goods shipped by AMKR for external consumers of products (Europe)',
            'vsdr_title_search_cars': 'Find Cars',
            'vsdr_label_list_nums': 'Add wagon numbers (separator “;”) for which you want to search:',
            'vsdr_title_list_nums': 'Add wagon numbers',
            'vsdr_placeholder_list_nums': '00000001;00000002;00000003',
            'vsdr_mess_operation_run': 'Performing an operation...',
            'vsdr_title_all': 'All',
            'vsdr_title_button_export': 'Export',
            'vsdr_title_button_buffer': 'Buffer',
            'vsdr_title_button_excel': 'Excel',
            'vsdr_title_excel_sheet_name': 'Border Transitions',

            'vsdr_field_border_crossing_num': 'car number',
            'vsdr_field_border_crossing_status': 'Status of the wagon',
            'vsdr_field_border_crossing_date_departure_amkr': 'Wagon sent',
            'vsdr_field_border_crossing_border_crossing_stn': 'Boundary crossing code',
            'vsdr_field_border_crossing_border_crossing_stn_name': 'Border Crossing',
            'vsdr_field_border_crossing_cross_time': 'Date and time of crossing',
            'vsdr_field_border_crossing_client_kod_on': 'Consignee Code',
            'vsdr_field_border_crossing_client_name_on': 'Consignee',
            'vsdr_field_border_crossing_vesg': 'Weight',
            'vsdr_field_border_crossing_epd_status': 'EPD status',
            'vsdr_field_border_crossing_epd_date_otpr': 'Sent (EPD)',
            'vsdr_field_border_crossing_epd_date_pr': 'Arrived (EPD)',

            'vsdr_mess_error_search_cars': 'An error occurred while generating the report, error code {0}',

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FE = App.form_element;
    var alert = App.alert_form;
    var wsd = App.ids_wsd;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_sd_report(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$panel = $(selector);
        if (this.$panel.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.selector = this.$panel.attr('id');
        this.fe_ui = new FE();
    }
    //==========================================================================================
    // Инициализация
    view_sd_report.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('vsdr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
            id_sidebar: null,
            fn_init: null,
        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.elements = {}; // Все элементы формы

        this.$panel.empty();

        var div = new this.fe_ui.div({
            class: 'd-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom',
        });
        this.$title_report = $('<h1 class="h2"></h1>');
        this.$main_report = $('<div></div>');
        var $alert = $('<div class="alert" role="alert">');
        this.alert = new alert($alert);
        if (this.settings.alert === null) this.settings.alert = this.alert;
        this.$panel.append(div.$div.append(this.$title_report)).append($alert).append(this.$main_report);
        // Настроим ссылку
        if (this.settings.id_sidebar) {
            var $ul_list_sidebar = $('#' + this.settings.id_sidebar);
            $ul_list_sidebar.empty();
            //<li class="active">
            //    <a href="#"><i class="fa-solid fa-magnifying-glass-arrow-right mr-1" style="color:#44bef1"></i>@IDSReportResource.report_sd_link_border_crossing</a>
            //</li>
            var $li1 = $('<li class="active"></li>');
            var $i1 = $('<i class="fa-solid fa-magnifying-glass-arrow-right mr-1" style="color:#44bef1"></i>');
            var a_link1 = new this.fe_ui.a({
                href: '#',
                text: langView('vsdr_link_report_1', App.Langs),
                target: null,
                title: null,
            });
            a_link1.$alink.prepend($i1);
            a_link1.$alink.on("click", function () {
                this.view_report_border_crossing();
            }.bind(this));
            $li1.append(a_link1.$alink);
            $ul_list_sidebar.append($li1);
        }

        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    //
    view_sd_report.prototype.load_sostav = function (id_sostav, callback) {
        //this.id_sostav = id_sostav;
        //if (this.id_sostav) {
        //    LockScreen(langView('vicr_mess_load_sostav', App.Langs));
        //    this.ids_wsd.getViewIncomingCarsOfIDSostav(this.id_sostav, function (wagons) {
        //        this.wagons = wagons;
        //        // Получим информацию по составу
        //        this.get_sostav(wagons);
        //        LockScreenOff();
        //        if (typeof callback === 'function') {
        //            callback(this.wagons);
        //        }
        //    }.bind(this));
        //} else {
        //    this.wagons = null;
        //    this.sostav = {};
        //    if (typeof callback === 'function') {
        //        callback(null);
        //    }
        //}
    }
    // Открыть отчет
    view_sd_report.prototype.view_report_border_crossing = function () {
        $('#sidebar').toggleClass('active');
        this.$title_report.text(langView('vsdr_title_report_1', App.Langs))
        // Очистим старую форму
        this.$main_report.empty();
        this.elements = {}; // Все элементы формы
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        // Очистить таблицы
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        // Создадим форму поиска вагонов через погран переход
        var FDL = App.form_dialog;
        this.form = new FDL();
        // Создать макет панели
        var objs = [];
        // Форма детально
        var row_input = {
            obj: 'bs_row',
            options: {
                class: null,
            },
            childs: []
        };
        var bt_search_car = {
            obj: 'bs_button',
            options: {
                color: 'warning',
                size: 'sm',
                class: null,
                id: 'search_car',
                label: null,
                title: langView('vsdr_title_search_cars', App.Langs),
                icon_left: null,
                icon_right: 'fas fa-search',
                click: function (event) {
                    event.preventDefault();
                    this.action_search_border_crossing();
                }.bind(this),
            }
        };
        var form_textarea_list_nums = {
            obj: 'bs_textarea',
            options: {
                id: 'list_nums',
                validation_group: 'common',
                form_group_size: 'xl',
                form_group_col: 12,
                form_group_class: 'text-left',
                label: langView('vsdr_label_list_nums', App.Langs),
                label_class: 'mb-1',
                textarea_size: null,
                textarea_rows: 5,
                textarea_class: 'inp-manual',
                textarea_title: langView('vsdr_title_list_nums', App.Langs),
                textarea_maxlength: null,
                textarea_placeholder: langView('vsdr_placeholder_list_nums', App.Langs),
                textarea_required: null,
                textarea_readonly: false,
                input_group: true,
                input_group_prepend_class: null,
                input_group_prepend_objs: [],
                input_group_append_class: null,
                input_group_append_objs: [bt_search_car],
            },
            childs: []
        };
        var row_input1 = {
            obj: 'bs_row',
            options: {
                class: null,
            },
            childs: []
        };
        var form_div_result = {
            obj: 'div',
            options: {
                id: 'result-report',
                class: 'col-md-12 table-report-operation',
            },
            childs: []
        };
        //
        row_input.childs.push(form_textarea_list_nums);
        row_input1.childs.push(form_div_result);
        objs.push(row_input);
        objs.push(row_input1);
        // Инициализируем форму
        this.form.init({
            alert: this.alert,
            objs: objs,
            mb: 2,
            id: null,
            cl_form: null,
            validation: true,
            fn_validation: function (result) {
                // Валидация успешна
                if (result && result.valid) {

                }
            }.bind(this),
            fn_html_init: function () {
                // HTML документы созданы

            }.bind(this),
            fn_init: function (init) {
                // Инициализация формы закончена
                // создадим элементы и привяжем их к сылке this.elements (получить данные к элементам можно будет через эту переменую)
                this.form.create_element(this.elements, true);
                // отобразим форму
                this.$main_report.append(this.form.$form);
                // Создадим и добавим макет таблицы
                var table = new this.fe_ui.table({
                    id: 'table-report-sd',
                    class: 'display compact cell-border row-border hover',
                    title: null,
                });
                this.$table = table.$table;
                $('div#result-report').append(this.$table);
                //this.$div_out.addClass(this.settings.div_class).append(this.this.$table);
                // Инициализируем таблицу
                this.obj_t_report = this.$table.DataTable({
                    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('vsdr_title_all', App.Langs)]],
                    "pageLength": -1,
                    "deferRender": true,
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: false,
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

                    }.bind(this),
                    columns: [
                        {
                            data: function (row, type, val, meta) {
                                return row.num;
                            },
                            className: 'dt-body-center',
                            title: langView('vsdr_field_border_crossing_num', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.status !== null ? outStatusOutgoingSostav(row.status) : '';
                            },
                            className: 'dt-body-left',
                            title: langView('vsdr_field_border_crossing_status', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.date_departure_amkr ? moment(row.date_departure_amkr).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_date_departure_amkr', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.border_crossing_stn;
                            },
                            className: 'dt-body-center',
                            title: langView('vsdr_field_border_crossing_border_crossing_stn', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.border_crossing_stn_name;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_border_crossing_stn_name', App.Langs), width: "100px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.cross_time ? moment(row.cross_time).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_cross_time', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.client_kod_on;
                            },
                            className: 'dt-body-center',
                            title: langView('vsdr_field_border_crossing_client_kod_on', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.client_name_on;
                            },
                            className: 'dt-body-left shorten mw-300',
                            title: langView('vsdr_field_border_crossing_client_name_on', App.Langs), width: "300px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.vesg !== null ? Number(Number(row.vesg) / 1000).toFixed(3) : '';
                            },
                            className: 'dt-body-right',
                            title: langView('vsdr_field_border_crossing_vesg', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.epd_status !== null ? get_status_epd(row.epd_status) : '';
                            },
                            className: 'dt-body-left',
                            title: langView('vsdr_field_border_crossing_epd_status', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.epd_date_otpr ? moment(row.epd_date_otpr).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_epd_date_otpr', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.epd_date_pr ? moment(row.epd_date_pr).format(format_datetime) : null;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_epd_date_pr', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.num_doc;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_epd_num_doc', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.revision;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_epd_revision', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                        {
                            data: function (row, type, val, meta) {
                                return row.num_uz;
                            },
                            className: 'dt-body-nowrap',
                            title: langView('vsdr_field_border_crossing_epd_num_uz', App.Langs), width: "50px", orderable: true, searchable: true
                        },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            extend: 'collection',
                            text: langView('vsdr_title_button_export', App.Langs),
                            buttons: [
                                {
                                    text: langView('vsdr_title_button_buffer', App.Langs),
                                    extend: 'copyHtml5',
                                },
                                {
                                    text: langView('vsdr_title_button_excel', App.Langs),
                                    extend: 'excelHtml5',
                                    sheetName: langView('vsdr_title_excel_sheet_name', App.Langs),
                                    messageTop: function () {
                                        return '';
                                    }
                                },
                            ],
                            autoClose: true
                        },
                        {
                            button: 'page_length',
                            extend: 'pageLength',
                        }
                    ],
                });

            }.bind(this),
        });
    }
    // Выполнить поиск
    view_sd_report.prototype.action_search_border_crossing = function () {
        this.out_clear();
        this.elements.button_search_car.prop("disabled", true); // сделаем не активной
        var list_cars = this.elements.textarea_list_nums.val();
        var nums = is_valid_nums(list_cars, this.alert, true);
        if (nums) {
            LockScreen(langView('vsdr_mess_operation_run', App.Langs));
            this.ids_wsd.postReportBorderCrossingOfNums(nums, function (result) {
                if (result !== null) {
                    if (this.obj_t_report) {
                        this.obj_t_report.clear();
                        this.obj_t_report.rows.add(result);
                        this.obj_t_report.draw();
                    }
                } else {
                    this.mf_edit.out_warning(langView('vsdr_mess_error_search_cars', App.Langs).format(result.result));
                }
                this.elements.button_search_car.prop("disabled", false); // сделаем активной
                LockScreenOff();
            }.bind(this));
        } else {
            this.elements.button_search_car.prop("disabled", false); // сделаем активной
        };
    }
    //
    view_sd_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_sd_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_sd_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_sd_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //------------------------------------------------------------------
    // Очистить объект
    view_sd_report.prototype.destroy = function () {
        if (this.form) {
            this.form.destroy();
            this.form = null;
        }
        // Очистить таблицы
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
    }

    App.view_sd_report = view_sd_report;

    window.App = App;
})(window);