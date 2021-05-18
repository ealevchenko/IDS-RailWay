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

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_wim_wagons': 'Загружаю список истории дислокации вагонова...',

        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'wim_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn"><i class="far fa-eye"></i></button>',
            orderable: false,
            className: 'dt-body-center',
            width: "20px"
        },
        {
            field: 'wim_id',
            data: function (row, type, val, meta) {
                return row.id;
            },
            className: 'dt-body-center',
            title: langView('field_id', App.Langs), width: "50px", orderable: true, searchable: true
        },
    ];

    //===========================================================================
    //-----------------------------------------------------------------------
    // таблица истрия внутренего передвижения вагона
    //-----------------------------------------------------------------------
    // Конструктор модуля таблицы внутреней дислокации вагона
    function table_wim(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_wim = $(selector);
        if (this.$t_wim.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    // инициализация полей таблицы вагоны на начальном пути
    table_wim.prototype.init_columns = function () {
        var collums = [];
        //if (this.b_detali_wir) collums.push('arr_car_details_control');
        collums.push('wim_button_view');
        collums.push('wim_id');
        return init_columns(collums, list_collums);
    };
    //
    table_wim.prototype.init = function () {
        this.obj_wim = this.$t_wim.DataTable({
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
                if (data.close !== null) {
                    // приняли
                    if (data.id_outgoing_car) {
                        $(row).removeClass('yellow red').addClass('green');
                    } else {
                        $(row).removeClass('green yellow').addClass('red');
                    }
                } else {
                    if (data.id_outgoing_car) {
                        $(row).removeClass('green red').addClass('yellow');
                    } else {
                        $(row).removeClass('green yellow').addClass('red');
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
                    extend: 'pageLength',
                }
            ]
        });
    };
    // Показать данные 
    table_wim.prototype.view = function (data) {
        this.obj_wim.clear();
        this.obj_wim.rows.add(data);
        this.obj_wim.order([1, 'desc']);
        this.obj_wim.draw();
    };
    // загрузить данные по id
    table_wim.prototype.load_of_id_wim = function (id) {
        if (id) {
            LockScreen(langView('mess_load_wim_wagons', App.Langs));
            ids_rwt.getWagonInternalRoutesOfID(id, function (list_wim_wagon) {
                this.view(list_wim_wagon);
                LockScreenOff();
            }.bind(this));
        };
    };
    //
    App.table_wim = table_wim;

    window.App = App;
})(window);