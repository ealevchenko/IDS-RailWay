jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_num': '№ вагона',
                'field_train': '№ поезда',
                'field_composition_index': 'Индекс поезда',
                'field_date_arrival': 'Время прибытия',
                'field_date_adoption': 'Время приема',
                'field_date_adoption_act': 'Время приема по акту',
                'field_station_from': 'Отправлено со станции',
                'field_station_on': 'Принят на станцию',
                'field_way': 'Принят на путь',
                'field_doc_uz': '№ накладной УЗ',
                'field_status': 'Статус',
                'field_note': 'Примечание',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал строку',
                'field_change': 'Строку правили',
                'field_change_user': 'Правил',
                'field_create_sostav': 'Добавил',
                'field_change_sostav': 'Правил',

                'title_button_export': 'Экспорт',
                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
            },
            'en':  //default language: English
            {
                'field_num': '',
            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        alert = new ALERT($('div#main-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT(lang), // Создадим класс IDS_RWT
        num_wagon = $('input#num_wagon').val(''),
        // Закладка "Картачка вагона"
        code_sng = $('input#code_sng'),
        countrys_name = $('input#countrys_name'),
        genus_abbr = $('input#genus_abbr'),
        genus_name = $('input#genus_name'),

        bt_search_wagon = $('button#bt_search_wagon').on('click', function (event) {
            event.preventDefault();
            search_wagon();
        }),

        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_inc.load([], ['station', 'ways'], [], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        // Очистка
        clear = function () {
            // Закладка "Картачка вагона"
            code_sng.val('');
            countrys_name.val('');
            genus_abbr.val('');
            genus_name.val('');
        },
        // Найти вагон
        search_wagon = function () {
            alert.clear_message();
            clear(); // Очистим экран от старой информации
            LockScreen(langView('mess_delay', langs));
            bt_search_wagon.prop("disabled", true);
            var num = num_wagon.val();
            if (!isNumeric(num) || !is_valid_num_wagon(num)) {
                // Ошибка ввода
                alert.out_error_message('Ошибка, введен неправильный номер :' + num);
                bt_search_wagon.prop("disabled", false);
                LockScreenOff();
            } else {
                // Ок, начинаем поиск
                // Справочник вагонов
                ids_inc.ids_dir.getWagonOfNum(num, function (wagon) {
                    if (wagon) {
                        var countrys = wagon.Directory_Countrys ? wagon.Directory_Countrys : null;
                        if (countrys) {
                            code_sng.val(countrys.code_sng);
                            countrys_name.val(countrys['countrys_name_'+lang]);
                        }
                        var genus = wagon.Directory_GenusWagons ? wagon.Directory_GenusWagons : null;
                        if (genus) {
                            genus_abbr.val(genus['abbr_'+lang]);
                            genus_name.val(genus['genus_'+lang]);
                        }
                    }
                });

                ids_inc.getArrivalCarsOfNum(num, function (list_arrival_cars) {
                    table_arrival_wagon.view(list_arrival_cars);
                    bt_search_wagon.prop("disabled", false);
                    LockScreenOff();
                });
                
            }

        },
        // Таблица вагоны на подходах
        table_arrival_wagon = {
            html_table: $('table#table_arrival_wagon'),
            obj: null,
            select_string: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
                    "paging": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "keys": true,
                    select: false,
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    sScrollX: "100%",
                    scrollX: true,
                    //"responsive": true,
                    //"bAutoWidth": false,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                    },
                    columns: [
                        {
                            targets: 0,
                            data: null,
                            defaultContent: '<button type="button" class="btn btn-outline-primary btn-sm">Показать</button>',
                            orderable: false,
                            //className: 'select-checkbox',
                            width: "20px"
                        },
                        { data: "num", title: langView('field_num', langs), width: "50px", orderable: false, searchable: true },
                        { data: "train", title: langView('field_train', langs), width: "50px", orderable: false, searchable: true },
                        { data: "composition_index", title: langView('field_composition_index', langs), width: "150px", orderable: false, searchable: true },
                        { data: "date_arrival", title: langView('field_date_arrival', langs), width: "150px", orderable: true, searchable: false },
                        { data: "date_adoption", title: langView('field_date_adoption', langs), width: "150px", orderable: false, searchable: false },
                        { data: "date_adoption_act", title: langView('field_date_adoption_act', langs), width: "150px", orderable: false, searchable: false },
                        { data: "station_from", title: langView('field_station_from', langs), width: "150px", orderable: false, searchable: true },
                        { data: "station_on", title: langView('field_station_on', langs), width: "150px", orderable: false, searchable: true },
                        { data: "id_way", title: langView('field_way', langs), width: "150px", orderable: false, searchable: false },
                        { data: "status_name", title: langView('field_status', langs), width: "100px", orderable: false, searchable: true },
                        { data: "doc_uz", title: langView('field_doc_uz', langs), width: "50px", orderable: false, searchable: true },
                        { data: "note", title: langView('field_note', langs), width: "300px", orderable: false, searchable: false },
                        //{
                        //    data: "create", title: langView('field_create', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "create_user", title: langView('field_create_user', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "change", title: langView('field_change', langs), width: "100px", orderable: false, searchable: false
                        //},
                        //{
                        //    data: "change_user", title: langView('field_change_user', langs), width: "100px", orderable: false, searchable: false
                        //},
                        { data: "create_sostav", title: langView('field_create_sostav', langs), width: "150px", orderable: false, searchable: false },
                        { data: "change_sostav", title: langView('field_change_sostav', langs), width: "150px", orderable: false, searchable: false }
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            extend: 'collection',
                            text: langView('title_button_export', langs),
                            buttons: [
                                {
                                    text: langView('title_button_buffer', langs),
                                    extend: 'copyHtml5',
                                },
                                {
                                    text: langView('title_button_excel', langs),
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
                // Обработка события нажатия на кнопку
                this.html_table.find('tbody').on('tbody click', 'button', function () {
                    var data = table_arrival_wagon.obj.row($(this).parents('tr')).data();
                    var date = moment(data.date_arrival)
                    date = date.format('YYYY-MM-DD[T]HH:mm:ss');
                        //date = date.toISOString(false);
                    window.open(url_incoming + '?id_arrival=' + data.id_arrival + '&arrival=' + date, '', '');

                });
            },
            // Отобразить кнопки редактирования таблицы
            view_button: function (indexes) {
                var items = table_arrival_wagon.obj.rows({ selected: true });
                table_arrival_wagon.select_string = items && items.count() === 1 ? table_arrival_wagon.obj.rows(items[0]).data()[0] : null;

            },
            // Показать таблицу с данными
            view: function (data) {
                var id_select = table_arrival_wagon.select_string ? table_arrival_wagon.select_string.id : 0;
                table_arrival_wagon.obj.clear();
                // Сбросить выделенный состав
                table_arrival_wagon.deselect();
                $.each(data, function (i, el) {
                    table_arrival_wagon.obj.row.add(table_arrival_wagon.get_string(el));
                });
                if (table_arrival_wagon.count_string === 1) {
                    table_arrival_wagon.obj.row('#' + id_select).select();
                }
                table_arrival_wagon.obj.order([4, 'desc']);
                table_arrival_wagon.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_string: function (data) {
                var sostav = data.ArrivalSostav ? data.ArrivalSostav : null;
                var doc = data.UZ_DOC ? data.UZ_DOC : null;
                return {
                    "id": data.id,
                    "id_arrival": data.id_arrival,
                    "num": data.num,
                    "train": sostav ? sostav.train : null,
                    "composition_index": sostav ? sostav.composition_index : null,
                    "date_arrival": sostav ? sostav.date_arrival.replace(/T/g, ' ') : null,
                    "date_adoption": sostav && sostav.date_adoption !== null? sostav.date_adoption.replace(/T/g, ' ') : null,
                    "date_adoption_act": sostav && sostav.date_adoption_act !== null ? sostav.date_adoption_act.replace(/T/g, ' ') : null,
                    "id_station_from": sostav ? sostav.id_station_from : null,
                    "station_from": sostav && sostav.id_station_from !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(sostav.id_station_from, 'station_name', lang) : '',
                    "id_station_on": sostav ? sostav.id_station_on : null,
                    "station_on": sostav && sostav.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(sostav.id_station_on, 'station_name', lang) : '',
                    "id_way": sostav && sostav.id_way !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Ways_Of_ID(sostav.id_way, 'way_num', lang) : '',
                    "status": sostav ? sostav.status : null,
                    "status_name": sostav ? outStatusArrivalSostav(sostav.status) : null,
                    "position": data.position,
                    "position_arrival": data.position_arrival,
                    "consignee": data.consignee,
                    "num_doc": data.num_doc,
                    "id_transfer": data.id_transfer,
                    "note": data.note,
                    "date_adoption_act": data.date_adoption_act !== null ? data.date_adoption_act.replace(/T/g, ' ') : null,
                    "doc_uz" : doc ? doc.num_uz : null,
                    "id_arrival_uz_vagon": data.id_arrival_uz_vagon,
                    "arrival": data.arrival !== null ? data.arrival.replace(/T/g, ' ') : null,
                    "arrival_user": data.arrival_user,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                    "create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
                };
            },
            // Deselect
            deselect: function () {
                table_arrival_wagon.select_string = null;
            }
        };
    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        table_arrival_wagon.init();
        var num = getUrlVar('num');
        if (num) {
            num_wagon.val(num);
            search_wagon();
        }


        LockScreenOff();
    });

});